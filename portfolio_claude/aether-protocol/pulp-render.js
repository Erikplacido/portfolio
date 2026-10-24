/* Star Marshal · acabamento 3D da prancha: cor de impressão, retícula, nanquim e céu psicodélico.
   Os modelos OBJ não têm UV; a "textura" é procedural, feita no shader e nas cores por vértice. */

// Paleta 3D amostrada da prancha (sRGB). Personagem, inimigo e cidade usam só estas tintas.
const PULP_PALETTE_HEX = {
    suit: 0x24426E, cobalt: 0x1D4E89, navy: 0x132338, cream: 0xEBD9AE, red: 0xDA4429, crimson: 0x8F2A1D,
    mustard: 0xE8A934, leather: 0x6E4529, steel: 0x8E9CA0, ink: 0x14191E, teal: 0x2E8C91
};
const PULP_PALETTE = Object.values(PULP_PALETTE_HEX).map(hex => {
    const srgb = new THREE.Color(hex);
    return { srgb, linear: srgb.clone().convertSRGBToLinear() };
});

// Uniforms compartilhados por todos os materiais: um único relógio e uma única tinta.
const PULP_SHARED = {
    uInk: { value: new THREE.Color(0x0C2229).convertSRGBToLinear() },
    uDotScale: { value: 5 },
    uTime: { value: 0 },
    uViewport: { value: new THREE.Vector2(1, 1) },
    uRimA: { value: new THREE.Color(0x5FB5AE).convertSRGBToLinear() },
    uRimB: { value: new THREE.Color(0xC83A6E).convertSRGBToLinear() }
};

// Três faixas de luz, como sombra chapada de gráfica.
const PULP_GRADIENT = (() => {
    const tex = new THREE.DataTexture(new Uint8Array([70, 150, 255]), 3, 1, THREE.LuminanceFormat);
    tex.minFilter = tex.magFilter = THREE.NearestFilter;
    tex.generateMipmaps = false;
    tex.needsUpdate = true;
    return tex;
})();

/** Leva cada cor de vértice (sRGB) para a tinta mais próxima da paleta, já em espaço linear. */
function pulpQuantizeColors(colors) {
    const out = new Float32Array(colors.length);
    for (let i = 0; i < colors.length; i += 3) {
        let best = PULP_PALETTE[0], bestD = Infinity;
        for (const p of PULP_PALETTE) {
            // Distância ponderada pela sensibilidade do olho (verde > vermelho > azul).
            const dr = colors[i] - p.srgb.r, dg = colors[i + 1] - p.srgb.g, db = colors[i + 2] - p.srgb.b;
            const d = 3 * dr * dr + 4 * dg * dg + 2 * db * db;
            if (d < bestD) { bestD = d; best = p; }
        }
        out[i] = best.linear.r; out[i + 1] = best.linear.g; out[i + 2] = best.linear.b;
    }
    return out;
}

/** Geometria indexada (normais suaves) para o contorno não abrir nas arestas. */
function pulpIndexedGeometry(v, f, colors) {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(v, 3));
    if (colors) geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geo.setIndex(Array.from(f));
    geo.computeVertexNormals();
    return geo;
}

/**
 * Cor chapada por face: cada triângulo recebe uma única tinta, como as áreas de cor de uma impressão,
 * em vez de degradês entre vértices. paint(x, y, z, nx, ny, nz) recebe um ponto e a normal e devolve
 * [r, g, b] em sRGB. Triângulos que atravessam uma divisa de cor são subdivididos (até maxDepth níveis,
 * no meio das arestas, sem mover a superfície) para a divisa ficar nítida; o resto fica como está.
 * userData.outlineGeometry guarda a malha original, com normais suaves, para o contorno de nanquim.
 */
function pulpFaceColoredGeometry(v, f, paint, maxDepth = 3) {
    const base = pulpIndexedGeometry(v, f);
    const P = base.attributes.position.array, N = base.attributes.normal.array, I = base.index.array;
    const pos = [], nor = [], col = [];
    const at = (arr, i) => [arr[i * 3], arr[i * 3 + 1], arr[i * 3 + 2]];
    const avg = (...vs) => [0, 1, 2].map(k => vs.reduce((s, p) => s + p[k], 0) / vs.length);
    const unit = p => { const l = Math.hypot(p[0], p[1], p[2]) || 1; return [p[0] / l, p[1] / l, p[2] / l]; };
    const sample = (p, n) => paint(p[0], p[1], p[2], n[0], n[1], n[2]);
    const same = (a, b) => a[0] === b[0] && a[1] === b[1] && a[2] === b[2];
    function tri(pa, pb, pc, na, nb, nc, depth) {
        const c = sample(avg(pa, pb, pc), unit(avg(na, nb, nc)));
        if (depth < maxDepth && !(same(c, sample(pa, na)) && same(c, sample(pb, nb)) && same(c, sample(pc, nc)))) {
            const pab = avg(pa, pb), pbc = avg(pb, pc), pca = avg(pc, pa);
            const nab = unit(avg(na, nb)), nbc = unit(avg(nb, nc)), nca = unit(avg(nc, na));
            tri(pa, pab, pca, na, nab, nca, depth + 1);
            tri(pab, pb, pbc, nab, nb, nbc, depth + 1);
            tri(pca, pbc, pc, nca, nbc, nc, depth + 1);
            tri(pab, pbc, pca, nab, nbc, nca, depth + 1);
            return;
        }
        pos.push(...pa, ...pb, ...pc);
        nor.push(...na, ...nb, ...nc);
        col.push(...c, ...c, ...c);
    }
    for (let i = 0; i < I.length; i += 3) tri(at(P, I[i]), at(P, I[i + 1]), at(P, I[i + 2]), at(N, I[i]), at(N, I[i + 1]), at(N, I[i + 2]), 0);
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
    geo.setAttribute('normal', new THREE.Float32BufferAttribute(nor, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(pulpQuantizeColors(col), 3));
    geo.userData.outlineGeometry = base;
    return geo;
}

const PULP_FRAG_PARS = `
uniform vec3 uInk; uniform float uDotScale; uniform float uTime; uniform vec2 uViewport;
uniform vec3 uRimA; uniform vec3 uRimB; uniform float uRim;`;

const PULP_FRAG_MAIN = `
    // Retícula de meio-tom a 45° só onde a luz cai (faixa de sombra e sombra projetada).
    float baseL = max(dot(diffuseColor.rgb, vec3(0.299, 0.587, 0.114)), 0.002);
    float litL = dot(outgoingLight, vec3(0.299, 0.587, 0.114)) / baseL;
    vec2 hp = mat2(0.7071, -0.7071, 0.7071, 0.7071) * gl_FragCoord.xy / uDotScale;
    float radius = clamp((0.62 - litL) * 0.95, 0.0, 0.6);
    float dotMask = 1.0 - smoothstep(radius - 0.06, radius + 0.04, length(fract(hp) - 0.5));
    outgoingLight = mix(outgoingLight, uInk, dotMask * 0.55);
    // Rim psicodélico: verde-mar → magenta ao longo da tela, correndo devagar.
    float fres = pow(1.0 - clamp(abs(dot(normal, normalize(vViewPosition))), 0.0, 1.0), 3.0);
    float band = 0.5 + 0.5 * sin(gl_FragCoord.y / uViewport.y * 6.2832 + uTime * 0.8);
    outgoingLight += mix(uRimA, uRimB, band) * fres * uRim;
    gl_FragColor = vec4(outgoingLight, diffuseColor.a);`;

/** Converte um MeshToonMaterial no acabamento de impressão. rim: intensidade do brilho de borda. */
function applyPulpMaterial(material, rim) {
    material.gradientMap = PULP_GRADIENT;
    material.onBeforeCompile = shader => {
        Object.assign(shader.uniforms, PULP_SHARED);
        shader.uniforms.uRim = { value: rim };
        shader.fragmentShader = shader.fragmentShader
            .replace('#include <common>', '#include <common>\n' + PULP_FRAG_PARS)
            .replace('gl_FragColor = vec4( outgoingLight, diffuseColor.a );', PULP_FRAG_MAIN);
    };
    material.customProgramCacheKey = () => 'pulp-' + rim;
    material.userData.pulp = true;
    material.needsUpdate = true;
}

/** Contorno de nanquim por casca invertida, compartilhando a geometria da malha (ou a original, se houver). */
function addInkOutline(mesh, thickness, geometry = mesh.geometry.userData.outlineGeometry || mesh.geometry) {
    const mat = new THREE.MeshBasicMaterial({ color: 0x0C1418, side: THREE.BackSide });
    mat.onBeforeCompile = shader => {
        shader.uniforms.uOutline = { value: thickness };
        shader.vertexShader = 'uniform float uOutline;\n' + shader.vertexShader
            .replace('#include <begin_vertex>', 'vec3 transformed = position + normalize(normal) * uOutline;');
    };
    const outline = new THREE.Mesh(geometry, mat);
    outline.userData.pulpSkip = true;
    outline.userData.noShadow = true;
    mesh.add(outline);
    return outline;
}

/**
 * Passa a cena inteira para o acabamento de impressão:
 * Standard vira Toon, cores de material e texturas passam a ser lidas como sRGB (fiéis aos hex da prancha).
 */
function pulpifyScene(root) {
    root.traverse(o => {
        if (!o.isMesh || o.userData.pulpSkip) return;
        let m = o.material;
        if (m.isMeshStandardMaterial) {
            const toon = new THREE.MeshToonMaterial({
                color: m.color, map: m.map, vertexColors: m.vertexColors,
                side: m.side, transparent: m.transparent, opacity: m.opacity
            });
            if (!m.vertexColors) toon.color.convertSRGBToLinear();
            m.dispose();
            o.material = m = toon;
            m.userData.converted = true;
        }
        if (m.isMeshToonMaterial && !m.userData.pulp) {
            if (!m.vertexColors && !m.userData.converted) m.color.convertSRGBToLinear();
            if (m.map) { m.map.encoding = THREE.sRGBEncoding; m.map.needsUpdate = true; }
            applyPulpMaterial(m, o.userData.rim ?? 0.12);
        }
    });
}

/** Céu de pôster: degradê petróleo → creme, raios de sol girando e halos psicodélicos ao redor do planeta. */
function buildPsychedelicSky(planetWorldPos) {
    const material = new THREE.ShaderMaterial({
        uniforms: { uTime: PULP_SHARED.uTime, uPlanetDir: { value: planetWorldPos.clone().normalize() } },
        vertexShader: `
            varying vec3 vDir;
            void main() {
                vDir = normalize(position);
                vec4 p = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                gl_Position = p.xyww;
            }`,
        fragmentShader: `
            uniform float uTime; uniform vec3 uPlanetDir;
            varying vec3 vDir;
            vec3 lin(vec3 c) { return pow(c, vec3(2.2)); }
            void main() {
                vec3 d = normalize(vDir);
                float h = d.y;
                vec3 col = mix(lin(vec3(0.96, 0.80, 0.52)), lin(vec3(0.17, 0.49, 0.54)), smoothstep(-0.02, 0.24, h));
                col = mix(col, lin(vec3(0.05, 0.20, 0.28)), smoothstep(0.24, 0.8, h));
                vec3 pd = normalize(uPlanetDir);
                vec3 ax = normalize(cross(pd, vec3(0.0, 1.0, 0.0)));
                vec3 ay = cross(ax, pd);
                float ang = atan(dot(d, ay), dot(d, ax));
                float dist = acos(clamp(dot(d, pd), -1.0, 1.0));
                // Raios alternados de pôster dos anos 60, girando bem devagar.
                float rays = step(0.0, sin(ang * 14.0 + uTime * 0.06));
                float rayFade = smoothstep(1.5, 0.2, dist) * smoothstep(-0.02, 0.18, h);
                col = mix(col, col * 1.22 + lin(vec3(0.06, 0.03, 0.0)), rays * rayFade * 0.4);
                // Halos concêntricos magenta/laranja respirando para fora.
                float rings = 0.5 + 0.5 * sin(dist * 34.0 - uTime * 0.9);
                float ringFade = smoothstep(0.8, 0.22, dist) * smoothstep(0.15, 0.24, dist);
                vec3 ringCol = mix(lin(vec3(0.78, 0.23, 0.43)), lin(vec3(0.98, 0.45, 0.18)), 0.5 + 0.5 * sin(dist * 8.0 + uTime * 0.3));
                col = mix(col, ringCol, step(0.8, rings) * ringFade * 0.5);
                gl_FragColor = vec4(col, 1.0);
                #include <encodings_fragment>
            }`,
        side: THREE.BackSide,
        depthWrite: false
    });
    const sky = new THREE.Mesh(new THREE.SphereGeometry(120, 48, 24), material);
    sky.userData.pulpSkip = true;
    sky.userData.noShadow = true;
    sky.frustumCulled = false;
    sky.renderOrder = -10;
    return sky;
}

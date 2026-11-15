/* Núcleo: tempo musical, cenas, e a construção da fase a partir da partitura. */
(function () {
  'use strict';
  const G = window.G = {};
  const M = window.MUSIC;
  const BARS = M.bars;
  G.W = 192;
  G.PXB = 46;            // pixels por seminima (velocidade de rolagem)
  G.FLYX = 52;
  G.LO = 58; G.HI = 82;  // faixa de alturas mostrada (Sib3..Sib5)

  /* ---------- compassos e andamento ---------- */
  function barIndex(beat) {
    let lo = 0, hi = BARS.length - 1;
    while (lo < hi) { const mid = (lo + hi + 1) >> 1; if (BARS[mid][0] <= beat + 1e-6) lo = mid; else hi = mid - 1; }
    return lo;
  }
  G.barIndex = barIndex;
  G.barBeat = n => (n > BARS.length ? M.total : BARS[n - 1][0]);   // n = numero do compasso (1..)
  function barPos(beat) { const i = barIndex(beat); return i + Math.min(1, (beat - BARS[i][0]) / BARS[i][1]); }
  const lerp = (a, b, k) => a + (b - a) * Math.max(0, Math.min(1, k));
  /* Allegro 146 · poco stringendo (c.35) · Agitato 160 (c.49) · volta ao tempo · rall. final */
  function bpm(x) {
    if (x < 34) return 146;
    if (x < 48) return lerp(146, 160, (x - 34) / 14);
    if (x < 58) return 160;
    if (x < 67) return lerp(160, 146, (x - 58) / 9);
    if (x < 100) return 146;
    if (x < 102) return lerp(146, 108, (x - 100) / 2);
    if (x < 103) return 64;      // fermata
    return 104;
  }
  G.tempoName = n => (n < 35 ? 'Allegro' : n < 49 ? 'poco stringendo' : n < 59 ? 'Agitato' : n < 68 ? 'calando' : n < 101 ? 'Tempo I' : 'rall.');
  const RES = 8, tab = [0];
  for (let i = 0; i < M.total * RES; i++) tab.push(tab[i] + (1 / RES) * 60 / bpm(barPos((i + 0.5) / RES)));
  const END = tab[tab.length - 1];
  G.secAt = function (beat) {
    if (beat <= 0) return beat * 60 / 146;
    if (beat >= M.total) return END + (beat - M.total) * 60 / 104;
    const f = beat * RES, i = Math.floor(f);
    return tab[i] + (tab[i + 1] - tab[i]) * (f - i);
  };
  G.beatAt = function (sec) {
    if (sec <= 0) return sec * 146 / 60;
    if (sec >= END) return M.total + (sec - END) * 104 / 60;
    let lo = 0, hi = tab.length - 1;
    while (hi - lo > 1) { const mid = (lo + hi) >> 1; if (tab[mid] <= sec) lo = mid; else hi = mid; }
    return (lo + (sec - tab[lo]) / (tab[hi] - tab[lo])) / RES;
  };
  G.songSeconds = END;

  /* dinâmica por compasso (pp ... mf ... f ... pp ... ppp) */
  const DYN = [[0, .5], [34, .52], [42, .7], [48, .92], [58, 1], [60, .92], [67, .5], [87, .52], [88, .46], [97, .42], [103, .38]];
  G.velAt = function (beat) {
    const x = barPos(beat);
    for (let i = 1; i < DYN.length; i++) if (x < DYN[i][0]) return lerp(DYN[i - 1][1], DYN[i][1], (x - DYN[i - 1][0]) / (DYN[i][0] - DYN[i - 1][0]));
    return DYN[DYN.length - 1][1];
  };

  /* ---------- cenas (pelo número do compasso) ---------- */
  G.SCENES = [
    { id: 'a', bars: [1, 10], name: 'Despertar', sub: 'O orvalho da manhã', bg: 'a_despertar', tension: 0 },
    { id: 'b', bars: [11, 25], name: 'Tarefas do dia', sub: 'Frutinhas e cocô pelo caminho', bg: 'b_tarefas', tension: 0 },
    { id: 'c', bars: [26, 34], name: 'O sapo', sub: 'Cuidado com a língua!', bg: 'c_sapo', tension: 1 },
    { id: 'd', bars: [35, 42], name: 'Coisas de gente', sub: 'Mata-moscas e fita pega-mosca', bg: 'd_fios', tension: 1 },
    { id: 'e', bars: [43, 48], name: 'A sombra', sub: 'Alguém está olhando…', bg: 'e_sombra', tension: 2 },
    { id: 'f', bars: [49, 58], name: 'Ai! Uma teia!', sub: 'Colete notas para afastar a aranha', bg: 'f_teia', tension: 3 },
    { id: 'g', bars: [59, 67], name: 'Fuga e queda', sub: 'Asa machucada…', bg: 'g_queda', tension: 2 },
    { id: 'h', bars: [68, 75], name: 'No escuro', sub: 'Nem toda sombra é de verdade', bg: 'h_sombras', tension: 2 },
    { id: 'i', bars: [76, 87], name: 'Último labirinto', sub: 'Passe pelas frestas da teia', bg: 'i_labirinto', tension: 2 },
    { id: 'j', bars: [88, 97], name: 'De volta à luz', sub: 'Respire fundo', bg: 'j_retorno', tension: 0 },
    { id: 'k', bars: [98, 104], name: 'Pouso e descanso', sub: 'Pouse na folha', bg: 'k_pouso', tension: 0 },
  ];
  G.SCENES.forEach((s, i) => { s.i = i; s.b0 = G.barBeat(s.bars[0]); s.b1 = G.barBeat(s.bars[1] + 1); });
  G.sceneOfBar = n => G.SCENES.find(s => n >= s.bars[0] && n <= s.bars[1]) || G.SCENES[G.SCENES.length - 1];

  G.DIFFS = {
    passeio: { id: 'passeio', label: 'Passeio', icon: '🍓', desc: 'Sem perder vidas. Para conhecer o caminho.', tol: 15, hearts: 0, haz: 0.5, tempo: 1, mult: 1 },
    aventura: { id: 'aventura', label: 'Aventura', icon: '🪰', desc: 'O dia completo da mosquinha. 5 corações.', tol: 11.5, hearts: 5, haz: 1, tempo: 1, mult: 1.5 },
    virtuose: { id: 'virtuose', label: 'Virtuose', icon: '🎹', desc: 'Notas exigentes, mais perigos, 3 corações.', tol: 8.5, hearts: 3, haz: 1.5, tempo: 1, mult: 2, lock: 'Tire nota A na Aventura' },
    presto: { id: 'presto', label: 'Presto!', icon: '⚡', desc: 'Virtuose com a música 15% mais rápida.', tol: 9.5, hearts: 3, haz: 1.5, tempo: 1.15, mult: 2.5, lock: 'Termine o modo Virtuose' },
  };

  G.rng = function (seed) {
    let a = seed >>> 0;
    return function () { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
  };

  /* ---------- construção da fase ---------- */
  G.buildLevel = function (o) {
    const D = o.diff, rnd = G.rng(o.seed || 1), tempo = o.tempo || D.tempo;
    const T = b => G.secAt(b) / tempo;
    const L = { T, tempo, pollen: [], ribbons: [], haz: [], picks: [], lunges: [], web: { d: 1, active: false }, leadTotal: 0, sceneTotals: {} };
    const groups = new Map(), ribKey = new Set();
    for (const [b, dur, m, v, acc] of M.notes) {
      const bar = barIndex(b) + 1, sc = G.sceneOfBar(bar);
      if (bar === 104) continue;                          // pizzicato final = pouso
      if (dur >= 1) {
        const key = Math.round(b * 8) + ':' + (sc.id === 'f' ? 'x' : m);
        if (ribKey.has(key)) continue; ribKey.add(key);
        L.ribbons.push({ b0: b, b1: b + dur, t0: T(b), t1: T(b + dur), m, acc, bar, sc: sc.id, prog: 0, st: 0, kind: -1 });
        continue;
      }
      if (bar >= 30 && bar <= 34 && m <= 62) { L.haz.push({ type: 'flick', b, t: T(b), tw: T(b - 1), m }); continue; }
      const k = Math.round(b * 8);
      if (!groups.has(k)) groups.set(k, []);
      const arr = groups.get(k);
      if (!arr.some(p => p.m === m)) arr.push({ b, m, bar, sc: sc.id });
    }
    for (const arr of groups.values()) {
      arr.sort((a, c) => c.m - a.m);
      arr.forEach((p, i) => {
        const kind = (Math.round(p.b*4)+p.bar)%5;
        L.pollen.push({ kind, b: p.b, t: T(p.b), m: p.m, lead: i === 0, bar: p.bar, sc: p.sc, st: 0 });
        if (i === 0) { L.leadTotal++; L.sceneTotals[p.sc] = (L.sceneTotals[p.sc] || 0) + 1; }
      });
    }
    L.pollen.sort((a, c) => a.b - c.b || c.m - a.m);
    L.ribbons.sort((a, c) => a.b0 - c.b0);
    const foodScenes = { b: 1, c: 1, j: 1 };
    for (const r of L.ribbons) r.kind = foodScenes[r.sc] ? Math.floor(rnd() * 5) : -1;   // -1 = gota de orvalho
    L.foodTotal = L.ribbons.length;

    const leads = L.pollen.filter(p => p.lead);
    function leadNear(b, win) {
      let lo = 99, hi = 0, best = null, bd = 9;
      for (const p of leads) { const d = Math.abs(p.b - b); if (d <= win) { lo = Math.min(lo, p.m); hi = Math.max(hi, p.m); } if (d < bd) { bd = d; best = p; } }
      for (const r of L.ribbons) if (r.b0 <= b + win && r.b1 >= b - win) { lo = Math.min(lo, r.m); hi = Math.max(hi, r.m); }
      if (lo > hi) { lo = hi = best ? best.m : 70; }
      return { lo, hi, m: best ? best.m : 70 };
    }
    function accents(a, z, pred) {
      const set = new Set(), out = [];
      for (const [b, dur, m, v, acc] of M.notes) {
        const bar = barIndex(b) + 1;
        if (acc && bar >= a && bar <= z && (!pred || pred(b, dur, m, bar)) && !set.has(b)) { set.add(b); out.push(b); }
      }
      return out.sort((x, y) => x - y);
    }
    const easy = D.haz < 1, hard = D.haz > 1;
    const thin = arr => (easy ? arr.filter((_, i) => i % 2 === 1) : arr);
    const push = h => L.haz.push(h);
    // C · sapo: língua mira a mosca nos acentos
    thin(accents(27, 30)).forEach(b => push({ type: 'tongue', b, t: T(b), tw: T(b - 1.6), tl: T(b - (hard ? 0.4 : 0.55)) }));
    if (hard) [31, 32, 33, 34].forEach(n => { const b = G.barBeat(n) + 2.5; push({ type: 'tongue', b, t: T(b), tw: T(b - 1.5), tl: T(b - 0.4) }); });
    // D · mata-moscas nos acentos do tempo forte + fitas pega-mosca
    thin(accents(36, 42, (b, d, m, bar) => Math.abs(b - G.barBeat(bar)) < 0.01)).forEach(b => push({ type: 'swat', b, t: T(b), tw: T(b - 1.75), tl: T(b - (hard ? 0.5 : 0.7)), half: easy ? 19 : hard ? 27 : 23 }));
    (easy ? [39] : hard ? [36, 37, 38, 39, 40, 41] : [37, 39, 41]).forEach(n => {
      const b = G.barBeat(n) + 1.25, r = leadNear(b, 0.8);
      const fromTop = (G.HI - r.hi) >= (r.lo - G.LO);
      push({ type: 'paper', b, fromTop, edge: fromTop ? r.hi + 2.6 : r.lo - 2.6 });
    });
    // E · a sombra cospe seda nos Si bemóis acentuados
    let silk = accents(44, 48, (b, d, m) => m === 82);
    if (easy) silk = silk.slice(-3);
    silk.forEach(b => push({ type: 'silk', b, t: T(b), tw: T(b - 1.3) }));
    // F · teia: a aranha dá o bote nos sforzandi
    let lastL = -9;
    for (const r of L.ribbons) if (r.sc === 'f' && r.bar >= 50 && r.b0 - lastL >= 1.5) { L.lunges.push({ b: r.b0, t: T(r.b0), done: false }); lastL = r.b0; }
    // H · aranhinhas descem pelo fio
    (easy ? [69, 71, 74] : hard ? [69, 70, 71, 72, 73, 74, 75] : [69, 70, 71, 72, 74, 75]).forEach(n => {
      const b = G.barBeat(n) + (n > 72 ? 1 : 0);
      push({ type: 'drop', b, t: T(b), tw: T(b - 2), tl: T(b - 0.6) });
    });
    // I · paredes de teia com fresta na nota da melodia
    (easy ? [77, 81, 85] : hard ? [77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87] : [77, 79, 80, 81, 83, 84, 85, 87]).forEach(n => {
      const b = G.barBeat(n) + 1, r = leadNear(b, 0.26);
      push({ type: 'wall', b, gm: r.m, gh: easy ? 34 : hard ? 21 : 27 });
    });
    if (hard) accents(78, 87, (b, d, m) => d >= 2).filter((_, i) => i % 2 === 0).forEach(b => push({ type: 'silk', b, t: T(b), tw: T(b - 1.3) }));
    L.haz.sort((a, c) => a.b - c.b);
    // corações e o vaga-lume do dia
    const pick = (n, off, type, dm) => { const b = G.barBeat(n) + off, r = leadNear(b, 0.3); L.picks.push({ type, b, t: T(b), m: Math.max(G.LO + 1, Math.min(G.HI - 1, r.m + (dm || 0))), st: 0 }); };
    if (D.hearts) { pick(65, 1.5, 'heart'); pick(91, 0.5, 'heart'); }
    const ffBars = [14, 17, 21, 24, 62, 66, 90, 94];
    const fb = ffBars[Math.floor(rnd() * ffBars.length)];
    pick(fb, 0.5, 'firefly', rnd() < 0.5 ? 5 : -5);
    L.land = { b: G.barBeat(104), t: T(G.barBeat(104)) };
    L.end = T(M.total) + 2.6;
    return L;
  };
})();

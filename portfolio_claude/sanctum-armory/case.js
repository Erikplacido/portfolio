(() => {
  'use strict';
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const A = 'assets/tela/';
  const COLS = 12, ROWS = 4, MAX_LOAD = 20;

  /* ---------- Revelar ao rolar e pausar partículas fora da tela ---------- */
  const reveal = [...document.querySelectorAll('.rv')];
  if ('IntersectionObserver' in window && !reduced.matches) {
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { rootMargin: '0px 0px -8% 0px' });
    reveal.forEach(el => io.observe(el));
  } else reveal.forEach(el => el.classList.add('in'));
  if ('IntersectionObserver' in window) {
    const off = new IntersectionObserver(es => es.forEach(e => e.target.classList.toggle('offscreen', !e.isIntersecting)));
    document.querySelectorAll('[data-cb-stage]').forEach(el => off.observe(el));
  }

  /* ---------- Dados ---------- */
  // Valores das duas espadas: os da arte. Demais nomes, pesos e descrições: propostas da recriação.
  const RARITY = { comum: 'Comum', raro: 'Raro', epico: 'Épico', lendario: 'Lendário' };
  const CATS = [
    ['todos', 'Todos', 'filtro-todos.webp'], ['armas', 'Armas', 'filtro-armas.webp'], ['ferramentas', 'Ferramentas', 'filtro-ferramentas.webp'],
    ['consumiveis', 'Consumíveis', 'filtro-consumiveis.webp'], ['recursos', 'Recursos', 'filtro-recursos.webp'], ['materiais', 'Materiais', 'filtro-materiais.webp'],
    ['documentos', 'Documentos', 'filtro-documentos.webp'], ['especiais', 'Especiais', 'filtro-especiais.webp'], ['vestuario', 'Vestuário', 'item-bandana.webp']
  ];
  const CAT_NAME = Object.fromEntries(CATS.map(c => [c[0], c[1]]));
  const SLOTS = { cabeca: 'Cabeça', torso: 'Torso', punhos: 'Punhos', cintura: 'Cintura', pernas: 'Pernas', amuleto: 'Amuleto', arma: 'Arma' };
  const STATS = [
    ['dano', 'Dano', 0, '', 'up', 'M5 19L19 5M15 5h4v4M7 13l4 4'],
    ['velocidade', 'Velocidade', 2, '', 'up', 'M4 8h11M2 12h13M4 16h11M17 8l4 4-4 4'],
    ['alcance', 'Alcance', 1, ' m', 'up', 'M12 3v4M12 17v4M3 12h4M17 12h4M12 12m-5 0a5 5 0 1 0 10 0a5 5 0 1 0 -10 0'],
    ['atordoamento', 'Atordoamento', 0, '', 'up', 'M12 3l2 5 5-2-2 5 5 2-5 2 2 5-5-2-2 5-2-5-5 2 2-5-5-2 5-2-2-5 5 2z'],
    ['peso', 'Peso', 1, ' kg', 'down', 'M6 9h12l2 11H4zM9 9a3 3 0 0 1 6 0']
  ];
  // sw: largura do desenho na grade, em px da arte (o tamanho da camada no PSD).
  const ITEMS = {
    sabre: { name: 'Sabre de oficial', cat: 'armas', r: 'epico', lvl: 18, w: 3, h: 1, kg: 2.1, slot: 'arma', sw: 180, art: 'arte-sabre.webp',
      desc: 'Sabre de oficial da tropa lusa, modelo 1796. Lâmina mais longa e pesada, com maior poder de corte. Encontrado em acampamentos abandonados.',
      stats: { dano: 84, velocidade: 0.95, alcance: 2.3, atordoamento: 55, peso: 2.1 },
      fx: [['Maior poder de corte'], ['Quebra de guarda'], ['Mais difícil de manejar', 1], ['Cansa mais rapidamente', 1]],
      sockets: ['buzio', 'open', 'locked'] },
    espada: { name: 'Espada curva do litoral', cat: 'armas', r: 'raro', lvl: 16, w: 3, h: 1, kg: 1.8, slot: 'arma', sw: 166, art: 'arte-espada-curva.webp', sprite: 'arte-espada-curva.webp',
      desc: 'Espada curva forjada a partir de lâminas de embarcações. Leve e versátil, ideal para combates rápidos no litoral e em matas fechadas.',
      stats: { dano: 68, velocidade: 1.1, alcance: 2.0, atordoamento: 42, peso: 1.8 },
      fx: [['Ataques encadeados mais fáceis'], ['Bônus contra inimigos desprotegidos'], ['Movimentação mais fluida'], ['Boa em ambientes costeiros']],
      sockets: ['open', 'locked', 'locked'] },
    cinturao: { name: 'Cinturão de bolsas', cat: 'ferramentas', r: 'raro', w: 2, h: 1, kg: 2.0, sw: 114, desc: 'Couro com bolsas e fivelas para levar pequenas ferramentas à mão.' },
    rolo: { name: 'Rolo de pano', cat: 'materiais', r: 'comum', w: 1, h: 1, kg: 1.0, sw: 56, sprite: 'item-rolo-pano.webp', desc: 'Tecido enrolado para remendos, ataduras e amarrações.' },
    bandana: { name: 'Torço de pano', cat: 'vestuario', r: 'comum', w: 1, h: 1, kg: 0.3, slot: 'cabeca', sw: 50, desc: 'Pano amarrado na cabeça. Protege do sol e encobre o rosto à distância.' },
    colar: { name: 'Colar de latão', cat: 'especiais', r: 'raro', w: 1, h: 1, kg: 0.3, slot: 'amuleto', sw: 58, desc: 'Metal trabalhado à mão, usado rente ao pescoço.' },
    ervas: { name: 'Ervas de cura', cat: 'consumiveis', r: 'comum', w: 1, h: 1, kg: 0.2, sw: 52, desc: 'Folhas para chá e emplastro. Recuperam um pouco de vida.' },
    sacos: { name: 'Sacos de couro', cat: 'recursos', r: 'comum', w: 1, h: 1, kg: 2.4, sw: 52, sprite: 'item-sacos-couro.webp', desc: 'Moedas e pequenos objetos de troca. Pesam mais do que parecem.' },
    mapa: { name: 'Mapa da trilha', cat: 'documentos', r: 'raro', w: 1, h: 1, kg: 0.1, sw: 51, desc: 'Desenho a carvão das trilhas até o próximo refúgio.' },
    carta: { name: 'Carta lacrada', cat: 'documentos', r: 'lendario', w: 1, h: 1, kg: 0.1, sw: 51, key: true, desc: 'Documento com selo oficial. Muda o rumo do capítulo.' },
    urucum: { name: 'Pó de urucum', cat: 'materiais', r: 'comum', w: 1, h: 1, kg: 0.4, sw: 58, desc: 'Pigmento vermelho para pintura e para marcar trilhas.' },
    buzio: { name: 'Búzio', cat: 'especiais', r: 'raro', w: 1, h: 1, kg: 0.1, sw: 42, desc: 'Concha usada como engaste de aprimoramento na arma.' },
    calca: { name: 'Calça de retalhos', cat: 'vestuario', r: 'raro', w: 2, h: 3, kg: 1.6, slot: 'cintura', sw: 118, desc: 'Panos sobrepostos amarrados na cintura. Leve para correr, pesada quando molha.' },
    blusa: { name: 'Pano de busto', cat: 'vestuario', r: 'comum', w: 2, h: 2, kg: 0.6, slot: 'torso', sw: 109, desc: 'Algodão amarrado ao peito, firme para correr e escalar.' },
    sandalias: { name: 'Sandálias de couro', cat: 'vestuario', r: 'comum', w: 2, h: 2, kg: 1.2, slot: 'pernas', sw: 107, desc: 'Couro cru amarrado até a canela. Silenciosas na mata.' }
  };
  for (const [id, it] of Object.entries(ITEMS)) {
    it.id = id; it.sprite = A + (it.sprite || `item-${id}.webp`);
    if (it.art) it.art = A + it.art;
    if (it.slot) it.icon = A + `slot-${id}.webp`;
  }
  // Disposição da arte: colunas e linhas da imbamba. Ao sair do corpo, a peça volta para cá se houver espaço.
  const HOME = { sabre: [0, 3], cinturao: [1, 0], rolo: [1, 1], bandana: [3, 0], colar: [3, 1], ervas: [4, 2], sacos: [5, 1], mapa: [5, 2], carta: [6, 2], urucum: [5, 3], buzio: [3, 3], calca: [7, 1], blusa: [9, 0], sandalias: [10, 2] };
  // Estado inicial: ela começa vestida, com a espada curva na mão. O que está no corpo não está na trouxa.
  const WORN = { cabeca: 'bandana', torso: 'blusa', punhos: null, cintura: 'calca', pernas: 'sandalias', amuleto: 'colar', arma: 'espada' };

  /* ---------- Formatação e ícones ---------- */
  const nf = d => new Intl.NumberFormat('pt-BR', { minimumFractionDigits: d, maximumFractionDigits: d });
  const fmt = (v, d) => nf(d).format(v);
  const weightClass = kg => kg < 0.5 ? ['leve', 'Leve'] : kg <= 1.5 ? ['medio', 'Médio'] : ['pesado', 'Pesado'];
  const RAR_SVG = {
    comum: '<circle cx="12" cy="12" r="9"/><ellipse cx="12" cy="12" rx="3.5" ry="6"/>',
    raro: '<path d="M12 3l9.5 17h-19z"/><path d="M12 9.5l4.6 8.3H7.4z"/>',
    epico: '<path d="M12 2l10 10-10 10L2 12z"/><path d="M12 7l5 5-5 5-5-5z"/>',
    lendario: '<path d="M12 2l2.6 6.4L21 11l-6.4 2.6L12 21l-2.6-7.4L3 11l6.4-2.6z"/><circle cx="12" cy="11.5" r="2"/>'
  };
  const rarIcon = (r, cls = '') => `<svg class="${cls} rar-${r}" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round">${RAR_SVG[r]}</svg>`;
  const wbars = kg => `<i class="ms-wb" data-w="${weightClass(kg)[0]}" aria-hidden="true"><b></b><b></b><b></b></i>`;
  const sockIcon = s => s === 'buzio' ? `<span class="ms-sock" title="Engaste ocupado: búzio"><img src="${A}item-buzio.webp" alt="Búzio engastado"></span>`
    : s === 'open' ? '<span class="ms-sock open" title="Engaste livre"><svg viewBox="0 0 24 24" aria-label="Engaste livre"><path d="M12 3l2.4 6.6L21 12l-6.6 2.4L12 21l-2.4-6.6L3 12l6.6-2.4z"/></svg></span>'
    : '<span class="ms-sock locked" title="Engaste bloqueado"><svg viewBox="0 0 24 24" aria-label="Engaste bloqueado"><rect x="5" y="11" width="14" height="10" rx="1.5"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg></span>';

  /* ---------- Cards ---------- */
  function head(it) {
    const meta = it.lvl ? 'Nível ' + it.lvl : it.slot ? 'Slot ' + SLOTS[it.slot] : CAT_NAME[it.cat];
    return `<div class="ms-card-head">${rarIcon(it.r)}<div><div class="ms-card-name">${it.name}</div><div class="ms-card-meta"><b class="rar-${it.r}">${RARITY[it.r]}</b> • ${meta}</div></div></div>`;
  }
  function statRows(it, ref) {
    return STATS.map(([k, label, d, unit, better, icon]) => {
      const v = it.stats[k];
      let delta = '';
      if (ref) {
        const diff = +(v - ref.stats[k]).toFixed(d + 1), pct = Math.round(diff / ref.stats[k] * 100);
        if (Math.abs(diff) < 1e-9) delta = '<td class="d d-eq">= igual</td>';
        else {
          const good = (diff > 0) === (better === 'up');
          const sign = diff > 0 ? '+' : '−';
          delta = `<td class="d ${good ? 'd-pos' : 'd-neg'}">${good ? '▲' : '▼'} ${sign}${fmt(Math.abs(diff), d)}${unit}<small>${sign}${Math.abs(pct)}%</small><span class="ms-sr"> ${good ? 'melhor' : 'pior'}</span></td>`;
        }
      }
      return `<tr><th scope="row"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="${icon}"/></svg>${label}</th><td>${fmt(v, d)}${unit}</td>${ref ? delta : ''}</tr>`;
    }).join('');
  }
  function weaponBody(it, ref) {
    return `<div class="ms-card-art"><img src="${it.art}" alt=""></div><p class="ms-card-desc">${it.desc}</p>
      <table class="ms-stats"><caption class="ms-sr">Atributos${ref ? ' comparados com ' + ref.name : ''}</caption>${statRows(it, ref)}</table>
      <p class="ms-fx-title">Efeitos</p><ul class="ms-fx">${it.fx.map(([t, neg]) => `<li class="${neg ? 'neg' : ''}">${t}${neg ? '<span class="ms-sr"> (desvantagem)</span>' : ''}</li>`).join('')}</ul>
      <div class="ms-sockets"><span>Slots de aprimoramento</span>${it.sockets.map(sockIcon).join('')}</div>`;
  }
  // tab: Equipado, Novo item ou Inspecionar. ref: arma equipada, para calcular as diferenças. act: onde o item está e o que fazer.
  function cardHTML(tab, it, ref, act) {
    const tabEl = `<div class="ms-card-tab ${tab === 'Equipado' ? 'eq' : 'new'}">${tab}</div>`;
    if (it.stats) return `<article class="ms-card" aria-label="${tab}: ${it.name}">${tabEl}${head(it)}${weaponBody(it, tab === 'Equipado' ? null : ref)}</article>`;
    const [, wl] = weightClass(it.kg);
    return `<article class="ms-card" aria-label="${tab}: ${it.name}">${tabEl}${head(it)}
      <div class="ms-card-art sprite"><img src="${it.sprite}" alt=""></div><p class="ms-card-desc">${it.desc}</p>
      <dl class="ms-kv"><dt>Classe</dt><dd>${CAT_NAME[it.cat]}</dd>${it.slot ? `<dt>Slot do corpo</dt><dd>${SLOTS[it.slot]}</dd>` : ''}<dt>Peso</dt><dd>${wbars(it.kg)} ${fmt(it.kg, 1)} kg · ${wl}</dd><dt>Pegada</dt><dd>${it.w} × ${it.h} ${it.w * it.h > 1 ? 'células' : 'célula'}</dd><dt>Raridade</dt><dd class="rar-${it.r}">${RARITY[it.r]}</dd></dl>
      ${it.key ? '<p class="ms-key">◆ Objeto-chave: não pode ser largado nem desmontado.</p>' : ''}${act ? `<p class="ms-card-act">${act}</p>` : ''}</article>`;
  }
  const voidCard = (tab, slot, text) => `<article class="ms-card ms-card-void" aria-label="${tab}: slot ${SLOTS[slot]} vazio"><div class="ms-card-tab ${tab === 'Equipado' ? 'eq' : 'new'}">${tab}</div>
    <div class="ms-void"><img src="${A}slot-vazio-${slot}.webp" alt=""><p class="ms-void-title">${SLOTS[slot]}</p><p>${text}</p></div></article>`;

  // Anatomia (02): o estado da arte, fixo.
  const stage = document.querySelector('[data-cardstage]');
  if (stage) {
    stage.querySelector('[data-card=equipped]').innerHTML = cardHTML('Equipado', ITEMS.espada);
    stage.querySelector('[data-card=compare]').innerHTML = cardHTML('Novo item', ITEMS.sabre, ITEMS.espada);
  }

  /* ---------- 04 · Simulação de daltonismo ---------- */
  const cbStage = document.querySelector('[data-cb-stage]');
  cbStage?.querySelectorAll('[data-cb]').forEach(b => b.addEventListener('click', () => {
    cbStage.querySelectorAll('[data-cb]').forEach(x => x.setAttribute('aria-pressed', String(x === b)));
    cbStage.dataset.mode = b.dataset.cb;
  }));

  /* ---------- 03 · Tela interativa ---------- */
  const screen = document.querySelector('[data-screen]');
  if (!screen) return;
  const grid = screen.querySelector('[data-grid]');
  const toastEl = screen.querySelector('[data-toast]');
  const cardEq = screen.querySelector('.ms-cards [data-card=equipped]');
  const cardIn = screen.querySelector('.ms-cards [data-card=inspect]');
  const bodyZone = screen.querySelector('[data-body]');
  const bodyDesc = screen.querySelector('[data-body-desc]');
  const slotEls = Object.fromEntries([...screen.querySelectorAll('[data-slot]')].map(el => [el.dataset.slot, el]));
  const wearEls = [...screen.querySelectorAll('[data-wear]')];

  // Um item está em um só lugar: numa célula da imbamba (pos) ou num slot do corpo (eq), nunca nos dois.
  const state = { eq: { ...WORN }, pos: {}, filter: 'todos', inspect: { id: 'sabre' } };
  const worn = new Set(Object.values(WORN));
  for (const [id, [x, y]] of Object.entries(HOME)) if (!worn.has(id)) state.pos[id] = { x, y, rot: false };
  const slotOf = id => Object.keys(state.eq).find(s => state.eq[s] === id);
  const dimsOf = (id, rot) => { const it = ITEMS[id]; return rot ? [it.h, it.w] : [it.w, it.h]; };
  const dims = id => dimsOf(id, state.pos[id].rot);
  const inBounds = (x, y, w, h) => x >= 0 && y >= 0 && x + w <= COLS && y + h <= ROWS;

  function fits(id, x, y, w, h) {
    if (!inBounds(x, y, w, h)) return false;
    for (const [o, p] of Object.entries(state.pos)) {
      if (o === id) continue;
      const [ow, oh] = dims(o);
      if (x < p.x + ow && x + w > p.x && y < p.y + oh && y + h > p.y) return false;
    }
    return true;
  }
  // Primeiro lugar livre: as posições preferidas, depois a varredura linha a linha, em pé e depois deitado.
  function findSpot(id, prefs) {
    for (const p of prefs) if (p) { const [w, h] = dimsOf(id, p.rot); if (fits(id, p.x, p.y, w, h)) return { x: p.x, y: p.y, rot: p.rot }; }
    const it = ITEMS[id];
    for (const rot of it.w === it.h ? [false] : [false, true]) {
      const [w, h] = dimsOf(id, rot);
      for (let y = 0; y <= ROWS - h; y++) for (let x = 0; x <= COLS - w; x++) if (fits(id, x, y, w, h)) return { x, y, rot };
    }
    return null;
  }
  const homeOf = id => HOME[id] ? { x: HOME[id][0], y: HOME[id][1], rot: false } : null;

  const hint = document.createElement('div'); hint.className = 'ms-cell-hint'; grid.appendChild(hint);
  function showHint(id, x, y, w, h) {
    const out = !inBounds(x, y, w, h);
    let html = '';
    for (let j = 0; j < h; j++) for (let i = 0; i < w; i++) {
      const cx = x + i, cy = y + j;
      if (cx < 0 || cy < 0 || cx >= COLS || cy >= ROWS) continue;
      const bad = out || Object.entries(state.pos).some(([o, p]) => { if (o === id) return false; const [ow, oh] = dims(o); return cx >= p.x && cx < p.x + ow && cy >= p.y && cy < p.y + oh; });
      html += `<i class="${bad ? 'bad' : 'ok'}" style="left:calc(${cx}*60*var(--u));top:calc(${cy}*60*var(--u))"></i>`;
    }
    hint.innerHTML = html;
  }
  const clearHint = () => { hint.innerHTML = ''; };

  let toastTimer;
  function toast(msg, bad) {
    toastEl.textContent = msg;
    toastEl.classList.toggle('bad', !!bad);
    toastEl.classList.add('on');
    clearTimeout(toastTimer); toastTimer = setTimeout(() => toastEl.classList.remove('on'), 2800);
  }

  /* render */
  const spriteHTML = it => `<img src="${it.sprite}" alt="" style="width:calc(${it.sw}*var(--u))">`;
  function itemLabel(id) {
    const it = ITEMS[id], [w, h] = dims(id), [, wl] = weightClass(it.kg);
    return `${it.name}, ${RARITY[it.r]}, ${CAT_NAME[it.cat]}, ${fmt(it.kg, 1)} quilos, peso ${wl.toLowerCase()}, ocupa ${w} por ${h}${state.pos[id].rot ? ', girado' : ''}${it.slot ? `. Vai no slot ${SLOTS[it.slot]}: E para vestir` : ''}`;
  }
  function renderItem(id) {
    let el = grid.querySelector(`.ms-item[data-id="${id}"]`);
    const it = ITEMS[id];
    if (!el) {
      el = document.createElement('button');
      el.type = 'button'; el.className = 'ms-item'; el.dataset.id = id;
      el.innerHTML = `${spriteHTML(it)}<span class="ms-badge">${rarIcon(it.r)}</span>${wbars(it.kg)}`;
      grid.appendChild(el);
      bindItem(el);
    }
    const p = state.pos[id], [w, h] = dims(id);
    el.style.cssText = `--gx:${p.x};--gy:${p.y};--gw:${w};--gh:${h}`;
    el.classList.toggle('rot', p.rot);
    el.classList.toggle('dim', state.filter !== 'todos' && it.cat !== state.filter);
    el.classList.toggle('sel', state.inspect.id === id);
    el.setAttribute('aria-label', itemLabel(id));
  }
  function renderAll() {
    grid.querySelectorAll('.ms-item').forEach(el => { if (!state.pos[el.dataset.id]) el.remove(); });
    Object.keys(state.pos).forEach(renderItem);
    renderBody(); renderLoad(); renderFilters(); renderCards();
  }
  function renderBody() {
    wearEls.forEach(el => el.classList.toggle('off', !slotOf(el.dataset.wear)));
    for (const [s, el] of Object.entries(slotEls)) {
      const id = state.eq[s], img = el.querySelector('img');
      const src = id ? ITEMS[id].icon : `${A}slot-vazio-${s}.webp`;
      if (!img.src.endsWith(src)) img.src = src;
      el.classList.toggle('empty', !id);
      el.classList.toggle('sel', state.inspect.slot === s || (!!id && state.inspect.id === id));
      el.setAttribute('aria-label', id ? `${SLOTS[s]}: ${ITEMS[id].name}. Enter ou E tira e guarda na imbamba.` : `${SLOTS[s]}: vazio.`);
    }
    const on = Object.values(state.eq).filter(Boolean).map(id => ITEMS[id].name);
    bodyDesc.textContent = `Musanga ${on.length ? 'leva no corpo: ' + on.join(', ') : 'está sem nenhum item no corpo'}.`;
  }
  function renderLoad() {
    const kg = Object.keys(state.pos).reduce((s, id) => s + ITEMS[id].kg, 0);
    const pct = kg / MAX_LOAD, level = pct > 0.8 ? 'heavy' : pct >= 0.5 ? 'medium' : 'light';
    const box = screen.querySelector('[data-carga]');
    box.dataset.level = level;
    box.querySelector('[data-carga-val]').textContent = `${fmt(kg, 1)} / ${MAX_LOAD} kg`;
    box.querySelector('[data-carga-bar]').style.width = Math.min(100, pct * 100) + '%';
    box.querySelector('[data-carga-label]').textContent = { light: 'Carga leve', medium: 'Carga média', heavy: 'Carga pesada' }[level];
  }
  const filterBox = screen.querySelector('[data-filters]');
  filterBox.innerHTML = CATS.map(([k, label, icon]) => `<button type="button" data-f="${k}" aria-pressed="${k === 'todos'}"><img src="${A}${icon}" alt="">${label}<b></b></button>`).join('');
  filterBox.addEventListener('click', e => {
    const b = e.target.closest('[data-f]'); if (!b || b.disabled) return;
    state.filter = b.dataset.f; renderAll();
    const n = Object.keys(state.pos).filter(id => state.filter === 'todos' || ITEMS[id].cat === state.filter).length;
    toast(state.filter === 'todos' ? 'Mostrando todos os itens da imbamba.' : `${CAT_NAME[state.filter]}: ${n} ${n === 1 ? 'item' : 'itens'} em destaque na imbamba.`);
  });
  function renderFilters() {
    filterBox.querySelectorAll('[data-f]').forEach(b => {
      const k = b.dataset.f, n = Object.keys(state.pos).filter(id => k === 'todos' || ITEMS[id].cat === k).length;
      b.querySelector('b').textContent = n;
      b.setAttribute('aria-pressed', String(k === state.filter));
      b.disabled = n === 0 && k !== state.filter;
      b.setAttribute('aria-label', `${CAT_NAME[k]}, ${n} ${n === 1 ? 'item' : 'itens'} na imbamba`);
    });
  }
  function actText(id) {
    if (slotOf(id)) return 'No corpo. Arraste para a imbamba ou aperte <kbd>E</kbd> para tirar.';
    return ITEMS[id].slot ? `Na imbamba. Arraste para o corpo ou aperte <kbd>E</kbd> para vestir.` : 'Na imbamba. Não vai no corpo.';
  }
  // Card da esquerda: o que está no corpo, no mesmo slot do item em foco. Card da direita: o item em foco ou a alternativa da trouxa.
  function renderCards() {
    const { id, slot: sel } = state.inspect;
    const slot = sel || (id && ITEMS[id].slot);
    if (!slot) {
      const arma = state.eq.arma;
      cardEq.innerHTML = arma ? cardHTML('Equipado', ITEMS[arma]) : voidCard('Equipado', 'arma', 'Nenhuma arma na mão.');
      cardIn.innerHTML = cardHTML('Inspecionar', ITEMS[id], null, actText(id));
      return;
    }
    const eq = state.eq[slot], cand = Object.keys(state.pos).filter(o => ITEMS[o].slot === slot);
    const right = id && state.pos[id] ? id : cand[0];
    cardEq.innerHTML = eq ? cardHTML('Equipado', ITEMS[eq], null, ITEMS[eq].stats ? '' : actText(eq))
      : voidCard('Equipado', slot, right ? `Nada no corpo. Arraste <b>${ITEMS[right].name}</b> para cá ou aperte <kbd>E</kbd> sobre ele.` : 'Nada no corpo.');
    cardIn.innerHTML = right ? cardHTML('Novo item', ITEMS[right], eq && ITEMS[eq], actText(right))
      : voidCard('Novo item', slot, slot === 'punhos' ? 'Nenhum item de punho nesta imbamba.' : `Nenhuma outra peça de ${SLOTS[slot].toLowerCase()} na imbamba.`);
  }
  function inspect(next) {
    if (state.inspect.id === next.id && state.inspect.slot === next.slot) return;
    state.inspect = next;
    grid.querySelectorAll('.ms-item').forEach(el => el.classList.toggle('sel', el.dataset.id === next.id));
    renderBody(); renderCards();
  }

  /* vestir e tirar */
  function equip(id) {
    const it = ITEMS[id];
    if (!it.slot) { toast(`Sem slot no corpo para ${it.name}: o item fica na imbamba.`, true); return false; }
    const from = state.pos[id], old = state.eq[it.slot];
    delete state.pos[id];
    if (old) {
      // A peça que sai do corpo ocupa o lugar da que entrou; se não couber, volta para a posição de origem ou para o primeiro espaço livre.
      const spot = findSpot(old, [from, homeOf(old)]);
      if (!spot) { state.pos[id] = from; toast(`Sem espaço na imbamba para guardar ${ITEMS[old].name}.`, true); return false; }
      state.pos[old] = spot;
    }
    state.eq[it.slot] = id;
    state.inspect = { id };
    renderAll();
    toast(old ? `${it.name} no corpo. ${ITEMS[old].name} voltou para a imbamba.` : `${it.name} no corpo, slot ${SLOTS[it.slot]}.`);
    if (old) grid.querySelector(`.ms-item[data-id="${old}"]`)?.focus({ preventScroll: true });
    else slotEls[it.slot].focus({ preventScroll: true });
    return true;
  }
  function unequip(slot, at) {
    const id = state.eq[slot];
    if (!id) { toast(`Slot ${SLOTS[slot]} vazio. Escolha uma peça na imbamba e aperte E.`); return false; }
    const spot = at ? (fits(id, at.x, at.y, ...dimsOf(id, at.rot)) ? at : null) : findSpot(id, [homeOf(id)]);
    if (!spot) { toast(at ? 'Essas células estão ocupadas: a peça continua no corpo.' : `Sem espaço na imbamba para ${ITEMS[id].name}.`, true); return false; }
    state.eq[slot] = null; state.pos[id] = spot; state.inspect = { id };
    renderAll();
    toast(`Na imbamba: ${ITEMS[id].name}.`);
    grid.querySelector(`.ms-item[data-id="${id}"]`)?.focus({ preventScroll: true });
    return true;
  }
  function rotate(id) {
    const p = state.pos[id], it = ITEMS[id];
    if (it.w === it.h) { toast(`Girar não muda nada: ${it.name} ocupa um quadrado.`); return; }
    const [w, h] = dims(id);
    if (!fits(id, p.x, p.y, h, w)) { toast(`Sem espaço para girar ${it.name} aqui.`, true); showHint(id, p.x, p.y, h, w); setTimeout(clearHint, 900); return; }
    p.rot = !p.rot; renderItem(id); toast(`Item girado: ${it.name}.`);
  }

  /* arrastar com ponteiro: da imbamba para o corpo, do corpo para a imbamba e dentro da imbamba */
  const cellPx = () => grid.getBoundingClientRect().width / COLS;
  const inside = (r, e) => e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom;
  function dropTarget(e) {
    for (const [s, el] of Object.entries(slotEls)) if (inside(el.getBoundingClientRect(), e)) return { slot: s };
    if (inside(bodyZone.getBoundingClientRect(), e)) return { body: true };
    if (inside(grid.getBoundingClientRect(), e)) return { grid: true };
    return null;
  }
  function markSlots(id, t) {
    const want = ITEMS[id].slot;
    for (const [s, el] of Object.entries(slotEls)) {
      const over = t && (t.slot === s || (t.body && s === want));
      el.classList.toggle('target', s === want);
      el.classList.toggle('drop-ok', !!over && s === want);
      el.classList.toggle('drop-bad', !!over && s !== want);
    }
  }
  const unmarkSlots = () => Object.values(slotEls).forEach(el => el.classList.remove('target', 'drop-ok', 'drop-bad'));
  const wrongSlot = (id, s) => ITEMS[id].slot ? `O slot de ${ITEMS[id].name} é ${SLOTS[ITEMS[id].slot]}, não ${SLOTS[s]}.` : `Sem slot no corpo para ${ITEMS[id].name}: o item fica na imbamba.`;

  function bindItem(el) {
    const id = el.dataset.id;
    let drag = null;
    el.addEventListener('pointerdown', e => {
      if (e.button !== 0 || carry) return;
      const r = el.getBoundingClientRect();
      drag = { sx: e.clientX, sy: e.clientY, ox: e.clientX - r.left, oy: e.clientY - r.top, moved: false, t: null, cell: null };
      el.setPointerCapture(e.pointerId);
    });
    el.addEventListener('pointermove', e => {
      if (!drag) return;
      const dx = e.clientX - drag.sx, dy = e.clientY - drag.sy;
      if (!drag.moved && Math.hypot(dx, dy) < 5) return;
      if (!drag.moved) { drag.moved = true; el.classList.add('lift'); inspect({ id }); }
      el.style.transform = `translate(${dx}px, ${dy}px)`;
      drag.t = dropTarget(e);
      markSlots(id, drag.t);
      if (drag.t && (drag.t.slot || drag.t.body)) { clearHint(); return; }
      const g = grid.getBoundingClientRect(), c = cellPx(), [w, h] = dims(id);
      drag.cell = [Math.round((e.clientX - drag.ox - g.left) / c), Math.round((e.clientY - drag.oy - g.top) / c)];
      showHint(id, drag.cell[0], drag.cell[1], w, h);
    });
    const end = e => {
      if (!drag) return;
      const d = drag; drag = null;
      el.classList.remove('lift'); el.style.transform = ''; clearHint(); unmarkSlots();
      if (!d.moved) { inspect({ id }); return; }
      if (e.type === 'pointercancel') return;
      const t = d.t;
      if (t && (t.body || t.slot)) {
        if (t.slot && t.slot !== ITEMS[id].slot) toast(wrongSlot(id, t.slot), true);
        else equip(id);
        return;
      }
      const [x, y] = d.cell, [w, h] = dims(id);
      if (fits(id, x, y, w, h)) { state.pos[id].x = x; state.pos[id].y = y; renderItem(id); }
      else toast(!inBounds(x, y, w, h) ? 'Fora da imbamba: o item voltou para o lugar.' : 'Essas células estão ocupadas: o item voltou para o lugar.', true);
    };
    el.addEventListener('pointerup', end);
    el.addEventListener('pointercancel', end);
    el.addEventListener('contextmenu', e => { e.preventDefault(); rotate(id); });
    el.addEventListener('dblclick', () => equip(id));
    el.addEventListener('focus', () => inspect({ id }));
    el.addEventListener('mouseenter', () => inspect({ id }));
  }

  // Do corpo para a imbamba: um fantasma do tamanho da pegada segue o ponteiro.
  for (const [s, el] of Object.entries(slotEls)) {
    let drag = null;
    el.addEventListener('pointerdown', e => {
      if (e.button !== 0 || !state.eq[s]) return;
      drag = { sx: e.clientX, sy: e.clientY, ghost: null, cell: null };
      el.setPointerCapture(e.pointerId);
    });
    el.addEventListener('pointermove', e => {
      if (!drag) return;
      const id = state.eq[s];
      if (!drag.ghost) {
        if (Math.hypot(e.clientX - drag.sx, e.clientY - drag.sy) < 5) return;
        const [w, h] = dimsOf(id, false);
        drag.ghost = document.createElement('div');
        drag.ghost.className = 'ms-ghost';
        drag.ghost.style.cssText = `width:calc(${w}*60*var(--u));height:calc(${h}*60*var(--u))`;
        drag.ghost.innerHTML = spriteHTML(ITEMS[id]);
        screen.appendChild(drag.ghost);
        el.classList.add('lifting');
        inspect({ id });
      }
      const sr = screen.getBoundingClientRect(), gw = drag.ghost.offsetWidth, gh = drag.ghost.offsetHeight;
      drag.ghost.style.transform = `translate(${e.clientX - sr.left - gw / 2}px, ${e.clientY - sr.top - gh / 2}px)`;
      const t = dropTarget(e);
      if (t && t.grid) {
        const g = grid.getBoundingClientRect(), c = cellPx(), [w, h] = dimsOf(id, false);
        drag.cell = { x: Math.round((e.clientX - g.left) / c - w / 2), y: Math.round((e.clientY - g.top) / c - h / 2), rot: false };
        showHint(id, drag.cell.x, drag.cell.y, w, h);
      } else { drag.cell = null; clearHint(); }
    });
    const end = e => {
      if (!drag) return;
      const d = drag; drag = null;
      clearHint(); el.classList.remove('lifting');
      if (!d.ghost) { inspect({ slot: s }); return; }
      d.ghost.remove();
      if (e.type === 'pointercancel') return;
      if (d.cell) unequip(s, d.cell);
    };
    el.addEventListener('pointerup', end);
    el.addEventListener('pointercancel', end);
    el.addEventListener('dblclick', () => unequip(s));
    el.addEventListener('focus', () => inspect({ slot: s }));
    el.addEventListener('mouseenter', () => inspect({ slot: s }));
    el.addEventListener('keydown', e => {
      if (['Enter', ' ', 'e', 'E'].includes(e.key)) { e.preventDefault(); unequip(s); }
    });
  }

  /* teclado: Enter pega, setas movem, Enter solta, Esc cancela */
  let carry = null;
  grid.addEventListener('keydown', e => {
    const el = e.target.closest('.ms-item'); if (!el) return;
    const id = el.dataset.id, k = e.key;
    if (carry && carry.id === id) {
      const [w, h] = dims(id);
      const moves = { ArrowLeft: [-1, 0], ArrowRight: [1, 0], ArrowUp: [0, -1], ArrowDown: [0, 1] };
      if (moves[k]) {
        e.preventDefault();
        carry.x = Math.max(0, Math.min(COLS - w, carry.x + moves[k][0]));
        carry.y = Math.max(0, Math.min(ROWS - h, carry.y + moves[k][1]));
        showHint(id, carry.x, carry.y, w, h);
        el.style.cssText = `--gx:${carry.x};--gy:${carry.y};--gw:${w};--gh:${h}`;
        toast(`${fits(id, carry.x, carry.y, w, h) ? 'Livre' : 'Ocupado'}: coluna ${carry.x + 1}, linha ${carry.y + 1}.`, !fits(id, carry.x, carry.y, w, h));
      } else if (k === 'Enter' || k === ' ') {
        e.preventDefault();
        if (fits(id, carry.x, carry.y, w, h)) { state.pos[id].x = carry.x; state.pos[id].y = carry.y; toast(`Item solto na coluna ${carry.x + 1}, linha ${carry.y + 1}.`); endCarry(el); }
        else toast('Células ocupadas: escolha outro lugar ou Esc para cancelar.', true);
      } else if (k === 'Escape') { e.preventDefault(); toast('Movimento cancelado.'); endCarry(el); }
      return;
    }
    if (k === 'Enter' || k === ' ') { e.preventDefault(); carry = { id, x: state.pos[id].x, y: state.pos[id].y }; el.classList.add('carry'); toast(`${ITEMS[id].name} na mão: setas para mover, Enter para soltar, Esc para cancelar.`); }
    else if (k === 'r' || k === 'R') { e.preventDefault(); rotate(id); }
    else if (k === 'e' || k === 'E') { e.preventDefault(); equip(id); }
  });
  function endCarry(el) { carry = null; el.classList.remove('carry'); clearHint(); renderItem(el.dataset.id); }
  grid.addEventListener('focusout', e => { if (carry && e.target.dataset.id === carry.id) endCarry(e.target); });

  // Pré-carrega ícones de slot e desenhos da grade para a primeira troca não piscar.
  Object.keys(SLOTS).forEach(s => { new Image().src = `${A}slot-vazio-${s}.webp`; });
  Object.values(ITEMS).forEach(it => { new Image().src = it.sprite; if (it.icon) new Image().src = it.icon; });
  screen.classList.toggle('no-anim', reduced.matches);
  renderAll();
})();

(() => {
  'use strict';
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  // Textos que o script escreve; o resto da página é traduzido por shared/cases-i18n/aether-protocol.js.
  const UI = {
    pt: { click: 'Clique', auto: 'Automático', manual: 'Manual', pc: 'Teclado e mouse', loading: 'Carregando cena 3D…', ready: 'Cena aberta · clique nela para jogar', frame: 'Protótipo 3D interativo de Star Marshal' },
    en: { click: 'Click', auto: 'Automatic', manual: 'Manual', pc: 'Keyboard & mouse', loading: 'Loading 3D scene…', ready: 'Scene ready · click it to play', frame: 'Star Marshal interactive 3D prototype' },
    es: { click: 'Clic', auto: 'Automático', manual: 'Manual', pc: 'Teclado y ratón', loading: 'Cargando escena 3D…', ready: 'Escena lista · haz clic para jugar', frame: 'Prototipo 3D interactivo de Star Marshal' },
    fr: { click: 'Clic', auto: 'Automatique', manual: 'Manuel', pc: 'Clavier et souris', loading: 'Chargement de la scène 3D…', ready: 'Scène prête · cliquez pour jouer', frame: 'Prototype 3D interactif de Star Marshal' }
  };
  const ui = () => UI[(document.documentElement.lang || 'pt').slice(0, 2)] || UI.pt;

  /* ---------- Revelar ao rolar ---------- */
  const reveal = [...document.querySelectorAll('.rv')];
  if ('IntersectionObserver' in window && !reduced.matches) {
    const io = new IntersectionObserver(entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { rootMargin: '0px 0px -8% 0px' });
    reveal.forEach(el => io.observe(el));
  } else reveal.forEach(el => el.classList.add('in'));

  /* ---------- 02 · Estados do HUD: abas com setas, Home e End ---------- */
  const tabs = [...document.querySelectorAll('[data-state]')];
  function selectState(tab) {
    const state = tab.dataset.state;
    tabs.forEach(t => { const on = t === tab; t.setAttribute('aria-selected', String(on)); t.tabIndex = on ? 0 : -1; });
    document.querySelectorAll('[data-shot] img').forEach(img => img.classList.toggle('on', img.dataset.for === state));
    document.querySelectorAll('.sm-pins').forEach(p => { p.hidden = p.dataset.for !== state; });
    document.querySelectorAll('[data-panel]').forEach(p => { p.hidden = p.dataset.panel !== state; });
  }
  tabs.forEach((tab, i) => {
    tab.addEventListener('click', () => selectState(tab));
    tab.addEventListener('keydown', e => {
      const next = { ArrowRight: (i + 1) % tabs.length, ArrowLeft: (i + tabs.length - 1) % tabs.length, Home: 0, End: tabs.length - 1 }[e.key];
      if (next === undefined) return;
      e.preventDefault(); selectState(tabs[next]); tabs[next].focus();
    });
  });

  /* ---------- 03 · Glyphs dinâmicos ---------- */
  // Mesmos ícones e cores do protótipo: o último dispositivo usado decide a família.
  const ring = (stroke, inner) => `<svg viewBox="0 0 28 28" aria-hidden="true"><circle cx="14" cy="14" r="12" fill="#12313A" stroke="${stroke}" stroke-width="2"/>${inner}</svg>`;
  const letter = (c, t) => ring(c, `<text x="14" y="18.5" text-anchor="middle" fill="${c}" font-family="Oswald,sans-serif" font-weight="600" font-size="13">${t}</text>`);
  const key = (t, wide) => `<span class="sm-key${wide ? ' wide' : ''}">${t}</span>`;
  const GLYPHS = {
    ps: {
      name: 'PlayStation',
      interact: ring('#5FB5AE', '<path d="M9 9l10 10M19 9L9 19" stroke="#5FB5AE" stroke-width="2.2" stroke-linecap="round"/>'),
      reload: ring('#C83A6E', '<rect x="9" y="9" width="10" height="10" fill="none" stroke="#E46A98" stroke-width="2"/>'),
      scanner: ring('#5FB5AE', '<path d="M14 7.5l6.5 11h-13z" fill="none" stroke="#5FB5AE" stroke-width="2" stroke-linejoin="round"/>'),
      heal: ring('#F94524', '<circle cx="14" cy="14" r="5.5" fill="none" stroke="#F94524" stroke-width="2.2"/>'),
      wheel: key('L1', true), fire: key('R2', true),
      text: { interact: '✕', heal: '◯', wheel: 'L1' }
    },
    xbox: {
      name: 'Xbox',
      interact: letter('#8DBF5A', 'A'), reload: letter('#5FB5AE', 'X'), scanner: letter('#FAB02D', 'Y'), heal: letter('#F94524', 'B'),
      wheel: key('LB', true), fire: key('RT', true),
      text: { interact: 'A', heal: 'B', wheel: 'LB' }
    },
    pc: {
      name: 'Teclado e mouse',
      interact: key('E'), reload: key('R'), scanner: key('V'), heal: key('Q'),
      wheel: key('Tab', true),
      text: { interact: 'Enter', heal: 'Esc', wheel: 'Tab' }
    }
  };
  const demo = document.querySelector('[data-input-demo]');
  const detected = document.getElementById('input-detected');
  let mode = 'auto', current = null;

  function showGlyphs(platform) {
    const changed = platform !== current;
    current = platform;
    const g = GLYPHS[platform];
    document.querySelectorAll('.sm-glyph').forEach(el => {
      el.innerHTML = platform === 'pc' && el.dataset.action === 'fire' ? key(ui().click, true) : g[el.dataset.action];
      if (changed && !reduced.matches) { el.classList.remove('swap'); void el.offsetWidth; el.classList.add('swap'); }
    });
    document.querySelectorAll('[data-glyph-text]').forEach(el => { el.textContent = g.text[el.dataset.glyphText]; });
    demo.querySelectorAll('[data-col]').forEach(el => el.classList.toggle('on', el.dataset.col === platform));
    const l = ui();
    detected.textContent = (mode === 'auto' ? l.auto : l.manual) + ' · ' + (platform === 'pc' ? l.pc : g.name);
  }
  function useDevice(platform) { if (mode === 'auto' && platform !== current) showGlyphs(platform); }

  demo.querySelectorAll('[data-platform]').forEach(btn => btn.addEventListener('click', () => {
    mode = btn.dataset.platform === 'auto' ? 'auto' : 'manual';
    demo.querySelectorAll('[data-platform]').forEach(b => b.setAttribute('aria-pressed', String(b === btn)));
    showGlyphs(mode === 'auto' ? (current || 'pc') : btn.dataset.platform);
  }));
  addEventListener('keydown', () => useDevice('pc'));
  addEventListener('pointermove', e => { if (e.pointerType === 'mouse' && Math.abs(e.movementX) + Math.abs(e.movementY) > 2) useDevice('pc'); });

  // Gamepad API: lê o controle só enquanto a seção está na tela.
  const platformOf = id => /sony|playstation|dualsense|dualshock|054c/i.test(id) ? 'ps' : 'xbox';
  let polling = false, demoVisible = false;
  function poll() {
    if (!demoVisible || document.hidden) { polling = false; return; }
    for (const pad of navigator.getGamepads()) {
      if (pad && pad.mapping === 'standard' && (pad.buttons.some(b => b.pressed) || pad.axes.some(a => Math.abs(a) > 0.3))) useDevice(platformOf(pad.id));
    }
    requestAnimationFrame(poll);
  }
  function startPolling() { if (!polling && demoVisible && navigator.getGamepads) { polling = true; requestAnimationFrame(poll); } }
  if ('IntersectionObserver' in window) new IntersectionObserver(([e]) => { demoVisible = e.isIntersecting; startPolling(); }).observe(demo);
  addEventListener('gamepadconnected', e => { if (e.gamepad.mapping === 'standard') useDevice(platformOf(e.gamepad.id)); startPolling(); });
  document.addEventListener('visibilitychange', startPolling);
  showGlyphs('pc');
  addEventListener('portfolio-lang-change', () => showGlyphs(current));

  /* ---------- 07 · Protótipo sob demanda ---------- */
  const start = document.getElementById('start-demo');
  const container = document.getElementById('demo-container');
  const placeholder = document.getElementById('demo-placeholder');
  const controls = document.getElementById('demo-controls');
  const status = document.getElementById('demo-status');
  let demoObserver;
  start.addEventListener('click', () => {
    const frame = document.createElement('iframe');
    frame.title = ui().frame;
    frame.src = 'simulator.html';
    frame.allow = 'fullscreen; gamepad';
    status.textContent = ui().loading;
    frame.addEventListener('load', () => {
      status.textContent = ui().ready;
      if ('IntersectionObserver' in window) {
        // A cena pausa quando sai da tela (o simulador escuta esta mensagem).
        demoObserver = new IntersectionObserver(([e]) => frame.contentWindow?.postMessage({ type: 'marshal-visibility', visible: e.isIntersecting }, location.origin === 'null' ? '*' : location.origin));
        demoObserver.observe(frame);
      }
    });
    container.replaceChildren(frame);
    placeholder.hidden = true;
    container.hidden = false;
    controls.hidden = false;
    document.getElementById('stop-demo').focus({ preventScroll: true });
  });
  document.getElementById('stop-demo').addEventListener('click', () => {
    demoObserver?.disconnect();
    container.replaceChildren();
    container.hidden = true; controls.hidden = true; placeholder.hidden = false;
    start.focus({ preventScroll: true });
  });
})();

/* Monta a sequência de capas em tela cheia (hero + [data-seg-track]) a
   partir de window.PORTFOLIO_CASES / PORTFOLIO_GROUPS.
   - Página de segmento: <body data-segment="uxui"> + [data-seg-hero] +
     [data-seg-track]. Mostra só os cases daquele grupo, com hero.
   - Home: <body> sem data-segment, só com [data-seg-track] (sem hero cá —
     a home já tem o seu próprio hero com vídeo). Mostra TODOS os cases.
   Carregar depois de shared/cases.js e shared/frame.js. */
(function(){
  'use strict';
  var id = document.body.getAttribute('data-segment');
  var g = id ? (window.PORTFOLIO_GROUPS || []).filter(function(x){ return x.id === id })[0] : null;
  var cases = id ? (window.PORTFOLIO_CASES || []).filter(function(c){ return c.group === id })
                 : (window.PORTFOLIO_CASES || []);
  if (id && !g) return; // data-segment aponta pra um id que não existe

  var root = document.body.getAttribute('data-root') || '../';
  var esc = function(t){ return String(t).replace(/[&<>"]/g,function(m){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[m]}) };
  // window.scrollTo em vez de el.scrollIntoView: mais confiável entre
  // navegadores pra rolagem suave disparada por JS.
  var scrollToEl = function(el){ window.scrollTo({ top: scrollY + el.getBoundingClientRect().top, behavior:'smooth' }) };
  if (g) document.documentElement.style.setProperty('--seg-color', g.color);

  // Botão do currículo: abre um menu com a versão PT e EN, cada uma com
  // "ver" (página A4) e "PDF" (download).
  function cvMenu(base){
    var row = function(lang, label, view, file){
      return '<div class="seg-cv-row" lang="' + lang + '"><span>' + label + '</span>' +
        '<a href="' + file + '.html">' + view + '</a>' +
        '<a href="' + file + '.pdf" download><i class="fa-solid fa-download" aria-hidden="true"></i> PDF</a></div>';
    };
    return '<details class="seg-cv"><summary class="seg-btn primary"><i class="fa-solid fa-file-lines" aria-hidden="true"></i> Currículo deste segmento <i class="fa-solid fa-chevron-down seg-cv-caret" aria-hidden="true"></i></summary>' +
      '<div class="seg-cv-menu">' + row('pt-BR', 'Português', 'Ver', base) + row('en', 'English', 'View', base + '_en') + '</div></details>';
  }

  var hero = g && document.querySelector('[data-seg-hero]');
  if (hero) {
    hero.innerHTML =
      '<span class="seg-hero-icon" aria-hidden="true"><i class="fa-solid ' + g.icon + '"></i></span>' +
      '<p class="eyebrow"><b>Segmento</b> · ' + cases.length + ' case' + (cases.length>1?'s':'') + '</p>' +
      '<h1>' + esc(g.label) + '</h1>' +
      '<p class="lede">' + esc(g.desc) + '</p>' +
      '<p class="seg-hero-kpi"><i class="fa-solid fa-chart-line" aria-hidden="true"></i>' + esc(g.kpi) + '</p>' +
      '<div class="seg-hero-actions">' +
        (g.cv ? cvMenu(g.cv) : '') +
        '<a class="seg-btn ghost" href="' + root + 'index.html"><i class="fa-solid fa-arrow-left" aria-hidden="true"></i> Todos os segmentos</a>' +
      '</div>' +
      '<button type="button" class="seg-scroll-cue" id="seg-scroll-cue" aria-label="Rolar para ver os cases"><i class="fa-solid fa-chevron-down" aria-hidden="true"></i></button>';
  }

  var LINK_LABELS = {
    pt: 'Ver case completo',
    en: 'View full case',
    es: 'Ver caso completo',
    fr: 'Voir le projet'
  };

  var cv = hero && hero.querySelector('.seg-cv');
  if (cv) {
    document.addEventListener('click', function(e){ if (cv.open && !cv.contains(e.target)) cv.open = false });
    document.addEventListener('keydown', function(e){
      if (e.key === 'Escape' && cv.open) { cv.open = false; cv.querySelector('summary').focus() }
    });
  }

  var track = document.querySelector('[data-seg-track]');
  var cue = document.getElementById('seg-scroll-cue');
  if (cue) cue.addEventListener('click', function(){
    var first = track && track.querySelector('[data-seg-case]');
    if (first) scrollToEl(first);
  });

  var reduced = typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var sections = [];

  // Reveal + troca de case: fade/scale ao entrar na viewport.
  var io = (typeof IntersectionObserver === 'function' && !reduced) ? new IntersectionObserver(function(entries){
    entries.forEach(function(e){ e.target.classList.toggle('in-view', e.isIntersecting) });
  }, { threshold: .45 }) : null;

  function renderTrack(lang) {
    if (!track) return;
    lang = lang || (window.PORTFOLIO_I18N && window.PORTFOLIO_I18N.getLang ? window.PORTFOLIO_I18N.getLang() : 'en');
    var label = LINK_LABELS[lang] || LINK_LABELS.en;
    track.innerHTML = cases.map(function(c, i){
      var title = c.displayTitle || c.title;
      var blurb = c.displayBlurb || c.blurb;
      var tags = (c.displayTags || c.tags || []).slice(0,3).map(esc).join('</span><span>');
      var mobCover = c.coverMobile ? (root + esc(c.coverMobile)) : null;
      return '<a class="seg-case" data-seg-case="' + esc(c.slug) + '" href="' + root + c.slug + '/index.html" aria-label="' + esc(title) + ': ' + esc(label) + '">' +
        '<picture class="seg-case-pic">' +
          (mobCover ? '<source media="(max-width: 768px)" srcset="' + mobCover + '">' : '') +
          '<img class="seg-case-bg" src="' + root + esc(c.cover) + '" alt="" loading="' + (i===0?'eager':'lazy') + '">' +
        '</picture>' +
        '<div class="seg-case-scrim" aria-hidden="true"></div>' +
        '<div class="seg-case-content">' +
          '<div class="seg-case-index">' + String(i+1).padStart(2,'0') + ' / ' + String(cases.length).padStart(2,'0') + '</div>' +
          '<div class="seg-case-tags"><span>' + tags + '</span></div>' +
          '<h2>' + esc(title) + '</h2>' +
          '<p>' + esc(blurb) + '</p>' +
          '<span class="seg-case-link">' + esc(label) + ' <i class="fa-solid fa-arrow-right" aria-hidden="true"></i></span>' +
        '</div>' +
      '</a>';
    }).join('');
    sections = Array.prototype.slice.call(track.querySelectorAll('[data-seg-case]'));
    if (reduced) {
      sections.forEach(function(s){ s.classList.add('in-view') });
    } else if (io) {
      sections.forEach(function(s){ io.observe(s) });
    }

    // Auto-probe cases where capa_mobile.png might be added later
    cases.forEach(function(c){
      if (!c.coverMobile) {
        var testUrl = root + c.slug + '/assets/capa_mobile.png';
        var probe = new Image();
        probe.onload = function(){
          c.coverMobile = c.slug + '/assets/capa_mobile.png';
          var pic = track.querySelector('[data-seg-case="' + c.slug + '"] .seg-case-pic');
          if (pic && !pic.querySelector('source')) {
            var src = document.createElement('source');
            src.media = '(max-width: 768px)';
            src.srcset = testUrl;
            pic.insertBefore(src, pic.firstChild);
          }
        };
        probe.src = testUrl;
      }
    });
  }
  renderTrack();

  window.addEventListener('portfolio-lang-change', function(e){
    renderTrack(e.detail ? e.detail.lang : null);
  });

  // Parallax: o fundo de cada case se desloca mais devagar que o scroll.
  var ticking = false;
  function updateParallax(){
    ticking = false;
    var vh = innerHeight;
    sections.forEach(function(s){
      var r = s.getBoundingClientRect();
      if (r.bottom < -vh || r.top > vh * 2) return; // fora do alcance, não calcula
      var center = r.top + r.height / 2 - vh / 2;
      var bg = s.querySelector('.seg-case-bg');
      if (bg) bg.style.setProperty('--seg-py', (center * -0.12).toFixed(1) + 'px');
    });
  }
  addEventListener('scroll', function(){
    if (!ticking) { ticking = true; requestAnimationFrame(updateParallax) }
  }, { passive:true });
  updateParallax();

  // ---------- Transição tela-a-tela: 1 gesto de scroll = 1 case inteiro ----------
  // Em vez de deixar a rolagem continuar livre entre os cases, cada wheel /
  // toque / tecla troca inteiramente de case (como slides), com uma trava
  // curta pra não pular vários de uma vez. scroll-snap (no CSS) fica como
  // rede de segurança pra qualquer gesto que escape da captura abaixo.
  var locked = false;
  var LOCK_MS = 750;

  function currentIndex(){
    var best = 0, bestDist = Infinity;
    sections.forEach(function(s, i){
      var d = Math.abs(s.getBoundingClientRect().top);
      if (d < bestDist) { bestDist = d; best = i; }
    });
    return best;
  }
  function withinTrack(){
    var r = track.getBoundingClientRect();
    return r.top <= 1 && r.bottom >= innerHeight - 1;
  }
  function goTo(i){
    if (i < 0 || i >= sections.length) return;
    locked = true;
    scrollToEl(sections[i]);
    setTimeout(function(){ locked = false; updateParallax() }, LOCK_MS);
  }

  addEventListener('wheel', function(e){
    if (locked) { if (withinTrack()) e.preventDefault(); return; }
    if (!withinTrack()) return;
    var next = currentIndex() + (e.deltaY > 0 ? 1 : -1);
    if (next < 0 || next >= sections.length) return; // deixa escapar pro conteúdo antes/depois da sequência
    e.preventDefault();
    goTo(next);
  }, { passive:false });

  var touchStartY = null;
  addEventListener('touchstart', function(e){
    touchStartY = withinTrack() ? e.touches[0].clientY : null;
  }, { passive:true });
  addEventListener('touchmove', function(e){
    if (touchStartY === null || locked) return;
    var dy = touchStartY - e.touches[0].clientY;
    if (Math.abs(dy) < 44) return;
    var next = currentIndex() + (dy > 0 ? 1 : -1);
    touchStartY = null;
    if (next < 0 || next >= sections.length) return;
    goTo(next);
  }, { passive:true });

  addEventListener('keydown', function(e){
    if (locked || !withinTrack()) return;
    if (e.key === 'ArrowDown' || e.key === 'PageDown') {
      var next = currentIndex() + 1;
      if (next < sections.length) { e.preventDefault(); goTo(next) }
    } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
      var prev = currentIndex() - 1;
      if (prev >= 0) { e.preventDefault(); goTo(prev) }
    }
  });
})();

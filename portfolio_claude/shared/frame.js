/* Portfolio frame behaviour.
   - Builds the case switcher, the "next case" card and the home grid from shared/cases.js
   - Injects the multilingual language picker (PT | EN | ES | FR)
   - Synchronizes language switching via shared/i18n.js
   - Reading progress + active section in the nav
   - Mobile full-screen viewer for [data-immersive] stages
   - Footer year
   Load after shared/cases.js. Pages mark their case with <body data-case="slug">. */
(function(){
  'use strict';
  var $ = function(s){ return document.querySelector(s) };
  var $$ = function(s){ return Array.prototype.slice.call(document.querySelectorAll(s)) };
  var me = document.currentScript && document.currentScript.src;
  var ROOT = me ? me.replace(/shared\/frame\.js(\?.*)?$/,'') : '';
  var CASES = window.PORTFOLIO_CASES || [];
  var current = document.body.getAttribute('data-case');
  var url = function(c){ return ROOT + c.slug + '/index.html' };
  var esc = function(t){ return String(t).replace(/[&<>"]/g,function(m){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[m]}) };

  // Footer year auto-update
  $$('[data-year]').forEach(function(el){ el.textContent = new Date().getFullYear() });

  // 1. Language Picker Injection & Synchronization
  function injectLangPicker() {
    var picker = $('.pf-lang-picker');
    var currentLang = (window.PORTFOLIO_I18N && window.PORTFOLIO_I18N.getLang) ? window.PORTFOLIO_I18N.getLang() : 'pt';

    if (!picker) {
      var target = $('.pf-nav .wrap') || $('.home-top .wrap') || $('.top-bar') || $('.header-nav');
      if (!target) return;

      picker = document.createElement('div');
      picker.className = 'pf-lang-picker';
      picker.setAttribute('role', 'group');
      picker.setAttribute('aria-label', 'Language selection');
      picker.innerHTML = [
        { code: 'pt', label: 'PT', title: 'Português' },
        { code: 'en', label: 'EN', title: 'English' },
        { code: 'es', label: 'ES', title: 'Español' },
        { code: 'fr', label: 'FR', title: 'Français' }
      ].map(function(l){
        var active = l.code === currentLang ? ' active on' : '';
        return '<button type="button" class="pf-lang-btn'+active+'" data-lang="'+l.code+'" aria-pressed="'+(l.code === currentLang)+'" title="'+l.title+'">'+l.label+'</button>';
      }).join('');

      var contact = target.querySelector('.home-contact') || target.querySelector('.btn-pill.primary') || target.querySelector('.pf-cases');
      if (contact && (target.classList.contains('home-top') || target.classList.contains('top-bar'))) {
        target.insertBefore(picker, contact);
      } else {
        target.appendChild(picker);
      }
    }

    // Sync button classes with currentLang
    var btns = picker.querySelectorAll('.pf-lang-btn');
    Array.prototype.forEach.call(btns, function(btn){
      var isCurrent = btn.getAttribute('data-lang') === currentLang;
      btn.classList.toggle('active', isCurrent);
      btn.classList.toggle('on', isCurrent);
      btn.setAttribute('aria-pressed', isCurrent ? 'true' : 'false');
    });
  }

  // Ensure i18n script is loaded
  function ensureI18n(cb) {
    if (window.PORTFOLIO_I18N) {
      if (cb) cb();
      return;
    }
    var s = document.createElement('script');
    s.src = ROOT + 'shared/i18n.js';
    s.onload = function(){
      if (window.PORTFOLIO_I18N && window.PORTFOLIO_I18N.apply) window.PORTFOLIO_I18N.apply();
      if (cb) cb();
    };
    document.head.appendChild(s);
  }

  // 2. Renderers
  function renderCasesSwitcher() {
    var sw = $('.pf-cases[data-auto]');
    if (!sw || !CASES.length) return;
    sw.innerHTML = CASES.map(function(c){
      var title = c.displayTitle || c.short || c.title;
      return '<a href="'+url(c)+'" style="--c:'+c.color+'"'+(c.slug===current?' aria-current="page"':'')+'>'+esc(title)+'</a>';
    }).join('');
    Array.prototype.forEach.call(sw.querySelectorAll('a:not([aria-current])'),function(a){ a.title = a.textContent });
  }

  function renderNextCase() {
    var next = $('.pf-next[data-auto]');
    var i = CASES.findIndex(function(c){ return c.slug===current });
    if(next && i>-1 && CASES.length>1){
      var n = CASES[(i+1)%CASES.length];
      var title = n.displayTitle || n.title;
      var blurb = n.displayBlurb || n.blurb;
      next.href = url(n);
      next.innerHTML = '<img src="'+ROOT+n.cover+'" alt="" loading="lazy"><div><b>'+esc(title)+'</b><span>'+esc(blurb)+'</span></div><i class="arr" aria-hidden="true">→</i>';
    }
  }

  function renderHomeGrid() {
    var grid = $('[data-cases-grid]');
    if (grid && CASES.length) {
      grid.innerHTML = CASES.map(function(c,k){
        var title = c.displayTitle || c.title;
        var blurb = c.displayBlurb || c.blurb;
        var tags = (c.displayTags || c.tags || []).map(esc).join(' · ');
        return '<a class="pf-work" href="'+url(c)+'" style="--c:'+c.color+'" data-case="'+c.slug+'" data-group="'+(c.group||'')+'">'+
          '<span class="pf-work-img"><img src="'+ROOT+c.cover+'" alt="" loading="lazy"></span>'+
          '<span class="eyebrow"><b>Case '+String(k+1).padStart(2,'0')+'</b> · '+tags+'</span>'+
          '<b class="pf-work-t">'+esc(title)+'</b><span class="pf-work-d">'+esc(blurb)+'</span></a>';
      }).join('');
    }

    var homeGrid = $('[data-home-grid]');
    if (homeGrid && CASES.length) {
      homeGrid.innerHTML = CASES.map(function(c){
        var title = c.displayTitle || c.title;
        var tags = (c.displayTags || c.tags || []).map(esc).join(' · ');
        return '<li data-case="'+c.slug+'" data-group="'+(c.group||'')+'"><a href="'+url(c)+'" style="--c:'+c.color+'"><img src="'+ROOT+esc(c.cover)+'" alt="" loading="lazy">'+
          '<span class="tx"><b>'+esc(title)+'</b><small>'+tags+'</small></span></a></li>';
      }).join('');
    }
  }

  // Initial renders
  renderCasesSwitcher();
  renderNextCase();
  renderHomeGrid();
  initCaseMobileCover();

  // Load i18n, inject picker, and load case-specific translations if on a case page
  ensureI18n(function(){
    injectLangPicker();
    renderCasesSwitcher();
    renderNextCase();
    renderHomeGrid();
    initCaseMobileCover();
    injectChatWidget();

    if (current) {
      var cs = document.createElement('script');
      cs.src = ROOT + 'shared/cases-i18n/' + current + '.js';
      document.head.appendChild(cs);
    }
  });

  // Mobile cover for case hero
  function initCaseMobileCover() {
    if (!current) return;
    var cover = $('.pf-hero > .pf-cover, .chronos-cover');
    if (!cover) return;

    var mobImg = cover.querySelector('.pf-cover-mobile');
    var all = (window.PORTFOLIO_CASES_ALL || []).concat(window.PORTFOLIO_CASES || []);
    var caseObj = all.find(function(c){ return c.slug === current });
    var mobUrl = (caseObj && caseObj.coverMobile) ? (ROOT + caseObj.coverMobile) : 'assets/capa_mobile.png';

    function activateMobileCover(src) {
      cover.classList.add('has-mobile-cover');
      if (!mobImg) {
        mobImg = document.createElement('img');
        mobImg.className = 'pf-cover-mobile';
        mobImg.alt = '';
        mobImg.loading = 'eager';
        mobImg.src = src;
        cover.insertBefore(mobImg, cover.firstChild);
      } else if (!mobImg.getAttribute('src')) {
        mobImg.src = src;
      }
    }

    if (caseObj && caseObj.coverMobile) {
      activateMobileCover(mobUrl);
    } else {
      var probe = new Image();
      probe.onload = function() {
        if (caseObj) caseObj.coverMobile = current + '/assets/capa_mobile.png';
        activateMobileCover(mobUrl);
      };
      probe.src = mobUrl;
    }
  }

  // 3. Chat do site: avatar flutuante com mini-chat (shared/chat-widget.*)
  function injectChatWidget(){
    if ($('#chat-widget') || $('link[href*="chat-widget.css"]')) return;
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = ROOT + 'shared/chat-widget.css?v=1';
    document.head.appendChild(link);
    var s = document.createElement('script');
    s.src = ROOT + 'shared/chat-widget.js?v=1';
    document.body.appendChild(s);
  }

  // 4. Aviso pro Erik: site em manutenção, mas este navegador vê tudo (shared/cases.js)
  if (window.PORTFOLIO_PREVIEW && window.PORTFOLIO_SITE && window.PORTFOLIO_SITE.maintenance) {
    var badge = document.createElement('a');
    badge.className = 'pf-admin-badge';
    badge.href = ROOT + 'admin/';
    badge.textContent = 'Manutenção ligada · só você vê os cases';
    document.body.appendChild(badge);
  }

  // 5. Tela cheia no celular: todo [data-immersive] ganha um botão que abre a experiência
  //    ocupando a tela, com botão Fechar (o voltar do Android também fecha).
  //    data-immersive="landscape|portrait|any"  orientação que o projeto pede
  //    data-immersive-ratio="858/1632"          proporção fixa; sem ela, ocupa a área toda
  //    data-immersive-before=".seletor"         ancestral antes do qual entra o botão (padrão: o próprio palco)
  //    O palco não muda de lugar no DOM (um iframe recarregaria): vira position:fixed por cima da página.
  //    Ao abrir e fechar, o palco recebe o evento 'pf-immersive' (detail.open) para o case se ajustar.
  var IMM_TXT = {
    pt: { open: 'Abrir em tela cheia', close: 'Fechar', turn: 'Gire o celular para ver maior' },
    en: { open: 'Open full screen', close: 'Close', turn: 'Rotate your phone for a bigger view' },
    es: { open: 'Abrir en pantalla completa', close: 'Cerrar', turn: 'Gira el móvil para verlo más grande' },
    fr: { open: 'Ouvrir en plein écran', close: 'Fermer', turn: 'Tournez le téléphone pour agrandir' }
  };
  var SVG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">';
  var ICON_OPEN = SVG + '<path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/></svg>';
  var ICON_CLOSE = SVG + '<path d="M6 6l12 12M18 6L6 18"/></svg>';
  var ICON_TURN = SVG + '<rect x="7" y="2.5" width="10" height="19" rx="2"/><path d="M11 18.5h2"/></svg>';
  var imm = null;

  function immTxt(){
    var l = window.PORTFOLIO_I18N && window.PORTFOLIO_I18N.getLang ? window.PORTFOLIO_I18N.getLang() : 'pt';
    return IMM_TXT[l] || IMM_TXT.pt;
  }
  function immLabels(){
    var t = immTxt();
    $$('.pf-imm-open span').forEach(function(s){ s.textContent = t.open });
    if (!imm) return;
    imm.close.setAttribute('aria-label', t.close);
    imm.close.querySelector('span').textContent = t.close;
    imm.hint.querySelector('span').textContent = t.turn;
  }
  function initImmersive(){
    $$('[data-immersive]').forEach(function(el){
      if (el.pfImmBtn) return;
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'pf-imm-open';
      b.innerHTML = ICON_OPEN + '<span></span>';
      b.addEventListener('click', function(){ openImmersive(el, b) });
      var sel = el.getAttribute('data-immersive-before');
      var ref = (sel && el.closest(sel)) || el;
      ref.parentNode.insertBefore(b, ref);
      el.pfImmBtn = b;
    });
    immLabels();
  }
  function layoutImmersive(){
    if (!imm) return;
    var a = imm.area.getBoundingClientRect(), r = imm.ratio;
    var x = a.left, y = a.top, w = a.width, h = a.height, hint = null;
    if (r) {
      if (w / h > r) w = h * r; else h = w / r;
      var land = a.width > a.height;
      var wrong = (imm.mode === 'landscape' && !land) || (imm.mode === 'portrait' && land);
      var spareW = a.width - w, spareH = a.height - h;
      if (wrong && spareH >= spareW && spareH > 120) hint = [a.left + a.width / 2, a.top + h + spareH / 2];
      else if (wrong && spareW > 160) hint = [a.left + w + spareW / 2, a.top + a.height / 2];
      else { x += spareW / 2; y += spareH / 2 }
    }
    var s = imm.el.style;
    s.setProperty('left', x + 'px', 'important');
    s.setProperty('top', y + 'px', 'important');
    s.setProperty('width', w + 'px', 'important');
    s.setProperty('height', h + 'px', 'important');
    imm.hint.classList.toggle('on', !!hint);
    if (hint) { imm.hint.style.left = hint[0] + 'px'; imm.hint.style.top = hint[1] + 'px' }
  }
  function openImmersive(el, opener){
    if (imm) return;
    var root = document.documentElement, box = document.createElement('div');
    box.innerHTML = '<div class="pf-imm-back"></div><div class="pf-imm-area"></div>' +
      '<div class="pf-imm-bar"><span class="pf-imm-title"></span><button type="button" class="pf-imm-close">' + ICON_CLOSE + '<span aria-hidden="true"></span></button></div>' +
      '<p class="pf-imm-hint">' + ICON_TURN + '<span></span></p>';
    var nodes = Array.prototype.slice.call(box.children);
    nodes.forEach(function(n){ document.body.appendChild(n) });
    var ratio = (el.getAttribute('data-immersive-ratio') || '').split('/');
    imm = {
      el: el, opener: opener, nodes: nodes, anc: [], fs: false,
      area: nodes[1], close: nodes[2].querySelector('button'), hint: nodes[3],
      mode: el.getAttribute('data-immersive') || 'any',
      ratio: ratio[0] ? ratio[0] / (ratio[1] || 1) : 0
    };
    nodes[2].querySelector('.pf-imm-title').textContent = el.getAttribute('data-immersive-label') || document.title.split(/\s+[—·|]\s+/)[0];
    for (var p = el.parentElement; p && p !== document.body; p = p.parentElement) { p.classList.add('pf-imm-anc'); imm.anc.push(p) }
    el.classList.add('is-immersed');
    root.classList.add('pf-imm-active');
    immLabels();
    layoutImmersive();
    imm.close.addEventListener('click', function(){
      if (history.state && history.state.pfImm) history.back(); else closeImmersive();
    });
    try { history.pushState({ pfImm: 1 }, '') } catch (e) {}
    el.dispatchEvent(new CustomEvent('pf-immersive', { detail: { open: true } }));
    imm.close.focus({ preventScroll: true });
    // Android e iPad: tela cheia de verdade e orientação travada. No iPhone fica a sobreposição.
    if (root.requestFullscreen && !document.fullscreenElement) {
      root.requestFullscreen({ navigationUI: 'hide' }).then(function(){
        if (!imm) return document.exitFullscreen();
        imm.fs = true;
        if (imm.mode !== 'any' && screen.orientation && screen.orientation.lock) screen.orientation.lock(imm.mode).catch(function(){});
      }).catch(function(){});
    }
    dispatchEvent(new Event('resize'));
  }
  function closeImmersive(){
    if (!imm) return;
    var s = imm; imm = null;
    s.nodes.forEach(function(n){ n.remove() });
    s.anc.forEach(function(p){ p.classList.remove('pf-imm-anc') });
    s.el.classList.remove('is-immersed');
    ['left', 'top', 'width', 'height'].forEach(function(k){ s.el.style.removeProperty(k) });
    if (!s.el.getAttribute('style')) s.el.removeAttribute('style');
    document.documentElement.classList.remove('pf-imm-active');
    if (screen.orientation && screen.orientation.unlock) try { screen.orientation.unlock() } catch (e) {}
    if (s.fs && document.fullscreenElement) document.exitFullscreen().catch(function(){});
    s.opener.focus({ preventScroll: true });
    s.el.dispatchEvent(new CustomEvent('pf-immersive', { detail: { open: false } }));
    dispatchEvent(new Event('resize'));
  }
  var immFrame = 0;
  function relayoutImmersive(){
    if (!imm || immFrame) return;
    immFrame = requestAnimationFrame(function(){ immFrame = 0; layoutImmersive() });
  }
  addEventListener('resize', relayoutImmersive);
  addEventListener('orientationchange', relayoutImmersive);
  if (window.visualViewport) visualViewport.addEventListener('resize', relayoutImmersive);
  addEventListener('popstate', function(){ if (imm) closeImmersive() });
  initImmersive();

  // Nav overflow handling
  var nav = $('.pf-nav');
  var row = nav && nav.querySelector('.wrap');
  var sw = $('.pf-cases[data-auto]');
  function fit(){
    if(!nav || !row) return;
    nav.classList.remove('tight','tighter');
    var over = function(){ return row.scrollWidth > row.clientWidth + 1 };
    if(over()) nav.classList.add('tight');
    if(over()) nav.classList.add('tighter');
    var cur = sw && sw.querySelector('[aria-current]');
    if(cur && sw.scrollWidth > sw.clientWidth) sw.scrollLeft += cur.getBoundingClientRect().left - sw.getBoundingClientRect().left - (sw.clientWidth - cur.offsetWidth) / 2;
  }
  fit(); addEventListener('resize',fit);
  if(document.fonts && document.fonts.ready) document.fonts.ready.then(fit);

  // Nav progress + active section
  if (nav) {
    var links = Array.prototype.slice.call(nav.querySelectorAll('.pf-links a'));
    var secs = links.map(function(a){ return document.querySelector(a.getAttribute('href')) });
    function onScroll(){
      var h = document.documentElement, p = h.scrollTop/((h.scrollHeight-h.clientHeight)||1);
      nav.style.setProperty('--p',p.toFixed(4));
      var cur = -1; secs.forEach(function(s,k){ if(s && s.getBoundingClientRect().top < 140) cur = k });
      links.forEach(function(a,k){ a.classList.toggle('on',k===cur) });
    }
    addEventListener('scroll',onScroll,{passive:true}); onScroll();
  }

  // React to language changes
  window.addEventListener('portfolio-lang-change', function(e){
    renderCasesSwitcher();
    renderNextCase();
    renderHomeGrid();
    immLabels();
    fit();
  });
})();

/* Portfolio frame behaviour.
   - Builds the case switcher, the "next case" card and the home grid from shared/cases.js
   - Injects the multilingual language picker (PT | EN | ES | FR)
   - Synchronizes language switching via shared/i18n.js
   - Reading progress + active section in the nav
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
    if ($('.pf-lang-picker')) return;
    var target = $('.pf-nav .wrap') || $('.home-top .wrap') || $('.top-bar') || $('.header-nav');
    if (!target) return;

    var currentLang = (window.PORTFOLIO_I18N && window.PORTFOLIO_I18N.getLang) ? window.PORTFOLIO_I18N.getLang() : 'pt';
    var picker = document.createElement('div');
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

    picker.addEventListener('click', function(e){
      var btn = e.target.closest('.pf-lang-btn');
      if (!btn) return;
      var lang = btn.getAttribute('data-lang');
      if (window.PORTFOLIO_I18N && window.PORTFOLIO_I18N.setLang) {
        window.PORTFOLIO_I18N.setLang(lang);
      }
    });

    var contact = target.querySelector('.home-contact') || target.querySelector('.btn-pill.primary') || target.querySelector('.pf-cases');
    if (contact && (target.classList.contains('home-top') || target.classList.contains('top-bar'))) {
      target.insertBefore(picker, contact);
    } else {
      target.appendChild(picker);
    }
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

  // Load i18n, inject picker, and load case-specific translations if on a case page
  ensureI18n(function(){
    injectLangPicker();
    renderCasesSwitcher();
    renderNextCase();
    renderHomeGrid();
    injectChatWidget();

    if (current) {
      var cs = document.createElement('script');
      cs.src = ROOT + 'shared/cases-i18n/' + current + '.js';
      document.head.appendChild(cs);
    }
  });

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
    fit();
  });
})();

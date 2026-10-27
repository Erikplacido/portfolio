/* Hellfire Overdrive — versão jogável do case.
   Cenário, personagem, pista e pads extraídos de assets.psd.
   Notas D20 e poses são sprites do PSD; os valores são os da partida.
   O mapa de notas sai do riff do tema "Marionete de 16 bits" (assets/marionete-16-bits.mp3). */
(function(){
  'use strict';
  var root = document.getElementById('ho-game'); if(!root) return;
  var cv = root.querySelector('canvas'), g = cv.getContext('2d');
  var W = 858, H = 1632; cv.width = W; cv.height = H;
  var RM = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $ = function(s){ return root.querySelector(s) };
  var MONO = '"Silkscreen","JetBrains Mono",monospace';
  var FONT_NUM = '"Jersey 10","Teko",monospace';

  /* ---------- stage geometry, measured on the art (858 × 1632) ---------- */
  var Y0 = 810, Y1 = 1310;                                   // top of the neck, hit line (centre of the slots)
  var PAD_X = [98, 264, 429, 594, 760], PAD_Y = 1515;       // top faces of the five arcade pads (lowered for ergonomic spacing)
  /* the six strings of stage-fretboard.png, fitted on the sprite and scaled to its 808 × 550 box at (25, 810):
     they meet at one vanishing point, so each lane is 30.7 px wide at the top and 134 px on the slots */
  var NECK_X = 427.3;
  var laneW = function(y){ return 30.68 + .2066 * (y - 810) };
  var leftX = function(y){ return NECK_X - 2.5 * laneW(y) };
  var laneX = function(i, y){ return NECK_X + (i - 2) * laneW(y) };
  var COL = ['#5FD068', '#E8455A', '#F2C230', '#3FA3F2', '#F28A2E'];
  var COL_D = ['#1F6B2A', '#7A1424', '#8A6A0C', '#124E82', '#8A4410'];
  var KEYS = 'asdfg';

  /* ---------- chart: the theme's riff, mapped to lanes by pitch ---------- */
  var BAR = 1.2632, SONG = 56.54;   // portfolio.mp3 plays at 190 BPM (1.2632 s/bar); 56.54s showcase track
  var RIFF = [
    'e2 [e2 e2] e2 [e2 e2] e2 [e2 e2] g2 a2', 'e2 [e2 e2] e2 [e2 e2] e2 [e2 e2] a#2 a2',
    'e2 [e2 e2] e2 [e2 e2] f2 ~ e2 ~',         'g2 g2 a2 a2 b2 b2 d3 c3',
    'e2 [e2 e2] e2 [e2 e2] e2 [e2 e2] g2 a2', 'e2 [e2 e2] e2 [e2 e2] e2 [e2 e2] a#2 a2',
    'c3 [c3 c3] c3 [c3 c3] d3 [d3 d3] d3 [d3 d3]', 'b2 b2 a2 a2 g2 g2 [f#2 g2] [a2 b2]'
  ];
  function tokens(s){
    var out = [], depth = 0, cur = '';
    for(var i = 0; i < s.length; i++){ var ch = s[i];
      if(ch === '[') depth++; if(ch === ']') depth--;
      if(ch === ' ' && depth === 0){ if(cur) out.push(cur); cur = '' } else cur += ch }
    if(cur) out.push(cur); return out;
  }
  /* events inside one bar, in eighths: { at (0–8), note, top (not inside brackets), first (first of its group) } */
  function events(s, at, len, nested){
    var tk = tokens(s), step = len / tk.length, ev = [];
    tk.forEach(function(t, k){
      var a = at + k * step;
      if(t[0] === '[') events(t.slice(1, -1), a, step, true).forEach(function(e, j){ e.first = j === 0; ev.push(e) });
      else if(t !== '~') ev.push({ at: a, n: t, top: !nested, first: true });
    });
    return ev;
  }
  var LANE = { e: 0, f: 1, 'f#': 1, g: 1, a: 2, 'a#': 2, b: 3, c: 3, d: 4 };
  var chartData = null;
  function chart(mode){
    var raw = (chartData && chartData.charts && chartData.charts[mode]) || [];
    var out = [];
    if(raw.length){
      var filtered = raw.filter(function(n){ return n[0] <= SONG });
      for(var i = 0; i < filtered.length; i++){
        var item = filtered[i], t = item[0], lane = item[1];
        var nextT = SONG;
        for(var j = i + 1; j < filtered.length; j++){
          if(filtered[j][0] > t){ nextT = filtered[j][0]; break }
        }
        var gap = nextT - t;
        // Chords and sustained notes with gap >= 0.45s get a luminous sustain rail
        var dur = gap >= 0.45 ? Math.min(gap * 0.72, 1.2) : 0;
        out.push({ t: t, lane: lane, dur: dur, hit: 0, holding: false, completed: false });
      }
      return out;
    }
    // Fallback if chartData is not yet loaded
    for(var b = 0; b < SONG / BAR; b++){
      var ev = events(RIFF[b % RIFF.length], 0, 8);
      ev.forEach(function(e, k){
        var quarter = e.at % 2 === 0, lane = LANE[e.n.replace(/\d/g, '')], t = b * BAR + e.at * BAR / 8;
        if(mode === 'easy' && !(e.top && quarter)) return;
        var prev = ev[k - 1], change = !prev || LANE[prev.n.replace(/\d/g, '')] !== lane;
        if(mode === 'normal' && !(e.first && (quarter || change))) return;
        if(mode === 'expert' && !(e.first || change)) return;
        var dur = (e.at === 6 && k === ev.length - 1) ? 0.45 : 0;
        out.push({ t: t, lane: lane, dur: dur, hit: 0, holding: false, completed: false });
        if(mode === 'expert' && e.at === 0 && b % 2 === 0) out.push({ t: t, lane: lane > 2 ? lane - 2 : lane + 2, dur: 0, hit: 0, holding: false, completed: false });
      });
    }
    return out;
  }

  /* ---------- audio: its own context, so pausing the game never touches the page's player ---------- */
  var ctx = null, buf = null, lead = 0, src = null, gain = null, loadP = null;
  function actx(){ if(!ctx){ var C = window.AudioContext || window.webkitAudioContext; ctx = new C(); gain = ctx.createGain(); gain.gain.value = .8; gain.connect(ctx.destination) } return ctx }
  function load(){
    if(loadP) return loadP;
    var audioP = fetch(root.dataset.audio).then(function(r){ return r.arrayBuffer() })
      .then(function(ab){ return new Promise(function(ok, no){ actx().decodeAudioData(ab, ok, no) }) })
      .then(function(b){
        buf = b;
        SONG = Math.floor(b.duration * 100) / 100;
        var ch = b.getChannelData(0), i = 0, lim = Math.min(ch.length, b.sampleRate * .08);
        while(i < lim && Math.abs(ch[i]) < .003) i++;
        lead = i / b.sampleRate;
      });
    var chartP = fetch('assets/music-chart.json?v=2').then(function(r){ return r.json() })
      .then(function(d){ chartData = d })
      .catch(function(){ chartData = null });
    loadP = Promise.all([audioP, chartP]);
    loadP.catch(function(){ loadP = null });
    return loadP;
  }
  function tick(at, hi){
    var o = ctx.createOscillator(), e = ctx.createGain();
    o.type = 'square'; o.frequency.value = hi ? 1320 : 880;
    e.gain.setValueAtTime(.0001, at); e.gain.exponentialRampToValueAtTime(.08, at + .005); e.gain.exponentialRampToValueAtTime(.0001, at + .06);
    o.connect(e); e.connect(gain); o.start(at); o.stop(at + .08);
  }

  /* ---------- state ---------- */
  var S = { mode: 'normal', state: 'idle', bot: false, demo: false, isExhibition: false, userTookOver: false, notes: [], t0: 0, wallT0: 0, offset: 0, score: 0, combo: 0, best: 0,
            perfect: 0, good: 0, shred: 0, odUntil: -99, fb: null, lastMiss: null, press: [-9, -9, -9, -9, -9], held: [false, false, false, false, false], bursts: [], visible: true,
            demoLoopTimer: 0, attractTimer: 0, lastT: 0 };
  var PERFECT = .05, GOOD = .11, OD_LEN = 8;
  var TRAVEL = { easy: 1.9, normal: 1.6, expert: 1.3 };
  function now(){
    if(ctx && ctx.state === 'running'){
      return ctx.currentTime - S.t0 + S.offset - (ctx.outputLatency || ctx.baseLatency || 0);
    }
    return (performance.now() / 1000) - S.wallT0 + S.offset;
  }
  function mult(t){ var m = Math.min(4, 1 + Math.floor(S.combo / 10)); return t < S.odUntil ? m * 2 : m }

  function resyncAudio(){
    if(!ctx || ctx.state !== 'running' || !buf || S.state !== 'play') return;
    if(src){ try{ src.stop() }catch(e){} src = null }
    var curT = now();
    var lat = (ctx.outputLatency || ctx.baseLatency || 0);
    if(curT < 0){
      var waitSec = Math.abs(curT);
      var at = ctx.currentTime + waitSec;
      src = ctx.createBufferSource();
      src.buffer = buf;
      src.connect(gain);
      src.start(at, lead);
      src.stop(at + SONG);
      S.t0 = at;
    } else if(curT < SONG){
      var songOffset = Math.min(buf.duration, lead + curT);
      src = ctx.createBufferSource();
      src.buffer = buf;
      src.connect(gain);
      src.start(ctx.currentTime, songOffset);
      src.stop(ctx.currentTime + (SONG - curT));
      S.t0 = ctx.currentTime - curT + S.offset - lat;
    }
  }

  function unlockAudio(){
    if(!ctx) actx();
    if(ctx && ctx.state === 'suspended'){
      ctx.resume().then(function(){
        resyncAudio();
      }).catch(function(){});
    }
  }
  window.addEventListener('pointerdown', unlockAudio, { passive: true, once: true });
  window.addEventListener('keydown', unlockAudio, { passive: true, once: true });

  /* ---------- screens ---------- */
  var screens = { start: $('.hg-start'), pause: $('.hg-paused'), end: $('.hg-end'), set: $('.hg-set'), help: $('.hg-instructions'), scores: $('.hg-leaderboard') };
  function show(name){
    Object.keys(screens).forEach(function(k){ screens[k].hidden = k !== name });
    $('.hg-ui').hidden = !name;
    root.classList.toggle('is-playing', S.state === 'play' || S.state === 'pause');
    root.classList.toggle('is-paused', S.state === 'pause');
    root.classList.toggle('is-result', S.state === 'end' && name === 'end');
    root.classList.toggle('is-menu', S.state === 'idle');
    root.classList.toggle('is-modal', name === 'set' || name === 'help' || name === 'scores');
  }
  function setMode(m){ S.mode = m; root.querySelectorAll('[data-mode]').forEach(function(b){ b.setAttribute('aria-pressed', b.dataset.mode === m) }) }
  root.querySelectorAll('[data-mode]').forEach(function(b){ b.addEventListener('click', function(){ setMode(b.dataset.mode) }) });

  var inactivityTimer = 0;
  function resetInactivityTimer(){
    clearTimeout(inactivityTimer);
    if(S.isExhibition) return;
    inactivityTimer = setTimeout(function(){
      if(S.state === 'idle' || S.state === 'end' || S.state === 'pause'){
        startExhibition();
      }
    }, 15000);
  }

  function startExhibition(){
    clearTimeout(inactivityTimer);
    clearTimeout(S.demoLoopTimer);
    clearTimeout(S.attractTimer);
    start(true, true);
  }

  function exitExhibitionToMenu(){
    if(!S.isExhibition) return false;
    S.isExhibition = false;
    if(src){ try{ src.stop() }catch(e){} src = null }
    var targetVol = Number($('#hg-volume') ? $('#hg-volume').value : 80) || 80;
    if(gain) gain.gain.value = targetVol / 100;
    unlockAudio();
    quit();
    return true;
  }

  function start(demo, isExh){
    clearTimeout(S.demoLoopTimer);
    clearTimeout(S.attractTimer);
    clearTimeout(inactivityTimer);
    document.dispatchEvent(new CustomEvent('ho:game'));      // the page stops its own theme player
    actx();
    if(ctx && ctx.state === 'suspended') ctx.resume().catch(function(){});
    var btn = $('.hg-go');
    if(btn){ btn.disabled = true; btn.textContent = 'Ligando os amplificadores…'; }
    $('.hg-msg').textContent = '';
    load().then(function(){
      if(btn){ btn.disabled = false; btn.textContent = 'Tocar'; }
      S.bot = S.demo = Boolean(demo);
      S.isExhibition = Boolean(isExh);
      if(S.isExhibition){
        if(gain) gain.gain.value = 0;
      } else {
        var targetVol = Number($('#hg-volume') ? $('#hg-volume').value : 80) || 80;
        if(gain) gain.gain.value = targetVol / 100;
      }
      S.userTookOver = false;
      S.notes = chart(S.mode);
      S.score = S.combo = S.best = S.perfect = S.good = 0;
      S.shred = 0; S.odUntil = -99; S.fb = null; S.lastMiss = null; S.bursts = [];
      S.press = [-9, -9, -9, -9, -9];
      S.held = [false, false, false, false, false];
      if(src){ try{ src.stop() }catch(e){} src = null }

      var banner = document.querySelector('.hg-attract-banner');
      if(banner){
        if(S.isExhibition){
          banner.className = 'hg-attract-banner';
          banner.innerHTML = '<div class="hg-attract-pill"><span class="hg-attract-pulse" aria-hidden="true"></span><span class="hg-attract-badge">EXIBIÇÃO</span><span class="hg-attract-label">Modo demonstração · <strong>Toque para jogar</strong></span></div>';
        } else if(demo){
          banner.className = 'hg-attract-banner';
          banner.innerHTML = '<div class="hg-attract-pill"><span class="hg-attract-pulse" aria-hidden="true"></span><span class="hg-attract-badge">DEMO</span><span class="hg-attract-label">Modo demonstração · <strong>Toque ou aperte A S D F G para assumir</strong></span></div>';
        } else {
          banner.className = 'hg-attract-banner is-hidden';
        }
      }

      var baseTime = (ctx && ctx.state === 'running') ? ctx.currentTime : 0;
      var at = baseTime + .15;
      if(!S.isExhibition && ctx && ctx.state === 'running'){
        for(var k = 0; k < 4; k++) tick(at + k * BAR / 4, k === 0);
      }
      src = ctx.createBufferSource();
      src.buffer = buf;
      src.connect(gain);
      if(ctx && ctx.state === 'running'){
        src.start(at + BAR, lead);
        src.stop(at + BAR + SONG);
      }
      S.t0 = at + BAR;
      S.wallT0 = (performance.now() / 1000) + BAR + .15;
      S.state = 'play';
      show(null);
      if(!demo) $('.hg-pause').focus({ preventScroll: true });
      loop();
    }).catch(function(){
      if(btn){ btn.disabled = false; btn.textContent = 'Tocar'; }
      $('.hg-msg').textContent = 'Não foi possível carregar a música. Tente de novo.';
    });
  }
  function pause(){ if(S.state !== 'play') return; S.state = 'pause'; if(ctx && ctx.state === 'running') ctx.suspend().catch(function(){}); show('pause'); $('.hg-resume').focus({ preventScroll: true }); resetInactivityTimer(); }
  function resume(){ if(S.state !== 'pause') return; S.state = 'play'; if(ctx && ctx.state === 'suspended') ctx.resume().catch(function(){}); show(null); $('.hg-pause').focus({ preventScroll: true }); loop() }
  function quit(){
    if(src){ try{ src.stop() }catch(e){} src = null }
    if(ctx && ctx.state === 'suspended') ctx.resume().catch(function(){});
    var banner = document.querySelector('.hg-attract-banner');
    if(banner) banner.className = 'hg-attract-banner is-hidden';
    S.isExhibition = false;
    S.state = 'idle'; S.notes = []; S.score = S.combo = S.shred = 0; S.odUntil = -99;
    S.held = [false, false, false, false, false];
    show('start'); draw();
    $('.hg-go').focus({ preventScroll: true });
    resetInactivityTimer();
  }

  var sessionScores = [];
  var RANKS = [[97, 'S', 5, 'Seu solo<br>estremeceu<br>o Mundo Invertido!'], [88, 'A', 4, 'O palco te ouviu.'], [72, 'B', 3, 'Quase lá.'], [52, 'C', 2, 'Afine e volte.'], [0, 'D', 1, 'O ritual pede bis.']];
  function finish(){
    S.state = 'end';
    var total = S.notes.length, acc = total ? (S.perfect + .5 * S.good) / total * 100 : 0;
    var r = RANKS.filter(function(x){ return acc >= x[0] })[0];
    if(!S.demo) sessionScores.push({ score: S.score, rank: r[1], mode: S.mode });
    $('.hg-rank').textContent = r[1];
    var rankImg = $('.hg-rank-img'), hasImg = 'SABCD'.indexOf(r[1]) >= 0;
    $('.hg-rank').hidden = hasImg;
    rankImg.hidden = !hasImg;
    rankImg.alt = 'Rank ' + r[1];
    if(hasImg) rankImg.src = 'assets/ui/rank-' + r[1].toLowerCase() + '.png';
    var statusEl = $('.hg-result-status');
    if(statusEl) statusEl.textContent = 'SESSÃO CONCLUÍDA';
    var banner = document.querySelector('.hg-attract-banner');
    if(banner) banner.className = 'hg-attract-banner is-hidden';
    $('.hg-title').innerHTML = r[3];
    $('.hg-stars').innerHTML = [0,1,2,3,4].map(function(i){ return '<img src="assets/ui/star-filled.png" alt=""' + (i >= r[2] ? ' class="empty"' : '') + '>' }).join('');
    $('.hg-stars').setAttribute('aria-label', r[2] + ' de 5 estrelas');
    $('.hg-score').textContent = String(S.score).padStart(6, '0');
    var isNewRecord = !sessionScores.length || S.score >= Math.max.apply(null, sessionScores.map(function(s){ return s.score }));
    var stamp = $('.hg-record-stamp');
    if(stamp) stamp.hidden = !isNewRecord;
    $('.hg-stats').innerHTML = '<div><b>' + acc.toFixed(1).replace('.', ',') + '%</b><span>precisão</span></div><div><b>' + S.best + '</b><span>maior combo</span></div><div><b>' + (S.perfect + S.good) + '/' + total + '</b><span>notas</span></div>';
    $('.hg-breakdown').textContent = S.perfect + ' perfeitas · ' + S.good + ' boas · ' + (total - S.perfect - S.good) + ' perdidas';
    var prize = $('.hg-prize');
    if(prize) prize.hidden = true;
    show('end');
    $('.hg-again').focus({ preventScroll: true });
    resetInactivityTimer();
  }

  /* ---------- input ---------- */
  function takeOver(){
    if(S.bot){
      S.bot = false;
      S.userTookOver = true;
      unlockAudio();
      $('.hg-live').textContent = 'Você assumiu a guitarra.';
      var banner = document.querySelector('.hg-attract-banner');
      if(banner){
        banner.className = 'hg-attract-banner';
        banner.innerHTML = '<div class="hg-attract-pill is-active"><span class="hg-attract-pulse active" aria-hidden="true"></span><span class="hg-attract-badge active">AO VIVO</span><span class="hg-attract-label"><strong>VOCÊ ASSUMIU A GUITARRA!</strong> Toque para valer</span></div>';
        setTimeout(function(){ banner.classList.add('is-hidden') }, 2500);
      }
      var t = now();
      S.fb = { text: 'VOCÊ NO CONTROLE!', t: t, col: '#F2C46D' };
      S.bursts.push({ lane: 2, t: t, perfect: true });
    }
  }
  function hit(lane){
    if(S.state !== 'play') return;
    var t = now(); S.press[lane] = t; S.held[lane] = true;
    var best = null;
    for(var i = 0; i < S.notes.length; i++){ var n = S.notes[i];
      if(n.t - t > GOOD) break;
      if(n.hit || n.lane !== lane) continue;
      var d = Math.abs(n.t - t); if(d <= GOOD && (!best || d < Math.abs(best.t - t))) best = n }
    if(best) judge(best, t, Math.abs(best.t - t) <= PERFECT);
  }
  function judge(best, t, perfect){
    best.hit = perfect ? 2 : 1;
    if(perfect) S.perfect++; else S.good++;
    S.combo++; S.best = Math.max(S.best, S.combo);
    S.score += (perfect ? 100 : 50) * mult(t);
    if(t > S.odUntil) S.shred = Math.min(100, S.shred + (perfect ? 2.5 : 1.5));
    S.fb = { text: perfect ? 'PERFEITO' : 'BOA', t: t, col: perfect ? '#F2C46D' : '#F2E6D8' };
    S.bursts.push({ lane: best.lane, t: t, perfect: perfect });
    if(best.dur > 0){
      best.holding = true;
    }
  }
  function overdrive(){
    if(S.state !== 'play') return; var t = now();
    if(S.shred >= 100 && t > S.odUntil){ S.odUntil = t + OD_LEN; S.shred = 0; S.fb = { text: 'OVERDRIVE!', t: t, col: '#F2C46D' } }
  }
  document.addEventListener('keydown', function(e){
    if(S.isExhibition){
      exitExhibitionToMenu();
      return;
    }
    resetInactivityTimer();
    if(S.state !== 'play' && S.state !== 'pause') return;
    if(e.metaKey || e.ctrlKey || e.altKey || /input|textarea|select/i.test(e.target.tagName)) return;
    unlockAudio();
    var key = e.key.toLowerCase();
    var k = KEYS.indexOf(key);
    if(k < 0){
      var numIndex = '12345'.indexOf(key);
      if(numIndex >= 0) k = numIndex;
    }
    if(k >= 0 && S.state === 'play'){ e.preventDefault(); if(!e.repeat){ takeOver(); hit(k) } return }
    if(e.key === ' ' && S.state === 'play'){ e.preventDefault(); takeOver(); overdrive(); return }
    if(e.key === 'Escape' || key === 'p'){ e.preventDefault(); S.state === 'play' ? pause() : resume() }
  });
  document.addEventListener('keyup', function(e){
    var key = e.key.toLowerCase();
    var k = KEYS.indexOf(key);
    if(k < 0){
      var numIndex = '12345'.indexOf(key);
      if(numIndex >= 0) k = numIndex;
    }
    if(k >= 0){ S.held[k] = false }
  });
  var pointerLanes = {};
  cv.addEventListener('pointerdown', function(e){
    unlockAudio();
    if(S.state !== 'play') return;
    e.preventDefault(); takeOver();
    var r = cv.getBoundingClientRect(), x = (e.clientX - r.left) / r.width * W, y = (e.clientY - r.top) / r.height * H;
    var ow = 380, oh = 93 * (ow / 423), ox = (W - ow) / 2, oy = 250;
    if((x < 135 && y > 625 && y < 980) || (x >= ox - 15 && x <= ox + ow + 15 && y >= oy - 10 && y <= oy + oh + 10)){ overdrive(); return }      // the Shred meter or top Overdrive display
    if(y < Y0 - 50) return;
    var l = y > Y1 ? PAD_X.reduce(function(a, px, i){ return Math.abs(px - x) < Math.abs(PAD_X[a] - x) ? i : a }, 0)
                   : Math.floor((x - leftX(Math.min(y, Y1))) / laneW(Math.min(y, Y1)));
    if(l >= 0 && l < 5){
      pointerLanes[e.pointerId] = l;
      hit(l);
    }
  });
  function releasePointer(e){
    if(e && e.pointerId !== undefined && pointerLanes[e.pointerId] !== undefined){
      S.held[pointerLanes[e.pointerId]] = false;
      delete pointerLanes[e.pointerId];
    } else {
      for(var i = 0; i < 5; i++) S.held[i] = false;
    }
  }
  cv.addEventListener('pointerup', releasePointer);
  cv.addEventListener('pointercancel', releasePointer);
  window.addEventListener('pointerup', releasePointer);
  var bannerEl = document.querySelector('.hg-attract-banner');
  if(bannerEl){
    bannerEl.addEventListener('pointerdown', function(e){
      e.preventDefault();
      if(S.isExhibition){
        exitExhibitionToMenu();
        return;
      }
      unlockAudio();
      takeOver();
    });
  }
  root.addEventListener('pointerdown', function(e){
    if(S.isExhibition){
      e.preventDefault();
      e.stopPropagation();
      exitExhibitionToMenu();
      return;
    }
    resetInactivityTimer();
  }, true);
  var goBtn = $('.hg-go'); if(goBtn) goBtn.addEventListener('click', function(){ start(false) });
  var demoBtn = $('.hg-demo'); if(demoBtn) demoBtn.addEventListener('click', function(){ start(true) });
  var howBtn = $('.hg-how'); if(howBtn) howBtn.addEventListener('click', function(){ show('help'); $('.hg-instructions .hg-menu-back').focus({preventScroll:true}) });
  var scoresBtn = $('.hg-scores'); if(scoresBtn) scoresBtn.addEventListener('click', function(){
    var modes = {easy:'Aprendiz',normal:'Guitarrista',expert:'Lenda'};
    $('.hg-score-list').innerHTML = sessionScores.length ? sessionScores.slice().sort(function(a,b){ return b.score-a.score }).slice(0,5).map(function(s){ return '<div class="hg-score-entry"><span>' + modes[s.mode] + ' · ' + s.rank + '</span><b>' + String(s.score).padStart(6,'0') + '</b></div>' }).join('') : 'Suas partidas aparecem aqui. Demonstrações não contam.';
    show('scores'); $('.hg-leaderboard .hg-menu-back').focus({preventScroll:true});
  });
  root.querySelectorAll('.hg-menu-back').forEach(function(b){ b.addEventListener('click',function(){ show('start'); $('.hg-go').focus({preventScroll:true}) }) });
  var previousVolume = 80;
  $('.hg-sound').addEventListener('click', function(){
    if(Number(vol.value)){ previousVolume = Number(vol.value); vol.value = 0 } else { vol.value = previousVolume || 80 }
    vol.dispatchEvent(new Event('input'));
  });
  $('.hg-pause').addEventListener('click', pause);
  $('.hg-resume').addEventListener('click', resume);
  $('.hg-restart').addEventListener('click', function(){ start(false) });
  $('.hg-quit').addEventListener('click', quit);
  $('.hg-again').addEventListener('click', function(){ start(false) });
  var homeBtn = $('.hg-home');
  if(homeBtn) homeBtn.addEventListener('click', quit);
  var back = 'start';
  $('.hg-settings').addEventListener('click', function(){
    if(S.state === 'play') pause();
    back = S.state === 'pause' ? 'pause' : S.state === 'end' ? 'end' : 'start';
    show('set'); $('.hg-set-close').focus({ preventScroll: true });
  });
  $('.hg-set-close').addEventListener('click', function(){ show(back); var f = screens[back].querySelector('button'); if(f) f.focus({ preventScroll: true }) });
  var off = $('#hg-offset'), vol = $('#hg-volume');
  off.addEventListener('input', function(){ S.offset = -off.value / 1000; $('#hg-offset-out').textContent = (off.value > 0 ? '+' : '') + off.value + ' ms' });
  vol.addEventListener('input', function(){ actx(); gain.gain.value = vol.value / 100; $('#hg-volume-out').textContent = vol.value + '%'; $('.hg-sound').setAttribute('aria-pressed', String(Number(vol.value) === 0)); $('.hg-sound').setAttribute('aria-label', Number(vol.value) === 0 ? 'Ativar som' : 'Silenciar som') });

  /* pause when the game leaves the screen, the tab is hidden or the page's theme starts */
  if('IntersectionObserver' in window){
    new IntersectionObserver(function(es){
      S.visible = es[0].isIntersecting;
      if(!S.visible){
        if(S.state === 'play'){
          if(S.bot){
            if(ctx && ctx.state === 'running') ctx.suspend().catch(function(){});
            S.state = 'pause_demo';
          } else {
            pause();
          }
        }
      } else {
        if(S.state === 'idle'){
          show('start');
          resetInactivityTimer();
        } else if(S.state === 'pause_demo'){
          S.state = 'play';
          if(ctx && ctx.state === 'suspended') ctx.resume().catch(function(){});
          resyncAudio();
          loop();
        }
      }
    }, { threshold: .25 }).observe(root);
  }
  document.querySelectorAll('a[href="#jogo"]').forEach(function(link){
    link.addEventListener('click', function(){
      if(S.isExhibition){
        exitExhibitionToMenu();
      } else if(S.state === 'idle'){
        show('start');
        resetInactivityTimer();
      }
    });
  });
  document.addEventListener('visibilitychange', function(){ if(document.hidden && S.state === 'play') pause() });
  document.addEventListener('ho:theme', pause);

  /* ---------- drawing ---------- */
  var bg = new Image(); bg.onload = function(){ draw() }; bg.src = root.dataset.stage;
  function sprite(src){ var i = new Image(); i.onload = function(){ draw() }; i.src = 'assets/ui/' + src; return i }
  var imgThrone = sprite('trono.png'), imgNeck = sprite('stage-fretboard.png');
  var characterPoses = {
    calm: { image: sprite('eddie_1.png'), height: 640 },
    rhythm: { image: sprite('eddie_guitar2.png'), height: 650 },
    solo: { image: sprite('eddie_guitar1.png'), height: 650 },
    rock: { image: sprite('eddie_rock.png'), height: 760 }
  };
  // Match the PSD colors to the lanes: green, red, gold, blue, violet.
  var imgNotes = [3,1,4,2,5].map(function(n){ return sprite('notas_' + n + '.png') });
  var imgPads = [1,2,3,4,5].map(function(n){ return sprite('pad-' + n + '.png') });
  var imgBatteryOpen = sprite('battery-meter.png'), imgBatteryClosed = sprite('battery-meter2.png'), imgOD = sprite('overdrive-bar.png');
  if(document.fonts && document.fonts.ready) document.fonts.ready.then(function(){ draw() });
  function font(px){ g.font = '700 ' + px + 'px ' + MONO }
  function outline(text, x, y, fill, lw){ g.lineJoin = 'round'; g.lineWidth = lw || 8; g.strokeStyle = '#120810'; g.strokeText(text, x, y); g.fillStyle = fill; g.fillText(text, x, y) }

  /* Poses change at performance milestones, never on a repeating timer. */
  function performancePose(t){
    if(S.state === 'idle' || t < 0) return 'calm';
    if(S.lastMiss !== null && t - S.lastMiss < 1.2) return 'calm';
    if(t < S.odUntil || S.combo >= 40) return 'rock';
    if(S.combo >= 25) return 'solo';
    if(S.combo >= 10) return 'rhythm';
    return 'calm';
  }
  function character(t){
    if(imgThrone.complete && imgThrone.naturalWidth) g.drawImage(imgThrone,95,315,670,898);
    var name = performancePose(t), pose = characterPoses[name], img = pose.image;
    root.dataset.pose = name;
    if(!img.complete || !img.naturalWidth) return;
    // Shared seat anchor preserves scale and alignment between all four PSD poses.
    var h = pose.height, w = h * img.naturalWidth / img.naturalHeight;
    g.drawImage(img, W / 2 - w / 2, 1085 - h, w, h);
  }
  function note(x, y, w, lane, a){
    var img = imgNotes[lane];
    if(!img.complete || !img.naturalWidth) return;
    var h = w * img.naturalHeight / img.naturalWidth;
    g.save(); g.globalAlpha = a;
    g.drawImage(img, x - w / 2, y - h / 2, w, h);
    g.restore();
  }
  function pads(){
    for(var i = 0; i < 5; i++) if(imgPads[i].complete && imgPads[i].naturalWidth) g.drawImage(imgPads[i], PAD_X[i] - 80, PAD_Y - 80, 160, 160);
  }
  function padLabels(t){
    g.font = '700 44px ' + MONO; g.textAlign = 'center'; g.textBaseline = 'middle';
    for(var i = 0; i < 5; i++){ var age = t - S.press[i]; g.fillStyle = age >= 0 && age < .14 ? '#fff' : COL[i]; g.fillText(String(i + 1), PAD_X[i], PAD_Y) }
  }

  /* ---------- pixel FX: effects are drawn on a 1/4-scale buffer and blown up without smoothing,
     so sparks, rings and rails share the chunky grid of the PSD art. Fades use ordered dithering
     instead of alpha, and animation moves in steps instead of tweens. ---------- */
  var FX = 4, fxc = document.createElement('canvas'), f = fxc.getContext('2d');
  fxc.width = Math.ceil(W / FX); fxc.height = Math.ceil(H / FX);
  var BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5], pats = {};
  var FIRE = ['#FFFFFF', '#FFF3B0', '#F2C46D', '#FF8A2E', '#E8455A', '#7A1424'];
  function ink(col, a){
    var lv = Math.round(Math.max(0, Math.min(1, a === undefined ? 1 : a)) * 8);
    if(lv >= 8) return col; if(!lv) return null;
    var key = col + lv;
    if(!pats[key]){
      var c = document.createElement('canvas'), x = c.getContext('2d'); c.width = c.height = 4; x.fillStyle = col;
      for(var i = 0; i < 16; i++) if(BAYER[i] < lv * 2) x.fillRect(i & 3, i >> 2, 1, 1);
      pats[key] = f.createPattern(c, 'repeat');
    }
    return pats[key];
  }
  function span(x0, x1, y, col, a){ var s = ink(col, a); if(!s) return; x0 = Math.round(x0); f.fillStyle = s; f.fillRect(x0, Math.round(y), Math.max(1, Math.round(x1) - x0 + 1), 1) }
  function dot(x, y, col, a){ span(x, x, y, col, a) }
  function rnd(n){ var x = Math.sin(n * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x) }
  function ramp(a){ return FIRE[Math.max(0, Math.min(FIRE.length - 1, Math.floor(a * FIRE.length)))] }
  function step(t, fps){ return Math.floor(t * fps) / fps }
  function fxBegin(){ f.clearRect(0, 0, fxc.width, fxc.height) }
  function fxEnd(){ g.save(); g.imageSmoothingEnabled = false; g.drawImage(fxc, 0, 0, fxc.width * FX, fxc.height * FX); g.restore() }
  /* one FX row of a lane: centre and width follow the neck's strings at that height */
  function laneRow(lane, fy, frac, col, a){ var y = fy * FX, c = laneX(lane, y) / FX, h = laneW(y) * frac / 2 / FX; span(c - h, c + h, fy, col, a) }
  function star(cx, cy, r, col, a){
    cx = Math.round(cx); cy = Math.round(cy);
    span(cx - r, cx + r, cy, col, a);
    for(var k = 1, v = Math.round(r * .6); k <= v; k++){ dot(cx, cy - k, col, a); dot(cx, cy + k, col, a) }
    span(cx - 1, cx + 1, cy - 1, '#FFFFFF', a); span(cx - 2, cx + 2, cy, '#FFFFFF', a); span(cx - 1, cx + 1, cy + 1, '#FFFFFF', a);
  }
  function yOf(p){ return Y0 + (Y1 - Y0) * (p <= 1 ? Math.pow(Math.max(0, p), 1.6) : 1 + (p - 1) * 1.6) }

  /* pressing a pad lights its slot and shoots a beam up its lane, along the string angle */
  function padFx(t){
    for(var i = 0; i < 5; i++){
      var age = t - S.press[i]; if(!(age >= 0 && age < .14)) continue;
      var k = 1 - step(age, 30) / .14, top = Math.round((Y1 - 300) / FX), bot = Math.round(Y1 / FX);
      for(var fy = top; fy <= bot; fy++) laneRow(i, fy, .84, COL[i], k * .55 * (fy - top) / (bot - top));
      var y0 = Math.round((Y1 - 24) / FX), y1 = Math.round((Y1 + 24) / FX);
      for(var y = y0; y <= y1; y++){
        var cx = laneX(i, y * FX) / FX, w = laneW(y * FX) * .45 / FX;
        if(y === y0 || y === y1) span(cx - w, cx + w, y, COL[i], k); else { dot(cx - w, y, COL[i], k); dot(cx + w, y, COL[i], k) }
      }
      var px = PAD_X[i] / FX, py = PAD_Y / FX;
      for(var r = -8; r <= 8; r++){ var hw = 11 * Math.sqrt(1 - r * r / 81); span(px - hw, px + hw, py + r, COL[i], k * .6) }
      span(px - 6, px - 2, py - 4, '#FFFFFF', k * .8); span(px - 7, px - 5, py - 3, '#FFFFFF', k * .6);
    }
  }

  /* sustain rail: dark rim, lane-coloured body and a white core whose width follows the neck's perspective */
  function railFx(no, t, tr){
    var yHead = yOf(1 - ((no.hit > 0 && no.holding ? t : no.t) - t) / tr), pTail = 1 - (no.t + no.dur - t) / tr;
    if(pTail > 1.05 || 1 - (no.t - t) / tr < 0) return;
    var yTail = Math.max(Y0, yOf(pTail)); yHead = Math.min(yHead, Y1 + 8);
    if(yTail >= yHead) return;
    var held = no.holding, a = no.hit && !held ? .5 : 1, tick = Math.floor(t * 20);
    var ft = Math.ceil(yTail / FX), fh = Math.floor(yHead / FX);
    for(var fy = ft; fy <= fh; fy++){
      var y = fy * FX, cx = laneX(no.lane, y) / FX, hw = Math.max(1, laneW(y) * .16 / FX), cap = fy - ft;
      if(cap < 2) hw = Math.max(1, hw - (2 - cap));                              // stepped round cap at the tail
      var wob = held && !RM ? Math.round(rnd(fy * 7 + tick) * 2 - 1) : 0;       // electric jitter while held
      span(cx - hw, cx + hw, fy, COL_D[no.lane], a);
      span(cx - hw + 1, cx + hw - 1, fy, COL[no.lane], a);
      span(cx - hw * .3 + wob, cx + hw * .3 + wob, fy, '#FFFFFF', a * (held ? 1 : .6));
    }
  }

  /* holding a sustain: a flickering star on the slot and sparks climbing the lane */
  function holdFx(no, t){
    var cx = laneX(no.lane, Y1) / FX, cy = Y1 / FX;
    if(RM){ star(cx, cy, 5, COL[no.lane]); return }
    star(cx, cy, Math.floor(t * 15) & 1 ? 7 : 5, COL[no.lane]);
    for(var k = 0; k < 8; k++){
      var ph = step((t * 2.4 + rnd(k + no.lane * 9)) % 1, 12), y = (Y1 - ph * 110);
      var x = laneX(no.lane, y) / FX + (rnd(k * 3 + 1) - .5) * laneW(y) * .5 / FX;
      dot(x, y / FX - 2, ramp(ph), 1 - ph * .6);
      if(ph < .35) dot(x, y / FX - 1, ramp(ph + .25), .7);
    }
  }

  /* hit: flash star, a ring lying flat on the neck and sparks falling under gravity. Miss: smoke and a red cross. */
  function burstFx(b, t){
    if(b.seed === undefined) b.seed = Math.random() * 1000;
    var age = step(t - b.t, 24), a = age / .45, cx = laneX(b.lane, Y1) / FX, cy = Y1 / FX, k, an, x, y;
    if(b.miss){
      for(k = 0; k < 7; k++){ x = cx + (rnd(b.seed + k) - .5) * 14; y = cy - 2 - a * (5 + rnd(b.seed + k + 20) * 12); span(x, x + 1, y, k & 1 ? '#3A2A33' : '#5A4650', 1 - a) }
      if(a < .6) for(k = -2; k <= 2; k++){ dot(cx + k, cy + k, '#E8455A', 1 - a); dot(cx + k, cy - k, '#E8455A', 1 - a) }
      return;
    }
    if(RM){ for(k = 0; k < 60; k++){ an = k / 60 * 6.2832; dot(cx + Math.cos(an) * 10, cy + Math.sin(an) * 4.5, '#F2C46D', 1 - a) } return }
    if(a < .25) star(cx, cy, b.perfect ? 12 : 8, b.perfect ? '#FFF3B0' : COL[b.lane]);
    var r = 4 + a * (b.perfect ? 22 : 14), n = Math.ceil(r * 6);
    for(k = 0; k < n; k++){ an = k / n * 6.2832; dot(cx + Math.cos(an) * r, cy + Math.sin(an) * r * .45, b.perfect ? ramp(a * .9) : COL[b.lane], 1 - a) }
    for(k = 0; k < (b.perfect ? 16 : 9); k++){
      an = -Math.PI * (.08 + .84 * rnd(b.seed + k));
      var v = (b.perfect ? 70 : 50) * (.5 + rnd(b.seed + k + 50)), col = ramp(a + rnd(b.seed + k + 90) * .2);
      x = cx + Math.cos(an) * v * age; y = cy + Math.sin(an) * v * age + 90 * age * age;
      dot(x, y, col); if(a < .5) dot(x - Math.cos(an), y - Math.sin(an), col, .5);
    }
  }

  /* overdrive: a dithered gold wash over the neck and embers rising between the strings */
  function overdriveFx(wall){
    var lv = RM ? .0625 : Math.floor(wall * 8) & 1 ? .0625 : .125;
    for(var fy = Math.round(Y0 / FX); fy <= Math.round((Y1 + 30) / FX); fy++){ var l = leftX(fy * FX); span(l / FX, (l + 5 * laneW(fy * FX)) / FX, fy, '#F2C46D', lv) }
    if(RM) return;
    for(var k = 0; k < 22; k++){
      var ph = step((wall * (.35 + rnd(k) * .3) + rnd(k + 40)) % 1, 30), y = Y1 - ph * (Y1 - Y0), x = leftX(y) + rnd(k + 80) * 5 * laneW(y);
      dot(x / FX, y / FX, ramp(ph * .9), 1 - ph * .5);
    }
  }
  function hud(t){
    var live = S.state === 'play' || S.state === 'pause' || S.state === 'end';
    var od = t < S.odUntil && live, ready = S.shred >= 100 && !od && S.state === 'play';

    /* HUD top shadow kept flush with top and side edges (0 to W) */
    var shade = g.createLinearGradient(0, 0, 0, 270);
    shade.addColorStop(0, 'rgba(3,5,10,.94)'); shade.addColorStop(1, 'rgba(3,5,10,0)');
    g.fillStyle = shade; g.fillRect(0, 0, W, 270);

    /* PONTOS (Silkscreen Bold + Jersey 10) */
    g.textAlign = 'left'; g.textBaseline = 'middle';
    g.fillStyle = '#ff493f';
    g.font = '700 22px ' + MONO;
    g.fillText('PONTOS', 44, 112);

    g.save();
    g.shadowColor = '#fa2925'; g.shadowBlur = 14;
    g.font = '700 70px ' + FONT_NUM;
    g.fillStyle = '#FF4538';
    g.fillText(String(S.score).padStart(6, '0'), 42, 167);
    g.restore();

    /* COMBO & MULTIPLICADOR INTEGRADO */
    g.textAlign = 'left';
    g.fillStyle = '#ff493f';
    g.font = '700 22px ' + MONO;
    g.fillText('COMBO', 510, 112);

    /* Número do combo em Jersey 10 (Elemento principal) */
    var comboStr = String(S.combo);
    g.save();
    g.shadowColor = '#fa2925'; g.shadowBlur = 14;
    g.font = '700 70px ' + FONT_NUM;
    g.fillStyle = '#FF4538';
    g.fillText(comboStr, 510, 167);
    var comboW = g.measureText(comboStr).width;
    g.restore();

    /* Divisor discreto vertical em tom de brasa escura */
    var divX = 510 + comboW + 18;
    g.strokeStyle = '#69352e';
    g.lineWidth = 3;
    g.beginPath();
    g.moveTo(divX, 142);
    g.lineTo(divX, 186);
    g.stroke();

    /* Multiplicador integrado em Silkscreen Bold (Secundário, em brasa incandescente, sem quadrado bege) */
    var m = mult(t);
    var multStr = '×' + m;
    var multX = divX + 18;
    var isBurning = m > 1 || od;
    var emberGlow = isBurning ? (0.7 + 0.3 * Math.sin(t * 8)) : 0;

    g.save();
    g.font = '700 30px ' + MONO;
    if(isBurning){
      // Ao passar para ×2, ×3 ou ×4 (ou ×8 no overdrive), ganha intensidade e brilho como brasa acendendo
      g.shadowColor = m >= 4 ? '#FF3B30' : '#FF9A42';
      g.shadowBlur = 12 + 8 * emberGlow;
      g.fillStyle = m >= 4 ? '#FF8A2E' : '#FF9A42';
    } else {
      g.fillStyle = '#8f433b'; // tom discreto quando ×1
    }
    g.fillText(multStr, multX, 167);
    g.restore();

    /* Barra de progresso contínua e equilibrada no HUD */
    g.fillStyle = '#17080a'; g.fillRect(42, 215, 774, 18);
    g.strokeStyle = '#69352e'; g.lineWidth = 2; g.strokeRect(42, 215, 774, 18);
    var progress = live ? Math.max(0, Math.min(1, t / SONG)) : 0;
    g.fillStyle = '#ff332d'; g.fillRect(45, 218, 768 * progress, 12);


    /* Shred meter / Overdrive gauge:
       assets/ui/battery-meter2.png (140x351) - closed state (initial / low combo / on miss)
       assets/ui/battery-meter.png (140x351) - open state (opens after a sustained streak of high notes: combo >= 20, ready, or overdrive)
       Cavity / charging tube area (marked magenta by user):
       x: 54..86 (w=32), y: 130..292 (h=162) relative to 140x351 image.
    */
    var bw = 140, bh = 351, bx = 12, by = 615;
    var innerX = bx + 54, innerY = by + 130, innerW = 32, innerH = 162;
    var isOpen = S.combo >= 20 || od || ready;
    var curBattery = (isOpen && imgBatteryOpen.complete && imgBatteryOpen.naturalWidth) ? imgBatteryOpen : (imgBatteryClosed.complete && imgBatteryClosed.naturalWidth ? imgBatteryClosed : imgBatteryOpen);
    if(curBattery.complete && curBattery.naturalWidth) g.drawImage(curBattery, bx, by, bw, bh);
    else { g.fillStyle = '#120810'; g.fillRect(innerX, innerY, innerW, innerH); }

    var lvl = Math.max(0, Math.min(100, od ? (S.odUntil - t) / OD_LEN * 100 : S.shred));
    var unchargedH = innerH * (1 - lvl / 100);
    // Dark mask covering the uncharged top portion of the tube
    g.fillStyle = 'rgba(8,4,9,.92)';
    g.fillRect(innerX, innerY, innerW, unchargedH);

    // Glowing meniscus / charge head line when charged
    if(lvl > 0 && lvl < 100){
      var meniscusY = innerY + unchargedH;
      g.save();
      g.fillStyle = isOpen ? '#FFE072' : '#FF6354';
      g.shadowColor = isOpen ? '#FFA000' : '#FF3B30';
      g.shadowBlur = 8;
      g.fillRect(innerX, meniscusY - 1, innerW, 3);
      g.restore();
    }

    if(ready || od){
      g.save();
      g.globalAlpha = RM ? .9 : .5 + .5 * Math.sin(t * 8);
      g.strokeStyle = '#F2C46D';
      g.lineWidth = 3;
      g.strokeRect(innerX - 2, innerY - 2, innerW + 4, innerH + 4);
      g.restore();
    }
    g.textAlign = 'center'; font(18); outline('BAT', bx + bw / 2, by - 4, '#F2C46D', 5);

    /* Overdrive banner, art from assets/ui/overdrive-bar.png, shown on top of throne when ready or active */
    if(ready || od){
      var ow = 380, os = ow / 423, oh = 93 * os, ox = (W - ow) / 2, oy = 250;
      if(imgOD.complete && imgOD.naturalWidth) g.drawImage(imgOD, ox, oy, ow, oh);
      g.fillStyle = '#1b0709'; g.fillRect(ox + 112 * os, oy + 25 * os, 255 * os, 43 * os);
      font(24); g.fillStyle = '#ffb771'; g.fillText('OVERDRIVE', ox + 206 * os, oy + oh / 2 + 5);
      font(20); g.fillStyle = '#F2E6D8';
      g.fillText(od ? Math.ceil(S.odUntil - t) + 's' : 'ESPAÇO', ox + 316 * os, oy + oh / 2 + 5);
    }
  }

  function draw(){
    var live = S.state === 'play' || S.state === 'pause' || S.state === 'end', t = live ? now() : 0, wall = performance.now() / 1000;
    g.clearRect(0, 0, W, H);
    if(bg.complete && bg.naturalWidth) g.drawImage(bg, 0, 0, W, H); else { g.fillStyle = '#170A15'; g.fillRect(0, 0, W, H) }
    character(t);
    if(imgNeck.complete && imgNeck.naturalWidth) g.drawImage(imgNeck,25,810,808,550);
    pads();
    /* under the notes: overdrive wash, pad beams and sustain rails */
    var tr = TRAVEL[S.mode], n, no;
    fxBegin();
    if(live && t < S.odUntil) overdriveFx(wall);
    padFx(t);
    for(n = 0; n < S.notes.length; n++) if(S.notes[n].dur > 0) railFx(S.notes[n], t, tr);
    fxEnd();
    padLabels(t);
    /* notes: they run from the top of the neck to the hit line, speeding up with the perspective */
    for(n = 0; n < S.notes.length; n++){ no = S.notes[n];
      if(no.hit) continue; var p = 1 - (no.t - t) / tr; if(p < 0) break;
      var y = yOf(p);
      note(laneX(no.lane, y), y, laneW(y) * .78, no.lane, Math.min(1, p / .08) * (p > 1.04 ? .5 : 1)) }
    /* over the notes: hold sparks, hit and miss bursts */
    S.bursts = S.bursts.filter(function(b){ return t - b.t < .45 && t >= b.t });
    fxBegin();
    for(n = 0; n < S.notes.length; n++) if(S.notes[n].holding && !S.notes[n].completed) holdFx(S.notes[n], t);
    S.bursts.forEach(function(b){ burstFx(b, t) });
    fxEnd();
    if(S.state === 'play' && t < 0){ font(150); outline(String(Math.min(4, Math.ceil(-t / (BAR / 4)))), W / 2, 980, '#F2C46D', 14) }
    hud(t);
  }

  var raf = 0;
  function loop(){
    cancelAnimationFrame(raf);
    S.lastT = now();
    (function frame(){
      if(S.state !== 'play') return;
      var t = now();
      var dt = Math.max(0, Math.min(0.05, t - S.lastT));
      S.lastT = t;

      if(S.bot){ // the demo plays every note on the beat and holds sustain notes
        for(var j = 0; j < S.notes.length; j++){
          var bn = S.notes[j];
          if(bn.t <= t && !bn.hit){
            S.press[bn.lane] = bn.t;
            judge(bn, bn.t, true);
          }
          if(bn.dur > 0 && bn.hit > 0 && t <= bn.t + bn.dur){
            bn.holding = true;
            S.press[bn.lane] = t; // keep pad illuminated
          }
        }
        if(S.shred >= 100) overdrive();
      }

      // Check sustain holds & scoring for all notes
      for(var sIdx = 0; sIdx < S.notes.length; sIdx++){
        var sn = S.notes[sIdx];
        if(!sn.dur || !sn.hit || sn.completed) continue;
        if(t <= sn.t + sn.dur){
          if(!S.bot){
            sn.holding = Boolean(S.held[sn.lane]);
            if(sn.holding) S.press[sn.lane] = t;
          }
          if(sn.holding && dt > 0){
            S.score += Math.round(50 * dt * mult(t));
            if(t > S.odUntil) S.shred = Math.min(100, S.shred + 1.8 * dt);
          }
        } else if(!sn.completed){
          if(sn.holding){
            S.score += 50 * mult(t);
            S.bursts.push({ lane: sn.lane, t: t, perfect: true });
          }
          sn.holding = false;
          sn.completed = true;
        }
      }

      for(var i = 0; i < S.notes.length; i++){ var n = S.notes[i];
        if(n.t > t - GOOD) break; if(n.hit) continue;
        n.hit = -1; S.combo = 0; S.lastMiss = t; S.fb = { text: 'ERROU', t: t, col: '#E8455A' }; S.bursts.push({ lane: n.lane, t: t, miss: true }) }
      draw();
      if(t > SONG + .3){
        if(S.isExhibition){
          startExhibition();
          return;
        }
        finish();
        return;
      }
      raf = requestAnimationFrame(frame);
    })();
  }
  setMode('normal');
  startExhibition();
})();

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
  var MONO = '"JetBrains Mono",ui-monospace,monospace';

  /* ---------- stage geometry, measured on the art (858 × 1632) ---------- */
  var Y0 = 710, Y1 = 1210;                                   // top of the neck, hit line (centre of the slots)
  var PAD_X = [98, 264, 429, 594, 760], PAD_Y = 1325;       // top faces of the five arcade pads
  var laneW = function(y){ return 140 + .18 * (y - 1210) }; // the neck widens linearly towards the player
  var leftX = function(y){ return 428.5 - 2.5 * laneW(y) };
  var laneX = function(i, y){ return 428.5 + (i - 2) * laneW(y) };
  var COL = ['#5FD068', '#E8455A', '#F2C230', '#3FA3F2', '#F28A2E'];
  var COL_D = ['#1F6B2A', '#7A1424', '#8A6A0C', '#124E82', '#8A4410'];
  var KEYS = 'asdfg';

  /* ---------- chart: the theme's riff, mapped to lanes by pitch ---------- */
  var BAR = 1.0909, SONG = 56.54;   // Master of Puppets: 220 BPM (1.0909 s/bar); 56.54s showcase track
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
  function chart(mode){
    var out = [];
    for(var b = 0; b < SONG / BAR; b++){
      var ev = events(RIFF[b % RIFF.length], 0, 8);
      ev.forEach(function(e, k){
        var quarter = e.at % 2 === 0, lane = LANE[e.n.replace(/\d/g, '')], t = b * BAR + e.at * BAR / 8;
        if(mode === 'easy' && !(e.top && quarter)) return;
        var prev = ev[k - 1], change = !prev || LANE[prev.n.replace(/\d/g, '')] !== lane;
        if(mode === 'normal' && !(e.first && (quarter || change))) return;
        if(mode === 'expert' && !(e.first || change)) return;     // every eighth, but no sixteenths on the same lane
        out.push({ t: t, lane: lane, hit: 0 });
        if(mode === 'expert' && e.at === 0 && b % 2 === 0) out.push({ t: t, lane: lane > 2 ? lane - 2 : lane + 2, hit: 0 });
      });
    }
    return out;
  }

  /* ---------- audio: its own context, so pausing the game never touches the page's player ---------- */
  var ctx = null, buf = null, lead = 0, src = null, gain = null, loadP = null;
  function actx(){ if(!ctx){ var C = window.AudioContext || window.webkitAudioContext; ctx = new C(); gain = ctx.createGain(); gain.gain.value = .8; gain.connect(ctx.destination) } return ctx }
  function load(){
    if(loadP) return loadP;
    loadP = fetch(root.dataset.audio).then(function(r){ return r.arrayBuffer() })
      .then(function(ab){ return new Promise(function(ok, no){ actx().decodeAudioData(ab, ok, no) }) })
      .then(function(b){
        buf = b;
        SONG = Math.floor(b.duration * 100) / 100;
        var ch = b.getChannelData(0), i = 0, lim = Math.min(ch.length, b.sampleRate * .08);
        while(i < lim && Math.abs(ch[i]) < .003) i++;
        lead = i / b.sampleRate;
      });
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
  var S = { mode: 'normal', state: 'idle', bot: false, demo: false, userTookOver: false, notes: [], t0: 0, wallT0: 0, offset: 0, score: 0, combo: 0, best: 0,
            perfect: 0, good: 0, shred: 0, odUntil: -1, fb: null, lastMiss: null, press: [-9, -9, -9, -9, -9], bursts: [], visible: true,
            demoLoopTimer: 0, attractTimer: 0 };
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
      S.t0 = ctx.currentTime - curT;
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
  }
  function setMode(m){ S.mode = m; root.querySelectorAll('[data-mode]').forEach(function(b){ b.setAttribute('aria-pressed', b.dataset.mode === m) }) }
  root.querySelectorAll('[data-mode]').forEach(function(b){ b.addEventListener('click', function(){ setMode(b.dataset.mode) }) });

  function scheduleAttractMode(){
    clearTimeout(S.attractTimer);
    S.attractTimer = setTimeout(function(){
      if(S.state === 'idle' && S.visible){
        start(true);
      }
    }, 15000);
  }

  function start(demo){
    clearTimeout(S.demoLoopTimer);
    clearTimeout(S.attractTimer);
    document.dispatchEvent(new CustomEvent('ho:game'));      // the page stops its own theme player
    actx();
    if(ctx && ctx.state === 'suspended') ctx.resume().catch(function(){});
    var btn = $('.hg-go');
    if(btn){ btn.disabled = true; btn.textContent = 'Ligando os amplificadores…'; }
    $('.hg-msg').textContent = '';
    load().then(function(){
      if(btn){ btn.disabled = false; btn.textContent = 'Tocar'; }
      S.bot = S.demo = demo;
      S.userTookOver = false;
      S.notes = chart(S.mode);
      S.score = S.combo = S.best = S.perfect = S.good = 0;
      S.shred = 0; S.odUntil = -1; S.fb = null; S.lastMiss = null; S.bursts = []; S.press = [-9, -9, -9, -9, -9];
      if(src){ try{ src.stop() }catch(e){} src = null }

      var banner = $('.hg-attract-banner');
      if(banner){
        if(demo){
          banner.className = 'hg-attract-banner';
          banner.innerHTML = '<div class="hg-attract-pill"><span class="hg-attract-pulse" aria-hidden="true"></span><span class="hg-attract-badge">DEMO</span><span class="hg-attract-label">Modo demonstração · <strong>Toque ou aperte A S D F G para assumir</strong></span></div>';
        } else {
          banner.className = 'hg-attract-banner is-hidden';
        }
      }

      var baseTime = (ctx && ctx.state === 'running') ? ctx.currentTime : 0;
      var at = baseTime + .15;
      if(ctx && ctx.state === 'running'){
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
  function pause(){ if(S.state !== 'play') return; S.state = 'pause'; if(ctx && ctx.state === 'running') ctx.suspend().catch(function(){}); show('pause'); $('.hg-resume').focus({ preventScroll: true }) }
  function resume(){ if(S.state !== 'pause') return; S.state = 'play'; if(ctx && ctx.state === 'suspended') ctx.resume().catch(function(){}); show(null); $('.hg-pause').focus({ preventScroll: true }); loop() }
  function quit(){
    if(src){ try{ src.stop() }catch(e){} src = null }
    if(ctx && ctx.state === 'suspended') ctx.resume().catch(function(){});
    S.state = 'idle'; S.notes = []; S.score = S.combo = S.shred = 0; S.odUntil = -1; show('start'); draw();
    $('.hg-go').focus({ preventScroll: true });
    scheduleAttractMode();
  }

  var sessionScores = [];
  var RANKS = [[97, 'S', 5, 'A noite é sua.'], [88, 'A', 4, 'O palco te ouviu.'], [72, 'B', 3, 'Quase lá.'], [52, 'C', 2, 'Afine e volte.'], [0, 'D', 1, 'O ritual pede bis.']];
  function finish(){
    S.state = 'end';
    var total = S.notes.length, acc = total ? (S.perfect + .5 * S.good) / total * 100 : 0;
    var r = RANKS.filter(function(x){ return acc >= x[0] })[0];
    if(!S.demo) sessionScores.push({ score: S.score, rank: r[1], mode: S.mode });
    $('.hg-rank').textContent = r[1];
    var rankImg = $('.hg-rank-img'), hasImg = 'SABC'.indexOf(r[1]) >= 0;
    $('.hg-rank').hidden = hasImg;
    rankImg.hidden = !hasImg;
    rankImg.alt = 'Rank ' + r[1];
    if(hasImg) rankImg.src = 'assets/ui/rank-' + r[1].toLowerCase() + '.png';
    $('.hg-result-status').textContent = S.userTookOver ? 'PARTIDA CONCLUÍDA' : (S.demo ? 'DEMONSTRAÇÃO CONCLUÍDA' : 'SESSÃO CONCLUÍDA');
    $('.hg-title').textContent = r[3];
    $('.hg-stars').innerHTML = [0,1,2,3,4].map(function(i){ return '<img src="assets/ui/star-filled.png" alt=""' + (i >= r[2] ? ' class="empty"' : '') + '>' }).join('');
    $('.hg-stars').setAttribute('aria-label', r[2] + ' de 5 estrelas');
    $('.hg-score').textContent = String(S.score).padStart(6, '0');
    $('.hg-stats').innerHTML = '<div><b>' + acc.toFixed(1).replace('.', ',') + '%</b>precisão</div><div><b>' + S.best + '</b>maior combo</div><div><b>' + (S.perfect + S.good) + '/' + total + '</b>notas</div>';
    $('.hg-breakdown').textContent = S.perfect + ' perfeitas · ' + S.good + ' boas · ' + (total - S.perfect - S.good) + ' perdidas';
    var prize = $('.hg-prize');
    if(S.demo && !S.userTookOver){
      prize.className = 'hg-prize lock';
      prize.innerHTML = '<b>MODO DEMONSTRAÇÃO · SEM BRINDE</b>Toque ou use o teclado para assumir a guitarra pra valer.';
    } else if(S.demo && S.userTookOver){
      prize.className = 'hg-prize lock';
      prize.innerHTML = '<b>PARTIDA ASSUMIDA DEPOIS DA DEMO</b>Jogue uma sessão do início para validar o brinde!';
    } else if(acc >= 88){
      prize.className = 'hg-prize';
      prize.innerHTML = '<b>BRINDE DESBLOQUEADO</b><span class="hg-code">HF-' + String(1000 + S.score % 9000) + '-' + r[1] + '</span>Código ilustrativo, só para o portfólio.';
    } else {
      prize.className = 'hg-prize lock';
      prize.innerHTML = '<b>PRÓXIMO DESAFIO: RANK A</b>88% de precisão para liberar o brinde.';
    }
    show('end');
    $('.hg-again').focus({ preventScroll: true });

    if(S.bot){
      clearTimeout(S.demoLoopTimer);
      S.demoLoopTimer = setTimeout(function(){
        if(S.state === 'end' && S.bot && S.visible){
          start(true);
        }
      }, 5000);
    }
  }

  /* ---------- input ---------- */
  function takeOver(){
    if(S.bot){
      S.bot = false;
      S.userTookOver = true;
      unlockAudio();
      $('.hg-live').textContent = 'Você assumiu a guitarra.';
      var banner = $('.hg-attract-banner');
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
    var t = now(); S.press[lane] = t;
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
  }
  function overdrive(){
    if(S.state !== 'play') return; var t = now();
    if(S.shred >= 100 && t > S.odUntil){ S.odUntil = t + OD_LEN; S.shred = 0; S.fb = { text: 'OVERDRIVE!', t: t, col: '#F2C46D' } }
  }
  document.addEventListener('keydown', function(e){
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
  cv.addEventListener('pointerdown', function(e){
    unlockAudio();
    if(S.state !== 'play') return;
    e.preventDefault(); takeOver();
    var r = cv.getBoundingClientRect(), x = (e.clientX - r.left) / r.width * W, y = (e.clientY - r.top) / r.height * H;
    if((x < 125 && y > 625 && y < 905) || y > 1420){ overdrive(); return }      // the Shred meter
    if(y < Y0 + 250) return;
    var l = y > Y1 + 40 ? PAD_X.reduce(function(a, px, i){ return Math.abs(px - x) < Math.abs(PAD_X[a] - x) ? i : a }, 0)
                        : Math.floor((x - leftX(Math.min(y, Y1))) / laneW(Math.min(y, Y1)));
    if(l >= 0 && l < 5) hit(l);
  });
  var bannerEl = $('.hg-attract-banner');
  if(bannerEl){
    bannerEl.addEventListener('pointerdown', function(e){
      e.preventDefault();
      unlockAudio();
      takeOver();
    });
  }
  $('.hg-go').addEventListener('click', function(){ start(false) });
  $('.hg-demo').addEventListener('click', function(){ start(true) });
  $('.hg-how').addEventListener('click', function(){ show('help'); $('.hg-instructions .hg-menu-back').focus({preventScroll:true}) });
  $('.hg-scores').addEventListener('click', function(){
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
  $('.hg-home').addEventListener('click', quit);
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
          start(true);
        } else if(S.state === 'pause_demo'){
          S.state = 'play';
          if(ctx && ctx.state === 'suspended') ctx.resume().catch(function(){});
          resyncAudio();
          loop();
        }
      }
    }, { threshold: .25 }).observe(root);
  }
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
  var imgBattery = sprite('battery-meter.png'), imgOD = sprite('overdrive-bar.png');
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
  function pads(t){
    for(var i = 0; i < 5; i++){
      var x = PAD_X[i], age = t - S.press[i], on = age >= 0 && age < .14;
      g.save();
      if(imgPads[i].complete && imgPads[i].naturalWidth) g.drawImage(imgPads[i],x-80,PAD_Y-80,160,160);
      if(on){
        g.globalAlpha = 1 - age / .14;
        var gl = g.createRadialGradient(x, PAD_Y, 6, x, PAD_Y, 110); gl.addColorStop(0, COL[i]); gl.addColorStop(1, 'rgba(0,0,0,0)');
        g.fillStyle = gl; g.beginPath(); g.arc(x, PAD_Y, 110, 0, 7); g.fill();
        g.fillStyle = COL[i]; g.beginPath(); g.ellipse(x, PAD_Y + 2, 46, 32, 0, 0, 7); g.fill();
        g.fillStyle = 'rgba(255,255,255,.45)'; g.beginPath(); g.ellipse(x - 10, PAD_Y - 8, 22, 10, 0, 0, 7); g.fill();
        g.globalAlpha *= .7; g.strokeStyle = COL[i]; g.lineWidth = 8;
        var w = laneW(Y1); g.strokeRect(laneX(i, Y1) - w * .45, Y1 - 24, w * .9, 48);
      }
      g.globalAlpha = 1; g.fillStyle = on ? '#fff' : COL[i]; font(44); g.textAlign = 'center'; g.textBaseline = 'middle';
      g.fillText(String(i + 1), x, PAD_Y);
      g.restore();
    }
  }
  function hud(t){
    var live = S.state === 'play' || S.state === 'pause' || S.state === 'end';
    var od = t < S.odUntil && live, ready = S.shred >= 100 && !od && S.state === 'play';

    /* HUD kept clear of the character; scores remain live. */
    var shade = g.createLinearGradient(0,45,0,330);
    shade.addColorStop(0,'rgba(3,5,10,.94)'); shade.addColorStop(1,'rgba(3,5,10,0)');
    g.fillStyle=shade; g.fillRect(20,45,818,285);
    g.textAlign='left'; g.textBaseline='middle'; g.fillStyle='#ff493f';
    font(24); g.fillText('PONTOS',44,112); g.fillText('COMBO',600,112);
    g.save(); g.shadowColor='#fa2925'; g.shadowBlur=12;
    font(64); g.fillText(String(S.score).padStart(6,'0'),42,167); g.fillText(String(S.combo),600,167); g.restore();
    g.fillStyle='#17080a'; g.fillRect(42,215,660,22);
    g.strokeStyle='#69352e'; g.lineWidth=3; g.strokeRect(42,215,660,22);
    var progress=live ? Math.max(0,Math.min(1,t/SONG)) : 0;
    g.fillStyle='#ff332d'; g.fillRect(46,219,652*progress,14);
    g.fillStyle='#ffb771'; g.fillRect(722,174,88,66);
    g.textAlign='center'; g.fillStyle='#210b09'; font(48); g.fillText('×'+mult(t),766,208);
    g.textAlign='left'; font(21); g.fillStyle='#ef7867'; g.fillText('MASTER OF PUPPETS',44,281);
    font(17); g.fillStyle='#d5b8af';
    g.fillText((S.bot ? 'DEMONSTRAÇÃO · ' : (S.userTookOver ? 'AO VIVO · ' : '')) + {easy:'APRENDIZ',normal:'GUITARRISTA',expert:'LENDA'}[S.mode],44,309);
    var rem = Math.ceil(Math.max(0, SONG - Math.max(0, t))), rm = Math.floor(rem / 60), rs = rem % 60;
    g.textAlign='right'; font(20); g.fillText(String(rm).padStart(2,'0') + ':' + String(rs).padStart(2,'0'), 810, 281);

    /* Shred meter / Overdrive gauge, art from assets/ui/battery-meter.png, left of the neck */
    var bw = 92, bs = bw / 96, bh = 313 * bs, bx = 28, by = 625;
    var innerX = bx + 15 * bs, innerY = by + 40 * bs, innerW = 66 * bs, innerH = 250 * bs;
    if(imgBattery.complete && imgBattery.naturalWidth) g.drawImage(imgBattery, bx, by, bw, bh);
    else { g.fillStyle = '#120810'; g.fillRect(innerX, innerY, innerW, innerH) }
    var lvl = Math.max(0, Math.min(100, od ? (S.odUntil - t) / OD_LEN * 100 : S.shred));
    g.fillStyle = 'rgba(8,4,9,.88)'; g.fillRect(innerX, innerY, innerW, innerH * (1 - lvl / 100));
    if(ready){ g.save(); g.globalAlpha = RM ? .9 : .5 + .5 * Math.sin(t * 8); g.strokeStyle = '#F2C46D'; g.lineWidth = 4; g.strokeRect(bx - 4, by - 4, bw + 8, bh + 8); g.restore() }
    g.textAlign = 'center'; font(18); outline('BATERIA', bx + bw / 2, by + 30, '#F2C46D', 5);

    /* Overdrive banner, art from assets/ui/overdrive-bar.png, shown when ready or active */
    if(ready || od){
      var ow = 760, os = ow / 423, oh = 93 * os, ox = (W - ow) / 2, oy = 1420;
      if(imgOD.complete && imgOD.naturalWidth) g.drawImage(imgOD, ox, oy, ow, oh);
      g.fillStyle = '#1b0709'; g.fillRect(ox + 112 * os, oy + 25 * os, 255 * os, 43 * os);
      font(34); g.fillStyle = '#ffb771'; g.fillText('OVERDRIVE', ox + 206 * os, oy + oh / 2 + 10);
      font(30); g.fillStyle = '#F2E6D8';
      g.fillText(od ? Math.ceil(S.odUntil - t) + 's' : 'ESPAÇO', ox + 318 * os, oy + oh / 2 + 10);
    }
  }
  function draw(){
    var live = S.state === 'play' || S.state === 'pause' || S.state === 'end', t = live ? now() : 0, wall = performance.now() / 1000;
    g.clearRect(0, 0, W, H);
    if(bg.complete && bg.naturalWidth) g.drawImage(bg, 0, 0, W, H); else { g.fillStyle = '#170A15'; g.fillRect(0, 0, W, H) }
    character(t);
    if(imgNeck.complete && imgNeck.naturalWidth) g.drawImage(imgNeck,25,707,808,530);
    if(live && t < S.odUntil){
      g.save(); g.globalAlpha = .16 + (RM ? 0 : .06 * Math.sin(wall * 6)); g.fillStyle = '#F2C46D';
      g.beginPath(); g.moveTo(leftX(Y0), Y0); g.lineTo(leftX(Y0) + 5 * laneW(Y0), Y0); g.lineTo(leftX(Y1 + 30) + 5 * laneW(Y1 + 30), Y1 + 30); g.lineTo(leftX(Y1 + 30), Y1 + 30); g.closePath(); g.fill(); g.restore();
    }
    pads(t);
    /* notes: they run from the top of the neck to the hit line, speeding up with the perspective */
    var tr = TRAVEL[S.mode];
    for(var n = 0; n < S.notes.length; n++){ var no = S.notes[n];
      if(no.hit) continue; var p = 1 - (no.t - t) / tr; if(p < 0) break;
      var y = Y0 + (Y1 - Y0) * (p <= 1 ? Math.pow(p, 1.6) : 1 + (p - 1) * 1.6);
      note(laneX(no.lane, y), y, laneW(y) * .78, no.lane, Math.min(1, p / .08) * (p > 1.04 ? .5 : 1)) }
    /* hit bursts */
    S.bursts = S.bursts.filter(function(b){ return t - b.t < .35 && t >= b.t });
    S.bursts.forEach(function(b){ var a = (t - b.t) / .35, x = laneX(b.lane, Y1), y = Y1;
      g.save(); g.globalAlpha = 1 - a;
      if(RM){ g.strokeStyle = '#F2C46D'; g.lineWidth = 6; g.beginPath(); g.arc(x, y, 44, 0, 7); g.stroke() }
      else {
        var gl = g.createRadialGradient(x, y, 4, x, y, 90); gl.addColorStop(0, 'rgba(255,233,168,.9)'); gl.addColorStop(1, 'rgba(255,140,40,0)');
        g.fillStyle = gl; g.beginPath(); g.arc(x, y, 90, 0, 7); g.fill();
        for(var k = 0, rays = b.perfect ? 14 : 8; k < rays; k++){ var an = k / rays * Math.PI * 2 + b.lane, r1 = 18 + a * 40, r2 = r1 + (b.perfect ? 70 : 40) * (1 - a * .5);
          g.strokeStyle = k % 2 ? '#FFB347' : '#FFE9A8'; g.lineWidth = 6 - a * 4; g.beginPath(); g.moveTo(x + r1 * Math.cos(an), y + r1 * Math.sin(an)); g.lineTo(x + r2 * Math.cos(an), y + r2 * Math.sin(an)); g.stroke() }
      }
      g.restore() });
    /* feedback: fades in place, never moves */
    g.textAlign = 'center'; g.textBaseline = 'alphabetic';
    if(S.fb && t - S.fb.t < .5 && t >= S.fb.t){ g.save(); g.globalAlpha = 1 - (t - S.fb.t) / .5;
      font(60); outline(S.fb.text, W / 2, 1000, S.fb.col, 10);
      if(S.combo > 4 && S.fb.text !== 'ERROU'){ font(28); outline(S.combo + ' EM SEQUÊNCIA', W / 2, 1044, '#F2E6D8', 7) }
      g.restore() }
    if(S.state === 'play' && t < 0){ font(150); outline(String(Math.min(4, Math.ceil(-t / (BAR / 4)))), W / 2, 980, '#F2C46D', 14) }
    hud(t);
  }

  var raf = 0;
  function loop(){
    cancelAnimationFrame(raf);
    (function frame(){
      if(S.state !== 'play') return;
      var t = now();
      if(S.bot){                                             // the demo plays every note on the beat, whatever the frame rate
        for(var j = 0; j < S.notes.length && S.notes[j].t <= t; j++){ var bn = S.notes[j]; if(!bn.hit){ S.press[bn.lane] = bn.t; judge(bn, bn.t, true) } }
        if(S.shred >= 100) overdrive();
      }
      for(var i = 0; i < S.notes.length; i++){ var n = S.notes[i];
        if(n.t > t - GOOD) break; if(n.hit) continue;
        n.hit = -1; S.combo = 0; S.lastMiss = t; S.fb = { text: 'ERROU', t: t, col: '#E8455A' } }
      draw();
      if(t > SONG + .3){ finish(); return }
      raf = requestAnimationFrame(frame);
    })();
  }
  setMode('normal');
  start(true);
})();

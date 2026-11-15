/* Jogo: laço principal, entrada, colisões sincronizadas com a música e desenho. */
(function () {
  'use strict';
  const G = window.G, A = window.GBA, M = window.MUSIC, C = window.Characters;
  const W = G.W, FX = G.FLYX, PXB = G.PXB, BGW = 740, BGH = 416, WIN = 0.075;
  const cv = document.getElementById('game'), g = cv.getContext('2d');
  const uc = document.getElementById('ui'), u = uc.getContext('2d');
  const stage = document.getElementById('stage');
  let H = 400, SCALE = 2, DPR = 1, playTop = 58, playBot = 360;
  const asset = p => (window.EMBED && window.EMBED[p]) || p;

  /* ---------- sprites pequenos em ASCII ---------- */
  const PAL = { k: '#2b1b3a', W: '#ffffff', y: '#ffd84a', Y: '#f2b632', o: '#d98a1e', O: '#ff9a3c', r: '#ff5277', R: '#e23b5a', p: '#ff9bb8', P: '#ff6b97', b: '#b98058', B: '#8a5a3c', g: '#6fcf5a', G: '#3e9a48', c: '#bfe9ff', C: '#73c8f0', s: '#5b3a2a', w: '#f4efe6', d: '#5b4a66', v: '#cdb7f6', V: '#9a7be0' };
  function mk(rows, pal) {
    const w = Math.max(...rows.map(r => r.length)), c = document.createElement('canvas');
    c.width = w; c.height = rows.length; const x = c.getContext('2d');
    rows.forEach((r, j) => { for (let i = 0; i < r.length; i++) { const ch = r[i]; if (ch === '.' || ch === ' ') continue; x.fillStyle = (pal && pal[ch]) || PAL[ch] || '#f0f'; x.fillRect(i, j, 1, 1); } });
    return c;
  }
  const HEART = ['.kk...kk.', 'krrk.krrk', 'krWrkrrrk', 'krrrrrrrk', '.krrrrrk.', '..krrrk..', '...krk...', '....k....'];
  const S = {
    pollen: mk(['...k...', '..kyk..', '.kyWyk.', 'kyWWWyk', '.kyWyk.', '..kyk..', '...k...']),
    pollenHot: mk(['...k...', '..kpk..', '.kpWpk.', 'kpWWWpk', '.kpWpk.', '..kpk..', '...k...']),
    harm: mk(['..k..', '.kck.', 'kcWck', '.kck.', '..k..']),
    miss: mk(['.d.', 'ddd', '.d.']),
    bait: mk(['k.....k', '.kr.rk.', '..krk..', '.krRrk.', '..krk..', '.kr.rk.', 'k.....k']),
    heart: mk(HEART), heartOff: mk(HEART, { r: '#5b4a66', W: '#6d5b7a' }),
    dew: mk(['...k...', '..kCk..', '..kck..', '.kcCCk.', '.kcWCk.', 'kcWCCCk', 'kcCCCCk', '.kCCCk.', '..kkk..']),
    pip: mk(['.kk....', 'kcck...', 'kcWckk.', '.kccCck', '..kkCCk', '....kk.']),
    pipOff: mk(['.kk....', 'kddk...', 'kdddkk.', '.kddddk', '..kkddk', '....kk.']),
    foods: [
      mk(['....kk......','...kBBk.....','...kBbBk....','..kBBBBBk...','..kBBBBBBk..','.kBWkBBWkBk.','.kBWkBBWkBk.','kBBBBBBBBBBk','kBBpBkkBpBBk','kBbBBBBBBbBk','.kkkkkkkkkk.']),
      mk(['.....kgk....','....kgGk....','..kkkkkkk...','.kPPrRRRRk..','kPWWrrrrRRk.','kPWrrrrrRRk.','kPrrrrrrRRk.','kPrrrrrrRRk.','.krrrrrRRk..','..kRrrRRk...','...kkkkk....']),
      mk(['.......kk...','......kyk...','......kyk...','.....kyyk...','....kyyYk...','...kyyyYk...','..kyyyYk....','.kyyyyYk....','kyyyyyk.....','kYYYkk......','.kkk........']),
      mk(['..kgk.kgk...','...kGGGk....','..kkrrrkk...','.kPrWrWrRk..','kPrWrWrWrRk.','kPrrWrWrrRk.','.krrWrWrRk..','.kRrrWrrRk..','..kRrrrRk...','...kRrRk....','....kkk.....']),
      mk(['....kgk.....','....kgGk....','...kkkkk....','..kOOOOOk...','.kOWWOOOOk..','kOWOOOOOOOk.','kOOOOOOOoOk.','kOOOOOOooOk.','.kOOOoooOk..','..kOoooOk...','...kkkkk....']),
    ],
    acc: {
      laco: { c: mk(['kk...kk', 'kPk.kPk', 'kPPkPPk', 'kPk.kPk', 'kk...kk']), dx: -3, dy: -3 },
      flor: { c: mk(['..kk...', '.kWWk..', 'kWyyWk.', 'kWyyWk.', '.kWWk..', '..kk...']), dx: -6, dy: -2 },
      coroa: { c: mk(['k..k..k', 'kykykyk', 'kyyyyyk', 'kyrypyk', 'kkkkkkk']), dx: -3, dy: -5 },
      cartola: { c: mk(['.kkkkk.', '.kdddk.', '.kdddk.', '.kPPPk.', 'kkkkkkk', 'kdddddk', 'kkkkkkk']), dx: -3, dy: -7 },
      oculos: { c: mk(['kkkk.kkkk', 'kcCkkkcCk', 'kCCk.kCCk', 'kkkk.kkkk']), dx: -2, dy: 5 },
    },
  };

  const UI = {
    fruit:S.foods[1],poop:S.foods[0],heart:S.heart,star:S.pollen,
    play:mk(['.kk......','.kpk.....','.kppk....','.kpppk...','.kppppk..','.kpppk...','.kppk....','.kpk.....','.kk......']),
    book:mk(['kkkkk.kkkkk','kpppk.kvvvk','kppppk vvvk','kpWppkvWvvk','kppppkvvvvk','kpWppkvWvvk','kppppkvvvvk','kkkkkkkkkkk']),
    music:mk(['...kkkkkkk.','...kpppppk.','...kpkkkkk.','...kpk..kpk','...kpk..kpk','.kkkpk.kkpk','kppppkkpppk','kppppkkpppk','.kkkk..kkk.']),
    gift:mk(['..kk...kk..','.kppk.kppk.','..kppkppk..','kkkkkkkkkkk','kppppWppppk','kkkkkWkkkkk','.kvvvWvvvk.','.kvvvWvvvk.','.kvvvWvvvk.','.kkkkkkkkk.']),
    trophy:mk(['..kkkkkkk..','kkkyyyyykkk','kykyyyyykyk','kykyyyyykyk','.kkyyyyykk.','...kyyyk...','....kyk....','....kyk....','..kkyyykk..','..kkkkkkk..']),
    gear:mk(['...kkk...','.kkvvvkk.','.kvvvv vk.','kvvkkkvvk','kvvk.kvvk','kvvkkkvvk','.kvvvvvk.','.kkvvvkk.','...kkk...']),
  };
  G.pixelIcons = Object.fromEntries(Object.entries(UI).map(([name,c])=>[name,c.toDataURL()]));
  const motionQuery=window.matchMedia('(prefers-reduced-motion: reduce)');
  const quietMotion=()=>settings.motion===false||motionQuery.matches;
  let visualTime=0;
  function ambience(time, darkScene) {
    for(let i=0;i<18;i++) {
      const x=Math.round(((i*37.3-time*(1+i%3))% (W+10)+W+10)%(W+10)-5);
      const y=Math.round((i*53+Math.sin(time*.8+i)*3)%H);
      g.globalAlpha=.2+.15*Math.sin(time*2+i);g.fillStyle=i%3?'#ffd0e6':'#ffe19b';
      g.fillRect(x,y,1,1);if(i%5===0){g.fillRect(x-1,y,3,1);g.fillRect(x,y-1,1,3);}
    }
    g.globalAlpha=1;
    // Independent foreground pixels establish depth without obscuring the flight lane.
    for(let i=0;i<8;i++) {const x=i*29+Math.round(Math.sin(time*.6+i)*2);g.fillStyle=darkScene?'#402657':'#65408e';g.fillRect(x,H-10,11,10);g.fillRect(x+3,H-16,5,8);g.fillStyle=darkScene?'#a981d8':'#ff9bb8';g.fillRect(x+2,H-18,7,3);}
  }

  /* ---------- imagens ---------- */
  const imgs = {};
  function loadImg(key, path) { return new Promise((res,reject) => { const im = new Image(); im.onload = () => { imgs[key] = im; res(); }; im.onerror = () => reject(new Error('Não foi possível carregar o jardim.')); im.src = asset(path); }); }
  G.load = function () {
    const jobs = [C.load()];
    ['garden','night','pond'].forEach(name=>jobs.push(loadImg('pixel_'+name,'assets/pixel/'+name+'.webp')));
    return Promise.all(jobs).then(()=>{
      S.foods=C.foodCanvases();
      G.pixelIcons.fruit=S.foods[1].toDataURL();G.pixelIcons.poop=S.foods[0].toDataURL();
    });
  };
  const blit = (c, cx, cy) => g.drawImage(c, Math.round(cx - c.width / 2), Math.round(cy - c.height / 2));
  function line(x0, y0, x1, y1, col, w) {
    g.fillStyle = col; w = w || 1;
    const n = Math.max(1, Math.ceil(Math.max(Math.abs(x1 - x0), Math.abs(y1 - y0))));
    for (let i = 0; i <= n; i++) g.fillRect(Math.round(x0 + (x1 - x0) * i / n), Math.round(y0 + (y1 - y0) * i / n - (w >> 1)), 1, w);
  }
  function dotted(x0, y0, x1, y1, col, phase) {
    g.fillStyle = col;
    const n = Math.max(1, Math.ceil(Math.hypot(x1 - x0, y1 - y0)));
    for (let i = 0; i <= n; i++) if (((i + (phase | 0)) & 3) < 2) g.fillRect(Math.round(x0 + (x1 - x0) * i / n), Math.round(y0 + (y1 - y0) * i / n), 1, 1);
  }

  /* ---------- tela ---------- */
  function resize() {
    const oldRange=Math.max(1,playBot-playTop);
    const flyPosition=(fly.y-playTop)/oldRange,targetPosition=(fly.ty-playTop)/oldRange;
    const bodyStyle=window.getComputedStyle?window.getComputedStyle(document.body):null;
    const inset=prop=>bodyStyle?parseFloat(bodyStyle[prop])||0:0;
    const vw = window.innerWidth-inset('paddingLeft')-inset('paddingRight'), vh = window.innerHeight-inset('paddingTop')-inset('paddingBottom');
    const cw = Math.min(vw, vh * 0.56);
    SCALE = cw / W;
    H = Math.round(Math.min(BGH, Math.max(300, vh / SCALE)));
    const ch = Math.min(vh, H * SCALE);
    DPR = Math.min(2, window.devicePixelRatio || 1);
    stage.style.width = cw + 'px'; stage.style.height = ch + 'px';
    stage.style.setProperty('--s', (cw / 384).toFixed(4));
    cv.width = W; cv.height = H;
    uc.width = Math.round(cw * DPR); uc.height = Math.round(ch * DPR);
    g.imageSmoothingEnabled = false;
    playTop = 60; playBot = H - 42;
    fly.y=fly.py=playTop+flyPosition*(playBot-playTop);
    fly.ty=playTop+targetPosition*(playBot-playTop);
    ptr=null;
    dark.width = W; dark.height = H;
  }
  const yOf = m => playBot - (Math.max(G.LO, Math.min(G.HI, m)) - G.LO) / (G.HI - G.LO) * (playBot - playTop);
  const dark = document.createElement('canvas'), dk = dark.getContext('2d');

  function text(s, x, y, size, color, align, stroke, weight) {
    const k = SCALE * DPR;
    u.font = (weight || 400) + ' ' + Math.round(Math.max(8,size) * k) + 'px PixelFont, monospace';
    u.textAlign = align || 'left'; u.textBaseline = 'middle'; u.lineJoin = 'round';
    // A soft shadow gives contrast without a stroke closing C/c/e apertures.
    u.shadowColor = stroke === null ? 'transparent' : (stroke || '#2b1b3a');
    u.shadowBlur = k; u.shadowOffsetY = k * .4;
    u.fillStyle = color; u.fillText(s, x * k, y * k);
    u.shadowBlur = 0; u.shadowOffsetY = 0;
  }

  /* ---------- estado ---------- */
  let state = 'attract';       // attract | play | pause | ending
  let L = null, run = null, opts = null;
  let t = 0, beat = 0, lastNow = 0, frameN = 0, attractT = 0;
  let noteIdx = 0, pHead = 0, sceneI = 0, prevScene = null, sceneChangeBeat = -99;
  let parts = [], floats = [], trails = [], rings = [], trailClock = 0, shake = 0, flash = 0, flashCol = '255,80,110', banner = null, counts = [], endT = 0, startBeat = 0;
  const fly = { y: 200, ty: 200, py: 200, inv: 0, hurtT: 0, eat: 0, dashT: 0, pips: 3, pipT: 0, warn: 0, landed: 0, wob: 0 };
  const keys = {};
  let spiderX = 300, spiderY = 150, lungeT = 0, eyes = [];
  let settings = { sens: 1.25, haptic: true, motion: true, acc: '' };
  G.settings = settings;

  function part(x, y, col, n, spd, life, grav) {
    for (let i = 0; i < n; i++) {
      const a = Math.random() * 6.283, s = (0.3 + Math.random()) * (spd || 40);
      parts.push({ x, y, vx: Math.cos(a) * s, vy: Math.sin(a) * s, life: (life || 0.5) * (0.6 + Math.random() * 0.6), max: life || 0.5, c: col, g: grav || 0, s: Math.random() < 0.3 ? 2 : 1 });
    }
    if (parts.length > 260) parts.splice(0, parts.length - 260);
  }
  function float(s, x, y, col, size) { floats.push({ s, x, y, c: col || '#fff', life: 0.9, size: size || 8 }); if (floats.length > 14) floats.shift(); }

  /* ---------- controle ---------- */
  let ptr = null;
  function clampTy() { fly.ty = Math.max(playTop - 6, Math.min(playBot + 8, fly.ty)); }
  uc.addEventListener('pointerdown', e => {
    A.unlock();
    if (state !== 'play') return;
    e.preventDefault();
    if (ptr) { dash(); return; }
    ptr = { id: e.pointerId, y: e.clientY, t: performance.now(), moved: 0 };
    try { uc.setPointerCapture(e.pointerId); } catch (_) { }
  });
  uc.addEventListener('pointermove', e => {
    if (!ptr || e.pointerId !== ptr.id || state !== 'play') return;
    const dy = e.clientY - ptr.y; ptr.y = e.clientY; ptr.moved += Math.abs(dy);
    if (!fly.landed) { fly.ty += dy / SCALE * settings.sens; clampTy(); }
  });
  function pup(e) {
    if (!ptr || e.pointerId !== ptr.id) return;
    if (state === 'play' && performance.now() - ptr.t < 230 && ptr.moved < 9) dash();
    ptr = null;
  }
  uc.addEventListener('pointerup', pup); uc.addEventListener('pointercancel', () => {ptr=null;});
  document.getElementById('btnDash').addEventListener('pointerdown', e => {
    e.preventDefault(); e.stopPropagation(); A.unlock(); if(state==='play') dash();
  });
  document.getElementById('btnDash').addEventListener('click', e => {if(e.detail===0&&state==='play')dash();});
  window.addEventListener('blur',()=>{for(const k in keys)delete keys[k];if(state==='play')G.pause();});
  window.addEventListener('keydown', e => {
    keys[e.code] = true;
    if (state === 'play') {
      if ((e.code === 'Space' || e.code === 'KeyX') && !e.repeat) { dash(); e.preventDefault(); }
      if (e.code === 'Escape' || e.code === 'KeyP') G.pause();
      if (e.code.startsWith('Arrow')) e.preventDefault();
    }
  });
  window.addEventListener('keyup', e => { keys[e.code] = false; });
  document.addEventListener('visibilitychange', () => { if (document.hidden && state === 'play') G.pause(); });
  window.addEventListener('resize', resize);

  function dash() {
    if (!run || fly.landed || fly.pips < 1 || fly.dashT > 0) return;
    fly.pips -= 1; fly.dashT = 0.45; fly.inv = Math.max(fly.inv, 0.5);
    A.sfx.dash(); part(FX, fly.y, '#bfe9ff', 10, 60, 0.4);
    if (L.web.active) { L.web.d = Math.min(1, L.web.d + 0.06); shake = 3; }
    run.dashes++;
  }

  /* ---------- partida ---------- */
  G.startRun = function (o) {
    if(A.stopNotes) A.stopNotes();
    ptr=null; for(const key in keys)delete keys[key];
    opts = o;
    const D = G.DIFFS[o.diff];
    const tempo = o.tempo || D.tempo;
    L = G.buildLevel({ diff: D, seed: o.seed, tempo });
    const sc = o.practice != null ? G.SCENES[o.practice] : null;
    if(sc) {
      L.pollen=L.pollen.filter(p=>p.b>=sc.b0&&p.b<sc.b1);
      L.ribbons=L.ribbons.filter(r=>r.b0>=sc.b0&&r.b0<sc.b1);
      L.haz=L.haz.filter(h=>h.b>=sc.b0&&h.b<sc.b1);
      L.picks=L.picks.filter(k=>k.b>=sc.b0&&k.b<sc.b1);
      L.lunges=L.lunges.filter(l=>l.b>=sc.b0&&l.b<sc.b1);
    }
    startBeat = sc ? sc.b0 : 0;
    endT = sc ? L.T(sc.b1) + 1.0 : L.end;
    run = { D, score: 0, holdScore: 0, fruits:0, poop:0, combo: 0, maxCombo: 0, hits: 0, total: 0, foods: 0, foodSeen: 0, damage: 0, bites: 0, dodges: 0, dashes: 0, hearts: D.hearts || 0, landed: false, died: false, firefly: false, frogHits: 0, scenes: {}, webEscaped: false };
    for (const p of L.pollen) p.st = p.b < startBeat - 1e-6 ? 3 : 0;
    for (const r of L.ribbons) r.st = r.b0 < startBeat - 1e-6 ? 3 : 0;
    for (const h of L.haz) h.done = h.b < startBeat + 1.5;
    for (const k of L.picks) k.st = k.b < startBeat ? 3 : 0;
    for (const l of L.lunges) l.done = l.b < startBeat;
    pHead = 0; noteIdx = 0;
    while (noteIdx < M.notes.length && M.notes[noteIdx][0] < startBeat - 1e-6) noteIdx++;
    sceneI = sc ? sc.i : 0; prevScene = null; sceneChangeBeat = -99;
    parts = []; floats = []; trails = []; rings = []; trailClock=0; shake = 0; flash = 0; banner = null; lungeT=0;
    Object.assign(fly, { y: (playTop + playBot) / 2 + 20, ty: (playTop + playBot) / 2 + 20, inv: 0, hurtT: 0, eat: 0, dashT: 0, pips: 3, pipT: 0, warn: 0, landed: 0, wob: 0 });
    const first = L.pollen.find(p => p.st === 0 && p.lead);
    if (first) { fly.y = fly.ty = yOf(first.m) + 14; }
    L.web.d = 1; L.web.active = false;
    eyes = []; for (let i = 0; i < 7; i++) eyes.push({ x: 20 + Math.random() * (W - 40), y: playTop + Math.random() * (playBot - playTop), ph: Math.random() * 9 });
    spiderX = W + 60; spiderY = H / 2;
    A.unlock(); A.resume();
    A.bus.gain.cancelScheduledValues(A.now()); A.bus.gain.setValueAtTime(1, A.now());
    const t0s = L.T(startBeat), bt = L.T(startBeat + 1) - t0s, lead = 3 * bt + 1.0;
    A.t0 = A.now() + lead - t0s;
    counts = [3, 2, 1].map((n, i) => ({ n, t: t0s - (3 - i) * bt, done: false }));
    t = t0s - lead; beat = G.beatAt(t * L.tempo);
    state = 'play';
    enterScene(G.SCENES[sceneI], true);
    document.body.classList.add('playing');
  };
  G.pause = function () { if (state !== 'play') return; state = 'pause'; ptr = null; A.suspend(); G.onPause && G.onPause(); };
  G.resume = async function () { if (state !== 'pause') return; await A.resume(); state = 'play'; lastNow = performance.now(); };
  G.quit = function () { stopMusic(); A.resume(); state = 'attract'; run = null; L = null; document.body.classList.remove('playing'); };
  G.isPlaying = () => state === 'play';
  function stopMusic() { if (!A.ctx) return; const n = A.now(); A.bus.gain.cancelScheduledValues(n); A.bus.gain.setValueAtTime(A.bus.gain.value, n); A.bus.gain.linearRampToValueAtTime(0, n + 0.35); noteIdx = M.notes.length; }

  function enterScene(sc, first) {
    banner = { name: sc.name, sub: sc.sub, t: 0, bars: sc.bars };
    if (!run.scenes[sc.id]) run.scenes[sc.id] = { hit: 0, total: 0 };
    if (first) { if(sc.id==='f'){L.web.active=true;L.web.d=.85;} return; }
    if (sc.id === 'f') { L.web.active = true; L.web.d = 0.85; flash = 0.8; flashCol = '255,255,255'; shake = 8; A.sfx.strike(); float('Ai! Uma teia!', W / 2, fly.y - 26, '#ffd0e0', 10); vib(60); }
    if (sc.id === 'g' && L.web.active) { L.web.active = false; A.sfx.rip(); part(FX, fly.y, '#ffffff', 26, 90, 0.7); add(200, 'Livre!', '#ff9bb8'); flash = 0.6; flashCol = '255,255,255'; if (!run.bites) run.webEscaped = true; }
    if (sc.id === 'j') { flash = 0.5; flashCol = '255,250,220'; }
  }
  const vib = ms => { if (settings.haptic && navigator.vibrate) try { navigator.vibrate(ms); } catch (_) { } };
  const mult = () => (1 + Math.min(3, Math.floor(run.combo / 15)) * 0.5) * run.D.mult;
  function add(pts, label, col) { const v = Math.round(pts * run.D.mult); run.score += v; if (label) float(label + ' +' + v, FX + 30, fly.y - 18, col || '#ffe762'); }

  function damage(why) {
    if (fly.inv > 0 || fly.landed) return false;
    run.damage++; run.combo = 0;
    if (why === 'frog') run.frogHits++;
    fly.inv = 1.5; fly.hurtT = 0.7; shake = 7; flash = 0.55; flashCol = '255,60,100';
    A.sfx.hurt(); vib(90); part(FX, fly.y, '#ff5277', 14, 70, 0.5);
    float('Ai!', FX + 4, fly.y - 20, '#ff8fa8', 10);
    if (run.D.hearts) { run.hearts--; if (run.hearts <= 0) die(); }
    return true;
  }
  function die() { run.died = true; stopMusic(); A.sfx.sad(); state = 'ending'; endT = t + 1.6; }
  function dodged() { run.dodges++; add(15, 'Ufa!', '#bfe9ff'); }

  function finish() {
    state = 'attract'; document.body.classList.remove('playing');
    const acc = run.total ? run.hits / run.total : 0;
    const bar = Math.max(1, Math.min(104, G.barIndex(Math.max(0, beat)) + 1));
    if (!run.died && run.D.hearts) run.score += run.hearts * Math.round(100 * run.D.mult);
    const foodR = run.foodSeen ? Math.min(1, run.foods / (run.foodSeen * 0.5)) : 0;
    let grade = 0.72 * acc + 0.18 * foodR + 0.10 * Math.max(0, 1 - run.damage / 6);
    if (run.died) grade *= bar / 104;
    const rank = grade >= 0.9 ? 'S' : grade >= 0.78 ? 'A' : grade >= 0.62 ? 'B' : grade >= 0.45 ? 'C' : 'D';
    const res = { name: opts.name, diff: opts.diff, practice: opts.practice, tempo: L.tempo, score: run.score, fruits:run.fruits, poop:run.poop, acc, hits: run.hits, total: run.total, maxCombo: run.maxCombo, foods: run.foods, foodSeen: run.foodSeen, damage: run.damage, bites: run.bites, dodges: run.dodges, landed: run.landed, died: run.died, bar, rank, scenes: run.scenes, firefly: run.firefly, frogHits: run.frogHits, webEscaped: run.webEscaped, date: Date.now() };
    const cb = G.onEnd; run = null; L = null;
    cb && cb(res);
  }

  /* ---------- atualização ---------- */
  function schedule(sNow) {
    const horizon = sNow + 0.3;
    while (noteIdx < M.notes.length) {
      const n = M.notes[noteIdx], tn = L.T(n[0]);
      if (tn > horizon) break;
      noteIdx++;
      if (tn < sNow - 0.05) continue;
      if (opts.practice != null && n[0] >= G.SCENES[opts.practice].b1) { noteIdx = M.notes.length; break; }
      const pizz = n[0] >= L.land.b - 1e-6;
      const vel = G.velAt(n[0]) * (n[4] ? 1.3 : 1) * (pizz ? 2.0 : 1) * 0.17;
      const dur = Math.max(0.06, (L.T(n[0] + n[1]) - tn) * (n[1] <= 0.5 ? 0.92 : 0.98));
      A.note(A.t0 + tn, n[2], pizz ? 0.3 : dur, vel, [-0.45, 0.45, -0.25, 0.25, -0.1, 0.1][n[3]], 'ep', pizz);
    }
  }

  function update(dt) {
    const sNow = A.now() - A.t0;
    t = sNow - A.latency(); beat = G.beatAt(t * L.tempo);
    if (state === 'ending') { fly.ty += 60 * dt; fly.y += (fly.ty - fly.y) * Math.min(1, dt * 6); stepFx(dt); if (t >= endT) finish(); return; }
    schedule(sNow);
    for (const c of counts) if (!c.done && sNow >= c.t) { c.done = true; A.sfx.tick(c.n === 1); c.show = 0.4; }
    // cena
    while (opts.practice == null && sceneI < G.SCENES.length - 1 && beat >= G.SCENES[sceneI].b1) { prevScene = G.SCENES[sceneI]; sceneI++; sceneChangeBeat = G.SCENES[sceneI].b0; enterScene(G.SCENES[sceneI]); }
    const sc = G.SCENES[sceneI], D = run.D;
    // mosca
    const kv = (keys.ArrowDown || keys.KeyS ? 1 : 0) - (keys.ArrowUp || keys.KeyW ? 1 : 0);
    if(G._autoOn) {
      const next=L.pollen.find(p=>p.lead&&p.st===0&&p.t>t-.02);
      if(next&&!fly.landed)fly.ty=yOf(next.m);
      if(beat>G.barBeat(103))fly.ty=landY();
    }
    if (kv && !fly.landed) { fly.ty += kv * 230 * dt; clampTy(); }
    if (sc.id === 'g' && D.hearts && !fly.landed) { fly.ty += 9 * dt; clampTy(); fly.wob = quietMotion()?0:Math.sin(t * 11) * 2.5; } else fly.wob *= Math.exp(-6*dt);
    fly.py = fly.y;
    fly.y += (fly.ty - fly.y) * (1 - Math.exp(-34 * dt));
    fly.inv = Math.max(0, fly.inv - dt); fly.hurtT = Math.max(0, fly.hurtT - dt); fly.eat = Math.max(0, fly.eat - dt); fly.dashT = Math.max(0, fly.dashT - dt); fly.warn = Math.max(0, fly.warn - dt);
    if (fly.pips < 3) { fly.pipT += dt; const need = D.hearts ? 3.2 : 1.6; if (fly.pipT >= need) { fly.pipT = 0; fly.pips++; } }
    const fy = fly.y + fly.wob;
    const tol = D.tol * (sc.id === 'f' ? 1.3 : 1);
    // pólen (as notas)
    for (let i = pHead; i < L.pollen.length; i++) {
      const p = L.pollen[i];
      if (p.t > t + WIN) break;
      if (p.st) { if (i === pHead) pHead++; continue; }
      const d = Math.abs(fy - yOf(p.m));
      if (d <= tol && !fly.landed) {
        p.st = 1;
        if (p.lead) {
          if(p.kind===0)run.poop++;else run.fruits++;
          fly.eat=.22;
          rings.push({x:FX+2,y:yOf(p.m),life:.24,max:.24,c:p.kind===0?'#dec8ff':'#ffbdd5'});
          if(rings.length>12)rings.shift();
          run.hits++; run.total++; run.combo++; run.maxCombo = Math.max(run.maxCombo, run.combo);
          run.scenes[p.sc] && (run.scenes[p.sc].hit++, run.scenes[p.sc].total++);
          run.score += Math.round(10 * mult());
          A.sfx.sparkle(p.m); part(FX + 4, yOf(p.m), '#ffe762', 4, 35, 0.35);
          if (L.web.active) L.web.d = Math.min(1, L.web.d + 0.032);
          if (run.combo && run.combo % 25 === 0) float('Combo ' + run.combo + '!', FX + 34, fy - 22, '#ff9bb8', 9);
        } else { run.score += Math.round(4 * D.mult); part(FX + 4, yOf(p.m), '#bfe9ff', 2, 25, 0.3); }
      } else if (t > p.t + WIN) {
        p.st = 2;
        if (p.lead) { run.total++; run.combo = 0; run.scenes[p.sc] && run.scenes[p.sc].total++; if (L.web.active) L.web.d -= 0.03 * D.haz; }
      }
    }
    // comidas e gotas (notas longas): ficar em cima para limpar
    for (const r of L.ribbons) {
      if (r.st || r.t0 > t) { if (r.t0 > t + 0.2) break; continue; }
      if (t <= r.t1) {
        if (Math.abs(fy - yOf(r.m)) <= tol + 3 && !fly.landed) {
          r.prog += dt; r.on = true; fly.eat = 0.12;
          run.holdScore += 40 * dt * mult();const pts=Math.floor(run.holdScore);run.score+=pts;run.holdScore-=pts;
          if (Math.floor(visualTime*15)!==Math.floor((visualTime-dt)*15)) part(FX + 6, yOf(r.m), r.kind < 0 ? '#dec8ff' : '#ffbdd5', 1, 30, 0.35);
        } else r.on = false;
      } else {
        run.foodSeen++;
        if (r.prog / (r.t1 - r.t0) >= 0.6) {
          r.st = 1; run.foods++; if(r.kind===0)run.poop++;else if(r.kind>0)run.fruits++; run.score += Math.round(30 * D.mult);
          if (r.kind >= 0) { A.sfx.clean(); float(r.kind===0?'Nhac!':'Delícia!', FX + 26, yOf(r.m) - 12, '#ff9bb8'); part(FX, yOf(r.m), '#ff9bb8', 8, 50, 0.5); }
        } else r.st = 2;
      }
    }
    // itens
    for (const k of L.picks) {
      if (k.st || k.t > t + WIN) continue;
      if (Math.abs(fy - yOf(k.m)) <= tol + 5 && t >= k.t - WIN) {
        k.st = 1;
        if (k.type === 'heart') { if (run.hearts < D.hearts) { run.hearts++; float('+1 ♥', FX + 20, fy - 16, '#ff8fa8', 10); } else add(60, 'Mel!', '#ffd84a'); A.sfx.heart(); part(FX, fy, '#ff5277', 12, 60, 0.6); }
        else { run.firefly = true; add(250, 'Vaga-lume!', '#fff7a0'); A.sfx.heart(); part(FX, fy, '#fff7a0', 20, 80, 0.8); }
      } else if (t > k.t + WIN) k.st = 2;
    }
    hazards(dt, fy, sc);
    // teia (Agitato): a aranha se aproxima se as notas escapam
    const web = L.web;
    if (web.active) {
      web.d = Math.max(0, Math.min(1, web.d - dt * 0.06 * D.haz));
      for (const l of L.lunges) if (!l.done && t >= l.t) {
        l.done = true; lungeT = 0.35; shake = Math.max(shake, 4); A.sfx.strike();
        if (web.d < 0.42) { if (damage('spider')) { run.bites++; } web.d = 0.9; }
        else { add(25, 'Errou!', '#e0c8ff'); }
      }
      const tx = FX + 44 + web.d * (W - FX - 80);
      spiderX += (tx - spiderX) * Math.min(1, dt * 5); spiderY += (fy - spiderY) * Math.min(1, dt * 2.5);
      if (web.d < 0.5) fly.warn = 0.2;
    } else { spiderX += (W + 70 - spiderX) * Math.min(1, dt * 3); }
    lungeT = Math.max(0, lungeT - dt);
    // pouso final
    if (!fly.landed && t >= L.land.t && opts.practice == null) {
      const ly = landY();
      fly.landed = 0.0001;
      if (Math.abs(fy - ly) < 18) { run.landed = true; add(300, 'Pouso perfeito!', '#ffe762'); A.sfx.fanfare(); part(FX, ly, '#ffe762', 24, 70, 0.9); }
      else float('Ufa, cheguei…', FX + 40, ly - 24, '#fff');
      fly.ty = ly;
    }
    if (fly.landed) { fly.landed += dt; fly.y += (landY() - fly.y) * Math.min(1, dt * 5); if ((frameN % 40) === 0 && fly.landed > 1) parts.push({ x: FX + 12, y: fly.y - 14, vx: 6, vy: -14, life: 1.2, max: 1.2, c: '#ff9bb8', g: 0, s: 2 }); }
    stepFx(dt);
    if (banner) { banner.t += dt; if (banner.t > 3) banner = null; }
    if (t >= endT) finish();
  }
  const landY = () => H - 65;

  function stepFx(dt) {
    trailClock+=dt;
    if(fly.dashT>0&&trailClock>=1/30&&!quietMotion()) {trails.push({y:fly.y,x:FX,life:.18});trailClock=0;}
    for(let i=trails.length-1;i>=0;i--){trails[i].life-=dt;trails[i].x-=70*dt;if(trails[i].life<=0)trails.splice(i,1);}
    for(let i=rings.length-1;i>=0;i--){rings[i].life-=dt;if(rings[i].life<=0)rings.splice(i,1);}
    for (let i = parts.length - 1; i >= 0; i--) { const p = parts[i]; p.life -= dt; if (p.life <= 0) { parts.splice(i, 1); continue; } p.vy += p.g * dt; p.x += p.vx * dt; p.y += p.vy * dt; }
    for (let i = floats.length - 1; i >= 0; i--) { const f = floats[i]; f.life -= dt; f.y -= 16 * dt; if (f.life <= 0) floats.splice(i, 1); }
    shake = Math.max(0, shake - dt * 22); flash = Math.max(0, flash - dt * 1.9);
    for (const c of counts) if (c.show > 0) c.show -= dt;
  }

  function hazards(dt, fy, sc) {
    for (const h of L.haz) {
      if (h.done) continue;
      const tw = h.tw != null ? h.tw : -1e9;
      if (h.type === 'paper' || h.type === 'wall') {
        const x = FX + (h.b - beat) * PXB;
        if (x > W + 20) break;
        if (x < -20) { h.done = true; continue; }
        if (!h.hit && Math.abs(x - FX) < 8) {
          let bad;
          if (h.type === 'paper') { const e = yOf(h.edge); bad = h.fromTop ? fy < e + 3 : fy > e - 3; }
          else bad = Math.abs(fy - yOf(h.gm)) > h.gh - 6;
          if (bad && fly.inv <= 0) { h.hit = true; damage(h.type); }
        }
        if (!h.hit && !h.passed && x < FX - 9) { h.passed = true; if (h.type === 'wall') { run.dodges++; add(20, 'Passou!', '#e0c8ff'); } }
        continue;
      }
      if (t < tw) continue;
      if (!h.started) { h.started = true; h.aim = fy; A.sfx.warn(); }
      if (h.type === 'tongue' || h.type === 'swat' || h.type === 'drop') { if (t < h.tl) h.aim += (fy - h.aim) * Math.min(1, dt * 9); else if (!h.locked) { h.locked = true; A.sfx.warn(); } }
      if (h.type === 'flick') h.aim = yOf(h.m);
      if (t < h.t) { if (Math.abs(fy - h.aim) < 30) fly.warn = 0.15; continue; }
      if (!h.struck) {
        h.struck = true; h.st = t; A.sfx.strike();
        const reach = h.type === 'swat' ? h.half : h.type === 'drop' ? 13 : h.type === 'silk' ? 11 : 12;
        if (Math.abs(fy - h.aim) < reach) { if (!damage(h.type === 'tongue' || h.type === 'flick' ? 'frog' : h.type)) { if (fly.inv > 0 && h.type !== 'flick') dodged(); } else if (h.type === 'swat') shake = 10; }
        else if (h.type !== 'flick') dodged();
      }
      if (t > h.t + 1.2) h.done = true;
    }
  }

  /* ---------- desenho ---------- */
  function drawBg(sc, b) {
    const key=sc.id==='c'||sc.id==='j'||sc.id==='k'?'pond':sc.tension>1?'night':'garden';
    const im=imgs['pixel_'+key];
    if(!im){g.fillStyle='#65408e';g.fillRect(0,0,W,H);return;}
    const p=Math.max(0,Math.min(1,(b-sc.b0)/(sc.b1-sc.b0)));
    const cw=Math.min(im.width,im.height*W/H)/1.06,ch=cw*H/W;
    const sx=Math.round((im.width-cw)*(.2+.6*p)),sy=Math.round((im.height-ch)*(sc.id==='g'?p:.45));
    g.drawImage(im,sx,sy,cw,ch,0,0,W,H);
    const tint={b:'rgba(255,155,184,.08)',d:'rgba(130,65,170,.16)',e:'rgba(90,40,125,.12)',f:'rgba(255,82,119,.09)',g:'rgba(205,183,246,.07)',i:'rgba(80,45,120,.12)',j:'rgba(255,155,184,.09)'}[sc.id];
    if(tint){g.fillStyle=tint;g.fillRect(0,0,W,H);}
    if(sc.id==='d') {line(W-24,0,W-24,44,'#ff9bb8',1);g.fillStyle='#cdb7f6';g.fillRect(W-29,42,11,25);g.fillStyle='#ff9bb8';g.fillRect(W-27,44,7,20);}
    if(sc.id==='k')C.prop(g,'leaf',FX-26,landY()+9,48,24);
  }

  function render(dt) {
    frameN++;
    if(state!=='pause')visualTime+=dt;
    const k = SCALE * DPR;
    u.clearRect(0, 0, uc.width, uc.height);
    g.setTransform(1, 0, 0, 1, 0, 0);
    if (state === 'attract' || !L) { renderAttract(dt); return; }
    const sc = G.SCENES[sceneI];
    const sx = shake > 0 && !quietMotion() ? Math.round((Math.random() - 0.5) * shake) : 0, sy = shake > 0 && !quietMotion() ? Math.round((Math.random() - 0.5) * shake) : 0;
    g.translate(sx, sy);
    drawBg(sc, beat);
    if (prevScene && beat - sceneChangeBeat < 1.5) { g.globalAlpha = 1 - (beat - sceneChangeBeat) / 1.5; drawBg(prevScene, prevScene.b1); g.globalAlpha = 1; }
    g.fillStyle = 'rgba(20,10,40,' + [0.16, 0.2, 0.3, 0.3][sc.tension] + ')'; g.fillRect(-8, -8, W + 16, H + 16);
    ambience(quietMotion()?0:visualTime,sc.tension>1);
    const fy = fly.y + fly.wob;
    drawActors(sc, fy);
    drawHazards(fy);
    drawNotes(fy);
    for(const trail of trails) C.fly(g,trail.x,trail.y,'dash',visualTime,trail.life/.18*.24);
    if(!quietMotion())for(const ring of rings){const radius=Math.round(4+(1-ring.life/ring.max)*12);g.globalAlpha=ring.life/ring.max;g.fillStyle=ring.c;for(let i=0;i<8;i++){const a=i*Math.PI/4;g.fillRect(Math.round(ring.x+Math.cos(a)*radius),Math.round(ring.y+Math.sin(a)*radius),2,2);}}
    g.globalAlpha=1;
    drawFly(fy);
    for (const p of parts) { g.globalAlpha = Math.min(1, p.life / p.max * 1.6); g.fillStyle = p.c; g.fillRect(Math.round(p.x), Math.round(p.y), p.s, p.s); }
    g.globalAlpha = 1;
    // escuridão
    const hScene = G.SCENES[7];
    const da = Math.max(0, Math.min(1, (beat - hScene.b0) / 1.5, (hScene.b1 - beat) / 1.5));
    if (da > 0) {
      const R = run.D.hearts ? (run.D.haz > 1 ? 50 : 62) : 78;
      dk.globalCompositeOperation = 'source-over'; dk.clearRect(0, 0, W, H); dk.fillStyle = 'rgba(8,4,22,0.9)'; dk.fillRect(0, 0, W, H);
      dk.globalCompositeOperation = 'destination-out';
      [[R, 0.35], [R - 10, 0.5], [R - 22, 1]].forEach(([r, a]) => { dk.fillStyle = 'rgba(0,0,0,' + a + ')'; dk.beginPath(); dk.arc(FX + 26, Math.round(fy), r, 0, 6.3); dk.fill(); });
      g.globalAlpha = da; g.drawImage(dark, 0, 0); g.globalAlpha = 1;
      for (const e of eyes) if (Math.sin(t * 2 + e.ph) > 0.2 && Math.hypot(e.x - FX - 26, e.y - fy) > R) { g.globalAlpha = da; g.fillStyle = '#ff3860'; g.fillRect(e.x | 0, e.y | 0, 2, 2); g.fillRect((e.x | 0) + 5, e.y | 0, 2, 2); g.globalAlpha = 1; }
    }
    if (sc.id === 'f') { g.fillStyle = 'rgba(255,40,110,' + (0.08 + 0.07 * Math.sin(beat * Math.PI * 2)) + ')'; g.fillRect(-8, -8, W + 16, H + 16); }
    if (flash > 0 && !quietMotion()) { g.fillStyle = 'rgba(' + flashCol + ',' + (flash * 0.32) + ')'; g.fillRect(-8, -8, W + 16, H + 16); }
    g.setTransform(1, 0, 0, 1, 0, 0);
    drawHud(sc);
  }

  function attackPose(types) {
    for(const h of L.haz) if(types.includes(h.type)&&!h.done&&h.started) {
      if(t<h.t)return 'warn';
      if(t<h.t+.32)return 'strike';
      if(t<h.t+.7)return 'recover';
    }
    return 'idle';
  }
  function drawActors(sc, fy) {
    // sapo (cena C)
    const frogScene = G.SCENES[2];
    if (beat > frogScene.b0 - 0.5 && beat < frogScene.b1 + 1.5) {
      const inn = Math.min(1, (beat - frogScene.b0 + 0.5) / 1.2), out = Math.max(0, (beat - frogScene.b1) / 1.5);
      const fx = W - 65 + (1 - inn) * 80 + out * 90, fyy = H - 94;
      frogMouth.x = fx + 13; frogMouth.y = fyy + 32;
      C.enemy(g,'frog',attackPose(['tongue','flick']),visualTime,fx,fyy,64,64);
    }
    // sombra (cena E)
    const E = G.SCENES[4];
    if (beat > E.b0 && beat < E.b1 + 1) {
      const a = Math.min(1, (beat - E.b0) / (E.b1 - E.b0) + 0.25) * Math.max(0, Math.min(1, E.b1 + 1 - beat));
      shadowPos.x = W - 30; shadowPos.y = H * 0.36 + Math.sin(t * 1.7) * 14;
      line(shadowPos.x,0,shadowPos.x,shadowPos.y-20,'#ab86c366',1);
      C.enemy(g,'spider',attackPose(['silk']),visualTime,shadowPos.x-28,shadowPos.y-28,56,56,a*.8);
    }
    // aranha listrada (cena F) e teia que prende
    if (L.web.active || spiderX < W + 40) {
      const lx = lungeT > 0 ? Math.sin(lungeT / 0.35 * Math.PI) * -22 : 0;
      const bx = spiderX + lx, by = spiderY + Math.sin(t * 9) * 2;
      const next=L.lunges.find(l=>!l.done&&l.t-t<.6);
      C.enemy(g,'spider',lungeT>0?'strike':next||L.web.d<.5?'warn':'idle',visualTime,bx-28,by-40,80,80);
    }
    if (L.web.active) {
      const n = 5 + Math.round((1 - L.web.d) * 9);
      for (let i = 0; i < n; i++) {
        const a = i * 2.39996 + 0.4, r = 150, jig = Math.sin(t * 40 + i) * (1.5 + (1 - L.web.d) * 2);
        line(FX, fy, FX + Math.cos(a) * r + jig, fy + Math.sin(a) * r, i % 3 ? 'rgba(235,225,255,0.75)' : '#ffffff', 1);
      }
      for (let r = 14; r <= 40; r += 13) for (let i = 0; i < 12; i++) { const a0 = i * 0.5236, a1 = a0 + 0.5236; dotted(FX + Math.cos(a0) * r, fy + Math.sin(a0) * r, FX + Math.cos(a1) * r, fy + Math.sin(a1) * r, 'rgba(235,225,255,0.7)', frameN >> 2); }
    }
    // aranha no labirinto (cena I)
    const I = G.SCENES[8];
    if (beat > I.b0 && beat < I.b1 + 1) {
      const a = Math.max(0, Math.min(1, beat - I.b0, I.b1 + 1 - beat));
      const yy = 44 + Math.sin(t * 1.3) * 16 + (1 - a) * -70;
      line(W - 26, 0, W - 26, yy - 14, 'rgba(240,235,255,0.8)', 1);
      C.enemy(g,'spider',attackPose(['silk','drop']),visualTime,W-54,yy-28,56,56,a);
      shadowPos.x = W - 26; shadowPos.y = yy;
    }
  }
  const frogMouth = { x: 150, y: 300 }, shadowPos = { x: 160, y: 120 };

  function drawHazards(fy) {
    for (const h of L.haz) {
      if (h.type === 'paper') {
        const x = Math.round(FX + (h.b - beat) * PXB); if (x < -12 || x > W + 12) continue;
        const e = Math.round(yOf(h.edge)), y0 = h.fromTop ? 0 : e, y1 = h.fromTop ? e : H;
        g.globalAlpha=h.hit?.65:1;C.prop(g,'paper',x-7,y0,14,y1-y0,!h.fromTop);g.globalAlpha=1;
        continue;
      }
      if (h.type === 'wall') {
        const x = Math.round(FX + (h.b - beat) * PXB); if (x < -12 || x > W + 12) continue;
        const gy = Math.round(yOf(h.gm)), a = gy - h.gh, b = gy + h.gh;
        const col = h.hit ? 'rgba(255,150,170,0.9)' : 'rgba(240,235,255,0.92)';
        for (const [y0, y1] of [[0, a], [b, H]]) {
          g.fillStyle = 'rgba(190,170,240,0.28)'; g.fillRect(x - 6, y0, 12, y1 - y0);
          line(x - 5, y0, x - 5, y1, col, 1); line(x + 5, y0, x + 5, y1, col, 1); line(x, y0, x, y1, 'rgba(240,235,255,0.5)', 1);
          for (let y = y0 + ((y0 === 0) ? (a % 9) : 0); y < y1; y += 9) { line(x - 5, y, x + 5, y + 4, col, 1); }
        }
        g.fillStyle = '#fff'; g.fillRect(x - 6, a - 1, 12, 2); g.fillRect(x - 6, b - 1, 12, 2);
        if (!h.passed && (frameN & 8)) { g.fillStyle = '#ffe762'; g.fillRect(x - 1, gy - 1, 2, 2); }
        continue;
      }
      if (h.done || !h.started) continue;
      const pre = t < h.t, since = t - h.t;
      if (h.type === 'tongue' || h.type === 'flick') {
        const mx = frogMouth.x, my = frogMouth.y, ty = h.aim;
        if (pre) dotted(mx, my, FX + 6, ty, h.locked || h.type === 'flick' ? '#ff5277' : '#ffe762', frameN >> 1);
        else if (since < 0.32) {
          const k = since < 0.07 ? since / 0.07 : 1 - (since - 0.07) / 0.25;
          const ex = mx + (FX + 4 - mx) * k, ey = my + (ty - my) * k;
          line(mx, my, ex, ey, '#c2385c', 5); line(mx, my, ex, ey, '#ff8fb0', 3);
          g.fillStyle = '#c2385c'; g.fillRect(Math.round(ex) - 4, Math.round(ey) - 4, 8, 8); g.fillStyle = '#ff8fb0'; g.fillRect(Math.round(ex) - 3, Math.round(ey) - 3, 6, 6);
        }
      } else if (h.type === 'swat') {
        const y = Math.round(h.aim), hh = h.half;
        let px = W - 20;
        if (pre) {
          g.fillStyle = 'rgba(255,70,110,' + (h.locked ? 0.3 : 0.14 + 0.06 * Math.sin(t * 20)) + ')'; g.fillRect(0, y - hh, W, hh * 2);
          dotted(0, y - hh, W, y - hh, '#ff8fa8', frameN >> 1); dotted(0, y + hh, W, y + hh, '#ff8fa8', frameN >> 1);
          px = W - 20 + Math.sin(t * 16) * (h.locked ? 3 : 1);
        } else if (since < 0.5) px = since < 0.06 ? W - 20 + (FX - (W - 20)) * (since / 0.06) : since < 0.28 ? FX : FX + (W + 40 - FX) * ((since - 0.28) / 0.22);
        else continue;
        C.prop(g,'swatter',px-hh,y-hh,hh*4.5,hh*2);
      } else if (h.type === 'silk') {
        const k = pre ? (t - h.tw) / (h.t - h.tw) : 1 + since * 2.2;
        const x = shadowPos.x - 10 + (FX - shadowPos.x + 10) * k, y0 = shadowPos.y + (h.aim - shadowPos.y) * Math.min(1, k * 2.5);
        if (x < -10) continue;
        if (pre) { dotted(shadowPos.x - 10, shadowPos.y, x, y0, 'rgba(240,235,255,0.8)', frameN); dotted(x, y0, 0, h.aim, 'rgba(255,82,119,0.5)', frameN >> 1); }
        g.fillStyle = '#6d5a9a'; g.fillRect(Math.round(x) - 4, Math.round(y0) - 4, 8, 8); g.fillStyle = '#f4efff'; g.fillRect(Math.round(x) - 3, Math.round(y0) - 3, 6, 6); g.fillStyle = '#cdb7f6'; g.fillRect(Math.round(x) - 1, Math.round(y0) - 1, 3, 3);
      } else if (h.type === 'drop') {
        let y;
        if (pre) { const k = Math.pow((t - h.tw) / (h.t - h.tw), 3); y = -12 + (h.aim + 12) * k; dotted(FX + 2, 0, FX + 2, h.aim, h.locked ? 'rgba(255,82,119,0.7)' : 'rgba(240,235,255,0.5)', frameN >> 1); }
        else y = since < 0.35 ? h.aim : h.aim - (since - 0.35) * 260;
        if (y < -14) continue;
        line(FX + 2, 0, FX + 2, y - 6, 'rgba(240,235,255,0.85)', 1);
        C.enemy(g,'baby',pre?'warn':since<.35?'strike':'idle',visualTime,FX-14,y-16,32,32);
      }
    }
  }

  function drawNotes(fy) {
    const bMin = beat - FX / PXB - 0.5, bMax = beat + (W - FX) / PXB + 0.6;
    // notas longas: comida/gota + rastro
    for (const r of L.ribbons) {
      if (r.b1 < bMin) continue; if (r.b0 > bMax) break;
      if (r.st === 3) continue;
      const y = Math.round(yOf(r.m)), x0 = FX + (r.b0 - beat) * PXB, x1 = FX + (r.b1 - beat) * PXB;
      const active = beat >= r.b0 && beat <= r.b1 && r.on;
      const col = r.kind < 0 ? '#dec8ff' : '#ffbdd5';
      const left=Math.round(Math.max(x0+7,active?FX+8:0)),right=Math.round(Math.min(x1-2,W));
      if(right>left&&r.st!==1){g.fillStyle=active?'#eaa0d9aa':'#3d204e99';g.fillRect(left,y-2,right-left,5);g.fillStyle=active?'#fff0f6':col;g.fillRect(left,y,right-left,1);}
      for (let x = Math.max(x0 + 8, active ? FX + 8 : -10); x < x1 - 2; x += 6) {
        if (x > W + 4) break;
        if (x < FX - 4 && r.st !== 2 && !(beat <= r.b1 && !r.on)) continue;
        g.fillStyle = (x < FX - 4) ? '#8d86a0' : col; g.fillRect(Math.round(x), y-1, 1, 3);
      }
      if (r.st === 1) continue;
      const hx = active ? FX + 9 : x0;
      if (hx > -10 && hx < W + 10 && !(beat > r.b1)) {
        const c = r.kind < 0 ? S.dew : S.foods[r.kind];
        const size=r.kind<0?12:18;
        g.drawImage(c,Math.round(hx-size/2),Math.round(y-size/2+(active?Math.sin(t*40):0)),size,size);
        if (r.acc && !active && (frameN & 16)) { g.fillStyle = '#fff'; g.fillRect(Math.round(hx) + 5, y - 8, 1, 3); g.fillRect(Math.round(hx) + 4, y - 7, 3, 1); }
      } else if (beat > r.b1 && r.st === 2 && x0 > -10) { g.globalAlpha = 0.45; blit(r.kind < 0 ? S.dew : S.foods[r.kind], x0, y); g.globalAlpha = 1; }
    }
    // iscas do sapo
    for (const h of L.haz) if (h.type === 'flick' && !h.struck) { const x = FX + (h.b - beat) * PXB; if (x > -6 && x < W + 6) blit(S.bait, x, yOf(h.m)); }
    // linha da melodia + pólen
    let prev = null;
    for (let i = Math.max(0, pHead - 12); i < L.pollen.length; i++) {
      const p = L.pollen[i];
      if (p.b < bMin) continue; if (p.b > bMax) break;
      if (p.st === 3) continue;
      const x = FX + (p.b - beat) * PXB, y = yOf(p.m);
      if (p.lead) {
        if (prev && p.b - prev.b <= 0.51 && p.st === 0) dotted(prev.x, prev.y, x, y, 'rgba(255,255,255,0.55)', 0);
        prev = { b: p.b, x, y };
      }
      if (p.st === 1) continue;
      if (p.st === 2) { g.globalAlpha = 0.6; blit(S.miss, x, y); g.globalAlpha = 1; continue; }
      if(p.lead) { const food=S.foods[p.kind];g.drawImage(food,Math.round(x-6),Math.round(y-6),12,12); }
      else g.drawImage(S.harm,Math.round(x-3.5),Math.round(y-3.5),7,7);
    }
    for (const k of L.picks) {
      if (k.st) continue; const x = FX + (k.b - beat) * PXB; if (x < -10 || x > W + 10) continue;
      const y = yOf(k.m) + Math.sin(t * 5) * 2;
      if (k.type === 'heart') blit(S.heart, x, y);
      else { g.fillStyle = 'rgba(255,247,160,' + (0.25 + 0.15 * Math.sin(t * 9)) + ')'; g.fillRect(Math.round(x) - 6, Math.round(y) - 6, 12, 12); g.fillStyle = '#2b1b3a'; g.fillRect(Math.round(x) - 3, Math.round(y) - 3, 6, 6); g.fillStyle = '#fff7a0'; g.fillRect(Math.round(x) - 2, Math.round(y) - 2, 4, 4); g.fillStyle = '#fff'; g.fillRect(Math.round(x) - 1, Math.round(y) - 1, 2, 2); }
    }
    // pouso: seta na folha
    if (opts.practice == null && beat > G.barBeat(100) && !fly.landed) {
      const ly = landY(), bob = Math.round(Math.sin(t * 6) * 2);
      g.fillStyle = '#2b1b3a'; g.fillRect(FX - 5, ly - 22 + bob, 10, 8); g.fillRect(FX - 3, ly - 14 + bob, 6, 3); g.fillRect(FX - 1, ly - 11 + bob, 2, 2);
      g.fillStyle = '#ffe762'; g.fillRect(FX - 4, ly - 21 + bob, 8, 6); g.fillRect(FX - 2, ly - 15 + bob, 4, 3);
    }
  }

  function flyFace() {
    if (!run) return 'idle';
    if (fly.landed) return fly.landed > 1.1 ? 'sleep' : 'wink';
    if (run.died || fly.hurtT > 0) return 'hurt';
    if (fly.dashT > 0) return 'dash';
    if (L.web.active || fly.warn > 0) return 'scared';
    if (fly.eat > 0) return 'eat';
    const id = G.SCENES[sceneI].id;
    if (t < L.T(startBeat) - 0.4 && opts.practice == null) return 'sleep';
    if (id === 'e' || id === 'h') return 'scared';
    if (id === 'g' && run.D.hearts) return 'hurt';
    return visualTime%5<.15?'wink':'idle';
  }
  function drawFlyAt(x, y, face) {
    C.fly(g,x,y,face,visualTime);
    const ac = S.acc[settings.acc];
    if (ac && settings.acc!=='laco' && face !== 'hurt') g.drawImage(ac.c, Math.round(x + ac.dx - 3), Math.round(y - 14 + ac.dy));
    if(settings.acc==='laco')blit(S.heart,x-22,y-2);
  }
  function drawFly(fy) {
    g.save();
    if (fly.inv > 0 && fly.dashT <= 0)g.globalAlpha=quietMotion()?.7:Math.floor(visualTime*12)%2?.45:1;
    const face = flyFace();
    drawFlyAt(FX, Math.round(fy) + (face === 'sleep' ? 2 : 0), face);
    g.restore();
  }
  G.drawFlyPreview = drawFlyAt;

  function drawHud(sc) {
    const dashButton=document.getElementById('btnDash');
    const recharging=fly.pips<1;
    if(dashButton.disabled!==(state!=='play'||recharging))dashButton.disabled=state!=='play'||recharging;
    const dashLabel=recharging?'RECARGA':'ZUNIR';
    if(dashButton.textContent!==dashLabel)dashButton.textContent=dashLabel;
    // barra de progresso com as cenas
    const total = M.total, pw = W;
    g.fillStyle = '#2b1b3a'; g.fillRect(0, 0, pw, 4);
    const cols = ['#ff9bb8', '#ffe762', '#ff9bb8', '#ff5277'];
    for (const s of G.SCENES) { g.fillStyle = cols[s.tension]; g.globalAlpha = beat >= s.b0 ? 1 : 0.35; const x0 = Math.round(s.b0 / total * pw), x1 = Math.round(Math.min(s.b1, Math.max(s.b0, beat)) / total * pw); g.fillRect(x0, 1, (beat >= s.b0 ? x1 - x0 : Math.round(s.b1 / total * pw) - x0) - 1, 2); }
    g.globalAlpha = 1;
    g.fillStyle = '#fff'; g.fillRect(Math.round(Math.max(0, beat) / total * pw) - 1, 0, 2, 4);
    g.fillStyle='rgba(43,27,58,.72)';g.fillRect(0,5,W,30);
    // corações e zunidos
    if (run.D.hearts) for (let i = 0; i < run.D.hearts; i++) g.drawImage(i < run.hearts ? S.heart : S.heartOff, 5 + i * 11, 9);
    for (let i = 0; i < 3; i++) g.drawImage(i < fly.pips ? S.pip : S.pipOff, 5 + i * 9, run.D.hearts ? 21 : 10);
    if(fly.pips<3){const x=5+fly.pips*9,y=run.D.hearts?30:19;g.fillStyle='#b899d4';g.fillRect(x,y,Math.round(7*fly.pipT/(run.D.hearts?3.2:1.6)),1);}
    text(String(run.score), W - 30, 14, 11, '#ffe762', 'right');
    if (run.combo >= 5) text('x' + run.combo, W - 30, 26, 8, '#ff9bb8', 'right');
    g.fillStyle='rgba(43,27,58,.75)';g.fillRect(0,H-30,W,30);
    g.drawImage(S.foods[1],5,H-28,9,9);text(String(run.fruits),17,H-23,7,'#ffbfda','left');
    g.drawImage(S.foods[0],48,H-28,9,9);text(String(run.poop),60,H-23,7,'#dec8ff','left');
    const bar = Math.max(1, Math.min(104, G.barIndex(Math.max(0, beat)) + 1));
    text('c.' + bar + ' · ' + G.tempoName(bar) + (L.tempo !== 1 ? ' ' + Math.round(L.tempo * 100) + '%' : ''), 5, H - 8, 6.5, 'rgba(255,255,255,0.85)', 'left');
    if(L.web.active){
      const end=G.SCENES[5].b1,start=G.SCENES[5].b0;
      const remaining=Math.max(0,G.SCENES[6].bars[0]-bar);
      g.fillStyle='#2b1b3add';g.fillRect(12,H-51,W-24,18);
      text(remaining?'Saída em '+remaining+' compasso'+(remaining===1?'':'s'):'Fim do trecho',W/2,H-43,7.5,'#ffd0e6','center');
      g.fillStyle='#74538c';g.fillRect(16,H-35,W-32,1);
      g.fillStyle='#ffbdd5';g.fillRect(16,H-35,Math.round((W-32)*Math.max(0,Math.min(1,(beat-start)/(end-start)))),1);
    }
    if (banner) {
      const a = Math.min(1, banner.t / 0.3, (3 - banner.t) / 0.5); u.globalAlpha = Math.max(0, a);
      text(banner.name, W / 2, 50, 13, '#fff', 'center');
      text(banner.sub, W / 2, 64, 7.5, '#ffe9a3', 'center');
      u.globalAlpha = 1;
    }
    for (const f of floats) { u.globalAlpha = Math.min(1, f.life * 2.5); text(f.s, Math.min(W - 4, f.x), f.y, f.size, f.c, f.x > W - 60 ? 'right' : 'center'); }
    u.globalAlpha = 1;
    const c = counts.find(c => c.show > 0);
    if (c) text(String(c.n), W / 2, H / 2 - 20, 30, '#fff', 'center');
    else if (t < L.T(startBeat) - 0.2 && counts[0] && !counts[0].done) text(opts.practice != null ? 'Estudo' : 'Bom dia, mosquinha!', W / 2, H / 2 - 20, 11, '#fff', 'center');
    if (run.died && state === 'ending') text('A mosquinha cansou…', W / 2, H / 2 - 10, 11, '#ffd0dc', 'center');
  }

  /* tela de fundo dos menus */
  function renderAttract(dt) {
    attractT += dt;
    drawBg(G.SCENES[0],G.SCENES[0].b1*.5);
    ambience(quietMotion()?0:attractT,false);
    if(G.attractFly) {
      const x=W*.5+24,y=Math.round(G.attractFly.y*H)+(quietMotion()?0:Math.round(Math.sin(attractT*2.2)*2));
      [[-60,-2,1],[65,0,0],[-45,28,3],[61,29,2]].forEach(([dx,dy,kind],i)=>{blit(S.foods[kind],W*.5+dx,y+dy+(quietMotion()?0:Math.round(Math.sin(attractT*2+i)*2)));});
      C.menuFly(g,x,y,attractT,!quietMotion());
      const ac=S.acc[settings.acc];
      if(ac&&settings.acc!=='laco')g.drawImage(ac.c,Math.round(x+(ac.dx-3)*2),Math.round(y+(-14+ac.dy)*2),ac.c.width*2,ac.c.height*2);
      if(settings.acc==='laco')blit(S.heart,x-44,y-4);
    }
  }

  function frame(now) {
    const dt = Math.min(0.05, (now - lastNow) / 1000 || 0.016); lastNow = now;
    if(!document.hidden){
      if (state === 'play' || state === 'ending') update(dt);
      render(dt);
    }
    requestAnimationFrame(frame);
  }
  G.boot = function () { resize(); requestAnimationFrame(frame); };
  G.resize = resize;
  G._dbg = () => ({ state, t, beat, run, fly, L, H, SCALE, sceneI });
  G._auto = on => { G._autoOn = on; };
  // utilitários de teste (relógio falso quando não há gesto do usuário para liberar o áudio)
  G._fake = () => { A.init(); A.now = () => performance.now() / 1000; A.latency = () => 0; };
  G._jump = bar => { const i = Math.floor(bar); A.t0 = A.now() - L.T(G.barBeat(i) + (bar - i) * M.bars[i - 1][1]); };
})();

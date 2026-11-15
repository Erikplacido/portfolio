/* Motor de som estilo Game Boy Advance.
   Como no GBA: ondas curtas de baixa resolução (4-5 bits) tocadas em alturas
   diferentes mudando a velocidade de leitura, com um eco curto por cima. */
(function () {
  'use strict';
  const A = { ctx: null, vol: 0.85, t0: 0, waves: {}, f0: 1 };
  const STEPS = 32, OVER = 32, LEN = STEPS * OVER;
  const musicSources = new Set();
  let bdayTimer = 0, bdayOn = false, bdayLoop = true, bdayUnlock = null;
  A.bdayStartedAt = 0;
  const clrTimer = () => { if (bdayTimer && typeof clearTimeout !== 'undefined') clearTimeout(bdayTimer); bdayTimer = 0; };
  A.stopNotes = () => {
    clrTimer();
    bdayOn = false;
    if (bdayUnlock) { bdayUnlock(); bdayUnlock = null; }
    for(const src of musicSources) {try {src.stop();} catch(_){} src.disconnect();}
    musicSources.clear();
  };

  function makeWave(ctx, fn, levels) {
    const buf = ctx.createBuffer(1, LEN, ctx.sampleRate);
    const d = buf.getChannelData(0);
    let peak = 0;
    const raw = [];
    for (let s = 0; s < STEPS; s++) { const v = fn((s + 0.5) / STEPS); raw.push(v); peak = Math.max(peak, Math.abs(v)); }
    for (let s = 0; s < STEPS; s++) {
      const q = Math.round((raw[s] / peak) * levels) / levels;
      for (let o = 0; o < OVER; o++) d[s * OVER + o] = q;
    }
    return buf;
  }

  A.init = function () {
    if (A.ctx) return;
    const C = window.AudioContext || window.webkitAudioContext;
    const ctx = A.ctx = new C({ latencyHint: 'interactive' });
    A.f0 = ctx.sampleRate / LEN;
    const TAU = Math.PI * 2;
    A.waves.ep = makeWave(ctx, p => Math.sin(TAU * p) + 0.45 * Math.sin(TAU * 2 * p) + 0.22 * Math.sin(TAU * 3 * p) + 0.1 * Math.sin(TAU * 4 * p) + 0.07 * Math.sin(TAU * 6 * p), 15);
    A.waves.p50 = makeWave(ctx, p => (p < 0.5 ? 1 : -1), 7);
    A.waves.p25 = makeWave(ctx, p => (p < 0.25 ? 1 : -0.34), 7);
    A.waves.p12 = makeWave(ctx, p => (p < 0.125 ? 1 : -0.15), 7);
    A.waves.tri = makeWave(ctx, p => (p < 0.5 ? 4 * p - 1 : 3 - 4 * p), 7);
    const nb = ctx.createBuffer(1, ctx.sampleRate * 0.5 | 0, ctx.sampleRate);
    const nd = nb.getChannelData(0);
    let hold = 0, v = 0;
    for (let i = 0; i < nd.length; i++) { if (hold-- <= 0) { v = Math.random() < 0.5 ? -1 : 1; hold = 3; } nd[i] = v; }
    A.noise = nb;

    const master = A.master = ctx.createGain(); master.gain.value = A.vol;
    const lp = ctx.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 6400; lp.Q.value = 0.4;
    const comp = ctx.createDynamicsCompressor();
    comp.threshold.value = -16; comp.knee.value = 12; comp.ratio.value = 5; comp.attack.value = 0.004; comp.release.value = 0.16;
    const dl = ctx.createDelay(0.5); dl.delayTime.value = 0.17;
    const fb = ctx.createGain(); fb.gain.value = 0.24;
    const wet = ctx.createGain(); wet.gain.value = 0.2;
    A.bus = ctx.createGain(); A.bus.gain.value = 1;
    A.bus.connect(lp); A.bus.connect(dl); dl.connect(fb); fb.connect(dl); dl.connect(wet); wet.connect(lp);
    A.sfxBus = ctx.createGain(); A.sfxBus.gain.value = 0.9; A.sfxBus.connect(lp);
    lp.connect(comp); comp.connect(master); master.connect(ctx.destination);
  };

  /* iOS: o botão de silêncio corta o WebAudio; um <audio> mudo em loop evita isso. */
  A.unlock = function () {
    A.init();
    if (A.ctx.state !== 'running') A.ctx.resume().catch(()=>{});
    if (!A._el) {
      try {
        const sr = 8000, n = sr / 4, b = new Uint8Array(44 + n), dv = new DataView(b.buffer);
        const w = (o, s) => { for (let i = 0; i < s.length; i++) b[o + i] = s.charCodeAt(i); };
        w(0, 'RIFF'); dv.setUint32(4, 36 + n, true); w(8, 'WAVEfmt '); dv.setUint32(16, 16, true); dv.setUint16(20, 1, true); dv.setUint16(22, 1, true);
        dv.setUint32(24, sr, true); dv.setUint32(28, sr, true); dv.setUint16(32, 1, true); dv.setUint16(34, 8, true); w(36, 'data'); dv.setUint32(40, n, true);
        b.fill(128, 44);
        const el = A._el = new Audio(URL.createObjectURL(new Blob([b], { type: 'audio/wav' })));
        el.loop = true; el.setAttribute('playsinline', ''); el.volume = 0.01;
        const p = el.play(); if (p && p.catch) p.catch(() => { });
      } catch (e) { }
    }
  };
  A.setVol = v => { A.vol = v; if (A.master) A.master.gain.value = v; };
  A.now = () => (A.ctx ? A.ctx.currentTime : 0);
  A.latency = () => (A.ctx ? (A.ctx.outputLatency || A.ctx.baseLatency || 0) : 0);
  A.suspend = () => A.ctx && A.ctx.state === 'running' && A.ctx.suspend();
  A.resume = () => A.ctx && A.ctx.state !== 'running' && A.ctx.resume();

  const mtof = m => 440 * Math.pow(2, (m - 69) / 12);

  /* Nota musical: ataque rápido, decaimento tipo piano elétrico, soltura curta. */
  A.note = function (when, midi, dur, vel, pan, wave, pluck) {
    const ctx = A.ctx; if (!ctx) return;
    when = Math.max(when, ctx.currentTime + 0.002);
    const src = ctx.createBufferSource();
    src.buffer = A.waves[wave || 'ep']; src.loop = true;
    src.playbackRate.value = mtof(midi) / A.f0;
    const g = ctx.createGain();
    g.gain.setValueAtTime(0, when);
    g.gain.linearRampToValueAtTime(vel, when + 0.005);
    g.gain.setTargetAtTime(vel * (pluck ? 0.0 : 0.4), when + 0.005, pluck ? 0.07 : 0.17);
    const end = when + Math.max(0.05, dur);
    g.gain.setTargetAtTime(0, end, 0.03);
    src.connect(g);
    let panner;
    if (ctx.createStereoPanner) { const p = panner = ctx.createStereoPanner(); p.pan.value = pan || 0; g.connect(p); p.connect(A.bus); }
    else g.connect(A.bus);
    musicSources.add(src);
    src.onended = () => {musicSources.delete(src);src.disconnect();g.disconnect();if(panner)panner.disconnect();};
    src.start(when); src.stop(end + 0.3);
    return src;
  };

  function blip(wave, midi, dur, vol, when, slideTo) {
    const ctx = A.ctx; if (!ctx) return;
    when = Math.max(when || 0, ctx.currentTime + 0.002);
    const src = ctx.createBufferSource(); src.buffer = A.waves[wave]; src.loop = true;
    src.playbackRate.setValueAtTime(mtof(midi) / A.f0, when);
    if (slideTo != null) src.playbackRate.exponentialRampToValueAtTime(mtof(slideTo) / A.f0, when + dur);
    const g = ctx.createGain();
    g.gain.setValueAtTime(vol, when); g.gain.exponentialRampToValueAtTime(0.0008, when + dur);
    src.connect(g); g.connect(A.sfxBus); src.start(when); src.stop(when + dur + 0.02);
  }
  function hiss(dur, vol, rate, when) {
    const ctx = A.ctx; if (!ctx) return;
    when = Math.max(when || 0, ctx.currentTime + 0.002);
    const src = ctx.createBufferSource(); src.buffer = A.noise; src.loop = true; src.playbackRate.value = rate || 1;
    const g = ctx.createGain();
    g.gain.setValueAtTime(vol, when); g.gain.exponentialRampToValueAtTime(0.0008, when + dur);
    src.connect(g); g.connect(A.sfxBus); src.start(when); src.stop(when + dur + 0.02);
  }
  A.sfx = {
    sparkle(midi) { blip('p12', midi + 12, 0.07, 0.045); },
    harm(midi) { blip('tri', midi + 12, 0.05, 0.03); },
    clean() { const t = A.now(); blip('p25', 84, 0.07, 0.07, t); blip('p25', 88, 0.07, 0.07, t + 0.06); blip('p25', 91, 0.12, 0.07, t + 0.12); },
    heart() { const t = A.now();[72, 76, 79, 84].forEach((m, i) => blip('p25', m, 0.09, 0.08, t + i * 0.055)); },
    hurt() { hiss(0.22, 0.2, 0.5); blip('p25', 58, 0.25, 0.12, 0, 40); },
    dash() { hiss(0.12, 0.07, 1.6); blip('tri', 70, 0.12, 0.06, 0, 86); },
    warn() { blip('p12', 79, 0.05, 0.035); },
    strike() { hiss(0.09, 0.12, 0.8); },
    tick(hi) { blip('p12', hi ? 96 : 89, 0.04, 0.09); },
    ui() { blip('p25', 81, 0.05, 0.06); },
    rip() { hiss(0.35, 0.16, 1.2); const t = A.now();[77, 81, 84, 89].forEach((m, i) => blip('p25', m, 0.1, 0.07, t + i * 0.05)); },
    fanfare() { const t = A.now() + 0.05;[67, 71, 74, 79, 83].forEach((m, i) => blip('p25', m, 0.16, 0.07, t + i * 0.09)); },
    sad() { const t = A.now();[67, 63, 60].forEach((m, i) => blip('tri', m, 0.22, 0.09, t + i * 0.16)); },
  };

  /* Tema de "Parabéns pra Você" em arranjo chiptune 8-bit de Game Boy (Pulse 1, Pulse 2 e Wave/Tri). */
  const BDAY_MEL = [
    [0.00, 0.68, 67], [0.75, 0.22, 67],
    [1.00, 0.88, 69], [2.00, 0.88, 67], [3.00, 0.88, 72],
    [4.00, 1.85, 71], [6.00, 0.68, 67], [6.75, 0.22, 67],
    [7.00, 0.88, 69], [8.00, 0.88, 67], [9.00, 0.88, 74],
    [10.00, 1.85, 72], [12.00, 0.68, 67], [12.75, 0.22, 67],
    [13.00, 0.08, 78], [13.08, 0.82, 79], [14.00, 0.88, 76], [15.00, 0.88, 72],
    [16.00, 0.88, 71], [17.00, 1.10, 69], [18.25, 0.68, 77], [19.00, 0.22, 77],
    [19.25, 0.88, 76], [20.25, 0.88, 72], [21.25, 0.88, 74],
    [22.25, 2.20, 72]
  ];
  const BDAY_HARM = [
    [1.00, 0.75, 64], [2.00, 0.75, 60], [3.00, 0.75, 64],
    [4.00, 0.85, 67],
    [7.00, 0.75, 65], [8.00, 0.75, 62], [9.00, 0.75, 65],
    [10.00, 0.85, 64],
    [13.00, 0.75, 70], [14.00, 0.75, 67], [15.00, 0.75, 64],
    [16.00, 0.75, 65], [17.00, 0.65, 65],
    [19.25, 0.75, 67], [20.25, 0.75, 64], [21.25, 0.75, 65],
    [22.25, 0.85, 64]
  ];
  const BDAY_ARPS = [
    [5.00, [62, 67, 71, 74, 71, 67]],
    [11.00, [60, 64, 67, 72, 67, 64]],
    [17.65, [65, 69, 72, 77]],
    [23.15, [67, 72, 76, 79, 84, 79, 84, 88, 84]]
  ];
  const BDAY_BASS = [
    [1.00, 0.45, 48], [2.00, 0.30, 55], [3.00, 0.30, 60],
    [4.00, 0.45, 43], [5.00, 0.30, 50], [6.00, 0.30, 55],
    [7.00, 0.45, 47], [8.00, 0.30, 50], [9.00, 0.30, 55],
    [10.00, 0.45, 48], [11.00, 0.30, 55], [12.00, 0.30, 60],
    [13.00, 0.45, 52], [14.00, 0.30, 55], [15.00, 0.30, 58],
    [16.00, 0.45, 53], [17.00, 0.45, 57], [18.25, 0.30, 53],
    [19.25, 0.45, 55], [20.25, 0.30, 60], [21.25, 0.45, 55],
    [22.25, 0.35, 55], [22.75, 0.35, 50], [23.25, 1.30, 48]
  ];

  function scheduleBirthdayPass() {
    if (!bdayOn || !A.ctx) return;
    clrTimer();
    if (!A.bdayStartedAt) A.bdayStartedAt = A.now();
    const B = 60 / 138;
    const t0 = A.now() + 0.06;
    for (const [b, d, m] of BDAY_MEL) {
      A.note(t0 + b * B, m, d * B, 0.13, -0.15, 'p50', false);
      A.note(t0 + b * B, m, d * B * 0.65, 0.055, 0.12, 'p25', true);
    }
    for (const [b, d, m] of BDAY_HARM) {
      A.note(t0 + b * B, m, d * B, 0.065, 0.25, 'p12', true);
    }
    for (const [b, notes] of BDAY_ARPS) {
      const step = 0.14 * B;
      notes.forEach((m, i) => A.note(t0 + b * B + i * step, m, step * 0.9, 0.06, 0.22, 'p12', true));
    }
    for (const [b, d, m] of BDAY_BASS) {
      A.note(t0 + b * B, m, d * B, 0.15, 0, 'tri', false);
      A.note(t0 + b * B, m + 12, d * B * 0.8, 0.07, 0, 'tri', true);
    }
    if (typeof setTimeout !== 'undefined') {
      if (bdayLoop) {
        bdayTimer = setTimeout(() => {
          if (bdayOn) scheduleBirthdayPass();
        }, Math.round((25.8 * B) * 1000));
      } else {
        bdayTimer = setTimeout(() => { bdayOn = false; bdayTimer = 0; }, Math.round((24.8 * B) * 1000));
      }
    }
  }

  A.stopBirthday = function () {
    A.stopNotes();
    A.bdayStartedAt = 0;
  };

  A.playBirthday = function (loop = true) {
    A.stopNotes();
    bdayOn = true;
    bdayLoop = loop !== false;
    A.bdayStartedAt = 0;
    A.init();
    const n = A.now();
    A.bus.gain.cancelScheduledValues(n);
    A.bus.gain.setValueAtTime(1, n);
    const evs = ['pointerdown', 'touchstart', 'mousedown', 'keydown', 'click'];
    const onState = () => {
      if (bdayOn && !A.bdayStartedAt && A.ctx && A.ctx.state === 'running') {
        cleanup();
        scheduleBirthdayPass();
      }
    };
    const tryStart = ev => {
      if (!bdayOn) { cleanup(); return; }
      if (ev && ev.target && ev.target.closest && ev.target.closest('[data-a]')) return;
      A.unlock();
      if (A.ctx && A.ctx.state === 'running') {
        cleanup();
        if (!A.bdayStartedAt) scheduleBirthdayPass();
      } else if (A.ctx && A.ctx.resume) {
        try {
          const p = A.ctx.resume();
          if (p && p.then) p.then(onState).catch(() => {});
        } catch (_) {}
      }
    };
    const cleanup = () => {
      if (typeof window !== 'undefined' && window.removeEventListener) {
        evs.forEach(e => window.removeEventListener(e, tryStart, true));
      }
      if (A.ctx && A.ctx.removeEventListener) A.ctx.removeEventListener('statechange', onState);
      bdayUnlock = null;
    };
    if (A.ctx.state !== 'running') {
      try {
        const p = A.ctx.resume();
        if (p && p.then) p.then(onState).catch(() => {});
      } catch (_) {}
    }
    if (A.ctx.state === 'running') {
      scheduleBirthdayPass();
      return;
    }
    bdayUnlock = cleanup;
    if (typeof window !== 'undefined' && window.addEventListener) {
      evs.forEach(e => window.addEventListener(e, tryStart, true));
    }
    if (A.ctx && A.ctx.addEventListener) A.ctx.addEventListener('statechange', onState);
  };
  window.GBA = A;
})();

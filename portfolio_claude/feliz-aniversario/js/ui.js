/* Menus, perfis (Juliana + convidados), ranking, álbum e progresso salvo no aparelho. */
(function () {
  'use strict';
  const G = window.G, A = window.GBA;
  const OWNER = 'Juliana';                 // dona do jogo
  const KEY = 'diario_da_mosca_v1';
  const root = document.getElementById('screens');
  const stage = document.getElementById('stage');
  G.DIFFS.estudo = { id: 'estudo', label: 'Estudo', tol: 11.5, hearts: 0, haz: 1, tempo: 1, mult: 1 };

  const DEF = { v: 1, who: OWNER, guests: [], runs: [], stickers: {}, days: [], plays: 0, sceneBest: {}, unlocked: {}, seenIntro: false, seenHow: false, settings: { vol: 0.85, sens: 1.25, haptic: true, motion: true, acc: '' } };
  let save = JSON.parse(JSON.stringify(DEF));
  try { const raw = localStorage.getItem(KEY); if (raw) { const o = JSON.parse(raw); save = Object.assign(save, o); save.settings = Object.assign({}, DEF.settings, o.settings || {}); } } catch (e) { }
  const persist = () => { try { localStorage.setItem(KEY, JSON.stringify(save)); } catch (e) { } };
  function applySettings() { Object.assign(G.settings, save.settings); A.setVol(save.settings.vol); }
  applySettings();

  const STICKERS = [
    { id: 'primeiro', e: '🌅', n: 'Primeiro voo', d: 'Chegue ao fim do dia' },
    { id: 'faxina', e: '🧹', n: 'Faxineira', d: 'Limpe metade das comidas' },
    { id: 'pouso', e: '🍃', n: 'Pouso perfeito', d: 'Pouse na folha na hora certa' },
    { id: 'sapo', e: '🐸', n: 'Sapo sem almoço', d: 'Escape de todas as linguadas' },
    { id: 'teia', e: '🕸️', n: 'Fuga da teia', d: 'Solte-se sem ser mordida' },
    { id: 'vagalume', e: '✨', n: 'Vaga-lume', d: 'Pegue o vaga-lume do dia' },
    { id: 'combo', e: '🔥', n: 'Combo 100', d: '100 notas seguidas' },
    { id: 'ouvido', e: '🎼', n: 'Ouvido absoluto', d: '95% das notas' },
    { id: 'intocavel', e: '🛡️', n: 'Intocável', d: 'Nenhum susto na Aventura' },
    { id: 'maestrina', e: '👑', n: 'Maestrina', d: 'Nota S na Aventura' },
    { id: 'virtuose', e: '🎹', n: 'Virtuose', d: 'Termine o modo Virtuose' },
    { id: 'presto', e: '⚡', n: 'Presto!', d: 'Termine o modo Presto' },
    { id: 'anfitria', e: '🫖', n: 'Anfitriã', d: 'Um convidado jogou' },
    { id: 'diario', e: '📔', n: 'Diário fiel', d: 'Jogue em 5 dias diferentes' },
    { id: 'estudiosa', e: '🤓', n: 'Estudiosa', d: '90% em um trecho de estudo' },
  ];
  const ACCS = [{ id: '', n: 'Original', need: 0 }, { id: 'laco', n: 'Coração', need: 2 }, { id: 'flor', n: 'Flor', need: 4 }, { id: 'oculos', n: 'Óculos', need: 6 }, { id: 'cartola', n: 'Cartola', need: 8 }, { id: 'coroa', n: 'Coroa', need: 10 }];
  const nStk = () => Object.keys(save.stickers).length;

  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const today = () => { const d = new Date(); return d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate(); };
  const bestOf = (name, diff) => save.runs.filter(r => r.name === name && r.diff === diff).reduce((m, r) => Math.max(m, r.score), 0);
  const isUnlocked = id => !G.DIFFS[id].lock || !!save.unlocked[id];

  const icon = name => `<img class="pixel-icon" alt="" aria-hidden="true" src="${G.pixelIcons[name]||G.pixelIcons.star}">`;
  const emoji = {'🎂':'gift','🌼':'fruit','🍓':'fruit','🪰':'heart','🎹':'music','⚡':'star','🌅':'star','🍌':'fruit','🐸':'star','🪤':'gear','👀':'star','🕸️':'star','🍂':'fruit','🌑':'star','🕷️':'star','🌤️':'star','🍃':'fruit','👑':'trophy','🙂':'heart','🔒':'gear','👆':'play','🟡':'fruit','💩':'poop','💨':'star','🎧':'music','🥇':'trophy','🥈':'trophy','🥉':'trophy','🧹':'poop','✨':'star','🔥':'star','🎼':'music','🛡️':'trophy','🫖':'gift','📔':'book','🤓':'book','⚙':'gear','▶':'play'};
  const pixelMarkup = html => Object.entries(emoji).reduce((text,[e,n])=>text.split(e).join(icon(n)),html);

  let cur = null, lastRun = null, rankTab = 'aventura', studyTempo = 1;
  function show(id, html, cls = 'veil') {
    const prev = cur;
    cur = id;
    root.innerHTML = '<section class="scr on ' + cls + '" id="scr-' + id + '">' + pixelMarkup(html) + '</section>';
    G.attractFly = id === 'title' ? { x: 0.5, y: 0.46 } : null;
    document.getElementById('btnDash').style.visibility=id==='pause'?'hidden':'';
    if (id === 'intro') {
      if (A.playBirthday) A.playBirthday(true);
    } else if (prev === 'intro') {
      if (id === 'title' && A.playBirthday && (!A.bdayStartedAt || A.now() - A.bdayStartedAt < 0.35)) {
        A.playBirthday(false);
      } else if (A.stopBirthday) {
        A.stopBirthday();
      }
    } else if (id !== 'title' && A.stopBirthday) {
      A.stopBirthday();
    }
  }
  function hide() { cur = null; root.innerHTML = ''; G.attractFly = null; document.getElementById('btnDash').style.visibility=''; if (A.stopBirthday) A.stopBirthday(); }
  root.addEventListener('click', e => {
    const b = e.target.closest('[data-a]'); if (!b || b.disabled) return;
    A.unlock(); A.sfx.ui();
    const fn = actions[b.dataset.a]; if (fn) fn(b.dataset.v, b);
  });

  /* ---------- telas ---------- */
  function intro() {
    show('intro', `<div class="grow"></div><div class="panel card-gift"><div class="e">🎂</div><h2>Feliz aniversario Ju</h2>
      <p><b>40 anos sendo Cabaça!</b><br>Espero que essa mosquinha espante o tédio e traga diversão e sorrisos para os seus dias.</p>
      </div>
      <div style="height:18px"></div><button class="btn big" data-a="title">Abrir presente</button><div class="grow"></div>`, 'veil center');
  }
  function birthday() {
    show('birthday', `<div class="list birthday-letter"><div class="panel card-gift"><span class="letter-label">um bilhetinho para você</span><img class="app-mascot" src="${window.Characters.previewURL('sleep')}" alt="A mosquinha descansando"><h2>Feliz aniversário,<br>${OWNER}!</h2><p>Depois de tanta música, frutinhas e fugas, a mosquinha chegou em casa.</p><p>Que seu novo ano tenha boas risadas, novas melodias e muitos motivos para sorrir.</p><p class="letter-signature">Com carinho,<br><b>Erik</b></p></div><button class="btn big" data-a="title">Guardar no meu diário</button></div>`, 'veil center');
  }
  function title() {
    show('title', `<div class="logo"><small>DIÁRIO DE UMA</small><b>MOSCA</b></div>
      <button class="for" data-a="intro">para, ${OWNER} ♥</button><div class="grow"></div>
      <div class="col"><button class="btn big" data-a="play">▶ Vamos voar!</button>
      <div class="row"><button class="btn sky" data-a="study">${icon('music')} Estudar</button><button class="btn sun" data-a="rank">${icon('trophy')} Ranking</button></div>
      <div class="row"><button class="btn pink" data-a="album">${icon('book')} Álbum</button><button class="btn lilac" data-a="how">Como jogar</button></div>
      <div class="row title-tools"><button class="chip profile-chip" data-a="who"><b>${esc(save.who)}</b> ▸</button><button class="chip" data-a="install">${window.PWA.waiting?'Atualizar':window.PWA.installed?'No celular':'Instalar'}</button><button class="chip" data-a="settings">⚙ Ajustes</button></div></div>`, 'title');
  }
  function installScr() {
    const p=window.PWA;
    let body;
    if(p.localFile) body=`<p>Este arquivo é a versão para abrir diretamente. Para instalar como aplicativo, abra o <b>link HTTPS do jogo</b> no celular.</p><p>O pacote do presente também inclui a versão pronta para hospedagem.</p>`;
    else if(p.installed) body=`<p>A mosquinha já está no seu celular. ♥</p><p>${p.offlineReady?'Seu jardim está guardado para jogar sem internet.':'Preparando o jardim para jogar sem internet…'}</p>`;
    else body=`<p>Leve este pequeno jardim com você. O jogo ganha um ícone na tela inicial e abre como aplicativo.</p><ol class="install-steps"><li>Abra este link no <b>Chrome</b> ou no <b>Samsung Internet</b>.</li><li>Toque em <b>Instalar jogo</b> abaixo, se aparecer. Ou abra o menu do navegador e escolha <b>Instalar aplicativo</b> / <b>Adicionar à tela inicial</b>.</li><li>Depois de abrir uma vez com internet, espere a indicação <b>Pronto para jogar offline</b>.</li></ol>`;
    show('install',`<div class="head"><button class="btn small" data-a="title" aria-label="Voltar">◀</button><h2>Seu jardim de bolso</h2></div><div class="list"><div class="panel install-card"><img class="app-mascot" src="${window.Characters.previewURL('wink')}" alt="Mosquinha rosa e roxa"><h2>Diário de uma Mosca</h2>${body}<div class="offline-state">${p.offlineReady?'✓ Pronto para jogar offline':p.localFile?'Versão em arquivo':!p.supported?'Abra em um endereço HTTPS':p.online?'Preparando o modo offline…':'Sem conexão'}</div>${p.error?`<p class="install-error">${esc(p.error)}</p>`:''}</div>
    ${p.canPrompt&&!p.installed?'<button class="btn big" data-a="installNow">Instalar jogo</button>':''}
    ${p.waiting?`<div class="panel"><p>Tem uma versão nova do seu jardim. Seu álbum e seu progresso continuam salvos neste aparelho.</p><button class="btn small pink" data-a="update" ${p.updating?'disabled':''}>${p.updating?'Atualizando…':'Atualizar agora'}</button></div>`:''}
    <p class="sub install-footnote">Seu ranking e suas figurinhas ficam neste navegador. Não há cadastro nem compras.</p></div>`);
  }
  window.addEventListener('pwa-state',()=>{if(cur==='install')installScr();else if(cur==='title')title();});
  function who() {
    const names = [OWNER].concat(save.guests);
    show('who', `<div class="head"><button class="btn small" data-a="title">◀</button><h2>Quem joga?</h2></div>
      <div class="list">${names.map(n => `<button class="card ${n === save.who ? 'sel' : ''}" data-a="pick" data-v="${esc(n)}"><span class="ico">${n === OWNER ? '👑' : '🙂'}</span><span class="tx"><b>${esc(n)}</b><span>${n === OWNER ? 'A dona do jogo' : 'Convidado'}</span></span><span class="rt">${bestOf(n, 'aventura') || ''}</span></button>`).join('')}
      <div class="panel"><label for="gname">Novo convidado</label><div style="height:8px"></div><input id="gname" type="text" maxlength="12" placeholder="Nome" autocomplete="off" autocapitalize="words"><div style="height:12px"></div><button class="btn mint small" data-a="addGuest">Entrar como convidado</button></div></div>`);
  }
  function diff() {
    show('diff', `<div class="head"><button class="btn small" data-a="title">◀</button><h2>Como vai ser?</h2></div><p class="sub">Jogando: ${esc(save.who)}</p>
      <div class="list">${['passeio', 'aventura', 'virtuose', 'presto'].map(id => { const d = G.DIFFS[id], ok = isUnlocked(id), b = bestOf(save.who, id); return `<button class="card ${ok ? '' : 'locked'}" data-a="${ok ? 'go' : 'locked'}" data-v="${id}"><span class="ico">${ok ? d.icon : '🔒'}</span><span class="tx"><b>${d.label}</b><span>${ok ? d.desc : d.lock}</span></span><span class="rt">${b ? b : ''}</span></button>`; }).join('')}</div>`);
  }
  function how(next) {
    show('how', `<div class="grow"></div><div class="panel"><h2>Como jogar</h2>
      <div class="tip"><span class="e">👆</span><span>Deslize o dedo <b>para cima e para baixo</b>. No computador, use <b>↑ ↓ ou W / S</b>.</span></div>
      <div class="tip"><span class="e">🟡</span><span>Colete <b>frutas e cocô</b> no ritmo da música. Cada item é uma nota: agudo em cima, grave embaixo.</span></div>
      <div class="tip"><span class="e">💩</span><span>Os itens com rastro são notas longas. <b>Acompanhe até o fim</b> para saborear tudo!</span></div>
      <div class="tip"><span class="e">💨</span><span>Use o botão <b>ZUNIR</b>, dê um toque rápido ou aperte <b>Espaço</b> para escapar. As três asinhas mostram sua energia.</span></div>
      <div class="tip"><span class="e">🎧</span><span>Quando a música fica tensa, os perigos chegam <b>nos acentos</b>. Ouça!</span></div>
      <div class="tip"><span class="e">🕸️</span><span>Na teia, <b>colete e zuna para afastar a aranha</b>. Resista até o fim do trecho: a saída acontece no <b>compasso 59</b>.</span></div></div>
      <div style="height:16px"></div><button class="btn big" data-a="${next ? 'howGo' : 'title'}" data-v="${next || ''}">${next ? 'Vamos!' : 'Entendi'}</button><div class="grow"></div>`, 'veil center');
  }
  function study() {
    show('study', `<div class="head"><button class="btn small" data-a="title">◀</button><h2>Estudar trecho</h2></div>
      <div class="tabs">${[0.7, 0.85, 1].map(v => `<button class="${studyTempo === v ? 'on' : ''}" data-a="stempo" data-v="${v}">${v === 1 ? 'a tempo' : Math.round(v * 100) + '%'}</button>`).join('')}</div>
      <div class="list">${G.SCENES.map(s => { const b = save.sceneBest[s.id]; return `<button class="card" data-a="practice" data-v="${s.i}"><span class="ico">${['🌅', '🍌', '🐸', '🪤', '👀', '🕸️', '🍂', '🌑', '🕷️', '🌤️', '🍃'][s.i]}</span><span class="tx"><b>${s.name}</b><span>compassos ${s.bars[0]}–${s.bars[1]}</span></span><span class="rt">${b != null ? Math.round(b * 100) + '%' : '—'}</span></button>`; }).join('')}</div>`);
  }
  function rank() {
    const ids = ['passeio', 'aventura', 'virtuose', 'presto'];
    const best = {};
    for (const r of save.runs) if (r.diff === rankTab && (!best[r.name] || r.score > best[r.name].score)) best[r.name] = r;
    const rows = Object.values(best).sort((a, b) => b.score - a.score).slice(0, 30);
    show('rank', `<div class="head"><button class="btn small" data-a="title">◀</button><h2>Ranking</h2></div>
      <div class="tabs">${ids.map(id => `<button class="${rankTab === id ? 'on' : ''}" data-a="rtab" data-v="${id}">${G.DIFFS[id].label}</button>`).join('')}</div>
      <div class="list">${rows.length ? rows.map((r, i) => `<div class="rk ${r.name === OWNER ? 'me' : ''}"><span class="pos">${['🥇', '🥈', '🥉'][i] || (i + 1)}</span><span class="nm">${r.name === OWNER ? '👑 ' : ''}${esc(r.name)}<small>${Math.round(r.acc * 100)}% das notas${r.died ? ' · até o c.' + r.bar : ''}</small></span><span class="lt">${r.rank}</span><span>${r.score}</span></div>`).join('') : '<p class="empty">Ninguém jogou este modo ainda.<br>Seja a primeira!</p>'}</div>`);
  }
  function album() {
    const n = nStk();
    show('album', `<div class="head"><button class="btn small" data-a="title">◀</button><h2>Álbum ${n}/${STICKERS.length}</h2></div>
      <div class="list"><div class="album-hero"><img src="${window.Characters.previewURL('joy')}" alt="Mosquinha feliz"><div><b>Pequenos voos, boas lembranças.</b><p>${n?`${n} figurinhas no seu diário.`:'Seu diário está esperando o primeiro voo.'}</p></div></div><p class="sub">Enfeites da mosquinha</p><div class="accs">${ACCS.map(a => `<button class="${save.settings.acc === a.id ? 'on' : ''}" ${n >= a.need ? '' : 'disabled'} data-a="acc" data-v="${a.id}">${n >= a.need ? a.n : '🔒 ' + a.need}</button>`).join('')}</div>
      ${save.stickers.primeiro?'<button class="btn small pink" data-a="birthday">♥ O bilhetinho do final</button>':''}<div class="grid">${STICKERS.map(s => `<div class="stk ${save.stickers[s.id] ? '' : 'off'}"><div class="e">${s.e}</div><b>${s.n}</b><span>${s.d}</span></div>`).join('')}</div></div>`);
  }
  function settingsScr() {
    const s = save.settings;
    show('settings', `<div class="head"><button class="btn small" data-a="title">◀</button><h2>Ajustes</h2></div>
      <div class="list"><div class="panel col"><div><label for="sVol">Volume</label><input type="range" id="sVol" min="0" max="1" step="0.05" value="${s.vol}"></div>
      <div><label for="sSens">Sensibilidade do dedo</label><input type="range" id="sSens" min="0.8" max="2" step="0.05" value="${s.sens}"></div>
      <button class="btn small ${s.haptic ? 'mint' : ''}" data-a="haptic">Vibração: ${s.haptic ? 'ligada' : 'desligada'}</button>
      <button class="btn small lilac" data-a="motion">Movimento reduzido: ${s.motion?'desligado':'ligado'}</button>
      <button class="btn small sky" data-a="install">Instalação e modo offline</button>
      <button class="btn small" data-a="intro">Ver a dedicatória</button>
      <button class="btn small pink" data-a="wipe">Apagar todo o progresso</button></div></div>`);
    document.getElementById('sVol').oninput = e => { save.settings.vol = +e.target.value; applySettings(); persist(); };
    document.getElementById('sSens').oninput = e => { save.settings.sens = +e.target.value; applySettings(); persist(); };
  }
  function pauseScr() {
    show('pause', `<div class="grow"></div><div class="panel"><h2>Pausa</h2><div class="col"><button class="btn big" data-a="resume">Continuar</button><button class="btn sun" data-a="retry">Recomeçar</button><button class="btn pink" data-a="quit">Sair</button></div></div><div class="grow"></div>`, 'veil center');
  }
  function results(r, news, pos, record) {
    const sc = r.practice != null ? G.SCENES[r.practice] : null;
    const head = sc ? 'Estudo: ' + sc.name : r.died ? 'A mosquinha cansou…' : 'Fim do diário!';
    const msg = r.died ? 'Chegou ao compasso ' + r.bar + ' de 104.' : { S: 'Maestrina!', A: 'Lindo voo!', B: 'Muito bem!', C: 'Bom começo!', D: 'Vamos de novo?' }[r.rank];
    show('results', `<div class="list"><div class="panel" style="text-align:center"><h2>${head}</h2><div class="result-medal"><img src="${window.Characters.previewURL(r.died?'hurt':'wink')}" alt=""><div class="big-rank">${r.rank}</div></div><p style="margin:6px 0 10px"><b>${msg}</b> ${record ? '<span class="new">novo recorde!</span>' : ''}</p>
      <div class="stats" style="text-align:left"><span>Pontos</span><b>${r.score}</b><span>Notas colhidas</span><b>${r.hits}/${r.total} · ${Math.round(r.acc * 100)}%</b><span>Maior sequência</span><b>${r.maxCombo}</b><span>Frutas colhidas</span><b>${r.fruits || 0}</b><span>Cocôs colhidos</span><b>${r.poop || 0}</b><span>Notas longas</span><b>${r.foods}</b><span>Sustos</span><b>${r.damage}</b>${pos ? `<span>Posição no ranking</span><b>${pos}º</b>` : ''}</div>
      ${news.length ? `<p style="margin-top:12px"><b>Figurinhas novas!</b></p><p style="font-size:30px">${news.map(s => s.e).join(' ')}</p><p style="font-size:14px">${news.map(s => s.n).join(' · ')}</p>` : ''}</div>
      ${!sc&&!r.died&&r.name===OWNER?'<button class="btn big" data-a="birthday">♥ Um bilhetinho para você</button>':''}<button class="btn ${!sc&&!r.died&&r.name===OWNER?'small':'big'}" data-a="retry">Voar de novo</button><div class="row"><button class="btn sun" data-a="${sc ? 'study' : 'rank'}">${sc ? 'Trechos' : 'Ranking'}</button><button class="btn pink" data-a="title">Menu</button></div></div>`);
  }

  /* ---------- partidas ---------- */
  function start(o) {
    lastRun = o; hide();
    const d = today();
    save.plays++; if (!save.days.includes(d)) save.days.push(d); persist();
    G.startRun(Object.assign({ name: save.who, seed: d * 131 + save.plays * 7 }, o));
  }
  G.onPause = pauseScr;
  G.onEnd = function (r) {
    const owner = r.name === OWNER, full = r.practice == null, done = full && !r.died;
    const news = [], give = id => { if (!save.stickers[id]) { save.stickers[id] = Date.now(); news.push(STICKERS.find(s => s.id === id)); } };
    let pos = 0, record = false;
    if (full) {
      record = r.score > bestOf(r.name, r.diff);
      save.runs.push({ name: r.name, diff: r.diff, score: r.score, acc: r.acc, rank: r.rank, died: r.died, bar: r.bar, date: r.date });
      if (save.runs.length > 400) save.runs.splice(0, save.runs.length - 400);
      const best = {}; for (const x of save.runs) if (x.diff === r.diff) best[x.name] = Math.max(best[x.name] || 0, x.score);
      pos = Object.values(best).filter(v => v > best[r.name]).length + 1;
      rankTab = r.diff;
      if (done && r.diff === 'aventura' && 'SA'.includes(r.rank)) save.unlocked.virtuose = true;
      if (done && r.diff === 'virtuose') save.unlocked.presto = true;
      if (!owner) give('anfitria');
    }
    if (owner) {
      for (const id in r.scenes) { const s = r.scenes[id]; if (s.total >= 8) save.sceneBest[id] = Math.max(save.sceneBest[id] || 0, s.hit / s.total); }
      if (done) give('primeiro');
      if (done && r.foodSeen && r.foods / r.foodSeen >= 0.5) give('faxina');
      if (r.landed) give('pouso');
      if (done && r.frogHits === 0 && r.diff !== 'passeio') give('sapo');
      if (r.webEscaped && r.diff !== 'passeio') give('teia');
      if (r.firefly) give('vagalume');
      if (r.maxCombo >= 100) give('combo');
      if (done && r.acc >= 0.95) give('ouvido');
      if (done && r.damage === 0 && r.diff !== 'passeio') give('intocavel');
      if (done && r.rank === 'S' && r.diff !== 'passeio') give('maestrina');
      if (done && r.diff === 'virtuose') give('virtuose');
      if (done && r.diff === 'presto') give('presto');
      if (save.days.length >= 5) give('diario');
      if (!full && r.acc >= 0.9 && r.total >= 8) give('estudiosa');
    }
    persist();
    if (!r.died && (r.rank === 'S' || r.rank === 'A')) A.sfx.fanfare();
    results(r, news, pos, record && full);
  };

  const actions = {
    title, intro, birthday, who, rank, album, study, settings: settingsScr, install:installScr,
    async installNow(){await window.PWA.install();if(cur==='install')installScr();},
    update(){window.PWA.applyUpdate();},
    how: () => how(''),
    play: diff,
    pick(v) { save.who = v; persist(); title(); },
    addGuest() {
      const el = document.getElementById('gname'); const n = (el.value || '').trim().slice(0, 12);
      if (!n) { el.focus(); return; }
      const ex = [OWNER].concat(save.guests).find(x => x.toLowerCase() === n.toLowerCase());
      if (ex) save.who = ex; else { save.guests.push(n); save.who = n; }
      persist(); title();
    },
    locked() { },
    go(v) { if (!save.seenHow) { save.seenHow = true; persist(); how(v); } else start({ diff: v }); },
    howGo(v) { start({ diff: v }); },
    stempo(v) { studyTempo = +v; study(); },
    practice(v) { start({ diff: 'estudo', practice: +v, tempo: studyTempo }); },
    rtab(v) { rankTab = v; rank(); },
    acc(v) { save.settings.acc = v; applySettings(); persist(); album(); },
    haptic() { save.settings.haptic = !save.settings.haptic; applySettings(); persist(); settingsScr(); },
    motion() { save.settings.motion = !save.settings.motion; applySettings(); persist(); settingsScr(); },
    wipe(v, b) { if (b.dataset.sure) { try { localStorage.removeItem(KEY); } catch (e) { } location.reload(); } else { b.dataset.sure = '1'; b.textContent = 'Tem certeza? Toque de novo'; } },
    async resume() { try{await G.resume();hide();document.getElementById('btnDash').style.visibility='';}catch(_){pauseScr();} },
    retry() { if (G._dbg().state === 'pause') G.quit(); start(lastRun); },
    quit() { G.quit(); title(); },
  };
  document.getElementById('btnPause').addEventListener('click', () => G.pause());

  function fit() { G.resize(); const s = stage.clientWidth / 384; root.style.height = (stage.clientHeight / s) + 'px'; }
  window.addEventListener('resize', fit);
  window.addEventListener('orientationchange', () => setTimeout(fit, 250));
  document.addEventListener('gesturestart', e => e.preventDefault());

  G.boot(); fit();
  const fontReady = document.fonts && document.fonts.load ? document.fonts.load('400 20px PixelFont').catch(() => { }) : Promise.resolve();
  Promise.all([G.load(), fontReady]).then(() => {
    document.getElementById('loading').remove();
    if (!save.seenIntro) { save.seenIntro = true; persist(); intro(); } else title();
  }).catch(()=>{
    document.getElementById('loading').innerHTML='<b>O jardim não terminou de carregar.</b><small>Confira a conexão e tente outra vez.</small><button class="btn small" id="retryLoad">Tentar novamente</button>';
    document.getElementById('retryLoad').onclick=()=>location.reload();
  });
})();

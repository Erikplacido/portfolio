/* Chat do site — avatar com balão de saudação; ao clicar, abre um
   mini-chat. Tudo acontece dentro do chat: sem pop-up, sem nova aba, sem
   redirecionamento (nada de window.open nem mudança de location).
   A mensagem vai pra /api/chat/send, que a posta no grupo "Chat Site" do
   Telegram do Erik; a resposta que ele manda lá (deslizando a mensagem)
   volta pelo webhook e o widget a busca em /api/chat/poll enquanto a aba
   está visível. A conversa fica presa a um identificador aleatório
   guardado no localStorage, então quem fecha e volta depois encontra a
   resposta. Backend e configuração: api/ e CHAT-TELEGRAM.md.
   Carregar depois de shared/i18n.js (shared/frame.js já garante isso) e
   de shared/chat-widget.css. Funciona em qualquer página: calcula o
   caminho pra assets/erik-placido-foto.png a partir de shared/frame.js. */
(function(){
  'use strict';
  if (document.getElementById('chat-widget')) return;

  var me = document.currentScript && document.currentScript.src;
  var ROOT = me ? me.replace(/shared\/chat-widget\.js(\?.*)?$/,'') : '';
  var PHOTO = ROOT + 'assets/erik-placido-foto.png';
  var API = ROOT + 'api/chat/';
  var SID_KEY = 'pf-chat-sid', READ_KEY = 'pf-chat-read';

  var COPY = {
    pt: { greet:'Olá! 👋 Quer falar sobre um case ou uma proposta? Escreve aqui — chega direto pro Erik e a resposta dele aparece neste chat.',
          placeholder:'Escreva sua mensagem…',
          sent:'Enviado. A resposta aparece aqui — pode fechar e voltar depois.',
          failed:'Não consegui enviar agora. Tente de novo em instantes ou escreva para erik.placido@gmail.com.',
          limited:'Muitas mensagens seguidas. Espere um pouco e tente de novo.',
          status:'Geralmente responde rápido', aria:'Conversar com o Erik', unread:'mensagem nova', close:'Fechar', send:'Enviar' },
    en: { greet:"Hi! 👋 Want to talk about a case or a proposal? Write here — it goes straight to Erik and his reply shows up in this chat.",
          placeholder:'Type your message…',
          sent:'Sent. The reply will show up here — feel free to close this and come back later.',
          failed:"Couldn't send right now. Try again in a moment or email erik.placido@gmail.com.",
          limited:'Too many messages in a row. Wait a little and try again.',
          status:'Usually replies fast', aria:'Chat with Erik', unread:'new message', close:'Close', send:'Send' },
    es: { greet:'¡Hola! 👋 ¿Quieres hablar sobre un case o una propuesta? Escribe aquí — le llega directo a Erik y su respuesta aparece en este chat.',
          placeholder:'Escribe tu mensaje…',
          sent:'Enviado. La respuesta aparece aquí — puedes cerrar y volver después.',
          failed:'No pude enviarlo ahora. Inténtalo de nuevo en un momento o escribe a erik.placido@gmail.com.',
          limited:'Demasiados mensajes seguidos. Espera un poco e inténtalo de nuevo.',
          status:'Suele responder rápido', aria:'Hablar con Erik', unread:'mensaje nuevo', close:'Cerrar', send:'Enviar' },
    fr: { greet:"Salut ! 👋 Envie de parler d'un projet ? Écris ici — ça arrive directement à Erik et sa réponse s'affiche dans ce chat.",
          placeholder:'Écris ton message…',
          sent:'Envoyé. La réponse s’affichera ici — tu peux fermer et revenir plus tard.',
          failed:"Impossible d'envoyer pour l'instant. Réessaie dans un moment ou écris à erik.placido@gmail.com.",
          limited:'Trop de messages d’affilée. Attends un peu et réessaie.',
          status:'Répond généralement vite', aria:'Discuter avec Erik', unread:'nouveau message', close:'Fermer', send:'Envoyer' }
  };
  function getLang(){ return (window.PORTFOLIO_I18N && window.PORTFOLIO_I18N.getLang) ? window.PORTFOLIO_I18N.getLang() : 'pt' }
  var lang = getLang();
  var t = COPY[lang] || COPY.pt;
  var esc = function(s){ return String(s).replace(/[&<>"]/g,function(m){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[m]}) };

  // localStorage pode faltar (aba anônima, bloqueio): aí a conversa dura só esta página
  function saved(k, v){
    try { if (v === undefined) return localStorage.getItem(k); localStorage.setItem(k, String(v)) } catch(e){}
    return null;
  }
  function newSid(){
    var a = new Uint8Array(18);
    crypto.getRandomValues(a);
    return btoa(String.fromCharCode.apply(null, a)).replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/,'');
  }

  var wrap = document.createElement('div');
  wrap.className = 'chat-widget';
  wrap.id = 'chat-widget';
  wrap.innerHTML =
    '<div class="chat-panel" id="chat-panel" hidden role="dialog" aria-label="'+esc(t.aria)+'">' +
      '<div class="chat-panel-head">' +
        '<img src="'+PHOTO+'" alt="">' +
        '<div><b>Erik Plácido</b><span>'+esc(t.status)+'</span></div>' +
        '<button type="button" class="chat-close" id="chat-close" aria-label="'+esc(t.close)+'">&times;</button>' +
      '</div>' +
      '<div class="chat-thread" id="chat-thread" role="log" aria-live="polite"><div class="chat-msg them">'+esc(t.greet)+'</div></div>' +
      '<form class="chat-input-row" id="chat-form">' +
        '<input type="text" id="chat-input" placeholder="'+esc(t.placeholder)+'" autocomplete="off" maxlength="1000">' +
        '<input type="text" name="website" class="chat-hp" id="chat-hp" tabindex="-1" autocomplete="off" aria-hidden="true">' +
        '<button type="submit" id="chat-send" aria-label="'+esc(t.send)+'"><i class="fa-solid fa-paper-plane"></i></button>' +
      '</form>' +
    '</div>' +
    '<button type="button" class="chat-avatar-btn" id="chat-avatar-btn" aria-haspopup="dialog" aria-expanded="false" aria-controls="chat-panel" aria-label="'+esc(t.aria)+'">' +
      '<img src="'+PHOTO+'" alt="">' +
      '<span class="chat-dot" aria-hidden="true"></span>' +
      '<span class="chat-bubble-peek" aria-hidden="true">🙂</span>' +
      '<span class="chat-unread" id="chat-unread" aria-hidden="true" hidden></span>' +
    '</button>';
  document.body.appendChild(wrap);

  var avatarBtn = document.getElementById('chat-avatar-btn');
  var panel = document.getElementById('chat-panel');
  var closeBtn = document.getElementById('chat-close');
  var form = document.getElementById('chat-form');
  var input = document.getElementById('chat-input');
  var honeypot = document.getElementById('chat-hp');
  var thread = document.getElementById('chat-thread');
  var badge = document.getElementById('chat-unread');

  var sid = saved(SID_KEY);              // só existe depois da primeira mensagem enviada
  var since = 0;                         // quantas mensagens da conversa já vieram do servidor
  var readUpTo = Number(saved(READ_KEY) || 0);
  var rendered = {};                     // posições da conversa já desenhadas
  var unread = 0, sending = false, hintShown = false, timer = null, lastActivity = Date.now();

  function addMsg(text, cls){
    var m = document.createElement('div');
    m.className = 'chat-msg ' + cls;
    m.textContent = text;
    thread.appendChild(m);
    thread.scrollTop = thread.scrollHeight;
    return m;
  }

  function setUnread(n){
    unread = n;
    badge.hidden = !n;
    badge.textContent = n > 9 ? '9+' : String(n);
    avatarBtn.setAttribute('aria-label', n ? t.aria + ' (' + n + ' ' + t.unread + ')' : t.aria);
  }
  function markRead(){ readUpTo = since; saved(READ_KEY, since); setUnread(0) }

  function open(){
    panel.hidden = false; wrap.classList.add('open');
    avatarBtn.setAttribute('aria-expanded','true');
    markRead();
    thread.scrollTop = thread.scrollHeight; // o histórico pode ter chegado com o painel escondido
    setTimeout(function(){ input.focus() }, 50);
    poll();
  }
  function close(){
    panel.hidden = true; wrap.classList.remove('open');
    avatarBtn.setAttribute('aria-expanded','false');
    schedule();
  }
  avatarBtn.addEventListener('click', function(){ panel.hidden ? open() : close() });
  closeBtn.addEventListener('click', close);
  document.addEventListener('keydown', function(e){ if(e.key==='Escape' && !panel.hidden) close() });

  function render(list, from){
    var fresh = 0;
    list.forEach(function(m, i){
      var idx = from + i;
      if (rendered[idx]) return;
      rendered[idx] = true;
      addMsg(m.text, m.from === 'erik' ? 'them' : 'me');
      if (m.from === 'erik' && idx >= readUpTo) fresh++;
    });
    since = Math.max(since, from + list.length);
    if (!panel.hidden) markRead();
    else if (fresh) setUnread(unread + fresh);
    return fresh;
  }

  /* Busca respostas só com a aba visível e só se já houver conversa:
     a cada 3s com o chat aberto e conversa recente, 8s se ela esfriou,
     30s com o chat fechado (pra acender o aviso de mensagem nova). */
  function schedule(){
    clearTimeout(timer); timer = null;
    if (!sid || document.hidden) return;
    var delay = panel.hidden ? 30000 : (Date.now() - lastActivity < 120000 ? 3000 : 8000);
    timer = setTimeout(poll, delay);
  }
  function poll(){
    clearTimeout(timer); timer = null;
    if (!sid || document.hidden) return;
    if (sending) return schedule();
    fetch(API + 'poll?sid=' + encodeURIComponent(sid) + '&since=' + since, { cache:'no-store' })
      .then(function(r){ return r.ok ? r.json() : null })
      .then(function(j){
        if (j && j.messages && j.since <= since && render(j.messages.slice(since - j.since), since)) lastActivity = Date.now();
      })
      .catch(function(){})
      .then(schedule);
  }
  document.addEventListener('visibilitychange', function(){ document.hidden ? schedule() : poll() });

  function fail(el, text, msg){
    el.classList.remove('pending'); el.classList.add('failed');
    addMsg(msg, 'sys');
    if (!input.value) input.value = text;
  }

  form.addEventListener('submit', function(e){
    e.preventDefault();
    var text = input.value.trim();
    if (!text || sending) return;
    if (!sid) { sid = newSid(); saved(SID_KEY, sid) }
    sending = true;
    lastActivity = Date.now();
    var el = addMsg(text, 'me pending');
    input.value = '';
    fetch(API + 'send', {
      method:'POST', headers:{ 'Content-Type':'application/json' },
      body: JSON.stringify({ sid:sid, text:text, lang:lang, page:location.pathname, website:honeypot.value })
    })
      .then(function(r){ return r.json().catch(function(){ return {} }).then(function(j){ return { status:r.status, j:j } }) })
      .then(function(res){
        if (res.status === 200 && typeof res.j.index === 'number') {
          el.classList.remove('pending');
          if (res.j.index >= 0) rendered[res.j.index] = true;
          if (!hintShown) { hintShown = true; addMsg(t.sent, 'sys') }
        } else {
          fail(el, text, res.status === 429 ? t.limited : t.failed);
        }
      }, function(){ fail(el, text, t.failed) })
      .then(function(){ sending = false; poll() });
  });

  window.addEventListener('portfolio-lang-change', function(){
    lang = getLang();
    t = COPY[lang] || COPY.pt;
    document.querySelector('.chat-panel-head span').textContent = t.status;
    input.placeholder = t.placeholder;
    closeBtn.setAttribute('aria-label', t.close);
    document.getElementById('chat-send').setAttribute('aria-label', t.send);
    panel.setAttribute('aria-label', t.aria);
    setUnread(unread);
  });

  // quem já conversou antes reencontra o histórico (e as respostas que chegaram)
  if (sid) poll();
})();

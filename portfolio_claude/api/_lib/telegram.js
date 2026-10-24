/* Ponte com o Telegram (Bot API oficial, grátis). O bot do site posta
   cada mensagem de visitante no grupo "Chat Site" (TELEGRAM_CHAT_ID) e
   recebe as respostas do Erik pelo webhook.
   Se o grupo tiver Tópicos ligados, cada visitante ganha um tópico
   próprio e tudo que o Erik escreve nele vai pra aquele visitante. Sem
   tópicos, tudo cai no chat do grupo e a resposta é por deslizar.
   Em teste local (CHAT_MOCK=1 sem TELEGRAM_BOT_TOKEN) só registra no
   console o que seria enviado. */
import crypto from 'node:crypto';
import * as store from './store.js';

var mockId = 1000;

export function chatId(){
  return String(process.env.TELEGRAM_CHAT_ID || (store.isMock() ? '-1000' : ''));
}

export function tgReady(){
  return !!(chatId() && (process.env.TELEGRAM_BOT_TOKEN || store.isMock()));
}

async function call(method, body){
  if (!process.env.TELEGRAM_BOT_TOKEN && store.isMock()) {
    var id = ++mockId;
    console.log('[telegram mock] ' + method + ' #' + id + ' →', JSON.stringify(body));
    if (method === 'createForumTopic' && process.env.CHAT_MOCK_TOPICS !== '1') throw new Error('telegram createForumTopic: Bad Request: the chat is not a forum');
    return { message_id: id, message_thread_id: id };
  }
  var res = await fetch('https://api.telegram.org/bot' + process.env.TELEGRAM_BOT_TOKEN + '/' + method, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
  var j = await res.json().catch(function(){ return {} });
  if (!j.ok) throw new Error('telegram ' + method + ': ' + (j.description || res.status));
  return j.result;
}

// Texto puro (sem parse_mode): nada do que o visitante escreve vira formatação.
export async function send(text, opts){
  opts = opts || {};
  var body = { chat_id: chatId(), text: text, link_preview_options: { is_disabled: true } };
  if (opts.thread) body.message_thread_id = Number(opts.thread);
  if (opts.replyTo) body.reply_parameters = { message_id: opts.replyTo, allow_sending_without_reply: true };
  if (opts.silent) body.disable_notification = true;
  return (await call('sendMessage', body)).message_id;
}

export function react(messageId, emoji){
  return call('setMessageReaction', { chat_id: chatId(), message_id: messageId, reaction: [{ type: 'emoji', emoji: emoji }] });
}

/* Tópico da conversa: reaproveita o que já existe ou cria um novo
   "#A7K2 · PT · /caju-cartao/". Se o grupo não aceitar (Tópicos
   desligados), lembra disso por 10 minutos e segue sem tópico. */
async function topicFor(sid, m){
  var have = await store.getStr('sidtopic:' + sid);
  if (have) return have;
  if (await store.getStr('notopics')) return null;
  try {
    var t = await call('createForumTopic', { chat_id: chatId(), name: ('#' + m.code + ' · ' + m.lang.toUpperCase() + (m.page ? ' · ' + m.page : '')).slice(0, 128) });
    var id = String(t.message_thread_id);
    await store.setStr('sidtopic:' + sid, id, store.TTL);
    await store.setStr('topic:' + id, sid, store.TTL);
    return id;
  } catch (e) {
    console.error('[telegram] sem tópico:', e.message);
    await store.setStr('notopics', '1', 600);
    return null;
  }
}

/* Posta a mensagem do visitante e devolve o message_id, que o webhook
   usa pra saber a qual visitante pertence uma resposta deslizada. Se o
   Erik apagou o tópico, cria outro e tenta de novo. Com tradução, vai o
   original e, embaixo, o português. */
export async function notify(sid, m){
  var head = '💬 #' + m.code + ' · ' + m.lang.toUpperCase() + (m.page ? ' · ' + m.page : '');
  var body = m.text + (m.pt ? '\n\n🇧🇷 ' + m.pt : m.untranslated ? '\n\n⚠️ Não consegui traduzir esta.' : '');
  for (var attempt = 0; attempt < 2; attempt++) {
    var thread = await topicFor(sid, m);
    var hint = !m.first ? '' : thread
      ? '\n\n↩️ Responda aqui neste tópico — tudo que você escrever nele vai pra esse visitante.'
      : '\n\n↩️ Responda deslizando esta mensagem (ou comece com #' + m.code + ').';
    if (m.first && m.pt) hint += ' Escreva em português: o visitante recebe em ' + m.lang.toUpperCase() + '.';
    try {
      return await send(head + '\n' + body + hint, { thread: thread });
    } catch (e) {
      if (!thread || attempt) throw e;
      console.error('[telegram] tópico sumiu, criando outro:', e.message);
      await store.del('topic:' + thread);
      await store.del('sidtopic:' + sid);
    }
  }
}

export async function sidForTopic(thread){ return store.getStr('topic:' + thread) }

// Confere o X-Telegram-Bot-Api-Secret-Token, definido no setWebhook.
export function validSecret(header){
  var secret = process.env.TELEGRAM_WEBHOOK_SECRET;
  if (!secret || !header) return false;
  var a = Buffer.from(header), b = Buffer.from(secret);
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

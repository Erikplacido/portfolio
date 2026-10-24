/* Ponte com o Telegram (Bot API oficial, grátis). O bot do site posta
   cada mensagem de visitante no grupo "Chat Site" (TELEGRAM_CHAT_ID) e
   recebe as respostas do Erik pelo webhook. Em teste local (CHAT_MOCK=1
   sem TELEGRAM_BOT_TOKEN) só registra no console o que seria enviado. */
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
    return { message_id: id };
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
export async function send(text, replyTo){
  var body = { chat_id: chatId(), text: text, link_preview_options: { is_disabled: true } };
  if (replyTo) body.reply_parameters = { message_id: replyTo, allow_sending_without_reply: true };
  return (await call('sendMessage', body)).message_id;
}

export function react(messageId, emoji){
  return call('setMessageReaction', { chat_id: chatId(), message_id: messageId, reaction: [{ type: 'emoji', emoji: emoji }] });
}

/* Posta a mensagem do visitante no grupo e devolve o message_id, que o
   webhook usa pra saber a qual visitante pertence a resposta deslizada. */
export function notify(m){
  var head = '💬 #' + m.code + ' · ' + m.lang.toUpperCase() + (m.page ? ' · ' + m.page : '');
  var hint = m.first ? '\n\n↩️ Responda deslizando esta mensagem (ou comece com #' + m.code + ').' : '';
  return send(head + '\n' + m.text + hint);
}

// Confere o X-Telegram-Bot-Api-Secret-Token, definido no setWebhook.
export function validSecret(header){
  var secret = process.env.TELEGRAM_WEBHOOK_SECRET;
  if (!secret || !header) return false;
  var a = Buffer.from(header), b = Buffer.from(secret);
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

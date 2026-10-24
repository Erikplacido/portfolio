/* POST /api/telegram/webhook — o Telegram manda aqui o que acontece no
   grupo "Chat Site" (configurado com dev/telegram-setup.mjs). Só conta o
   que vem desse grupo. A resposta vai pro visitante certo, nesta ordem:
     1. "#CODE texto" no começo da mensagem;
     2. qualquer mensagem dentro do tópico do visitante (grupo com Tópicos);
     3. "Responder" (deslizar) numa mensagem de visitante.
   Fora disso nada é enviado, e o bot avisa no grupo que a mensagem não
   foi pra ninguém. */
import * as store from '../_lib/store.js';
import { chatId, send, react, sidForTopic, validSecret } from '../_lib/telegram.js';

export async function POST(request){
  if (!validSecret(request.headers.get('x-telegram-bot-api-secret-token'))) return new Response('forbidden', { status: 403 });
  var update;
  try { update = await request.json() } catch (e) { return new Response('ok') }

  var m = update && update.message;
  if (m && String(m.chat && m.chat.id) === chatId() && !(m.from && m.from.is_bot)) {
    try {
      // o Telegram reenvia o mesmo update se a resposta demorar ou falhar
      if (await store.setOnce('seen:' + update.update_id, '1', 60 * 60 * 48)) await handle(m);
    } catch (e) {
      console.error('[telegram/webhook]', e.message);
    }
  }
  // sempre 200: senão o Telegram fica reenviando
  return new Response('ok');
}

async function handle(m){
  var text = String(m.text || '').trim();
  var thread = m.is_topic_message ? m.message_thread_id : null;
  var replyTo = m.reply_to_message && m.reply_to_message.message_id;
  var tag = text.match(/^#([A-Za-z0-9]{4})\b[:\s]*/);
  if (!text && !m.caption && !m.photo && !m.voice && !m.audio && !m.video && !m.document && !m.sticker) return; // entrou alguém, criou tópico, mudou o nome etc.
  var warn = function(msg){ return send(msg, { replyTo: m.message_id, thread: thread }) };

  var sid = null;
  if (tag) {
    sid = await store.sidForCode(tag[1].toUpperCase());
    text = text.slice(tag[0].length).trim();
    if (!sid) return warn('⚠️ Não achei a conversa #' + tag[1].toUpperCase() + ' (pode ter expirado). Nada foi enviado.');
  } else if (thread) {
    sid = await sidForTopic(thread);
    if (!sid) return warn('⚠️ Esse tópico não é de um visitante, ou a conversa expirou. Nada foi enviado.');
  } else if (replyTo) {
    sid = await store.getStr('ctx:' + replyTo);
    if (!sid) return warn('⚠️ Essa mensagem não é de um visitante, ou a conversa expirou. Nada foi enviado.');
  } else {
    return warn('ℹ️ Isso não foi pra nenhum visitante. Pra responder, deslize a mensagem do visitante (ou segure → Responder) ou comece com #CÓDIGO.');
  }

  if (!m.text) return warn('⚠️ Por enquanto o chat do site só repassa texto. Isso não foi pro visitante.');
  if (!text) return warn('⚠️ Mensagem vazia — nada foi enviado.');

  await store.append(sid, { from: 'e', text: text.slice(0, 4000), ts: Date.now() });
  try { await react(m.message_id, '👍') } catch (e) { console.error('[telegram/webhook] reação:', e.message) }
}

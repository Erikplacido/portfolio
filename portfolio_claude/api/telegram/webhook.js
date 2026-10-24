/* POST /api/telegram/webhook — o Telegram manda aqui o que acontece no
   grupo "Chat Site" (configurado com dev/telegram-setup.mjs). Só conta o
   que vem desse grupo. A resposta vai pro visitante certo por "Responder"
   (deslizar) numa mensagem de visitante ou por "#CODE texto" no começo.
   Sem nenhum dos dois nada é enviado: o grupo continua livre pra anotações. */
import * as store from '../_lib/store.js';
import { chatId, send, react, validSecret } from '../_lib/telegram.js';

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
  var replyTo = m.reply_to_message && m.reply_to_message.message_id;
  var tag = text.match(/^#([A-Za-z0-9]{4})\b[:\s]*/);
  if (!text && !replyTo) return; // entrou alguém, mudou o nome do grupo etc.

  var sid = null;
  if (tag) {
    sid = await store.sidForCode(tag[1].toUpperCase());
    text = text.slice(tag[0].length).trim();
  } else if (replyTo) {
    sid = await store.getStr('ctx:' + replyTo);
  } else {
    return; // mensagem solta no grupo: não é pra ninguém
  }

  if (!sid) {
    await send(tag
      ? '⚠️ Não achei a conversa #' + tag[1].toUpperCase() + ' (pode ter expirado). Nada foi enviado.'
      : '⚠️ Essa mensagem não é de um visitante, ou a conversa expirou. Nada foi enviado.', m.message_id);
    return;
  }
  if (!m.text) { await send('⚠️ Por enquanto o chat do site só repassa texto. Isso não foi pro visitante.', m.message_id); return }
  if (!text) { await send('⚠️ Mensagem vazia — nada foi enviado.', m.message_id); return }

  await store.append(sid, { from: 'e', text: text.slice(0, 4000), ts: Date.now() });
  try { await react(m.message_id, '👍') } catch (e) { console.error('[telegram/webhook] reação:', e.message) }
}

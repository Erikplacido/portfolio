/* Configuração do bot do chat. Lê TELEGRAM_BOT_TOKEN e
   TELEGRAM_WEBHOOK_SECRET do .env.local (ou do terminal).

     node dev/telegram-setup.mjs                      → mostra o bot e os grupos em que ele está (pra achar o TELEGRAM_CHAT_ID)
     node dev/telegram-setup.mjs https://seu-dominio  → liga o webhook do site
     node dev/telegram-setup.mjs --off                → desliga o webhook (pra voltar a listar grupos)

   Passo a passo completo: CHAT-TELEGRAM.md */
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadEnv } from './env.mjs';

loadEnv(path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..'));
var TOKEN = process.env.TELEGRAM_BOT_TOKEN;
if (!TOKEN) { console.error('Falta TELEGRAM_BOT_TOKEN (coloque no .env.local).'); process.exit(1) }

async function tg(method, body){
  var res = await fetch('https://api.telegram.org/bot' + TOKEN + '/' + method, {
    method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body || {})
  });
  var j = await res.json();
  if (!j.ok) throw new Error(method + ': ' + j.description);
  return j.result;
}

var arg = process.argv[2];
var me = await tg('getMe');
console.log('Bot: @' + me.username + ' (id ' + me.id + ')');

if (arg === '--off') {
  await tg('deleteWebhook');
  console.log('Webhook desligado.');
} else if (arg) {
  var secret = process.env.TELEGRAM_WEBHOOK_SECRET;
  if (!secret || !/^[A-Za-z0-9_-]{16,256}$/.test(secret)) {
    console.error('TELEGRAM_WEBHOOK_SECRET precisa ter de 16 a 256 caracteres, só letras, números, _ e -.');
    process.exit(1);
  }
  var url = arg.replace(/\/+$/, '') + '/api/telegram/webhook';
  await tg('setWebhook', { url: url, secret_token: secret, allowed_updates: ['message'], drop_pending_updates: true });
  var info = await tg('getWebhookInfo');
  console.log('Webhook ligado em ' + info.url + (info.last_error_message ? '\nÚltimo erro: ' + info.last_error_message : ''));
} else {
  var hook = await tg('getWebhookInfo');
  if (hook.url) {
    console.log('Webhook ligado em ' + hook.url + (hook.last_error_message ? '\nÚltimo erro: ' + hook.last_error_message : ''));
    console.log('(Com o webhook ligado não dá pra listar grupos. Use --off antes, se precisar.)');
  } else {
    var updates = await tg('getUpdates');
    var chats = {};
    updates.forEach(function(u){
      var c = (u.message || u.my_chat_member || {}).chat;
      if (c && c.type !== 'private') chats[c.id] = c.title;
    });
    var ids = Object.keys(chats);
    if (!ids.length) console.log('Nenhum grupo ainda. Adicione o bot ao grupo "Chat Site", mande um "oi" lá e rode de novo.');
    ids.forEach(function(id){ console.log('Grupo "' + chats[id] + '" → TELEGRAM_CHAT_ID=' + id) });
  }
  var cid = process.env.TELEGRAM_CHAT_ID;
  if (cid) {
    var member = await tg('getChatMember', { chat_id: cid, user_id: me.id }).catch(function(e){ return { status: 'erro: ' + e.message } });
    console.log('No grupo ' + cid + ' o bot é: ' + member.status + (member.status === 'administrator' ? ' ✓' : '  ← precisa ser administrador pra ver as mensagens com #CÓDIGO'));
    var chat = await tg('getChat', { chat_id: cid }).catch(function(){ return {} });
    console.log(chat.is_forum
      ? 'Tópicos: ligados ✓ (um tópico por visitante)' + (member.can_manage_topics ? '' : '  ← o bot precisa da permissão "Gerenciar tópicos"')
      : 'Tópicos: desligados (respostas por deslizar). Pra um tópico por visitante, ligue Tópicos nas configurações do grupo.');
  }
}

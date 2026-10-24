/* Simula uma resposta sua no grupo do Telegram, no servidor local: monta
   o mesmo POST que o Telegram mandaria pro webhook.

     node dev/reply.mjs A7K2 "Oi! Obrigado pela mensagem."        → "#A7K2 texto"
     node dev/reply.mjs --reply 1001 "Oi! Obrigado pela mensagem." → deslizando a mensagem 1001

   O código (#A7K2) e o número da mensagem aparecem no console do
   `npm run dev` quando o visitante escreve. Só no modo de teste. */
var args = process.argv.slice(2);
var replyTo = null, code = null;
if (args[0] === '--reply') { replyTo = Number(args[1]); args = args.slice(2) }
else { code = args[0]; args = args.slice(1) }
var text = args.join(' ');
if ((!code && !replyTo) || !text) { console.error('uso: node dev/reply.mjs CODIGO "texto"  |  node dev/reply.mjs --reply ID "texto"'); process.exit(1) }

var base = process.env.CHAT_URL || 'http://127.0.0.1:8780';
var chat = Number(process.env.TELEGRAM_CHAT_ID || -1000);
var message = {
  message_id: Math.floor(Math.random() * 1e6) + 5000, date: Math.floor(Date.now() / 1000),
  chat: { id: chat, type: 'group', title: 'Chat Site' }, from: { id: 42, is_bot: false, first_name: 'Erik' },
  text: code ? '#' + code + ' ' + text : text
};
if (replyTo) message.reply_to_message = { message_id: replyTo, chat: message.chat, from: { id: 1, is_bot: true } };

var res = await fetch(base + '/api/telegram/webhook', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', 'X-Telegram-Bot-Api-Secret-Token': process.env.TELEGRAM_WEBHOOK_SECRET || 'dev-secret' },
  body: JSON.stringify({ update_id: Date.now(), message: message })
});
console.log(res.status, await res.text());

/* POST /api/chat/send — mensagem do visitante pro grupo "Chat Site" no
   Telegram do Erik.
   Corpo: { sid, text, lang, page, website }. `website` é o campo-isca
   escondido do widget: se vier preenchido é robô, e a resposta finge
   sucesso sem enviar nada. */
import { json, readJson, ipHash, SID } from '../_lib/http.js';
import * as store from '../_lib/store.js';
import { notify, tgReady } from '../_lib/telegram.js';
import { toPortuguese, translateReady } from '../_lib/translate.js';

var LANGS = ['pt', 'en', 'es', 'fr'];
var MAX_LEN = 1000;
var MAX_MSGS = 200; // por conversa

export async function POST(request){
  if (!store.storeReady() || !tgReady()) return json({ error: 'unavailable' }, 503);
  // exigir JSON obriga um preflight de CORS, que fica sem resposta: só o próprio site consegue postar
  if ((request.headers.get('content-type') || '').indexOf('application/json') !== 0) return json({ error: 'bad_request' }, 415);

  var body = await readJson(request, 8192);
  if (!body || !SID.test(String(body.sid || ''))) return json({ error: 'bad_request' }, 400);
  if (body.website) return json({ ok: true, index: -1 });

  var sid = body.sid;
  var text = String(body.text || '').replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '').trim().slice(0, MAX_LEN);
  if (!text) return json({ error: 'empty' }, 400);
  var lang = LANGS.indexOf(body.lang) > -1 ? body.lang : 'pt';
  var page = String(body.page || '').slice(0, 120).replace(/[^\w\-./]/g, '');

  try {
    if (await store.hit('s:' + sid, 60) > 6) return json({ error: 'rate_limited' }, 429);
    if (await store.hit('ip:' + ipHash(request), 600) > 20) return json({ error: 'rate_limited' }, 429);
    if (await store.hit('all', 3600) > Number(process.env.CHAT_MAX_PER_HOUR || 60)) return json({ error: 'rate_limited' }, 429);
    var n = await store.count(sid);
    if (n >= MAX_MSGS) return json({ error: 'rate_limited' }, 429);

    var code = await store.codeFor(sid);
    // a língua que vale é a da mensagem, não a do site; é nela que o Erik vai responder
    var prev = await store.getStr('vlang:' + sid);
    var tr = translateReady() ? await toPortuguese(text, { site: lang, prev: prev }) : null;
    var said = tr ? tr.lang : prev || lang;
    await store.setStr('vlang:' + sid, said, store.TTL);
    // primeiro entrega no Telegram; só grava se a entrega deu certo
    var msgId = await notify(sid, { code: code, lang: said, page: page, text: text, pt: tr ? tr.pt : '', untranslated: !tr && translateReady() && said !== 'pt', first: n === 0 });
    await store.setStr('ctx:' + msgId, sid, store.TTL);
    var index = await store.append(sid, { from: 'v', text: text, ts: Date.now() });
    return json({ ok: true, index: index });
  } catch (e) {
    console.error('[chat/send]', e.message);
    return json({ error: 'delivery_failed' }, 502);
  }
}

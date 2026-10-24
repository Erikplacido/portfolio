/* GET /api/chat/poll?sid=…&since=N — mensagens da conversa a partir da
   posição N (as do visitante e as respostas do Erik). O widget chama
   isso de tempos em tempos enquanto a aba está visível. */
import { json, SID } from '../_lib/http.js';
import * as store from '../_lib/store.js';

export async function GET(request){
  var q = new URL(request.url).searchParams;
  var sid = q.get('sid') || '';
  var since = Math.max(0, parseInt(q.get('since'), 10) || 0);
  if (!SID.test(sid)) return json({ error: 'bad_request' }, 400);
  if (!store.storeReady()) return json({ error: 'unavailable' }, 503);
  try {
    var msgs = await store.list(sid, since);
    return json({
      since: since,
      messages: msgs.map(function(m){ return { from: m.from === 'e' ? 'erik' : 'me', text: m.text, ts: m.ts } })
    });
  } catch (e) {
    console.error('[chat/poll]', e.message);
    return json({ error: 'unavailable' }, 503);
  }
}

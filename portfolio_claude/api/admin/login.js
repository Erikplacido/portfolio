/* POST /api/admin/login — { password }. Certo: grava o cookie de sessão
   do admin. Até 8 tentativas a cada 15 minutos por IP. */
import { json, readJson, ipHash } from '../_lib/http.js';
import * as store from '../_lib/store.js';
import { adminPassword, checkPassword, newSession, sessionCookie, SESSION_DAYS } from '../_lib/site.js';

export async function POST(request){
  if (!store.storeReady() || !adminPassword()) return json({ error: 'unavailable' }, 503);
  if ((request.headers.get('content-type') || '').indexOf('application/json') !== 0) return json({ error: 'bad_request' }, 415);
  var body = await readJson(request, 2048);
  if (!body) return json({ error: 'bad_request' }, 400);
  try {
    if (await store.hit('login:' + ipHash(request), 900) > 8) return json({ error: 'rate_limited' }, 429);
  } catch (e) {
    console.error('[admin/login]', e.message);
    return json({ error: 'unavailable' }, 503);
  }
  if (!checkPassword(body.password)) return json({ error: 'wrong_password' }, 401);
  var res = json({ ok: true });
  res.headers.append('Set-Cookie', sessionCookie(request, newSession(), SESSION_DAYS * 86400));
  return res;
}

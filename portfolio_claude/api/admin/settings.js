/* GET  /api/admin/settings — ajustes atuais (só com sessão do admin).
   POST /api/admin/settings — { maintenance, hidden } substitui os ajustes. */
import { json, readJson } from '../_lib/http.js';
import * as store from '../_lib/store.js';
import { isAdmin, getSettings, saveSettings } from '../_lib/site.js';

export async function GET(request){
  if (!isAdmin(request)) return json({ error: 'unauthorized' }, 401);
  if (!store.storeReady()) return json({ error: 'unavailable' }, 503);
  try { return json(await getSettings()) }
  catch (e) { console.error('[admin/settings]', e.message); return json({ error: 'unavailable' }, 503) }
}

export async function POST(request){
  if (!isAdmin(request)) return json({ error: 'unauthorized' }, 401);
  if (!store.storeReady()) return json({ error: 'unavailable' }, 503);
  // exigir JSON obriga um preflight de CORS, que fica sem resposta: só o próprio site consegue postar
  if ((request.headers.get('content-type') || '').indexOf('application/json') !== 0) return json({ error: 'bad_request' }, 415);
  var body = await readJson(request, 16384);
  if (!body) return json({ error: 'bad_request' }, 400);
  try { return json(await saveSettings(body)) }
  catch (e) { console.error('[admin/settings]', e.message); return json({ error: 'unavailable' }, 503) }
}

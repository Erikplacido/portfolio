/* POST /api/admin/logout — apaga o cookie de sessão do admin. */
import { json } from '../_lib/http.js';
import { sessionCookie } from '../_lib/site.js';

export async function POST(request){
  var res = json({ ok: true });
  res.headers.append('Set-Cookie', sessionCookie(request, '', 0));
  return res;
}

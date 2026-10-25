/* GET /api/site/config — script que as páginas carregam antes de
   shared/cases.js. Define window.PORTFOLIO_SITE com os ajustes do admin
   (manutenção e cases escondidos). Fica em cache na CDN por 10 s, então
   uma mudança no admin chega ao site em até uns 10 s. Se o Redis falhar,
   devolve os padrões: o site nunca fica fora do ar por causa disto. */
import * as store from '../_lib/store.js';
import { getSettings, DEFAULTS } from '../_lib/site.js';

export async function GET(){
  var s = DEFAULTS;
  if (store.storeReady()) {
    try { s = await getSettings() } catch (e) { console.error('[site/config]', e.message) }
  }
  var body = 'window.PORTFOLIO_SITE=' + JSON.stringify({ maintenance: s.maintenance, hidden: s.hidden }).replace(/</g, '\\u003c') + ';\n';
  return new Response(body, {
    headers: {
      'Content-Type': 'application/javascript; charset=utf-8',
      'Cache-Control': 'public, max-age=0, must-revalidate',
      'CDN-Cache-Control': 'max-age=10, stale-while-revalidate=60'
    }
  });
}

// Portão de senha do XETMON (Vercel Routing Middleware, roda no servidor).
// Nenhum arquivo do jogo é servido sem o cookie de acesso.

const PASSWORD_SHA256 = '59e948a951a0f61bbf69e70e6ec3963b702449177e9ee6ca6d0aac520d159b22';
const COOKIE = 'xetmon_acesso';
const TOKEN = '3856c869f27331c00cfd528fbe2af796792e9d6a9002d9ae';
const MAX_AGE = 60 * 60 * 24 * 30;

export const config = { matcher: '/:path*' };

async function sha256(text) {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text));
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, '0')).join('');
}

function hasAccess(request) {
  const cookies = request.headers.get('cookie') || '';
  return cookies.split(/;\s*/).includes(`${COOKIE}=${TOKEN}`);
}

function loginPage(error) {
  const html = `<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="theme-color" content="#0e0e10">
<meta name="robots" content="noindex">
<title>XETMON • acesso</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&family=Press+Start+2P&display=swap">
<style>
  *{box-sizing:border-box}
  body{margin:0;min-height:100vh;display:grid;place-items:center;padding:16px;background:#0e0e10;color:#efeff1;font:15px/1.45 Inter,system-ui,sans-serif}
  form{width:min(100%,360px);background:#18181b;border:1px solid #2f2f35;border-radius:14px;padding:28px 24px;box-shadow:0 0 0 4px #9147ff33,0 12px 40px #000a;text-align:center}
  .logo{display:inline-flex;align-items:center;gap:10px;font:800 22px Inter,sans-serif;letter-spacing:.02em}
  .logo b{color:#bf94ff}
  .logo svg{width:36px;height:36px}
  h1{font:11px/1.8 'Press Start 2P',monospace;color:#adadb8;margin:18px 0 20px;font-weight:400}
  input{width:100%;font:16px Inter,sans-serif;padding:12px 14px;border-radius:8px;border:2px solid #2f2f35;background:#0e0e10;color:#efeff1;outline:none}
  input:focus{border-color:#9147ff}
  button{margin-top:12px;width:100%;font:10px 'Press Start 2P',monospace;padding:14px;border:0;border-radius:8px;background:#9147ff;color:#fff;cursor:pointer}
  button:hover{background:#772ce8}
  .err{margin:12px 0 0;color:#ff6fa8;font-size:13px;min-height:1em}
</style>
</head>
<body>
<form method="post" action="/__acesso">
  <span class="logo"><svg viewBox="0 0 40 40" aria-hidden="true"><rect x="3" y="6" width="34" height="24" rx="7" fill="#9147ff"/><path d="M12 30l-2 7 9-7z" fill="#9147ff"/><path d="M13 12l10 12M23 12L13 24" stroke="#fff" stroke-width="3.6" stroke-linecap="round"/><circle cx="30" cy="13" r="3.4" fill="#ff3355"/></svg>XET<b>MON</b></span>
  <h1>LIVE FECHADA<br>DIGITE A SENHA</h1>
  <label for="senha" class="sr" style="position:absolute;left:-9999px">Senha</label>
  <input id="senha" name="senha" type="password" autocomplete="current-password" autofocus required>
  <button type="submit">ENTRAR</button>
  <p class="err" role="alert">${error ? 'Senha errada. Tenta de novo.' : ''}</p>
</form>
</body>
</html>`;
  return new Response(html, {
    status: 401,
    headers: { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'no-store' },
  });
}

export default async function middleware(request) {
  const url = new URL(request.url);

  if (url.pathname === '/__acesso' && request.method === 'POST') {
    const form = await request.formData().catch(() => null);
    const senha = form ? String(form.get('senha') || '') : '';
    if ((await sha256(senha)) === PASSWORD_SHA256) {
      return new Response(null, {
        status: 303,
        headers: {
          location: '/',
          'set-cookie': `${COOKIE}=${TOKEN}; Path=/; Max-Age=${MAX_AGE}; HttpOnly; Secure; SameSite=Lax`,
          'cache-control': 'no-store',
        },
      });
    }
    return loginPage(true);
  }

  if (hasAccess(request)) return;
  return loginPage(false);
}

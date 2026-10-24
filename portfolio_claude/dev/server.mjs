/* Servidor local: serve o site estático e roda as funções de /api do
   mesmo jeito que a Vercel (export GET/POST recebendo um Request).
   Lê .env.local se existir. Sem TELEGRAM_BOT_TOKEN e sem Redis, liga o
   modo de teste: conversas na memória e o "envio pro Telegram" só aparece
   aqui no console. Pra simular uma resposta sua: node dev/reply.mjs CODE "texto".

     npm run dev            → http://127.0.0.1:8780 */
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { loadEnv } from './env.mjs';

var ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
var PORT = Number(process.env.PORT || 8780);

loadEnv(ROOT);
if (!process.env.TELEGRAM_BOT_TOKEN && !process.env.KV_REST_API_URL && !process.env.UPSTASH_REDIS_REST_URL) {
  process.env.CHAT_MOCK = '1';
  process.env.TELEGRAM_WEBHOOK_SECRET = process.env.TELEGRAM_WEBHOOK_SECRET || 'dev-secret';
}

var MIME = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'application/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8', '.json': 'application/json; charset=utf-8', '.svg': 'image/svg+xml',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.gif': 'image/gif',
  '.mp4': 'video/mp4', '.webm': 'video/webm', '.pdf': 'application/pdf', '.woff2': 'font/woff2', '.woff': 'font/woff',
  '.ttf': 'font/ttf', '.wav': 'audio/wav', '.mp3': 'audio/mpeg', '.ico': 'image/x-icon'
};

async function runApi(req, res, pathname){
  // como na Vercel: /api/chat/send → api/chat/send.js; pastas com _ não viram rota
  if (pathname.split('/').some(function(p){ return p.charAt(0) === '_' || p === '..' })) return notFound(res);
  var file = path.join(ROOT, pathname + '.js');
  if (!file.startsWith(path.join(ROOT, 'api') + path.sep) || !fs.existsSync(file)) return notFound(res);
  var mod = await import(pathToFileURL(file).href);
  var handler = mod[req.method];
  if (typeof handler !== 'function') { res.writeHead(405); return res.end() }

  var chunks = [];
  for await (var c of req) chunks.push(c);
  var headers = new Headers();
  Object.entries(req.headers).forEach(function(e){ headers.set(e[0], Array.isArray(e[1]) ? e[1].join(', ') : e[1]) });
  if (!headers.has('x-forwarded-for')) headers.set('x-forwarded-for', req.socket.remoteAddress || '');
  var request = new Request('http://' + req.headers.host + req.url, {
    method: req.method, headers: headers,
    body: req.method === 'GET' || req.method === 'HEAD' ? undefined : Buffer.concat(chunks)
  });
  var response = await handler(request);
  res.writeHead(response.status, Object.fromEntries(response.headers));
  res.end(Buffer.from(await response.arrayBuffer()));
}

function notFound(res){ res.writeHead(404, { 'Content-Type': 'text/plain' }); res.end('404') }

function serveStatic(res, pathname){
  var file = path.join(ROOT, pathname);
  if (!file.startsWith(ROOT)) return notFound(res);
  if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file, 'index.html');
  if (!fs.existsSync(file) || path.basename(file).startsWith('.env')) return notFound(res);
  res.writeHead(200, { 'Content-Type': MIME[path.extname(file).toLowerCase()] || 'application/octet-stream', 'Cache-Control': 'no-cache' });
  fs.createReadStream(file).pipe(res);
}

http.createServer(function(req, res){
  var pathname = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  var p = pathname.startsWith('/api/') ? runApi(req, res, pathname) : Promise.resolve(serveStatic(res, pathname));
  p.catch(function(e){ console.error(e); if (!res.headersSent) res.writeHead(500); res.end() });
}).listen(PORT, '127.0.0.1', function(){
  console.log('portfólio em http://127.0.0.1:' + PORT + (process.env.CHAT_MOCK === '1' ? '  (chat em modo de teste)' : ''));
});

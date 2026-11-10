// Exporta cada case em JPGs para remontar no Fiverr:
//   fiverr_jpg/<NN_slug>/00_pagina-inteira.jpg  — página inteira
//   fiverr_jpg/<NN_slug>/NN_<secao>.jpg          — uma imagem por seção (abertura + cada .pf-sec),
//                                                   seções altas são divididas em partes, sem limite.
// Uso: node dev/export_fiverr_jpg.mjs [slug ...]
import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import puppeteer from 'puppeteer-core';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT = path.join(ROOT, 'fiverr_jpg');
const PORT = 8126;
const WIDTH = 1440;
const MAX_PART = 2400; // altura máx. (px CSS) de cada imagem de seção

const MIME = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'application/javascript', '.mjs': 'application/javascript',
  '.json': 'application/json', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.gif': 'image/gif',
  '.svg': 'image/svg+xml', '.woff': 'font/woff', '.woff2': 'font/woff2', '.ttf': 'font/ttf', '.mp4': 'video/mp4', '.webm': 'video/webm', '.mp3': 'audio/mpeg' };

const casesSrc = fs.readFileSync(path.join(ROOT, 'shared/cases.js'), 'utf8');
let slugs = [...casesSrc.matchAll(/slug:\s*'([^']+)'/g)].map((m) => m[1]);
if (process.argv.length > 2) slugs = process.argv.slice(2);

const server = http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split('?')[0]);
  let f = path.join(ROOT, p);
  if (fs.existsSync(f) && fs.statSync(f).isDirectory()) f = path.join(f, 'index.html');
  if (!f.startsWith(ROOT) || !fs.existsSync(f)) { res.writeHead(404); return res.end(); }
  res.writeHead(200, { 'Content-Type': MIME[path.extname(f).toLowerCase()] || 'application/octet-stream' });
  fs.createReadStream(f).pipe(res);
}).listen(PORT);

const browser = await puppeteer.launch({
  executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  headless: 'new', args: ['--no-sandbox', `--window-size=${WIDTH},900`, '--autoplay-policy=no-user-gesture-required'],
});

const report = [];
for (const [i, slug] of slugs.entries()) {
  const dir = path.join(OUT, `${String(i + 1).padStart(2, '0')}_${slug}`);
  fs.rmSync(dir, { recursive: true, force: true });
  fs.mkdirSync(dir, { recursive: true });
  const page = await browser.newPage();
  try {
    await page.setViewport({ width: WIDTH, height: 900, deviceScaleFactor: 2 });
    await page.goto(`http://localhost:${PORT}/${slug}/`, { waitUntil: 'networkidle0', timeout: 60000 });
    // percorre a página para disparar lazy-load e reveals
    await page.evaluate(async () => {
      await document.fonts.ready;
      for (let y = 0; y < document.documentElement.scrollHeight; y += 500) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 60)); }
      window.scrollTo(0, 0);
    });
    // força todo o conteúdo visível e estático; tira elementos fixos que se repetiriam nos recortes
    await page.addStyleTag({ content: `
      *,*::before,*::after{transition:none!important;animation-duration:1ms!important;animation-delay:0s!important;animation-iteration-count:1!important;scroll-behavior:auto!important}
      .rv,[class*="reveal"]{opacity:1!important;transform:none!important}
      .pf-nav,.pf-prog,[class*="chat-widget"],#chat-widget{display:none!important}
      [style*="position: fixed"],[style*="position:fixed"]{position:absolute!important}` });
    await page.evaluate(async () => {
      document.querySelectorAll('.rv').forEach((e) => e.classList.add('in'));
      document.querySelectorAll('img[loading="lazy"]').forEach((e) => { e.loading = 'eager'; });
      document.querySelectorAll('video').forEach((v) => { try { v.pause(); } catch {} });
    });
    // viewport do tamanho da página: tudo fica "na tela", então lazy-load e observers disparam
    const fullH = await page.evaluate(() => document.documentElement.scrollHeight);
    await page.setViewport({ width: WIDTH, height: Math.min(fullH, 16000), deviceScaleFactor: 2 });
    await page.evaluate(async () => {
      for (let y = 0; y < document.documentElement.scrollHeight; y += 4000) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 150)); }
      window.scrollTo(0, 0);
      document.querySelectorAll('.rv').forEach((e) => e.classList.add('in'));
      await Promise.all([...document.images].map((im) => (im.complete && im.naturalWidth ? null : new Promise((r) => { im.onload = im.onerror = r; setTimeout(r, 15000); }))));
      await Promise.all([...document.images].map((im) => im.decode().catch(() => {})));
      await new Promise((r) => setTimeout(r, 1000));
    });
    await page.setViewport({ width: WIDTH, height: 900, deviceScaleFactor: 2 });
    await new Promise((r) => setTimeout(r, 500));


    // blocos: abertura (tudo antes da 1ª seção) + cada .pf-sec + rodapé
    const blocks = await page.evaluate(() => {
      const top = (el) => el.getBoundingClientRect().top + window.scrollY;
      const secs = [...document.querySelectorAll('.pf-sec')].filter((s) => s.offsetHeight > 0 && !s.parentElement.closest('.pf-sec'));
      const H = document.documentElement.scrollHeight;
      const out = [];
      if (secs.length) out.push({ name: 'abertura', y: 0, h: top(secs[0]) });
      secs.forEach((s, k) => {
        const y = top(s); const end = k + 1 < secs.length ? top(secs[k + 1]) : y + s.offsetHeight;
        out.push({ name: s.id || `secao-${k + 1}`, y, h: end - y });
      });
      const last = out.length ? out[out.length - 1].y + out[out.length - 1].h : 0;
      if (H - last > 40) out.push({ name: 'rodape', y: last, h: H - last });
      if (!out.length) out.push({ name: 'pagina', y: 0, h: H });
      return out.filter((b) => b.h > 4);
    });

    let n = 1;
    for (const b of blocks) {
      const parts = Math.ceil(b.h / MAX_PART);
      const ph = b.h / parts;
      for (let p = 0; p < parts; p++) {
        const name = `${String(n++).padStart(2, '0')}_${b.name}${parts > 1 ? `_parte${p + 1}` : ''}.jpg`;
        await page.screenshot({ path: path.join(dir, name), type: 'jpeg', quality: 90, captureBeyondViewport: true,
          clip: { x: 0, y: b.y + p * ph, width: WIDTH, height: Math.ceil(ph) } });
      }
    }
    const covered = blocks.reduce((s, b) => s + b.h, 0);
    const H = await page.evaluate(() => document.documentElement.scrollHeight);
    report.push(`${slug}: ${n - 1} imagens + página inteira · cobertura ${Math.round((covered / H) * 100)}% de ${H}px`);
    console.log('✓', report.at(-1));
  } catch (e) {
    report.push(`${slug}: ERRO ${e.message}`);
    console.error('✗', slug, e.message);
  } finally { await page.close(); }
}
fs.writeFileSync(path.join(OUT, 'relatorio.txt'), report.join('\n') + '\n');
await browser.close();
server.close();

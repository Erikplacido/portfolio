import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import puppeteer from 'puppeteer-core';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.pdf': 'application/pdf',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf'
};

const CASES = [
  { slug: 'index', title: 'Home · Portfólio Geral', urlPath: '/' },
  { slug: 'blue-services', title: 'Blue Services' },
  { slug: 'cobra-kai', title: 'Cobra Kai' },
  { slug: 'loony-races', title: 'Loony Races' },
  { slug: 'saudosa-maloca', title: 'Saudosa Maloca' },
  { slug: 'forca-br', title: 'Força BR' },
  { slug: 'terraforming-mars', title: 'Terraforming Mars' },
  { slug: 'editorial', title: 'Editorial' },
  { slug: 'magal-e-os-formigas', title: 'Magal e os Formigas' },
  { slug: 'vistorias-risco', title: 'Vistorias de Risco' },
  { slug: 'caju-cartao', title: 'Caju' },
  { slug: 'meliuz-fatura', title: 'Méliuz' },
  { slug: 'conta-simples-ledger', title: 'Conta Simples' },
  { slug: 'itaiquara-untaforma', title: 'Itaiquara Untaforma' },
  { slug: 'hellfire-overdrive', title: 'Hellfire Overdrive' },
  { slug: 'star-marshal', title: 'Star Marshal' },
  { slug: 'musanga', title: 'Musanga' },
  { slug: 'chronos-weave', title: 'Chronos Weave' },
  { slug: 'super-batalha', title: 'Super Batalha' },
  { slug: 'editora-terceiro-nome', title: 'Editora Terceiro Nome' },
  { slug: 'invertidamente', title: 'Invertidamente' },
  { slug: 'que-seja-doce', title: 'Que Seja Doce' },
  { slug: 'credo-que-delicia', title: 'Credo que Delicia' },
  { slug: 'se-sobreviver-case', title: 'Se Sobreviver Case' },
  { slug: 'rio-shore', title: 'Rio Shore' },
  { slug: 'match-nas-estrelas', title: 'Match nas Estrelas' },
  { slug: 'ram-rotulos', title: 'RAM Rótulos' }
];

const OUTPUT_BASE = path.join(ROOT, 'fiverr_exports');
const DIR_PNG = path.join(OUTPUT_BASE, '01_fullpage_retina_png');
const DIR_PDF = path.join(OUTPUT_BASE, '03_presentation_pdf');

fs.mkdirSync(DIR_PNG, { recursive: true });
fs.mkdirSync(DIR_PDF, { recursive: true });

function startServer(port = 8125) {
  return new Promise((resolve) => {
    const server = http.createServer((req, res) => {
      let reqPath = decodeURI(req.url.split('?')[0]);
      if (reqPath === '/') reqPath = '/index.html';
      let filePath = path.join(ROOT, reqPath);
      if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
        filePath = path.join(filePath, 'index.html');
      }
      if (!fs.existsSync(filePath)) {
        res.writeHead(404);
        res.end('Not found');
        return;
      }
      const ext = path.extname(filePath).toLowerCase();
      res.writeHead(200, { 'Content-Type': MIME_TYPES[ext] || 'application/octet-stream' });
      fs.createReadStream(filePath).pipe(res);
    });

    server.listen(port, () => {
      console.log(`[HTTP] Servidor rodando em http://localhost:${port}`);
      resolve(server);
    });
  });
}

async function run() {
  const server = await startServer(8125);
  let browser = null;

  try {
    browser = await puppeteer.launch({
      executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
      headless: 'new',
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-gpu',
        '--window-size=1440,900'
      ]
    });

    console.log(`[EXPORT] Iniciando exportação de ${CASES.length} cases para Fiverr...`);

    for (let i = 0; i < CASES.length; i++) {
      const item = CASES[i];
      const indexStr = String(i + 1).padStart(2, '0');
      const filenameBase = `${indexStr}_${item.slug}`;
      const url = item.urlPath 
        ? `http://localhost:8125${item.urlPath}?preview=1`
        : `http://localhost:8125/${item.slug}/?preview=1`;

      console.log(`\n[${i + 1}/${CASES.length}] Capturando: ${item.title} (${item.slug})...`);
      
      const page = await browser.newPage();
      try {
        await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
        await page.goto(url, { waitUntil: 'networkidle0', timeout: 45000 });

        // Auto-scroll para carregar todos os elementos/imagens preguiçosas e estabilizar fontes
        await page.evaluate(async () => {
          await document.fonts.ready;
          await new Promise((resolve) => {
            let total = 0;
            const distance = 400;
            const timer = setInterval(() => {
              window.scrollBy(0, distance);
              total += distance;
              if (total >= document.body.scrollHeight) {
                clearInterval(timer);
                resolve();
              }
            }, 40);
          });
          window.scrollTo(0, 0);
        });

        // Aguarda transições e layouts concluírem
        await new Promise((r) => setTimeout(r, 1200));

        // 1. Fullpage PNG
        const pngPath = path.join(DIR_PNG, `${filenameBase}.png`);
        await page.screenshot({ path: pngPath, fullPage: true });
        const pngStats = fs.statSync(pngPath);
        console.log(`  ✓ PNG salvo: ${path.basename(pngPath)} (${(pngStats.size / 1024 / 1024).toFixed(2)} MB)`);

        // 2. Presentation PDF
        const pdfPath = path.join(DIR_PDF, `${filenameBase}.pdf`);
        await page.pdf({
          path: pdfPath,
          printBackground: true,
          width: '1440px',
          margin: { top: '0px', right: '0px', bottom: '0px', left: '0px' },
          preferCSSPageSize: false
        });
        const pdfStats = fs.statSync(pdfPath);
        console.log(`  ✓ PDF salvo: ${path.basename(pdfPath)} (${(pdfStats.size / 1024 / 1024).toFixed(2)} MB)`);

      } catch (err) {
        console.error(`  ✗ Erro ao processar ${item.slug}:`, err.message);
      } finally {
        await page.close();
      }
    }

    console.log('\n[EXPORT] Capturas principais (PNG e PDF) concluídas com sucesso!');
  } finally {
    if (browser) await browser.close();
    server.close();
  }
}

run().catch((err) => {
  console.error('[FATAL]', err);
  process.exit(1);
});

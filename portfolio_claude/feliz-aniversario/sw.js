/* Uma versão completa por cache. Atualizações só entram quando o jogador permite. */
'use strict';
const VERSION = 'v6-envelope-1';
const PREFIX = 'diario-mosca:' + new URL(self.registration.scope).pathname + ':';
const CACHE = PREFIX + VERSION;
const FILES = [
  './', 'index.html', 'pixel-polish.css', 'manifest.webmanifest', 'fonts/PixelifySans.ttf',
  'js/music-data.js', 'js/audio.js', 'js/core.js', 'js/characters.js', 'js/game.js', 'js/pwa.js', 'js/ui.js',
  'assets/envelope.png', 'assets/characters/fly.png', 'assets/characters/enemies.png', 'assets/characters/props.png',
  'assets/pixel/garden.webp', 'assets/pixel/night.webp', 'assets/pixel/pond.webp',
  'icons/icon-192.png', 'icons/icon-512.png', 'icons/maskable-512.png', 'icons/apple-touch-icon.png',
];
const KNOWN = new Set(FILES.map(path => new URL(path, self.registration.scope).pathname));
self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE);
    await cache.addAll(FILES.map(path => new Request(new URL(path, self.registration.scope), { cache: 'reload' })));
    await self.skipWaiting();
  })());
});
self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    const old = keys.filter(key => key.startsWith(PREFIX) && key !== CACHE);
    await Promise.all(old.map(key => caches.delete(key)));
    await self.clients.claim();
    if (old.length && self.clients.matchAll) {
      const clients = await self.clients.matchAll({ type: 'window' });
      await Promise.all(clients.map(c => c.navigate ? c.navigate(c.url).catch(() => {}) : null));
    }
  })());
});
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'ACTIVATE_UPDATE') self.skipWaiting();
});
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  if (event.request.method !== 'GET' || url.origin !== self.location.origin || !KNOWN.has(url.pathname)) return;
  event.respondWith((async () => {
    const cache = await caches.open(CACHE);
    const stored = await cache.match(event.request, { ignoreSearch: true });
    if (stored) return stored;
    try { return await fetch(event.request); }
    catch (_) { return new Response('O jogo ainda não foi salvo neste aparelho. Abra uma vez com internet.', { status: 503, headers: { 'Content-Type': 'text/plain; charset=utf-8' } }); }
  })());
});

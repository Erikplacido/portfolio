/* Instalação e atualização explícita: nunca recarrega uma partida em andamento. */
(function () {
  'use strict';
  let deferred = null, registration = null, reloadRequested = false;
  const standalone = () => window.matchMedia('(display-mode: standalone)').matches || window.matchMedia('(display-mode: fullscreen)').matches || navigator.standalone === true;
  const P = window.PWA = {
    installed: standalone(), canPrompt: false, offlineReady: false, updating: false,
    waiting: false, error: '', localFile: location.protocol === 'file:' || !!window.EMBED,
    supported: 'serviceWorker' in navigator && !!window.isSecureContext,
    online: navigator.onLine !== false,
  };
  function emit() { window.dispatchEvent(new CustomEvent('pwa-state')); }
  window.addEventListener('beforeinstallprompt', event => {
    event.preventDefault(); deferred = event; P.canPrompt = true; emit();
  });
  window.addEventListener('appinstalled', () => {
    deferred = null; P.installed = true; P.canPrompt = false; emit();
  });
  window.addEventListener('online', () => { P.online = true; emit(); });
  window.addEventListener('offline', () => { P.online = false; emit(); });
  P.install = async function () {
    if (!deferred) return false;
    const prompt = deferred; deferred = null; P.canPrompt = false;
    try {
      await prompt.prompt();
      const choice = await prompt.userChoice;
      P.lastChoice = choice.outcome; emit(); return choice.outcome === 'accepted';
    } catch (_) { P.error = 'A instalação não abriu. Tente pelo menu do navegador.'; emit(); return false; }
  };
  P.applyUpdate = function () {
    if (!registration || !registration.waiting || (window.G && window.G._dbg().state !== 'attract')) return false;
    reloadRequested = true; P.updating = true; emit();
    registration.waiting.postMessage({ type: 'ACTIVATE_UPDATE' }); return true;
  };
  P.check = async function () {
    if (!registration) return;
    try { await registration.update(); } catch (_) { }
  };
  async function register() {
    if (P.localFile || !P.supported) { emit(); return; }
    try {
      registration = await navigator.serviceWorker.register('sw.js', { updateViaCache: 'none' });
      P.waiting = !!registration.waiting;
      registration.addEventListener('updatefound', () => {
        const worker = registration.installing;
        if (!worker) return;
        worker.addEventListener('statechange', () => {
          if (worker.state === 'installed') { P.waiting = !!registration.waiting; emit(); }
          if (worker.state === 'redundant') { P.error = 'Não foi possível guardar esta atualização. A versão anterior continua disponível.'; emit(); }
        });
      });
      await navigator.serviceWorker.ready;
      P.offlineReady = true; emit();
    } catch (_) { P.error = 'Não foi possível preparar o modo offline. Confira a conexão e abra o jogo novamente.'; emit(); }
  }
  if ('serviceWorker' in navigator) navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (reloadRequested) location.reload();
  });
  if (document.readyState === 'complete') register();
  else window.addEventListener('load', register, { once: true });
})();

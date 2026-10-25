/* Ajustes do site que o Erik muda pelo admin (/admin/), guardados no
   mesmo Redis do chat (chave site:settings):
     { maintenance: true|false, hidden: { <slug>: true|false } }
   - maintenance: esconde todos os cases e desativa os botões de segmento;
   - hidden[slug]: true esconde o case, false mostra. Vale mais que o
     draft:true de shared/cases.js; sem entrada, vale o draft do código.
   O login do admin é uma senha só (ADMIN_PASSWORD). A sessão é um cookie
   assinado com ela: trocar a senha derruba todas as sessões. */
import crypto from 'node:crypto';
import * as store from './store.js';

var KEY = 'site:settings';
var SLUG = /^[a-z0-9-]{1,60}$/;
export var COOKIE = 'pf_admin';
export var SESSION_DAYS = 30;

export var DEFAULTS = { maintenance: false, hidden: {} };

// Aceita só o que o site conhece; qualquer outra coisa é descartada.
export function normalize(input){
  var out = { maintenance: !!(input && input.maintenance === true), hidden: {} };
  var h = input && input.hidden;
  if (h && typeof h === 'object' && !Array.isArray(h)) {
    Object.keys(h).slice(0, 200).forEach(function(slug){
      if (SLUG.test(slug) && typeof h[slug] === 'boolean') out.hidden[slug] = h[slug];
    });
  }
  return out;
}

export async function getSettings(){
  var raw = await store.getStr(KEY);
  if (!raw) return normalize(DEFAULTS);
  try { return normalize(typeof raw === 'string' ? JSON.parse(raw) : raw) } catch (e) { return normalize(DEFAULTS) }
}

export async function saveSettings(input){
  var s = normalize(input);
  s.updatedAt = Date.now();
  await store.setStr(KEY, JSON.stringify(s));
  return s;
}

/* ---- sessão do admin ---- */

// Em teste local (CHAT_MOCK=1, nunca em produção) a senha padrão é "admin".
export function adminPassword(){
  return process.env.ADMIN_PASSWORD || (store.isMock() ? 'admin' : '');
}

function key(){ return crypto.createHash('sha256').update('pf-admin|' + adminPassword()).digest() }
function sign(payload){ return crypto.createHmac('sha256', key()).update(payload).digest('base64url') }
function same(a, b){
  var x = Buffer.from(String(a)), y = Buffer.from(String(b));
  return x.length === y.length && crypto.timingSafeEqual(x, y);
}

export function checkPassword(given){
  var pw = adminPassword();
  if (!pw || typeof given !== 'string') return false;
  // compara os hashes pra não vazar o tamanho da senha pelo tempo
  var a = crypto.createHash('sha256').update(given).digest(), b = crypto.createHash('sha256').update(pw).digest();
  return crypto.timingSafeEqual(a, b);
}

export function newSession(){
  var exp = String(Date.now() + SESSION_DAYS * 864e5);
  return exp + '.' + sign(exp);
}

export function isAdmin(request){
  if (!adminPassword()) return false;
  var m = (request.headers.get('cookie') || '').match(new RegExp('(?:^|;\\s*)' + COOKIE + '=([^;]+)'));
  if (!m) return false;
  var parts = m[1].split('.');
  return parts.length === 2 && Number(parts[0]) > Date.now() && same(parts[1], sign(parts[0]));
}

// Secure só em https: no servidor local (http://127.0.0.1) o navegador recusaria o cookie.
export function sessionCookie(request, value, maxAge){
  var secure = new URL(request.url).protocol === 'https:' ? '; Secure' : '';
  return COOKIE + '=' + value + '; Path=/api/admin; HttpOnly; SameSite=Strict; Max-Age=' + maxAge + secure;
}

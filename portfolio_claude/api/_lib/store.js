/* Armazenamento do chat do site: Upstash Redis pela API REST (sem
   dependências npm). A integração Upstash da Vercel cria KV_REST_API_URL
   e KV_REST_API_TOKEN (ou UPSTASH_REDIS_REST_URL/TOKEN); os dois nomes
   valem. Em teste local (CHAT_MOCK=1, nunca em produção) guarda tudo na
   memória do processo.

   Chaves (prefixo pfchat:):
     msgs:<sid>   lista JSON {from:'v'|'e', text, ts} — 'v' visitante, 'e' Erik
     code:<CODE>  sid da conversa com esse código curto (#A7K2)
     sidcode:<sid> código curto da conversa
     ctx:<id>     sid da conversa que gerou essa mensagem no grupo do Telegram
     seen:<id>    update do webhook já processado (o Telegram reenvia)
     rl:*         contadores de limite de envio */

var P = 'pfchat:';
export var TTL = 60 * 60 * 24 * 30; // conversas somem 30 dias depois da última mensagem

export function isMock(){
  return process.env.CHAT_MOCK === '1' && process.env.VERCEL_ENV !== 'production';
}

function rest(){
  var url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  var token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
  return url && token ? { url: url.replace(/\/$/, ''), token: token } : null;
}

export function storeReady(){ return !!rest() || isMock() }

/* ---- memória (só teste local) ---- */
var mem = globalThis.__pfchatMem || (globalThis.__pfchatMem = new Map());
function memGet(k){
  var e = mem.get(k);
  if (e && e.exp && e.exp < Date.now()) { mem.delete(k); return null }
  return e ? e.v : null;
}
function memSet(k, v, ex){ mem.set(k, { v: v, exp: ex ? Date.now() + ex * 1000 : 0 }) }
function memRun(c){
  var op = c[0], k = c[1];
  if (op === 'GET') return memGet(k);
  if (op === 'SET') {
    var nx = c.indexOf('NX') > -1, exi = c.indexOf('EX');
    if (nx && memGet(k) != null) return null;
    memSet(k, c[2], exi > -1 ? Number(c[exi + 1]) : 0);
    return 'OK';
  }
  if (op === 'INCR') { var n = Number(memGet(k) || 0) + 1; var e = mem.get(k); mem.set(k, { v: String(n), exp: e ? e.exp : 0 }); return n }
  if (op === 'EXPIRE') { var x = mem.get(k); if (x) x.exp = Date.now() + Number(c[2]) * 1000; return x ? 1 : 0 }
  if (op === 'TTL') { var y = mem.get(k); return !y ? -2 : (y.exp ? Math.ceil((y.exp - Date.now()) / 1000) : -1) }
  if (op === 'RPUSH') { var l = memGet(k) || []; l.push(c[2]); var o = mem.get(k); mem.set(k, { v: l, exp: o ? o.exp : 0 }); return l.length }
  if (op === 'LLEN') return (memGet(k) || []).length;
  if (op === 'LRANGE') { var a = memGet(k) || []; var s = Number(c[2]), t = Number(c[3]); return a.slice(s, t < 0 ? a.length + t + 1 : t + 1) }
  throw new Error('memória: comando não suportado ' + op);
}

/* ---- Redis REST ---- */
async function pipe(cmds){
  var r = rest();
  if (!r) {
    if (isMock()) return cmds.map(memRun);
    throw new Error('store: Redis não configurado');
  }
  var res = await fetch(r.url + '/pipeline', {
    method: 'POST',
    headers: { Authorization: 'Bearer ' + r.token, 'Content-Type': 'application/json' },
    body: JSON.stringify(cmds)
  });
  var j = await res.json().catch(function(){ return null });
  if (!res.ok || !Array.isArray(j)) throw new Error('store: Redis respondeu ' + res.status);
  return j.map(function(x){ if (x.error) throw new Error('store: ' + x.error); return x.result });
}
async function one(){ return (await pipe([Array.from(arguments)]))[0] }

/* ---- operações do chat ---- */
export async function getStr(key){ return one('GET', P + key) }
export async function setStr(key, val, ttl){ return ttl ? one('SET', P + key, String(val), 'EX', String(ttl)) : one('SET', P + key, String(val)) }
export async function setOnce(key, val, ttl){ return (await one('SET', P + key, String(val), 'NX', 'EX', String(ttl))) === 'OK' }

// Conta um evento numa janela de `windowSec` segundos e devolve o total.
export async function hit(key, windowSec){
  var r = await pipe([['INCR', P + 'rl:' + key], ['TTL', P + 'rl:' + key]]);
  if (r[1] < 0) await one('EXPIRE', P + 'rl:' + key, String(windowSec));
  return r[0];
}

export async function count(sid){ return one('LLEN', P + 'msgs:' + sid) }

// Acrescenta uma mensagem e devolve a posição dela na conversa.
export async function append(sid, msg){
  var r = await pipe([
    ['RPUSH', P + 'msgs:' + sid, JSON.stringify(msg)],
    ['EXPIRE', P + 'msgs:' + sid, String(TTL)],
    ['EXPIRE', P + 'sidcode:' + sid, String(TTL)]
  ]);
  var code = await getStr('sidcode:' + sid);
  if (code) await one('EXPIRE', P + 'code:' + code, String(TTL));
  return r[0] - 1;
}

export async function list(sid, since){
  var raw = await one('LRANGE', P + 'msgs:' + sid, String(since), '-1');
  return (raw || []).map(function(s){ try { return typeof s === 'string' ? JSON.parse(s) : s } catch (e) { return null } }).filter(Boolean);
}

var ALPHA = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789'; // sem 0/O, 1/I/L
export async function codeFor(sid){
  var have = await getStr('sidcode:' + sid);
  if (have) return have;
  for (var i = 0; i < 8; i++) {
    var c = '';
    for (var j = 0; j < 4; j++) c += ALPHA[Math.floor(Math.random() * ALPHA.length)];
    if (await setOnce('code:' + c, sid, TTL)) { await setStr('sidcode:' + sid, c, TTL); return c }
  }
  throw new Error('store: não consegui gerar código curto');
}
export async function sidForCode(code){ return getStr('code:' + code) }

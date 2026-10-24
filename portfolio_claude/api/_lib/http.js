/* Ajudantes das funções /api: resposta JSON, leitura do corpo e IP. */
import crypto from 'node:crypto';

export function json(data, status){
  return new Response(JSON.stringify(data), {
    status: status || 200,
    headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' }
  });
}

export async function readJson(request, maxBytes){
  var raw = await request.text();
  if (raw.length > maxBytes) return null;
  try { var j = JSON.parse(raw); return j && typeof j === 'object' && !Array.isArray(j) ? j : null }
  catch (e) { return null }
}

// IP só entra no limite de envio, e mesmo assim como hash.
export function ipHash(request){
  var ip = (request.headers.get('x-forwarded-for') || '').split(',')[0].trim() || 'unknown';
  return crypto.createHash('sha256').update(ip).digest('hex').slice(0, 16);
}

export var SID = /^[A-Za-z0-9_-]{20,64}$/;

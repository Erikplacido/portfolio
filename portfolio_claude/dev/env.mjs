/* Lê .env.local (fora do git) pro process.env, sem sobrescrever o que já
   veio do terminal. Usado pelos scripts de dev/. */
import fs from 'node:fs';
import path from 'node:path';

export function loadEnv(root){
  var file = path.join(root, '.env.local');
  if (!fs.existsSync(file)) return;
  fs.readFileSync(file, 'utf8').split('\n').forEach(function(line){
    var m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*?)\s*(?:\s#.*)?$/);
    if (m && m[2] && !(m[1] in process.env)) process.env[m[1]] = m[2].replace(/^(['"])(.*)\1$/, '$2');
  });
}

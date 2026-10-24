"""Confere integridade dos assets sem dependências externas."""
from pathlib import Path
import hashlib
import json
import sys

root = Path(__file__).resolve().parent
manifest = json.loads((root / 'manifest.json').read_text(encoding='utf-8'))
errors = []
assets = manifest['assets']
if len(assets) != 65 or len({a['file'] for a in assets}) != 65:
    errors.append('Inventário deve conter exatamente 65 caminhos únicos.')
for asset in assets:
    path = root / asset['file']
    if not path.is_file():
        errors.append('Ausente: ' + asset['file'])
        continue
    content = path.read_bytes()
    if len(content) != asset['bytes']:
        errors.append('Tamanho alterado: ' + asset['file'])
    if hashlib.sha256(content).hexdigest() != asset['sha256']:
        errors.append('SHA-256 diferente: ' + asset['file'])
actual = {str(p.relative_to(root)) for p in (root / 'assets').rglob('*') if p.is_file()}
expected = {a['file'] for a in assets}
for extra in sorted(actual - expected):
    errors.append('Arquivo extra em assets: ' + extra)
if errors:
    print('\n'.join(errors))
    sys.exit(1)
print('OK — 65/65 assets íntegros; nomes, bytes e SHA-256 conferidos.')

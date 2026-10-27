from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit, unquote
import json, sqlite3
ROOT=Path(__file__).resolve().parents[1];DIST=ROOT/'dist'
errors=[]
class Check(HTMLParser):
 def __init__(self,path):super().__init__();self.path=path;self.h1=0
 def handle_starttag(self,tag,attrs):
  a=dict(attrs)
  if tag=='h1':self.h1+=1
  if tag=='img' and not a.get('alt'):errors.append(f'{self.path.name}: imagem sem alt')
  for attr in ('href','src'):
   if attr not in a:continue
   url=urlsplit(a[attr])
   if url.scheme or url.netloc or not url.path:continue
   if not (self.path.parent/unquote(url.path)).is_file():errors.append(f'{self.path.name}: arquivo inexistente: {url.path}')
books=json.loads((ROOT/'data/catalog.json').read_text())
assert len({b['id'] for b in books})==len(books)
for b in books:
 assert b['title'] and b['author'] and (DIST/b['legacyPath']).is_file()
 assert b['commerce']['priceCents'] is None
 assert b['commerce']['mode']=='external'
for path in DIST.glob('*.html'):
 p=Check(path);p.feed(path.read_text())
 if 'http-equiv="refresh"' not in path.read_text() and p.h1!=1:errors.append(f'{path.name}: esperado um h1, encontrado {p.h1}')
db=sqlite3.connect(':memory:');db.executescript((ROOT/'docs/commerce-schema.sql').read_text())
db.execute("INSERT INTO products VALUES ('p','Livro','catalogo',0)")
try:
 db.execute("INSERT INTO variants (id,product_id,sku,format,price_cents,stock) VALUES ('v','p','sku','brochura',100,-1)")
 errors.append('Banco aceitou estoque negativo')
except sqlite3.IntegrityError:pass
try:
 db.execute("INSERT INTO variants (id,product_id,sku,format,price_cents) VALUES ('v','inexistente','sku','brochura',100)")
 errors.append('Banco aceitou produto inexistente')
except sqlite3.IntegrityError:pass
if errors:raise SystemExit('\n'.join(errors))
print(f'OK: {len(books)} livros, {len(list(DIST.glob("*.html")))} páginas; links locais, imagens, h1, modo externo e restrições do modelo comercial.')

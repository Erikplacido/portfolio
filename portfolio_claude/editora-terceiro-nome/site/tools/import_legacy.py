"""One-time, repeatable import. Original Muse files are read-only inputs."""
from pathlib import Path
import re, html, json, unicodedata
from urllib.parse import unquote
ROOT=Path(__file__).resolve().parents[2]
OUT=ROOT/'nova-versao'
def clean(s):
    return ' '.join(html.unescape(re.sub('<[^>]+>', ' ', s)).split())
def norm(s):
    return ''.join(c for c in unicodedata.normalize('NFKD',s.lower()) if not unicodedata.combining(c))
def isbn_ok(s):
    return len(s)==13 and s.isdigit() and sum(int(c)*(1 if i%2==0 else 3) for i,c in enumerate(s))%10==0
books=[]; audit=[]
thumbs={}
for catalog in ('catalogo.html','catalogo-2.html','produtos.html'):
    text=(ROOT/catalog).read_text()
    for link,inside in re.findall(r'<a\b[^>]*href="([^"]+\.html)"[^>]*>(.*?)</a>',text,re.S):
        image=re.search(r'<img\b[^>]*(?:data-orig-src|data-muse-src)="([^"]+)"',inside)
        if image:
            file=unquote(image[1].split('?')[0])
            if (ROOT/file).is_file(): thumbs[link]=file

for path in sorted(ROOT.glob('*.html')):
    raw=path.read_text()
    blocks=[(m.start(),m.group(1),clean(m.group(1))) for m in re.finditer(r'<div\b[^>]*data-muse-type="txt_frame"[^>]*>(.*?)</div>',raw,re.S)]
    labels=[i for i,b in enumerate(blocks) if re.fullmatch(r'(apresentador|apresentação|textos complementares|coordenação geral|autor(?:a|es|as)?|organizadores|organizadoras|organizador|organizadora|textos e desenhos|textos|fotos|fotografias|organiza[çc][ãa]o|cole[çc][ãa]o)\s*:',b[2],re.I)]
    if not labels: continue
    blocks=[b for b in blocks if b[2]]
    labels=[i for i,b in enumerate(blocks) if re.fullmatch(r'(autor(?:a|es|as)?|organizadores|organizadoras|organizador|organizadora|textos e desenhos|textos|fotos|fotografias|organização|coleção|apresentador|apresentação|textos complementares|coordenação geral)\s*:',b[2],re.I)]
    first=labels[0]
    if first==0: continue
    cover=None
    for m in re.finditer(r'<img\b[^>]*>',raw):
        tag=m.group(0)
        if m.start()>blocks[first][0]: break
        if 'data-muse-src=' in tag:
            src=re.search(r'src="([^"]+)"',tag)
            width=re.search(r'(?:width|data-image-width)="(\d+)"',tag)
            if src and width and int(width[1])>150: cover=unquote(src[1].split('?')[0]); cover='images/'+cover.split('/')[-1] if cover.startswith('http') else cover
    if not cover or not (ROOT/cover).is_file():
        audit.append({'file':path.name,'issue':'Livro sem capa identificada; não importado'}); continue
    title=blocks[first-1][2]
    if len(title)>220 or title.endswith(':'): 
        audit.append({'file':path.name,'issue':'Título ambíguo; não importado'}); continue
    fields={}
    for i,(_,_,s) in enumerate(blocks[:-1]):
        if s.endswith(':'): fields[norm(s[:-1].strip())]=blocks[i+1][2]
    author=next((v for k,v in fields.items() if k.startswith(('autor','organiz')) or k in ('textos e desenhos','textos','fotos','fotografias','apresentador','textos complementares','coordenacao geral')),'')
    if path.name=='ninguem-humano.html': author='Coletivo Literário Bestiário'; title='Ninguém Humano'
    if not author: continue
    descriptions=[]
    for pos,body,s in blocks[first+1:]:
        if len(s)>260:
            descriptions.extend(clean(p) for p in re.findall(r'<p\b[^>]*>(.*?)</p>',body,re.S) if len(clean(p))>30)
    urls=list(dict.fromkeys(html.unescape(u) for u in re.findall(r'href="(https?://(?:www\.)?martinsfontespaulista\.com\.br/[^"]*)"',raw)))
    isbn=re.sub(r'\D','',next((v for k,v in fields.items() if k.startswith('isbn')),''))
    issues=[]
    if not isbn_ok(isbn): issues.append('ISBN ausente ou inválido')
    tokens=[x for x in re.findall(r'[a-z0-9]+',norm(title)) if len(x)>3]
    plausible=[u for u in urls if any(x in norm(u) for x in tokens)]
    # Short titles can still match exactly (Zoé, Pai, Ócio).
    if len(norm(title))<=4: plausible=[u for u in urls if '/'+norm(title)+'-' in norm(u)]
    if len(plausible)!=1: issues.append('Destino da livraria requer revisão')
    # Do not expose unverified inherited product URLs. Review can enable per book.
    book={'id':path.stem,'legacyPath':path.name,'title':title,'author':author,'collection':fields.get('colecao',''), 'cover':cover,'thumbnail':thumbs.get(path.name,cover),'description':list(dict.fromkeys(descriptions)), 'isbn':isbn if isbn_ok(isbn) else None,'legacyIsbn':isbn,'pages':fields.get('paginas',''),'format':fields.get('formato',''),'binding':fields.get('acabamento',''),'commerce':{'mode':'external','externalUrl':'https://www.martinsfontespaulista.com.br/','externalProductVerified':False,'legacyUrls':urls,'priceCents':None,'currency':'BRL','sku':None,'weightGrams':None,'inventoryManaged':False},'review':issues}
    books.append(book)
    for issue in issues: audit.append({'file':path.name,'issue':issue})
# Identical source pages should not become duplicate products.
unique=[]; seen={}; aliases={}
for b in books:
    key=(norm(b['title']),norm(b['author']))
    if key in seen:
        aliases[b['legacyPath']]=seen[key]
        audit.append({'file':b['legacyPath'],'issue':'Duplicata consolidada','target':seen[key]})
    else:
        seen[key]=b['legacyPath']; unique.append(b)
(OUT/'data/catalog.json').write_text(json.dumps(unique,ensure_ascii=False,indent=2)+'\n')
(OUT/'data/aliases.json').write_text(json.dumps(aliases,ensure_ascii=False,indent=2)+'\n')
(OUT/'docs/import-audit.json').write_text(json.dumps(audit,ensure_ascii=False,indent=2)+'\n')
print(f'{len(unique)} livros importados; {len(aliases)} aliases; {len(audit)} apontamentos para revisão.')
for b in unique[:8]: print(b['title'],'|',b['author'])

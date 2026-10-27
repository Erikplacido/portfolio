# Terceiro Nome — reconstrução do catálogo

Versão local para revisão. Os arquivos Muse originais não foram alterados. Não houve publicação nem troca do site em produção.

## Executar

Requer apenas Python 3.9+; não instala dependências.

```sh
python3 tools/build.py
python3 tools/check.py
python3 -m http.server 4173 --bind 127.0.0.1 --directory dist
```

Abra http://127.0.0.1:4173. A pasta `dist` é o site gerado, pronto para uma hospedagem estática após a revisão editorial. O servidor de prévia não é adequado à produção.

## Editar

- `data/catalog.json`: fonte única dos 178 livros, fichas, descrições, capas e configuração comercial por livro.
- `data/site.json`: configuração global; modo externo obrigatório nesta implementação.
- `src/style.css`: estilos estruturais e responsivos.
- `src/editorial.css`: direção visual editorial, hierarquia tipográfica e refinamentos responsivos.
- `src/catalog.js`: busca, filtros, ordenação e carregamento progressivo.
- `tools/build.py`: páginas estáticas e metadados.
- `tools/import_legacy.py`: importação inicial repetível a partir do Muse. **Reexecutar sobrescreve ajustes editoriais no catálogo.** Não faz parte do build cotidiano.
- `docs/import-audit.json`: inconsistências encontradas na extração; não representa verificação online de cada produto.
- `docs/redirects.json`: mapa de aliases para configurar redirecionamentos HTTP 301 na hospedagem definitiva.
- `docs/commerce-schema.sql`: modelo inicial de banco para a fase de vendas; ainda não conectado ao site.

## Publicação futura

Revisar textos, créditos, capas, ISBNs e links; confirmar domínio e infraestrutura; preencher `canonicalOrigin` com a origem HTTPS definitiva; mudar `indexable` para true e reconstruir. O build gera sitemap quando há uma origem definida. Manter noindex na homologação. Configurar HTTPS, 404 real, redirecionamentos 301 e cache na hospedagem. Verificar também URLs de arquivos suplementares e blog antes de substituir o site antigo.

O catálogo e as páginas de livros funcionam sem JavaScript. Busca e filtros são uma melhoria progressiva. Não existem rastreadores, cookies de marketing, cadastro de clientes, coleta de pagamento ou formulário com envio simulado.

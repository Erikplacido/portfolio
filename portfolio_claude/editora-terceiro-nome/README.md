# Case 19 · Editora Terceiro Nome

Reconstrução do site da Editora Terceiro Nome: o catálogo de 178 livros sai de uma exportação do Adobe Muse e vira um site estático gerado a partir de um único arquivo de dados. Trabalho para a editora, em 2026. A nova versão está **em revisão com a editora** e não substituiu o site público.

## Estrutura da pasta

```
editora-terceiro-nome/
  index.html      # a página do case
  assets/         # capa, card e capturas usadas no case
  site/           # o projeto entregue (build, dados, fontes, documentação)
    dist/         # site gerado; o case mostra o catálogo real num iframe
    data/ src/ tools/ docs/   # fora do deploy (.vercelignore)
    README.md     # como rodar e editar o projeto
```

O projeto foi movido para `site/` para o case ocupar a raiz da pasta, como `proto/` nos outros cases. Os caminhos do build são relativos ao próprio projeto. O `build.py` lê as imagens originais do Muse na pasta acima de `site/`, e essas imagens não estão aqui. Para reconstruir o `dist/`, rode o build na cópia original do projeto, ao lado da exportação do Muse.

## Seções

| Seção | Conteúdo | Real, recriação ou proposta |
|---|---|---|
| Abertura | capa a partir da página inicial nova | real (captura da versão de revisão) |
| Contexto | três problemas do site Muse | fatos de `site/docs/ANALISE-E-EVOLUCAO.md` |
| 01 · Dados | registro de Zoé ao lado do card que ele gera; passar o mouse destaca o campo | registro real (resumido), card recriado em HTML |
| 02 · ISBN | verificador de ISBN com quatro números do site antigo; contadores da auditoria; página de livro | verificador interativo com dados reais; números de `site/docs/import-audit.json` e `VALIDACAO.md`; captura real |
| 03 · Direção visual (faixa vermelha) | três rodadas da página inicial em abas com troca automática; capa com e sem painel | capturas reais de `site/docs/` |
| 04 · Busca | catálogo real num iframe, com buscas de exemplo | site real (`site/dist/`) |

## De onde vêm os fatos

- `site/docs/ANALISE-E-EVOLUCAO.md` e `site/docs/VALIDACAO.md`: diagnóstico do Muse, o que foi entregue, validação.
- `site/data/catalog.json` e `site/docs/import-audit.json`: 178 livros, 41 sem ISBN-13 válido, 51 links de compra a revisar, 2 duplicatas, 4 sem sinopse, 157 sem coleção.
- Contagem feita para este case: 29 dos 41 ISBNs “inválidos” são ISBN-10 com dígito verificador correto. A importação (`site/tools/import_legacy.py`) só aceita ISBN-13. O ISBN-10 `8587556134` aparece em três livros diferentes, e o ISBN-13 `9788578161910` aparece em dois (A flecha do ciúme e Meteorologistas e profetas da chuva).

## Revisar antes de publicar

- [ ] Os porquês da seção 03 (por que a rodada 1 e a rodada 2 foram trocadas) saíram das telas e da nota “nenhum painel de fundo foi adicionado atrás das capas”. Confirme se é assim que você conta a história.
- [ ] Confirmar com a editora que o catálogo de revisão pode ficar acessível em `/editora-terceiro-nome/site/dist/` (tem `noindex`, mas é público para quem tiver o link).
- [ ] O `dist/images` pesa cerca de 56 MB e entra no deploy. Se pesar demais, troque o iframe por capturas e acrescente `site/dist/` ao `.vercelignore`.
- [ ] Revisar as traduções (`shared/cases-i18n/editora-terceiro-nome.js`, en/es/fr). Os textos do verificador de ISBN e das abas da seção 03 ficam em português.
- [ ] Sem `capa_mobile.png`; no celular a capa usa o recorte padrão.

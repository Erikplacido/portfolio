# Portfólio — instruções para o Claude

Este é um portfólio estático (HTML/CSS/JS puro, sem build). O guia completo está em `README.md`; leia-o antes de criar ou alterar um case.

Regras essenciais:

- **Novo case:** siga `README.md` → "Criar um novo case". Copie `_template/` para `<slug>/`, registre o case em `shared/cases.js` e preencha a página. Pergunte ao autor o que faltar da lista do passo 0; não invente fatos, métricas, clientes ou papéis.
- **Unidade visual:** a moldura (`shared/frame.css`) controla navegação, abertura, títulos, texto, legendas e rodapé. Um case só define `--accent` e `--hl` e põe sua linguagem visual dentro de `.pf-stage` ou de uma única faixa assinatura. Não redefina `h1–h3`, `p`, `.eyebrow`, `.lede`, `figcaption`, `.callout` nem classes `.pf-*` dentro de um case.
- **Listas de cases:** seletor da navegação, "Próximo case" e os grupos por assunto da home vêm de `shared/cases.js`. Não edite essas listas à mão nas páginas.
- **Honestidade:** toda figura diz se é real, recriação ou proposta. Nada de dados pessoais reais ou segredos.
- **Movimento:** texto não se move; autoplay entrega o controle no primeiro toque; respeite `prefers-reduced-motion`; pause loops fora da tela.
- **Verificação:** sirva a pasta com `python3 -m http.server` (abrir pelo painel de navegador do app quebra caminhos relativos) e rode a checklist do passo 8 do README.

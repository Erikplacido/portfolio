# Validação da primeira versão

- Build: 178 livros, 194 páginas HTML.
- Todos os destinos locais de links e imagens existem; páginas de conteúdo têm exatamente um título principal; imagens têm texto alternativo.
- JavaScript passou na verificação de sintaxe.
- Modelo SQL carregou em SQLite; estoque negativo e referência a produto inexistente foram rejeitados.
- Navegador: busca `estevao` encontrou somente Nunca o nome do menino, de Estevão Azevedo; busca inexistente exibiu o estado vazio; limpar filtros restaurou o catálogo.
- Coleção Antropologia Hoje: 19 resultados; seleção de ordenação por autoria funcionou.
- Celular: viewport de 390 × 844, catálogo em duas colunas, sem transbordamento horizontal (largura útil e scrollWidth: 375 px).
- Página Nunca o nome do menino: botão para a página inicial da livraria e aviso de compra externa; ISBN inválido não exibido.
- Página inicial inspecionada visualmente; imagem em `preview.png`.

Limites: não houve auditoria formal de acessibilidade, teste em todos os navegadores, verificação individual online de 178 destinos, testes de pagamento ou publicação. Revisão editorial pendente: 41 registros com ISBN ausente/inválido e 51 com destino antigo suspeito/ausente, além de duas duplicatas consolidadas. Todos os links específicos de produtos aguardam confirmação; atualmente a navegação comercial abre a página inicial da livraria. Quatro livros não tiveram sinopse identificada pela importação.

## Refinamento editorial — 27/10/2026

Página inicial recomposta, navegação por coleções adicionada e estilos de catálogo e livro refinados. Build e verificação de arquivos passaram. Link Antropologia Hoje abriu o catálogo com 19 resultados. Página inicial e catálogo sem transbordamento horizontal em largura de 390 px (área útil: 375 px); logo móvel em 220 × 47,48 px, preservando a proporção. Layout de computador conferido em 1440 px. Vermelho e imagens originais preservados; nenhum painel de fundo foi adicionado atrás das capas.

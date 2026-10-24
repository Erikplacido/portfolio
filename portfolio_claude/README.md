# Portfólio — Erik Placido

Portfólio estático, sem build e sem dependências: HTML, CSS e JavaScript puro. Esta pasta é **autossuficiente**: mova-a inteira para onde quiser (repositório próprio, Netlify, Vercel, GitHub Pages) e tudo continua funcionando, porque todos os caminhos são relativos.

Este arquivo é também o **guia para criar novos cases**. Siga a seção [Criar um novo case](#criar-um-novo-case), ou peça ao Claude: _"crie um novo case no portfólio seguindo o README"_ (o `CLAUDE.md` desta pasta aponta para cá).

```
portfolio/
  index.html            # home: landing em tela cheia dividida nos 5 segmentos (PORTFOLIO_GROUPS)
  assets/                # foto de perfil etc.
  README.md             # este guia
  CLAUDE.md             # instruções curtas para o Claude Code
  shared/
    frame.css           # a moldura visual comum a todas as páginas
    frame.js            # monta seletor de cases, "próximo case", grade e injeta o chat do site
    cases.js            # REGISTRO de cases: a única lista de trabalhos e dos 5 segmentos
    segment.css          # apresentação em tela cheia (hero + capas com parallax) das páginas de segmento
    segment.js           # motor da página de segmento: lê cases.js e monta o hero + a sequência de capas
    chat-widget.css / .js  # avatar flutuante com mini-chat; mensagens vão e voltam pelo Telegram do Erik
  segmentos/
    uxui.html, tabletop.html, games.html, design-grafico.html, audiovisual.html
                         # uma página por segmento — ver "Página de segmento" abaixo
  _template/
    index.html          # ponto de partida de um case novo
  api/                  # funções da Vercel do chat (envio, leitura, webhook do Telegram) — ver CHAT-TELEGRAM.md
  dev/                  # servidor local (npm run dev) e scripts do bot do chat
  blue-services/        # Case 01 (inglês) · README próprio
    index.html
    assets/
  cobra-kai/            # Case 02 (português) · README próprio
    index.html
    assets/
```

## Ver localmente

Abrir o `index.html` direto com duplo clique funciona na maioria dos navegadores. Se alguma imagem não carregar (acontece no painel de navegador do app Claude e em alguns navegadores com arquivos do iCloud), sirva a pasta:

```bash
python3 -m http.server 8000
```

Rode o comando **dentro desta pasta** e abra http://localhost:8000.

## Página inicial

A home (`index.html`) é só a landing: um cabeçalho fino (logo EP, idioma, botão "Ver currículo", contato) e, ocupando o resto da tela (100% da largura, altura restante do viewport), uma faixa dividida nos 5 segmentos de `PORTFOLIO_GROUPS` — um bloco por segmento, com a capa do primeiro case do grupo como fundo, ícone, nome e contagem de cases. Em telas largas os blocos ficam lado a lado (coluna que cresce no hover); abaixo de 820px empilham em faixas horizontais. Tudo é montado por `shared/frame.js` a partir de `shared/cases.js` — não edite a lista de segmentos à mão em `index.html`.

Clicar num segmento abre a página dele em `segmentos/<id>.html`. Não há mais uma galeria geral de cases na home: cada segmento é a porta de entrada para os cases daquele assunto.

## Página de segmento (`segmentos/*.html`)

Cada uma das 5 páginas é só uma casca HTML (nav + `<section data-seg-hero>` + `<div data-seg-track>`, veja `segmentos/uxui.html` como referência); `shared/segment.js` lê `window.PORTFOLIO_GROUPS`/`PORTFOLIO_CASES` pelo `data-segment` do `<body>` e monta:

1. **Hero** — ícone, título, descrição, KPI e dois botões: o currículo especializado daquele segmento (campo `resume` em `PORTFOLIO_GROUPS`, em `shared/cases.js`) e "Todos os segmentos". Termina num botão redondo de seta pra baixo (`.seg-scroll-cue`) que rola até o primeiro case.
2. **Sequência de capas** — um `<section>` por case do grupo, 100vw×100vh, com `scroll-snap` (rola de um pro outro sem ponto intermediário), fade/escala ao entrar na tela (`IntersectionObserver` + classe `.in-view`) e parallax no fundo (desloca mais devagar que o scroll). Cada capa linka pro case completo. Em `prefers-reduced-motion`, o parallax e as transições somem e todas as capas já aparecem no estado final.

Para adicionar um segmento novo: acrescente um objeto em `PORTFOLIO_GROUPS` (`id`, `label`, `icon`, `color`, `resume`, `desc`, `kpi`) e copie um dos arquivos de `segmentos/` trocando só `data-segment` e os textos do `<title>`/nav — o nome do arquivo deve ser `segmentos/<id>.html`, igual ao `id` do grupo.

## Chat do site

`shared/chat-widget.js` (injetado por `frame.js` em toda página, junto com `chat-widget.css`) desenha o avatar flutuante no canto inferior direito, com um balão de saudação animado. Ao clicar, abre um mini-chat no idioma atual do site. Tudo acontece dentro do chat: nenhum pop-up, nova aba ou redirecionamento.

A mensagem do visitante vai para `api/chat/send`, que a posta num grupo "Chat Site" no Telegram do Erik, por um bot oficial. Cada visitante vira um tópico do grupo (ou, sem Tópicos, o Erik desliza a mensagem para responder). A resposta volta por `api/telegram/webhook` e o widget a busca em `api/chat/poll`. Arquitetura, configuração do bot e da Vercel, custos e uso diário: **`CHAT-TELEGRAM.md`**.

Para testar o chat localmente, use `npm run dev` (http://127.0.0.1:8780, com modo de teste sem Telegram) em vez do `python3 -m http.server`, que não roda `/api`.

---

## O princípio: moldura × case

O portfólio precisa parecer um único corpo de trabalho, mas cada projeto tem sua própria linguagem. A regra que resolve isso:

| A moldura decide (igual em todas as páginas) | O case decide (dentro de `.pf-stage` ou da faixa assinatura) |
|---|---|
| Navegação: monograma, links das seções, seletor de cases, barra de leitura | Mockups, telas, ilustrações, protótipos |
| Abertura: eyebrow `Case 0X`, título serifado com uma frase em destaque, lede, ficha de 4 itens, capa de largura total (fora do `.wrap`) | Paleta de cores e fundos dos palcos |
| Títulos de seção: eyebrow `0X · Nome`, Instrument Serif, lede em Inter | Fontes de exibição (ex.: pincel e pixel no Cobra Kai) |
| Texto corrido (Inter), legendas, callouts, cards, pills | **Uma** faixa de largura total por case (Blue: app de campo em marinho; Cobra Kai: a luta em vermelho) |
| Cores neutras, espaçamentos, raio de 28 px dos palcos | Animações e interações dos mockups |
| Rodapé escuro com "Próximo case" e contato | |

Cada case define só **duas variáveis**: `--accent` (cor assinatura) e `--hl` (destaque do sublinhado do título e dos botões principais). Os dois cases atuais usam amarelo no `--hl`, o que amarra o conjunto.

**Nunca** redefina em um case: `h1`, `h2`, `h3`, `p`, `.eyebrow`, `.lede`, `figcaption`, `.callout`, nada com prefixo `.pf-`, nem a cor de fundo da página.

---

## Criar um novo case

### 0. Reunir o material

Antes de escrever, tenha (ou pergunte ao autor) as respostas abaixo. Se o Claude estiver criando o case, ele deve perguntar o que faltar em vez de inventar.

| Pergunta | Vai para |
|---|---|
| Nome do projeto e um slug curto (`minusculas-com-hifen`) | pasta, `data-case`, `cases.js` |
| Cliente/contexto, ano, se é real ou conceito | ficha, lede |
| Seu papel e as disciplinas (ex.: Product design · UI · Branding) | eyebrow, ficha |
| O problema em uma frase | título do hero |
| 3 a 5 decisões importantes e o porquê de cada uma | seções `01…05` |
| Resultados **reais** (números, se houver) | seção de resultado |
| Imagens: capa, telas, artes finais, arquivos de trabalho | `assets/` |
| Cor assinatura e fontes da marca do projeto | `--accent`, palcos |
| O que é confidencial (nomes, dados, marca) | o que borrar ou deixar de fora |
| Idioma do case | `lang`, textos |

### 1. Copiar o modelo

```bash
cp -R _template nome-do-slug
mkdir nome-do-slug/assets
```

### 2. Preparar os assets

Coloque tudo em `nome-do-slug/assets/`.

| Arquivo | Formato e tamanho | Uso |
|---|---|---|
| `cover.jpg` | 2400×1200 (16:8), JPG/WebP, < 400 KB | capa do hero: ocupa a largura toda, recortada com `object-fit:cover` (altura de 420 a 820 px); deixe o essencial no centro |
| capa do card | 1600×1200 (4:3), pode ser o mesmo arquivo recortado | card "Próximo case" |
| telas e artes | PNG/WebP em 2× do tamanho exibido | dentro dos palcos |
| pixel art | PNG sem suavização | use a classe `px` (`image-rendering:pixelated`) |

Nada de arquivos de trabalho pesados (`.ai`, `.psd`, `.fig`), segredos, dados de clientes reais sem permissão ou fotos de pessoas sem autorização.

### 3. Registrar em `shared/cases.js`

Adicione um objeto na posição em que o case deve aparecer:

```js
{
  slug: 'nome-do-slug',                 // igual ao nome da pasta e ao data-case
  group: 'uxui',                        // id de um grupo de PORTFOLIO_GROUPS (uxui, jogos, editorial, embalagem, publicidade, cinema)
  title: 'Nome do Projeto',
  short: 'Nome curto',                  // opcional, para o seletor da navegação
  color: '#1A7F5A',                     // igual ao --accent da página
  cover: 'nome-do-slug/assets/cover.jpg',
  tags: ['Disciplina', 'Disciplina', 'Disciplina'],
  blurb: 'Uma frase sobre o projeto, até ~110 caracteres.'
}
```

Isso basta para o case aparecer **automaticamente** no grupo certo da home, no seletor de cases de todas as páginas e no card "Próximo case" do case anterior. Não edite essas listas à mão.

Para criar um assunto novo, acrescente um objeto em `PORTFOLIO_GROUPS` (no topo do mesmo arquivo) com `id`, `label` (o nome que aparece embaixo do ícone) e `icon` (uma classe `fa-…` do Font Awesome 6). Grupos sem nenhum case não aparecem.

**Publicar o site com um case ainda em produção:** acrescente `draft: true` no objeto do case. Ele some do seletor de navegação, do "Próximo case" e da home em todas as páginas, sem editar mais nada. A página do case continua funcionando normalmente para você (em `localhost`/arquivo local, ou com `?preview=1` na URL em qualquer lugar); se alguém abrir a URL direta no site já publicado, é redirecionado para a home com um aviso. Tire o `draft: true` quando o case estiver pronto para aparecer. Detalhes no comentário no topo de `shared/cases.js`.

### 4. Preencher a página

No `nome-do-slug/index.html`, substitua tudo entre `⟨ ⟩`:

1. `<html lang>`, `<title>`, `description`, `og:image`.
2. `<body data-case="nome-do-slug">`.
3. `:root{ --accent; --hl }` (o `--accent` igual ao `color` do registro).
4. Links da navegação: 3 a 6, cada um apontando para o `id` de uma seção.
5. Hero: eyebrow `Case 0X` (número = posição no `cases.js`), título com **uma** frase em `<em>`, lede de 2–3 linhas, ficha com 4 itens.

**Estrutura narrativa recomendada:**

| Seção | Fundo | Conteúdo |
|---|---|---|
| Hero | padrão | problema + capa |
| Contexto | `.pf-sec.alt` | o que estava em jogo, brief em `.callout` |
| Decisões 01–05 | alterne padrão / `.alt` | título da decisão, por quê, palco com mockup, legenda |
| Faixa assinatura (opcional, 1 só) | cor do case, largura total | a decisão mais forte |
| Sistema visual / processo | `.alt` | paleta, tipografia, componentes em `.pf-card` |
| Resultado e trade-offs | padrão | números reais ou aprendizados; o que faria diferente |

**Regras de texto:**
- Títulos de seção afirmam a decisão ("Um único lugar onde o preço é sempre honesto"), não rotulam ("Tela de reserva").
- Toda imagem tem `figcaption` dizendo se é **real**, **recriação** ou **proposta**.
- Não invente métricas. Sem número real, fale do aprendizado.
- Nomes e dados nos mockups são fictícios ou autorizados; diga isso no README do case.

### 5. Dar identidade ao case (sem quebrar a unidade)

- Fundos próprios ficam em classes de palco: `<div class="pf-stage st-meucase">`.
- Uma faixa assinatura de largura total é permitida: `<section class="pf-sec minha-faixa">` com cores próprias para `.eyebrow`, `h2` e `.lede` só dentro dela.
- Fontes de exibição do projeto entram no mesmo `<link>` do Google Fonts e são usadas **só** dentro dos palcos, nos mockups e na capa.
- Mantenha a abertura, os títulos de seção e o rodapé como no modelo.

### 6. Interação e animação

Os dois cases existentes servem de referência (`blue-services`: demo de reserva, wizard, antes/depois, abas; `cobra-kai`: tela inicial, seleção, luta, desbloqueio). Regras:

- Texto corrido nunca se move; anime formas, mockups e números.
- Autoplay sempre entrega o controle ao visitante no primeiro toque.
- Loops pausam fora da tela (padrão `data-loop` + classe `.offscreen` nos scripts dos cases).
- `prefers-reduced-motion`: sem animação, cada demo no estado final, controles funcionando.
- Interações por teclado (botões reais, `tabindex`, setas onde fizer sentido).
- Tudo em CSS/SVG/JS puro; scripts externos só de CDN com versão fixa, se for mesmo necessário.

### 7. Escrever o README do case

`nome-do-slug/README.md` com: o que tem em cada seção; o que é real, recriação ou proposta; de onde vêm os fatos; o que falta antes de publicar (imagens em alta, permissões, números).

### 8. Conferir antes de publicar

- [ ] Abre por um servidor local sem erros no console e sem imagens quebradas.
- [ ] Case aparece na home, no seletor de todas as páginas e no "Próximo case" do anterior.
- [ ] Em 375 px de largura não há rolagem horizontal.
- [ ] Com "reduzir movimento" ativado, tudo fica legível e utilizável.
- [ ] Cada imagem tem `alt` ou é decorativa (`alt=""`), e cada figura tem legenda.
- [ ] Nada confidencial, nenhum dado pessoal real sem permissão.
- [ ] `--accent` da página igual ao `color` do `cases.js`.
- [ ] Sem `draft: true` sobrando em `cases.js` (a menos que o case ainda não deva aparecer no site publicado).

---

## Referência rápida de classes da moldura

| Classe | Uso |
|---|---|
| `.wrap` | largura máxima e margens laterais |
| `.pf-nav`, `.pf-id`, `.pf-mono`, `.pf-links`, `.pf-cases[data-auto]`, `.pf-prog` | navegação |
| `.pf-hero`, `.pf-meta`, `.pf-cover`, `.pf-tools` | abertura do case |
| `.pf-sec`, `.pf-sec.alt` | seção (fundo padrão / branco) |
| `.pf-head`, `.eyebrow` (com `<b>` na cor do case), `.lede` | cabeçalho de seção |
| `.pf-stage` | palco arredondado onde vive a linguagem do case |
| `.pf-card` (+ `.tag`), `.pill`, `.pill.y`, `.tag-row`, `.callout` | blocos de conteúdo |
| `figure` + `figcaption` | imagem com legenda |
| `.rv` | revela ao rolar (o script do case adiciona `.in`) |
| `.pf-footer`, `.pf-fgrid`, `.pf-next[data-auto]`, `.pf-btn`, `.pf-base`, `[data-year]` | rodapé |
| `.pf-works[data-cases-grid]`, `.pf-work` | grade de cases (fora da home atual; a versão em grade está em `tralha/index_grade.html`) |

## Pendência conhecida

Idiomas misturados: Blue Services está em inglês e Cobra Kai em português (home e modelo em português). Para unificar, traduza os textos narrativos; o texto que aparece dentro das artes (ex.: telas do jogo) faz parte do trabalho e fica como está.

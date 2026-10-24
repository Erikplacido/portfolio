# Musanga — Inventário & Loot

Case de Game UI/UX sobre a tela de inventário de Musanga, RPG narrativo autoral em desenvolvimento (2026). Uma guerreira é trazida à força para o Brasil colônia para ser vendida como escravizada, foge e se torna a heroína que liberta outras pessoas escravizadas. A pasta mantém o nome antigo `sanctum-armory` porque o slug está registrado em `shared/cases.js`.

Revisão de outubro de 2026: a página foi refeita em cima de `tela.psd` (`../Correntes do tempo/tela.psd`, fora do portfólio). A versão anterior está em `tralha/sanctum-armory-index-v1.html` e as traduções antigas em `tralha/sanctum-armory-i18n-v1.js`.

## Seções (`index.html`)

| Seção | Conteúdo | Status das figuras |
|---|---|---|
| Hero | tese e ficha; capa com a tela no estado inicial da recriação | camadas do PSD (arte gerada por IA e editada pelo autor) montadas pela própria tela interativa |
| 01 O jogo | premissa, três princípios, lista "O que este case demonstra", referências de mercado | — |
| 02 Tooltip comparativo | cards Equipado × Novo item em HTML com pinos e anatomia em 7 pontos | recriação; valores das duas espadas vêm da arte |
| 03 Grade (faixa assinatura) | tela interativa: vestir e tirar com o corpo em camadas, arrastar e soltar entre corpo e trouxa, girar, colisão, troca de arma, filtros com contagem, carga ao vivo; regras e modelo de dados | recriação sobre camadas do PSD |
| 04 Acessibilidade | raridades com forma, padrão e partícula com a forma da raridade; peso em barras; simulação de protanopia, deuteranopia, tritanopia e sem cor | ícones recortados da arte; resto em HTML/CSS |
| 05 Sistema visual | paleta, tipografia e a prancha `direcao-visual.jpg` | prancha do autor |
| 06 Escopo | pronto, a validar, próximos passos; link para o protótipo antigo (`simulator.html`) | — |

## Assets da tela (`assets/tela/`)

Gerados do PSD com `psd-tools` e Pillow:

- `base.webp`: camada `Tela` (tela vazia) com quatro áreas retocadas por clonagem de textura para receber HTML: subtítulo da imbamba, valor e barra de carga, legenda de peso e coluna de filtros.
- `capa.webp`: a tela interativa no estado inicial, renderizada a 2× com Chrome headless e reduzida para 2304 px (capa do hero). `../card.jpg` é um recorte 4:3 dela para o card da home.
- `tela-completa.webp`: composição original do PSD, com as roupas no corpo e na trouxa ao mesmo tempo. Não é mais usada na página; fica como referência.
- Corpo em camadas, na ordem do PSD (de baixo para cima): `corpo.webp` (camada `corpo+personagem` com o `brinco_equipado`, que não tem slot), `veste-blusa.webp`, `veste-calca.webp`, `veste-colar.webp`, `veste-sandalias.webp`, `veste-bandana.webp` (camadas `*_equipada`) e `braco.webp` (camadas `Camada 72` e `Camada 69 copiar`: o braço com a corrente, que fica por cima da calça). As coordenadas de cada camada estão no `style` das imagens em `index.html`.
- Slots: `slot-vazio-<slot>.webp` são recortes do grupo `slots` (moldura com a silhueta de marcação); `slot-<item>.webp` juntam a moldura `bandana_slot_base` com o ícone `*_slot` do item. `slot-espada.webp` foi montado com a lâmina dos cards, girada como o sabre do PSD. O slot Cabeça começa 5 px abaixo do PSD para não cobrir a cedilha do rótulo.
- `item-*.webp`: camadas de cada item da grade (grupo `Itens_inventario`), sem o fundo da célula. O escurecimento da célula ocupada é CSS, com a mesma cor e opacidade do PSD.
- As versões anteriores de `personagem.webp`, `slots.webp` e de três itens estão em `../tralha/sanctum-armory-tela-v1/`.
- `arte-espada-curva.webp`, `arte-sabre.webp`: espadas recortadas dos cards, isoladas do fundo escuro pelo maior componente claro conectado.
- `arte-veneno.webp`, `raridade-*.webp`, `filtro-*.webp`: recortes da composição.

## O que é da arte e o que é proposta

- **Da arte:** layout, personagem e cada peça de roupa em camada própria, ícones dos slots, itens e suas posições na grade, os dois cards de espada (nomes, raridade, nível, valores, efeitos, slots), o veneno de sapo, a legenda de raridade com formas, os prompts de controle PlayStation.
- **Propostas da recriação:** nomes, pesos, classes, raridades e descrições dos itens que a arte não detalha; o filtro Vestuário (a arte não tinha onde filtrar roupas); barras na legenda de peso (a arte usava só cor; barras em vez de formas para não repetir os símbolos da raridade); faixas de carga em 50% e 80%; partículas com a forma da raridade, só na seção 04; o slot Punhos fica vazio porque a arte não tem item de punho na trouxa; o Cinturão de bolsas não se veste, porque não tem camada no corpo.
- **Divergências do PSD resolvidas:** o subtítulo dizia "Grade 10 × 6", mas a trouxa desenhada tem 12 × 4 células; a recriação segue o desenho. Algumas diferenças do card Novo item não batiam com os valores (velocidade, peso e atordoamento) e o card Equipado mostrava diferenças; na recriação as diferenças são calculadas dos próprios valores e o Equipado não mostra diferenças.
- A arte mostrava as roupas vestidas e, ao mesmo tempo, na trouxa (e o sabre no slot ARMA e na trouxa). A recriação segue a regra dos jogos de inventário: cada item está num lugar só. Ela começa vestida, com a espada curva na mão, e a trouxa guarda o resto.
- A carga conta só o que está na trouxa. Com tudo fora do corpo, a soma dos pesos propostos reproduz os 12,4 kg da arte; no estado inicial, vestida, são 8,4 kg.

## Interação (`case.js`)

Uma tabela `ITEMS` alimenta a grade, os cards e a anatomia. O estado guarda cada item em um só lugar: `pos` (célula da trouxa) ou `eq` (slot do corpo). Vestir apaga o item de `pos`, grava em `eq` e mostra a camada `data-wear` no corpo; se o slot estava ocupado, a peça anterior vai para o lugar da nova ou para o primeiro espaço livre. Tirar faz o inverso e devolve a peça para a posição da arte (`HOME`) ou para o primeiro espaço livre; sem espaço, recusa com o motivo.

Arrastar usa pointer events com captura (abaixo de 5 px é clique e só inspeciona): da trouxa para o corpo ou para o slot certo veste; de um slot para a trouxa tira (um fantasma do tamanho da pegada segue o ponteiro); dentro da trouxa move. Duplo clique ou E veste e tira; clique direito ou R gira; colisão marca células livres e ocupadas. O card da esquerda mostra o que está no corpo no mesmo slot do item em foco; o da direita, o item em foco ou a alternativa da trouxa. Teclado: Tab percorre itens e slots; na trouxa Enter pega, setas movem, Enter solta, Esc cancela; num slot, Enter ou E tira. Mensagens em região `aria-live`. Filtros contam e esmaecem só o que está na trouxa. A grade não tem partículas; as da seção 04 pausam fora da tela e ficam paradas com "reduzir movimento".

A tela e os cards ficam em português em todos os idiomas, por serem a UI do jogo; a narrativa da página é traduzida em `shared/cases-i18n/sanctum-armory.js`.

## Honestidade e limites

- Sem teste com jogadores e sem métricas. A simulação de daltonismo usa as matrizes de Machado et al. (2009) e é aproximação, sem declaração de conformidade.
- Objetos, pesos e raridades são propostas de jogo, sem pretensão de reconstituição histórica; as raridades não representam hierarquias culturais.

## Antes de publicar

- Revisão de sensibilidade do texto e das imagens com pessoas da área; o tema exige cuidado.
- Confirmar os nomes propostos dos itens (Torço de pano, Pano de busto, Calça de retalhos, Sandálias de couro, Colar de latão, Cinturão de bolsas, Rolo de pano, Ervas de cura, Sacos de couro, Mapa da trilha, Carta lacrada, Pó de urucum, Búzio). O Colar de latão era Bracelete de latão; o PSD novo chama a camada de colar e a desenha no pescoço.
- Assets que a página não usa mais: `cover.jpg`, `orn-*.jpg`, `simulador.jpg`, `forge_bg.jpg`, `weapon_inspection.jpg`, `musanga-cena.png`. O `simulator.html` antigo, linkado na seção 06, ainda usa `icones/` e `musanga-cena.jpg`. `direcao-visual.png` é o original da prancha.

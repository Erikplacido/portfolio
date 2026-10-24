crie essas imagens
**# Chronos Weave · Lista de componentes de UI para arte**

Peças que, feitas como imagem, deixam o simulador mais próximo da tela de referência.
Hoje todas existem desenhadas em código (CSS/SVG); cada imagem nova substitui uma delas.

**## Regras gerais**

\- **\*\*Pasta:\*\*** \`chronos-weave/assets/ui/\` (crie a pasta). Use exatamente os nomes de arquivo abaixo.
\- **\*\*Formato:\*\*** PNG com fundo transparente, salvo indicação. Ícones simples podem vir em SVG.
\- **\*\*Resolução:\*\*** o dobro do tamanho de tela (@2x). O tamanho pedido abaixo já é o @2x.
\- **\*\*Paleta:\*\***
&#x20; \- Fundo: azul quase preto \`#070B15\`
&#x20; \- Ouro: \`#C9A04A\` (brilho \`#FDE9B0\`)
&#x20; \- Ciano (Constelação I): \`#38E1FF\`
&#x20; \- Âmbar (Constelação II): \`#F2B544\`
&#x20; \- Verde-água (Constelação III): \`#2EE6B8\`
&#x20; \- Cinza bloqueado: \`#4B5B75\`
\- **\*\*Estilo:\*\*** metal envelhecido (bronze/latão) com filetes dourados e brilho de energia. É o mesmo universo da \`metal-texture.jpg\`.
\- **\*\*Brilho externo (glow):\*\*** pode vir na imagem, mas deixe margem transparente em volta para ele não ser cortado.
\- **\*\*9-slice:\*\*** peças marcadas assim são molduras que esticam. Os cantos não deformam e só o meio estica. Desenhe os cantos dentro da margem indicada e deixe o meio liso ou com padrão que se repete.

\---

**## 1. Cabeçalho**

\| # | Arquivo | Tamanho | O que é |
\|---|---|---|---|
\| 1.1 | \`logo-emblema.png\` | 128 × 128 | Medalhão redondo do jogo: aro de latão e um astrolábio pequeno no centro. Aparece em 50 px. |
\| 1.2 | \`aba-ativa.png\` (9-slice, margem 24 px) | 320 × 64 | Moldura da aba selecionada ("Árvore de Habilidades"): pontas em seta nos dois lados, borda dourada e interior âmbar translúcido. |
\| 1.3 | \`moeda-pontos.png\` | 48 × 48 | Moeda dourada com estrela de 4 pontas, ao lado do número de pontos. |

**## 2. Cards das constelações (lado esquerdo)**

\| # | Arquivo | Tamanho | O que é |
\|---|---|---|---|
\| 2.1 | \`emblema-constelacao-1.png\` | 160 × 160 | Losango com o numeral **\*\*I\*\***, cristal ciano, borda dupla e glow. |
\| 2.2 | \`emblema-constelacao-2.png\` | 160 × 160 | Igual ao anterior, com **\*\*II\*\*** em âmbar/ouro. |
\| 2.3 | \`emblema-constelacao-3.png\` | 160 × 160 | Igual, com **\*\*III\*\*** em verde-água. |
\| 2.4 | \`card-constelacao.png\` (9-slice, margem 20 px) | 660 × 180 | Fundo do card: faixa escura que esmaece para transparente à direita, com filete fino embaixo. Pode ser neutro, porque a cor vem do código. |

Os emblemas também aparecem pequenos (44 px) no painel de lore. Teste a leitura nesse tamanho.

**## 3. Nós da árvore (peça mais importante)**

São 3 formatos × 4 estados = **\*\*12 molduras\*\***. Desenhe só a moldura, **\*\*sem ícone no meio\*\***: os ícones entram por cima, pelo código.

\| Formato | Uso | Tamanho do arquivo |
\|---|---|---|
\| Círculo | Nó menor | 160 × 160 |
\| Hexágono | Nó notável | 200 × 200 |
\| Estrela de 8 pontas com círculo dentro | Keystone (ápice) | 256 × 256 |

\| Estado | Aparência |
\|---|---|
\| \`bloqueado\` | Metal escuro, aro cinza \`#4B5B75\`, sem brilho. Parece apagado. |
\| \`disponivel\` | Interior escuro, aro **\*\*ciano\*\*** brilhante e glow suave (é o nó que pede para ser clicado). |
\| \`adquirido\` | Interior preenchido com energia ciano clara e aro branco-ciano. |
\| \`maestria\` | Interior dourado (ouro claro no centro, escuro na borda), aro ouro brilhante e glow quente. |

**\*\*Nomes:\*\*** \`no-[formato]-[estado].png\`. Exemplos: \`no-circulo-bloqueado.png\`, \`no-hexagono-maestria.png\`, \`no-keystone-disponivel.png\`.

**\*\*Extras dos nós:\*\***

\| # | Arquivo | Tamanho | O que é |
\|---|---|---|---|
\| 3.1 | \`no-selecao.png\` | 256 × 256 | Anel de mira do nó selecionado: anel ciano tracejado com 4 colchetes. Gira no código. |
\| 3.2 | \`no-coroa-maestria.png\` | 256 × 256 | Anel dourado ornamental que gira em volta dos nós em maestria. |
\| 3.3 | \`selo-rank.png\` (9-slice, margem 8 px) | 96 × 40 | Plaquinha sob o nó onde aparece "1/2" ou "MAX": retângulo escuro com borda fina. Branca/neutra, porque a cor vem do código. |
\| 3.4 | \`icone-cadeado.png\` | 32 × 32 | Cadeado pequeno, claro, para nós bloqueados. |

**## 4. Ícones das habilidades**

**\*\*11 ícones em SVG\*\*** (de preferência) ou PNG 128 × 128. Use **\*\*uma cor só, branca\*\***, porque o código pinta cada um na cor do estado. O traço deve ser grosso o bastante para ler a 30 px.

\| Arquivo | Habilidade / ideia |
\|---|---|
\| \`icone-sol.svg\` | Núcleo Primordial (sol com raios) |
\| \`icone-faisca.svg\` | Faísca / estrela de 4 pontas |
\| \`icone-relogio.svg\` | Dilatação temporal |
\| \`icone-prisma.svg\` | Prisma / triângulo com olho |
\| \`icone-estrela.svg\` | Estrela de 5 pontas (notável) |
\| \`icone-raio.svg\` | Raio (energia) |
\| \`icone-escudo.svg\` | Escudo (armadura) |
\| \`icone-coracao.svg\` | Coração (vida/regeneração) |
\| \`icone-mira.svg\` | Mira (crítico) |
\| \`icone-lamina.svg\` | Lâmina / seta diagonal |
\| \`icone-keystone.svg\` | Estrela de 8 pontas com núcleo (ápice) |

**## 5. Conexões entre nós**

\| # | Arquivo | Tamanho | O que é |
\|---|---|---|---|
\| 5.1 | \`feixe-energia.png\` | 512 × 48 | Faixa horizontal de energia: núcleo branco fino, halo que se dissolve para transparente em cima e embaixo, e pulsos de luz ao longo dela. Branca, porque o código pinta em ciano, âmbar ou verde. Precisa repetir na horizontal sem emenda. |

**## 6. Inspetor (painel da direita)**

\| # | Arquivo | Tamanho | O que é |
\|---|---|---|---|
\| 6.1 | \`inspector-art.jpg\` (em \`assets/\`, não em \`ui/\`) | 1200 × 400, JPG | Faixa de clima no topo do painel: astronauta flutuando perto do astrolábio, nebulosa ao fundo. O assunto fica no meio da altura e não deve ter texto. |
\| 6.2 | \`painel-moldura.png\` (9-slice, margem 24 px) | 400 × 200 | Moldura dos cartões do inspetor: borda dourada fina, cantos com pequeno ornamento e interior escuro semitransparente. |
\| 6.3 | \`icone-no-moldura.png\` | 112 × 112 | Quadrado de cantos arredondados com aro, onde o ícone do talento aparece no card. |
\| 6.4 | \`botao-segurar.png\` (9-slice, margem 20 px) | 640 × 96 | Botão "Segure p/ adquirir": base escura, borda dourada e cantos chanfrados. |
\| 6.5 | \`botao-segurar-preenchimento.png\` | 640 × 96 | A barra que enche enquanto o botão é segurado: degradê âmbar → ciano com brilho na ponta direita. Precisa encaixar exatamente na peça 6.4. |
\| 6.6 | \`lore-astrolabio.png\` | 128 × 128 | Desenho de linha dourada de um astrolábio, ao lado do título "O Astrolábio de Chronos". |
\| 6.7 | \`divisor-ornamento.png\` | 600 × 16 | Linha divisória com pequeno ornamento central, para separar blocos. |

**## 7. Rodapé da árvore**

\| # | Arquivo | Tamanho | O que é |
\|---|---|---|---|
\| 7.1 | \`radar-moldura.png\` (9-slice, margem 16 px) | 320 × 220 | Moldura do minimapa "Radar Astrolábio". |

**## 8. Botões do controle (glyphs)**

Ícones de 64 × 64. São usados na barra "Voltar / Resetar / Zoom / Navegar", no botão de segurar e nos bumpers do topo. O simulador troca o conjunto quando você escolhe PS5, XBOX ou PC.

\| Plataforma | Arquivos |
\|---|---|
\| PlayStation | \`ps-cruz.png\`, \`ps-circulo.png\`, \`ps-triangulo.png\`, \`ps-quadrado.png\`, \`ps-l1.png\`, \`ps-r1.png\`, \`ps-analogico-l.png\`, \`ps-analogico-r.png\` |
\| Xbox | \`xbox-a.png\`, \`xbox-b.png\`, \`xbox-x.png\`, \`xbox-y.png\`, \`xbox-lb.png\`, \`xbox-rb.png\`, \`xbox-analogico-l.png\`, \`xbox-analogico-r.png\` |
\| PC | \`pc-tecla-e.png\`, \`pc-tecla-r.png\`, \`pc-tecla-esc.png\`, \`pc-tecla-q.png\`, \`pc-mouse-roda.png\`, \`pc-mouse-arrastar.png\` |

**\*\*Estilo dos glyphs:\*\*** traço claro sobre círculo ou tecla escura, todos no mesmo estilo. Para não copiar arte oficial da Sony ou da Microsoft, desenhe versões próprias, só inspiradas nos símbolos.

\---

**## Ordem sugerida**

1\. **\*\*Nós da árvore (seção 3) e ícones (seção 4):\*\*** é o que mais aparece na tela.
2\. **\*\*Emblemas das constelações (2.1–2.3)\*\*** e **\*\*feixe de energia (5.1)\*\***.
3\. **\*\*Inspetor (seção 6)\*\***, começando pela \`inspector-art.jpg\`.
4\. **\*\*Cabeçalho (seção 1)\*\*** e **\*\*glyphs (seção 8)\*\***.
5\. **\*\*Molduras 9-slice\*\*** (2.4, 6.2, 6.4, 7.1): dão acabamento, mas o CSS atual já resolve bem.

Pode entregar por partes: cada grupo que chegar na pasta eu encaixo e mostro o resultado.

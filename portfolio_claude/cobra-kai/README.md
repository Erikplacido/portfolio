# Cobra Kai · 3ª Temporada — case de portfólio

Página estática, sem dependências. Hospede a pasta `portfolio/` inteira: a página usa a moldura compartilhada em `../shared/frame.css` e `../shared/frame.js` (navegação, abertura, títulos, legendas e rodapé iguais aos da Blue). Tudo que é do jogo (cores, fontes de pincel e pixel, telas) fica dentro dos palcos `.pf-stage` e da faixa vermelha da luta. Veja `../README.md`.

```
cobra-kai/
  index.html   # página inteira (HTML + CSS + JS puro)
  assets/      # recortes da prancha original (ver abaixo)
```

## O que tem na página

| Seção | O que mostra | Interação |
|---|---|---|
| Intro | Título, descrição, Ai/Ps, ficha do projeto | — |
| Key art | Pôster com zoom lento, brilho do sol e pássaros | — |
| Como funciona | As 4 telas do jogo como cards com âncoras | Clique leva à seção |
| 01 Tela inicial | Sol listrado animado, logo em pincel com brilho, silhuetas, “Toque na tela para iniciar” piscando | Toque: flash + rola para a seleção |
| 02 Escolha o lutador | Grade 3×3 sobre o cenário das cobras, cursores 1P/2P, painel com atributos, tela VS | Mouse, setas, Enter; o slot “aleatório” sorteia |
| 03 Luta | Fundo do dojô Cobra Kai (`assets/dojo-bg.webp`), HUD arcade (retratos, placas, barras de vida, K.O., timer, pontos, combo), sprites animados, direcional e botões de fliperama Chute/Soco (o direcional acende “→” quando o P1 avança) | Botões, toque na tela ou teclas K/J; joga sozinho até você assumir |
| Sprites | Quebra de frames dos dois lutadores com preview ao vivo | Escolha 4, 8 ou 12 FPS |
| 04 Recompensa | Pontuação sobe até 999.999, barra de carregamento, revela a tela do pré-lançamento | “Ver de novo” |
| Sistema visual | Paleta, tipografia, componentes (selo K.O., barra de vida, cursor) | — |

Respeita `prefers-reduced-motion` (mostra o estado final de cada tela) e pausa as animações fora da tela.

## Antes de publicar

1. **Troque os recortes pelos arquivos originais.** Os assets foram recortados da prancha exportada (469 px de largura), por isso a key art e o fundo das cobras estão em baixa resolução. Exporte do Illustrator/Photoshop em 2× com os mesmos nomes:
   - `keyart.jpg`: pôster (≈ 2000 px de largura)
   - `select-bg.png`: cenário amarelo com as cobras e o título “Escolha o lutador”, **na mesma proporção** (938×1160), porque a grade é posicionada em % por cima dele
   - `p-*.png`: os 9 retratos quadrados (`larusso`, `lawrence`, `miguel`, `kreese`, `robby`, `tory`, `sam`, `random`, `hawk`)
   - `w1–w3.png`, `b1–b5.png`: frames dos sprites com fundo transparente, alinhados pela base
   - `silhouettes.png`: silhuetas pretas com fundo transparente
2. **Confira os nomes dos personagens** no array `FIGHTERS` do `index.html`. Identifiquei pelos retratos; os atributos (força/velocidade/técnica) e os dojôs são proposta de game design.
3. **Direitos.** Cobra Kai, Netflix e os personagens são de seus donos. O rodapé já diz que é um projeto conceitual não oficial. Mantenha isso se for publicar.

## O que eu reconstruí em código (em vez de recortar)

Logo em pincel, sol listrado, HUD, selo K.O., botões, tela do pré-lançamento e emblema. Ficam nítidos em qualquer tamanho e foram feitos para animar. Se preferir a arte original em algum desses, troque o bloco por um `<img>`.

As fontes vêm do Google Fonts: Permanent Marker (títulos), Press Start 2P (HUD), Bebas Neue (broadcast), Inter e Montserrat (texto).

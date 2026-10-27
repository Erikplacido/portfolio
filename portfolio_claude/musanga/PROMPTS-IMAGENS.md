# Musanga · prompts das imagens ornamentais

Quatro imagens para ornamentar a página do case. **Já geradas e encaixadas** (21/10/2026). A folha de ícones virou `assets/icones/*.png`; a faixa de contas foi salva como `assets/orn-contas.jpg`. Para regenerar, use os prompts abaixo e mantenha os nomes dos arquivos.

| # | Arquivo | Tamanho | Onde entra |
|---|---|---|---|
| 1 | `assets/orn-flatlay.jpg` | 2400×1200 (2:1), JPG < 400 KB | figura no topo da seção 03 · Grade espacial |
| 2 | `assets/orn-icones.png` | 2048×1024, PNG com fundo transparente | ícones dos objetos no simulador e no painel de comparação (seção 02) |
| 3 | `assets/orn-contas.png` | 2048×128, PNG que repete na horizontal | substitui a faixa `.ms-beads` (capa, faixa do protótipo) |
| 4 | `assets/orn-parafuso.jpg` | 1600×1200 (4:3), JPG < 300 KB | figura ao lado do callout "O parafuso" (seção 05) |

**Estilo comum (cole no início de cada prompt):**

> Painterly digital concept art for a narrative historical RPG, same look as the reference image: dark chiaroscuro, a single warm shaft of daylight cutting through gaps in wooden planks, wet dark-brown wood, oxidized iron and copper, deep teal-blue shadows, visible brush strokes and grain, muted earthy palette (#1B130E wood, #0F1719 abyss, #905D31 copper, #E9DCC2 linen). No text, no logos, no watermark, no fantasy weapons, no glowing magic, no modern objects.

Use a arte de referência (`assets/musanga-cena.png`) como imagem de estilo, se a ferramenta aceitar.

---

## 1. Os pertences em grade (flat lay)

> [estilo comum] Top-down knolling flat lay on wet wooden ship planks inside a dark cargo hold: a small set of humble belongings arranged in a loose grid, each with clear empty space around it — a folded strip of worn cloth, a patched vest, a short rusty iron lever, a coil of braided rope, a pair of worn leather sandals, a small cloth pouch, a wooden wedge, and one old rusty screw placed alone in the brightest spot of the light beam. Faint chalk-like grid lines scratched into the wood suggest an inventory grid. Wide 2:1 composition, important objects in the central band, no people.

**Cuidado:** nada de correntes ou algemas em destaque aqui; o foco é o que ela pode carregar.

## 2. Folha de ícones pintados

> [estilo comum, mas fundo transparente] A sprite sheet of 9 hand-painted inventory icons on a transparent background, arranged in a 3×3 grid with generous equal spacing, each icon centered in its cell, consistent 3/4 top-down angle, consistent warm top-left light, subtle dark outline for legibility on dark UI: (1) folded strip of linen cloth, (2) patched cloth vest, (3) small bent piece of rusty metal, (4) simple cord tied in a knot, (5) worn leather sandals, (6) small cloth pouch with drawstring, (7) short iron lever, (8) coil of braided rope, (9) old rusty screw. Game UI icon style, readable at 64 px.

**Depois de gerar:** recorte cada ícone em 256×256 (`assets/icones/<nome>.png`) para o simulador trocar os SVGs de `ITEM_SVGS`.

## 3. Faixa de contas (repetível)

> A seamless horizontally tileable ornamental border, 16:1, inspired by beadwork necklaces from Central-West Africa (Mwila and Himba references): rows of small round beads in bone white, brick red, ochre copper and deep teal, with a central band of small diamond and triangle motifs, on a very dark brown background. Flat front view, even lighting, crisp edges, no perspective, no text. The left and right edges must match perfectly so the strip repeats.

**Cuidado:** use como ornamento inspirado, não como reprodução de um padrão específico de um povo; a legenda da página já diz "a partir das inspirações do jogo".

## 4. A mão e o parafuso

> [estilo comum] Close-up of a dark-skinned woman's hand, knuckles scraped and fingernails broken, gripping an old rusty screw in a beam of warm light, dust particles floating, rough wet wood behind, shallow depth of field, the screw is the sharpest point of the image. Dignified, determined, not gory. 4:3 composition, hand entering from the lower left, light from the upper right.

---

## Legendas para usar na página

Cada imagem gerada precisa de legenda dizendo o que é. Sugestões:

- 1 · **Imagem gerada por IA, proposta.** Os objetos da carga de teste dispostos como na grade; ilustração de clima, não reconstituição histórica.
- 2 · **Ícones gerados por IA, proposta.** Substituem os ícones esquemáticos do protótipo.
- 3 · (decorativa, `alt=""`; citar no README)
- 4 · **Imagem gerada por IA, proposta.** O parafuso da narração da abertura.

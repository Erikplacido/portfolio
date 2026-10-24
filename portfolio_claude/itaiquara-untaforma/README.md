# Case 13 · Itaiquara · Untaforma

Parte do portfólio em `../`. Usa a moldura comum (`../shared/`) e está registrado em `../shared/cases.js`.

```
itaiquara-untaforma/
  index.html   # o case (HTML + CSS + JS puro, sem build)
  assets/      # imagens geradas a partir do pacote de produção (veja abaixo)
```

**Embalagem real, produzida.** Rótulo da lata aerossol do Untaforma 600 ml (desmoldante em spray), produto novo da Itaiquara. Criação completa do autor. A marca pode ser mostrada, segundo o autor.

## De onde vêm as imagens

Todas saem do pacote do Illustrator `Untaforma_600ml_15092022_Pasta` (15/09/2022), copiado para `../Untaforma_600ml_15092022_Pasta/`:

| Arquivo | Origem | Tipo |
|---|---|---|
| `arte-final.webp` | O PDF do pacote, rasterizado inteiro (gabarito do fabricante da lata e do fotolito) | **Real** |
| `planificacao.webp` | A área impressa do rótulo, recortada do mesmo PDF, sem as linhas do gabarito | **Real** |
| `frente.webp`, `rendimento.webp` | Recortes da planificação | **Real** |
| `base-photoshop.webp` | A imagem composta de `Links/desmoldante7.psd` (o T amarelo, as ondas e a foto) | **Real** |
| `lata-textura.webp` | A planificação com as faixas de metal sem tinta (11 mm na cabeça, 8 mm no pé), para a lata 3D | Real + faixas desenhadas |
| `card.jpg` | Captura da capa da página (a lata 3D de frente) | Recriação |

A lata da capa e da seção 01 é **uma recriação em 3D** (48 faces em CSS, cada uma com uma fatia da arte real). O topo e a válvula são simplificados.

## O que tem na página

| Seção | O que mostra | Tipo |
|---|---|---|
| Capa | Lata 3D girando devagar; arrastar assume o controle; pausa fora da tela; parada de frente com "reduzir movimento" | Recriação interativa |
| Contexto | Produto novo, o terço visível, desafio e 4 números da arte | Fatos da arte + interpretação |
| 01 · Um terço por vez | Lata 3D com controle de ângulo e botões; a planificação mostra em claro o terço que fica de frente | Interativo |
| 02 · Estrutura | A base em Photoshop e o T amarelo | Real |
| 03 · Frente | Recorte da frente e o que há nela | Real |
| 04 · Rendimento | "Unta até 100 formas de 30 × 40 cm" | Real |
| 05 · Informação | Planificação com 8 áreas numeradas que se destacam ao toque | Real, interativo |
| 06 · Arte-final | Medidas, reservas, recravação, cores Pantone, fontes e a arte-final inteira; link para uma loja com o mesmo código de barras | Real |

Sem seção de resultado: o autor não tem números para citar.

## Antes de publicar

1. **Tire a pasta de trabalho do portfólio.** `../Untaforma_600ml_15092022_Pasta/` tem 346 MB, inclui o `.ai`, o `.psd` e **arquivos de fonte licenciados** (Myriad Pro, Arial, MADE Tommy Soft "personal use"). O README do portfólio proíbe arquivos de trabalho pesados, e publicar fontes viola as licenças. A página não usa nada dessa pasta diretamente. Mova-a para fora de `portfolio_claude/` antes de publicar.
2. **Confira as interpretações.** Como combinado, o porquê das decisões foi escrito a partir do que se vê na arte. Revise principalmente:
   - o "Desafio" do contexto;
   - por que o nome está na vertical (03);
   - para que servem as ondas e o T (02);
   - a leitura do rendimento (04);
   - "UNTA" e "FORMA" com pesos diferentes (03).
3. **Link da loja.** A seção 06 aponta para a página do produto na CCN Distribuidora, que confirma o mesmo EAN (7896545506199). Lojas mudam de URL; troque se preferir outra fonte.
4. **Cores Pantone.** As bolinhas são aproximações em tela de 124 C, 280 C, 362 C e Red 032 C.

## Para uma próxima tiragem

Ao ler a arte, apareceram três erros de digitação no texto impresso: "ESPECIALMENTEDESENVOLVIDO" (falta espaço), "LIMPEZAE HIGIENIZAÇÃO" (falta espaço) e "fora do alcace de crianças" ("alcance"). A página não menciona isso.

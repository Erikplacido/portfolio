# Super Batalha — case

Jogo de tabuleiro competitivo de super-heróis brasileiros. Criação e regras de Chris Pereira, publicação da Pindorama Entretenimento. Erik fez a identidade visual e o design gráfico: logo, caixa, tabuleiro, cartas, biombos, standees, marcadores, pôster, flyer e apresentação.

## Seções

| Seção | O que mostra | Origem |
|---|---|---|
| Hero | Arte do pôster recortada | Real (`poster_A3.jpg`) |
| Contexto | Regras em uma frase e números de componentes | Apresentação do jogo (`Apresentação/src/data/slidesData.ts`) |
| 01 Marca | Logo e versos dos 3 baralhos, com botões para trocar | Real (arte final) |
| 02 Personagens | 4 folhas A3 de standees, com filtro por cor | Real (arte final de produção) |
| 03 Biombo | Biombo interno, capa do Bugio, marcadores | Real; a foto dos biombos montados é **mockup gerado com IA** |
| 04 Cartas | Linhas da planilha de cartas e 2 folhas de cartas de ação | Real (`cards/acoes/*.csv` e `cards/acoes/jpg`) |
| 05 Caixa | Tampa, bandeja e pôster | Real (arte final) |
| Resultado | Status da campanha, jogo montado, créditos | Mockup gerado com IA (jogo montado); créditos da apresentação |

## De onde vêm os fatos

- Componentes, regras, enredo, equipe e lista de convidados: `Apresentação/src/data/slidesData.ts` e `SlideContent.tsx`, no pacote de trabalho.
- 2 a 4 jogadores e 30 a 90 minutos: pôster.
- Caixa 40 × 40 × 10 cm: nome da pasta da faca. Cartas 88 × 63 mm: nome dos arquivos de InDesign.
- Pôster 120 × 90 cm para a CCXP: `poster_120x90_CCXP.pdf`.
- Status (financiamento coletivo) e escopo do trabalho do Erik: informados pelo autor. Ano 2025–2026: datas dos arquivos.

## Pacote de trabalho

Os arquivos originais (14 GB de PSD, AI, INDD e PDFs de gráfica) ficam em `../Super_Batalha_Pasta/`, fora do git e do site (`.gitignore` e `.vercelignore`). As imagens de `assets/` são cópias reduzidas, geradas a partir dele.

## Antes de publicar

- [ ] Confirmar que as imagens `mock-*.webp` foram mesmo geradas com IA (o canto tem a marca ✦ do Gemini e há um arquivo `Gemini_Generated_Image` na mesma pasta). Se forem fotos reais, trocar as legendas.
- [ ] Confirmar com a Pindorama e os ilustradores a exibição das artes e dos personagens convidados.
- [ ] Nome da plataforma e números da campanha, quando houver.
- [ ] Os motivos das decisões estão escritos a partir do que as peças fazem. Vale o autor revisar e acrescentar o porquê de cada escolha.
- [ ] A apresentação tem outros mockups (ações, eventos, times, zonas, obstáculos, iniciativa) em `Super_Batalha_Pasta/Apresentação/src/images/componentes_jogo/`, se quiser usar depois.

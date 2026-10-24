# Saudosa Maloca — case de portfólio

Erik foi o **designer gráfico do filme** (placa-título e peças de cena dos anos 50 e 80) e também fez o deck de captação. Cartaz e peças de divulgação, também dele, ficaram fora deste case por decisão do autor. O case gira em torno do filme; o deck é seção secundária. Página estática, usa a moldura de `../shared/`.

## O que tem na página

| Seção | O que mostra | Interação |
|---|---|---|
| Abertura | Placa-título sobre o muro (imagem da capa do deck) | Um reflexo de luz passa uma vez |
| Contexto | Sinopse, brief, 2 épocas, ~60 itens na lista de arte, 4 levas de impressão | — |
| 01 Título | Placa-título + 9 placas de rua do set (57 × 30 cm) | Escolher a esquina; troca sozinho até o primeiro toque |
| 02 Épocas (faixa assinatura) | 6 pares anos 50 × anos 80: rótulo e cartaz Clara, Refres Frut, cigarro Aurora → Demar, fósforo Maxlumi → Maxluli, cédula de cem cruzeiros | Placas ANOS 50 / ANOS 80 viram os pares; alterna sozinho até o primeiro toque |
| 03 Marcas | 13 rótulos e maços inventados no balcão do bar, com tamanho e uso; nomes aprovados pelo jurídico | Escolher rótulo (setas no teclado); troca sozinho até o primeiro toque |
| 04 Especulação | 12 peças da especulação imobiliária (lambes, outdoors, planta, contrato, ordem de despejo, jornal) | Toque amplia |
| 05 Sets | Abas Bar Bleque Tais, Rádio Cruzeiro do Sul, Ruas, Papéis de cena; frame da filmagem com as cédulas | Abas (setas, Home, End); toque amplia |
| 06 Deck | 20 slides reais do deck de captação, capítulos como placas esmaltadas | Setas e placas; troca sozinho até o primeiro toque |
| Sistema visual | Paletas dos anos 50 e 80 (cores tiradas das artes), fontes por tipo de peça, pastas de pesquisa | — |
| Resultado | Datas da gráfica, filmagem, Mostra e estreia; trailer que só carrega o YouTube no clique; Prime Video | — |

Qualquer peça com `data-zoom` abre num `<dialog>` ampliado (Esc ou clique fora fecha). Com `prefers-reduced-motion`, nada troca sozinho e tudo aparece no estado final, com os controles funcionando. Loops pausam fora da tela.

## Real, recriação ou proposta

- **Real, usado no filme** (confirmado pelo autor): todas as artes finais de cena desta página, renderizadas dos PDFs de impressão em `ARTES PARA IMPRIMIR/`.
- **Recriação:** as cédulas de cruzeiro reproduzem notas reais das duas épocas; a legenda diz isso.
- **Frame de filmagem:** `frame-cedulas.webp` vem da diária de 11/01/2023, cortado para tirar os dados de câmera, sem tratamento de cor.
- **Deck:** slides reais. Valores de financiamento e de cotas foram borrados de forma irreversível; ficaram de fora projeções de público, estratégia de VOD, referências com imagens de outros filmes, patrocinadores e e-mails.
- **Fora da página:** fotos de cantores e recortes de jornal sobre Adoniran (reproduções de acervo).

## De onde vêm os fatos

- `07 - Arte Gráfica/00 - Arte Gráfica 221205.pdf`: lista por set e cena com quantidade, tamanho, material, datas de entrega e nomes enviados ao jurídico (aprovados: Madame Norita, Café Paulistano, Rádio Cruzeiro do Sul).
- Pastas `ARTES 0712 / 0912 / 1912 / 1101` (as 4 levas) e `ARTE LEVA ÚNICA 12.12`; tamanhos lidos dos nomes dos arquivos e do trimBox dos PDFs.
- `Desenvolvimento/Fonts`: famílias separadas por tipo de peça. `PESQUISA/`: categorias de referência.
- `Frames/`: diárias de 9 a 11/01/2023.
- Deck `Apresentação Saudosa Maloca 3.pdf` (Keynote, nov/2022) e imprensa: Pink Flamingo Filmes, dir. Pedro Serrano, 47ª Mostra SP (out/2023), estreia em 21/03/2024, distribuição Elo Studios, Prime Video. Trailer no canal ingresso.com.

## Antes de publicar

1. **Confirmar** o período (2022–2024), o crédito de direção de arte (Cláudia Terçarolli; fontes dizem "direção de arte" ou "design de produção") e a origem das fotos dos slides do deck.
2. **Fontes.** Algumas famílias da pasta de desenvolvimento são versões trial/demo; a página só cita os nomes. Vale confirmar as licenças usadas na produção.
3. **Peso.** `assets/` tem ~11 MB (121 arquivos); quase tudo carrega sob demanda.

## Como os assets foram gerados

PDFs renderizados com CoreGraphics em Swift usando o **trimBox e escala manual** (o `getDrawingTransform` não amplia páginas pequenas), depois WebP q80 com Pillow. Corte de margem branca só nas peças com página maior que a arte (uísque, logos da rádio, cédulas, maços planificados, Pops-dente, Madame Norita, cardápio, fachada); cartazes com sangria ficam inteiros.

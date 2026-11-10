# Saudosa Maloca — case de portfólio

Erik foi o **designer gráfico do filme** (placa-título e peças de cena dos anos 50 e 80) e também fez o deck de captação. Cartaz e peças de divulgação, também dele, ficaram fora deste case por decisão do autor. O case gira em torno do filme; o deck é seção secundária. Página estática, usa a moldura de `../shared/`.

## O que tem na página

| Seção | O que mostra | Interação |
|---|---|---|
| Abertura | Placa-título sobre o muro (imagem da capa do deck) | Reflexo de luz esmaltada na abertura |
| Contexto | Sinopse, brief, 2 épocas, ~60 itens na lista de arte, 4 levas de impressão, 5 quadros cinematográficos | Toque amplia quadros em alta resolução |
| 01 Épocas (faixa assinatura) | Vitrine interativa de 6 pares anos 50 × anos 80 (Clara rótulo, Clara cartaz, Refres Frut, cigarro Aurora → Demar, fósforo Maxlumi → Maxluli, cédula de cem cruzeiros) | Placas ANOS 50 / ANOS 80 e botão 3D ou Lado a Lado; seletor dos 6 pares; ciclo suave que pausa no primeiro toque |
| 02 Marcas | 2 fotos panorâmicas dos balcões de época + prateleira interativa de 13 rótulos inventados (Belezura, Austral, Cana Caí, Carminha, Didico, Mimozinha, Dona Aurea, Mariola, Coco, Aurora, Old Maltes, Demar, Wald) | Prateleira navegável com spotlight em alta fidelidade e ficha técnica |
| 03 Especulação | Ordem de despejo e planta do edifício em destaque + mural com 10 lambes, outdoors, contrato e jornal | Toque em qualquer peça amplia em alta resolução |
| 04 Sets | Abas esmaltadas: Bar Bleque Tais, Rádio Cruzeiro do Sul, Ruas de São Paulo (com quiosque de esquinas) e Papéis de Cena com o frame bruto da filmagem das cédulas | Abas por teclado (setas/Home/End); seletor de esquinas esmaltadas; zoom |
| Sistema visual | Paletas dos anos 50 e 80 (cores tiradas das artes), fontes por tipo de peça, pastas de pesquisa | Amostras cromáticas e tipográficas |
| Resultado | Cronologia da produção em placas (gráfica, set, Mostra SP, estreia, Prime Video) e trailer oficial | Trailer que só carrega o player do YouTube no clique |

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

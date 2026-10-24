# Projeto Força BR — case de portfólio

Página estática, sem dependências. Usa a moldura compartilhada em `../shared/frame.css` e `../shared/frame.js`. Tudo que é do jogo (console de metal, grade azul de radar, cartas, fichas, contador) fica dentro dos palcos `.pf-stage` e da faixa azul do tabuleiro. Veja `../README.md`.

```
forca-br/
  index.html   # página inteira (HTML + CSS + JS puro)
  assets/      # exportados dos arquivos de 2020–2021 (ver abaixo)
```

## O que tem na página

| Seção | O que mostra | Interação |
|---|---|---|
| Abertura | Composição com o tabuleiro, três cartas de herói e fichas | — |
| Contexto | Premissa do jogo e brief | — |
| 01 Linguagem | Versos dos quatro montes, cartões do jogador e do vilão, cor por função, ícones, tipografia | Toque vira cada carta |
| 02 Heróis e vilões | Oito heróis (frente, verso, logo, descrição, origem e poderes lidos das cartas); fileira dos chefes | Seletor por logo (setas no teclado), virar carta; troca sozinho até você tocar |
| 03 Tabuleiro (faixa) | Tabuleiro 65 × 65 com radar; carta de região monitorada e carta de região; painel 65 × 25 | Toque num encaixe; percorre as regiões sozinho até você tocar |
| 04 Matriz regional | Matriz modular de habilidades cruzando biomas, atributos e especializações | Filtro por bioma |
| 05 Eventos e fichas | Três montes de evento; fichas; contador de recursos e créditos | Compre de qualquer monte (compra sozinho até você tocar); −1/+1/+5 no contador |

Respeita `prefers-reduced-motion` (sem autoplay nem radar, cartas no estado final, controles funcionando) e pausa os loops fora da tela.

## Real, recriação ou proposta

- **Real (arquivos de 2020–2021):** cartas de herói e vilão, versos, cartas de região e de região monitorada, eventos, tabuleiro, painel, fichas, logos e cartões do jogador e do vilão.
- **Composição:** `cover.jpg` e `card.jpg` foram montados com as artes finais (tabuleiro, cartas, fichas) sobre um fundo de grade. Não é foto nem render.
- **Recriação em código:** o contador de recursos. As janelas mostram dígitos em código sobre a placa real; na peça, dois discos giram atrás. O radar e o destaque dos encaixes do tabuleiro também são animação da página.
- **Imagens desfocadas:** as fotos e quadrinhos dentro das cartas de evento são de terceiros (algumas com pessoas identificáveis), por isso aparecem desfocados. A moldura, o título e o texto ficam nítidos.

## De onde vêm os fatos

- **Autor (nesta conversa):** papel (design dos componentes, logos dos heróis, mapa do tabuleiro, mockups 3D); status de protótipo não lançado; período 2020–2026; créditos de editora e ilustrador.
- **Cartas e PDFs:** nomes, descrições, origem dos poderes e poderes dos heróis; nomes, efeitos e citações de eventos e regiões; equipe de apoio no painel.
- **`caixa/Documento.docx`:** Pindorama Editora e Chris Pereira (criador e game designer). Atenção: esse documento é da aventura de RPG do mesmo universo, não do jogo de tabuleiro.
- **Nomes dos arquivos:** ilustrações dos personagens de George Wolf (`*_GeorgeWolf_Cards.png`); medidas (tabuleiro 65 × 65, painel 65 × 25, região monitorada 44 × 67 mm).
- **Datas dos arquivos:** versões do cartão do jogador (fev., mar. e jun. 2021) e dos renders (set. 2020 e abr. 2021).
- **PDFs:** fonte Downlink nos títulos; a página usa Orbitron no lugar.

## Antes de publicar

1. **Permissão.** O jogo, a marca Força BR e as ilustrações são da Pindorama Editora e de George Wolf. Confirme que pode mostrar o protótipo antes do lançamento.
2. **Créditos.** Confirme se Chris Pereira é o game designer do tabuleiro (o crédito veio do documento do RPG) e se George Wolf assina todas as ilustrações dos personagens.
3. **Brief e porquês.** O brief e os motivos das decisões (o “console”, a cor por função, a forma das fichas) foram deduzidos das peças. Ajuste com as suas palavras.
4. **Aprendizado.** Não há métricas. Se quiser fechar com um aprendizado ou algo que faria diferente, entra na seção Resultado.
5. **Marca Força BR.** O logo aparece no painel e na ficha de iniciativa. A página não diz quem o desenhou; se for seu, vale citar.
6. **Chefes.** Os versos dos vilões repetem um texto de ficha provisório (o de W.R.A.I.T.H.). A carta de Dom Ferdinando ficou de fora porque a placa do nome ainda diz “Queimado”.
7. **Caixa.** A pasta `caixa/` só tem as ilustrações da capa (de terceiros) e o documento do RPG; não há caixa diagramada, então ela não entrou.

## Como os assets foram gerados

PDFs e `.ai` renderizados com PDFKit (macOS), PSDs com `sips`, prévias 3D extraídas dos `.dn` (são zip; ficam em `renditions/`). Cartas de herói, região e minis recortadas de `layout_material.pdf`; eventos e regiões monitoradas recortados na linha de corte dos PDFs; fichas com o fundo branco removido. Larguras: cartas 480–560 px, eventos 640 px, tabuleiro 1600 px, painel 2000 px, fichas 240 px, ícones 96 px (usados como máscara CSS).

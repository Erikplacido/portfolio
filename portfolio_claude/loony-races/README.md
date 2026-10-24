# Loony Races — case de portfólio

Página estática, sem dependências. Usa a moldura compartilhada em `../shared/frame.css` e `../shared/frame.js` (navegação, abertura, títulos, legendas e rodapé iguais aos dos outros cases). Tudo que é do jogo (céu, grama, mesa, pista, cartas) fica dentro dos palcos `.pf-stage` e da faixa verde da pista. Veja `../README.md`.

```
loony-races/
  index.html   # página inteira (HTML + CSS + JS puro)
  assets/      # exportados dos arquivos finais de 2018 (ver abaixo)
```

## O que tem na página

| Seção | O que mostra | Interação |
|---|---|---|
| Abertura | Céu, nuvens, pilhas de pneus, gramado e faixa quadriculada com o logo, como na prancha | Nuvens passam devagar |
| Contexto | Premissa do jogo, brief, 1–10 jogadores, 20–60 min, game design | — |
| 01 Marca | Logo e os versos dos três montes (pilotos, ações, movimento) | Toque vira cada carta |
| 02 Pilotos | Grupo dos dez pilotos; seletor com carta, país, HP e carro | Seleção por clique ou setas; troca sozinha até você tocar |
| 03 Cartas | Montes verde e amarelo com frentes reais e o efeito resumido do manual | Compre de qualquer monte; compra sozinho até você tocar |
| 04 Pista (faixa) | Tabuleiro que se monta trecho a trecho, com o carro do piloto escolhido na seção 02 | Jogar carta verde, Nova corrida, terreno Asfalto/Lama/Gelo; joga sozinho até você tocar |
| 05 Caixa e manual | Manual PT/EN folheável; tampa em três vistas | Idioma, setas, pontos; abas da caixa (setas no teclado) |
| Sistema visual | Paleta tirada dos componentes, tipografia do manual, marcador Tachinhas/STOP, ícones de pista | Toque vira o marcador |
| Resultado | Escopo produzido (contagens do manual) e peças de divulgação | Números sobem uma vez |

Respeita `prefers-reduced-motion` (sem autoplay, pista já completa, controles funcionando) e pausa os loops fora da tela.

## Real, recriação ou proposta

- **Real (arquivos finais de 2018):** logo, cartas, trechos de pista nos três terrenos, carros, grupo de pilotos, marcadores, páginas do manual em PT e EN, ilustração e planificação da tampa, pôster, e-mail marketing e camiseta.
- **Mockup:** `caixa-mockup.jpg` é uma simulação 3D, não foto do produto. A legenda diz isso.
- **Recriação em código:** a abertura (céu, nuvens, pneus, gramado, faixa) reproduz a faixa da prancha original com o logo real. `cover.jpg` e `card.jpg` são capturas dessa composição.
- **Demonstração simplificada:** a pista usa os trechos reais e as regras do manual para Compra, Turbo, Óleo, Buraco, Obra e Estreitamento, mas com um carro só, uma carta Avance por turno e o terreno apenas visual. A legenda avisa.

## De onde vêm os fatos

- Prancha do autor: papel (identidade visual, ilustrações, diagramação), editora Coliseu Hobbies, venda internacional, personagens inspirados em cada país, dois tipos de carta de ação, pista em tiles, ferramentas (Ai, Ps, Xd, Id, Mu).
- `manual_pt.pdf` e `manual_ingles.pdf`: premissa (GP da Zuretânia / Zanystan), 1–10 jogadores, 10+, 20–60 min, lista de componentes, efeitos das cartas e da pista, modo Rac3r, regra do marcador de Primeiro Jogador (maior HP).
- Caixa: crédito "Game designer Leandro Maciel"; dimensões 26 × 26 × 8 cm pelo nome do arquivo `caixa_tampa_260x260x80.pdf`.
- `emkt.jpg`: anúncio da apresentação no Diversão Offline (10 e 11 de março).
- Autor: jogo levado a financiamento coletivo; sem números de vendas.
- Nomes e países dos pilotos: lidos das cartas finais (`pilotos_carta-63x88mm.pdf`); a grafia de Jeff M. Bieltti segue o manual.

## Antes de publicar

1. **Confirme o ano.** "2018" foi deduzido das datas dos arquivos (fevereiro a outubro de 2018) e do e-mail de março.
2. **Permissão da editora.** As imagens são arte sua, mas a marca e o jogo são da Coliseu Hobbies. Confirme que pode publicar, principalmente o manual e o e-mail (que traz o endereço do evento).
3. **Carta de Jaílson (HP 1000).** Existe no PDF de pilotos, sem bandeira e fora dos dez países do manual. Ficou de fora. Se for uma carta promocional, dá para incluí-la no array `PILOTS`.
4. **Aprendizado.** Não há métricas. Se quiser fechar o case com um aprendizado ou algo que faria diferente, entra na seção Resultado.
5. **Peso.** As 18 imagens do manual (~2,8 MB no total) carregam sob demanda. Se precisar aliviar, reduza `man-*.jpg` para 1200 px de largura.

## Como os assets foram gerados

Recortados na linha de corte dos PDFs de impressão (cartas 63 × 88 mm, trechos 57 × 57 mm, marcadores 31 × 31 mm) e das imagens mescladas dos PSDs. Os trechos estão em três sprites 4 × 4 (`t-asfalto.webp`, `t-lama.webp`, `t-neve.webp`) com a mesma ordem de slots; o slot 10 (grama) é o verso. Para trocar por exportações melhores, mantenha nomes, proporções e a ordem dos sprites.

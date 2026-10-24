# Case 14 · Hellfire Overdrive

Parte do portfólio em `../`. Usa a moldura comum (`../shared/`) e está registrado em `../shared/cases.js`, no grupo **Jogos**.

```
hellfire-overdrive/
  index.html   # o case (HTML + CSS + JS puro, sem build)
  jogo.js      # a versão jogável da seção 01 (canvas + Web Audio)
  assets/      # capturas reais do jogo, o palco, card.jpg e a música do case
```

**Conceito, não oficial.** Advergame mobile pensado para uma ativação, inspirado no Hellfire Club de Stranger Things, sem vínculo com a Netflix. O aviso fica logo abaixo do lede, como no case de Cobra Kai. O jogo existe e roda em `hellfire-overdrive-erik.erikplacido.chatgpt.site`, mas esse endereço exige login no ChatGPT; por isso a página não tem link para ele nem o embute.

## De onde vem cada coisa

| Arquivo | Origem | Tipo |
|---|---|---|
| `menu.webp`, `como-jogar.webp`, `ajustes.webp`, `partida.webp`, `overdrive.webp`, `nota-longa.webp`, `resultado.webp` | Capturas do jogo no Chrome, em 485 × 863 (a coluna do jogo), com o modo demonstração | **Real** |
| `card.jpg` | Montagem de três capturas | Real |
| `palco.webp` | A arte do palco (858 × 1536), capturada do jogo em duas partes e unida, sem HUD nem notas. A estrela no canto inferior direito é a marca d'água do gerador de imagem, mantida | **Real** |
| `marionete-16-bits.mp3` | Tema original "Marionete de 16 bits", escrito em Strudel nesta conversa e sintetizado em Python com as mesmas notas, timbres e efeitos: 32 kHz, 11 bits, loop de 19,2 s | Original |

Fatos tirados do jogo: cinco pistas (A S D F G), três dificuldades, notas longas, acordes no Lenda, Overdrive de 8 s, ajuste de sincronia de −200 a +300 ms, vibração, efeitos reduzidos, pulso visual, demonstração que não conta recorde, 139 notas no Guitarrista, multiplicador ×2 e ×8 observados na demonstração. Os limites de rank por precisão (S 97%, A 88%, B 72%, C 52%) foram lidos do `app.js`.

## A versão jogável (seção 01)

A seção 01 tem um jogo de verdade, feito para esta página em `jogo.js`, porque o jogo original exige login. É uma **recriação**, e a legenda diz isso.

- **De onde vem cada parte.** O palco é recomposto em Canvas a partir de `assets.psd`: `backgound_1` → `stage-background.png`, `trono` → `trono.png`, `eddie_1`, `eddie_guitar2`, `eddie_guitar1` e `eddie_rock` → PNGs homônimos (personagem separado do trono), `braço_guitar` → `stage-fretboard.png`, `nota1…nota5` → `pad-1.png…pad-5.png`. Exportações preservam as camadas e sua transparência. Bateria e faixa de Overdrive usam os sprites já presentes em `assets/ui/`. As camadas `notas_1…notas_5` são exportadas sem alterações para PNGs homônimos e substituem os marcadores: pistas 1–5 usam notas_3 (verde), notas_1 (vermelha), notas_4 (dourada), notas_2 (azul) e notas_5 (violeta). Números e efeitos são desenhados em código.
- **Referência visual.** Composição vertical 858 × 1632, placar vermelho no topo, bateria à esquerda, cinco pads numerados e faixa de Overdrive na base, seguindo a captura fornecida em 23/10/2026. As quatro poses vêm do PSD: neutra no início e após erros; guitarra lateral a partir de combo 10; solo a partir de 25; braços erguidos a partir de 40 ou durante Overdrive. Um erro prioriza a pose neutra por 1,2 s. As trocas são instantâneas, sem loops ou deslocamento, inclusive com movimento reduzido. O título continua "MARIONETE DE 16 BITS", correspondente à faixa que realmente toca; pontos, combo, multiplicador e tempo são os da partida.
- **A música e as notas.** Toca o tema original do case, duas passadas do loop de 19,2 s (32 compassos a 200 BPM, 38,4 s), com um compasso de contagem antes. As notas saem do riff do tema, com a pista escolhida pela altura da nota (mi → verde, fá/sol → vermelha, lá → amarela, si/dó → azul, ré → laranja).
- **Dificuldades.** Aprendiz: 124 notas (semínimas). Guitarrista: 144 (semínimas e as colcheias que mudam de pista). Lenda: 268, com 16 acordes e nenhuma nota repetida na mesma pista em menos de 150 ms.
- **Regras.** Janela de 50 ms para Perfeito e 110 ms para Boa. Multiplicador de ×1 a ×4 a cada 10 acertos seguidos. O Shred meter enche com os acertos; cheio, Espaço ou um toque no medidor ativa o Overdrive, que dobra os pontos por 8 s. Precisão = (Perfeitos + metade das Boas) ÷ notas, com os mesmos limites de rank do jogo. Rank A ou S mostra um código de brinde ilustrativo.
- **Demonstração.** Joga sozinha, sempre no tempo; o primeiro toque ou tecla passa o controle para quem joga, e a partida continua sem brinde.
- **Controles e cuidados.** Teclas A S D F G, toque na pista ou no pad, Esc ou P para pausar, ajustes de volume e de sincronia (−200 a +300 ms). O jogo pausa sozinho ao sair da tela, ao trocar de aba e quando o tema da página começa a tocar; o tema para quando uma partida começa. O cenário fica estático; com "reduzir movimento", a explosão vira um anel.
- **Testado** no Chrome: demonstração completa no Guitarrista (144 de 144, rank S, sem brinde), partida com teclas simuladas e erros (rank A, código liberado), pausa e retomada com o relógio parado, e layout em 375 px sem rolagem horizontal.

## O que é proposta

- **O brinde.** O jogo não tem brinde hoje. A seção 04 e a versão jogável propõem: rank A ou S libera um código de retirada, um por pessoa, e a demonstração nunca libera. O simulador e o "código" com QR são recriações ilustrativas. O tipo de brinde não foi definido.
- **A leitura de fila e de evento** ("uma música de um minuto cabe numa fila") é interpretação para o conceito de ativação.

## A música

- **O que toca no case:** o tema original "Marionete de 16 bits", não a trilha do jogo. O `jogo.wav` que veio anexado é um trecho de 1,1 s renderizado da reinterpretação de "Master of Puppets" (Metallica): é obra protegida e **não** foi usado. Esse arquivo também está em `../jogo.wav`; tire-o da pasta antes de publicar.
- **Como toca:** a página usa Web Audio para tocar o loop sem emenda, só depois de um clique. As barrinhas leem o áudio em tempo real; com "reduzir movimento" elas ficam paradas.
- **A trilha do jogo:** dentro do jogo toca `assets/ritual.mp3` ("Ritual da meia-noite", 132 BPM, 1:01). A origem dessa faixa não foi conferida. Se ela também vier de "Master of Puppets", o jogo inteiro tem o mesmo problema.

## Antes de publicar

1. Confira a trilha do jogo (`ritual.mp3`) como descrito acima.
2. Defina, se quiser, o tipo de brinde e o texto de retirada (hoje: "Mostre o código no estande para retirar").
3. Revise a seção 05 (o que foi definido por você e o que foi gerado), escrita a partir da sua resposta "direção com IA" e "arte mista".

## Verificação da atualização visual · 23/10/2026

Demonstração, pontuação, Overdrive, pausa e retomada conferidos em servidor local com cópia isolada do case e seus estilos compartilhados, sem erros de JavaScript no console. Sem overflow horizontal na largura observada de 344 px. A checklist completa de publicação (incluindo home, outros cases e emulação de movimento reduzido) não foi repetida nesta alteração visual.

Atualização de sprites: notas D20, pose de solo e comemoração conferidas na demonstração; controle assumido pelo teclado, retorno à pose neutra após erros e pausa confirmados, sem erros no console. Limiares de combo, prioridade do erro, Overdrive e pose neutra na contagem inicial também verificados em teste isolado.

## Tela de resultado · referência de 23/10/2026 às 17:55

Tela dedicada com cenário do PSD, marca no topo, moldura derivada de `plaque.png`, rank e estrelas em sprites, pontuação de seis dígitos, precisão, maior combo, notas acertadas e contagem de perfeitas/boas/perdidas. Botões “Mais um solo” e “Voltar ao início”. Todos os valores vêm da partida. A demonstração indica “Sem recorde · sem brinde”; nenhum selo de recorde fictício é mostrado. O código ilustrativo continua disponível para partidas manuais com rank A/S.

Verificação: demonstração completa com rank S, 144/144 notas e estatísticas reais; botão “Mais um solo” reinicia a partida. Conteúdo e botões dentro da moldura, sem erros no console. Cenários S em demonstração, A com código e D sem código conferidos em teste isolado.

## Tela inicial · referência de 23/10/2026 às 17:58

Composição com cenário e personagem do PSD, marca no topo, som e ajustes, painel da música, dificuldade e botão Tocar agora. Usa `stage-character.png`, `diff-highlight.png`, `btn-tocar.png` e os três sprites `nav-*`. A forma de onda é decorativa e estática. A faixa exibida é a real desta recriação: Marionete de 16 bits, 200 BPM, aproximadamente 38 segundos. Mantidas as três dificuldades implementadas. Como jogar abre instruções; Demonstração inicia o modo automático; Placares lista as cinco melhores partidas manuais desta visita (sem persistência após recarregar). O botão de som silencia/restaura o volume da experiência, sincronizado com Ajustes.

Verificação do menu: instruções e retorno, placares vazios, silenciar/restaurar (80%), ajustes, seleção de Aprendiz, início manual, pausa e retorno ao menu conferidos no navegador, sem erros no console.

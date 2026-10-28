# Credo, que delícia! — case de portfólio

Peças gráficas para o programa **Credo, que delícia!**, apresentado por Dani Noce. Página estática, usa a moldura de `../shared/`. Saiu do antigo case único "Publicidade e TV", dividido em cases curtos no segmento Áudio Visual.

## O que tem na página

| Seção | O que mostra | Interação |
|---|---|---|
| 01 Abertura | Cold open `cqd_coldopen_v1`, com som | Clique para tocar |
| 02 Cenário | Letreiro, ícones de parede, avental bordado e logo na vinheta | Toque amplia |
| 03 Na tela | Crédito da apresentadora e título Jogos Malucos | Toque amplia |

Qualquer peça com `data-zoom` abre num `<dialog>` (Esc ou clique fora fecha). Vídeos não tocam sozinhos. Com `prefers-reduced-motion`, nada troca sozinho; controles funcionando. Loops pausam fora da tela.

## Real, recriação ou proposta

- **Real:** capturas de tela do programa (`publicidade/assets/credo-que-delicia/`), com a barra do player cortada.
- **Real:** vídeo `cqd_coldopen_v1 (720p).mp4`.

## De onde vêm os fatos

Nome da apresentadora: crédito na própria tela (Dani Noce, @nocedanielle). Vídeos e capturas em `publicidade/assets/<pasta>/` (material bruto, fora do git). Vídeos recomprimidos em H.264 com `+faststart`; capturas convertidas para WebP.

## Antes de publicar

Confirmado pelo autor (28/10/2026): GNT, 2019.

1. A lista de entregas (letreiro e ícones do cenário, bordado do avental, grafismos de tela) ainda não foi confirmada peça por peça.

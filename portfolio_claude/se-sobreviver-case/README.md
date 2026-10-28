# Se Sobreviver, Case — case de portfólio

Mapa da ilha e manual de sobrevivência para o reality **Se Sobreviver, Case** (Multishow e Globoplay). Página estática, usa a moldura de `../shared/`. Saiu do antigo case único "Publicidade e TV", dividido em cases curtos no segmento Áudio Visual.

## O que tem na página

| Seção | O que mostra | Interação |
|---|---|---|
| 01 No ar | Chamada do Multishow (sem som), com botão que pula para o mapa (2:57) | Clique para tocar |
| 02 Mapa | 21 versões com círculos no que muda | Escolher versão (setas), troca sozinho até o primeiro toque |
| 03 Manual | 14 páginas e ícones | Toque amplia |

Qualquer peça com `data-zoom` abre num `<dialog>` (Esc ou clique fora fecha). Vídeos não tocam sozinhos. Com `prefers-reduced-motion`, nada troca sozinho; controles funcionando. Loops pausam fora da tela.

## Real, recriação ou proposta

- **Real:** artes finais e chamada `videoplayback3.mp4` (Multishow).
- **Calculado pela página:** os círculos do mapa vêm da diferença entre cada versão e o mapa sem marcação.
- **Aviso:** a chamada tem nudez com tarja, como foi ao ar. Ela só toca no clique; a legenda avisa.

## De onde vêm os fatos

Multishow: logo do canal na chamada. Resto: README antigo em `publicidade/`. Vídeos e capturas em `publicidade/assets/<pasta>/` (material bruto, fora do git). Vídeos recomprimidos em H.264 com `+faststart`; capturas convertidas para WebP.

## Antes de publicar

1. Se `SSC4` é a 4ª temporada.
2. Decidir se a chamada com nudez fica; dá para cortar só o trecho do mapa (≈ 2:50–3:10).

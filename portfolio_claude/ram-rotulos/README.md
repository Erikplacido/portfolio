# RAM · Rótulos de bar — case de portfólio

18 rótulos de bebidas fictícias para a prateleira do bar num filme publicitário da **RAM**. Página estática, usa a moldura de `../shared/`. Saiu do antigo case único "Publicidade e TV", dividido em cases curtos no segmento Áudio Visual.

## O que tem na página

| Seção | O que mostra | Interação |
|---|---|---|
| 01 Comercial | Filme de 30 s (sem som), com botão que pula para o bar (0:19) | Clique para tocar |
| 02 Rótulos | 18 rótulos com medida, origem e texto | Escolher rótulo (setas), troca sozinho até o primeiro toque |
| 03 Nas garrafas | Montagem dos rótulos em garrafas | Toque amplia |

Qualquer peça com `data-zoom` abre num `<dialog>` (Esc ou clique fora fecha). Vídeos não tocam sozinhos. Com `prefers-reduced-motion`, nada troca sozinho; controles funcionando. Loops pausam fora da tela.

## Real, recriação ou proposta

- **Real:** artes finais dos rótulos e o filme `publicidade/assets/dogeram/videoplayback.mp4`.
- **Gerado por IA:** `ram-mockup.webp`, `cover.jpg`, `card.jpg` e `capa_mobile.jpg` vêm de uma imagem gerada no ChatGPT com os rótulos em garrafas. A legenda da seção 03 e o `alt` da capa dizem isso.

## De onde vêm os fatos

Cliente: pasta `dogeram` e o logo RAM no filme. Vídeos e capturas em `publicidade/assets/<pasta>/` (material bruto, fora do git). Vídeos recomprimidos em H.264 com `+faststart`; capturas convertidas para WebP.

## Antes de publicar

Confirmado pelo autor (28/10/2026): os 18 rótulos são de autoria dele; filme de 2023.

1. Avaliar se a capa deve ser a montagem por IA ou um quadro do filme (`poster.jpg`).

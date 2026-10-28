# Match nas Estrelas — case de portfólio

Logo e baralho para **Match nas Estrelas**, Amazon Original. Página estática, usa a moldura de `../shared/`. Saiu do antigo case único "Publicidade e TV", dividido em cases curtos no segmento Áudio Visual.

## O que tem na página

| Seção | O que mostra | Interação |
|---|---|---|
| No ar (oculta) | Trecho do programa: aparece sozinho quando existir `assets/video.mp4` | Clique para tocar |
| 01 Logo | Logo em constelação | — |
| 02 Baralho | Verso, 5 cartas e coringa | "Tirar uma carta" (sozinho até o primeiro toque); toque amplia |

Qualquer peça com `data-zoom` abre num `<dialog>` (Esc ou clique fora fecha). Vídeos não tocam sozinhos. Com `prefers-reduced-motion`, nada troca sozinho; controles funcionando. Loops pausam fora da tela.

## Real, recriação ou proposta

- **Real:** artes finais.
- **Montagem:** `cover.jpg`, `card.jpg` e `capa_mobile.jpg` montam o logo e as cartas reais sobre um céu desenhado pela página. Não é foto.

## De onde vêm os fatos

"Amazon Original" está no próprio logo. Vídeos e capturas em `publicidade/assets/<pasta>/` (material bruto, fora do git). Vídeos recomprimidos em H.264 com `+faststart`; capturas convertidas para WebP.

## Antes de publicar

1. **Vídeo:** coloque em `match-nas-estrelas/assets/video.mp4`. A seção "No ar" aparece sozinha.
2. Ano e formato do programa.
3. Enquanto o vídeo não existe, a página faz um `HEAD` que dá 404 no console.

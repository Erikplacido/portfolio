# Rio Shore — case de portfólio

Papel de parede, piso e baralho para o reality **Rio Shore** (MTV e Paramount+). Página estática, usa a moldura de `../shared/`. Saiu do antigo case único "Publicidade e TV", dividido em cases curtos no segmento Áudio Visual.

## O que tem na página

| Seção | O que mostra | Interação |
|---|---|---|
| No ar (oculta) | Trecho do programa: aparece sozinho quando existir `assets/video.mp4` | Clique para tocar |
| 01 Paredes | Quatro paredes, folha por folha | Abas; "Folhas / Parede montada" alterna sozinho até o primeiro toque |
| 02 Piso | Piso em escala 10% e ladrilho | Toque amplia |
| 03 Baralho | Verdade ou Desafio | "Tirar uma carta" (tira sozinho até o primeiro toque) |

Qualquer peça com `data-zoom` abre num `<dialog>` (Esc ou clique fora fecha). Vídeos não tocam sozinhos. Com `prefers-reduced-motion`, nada troca sozinho; controles funcionando. Loops pausam fora da tela.

## Real, recriação ou proposta

- **Real:** artes finais.
- **Montagem:** `cover.jpg`, `card.jpg` e `capa_mobile.jpg` são folhas reais lado a lado, recortadas.

## De onde vêm os fatos

README antigo em `publicidade/`. Vídeos e capturas em `publicidade/assets/<pasta>/` (material bruto, fora do git). Vídeos recomprimidos em H.264 com `+faststart`; capturas convertidas para WebP.

## Antes de publicar

1. **Vídeo:** coloque em `rio-shore/assets/video.mp4` (H.264, de preferência < 20 MB). A seção "No ar" aparece sozinha.
2. Quais temporadas.
3. Enquanto o vídeo não existe, a página faz um `HEAD` que dá 404 no console.

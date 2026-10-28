# Invertidamente — case de portfólio

Peças impressas para o quadro **Invertidamente**, do Em Família com Eliana (TV Globo). Página estática, usa a moldura de `../shared/`. Saiu do antigo case único "Publicidade e TV", dividido em cases curtos no segmento Áudio Visual.

## O que tem na página

| Seção | O que mostra | Interação |
|---|---|---|
| 01 No ar | Trecho do quadro (sem som), com botão que pula para a caixa girando (0:41) | Clique para tocar |
| 02 Peças | 20 peças filtráveis por cômodo: cozinha e banheiro, padaria, academia, pôsteres, viagem, festa e quadro | Filtros; toque amplia |
| 03 Processo | Foto recortada × faca em magenta | — |

Qualquer peça com `data-zoom` abre num `<dialog>` (Esc ou clique fora fecha). Vídeos não tocam sozinhos. Com `prefers-reduced-motion`, nada troca sozinho; controles funcionando. Loops pausam fora da tela.

## Real, recriação ou proposta

- **Real:** artes finais (vindas do case antigo Publicidade e de `publicidade/assets/invertidamente/`: lousas 1 e 3 renderizadas dos PDFs, varal Feliz aniversário).
- **Real:** vídeo do programa (`videoplayback2.mp4`).

## De onde vêm os fatos

Estreia em 26/07/2026: matéria do gshow de 24/07/2026 (ver README antigo em `publicidade/`). Medidas: nomes dos arquivos. Vídeos e capturas em `publicidade/assets/<pasta>/` (material bruto, fora do git). Vídeos recomprimidos em H.264 com `+faststart`; capturas convertidas para WebP.

## Antes de publicar

1. Confirmar que todas as peças da pasta `Renan/Eliana` são do quadro (o case antigo já assumia isso pelo envelope com o logo).

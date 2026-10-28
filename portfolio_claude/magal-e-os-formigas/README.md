# Magal e os Formigas — case de portfólio

Peças gráficas de cena para o longa **Magal e os Formigas** (Globo Filmes). Página estática, usa a moldura de `../shared/`. Saiu do antigo case único "Publicidade e TV", dividido em cases curtos no segmento Áudio Visual.

## O que tem na página

| Seção | O que mostra | Interação |
|---|---|---|
| 01 Trailer | Trailer oficial no YouTube (carrega só no clique) e espaço para um trecho próprio do filme | Clique para tocar |
| 02 Em cena | 5 capturas do filme: capa de disco, pôster, quarto, figurino e oficina | Toque amplia |

Qualquer peça com `data-zoom` abre num `<dialog>` (Esc ou clique fora fecha). Vídeos não tocam sozinhos. Com `prefers-reduced-motion`, nada troca sozinho; controles funcionando. Loops pausam fora da tela.

## Real, recriação ou proposta

- **Real:** capturas de tela do filme (`publicidade/assets/Magal/`).
- **De terceiros:** o trailer é da Globo Filmes (YouTube `lz04PIKJR0Y`).

## De onde vêm os fatos

Título e produtora: título do trailer no YouTube ("Magal e Os Formigas | Trailer oficial", canal Globo Filmes). Vídeos e capturas em `publicidade/assets/<pasta>/` (material bruto, fora do git). Vídeos recomprimidos em H.264 com `+faststart`; capturas convertidas para WebP.

## Antes de publicar

Confirmado pelo autor (28/10/2026): todas as artes gráficas do cenário são dele.

1. Ano de lançamento.
2. **Vídeo próprio:** coloque em `magal-e-os-formigas/assets/video.mp4` (H.264, de preferência < 20 MB). A figura aparece sozinha quando o arquivo existe.

# Publicidade e TV — case de portfólio

Erik foi o **designer gráfico** das peças de cena desta página: marcas fictícias, rótulos, cartazes, papéis de parede, pisos, placas, adesivação de viaturas, cartas e mapas para comerciais, séries e programas de TV. Segundo o autor, tudo o que está aqui foi ao ar e não houve uso de IA nas artes. Página estática, usa a moldura de `../shared/`. Cor do case: o magenta que marca facas e áreas de aplicação nos arquivos de impressão.

```
publicidade/
  index.html   # página inteira (HTML + CSS + JS puro)
  assets/      # 249 arquivos exportados de tralha/publicidade (ver abaixo)
```

## O que tem na página

| Seção | O que mostra | Interação |
|---|---|---|
| Abertura | Montagem com artes finais (cartazes, rótulos, cartas, escudo) | — |
| Contexto | O que é design gráfico de cena; 16 rótulos, 13 kits de viatura, 21 versões do mapa | — |
| 01 Marcas | 18 rótulos de bebidas inventadas (medida, origem, texto do rótulo); lojas e produtos do Bradesco, escudos da Betbet, caixas de sabão, ketchup | Escolher rótulo (setas no teclado), troca sozinho até o primeiro toque; toque amplia |
| 02 DNA do Crime (faixa) | 13 cartazes de marcas fictícias; lambes, placas de mercado e cartazes da delegacia; kits de viatura PRF e PM SP com referência de montagem; 14 brasões redesenhados | Toque amplia; abas PRF / PM SP |
| 03 Cartazes | 41 cartazes, lambes e letterings (Boticário, Itaipava, Betbet, lettering, cordel e comida, pôsteres) | Filtros; toque amplia |
| 04 Rio Shore | Quatro paredes, folha por folha; piso de 3 × 13,5 m e ladrilho; baralho de Verdade ou Desafio | Abas por parede e "Folhas / Parede montada" (alterna sozinho até o primeiro toque); "Tirar uma carta" (tira sozinho até o primeiro toque) |
| 05 Se Sobreviver, Case | 21 versões do mapa da ilha com círculos no que muda; 14 páginas do manual de sobrevivência e ícones | Escolher versão (setas), troca sozinho até o primeiro toque; toque amplia |
| 06 Sets | Abas Invertidamente, Boticário, Match nas Estrelas, Betbet, Placas de rua | Abas (setas, Home, End); toque amplia |
| Processo | Medida no nome (selo em 9 tamanhos), impresso × vinil de recorte, grande formato em escala, foto + faca | — |
| Resultado | Onde assistir (Netflix, Paramount+, Globoplay, gshow) e créditos | — |

Qualquer peça com `data-zoom` abre num `<dialog>` (Esc ou clique fora fecha). Com `prefers-reduced-motion`, nada troca sozinho: a parede aparece montada, a primeira carta virada, a versão 1 do mapa; controles funcionando. Loops pausam fora da tela.

## Real, recriação ou proposta

- **Real, foi ao ar** (confirmado pelo autor): todas as artes finais, renderizadas dos PDFs, PSDs, TIFs e JPGs de impressão em `tralha/publicidade/`.
- **Recriação:** os brasões das forças policiais do DNA do Crime são recriações em vetor de insígnias reais, feitas para a série; a legenda diz isso.
- **Montagem:** `cover.jpg` e `card.jpg` foram montados com as artes finais sobre um fundo escuro. Não é foto nem render.
- **Calculado pela página:** os círculos do mapa vêm da diferença entre cada versão e o mapa sem marcação (versões 1–10 sobre o mapa fechado, 11–19 sobre o aberto).
- **Sem fotos de set:** o autor não tem fotos. As fotos de divulgação do gshow mostram outra sala do Invertidamente (garagem), sem peças destas pastas, e ficaram de fora; a página só linka a matéria.

## De onde vêm os fatos

- **Medidas:** nomes dos arquivos (`rotulo_6_145x105`, `logo_confeitaria_15cm_faca`, `piso_300x1350_escala10%`) e trimBox dos PDFs (folhas de parede de 1,47 m; cartazes A3/A4; mapa A3).
- **Contagens:** 16 rótulos numerados (Saigon), 13 pastas de adesivos de viatura (12 forças + carro-forte), 21 PDFs do mapa, 100 páginas de verdades e 56 de desafios no baralho do Rio Shore.
- **Programas:** Netflix (DNA do Crime: série policial, 2 temporadas, criação de Heitor Dhalia, Bernardo Barcellos e Leonardo Levis); Paramount+ (Rio Shore: reality, desde 2021, 4 temporadas, dez jovens cariocas em Búzios); Globoplay (Se Sobreviver, Case: reality, desde 2020, 4 temporadas; abrigos vermelho, amarelo, verde e azul); gshow, 24/07/2026 (Invertidamente estreou em 26/07/2026 no Em Família com Eliana; caixa que gira; Endemol Shine Brasil, Banijay Estúdios). Match nas Estrelas: "Amazon Original" está no próprio logo.
- **Clientes:** nomes das pastas (`Job Boticario`, `Renan/Bradesco`, `Sentimental/bradesco`, `Renan/Betbet`, `Renan/itaipava`, `Renan/Eliana`, `Paranoid/DNA`, `Job Rio`, `Floresta`), com o autor autorizando citar as marcas.

## Antes de publicar

1. **Créditos de pessoas e produtoras.** A página não cita Renan, Luan, Thiago Bastos nem as produtoras (Paranoid, Sentimental, Saigon). Confirmar se podem ser creditados.
2. **Jobs sem cliente na página.** Rótulos da pasta `Saigon` (para que job?), caixas Sabom/Soap (`Paranoid/Job Luan`), letterings e pôsteres da raiz de `Renan`, cordel e comida (`thiago bastos`), pôsteres e placas da raiz de `Sentimental`. Aparecem sem atribuição.
3. **Temporadas.** Quais temporadas de DNA do Crime e Rio Shore; se `SSC4` é a 4ª temporada de Se Sobreviver, Case (a página só cita a sigla).
4. **Invertidamente.** A página assume que as peças da pasta `Renan/Eliana` (padaria, academia, banheiro, pet, viagem) são do quadro, pelo envelope com o logo. Confirmar.
5. **Conteúdo sensível.** O baralho do Rio Shore tem perguntas de conteúdo sexual; a página mostra só sete cartas leves. Cartazes de campanha da delegacia (drogas, abuso, violência contra a mulher) estão na seção do DNA.
6. **Peso.** `assets/` tem ~15 MB; quase tudo carrega sob demanda. Os 21 mapas (3,5 MB) carregam um a um, quando cada versão aparece.

### Deixado de fora de propósito

Rostos de pessoas reais (passaporte com foto da Ivete Sangalo, cartaz de tranças, rostos dos YouTube shorts, cartaz "Procurado"), boletos com marca de banco, simulações de loja sobre foto de outra marca (`perfumaria.png`, `perfumaria2.png`), renders do McDonald's, cenas de boteco da Itaipava, site e frames da Miller, e as pastas `3Dias`, `Lara`, `Morgana`, `Luan` (Quick Relax, Deliver, placas de corrida) e `pink flamingo` (cinema: Menino Monstro, Uma Menina um Rio, Artacho, Friozinho; o material de Saudosa Maloca pode reforçar o case próprio).

## Como os assets foram gerados

PDFs renderizados com CoreGraphics em Swift (trimBox e escala manual); PSD, TIF, JPG e PNG convertidos com `sips`; depois WebP q80 com Pillow, com corte de margem branca só nas peças com página maior que a arte (rótulos, logos, placas, facas). Capas de cordel recortadas do fundo; piso do Rio Shore girado para a horizontal; contornos de vinil de recorte (rosa quase branco no original) convertidos em linha magenta sólida para aparecerem na tela. Mapas a 1200 px, q72.

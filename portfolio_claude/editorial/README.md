# Editorial · Capas e livros — case de portfólio

Erik foi o **designer gráfico** das capas: 11 para a WMF Martins Fontes (2012–2016) e, em Kaputt e Mauricio — O Início, também do miolo. Em Mauricio — O Início o papel foi maior: Erik procurou a MSP, restaurou as páginas digitalmente, diagramou o livro e criou a capa (2015). O case dá peso igual às duas frentes: a estante de capas e a história do livro de Mauricio. Página estática, usa a moldura de `../shared/`.

## O que tem na página

| Seção | O que mostra | Interação |
|---|---|---|
| Abertura | Mosaico de capas em diagonal (sem Kaputt) | O mosaico desliza devagar; pausa fora da tela |
| Contexto | Tipos de livro, o papel, 11 capas, 2 projetos de miolo, 3 livros dos anos 60 | — |
| 01 Capas | Estante com as 11 capas WMF, capa grande e uma nota sobre o recurso de cada uma | Filtro Tipografia, Desenho ou Imagem; escolher livro (setas no teclado); troca sozinho até o primeiro toque |
| 02 Kaputt | Capa e três páginas reais do miolo (arte de Guazzelli), lado a lado na mesma altura | — |
| 03 Mauricio (faixa assinatura) | 4 etapas: o contato com a MSP, restauração, diagramação, capa | As etapas avançam quando a barra amarela enche; clique ou tecla entrega o controle (rolar a página não para) |
| 04 Restauração | Registro e cor (comparadores antes/depois) e continuidade do padrão; citação de Erik sobre o charme da falha | Arrastar, tocar ou usar as setas; uma varredura curta na primeira vez que aparece |
| Ficha | Tabela livro, autor, recurso, entrega; recursos das capas; ferramentas | — |
| Resultado | Alcance e créditos | — |

Com `prefers-reduced-motion` nada troca sozinho, o mosaico fica parado e os comparadores começam no meio, com os controles funcionando. No celular, a estante vem antes da capa grande para que o toque mostre a capa logo abaixo.

## Real, recriação ou proposta

- **Capas: reais.** `c-*.webp` são capas planas. Cinco vêm dos PNGs de `tralha/Editorial/` (Monografia, Novo Espírito, Verbos, Arquitetura, Sobre o Político), recortadas da margem branca. As outras seis (Metodologia, Falsa Medida, Kaputt, Mil Vezes, Tratado, caixa C.S. Lewis) e `c-mauricio` foram recortadas das imagens do Behance do autor, que têm só 533 px de largura.
- **Mauricio — O Início: fotos reais do Behance.** `m-originais` (os três livros dos anos 60), `m-detalhes` (polaroides de antes/depois), `m-miolo` (livro aberto), `m-capa` (mockup da capa), todos com 843 px ou menos.
- **Comparadores: recortes reais, alinhados.** `r-registro-*` e `r-cor-*` saem das metades de cada polaroide de `m-detalhes`, alinhadas pelo traço preto (deslocamento achado por correlação) e ampliadas 3×. `r-padrao` é a polaroide das bolinhas, endireitada 4,5° e ampliada 2×.
- **Kaputt: páginas reais.** A seção usa só a capa e as três páginas planas de `assets/kaputt/` (02, 03, 04). As fotos 05–09 têm a marca d'água "pipocamusical" (são de terceiros) e ficaram fora da página, assim como o PDF montado com elas. Para usar fotos do livro impresso, falta foto própria ou permissão.
- **Fora da página (out/2026):** a seção "Grid suíço" (raio-X com grade fixa sobreposta a qualquer capa, proporções, entrelinhas e fontes sem fonte confirmada), a "macro-inspeção" (`macro-restauracao.jpg` é imagem gerada, não foto do livro, e vinha com números de registro sem fonte) e o card do miolo de Mauricio (212 páginas, formato álbum, capa dura: sem fonte; a foto mostra miolo vertical). Os arquivos continuam em `assets/` e o texto antigo está no git. Volta se o autor confirmar os fatos.
- **Composição:** `cover.jpg` (2400×1200) e `card.jpg` (1600×1200) são mosaicos das capas sobre fundo escuro. Não é foto. Kaputt ficou de fora do mosaico porque a suástica da capa precisa do contexto que a estante dá.

## De onde vêm os fatos

- Autor, nesta conversa: WMF Martins Fontes entre 2012 e 2016; designer gráfico responsável por capa, e por miolo em Kaputt e Mauricio — O Início; em Mauricio, contato com a MSP, restauração digital, diagramação e capa; Kaputt é da WMF.
- Texto do próprio Erik no projeto do Behance "Trade paperback: Mauricio o Início": a entrevista de Sidney Gusman no The Noite (SBT), o contato pelo Facebook, os três livros raros dos anos 60, os 80 anos de Mauricio, os erros corrigidos (registro, cor, continuidade dos padrões) e a frase sobre o charme da falha, citada na página.
- Títulos, autores e subtítulos lidos nas próprias capas. Ferramentas tiradas das fichas do Behance.
- As notas sobre cada capa descrevem o que se vê nela. A página não atribui intenção a nenhuma escolha.

## Antes de publicar

1. **Imagens em alta.** O autor vai pôr os arquivos em `tralha/`. Troque `c-*.webp` mantendo os nomes, de preferência capas planas com ~1000 px de altura, e substitua `m-*` e `r-*` pelas páginas antes/depois em alta. Os comparadores precisam das duas versões do mesmo detalhe, alinhadas e com o mesmo tamanho.
2. **Confirmar a ordem antes/depois** dos comparadores. A página assume que a metade esquerda de cada polaroide é a impressão dos anos 60 e a direita é a restaurada, porque os defeitos estão à esquerda.
3. **Confirmar a editora de Mauricio — O Início** e o ano de lançamento. A página só diz "feito com a MSP, em 2015" e "pensado para os 80 anos".
4. **Anos de cada capa.** A página usa o intervalo 2012–2016 para todas.
5. **Créditos de imagens de terceiros** dentro das capas (pinturas, fotos, vitral). A página só diz que pertencem a seus autores.
6. **Fora da página:** o site da Editora Terceiro Nome, que também está no Behance. Ficou de fora porque é outra disciplina.

## Como os assets foram gerados

Pillow (Python 3.9): capas da `tralha` cortadas pelas colunas não brancas; capas do Behance recortadas pelo retângulo da capa medido numa régua; mosaicos montados com sombra desfocada e girados 9°; comparadores alinhados pela máscara do traço preto (IoU) e exportados em WebP q86.

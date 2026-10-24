# Chronos Weave — pacote de assets

65 arquivos individuais: **53 PNGs com transparência, 11 SVGs brancos e 1 JPG**.

- `assets/ui/`: todos os PNGs e SVGs da interface, com os nomes da especificação.
- `assets/inspector-art.jpg`: ilustração panorâmica, 1200 × 400.
- `manifest.json`: inventário, dimensões, escala de uso, margens 9-slice e SHA-256 de cada asset.
- `CATALOGO.html`: catálogo local; abra no navegador. Cada nome aponta para o arquivo individual.
- `PREVIA.png`: prévia complementar dos estados, emblemas e controles em escala de uso.
- `VALIDACAO.txt`: relatório da conferência.
- `PROMPTS.md`: prompts usados na ferramenta integrada de geração de imagens.
- `ESPECIFICACAO-ORIGINAL.md`: texto recuperado da conversa de referência.

## Integração

Copie a pasta `assets` para a raiz do projeto `chronos-weave`. Os arquivos já têm a resolução @2x solicitada; normalmente são exibidos com metade da largura e altura. Os SVGs têm `viewBox="0 0 128 128"` e podem ser usados como máscara CSS para receber a cor do estado. Não dependem de fontes externas.

Os nós contêm moldura e preenchimento do estado, sem ícone de habilidade. Os anéis de seleção e coroa têm centro transparente. Os textos dinâmicos de abas, botões e rank ficam a cargo do código. Os numerais I, II e III pertencem aos emblemas.

`feixe-energia.png` tem RGB branco e alpha variável. As colunas inicial e final são idênticas; use repetição horizontal e aplique a cor pelo código. O topo e a base são transparentes. A barra de preenchimento tem o mesmo canvas 640 × 96 do botão; sobreponha ambos sem deslocamento e revele a barra com clipping, preservando a dimensão de origem.

## 9-slice

As margens abaixo são medidas no arquivo @2x, iguais nos quatro lados. Na tela @1x, preserve metade desses valores para a espessura dos cantos.

| Arquivo | Canvas @2x | Margem de origem | Margem @1x |
|---|---|---|---|
| aba-ativa.png | 320 × 64 | 24 px | 12 px |
| card-constelacao.png | 660 × 180 | 20 px | 10 px |
| selo-rank.png | 96 × 40 | 8 px | 4 px |
| painel-moldura.png | 400 × 200 | 24 px | 12 px |
| botao-segurar.png | 640 × 96 | 20 px | 10 px |
| radar-moldura.png | 320 × 220 | 16 px | 8 px |

Exemplo CSS, com o arquivo CSS na raiz do projeto:

```css
.painel {
  border: 12px solid transparent;
  border-image-source: url("assets/ui/painel-moldura.png");
  border-image-slice: 24 fill;
  border-image-width: 12px;
  border-image-repeat: stretch;
}
```

Nas abas, mantenha a altura prevista e estique a largura. O card usa um esmaecimento contínuo para a direita; prefira `stretch` ao repetir seu centro. Os ornamentos dos painéis ficam nas áreas dos cantos.

## Verificação

Na pasta deste README, execute `python3 verificar.py`. Não requer bibliotecas externas. O script verifica os 65 caminhos, tamanhos em bytes e hashes contra o manifesto. O relatório de produção inclui a validação das dimensões, do alpha, dos SVGs e da emenda do feixe.

## Produção

Nós, emblemas, medalhão, moeda, coroa e ilustração foram produzidos com a ferramenta integrada `image_gen`; os prompts estão incluídos. Os ícones, glyphs e elementos que exigem geometria exata foram desenhados como vetores e exportados nos tamanhos pedidos. A exportação dos PNGs gerados preserva o alpha e inclui margem transparente de segurança.

A textura `metal-texture.jpg` e a tela original não estavam anexadas à conversa recuperada. O material foi construído a partir da descrição de bronze/latão envelhecido e da paleta fornecida. A consistência visual foi conferida dentro deste pacote; a integração no simulador não foi testada, pois seu código não foi fornecido.

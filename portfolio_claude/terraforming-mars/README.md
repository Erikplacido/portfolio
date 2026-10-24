# Terraforming Mars: Re-Engineered — Case de Tabletop UX & Redesign

Case de estudo conceitual focado em **Tabletop UX/UI, Arquitetura de Informação e Engenharia de Componentes** para o jogo de tabuleiro *Terraforming Mars* (criado por Jacob Fryxelius).

## O que o case demonstra

1. **Auditoria Crítica de Usabilidade:**
   - O problema crônico do "tabuleiro escorregadio" (perda de estado de jogo em partidas longas).
   - O colapso de espaço na mesa após a geração 8 (saturação por excesso de cartas abertas).
   - A dissonância visual de fotografias de banco de imagem misturadas a desenhos vetoriais e 3D.
   - A carga cognitiva desnecessária por repetição de frases de regras em vez de iconografia funcional.

2. **Engenharia do Dashboard Dual-Layer (Camada Dupla):**
   - Especificação física de painel 280 × 190 mm com papelão rígido cinza 2.5 mm prensado com lâmina superior vazada a laser.
   - Cavidades milimétricas para cubos acrílicos de 8 mm.
   - Trilhas integradas de recursos (-5 a +20 para MegaCréditos, 0 a +10 para Aço, Titânio, Plantas, Energia e Calor).

3. **Arquitetura de Cartas em Cascata (*Card Splaying*):**
   - Cartas no padrão Poker internacional (63 × 88 mm).
   - Margem de alinhamento à esquerda de 18 mm (*Splay Margin*): permite que dezenas de cartas fiquem sobrepostas horizontalmente deixando apenas o custo e as tags visíveis.
   - Redução de até 65% na pegada de mesa (*table footprint*) de cada jogador.

4. **Linguagem de Iconografia Relacional:**
   - 6 recursos primários com contraste e formas testadas para daltonismo (Deuteranopia, Protanopia).
   - Eliminação de 75% da dependência de idioma (*Language Independence*).

5. **Conformidade Industrial & Gráfica (Pre-press):**
   - Padrões de fabricação alinhados com especificações técnicas da **Panda Game Manufacturing** e **Cartamundi**.
   - Sangrias de 3 mm em facas de corte.
   - Perfis de cor CMYK ISO Fogra39 / GRACoL.

# Star Marshal — estudo de Game UI / UX

Case independente e conceitual, integrado à moldura do portfólio. Universo, personagem, equipamentos e interfaces são fictícios. Não houve pesquisa com jogadores; os únicos números da página são medições feitas no próprio protótipo (descritas abaixo).

## Estrutura da página (`index.html`)

| Seção | Conteúdo | Status das imagens |
|---|---|---|
| Hero | tese, ficha, capa de largura total | arte conceitual do seletor de pulso (`cap_hero.webp`), identificada como tal na nota da capa |
| 01 Intenção | três princípios, lista "O que este case demonstra" (atalhos para as seções) e referências de mercado | — |
| 02 HUD contextual | abas Exploração / Combate / Crítico com crossfade, pinos numerados e ficha por estado | capturas (`cap_explore/combat/critical.webp`) |
| 03 Ergonomia de controle | demo HTML de glyphs com modo automático (teclado/mouse ou Gamepad API) e manual; mapa de comandos | recriação em HTML com os mesmos glyphs do protótipo |
| 04 Seletor de pulso | captura com o seletor holográfico aberto, números (armas, arco, opacidade, giro), comportamento e teclas; nota sobre a roda anterior | captura (`cap_wrist.webp`) |
| 05 UI diegética e espacial | números do ataque inimigo e lista: seletor, campo de força, prompt de evidência e mira livre | captura no impacto (`cap_forcefield.webp`) |
| 06 Protótipo (faixa assinatura) | `simulator.html` em iframe aberto automaticamente, com cena em toda a largura disponível e abas acima do jogo | — |

`case.css` guarda a linguagem do protótipo (tinta petróleo, contorno creme, sombra deslocada, retícula) dentro dos palcos, da capa e da faixa. `case.js` cuida das abas (clique, setas, Home, End), da demo de glyphs (a Gamepad API só é lida com a seção na tela), do iframe sempre aberto (pausado fora da tela) e da revelação ao rolar. As traduções en/es/fr ficam em `shared/cases-i18n/star-marshal.js`; os textos que o script escreve (dispositivo detectado, tecla "Clique", status do protótipo) são traduzidos no próprio `case.js`.

## De onde vêm os números

- **Área de HUD (3,4% / 9,1% / 10,9%)**: soma das caixas (`getBoundingClientRect`) dos elementos do HUD visíveis (opacidade efetiva ≥ 0,05, transições concluídas), recortadas à área de jogo de 1600×800. Elementos: `#mission-heading`, `#wp-evidence`, `#critical-top-alert`, `#combat-top-radar`, `#shield-hud-panel`, `#weapon-hud-panel`, o SVG do anel da mira e o grupo `#threat-arc-top` (só o desenho do arco, não a moldura de 288 px). Fica de fora a barra de estados e dispositivos acima da cena. A meta de "90% livre" é do design; a medição mostra 96,6% livre em exploração.
- **450 ms**: duração da transição `.hud-state-transition` no simulador.
- **1,05 s**: ciclo da vinheta crítica (`critical-red-vignette`).
- **0,10×**: tempo do mundo com a roda anterior (Tab), citado só como histórico na seção 04.
- **Seletor de pulso**: 6 armas em `drawScannerSelector` (arco de 180°); 22% de opacidade do herói e ~13° de giro da cintura vêm da seção "Seletor de pulso e defesa" abaixo.
- **Campo de força**: ataque a cada 10 s, 16 pontos de escudo e 0,9 s de exibição em `updateEnemyAttack`.
- **~0,2 s** (anel da mira) e **~0,1 s** (sacar a arma): aproximações a 60 fps a partir do decaimento do recuo e de `aimBlend`.

## Capturas

As imagens `cap_*.webp` foram geradas do `simulator.html` por um Chrome headless (protocolo DevTools) a 1600×900 com escala 1,5, sem retoque. A doca de apresentação e o toast ficam ocultos nas capturas; a capa também oculta o painel de glyphs. `cap_wrist.webp` e `cap_forcefield.webp` (outubro de 2026) foram feitas pelo mesmo processo, recortando só `#game-viewport` (1600×800 → 2400×1200): estado de combate, V para abrir o seletor; para o campo de força, `enemyAttackClock = 9.9` e captura 0,3 s depois. As capturas dos estados (`cap_explore/combat/critical.webp`) foram refeitas em 27/10/2026 pelo mesmo processo (recorte de `#game-viewport`, 2400×1200): atalhos 1, 2 e 3, cursor sobre o peito do inimigo e, em combate, captura 90 ms depois do clique, com o raio saindo do cano. `cap_hero.webp` é arte conceitual, não captura. Para refazer depois de mudar o simulador, sirva a pasta raiz e repita o processo com os mesmos estados (exploração, combate com disparo congelado no raio, crítico, roda aberta, scanner, modelo de frente e de perfil).

## Simulador — revisão de outubro de 2026 (personagem e disparo)

- **Cores fiéis à ilustração** (`paintMarshal` em `simulator.html`): o modelo não está centrado na origem (eixo do corpo em x = 0,035, frente para +z), o que deslocava as regiões da pintura antiga. A pintura agora é por parte do rig: capacete creme com faixa vermelha entre filetes marinho, viseira preta, fones de latão; lenço e capa vermelhos (forro em carmim); traje marinho com painel frontal creme e suspensórios de couro; emblema dourado no alto do peito; ombreiras creme com marca vermelha; manoplas creme e luvas pretas; cinto de couro com fivelas douradas e coldre; faixa creme na coxa; joelheiras creme com aro dourado; botas creme com tira preta.
- **Cor chapada por face** (`pulpFaceColoredGeometry` em `pulp-render.js`): cada triângulo recebe uma tinta; só os triângulos que cruzam uma divisa de cor são subdivididos (até 3 níveis, nos pontos médios). O contorno de nanquim usa a malha original.
- **Gola da capa**: a ilha inferior da malha `head` é separada por conectividade e pintada inteiramente de vermelho. Um corte por altura não serve aqui: a gola e o capacete ocupam alturas sobrepostas, fazendo as faixas do capacete vazarem para o tecido. A separação mantém a geometria e a articulação originais.
- **Antagonista**: usa as cores por vértice do próprio OBJ, sem quantização pela paleta do Marshal. Roxos, verdes de pele e cremes recebem tintas próprias em `enemyInks`, preservando os desenhos e o nanquim do asset; o brilho de borda é reduzido para não tingir o traje. A malha atual ainda simplifica o rosto, a gola e os ornamentos da ilustração de referência — a correção de cor não reconstrói esses detalhes.
- **Ombreiras separadas do braço**: acompanham 30% do giro do ombro, para não virarem junto quando o braço sobe.
- **Pistola na mão**: o cabo fica no punho medido da luva e o cano segue o eixo ombro → punho. Em combate, o ombro é orientado para o ponto 3D sob o cursor; o inimigo só é atingido quando o raio da mira intercepta sua malha. O tiro (raio, clarão, recuo, reação do inimigo) só sai quando a mão chega à linha de mira; o raio acompanha o cano enquanto dura.
- **Glyphs**: a tabela `PLATFORM_GLYPHS` tinha `heal` e `scanner` trocados para PlayStation e Xbox, compensados por uma troca em `setPlatformGlyphs`. Os nomes foram corrigidos e a troca removida; o resultado na tela é o mesmo (◯/B restaura, △/Y scanner).
- Scripts locais do simulador levam `?v=` para não ficarem presos em cache depois de publicar.

## Verificação local

Sirva a pasta raiz do portfólio (`python3 -m http.server`) e abra `/star-marshal/`. Fontes, Three.js e Tailwind do simulador vêm de CDN, então a cena precisa de internet.

## Pendências

- O scanner combina uma projeção 3D que acompanha o bracelete com uma ficha 2D de leitura. A projeção usa transparência, teste de profundidade e aparece ao ativar o scanner (V).
- Gatilhos automáticos de estado (hostil detectado, vida < 15%) são o comportamento projetado; no protótipo, os estados mudam por disparo ou pelos atalhos 1, 2 e 3. A página diz isso.
- `card.jpg` (card de "Próximo case") continua sendo a prancha antiga.
- Assets que a página não usa mais e podem ser removidos se o autor quiser: `cap_wheel.webp`, `cap_scanner.webp`, `cap_model_aim.webp`, `cap_model_front.webp`, `marshal_character_art.webp`, `board_hud_states.webp`, `state_*.jpg`, `diegetic_*.jpg`, `glyphs_paleta.jpg`, `hero_vespera9.jpg`, `roda_de_armas_concept.png`, `star_marshal_board.jpg`, `character_operative.jpg`, `corridor_bg.jpg`.
- O projeto Godot em `godot-star-marshal/` não foi alterado.

## Acabamento visual — referência de quadrinhos

Iluminação creme com preenchimento neutro, névoa reduzida, sombras em três faixas, hachuras e retícula fina. A arquitetura procedural recebe contornos, e o brilho colorido do herói foi reduzido. O resultado continua sendo uma cena 3D jogável; os detalhes desenhados da referência não são reproduzidos integralmente pelas malhas atuais.

Os controles de estados e dispositivos ficam em uma barra acima do viewport, fora do HUD. O iframe informa sua altura ao case para manter a cena com 800 px de altura e toda a largura disponível independentemente da altura das abas. Não há botões de iniciar ou encerrar.

As faixas de ações abaixo dos indicadores de vida e arma foram removidas do HUD; Q, V, R e Tab continuam disponíveis pelo teclado.

## HUD compacto e mira livre

Vida e escudo usam segmentos independentes com símbolos; a arma mostra ícone e superaquecimento. Os painéis têm fundo translúcido, altura de 86 px no desktop e ficam numa faixa central de 1120 px. A mira acompanha o mouse dentro do viewport, e o braço aponta para o ponto correspondente no mundo. A câmera acompanha a posição do personagem sem girar com o cursor; o analógico direito também desloca a mira.

## Seletor de pulso e defesa

V (ou △/Y) ergue o antebraço esquerdo e abre uma projeção semicircular com as seis armas e zoom suave. L2/R2 alternam e equipam a arma selecionada; no teclado, ←/→. V, Esc ou ○/B fecham. Os gatilhos não disparam enquanto o seletor está aberto. O zoom e o campo de força respeitam movimento reduzido.

O inimigo dispara a cada 10 segundos de tempo do mundo ativo (pausa fora da tela e desacelera com a roda). Cada ataque tira 16 pontos do escudo; o excedente atinge a vida. O impacto mostra um campo de força translúcido com malha luminosa por 0,9 s. A vida usa vermelho/laranja/amarelo; o escudo usa azul/ciano. Os rótulos de alvo e radar e a ficha textual do scanner ficam ocultos.

Ao abrir o seletor, a câmera avança e enquadra o painel, o braço da arma relaxa e a cintura gira cerca de 13° à esquerda. O personagem fica com 22% da opacidade original, sem bloquear a profundidade do holograma. Ao fechar, câmera, postura e materiais voltam aos valores normais.

## Resfriamento e recarga

A roda antiga não abre mais por Tab nem L1/LB; a seleção ativa é o holograma de pulso (V). O radar usa o mesmo fundo translúcido dos painéis inferiores. A arma ganha vermelho e fumaça conforme aquece; a 100% bloqueia os disparos. R levanta a arma por 1,4 s, reduz gradualmente o calor a zero e repõe a munição ao terminar.

O disparo adversário tem clarão de saída, projétil com núcleo creme e halo vermelho, rastro volumétrico e clarão ciano no impacto. O percurso dura 0,45 s; o dano e o campo de força são acionados na chegada. Os objetos são reutilizados entre os disparos.

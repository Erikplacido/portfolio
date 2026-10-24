# Star Marshal — estudo de Game UI / UX

Case independente e conceitual, integrado à moldura do portfólio. Universo, personagem, equipamentos e interfaces são fictícios. Não houve pesquisa com jogadores; os únicos números da página são medições feitas no próprio protótipo (descritas abaixo).

## Estrutura da página (`index.html`)

| Seção | Conteúdo | Status das imagens |
|---|---|---|
| Hero | tese, ficha, capa de largura total com o chip "2,8% da tela com HUD" | captura do protótipo (`cap_hero.webp`) |
| 01 Intenção | três princípios, lista "O que este case demonstra" (atalhos para as seções) e referências de mercado | — |
| 02 HUD contextual | abas Exploração / Combate / Crítico com crossfade, pinos numerados e ficha por estado; bloco "A mão mira" | capturas (`cap_explore/combat/critical.webp`) e render do modelo (`cap_model_aim.webp`) |
| 03 Ergonomia de controle | demo HTML de glyphs com modo automático (teclado/mouse ou Gamepad API) e manual; mapa de comandos | recriação em HTML com os mesmos glyphs do protótipo |
| 04 Roda de armas | captura com a roda aberta, números e curva de desaceleração | captura (`cap_wheel.webp`); curva calculada |
| 05 UI diegética e espacial | scanner, prompts e marcadores no mundo | captura (`cap_scanner.webp`) + arte conceitual (`scanner_de_pulso_concept.png`) |
| 06 Direção de arte | ilustração × modelo em tempo real, paleta e tipografia do HUD | arte conceitual (`marshal_character_art.webp`) + render (`cap_model_front.webp`) |
| 07 Protótipo (faixa assinatura) | `simulator.html` em iframe, carregado só ao clicar e removido ao encerrar | — |
| 08 Escopo | pronto / a validar / próximos passos; prancha recolhível | arte conceitual (`board_hud_states.webp`) |

`case.css` guarda a linguagem do protótipo (tinta petróleo, contorno creme, sombra deslocada, retícula) dentro dos palcos, da capa e da faixa. `case.js` cuida das abas (clique, setas, Home, End), da demo de glyphs (a Gamepad API só é lida com a seção na tela), do iframe e da revelação ao rolar. As traduções en/es/fr ficam em `shared/cases-i18n/aether-protocol.js`; os textos que o script escreve (dispositivo detectado, tecla "Clique", status do protótipo) são traduzidos no próprio `case.js`.

## De onde vêm os números

- **Área de HUD (2,8% / 9,7% / 12,0%)**: soma das caixas (`getBoundingClientRect`) dos elementos do HUD visíveis, com opacidade efetiva, no protótipo a 1600×900. Ficam de fora o painel "Glyphs dinâmicos" e a doca de apresentação. A meta de "90% livre" é do design; a medição mostra 97,2% livre em exploração.
- **450 ms**: duração da transição `.hud-state-transition` no simulador.
- **1,05 s**: ciclo da vinheta crítica (`critical-red-vignette`).
- **0,10× e 190 ms**: alvo do tempo com a roda aberta e a função `MarshalInput.advance` (decaimento exponencial, k = 12) — 0,1 + 0,9·e^(−12·0,19) ≈ 0,19.
- **Zona morta 0,35** e **6 setores**: `MarshalInput.sector`.
- **~0,2 s** (anel da mira) e **~0,1 s** (sacar a arma): aproximações a 60 fps a partir do decaimento do recuo e de `aimBlend`.

## Capturas

As imagens `cap_*.webp` foram geradas do `simulator.html` por um Chrome headless (protocolo DevTools) a 1600×900 com escala 1,5, sem retoque. A doca de apresentação e o toast ficam ocultos nas capturas; a capa também oculta o painel de glyphs. Para refazer depois de mudar o simulador, sirva a pasta raiz e repita o processo com os mesmos estados (exploração, combate com disparo congelado no raio, crítico, roda aberta, scanner, modelo de frente e de perfil).

## Simulador — revisão de outubro de 2026 (personagem e disparo)

- **Cores fiéis à ilustração** (`paintMarshal` em `simulator.html`): o modelo não está centrado na origem (eixo do corpo em x = 0,035, frente para +z), o que deslocava as regiões da pintura antiga. A pintura agora é por parte do rig: capacete creme com faixa vermelha entre filetes marinho, viseira preta, fones de latão; lenço e capa vermelhos (forro em carmim); traje marinho com painel frontal creme e suspensórios de couro; emblema dourado no alto do peito; ombreiras creme com marca vermelha; manoplas creme e luvas pretas; cinto de couro com fivelas douradas e coldre; faixa creme na coxa; joelheiras creme com aro dourado; botas creme com tira preta.
- **Cor chapada por face** (`pulpFaceColoredGeometry` em `pulp-render.js`): cada triângulo recebe uma tinta; só os triângulos que cruzam uma divisa de cor são subdivididos (até 3 níveis, nos pontos médios). O contorno de nanquim usa a malha original.
- **Ombreiras separadas do braço**: acompanham 30% do giro do ombro, para não virarem junto quando o braço sobe.
- **Pistola na mão**: o cabo fica no punho medido da luva e o cano segue o eixo ombro → punho. Em combate, o ombro é orientado para o alvo (peito do inimigo quando o tronco trava nele, ou o ponto sob a mira da câmera). O tiro (raio, clarão, recuo, reação do inimigo) só sai quando a mão chega à linha de mira; o raio acompanha o cano enquanto dura.
- **Glyphs**: a tabela `PLATFORM_GLYPHS` tinha `heal` e `scanner` trocados para PlayStation e Xbox, compensados por uma troca em `setPlatformGlyphs`. Os nomes foram corrigidos e a troca removida; o resultado na tela é o mesmo (◯/B restaura, △/Y scanner).
- Scripts locais do simulador levam `?v=` para não ficarem presos em cache depois de publicar.

## Verificação local

Sirva a pasta raiz do portfólio (`python3 -m http.server`) e abra `/aether-protocol/`. Fontes, Three.js e Tailwind do simulador vêm de CDN, então a cena precisa de internet.

## Pendências

- O painel do scanner é uma camada 2D; renderizá-lo no bracelete está descrito como próximo passo.
- Gatilhos automáticos de estado (hostil detectado, vida < 15%) são o comportamento projetado; no protótipo, os estados mudam por disparo ou pelos atalhos 1, 2 e 3. A página diz isso.
- `card.jpg` (card de "Próximo case") continua sendo a prancha antiga.
- Assets que a página não usa mais e podem ser removidos se o autor quiser: `state_*.jpg`, `diegetic_*.jpg`, `glyphs_paleta.jpg`, `hero_vespera9.jpg`, `roda_de_armas_concept.png`, `star_marshal_board.jpg`, `character_operative.jpg`, `corridor_bg.jpg`.
- O projeto Godot em `godot-star-marshal/` não foi alterado.

/**
 * Case Study Translations: Terraforming Mars: Re-Engineered
 * Languages: EN, ES, FR (PT original preserved in HTML)
 */
(function() {
  var CASE_SLUG = 'terraforming-mars';

  var translations = {
    en: {
      // Nav links
      '.pf-links a[href="#contexto"]': 'Context',
      '.pf-links a[href="#diagnostico"]': 'Diagnosis',
      '.pf-links a[href="#antes-depois"]': 'Before & After',
      '.pf-links a[href="#dual-layer"]': 'Dual-Layer',
      '.pf-links a[href="#card-splay"]': 'Splay',
      '.pf-links a[href="#iconografia"]': 'Iconography',

      // Hero
      '.pf-hero .eyebrow': '<b>Case 06</b> · Tabletop UX · Component Redesign',
      '.pf-hero h1': 'Terraforming Mars: <em>Re-Engineered.</em>',
      '.pf-hero .lede': 'An in-depth study of <strong>Information Architecture, Tabletop Ergonomics, and Component Design</strong> for one of the world’s most acclaimed board games.',
      '.pf-meta div:nth-child(1) dt': 'Role',
      '.pf-meta div:nth-child(1) dd': 'UX/UI Design, Ergonomics & Component Design',
      '.pf-meta div:nth-child(2) dt': 'Project',
      '.pf-meta div:nth-child(2) dd': 'Independent Conceptual Redesign · 2024',
      '.pf-meta div:nth-child(3) dt': 'Deliverables',
      '.pf-meta div:nth-child(3) dd': 'Dual-layer console, card splay architecture & iconography',
      '.pf-meta div:nth-child(4) dt': 'Tools',

      // Context
      '#contexto .eyebrow': 'The Problem',
      '#contexto h2': 'Why did one of the world’s greatest board games need a redesign?',
      '#contexto .lede': 'With over 100,000 ratings and ranking in BoardGameGeek\'s global top 5, Terraforming Mars is a game design masterpiece created by Jacob Fryxelius. However, its original 2016 production suffered from flimsy cardstock components that caused constant physical friction on the table.',
      '#contexto .callout': '<b>UX Objective:</b> completely eliminate game state loss caused by table bumps, reduce card footprint by 65%, and unify relational iconography.',
      '.tm-count .pf-card:nth-child(1) .tag': 'BGG Ranking',
      '.tm-count .pf-card:nth-child(1) p': 'in the global ranking of strategic board games.',
      '.tm-count .pf-card:nth-child(2) .tag': 'Physical Friction',
      '.tm-count .pf-card:nth-child(2) p': 'cubes locked into laser-milled recesses.',
      '.tm-count .pf-card:nth-child(3) .tag': 'Table Space',
      '.tm-count .pf-card:nth-child(3) p': 'reduction in table space per player with card splay.',
      '.tm-count .pf-card:nth-child(4) .tag': 'Engineering',
      '.tm-count .pf-card:nth-child(4) p': 'certified industrial specs ready for specialized print manufacturing.',

      // Section 01: The Diagnosis
      '#diagnostico .eyebrow': '<b>01</b> · Diagnosis',
      '#diagnostico h2': 'The 4 critical usability flaws in the original design',
      '#diagnostico .lede': 'An in-depth audit of ergonomic and cognitive frictions impacting players across 2-to-3-hour matches.',

      // Audit Cards
      '.audit-grid > div:nth-child(1) .audit-flaw': '<i class="fa-solid fa-triangle-exclamation"></i> Critical Flaw 01',
      '.audit-grid > div:nth-child(1) .audit-title': 'The Notorious "Slippery Player Mat"',
      '.audit-grid > div:nth-child(1) .audit-desc': 'Individual boards are flat, glossy cardstock sheets. Any accidental elbow nudge on the table scatters dozens of tiny resource and production cubes, wrecking 3-hour match states.',
      '.audit-grid > div:nth-child(1) .audit-fix': '<strong>UX Solution:</strong> 3mm dual-layer mat engineering featuring laser-cut recesses that lock 8mm cubes firmly in place with engineered mechanical tolerances.',

      '.audit-grid > div:nth-child(2) .audit-flaw': '<i class="fa-solid fa-triangle-exclamation"></i> Critical Flaw 02',
      '.audit-grid > div:nth-child(2) .audit-title': 'Table Bloat & Tabletop Real Estate Collapse',
      '.audit-grid > div:nth-child(2) .audit-desc': 'By generation 8, each player has built an engine of 25 to 40 cards. Cards must remain fully unspread to display tags, demanding over 1.2 meters of table width per player.',
      '.audit-grid > div:nth-child(2) .audit-fix': '<strong>UX Solution:</strong> Standardized 18mm left-edge Card Splay Margin. When fanned in cascade, tags and costs remain fully readable while occupying 65% less table surface.',

      '.audit-grid > div:nth-child(3) .audit-flaw': '<i class="fa-solid fa-triangle-exclamation"></i> Critical Flaw 03',
      '.audit-grid > div:nth-child(3) .audit-title': 'Visual Inconsistency & Stock Photo Collage',
      '.audit-grid > div:nth-child(3) .audit-desc': 'The original game awkwardly collages NASA 3D renders, amateur royalty-free stock photos, cartoonish vector clip art, and low-resolution icons within the very same box.',
      '.audit-grid > div:nth-child(3) .audit-fix': '<strong>UX Solution:</strong> Unified industrial retrofuturistic identity inspired by ESA aerospace aesthetics and clean Swiss layout typography.',

      '.audit-grid > div:nth-child(4) .audit-flaw': '<i class="fa-solid fa-triangle-exclamation"></i> Critical Flaw 04',
      '.audit-grid > div:nth-child(4) .audit-title': 'Excessive Cognitive Load in Rules Prose',
      '.audit-grid > div:nth-child(4) .audit-desc': 'Cards spell out full redundant sentences like <em>"Increase your MegaCredit production by 1 step"</em> instead of using universal relational iconography grammar.',
      '.audit-grid > div:nth-child(4) .audit-fix': '<strong>UX Solution:</strong> Modular iconographic visual system with colored status containers indicating immediate, persistent passive, or end-game scoring triggers.',

      // Section 02: Before & After Wipe
      '#antes-depois .eyebrow': '<b>02</b> · Before & After',
      '#antes-depois h2': 'From flimsy paper to rigid industrial console',
      '#antes-depois .lede': 'Drag the divider slider to compare the original 2016 cardstock sheet with the proposed dual-layer board.',
      '.wipe-badge.left': 'NEW · DUAL-LAYER 3MM',
      '.wipe-badge.right': 'ORIGINAL · FLIMSY PAPER 2016',
      '#antes-depois figcaption': '<b>Interactive photographic comparison.</b> Drag the handle to contrast the original thin cardstock sheet (where any elbow nudge sent cubes flying) with the new laser-machined rigid console locking 8mm metal cubes securely.',

      // Section 03: Dual-Layer Mat Stage
      '#dual-layer .eyebrow': '<b>03</b> · Component Engineering',
      '#dual-layer h2': 'The Dual-Layer Dashboard',
      '#dual-layer .lede': 'Mechanical and graphic layout for a 280 × 190 mm rigid player console. Click any numeric slot below to simulate recessed mechanical cube snapping.',
      '.stage-mat .mat-header div > div': 'Interactive Simulator',
      '.stage-mat .mat-title': 'Corporation Control Console · Dual-Layer Spec',
      '.stage-mat .mat-legend span': '<i class="fa-solid fa-circle" style="color:var(--accent);"></i> Click a number to place the cube',

      '.res-slot:nth-child(1) .res-name': '<i class="fa-solid fa-coins" style="color:var(--mc-gold);"></i> MegaCredits (M€)',
      '.res-slot:nth-child(1) div[style*="font-size:11px"]': 'Production Track (-5 to +20):',
      '.res-slot:nth-child(2) .res-name': '<i class="fa-solid fa-cubes-stacked" style="color:var(--steel-gray);"></i> Steel (Fe)',
      '.res-slot:nth-child(2) div[style*="font-size:11px"]': 'Steel Production (+0 to +10):',
      '.res-slot:nth-child(3) .res-name': '<i class="fa-solid fa-rocket" style="color:var(--titanium-purple);"></i> Titanium (Space)',
      '.res-slot:nth-child(3) div[style*="font-size:11px"]': 'Titanium Production (+0 to +8):',
      '.res-slot:nth-child(4) .res-name': '<i class="fa-solid fa-leaf" style="color:var(--plant-green);"></i> Plants (Oxygen)',
      '.res-slot:nth-child(4) div[style*="font-size:11px"]': 'Plant Production (+0 to +10):',
      '.res-slot:nth-child(5) .res-name': '<i class="fa-solid fa-bolt" style="color:var(--energy-violet);"></i> Energy (Power)',
      '.res-slot:nth-child(5) div[style*="font-size:11px"]': 'Energy Production (+0 to +10):',
      '.res-slot:nth-child(6) .res-name': '<i class="fa-solid fa-fire-flame-curved" style="color:var(--heat-orange);"></i> Heat (Temp)',
      '.res-slot:nth-child(6) div[style*="font-size:11px"]': 'Heat Production (+0 to +12):',

      // Section 04: Card Splay Engine
      '#card-splay .eyebrow': '<b>04</b> · Table Economy',
      '#card-splay h2': 'The Cascading Card Engine (<em>Card Splay</em>)',
      '#card-splay .lede': 'Hover over or tap cards to see how standardized edge alignment stacks 30+ cards into a fraction of original physical space.',

      '.tm-card.green.c-1 div[style*="font-size:13px"]': 'ALGAE GREENHOUSES',
      '.tm-card.green.c-1 .card-body-text': 'Increase Plant production by +2 steps and gain 1 immediate victory point.',
      '.tm-card.blue.c-2 div[style*="font-size:13px"]': 'ORBITAL MIRROR',
      '.tm-card.blue.c-2 .card-body-text': '<strong>Action:</strong> Spend 7 M€ to raise global temperature by 1 step.',
      '.tm-card.red.c-3 div[style*="font-size:13px"]': 'ASTEROID IMPACT',
      '.tm-card.red.c-3 .card-body-text': 'Raise global temperature by +2°C and remove up to 3 plants from any player.',
      '.tm-card.green.c-4 div[style*="font-size:13px"]': 'TITANIUM MINING',
      '.tm-card.green.c-4 .card-body-text': 'Increase Titanium production by +1 step. Requires at least 1 Space tag in play.',

      '.splay-grid > div:nth-child(2) .eyebrow': 'Stacked Ergonomics',
      '.splay-grid > div:nth-child(2) h3': 'Flawless Tag & Cost Visibility',
      '.splay-grid > div:nth-child(2) p:nth-of-type(1)': 'In the original design, players had to unfold cards in messy vertical and horizontal grids across the table.',
      '.splay-grid > div:nth-child(2) p:nth-of-type(2)': 'By anchoring the <strong>Activation Cost</strong> and <strong>Category Tags</strong> strictly along the left 40mm margin, players can cascade dozens of cards revealing only headers—enabling end-game score counting in under 30 seconds.',

      '#card-splay figcaption': '<b>Studio macro photography (Linen Finish 310gsm).</b> Splay system demonstration: with just an 18mm margin exposed, MegaCredit costs and category tags remain 100% readable, allowing an engine of 30+ cards to fit into only 40 cm of table space.',

      // Section 05: Design System
      '#iconografia .eyebrow': '<b>05</b> · Design System',
      '#iconografia h2': 'Relational Iconography Language',
      '#iconografia .lede': 'Replacing walls of dense text with high-contrast icons boasting universal silhouettes recognizable from over 1 meter away.',

      '.icon-matrix .icon-item:nth-child(1) .icon-name': 'MegaCredit',
      '.icon-matrix .icon-item:nth-child(1) .icon-sub': 'Global Currency',
      '.icon-matrix .icon-item:nth-child(2) .icon-name': 'Steel (Fe)',
      '.icon-matrix .icon-item:nth-child(2) .icon-sub': 'Building Resource',
      '.icon-matrix .icon-item:nth-child(3) .icon-name': 'Titanium (Ti)',
      '.icon-matrix .icon-item:nth-child(3) .icon-sub': 'Space Resource',
      '.icon-matrix .icon-item:nth-child(4) .icon-name': 'Plant (O₂)',
      '.icon-matrix .icon-item:nth-child(4) .icon-sub': 'Converts to Oxygen',
      '.icon-matrix .icon-item:nth-child(5) .icon-name': 'Energy',
      '.icon-matrix .icon-item:nth-child(5) .icon-sub': 'Converts to Heat',
      '.icon-matrix .icon-item:nth-child(6) .icon-name': 'Heat',
      '.icon-matrix .icon-item:nth-child(6) .icon-sub': 'Raises Temperature',

      // Footer
      '.pf-footer .pf-fgrid > div:nth-child(1) .eyebrow': 'Next case',
      '.pf-footer .pf-fgrid > div:nth-child(2) h2': 'Let’s talk',
      '.pf-footer .pf-fgrid > div:nth-child(2) p': 'I can demonstrate the mechanical prototypes, laser die-cuts, and full component specifications in real time.'
    },

    es: {
      // Nav links
      '.pf-links a[href="#contexto"]': 'Contexto',
      '.pf-links a[href="#diagnostico"]': 'Diagnóstico',
      '.pf-links a[href="#antes-depois"]': 'Antes y Después',
      '.pf-links a[href="#dual-layer"]': 'Dual-Layer',
      '.pf-links a[href="#card-splay"]': 'Splay',
      '.pf-links a[href="#iconografia"]': 'Iconografía',

      // Hero
      '.pf-hero .eyebrow': '<b>Caso 06</b> · UX de Mesa · Rediseño de Componentes',
      '.pf-hero h1': 'Terraforming Mars: <em>Re-Engineered.</em>',
      '.pf-hero .lede': 'Un estudio exhaustivo de <strong>Arquitectura de Información, Ergonomía de Mesa y Diseño de Componentes</strong> para uno de los juegos de mesa más aclamados del mundo.',
      '.pf-meta div:nth-child(1) dt': 'Rol',
      '.pf-meta div:nth-child(1) dd': 'Diseño UX/UI, Ergonomía y Diseño de Componentes',
      '.pf-meta div:nth-child(2) dt': 'Proyecto',
      '.pf-meta div:nth-child(2) dd': 'Rediseño conceptual independiente · 2024',
      '.pf-meta div:nth-child(3) dt': 'Entregables',
      '.pf-meta div:nth-child(3) dd': 'Consola dual-layer, arquitectura de cartas (splay) e iconografía',
      '.pf-meta div:nth-child(4) dt': 'Herramientas',

      // Context
      '#contexto .eyebrow': 'El Problema',
      '#contexto h2': '¿Por qué uno de los mayores juegos del mundo necesitaba un rediseño?',
      '#contexto .lede': 'Con más de 100.000 valoraciones y en el top 5 mundial de BoardGameGeek, Terraforming Mars es una obra maestra del diseño lúdico de Jacob Fryxelius. No obstante, su producción original de 2016 sufre con tableros de papel fino que generan constante fricción física en la mesa.',
      '#contexto .callout': '<b>Objetivo de UX:</b> eliminar por completo la pérdida del estado de partida por golpes en la mesa, optimizar un 65% el área ocupada por las cartas y unificar la iconografía relacional.',
      '.tm-count .pf-card:nth-child(1) .tag': 'Ranking BGG',
      '.tm-count .pf-card:nth-child(1) p': 'en el ranking mundial de juegos de mesa estratégicos.',
      '.tm-count .pf-card:nth-child(2) .tag': 'Fricción Física',
      '.tm-count .pf-card:nth-child(2) p': 'cubos encajados en cavidades cortadas a láser milimétricas.',
      '.tm-count .pf-card:nth-child(3) .tag': 'Área de Mesa',
      '.tm-count .pf-card:nth-child(3) p': 'reducción del espacio por jugador con el sistema de splay de cartas.',
      '.tm-count .pf-card:nth-child(4) .tag': 'Ingeniería',
      '.tm-count .pf-card:nth-child(4) p': 'especificaciones industriales listas para fabricación gráfica.',

      // Section 01: El Diagnóstico
      '#diagnostico .eyebrow': '<b>01</b> · Diagnóstico',
      '#diagnostico h2': 'Los 4 puntos críticos de usabilidad en el diseño original',
      '#diagnostico .lede': 'Un análisis detallado de las fricciones ergonómicas y cognitivas que afectan a los jugadores durante partidas de 2 a 3 horas.',

      // Audit Cards
      '.audit-grid > div:nth-child(1) .audit-flaw': '<i class="fa-solid fa-triangle-exclamation"></i> Punto Crítico 01',
      '.audit-grid > div:nth-child(1) .audit-title': 'El Famoso "Tablero Resbaladizo"',
      '.audit-grid > div:nth-child(1) .audit-desc': 'Los tableros individuales son láminas lisas de cartulina fina. Cualquier toque accidental desplaza decenas de diminutos cubos de producción y recursos, arruinando partidas de 3 horas.',
      '.audit-grid > div:nth-child(1) .audit-fix': '<strong>Solución de UX:</strong> Ingeniería de panel de doble capa (*dual-layer mat*) de 3mm con cavidades cortadas por láser que bloquean cubos de 8mm con tolerancias mecánicas precisas.',

      '.audit-grid > div:nth-child(2) .audit-flaw': '<i class="fa-solid fa-triangle-exclamation"></i> Punto Crítico 02',
      '.audit-grid > div:nth-child(2) .audit-title': 'Colapso de Espacio en Mesa',
      '.audit-grid > div:nth-child(2) .audit-desc': 'Hacia la 8ª generación, cada jugador ha montado un motor de 25 a 40 cartas. Las cartas deben desplegarse enteras para mostrar sus etiquetas, ocupando más de 1,20m de mesa por jugador.',
      '.audit-grid > div:nth-child(2) .audit-fix': '<strong>Solución de UX:</strong> Arquitectura de cartas con borde izquierdo estandarizado (*Splay Margin* de 18mm). Al solaparlas en cascada, etiquetas y costes permanecen visibles ocupando un 65% menos de espacio.',

      '.audit-grid > div:nth-child(3) .audit-flaw': '<i class="fa-solid fa-triangle-exclamation"></i> Punto Crítico 03',
      '.audit-grid > div:nth-child(3) .audit-title': 'Inconsistencia Visual y Collage de Stock Photos',
      '.audit-grid > div:nth-child(3) .audit-desc': 'El juego original mezcla renderizados 3D de la NASA, fotografías amateur de stock, ilustraciones tipo cartoon e iconos pixelados en la misma caja.',
      '.audit-grid > div:nth-child(3) .audit-fix': '<strong>Solución de UX:</strong> Unificación bajo una identidad retrofuturista industrial limpia, inspirada en la estética aeroespacial de la ESA y diseño suizo.',

      '.audit-grid > div:nth-child(4) .audit-flaw': '<i class="fa-solid fa-triangle-exclamation"></i> Punto Crítico 04',
      '.audit-grid > div:nth-child(4) .audit-title': 'Carga Cognitiva Excesiva en Textos de Reglas',
      '.audit-grid > div:nth-child(4) .audit-desc': 'Las cartas repiten frases completas como <em>"Aumenta tu producción de MegaCréditos en 1 paso"</em> en lugar de usar sintaxis iconográfica relacional universal.',
      '.audit-grid > div:nth-child(4) .audit-fix': '<strong>Solución de UX:</strong> Sistema visual iconográfico modular con contenedores de color que indican si el efecto es inmediato, pasivo continuo o de puntuación final.',

      // Section 02: Antes y Después
      '#antes-depois .eyebrow': '<b>02</b> · Antes y Después',
      '#antes-depois h2': 'Del papel fino a la consola rígida industrial',
      '#antes-depois .lede': 'Desliza la línea divisoria para comparar el tablero individual de 2016 con el nuevo panel dual-layer propuesto.',
      '.wipe-badge.left': 'NUEVO · DUAL-LAYER 3MM',
      '.wipe-badge.right': 'ORIGINAL · PAPEL FINO 2016',
      '#antes-depois figcaption': '<b>Comparativa fotográfica interactiva.</b> Desliza la línea para contrastar la cartulina fina original (donde cualquier roce desplazaba los cubos) con la nueva consola rígida mecanizada a láser con cubos metálicos firmemente sujetos.',

      // Section 03: Dual-Layer Mat Stage
      '#dual-layer .eyebrow': '<b>03</b> · Ingeniería de Componentes',
      '#dual-layer h2': 'El Tablero de Doble Capa (Dual-Layer)',
      '#dual-layer .lede': 'Diseño mecánico y gráfico de un panel de jugador rígido de 280 × 190 mm. Haz clic en las ranuras para simular el anclaje de cubos.',
      '.stage-mat .mat-header div > div': 'Simulador Interactivo',
      '.stage-mat .mat-title': 'Corporation Control Console · Dual-Layer Spec',
      '.stage-mat .mat-legend span': '<i class="fa-solid fa-circle" style="color:var(--accent);"></i> Haz clic en un número para posicionar el cubo',

      '.res-slot:nth-child(1) .res-name': '<i class="fa-solid fa-coins" style="color:var(--mc-gold);"></i> MegaCréditos (M€)',
      '.res-slot:nth-child(1) div[style*="font-size:11px"]': 'Track de Producción (-5 a +20):',
      '.res-slot:nth-child(2) .res-name': '<i class="fa-solid fa-cubes-stacked" style="color:var(--steel-gray);"></i> Acero (Steel)',
      '.res-slot:nth-child(2) div[style*="font-size:11px"]': 'Producción de Acero (+0 a +10):',
      '.res-slot:nth-child(3) .res-name': '<i class="fa-solid fa-rocket" style="color:var(--titanium-purple);"></i> Titanio (Space)',
      '.res-slot:nth-child(3) div[style*="font-size:11px"]': 'Producción de Titanio (+0 a +8):',
      '.res-slot:nth-child(4) .res-name': '<i class="fa-solid fa-leaf" style="color:var(--plant-green);"></i> Plantas (Oxygen)',
      '.res-slot:nth-child(4) div[style*="font-size:11px"]': 'Producción de Plantas (+0 a +10):',
      '.res-slot:nth-child(5) .res-name': '<i class="fa-solid fa-bolt" style="color:var(--energy-violet);"></i> Energía (Power)',
      '.res-slot:nth-child(5) div[style*="font-size:11px"]': 'Producción de Energía (+0 a +10):',
      '.res-slot:nth-child(6) .res-name': '<i class="fa-solid fa-fire-flame-curved" style="color:var(--heat-orange);"></i> Calor (Temp)',
      '.res-slot:nth-child(6) div[style*="font-size:11px"]': 'Producción de Calor (+0 a +12):',

      // Section 04: Card Splay
      '#card-splay .eyebrow': '<b>04</b> · Economía de Mesa',
      '#card-splay h2': 'El Sistema de Cartas en Cascada (<em>Card Splay</em>)',
      '#card-splay .lede': 'Pasa el cursor o toca las cartas para comprobar cómo la alineación de bordes permite apilar 30+ cartas en una fracción del espacio físico.',

      '.tm-card.green.c-1 div[style*="font-size:13px"]': 'INVERNADEROS DE ALGAS',
      '.tm-card.green.c-1 .card-body-text': 'Aumenta la producción de Plantas en +2 pasos y gana 1 punto de victoria inmediato.',
      '.tm-card.blue.c-2 div[style*="font-size:13px"]': 'ESPEJO ORBITAL',
      '.tm-card.blue.c-2 .card-body-text': '<strong>Acción:</strong> Gasta 7 M€ para elevar la temperatura global en 1 paso.',
      '.tm-card.red.c-3 div[style*="font-size:13px"]': 'IMPACTO DE ASTEROIDE',
      '.tm-card.red.c-3 .card-body-text': 'Aumenta la temperatura en +2°C y retira hasta 3 plantas de cualquier rival.',
      '.tm-card.green.c-4 div[style*="font-size:13px"]': 'MINERÍA DE TITANIO',
      '.tm-card.green.c-4 .card-body-text': 'Aumenta tu producción de Titanio en +1 paso. Requiere tener 1 etiqueta espacial.',

      '.splay-grid > div:nth-child(2) .eyebrow': 'Ergonomía en Pila',
      '.splay-grid > div:nth-child(2) h3': 'Visibilidad Óptima de Etiquetas y Coste',
      '.splay-grid > div:nth-child(2) p:nth-of-type(1)': 'En el diseño original, el jugador debía desplegar las cartas en cuadrículas caóticas ocupando toda la mesa.',
      '.splay-grid > div:nth-child(2) p:nth-of-type(2)': 'Al concentrar el <strong>Coste de Activación</strong> y las <strong>Etiquetas de Categoría</strong> estrictamente a la izquierda en una franja de 40mm, se pueden apilar decenas de cartas mostrando solo sus cabeceras, permitiendo computar el puntaje final en menos de 30 segundos.',

      '#card-splay figcaption': '<b>Fotografía macro de estudio (Linen Finish 310gsm).</b> Demostración del sistema de splay: con una franja de solo 18mm expuesta, costes y etiquetas se mantienen 100% legibles, logrando que un motor de 30+ cartas ocupe apenas 40 cm de mesa.',

      // Section 05: Design System
      '#iconografia .eyebrow': '<b>05</b> · Sistema de Diseño',
      '#iconografia h2': 'Lenguaje de Iconografía Relacional',
      '#iconografia .lede': 'Sustituyendo bloques densos de texto por iconos de alto contraste con siluetas reconocibles a más de 1 metro de distancia.',

      '.icon-matrix .icon-item:nth-child(1) .icon-name': 'MegaCrédito',
      '.icon-matrix .icon-item:nth-child(1) .icon-sub': 'Moneda Global',
      '.icon-matrix .icon-item:nth-child(2) .icon-name': 'Acero (Steel)',
      '.icon-matrix .icon-item:nth-child(2) .icon-sub': 'Valor Constructivo',
      '.icon-matrix .icon-item:nth-child(3) .icon-name': 'Titanio',
      '.icon-matrix .icon-item:nth-child(3) .icon-sub': 'Valor Espacial',
      '.icon-matrix .icon-item:nth-child(4) .icon-name': 'Planta',
      '.icon-matrix .icon-item:nth-child(4) .icon-sub': 'Conversión a O₂',
      '.icon-matrix .icon-item:nth-child(5) .icon-name': 'Energía',
      '.icon-matrix .icon-item:nth-child(5) .icon-sub': 'Pasa a Calor en Ronda',
      '.icon-matrix .icon-item:nth-child(6) .icon-name': 'Calor',
      '.icon-matrix .icon-item:nth-child(6) .icon-sub': 'Eleva Temperatura',

      // Footer
      '.pf-footer .pf-fgrid > div:nth-child(1) .eyebrow': 'Siguiente caso',
      '.pf-footer .pf-fgrid > div:nth-child(2) h2': '¿Hablamos?',
      '.pf-footer .pf-fgrid > div:nth-child(2) p': 'Puedo mostrar los prototipos mecánicos, troqueles láser y especificaciones técnicas completas en directo.'
    },

    fr: {
      // Nav links
      '.pf-links a[href="#contexto"]': 'Contexte',
      '.pf-links a[href="#diagnostico"]': 'Diagnostic',
      '.pf-links a[href="#antes-depois"]': 'Avant & Après',
      '.pf-links a[href="#dual-layer"]': 'Dual-Layer',
      '.pf-links a[href="#card-splay"]': 'Splay',
      '.pf-links a[href="#iconografia"]': 'Iconographie',

      // Hero
      '.pf-hero .eyebrow': '<b>Cas 06</b> · UX Jeu de plateau · Refonte de Composants',
      '.pf-hero h1': 'Terraforming Mars: <em>Re-Engineered.</em>',
      '.pf-hero .lede': 'Une étude approfondie d’<strong>Architecture de l’Information, Ergonomie sur Table et Conception de Composants</strong> pour l’un des jeux de plateau les plus renommés au monde.',
      '.pf-meta div:nth-child(1) dt': 'Rôle',
      '.pf-meta div:nth-child(1) dd': 'Design UX/UI, Ergonomie et Conception de Composants',
      '.pf-meta div:nth-child(2) dt': 'Projet',
      '.pf-meta div:nth-child(2) dd': 'Refonte conceptuelle indépendante · 2024',
      '.pf-meta div:nth-child(3) dt': 'Livrables',
      '.pf-meta div:nth-child(3) dd': 'Console double couche, architecture de cartes (splay) et iconographie',
      '.pf-meta div:nth-child(4) dt': 'Outils',

      // Context
      '#contexto .eyebrow': 'Le Problème',
      '#contexto h2': 'Pourquoi l’un des plus grands jeux au monde nécessitait-il une refonte ?',
      '#contexto .lede': 'Fort de plus de 100 000 avis et figurant dans le top 5 mondial de BoardGameGeek, Terraforming Mars est un chef-d’œuvre ludique signé Jacob Fryxelius. Cependant, son édition d’origine de 2016 souffre de composants en carton léger causant une friction physique constante autour de la table.',
      '#contexto .callout': '<b>Objectif UX :</b> éliminer totalement la perte d’état de jeu due aux chocs sur la table, réduire de 65% l’emprise des cartes et unifier l’iconographie relationnelle.',
      '.tm-count .pf-card:nth-child(1) .tag': 'Classement BGG',
      '.tm-count .pf-card:nth-child(1) p': 'au classement mondial des jeux de stratégie.',
      '.tm-count .pf-card:nth-child(2) .tag': 'Friction Physique',
      '.tm-count .pf-card:nth-child(2) p': 'cubes verrouillés dans des cavités découpées au laser.',
      '.tm-count .pf-card:nth-child(3) .tag': 'Emprise sur Table',
      '.tm-count .pf-card:nth-child(3) p': 'de réduction d’espace par joueur grâce au système de splay.',
      '.tm-count .pf-card:nth-child(4) .tag': 'Ingénierie',
      '.tm-count .pf-card:nth-child(4) p': 'spécifications industrielles prêtes pour fabrication spécialisée.',

      // Section 01: Le Diagnostic
      '#diagnostico .eyebrow': '<b>01</b> · Diagnostic',
      '#diagnostico h2': 'Les 4 points critiques d’ergonomie du design d’origine',
      '#diagnostico .lede': 'Une analyse détaillée des frictions physiques et cognitives impactant les joueurs au fil de parties de 2 à 3 heures.',

      // Audit Cards
      '.audit-grid > div:nth-child(1) .audit-flaw': '<i class="fa-solid fa-triangle-exclamation"></i> Point Critique 01',
      '.audit-grid > div:nth-child(1) .audit-title': 'Le Célèbre "Plateau Glissant"',
      '.audit-grid > div:nth-child(1) .audit-desc': 'Les plateaux individuels sont de simples feuilles de carton couché lisse. Le moindre coup de coude déplace des dizaines de minuscules cubes de production, ruinant des parties de 3 heures.',
      '.audit-grid > div:nth-child(1) .audit-fix': '<strong>Solution UX :</strong> Ingénierie d’un plateau double couche (*dual-layer mat*) de 3mm avec encoches au laser maintenant fermement des cubes de 8mm avec tolérance mécanique.',

      '.audit-grid > div:nth-child(2) .audit-flaw': '<i class="fa-solid fa-triangle-exclamation"></i> Point Critique 02',
      '.audit-grid > div:nth-child(2) .audit-title': 'Encombrement et Saturation de l’Espace',
      '.audit-grid > div:nth-child(2) .audit-desc': 'Vers la 8e génération, chaque joueur gère un moteur de 25 à 40 cartes. Toutes doivent rester étalées pour exposer leurs badges, occupant plus de 1,20m de table par joueur.',
      '.audit-grid > div:nth-child(2) .audit-fix': '<strong>Solution UX :</strong> Architecture de cartes avec marge latérale gauche standardisée (*Splay Margin* de 18mm). En éventail, badges et coûts restent lisibles en réduisant l’encombrement de 65%.',

      '.audit-grid > div:nth-child(3) .audit-flaw': '<i class="fa-solid fa-triangle-exclamation"></i> Point Critique 03',
      '.audit-grid > div:nth-child(3) .audit-title': 'Incohérence Visuelle et Mosaïque de Banques d’Images',
      '.audit-grid > div:nth-child(3) .audit-desc': 'Le jeu d’origine juxtapose rendus 3D de la NASA, photographies amateur de banques d’images, cliparts cartoonesques et icônes pixélisées au sein d’une même boîte.',
      '.audit-grid > div:nth-child(3) .audit-fix': '<strong>Solution UX :</strong> Harmonisation sous une identité rétrofuturiste industrielle épurée, inspirée de l’esthétique spatiale de l’ESA et de la typographie suisse.',

      '.audit-grid > div:nth-child(4) .audit-flaw': '<i class="fa-solid fa-triangle-exclamation"></i> Point Critique 04',
      '.audit-grid > div:nth-child(4) .audit-title': 'Charge Cognitive Excessive dans le Texte des Règles',
      '.audit-grid > div:nth-child(4) .audit-desc': 'Les cartes répètent de longues phrases textuelles comme <em>"Augmentez votre production de MégaCrédits de 1 cran"</em> au lieu d’adopter une syntaxe iconographique universelle.',
      '.audit-grid > div:nth-child(4) .audit-fix': '<strong>Solution UX :</strong> Système visuel modulaire avec cartouches de couleur distinguant effets immédiats, passifs permanents et décomptes de victoire.',

      // Section 02: Avant et Après
      '#antes-depois .eyebrow': '<b>02</b> · Avant & Après',
      '#antes-depois h2': 'De la simple feuille de papier au tableau de bord rigide',
      '#antes-depois .lede': 'Glissez pour comparer le plateau individuel de 2016 avec la nouvelle console double couche.',
      '.wipe-badge.left': 'NOUVEAU · DOUBLE COUCHE 3MM',
      '.wipe-badge.right': 'ORIGINAL · PAPIER FIN 2016',
      '#antes-depois figcaption': '<b>Comparatif photographique interactif.</b> Déplacez le curseur pour confronter la fine feuille d’origine (où les cubes glissaient au moindre contact) avec la console rigide découpée au laser où les cubes s’emboîtent fermement.',

      // Section 03: Dual-Layer Mat Stage
      '#dual-layer .eyebrow': '<b>03</b> · Ingénierie de Composants',
      '#dual-layer h2': 'Le Tableau de Bord Double Couche',
      '#dual-layer .lede': 'Conception mécanique et graphique d’un plateau joueur rigide de 280 × 190 mm. Cliquez sur les chiffres ci-dessous pour simuler le calage des cubes.',
      '.stage-mat .mat-header div > div': 'Simulateur Interactif',
      '.stage-mat .mat-title': 'Corporation Control Console · Spécifications Dual-Layer',
      '.stage-mat .mat-legend span': '<i class="fa-solid fa-circle" style="color:var(--accent);"></i> Cliquez sur un chiffre pour placer le cube',

      '.res-slot:nth-child(1) .res-name': '<i class="fa-solid fa-coins" style="color:var(--mc-gold);"></i> MégaCrédits (M€)',
      '.res-slot:nth-child(1) div[style*="font-size:11px"]': 'Piste de Production (-5 à +20) :',
      '.res-slot:nth-child(2) .res-name': '<i class="fa-solid fa-cubes-stacked" style="color:var(--steel-gray);"></i> Acier (Steel)',
      '.res-slot:nth-child(2) div[style*="font-size:11px"]': 'Production d’Acier (+0 à +10) :',
      '.res-slot:nth-child(3) .res-name': '<i class="fa-solid fa-rocket" style="color:var(--titanium-purple);"></i> Titane (Space)',
      '.res-slot:nth-child(3) div[style*="font-size:11px"]': 'Production de Titane (+0 à +8) :',
      '.res-slot:nth-child(4) .res-name': '<i class="fa-solid fa-leaf" style="color:var(--plant-green);"></i> Plantes (Oxygen)',
      '.res-slot:nth-child(4) div[style*="font-size:11px"]': 'Production de Plantes (+0 à +10) :',
      '.res-slot:nth-child(5) .res-name': '<i class="fa-solid fa-bolt" style="color:var(--energy-violet);"></i> Énergie (Power)',
      '.res-slot:nth-child(5) div[style*="font-size:11px"]': 'Production d’Énergie (+0 à +10) :',
      '.res-slot:nth-child(6) .res-name': '<i class="fa-solid fa-fire-flame-curved" style="color:var(--heat-orange);"></i> Chaleur (Temp)',
      '.res-slot:nth-child(6) div[style*="font-size:11px"]': 'Production de Chaleur (+0 à +12) :',

      // Section 04: Card Splay
      '#card-splay .eyebrow': '<b>04</b> · Économie d’Espace',
      '#card-splay h2': 'Le Système de Cartes en Cascade (<em>Card Splay</em>)',
      '#card-splay .lede': 'Survolez ou touchez les cartes pour découvrir comment l’alignement latéral standardisé permet d’empiler plus de 30 cartes sur un espace physique réduit.',

      '.tm-card.green.c-1 div[style*="font-size:13px"]': 'SERRES D’ALGUES',
      '.tm-card.green.c-1 .card-body-text': 'Augmentez la production de Plantes de +2 crans et gagnez 1 point de victoire immédiat.',
      '.tm-card.blue.c-2 div[style*="font-size:13px"]': 'MIROIR ORBITAL',
      '.tm-card.blue.c-2 .card-body-text': '<strong>Action :</strong> Dépensez 7 M€ pour augmenter la température globale de 1 cran.',
      '.tm-card.red.c-3 div[style*="font-size:13px"]': 'IMPACT D’ASTÉROÏDE',
      '.tm-card.red.c-3 .card-body-text': 'Augmentez la température globale de +2°C et retirez jusqu’à 3 plantes à n’importe quel joueur.',
      '.tm-card.green.c-4 div[style*="font-size:13px"]': 'EXTRACTION DE TITANE',
      '.tm-card.green.c-4 .card-body-text': 'Augmentez votre production de Titane de +1 cran. Nécessite 1 badge Espace en jeu.',

      '.splay-grid > div:nth-child(2) .eyebrow': 'Ergonomie en Pile',
      '.splay-grid > div:nth-child(2) h3': 'Visibilité Totale des Badges et Coûts',
      '.splay-grid > div:nth-child(2) p:nth-of-type(1)': 'Dans le format d’origine, les joueurs devaient disposer les cartes de façon anarchique sur toute la table.',
      '.splay-grid > div:nth-child(2) p:nth-of-type(2)': 'En alignant strictement le <strong>Coût d’Activation</strong> et les <strong>Badges de Catégorie</strong> sur une bande gauche de 40mm, on peut empiler des dizaines de cartes tout en gardant les en-têtes visibles, permettant un calcul des points de fin de partie en moins de 30 secondes.',

      '#card-splay figcaption': '<b>Photographie macro de studio (Finition Lin 310gsm).</b> Démonstration du système de cascade : avec une bordure de seulement 18mm visible, les coûts et badges restent 100% lisibles, permettant à un moteur de 30+ cartes d’occuper seulement 40 cm sur la table.',

      // Section 05: Design System
      '#iconografia .eyebrow': '<b>05</b> · Système de Design',
      '#iconografia h2': 'Le Langage d’Iconographie Relationnelle',
      '#iconografia .lede': 'Remplacement des blocs de prose par des pictogrammes à fort contraste reconnaissables à plus de 1 mètre de distance.',

      '.icon-matrix .icon-item:nth-child(1) .icon-name': 'MégaCrédit',
      '.icon-matrix .icon-item:nth-child(1) .icon-sub': 'Monnaie Mondiale',
      '.icon-matrix .icon-item:nth-child(2) .icon-name': 'Acier (Steel)',
      '.icon-matrix .icon-item:nth-child(2) .icon-sub': 'Ressource Bâtiment',
      '.icon-matrix .icon-item:nth-child(3) .icon-name': 'Titane (Ti)',
      '.icon-matrix .icon-item:nth-child(3) .icon-sub': 'Ressource Spatiale',
      '.icon-matrix .icon-item:nth-child(4) .icon-name': 'Plante (O₂)',
      '.icon-matrix .icon-item:nth-child(4) .icon-sub': 'Conversion en Oxygène',
      '.icon-matrix .icon-item:nth-child(5) .icon-name': 'Énergie',
      '.icon-matrix .icon-item:nth-child(5) .icon-sub': 'Convertie en Chaleur',
      '.icon-matrix .icon-item:nth-child(6) .icon-name': 'Chaleur',
      '.icon-matrix .icon-item:nth-child(6) .icon-sub': 'Augmente la Température',

      // Footer
      '.pf-footer .pf-fgrid > div:nth-child(1) .eyebrow': 'Projet suivant',
      '.pf-footer .pf-fgrid > div:nth-child(2) h2': 'Parlons-en',
      '.pf-footer .pf-fgrid > div:nth-child(2) p': 'Je peux vous présenter les prototypes mécaniques, les gabarits de découpe laser et les spécifications complètes en direct.'
    }
  };

  if (window.PORTFOLIO_I18N && window.PORTFOLIO_I18N.registerCase) {
    window.PORTFOLIO_I18N.registerCase(CASE_SLUG, translations);
  } else {
    window.PORTFOLIO_CASES_I18N = window.PORTFOLIO_CASES_I18N || {};
    window.PORTFOLIO_CASES_I18N[CASE_SLUG] = translations;
  }
})();

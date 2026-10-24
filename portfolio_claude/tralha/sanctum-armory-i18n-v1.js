/* ==========================================================================
   Translations for Case 16: Musanga · Loot & Accessible Inventory (sanctum-armory)
   Supported: en (English), es (Español), fr (Français)
   ========================================================================== */
(function(){
  'use strict';

  var CASE_SLUG = 'sanctum-armory';

  var translations = {
    en: {
      '.pf-hero .eyebrow': '<b>Case 16</b> · Game UI/UX · High-Density Inventory & Body-Bound Loot Architecture',
      '.pf-hero h1': 'The first item in the game is <em>an old rusty bolt.</em>',
      '.pf-hero .lede': 'Musanga is a narrative RPG following an enslaved woman escaping in 1800 colonial Brazil. Stripped of magical backpacks or fantasy tropes, survival hinges strictly upon what she binds to her flesh and torso cloth (Pano da Costa). I designed a visceral inventory architecture where only items touching the skin or fastened to the body grant active traits, featuring a comparative loot flow, a 10×6 spatial grid, and colorblind-first accessibility, validated in a playable 60 FPS prototype.',

      // Meta
      '.pf-meta div:nth-child(1) dd': 'Lead Game UI/UX, systems architecture, and art direction',
      '.pf-meta div:nth-child(2) dd': 'High-Density Narrative RPG / AAA Benchmarks',
      '.pf-meta div:nth-child(3) dd': 'Data models, loot comparison flow, 10×6 grid, cognitive budgets, accessibility',
      '.pf-meta div:nth-child(4) dd': 'HTML5, CSS Grid, JavaScript ES6, WebAudio Synth',

      // Metrics
      '.ms-metrics div:nth-child(1) span': 'Tooltip anatomy divided into 3 cognitive reading budgets',
      '.ms-metrics div:nth-child(2) span': 'Physical weight management with bin-packing layout',
      '.ms-metrics div:nth-child(3) span': 'Accessibility with 4 redundant cues and blue/orange deltas',
      '.ms-metrics div:nth-child(4) span': 'ItemDef vs ItemInstance separation ready for Unreal/Unity',

      // Links
      '.pf-links a[href="#diferencial"]': 'Differentiator',
      '.pf-links a[href="#arquitetura"]': 'Architecture',
      '.pf-links a[href="#loot"]': 'Loot & Tooltips',
      '.pf-links a[href="#mochila"]': 'Prototype',
      '.pf-links a[href="#grade"]': '10×6 Grid',
      '.pf-links a[href="#acessibilidade"]': 'Accessibility',
      '.pf-links a[href="#engenharia"]': 'Engine Handoff',

      // Differentiator
      '#diferencial .eyebrow': '<b>Overview</b> · What this study demonstrates',
      '#diferencial h2': 'Inventory is a system, not a screenshot of a weapon.',
      '#diferencial .lede': 'Data, cognition, spatial geometry, accessibility, and interaction. Each dimension connects to an active engineering decision in this case.',

      // Architecture
      '#arquitetura .eyebrow': '<b>01</b> · Data Architecture',
      '#arquitetura h2': 'Separating what an item is from what happened to it.',
      '#arquitetura .lede': 'An immutable definition authored as game data, and a lightweight instance storing only runtime alterations. Balancing adjustments take one row change, savegames stay compact, and localization works with keys.',

      // Loot
      '#loot .eyebrow': '<b>02</b> · Loot Flow & Instant Comparison',
      '#loot h2': 'Compare without carrying numbers in your head.',
      '#loot .lede': 'Newly discovered objects display alongside equipped counterparts with calculated differences pre-computed, benchmarking <em>Diablo IV</em> and <em>Destiny 2</em> inspections. Reading operates on three cognitive budgets: Macro (~0.5s), Meso (~1.5s), and Micro (~3s). Gain and loss deltas use blue and orange rather than green/red, preserving contrast across common forms of colorblindness.',
      '#loot figcaption': '<b>Recreation of the prototype comparison panel.</b> Values for Short Lever and Metal Scrap reflect prototype stats. Layer timings represent cognitive design goals.',

      // Backpack / Prototype
      '#mochila .eyebrow': '<b>Prototype</b> · Playable in browser',
      '#mochila h2': 'Untie the knot of the torso cloth.',
      '#mochila .lede': 'In a forest hollow, Musanga unknots her Pano da Costa, spreading the fabric across the ground to triage survival equipment. Select and inspect items. Rotate with R, move with Alt + arrows, craft plant fiber modifications, or toggle compact slot views.',
      '#mochila .ms-band-actions .pf-btn': 'Open Full Screen ↗',
      '#mochila .ms-band-actions .ms-ghost': 'How the Cloth Works',
      '#mochila figcaption': '<b>Functional live prototype.</b> Rendered at 60 FPS with procedural WebAudio feedback and real-time colorblind matrix shaders.',

      // Spatial Grid
      '#grade .eyebrow': '<b>03</b> · Spatial Grid',
      '#grade h2': 'Cloth laid on wet soil: every fold and pound matters.',
      '#grade .lede': 'The celebrated "Item Tetris" of <em>Diablo II</em> and <em>Resident Evil 4</em>, reframed through the historical hardship of escape. A fugitive carries no rigid suitcase, but heavy bundled fabric where every item commands physical volume. Heavy iron tools strain the back and produce betraying clatter in the brush unless padded.',
      '#grade figcaption': '<b>Diagram reproducing prototype behavior.</b> Cell collisions, rotations, and occupancy limits reflect live engine rules.',

      // Accessibility
      '#acessibilidade .eyebrow': '<b>04</b> · Accessibility & Universal Design',
      '#acessibilidade h2': 'Rarity remains instantly readable without color.',
      '#acessibilidade .lede': 'Copper and gold look nearly identical to many players. Every tier employs four simultaneous cues: naming, geometric icon, procedural hatch pattern, and border weight. Color is merely the final layer.',
      '#acessibilidade #monoBtn': 'View without color',
      '#acessibilidade .callout': '<b>Xbox XAG 102 & CVAA Compliance:</b> Eliminates exclusive reliance on chromatic channels. Combining Semantic Names + Geometric Glyphs (●, ◆, ❖, ✦) + Procedural Hatching + Border Hierarchies guarantees identification under severe Protanopia, Deuteranopia, Tritanopia, or full B&W display.',

      // Visual System
      '#sistema .eyebrow': '<b>05</b> · Visual Design System',
      '#sistema h2': 'Wet timber, tarnished copper, and trade beads.',
      '#sistema .lede': 'Derived from narrative atmosphere: ship hold shadows, oxidized metals, and raw linen. The blue and orange contrast deltas maintain distinct luminescence across all vision spectrums.',

      // Engine
      '#engenharia .eyebrow': '<b>06</b> · Engine Pipeline & Technical Handoff',
      '#engenharia h2': 'Engineered for direct Unreal Engine integration.',
      '#engenharia .lede': 'Eliminating developer friction by designing UI assets directly for Unreal Engine (UMG / Slate) and Unity data pipelines from day one.',
      '#engenharia .grid-3 article:nth-child(1) h3': 'UDataAsset Architecture',
      '#engenharia .grid-3 article:nth-child(1) p': 'The <code>ItemDef</code> schema binds straight into C++ DataTables and PrimaryDataAssets, allowing designers to tune stats without touching UI blueprints.',
      '#engenharia .grid-3 article:nth-child(2) h3': 'Decoupled Memory & Savegames',
      '#engenharia .grid-3 article:nth-child(2) p': 'Saving player state requires serializing only item IDs, grid coordinates, and rotation flags, preventing save corruption across game updates.',
      '#engenharia .grid-3 article:nth-child(3) h3': '10-Foot Living Room Ergonomics',
      '#engenharia .grid-3 article:nth-child(3) p': 'Clear high-contrast navigation focus rings calibrated for gamepad thumbsticks ensure comfortable readability on 3-meter TV screens.'
    },

    es: {
      '.pf-hero .eyebrow': '<b>Caso 16</b> · Game UI/UX · Inventario de Alta Densidad y Botín Anclado al Cuerpo',
      '.pf-hero h1': 'El primer objeto del juego es <em>un tornillo oxidado.</em>',
      '.pf-hero .lede': 'Musanga es un RPG narrativo sobre una mujer esclavizada en fuga en el Brasil colonial de 1800. Sin mochilas ni licencias fantásticas, su supervivencia depende exclusivamente de lo que lleva atado a su cuerpo y en el Pano da Costa (tela tradicional anudada al torso). Diseñé la arquitectura de un inventario visceral donde solo otorga beneficios activos lo que roza la piel o va atado al cuerpo, con flujo de botín comparativo, cuadrícula 10×6 y accesibilidad para daltónicos, probado en un prototipo a 60 FPS.',

      // Meta
      '.pf-meta div:nth-child(1) dd': 'Lead Game UI/UX, arquitectura de sistemas y dirección de arte',
      '.pf-meta div:nth-child(2) dd': 'RPG Narrativo de Alta Densidad / Referentes AAA',
      '.pf-meta div:nth-child(3) dd': 'Modelo de datos, flujo de botín, rejilla 10×6, presupuestos cognitivos, accesibilidad',
      '.pf-meta div:nth-child(4) dd': 'HTML5, CSS Grid, JavaScript ES6, WebAudio Synth',

      // Metrics
      '.ms-metrics div:nth-child(1) span': 'Anatomía de tooltip dividida en 3 presupuestos cognitivos',
      '.ms-metrics div:nth-child(2) span': 'Gestión de peso físico con empaquetamiento espacial',
      '.ms-metrics div:nth-child(3) span': 'Accesibilidad con 4 señales redundantes y deltas azul/naranja',
      '.ms-metrics div:nth-child(4) span': 'Separación ItemDef / ItemInstance lista para Unreal y Unity',

      // Links
      '.pf-links a[href="#diferencial"]': 'Diferencial',
      '.pf-links a[href="#arquitetura"]': 'Arquitectura',
      '.pf-links a[href="#loot"]': 'Botín y Tooltip',
      '.pf-links a[href="#mochila"]': 'Prototipo',
      '.pf-links a[href="#grade"]': 'Cuadrícula 10×6',
      '.pf-links a[href="#acessibilidade"]': 'Accesibilidad',
      '.pf-links a[href="#engenharia"]': 'Handoff Motor',

      // Differentiator
      '#diferencial .eyebrow': '<b>Visión general</b> · Lo que aporta este caso',
      '#diferencial h2': 'El inventario es un sistema, no una captura de un arma.',
      '#diferencial .lede': 'Datos, lectura cognitiva, espacio, accesibilidad e interacción. Cada aspecto responde a una decisión técnica contrastada.',

      // Architecture
      '#arquitetura .eyebrow': '<b>01</b> · Modelo de Datos',
      '#arquitetura h2': 'Separar la esencia del objeto de su estado transitorio.',
      '#arquitetura .lede': 'Una definición inmutable en tablas de diseño y una instancia ligera que almacena solo alteraciones de partida. Ajustar el equilibrio exige editar una sola fila, las partidas ocupan poco y la traducción trabaja con claves.',

      // Loot
      '#loot .eyebrow': '<b>02</b> · Flujo de Botín y Comparativa',
      '#loot h2': 'Comparar sin tener que memorizar cifras.',
      '#loot .lede': 'El objeto descubierto se visualiza junto al equipado con las diferencias precalculadas, siguiendo las mejores prácticas de <em>Diablo IV</em> y <em>Destiny 2</em>. La lectura se divide en tres niveles: Macro (~0,5 s), Meso (~1,5 s) y Micro (~3 s). Las variaciones usan azul y naranja en lugar de rojo y verde, protegiendo la lectura en daltonismos habituales.',
      '#loot figcaption': '<b>Recreación del panel de comparación del prototipo.</b> Valores de la Palanca y la Chapa metálica tomados del simulador. Tiempos definidos como objetivos cognitivos.',

      // Backpack / Prototype
      '#mochila .eyebrow': '<b>Prototipo</b> · Jugable en navegador',
      '#mochila h2': 'Desata el hatillo de tela.',
      '#mochila .lede': 'En el refugio del bosque, Musanga desata el Pano da Costa y extiende la tela en el suelo para organizar su equipo. Selecciona y compara. Rota con R, mueve con Alt + flechas, aplica mejoras de fibra vegetal y prueba la legibilidad en blanco y negro.',
      '#mochila .ms-band-actions .pf-btn': 'Abrir a Pantalla Completa ↗',
      '#mochila .ms-band-actions .ms-ghost': 'Cómo Funciona la Tela',
      '#mochila figcaption': '<b>Prototipo funcional operativo.</b> Ejecutado a 60 FPS con sonido procedural WebAudio y simulación de filtros de daltonismo.',

      // Spatial Grid
      '#grade .eyebrow': '<b>03</b> · Cuadrícula Espacial',
      '#grade h2': 'La tela extendida en el refugio: cada pliegue y gramo cuenta.',
      '#grade .lede': 'El célebre "Item Tetris" de <em>Diablo II</em> y el maletín de <em>Resident Evil 4</em> resignificados por el rigor histórico de la fuga. Una fugitiva no transporta una maleta rígida, sino una tela gruesa donde cada útil ocupa volumen físico real.',
      '#grade figcaption': '<b>Diagrama del prototipo.</b> Colisiones de celdas, giros y límites de peso calculados según las reglas del motor.',

      // Accessibility
      '#acessibilidade .eyebrow': '<b>04</b> · Accesibilidad Universal',
      '#acessibilidade h2': 'La rareza sigue siendo legible sin color.',
      '#acessibilidade .lede': 'El cobre y el oro resultan indistinguibles para muchos usuarios. Cada nivel incorpora cuatro pistas simultáneas: denominación, símbolo, textura rayada y grosor de marco. El color es solo el último recurso.',
      '#acessibilidade #monoBtn': 'Ver en monocromo',
      '#acessibilidade .callout': '<b>Cumplimiento con Xbox XAG 102 y CVAA:</b> Se elimina la dependencia del canal cromático. La combinación de Nombre + Símbolo Geométrico (●, ◆, ❖, ✦) + Trama + Borde asegura distinción bajo Protanopia, Deuteranopia, Tritanopia o blanco y negro total.',

      // Visual System
      '#sistema .eyebrow': '<b>05</b> · Sistema Visual',
      '#sistema h2': 'Madera húmeda, cobre y cuentas, sin artificios mágicos.',
      '#sistema .lede': 'Inspirado en la atmósfera del relato: sombras de bodega, metal desgastado y lino rústico. Los tonos azul y naranja para ganancias y pérdidas garantizan contraste en cualquier espectro visual.',

      // Engine
      '#engenharia .eyebrow': '<b>06</b> · Integración con Motores y Handoff',
      '#engenharia h2': 'Concebido para ser programado en Unreal Engine.',
      '#engenharia .lede': 'Diseñado desde los primeros bocetos para sincronizarse con las estructuras de datos de Unreal Engine (UMG / Slate) y Unity.',
      '#engenharia .grid-3 article:nth-child(1) h3': 'Tablas UDataAsset',
      '#engenharia .grid-3 article:nth-child(1) p': 'La especificación <code>ItemDef</code> mapea con DataTables en C++ y Blueprints, facilitando el balanceo numérico sin tocar interfaces.',
      '#engenharia .grid-3 article:nth-child(2) h3': 'Memoria y Partidas Desacopladas',
      '#engenharia .grid-3 article:nth-child(2) p': 'Guardar partida solo requiere serializar IDs, posiciones X/Y y orientación, evitando que parches de balanceo corrompan datos antiguos.',
      '#engenharia .grid-3 article:nth-child(3) h3': 'Ergonomía de Salón (10-Foot UI)',
      '#engenharia .grid-3 article:nth-child(3) p': 'Foco de navegación de alto contraste optimizado para cruceta y sticks analógicos, garantizando legibilidad en televisores a 3 metros.'
    },

    fr: {
      '.pf-hero .eyebrow': '<b>Projet 16</b> · Game UI/UX · Inventaire Haute Densité & Butin Porté au Corps',
      '.pf-hero h1': 'Le tout premier objet du jeu est <em>un vieux boulon rouillé.</em>',
      '.pf-hero .lede': 'Musanga est un RPG narratif contant la fuite d’une femme asservie dans le Brésil colonial des années 1800. Dénuée de sacoche magique ou d’artifices héroïques, sa survie repose uniquement sur ce qu’elle noue autour de son corps et dans son Pano da Costa (étoffe traditionnelle ceignant le buste). J’ai conçu l’architecture d’un inventaire viscéral où seuls les objets en contact avec la peau confèrent des capacités actives, doté d’un flux de loot comparatif, d’une grille spatiale 10×6 et d’une accessibilité totale aux daltonismes, éprouvé dans un prototype jouable à 60 FPS.',

      // Meta
      '.pf-meta div:nth-child(1) dd': 'Lead Game UI/UX, architecture de systèmes et direction artistique',
      '.pf-meta div:nth-child(2) dd': 'RPG Narratif Haute Densité / Benchmarks AAA',
      '.pf-meta div:nth-child(3) dd': 'Modèle de données, flux de comparaison, grille 10×6, budgets cognitifs, accessibilité',
      '.pf-meta div:nth-child(4) dd': 'HTML5, CSS Grid, JavaScript ES6, WebAudio Synth',

      // Metrics
      '.ms-metrics div:nth-child(1) span': 'Anatomie du tooltip structurée en 3 budgets de lecture cognitive',
      '.ms-metrics div:nth-child(2) span': 'Gestion du poids et de l’encombrement par agencement spatial',
      '.ms-metrics div:nth-child(3) span': 'Accessibilité Xbox XAG 102 avec 4 repères redondants et deltas bleu/orange',
      '.ms-metrics div:nth-child(4) span': 'Distinction ItemDef vs ItemInstance compatible Unreal et Unity',

      // Links
      '.pf-links a[href="#diferencial"]': 'Différenciation',
      '.pf-links a[href="#arquitetura"]': 'Architecture',
      '.pf-links a[href="#loot"]': 'Loot & Infobulle',
      '.pf-links a[href="#mochila"]': 'Prototype',
      '.pf-links a[href="#grade"]': 'Grille 10×6',
      '.pf-links a[href="#acessibilidade"]': 'Accessibilité',
      '.pf-links a[href="#engenharia"]': 'Handoff Moteur',

      // Differentiator
      '#diferencial .eyebrow': '<b>Vue d’ensemble</b> · Ce que démontre ce projet',
      '#diferencial h2': 'Un inventaire est un système, pas une simple capture d’arme.',
      '#diferencial .lede': 'Données, cognition, géométrie spatiale, accessibilité et ergonomie. Chaque dimension traduit une décision d’ingénierie concrète.',

      // Architecture
      '#arquitetura .eyebrow': '<b>01</b> · Architecture des Données',
      '#arquitetura h2': 'Dissocier la nature d’un objet de son historique de jeu.',
      '#arquitetura .lede': 'Une définition immuable rédigée dans les tables de conception, et une instance épurée mémorisant uniquement les altérations en cours. Équilibrer le jeu s’effectue sur une seule ligne, les sauvegardes restent légères et la localisation exploite des identifiants.',

      // Loot
      '#loot .eyebrow': '<b>02</b> · Flux de Butin & Comparaison Instantanée',
      '#loot h2': 'Comparer sans encombrer la mémoire de travail.',
      '#loot .lede': 'L’objet ramassé s’affiche aux côtés de l’élément équipé avec calcul automatique des écarts, s’inspirant des références <em>Diablo IV</em> et <em>Destiny 2</em>. La lecture s’organise en trois paliers : Macro (~0,5 s), Méso (~1,5 s) et Micro (~3 s). Les gains et pertes s’expriment en bleu et orange afin de garantir la lisibilité pour tous les types de daltonisme.',
      '#loot figcaption': '<b>Recréation du module comparatif du prototype.</b> Les valeurs du Levier et de la Pièce métallique sont issues du simulateur. Les temps de lecture constituent des repères ergonomiques.',

      // Backpack / Prototype
      '#mochila .eyebrow': '<b>Prototype</b> · Jouable dans le navigateur',
      '#mochila h2': 'Dénouez l’étoffe de transport.',
      '#mochila .lede': 'À l’abri de la forêt, Musanga défait le nœud de son Pano da Costa et étale le tissu à même le sol pour réorganiser son équipement. Sélectionnez et comparez. Faites pivoter avec R, déplacez avec Alt + flèches, appliquez des tresses végétales et testez la lecture en noir et blanc.',
      '#mochila .ms-band-actions .pf-btn': 'Ouvrir en Plein Écran ↗',
      '#mochila .ms-band-actions .ms-ghost': 'Fonctionnement du Tissu',
      '#mochila figcaption': '<b>Prototype interactif fonctionnel.</b> Exécuté à 60 FPS avec synthèse sonore procédurale WebAudio et simulation de filtres daltoniens.',

      // Spatial Grid
      '#grade .eyebrow': '<b>03</b> · Grille Spatiale',
      '#grade h2': 'Le tissu étendu dans la clairière : chaque pli et gramme pèse.',
      '#grade .lede': 'Le principe emblématique de l’« Item Tetris » de <em>Diablo II</em> et de <em>Resident Evil 4</em>, réinvesti par la gravité historique de la fuite. Une fugitive ne dispose pas d’une malle rigide, mais d’un tissu épais où chaque outil occupe un volume tangible. Les pièces de ferraille doivent être emmaillotées pour ne pas s’entrechoquer bruyamment en pleine nuit.',
      '#grade figcaption': '<b>Schéma fonctionnel du prototype.</b> Détection de collision, pivotement et règles d’encombrement fidèles au moteur.',

      // Accessibility
      '#acessibilidade .eyebrow': '<b>04</b> · Accessibilité & Conception Universelle',
      '#acessibilidade h2': 'La rareté reste immédiatement compréhensible sans couleur.',
      '#acessibilidade .lede': 'Le cuivre et l’or se confondent pour de nombreux regards. Chaque palier combine quatre repères simultanés : appellation, glyphe géométrique, trame hachurée et épaisseur de contour. La teinte n’est qu’un complément.',
      '#acessibilidade #monoBtn': 'Afficher sans couleur',
      '#acessibilidade .callout': '<b>Conformité aux recommandations Xbox XAG 102 & CVAA :</b> Suppression de la dépendance chromatique exclusive. L’association Intitulé + Symbole Géométrique (●, ◆, ❖, ✦) + Hachure + Bordure garantit l’identification sous filtres de Protanopie, Deutéranopie, Tritanopie ou monochrome pur.',

      // Visual System
      '#sistema .eyebrow': '<b>05</b> · Système Visuel',
      '#sistema h2': 'Bois mouillé, cuivre terni et perles de traite.',
      '#sistema .lede': 'L’interface reflète la lumière du récit : pénombre de cale, métaux patinés et lin brut. Les tons bleu et orange pour les deltas de caractéristiques assurent un contraste net sur tout le spectre.',

      // Engine
      '#engenharia .eyebrow': '<b>06</b> · Pipeline Moteur & Handoff Technique',
      '#engenharia h2': 'Pensé pour une intégration directe sous Unreal Engine.',
      '#engenharia .lede': 'Conçu dès les premières esquisses pour s’interfacer naturellement avec les architectures de données d’Unreal Engine (UMG / Slate) et Unity.',
      '#engenharia .grid-3 article:nth-child(1) h3': 'Architecture UDataAsset',
      '#engenharia .grid-3 article:nth-child(1) p': 'Le schéma <code>ItemDef</code> correspond trait pour trait aux DataTables et PrimaryDataAssets en C++, permettant l’équilibrage continu des valeurs sans rouvrir les interfaces.',
      '#engenharia .grid-3 article:nth-child(2) h3': 'Sauvegardes et Mémoire Découplées',
      '#engenharia .grid-3 article:nth-child(2) p': 'La sauvegarde de session ne sérialise que les identifiants, coordonnées et orientations, protégeant les sauvegardes existantes lors des mises à jour.',
      '#engenharia .grid-3 article:nth-child(3) h3': 'Ergonomie Manette & Grand Écran',
      '#engenharia .grid-3 article:nth-child(3) p': 'États de focus très contrastés calibrés pour le stick analogique, garantissant une navigation reposante à 3 mètres d’un téléviseur.'
    }
  };

  if (window.PORTFOLIO_I18N && window.PORTFOLIO_I18N.registerCase) {
    window.PORTFOLIO_I18N.registerCase(CASE_SLUG, translations);
  } else {
    window.PORTFOLIO_CASES_I18N = window.PORTFOLIO_CASES_I18N || {};
    window.PORTFOLIO_CASES_I18N[CASE_SLUG] = translations;
  }
})();

/* ==========================================================================
   Translations for Case 05: Projeto Força BR (forca-br)
   Supported: en (English), es (Español), fr (Français)
   ========================================================================== */
(function(){
  'use strict';

  var CASE_SLUG = 'forca-br';

  var translations = {
    en: {
      '.pf-hero .eyebrow': '<b>Case 05</b> · Board Game · Graphic Design',
      '.pf-hero h1': 'A nationwide tactical command center, <em>rendered in tabletop paper.</em>',
      '.pf-hero .lede': 'Projeto Força BR is a cooperative tabletop board game where folklore-inspired Brazilian superheroes defend regional biomes from supervillains and ecological crises. I designed the complete visual architecture: cards, radar board, player consoles, tokens, and hero emblems.',

      // Meta
      '.pf-meta div:nth-child(1) dd': 'Graphic design, hero emblems & radar map',
      '.pf-meta div:nth-child(2) dd': 'Pindorama Editora · Prototype · 2020–2026',
      '.pf-meta div:nth-child(3) dd': 'Main board, console, cards, and punchboard tokens',
      '.pf-meta div:nth-child(4) dd': 'Illustrator, Photoshop, InDesign',

      // Links
      '.pf-links a[href="#contexto"]': 'Context',
      '.pf-links a[href="#herois"]': 'Heroes & Villains',
      '.pf-links a[href="#tabuleiro"]': 'Board & Flow',
      '.pf-links a[href="#matriz"]': 'Regional Matrix',
      '.pf-links a[href="#fichas"]': 'Events & Tokens',

      // Context
      '#contexto .eyebrow': 'The problem',
      '#contexto h2': 'Eight regions, eight superheroes, and an entire nation to monitor across the table.',
      '#contexto .lede': 'Players assemble a cooperative task force of Brazilian heroes. Every turn, continental zones flare up with alerts, missions trigger, crises escalate, and formidable boss villains advance. Heroes draw inspiration from indigenous, Afro-Brazilian, and regional folklore: Curupi, Ipupiara, Jequitibá, Muzenza, Amanari.',
      '#contexto .callout': '<b>Brief:</b> Transform raw game mechanics and character artwork into a cohesive, table-ready production prototype with production files ready for print.',

      // Console & Language
      '#console .eyebrow': '<b>01</b> · Visual Architecture',
      '#console h2': 'Every component feels like military hardware from the same ops center.',
      '#console .lede': 'The game board acts as an active satellite radar, while regional decks serve as telemetry feeds. Brushed steel frames, blue data grids, hexagonal sockets, and neon status lights evoke an analog control console.',
      '#console figcaption:first-of-type': '<b>Deck backs.</b> Final print files. Tap any card to flip and inspect the face art.',

      // Heroes & Villains
      '#herois .eyebrow': '<b>02</b> · Heroes and Villains',
      '#herois h2': 'Eight heroes on a unified chassis, each with custom bespoke branding.',
      '#herois .lede': 'Card faces function as active tactical sheets: attributes housed in left-hand hexes, resource dials on the right, and five power slots presented inside terminal viewports. Reverse sides reveal full-body portraits and custom typography matching each power’s texture.',
      '#herois figcaption:first-of-type': '<b>Hero cards, front and back.</b> Character art by George Wolf; emblems, UI frames, iconography, and typesetting by Erik Placido.',

      // Board & Turn Flow
      '#tabuleiro .eyebrow': '<b>03</b> · Main Board & Operations Console',
      '#tabuleiro h2': 'The map of Brazil reimagined as a satellite radar.',
      '#tabuleiro .lede': 'The 65 × 65 cm board divides national territory into five terrestrial biomes and three Atlantic zones, each featuring numbered socket receivers for active regional threat cards.',
      '#fluxo-turno .pf-head .eyebrow': '<b>Decision Architecture</b> · How a Round Runs',
      '#fluxo-turno .pf-head h2': 'Cognitive turn flow: from radar alert to table resolution.',
      '#fluxo-turno .pf-head .lede': 'A dense cooperative game must eliminate analysis paralysis. The physical layout guides players through four distinct sequential stations each turn.',

      // Matrix
      '#matriz .eyebrow': '<b>04</b> · Regional Ability Matrix',
      '#matriz h2': 'Biomes, attributes, and heroes: an equation without blind luck.',
      '#matriz .lede': 'Combat resolution is not arbitrary dice-rolling. Actions emerge from the intersection of three axes: the active <b>Territorial Biome</b>, the required <b>Attribute</b>, and the hero’s <b>Regional Affinity</b>.',

      // Events & Tokens
      '#fichas .eyebrow': '<b>05</b> · Events and Punchboard Tokens',
      '#fichas h2': 'Color and silhouette communicate tactical impact before text is read.',
      '#fichas .lede': 'The 28 event cards share a common back with three border categories: neutral grey for environmental shifts, green for supportive turns, and red for hostile escalations. Tokens follow ergonomic shapes: upright triangles add, downward triangles subtract, hearts track vitality, and currency signs represent resources.',
      '#fichas figcaption:first-of-type': '<b>Interactive event decks.</b> Draw from any pile to review production files.',

      // Credits
      '#fichas .callout': '<b>Credits.</b> Projeto Força BR is a Pindorama Editora board game; concept and game design by Chris Pereira. Character artwork by George Wolf. Component graphic design, hero emblems, and game map: Erik Placido.'
    },

    es: {
      '.pf-hero .eyebrow': '<b>Caso 05</b> · Board Game · Diseño Gráfico',
      '.pf-hero h1': 'Una central de monitoreo táctico, <em>desplegada en papel.</em>',
      '.pf-hero .lede': 'Projeto Força BR es un juego de mesa cooperativo donde superhéroes inspirados en el folclore brasileño defienden las regiones del país frente a villanos y catástrofes ecológicas. Diseñé el sistema gráfico completo: cartas, tablero radar, paneles de control y fichas de cartón troquelado.',

      // Meta
      '.pf-meta div:nth-child(1) dd': 'Diseño gráfico, logotipos de héroes y mapa radar',
      '.pf-meta div:nth-child(2) dd': 'Pindorama Editora · Prototipo · 2020–2026',
      '.pf-meta div:nth-child(3) dd': 'Tablero, panel de control, cartas y fichas',
      '.pf-meta div:nth-child(4) dd': 'Illustrator, Photoshop, InDesign',

      // Links
      '.pf-links a[href="#contexto"]': 'Contexto',
      '.pf-links a[href="#herois"]': 'Héroes y Villanos',
      '.pf-links a[href="#tabuleiro"]': 'Tablero y Flujo',
      '.pf-links a[href="#matriz"]': 'Matriz Regional',
      '.pf-links a[href="#fichas"]': 'Eventos y Fichas',

      // Context
      '#contexto .eyebrow': 'El problema',
      '#contexto h2': 'Ocho regiones, ocho héroes y un país entero por vigilar en la mesa.',
      '#contexto .lede': 'Los jugadores integran una fuerza operativa de superhéroes. En cada turno surgen alertas en el mapa, misiones imprevistas y jefes criminales que avanzan sobre los biomas.',
      '#contexto .callout': '<b>Brief:</b> Transformar mecánicas e ilustraciones en un juego de mesa completo y listo para imprenta.',

      // Console
      '#console .eyebrow': '<b>01</b> · Arquitectura Visual',
      '#console h2': 'Cada componente parece equipamiento de una misma central de mando.',
      '#console .lede': 'El tablero emula una pantalla de satélite en tiempo real. Molduras de acero cepillado, cuadrículas azules y conectores hexagonales unifican la mesa.',
      '#console figcaption:first-of-type': '<b>Reversos de mazos.</b> Archivos de imprenta. Toque para voltear.',

      // Heroes
      '#herois .eyebrow': '<b>02</b> · Héroes y Villanos',
      '#herois h2': 'Ocho héroes en una misma estructura, cada uno con su propio emblema.',
      '#herois .lede': 'El anverso de las cartas sirve de panel de control: hexágonos de atributos, medidores de vitalidad y poderes tácticos. El reverso expone la ilustración completa y el logotipo del héroe.',

      // Board & Turn Flow
      '#tabuleiro .eyebrow': '<b>03</b> · Tablero y Flujo de Juego',
      '#tabuleiro h2': 'El mapa nacional convertido en pantalla de radar táctico.',
      '#tabuleiro .lede': 'Tablero de 65 × 65 cm con divisiones regionales y casillas para las cartas de alerta.',
      '#fluxo-turno .pf-head .eyebrow': '<b>Ingeniería de Decisión</b> · Cómo Funciona la Partida',
      '#fluxo-turno .pf-head h2': 'Flujo cognitivo del turno: de la alerta del radar a la resolución en mesa.',
      '#fluxo-turno .pf-head .lede': 'Un juego cooperativo denso debe eliminar la parálisis por análisis mediante cuatro pasos circulares secuenciales.',

      // Matrix
      '#matriz .eyebrow': '<b>04</b> · Matriz de Habilidades Modulares',
      '#matriz h2': 'Biomas, atributos y héroes: una ecuación sin azar ciego.',
      '#matriz .lede': 'Las acciones surgen del cruce entre el <b>Bioma</b> del combate, el <b>Atributo</b> requerido y la <b>Especialización</b> del héroe.',

      // Events & Tokens
      '#fichas .eyebrow': '<b>05</b> · Eventos y Fichas',
      '#fichas h2': 'Color y silueta comunican el efecto antes de leer el texto.',
      '#fichas .lede': 'Las 28 cartas de evento se clasifican por marcos de color: gris (clima/entorno), verde (favorable) y rojo (crisis hostil). Las fichas troqueladas usan siluetas nemotécnicas.',

      // Credits
      '#fichas .callout': '<b>Créditos.</b> Projeto Força BR es una publicación de Pindorama Editora; diseño de juego y concepto de Chris Pereira. Ilustraciones de personajes por George Wolf. Diseño gráfico de componentes, logotipos y mapa: Erik Placido.'
    },

    fr: {
      '.pf-hero .eyebrow': '<b>Projet 05</b> · Jeu de Plateau · Design Graphique',
      '.pf-hero h1': 'Un centre de commandement stratégique, <em>déployé sur papier.</em>',
      '.pf-hero .lede': 'Projeto Força BR est un jeu de société coopératif où des héros inspirés des mythologies brésiliennes protègent les écosystèmes du pays face aux crises et super-vilains. J’ai conçu l’ensemble du design graphique : cartes, plateau radar, consoles individuelles et pions.',

      // Meta
      '.pf-meta div:nth-child(1) dd': 'Design graphique, logos des héros et carte radar',
      '.pf-meta div:nth-child(2) dd': 'Pindorama Editora · Prototype · 2020–2026',
      '.pf-meta div:nth-child(3) dd': 'Plateau principal, tableau de bord, cartes et jetons',
      '.pf-meta div:nth-child(4) dd': 'Illustrator, Photoshop, InDesign',

      // Links
      '.pf-links a[href="#contexto"]': 'Contexte',
      '.pf-links a[href="#herois"]': 'Héros & Vilains',
      '.pf-links a[href="#tabuleiro"]': 'Plateau & Déroulement',
      '.pf-links a[href="#matriz"]': 'Matrice Régionale',
      '.pf-links a[href="#fichas"]': 'Événements & Jetons',

      // Context
      '#contexto .eyebrow': 'Le problème',
      '#contexto h2': 'Huit régions, huit super-héros et un pays entier sous surveillance.',
      '#contexto .lede': 'Les joueurs incarnent une cellule d’intervention spéciale. À chaque manche, les zones du territoire passent en alerte, des missions éclatent et des chefs ennemis progressent.',
      '#contexto .callout': '<b>Brief :</b> Métamorphoser les règles et les illustrations en un prototype matériel complet prêt pour le façonnage d’imprimerie.',

      // Console
      '#console .eyebrow': '<b>01</b> · Architecture Graphique',
      '#console h2': 'Chaque élément évoque l’instrumentation d’une même salle de crise.',
      '#console .lede': 'Le plateau fait office d’écran radar satellite. Cadres d’acier brossé, trames quadrillées bleues et encoches hexagonales créent une atmosphère tactique cohérente.',
      '#console figcaption:first-of-type': '<b>Dos de cartes.</b> Fichiers de production. Touchez pour retourner.',

      // Heroes
      '#herois .eyebrow': '<b>02</b> · Héros et Adversaires',
      '#herois h2': 'Huit héros sur une même matrice, dotés chacun d’un logo sur mesure.',
      '#herois .lede': 'Le recto des cartes sert de fiche tactique opérationnelle : caractéristiques en alvéoles, jauges de ressources et pouvoirs. Le verso dévoile l’illustration et l’emblème du personnage.',

      // Board & Turn Flow
      '#tabuleiro .eyebrow': '<b>03</b> · Plateau Radar & Déroulement du Tour',
      '#tabuleiro h2': 'La carte du pays réinventée en console de surveillance radar.',
      '#tabuleiro .lede': 'Plateau de 65 × 65 cm articulé en cinq biomes terrestres et trois zones atlantiques.',
      '#fluxo-turno .pf-head .eyebrow': '<b>Ingénierie de Décision</b> · Mécanique du Tour',
      '#fluxo-turno .pf-head h2': 'Parcours cognitif du joueur : de la lecture de l’alerte à la résolution sur table.',
      '#fluxo-turno .pf-head .lede': 'Un jeu coopératif dense doit éliminer la paralysie de décision grâce à un parcours séquentiel en quatre stations.',

      // Matrix
      '#matriz .eyebrow': '<b>04</b> · Matrice d’Aptitudes Régionales',
      '#matriz h2': 'Biomes, caractéristiques et héros : une mécanique sans hasard aveugle.',
      '#matriz .lede': 'La résolution repose sur la rencontre du <b>Biome</b>, de la <b>Caractéristique</b> demandée et de l’<b>Affinité</b> du héros.',

      // Events & Tokens
      '#fichas .eyebrow': '<b>05</b> · Événements et Jetons Troqués',
      '#fichas h2': 'Couleur et géométrie énoncent la fonction avant même la lecture du texte.',
      '#fichas .lede': 'Les 28 cartes d’événements adoptent trois bordures chromatiques : gris (environnement), vert (bénéfique) et rouge (crise hostile).',

      // Credits
      '#fichas .callout': '<b>Crédits.</b> Projeto Força BR est une publication Pindorama Editora ; conception et game design par Chris Pereira. Illustrations des personnages par George Wolf. Design graphique des éléments, logos des héros et carte : Erik Placido.'
    }
  };

  if (window.PORTFOLIO_I18N && window.PORTFOLIO_I18N.registerCase) {
    window.PORTFOLIO_I18N.registerCase(CASE_SLUG, translations);
  } else {
    window.PORTFOLIO_CASES_I18N = window.PORTFOLIO_CASES_I18N || {};
    window.PORTFOLIO_CASES_I18N[CASE_SLUG] = translations;
  }
})();

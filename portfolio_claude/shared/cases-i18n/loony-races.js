/* ==========================================================================
   Translations for Case 03: Loony Races (loony-races)
   Supported: en (English), es (Español), fr (Français)
   ========================================================================== */
(function(){
  'use strict';

  var CASE_SLUG = 'loony-races';

  var translations = {
    en: {
      '.pf-hero .eyebrow': '<b>Case 03</b> · Board Game · Visual Identity · Illustration',
      '.pf-hero h1': 'An uncharted racetrack, <em>featuring drivers from across the globe.</em>',
      '.pf-hero .lede': 'Visual identity, illustration, and publication layout for Loony Races, a published board game by Coliseu Hobbies with game design by Leandro Maciel. From logo to production box: ten drivers, cards, modular track segments, punchboard tokens, and the bilingual rulebook.',

      // Meta
      '.pf-meta div:nth-child(1) dd': 'Visual identity, illustration, and graphic layout',
      '.pf-meta div:nth-child(2) dd': 'Coliseu Hobbies · 2018',
      '.pf-meta div:nth-child(3) dd': 'Brand identity, characters, cards, track, box, and rulebook',
      '.pf-meta div:nth-child(4) dd': 'Illustrator, Photoshop, InDesign, XD, Muse',

      // Links
      '.pf-links a[href="#contexto"]': 'Context',
      '.pf-links a[href="#marca"]': 'Brand',
      '.pf-links a[href="#pilotos"]': 'Drivers',
      '.pf-links a[href="#cartas"]': 'Cards',
      '.pf-links a[href="#pista"]': 'Track',
      '.pf-links a[href="#ergonomia"]': 'Tabletop Playtest',
      '.pf-links a[href="#acessibilidade"]': 'Accessibility',
      '.pf-links a[href="#manual"]': 'Rulebook',

      // Context
      '#contexto .eyebrow': 'The problem',
      '#contexto h2': 'A Grand Prix where the track does not exist before the green flag.',
      '#contexto .lede': 'In Loony Races, the eccentric Prince of Zanystan wagers his fortune on an uncharted race: the circuit is assembled modularly as cars accelerate, permitting wicked shortcuts, tire-popping caltrops, and glue missiles. Engineered for global export, the artwork had to communicate seamlessly across languages without translated card text.',
      '#contexto .callout': '<b>Brief:</b> Develop the complete visual identity: brand crest, character art, track tiles, card typography, rulebook, and packaging.',

      // Brand
      '#marca .eyebrow': '<b>01</b> · Visual Identity',
      '#marca h2': 'A podium seal that marks every component, from box lid to card backs.',
      '#marca .lede': 'Golden cup atop an azure shield, dual checkered flags, and cartoon lettering. The same hallmark anchors the box, poster, and three distinct card deck backs where background hues denote deck roles.',
      '#marca figcaption': '<b>Brand and card backs.</b> Final print files (63 × 88 mm bridge size). Tap cards to flip.',

      // Drivers
      '#pilotos .eyebrow': '<b>02</b> · Characters & Vehicles',
      '#pilotos h2': 'An original caricature driver for each participating nation.',
      '#pilotos .lede': 'Engineered for international appeal, each of the ten drivers draws upon cultural iconography, matched with bespoke vehicle silhouettes: Lewis Puddington’s double-decker bus, Solana Guacamolez’s Day of the Dead hot rod. Names playfully riff on real champions and culinary tropes.',
      '#pilotos figcaption:first-of-type': '<b>The full starting grid.</b> Final group illustration featured on package flanks.',
      '#pilotos figcaption:last-of-type': '<b>Driver cards.</b> Print-ready assets ranked by horsepower.',

      // Cards
      '#cartas .eyebrow': '<b>03</b> · Iconographic Cards',
      '#cartas h2': 'Textless cards: the identical deck playable in any language.',
      '#cartas .lede': 'Gameplay relies on two core action decks: green cards propel vehicles, while yellow cards inflict hazards on rivals or provide shields. Every mechanical effect is communicated purely through universal iconography and expressive cartoon artwork, isolating all written prose inside the bilingual manual.',
      '#cartas figcaption': '<b>The two action decks.</b> Production fronts and backs. Effects summarize rules; Out-of-Series cards belong to advanced play.',

      // Track
      '#pista .eyebrow': '<b>04</b> · Dynamic Track Assembly',
      '#pista h2': 'The racetrack unfolds tile by tile during the heat of competition.',
      '#pista .lede': 'The game board is composed of 57 mm interlocking square punchboard segments drawn as cars advance: paths may yield clean tarmac, tight chicanes, oil slicks, or deep potholes. Standard reverse sides feature grass, while face graphics cover three distinct biomes: tarmac, mud, and ice.',
      '#pista figcaption': '<b>Interactive track simulation.</b> Assemble the circuit by playing movement cards. Actual print assets.',

      // Ergonomics
      '#ergonomia .eyebrow': '<b>05</b> · Tabletop Ergonomics & Physical Scale',
      '#ergonomia h2': 'Beyond 3D renders: physically tested for reach and table friction with 10 players.',
      '#ergonomia .lede': 'A game supporting up to 10 simultaneous players cannot be validated solely on desktop monitors. Dimensions — from 2mm punchboard thickness to card sizes — were verified with physical prototypes to ensure legibility across 1.5-meter distances.',
      '#ergonomia figcaption': '<b>Usability & physical playtest.</b> Documentary photography of live testing: verifying arm reach, tile stability, and glare under ambient lighting.',

      // Accessibility
      '#acessibilidade .eyebrow': '<b>06</b> · Universal Accessibility & Colorblind Design',
      '#acessibilidade h2': 'Dual encoding: no game state depends solely on color.',
      '#acessibilidade .lede': 'With 10 cars contesting tight curves and 3 track terrains with varying friction, relying solely on hues would exclude colorblind players. Every component reinforces meaning with unique geometric contours, tactile textures, and high-contrast numerals.',
      '#acessibilidade figcaption': '<b>Real-time accessibility simulator.</b> Toggle filters above to verify how track biomes and components remain instantly recognizable even under complete monochromacy.',

      // Manual & Packaging
      '#manual .eyebrow': '<b>07</b> · Rulebook & Packaging',
      '#manual h2': 'A rulebook that explains through tabletop diagrams, fully bilingual.',
      '#manual .lede': 'Mechanics are illustrated using photographic layouts of the physical components: tiles, cards, and tokens arrayed in simulated turns with numbered steps. The 16-page book was laid out in parallel Portuguese and English editions across an identical grid.',
      '#manual figcaption:first-of-type': '<b>Bilingual rulebook.</b> Pages exported from production files.',

      // Visual System
      '#sistema .eyebrow': 'Visual Design System',
      '#sistema h2': 'Three card-back primaries, a grass verge, and textured asphalt.',
      '#sistema .lede': 'The palette mirrors physical components: red for drivers, yellow for attacks, green for movement; grass and asphalt on track tiles; and open sky blue behind all assets.',
      '#sistema .callout': '<b>Credits:</b> Loony Races is published by Coliseu Hobbies with game design by Leandro Maciel. Visual identity, character illustration, and component layout by Erik Placido.',

      // Result
      '#resultado .eyebrow': 'Production Deliverables',
      '#resultado h2': 'A complete board game engineered for mass manufacture.',
      '#resultado .lede': 'Coliseu Hobbies took the game to crowdfunding and international conventions. Here is the tangible production output: press-ready print files across every component.'
    },

    es: {
      '.pf-hero .eyebrow': '<b>Caso 03</b> · Board Game · Identidad Visual · Ilustración',
      '.pf-hero h1': 'Una carrera sin trazado fijo, <em>con pilotos de todo el mundo.</em>',
      '.pf-hero .lede': 'Identidad visual, ilustración y maquetación de Loony Races, juego de mesa de la editorial Coliseu Hobbies con diseño de juego de Leandro Maciel. Del logotipo a la caja: diez pilotos, cartas, losetas modulares, fichas de cartón troquelado y manual bilingüe.',

      // Meta
      '.pf-meta div:nth-child(1) dd': 'Identidad visual, ilustración y diseño gráfico',
      '.pf-meta div:nth-child(2) dd': 'Coliseu Hobbies · 2018',
      '.pf-meta div:nth-child(3) dd': 'Marca, personajes, cartas, pista modular, caja y manual',
      '.pf-meta div:nth-child(4) dd': 'Illustrator, Photoshop, InDesign, XD, Muse',

      // Links
      '.pf-links a[href="#contexto"]': 'Contexto',
      '.pf-links a[href="#marca"]': 'Marca',
      '.pf-links a[href="#pilotos"]': 'Pilotos',
      '.pf-links a[href="#cartas"]': 'Cartas',
      '.pf-links a[href="#pista"]': 'Pista',
      '.pf-links a[href="#ergonomia"]': 'Mesa Real',
      '.pf-links a[href="#acessibilidade"]': 'Accesibilidad',
      '.pf-links a[href="#manual"]': 'Manual',

      // Context
      '#contexto .eyebrow': 'El problema',
      '#contexto h2': 'Un Gran Premio donde el circuito no existe antes de la salida.',
      '#contexto .lede': 'El príncipe de Zuretania ofrece su fortuna al vencedor de una carrera sin mapa: la pista se va colocando mientras los vehículos avanzan, permitiendo atajos, tachuelas y misiles. Diseñado para distribución internacional, el juego prescinde de texto en las cartas para funcionar en cualquier idioma.',
      '#contexto .callout': '<b>Brief:</b> Desarrollar la identidad gráfica integral: marca, personajes, losetas de pista, cartas iconográficas, caja y manual de reglas.',

      // Brand
      '#marca .eyebrow': '<b>01</b> · Identidad Visual',
      '#marca h2': 'Un sello de podio que firma cada componente, de la caja al reverso de las cartas.',
      '#marca .lede': 'Trofeo dorado sobre escudo azul, banderas a cuadros y tipografía inflada. El emblema unifica packaging, póster y el reverso de los tres mazos de juego.',
      '#marca figcaption': '<b>Marca y reversos de cartas.</b> Archivos finales de imprenta (63 × 88 mm). Toque una carta para voltearla.',

      // Drivers
      '#pilotos .eyebrow': '<b>02</b> · Pilotos y Vehículos',
      '#pilotos h2': 'Un piloto carismático para cada país participante.',
      '#pilotos .lede': 'Pensado para el mercado global, cada uno de los diez pilotos incorpora rasgos culturales de su origen: el autobús inglés de dos pisos, el bólido con calavera mexicana. Los nombres bromean con figuras históricas del automovilismo.',
      '#pilotos figcaption:first-of-type': '<b>Parrilla de salida completa.</b> Ilustración grupal utilizada en los laterales de la caja.',
      '#pilotos figcaption:last-of-type': '<b>Cartas de piloto.</b> Archivos de producción ordenados por potencia.',

      // Cards
      '#cartas .eyebrow': '<b>03</b> · Cartas Iconográficas',
      '#cartas h2': 'Cartas sin texto: la misma baraja en cualquier idioma.',
      '#cartas .lede': 'La dinámica gira en torno a dos mazos: las cartas verdes mueven el vehículo; las amarillas entorpecen rivales o brindan protección. Sin texto explicativo en las cartas: cada efecto se comunica mediante iconos universales e ilustración.',
      '#cartas figcaption': '<b>Los dos mazos de acción.</b> Frentes y reversos reales de producción.',

      // Track
      '#pista .eyebrow': '<b>04</b> · Pista Modular',
      '#pista h2': 'El circuito se descubre tramo a tramo durante la carrera.',
      '#pista .lede': 'El tablero lo forman losetas de 57 mm en cartón rígido que se roban conforme los coches avanzan. La pista puede salir limpia o con manchas de aceite, baches y obras, ilustrada en tres terrenos: asfalto, barro y hielo.',
      '#pista figcaption': '<b>Simulador interactivo de pista.</b> Monte el circuito jugando cartas de avance.',

      // Ergonomics
      '#ergonomia .eyebrow': '<b>05</b> · Ergonomía y Escala en Mesa Real',
      '#ergonomia h2': 'Más allá del render 3D: probado en escala humana con hasta 10 jugadores.',
      '#ergonomia .lede': 'Un juego para 10 participantes exige rigor ergonómico. Cada cota —desde el cartón troquelado de 2 mm hasta el tamaño Bridge de las cartas— fue validada con prototipos físicos para asegurar visibilidad a más de 1,5 metros.',
      '#ergonomia figcaption': '<b>Prueba de usabilidad en mesa real.</b> Fotografía documental: validación de alcance de brazos, estabilidad de losetas y legibilidad sin reflejos.',

      // Accessibility
      '#acessibilidade .eyebrow': '<b>06</b> · Accesibilidad y Daltonismo',
      '#acessibilidade h2': 'Codificación múltiple: ninguna regla depende únicamente del color.',
      '#acessibilidade .lede': 'Con 10 coches disputando la misma curva y 3 terrenos de diferente fricción, confiar solo en el tono cromático excluiría a jugadores con discromatopsia. Cada elemento combina silueta geométrica, textura rayada y números de alto contraste.',
      '#acessibilidade figcaption': '<b>Simulador de accesibilidad en vivo.</b> Cambie los filtros para verificar la distinción de terrenos incluso en blanco y negro absoluto.',

      // Manual
      '#manual .eyebrow': '<b>07</b> · Caja y Manual',
      '#manual h2': 'Un manual que explica con la mesa montada, en dos idiomas.',
      '#manual .lede': 'Las reglas se ilustran con fotografías de los componentes reales dispuestos como en partida. El libro de 16 páginas se maquetó en español/portugués e inglés sobre la misma retícula.',
      '#manual figcaption:first-of-type': '<b>Manual de reglas.</b> Páginas exportadas de los archivos de imprenta.',

      // System
      '#sistema .eyebrow': 'Sistema Visual',
      '#sistema h2': 'Tres colores de mazo, pista de asfalto y hierba verde.',
      '#sistema .lede': 'La paleta surge de los componentes físicos: rojo para pilotos, amarillo para acciones y verde para movimiento.',
      '#sistema .callout': '<b>Créditos:</b> Loony Races es un juego de Coliseu Hobbies con diseño de reglas de Leandro Maciel. Marca, ilustración y maquetación gráfica: Erik Placido.',

      // Result
      '#resultado .eyebrow': 'Entregables de Producción',
      '#resultado h2': 'Un juego completo listo para su fabricación industrial.',
      '#resultado .lede': 'Archivos de producción certificados para imprenta de cada uno de los componentes físicos del juego.'
    },

    fr: {
      '.pf-hero .eyebrow': '<b>Projet 03</b> · Jeu de Société · Identité Visuelle · Illustration',
      '.pf-hero h1': 'Une course sans tracé prédéfini, <em>des pilotes venus des quatre coins du monde.</em>',
      '.pf-hero .lede': 'Identité visuelle, illustrations et mise en page de Loony Races, jeu de plateau publié par Coliseu Hobbies sur un game design de Leandro Maciel. Du logo à la boîte : dix pilotes, cartes d’action, tuiles de circuit modulaires, jetons en carton compact et livret de règles bilingue.',

      // Meta
      '.pf-meta div:nth-child(1) dd': 'Identité visuelle, illustration et mise en page éditoriale',
      '.pf-meta div:nth-child(2) dd': 'Coliseu Hobbies · 2018',
      '.pf-meta div:nth-child(3) dd': 'Marque, personnages, cartes, tuiles de piste, boîte et livret',
      '.pf-meta div:nth-child(4) dd': 'Illustrator, Photoshop, InDesign, XD, Muse',

      // Links
      '.pf-links a[href="#contexto"]': 'Contexte',
      '.pf-links a[href="#marca"]': 'Marque',
      '.pf-links a[href="#pilotos"]': 'Pilotes',
      '.pf-links a[href="#cartas"]': 'Cartes',
      '.pf-links a[href="#pista"]': 'Circuit',
      '.pf-links a[href="#ergonomia"]': 'Test sur Table',
      '.pf-links a[href="#acessibilidade"]': 'Accessibilité',
      '.pf-links a[href="#manual"]': 'Livret',

      // Context
      '#contexto .eyebrow': 'Le problème',
      '#contexto h2': 'Un Grand Prix où la piste n’existe pas avant le coup d’envoi.',
      '#contexto .lede': 'Dans le jeu, le prince de Zanystan promet sa fortune au vainqueur d’une course au tracé imprévisible : le circuit se déploie au fil des tours, autorisant raccourcis audacieux, punaises et missiles de colle. Destiné à l’export international, le jeu fait le choix de cartes sans texte pour être jouable dans toutes les langues.',
      '#contexto .callout': '<b>Brief :</b> Concevoir l’identité visuelle intégrale : logo, personnages, tuiles de circuit, cartes iconographiques, boîte et livret de règles.',

      // Brand
      '#marca .eyebrow': '<b>01</b> · Identité Visuelle',
      '#marca h2': 'Un emblème de podium qui signe chaque élément, de la boîte au dos des cartes.',
      '#marca .lede': 'Coupe dorée sur blason azur, drapeaux à damier et typographie gonflée cartoon. Ce même sceau habille la boîte, le poster et le dos des trois pioches.',
      '#marca figcaption': '<b>Logo et dos de cartes.</b> Fichiers d’impression réels (format bridge 63 × 88 mm). Touchez une carte pour la retourner.',

      // Drivers
      '#pilotos .eyebrow': '<b>02</b> · Personnages & Véhicules',
      '#pilotos h2': 'Un pilote haut en couleur pour chaque nation représentée.',
      '#pilotos .lede': 'Conçu pour séduire un public international, chacun des dix pilotes transpose des symboles culturels de son pays : le bus impérial londonien, le hot-rod orné d’une calavera mexicaine. Les patronymes revisitent avec humour des figures du sport automobile.',
      '#pilotos figcaption:first-of-type': '<b>La grille de départ au grand complet.</b> Illustration originale ornant les côtés de la boîte.',
      '#pilotos figcaption:last-of-type': '<b>Cartes de pilote.</b> Fichiers d’impression classés par puissance moteur.',

      // Cards
      '#cartas .eyebrow': '<b>03</b> · Cartes Iconographiques',
      '#cartas h2': 'Des cartes sans texte : un même paquet compréhensible dans toutes les langues.',
      '#cartas .lede': 'La mécanique s’articule autour de deux pioches d’action : les cartes vertes font avancer les bolides ; les jaunes ralentissent les adversaires ou protègent le joueur. Chaque effet est traduit par une icône universelle et un dessin expressif.',
      '#cartas figcaption': '<b>Les deux pioches d’action.</b> Cartes réelles de fabrication.',

      // Track
      '#pista .eyebrow': '<b>04</b> · Circuit Modulaire',
      '#pista h2': 'Le circuit se dévoile tronçon après tronçon au cœur de la course.',
      '#pista .lede': 'Le plateau est constitué de tuiles carrées de 57 mm en carton rigide assemblées au fur et à mesure : le tracé peut être fluide ou semé de flaques d’huile, nids-de-poule et travaux. Les tuiles sont déclinées en trois terrains : asphalte, boue et verglas.',
      '#pista figcaption': '<b>Simulateur de course interactif.</b> Construisez la piste en posant des cartes de mouvement.',

      // Ergonomics
      '#ergonomia .eyebrow': '<b>05</b> · Ergonomie sur Table & Échelle Humaine',
      '#ergonomia h2': 'Bien au-delà du rendu 3D : éprouvé sur table avec jusqu’à 10 joueurs.',
      '#ergonomia .lede': 'Un jeu accueillant 10 participants ne peut être conçu sur un simple écran. Les dimensions physiques — du carton de 2 mm au format Bridge des cartes — ont été testées sur prototypes réels pour garantir une visibilité nette à plus de 1,5 mètre.',
      '#ergonomia figcaption': '<b>Test d’ergonomie sur table réelle.</b> Cliché documentaire lors des phases d’essais : contrôle de la portée des bras, de la stabilité des tuiles et de la lisibilité sous éclairage ambiant.',

      // Accessibility
      '#acessibilidade .eyebrow': '<b>06</b> · Accessibilité & Daltonisme',
      '#acessibilidade h2': 'Double encodage : aucune information ne repose uniquement sur la teinte.',
      '#acessibilidade .lede': 'Avec 10 voitures sur la même trajectoire et 3 types de sol, se fier uniquement aux nuances de couleur aurait pénalisé les joueurs daltoniens. Chaque composant combine forme géométrique, texture hachurée et chiffres en fort contraste.',
      '#acessibilidade figcaption': '<b>Simulateur d’accessibilité en temps réel.</b> Basculez les filtres pour vérifier la distinction immédiate des terrains même en noir et blanc.',

      // Manual
      '#manual .eyebrow': '<b>07</b> · Boîte & Livret de Règles',
      '#manual h2': 'Un livret pédagogique illustré avec le matériel en situation, en deux langues.',
      '#manual .lede': 'Les règles sont explicitées par des schémas reconstituant de vraies configurations de jeu : tuiles, cartes et miniatures disposées étape par étape. Le livret de 16 pages a été composé en versions portugaise et anglaise sur une grille identique.',
      '#manual figcaption:first-of-type': '<b>Livret de règles.</b> Pages exportées des fichiers d’impression.',

      // System
      '#sistema .eyebrow': 'Système Visuel',
      '#sistema h2': 'Trois couleurs de pioche, pelouse verte et asphalte texturé.',
      '#sistema .lede': 'La palette découle directement du matériel physique : rouge pour les pilotes, jaune pour les actions, vert pour la trajectoire.',
      '#sistema .callout': '<b>Crédits :</b> Loony Races est édité par Coliseu Hobbies sur des règles de Leandro Maciel. Identité visuelle, illustrations et mise en page : Erik Placido.',

      // Result
      '#resultado .eyebrow': 'Livrables de Fabrication',
      '#resultado h2': 'Un jeu complet prêt pour l’impression industrielle.',
      '#resultado .lede': 'L’ensemble des fichiers d’exécution technique préparés pour le façonnage et l’impression de chaque pièce.'
    }
  };

  if (window.PORTFOLIO_I18N && window.PORTFOLIO_I18N.registerCase) {
    window.PORTFOLIO_I18N.registerCase(CASE_SLUG, translations);
  } else {
    window.PORTFOLIO_CASES_I18N = window.PORTFOLIO_CASES_I18N || {};
    window.PORTFOLIO_CASES_I18N[CASE_SLUG] = translations;
  }
})();

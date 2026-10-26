/* ==========================================================================
   Translations for Case 18: Super Batalha (super-batalha)
   Supported: en (English), es (Español), fr (Français)
   ========================================================================== */
(function(){
  'use strict';

  var CASE_SLUG = 'super-batalha';

  var translations = {
    en: {
      '.pf-hero .eyebrow': '<b>Case 18</b> · Board game · Brand identity · Graphic design',
      '.pf-hero h1': 'Heroes from dozens of comics in one arena, <em>read as a single game.</em>',
      '.pf-hero .lede': 'Super Batalha is a competitive board game of Brazilian superheroes, created by Chris Pereira and published by Pindorama. It brings together the publisher’s heroes and villains and 33 guest characters from Brazilian comics. I did the visual identity and the graphic design of the pieces, from the box to the tokens.',
      '.pf-meta div:nth-child(1) dt': 'Role',
      '.pf-meta div:nth-child(1) dd': 'Visual identity and graphic design',
      '.pf-meta div:nth-child(2) dt': 'Project',
      '.pf-meta div:nth-child(2) dd': 'Pindorama · crowdfunding · 2025–2026',
      '.pf-meta div:nth-child(3) dt': 'Deliverables',
      '.pf-meta div:nth-child(3) dd': 'Logo, box, board, cards, screens, standees, tokens, and promotion',
      '.pf-meta div:nth-child(4) dt': 'Tools',

      '.pf-links a[href="#contexto"]': 'Context',
      '.pf-links a[href="#marca"]': 'Brand',
      '.pf-links a[href="#personagens"]': 'Characters',
      '.pf-links a[href="#biombo"]': 'Screen',
      '.pf-links a[href="#cartas"]': 'Cards',
      '.pf-links a[href="#caixa"]': 'Box',

      '#contexto .eyebrow': 'The problem',
      '#contexto h2': 'Many comic universes, one table.',
      '#contexto .lede': '2 to 4 players build teams and fight on a 76 × 76 cm board. Each player picks their characters’ actions in secret, with cards, and the lowest initiative acts first. The match ends at the end of round 8 or when a whole team is down.',
      '#contexto .pf-head + p': 'The box holds the heroes and villains of the Pindorama universe, a group of cosmic characters, and 33 guests from other Brazilian comics, from Capitão 7 to O Doutrinador. That’s hundreds of pieces of different kinds, and all of them had to be recognizable from across the table.',
      '.sb-spec .pf-card:nth-child(1) span': 'cm double-sided board',
      '.sb-spec .pf-card:nth-child(2) span': 'cards: 178 action, 30 event, and 30 team',
      '.sb-spec .pf-card:nth-child(3) span': 'screens, one per character',
      '.sb-spec .pf-card:nth-child(4) span': 'character and event standees',
      '.sb-spec .pf-card:nth-child(5) span': 'life, power, initiative, and other tokens',
      '.sb-spec .pf-card:nth-child(6) span': 'scenery pieces: zones, barriers, cover, and obstacles',
      '#contexto .callout': '<b>My job:</b> give one face to a game with hundreds of pieces and characters from many comics, readable at a glance on the table, and deliver everything as print-ready files.',

      '#marca .eyebrow': '<b>01</b> · Brand',
      '#marca h2': 'A comic-book title and a burst of stars that become the back of everything.',
      '#marca .lede': 'The logo combines a comic-cover title with stars and rays in green and yellow. The same burst is the back of all three decks; only the color changes, and the color tells which pile each card belongs to.',
      '#marca .pill.y': 'Tap to switch',
      '#marca figcaption': '<b>Logo and the backs of the three decks.</b> Final art. Action cards are portrait (88 × 63 mm); team and event cards are landscape.',
      '.sb-tab[data-deck="times"]': 'Teams',
      '.sb-tab[data-deck="acoes"]': 'Actions',
      '.sb-tab[data-deck="eventos"]': 'Events',

      '#personagens .eyebrow': '<b>02</b> · Characters',
      '#personagens h2': 'The color of the halo tells which side a character is on.',
      '#personagens .lede': 'Each standee is cut with a halo of rays around the figure and the character’s name below. Green is a hero, red is a villain, and blue marks events and allies. This puts characters with very different drawing styles in the same visual family, and any player can tell who is who on the board from a distance.',
      '#personagens .pill.y': 'Tap to filter',
      '#personagens figcaption': '<b>A3 standee sheets, front.</b> Final production art. Illustrations of the Pindorama characters: Alan Patrick, colors by Felipe Felix. Guest characters belong to their creators (list at the end of the page).',

      '#biombo .eyebrow': '<b>03</b> · Screen and tokens',
      '#biombo h2': 'Whatever is secret stays behind the screen.',
      '#biombo .lede': 'Since actions are chosen in secret, each character has a screen. The outside carries the character art with the game logo; the inside holds the tracks and the spaces for action cards and life and power tokens. The tokens swap text for large icons in green circles.',
      '#biombo figcaption': '<b>Screen inside and out, and tokens.</b> The screen and tokens are final art. The photo of assembled screens is an AI-generated mockup made from the artwork for the game’s presentation, not a photo of the prototype.',

      '#cartas .eyebrow': '<b>04</b> · Cards',
      '#cartas h2': 'The action cards come out of a spreadsheet.',
      '#cartas .lede': 'There are 178 action cards. The texts live in a spreadsheet, with character, ability, type, cost, and effect in columns, and InDesign’s data merge generates the cards from a single template. When balancing changes a number, the spreadsheet changes and the cards are generated again.',
      '.sb-arrow': 'Spreadsheet → data merge → card',
      '#cartas figcaption': '<b>From the spreadsheet to the print sheets.</b> Real rows from the game’s spreadsheet (with accents restored) and two sheets of action cards generated from it.',

      '#caixa .eyebrow': '<b>05</b> · Box and promotion',
      '#caixa h2': 'A 40 cm box that is already a poster.',
      '#caixa .lede': 'The lid puts the logo and the robot at the center of a frame of characters that runs along the sides. The tray shows the game set up and the component list. The same art becomes the 120 × 90 cm poster, the flyer, and the game’s presentation.',
      '#caixa .sb-box figure:nth-child(1) figcaption': 'Lid · 40 × 40 × 10 cm',
      '#caixa .sb-box figure:nth-child(2) figcaption': 'Tray',
      '#caixa > .wrap > figure > figcaption': '<b>Box dieline and poster.</b> Final art. The 120 × 90 cm version of the poster was prepared for CCXP.',

      '#resultado .eyebrow': 'Outcome',
      '#resultado h2': 'A whole game ready for the printer and the campaign.',
      '#resultado .lede': 'Super Batalha is in crowdfunding. Every piece is closed in production files with crop marks: cards, screens, standees, tokens, board, and box. There are no campaign numbers to show here yet.',
      '#resultado figcaption': '<b>The game set up.</b> AI-generated mockup made from the artwork for the game’s presentation. Not a photo of the prototype.',
      '#resultado .callout': '<b>Credits.</b> Super Batalha, by Pindorama Entretenimento. Creation and rules: Chris Pereira. Development: Marcelo Maciel. Illustration: Alan Patrick. Colors: Felipe Felix. Proofreading: Lucas Cestari. Marketing: Gabriel Campos. Visual identity and graphic design: Erik Placido.',
      '#resultado .callout + p': '<b>Guest characters and their creators</b>',

      '.pf-footer .pf-fgrid > div:nth-child(1) .eyebrow': 'Next case',
      '.pf-footer h2': 'Let’s talk?',
      '.pf-footer .pf-fgrid > div:nth-child(2) p': 'Identity and graphic systems for games that need to be read from across the table.'
    },
    es: {
      '.pf-hero .eyebrow': '<b>Case 18</b> · Juego de mesa · Identidad visual · Diseño gráfico',
      '.pf-hero h1': 'Héroes de decenas de cómics en la misma arena, <em>leídos como un solo juego.</em>',
      '.pf-hero .lede': 'Super Batalha es un juego de mesa competitivo de superhéroes brasileños, creado por Chris Pereira y publicado por Pindorama. Reúne a los héroes y villanos de la editorial y a 33 personajes invitados de cómics brasileños. Hice la identidad visual y el diseño gráfico de las piezas, de la caja al marcador.',
      '.pf-meta div:nth-child(1) dt': 'Rol',
      '.pf-meta div:nth-child(1) dd': 'Identidad visual y diseño gráfico',
      '.pf-meta div:nth-child(2) dt': 'Proyecto',
      '.pf-meta div:nth-child(2) dd': 'Pindorama · financiación colectiva · 2025–2026',
      '.pf-meta div:nth-child(3) dt': 'Entregas',
      '.pf-meta div:nth-child(3) dd': 'Logo, caja, tablero, cartas, biombos, standees, marcadores y difusión',
      '.pf-meta div:nth-child(4) dt': 'Herramientas',

      '.pf-links a[href="#contexto"]': 'Contexto',
      '.pf-links a[href="#marca"]': 'Marca',
      '.pf-links a[href="#personagens"]': 'Personajes',
      '.pf-links a[href="#biombo"]': 'Biombo',
      '.pf-links a[href="#cartas"]': 'Cartas',
      '.pf-links a[href="#caixa"]': 'Caja',

      '#contexto .eyebrow': 'El problema',
      '#contexto h2': 'Muchos universos de cómic, una sola mesa.',
      '#contexto .lede': 'De 2 a 4 jugadores arman equipos y luchan en un tablero de 76 × 76 cm. Cada jugador elige en secreto, con cartas, las acciones de sus personajes, y quien tiene la iniciativa más baja actúa primero. La partida termina al final de la 8.ª ronda o cuando cae un equipo entero.',
      '#contexto .pf-head + p': 'En la caja están los héroes y villanos del universo Pindorama, un grupo de personajes cósmicos y 33 invitados de otros cómics brasileños, de Capitão 7 a O Doutrinador. Son cientos de piezas de tipos distintos, y todas tenían que reconocerse de lejos en la mesa.',
      '.sb-spec .pf-card:nth-child(1) span': 'cm de tablero de doble cara',
      '.sb-spec .pf-card:nth-child(2) span': 'cartas: 178 de acción, 30 de eventos y 30 de equipos',
      '.sb-spec .pf-card:nth-child(3) span': 'biombos, uno por personaje',
      '.sb-spec .pf-card:nth-child(4) span': 'standees de personajes y eventos',
      '.sb-spec .pf-card:nth-child(5) span': 'marcadores de vida, poder, iniciativa y otros',
      '.sb-spec .pf-card:nth-child(6) span': 'piezas de escenario: zonas, barreras, coberturas y obstáculos',
      '#contexto .callout': '<b>Mi trabajo:</b> darle una sola cara a un juego con cientos de piezas y personajes de muchos cómics, de lectura rápida en la mesa, y entregar todo en archivos listos para imprenta.',

      '#marca .eyebrow': '<b>01</b> · Marca',
      '#marca h2': 'Un rótulo de cómic y una explosión de estrellas que se vuelven el reverso de todo.',
      '#marca .lede': 'El logo une el rótulo de portada de cómic con estrellas y rayos en verde y amarillo. La misma explosión es el reverso de los tres mazos; solo cambia el color, y es el color el que dice de qué mazo es cada carta.',
      '#marca .pill.y': 'Toca para cambiar',
      '#marca figcaption': '<b>Logo y reversos de los tres mazos.</b> Arte final. Las cartas de acción van en vertical (88 × 63 mm); las de equipos y eventos, en horizontal.',
      '.sb-tab[data-deck="times"]': 'Equipos',
      '.sb-tab[data-deck="acoes"]': 'Acciones',
      '.sb-tab[data-deck="eventos"]': 'Eventos',

      '#personagens .eyebrow': '<b>02</b> · Personajes',
      '#personagens h2': 'El color del halo dice de qué lado está el personaje.',
      '#personagens .lede': 'Cada standee se recorta con un halo de rayos alrededor de la figura y el nombre del personaje abajo. Verde es héroe, rojo es villano y azul marca eventos y aliados. Así, personajes de trazos muy distintos quedan en la misma familia visual, y cualquier jugador ve de lejos quién es quién en el tablero.',
      '#personagens .pill.y': 'Toca para filtrar',
      '#personagens figcaption': '<b>Hojas A3 de standees, frente.</b> Arte final de producción. Ilustraciones de los personajes de Pindorama: Alan Patrick, colores de Felipe Felix. Los personajes invitados pertenecen a sus creadores (lista al final de la página).',

      '#biombo .eyebrow': '<b>03</b> · Biombo y marcadores',
      '#biombo h2': 'Lo que es secreto queda detrás del biombo.',
      '#biombo .lede': 'Como las acciones se eligen a escondidas, cada personaje tiene un biombo. Por fuera va el arte del personaje con el logo del juego; por dentro, las pistas y los espacios para las cartas de acción y las fichas de vida y poder. Los marcadores cambian texto por íconos grandes en círculos verdes.',
      '#biombo figcaption': '<b>Biombo por dentro y por fuera, y marcadores.</b> Biombo y marcadores son arte final. La foto de los biombos armados es un mockup generado con IA a partir de las artes para la presentación del juego, no una foto del prototipo.',

      '#cartas .eyebrow': '<b>04</b> · Cartas',
      '#cartas h2': 'Las cartas de acción salen de una planilla.',
      '#cartas .lede': 'Son 178 cartas de acción. Los textos están en una planilla, con personaje, habilidad, tipo, costo y efecto en columnas, y la combinación de datos de InDesign genera las cartas a partir de una sola plantilla. Cuando el balance cambia un número, cambia la planilla y las cartas se generan de nuevo.',
      '.sb-arrow': 'Planilla → combinación de datos → carta',
      '#cartas figcaption': '<b>De la planilla a las hojas de impresión.</b> Filas reales de la planilla del juego (con los acentos restaurados) y dos hojas de cartas de acción generadas a partir de ella.',

      '#caixa .eyebrow': '<b>05</b> · Caja y difusión',
      '#caixa h2': 'Una caja de 40 cm que ya es un póster.',
      '#caixa .lede': 'La tapa pone el logo y el robot en el centro de un marco de personajes que sigue por los laterales. La bandeja muestra el juego armado y la lista de componentes. La misma arte se convierte en el póster de 120 × 90 cm, el flyer y la presentación del juego.',
      '#caixa .sb-box figure:nth-child(1) figcaption': 'Tapa · 40 × 40 × 10 cm',
      '#caixa .sb-box figure:nth-child(2) figcaption': 'Bandeja',
      '#caixa > .wrap > figure > figcaption': '<b>Caja desplegada y póster.</b> Arte final. La versión de 120 × 90 cm del póster se preparó para la CCXP.',

      '#resultado .eyebrow': 'Resultado',
      '#resultado h2': 'Un juego entero listo para la imprenta y la campaña.',
      '#resultado .lede': 'Super Batalha está en financiación colectiva. Todas las piezas están cerradas en archivos de producción con marcas de corte: cartas, biombos, standees, marcadores, tablero y caja. Todavía no hay números de la campaña para mostrar aquí.',
      '#resultado figcaption': '<b>El juego armado.</b> Mockup generado con IA a partir de las artes para la presentación del juego. No es una foto del prototipo.',
      '#resultado .callout': '<b>Créditos.</b> Super Batalha, de Pindorama Entretenimento. Creación y reglas: Chris Pereira. Desarrollo: Marcelo Maciel. Ilustración: Alan Patrick. Colores: Felipe Felix. Revisión: Lucas Cestari. Marketing: Gabriel Campos. Identidad visual y diseño gráfico: Erik Placido.',
      '#resultado .callout + p': '<b>Personajes invitados y sus creadores</b>',

      '.pf-footer .pf-fgrid > div:nth-child(1) .eyebrow': 'Próximo caso',
      '.pf-footer h2': '¿Hablamos?',
      '.pf-footer .pf-fgrid > div:nth-child(2) p': 'Identidad y sistemas gráficos para juegos que se leen de lejos, en la mesa.'
    },
    fr: {
      '.pf-hero .eyebrow': '<b>Case 18</b> · Jeu de société · Identité visuelle · Design graphique',
      '.pf-hero h1': 'Des héros de dizaines de BD dans la même arène, <em>lus comme un seul jeu.</em>',
      '.pf-hero .lede': 'Super Batalha est un jeu de société compétitif de super-héros brésiliens, créé par Chris Pereira et édité par Pindorama. Il réunit les héros et méchants de l’éditeur et 33 personnages invités venus de BD brésiliennes. J’ai réalisé l’identité visuelle et le design graphique des pièces, de la boîte aux pions.',
      '.pf-meta div:nth-child(1) dt': 'Rôle',
      '.pf-meta div:nth-child(1) dd': 'Identité visuelle et design graphique',
      '.pf-meta div:nth-child(2) dt': 'Projet',
      '.pf-meta div:nth-child(2) dd': 'Pindorama · financement participatif · 2025–2026',
      '.pf-meta div:nth-child(3) dt': 'Livrables',
      '.pf-meta div:nth-child(3) dd': 'Logo, boîte, plateau, cartes, écrans, standees, pions et promotion',
      '.pf-meta div:nth-child(4) dt': 'Outils',

      '.pf-links a[href="#contexto"]': 'Contexte',
      '.pf-links a[href="#marca"]': 'Marque',
      '.pf-links a[href="#personagens"]': 'Personnages',
      '.pf-links a[href="#biombo"]': 'Écran',
      '.pf-links a[href="#cartas"]': 'Cartes',
      '.pf-links a[href="#caixa"]': 'Boîte',

      '#contexto .eyebrow': 'Le problème',
      '#contexto h2': 'Beaucoup d’univers de BD, une seule table.',
      '#contexto .lede': 'De 2 à 4 joueurs forment des équipes et combattent sur un plateau de 76 × 76 cm. Chaque joueur choisit en secret, avec des cartes, les actions de ses personnages, et l’initiative la plus basse agit en premier. La partie s’arrête à la fin du 8e tour ou quand une équipe entière tombe.',
      '#contexto .pf-head + p': 'La boîte contient les héros et méchants de l’univers Pindorama, un groupe de personnages cosmiques et 33 invités d’autres BD brésiliennes, de Capitão 7 à O Doutrinador. Ce sont des centaines de pièces de types différents, et toutes devaient se reconnaître de loin sur la table.',
      '.sb-spec .pf-card:nth-child(1) span': 'cm de plateau recto verso',
      '.sb-spec .pf-card:nth-child(2) span': 'cartes : 178 d’action, 30 d’événements et 30 d’équipes',
      '.sb-spec .pf-card:nth-child(3) span': 'écrans, un par personnage',
      '.sb-spec .pf-card:nth-child(4) span': 'standees de personnages et d’événements',
      '.sb-spec .pf-card:nth-child(5) span': 'pions de vie, de pouvoir, d’initiative et autres',
      '.sb-spec .pf-card:nth-child(6) span': 'éléments de décor : zones, barrières, couverts et obstacles',
      '#contexto .callout': '<b>Mon travail :</b> donner un seul visage à un jeu aux centaines de pièces et de personnages venus de nombreuses BD, lisible d’un coup d’œil sur la table, et livrer le tout en fichiers prêts pour l’imprimeur.',

      '#marca .eyebrow': '<b>01</b> · Marque',
      '#marca h2': 'Un titre de BD et une explosion d’étoiles qui deviennent le dos de tout.',
      '#marca .lede': 'Le logo associe le titre de couverture de BD à des étoiles et des rayons vert et jaune. La même explosion est le dos des trois paquets ; seule la couleur change, et c’est elle qui indique à quel paquet appartient chaque carte.',
      '#marca .pill.y': 'Touchez pour changer',
      '#marca figcaption': '<b>Logo et dos des trois paquets.</b> Art final. Les cartes d’action sont en portrait (88 × 63 mm) ; les cartes d’équipes et d’événements, en paysage.',
      '.sb-tab[data-deck="times"]': 'Équipes',
      '.sb-tab[data-deck="acoes"]': 'Actions',
      '.sb-tab[data-deck="eventos"]': 'Événements',

      '#personagens .eyebrow': '<b>02</b> · Personnages',
      '#personagens h2': 'La couleur du halo indique de quel côté est le personnage.',
      '#personagens .lede': 'Chaque standee est découpé avec un halo de rayons autour de la figure et le nom du personnage en dessous. Vert pour les héros, rouge pour les méchants, bleu pour les événements et les alliés. Des personnages aux styles de dessin très différents entrent ainsi dans la même famille visuelle, et chaque joueur voit de loin qui est qui sur le plateau.',
      '#personagens .pill.y': 'Touchez pour filtrer',
      '#personagens figcaption': '<b>Planches A3 de standees, recto.</b> Art final de production. Illustrations des personnages Pindorama : Alan Patrick, couleurs de Felipe Felix. Les personnages invités appartiennent à leurs créateurs (liste en fin de page).',

      '#biombo .eyebrow': '<b>03</b> · Écran et pions',
      '#biombo h2': 'Ce qui est secret reste derrière l’écran.',
      '#biombo .lede': 'Comme les actions se choisissent en cachette, chaque personnage a son écran. À l’extérieur, l’illustration du personnage avec le logo du jeu ; à l’intérieur, les pistes et les emplacements pour les cartes d’action et les jetons de vie et de pouvoir. Les pions remplacent le texte par de grandes icônes dans des cercles verts.',
      '#biombo figcaption': '<b>Écran recto et verso, et pions.</b> L’écran et les pions sont l’art final. La photo des écrans montés est un mockup généré par IA à partir des illustrations pour la présentation du jeu, pas une photo du prototype.',

      '#cartas .eyebrow': '<b>04</b> · Cartes',
      '#cartas h2': 'Les cartes d’action sortent d’un tableur.',
      '#cartas .lede': 'Il y a 178 cartes d’action. Les textes sont dans un tableur, avec personnage, capacité, type, coût et effet en colonnes, et la fusion de données d’InDesign génère les cartes à partir d’un seul gabarit. Quand l’équilibrage change un chiffre, le tableur change et les cartes sont générées à nouveau.',
      '.sb-arrow': 'Tableur → fusion de données → carte',
      '#cartas figcaption': '<b>Du tableur aux planches d’impression.</b> Lignes réelles du tableur du jeu (accents rétablis) et deux planches de cartes d’action générées à partir de lui.',

      '#caixa .eyebrow': '<b>05</b> · Boîte et promotion',
      '#caixa h2': 'Une boîte de 40 cm qui est déjà une affiche.',
      '#caixa .lede': 'Le couvercle place le logo et le robot au centre d’un cadre de personnages qui se prolonge sur les côtés. Le fond de boîte montre le jeu installé et la liste du matériel. La même illustration devient l’affiche de 120 × 90 cm, le flyer et la présentation du jeu.',
      '#caixa .sb-box figure:nth-child(1) figcaption': 'Couvercle · 40 × 40 × 10 cm',
      '#caixa .sb-box figure:nth-child(2) figcaption': 'Fond de boîte',
      '#caixa > .wrap > figure > figcaption': '<b>Boîte à plat et affiche.</b> Art final. La version 120 × 90 cm de l’affiche a été préparée pour la CCXP.',

      '#resultado .eyebrow': 'Résultat',
      '#resultado h2': 'Un jeu complet prêt pour l’imprimeur et la campagne.',
      '#resultado .lede': 'Super Batalha est en financement participatif. Toutes les pièces sont bouclées en fichiers de production avec traits de coupe : cartes, écrans, standees, pions, plateau et boîte. Il n’y a pas encore de chiffres de campagne à montrer ici.',
      '#resultado figcaption': '<b>Le jeu installé.</b> Mockup généré par IA à partir des illustrations pour la présentation du jeu. Ce n’est pas une photo du prototype.',
      '#resultado .callout': '<b>Crédits.</b> Super Batalha, de Pindorama Entretenimento. Création et règles : Chris Pereira. Développement : Marcelo Maciel. Illustration : Alan Patrick. Couleurs : Felipe Felix. Relecture : Lucas Cestari. Marketing : Gabriel Campos. Identité visuelle et design graphique : Erik Placido.',
      '#resultado .callout + p': '<b>Personnages invités et leurs créateurs</b>',

      '.pf-footer .pf-fgrid > div:nth-child(1) .eyebrow': 'Projet suivant',
      '.pf-footer h2': 'On en parle ?',
      '.pf-footer .pf-fgrid > div:nth-child(2) p': 'Identité et systèmes graphiques pour des jeux qui se lisent de loin, sur la table.'
    }
  };

  if (window.PORTFOLIO_I18N && window.PORTFOLIO_I18N.registerCase) {
    window.PORTFOLIO_I18N.registerCase(CASE_SLUG, translations);
  } else {
    window.PORTFOLIO_CASES_I18N = window.PORTFOLIO_CASES_I18N || {};
    window.PORTFOLIO_CASES_I18N[CASE_SLUG] = translations;
  }
})();

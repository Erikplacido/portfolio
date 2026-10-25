/* ==========================================================================
   Translations for Case 02: Cobra Kai · 3ª Temporada
   Supported: en (English), es (Español), fr (Français)
   ========================================================================== */
(function(){
  'use strict';

  var CASE_SLUG = 'cobra-kai';

  var translations = {
    en: {
      '.pf-hero .eyebrow': '<b>Case 02</b> · Concept · Game UI · Pixel Art',
      '.pf-hero h1': 'To win exclusive new season rewards, <em>win the fight.</em>',
      '.pf-hero .lede': 'Art concept and UI design for a mobile fighting advergame activating the premiere of Cobra Kai’s new season in Brazil. Players win exclusive rewards based on their combat high score.',

      // Meta
      '.pf-meta div:nth-child(1) dd': 'Cobra Kai · New Season Premiere',
      '.pf-meta div:nth-child(2) dd': 'Mobile advergame & reward activation',
      '.pf-meta div:nth-child(3) dd': 'Key art, pixel art, character sprites, arcade HUD & mobile screens',
      '.pf-meta div:nth-child(4) dd': 'Illustrator, Photoshop',

      // Links
      '.pf-links a[href="#fluxo"]': 'Flow',
      '.pf-links a[href="#inicio"]': 'Start Screen',
      '.pf-links a[href="#escolha"]': 'Fighter Select',
      '.pf-links a[href="#luta"]': 'Combat & Sprites',
      '.pf-links a[href="#ergonomia"]': 'Ergonomics & HUD',
      '.pf-links a[href="#recompensa"]': 'Reward & Prizes',
      '.pf-links a[href="#sistema"]': 'Visual System',

      // Flow
      '#fluxo .eyebrow': 'How it works',
      '#fluxo h2': 'Four screens, an activation with rewards.',
      '#fluxo .lede': 'The player picks a karate fighter from the series, faces their rival in a fast 90s-style arcade bout, and wins exclusive rewards based on their score during the new season premiere activation.',
      '#fluxo .flow .pf-card:nth-child(1) h3': 'Tap to Start',
      '#fluxo .flow .pf-card:nth-child(1) p': 'Title screen with the iconic dojo sunset.',
      '#fluxo .flow .pf-card:nth-child(2) h3': 'Select Fighter',
      '#fluxo .flow .pf-card:nth-child(2) p': 'Eight pixel-art characters plus random draw.',
      '#fluxo .flow .pf-card:nth-child(3) h3': 'Unleash Your Karate',
      '#fluxo .flow .pf-card:nth-child(3) p': 'Arcade bout with HUD, combos, and touch zones.',
      '#fluxo .flow .pf-card:nth-child(4) h3': 'Claim Rewards',
      '#fluxo .flow .pf-card:nth-child(4) p': 'Your high score unlocks exclusive season rewards.',

      // Start Screen
      '#inicio .eyebrow': '<b>01</b> · Title Screen',
      '#inicio h2': 'Tap the screen to start.',
      '#inicio .lede': 'The striped sunset from the poster becomes the signature game aesthetic: animated loop rays, retro pixel-art logo, and silhouettes of the final clash.',
      '#tapTxt': 'TAP SCREEN TO START',
      '#inicio figcaption': '<b>Title screen.</b> Crimson banner with torn paper edge and striped sun, echoing the official key art.',

      // Select Fighter
      '#escolha .eyebrow': '<b>02</b> · Character Select',
      '#escolha h2': 'Choose your fighter.',
      '#escolha .lede': 'Pixel-art portraits set against bold background hues, golden frames, and dojo snakes framing the selection matrix. The center slot serves as random select.',
      '#escolha figcaption': '<b>Fighter roster.</b> Selecting a character triggers the VS screen; the fist slot randomizes a fighter. Stats represent proposed game balance.',
      '#panel .hint': 'Hover or use arrow keys to browse; click or press Enter to lock in.',

      // Combat
      '#luta .eyebrow': '<b>03</b> · Combat Experience',
      '#luta h2': 'Unleash your karate.',
      '#luta .lede': 'Retro arcade HUD: framed portraits, slanted nametags, segmented health meters, and the centered K.O. emblem. On-screen controls were engineered specifically for natural thumb ergonomics.',
      '#luta figcaption': '<b>Interactive demo.</b> Use the D-Pad to walk, retreat, crouch, and jump (or W, A, S, D / Arrows). Yellow button (J) for PUNCH and red button (K) for KICK. Chain rapid strikes to unleash combos!',
      '#bP span': 'PUNCH',
      '#bK span': 'KICK',

      // Ergonomics
      '#ergonomia .eyebrow': '<b>04</b> · Mobile Ergonomics & HUD Architecture',
      '#ergonomia h2': 'Two-handed landscape grip: optimal thumb arc without blocking the fight.',
      '#ergonomia .lede': 'In mobile landscape fighting games, biomechanics determine whether players experience lightning-fast reflexes or muscle fatigue. The layout separates comfortable thumb reach zones while keeping the screen center completely open for readable martial arts action.',
      '#ergoTabs button:nth-child(1)': 'Thumb Reach Zones',
      '#ergoTabs button:nth-child(2)': 'Safe Area & Notch',
      '#ergoTabs button:nth-child(3)': 'HUD Architecture',
      '#ergonomia figcaption': '<b>Biomechanical thumb sweep mapping.</b> Green arcs demonstrate the natural rotation of the thumb carpometacarpal joint, locating attack triggers where hand muscles exert minimal effort.',
      '#ergonomia .grid-3 article:nth-child(1) .tag': 'Biomechanics',
      '#ergonomia .grid-3 article:nth-child(1) h3': '35° Neutral Slant',
      '#ergonomia .grid-3 article:nth-child(1) p': 'Virtual button grouping matches the thenar eminence trajectory, enabling intense sessions without strain.',
      '#ergonomia .grid-3 article:nth-child(2) .tag': 'Touch Precision',
      '#ergonomia .grid-3 article:nth-child(2) h3': '52 dp Touch Targets',
      '#ergonomia .grid-3 article:nth-child(2) p': 'The invisible hit target exceeds the button graphic by 20%, ensuring fast combo taps never miss.',
      '#ergonomia .grid-3 article:nth-child(3) .tag': 'Multi-Screen',
      '#ergonomia .grid-3 article:nth-child(3) h3': 'Safe Areas & Notch Insets',
      '#ergonomia .grid-3 article:nth-child(3) p': 'All HUD and virtual controls rely on <code>env(safe-area-inset)</code> and Container Queries, scaling smoothly from 16:9 to 20:9 displays.',

      // Reward
      '#recompensa .eyebrow': '<b>05</b> · Reward & Prizes',
      '#recompensa h2': 'Your high score unlocks season rewards.',
      '#recompensa .lede': 'The game shifts from arcade pixel art to a promotional showcase: points accumulated in combat unlock exclusive rewards and benefits during the new season premiere activation.',
      '#reward .pre': 'EXCLUSIVE REWARDS UNLOCKED',
      '#reward .play': '<i></i>Claim rewards',
      '#recompensa figcaption': '<b>Rewards unlock.</b> Score climbs to 999,999, the energy gauge completes, and exclusive new season rewards are revealed.',

      // System
      '#sistema .eyebrow': 'Visual Design System',
      '#sistema h2': '90s arcade nostalgia, authentic dojo colorways.',
      '#sistema .lede': 'Three clear typographic tiers and a palette sampled directly from the cobra emblem and the key-art California sunset.',
      '#sistema .callout': '<b>Conceptual portfolio project, unofficial.</b> Created as design exploration, not officially affiliated with Netflix or Sony Pictures Television. Cobra Kai, Netflix, and characters belong to their respective copyright holders.'
    },

    es: {
      '.pf-hero .eyebrow': '<b>Caso 02</b> · Concepto · Game UI · Pixel Art',
      '.pf-hero h1': 'Para ganar regalos de la nueva temporada, <em>gana el combate.</em>',
      '.pf-hero .lede': 'Concepto de arte y diseño de UI para un advergame móvil de lucha en activación del estreno de la nueva temporada de Cobra Kai en Brasil. Los participantes ganan regalos exclusivos según su puntuación en combate.',

      // Meta
      '.pf-meta div:nth-child(1) dd': 'Cobra Kai · Estreno de Temporada',
      '.pf-meta div:nth-child(2) dd': 'Advergame móvil & activación con regalos',
      '.pf-meta div:nth-child(3) dd': 'Key art, pixel art, sprites de personagens, HUD arcade y pantallas',
      '.pf-meta div:nth-child(4) dd': 'Illustrator, Photoshop',

      // Links
      '.pf-links a[href="#fluxo"]': 'Flujo',
      '.pf-links a[href="#inicio"]': 'Pantalla de Inicio',
      '.pf-links a[href="#escolha"]': 'Selección de Luchador',
      '.pf-links a[href="#luta"]': 'Combate y Sprites',
      '.pf-links a[href="#ergonomia"]': 'Ergonomía y HUD',
      '.pf-links a[href="#recompensa"]': 'Recompensa y Premios',
      '.pf-links a[href="#sistema"]': 'Sistema Visual',

      // Flow
      '#fluxo .eyebrow': 'Cómo funciona',
      '#fluxo h2': 'Cuatro pantallas, una activación con premios.',
      '#fluxo .lede': 'El jugador escoge a su luchador de la serie, derrota a su rival en un combate arcade noventero y gana regalos exclusivos según su puntuación en la activación de estreno.',
      '#fluxo .flow .pf-card:nth-child(1) h3': 'Toca para Iniciar',
      '#fluxo .flow .pf-card:nth-child(1) p': 'Pantalla de título con el atardecer del dojo.',
      '#fluxo .flow .pf-card:nth-child(2) h3': 'Selecciona Luchador',
      '#fluxo .flow .pf-card:nth-child(2) p': 'Ocho personajes en pixel art y opción aleatoria.',
      '#fluxo .flow .pf-card:nth-child(3) h3': 'Usa Todo tu Karate',
      '#fluxo .flow .pf-card:nth-child(3) p': 'Combate arcade con combos y zonas táctiles.',
      '#fluxo .flow .pf-card:nth-child(4) h3': 'Canje de Premios',
      '#fluxo .flow .pf-card:nth-child(4) p': 'La puntuación récord desbloquea los regalos.',

      // Start Screen
      '#inicio .eyebrow': '<b>01</b> · Pantalla de Inicio',
      '#inicio h2': 'Toca la pantalla para comenzar.',
      '#inicio .lede': 'El sol a rayas del cartel se convierte en el emblema del juego: rayos en bucle animado, logotipo en pixel art y las siluetas del choque final.',
      '#tapTxt': 'TOCA LA PANTALLA PARA INICIAR',
      '#inicio figcaption': '<b>Pantalla de inicio.</b> Franja roja rasgada y sol a rayas, preservando la identidad del cartel original.',

      // Select Fighter
      '#escolha .eyebrow': '<b>02</b> · Selección de Personaje',
      '#escolha h2': 'Elige a tu luchador.',
      '#escolha .lede': 'Retratos pixel art en fondos de color plano, marcos dorados y serpientes abrazando la cuadrícula. La casilla central sortea un luchador al azar.',
      '#escolha figcaption': '<b>Plantilla de luchadores.</b> Elegir abre el careo VS; el puño sortea al azar. Los atributos reflejan el diseño jugable.',
      '#panel .hint': 'Usa el ratón o flechas para explorar; clic o Enter para confirmar.',

      // Combat
      '#luta .eyebrow': '<b>03</b> · Experiencia de Combate',
      '#luta h2': 'Usa todo tu karate.',
      '#luta .lede': 'HUD clásico de recreativa: retratos enmarcados, cartelas diagonales, barras de vida segmentadas y sello K.O. en el centro. Controles optimizados para el pulgar.',
      '#luta figcaption': '<b>Demostración interactiva.</b> Usa la cruceta D-Pad para moverte, agacharte y saltar (o teclas W, A, S, D / Flechas). Botón amarillo (J) para PUÑO y rojo (K) para PATADA. ¡Encadena golpes para combos!',
      '#bP span': 'PUÑO',
      '#bK span': 'PATADA',

      // Reward
      '#recompensa .eyebrow': '<b>05</b> · Recompensa y Premios',
      '#recompensa h2': 'Tu puntuación desbloquea regalos de la temporada.',
      '#recompensa .lede': 'La interfaz muta del pixel art al escaparate promocional: los puntos acumulados desbloquean regalos y beneficios exclusivos para la nueva temporada.',
      '#reward .pre': 'REGALOS EXCLUSIVOS DESBLOQUEADOS',
      '#reward .play': '<i></i>Canjear premios',
      '#recompensa figcaption': '<b>Desbloqueo de regalos.</b> Los puntos alcanzan 999.999, la barra se completa y se revela el canje de premios.',

      // System
      '#sistema .eyebrow': 'Sistema Visual',
      '#sistema h2': 'Recreativa de los 90, colores del dojo.',
      '#sistema .lede': 'Tres niveles tipográficos claros y una paleta extraída del emblema y el atardecer californiano.',
      '#sistema .callout': '<b>Proyecto conceptual no oficial.</b> Ejercicio de diseño para portafolio sin relación comercial con Netflix ni Sony Pictures Television.'
    },

    fr: {
      '.pf-hero .eyebrow': '<b>Projet 02</b> · Concept · Game UI · Pixel Art',
      '.pf-hero h1': 'Pour remporter les cadeaux de la nouvelle saison, <em>gagnez le combat.</em>',
      '.pf-hero .lede': 'Concept artistique et UI pour un jeu de combat mobile accompagnant le lancement de la nouvelle saison de Cobra Kai au Brésil. Le joueur remporte des cadeaux exclusifs en fonction de son score de combat.',

      // Meta
      '.pf-meta div:nth-child(1) dd': 'Cobra Kai · Lancement de Saison',
      '.pf-meta div:nth-child(2) dd': 'Advergame mobile & activation avec cadeaux',
      '.pf-meta div:nth-child(3) dd': 'Key art, pixel art, sprites animés, HUD arcade et écrans mobiles',
      '.pf-meta div:nth-child(4) dd': 'Illustrator, Photoshop',

      // Links
      '.pf-links a[href="#fluxo"]': 'Parcours',
      '.pf-links a[href="#inicio"]': 'Écran Titre',
      '.pf-links a[href="#escolha"]': 'Sélection des Combattants',
      '.pf-links a[href="#luta"]': 'Combat & Sprites',
      '.pf-links a[href="#ergonomia"]': 'Ergonomie & HUD',
      '.pf-links a[href="#recompensa"]': 'Récompenses & Cadeaux',
      '.pf-links a[href="#sistema"]': 'Système Visuel',

      // Flow
      '#fluxo .eyebrow': 'Fonctionnement',
      '#fluxo h2': 'Quatre écrans, une activation récompensée.',
      '#fluxo .lede': 'Le joueur choisit son karatéka, affronte son adversaire dans un duel arcade rétro digne des années 90 et remporte des cadeaux exclusifs selon son score lors du lancement de la nouvelle saison.',
      '#fluxo .flow .pf-card:nth-child(1) h3': 'Appuyer pour Jouer',
      '#fluxo .flow .pf-card:nth-child(1) p': 'Écran titre baigné dans le coucher de soleil du dojo.',
      '#fluxo .flow .pf-card:nth-child(2) h3': 'Choix du Combattant',
      '#fluxo .flow .pf-card:nth-child(2) p': 'Huit personnages en pixel art et tirage aléatoire.',
      '#fluxo .flow .pf-card:nth-child(3) h3': 'Combattez sans Répit',
      '#fluxo .flow .pf-card:nth-child(3) p': 'Affrontement arcade avec HUD, combos et zones tactiles.',
      '#fluxo .flow .pf-card:nth-child(4) h3': 'Récupérer les Cadeaux',
      '#fluxo .flow .pf-card:nth-child(4) p': 'Le score maximal débloque les récompenses exclusives.',

      // Start Screen
      '#inicio .eyebrow': '<b>01</b> · Écran Titre',
      '#inicio h2': 'Touchez l’écran pour démarrer.',
      '#inicio .lede': 'Le soleil strié de l’affiche devient la signature graphique : rayons animés en boucle, logo pixel art d’époque et silhouettes du face-à-face final.',
      '#tapTxt': 'TOUCHEZ L’ÉCRAN POUR JOUER',
      '#inicio figcaption': '<b>Écran d’accueil.</b> Bande rouge découpée et soleil stylisé, fidèles à la composition de l’affiche.',

      // Select Fighter
      '#escolha .eyebrow': '<b>02</b> · Sélection du Personnage',
      '#escolha h2': 'Choisissez votre combattant.',
      '#escolha .lede': 'Portraits pixel art sur aplats vifs, bordures dorées et cobras encadrant la grille. La case centrale permet une sélection aléatoire.',
      '#escolha figcaption': '<b>Sélection de combattant.</b> Confirmer lance l’écran VS ; l’icône du poing tire au sort un élève.',
      '#panel .hint': 'Survolez ou utilisez les flèches ; cliquez ou Entrée pour valider.',

      // Combat
      '#luta .eyebrow': '<b>03</b> · Expérience de Combat',
      '#luta h2': 'Libérez toute votre puissance martiale.',
      '#luta .lede': 'HUD typique des bornes d’arcade : médaillons de portrait, bandeaux de nom inclinés, jauges de santé segmentées et insigne K.O. au centre. Contrôles tactiles optimisés pour les pouces.',
      '#luta figcaption': '<b>Démonstration interactive.</b> Utilisez le D-Pad pour avancer, reculer, vous baisser et sauter (touches W, A, S, D ou Flèches). Bouton jaune (J) pour POING et rouge (K) pour PIED.',
      '#bP span': 'POING',
      '#bK span': 'PIED',

      // Reward
      '#recompensa .eyebrow': '<b>05</b> · Récompenses & Cadeaux',
      '#recompensa h2': 'Votre score débloque les cadeaux de la saison.',
      '#recompensa .lede': 'L’univers visuel bascule du pixel art à la vitrine événementielle : les points accumulés débloquent des cadeaux et avantages exclusifs pour la nouvelle saison.',
      '#reward .pre': 'CADEAUX EXCLUSIFS DÉBLOQUÉS',
      '#reward .play': '<i></i>Récupérer les cadeaux',
      '#recompensa figcaption': '<b>Déblocage des cadeaux.</b> Le score culmine à 999 999, la jauge se remplit et l’accès aux récompenses est révélé.',

      // System
      '#sistema .eyebrow': 'Système Visuel',
      '#sistema h2': 'Arcade des années 90, nuances officielles du dojo.',
      '#sistema .lede': 'Trois registres typographiques structurés et une palette inspirée du cobra et du coucher de soleil californien.',
      '#sistema .callout': '<b>Projet de design conceptuel, non officiel.</b> Réalisé pour un portfolio sans affiliation avec Netflix ou Sony Pictures Television.'
    }
  };

  if (window.PORTFOLIO_I18N && window.PORTFOLIO_I18N.registerCase) {
    window.PORTFOLIO_I18N.registerCase(CASE_SLUG, translations);
  } else {
    window.PORTFOLIO_CASES_I18N = window.PORTFOLIO_CASES_I18N || {};
    window.PORTFOLIO_CASES_I18N[CASE_SLUG] = translations;
  }
})();

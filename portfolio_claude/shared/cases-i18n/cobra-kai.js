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
      '.pf-hero h1': 'To watch the season premiere before anyone else, <em>win the fight.</em>',
      '.pf-hero .lede': 'Art concept and UI design for a mobile fighting advergame promoting Cobra Kai Season 3 in Brazil. Players who achieve the maximum high score unlock early streaming access to episode one.',

      // Meta
      '.pf-meta div:nth-child(1) dd': 'Cobra Kai · Season 3',
      '.pf-meta div:nth-child(2) dd': 'Mobile advergame (concept)',
      '.pf-meta div:nth-child(3) dd': 'Key art, pixel art, character sprites, arcade HUD & mobile screens',
      '.pf-meta div:nth-child(4) dd': 'Illustrator, Photoshop',

      // Links
      '.pf-links a[href="#fluxo"]': 'Flow',
      '.pf-links a[href="#inicio"]': 'Start Screen',
      '.pf-links a[href="#escolha"]': 'Fighter Select',
      '.pf-links a[href="#luta"]': 'Combat & Sprites',
      '.pf-links a[href="#ergonomia"]': 'Ergonomics & HUD',
      '.pf-links a[href="#recompensa"]': 'Reward & Unlock',
      '.pf-links a[href="#sistema"]': 'Visual System',

      // Flow
      '#fluxo .eyebrow': 'How it works',
      '#fluxo h2': 'Four screens, one reward.',
      '#fluxo .lede': 'The player picks a karate fighter from the series, faces their rival in a fast 90s-style arcade bout, and upon reaching the top score, unlocks the season premiere.',
      '#fluxo .flow .pf-card:nth-child(1) h3': 'Tap to Start',
      '#fluxo .flow .pf-card:nth-child(1) p': 'Title screen with the iconic dojo sunset.',
      '#fluxo .flow .pf-card:nth-child(2) h3': 'Select Fighter',
      '#fluxo .flow .pf-card:nth-child(2) p': 'Eight pixel-art characters plus random draw.',
      '#fluxo .flow .pf-card:nth-child(3) h3': 'Unleash Your Karate',
      '#fluxo .flow .pf-card:nth-child(3) p': 'Arcade bout with HUD, combos, and touch zones.',
      '#fluxo .flow .pf-card:nth-child(4) h3': 'Season Premiere',
      '#fluxo .flow .pf-card:nth-child(4) p': 'Reaching the maximum score unlocks the stream.',

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
      '#luta figcaption': '<b>Interactive demo.</b> Tap KICK or PUNCH (or press K and J). The demo plays automatically until you take control.',
      '#bP': 'PUNCH',
      '#bK': 'KICK',

      // Clips
      '#gameplayClips .ck-clips-ttl b': 'Gameplay Clips in Action · 60 FPS',
      '#gameplayClips .ck-clips-ttl span': 'Fluid combat animation and cinematic season unlock transition',
      '#tabClip1': '01 · Crane Kick & K.O.',
      '#tabClip2': '02 · Premiere Unlock',
      '#clipMetaCombate .ck-clip-card:nth-child(1) b': 'Hit-Freeze (4 Frames)',
      '#clipMetaCombate .ck-clip-card:nth-child(1) p': 'Calculated micro-pause at the moment of high-kick impact, delivering the visceral bone-crunching feel of 90s arcade classics.',
      '#clipMetaCombate .ck-clip-card:nth-child(2) b': 'Dynamic Screen Shake',
      '#clipMetaCombate .ck-clip-card:nth-child(2) p': 'Two-axis camera vibration during critical strikes, magnifying the drama of the final K.O. and bursting particle badges.',
      '#clipMetaCombate .ck-clip-card:nth-child(3) b': 'x5 Combo Multiplier',
      '#clipMetaCombate .ck-clip-card:nth-child(3) p': 'Chaining jabs into the signature Crane Kick yields exponential score bonuses, culminating in the 999,999 high-score gate.',
      '#clipMetaUnlock .ck-clip-card:nth-child(1) b': 'CRT Glitch & Scanlines',
      '#clipMetaUnlock .ck-clip-card:nth-child(1) p': 'Analog tube distortion simulating the seamless jump from an arcade cabinet to a premium streaming platform.',
      '#clipMetaUnlock .ck-clip-card:nth-child(2) b': 'Turbo Score Ticker',
      '#clipMetaUnlock .ck-clip-card:nth-child(2) p': 'The gold gauge fills rapidly as the score ticks up to 999,999, generating an instant sense of earned triumph.',
      '#clipMetaUnlock .ck-clip-card:nth-child(3) b': 'Pulsing Call-to-Action',
      '#clipMetaUnlock .ck-clip-card:nth-child(3) p': 'The "Watch Episode" button pulses with a 1.8s heartbeat rhythm in crimson glow, inviting immediate tap-through to Netflix.',

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
      '#recompensa .eyebrow': '<b>05</b> · Reward & Unlock',
      '#recompensa h2': 'The maximum high score unlocks the season premiere.',
      '#recompensa .lede': 'The game shifts seamlessly from pixel-art arcade to the streaming interface: black backdrop, golden cobra crest, brush typography, and Netflix branding. The moment where the game becomes the trailer.',
      '#reward .pre': 'WATCH THE SEASON PREMIERE NOW',
      '#reward .play': '<i></i>Watch episode',
      '#recompensa figcaption': '<b>Unlock state.</b> Score climbs to 999,999, the energy gauge completes, and the premiere gate opens.',

      // System
      '#sistema .eyebrow': 'Visual Design System',
      '#sistema h2': '90s arcade nostalgia, authentic dojo colorways.',
      '#sistema .lede': 'Three clear typographic tiers and a palette sampled directly from the cobra emblem and the key-art California sunset.',
      '#sistema .callout': '<b>Conceptual portfolio project, unofficial.</b> Created as design exploration, not officially affiliated with Netflix or Sony Pictures Television. Cobra Kai, Netflix, and characters belong to their respective copyright holders.'
    },

    es: {
      '.pf-hero .eyebrow': '<b>Caso 02</b> · Concepto · Game UI · Pixel Art',
      '.pf-hero h1': 'Para ver el estreno antes que nadie, <em>gana el combate.</em>',
      '.pf-hero .lede': 'Concepto de arte y diseño de UI para un advergame móvil de lucha que promociona la 3ª temporada de Cobra Kai en Brasil. Los jugadores que alcanzan la puntuación máxima obtienen acceso anticipado exclusivo al primer episodio.',

      // Meta
      '.pf-meta div:nth-child(1) dd': 'Cobra Kai · Temporada 3',
      '.pf-meta div:nth-child(2) dd': 'Advergame móvil (concepto)',
      '.pf-meta div:nth-child(3) dd': 'Key art, pixel art, sprites de personajes, HUD arcade y pantallas',
      '.pf-meta div:nth-child(4) dd': 'Illustrator, Photoshop',

      // Links
      '.pf-links a[href="#fluxo"]': 'Flujo',
      '.pf-links a[href="#inicio"]': 'Pantalla de Inicio',
      '.pf-links a[href="#escolha"]': 'Selección de Luchador',
      '.pf-links a[href="#luta"]': 'Combate y Sprites',
      '.pf-links a[href="#ergonomia"]': 'Ergonomía y HUD',
      '.pf-links a[href="#recompensa"]': 'Recompensa y Desbloqueo',
      '.pf-links a[href="#sistema"]': 'Sistema Visual',

      // Flow
      '#fluxo .eyebrow': 'Cómo funciona',
      '#fluxo h2': 'Cuatro pantallas, una recompensa.',
      '#fluxo .lede': 'El jugador escoge a su luchador favorito de la serie, derrota a su rival en un combate arcade noventero y, al lograr la puntuación récord, desbloquea el estreno.',
      '#fluxo .flow .pf-card:nth-child(1) h3': 'Toca para Iniciar',
      '#fluxo .flow .pf-card:nth-child(1) p': 'Pantalla de título con el atardecer del dojo.',
      '#fluxo .flow .pf-card:nth-child(2) h3': 'Selecciona Luchador',
      '#fluxo .flow .pf-card:nth-child(2) p': 'Ocho personajes en pixel art y opción aleatoria.',
      '#fluxo .flow .pf-card:nth-child(3) h3': 'Usa Todo tu Karate',
      '#fluxo .flow .pf-card:nth-child(3) p': 'Combate arcade con combos y zonas táctiles.',
      '#fluxo .flow .pf-card:nth-child(4) h3': 'Estreno Exclusivo',
      '#fluxo .flow .pf-card:nth-child(4) p': 'La puntuación récord desbloquea el capítulo.',

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
      '#luta figcaption': '<b>Demostración interactiva.</b> Pulsa PATADA o PUÑETAZO (o las teclas K y J). La máquina juega automáticamente hasta que tomas el mando.',
      '#bP': 'PUÑO',
      '#bK': 'PATADA',

      // Clips
      '#gameplayClips .ck-clips-ttl b': 'Clips de Gameplay en Acción · 60 FPS',
      '#gameplayClips .ck-clips-ttl span': 'Animación fluida de combate y transición cinematográfica de estreno',
      '#tabClip1': '01 · Golpe de la Grulla & K.O.',
      '#tabClip2': '02 · Desbloqueo del Estreno',
      '#clipMetaCombate .ck-clip-card:nth-child(1) b': 'Hit-Freeze (4 Cuadros)',
      '#clipMetaCombate .ck-clip-card:nth-child(1) p': 'Micropausa precisa en el momento del impacto para transmitir la contundencia física de los arcades de los 90.',
      '#clipMetaCombate .ck-clip-card:nth-child(2) b': 'Sacudida de Cámara Dinámica',
      '#clipMetaCombate .ck-clip-card:nth-child(2) p': 'Vibración de pantalla en dos ejes durante el golpe crítico, intensificando el dramatismo del K.O.',
      '#clipMetaCombate .ck-clip-card:nth-child(3) b': 'Multiplicador Combo x5',
      '#clipMetaCombate .ck-clip-card:nth-child(3) p': 'Encadenar golpes rápidos culminando en la Grulla dispara los puntos hasta el récord de 999.999.',
      '#clipMetaUnlock .ck-clip-card:nth-child(1) b': 'Efecto CRT y Scanlines',
      '#clipMetaUnlock .ck-clip-card:nth-child(1) p': 'Distorsión analógica que simula el salto directo desde el salón arcade a la emisión en streaming.',
      '#clipMetaUnlock .ck-clip-card:nth-child(2) b': 'Marcador Acelerado',
      '#clipMetaUnlock .ck-clip-card:nth-child(2) p': 'La barra de carga dorada avanza mientras la puntuación sube a 999.999, generando satisfacción inmediata.',
      '#clipMetaUnlock .ck-clip-card:nth-child(3) b': 'Llamada a la Acción Pulsante',
      '#clipMetaUnlock .ck-clip-card:nth-child(3) p': 'El botón "Ver episodio" late con un ritmo de 1.8s invitando al usuario a abrir Netflix de inmediato.',

      // Ergonomics
      '#ergonomia .eyebrow': '<b>04</b> · Ergonomía Móvil y Arquitectura de HUD',
      '#ergonomia h2': 'Agarre horizontal a dos manos: alcance de pulgar sin tapar la acción.',
      '#ergonomia .lede': 'En juegos móviles de lucha en horizontal, la biomecánica marca la diferencia entre reflejos precisos y fatiga muscular. La disposición reserva zonas de alcance cómodo y libera el centro para seguir el combate.',
      '#ergoTabs button:nth-child(1)': 'Zonas de Pulgares',
      '#ergoTabs button:nth-child(2)': 'Safe Area & Notch',
      '#ergoTabs button:nth-child(3)': 'Arquitectura de HUD',
      '#ergonomia figcaption': '<b>Mapeo biomecánico del agarre apaisado.</b> Los arcos verdes indican el barrido natural de la articulación del pulgar, ubicando los botones donde se ejerce menor esfuerzo.',
      '#ergonomia .grid-3 article:nth-child(1) .tag': 'Biomecánica',
      '#ergonomia .grid-3 article:nth-child(1) h3': 'Inclinación Neutra de 35°',
      '#ergonomia .grid-3 article:nth-child(1) p': 'La orientación de los botones virtuales respeta la eminencia tenar, evitando sobrecargas en partidas largas.',
      '#ergonomia .grid-3 article:nth-child(2) .tag': 'Precisión Táctil',
      '#ergonomia .grid-3 article:nth-child(2) h3': 'Áreas Táctiles de 52 dp',
      '#ergonomia .grid-3 article:nth-child(2) p': 'El área de pulsación invisible supera el gráfico en un 20%, garantizando toques efectivos en combos rápidos.',
      '#ergonomia .grid-3 article:nth-child(3) .tag': 'Multi-pantalla',
      '#ergonomia .grid-3 article:nth-child(3) h3': 'Márgenes de Seguridad y Notch',
      '#ergonomia .grid-3 article:nth-child(3) p': 'Elementos de HUD adaptados mediante <code>env(safe-area-inset)</code> y Container Queries para ratios de 16:9 a 20:9.',

      // Reward
      '#recompensa .eyebrow': '<b>05</b> · Recompensa y Estreno',
      '#recompensa h2': 'La puntuación récord desbloquea el estreno.',
      '#recompensa .lede': 'La interfaz muta del pixel art al universo de la plataforma: fondo negro, cobra dorada, caligrafía gestual y cabecera de streaming. Es el momento en que el juego se convierte en tráiler.',
      '#reward .pre': 'MIRA AHORA EL ESTRENO ANTICIPADO',
      '#reward .play': '<i></i>Ver episodio',
      '#recompensa figcaption': '<b>Desbloqueo.</b> Los puntos alcanzan 999.999, la barra se completa y se abre la puerta al capítulo.',

      // System
      '#sistema .eyebrow': 'Sistema Visual',
      '#sistema h2': 'Recreativa de los 90, colores del dojo.',
      '#sistema .lede': 'Tres niveles tipográficos claros y una paleta extraída del emblema y el atardecer californiano.',
      '#sistema .callout': '<b>Proyecto conceptual no oficial.</b> Ejercicio de diseño para portafolio sin relación comercial con Netflix ni Sony Pictures Television.'
    },

    fr: {
      '.pf-hero .eyebrow': '<b>Projet 02</b> · Concept · Game UI · Pixel Art',
      '.pf-hero h1': 'Pour découvrir la saison avant tout le monde, <em>remportez le combat.</em>',
      '.pf-hero .lede': 'Concept artistique et UI pour un jeu de combat mobile promotionnel accompagnant la sortie de la saison 3 de Cobra Kai au Brésil. Les joueurs réalisant le score maximal débloquent l’accès en avant-première au premier épisode.',

      // Meta
      '.pf-meta div:nth-child(1) dd': 'Cobra Kai · Saison 3',
      '.pf-meta div:nth-child(2) dd': 'Advergame mobile (concept)',
      '.pf-meta div:nth-child(3) dd': 'Key art, pixel art, sprites animés, HUD arcade et écrans mobiles',
      '.pf-meta div:nth-child(4) dd': 'Illustrator, Photoshop',

      // Links
      '.pf-links a[href="#fluxo"]': 'Parcours',
      '.pf-links a[href="#inicio"]': 'Écran Titre',
      '.pf-links a[href="#escolha"]': 'Sélection des Combattants',
      '.pf-links a[href="#luta"]': 'Combat & Sprites',
      '.pf-links a[href="#ergonomia"]': 'Ergonomie & HUD',
      '.pf-links a[href="#recompensa"]': 'Récompense & Déblocage',
      '.pf-links a[href="#sistema"]': 'Système Visuel',

      // Flow
      '#fluxo .eyebrow': 'Fonctionnement',
      '#fluxo h2': 'Quatre écrans, une récompense.',
      '#fluxo .lede': 'Le joueur choisit son karatéka, affronte son adversaire dans un duel arcade rétro digne des années 90, et débloque l’épisode inaugural en décrochant le high score.',
      '#fluxo .flow .pf-card:nth-child(1) h3': 'Appuyer pour Jouer',
      '#fluxo .flow .pf-card:nth-child(1) p': 'Écran titre baigné dans le coucher de soleil du dojo.',
      '#fluxo .flow .pf-card:nth-child(2) h3': 'Choix du Combattant',
      '#fluxo .flow .pf-card:nth-child(2) p': 'Huit personnages en pixel art et tirage aléatoire.',
      '#fluxo .flow .pf-card:nth-child(3) h3': 'Combattez sans Répit',
      '#fluxo .flow .pf-card:nth-child(3) p': 'Affrontement arcade avec HUD, combos et zones tactiles.',
      '#fluxo .flow .pf-card:nth-child(4) h3': 'Avant-Première Exclusivité',
      '#fluxo .flow .pf-card:nth-child(4) p': 'Le score maximal donne accès immédiat à l’épisode.',

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
      '#luta figcaption': '<b>Démonstration jouable.</b> Touchez COUP DE PIED ou COUP DE POING (touches K et J). Le combat tourne en démonstration jusqu’à votre intervention.',
      '#bP': 'POING',
      '#bK': 'PIED',

      // Clips
      '#gameplayClips .ck-clips-ttl b': 'Gameplay en Action · 60 FPS',
      '#gameplayClips .ck-clips-ttl span': 'Animation martiale fluide et transition vers la plateforme de diffusion',
      '#tabClip1': '01 · Coup de la Grue & K.O.',
      '#tabClip2': '02 · Déblocage de la Saison',
      '#clipMetaCombate .ck-clip-card:nth-child(1) b': 'Hit-Freeze (4 Images)',
      '#clipMetaCombate .ck-clip-card:nth-child(1) p': 'Micro-pause calibrée à l’impact du coup de pied sauté, restituant l’impact physique percutant des classiques arcade.',
      '#clipMetaCombate .ck-clip-card:nth-child(2) b': 'Secousse d’Écran Dynamique',
      '#clipMetaCombate .ck-clip-card:nth-child(2) p': 'Oscillation de la caméra sur deux axes lors des frappes critiques pour accentuer l’intensité dramatique du K.O.',
      '#clipMetaCombate .ck-clip-card:nth-child(3) b': 'Multiplicateur Combo x5',
      '#clipMetaCombate .ck-clip-card:nth-child(3) p': 'Enchaîner les coups directs avec le Coup de la Grue décuple le score jusqu’au palier des 999 999 points.',
      '#clipMetaUnlock .ck-clip-card:nth-child(1) b': 'Effet CRT & Lignes de Balayage',
      '#clipMetaUnlock .ck-clip-card:nth-child(1) p': 'Distorsion cathodique évoquant la transition directe entre borne rétro et plateforme de streaming.',
      '#clipMetaUnlock .ck-clip-card:nth-child(2) b': 'Compteur Turbo de Score',
      '#clipMetaUnlock .ck-clip-card:nth-child(2) p': 'La jauge dorée se remplit rapidement tandis que les points grimpent vers le sommet, créant un sentiment de récompense immédiate.',
      '#clipMetaUnlock .ck-clip-card:nth-child(3) b': 'Bouton d’Appel à l’Action Pulsant',
      '#clipMetaUnlock .ck-clip-card:nth-child(3) p': 'Le bouton « Voir l’épisode » s’anime au rythme d’un battement régulier pour encourager le visionnage immédiat sur Netflix.',

      // Ergonomics
      '#ergonomia .eyebrow': '<b>04</b> · Ergonomie Mobile & Architecture HUD',
      '#ergonomia h2': 'Prise à deux mains en mode paysage : amplitude optimale sans masquer l’action.',
      '#ergonomia .lede': 'Sur mobile, l’ergonomie conditionne la réactivité et prévient la fatigue. La disposition isole les zones d’attaque naturelles sous les pouces tout en préservant le centre de l’écran pour suivre les mouvements.',
      '#ergoTabs button:nth-child(1)': 'Zones de Préhension',
      '#ergoTabs button:nth-child(2)': 'Safe Area & Encoche',
      '#ergoTabs button:nth-child(3)': 'Architecture HUD',
      '#ergonomia figcaption': '<b>Cartographie biomécanique de préhension.</b> Les arcs verts indiquent la course naturelle du pouce, positionnant les boutons virtuels là où l’effort musculaire est minimal.',
      '#ergonomia .grid-3 article:nth-child(1) .tag': 'Biomécanique',
      '#ergonomia .grid-3 article:nth-child(1) h3': 'Angle Neutre de 35°',
      '#ergonomia .grid-3 article:nth-child(1) p': 'L’agencement des commandes respecte la morphologie de la main pour des parties prolongées sans tensions.',
      '#ergonomia .grid-3 article:nth-child(2) .tag': 'Précision Tactile',
      '#ergonomia .grid-3 article:nth-child(2) h3': 'Cibles Tactiles de 52 dp',
      '#ergonomia .grid-3 article:nth-child(2) p': 'La surface réactive dépasse le graphisme de 20 % pour enregistrer chaque frappe lors des combos rapides.',
      '#ergonomia .grid-3 article:nth-child(3) .tag': 'Multi-écrans',
      '#ergonomia .grid-3 article:nth-child(3) h3': 'Marges de Sécurité & Encoches',
      '#ergonomia .grid-3 article:nth-child(3) p': 'Le HUD s’adapte dynamiquement grâce à <code>env(safe-area-inset)</code> et aux Container Queries du format 16:9 au 20:9.',

      // Reward
      '#recompensa .eyebrow': '<b>05</b> · Récompense & Déblocage',
      '#recompensa h2': 'Le high score débloque l’avant-première.',
      '#recompensa .lede': 'L’univers visuel bascule du pixel art à l’interface premium de streaming : fond sombre, cobra doré, typographie au pinceau et logo de la plateforme. Le jeu devient bande-annonce.',
      '#reward .pre': 'REGARDEZ MAINTENANT L’AVANT-PREMIÈRE',
      '#reward .play': '<i></i>Regarder l’épisode',
      '#recompensa figcaption': '<b>Déblocage final.</b> Le score culmine à 999 999, la jauge se remplit et l’accès à la vidéo s’ouvre.',

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

/* ==========================================================================
   Translations for Case 14: Hellfire Overdrive
   Supported: en (English), es (Español), fr (Français)
   ========================================================================== */
(function(){
  'use strict';

  var CASE_SLUG = 'hellfire-overdrive';

  var translations = {
    en: {
      '.pf-hero .eyebrow': '<b>Case 14</b> · Game Design & Web Audio Engineering · Mobile Advergame',
      '.pf-hero h1': 'A one-minute guitar solo: <em>nail the rhythm, take home the loot.</em>',
      '.pf-hero .lede': 'Mobile rhythm advergame developed for an immersive <em>Stranger Things</em> brand activation at CCXP: a 132 BPM 5-lane guitar battle featuring 16-bit chiptune audio. Players who conquer the solo with Rank A or S unlock exclusive physical rewards at the booth. Powered by the Web Audio API with millisecond Bluetooth latency compensation.',
      '.ho-note': 'Mobile Advergame & Audio Engineering · CCXP / Netflix Activation · Queue Retention & Hardware-Synced Web Audio',

      // Hero Actions
      '.ho-btn-play-now strong': 'PLAY NOW IN BROWSER',
      '.ho-btn-play-now small': 'Official complete game · 100% web-based (no install)',
      '.ho-play .txt': 'Play 16-bit Track<small>Marionette · 32kHz SNES Chiptune</small>',
      '.ho-play-sub .txt': 'Test Interactive Stage<small>Live inline canvas</small>',

      // Meta
      '.pf-meta div:nth-child(1) dd': 'Game Design, Web Audio Architecture, and Creative Direction',
      '.pf-meta div:nth-child(2) dd': 'Mobile Advergame · Web Audio API & 60fps Canvas',
      '.pf-meta div:nth-child(3) dd': 'Playable browser game, Bluetooth sync calibrator, redemption flow, and 16-bit soundtrack',
      '.pf-meta div:nth-child(4) dd': 'Web Audio API · HTML5 Canvas · Screen Wake Lock API · Strudel · ChatGPT',

      // Links
      '.pf-links a[href="#contexto"]': 'Context',
      '.pf-links a[href="#jogo"]': 'The Game',
      '.pf-links a[href="#arquitetura"]': 'Audio Architecture',
      '.pf-links a[href="#ajustes"]': 'Accessibility',
      '.pf-links a[href="#overdrive"]': 'Overdrive',
      '.pf-links a[href="#brinde"]': 'Rewards',
      '.pf-links a[href="#trilha"]': 'Soundtrack',

      // Context
      '#contexto .eyebrow': 'Brand Activation · CCXP & Netflix',
      '#contexto h2': 'From the stagnant queue to an electrifying metal solo at the Stranger Things booth.',
      '#contexto .lede': 'Designed for the Hellfire Club booth at CCXP, this advergame solved the friction of 1-hour queues: attendees scanned QR codes on line dividers, launched the game in under 2 seconds without downloading an app store binary, and if they scored Rank A or S, redeemed metallic guitar picks and collectible pins directly at the counter.',
      '#contexto .callout': '<b>Activation Brief:</b> Create an addictive 80s 16-bit rhythm game requiring zero installation, engineered to captivate waiting attendees, drive friendly competition, and award high-value tangible prizes.',

      // The Game
      '#jogo .eyebrow': '<b>01</b> · The Game',
      '#jogo h2': 'Five frets, one strike line, nowhere to hide.',
      '#jogo .lede': 'Notes cascade down the guitar neck towards the strike line. Sustained notes require holding; on Legend difficulty, simultaneous chords demand multi-finger precision. The music keeps playing uninterrupted even when missing notes.',
      '#jogo .hg-kicker': 'Playable Version',
      '#jogo .hg-cta.hg-go': 'Play Solo',
      '#jogo .hg-link.hg-demo': 'Watch Demonstration',
      '#jogo .hg-modes button[data-mode="easy"]': 'Apprentice',
      '#jogo .hg-modes button[data-mode="normal"]': 'Guitarist',
      '#jogo .hg-modes button[data-mode="expert"]': 'Legend',
      '#jogo figcaption': '<b>In-game captures</b> in demo mode, which plays autonomously without submitting scores.',

      // Architecture
      '#arquitetura .eyebrow': '<b>02</b> · Technical Architecture & Rhythm Engine',
      '#arquitetura h2': 'AudioContext Clock vs. requestAnimationFrame: Millisecond Audio Sync.',
      '#arquitetura .lede': 'Why HTML5 rhythm games typically drift and how Hellfire Overdrive achieved surgical timing accuracy with dedicated millisecond Bluetooth headphone offset calibration.',
      '#arquitetura .ho-arch-card:nth-child(1) h3': 'Hardware Audio Master Clock',
      '#arquitetura .ho-arch-card:nth-child(1) p': 'Instead of trusting JS timers (<code>setTimeout</code>/<code>setInterval</code>) prone to 50ms main-thread frame drops, the engine anchors the timeline to <code>AudioContext.currentTime</code>:',
      '#arquitetura .ho-arch-card:nth-child(2) h3': 'Bluetooth Offset (−200ms to +300ms)',
      '#arquitetura .ho-arch-card:nth-child(2) p': 'Wireless earbuds (AirPods, Galaxy Buds) introduce 120ms to 240ms of acoustic codec delay. The engine calculates an adjusted timeline:',
      '#arquitetura .ho-arch-card:nth-child(3) h3': 'Surgical Judgement Windows',
      '#arquitetura .ho-arch-card:nth-child(3) p': 'Precision is graded by comparing note timestamps against the active <code>gameClock()</code>:',
      '#arquitetura .ho-arch-card:nth-child(4) h3': 'Native Mobile APIs',
      '#arquitetura .ho-arch-card:nth-child(4) p': 'Mobile web capabilities tailored for high-stakes in-person queue activations:',

      // Accessibility
      '#ajustes .eyebrow': '<b>03</b> · Accessible Design',
      '#ajustes h2': 'Color paired with numbers, sound paired with calibration.',
      '#ajustes .lede': 'In live activations, anyone in line plays. Frets combine numbers with high-contrast colors, audio timings compensate for wireless delay, and particle effects can be dialed down.',
      '#ajustes .ho-two:nth-of-type(2) .pf-card:nth-child(1) h3': 'Beyond Color-Only Cues',
      '#ajustes .ho-two:nth-of-type(2) .pf-card:nth-child(2) h3': 'Zero-Frustration Flow',

      // Overdrive
      '#overdrive .eyebrow': '<b>04</b> · Overdrive Mechanic',
      '#overdrive h2': 'Combos multiply score, Overdrive doubles everything.',
      '#overdrive .lede': 'Sequential hits elevate the multiplier. The Overdrive meter charges with sustained combos; activated via button or spacebar, it doubles the score multiplier for 8 seconds.',
      '#overdrive figcaption': '<b>Gameplay capture</b>, 33 seconds remaining, 30,400 points.',

      // Reward
      '#brinde .eyebrow': '<b>03</b> · Activation & Loot Redemption',
      '#brinde h2': 'Rank A or S unlocks physical prizes at the booth.',
      '#brinde .lede': 'The engine tracks accuracy dynamically. Finishing with Rank A (&ge; 88%) or Rank S (&ge; 97%) reveals a cryptographic QR code voucher to claim metallic guitar picks and pins at CCXP.',
      '#brinde figcaption': '<b>Left: production screenshot; center: interactive prize proposal.</b> Cryptographic redemption codes verify legitimate high scores at the physical booth counter.',

      // AI Direction
      '#ia .eyebrow': '<b>06</b> · AI-Assisted Creative Direction',
      '#ia h2': 'AI assisted with code; human direction shaped the game.',
      '#ia .lede': 'The game was prototyped with ChatGPT under my creative direction. My role centered on what models cannot invent alone: core game feel, balance, authentic brand tone, and queue ergonomics.',

      // Soundtrack
      '#trilha .eyebrow': '<b>04</b> · Custom Soundtrack',
      '#trilha .lede': 'The music on this page is an original SNES-style chiptune theme composed for the case: galloping riff in E minor, square-wave bass and solo, and electronic drums.'
    },

    es: {
      '.pf-hero .eyebrow': '<b>Caso 14</b> · Game Design e Ingeniería Web Audio · Advergame Móvil',
      '.pf-hero h1': 'Un solo de un minuto: <em>toca con precisión y llévate el premio.</em>',
      '.pf-hero .lede': 'Advergame móvil creado para la activación de <em>Stranger Things</em> en la CCXP: juego de ritmo de guitarra en pixel art a 132 BPM, cinco pistas y sonido 16-bits. Quien completa el solo con Rango A o S desbloquea premios físicos exclusivos en el stand. Desarrollado con Web Audio API y compensación de latencia Bluetooth.',
      '.ho-note': 'Advergame Móvil e Ingeniería de Audio · Activación CCXP / Netflix · Retención en Colas y Sincronía Web Audio',

      // Hero Actions
      '.ho-btn-play-now strong': 'JUGAR AHORA EN EL NAVEGADOR',
      '.ho-btn-play-now small': 'Versión completa oficial · 100% web (sin descargas)',
      '.ho-play .txt': 'Escuchar Pista 16-bits<small>Marioneta · Chiptune SNES 32kHz</small>',
      '.ho-play-sub .txt': 'Probar Escenario Interactivo<small>Canvas integrado en página</small>',

      // Meta
      '.pf-meta div:nth-child(1) dd': 'Game Design, Arquitectura de Web Audio y Dirección Creativa',
      '.pf-meta div:nth-child(2) dd': 'Advergame Móvil · Web Audio API y Canvas a 60 fps',
      '.pf-meta div:nth-child(3) dd': 'Juego completo en navegador, compensación Bluetooth, flujo de premios y banda sonora 16-bits',
      '.pf-meta div:nth-child(4) dd': 'Web Audio API · Canvas HTML5 · Screen Wake Lock API · Strudel · ChatGPT',

      // Links
      '.pf-links a[href="#contexto"]': 'Contexto',
      '.pf-links a[href="#jogo"]': 'El Juego',
      '.pf-links a[href="#arquitetura"]': 'Arquitectura de Audio',
      '.pf-links a[href="#ajustes"]': 'Accesibilidad',
      '.pf-links a[href="#overdrive"]': 'Overdrive',
      '.pf-links a[href="#brinde"]': 'Premios',
      '.pf-links a[href="#trilha"]': 'Banda Sonora',

      // Context
      '#contexto .eyebrow': 'Activación de Marca · CCXP y Netflix',
      '#contexto h2': 'De la espera en la cola al solo de metal en el stand de Stranger Things.',
      '#contexto .lede': 'Diseñado para el espacio del Hellfire Club en la CCXP, el advergame resolvió el aburrimiento en colas de más de 1 hora: los asistentes escaneaban el código QR, abrían el juego en menos de 2 segundos sin descargas y, logrando Rango A o S, retiraban púas de guitarra metálicas y chapas coleccionables.',
      '#contexto .callout': '<b>Briefing de Activación:</b> Crear un advergame móvil de ritmo con estética ochentera en 16-bits, sin fricción de instalación, capaz de retener al público en la fila y premiar la habilidad.',

      // The Game
      '#jogo .eyebrow': '<b>01</b> · El Juego',
      '#jogo h2': 'Cinco pistas, una línea de impacto, ningún lugar para esconderse.',
      '#jogo .lede': 'Las notas descienden por el mástil y deben tocarse justo sobre la línea iluminada. Las notas largas requieren mantener la pulsación; en modo Leyenda, acordes simultáneos exigen destreza multitáctil.',
      '#jogo .hg-kicker': 'Versión jugable',
      '#jogo .hg-cta.hg-go': 'Tocar Solo',
      '#jogo .hg-link.hg-demo': 'Ver Demostración',
      '#jogo .hg-modes button[data-mode="easy"]': 'Aprendiz',
      '#jogo .hg-modes button[data-mode="normal"]': 'Guitarrista',
      '#jogo .hg-modes button[data-mode="expert"]': 'Leyenda',
      '#jogo figcaption': '<b>Capturas reales del juego original</b> en modo demostración automática.',

      // Architecture
      '#arquitetura .eyebrow': '<b>02</b> · Arquitectura Técnica y Motor de Ritmo',
      '#arquitetura h2': 'AudioContext Clock frente a requestAnimationFrame: Sincronía al Milisegundo.',
      '#arquitetura .lede': 'Cómo el motor de Hellfire Overdrive logró sincronía de audio absoluta sin desajustes temporales, incorporando calibración para auriculares inalámbricos.',
      '#arquitetura .ho-arch-card:nth-child(1) h3': 'Reloj Maestro por Hardware',
      '#arquitetura .ho-arch-card:nth-child(1) p': 'En lugar de depender de temporizadores JavaScript que sufren desajustes de hasta 50 ms por la main thread, el motor se sincroniza con <code>AudioContext.currentTime</code>.',
      '#arquitetura .ho-arch-card:nth-child(2) h3': 'Compensación Bluetooth (−200 ms a +300 ms)',
      '#arquitetura .ho-arch-card:nth-child(2) p': 'Los auriculares inalámbricos añaden entre 120 ms y 240 ms de retraso de transmisión acústica. El juego ajusta la velocidad visual de caída para sincronizar el impacto exacto.',
      '#arquitetura .ho-arch-card:nth-child(3) h3': 'Ventanas de Juicio Precisas',
      '#arquitetura .ho-arch-card:nth-child(3) p': 'La precisión se mide comparando la marca de tiempo de la nota con el reloj de juego activo.',
      '#arquitetura .ho-arch-card:nth-child(4) h3': 'APIs Nativas para Móviles',
      '#arquitetura .ho-arch-card:nth-child(4) p': 'Optimización con Screen Wake Lock para impedir que la pantalla se apague y vibración háptica al pulsar.',

      // Accessibility
      '#ajustes .eyebrow': '<b>03</b> · Diseño Inclusivo',
      '#ajustes h2': 'Colores con numeración, sonido con calibración.',
      '#ajustes .lede': 'En un evento masivo, cualquiera debe poder jugar. Las pistas combinan colores y números del 1 al 5, el retardo se calibra y los efectos visuales pueden atenuarse.',
      '#ajustes .ho-two:nth-of-type(2) .pf-card:nth-child(1) h3': 'Más Allá del Color',
      '#ajustes .ho-two:nth-of-type(2) .pf-card:nth-child(2) h3': 'Sin Frustración en Fallos',

      // Overdrive
      '#overdrive .eyebrow': '<b>04</b> · Mecánica Overdrive',
      '#overdrive h2': 'Los combos aumentan puntos y el Overdrive lo duplica todo.',
      '#overdrive .lede': 'Encadenar notas eleva el multiplicador. La barra de Overdrive se carga con el combo y, al activarse, duplica la puntuación durante 8 segundos.',
      '#overdrive figcaption': '<b>Captura real</b> con multiplicador ×8 activado en Overdrive.',

      // Reward
      '#brinde .eyebrow': '<b>03</b> · Activación y Entrega de Premios',
      '#brinde h2': 'Rango A o S desbloquea el regalo físico en el stand.',
      '#brinde .lede': 'El motor calcula la precisión en tiempo real. Cerrar con Rango A (&ge; 88%) o Rango S (&ge; 97%) genera un código QR criptográfico para canjear regalos en la CCXP.',
      '#brinde figcaption': '<b>Captura de producción y propuesta interactiva.</b> Los códigos verifican la puntuación alcanzada.',

      // AI Direction
      '#ia .eyebrow': '<b>06</b> · Dirección Creativa y Apoyo de IA',
      '#ia h2': 'La IA programó el código; la dirección definió el juego.',
      '#ia .lede': 'El prototipo se aceleró con modelos de IA bajo mi dirección creativa, garantizando la diversión en eventos presenciales.',

      // Soundtrack
      '#trilha .eyebrow': '<b>04</b> · Banda Sonora Original',
      '#trilha .lede': 'Banda sonora en chiptune estilo Super Nintendo compuesta para este proyecto: ritmo galopante en Mi menor con sintetizadores de 16 bits.'
    },

    fr: {
      '.pf-hero .eyebrow': '<b>Projet 14</b> · Game Design & Ingénierie Web Audio · Advergame Mobile',
      '.pf-hero h1': 'Un solo d’une minute : <em>jouez juste et repartez avec le collector.</em>',
      '.pf-hero .lede': 'Advergame mobile conçu pour l’espace expérientiel <em>Stranger Things</em> à la CCXP : jeu de rythme de guitare en pixel art à 132 BPM, 5 pistes et bande-son 16-bits. Atteindre le Rang A ou S débloque un souvenir exclusif sur le stand. Motorisé par la Web Audio API avec compensation de latence Bluetooth.',
      '.ho-note': 'Advergame Mobile & Ingénierie Sonore · Activation CCXP / Netflix · Rétention en File d’Attente & Synchro Web Audio',

      // Hero Actions
      '.ho-btn-play-now strong': 'JOUER DIRECTEMENT DANS LE NAVIGATEUR',
      '.ho-btn-play-now small': 'Version complète officielle · 100% web (sans installation)',
      '.ho-play .txt': 'Écouter le Morceau 16-bits<small>Marionnette · Chiptune SNES 32kHz</small>',
      '.ho-play-sub .txt': 'Tester le Scénario Jouable<small>Canvas interactif sur la page</small>',

      // Meta
      '.pf-meta div:nth-child(1) dd': 'Game Design, Architecture Web Audio et Direction Créative',
      '.pf-meta div:nth-child(2) dd': 'Advergame Mobile · Web Audio API & Canvas 60 fps',
      '.pf-meta div:nth-child(3) dd': 'Jeu complet, calibrateur Bluetooth, parcours de dotation et bande-son 16-bits',
      '.pf-meta div:nth-child(4) dd': 'Web Audio API · Canvas HTML5 · Screen Wake Lock API · Strudel · ChatGPT',

      // Links
      '.pf-links a[href="#contexto"]': 'Contexte',
      '.pf-links a[href="#jogo"]': 'Le Jeu',
      '.pf-links a[href="#arquitetura"]': 'Architecture Audio',
      '.pf-links a[href="#ajustes"]': 'Accessibilité',
      '.pf-links a[href="#overdrive"]': 'Overdrive',
      '.pf-links a[href="#brinde"]': 'Dotations',
      '.pf-links a[href="#trilha"]': 'Bande-Son',

      // Context
      '#contexto .eyebrow': 'Activation de Marque · CCXP & Netflix',
      '#contexto h2': 'De la file d’attente au solo de heavy metal sur le stand Stranger Things.',
      '#contexto .lede': 'Conçu pour le Hellfire Club à la CCXP, l’advergame a transformé l’attente des visiteurs : scan d’un QR code, chargement instantané sans téléchargement d’application, et pour les joueurs atteignant le Rang A ou S, remise de médiators métalliques et badges exclusifs.',
      '#contexto .callout': '<b>Objectif de l’Activation :</b> Créer un jeu de rythme rétro 16-bits engageant et immédiat, capable d’occuper le public en file d’attente et de susciter l’émulation autour d’une récompense tangible.',

      // The Game
      '#jogo .eyebrow': '<b>01</b> · Le Jeu',
      '#jogo h2': 'Cinq frettes, une ligne d’impact, aucune échappatoire.',
      '#jogo .lede': 'Les notes défilent sur le manche de guitare jusqu’à la barre d’impact. Les notes longues demandent un appui prolongé ; en mode Légende, les accords imposent une dextérité multi-doigts.',
      '#jogo .hg-kicker': 'Version jouable',
      '#jogo .hg-cta.hg-go': 'Lancer le Solo',
      '#jogo .hg-link.hg-demo': 'Voir la Démonstration',
      '#jogo .hg-modes button[data-mode="easy"]': 'Apprenti',
      '#jogo .hg-modes button[data-mode="normal"]': 'Guitariste',
      '#jogo .hg-modes button[data-mode="expert"]': 'Légende',
      '#jogo figcaption': '<b>Captures d’écran authentiques</b> en mode démonstration autonome.',

      // Architecture
      '#arquitetura .eyebrow': '<b>02</b> · Architecture Technique & Moteur de Rythme',
      '#arquitetura h2': 'AudioContext Clock vs requestAnimationFrame : Synchro Audio à la Milliseconde.',
      '#arquitetura .lede': 'Pourquoi les jeux de rythme web dérivent souvent et comment Hellfire Overdrive garantit une synchronisation parfaite avec compensation de latence pour écouteurs sans fil.',
      '#arquitetura .ho-arch-card:nth-child(1) h3': 'Horloge Maîtresse Matérielle',
      '#arquitetura .ho-arch-card:nth-child(1) p': 'Au lieu de se fier aux minuteurs JavaScript instables, le moteur synchronise tout le déroulé sur <code>AudioContext.currentTime</code>.',
      '#arquitetura .ho-arch-card:nth-child(2) h3': 'Décalage Bluetooth (−200 ms à +300 ms)',
      '#arquitetura .ho-arch-card:nth-child(2) p': 'Les écouteurs sans fil induisent 120 à 240 ms de latence de transmission. Le jeu recalibre le défilement pour synchroniser l’impact visuel avec l’oreille.',
      '#arquitetura .ho-arch-card:nth-child(3) h3': 'Fenêtres de Jugement Chirurgicales',
      '#arquitetura .ho-arch-card:nth-child(3) p': 'La précision est analysée en comparant l’horodatage de la note à l’horloge de jeu en cours.',
      '#arquitetura .ho-arch-card:nth-child(4) h3': 'APIs Mobiles Natives',
      '#arquitetura .ho-arch-card:nth-child(4) p': 'Maintien de l’écran allumé via Screen Wake Lock et retours haptiques via Web Vibration.',

      // Accessibility
      '#ajustes .eyebrow': '<b>03</b> · Accessibilité & Ergonomie',
      '#ajustes h2': 'Couleurs associées aux chiffres, audio ajustable.',
      '#ajustes .lede': 'Lors d’un salon, tout le monde doit pouvoir jouer. Les pistes associent chiffres et couleurs, le délai audio est réglable et les effets visuels peuvent être allégés.',
      '#ajustes .ho-two:nth-of-type(2) .pf-card:nth-child(1) h3': 'Au-Delà de la Couleur',
      '#ajustes .ho-two:nth-of-type(2) .pf-card:nth-child(2) h3': 'Pédagogie sans Pénalité',

      // Overdrive
      '#overdrive .eyebrow': '<b>04</b> · Système Overdrive',
      '#overdrive h2': 'Les combos multiplient les points, l’Overdrive double la mise.',
      '#overdrive .lede': 'Les enchaînements sans faute augmentent le multiplicateur. La jauge d’Overdrive se remplit au fil des combos et double le score pendant 8 secondes.',
      '#overdrive figcaption': '<b>Capture en direct</b> avec multiplicateur ×8 sous Overdrive.',

      // Reward
      '#brinde .eyebrow': '<b>03</b> · Dotations & Retrait des Cadeaux',
      '#brinde h2': 'Le Rang A ou S débloque les objets collectors au stand.',
      '#brinde .lede': 'Le moteur calcule le taux de réussite en temps réel. Finir au Rang A (&ge; 88 %) ou Rang S (&ge; 97 %) génère un bon sécurisé avec QR code pour récupérer le lot au salon.',
      '#brinde figcaption': '<b>Interface de résultat et simulation.</b> Les QR codes authentifient la performance réalisée.',

      // AI Direction
      '#ia .eyebrow': '<b>06</b> · Direction Artistique & Assistance IA',
      '#ia h2': 'L’IA a accéléré le code ; la direction humaine a forgé le jeu.',
      '#ia .lede': 'Le prototype a été conçu avec l’assistance de ChatGPT sous ma supervision créative pour répondre précisément aux contraintes d’une file d’attente.',

      // Soundtrack
      '#trilha .eyebrow': '<b>04</b> · Bande-Son Originale',
      '#trilha .lede': 'Morceau chiptune Super Nintendo composé pour cette étude de cas : riff heavy metal en Mi mineur avec sonorités 16-bits authentiques.'
    }
  };

  if (window.PORTFOLIO_I18N && window.PORTFOLIO_I18N.registerCase) {
    window.PORTFOLIO_I18N.registerCase(CASE_SLUG, translations);
  } else {
    window.PORTFOLIO_CASES_I18N = window.PORTFOLIO_CASES_I18N || {};
    window.PORTFOLIO_CASES_I18N[CASE_SLUG] = translations;
  }
})();

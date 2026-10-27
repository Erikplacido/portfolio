/* ==========================================================================
   Translations for Case 10: Caju · Ativação do cartão
   Supported: en (English), es (Español), fr (Français)
   ========================================================================== */
(function(){
  'use strict';

  var CASE_SLUG = 'caju-cartao';

  var translations = {
    en: {
      '.pf-hero .eyebrow': '<b>Case 10</b> · Product Design · Fintech & Benefits · Mobile UX',
      '.pf-hero h1': 'From envelope to first purchase, <em>without waiting ten days.</em>',
      '.pf-hero .lede': 'Physical benefits card activation flow in three screens: identifying the card via code, NFC or QR, creating the password with rules visible from the first digit, and adding directly to digital wallets. With functional React prototype.',
      '.cj-note': 'Product Study & UI Engineering · Reducing time-to-first-purchase and preventing support tickets',
      
      // Fact Sheet
      '.pf-meta div:nth-child(1) dd': 'UI Design, Motion, and Frontend Engineering',
      '.pf-meta div:nth-child(2) dd': 'Executive Business Case & UI Engineering · Mobile 390 × 844',
      '.pf-meta div:nth-child(3) dd': '3 screens, 5 edge cases with microcopy, 8 motion specs, tokens, and React prototype',
      '.pf-meta div:nth-child(4) dd': 'Figma · Antigravity IDE · React · TypeScript · Motion',

      // Contexto
      '#contexto .eyebrow': 'The problem',
      '#contexto h2': 'The card arrives, but the first purchase is delayed.',
      '#contexto .lede': 'The starting point is a public metric: about 38% of employees who received their physical benefits card took more than 10 days to use it for the first time, and questions about passwords and CVV turned into support tickets.',
      '#contexto .callout': '<b>Brief:</b> reduce time-to-first-transaction through a secure, low-friction flow that leaves the card ready to use directly on the smartphone.',

      // Abordagem
      '#abordagem .eyebrow': '<b>01</b> · Approach',
      '#abordagem h2': 'Three ways to say "it’s my card", because cameras and chips fail.',
      '#abordagem .lede': 'I prototyped two approaches. The first relied solely on the envelope QR code. The second combines a 4-digit code, NFC tap, and QR code, which was chosen: when one path fails, the other two remain on the same screen.',
      '#abordagem .cj-two .pf-card:nth-child(1) .tag': 'Approach A',
      '#abordagem .cj-two .pf-card:nth-child(1) h3': 'QR Code Only',
      '#abordagem .cj-two .pf-card:nth-child(1) p': '100% camera activation by scanning the envelope code.',
      '#abordagem .cj-two .pf-card:nth-child(1) ul': '<li>Less typing when everything works</li><li>Stops under low light, crumpled envelope, or camera denied</li><li>Dead-end when the envelope is lost</li>',
      '#abordagem .cj-two .pf-card:nth-child(2) .tag': '<b>Selected</b> · Approach B',
      '#abordagem .cj-two .pf-card:nth-child(2) h3': 'Code + NFC + QR',
      '#abordagem .cj-two .pf-card:nth-child(2) p': 'All three paths side by side, without switching screens.',
      '#abordagem .cj-two .pf-card:nth-child(2) ul': '<li>NFC tap resolves in a single physical gesture</li><li>4-digit code printed on the back as a fallback</li><li>QR remains available for those who prefer the camera</li>',

      // Telas
      '#telas .eyebrow': '<b>02</b> · Three screens',
      '#telas h2': 'One task per screen, and the progress bar shows what’s left.',
      '#telas .lede': 'Two functional screens and one expressive screen. The top progress bar advances in thirds to clearly communicate remaining effort.',
      '#telas figcaption': '<b>Screens exported from the code prototype.</b> From left to right: identification, active card with wallet shortcut, and one of five edge cases (preventive freeze).',
      '#telas .cj-steps .pf-card:nth-child(1) .tag': 'Screen 01 · Functional',
      '#telas .cj-steps .pf-card:nth-child(1) h3': 'Identification',
      '#telas .cj-steps .pf-card:nth-child(1) p': 'The 4 digits from the back, with NFC and QR as alternatives.',
      '#telas .cj-steps .pf-card:nth-child(1) ul': '<li>Four isolated input boxes with pulsing cursor</li><li>Instant NFC tap button</li><li>"Scan envelope QR" with device camera</li>',
      '#telas .cj-steps .pf-card:nth-child(2) .tag': 'Screen 02 · Security',
      '#telas .cj-steps .pf-card:nth-child(2) h3': 'PIN Creation',
      '#telas .cj-steps .pf-card:nth-child(2) p': '4-digit PIN with validation rules checked on every keystroke.',
      '#telas .cj-steps .pf-card:nth-child(2) ul': '<li>Three rules turning from gray to green</li><li>Blocks sequences, birthdates, and repetitions</li><li>Dedicated custom keypad</li>',
      '#telas .cj-steps .pf-card:nth-child(3) .tag': 'Screen 03 · Expressive',
      '#telas .cj-steps .pf-card:nth-child(3) h3': 'Card Activated',
      '#telas .cj-steps .pf-card:nth-child(3) p': 'Activation becomes a celebratory moment, ready to spend.',
      '#telas .cj-steps .pf-card:nth-child(3) ul': '<li>3D rotation from inactive gray to vibrant card</li><li>Apple Wallet or Google Pay based on OS</li><li>Handoff motion specs</li>',

      // Senha
      '#senha .eyebrow': '<b>03</b> · Security & PIN',
      '#senha h2': 'The rule appears before the error.',
      '#senha .lede': 'All three rules remain visible from the first digit and change color as the user types. When an invalid PIN is entered, dots shake and the message explains which rule was violated, without exposing the number.',
      '#senha figcaption': '<b>Interactive recreation of Screen 02,</b> with the exact validation logic and error messages from the React prototype. Dot shaking follows exact spec curve (320 ms).',

      // Motion
      '#motion .eyebrow': '<b>04</b> · Motion',
      '#motion h2': 'The card illuminates as it becomes active.',
      '#motion .lede': 'On Screen 03, the gray card flips and lights up in brand colors, and the "Active Card" badge appears as the rotation completes. Every animation in the flow has documented curves and timing.',
      '#motion .cj-ctrl button': 'Activate card',
      '#motion figcaption': '<b>The 8 motion specs of the prototype,</b> with exact cubic-bezier curves and millisecond timing for frictionless handoff.',

      // Falhas / Edge cases
      '#falhas .eyebrow': '<b>05</b> · Edge cases',
      '#falhas h2': 'Five failure modes, five clear messages explaining what to do.',
      '#falhas .lede': 'Every error features a title identifying the root cause, reassuring explanation copy, and two clear resolution actions. All can be triggered in the prototype panel.',

      // Prototipo
      '#prototipo .eyebrow': '<b>05.1</b> · The Living Interactive Prototype',
      '#prototipo h2': 'Experience the entire flow.',
      '#prototipo .lede': 'The React prototype runs directly inside this page on demand. On mobile devices, it opens seamlessly in a dedicated viewport.',
      '#prototipo .go span': '▶ Load interactive prototype',
      '#prototipo .cj-open': 'Open prototype in full screen ↗',
      '#prototipo figcaption': '<b>Functional React prototype.</b> Interactive simulation with semantic token architecture, state machine, and PCI-DSS / BACEN regulatory compliance.',

      // Medir / Business Case
      '#medir .eyebrow': '<b>06</b> · Business Case & ROI',
      '#medir h2': 'Projected impact on CAC, LTV, and Engineering Handoff.',
      '#medir .lede': 'How reducing activation latency cuts onboarding churn by ~18% and accelerates interchange revenue (MDR). An architecture designed to bridge high conversion with frictionless frontend delivery.',
      '#medir .cj-kpis .cj-kpi-card:nth-child(1) .cj-kpi-label': 'Onboarding Churn',
      '#medir .cj-kpis .cj-kpi-card:nth-child(1) .cj-kpi-desc': 'Drastic Time-to-Value (TTV) reduction from 10 days to under 60 seconds via Apple Wallet / Google Pay shortcut on Screen 03. Employees start transacting before unboxing physical cards, retaining ~18% more active users in the first benefits cycle.',
      '#medir .cj-kpis .cj-kpi-card:nth-child(2) .cj-kpi-label': 'LTV & TPV Acceleration',
      '#medir .cj-kpis .cj-kpi-card:nth-child(2) .cj-kpi-desc': 'Early activation accelerates Total Payment Volume (TPV) and card interchange fees in the very first fortnight. Minimizes idle capital periods and optimizes corporate CAC payback by up to 1.4 months.',
      '#medir .cj-kpis .cj-kpi-card:nth-child(3) .cj-kpi-label': 'Tier 1 Support Tickets',
      '#medir .cj-kpis .cj-kpi-card:nth-child(3) .cj-kpi-desc': 'Synchronous reactive PIN validation (4 explicit rules, immediate blocking of sequences and dates, plus haptic error shaker) prevents 1 in every 3 support tickets opened for rejected PINs or POS terminal lockouts.',
      '#medir .cj-kpis .cj-kpi-card:nth-child(4) .cj-kpi-label': 'Flow Completion Rate',
      '#medir .cj-kpis .cj-kpi-card:nth-child(4) .cj-kpi-desc': 'Three redundant identification methods combined on the same screen (manual 4 digits + instant NFC tap + envelope QR scanner) eliminate drop-offs caused by hardware anomalies, blocked cameras, or misplaced mailers.',

      // Handoff
      '#medir .cj-fe-head .eyebrow': '<b>Handoff</b> · Frontend Engineering',
      '#medir .cj-fe-head h2': 'Production-ready design tokens, state machine, and zero rework.',
      '#medir .cj-fe-head .lede': 'Architecture built for direct consumption by mobile and web engineering teams, with semantic rules, WCAG AAA accessibility, and steady 60 fps rendering.'
    },

    es: {
      '.pf-hero .eyebrow': '<b>Caso 10</b> · Product Design · Fintech y Beneficios · UX Móvil',
      '.pf-hero h1': 'Del sobre a la primera compra, <em>sin esperar diez días.</em>',
      '.pf-hero .lede': 'Flujo de activación de tarjeta física de beneficios en tres pantallas: identificación por código, NFC o QR, creación de contraseña con reglas visibles desde el primer dígito y alta directa en billeteras digitales. Con prototipo interactivo en React.',
      '.cj-note': 'Estudio de Producto e Ingeniería de UI · Reducción del tiempo hasta la primera compra y prevención de tickets de soporte',
      
      // Fact Sheet
      '.pf-meta div:nth-child(1) dd': 'Diseño UI, Motion y Entrega Frontend',
      '.pf-meta div:nth-child(2) dd': 'Business Case Ejecutivo e Ingeniería UI · Móvil 390 × 844',
      '.pf-meta div:nth-child(3) dd': '3 pantallas, 5 edge cases con microcopy, 8 especificaciones de motion, tokens y prototipo React',
      '.pf-meta div:nth-child(4) dd': 'Figma · Antigravity IDE · React · TypeScript · Motion',

      // Contexto
      '#contexto .eyebrow': 'El problema',
      '#contexto h2': 'La tarjeta llega, pero la primera compra se retrasa.',
      '#contexto .lede': 'El punto de partida es una métrica pública: alrededor del 38% de los colaboradores que recibían su tarjeta física tardaban más de 10 días en usarla por primera vez, y las dudas sobre clave y CVV saturaban el soporte.',
      '#contexto .callout': '<b>Brief:</b> reducir el tiempo hasta la primera transacción mediante un flujo seguro y de baja fricción que deje la tarjeta lista para usar en el teléfono.',

      // Abordagem
      '#abordagem .eyebrow': '<b>01</b> · Enfoque',
      '#abordagem h2': 'Tres formas de validar "es mi tarjeta", porque cámaras y chips fallan.',
      '#abordagem .lede': 'Prototipé dos enfoques. El primero dependía solo del código QR del sobre. El segundo combina código de 4 dígitos, NFC y QR, y fue el elegido: cuando una vía falla, las otras dos siguen activas en la misma pantalla.',
      '#abordagem .cj-two .pf-card:nth-child(1) .tag': 'Enfoque A',
      '#abordagem .cj-two .pf-card:nth-child(1) h3': 'Solo Código QR',
      '#abordagem .cj-two .pf-card:nth-child(1) p': 'Activación 100% mediante cámara leyendo el código del sobre.',
      '#abordagem .cj-two .pf-card:nth-child(1) ul': '<li>Menos tipeo cuando todo sale bien</li><li>Falla con poca luz, sobre arrugado o cámara denegada</li><li>Sin salida si el sobre se extravía</li>',
      '#abordagem .cj-two .pf-card:nth-child(2) .tag': '<b>Elegido</b> · Enfoque B',
      '#abordagem .cj-two .pf-card:nth-child(2) h3': 'Código + NFC + QR',
      '#abordagem .cj-two .pf-card:nth-child(2) p': 'Las tres alternativas en paralelo, sin cambiar de pantalla.',
      '#abordagem .cj-two .pf-card:nth-child(2) ul': '<li>NFC resuelve la verificación en un solo gesto</li><li>Código de 4 dígitos impreso al dorso como respaldo</li><li>QR disponible para quien prefiere la cámara</li>',

      // Telas
      '#telas .eyebrow': '<b>02</b> · Tres pantallas',
      '#telas h2': 'Una tarea por pantalla, y la barra muestra el avance.',
      '#telas .lede': 'Dos pantallas funcionales y una expresiva. La barra de progreso superior avanza en tercios para clarificar el esfuerzo pendiente.',
      '#telas figcaption': '<b>Pantallas exportadas del prototipo en código.</b> De izquierda a derecha: identificación, tarjeta activa con acceso a billetera y uno de los cinco edge cases (bloqueo preventivo).',
      '#telas .cj-steps .pf-card:nth-child(1) .tag': 'Pantalla 01 · Funcional',
      '#telas .cj-steps .pf-card:nth-child(1) h3': 'Identificación',
      '#telas .cj-steps .pf-card:nth-child(1) p': 'Los 4 dígitos del dorso, con NFC y QR como alternativas.',
      '#telas .cj-steps .pf-card:nth-child(1) ul': '<li>Cuatro casillas aisladas con cursor titilante</li><li>Botón de aproximación por NFC</li><li>"Escanear QR del sobre" con la cámara</li>',
      '#telas .cj-steps .pf-card:nth-child(2) .tag': 'Pantalla 02 · Seguridad',
      '#telas .cj-steps .pf-card:nth-child(2) h3': 'Creación de clave PIN',
      '#telas .cj-steps .pf-card:nth-child(2) p': 'Clave de 4 dígitos con validación en tiempo real a cada toque.',
      '#telas .cj-steps .pf-card:nth-child(2) ul': '<li>Tres reglas que pasan de gris a verde</li><li>Bloquea secuencias, fechas de nacimiento y repeticiones</li><li>Teclado numérico táctil propio</li>',
      '#telas .cj-steps .pf-card:nth-child(3) .tag': 'Pantalla 03 · Expresiva',
      '#telas .cj-steps .pf-card:nth-child(3) h3': 'Tarjeta activa',
      '#telas .cj-steps .pf-card:nth-child(3) p': 'La activación se transforma en un hito celebrado, listo para usar.',
      '#telas .cj-steps .pf-card:nth-child(3) ul': '<li>Giro 3D de tarjeta inactiva a tarjeta encendida</li><li>Apple Wallet o Google Pay según el sistema</li><li>Especificaciones de motion para handoff</li>',

      // Senha
      '#senha .eyebrow': '<b>03</b> · Contraseña y PIN',
      '#senha h2': 'La regla se muestra antes del error.',
      '#senha .lede': 'Las tres reglas se mantienen visibles desde el primer dígito y cambian de color mientras el usuario escribe. Si se introduce un PIN no permitido, los puntos vibran y el mensaje detalla la regla incumplida.',
      '#senha figcaption': '<b>Recreación interactiva de la Pantalla 02,</b> con la misma lógica de validación y mensajes de error del prototipo React (vibración de 320 ms).',

      // Motion
      '#motion .eyebrow': '<b>04</b> · Motion',
      '#motion h2': 'La tarjeta se ilumina al entrar en vigencia.',
      '#motion .lede': 'En la Pantalla 03, la tarjeta gris gira e ilumina con el color de la marca, y el sello "Tarjeta Activa" aparece al culminar la rotación.',
      '#motion .cj-ctrl button': 'Activar tarjeta',
      '#motion figcaption': '<b>Las 8 especificaciones de motion del prototipo,</b> con curvas cubic-bezier y tiempos exactos en milisegundos.',

      // Falhas
      '#falhas .eyebrow': '<b>05</b> · Casos límite (Edge Cases)',
      '#falhas h2': 'Cinco contingencias, cinco mensajes claros que indican qué hacer.',
      '#falhas .lede': 'Cada error cuenta con un título que identifica el problema, texto tranquilizador y dos opciones de resolución accesibles desde el panel del prototipo.',

      // Prototipo
      '#prototipo .eyebrow': '<b>05.1</b> · El Prototipo Interactivo Vivo',
      '#prototipo h2': 'Experimente el flujo completo.',
      '#prototipo .lede': 'El prototipo en React corre directamente en esta página bajo demanda. En dispositivos móviles se abre en una pestaña adaptada.',
      '#prototipo .go span': '▶ Cargar prototipo interactivo',
      '#prototipo .cj-open': 'Abrir prototipo a pantalla completa ↗',
      '#prototipo figcaption': '<b>Prototipo funcional en React.</b> Simulación interactiva con tokens semánticos, máquina de estados y cumplimiento de normativas BACEN y PCI-DSS.',

      // Medir
      '#medir .eyebrow': '<b>06</b> · Business Case y Retorno (ROI)',
      '#medir h2': 'Impacto proyectado en CAC, LTV y Entrega a Ingeniería.',
      '#medir .lede': 'Cómo reducir la latencia de activación disminuye el churn de onboarding en ~18% y acelera los ingresos por tasa de intercambio (MDR).',
      '#medir .cj-kpis .cj-kpi-card:nth-child(1) .cj-kpi-label': 'Churn de Onboarding',
      '#medir .cj-kpis .cj-kpi-card:nth-child(1) .cj-kpi-desc': 'Reducción drástica del Time-to-Value (TTV) de 10 días a menos de 60 segundos con acceso directo a Apple Wallet / Google Pay. El colaborador compra antes de abrir la billetera física, reteniendo ~18% más usuarios activos en el primer mes.',
      '#medir .cj-kpis .cj-kpi-card:nth-child(2) .cj-kpi-label': 'Anticipación de LTV y TPV',
      '#medir .cj-kpis .cj-kpi-card:nth-child(2) .cj-kpi-desc': 'La activación inmediata acelera el volumen total transaccionado (TPV) e ingresos de interchange fees en la primera quincena, optimizando el payback del CAC en hasta 1,4 meses.',
      '#medir .cj-kpis .cj-kpi-card:nth-child(3) .cj-kpi-label': 'Tickets de Soporte Nivel 1',
      '#medir .cj-kpis .cj-kpi-card:nth-child(3) .cj-kpi-desc': 'Validación síncrona reactiva de clave PIN (reglas explícitas, bloqueo previo de fechas y secuencias, shaker háptico) elimina 1 de cada 3 tickets por PIN rechazado en terminales de cobro.',
      '#medir .cj-kpis .cj-kpi-card:nth-child(4) .cj-kpi-label': 'Tasa de Finalización de Flujo',
      '#medir .cj-kpis .cj-kpi-card:nth-child(4) .cj-kpi-desc': 'Tres métodos redundantes de verificación en la misma pantalla (4 dígitos + NFC instantáneo + escaneo QR) eliminan el abandono por fallas de cámara o extravío del sobre postal.',

      // Handoff
      '#medir .cj-fe-head .eyebrow': '<b>Handoff</b> · Ingeniería Frontend',
      '#medir .cj-fe-head h2': 'Tokens de diseño listos, máquina de estados y cero retrabajo.',
      '#medir .cj-fe-head .lede': 'Arquitectura orientada a la implementación directa en apps nativas y web, con reglas semánticas, accesibilidad WCAG AAA y 60 fps constantes.'
    },

    fr: {
      '.pf-hero .eyebrow': '<b>Projet 10</b> · Product Design · Fintech & Avantages Salariés · UX Mobile',
      '.pf-hero h1': 'De l’enveloppe au premier achat, <em>sans attendre dix jours.</em>',
      '.pf-hero .lede': 'Parcours d’activation de la carte physique d’avantages en trois étapes : identification par code, NFC ou QR, création du code PIN avec règles affichées en direct, et ajout immédiat aux portefeuilles numériques. Avec prototype fonctionnel React.',
      '.cj-note': 'Étude Produit & Ingénierie UI · Réduire le délai avant le premier achat et prévenir les tickets support',
      
      // Fact Sheet
      '.pf-meta div:nth-child(1) dd': 'UI Design, Motion et Handoff Frontend',
      '.pf-meta div:nth-child(2) dd': 'Executive Business Case & Ingénierie UI · Mobile 390 × 844',
      '.pf-meta div:nth-child(3) dd': '3 écrans, 5 cas d’erreur avec microcopie, 8 specs de motion, tokens et prototype React',
      '.pf-meta div:nth-child(4) dd': 'Figma · Antigravity IDE · React · TypeScript · Motion',

      // Contexto
      '#contexto .eyebrow': 'Le problème',
      '#contexto h2': 'La carte arrive, mais le premier achat tarde trop.',
      '#contexto .lede': 'Le point de départ est un indicateur public : environ 38% des collaborateurs recevant leur carte physique d’avantages mettaient plus de 10 jours à l’utiliser, et les doutes sur le PIN et le CVV saturaient le support client.',
      '#contexto .callout': '<b>Brief :</b> réduire le délai jusqu’à la première transaction grâce à un parcours fluide et sécurisé, rendant la carte immédiatement utilisable sur mobile.',

      // Abordagem
      '#abordagem .eyebrow': '<b>01</b> · Démarche',
      '#abordagem h2': 'Trois méthodes d’identification, car caméras et puces peuvent échouer.',
      '#abordagem .lede': 'J’ai prototypé deux approches. La première reposait uniquement sur le QR code de l’enveloppe. La seconde combine code à 4 chiffres, sans contact NFC et QR code : si un canal échoue, les deux autres restent accessibles sur le même écran.',
      '#abordagem .cj-two .pf-card:nth-child(1) .tag': 'Approche A',
      '#abordagem .cj-two .pf-card:nth-child(1) h3': 'QR Code Uniquement',
      '#abordagem .cj-two .pf-card:nth-child(1) p': 'Activation intégrale par caméra en scannant l’enveloppe.',
      '#abordagem .cj-two .pf-card:nth-child(1) ul': '<li>Moins de saisie lorsque tout fonctionne</li><li>Bloqué par faible luminosité, enveloppe froissée ou caméra refusée</li><li>Impasse si l’enveloppe est égarée</li>',
      '#abordagem .cj-two .pf-card:nth-child(2) .tag': '<b>Retenue</b> · Approche B',
      '#abordagem .cj-two .pf-card:nth-child(2) h3': 'Code + NFC + QR',
      '#abordagem .cj-two .pf-card:nth-child(2) p': 'Les trois options côte à côte, sans changer d’écran.',
      '#abordagem .cj-two .pf-card:nth-child(2) ul': '<li>L’approche NFC valide l’étape en un seul geste</li><li>Code à 4 chiffres imprimé au dos en secours</li><li>QR code disponible pour ceux qui préfèrent la caméra</li>',

      // Telas
      '#telas .eyebrow': '<b>02</b> · Trois écrans',
      '#telas h2': 'Une tâche par écran, et la barre indique la progression.',
      '#telas .lede': 'Deux écrans fonctionnels et un écran expressif. La barre supérieure progresse par tiers pour donner une visibilité claire sur l’effort restant.',
      '#telas figcaption': '<b>Écrans issus du prototype en code.</b> De gauche à droite : identification, carte activée avec raccourci portefeuille, et l’un des cinq cas d’erreur (blocage préventif).',
      '#telas .cj-steps .pf-card:nth-child(1) .tag': 'Écran 01 · Fonctionnel',
      '#telas .cj-steps .pf-card:nth-child(1) h3': 'Identification',
      '#telas .cj-steps .pf-card:nth-child(1) p': 'Les 4 chiffres du dos, avec NFC et QR code en alternative.',
      '#telas .cj-steps .pf-card:nth-child(1) ul': '<li>Quatre champs isolés avec curseur dynamique</li><li>Bouton de détection sans contact NFC</li><li>Option « Scanner le QR » via caméra</li>',
      '#telas .cj-steps .pf-card:nth-child(2) .tag': 'Écran 02 · Sécurité',
      '#telas .cj-steps .pf-card:nth-child(2) h3': 'Création du code PIN',
      '#telas .cj-steps .pf-card:nth-child(2) p': 'Code PIN à 4 chiffres validé en direct à chaque frappe.',
      '#telas .cj-steps .pf-card:nth-child(2) ul': '<li>Trois règles passant du gris au vert</li><li>Bloque suites logiques, dates de naissance et répétitions</li><li>Clavier numérique ergonomique sur mesure</li>',
      '#telas .cj-steps .pf-card:nth-child(3) .tag': 'Écran 03 · Expressif',
      '#telas .cj-steps .pf-card:nth-child(3) h3': 'Carte activée',
      '#telas .cj-steps .pf-card:nth-child(3) p': 'L’activation devient un moment valorisant, prêt à payer.',
      '#telas .cj-steps .pf-card:nth-child(3) ul': '<li>Rotation 3D de la carte grise vers la carte active</li><li>Ajout Apple Wallet ou Google Pay selon l’appareil</li><li>Spécifications motion prêtes pour l’intégration</li>',

      // Senha
      '#senha .eyebrow': '<b>03</b> · Code PIN & Sécurité',
      '#senha h2': 'La règle s’affiche avant l’erreur.',
      '#senha .lede': 'Les trois règles restent affichées dès le premier chiffre et changent d’état pendant la saisie. En cas d’erreur, les puces oscillent et le message précise la règle non respectée.',
      '#senha figcaption': '<b>Recréation interactive de l’Écran 02,</b> avec la logique de validation et les retours d’erreur réels du prototype React (oscillation 320 ms).',

      // Motion
      '#motion .eyebrow': '<b>04</b> · Motion Design',
      '#motion h2': 'La carte s’illumine dès qu’elle est valide.',
      '#motion .lede': 'Sur l’Écran 03, la carte pivote et prend les couleurs de la marque, tandis que le badge « Carte Active » surgit à la fin de la rotation.',
      '#motion .cj-ctrl button': 'Activer la carte',
      '#motion figcaption': '<b>Les 8 spécifications de motion du prototype,</b> avec courbes cubic-bezier et minutages exacts.',

      // Falhas
      '#falhas .eyebrow': '<b>05</b> · Cas limites (Edge cases)',
      '#falhas h2': 'Cinq dysfonctionnements, cinq messages explicites.',
      '#falhas .lede': 'Chaque incident présente un intitulé clair, une formulation rassurante et deux solutions de déblocage testables dans le panneau du prototype.',

      // Prototipo
      '#prototipo .eyebrow': '<b>05.1</b> · The Living Interactive Prototype',
      '#prototipo h2': 'Testez l’intégralité du parcours.',
      '#prototipo .lede': 'Le prototype React s’exécute directement sur cette page à la demande. Sur mobile, il s’ouvre dans un onglet dédié.',
      '#prototipo .go span': '▶ Charger le prototype interactif',
      '#prototipo .cj-open': 'Ouvrir le prototype en plein écran ↗',
      '#prototipo figcaption': '<b>Prototype fonctionnel React.</b> Simulation interactive avec tokens sémantiques, machine à états et conformité réglementaire bancaire.',

      // Medir
      '#medir .eyebrow': '<b>06</b> · Business Case & ROI',
      '#medir h2': 'Impact projeté sur le CAC, le LTV et le Handoff Ingénierie.',
      '#medir .lede': 'Comment réduire le délai d’activation diminue l’attrition (churn) de ~18% et anticipe les revenus de commissions d’interchange (MDR).',
      '#medir .cj-kpis .cj-kpi-card:nth-child(1) .cj-kpi-label': 'Churn d’Onboarding',
      '#medir .cj-kpis .cj-kpi-card:nth-child(1) .cj-kpi-desc': 'Réduction drastique du Time-to-Value (TTV) de 10 jours à moins de 60 secondes grâce à l’ajout immédiat dans Apple Wallet / Google Pay. L’utilisateur dépense avant même de déballer la carte physique, fidélisant ~18% d’utilisateurs actifs en plus dès le premier mois.',
      '#medir .cj-kpis .cj-kpi-card:nth-child(2) .cj-kpi-label': 'Anticipation LTV & TPV',
      '#medir .cj-kpis .cj-kpi-card:nth-child(2) .cj-kpi-desc': 'L’activation anticipée accélère le volume d’affaires (TPV) et les commissions d’interchange dès la première quinzaine, raccourcissant le retour sur investissement du CAC entreprise jusqu’à 1,4 mois.',
      '#medir .cj-kpis .cj-kpi-card:nth-child(3) .cj-kpi-label': 'Tickets de Support Niveau 1',
      '#medir .cj-kpis .cj-kpi-card:nth-child(3) .cj-kpi-desc': 'La validation dynamique synchrone du PIN (règles visibles, blocage préventif des suites logiques et dates, retour haptique) supprime 1 ticket sur 3 causé par un rejet de code sur terminal de paiement.',
      '#medir .cj-kpis .cj-kpi-card:nth-child(4) .cj-kpi-label': 'Taux de Complétion du Parcours',
      '#medir .cj-kpis .cj-kpi-card:nth-child(4) .cj-kpi-desc': 'Trois méthodes d’identification redondantes réunies sur un même écran (saisie manuelle + sans contact NFC + scan QR) éliminent les abandons causés par un problème matériel ou la perte du courrier.',

      // Handoff
      '#medir .cj-fe-head .eyebrow': '<b>Handoff</b> · Ingénierie Frontend',
      '#medir .cj-fe-head h2': 'Design tokens prêts pour la production, machine à états et zéro retravail.',
      '#medir .cj-fe-head .lede': 'Architecture conçue pour une adoption directe par les développeurs mobile et web, avec règles sémantiques, accessibilité WCAG AAA et 60 fps constants.'
    }
  };

  // Register in global i18n
  if (window.PORTFOLIO_I18N && window.PORTFOLIO_I18N.registerCase) {
    window.PORTFOLIO_I18N.registerCase(CASE_SLUG, translations);
  } else {
    window.PORTFOLIO_CASES_I18N = window.PORTFOLIO_CASES_I18N || {};
    window.PORTFOLIO_CASES_I18N[CASE_SLUG] = translations;
  }
})();

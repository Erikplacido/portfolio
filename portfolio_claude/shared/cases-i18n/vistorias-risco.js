/* ==========================================================================
   Translations for Case 09: Vistorias de Risco
   Supported: en (English), es (Español), fr (Français)
   ========================================================================== */
(function(){
  'use strict';

  var CASE_SLUG = 'vistorias-risco';

  var translations = {
    en: {
      '.pf-hero .eyebrow': '<b>Case 09</b> · Product Design · UI · Full-Stack Development',
      '.pf-hero h1': 'From questionnaire to report, <em>every hazard tracked in three phases.</em>',
      '.pf-hero .lede': 'Enterprise web platform for commercial property risk assessments in the insurance sector. Surveyors log hazardous points with geotagged photography, monitor corrective action through final verification, and generate Word reports right in the browser. When on-site visits aren’t feasible, clients capture photos remotely via password-protected links. Designed and built end-to-end with AI pair-programming.',

      // Meta
      '.pf-meta div:nth-child(1) dd': 'Product Design, UI, and Full-Stack Development (Front & Back)',
      '.pf-meta div:nth-child(2) dd': 'Live production software · Client under NDA · 2025–2026',
      '.pf-meta div:nth-child(3) dd': 'User journeys, UI, palette, web app, API, and client-side .docx report engine',
      '.pf-meta div:nth-child(4) dd': 'React · TypeScript · Tailwind · Node · MongoDB · Twilio · Cursor & Gemini',

      // Links
      '.pf-links a[href="#contexto"]': 'Context',
      '.pf-links a[href="#jornada"]': 'Journey',
      '.pf-links a[href="#tablet"]': 'Field Tablet',
      '.pf-links a[href="#fases"]': 'Three Phases',
      '.pf-links a[href="#remota"]': 'Remote Survey',
      '.pf-links a[href="#laudo"]': 'Inspection Report',
      '.pf-links a[href="#cores"]': 'Palette',
      '.pf-links a[href="#processo"]': 'Process',
      '.pf-links a[href="#aprendizados"]': 'Trade-offs',

      // Context
      '#contexto .eyebrow': 'The problem',
      '#contexto h2': 'A risk survey is only as credible as its forensic proof.',
      '#contexto .lede': 'For insurance underwriters, every safety recommendation (unblocking fire extinguishers, securing exposed wiring) demands tamper-evident proof: timestamped photos, GPS coordinates, and inspector attribution. Remediations unfold over statutory deadlines, often when surveyors are off-site.',
      '#contexto .callout': '<b>Brief:</b> digitize the end-to-end inspection lifecycle with immutable audit trails, without requiring end-clients to register accounts.',

      // Journey
      '#jornada .eyebrow': '<b>Workflow Architecture</b> · Enterprise UX',
      '#jornada h2': 'The end-to-end journey: from offline factory basements to signed forensic PDFs.',
      '#jornada .lede': 'Property risk surveyors operate in unforgiving physical settings: 4G dead-zones in basements, metal warehouses that obstruct signals, and loading docks under glaring sunlight. The platform was designed around three resilient pillars to safeguard evidential data.',

      // Tablet
      '#tablet .eyebrow': '<b>Field Ergonomics</b> · Sunlight Legibility Mode',
      '#tablet h2': 'Readability in direct midday glare: the industrial yard test.',
      '#tablet .lede': 'Insurance engineers spend hours inspecting outdoor storage yards and factory rooftops under blinding sun and glass reflections. The system uses a high-contrast palette (#202738 with neon accents), oversized touch targets (48×48px), and legible sans-serif typography.',
      '#tablet .vr-tab-controls button span': 'Simulate Direct Sunlight (Open Yard)',
      '#tablet figcaption': '<b>Field condition simulator.</b> Toggle "Simulate Direct Sunlight" to inspect high-glare resilience and the optical contrast boost applied in outdoor daylight.',

      // Three Phases
      '#fases .eyebrow': '<b>01</b> · Three Phases per Risk',
      '#fases h2': 'A risk is never closed with a single photo. It takes three.',
      '#fases .lede': 'Every risk item transitions through Initial Evidence, Treatment 1, and Treatment 2. Each phase records geotagged photos, engineer notes, and compliance status, forming the before-and-after audit trail.',

      // Remote Survey
      '#remota .eyebrow': '<b>02</b> · Delegated Remote Survey',
      '#remota h2': 'When inspectors cannot travel, clients capture and engineers validate.',
      '#remota .lede': 'Delegated surveys generate temporary, password-protected links active for 30 days. Facility managers log in without signing up, document items, mark non-applicable equipment, and request engineer guidance in real time.',
      '#remota figcaption': '<b>Interactive recreation.</b> Mobile client steps on the left; engineer review console on the right, featuring photo evaluations, helpdesk queues, and integrated video calls.',

      // Inspection Report
      '#laudo .eyebrow': '<b>03</b> · Forensic Report Engine',
      '#laudo h2': 'Word reports compiled client-side with before-and-after evidence.',
      '#laudo .lede': 'The Improvement Letter consolidates risk observations ranked by severity with statutory remediations. Formatted Word (.docx) documents assemble locally inside the browser using editable templates, embedding high-res photos without taxing the backend.',
      '#laudo figcaption': '<b>Interactive A4 Improvement Letter.</b> Filter by risk level and expand items to review recommendations. Real catalog terminology.',

      // Palette
      '#cores .eyebrow': '<b>04</b> · Color Architecture',
      '#cores h2': 'Eight scattered dark shades consolidated into three, then just one.',
      '#cores .lede': 'As features evolved, slightly different dark backgrounds proliferated. I mapped the entire spectrum and harmonized it in two passes into a single foundational tone (#202738) unifying screens, cards, modals, and outlines.',

      // Process
      '#processo .eyebrow': '<b>05</b> · Engineering & AI Workflow',
      '#processo h2': 'Documentation authored for humans and AI agents alike.',
      '#processo .lede': 'Developing alongside AI required a modular repository structure that agents could ingest without blowing context windows. The PRD became a directory of focused system specs governed by strict task planning protocols.',

      // Trade-offs
      '#aprendizados .eyebrow': 'Trade-offs & Next Steps',
      '#aprendizados h2': 'Engineering compromises made to ship, and their future refactor cost.',
      '#aprendizados .lede': 'Practical architectural decisions made to meet production deadlines, and how they should evolve in subsequent iterations.'
    },

    es: {
      '.pf-hero .eyebrow': '<b>Caso 09</b> · Product Design · UI · Desarrollo Full-Stack',
      '.pf-hero h1': 'Del cuestionario al informe pericial, <em>cada riesgo controlado en tres fases.</em>',
      '.pf-hero .lede': 'Plataforma web para inspección y suscripción de riesgos en inmuebles comerciales para aseguradoras. El perito documenta anomalías con fotos geolocalizadas, supervisa las correcciones hasta el cierre y emite el informe directamente desde el navegador. Cuando no es posible desplazarse, el cliente fotografía las instalaciones mediante enlaces seguros. Diseñado y programado de principio a fin con apoyo de IA.',

      // Meta
      '.pf-meta div:nth-child(1) dd': 'Product Design, UI y Desarrollo Front y Back-end',
      '.pf-meta div:nth-child(2) dd': 'Software real en producción · Cliente bajo confidencialidad · 2025–2026',
      '.pf-meta div:nth-child(3) dd': 'Flujos, interfaz, tokens de color, app web, API y motor de informes .docx',
      '.pf-meta div:nth-child(4) dd': 'React · TypeScript · Tailwind · Node · MongoDB · Twilio · Cursor y Gemini',

      // Links
      '.pf-links a[href="#contexto"]': 'Contexto',
      '.pf-links a[href="#jornada"]': 'Flujo',
      '.pf-links a[href="#tablet"]': 'Tablet de Campo',
      '.pf-links a[href="#fases"]': 'Tres Fases',
      '.pf-links a[href="#remota"]': 'Inspección Remota',
      '.pf-links a[href="#laudo"]': 'Informe Técnico',
      '.pf-links a[href="#cores"]': 'Paleta',
      '.pf-links a[href="#processo"]': 'Metodología',
      '.pf-links a[href="#aprendizados"]': 'Compromisos',

      // Context
      '#contexto .eyebrow': 'El problema',
      '#contexto h2': 'Una inspección de riesgos solo vale lo que puede demostrar.',
      '#contexto .lede': 'Para las aseguradoras, cada recomendación técnica (despejar extintores, proteger cableado expuesto) exige prueba fehaciente: fotografía nítida, fecha, coordenadas GPS y firma técnica. Las subsanaciones se prolongan en el tiempo, a menudo sin el perito presente.',
      '#contexto .callout': '<b>Brief:</b> digitalizar la totalidad del ciclo de inspección con trazabilidad probatoria y sin exigir registros de cuenta al cliente final.',

      // Journey
      '#jornada .eyebrow': '<b>Arquitectura del Flujo</b> · Enterprise UX',
      '#jornada h2': 'El recorrido completo: de sótanos sin cobertura a informes periciales firmados.',
      '#jornada .lede': 'Los inspectores de riesgos operan en entornos industriales exigentes: sótanos sin señal 4G, naves con cubierta metálica que bloquean datos y muelles de carga bajo sol abrasador. La plataforma fue concebida para blindar las pruebas sin pérdidas de información.',

      // Tablet
      '#tablet .eyebrow': '<b>Ergonomía en Campo</b> · Modo de Alta Luminosidad',
      '#tablet h2': 'Legibilidad bajo sol directo: la prueba de fuego del patio industrial.',
      '#tablet .lede': 'Los ingenieros de riesgos pasan jornadas enteras en campas exteriores y cubiertas industriales lidiando con deslumbramientos. El sistema implementa una paleta de alto contraste (#202738 con acentos neón), botones táctiles de 48×48px y tipografía nítida.',
      '#tablet .vr-tab-controls button span': 'Simular Luz Solar Directa (Patio Abierto)',
      '#tablet figcaption': '<b>Simulador de condiciones reales.</b> Active la simulación solar para evaluar el tratamiento antirreflejo y el realce de contraste en exteriores.',

      // Three Phases
      '#fases .eyebrow': '<b>01</b> · Tres Fases por Riesgo',
      '#fases h2': 'Un riesgo no se da por resuelto con una foto. Exige tres.',
      '#fases .lede': 'Cada anomalía evoluciona a través de Evidencia Inicial, Tratativa 1 y Tratativa 2. Cada etapa almacena fotografías geolocalizadas, comentarios periciales y estado, conformando la comparativa de antes y después.',

      // Remote Survey
      '#remota .eyebrow': '<b>02</b> · Inspección Remota Delegada',
      '#remota h2': 'Cuando el técnico no puede acudir, el cliente fotografía y el técnico valida.',
      '#remota .lede': 'El sistema genera enlaces temporales protegidos por contraseña con 30 días de vigencia. El cliente accede sin registrarse, documenta cada punto solicitado y pide auxilio técnico si surgen dudas.',
      '#remota figcaption': '<b>Recreación interactiva.</b> A la izquierda, la experiencia móvil del cliente; a la derecha, la consola de validación pericial con gestión de incidencias y videollamada.',

      // Inspection Report
      '#laudo .eyebrow': '<b>03</b> · Motor de Informes Técnicos',
      '#laudo h2': 'El informe se genera en el navegador con el antes y después integrado.',
      '#laudo .lede': 'La Carta de Mejoras agrupa las deficiencias por criticidad, fijando plazos legales de subsanación. El documento Word se compila directamente en el cliente mediante plantillas editables, insertando imágenes de alta resolución sin sobrecargar el servidor.',
      '#laudo figcaption': '<b>Carta de Mejoras en A4 interactiva.</b> Filtre por severidad y despliegue cada ítem para consultar recomendaciones normativas reales.',

      // Palette
      '#cores .eyebrow': '<b>04</b> · Paleta Visual',
      '#cores h2': 'Ocho tonalidades oscuras unificadas en tres, y luego en una sola.',
      '#cores .lede': 'La interfaz fue creciendo pantalla a pantalla acumulando fondos oscuros casi idénticos. Depuré la escala cromática en dos pasadas hasta converger en un único color maestro (#202738) para pantallas, modales y bordes.',

      // Process
      '#processo .eyebrow': '<b>05</b> · Metodología e Integración con IA',
      '#processo h2': 'Documentación concebida tanto para ingenieros como para agentes de IA.',
      '#processo .lede': 'Programar con modelos de lenguaje requería un repositorio modular que permitiese a los agentes interpretar el contexto sin desbordar su memoria. El PRD se estructuró en especificaciones atómicas guiadas por protocolos de tareas.',

      // Trade-offs
      '#aprendizados .eyebrow': 'Compromisos y Evolución',
      '#aprendizados h2': 'Decisiones adoptadas para el despliegue y su coste técnico futuro.',
      '#aprendizados .lede': 'Soluciones pragmáticas que permitieron llevar la herramienta a producción y los aspectos identificados para futuras iteraciones de arquitectura.'
    },

    fr: {
      '.pf-hero .eyebrow': '<b>Projet 09</b> · Product Design · UI · Développement Full-Stack',
      '.pf-hero h1': 'Du questionnaire au rapport d’expertise, <em>chaque risque piloté en trois phases.</em>',
      '.pf-hero .lede': 'Plateforme web d’audit de risques et de prévention pour l’assurance des biens commerciaux et industriels. L’expert consigne les non-conformités avec photographies géolocalisées, supervise la levée des réserves et édite le rapport technique dans le navigateur. En cas d’éloignement géographique, le client transmet les clichés via un lien temporaire sécurisé. Conçu et codé de bout en bout avec assistance IA.',

      // Meta
      '.pf-meta div:nth-child(1) dd': 'Product Design, UI et Développement Full-Stack (Front & Back)',
      '.pf-meta div:nth-child(2) dd': 'Logiciel en exploitation réelle · Client sous accord de confidentialité · 2025–2026',
      '.pf-meta div:nth-child(3) dd': 'Parcours utilisateurs, UI, charte, application web, API et moteur d’édition .docx',
      '.pf-meta div:nth-child(4) dd': 'React · TypeScript · Tailwind · Node · MongoDB · Twilio · Cursor & Gemini',

      // Links
      '.pf-links a[href="#contexto"]': 'Contexte',
      '.pf-links a[href="#jornada"]': 'Parcours',
      '.pf-links a[href="#tablet"]': 'Tablette Terrain',
      '.pf-links a[href="#fases"]': 'Trois Phases',
      '.pf-links a[href="#remota"]': 'Audit à Distance',
      '.pf-links a[href="#laudo"]': 'Rapport d’Expertise',
      '.pf-links a[href="#cores"]': 'Nuancier',
      '.pf-links a[href="#processo"]': 'Méthodologie',
      '.pf-links a[href="#aprendizados"]': 'Compromis',

      // Context
      '#contexto .eyebrow': 'Le problème',
      '#contexto h2': 'Une expertise de risque ne vaut que par la solidité de ses preuves.',
      '#contexto .lede': 'Pour les compagnies d’assurance, chaque prescription (dégagement des extincteurs, sécurisation d’armoires électriques) exige une preuve formelle irréfutable : photo horodatée, coordonnées GPS et visa de l’expert. Les travaux correctifs s’échelonnent dans le temps, souvent en dehors de la présence de l’auditeur.',
      '#contexto .callout': '<b>Brief :</b> numériser l’intégralité de la chaîne d’inspection avec traçabilité probante sans imposer la création d’un compte utilisateur au client final.',

      // Journey
      '#jornada .eyebrow': '<b>Architecture du Parcours</b> · Enterprise UX',
      '#jornada h2': 'Le parcours de bout en bout : des sous-sols hors réseau au PDF d’expertise signé.',
      '#jornada .lede': 'Les préventeurs opèrent dans des conditions éprouvantes : sous-sols industriels sans 4G, hangars métalliques faisant cage de Faraday et zones de chargement sous un soleil accablant. La plateforme garantit la résilience des données d’audit sans perte d’éléments probatoires.',

      // Tablet
      '#tablet .eyebrow': '<b>Ergonomie Terrain</b> · Mode Plein Soleil',
      '#tablet h2': 'Lisibilité sous lumière solaire directe : l’épreuve des entrepôts logistiques.',
      '#tablet .lede': 'Les auditeurs passent des heures en extérieur confrontés aux reflets éblouissants des dalles en verre. L’interface repose sur une palette contrastée (#202738 rehaussé de vert et d’ambre néon), des zones tactiles calibrées à 48×48px et une typographie très lisible.',
      '#tablet .vr-tab-controls button span': 'Simuler le Plein Soleil (Extérieur)',
      '#tablet figcaption': '<b>Simulateur de conditions réelles.</b> Enclenchez le mode plein soleil pour constater l’efficacité antireflet et le gain de lisibilité optique du système.',

      // Three Phases
      '#fases .eyebrow': '<b>01</b> · Trois Phases par Risque',
      '#fases h2': 'Un risque ne se clôture pas avec une seule photo. Il en faut trois.',
      '#fases .lede': 'Chaque observation transite par le Constat Initial, le Traitement 1 et le Traitement 2. Chaque séquence mémorise photos géotaguées, prescriptions et avis de conformité pour construire l’historique avant/après.',

      // Remote Survey
      '#remota .eyebrow': '<b>02</b> · Audit Délégué à Distance',
      '#remota h2': 'Lorsque l’expert ne peut se déplacer, le client prend les photos et l’expert valide.',
      '#remota .lede': 'L’inspection déléguée génère un lien protégé valide 30 jours. Le responsable du site accède directement à la liste, photographie les installations et peut solliciter une assistance technique immédiate.',
      '#remota figcaption': '<b>Recréation interactive.</b> À gauche, le parcours mobile du gestionnaire d’établissement ; à droite, le panneau de contrôle de l’expert avec modération des clichés et appel vidéo.',

      // Inspection Report
      '#laudo .eyebrow': '<b>03</b> · Moteur d’Édition de Rapports',
      '#laudo h2': 'Le document Word est assemblé directement dans le navigateur avec le comparatif avant/après.',
      '#laudo .lede': 'La Lettre de Recommandations hiérarchise les risques par niveau de gravité et fixe les échéances de conformité. Le document Word (.docx) est généré côté client à partir de modèles paramétrables, intégrant les images haute définition sans solliciter le serveur.',
      '#laudo figcaption': '<b>Lettre de Recommandations A4 interactive.</b> Filtrez par gravité pour consulter les formulations réglementaires authentiques.',

      // Palette
      '#cores .eyebrow': '<b>04</b> · Harmonisation Chromatique',
      '#cores h2': 'Huit nuances sombres disparates fusionnées en trois, puis en une seule.',
      '#cores .lede': 'Au fil des fonctionnalités, de multiples nuances sombres s’étaient accumulées. J’ai cartographié la palette pour la rationaliser vers une référence unique (#202738) habillant écrans, cartes et modales.',

      // Process
      '#processo .eyebrow': '<b>05</b> · Méthodologie & Co-développement IA',
      '#processo h2': 'Une documentation technique conçue pour les humains et les agents IA.',
      '#processo .lede': 'Collaborer efficacement avec l’IA exigeait une architecture documentaire modulaire afin de ne pas saturer la mémoire des modèles. Le PRD s’articule en dossiers système spécialisés encadrés par des protocoles stricts.',

      // Trade-offs
      '#aprendizados .eyebrow': 'Compromis & Perspectives',
      '#aprendizados h2': 'Les arbitrages techniques consentis et les axes d’évolution prévus.',
      '#aprendizados .lede': 'Choix d’ingénierie pragmatiques ayant permis une mise en service rapide et chantiers identifiés pour les prochaines montées de version.'
    }
  };

  if (window.PORTFOLIO_I18N && window.PORTFOLIO_I18N.registerCase) {
    window.PORTFOLIO_I18N.registerCase(CASE_SLUG, translations);
  } else {
    window.PORTFOLIO_CASES_I18N = window.PORTFOLIO_CASES_I18N || {};
    window.PORTFOLIO_CASES_I18N[CASE_SLUG] = translations;
  }
})();

/* ==========================================================================
   Motor de Internacionalização (i18n) — Erik Plácido Portfolio
   Idiomas suportados: Português (pt), English (en), Español (es), Français (fr)
   ========================================================================== */
(function(){
  'use strict';

  var LANGS = ['pt', 'en', 'es', 'fr'];
  var DEFAULT_LANG = 'en';

  var DICT = {
    // Top Bar & Global Nav
    'nav.id_role': {
      pt: '/ UI/UX & AX Designer · Diretor de Arte',
      en: '/ UI/UX & AX Designer · Art Director',
      es: '/ Diseñador UI/UX & AX · Director de Arte',
      fr: '/ Designer UI/UX & AX · Directeur Artistique'
    },
    'nav.contact': {
      pt: 'Contato',
      en: 'Contact',
      es: 'Contacto',
      fr: 'Contact'
    },
    'home.maintenance': {
      pt: 'O portfólio está em manutenção. Os cases voltam em breve. Enquanto isso, o currículo e o contato continuam aqui.',
      en: 'The portfolio is under maintenance. The cases will be back soon. Meanwhile, the résumé and contact are still here.',
      es: 'El portafolio está en mantenimiento. Los casos vuelven pronto. Mientras tanto, el currículum y el contacto siguen aquí.',
      fr: 'Le portfolio est en maintenance. Les projets reviennent bientôt. En attendant, le CV et le contact sont toujours là.'
    },
    'home.seg_soon': {
      pt: 'em breve',
      en: 'soon',
      es: 'pronto',
      fr: 'bientôt'
    },
    'nav.view_cv': {
      pt: 'Ver currículo',
      en: 'View resume',
      es: 'Ver currículum',
      fr: 'Voir le CV'
    },
    'nav.explore_cases': {
      pt: 'Explorar cases',
      en: 'Explore cases',
      es: 'Explorar casos',
      fr: 'Explorer les projets'
    },
    'nav.tabletop_hub': {
      pt: 'Tabletop UI/UX',
      en: 'Tabletop UI/UX',
      es: 'Tabletop UI/UX',
      fr: 'Tabletop UI/UX'
    },
    'nav.all_cases': {
      pt: 'Todos os cases',
      en: 'All cases',
      es: 'Todos los casos',
      fr: 'Tous les projets'
    },
    'nav.next_case': {
      pt: 'Próximo case',
      en: 'Next case',
      es: 'Siguiente caso',
      fr: 'Projet suivant'
    },
    'nav.lets_talk': {
      pt: 'Vamos conversar?',
      en: 'Let’s talk',
      es: '¿Hablamos?',
      fr: 'Parlons-en'
    },
    'nav.lets_talk_desc': {
      pt: 'Disponível para posições sênior, liderança de design e projetos selecionados.',
      en: 'Available for senior roles, design leadership, and select high-impact projects.',
      es: 'Disponible para posiciones senior, liderazgo de diseño y proyectos seleccionados.',
      fr: 'Disponible pour des postes seniors, lead design et projets stratégiques.'
    },

    // Fast-Track Career Paths (Home)
    'home.tracks.eyebrow': {
      pt: 'Trilhas de Carreira & Especialização',
      en: 'Curated Career Tracks & Specializations',
      es: 'Rutas de Especialización Profesional',
      fr: 'Parcours d’Expertise & Spécialisation'
    },
    'home.tracks.heading': {
      pt: 'O paradoxo do generalista resolvido: escolha seu foco',
      en: 'The generalist paradox resolved: select your focus',
      es: 'El dilema del generalista resuelto: elija su enfoque',
      fr: 'Le paradoxe du généraliste résolu : choisissez votre profil'
    },
    'home.tracks.desc': {
      pt: 'Filtre os cases pelo perfil da sua vaga ou explore os currículos direcionados com métricas e entregas específicas:',
      en: 'Filter cases by your hiring focus or explore tailored resumes directly:',
      es: 'Filtre los casos según su perfil de contratación o explore currículums dedicados:',
      fr: 'Filtrez les projets selon vos besoins de recrutement ou consultez les CV dédiés :'
    },
    'home.tracks.product.title': {
      pt: 'Product Design & Fintechs',
      en: 'Product Design & Fintechs',
      es: 'Product Design & Fintechs',
      fr: 'Product Design & Fintech'
    },
    'home.tracks.product.desc': {
      pt: 'Sistemas escaláveis, onboarding, design systems, handoff e impacto direto em CAC/LTV.',
      en: 'Scalable web/mobile systems, onboarding UX, design systems, dev handoff, and CAC/LTV impact.',
      es: 'Sistemas escalables, UX de onboarding, design systems, handoff e impacto medible en CAC/LTV.',
      fr: 'Systèmes évolutifs, UX d’onboarding, design systems, handoff et impact mesurable sur CAC/LTV.'
    },
    'home.tracks.product.kpi': {
      pt: 'Redução de churn em ~18% · Design Tokens · Hand-off de código',
      en: '~18% churn reduction · Design Tokens · Clean code hand-off',
      es: 'Reducción de churn en ~18% · Design Tokens · Hand-off de código',
      fr: 'Réduction du churn de ~18% · Design Tokens · Handoff de code'
    },
    'home.tracks.games.title': {
      pt: 'Game UI & Creative Tech',
      en: 'Game UI & Creative Tech',
      es: 'Game UI & Creative Tech',
      fr: 'Game UI & Creative Tech'
    },
    'home.tracks.games.desc': {
      pt: 'HUDs contextuais, interfaces diegéticas, 3D WebGL em tempo real, Godot 4 e árvores de talentos.',
      en: 'Contextual HUDs, diegetic interfaces, real-time 3D WebGL, Godot 4 scenes, and complex skill trees.',
      es: 'HUDs contextuales, interfaces diegéticas, 3D WebGL en tiempo real, Godot 4 y árboles de habilidades.',
      fr: 'HUDs contextuels, interfaces diégétiques, 3D WebGL temps réel, Godot 4 et arbres de compétences.'
    },
    'home.tracks.games.kpi': {
      pt: '60 FPS estáveis · Web Audio API · Compensação de latência',
      en: 'Stable 60 FPS · Web Audio API · Latency compensation',
      es: '60 FPS estables · Web Audio API · Compensación de latencia',
      fr: '60 FPS constants · Web Audio API · Compensation de latence'
    },
    'home.tracks.tabletop.title': {
      pt: 'Tabletop & Board Games',
      en: 'Tabletop & Board Games',
      es: 'Tabletop & Juegos de Mesa',
      fr: 'Jeux de Société & Tabletop'
    },
    'home.tracks.tabletop.desc': {
      pt: 'Ergonomia física de mesa, consoles dual-layer cortados a laser, card games e iconografia.',
      en: 'Physical tabletop ergonomics, laser-cut dual-layer dashboards, card games, and clear iconography.',
      es: 'Ergonomía física de mesa, tableros dual-layer de corte láser, juegos de cartas e iconografía.',
      fr: 'Ergonomie physique de table, plateaux double couche découpés au laser et iconographie.'
    },
    'home.tracks.tabletop.kpi': {
      pt: 'Dual-Layer rígido 3mm · Splay de 18mm · Regras universais',
      en: 'Rigid 3mm Dual-Layer · 18mm Splay · Language-independent rules',
      es: 'Dual-Layer rígido 3mm · Splay de 18mm · Reglas universales',
      fr: 'Double couche 3mm rigide · Splay 18mm · Règles universelles'
    },
    'home.tracks.art.title': {
      pt: 'Direção de Arte & Editorial',
      en: 'Art Direction & Editorial',
      es: 'Dirección de Arte & Editorial',
      fr: 'Direction Artistique & Éditorial'
    },
    'home.tracks.art.desc': {
      pt: 'Design editorial, grid suíço, restauro histórico com Wacom, cinema e embalagens industriais.',
      en: 'Swiss-grid typography, archival Wacom comic restoration, feature film props, and packaging.',
      es: 'Retícula suiza, restauración histórica en Wacom, atrezzo de cine y empaques industriales.',
      fr: 'Grille suisse, restauration graphique patrimoniale sur Wacom, accessoires de cinéma et packaging.'
    },
    'home.tracks.art.kpi': {
      pt: 'Grid suíço de 6 colunas · Restauração Wacom · Calibração industrial',
      en: '6-column Swiss grid · Wacom restoration · Industrial color calibration',
      es: 'Retícula suiza de 6 columnas · Restauración en Wacom · Calibración industrial',
      fr: 'Grille suisse à 6 colonnes · Restauration Wacom · Étalonnage industriel'
    },
    'home.tracks.filter_cases': {
      pt: 'Filtrar Cases',
      en: 'Filter Cases',
      es: 'Filtrar Casos',
      fr: 'Filtrer Projets'
    },
    'home.tracks.cases_count': {
      pt: 'cases',
      en: 'cases',
      es: 'casos',
      fr: 'projets'
    },
    'home.tracks.cv_product': {
      pt: 'Currículo Product Design ↗',
      en: 'Product Design Resume ↗',
      es: 'Currículum Product Design ↗',
      fr: 'CV Product Design ↗'
    },
    'home.tracks.cv_games': {
      pt: 'Currículo Game UI ↗',
      en: 'Game UI Resume ↗',
      es: 'Currículum Game UI ↗',
      fr: 'CV Game UI ↗'
    },
    'home.tracks.hub_tabletop': {
      pt: 'Hub Especializado Tabletop ↗',
      en: 'Tabletop Specialized Hub ↗',
      es: 'Hub Especializado Tabletop ↗',
      fr: 'Hub Dédié Jeux de Société ↗'
    },
    'home.tracks.cv_art': {
      pt: 'Currículo Direção de Arte ↗',
      en: 'Art Direction Resume ↗',
      es: 'Currículum Dirección de Arte ↗',
      fr: 'CV Direction Artistique ↗'
    },
    'home.tracks.reset': {
      pt: 'Exibir todos os 17 cases',
      en: 'Show all 17 cases',
      es: 'Mostrar todos los 17 casos',
      fr: 'Afficher les 17 projets'
    },
    'home.all_cases_title': {
      pt: 'Todos os cases',
      en: 'All cases',
      es: 'Todos los casos',
      fr: 'Tous les projets'
    },

    // Turn Flow Pipeline Keys
    'turn.pipeline_title': {
      pt: 'Pipeline Contínua do Turno de Jogo',
      en: 'Continuous Game Turn Pipeline',
      es: 'Pipeline Continuo del Turno de Juego',
      fr: 'Pipeline Continue du Tour de Jeu'
    },
    'turn.step1_title': { pt: 'Radar Territorial', en: 'Territorial Radar', es: 'Radar Territorial', fr: 'Radar Territorial' },
    'turn.step1_sub': { pt: 'Leitura da Crise', en: 'Crisis Scan', es: 'Lectura de Crisis', fr: 'Détection de Crise' },
    'turn.step2_title': { pt: 'Ficha do Herói', en: 'Hero Dashboard', es: 'Ficha del Héroe', fr: 'Fiche du Héros' },
    'turn.step2_sub': { pt: 'Checagem de Recursos', en: 'Resource Check', es: 'Verificación de Recursos', fr: 'Vérification des Ressources' },
    'turn.step3_title': { pt: 'Carta & Bioma', en: 'Card & Biome', es: 'Carta y Bioma', fr: 'Carte & Biome' },
    'turn.step3_sub': { pt: 'Acionamento Tático', en: 'Tactical Trigger', es: 'Activación Táctica', fr: 'Déclenchement Tactique' },
    'turn.step4_title': { pt: 'Mesa & Resolução', en: 'Board & Resolution', es: 'Mesa y Resolución', fr: 'Plateau & Résolution' },
    'turn.step4_sub': { pt: 'Gasto e Contenção', en: 'Cost & Containment', es: 'Gasto y Contención', fr: 'Dépense et Confinement' },
    'turn.loop': { pt: 'Ciclo Contínuo ↻', en: 'Continuous Loop ↻', es: 'Ciclo Continuo ↻', fr: 'Boucle Continue ↻' },
    'home.scroll_cue': {
      pt: 'Rolar para ver todos os cases',
      en: 'Scroll to see all cases',
      es: 'Desplazar para ver todos los casos',
      fr: 'Faire défiler pour voir tous les projets'
    },
    'home.video.pause': {
      pt: 'Pausar vídeo',
      en: 'Pause video',
      es: 'Pausar video',
      fr: 'Mettre en pause'
    },
    'home.video.play': {
      pt: 'Reproduzir vídeo',
      en: 'Play video',
      es: 'Reproducir video',
      fr: 'Lire la vidéo'
    },
    'cv.close': {
      pt: 'Fechar currículo',
      en: 'Close resume',
      es: 'Cerrar currículum',
      fr: 'Fermer le CV'
    },
    'cv.full_page': {
      pt: 'Página cheia',
      en: 'Full page',
      es: 'Página completa',
      fr: 'Plein écran'
    },
    'cv.tabletop_hub': {
      pt: 'Vitrine Tabletop UI/UX',
      en: 'Tabletop UI/UX Showcase',
      es: 'Vitrina Tabletop UI/UX',
      fr: 'Vitrine Tabletop UI/UX'
    },
    'cv.track_label': {
      pt: 'Selecione o foco de atuação (Trilha Profissional):',
      en: 'Select focus area (Career Track):',
      es: 'Seleccione enfoque (Ruta Profesional):',
      fr: 'Sélectionnez votre profil (Parcours) :'
    },
    'cv.track_all': {
      pt: 'Visão Geral Completa',
      en: 'Complete Overview',
      es: 'Visión General Completa',
      fr: 'Vue d’ensemble'
    },
    'cv.track_uiux': {
      pt: 'UI / UX & AX (Fintech / Mobile)',
      en: 'UI / UX & AX (Fintech / Mobile)',
      es: 'UI / UX & AX (Fintech / Mobile)',
      fr: 'UI / UX & AX (Fintech / Mobile)'
    },
    'cv.track_branding': {
      pt: 'Direção de Arte & Branding',
      en: 'Art Direction & Branding',
      es: 'Dirección de Arte & Branding',
      fr: 'Direction Artistique & Branding'
    },
    'cv.track_audiovisual': {
      pt: 'Audiovisual & Cenografia',
      en: 'Audiovisual & Scenography',
      es: 'Audiovisual y Escenografía',
      fr: 'Audiovisuel & Scénographie'
    },
    'cv.track_editorial': {
      pt: 'Editorial, Embalagens & Games',
      en: 'Editorial, Packaging & Games',
      es: 'Editorial, Empaques y Games',
      fr: 'Édition, Packaging & Jeux'
    },
    'cv.exp_heading': {
      pt: 'Experiência Profissional & Histórico Completo',
      en: 'Professional Experience & History',
      es: 'Experiencia Profesional e Historial',
      fr: 'Expérience Professionnelle & Historique'
    },

    // Groups on Home
    'group.uxui': { pt: 'UX/UI', en: 'UX/UI', es: 'UX/UI', fr: 'UX/UI' },
    'group.jogos': { pt: 'Jogos', en: 'Games', es: 'Juegos', fr: 'Jeux' },
    'group.editorial': { pt: 'Editorial', en: 'Editorial', es: 'Editorial', fr: 'Édition' },
    'group.embalagem': { pt: 'Embalagem', en: 'Packaging', es: 'Empaque', fr: 'Packaging' },
    'group.publicidade': { pt: 'Publicidade', en: 'Advertising', es: 'Publicidad', fr: 'Publicité' },
    'group.cinema': { pt: 'Cinema', en: 'Film & Cinema', es: 'Cine', fr: 'Cinéma' },

    // Case Internal Metadata
    'meta.role': { pt: 'Papel', en: 'Role', es: 'Rol', fr: 'Rôle' },
    'meta.discipline': { pt: 'Disciplina', en: 'Discipline', es: 'Disciplina', fr: 'Discipline' },
    'meta.format': { pt: 'Formato', en: 'Format', es: 'Formato', fr: 'Format' },
    'meta.deliverables': { pt: 'Entregas', en: 'Deliverables', es: 'Entregables', fr: 'Livrables' },
    'meta.tools': { pt: 'Ferramentas', en: 'Tools', es: 'Herramientas', fr: 'Outils' },
    'meta.platform': { pt: 'Plataforma', en: 'Platform', es: 'Plataforma', fr: 'Plateforme' },
    'meta.timeline': { pt: 'Período', en: 'Timeline', es: 'Cronograma', fr: 'Calendrier' },
    'meta.prototype_btn': { pt: 'Experimentar o protótipo ↗', en: 'Try live prototype ↗', es: 'Probar prototipo interactivo ↗', fr: 'Tester le prototype en direct ↗' }
  };

  // Translations for all 17 Case Blurbs and Titles
  var CASES_I18N = {
    'blue-services': {
      title: { pt: 'Blue Services', en: 'Blue Services', es: 'Blue Services', fr: 'Blue Services' },
      tags: {
        pt: ['Product design', 'Web e mobile', 'Design system'],
        en: ['Product design', 'Web & mobile', 'Design system'],
        es: ['Diseño de producto', 'Web y móvil', 'Design system'],
        fr: ['Design de produit', 'Web et mobile', 'Design system']
      },
      blurb: {
        pt: 'Reserva com preço ao vivo, rastreio em tempo real e operações para um marketplace de limpeza.',
        en: 'Live-priced booking, real-time tracking, and operations for a three-sided home-services marketplace.',
        es: 'Reserva con precio en vivo, seguimiento en tiempo real y operaciones para un marketplace de limpieza.',
        fr: 'Réservation à tarif dynamique, suivi en direct et opérations pour une plateforme de services à domicile.'
      }
    },
    'cobra-kai': {
      title: { pt: 'Cobra Kai · 3ª Temporada', en: 'Cobra Kai · Season 3', es: 'Cobra Kai · 3ª Temporada', fr: 'Cobra Kai · Saison 3' },
      tags: {
        pt: ['Conceito', 'Game UI', 'Pixel art'],
        en: ['Concept', 'Game UI', 'Pixel art'],
        es: ['Concepto', 'Game UI', 'Pixel art'],
        fr: ['Concept', 'Game UI', 'Pixel art']
      },
      blurb: {
        pt: 'Um jogo de luta como trailer: arte e UI de um advergame mobile que libera a estreia.',
        en: 'A fighting game as a trailer: art and UI for a mobile advergame that unlocks the season premiere.',
        es: 'Un juego de lucha como tráiler: arte y UI para un advergame móvil que desbloquea el estreno.',
        fr: 'Un jeu de combat comme bande-annonce : direction artistique et UI d’un jeu mobile débloquant la première.'
      }
    },
    'loony-races': {
      title: { pt: 'Loony Races', en: 'Loony Races', es: 'Loony Races', fr: 'Loony Races' },
      tags: {
        pt: ['Board game', 'Identidade visual', 'Ilustração'],
        en: ['Board game', 'Brand identity', 'Illustration'],
        es: ['Juego de mesa', 'Identidad visual', 'Ilustración'],
        fr: ['Jeu de société', 'Identité visuelle', 'Illustration']
      },
      blurb: {
        pt: 'Marca, dez pilotos de dez países, cartas sem texto e uma pista montada durante a corrida.',
        en: 'Branding, ten drivers from ten nations, textless cards, and a modular track built mid-race.',
        es: 'Marca, diez pilotos de diez países, cartas sin texto y una pista modular construida durante la carrera.',
        fr: 'Identité visuelle, dix pilotes de dix nations, cartes sans texte et circuit modulaire assemblé en course.'
      }
    },
    'saudosa-maloca': {
      title: { pt: 'Saudosa Maloca', en: 'Saudosa Maloca', es: 'Saudosa Maloca', fr: 'Saudosa Maloca' },
      tags: {
        pt: ['Cinema', 'Design gráfico', 'Peças de época'],
        en: ['Feature film', 'Graphic design', 'Period props'],
        es: ['Cine', 'Diseño gráfico', 'Atrezzo de época'],
        fr: ['Cinéma', 'Design graphique', 'Accessoires d’époque']
      },
      blurb: {
        pt: 'Placa-título, marcas, rótulos e cartazes dos anos 50 e 80 para um longa sobre os sambas de Adoniran.',
        en: 'Title card, branding, period labels, and posters from the 50s and 80s for a film on Adoniran’s sambas.',
        es: 'Título, marcas, etiquetas de época y afiches de los años 50 y 80 para un filme sobre Adoniran.',
        fr: 'Titre principal, marques, étiquettes d’époque et affiches des années 50 et 80 pour un film sur Adoniran.'
      }
    },
    'super-batalha': {
      title: { pt: 'Super Batalha', en: 'Super Batalha', es: 'Super Batalha', fr: 'Super Batalha' },
      tags: {
        pt: ['Board game', 'Identidade visual', 'Design gráfico'],
        en: ['Board game', 'Brand identity', 'Graphic design'],
        es: ['Juego de mesa', 'Identidad visual', 'Diseño gráfico'],
        fr: ['Jeu de société', 'Identité visuelle', 'Design graphique']
      },
      blurb: {
        pt: 'Logo, caixa, cartas, biombos e standees de uma arena de super-heróis brasileiros com 33 convidados.',
        en: 'Logo, box, cards, screens, and standees for an arena of Brazilian superheroes with 33 guest characters.',
        es: 'Logo, caja, cartas, biombos y standees de una arena de superhéroes brasileños con 33 invitados.',
        fr: 'Logo, boîte, cartes, écrans et standees d’une arène de super-héros brésiliens avec 33 invités.'
      }
    },
    'forca-br': {
      title: { pt: 'Projeto Força BR', en: 'Projeto Força BR', es: 'Proyecto Força BR', fr: 'Projet Força BR' },
      tags: {
        pt: ['Board game', 'Design gráfico', 'Mockup 3D'],
        en: ['Board game', 'Graphic design', '3D mockups'],
        es: ['Juego de mesa', 'Diseño gráfico', 'Mockup 3D'],
        fr: ['Jeu de société', 'Design graphique', 'Mockup 3D']
      },
      blurb: {
        pt: 'Cartas, tabuleiro, fichas e logos de um jogo cooperativo de heróis que defendem as regiões do Brasil.',
        en: 'Cards, board, tokens, and logos for a cooperative tabletop game where heroes defend Brazilian regions.',
        es: 'Cartas, tablero, fichas y logotipos para un juego de mesa cooperativo en regiones de Brasil.',
        fr: 'Cartes, plateau, pions et logos pour un jeu de société coopératif défendant les régions du Brésil.'
      }
    },
    'terraforming-mars': {
      title: { pt: 'Terraforming Mars · Re-Engineered', en: 'Terraforming Mars · Re-Engineered', es: 'Terraforming Mars · Re-Engineered', fr: 'Terraforming Mars · Re-Engineered' },
      tags: {
        pt: ['Tabletop UX', 'Redesign', 'Dual-Layer Mat'],
        en: ['Tabletop UX', 'Redesign', 'Dual-layer mat'],
        es: ['Tabletop UX', 'Rediseño', 'Tablero dual-layer'],
        fr: ['UX Tabletop', 'Refonte', 'Plateau double couche']
      },
      blurb: {
        pt: 'Arquitetura de informação e ergonomia para o clássico: dashboard dual-layer, card splaying e iconografia.',
        en: 'Information architecture and ergonomics for the classic game: dual-layer dashboard, card splay, and iconography.',
        es: 'Arquitectura de información y ergonomía para el clásico: tablero dual-layer, abanico de cartas e iconografía.',
        fr: 'Architecture de l’information et ergonomie du classique : console double couche, splay de cartes et iconographie.'
      }
    },
    'editorial': {
      title: { pt: 'Editorial · Capas e livros', en: 'Editorial · Covers & Books', es: 'Editorial · Portadas y libros', fr: 'Édition · Couvertures & livres' },
      tags: {
        pt: ['Design editorial', 'Capas', 'Restauração'],
        en: ['Editorial design', 'Book covers', 'Restoration'],
        es: ['Diseño editorial', 'Portadas', 'Restauración'],
        fr: ['Design éditorial', 'Couvertures', 'Restauration']
      },
      blurb: {
        pt: 'Capas para a WMF Martins Fontes e os três primeiros livros de Mauricio de Sousa, restaurados num só volume.',
        en: 'Book covers for WMF Martins Fontes and Mauricio de Sousa’s first 3 historic comic books, restored in one volume.',
        es: 'Portadas para WMF Martins Fontes y los primeros tres libros de Mauricio de Sousa restaurados en un solo volumen.',
        fr: 'Couvertures pour WMF Martins Fontes et les 3 premiers livres de Mauricio de Sousa restaurés en un volume.'
      }
    },
    'magal-e-os-formigas': {
      title: { pt: 'Magal e os Formigas', en: 'Magal e os Formigas', es: 'Magal e os Formigas', fr: 'Magal e os Formigas' },
      tags: {
        pt: ['Cinema', 'Design gráfico de cena', 'Globo Filmes'],
        en: ['Feature film', 'Graphic prop design', 'Globo Filmes'],
        es: ['Cine', 'Diseño gráfico de atrezzo', 'Globo Filmes'],
        fr: ['Cinéma', 'Accessoires graphiques', 'Globo Filmes']
      },
      blurb: {
        pt: 'Pôster, capa de disco e quadros de Sidney Magal para o cenário de um longa da Globo Filmes.',
        en: 'Poster, record sleeve, and framed pictures of Sidney Magal for the set of a Globo Filmes feature.',
        es: 'Póster, portada de disco y cuadros de Sidney Magal para el set de un largometraje de Globo Filmes.',
        fr: 'Affiche, pochette de disque et cadres de Sidney Magal pour le décor d’un long métrage Globo Filmes.'
      }
    },
    'invertidamente': {
      title: { pt: 'Invertidamente', en: 'Invertidamente', es: 'Invertidamente', fr: 'Invertidamente' },
      tags: {
        pt: ['TV', 'Design gráfico de cena', 'Objetos impressos'],
        en: ['TV', 'Graphic prop design', 'Printed props'],
        es: ['TV', 'Diseño gráfico de atrezzo', 'Objetos impresos'],
        fr: ['TV', 'Accessoires graphiques', 'Objets imprimés']
      },
      blurb: {
        pt: 'Objetos impressos com faca, lousas e pôsteres para um cômodo que gira de cabeça para baixo no Em Família com Eliana.',
        en: 'Die-cut printed props, chalkboards, and posters for a room that turns upside down on Em Família com Eliana.',
        es: 'Objetos impresos con troquel, pizarras y pósteres para una habitación que gira al revés en Em Família com Eliana.',
        fr: 'Objets imprimés à découpe, ardoises et affiches pour une pièce qui se retourne dans Em Família com Eliana.'
      }
    },
    'que-seja-doce': {
      title: { pt: 'Que Seja Doce', en: 'Que Seja Doce', es: 'Que Seja Doce', fr: 'Que Seja Doce' },
      tags: {
        pt: ['Direção de arte', 'GNT', 'Silhuetas'],
        en: ['Art direction', 'GNT', 'Silhouettes'],
        es: ['Dirección de arte', 'GNT', 'Siluetas'],
        fr: ['Direction artistique', 'GNT', 'Silhouettes']
      },
      blurb: {
        pt: 'Abertura em teatro de sombras, painéis vazados e cartas de prova para uma competição de confeitaria.',
        en: 'A shadow-puppet opening, cut-out set panels, and challenge cards for a baking competition.',
        es: 'Apertura en teatro de sombras, paneles calados y cartas de prueba para una competencia de repostería.',
        fr: 'Générique en théâtre d’ombres, panneaux ajourés et cartes d’épreuve pour un concours de pâtisserie.'
      }
    },
    'credo-que-delicia': {
      title: { pt: 'Credo, que delícia!', en: 'Credo, que delícia!', es: 'Credo, que delícia!', fr: 'Credo, que delícia!' },
      tags: {
        pt: ['GNT', 'Marca no cenário', 'Grafismos de tela'],
        en: ['GNT', 'Branding on set', 'On-screen graphics'],
        es: ['GNT', 'Marca en el set', 'Grafismos en pantalla'],
        fr: ['GNT', 'Marque sur le plateau', 'Habillage écran']
      },
      blurb: {
        pt: 'Uma marca em traço de néon aplicada ao azulejo, aos ícones, ao avental bordado e às provas de um programa de confeitaria.',
        en: 'A neon-line wordmark carried onto tiles, icons, an embroidered apron, and challenge titles for a baking show.',
        es: 'Una marca en trazo de neón llevada al azulejo, los íconos, el delantal bordado y las pruebas de un programa de repostería.',
        fr: 'Un logo en trait néon décliné sur le carrelage, les pictos, le tablier brodé et les épreuves d’une émission de pâtisserie.'
      }
    },
    'se-sobreviver-case': {
      title: { pt: 'Se Sobreviver, Case', en: 'Se Sobreviver, Case', es: 'Se Sobreviver, Case', fr: 'Se Sobreviver, Case' },
      tags: {
        pt: ['Reality', 'Mapa ilustrado', 'Manual de sobrevivência'],
        en: ['Reality', 'Illustrated map', 'Survival manual'],
        es: ['Reality', 'Mapa ilustrado', 'Manual de supervivencia'],
        fr: ['Téléréalité', 'Carte illustrée', 'Manuel de survie']
      },
      blurb: {
        pt: 'O mapa da ilha em 21 versões, uma para cada combinação de abrigos, e um manual de sobrevivência no mesmo papel.',
        en: 'The island map in 21 versions, one per shelter combination, plus a survival manual on the same paper.',
        es: 'El mapa de la isla en 21 versiones, una por combinación de refugios, y un manual de supervivencia en el mismo papel.',
        fr: 'La carte de l’île en 21 versions, une par combinaison d’abris, et un manuel de survie sur le même papier.'
      }
    },
    'rio-shore': {
      title: { pt: 'Rio Shore', en: 'Rio Shore', es: 'Rio Shore', fr: 'Rio Shore' },
      tags: {
        pt: ['Reality', 'Papel de parede', 'Baralho'],
        en: ['Reality', 'Wallpaper', 'Card deck'],
        es: ['Reality', 'Papel tapiz', 'Baraja'],
        fr: ['Téléréalité', 'Papier peint', 'Jeu de cartes']
      },
      blurb: {
        pt: 'Paredes de até 13 metros divididas em folhas de impressão, o piso do calçadão de Copacabana e um baralho de Verdade ou Desafio.',
        en: 'Walls up to 13 m split into print sheets, a Copacabana boardwalk floor, and a Truth or Dare deck.',
        es: 'Paredes de hasta 13 m divididas en pliegos de impresión, el piso del paseo de Copacabana y una baraja de Verdad o Reto.',
        fr: 'Murs jusqu’à 13 m découpés en lés d’impression, un sol façon promenade de Copacabana et un jeu Action ou Vérité.'
      }
    },
    'match-nas-estrelas': {
      title: { pt: 'Match nas Estrelas', en: 'Match nas Estrelas', es: 'Match nas Estrelas', fr: 'Match nas Estrelas' },
      tags: {
        pt: ['Streaming', 'Logo', 'Baralho'],
        en: ['Streaming', 'Logo', 'Card deck'],
        es: ['Streaming', 'Logo', 'Baraja'],
        fr: ['Streaming', 'Logo', 'Jeu de cartes']
      },
      blurb: {
        pt: 'Logo e baralho de carinhos para uma produção Amazon Original, desenhados como constelações.',
        en: 'Logo and a deck of affection cards for an Amazon Original, drawn as constellations.',
        es: 'Logo y baraja de caricias para una producción Amazon Original, dibujados como constelaciones.',
        fr: 'Logo et jeu de cartes de tendresse pour un Amazon Original, dessinés comme des constellations.'
      }
    },
    'ram-rotulos': {
      title: { pt: 'RAM · Rótulos de bar', en: 'RAM · Bar labels', es: 'RAM · Etiquetas de bar', fr: 'RAM · Étiquettes de bar' },
      tags: {
        pt: ['Publicidade', 'Marcas fictícias', 'Rótulos'],
        en: ['Advertising', 'Fictional brands', 'Labels'],
        es: ['Publicidad', 'Marcas ficticias', 'Etiquetas'],
        fr: ['Publicité', 'Marques fictives', 'Étiquettes']
      },
      blurb: {
        pt: '18 rótulos de bebidas inventadas, de uísque japonês a água francesa, para a prateleira de um bar num filme da RAM.',
        en: '18 labels for invented drinks, from Japanese whisky to French water, for a bar shelf in a RAM commercial.',
        es: '18 etiquetas de bebidas inventadas, del whisky japonés al agua francesa, para el estante de un bar en un comercial de RAM.',
        fr: '18 étiquettes de boissons inventées, du whisky japonais à l’eau française, pour l’étagère d’un bar dans un film RAM.'
      }
    },
    'vistorias-risco': {
      title: { pt: 'Vistorias de Risco', en: 'Risk Inspections (Enterprise UX)', es: 'Inspecciones de Riesgo', fr: 'Inspections des Risques' },
      tags: {
        pt: ['Product design', 'UI', 'Desenvolvimento'],
        en: ['Product design', 'Field UI', 'Full-stack engineering'],
        es: ['Diseño de producto', 'UI de campo', 'Desarrollo web'],
        fr: ['Design de produit', 'UI terrain', 'Développement web']
      },
      blurb: {
        pt: 'Vistoria de seguros do questionário ao laudo: fotos geolocalizadas, três fases por item e cliente remoto sem conta.',
        en: 'Insurance inspection from survey to final report: geotagged photos, 3-phase audits, and guest remote inspections.',
        es: 'Inspección de riesgos de seguros del cuestionario al informe: fotos geolocalizadas y cliente remoto sin cuenta.',
        fr: 'Inspection de risques d’assurance de l’audit au rapport : photos géolocalisées et inspection distante sans compte.'
      }
    },
    'caju-cartao': {
      title: { pt: 'Caju · Ativação do cartão', en: 'Caju · Card Activation', es: 'Caju · Activación de tarjeta', fr: 'Caju · Activation de carte' },
      tags: {
        pt: ['Business Case', 'UI mobile', 'Motion'],
        en: ['Business case', 'Mobile UI', 'Micro-interactions'],
        es: ['Business case', 'UI móvil', 'Micro-interacciones'],
        fr: ['Business case', 'UI mobile', 'Micro-interactions']
      },
      blurb: {
        pt: 'Do envelope à carteira digital: código, NFC ou QR, senha validada em tempo real e cinco edge cases.',
        en: 'From envelope to digital wallet: code, NFC, or QR, real-time PIN validation, and five handled edge cases.',
        es: 'Del sobre a la billetera digital: código, NFC o QR, validación de PIN en tiempo real y cinco edge cases.',
        fr: 'De l’enveloppe au portefeuille numérique : code, NFC ou QR, validation de code PIN en direct et 5 edge cases.'
      }
    },
    'meliuz-fatura': {
      title: { pt: 'Méliuz · Fatura e parcelamento', en: 'Méliuz · Invoicing & Installments', es: 'Méliuz · Factura y cuotas', fr: 'Méliuz · Facturation & Paiement' },
      tags: {
        pt: ['Fintech UX', 'UI', 'Mobile e desktop'],
        en: ['Fintech UX', 'UI systems', 'Mobile & desktop'],
        es: ['Fintech UX', 'Sistemas UI', 'Móvil y escritorio'],
        fr: ['Fintech UX', 'Systèmes UI', 'Mobile & desktop']
      },
      blurb: {
        pt: 'Simulador de parcelamento com juros, IOF e CET à vista, no celular e no desktop.',
        en: 'Invoice installment simulator with real-time interest, financial taxes, and effective total cost calculations.',
        es: 'Simulador de cuotas con cálculo en tiempo real de intereses, impuestos financieros y costo total efectivo.',
        fr: 'Simulateur d’échelonnement de facture avec calcul en direct des intérêts, taxes et coût effectif global.'
      }
    },
    'conta-simples-ledger': {
      title: { pt: 'Conta Simples · TransactionLedger', en: 'Conta Simples · TransactionLedger', es: 'Conta Simples · TransactionLedger', fr: 'Conta Simples · TransactionLedger' },
      tags: {
        pt: ['Design system', 'Documentação', 'Handoff'],
        en: ['Design system', 'Component specs', 'Dev handoff'],
        es: ['Design system', 'Documentación', 'Handoff técnico'],
        fr: ['Design system', 'Spécifications', 'Handoff technique']
      },
      blurb: {
        pt: 'Uma linha de extrato documentada até o código: anatomia, estados, tokens e handoff com IA.',
        en: 'A ledger transaction row documented down to code: anatomy, states, design tokens, and AI-assisted dev handoff.',
        es: 'Fila de extracto financiero documentada hasta el código: anatomía, micro-estados, tokens y handoff técnico.',
        fr: 'Ligne d’extrait de compte documentée jusqu’au code : anatomie, états, tokens et handoff assisté par IA.'
      }
    },
    'editora-terceiro-nome': {
      title: { pt: 'Editora Terceiro Nome', en: 'Terceiro Nome Publishing', es: 'Editorial Terceiro Nome', fr: 'Éditions Terceiro Nome' },
      tags: {
        pt: ['Direção de arte', 'UI', 'Desenvolvimento'],
        en: ['Art direction', 'UI', 'Web development'],
        es: ['Dirección de arte', 'UI', 'Desarrollo web'],
        fr: ['Direction artistique', 'UI', 'Développement web']
      },
      blurb: {
        pt: 'Catálogo de 178 livros tirado do Adobe Muse: direção editorial, busca sem acento e migração auditada, sem inventar dados.',
        en: 'A 178-book catalog rescued from Adobe Muse: editorial art direction, accent-insensitive search and an audited migration that invents no data.',
        es: 'Catálogo de 178 libros rescatado de Adobe Muse: dirección editorial, búsqueda sin tildes y migración auditada, sin inventar datos.',
        fr: 'Catalogue de 178 livres sorti d’Adobe Muse : direction éditoriale, recherche sans accents et migration auditée, sans inventer de données.'
      }
    },
    'itaiquara-untaforma': {
      title: { pt: 'Itaiquara · Untaforma', en: 'Itaiquara · Untaforma', es: 'Itaiquara · Untaforma', fr: 'Itaiquara · Untaforma' },
      tags: {
        pt: ['Embalagem', 'Direção de arte', 'Arte-final'],
        en: ['Packaging design', 'Art direction', 'Print production'],
        es: ['Diseño de empaque', 'Dirección de arte', 'Producción gráfica'],
        fr: ['Design d’emballage', 'Direction artistique', 'Production print']
      },
      blurb: {
        pt: 'Rótulo de lata aerossol para um desmoldante novo: a frente num terço da lata, o resto na volta.',
        en: 'Aerosol can packaging for an industrial baking release spray: front third hero visual, continuous wrap info.',
        es: 'Empaque de lata de aerosol para desmoldante de panadería: tercio frontal destacado y vuelta continua.',
        fr: 'Design d’emballage aérosol pour spray de démoulage professionnel : tiers avant d’impact et déroulé continu.'
      }
    },
    'hellfire-overdrive': {
      title: { pt: 'Hellfire Overdrive', en: 'Hellfire Overdrive', es: 'Hellfire Overdrive', fr: 'Hellfire Overdrive' },
      tags: {
        pt: ['Game design', 'Web Audio', 'Advergame'],
        en: ['Game design', 'Web Audio API', 'Advergame'],
        es: ['Game design', 'Web Audio API', 'Advergame'],
        fr: ['Game design', 'Web Audio API', 'Advergame']
      },
      blurb: {
        pt: 'Advergame de ritmo de guitarra em pixel art para ativação na CCXP: rank A ou S libera brinde no estande.',
        en: 'Pixel art guitar rhythm advergame for pop-culture convention activation: rank A or S unlocks booth rewards.',
        es: 'Advergame de ritmo en pixel art para convención de cultura pop: rango A o S desbloquea premios en el stand.',
        fr: 'Jeu de rythme guitare en pixel art pour salon geek : obtenir le rang A ou S débloque un cadeau sur le stand.'
      }
    },
    'star-marshal': {
      title: { pt: 'Star Marshal — A Lei no Espaço', en: 'Star Marshal — Law in Space', es: 'Star Marshal — Ley Espacial', fr: 'Star Marshal — La Loi Spatiale' },
      tags: {
        pt: ['Game UI/UX', 'HUD contextual', 'UI diegética', 'Protótipo 3D jogável'],
        en: ['Game UI/UX', 'Contextual HUD', 'Diegetic UI', 'Playable 3D prototype'],
        es: ['Game UI/UX', 'HUD contextual', 'UI diegética', 'Prototipo 3D jugable'],
        fr: ['Game UI/UX', 'HUD contextuel', 'UI diégétique', 'Prototype 3D jouable']
      },
      blurb: {
        pt: 'HUD que muda com o contexto, glyphs automáticos PS/Xbox/teclado e roda com bullet time num protótipo 3D jogável.',
        en: 'A HUD that adapts to context, automatic PS/Xbox/keyboard glyphs and a bullet-time wheel in a playable 3D prototype.',
        es: 'HUD que cambia con el contexto, glyphs automáticos PS/Xbox/teclado y rueda con bullet time en un prototipo 3D jugable.',
        fr: 'HUD qui s’adapte au contexte, glyphes PS/Xbox/clavier automatiques et roue en bullet time dans un prototype 3D jouable.'
      }
    },
    'aether-protocol': {
      title: { pt: 'Star Marshal — A Lei no Espaço', en: 'Star Marshal — Law in Space', es: 'Star Marshal — Ley Espacial', fr: 'Star Marshal — La Loi Spatiale' },
      tags: {
        pt: ['Game UI/UX', 'HUD contextual', 'UI diegética', 'Protótipo 3D jogável'],
        en: ['Game UI/UX', 'Contextual HUD', 'Diegetic UI', 'Playable 3D prototype'],
        es: ['Game UI/UX', 'HUD contextual', 'UI diegética', 'Prototipo 3D jugable'],
        fr: ['Game UI/UX', 'HUD contextuel', 'UI diégétique', 'Prototype 3D jouable']
      },
      blurb: {
        pt: 'HUD que muda com o contexto, glyphs automáticos PS/Xbox/teclado e roda com bullet time num protótipo 3D jogável.',
        en: 'A HUD that adapts to context, automatic PS/Xbox/keyboard glyphs and a bullet-time wheel in a playable 3D prototype.',
        es: 'HUD que cambia con el contexto, glyphs automáticos PS/Xbox/teclado y rueda con bullet time en un prototipo 3D jugable.',
        fr: 'HUD qui s’adapte au contexte, glyphes PS/Xbox/clavier automatiques et roue en bullet time dans un prototype 3D jouable.'
      }
    },
    'musanga': {
      title: { pt: 'Musanga · Inventário & Loot', en: 'Musanga · Inventory & Loot', es: 'Musanga · Inventario y Loot', fr: 'Musanga · Inventaire & Butin' },
      tags: {
        pt: ['Game UI/UX', 'Inventário', 'Tooltip comparativo', 'Acessibilidade'],
        en: ['Game UI/UX', 'Inventory', 'Comparison tooltip', 'Accessibility'],
        es: ['Game UI/UX', 'Inventario', 'Tooltip comparativo', 'Accesibilidad'],
        fr: ['Game UI/UX', 'Inventaire', 'Infobulle comparative', 'Accessibilité']
      },
      blurb: {
        pt: 'Tela de inventário de um RPG autoral: tooltip comparativo, grade com arrastar e soltar e raridade legível sem cor.',
        en: 'Inventory screen for an original RPG: comparison tooltip, drag-and-drop grid and rarity that reads without color.',
        es: 'Pantalla de inventario de un RPG propio: tooltip comparativo, cuadrícula con arrastrar y soltar y rareza legible sin color.',
        fr: 'Écran d’inventaire d’un RPG original : infobulle comparative, grille en glisser-déposer et rareté lisible sans couleur.'
      }
    },
    'chronos-weave': {
      title: { pt: 'Chronos Weave · Skill Tree', en: 'Chronos Weave · Skill Tree', es: 'Chronos Weave · Skill Tree', fr: 'Chronos Weave · Skill Tree' },
      tags: {
        pt: ['Game UI/UX', 'Skill Tree', 'Unreal UMG', 'Sony TRC / L10n'],
        en: ['Game UI/UX', 'Skill tree', 'Unreal Engine UMG', 'Sony TRC / L10n'],
        es: ['Game UI/UX', 'Árbol de habilidades', 'Unreal UMG', 'Sony TRC / L10n'],
        fr: ['Game UI/UX', 'Arbre de compétences', 'Unreal UMG', 'Sony TRC / L10n']
      },
      blurb: {
        pt: 'Árvore de talentos em astrolábio celestial, design system com 9-slice e homologação Sony TRC/TCR com L10n +35%.',
        en: 'Celestial astrolabe skill tree, 9-slice engine design system, and console Sony TRC / Microsoft TCR compliance.',
        es: 'Árbol de talentos en astrolabio celestial, design system con 9-slice y homologación de consolas Sony TRC / TCR.',
        fr: 'Arbre de compétences en astrolabe céleste, design system 9-slice et conformité consoles Sony TRC / TCR.'
      }
    }
  };

  // Case-specific translation registry
  var CASE_REGISTRY = window.PORTFOLIO_CASES_I18N || {};
  window.PORTFOLIO_CASES_I18N = CASE_REGISTRY;

  function registerCase(slug, translations) {
    CASE_REGISTRY[slug] = translations;
    var currentCase = document.body ? document.body.getAttribute('data-case') : null;
    if (currentCase === slug) {
      applyCase(slug, getLang());
    }
  }

  function applyCase(slug, lang) {
    var caseTrans = CASE_REGISTRY[slug];
    if (!caseTrans) return;
    lang = lang || getLang();

    var sample = caseTrans.en || caseTrans.es || caseTrans.fr || caseTrans.pt || {};
    var allSelectors = Object.keys(sample);

    // Salva o HTML original de cada elemento antes de qualquer alteração
    allSelectors.forEach(function(sel){
      var el = document.querySelector(sel);
      if (el && el._origHTML === undefined) {
        el._origHTML = el.innerHTML;
      }
    });

    if (caseTrans[lang]) {
      var dict = caseTrans[lang];
      allSelectors.forEach(function(sel){
        var el = document.querySelector(sel);
        if (el && dict[sel] !== undefined) {
          el.innerHTML = dict[sel];
        }
      });
      return;
    }

    if (lang === 'pt') {
      // Restaura o português original do HTML base
      allSelectors.forEach(function(sel){
        var el = document.querySelector(sel);
        if (el && el._origHTML !== undefined) {
          el.innerHTML = el._origHTML;
        }
      });
      return;
    }

    var fallbackDict = caseTrans.en || sample;
    allSelectors.forEach(function(sel){
      var el = document.querySelector(sel);
      if (el && fallbackDict[sel] !== undefined) {
        el.innerHTML = fallbackDict[sel];
      }
    });
  }

  // Helper function to get current language
  function getLang() {
    // 1. ?lang= na URL
    try {
      if (typeof window !== 'undefined' && window.location && window.location.search) {
        var params = new URLSearchParams(window.location.search);
        var urlLang = params.get('lang');
        if (urlLang && LANGS.indexOf(urlLang.toLowerCase()) > -1) {
          return urlLang.toLowerCase();
        }
      }
    } catch(e){}

    // 2. Escolha manual salva no localStorage
    try {
      var saved = localStorage.getItem('portfolio_lang');
      if (saved && LANGS.indexOf(saved) > -1) return saved;
    } catch(e){}

    // 3. Lista completa do navegador (navigator.languages)
    try {
      if (typeof navigator !== 'undefined') {
        var navList = navigator.languages || (navigator.language ? [navigator.language] : []) || [];
        for (var i = 0; i < navList.length; i++) {
          var code = String(navList[i] || '').toLowerCase().slice(0, 2);
          if (LANGS.indexOf(code) > -1) {
            return code;
          }
        }
        var single = (navigator.language || navigator.userLanguage || '').toLowerCase().slice(0, 2);
        if (LANGS.indexOf(single) > -1) return single;
      }
    } catch(e){}

    // 4. Fallback padrão: en (Inglês)
    return DEFAULT_LANG;
  }

  // Helper function to translate a key
  function t(key, lang) {
    lang = lang || getLang();
    if (DICT[key] && DICT[key][lang]) return DICT[key][lang];
    if (DICT[key] && DICT[key]['pt']) return DICT[key]['pt'];
    if (DICT[key] && DICT[key][DEFAULT_LANG]) return DICT[key][DEFAULT_LANG];
    return key;
  }

  // Apply translations across DOM
  function applyTranslations(lang) {
    lang = lang || getLang();
    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : lang;

    // Update elements with data-i18n
    document.querySelectorAll('[data-i18n]').forEach(function(el){
      var key = el.getAttribute('data-i18n');
      if (DICT[key] && DICT[key][lang]) {
        el.innerHTML = DICT[key][lang];
      }
    });

    // Update elements with explicit language attributes
    document.querySelectorAll('[data-i18n-' + lang + ']').forEach(function(el){
      el.innerHTML = el.getAttribute('data-i18n-' + lang);
    });

    // Update active class on all language selectors
    document.querySelectorAll('.pf-lang-btn').forEach(function(btn){
      var bLang = btn.getAttribute('data-lang');
      var isCurrent = bLang === lang;
      btn.classList.toggle('active', isCurrent);
      btn.classList.toggle('on', isCurrent);
      btn.setAttribute('aria-pressed', isCurrent ? 'true' : 'false');
    });

    // If window.PORTFOLIO_CASES exists, update their translated titles and blurbs
    if (window.PORTFOLIO_CASES && Array.isArray(window.PORTFOLIO_CASES)) {
      window.PORTFOLIO_CASES.forEach(function(c){
        var trans = CASES_I18N[c.slug];
        if (trans) {
          if (trans.title && trans.title[lang]) c.displayTitle = trans.title[lang];
          if (trans.blurb && trans.blurb[lang]) c.displayBlurb = trans.blurb[lang];
          if (trans.tags && trans.tags[lang]) c.displayTags = trans.tags[lang];
        }
      });
    }

    // If currently on a case page, apply case translations
    var currentCase = document.body ? document.body.getAttribute('data-case') : null;
    if (currentCase) {
      applyCase(currentCase, lang);
    }

    // Dispatch event for custom components
    try {
      if (typeof window.dispatchEvent === 'function' && typeof CustomEvent === 'function') {
        window.dispatchEvent(new CustomEvent('portfolio-lang-change', { detail: { lang: lang } }));
      }
    } catch(e){}
  }

  // Set language and persist
  function setLang(lang) {
    if (LANGS.indexOf(lang) === -1) lang = DEFAULT_LANG;
    try {
      localStorage.setItem('portfolio_lang', lang);
    } catch(e){}
    applyTranslations(lang);
  }

  // Expose on window
  window.PORTFOLIO_I18N = {
    langs: LANGS,
    dict: DICT,
    cases: CASES_I18N,
    getLang: getLang,
    setLang: setLang,
    t: t,
    apply: applyTranslations,
    registerCase: registerCase,
    applyCase: applyCase
  };

  // Delegated click handler for language picker buttons across the entire document
  document.addEventListener('click', function(e){
    var btn = e.target.closest('.pf-lang-btn');
    if (!btn) return;
    var lang = btn.getAttribute('data-lang');
    if (lang && LANGS.indexOf(lang) > -1) {
      setLang(lang);
    }
  });

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function(){ applyTranslations(); });
  } else {
    applyTranslations();
  }
})();

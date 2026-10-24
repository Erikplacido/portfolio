/**
 * Case Study Translations: On-Set Graphic Design for Advertising & TV (Publicidade e TV)
 * Languages: EN, ES, FR (PT original preserved)
 */
(function() {
  var CASE_SLUG = 'publicidade';

  var translations = {
    en: {
      // Nav
      '.pf-links a[href="#marcas"]': 'Brands',
      '.pf-links a[href="#dna"]': 'Criminal Code',
      '.pf-links a[href="#cartazes"]': 'Posters',
      '.pf-links a[href="#rio-shore"]': 'Rio Shore',
      '.pf-links a[href="#se-sobreviver"]': 'Survival Reality',
      '.pf-links a[href="#sets"]': 'Sets',

      // Hero
      '.pf-hero .eyebrow': '<b>Case 08</b> · On-Set Graphic Design · TV & Advertising Props',
      '.pf-hero h1': 'Brands, street posters, and environments that do not exist, <em>crafted to withstand the extreme close-up.</em>',
      '.pf-hero .lede': 'On-set graphic design for commercials, prime-time television, and streaming series: beverage labels, retail packaging, street paste-ups, large-format scenic wallpaper, vehicle livery decals, playing cards, and hand-drawn illustrated maps that appear on camera for mere seconds and must look undeniably authentic. Every asset on this page was broadcast.',
      '.pf-meta div:nth-child(1) dt': 'Role',
      '.pf-meta div:nth-child(1) dd': 'On-Set Graphic Designer & Prop Fabricator',
      '.pf-meta div:nth-child(2) dt': 'Series & Broadcast Shows',
      '.pf-meta div:nth-child(2) dd': 'Criminal Code (Netflix) · Rio Shore (MTV) · Survival Reality (Globoplay) · Em Família com Eliana (TV Globo) · Match nas Estrelas (Prime Video)',
      '.pf-meta div:nth-child(3) dt': 'Commercial Campaigns',
      '.pf-meta div:nth-child(3) dd': 'Bradesco · O Boticário · Betbet · Itaipava',
      '.pf-meta div:nth-child(4) dt': 'Deliverables',
      '.pf-meta div:nth-child(4) dd': 'Fictional brand packages, bottle labels, street posters, scenic wallpaper prints, architectural signage, cards, maps, and technical vector die-cuts',

      // Context
      '#contexto .eyebrow': 'The Assignment',
      '#contexto h2': 'A few seconds on screen, executed with genuine commercial authenticity.',
      '#contexto .lede': 'In high-end film and TV production, almost nothing visible in the background exists in the real world. A tavern bar needs believable bottles, city streets need authentic fly posters, police precincts need legal notices, and tactical patrol cars need official fleet markings. The art department issues the brief; the on-set graphic designer invents the brand, illustrates the artwork, and delivers ready-to-print mechanicals with exact dimensions, substrate specs, and vector cut lines.',
      '#contexto .callout': '<b>The mandate on every single job:</b> an asset that looks completely authentic in 4K camera close-ups, delivered in a bulletproof pre-press file that commercial printers can execute without asking a single question.',
      '#contexto .pb-count > div:nth-child(1) .tag': 'Beverage Labels',
      '#contexto .pb-count > div:nth-child(1) p': 'custom invented beverage labels, serialized 1 to 16, each embedding metric dimensions directly in the filename.',
      '#contexto .pb-count > div:nth-child(2) .tag': 'Fleet Liveries',
      '#contexto .pb-count > div:nth-child(2) p': 'complete vehicle decaling kits for Netflix’s Criminal Code: 12 Brazilian and Paraguayan law enforcement tactical squads plus armored money transport vans.',
      '#contexto .pb-count > div:nth-child(3) .tag': 'Illustrated Map',
      '#contexto .pb-count > div:nth-child(3) p': 'illustrated variations of the island map for Globoplay’s survival reality, each isolating specific survival coordinate targets.',

      // Section 01: Fictional Brands
      '#marcas .eyebrow': '<b>01</b> · Fictional Brands',
      '#marcas h2': 'A bottle on camera needs a label, and that label needs a heritage brand.',
      '#marcas .lede': 'Japanese single grain whisky, Milanese herbal amaro, Reims champagne, Kentucky straight bourbon, Mexican reposado tequila, London dry gin, triple-distilled vodka, and sparkling mineral water: all invented from scratch. Each boasts a country of origin, founding year, ABV percentage, and micro regulatory copy matching real-world counterparts. On one of them, the designer’s surname became the historic distillery: Maison Placido, 1774.',
      '#marcas .tag-row:nth-of-type(1) .pill:nth-child(1)': 'Interactive',
      '#marcas .tag-row:nth-of-type(1) .pill:nth-child(2)': 'Select a label',
      '#marcas figcaption:nth-of-type(1)': '<b>Prop beverage labels.</b> Authentic production mechanicals used on set. Dimensions derive from filenames; clear variants were printed on transparent adhesive vinyl.',
      '#marcas .tag-row:nth-of-type(2) .pill:nth-child(1)': 'Zoom',
      '#marcas .tag-row:nth-of-type(2) .pill:nth-child(2)': 'Stores, soccer clubs, and retail goods',
      '#marcas figcaption:nth-of-type(2)': '<b>Retail storefronts, sports teams, and FMCG products.</b> Authentic pre-press files. Store names and products are fictional props created for Bradesco, Betbet, and Eliana commercials.',

      // Section 02: Criminal Code (DNA do Crime)
      '#dna .eyebrow': '<b>02</b> · Criminal Code (Netflix)',
      '#dna h2': 'An entire Paraguayan borderland of fictional brands.',
      '#dna .lede': 'Criminal Code is Netflix’s blockbuster police action thriller where Federal Police investigate a historic cross-border heist. To dress streets, convenience stores, and cantinas across the frontier, dozens of beers, soft drinks, cachaças, and sodas were designed from scratch—complete with promotional discount callouts and slogans in Spanish or Portuguese, delivered in A3 and A4 formats.',
      '#dna figcaption:nth-of-type(1)': '<b>Fictional brand fly posters.</b> Authentic production files printed in A3 and A4 formats (two copies each).',
      '#dna figcaption:nth-of-type(2)': '<b>Street paste-ups, market price boards, and precinct public safety posters.</b> Authentic broadcast production files.',
      '#dna figcaption:nth-of-type(3)': '<b>Vehicle fleet liveries.</b> Every law enforcement branch received a fabrication kit with vector die-lines alongside an application schematics guide showing exact decal placement on vehicle panels.',

      // Section 03: Posters
      '#cartazes .eyebrow': '<b>03</b> · Scenic Posters',
      '#cartazes h2': 'On a set wall, the graphic poster establishes the narrative setting.',
      '#cartazes .lede': 'Weathered street paste-ups, ornamental Midsummer festival lettering, woodcut folk poetry pamphlets (cordel), diner specials, and carnival promotions. Every set demands a distinct aesthetic hand, where typography carries the narrative: distressed and heavy on concrete walls, embellished for festivals, and carved in woodcut relief for regional heritage.',
      '#cartazes .fl-chips button:nth-child(1)': 'All',
      '#cartazes .fl-chips button:nth-child(5)': 'Lettering',
      '#cartazes .fl-chips button:nth-child(6)': 'Folk Pamphlets & Food',
      '#cartazes .fl-chips button:nth-child(7)': 'Posters',
      '#cartazes figcaption': '<b>Posters, paste-ups, and custom letterings.</b> Authentic pre-press files ranging from A4 to A1 format.',

      // Section 04: Rio Shore
      '#rio-shore .eyebrow': '<b>04</b> · Rio Shore (MTV)',
      '#rio-shore h2': 'A 13-meter scenic wall comes off the press in nine sheets.',
      '#rio-shore .lede': 'Rio Shore is MTV’s reality show set in a coastal vacation mansion in Búzios. The house was dressed with four distinct custom wallpaper designs, a bespoke floor imitating Copacabana’s iconic mosaic boardwalk, and a Truth or Dare card deck. Scenic walls were designed at full scale (10% working scale) and sliced into 1.47 m print panels.',
      '#rio-shore .st-tabs button:nth-child(1)': 'Blue',
      '#rio-shore .st-tabs button:nth-child(2)': 'Red',
      '#rio-shore .st-tabs button:nth-child(3)': 'Lettering',
      '#rio-shore .st-tabs button:nth-child(4)': 'Yellow',
      '#rio-shore .wl-mode button:nth-child(1)': 'Panels',
      '#rio-shore .wl-mode button:nth-child(2)': 'Assembled Wall',
      '#rio-shore figcaption:nth-of-type(1)': '<b>Scenic wallpapers.</b> Authentic production panels in sequence of installation. Dimensions extracted from print masters.',
      '#rio-shore figcaption:nth-of-type(2)': '<b>Bespoke flooring.</b> Production mechanicals: full scaled strip and modular repeating tile.',
      '#rio-shore .cd-side .cd-count': 'Rio Shore Card Deck',
      '#rio-shore .cd-side p': 'Back face features Rio Shore and MTV branding over Copacabana wave vectors. Front face delivers one daring question or challenge per card.',
      '#rio-shore .cd-btn': 'Draw a card',
      '#rio-shore figcaption:nth-of-type(3)': '<b>Truth or Dare deck.</b> 100 truth cards, 56 dares, and wildcards. Authentic prop mechanicals.',

      // Section 05: Survival Reality (Globoplay)
      '#se-sobreviver .eyebrow': '<b>05</b> · Survival Reality (Globoplay)',
      '#se-sobreviver h2': 'An illustrated island map across 21 tactical editions.',
      '#se-sobreviver .lede': 'In Globoplay’s survival reality series, couples isolated on a deserted island test their relationships with basic supplies. Each team is assigned a color-coded camp. The hand-drawn island map was produced in 21 distinct A3 versions, each marking specific coordinates: colored camps, VIP shelters, and supply crates. Accompanied by a fully illustrated survival field handbook.',
      '#se-sobreviver figcaption:nth-of-type(1)': '<b>Island map.</b> Authentic A3 production files. Concentric target markers highlight unique tactical locations per episode.',
      '#se-sobreviver figcaption:nth-of-type(2)': '<b>Illustrated survival field guide.</b> A4 illustrated plates printed on artificially aged parchment paper.',

      // Section 06: Other Sets
      '#sets .eyebrow': '<b>06</b> · Scenic Sets',
      '#sets h2': 'From German international airport signage to an upside-down bakery.',
      '#sets .lede': 'Every production demands a bespoke kit of graphic assets. For an O Boticário commercial, German-language airport wayfinding, transit notices, and parenting book jackets. For Invertidamente (TV Globo), rooms sit inside a rotating mechanical box, requiring loose set items to be supplied as rigid cut-out prints with vector die-lines.',
      '#sets figcaption': '<b>Set props by production.</b> Authentic pre-press graphics. Dimensions pulled directly from production filenames.',

      // Process Section
      '#processo .eyebrow': 'Pre-Press Process',
      '#processo h2': 'The file leaves the workstation complete with dimensions, material specs, and die-lines.',
      '#processo .lede': 'The commercial print shop opens the vector file without having sat in the director’s meeting. That is why every asset embeds metric dimensions in its filename, large scenic formats follow strict 10% scaling, plotter cut-paths are separated from print passes, and vehicle liveries include visual assembly manuals.',
      '#processo .pf-card:nth-child(1) .tag': 'Dimensions in Filename',
      '#processo .pf-card:nth-child(1) p': 'Seal was delivered in 9 calibrated sizes (8 to 45 cm) across 3 colorways, named <code>logo_confeitaria_15cm_faca</code>. Bottle labels follow the same rigor: <code>rotulo_6_145x105</code> signifies label 6 at 14.5 × 10.5 cm.',
      '#processo .pf-card:nth-child(2) .tag': 'Printed vs. Vinyl Cut',
      '#processo .pf-card:nth-child(3) .tag': 'Assembly Guides',
      '#processo .pf-card:nth-child(4) .tag': 'Clear Adhesive Vinyl',
      '#processo .callout': '<b>What film art departments require:</b> pre-press files that rip seamlessly at the print shop without delays, doubts, or color drifts on filming day.',

      // Footer
      '.pf-footer .eyebrow': 'Next Case',
      '.pf-footer h2': 'Let’s talk?',
      '.pf-footer p': 'On-set graphics, commercial prop packages, or large-format scenic prints: I can showcase source vector files and workflows live.',
      '.pf-base span:nth-child(2)': 'TV & Advertising · On-Set Graphic Design'
    },

    es: {
      // Nav
      '.pf-links a[href="#marcas"]': 'Marcas',
      '.pf-links a[href="#dna"]': 'ADN del Delito',
      '.pf-links a[href="#cartazes"]': 'Carteles',
      '.pf-links a[href="#rio-shore"]': 'Rio Shore',
      '.pf-links a[href="#se-sobreviver"]': 'Reality de Supervivencia',
      '.pf-links a[href="#sets"]': 'Sets',

      // Hero
      '.pf-hero .eyebrow': '<b>Caso 08</b> · Diseño Gráfico de Escena · Publicidad y TV',
      '.pf-hero h1': 'Marcas, carteles y paredes que no existen, <em>diseñados para resistir el primer plano.</em>',
      '.pf-hero .lede': 'Diseño gráfico de utilería y escena para anuncios comerciales, series de televisión y programas de entretenimiento: etiquetas, packaging, cartelería callejera, papel mural de gran formato, señalización, rotulación de vehículos policiales, cartas y mapas que aparecen pocos segundos en pantalla y deben resultar 100% verosímiles.',
      '.pf-meta div:nth-child(1) dt': 'Rol',
      '.pf-meta div:nth-child(1) dd': 'Diseñador gráfico de escena y atrezzo',
      '.pf-meta div:nth-child(2) dt': 'Series y Programas',
      '.pf-meta div:nth-child(2) dd': 'ADN del Delito (Netflix) · Rio Shore (MTV) · Se Sobreviver, Case (Globoplay) · Em Família com Eliana (Globo) · Match nas Estrelas (Prime Video)',
      '.pf-meta div:nth-child(3) dt': 'Campañas Publicitarias',
      '.pf-meta div:nth-child(3) dd': 'Bradesco · O Boticário · Betbet · Itaipava',
      '.pf-meta div:nth-child(4) dt': 'Entregables',
      '.pf-meta div:nth-child(4) dd': 'Marcas ficticias, etiquetas, cartelería, escenografía impresa, rotulación vehicular, barajas, mapas e ilustración',

      // Context
      '#contexto .eyebrow': 'El Trabajo',
      '#contexto h2': 'Pocos segundos en pantalla, con el rigor de una marca auténtica.',
      '#contexto .lede': 'En un rodaje publicitario o cinematográfico, prácticamente nada del fondo existe fuera del plató. Un bar requiere botellas creíbles, la calle pide carteles pegados, una comisaría necesita avisos oficiales y los coches patrulla exigen gráficos vectoriales. El diseñador de escena crea la marca ficticia, resuelve el arte y prepara el archivo listo para imprenta con medidas, soportes y troqueles.',
      '#contexto .callout': '<b>La premisa en cada producción:</b> una pieza que parezca real ante cámaras de cine 4K y un archivo técnico que la imprenta fabrique sin necesidad de consultar nada.',
      '#contexto .pb-count > div:nth-child(1) .tag': 'Etiquetas',
      '#contexto .pb-count > div:nth-child(1) p': 'etiquetas de bebidas inventadas, numeradas de 1 a 16 con medidas métricas en el propio nombre de archivo.',
      '#contexto .pb-count > div:nth-child(2) .tag': 'Vehículos',
      '#contexto .pb-count > div:nth-child(2) p': 'kits de rotulación vehicular para ADN del Delito: patrullas de 12 fuerzas policiales de Brasil y Paraguay y furgones blindados.',
      '#contexto .pb-count > div:nth-child(3) .tag': 'Mapas',
      '#contexto .pb-count > div:nth-child(3) p': 'versiones del mapa ilustrado de la isla para el reality de Globoplay, cada una con coordenadas tácticas diferentes.',

      // Section 01: Marcas
      '#marcas .eyebrow': '<b>01</b> · Marcas Ficticias',
      '#marcas h2': 'Una botella en escena necesita etiqueta, y la etiqueta requiere una marca.',
      '#marcas .lede': 'Whisky japonés, amaro milanés, champán de Reims, bourbon de Kentucky, tequila reposado, ginebra, vodka y agua mineral: todas inventadas. Con procedencia, año fundacional, graduación alcohólica y letra pequeña legal. En una de ellas, el apellido del diseñador se convirtió en la casa productora: Maison Placido, 1774.',
      '#marcas .tag-row:nth-of-type(1) .pill:nth-child(1)': 'Interactivo',
      '#marcas .tag-row:nth-of-type(1) .pill:nth-child(2)': 'Selecciona una etiqueta',
      '#marcas figcaption:nth-of-type(1)': '<b>Etiquetas de bebidas.</b> Artes finales de producción reales empleadas en rodaje. Medidas procedentes de los nombres de archivo.',
      '#marcas .tag-row:nth-of-type(2) .pill:nth-child(1)': 'Ampliar',
      '#marcas .tag-row:nth-of-type(2) .pill:nth-child(2)': 'Comercios, clubes y productos',
      '#marcas figcaption:nth-of-type(2)': '<b>Marcas de comercio, clubes de fútbol y bienes de consumo.</b> Diseños reales creados para campañas de Bradesco, Betbet y televisión.',

      // Section 02: ADN del Delito
      '#dna .eyebrow': '<b>02</b> · ADN del Delito (Netflix)',
      '#dna h2': 'Todo un Paraguay de marcas que jamás existieron.',
      '#dna .lede': 'ADN del Delito es la superproducción policial de Netflix en la que agentes federales investigan un atraco histórico en la frontera. Para ambientar calles, almacenes y cantinas de ambos países, se diseñaron cervezas, refrescos, cachaças y guaranás ficticios con cartelería en A3 y A4.',
      '#dna figcaption:nth-of-type(1)': '<b>Carteles de marcas ficticias.</b> Artes finales impresos en A3 y A4 para ambientación de escena.',
      '#dna figcaption:nth-of-type(2)': '<b>Carteles callejeros, pizarras de precios y cartelería oficial para la comisaría.</b>',
      '#dna figcaption:nth-of-type(3)': '<b>Rotulación de vehículos policiales.</b> Cada cuerpo policial contó con un kit de piezas vectoriales y una guía técnica de montaje que indica la colocación exacta en chapa.',

      // Section 03: Carteles
      '#cartazes .eyebrow': '<b>03</b> · Cartelería de Escena',
      '#cartazes h2': 'En la pared del decorado, el cartel comunica el contexto de la escena.',
      '#cartazes .lede': 'Carteles pegados con frases populares, rótulos para fiestas tradicionales, folletos de literatura de cordel, pizarras de cafetería y afiches de carnaval. Cada plató exige una textura gráfica singular.',
      '#cartazes .fl-chips button:nth-child(1)': 'Todos',
      '#cartazes .fl-chips button:nth-child(5)': 'Rótulos',
      '#cartazes .fl-chips button:nth-child(6)': 'Cordel y Comida',
      '#cartazes .fl-chips button:nth-child(7)': 'Pósteres',
      '#cartazes figcaption': '<b>Carteles, rótulos y tipografía urbana.</b> Archivos de imprenta reales de A4 a A1.',

      // Section 04: Rio Shore
      '#rio-shore .eyebrow': '<b>04</b> · Rio Shore (MTV)',
      '#rio-shore h2': 'Una pared de 13 metros se imprime en nueve láminas.',
      '#rio-shore .lede': 'Rio Shore es el reality de MTV grabado en una villa en Búzios. La casa se vistió con cuatro modelos de papel mural, un suelo inspirado en las ondas de Copacabana y una baraja de Verdad o Reto.',
      '#rio-shore .st-tabs button:nth-child(1)': 'Azul',
      '#rio-shore .st-tabs button:nth-child(2)': 'Roja',
      '#rio-shore .st-tabs button:nth-child(3)': 'Tipográfica',
      '#rio-shore .st-tabs button:nth-child(4)': 'Amarilla',
      '#rio-shore .wl-mode button:nth-child(1)': 'Láminas',
      '#rio-shore .wl-mode button:nth-child(2)': 'Pared Montada',
      '#rio-shore figcaption:nth-of-type(1)': '<b>Papel mural escenográfico.</b> Láminas de producción impresas en piezas de 1,47 m.',
      '#rio-shore figcaption:nth-of-type(2)': '<b>Suelo escénico.</b> Tira continua a escala y baldosa modular.',
      '#rio-shore .cd-side .cd-count': 'Baraja Rio Shore',
      '#rio-shore .cd-side p': 'El reverso lleva el logo de Rio Shore y MTV sobre el dibujo de Copacabana. El anverso plantea una pregunta o reto por carta.',
      '#rio-shore .cd-btn': 'Sacar una carta',
      '#rio-shore figcaption:nth-of-type(3)': '<b>Baraja de Verdad o Reto.</b> 100 cartas de verdad, 56 de reto y comodines para rodaje.',

      // Section 05: Se Sobreviver, Case
      '#se-sobreviver .eyebrow': '<b>05</b> · Reality de Supervivencia',
      '#se-sobreviver h2': 'Un mapa de la isla en 21 ediciones tácticas.',
      '#se-sobreviver .lede': 'Reality de Globoplay donde parejas aisladas en una isla desierta ponen a prueba su relación. El mapa ilustrado de la isla se imprimió en 21 versiones A3 con localizaciones clave señaladas.',
      '#se-sobreviver figcaption:nth-of-type(1)': '<b>Mapa ilustrado de la isla.</b> Archivos de producción A3 con coordenadas tácticas destacadas.',
      '#se-sobreviver figcaption:nth-of-type(2)': '<b>Manual de supervivencia ilustrado.</b> Láminas ilustradas en formato A4 sobre papel envejecido.',

      // Section 06: Sets
      '#sets .eyebrow': '<b>06</b> · Sets de Rodaje',
      '#sets h2': 'Del aeropuerto alemán a una panadería boca abajo.',
      '#sets .lede': 'Cada rodaje precisa soluciones específicas: señalética bilingüe en alemán para Boticário, o atrezzo impreso con troqueles rígidos para el decorado giratorio de Eliana.',
      '#sets figcaption': '<b>Elementos gráficos por plató.</b> Archivos de imprenta técnicos.',

      // Process
      '#processo .eyebrow': 'Proceso Técnico',
      '#processo h2': 'El archivo sale de pantalla con medidas, soporte y líneas de corte.',
      '#processo .lede': 'La imprenta debe producir sin margen de error. Por ello cada pieza incluye cotas métricas en el nombre, los grandes formatos siguen escalas proporcionales y la rotulación incluye guías de montaje.',
      '#processo .pf-card:nth-child(1) .tag': 'Medidas en el Nombre',
      '#processo .pf-card:nth-child(1) p': 'El sello de pastelería se produjo en 9 tamaños (8 a 45 cm) bajo la nomenclatura <code>logo_confeitaria_15cm_faca</code>.',
      '#processo .pf-card:nth-child(2) .tag': 'Impreso o Troquelado',
      '#processo .pf-card:nth-child(3) .tag': 'Guías de Montaje',
      '#processo .pf-card:nth-child(4) .tag': 'Adhesivo Transparente',
      '#processo .callout': '<b>Lo que exige el departamento de arte:</b> archivos impecables que entren en máquina sin dudas ni retrasos el día de grabación.',

      // Footer
      '.pf-footer .eyebrow': 'Siguiente caso',
      '.pf-footer h2': '¿Hablamos?',
      '.pf-footer p': 'Diseño de utilería gráfica, marcas de ficción o escenografía de gran formato: puedo mostrar los archivos de trabajo en directo.',
      '.pf-base span:nth-child(2)': 'Publicidad y TV · Diseño Gráfico de Escena'
    },

    fr: {
      // Nav
      '.pf-links a[href="#marcas"]': 'Marques',
      '.pf-links a[href="#dna"]': 'Le Code du Crime',
      '.pf-links a[href="#cartazes"]': 'Affiches',
      '.pf-links a[href="#rio-shore"]': 'Rio Shore',
      '.pf-links a[href="#se-sobreviver"]': 'Téléréalité Survie',
      '.pf-links a[href="#sets"]': 'Décors',

      // Hero
      '.pf-hero .eyebrow': '<b>Cas 08</b> · Graphisme de Plateau · Publicité & Télévision',
      '.pf-hero h1': 'Marques, affiches et décors fictifs, <em>conçus pour résister au très gros plan.</em>',
      '.pf-hero .lede': 'Conception graphique d’accessoires pour spots publicitaires, séries de fiction et émissions de télévision : étiquettes de bouteilles, emballages, affiches de rue, papiers peints scénographiques grand format, marquages de véhicules d’intervention, jeux de cartes et cartes géographiques illustrées qui n’apparaissent que quelques secondes à l’écran et doivent sembler incontestablement réels. Tous les projets présentés ont été diffusés.',
      '.pf-meta div:nth-child(1) dt': 'Rôle',
      '.pf-meta div:nth-child(1) dd': 'Designer graphique d’accessoires et de plateau',
      '.pf-meta div:nth-child(2) dt': 'Séries & Émissions',
      '.pf-meta div:nth-child(2) dd': 'Le Code du Crime (Netflix) · Rio Shore (MTV) · Se Sobreviver, Case (Globoplay) · Em Família com Eliana (Globo) · Match nas Estrelas (Prime Video)',
      '.pf-meta div:nth-child(3) dt': 'Campagnes Publicitaires',
      '.pf-meta div:nth-child(3) dd': 'Bradesco · O Boticário · Betbet · Itaipava',
      '.pf-meta div:nth-child(4) dt': 'Livrables',
      '.pf-meta div:nth-child(4) dd': 'Marques fictives, étiquettes, affiches urbaines, décors scéniques imprimés, marquage de flotte, cartes à jouer, cartographie et tracés vectoriels de découpe',

      // Context
      '#contexto .eyebrow': 'Le Projet',
      '#contexto h2': 'Quelques secondes à l’écran, avec la finition d’une marque authentique.',
      '#contexto .lede': 'Sur un tournage de fiction ou un spot publicitaire, presque rien de ce qui apparaît en arrière-plan n’existe dans le monde réel. Un bar exige des bouteilles crédibles, une ruelle requiert des affiches érodées, un commissariat demande des avis administratifs et les voitures d’intervention réclament des insignes officiels. Le chef décorateur fournit le brief ; le graphiste imagine la marque, exécute le graphisme et livre des fichiers d’impression impeccables avec cotes et tracés de découpe.',
      '#contexto .callout': '<b>L’impératif sur chaque projet :</b> un accessoire qui résiste au gros plan des caméras cinéma 4K et un fichier d’exécution que l’imprimeur produit sans hésiter.',
      '#contexto .pb-count > div:nth-child(1) .tag': 'Étiquettes',
      '#contexto .pb-count > div:nth-child(1) p': 'étiquettes de spiritueux fictifs numérotées de 1 à 16, intégrant leurs cotes en centimètres dans le nom de fichier.',
      '#contexto .pb-count > div:nth-child(2) .tag': 'Véhicules',
      '#contexto .pb-count > div:nth-child(2) p': 'kits de marquage adhésif pour Le Code du Crime (Netflix) : véhicules de 12 brigades d’intervention brésiliennes et paraguayennes et fourgons blindés.',
      '#contexto .pb-count > div:nth-child(3) .tag': 'Cartographie',
      '#contexto .pb-count > div:nth-child(3) p': 'déclinaisons de la carte de l’île pour l’émission de survie de Globoplay, signalant des coordonnées tactiques d’épisodes.',

      // Section 01: Fictional Brands
      '#marcas .eyebrow': '<b>01</b> · Marques Fictives',
      '#marcas h2': 'Une bouteille en scène a besoin d’une étiquette, et l’étiquette a besoin d’une marque.',
      '#marcas .lede': 'Whisky japonais, amaro milanais, vin mousseux de Reims, bourbon du Kentucky, tequila reposado, gin, vodka et eau minérale : entièrement inventés. Chaque création intègre pays d’origine, millésime de fondation, degré d’alcool et mentions légales en corps réduit. Sur l’une d’elles, le patronyme du designer signe la maison de négoce : Maison Placido, 1774.',
      '#marcas .tag-row:nth-of-type(1) .pill:nth-child(1)': 'Interactif',
      '#marcas .tag-row:nth-of-type(1) .pill:nth-child(2)': 'Choisissez une étiquette',
      '#marcas figcaption:nth-of-type(1)': '<b>Étiquettes de boissons.</b> Fichiers d’impression réels utilisés sur plateau. Dimensions issues des noms de fichiers ; étiquettes transparentes sur vinyle adhésif incolore.',
      '#marcas .tag-row:nth-of-type(2) .pill:nth-child(1)': 'Agrandir',
      '#marcas .tag-row:nth-of-type(2) .pill:nth-child(2)': 'Boutiques, clubs et produits',
      '#marcas figcaption:nth-of-type(2)': '<b>Enseignes commerciales, clubs de football et produits de grande consommation.</b> Fichiers d’exécution réels créés pour des spots publicitaires.',

      // Section 02: Le Code du Crime
      '#dna .eyebrow': '<b>02</b> · Le Code du Crime (Netflix)',
      '#dna h2': 'Tout un Paraguay de marques qui n’ont jamais existé.',
      '#dna .lede': 'Le Code du Crime est la série d’action policière phare de Netflix où des agents fédéraux enquêtent sur un braquage d’envergure à la frontière. Pour habiller rues, épiceries et commerces des deux côtés, bières, sodas, cachaças et boissons énergisantes ont été créés sur mesure avec slogans en espagnol ou en portugais, tirés aux formats A3 et A4.',
      '#dna figcaption:nth-of-type(1)': '<b>Affiches de marques fictives.</b> Documents d’impression d’époque tirés en A3 et A4 pour l’habillage décor.',
      '#dna figcaption:nth-of-type(2)': '<b>Affichage sauvage, panonceaux d’épicerie et campagnes de prévention pour commissariat.</b>',
      '#dna figcaption:nth-of-type(3)': '<b>Marquage des véhicules de police.</b> Chaque force d’intervention a reçu une planche de découpe vinyle et un schéma d’application indiquant l’emplacement des adhésifs.',

      // Section 03: Affiches
      '#cartazes .eyebrow': '<b>03</b> · Affichage de Plateau',
      '#cartazes h2': 'Sur le mur du décor, l’affiche pose instantanément l’ambiance.',
      '#cartazes .lede': 'Affichage sauvage collé à la farine, lettrages de fête folklorique, livrets de littérature populaire gravés sur bois, menus de cantine et affiches de carnaval. Chaque décor impose une patine différente où la typographie assure la narration.',
      '#cartazes .fl-chips button:nth-child(1)': 'Tous',
      '#cartazes .fl-chips button:nth-child(5)': 'Lettrages',
      '#cartazes .fl-chips button:nth-child(6)': 'Folklore & Cuisine',
      '#cartazes .fl-chips button:nth-child(7)': 'Affiches',
      '#cartazes figcaption': '<b>Affiches, collages et lettrages peints.</b> Fichiers de fabrication réels du format A4 au format A1.',

      // Section 04: Rio Shore
      '#rio-shore .eyebrow': '<b>04</b> · Rio Shore (MTV)',
      '#rio-shore h2': 'Un mur scénique de 13 mètres imprimé en neuf lés.',
      '#rio-shore .lede': 'Rio Shore est l’émission de téléréalité de MTV tournée dans une villa à Búzios. Le décor a été habillé de quatre papiers peints personnalisés, d’un sol reprenant les vagues de Copacabana et d’un jeu de cartes Action ou Vérité.',
      '#rio-shore .st-tabs button:nth-child(1)': 'Bleu',
      '#rio-shore .st-tabs button:nth-child(2)': 'Rouge',
      '#rio-shore .st-tabs button:nth-child(3)': 'Typographique',
      '#rio-shore .st-tabs button:nth-child(4)': 'Jaune',
      '#rio-shore .wl-mode button:nth-child(1)': 'Lés',
      '#rio-shore .wl-mode button:nth-child(2)': 'Mur Assemblé',
      '#rio-shore figcaption:nth-of-type(1)': '<b>Papiers peints scénographiques.</b> Fichiers réels en lés de 1,47 m dans l’ordre de pose.',
      '#rio-shore figcaption:nth-of-type(2)': '<b>Revêtement de sol scénique.</b> Bande continue à l’échelle 10% et carreau modulaire.',
      '#rio-shore .cd-side .cd-count': 'Jeu de Cartes Rio Shore',
      '#rio-shore .cd-side p': 'Le dos arbore les logos Rio Shore et MTV sur le motif de Copacabana. La face propose un défi ou une question par carte.',
      '#rio-shore .cd-btn': 'Tirer une carte',
      '#rio-shore figcaption:nth-of-type(3)': '<b>Jeu de cartes Action ou Vérité.</b> 100 vérités, 56 actions et jokers fabriqués pour le tournage.',

      // Section 05: Téléréalité Survie
      '#se-sobreviver .eyebrow': '<b>05</b> · Téléréalité de Survie',
      '#se-sobreviver h2': 'Une carte de l’île en 21 versions scénarisées.',
      '#se-sobreviver .lede': 'Émission de survie de Globoplay où des couples isolés sur une île testent leur solidité. La carte illustrée a été déclinée en 21 versions A3 identifiant les abris et caisses de ravitaillement.',
      '#se-sobreviver figcaption:nth-of-type(1)': '<b>Cartographie de l’île.</b> Tirages d’impression A3 avec repères concentriques de localisation.',
      '#se-sobreviver figcaption:nth-of-type(2)': '<b>Manuel illustré de survie.</b> Planches au format A4 imprimées sur papier vieilli.',

      // Section 06: Décors
      '#sets .eyebrow': '<b>06</b> · Plateaux & Décors',
      '#sets h2': 'De l’aéroport allemand à la boulangerie inversée.',
      '#sets .lede': 'Chaque production réclame des accessoires spécifiques : signalétique en allemand pour O Boticário ou accessoires factices découpés sur support rigide pour le plateau tournant d’Eliana.',
      '#sets figcaption': '<b>Accessoires par plateau.</b> Fichiers d’exécution d’accessoires réels.',

      // Process
      '#processo .eyebrow': 'Méthodologie Prépresse',
      '#processo h2': 'Le document intègre dimensions, matière et repères d’usinage.',
      '#processo .lede': 'L’atelier d’impression ne participe pas aux réunions de mise en scène. C’est pourquoi chaque fichier porte ses dimensions en centimètres dans son titre, les formats monumentaux sont montés à l’échelle et les marquages de véhicules s’accompagnent d’un guide de pose.',
      '#processo .pf-card:nth-child(1) .tag': 'Cotes dans le Titre',
      '#processo .pf-card:nth-child(1) p': 'L’enseigne a été déclinée en 9 diamètres (8 à 45 cm) nommés <code>logo_confeitaria_15cm_faca</code>.',
      '#processo .pf-card:nth-child(2) .tag': 'Impression ou Découpe',
      '#processo .pf-card:nth-child(3) .tag': 'Plans de Montage',
      '#processo .pf-card:nth-child(4) .tag': 'Adhésif Transparent',
      '#processo .callout': '<b>L’exigence de la régie générale :</b> des fichiers conformes qui s’impriment sans retard ni hésitation le matin du tournage.',

      // Footer
      '.pf-footer .eyebrow': 'Projet suivant',
      '.pf-footer h2': 'Discutons-en ?',
      '.pf-footer p': 'Graphisme de plateau, packaging fictif ou décors grand format : je peux vous présenter les fichiers sources vectoriels et méthodologies en direct.',
      '.pf-base span:nth-child(2)': 'Publicité & TV · Graphisme de Plateau'
    }
  };

  if (window.PORTFOLIO_I18N && window.PORTFOLIO_I18N.registerCase) {
    window.PORTFOLIO_I18N.registerCase(CASE_SLUG, translations);
  } else {
    window.PORTFOLIO_CASES_I18N = window.PORTFOLIO_CASES_I18N || {};
    window.PORTFOLIO_CASES_I18N[CASE_SLUG] = translations;
  }
})();

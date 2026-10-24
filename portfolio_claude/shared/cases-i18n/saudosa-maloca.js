/**
 * Case Study Translations: Saudosa Maloca Feature Film Prop Graphic Design
 * Languages: EN, ES, FR (PT original preserved)
 */
(function() {
  var CASE_SLUG = 'saudosa-maloca';

  var translations = {
    en: {
      // Nav
      '.pf-links a[href="#titulo"]': 'Title Sign',
      '.pf-links a[href="#epocas"]': 'Dual Eras',
      '.pf-links a[href="#marcas"]': 'Brands',
      '.pf-links a[href="#especulacao"]': 'Real Estate',
      '.pf-links a[href="#sets"]': 'Sets',
      '.pf-links a[href="#deck"]': 'Pitch Deck',

      // Hero
      '.pf-hero .eyebrow': '<b>Case 04</b> · On-Set Graphic Design · Cinema Prop Design',
      '.pf-hero h1': 'A lost historic São Paulo, <em>reconstructed in enamel street signs and vintage labels.</em>',
      '.pf-hero .lede': 'On-set graphic design for Saudosa Maloca, Pink Flamingo Filmes’ feature film inspired by the samba lyrics of Adoniran Barbosa: title street sign, fictional brands, beverage labels, street fly-posters, and architectural facades spanning the 1950s and 1980s. Prior to principal photography, also designed the investor financing pitch deck. Released in theaters nationwide.',
      '.pf-meta div:nth-child(1) dt': 'Role',
      '.pf-meta div:nth-child(1) dd': 'Feature Film On-Set Graphic Designer',
      '.pf-meta div:nth-child(2) dt': 'Client',
      '.pf-meta div:nth-child(2) dd': 'Pink Flamingo Filmes · 2022–2024',
      '.pf-meta div:nth-child(3) dt': 'Deliverables',
      '.pf-meta div:nth-child(3) dd': 'Main title street plaque, 1950s and 1980s on-set props, and investor financing pitch deck',
      '.pf-meta div:nth-child(4) dt': 'Feature Film',
      '.pf-meta div:nth-child(4) dd': 'Directed by Pedro Serrano · Theatrical release March 21, 2024 · Prime Video',

      // Context
      '#contexto .eyebrow': 'The Film',
      '#contexto h2': 'Sambas that are already cinematic screenplays waiting to be shot.',
      '#contexto .lede': 'Saudosa Maloca is a comedic drama based on the immortal songs of Adoniran Barbosa. In the 1980s, an aging Adoniran (Paulo Miklos) recounts stories of a vanishing São Paulo to a young bartender: the beloved shanty shack ("maloca") he shared with friends Joca and Mato Grosso, Bohemian samba circles in the Bixiga district, and Sunday feasts. In the end, urban real estate speculation and the shack’s demolition mark the irreversible close of an era.',
      '#contexto .callout': '<b>Brief:</b> Create the entire visual and graphic ecosystem of the film across two contrasting historical eras; before production, craft the comprehensive investor deck that pitched the feature to cultural funds and sponsors.',
      '#contexto .sm-count > div:nth-child(1) .tag': 'Dual Eras',
      '#contexto .sm-count > div:nth-child(1) p': 'The narrative moves between 1950s and 1980s São Paulo, with each era demanding its own historically coherent commercial brands.',
      '#contexto .sm-count > div:nth-child(2) .tag': 'Art List',
      '#contexto .sm-count > div:nth-child(2) p': 'props cataloged by set location, scene number, quantity, dimensions, and substrate specifications.',
      '#contexto .sm-count > div:nth-child(3) .tag': 'Print Runs',
      '#contexto .sm-count > div:nth-child(3) p': 'production batches delivered to commercial print shops between Dec 2022 and Jan 2023 as filming commenced.',

      // Section 01: Title Sign
      '#titulo .eyebrow': '<b>01</b> · Title Signage',
      '#titulo h2': 'The film title takes the form of an authentic enamel corner street sign.',
      '#titulo .lede': 'The title plaque faithfully recreates São Paulo’s iconic 20th-century cobalt enamel street signs: deep navy blue field, crisp white border fillet, and condensed sans-serif lettering. The exact manufacturing system was replicated for location street dressing, mounting printed rigid styrene signs over modern location plaques with high-tack mounting tape.',
      '#titulo .tag-row .pill:nth-child(1)': 'Interactive',
      '#titulo .tag-row .pill:nth-child(2)': 'Choose a street corner',
      '.ti-main .ti-k': 'Title Plaque',
      '.ti-corner .ti-k': 'On-Set Street Signs · 57 × 30 cm',
      '#titulo figcaption': '<b>Title plaque and authentic on-set street signs.</b> The title plaque opened the pitch deck; the street signs are production print mechanicals filmed on location.',

      // Section 02: Eras
      '#epocas .eyebrow': '<b>02</b> · Dual Eras',
      '#epocas h2': 'The exact same commercial brands, thirty years later.',
      '#epocas .lede': 'The story shifts back and forth between the 1950s and 1980s, and the neighborhood tavern appears in both timelines. Certain legacy brands evolved naturally across three decades: Clara Beer transitioned from mid-century cursive script draft to condensed industrial pilsner cans; Refres Frut soda adopted 2-liter family plastic bottles. Others were displaced by modern competitors: Aurora cigarettes became Demar; Maxlumi matches gave way to Maxluli. Even paper banknotes evolved with national inflation.',
      '#epocas .tag-row .pill:nth-child(1)': 'Interactive',
      '#epocas .tag-row .pill:nth-child(2)': 'Toggle era on sign',
      '#epocas figcaption': '<b>Paired production mechanicals, one per era.</b> Authentic bottle labels and posters filmed on camera. Banknotes are historical recreations. Click any asset to inspect.',

      // Section 03: Fictional Brands
      '#marcas .eyebrow': '<b>03</b> · Fictional Brands',
      '#marcas h2': 'Fictional brands that feel like they have always been there.',
      '#marcas .lede': 'Bottles, tins, and cigarette packs dressing the tavern and the maloca feature bespoke fictional brands, each complete with era-accurate packaging, slogans, and industrial factory addresses. Beer bottle labels were printed in runs of 200 units per era on die-cut adhesive vinyl for standard 600 ml amber glass bottles. Every fictitious business name underwent legal clearances before reaching pre-press.',
      '#marcas .tag-row .pill:nth-child(1)': 'Interactive',
      '#marcas .tag-row .pill:nth-child(2)': 'Select a label',
      '#marcas figcaption': '<b>Labels and cigarette packs.</b> Authentic production pre-press graphics used on set. Dimensions and substrates cataloged from production archives.',
      '#marcas .callout': '<b>Cleared Brand Names.</b> The prop list supplied legal alternatives for every business: clearances approved Madame Norita for the boutique, Café Paulistano for the diner, and Rádio Cruzeiro do Sul for the broadcast station.',

      // Section 04: Real Estate Speculation
      '#especulacao .eyebrow': '<b>04</b> · Speculation & Gentrification',
      '#especulacao h2': 'Real estate speculation encroaches on walls long before bulldozing the shack.',
      '#especulacao .lede': 'The demolition of the maloca concludes the film’s tragic arc. Prior to the wrecking ball, the visual city foreshadows the impending boom: development paste-ups plastered across brick walls, billboard hoardings behind the tavern, architectural blueprints, notarized purchase agreements, and municipal eviction notices. Nearly all bearing the corporate hallmark of fictional developer Pereira & Luccini.',
      '#especulacao .tag-row .pill:nth-child(1)': 'Zoom',
      '#especulacao .tag-row .pill:nth-child(2)': 'Click on a poster',
      '#especulacao figcaption': '<b>Real estate speculation props.</b> Authentic production files: fly-posters on uncalendered kraft, roadside billboards on matte vinyl, architectural blueprint on A1 newsprint, and eviction notice on city letterhead.',

      // Section 05: Sets
      '#sets .eyebrow': '<b>05</b> · Set Architecture',
      '#sets h2': '60+ dedicated props, mapped set by set, scene by scene.',
      '#sets .lede': 'Graphic prop design followed a comprehensive art department breakdown listing set locations, scene numbers, run quantities, substrate specifications, and mechanical tolerances. Each filming environment possessed a unique graphic palette: Bleque Tais tavern in both eras, Cruzeiro do Sul radio station, public avenues, and period actor hand-props.',
      '#stT-bar': 'Bleque Tais Tavern',
      '#stT-radio': 'Cruzeiro do Sul Radio',
      '#stT-rua': 'Streets & Signage',
      '#stT-papeis': 'Hero Paper Props',
      '#sets figcaption': '<b>Props organized by set.</b> Authentic pre-press files filmed on camera; banknote frame captured from uncorrected raw footage on Jan 11, 2023.',

      // Section 06: Pitch Deck
      '#deck .eyebrow': '<b>06</b> · Investor Pitch Deck',
      '#deck h2': 'Before filming began, the same graphic universe sold the project.',
      '#deck .lede': 'Designed the feature film’s investor financing deck in November 2022. It leveraged the tactile textures of the city the film celebrates: weathered red brick, peeling plaster, aged newsprint, and enamel street plaques introducing each chapter. Even business slides embraced historical immersion: sponsorship tiers mounted as street signage and production schedules set as industrial enamel plates.',
      '#deck .tag-row .pill:nth-child(1)': 'Interactive',
      '#deck .tag-row .pill:nth-child(2)': 'Tap sign or use arrow keys',
      '#deck figcaption': '<b>Financing pitch deck, November 2022.</b> Authentic presentation slides exported from master production files.',

      // Visual System
      '#sistema .eyebrow': 'Visual System',
      '#sistema h2': 'Two historical eras, two distinctive palettes.',
      '#sistema .lede': 'The 1950s embrace cream unbleached paper, line illustrations, and modest two-color spot palettes: vermilion red, forest green, navy blue, and mustard. The 1980s transition toward photography, dense condensed typography, deep petrol, bold black, and synthetic cadmium yellows.',
      '#sistema .pf-card:nth-child(1) .tag': 'Color System',
      '#sistema .pf-card:nth-child(1) .pal:nth-child(2) span': '1950s Palette',
      '#sistema .pf-card:nth-child(1) .pal:nth-child(3) span': '1980s Palette',
      '#sistema .pf-card:nth-child(1) .sys-n': 'Colors extracted from production masters: Aurora, Clara, Wald, and Dona Aurea in the 50s; Clara, Refres Frut, and Demar in the 80s.',
      '#sistema .pf-card:nth-child(2) .tag': 'Typography',
      '#sistema .pf-card:nth-child(3) .tag': 'Historical Research',

      // Results
      '#resultado .eyebrow': 'Release & Reception',
      '#resultado h2': 'From the print shop to the set, from the set to the cinema screen.',
      '#resultado .lede': 'Props were released in four print runs between December 2022 and January 2023, with principal photography wrapping in late January. Saudosa Maloca premiered at the 47th São Paulo International Film Festival (Mostra) in October 2023, debuted across movie theaters nationwide on March 21, 2024 via Elo Studios, and is now streaming on Prime Video.',
      '#resultado .sm-links a:nth-child(1)': 'Watch on Prime Video ↗',
      '#resultado .sm-links a:nth-child(2)': 'Trailer on YouTube ↗',
      '#resultado figcaption': '<b>Official theatrical trailer.</b> Distributed by Elo Studios and Ingresso.com. Player background features peeling wall texture from the deck.',
      '#resultado .callout': '<b>Credits.</b> Saudosa Maloca is a Pink Flamingo Filmes production directed by Pedro Serrano, produced by Serrano and Renata Martins, with production design by Cláudia Terçarolli. On-set graphic design and pitch deck: Erik Placido.',

      // Footer
      '.pf-footer .eyebrow': 'Next Case',
      '.pf-footer h2': 'Let’s talk?',
      '.pf-footer p': 'Film graphic prop design, period branding, or investor financing decks: I can present complete production files and workflows live.',
      '.pf-base span:nth-child(2)': 'Saudosa Maloca · Pink Flamingo Filmes'
    },

    es: {
      // Nav
      '.pf-links a[href="#titulo"]': 'Placa Título',
      '.pf-links a[href="#epocas"]': 'Dos Épocas',
      '.pf-links a[href="#marcas"]': 'Marcas',
      '.pf-links a[href="#especulacao"]': 'Especulación',
      '.pf-links a[href="#sets"]': 'Sets',
      '.pf-links a[href="#deck"]': 'Dossier de Venta',

      // Hero
      '.pf-hero .eyebrow': '<b>Caso 04</b> · Diseño Gráfico · Cine de Época',
      '.pf-hero h1': 'Un São Paulo que ya no existe, <em>reconstruido en placas esmaltadas y etiquetas.</em>',
      '.pf-hero .lede': 'Diseño gráfico de escena para Saudosa Maloca, largometraje de Pink Flamingo Filmes basado en los sambas de Adoniran Barbosa: la placa-título, marcas ficticias, etiquetas, cartelería callejera y rótulos comerciales de los años 50 y 80. Antes del rodaje, diseño integral del dossier de captación de financiación.',
      '.pf-meta div:nth-child(1) dt': 'Rol',
      '.pf-meta div:nth-child(1) dd': 'Diseñador gráfico de utilería y escena',
      '.pf-meta div:nth-child(2) dt': 'Cliente',
      '.pf-meta div:nth-child(2) dd': 'Pink Flamingo Filmes · 2022–2024',
      '.pf-meta div:nth-child(3) dt': 'Entregables',
      '.pf-meta div:nth-child(3) dd': 'Placa-título, utilería gráfica de los años 50 y 80 y dossier de captación',
      '.pf-meta div:nth-child(4) dt': 'Película',
      '.pf-meta div:nth-child(4) dd': 'Dirección de Pedro Serrano · En cines 21 de marzo de 2024 · Prime Video',

      // Context
      '#contexto .eyebrow': 'La Película',
      '#contexto h2': 'Sambas que ya son guiones cinematográficos listos para rodar.',
      '#contexto .lede': 'Saudosa Maloca es una comedia dramática inspirada en la música de Adoniran Barbosa. En los años 80, un Adoniran anciano (Paulo Miklos) relata a un joven camarero historias de una ciudad desaparecida: la modesta choza comunitaria ("maloca") donde convivía con Joca y Mato Grosso, la bohemia del barrio de Bixiga y la amistad. La demolición de la maloca cierra definitivamente esa era.',
      '#contexto .callout': '<b>Brief:</b> Diseñar el universo gráfico de la película en dos épocas contrastadas y desarrollar el dossier de captación de patrocinadores antes de encender las cámaras.',
      '#contexto .sm-count > div:nth-child(1) .tag': 'Dos Épocas',
      '#contexto .sm-count > div:nth-child(1) p': 'La narración oscila entre el São Paulo de los años 50 y el de los 80, requiriendo marcas comerciales adaptadas a cada época.',
      '#contexto .sm-count > div:nth-child(2) .tag': 'Guía de Arte',
      '#contexto .sm-count > div:nth-child(2) p': 'piezas catalogadas con set, escena, cantidad, dimensiones y soporte de impresión.',
      '#contexto .sm-count > div:nth-child(3) .tag': 'Imprenta',
      '#contexto .sm-count > div:nth-child(3) p': 'entregas de producción a imprenta entre diciembre de 2022 y enero de 2023 durante el inicio de rodaje.',

      // Section 01: Placa Título
      '#titulo .eyebrow': '<b>01</b> · Título',
      '#titulo h2': 'El título del film adopta la forma de una placa esmaltada de esquina.',
      '#titulo .lede': 'La placa-título recrea el lenguaje de las placas de calle tradicionales de São Paulo: fondo azul marino, filete blanco y tipografía condensada. El mismo criterio se trasladó a las placas de rodaje en exteriores, impresas sobre poliestireno rígido para cubrir las placas modernas con cinta de doble cara.',
      '#titulo .tag-row .pill:nth-child(1)': 'Interactivo',
      '#titulo .tag-row .pill:nth-child(2)': 'Elige la esquina',
      '.ti-main .ti-k': 'Placa-título',
      '.ti-corner .ti-k': 'Placas de calle para rodaje · 57 × 30 cm',
      '#titulo figcaption': '<b>Placa-título y placas de rodaje.</b> Utilizadas en la película real.',

      // Section 02: Épocas
      '#epocas .eyebrow': '<b>02</b> · Dos Épocas',
      '#epocas h2': 'Las mismas marcas comerciales, treinta años después.',
      '#epocas .lede': 'La trama viaja entre los años 50 y los 80, y la taberna aparece en ambos periodos. Marcas icónicas evolucionan: la cerveza Clara pasa de letras caligráficas a tipografías condensadas; el refresco de jabuticaba adopta botellas familiares de 2 litros; los cigarrillos Aurora dan paso a Demar. Hasta los billetes de curso legal reflejan la inflación histórica.',
      '#epocas .tag-row .pill:nth-child(1)': 'Interactivo',
      '#epocas .tag-row .pill:nth-child(2)': 'Cambia de época en la placa',
      '#epocas figcaption': '<b>Pares de artes finales para cada época.</b> Etiquetas y carteles reales utilizados en el largometraje.',

      // Section 03: Marcas
      '#marcas .eyebrow': '<b>03</b> · Marcas Ficticias',
      '#marcas h2': 'Marcas inventadas que parecen haber existido siempre.',
      '#marcas .lede': 'Botellas, latas y cajetillas de tabaco de la taberna y la maloca portan marcas ficticias con estética de época. Las etiquetas de cerveza se imprimieron en tiradas de 200 copias en vinilo adhesivo para botellas tradicionales de 600 ml. Los nombres de comercios pasaron por el departamento jurídico de la productora.',
      '#marcas .tag-row .pill:nth-child(1)': 'Interactivo',
      '#marcas .tag-row .pill:nth-child(2)': 'Elige una etiqueta',
      '#marcas figcaption': '<b>Etiquetas y cajetillas.</b> Artes finales de producción reales.',
      '#marcas .callout': '<b>Nombres Aprobados.</b> El departamento jurídico aprobó Madame Norita para la boutique, Café Paulistano para la casa de comidas y Rádio Cruzeiro do Sul para la emisora.',

      // Section 04: Especulación
      '#especulacao .eyebrow': '<b>04</b> · Especulación Inmobiliaria',
      '#especulacao h2': 'La especulación urbana empapela las calles antes de tirar la maloca.',
      '#especulacao .lede': 'El derribo de la maloca cierra la historia. Antes de las excavadoras, la ciudad avisa lo que llega: carteles de promociones inmobiliarias, vallas publicitarias en el contraplano del bar, planos de edificios, contratos de compraventa y órdenes judiciales de desalojo de la constructora Pereira & Luccini.',
      '#especulacao .tag-row .pill:nth-child(1)': 'Ampliar',
      '#especulacao .tag-row .pill:nth-child(2)': 'Pulsa en un cartel',
      '#especulacao figcaption': '<b>Piezas de especulación inmobiliaria.</b> Carteles en papel kraft, vallas en lona y orden de desalojo en papel timbrado.',

      // Section 05: Sets
      '#sets .eyebrow': '<b>05</b> · Sets y Rodaje',
      '#sets h2': 'Cerca de 60 piezas gráficas, set a set, escena a escena.',
      '#sets .lede': 'El trabajo partió del desglose de arte con localización, escena, cantidad y materiales. Cada set cuenta con su atmósfera: la taberna Bleque Tais en dos épocas, la emisora de radio, el callejero y la documentación en mano de los actores.',
      '#stT-bar': 'Bar Bleque Tais',
      '#stT-radio': 'Rádio Cruzeiro do Sul',
      '#stT-rua': 'Calles y Señalización',
      '#stT-papeis': 'Documentos de Escena',
      '#sets figcaption': '<b>Utilería gráfica por set.</b> Ficheros reales de rodaje.',

      // Section 06: Dossier
      '#deck .eyebrow': '<b>06</b> · Dossier de Financiación',
      '#deck h2': 'Antes de encender los focos, el mismo universo vendió la película.',
      '#deck .lede': 'Diseñé el dossier de financiación para inversores en noviembre de 2022. Utiliza las texturas de la ciudad que el film homenajea: ladrillo visto, yeso desgastado y placas esmaltadas encabezando cada capítulo comercial.',
      '#deck .tag-row .pill:nth-child(1)': 'Interactivo',
      '#deck .tag-row .pill:nth-child(2)': 'Pulsa una placa o usa flechas',
      '#deck figcaption': '<b>Dossier de captación, noviembre de 2022.</b> Diapositivas reales del archivo de presentación.',

      // Sistema Visual
      '#sistema .eyebrow': 'Sistema Visual',
      '#sistema h2': 'Dos épocas, dos paletas cromáticas.',
      '#sistema .lede': 'Los años 50 destacan por papel crema, ilustración al trazo y tintas directas: bermellón, verde, azul y mostaza. Los años 80 apuestan por fotografía, tipografías condensadas, negro, petróleo y amarillos vivos.',
      '#sistema .pf-card:nth-child(1) .tag': 'Paleta',
      '#sistema .pf-card:nth-child(1) .pal:nth-child(2) span': 'Años 50',
      '#sistema .pf-card:nth-child(1) .pal:nth-child(3) span': 'Años 80',
      '#sistema .pf-card:nth-child(1) .sys-n': 'Colores tomados de las artes finales de rodaje.',
      '#sistema .pf-card:nth-child(2) .tag': 'Tipografía',
      '#sistema .pf-card:nth-child(3) .tag': 'Investigación Histórica',

      // Resultado
      '#resultado .eyebrow': 'Resultado y Estreno',
      '#resultado h2': 'De la imprenta al plató, del plató a la gran pantalla.',
      '#resultado .lede': 'La producción se rodó en enero de 2023. Saudosa Maloca participó en la 47ª Mostra Internacional de Cine de São Paulo en octubre de 2023, se estrenó en salas comerciales el 21 de marzo de 2024 distribuida por Elo Studios y actualmente está disponible en Prime Video.',
      '#resultado .sm-links a:nth-child(1)': 'Ver en Prime Video ↗',
      '#resultado .sm-links a:nth-child(2)': 'Tráiler en YouTube ↗',
      '#resultado figcaption': '<b>Tráiler oficial de la película.</b>',
      '#resultado .callout': '<b>Créditos.</b> Saudosa Maloca es una producción de Pink Flamingo Filmes dirigida por Pedro Serrano y producida por Serrano y Renata Martins, con dirección de arte de Cláudia Terçarolli. Diseño gráfico de escena y dossier: Erik Placido.',

      // Footer
      '.pf-footer .eyebrow': 'Siguiente caso',
      '.pf-footer h2': '¿Hablamos?',
      '.pf-footer p': 'Diseño gráfico de utilería cinematográfica, marcas de época o dossiers de financiación: puedo mostrar los archivos de trabajo en directo.',
      '.pf-base span:nth-child(2)': 'Saudosa Maloca · Pink Flamingo Filmes'
    },

    fr: {
      // Nav
      '.pf-links a[href="#titulo"]': 'Plaque Titre',
      '.pf-links a[href="#epocas"]': 'Deux Époques',
      '.pf-links a[href="#marcas"]': 'Marques',
      '.pf-links a[href="#especulacao"]': 'Spéculation',
      '.pf-links a[href="#sets"]': 'Décors',
      '.pf-links a[href="#deck"]': 'Dossier de Financement',

      // Hero
      '.pf-hero .eyebrow': '<b>Cas 04</b> · Graphisme de Plateau · Cinéma d’Époque',
      '.pf-hero h1': 'Un São Paulo aujourd’hui disparu, <em>reconstitué en plaques et étiquettes d’époque.</em>',
      '.pf-hero .lede': 'Design graphique d’accessoires pour Saudosa Maloca, long-métrage de Pink Flamingo Filmes inspiré des sambas d’Adoniran Barbosa : plaque-titre, marques fictives, étiquettes de bouteilles, affiches et enseignes des années 50 et 80 visibles à l’écran. En amont du tournage, conception du dossier de présentation aux investisseurs. Sortie en salles et streaming.',
      '.pf-meta div:nth-child(1) dt': 'Rôle',
      '.pf-meta div:nth-child(1) dd': 'Designer graphique d’accessoires pour le film',
      '.pf-meta div:nth-child(2) dt': 'Client',
      '.pf-meta div:nth-child(2) dd': 'Pink Flamingo Filmes · 2022–2024',
      '.pf-meta div:nth-child(3) dt': 'Livrables',
      '.pf-meta div:nth-child(3) dd': 'Plaque-titre émaillée, accessoires graphiques des années 50 et 80, et dossier de financement',
      '.pf-meta div:nth-child(4) dt': 'Film',
      '.pf-meta div:nth-child(4) dd': 'Réalisation Pedro Serrano · Sortie en salles 21 mars 2024 · Prime Video',

      // Context
      '#contexto .eyebrow': 'Le Film',
      '#contexto h2': 'Des sambas qui constituent déjà des scénarios prêts à tourner.',
      '#contexto .lede': 'Saudosa Maloca est une comédie dramatique tirée de l’œuvre d’Adoniran Barbosa. Dans les années 80, un Adoniran âgé (Paulo Miklos) raconte à un jeune serveur les chroniques d’une ville effacée : la cabane communautaire ("maloca") partagée avec Joca et Mato Grosso, les cercles de samba du Bixiga et les amitiés populaires. La démolition de la maloca scelle la fin irrémédiable de cette époque.',
      '#contexto .callout': '<b>Brief :</b> Concevoir l’univers graphique du film à travers deux époques charnières et réaliser le dossier de recherche de partenaires financiers avant le premier coup de manivelle.',
      '#contexto .sm-count > div:nth-child(1) .tag': 'Deux Époques',
      '#contexto .sm-count > div:nth-child(1) p': 'L’intrigue alterne entre le São Paulo des années 50 et celui des années 80, chaque époque imposant ses codes visuels.',
      '#contexto .sm-count > div:nth-child(2) .tag': 'Liste d’Accessoires',
      '#contexto .sm-count > div:nth-child(2) p': 'accessoires répertoriés par décor, scène, quantité, format et support matière.',
      '#contexto .sm-count > div:nth-child(3) .tag': 'Impression',
      '#contexto .sm-count > div:nth-child(3) p': 'fournées d’impression d’artisanat entre décembre 2022 et janvier 2023 au lancement du tournage.',

      // Section 01: Plaque Titre
      '#titulo .eyebrow': '<b>01</b> · Plaque Titre',
      '#titulo h2': 'Le titre du film s’incarne dans une authentique plaque de rue émaillée.',
      '#titulo .lede': 'La plaque-titre adopte les codes des plaques de rue historiques de São Paulo : émail bleu nuit profond, filet blanc et lettres condensées. Le même procédé a été reproduit sur les extérieurs réels de la ville, contrecollé sur polystyrène rigide avec adhésif double-face par-dessus la signalisation moderne.',
      '#titulo .tag-row .pill:nth-child(1)': 'Interactif',
      '#titulo .tag-row .pill:nth-child(2)': 'Choisissez l’angle de rue',
      '.ti-main .ti-k': 'Plaque Titre',
      '.ti-corner .ti-k': 'Plaques de rue de tournage · 57 × 30 cm',
      '#titulo figcaption': '<b>Plaque-titre et plaques de rue.</b> Fichiers de fabrication réels utilisés pour le tournage.',

      // Section 02: Époques
      '#epocas .eyebrow': '<b>02</b> · Deux Époques',
      '#epocas h2': 'Les mêmes marques commerciales, trente ans plus tard.',
      '#epocas .lede': 'L’histoire navigue entre les années 50 et 80, et le bistrot apparaît dans les deux décennies. Des marques de tradition se modernisent : la bière Clara troque sa calligraphie rétro contre des caractères pilsen condensés ; le soda de jabuticaba passe à la bouteille plastique de 2 litres ; les cigarettes Aurora cèdent la place à Demar. Même les billets de banque portent les traces de l’inflation historique.',
      '#epocas .tag-row .pill:nth-child(1)': 'Interactif',
      '#epocas .tag-row .pill:nth-child(2)': 'Changez d’époque sur la plaque',
      '#epocas figcaption': '<b>Paires d’accessoires pour chaque époque.</b> Étiquettes et affiches authentiques du tournage.',

      // Section 03: Marques
      '#marcas .eyebrow': '<b>03</b> · Marques Fictives',
      '#marcas h2': 'Des marques inventées qui semblent avoir toujours existé.',
      '#marcas .lede': 'Bouteilles, conserves et paquets de tabac du bar et de la maloca arborent des marques imaginées pour le film. Les étiquettes de bière ont été imprimées à 200 exemplaires par époque sur vinyle adhésif pour bouteilles en verre ambré de 600 ml. Tous les noms d’enseignes ont reçu l’aval juridique de la production.',
      '#marcas .tag-row .pill:nth-child(1)': 'Interactif',
      '#marcas .tag-row .pill:nth-child(2)': 'Choisissez une étiquette',
      '#marcas figcaption': '<b>Étiquettes et paquets d’époque.</b> Documents d’impression authentiques.',
      '#marcas .callout': '<b>Validation Juridique.</b> Le service juridique a validé Madame Norita pour la boutique de confection, Café Paulistano pour le débit de boissons et Rádio Cruzeiro do Sul pour la station de radio.',

      // Section 04: Spéculation
      '#especulacao .eyebrow': '<b>04</b> · Spéculation Immobilière',
      '#especulacao h2': 'La spéculation immobilière s’affiche sur les murs avant de raser la maloca.',
      '#especulacao .lede': 'La destruction de la cabane sonne le glas de l’insouciance. En amont, l’environnement urbain annonce la mutation : affiches de programmes immobiliers collées sur la brique, panneau publicitaire dans l’axe du bar, plans d’architecte, actes de vente et arrêtés d’expulsion au nom du promoteur fictif Pereira & Luccini.',
      '#especulacao .tag-row .pill:nth-child(1)': 'Agrandir',
      '#especulacao .tag-row .pill:nth-child(2)': 'Cliquez sur une affiche',
      '#especulacao figcaption': '<b>Documents de promotion immobilière.</b> Affiches sur papier kraft, bâches imprimées et avis d’expulsion sur papier à en-tête municipal.',

      // Section 05: Décors
      '#sets .eyebrow': '<b>05</b> · Décors et Tournage',
      '#sets h2': 'Une soixantaine d’accessoires graphiques, décor par décor, scène par scène.',
      '#sets .lede': 'La fabrication a suivi le dépouillement général de la régie d’art : bistrot Bleque Tais aux deux époques, station de radio, carrefours urbains et documents manipulés par les comédiens.',
      '#stT-bar': 'Bistrot Bleque Tais',
      '#stT-radio': 'Radio Cruzeiro do Sul',
      '#stT-rua': 'Voie Publique & Rues',
      '#stT-papeis': 'Documents de Jeu',
      '#sets figcaption': '<b>Accessoires par décor.</b> Fichiers réels de fabrication cinéma.',

      // Section 06: Dossier
      '#deck .eyebrow': '<b>06</b> · Dossier de Financement',
      '#deck h2': 'Avant le tournage, le même univers visuel a séduit les partenaires.',
      '#deck .lede': 'Conçu en novembre 2022, le dossier d’investissement mobilise les matières brutes de la ville : brique rouge apparente, crépi écaillé et plaques émaillées ouvrant chaque section.',
      '#deck .tag-row .pill:nth-child(1)': 'Interactif',
      '#deck .tag-row .pill:nth-child(2)': 'Cliquez sur une plaque ou utilisez les flèches',
      '#deck figcaption': '<b>Dossier de présentation, novembre 2022.</b> Planches réelles extraites du dossier original.',

      // Système Visuel
      '#sistema .eyebrow': 'Système Visuel',
      '#sistema h2': 'Deux époques, deux registres chromatiques.',
      '#sistema .lede': 'Les années 50 privilégient le papier crème, le trait illustratif et un nombre réduit de teintes d’impression : rouge vermillon, vert forêt, bleu nuit et moutarde. Les années 80 passent à la photographie, aux lettrages condensés, au noir et aux jaunes vifs.',
      '#sistema .pf-card:nth-child(1) .tag': 'Palette',
      '#sistema .pf-card:nth-child(1) .pal:nth-child(2) span': 'Années 50',
      '#sistema .pf-card:nth-child(1) .pal:nth-child(3) span': 'Années 80',
      '#sistema .pf-card:nth-child(1) .sys-n': 'Couleurs prélevées sur les fichiers de production cinéma.',
      '#sistema .pf-card:nth-child(2) .tag': 'Typographie',
      '#sistema .pf-card:nth-child(3) .tag': 'Recherche Historique',

      // Résultat
      '#resultado .eyebrow': 'Sortie et Accueil',
      '#resultado h2': 'De l’atelier au plateau, du plateau aux salles de cinéma.',
      '#resultado .lede': 'Tourné en janvier 2023, Saudosa Maloca a été présenté à la 47e Mostra Internationale de Cinéma de São Paulo en octobre 2023 avant sa sortie en salles le 21 mars 2024 distribué par Elo Studios. Le film est aujourd’hui disponible sur Prime Video.',
      '#resultado .sm-links a:nth-child(1)': 'Regarder sur Prime Video ↗',
      '#resultado .sm-links a:nth-child(2)': 'Bande-annonce sur YouTube ↗',
      '#resultado figcaption': '<b>Bande-annonce officielle du film.</b>',
      '#resultado .callout': '<b>Crédits.</b> Saudosa Maloca est un film Pink Flamingo Filmes réalisé par Pedro Serrano et produit par Serrano et Renata Martins, avec une direction artistique de Cláudia Terçarolli. Design graphique et dossier de financement : Erik Placido.',

      // Footer
      '.pf-footer .eyebrow': 'Projet suivant',
      '.pf-footer h2': 'Discutons-en ?',
      '.pf-footer p': 'Accessoires graphiques de cinéma, marques d’époque ou dossiers de financement : je peux vous présenter les fichiers de fabrication en direct.',
      '.pf-base span:nth-child(2)': 'Saudosa Maloca · Pink Flamingo Filmes'
    }
  };

  if (window.PORTFOLIO_I18N && window.PORTFOLIO_I18N.registerCase) {
    window.PORTFOLIO_I18N.registerCase(CASE_SLUG, translations);
  } else {
    window.PORTFOLIO_CASES_I18N = window.PORTFOLIO_CASES_I18N || {};
    window.PORTFOLIO_CASES_I18N[CASE_SLUG] = translations;
  }
})();

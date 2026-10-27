/* ==========================================================================
   Translations for Case 19: Editora Terceiro Nome
   Supported: en (English), es (Español), fr (Français)
   Text inside the live catalog and the ISBN checker stays in Portuguese:
   it is part of the work (the publisher's site is in Portuguese).
   ========================================================================== */
(function(){
  'use strict';

  var CASE_SLUG = 'editora-terceiro-nome';

  var translations = {
    en: {
      '.pf-hero .eyebrow': '<b>Case 19</b> · Art Direction · UI · Catalog Architecture · Development',
      '.pf-hero h1': 'A 178-book catalog trapped in Adobe Muse, <em>rebuilt to last.</em>',
      '.pf-hero .lede': 'Editora Terceiro Nome publishes literature, art and anthropology about Brazil. Its old site was an Adobe Muse export, with prices frozen in the HTML, images without descriptions and even a buy button pointing to the wrong book. I rebuilt the catalog as a static site: art direction, data and search.',
      '.pf-meta div:nth-child(1) dd': 'Art direction, UI, catalog architecture and development',
      '.pf-meta div:nth-child(2) dd': 'Commissioned by Editora Terceiro Nome · 2026 · in review with the publisher',
      '.pf-meta div:nth-child(3) dd': 'Art direction, 194 static pages, search and filters, migration audit',
      '.pf-meta div:nth-child(4) dd': 'Plain HTML, CSS and JavaScript · Dependency-free Python · SQLite',

      '.pf-links a[href="#contexto"]': 'Context',
      '.pf-links a[href="#dados"]': 'Data',
      '.pf-links a[href="#isbn"]': 'ISBN',
      '.pf-links a[href="#direcao"]': 'Art direction',
      '.pf-links a[href="#catalogo"]': 'Search',

      '#contexto .eyebrow': 'The problem',
      '#contexto h2': 'The site showed the books, but knew nothing about them.',
      '#contexto .lede': 'Every book was a page laid out by hand in Muse. Title, ISBN, price and buy link were glued to the layout, repeated page after page. Nobody could check the whole catalog, and a copied mistake stayed put.',
      '#contexto .pf-card:nth-child(1) .tag': 'Buying',
      '#contexto .pf-card:nth-child(1) h3': 'The button led to the wrong book',
      '#contexto .pf-card:nth-child(1) p': 'The page for <i>Nunca o nome do menino</i> had buttons for <i>A Guerra</i> at the bookstore. Its ISBN had 12 digits.',
      '#contexto .pf-card:nth-child(2) .tag': 'Contact',
      '#contexto .pf-card:nth-child(2) h3': 'The form did not exist',
      '#contexto .pf-card:nth-child(2) p': 'The contact page carried a PHP Contact Form 7 shortcode inside the exported HTML. Outside WordPress, it did nothing.',
      '#contexto .pf-card:nth-child(3) .tag': 'Upkeep',
      '#contexto .pf-card:nth-child(3) h3': 'Frozen prices and duplicate pages',
      '#contexto .pf-card:nth-child(3) p': 'Prices typed into the HTML, duplicated catalog pages, a stray Pix page and a layout tied to Muse scripts and jQuery 1.8.3.',
      '#contexto .callout': '<b>Brief:</b> replace the site without losing a single book and without inventing data the source does not have.',

      '#dados .eyebrow': '<b>01</b> · Catalog as data',
      '#dados h2': 'One file for 178 books: the layout stopped holding information.',
      '#dados .lede': 'Every Muse page became a record in a single <code>catalog.json</code>: title, authorship, collection, specs, synopsis, cover and buying setup. A Python build reads that file and generates the 194 pages. Fixing a title means editing one line, not reopening Muse.',
      '#dados figcaption': '<b>Where each piece of the page comes from.</b> Left: a real excerpt of the <i>Zoé</i> record, with commerce fields shortened. Right: a recreation of the card the build produces. Hover or focus a line to see where it lands. An empty collection becomes “Terceiro Nome”, and <code>id</code> becomes the page address.',

      '#isbn .eyebrow': '<b>02</b> · An honest migration',
      '#isbn h2': 'Better to show no ISBN than a wrong one.',
      '#isbn .lede': 'The import checks the length and check digit of every ISBN. Whatever fails leaves the book page and goes into a review report. Buy links get the same treatment: until each one is verified, the button opens the bookstore’s home page and tells readers what to search for.',
      '#isbn figure:nth-of-type(1) figcaption': '<b>Interactive, with real data.</b> The check runs in your browser with the same check-digit rule. The four examples are numbers that were on the old site.',
      '#isbn .tn-count .pf-card:nth-child(1) p': 'records without a valid ISBN-13. 29 of them carry an old ISBN-10.',
      '#isbn .tn-count .pf-card:nth-child(2) p': 'old buy links flagged as suspicious or missing',
      '#isbn .tn-count .pf-card:nth-child(3) p': 'duplicate pages merged, with a 301 redirect map',
      '#isbn .tn-count .pf-card:nth-child(4) p': 'books with no synopsis found during import',
      '#isbn figure:nth-of-type(2) figcaption': '<b>Buying still happens at the bookstore, and the page says so.</b> Screenshot of the review version. The button opens Martins Fontes Paulista in a new tab, and the note asks readers to search by title or ISBN. Old prices are gone.',

      '#direcao .eyebrow': '<b>03</b> · Art direction',
      '#direcao h2': 'Three rounds until the brand red found its place.',
      '#direcao .lede': 'The brand is red, and most covers were photographed on a red background. The final direction lets light paper and serifs carry the hierarchy, and keeps red for the brand, the highlights and the covers themselves.',
      '#direcao figure:nth-of-type(1) > figcaption': '<b>Three states of the same home page.</b> Real screenshots from the review rounds, cropped at the top. Round 3 is live in the review version. It switches automatically until you touch a tab.',
      '#direcao .tn-pair figure:nth-child(1) .k': 'With an extra panel',
      '#direcao .tn-pair figure:nth-child(2) .k': 'Image as supplied',
      '#direcao > .wrap > figure:nth-of-type(2) > figcaption': '<b>No panel behind the covers.</b> Real screenshots. The publisher’s images already have a red background, and a panel behind them made a double frame. The final version shows each image as supplied. Swapping in clean covers, without the product photo, waits for the publisher’s files.',

      '#catalogo .eyebrow': '<b>04</b> · Search',
      '#catalogo h2': 'Search accepts “estevao” without the accent, and the catalog works without JavaScript.',
      '#catalogo .lede': 'All 178 books are in the page’s HTML. Without scripts, the full list is still browsable. With scripts, search filters by title, author and ISBN without requiring accents. Collection, sort order and query go into the URL, and results load 24 at a time.',
      '#catOpen': 'Open in a new tab ↗',
      '#catalogo figcaption': '<b>The real site, running right here.</b> It is the review version delivered to the publisher, kept out of search engines (noindex). Use the buttons or type into the catalog’s own search.',
      '#catalogo .pf-card:nth-child(1) .tag': 'No script',
      '#catalogo .pf-card:nth-child(1) h3': 'Links that are links',
      '#catalogo .pf-card:nth-child(1) p': 'Catalog and book pages are static HTML. Search is an extra layer: without it, nothing disappears.',
      '#catalogo .pf-card:nth-child(2) .tag': 'Keyboard',
      '#catalogo .pf-card:nth-child(2) h3': 'Focus where the reader is',
      '#catalogo .pf-card:nth-child(2) p': 'Visible focus, a skip link, one main heading per page and alt text on every cover. “Show more” moves focus to the first new book.',
      '#catalogo .pf-card:nth-child(3) .tag': 'Web search',
      '#catalogo .pf-card:nth-child(3) h3': 'Ready to be found',
      '#catalogo .pf-card:nth-child(3) p': 'Per-page metadata and <code>Book</code> structured data. Canonical tags and a sitemap come out of the build once the domain is set.',

      '.pf-footer .pf-fgrid > div:nth-child(2) p': 'Got an old site that holds more than it shows? I can help get the content out.'
    },

    es: {
      '.pf-hero .eyebrow': '<b>Case 19</b> · Dirección de arte · UI · Arquitectura de catálogo · Desarrollo',
      '.pf-hero h1': 'Un catálogo de 178 libros atrapado en Adobe Muse, <em>reconstruido para durar.</em>',
      '.pf-hero .lede': 'Editora Terceiro Nome publica literatura, arte y antropología sobre Brasil. Su sitio anterior era una exportación de Adobe Muse, con precios fijos en el HTML, imágenes sin descripción e incluso un botón de compra que llevaba al libro equivocado. Rehice el catálogo como sitio estático: dirección de arte, datos y búsqueda.',
      '.pf-meta div:nth-child(1) dd': 'Dirección de arte, UI, arquitectura del catálogo y desarrollo',
      '.pf-meta div:nth-child(2) dd': 'Encargo de Editora Terceiro Nome · 2026 · en revisión con la editorial',
      '.pf-meta div:nth-child(3) dd': 'Dirección de arte, 194 páginas estáticas, búsqueda y filtros, auditoría de la migración',
      '.pf-meta div:nth-child(4) dd': 'HTML, CSS y JavaScript puros · Python sin dependencias · SQLite',

      '.pf-links a[href="#contexto"]': 'Contexto',
      '.pf-links a[href="#dados"]': 'Datos',
      '.pf-links a[href="#isbn"]': 'ISBN',
      '.pf-links a[href="#direcao"]': 'Dirección de arte',
      '.pf-links a[href="#catalogo"]': 'Búsqueda',

      '#contexto .eyebrow': 'El problema',
      '#contexto h2': 'El sitio mostraba los libros, pero no sabía nada de ellos.',
      '#contexto .lede': 'Cada libro era una página maquetada a mano en Muse. Título, ISBN, precio y enlace de compra estaban pegados al diseño, repetidos página tras página. Nadie podía revisar el catálogo completo, y un error copiado se quedaba ahí.',
      '#contexto .pf-card:nth-child(1) .tag': 'Compra',
      '#contexto .pf-card:nth-child(1) h3': 'El botón llevaba al libro equivocado',
      '#contexto .pf-card:nth-child(1) p': 'La página de <i>Nunca o nome do menino</i> tenía botones para <i>A Guerra</i> en la librería. Su ISBN tenía 12 dígitos.',
      '#contexto .pf-card:nth-child(2) .tag': 'Contacto',
      '#contexto .pf-card:nth-child(2) h3': 'El formulario no existía',
      '#contexto .pf-card:nth-child(2) p': 'La página de contacto traía un shortcode PHP de Contact Form 7 dentro del HTML exportado. Fuera de WordPress, no hacía nada.',
      '#contexto .pf-card:nth-child(3) .tag': 'Mantenimiento',
      '#contexto .pf-card:nth-child(3) h3': 'Precios congelados y páginas duplicadas',
      '#contexto .pf-card:nth-child(3) p': 'Precios escritos en el HTML, páginas de catálogo duplicadas, una página de Pix suelta y un diseño atado a los scripts de Muse y a jQuery 1.8.3.',
      '#contexto .callout': '<b>Brief:</b> reemplazar el sitio sin perder ningún libro y sin inventar datos que la fuente no tiene.',

      '#dados .eyebrow': '<b>01</b> · Catálogo como datos',
      '#dados h2': 'Un archivo para 178 libros: el diseño dejó de guardar información.',
      '#dados .lede': 'Cada página de Muse pasó a ser un registro en un único <code>catalog.json</code>: título, autoría, colección, ficha técnica, sinopsis, portada y configuración de compra. El build en Python lee ese archivo y genera las 194 páginas. Corregir un título es editar una línea, no volver a abrir Muse.',
      '#dados figcaption': '<b>De dónde sale cada parte de la página.</b> A la izquierda, un fragmento real del registro de <i>Zoé</i>, con los campos comerciales resumidos. A la derecha, una recreación de la tarjeta que genera el build. Pasa el ratón o el foco por una línea para ver dónde aparece.',

      '#isbn .eyebrow': '<b>02</b> · Una migración honesta',
      '#isbn h2': 'Mejor no mostrar un ISBN que mostrar uno equivocado.',
      '#isbn .lede': 'La importación comprueba la longitud y el dígito de control de cada ISBN. Lo que no pasa sale de la ficha del libro y entra en un informe de revisión. Con los enlaces de compra pasa lo mismo: hasta verificar cada uno, el botón abre la portada de la librería y explica qué buscar.',
      '#isbn figure:nth-of-type(1) figcaption': '<b>Interactivo, con datos reales.</b> La comprobación corre en tu navegador con la misma regla de dígito de control. Los cuatro ejemplos son números que estaban en el sitio anterior.',
      '#isbn .tn-count .pf-card:nth-child(1) p': 'registros sin ISBN-13 válido. 29 de ellos traen un ISBN-10 antiguo.',
      '#isbn .tn-count .pf-card:nth-child(2) p': 'enlaces de compra antiguos marcados como sospechosos o ausentes',
      '#isbn .tn-count .pf-card:nth-child(3) p': 'páginas duplicadas fusionadas, con mapa de redirecciones 301',
      '#isbn .tn-count .pf-card:nth-child(4) p': 'libros sin sinopsis identificada en la importación',
      '#isbn figure:nth-of-type(2) figcaption': '<b>La compra sigue en la librería, y la página lo dice.</b> Captura de la versión de revisión. El botón abre Martins Fontes Paulista en otra pestaña, y el aviso pide buscar por título o ISBN. Los precios antiguos ya no aparecen.',

      '#direcao .eyebrow': '<b>03</b> · Dirección de arte',
      '#direcao h2': 'Tres rondas hasta que el rojo de la marca encontró su lugar.',
      '#direcao .lede': 'La marca es roja, y la mayoría de las portadas se fotografió sobre fondo rojo. La dirección final deja que el papel claro y las serifas lleven la jerarquía, y reserva el rojo para la marca, los destacados y las propias portadas.',
      '#direcao figure:nth-of-type(1) > figcaption': '<b>Tres estados de la misma portada del sitio.</b> Capturas reales de las rondas de revisión, recortadas arriba. La ronda 3 es la que está en la versión de revisión. Cambia sola hasta que tocas una pestaña.',
      '#direcao .tn-pair figure:nth-child(1) .k': 'Con panel extra',
      '#direcao .tn-pair figure:nth-child(2) .k': 'Imagen tal cual',
      '#direcao > .wrap > figure:nth-of-type(2) > figcaption': '<b>Ningún panel detrás de las portadas.</b> Capturas reales. Las imágenes de la editorial ya traen fondo rojo, y un panel detrás creaba un marco doble. La versión final muestra cada imagen tal como llegó.',

      '#catalogo .eyebrow': '<b>04</b> · Búsqueda',
      '#catalogo h2': 'La búsqueda acepta “estevao” sin tilde, y el catálogo funciona sin JavaScript.',
      '#catalogo .lede': 'Los 178 libros están en el HTML de la página. Sin script, la lista completa sigue navegable. Con script, la búsqueda filtra por título, autoría e ISBN sin exigir tildes. Colección, orden y término van a la URL, y los resultados cargan de 24 en 24.',
      '#catOpen': 'Abrir en otra pestaña ↗',
      '#catalogo figcaption': '<b>El sitio real, funcionando aquí dentro.</b> Es la versión de revisión entregada a la editorial, fuera de los buscadores (noindex). Usa los botones o escribe en la búsqueda del catálogo.',
      '#catalogo .pf-card:nth-child(1) .tag': 'Sin script',
      '#catalogo .pf-card:nth-child(1) h3': 'Enlaces que son enlaces',
      '#catalogo .pf-card:nth-child(1) p': 'Catálogo y fichas de libro son HTML estático. La búsqueda es una capa extra: sin ella, nada desaparece.',
      '#catalogo .pf-card:nth-child(2) .tag': 'Teclado',
      '#catalogo .pf-card:nth-child(2) h3': 'El foco donde está el lector',
      '#catalogo .pf-card:nth-child(2) p': 'Foco visible, enlace para saltar al contenido, un título principal por página y texto alternativo en todas las portadas. “Mostrar más” lleva el foco al primer libro nuevo.',
      '#catalogo .pf-card:nth-child(3) .tag': 'Buscadores',
      '#catalogo .pf-card:nth-child(3) h3': 'Listo para ser encontrado',
      '#catalogo .pf-card:nth-child(3) p': 'Metadatos por página y datos estructurados <code>Book</code>. Canonical y sitemap salen del build cuando se defina el dominio.',

      '.pf-footer .pf-fgrid > div:nth-child(2) p': '¿Tienes un sitio antiguo que guarda más de lo que muestra? Puedo ayudarte a sacar el contenido.'
    },

    fr: {
      '.pf-hero .eyebrow': '<b>Case 19</b> · Direction artistique · UI · Architecture de catalogue · Développement',
      '.pf-hero h1': 'Un catalogue de 178 livres coincé dans Adobe Muse, <em>reconstruit pour durer.</em>',
      '.pf-hero .lede': 'Editora Terceiro Nome publie littérature, art et anthropologie sur le Brésil. Son ancien site était un export Adobe Muse, avec des prix figés dans le HTML, des images sans description et même un bouton d’achat menant au mauvais livre. J’ai refait le catalogue en site statique : direction artistique, données et recherche.',
      '.pf-meta div:nth-child(1) dd': 'Direction artistique, UI, architecture du catalogue et développement',
      '.pf-meta div:nth-child(2) dd': 'Commande d’Editora Terceiro Nome · 2026 · en relecture avec l’éditeur',
      '.pf-meta div:nth-child(3) dd': 'Direction artistique, 194 pages statiques, recherche et filtres, audit de la migration',
      '.pf-meta div:nth-child(4) dd': 'HTML, CSS et JavaScript natifs · Python sans dépendances · SQLite',

      '.pf-links a[href="#contexto"]': 'Contexte',
      '.pf-links a[href="#dados"]': 'Données',
      '.pf-links a[href="#isbn"]': 'ISBN',
      '.pf-links a[href="#direcao"]': 'Direction artistique',
      '.pf-links a[href="#catalogo"]': 'Recherche',

      '#contexto .eyebrow': 'Le problème',
      '#contexto h2': 'Le site montrait les livres, mais ne savait rien d’eux.',
      '#contexto .lede': 'Chaque livre était une page mise en page à la main dans Muse. Titre, ISBN, prix et lien d’achat étaient collés à la maquette, répétés page après page. Personne ne pouvait vérifier tout le catalogue, et une erreur copiée restait en place.',
      '#contexto .pf-card:nth-child(1) .tag': 'Achat',
      '#contexto .pf-card:nth-child(1) h3': 'Le bouton menait au mauvais livre',
      '#contexto .pf-card:nth-child(1) p': 'La page de <i>Nunca o nome do menino</i> avait des boutons vers <i>A Guerra</i> chez le libraire. Son ISBN comptait 12 chiffres.',
      '#contexto .pf-card:nth-child(2) .tag': 'Contact',
      '#contexto .pf-card:nth-child(2) h3': 'Le formulaire n’existait pas',
      '#contexto .pf-card:nth-child(2) p': 'La page de contact contenait un shortcode PHP de Contact Form 7 dans le HTML exporté. Hors de WordPress, il ne faisait rien.',
      '#contexto .pf-card:nth-child(3) .tag': 'Maintenance',
      '#contexto .pf-card:nth-child(3) h3': 'Prix figés et pages en double',
      '#contexto .pf-card:nth-child(3) p': 'Des prix saisis dans le HTML, des pages de catalogue dupliquées, une page Pix isolée et une mise en page liée aux scripts de Muse et à jQuery 1.8.3.',
      '#contexto .callout': '<b>Brief :</b> remplacer le site sans perdre un seul livre et sans inventer de données absentes de la source.',

      '#dados .eyebrow': '<b>01</b> · Le catalogue comme donnée',
      '#dados h2': 'Un fichier pour 178 livres : la maquette a cessé de stocker l’information.',
      '#dados .lede': 'Chaque page Muse est devenue un enregistrement dans un unique <code>catalog.json</code> : titre, auteur, collection, fiche technique, résumé, couverture et réglages d’achat. Le build Python lit ce fichier et génère les 194 pages. Corriger un titre, c’est modifier une ligne, pas rouvrir Muse.',
      '#dados figcaption': '<b>D’où vient chaque élément de la page.</b> À gauche, un extrait réel de l’enregistrement de <i>Zoé</i>, champs commerciaux abrégés. À droite, une recréation de la carte produite par le build. Survolez ou mettez le focus sur une ligne pour voir où elle apparaît.',

      '#isbn .eyebrow': '<b>02</b> · Une migration honnête',
      '#isbn h2': 'Mieux vaut ne montrer aucun ISBN qu’un ISBN faux.',
      '#isbn .lede': 'L’import vérifie la longueur et la clé de contrôle de chaque ISBN. Ce qui échoue quitte la fiche du livre et rejoint un rapport de relecture. Même règle pour les liens d’achat : tant que chacun n’est pas vérifié, le bouton ouvre l’accueil de la librairie et indique quoi chercher.',
      '#isbn figure:nth-of-type(1) figcaption': '<b>Interactif, avec des données réelles.</b> La vérification tourne dans votre navigateur avec la même règle de clé de contrôle. Les quatre exemples sont des numéros de l’ancien site.',
      '#isbn .tn-count .pf-card:nth-child(1) p': 'fiches sans ISBN-13 valide. 29 d’entre elles portent un ancien ISBN-10.',
      '#isbn .tn-count .pf-card:nth-child(2) p': 'anciens liens d’achat signalés comme suspects ou absents',
      '#isbn .tn-count .pf-card:nth-child(3) p': 'pages en double fusionnées, avec une table de redirections 301',
      '#isbn .tn-count .pf-card:nth-child(4) p': 'livres sans résumé trouvé lors de l’import',
      '#isbn figure:nth-of-type(2) figcaption': '<b>L’achat reste chez le libraire, et la page le dit.</b> Capture de la version de relecture. Le bouton ouvre Martins Fontes Paulista dans un nouvel onglet, et la note invite à chercher par titre ou ISBN. Les anciens prix ont disparu.',

      '#direcao .eyebrow': '<b>03</b> · Direction artistique',
      '#direcao h2': 'Trois tours avant que le rouge de la marque trouve sa place.',
      '#direcao .lede': 'La marque est rouge, et la plupart des couvertures ont été photographiées sur fond rouge. La direction finale laisse le papier clair et les empattements porter la hiérarchie, et garde le rouge pour la marque, les accents et les couvertures elles-mêmes.',
      '#direcao figure:nth-of-type(1) > figcaption': '<b>Trois états de la même page d’accueil.</b> Captures réelles des tours de relecture, recadrées en haut. Le tour 3 est en ligne dans la version de relecture. Le défilement est automatique jusqu’à ce que vous touchiez un onglet.',
      '#direcao .tn-pair figure:nth-child(1) .k': 'Avec panneau ajouté',
      '#direcao .tn-pair figure:nth-child(2) .k': 'Image telle quelle',
      '#direcao > .wrap > figure:nth-of-type(2) > figcaption': '<b>Aucun panneau derrière les couvertures.</b> Captures réelles. Les images de l’éditeur ont déjà un fond rouge, et un panneau derrière créait un double cadre. La version finale montre chaque image telle que fournie.',

      '#catalogo .eyebrow': '<b>04</b> · Recherche',
      '#catalogo h2': 'La recherche accepte « estevao » sans accent, et le catalogue fonctionne sans JavaScript.',
      '#catalogo .lede': 'Les 178 livres sont dans le HTML de la page. Sans script, la liste complète reste navigable. Avec script, la recherche filtre par titre, auteur et ISBN sans exiger les accents. Collection, tri et requête passent dans l’URL, et les résultats arrivent par 24.',
      '#catOpen': 'Ouvrir dans un nouvel onglet ↗',
      '#catalogo figcaption': '<b>Le vrai site, en marche ici même.</b> C’est la version de relecture livrée à l’éditeur, exclue des moteurs de recherche (noindex). Utilisez les boutons ou tapez dans la recherche du catalogue.',
      '#catalogo .pf-card:nth-child(1) .tag': 'Sans script',
      '#catalogo .pf-card:nth-child(1) h3': 'Des liens qui sont des liens',
      '#catalogo .pf-card:nth-child(1) p': 'Catalogue et fiches sont du HTML statique. La recherche est une couche en plus : sans elle, rien ne disparaît.',
      '#catalogo .pf-card:nth-child(2) .tag': 'Clavier',
      '#catalogo .pf-card:nth-child(2) h3': 'Le focus là où est le lecteur',
      '#catalogo .pf-card:nth-child(2) p': 'Focus visible, lien d’évitement, un seul titre principal par page et texte alternatif sur chaque couverture. « Afficher plus » place le focus sur le premier nouveau livre.',
      '#catalogo .pf-card:nth-child(3) .tag': 'Moteurs de recherche',
      '#catalogo .pf-card:nth-child(3) h3': 'Prêt à être trouvé',
      '#catalogo .pf-card:nth-child(3) p': 'Métadonnées par page et données structurées <code>Book</code>. Canonical et sitemap sortent du build dès que le domaine est défini.',

      '.pf-footer .pf-fgrid > div:nth-child(2) p': 'Un vieux site qui en contient plus qu’il n’en montre ? Je peux aider à en sortir le contenu.'
    }
  };

  if (window.PORTFOLIO_I18N && window.PORTFOLIO_I18N.registerCase) {
    window.PORTFOLIO_I18N.registerCase(CASE_SLUG, translations);
  } else {
    window.PORTFOLIO_CASES_I18N = window.PORTFOLIO_CASES_I18N || {};
    window.PORTFOLIO_CASES_I18N[CASE_SLUG] = translations;
  }
})();

/* ==========================================================================
   Translations for Case 12: Conta Simples · TransactionLedger
   Supported: en (English), es (Español), fr (Français)
   ========================================================================== */
(function(){
  'use strict';

  var CASE_SLUG = 'conta-simples-ledger';

  var translations = {
    en: {
      '.pf-hero .eyebrow': '<b>Case 12</b> · Design System · B2B Corporate Banking · Design Engineering',
      '.pf-hero h1': 'A single transaction row, <em>every complex edge case.</em>',
      '.pf-hero .lede': 'Component family for corporate card transaction ledgers: atomic anatomy, comprehensive state matrix, semantic tokens, and an AI-drafted handoff featuring JSON Schema and reference implementations for React Native and Jetpack Compose. Documented on an interactive 1920 × 1080 canvas.',
      '.cs-note': 'Design System Architecture · Financial component standardization and B2B reconciliation',

      // Meta
      '.pf-meta div:nth-child(1) dd': 'Design System Lead, UI & Design Engineering',
      '.pf-meta div:nth-child(2) dd': 'Design System & Component Architecture · Web and Mobile',
      '.pf-meta div:nth-child(3) dd': 'TransactionLedger family, state matrix, semantic tokens, JSON Schema, interactive board',
      '.pf-meta div:nth-child(4) dd': 'Figma · Antigravity IDE · React · TypeScript · Zod',

      // Links
      '.pf-links a[href="#contexto"]': 'Context',
      '.pf-links a[href="#anatomia"]': 'Anatomy',
      '.pf-links a[href="#estados"]': 'States',
      '.pf-links a[href="#tokens"]': 'Tokens',
      '.pf-links a[href="#handoff"]': 'Handoff',
      '.pf-links a[href="#prancha"]': 'Board',
      '.pf-links a[href="#medir"]': 'Business Case',

      // Context
      '#contexto .eyebrow': 'The problem',
      '#contexto h2': 'Every client platform reinvented its own transaction rows.',
      '#contexto .lede': 'The project tackles a critical friction in multi-card corporate banking: mobile and web platforms handled split transactions, foreign exchange, and declined charges in disjointed ways, leading to accounting discrepancies and ongoing frontend rework.',
      '#contexto .callout': '<b>Brief:</b> a single source of truth. A resilient component covering every business state and real-world edge case, documented for unambiguous developer implementation.',

      // Anatomy
      '#anatomia .eyebrow': '<b>01</b> · Component Anatomy',
      '#anatomia h2': '72 px height, four predictable blocks, zero layout shifts.',
      '#anatomia .lede': 'Merchant icon, transaction metadata, amount, and status pill. Tabular numerals ensure cents align perfectly on scrolling, and truncation gracefully caps merchant titles without clipping amounts.',
      '#anatomia figcaption': '<b>Interactive recreation of the ledger</b> with prototype test transactions and board tokens: hover, pressed, and focus are active component states.',
      '#anatomia .cs-spec div:nth-child(1)': '<b>1 · Container</b>Height 72 px, horizontal padding <code>spacing-md</code> (16 px).',
      '#anatomia .cs-spec div:nth-child(2)': '<b>2 · Icon</b>44 × 44 px avatar/logo slot, vertically centered.',
      '#anatomia .cs-spec div:nth-child(3)': '<b>3 · Content</b>15 px medium title, 13 px regular metadata line.',
      '#anatomia .cs-spec div:nth-child(4)': '<b>4 · Amount</b>16 px semibold tabular figures with status pill underneath.',
      '#anatomia .cs-out': 'Hover, tap, or Tab navigate: each row displays the announced screen-reader accessibility label.',

      // Modular Family
      '#familia .eyebrow': '<b>02</b> · Modular Architecture',
      '#familia h2': 'Two focused components rather than one with fifty props.',
      '#familia .lede': 'A monolithic component might appear simpler to import, but each subsequent edge case would inflate prop complexity. Separating the row from date groupings isolates responsibilities and preserves a strict API contract.',
      '#familia .cs-two .pf-card:nth-child(1) .tag': 'Approach A',
      '#familia .cs-two .pf-card:nth-child(1) h3': 'Monolithic Component',
      '#familia .cs-two .pf-card:nth-child(1) p': 'A single component overloaded with flags to support everything.',
      '#familia .cs-two .pf-card:nth-child(1) ul': '<li>Superficially simple entrypoint</li><li>Less initial documentation surface</li><li>Internal cyclomatic complexity spikes with each exception</li>',
      '#familia .cs-two .pf-card:nth-child(2) .tag': '<b>Selected</b> · Approach B',
      '#familia .cs-two .pf-card:nth-child(2) h3': 'TransactionRow + LedgerGroup',
      '#familia .cs-two .pf-card:nth-child(2) p': 'Row presentation and date sectioning divided cleanly.',
      '#familia .cs-two .pf-card:nth-child(2) ul': '<li>Single Responsibility Principle per component</li><li>LedgerGroup manages temporal aggregation and sticky headers</li><li>Typed props described in strict JSON Schema</li><li>Battle-tested across 7 extreme data edge cases</li>',

      // States
      '#estados .eyebrow': '<b>03</b> · States & Edge Cases',
      '#estados h2': 'Four interaction states × three business extremes.',
      '#estados .lede': 'The matrix maps primary UI states against the scenarios most notorious for breaking layouts: international purchases with exchange rates and IOF tax, declined or refunded transactions with strikethroughs, and merchant strings exceeding 35 characters.',
      '#estados .cs-states div:nth-child(1)': '<i style="background:#FFFFFF"></i><b>Default</b><code>#FFFFFF</code> · idle surface',
      '#estados .cs-states div:nth-child(2)': '<i style="background:#F8F9FA"></i><b>Hover</b><code>#F8F9FA</code> · desktop only',
      '#estados .cs-states div:nth-child(3)': '<i style="background:#F1F3F5"></i><b>Pressed</b><code>#F1F3F5</code> · touch or active click',
      '#estados .cs-states div:nth-child(4)': '<i style="background:#fff;box-shadow:inset 0 0 0 2px #2563EB"></i><b>Focus</b>2 px inner ring <code>#2563EB</code> · keyboard',
      '#estados figcaption': '<b>Board viewport, section 2.</b> The 4 × 3 state matrix and interactive sandbox allowing custom text entry to verify live truncation behavior.',

      // Tokens
      '#tokens .eyebrow': '<b>04</b> · Semantic Tokens',
      '#tokens h2': 'Contrast mathematically verified, not guessed.',
      '#tokens .lede': 'Design tokens designate semantic roles (surface, text, status, focus) rather than raw hexadecimal values. In this audit, contrast ratios were recomputed against WCAG 2.1 formulas.',
      '#tokens figcaption': '<b>Board capture, section 3.</b> Contrast ratings declared in production. The recalculation above highlights WCAG AAA compliance.',

      // Handoff
      '#handoff .eyebrow': '<b>05</b> · AI-Accelerated Handoff',
      '#handoff h2': 'From Figma tokens to native code via structured AI drafting.',
      '#handoff .lede': 'The documentation pipeline prompts a Google AI Studio model with schema constraints to produce runtime JSON Schemas and boilerplate implementations for React Native and Jetpack Compose.',
      '#handoff .cs-hlab:nth-child(1)': 'Generated Schema Excerpt',
      '#handoff figcaption': '<b>Board capture, section 4.</b> Reference schema and code outputs serving as live developer guidelines.',

      // Board
      '#prancha .eyebrow': 'Interactive Documentation',
      '#prancha h2': 'Full technical specification, completely browsable.',
      '#prancha .lede': 'The board is an interactive React application featuring all 4 documentation chapters and an end-to-end ledger simulator. Loads on demand.',
      '#prancha .go span': '▶ Load interactive canvas',
      '#prancha .cs-hints div:nth-child(1)': '<b>Anatomy</b>Click numbered pins to inspect component tokens.',
      '#prancha .cs-hints div:nth-child(2)': '<b>Sandbox</b>Type arbitrary merchant strings to audit live truncation.',
      '#prancha .cs-hints div:nth-child(3)': '<b>Dev Mode</b>Top toggles show pixel dimensions and the 8px baseline grid.',
      '#prancha .cs-hints div:nth-child(4)': '<b>Simulator</b>Interactive transaction ledger with status filters.',
      '#prancha .cs-open': 'Open board in full screen ↗',
      '#prancha figcaption': '<b>Interactive React board.</b> Living design documentation with semantic tokens, state matrices, and corporate expense reconciliation simulations.',

      // Business Case
      '#medir .eyebrow': '<b>06</b> · Business Case & Operational Efficiency',
      '#medir h2': 'Projected impact on B2B Expense Reconciliation and Dev Velocity.',
      '#medir .lede': 'How TransactionLedger standardization slashes corporate monthly reconciliation time by ~42%, eliminates QA revisions, and accelerates feature velocity by 60%.',
      '#medir .cs-kpi-card:nth-child(1) .cs-kpi-label': 'Monthly Accounting Reconciliation Time',
      '#medir .cs-kpi-card:nth-child(1) .cs-kpi-desc': 'Standardized 72px rows with explicit micro-statuses (Reconciled, Pending, Declined with reason, Refunded) and tabular digits cut in half the time corporate financial controllers spend auditing statements.',
      '#medir .cs-kpi-card:nth-child(2) .cs-kpi-label': 'Net Revenue Retention (NDR)',
      '#medir .cs-kpi-card:nth-child(2) .cs-kpi-desc': 'Frictionless transparency per employee and cost center simplifies financial governance, accelerating the provisioning of corporate cards across enterprise accounts.',
      '#medir .cs-kpi-card:nth-child(3) .cs-kpi-label': 'B2B Support Ticket Volume',
      '#medir .cs-kpi-card:nth-child(3) .cs-kpi-desc': 'Surfacing immediate decline reasons (e.g. "Card locked", "Insufficient funds", explicit FX rates) removes the need for customer teams to open support tickets.',
      '#medir .cs-kpi-card:nth-child(4) .cs-kpi-label': 'Engineering Cycle Time',
      '#medir .cs-kpi-card:nth-child(4) .cs-kpi-desc': 'Delivering a unified contract with tokens, Zod-validated JSON schemas, and mobile/web parity compresses ledger feature rollout from 3 weeks down to 3 days.',

      // Handoff Frontend
      '#medir .cs-fe-head .eyebrow': '<b>Handoff</b> · Frontend Architecture',
      '#medir .cs-fe-head h2': 'Typed JSON schema, semantic tokens, clean virtualization.',
      '#medir .cs-fe-head .lede': 'Architecture built for direct enterprise design system adoption, runtime contract validation, and rigorous accessibility testing.',
      '#medir .cs-fe-card:nth-child(1) .tag': 'Data Contract',
      '#medir .cs-fe-card:nth-child(1) h3': 'Typed Schema (TypeScript / Zod)',
      '#medir .cs-fe-card:nth-child(1) p': 'Strict structural validation of transaction data on the client side, guarding the UI against unexpected nulls during complex FX operations:',
      '#medir .cs-fe-card:nth-child(1) ul': '<li>Integer modeling in base cents (<code>amountCents</code>) preventing floating-point inaccuracies</li><li>Closed enums for reconciliation states and network brands</li><li>International metadata payloads (commercial exchange, spread, taxes)</li><li>Strict runtime parsing for web and native runtimes</li>',
      '#medir .cs-fe-card:nth-child(2) .tag': 'Design Tokens',
      '#medir .cs-fe-card:nth-child(2) h3': 'WCAG AAA Contrast Tokens',
      '#medir .cs-fe-card:nth-child(2) p': 'Color token matrix audited for guaranteed 7.0:1 contrast across all reading and alert states:',
      '#medir .cs-fe-card:nth-child(2) ul': '<li><code>--cs-tx: #111827</code> (16.5:1 contrast on white canvas)</li><li><code>--cs-ok: #166534</code> over success surface (7.4:1 AAA)</li><li><code>--cs-bad: #991B1B</code> over error surface (7.8:1 AAA)</li><li>Mandatory 2px high-visibility focus ring with negative offset for keyboard traversal</li>',
      '#medir .cs-fe-card:nth-child(3) .tag': 'Performance & A11y',
      '#medir .cs-fe-card:nth-child(3) h3': 'Zero Layout Shift & Virtualization',
      '#medir .cs-fe-card:nth-child(3) p': 'Engineered for smooth 60fps scrolling across enterprise ledgers containing thousands of records:',
      '#medir .cs-fe-card:nth-child(3) ul': '<li>Rigid 72 px height optimized for virtualized windowing (<code>FlatList</code> / <code>react-window</code>)</li><li>Monospaced tabular digits for perfect vertical decimal alignment</li><li>Automated generation of semantic, narrated <code>accessibilityLabel</code></li><li>Cascading text truncation protecting amounts and badges from truncation</li>'
    },

    es: {
      '.pf-hero .eyebrow': '<b>Caso 12</b> · Design System · Banca Corporativa B2B · Design Engineering',
      '.pf-hero h1': 'Una línea de extracto, <em>todos los casos complejos.</em>',
      '.pf-hero .lede': 'Familia de componentes para el extracto de tarjetas corporativas: anatomía atómica, matriz de estados, tokens semánticos y entrega técnica con JSON Schema y código de referencia en React Native y Jetpack Compose, prototipados con IA. Documentado en una lámina interactiva de 1920 × 1080.',
      '.cs-note': 'Arquitectura de Design System · Estandarización de componentes financieros y conciliación B2B',

      // Meta
      '.pf-meta div:nth-child(1) dd': 'Design System Lead, UI e Ingeniería de Diseño',
      '.pf-meta div:nth-child(2) dd': 'Design System & Arquitectura de Componentes · Web y Móvil',
      '.pf-meta div:nth-child(3) dd': 'Familia TransactionLedger, matriz de estados, tokens semánticos, JSON Schema, lámina interactiva',
      '.pf-meta div:nth-child(4) dd': 'Figma · Antigravity IDE · React · TypeScript · Zod',

      // Links
      '.pf-links a[href="#contexto"]': 'Contexto',
      '.pf-links a[href="#anatomia"]': 'Anatomía',
      '.pf-links a[href="#estados"]': 'Estados',
      '.pf-links a[href="#tokens"]': 'Tokens',
      '.pf-links a[href="#handoff"]': 'Handoff',
      '.pf-links a[href="#prancha"]': 'Lámina',
      '.pf-links a[href="#medir"]': 'Business Case',

      // Context
      '#contexto .eyebrow': 'El problema',
      '#contexto h2': 'Cada plataforma inventaba su propio extracto.',
      '#contexto .lede': 'El proyecto resuelve una inconsistencia crítica en productos multitarjeta corporativos: las aplicaciones web y móviles resolvían a su manera compras internacionales, en cuotas o rechazadas, provocando descuadres contables y retrabajo.',
      '#contexto .callout': '<b>Brief:</b> una única fuente de verdad. Un componente que cubra todos los estados del negocio y datos reales, listo para ser implementado sin ambigüedad.',

      // Anatomy
      '#anatomia .eyebrow': '<b>01</b> · Anatomía',
      '#anatomia h2': '72 px de altura, cuatro bloques predecibles, cero saltos de diseño.',
      '#anatomia .lede': 'Icono comercial, datos de la transacción, importe y píldora de estado. Los números tabulares garantizan la alineación perfecta de decimales al hacer scroll.',
      '#anatomia figcaption': '<b>Recreación interactiva del extracto</b> con transacciones de prueba reales y tokens del sistema: hover, pulsado y foco reflejan los estados del componente.',
      '#anatomia .cs-spec div:nth-child(1)': '<b>1 · Contenedor</b>Altura 72 px, relleno horizontal <code>spacing-md</code> (16 px).',
      '#anatomia .cs-spec div:nth-child(2)': '<b>2 · Icono</b>44 × 44 px para marca o avatar, centrado verticalmente.',
      '#anatomia .cs-spec div:nth-child(3)': '<b>3 · Contenido</b>Título de 15 px medium, línea de soporte de 13 px regular.',
      '#anatomia .cs-spec div:nth-child(4)': '<b>4 · Importe</b>16 px semibold tabular con etiqueta de estado inferior.',
      '#anatomia .cs-out': 'Pase el ratón, toque o use Tab: cada fila expone la etiqueta descriptiva que narrará el lector de pantalla.',

      // Modular Family
      '#familia .eyebrow': '<b>02</b> · Familia Modular',
      '#familia h2': 'Dos componentes pequeños en lugar de uno con cincuenta props.',
      '#familia .lede': 'Un componente monolítico parecería más sencillo de importar, pero cada nueva casuística exigiría una prop más. Separar la fila de la cabecera de fecha aísla responsabilidades y estabiliza el contrato.',
      '#familia .cs-two .pf-card:nth-child(1) .tag': 'Enfoque A',
      '#familia .cs-two .pf-card:nth-child(1) h3': 'Componente Monolítico',
      '#familia .cs-two .pf-card:nth-child(1) p': 'Un solo componente masivo con flags para contemplar todo.',
      '#familia .cs-two .pf-card:nth-child(1) ul': '<li>API simple en apariencia</li><li>Menor documentación inicial</li><li>La complejidad interna se dispara con cada excepción</li>',
      '#familia .cs-two .pf-card:nth-child(2) .tag': '<b>Seleccionado</b> · Enfoque B',
      '#familia .cs-two .pf-card:nth-child(2) h3': 'TransactionRow + LedgerGroup',
      '#familia .cs-two .pf-card:nth-child(2) p': 'La fila y el agrupador temporal estructurados como piezas independientes.',
      '#familia .cs-two .pf-card:nth-child(2) ul': '<li>Una sola responsabilidad por componente</li><li>LedgerGroup gestiona la agrupación por fecha y cabeceras fijas</li><li>Props tipadas y formalizadas en JSON Schema</li><li>Probado exhaustivamente ante 7 casos extremos</li>',

      // States
      '#estados .eyebrow': '<b>03</b> · Estados y Casos Límite',
      '#estados h2': 'Cuatro estados × tres casos comerciales extremos.',
      '#estados .lede': 'La matriz cruza los estados de interacción con los escenarios que más desajustes generan: transacciones internacionales con tipo de cambio e impuestos, recargos o rechazos tachados con motivo, y nombres que superan los 35 caracteres.',
      '#estados .cs-states div:nth-child(1)': '<i style="background:#FFFFFF"></i><b>Default</b><code>#FFFFFF</code> · reposo',
      '#estados .cs-states div:nth-child(2)': '<i style="background:#F8F9FA"></i><b>Hover</b><code>#F8F9FA</code> · solo escritorio',
      '#estados .cs-states div:nth-child(3)': '<i style="background:#F1F3F5"></i><b>Pulsado</b><code>#F1F3F5</code> · toque o clic activo',
      '#estados .cs-states div:nth-child(4)': '<i style="background:#fff;box-shadow:inset 0 0 0 2px #2563EB"></i><b>Foco</b>Anillo interior 2 px <code>#2563EB</code> · teclado',
      '#estados figcaption': '<b>Lámina, sección 2.</b> Matriz de 4 × 3 estados y entorno interactivo para ingresar textos libres y comprobar el truncamiento en vivo.',

      // Tokens
      '#tokens .eyebrow': '<b>04</b> · Tokens Semánticos',
      '#tokens h2': 'Contraste auditado mediante cálculo, no estimado.',
      '#tokens .lede': 'Los tokens definen el rol funcional del color en lugar del código hexadecimal. Los contrastes han sido recalculados bajo las directrices WCAG 2.1.',
      '#tokens figcaption': '<b>Lámina, sección 3.</b> Declaración de contrastes de producción y verificación de conformidad con WCAG AAA.',

      // Handoff
      '#handoff .eyebrow': '<b>05</b> · Handoff Acelerado por IA',
      '#handoff h2': 'Del diseño al código fuente con el apoyo de modelos estructurados.',
      '#handoff .lede': 'Un flujo que consulta modelos de IA para generar automáticamente el JSON Schema de las propiedades y las plantillas de implementación en React Native y Jetpack Compose.',
      '#handoff .cs-hlab:nth-child(1)': 'Fragmento del Schema Generado',
      '#handoff figcaption': '<b>Lámina, sección 4.</b> Contratos de datos y código de referencia para los equipos de ingeniería.',

      // Board
      '#prancha .eyebrow': 'Documentación Técnica',
      '#prancha h2': 'Toda la especificación en una prancha navegable.',
      '#prancha .lede': 'La lámina es una aplicación completa en React que integra las cuatro secciones y un simulador de conciliación al final. Carga bajo demanda.',
      '#prancha .go span': '▶ Cargar lámina interactiva',
      '#prancha .cs-hints div:nth-child(1)': '<b>Anatomía</b>Haga clic en los puntos numerados para consultar tokens.',
      '#prancha .cs-hints div:nth-child(2)': '<b>Laboratorio</b>Escriba nombres extensos para verificar truncamientos.',
      '#prancha .cs-hints div:nth-child(3)': '<b>Modo Dev</b>Visualice dimensiones y retícula base de 8 px.',
      '#prancha .cs-hints div:nth-child(4)': '<b>Simulador</b>Extracto completo con filtros de estado.',
      '#prancha .cs-open': 'Abrir lámina a pantalla completa ↗',
      '#prancha figcaption': '<b>Lámina técnica en React.</b> Documentación viva con tokens semánticos, matrices de interacción y simulación de conciliación corporativa.',

      // Business Case
      '#medir .eyebrow': '<b>06</b> · Business Case y Eficiencia Operativa',
      '#medir h2': 'Impacto proyectado en Conciliación B2B y Ciclo de Entrega.',
      '#medir .lede': 'Cómo la estandarización del TransactionLedger disminuye un ~42% el tiempo de conciliación contable, elimina revisiones de QA y acorta los ciclos de desarrollo un 60%.',
      '#medir .cs-kpi-card:nth-child(1) .cs-kpi-label': 'Tiempo de Conciliación Contable',
      '#medir .cs-kpi-card:nth-child(1) .cs-kpi-desc': 'La estructura uniforme de 72px con estados explícitos (Conciliado, Pendiente, Rechazado con motivo, Reembolsado) reduce a la mitad el tiempo invertido en la comprobación mensual de gastos.',
      '#medir .cs-kpi-card:nth-child(2) .cs-kpi-label': 'Retención Neta de Ingresos (NDR)',
      '#medir .cs-kpi-card:nth-child(2) .cs-kpi-desc': 'La transparencia total por empleado y centro de costos reduce fricciones administrativas, impulsando la adopción y emisión de nuevas tarjetas corporativas.',
      '#medir .cs-kpi-card:nth-child(3) .cs-kpi-label': 'Volumen de Consultas a Soporte B2B',
      '#medir .cs-kpi-card:nth-child(3) .cs-kpi-desc': 'Mostrar directamente el motivo de cualquier rechazo en la propia fila del extracto evita consultas innecesarias al servicio de atención al cliente corporativo.',
      '#medir .cs-kpi-card:nth-child(4) .cs-kpi-label': 'Tiempo de Desarrollo en Ingeniería',
      '#medir .cs-kpi-card:nth-child(4) .cs-kpi-desc': 'Contar con una especificación única formalizada con JSON Schema y paridad móvil/web reduce el despliegue de nuevas pantallas de extracto de 3 semanas a solo 3 días.',

      // Handoff Frontend
      '#medir .cs-fe-head .eyebrow': '<b>Handoff</b> · Arquitectura Frontend',
      '#medir .cs-fe-head h2': 'Schema JSON tipado, tokens semánticos y virtualización optimizada.',
      '#medir .cs-fe-head .lede': 'Diseñado para adopción directa en sistemas de diseño empresariales, validación de contratos en runtime y accesibilidad certificada.',
      '#medir .cs-fe-card:nth-child(1) .tag': 'Contrato de Datos',
      '#medir .cs-fe-card:nth-child(1) h3': 'Schema Tipado (TypeScript / Zod)',
      '#medir .cs-fe-card:nth-child(1) p': 'Validación estructural en cliente para proteger la interfaz frente a valores nulos o transacciones internacionales complejas:',
      '#medir .cs-fe-card:nth-child(1) ul': '<li>Valores enteros en centavos (<code>amountCents</code>) para evitar imprecisiones de coma flotante</li><li>Enumeraciones estrictas de estados y redes de pago</li><li>Metadatos de divisas extranjeras (cambio comercial, comisiones e impuestos)</li><li>Validación estricta en runtime para web y aplicaciones nativas</li>',
      '#medir .cs-fe-card:nth-child(2) .tag': 'Design Tokens',
      '#medir .cs-fe-card:nth-child(2) h3': 'Tokens con Contraste WCAG AAA',
      '#medir .cs-fe-card:nth-child(2) p': 'Conjunto de colores verificado para garantizar contrastes superiores a 7.0:1 en todas las condiciones de lectura:',
      '#medir .cs-fe-card:nth-child(2) ul': '<li><code>--cs-tx: #111827</code> (Contraste 16.5:1 sobre fondo blanco)</li><li><code>--cs-ok: #166534</code> sobre fondo verde (7.4:1 AAA)</li><li><code>--cs-bad: #991B1B</code> sobre fondo de error (7.8:1 AAA)</li><li>Anillo de foco obligatorio de 2px para navegación fluida por teclado</li>',
      '#medir .cs-fe-card:nth-child(3) .tag': 'Rendimiento y Accesibilidad',
      '#medir .cs-fe-card:nth-child(3) h3': 'Cero Desplazamientos y Virtualización',
      '#medir .cs-fe-card:nth-child(3) p': 'Optimización para visualización de miles de registros sin pérdida de fluidez:',
      '#medir .cs-fe-card:nth-child(3) ul': '<li>Altura fija de 72 px ideal para librerías de virtualización (<code>FlatList</code> / <code>react-window</code>)</li><li>Tipografía tabular para alinear los decimales con exactitud</li><li>Generación automática de <code>accessibilityLabel</code> para lectores de pantalla</li><li>Truncamiento inteligente que conserva importes y estados siempre visibles</li>'
    },

    fr: {
      '.pf-hero .eyebrow': '<b>Projet 12</b> · Design System · Banque d’Entreprise B2B · Design Engineering',
      '.pf-hero h1': 'Une seule ligne de relevé, <em>tous les cas complexes résolus.</em>',
      '.pf-hero .lede': 'Famille de composants dédiée au relevé de transactions pour cartes d’entreprise : anatomie atomique, matrice d’états, design tokens sémantiques et handoff avec schéma JSON et implémentations de référence pour React Native et Jetpack Compose, conçus avec l’aide de l’IA. Documenté sur une planche interactive de 1920 × 1080.',
      '.cs-note': 'Architecture de Design System · Standardisation des composants financiers et réconciliation B2B',

      // Meta
      '.pf-meta div:nth-child(1) dd': 'Design System Lead, UI & Ingénierie de Design',
      '.pf-meta div:nth-child(2) dd': 'Design System & Architecture de Composants · Web et Mobile',
      '.pf-meta div:nth-child(3) dd': 'Famille TransactionLedger, matrice d’états, tokens sémantiques, schéma JSON, planche interactive',
      '.pf-meta div:nth-child(4) dd': 'Figma · Antigravity IDE · React · TypeScript · Zod',

      // Links
      '.pf-links a[href="#contexto"]': 'Contexte',
      '.pf-links a[href="#anatomia"]': 'Anatomie',
      '.pf-links a[href="#estados"]': 'États',
      '.pf-links a[href="#tokens"]': 'Tokens',
      '.pf-links a[href="#handoff"]': 'Handoff',
      '.pf-links a[href="#prancha"]': 'Planche',
      '.pf-links a[href="#medir"]': 'Business Case',

      // Context
      '#contexto .eyebrow': 'Le problème',
      '#contexto h2': 'Chaque plateforme réinventait son propre affichage de transaction.',
      '#contexto .lede': 'Le projet s’attaque à un point de friction majeur des produits corporate multi-cartes : le mobile et le web traitaient de manière hétérogène les paiements fractionnés, les opérations internationales et les rejets, provoquant des erreurs comptables et un travail d’ingénierie récurrent.',
      '#contexto .callout': '<b>Brief :</b> une source unique de vérité. Un composant couvrant l’ensemble des états métier et des cas limites réels, prêt à être codé sans ambiguïté.',

      // Anatomy
      '#anatomia .eyebrow': '<b>01</b> · Anatomie du Composant',
      '#anatomia h2': '72 px de hauteur, quatre blocs structurés, zéro décalage visuel.',
      '#anatomia .lede': 'Icône marchand, libellés de dépense, montant et pastille d’état. Les chiffres tabulaires assurent l’alignement strict des centimes lors du défilement.',
      '#anatomia figcaption': '<b>Recréation interactive du relevé</b> avec les transactions réelles de test et les tokens du système : hover, appui et focus reflètent les états natifs du composant.',
      '#anatomia .cs-spec div:nth-child(1)': '<b>1 · Conteneur</b>Hauteur 72 px, espacement horizontal <code>spacing-md</code> (16 px).',
      '#anatomia .cs-spec div:nth-child(2)': '<b>2 · Icône</b>44 × 44 px pour le logo ou l’avatar, centré verticalement.',
      '#anatomia .cs-spec div:nth-child(3)': '<b>3 · Contenu</b>Intitulé 15 px medium, ligne secondaire 13 px regular.',
      '#anatomia .cs-spec div:nth-child(4)': '<b>4 · Montant</b>16 px semibold avec chiffres tabulaires et pastille d’état en dessous.',
      '#anatomia .cs-out': 'Survolez, touchez ou naviguez au clavier (Tab) : chaque ligne affiche le texte énoncé par le lecteur d’écran.',

      // Modular Family
      '#familia .eyebrow': '<b>02</b> · Famille Modulaire',
      '#familia h2': 'Deux composants ciblés plutôt qu’un seul composant à cinquante props.',
      '#familia .lede': 'Un composant monolithique semblerait plus direct à importer, mais chaque particularité entraînerait l’ajout d’une propriété supplémentaire. Isoler la ligne de la section par date fige les contrats et clarifie les rôles.',
      '#familia .cs-two .pf-card:nth-child(1) .tag': 'Approche A',
      '#familia .cs-two .pf-card:nth-child(1) h3': 'Composant Monolithique',
      '#familia .cs-two .pf-card:nth-child(1) p': 'Un composant massif cumulant l’ensemble des variantes et règles.',
      '#familia .cs-two .pf-card:nth-child(1) ul': '<li>Importation unique en apparence</li><li>Moins de documentation immédiate</li><li>Complexité interne grandissante à chaque exception</li>',
      '#familia .cs-two .pf-card:nth-child(2) .tag': '<b>Sélectionnée</b> · Approche B',
      '#familia .cs-two .pf-card:nth-child(2) h3': 'TransactionRow + LedgerGroup',
      '#familia .cs-two .pf-card:nth-child(2) p': 'La ligne et le regroupement temporel divisés en entités indépendantes.',
      '#familia .cs-two .pf-card:nth-child(2) ul': '<li>Responsabilité unique par composant</li><li>LedgerGroup prend en charge le tri calendaire et les en-têtes collants</li><li>Propriétés typées et validées par JSON Schema</li><li>Éprouvé face aux 7 cas de test les plus extrêmes</li>',

      // States
      '#estados .eyebrow': '<b>03</b> · États & Cas Limites',
      '#estados h2': 'Quatre états d’interaction × trois extrêmes métier.',
      '#estados .lede': 'La matrice confronte les états de surface aux situations critiques : transactions en devises avec conversion et taxes, opérations refusées ou remboursées avec motif explicite, et désignations marchandes de plus de 35 caractères.',
      '#estados .cs-states div:nth-child(1)': '<i style="background:#FFFFFF"></i><b>Défaut</b><code>#FFFFFF</code> · surface au repos',
      '#estados .cs-states div:nth-child(2)': '<i style="background:#F8F9FA"></i><b>Hover</b><code>#F8F9FA</code> · desktop uniquement',
      '#estados .cs-states div:nth-child(3)': '<i style="background:#F1F3F5"></i><b>Pressé</b><code>#F1F3F5</code> · appui ou clic tactile',
      '#estados .cs-states div:nth-child(4)': '<i style="background:#fff;box-shadow:inset 0 0 0 2px #2563EB"></i><b>Focus</b>Anneau intérieur 2 px <code>#2563EB</code> · clavier',
      '#estados figcaption': '<b>Vue de la planche, section 2.</b> Matrice d’états 4 × 3 et bac à sable pour tester en temps réel la troncature des libellés.',

      // Tokens
      '#tokens .eyebrow': '<b>04</b> · Tokens Sémantiques',
      '#tokens h2': 'Contraste rigoureusement calculé, non estimé.',
      '#tokens .lede': 'Les tokens définissent le rôle fonctionnel des couleurs au lieu d’une simple valeur hexadécimale. Les taux de contraste sont conformes aux directives WCAG 2.1.',
      '#tokens figcaption': '<b>Capture de la planche, section 3.</b> Récapitulatif des contrastes certifiés conformes au niveau WCAG AAA.',

      // Handoff
      '#handoff .eyebrow': '<b>05</b> · Handoff Assisté par IA',
      '#handoff h2': 'Du composant au code source grâce à la structuration par IA.',
      '#handoff .lede': 'Un workflow qui sollicite des modèles d’IA pour éditer le JSON Schema des propriétés et produire des implémentations de référence propres pour React Native et Jetpack Compose.',
      '#handoff .cs-hlab:nth-child(1)': 'Extrait du Schéma Généré',
      '#handoff figcaption': '<b>Planche, section 4.</b> Contrat de données et code de référence destinés aux ingénieurs frontend.',

      // Board
      '#prancha .eyebrow': 'Planche Technique',
      '#prancha h2': 'L’ensemble de la documentation accessible et explorable.',
      '#prancha .lede': 'La planche est une application React regroupant les quatre chapitres et un simulateur de réconciliation de dépenses. Chargement à la demande.',
      '#prancha .go span': '▶ Charger la planche interactive',
      '#prancha .cs-hints div:nth-child(1)': '<b>Anatomie</b>Cliquez sur les repères chiffrés pour analyser les tokens.',
      '#prancha .cs-hints div:nth-child(2)': '<b>Laboratoire</b>Saisissez des textes longs pour observer la troncature dynamique.',
      '#prancha .cs-hints div:nth-child(3)': '<b>Mode Dev</b>Affichez les cotes et la grille de base de 8 px.',
      '#prancha .cs-hints div:nth-child(4)': '<b>Simulateur</b>Relevé opérationnel complet avec filtres d’état.',
      '#prancha .cs-open': 'Ouvrir la planche en plein écran ↗',
      '#prancha figcaption': '<b>Planche interactive en React.</b> Documentation vivante avec tokens sémantiques, matrices de composants et simulateur de réconciliation financière.',

      // Business Case
      '#medir .eyebrow': '<b>06</b> · Business Case & Efficacité Opérationnelle',
      '#medir h2': 'Impact projeté sur la Réconciliation B2B et la Vélocité Dev.',
      '#medir .lede': 'Comment la standardisation de TransactionLedger fait chuter de ~42 % le temps de réconciliation comptable mensuelle, élimine les anomalies de QA et réduit de 60 % le cycle de développement.',
      '#medir .cs-kpi-card:nth-child(1) .cs-kpi-label': 'Temps de Rapprochement Comptable',
      '#medir .cs-kpi-card:nth-child(1) .cs-kpi-desc': 'L’anatomie uniforme de 72px avec états explicites (Réconcilié, En attente, Rejeté avec motif, Remboursé) et chiffres tabulaires réduit de moitié le temps consacré au contrôle manuel des écritures.',
      '#medir .cs-kpi-card:nth-child(2) .cs-kpi-label': 'Taux de Rétention du Chiffre d’Affaires (NDR)',
      '#medir .cs-kpi-card:nth-child(2) .cs-kpi-desc': 'La clarté absolue par collaborateur et centre de coûts fluidifie la gestion interne, encourageant l’émission et l’usage intensif de cartes d’entreprise supplémentaires.',
      '#medir .cs-kpi-card:nth-child(3) .cs-kpi-label': 'Volume de Sollicitations Support B2B',
      '#medir .cs-kpi-card:nth-child(3) .cs-kpi-desc': 'Exposer immédiatement le motif de rejet dans la ligne même du relevé supprime les sollicitations auprès du support d’assistance aux entreprises.',
      '#medir .cs-kpi-card:nth-child(4) .cs-kpi-label': 'Délai de Livraison Ingénierie',
      '#medir .cs-kpi-card:nth-child(4) .cs-kpi-desc': 'Une spécification unifiée avec tokens, schéma JSON validé par Zod et parité mobile/web fait passer le développement de nouveaux écrans de 3 semaines à 3 jours ouvrés.',

      // Handoff Frontend
      '#medir .cs-fe-head .eyebrow': '<b>Handoff</b> · Architecture Frontend',
      '#medir .cs-fe-head h2': 'Schéma JSON typé, design tokens sémantiques et virtualisation fluide.',
      '#medir .cs-fe-head .lede': 'Architecture conçue pour une adoption immédiate dans les design systems d’entreprise, avec validation de contrat à l’exécution et accessibilité contrôlée.',
      '#medir .cs-fe-card:nth-child(1) .tag': 'Contrat de Données',
      '#medir .cs-fe-card:nth-child(1) h3': 'Schéma Typé (TypeScript / Zod)',
      '#medir .cs-fe-card:nth-child(1) p': 'Validation structurelle des données côté client protégeant l’UI des valeurs nulles sur les opérations internationales :',
      '#medir .cs-fe-card:nth-child(1) ul': '<li>Stockage des montants sous forme d’entiers en centimes (<code>amountCents</code>) pour éviter les arrondis imprécis</li><li>Énumérations fermées pour les statuts et réseaux de paiement</li><li>Métadonnées pour les devises étrangères (taux de change, marge et taxes)</li><li>Parsing rigoureux à l’exécution sur web et mobile</li>',
      '#medir .cs-fe-card:nth-child(2) .tag': 'Design Tokens',
      '#medir .cs-fe-card:nth-child(2) h3': 'Tokens avec Contraste WCAG AAA',
      '#medir .cs-fe-card:nth-child(2) p': 'Matrice colorimétrique contrôlée garantissant un ratio de contraste supérieur à 7.0:1 dans chaque état :',
      '#medir .cs-fe-card:nth-child(2) ul': '<li><code>--cs-tx: #111827</code> (Contraste 16.5:1 sur fond blanc)</li><li><code>--cs-ok: #166534</code> sur fond vert (7.4:1 AAA)</li><li><code>--cs-bad: #991B1B</code> sur fond d’alerte (7.8:1 AAA)</li><li>Indicateur de focus de 2px obligatoire pour la navigation fluide au clavier</li>',
      '#medir .cs-fe-card:nth-child(3) .tag': 'Performance & A11y',
      '#medir .cs-fe-card:nth-child(3) h3': 'Zéro Décalage Visuel & Virtualisation',
      '#medir .cs-fe-card:nth-child(3) p': 'Ingénierie optimisée pour faire défiler des milliers d’écritures à 60 fps sans saccade :',
      '#medir .cs-fe-card:nth-child(3) ul': '<li>Hauteur constante de 72 px idéale pour la virtualisation (<code>FlatList</code> / <code>react-window</code>)</li><li>Police tabulaire alignant strictement les décimales</li><li>Génération automatique d’un <code>accessibilityLabel</code> détaillé pour lecteurs d’écran</li><li>Troncature en cascade préservant toujours les montants et statuts</li>'
    }
  };

  if (window.PORTFOLIO_I18N && window.PORTFOLIO_I18N.registerCase) {
    window.PORTFOLIO_I18N.registerCase(CASE_SLUG, translations);
  } else {
    window.PORTFOLIO_CASES_I18N = window.PORTFOLIO_CASES_I18N || {};
    window.PORTFOLIO_CASES_I18N[CASE_SLUG] = translations;
  }
})();

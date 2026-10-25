/* ==========================================================================
   Translations for Case 11: Méliuz · Fatura e parcelamento
   Supported: en (English), es (Español), fr (Français)
   ========================================================================== */
(function(){
  'use strict';

  var CASE_SLUG = 'meliuz-fatura';

  var translations = {
    en: {
      '.pf-hero .eyebrow': '<b>Case 11</b> · Product Design · Fintech & Credit · Omnichannel',
      '.pf-hero h1': 'Display installment costs <em>before the revolving credit trap.</em>',
      '.pf-hero .lede': 'Invoice management, credit limit control, and installment simulation across three views: mobile dashboard and bottom-sheet simulator, plus a consolidated desktop portal. The simulator calculates interest, taxes (IOF), and APR (CET) before user confirmation. Functional React prototype.',
      '.mz-note': 'Product Study & Frontend Architecture · Transparent credit installment simulator and omnichannel invoice management',

      // Meta
      '.pf-meta div:nth-child(1) dd': 'UI Design, Interaction Design, and Frontend Architecture',
      '.pf-meta div:nth-child(2) dd': 'Executive Business Case & UI Architecture · Mobile & Desktop',
      '.pf-meta div:nth-child(3) dd': 'Mobile dashboard, bottom-sheet simulator, desktop portal, design tokens, and React prototype',
      '.pf-meta div:nth-child(4) dd': 'Figma · Antigravity IDE · React · TypeScript · CSS Grid',

      // Links
      '.pf-links a[href="#contexto"]': 'Context',
      '.pf-links a[href="#omnichannel"]': 'Omnichannel',
      '.pf-links a[href="#simulador"]': 'Simulator',
      '.pf-links a[href="#desktop"]': 'Desktop',
      '.pf-links a[href="#ia"]': 'AI Review',
      '.pf-links a[href="#prototipo"]': 'Prototype',
      '.pf-links a[href="#medir"]': 'Business Case',

      // Context
      '#contexto .eyebrow': 'The problem',
      '#contexto h2': 'Users unaware of installments fall straight into revolving debt.',
      '#contexto .lede': 'Public financial metrics reveal that cardholders facing steep invoices frequently trigger high-interest revolving credit simply because structured installments are hidden or obscure. Furthermore, desktop users lack tools to reconcile statements comfortably.',
      '#contexto .callout': '<b>Brief:</b> create a transparent financial experience that educates cardholders at critical financial moments with upfront fees.',

      // Omnichannel
      '#omnichannel .eyebrow': '<b>01</b> · Omnichannel',
      '#omnichannel h2': 'Mobile acts fast; desktop reconciles thoroughly.',
      '#omnichannel .lede': 'The easiest path would be stretching the mobile layout across wider screens. Instead, each platform is purpose-built for its strengths, sharing identical tokens for color, typography, and spacing.',
      '#omnichannel .mz-two .pf-card:nth-child(1) .tag': 'Approach A',
      '#omnichannel .mz-two .pf-card:nth-child(1) h3': 'Desktop as Stretched Mobile',
      '#omnichannel .mz-two .pf-card:nth-child(1) p': 'A single responsive web view scaling up mobile layouts.',
      '#omnichannel .mz-two .pf-card:nth-child(1) ul': '<li>Less initial engineering effort</li><li>Simpler codebase maintenance</li><li>Wastes desktop canvas precisely where users examine detailed statements</li>',
      '#omnichannel .mz-two .pf-card:nth-child(2) .tag': '<b>Selected</b> · Approach B',
      '#omnichannel .mz-two .pf-card:nth-child(2) h3': 'Contextual Density per Platform',
      '#omnichannel .mz-two .pf-card:nth-child(2) p': 'Unified design tokens with layouts tailored to device affordances.',
      '#omnichannel .mz-two .pf-card:nth-child(2) ul': '<li>Mobile: immediate triage and primary actions (Pay, Split)</li><li>Desktop: high information density for audit and limit calibration</li><li>Tabular numerals across platforms for precise decimal alignment</li><li>Limit slider exclusively on desktop where mouse precision excels</li>',

      '#omnichannel .mz-three .pf-card:nth-child(1) .tag': 'Screen 1 · Mobile',
      '#omnichannel .mz-three .pf-card:nth-child(1) h3': 'Dashboard & Limits',
      '#omnichannel .mz-three .pf-card:nth-child(1) ul': '<li>Bicolor gauge of spent vs. available limit</li><li>Pay and Installment actions side by side</li><li>Transactions with category badges and cashback tags</li>',
      '#omnichannel .mz-three .pf-card:nth-child(2) .tag': 'Screen 2 · Mobile',
      '#omnichannel .mz-three .pf-card:nth-child(2) h3': 'Bottom-Sheet Simulator',
      '#omnichannel .mz-three .pf-card:nth-child(2) ul': '<li>Down-payment quick chips ($0, $300, $500)</li><li>Three installment tiers, with one highlighted as best value</li><li>Regulatory breakdown of interest, taxes, and total CET</li>',
      '#omnichannel .mz-three .pf-card:nth-child(3) .tag': 'Screen 3 · Desktop',
      '#omnichannel .mz-three .pf-card:nth-child(3) h3': 'Consolidated View',
      '#omnichannel .mz-three .pf-card:nth-child(3) ul': '<li>Fixed lateral navigation rail</li><li>6-month spend history comparison with rolling average</li><li>Data grid with search, multi-filters, and limit slider</li>',

      // Simulator
      '#simulador .eyebrow': '<b>02</b> · Simulator',
      '#simulador h2': 'Interest, taxes, and APR calculated directly on screen.',
      '#simulador .lede': 'The simulator slides up as a bottom sheet. Every installment tier reveals the monthly payment, total sum, and effective monthly rate. Applying an upfront payment instantly recalculates all terms.',
      '#simulador figcaption': '<b>Interactive recreation of the bottom-sheet simulator,</b> featuring the mathematical formulas of the React prototype. Illustrative rates and amounts.',
      '#simulador .mz-sh b': 'Installment Options',
      '#simulador .mz-sh span': 'Statement: $2,450.80 · Due Oct 15',
      '#simulador .mz-box .h': 'Down Payment <span>Reduces future finance interest</span>',
      '#simulador .mz-chips button:nth-child(1)': 'No down payment',
      '#simulador .mz-lbl': 'Select a plan <span>Central Bank cap compliant</span>',
      '#simulador .mz-reg b': 'Regulatory Transparency',
      '#simulador .mz-side p:nth-child(1)': 'Select a down payment and plan. The calculation follows the Price formula: the installment amortizes remaining debt after the upfront payment, factoring in statutory taxes.',
      '#simulador .mz-side p:nth-child(2)': 'The 6-month plan opens marked as "Recommended". All totals are displayed side by side with full disclosure of rates.',

      // Desktop
      '#desktop .eyebrow': '<b>03</b> · Desktop Experience',
      '#desktop h2': 'Information density for peace of mind, not rushed decisions.',
      '#desktop .lede': 'On desktop, the credit statement expands into a full control center: historical metrics, granular entries, and limit controls using the same design language as mobile.',
      '#desktop figcaption': '<b>Desktop prototype viewport.</b> 12 sample transactions modeled after real merchants, verifying layout resilience, wrapping, and numeric alignment.',
      '#desktop .mz-desk ul li:nth-child(1)': '<b>Six-month billing history</b> in bar charts, featuring historical average benchmark and the current cycle highlighted.',
      '#desktop .mz-desk ul li:nth-child(2)': '<b>High-density data grid</b> with instant search, category filters, installment progress, and itemized cashback.',
      '#desktop .mz-desk ul li:nth-child(3)': '<b>Credit limit slider</b> on the sidebar for micro-precision adjustments with cursor control.',
      '#desktop .mz-desk ul li:nth-child(4)': '<b>Explicit status badges:</b> Open, Closed, Settled, and Restructured.',

      // AI
      '#ia .eyebrow': '<b>04</b> · AI-Assisted Audit',
      '#ia h2': 'An automated regulatory review powered by LLMs.',
      '#ia .lede': 'The "Audit BACEN Terms" trigger dispatches simulation parameters to an AI model, validating terms against consumer credit standards and returning structured compliance feedback.',
      '#ia .mz-audit .pf-card .tag': 'AI Validation Scope',
      '#ia .mz-audit .pf-card h3': 'Four Compliance Checks',
      '#ia .mz-audit .pf-card ul': '<li>Are monthly and annual APR rates visible prior to agreement?</li><li>Is tax (IOF) segregated in monetary units outside the nominal rate?</li><li>Are there forced defaults or pre-checked opt-ins?</li><li>Does the upfront payment reduce principal before computing interest?</li>',
      '#ia .mz-res .pill': 'Sample AI Evaluation',
      '#ia .mz-res ol li:nth-child(1)': '<b>APR and annual cost transparency</b>Monthly and annual rates are clearly exposed before confirmation.',
      '#ia .mz-res ol li:nth-child(2)': '<b>Tax segregation (IOF)</b>Taxes are calculated separately in local currency without hidden fee rollups.',
      '#ia .mz-res ol li:nth-child(3)': '<b>Consumer neutrality & dark-pattern prevention</b>No forced options. Recommended tiers carry clear mathematical justification.',
      '#ia > .wrap > p.rv': 'The portfolio client provides this reference response. It provides a helpful reminder: AI assistance accelerates design QA, but human oversight remains indispensable.',

      // Prototype
      '#prototipo .eyebrow': 'Functional Prototype',
      '#prototipo h2': 'Three synchronized viewports.',
      '#prototipo .lede': 'Adjusting credit limits, freezing cards, or simulating installment plans in one view synchronizes across all others. Loads on demand.',
      '#prototipo .go span': '▶ Launch interactive prototype',
      '#prototipo .mz-hints div:nth-child(1)': '<b>Installment Simulator</b>Opens the interactive bottom sheet.',
      '#prototipo .mz-hints div:nth-child(2)': '<b>Transparency Card</b>Exposes real-time APR, interest, and tax formulas.',
      '#prototipo .mz-hints div:nth-child(3)': '<b>Cashback</b>Green badges highlight rewards earned per purchase.',
      '#prototipo .mz-hints div:nth-child(4)': '<b>Views</b>Header toggles between split-view and isolated platforms.',
      '#prototipo .mz-links a:nth-child(1)': 'Open prototype in full screen ↗',
      '#prototipo .mz-links a:nth-child(2)': 'Open desktop mode ↗',
      '#prototipo figcaption': '<b>Functional React prototype.</b> Interactive financial engine calculating APR convergence, multi-view state synchronization, and Central Bank regulatory compliance.',

      // Business Case
      '#medir .eyebrow': '<b>07</b> · Business Case & Default Prevention',
      '#medir h2': 'Projected impact on default rates (PCLD), APR, and LTV.',
      '#medir .lede': 'How transparent installment calculators reduce involuntary revolving credit by ~24%, protect cardholder credit scores, and safeguard card lifetime value.',
      '#medir .mz-kpi-card:nth-child(1) .mz-kpi-label': 'Default & Revolving Risk (PCLD)',
      '#medir .mz-kpi-card:nth-child(1) .mz-kpi-desc': 'Surfacing structured installment alternatives with explicit APR and total interest before due dates prevents involuntary rollover into toxic 90-day revolving credit defaults.',
      '#medir .mz-kpi-card:nth-child(2) .mz-kpi-label': 'Cardholder Retention (LTV)',
      '#medir .mz-kpi-card:nth-child(2) .mz-kpi-desc': 'Users who inadvertently fall into revolving debt are 3.2× more likely to churn or have accounts frozen. Predictable financing preserves financial health and engagement in the cashback ecosystem.',
      '#medir .mz-kpi-card:nth-child(3) .mz-kpi-label': 'Flexible Down-Payment Adoption',
      '#medir .mz-kpi-card:nth-child(3) .mz-kpi-desc': 'Reactive down-payment chips encourage immediate partial paydown, lowering the total financed principal and mitigating balance sheet capital exposure.',
      '#medir .mz-kpi-card:nth-child(4) .mz-kpi-label': 'Invoice Dispute Inquiries',
      '#medir .mz-kpi-card:nth-child(4) .mz-kpi-desc': 'Desktop audit tools and transparent categorizations eliminate unexpected charge surprises, reducing Tier-1 support tickets and elevating transactional NPS.',

      // Handoff
      '#medir .mz-fe-head .eyebrow': '<b>Handoff</b> · Frontend Engineering',
      '#medir .mz-fe-head h2': 'Client-side financial engine, synchronized state, zero delay.',
      '#medir .mz-fe-head .lede': 'Architecture engineered to decouple interest calculations from network latencies, delivering 0ms calculations with WCAG AAA accessibility.',
      '#medir .mz-fe-card:nth-child(1) .tag': 'Client-Side Engine',
      '#medir .mz-fe-card:nth-child(1) h3': 'Decoupled Financial Engine',
      '#medir .mz-fe-card:nth-child(1) p': 'Mathematical calculations executed on device, eliminating round-trip API calls on every slider or chip interaction:',
      '#medir .mz-fe-card:nth-child(1) ul': '<li>French Amortization (Price PMT) with constant annuities</li><li>Fixed IOF (0.38%) and daily pro-rata tax formulas</li><li>Effective APR (monthly and annual) convergence algorithms</li><li>Zero network latency during financial scenario comparisons</li>',
      '#medir .mz-fe-card:nth-child(2) .tag': 'Omnichannel Store',
      '#medir .mz-fe-card:nth-child(2) h3': 'Synchronized Reactive State',
      '#medir .mz-fe-card:nth-child(2) p': 'Shared state layer (Zustand / Redux pattern) harmonizing mobile and desktop without logic duplication:',
      '#medir .mz-fe-card:nth-child(2) ul': '<li>Single source of truth for limits, locks, and balances</li><li>Fluid transition between mobile sheets and desktop split-views</li><li>Synchronous persistence of user input during simulation</li><li>Strict side-effect containment on financial mutations</li>',
      '#medir .mz-fe-card:nth-child(3) .tag': 'Financial A11y',
      '#medir .mz-fe-card:nth-child(3) h3': 'Accessibility & Compliance',
      '#medir .mz-fe-card:nth-child(3) p': 'Interface tailored to banking regulations and WCAG AAA accessibility criteria:',
      '#medir .mz-fe-card:nth-child(3) ul': '<li>Plan radio selectors with dynamic <code>role="radio"</code> and <code>aria-checked</code></li><li>Complete ArrowDown / ArrowUp keyboard traversal</li><li>Audio descriptions of financial plans for screen readers</li><li>Tabular figures ensuring rock-solid vertical decimal alignment</li>'
    },

    es: {
      '.pf-hero .eyebrow': '<b>Caso 11</b> · Product Design · Fintech y Crédito · Omnicanal',
      '.pf-hero h1': 'Mostrar el costo de financiar <em>antes del crédito rotativo.</em>',
      '.pf-hero .lede': 'Gestión de facturas, control de límite y simulación de cuotas en tres vistas: dashboard y simulador en móvil, más panel consolidado en escritorio. El simulador desglosa intereses, impuestos (IOF) y Costo Efectivo Total (CET) antes de confirmar. Prototipo funcional en React.',
      '.mz-note': 'Estudio de Producto y Arquitectura Frontend · Simulador de crédito transparente y gestión de estado de cuenta omnicanal',

      // Meta
      '.pf-meta div:nth-child(1) dd': 'UI Design, Diseño de Interacción y Arquitectura Frontend',
      '.pf-meta div:nth-child(2) dd': 'Executive Business Case & UI Architecture · Móvil y Escritorio',
      '.pf-meta div:nth-child(3) dd': 'Dashboard móvil, simulador bottom-sheet, portal escritorio, tokens y prototipo React',
      '.pf-meta div:nth-child(4) dd': 'Figma · Antigravity IDE · React · TypeScript · CSS Grid',

      // Links
      '.pf-links a[href="#contexto"]': 'Contexto',
      '.pf-links a[href="#omnichannel"]': 'Omnicanal',
      '.pf-links a[href="#simulador"]': 'Simulador',
      '.pf-links a[href="#desktop"]': 'Escritorio',
      '.pf-links a[href="#ia"]': 'Revisión IA',
      '.pf-links a[href="#prototipo"]': 'Prototipo',
      '.pf-links a[href="#medir"]': 'Business Case',

      // Context
      '#contexto .eyebrow': 'El problema',
      '#contexto h2': 'Quien no conoce las opciones de financiación cae en el crédito rotativo.',
      '#contexto .lede': 'Datos de la industria muestran que titulares con facturas elevadas caen en el crédito rotativo de altos intereses por desconocer alternativas estructuradas. Y en escritorio, echan en falta herramientas para conciliar gastos.',
      '#contexto .callout': '<b>Brief:</b> una experiencia financiera transparente que eduque en momentos de tensión y exponga todas las tasas claramente.',

      // Omnichannel
      '#omnichannel .eyebrow': '<b>01</b> · Omnicanal',
      '#omnichannel h2': 'El móvil decide rápido; el escritorio concilia con calma.',
      '#omnichannel .lede': 'La salida fácil habría sido estirar el diseño móvil en pantallas grandes. Opté por diseñar cada entorno para su mejor función, compartiendo los mismos tokens de color, tipografía y espacio.',
      '#omnichannel .mz-two .pf-card:nth-child(1) .tag': 'Enfoque A',
      '#omnichannel .mz-two .pf-card:nth-child(1) h3': 'Escritorio como Móvil Estirado',
      '#omnichannel .mz-two .pf-card:nth-child(1) p': 'Una vista web responsive que replica el layout móvil en pantallas amplias.',
      '#omnichannel .mz-two .pf-card:nth-child(1) ul': '<li>Menor esfuerzo de desarrollo inicial</li><li>Mantenimiento simple</li><li>Desperdicia el espacio justo donde el usuario audita extractos</li>',
      '#omnichannel .mz-two .pf-card:nth-child(2) .tag': '<b>Seleccionado</b> · Enfoque B',
      '#omnichannel .mz-two .pf-card:nth-child(2) h3': 'Densidad Contextual por Plataforma',
      '#omnichannel .mz-two .pf-card:nth-child(2) p': 'Mismos componentes y tokens con layouts ajustados a cada dispositivo.',
      '#omnichannel .mz-two .pf-card:nth-child(2) ul': '<li>Móvil: acciones inmediatas y decisiones críticas (pagar, financiar)</li><li>Escritorio: alta densidad para revisar movimientos y calibrar el límite</li><li>Cifras tabulares en ambos para alinear decimales con precisión</li><li>Control deslizante de límite solo en escritorio, donde el ratón aporta precisión</li>',

      '#omnichannel .mz-three .pf-card:nth-child(1) .tag': 'Pantalla 1 · Móvil',
      '#omnichannel .mz-three .pf-card:nth-child(1) h3': 'Dashboard y Límite',
      '#omnichannel .mz-three .pf-card:nth-child(1) ul': '<li>Barra bicolor de saldo utilizado y disponible</li><li>Acciones de Pagar y Financiar en paralelo</li><li>Movimientos con etiquetas de categoría y cashback</li>',
      '#omnichannel .mz-three .pf-card:nth-child(2) .tag': 'Pantalla 2 · Móvil',
      '#omnichannel .mz-three .pf-card:nth-child(2) h3': 'Simulador Bottom-Sheet',
      '#omnichannel .mz-three .pf-card:nth-child(2) ul': '<li>Pago inicial con accesos directos ($0, $300, $500)</li><li>Tres planes de cuotas, con uno destacado como recomendado</li><li>Panel regulatorio con intereses, impuestos y CET</li>',
      '#omnichannel .mz-three .pf-card:nth-child(3) .tag': 'Pantalla 3 · Escritorio',
      '#omnichannel .mz-three .pf-card:nth-child(3) h3': 'Vista Consolidada',
      '#omnichannel .mz-three .pf-card:nth-child(3) ul': '<li>Barra de navegación lateral fija</li><li>Histórico semestral con promedio de gasto comparativo</li><li>Tabla con búsqueda rápida, filtros y ajuste de límite</li>',

      // Simulator
      '#simulador .eyebrow': '<b>02</b> · Simulador',
      '#simulador h2': 'Intereses, impuestos y CET en la misma pantalla de decisión.',
      '#simulador .lede': 'El simulador se despliega como bottom sheet sobre el dashboard. Cada opción muestra cuota, importe total y CET mensual. Añadir un pago inicial recalcula todo al instante.',
      '#simulador figcaption': '<b>Recreación interactiva del simulador bottom-sheet,</b> con las fórmulas matemáticas del prototipo React. Valores y tasas ilustrativos.',
      '#simulador .mz-sh b': 'Opciones de financiación',
      '#simulador .mz-sh span': 'Factura de R$ 2.450,80 · Vence 15 Oct',
      '#simulador .mz-box .h': 'Pago inicial <span>Amortiza intereses futuros</span>',
      '#simulador .mz-chips button:nth-child(1)': 'Sin anticipo',
      '#simulador .mz-lbl': 'Seleccione un plan <span>Conforme al límite legal</span>',
      '#simulador .mz-reg b': 'Transparencia Regulatoria',
      '#simulador .mz-side p:nth-child(1)': 'Seleccione el pago inicial y el plan. El cálculo utiliza la fórmula Price sobre el capital restante, desglosando impuestos reglamentarios.',
      '#simulador .mz-side p:nth-child(2)': 'El plan de 6 cuotas se abre destacado como "Recomendado". Todos los totales se muestran transparentemente.',

      // Desktop
      '#desktop .eyebrow': '<b>03</b> · Experiencia de Escritorio',
      '#desktop h2': 'Densidad para auditar con rigor, no para decidir con prisas.',
      '#desktop .lede': 'En escritorio, el estado de cuenta se transforma en un centro de control integral: histórico, desglose y límites con el mismo lenguaje de diseño que en móvil.',
      '#desktop figcaption': '<b>Captura del prototipo en escritorio.</b> 12 movimientos con marcas reales para validar legibilidad, saltos de línea y alineación de importes.',
      '#desktop .mz-desk ul li:nth-child(1)': '<b>Histórico de seis meses</b> en barras comparativas con promedio de gasto y mes en curso resaltado.',
      '#desktop .mz-desk ul li:nth-child(2)': '<b>Tabla de movimientos</b> con búsqueda instantánea, filtros multicategoría y cashback por compra.',
      '#desktop .mz-desk ul li:nth-child(3)': '<b>Límite ajustable</b> mediante slider en panel lateral con máxima precisión de cursor.',
      '#desktop .mz-desk ul li:nth-child(4)': '<b>Estados de factura:</b> Abierta, Cerrada, Pagada y Financiada.',

      // AI
      '#ia .eyebrow': '<b>04</b> · Auditoría con IA',
      '#ia h2': 'Una segunda lectura regulatoria con modelos de lenguaje.',
      '#ia .lede': 'El botón "Auditar Términos Bacen" envía las condiciones simuladas a un modelo de IA que evalúa la transparencia frente a las normativas bancarias de protección al consumidor.',
      '#ia .mz-audit .pf-card .tag': 'Alcance del Análisis',
      '#ia .mz-audit .pf-card h3': 'Cuatro Criterios Clave',
      '#ia .mz-audit .pf-card ul': '<li>¿Se muestra el CET mensual y anual antes de la contratación?</li><li>¿Está el impuesto (IOF) detallado en moneda local fuera de la tasa?</li><li>¿Existen casillas premarcadas o decisiones forzadas?</li><li>¿Reduce el pago inicial el capital antes de calcular intereses?</li>',
      '#ia .mz-res .pill': 'Respuesta de Ejemplo',
      '#ia .mz-res ol li:nth-child(1)': '<b>Transparencia de CET e intereses anuales</b>Tasas claramente visibles antes de aceptar cualquier compromiso financiero.',
      '#ia .mz-res ol li:nth-child(2)': '<b>Desglose de impuestos (IOF)</b>Cálculo tributario explícito sin cobros ocultos.',
      '#ia .mz-res ol li:nth-child(3)': '<b>Neutralidad en la decisión del consumidor</b>Sin tácticas coercitivas ni dark patterns. Recomendaciones plenamente fundamentadas.',
      '#ia > .wrap > p.rv': 'En el portafolio se incluye esta evaluación estática de muestra. Recuerda que la IA es una herramienta de apoyo que complementa pero no sustituye el juicio humano.',

      // Prototype
      '#prototipo .eyebrow': 'Prototipo Funcional',
      '#prototipo h2': 'Tres vistas completamente sincronizadas.',
      '#prototipo .lede': 'Modificar el límite, bloquear la tarjeta o calcular cuotas en una pantalla impacta de inmediato en las demás. Carga bajo demanda.',
      '#prototipo .go span': '▶ Cargar prototipo interactivo',
      '#prototipo .mz-hints div:nth-child(1)': '<b>Financiar Factura</b>Despliega el simulador interactivo en bottom sheet.',
      '#prototipo .mz-hints div:nth-child(2)': '<b>Transparencia</b>Desglosa intereses, impuestos y CET al instante.',
      '#prototipo .mz-hints div:nth-child(3)': '<b>Cashback</b>Insignias verdes indican la recompensa por compra.',
      '#prototipo .mz-hints div:nth-child(4)': '<b>Vistas</b>El selector superior alterna entre vistas combinadas y aisladas.',
      '#prototipo .mz-links a:nth-child(1)': 'Abrir prototipo a pantalla completa ↗',
      '#prototipo .mz-links a:nth-child(2)': 'Abrir en modo escritorio ↗',
      '#prototipo figcaption': '<b>Prototipo funcional en React.</b> Motor financiero con cálculo de CET, sincronización de estado multidispositivo y cumplimiento con normativas bancarias.',

      // Business Case
      '#medir .eyebrow': '<b>07</b> · Business Case y Prevención de Mora',
      '#medir h2': 'Impacto proyectado en mora (PCLD), retención y LTV.',
      '#medir .lede': 'Cómo la transparencia en el simulador disminuye el impago involuntario un ~24%, protege la solvencia del usuario y blinda el valor de ciclo de vida de la tarjeta.',
      '#medir .mz-kpi-card:nth-child(1) .mz-kpi-label': 'Riesgo de Mora y Crédito Rotativo (PCLD)',
      '#medir .mz-kpi-card:nth-child(1) .mz-kpi-desc': 'Ofrecer simulación estructurada con cálculo explícito de CET y tributos antes del vencimiento redirige al usuario hacia planes sostenibles, previniendo la entrada en crédito rotativo a 90 días.',
      '#medir .mz-kpi-card:nth-child(2) .mz-kpi-label': 'Retención de Titulares (LTV)',
      '#medir .mz-kpi-card:nth-child(2) .mz-kpi-desc': 'Usuarios atrapados en rotativo involuntario tienen 3,2× más probabilidades de cancelar la tarjeta. Financiar de forma consciente resguarda la salud financiera y la vinculación con el ecosistema Méliuz.',
      '#medir .mz-kpi-card:nth-child(3) .mz-kpi-label': 'Adopción de Pago Inicial Flexible',
      '#medir .mz-kpi-card:nth-child(3) .mz-kpi-desc': 'Los chips de amortización inmediata fomentan liquidar parte del saldo, reduciendo el capital financiado y disminuyendo la exposición crediticia de la fintech.',
      '#medir .mz-kpi-card:nth-child(4) .mz-kpi-label': 'Reclamaciones y Consultas de Facturación',
      '#medir .mz-kpi-card:nth-child(4) .mz-kpi-desc': 'La conciliación en escritorio y las etiquetas claras eliminan dudas sobre recargos, disminuyendo llamadas a soporte y mejorando el NPS transaccional.',

      // Handoff
      '#medir .mz-fe-head .eyebrow': '<b>Handoff</b> · Ingeniería Frontend',
      '#medir .mz-fe-head h2': 'Motor financiero client-side, estado sincronizado y latencia cero.',
      '#medir .mz-fe-head .lede': 'Arquitectura diseñada para desacoplar el cálculo financiero de la red, garantizando respuestas en 0ms en el dispositivo con accesibilidad WCAG AAA.',
      '#medir .mz-fe-card:nth-child(1) .tag': 'Motor Client-Side',
      '#medir .mz-fe-card:nth-child(1) h3': 'Cálculo Financiero Desacoplado',
      '#medir .mz-fe-card:nth-child(1) p': 'Lógica de cálculo ejecutada directamente en el cliente, eliminando peticiones de red repetitivas:',
      '#medir .mz-fe-card:nth-child(1) ul': '<li>Fórmula Price (PMT) con amortización constante</li><li>Cálculo de impuestos pro-rata precisos</li><li>Convergencia algorítmica de Costo Efectivo Total (CET mensual y anual)</li><li>Latencia cero al comparar múltiples escenarios de financiación</li>',
      '#medir .mz-fe-card:nth-child(2) .tag': 'Estado Omnicanal',
      '#medir .mz-fe-card:nth-child(2) h3': 'Estado Reactivo Sincronizado',
      '#medir .mz-fe-card:nth-child(2) p': 'Almacén de estado unificado que coordina móvil y escritorio sin duplicar reglas comerciales:',
      '#medir .mz-fe-card:nth-child(2) ul': '<li>Única fuente de verdad para saldos, límites y bloqueos</li><li>Transición fluida entre hoja móvil y vista dividida de escritorio</li><li>Persistencia síncrona de selecciones durante la sesión</li><li>Aislamiento de efectos secundarios en mutaciones financieras</li>',
      '#medir .mz-fe-card:nth-child(3) .tag': 'Accesibilidad Financiera',
      '#medir .mz-fe-card:nth-child(3) h3': 'Accesibilidad y Cumplimiento Normativo',
      '#medir .mz-fe-card:nth-child(3) p': 'Interfaz construida según requerimientos normativos bancarios y pautas WCAG AAA:',
      '#medir .mz-fe-card:nth-child(3) ul': '<li>Selectores de plan con <code>role="radio"</code> y <code>aria-checked</code></li><li>Navegación completa con teclado (flechas arriba/abajo)</li><li>Descripciones de audio del plan financiero para lectores de pantalla</li><li>Tipografía tabular para una perfecta alineación visual de importes</li>'
    },

    fr: {
      '.pf-hero .eyebrow': '<b>Projet 11</b> · Product Design · Fintech & Crédit · Omnicanal',
      '.pf-hero h1': 'Afficher le coût des facilités de paiement <em>avant le piège du crédit renouvelable.</em>',
      '.pf-hero .lede': 'Gestion des relevés, ajustement des plafonds et simulation d’échéanciers sur trois écrans : tableau de bord mobile, simulateur en volet inférieur et portail desktop consolidé. Le simulateur détaille les intérêts, taxes et TAEG avant validation. Prototype fonctionnel React.',
      '.mz-note': 'Étude Produit & Architecture Frontend · Simulateur d’échelonnement transparent et gestion de facture omnicanale',

      // Meta
      '.pf-meta div:nth-child(1) dd': 'UI Design, Design d’Interaction et Architecture Frontend',
      '.pf-meta div:nth-child(2) dd': 'Business Case Exécutif & Architecture UI · Mobile et Desktop',
      '.pf-meta div:nth-child(3) dd': 'Dashboard mobile, simulateur bottom-sheet, portail desktop, tokens et prototype React',
      '.pf-meta div:nth-child(4) dd': 'Figma · Antigravity IDE · React · TypeScript · CSS Grid',

      // Links
      '.pf-links a[href="#contexto"]': 'Contexte',
      '.pf-links a[href="#omnichannel"]': 'Omnicanal',
      '.pf-links a[href="#simulador"]': 'Simulateur',
      '.pf-links a[href="#desktop"]': 'Desktop',
      '.pf-links a[href="#ia"]': 'Audit IA',
      '.pf-links a[href="#prototipo"]': 'Prototype',
      '.pf-links a[href="#medir"]': 'Business Case',

      // Context
      '#contexto .eyebrow': 'Le problème',
      '#contexto h2': 'Les clients ignorant les options d’échelonnement basculent dans le crédit revolving.',
      '#contexto .lede': 'Les analyses financières révèlent que de nombreux porteurs de carte ayant un encours important subissent le crédit revolving à taux élevé faute de connaître les facilités d’échelonnement. Sur ordinateur, les utilisateurs manquent d’outils pour auditer leurs dépenses posément.',
      '#contexto .callout': '<b>Brief :</b> concevoir une expérience financière transparente qui éclaire les choix aux moments cruciaux et expose chaque frais à l’avance.',

      // Omnichannel
      '#omnichannel .eyebrow': '<b>01</b> · Approche Omnicanale',
      '#omnichannel h2': 'Le mobile permet d’agir vite ; le desktop d’analyser en détail.',
      '#omnichannel .lede': 'La solution la plus rapide aurait été d’étirer le layout mobile sur grand écran. J’ai choisi de concevoir chaque environnement pour ses points forts, avec les mêmes tokens de couleurs, typographie et espacements.',
      '#omnichannel .mz-two .pf-card:nth-child(1) .tag': 'Approche A',
      '#omnichannel .mz-two .pf-card:nth-child(1) h3': 'Le Desktop comme Mobile Étiré',
      '#omnichannel .mz-two .pf-card:nth-child(1) p': 'Une webview responsive qui adapte le layout mobile sur écran large.',
      '#omnichannel .mz-two .pf-card:nth-child(1) ul': '<li>Moins d’effort initial de développement</li><li>Maintenance simplifiée</li><li>Gâche l’espace d’affichage là où le client souhaite justement vérifier son relevé</li>',
      '#omnichannel .mz-two .pf-card:nth-child(2) .tag': '<b>Sélectionnée</b> · Approche B',
      '#omnichannel .mz-two .pf-card:nth-child(2) h3': 'Densité Adaptée à Chaque Support',
      '#omnichannel .mz-two .pf-card:nth-child(2) p': 'Mêmes composants et tokens avec une disposition ajustée aux contextes d’usage.',
      '#omnichannel .mz-two .pf-card:nth-child(2) ul': '<li>Mobile : actions rapides et décisions immédiates (payer, échelonner)</li><li>Desktop : haute densité pour vérifier les transactions et moduler le plafond</li><li>Chiffres tabulaires sur les deux versions pour aligner les décimales</li><li>Curseur de plafond uniquement sur desktop, où la souris offre une précision chirurgicale</li>',

      '#omnichannel .mz-three .pf-card:nth-child(1) .tag': 'Écran 1 · Mobile',
      '#omnichannel .mz-three .pf-card:nth-child(1) h3': 'Tableau de bord & Plafond',
      '#omnichannel .mz-three .pf-card:nth-child(1) ul': '<li>Jauge bicolore montrant le disponible et l’encours</li><li>Boutons Payer et Échelonner côte à côte</li><li>Dépenses avec étiquettes de catégories et cashback</li>',
      '#omnichannel .mz-three .pf-card:nth-child(2) .tag': 'Écran 2 · Mobile',
      '#omnichannel .mz-three .pf-card:nth-child(2) h3': 'Simulateur Bottom-Sheet',
      '#omnichannel .mz-three .pf-card:nth-child(2) ul': '<li>Apport initial avec raccourcis (sans apport, 300 $, 500 $)</li><li>Trois formules, dont une mise en avant comme recommandée</li><li>Encadré de transparence affichant intérêts, taxes et TAEG</li>',
      '#omnichannel .mz-three .pf-card:nth-child(3) .tag': 'Écran 3 · Desktop',
      '#omnichannel .mz-three .pf-card:nth-child(3) h3': 'Vue Consolidée',
      '#omnichannel .mz-three .pf-card:nth-child(3) ul': '<li>Menu de navigation latéral fixe</li><li>Historique semestriel avec moyenne comparative des dépenses</li><li>Tableau de données avec recherche rapide, filtres et curseur de limite</li>',

      // Simulator
      '#simulador .eyebrow': '<b>02</b> · Simulateur Financier',
      '#simulador h2': 'Intérêts, taxes et TAEG affichés dès la sélection.',
      '#simulador .lede': 'Le simulateur s’ouvre en volet inférieur par-dessus le dashboard. Chaque échéancier affiche la mensualité, le coût global et le TAEG. Verser un acompte recalcule instantanément l’ensemble.',
      '#simulador figcaption': '<b>Recréation interactive du simulateur en volet inférieur,</b> basée sur les équations financières du prototype React. Taux et valeurs indicatifs.',
      '#simulador .mz-sh b': 'Options d’échelonnement',
      '#simulador .mz-sh span': 'Relevé de 2 450,80 $ · Échéance 15 oct.',
      '#simulador .mz-box .h': 'Acompte initial <span>Réduit les intérêts futurs</span>',
      '#simulador .mz-chips button:nth-child(1)': 'Sans acompte',
      '#simulador .mz-lbl': 'Sélectionnez une formule <span>Conforme aux plafonds réglementaires</span>',
      '#simulador .mz-reg b': 'Transparence Réglementaire',
      '#simulador .mz-side p:nth-child(1)': 'Sélectionnez l’acompte et l’échéancier. Le calcul applique la formule de Price sur le solde restant, en intégrant les taxes en vigueur.',
      '#simulador .mz-side p:nth-child(2)': 'Le plan en 6 mensualités s’ouvre pré-sélectionné comme formule recommandée. Les montants totaux sont clairement présentés.',

      // Desktop
      '#desktop .eyebrow': '<b>03</b> · Expérience Desktop',
      '#desktop h2': 'De la densité pour analyser posément, non pour décider dans l’urgence.',
      '#desktop .lede': 'Sur ordinateur, le relevé bancaire se transforme en véritable tour de contrôle : métriques passées, écritures détaillées et réglage du plafond dans une même interface.',
      '#desktop figcaption': '<b>Capture du prototype desktop.</b> 12 transactions avec des enseignes réelles pour éprouver la résistance du texte et l’alignement des montants.',
      '#desktop .mz-desk ul li:nth-child(1)': '<b>Six mois d’historique</b> sous forme d’histogramme avec moyenne de référence et cycle en cours mis en exergue.',
      '#desktop .mz-desk ul li:nth-child(2)': '<b>Tableau des opérations</b> avec recherche en direct, filtres multi-critères et cashback par achat.',
      '#desktop .mz-desk ul li:nth-child(3)': '<b>Plafond modulable</b> par curseur latéral, manipulable avec une grande précision à la souris.',
      '#desktop .mz-desk ul li:nth-child(4)': '<b>Statuts explicites de la facture :</b> En cours, Clôturée, Réglée, Échelonnée.',

      // AI
      '#ia .eyebrow': '<b>04</b> · Audit par IA',
      '#ia h2': 'Une relecture réglementaire automatisée par IA.',
      '#ia .lede': 'L’action « Auditer les termes réglementaires » soumet les données de simulation à un modèle de langage, qui vérifie la conformité avec les directives bancaires de protection du consommateur.',
      '#ia .mz-audit .pf-card .tag': 'Périmètre de Vérification',
      '#ia .mz-audit .pf-card h3': 'Quatre Critères Clés',
      '#ia .mz-audit .pf-card ul': '<li>Le TAEG mensuel et annuel apparaît-il avant la souscription ?</li><li>Les taxes (IOF) sont-elles isolées en devises réelles, en dehors du taux brut ?</li><li>Y a-t-il des cases pré-cochées ou des choix forcés ?</li><li>L’acompte réduit-il le principal avant le calcul des intérêts ?</li>',
      '#ia .mz-res .pill': 'Exemple d’Évaluation',
      '#ia .mz-res ol li:nth-child(1)': '<b>Transparence du TAEG et des coûts annuels</b>Les taux sont visibles avant tout engagement contractuel.',
      '#ia .mz-res ol li:nth-child(2)': '<b>Ségrégation des taxes</b>Les frais fiscaux sont calculés à part en toute clarté.',
      '#ia .mz-res ol li:nth-child(3)': '<b>Neutralité du choix consommateur</b>Absence de dark patterns ou de cases cochées par défaut. Recommandations motivées.',
      '#ia > .wrap > p.rv': 'Cette évaluation est présentée ici à titre indicatif. L’IA constitue un excellent garde-fou pour le design, sans jamais se substituer à la vigilance humaine.',

      // Prototype
      '#prototipo .eyebrow': 'Prototype Interactif',
      '#prototipo h2': 'Trois vues en synchronisation temps réel.',
      '#prototipo .lede': 'Ajuster un plafond, bloquer la carte ou échelonner un relevé sur un écran se propage instantanément sur les autres. Chargement à la demande.',
      '#prototipo .go span': '▶ Charger le prototype fonctionnel',
      '#prototipo .mz-hints div:nth-child(1)': '<b>Échelonner la facture</b>Ouvre le simulateur en volet inférieur.',
      '#prototipo .mz-hints div:nth-child(2)': '<b>Transparence</b>Détaille le TAEG, les taxes et les intérêts de chaque plan.',
      '#prototipo .mz-hints div:nth-child(3)': '<b>Cashback</b>Des pastilles vertes mettent en avant les gains par achat.',
      '#prototipo .mz-hints div:nth-child(4)': '<b>Vues</b>Le menu supérieur bascule entre la vue d’ensemble et chaque écran.',
      '#prototipo .mz-links a:nth-child(1)': 'Ouvrir le prototype en plein écran ↗',
      '#prototipo .mz-links a:nth-child(2)': 'Ouvrir en mode desktop ↗',
      '#prototipo figcaption': '<b>Prototype fonctionnel en React.</b> Moteur financier calculant la convergence du TAEG, synchronisation d’état omnicanale et respect des normes bancaires.',

      // Business Case
      '#medir .eyebrow': '<b>07</b> · Business Case & Prévention des Impayés',
      '#medir h2': 'Impact projeté sur le risque de défaut (PCLD), la rétention et le LTV.',
      '#medir .lede': 'Comment la transparence dans le simulateur réduit le basculement involontaire dans le crédit revolving de ~24 %, protège le profil financier de l’utilisateur et pérennise la valeur client.',
      '#medir .mz-kpi-card:nth-child(1) .mz-kpi-label': 'Risque d’Impayé & Crédit Revolving (PCLD)',
      '#medir .mz-kpi-card:nth-child(1) .mz-kpi-desc': 'Proposer des formules d’échelonnement lisibles avec calcul du TAEG avant la date d’exigibilité évite aux clients de basculer dans le crédit revolving toxique à 90 jours.',
      '#medir .mz-kpi-card:nth-child(2) .mz-kpi-label': 'Rétention des Clients (LTV)',
      '#medir .mz-kpi-card:nth-child(2) .mz-kpi-desc': 'Les clients piégés dans le crédit revolving ont 3,2× plus de risques de résilier leur carte. Faciliter des paiements étalés protège la solvabilité et maintient l’activité dans l’écosystème Méliuz.',
      '#medir .mz-kpi-card:nth-child(3) .mz-kpi-label': 'Adhésion aux Acomptes Modulables',
      '#medir .mz-kpi-card:nth-child(3) .mz-kpi-desc': 'Les boutons de paiement immédiat encouragent à solder une partie de la dette sans attendre, réduisant le capital financé et l’exposition au risque de la fintech.',
      '#medir .mz-kpi-card:nth-child(4) .mz-kpi-label': 'Contestations & Réclamations',
      '#medir .mz-kpi-card:nth-child(4) .mz-kpi-desc': 'L’audit visuel sur grand écran et la catégorisation fluide suppriment l’opacité des frais, allégeant la charge du support client et dynamisant le NPS.',

      // Handoff
      '#medir .mz-fe-head .eyebrow': '<b>Handoff</b> · Ingénierie Frontend',
      '#medir .mz-fe-head h2': 'Moteur financier client-side, état réactif et latence zéro.',
      '#medir .mz-fe-head .lede': 'Architecture conçue pour affranchir les calculs financiers de la dépendance au réseau, assurant une réponse en 0ms avec accessibilité WCAG AAA.',
      '#medir .mz-fe-card:nth-child(1) .tag': 'Moteur Client-Side',
      '#medir .mz-fe-card:nth-child(1) h3': 'Moteur Financier Découplé',
      '#medir .mz-fe-card:nth-child(1) p': 'Calculs financiers exécutés directement dans le navigateur, éliminant les requêtes réseau répétées à chaque ajustement d’acompte :',
      '#medir .mz-fe-card:nth-child(1) ul': '<li>Formule de Price (PMT) avec amortissement constant</li><li>Calcul précis des taxes au prorata temporis</li><li>Algorithmes de convergence du TAEG mensuel et annuel</li><li>Latence réseau nulle lors de la comparaison de scénarios financiers</li>',
      '#medir .mz-fe-card:nth-child(2) .tag': 'Store Omnicanal',
      '#medir .mz-fe-card:nth-child(2) h3': 'État Réactif Synchronisé',
      '#medir .mz-fe-card:nth-child(2) p': 'Gestionnaire d’état unifié reliant mobile et desktop sans duplication de logique métier :',
      '#medir .mz-fe-card:nth-child(2) ul': '<li>Source unique de vérité pour soldes, blocages et plafonds</li><li>Transition fluide entre volet mobile et affichage fractionné desktop</li><li>Mémorisation synchrone des choix tout au long du parcours</li><li>Encapsulation stricte des effets de bord sur les mutations financières</li>',
      '#medir .mz-fe-card:nth-child(3) .tag': 'Accessibilité Financière',
      '#medir .mz-fe-card:nth-child(3) h3': 'Accessibilité & Conformité Réglementaire',
      '#medir .mz-fe-card:nth-child(3) p': 'Interface respectant les normes bancaires et les critères WCAG AAA :',
      '#medir .mz-fe-card:nth-child(3) ul': '<li>Boutons radio avec <code>role="radio"</code> et <code>aria-checked</code> synchronisé</li><li>Navigation complète au clavier via les flèches haut/bas</li><li>Synthèse vocale détaillée des conditions financières pour lecteurs d’écran</li><li>Chiffres tabulaires garantissant l’alignement irréprochable des décimales</li>'
    }
  };

  if (window.PORTFOLIO_I18N && window.PORTFOLIO_I18N.registerCase) {
    window.PORTFOLIO_I18N.registerCase(CASE_SLUG, translations);
  } else {
    window.PORTFOLIO_CASES_I18N = window.PORTFOLIO_CASES_I18N || {};
    window.PORTFOLIO_CASES_I18N[CASE_SLUG] = translations;
  }
})();

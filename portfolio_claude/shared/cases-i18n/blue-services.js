/* ==========================================================================
   Translations for Case 01: Blue Services
   Supported: pt (Português), en (English), es (Español), fr (Français)
   ========================================================================== */
(function(){
  'use strict';

  var CASE_SLUG = 'blue-services';

  var translations = {
    pt: {
      '.pf-hero .eyebrow': '<b>Case 01</b> · Product Design · 0 → 1 · Marketplace de Limpeza',
      '.pf-hero h1': 'Reservar uma limpeza deve parecer <em>comprar uma passagem aérea,</em> não preencher um formulário.',
      '.pf-hero .lede': 'Blue Services é um marketplace australiano de serviços residenciais. Desenhei e programei o produto de ponta a ponta: o fluxo de reserva do cliente, o aplicativo de campo dos profissionais com GPS em tempo real e o console de operações.',
      '.pf-meta div:nth-child(1) dd': 'Product Designer & Engenheiro Frontend (end-to-end)',
      '.pf-meta div:nth-child(2) dd': 'Web responsiva, PWA e shells nativos para iOS e Android (Capacitor)',
      '.pf-meta div:nth-child(3) dd': 'Clientes residenciais, diaristas/profissionais, operadores da central',
      '.pf-meta div:nth-child(4) dd': 'Pesquisa → IA → UI → Design System → Código em produção',

      '#resumo .eyebrow': 'Resumo executivo',
      '#resumo h2': 'O case em três pontos.',
      '#resumo .lede': 'Principais pilares de produto, ergonomia e arquitetura visual do projeto:',

      '#context .eyebrow': 'O problema',
      '#context h2': 'Confiança bilateral, cobrada por hora e agendada ao minuto.',
      '#context .lede': 'Limpeza doméstica parece simples até você tentar desenhá-la. O preço depende do imóvel, extras e recorrência. A disponibilidade varia com cada profissional. E o cliente está abrindo a sua casa para um estranho.',
      '#context .callout': '<b>Brief de design:</b> mostrar o preço real e a disponibilidade exata a cada escolha, tornando auditável cada promessa do produto — incluindo a localização física do profissional no mapa.',

      '#ecosystem .eyebrow': 'Mapa do Ecossistema',
      '#ecosystem h2': 'Uma plataforma, três objetivos muito diferentes.',
      '#ecosystem .lede': 'O maior desafio de design não foi uma tela isolada, mas garantir que três públicos distintos, com dispositivos e níveis de ansiedade diferentes, enxergassem a mesma verdade em tempo real.',

      '#process .eyebrow': 'Processo de Engenharia',
      '#process h2': 'Publicar, observar, calibrar.',

      '#booking .eyebrow': 'Decisão 01 · Fluxo de Reserva',
      '#booking h2': 'Uma única superfície onde o preço é sempre transparente.',
      '#booking .lede': 'Desenhei o fluxo em página única em vez de um formulário com múltiplos passos: endereço, data, horário e extras atualizam o resumo na hora. Nenhuma etapa exige compromisso antes de precificar.',

      '#system .eyebrow': 'Decisão 02 · Design System',
      '#system h2': '"Liquid Glass": superfícies calmas para uma tarefa que gera ansiedade.',
      '#system .lede': 'Entregar as chaves de casa é um ato emocional. A linguagem visual precisava ser acolhedora e limpa, sem frieza: camadas translúcidas, base em azul-marinho profundo e um único destaque vibrante na ação primária.',

      '#lifecycle .eyebrow': 'Decisão 03 · Orquestração',
      '#lifecycle h2': 'Dezessete transições de estado, três pessoas, uma única reserva.',
      '#lifecycle .lede': 'Antes de desenhar telas, mapeei o ciclo de vida do serviço em diagramas swimlanes: cada estado da reserva, quem é o responsável e o que cada pessoa tem permissão de ver naquele instante.',

      '#field .eyebrow': 'Decisão 04 · App de Campo & Rastreamento',
      '#field h2': 'Projetado para alguém com as mãos molhadas e apenas um polegar.',
      '#field .lede': 'O app do profissional prioriza leitura instantânea em movimento: próximo serviço, rota no mapa e checklist de cômodos. A central e o cliente consomem o mesmo stream de localização.',

      '#honest .eyebrow': 'Decisões Técnicas e Trade-offs',
      '#honest h2': 'O que eu refaria e por que documentei tudo.',
      '#honest .lede': 'Um design system construído no ritmo do lançamento acumula débitos técnicos. Auditei e documentei cada ponto para o time de engenharia.'
    },

    en: {
      '.pf-hero .eyebrow': '<b>Case 01</b> · Product design · 0 → 1 · Home Services Marketplace',
      '.pf-hero h1': 'Booking a clean should feel like <em>booking a flight,</em> not filing a form.',
      '.pf-hero .lede': 'Blue Services is a home-services marketplace in Australia. I designed and built the whole product: the customer booking flow, the professional’s field app with live GPS tracking, and the admin operations console.',
      '.pf-meta div:nth-child(1) dd': 'Product designer & front-end engineer (end to end)',
      '.pf-meta div:nth-child(2) dd': 'Responsive web, PWA, native shells for iOS & Android (Capacitor)',
      '.pf-meta div:nth-child(3) dd': 'Customers, cleaning professionals, operations admins',
      '.pf-meta div:nth-child(4) dd': 'Research → IA → UI → design system → production code',

      '#resumo .eyebrow': 'Executive Summary',
      '#resumo h2': 'The case in three key points.',
      '#resumo .lede': 'Core product pillars, ergonomics, and visual architecture:',

      '#context .eyebrow': 'The problem',
      '#context h2': 'Two-sided trust, priced by the hour, scheduled by the minute.',
      '#context .lede': 'Home cleaning looks simple until you design it. Price depends on property, extras and recurrence. Availability depends on the individual professional. And the customer is handing over their home.',
      '#context .callout': '<b>Design brief I set myself:</b> show the real price and the real availability at every step, and make every promise the product makes verifiable, including where the professional is right now.',

      '#ecosystem .eyebrow': 'System map',
      '#ecosystem h2': 'One platform, three very different jobs-to-be-done.',
      '#ecosystem .lede': 'The hardest design problem was not any single screen. It was keeping three audiences, with different devices and different anxieties, looking at the same truth.',

      '#process .eyebrow': 'Process',
      '#process h2': 'Ship, observe, tighten.',

      '#booking .eyebrow': 'Decision 01 · Booking flow',
      '#booking h2': 'A single surface where price is always honest.',
      '#booking .lede': 'I designed the flow as one live page rather than a multi-page form: address, date, time and extras update the summary as you go. No step ever asks for a commitment the previous one hasn’t priced.',

      '#system .eyebrow': 'Decision 02 · Design system',
      '#system h2': '"Liquid Glass": calm surfaces for a task that’s anxious by nature.',
      '#system .lede': 'Handing over your keys is emotional. The visual language had to be reassuring and clean, without becoming sterile. Translucent layers, a deep navy anchor and a single warm accent for the one action that matters.',

      '#lifecycle .eyebrow': 'Decision 03 · Orchestration',
      '#lifecycle h2': 'Seventeen handoffs, three people, one booking.',
      '#lifecycle .lede': 'Before drawing screens I mapped the full service lifecycle as swimlanes. Every state a booking can enter, who owns it, and what each person is allowed to see at that moment.',

      '#field .eyebrow': 'Decision 04 · Field app & tracking',
      '#field h2': 'Designing for a person with wet hands and one thumb.',
      '#field .lede': 'The professional’s app optimises for glanceability: next job, route, checklist. The customer’s tracking view and the admin map reuse the same location stream, so all three see one truth.',

      '#honest .eyebrow': 'Trade-offs & honesty',
      '#honest h2': 'What I’d fix next, and why I wrote it down.',
      '#honest .lede': 'A design system that grew inside a shipping product accumulates debt. I audited mine and documented it for the team. Naming it is part of the job.'
    },

    es: {
      '.pf-hero .eyebrow': '<b>Caso 01</b> · Product Design · 0 → 1 · Marketplace de Limpieza',
      '.pf-hero h1': 'Reservar una limpieza debería sentirse como <em>comprar un vuelo,</em> no rellenar un formulario.',
      '.pf-hero .lede': 'Blue Services es un marketplace de servicios para el hogar en Australia. Diseñé y programé el producto de principio a fin: el flujo de reservas para clientes, la app de campo para profesionales con GPS en vivo y el panel de operaciones.',
      '.pf-meta div:nth-child(1) dd': 'Product Designer & Ingeniero Frontend (end-to-end)',
      '.pf-meta div:nth-child(2) dd': 'Web adaptable, PWA y contenedores nativos para iOS y Android (Capacitor)',
      '.pf-meta div:nth-child(3) dd': 'Clientes particulares, profesionales de limpieza, operadores centrales',
      '.pf-meta div:nth-child(4) dd': 'Investigación → IA → UI → Design System → Código en producción',

      '#resumo .eyebrow': 'Resumen ejecutivo',
      '#resumo h2': 'El proyecto en tres puntos clave.',
      '#resumo .lede': 'Pilares de producto, ergonomía y arquitectura visual del sistema:',

      '#context .eyebrow': 'El problema',
      '#context h2': 'Confianza mutua, presupuestada por hora y programada al minuto.',
      '#context .lede': 'La limpieza del hogar parece sencilla hasta que te sientas a diseñarla. El precio varía según la vivienda, los extras y la frecuencia. La disponibilidad depende de cada profesional. Y el cliente está abriendo las puertas de su casa.',
      '#context .callout': '<b>Objetivo de diseño:</b> transparentar el precio real y la disponibilidad exacta en cada elección, haciendo verificable cada promesa del servicio, incluida la posición GPS del profesional en el mapa.',

      '#ecosystem .eyebrow': 'Mapa del Sistema',
      '#ecosystem h2': 'Una plataforma, tres necesidades completamente distintas.',
      '#ecosystem .lede': 'El mayor reto no radicaba en una pantalla concreta, sino en conseguir que tres colectivos con dispositivos e inquietudes dispares compartieran la misma realidad en tiempo real.',

      '#process .eyebrow': 'Metodología',
      '#process h2': 'Lanzar, observar y calibrar.',

      '#booking .eyebrow': 'Decisión 01 · Flujo de Reserva',
      '#booking h2': 'Una sola vista donde el importe siempre es transparente.',
      '#booking .lede': 'Diseñé el flujo en una única pantalla viva en lugar de un formulario por pasos: dirección, fecha, turno y extras recalculan el total al instante. Ninguna etapa exige compromiso sin haber fijado el coste.',

      '#system .eyebrow': 'Decisión 02 · Design System',
      '#system h2': '"Liquid Glass": superficies serenas para una gestión que genera incertidumbre.',
      '#system .lede': 'Entregar las llaves del hogar es un acto sensible. El lenguaje visual debía transmitir seguridad y limpieza: planos translúcidos, fondo azul marino profundo y un único resalte cálido para la acción principal.',

      '#lifecycle .eyebrow': 'Decisión 03 · Orquestación',
      '#lifecycle h2': 'Diecisiete cambios de estado, tres roles, un único servicio.',
      '#lifecycle .lede': 'Antes de trazar pantallas definí el ciclo de vida en carriles (swimlanes): cada estado por el que transita una reserva, quién lo gestiona y qué información puede consultar cada parte.',

      '#field .eyebrow': 'Decisión 04 · App de Campo y Geolocalización',
      '#field h2': 'Diseñado para usarse con manos húmedas y un solo pulgar.',
      '#field .lede': 'La app del profesional prima la lectura inmediata en ruta: próximo servicio, navegación y lista de tareas. Tanto el cliente como la central comparten la misma señal de geolocalización.',

      '#honest .eyebrow': 'Compromisos y Deuda Técnica',
      '#honest h2': 'Qué aspectos mejoraría ahora y por qué decidí documentarlos.',
      '#honest .lede': 'Un sistema de diseño que madura dentro de un producto en explotación acumula deuda técnica. La identifiqué y documenté con total honestidad para el equipo de desarrollo.'
    },

    fr: {
      '.pf-hero .eyebrow': '<b>Projet 01</b> · Product Design · 0 → 1 · Marketplace de Services à Domicile',
      '.pf-hero h1': 'Réserver une prestation de ménage doit être aussi fluide que <em>réserver un vol,</em> pas remplir un formulaire.',
      '.pf-hero .lede': 'Blue Services est une marketplace australienne de services pour la maison. J’ai conçu et développé l’intégralité du produit : le parcours de réservation client, l’application mobile des intervenants avec suivi GPS en direct et la console d’administration.',
      '.pf-meta div:nth-child(1) dd': 'Product Designer & Ingénieur Frontend (de bout en bout)',
      '.pf-meta div:nth-child(2) dd': 'Web responsive, PWA et conteneurs natifs iOS & Android (Capacitor)',
      '.pf-meta div:nth-child(3) dd': 'Clients particuliers, professionnels du nettoyage, régulateurs d’opérations',
      '.pf-meta div:nth-child(4) dd': 'Recherche → IA → UI → Design System → Code en production',

      '#resumo .eyebrow': 'Synthèse Exécutive',
      '#resumo h2': 'Le projet résumé en trois points.',
      '#resumo .lede': 'Principes directeurs de produit, ergonomie et architecture visuelle :',

      '#context .eyebrow': 'Le problème',
      '#context h2': 'Une confiance mutuelle, tarifée à l’heure et programmée à la minute.',
      '#context .lede': 'Le nettoyage à domicile semble simple jusqu’à ce qu’on le conçoive. Le tarif dépend du logement, des options et de la récurrence. La disponibilité dépend de chaque intervenant. Et le client confie les clés de son foyer.',
      '#context .callout': '<b>Cahier des charges :</b> afficher le tarif exact et la disponibilité réelle à chaque action, et rendre vérifiable chaque engagement du service, y compris la position GPS en temps réel de l’intervenant.',

      '#ecosystem .eyebrow': 'Cartographie du Système',
      '#ecosystem h2': 'Une même plateforme, trois usages profondément distincts.',
      '#ecosystem .lede': 'Le défi majeur ne résidait pas dans un écran isolé, mais dans la synchronisation de trois profils aux appareils et aux attentes différentes autour d’une seule et même vérité opérationnelle.',

      '#process .eyebrow': 'Méthodologie',
      '#process h2': 'Déployer, observer, ajuster.',

      '#booking .eyebrow': 'Décision 01 · Parcours de Réservation',
      '#booking h2': 'Une vue unique où le prix est systématiquement transparent.',
      '#booking .lede': 'J’ai conçu le parcours sur une seule page réactive plutôt que sous forme d’étapes successives : adresse, date, créneau et options mettent à jour le récapitulatif en continu, sans engagement préalable imposé.',

      '#system .eyebrow': 'Décision 02 · Design System',
      '#system h2': '« Liquid Glass » : des surfaces apaisantes pour une démarche anxiogène.',
      '#system .lede': 'Confier ses clés est un acte intime. L’univers visuel se devait d’être rassurant et soigné sans paraître froid : strates translucides, bleu marine profond et une touche chaleureuse unique pour l’action clé.',

      '#lifecycle .eyebrow': 'Décision 03 · Orchestration des Flux',
      '#lifecycle h2': 'Dix-sept changements d’état, trois profils, une seule réservation.',
      '#lifecycle .lede': 'Avant d’esquisser les maquettes, j’ai formalisé le cycle de vie complet du service en diagrammes swimlanes : chaque statut de réservation, son responsable et les droits d’accès correspondants.',

      '#field .eyebrow': 'Décision 04 · App de Terrain & Géolocalisation',
      '#field h2': 'Conçue pour un usage à une seule main, parfois mouillée.',
      '#field .lede': 'L’application terrain privilégie la lisibilité immédiate : mission suivante, itinéraire et grille d’intervention. Le client et le back-office exploitent le même flux de géolocalisation.',

      '#honest .eyebrow': 'Compromis & Dette Technique',
      '#honest h2': 'Les axes d’amélioration identifiés et pourquoi je les ai consignés.',
      '#honest .lede': 'Un design system développé au fil d’un produit en production accumule inévitablement de la dette technique. Je l’ai auditée et documentée en toute clarté pour l’équipe d’ingénierie.'
    }
  };

  if (window.PORTFOLIO_I18N && window.PORTFOLIO_I18N.registerCase) {
    window.PORTFOLIO_I18N.registerCase(CASE_SLUG, translations);
  } else {
    window.PORTFOLIO_CASES_I18N = window.PORTFOLIO_CASES_I18N || {};
    window.PORTFOLIO_CASES_I18N[CASE_SLUG] = translations;
  }
})();

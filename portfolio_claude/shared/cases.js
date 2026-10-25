/* ==========================================================================
   Registro de cases — a ÚNICA lista de trabalhos do portfólio.
   Adicionar um objeto aqui atualiza automaticamente:
     - o seletor de cases na navegação de todas as páginas
     - o card "Próximo case" no rodapé (ordem desta lista, em ciclo)
     - os grupos por assunto da página inicial (index.html), pelo campo "group"
   Caminhos são relativos à raiz da pasta portfolio/.

   Esconder um case ou pôr o site em manutenção, sem editar código:
   use o admin (/admin/). O que ele marca vale mais que o draft daqui.

   Publicar um case ainda em produção, sem mostrá-lo:
   Acrescente  draft: true  no objeto do case (qualquer linha, junto dos
   outros campos). Com isso, o case:
     - some do seletor de navegação, do "Próximo case" e da home (grid e
       grupos por assunto) em TODAS as páginas — sem editar mais nada;
     - continua acessível pela URL direta enquanto você trabalha nele
       (em localhost/127.0.0.1, ou abrindo o arquivo direto, ou com
       ?preview=1 na URL em qualquer lugar);
     - se alguém abrir a URL direta no site publicado (sem ?preview=1),
       é redirecionado para a home antes da página desenhar.
   Tire o  draft: true  (ou apague a linha) quando o case estiver pronto.
   ========================================================================== */

/* Segmentos da página inicial (landing em tela cheia) e das páginas de
   segmento (segmentos/*.html). "icon" é uma classe do Font Awesome 6
   (fa-solid). Todo case precisa de um "group" com um destes ids.
     - resume: currículo especializado que a página do segmento destaca.
     - desc / kpi: copy curta usada no topo da página do segmento. */
window.PORTFOLIO_GROUPS = [
  { id: 'uxui',           label: 'UX/UI',            icon: 'fa-mobile-screen-button',
    color: '#0F766E', resume: '../curriculo_product_design.html',
    desc: 'Arquitetura de informação, fluxos de onboarding, Design Systems e redução de atrito transacional em fintechs.',
    kpi: 'Design Tokens em código · Acessibilidade WCAG · Protótipos funcionais em React' },
  { id: 'tabletop',       label: 'Tabletop',         icon: 'fa-dice-d20',
    color: '#D97706', resume: '../tabletop.html',
    desc: 'Ergonomia física de mesa, consoles dual-layer cortados a laser, card games e iconografia para leitura rápida.',
    kpi: 'Dual-Layer rígido 3mm · Splay de 18mm · Regras visuais sem texto' },
  { id: 'games',          label: 'Games Digitais',   icon: 'fa-gamepad',
    color: '#E3120B', resume: '../curriculo_games.html',
    desc: 'HUDs contextuais, interfaces diegéticas, renderização 3D WebGL em tempo real e conformidade TRC/TCR de console.',
    kpi: '60 FPS estáveis · Web Audio API · Adaptação para L10n +35%' },
  { id: 'design-grafico', label: 'Design Gráfico',   icon: 'fa-compass-drafting',
    color: '#B44A17', resume: '../curriculo_editorial_embalagens.html',
    desc: 'Design editorial, grid suíço, restauração histórica no traço digital e embalagens calibradas para impressão industrial.',
    kpi: 'Grid suíço de 6 colunas · Restauração Wacom · Calibração industrial' },
  { id: 'audiovisual',    label: 'Áudio Visual',     icon: 'fa-clapperboard',
    color: '#1E2A7A', resume: '../curriculo_direcao_de_arte.html',
    desc: 'Direção de arte para cinema e TV: cenografia, rótulos de época e peças gráficas de cena que aguentam o close em 4K.',
    kpi: 'Rótulos e paredes em 4K pro close · Épocas de 1950 e 1980 · Peças que resistem à câmera' }
];

window.PORTFOLIO_CASES_ALL = [
  {
    slug: 'blue-services',                 // nome da pasta do case
    group: 'uxui',
    title: 'Blue Services',
    color: '#11284B',                      // mesma cor do --accent da página
    cover: 'blue-services/assets/home_cleaning_banner-1024x683.webp',
    tags: ['Product design', 'Web e mobile', 'Design system'],
    blurb: 'Reserva com cálculo de diária ao vivo, rastreio de prestadores por GPS e console operacional para marketplace.'
  },
  {
    slug: 'cobra-kai',
    group: 'games',
    title: 'Cobra Kai · Estreia da Temporada',
    short: 'Cobra Kai',                    // opcional: nome curto para o seletor
    color: '#E3120B',
    cover: 'cobra-kai/assets/keyart.jpg',
    tags: ['Conceito', 'Game UI', 'Pixel art'],
    blurb: 'Advergame de luta em pixel art para ativação de estreia: pontuação arcade que desbloqueia brindes por faixas de score.'
  },
  {
    slug: 'loony-races',
    group: 'tabletop',
    title: 'Loony Races',
    color: '#17803A',                      // mesma cor do --accent da página
    cover: 'loony-races/assets/card.jpg',
    tags: ['Board game', 'Identidade visual', 'Ilustração'],
    blurb: 'Marca, 10 pilotos de países distintos, cartas com linguagem 100% visual e pista modular montada durante a corrida.'
  },
  {
    slug: 'saudosa-maloca',
    draft: true,
    group: 'audiovisual',
    title: 'Saudosa Maloca',
    color: '#1E2A7A',                      // mesma cor do --accent da página
    cover: 'saudosa-maloca/assets/card.jpg',
    tags: ['Cinema', 'Design gráfico', 'Peças de época'],
    blurb: 'Placa-título, marcas fictícias, rótulos e cartazes das décadas de 1950 e 1980 para longa-metragem sobre Adoniran Barbosa.'
  },
  {
    slug: 'forca-br',
    group: 'tabletop',
    title: 'Projeto Força BR',
    short: 'Força BR',
    color: '#2453B3',                      // mesma cor do --accent da página
    cover: 'forca-br/assets/card.jpg',
    tags: ['Board game', 'Design gráfico'],
    blurb: 'Cartas, tabuleiro regional, fichas de ameaça e identidade de um board game cooperativo com heróis do folclore e da história do Brasil.'
  },
  {
    slug: 'terraforming-mars',
    group: 'tabletop',
    title: 'Terraforming Mars · Re-Engineered',
    short: 'Terraforming Mars',
    color: '#C84B31',
    cover: 'terraforming-mars/assets/cover.jpg',
    tags: ['Tabletop UX', 'Redesign', 'Dual-Layer Mat'],
    blurb: 'Ergonomia de mesa para o clássico: console dual-layer com travas anti-esbarrão, splay de cartas de 18mm e iconografia de alto contraste.'
  },
  {
    slug: 'editorial',
    group: 'design-grafico',
    title: 'Editorial · Capas e livros',
    short: 'Editorial',
    color: '#B44A17',                      // mesma cor do --accent da página
    cover: 'editorial/assets/card.jpg',
    tags: ['Design editorial', 'Capas', 'Restauração'],
    blurb: 'Projetos de capa para a WMF Martins Fontes e restauração minuciosa dos 3 primeiros livros históricos de Mauricio de Sousa.'
  },
  {
    slug: 'publicidade',
    draft: true,
    group: 'audiovisual',
    title: 'Publicidade e TV',
    short: 'Publicidade',
    color: '#C01A6E',                      // mesma cor do --accent da página
    cover: 'publicidade/assets/card.jpg',
    tags: ['Design gráfico de cena', 'Publicidade', 'Séries e TV'],
    blurb: 'Rótulos, embalagens cenográficas, documentos fictícios e cartazes de época projetados para sustentar closes em alta resolução.'
  },
  {
    slug: 'vistorias-risco',
    group: 'uxui',
    title: 'Vistorias de Risco',
    short: 'Vistorias',
    color: '#0369A1',                      // mesma cor do --accent da página
    cover: 'vistorias-risco/assets/card.jpg',
    tags: ['Product design', 'UI', 'Desenvolvimento'],
    blurb: 'Sistema de vistoria securitária: coleta fotográfica geolocalizada, laudo técnico estruturado e fluxo web sem fricção para o cliente remoto.'
  },
  {
    slug: 'caju-cartao',
    group: 'uxui',
    title: 'Caju · Ativação do cartão',
    short: 'Caju',
    color: '#D42D28',                      // mesma cor do --accent da página
    cover: 'caju-cartao/assets/card.jpg',
    tags: ['Conceito', 'UI mobile', 'Motion'],
    blurb: 'Do envelope à carteira digital: ativação por NFC, QR ou código manual, validação de regras de senha em tempo real e 5 edge cases.'
  },
  {
    slug: 'meliuz-fatura',
    group: 'uxui',
    title: 'Méliuz · Fatura e parcelamento',
    short: 'Méliuz',
    color: '#D10043',                      // mesma cor do --accent da página
    cover: 'meliuz-fatura/assets/card.jpg',
    tags: ['Conceito', 'UI', 'Mobile e desktop'],
    blurb: 'Simulador de parcelamento de fatura: cálculo instantâneo de juros, IOF e CET sem surpresas, reduzindo a armadilha do crédito rotativo.'
  },
  {
    slug: 'conta-simples-ledger',
    group: 'uxui',
    title: 'Conta Simples · TransactionLedger',
    short: 'Conta Simples',
    color: '#0F766E',                      // mesma cor do --accent da página
    cover: 'conta-simples-ledger/assets/card.jpg',
    tags: ['Conceito', 'Design system', 'Documentação'],
    blurb: 'Componente de extrato financeiro documentado do token ao código: hierarquia W3C, estados de conciliação e contraste WCAG APCA.'
  },
  {
    slug: 'itaiquara-untaforma',
    group: 'design-grafico',
    title: 'Itaiquara · Untaforma',
    short: 'Untaforma',
    color: '#012169',                      // mesma cor do --accent da página
    cover: 'itaiquara-untaforma/assets/card.jpg',
    tags: ['Embalagem', 'Direção de arte', 'Arte-final'],
    blurb: 'Lata aerossol para desmoldante culinário: hierarquia visual no terço frontal e calibração milimétrica da sangria na curvatura do tubo.'
  },
  {
    slug: 'hellfire-overdrive',
    group: 'games',
    title: 'Hellfire Overdrive',
    short: 'Hellfire',
    color: '#8C1D40',                      // mesma cor do --accent da página
    cover: 'hellfire-overdrive/assets/card.jpg',
    tags: ['Game design', 'Web Audio', 'Advergame'],
    blurb: 'Advergame de ritmo musical em pixel art para ativações de evento: compensação de latência na Web Audio API e liberação de brindes no estande.'
  },
  {
    slug: 'aether-protocol',
    group: 'games',
    title: 'Star Marshal — A Lei não termina na última estrela',
    short: 'Star Marshal',
    color: '#E63926',
    cover: 'aether-protocol/assets/card.jpg',
    tags: ['Game UI/UX', 'HUD contextual', 'UI diegética', 'Protótipo 3D jogável'],
    blurb: 'HUD contextual para combate espacial: alternância instantânea de glifos de controle (PlayStation/Xbox/PC) e protótipo 3D jogável.'
  },
  {
    slug: 'sanctum-armory',
    group: 'games',
    title: 'Musanga · Inventário & Loot',
    short: 'Musanga · Inventário',
    color: '#905D31',                      // mesma cor do --accent da página
    cover: 'sanctum-armory/assets/card.jpg',
    tags: ['Game UI/UX', 'Inventário', 'Tooltip comparativo', 'Acessibilidade'],
    blurb: 'Inventário para RPG de ação: comparação direta de atributos no tooltip, grade com drag-and-drop e codificação de raridade acessível para daltônicos.'
  },
  {
    slug: 'chronos-weave',
    group: 'games',
    title: 'Chronos Weave · Skill Tree & Engine Suite',
    short: 'Chronos Weave',
    color: '#D4AF37',
    cover: 'chronos-weave/assets/card.jpg',
    tags: ['Game UI/UX', 'Skill Tree', 'Unreal Engine UMG', 'Sony TRC / L10n'],
    blurb: 'Árvore de habilidades em astrolábio celestial: arquitetura em Unreal UMG, docking responsivo e conformidade estrita com Sony TRC e expansão de texto.'
  }
];

/* Ajustes do admin (/admin/). A página carrega api/site/config antes
   deste arquivo, e ele define window.PORTFOLIO_SITE:
     { maintenance: true|false, hidden: { <slug>: true|false } }
   - hidden[slug] vale mais que o draft deste arquivo (true esconde, false mostra);
   - maintenance esconde todos os cases e desativa os botões de segmento.
   Sem o config (arquivo aberto direto, API fora), vale só o que está aqui.

   Quem edita vê tudo pela URL direta, como antes, e não pega a manutenção:
   localhost/127.0.0.1, arquivo aberto direto, ?preview=1 na URL, ou o
   navegador marcado no admin ("ver o site como admin"). ?simulate-live=1
   desliga o localhost e a marca do admin, pra testar como um visitante. */
(function(){
  var ALL = window.PORTFOLIO_CASES_ALL;
  var site = window.PORTFOLIO_SITE || {};
  var hidden = site.hidden || {};
  ALL.forEach(function(c){
    if (typeof hidden[c.slug] === 'boolean') c.draft = hidden[c.slug];
  });

  var q = location.search;
  var forceLive = /(^|[?&])simulate-live=1(&|$)/.test(q);
  var local = /^(localhost|127\.0\.0\.1|\[::1\])$/.test(location.hostname) || location.protocol === 'file:';
  var marked = false;
  try { marked = localStorage.getItem('pf_preview') === '1' } catch (e) {}
  var preview = /(^|[?&])preview=1(&|$)/.test(q) || (!forceLive && (local || marked));
  var maintenance = !!site.maintenance && !preview;

  window.PORTFOLIO_PREVIEW = preview;
  window.PORTFOLIO_MAINTENANCE = maintenance;

  /* Lista pública: tudo que não está marcado draft (e nada em manutenção).
     Todas as páginas (nav, "Próximo case", home, segmentos) leem
     PORTFOLIO_CASES, então um case escondido some delas sem editar mais nada. */
  window.PORTFOLIO_CASES = maintenance ? [] : ALL.filter(function(c){ return !c.draft });

  // Case escondido, ou site em manutenção: o visitante vai pra home antes da página desenhar.
  if (preview) return;
  var p = location.pathname;
  var c = ALL.filter(function(x){ return p.indexOf('/' + x.slug + '/') > -1 })[0];
  if (c && (c.draft || maintenance)) {
    location.replace(p.slice(0, p.indexOf('/' + c.slug + '/') + 1) + 'index.html?' + (maintenance ? 'manutencao=1' : 'em-breve=' + c.slug));
  } else if (maintenance && p.indexOf('/segmentos/') > -1) {
    location.replace(p.slice(0, p.indexOf('/segmentos/') + 1) + 'index.html?manutencao=1');
  }
})();

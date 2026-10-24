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
    desc: 'Sistemas escaláveis, onboarding, design systems, handoff e impacto direto em CAC/LTV.',
    kpi: 'Redução de churn em ~18% · Design Tokens · Hand-off de código' },
  { id: 'tabletop',       label: 'Tabletop',         icon: 'fa-dice-d20',
    color: '#D97706', resume: '../tabletop.html',
    desc: 'Ergonomia física de mesa, consoles dual-layer cortados a laser, card games e iconografia.',
    kpi: 'Dual-Layer rígido 3mm · Splay de 18mm · Regras universais' },
  { id: 'games',          label: 'Games Digitais',   icon: 'fa-gamepad',
    color: '#E3120B', resume: '../curriculo_games.html',
    desc: 'HUDs contextuais, interfaces diegéticas, 3D WebGL em tempo real, Godot 4 e árvores de talentos.',
    kpi: '60 FPS estáveis · Web Audio API · Compensação de latência' },
  { id: 'design-grafico', label: 'Design Gráfico',   icon: 'fa-compass-drafting',
    color: '#B44A17', resume: '../curriculo_editorial_embalagens.html',
    desc: 'Design editorial, grid suíço, restauração histórica com Wacom e embalagens calibradas para impressão industrial.',
    kpi: 'Grid suíço de 6 colunas · Restauração Wacom · Calibração industrial' },
  { id: 'audiovisual',    label: 'Áudio Visual',     icon: 'fa-clapperboard',
    color: '#1E2A7A', resume: '../curriculo_direcao_de_arte.html',
    desc: 'Direção de arte para cinema e TV: cenografia, rótulos de época e peças gráficas de cena que aguentam o close.',
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
    blurb: 'Reserva com preço ao vivo, rastreio em tempo real e operações para um marketplace de limpeza.'
  },
  {
    slug: 'cobra-kai',
    group: 'games',
    title: 'Cobra Kai · Estreia da Temporada',
    short: 'Cobra Kai',                    // opcional: nome curto para o seletor
    color: '#E3120B',
    cover: 'cobra-kai/assets/keyart.jpg',
    tags: ['Conceito', 'Game UI', 'Pixel art'],
    blurb: 'Advergame mobile para ativação de estreia: o jogador ganha brindes exclusivos conforme sua pontuação.'
  },
  {
    slug: 'loony-races',
    group: 'tabletop',
    title: 'Loony Races',
    color: '#17803A',                      // mesma cor do --accent da página
    cover: 'loony-races/assets/card.jpg',
    tags: ['Board game', 'Identidade visual', 'Ilustração'],
    blurb: 'Marca, dez pilotos de dez países, cartas sem texto e uma pista montada durante a corrida.'
  },
  {
    slug: 'saudosa-maloca',
    group: 'audiovisual',
    title: 'Saudosa Maloca',
    color: '#1E2A7A',                      // mesma cor do --accent da página
    cover: 'saudosa-maloca/assets/card.jpg',
    tags: ['Cinema', 'Design gráfico', 'Peças de época'],
    blurb: 'Placa-título, marcas, rótulos e cartazes dos anos 50 e 80 para um longa sobre os sambas de Adoniran.'
  },
  {
    slug: 'forca-br',
    group: 'tabletop',
    title: 'Projeto Força BR',
    short: 'Força BR',
    color: '#2453B3',                      // mesma cor do --accent da página
    cover: 'forca-br/assets/card.jpg',
    tags: ['Board game', 'Design gráfico'],
    blurb: 'Cartas, tabuleiro, fichas e logos de um jogo cooperativo de heróis que defendem as regiões do Brasil.'
  },
  {
    slug: 'terraforming-mars',
    group: 'tabletop',
    title: 'Terraforming Mars · Re-Engineered',
    short: 'Terraforming Mars',
    color: '#C84B31',
    cover: 'terraforming-mars/assets/cover.jpg',
    tags: ['Tabletop UX', 'Redesign', 'Dual-Layer Mat'],
    blurb: 'Arquitetura de informação e ergonomia para o clássico: dashboard dual-layer, card splaying e iconografia.'
  },
  {
    slug: 'editorial',
    group: 'design-grafico',
    title: 'Editorial · Capas e livros',
    short: 'Editorial',
    color: '#B44A17',                      // mesma cor do --accent da página
    cover: 'editorial/assets/card.jpg',
    tags: ['Design editorial', 'Capas', 'Restauração'],
    blurb: 'Capas para a WMF Martins Fontes e os três primeiros livros de Mauricio de Sousa, restaurados num só volume.'
  },
  {
    slug: 'publicidade',
    group: 'audiovisual',
    title: 'Publicidade e TV',
    short: 'Publicidade',
    color: '#C01A6E',                      // mesma cor do --accent da página
    cover: 'publicidade/assets/card.jpg',
    tags: ['Design gráfico de cena', 'Publicidade', 'Séries e TV'],
    blurb: 'Rótulos, cartazes, paredes, viaturas e mapas que não existem, feitos para aguentar o close.'
  },
  {
    slug: 'vistorias-risco',
    group: 'uxui',
    title: 'Vistorias de Risco',
    short: 'Vistorias',
    color: '#0369A1',                      // mesma cor do --accent da página
    cover: 'vistorias-risco/assets/card.jpg',
    tags: ['Product design', 'UI', 'Desenvolvimento'],
    blurb: 'Vistoria de seguros do questionário ao laudo: fotos geolocalizadas, três fases por item e cliente remoto sem conta.'
  },
  {
    slug: 'caju-cartao',
    group: 'uxui',
    title: 'Caju · Ativação do cartão',
    short: 'Caju',
    color: '#D42D28',                      // mesma cor do --accent da página
    cover: 'caju-cartao/assets/card.jpg',
    tags: ['Conceito', 'UI mobile', 'Motion'],
    blurb: 'Do envelope à carteira digital: código, NFC ou QR, senha validada em tempo real e cinco edge cases.'
  },
  {
    slug: 'meliuz-fatura',
    group: 'uxui',
    title: 'Méliuz · Fatura e parcelamento',
    short: 'Méliuz',
    color: '#D10043',                      // mesma cor do --accent da página
    cover: 'meliuz-fatura/assets/card.jpg',
    tags: ['Conceito', 'UI', 'Mobile e desktop'],
    blurb: 'Simulador de parcelamento com juros, IOF e CET à vista, no celular e no desktop.'
  },
  {
    slug: 'conta-simples-ledger',
    group: 'uxui',
    title: 'Conta Simples · TransactionLedger',
    short: 'Conta Simples',
    color: '#0F766E',                      // mesma cor do --accent da página
    cover: 'conta-simples-ledger/assets/card.jpg',
    tags: ['Conceito', 'Design system', 'Documentação'],
    blurb: 'Uma linha de extrato documentada até o código: anatomia, estados, tokens e handoff com IA.'
  },
  {
    slug: 'itaiquara-untaforma',
    group: 'design-grafico',
    title: 'Itaiquara · Untaforma',
    short: 'Untaforma',
    color: '#012169',                      // mesma cor do --accent da página
    cover: 'itaiquara-untaforma/assets/card.jpg',
    tags: ['Embalagem', 'Direção de arte', 'Arte-final'],
    blurb: 'Rótulo de lata aerossol para um desmoldante novo: a frente num terço da lata, o resto na volta.'
  },
  {
    slug: 'hellfire-overdrive',
    group: 'games',
    title: 'Hellfire Overdrive',
    short: 'Hellfire',
    color: '#8C1D40',                      // mesma cor do --accent da página
    cover: 'hellfire-overdrive/assets/card.jpg',
    tags: ['Game design', 'Web Audio', 'Advergame'],
    blurb: 'Advergame de ritmo de guitarra em pixel art para ativação na CCXP: rank A ou S libera brinde no estande.'
  },
  {
    slug: 'aether-protocol',
    group: 'games',
    title: 'Star Marshal — A Lei não termina na última estrela',
    short: 'Star Marshal',
    color: '#E63926',
    cover: 'aether-protocol/assets/card.jpg',
    tags: ['Game UI/UX', 'HUD contextual', 'UI diegética', 'Protótipo 3D jogável'],
    blurb: 'HUD que muda com o contexto, glyphs automáticos PS/Xbox/teclado e roda com bullet time num protótipo 3D jogável.'
  },
  {
    slug: 'sanctum-armory',
    group: 'games',
    title: 'Musanga · Inventário & Loot',
    short: 'Musanga · Inventário',
    color: '#905D31',                      // mesma cor do --accent da página
    cover: 'sanctum-armory/assets/card.jpg',
    tags: ['Game UI/UX', 'Inventário', 'Tooltip comparativo', 'Acessibilidade'],
    blurb: 'Tela de inventário de um RPG autoral: tooltip comparativo, grade com arrastar e soltar e raridade legível sem cor.'
  },
  {
    slug: 'chronos-weave',
    group: 'games',
    title: 'Chronos Weave · Skill Tree & Engine Suite',
    short: 'Chronos Weave',
    color: '#D4AF37',
    cover: 'chronos-weave/assets/card.jpg',
    tags: ['Game UI/UX', 'Skill Tree', 'Unreal Engine UMG', 'Sony TRC / L10n'],
    blurb: 'Árvore de talentos em astrolábio celestial, design system com 9-slice e homologação Sony TRC/TCR com L10n +35%.'
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

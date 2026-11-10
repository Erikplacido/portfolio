'use strict';
/* XETMON — São Paulo. Jogo de fã, sem dependências. */
const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const norm = s => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');

// ---------------------------------------------------------------- dados do XET
const CATS = {
  lore:    { label: 'LORE DO CID',    color: '#bf94ff' },
  calvo:   { label: 'CALVÍCIE',       color: '#ffd84d' },
  absurdo: { label: 'ABSURDO',        color: '#ff6fa8' },
  rango:   { label: 'RANGO DUVIDOSO', color: '#ff9f43' },
  bicho:   { label: 'BICHO',          color: '#3ee08f' },
  maquina: { label: 'MÁQUINA',        color: '#4cc3ff' },
  quinta:  { label: 'QUINTA SÉRIE',   color: '#ff5c5c' },
  xet:     { label: 'XET',            color: '#efeff1' }
};
const DEFAULT_GROUPS = {
  lore: ['Cheira_Teta', 'peesquerdodocid', 'MelecaDoCid', 'NataliaDoCid', 'CidNaoPagouParaTeAchar', 'churrasqueiro_eder', 'MamacoDoArtico', 'calvopsita', 'EsquiloCalvoDaMeiaNoite', 'DonkeyKongDeSunga', 'RafonhaDasPamonha', 'Batiman_do_nordeste'],
  absurdo: ['Ibuprofeno_de600', 'pikachucomunista', 'biel_geladeira_157', 'Felipe_TelefoneDeContato', 'quiquitomatubaina', 'timboto_cor_de_rosa', 'somelier_de_cocadinha', 'fiscaldogaugau', 'SustodeMoto1312', 'PastelDeNuvem', 'PastelDeVento', 'hamburguervegano1', 'copinhoamericano', 'vacaJaime', 'PorcoSafado', 'CavalodeFogo', 'Capivara_Capoeirista', 'tictueteco', 'FavelaSinto', 'ficaveiherboiola_', 'Siririca_Clandestina', 'Proerdrogedo', 'XixaXixoso', 'calabrotas', 'NOIAdeJOGOS', 'certamente_nao_e_o_matheus', 'CAPSLOCK_ON1', 'captain_ravioli', 'obesidademorbida420'],
  calvo: ['calvicedocid', 'SonhoDoCarecaTerCabelo', 'assistente_de_calvo', 'assistente_de_pinto', 'assistentedepalcodocid', 'KalvoComK', 'DejaCalva', 'esquilo_calvo', 'amante_do_cid', 'amante_da_maju2', 'CarecaCudo', 'pobre_nao_da_sub'],
  maquina: ['Megatron_de_Palio_97', 'radiadordemonza', 'Celta_Rebaixado', 'velotrol_rebaixado', 'Cabo_CTapegandoFogo', 'VentiladorVentandoVento'],
  rango: ['chocolatecomgorgonzola', 'PaoDeAlhoQueimado', 'SucoDeJimo', 'sucodecatarro', 'mingaucomMoralnotribunal', 'PomboAssadoDeSingapura', 'pamonheirapoliglota', 'MilkShakedeOREO', 'GeleiaDeCereja', 'bebeterraba', 'Passarinho_de_Botas', 'pinguimdotoalha'],
  bicho: ['CaracossauroReptil', 'pirocossaurosemcueca', 'BatmanCapoeirista', 'CapivaraDeButina', 'HamsterMolhado', 'mamacopelado', 'BotoEstressado', 'ornitorrinco_deprimido', 'javali_encantado', 'LagartixaOnline', 'centopeiacadeirante'],
  quinta: ['emo_asiatico_mutante', 'braguilha_aberta', 'toddymeiasemcueca', 'VoukoPalutena', 'komakomigo', 'PauladaNaNuca', 'MatheusCalcinha', 'MateusCalcinha', 'azeitona_de_topete', 'calvice_lispector_', 'cientista_agiota', 'fisioterapeuta_manco', 'contra_pilantra', 'trembofob', 'agiotacomalzheimer', 'horripilantehomemfumaca', 'cabricanopaisdasmaravilha', 'camaroeirresponsavel', 'rogerio_peludo', 'Cupom_de_R4', 'AllenDrogado', 'ZeDorgaz', 'almofadinhas___']
};
const DEFAULT_NAMES = Object.values(DEFAULT_GROUPS).flat();
const CAT_OF = new Map();
for (const [c, list] of Object.entries(DEFAULT_GROUPS)) for (const n of list) CAT_OF.set(n.toLowerCase(), c);
const MAX_NAMES = 200, MAX_LEN = 32;

function catOf(name) {
  const known = CAT_OF.get(name.toLowerCase());
  if (known) return known;
  const n = norm(name);
  if (/calv|careca|kalvo|cabelo|peruca/.test(n)) return 'calvo';
  if (/cid/.test(n)) return 'lore';
  if (/pastel|suco|pao|milk|choco|pamonh|geleia|mingau|pizza|coxinha|hamburg|queijo|bolo|cafe|arroz|feijao|churras|sorvete/.test(n)) return 'rango';
  if (/macac|mamaco|capivara|esquilo|pinguim|hamster|boto|gato|cachorro|cavalo|vaca|porco|pato|pombo|lagart|sauro|jacare|sapo/.test(n)) return 'bicho';
  if (/carro|palio|celta|monza|gol|fusca|moto|uno|radiador|motor|cabo|ventilador|geladeira|robo/.test(n)) return 'maquina';
  return 'xet';
}

const EMOJI = [
  [/pikachu/, '⚡'], [/capivara/, '🦫'], [/esquilo/, '🐿️'], [/mamaco|macaco|donkey|kong/, '🦍'], [/pinguim/, '🐧'], [/hamster/, '🐹'],
  [/boto/, '🐬'], [/ornitorrinco/, '🦆'], [/javali/, '🐗'], [/lagartixa|reptil/, '🦎'], [/sauro/, '🦖'], [/centopeia/, '🐛'], [/vaca/, '🐄'],
  [/porco/, '🐖'], [/cavalo/, '🐎'], [/pombo|passarinho/, '🐦'], [/calvopsita|calopsita/, '🦜'], [/batman|batiman/, '🦇'], [/camarao/, '🦐'],
  [/lispector/, '📚'], [/calv|careca|kalvo|cabelo/, '👨‍🦲'], [/peesquerdo|pe_esquerdo/, '🦶'], [/meleca|catarro/, '🤧'], [/natalia/, '💅'],
  [/churras/, '🍖'], [/pamonh/, '🌽'], [/nuvem/, '☁️'], [/vento/, '🌬️'], [/pastel/, '🥟'], [/suco|tubaina/, '🧃'], [/milkshake|oreo/, '🥤'],
  [/gorgonzola/, '🧀'], [/pao/, '🥖'], [/geleia|cereja/, '🍒'], [/beterraba|bebeterraba/, '🍠'], [/mingau/, '🥣'], [/cocadinha/, '🥥'],
  [/hamburguer/, '🍔'], [/copinho/, '🥃'], [/ravioli/, '🍝'], [/toddy/, '🥛'], [/azeitona/, '🫒'], [/calabr/, '🌭'], [/ibuprofeno/, '💊'],
  [/geladeira/, '🧊'], [/telefone/, '☎️'], [/fiscal/, '🧾'], [/moto/, '🏍️'], [/palio|celta|monza|radiador/, '🚗'], [/megatron/, '🤖'],
  [/velotrol/, '🚲'], [/ventilador/, '💨'], [/cabo/, '🔌'], [/emo/, '🖤'], [/braguilha/, '👖'], [/calcinha/, '🩲'], [/cientista/, '🧪'],
  [/alzheimer/, '🧠'], [/agiota/, '💰'], [/fisioterapeuta/, '🩼'], [/fumaca/, '💨'], [/cupom/, '🎟️'], [/almofad/, '🛋️'], [/capslock/, '⌨️'],
  [/jogos/, '🎮'], [/obesidade/, '🍕'], [/peludo/, '🦧'], [/paulada/, '🏏'], [/pinto/, '🐤'], [/maju|amante/, '💘'], [/pobre/, '🪙'],
  [/favela/, '🏘️'], [/proerd/, '🚔'], [/xixa/, '🚽'], [/fogo/, '🔥'], [/rosa|timboto/, '🌸'], [/mutante/, '🧬'], [/pilantra/, '🕵️'],
  [/trem/, '🚆'], [/maravilha/, '🐇'], [/palutena/, '👼'], [/drog|dorgaz/, '😵‍💫'], [/teta/, '🍼'], [/matheus/, '🙅'], [/captain/, '⚓'],
  [/quiquito/, '🍅'], [/eder/, '🔥'], [/rafonha/, '🌽'], [/tictueteco/, '🎵'], [/siririca/, '🫣'], [/herboiola/, '🌿'], [/komakomigo/, '🍽️'],
  [/assistente/, '🎙️'], [/sonho/, '💭'], [/cid/, '🎥']
];
const FALLBACK_EMOJI = ['👾', '🤠', '🥸', '🫠', '🤖', '👽', '🦄', '🐸', '🧌', '🫡', '🦩', '🐙'];
const FONTS = [
  ['Bungee', 1], ['Bangers', 1.2], ['Pacifico', .95], ['Monoton', .9], ['Rubik Glitch', 1], ['Creepster', 1.2], ['Permanent Marker', 1],
  ['Lobster', 1.1], ['Shrikhand', 1], ['VT323', 1.45], ['Silkscreen', .95], ['Bungee Shade', .9], ['Rubik Mono One', .85], ['Righteous', 1.05],
  ['Rampart One', 1], ['Rubik Wet Paint', 1], ['Nabla', 1], ['Press Start 2P', .62]
];
const CHAT_COLORS = ['#ff4a4a', '#1e90ff', '#00ff7f', '#ff7f50', '#9acd32', '#ff69b4', '#daa520', '#5fd3d6', '#2ecc71', '#ff8c1a', '#a970ff', '#ff3d6e', '#00bfff', '#ffb3ff', '#bf94ff', '#ffd400'];

function hashStr(s) { let h = 2166136261; for (const c of s) { h ^= c.codePointAt(0); h = Math.imul(h, 16777619); } return h >>> 0; }
function h2(x, y) { let h = Math.imul(x, 374761393) + Math.imul(y, 668265263); h = Math.imul(h ^ (h >>> 13), 1274126177); return (h ^ (h >>> 16)) >>> 0; }
function rng(seed) { return () => { seed = (seed + 0x6D2B79F5) | 0; let t = Math.imul(seed ^ (seed >>> 15), 1 | seed); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
const emojiOf = name => { const n = norm(name); for (const [re, e] of EMOJI) if (re.test(n)) return e; return FALLBACK_EMOJI[hashStr(name) % FALLBACK_EMOJI.length]; };
const fontOf = name => FONTS[hashStr(name + '§') % FONTS.length];
const colorOf = name => CHAT_COLORS[hashStr(name) % CHAT_COLORS.length];
const pick = a => a[Math.floor(Math.random() * a.length)];
const fmt = n => n.toLocaleString('pt-BR');
const pad3 = n => String(n).padStart(3, '0');

// ---------------------------------------------------------------- estado salvo
const KEY = 'xet-hunt-v2';
let state = { names: [...DEFAULT_NAMES], caught: [], log: {}, points: 0, followed: false, tutorialDone: false };
(function load() {
  const clean = list => [...new Set(list.filter(n => typeof n === 'string').map(n => n.trim()).filter(n => n && n.length <= MAX_LEN))].slice(0, MAX_NAMES);
  try {
    const s = JSON.parse(localStorage.getItem(KEY));
    if (s && Array.isArray(s.names)) {
      state.names = clean(s.names);
      state.caught = Array.isArray(s.caught) ? s.caught.filter(n => typeof n === 'string') : [];
      state.log = s.log && typeof s.log === 'object' ? s.log : {};
      state.points = Number.isFinite(s.points) ? s.points : 0;
      state.followed = !!s.followed; state.tutorialDone = !!s.tutorialDone;
      return;
    }
    const old = JSON.parse(localStorage.getItem('xet-hunt-v1'));
    if (old && Array.isArray(old.names)) {
      state.names = clean([...DEFAULT_NAMES, ...old.names]);
      state.caught = Array.isArray(old.caught) ? old.caught.filter(n => typeof n === 'string') : [];
    }
  } catch {}
})();
let saveWarned = false;
function persist() {
  try { localStorage.setItem(KEY, JSON.stringify(state)); }
  catch { if (!saveWarned) { saveWarned = true; toast('Armazenamento indisponível: progresso só nesta sessão.'); } }
}
const isCaught = n => state.caught.includes(n);
const caughtCount = () => state.names.filter(isCaught).length;

let toastTimer;
function toast(t) { const el = $('#toast'); el.textContent = t; clearTimeout(toastTimer); toastTimer = setTimeout(() => el.textContent = '', 3800); }

// ---------------------------------------------------------------- Cid em pixel art (avatar, tela inicial, gravação e alertas)
const CID_IMG = '<img class="cid-img" src="img/cid-pixel.png" alt="Cid Cidoso">';
const camSVG = `<svg viewBox="0 0 64 48" aria-hidden="true"><rect x="3" y="6" width="58" height="38" rx="8" fill="#2c3038" stroke="#0e0e10" stroke-width="3"/><rect x="8" y="2" width="16" height="6" rx="2" fill="#9147ff"/><circle cx="24" cy="25" r="13" fill="#11131a" stroke="#c2c7cf" stroke-width="3"/><circle cx="24" cy="25" r="7" fill="#7fd3ff"/><circle cx="21" cy="22" r="2.4" fill="#fff"/><circle cx="50" cy="15" r="4" fill="#ff3355" class="rec-dot"/><rect x="42" y="27" width="14" height="10" rx="2" fill="#3d4250"/></svg>`;

// ---------------------------------------------------------------- mapa de São Paulo
const T = 16, MW = 112, MH = 76, SC = 3;
let VW = 20, VH = 12;
const G = 0, TG = 1, R = 2, W = 3, M = 4, SPM = 5, P = 6, WA = 7, BR = 8, D = 9, LAKE = 10, CYC = 11;
const tiles = new Uint8Array(MW * MH), solid = new Uint8Array(MW * MH), owner = new Int16Array(MW * MH).fill(-1);
const ix = (x, y) => y * MW + x, inMap = (x, y) => x >= 0 && y >= 0 && x < MW && y < MH;
const fill = (x, y, w, h, t) => { for (let j = y; j < y + h; j++) for (let i = x; i < x + w; i++) if (inMap(i, j)) tiles[ix(i, j)] = t; };
const INFO = [], things = [];
function thing(name, text, x, y, w, h, draw, opt = {}) {
  const id = INFO.push({ name, text }) - 1;
  const rects = opt.solid === false ? [] : opt.solid || [[x, y, w, h]];
  for (const [sx, sy, sw, sh] of rects) for (let j = sy; j < sy + sh; j++) for (let i = sx; i < sx + sw; i++) if (inMap(i, j)) { solid[ix(i, j)] = 1; owner[ix(i, j)] = id; }
  things.push({ x: x * T, y: y * T, w: w * T, h: h * T, draw, fg: !!opt.fg, id });
  return id;
}

fill(0, 0, MW, MH, G);
fill(0, 0, 44, 8, W); fill(53, 0, 11, 8, W);
fill(44, 0, 9, 8, G); fill(48, 0, 1, 8, P); fill(44, 4, 9, 1, P);
fill(0, 8, MW, 1, M); fill(0, 9, MW, 3, R); fill(0, 10, MW, 1, CYC); fill(0, 12, MW, 1, M);
fill(0, 13, 13, 17, W); fill(13, 13, 1, 17, W); fill(14, 13, 2, 18, R); fill(16, 13, 1, 17, W);
fill(17, 13, 20, 17, W); fill(37, 13, 1, 17, W); fill(38, 13, 2, 18, R); fill(40, 13, 1, 17, W);
fill(0, 19, 13, 5, M); fill(17, 13, 12, 9, SPM);
fill(41, 18, 9, 1, P); fill(49, 17, 11, 1, P); fill(49, 17, 1, 11, P); fill(59, 17, 1, 11, P); fill(49, 27, 11, 1, P);
fill(51, 19, 7, 7, LAKE); fill(42, 22, 6, 6, TG); fill(60, 19, 4, 7, TG); fill(51, 28, 8, 2, TG); fill(41, 28, 6, 2, TG);
fill(0, 30, MW, 1, W); fill(0, 31, MW, 2, R); fill(0, 33, MW, 1, W);
fill(0, 34, MW, 4, WA); fill(28, 34, 4, 4, BR);
fill(0, 38, MW, 1, W); fill(4, 39, 16, 5, D); fill(38, 39, 26, 5, W); fill(22, 41, 14, 1, P);
// expansão leste e sul
fill(64, 0, 48, 8, W);
fill(63, 13, 1, 17, W); fill(64, 13, 2, 18, R); fill(66, 13, 1, 17, W); fill(67, 13, 20, 17, W);
fill(87, 13, 2, 18, R); fill(89, 13, 1, 17, W); fill(90, 13, 22, 14, G); fill(89, 27, 23, 3, M);
fill(92, 34, 4, 4, BR); fill(64, 39, 48, 5, W);
fill(0, 44, MW, 1, W); fill(0, 45, MW, 2, R); fill(0, 47, MW, 1, W);
fill(3, 50, 33, 3, R); fill(3, 71, 33, 3, R); fill(3, 50, 3, 24, R); fill(33, 50, 3, 24, R);
fill(9, 59, 8, 5, TG); fill(20, 62, 9, 6, TG); fill(0, 74, 40, 2, TG);
fill(40, 47, 2, 29, R); fill(42, 48, 30, 15, W); fill(42, 68, 30, 1, P); fill(56, 63, 1, 13, P);
fill(72, 47, 2, 29, R); fill(74, 48, 38, 28, P); fill(84, 53, 28, 23, LAKE);
for (let i = 0; i < MW * MH; i++) if (tiles[i] === WA || tiles[i] === LAKE) solid[i] = 1;

const DISTRICTS = [
  { id: 'paulista', name: 'AV. PAULISTA', color: '#9147ff' }, { id: 'trianon', name: 'PARQUE TRIANON', color: '#3ee08f' },
  { id: 'beco', name: 'BECO DO BATMAN', color: '#ff6fa8' }, { id: 'liberdade', name: 'LIBERDADE', color: '#e33b3b' },
  { id: 'mercadao', name: 'MERCADÃO', color: '#ffd84d' }, { id: 'augusta', name: 'RUA AUGUSTA', color: '#ff6fa8' },
  { id: 'se', name: 'CENTRO • SÉ', color: '#ffd84d' }, { id: 'consolacao', name: 'R. DA CONSOLAÇÃO', color: '#adadb8' },
  { id: 'mosaico', name: 'CALÇADÃO PAULISTA', color: '#efeff1' }, { id: 'luz', name: 'LUZ • FEIRA', color: '#ff9f43' },
  { id: 'maio', name: 'AV. 23 DE MAIO', color: '#adadb8' }, { id: 'ibira', name: 'PARQUE IBIRAPUERA', color: '#2ecc71' },
  { id: 'marco25', name: '25 DE MARÇO', color: '#ff9f43' }, { id: 'pacaembu', name: 'PACAEMBU', color: '#3ee08f' },
  { id: 'marginal', name: 'MARGINAL PINHEIROS', color: '#4cc3ff' }, { id: 'ponte', name: 'PONTE ESTAIADA', color: '#4cc3ff' },
  { id: 'ponte2', name: 'PONTE CIDADE JARDIM', color: '#4cc3ff' }, { id: 'varzea', name: 'VÁRZEA DA QUEBRADA', color: '#ff9f43' },
  { id: 'vila', name: 'QUEBRADA COLORIDA', color: '#ff5c5c' }, { id: 'baile', name: 'BAILE DA QUEBRADA', color: '#9147ff' },
  { id: 'bandeirantes', name: 'AV. DOS BANDEIRANTES', color: '#adadb8' }, { id: 'interlagos', name: 'INTERLAGOS', color: '#ff5c5c' },
  { id: 'vilamada', name: 'VILA MADALENA', color: '#bf94ff' }, { id: 'zoo', name: 'ZOOLÓGICO', color: '#2ecc71' },
  { id: 'represa', name: 'PRAINHA DA REPRESA', color: '#4cc3ff' }
];
const DIST = Object.fromEntries(DISTRICTS.map(d => [d.id, d]));
function districtAt(x, y) {
  if (y <= 7) return x >= 97 ? 'augusta' : x >= 81 ? 'mercadao' : x >= 64 ? 'liberdade' : x >= 53 ? 'beco' : x >= 44 ? 'trianon' : 'paulista';
  if (y <= 12) return 'paulista';
  if (y <= 29) {
    if (x <= 12) return 'se'; if (x <= 16) return 'consolacao';
    if (x <= 36) return y <= 21 ? 'mosaico' : 'luz'; if (x <= 40) return 'maio'; if (x <= 63) return 'ibira';
    return x <= 88 ? 'marco25' : 'pacaembu';
  }
  if (y <= 33) return 'marginal';
  if (y <= 37) return x >= 64 ? 'ponte2' : 'ponte';
  if (y <= 43) return x <= 24 ? 'varzea' : x <= 63 ? 'vila' : 'baile';
  if (y <= 47) return 'bandeirantes';
  if (x <= 41) return 'interlagos';
  if (x <= 73) return y <= 62 ? 'vilamada' : 'zoo';
  return 'represa';
}

// ------------------------------------------------ desenho do cenário (camada 1x)
const bg = document.createElement('canvas'); bg.width = MW * T; bg.height = MH * T;
const fg = document.createElement('canvas'); fg.width = MW * T; fg.height = MH * T;
const r = (g, x, y, w, h, c) => { g.fillStyle = c; g.fillRect(Math.round(x), Math.round(y), Math.round(w), Math.round(h)); };
function px(g, x, y, c) { g.fillStyle = c; g.fillRect(x, y, 1, 1); }
function label(g, t, x, y, c = '#fff', size = 6) { g.font = `bold ${size}px "Silkscreen", monospace`; g.textAlign = 'center'; g.fillStyle = '#0008'; g.fillText(t, x + 1, y + 1); g.fillStyle = c; g.fillText(t, x, y); g.textAlign = 'left'; }

// Silhueta aproximada do estado de São Paulo para o calçadão de pedra portuguesa.
const SP_SHAPE = [[0, .55], [.08, .42], [.18, .34], [.3, .28], [.42, .22], [.52, .12], [.62, .05], [.7, .1], [.75, .04], [.83, .09], [.87, .22], [.93, .34], [1, .47], [.95, .58], [.85, .66], [.72, .75], [.6, .86], [.5, .96], [.44, .9], [.4, .78], [.3, .72], [.18, .7], [.08, .66]];
const SPX = 17 * T + 10, SPY = 13 * T + 14, SPW = 12 * T - 20, SPH = 9 * T - 26;
function inSP(x, y) {
  const u = (x - SPX) / SPW, v = (y - SPY) / SPH; let c = false;
  for (let i = 0, j = SP_SHAPE.length - 1; i < SP_SHAPE.length; j = i++) {
    const [xi, yi] = SP_SHAPE[i], [xj, yj] = SP_SHAPE[j];
    if ((yi > v) !== (yj > v) && u < (xj - xi) * (v - yi) / (yj - yi) + xi) c = !c;
  }
  return c;
}

function drawTile(g, tx, ty) {
  const t = tiles[ix(tx, ty)], x = tx * T, y = ty * T, h = h2(tx, ty);
  if (t === G || t === TG) {
    r(g, x, y, T, T, t === TG ? '#3f9b4c' : '#78c35a');
    if (t === G) {
      for (let k = 0; k < 3; k++) { const hx = (h >> (k * 5)) & 15, hy = (h >> (k * 5 + 12)) & 15; if ((h >> k) & 1) { px(g, x + hx, y + hy, '#5aa548'); px(g, x + hx + 1, y + hy - 1, '#5aa548'); } }
      if (h % 19 === 0) { const c = ['#ffd84d', '#ff8ac2', '#fff'][h % 3]; px(g, x + 6, y + 7, c); px(g, x + 5, y + 8, c); px(g, x + 7, y + 8, c); px(g, x + 6, y + 9, c); px(g, x + 6, y + 8, '#ff9f43'); }
    } else {
      for (let k = 0; k < 4; k++) { const bx = x + (k % 2) * 8, by = y + (k >> 1) * 8; r(g, bx + 1, by + 3, 2, 5, '#2c7a3a'); r(g, bx + 5, by + 3, 2, 5, '#2c7a3a'); r(g, bx + 3, by + 1, 2, 6, '#5fc069'); r(g, bx + 2, by + 6, 4, 2, '#2c7a3a'); }
    }
  } else if (t === R || t === CYC) {
    r(g, x, y, T, T, t === CYC ? '#b43a3a' : '#4b4a57');
    for (let k = 0; k < 4; k++) px(g, x + ((h >> (k * 4)) & 15), y + ((h >> (k * 4 + 2)) & 15), t === CYC ? '#9c2f33' : '#56556a');
  } else if (t === W) {
    r(g, x, y, T, T, '#cfc8bb'); r(g, x, y, T, 1, '#b8b0a2'); r(g, x, y, 1, T, '#b8b0a2'); r(g, x + 8, y, 1, 8, '#bfb7a9'); r(g, x, y + 8, T, 1, '#bfb7a9');
    if (h % 13 === 0) px(g, x + 4, y + 11, '#a39b8d');
  } else if (t === P) {
    r(g, x, y, T, T, '#e3cd92'); for (let k = 0; k < 3; k++) px(g, x + ((h >> (k * 4)) & 15), y + ((h >> (k * 4 + 3)) & 15), '#c7ae70');
  } else if (t === D) {
    r(g, x, y, T, T, '#c98b52'); for (let k = 0; k < 3; k++) px(g, x + ((h >> (k * 4)) & 15), y + ((h >> (k * 4 + 3)) & 15), '#b27341');
  } else if (t === WA || t === LAKE || t === BR) {
    if (t === BR) { r(g, x, y, T, T, '#8e8d9b'); if (tx === 29 || tx === 93) { r(g, x + 14, y, 1, T, '#ffd84d'); r(g, x + 17, y, 1, T, '#ffd84d'); } if (tiles[ix(tx - 1, ty)] !== BR) r(g, x, y, 2, T, '#c9c8d6'); if (tiles[ix(tx + 1, ty)] !== BR) r(g, x + 14, y, 2, T, '#c9c8d6'); return; }
    r(g, x, y, T, T, t === LAKE ? '#3a8fd9' : '#5a8f86');
    const hi = t === LAKE ? '#7cc4ff' : '#86b3a6'; if (h % 3 === 0) r(g, x + (h & 7), y + ((h >> 3) & 11), 5, 1, hi);
  } else if (t === M || t === SPM) {
    for (let j = 0; j < T; j += 2) for (let i = 0; i < T; i += 2) {
      const gx = x + i, gy = y + j, n = h2(gx, gy);
      let dark;
      if (t === M) dark = ((gy + Math.round(Math.sin(gx / 7) * 3) + 400) % 12) < 4;
      else dark = inSP(gx + 1, gy + 1);
      let c = dark ? (n & 1 ? '#26262c' : '#33333b') : (n & 1 ? '#f1eee5' : '#e4e0d4');
      if (t === SPM && dark && ((gx + gy) % 10 < 2)) c = '#8d8b97';
      g.fillStyle = c; g.fillRect(gx, gy, 2, 2);
    }
  }
}

// ---- elementos e monumentos
function tree(g, x, y, kind = 'tree') {
  const pal = { tree: ['#2f7d3a', '#3f9b4c', '#6cc35f'], ipeA: ['#c99b10', '#ffd21f', '#fff07a'], ipeR: ['#9b3a8f', '#d35fc7', '#f2a6ec'], ipeB: ['#c25a8a', '#ff8ac2', '#ffd1e6'] }[kind];
  r(g, x + 3, y + 13, 12, 3, '#0003'); r(g, x + 6, y + 9, 4, 7, '#7a4a26'); r(g, x + 7, y + 9, 1, 7, '#5a361b');
  r(g, x + 1, y + 2, 14, 9, pal[0]); r(g, x + 2, y, 12, 10, pal[1]); r(g, x, y + 3, 16, 6, pal[1]); r(g, x + 3, y + 1, 6, 3, pal[2]); r(g, x + 2, y + 4, 3, 2, pal[2]);
}
function palm(g, x, y) {
  r(g, x + 4, y + 14, 10, 2, '#0003'); for (let k = 0; k < 12; k++) r(g, x + 7 + (k > 6 ? 1 : 0), y + 4 + k, 2, 1, k % 2 ? '#8a6a3c' : '#a9844c');
  for (const [dx, dy, w] of [[-2, 2, 7], [9, 2, 7], [0, 0, 6], [10, 0, 6], [4, -1, 8], [1, 5, 4], [11, 5, 4]]) r(g, x + dx, y + dy, w, 2, '#2f9b4a');
  r(g, x + 6, y + 3, 4, 3, '#7a4a26');
}
function windows(g, x, y, w, h, c1, c2, sx = 5, sy = 6) {
  for (let j = y; j < y + h - 3; j += sy) for (let i = x; i < x + w - 3; i += sx) r(g, i, j, sx - 2, sy - 2, (h2(i, j) % 5 === 0) ? c2 : c1);
}
function tower(g, x, y, w, h, body, win, lit, roof) {
  r(g, x + 3, y + h - 3, w, 4, '#0003'); r(g, x, y, w, h, body); r(g, x, y, w, 3, roof || '#0002'); r(g, x + w - 3, y, 3, h, '#0002');
  windows(g, x + 3, y + 6, w - 6, h - 10, win, lit); r(g, x + w / 2 - 4, y + h - 9, 8, 9, '#2a2833');
}

function buildWorld() {
  // Norte da Paulista
  thing('Edifício na Paulista', 'Prédio comercial da Paulista. No térreo tem um café que cobra R$ 18 num pão de queijo.', 0, 0, 5, 6, g => tower(g, 0, 0, 80, 96, '#8a8fa8', '#43507a', '#ffe28a'));
  thing('Conjunto Nacional', 'Conjunto Nacional. Livraria, cinema de rua e um letreiro no topo que guia quem se perde na Paulista.', 6, 0, 8, 5, g => {
    r(g, 96, 20, 128, 60, '#d9d4c7'); for (let j = 26; j < 74; j += 7) r(g, 98, j, 124, 3, '#5d6b8a'); r(g, 96, 0, 128, 22, '#0000');
    r(g, 116, 6, 88, 13, '#1f1d27'); label(g, 'CONJUNTO NACIONAL', 160, 15, '#7fd3ff', 6); r(g, 150, 66, 20, 14, '#2a2833');
  });
  thing('MASP', 'MASP. Um caixote suspenso por pilares vermelhos e 74 metros de vão livre embaixo. Domingo vira feira, protesto e show ao mesmo tempo.', 16, 0, 12, 8, g => {
    const x = 16 * T, y = 0; r(g, x + 16, 82, 160, 46, '#bdb6a8');
    for (let i = x + 20; i < x + 172; i += 12) r(g, i, 84, 6, 2, '#ada597');
    r(g, x + 6, 12, 180, 64, '#2b313d'); for (let i = x + 10; i < x + 182; i += 8) r(g, i, 18, 2, 54, '#3f4a5c'); r(g, x + 6, 40, 180, 2, '#4a5568');
    r(g, x + 2, 8, 188, 7, '#d6332b'); r(g, x + 2, 73, 188, 7, '#d6332b'); r(g, x + 2, 8, 188, 2, '#ff6b5c');
    r(g, x + 2, 8, 12, 120, '#d6332b'); r(g, x + 178, 8, 12, 120, '#d6332b'); r(g, x + 2, 8, 3, 120, '#ff6b5c'); r(g, x + 178, 8, 3, 120, '#ff6b5c');
    r(g, x + 72, 26, 48, 12, '#efeff1'); label(g, 'M A S P', x + 96, 35, '#d6332b', 8);
  }, { solid: [[16, 0, 12, 5], [16, 5, 1, 3], [27, 5, 1, 3]] });
  thing('Torre de TV', 'Torre de TV da Paulista. De noite ela pisca vermelho pra avisar os aviões que o Cid tá ao vivo.', 29, 0, 2, 7, g => {
    const x = 29 * T; r(g, x + 4, 104, 26, 6, '#0003');
    for (let j = 0; j < 104; j += 8) { const w = 6 + j * .14; r(g, x + 16 - w / 2, j, w, 8, (j / 8) % 2 ? '#e33b3b' : '#f2f2f2'); }
    for (let j = 4; j < 104; j += 8) r(g, x + 14, j, 4, 1, '#0004'); r(g, x + 15, 0, 2, 10, '#c2c7cf');
  });
  thing('Prédio da Pirâmide', 'O prédio-pirâmide da Paulista. Parece que vai tombar pra trás, mas é só impressão de ótica.', 32, 0, 6, 7, g => {
    const x = 32 * T; g.fillStyle = '#25303f'; g.beginPath(); g.moveTo(x + 4, 110); g.lineTo(x + 92, 110); g.lineTo(x + 72, 4); g.lineTo(x + 24, 4); g.fill();
    for (let j = 10; j < 108; j += 6) { const inset = 24 - j * .19; r(g, x + inset + 2, j, 92 - 2 * inset - 4, 2, '#4cc3ff55'); }
    for (let i = 0; i < 9; i++) r(g, x + 26 + i * 5.2, 4, 1, 104, '#ffffff12'); r(g, x + 40, 98, 16, 12, '#11131a');
  });
  thing('Torre de vidro', 'Torre espelhada. Reflete o céu, os ônibus e o XET passando.', 39, 0, 5, 6, g => tower(g, 39 * T, 0, 80, 96, '#3d6b8f', '#7fd3ff', '#ffffff', '#2c4f6d'));
  thing('Parque Trianon', 'Parque Trianon. Um pedaço de Mata Atlântica no meio da Paulista. Tem sagui aqui, juro.', 44, 0, 1, 1, () => {}, { solid: false });
  const trianon = [[44, 0], [46, 0], [50, 0], [52, 1], [45, 2], [50, 2], [44, 6], [46, 6], [50, 6], [52, 5], [46, 3]];
  trianon.forEach(([x, y], i) => thing('Árvore do Trianon', i % 3 ? 'Árvore da Mata Atlântica. O sagui te olhou com cara de quem sabe onde o XET tá.' : 'Ipê florido. Quando floresce, São Paulo inteira para pra tirar foto.', x, y, 1, 1, g => tree(g, x * T, y * T, i % 3 ? 'tree' : 'ipeA')));
  thing('Beco do Batman', 'Beco do Batman. Cada parede é um grafite diferente. Tem até um Cid pintado ali... será?', 53, 0, 11, 3, g => {
    const x = 53 * T; r(g, x, 0, 176, 48, '#4a3f5c');
    const cols = ['#ff6fa8', '#ffd84d', '#3ee08f', '#4cc3ff', '#9147ff', '#ff9f43', '#ff5c5c'];
    for (let k = 0; k < 60; k++) { const n = h2(k, 77); r(g, x + (n % 170), (n >> 8) % 40, 4 + (n >> 4) % 18, 3 + (n >> 12) % 8, cols[n % cols.length]); }
    r(g, x + 8, 8, 52, 22, '#0e0e10'); g.font = 'bold 15px "Rubik Wet Paint", "Bangers", sans-serif'; g.fillStyle = '#bf94ff'; g.fillText('XET', x + 12, 26);
    g.beginPath(); g.fillStyle = '#ffd84d'; g.arc(x + 130, 22, 15, 0, 7); g.fill();
    r(g, x + 118, 8, 24, 9, '#221b29'); r(g, x + 121, 24, 18, 10, '#2f2630'); r(g, x + 124, 18, 3, 3, '#17121f'); r(g, x + 134, 18, 3, 3, '#17121f'); r(g, x + 126, 26, 8, 2, '#fff');
    r(g, x, 44, 176, 4, '#2b2433');
  });
  thing('Caçamba grafitada', 'Caçamba de entulho grafitada. Arte urbana em todo lugar.', 56, 5, 2, 1, g => { r(g, 56 * T + 1, 82, 30, 13, '#ff9f43'); r(g, 56 * T + 4, 85, 10, 5, '#9147ff'); r(g, 56 * T + 18, 84, 8, 7, '#3ee08f'); r(g, 56 * T + 1, 95, 30, 1, '#0004'); });
  thing('Bikes laranjas', 'Bike de aluguel. Pedala, Cidoso, que a XETDEX não se completa sozinha.', 61, 5, 2, 1, g => { for (const o of [0, 14]) { const bx = 61 * T + o + 1; r(g, bx, 89, 12, 2, '#ff8c1a'); r(g, bx, 91, 4, 4, '#222'); r(g, bx + 8, 91, 4, 4, '#222'); r(g, bx + 9, 85, 2, 5, '#ff8c1a'); } });

  // Centro • Sé
  thing('Catedral da Sé', 'Catedral da Sé. Neogótica, cúpula verde-cobre e o Marco Zero da cidade logo ali na praça.', 2, 13, 8, 6, g => {
    const x = 2 * T, y = 13 * T; r(g, x + 4, y + 92, 124, 4, '#0003');
    r(g, x + 22, y + 34, 84, 62, '#a9a08a'); for (let i = x + 30; i < x + 100; i += 12) { r(g, i, y + 50, 6, 18, '#3c4660'); g.fillStyle = '#3c4660'; g.beginPath(); g.arc(i + 3, y + 50, 3, Math.PI, 0); g.fill(); }
    g.fillStyle = '#4f9a85'; g.beginPath(); g.arc(x + 64, y + 34, 24, Math.PI, 0); g.fill(); r(g, x + 60, y + 2, 8, 12, '#4f9a85'); r(g, x + 63, y - 6, 2, 10, '#c9b26a');
    for (const sx of [x + 2, x + 106]) { r(g, sx, y + 20, 22, 76, '#9a917b'); r(g, sx + 6, y + 30, 10, 22, '#3c4660'); g.fillStyle = '#4f9a85'; g.beginPath(); g.moveTo(sx - 2, y + 22); g.lineTo(sx + 11, y - 24); g.lineTo(sx + 24, y + 22); g.fill(); r(g, sx + 10, y - 32, 2, 10, '#c9b26a'); r(g, sx + 7, y - 28, 8, 2, '#c9b26a'); }
    r(g, x + 52, y + 70, 24, 26, '#3a2c22'); g.fillStyle = '#3a2c22'; g.beginPath(); g.arc(x + 64, y + 70, 12, Math.PI, 0); g.fill();
    g.strokeStyle = '#d6cfb8'; g.lineWidth = 2; g.beginPath(); g.arc(x + 64, y + 52, 8, 0, 7); g.stroke();
  });
  [[0, 19], [12, 19], [0, 23], [12, 23]].forEach(([x, y]) => thing('Palmeira da Sé', 'Palmeira da Praça da Sé. Tem um pombo morando lá em cima faz uns dez anos.', x, y, 1, 1, g => palm(g, x * T, y * T)));
  thing('Marco Zero', 'Marco Zero de São Paulo. Toda distância da cidade começa a ser medida aqui — inclusive a do XET.', 6, 21, 1, 1, g => { const x = 6 * T, y = 21 * T; r(g, x + 2, y + 12, 13, 3, '#0003'); r(g, x + 3, y + 4, 10, 10, '#d8d1bd'); r(g, x + 5, y + 1, 6, 4, '#b8b09a'); r(g, x + 6, y + 7, 4, 4, '#4f9a85'); });
  thing('Edifício Copan', 'Edifício Copan. Uma onda de concreto com mais de mil apartamentos. Metade é do XET, a outra metade é do chat.', 0, 24, 6, 6, g => {
    const y0 = 24 * T; r(g, 4, y0 + 92, 92, 4, '#0003');
    for (let j = 0; j < 92; j += 4) { const off = Math.round(Math.sin(j / 18) * 6); r(g, 2 + off, y0 + j, 88, 4, j % 8 ? '#e9e4d6' : '#c6bfae'); }
    r(g, 34, y0 + 80, 26, 12, '#2a2833'); label(g, 'COPAN', 48, y0 + 76, '#2a2833', 7);
  });
  thing('Theatro Municipal', 'Theatro Municipal. Ópera, balé e um eco perfeito pra gritar VAPO VAPO VAPO.', 7, 25, 6, 5, g => {
    const x = 7 * T, y = 25 * T; r(g, x + 4, y + 76, 92, 4, '#0003'); r(g, x + 4, y + 24, 88, 56, '#d8c08a');
    for (let i = x + 10; i < x + 90; i += 12) r(g, i, y + 36, 6, 30, '#a8905c'); r(g, x + 4, y + 22, 88, 6, '#b89c64');
    g.fillStyle = '#4f9a85'; for (const cx of [x + 14, x + 82]) { g.beginPath(); g.arc(cx, y + 22, 10, Math.PI, 0); g.fill(); r(g, cx - 1, y + 4, 2, 8, '#c9b26a'); }
    g.beginPath(); g.arc(x + 48, y + 22, 18, Math.PI, 0); g.fill(); r(g, x + 47, y - 2, 2, 8, '#c9b26a'); r(g, x + 38, y + 62, 20, 18, '#5a3a22');
  });
  thing('Lixeira laranja', 'Lixeira laranja de São Paulo. Joga o lixo no lixo, XET.', 12, 24, 1, 1, g => lixeira(g, 12 * T, 24 * T));

  // Calçadão com o mapa do estado
  thing('Placa do Calçadão', 'Calçada de pedra portuguesa com o mapa do estado de São Paulo. Pisa com carinho, que cada pedrinha foi posta à mão.', 29, 21, 1, 1, g => { const x = 29 * T, y = 21 * T; r(g, x + 7, y + 6, 2, 10, '#555'); r(g, x + 1, y + 1, 14, 8, '#1f6f43'); r(g, x + 2, y + 2, 12, 6, '#2e8b57'); r(g, x + 4, y + 4, 8, 1, '#fff'); });
  thing('Edifício Altino Arantes', 'Edifício Altino Arantes, o "Banespão". Do mirante lá de cima dá pra ver o XET inteiro.', 31, 13, 5, 7, g => {
    const x = 31 * T, y = 13 * T; r(g, x + 2, y + 108, 80, 4, '#0003');
    r(g, x + 6, y + 40, 68, 72, '#c8b48a'); r(g, x + 16, y + 18, 48, 30, '#c8b48a'); r(g, x + 26, y + 2, 28, 20, '#c8b48a'); r(g, x + 36, y - 16, 8, 20, '#b8a47a');
    r(g, x + 39, y - 30, 2, 16, '#888'); r(g, x + 41, y - 30, 10, 6, '#e33b3b'); r(g, x + 41, y - 27, 10, 1, '#fff');
    windows(g, x + 10, y + 46, 60, 60, '#5d6b8a', '#ffe28a', 6, 7); windows(g, x + 20, y + 22, 40, 24, '#5d6b8a', '#ffe28a', 6, 7);
  });
  [[17, 23, '#3a6cd9', 'PASTEL'], [21, 23, '#e33b3b', 'CALDO DE CANA'], [17, 26, '#2e9b57', 'FRUTA'], [21, 26, '#ff9f43', 'PASTEL']].forEach(([x, y, c, n]) =>
    thing('Barraca de feira', n === 'PASTEL' ? 'Barraca de pastel. Pastel de vento R$ 8 (é literalmente o PastelDeVento). Caldo de cana sai na faixa? Não.' : n === 'FRUTA' ? '"Olha a banana, freguesa! Três é dez!" — o grito oficial da feira paulistana.' : 'Caldo de cana com limão. A máquina faz um barulho que parece motor de Palio 97.', x, y, 3, 2, g => {
      const bx = x * T, by = y * T; r(g, bx + 2, by + 28, 46, 4, '#0003');
      for (let i = 0; i < 48; i += 6) r(g, bx + i, by + 2, 6, 10, (i / 6) % 2 ? '#fff' : c);
      r(g, bx, by + 10, 48, 3, '#0003'); r(g, bx + 3, by + 13, 2, 17, '#888'); r(g, bx + 43, by + 13, 2, 17, '#888');
      r(g, bx + 4, by + 18, 40, 10, '#b27341'); r(g, bx + 4, by + 18, 40, 2, '#d8a06a'); label(g, n, bx + 24, by + 26, '#fff', 5);
      for (let k = 0; k < 5; k++) r(g, bx + 8 + k * 7, by + 15, 5, 3, ['#ffd84d', '#ff5c5c', '#3ee08f', '#ff9f43', '#e6c27a'][(k + x) % 5]);
    }));
  thing('Estação da Luz', 'Estação da Luz. Tijolinho inglês, relógio pontual e trem saindo pro interior. Ah, e o Museu da Língua Portuguesa — onde "XET" ainda não é verbete.', 27, 23, 10, 7, g => {
    const x = 27 * T, y = 23 * T; r(g, x + 4, y + 108, 156, 4, '#0003'); r(g, x, y + 40, 160, 72, '#b5563a');
    for (let j = y + 44; j < y + 108; j += 4) r(g, x, j, 160, 1, '#9c4630');
    for (let i = x + 10; i < x + 150; i += 16) { r(g, i, y + 56, 8, 22, '#2f3442'); g.fillStyle = '#2f3442'; g.beginPath(); g.arc(i + 4, y + 56, 4, Math.PI, 0); g.fill(); r(g, i, y + 84, 8, 14, '#2f3442'); }
    r(g, x, y + 36, 160, 6, '#e8dcc0'); r(g, x + 66, y - 8, 28, 50, '#b5563a'); r(g, x + 64, y - 12, 32, 6, '#e8dcc0'); r(g, x + 72, y - 30, 16, 20, '#4f9a85');
    g.fillStyle = '#fffbe8'; g.beginPath(); g.arc(x + 80, y + 10, 9, 0, 7); g.fill(); g.strokeStyle = '#2f3442'; g.lineWidth = 1.5; g.beginPath(); g.moveTo(x + 80, y + 10); g.lineTo(x + 80, y + 4); g.moveTo(x + 80, y + 10); g.lineTo(x + 85, y + 10); g.stroke();
    r(g, x + 70, y + 92, 20, 20, '#3a2c22');
  });
  thing('Dogão', 'Dogão completo: purê, batata palha, milho, ervilha, vinagrete, catupiry e ovo de codorna. Sim, tudo junto.', 33, 21, 1, 1, g => { const x = 33 * T, y = 21 * T; r(g, x + 1, y + 4, 14, 9, '#e33b3b'); r(g, x + 1, y + 4, 14, 3, '#ffd84d'); r(g, x + 2, y + 13, 3, 3, '#222'); r(g, x + 11, y + 13, 3, 3, '#222'); r(g, x + 4, y - 4, 8, 7, '#fff'); r(g, x + 7, y, 2, 4, '#888'); });
  thing('Orelhão', 'Orelhão. Ainda funciona? Ninguém sabe. Ninguém testa.', 30, 21, 1, 1, g => orelhao(g, 30 * T, 21 * T));

  // Ibirapuera
  thing('Obelisco do Ibirapuera', 'Obelisco do Ibirapuera. 72 metros de mármore em homenagem à Revolução de 1932.', 45, 13, 2, 4, g => {
    const x = 45 * T, y = 13 * T; r(g, x + 2, y + 58, 30, 6, '#0003'); g.fillStyle = '#e9e4d6'; g.beginPath(); g.moveTo(x + 8, y + 60); g.lineTo(x + 24, y + 60); g.lineTo(x + 20, y - 18); g.lineTo(x + 16, y - 26); g.lineTo(x + 12, y - 18); g.fill();
    r(g, x + 16, y - 18, 4, 78, '#c9c3b2'); r(g, x + 4, y + 56, 24, 6, '#bdb6a3');
  });
  thing('Oca', 'Oca. Um disco voador branco que pousou no parque e virou museu.', 51, 13, 5, 4, g => {
    const x = 51 * T, y = 13 * T; r(g, x + 2, y + 58, 78, 5, '#0003'); g.fillStyle = '#f4f4f0'; g.beginPath(); g.ellipse(x + 40, y + 60, 38, 46, 0, Math.PI, 0); g.fill();
    g.fillStyle = '#d8d8d2'; g.beginPath(); g.ellipse(x + 48, y + 60, 26, 40, 0, Math.PI * 1.5, 0); g.fill();
    for (const [dx, dy] of [[20, 34], [34, 26], [50, 30], [62, 44], [28, 48], [46, 46]]) { g.fillStyle = '#5d6b8a'; g.beginPath(); g.arc(x + dx, y + dy, 3, 0, 7); g.fill(); }
  });
  thing('Auditório Ibirapuera', 'Auditório Ibirapuera. A "língua" vermelha na entrada é marca registrada do Niemeyer.', 59, 13, 5, 4, g => {
    const x = 59 * T, y = 13 * T; r(g, x + 2, y + 58, 76, 5, '#0003'); g.fillStyle = '#f4f4f0'; g.beginPath(); g.moveTo(x + 2, y + 62); g.lineTo(x + 78, y + 62); g.lineTo(x + 78, y + 2); g.fill();
    g.fillStyle = '#e33b3b'; g.beginPath(); g.moveTo(x + 40, y + 40); g.quadraticCurveTo(x + 26, y + 52, x + 12, y + 50); g.quadraticCurveTo(x + 22, y + 60, x + 44, y + 50); g.fill();
    r(g, x + 50, y + 46, 14, 16, '#3c4660');
  });
  thing('Lago do Ibirapuera', 'Lago do Ibirapuera. Proibido nadar. Os patos estão de olho em você.', 51, 19, 7, 7, () => {}, { solid: false });
  for (let i = 0; i < 7 * 7; i++) owner[ix(51 + (i % 7), 19 + Math.floor(i / 7))] = INFO.length - 1;
  [[41, 13, 'tree'], [43, 13, 'ipeR'], [42, 15, 'tree'], [48, 14, 'ipeA'], [42, 20, 'ipeB'], [47, 20, 'tree'], [56, 17 - 1, 'tree'], [61, 17, 'ipeA'], [61, 26, 'tree'], [48, 25, 'ipeR'], [50, 28, 'tree'], [60, 28, 'ipeB'], [57, 28 - 0, 'tree'], [47, 29, 'tree']]
    .forEach(([x, y, k]) => { if (!solid[ix(x, y)]) thing(k === 'tree' ? 'Árvore do parque' : 'Ipê florido', k === 'tree' ? 'Sombra boa pra live. O sinal do 4G é que não ajuda.' : 'Ipê florido. Quando floresce, São Paulo inteira para pra tirar foto.', x, y, 1, 1, g => tree(g, x * T, y * T, k)); });
  thing('Banco do parque', 'Banco de praça. Senta aqui pra ler o chat... não, o XET não para.', 46, 17, 2, 1, g => bench(g, 46 * T, 17 * T));

  // Paulista: mobiliário urbano
  [[3, 12], [25, 8], [42, 8], [57, 12], [36, 12]].forEach(([x, y]) => thing('Lixeira laranja', 'Lixeira laranja de São Paulo. Joga o lixo no lixo, XET.', x, y, 1, 1, g => lixeira(g, x * T, y * T)));
  [[11, 12], [35, 8], [47, 12]].forEach(([x, y]) => thing('Orelhão', 'Orelhão. Ainda funciona? Ninguém sabe. Ninguém testa.', x, y, 1, 1, g => orelhao(g, x * T, y * T)));
  thing('Banca de jornal', 'Banca de jornal. Vende figurinha, chip de celular, guarda-chuva e água a R$ 5.', 19, 12, 2, 1, g => { const x = 19 * T, y = 12 * T; r(g, x, y + 1, 32, 15, '#1f6f43'); r(g, x, y + 1, 32, 3, '#2e9b57'); r(g, x + 3, y + 6, 26, 6, '#efeff1'); for (let k = 0; k < 6; k++) r(g, x + 4 + k * 4, y + 7, 3, 4, ['#ff5c5c', '#4cc3ff', '#ffd84d', '#3ee08f'][k % 4]); });
  thing('Banca de jornal', 'Banca de jornal. Revista de palavra-cruzada, chiclete e a fofoca de ontem.', 6, 30, 2, 1, g => { const x = 6 * T, y = 30 * T; r(g, x, y + 1, 32, 15, '#1f6f43'); r(g, x, y + 1, 32, 3, '#2e9b57'); r(g, x + 3, y + 6, 26, 6, '#efeff1'); });
  thing('Ponto de ônibus', 'Ponto de ônibus da Marginal. O busão sentido Terminal passa lotado. Sempre.', 44, 30, 3, 1, g => { const x = 44 * T, y = 30 * T; r(g, x + 2, y, 44, 3, '#3c4660'); r(g, x + 3, y + 3, 2, 13, '#888'); r(g, x + 43, y + 3, 2, 13, '#888'); r(g, x + 6, y + 9, 36, 3, '#c88a43'); r(g, x + 20, y + 3, 10, 5, '#ffd84d'); });

  // Ponte Estaiada (pilar em X desenhado por cima de quem passa atrás)
  thing('Ponte Estaiada', 'Ponte Estaiada. Cartão-postal de abertura de telejornal: um X gigante de concreto segurando cabos amarelos.', 33, 35, 1, 2, g => {}, { solid: [[33, 35, 1, 2]] });
  things.push({ fg: true, draw: g => {
    const cx = 33 * T + 8, base = 37 * T, top = 25 * T;
    g.strokeStyle = '#ffd84d99'; g.lineWidth = .6;
    for (let k = 0; k < 7; k++) { const ty = top + 14 + k * 6; g.beginPath(); g.moveTo(cx, ty); g.lineTo(28 * T + k * 8, 34 * T + 4 + (k % 2) * 40); g.stroke(); g.beginPath(); g.moveTo(cx, ty); g.lineTo(cx + 18 + k * 10, 34 * T + 4 + (k % 2) * 40); g.stroke(); }
    g.fillStyle = '#e9e4d6'; g.beginPath(); g.moveTo(cx - 14, base); g.lineTo(cx - 3, top); g.lineTo(cx + 3, top); g.lineTo(cx + 14, base); g.lineTo(cx + 8, base); g.lineTo(cx, top + 70); g.lineTo(cx - 8, base); g.fill();
    g.fillStyle = '#c9c3b2'; g.fillRect(cx - 3, top, 3, 70);
  } });

  // Quebrada
  thing('Campo de várzea', 'Campo de várzea. Domingo tem final: Unidos do XET x Calvos FC. O juiz é o ZeDorgaz.', 21, 39, 1, 1, g => { const x = 21 * T, y = 39 * T; r(g, x + 7, y + 6, 2, 10, '#555'); r(g, x + 1, y + 1, 14, 8, '#ffd84d'); r(g, x + 3, y + 4, 10, 2, '#2a2833'); });
  things.push({ draw: g => {
    const x = 4 * T, y = 39 * T; g.strokeStyle = '#f2e9da'; g.lineWidth = 1; g.strokeRect(x + 3.5, y + 3.5, 249, 73); g.beginPath(); g.moveTo(x + 128, y + 4); g.lineTo(x + 128, y + 77); g.stroke(); g.beginPath(); g.arc(x + 128, y + 40, 12, 0, 7); g.stroke();
    for (const gx of [x + 1, x + 249]) { r(g, gx, y + 28, 6, 2, '#fff'); r(g, gx, y + 50, 6, 2, '#fff'); r(g, gx + (gx > x + 100 ? 4 : 0), y + 28, 2, 24, '#fff'); }
  } });
  const houseCols = ['#ff6fa8', '#ffd84d', '#4cc3ff', '#3ee08f', '#ff9f43', '#bf94ff', '#ff5c5c'];
  [40, 44, 48, 52, 56, 60].forEach((hx, i) => thing('Casa da quebrada', pick(['Casa colorida, caixa d\'água azul e laje pronta pro churrasco de domingo.', 'Aqui mora a tia que vende geladinho de R$ 2. O de coco é lendário.', 'Tem um cachorro caramelo na laje vigiando a rua inteira.']), hx, 39, 3, 3, g => {
    const x = hx * T, y = 39 * T, c = houseCols[i % houseCols.length]; r(g, x + 2, y + 44, 46, 4, '#0003');
    r(g, x + 1, y + 10, 46, 36, c); r(g, x + 1, y + 10, 46, 3, '#0002'); r(g, x, y + 6, 48, 5, '#9c4630'); r(g, x + 1, y + 2, 46, 4, '#b5563a');
    r(g, x + 30, y - 6, 12, 10, '#2f6fd9'); r(g, x + 30, y - 6, 12, 2, '#4cc3ff');
    r(g, x + 6, y + 18, 10, 9, '#2f3442'); r(g, x + 7, y + 19, 4, 3, '#7fd3ff'); r(g, x + 24, y + 28, 10, 18, '#5a3a22'); r(g, x + 36, y + 18, 8, 9, '#2f3442');
  }));
  [[23, 39], [36, 39], [26, 42], [33, 42]].forEach(([x, y], i) => thing('Árvore', 'Pé de manga. Se cair na cabeça do Cid, vira corte.', x, y, 1, 1, g => tree(g, x * T, y * T, i === 1 ? 'ipeA' : 'tree')));
  thing('Carrinho de pipoca', 'Pipoca doce ou salgada? O XET quer as duas, com bacon.', 29, 40, 1, 1, g => { const x = 29 * T, y = 40 * T; r(g, x + 1, y + 5, 14, 8, '#ff5c5c'); r(g, x + 3, y - 2, 10, 7, '#fffbe8'); r(g, x + 4, y + 13, 3, 3, '#222'); r(g, x + 10, y + 13, 3, 3, '#222'); r(g, x + 2, y + 7, 12, 2, '#fff'); });
  buildEast();
}
function houseDraw(g, x, y, c) {
  r(g, x + 2, y + 44, 46, 4, '#0003'); r(g, x + 1, y + 10, 46, 36, c); r(g, x + 1, y + 10, 46, 3, '#0002'); r(g, x, y + 6, 48, 5, '#9c4630'); r(g, x + 1, y + 2, 46, 4, '#b5563a');
  r(g, x + 30, y - 6, 12, 10, '#2f6fd9'); r(g, x + 30, y - 6, 12, 2, '#4cc3ff');
  r(g, x + 6, y + 18, 10, 9, '#2f3442'); r(g, x + 7, y + 19, 4, 3, '#7fd3ff'); r(g, x + 24, y + 28, 10, 18, '#5a3a22'); r(g, x + 36, y + 18, 8, 9, '#2f3442');
}
function scatterTrees(x0, y0, w, h, n, kinds, seed) {
  const rnd = rng(seed);
  for (let k = 0; k < n; k++) {
    const x = x0 + Math.floor(rnd() * w), y = y0 + Math.floor(rnd() * h), kind = kinds[Math.floor(rnd() * kinds.length)];
    if (!inMap(x, y) || tiles[ix(x, y)] !== G || solid[ix(x, y)]) continue;
    let free = true;
    for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) if (inMap(x + dx, y + dy) && solid[ix(x + dx, y + dy)]) free = false;
    if (free) thing(kind === 'tree' ? 'Árvore' : 'Ipê florido', kind === 'tree' ? 'Sombra boa pra live. O sinal do 4G é que não ajuda.' : 'Ipê florido. Quando floresce, São Paulo inteira para pra tirar foto.', x, y, 1, 1, g => tree(g, x * T, y * T, kind));
  }
}

// Leste e sul da cidade: Liberdade, Mercadão, Augusta, 25 de Março, Pacaembu, baile, Interlagos, Vila Madalena, zoo e represa
function buildEast() {
  thing('Lojinhas da Liberdade', 'Bairro da Liberdade. Lanterninha vermelha, mangá, lámen e takoyaki. O XET jura que é tudo baratinho.', 64, 0, 16, 3, g => {
    const x = 64 * T; r(g, x, 0, 256, 48, '#5a1e28');
    for (let i = 0; i < 8; i++) {
      const sx = x + i * 32; r(g, sx + 2, 8, 28, 38, ['#f2e6d0', '#ffd9a8', '#f6d0d0'][i % 3]);
      for (let k = 0; k < 28; k += 4) r(g, sx + 2 + k, 8, 2, 6, '#c0392b');
      r(g, sx + 8, 24, 16, 22, '#2f3442'); r(g, sx + 10, 26, 12, 8, '#ffe28a'); r(g, sx + 26, 16, 3, 20, '#e33b3b');
    }
    label(g, 'LIBERDADE', x + 128, 6, '#ffd84d', 6);
  });
  thing('Torii da Liberdade', 'O portal vermelho da Liberdade. Dizem que passar por baixo dá sorte na caça ao XET.', 70, 3, 5, 4, g => {
    const x = 70 * T, y = 3 * T;
    r(g, x + 2, y + 62, 12, 3, '#0003'); r(g, x + 66, y + 62, 12, 3, '#0003');
    r(g, x + 4, y + 8, 8, 56, '#d6332b'); r(g, x + 68, y + 8, 8, 56, '#d6332b'); r(g, x + 4, y + 8, 2, 56, '#ff6b5c'); r(g, x + 68, y + 8, 2, 56, '#ff6b5c');
    r(g, x - 4, y, 88, 6, '#1f1d27'); r(g, x - 2, y + 6, 84, 5, '#d6332b'); r(g, x + 2, y + 18, 76, 4, '#d6332b'); r(g, x + 36, y + 10, 8, 10, '#1f1d27');
  }, { solid: [[70, 5, 1, 2], [74, 5, 1, 2]] });
  [[66, 6], [78, 6]].forEach(([lx, ly]) => thing('Lanterna japonesa', 'Poste de lanterninhas da Liberdade. De noite fica tudo vermelho e o Cid fica com cara de filme.', lx, ly, 1, 1, g => {
    const x = lx * T, y = ly * T; r(g, x + 4, y + 14, 8, 2, '#0003'); r(g, x + 7, y - 14, 2, 30, '#5a5f6e');
    for (const [dx, dy] of [[1, -14], [9, -14], [5, -5]]) { r(g, x + dx, y + dy, 6, 7, '#e33b3b'); r(g, x + dx + 2, y + dy + 1, 2, 5, '#ffd84d'); }
  }));
  thing('Mercadão', 'Mercado Municipal. Vitral gigante, sanduíche de mortadela de 300 g e pastel de bacalhau. O Cid saiu rolando de lá.', 81, 0, 15, 6, g => {
    const x = 81 * T; r(g, x + 4, 92, 236, 4, '#0003'); r(g, x + 2, 20, 236, 74, '#d9c49a'); r(g, x + 2, 20, 236, 4, '#b89c64');
    for (const tx of [x + 2, x + 206]) { r(g, tx, 6, 32, 88, '#cdb685'); g.fillStyle = '#4f9a85'; g.beginPath(); g.arc(tx + 16, 8, 14, Math.PI, 0); g.fill(); }
    const glass = ['#e33b3b', '#ffd84d', '#3a6cd9', '#2e9b57', '#ff9f43'];
    for (let i = 0; i < 6; i++) {
      const ax = x + 42 + i * 27; r(g, ax, 44, 20, 34, '#2f3442'); g.fillStyle = '#2f3442'; g.beginPath(); g.arc(ax + 10, 44, 10, Math.PI, 0); g.fill();
      for (let k = 0; k < 6; k++) r(g, ax + 2 + (k % 3) * 6, 40 + Math.floor(k / 3) * 10, 4, 8, glass[(i + k) % 5]);
    }
    r(g, x + 60, 22, 124, 12, '#7a2430'); label(g, 'MERCADÃO', x + 122, 31, '#ffd84d', 8); r(g, x + 108, 80, 28, 14, '#3a2c22');
  });
  thing('Rua Augusta', 'Rua Augusta. Bar, karaokê e balada até de manhã. O XET sobe e desce a Augusta toda sexta.', 97, 0, 15, 4, g => {
    const x = 97 * T; r(g, x, 0, 240, 64, '#2a2236');
    [['BAR', '#ff6fa8'], ['KARAOKÊ', '#4cc3ff'], ['XET CLUB', '#3ee08f']].forEach(([t, c], i) => {
      const sx = x + i * 80; r(g, sx + 3, 6, 74, 56, ['#3b2a4f', '#2f3a52', '#3a2f2a'][i]); r(g, sx + 10, 12, 60, 14, '#0e0e10');
      label(g, t, sx + 40, 22, c, 7); r(g, sx + 28, 40, 24, 22, '#17121f'); r(g, sx + 8, 40, 14, 12, c + '55'); r(g, sx + 58, 40, 14, 12, c + '55');
    });
  });

  thing('Lojas da 25 de Março', 'Rua 25 de Março. Capinha de celular, fantasia, pisca-pisca e três milhões de pessoas no sábado.', 67, 13, 20, 2, g => {
    const x = 67 * T, y = 13 * T;
    [['TUDO R$10', '#ffd84d'], ['CAPINHAS', '#ff6fa8'], ['ATACADO', '#4cc3ff'], ['FANTASIAS', '#3ee08f'], ['BIJU', '#ff9f43']].forEach(([t, c], i) => {
      const sx = x + i * 64; r(g, sx + 1, y, 62, 32, ['#e9e4d6', '#d8d1bd'][i % 2]); r(g, sx + 4, y + 2, 56, 10, c); label(g, t, sx + 32, y + 10, '#17121f', 5);
      r(g, sx + 8, y + 16, 48, 16, '#2f3442'); for (let k = 0; k < 6; k++) r(g, sx + 11 + k * 7, y + 19, 5, 6, ['#ff5c5c', '#ffd84d', '#4cc3ff', '#3ee08f'][(k + i) % 4]);
    });
  });
  const CAMELO = ['Camelô: "Três capinha por dez, freguês!"', 'Camelô: "Pau de selfie! Pro Cid não precisa, ele já tem a action cam."', 'Camelô: "Carregador original, confia."', 'Camelô: "Óculos de sol, cinco reais! Pro careca tem desconto."'];
  for (const sy of [17, 21, 25]) for (const sx of [68, 73, 78, 83]) thing('Camelô', CAMELO[(sx + sy) % 4], sx, sy, 2, 1, g => {
    const x = sx * T, y = sy * T, c = ['#3a6cd9', '#e33b3b', '#2e9b57', '#ff9f43'][(sx + sy) % 4];
    r(g, x + 2, y + 12, 30, 4, '#0003'); r(g, x, y - 6, 32, 8, c); r(g, x, y - 6, 32, 2, '#fff6'); r(g, x + 1, y + 2, 2, 12, '#888'); r(g, x + 29, y + 2, 2, 12, '#888'); r(g, x + 3, y + 6, 26, 7, '#c88a43');
    for (let k = 0; k < 6; k++) r(g, x + 4 + k * 4, y + 3, 3, 4, ['#ff6fa8', '#ffd84d', '#4cc3ff', '#efeff1', '#3ee08f'][(k + sx) % 5]);
  });
  thing('Estádio do Pacaembu', 'Estádio do Pacaembu. Arquibancada de concreto, Museu do Futebol e eco de torcida desde 1940.', 92, 14, 18, 13, g => {
    const cx = 101 * T, cy = 20 * T + 8;
    g.fillStyle = '#0003'; g.beginPath(); g.ellipse(cx + 4, cy + 6, 144, 100, 0, 0, 7); g.fill();
    g.fillStyle = '#b8b09a'; g.beginPath(); g.ellipse(cx, cy, 143, 100, 0, 0, 7); g.fill();
    ['#efeff1', '#3a3a44', '#efeff1', '#3a3a44', '#d8d1bd'].forEach((c, i) => { g.fillStyle = c; g.beginPath(); g.ellipse(cx, cy, 134 - i * 8, 92 - i * 7, 0, 0, 7); g.fill(); });
    r(g, cx - 84, cy - 50, 168, 100, '#3f9b4c'); for (let i = 0; i < 168; i += 24) r(g, cx - 84 + i, cy - 50, 12, 100, '#4caf50');
    g.strokeStyle = '#fff'; g.lineWidth = 1.5; g.strokeRect(cx - 80, cy - 46, 160, 92); g.beginPath(); g.moveTo(cx, cy - 46); g.lineTo(cx, cy + 46); g.stroke();
    g.beginPath(); g.arc(cx, cy, 14, 0, 7); g.stroke(); g.strokeRect(cx - 80, cy - 20, 22, 40); g.strokeRect(cx + 58, cy - 20, 22, 40);
    r(g, cx - 64, cy + 72, 128, 26, '#d8c08a'); for (let i = 0; i < 7; i++) r(g, cx - 58 + i * 18, cy + 82, 10, 16, '#3a2c22'); label(g, 'PACAEMBU', cx, cy + 80, '#2a2833', 7);
  });
  scatterTrees(90, 13, 22, 14, 40, ['tree', 'ipeA', 'tree'], 91);

  thing('Paredão do baile', 'Paredão de som do baile funk. Quando liga, o grave mexe até a XETDEX. Tutz tutz.', 67, 39, 8, 2, g => {
    const x = 67 * T, y = 39 * T; r(g, x, y, 128, 32, '#17121f');
    for (let i = 0; i < 8; i++) for (let j = 0; j < 2; j++) { const sx = x + i * 16 + 8, sy = y + j * 16 + 8; g.fillStyle = '#4a4f5a'; g.beginPath(); g.arc(sx, sy, 6, 0, 7); g.fill(); g.fillStyle = '#17121f'; g.beginPath(); g.arc(sx, sy, 2.5, 0, 7); g.fill(); }
    for (let i = 0; i < 32; i++) r(g, x + i * 4, y - 3, 3, 3, ['#ff6fa8', '#9147ff', '#4cc3ff', '#3ee08f', '#ffd84d'][i % 5]);
  });
  things.push({ draw: g => { for (let j = 41; j <= 43; j++) for (let i = 66; i <= 76; i++) r(g, i * T + 1, j * T + 1, 14, 14, ['#9147ff', '#ff6fa8', '#4cc3ff', '#ffd84d'][(i + j) % 4] + '55'); } });
  [[65, 40], [77, 40]].forEach(([lx, ly]) => thing('Poste de LED', 'Poste com LED colorido piscando no ritmo do tamborzão.', lx, ly, 1, 1, g => { const x = lx * T, y = ly * T; r(g, x + 7, y - 10, 2, 26, '#5a5f6e'); r(g, x + 3, y - 14, 10, 5, '#ff6fa8'); r(g, x + 4, y - 13, 8, 3, '#ffd1e6'); }));
  thing('Bar do Zé', 'Bar do Zé. Cerveja trincando, torresmo e jogo na TV. A comanda do Cid ainda tá pendurada no balcão... por isso o XET grita "caloteiro".', 82, 39, 6, 3, g => {
    const x = 82 * T, y = 39 * T; r(g, x + 2, y + 44, 92, 4, '#0003'); r(g, x, y + 8, 96, 40, '#ffd84d'); r(g, x, y + 4, 96, 6, '#2e9b57'); for (let i = 0; i < 96; i += 8) r(g, x + i, y + 10, 4, 4, '#2e9b57');
    r(g, x + 20, y + 16, 56, 10, '#e33b3b'); label(g, 'BAR DO ZÉ', x + 48, y + 24, '#fff', 6); r(g, x + 8, y + 30, 30, 18, '#3a2c22'); r(g, x + 58, y + 30, 30, 18, '#3a2c22'); r(g, x + 62, y + 32, 8, 6, '#9fd47a');
  });
  thing('Lava-rápido', 'Lava-rápido do Tião. Lava, encera e ainda tira o adesivo de "XET" do vidro.', 92, 39, 6, 3, g => {
    const x = 92 * T, y = 39 * T; r(g, x + 2, y + 44, 92, 4, '#0003'); r(g, x, y + 6, 96, 42, '#4cc3ff'); r(g, x, y + 6, 96, 4, '#2f6fd9'); r(g, x + 10, y + 20, 76, 28, '#2f3442'); label(g, 'LAVA RÁPIDO', x + 48, y + 17, '#fff', 6);
    r(g, x + 22, y + 32, 50, 12, '#e33b3b'); r(g, x + 30, y + 28, 32, 6, '#7fd3ff'); r(g, x + 26, y + 42, 8, 6, '#17121f'); r(g, x + 60, y + 42, 8, 6, '#17121f');
  });
  thing('Churrasquinho', '"É de frango, juro!" — o churrasqueiro_eder deu cinco estrelas.', 101, 41, 1, 1, g => { const x = 101 * T, y = 41 * T; r(g, x + 1, y + 6, 14, 6, '#555'); r(g, x + 2, y + 4, 12, 3, '#ff5c5c'); for (let k = 0; k < 4; k++) r(g, x + 3 + k * 3, y + 1, 1, 6, '#c88a43'); r(g, x + 3, y + 12, 2, 4, '#333'); r(g, x + 11, y + 12, 2, 4, '#333'); });
  [[104, '#bf94ff'], [108, '#3ee08f']].forEach(([hx, c]) => thing('Casa da quebrada', 'Casa com laje, varal e caixa d\'água azul. Tem churrasco marcado pra domingo.', hx, 39, 3, 3, g => houseDraw(g, hx * T, 39 * T, c)));

  thing('Arquibancada de Interlagos', 'Arquibancada do autódromo de Interlagos. Dia de corrida aqui é barulho, chuva e sanduíche de pernil.', 4, 48, 30, 2, g => {
    const x = 4 * T, y = 48 * T; r(g, x, y, 480, 32, '#5a5f6e');
    for (let j = 0; j < 4; j++) for (let i = 0; i < 478; i += 6) r(g, x + i + (j % 2) * 2, y + 4 + j * 7, 4, 4, ['#e33b3b', '#ffd84d', '#4cc3ff', '#3ee08f', '#efeff1', '#ff6fa8'][h2(i, j) % 6]);
    r(g, x + 196, y - 4, 88, 10, '#17121f'); label(g, 'INTERLAGOS', x + 240, y + 4, '#ffd84d', 7);
  });
  thing('Boxes', 'Boxes do autódromo. O pit stop do Cid dura 40 minutos porque ele para pra comer pastel.', 12, 55, 14, 2, g => { const x = 12 * T, y = 55 * T; r(g, x, y, 224, 32, '#d8d1bd'); r(g, x, y, 224, 7, '#e33b3b'); for (let i = 0; i < 7; i++) r(g, x + 6 + i * 31, y + 12, 24, 20, '#2f3442'); label(g, 'BOXES', x + 112, y + 6, '#fff', 5); });
  [[10, 51, '#e33b3b'], [25, 72, '#4cc3ff']].forEach(([cx, cy, c]) => thing('Carro de corrida', 'Carro de corrida parado no meio da pista. O Megatron_de_Palio_97 jura que é mais rápido.', cx, cy, 2, 1, g => {
    const x = cx * T, y = cy * T; r(g, x + 2, y + 12, 28, 3, '#0003'); r(g, x + 4, y + 5, 24, 6, c); r(g, x + 1, y + 6, 4, 4, c); r(g, x + 26, y + 4, 5, 8, '#17121f'); r(g, x + 13, y + 3, 6, 4, '#17121f');
    for (const wx of [6, 21]) { r(g, x + wx, y + 10, 5, 5, '#17121f'); r(g, x + wx, y + 1, 5, 4, '#17121f'); }
  }));
  things.push({ draw: g => {
    const kerb = (x, y, w, h) => { for (let i = 0; i < Math.max(w, h); i += 4) r(g, x + (w > h ? i : 0), y + (w > h ? 0 : i), w > h ? 4 : w, w > h ? h : 4, (i / 4) % 2 ? '#fff' : '#e33b3b'); };
    kerb(3 * T, 50 * T, 33 * T, 3); kerb(3 * T, 74 * T - 3, 33 * T, 3); kerb(3 * T, 50 * T, 3, 24 * T); kerb(36 * T - 3, 50 * T, 3, 24 * T);
    kerb(6 * T - 3, 53 * T - 3, 27 * T + 6, 3); kerb(6 * T - 3, 71 * T, 27 * T + 6, 3); kerb(6 * T - 3, 53 * T, 3, 18 * T); kerb(33 * T, 53 * T, 3, 18 * T);
    for (let j = 0; j < 3 * T; j += 4) for (let i = 0; i < 8; i += 4) r(g, 20 * T + i, 50 * T + j, 4, 4, ((i + j) / 4) % 2 ? '#fff' : '#17121f');
  } });
  scatterTrees(6, 53, 27, 18, 30, ['tree', 'ipeR', 'tree'], 52);

  const BARES = ['Boteco da Vila. Mesa na calçada, petisco e samba de roda às quintas.', 'Bar do Seu Jorge. Coxinha de costela que justifica a fila.', 'Cachaçaria. 300 rótulos e nenhum com o nome do XET (ainda).', 'Bar do karaokê. O Cid já cantou "Evidências" aqui e ninguém esqueceu.', 'Pé-sujo gourmet. Pé-sujo, mas a cerveja custa R$ 25.'];
  [43, 49, 55, 61, 67].forEach((bx, i) => thing('Bar da Vila Madalena', BARES[i], bx, 48, 5, 3, g => {
    const x = bx * T, y = 48 * T, c = ['#ff6fa8', '#ffd84d', '#3ee08f', '#4cc3ff', '#ff9f43'][i];
    r(g, x + 2, y + 44, 76, 4, '#0003'); r(g, x, y + 4, 80, 44, c); r(g, x, y + 4, 80, 4, '#0003'); for (let k = 0; k < 80; k += 8) r(g, x + k, y + 20, 8, 5, k % 16 ? '#fff' : '#17121f');
    r(g, x + 8, y + 28, 20, 20, '#3a2c22'); r(g, x + 36, y + 28, 36, 14, '#2f3442'); r(g, x + 38, y + 30, 32, 4, '#ffe28a');
    g.font = 'bold 9px "Rubik Wet Paint","Permanent Marker",sans-serif'; g.fillStyle = '#17121f'; g.textAlign = 'center'; g.fillText(['BOTECO', 'SEU JORGE', 'CACHAÇA', 'KARAOKÊ', 'PÉ-SUJO'][i], x + 40, y + 16); g.textAlign = 'left';
  }));
  const MESAS = ['Mesa de bar com balde de cerveja e porção de calabresa acebolada.', 'Mesa de plástico amarela. Patrimônio cultural paulistano.', 'Alguém deixou um pastel pela metade aqui. Suspeito: PastelDeVento.'];
  [[45, 53], [50, 56], [55, 53], [60, 57], [65, 54], [69, 58], [46, 60], [58, 61], [52, 59], [64, 61]].forEach(([tx, ty], i) => thing('Mesa de bar', MESAS[i % 3], tx, ty, 1, 1, g => {
    const x = tx * T, y = ty * T; r(g, x + 2, y + 12, 13, 3, '#0003'); r(g, x + 2, y + 5, 12, 3, '#ffd84d'); r(g, x + 3, y + 8, 2, 6, '#c9a50f'); r(g, x + 11, y + 8, 2, 6, '#c9a50f'); r(g, x + 5, y + 1, 3, 4, '#d9a441'); r(g, x + 9, y + 2, 3, 3, '#fff');
  }));

  const pen = (name, text, px, py, w, h, ground, animals) => thing(name, text, px, py, w, h, g => {
    const x = px * T, y = py * T, pw = w * T, ph = h * T; r(g, x, y, pw, ph, ground); animals(g, x, y, pw, ph);
    r(g, x, y, pw, 2, '#8a5824'); r(g, x, y + ph - 2, pw, 2, '#8a5824'); r(g, x, y, 2, ph, '#8a5824'); r(g, x + pw - 2, y, 2, ph, '#8a5824');
    for (let i = 0; i < pw; i += 8) r(g, x + i, y + ph - 8, 2, 8, '#7a5022');
  });
  pen('Recinto das capivaras', 'Capivaras no zoológico. As maiores roedoras do mundo e as mais tranquilas de SP. A Capivara_Capoeirista é prima delas.', 44, 64, 10, 4, '#78c35a', (g, x, y) => {
    g.fillStyle = '#3a8fd9'; g.beginPath(); g.ellipse(x + 110, y + 34, 36, 18, 0, 0, 7); g.fill();
    for (const [ax, ay] of [[20, 20], [50, 34], [70, 18]]) { r(g, x + ax, y + ay, 14, 8, '#8a5a32'); r(g, x + ax + 11, y + ay - 3, 7, 6, '#7a4a26'); r(g, x + ax + 15, y + ay - 1, 1, 1, '#17121f'); r(g, x + ax + 2, y + ay + 8, 2, 3, '#5a361b'); r(g, x + ax + 10, y + ay + 8, 2, 3, '#5a361b'); }
  });
  pen('Recinto dos macacos', 'Macacos. O MamacoDoArtico jura que veio daqui. O mamacopelado nega tudo.', 58, 64, 10, 4, '#5aa548', (g, x, y) => {
    tree(g, x + 30, y + 14, 'tree'); tree(g, x + 110, y + 18, 'tree');
    for (const [ax, ay] of [[60, 30], [86, 22], [40, 40]]) { r(g, x + ax, y + ay, 6, 7, '#7a4a26'); r(g, x + ax + 1, y + ay - 5, 5, 5, '#7a4a26'); r(g, x + ax + 2, y + ay - 4, 3, 3, '#e8ad7f'); r(g, x + ax + 6, y + ay + 2, 4, 1, '#7a4a26'); r(g, x + ax + 9, y + ay - 2, 1, 4, '#7a4a26'); }
  });
  pen('Recinto da girafa', 'Girafa. Lá de cima ela vê o Cid chegando a três quarteirões.', 44, 70, 10, 5, '#d8c08a', (g, x, y) => {
    for (const [ax, ay] of [[40, 50], [100, 56]]) { r(g, x + ax, y + ay - 14, 18, 10, '#f2c34a'); r(g, x + ax + 13, y + ay - 40, 5, 28, '#f2c34a'); r(g, x + ax + 12, y + ay - 44, 10, 6, '#f2c34a'); for (const [sx, sy] of [[3, -12], [9, -10], [14, -24], [14, -34], [6, -8]]) r(g, x + ax + sx, y + ay + sy, 3, 3, '#b27341'); r(g, x + ax + 1, y + ay - 4, 2, 8, '#d9a441'); r(g, x + ax + 14, y + ay - 4, 2, 8, '#d9a441'); }
  });
  pen('Lago dos flamingos', 'Flamingos. Ficam numa perna só esperando o XET passar.', 58, 70, 12, 5, '#78c35a', (g, x, y) => {
    g.fillStyle = '#7cc4ff'; g.beginPath(); g.ellipse(x + 96, y + 44, 70, 22, 0, 0, 7); g.fill();
    for (const [ax, ay] of [[60, 40], [90, 34], [120, 44], [146, 38]]) { r(g, x + ax, y + ay - 10, 8, 6, '#ff8ac2'); r(g, x + ax + 6, y + ay - 20, 2, 10, '#ff8ac2'); r(g, x + ax + 6, y + ay - 22, 5, 3, '#ff8ac2'); r(g, x + ax + 10, y + ay - 21, 2, 2, '#17121f'); r(g, x + ax + 3, y + ay - 4, 1, 10, '#e05a9a'); }
  });
  scatterTrees(42, 63, 30, 13, 26, ['tree', 'ipeB'], 63);

  thing('Represa Guarapiranga', 'Prainha da represa. Não tem mar, mas tem farofa, cooler, caixinha de som e jet ski alugado.', 84, 53, 1, 1, () => {}, { solid: false });
  const rep = INFO.length - 1; for (let y = 53; y < MH; y++) for (let x = 84; x < MW; x++) if (tiles[ix(x, y)] === LAKE) owner[ix(x, y)] = rep;
  const SOL = ['Guarda-sol com cooler do lado. "Aceita uma latinha, Cid?"', 'Família inteira na farofa. A tia já ofereceu frango assado pro XET.', 'Caixinha de som tocando tamborzão lo-fi. Vapo vapo vapo.'];
  [[77, 51], [80, 55], [78, 60], [82, 64], [77, 69], [81, 73], [90, 50], [97, 49], [104, 50], [109, 49]].forEach(([ux, uy], i) => thing('Guarda-sol', SOL[i % 3], ux, uy, 1, 1, g => {
    const x = ux * T, y = uy * T; r(g, x + 3, y + 13, 12, 3, '#0002'); r(g, x + 7, y + 2, 2, 13, '#efeff1');
    g.fillStyle = ['#e33b3b', '#ffd84d', '#4cc3ff', '#ff6fa8', '#3ee08f'][i % 5]; g.beginPath(); g.ellipse(x + 8, y + 3, 9, 6, 0, Math.PI, 0); g.fill(); r(g, x + 10, y + 10, 5, 4, '#3a6cd9');
  }));
  thing('Barraca de milho', 'Milho cozido com manteiga e sal. O RafonhaDasPamonha mandou um abraço.', 86, 49, 1, 1, g => { const x = 86 * T, y = 49 * T; r(g, x + 1, y + 5, 14, 8, '#ffd84d'); r(g, x + 1, y + 5, 14, 2, '#2e9b57'); r(g, x + 4, y + 13, 3, 3, '#222'); r(g, x + 10, y + 13, 3, 3, '#222'); r(g, x + 5, y, 6, 5, '#f2c34a'); });
  things.push({ draw: g => {
    [[92, 58], [100, 64], [96, 70], [106, 57]].forEach(([bx, by], i) => { const x = bx * T, y = by * T; r(g, x + 2, y + 13, 18, 2, '#0003'); r(g, x, y + 8, 22, 5, i % 2 ? '#efeff1' : '#e33b3b'); r(g, x + 9, y - 6, 2, 14, '#8a6a3c'); g.fillStyle = '#fff'; g.beginPath(); g.moveTo(x + 11, y - 6); g.lineTo(x + 20, y + 6); g.lineTo(x + 11, y + 6); g.fill(); });
    r(g, 103 * T, 69 * T + 6, 12, 5, '#ffd84d'); r(g, 103 * T + 4, 69 * T + 2, 3, 4, '#17121f'); r(g, 103 * T - 10, 69 * T + 9, 10, 1, '#b7e2ff');
  } });
}

function lixeira(g, x, y) { r(g, x + 4, y + 13, 9, 3, '#0003'); r(g, x + 4, y + 4, 8, 10, '#ff8c1a'); r(g, x + 4, y + 4, 8, 2, '#ffb05a'); r(g, x + 7, y + 8, 2, 4, '#c25e00'); r(g, x + 7, y + 13, 2, 3, '#555'); }
function orelhao(g, x, y) { r(g, x + 4, y + 14, 9, 2, '#0003'); r(g, x + 7, y + 4, 2, 12, '#666'); g.fillStyle = '#ff8c1a'; g.beginPath(); g.ellipse(x + 8, y + 4, 7, 8, 0, Math.PI, 0); g.fill(); r(g, x + 1, y + 4, 14, 2, '#ff8c1a'); r(g, x + 6, y + 2, 4, 5, '#4cc3ff'); }
function bench(g, x, y) { r(g, x + 2, y + 6, 28, 3, '#9c6a3c'); r(g, x + 2, y + 10, 28, 3, '#b27f4a'); r(g, x + 4, y + 13, 2, 3, '#444'); r(g, x + 26, y + 13, 2, 3, '#444'); }

function paintWorld() {
  const g = bg.getContext('2d'), f = fg.getContext('2d');
  for (let y = 0; y < MH; y++) for (let x = 0; x < MW; x++) drawTile(g, x, y);
  // Faixas da Paulista, ciclovia, Marginal e faixas de pedestre
  for (let x = 0; x < MW * T; x += 16) { r(g, x, 10 * T, 16, 1, '#ffd84d'); r(g, x, 11 * T - 1, 16, 1, '#ffd84d'); if ((x / 16) % 4 === 1) { r(g, x + 4, 10 * T + 6, 8, 1, '#fff'); r(g, x + 5, 10 * T + 8, 2, 2, '#fff'); r(g, x + 10, 10 * T + 8, 2, 2, '#fff'); } }
  for (let x = 0; x < MW * T; x += 24) r(g, x, 32 * T - 1, 12, 2, '#fff');
  for (let y = 13 * T; y < 31 * T; y += 24) for (const cx of [15, 39, 65, 88]) r(g, cx * T - 1, y, 2, 12, '#ffd84d');
  for (let y = 47 * T; y < MH * T; y += 24) for (const cx of [41, 73]) r(g, cx * T - 1, y, 2, 12, '#ffd84d');
  for (let x = 0; x < MW * T; x += 24) if (x < 40 * T || x > 42 * T) r(g, x, 46 * T - 1, 12, 2, '#fff');
  for (const cx of [14, 38]) for (let y = 9 * T; y < 12 * T; y += 1) if ((y % 6) < 3) r(g, cx * T - 2, y, 36, 1, '#f2f2f2');
  for (const cx of [14, 38]) for (let x = cx * T; x < cx * T + 32; x++) if ((x % 6) < 3) r(g, x, 31 * T + 1, 1, 30, '#f2f2f2');
  label(g, 'AV. PAULISTA', 8 * T, 9 * T + 11, '#ffffff99', 7); label(g, 'AV. PAULISTA', 50 * T, 11 * T + 11, '#ffffff99', 7);
  label(g, 'MARGINAL', 54 * T, 31 * T + 11, '#ffffff99', 7); label(g, 'AV. PAULISTA', 90 * T, 9 * T + 11, '#ffffff99', 7); label(g, 'AV. DOS BANDEIRANTES', 56 * T, 45 * T + 11, '#ffffff99', 7);
  // Estrela da capital no mapa do calçadão
  const sx = SPX + SPW * .7, sy = SPY + SPH * .68; g.fillStyle = '#e33b3b'; g.beginPath();
  for (let k = 0; k < 10; k++) { const a = -Math.PI / 2 + k * Math.PI / 5, rr = k % 2 ? 3 : 7; g.lineTo(sx + Math.cos(a) * rr, sy + Math.sin(a) * rr); } g.fill();
  label(g, 'SP', SPX + SPW * .38, SPY + SPH * .55, '#ffffff', 10);
  for (const t of things) t.draw(t.fg ? f : g);
}
buildWorld(); paintWorld();

// mini mapa pré-renderizado
const mini = document.createElement('canvas'); mini.width = MW * 2; mini.height = MH * 2;
(() => { const g = mini.getContext('2d'); const col = { [G]: '#5aa548', [TG]: '#2c7a3a', [R]: '#4b4a57', [W]: '#b8b0a2', [M]: '#e4e0d4', [SPM]: '#9a98a2', [P]: '#e3cd92', [WA]: '#4f8478', [BR]: '#ffd84d', [D]: '#c98b52', [LAKE]: '#3a8fd9', [CYC]: '#b43a3a' };
  for (let y = 0; y < MH; y++) for (let x = 0; x < MW; x++) { const i = ix(x, y); g.fillStyle = solid[i] && owner[i] >= 0 && tiles[i] !== LAKE ? '#7d6b9a' : col[tiles[i]]; g.fillRect(x * 2, y * 2, 2, 2); } })();

// ---------------------------------------------------------------- sprites
const CID_PAL = { k: '#17121f', h: '#231c2b', g: '#6f6a7c', s: '#e8ad7f', d: '#c4835a', b: '#3a2c30', B: '#6b5e66', w: '#ffffff', t: '#1f1d27', T: '#36334a', p: '#c88a43', P: '#8a5824', n: '#56607e', o: '#f4f4f4', O: '#a0a3ab', c: '#c2c7cf', C: '#4c515b', r: '#ff3355', L: '#7fd3ff' };
const CID = {
  down: ["......k.k.k.....", ".....khkhkhk....", "....khhhhghhk...", "...khhghhhhhhk..", "...khhhhhhghhk..", "...khhsssssshk..", "...kshhssshhsk..", "..kssskssskssk..", "..ksssssdsssssk.", "...kbsbbbbbsbkkk", "...kbbbwwwbbbkLk", "...kbbBbbbBbbkrk", "....kbbbBbbbk.C.", "..kTtptttttptTC.", ".kstpttTTttptsC.", ".kstpttttttptsk.", ".kssttttttttssk.", "..kknnnnnnnnkk..", "...knnnnnnnnk...", "...knnnkknnnk..."],
  up: ["......k.k.k.....", ".....khkhkhk....", "....khhhhghhk...", "...khhghhhhhhk..", "...khhhhhhghhk..", "...khhhhhghhhk..", "...khhghhhhhhk..", "..kshhhhhhhhhsk.", "..kshhhhghhhhkkk", "...kbhhhhhhhbkck", "...kbbhhhhhbbkck", "...kbbbsssbbbkC.", "....kbbsssbbk.C.", "..kttPPPPPPPttC.", ".kstPppppppPtsk.", ".kstPpPPPPpPtsk.", ".kssPppppppPssk.", "..kkPPPPPPPPkk..", "...knnnnnnnnk...", "...knnnkknnnk..."],
  left: [".......k.k.k....", "......khkhkhk...", ".....khhhhghhk..", "....khhghhhhhhk.", "...khhhhhhhghhk.", "....khsssshhhhk.", "....kshhsshhhk..", "...ksskssssshk..", "..ksssssssshhk..", "...kbbbbbbbbbk..", "...kbwwbbbbbbk..", "kkk.kbbbBbbbk...", "Lck..kbbbbbkk...", "krk.ktttttPPk...", "..CsttTtttPpPk..", "...ktssttttPpPk.", "...kssktttPPPk..", "....knnnnnnnk...", "....knnnnnnnk...", ".....knnnnnk...."]
};
const CID_LEGS = {
  down: [["....ksskkssk....", "....ksk..ksk....", "...kook..kook...", "...kOOk..kOOk..."], ["....ksskkssk....", "...kook..ksk....", "...kOOk..kook...", "........kOOk...."], ["....ksskkssk....", "....ksk..kook...", "...kook..kOOk...", "...kOOk........."]],
  up: [["....ksskkssk....", "....ksk..ksk....", "...kOOk..kOOk...", "...kOOk..kOOk..."], ["....ksskkssk....", "...kOOk..ksk....", "...kOOk..kOOk...", "........kOOk...."], ["....ksskkssk....", "....ksk..kOOk...", "...kOOk..kOOk...", "...kOOk........."]],
  left: [[".....kssssk.....", ".....kskksk.....", "....kookook.....", "....kOOkOOk....."], ["....kssk.ssk....", "...ksk...kssk...", "..kook....kook..", "..kOOk....kOOk.."], [".....kssssk.....", ".....kskksk.....", "....kookook.....", "....kOOkOOk....."]]
};
const NPC_GRID = {
  down: ["......kkkk......", ".....kHHHHk.....", "....kHHHHHHk....", "....kHHHHHHk....", "....kHSSSSHk....", "....kSkSSkSk....", "....kSSSSSSk....", ".....kSSSSk.....", "....kAAAAAAk....", "...kAAAaaAAAk...", "...kSAAAAAASk...", "...kSAAAAAASk...", "....kkQQQQkk....", "....kQQQQQQk....", "....kQQkkQQk....", "....kQk..kQk....", "....kFk..kFk...."],
  up: ["......kkkk......", ".....kHHHHk.....", "....kHHHHHHk....", "....kHHHHHHk....", "....kHHHHHHk....", "....kHHHHHHk....", "....kSHHHHSk....", ".....kSSSSk.....", "....kAAAAAAk....", "...kAAaaaaAAk...", "...kSAAAAAASk...", "...kSAAAAAASk...", "....kkQQQQkk....", "....kQQQQQQk....", "....kQQkkQQk....", "....kQk..kQk....", "....kFk..kFk...."],
  left: ["......kkkk......", ".....kHHHHk.....", "....kHHHHHHk....", "....kHHHHHHk....", "....kSSSHHHk....", "...kSkSSSHHk....", "....kSSSSSSk....", ".....kSSSSk.....", ".....kAAAAk.....", "....kAAaAAk.....", "....kASSAAk.....", "....kASSAAk.....", ".....kQQQk......", ".....kQQQk......", ".....kQkQk......", ".....kQkQk......", ".....kFkFk......"]
};
function gridCanvas(rows, pal, flip = false) {
  const c = document.createElement('canvas'); c.width = 16; c.height = rows.length; const g = c.getContext('2d');
  rows.forEach((row, y) => [...row].forEach((ch, x) => { if (pal[ch]) { g.fillStyle = pal[ch]; g.fillRect(flip ? 15 - x : x, y, 1, 1); } }));
  return c;
}
const cidSprites = {};
for (const dir of ['down', 'up', 'left']) cidSprites[dir] = CID_LEGS[dir].map(legs => gridCanvas([...CID[dir], ...legs], CID_PAL));
cidSprites.right = CID_LEGS.left.map(legs => gridCanvas([...CID.left, ...legs], CID_PAL, true));

const SKINS = ['#f2c39b', '#e8ad7f', '#c98a5e', '#9c6440', '#6e4428', '#ffd9b8'];
const HAIRS = ['#231c2b', '#5a3a22', '#c99b4f', '#e33b3b', '#9147ff', '#3ee08f', '#efeff1', '#ff6fa8', '#4cc3ff'];
function npcSprites(name, cat) {
  const h = hashStr(name), skin = SKINS[h % SKINS.length], bald = cat === 'calvo';
  const shirt = colorOf(name);
  const pal = { k: '#17121f', H: bald ? skin : HAIRS[(h >> 4) % HAIRS.length], S: skin, A: shirt, a: '#0004', Q: ['#3e4560', '#2a2833', '#5a3a22', '#56607e', '#1f6f43'][(h >> 8) % 5], F: ['#f4f4f4', '#ff5c5c', '#17121f', '#ffd84d'][(h >> 11) % 4] };
  const out = { down: gridCanvas(NPC_GRID.down, pal), up: gridCanvas(NPC_GRID.up, pal), left: gridCanvas(NPC_GRID.left, pal), right: gridCanvas(NPC_GRID.left, pal, true) };
  out.pal = pal;
  if (bald) for (const k of ['down', 'up', 'left', 'right']) { const g = out[k].getContext('2d'); g.fillStyle = '#ffffffcc'; g.fillRect(k === 'right' ? 9 : 6, 2, 2, 1); }
  return out;
}

// ---------------------------------------------------------------- entidades
const DIRS = { up: [0, -1], down: [0, 1], left: [-1, 0], right: [1, 0] };
const START = { x: 22, y: 6 };
const player = { tx: START.x, ty: START.y, x: START.x * T, y: START.y * T, dir: 'down', moving: false, fx: 0, fy: 0, prog: 0, step: 0, turnT: 0, bump: 0 };
let npcs = [], npcAt = new Map(), target = null;

function reachable() {
  const seen = new Uint8Array(MW * MH), q = [ix(START.x, START.y)]; seen[q[0]] = 1;
  while (q.length) { const i = q.pop(), x = i % MW, y = (i / MW) | 0; for (const [dx, dy] of Object.values(DIRS)) { const nx = x + dx, ny = y + dy; if (!inMap(nx, ny)) continue; const j = ix(nx, ny); if (!seen[j] && !solid[j]) { seen[j] = 1; q.push(j); } } }
  return seen;
}
const REACH = reachable();
const CANDIDATES = (() => {
  const out = [];
  for (let y = 0; y < MH; y++) for (let x = 0; x < MW; x++) {
    const i = ix(x, y), t = tiles[i];
    if (!REACH[i] || [R, CYC, TG, BR, WA, LAKE].includes(t)) continue;
    if (Math.abs(x - START.x) + Math.abs(y - START.y) < 4) continue;
    const open = (a, b) => inMap(a, b) && !solid[ix(a, b)];
    if ((!open(x - 1, y) && !open(x + 1, y)) || (!open(x, y - 1) && !open(x, y + 1))) continue;
    if (!open(x, y + 1) && !open(x, y - 1)) continue;
    out.push([x, y]);
  }
  return out;
})();

const LAUGHS = ['🤭', '😂', '🤣', '😆', '😹'];
function rebuildNPCs() {
  const rand = rng(hashStr(state.names.join('|')));
  // Amostragem do ponto mais distante: cada XET nasce longe dos outros e espalhado pela cidade.
  const far = new Float32Array(MW * MH).fill(99), taken = new Set();
  npcs = []; npcAt = new Map();
  for (const name of state.names) {
    let best = null, bestD = -1;
    for (let k = 0; k < 80; k++) {
      const c = CANDIDATES[Math.floor(rand() * CANDIDATES.length)]; if (!c) break;
      const i = ix(c[0], c[1]); if (taken.has(i)) continue;
      const d = far[i] + rand() * .5; if (d > bestD) { bestD = d; best = c; }
    }
    if (!best) best = CANDIDATES.find(([x, y]) => !taken.has(ix(x, y))) || [START.x + 1, START.y];
    const [x, y] = best; taken.add(ix(x, y));
    for (let dy = -14; dy <= 14; dy++) for (let dx = -14; dx <= 14; dx++) if (inMap(x + dx, y + dy)) { const j = ix(x + dx, y + dy); far[j] = Math.min(far[j], Math.max(Math.abs(dx), Math.abs(dy))); }
    const cat = catOf(name), tr = rand();
    npcs.push({ name, cat, tx: x, ty: y, hx: x, hy: y, x: x * T, y: y * T, dir: pick(['down', 'left', 'right', 'up']), sprites: null, next: 1 + rand() * 5, moving: false, prog: 0, fx: 0, fy: 0, bubble: null,
      district: districtAt(x, y), wander: rand() < .35, state: 'idle', chases: 0, stamina: 0, restT: 0, seen: false, taunting: false,
      taunt: tr < .3 ? 'CALOTEIRO!' : tr < .6 ? 'CARECA!' : LAUGHS[Math.floor(rand() * LAUGHS.length)] });
  }
  refreshNpcGrid();
  if (target && !npcs.includes(target)) target = null;
  updateAll();
}
function refreshNpcGrid() { npcAt = new Map(); for (const n of npcs) if (!isCaught(n.name)) { npcAt.set(ix(n.tx, n.ty), n); if (n.moving) npcAt.set(ix(n.tx + n.fx, n.ty + n.fy), n); } }
const liveNPCs = () => npcs.filter(n => !isCaught(n.name));

// trânsito: carros, ônibus, motoboy e ciclista
const LANES = [{ row: 9, dir: 1, speed: 38 }, { row: 11, dir: -1, speed: 34 }, { row: 10, dir: 1, speed: 22 }, { row: 31, dir: 1, speed: 46 }, { row: 32, dir: -1, speed: 42 }, { row: 45, dir: 1, speed: 44 }, { row: 46, dir: -1, speed: 40 }];
const vehicles = [];
[[0, 'car', '#e33b3b', 80], [0, 'bus', '#2e9b57', 520], [1, 'car', '#4cc3ff', 300], [1, 'moto', '#ff8c1a', 760], [1, 'car', '#efeff1', 100], [2, 'bike', '#ff8c1a', 200], [3, 'car', '#ffd84d', 120], [3, 'car', '#9147ff', 600], [4, 'bus', '#3a6cd9', 360], [4, 'car', '#2a2833', 900], [0, 'car', '#ff6fa8', 1300], [1, 'bus', '#e33b3b', 1500], [3, 'moto', '#3ee08f', 1400], [4, 'car', '#ff9f43', 1650], [5, 'car', '#4cc3ff', 200], [5, 'bus', '#ffd84d', 900], [5, 'moto', '#ff8c1a', 1500], [6, 'car', '#efeff1', 400], [6, 'car', '#9147ff', 1200], [2, 'bike', '#3ee08f', 1100]]
  .forEach(([l, kind, color, x]) => vehicles.push({ lane: LANES[l], kind, color, x, w: { car: 26, bus: 46, moto: 14, bike: 12 }[kind], wait: 0, honk: 0 }));
function vehicleTiles(v) { return [Math.floor(v.x / T), Math.floor((v.x + v.w - 1) / T)]; }
function vehicleAt(tx, ty) { return vehicles.some(v => { if (v.lane.row !== ty) return false; const [a, b] = vehicleTiles(v); return tx >= a && tx <= b; }); }

// pombos e patos
// gatinhos de rua: miam do nada, e quando o Cid passa pertinho
const CAT_COATS = [['#ff9f43', '#c25e00'], ['#2a2833', '#17121f'], ['#efeff1', '#b8b0a2'], ['#efeff1', '#ff9f43'], ['#8d8b97', '#5d5f6f']];
const cats = [[58, 4], [77, 6], [43, 42], [52, 52], [20, 28], [9, 20], [79, 58], [37, 49], [31, 7], [100, 28], [89, 30], [64, 43]]
  .map(([x, y], i) => ({ x: x * T + 4, y: y * T + 6, coat: CAT_COATS[i % CAT_COATS.length], t: Math.random() * 9, say: 0, cool: 0 }));
let nextMeow = 12 + Math.random() * 20;
const birds = [];
[[5, 20], [8, 22], [3, 22], [20, 6], [23, 7], [25, 6], [22, 16], [26, 18], [10, 21], [72, 4], [88, 6], [90, 7], [95, 28], [100, 28], [50, 54], [62, 56]].forEach(([x, y]) => birds.push({ kind: 'pombo', hx: x * T + 6, hy: y * T + 10, x: x * T + 6, y: y * T + 10, fly: 0, vx: 0, vy: 0, t: Math.random() * 9 }));
[[53, 21], [56, 23], [54, 24], [92, 62], [99, 67], [105, 60], [64, 72]].forEach(([x, y]) => birds.push({ kind: 'pato', hx: x * T, hy: y * T, x: x * T, y: y * T, t: Math.random() * 9 }));

// ---------------------------------------------------------------- canvas
const canvas = $('#game'), ctx = canvas.getContext('2d'), mm = $('#minimap'), mctx = mm.getContext('2d');
mm.width = MW * 2; mm.height = MH * 2;
let cam = { x: 0, y: 0 }, time = 0;
// Em telas estreitas a câmera aproxima para os nomes continuarem legíveis.
function fitView() {
  const small = innerWidth < 700, w = small ? 12 : 20, h = small ? 9 : 12;
  if (w === VW && canvas.width === w * T * SC) return;
  VW = w; VH = h; canvas.width = VW * T * SC; canvas.height = VH * T * SC; canvas.style.aspectRatio = `${VW}/${VH}`;
}
addEventListener('resize', fitView); fitView();
const modes = { start: true, battle: false, dialog: false };
const busy = () => modes.start || modes.battle || modes.dialog || !!document.querySelector('dialog[open]');

function walkable(x, y, who) {
  if (!inMap(x, y) || solid[ix(x, y)]) return false;
  const n = npcAt.get(ix(x, y)); if (n && n !== who) return false;
  if (who !== player && (x === player.tx && y === player.ty || player.moving && x === player.tx + player.fx && y === player.ty + player.fy)) return false;
  if (vehicleAt(x, y)) return false;
  return true;
}

let lastDistrict = '';
function stepDone() {
  if (!modes.start) { tut.steps++; if (keys.has('shift') || keys.has('b')) tut.runSteps++; }
  const d = districtAt(player.tx, player.ty);
  if (d !== lastDistrict) { lastDistrict = d; showDistrict(DIST[d].name); }
  if (tiles[ix(player.tx, player.ty)] === TG && Math.random() < .13) {
    const pool = liveNPCs(); if (pool.length) { sfx('alert'); startBattle(pick(pool), true); }
  }
}

function update(dt) {
  time += dt;
  // trânsito sempre anda
  for (const v of vehicles) {
    const [a, b] = vehicleTiles(v), front = v.lane.dir > 0 ? b + 1 : a - 1;
    const ahead = [front, v.lane.dir > 0 ? b : a];
    if (ahead.some(tx => npcAt.has(ix(tx, v.lane.row)))) { v.wait += dt; continue; }
    const blocked = ahead.some(tx => (player.ty === v.lane.row && player.tx === tx) || (player.moving && player.ty + player.fy === v.lane.row && player.tx + player.fx === tx));
    if (blocked) { v.wait += dt; if (v.wait > .6 && time - v.honk > 4) { v.honk = time; if (Math.hypot(player.x - v.x, player.y - v.lane.row * T) < 200) { sfx('honk'); if (v.kind !== 'bike') chatSay(pick(['busao_sentido_terminal', 'motoboy_do_xet', 'Uber_Black_do_Cid']), pick(['BIBIIIII sai da frente cid', 'CID NO MEIO DA RUA KKKKK', 'o cara para o trânsito pra filmar nick']), '#ffd84d'); } } continue; }
    v.wait = 0; v.x += v.lane.dir * v.lane.speed * dt;
    if (v.x > MW * T + 60) v.x = -80; if (v.x < -80) v.x = MW * T + 60;
  }
  for (const c of cats) {
    c.t += dt; c.say -= dt; c.cool -= dt;
    if (c.cool <= 0 && Math.hypot(player.x + 8 - c.x, player.y + 8 - c.y) < 30) { c.cool = 8; catMeow(c); }
  }
  if (!modes.start && (nextMeow -= dt) <= 0) {
    nextMeow = 18 + Math.random() * 32;
    const near = cats.filter(c => Math.hypot(player.x - c.x, player.y - c.y) < 18 * T);
    catMeow(near.length ? pick(near) : pick(cats));
  }
  for (const b of birds) {
    b.t += dt;
    if (b.kind === 'pombo') {
      const dist = Math.hypot(player.x + 8 - b.x, player.y + 8 - b.y);
      if (!b.fly && dist < 26) { b.fly = 1; b.vx = (b.x > player.x ? 1 : -1) * (40 + Math.random() * 30); b.vy = -50 - Math.random() * 30; if (Math.random() < .4) sfx('flap'); }
      if (b.fly) { b.x += b.vx * dt; b.y += b.vy * dt; b.fly += dt; if (b.fly > 7 && Math.hypot(player.x - b.hx, player.y - b.hy) > 80) { b.fly = 0; b.x = b.hx; b.y = b.hy; } }
    } else { b.x = b.hx + Math.sin(b.t * .4) * 24; b.y = b.hy + Math.cos(b.t * .3) * 14; }
  }
  if (busy()) return;

  // jogador em grade, estilo RPG portátil
  const want = held();
  if (player.moving) {
    const spd = (keys.has('shift') || keys.has('b')) ? 8.5 : 5.2;
    player.prog += dt * spd; player.step += dt * spd;
    if (player.prog >= 1) {
      player.tx += player.fx; player.ty += player.fy; player.moving = false; player.prog = 0; refreshNpcGrid(); stepDone();
    }
  }
  if (!player.moving && want && !busy()) {
    if (player.dir !== want && !player.lastHeld) { player.dir = want; player.turnT = .09; }
    else if (player.turnT <= 0) {
      player.dir = want; const [dx, dy] = DIRS[want];
      const hit = npcAt.get(ix(player.tx + dx, player.ty + dy));
      if (hit && !isCaught(hit.name)) return startBattle(hit, false, true);
      if (walkable(player.tx + dx, player.ty + dy, player)) { player.moving = true; player.fx = dx; player.fy = dy; player.prog = 0; }
      else if (time - player.bump > .35) { player.bump = time; sfx('bump'); }
    }
  }
  player.lastHeld = !!want; player.turnT -= dt;
  player.x = (player.tx + (player.moving ? player.fx * player.prog : 0)) * T;
  player.y = (player.ty + (player.moving ? player.fy * player.prog : 0)) * T;

  // XETMON foge do Cid apontando e zoando; cansa a cada fuga até ser alcançado
  for (const n of npcs) {
    if (isCaught(n.name)) continue;
    const dist = Math.abs(n.tx - player.tx) + Math.abs(n.ty - player.ty);
    n.taunting = dist <= 7;
    if (n.bubble && (n.bubble.t -= dt) <= 0) n.bubble = null;
    if (n.state === 'idle' && dist <= 5) {
      n.state = 'flee'; n.stamina = Math.max(2, 9 - n.chases * 2) + Math.floor(Math.random() * 3); n.chases++;
      if (!n.seen && time > 2) { n.seen = true; sfx('spot'); if (Math.random() < .35) chatSay(n.name, n.taunt.length > 3 ? `CID ${n.taunt.replace('!', '')} KKKKKK` : 'KKKKKKKKKKK', colorOf(n.name)); }
    }
    if (n.moving) {
      n.prog += dt * (n.state === 'flee' ? 4.2 : 2.6);
      if (n.prog >= 1) {
        n.tx += n.fx; n.ty += n.fy; n.moving = false; n.prog = 0; n.district = districtAt(n.tx, n.ty); refreshNpcGrid();
        if (n.state === 'flee' && --n.stamina <= 0) { n.state = 'tired'; n.restT = 2.2 + Math.random() * 1.6; n.bubble = { text: '😮‍💨', t: 1.4 }; }
      }
    } else if (n.state === 'flee') {
      if (dist > 10) { n.state = 'idle'; n.hx = n.tx; n.hy = n.ty; }
      else {
        let best = null, bestScore = -1e9;
        for (const [dx, dy] of Object.values(DIRS)) {
          const nx = n.tx + dx, ny = n.ty + dy; if (!walkable(nx, ny, n)) continue;
          const nd = Math.abs(nx - player.tx) + Math.abs(ny - player.ty); if (nd < dist) continue;
          let exits = 0; for (const [ex, ey] of Object.values(DIRS)) if (inMap(nx + ex, ny + ey) && !solid[ix(nx + ex, ny + ey)]) exits++;
          const score = nd * 2 + exits + Math.random() * 1.5; if (score > bestScore) { bestScore = score; best = [dx, dy]; }
        }
        if (best) { n.moving = true; n.fx = best[0]; n.fy = best[1]; n.prog = 0; refreshNpcGrid(); }
        else { n.state = 'tired'; n.restT = 2.5; n.bubble = { text: '😱', t: 1.2 }; }
      }
    } else if (n.state === 'tired') {
      if ((n.restT -= dt) <= 0) { n.hx = n.tx; n.hy = n.ty; n.state = 'idle'; }
    } else if ((n.next -= dt) <= 0) {
      n.next = 2 + Math.random() * 5;
      if (!n.taunting) n.dir = pick(['down', 'left', 'right', 'up']);
      if (n.wander && !n.taunting && Math.random() < .5) {
        const [dx, dy] = DIRS[n.dir], nx = n.tx + dx, ny = n.ty + dy;
        const t = inMap(nx, ny) ? tiles[ix(nx, ny)] : R;
        if (Math.abs(nx - n.hx) <= 2 && Math.abs(ny - n.hy) <= 2 && ![R, CYC, TG, BR].includes(t) && walkable(nx, ny, n)) { n.moving = true; n.fx = dx; n.fy = dy; n.prog = 0; refreshNpcGrid(); }
      }
    }
    // olha (e aponta) pro Cid enquanto corre de costas
    if (n.taunting) { const ddx = player.tx - n.tx, ddy = player.ty - n.ty; n.dir = Math.abs(ddx) > Math.abs(ddy) ? (ddx > 0 ? 'right' : 'left') : (ddy > 0 ? 'down' : 'up'); }
    n.x = (n.tx + (n.moving ? n.fx * n.prog : 0)) * T; n.y = (n.ty + (n.moving ? n.fy * n.prog : 0)) * T;
  }
}

function facing() { const [dx, dy] = DIRS[player.dir]; return [player.tx + dx, player.ty + dy]; }
function facedNPC() { const [x, y] = facing(); const n = npcAt.get(ix(x, y)); return n && !isCaught(n.name) ? n : null; }
function adjacentNPC() {
  for (const [d, [dx, dy]] of Object.entries(DIRS)) { const n = npcAt.get(ix(player.tx + dx, player.ty + dy)); if (n && !isCaught(n.name)) return [n, d]; }
  return null;
}

function draw() {
  const viewW = VW * T, viewH = VH * T;
  cam.x = clamp(player.x + 8 - viewW / 2, 0, MW * T - viewW); cam.y = clamp(player.y + 4 - viewH / 2, 0, MH * T - viewH);
  const cx = Math.round(cam.x * SC) / SC, cy = Math.round(cam.y * SC) / SC;
  ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.imageSmoothingEnabled = false;
  ctx.drawImage(bg, cx, cy, viewW, viewH, 0, 0, canvas.width, canvas.height);
  ctx.setTransform(SC, 0, 0, SC, -cx * SC, -cy * SC);

  // brilho animado da água
  const x0 = Math.floor(cx / T), y0 = Math.floor(cy / T);
  for (let y = y0; y <= y0 + VH + 1; y++) for (let x = x0; x <= x0 + VW + 1; x++) {
    if (!inMap(x, y)) continue; const t = tiles[ix(x, y)];
    if (t === WA || t === LAKE) { const ph = (time * 1.5 + (x * 7 + y * 3) % 10) % 4; if (ph < 1.2) { ctx.fillStyle = t === LAKE ? '#b7e2ff' : '#a9cfc2'; ctx.fillRect(x * T + 3 + ((x * 5 + y) % 6), y * T + 4 + ((y * 3 + x) % 8), 4, 1); } }
  }
  // pombos e patos (chão)
  for (const b of birds) if (b.kind === 'pato' || !b.fly) drawBird(b);

  const ents = [];
  for (const n of npcs) if (!isCaught(n.name)) ents.push({ y: n.y, f: () => drawNPC(n) });
  ents.push({ y: player.y + .1, f: drawPlayer });
  for (const c of cats) ents.push({ y: c.y - 6, f: () => drawCat(c) });
  for (const v of vehicles) ents.push({ y: v.lane.row * T - 2, f: () => drawVehicle(v) });
  ents.sort((a, b) => a.y - b.y).forEach(e => e.f());
  ctx.drawImage(fg, 0, 0);
  for (const b of birds) if (b.kind === 'pombo' && b.fly) drawBird(b);

  // luz de fim de tarde roxa, igual ao banner da live
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  const grad = ctx.createLinearGradient(0, 0, 0, canvas.height); grad.addColorStop(0, '#9147ff22'); grad.addColorStop(.5, '#ff6fa800'); grad.addColorStop(1, '#0e0e1018');
  ctx.fillStyle = grad; ctx.fillRect(0, 0, canvas.width, canvas.height);

  // nomes do XET
  ctx.textBaseline = 'middle';
  for (const n of npcs) {
    if (isCaught(n.name)) continue;
    const sx = (n.x - cx) * SC + 24, sy = (n.y - cy) * SC - 30;
    if (sx < -200 || sx > canvas.width + 200 || sy < -40 || sy > canvas.height + 40) continue;
    const dist = Math.hypot(n.tx - player.tx, n.ty - player.ty);
    const showName = dist <= 4.5;
    if (showName) nameplate(n.name, sx, sy, colorOf(n.name), n === facedNPC());
    else if (!n.taunting) bubbleDots(sx, sy + 8, CATS[n.cat].color);
    if (n.taunting) { const txt = n.bubble ? n.bubble.text : n.taunt; speech(sx, showName ? sy - 16 : sy + 10, txt, txt.length > 3); continue; }
    if (n.bubble) { ctx.font = '900 20px Inter, sans-serif'; ctx.fillStyle = '#fff'; ctx.strokeStyle = '#0e0e10'; ctx.lineWidth = 5; const by = sy - 24 - (reduced ? 0 : Math.abs(Math.sin(time * 9)) * 6); ctx.textAlign = 'center'; ctx.strokeText(n.bubble.text, sx, by); ctx.fillText(n.bubble.text, sx, by); }
  }
  for (const c of cats) if (c.say > 0) { const sx = (c.x - cx + 5) * SC, sy = (c.y - cy - 8) * SC; if (sx > -60 && sx < canvas.width + 60 && sy > -40 && sy < canvas.height + 40) speech(sx, sy, c.word, true); }
  const f = facedNPC();
  if (f && !busy()) {
    const sx = (f.x - cx) * SC + 24, sy = (f.y - cy) * SC + 70;
    ctx.font = '800 13px Inter, sans-serif'; const label = 'E  FILMAR XETMON'; const w = ctx.measureText(label).width + 24;
    ctx.fillStyle = '#9147ff'; roundRect(sx - w / 2, sy - 13, w, 26, 6); ctx.fill(); ctx.fillStyle = '#fff'; ctx.textAlign = 'center'; ctx.fillText(label, sx, sy + 1);
  }
  drawTargetArrow(cx, cy);
  ctx.textAlign = 'left'; ctx.textBaseline = 'alphabetic';
  drawMinimap();
}
function roundRect(x, y, w, h, rr) { ctx.beginPath(); ctx.roundRect ? ctx.roundRect(x, y, w, h, rr) : ctx.rect(x, y, w, h); }
function speech(x, y, text, word) {
  const wob = reduced ? 0 : Math.sin(time * 8 + x) * 2;
  ctx.font = word ? '20px Bangers, Inter, sans-serif' : '22px sans-serif'; ctx.textAlign = 'center';
  const w = Math.max(36, ctx.measureText(text).width + (word ? 20 : 14)), h = word ? 30 : 34, top = y - h + wob;
  ctx.fillStyle = '#fff'; ctx.strokeStyle = '#0e0e10'; ctx.lineWidth = 3;
  roundRect(x - w / 2, top, w, h, 12); ctx.fill(); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(x - 7, top + h - 1.5); ctx.lineTo(x + 1, top + h + 10); ctx.lineTo(x + 7, top + h - 1.5); ctx.fill(); ctx.stroke();
  ctx.fillRect(x - 6, top + h - 4, 12, 4);
  ctx.fillStyle = word ? '#e33b3b' : '#000'; ctx.fillText(text, x, top + h / 2 + 1);
}
function nameplate(name, x, y, color, active) {
  ctx.font = '800 13px Inter, sans-serif'; ctx.textAlign = 'center';
  const w = ctx.measureText(name).width + 18;
  ctx.fillStyle = active ? '#9147ffee' : '#0e0e10d9'; roundRect(x - w / 2, y - 11, w, 22, 5); ctx.fill();
  if (active) { ctx.strokeStyle = '#fff'; ctx.lineWidth = 2; ctx.stroke(); }
  ctx.fillStyle = active ? '#fff' : color; ctx.fillText(name, x, y + 1);
  ctx.fillStyle = active ? '#9147ffee' : '#0e0e10d9'; ctx.beginPath(); ctx.moveTo(x - 5, y + 11); ctx.lineTo(x + 5, y + 11); ctx.lineTo(x, y + 16); ctx.fill();
}
function bubbleDots(x, y, color) {
  ctx.fillStyle = '#0e0e10cc'; roundRect(x - 17, y - 9, 34, 18, 9); ctx.fill();
  ctx.fillStyle = color; for (let k = 0; k < 3; k++) { ctx.beginPath(); ctx.arc(x - 8 + k * 8, y - (reduced ? 0 : Math.max(0, Math.sin(time * 5 - k)) * 2), 2.5, 0, 7); ctx.fill(); }
}
function drawPlayer() {
  const frames = cidSprites[player.dir];
  const f = player.moving ? (Math.floor(player.step * 2) % 2 ? 1 : 2) : 0;
  const bob = player.moving && !reduced && f ? -1 : 0;
  const x = Math.round(player.x * SC) / SC, y = Math.round(player.y * SC) / SC;
  ctx.fillStyle = '#0004'; ctx.beginPath(); ctx.ellipse(x + 8, y + 15, 6, 2, 0, 0, 7); ctx.fill();
  ctx.drawImage(frames[f], x, y - 8 + bob);
  if (tiles[ix(player.tx, player.ty)] === TG && !player.moving) { ctx.fillStyle = '#2c7a3a'; for (let k = 0; k < 4; k++) ctx.fillRect(x + 1 + k * 4, y + 10, 2, 6); ctx.fillStyle = '#5fc069'; for (let k = 0; k < 4; k++) ctx.fillRect(x + 3 + k * 4, y + 9, 1, 6); }
  // luz do REC piscando
  if (Math.floor(time * 2) % 2) { ctx.fillStyle = '#ff3355'; const [rx, ry] = { down: [14, 3], up: [14, 1], left: [1, 5], right: [14, 5] }[player.dir]; ctx.fillRect(x + rx, y - 8 + ry + bob, 1, 1); }
}
function drawNPC(n) {
  if (!n.sprites) n.sprites = npcSprites(n.name, n.cat);
  const x = Math.round(n.x * SC) / SC, y = Math.round(n.y * SC) / SC;
  ctx.fillStyle = '#0004'; ctx.beginPath(); ctx.ellipse(x + 8, y + 15, 5, 2, 0, 0, 7); ctx.fill();
  const bob = n.moving && !reduced ? -Math.abs(Math.sin(n.prog * Math.PI)) : 0;
  const tired = n.state === 'tired' && !reduced ? Math.floor(time * 4) % 2 : 0;
  ctx.drawImage(n.sprites[n.dir], x, y - 2 + bob + tired);
  // braço esticado apontando pro Cid
  if (n.taunting && n.state !== 'tired') {
    const { S: skin, A: shirt } = n.sprites.pal, jab = reduced ? 0 : Math.floor(time * 6 + n.tx) % 2, ay = y + 8 + bob;
    if (n.dir === 'left') { ctx.fillStyle = shirt; ctx.fillRect(x + 2 - jab, ay, 3, 2); ctx.fillStyle = skin; ctx.fillRect(x - 1 - jab, ay, 3, 2); ctx.fillRect(x - 3 - jab, ay, 2, 1); }
    else if (n.dir === 'right') { ctx.fillStyle = shirt; ctx.fillRect(x + 11 + jab, ay, 3, 2); ctx.fillStyle = skin; ctx.fillRect(x + 14 + jab, ay, 3, 2); ctx.fillRect(x + 17 + jab, ay, 2, 1); }
    else if (n.dir === 'down') { ctx.fillStyle = skin; ctx.fillRect(x + 11, ay + 1 + jab, 3, 3); ctx.fillRect(x + 12, ay + 4 + jab, 1, 2); }
  }
}
function drawVehicle(v) {
  const x = Math.round(v.x), y = v.lane.row * T, d = v.lane.dir;
  ctx.fillStyle = '#0003'; ctx.fillRect(x + 1, y + 12, v.w, 3);
  if (v.kind === 'bike') { ctx.fillStyle = '#222'; ctx.fillRect(x, y + 10, 4, 4); ctx.fillRect(x + 8, y + 10, 4, 4); ctx.fillStyle = v.color; ctx.fillRect(x + 2, y + 8, 8, 2); ctx.fillStyle = '#2a7'; ctx.fillRect(x + 4, y + 1, 4, 7); ctx.fillStyle = '#e8ad7f'; ctx.fillRect(x + 4, y - 2, 4, 3); return; }
  if (v.kind === 'moto') { ctx.fillStyle = '#222'; ctx.fillRect(x, y + 10, 4, 4); ctx.fillRect(x + 10, y + 10, 4, 4); ctx.fillStyle = '#c2c7cf'; ctx.fillRect(x + 2, y + 8, 10, 3); ctx.fillStyle = '#1f1d27'; ctx.fillRect(x + 5, y + 1, 4, 7); ctx.fillStyle = v.color; ctx.fillRect(d > 0 ? x : x + 7, y - 1, 7, 7); ctx.fillStyle = '#ffd84d'; ctx.fillRect(x + 5, y - 3, 4, 4); return; }
  const h = v.kind === 'bus' ? 15 : 11, top = y + 13 - h;
  ctx.fillStyle = v.color; ctx.fillRect(x, top, v.w, h);
  ctx.fillStyle = '#ffffff33'; ctx.fillRect(x, top, v.w, 2);
  ctx.fillStyle = '#7fd3ffcc';
  if (v.kind === 'bus') { for (let i = x + 4; i < x + v.w - 6; i += 7) ctx.fillRect(i, top + 3, 5, 4); ctx.fillStyle = '#ffd84d'; ctx.fillRect(d > 0 ? x + v.w - 8 : x + 2, top + 3, 6, 3); }
  else { ctx.fillRect(x + 6, top + 2, v.w - 12, 4); }
  ctx.fillStyle = '#17121f'; ctx.fillRect(x + 3, y + 11, 6, 4); ctx.fillRect(x + v.w - 9, y + 11, 6, 4);
  ctx.fillStyle = '#fff6a8'; ctx.fillRect(d > 0 ? x + v.w - 2 : x, top + h - 5, 2, 2);
}
function drawCat(c) {
  const x = Math.round(c.x), y = Math.round(c.y), [fur, dark] = c.coat, sway = reduced ? 0 : Math.round(Math.sin(c.t * 2.2) * 2);
  ctx.fillStyle = '#0003'; ctx.fillRect(x, y + 6, 9, 2);
  ctx.fillStyle = fur; ctx.fillRect(x + 1, y + 1, 6, 6); ctx.fillRect(x + 6, y - 3, 5, 5);
  ctx.fillRect(x + 6, y - 5, 1, 2); ctx.fillRect(x + 10, y - 5, 1, 2);
  ctx.fillRect(x - 1 + sway, y - 3, 1, 4); ctx.fillRect(x, y + 1, 1, 1);
  ctx.fillStyle = dark; ctx.fillRect(x + 2, y + 2, 1, 4); ctx.fillRect(x + 4, y + 2, 1, 4); ctx.fillRect(x + 8, y - 3, 1, 1);
  const blink = Math.floor(c.t * 3) % 11 === 0;
  ctx.fillStyle = blink ? dark : '#3ee08f'; ctx.fillRect(x + 7, y - 2, 1, 1); ctx.fillRect(x + 9, y - 2, 1, 1);
  ctx.fillStyle = '#ff8ac2'; ctx.fillRect(x + 8, y, 1, 1);
}
function drawBird(b) {
  if (b.kind === 'pato') { const x = Math.round(b.x), y = Math.round(b.y); ctx.fillStyle = '#fff'; ctx.fillRect(x, y + 3, 7, 4); ctx.fillRect(x + 5, y, 3, 4); ctx.fillStyle = '#ff9f43'; ctx.fillRect(x + 8, y + 2, 2, 1); ctx.fillStyle = '#7cc4ff'; ctx.fillRect(x - 2, y + 7, 11, 1); return; }
  const x = Math.round(b.x), y = Math.round(b.y), peck = !b.fly && Math.sin(b.t * 3 + b.hx) > .7;
  ctx.fillStyle = '#7d7f8f'; ctx.fillRect(x, y, 5, 3); ctx.fillStyle = '#5d5f6f'; ctx.fillRect(x + (peck ? 4 : 3), y - (peck ? 0 : 2), 3, 3); ctx.fillStyle = '#ff9f43'; ctx.fillRect(x + (peck ? 7 : 6), y + (peck ? 2 : -1), 1, 1);
  if (b.fly) { const up = Math.floor(b.t * 12) % 2; ctx.fillStyle = '#9da0b0'; ctx.fillRect(x - 2, y - (up ? 3 : -1), 4, 2); ctx.fillRect(x + 3, y - (up ? 3 : -1), 4, 2); }
}
function drawTargetArrow(cx, cy) {
  if (!target || isCaught(target.name)) return;
  const sx = (target.x - cx + 8) * SC, sy = (target.y - cy + 4) * SC;
  if (sx > 0 && sx < canvas.width && sy > 0 && sy < canvas.height) {
    ctx.strokeStyle = '#ffd84d'; ctx.lineWidth = 3; ctx.setLineDash([6, 5]); ctx.lineDashOffset = -time * 20; ctx.beginPath(); ctx.arc(sx, sy + 12, 30, 0, 7); ctx.stroke(); ctx.setLineDash([]); return;
  }
  const px = (player.x - cx + 8) * SC, py = (player.y - cy + 4) * SC, a = Math.atan2(sy - py, sx - px);
  const ex = clamp(px + Math.cos(a) * 1000, 40, canvas.width - 40), ey = clamp(py + Math.sin(a) * 1000, 40, canvas.height - 40);
  ctx.save(); ctx.translate(ex, ey); ctx.rotate(a); ctx.fillStyle = '#ffd84d'; ctx.strokeStyle = '#0e0e10'; ctx.lineWidth = 3;
  ctx.beginPath(); ctx.moveTo(18, 0); ctx.lineTo(-10, -13); ctx.lineTo(-4, 0); ctx.lineTo(-10, 13); ctx.closePath(); ctx.stroke(); ctx.fill(); ctx.restore();
}
function drawMinimap() {
  mctx.clearRect(0, 0, mm.width, mm.height); mctx.drawImage(mini, 0, 0);
  mctx.strokeStyle = '#fff8'; mctx.lineWidth = 1; mctx.strokeRect(cam.x / 8 + .5, cam.y / 8 + .5, VW * 2, VH * 2);
  for (const n of npcs) if (!isCaught(n.name)) { mctx.fillStyle = CATS[n.cat].color; mctx.fillRect(n.tx * 2, n.ty * 2, 2, 2); }
  if (target && !isCaught(target.name)) { mctx.fillStyle = '#ffd84d'; mctx.fillRect(target.tx * 2 - 2, target.ty * 2 - 2, 6, 6); }
  if (Math.floor(time * 3) % 2) { mctx.fillStyle = '#fff'; mctx.fillRect(player.tx * 2 - 1, player.ty * 2 - 1, 4, 4); }
  mctx.fillStyle = '#ff3355'; mctx.fillRect(player.tx * 2, player.ty * 2, 2, 2);
}

// ---------------------------------------------------------------- HUD: placas, diálogos, alertas
let distTimer;
function showDistrict(name) {
  const el = $('#districtSign'); el.textContent = name; el.classList.remove('show'); void el.offsetWidth; el.classList.add('show');
  clearTimeout(distTimer); distTimer = setTimeout(() => el.classList.remove('show'), 2600);
  $('#streamPlace').textContent = name;
}
let dialogQueue = [], typing = null;
function dialog(lines, title = '') {
  dialogQueue = Array.isArray(lines) ? lines.slice() : [lines]; modes.dialog = true; keys.clear();
  $('#dialogTitle').textContent = title; $('#dialog').hidden = false; nextLine();
}
function nextLine() {
  if (typing) { clearInterval(typing.timer); $('#dialogText').textContent = typing.text; typing = null; return; }
  const line = dialogQueue.shift();
  if (line === undefined) { $('#dialog').hidden = true; modes.dialog = false; return; }
  const el = $('#dialogText'); el.textContent = '';
  if (reduced) { el.textContent = line; return; }
  let i = 0; typing = { text: line, timer: setInterval(() => { el.textContent = line.slice(0, ++i); if (i % 3 === 0) sfx('type'); if (i >= line.length) { clearInterval(typing.timer); typing = null; } }, 18) };
}
$('#dialog').addEventListener('click', nextLine);

function interact() {
  if (modes.start) return;
  if (modes.dialog) return nextLine();
  if (busy()) return;
  let n = facedNPC();
  if (!n) { const adj = adjacentNPC(); if (adj) { n = adj[0]; player.dir = adj[1]; } }
  if (n) return startBattle(n, false);
  const [x, y] = facing();
  if (inMap(x, y) && owner[ix(x, y)] >= 0) { const info = INFO[owner[ix(x, y)]]; sfx('type'); tut.read = true; return dialog(info.text, info.name); }
  if (inMap(x, y) && tiles[ix(x, y)] === WA) return dialog('Rio Pinheiros. O cheiro... digamos que é "característico". Melhor não filmar isso.', 'Rio Pinheiros');
  toast('Nada pra filmar aqui. Chegue perto de um XETMON!');
}

let alertBusy = Promise.resolve();
function streamAlert(name) {
  alertBusy = alertBusy.then(() => new Promise(res => {
    const el = $('#alert'), [font, scale] = fontOf(name);
    el.querySelector('.alert-cid').innerHTML = CID_IMG;
    const nm = el.querySelector('.alert-name'); nm.textContent = name; nm.style.fontFamily = `'${font}', 'Inter', sans-serif`; nm.style.fontSize = `${clamp(42 * scale * (14 / Math.max(14, name.length)), 18, 46)}px`; nm.style.color = CATS[catOf(name)].color;
    el.querySelector('.alert-emoji').textContent = emojiOf(name);
    el.hidden = false; el.classList.remove('go'); void el.offsetWidth; el.classList.add('go'); sfx('alert');
    setTimeout(() => { el.hidden = true; res(); }, reduced ? 2200 : 3600);
  }));
}

// ---------------------------------------------------------------- batalha / gravação do XET
const ROASTS = [n => `"${n}"... tua mãe sabe desse nick?`, n => `Esse nick tem CPF, ${n}?`, n => `${n}, quem te deu esse nome merece cadeia.`, n => `Olha o ${n} todo arrumadinho pra live, que fofo.`, n => `${n}? Vou ler devagar pra moderação não me banir.`, n => `${n} digitou isso de olho fechado, certeza.`, n => `Cadê o print? ${n} entrou pra história do XET.`];
const BATTLE = { npc: null, wild: false, zone: .22, speed: 1.1, misses: 0, zoars: 0, salves: 0, phase: 'menu', needle: 0, raf: 0, menuIndex: 0 };
function startBattle(n, wild, caughtUp) {
  if (n.moving) { n.moving = false; n.prog = 0; n.x = n.tx * T; n.y = n.ty * T; }
  n.state = 'tired'; n.restT = 2.5; refreshNpcGrid();
  modes.battle = true; keys.clear(); Object.assign(BATTLE, { npc: n, wild, zone: .2 + (n.name.length < 12 ? .05 : 0), speed: 1 + Math.min(n.name.length, 30) / 40, misses: 0, zoars: 0, salves: 0, phase: 'intro', menuIndex: 0 });
  const [font, scale] = fontOf(n.name), cat = CATS[n.cat], el = $('#battle');
  el.style.setProperty('--cat', cat.color);
  $('#bName').textContent = n.name; $('#bName').style.fontFamily = `'${font}', 'Inter', sans-serif`; $('#bName').style.fontSize = `${clamp(30 * scale * (16 / Math.max(16, n.name.length)) * (innerWidth < 700 ? .6 : 1), 11, 34)}px`;
  $('#bCat').textContent = cat.label; $('#bNo').textContent = '#' + pad3(state.names.indexOf(n.name) + 1);
  $('#bEmoji').textContent = emojiOf(n.name); $('#bCid').innerHTML = CID_IMG;
  $('#bDist').textContent = DIST[n.district].name;
  $('#focusZone').style.width = BATTLE.zone * 100 + '%';
  el.className = 'battle'; el.hidden = false; void el.offsetWidth; el.classList.add('enter');
  $('#viewfinder').hidden = true; $('#bCam').hidden = true; $('#bEmoji').className = 'b-emoji';
  setMenu(false);
  music.mode = 'battle'; sfx('encounter');
  btext(wild ? `Um XETMON selvagem pulou da grama! É o ${n.name}!` : caughtUp ? `Alcançou! ${n.name} tá sem fôlego de tanto correr!` : `${n.name} quer aparecer na live!`, () => { BATTLE.phase = 'menu'; btext(`O que o Cid vai fazer?`); setMenu(true); });
  chatSay(n.name, pick(['APARECI NA LIVE MÃE', 'oi cid 👋👋', 'não me filma não pfv', 'É AGORA', 'tô de pijama cid', 'VAPO VAPO VAPO']), colorOf(n.name));
}
let btTimer;
function btext(t, done) {
  clearInterval(btTimer); const el = $('#bText'); el.textContent = '';
  if (reduced) { el.textContent = t; if (done) setTimeout(done, 700); return; }
  let i = 0; btTimer = setInterval(() => { el.textContent = t.slice(0, ++i); if (i >= t.length) { clearInterval(btTimer); if (done) setTimeout(done, 650); } }, 16);
}
function setMenu(on) { $$('#bMenu button').forEach((b, i) => { b.disabled = !on; b.classList.toggle('sel', on && i === BATTLE.menuIndex); }); $('#bMenu').classList.toggle('off', !on); }
function battleAct(act) {
  if (BATTLE.phase !== 'menu') return;
  const n = BATTLE.npc; setMenu(false);
  if (act === 'film') { BATTLE.phase = 'aim'; $('#viewfinder').hidden = false; BATTLE.needle = 0; btext('Segura a câmera... aperte E / ESPAÇO / toque na tela quando o foco estiver na faixa roxa!'); BATTLE.t0 = performance.now(); aimLoop(); sfx('beep'); }
  else if (act === 'zoar') {
    if (BATTLE.zoars >= 2) { btext(`${n.name} já tá imune a zoeira.`, back); return; }
    BATTLE.zoars++; BATTLE.zone = Math.min(.42, BATTLE.zone + .08); $('#focusZone').style.width = BATTLE.zone * 100 + '%';
    btext(`Cid: ${pick(ROASTS)(n.name)} ${n.name} ficou sem reação! (foco mais fácil)`, back); sfx('laugh');
    chatSay(pick(state.names), pick(['KKKKKKKKKKK', 'MORREU', 'cid sem filtro 💀', 'chama o RH', 'PALHAÇADA KKKK']), null);
  } else if (act === 'salve') {
    if (BATTLE.salves >= 2) { btext(`${n.name} já recebeu salve demais. Vai ficar metido.`, back); return; }
    BATTLE.salves++; BATTLE.speed *= .75; btext(`Cid: "Salve, ${n.name}! Tamo junto!" ${n.name} ficou paradinho de emoção. (agulha mais lenta)`, back); sfx('beep');
    chatSay(n.name, pick(['AAAAA ELE ME DEU SALVE', 'mãe olha eu no cid', 'chorei', 'te amo cid ❤️']), colorOf(n.name));
  } else if (act === 'run') { btext('Cid vazou da resenha. Fica pra próxima!', () => endBattle()); sfx('run'); }
}
const back = () => { BATTLE.phase = 'menu'; btext('E agora, Cidoso?'); setMenu(true); };
function aimLoop() {
  cancelAnimationFrame(BATTLE.raf);
  const tick = now => {
    if (BATTLE.phase !== 'aim') return;
    BATTLE.needle = (Math.sin((now - BATTLE.t0) / 1000 * BATTLE.speed * 2.4 - Math.PI / 2) + 1) / 2;
    $('#focusNeedle').style.left = BATTLE.needle * 100 + '%';
    $('#vfTime').textContent = '00:' + String(Math.floor((now - BATTLE.t0) / 1000)).padStart(2, '0') + ':' + String(Math.floor((now - BATTLE.t0) / 16.6) % 60).padStart(2, '0');
    $('#bEmoji').style.filter = `blur(${Math.abs(BATTLE.needle - .5) * 10}px)`;
    BATTLE.raf = requestAnimationFrame(tick);
  };
  BATTLE.raf = requestAnimationFrame(tick);
}
function shoot() {
  if (BATTLE.phase !== 'aim') return;
  BATTLE.phase = 'shot'; cancelAnimationFrame(BATTLE.raf);
  const half = BATTLE.zone / 2, hit = Math.abs(BATTLE.needle - .5) <= half;
  $('#bEmoji').style.filter = hit ? 'none' : 'blur(4px)'; sfx('shutter');
  if (hit) return captureSequence();
  BATTLE.misses++;
  const flee = Math.random() < .12 + BATTLE.misses * .12;
  setTimeout(() => {
    $('#viewfinder').hidden = true;
    if (flee) {
      $('#bEmoji').classList.add('flee'); sfx('run');
      btext(`Desfocou! ${BATTLE.npc.name} ${pick(['foi pro banheiro', 'saiu pra comprar pão', 'mudou de canal', 'deu alt+f4'])} e sumiu no meio do XET!`, () => endBattle());
      chatSay(pick(state.names), pick(['FUGIUUUU', 'cid cego kkkkk', 'filma direito cid 😭', 'F no chat']), null);
    } else { btext(`Desfocou! ${BATTLE.npc.name} ficou todo embaçado. Tenta de novo!`, back); }
  }, 450);
}
function captureSequence() {
  const n = BATTLE.npc, el = $('#battle');
  if (!reduced) { el.classList.add('flash'); setTimeout(() => el.classList.remove('flash'), 160); }
  btext(`REC ● Gravando ${n.name}...`);
  setTimeout(() => {
    $('#viewfinder').hidden = true; $('#bEmoji').classList.add('suck'); $('#bCam').innerHTML = camSVG; $('#bCam').hidden = false; $('#bCam').className = 'b-cam drop'; sfx('suck');
  }, 450);
  const wobbles = reduced ? 0 : 3;
  for (let k = 0; k < wobbles; k++) setTimeout(() => { $('#bCam').className = 'b-cam wobble'; void $('#bCam').offsetWidth; $('#bCam').className = 'b-cam wobble w' + (k % 2); sfx('tick'); }, 1300 + k * 650);
  setTimeout(() => {
    $('#bCam').className = 'b-cam done'; sfx('caught');
    tut.captured = true; state.caught = [...new Set([...state.caught, n.name])]; state.log[n.name] = { t: Date.now(), where: n.district }; state.points += 100; persist();
    refreshNpcGrid(); if (target === n) target = null; updateAll();
    btext(`GRAVADO! ${n.name} entrou na XETDEX! +100 ◆`, () => setTimeout(() => { endBattle(); streamAlert(n.name); flood(n.name); speak(`${n.name.replace(/_/g, ' ')} entrou na xetdex`); }, 500));
  }, 1300 + wobbles * 650 + 200);
}
function endBattle() {
  cancelAnimationFrame(BATTLE.raf); clearInterval(btTimer);
  $('#battle').hidden = true; modes.battle = false; BATTLE.phase = 'menu'; music.mode = 'walk'; keys.clear();
  if (BATTLE.npc) BATTLE.npc.spotted = true;
  if (state.names.length && caughtCount() === state.names.length) setTimeout(() => dialog(['XETDEX COMPLETA! Todos os XETMON foram eternizados.', 'Edite a lista pra colocar nomes novos e continuar a resenha. VAPO VAPO VAPO!'], 'cidcidoso'), 800);
}
$$('#bMenu button').forEach((b, i) => { b.onclick = () => { BATTLE.menuIndex = i; battleAct(b.dataset.act); }; });
$('#battle').addEventListener('pointerdown', e => { if (BATTLE.phase === 'aim' && !e.target.closest('button')) shoot(); });
$('#shootBtn').onclick = shoot;

// ---------------------------------------------------------------- chat simulado
const CHAT_LINES = [
  'salve cid', 'CIDOSOOOOO', 'vapo vapo vapo', 'me acha cid 🙏', 'cid careca kkkkk', 'XETDEX completa quando?', 'primeira vez aqui, que live é essa', 'manda salve pra minha mãe',
  'olha o pé esquerdo', 'a câmera tá torta cid', 'esse jogo é real?', 'quem tá vendo do trabalho 👀', 'cid passa na minha rua', 'MASP de domingo é outro nível', 'que calor em SP hoje',
  'alguém viu o {other}?', 'o {other} tá escondido perto da {place}', 'filma o {other} cid!!', '{other} nunca vai ser achado', 'eu sou o próximo', 'pastel de feira > tudo',
  'trânsito na marginal tá parado', 'cid anda que nem tartaruga', 'aperta SHIFT pra correr cid', 'na grama alta do ibirapuera aparece XETMON selvagem', 'GG', 'chat tá on hoje', 'resenha garantida',
  'esse topete é natural?', 'barba de respeito', 'cid me deu salve uma vez 🥹', 'XET XET XET', '!xetdex', 'mods dormindo', 'quem é vivo sempre aparece'
];
const PLACES = ['Paulista', 'Sé', 'Luz', 'Ibirapuera', 'Marginal', 'ponte', 'feira', 'Beco do Batman', 'várzea'];
let viewers = 1200 + Math.floor(Math.random() * 300);
function chatSay(user, text, color, badges) {
  const log = $('#chatLog'), row = document.createElement('div'); row.className = 'msg';
  const b = document.createElement('span'); b.className = 'badges';
  const bl = badges || (hashStr(user) % 3 === 0 ? ['sub'] : hashStr(user) % 7 === 0 ? ['vip'] : hashStr(user) % 11 === 0 ? ['mod'] : []);
  for (const k of bl) { const s = document.createElement('i'); s.className = 'badge ' + k; s.title = { sub: 'Inscrito', vip: 'VIP', mod: 'Moderador', bot: 'Bot', you: 'Você', cid: 'Streamer' }[k]; b.append(s); }
  const u = document.createElement('b'); u.textContent = user; u.style.color = color || colorOf(user);
  const t = document.createElement('span'); t.textContent = ': ' + text;
  row.append(b, u, t); log.append(row);
  while (log.children.length > 140) log.firstChild.remove();
  if (log.scrollHeight - log.scrollTop - log.clientHeight < 140) log.scrollTop = log.scrollHeight;
}
function chatTick() {
  if (!document.hidden && !modes.start) {
    const live = liveNPCs(), user = pick(Math.random() < .7 && live.length ? live : npcs.length ? npcs : [{ name: 'chat' }]);
    let line = pick(CHAT_LINES);
    const other = pick(live.length ? live : npcs);
    if (other) line = line.replace('{other}', other.name).replace('{place}', DIST[other.district].name.toLowerCase());
    line = line.replace('{place}', pick(PLACES));
    if (user.name && !isCaught(user.name) && user.tx !== undefined && Math.random() < .35) { line = `tô aqui no ${DIST[user.district].name.toLowerCase()} cid, vem me filmar`; user.bubble = { text: '💬', t: 2.5 }; }
    chatSay(user.name, line, colorOf(user.name));
    viewers = clamp(viewers + Math.round((Math.random() - .45) * 18), 800, 99999); $('#viewers').textContent = fmt(viewers + caughtCount() * 37);
  }
  setTimeout(chatTick, 1400 + Math.random() * 2600);
}
function flood(name) {
  const lines = ['VAPO VAPO VAPO', `${name} ETERNIZADO`, 'GRAVOU 📹', 'XETDEX +1', 'AAAAAAAAA', `F pro ${name}`, 'CIDOSO LENDA', 'cortaaa isso'];
  for (let k = 0; k < 7; k++) setTimeout(() => { const u = pick(npcs.length ? npcs : [{ name: 'xet' }]).name; chatSay(u, pick(lines), colorOf(u)); }, k * 160);
}
function cmd(text) {
  const c = text.trim().toLowerCase();
  if (c === '!vapo') { for (let k = 0; k < 4; k++) setTimeout(() => chatSay(pick(npcs).name, 'VAPO VAPO VAPO', null), 200 * k); return; }
  if (c === '!xetdex') return chatSay('XetBot', `${caughtCount()}/${state.names.length} XETMON filmados. ${state.names.length - caughtCount()} ainda à solta.`, '#9147ff', ['bot']);
  if (c === '!onde') return findNearest();
  if (c === '!som') return toggleSound();
  if (c === '!ajuda' || c === '!help') return chatSay('XetBot', 'Comandos: !onde (rastrear XETMON mais perto), !xetdex, !vapo, !som', '#9147ff', ['bot']);
}
function findNearest(district) {
  const pool = liveNPCs().filter(n => !district || n.district === district);
  if (!pool.length) { chatSay('XetBot', district ? `Nenhum XETMON à solta em ${DIST[district].name}.` : 'Nenhum XETMON à solta. XETDEX completa!', '#9147ff', ['bot']); return; }
  target = pool.reduce((a, b) => Math.hypot(a.tx - player.tx, a.ty - player.ty) <= Math.hypot(b.tx - player.tx, b.ty - player.ty) ? a : b);
  const dx = target.tx - player.tx, dy = target.ty - player.ty;
  const dir = (Math.abs(dy) > 2 ? (dy < 0 ? 'norte' : 'sul') : '') + (Math.abs(dx) > 2 ? (Math.abs(dy) > 2 ? '-' : '') + (dx < 0 ? 'oeste' : 'leste') : '');
  chatSay('XetBot', `Rastreando ${target.name} — ${dir || 'bem do seu lado'}, ~${Math.abs(dx) + Math.abs(dy)} passos (${DIST[target.district].name}). Siga a seta amarela!`, '#9147ff', ['bot']);
}
$('#chatForm').addEventListener('submit', e => {
  e.preventDefault(); const v = $('#chatInput').value.trim().slice(0, 140); if (!v) return;
  chatSay('você', v, '#bf94ff', ['you']); $('#chatInput').value = '';
  if (v.startsWith('!')) setTimeout(() => cmd(v), 250);
  else if (/vapo/i.test(v)) setTimeout(() => chatSay(pick(npcs).name, 'VAPO VAPO VAPO', null), 400);
});

// ---------------------------------------------------------------- XETDEX, regiões e contadores
let dexFilter = 'all', dexQuery = '';
function updateAll() {
  const c = caughtCount(), t = state.names.length, pct = t ? c / t * 100 : 0;
  $('#goalCount').textContent = c; $('#goalTotal').textContent = t; $('#goalBar').style.width = pct + '%';
  $('#dexCount').textContent = c; $('#dexTotal').textContent = t; $('#dexBar').style.width = pct + '%';
  $$('.points b').forEach(el => el.textContent = fmt(state.points));
  renderDex(); renderRegions(); renderFeatured();
}
function renderDex() {
  const grid = $('#dexGrid'); grid.replaceChildren();
  const q = norm(dexQuery);
  const list = state.names.map((name, i) => ({ name, i, cat: catOf(name), caught: isCaught(name) }))
    .filter(e => dexFilter === 'all' || (dexFilter === 'caught' ? e.caught : dexFilter === 'free' ? !e.caught : e.cat === dexFilter))
    .filter(e => !q || (e.caught && norm(e.name).includes(q)) || ('#' + pad3(e.i + 1)).includes(q));
  for (const e of list) {
    const card = document.createElement('article'); card.className = 'card' + (e.caught ? ' caught' : ''); card.style.setProperty('--cat', CATS[e.cat].color);
    const [font, scale] = fontOf(e.name);
    const npc = npcs.find(n => n.name === e.name);
    const top = document.createElement('div'); top.className = 'card-top';
    const no = document.createElement('span'); no.className = 'no'; no.textContent = '#' + pad3(e.i + 1);
    const cat = document.createElement('span'); cat.className = 'cat'; cat.textContent = e.caught ? CATS[e.cat].label : '???';
    top.append(no, cat);
    const em = document.createElement('div'); em.className = 'card-emoji'; em.textContent = emojiOf(e.name);
    const nm = document.createElement('div'); nm.className = 'card-name';
    if (e.caught) { nm.textContent = e.name; nm.style.fontFamily = `'${font}', 'Inter', sans-serif`; nm.style.fontSize = `${clamp(19 * scale * (14 / Math.max(14, e.name.length)), 10, 22)}px`; }
    else nm.textContent = '?'.repeat(Math.min(12, e.name.length));
    const meta = document.createElement('small');
    const lg = state.log[e.name];
    meta.textContent = e.caught ? `Filmado ${lg && DIST[lg.where] ? 'em ' + DIST[lg.where].name : 'em SP'}` : npc ? `À solta: ${DIST[npc.district].name}` : 'À solta';
    card.append(top, em, nm, meta);
    if (!e.caught && npc) { const b = document.createElement('button'); b.className = 'track'; b.textContent = '⌖ Rastrear'; b.onclick = () => { target = npc; chatSay('XetBot', `Rastreando XETMON #${pad3(e.i + 1)} em ${DIST[npc.district].name}. Siga a seta amarela!`, '#9147ff', ['bot']); $('#stage').scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'center' }); canvas.focus(); }; card.append(b); }
    grid.append(card);
  }
  if (!list.length) { const p = document.createElement('p'); p.className = 'empty'; p.textContent = state.names.length ? 'Nenhum XETMON com esse filtro.' : 'Adicione nomes para começar a caçada.'; grid.append(p); }
}
function renderRegions() {
  const ul = $('#regions'); ul.replaceChildren();
  const counts = {}; for (const n of liveNPCs()) counts[n.district] = (counts[n.district] || 0) + 1;
  for (const d of DISTRICTS) {
    const li = document.createElement('li'), btn = document.createElement('button'); const left = counts[d.id] || 0;
    btn.innerHTML = `<span class="r-av" style="--c:${d.color}"></span><span class="r-txt"><b></b><small></small></span><span class="r-live"><i></i></span>`;
    btn.querySelector('b').textContent = d.name; btn.querySelector('small').textContent = left ? `${left} XETMON à solta` : 'tudo filmado';
    btn.querySelector('.r-live').append(String(left)); btn.classList.toggle('done', !left); btn.title = left ? 'Rastrear o XETMON mais perto nessa região' : '';
    btn.onclick = () => { findNearest(d.id); canvas.focus(); };
    li.append(btn); ul.append(li);
  }
}
function renderFeatured() {
  const ul = $('#featured'); ul.replaceChildren();
  const recent = Object.entries(state.log).filter(([n]) => state.names.includes(n) && isCaught(n)).sort((a, b) => b[1].t - a[1].t).slice(0, 5);
  if (!recent.length) { const li = document.createElement('li'); li.className = 'muted'; li.textContent = 'Ninguém filmado ainda.'; ul.append(li); return; }
  for (const [n] of recent) { const li = document.createElement('li'); li.innerHTML = '<span class="f-em"></span><b></b>'; li.querySelector('.f-em').textContent = emojiOf(n); li.querySelector('b').textContent = n; li.querySelector('b').style.color = colorOf(n); ul.append(li); }
}
function renderChips() {
  const wrap = $('#dexChips'); wrap.replaceChildren();
  const chips = [['all', 'Todos'], ['caught', 'Filmados'], ['free', 'À solta'], ...Object.entries(CATS).filter(([k]) => state.names.some(n => catOf(n) === k)).map(([k, v]) => [k, v.label])];
  for (const [k, l] of chips) { const b = document.createElement('button'); b.textContent = l; b.className = 'chip' + (dexFilter === k ? ' on' : ''); if (CATS[k]) b.style.setProperty('--cat', CATS[k].color); b.onclick = () => { dexFilter = k; renderChips(); renderDex(); }; wrap.append(b); }
}
$('#search').addEventListener('input', e => { dexQuery = e.target.value; renderDex(); });

// ---------------------------------------------------------------- editor de nomes
function openEditor() { if (modes.battle) return; keys.clear(); $('#names').value = state.names.join('\n'); $('#editError').textContent = ''; countNames(); $('#editor').showModal(); }
function countNames() { const n = $('#names').value.split('\n').map(s => s.trim()).filter(Boolean).length; $('#nameCount').textContent = `${n}/${MAX_NAMES}`; }
$('#names').addEventListener('input', countNames);
$('#edit').onclick = openEditor; $('#edit2').onclick = openEditor;
$('#saveNames').onclick = e => {
  e.preventDefault();
  const names = [...new Set($('#names').value.split('\n').map(s => s.trim()).filter(Boolean))];
  if (names.length > MAX_NAMES || names.some(n => n.length > MAX_LEN)) { $('#editError').textContent = `Use até ${MAX_NAMES} nomes, cada um com no máximo ${MAX_LEN} caracteres.`; return; }
  state.names = names; persist(); rebuildNPCs(); renderChips(); $('#editor').close(); toast(`Lista atualizada: ${names.length} XETMON na rua. Bora!`);
};
$('#resetNames').onclick = () => { $('#names').value = DEFAULT_NAMES.join('\n'); countNames(); };
$('#resetCaught').onclick = () => { if (confirm('Zerar todas as capturas da XETDEX?')) { state.caught = []; state.log = {}; persist(); rebuildNPCs(); $('#editor').close(); toast('XETDEX zerada. Todo mundo de volta pra rua!'); } };
$('#help').onclick = () => { keys.clear(); $('#instructions').showModal(); };
$('#follow').onclick = () => { state.followed = !state.followed; persist(); syncFollow(); if (state.followed) { chatSay('XetBot', 'Valeu por seguir! ❤️ +50 ◆', '#9147ff', ['bot']); state.points += 50; persist(); updateAll(); } };
function syncFollow() { $('#follow').classList.toggle('on', state.followed); $('#follow').setAttribute('aria-pressed', String(state.followed)); $('#follow span').textContent = state.followed ? 'Seguindo' : 'Seguir'; }
$$('[data-scroll]').forEach(b => b.onclick = () => $(b.dataset.scroll).scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' }));

// ---------------------------------------------------------------- entrada
const keys = new Set();
const KEYMAP = { arrowup: 'up', w: 'up', arrowdown: 'down', s: 'down', arrowleft: 'left', a: 'left', arrowright: 'right', d: 'right' };
let lastDirKey = null;
function held() { if (lastDirKey && keys.has(lastDirKey)) return KEYMAP[lastDirKey]; for (const k of keys) if (KEYMAP[k]) return KEYMAP[k]; return null; }
document.addEventListener('keydown', e => {
  if (e.target.closest?.('input, textarea') || document.querySelector('dialog[open]')) return;
  const k = e.key.toLowerCase();
  if (modes.start) { if (k === 'enter' || k === ' ') { e.preventDefault(); startGame(true); } return; }
  if (modes.battle) {
    if ([' ', 'e', 'enter', 'arrowleft', 'arrowright', 'arrowup', 'arrowdown', 'a', 'd', 'w', 's'].includes(k)) e.preventDefault();
    if (BATTLE.phase === 'aim' && (k === ' ' || k === 'e' || k === 'enter')) return shoot();
    if (BATTLE.phase === 'menu') {
      if (KEYMAP[k]) { const d = KEYMAP[k]; BATTLE.menuIndex = (BATTLE.menuIndex + (d === 'right' ? 1 : d === 'left' ? 3 : 2)) % 4; setMenu(true); sfx('type'); }
      if ((k === 'e' || k === 'enter' || k === ' ') && !e.repeat) $$('#bMenu button')[BATTLE.menuIndex].click();
      if (k === 'escape' || k === 'q') battleAct('run');
    }
    return;
  }
  if (KEYMAP[k] || k === 'shift' || k === 'e' || k === ' ' || k === 'x' || k === 'enter') e.preventDefault();
  if (KEYMAP[k]) { keys.add(k); if (!e.repeat) lastDirKey = k; }
  if (k === 'shift') keys.add('shift');
  if (!e.repeat && (k === 'e' || k === ' ' || k === 'enter')) interact();
  if (!e.repeat && k === 'x') $('#dexSection').scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' });
});
document.addEventListener('keyup', e => { keys.delete(e.key.toLowerCase()); });
window.addEventListener('blur', () => keys.clear());
$$('[data-dir]').forEach(b => {
  const k = { up: 'arrowup', down: 'arrowdown', left: 'arrowleft', right: 'arrowright' }[b.dataset.dir];
  b.onpointerdown = e => { e.preventDefault(); b.setPointerCapture(e.pointerId); if (modes.battle && BATTLE.phase === 'menu') { const d = b.dataset.dir; BATTLE.menuIndex = (BATTLE.menuIndex + (d === 'right' ? 1 : d === 'left' ? 3 : 2)) % 4; setMenu(true); return; } keys.add(k); lastDirKey = k; };
  b.onpointerup = b.onpointercancel = b.onlostpointercapture = () => keys.delete(k);
});
$('#padA').onpointerdown = e => { e.preventDefault(); if (modes.battle) { if (BATTLE.phase === 'aim') shoot(); else if (BATTLE.phase === 'menu') $$('#bMenu button')[BATTLE.menuIndex].click(); } else interact(); };
$('#padB').onpointerdown = e => { e.preventDefault(); keys.add('b'); };
$('#padB').onpointerup = $('#padB').onpointercancel = () => keys.delete('b');
$('#film').onclick = () => { interact(); canvas.focus(); };
canvas.addEventListener('pointerdown', () => canvas.focus());

// ---------------------------------------------------------------- áudio: trilha 8-bit + efeitos sintetizados
let audio, master, lofi, timer, beat = 0;
const music = { on: false, mode: 'walk' };
function audioInit() {
  if (!audio) {
    audio = new (window.AudioContext || window.webkitAudioContext)();
    lofi = audio.createBiquadFilter(); lofi.type = 'lowpass'; lofi.frequency.value = 5200;
    master = audio.createGain(); master.gain.value = .22; master.connect(lofi); lofi.connect(audio.destination);
  }
  return audio.resume();
}
function tone(freq, at, dur, type = 'sine', vol = .3, slide) {
  const o = audio.createOscillator(), g = audio.createGain(); o.type = type; o.frequency.setValueAtTime(freq, at);
  if (slide) o.frequency.exponentialRampToValueAtTime(slide, at + dur);
  g.gain.setValueAtTime(.0001, at); g.gain.exponentialRampToValueAtTime(vol, at + .01); g.gain.exponentialRampToValueAtTime(.0001, at + dur);
  o.connect(g); g.connect(master); o.start(at); o.stop(at + dur + .03);
}
function noise(at, dur, vol, freq = 2500, type = 'highpass') {
  const b = audio.createBuffer(1, Math.max(1, audio.sampleRate * dur | 0), audio.sampleRate), d = b.getChannelData(0);
  for (let i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / d.length);
  const s = audio.createBufferSource(), g = audio.createGain(), f = audio.createBiquadFilter(); s.buffer = b; f.type = type; f.frequency.value = freq; g.gain.value = vol;
  s.connect(f); f.connect(g); g.connect(master); s.start(at);
}
// Trilha 8-bit do projeto (~135 BPM). Na gravação ela acelera um pouco pra dar tensão.
const track = new Audio('audio/trilha-8bit.mp3'); track.loop = true; track.preload = 'auto'; track.volume = .5;
if ('preservesPitch' in track) track.preservesPitch = false;
function tick() {
  if (!music.on || document.hidden || track.paused) return;
  const rate = music.mode === 'battle' ? 1.08 : 1; if (track.playbackRate !== rate) track.playbackRate = rate;
}
let ptVoice = null;
function pickVoice() { if (!('speechSynthesis' in window)) return; const vs = speechSynthesis.getVoices(); ptVoice = vs.find(v => /pt[-_]BR/i.test(v.lang)) || vs.find(v => /^pt/i.test(v.lang)) || null; }
if ('speechSynthesis' in window) { pickVoice(); speechSynthesis.onvoiceschanged = pickVoice; }
function speak(text, rate = 1.15) {
  if (!music.on || !('speechSynthesis' in window) || document.hidden) return;
  const u = new SpeechSynthesisUtterance(text); u.lang = 'pt-BR'; if (ptVoice) u.voice = ptVoice; u.rate = rate; u.pitch = .7; u.volume = .5;
  speechSynthesis.cancel(); speechSynthesis.speak(u);
}
function talk(ms) { const el = $('#facecam'); el.classList.add('talk'); setTimeout(() => el.classList.remove('talk'), ms); }
// Miadinho sintetizado: serra com glissando "mi-áu" passando por um formante que abre e fecha.
function meow(vol = .12) {
  const t = audio.currentTime, d = .38 + Math.random() * .3, base = 480 + Math.random() * 220;
  const o = audio.createOscillator(), lfo = audio.createOscillator(), lg = audio.createGain(), f = audio.createBiquadFilter(), g = audio.createGain();
  o.type = 'sawtooth'; o.frequency.setValueAtTime(base * .85, t); o.frequency.linearRampToValueAtTime(base * 1.4, t + d * .35); o.frequency.linearRampToValueAtTime(base * .75, t + d);
  lfo.frequency.value = 7; lg.gain.value = base * .02; lfo.connect(lg); lg.connect(o.frequency);
  f.type = 'bandpass'; f.Q.value = 4; f.frequency.setValueAtTime(800, t); f.frequency.linearRampToValueAtTime(2300, t + d * .3); f.frequency.linearRampToValueAtTime(700, t + d);
  g.gain.setValueAtTime(.0001, t); g.gain.exponentialRampToValueAtTime(vol, t + .04); g.gain.setValueAtTime(vol, t + d * .55); g.gain.exponentialRampToValueAtTime(.0001, t + d);
  o.connect(f); f.connect(g); g.connect(master); o.start(t); lfo.start(t); o.stop(t + d + .05); lfo.stop(t + d + .05);
}
function catMeow(c) {
  c.say = 1.4; c.word = pick(['miau', 'miaau~', 'mrrau', 'miii']);
  if (!audio || !music.on) return;
  const dist = Math.hypot(player.x - c.x, player.y - c.y) / T;
  meow(clamp(.16 - dist * .008, .025, .16));
  if (dist < 10 && Math.random() < .3) chatSay(pick(npcs).name, pick(['GATINHOOO 😻', 'pega o gato cid', 'miau', 'filma o gato!!', 'é o gato da live', 'pspspsps']), null);
}
function sfx(kind) {
  if (!audio || !music.on) return; const t = audio.currentTime;
  const S = {
    bump: () => tone(90, t, .08, 'square', .12),
    type: () => tone(1200, t, .02, 'square', .03),
    spot: () => { tone(988, t, .06, 'square', .07); tone(1319, t + .07, .1, 'square', .07); },
    encounter: () => [784, 659, 523, 392, 523, 659, 784, 1047].forEach((f, i) => tone(f, t + i * .06, .08, 'square', .07)),
    beep: () => tone(1568, t, .06, 'square', .06),
    shutter: () => { noise(t, .05, .4, 3000); noise(t + .07, .04, .3, 3000); },
    suck: () => tone(300, t, .5, 'sawtooth', .08, 1800),
    tick: () => { tone(220, t, .06, 'square', .12); noise(t, .04, .2, 2000); },
    caught: () => [523, 659, 784, 1047, 784, 1047].forEach((f, i) => tone(f, t + i * .09, .16, 'square', .08)),
    alert: () => [659, 880, 1175].forEach((f, i) => tone(f, t + i * .08, .25, 'triangle', .1)),
    honk: () => { tone(415, t, .12, 'square', .07); tone(415, t + .18, .2, 'square', .07); },
    flap: () => { noise(t, .08, .1, 1500, 'bandpass'); noise(t + .1, .08, .08, 1500, 'bandpass'); },
    laugh: () => [0, 1, 2, 3].forEach(i => tone(500 - i * 30, t + i * .1, .07, 'triangle', .08)),
    run: () => tone(600, t, .3, 'triangle', .07, 150),
    meow: () => meow(.12)
  };
  S[kind] && S[kind]();
}
async function toggleSound(force) {
  try {
    await audioInit(); music.on = typeof force === 'boolean' ? force : !music.on;
    $('#sound').setAttribute('aria-pressed', String(music.on)); $('#sound span').textContent = music.on ? 'Som ligado' : 'Som';
    $('#sound i').textContent = music.on ? '🔊' : '🔇'; $('.radio').classList.toggle('on', music.on);
    clearInterval(timer);
    if (music.on) { timer = setInterval(tick, 100); await track.play(); }
    else { track.pause(); if ('speechSynthesis' in window) speechSynthesis.cancel(); await audio.suspend(); }
  } catch { toast('O áudio não está disponível neste navegador.'); }
}
$('#sound').onclick = () => toggleSound();
document.addEventListener('visibilitychange', () => { keys.clear(); if (!audio || !music.on) return; if (document.hidden) { track.pause(); audio.suspend(); if ('speechSynthesis' in window) speechSynthesis.cancel(); } else { audio.resume(); track.play().catch(() => {}); } });

// ---------------------------------------------------------------- tutorial interativo
const tut = { on: false, i: 0, steps: 0, runSteps: 0, read: false, captured: false, done: false };
const TUTORIAL = [
  { icon: '🕹️', title: 'Bora andar', text: 'Use WASD ou as setas (no celular, o direcional) para dar uns passos pela Paulista.', check: () => tut.steps >= 4 },
  { icon: '💨', title: 'Pisa fundo', text: 'Segure Shift (ou o botão B) enquanto anda para correr.', check: () => tut.runSteps >= 3 },
  { icon: '🏛️', title: 'Curiosidade de SP', text: 'Volte pro vão do MASP, fique de frente pro prédio (ou qualquer monumento, placa ou banca) e aperte E / A para ler.', check: () => tut.read },
  { icon: '📍', title: 'Rastreie um XETMON', text: 'Digite !onde no chat, clique numa região da barra lateral ou use o botão abaixo. A seta amarela aponta o XETMON mais perto.', action: ['📍 Rastrear agora', () => findNearest()], check: () => !!target && !isCaught(target.name) },
  { icon: '🏃', title: 'Persiga o XETMON', text: 'Quando você chega perto, ele foge apontando e gritando "CALOTEIRO!" ou "CARECA!". Corra atrás: ele cansa e você alcança. Encoste nele!', check: () => modes.battle },
  { icon: '🎥', title: 'Filme o nome', text: 'Escolha FILMAR e aperte E / Espaço / A quando a agulha amarela passar na faixa roxa. ZOAR alarga a faixa, SALVE deixa a agulha mais lenta.', check: () => tut.captured },
  { icon: '🏆', title: 'Tá pronto, Cidoso!', text: 'Cada XETMON filmado vira figurinha na XETDEX (tecla X). Use "Editar XET" pra atualizar a lista do chat. Bora completar tudo!', final: true }
];
function startTutorial() {
  Object.assign(tut, { on: true, i: 0, steps: 0, runSteps: 0, read: false, captured: false, done: false });
  $('#tutorial').hidden = false; renderTutorial();
}
function renderTutorial() {
  const step = TUTORIAL[tut.i], el = $('#tutorial');
  el.classList.remove('ok');
  $('#tutIcon').textContent = step.icon; $('#tutStep').textContent = `TUTORIAL · ${tut.i + 1}/${TUTORIAL.length}`;
  $('#tutTitle').textContent = step.title; $('#tutText').textContent = step.text;
  $('#tutDots').replaceChildren(...TUTORIAL.map((_, k) => { const d = document.createElement('i'); d.className = k < tut.i ? 'done' : k === tut.i ? 'now' : ''; return d; }));
  const act = $('#tutAction'); act.hidden = !step.action && !step.final;
  act.textContent = step.final ? 'Bora caçar! ↗' : step.action ? step.action[0] : '';
  $('#film').classList.toggle('pulse', step.title === 'Filme o nome' || step.title === 'Persiga o XETMON');
}
function finishTutorial() {
  tut.on = false; $('#tutorial').hidden = true; $('#film').classList.remove('pulse');
  state.tutorialDone = true; persist(); canvas.focus();
}
function tutorialCheck() {
  if (!tut.on || tut.busy) return;
  const step = TUTORIAL[tut.i];
  if (step.final || !step.check()) return;
  tut.busy = true; $('#tutorial').classList.add('ok'); sfx('beep');
  setTimeout(() => { tut.busy = false; tut.i++; renderTutorial(); }, 900);
}
$('#tutAction').onclick = () => { const step = TUTORIAL[tut.i]; if (step.final) finishTutorial(); else if (step.action) { step.action[1](); canvas.focus(); } };
$('#tutSkip').onclick = finishTutorial;
$('#replayTutorial').onclick = () => { $('#instructions').close(); if (modes.start) startGame(false); startTutorial(); $('#stage').scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' }); };

// ---------------------------------------------------------------- início e loop
let startedAt = 0;
function startGame(withSound) {
  if (!modes.start) return;
  modes.start = false; startedAt = performance.now();
  $('#startScreen').classList.add('out'); setTimeout(() => $('#startScreen').hidden = true, reduced ? 0 : 500);
  $('#liveBadge').textContent = 'AO VIVO'; $('#liveBadge').classList.add('on'); $('.ch-avatar').classList.add('live');
  if (withSound) toggleSound(true);
  canvas.focus(); lastDistrict = ''; stepDone();
  if (!state.tutorialDone) setTimeout(startTutorial, 900);
  chatSay('cidcidoso', 'SALVE XET! Bora caçar XETMON na rua de SP 📹', '#bf94ff', ['cid']);
  setTimeout(() => chatSay('XetBot', 'Dica: digite !onde no chat pra rastrear o XETMON mais perto. Na grama alta do Ibirapuera aparece XETMON selvagem!', '#9147ff', ['bot']), 1200);
}
$('#startSound').onclick = () => startGame(true);
$('#startMute').onclick = () => startGame(false);

let last = performance.now();
function frame(now) {
  const dt = Math.min((now - last) / 1000, .05); last = now;
  if (!document.hidden) { update(dt); draw(); tutorialCheck(); }
  if (startedAt) { const s = Math.floor((now - startedAt) / 1000); $('#uptime').textContent = [s / 3600, (s / 60) % 60, s % 60].map(v => String(Math.floor(v)).padStart(2, '0')).join(':'); }
  requestAnimationFrame(frame);
}
setInterval(() => { if (!modes.start && !document.hidden) { state.points += 10; persist(); updateAll(); } }, 60000);

// montagem inicial do HUD
$$('.cid-slot').forEach(el => el.innerHTML = CID_IMG);
syncFollow(); rebuildNPCs(); renderChips(); showDistrict(DIST[districtAt(START.x, START.y)].name);
chatSay('XetBot', 'A live vai começar! Aperte ENTRAR AO VIVO.', '#9147ff', ['bot']);
setTimeout(chatTick, 1500);
document.fonts && document.fonts.load('800 13px Inter');
requestAnimationFrame(frame);

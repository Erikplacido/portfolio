import { MotionSpec } from '../types';

export const motionSpecs: MotionSpec[] = [
  {
    element: 'Hero Card 3D Flip (Transição de Inativo para Ativo)',
    trigger: 'Montagem da Tela 3 após validação de PIN (Passo 2 -> 3)',
    curve: 'cubic-bezier(0.34, 1.56, 0.64, 1)', // Spring-like overshoot
    durationMs: 900,
    properties: 'rotateY(180deg -> 0deg), scale(0.92 -> 1.0), filter: grayscale(100% -> 0%)',
    uxRationale:
      'Proporciona a sensação física de "ganhar vida" (materialização). A rotação revela o cartão vibrante da marca Caju e confere valor emocional à conquista da ativação.',
  },
  {
    element: 'Partículas de Celebração (Confetti Burst)',
    trigger: 'Conclusão da rotação 3D do cartão (delay de 450ms)',
    curve: 'cubic-bezier(0.25, 1, 0.5, 1)', // Quint Out
    durationMs: 1400,
    properties: 'opacity(0 -> 1 -> 0), translateY(0 -> -120px), spread(60deg)',
    uxRationale:
      'Momento expressivo de celebração (delight) sem poluir a visão do usuário; orienta o olhar diretamente para o título de conquista e o card da carteira digital.',
  },
  {
    element: 'Barra de Progresso (Stepped Header)',
    trigger: 'Navegação sequencial de telas (Passo 1 -> 2 -> 3)',
    curve: 'cubic-bezier(0.4, 0, 0.2, 1)', // Material Standard Easing
    durationMs: 380,
    properties: 'width(33% -> 66% -> 100%)',
    uxRationale:
      'Gera previsibilidade e clareza de esforço cognitivo restante, reduzindo taxa de desistência durante a criação de senha.',
  },
  {
    element: 'PIN Input Boxes - Foco Ativo e Cursor Pulsante',
    trigger: 'Foco no caractere atual / transição de caixa',
    curve: 'cubic-bezier(0.16, 1, 0.3, 1)', // Swift Ease Out
    durationMs: 220,
    properties: 'border-color, box-shadow: 0 0 0 3px rgba(234,60,54,0.18), opacity(cursor: 0 <-> 1 @ 800ms infinite)',
    uxRationale:
      'Indica visualmente com precisão cirúrgica onde o próximo caractere será inserido, eliminando fricção na digitação de 4 dígitos.',
  },
  {
    element: 'Password Dots Fill & Dynamic Validation Shake',
    trigger: 'Digitação de dígito no teclado numérico / Erro de validação',
    curve: 'cubic-bezier(0.36, 0.07, 0.19, 0.97)', // Rapid spring shake
    durationMs: 320,
    properties: 'scale(1 -> 1.35 -> 1.0), translateX(0 -> -8px -> 8px -> -4px -> 0px)',
    uxRationale:
      'O scale-up sutil confirma o toque na tecla virtual sem expor o número real. O shake lateral sinaliza violação de regra de segurança de forma intuitiva.',
  },
  {
    element: 'Teclado Numérico Customizado - Feedback de Toque',
    trigger: 'PointerDown em tecla numérica',
    curve: 'cubic-bezier(0.1, 0.9, 0.2, 1)',
    durationMs: 120,
    properties: 'transform: scale(0.94), background-color: rgba(234,60,54,0.08)',
    uxRationale:
      'Simula a física de um botão mecânico físico com resposta tátil visual imediata de baixa latência (<16ms).',
  },
  {
    element: 'Card de Vinculação à Carteira Digital (Slide-Up)',
    trigger: 'Entrada na Tela 3 (stagger delay de 350ms)',
    curve: 'cubic-bezier(0.16, 1, 0.3, 1)', // Apple Fluid Out
    durationMs: 500,
    properties: 'translateY(32px -> 0px), opacity(0 -> 1)',
    uxRationale:
      'Aparece hierarquicamente logo após o cartão estar ativo, transformando a euforia do momento em ação imediata de adoção de Apple Pay/Google Pay.',
  },
  {
    element: 'Badge "Cartão Ativo" Glow & Pop',
    trigger: 'Cartão atinge 0deg de rotação',
    curve: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', // Back Out with bounce
    durationMs: 400,
    properties: 'scale(0.5 -> 1.05 -> 1.0), box-shadow: 0 4px 14px rgba(16,185,129,0.3)',
    uxRationale:
      'Confirmação auditável imediata de status de conformidade operacional ("Active Card"), selando o ciclo de vida de ativação.',
  },
];

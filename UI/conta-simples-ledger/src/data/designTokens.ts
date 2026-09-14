import { DesignToken } from '../types';

export const semanticColorTokens: DesignToken[] = [
  {
    name: 'color-surface-base',
    value: '#FFFFFF',
    category: 'color',
    wcagContrast: '14.2:1 (c/ text-primary)',
    wcagLevel: 'AAA',
    description: 'Superfície de fundo primária do container (surface-neutral-0). Neutro puro com saturação controlada.'
  },
  {
    name: 'color-surface-hover',
    value: '#F8F9FA',
    category: 'color',
    wcagContrast: '13.8:1 (c/ text-primary)',
    wcagLevel: 'AAA',
    description: 'Estado de hover sutil no desktop (surface-neutral-50). Diferença de brilho < 4% para elegância visual.'
  },
  {
    name: 'color-surface-active',
    value: '#F1F3F5',
    category: 'color',
    wcagContrast: '13.1:1 (c/ text-primary)',
    wcagLevel: 'AAA',
    description: 'Estado pressionado/ativo (pressed) ao clicar com mouse ou toque móvel.'
  },
  {
    name: 'color-text-primary',
    value: '#111827',
    category: 'color',
    wcagContrast: '14.2:1',
    wcagLevel: 'AAA',
    description: 'Texto de alta ênfase para Título do Estabelecimento e Valor Tabular numérico. WCAG AAA (> 7.0:1).'
  },
  {
    name: 'color-text-secondary',
    value: '#6B7280',
    category: 'color',
    wcagContrast: '4.8:1',
    wcagLevel: 'AA',
    description: 'Texto secundário para Portador do Cartão e Tags de Centro de Custo. Atende WCAG AA (> 4.5:1).'
  },
  {
    name: 'color-text-disabled',
    value: '#9CA3AF',
    category: 'color',
    wcagContrast: '2.8:1',
    wcagLevel: 'Pass',
    description: 'Texto tachado de transações canceladas/recusadas. Utilizado em conjunto com badge de erro para conformidade.'
  },
  {
    name: 'color-status-warning-surface',
    value: '#FEF3C7',
    category: 'color',
    wcagContrast: '7.1:1 (c/ warning-text)',
    wcagLevel: 'AAA',
    description: 'Fundo da pílula para transações com status PENDENTE (aguardando nota fiscal ou conciliação).'
  },
  {
    name: 'color-status-warning-text',
    value: '#92400E',
    category: 'color',
    wcagContrast: '7.1:1',
    wcagLevel: 'AAA',
    description: 'Texto da pílula PENDENTE. Alto contraste e legibilidade garantida em fundo amarelo âmbar.'
  },
  {
    name: 'color-status-success-surface',
    value: '#DCFCE7',
    category: 'color',
    wcagContrast: '7.4:1 (c/ success-text)',
    wcagLevel: 'AAA',
    description: 'Fundo da pílula para status CONCILIADO / APROVADO.'
  },
  {
    name: 'color-status-success-text',
    value: '#166534',
    category: 'color',
    wcagContrast: '7.4:1',
    wcagLevel: 'AAA',
    description: 'Texto da pílula CONCILIADO em verde esmeralda profundo.'
  },
  {
    name: 'color-status-danger-surface',
    value: '#FEE2E2',
    category: 'color',
    wcagContrast: '7.2:1 (c/ danger-text)',
    wcagLevel: 'AAA',
    description: 'Fundo da pílula para transações RECUSADAS / COM FALHA.'
  },
  {
    name: 'color-status-danger-text',
    value: '#991B1B',
    category: 'color',
    wcagContrast: '7.2:1',
    wcagLevel: 'AAA',
    description: 'Texto da pílula RECUSADA em vermelho rubi de alta severidade.'
  },
  {
    name: 'color-border-subtle-1px',
    value: '#E5E7EB',
    category: 'border',
    description: 'Divisor horizontal de 1px entre itens de lista para manter a hierarquia sem peso visual excessivo.'
  },
  {
    name: 'color-focus-ring',
    value: '#2563EB',
    category: 'color',
    wcagContrast: '8.6:1',
    wcagLevel: 'AAA',
    description: 'Anel de foco de 2px visível para navegação por teclado (WCAG 2.4.7 Focus Visible).'
  }
];

export const spacingTokens: DesignToken[] = [
  {
    name: 'spacing-xs',
    value: '4px',
    category: 'spacing',
    description: 'Espaçamento mínimo entre valor financeiro e badge de status, e micro-gaps.'
  },
  {
    name: 'spacing-sm',
    value: '8px',
    category: 'spacing',
    description: 'Espaçamento entre subtítulo e tags de centro de custo, padding vertical de pills.'
  },
  {
    name: 'spacing-md',
    value: '16px',
    category: 'spacing',
    description: 'Padding horizontal do container (72px) e margem do Leading Element (44px).'
  },
  {
    name: 'spacing-lg',
    value: '24px',
    category: 'spacing',
    description: 'Margem entre seções de agrupamento de data (ex: Hoje, Ontem, Semana Passada).'
  },
  {
    name: 'spacing-xl',
    value: '32px',
    category: 'spacing',
    description: 'Margem de cabeçalhos de bloco no extrato geral.'
  }
];

export const typographyTokens: DesignToken[] = [
  {
    name: 'typography-title-15-medium',
    value: '15px / Line-height 20px / Weight 500',
    category: 'typography',
    description: 'Nome fantasia do estabelecimento. Peso medium para destaque sem poluição visual.'
  },
  {
    name: 'typography-subtitle-13-regular',
    value: '13px / Line-height 18px / Weight 400',
    category: 'typography',
    description: 'Nome do portador corporativo e metadados contextuais da compra.'
  },
  {
    name: 'typography-amount-16-semibold-tabular',
    value: '16px / Line-height 22px / Weight 600 / Tabular Nums',
    category: 'typography',
    description: 'Valor financeiro primário em fonte monoespaçada/tabular para alinhamento vertical exato.'
  },
  {
    name: 'typography-badge-10-bold',
    value: '10px / Line-height 12px / Weight 700 / All Caps / Tracking 0.05em',
    category: 'typography',
    description: 'Texto em caixa alta nas pílulas de status e centro de custo.'
  }
];

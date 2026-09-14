export type TransactionCategory =
  | 'alimentacao'
  | 'transporte'
  | 'lazer'
  | 'farmacia'
  | 'combustivel'
  | 'compras'
  | 'servicos';

export interface Transaction {
  id: string;
  merchant: string;
  category: TransactionCategory;
  installments: string; // ex: '2/6x', '1/3x', 'À vista'
  date: string; // ex: 'Hoje, 14:32', '12 Out', '09 Out'
  amount: number; // ex: 89.90
  cashback: number; // ex: 2.25
  cardType: 'fisico' | 'virtual';
  status: 'concluida' | 'pendente' | 'estornada';
  categoryLabel: string;
}

export interface InstallmentPlan {
  id: string;
  installments: number;
  installmentValue: number;
  total: number;
  cetMonthly: string;
  cetAnnual: string;
  interestRateMonthly: string;
  iof: number;
  isRecommended?: boolean;
  tag?: string;
}

export interface InvoiceData {
  userName: string;
  accountNumber: string;
  dueDate: string;
  status: 'Fatura aberta' | 'Fatura fechada' | 'Paga';
  currentSpent: number;
  totalLimit: number;
  availableLimit: number;
  cashbackBalance: number;
  cashbackPending: number;
  isCardBlocked: boolean;
  dailyLimit: number;
  cardNumberLast4: string;
}

export interface MonthlyHistory {
  month: string;
  label: string;
  amount: number;
  cashback: number;
  status: 'paga' | 'aberta' | 'futura';
}

export interface BacenAuditResult {
  status: 'approved' | 'warning';
  complianceScore: number;
  verdict: string;
  badges: string[];
  analysis: {
    criterion: string;
    status: 'compliant' | 'review';
    detail: string;
  }[];
  aiGenerated?: boolean;
}

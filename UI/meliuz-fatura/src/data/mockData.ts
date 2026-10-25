import { InvoiceData, Transaction, InstallmentPlan, MonthlyHistory } from '../types';

export const initialInvoiceData: InvoiceData = {
  userName: 'Rodrigo',
  accountNumber: 'Ag 0001 • C/C 482910-3',
  dueDate: '15 Out',
  status: 'Fatura aberta',
  currentSpent: 2450.80,
  totalLimit: 5000.00,
  availableLimit: 2549.20,
  cashbackBalance: 84.20,
  cashbackPending: 18.50,
  isCardBlocked: false,
  dailyLimit: 3500.00,
  cardNumberLast4: '8842',
};

export const mockTransactions: Transaction[] = [
  {
    id: 'tx-01',
    merchant: 'iFood *Restaurante Coco Bambu',
    category: 'alimentacao',
    categoryLabel: 'Alimentação',
    installments: 'À vista',
    date: 'Hoje, 13:15',
    amount: 184.50,
    cashback: 3.69,
    cardType: 'virtual',
    status: 'concluida',
  },
  {
    id: 'tx-02',
    merchant: 'Uber *Trip SP Centro',
    category: 'transporte',
    categoryLabel: 'Transporte',
    installments: 'À vista',
    date: 'Hoje, 09:40',
    amount: 38.90,
    cashback: 0.78,
    cardType: 'virtual',
    status: 'concluida',
  },
  {
    id: 'tx-03',
    merchant: 'Mercado Livre *EletroTech',
    category: 'compras',
    categoryLabel: 'Compras',
    installments: '2/6x',
    date: '12 Out',
    amount: 389.90,
    cashback: 7.80,
    cardType: 'virtual',
    status: 'concluida',
  },
  {
    id: 'tx-04',
    merchant: 'Droga Raia *Farmácia Jardins',
    category: 'farmacia',
    categoryLabel: 'Farmácia',
    installments: '1/3x',
    date: '11 Out',
    amount: 142.30,
    cashback: 4.27,
    cardType: 'fisico',
    status: 'concluida',
  },
  {
    id: 'tx-05',
    merchant: 'Posto Ipiranga *Combustível',
    category: 'combustivel',
    categoryLabel: 'Combustível',
    installments: 'À vista',
    date: '10 Out',
    amount: 220.00,
    cashback: 4.40,
    cardType: 'fisico',
    status: 'concluida',
  },
  {
    id: 'tx-06',
    merchant: 'Netflix.com *Assinatura Premium',
    category: 'lazer',
    categoryLabel: 'Lazer',
    installments: 'À vista',
    date: '08 Out',
    amount: 59.90,
    cashback: 1.20,
    cardType: 'virtual',
    status: 'concluida',
  },
  {
    id: 'tx-07',
    merchant: 'Smart Fit *Mensalidade Black',
    category: 'servicos',
    categoryLabel: 'Serviços',
    installments: 'À vista',
    date: '05 Out',
    amount: 129.90,
    cashback: 2.60,
    cardType: 'virtual',
    status: 'concluida',
  },
  {
    id: 'tx-08',
    merchant: 'Pão de Açúcar *Supermercado',
    category: 'alimentacao',
    categoryLabel: 'Alimentação',
    installments: '1/2x',
    date: '03 Out',
    amount: 412.80,
    cashback: 8.26,
    cardType: 'fisico',
    status: 'concluida',
  },
  {
    id: 'tx-09',
    merchant: 'Shell Box *Combustível V-Power',
    category: 'combustivel',
    categoryLabel: 'Combustível',
    installments: 'À vista',
    date: '01 Out',
    amount: 180.00,
    cashback: 5.40,
    cardType: 'virtual',
    status: 'concluida',
  },
  {
    id: 'tx-10',
    merchant: 'Zara Brasil *Shopping JK',
    category: 'compras',
    categoryLabel: 'Compras',
    installments: '3/5x',
    date: '28 Set',
    amount: 349.00,
    cashback: 6.98,
    cardType: 'fisico',
    status: 'concluida',
  },
  {
    id: 'tx-11',
    merchant: 'Decathlon Esportes *Campinas',
    category: 'compras',
    categoryLabel: 'Compras',
    installments: '2/4x',
    date: '25 Set',
    amount: 215.60,
    cashback: 4.31,
    cardType: 'fisico',
    status: 'concluida',
  },
  {
    id: 'tx-12',
    merchant: 'Spotify Premium *Plano Família',
    category: 'lazer',
    categoryLabel: 'Lazer',
    installments: 'À vista',
    date: '22 Set',
    amount: 34.90,
    cashback: 0.70,
    cardType: 'virtual',
    status: 'concluida',
  },
];

export const mockMonthlyHistory: MonthlyHistory[] = [
  { month: 'Maio', label: 'Mai', amount: 1940.20, cashback: 38.80, status: 'paga' },
  { month: 'Junho', label: 'Jun', amount: 2180.50, cashback: 43.61, status: 'paga' },
  { month: 'Julho', label: 'Jul', amount: 2520.00, cashback: 50.40, status: 'paga' },
  { month: 'Agosto', label: 'Ago', amount: 2110.30, cashback: 42.20, status: 'paga' },
  { month: 'Setembro', label: 'Set', amount: 2650.40, cashback: 53.00, status: 'paga' },
  { month: 'Outubro', label: 'Out', amount: 2450.80, cashback: 49.01, status: 'aberta' },
];

export const calculatePlansForEntry = (
  baseAmount: number,
  entry: number
): InstallmentPlan[] => {
  const principal = Math.max(0, baseAmount - entry);

  if (principal <= 0) {
    return [
      {
        id: 'plan-full',
        installments: 1,
        installmentValue: 0,
        total: entry,
        cetMonthly: '0,00% a.m.',
        cetAnnual: '0,00% a.a.',
        interestRateMonthly: '0,00% a.m.',
        iof: 0,
        isRecommended: true,
        tag: 'Quitado à vista',
      },
    ];
  }

  // 3x (juros 1.89% a.m.)
  const rate3 = 0.0189;
  const pmt3 = (principal * rate3) / (1 - Math.pow(1 + rate3, -3));
  const total3 = pmt3 * 3 + entry;

  // 6x (juros 1.89% a.m.)
  const rate6 = 0.0189;
  const pmt6 = (principal * rate6) / (1 - Math.pow(1 + rate6, -6));
  const total6 = pmt6 * 6 + entry;

  // 12x (juros 2.15% a.m.)
  const rate12 = 0.0215;
  const pmt12 = (principal * rate12) / (1 - Math.pow(1 + rate12, -12));
  const total12 = pmt12 * 12 + entry;

  return [
    {
      id: 'plan-3x',
      installments: 3,
      installmentValue: Math.round(pmt3 * 100) / 100,
      total: Math.round(total3 * 100) / 100,
      cetMonthly: '1,89% a.m.',
      cetAnnual: '25,18% a.a.',
      interestRateMonthly: '1,89% a.m.',
      iof: Math.round(principal * 0.0038 * 100) / 100,
      isRecommended: false,
      tag: 'Menor Custo Total',
    },
    {
      id: 'plan-6x',
      installments: 6,
      installmentValue: Math.round(pmt6 * 100) / 100,
      total: Math.round(total6 * 100) / 100,
      cetMonthly: '1,89% a.m.',
      cetAnnual: '25,18% a.a.',
      interestRateMonthly: '1,89% a.m.',
      iof: Math.round(principal * 0.0051 * 100) / 100,
      isRecommended: true,
      tag: 'Mais recomendada',
    },
    {
      id: 'plan-12x',
      installments: 12,
      installmentValue: Math.round(pmt12 * 100) / 100,
      total: Math.round(total12 * 100) / 100,
      cetMonthly: '2,15% a.m.',
      cetAnnual: '29,08% a.a.',
      interestRateMonthly: '2,15% a.m.',
      iof: Math.round(principal * 0.0076 * 100) / 100,
      isRecommended: false,
      tag: 'Menor Parcela',
    },
  ];
};

// Plans with no down payment: same Price formula as any other entry value.
export const baseInstallmentPlans: InstallmentPlan[] = calculatePlansForEntry(initialInvoiceData.currentSpent, 0);

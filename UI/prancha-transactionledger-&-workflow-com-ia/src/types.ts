/**
 * Conta Simples Design System (Andes Pattern)
 * Definições de Tipos para a Família de Componentes TransactionLedger
 */

export type TransactionStatus = 'pending' | 'approved' | 'declined' | 'refunded';
export type TransactionVariant = 'default' | 'compact' | 'detailed';
export type CurrencyCode = 'BRL' | 'USD' | 'EUR';
export type InteractiveState = 'default' | 'hover' | 'active' | 'focus';

export interface CostCenter {
  code: string;
  name: string;
  tagColor?: string;
}

export interface ForeignExchangeData {
  originalAmount: number;
  originalCurrency: CurrencyCode;
  exchangeRate: number;
  iofPercentage: number;
  iofAmount: number;
  spreadPercentage: number;
  finalBrlAmount: number;
}

export interface TransactionItem {
  id: string;
  merchantName: string;
  merchantCategory: 'cloud' | 'fuel' | 'food' | 'transport' | 'office' | 'services';
  cardholderName: string;
  cardLastDigits: string;
  costCenter: CostCenter;
  amount: number;
  currency: CurrencyCode;
  status: TransactionStatus;
  date: string;
  time: string;
  isInternational: boolean;
  foreignExchange?: ForeignExchangeData;
  declineReason?: string;
  accessibilityLabel: string;
  receiptAttached?: boolean;
}

export interface DesignToken {
  name: string;
  value: string;
  category: 'color' | 'spacing' | 'typography' | 'border' | 'radius' | 'elevation';
  wcagContrast?: string;
  wcagLevel?: 'AAA' | 'AA' | 'Pass';
  description: string;
}

export interface AnatomyPoint {
  id: number;
  title: string;
  spec: string;
  tokens: string[];
  dimensions: string;
  description: string;
}

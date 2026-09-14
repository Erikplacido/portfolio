import React from 'react';
import {
  Eye,
  EyeOff,
  Settings,
  Sliders,
  CreditCard,
  Lock,
  Unlock,
  Coins,
  ChevronRight,
  ShieldCheck,
  Flame,
} from 'lucide-react';
import { InvoiceData, Transaction } from '../types';
import { maskValue, formatBRL } from '../utils/formatters';
import { getCategoryIcon, getCategoryColors } from './CategoryBadge';

interface MobileScreen1Props {
  invoiceData: InvoiceData;
  transactions: Transaction[];
  isMasked: boolean;
  onToggleMask: () => void;
  onOpenSimulator: () => void;
  onOpenPayModal: () => void;
  onOpenAdjustLimit: () => void;
  onOpenVirtualCard: () => void;
  onToggleBlockCard: () => void;
  onOpenCashback: () => void;
  onOpenSettings?: () => void;
  onViewAllTransactions?: () => void;
}

export const MobileScreen1: React.FC<MobileScreen1Props> = ({
  invoiceData,
  transactions,
  isMasked,
  onToggleMask,
  onOpenSimulator,
  onOpenPayModal,
  onOpenAdjustLimit,
  onOpenVirtualCard,
  onToggleBlockCard,
  onOpenCashback,
  onOpenSettings,
  onViewAllTransactions,
}) => {
  const percentSpent = Math.min(
    100,
    Math.round((invoiceData.currentSpent / invoiceData.totalLimit) * 100)
  );

  return (
    <div className="w-[390px] h-[844px] bg-[#F8F9FA] text-[#1E293B] flex flex-col font-sans relative overflow-hidden shadow-2xl rounded-[44px] border-[8px] border-[#1C1F26] select-none">
      {/* iOS Status Bar Simulation */}
      <div className="h-11 px-7 flex items-center justify-between text-xs font-semibold text-slate-800 shrink-0 z-10">
        <span>09:41</span>
        {/* Dynamic Island / Camera cutout */}
        <div className="w-24 h-4 bg-[#1C1F26] rounded-full mx-auto" />
        <div className="flex items-center gap-1.5 text-[10px]">
          <span>5G</span>
          <div className="w-4 h-2.5 border border-slate-700 rounded-sm p-0.5 flex items-center">
            <div className="w-full h-full bg-slate-800 rounded-[1px]" />
          </div>
        </div>
      </div>

      {/* Mobile Header */}
      <div className="px-5 pt-1 pb-3 flex items-center justify-between shrink-0 bg-[#F8F9FA]">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#ED004B] to-[#FF4D80] p-[2px] flex items-center justify-center shadow-sm">
              <div className="w-full h-full rounded-full bg-[#1E293B] flex items-center justify-center text-white font-bold text-sm">
                RS
              </div>
            </div>
            <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <img src="./logo-meliuz-icon.png" alt="Méliuz" className="w-3.5 h-3.5 rounded-xs object-contain" />
              <span className="text-xs text-slate-500 font-medium">Conta Méliuz</span>
            </div>
            <span className="text-base font-bold text-slate-900 tracking-tight">
              Olá, {invoiceData.userName}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            id="mobile-toggle-mask-btn"
            onClick={onToggleMask}
            className="w-9 h-9 rounded-full bg-white border border-slate-200/80 flex items-center justify-center text-slate-600 hover:text-[#ED004B] active:scale-95 transition-all shadow-xs"
            title={isMasked ? 'Mostrar valores' : 'Ocultar dados'}
            aria-label="Alternar visibilidade de valores"
          >
            {isMasked ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
          <button
            id="mobile-settings-btn"
            onClick={onOpenSettings}
            className="w-9 h-9 rounded-full bg-white border border-slate-200/80 flex items-center justify-center text-slate-600 hover:text-[#ED004B] active:scale-95 transition-all shadow-xs"
            aria-label="Configurações da conta"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Scrollable Content Area */}
      <div className="flex-1 overflow-y-auto px-4 pb-6 space-y-4 scrollbar-none">
        {/* Card Principal (Fatura Atual) */}
        <div
          id="mobile-invoice-card"
          className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-sm relative overflow-hidden"
        >
          {/* Status Label */}
          <div className="flex items-center justify-between mb-2">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-pink-50 border border-pink-100 text-[#ED004B] text-xs font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ED004B] animate-pulse" />
              <span>{invoiceData.status} • Vencimento em {invoiceData.dueDate}</span>
            </div>
            <span className="text-[11px] font-medium text-slate-400">Mastercard Black</span>
          </div>

          {/* Featured Numerical Value (32px Bold) */}
          <div className="mt-2">
            <span className="text-xs text-slate-500 font-medium block">Valor da fatura</span>
            <div className="text-[32px] font-extrabold tracking-tight text-slate-900 leading-none mt-1 font-mono">
              {maskValue(invoiceData.currentSpent, isMasked)}
            </div>
          </div>

          {/* Barra de Progresso Bicolor (Limite de Crédito) */}
          <div className="mt-4 pt-3 border-t border-slate-100">
            <div className="flex items-center justify-between text-xs font-medium text-slate-600 mb-1.5">
              <span>
                <strong className="text-slate-900 font-semibold font-mono">
                  {maskValue(invoiceData.currentSpent, isMasked)}
                </strong>{' '}
                gastos de{' '}
                <span className="text-slate-500 font-mono">
                  {maskValue(invoiceData.totalLimit, isMasked)}
                </span>{' '}
                total
              </span>
              <span className="text-[#ED004B] font-semibold text-[11px]">
                {percentSpent}%
              </span>
            </div>

            {/* Barra de 8px bicolor */}
            <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden flex">
              <div
                className="h-full bg-gradient-to-r from-[#ED004B] to-[#FF3366] rounded-full transition-all duration-500"
                style={{ width: `${percentSpent}%` }}
              />
            </div>

            {/* Texto de apoio */}
            <div className="flex items-center justify-between mt-2 text-xs">
              <span className="text-slate-500">
                Limite disponível:{' '}
                <strong className="text-emerald-600 font-semibold font-mono">
                  {maskValue(invoiceData.availableLimit, isMasked)}
                </strong>
              </span>
              <button
                onClick={onOpenAdjustLimit}
                className="text-[11px] text-[#ED004B] font-semibold hover:underline"
              >
                Ajustar
              </button>
            </div>
          </div>

          {/* Grupo de Ações Principais */}
          <div className="grid grid-cols-2 gap-2.5 mt-4 pt-1">
            <button
              id="mobile-pay-invoice-btn"
              onClick={onOpenPayModal}
              className="w-full py-2.5 px-3 rounded-xl bg-[#ED004B] hover:bg-[#D40043] active:scale-[0.98] text-white text-xs font-bold transition-all shadow-sm shadow-[#ED004B]/30 flex items-center justify-center gap-1.5"
            >
              <span>Pagar fatura</span>
            </button>
            <button
              id="mobile-simulate-installments-btn"
              onClick={onOpenSimulator}
              className="w-full py-2.5 px-3 rounded-xl border border-[#ED004B] hover:bg-pink-50/70 active:scale-[0.98] text-[#ED004B] text-xs font-bold transition-all flex items-center justify-center gap-1.5"
            >
              <span>Parcelar fatura</span>
            </button>
          </div>
        </div>

        {/* Card de Alerta se cartão bloqueado */}
        {invoiceData.isCardBlocked && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 flex items-center justify-between text-xs text-amber-900 animate-fadeIn">
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-amber-600 shrink-0" />
              <span>Cartão temporariamente bloqueado para compras.</span>
            </div>
            <button
              onClick={onToggleBlockCard}
              className="font-bold text-amber-700 underline shrink-0 ml-2"
            >
              Desbloquear
            </button>
          </div>
        )}

        {/* Carrossel Horizontal de Atalhos (Pills) */}
        <div>
          <div className="flex items-center justify-between px-1 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Atalhos Rápidos
            </span>
            <span className="text-[10px] text-slate-400">Arraste para o lado</span>
          </div>

          <div className="flex items-center gap-2.5 overflow-x-auto pb-1 pt-0.5 px-0.5 scrollbar-none">
            {/* Pill 1: Ajustar Limite */}
            <button
              id="pill-adjust-limit"
              onClick={onOpenAdjustLimit}
              className="flex flex-col items-center justify-center w-[78px] shrink-0 p-2 rounded-2xl bg-white border border-slate-200/80 hover:border-[#ED004B]/50 active:scale-95 transition-all shadow-2xs"
            >
              <div className="w-10 h-10 rounded-full bg-pink-50 text-[#ED004B] flex items-center justify-center mb-1.5">
                <Sliders className="w-4 h-4" />
              </div>
              <span className="text-[11px] font-semibold text-slate-800 text-center leading-tight">
                Ajustar limite
              </span>
            </button>

            {/* Pill 2: Cartão Virtual */}
            <button
              id="pill-virtual-card"
              onClick={onOpenVirtualCard}
              className="flex flex-col items-center justify-center w-[78px] shrink-0 p-2 rounded-2xl bg-white border border-slate-200/80 hover:border-[#ED004B]/50 active:scale-95 transition-all shadow-2xs"
            >
              <div className="w-10 h-10 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center mb-1.5">
                <CreditCard className="w-4 h-4" />
              </div>
              <span className="text-[11px] font-semibold text-slate-800 text-center leading-tight">
                Cartão virtual
              </span>
            </button>

            {/* Pill 3: Bloqueio Temporário */}
            <button
              id="pill-block-card"
              onClick={onToggleBlockCard}
              className={`flex flex-col items-center justify-center w-[78px] shrink-0 p-2 rounded-2xl bg-white border transition-all shadow-2xs ${
                invoiceData.isCardBlocked
                  ? 'border-amber-400 bg-amber-50/50'
                  : 'border-slate-200/80 hover:border-[#ED004B]/50 active:scale-95'
              }`}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center mb-1.5 ${
                  invoiceData.isCardBlocked
                    ? 'bg-amber-100 text-amber-700'
                    : 'bg-slate-100 text-slate-700'
                }`}
              >
                {invoiceData.isCardBlocked ? (
                  <Lock className="w-4 h-4" />
                ) : (
                  <Unlock className="w-4 h-4" />
                )}
              </div>
              <span className="text-[11px] font-semibold text-slate-800 text-center leading-tight">
                {invoiceData.isCardBlocked ? 'Desbloquear' : 'Bloqueio temp.'}
              </span>
            </button>

            {/* Pill 4: Cashback Acumulado */}
            <button
              id="pill-cashback"
              onClick={onOpenCashback}
              className="flex flex-col items-center justify-center w-[78px] shrink-0 p-2 rounded-2xl bg-white border border-slate-200/80 hover:border-emerald-400 active:scale-95 transition-all shadow-2xs relative"
            >
              <img src="./logo-meliuz-icon.png" alt="Méliuz" className="absolute -top-1 -right-1 w-4 h-4 rounded-full shadow-xs object-cover" />
              <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mb-1.5">
                <Coins className="w-4 h-4" />
              </div>
              <span className="text-[11px] font-semibold text-slate-800 text-center leading-tight">
                Cashback
              </span>
            </button>
          </div>
        </div>

        {/* Card Destaque Cashback Méliuz */}
        <div
          onClick={onOpenCashback}
          className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white rounded-2xl p-3.5 shadow-sm flex items-center justify-between cursor-pointer active:scale-[0.99] transition-transform"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center backdrop-blur-xs">
              <Flame className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <span className="text-[11px] font-medium text-emerald-100 block">
                Cashback disponível para resgate
              </span>
              <div className="text-base font-extrabold font-mono">
                {maskValue(invoiceData.cashbackBalance, isMasked)}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1 text-xs font-semibold bg-white/20 px-2.5 py-1 rounded-full text-white">
            <span>Resgatar</span>
            <ChevronRight className="w-3 h-3" />
          </div>
        </div>

        {/* Feed de Transações Recentes */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-sm">
          {/* Cabeçalho de Seção */}
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-slate-900 tracking-tight">
              Lançamentos recentes
            </h3>
            <button
              onClick={onViewAllTransactions}
              className="text-xs font-bold text-[#ED004B] hover:underline inline-flex items-center gap-0.5"
            >
              <span>Ver extrato completo</span>
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>

          {/* Lista de Transações */}
          <div className="divide-y divide-slate-100">
            {transactions.slice(0, 5).map((tx) => {
              const Icon = getCategoryIcon(tx.category);
              const colors = getCategoryColors(tx.category);

              return (
                <div
                  key={tx.id}
                  className="py-2.5 flex items-center justify-between group hover:bg-slate-50/50 rounded-lg px-1 transition-colors"
                >
                  <div className="flex items-center gap-3 min-w-0 pr-2">
                    <div
                      className={`w-9 h-9 rounded-full ${colors.bg} ${colors.text} flex items-center justify-center shrink-0 border ${colors.border}`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="min-w-0 flex flex-col">
                      <span className="text-xs font-bold text-slate-900 truncate leading-tight">
                        {tx.merchant}
                      </span>
                      <span className="text-[11px] text-slate-500 font-medium">
                        {tx.date} •{' '}
                        <span className="text-slate-600 font-semibold">{tx.installments}</span>
                      </span>
                    </div>
                  </div>

                  {/* Valores formatados em fonte mono-espaçada/tabular alinhados à direita */}
                  <div className="text-right shrink-0 flex flex-col items-end">
                    <span className="text-xs font-bold text-slate-900 font-mono tracking-tight">
                      - {maskValue(tx.amount, isMasked)}
                    </span>
                    <span className="text-[10px] font-semibold text-emerald-600 font-mono">
                      +{maskValue(tx.cashback, isMasked)} cashback
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* iOS Home Indicator bar */}
      <div className="h-6 w-full flex items-center justify-center shrink-0 bg-[#F8F9FA]">
        <div className="w-32 h-1 bg-slate-300 rounded-full" />
      </div>
    </div>
  );
};

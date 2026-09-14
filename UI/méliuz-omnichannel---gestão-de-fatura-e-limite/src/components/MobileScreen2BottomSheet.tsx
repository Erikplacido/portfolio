import React, { useState } from 'react';
import {
  X,
  CheckCircle2,
  ShieldAlert,
  Sparkles,
  Info,
  ArrowRight,
  ShieldCheck,
  ChevronDown,
} from 'lucide-react';
import { InstallmentPlan } from '../types';
import { formatBRL } from '../utils/formatters';

interface MobileScreen2BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  baseAmount: number;
  plans: InstallmentPlan[];
  selectedPlanId: string;
  onSelectPlan: (planId: string) => void;
  entryValue: number;
  onChangeEntryValue: (val: number) => void;
  onConfirmInstallment: (plan: InstallmentPlan, entry: number) => void;
  onTriggerBacenAudit: () => void;
}

export const MobileScreen2BottomSheet: React.FC<MobileScreen2BottomSheetProps> = ({
  isOpen,
  onClose,
  baseAmount,
  plans,
  selectedPlanId,
  onSelectPlan,
  entryValue,
  onChangeEntryValue,
  onConfirmInstallment,
  onTriggerBacenAudit,
}) => {
  const [customEntryInput, setCustomEntryInput] = useState<string>(
    entryValue > 0 ? entryValue.toString() : ''
  );
  const [showBacenDetails, setShowBacenDetails] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const currentSelectedPlan = plans.find((p) => p.id === selectedPlanId) || plans[1] || plans[0];

  const handleChipClick = (amount: number) => {
    onChangeEntryValue(amount);
    setCustomEntryInput(amount > 0 ? amount.toString() : '');
  };

  const handleCustomInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '');
    const num = raw ? parseFloat(raw) / 100 : 0;
    if (num < baseAmount) {
      setCustomEntryInput(num > 0 ? num.toFixed(2) : '');
      onChangeEntryValue(num);
    }
  };

  const handleConfirm = () => {
    if (currentSelectedPlan) {
      setIsSuccess(true);
      setTimeout(() => {
        onConfirmInstallment(currentSelectedPlan, entryValue);
        setIsSuccess(false);
      }, 1800);
    }
  };

  return (
    <div
      id="mobile-bottom-sheet-container"
      className="absolute inset-0 z-50 flex flex-col justify-end bg-black/60 backdrop-blur-xs transition-opacity duration-300 rounded-[44px] overflow-hidden"
    >
      {/* Click outside backdrop to close */}
      <div className="flex-1 w-full" onClick={onClose} />

      {/* Elevated Bottom Sheet Surface */}
      <div
        id="bottom-sheet-content"
        className="w-full max-h-[88%] bg-white rounded-t-[28px] shadow-2xl flex flex-col border-t border-slate-200 animate-slideUp relative overflow-hidden"
      >
        {/* Header do Modal */}
        <div className="pt-3 px-5 pb-3 border-b border-slate-100 flex flex-col items-center relative shrink-0">
          {/* Indicador de arraste (pill drag handle) */}
          <div className="w-12 h-1.5 bg-slate-300 rounded-full mb-3" />

          <div className="w-full flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900 tracking-tight">
                Opções de parcelamento
              </h2>
              <span className="text-xs text-slate-500">
                Fatura de {formatBRL(baseAmount)} • Venc. 15 Out
              </span>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:text-slate-800 active:scale-95 transition-all"
              aria-label="Fechar opções de parcelamento"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Form Content */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4 scrollbar-none">
          {/* Card Resumo de Entrada */}
          <div className="bg-slate-50 rounded-2xl p-3.5 border border-slate-200/80">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-700">
                Valor de entrada
              </span>
              <span className="text-[11px] text-slate-500">
                Amortiza os juros futuros
              </span>
            </div>

            {/* Input field formatado */}
            <div className="relative mb-2.5">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">
                R$
              </span>
              <input
                id="installment-entry-input"
                type="text"
                value={customEntryInput ? parseFloat(customEntryInput).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '0,00'}
                onChange={handleCustomInputChange}
                placeholder="0,00"
                className="w-full pl-9 pr-3 py-2 text-sm font-bold font-mono text-slate-900 bg-white border border-slate-300 rounded-xl focus:outline-hidden focus:border-[#ED004B] focus:ring-1 focus:ring-[#ED004B]"
              />
            </div>

            {/* Atalhos rápidos em chips */}
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => handleChipClick(0)}
                className={`px-3 py-1 text-xs font-semibold rounded-full border transition-all ${
                  entryValue === 0
                    ? 'bg-[#ED004B] text-white border-[#ED004B] shadow-2xs'
                    : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
                }`}
              >
                Sem entrada
              </button>
              <button
                type="button"
                onClick={() => handleChipClick(300)}
                className={`px-3 py-1 text-xs font-semibold rounded-full border transition-all ${
                  entryValue === 300
                    ? 'bg-[#ED004B] text-white border-[#ED004B] shadow-2xs'
                    : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
                }`}
              >
                R$ 300
              </button>
              <button
                type="button"
                onClick={() => handleChipClick(500)}
                className={`px-3 py-1 text-xs font-semibold rounded-full border transition-all ${
                  entryValue === 500
                    ? 'bg-[#ED004B] text-white border-[#ED004B] shadow-2xs'
                    : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
                }`}
              >
                R$ 500
              </button>
            </div>
          </div>

          {/* Seletor de Planos (Lista de Cards Selecionáveis) */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between px-1">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Selecione o plano
              </span>
              <span className="text-[11px] text-slate-500">
                Teto BACEN cumprido
              </span>
            </div>

            {plans.map((plan) => {
              const isSelected = plan.id === selectedPlanId;

              return (
                <div
                  key={plan.id}
                  id={`plan-card-${plan.id}`}
                  onClick={() => onSelectPlan(plan.id)}
                  className={`relative p-3.5 rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'border-[#ED004B] bg-pink-50/40 ring-1 ring-[#ED004B] shadow-xs'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  {/* Destaque Visual 'Mais recomendada' */}
                  {plan.isRecommended && (
                    <span className="absolute -top-2.5 right-4 px-2.5 py-0.5 rounded-full bg-[#ED004B] text-white text-[10px] font-bold shadow-2xs flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      <span>Mais recomendada</span>
                    </span>
                  )}

                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      {/* Radio button customizado */}
                      <div
                        className={`w-5 h-5 rounded-full mt-0.5 border flex items-center justify-center transition-all ${
                          isSelected
                            ? 'border-[#ED004B] bg-[#ED004B]'
                            : 'border-slate-300 bg-white'
                        }`}
                      >
                        {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                      </div>

                      <div className="flex flex-col">
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-sm font-extrabold text-slate-900">
                            {plan.installments}x de
                          </span>
                          <span className="text-base font-black text-slate-900 font-mono">
                            {formatBRL(plan.installmentValue)}
                          </span>
                        </div>

                        <div className="text-xs text-slate-500 mt-0.5">
                          Total a pagar:{' '}
                          <strong className="text-slate-800 font-semibold font-mono">
                            {formatBRL(plan.total)}
                          </strong>
                        </div>
                      </div>
                    </div>

                    {/* Taxa CET tag */}
                    <div className="text-right">
                      <span className="text-[11px] font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md block">
                        CET {plan.cetMonthly}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quadro de Transparência Regulatória (Banco Central) */}
          <div className="bg-slate-100/90 rounded-2xl p-3.5 border border-slate-200 text-slate-700">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span className="text-xs font-bold text-slate-900">
                  Transparência Regulatória Bacen
                </span>
              </div>
              <button
                onClick={() => setShowBacenDetails(!showBacenDetails)}
                className="text-[11px] text-[#ED004B] font-semibold flex items-center gap-0.5 hover:underline"
              >
                <span>{showBacenDetails ? 'Ocultar' : 'Detalhes'}</span>
                <ChevronDown
                  className={`w-3 h-3 transition-transform ${
                    showBacenDetails ? 'rotate-180' : ''
                  }`}
                />
              </button>
            </div>

            <p className="text-[11px] text-slate-600 leading-relaxed">
              Discriminação integral conforme Resolução CMN nº 4.549/2017 e Lei nº 14.690/2023.
              Sem taxas embutidas ou surpresas na fatura.
            </p>

            <div className="grid grid-cols-3 gap-2 mt-2.5 pt-2.5 border-t border-slate-200/80 text-center">
              <div className="bg-white rounded-lg p-1.5 border border-slate-200/70">
                <span className="text-[10px] text-slate-500 block">IOF apurado</span>
                <strong className="text-xs font-bold text-slate-900 font-mono">
                  {formatBRL(currentSelectedPlan?.iof || 12.4)}
                </strong>
              </div>
              <div className="bg-white rounded-lg p-1.5 border border-slate-200/70">
                <span className="text-[10px] text-slate-500 block">Juros nominais</span>
                <strong className="text-xs font-bold text-slate-900 font-mono">
                  {currentSelectedPlan?.interestRateMonthly || '1,89% a.m.'}
                </strong>
              </div>
              <div className="bg-white rounded-lg p-1.5 border border-slate-200/70">
                <span className="text-[10px] text-slate-500 block">CET Anual</span>
                <strong className="text-xs font-bold text-slate-900 font-mono">
                  {currentSelectedPlan?.cetAnnual || '25,18% a.a.'}
                </strong>
              </div>
            </div>

            {/* AI Audit Action Button */}
            <div className="mt-3 pt-2 border-t border-slate-200 flex items-center justify-between">
              <span className="text-[11px] text-slate-500 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-[#ED004B]" />
                <span>Auditoria Bacen Google AI</span>
              </span>
              <button
                id="btn-trigger-ai-bacen-audit"
                onClick={onTriggerBacenAudit}
                className="text-xs font-bold text-[#ED004B] bg-white border border-pink-200 hover:bg-pink-50 px-2.5 py-1 rounded-lg transition-colors flex items-center gap-1"
              >
                <span>Auditar agora</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>

        {/* Botão Fixo no Rodapé */}
        <div className="p-4 border-t border-slate-100 bg-white shrink-0">
          <button
            id="mobile-confirm-installment-btn"
            disabled={isSuccess}
            onClick={handleConfirm}
            className="w-full py-3 px-4 rounded-xl bg-[#ED004B] hover:bg-[#D00041] active:scale-[0.98] text-white text-sm font-bold transition-all shadow-md shadow-[#ED004B]/30 flex items-center justify-center gap-2 disabled:opacity-80"
          >
            {isSuccess ? (
              <>
                <CheckCircle2 className="w-4 h-4 animate-bounce" />
                <span>Parcelamento contratado com sucesso!</span>
              </>
            ) : (
              <>
                <span>
                  Confirmar parcelamento em {currentSelectedPlan?.installments}x
                </span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

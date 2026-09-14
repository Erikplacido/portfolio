import React, { useState, useMemo } from 'react';
import {
  Smartphone,
  Monitor,
  Layers,
  Sparkles,
  Eye,
  EyeOff,
  Lock,
  Unlock,
  RotateCcw,
  Scale,
  Maximize2,
  ZoomIn,
  ZoomOut,
  Info,
} from 'lucide-react';
import {
  initialInvoiceData,
  mockTransactions,
  baseInstallmentPlans,
  mockMonthlyHistory,
  calculatePlansForEntry,
} from './data/mockData';
import { InvoiceData, InstallmentPlan } from './types';
import { MobileScreen1 } from './components/MobileScreen1';
import { MobileScreen2BottomSheet } from './components/MobileScreen2BottomSheet';
import { DesktopScreen3 } from './components/DesktopScreen3';
import { BacenAuditModal } from './components/BacenAuditModal';
import { PayInvoiceModal } from './components/PayInvoiceModal';
import { VirtualCardModal } from './components/VirtualCardModal';
import { AdjustLimitModal } from './components/AdjustLimitModal';
import { CashbackModal } from './components/CashbackModal';
import { MeliuzLogo } from './components/MeliuzLogo';

type ViewMode = 'omnichannel' | 'mobile1' | 'mobile2' | 'desktop';

export default function App() {
  const [viewMode, setViewMode] = useState<ViewMode>('omnichannel');
  const [invoiceData, setInvoiceData] = useState<InvoiceData>(initialInvoiceData);
  const [isMasked, setIsMasked] = useState(false);

  // Installment Simulator State
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [entryValue, setEntryValue] = useState(0);
  const [selectedPlanId, setSelectedPlanId] = useState('plan-6x');

  // Modals state
  const [isBacenModalOpen, setIsBacenModalOpen] = useState(false);
  const [isPayModalOpen, setIsPayModalOpen] = useState(false);
  const [isVirtualCardOpen, setIsVirtualCardOpen] = useState(false);
  const [isAdjustLimitOpen, setIsAdjustLimitOpen] = useState(false);
  const [isCashbackOpen, setIsCashbackOpen] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  // Calculated installment plans based on entry value
  const currentPlans = useMemo(() => {
    return calculatePlansForEntry(invoiceData.currentSpent, entryValue);
  }, [invoiceData.currentSpent, entryValue]);

  const selectedPlan = useMemo(() => {
    return currentPlans.find((p) => p.id === selectedPlanId) || currentPlans[1] || currentPlans[0];
  }, [currentPlans, selectedPlanId]);

  const showToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3500);
  };

  // Handlers for state updates
  const handleToggleMask = () => {
    setIsMasked((prev) => !prev);
  };

  const handleToggleBlockCard = () => {
    setInvoiceData((prev) => {
      const nextBlocked = !prev.isCardBlocked;
      showToast(
        nextBlocked
          ? 'Cartão Méliuz temporariamente bloqueado para compras.'
          : 'Cartão Méliuz desbloqueado com sucesso.'
      );
      return { ...prev, isCardBlocked: nextBlocked };
    });
  };

  const handleUpdateDailyLimit = (val: number) => {
    setInvoiceData((prev) => ({
      ...prev,
      dailyLimit: val,
    }));
  };

  const handleConfirmInstallment = (plan: InstallmentPlan, entry: number) => {
    showToast(
      `Parcelamento contratado com sucesso: ${plan.installments}x de R$ ${plan.installmentValue.toFixed(2)}.`
    );
    setIsBottomSheetOpen(false);
    setInvoiceData((prev) => ({
      ...prev,
      status: 'Fatura fechada',
      currentSpent: entry,
      availableLimit: prev.totalLimit - entry,
    }));
  };

  const handleConfirmPayment = () => {
    showToast('Pagamento da fatura confirmado com sucesso! Limite restabelecido.');
    setInvoiceData((prev) => ({
      ...prev,
      status: 'Paga',
      currentSpent: 0,
      availableLimit: prev.totalLimit,
    }));
  };

  const handleRedeemCashback = () => {
    showToast(`Resgate de R$ ${invoiceData.cashbackBalance.toFixed(2)} enviado via Pix!`);
    setInvoiceData((prev) => ({
      ...prev,
      cashbackBalance: 0,
    }));
  };

  const handleResetData = () => {
    setInvoiceData(initialInvoiceData);
    setEntryValue(0);
    setSelectedPlanId('plan-6x');
    setIsMasked(false);
    showToast('Dados e simulação restaurados para o padrão original Méliuz.');
  };

  return (
    <div className="min-h-screen bg-[#0F1117] text-slate-100 flex flex-col font-sans selection:bg-[#ED004B] selection:text-white">
      {/* Top Application Navigation Bar & Workbench Controls */}
      <header className="h-16 px-6 bg-[#161922] border-b border-slate-800 flex items-center justify-between shrink-0 z-40 sticky top-0 shadow-lg">
        {/* Brand & Project Scope */}
        <div className="flex items-center gap-4">
          <MeliuzLogo theme="dark" showBadge={true} />
          <div className="h-5 w-px bg-slate-700 hidden md:block" />
          <div className="hidden lg:flex flex-col">
            <span className="text-xs font-bold text-white tracking-tight">
              Gestão de Fatura, Limite Dinâmico & Parcelamento
            </span>
            <span className="text-[11px] text-slate-400">
              Omnichannel: Paridade Mobile (390×844) e Desktop Web (1440×900)
            </span>
          </div>
        </div>

        {/* View Mode Switcher */}
        <div className="flex items-center bg-[#1F2430] p-1 rounded-xl border border-slate-700/80 text-xs font-semibold">
          <button
            id="view-mode-omnichannel"
            onClick={() => setViewMode('omnichannel')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
              viewMode === 'omnichannel'
                ? 'bg-[#ED004B] text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Visão Omnichannel (3 Telas)</span>
            <span className="sm:hidden">Todas</span>
          </button>

          <button
            id="view-mode-mobile1"
            onClick={() => setViewMode('mobile1')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
              viewMode === 'mobile1'
                ? 'bg-[#ED004B] text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Tela 1 (Mobile)</span>
          </button>

          <button
            id="view-mode-mobile2"
            onClick={() => {
              setViewMode('mobile2');
              setIsBottomSheetOpen(true);
            }}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
              viewMode === 'mobile2'
                ? 'bg-[#ED004B] text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5 text-pink-400" />
            <span>Tela 2 (Simulador)</span>
          </button>

          <button
            id="view-mode-desktop"
            onClick={() => setViewMode('desktop')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
              viewMode === 'desktop'
                ? 'bg-[#ED004B] text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Monitor className="w-3.5 h-3.5" />
            <span>Tela 3 (Desktop)</span>
          </button>
        </div>

        {/* Global Action Tools */}
        <div className="flex items-center gap-2">
          {/* AI Audit Bacen Trigger */}
          <button
            id="global-bacen-audit-btn"
            onClick={() => setIsBacenModalOpen(true)}
            className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-[#ED004B]/20 to-purple-600/20 border border-[#ED004B]/40 hover:border-[#ED004B] text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span className="hidden md:inline">Auditoria Bacen</span>
            <span className="text-[10px] bg-[#ED004B] px-1.5 py-0.2 rounded-full">AI</span>
          </button>

          {/* Mask toggle */}
          <button
            onClick={handleToggleMask}
            className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700 hover:bg-slate-700 text-slate-300 flex items-center justify-center transition-colors"
            title={isMasked ? 'Mostrar valores' : 'Ocultar valores'}
          >
            {isMasked ? <EyeOff className="w-4 h-4 text-amber-400" /> : <Eye className="w-4 h-4" />}
          </button>

          {/* Reset button */}
          <button
            onClick={handleResetData}
            className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700 hover:bg-slate-700 text-slate-300 flex items-center justify-center transition-colors"
            title="Resetar dados para estado original"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Floating Toast Notification */}
      {notification && (
        <div className="fixed top-20 right-6 z-50 bg-[#1E293B] text-white border border-[#ED004B] px-4 py-2.5 rounded-xl shadow-2xl flex items-center gap-2.5 text-xs font-semibold animate-slideDown">
          <span className="w-2 h-2 rounded-full bg-[#ED004B] animate-ping" />
          <span>{notification}</span>
        </div>
      )}

      {/* Main Workspace Stage */}
      <main className="flex-1 overflow-x-auto overflow-y-auto p-6 flex flex-col items-center justify-center">
        {/* 1. VISÃO OMNICHANNEL (3 TELAS LADO A LADO) */}
        {viewMode === 'omnichannel' && (
          <div className="flex flex-col items-center w-full max-w-[1720px] space-y-6">
            {/* Header explicativo para o avaliador */}
            <div className="w-full bg-[#181B24] border border-slate-800 rounded-2xl p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#ED004B]/20 border border-[#ED004B]/30 flex items-center justify-center text-[#ED004B]">
                  <Scale className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-sm font-bold text-white flex items-center gap-2">
                    <span>Paridade Omnichannel: Mobile (390×844) & Desktop (1440×900)</span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-semibold border border-emerald-500/30">
                      Sincronização em Tempo Real
                    </span>
                  </h2>
                  <p className="text-xs text-slate-400">
                    Qualquer alteração feita no limite, bloqueio de cartão ou parcelamento reflete instantaneamente em todas as telas.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs">
                <button
                  onClick={() => setIsBacenModalOpen(true)}
                  className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold transition-all flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  <span>Auditar Termos Bacen</span>
                </button>
              </div>
            </div>

            {/* Stage containing the 3 screens */}
            <div className="flex flex-col xl:flex-row items-center xl:items-start justify-center gap-8 w-full">
              {/* Tela 1 (Mobile - 390 × 844 px): Dashboard Financeiro e Termômetro de Limite */}
              <div className="flex flex-col items-center">
                <div className="mb-2.5 flex items-center gap-2 text-xs font-bold text-slate-400">
                  <span className="w-2 h-2 rounded-full bg-[#ED004B]" />
                  <span>Tela 1 (Mobile): Dashboard & Limite (390×844 px)</span>
                </div>
                <div className="relative">
                  <MobileScreen1
                    invoiceData={invoiceData}
                    transactions={mockTransactions}
                    isMasked={isMasked}
                    onToggleMask={handleToggleMask}
                    onOpenSimulator={() => setIsBottomSheetOpen(true)}
                    onOpenPayModal={() => setIsPayModalOpen(true)}
                    onOpenAdjustLimit={() => setIsAdjustLimitOpen(true)}
                    onOpenVirtualCard={() => setIsVirtualCardOpen(true)}
                    onToggleBlockCard={handleToggleBlockCard}
                    onOpenCashback={() => setIsCashbackOpen(true)}
                    onOpenSettings={() => showToast('Painel de configurações da conta Méliuz')}
                    onViewAllTransactions={() => setViewMode('desktop')}
                  />

                  {/* Bottom Sheet rendered directly over Tela 1 if opened by user */}
                  <MobileScreen2BottomSheet
                    isOpen={isBottomSheetOpen}
                    onClose={() => setIsBottomSheetOpen(false)}
                    baseAmount={invoiceData.currentSpent}
                    plans={currentPlans}
                    selectedPlanId={selectedPlanId}
                    onSelectPlan={setSelectedPlanId}
                    entryValue={entryValue}
                    onChangeEntryValue={setEntryValue}
                    onConfirmInstallment={handleConfirmInstallment}
                    onTriggerBacenAudit={() => setIsBacenModalOpen(true)}
                  />
                </div>
              </div>

              {/* Tela 2 (Mobile - 390 × 844 px): Simulador de Parcelamento (Exibição estática de referência) */}
              <div className="flex flex-col items-center">
                <div className="mb-2.5 flex items-center gap-2 text-xs font-bold text-slate-400">
                  <span className="w-2 h-2 rounded-full bg-purple-500" />
                  <span>Tela 2 (Mobile): Simulador Bottom Sheet (390×844 px)</span>
                </div>
                <div className="relative">
                  {/* Base background representing the dimmed screen */}
                  <MobileScreen1
                    invoiceData={invoiceData}
                    transactions={mockTransactions}
                    isMasked={isMasked}
                    onToggleMask={handleToggleMask}
                    onOpenSimulator={() => {}}
                    onOpenPayModal={() => {}}
                    onOpenAdjustLimit={() => {}}
                    onOpenVirtualCard={() => {}}
                    onToggleBlockCard={() => {}}
                    onOpenCashback={() => {}}
                  />

                  {/* Always open Bottom Sheet for Tela 2 specification review */}
                  <MobileScreen2BottomSheet
                    isOpen={true}
                    onClose={() => {}}
                    baseAmount={invoiceData.currentSpent}
                    plans={currentPlans}
                    selectedPlanId={selectedPlanId}
                    onSelectPlan={setSelectedPlanId}
                    entryValue={entryValue}
                    onChangeEntryValue={setEntryValue}
                    onConfirmInstallment={handleConfirmInstallment}
                    onTriggerBacenAudit={() => setIsBacenModalOpen(true)}
                  />
                </div>
              </div>

              {/* Tela 3 (Desktop Web - 1440 × 900 px): Visão Consolidada de Gastos e Limite */}
              <div className="flex flex-col items-center w-full xl:w-auto">
                <div className="mb-2.5 flex items-center gap-2 text-xs font-bold text-slate-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span>Tela 3 (Desktop Web): Visão Consolidada (1440×900 px)</span>
                </div>
                <div className="w-full overflow-x-auto pb-4 flex justify-center">
                  <DesktopScreen3
                    invoiceData={invoiceData}
                    transactions={mockTransactions}
                    monthlyHistory={mockMonthlyHistory}
                    isMasked={isMasked}
                    onToggleMask={handleToggleMask}
                    onOpenSimulator={() => setIsBottomSheetOpen(true)}
                    onOpenPayModal={() => setIsPayModalOpen(true)}
                    onOpenVirtualCard={() => setIsVirtualCardOpen(true)}
                    onToggleBlockCard={handleToggleBlockCard}
                    onUpdateDailyLimit={handleUpdateDailyLimit}
                    onTriggerBacenAudit={() => setIsBacenModalOpen(true)}
                    onOpenCashback={() => setIsCashbackOpen(true)}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 2. TELA 1 ISOLADA (MOBILE 390×844) */}
        {viewMode === 'mobile1' && (
          <div className="flex flex-col items-center justify-center py-4">
            <div className="mb-3 flex items-center gap-2 text-xs font-bold text-slate-400">
              <Smartphone className="w-4 h-4 text-[#ED004B]" />
              <span>Tela 1 (Mobile - 390 × 844 px): Dashboard e Termômetro de Limite</span>
            </div>
            <div className="relative shadow-2xl">
              <MobileScreen1
                invoiceData={invoiceData}
                transactions={mockTransactions}
                isMasked={isMasked}
                onToggleMask={handleToggleMask}
                onOpenSimulator={() => setIsBottomSheetOpen(true)}
                onOpenPayModal={() => setIsPayModalOpen(true)}
                onOpenAdjustLimit={() => setIsAdjustLimitOpen(true)}
                onOpenVirtualCard={() => setIsVirtualCardOpen(true)}
                onToggleBlockCard={handleToggleBlockCard}
                onOpenCashback={() => setIsCashbackOpen(true)}
                onOpenSettings={() => showToast('Configurações da conta')}
                onViewAllTransactions={() => setViewMode('desktop')}
              />

              <MobileScreen2BottomSheet
                isOpen={isBottomSheetOpen}
                onClose={() => setIsBottomSheetOpen(false)}
                baseAmount={invoiceData.currentSpent}
                plans={currentPlans}
                selectedPlanId={selectedPlanId}
                onSelectPlan={setSelectedPlanId}
                entryValue={entryValue}
                onChangeEntryValue={setEntryValue}
                onConfirmInstallment={handleConfirmInstallment}
                onTriggerBacenAudit={() => setIsBacenModalOpen(true)}
              />
            </div>
          </div>
        )}

        {/* 3. TELA 2 ISOLADA (MOBILE 390×844 COM BOTTOM SHEET ABERTO) */}
        {viewMode === 'mobile2' && (
          <div className="flex flex-col items-center justify-center py-4">
            <div className="mb-3 flex items-center gap-2 text-xs font-bold text-slate-400">
              <Smartphone className="w-4 h-4 text-purple-400" />
              <span>Tela 2 (Mobile - 390 × 844 px): Simulador de Parcelamento (Bottom Sheet)</span>
            </div>
            <div className="relative shadow-2xl">
              <MobileScreen1
                invoiceData={invoiceData}
                transactions={mockTransactions}
                isMasked={isMasked}
                onToggleMask={handleToggleMask}
                onOpenSimulator={() => {}}
                onOpenPayModal={() => {}}
                onOpenAdjustLimit={() => {}}
                onOpenVirtualCard={() => {}}
                onToggleBlockCard={() => {}}
                onOpenCashback={() => {}}
              />

              <MobileScreen2BottomSheet
                isOpen={true}
                onClose={() => setViewMode('mobile1')}
                baseAmount={invoiceData.currentSpent}
                plans={currentPlans}
                selectedPlanId={selectedPlanId}
                onSelectPlan={setSelectedPlanId}
                entryValue={entryValue}
                onChangeEntryValue={setEntryValue}
                onConfirmInstallment={handleConfirmInstallment}
                onTriggerBacenAudit={() => setIsBacenModalOpen(true)}
              />
            </div>
          </div>
        )}

        {/* 4. TELA 3 ISOLADA (DESKTOP 1440×900) */}
        {viewMode === 'desktop' && (
          <div className="flex flex-col items-center justify-center w-full py-4 overflow-x-auto">
            <div className="mb-3 flex items-center gap-2 text-xs font-bold text-slate-400">
              <Monitor className="w-4 h-4 text-emerald-400" />
              <span>Tela 3 (Desktop Web - 1440 × 900 px): Visão Consolidada de Gastos e Limite</span>
            </div>
            <div className="shadow-2xl">
              <DesktopScreen3
                invoiceData={invoiceData}
                transactions={mockTransactions}
                monthlyHistory={mockMonthlyHistory}
                isMasked={isMasked}
                onToggleMask={handleToggleMask}
                onOpenSimulator={() => setIsBottomSheetOpen(true)}
                onOpenPayModal={() => setIsPayModalOpen(true)}
                onOpenVirtualCard={() => setIsVirtualCardOpen(true)}
                onToggleBlockCard={handleToggleBlockCard}
                onUpdateDailyLimit={handleUpdateDailyLimit}
                onTriggerBacenAudit={() => setIsBacenModalOpen(true)}
                onOpenCashback={() => setIsCashbackOpen(true)}
              />
            </div>
          </div>
        )}
      </main>

      {/* Global Modals */}
      <BacenAuditModal
        isOpen={isBacenModalOpen}
        onClose={() => setIsBacenModalOpen(false)}
        selectedPlan={selectedPlan}
        entryValue={entryValue}
      />

      <PayInvoiceModal
        isOpen={isPayModalOpen}
        onClose={() => setIsPayModalOpen(false)}
        amount={invoiceData.currentSpent}
        dueDate={invoiceData.dueDate}
        onConfirmPayment={handleConfirmPayment}
      />

      <VirtualCardModal
        isOpen={isVirtualCardOpen}
        onClose={() => setIsVirtualCardOpen(false)}
        userName={invoiceData.userName}
      />

      <AdjustLimitModal
        isOpen={isAdjustLimitOpen}
        onClose={() => setIsAdjustLimitOpen(false)}
        currentLimit={invoiceData.currentSpent}
        totalLimit={invoiceData.totalLimit}
        dailyLimit={invoiceData.dailyLimit}
        onUpdateLimit={handleUpdateDailyLimit}
      />

      <CashbackModal
        isOpen={isCashbackOpen}
        onClose={() => setIsCashbackOpen(false)}
        balance={invoiceData.cashbackBalance}
        onRedeem={handleRedeemCashback}
      />
    </div>
  );
}

import React, { useState, useMemo } from 'react';
import {
  Search,
  Download,
  Barcode,
  QrCode,
  Lock,
  Unlock,
  Sliders,
  TrendingUp,
  CreditCard,
  Coins,
  ChevronRight,
  ShieldCheck,
  Sparkles,
  Check,
  Copy,
  ChevronDown,
  LayoutDashboard,
  ReceiptText,
  Wallet,
  Settings,
  HelpCircle,
  ArrowUpRight,
} from 'lucide-react';
import { InvoiceData, Transaction, MonthlyHistory } from '../types';
import { formatBRL, maskValue } from '../utils/formatters';
import { MeliuzLogo } from './MeliuzLogo';
import { CategoryBadge, getCategoryIcon } from './CategoryBadge';

interface DesktopScreen3Props {
  invoiceData: InvoiceData;
  transactions: Transaction[];
  monthlyHistory: MonthlyHistory[];
  isMasked: boolean;
  onToggleMask: () => void;
  onOpenSimulator: () => void;
  onOpenPayModal: () => void;
  onOpenVirtualCard: () => void;
  onToggleBlockCard: () => void;
  onUpdateDailyLimit: (val: number) => void;
  onTriggerBacenAudit: () => void;
  onOpenCashback: () => void;
}

export const DesktopScreen3: React.FC<DesktopScreen3Props> = ({
  invoiceData,
  transactions,
  monthlyHistory,
  isMasked,
  onToggleMask,
  onOpenSimulator,
  onOpenPayModal,
  onOpenVirtualCard,
  onToggleBlockCard,
  onUpdateDailyLimit,
  onTriggerBacenAudit,
  onOpenCashback,
}) => {
  const [activeTab, setActiveTab] = useState<'extrato' | 'visao' | 'cartoes' | 'cashback' | 'config'>('extrato');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('todas');
  const [selectedCardType, setSelectedCardType] = useState<string>('todos');
  const [hoveredMonth, setHoveredMonth] = useState<MonthlyHistory | null>(null);
  const [copiedCode, setCopiedCode] = useState(false);
  const [downloadingPdf, setDownloadingPdf] = useState(false);

  // Filtered transactions
  const filteredTransactions = useMemo(() => {
    return transactions.filter((tx) => {
      const matchesSearch =
        tx.merchant.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tx.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === 'todas' || tx.category === selectedCategory;
      const matchesCard =
        selectedCardType === 'todos' || tx.cardType === selectedCardType;
      return matchesSearch && matchesCategory && matchesCard;
    });
  }, [transactions, searchQuery, selectedCategory, selectedCardType]);

  // Average 6-month spending calculation
  const averageSpent = useMemo(() => {
    const sum = monthlyHistory.reduce((acc, curr) => acc + curr.amount, 0);
    return Math.round((sum / monthlyHistory.length) * 100) / 100;
  }, [monthlyHistory]);

  const maxHistoryAmount = useMemo(() => {
    return Math.max(...monthlyHistory.map((m) => m.amount), 3000);
  }, [monthlyHistory]);

  const percentSpent = Math.min(
    100,
    Math.round((invoiceData.currentSpent / invoiceData.totalLimit) * 100)
  );

  const handleCopyBarcode = () => {
    navigator.clipboard?.writeText?.('34191.09008 61000.123456 78901.234567 8 98760000245080');
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleDownloadPdf = () => {
    setDownloadingPdf(true);
    setTimeout(() => {
      setDownloadingPdf(false);
    }, 1500);
  };

  return (
    <div className="w-[1440px] h-[900px] bg-[#F4F5F7] text-[#1E293B] font-sans flex overflow-hidden shadow-2xl rounded-2xl border border-slate-300/80 relative select-none">
      {/* 1. BARRA LATERAL ESQUERDA (SIDEBAR FIXA - 240px) */}
      <aside className="w-[240px] h-full bg-white border-r border-slate-200/90 flex flex-col justify-between shrink-0 z-10">
        {/* Top Section */}
        <div className="p-5 flex flex-col gap-6">
          {/* Logo Méliuz */}
          <div className="flex items-center justify-between">
            <MeliuzLogo size="md" showBadge={true} />
          </div>

          {/* Seletor de Contas */}
          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 hover:border-slate-300 transition-colors cursor-pointer">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#ED004B] to-[#FF4D80] flex items-center justify-center text-white text-xs font-bold shrink-0">
                  RS
                </div>
                <div className="min-w-0 flex flex-col">
                  <span className="text-xs font-bold text-slate-900 truncate">
                    {invoiceData.userName} Silva
                  </span>
                  <span className="text-[11px] text-slate-500 truncate">
                    Cartão Black • Conta
                  </span>
                </div>
              </div>
              <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
            </div>
          </div>

          {/* Menu Vertical */}
          <nav className="space-y-1">
            <button
              onClick={() => setActiveTab('visao')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'visao'
                  ? 'bg-pink-50 text-[#ED004B]'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Visão Geral</span>
            </button>

            <button
              onClick={() => setActiveTab('extrato')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all relative ${
                activeTab === 'extrato'
                  ? 'bg-[#ED004B] text-white shadow-xs shadow-[#ED004B]/20'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <div className="flex items-center gap-3">
                <ReceiptText className="w-4 h-4" />
                <span>Extrato e Faturas</span>
              </div>
              {activeTab === 'extrato' && (
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              )}
            </button>

            <button
              onClick={() => {
                setActiveTab('cartoes');
                onOpenVirtualCard();
              }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'cartoes'
                  ? 'bg-pink-50 text-[#ED004B]'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <CreditCard className="w-4 h-4" />
              <span>Cartões</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('cashback');
                onOpenCashback();
              }}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'cashback'
                  ? 'bg-pink-50 text-[#ED004B]'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <div className="flex items-center gap-3">
                <Coins className="w-4 h-4 text-emerald-600" />
                <span>Cashback</span>
              </div>
              <span className="text-[10px] bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded-full font-bold">
                {formatBRL(invoiceData.cashbackBalance)}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('config')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'config'
                  ? 'bg-pink-50 text-[#ED004B]'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <Settings className="w-4 h-4" />
              <span>Configurações</span>
            </button>
          </nav>
        </div>

        {/* Bottom Section: Méliuz AI & Compliance Badge */}
        <div className="p-4 border-t border-slate-100 space-y-3">
          <div
            onClick={onTriggerBacenAudit}
            className="p-3 rounded-xl bg-gradient-to-br from-pink-50 to-purple-50 border border-pink-200/80 cursor-pointer hover:border-[#ED004B]/50 transition-all group"
          >
            <div className="flex items-center gap-2 mb-1">
              <Sparkles className="w-3.5 h-3.5 text-[#ED004B]" />
              <span className="text-[11px] font-bold text-slate-900">
                Auditoria Bacen AI
              </span>
            </div>
            <p className="text-[10px] text-slate-500 leading-tight">
              Regulação CMN 4.549 auditada via Google AI Studio.
            </p>
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-400 px-1">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span>Conexão Segura</span>
            </span>
            <span>v2.4.0</span>
          </div>
        </div>
      </aside>

      {/* 2. ÁREA CENTRAL (MAIN CONTENT - 820px) */}
      <main className="w-[860px] h-full overflow-y-auto px-8 py-6 flex flex-col space-y-5 border-r border-slate-200/80">
        {/* Breadcrumbs e Top Actions */}
        <div className="flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
            <span className="hover:text-slate-700 cursor-pointer">Início</span>
            <ChevronRight className="w-3 h-3 text-slate-300" />
            <span className="hover:text-slate-700 cursor-pointer">Cartão de Crédito</span>
            <ChevronRight className="w-3 h-3 text-slate-300" />
            <span className="text-slate-900 font-bold">Fatura Outubro</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onToggleMask}
              className="text-xs font-semibold text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 px-3 py-1.5 rounded-lg shadow-2xs transition-colors"
            >
              {isMasked ? 'Mostrar valores' : 'Ocultar valores'}
            </button>
            <button
              onClick={onTriggerBacenAudit}
              className="text-xs font-bold text-[#ED004B] bg-pink-50 hover:bg-pink-100/80 border border-pink-200 px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors shadow-2xs"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Auditar Bacen</span>
            </button>
          </div>
        </div>

        {/* Header da Fatura Atual no Desktop */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs flex items-center justify-between">
          <div className="flex flex-col">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-2.5 py-0.5 rounded-full bg-pink-50 border border-pink-100 text-[#ED004B] text-xs font-bold">
                {invoiceData.status}
              </span>
              <span className="text-xs text-slate-500 font-medium">
                Vencimento em {invoiceData.dueDate}
              </span>
            </div>
            <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
              Total da fatura atual
            </span>
            <div className="text-3xl font-extrabold text-slate-900 font-mono mt-0.5 tracking-tight">
              {maskValue(invoiceData.currentSpent, isMasked)}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              id="desktop-pay-btn"
              onClick={onOpenPayModal}
              className="py-2.5 px-5 rounded-xl bg-[#ED004B] hover:bg-[#D00041] active:scale-[0.99] text-white text-xs font-bold transition-all shadow-sm shadow-[#ED004B]/30 flex items-center gap-2"
            >
              <span>Pagar fatura</span>
            </button>
            <button
              id="desktop-simulate-btn"
              onClick={onOpenSimulator}
              className="py-2.5 px-5 rounded-xl border border-[#ED004B] hover:bg-pink-50 active:scale-[0.99] text-[#ED004B] text-xs font-bold transition-all flex items-center gap-2"
            >
              <span>Parcelar fatura</span>
            </button>
          </div>
        </div>

        {/* Card de Análise Temporal: Gráfico Interativo dos Últimos 6 Meses */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-[#ED004B]" />
                <h3 className="text-sm font-bold text-slate-900">
                  Análise Temporal de Consumo
                </h3>
              </div>
              <span className="text-xs text-slate-500">
                Histórico comparativo dos últimos 6 ciclos de faturamento
              </span>
            </div>

            <div className="flex items-center gap-4 text-xs">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ED004B]" />
                <span className="text-slate-600 font-medium">Fatura aberta</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
                <span className="text-slate-600 font-medium">Faturas anteriores</span>
              </div>
              <div className="pl-3 border-l border-slate-200 font-semibold text-slate-700">
                Média de consumo:{' '}
                <strong className="text-slate-900 font-mono">
                  {maskValue(averageSpent, isMasked)}
                </strong>
              </div>
            </div>
          </div>

          {/* Gráfico de Barras Responsivo e Interativo */}
          <div className="relative h-44 flex items-end justify-between gap-4 pt-6 px-4 border-b border-slate-100">
            {/* Linha de Média de Consumo */}
            <div
              className="absolute left-0 right-0 border-t-2 border-dashed border-amber-400 z-0 pointer-events-none"
              style={{
                bottom: `${(averageSpent / maxHistoryAmount) * 100}%`,
              }}
            >
              <span className="absolute right-2 -top-5 text-[10px] font-bold text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded-md border border-amber-200">
                Média: {maskValue(averageSpent, isMasked)}
              </span>
            </div>

            {monthlyHistory.map((item) => {
              const heightPercent = Math.round((item.amount / maxHistoryAmount) * 100);
              const isCurrent = item.status === 'aberta';

              return (
                <div
                  key={item.month}
                  className="flex-1 flex flex-col items-center h-full justify-end group relative cursor-pointer"
                  onMouseEnter={() => setHoveredMonth(item)}
                  onMouseLeave={() => setHoveredMonth(null)}
                >
                  {/* Floating tooltip */}
                  {hoveredMonth?.month === item.month && (
                    <div className="absolute -top-12 z-20 bg-slate-900 text-white text-[11px] py-1 px-2.5 rounded-lg shadow-lg whitespace-nowrap animate-fadeIn flex flex-col items-center">
                      <span className="font-bold">{item.month}: {maskValue(item.amount, isMasked)}</span>
                      <span className="text-[9px] text-emerald-400">Cashback: +{formatBRL(item.cashback)}</span>
                      <div className="w-2 h-2 bg-slate-900 rotate-45 -mb-1" />
                    </div>
                  )}

                  {/* Barra */}
                  <div
                    className={`w-full max-w-[48px] rounded-t-lg transition-all duration-300 relative ${
                      isCurrent
                        ? 'bg-gradient-to-t from-[#ED004B] to-[#FF3366] shadow-sm shadow-[#ED004B]/30'
                        : 'bg-slate-200 group-hover:bg-slate-300'
                    }`}
                    style={{ height: `${heightPercent}%` }}
                  >
                    {isCurrent && (
                      <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-[10px] font-bold text-[#ED004B] font-mono">
                        Atual
                      </span>
                    )}
                  </div>

                  <span
                    className={`text-xs mt-2 font-medium ${
                      isCurrent ? 'font-bold text-[#ED004B]' : 'text-slate-500'
                    }`}
                  >
                    {item.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Tabela de Lançamentos em Alta Densidade */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs flex-1 flex flex-col">
          <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Lançamentos da Fatura
              </h3>
              <span className="text-xs text-slate-500">
                {filteredTransactions.length} lançamentos encontrados
              </span>
            </div>

            {/* Barra de Busca Rápida + Filtros Dropdown */}
            <div className="flex items-center gap-2">
              {/* Input de busca */}
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Buscar estabelecimento..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-hidden focus:border-[#ED004B] w-48 transition-all"
                />
              </div>

              {/* Filtro Categoria */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                aria-label="Filtrar lançamentos por categoria"
                className="text-xs bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-700 font-medium focus:outline-hidden focus:border-[#ED004B]"
              >
                <option value="todas">Todas as categorias</option>
                <option value="alimentacao">Alimentação</option>
                <option value="transporte">Transporte</option>
                <option value="compras">Compras</option>
                <option value="farmacia">Farmácia</option>
                <option value="combustivel">Combustível</option>
                <option value="lazer">Lazer</option>
                <option value="servicos">Serviços</option>
              </select>

              {/* Filtro Cartão */}
              <select
                value={selectedCardType}
                onChange={(e) => setSelectedCardType(e.target.value)}
                aria-label="Filtrar lançamentos por tipo de cartão"
                className="text-xs bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-700 font-medium focus:outline-hidden focus:border-[#ED004B]"
              >
                <option value="todos">Todos os cartões</option>
                <option value="fisico">Cartão Físico</option>
                <option value="virtual">Cartão Virtual</option>
              </select>
            </div>
          </div>

          {/* Tabela de Alta Densidade com Colunas: Data, Estabelecimento, Categoria, Parcelas, Cashback, Valor */}
          <div className="overflow-x-auto rounded-xl border border-slate-100">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-200/80 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                  <th className="py-2.5 px-3">Data</th>
                  <th className="py-2.5 px-3">Estabelecimento</th>
                  <th className="py-2.5 px-3">Categoria</th>
                  <th className="py-2.5 px-3">Parcelas</th>
                  <th className="py-2.5 px-3 text-right">Cashback ganho</th>
                  <th className="py-2.5 px-3 text-right">Valor total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredTransactions.map((tx) => {
                  return (
                    <tr
                      key={tx.id}
                      className="hover:bg-slate-50/70 transition-colors group"
                    >
                      <td className="py-2.5 px-3 font-medium text-slate-500 whitespace-nowrap">
                        {tx.date}
                      </td>
                      <td className="py-2.5 px-3 font-bold text-slate-900 flex items-center gap-2">
                        <span className="truncate max-w-[200px]">
                          {tx.merchant}
                        </span>
                        {tx.cardType === 'virtual' && (
                          <span className="px-1.5 py-0.2 rounded-sm bg-purple-100 text-purple-700 text-[9px] font-bold">
                            Virtual
                          </span>
                        )}
                      </td>
                      <td className="py-2.5 px-3">
                        <CategoryBadge
                          category={tx.category}
                          label={tx.categoryLabel}
                          size="sm"
                        />
                      </td>
                      <td className="py-2.5 px-3 text-slate-600 font-medium">
                        {tx.installments}
                      </td>
                      <td className="py-2.5 px-3 text-right font-bold text-emerald-600 font-mono">
                        +{maskValue(tx.cashback, isMasked)}
                      </td>
                      <td className="py-2.5 px-3 text-right font-bold text-slate-900 font-mono">
                        {maskValue(tx.amount, isMasked)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* 3. COLUNA DA DIREITA (PAINEL DE GESTÃO E LIMITE - 340px) */}
      <aside className="w-[340px] h-full bg-white px-5 py-6 overflow-y-auto shrink-0 flex flex-col space-y-5">
        {/* Título do Painel */}
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Gestão do Cartão
          </span>
          <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Ativo</span>
          </span>
        </div>

        {/* Mockup do Cartão de Crédito Méliuz */}
        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-tr from-[#14161B] via-[#21242D] to-[#ED004B] p-5 text-white shadow-xl shadow-slate-900/15 border border-white/10 group">
          {/* Subtle brand glow */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#ED004B]/30 blur-2xl rounded-full pointer-events-none" />

          <div className="relative z-10 flex flex-col justify-between h-40">
            {/* Top row: Méliuz Logo & Contactless */}
            <div className="flex items-center justify-between">
              <img
                src="./logo-meliuz-horizontal.png"
                alt="Méliuz"
                className="h-6 w-auto object-contain brightness-0 invert drop-shadow-sm"
              />
              <div className="flex items-center gap-2">
                <span className="text-[10px] tracking-wider uppercase font-semibold text-white/70">
                  Black
                </span>
                <div className="w-5 h-5 flex items-center justify-center text-white/80">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Chip EMV */}
            <div className="w-10 h-7 rounded-md bg-gradient-to-br from-amber-200 to-amber-400 border border-amber-500/40 flex items-center justify-center my-1 shadow-inner">
              <div className="w-6 h-4 border border-amber-600/30 rounded-xs" />
            </div>

            {/* Card Number & Holder */}
            <div>
              <div className="text-sm font-mono tracking-widest text-white/90 font-bold mb-1">
                •••• •••• •••• {invoiceData.cardNumberLast4}
              </div>
              <div className="flex items-center justify-between text-[10px] text-white/70 uppercase tracking-wider">
                <span>{invoiceData.userName} SILVA</span>
                <span>10/30</span>
              </div>
            </div>
          </div>
        </div>

        {/* Botão de Alternância: Bloqueio Temporário */}
        <div className="bg-slate-50 rounded-2xl p-3.5 border border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                invoiceData.isCardBlocked
                  ? 'bg-amber-100 text-amber-700'
                  : 'bg-slate-200 text-slate-700'
              }`}
            >
              {invoiceData.isCardBlocked ? (
                <Lock className="w-4 h-4" />
              ) : (
                <Unlock className="w-4 h-4" />
              )}
            </div>
            <div>
              <span className="text-xs font-bold text-slate-900 block leading-tight">
                Bloqueio temporário
              </span>
              <span className="text-[10px] text-slate-500">
                {invoiceData.isCardBlocked
                  ? 'Cartão bloqueado para compras'
                  : 'Compras liberadas normalmente'}
              </span>
            </div>
          </div>

          {/* Toggle Switch */}
          <button
            id="desktop-toggle-block-btn"
            onClick={onToggleBlockCard}
            className={`w-11 h-6 rounded-full transition-colors relative flex items-center p-0.5 ${
              invoiceData.isCardBlocked ? 'bg-amber-500' : 'bg-slate-300'
            }`}
          >
            <div
              className={`w-5 h-5 rounded-full bg-white shadow-md transition-transform ${
                invoiceData.isCardBlocked ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* Componente Interativo de Slider de Limite */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <Sliders className="w-4 h-4 text-[#ED004B]" />
              <span className="text-xs font-bold text-slate-900">
                Limite Dinâmico
              </span>
            </div>
            <span className="text-[11px] font-bold text-slate-500">
              Teto diário
            </span>
          </div>

          {/* Valor atual ajustado */}
          <div className="bg-slate-50 rounded-xl p-3 border border-slate-200/80">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">
              Teto diário ajustável em tempo real
            </span>
            <div className="text-lg font-extrabold text-slate-900 font-mono mt-0.5">
              {formatBRL(invoiceData.dailyLimit)}
            </div>
          </div>

          {/* Slider arrastável interativo */}
          <div className="space-y-1">
            <input
              id="desktop-limit-slider"
              type="range"
              min="1000"
              max="8000"
              step="100"
              value={invoiceData.dailyLimit}
              onChange={(e) => onUpdateDailyLimit(Number(e.target.value))}
              className="w-full accent-[#ED004B] cursor-pointer"
            />
            <div className="flex items-center justify-between text-[10px] text-slate-400 font-medium">
              <span>R$ 1.000</span>
              <span>R$ 4.500</span>
              <span>R$ 8.000</span>
            </div>
          </div>

          {/* Termômetro de Limite Global */}
          <div className="pt-2 border-t border-slate-100 space-y-1.5">
            <div className="flex items-center justify-between text-[11px] font-medium text-slate-600">
              <span>Gasto atual: <strong className="font-mono text-slate-900">{formatBRL(invoiceData.currentSpent)}</strong></span>
              <span className="text-[#ED004B] font-bold">{percentSpent}%</span>
            </div>
            <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#ED004B] to-[#FF3366] rounded-full transition-all duration-300"
                style={{ width: `${percentSpent}%` }}
              />
            </div>
            <div className="text-[11px] text-slate-500 flex items-center justify-between">
              <span>Disponível:</span>
              <strong className="text-emerald-600 font-mono">
                {formatBRL(invoiceData.availableLimit)}
              </strong>
            </div>
          </div>
        </div>

        {/* Card com Atalhos para Download da Fatura em PDF / Código de Barras / Pix */}
        <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/90 space-y-2.5">
          <span className="text-xs font-bold text-slate-800 block">
            Ações Rápidas da Fatura
          </span>

          <button
            id="desktop-download-pdf-btn"
            onClick={handleDownloadPdf}
            className="w-full py-2.5 px-3 rounded-xl bg-white border border-slate-200 hover:border-slate-300 active:scale-[0.99] text-slate-700 text-xs font-bold transition-all shadow-2xs flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <Download className="w-4 h-4 text-slate-500" />
              <span>{downloadingPdf ? 'Gerando PDF...' : 'Baixar fatura em PDF'}</span>
            </div>
            <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
          </button>

          <button
            id="desktop-copy-barcode-btn"
            onClick={handleCopyBarcode}
            className="w-full py-2.5 px-3 rounded-xl bg-white border border-slate-200 hover:border-slate-300 active:scale-[0.99] text-slate-700 text-xs font-bold transition-all shadow-2xs flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <Barcode className="w-4 h-4 text-slate-500" />
              <span>{copiedCode ? 'Código de barras copiado!' : 'Copiar código de barras'}</span>
            </div>
            {copiedCode ? (
              <Check className="w-3.5 h-3.5 text-emerald-600" />
            ) : (
              <Copy className="w-3.5 h-3.5 text-slate-400" />
            )}
          </button>

          <button
            id="desktop-pay-pix-btn"
            onClick={onOpenPayModal}
            className="w-full py-2.5 px-3 rounded-xl bg-emerald-50 border border-emerald-200 hover:bg-emerald-100/70 text-emerald-800 text-xs font-bold transition-all flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <QrCode className="w-4 h-4 text-emerald-600" />
              <span>Pagar via Pix (Libera na hora)</span>
            </div>
            <ArrowUpRight className="w-3.5 h-3.5 text-emerald-600" />
          </button>
        </div>
      </aside>
    </div>
  );
};

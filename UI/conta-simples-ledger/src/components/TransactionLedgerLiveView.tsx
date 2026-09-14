import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  ArrowUpRight, 
  ArrowDownLeft, 
  CreditCard, 
  DollarSign, 
  Calendar,
  Layers,
  Sparkles,
  SlidersHorizontal,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { TransactionRowItem } from './TransactionRowItem';
import { mockTransactions } from '../data/mockTransactions';
import { TransactionItem } from '../types';

interface TransactionLedgerLiveViewProps {
  inspectMode?: boolean;
  onInspect?: (item: TransactionItem, event: React.MouseEvent) => void;
}

export const TransactionLedgerLiveView: React.FC<TransactionLedgerLiveViewProps> = ({
  inspectMode = false,
  onInspect
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<string>('all');
  const [selectedTxDetail, setSelectedTxDetail] = useState<TransactionItem | null>(null);

  // Filter transactions
  const filteredTransactions = mockTransactions.filter((tx) => {
    const matchesSearch = 
      tx.merchantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.cardholderName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.costCenter.name.toLowerCase().includes(searchTerm.toLowerCase());

    if (selectedStatusFilter === 'all') return matchesSearch;
    if (selectedStatusFilter === 'approved') return matchesSearch && tx.status === 'approved';
    if (selectedStatusFilter === 'pending') return matchesSearch && tx.status === 'pending';
    if (selectedStatusFilter === 'declined') return matchesSearch && tx.status === 'declined';
    if (selectedStatusFilter === 'international') return matchesSearch && tx.isInternational;

    return matchesSearch;
  });

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-xs overflow-hidden" id="section-live-feed">
      {/* Feed Header */}
      <div className="px-6 py-5 border-b border-gray-200 bg-gray-50/50 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <h2 className="text-lg font-bold text-gray-900 tracking-tight">
              Simulador do Extrato Corporativo Conta Simples
            </h2>
          </div>
          <p className="text-sm text-gray-500 mt-0.5">
            Comportamento real do componente <code className="text-blue-700 font-mono text-xs">TransactionRow</code> agrupado em fluxo contínuo de despesas corporativas.
          </p>
        </div>

        {/* Filter Badges */}
        <div className="flex items-center gap-2 flex-wrap">
          {['all', 'approved', 'pending', 'declined', 'international'].map((status) => (
            <button
              key={status}
              onClick={() => setSelectedStatusFilter(status)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-colors ${
                selectedStatusFilter === status
                  ? 'bg-blue-600 text-white font-semibold shadow-xs'
                  : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
              }`}
            >
              {status === 'all' && 'Todos'}
              {status === 'approved' && 'Conciliados'}
              {status === 'pending' && 'Pendentes'}
              {status === 'declined' && 'Recusados'}
              {status === 'international' && 'Internacionais (USD)'}
            </button>
          ))}
        </div>
      </div>

      {/* Corporate Ledger Search & Stats Bar */}
      <div className="p-6 border-b border-gray-200 bg-slate-50/40">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar por estabelecimento, portador ou centro de custo..."
              className="w-full text-xs pl-9 pr-4 py-2 rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Quick Metrics */}
          <div className="flex items-center gap-4 text-xs font-medium text-gray-600">
            <div className="flex items-center gap-1.5">
              <span className="text-gray-400">Total listado:</span>
              <span className="font-bold text-gray-900">{filteredTransactions.length} despesas</span>
            </div>
            <span className="text-gray-300">•</span>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              <span>Pendentes: {filteredTransactions.filter(t => t.status === 'pending').length}</span>
            </div>
            <span className="text-gray-300">•</span>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-red-500" />
              <span>Recusados: {filteredTransactions.filter(t => t.status === 'declined').length}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Transaction List Feed (Continuous list with border-subtle-1px) */}
      <div className="divide-y divide-gray-200">
        {filteredTransactions.length > 0 ? (
          filteredTransactions.map((tx) => (
            <TransactionRowItem
              key={tx.id}
              transaction={tx}
              isCard={false}
              inspectMode={inspectMode}
              onInspect={onInspect}
              onClick={() => setSelectedTxDetail(tx)}
            />
          ))
        ) : (
          <div className="py-12 text-center text-gray-500 text-xs">
            Nenhuma despesa encontrada com os filtros selecionados.
          </div>
        )}
      </div>

      {/* Detail Drawer Modal (if clicked) */}
      {selectedTxDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 border border-gray-200 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <CreditCard size={18} className="text-blue-600" />
                <h3 className="font-bold text-gray-900 text-base">Comprovante de Despesa</h3>
              </div>
              <button
                onClick={() => setSelectedTxDetail(null)}
                className="text-gray-400 hover:text-gray-600 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <div>
              <span className="text-xs text-gray-400 uppercase font-bold">Estabelecimento</span>
              <p className="text-base font-bold text-gray-900">{selectedTxDetail.merchantName}</p>
              <p className="text-xs text-gray-500 mt-0.5">
                Portador: {selectedTxDetail.cardholderName} • Cartão final {selectedTxDetail.cardLastDigits}
              </p>
            </div>

            <div className="p-3 bg-gray-50 rounded-xl flex items-center justify-between">
              <div>
                <span className="text-[11px] text-gray-500 block">Valor Consolidado</span>
                <span className="text-lg font-bold font-mono text-gray-900">
                  R$ {Math.abs(selectedTxDetail.amount).toFixed(2)}
                </span>
              </div>
              <div className="text-right">
                <span className="text-[11px] text-gray-500 block">Status Contábil</span>
                <span className="text-xs font-bold uppercase text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                  {selectedTxDetail.status}
                </span>
              </div>
            </div>

            {selectedTxDetail.isInternational && selectedTxDetail.foreignExchange && (
              <div className="p-3 bg-indigo-50 border border-indigo-100 rounded-xl text-xs text-indigo-900 space-y-1">
                <span className="font-bold block text-indigo-950">Desdobramento Cambial Internacional:</span>
                <p>Valor Moeda Estrangeira: US$ {selectedTxDetail.foreignExchange.originalAmount.toFixed(2)}</p>
                <p>Cotação Comercial: R$ {selectedTxDetail.foreignExchange.exchangeRate.toFixed(2)}</p>
                <p>IOF Aplicado: {selectedTxDetail.foreignExchange.iofPercentage}% (R$ {selectedTxDetail.foreignExchange.iofAmount.toFixed(2)})</p>
              </div>
            )}

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setSelectedTxDetail(null)}
                className="px-4 py-2 rounded-lg bg-gray-900 hover:bg-gray-800 text-white text-xs font-bold"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

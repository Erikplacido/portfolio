import React from 'react';
import { X, Layers, Code, ShieldCheck, Ruler, Check, Copy } from 'lucide-react';
import { TransactionItem } from '../types';

interface InspectModalProps {
  transaction: TransactionItem | null;
  onClose: () => void;
}

export const InspectModal: React.FC<InspectModalProps> = ({ transaction, onClose }) => {
  const [copied, setCopied] = React.useState(false);

  if (!transaction) return null;

  const cssProperties = `/* Figma Dev Mode Specs - Conta Simples DS */
.transaction-row {
  height: 72px;
  background-color: #FFFFFF; /* var(--color-surface-base) */
  border-bottom: 1px solid #E5E7EB; /* var(--color-border-subtle) */
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px; /* var(--spacing-md) */
  outline: none;
}

.transaction-row:hover {
  background-color: #F8F9FA; /* var(--color-surface-hover) */
}

.transaction-row:focus-visible {
  box-shadow: 0 0 0 2px #FFFFFF, 0 0 0 4px #2563EB;
}

.leading-element {
  width: 44px;
  height: 44px;
  border-radius: 9999px;
  margin-right: 16px;
}

.title-text {
  font-size: 15px;
  font-weight: 500;
  line-height: 20px;
  color: #111827; /* Contrast 14.2:1 AAA */
}

.amount-tabular {
  font-size: 16px;
  font-weight: 600;
  line-height: 22px;
  font-variant-numeric: tabular-nums;
}`;

  const copyCss = () => {
    navigator.clipboard.writeText(cssProperties);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl max-w-xl w-full border border-gray-200 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="px-5 py-4 border-b border-gray-200 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Code size={16} className="text-emerald-400" />
            <span className="font-mono text-xs font-bold tracking-wider text-slate-200 uppercase">
              Figma Dev Mode Inspector • Conta Simples DS
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4 max-h-[80vh] overflow-y-auto">
          
          {/* Inspected Element Summary */}
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Item Inspecionado</span>
              <span className="font-bold text-slate-900 text-sm">{transaction.merchantName}</span>
              <p className="text-xs text-slate-500 font-mono mt-0.5">ID: {transaction.id} • Status: {transaction.status.toUpperCase()}</p>
            </div>
            <div className="text-right">
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                WCAG AAA
              </span>
            </div>
          </div>

          {/* Key Measurements */}
          <div className="grid grid-cols-3 gap-3 text-xs">
            <div className="p-2.5 bg-gray-50 rounded-lg border border-gray-200">
              <span className="text-gray-400 font-mono text-[10px] block">HEIGHT</span>
              <span className="font-bold text-gray-800 font-mono text-sm">72px</span>
            </div>
            <div className="p-2.5 bg-gray-50 rounded-lg border border-gray-200">
              <span className="text-gray-400 font-mono text-[10px] block">LEADING SIZE</span>
              <span className="font-bold text-gray-800 font-mono text-sm">44×44 px</span>
            </div>
            <div className="p-2.5 bg-gray-50 rounded-lg border border-gray-200">
              <span className="text-gray-400 font-mono text-[10px] block">PADDING X</span>
              <span className="font-bold text-gray-800 font-mono text-sm">16px (spacing-md)</span>
            </div>
          </div>

          {/* CSS Output */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-bold text-gray-700 font-mono">CSS Rules (Figma Export)</span>
              <button
                onClick={copyCss}
                className="text-xs px-2 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium flex items-center gap-1 transition-colors"
              >
                {copied ? <Check size={12} className="text-emerald-600" /> : <Copy size={12} />}
                <span>{copied ? 'Copiado!' : 'Copiar CSS'}</span>
              </button>
            </div>
            <pre className="p-3 bg-slate-900 text-slate-100 font-mono text-[11px] rounded-xl overflow-x-auto leading-relaxed border border-slate-800">
              {cssProperties}
            </pre>
          </div>

          {/* Screen reader speech string */}
          <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl text-xs text-blue-950">
            <span className="font-bold block mb-1">Acessibilidade TalkBack / VoiceOver:</span>
            <p className="font-mono text-[11px] text-blue-800 select-all">
              {transaction.accessibilityLabel}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-gray-200 bg-gray-50 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-gray-900 hover:bg-gray-800 text-white text-xs font-semibold rounded-lg transition-colors"
          >
            Fechar Inspector
          </button>
        </div>
      </div>
    </div>
  );
};

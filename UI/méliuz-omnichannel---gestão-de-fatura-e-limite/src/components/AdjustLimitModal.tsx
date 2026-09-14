import React, { useState } from 'react';
import { X, Sliders, Check, ShieldCheck } from 'lucide-react';
import { formatBRL } from '../utils/formatters';

interface AdjustLimitModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLimit: number;
  totalLimit: number;
  dailyLimit: number;
  onUpdateLimit: (val: number) => void;
}

export const AdjustLimitModal: React.FC<AdjustLimitModalProps> = ({
  isOpen,
  onClose,
  currentLimit,
  totalLimit,
  dailyLimit,
  onUpdateLimit,
}) => {
  const [val, setVal] = useState(dailyLimit);

  if (!isOpen) return null;

  const handleSave = () => {
    onUpdateLimit(val);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-fadeIn">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-[#ED004B]" />
            <h3 className="text-sm font-bold text-slate-900">Ajustar Teto de Limite</h3>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:text-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-5 space-y-4">
          <div className="bg-slate-50 rounded-xl p-4 text-center border border-slate-200">
            <span className="text-xs text-slate-500 block">Novo limite diário selecionado</span>
            <div className="text-2xl font-black text-slate-900 font-mono mt-1 text-[#ED004B]">
              {formatBRL(val)}
            </div>
            <span className="text-[11px] text-slate-400 mt-1 block">
              Limite total disponível na conta: {formatBRL(totalLimit)}
            </span>
          </div>

          <div className="space-y-2">
            <input
              type="range"
              min="500"
              max={totalLimit}
              step="100"
              value={val}
              onChange={(e) => setVal(Number(e.target.value))}
              className="w-full accent-[#ED004B] cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-slate-400 font-medium">
              <span>R$ 500</span>
              <span>{formatBRL(totalLimit)}</span>
            </div>
          </div>

          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 flex items-center gap-2 text-xs text-emerald-800">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Alterações de teto entram em vigor imediatamente e sem custo.</span>
          </div>

          <button
            onClick={handleSave}
            className="w-full py-3 rounded-xl bg-[#ED004B] hover:bg-[#D00041] text-white text-xs font-bold transition-all shadow-md shadow-[#ED004B]/20 flex items-center justify-center gap-2"
          >
            <Check className="w-4 h-4" />
            <span>Confirmar novo limite</span>
          </button>
        </div>
      </div>
    </div>
  );
};

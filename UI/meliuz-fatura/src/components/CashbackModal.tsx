import React, { useState } from 'react';
import {
  X,
  Coins,
  ArrowDownToLine,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Flame,
} from 'lucide-react';
import { formatBRL } from '../utils/formatters';

interface CashbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  balance: number;
  onRedeem: () => void;
}

export const CashbackModal: React.FC<CashbackModalProps> = ({
  isOpen,
  onClose,
  balance,
  onRedeem,
}) => {
  const [redeemed, setRedeemed] = useState(false);

  if (!isOpen) return null;

  const handleRedeemClick = () => {
    setRedeemed(true);
    setTimeout(() => {
      onRedeem();
      setRedeemed(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-fadeIn">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-4 bg-emerald-600 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-white/20 flex items-center justify-center">
              <Coins className="w-4 h-4 text-amber-300" />
            </div>
            <h3 className="text-sm font-bold">Cashback Méliuz</h3>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4">
          <div className="bg-emerald-50 rounded-2xl p-4 border border-emerald-100 text-center">
            <span className="text-xs text-emerald-800 font-medium block">
              Saldo confirmado para resgate
            </span>
            <div className="text-3xl font-black text-emerald-950 font-mono mt-1">
              {formatBRL(balance)}
            </div>
            <span className="text-[10px] text-emerald-700 mt-1 block">
              Dinheiro de verdade na sua conta ou abatimento da fatura
            </span>
          </div>

          <div className="space-y-2 text-xs text-slate-600">
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-200">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>Resgatar via chave Pix (Conta Corrente)</span>
              </div>
              <span className="font-bold text-slate-800">Sem taxa</span>
            </div>
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-200">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#ED004B]" />
                <span>Abater do saldo da fatura de Outubro</span>
              </div>
              <span className="font-bold text-slate-800">Imediato</span>
            </div>
          </div>

          <button
            onClick={handleRedeemClick}
            disabled={redeemed || balance <= 0}
            className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2 disabled:opacity-70"
          >
            {redeemed ? (
              <>
                <CheckCircle2 className="w-4 h-4 animate-bounce" />
                <span>Resgate efetuado com sucesso!</span>
              </>
            ) : (
              <>
                <ArrowDownToLine className="w-4 h-4" />
                <span>Resgatar {formatBRL(balance)} agora</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

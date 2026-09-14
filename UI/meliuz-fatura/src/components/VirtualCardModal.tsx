import React, { useState, useEffect } from 'react';
import {
  X,
  CreditCard,
  Copy,
  Check,
  ShieldCheck,
  RefreshCw,
  Lock,
} from 'lucide-react';

interface VirtualCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  userName: string;
}

export const VirtualCardModal: React.FC<VirtualCardModalProps> = ({
  isOpen,
  onClose,
  userName,
}) => {
  const [copiedNumber, setCopiedNumber] = useState(false);
  const [copiedCvv, setCopiedCvv] = useState(false);
  const [countdown, setCountdown] = useState(120);

  useEffect(() => {
    if (!isOpen) return;
    setCountdown(120);
    const interval = setInterval(() => {
      setCountdown((prev) => (prev > 1 ? prev - 1 : 120));
    }, 1000);
    return () => clearInterval(interval);
  }, [isOpen]);

  if (!isOpen) return null;

  const cardNumber = '5391 4922 8842 9015';
  const cvv = '482';

  const handleCopy = (text: string, type: 'number' | 'cvv') => {
    navigator.clipboard?.writeText?.(text);
    if (type === 'number') {
      setCopiedNumber(true);
      setTimeout(() => setCopiedNumber(false), 2000);
    } else {
      setCopiedCvv(true);
      setTimeout(() => setCopiedCvv(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-fadeIn">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-[#ED004B]" />
            <h3 className="text-sm font-bold text-slate-900">Cartão Virtual Méliuz</h3>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:text-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4">
          {/* Virtual Card Graphic */}
          <div className="relative rounded-2xl overflow-hidden bg-gradient-to-tr from-[#0F172A] via-[#1E293B] to-[#7C3AED] p-4 text-white shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <img
                src="./logo-meliuz-horizontal.png"
                alt="Méliuz"
                className="h-5 w-auto object-contain brightness-0 invert drop-shadow-sm"
              />
              <span className="px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-200 text-[10px] font-bold">
                Virtual Dinâmico
              </span>
            </div>

            <div className="font-mono text-base font-bold tracking-wider mb-3">
              {cardNumber}
            </div>

            <div className="flex items-center justify-between text-[11px] text-white/80">
              <div>
                <span className="text-[9px] uppercase tracking-wider block text-white/50">
                  Titular
                </span>
                <span className="font-bold">{userName} SILVA</span>
              </div>
              <div>
                <span className="text-[9px] uppercase tracking-wider block text-white/50">
                  Validade
                </span>
                <span className="font-bold">10/30</span>
              </div>
              <div>
                <span className="text-[9px] uppercase tracking-wider block text-white/50">
                  CVV Dinâmico
                </span>
                <span className="font-mono font-bold text-amber-300">{cvv}</span>
              </div>
            </div>
          </div>

          {/* Dynamic CVV Timer Alert */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 flex items-center justify-between text-xs text-amber-900">
            <div className="flex items-center gap-2">
              <RefreshCw className="w-3.5 h-3.5 text-amber-600 animate-spin" />
              <span>CVV expira em: <strong className="font-mono">{countdown}s</strong></span>
            </div>
            <span className="text-[10px] font-bold text-amber-700 bg-amber-100/60 px-2 py-0.5 rounded-md">
              Anti-Fraude
            </span>
          </div>

          {/* Copy Buttons */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => handleCopy(cardNumber.replace(/\s/g, ''), 'number')}
              className="py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-all flex items-center justify-center gap-1.5"
            >
              {copiedNumber ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedNumber ? 'Número copiado' : 'Copiar número'}</span>
            </button>
            <button
              onClick={() => handleCopy(cvv, 'cvv')}
              className="py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-all flex items-center justify-center gap-1.5"
            >
              {copiedCvv ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedCvv ? 'CVV copiado' : 'Copiar CVV'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import {
  X,
  QrCode,
  Barcode,
  Check,
  Copy,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import { formatBRL } from '../utils/formatters';

interface PayInvoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
  dueDate: string;
  onConfirmPayment: () => void;
}

export const PayInvoiceModal: React.FC<PayInvoiceModalProps> = ({
  isOpen,
  onClose,
  amount,
  dueDate,
  onConfirmPayment,
}) => {
  const [method, setMethod] = useState<'pix' | 'boleto'>('pix');
  const [copied, setCopied] = useState(false);
  const [paid, setPaid] = useState(false);

  if (!isOpen) return null;

  const pixKey = '00020126580014br.gov.bcb.pix0136meliuz-fatura-rodrigo-48291052040000530398654072450.805802BR5916MELIUZ SERVICOS6009SAO PAULO62070503***6304D1A8';
  const barcode = '34191.09008 61000.123456 78901.234567 8 98760000245080';

  const handleCopy = (text: string) => {
    navigator.clipboard?.writeText?.(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSimulatePay = () => {
    setPaid(true);
    setTimeout(() => {
      onConfirmPayment();
      setPaid(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-fadeIn">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900 tracking-tight">
              Pagar fatura Méliuz
            </h3>
            <span className="text-xs text-slate-500">
              Vencimento em {dueDate} • Total: <strong className="font-mono text-slate-900">{formatBRL(amount)}</strong>
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:text-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Method Switcher */}
        <div className="p-4 bg-slate-50 border-b border-slate-100 flex gap-2">
          <button
            onClick={() => setMethod('pix')}
            className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
              method === 'pix'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-white text-slate-700 border border-slate-200 hover:border-slate-300'
            }`}
          >
            <QrCode className="w-4 h-4" />
            <span>Pix (Liberação na hora)</span>
          </button>
          <button
            onClick={() => setMethod('boleto')}
            className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
              method === 'boleto'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-white text-slate-700 border border-slate-200 hover:border-slate-300'
            }`}
          >
            <Barcode className="w-4 h-4" />
            <span>Boleto Bancário</span>
          </button>
        </div>

        {/* Body */}
        <div className="p-6 flex flex-col items-center text-center space-y-4">
          {method === 'pix' ? (
            <>
              {/* QR Code Graphic */}
              <div className="w-44 h-44 p-3 bg-white border-2 border-slate-200 rounded-2xl flex items-center justify-center shadow-inner relative">
                <div className="w-full h-full bg-slate-900 rounded-lg flex flex-col items-center justify-center text-white p-3 space-y-1">
                  <div className="w-28 h-28 border-4 border-white grid grid-cols-5 gap-1 p-1 bg-white">
                    <div className="col-span-2 row-span-2 bg-slate-900" />
                    <div className="col-span-1 bg-slate-900" />
                    <div className="col-span-2 row-span-2 bg-slate-900" />
                    <div className="col-span-1 bg-slate-900" />
                    <div className="col-span-1 bg-slate-900" />
                    <div className="col-span-3 bg-slate-900" />
                    <div className="col-span-2 bg-slate-900" />
                  </div>
                  <span className="text-[9px] font-mono tracking-tighter text-emerald-300">
                    PIX INSTANTÂNEO
                  </span>
                </div>
              </div>

              <div className="w-full space-y-2">
                <span className="text-xs text-slate-500">
                  Ou copie o código Pix Copia e Cola:
                </span>
                <div className="flex items-center gap-2 bg-slate-100 p-2 rounded-xl border border-slate-200">
                  <span className="text-[11px] font-mono text-slate-600 truncate flex-1 text-left">
                    {pixKey}
                  </span>
                  <button
                    onClick={() => handleCopy(pixKey)}
                    className="px-3 py-1 bg-white border border-slate-300 rounded-lg text-xs font-bold text-slate-700 hover:text-slate-900 flex items-center gap-1 shrink-0"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copiado' : 'Copiar'}</span>
                  </button>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="w-full bg-slate-50 p-4 rounded-xl border border-slate-200 text-left space-y-2">
                <span className="text-xs font-bold text-slate-700 block">
                  Linha Digitável do Boleto
                </span>
                <div className="p-3 bg-white border border-slate-300 rounded-lg font-mono text-xs font-bold text-slate-900 tracking-wider break-all">
                  {barcode}
                </div>
                <button
                  onClick={() => handleCopy(barcode)}
                  className="w-full py-2 bg-slate-900 text-white rounded-lg text-xs font-bold hover:bg-slate-800 flex items-center justify-center gap-2"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  <span>{copied ? 'Linha digitável copiada!' : 'Copiar código'}</span>
                </button>
              </div>

              <p className="text-xs text-slate-500">
                Pagamentos via boleto bancário podem levar até 3 dias úteis para compensação.
              </p>
            </>
          )}

          {/* Action to simulate immediate payment */}
          <div className="w-full pt-2 border-t border-slate-100">
            <button
              onClick={handleSimulatePay}
              disabled={paid}
              className="w-full py-3 px-4 rounded-xl bg-[#ED004B] hover:bg-[#D00041] text-white text-xs font-bold transition-all shadow-md shadow-[#ED004B]/20 flex items-center justify-center gap-2 disabled:opacity-80"
            >
              {paid ? (
                <>
                  <CheckCircle2 className="w-4 h-4 animate-bounce" />
                  <span>Pagamento confirmado! Atualizando limite...</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>Simular confirmação de pagamento</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

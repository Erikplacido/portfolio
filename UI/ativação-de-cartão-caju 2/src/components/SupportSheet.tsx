import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, HelpCircle, MessageSquare, ShieldCheck, Mail, Phone, CreditCard } from 'lucide-react';

interface SupportSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SupportSheet: React.FC<SupportSheetProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="absolute inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end select-none">
        <motion.div
          id="caju-support-bottom-sheet"
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', damping: 28, stiffness: 320 }}
          className="w-full bg-white rounded-t-[28px] p-6 pb-8 shadow-2xl flex flex-col max-h-[85%]"
        >
          {/* Top handle & header */}
          <div className="w-12 h-1.5 bg-neutral-200 rounded-full mx-auto mb-4" />
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#EA3C36]/10 flex items-center justify-center text-[#EA3C36]">
                <HelpCircle className="w-4 h-4" />
              </div>
              <h3 className="text-base font-bold text-neutral-900">Ajuda com Ativação</h3>
            </div>
            <button
              id="support-close-btn"
              onClick={onClose}
              className="p-1.5 rounded-full text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="overflow-y-auto space-y-3.5 pr-1 text-neutral-700 text-sm">
            {/* Where are the 4 digits */}
            <div className="p-3.5 bg-neutral-50 rounded-xl border border-neutral-100">
              <div className="flex items-center gap-2 font-semibold text-neutral-900 text-xs mb-1">
                <CreditCard className="w-4 h-4 text-[#EA3C36]" />
                <span>Onde acho o código de 4 dígitos?</span>
              </div>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Olhe no verso do seu cartão Caju, logo abaixo da tarja magnética e ao lado do código CVV. São os últimos 4 dígitos destacados em relevo (ex: 7291).
              </p>
            </div>

            {/* Didn't receive envelope */}
            <div className="p-3.5 bg-neutral-50 rounded-xl border border-neutral-100">
              <div className="flex items-center gap-2 font-semibold text-neutral-900 text-xs mb-1">
                <ShieldCheck className="w-4 h-4 text-[#EA3C36]" />
                <span>O cartão veio sem QR ou com avaria?</span>
              </div>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Você pode solicitar uma 2ª via sem custos diretamente pelo app ou pelo RH da sua empresa parceira.
              </p>
            </div>

            {/* Channels */}
            <div className="pt-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">
                Canais Oficiais Caju
              </span>
              <div className="mt-2 space-y-2">
                <a
                  href="#chat"
                  onClick={(e) => {
                    e.preventDefault();
                    onClose();
                  }}
                  className="flex items-center justify-between p-3 bg-[#EA3C36]/5 hover:bg-[#EA3C36]/10 rounded-xl border border-[#EA3C36]/15 transition-all text-[#EA3C36]"
                >
                  <div className="flex items-center gap-2.5">
                    <MessageSquare className="w-4 h-4" />
                    <span className="text-xs font-semibold">Chat no aplicativo (24/7)</span>
                  </div>
                  <span className="text-[11px] font-medium text-[#EA3C36]">Abrir &rarr;</span>
                </a>

                <div className="flex items-center gap-2 p-3 bg-neutral-50 rounded-xl border border-neutral-100 text-neutral-600 text-xs">
                  <Mail className="w-4 h-4 text-neutral-400" />
                  <span>oi@caju.com.br</span>
                </div>
              </div>
            </div>
          </div>

          <button
            id="support-understood-btn"
            onClick={onClose}
            className="mt-5 w-full h-11 bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold rounded-xl transition-all"
          >
            Entendido, voltar à ativação
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

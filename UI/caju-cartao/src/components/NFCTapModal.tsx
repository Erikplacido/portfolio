import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Smartphone, Wifi, Check, Sparkles } from 'lucide-react';

interface NFCTapModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (code: string) => void;
}

export const NFCTapModal: React.FC<NFCTapModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [tapping, setTapping] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSimulateTap = () => {
    setTapping(true);
    setTimeout(() => {
      setSuccess(true);
      setTimeout(() => {
        onSuccess('7291');
        onClose();
        setTapping(false);
        setSuccess(false);
      }, 700);
    }, 1200);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="absolute inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end">
        <motion.div
          id="nfc-tap-bottom-sheet"
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', damping: 26, stiffness: 300 }}
          className="w-full bg-white rounded-t-[28px] p-6 pb-8 shadow-2xl flex flex-col items-center select-none"
        >
          {/* Handle */}
          <div className="w-12 h-1.5 bg-neutral-200 rounded-full mb-4" />

          {/* Close Header */}
          <div className="w-full flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">
              Aproximação NFC
            </span>
            <button
              id="nfc-close-btn"
              onClick={onClose}
              className="p-1.5 rounded-full text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Illustration Area */}
          <div className="relative w-48 h-48 my-2 flex items-center justify-center">
            {/* Pulsing Radar Waves */}
            <motion.div
              className="absolute w-40 h-40 rounded-full border-2 border-[#EA3C36]/25"
              animate={{ scale: [0.8, 1.3, 0.8], opacity: [0.6, 0.1, 0.6] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
              className="absolute w-28 h-28 rounded-full border-2 border-[#EA3C36]/40"
              animate={{ scale: [0.85, 1.2, 0.85], opacity: [0.8, 0.2, 0.8] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.3, ease: 'easeInOut' }}
            />

            {/* Smartphone Graphic */}
            <div className="relative z-10 w-24 h-40 bg-neutral-900 rounded-[20px] p-1.5 shadow-xl border-2 border-neutral-700 flex flex-col items-center">
              <div className="w-7 h-1.5 bg-neutral-700 rounded-full mb-1" />
              <div className="w-full flex-1 bg-neutral-800 rounded-[12px] flex flex-col items-center justify-center gap-1">
                {success ? (
                  <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-white shadow-md">
                    <Check className="w-6 h-6 stroke-[3]" />
                  </div>
                ) : (
                  <>
                    <Wifi className="w-6 h-6 text-[#EA3C36] animate-pulse" />
                    <span className="text-[9px] text-white/80 font-medium text-center px-1">
                      {tapping ? 'Lendo chip...' : 'Pronto'}
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Floating Card Tap Graphic */}
            <motion.div
              className="absolute z-20 w-32 h-20 bg-gradient-to-br from-[#EA3C36] to-[#C91812] rounded-[10px] shadow-2xl p-2 text-white flex flex-col justify-between border border-white/20"
              animate={
                tapping
                  ? { x: [40, 0, 0], y: [-20, 10, 10], rotateZ: [-15, 0, 0] }
                  : { x: 35, y: -15, rotateZ: -18 }
              }
              transition={{ duration: 0.8, ease: 'easeInOut' }}
            >
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-bold">caju</span>
                <Wifi className="w-3 h-3 rotate-90 opacity-80" />
              </div>
              <span className="text-[9px] font-mono tracking-widest">•••• 7291</span>
            </motion.div>
          </div>

          <h3 className="text-lg font-bold text-neutral-900 text-center">
            {success ? 'Cartão Identificado!' : 'Aproxime da traseira'}
          </h3>
          <p className="text-xs text-neutral-500 text-center max-w-xs mt-1 mb-5">
            {success
              ? 'Código 7291 obtido com sucesso via antena NFC com segurança PCI-DSS.'
              : 'Mantenha o cartão físico Caju encostado na parte superior traseira do celular.'}
          </p>

          {/* Action Button */}
          <button
            id="nfc-simulate-action-btn"
            onClick={handleSimulateTap}
            disabled={tapping || success}
            className="w-full h-12 bg-[#EA3C36] hover:bg-[#D42D28] active:scale-[0.98] disabled:opacity-50 text-white font-semibold text-sm rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-[#EA3C36]/20 transition-all"
          >
            <Sparkles className="w-4 h-4" />
            <span>{tapping ? 'Lendo dados seguros...' : 'Simular Encostar Cartão'}</span>
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

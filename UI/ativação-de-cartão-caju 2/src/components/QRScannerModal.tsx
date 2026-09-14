import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, QrCode, Sparkles, Camera, Check } from 'lucide-react';

interface QRScannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCodeDetected: (code: string) => void;
}

export const QRScannerModal: React.FC<QRScannerModalProps> = ({
  isOpen,
  onClose,
  onCodeDetected,
}) => {
  const [detected, setDetected] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setDetected(false);
    }
  }, [isOpen]);

  const handleSimulateScan = () => {
    setDetected(true);
    setTimeout(() => {
      onCodeDetected('7291');
      onClose();
    }, 650);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        id="qr-scanner-modal-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 z-50 bg-black/90 flex flex-col justify-between text-white p-5 select-none"
      >
        {/* Header */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-2">
            <Camera className="w-5 h-5 text-[#EA3C36]" />
            <span className="text-sm font-semibold tracking-wide">Escanear QR do Envelope</span>
          </div>
          <button
            id="qr-close-button"
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 flex items-center justify-center transition-all"
            aria-label="Fechar scanner"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Viewfinder Target */}
        <div className="relative flex flex-col items-center justify-center my-auto">
          <div className="relative w-64 h-64 border-2 border-white/20 rounded-2xl flex items-center justify-center overflow-hidden bg-black/40 backdrop-blur-xs">
            {/* Viewfinder corners */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-[#EA3C36] rounded-tl-xl" />
            <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-[#EA3C36] rounded-tr-xl" />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-[#EA3C36] rounded-bl-xl" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-[#EA3C36] rounded-br-xl" />

            {/* Laser scanning bar animation */}
            {!detected && (
              <motion.div
                className="absolute left-4 right-4 h-0.5 bg-gradient-to-r from-transparent via-[#EA3C36] to-transparent shadow-[0_0_12px_#EA3C36]"
                animate={{ y: [-90, 90, -90] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
              />
            )}

            {/* Simulated Envelope QR inside viewfinder */}
            <div className="p-4 bg-white/90 rounded-xl text-neutral-900 shadow-lg flex flex-col items-center gap-2">
              <QrCode className="w-24 h-24 text-neutral-900" />
              <div className="text-[10px] font-mono font-bold text-neutral-600 tracking-wider">
                CAJU-ENV-7291
              </div>
            </div>

            {/* Success flash overlay */}
            {detected && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 bg-[#EA3C36]/30 flex flex-col items-center justify-center gap-2"
              >
                <div className="w-12 h-12 rounded-full bg-emerald-500 flex items-center justify-center shadow-lg">
                  <Check className="w-7 h-7 text-white stroke-[3]" />
                </div>
                <span className="text-sm font-bold text-white drop-shadow">Código 7291 Lido!</span>
              </motion.div>
            )}
          </div>

          <p className="mt-4 text-xs text-center text-white/70 max-w-xs px-4">
            Aponte a câmera para o QR impresso na carta de boas-vindas que acompanha seu cartão Caju.
          </p>
        </div>

        {/* Footer simulation action */}
        <div className="pb-3 flex flex-col gap-2.5">
          <button
            id="qr-simulate-detect-btn"
            onClick={handleSimulateScan}
            disabled={detected}
            className="w-full h-12 bg-white text-neutral-900 hover:bg-neutral-100 active:scale-[0.98] rounded-xl font-semibold text-sm flex items-center justify-center gap-2 shadow-lg transition-all"
          >
            <Sparkles className="w-4 h-4 text-[#EA3C36]" />
            <span>Simular Leitura Automática (7291)</span>
          </button>

          <button
            id="qr-cancel-btn"
            onClick={onClose}
            className="w-full py-2.5 text-xs text-white/60 hover:text-white transition-colors"
          >
            Prefiro digitar os 4 dígitos manualmente
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

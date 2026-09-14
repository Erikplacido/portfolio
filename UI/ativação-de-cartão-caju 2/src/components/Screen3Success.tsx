import React, { useEffect, useState } from 'react';
import { X, Check, Smartphone, ArrowRight, ShieldCheck, CreditCard } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { CajuCard } from './CajuCard';
import { OSPlatform } from '../types';

interface Screen3Props {
  digits: string;
  osPlatform: OSPlatform;
  onClose: () => void;
  onGoHome: () => void;
}

export const Screen3Success: React.FC<Screen3Props> = ({
  digits,
  osPlatform,
  onClose,
  onGoHome,
}) => {
  const [isWalletAdded, setIsWalletAdded] = useState(false);
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const [isProvisioning, setIsProvisioning] = useState(false);

  // Trigger celebration particles on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        confetti({
          particleCount: 50,
          spread: 65,
          origin: { y: 0.4 },
          colors: ['#EA3C36', '#FF6B6B', '#10B981', '#FFD166', '#FFFFFF'],
          disableForReducedMotion: true,
        });
      } catch {
        // Fallback gracefully
      }
    }, 450);

    return () => clearTimeout(timer);
  }, []);

  const handleStartWalletAdd = () => {
    setIsWalletModalOpen(true);
  };

  const handleConfirmProvision = () => {
    setIsProvisioning(true);
    setTimeout(() => {
      setIsProvisioning(false);
      setIsWalletAdded(true);
      setTimeout(() => {
        setIsWalletModalOpen(false);
      }, 700);
    }, 1400);
  };

  const isApple = osPlatform === 'ios';

  return (
    <div className="flex flex-col h-full bg-white select-none relative overflow-hidden">
      {/* Header: Close button (x) on right */}
      <div className="px-5 pt-3 pb-2 flex items-center justify-end border-b border-neutral-100 shrink-0">
        <button
          id="screen3-close-btn"
          onClick={onClose}
          className="w-9 h-9 rounded-full flex items-center justify-center text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 active:scale-95 transition-all"
          aria-label="Fechar e concluir"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 px-5 pt-2 pb-4 flex flex-col items-center justify-between overflow-y-auto">
        {/* Top Hero Animation Section */}
        <div className="w-full flex flex-col items-center">
          {/* Card Hero with 3D Rotation & Status Badge */}
          <div className="py-2">
            <CajuCard
              digits={digits || '7291'}
              isAngled={false}
              isActive={true}
              isFlipping={true}
              showStatusBadge={true}
            />
          </div>

          {/* Achievement Title & Microcopy */}
          <div className="text-center mt-3">
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              className="text-[22px] font-bold text-neutral-900 tracking-tight leading-snug"
            >
              Tudo pronto para você usar!
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.4 }}
              className="mt-1 text-[13px] text-neutral-500 max-w-xs mx-auto"
            >
              Seu cartão físico Caju multibenefícios está ativo e validado para uso imediato em compras.
            </motion.p>
          </div>
        </div>

        {/* Immediate Action Card: Digital Wallet (Slide-Up) */}
        <motion.div
          id="digital-wallet-card"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="w-full bg-neutral-50 rounded-2xl p-4 border border-neutral-200/70 shadow-2xs my-3 relative overflow-hidden"
        >
          {/* Subtle background decoration */}
          <div className="flex items-start gap-3.5">
            {/* Wallet Icon Pill */}
            <div className="w-11 h-11 rounded-xl bg-white border border-neutral-200/80 shadow-xs flex items-center justify-center shrink-0">
              {isApple ? (
                // Apple Pay Logo Representation
                <div className="flex items-center text-black">
                  <svg className="w-7 h-7" viewBox="0 0 170 170" fill="currentColor">
                    <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.69-3.04-7.69-7.85-12-14.42-6.19-9.35-10.99-19.9-14.39-31.66-3.41-11.75-5.12-22.95-5.12-33.6 0-14.58 3.7-26.69 11.1-36.32 7.4-9.63 16.57-14.57 27.52-14.82 4.47 0 9.54 1.25 15.2 3.75 5.66 2.5 9.4 3.79 11.23 3.86 1.41 0 5.38-1.42 11.9-4.26 6.53-2.83 12.08-4.14 16.65-3.92 12.84.65 22.88 5.76 30.12 15.34-11.32 6.86-16.87 16.34-16.65 28.42.22 9.58 3.81 17.52 10.78 23.83 6.96 6.31 15.34 10.13 25.13 11.43-2.18 6.53-4.9 13.06-8.17 19.59zM119.22 33.09c0-7.18 2.61-14.15 7.84-20.9 5.22-6.75 11.75-11.21 19.59-13.39.22 1.09.33 2.18.33 3.27 0 7.18-2.67 14.15-8.01 20.9-5.33 6.75-11.86 11.21-19.58 13.39-.07-.98-.17-2.07-.17-3.27z" />
                  </svg>
                </div>
              ) : (
                // Google Wallet Logo Representation
                <div className="flex items-center text-neutral-800">
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                    <rect x="2" y="5" width="20" height="14" rx="3" fill="#4285F4" />
                    <rect x="2" y="8" width="20" height="4" fill="#34A853" opacity="0.8" />
                    <rect x="14" y="11" width="6" height="5" rx="1.5" fill="#FBBC05" />
                    <circle cx="17" cy="13.5" r="1.5" fill="#EA4335" />
                  </svg>
                </div>
              )}
            </div>

            <div className="flex-1">
              <h3 className="text-sm font-bold text-neutral-900 leading-snug">
                Pague sem tirar o cartão da carteira
              </h3>
              <p className="text-xs text-neutral-500 mt-0.5 leading-relaxed">
                Adicione agora ao seu celular para usar por aproximação hoje mesmo.
              </p>
            </div>
          </div>

          {/* Native Black Action Button */}
          <div className="mt-3.5">
            {isWalletAdded ? (
              <div className="w-full h-11 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center gap-2 text-xs font-bold">
                <Check className="w-4 h-4 text-emerald-600 stroke-[3]" />
                <span>Vinculado ao {isApple ? 'Apple Wallet' : 'Google Pay'}</span>
              </div>
            ) : (
              <button
                id="screen3-add-wallet-btn"
                onClick={handleStartWalletAdd}
                className="w-full h-11 bg-black hover:bg-neutral-900 active:scale-[0.99] text-white rounded-xl font-medium text-xs flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
              >
                <span>+</span>
                <span>Adicionar ao {isApple ? 'Apple Wallet' : 'Google Pay'}</span>
              </button>
            )}
          </div>
        </motion.div>

        {/* Footer: Tertiary text button "Acessar início" */}
        <div className="w-full shrink-0 pt-1 pb-1 flex flex-col items-center">
          <button
            id="screen3-go-home-btn"
            onClick={onGoHome}
            className="w-full py-2.5 text-xs font-bold text-neutral-700 hover:text-[#EA3C36] active:scale-[0.98] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <span>Acessar início</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Simulated Native Wallet Provisioning Sheet */}
      <AnimatePresence>
        {isWalletModalOpen && (
          <div className="absolute inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-end select-none">
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 320 }}
              className="w-full bg-white rounded-t-[28px] p-6 pb-8 shadow-2xl flex flex-col items-center"
            >
              <div className="w-12 h-1.5 bg-neutral-200 rounded-full mb-3" />

              <div className="w-12 h-12 rounded-2xl bg-neutral-900 text-white flex items-center justify-center shadow-md mb-3">
                <Smartphone className="w-6 h-6" />
              </div>

              <h3 className="text-base font-bold text-neutral-900 text-center">
                {isApple ? 'Adicionar ao Apple Wallet' : 'Adicionar à Carteira do Google'}
              </h3>
              <p className="text-xs text-neutral-500 text-center max-w-xs mt-1 mb-4">
                Vincule o cartão Caju Multibenefícios (•••• {digits || '7291'}) para pagamentos seguros com Face ID ou biometria.
              </p>

              {/* Card preview inside sheet */}
              <div className="w-full p-3 bg-neutral-50 rounded-xl border border-neutral-200/80 flex items-center justify-between mb-5">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-7 rounded bg-gradient-to-br from-[#EA3C36] to-[#C91812] flex items-center justify-center p-1 shadow-xs">
                    <img src="/assets/caju-logo-horizontal.svg" alt="Caju" className="h-3 w-auto brightness-200" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-neutral-800">Caju Benefícios</div>
                    <div className="text-[11px] font-mono text-neutral-500">•••• {digits || '7291'}</div>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-[10px] text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  <ShieldCheck className="w-3 h-3" />
                  <span>Tokenizado</span>
                </div>
              </div>

              <div className="w-full flex flex-col gap-2">
                <button
                  id="wallet-confirm-btn"
                  onClick={handleConfirmProvision}
                  disabled={isProvisioning || isWalletAdded}
                  className="w-full h-12 bg-black hover:bg-neutral-900 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 active:scale-98 transition-all"
                >
                  {isProvisioning ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Conectando com emissor Caju...</span>
                    </>
                  ) : isWalletAdded ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span>Adicionado com Sucesso!</span>
                    </>
                  ) : (
                    <span>Confirmar Adição</span>
                  )}
                </button>

                <button
                  id="wallet-cancel-btn"
                  onClick={() => setIsWalletModalOpen(false)}
                  disabled={isProvisioning}
                  className="w-full py-2.5 text-xs text-neutral-500 hover:text-neutral-800 transition-colors"
                >
                  Agora não
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

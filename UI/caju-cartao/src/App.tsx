import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  Sliders,
  RotateCcw,
  Smartphone,
  ShieldCheck,
  CheckCircle2,
  ChevronRight,
  AlertTriangle,
} from 'lucide-react';
import { Step, OSPlatform, EdgeCase } from './types';
import { fintechEdgeCases } from './data/edgeCases';
import { MobileFrame } from './components/MobileFrame';
import { Screen1Identification } from './components/Screen1Identification';
import { Screen2Password } from './components/Screen2Password';
import { Screen3Success } from './components/Screen3Success';
import { QRScannerModal } from './components/QRScannerModal';
import { NFCTapModal } from './components/NFCTapModal';
import { SupportSheet } from './components/SupportSheet';
import { EdgeCaseModal } from './components/EdgeCaseModal';
import { MotionHandoffDrawer } from './components/MotionHandoffDrawer';

export default function App() {
  const [step, setStep] = useState<Step>(1);
  const [pin, setPin] = useState<string[]>(['', '', '', '']);
  const [createdPassword, setCreatedPassword] = useState<string>('');
  const [osPlatform, setOsPlatform] = useState<OSPlatform>('ios');

  // Modals & Bottom Sheets
  const [isQRScannerOpen, setIsQRScannerOpen] = useState(false);
  const [isNFCTapOpen, setIsNFCTapOpen] = useState(false);
  const [isSupportOpen, setIsSupportOpen] = useState(false);
  const [activeEdgeCase, setActiveEdgeCase] = useState<EdgeCase | null>(null);
  const [isHandoffOpen, setIsHandoffOpen] = useState(false);
  const [homeToast, setHomeToast] = useState(false);

  // Reset full flow
  const handleResetFlow = () => {
    setStep(1);
    setPin(['', '', '', '']);
    setCreatedPassword('');
    setActiveEdgeCase(null);
    setIsQRScannerOpen(false);
    setIsNFCTapOpen(false);
    setIsSupportOpen(false);
  };

  const handlePinFilledByScanner = (code: string) => {
    const digits = code.slice(0, 4).split('');
    setPin(digits);
  };

  const handlePinFilledByNFC = (code: string) => {
    const digits = code.slice(0, 4).split('');
    setPin(digits);
  };

  const handleStep1Continue = () => {
    setStep(2);
  };

  const handleStep2PasswordSuccess = (pwd: string) => {
    setCreatedPassword(pwd);
    setStep(3);
  };

  const handleGoHome = () => {
    setHomeToast(true);
    setTimeout(() => {
      setHomeToast(false);
      handleResetFlow();
    }, 2400);
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Top Application Bar */}
      <header className="w-full bg-neutral-900/90 border-b border-neutral-800 backdrop-blur-md px-4 sm:px-6 py-3 shrink-0 flex flex-wrap items-center justify-between gap-3 z-40">
        {/* Brand & Project Info */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#EA3C36] to-[#C91812] flex items-center justify-center shadow-sm border border-white/10 shrink-0 p-1">
            <svg className="w-5 h-5" viewBox="0 0 1420 1750" fill="none">
              <path d="m708.401 1049.916c103.678 1.907 190.047-31.202 239.282-112.04 35.588-58.433 21.546-126.438 39.828-225.24 18.686-101.157 63.921-198.938 32.921-268.422-13.39-30.032-31.115-50.099-52.77-66.766-59.631-45.88-145.411-41.2-205.411-16.626-70.611 28.893-107.579-5.254-145.923-12.32-32.797-6.014-59.077-13.227-110.948-.28-21.77 5.413-71.099 27.586-99.781 82.606-39.52 75.782.292 136.088 28.729 267.276 26.37 121.678 17.735 201.62 61.75 260.22 44.031 58.562 108.64 89.692 212.323 91.592z" fill="#FFFFFF"/>
              <path d="m797.521 251.088c.088-35.973-30.693-64.786-68.609-64.213-7.89.12-15.313-2.667-20.824-7.827-5.51-5.173-8.536-12.146-8.52-19.64.02-7.506 3.083-14.573 8.62-19.893 5.561-5.333 12.973-8.32 20.875-8.44 37.906-.573 68.838-30.547 68.937-66.853.099-35.987-30.688-64.787-68.599-64.214-44.218.64-86.229 17.947-118.218 48.707-31.615 30.307-49.063 70.373-49.183 112.72-.099 42.347 17.161 81.88 48.599 111.307 31.849 29.826 73.761 45.893 117.98 45.226 37.932-.56 68.869-30.56 68.942-66.88z" fill="#00E984"/>
            </svg>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-white tracking-tight text-sm sm:text-base flex items-center gap-1.5">
                <svg className="h-4.5 w-auto inline-block" viewBox="0 0 98 40" fill="none">
                  <path d="M13.7402 7.64989C13.1079 7.63456 12.6 7.11907 12.6 6.48477C12.6 5.85048 13.1079 5.33499 13.7402 5.31966C15.2081 5.31966 16.4001 4.12772 16.4001 2.65983C16.4001 1.19194 15.21 0 13.7402 0C10.1472 0 7.23438 2.88979 7.23438 6.48286C7.23438 10.0759 10.1472 12.9657 13.7402 12.9657C15.2081 12.9657 16.4001 11.7757 16.4001 10.3059C16.4001 8.83608 15.21 7.64605 13.7402 7.64605V7.64989Z" fill="#00E984"/>
                  <path fillRule="evenodd" clipRule="evenodd" d="M25.3574 17.5945C24.2115 15.3466 22.2319 14.4383 21.3619 14.216C19.2847 13.691 18.2307 13.9803 16.9199 14.2275C16.3221 14.3406 14.5418 15.1608 12.8535 15.1569C11.1653 15.1531 9.6629 14.3329 9.10142 14.2275C7.79067 13.9803 6.7367 13.691 4.65943 14.216C3.78942 14.4383 1.80989 15.3466 0.663935 17.5945C-0.917016 20.6951 0.675429 23.1594 1.81563 28.5212C2.55149 31.39 2.42694 33.8639 4.1861 36.2612C5.94527 38.6585 8.54761 39.9175 12.6964 39.998C12.9264 40.0018 13.1199 40.0018 13.323 39.998C17.4718 39.9175 20.0742 38.6585 21.8334 36.2612C23.5925 33.8639 23.468 31.39 24.2038 28.5212C25.344 23.1594 26.9365 20.6951 25.3555 17.5945H25.3574Z" fill="#FF7500"/>
                  <path d="M76.7161 31.7034V14.4017H69.302V18.7734H71.2667V31.2588C71.2667 33.704 70.2288 35.1859 68.3382 35.4453L68.3753 39.3354C68.8201 39.3724 69.2649 39.4095 69.7469 39.4095C73.9729 39.4095 76.7161 36.3715 76.7161 31.7034ZM97.4756 33.0001H92.1745V29.5175H91.8038C90.8029 31.8516 88.5416 33.3335 85.8354 33.3335C82.2025 33.3335 79.7188 30.629 79.7188 26.4425V14.4388H85.2052V25.4422C85.2052 27.7021 86.4656 29.147 88.5416 29.147C90.6175 29.147 92.0262 27.628 92.0262 25.294V14.4388H97.4756V33.0001ZM62.3698 33.0001V29.888H62.0362C61.2207 31.9627 59.1447 33.3335 56.5127 33.3335C53.1022 33.3335 51.1004 31.0365 51.1004 27.9985C51.1004 25.3681 52.6203 23.4786 56.8463 22.7006L59.9973 22.1078C61.5914 21.8114 62.1845 21.2557 62.1845 20.2554C62.1845 19.0328 61.2948 18.2918 59.5154 18.2918C57.6619 18.2918 56.6239 19.1069 56.5127 20.6259L56.4756 21.0705H51.2858L51.3228 20.6259C51.6565 16.6246 54.8075 14.1053 59.8861 14.1053C65.1131 14.1053 67.6709 16.8099 67.6709 20.9593V33.0001H62.3698ZM62.1845 26.3313V24.4419C61.7396 24.7753 61.0353 25.0717 60.2198 25.2569L58.5887 25.6645C57.1429 25.9979 56.6239 26.6277 56.6239 27.628C56.6239 28.9618 57.5507 29.7028 59.1076 29.7028C60.9241 29.7028 62.1845 28.7025 62.1845 26.3313ZM49.5435 26.2572H43.9829C43.8346 27.8133 42.5001 28.8877 40.7207 28.8877C38.2741 28.8877 36.68 26.85 36.68 23.7009C36.68 20.5518 38.2741 18.5512 40.7207 18.5512C42.463 18.5512 43.7605 19.5885 43.9088 21.0705H49.4323C49.0986 16.8099 45.6511 14.0683 40.6836 14.0683C34.8265 14.0683 31.1195 17.9213 31.1565 23.775C31.1565 29.6287 34.8265 33.3335 40.6095 33.3335C45.6511 33.3335 49.2098 30.5549 49.5435 26.2572ZM73.6022 12.4752C75.604 12.4752 76.9756 11.1044 76.9756 9.06673C76.9756 7.06611 75.604 5.69531 73.6022 5.69531C71.5633 5.69531 70.1917 7.06611 70.1917 9.06673C70.1917 11.1044 71.5633 12.4752 73.6022 12.4752Z" fill="#EA3C36"/>
                </svg>
                <span className="text-neutral-400 text-xs font-normal">| Benefícios</span>
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-wider bg-[#EA3C36]/20 text-[#EA3C36] border border-[#EA3C36]/30 px-2 py-0.5 rounded-full">
                Ativação & Carteira Digital
              </span>
            </div>
            <p className="text-[11px] text-neutral-400 hidden sm:block">
              Mobile Viewport 390 × 844 px • Ciclo de vida, segurança, validação em tempo real e motion 3D
            </p>
          </div>
        </div>

        {/* Global Controls: Step selector, OS platform, Specs button */}
        <div className="flex items-center flex-wrap gap-2">
          {/* Step direct switcher */}
          <div className="hidden lg:flex items-center bg-neutral-800/80 p-1 rounded-xl border border-neutral-700/60 text-xs">
            <button
              onClick={() => setStep(1)}
              className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                step === 1
                  ? 'bg-[#EA3C36] text-white shadow-xs'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              1. Identificação
            </button>
            <button
              onClick={() => setStep(2)}
              className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                step === 2
                  ? 'bg-[#EA3C36] text-white shadow-xs'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              2. Criação de Senha
            </button>
            <button
              onClick={() => setStep(3)}
              className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                step === 3
                  ? 'bg-[#EA3C36] text-white shadow-xs'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              3. Ativação & Wallet
            </button>
          </div>

          {/* OS Switcher */}
          <div className="flex items-center bg-neutral-800 p-0.5 rounded-lg border border-neutral-700 text-xs">
            <button
              id="platform-ios-toggle"
              onClick={() => setOsPlatform('ios')}
              className={`px-2 py-1 rounded-md transition-all ${
                osPlatform === 'ios'
                  ? 'bg-neutral-700 text-white font-semibold'
                  : 'text-neutral-400 hover:text-white'
              }`}
              title="iOS (Apple Pay)"
            >
              iOS
            </button>
            <button
              id="platform-android-toggle"
              onClick={() => setOsPlatform('android')}
              className={`px-2 py-1 rounded-md transition-all ${
                osPlatform === 'android'
                  ? 'bg-neutral-700 text-white font-semibold'
                  : 'text-neutral-400 hover:text-white'
              }`}
              title="Android (Google Wallet)"
            >
              Android
            </button>
          </div>

          {/* Handoff Specs Button */}
          <button
            id="open-motion-handoff-btn"
            onClick={() => setIsHandoffOpen(true)}
            className="px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 hover:text-white border border-neutral-700 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <Sliders className="w-3.5 h-3.5 text-[#EA3C36]" />
            <span className="hidden sm:inline">Specs Motion & PM</span>
            <span className="sm:hidden">Specs</span>
          </button>

          {/* Reset Flow */}
          <button
            id="reset-flow-btn"
            onClick={handleResetFlow}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
            title="Reiniciar Fluxo"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Workspace Area */}
      <div className="flex-1 flex flex-col lg:flex-row items-center justify-center p-3 sm:p-6 gap-6 max-w-7xl mx-auto w-full">
        {/* Left Side: Interactive Edge Cases Quick Launcher on Desktop */}
        <div className="hidden xl:flex flex-col w-64 shrink-0 bg-neutral-900/60 p-4 rounded-2xl border border-neutral-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
              <span>Simular Falhas (PM)</span>
            </span>
            <span className="text-[10px] text-neutral-500 font-mono">5 Casos</span>
          </div>

          <p className="text-[11px] text-neutral-400 leading-relaxed">
            Dispare os casos de borda e veja a tela de erro com microcopy empático em PT-BR:
          </p>

          <div className="space-y-1.5">
            {fintechEdgeCases.map((ec) => (
              <button
                key={ec.id}
                onClick={() => setActiveEdgeCase(ec)}
                className="w-full text-left p-2 rounded-xl bg-neutral-800/60 hover:bg-[#EA3C36]/15 hover:border-[#EA3C36]/30 border border-neutral-800 text-xs text-neutral-300 hover:text-white transition-all flex items-center justify-between group"
              >
                <span className="truncate pr-1">{ec.triggerLabel}</span>
                <ChevronRight className="w-3.5 h-3.5 text-neutral-500 group-hover:text-[#EA3C36] shrink-0" />
              </button>
            ))}
          </div>

          <div className="pt-2 border-t border-neutral-800">
            <div className="flex items-center gap-1.5 text-[10px] text-neutral-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span>Conforme PCI-DSS & BACEN</span>
            </div>
          </div>
        </div>

        {/* Center: The Mobile Device Container (390 × 844 px) */}
        <div className="relative flex items-center justify-center">
          <MobileFrame osPlatform={osPlatform} currentTime="09:41">
            {/* SCREEN 1: Identificação do Cartão Recebido */}
            {step === 1 && (
              <Screen1Identification
                pin={pin}
                setPin={setPin}
                onContinue={handleStep1Continue}
                onOpenQRScanner={() => setIsQRScannerOpen(true)}
                onOpenNFCTap={() => setIsNFCTapOpen(true)}
                onOpenSupport={() => setIsSupportOpen(true)}
              />
            )}

            {/* SCREEN 2: Criação de Senha e Validação em Tempo Real */}
            {step === 2 && (
              <Screen2Password
                onBack={() => setStep(1)}
                onSuccess={handleStep2PasswordSuccess}
              />
            )}

            {/* SCREEN 3: Ativação Concluída e Vinculação Expressiva */}
            {step === 3 && (
              <Screen3Success
                digits={pin.join('') || '7291'}
                osPlatform={osPlatform}
                onClose={handleResetFlow}
                onGoHome={handleGoHome}
              />
            )}

            {/* In-device QR Scanner Overlay */}
            <QRScannerModal
              isOpen={isQRScannerOpen}
              onClose={() => setIsQRScannerOpen(false)}
              onCodeDetected={handlePinFilledByScanner}
            />

            {/* In-device NFC Proximity Tap Modal */}
            <NFCTapModal
              isOpen={isNFCTapOpen}
              onClose={() => setIsNFCTapOpen(false)}
              onSuccess={handlePinFilledByNFC}
            />

            {/* In-device Help / Support Sheet */}
            <SupportSheet
              isOpen={isSupportOpen}
              onClose={() => setIsSupportOpen(false)}
            />

            {/* In-device Edge Case Error Modal */}
            <EdgeCaseModal
              edgeCase={activeEdgeCase}
              onClose={() => setActiveEdgeCase(null)}
              onResolve={() => {
                setActiveEdgeCase(null);
                // Pre-fill valid pin on resolve
                setPin(['7', '2', '9', '1']);
              }}
            />

            {/* Home Toast Feedback */}
            <AnimatePresence>
              {homeToast && (
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="absolute bottom-10 left-6 right-6 z-50 bg-neutral-900 text-white px-4 py-3 rounded-2xl shadow-2xl border border-neutral-700 flex items-center gap-3 text-xs"
                >
                  <div className="w-7 h-7 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold">Redirecionando para Início</div>
                    <div className="text-neutral-400 text-[11px]">Cartão ativado e pronto para uso.</div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </MobileFrame>
        </div>

        {/* Right Side: Step Insights & Guide on Desktop */}
        <div className="hidden xl:flex flex-col w-72 shrink-0 bg-neutral-900/60 p-4 rounded-2xl border border-neutral-800 space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold text-white uppercase tracking-wider">
            <Smartphone className="w-4 h-4 text-[#EA3C36]" />
            <span>Fluxo de 3 Etapas</span>
          </div>

          <div className="space-y-2.5 text-xs">
            {/* Step 1 indicator */}
            <div
              onClick={() => setStep(1)}
              className={`p-3 rounded-xl border transition-all cursor-pointer ${
                step === 1
                  ? 'bg-neutral-800 border-[#EA3C36]/50 text-white'
                  : 'bg-neutral-800/30 border-neutral-800/80 text-neutral-400 hover:text-neutral-200'
              }`}
            >
              <div className="flex items-center justify-between font-semibold">
                <span>Tela 1: Identificação</span>
                {step > 1 ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <span className="text-[10px] text-[#EA3C36]">Ativa</span>
                )}
              </div>
              <p className="text-[11px] text-neutral-400 mt-1">
                Entrada dos 4 dígitos •••• 7291, NFC por proximidade, Leitor QR do envelope e selo PCI-DSS.
              </p>
            </div>

            {/* Step 2 indicator */}
            <div
              onClick={() => setStep(2)}
              className={`p-3 rounded-xl border transition-all cursor-pointer ${
                step === 2
                  ? 'bg-neutral-800 border-[#EA3C36]/50 text-white'
                  : 'bg-neutral-800/30 border-neutral-800/80 text-neutral-400 hover:text-neutral-200'
              }`}
            >
              <div className="flex items-center justify-between font-semibold">
                <span>Tela 2: Criação de Senha</span>
                {step > 2 ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                ) : step === 2 ? (
                  <span className="text-[10px] text-[#EA3C36]">Ativa</span>
                ) : (
                  <span className="text-[10px] text-neutral-600">Pendente</span>
                )}
              </div>
              <p className="text-[11px] text-neutral-400 mt-1">
                Passo 2 de 3 (barra 66%), dots ● ● ○ ○, validação dinâmica (sem sequências/anos) e teclado numérico customizado.
              </p>
            </div>

            {/* Step 3 indicator */}
            <div
              onClick={() => setStep(3)}
              className={`p-3 rounded-xl border transition-all cursor-pointer ${
                step === 3
                  ? 'bg-neutral-800 border-[#EA3C36]/50 text-white'
                  : 'bg-neutral-800/30 border-neutral-800/80 text-neutral-400 hover:text-neutral-200'
              }`}
            >
              <div className="flex items-center justify-between font-semibold">
                <span>Tela 3: Conclusão & Wallet</span>
                {step === 3 ? (
                  <span className="text-[10px] text-[#EA3C36]">Ativa</span>
                ) : (
                  <span className="text-[10px] text-neutral-600">Pendente</span>
                )}
              </div>
              <p className="text-[11px] text-neutral-400 mt-1">
                Rotação 3D do cartão inativo &rarr; ativo Caju, confetes, tag &quot;Cartão Ativo&quot; e adição à Apple Wallet / Google Pay.
              </p>
            </div>
          </div>

          <div className="pt-2 border-t border-neutral-800 text-[11px] text-neutral-400">
            <span className="font-semibold text-neutral-300 block mb-1">Dica de Interação:</span>
            Digite <code className="text-[#EA3C36] font-bold">7291</code> na Tela 1 ou use o botão de aproximação NFC / QR scanner para avançar com rapidez.
          </div>
        </div>
      </div>

      {/* Motion & PM Specs Drawer */}
      <MotionHandoffDrawer
        isOpen={isHandoffOpen}
        onClose={() => setIsHandoffOpen(false)}
        onSelectEdgeCase={(ec) => setActiveEdgeCase(ec)}
      />
    </div>
  );
}

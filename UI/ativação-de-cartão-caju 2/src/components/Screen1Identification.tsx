import React, { useRef, useEffect } from 'react';
import { ArrowLeft, HelpCircle, ShieldCheck, QrCode, Radio } from 'lucide-react';
import { CajuCard } from './CajuCard';

interface Screen1Props {
  pin: string[];
  setPin: (pin: string[]) => void;
  onContinue: () => void;
  onOpenQRScanner: () => void;
  onOpenNFCTap: () => void;
  onOpenSupport: () => void;
}

export const Screen1Identification: React.FC<Screen1Props> = ({
  pin,
  setPin,
  onContinue,
  onOpenQRScanner,
  onOpenNFCTap,
  onOpenSupport,
}) => {
  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  // Auto-focus first empty box
  useEffect(() => {
    const firstEmptyIndex = pin.findIndex((val) => val === '');
    if (firstEmptyIndex !== -1) {
      inputRefs[firstEmptyIndex]?.current?.focus();
    }
  }, []);

  const handleInputChange = (index: number, value: string) => {
    // Only accept numeric
    const cleanVal = value.replace(/\D/g, '');
    if (!cleanVal && value !== '') return;

    const newPin = [...pin];

    if (cleanVal.length > 1) {
      // Handle paste
      const digits = cleanVal.slice(0, 4).split('');
      for (let i = 0; i < 4; i++) {
        newPin[i] = digits[i] || '';
      }
      setPin(newPin);
      const nextFocus = Math.min(cleanVal.length, 3);
      inputRefs[nextFocus]?.current?.focus();
      return;
    }

    newPin[index] = cleanVal;
    setPin(newPin);

    // Auto-advance to next input
    if (cleanVal && index < 3) {
      inputRefs[index + 1]?.current?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !pin[index] && index > 0) {
      inputRefs[index - 1]?.current?.focus();
    }
  };

  const isPinComplete = pin.every((digit) => digit.length === 1);
  const enteredCode = pin.join('');

  return (
    <div className="flex flex-col h-full bg-white select-none">
      {/* Header */}
      <div className="px-5 pt-3 pb-3 flex items-center justify-between border-b border-neutral-100 shrink-0">
        <button
          id="screen1-back-btn"
          onClick={() => {}}
          className="w-9 h-9 -ml-1.5 rounded-full flex items-center justify-center text-neutral-400 hover:text-neutral-700 active:scale-95 transition-all cursor-default"
          aria-label="Voltar"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        <h2 className="text-base font-semibold text-neutral-900 tracking-tight">
          Ativação de cartão
        </h2>

        <button
          id="screen1-help-btn"
          onClick={onOpenSupport}
          className="w-9 h-9 -mr-1.5 rounded-full flex items-center justify-center text-neutral-600 hover:text-[#EA3C36] hover:bg-[#EA3C36]/5 active:scale-95 transition-all"
          aria-label="Suporte e ajuda"
        >
          <HelpCircle className="w-5 h-5" />
        </button>
      </div>

      {/* Scrollable Body */}
      <div className="flex-1 overflow-y-auto px-5 pt-4 pb-2 flex flex-col items-center">
        {/* Mockup Hero: Caju physical card at 15° angle with embossed •••• 7291 */}
        <div className="w-full flex justify-center py-2 relative">
          <CajuCard
            digits={enteredCode || '7291'}
            isAngled={true}
            isActive={false}
          />
        </div>

        {/* Headings */}
        <div className="w-full text-center mt-3">
          <h1 className="text-[22px] font-bold text-neutral-900 tracking-tight leading-snug">
            Seu cartão novo chegou?
          </h1>
          <p className="mt-1.5 text-[14px] text-neutral-500 font-normal leading-relaxed max-w-[320px] mx-auto">
            Digite o código de 4 dígitos impresso no verso do cartão ou aproxime-o da traseira do aparelho.
          </p>
        </div>

        {/* Input PIN: 4 separate boxes with 1.5px border, active ring, pulsing cursor */}
        <div className="mt-6 flex items-center justify-center gap-3">
          {pin.map((digit, index) => {
            const isActive =
              (digit === '' && (index === 0 || pin[index - 1] !== '')) ||
              (index === 3 && digit !== '');

            return (
              <div key={index} className="relative">
                <input
                  id={`pin-box-${index}`}
                  ref={inputRefs[index]}
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className={`w-13 h-14 text-center text-2xl font-bold font-mono rounded-xl bg-neutral-50 transition-all outline-hidden ${
                    digit
                      ? 'border-[1.5px] border-[#EA3C36] text-neutral-900 shadow-xs bg-white'
                      : isActive
                      ? 'border-[1.5px] border-[#EA3C36] ring-3 ring-[#EA3C36]/15 bg-white'
                      : 'border-[1.5px] border-neutral-200 text-neutral-800'
                  }`}
                />
                {/* Pulsing cursor simulation if active & empty */}
                {isActive && !digit && (
                  <span className="absolute inset-x-0 bottom-3 mx-auto w-4 h-0.5 bg-[#EA3C36] animate-pulse pointer-events-none" />
                )}
              </div>
            );
          })}
        </div>

        {/* Quick NFC Proximity Trigger */}
        <button
          id="screen1-nfc-tap-btn"
          onClick={onOpenNFCTap}
          className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-[#EA3C36] hover:text-[#C91812] bg-[#EA3C36]/8 hover:bg-[#EA3C36]/12 px-3 py-1.5 rounded-full border border-[#EA3C36]/20 transition-all"
        >
          <Radio className="w-3.5 h-3.5 animate-pulse" />
          <span>Aproximar cartão por NFC</span>
        </button>

        {/* Subtle Divider: "ou escaneie o código" */}
        <div className="w-full flex items-center gap-3 my-5">
          <div className="flex-1 h-[1px] bg-neutral-200" />
          <span className="text-xs text-neutral-400 font-medium whitespace-nowrap">
            ou escaneie o código
          </span>
          <div className="flex-1 h-[1px] bg-neutral-200" />
        </div>

        {/* Secondary Button: Escanear QR do envelope */}
        <button
          id="screen1-scan-qr-btn"
          onClick={onOpenQRScanner}
          className="w-full h-11 bg-neutral-50 hover:bg-neutral-100 active:scale-[0.99] border border-neutral-200/80 rounded-xl text-xs font-semibold text-neutral-700 flex items-center justify-center gap-2 transition-all shadow-2xs"
        >
          <QrCode className="w-4 h-4 text-neutral-800" />
          <span>Escanear QR do envelope</span>
        </button>
      </div>

      {/* Footer (Fixo): Height 48px, rounded 8px + PCI-DSS */}
      <div className="p-5 pt-3 border-t border-neutral-100 bg-white shrink-0">
        <button
          id="screen1-continue-btn"
          onClick={onContinue}
          disabled={!isPinComplete}
          className={`w-full h-12 rounded-[8px] font-semibold text-sm transition-all flex items-center justify-center shadow-xs ${
            isPinComplete
              ? 'bg-[#EA3C36] hover:bg-[#D42D28] active:scale-[0.99] text-white shadow-[#EA3C36]/25 shadow-md cursor-pointer'
              : 'bg-neutral-200 text-neutral-400 cursor-not-allowed'
          }`}
        >
          Continuar
        </button>

        {/* Selo de conformidade PCI-DSS sutil */}
        <div className="mt-3 flex items-center justify-center gap-1.5 text-[11px] text-neutral-400 font-medium">
          <ShieldCheck className="w-3.5 h-3.5 text-neutral-400" />
          <span>Dados criptografados de ponta a ponta</span>
        </div>
      </div>
    </div>
  );
};

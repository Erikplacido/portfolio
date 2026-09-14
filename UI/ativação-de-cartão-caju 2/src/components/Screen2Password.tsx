import React, { useState } from 'react';
import { ArrowLeft, CheckCircle2, Delete } from 'lucide-react';
import { motion } from 'motion/react';
import { PasswordValidation } from '../types';

interface Screen2Props {
  onBack: () => void;
  onSuccess: (password: string) => void;
}

export const Screen2Password: React.FC<Screen2Props> = ({ onBack, onSuccess }) => {
  const [password, setPassword] = useState<string>('');
  const [hasErrorShake, setHasErrorShake] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Check rules dynamically
  const evaluateRules = (pwd: string): PasswordValidation => {
    if (pwd.length < 2) {
      return {
        noSequential: true,
        noBirthdateOrYear: true,
        noFourIdentical: true,
      };
    }

    // Rule 1: No sequential numbers (e.g., 1234, 4321, 2345, 9876)
    let isSequential = false;
    if (pwd.length >= 3) {
      let ascCount = 0;
      let descCount = 0;
      for (let i = 0; i < pwd.length - 1; i++) {
        const diff = Number(pwd[i + 1]) - Number(pwd[i]);
        if (diff === 1) ascCount++;
        if (diff === -1) descCount++;
      }
      if (ascCount === pwd.length - 1 || descCount === pwd.length - 1) {
        isSequential = true;
      }
    }

    // Rule 2: No birth date or current year (e.g. 1950-2026, or obvious years)
    let isBirthdateOrYear = false;
    if (pwd.length === 4) {
      const year = Number(pwd);
      if (year >= 1940 && year <= 2026) {
        isBirthdateOrYear = true;
      }
      // Common day/month combos (0101, 2512, 1205, etc.)
      const month = Number(pwd.slice(2, 4));
      const day = Number(pwd.slice(0, 2));
      if (day >= 1 && day <= 31 && month >= 1 && month <= 12) {
        isBirthdateOrYear = true;
      }
    }

    // Rule 3: No repeating the same number 4 times (1111, 2222, etc.)
    let isFourIdentical = false;
    if (pwd.length >= 3) {
      const first = pwd[0];
      if (pwd.split('').every((char) => char === first)) {
        isFourIdentical = true;
      }
    }

    return {
      noSequential: !isSequential,
      noBirthdateOrYear: !isBirthdateOrYear,
      noFourIdentical: !isFourIdentical,
    };
  };

  const validation = evaluateRules(password);

  const handleKeyPress = (num: string) => {
    if (password.length >= 4) return;
    const newPwd = password + num;
    setPassword(newPwd);
    setErrorMessage(null);

    // Auto-evaluate when 4 digits reached
    if (newPwd.length === 4) {
      const finalRules = evaluateRules(newPwd);
      if (finalRules.noSequential && finalRules.noBirthdateOrYear && finalRules.noFourIdentical) {
        // Valid PIN created!
        setTimeout(() => {
          onSuccess(newPwd);
        }, 450);
      } else {
        // Error shake
        setHasErrorShake(true);
        setTimeout(() => setHasErrorShake(false), 500);

        if (!finalRules.noSequential) {
          setErrorMessage('Evite números em sequência direta.');
        } else if (!finalRules.noFourIdentical) {
          setErrorMessage('Evite usar o mesmo número 4 vezes.');
        } else if (!finalRules.noBirthdateOrYear) {
          setErrorMessage('Evite anos ou datas de aniversário.');
        }
      }
    }
  };

  const handleBackspace = () => {
    setPassword((prev) => prev.slice(0, -1));
    setErrorMessage(null);
  };

  const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0', 'back'];

  return (
    <div className="flex flex-col h-full bg-white select-none">
      {/* Header: Back arrow and Progress Bar: Passo 2 de 3 (66%) */}
      <div className="px-5 pt-3 pb-3 border-b border-neutral-100 shrink-0">
        <div className="flex items-center justify-between">
          <button
            id="screen2-back-btn"
            onClick={onBack}
            className="w-9 h-9 -ml-1.5 rounded-full flex items-center justify-center text-neutral-600 hover:text-neutral-900 active:scale-95 transition-all"
            aria-label="Voltar para identificação"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <span className="text-xs font-semibold text-neutral-500">Passo 2 de 3</span>

          {/* Balance spacer */}
          <div className="w-9 h-9" />
        </div>

        {/* Progress Bar (66% filled) */}
        <div className="w-full h-1.5 bg-neutral-100 rounded-full mt-2 overflow-hidden">
          <motion.div
            className="h-full bg-[#EA3C36] rounded-full"
            initial={{ width: '33%' }}
            animate={{ width: '66%' }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
          />
        </div>
      </div>

      {/* Main Body */}
      <div className="flex-1 px-6 pt-5 pb-2 flex flex-col justify-between overflow-y-auto">
        {/* Title & Description */}
        <div>
          <h1 className="text-[22px] font-bold text-neutral-900 tracking-tight leading-snug">
            Crie a senha do seu cartão
          </h1>
          <p className="mt-1 text-[14px] text-neutral-500 font-normal leading-relaxed">
            Você usará estes 4 números para compras presenciais nas maquininhas.
          </p>

          {/* Dots Indicator: ● ● ○ ○ */}
          <motion.div
            id="screen2-pin-dots"
            className="my-6 flex items-center justify-center gap-5"
            animate={
              hasErrorShake
                ? {
                    x: [0, -10, 10, -8, 8, -4, 4, 0],
                  }
                : {}
            }
            transition={{ duration: 0.45 }}
          >
            {[0, 1, 2, 3].map((index) => {
              const isFilled = password.length > index;
              return (
                <motion.div
                  key={index}
                  className={`w-4 h-4 rounded-full transition-all duration-200 ${
                    isFilled
                      ? 'bg-[#EA3C36] shadow-sm shadow-[#EA3C36]/30'
                      : 'border-2 border-neutral-300 bg-neutral-100'
                  }`}
                  animate={isFilled ? { scale: [1, 1.35, 1] } : { scale: 1 }}
                  transition={{ duration: 0.2 }}
                />
              );
            })}
          </motion.div>

          {/* Dynamic Error Hint if violated */}
          {errorMessage && (
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center text-xs font-semibold text-[#EA3C36] bg-[#EA3C36]/8 py-1.5 px-3 rounded-lg -mt-2 mb-3 border border-[#EA3C36]/20"
            >
              {errorMessage}
            </motion.div>
          )}

          {/* Dynamic Validation Rules List */}
          <div className="space-y-2.5 bg-neutral-50/80 p-3.5 rounded-2xl border border-neutral-100/90">
            {/* Rule 1 */}
            <div className="flex items-center gap-2.5">
              <CheckCircle2
                className={`w-4 h-4 shrink-0 transition-colors ${
                  password.length > 0 && validation.noSequential
                    ? 'text-emerald-500'
                    : !validation.noSequential
                    ? 'text-[#EA3C36]'
                    : 'text-neutral-300'
                }`}
              />
              <span
                className={`text-xs font-medium transition-colors ${
                  password.length > 0 && validation.noSequential
                    ? 'text-neutral-700'
                    : !validation.noSequential
                    ? 'text-[#EA3C36] font-semibold'
                    : 'text-neutral-500'
                }`}
              >
                Não usar números sequenciais (ex: 1234)
              </span>
            </div>

            {/* Rule 2 */}
            <div className="flex items-center gap-2.5">
              <CheckCircle2
                className={`w-4 h-4 shrink-0 transition-colors ${
                  password.length > 0 && validation.noBirthdateOrYear
                    ? 'text-emerald-500'
                    : !validation.noBirthdateOrYear
                    ? 'text-[#EA3C36]'
                    : 'text-neutral-300'
                }`}
              />
              <span
                className={`text-xs font-medium transition-colors ${
                  password.length > 0 && validation.noBirthdateOrYear
                    ? 'text-neutral-700'
                    : !validation.noBirthdateOrYear
                    ? 'text-[#EA3C36] font-semibold'
                    : 'text-neutral-500'
                }`}
              >
                Não usar sua data de nascimento ou ano atual
              </span>
            </div>

            {/* Rule 3 */}
            <div className="flex items-center gap-2.5">
              <CheckCircle2
                className={`w-4 h-4 shrink-0 transition-colors ${
                  password.length > 0 && validation.noFourIdentical
                    ? 'text-emerald-500'
                    : !validation.noFourIdentical
                    ? 'text-[#EA3C36]'
                    : 'text-neutral-300'
                }`}
              />
              <span
                className={`text-xs font-medium transition-colors ${
                  password.length > 0 && validation.noFourIdentical
                    ? 'text-neutral-700'
                    : !validation.noFourIdentical
                    ? 'text-[#EA3C36] font-semibold'
                    : 'text-neutral-500'
                }`}
              >
                Não repetir o mesmo número 4 vezes
              </span>
            </div>
          </div>
        </div>

        {/* Custom Numeric Keypad: 3x4 Grid integrated into screen */}
        <div className="w-full mt-3 mb-2">
          <div className="grid grid-cols-3 gap-2 max-w-[320px] mx-auto">
            {keys.map((key, idx) => {
              if (key === '') {
                return <div key={`empty-${idx}`} className="h-14" />;
              }

              if (key === 'back') {
                return (
                  <button
                    key="backspace"
                    id="keypad-backspace"
                    onClick={handleBackspace}
                    disabled={password.length === 0}
                    className="h-14 rounded-2xl flex items-center justify-center text-neutral-700 hover:bg-neutral-100 active:scale-95 disabled:opacity-25 transition-all"
                    aria-label="Apagar dígito"
                  >
                    <Delete className="w-6 h-6 stroke-[1.8]" />
                  </button>
                );
              }

              return (
                <button
                  key={key}
                  id={`keypad-digit-${key}`}
                  onClick={() => handleKeyPress(key)}
                  className="h-14 rounded-2xl bg-neutral-50 hover:bg-neutral-100 active:scale-90 active:bg-neutral-200/80 text-2xl font-bold text-neutral-900 border border-neutral-200/40 shadow-2xs flex items-center justify-center transition-all"
                >
                  {key}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

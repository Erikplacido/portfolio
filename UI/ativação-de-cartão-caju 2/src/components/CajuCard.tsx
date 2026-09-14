import React from 'react';
import { motion } from 'motion/react';
import { Wifi, ShieldCheck, Sparkles } from 'lucide-react';

interface CajuCardProps {
  digits?: string;
  isAngled?: boolean;
  isActive?: boolean;
  isFlipping?: boolean;
  className?: string;
  showStatusBadge?: boolean;
}

export const CajuCard: React.FC<CajuCardProps> = ({
  digits = '7291',
  isAngled = false,
  isActive = false,
  isFlipping = false,
  className = '',
  showStatusBadge = false,
}) => {
  return (
    <div className={`relative flex flex-col items-center justify-center ${className}`}>
      {/* 3D Card Container */}
      <motion.div
        id="caju-physical-card"
        className="relative w-[280px] h-[176px] rounded-[16px] p-5 select-none overflow-hidden transition-all"
        style={{
          perspective: 1200,
          transformStyle: 'preserve-3d',
        }}
        animate={
          isFlipping
            ? {
                rotateY: [180, 0],
                rotateZ: isAngled ? [-8, 0] : [0, 0],
                scale: [0.88, 1.02, 1],
              }
            : isAngled
            ? {
                rotateZ: -12,
                rotateY: 8,
                rotateX: 6,
                y: [0, -6, 0],
              }
            : {
                rotateZ: 0,
                rotateY: 0,
                rotateX: 0,
                y: 0,
              }
        }
        transition={
          isFlipping
            ? {
                duration: 0.9,
                ease: [0.34, 1.56, 0.64, 1],
              }
            : isAngled
            ? {
                y: {
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                },
                duration: 0.5,
              }
            : { duration: 0.4 }
        }
      >
        {/* Card Background: Inactive (Matte Charcoal) vs Active (Vibrant Caju Red) */}
        <div
          className={`absolute inset-0 rounded-[16px] transition-colors duration-700 ${
            isActive
              ? 'bg-gradient-to-br from-[#FF4438] via-[#EA2E27] to-[#C91812]'
              : 'bg-gradient-to-br from-[#2D3139] via-[#1E2229] to-[#121418]'
          }`}
        />

        {/* Holographic Sheen / Specular Light Reflection */}
        <div
          className={`absolute inset-0 rounded-[16px] pointer-events-none transition-opacity duration-700 ${
            isActive
              ? 'opacity-40 bg-gradient-to-tr from-transparent via-white/30 to-amber-200/20'
              : 'opacity-15 bg-gradient-to-tr from-transparent via-white/10 to-transparent'
          }`}
        />

        {/* Card Border Highlight (Subtle 1px border for premium tactile depth) */}
        <div className="absolute inset-0 rounded-[16px] border border-white/20 pointer-events-none shadow-[inset_0_1px_1px_rgba(255,255,255,0.35),0_16px_32px_-8px_rgba(0,0,0,0.35)]" />

        {/* Card Watermark: Official Stylized Caju Cashew Fruit Silhouette */}
        <div className="absolute -right-6 -bottom-8 w-40 h-40 pointer-events-none opacity-15 text-white">
          <svg viewBox="0 0 1420 1750" fill="currentColor">
            <path d="m708.401 1049.916c103.678 1.907 190.047-31.202 239.282-112.04 35.588-58.433 21.546-126.438 39.828-225.24 18.686-101.157 63.921-198.938 32.921-268.422-13.39-30.032-31.115-50.099-52.77-66.766-59.631-45.88-145.411-41.2-205.411-16.626-70.611 28.893-107.579-5.254-145.923-12.32-32.797-6.014-59.077-13.227-110.948-.28-21.77 5.413-71.099 27.586-99.781 82.606-39.52 75.782.292 136.088 28.729 267.276 26.37 121.678 17.735 201.62 61.75 260.22 44.031 58.562 108.64 89.692 212.323 91.592z" />
            <path d="m797.521 251.088c.088-35.973-30.693-64.786-68.609-64.213-7.89.12-15.313-2.667-20.824-7.827-5.51-5.173-8.536-12.146-8.52-19.64.02-7.506 3.083-14.573 8.62-19.893 5.561-5.333 12.973-8.32 20.875-8.44 37.906-.573 68.838-30.547 68.937-66.853.099-35.987-30.688-64.787-68.599-64.214-44.218.64-86.229 17.947-118.218 48.707-31.615 30.307-49.063 70.373-49.183 112.72-.099 42.347 17.161 81.88 48.599 111.307 31.849 29.826 73.761 45.893 117.98 45.226 37.932-.56 68.869-30.56 68.942-66.88z" />
          </svg>
        </div>

        {/* Top Header of Card */}
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {/* Caju Official Vector Logo */}
            <div className="flex items-center gap-1.5 drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)]">
              <svg className="h-5 w-auto" viewBox="0 0 98 40" fill="none">
                {/* Folha verde */}
                <path d="M13.7402 7.64989C13.1079 7.63456 12.6 7.11907 12.6 6.48477C12.6 5.85048 13.1079 5.33499 13.7402 5.31966C15.2081 5.31966 16.4001 4.12772 16.4001 2.65983C16.4001 1.19194 15.21 0 13.7402 0C10.1472 0 7.23438 2.88979 7.23438 6.48286C7.23438 10.0759 10.1472 12.9657 13.7402 12.9657C15.2081 12.9657 16.4001 11.7757 16.4001 10.3059C16.4001 8.83608 15.21 7.64605 13.7402 7.64605V7.64989Z" fill="#00E984"/>
                {/* Fruto Laranja */}
                <path fillRule="evenodd" clipRule="evenodd" d="M25.3574 17.5945C24.2115 15.3466 22.2319 14.4383 21.3619 14.216C19.2847 13.691 18.2307 13.9803 16.9199 14.2275C16.3221 14.3406 14.5418 15.1608 12.8535 15.1569C11.1653 15.1531 9.6629 14.3329 9.10142 14.2275C7.79067 13.9803 6.7367 13.691 4.65943 14.216C3.78942 14.4383 1.80989 15.3466 0.663935 17.5945C-0.917016 20.6951 0.675429 23.1594 1.81563 28.5212C2.55149 31.39 2.42694 33.8639 4.1861 36.2612C5.94527 38.6585 8.54761 39.9175 12.6964 39.998C12.9264 40.0018 13.1199 40.0018 13.323 39.998C17.4718 39.9175 20.0742 38.6585 21.8334 36.2612C23.5925 33.8639 23.468 31.39 24.2038 28.5212C25.344 23.1594 26.9365 20.6951 25.3555 17.5945H25.3574Z" fill="#FF7500"/>
                {/* Tipografia "caju" em branco no cartão */}
                <path d="M76.7161 31.7034V14.4017H69.302V18.7734H71.2667V31.2588C71.2667 33.704 70.2288 35.1859 68.3382 35.4453L68.3753 39.3354C68.8201 39.3724 69.2649 39.4095 69.7469 39.4095C73.9729 39.4095 76.7161 36.3715 76.7161 31.7034ZM97.4756 33.0001H92.1745V29.5175H91.8038C90.8029 31.8516 88.5416 33.3335 85.8354 33.3335C82.2025 33.3335 79.7188 30.629 79.7188 26.4425V14.4388H85.2052V25.4422C85.2052 27.7021 86.4656 29.147 88.5416 29.147C90.6175 29.147 92.0262 27.628 92.0262 25.294V14.4388H97.4756V33.0001ZM62.3698 33.0001V29.888H62.0362C61.2207 31.9627 59.1447 33.3335 56.5127 33.3335C53.1022 33.3335 51.1004 31.0365 51.1004 27.9985C51.1004 25.3681 52.6203 23.4786 56.8463 22.7006L59.9973 22.1078C61.5914 21.8114 62.1845 21.2557 62.1845 20.2554C62.1845 19.0328 61.2948 18.2918 59.5154 18.2918C57.6619 18.2918 56.6239 19.1069 56.5127 20.6259L56.4756 21.0705H51.2858L51.3228 20.6259C51.6565 16.6246 54.8075 14.1053 59.8861 14.1053C65.1131 14.1053 67.6709 16.8099 67.6709 20.9593V33.0001H62.3698ZM62.1845 26.3313V24.4419C61.7396 24.7753 61.0353 25.0717 60.2198 25.2569L58.5887 25.6645C57.1429 25.9979 56.6239 26.6277 56.6239 27.628C56.6239 28.9618 57.5507 29.7028 59.1076 29.7028C60.9241 29.7028 62.1845 28.7025 62.1845 26.3313ZM49.5435 26.2572H43.9829C43.8346 27.8133 42.5001 28.8877 40.7207 28.8877C38.2741 28.8877 36.68 26.85 36.68 23.7009C36.68 20.5518 38.2741 18.5512 40.7207 18.5512C42.463 18.5512 43.7605 19.5885 43.9088 21.0705H49.4323C49.0986 16.8099 45.6511 14.0683 40.6836 14.0683C34.8265 14.0683 31.1195 17.9213 31.1565 23.775C31.1565 29.6287 34.8265 33.3335 40.6095 33.3335C45.6511 33.3335 49.2098 30.5549 49.5435 26.2572ZM73.6022 12.4752C75.604 12.4752 76.9756 11.1044 76.9756 9.06673C76.9756 7.06611 75.604 5.69531 73.6022 5.69531C71.5633 5.69531 70.1917 7.06611 70.1917 9.06673C70.1917 11.1044 71.5633 12.4752 73.6022 12.4752Z" fill="#FFFFFF"/>
              </svg>
            </div>
          </div>

          <div className="flex items-center gap-2 text-white/80">
            {/* Contactless NFC wave icon */}
            <Wifi className="w-4 h-4 rotate-90" />
            {/* Benefícios Pill */}
            <span className="text-[10px] tracking-wider uppercase font-semibold bg-white/15 px-2 py-0.5 rounded-full text-white/90 border border-white/10">
              Multibenefícios
            </span>
          </div>
        </div>

        {/* Middle Section: Smart Chip & Antenna */}
        <div className="relative z-10 mt-3.5 flex items-center justify-between">
          {/* EMV Metallic Chip */}
          <div className="w-9 h-7 rounded-[4px] bg-gradient-to-br from-[#E2B755] via-[#FCE38A] to-[#D4A034] p-1 shadow-inner border border-amber-400/60 relative overflow-hidden flex flex-col justify-between">
            <div className="w-full h-[1px] bg-amber-800/40" />
            <div className="w-full flex justify-between">
              <div className="w-2 h-[1px] bg-amber-800/40" />
              <div className="w-2 h-[1px] bg-amber-800/40" />
            </div>
            <div className="w-full h-[1px] bg-amber-800/40" />
          </div>

          {/* Micro Security Chip Label */}
          <div className="flex items-center gap-1 text-[10px] font-mono text-white/70">
            <ShieldCheck className="w-3 h-3 text-white/80" />
            <span>PCI-DSS</span>
          </div>
        </div>

        {/* Bottom Section: Embossed Digits & Cardholder Name */}
        <div className="relative z-10 mt-3">
          <div className="flex items-center gap-2 font-mono text-white tracking-[0.18em] text-[15px] font-semibold drop-shadow-[0_1px_1px_rgba(0,0,0,0.6)]">
            <span className="text-white/60 tracking-[0.22em] text-xs">••••</span>
            <span className="text-white/60 tracking-[0.22em] text-xs">••••</span>
            <span className="text-white/60 tracking-[0.22em] text-xs">••••</span>
            <span className="text-white font-bold text-sm bg-white/10 px-1.5 py-0.5 rounded border border-white/20">
              {digits || '7291'}
            </span>
          </div>

          <div className="mt-2 flex items-center justify-between text-white/90">
            <div className="flex flex-col">
              <span className="text-[8px] uppercase tracking-wider text-white/60 font-medium">Titular</span>
              <span className="text-[11px] font-semibold tracking-wider uppercase drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]">
                ERIK PLACIDO
              </span>
            </div>

            {/* Flag (Mastercard overlapping circles) */}
            <div className="flex items-center -space-x-1.5 opacity-90">
              <div className="w-5 h-5 rounded-full bg-[#EB001B]/90" />
              <div className="w-5 h-5 rounded-full bg-[#F79E1B]/90" />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Status Badge: "Cartão Ativo" with glow */}
      {showStatusBadge && (
        <motion.div
          id="caju-card-status-badge"
          initial={{ scale: 0.6, opacity: 0, y: 10 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.4, ease: [0.175, 0.885, 0.32, 1.275] }}
          className="mt-3 flex items-center gap-1.5 bg-emerald-500/15 border border-emerald-500/30 text-emerald-700 px-3.5 py-1 rounded-full text-xs font-semibold shadow-xs"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span>Cartão Ativo</span>
          <Sparkles className="w-3.5 h-3.5 text-emerald-600 ml-0.5" />
        </motion.div>
      )}
    </div>
  );
};

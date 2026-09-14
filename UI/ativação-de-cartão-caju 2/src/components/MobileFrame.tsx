import React, { ReactNode } from 'react';
import { Wifi, Battery } from 'lucide-react';
import { OSPlatform } from '../types';

interface MobileFrameProps {
  children: ReactNode;
  osPlatform: OSPlatform;
  currentTime?: string;
}

export const MobileFrame: React.FC<MobileFrameProps> = ({
  children,
  osPlatform,
  currentTime = '09:41',
}) => {
  const isApple = osPlatform === 'ios';

  return (
    <div className="relative flex items-center justify-center p-2 sm:p-4 md:p-6">
      {/* Outer Hardware Shell - 390x844px */}
      <div
        id="caju-mobile-device"
        className="relative w-full max-w-[390px] h-[844px] bg-black rounded-[50px] p-[10px] shadow-[0_25px_70px_-15px_rgba(0,0,0,0.6),0_0_0_1px_rgba(255,255,255,0.15),inset_0_0_0_3px_#262626] flex flex-col overflow-hidden shrink-0"
      >
        {/* Hardware Antenna Bands & Mute Switch Accents */}
        <div className="absolute -left-[12px] top-28 w-[3px] h-8 bg-neutral-600 rounded-l-xs" />
        <div className="absolute -left-[12px] top-42 w-[3px] h-12 bg-neutral-600 rounded-l-xs" />
        <div className="absolute -left-[12px] top-58 w-[3px] h-12 bg-neutral-600 rounded-l-xs" />
        <div className="absolute -right-[12px] top-44 w-[3px] h-16 bg-neutral-600 rounded-r-xs" />

        {/* Screen Display Container */}
        <div className="relative w-full h-full bg-white rounded-[40px] overflow-hidden flex flex-col">
          {/* Top Status Bar & Dynamic Island / Punch-hole */}
          <div className="relative z-30 h-11 px-6 pt-3 flex items-center justify-between text-neutral-900 bg-white select-none shrink-0">
            {/* Clock */}
            <span className="text-xs font-semibold tracking-tight w-12 text-left pl-1">
              {currentTime}
            </span>

            {/* Dynamic Island (iOS) or Camera Hole (Android) */}
            {isApple ? (
              <div className="w-28 h-6 bg-black rounded-full flex items-center justify-between px-2.5 shadow-xs">
                <div className="w-2.5 h-2.5 rounded-full bg-neutral-900/90 border border-neutral-700/60" />
                <div className="w-2 h-2 rounded-full bg-blue-950/60 border border-blue-900/40" />
              </div>
            ) : (
              <div className="w-4 h-4 bg-black rounded-full border border-neutral-800" />
            )}

            {/* Status Icons: Signal, Wifi, Battery */}
            <div className="flex items-center gap-1.5 w-12 justify-end pr-1 text-neutral-900">
              {/* Cellular signal bars */}
              <div className="flex items-end gap-0.5 h-2.5">
                <div className="w-0.5 h-1 bg-neutral-900 rounded-2xs" />
                <div className="w-0.5 h-1.5 bg-neutral-900 rounded-2xs" />
                <div className="w-0.5 h-2 bg-neutral-900 rounded-2xs" />
                <div className="w-0.5 h-2.5 bg-neutral-900 rounded-2xs" />
              </div>
              <Wifi className="w-3.5 h-3.5 stroke-[2.2]" />
              <Battery className="w-4 h-4 stroke-[2.2]" />
            </div>
          </div>

          {/* Main App Content Viewport */}
          <div className="relative flex-1 overflow-hidden flex flex-col bg-white">
            {children}
          </div>

          {/* iOS Bottom Home Indicator Bar */}
          <div className="h-6 w-full bg-white flex items-center justify-center shrink-0">
            <div className="w-32 h-1 bg-neutral-900/40 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
};

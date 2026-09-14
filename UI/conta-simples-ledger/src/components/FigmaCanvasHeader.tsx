import React from 'react';
import { 
  Layers, 
  Grid, 
  ZoomIn, 
  ZoomOut, 
  Maximize, 
  Code, 
  Sparkles, 
  FileText, 
  Sliders, 
  CreditCard,
  Building2,
  Download,
  Share2
} from 'lucide-react';

interface FigmaCanvasHeaderProps {
  activeSection: string;
  onSelectSection: (section: string) => void;
  showGrid: boolean;
  onToggleGrid: () => void;
  zoomLevel: number;
  onZoomChange: (level: number) => void;
  inspectMode: boolean;
  onToggleInspect: () => void;
}

export const FigmaCanvasHeader: React.FC<FigmaCanvasHeaderProps> = ({
  activeSection,
  onSelectSection,
  showGrid,
  onToggleGrid,
  zoomLevel,
  onZoomChange,
  inspectMode,
  onToggleInspect,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-slate-900 border-b border-slate-800 text-white shadow-md">
      {/* Top Brand Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-between gap-4 border-b border-slate-800/80">
        
        {/* Left: Brand Identity */}
        <div className="flex items-center gap-3">
          {/* Conta Simples Logo Visual Element */}
          <div className="relative shrink-0">
            <img
              src="./logo-contasimples-icon.png"
              alt="Conta Simples Icon"
              className="w-8 h-8 rounded-lg object-contain shadow-xs border border-emerald-500/30"
            />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm tracking-tight text-white">
                Conta Simples
              </span>
              <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded-full border border-emerald-800">
                Design System Andes
              </span>
              <span className="hidden md:inline-flex text-[10px] font-mono text-slate-400">
                Artboard 1920 × 1080 px
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block">
              Família de Componentes <strong className="text-slate-200">TransactionLedger</strong> & Workflow com Google AI Studio
            </p>
          </div>
        </div>

        {/* Center/Right: Canvas Viewport & Dev Mode Tools */}
        <div className="flex items-center gap-2">
          
          {/* Dev Mode / Inspect Toggle */}
          <button
            onClick={onToggleInspect}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              inspectMode
                ? 'bg-emerald-500 text-slate-950 shadow-xs'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
            }`}
            title="Ativar modo de inspeção (Dev Mode)"
          >
            <Code size={13} />
            <span className="hidden sm:inline">Dev Mode</span>
            {inspectMode && <span className="w-1.5 h-1.5 rounded-full bg-slate-950 animate-ping inline-block" />}
          </button>

          {/* 8px Grid Toggle */}
          <button
            onClick={onToggleGrid}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-medium border transition-colors flex items-center gap-1.5 ${
              showGrid
                ? 'bg-blue-600/30 border-blue-500 text-blue-300'
                : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
            }`}
            title="Alternar grade de 8px"
          >
            <Grid size={13} />
            <span className="hidden md:inline">Grade 8px</span>
          </button>

          {/* Zoom Controls */}
          <div className="hidden lg:flex items-center bg-slate-800 border border-slate-700 rounded-lg p-0.5 text-xs text-slate-300">
            <button
              onClick={() => onZoomChange(Math.max(50, zoomLevel - 15))}
              className="p-1 hover:text-white transition-colors"
              title="Reduzir zoom"
            >
              <ZoomOut size={13} />
            </button>
            <span className="px-1.5 font-mono text-[11px] min-w-10 text-center font-semibold">
              {zoomLevel}%
            </span>
            <button
              onClick={() => onZoomChange(Math.min(125, zoomLevel + 15))}
              className="p-1 hover:text-white transition-colors"
              title="Aumentar zoom"
            >
              <ZoomIn size={13} />
            </button>
            <button
              onClick={() => onZoomChange(100)}
              className="px-1.5 py-0.5 text-[10px] text-slate-400 hover:text-white border-l border-slate-700"
              title="Resetar 100%"
            >
              100%
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Tabs (Sections of the 1920x1080 Artboard) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center gap-1 overflow-x-auto scrollbar-none py-1.5 text-xs">
        <button
          onClick={() => onSelectSection('all')}
          className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors ${
            activeSection === 'all'
              ? 'bg-slate-800 text-white font-semibold'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
          }`}
        >
          Prancha Panorâmica (Todas as Seções)
        </button>

        <button
          onClick={() => onSelectSection('anatomy')}
          className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors flex items-center gap-1.5 ${
            activeSection === 'anatomy'
              ? 'bg-blue-600 text-white font-semibold shadow-xs'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
          }`}
        >
          <span className="w-4 h-4 rounded-full bg-blue-500/20 text-blue-300 text-[10px] font-bold flex items-center justify-center">1</span>
          <span>Seção 1: Anatomia Estrutural</span>
        </button>

        <button
          onClick={() => onSelectSection('matrix')}
          className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors flex items-center gap-1.5 ${
            activeSection === 'matrix'
              ? 'bg-blue-600 text-white font-semibold shadow-xs'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
          }`}
        >
          <span className="w-4 h-4 rounded-full bg-blue-500/20 text-blue-300 text-[10px] font-bold flex items-center justify-center">2</span>
          <span>Seção 2: Matriz de Estados & Edge Cases</span>
        </button>

        <button
          onClick={() => onSelectSection('tokens')}
          className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors flex items-center gap-1.5 ${
            activeSection === 'tokens'
              ? 'bg-blue-600 text-white font-semibold shadow-xs'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
          }`}
        >
          <span className="w-4 h-4 rounded-full bg-blue-500/20 text-blue-300 text-[10px] font-bold flex items-center justify-center">3</span>
          <span>Seção 3: Tokens Andes & Handoff</span>
        </button>

        <button
          onClick={() => onSelectSection('ai')}
          className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors flex items-center gap-1.5 ${
            activeSection === 'ai'
              ? 'bg-indigo-600 text-white font-semibold shadow-xs'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
          }`}
        >
          <span className="w-4 h-4 rounded-full bg-indigo-500/30 text-indigo-300 text-[10px] font-bold flex items-center justify-center">4</span>
          <span>Seção 4: Workflow com Google AI Studio</span>
        </button>

        <button
          onClick={() => onSelectSection('ledger-preview')}
          className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors flex items-center gap-1.5 ml-auto ${
            activeSection === 'ledger-preview'
              ? 'bg-emerald-600 text-white font-semibold shadow-xs'
              : 'text-emerald-400 hover:text-emerald-300 hover:bg-emerald-950/40'
          }`}
        >
          <CreditCard size={13} />
          <span>Extrato ao Vivo (Sandbox)</span>
        </button>
      </div>
    </header>
  );
};

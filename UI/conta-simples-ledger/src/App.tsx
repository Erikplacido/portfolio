import React, { useState, useRef } from 'react';
import { FigmaCanvasHeader } from './components/FigmaCanvasHeader';
import { Section1Anatomy } from './components/Section1Anatomy';
import { Section2StatesMatrix } from './components/Section2StatesMatrix';
import { Section3TokensHandoff } from './components/Section3TokensHandoff';
import { Section4AIWorkflow } from './components/Section4AIWorkflow';
import { TransactionLedgerLiveView } from './components/TransactionLedgerLiveView';
import { InspectModal } from './components/InspectModal';
import { TransactionItem } from './types';
import { 
  Sparkles, 
  Layers, 
  CheckCircle, 
  Share2, 
  Download, 
  ExternalLink,
  Code2,
  FileText
} from 'lucide-react';

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('all');
  const [showGrid, setShowGrid] = useState<boolean>(false);
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [inspectMode, setInspectMode] = useState<boolean>(false);
  const [inspectedTx, setInspectedTx] = useState<TransactionItem | null>(null);

  const canvasRef = useRef<HTMLDivElement>(null);

  const handleInspect = (item: TransactionItem) => {
    setInspectedTx(item);
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] text-slate-100 flex flex-col font-sans selection:bg-blue-500 selection:text-white">
      {/* Top Figma Canvas Toolbar */}
      <FigmaCanvasHeader
        activeSection={activeSection}
        onSelectSection={(sec) => setActiveSection(sec)}
        showGrid={showGrid}
        onToggleGrid={() => setShowGrid(!showGrid)}
        zoomLevel={zoomLevel}
        onZoomChange={(lvl) => setZoomLevel(lvl)}
        inspectMode={inspectMode}
        onToggleInspect={() => setInspectMode(!inspectMode)}
      />

      {/* Main Figma Canvas Workspace Stage */}
      <main 
        ref={canvasRef}
        className="flex-1 relative overflow-auto p-4 sm:p-6 lg:p-8 flex flex-col items-center"
        style={{
          backgroundImage: showGrid 
            ? 'radial-gradient(#334155 1px, transparent 1px)' 
            : 'radial-gradient(#1E293B 1px, transparent 1px)',
          backgroundSize: '16px 16px'
        }}
      >
        {/* Dev Mode Sticky Alert Bar if active */}
        {inspectMode && (
          <div className="w-full max-w-7xl mb-4 py-2 px-4 rounded-xl bg-emerald-950/90 border border-emerald-600/50 text-emerald-300 text-xs font-medium flex items-center justify-between shadow-lg backdrop-blur-sm animate-in fade-in">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
              <span>
                <strong>Dev Mode Ativo:</strong> Clique em qualquer componente para abrir a inspeção técnica de CSS, tokens Andes e acessibilidade.
              </span>
            </div>
            <button
              onClick={() => setInspectMode(false)}
              className="text-emerald-400 hover:text-emerald-200 underline font-bold"
            >
              Desativar
            </button>
          </div>
        )}

        {/* Scalable Figma Artboard Container */}
        <div 
          className="w-full max-w-7xl transition-transform origin-top duration-200 space-y-10"
          style={{ transform: `scale(${zoomLevel / 100})` }}
        >
          {/* ARTBOARD HERO BANNER & SPECIFICATION CARD */}
          <div className="relative rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border border-slate-700/80 p-6 sm:p-8 shadow-2xl overflow-hidden">
            
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10">
              {/* Breadcrumb / Category */}
              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400 mb-3">
                <span className="text-emerald-400 font-bold tracking-wider uppercase font-mono text-[10px] bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800/60">
                  Conta Simples Design System
                </span>
                <span>/</span>
                <span className="text-slate-300 font-medium">Andes Pattern Equivalent</span>
                <span>/</span>
                <span className="text-slate-400">Design Technologist & Handoff Prancha</span>
              </div>

              {/* Title */}
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-tight">
                Família de Componentes <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-blue-400 to-indigo-400">TransactionLedger</span> & Workflow com IA
              </h1>

              {/* Subtitle & Focus */}
              <p className="text-sm sm:text-base text-slate-300 mt-2 max-w-4xl leading-relaxed">
                Prancha técnica de documentação e engenharia front-end para a fintech <strong className="text-white">Conta Simples</strong>. 
                Cobre a anatomia estrutural com wireframes explodidos, matriz 4×3 de estados e casos extremos de negócio, tokens semânticos Andes e automação com o <strong className="text-indigo-300">Google AI Studio</strong>.
              </p>

              {/* Quick Specs Badges */}
              <div className="mt-6 pt-5 border-t border-slate-700/60 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700">
                  <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider">Empresa-Modelo</span>
                  <div className="flex items-center gap-1.5 mt-1">
                    <img src="./logo-contasimples-icon.png" alt="Conta Simples" className="w-4 h-4 rounded object-contain" />
                    <span className="font-bold text-white block">Conta Simples</span>
                  </div>
                  <span className="text-[11px] text-slate-400">Cartões e Despesas PJ</span>
                </div>
                <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700">
                  <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider">Padrão DS</span>
                  <span className="font-bold text-emerald-400 mt-0.5 block">Andes Design System</span>
                  <span className="text-[11px] text-slate-400">Tokens Semânticos & Grid 8px</span>
                </div>
                <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700">
                  <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider">Acessibilidade</span>
                  <span className="font-bold text-blue-400 mt-0.5 block">WCAG 2.1 AAA</span>
                  <span className="text-[11px] text-slate-400">TalkBack & VoiceOver</span>
                </div>
                <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700">
                  <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider">Automação com IA</span>
                  <span className="font-bold text-indigo-400 mt-0.5 block">Google AI Studio</span>
                  <span className="text-[11px] text-slate-400">JSON Schema & Handoff</span>
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 1: ANATOMIA ESTRUTURAL */}
          {(activeSection === 'all' || activeSection === 'anatomy') && (
            <Section1Anatomy />
          )}

          {/* SECTION 2: MATRIZ DE ESTADOS E CASOS EXTREMOS (EDGE CASES) */}
          {(activeSection === 'all' || activeSection === 'matrix') && (
            <Section2StatesMatrix />
          )}

          {/* SECTION 3: TOKENS DE DESIGN E ESPECIFICAÇÕES DE HANDOFF */}
          {(activeSection === 'all' || activeSection === 'tokens') && (
            <Section3TokensHandoff />
          )}

          {/* SECTION 4: COMO USAR O GOOGLE AI STUDIO NESTE PROJETO */}
          {(activeSection === 'all' || activeSection === 'ai') && (
            <Section4AIWorkflow />
          )}

          {/* SECTION 5: EXTRATO LIVE SANDBOX */}
          {(activeSection === 'all' || activeSection === 'ledger-preview') && (
            <TransactionLedgerLiveView 
              inspectMode={inspectMode}
              onInspect={handleInspect}
            />
          )}

          {/* FOOTER METADATA */}
          <footer className="pt-8 pb-12 border-t border-slate-800 text-center text-xs text-slate-500 space-y-2">
            <p>
              Prancha de Documentação de Design System • Conta Simples (Fintech Brasileira de Gestão de Despesas e Múltiplos Cartões)
            </p>
            <p className="text-slate-600">
              Formato Figma Canvas (1920 × 1080 px) • Integrado com Google AI Studio (gemini-3.8-flash) • Tokens Andes do Mercado Livre
            </p>
          </footer>
        </div>
      </main>

      {/* Inspect Mode Popover Modal */}
      {inspectedTx && (
        <InspectModal
          transaction={inspectedTx}
          onClose={() => setInspectedTx(null)}
        />
      )}
    </div>
  );
}

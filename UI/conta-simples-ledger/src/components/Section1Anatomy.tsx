import React, { useState } from 'react';
import { 
  Maximize2, 
  Layers, 
  Ruler, 
  Info, 
  Sparkles, 
  CornerDownRight,
  Check,
  Eye,
  Sliders
} from 'lucide-react';
import { TransactionRowItem } from './TransactionRowItem';
import { mockTransactions } from '../data/mockTransactions';
import { AnatomyPoint } from '../types';

const anatomyPoints: AnatomyPoint[] = [
  {
    id: 1,
    title: 'Container Principal',
    spec: 'Height: 72px • Padding: 16px (spacing-md)',
    dimensions: 'w: 100% • h: 72px • r: 0px (list) / 8px (card)',
    tokens: ['surface-neutral-0 (#FFFFFF)', 'border-subtle-1px (#E5E7EB)', 'spacing-md (16px)'],
    description: 'Estrutura base do componente. Altura fixa de 72px para manter o ritmo vertical do extrato contábil da Conta Simples. Borda inferior sutil de 1px em listas contínuas, ou cantos de 8px (radius-card) com borda completa e sombra suave quando instanciado como card isolado de conciliação.'
  },
  {
    id: 2,
    title: 'Leading Element (Ícone / Iniciais)',
    spec: 'Dimensões: 44 × 44 px • Formato Circular',
    dimensions: '44px × 44px • border-radius: 9999px (full)',
    tokens: ['spacing-md margin-right', 'surface-neutral-100', 'text-brand-primary'],
    description: 'Elemento de ancoragem visual rápida. Exibe as iniciais do estabelecimento em tipografia de alto contraste ou o logo/bandeira da despesa corporativa. Possui badge indicador de transações internacionais com conversão cambial.'
  },
  {
    id: 3,
    title: 'Content Block (Hierarquia Textual)',
    spec: 'Título: 15px Medium (500) • Subtítulo: 13px Regular (400)',
    dimensions: 'flex: 1 • gap: 2px • padding-right: 8px',
    tokens: ['color-text-primary (#111827 - 14.2:1)', 'color-text-secondary (#6B7280 - 4.8:1)', 'typography-title-15', 'typography-sub-13'],
    description: 'Coluna hierárquica à esquerda. Título exibe o nome do estabelecimento comercial com truncamento inteligente. Subtítulo apresenta o portador do cartão corporativo com os últimos 4 dígitos mascarados e tag semântica do centro de custo aprovador.'
  },
  {
    id: 4,
    title: 'Trailing Block (Dados Financeiros)',
    spec: 'Valor Tabular: 16px SemiBold (600) • Badge de Status Caixa Alta',
    dimensions: 'flex-shrink: 0 • align: right • gap: 4px',
    tokens: ['tabular-nums font-mono', 'typography-amount-16', 'color-status-*', 'spacing-xs (4px)'],
    description: 'Bloco numérico de alta precisão contábil. Números tabulares impedem que a rolagem do extrato desalinhe centavos. Badge pílula de 20px de altura informa o status da transação (PENDENTE, CONCILIADO, RECUSADO, ESTORNADO) em caixa alta.'
  }
];

export const Section1Anatomy: React.FC = () => {
  const [selectedPoint, setSelectedPoint] = useState<number>(1);
  const [isCardMode, setIsCardMode] = useState<boolean>(false);
  const [showRulers, setShowRulers] = useState<boolean>(true);
  const [viewMode, setViewMode] = useState<'blueprint' | 'rendered'>('rendered');

  const sampleTransaction = mockTransactions[1]; // Posto Ipiranga

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-xs overflow-hidden" id="section-anatomy">
      {/* Section Header */}
      <div className="px-6 py-5 border-b border-gray-200 bg-gray-50/50 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold">
              1
            </span>
            <h2 className="text-lg font-bold text-gray-900 tracking-tight">
              Anatomia Estrutural do Componente (Transaction-Row-Item)
            </h2>
          </div>
          <p className="text-sm text-gray-500 mt-1 max-w-3xl">
            Wireframe vetorial explodido com linhas indicativas numeradas, medidas absolutas e especificações técnicas de layout do Design System Conta Simples (padrão Andes).
          </p>
        </div>

        {/* View Controls */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => setIsCardMode(!isCardMode)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium border flex items-center gap-1.5 transition-colors ${
              isCardMode 
                ? 'bg-blue-50 border-blue-200 text-blue-700 font-semibold' 
                : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Sliders size={13} />
            <span>{isCardMode ? 'Modo: Card Isolado (8px)' : 'Modo: Lista (0px)'}</span>
          </button>

          <button
            onClick={() => setShowRulers(!showRulers)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium border flex items-center gap-1.5 transition-colors ${
              showRulers 
                ? 'bg-emerald-50 border-emerald-200 text-emerald-700 font-semibold' 
                : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Ruler size={13} />
            <span>{showRulers ? 'Guias de Cotas (ON)' : 'Guias (OFF)'}</span>
          </button>

          <div className="inline-flex rounded-lg border border-gray-200 p-0.5 bg-gray-100 text-xs">
            <button
              onClick={() => setViewMode('rendered')}
              className={`px-2.5 py-1 rounded-md font-medium transition-all ${
                viewMode === 'rendered' ? 'bg-white shadow-xs text-gray-900' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Hi-Fi Render
            </button>
            <button
              onClick={() => setViewMode('blueprint')}
              className={`px-2.5 py-1 rounded-md font-medium transition-all ${
                viewMode === 'blueprint' ? 'bg-white shadow-xs text-gray-900' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Blueprint Explodido
            </button>
          </div>
        </div>
      </div>

      {/* Main Interactive Stage */}
      <div className="p-6 lg:p-8 bg-[#F8FAFC]">
        {/* Wireframe Canvas Area */}
        <div className="relative max-w-4xl mx-auto bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-10 overflow-hidden">
          
          {/* Subtle 8px Grid Background */}
          <div 
            className="absolute inset-0 pointer-events-none opacity-25"
            style={{
              backgroundImage: 'radial-gradient(#CBD5E1 1px, transparent 1px)',
              backgroundSize: '8px 8px'
            }}
          />

          {/* Dimension Marker Header */}
          {showRulers && (
            <div className="relative mb-6 flex items-center justify-between text-[11px] font-mono text-gray-400 border-b border-dashed border-gray-200 pb-2">
              <span className="flex items-center gap-1 text-blue-600 font-semibold">
                <span className="w-2 h-2 rounded-full bg-blue-600 inline-block" />
                Largura Fluida: 100% (min 320px / max 100%)
              </span>
              <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-600 font-semibold">
                Padding X: 16px (spacing-md)
              </span>
              <span className="text-indigo-600 font-semibold">
                Altura Fixa: 72px
              </span>
            </div>
          )}

          {/* Interactive Component Stage */}
          <div className="relative py-4">
            {/* Height Ruler on Left */}
            {showRulers && (
              <div className="absolute -left-5 sm:-left-7 top-4 bottom-4 w-4 flex flex-col items-center justify-between text-[10px] font-mono text-indigo-600">
                <div className="w-2 h-[1px] bg-indigo-500" />
                <div className="h-full w-[1px] bg-indigo-400 flex items-center justify-center">
                  <span className="-rotate-90 bg-white px-1 font-bold text-[9px] whitespace-nowrap shadow-xs rounded border border-indigo-200">
                    72px
                  </span>
                </div>
                <div className="w-2 h-[1px] bg-indigo-500" />
              </div>
            )}

            {/* Exploded / Highlight Canvas */}
            <div className={`relative transition-all duration-200 ${selectedPoint === 1 ? 'ring-2 ring-blue-500 ring-offset-4 rounded-lg' : ''}`}>
              
              {viewMode === 'rendered' ? (
                <div className="relative">
                  <TransactionRowItem
                    transaction={sampleTransaction}
                    isCard={isCardMode}
                    onClick={() => {}}
                  />

                  {/* Overlaid Vector Pins */}
                  {/* Pin 1: Container Principal */}
                  <button
                    onClick={() => setSelectedPoint(1)}
                    className={`absolute -top-3 left-4 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shadow-md transition-transform transform hover:scale-110 z-20 ${
                      selectedPoint === 1 ? 'bg-blue-600 text-white ring-4 ring-blue-100' : 'bg-gray-900 text-white'
                    }`}
                    title="1: Container Principal (72px)"
                  >
                    1
                  </button>

                  {/* Pin 2: Leading Element (44x44px) */}
                  <button
                    onClick={() => setSelectedPoint(2)}
                    className={`absolute top-1/2 -translate-y-1/2 left-[28px] w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shadow-md transition-transform transform hover:scale-110 z-20 ${
                      selectedPoint === 2 ? 'bg-blue-600 text-white ring-4 ring-blue-100' : 'bg-gray-900 text-white'
                    }`}
                    title="2: Leading Element (44x44px)"
                  >
                    2
                  </button>

                  {/* Pin 3: Content Block */}
                  <button
                    onClick={() => setSelectedPoint(3)}
                    className={`absolute top-2 left-[120px] w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shadow-md transition-transform transform hover:scale-110 z-20 ${
                      selectedPoint === 3 ? 'bg-blue-600 text-white ring-4 ring-blue-100' : 'bg-gray-900 text-white'
                    }`}
                    title="3: Content Block (Título 15px & Subtítulo 13px)"
                  >
                    3
                  </button>

                  {/* Pin 4: Trailing Block */}
                  <button
                    onClick={() => setSelectedPoint(4)}
                    className={`absolute top-2 right-4 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shadow-md transition-transform transform hover:scale-110 z-20 ${
                      selectedPoint === 4 ? 'bg-blue-600 text-white ring-4 ring-blue-100' : 'bg-gray-900 text-white'
                    }`}
                    title="4: Trailing Block (Valor Tabular 16px & Badge)"
                  >
                    4
                  </button>
                </div>
              ) : (
                /* Blueprint Wireframe View */
                <div className="w-full h-[72px] border-2 border-dashed border-blue-400 bg-blue-50/40 rounded-lg flex items-center justify-between px-4 relative">
                  {/* Leading wireframe */}
                  <div className="flex items-center gap-4">
                    <div className="w-[44px] h-[44px] rounded-full border-2 border-blue-500 bg-blue-100 flex items-center justify-center text-xs font-mono font-bold text-blue-700">
                      44×44
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <div className="h-4 w-48 bg-blue-200 rounded text-[10px] font-mono px-1 flex items-center text-blue-800">
                        15px Medium Title
                      </div>
                      <div className="h-3.5 w-64 bg-blue-100 rounded text-[9px] font-mono px-1 flex items-center text-blue-700">
                        13px Regular Subtitle + Tag
                      </div>
                    </div>
                  </div>

                  {/* Trailing wireframe */}
                  <div className="flex flex-col items-end gap-1.5">
                    <div className="h-4 w-24 bg-blue-200 rounded text-[10px] font-mono px-1 flex items-center justify-end text-blue-800">
                      16px SemiBold
                    </div>
                    <div className="h-4 w-20 bg-blue-300 rounded-full text-[9px] font-mono px-2 flex items-center justify-center text-blue-900 font-bold">
                      BADGE 20px
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Quick Explanatory Dimension Badges */}
          <div className="mt-8 pt-4 border-t border-gray-200 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="bg-gray-50 p-2.5 rounded-lg border border-gray-200">
              <span className="text-[10px] uppercase font-bold text-gray-400 block">1. Container</span>
              <span className="font-semibold text-gray-800">Height: 72px</span>
              <p className="text-[11px] text-gray-500 mt-0.5">Tokens: surface-neutral-0</p>
            </div>
            <div className="bg-gray-50 p-2.5 rounded-lg border border-gray-200">
              <span className="text-[10px] uppercase font-bold text-gray-400 block">2. Leading</span>
              <span className="font-semibold text-gray-800">44 × 44 px</span>
              <p className="text-[11px] text-gray-500 mt-0.5">Formato: Círculo / Logo</p>
            </div>
            <div className="bg-gray-50 p-2.5 rounded-lg border border-gray-200">
              <span className="text-[10px] uppercase font-bold text-gray-400 block">3. Content</span>
              <span className="font-semibold text-gray-800">15px Med / 13px Reg</span>
              <p className="text-[11px] text-gray-500 mt-0.5">Contraste AAA: 14.2:1</p>
            </div>
            <div className="bg-gray-50 p-2.5 rounded-lg border border-gray-200">
              <span className="text-[10px] uppercase font-bold text-gray-400 block">4. Trailing</span>
              <span className="font-semibold text-gray-800">16px SemiBold</span>
              <p className="text-[11px] text-gray-500 mt-0.5">Tabular Nums + Badge</p>
            </div>
          </div>
        </div>

        {/* Detailed Spec Cards for the 4 Anatomy Points */}
        <div className="mt-8 max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-gray-900 tracking-wide uppercase flex items-center gap-2">
              <Layers size={16} className="text-blue-600" />
              Especificação Técnica de Engenharia e Design Tokens
            </h3>
            <span className="text-xs text-gray-500">
              Clique em um dos pontos para detalhar os tokens
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {anatomyPoints.map((pt) => {
              const isSelected = selectedPoint === pt.id;
              return (
                <div
                  key={pt.id}
                  onClick={() => setSelectedPoint(pt.id)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer ${
                    isSelected 
                      ? 'bg-blue-50/70 border-blue-300 ring-2 ring-blue-500/20 shadow-xs' 
                      : 'bg-white border-gray-200 hover:border-gray-300 hover:bg-gray-50/50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                      isSelected ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
                    }`}>
                      {pt.id}
                    </span>
                    <span className="text-[11px] font-mono text-gray-500">
                      {pt.dimensions.split('•')[0]}
                    </span>
                  </div>

                  <h4 className="font-bold text-gray-900 text-sm">{pt.title}</h4>
                  <p className="text-xs text-blue-700 font-medium mt-0.5">{pt.spec}</p>
                  <p className="text-xs text-gray-600 mt-2 leading-relaxed">{pt.description}</p>

                  <div className="mt-3 pt-2 border-t border-gray-200/80">
                    <span className="text-[10px] font-bold uppercase text-gray-400 tracking-wider block mb-1">
                      Tokens Associados:
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {pt.tokens.map((token, idx) => (
                        <span key={idx} className="text-[10px] font-mono bg-white px-1.5 py-0.5 rounded border border-gray-200 text-gray-700">
                          {token}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

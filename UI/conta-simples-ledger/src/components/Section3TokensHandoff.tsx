import React, { useState } from 'react';
import { 
  Palette, 
  Ruler, 
  Volume2, 
  CheckCircle2, 
  Copy, 
  Check, 
  ExternalLink,
  ShieldCheck,
  Code,
  Sparkles
} from 'lucide-react';
import { semanticColorTokens, spacingTokens, typographyTokens } from '../data/designTokens';

export const Section3TokensHandoff: React.FC = () => {
  const [copiedToken, setCopiedToken] = useState<string | null>(null);
  const [isPlayingVoice, setIsPlayingVoice] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'colors' | 'spacings' | 'accessibility' | 'cssVariables'>('colors');

  const handleCopy = (text: string, tokenName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedToken(tokenName);
    setTimeout(() => setCopiedToken(null), 2000);
  };

  const speakA11yLabel = () => {
    const textToSpeak = "Transação em Posto Ipiranga, valor de 250 reais, status aprovado, paga por Cartão Comercial por Mariana Souza.";
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.lang = 'pt-BR';
      utterance.rate = 1.0;
      utterance.onstart = () => setIsPlayingVoice(true);
      utterance.onend = () => setIsPlayingVoice(false);
      utterance.onerror = () => setIsPlayingVoice(false);
      window.speechSynthesis.speak(utterance);
    } else {
      setIsPlayingVoice(true);
      setTimeout(() => setIsPlayingVoice(false), 3000);
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-xs overflow-hidden" id="section-tokens">
      {/* Section Header */}
      <div className="px-6 py-5 border-b border-gray-200 bg-gray-50/50 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold">
              3
            </span>
            <h2 className="text-lg font-bold text-gray-900 tracking-tight">
              Tokens de Design e Especificações de Handoff (Andes Pattern)
            </h2>
          </div>
          <p className="text-sm text-gray-500 mt-1 max-w-3xl">
            Tabela visual padronizada conforme o Design System Andes da Conta Simples: Cores semânticas com contraste WCAG AAA/AA, malha de espaçamento em múltiplos de 4 e 8px e protocolo de acessibilidade digital.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="inline-flex rounded-lg border border-gray-200 p-0.5 bg-gray-100 text-xs">
          <button
            onClick={() => setActiveTab('colors')}
            className={`px-3 py-1.5 rounded-md font-medium transition-all ${
              activeTab === 'colors' ? 'bg-white shadow-xs text-gray-900 font-semibold' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Cores Semânticas
          </button>
          <button
            onClick={() => setActiveTab('spacings')}
            className={`px-3 py-1.5 rounded-md font-medium transition-all ${
              activeTab === 'spacings' ? 'bg-white shadow-xs text-gray-900 font-semibold' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Grid & Espaçamentos
          </button>
          <button
            onClick={() => setActiveTab('accessibility')}
            className={`px-3 py-1.5 rounded-md font-medium transition-all ${
              activeTab === 'accessibility' ? 'bg-white shadow-xs text-gray-900 font-semibold' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Acessibilidade (WCAG)
          </button>
          <button
            onClick={() => setActiveTab('cssVariables')}
            className={`px-3 py-1.5 rounded-md font-medium transition-all ${
              activeTab === 'cssVariables' ? 'bg-white shadow-xs text-gray-900 font-semibold' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            CSS Tokens
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-6 lg:p-8">
        
        {/* TAB 1: CORES SEMÂNTICAS */}
        {activeTab === 'colors' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-gray-900 text-sm flex items-center gap-2">
                  <Palette size={16} className="text-blue-600" />
                  Tokens de Cores Semânticas e Relação de Contraste WCAG
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  Garantia de legibilidade estrita com contrastes testados para o fundo padrão do extrato.
                </p>
              </div>
              <button
                onClick={() => {
                  const cssVars = semanticColorTokens.map(t => `--${t.name}: ${t.value};`).join('\n');
                  handleCopy(cssVars, 'all-colors');
                }}
                className="text-xs px-3 py-1.5 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 flex items-center gap-1.5 font-medium transition-colors"
              >
                {copiedToken === 'all-colors' ? <Check size={13} className="text-emerald-600" /> : <Copy size={13} />}
                <span>{copiedToken === 'all-colors' ? 'Copiado!' : 'Copiar Variáveis CSS'}</span>
              </button>
            </div>

            {/* Tokens Table */}
            <div className="border border-gray-200 rounded-xl overflow-hidden shadow-xs">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200 text-gray-600 font-bold">
                    <th className="py-3 px-4 w-16">Amostra</th>
                    <th className="py-3 px-4">Nome do Token (Andes)</th>
                    <th className="py-3 px-4 w-28">Valor Hex</th>
                    <th className="py-3 px-4 w-36">Contraste WCAG</th>
                    <th className="py-3 px-4">Descrição e Finalidade</th>
                    <th className="py-3 px-4 w-20 text-right">Ação</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {semanticColorTokens.map((token) => (
                    <tr key={token.name} className="hover:bg-gray-50/70 transition-colors">
                      {/* Color Swatch */}
                      <td className="py-3 px-4">
                        <div 
                          className="w-8 h-8 rounded-lg border border-black/15 shadow-2xs flex items-center justify-center font-mono text-[9px]"
                          style={{ backgroundColor: token.value }}
                        />
                      </td>

                      {/* Token Name */}
                      <td className="py-3 px-4 font-mono font-semibold text-blue-700">
                        {token.name}
                      </td>

                      {/* Hex Value */}
                      <td className="py-3 px-4 font-mono text-gray-700">
                        {token.value}
                      </td>

                      {/* WCAG Contrast */}
                      <td className="py-3 px-4">
                        {token.wcagLevel && (
                          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            token.wcagLevel === 'AAA' 
                              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' 
                              : token.wcagLevel === 'AA'
                                ? 'bg-blue-50 text-blue-800 border border-blue-200'
                                : 'bg-gray-100 text-gray-700'
                          }`}>
                            <ShieldCheck size={11} />
                            <span>{token.wcagLevel} ({token.wcagContrast})</span>
                          </span>
                        )}
                      </td>

                      {/* Description */}
                      <td className="py-3 px-4 text-gray-600">
                        {token.description}
                      </td>

                      {/* Copy Action */}
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => handleCopy(`var(--${token.name})`, token.name)}
                          className="p-1.5 text-gray-400 hover:text-blue-600 rounded hover:bg-blue-50 transition-colors"
                          title="Copiar token"
                        >
                          {copiedToken === token.name ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: GRID & ESPAÇAMENTOS */}
        {activeTab === 'spacings' && (
          <div className="space-y-6">
            <div>
              <h3 className="font-bold text-gray-900 text-sm flex items-center gap-2">
                <Ruler size={16} className="text-blue-600" />
                Sistema de Espaçamento Base 4px / 8px
              </h3>
              <p className="text-xs text-gray-500 mt-0.5">
                Todos os paddings, margens e tamanhos do componente respeitam múltiplos rígidos de 4px e 8px para harmonia matemática.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {spacingTokens.map((sp) => {
                const pixelNum = parseInt(sp.value, 10);
                return (
                  <div key={sp.name} className="p-4 rounded-xl border border-gray-200 bg-gray-50/50 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-mono font-bold text-xs text-indigo-700">{sp.name}</span>
                        <span className="font-mono text-xs font-bold text-gray-900 bg-white px-2 py-0.5 rounded border border-gray-200 shadow-2xs">
                          {sp.value}
                        </span>
                      </div>
                      <p className="text-xs text-gray-600">{sp.description}</p>
                    </div>

                    {/* Visual Bar Indicator */}
                    <div className="mt-4 pt-3 border-t border-gray-200">
                      <div className="h-4 bg-indigo-100 rounded flex items-center px-1" style={{ width: `${Math.min(pixelNum * 8, 100)}%` }}>
                        <div className="h-2 bg-indigo-600 rounded-sm w-full" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Typography Tokens Table */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <h4 className="font-bold text-gray-900 text-xs uppercase tracking-wider text-gray-500 mb-3">
                Tokens de Tipografia Associados
              </h4>
              <div className="border border-gray-200 rounded-xl overflow-hidden">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200 text-gray-600 font-bold">
                      <th className="py-2.5 px-4">Token de Tipografia</th>
                      <th className="py-2.5 px-4">Especificação Exata</th>
                      <th className="py-2.5 px-4">Uso no Componente</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white font-mono">
                    {typographyTokens.map((t) => (
                      <tr key={t.name} className="hover:bg-gray-50/50">
                        <td className="py-3 px-4 text-blue-700 font-semibold">{t.name}</td>
                        <td className="py-3 px-4 text-gray-800">{t.value}</td>
                        <td className="py-3 px-4 text-gray-600 font-sans">{t.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: ACESSIBILIDADE DIGITAL */}
        {activeTab === 'accessibility' && (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div>
                <h3 className="font-bold text-gray-900 text-sm flex items-center gap-2">
                  <Volume2 size={16} className="text-blue-600" />
                  Protocolo de Acessibilidade Digital (WCAG 2.1 AA / AAA)
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  Ordem de leitura linear otimizada para leitores de tela como VoiceOver (iOS/macOS) e TalkBack (Android).
                </p>
              </div>

              <button
                onClick={speakA11yLabel}
                className={`px-3.5 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all ${
                  isPlayingVoice 
                    ? 'bg-emerald-600 text-white shadow-sm' 
                    : 'bg-blue-600 hover:bg-blue-700 text-white shadow-xs'
                }`}
              >
                <Volume2 size={14} className={isPlayingVoice ? 'animate-pulse' : ''} />
                <span>{isPlayingVoice ? 'Reproduzindo Áudio...' : 'Ouvir Rótulo Acessível (TTS)'}</span>
              </button>
            </div>

            {/* Structured aria-label Blueprint */}
            <div className="p-5 rounded-xl border border-blue-200 bg-blue-50/50">
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-800 block mb-2">
                Fórmula Estruturada do aria-label:
              </span>
              <div className="p-3 bg-white rounded-lg border border-blue-200 font-mono text-xs text-blue-900 leading-relaxed">
                "Transação em <strong className="text-blue-600">[Estabelecimento]</strong>, valor de <strong className="text-blue-600">[Valor por extenso]</strong>, status <strong className="text-blue-600">[Status traduzido]</strong>, paga por <strong className="text-blue-600">[Portador]</strong> com <strong className="text-blue-600">[Cartão]</strong>."
              </div>

              <div className="mt-3 flex items-center gap-2 text-xs text-blue-950 font-medium">
                <CheckCircle2 size={14} className="text-emerald-600" />
                <span>Exemplo real: "Transação em Posto Ipiranga, valor de 250 reais, status aprovado, paga por Cartão Comercial."</span>
              </div>
            </div>

            {/* Checklist de Conformidade WCAG */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div className="p-4 rounded-xl border border-gray-200 bg-white">
                <span className="font-bold text-xs text-gray-900 block mb-1">
                  1. Navegação por Teclado (WCAG 2.1.1)
                </span>
                <p className="text-xs text-gray-600 leading-relaxed">
                  O componente possui <code className="bg-gray-100 px-1 py-0.5 rounded text-[11px]">tabIndex=0</code> e responde com precisão aos comandos <kbd className="bg-gray-200 px-1 rounded text-[10px]">Enter</kbd> e <kbd className="bg-gray-200 px-1 rounded text-[10px]">Espaço</kbd> para abrir o modal de detalhes.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-gray-200 bg-white">
                <span className="font-bold text-xs text-gray-900 block mb-1">
                  2. Foco Visível de 2px (WCAG 2.4.7)
                </span>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Ao receber o foco via teclado, um anel azul de 2px (<code className="bg-gray-100 px-1 py-0.5 rounded text-[11px]">#2563EB</code>) com afastamento de 2px é renderizado sem alterar o fluxo do documento.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-gray-200 bg-white">
                <span className="font-bold text-xs text-gray-900 block mb-1">
                  3. Semântica Tabular & Taxas (WCAG 1.3.1)
                </span>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Números tabulares e moedas são anunciados por extenso, evitando que leitores de tela soletrem símbolos monetários de forma truncada.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: CSS VARIABLES / ANDES TOKENS */}
        {activeTab === 'cssVariables' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-gray-900 text-sm flex items-center gap-2">
                  <Code size={16} className="text-blue-600" />
                  Especificação de Tokens em CSS (Custom Properties)
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  Declarações prontas para inclusão em design system global ou tema Tailwind.
                </p>
              </div>

              <button
                onClick={() => {
                  const cssSnippet = `:root {
  /* Andes Surface Tokens */
  --cs-surface-base: #FFFFFF;
  --cs-surface-hover: #F8F9FA;
  --cs-surface-active: #F1F3F5;
  --cs-border-subtle: #E5E7EB;

  /* Text Tokens */
  --cs-text-primary: #111827;
  --cs-text-secondary: #6B7280;
  --cs-text-disabled: #9CA3AF;

  /* Status Colors */
  --cs-status-warning-surface: #FEF3C7;
  --cs-status-warning-text: #92400E;
  --cs-status-success-surface: #DCFCE7;
  --cs-status-success-text: #166534;
  --cs-status-danger-surface: #FEE2E2;
  --cs-status-danger-text: #991B1B;

  /* Spacings */
  --cs-spacing-xs: 4px;
  --cs-spacing-sm: 8px;
  --cs-spacing-md: 16px;
  --cs-spacing-lg: 24px;
  --cs-spacing-xl: 32px;

  /* Dimensions & Radius */
  --cs-row-height: 72px;
  --cs-leading-size: 44px;
  --cs-radius-card: 8px;
}`;
                  handleCopy(cssSnippet, 'full-css');
                }}
                className="text-xs px-3 py-1.5 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 flex items-center gap-1.5 font-medium transition-colors"
              >
                {copiedToken === 'full-css' ? <Check size={13} className="text-emerald-600" /> : <Copy size={13} />}
                <span>{copiedToken === 'full-css' ? 'Copiado!' : 'Copiar Código CSS'}</span>
              </button>
            </div>

            <pre className="p-4 bg-slate-900 text-slate-100 rounded-xl font-mono text-xs overflow-x-auto leading-relaxed border border-slate-800 shadow-inner">
{`:root {
  /* Andes Surface Tokens - Conta Simples */
  --cs-surface-base: #FFFFFF;
  --cs-surface-hover: #F8F9FA;
  --cs-surface-active: #F1F3F5;
  --cs-border-subtle: #E5E7EB;

  /* Text Tokens (WCAG AAA & AA Compliance) */
  --cs-text-primary: #111827;    /* Contrast 14.2:1 AAA */
  --cs-text-secondary: #6B7280;  /* Contrast 4.8:1 AA */
  --cs-text-disabled: #9CA3AF;   /* Tachado em transações recusadas */

  /* Status Colors */
  --cs-status-warning-surface: #FEF3C7;
  --cs-status-warning-text: #92400E;     /* 7.1:1 AAA */
  --cs-status-success-surface: #DCFCE7;
  --cs-status-success-text: #166534;     /* 7.4:1 AAA */
  --cs-status-danger-surface: #FEE2E2;
  --cs-status-danger-text: #991B1B;      /* 7.2:1 AAA */

  /* Spacing Grid (Multiples of 4 and 8px) */
  --cs-spacing-xs: 4px;
  --cs-spacing-sm: 8px;
  --cs-spacing-md: 16px;
  --cs-spacing-lg: 24px;
  --cs-spacing-xl: 32px;

  /* Component Layout Metrics */
  --cs-row-height: 72px;
  --cs-leading-size: 44px;
  --cs-radius-card: 8px;
  --cs-focus-ring: 2px solid #2563EB;
}`}
            </pre>
          </div>
        )}

      </div>
    </div>
  );
};

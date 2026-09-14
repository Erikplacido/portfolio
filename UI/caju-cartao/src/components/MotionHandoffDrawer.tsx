import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Layers,
  Sparkles,
  AlertOctagon,
  Copy,
  Check,
  Code2,
  Clock,
  Play,
  FileText,
  Sliders,
} from 'lucide-react';
import { motionSpecs } from '../data/motionSpecs';
import { fintechEdgeCases } from '../data/edgeCases';
import { EdgeCase } from '../types';

interface MotionHandoffDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectEdgeCase: (edgeCase: EdgeCase) => void;
}

export const MotionHandoffDrawer: React.FC<MotionHandoffDrawerProps> = ({
  isOpen,
  onClose,
  onSelectEdgeCase,
}) => {
  const [activeTab, setActiveTab] = useState<'motion' | 'edge_cases' | 'pm_prompt'>('motion');
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [copiedPrompt, setCopiedPrompt] = useState(false);

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 1800);
  };

  const handleCopyPrompt = () => {
    const promptText = `Atue como Senior Product Manager de Fintech. Liste 5 casos de borda (edge cases) e potenciais falhas técnicas durante a ativação de um cartão físico por aproximação/código (ex: falha no chip, divergência de CPF, código expirado). Escreva o microcopy em português brasileiro com tom empático para cada tela de erro correspondente.`;
    navigator.clipboard.writeText(promptText);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 1800);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex justify-end">
        <motion.div
          id="motion-handoff-drawer"
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 28, stiffness: 300 }}
          className="w-full max-w-2xl bg-neutral-900 text-neutral-100 h-full flex flex-col shadow-2xl border-l border-neutral-800"
        >
          {/* Top Bar */}
          <div className="px-6 py-4 border-b border-neutral-800 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#EA3C36]/20 border border-[#EA3C36]/40 flex items-center justify-center text-[#EA3C36]">
                <Sliders className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-base font-bold text-white tracking-tight">
                  Handoff Técnico & Especificações Caju
                </h2>
                <p className="text-xs text-neutral-400">
                  Documentação de Motion, Microinterações e Edge Cases (PM Fintech)
                </p>
              </div>
            </div>

            <button
              id="close-handoff-drawer"
              onClick={onClose}
              className="p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Tab Navigation */}
          <div className="px-6 pt-3 border-b border-neutral-800 flex gap-2 shrink-0 bg-neutral-900/60">
            <button
              id="tab-motion-specs"
              onClick={() => setActiveTab('motion')}
              className={`pb-3 px-3 text-xs font-semibold flex items-center gap-2 border-b-2 transition-all ${
                activeTab === 'motion'
                  ? 'border-[#EA3C36] text-[#EA3C36]'
                  : 'border-transparent text-neutral-400 hover:text-neutral-200'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Tabela de Motion (Specs)</span>
            </button>

            <button
              id="tab-edge-cases"
              onClick={() => setActiveTab('edge_cases')}
              className={`pb-3 px-3 text-xs font-semibold flex items-center gap-2 border-b-2 transition-all ${
                activeTab === 'edge_cases'
                  ? 'border-[#EA3C36] text-[#EA3C36]'
                  : 'border-transparent text-neutral-400 hover:text-neutral-200'
              }`}
            >
              <AlertOctagon className="w-3.5 h-3.5" />
              <span>5 Casos de Borda (Senior PM)</span>
            </button>

            <button
              id="tab-pm-prompt"
              onClick={() => setActiveTab('pm_prompt')}
              className={`pb-3 px-3 text-xs font-semibold flex items-center gap-2 border-b-2 transition-all ${
                activeTab === 'pm_prompt'
                  ? 'border-[#EA3C36] text-[#EA3C36]'
                  : 'border-transparent text-neutral-400 hover:text-neutral-200'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Prompt AI Studio</span>
            </button>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* TAB 1: MOTION SPECS TABLE */}
            {activeTab === 'motion' && (
              <div className="space-y-4">
                <div className="p-3.5 bg-neutral-800/60 rounded-xl border border-neutral-700/60 text-xs text-neutral-300 flex items-start gap-2.5">
                  <Code2 className="w-4 h-4 text-[#EA3C36] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-white">Guia para Engenharia Front-end / Mobile:</span>
                    <p className="mt-0.5 text-neutral-400">
                      Utilize os valores de cubic-bezier e durações em milissegundos para implementar as curvas no iOS (CoreAnimation/SwiftUI), Android (Spring/Interpolator) e React (Motion).
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  {motionSpecs.map((spec, index) => (
                    <div
                      key={index}
                      className="p-4 bg-neutral-800/40 hover:bg-neutral-800/70 border border-neutral-800 rounded-xl transition-all"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-white tracking-wide">
                              {spec.element}
                            </span>
                            <span className="inline-flex items-center gap-1 text-[10px] font-mono font-medium px-2 py-0.5 rounded-full bg-[#EA3C36]/15 text-[#EA3C36] border border-[#EA3C36]/30">
                              <Clock className="w-2.5 h-2.5" />
                              {spec.durationMs}ms
                            </span>
                          </div>
                          <div className="text-[11px] text-neutral-400 mt-1">
                            <strong className="text-neutral-300">Gatilho (Trigger):</strong> {spec.trigger}
                          </div>
                        </div>

                        <button
                          onClick={() => handleCopy(spec.curve, index)}
                          className="p-1.5 rounded-md bg-neutral-700/50 hover:bg-neutral-700 text-neutral-300 hover:text-white transition-all text-xs flex items-center gap-1"
                          title="Copiar Curva"
                        >
                          {copiedIndex === index ? (
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>

                      {/* Code Block for Curve & Properties */}
                      <div className="mt-3 p-2.5 bg-black/50 rounded-lg font-mono text-[11px] text-emerald-400 border border-neutral-800 space-y-1">
                        <div>
                          <span className="text-neutral-500">easing: </span>
                          <span className="text-amber-300">{spec.curve}</span>
                        </div>
                        <div>
                          <span className="text-neutral-500">properties: </span>
                          <span className="text-neutral-300">{spec.properties}</span>
                        </div>
                      </div>

                      {/* UX Rationale */}
                      <p className="mt-2.5 text-xs text-neutral-400 italic">
                        &ldquo;{spec.uxRationale}&rdquo;
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 2: 5 FINTECH EDGE CASES */}
            {activeTab === 'edge_cases' && (
              <div className="space-y-4">
                <div className="p-3.5 bg-neutral-800/60 rounded-xl border border-neutral-700/60 text-xs text-neutral-300">
                  <span className="font-semibold text-white">Casos de Borda e Falhas Técnicas de Ativação:</span>
                  <p className="mt-1 text-neutral-400">
                    Clique em <strong>&quot;Testar no Celular&quot;</strong> para acionar instantaneamente a experiência do usuário com o microcopy empático na tela do aparelho.
                  </p>
                </div>

                <div className="space-y-3.5">
                  {fintechEdgeCases.map((ec) => (
                    <div
                      key={ec.id}
                      className="p-4 bg-neutral-800/40 hover:bg-neutral-800/70 border border-neutral-800 rounded-xl transition-all"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full bg-neutral-700 text-neutral-300">
                              {ec.category}
                            </span>
                            <span className="text-xs font-bold text-white">{ec.title}</span>
                          </div>
                          <h4 className="text-sm font-semibold text-[#EA3C36] mt-1">
                            &quot;{ec.errorTitle}&quot;
                          </h4>
                        </div>

                        <button
                          onClick={() => {
                            onSelectEdgeCase(ec);
                            onClose();
                          }}
                          className="px-3 py-1.5 rounded-lg bg-[#EA3C36] hover:bg-[#D42D28] text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm active:scale-95 transition-all shrink-0"
                        >
                          <Play className="w-3 h-3 fill-current" />
                          <span>Testar no Celular</span>
                        </button>
                      </div>

                      {/* Empathetic Microcopy */}
                      <div className="mt-3 p-3 bg-neutral-900 rounded-lg border border-neutral-700/40">
                        <span className="text-[10px] uppercase font-bold text-neutral-400 block mb-1">
                          Microcopy Empático (PT-BR):
                        </span>
                        <p className="text-xs text-neutral-200 leading-relaxed">
                          {ec.microcopy}
                        </p>
                      </div>

                      {/* Technical Diagnostico */}
                      <div className="mt-2 text-[11px] text-neutral-400 font-mono">
                        <strong className="text-neutral-500">BaaS Error:</strong> {ec.technicalReason}
                      </div>

                      <div className="mt-2 flex items-center gap-2 text-[11px]">
                        <span className="text-neutral-400">Ação Principal:</span>
                        <span className="font-semibold text-white bg-neutral-700 px-2 py-0.5 rounded">
                          {ec.primaryAction}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 3: PM PROMPT FOR GOOGLE AI STUDIO */}
            {activeTab === 'pm_prompt' && (
              <div className="space-y-4">
                <div className="p-4 bg-neutral-800/60 rounded-xl border border-neutral-700/60">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                      Prompt de PM para o Google AI Studio
                    </span>
                    <button
                      onClick={handleCopyPrompt}
                      className="text-xs text-[#EA3C36] hover:text-white flex items-center gap-1 transition-colors"
                    >
                      {copiedPrompt ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400">Copiado!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copiar Prompt</span>
                        </>
                      )}
                    </button>
                  </div>
                  <pre className="text-xs text-neutral-200 font-mono bg-black/60 p-3.5 rounded-lg whitespace-pre-wrap leading-relaxed border border-neutral-800">
{`Atue como Senior Product Manager de Fintech. Liste 5 casos de borda (edge cases) e potenciais falhas técnicas durante a ativação de um cartão físico por aproximação/código (ex: falha no chip, divergência de CPF, código expirado). Escreva o microcopy em português brasileiro com tom empático para cada tela de erro correspondente.`}
                  </pre>
                </div>

                <div className="p-4 bg-neutral-800/40 rounded-xl border border-neutral-800 text-xs text-neutral-300 space-y-2">
                  <h4 className="font-bold text-white text-sm">Resumo Metodológico de UX & Segurança:</h4>
                  <p className="text-neutral-400 leading-relaxed">
                    <strong>1. Ciclo de Vida:</strong> Cobertura completa desde o desempacotamento físico do envelope Caju até a transição de estado no ledger (Pending Activation &rarr; Activated &rarr; Wallet Tokenized).
                  </p>
                  <p className="text-neutral-400 leading-relaxed">
                    <strong>2. Segurança & PCI-DSS:</strong> Criptografia de ponta a ponta na captura do PIN, mascaramento de senha dinâmica e regras anti-fraude (sem sequências, sem aniversários, sem quadruplicidade de números).
                  </p>
                  <p className="text-neutral-400 leading-relaxed">
                    <strong>3. Momentos Expressivos & Delight:</strong> Transição tridimensional suave do cartão com rotação em 3D, confetes físicos com desaceleração natural, e adoção one-tap para Apple Pay e Google Wallet.
                  </p>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

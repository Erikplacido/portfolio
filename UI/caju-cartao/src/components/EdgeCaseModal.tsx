import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, AlertTriangle, ShieldAlert, Clock, RefreshCw, Cpu, CheckCircle2 } from 'lucide-react';
import { EdgeCase } from '../types';

interface EdgeCaseModalProps {
  edgeCase: EdgeCase | null;
  onClose: () => void;
  onResolve: () => void;
}

export const EdgeCaseModal: React.FC<EdgeCaseModalProps> = ({
  edgeCase,
  onClose,
  onResolve,
}) => {
  if (!edgeCase) return null;

  const getIcon = () => {
    switch (edgeCase.category) {
      case 'hardware':
        return <Cpu className="w-6 h-6 text-amber-600" />;
      case 'identity':
        return <AlertTriangle className="w-6 h-6 text-[#EA3C36]" />;
      case 'lifecycle':
        return <Clock className="w-6 h-6 text-amber-600" />;
      case 'fraud':
        return <ShieldAlert className="w-6 h-6 text-[#EA3C36]" />;
      case 'security':
        return <AlertTriangle className="w-6 h-6 text-amber-600" />;
      default:
        return <AlertTriangle className="w-6 h-6 text-[#EA3C36]" />;
    }
  };

  const getBadgeColor = () => {
    switch (edgeCase.severity) {
      case 'critical':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'error':
        return 'bg-[#EA3C36]/10 text-[#EA3C36] border-[#EA3C36]/20';
      case 'warning':
        return 'bg-amber-100 text-amber-800 border-amber-200';
    }
  };

  return (
    <AnimatePresence>
      <div className="absolute inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end select-none">
        <motion.div
          id="edge-case-bottom-sheet"
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', damping: 28, stiffness: 320 }}
          className="w-full bg-white rounded-t-[28px] p-6 pb-8 shadow-2xl flex flex-col max-h-[90%]"
        >
          {/* Sheet Handle */}
          <div className="w-12 h-1.5 bg-neutral-200 rounded-full mx-auto mb-4" />

          {/* Header */}
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-neutral-100 flex items-center justify-center shrink-0 shadow-xs border border-neutral-200/60">
                {getIcon()}
              </div>
              <div>
                <span
                  className={`inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${getBadgeColor()} mb-1`}
                >
                  {edgeCase.category.toUpperCase()} • {edgeCase.severity.toUpperCase()}
                </span>
                <h3 className="text-base font-bold text-neutral-900 leading-tight">
                  {edgeCase.errorTitle}
                </h3>
              </div>
            </div>
            <button
              id="edge-case-close-btn"
              onClick={onClose}
              className="p-1.5 rounded-full text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Microcopy with Empathetic Tone */}
          <div className="mt-2 p-4 bg-neutral-50 rounded-2xl border border-neutral-100">
            <p className="text-xs text-neutral-700 leading-relaxed font-normal">
              {edgeCase.microcopy}
            </p>
          </div>

          {/* Technical Diagnostics for PM / Tech Specs */}
          <div className="mt-3 p-3 bg-neutral-100/70 rounded-xl border border-neutral-200/60 text-[11px] text-neutral-600 font-mono">
            <span className="font-bold text-neutral-700 block mb-0.5">Diagnóstico Técnico (BaaS):</span>
            <span className="leading-snug block">{edgeCase.technicalReason}</span>
          </div>

          {/* Actions */}
          <div className="mt-5 flex flex-col gap-2.5">
            <button
              id="edge-case-primary-action-btn"
              onClick={() => {
                onResolve();
              }}
              className="w-full h-12 bg-[#EA3C36] hover:bg-[#D42D28] active:scale-[0.98] text-white font-semibold text-xs rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-[#EA3C36]/20 transition-all"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{edgeCase.primaryAction}</span>
            </button>

            {edgeCase.secondaryAction && (
              <button
                id="edge-case-secondary-action-btn"
                onClick={onClose}
                className="w-full h-10 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-medium text-xs rounded-xl flex items-center justify-center gap-1.5 transition-all"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>{edgeCase.secondaryAction}</span>
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

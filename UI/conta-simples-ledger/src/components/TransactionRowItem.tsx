import React, { useState } from 'react';
import { 
  Cloud, 
  Fuel, 
  UtensilsCrossed, 
  Briefcase, 
  Package, 
  CreditCard,
  Globe,
  AlertCircle,
  CheckCircle2,
  Clock,
  RotateCcw,
  Paperclip
} from 'lucide-react';
import { TransactionItem, InteractiveState, TransactionVariant } from '../types';

interface TransactionRowItemProps {
  transaction: TransactionItem;
  variant?: TransactionVariant;
  forcedState?: InteractiveState;
  isCard?: boolean;
  inspectMode?: boolean;
  onInspect?: (item: TransactionItem, event: React.MouseEvent) => void;
  onClick?: () => void;
}

export const TransactionRowItem: React.FC<TransactionRowItemProps> = ({
  transaction,
  variant = 'default',
  forcedState,
  isCard = false,
  inspectMode = false,
  onInspect,
  onClick,
}) => {
  const [internalHover, setInternalHover] = useState(false);
  const [internalActive, setInternalActive] = useState(false);
  const [internalFocus, setInternalFocus] = useState(false);

  // Determine active visual state
  const isHovered = forcedState ? forcedState === 'hover' : internalHover;
  const isActive = forcedState ? forcedState === 'active' : internalActive;
  const isFocused = forcedState ? forcedState === 'focus' : internalFocus;

  const isDeclined = transaction.status === 'declined';
  const isRefunded = transaction.status === 'refunded' || transaction.amount > 0;
  const isPending = transaction.status === 'pending';
  const isApproved = transaction.status === 'approved';

  // Format currency
  const formattedBRL = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(Math.abs(transaction.amount));

  // Category Icon helper
  const renderCategoryIcon = () => {
    const initials = transaction.merchantName.substring(0, 2).toUpperCase();

    let IconComp = CreditCard;
    let iconColor = 'text-blue-600 bg-blue-50';

    if (transaction.merchantCategory === 'cloud') {
      IconComp = Cloud;
      iconColor = 'text-indigo-600 bg-indigo-50';
    } else if (transaction.merchantCategory === 'fuel') {
      IconComp = Fuel;
      iconColor = 'text-amber-600 bg-amber-50';
    } else if (transaction.merchantCategory === 'food') {
      IconComp = UtensilsCrossed;
      iconColor = 'text-orange-600 bg-orange-50';
    } else if (transaction.merchantCategory === 'office') {
      IconComp = Package;
      iconColor = 'text-emerald-600 bg-emerald-50';
    } else if (transaction.merchantCategory === 'services') {
      IconComp = Briefcase;
      iconColor = 'text-purple-600 bg-purple-50';
    }

    return (
      <div 
        className={`w-[44px] h-[44px] rounded-full flex-shrink-0 flex items-center justify-center font-bold text-sm transition-transform duration-150 ${iconColor} relative border border-black/5`}
        title={`Categoria: ${transaction.merchantCategory}`}
      >
        <span className="font-semibold tracking-tight">{initials}</span>
        {transaction.isInternational && (
          <span 
            className="absolute -top-1 -right-1 w-4 h-4 bg-indigo-600 text-white rounded-full flex items-center justify-center text-[9px] shadow-sm"
            title="Transação Internacional"
          >
            <Globe size={10} />
          </span>
        )}
      </div>
    );
  };

  // Status Badge helper
  const renderStatusBadge = () => {
    if (isDeclined) {
      const reason = transaction.declineReason || 'RECUSADO';
      return (
        <span 
          className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-[#FEE2E2] text-[#991B1B] border border-red-200"
          title={`Transação recusada: ${reason}`}
        >
          <AlertCircle size={10} className="stroke-[2.5]" />
          <span>{reason}</span>
        </span>
      );
    }

    if (isRefunded) {
      return (
        <span 
          className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-[#E0E7FF] text-[#3730A3] border border-indigo-200"
          title="Transação estornada com sucesso"
        >
          <RotateCcw size={10} className="stroke-[2.5]" />
          <span>ESTORNADO</span>
        </span>
      );
    }

    if (isPending) {
      return (
        <span 
          className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-[#FEF3C7] text-[#92400E] border border-amber-200"
          title="Transação pendente de conciliação ou comprovante"
        >
          <Clock size={10} className="stroke-[2.5]" />
          <span>PENDENTE</span>
        </span>
      );
    }

    return (
      <span 
        className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-[#DCFCE7] text-[#166534] border border-emerald-200"
        title="Transação aprovada e conciliada"
      >
        <CheckCircle2 size={10} className="stroke-[2.5]" />
        <span>CONCILIADO</span>
      </span>
    );
  };

  // Determine heights based on variant
  const heightClass = 
    variant === 'compact' ? 'h-[58px]' :
    variant === 'detailed' ? 'min-h-[84px] py-2' :
    'h-[72px]';

  // Base background & state styles
  let stateBackgroundClass = 'bg-[#FFFFFF]';
  if (isActive) {
    stateBackgroundClass = 'bg-[#F1F3F5]';
  } else if (isHovered) {
    stateBackgroundClass = 'bg-[#F8F9FA]';
  }

  // Focus ring class
  const focusClass = isFocused 
    ? 'ring-2 ring-[#2563EB] ring-offset-2 z-10' 
    : 'focus-visible:ring-2 focus-visible:ring-[#2563EB] focus-visible:ring-offset-2';

  // Card vs List corners & borders
  const containerShapeClass = isCard
    ? 'rounded-[8px] border border-[#E5E7EB] shadow-xs hover:shadow-md'
    : 'rounded-none border-b border-[#E5E7EB]';

  const handleClick = (e: React.MouseEvent) => {
    if (inspectMode && onInspect) {
      e.stopPropagation();
      onInspect(transaction, e);
      return;
    }
    onClick?.();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick?.();
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={transaction.accessibilityLabel}
      aria-disabled={isDeclined}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setInternalHover(true)}
      onMouseLeave={() => {
        setInternalHover(false);
        setInternalActive(false);
      }}
      onMouseDown={() => setInternalActive(true)}
      onMouseUp={() => setInternalActive(false)}
      onFocus={() => setInternalFocus(true)}
      onBlur={() => setInternalFocus(false)}
      className={`
        group relative w-full flex items-center justify-between px-4 select-none
        transition-colors duration-150 ease-out cursor-pointer outline-none
        ${heightClass}
        ${stateBackgroundClass}
        ${containerShapeClass}
        ${focusClass}
        ${inspectMode ? 'hover:outline-2 hover:outline-dashed hover:outline-blue-500' : ''}
      `}
      id={`transaction-row-${transaction.id}`}
    >
      {/* LEFT SECTION: Leading Element + Content Block */}
      <div className="flex items-center gap-4 min-w-0 flex-1 pr-3">
        {/* Leading Element (44 x 44 px) */}
        {renderCategoryIcon()}

        {/* Content Block (Coluna de Textos à Esquerda) */}
        <div className="flex flex-col min-w-0 justify-center">
          {/* Título (15px Medium) com truncamento inteligente */}
          <div className="flex items-center gap-2">
            <span 
              className="text-[15px] font-medium leading-[20px] text-[#111827] truncate"
              title={transaction.merchantName}
            >
              {transaction.merchantName}
            </span>
            {transaction.receiptAttached && (
              <span title="Comprovante anexado" className="text-gray-400 group-hover:text-gray-600 flex-shrink-0">
                <Paperclip size={12} />
              </span>
            )}
          </div>

          {/* Subtítulo (13px Regular): Portador + Centro de Custo */}
          <div className="flex items-center gap-1.5 text-[13px] leading-[18px] text-[#6B7280] truncate mt-0.5">
            <span className="truncate">{transaction.cardholderName}</span>
            <span className="text-gray-300">•</span>
            <span className="font-mono text-[11px] text-gray-500">**** {transaction.cardLastDigits}</span>
            <span className="text-gray-300">•</span>
            <span className="inline-flex items-center px-1.5 py-0.2 rounded bg-slate-100 text-slate-700 text-[11px] font-medium border border-slate-200 flex-shrink-0">
              {transaction.costCenter.name}
            </span>
          </div>

          {/* International FX metadata badge if international */}
          {transaction.isInternational && transaction.foreignExchange && (
            <div className="flex items-center gap-1.5 text-[11px] text-indigo-700 font-medium mt-1">
              <span className="font-mono">US$ {transaction.foreignExchange.originalAmount.toFixed(2)}</span>
              <span className="text-indigo-300">•</span>
              <span>Cotação R$ {transaction.foreignExchange.exchangeRate.toFixed(2)}</span>
              <span className="text-indigo-300">•</span>
              <span className="text-[10px] bg-indigo-50 text-indigo-700 px-1 rounded border border-indigo-200">
                IOF {transaction.foreignExchange.iofPercentage}%
              </span>
            </div>
          )}
        </div>
      </div>

      {/* RIGHT SECTION: Trailing Block (Dados Financeiros à Direita) */}
      <div className="flex flex-col items-end justify-center flex-shrink-0 pl-2">
        {/* Valor em formato tabular (16px SemiBold) */}
        <div className="flex items-center gap-1">
          <span 
            className={`
              font-mono text-[16px] font-semibold leading-[22px] tracking-tight tabular-nums
              ${isDeclined 
                ? 'line-through text-[#9CA3AF] opacity-80 decoration-[#9CA3AF]' 
                : isRefunded 
                  ? 'text-[#059669]' 
                  : 'text-[#111827]'
              }
            `}
          >
            {isRefunded ? '+ ' : '- '}
            {formattedBRL}
          </span>
        </div>

        {/* Badge de Status: pílula com fundo colorido e texto em caixa alta */}
        <div className="mt-1">
          {renderStatusBadge()}
        </div>
      </div>
    </div>
  );
};

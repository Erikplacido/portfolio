import React from 'react';
import {
  Utensils,
  Car,
  ShoppingBag,
  Pill,
  Fuel,
  Film,
  Dumbbell,
  Receipt,
  LucideIcon,
} from 'lucide-react';
import { TransactionCategory } from '../types';

export const getCategoryIcon = (category: TransactionCategory): LucideIcon => {
  switch (category) {
    case 'alimentacao':
      return Utensils;
    case 'transporte':
      return Car;
    case 'compras':
      return ShoppingBag;
    case 'farmacia':
      return Pill;
    case 'combustivel':
      return Fuel;
    case 'lazer':
      return Film;
    case 'servicos':
      return Dumbbell;
    default:
      return Receipt;
  }
};

export const getCategoryColors = (category: TransactionCategory): {
  bg: string;
  text: string;
  border: string;
} => {
  switch (category) {
    case 'alimentacao':
      return { bg: 'bg-orange-50', text: 'text-orange-600', border: 'border-orange-100' };
    case 'transporte':
      return { bg: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-100' };
    case 'compras':
      return { bg: 'bg-purple-50', text: 'text-purple-600', border: 'border-purple-100' };
    case 'farmacia':
      return { bg: 'bg-emerald-50', text: 'text-emerald-600', border: 'border-emerald-100' };
    case 'combustivel':
      return { bg: 'bg-amber-50', text: 'text-amber-600', border: 'border-amber-100' };
    case 'lazer':
      return { bg: 'bg-pink-50', text: 'text-pink-600', border: 'border-pink-100' };
    case 'servicos':
      return { bg: 'bg-indigo-50', text: 'text-indigo-600', border: 'border-indigo-100' };
    default:
      return { bg: 'bg-slate-50', text: 'text-slate-600', border: 'border-slate-100' };
  }
};

interface CategoryBadgeProps {
  category: TransactionCategory;
  label?: string;
  size?: 'sm' | 'md';
}

export const CategoryBadge: React.FC<CategoryBadgeProps> = ({
  category,
  label,
  size = 'md',
}) => {
  const colors = getCategoryColors(category);
  const Icon = getCategoryIcon(category);

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-medium rounded-full border ${colors.bg} ${colors.text} ${colors.border} ${
        size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-xs'
      }`}
    >
      <Icon className={size === 'sm' ? 'w-3 h-3' : 'w-3.5 h-3.5'} />
      <span>{label || category}</span>
    </span>
  );
};

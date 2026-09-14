export const formatBRL = (value: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};

export const formatPercent = (value: number): string => {
  return `${value.toFixed(2).replace('.', ',')}%`;
};

export const maskValue = (value: number, isMasked: boolean): string => {
  if (isMasked) return '••••••';
  return formatBRL(value);
};

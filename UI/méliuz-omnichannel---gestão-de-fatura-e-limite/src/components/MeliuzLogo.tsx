import React from 'react';

interface MeliuzLogoProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'horizontal' | 'icon';
  theme?: 'light' | 'dark' | 'white';
  showBadge?: boolean;
  className?: string;
}

export const MeliuzLogo: React.FC<MeliuzLogoProps> = ({
  size = 'md',
  variant = 'horizontal',
  theme = 'light',
  showBadge = false,
  className = '',
}) => {
  const horizontalHeights = {
    xs: 'h-5',
    sm: 'h-6',
    md: 'h-7',
    lg: 'h-9',
    xl: 'h-11',
  };

  const iconSizes = {
    xs: 'w-5 h-5',
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10',
    xl: 'w-12 h-12',
  };

  // Base image URLs
  const horizontalUrl = './logo-meliuz-horizontal.png';
  const iconUrl = './logo-meliuz-icon.png';

  if (variant === 'icon') {
    return (
      <div className={`inline-flex items-center justify-center ${className}`}>
        <img
          src={iconUrl}
          alt="Méliuz Icon"
          className={`${iconSizes[size]} object-contain rounded-lg shadow-sm select-none`}
        />
      </div>
    );
  }

  return (
    <div className={`inline-flex items-center gap-2 ${className}`}>
      <img
        src={horizontalUrl}
        alt="Méliuz"
        className={`${horizontalHeights[size]} w-auto object-contain select-none`}
      />
      {showBadge && (
        <span className="text-[10px] uppercase font-black tracking-wider px-2 py-0.5 rounded-full bg-[#ED004B]/10 text-[#ED004B] border border-[#ED004B]/20">
          Black
        </span>
      )}
    </div>
  );
};

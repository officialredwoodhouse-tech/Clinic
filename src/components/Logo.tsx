import React from 'react';

interface LogoProps {
  className?: string;
  variant?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
  markOnly?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  variant = 'light',
  size = 'md',
  showSubtitle = true,
  markOnly = false,
}) => {
  const isDark = variant === 'dark';

  const titleSizeClasses = {
    sm: 'text-lg sm:text-xl tracking-tight',
    md: 'text-xl sm:text-2xl tracking-tight',
    lg: 'text-2xl sm:text-3xl tracking-tight',
  }[size];

  const badgeSizeClasses = {
    sm: 'text-[8.5px] px-1.5 py-0.5',
    md: 'text-[9.5px] px-2 py-0.5',
    lg: 'text-[11px] px-2.5 py-0.5',
  }[size];

  const subtitleClasses = {
    sm: 'text-[8px] tracking-[0.22em]',
    md: 'text-[9px] tracking-[0.25em]',
    lg: 'text-[10px] tracking-[0.28em]',
  }[size];

  if (markOnly) {
    return (
      <div className={`inline-flex items-center select-none ${className}`}>
        <span
          className={`font-mono text-xs font-semibold tracking-wider ${
            isDark ? 'text-[#FFFFFF]' : 'text-[#16324F]'
          }`}
        >
          [ DR XYZ ]
        </span>
      </div>
    );
  }

  return (
    <div className={`inline-flex items-center select-none ${className}`}>
      {/* Editorial Typographic Brand Wordmark */}
      <div className="flex flex-col text-left">
        <div className="flex items-center gap-2">
          <span
            className={`font-serif font-normal ${titleSizeClasses} ${
              isDark ? 'text-[#FFFFFF]' : 'text-[#16324F]'
            } transition-colors group-hover:text-[#2A9D8F]`}
          >
            DR XYZ
          </span>
          <span
            className={`font-mono font-medium uppercase tracking-wider rounded border ${badgeSizeClasses} ${
              isDark
                ? 'border-[#2A9D8F]/60 text-[#2A9D8F] bg-[#2A9D8F]/15'
                : 'border-[#2A9D8F]/40 text-[#2A9D8F] bg-[#EAF4F7]'
            }`}
          >
            CLINIC
          </span>
        </div>

        {showSubtitle && (
          <span
            className={`font-mono uppercase mt-0.5 font-medium ${subtitleClasses} ${
              isDark ? 'text-[#EAF4F7]/80' : 'text-[#667085]'
            }`}
          >
            DENTAL & AESTHETIC CARE
          </span>
        )}
      </div>
    </div>
  );
};

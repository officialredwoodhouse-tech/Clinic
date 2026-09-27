import React from 'react';

interface LogoProps {
  className?: string;
  variant?: 'light' | 'dark'; // 'light' for light backgrounds (navbar, footer), 'dark' for dark surfaces
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

  // Sizing tokens
  const markDimensions = {
    sm: { box: 34, svg: 34 },
    md: { box: 42, svg: 42 },
    lg: { box: 52, svg: 52 },
  }[size];

  const primaryTextClasses = {
    sm: 'text-lg tracking-wider',
    md: 'text-xl sm:text-2xl tracking-wider',
    lg: 'text-2xl sm:text-3xl tracking-wider',
  }[size];

  const subtitleClasses = {
    sm: 'text-[8.5px] tracking-[0.24em]',
    md: 'text-[9.5px] tracking-[0.26em]',
    lg: 'text-[11px] tracking-[0.28em]',
  }[size];

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* Precision Emblem / Mark */}
      <div
        className="relative shrink-0 flex items-center justify-center transition-transform duration-300 group-hover:scale-105"
        style={{ width: markDimensions.box, height: markDimensions.box }}
      >
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full drop-shadow-sm"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Rich Pine Gradient */}
            <linearGradient id="xyz-pine" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#1C382C" />
              <stop offset="100%" stopColor="#0F2018" />
            </linearGradient>

            {/* Brushed Champagne Gold Gradient */}
            <linearGradient id="xyz-gold" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#F4D99B" />
              <stop offset="50%" stopColor="#C8A663" />
              <stop offset="100%" stopColor="#927137" />
            </linearGradient>

            {/* Radiant Sparkle Gradient */}
            <linearGradient id="xyz-sparkle" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="60%" stopColor="#F9E8B8" />
              <stop offset="100%" stopColor="#C8A663" />
            </linearGradient>
          </defs>

          {/* Exterior Shield / Rounded Square Badge */}
          <rect
            x="4"
            y="4"
            width="92"
            height="92"
            rx="24"
            fill="url(#xyz-pine)"
            stroke="url(#xyz-gold)"
            strokeWidth="3"
          />

          {/* Interior Subtle Inset Geometric Ring */}
          <rect
            x="11"
            y="11"
            width="78"
            height="78"
            rx="18"
            fill="none"
            stroke="#C8A663"
            strokeWidth="0.75"
            strokeOpacity="0.4"
            strokeDasharray="3 3"
          />

          {/* Sculpted Dental Crest & Architectural 'X' Facet */}
          {/* Left Wing / Apex */}
          <path
            d="M30 26C35 26 40 30 43 36L50 50L32 74H23L40 48L28 32C27 30 28 26 30 26Z"
            fill="url(#xyz-gold)"
            fillOpacity="0.95"
          />

          {/* Right Wing / Apex with interlocking Z-cross sweep */}
          <path
            d="M70 26C65 26 60 30 57 36L50 50L68 74H77L60 48L72 32C73 30 72 26 70 26Z"
            fill="url(#xyz-gold)"
            fillOpacity="0.95"
          />

          {/* Center Tooth Apex / Crown Contour & Diamond Heart */}
          <path
            d="M50 31C45 36 44 44 47 50C48.5 53 50 56 50 62C50 56 51.5 53 53 50C56 44 55 36 50 31Z"
            fill="#FFFFFF"
            fillOpacity="0.95"
          />

          {/* Central Radiance Diamond Star */}
          <path
            d="M50 43L52 48.5L57.5 50L52 51.5L50 57L48 51.5L42.5 50L48 48.5L50 43Z"
            fill="url(#xyz-sparkle)"
          />

          {/* Base Aesthetic Smile Arch */}
          <path
            d="M34 77C44 82 56 82 66 77"
            stroke="url(#xyz-gold)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Wordmark Typography */}
      {!markOnly && (
        <div className="flex flex-col text-left">
          <div className="flex items-center gap-1.5">
            <span
              className={`font-serif font-bold ${primaryTextClasses} ${
                isDark ? 'text-[#FAF7F2]' : 'text-[#183127]'
              } transition-colors group-hover:text-[#284D3F]`}
            >
              DR XYZ
            </span>
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#C8A663] mb-0.5" />
          </div>

          {showSubtitle && (
            <span
              className={`font-semibold uppercase -mt-0.5 ${subtitleClasses} ${
                isDark ? 'text-[#CDB482]' : 'text-[#8C6D3B]'
              }`}
            >
              Dental & Aesthetic Care
            </span>
          )}
        </div>
      )}
    </div>
  );
};

import React from 'react';

interface MarqueeBannerProps {
  clinicName?: string;
  variant?: 'light' | 'dark';
}

export const MarqueeBanner: React.FC<MarqueeBannerProps> = ({
  clinicName = 'DR XYZ DENTAL CLINIC',
  variant = 'light',
}) => {
  const phrase = `${clinicName} // CLINICAL PRECISION // ADVANCED RADIOGRAPHY // PATIENT COMFORT // MODERN DENTISTRY // AESTHETIC HARMONY // SECTOR 9-C CHANDIGARH // `;
  const repeated = phrase.repeat(4);

  return (
    <div
      className={`w-full overflow-hidden whitespace-nowrap py-4 border-y font-mono text-xs sm:text-sm tracking-[0.25em] uppercase select-none ${
        variant === 'dark'
          ? 'bg-[#16324F] text-[#EAF4F7] border-[#2A9D8F]/30'
          : 'bg-[#EAF4F7] text-[#16324F] border-[#D5E7ED]'
      }`}
    >
      <div className="inline-block animate-marquee">
        <span>{repeated}</span>
        <span>{repeated}</span>
      </div>
    </div>
  );
};

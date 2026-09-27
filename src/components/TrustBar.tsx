import React from 'react';
import { Cpu, HeartPulse, Sparkles, Layers } from 'lucide-react';
import { TRUST_PILLARS } from '../data/clinicData';

const ICONS = [Cpu, HeartPulse, Sparkles, Layers];

export const TrustBar: React.FC = () => {
  return (
    <section className="relative py-8 -mt-4 mb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {TRUST_PILLARS.map((pillar, idx) => {
            const Icon = ICONS[idx % ICONS.length];
            return (
              <div
                key={pillar.title}
                className="group p-6 rounded-3xl glass-panel transition-all duration-300 hover:shadow-lg hover:shadow-teal-900/5 hover:-translate-y-1 hover:border-teal-200/80"
              >
                <div className="w-10 h-10 rounded-2xl bg-teal-50/90 text-teal-800 flex items-center justify-center mb-4 border border-teal-100/80 group-hover:scale-105 transition-transform">
                  <Icon className="w-5 h-5 text-teal-700" />
                </div>
                <h3 className="text-base font-semibold text-slate-900 tracking-tight mb-2">
                  {pillar.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

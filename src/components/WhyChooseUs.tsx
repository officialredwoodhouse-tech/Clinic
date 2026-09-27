import React from 'react';
import { Check, ShieldCheck } from 'lucide-react';
import { WHY_CHOOSE_POINTS } from '../data/clinicData';

export const WhyChooseUs: React.FC = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-16 text-left">
          <span className="text-xs font-semibold uppercase tracking-widest text-teal-700 block mb-2">
            The Practice Standard
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-slate-900 tracking-tight">
            A Better Dental Experience.
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600">
            Our clinical philosophy is grounded in evidence, transparency, and a genuine respect for patient comfort.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {WHY_CHOOSE_POINTS.map((point) => (
            <div
              key={point.title}
              className="p-7 rounded-3xl glass-panel hover:bg-white transition-all duration-300 border border-white/80 hover:shadow-lg hover:border-teal-200"
            >
              <div className="w-8 h-8 rounded-full bg-teal-50 text-teal-800 flex items-center justify-center mb-4 border border-teal-100">
                <Check className="w-4 h-4 text-teal-700 stroke-[2.5]" />
              </div>
              <h3 className="text-base font-semibold text-slate-900 mb-2">
                {point.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {point.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

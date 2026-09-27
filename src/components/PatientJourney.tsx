import React from 'react';
import { PATIENT_JOURNEY_STEPS } from '../data/clinicData';

export const PatientJourney: React.FC = () => {
  return (
    <section className="py-20 relative bg-slate-50/70 border-y border-slate-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-16 text-left">
          <span className="text-xs font-semibold uppercase tracking-widest text-teal-700 block mb-2">
            The Patient Journey
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 tracking-tight">
            Clear Steps. Predictable Outcomes.
          </h2>
          <p className="mt-3 text-base text-slate-600">
            From your very first conversation to lasting oral wellness, here is what your experience at Dr Aryan looks like.
          </p>
        </div>

        {/* Horizontal Timeline */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PATIENT_JOURNEY_STEPS.map((step) => (
            <div
              key={step.step}
              className="relative p-6 rounded-3xl glass-panel hover:bg-white transition-all duration-200 border border-white/80 hover:shadow-md"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl font-serif font-bold text-teal-800/80">
                  {step.step}
                </span>
                <div className="h-0.5 flex-1 bg-gradient-to-r from-teal-200 to-transparent" />
              </div>

              <h3 className="text-lg font-serif font-bold text-slate-900 mb-2">
                {step.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

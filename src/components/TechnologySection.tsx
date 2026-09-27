import React, { useState } from 'react';
import {
  Scan,
  Radio,
  Camera,
  Layers,
  Sparkles,
  Zap,
  ArrowRight,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { TECHNOLOGY_ITEMS } from '../data/clinicData';

const TECH_ICONS = [Camera, Radio, Scan, Layers, ShieldCheck, Zap];

const WORKFLOW_STEPS = [
  { step: '01', title: 'Consultation', desc: 'Understanding your concerns and goals' },
  { step: '02', title: 'Diagnosis', desc: 'High-definition digital imaging & 3D scan' },
  { step: '03', title: 'Treatment Plan', desc: 'Customized clear options & timelines' },
  { step: '04', title: 'Treatment', desc: 'Comfort-first modern clinical care' },
  { step: '05', title: 'Follow-up', desc: 'Long-term oral health & scheduled check-ins' },
];

export const TechnologySection: React.FC = () => {
  const [activeWorkflowIndex, setActiveWorkflowIndex] = useState(0);

  return (
    <section id="technology" className="py-24 relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-r from-teal-100/20 via-sky-100/20 to-emerald-100/20 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 text-left">
          <span className="text-xs font-semibold uppercase tracking-widest text-teal-700 block mb-3">
            Digital Diagnostics & Safety
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-slate-900 tracking-tight leading-tight">
            Modern Dentistry.{' '}
            <span className="italic font-normal text-teal-900">Smarter Technology.</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            We integrate modern dental diagnostic technology and hospital-grade sterilization protocols to deliver gentle, accurate, and predictable care.
          </p>
        </div>

        {/* 6 Technology Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {TECHNOLOGY_ITEMS.map((item, idx) => {
            const Icon = TECH_ICONS[idx % TECH_ICONS.length];
            return (
              <div
                key={item.title}
                className="group p-7 rounded-3xl glass-panel hover:bg-white/90 transition-all duration-300 hover:shadow-xl hover:shadow-teal-900/5 hover:-translate-y-1 border border-white/80"
              >
                <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-800 flex items-center justify-center mb-5 border border-teal-100 group-hover:scale-105 transition-transform">
                  <Icon className="w-5 h-5 text-teal-700" />
                </div>
                <h3 className="text-lg font-serif font-bold text-slate-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Elegant Animated Clinical Workflow Graphic */}
        <div className="p-8 sm:p-10 rounded-3xl glass-panel border border-white/90 shadow-xl">
          <div className="max-w-2xl mb-8">
            <span className="text-xs font-semibold uppercase tracking-wider text-teal-700 block mb-1">
              Care Pathway
            </span>
            <h3 className="text-2xl font-serif font-bold text-slate-900">
              The Digital Workflow
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              How modern clinical precision unfolds throughout your visit:
            </p>
          </div>

          {/* Workflow Sequence */}
          <div className="relative">
            {/* Connecting Line */}
            <div className="hidden lg:block absolute top-7 left-12 right-12 h-[2px] bg-slate-200 -z-0" />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6 relative z-10">
              {WORKFLOW_STEPS.map((step, idx) => {
                const isActive = activeWorkflowIndex === idx;
                return (
                  <button
                    key={step.step}
                    type="button"
                    onClick={() => setActiveWorkflowIndex(idx)}
                    className={`text-left p-5 rounded-2xl transition-all duration-200 cursor-pointer ${
                      isActive
                        ? 'bg-white shadow-md border-2 border-teal-600 -translate-y-1'
                        : 'bg-white/60 hover:bg-white/90 border border-slate-200/80'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-mono font-bold transition-colors ${
                          isActive
                            ? 'bg-teal-700 text-white'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {step.step}
                      </span>
                      {idx < WORKFLOW_STEPS.length - 1 && (
                        <ArrowRight className="w-3.5 h-3.5 text-slate-300 hidden lg:block" />
                      )}
                    </div>
                    <h4 className="font-semibold text-slate-900 text-sm mb-1">
                      {step.title}
                    </h4>
                    <p className="text-xs text-slate-500 leading-snug">
                      {step.desc}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

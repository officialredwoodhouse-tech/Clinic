import React, { useState } from 'react';
import {
  Scan,
  Radio,
  Camera,
  Layers,
  Zap,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { TECHNOLOGY_ITEMS } from '../data/clinicData';
import { smoothEasing, staggerContainerVariants, childFadeUpVariants, scrollViewport } from './SectionTransition';

const TECH_ICONS = [Camera, Radio, Scan, Layers, ShieldCheck, Zap];

const WORKFLOW_STEPS = [
  { step: '01', title: 'Consultation', desc: 'Understanding your concerns and oral health goals' },
  { step: '02', title: 'Diagnosis', desc: 'High-definition digital radiography & intraoral scan' },
  { step: '03', title: 'Treatment Plan', desc: 'Transparent visual options, timelines, and care estimates' },
  { step: '04', title: 'Treatment', desc: 'Gentle, modern clinical care in a serene setting' },
  { step: '05', title: 'Follow-up', desc: 'Long-term oral wellness, preventive recalls, and check-ins' },
];

export const TechnologySection: React.FC = () => {
  const [activeWorkflowIndex, setActiveWorkflowIndex] = useState(0);

  return (
    <section id="technology" className="py-24 relative overflow-hidden bg-[#EAF4F7] border-b border-[#D5E7ED]">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full ambient-glow-ice -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={scrollViewport}
          transition={{ duration: 0.55, ease: smoothEasing }}
          className="max-w-3xl mb-16 text-left transform-gpu"
        >
          <span className="font-mono text-xs font-bold text-[#2A9D8F] tracking-widest uppercase block mb-2">
            [ DIGITAL DIAGNOSTICS & CLINICAL SAFETY ]
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[#16324F] tracking-tight leading-tight">
            Modern Dentistry.{' '}
            <span className="italic font-normal text-[#2A9D8F]">Smarter Technology.</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#667085] leading-relaxed">
            We integrate modern dental diagnostic technology and hospital-grade sterilization protocols to deliver gentle, accurate, and predictable care.
          </p>
        </motion.div>

        {/* 6 Technology Cards with Structured Numbered Tags */}
        <motion.div
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={scrollViewport}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20"
        >
          {TECHNOLOGY_ITEMS.map((item, idx) => {
            const Icon = TECH_ICONS[idx % TECH_ICONS.length];
            const num = `(${String(idx + 1).padStart(2, '0')})`;
            return (
              <motion.div
                key={item.title}
                variants={childFadeUpVariants}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="group p-8 rounded-2xl bg-[#FFFFFF] hover:bg-[#FFFFFF] transition-all duration-200 border border-[#D5E7ED] hover:border-[#2A9D8F] shadow-xs hover:shadow-lg hover:shadow-[#16324F]/5 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5 pb-4 border-b border-[#EAF4F7]">
                    <span className="font-mono text-xs font-bold text-[#2A9D8F]">{num}</span>
                    <div className="w-9 h-9 rounded-lg bg-[#EAF4F7] text-[#16324F] flex items-center justify-center border border-[#CEE3E9] group-hover:bg-[#2A9D8F] group-hover:text-[#FFFFFF] transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>
                  <h3 className="text-lg font-serif font-bold text-[#16324F] mb-2.5">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#667085] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Structured Clinical Workflow Graphic */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={scrollViewport}
          transition={{ duration: 0.6, ease: smoothEasing }}
          className="p-8 sm:p-10 rounded-2xl bg-[#FFFFFF] border border-[#D5E7ED] shadow-sm"
        >
          <div className="max-w-2xl mb-8">
            <span className="font-mono text-xs font-bold text-[#2A9D8F] tracking-widest uppercase block mb-1">
              [ CARE PATHWAY ]
            </span>
            <h3 className="text-2xl font-serif font-bold text-[#16324F]">
              The Structured Workflow
            </h3>
            <p className="text-xs sm:text-sm text-[#667085] mt-1">
              How clinical precision unfolds seamlessly throughout each appointment:
            </p>
          </div>

          {/* Workflow Sequence */}
          <div className="relative">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 relative z-10">
              {WORKFLOW_STEPS.map((step, idx) => {
                const isActive = activeWorkflowIndex === idx;
                return (
                  <button
                    key={step.step}
                    type="button"
                    onClick={() => setActiveWorkflowIndex(idx)}
                    className={`text-left p-5 rounded-xl transition-all duration-200 cursor-pointer ${
                      isActive
                        ? 'bg-[#2A9D8F] text-white shadow-md'
                        : 'bg-[#EAF4F7] hover:bg-[#D9EDF2] border border-[#CEE3E9] text-[#16324F]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span
                        className={`font-mono text-xs font-bold ${
                          isActive ? 'text-white' : 'text-[#2A9D8F]'
                        }`}
                      >
                        ({step.step})
                      </span>
                      {idx < WORKFLOW_STEPS.length - 1 && (
                        <ArrowRight
                          className={`w-3.5 h-3.5 hidden lg:block ${
                            isActive ? 'text-white/70' : 'text-[#2A9D8F]/60'
                          }`}
                        />
                      )}
                    </div>
                    <h4
                      className={`font-serif font-bold text-sm mb-1 ${
                        isActive ? 'text-white' : 'text-[#16324F]'
                      }`}
                    >
                      {step.title}
                    </h4>
                    <p
                      className={`text-xs leading-snug ${
                        isActive ? 'text-white/90' : 'text-[#667085]'
                      }`}
                    >
                      {step.desc}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

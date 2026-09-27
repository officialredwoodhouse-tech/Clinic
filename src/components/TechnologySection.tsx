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
import { smoothEasing, staggerContainerVariants, childFadeUpVariants } from './SectionTransition';

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
    <motion.section
      id="technology"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.8, ease: smoothEasing }}
      className="py-24 relative overflow-hidden"
    >
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-r from-[#203D32]/10 via-[#D4AF37]/10 to-[#8C6D3B]/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: smoothEasing }}
          className="max-w-3xl mb-16 text-left"
        >
          <span className="text-xs font-semibold uppercase tracking-widest text-[#8C6D3B] block mb-3">
            Digital Diagnostics & Safety
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#183127] tracking-tight leading-tight">
            Modern Dentistry.{' '}
            <span className="italic font-normal text-[#2A5243]">Smarter Technology.</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#47544B] leading-relaxed">
            We integrate modern dental diagnostic technology and hospital-grade sterilization protocols to deliver gentle, accurate, and predictable care.
          </p>
        </motion.div>

        {/* 6 Technology Cards with Staggered Entrance */}
        <motion.div
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20"
        >
          {TECHNOLOGY_ITEMS.map((item, idx) => {
            const Icon = TECH_ICONS[idx % TECH_ICONS.length];
            return (
              <motion.div
                key={item.title}
                variants={childFadeUpVariants}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
                className="group p-7 rounded-3xl glass-panel hover:bg-[#FAF7F2] transition-colors duration-300 shadow-sm hover:shadow-xl hover:shadow-[#183127]/10 border border-[#E3D8C8] hover:border-[#C4B49F]"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#EFE8DD] text-[#183127] flex items-center justify-center mb-5 border border-[#DDD0BC] group-hover:scale-105 group-hover:bg-[#183127] group-hover:text-[#F6F3EE] transition-all duration-200">
                  <Icon className="w-5 h-5 transition-colors" />
                </div>
                <h3 className="text-lg font-serif font-bold text-[#183127] mb-2">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#4E5A51] leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Elegant Animated Clinical Workflow Graphic */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.75, ease: smoothEasing }}
          className="p-8 sm:p-10 rounded-3xl glass-panel border border-[#E3D9C9] shadow-xl shadow-[#183127]/5"
        >
          <div className="max-w-2xl mb-8">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#8C6D3B] block mb-1">
              Care Pathway
            </span>
            <h3 className="text-2xl font-serif font-bold text-[#183127]">
              The Digital Workflow
            </h3>
            <p className="text-xs sm:text-sm text-[#5F6D63] mt-1">
              How modern clinical precision unfolds throughout your visit:
            </p>
          </div>

          {/* Workflow Sequence */}
          <div className="relative">
            {/* Connecting Line */}
            <div className="hidden lg:block absolute top-7 left-12 right-12 h-[2px] bg-[#DDD1BE] -z-0" />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6 relative z-10">
              {WORKFLOW_STEPS.map((step, idx) => {
                const isActive = activeWorkflowIndex === idx;
                return (
                  <motion.button
                    key={step.step}
                    type="button"
                    onClick={() => setActiveWorkflowIndex(idx)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`text-left p-5 rounded-2xl transition-all duration-200 cursor-pointer ${
                      isActive
                        ? 'bg-[#FAF7F2] shadow-md border-2 border-[#183127] -translate-y-1'
                        : 'bg-[#F2ECE2]/80 hover:bg-[#FAF7F2] border border-[#DDD2C0]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-mono font-bold transition-colors ${
                          isActive
                            ? 'bg-[#183127] text-[#FAF7F2]'
                            : 'bg-[#E3D7C5] text-[#344238]'
                        }`}
                      >
                        {step.step}
                      </span>
                      {idx < WORKFLOW_STEPS.length - 1 && (
                        <ArrowRight className="w-3.5 h-3.5 text-[#A89A84] hidden lg:block" />
                      )}
                    </div>
                    <h4 className="font-serif font-bold text-[#183127] text-sm mb-1">
                      {step.title}
                    </h4>
                    <p className="text-xs text-[#5E6D62] leading-snug">
                      {step.desc}
                    </p>
                  </motion.button>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

import React from 'react';
import { motion } from 'framer-motion';
import { PATIENT_JOURNEY_STEPS } from '../data/clinicData';
import { smoothEasing, staggerContainerVariants, childFadeUpVariants } from './SectionTransition';

export const PatientJourney: React.FC = () => {
  return (
    <motion.section
      id="journey"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.8, ease: smoothEasing }}
      className="py-20 relative bg-[#EFE9DF]/60 border-y border-[#DDD0BC]/70"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: smoothEasing }}
          className="max-w-3xl mb-16 text-left"
        >
          <span className="text-xs font-semibold uppercase tracking-widest text-[#8C6D3B] block mb-2">
            The Patient Journey
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#183127] tracking-tight">
            Clear Steps. Predictable Outcomes.
          </h2>
          <p className="mt-3 text-base text-[#4C5950]">
            From your very first conversation to lasting oral wellness, here is what your experience at Dr Aryan looks like.
          </p>
        </motion.div>

        {/* Horizontal Timeline */}
        <motion.div
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {PATIENT_JOURNEY_STEPS.map((step) => (
            <motion.div
              key={step.step}
              variants={childFadeUpVariants}
              whileHover={{ y: -5, transition: { duration: 0.25 } }}
              className="relative p-6 rounded-3xl glass-panel hover:bg-[#FAF7F2] transition-colors duration-200 border border-[#E3D9C9] hover:shadow-md"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl font-serif font-bold text-[#183127]">
                  {step.step}
                </span>
                <div className="h-0.5 flex-1 bg-gradient-to-r from-[#8C6D3B]/40 to-transparent" />
              </div>

              <h3 className="text-lg font-serif font-bold text-[#183127] mb-2">
                {step.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#4E5A51] leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

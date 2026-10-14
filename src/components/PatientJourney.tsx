import React from 'react';
import { motion } from 'framer-motion';
import { PATIENT_JOURNEY_STEPS } from '../data/clinicData';
import { smoothEasing, staggerContainerVariants, childFadeUpVariants, scrollViewport } from './SectionTransition';

export const PatientJourney: React.FC = () => {
  return (
    <section id="journey" className="py-24 relative bg-[#FFFFFF] border-b border-[#D5E7ED]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={scrollViewport}
          transition={{ duration: 0.55, ease: smoothEasing }}
          className="max-w-3xl mb-16 text-left transform-gpu"
        >
          <span className="font-mono text-xs font-bold text-[#2A9D8F] tracking-widest uppercase block mb-2">
            [ PATIENT EXPERIENCE TIMELINE ]
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[#16324F] tracking-tight">
            Clear Steps. Predictable Outcomes.
          </h2>
          <p className="mt-3 text-base sm:text-lg text-[#667085]">
            From your initial consultation to long-term smile wellness, each phase is calibrated for calm transparency.
          </p>
        </motion.div>

        {/* Structured Horizontal Grid */}
        <motion.div
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={scrollViewport}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {PATIENT_JOURNEY_STEPS.map((step) => (
            <motion.div
              key={step.step}
              variants={childFadeUpVariants}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="relative p-8 rounded-2xl bg-[#EAF4F7] hover:bg-[#FFFFFF] transition-all duration-200 border border-[#D5E7ED] hover:border-[#2A9D8F] shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-5 pb-4 border-b border-[#D5E7ED]/60">
                  <span className="font-mono text-xs font-bold text-[#2A9D8F]">
                    [ {step.step} ]
                  </span>
                  <span className="font-mono text-[10px] text-[#667085] uppercase tracking-wider">
                    PHASE {step.step}
                  </span>
                </div>

                <h3 className="text-xl font-serif font-bold text-[#16324F] mb-2.5">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#667085] leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

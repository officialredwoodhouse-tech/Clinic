import React from 'react';
import { Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { WHY_CHOOSE_POINTS } from '../data/clinicData';
import { smoothEasing, staggerContainerVariants, childFadeUpVariants, scrollViewport } from './SectionTransition';

export const WhyChooseUs: React.FC = () => {
  return (
    <section id="why-us" className="py-24 relative overflow-hidden bg-[#EAF4F7] border-b border-[#D5E7ED]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={scrollViewport}
          transition={{ duration: 0.55, ease: smoothEasing }}
          className="max-w-3xl mb-16 text-left transform-gpu"
        >
          <span className="font-mono text-xs font-bold text-[#2A9D8F] tracking-widest uppercase block mb-2">
            [ PRACTICE PHILOSOPHY & STANDARDS ]
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[#16324F] tracking-tight">
            A Better Dental Experience.
          </h2>
          <p className="mt-3 text-base sm:text-lg text-[#667085]">
            Our clinical philosophy is grounded in evidence, transparency, and a genuine respect for patient comfort.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={scrollViewport}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {WHY_CHOOSE_POINTS.map((point, idx) => (
            <motion.div
              key={point.title}
              variants={childFadeUpVariants}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="p-8 rounded-2xl bg-[#FFFFFF] hover:bg-[#FFFFFF] transition-all duration-200 border border-[#D5E7ED] hover:border-[#2A9D8F] shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#EAF4F7]">
                  <span className="font-mono text-xs font-bold text-[#2A9D8F]">
                    ({String(idx + 1).padStart(2, '0')})
                  </span>
                  <div className="w-7 h-7 rounded-lg bg-[#EAF4F7] text-[#2A9D8F] flex items-center justify-center border border-[#CEE3E9]">
                    <Check className="w-3.5 h-3.5 text-[#2A9D8F]" />
                  </div>
                </div>
                <h3 className="text-base font-serif font-bold text-[#16324F] mb-2">
                  {point.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#667085] leading-relaxed">
                  {point.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

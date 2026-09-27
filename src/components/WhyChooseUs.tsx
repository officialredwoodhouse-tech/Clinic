import React from 'react';
import { Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { WHY_CHOOSE_POINTS } from '../data/clinicData';
import { smoothEasing, staggerContainerVariants, childFadeUpVariants } from './SectionTransition';

export const WhyChooseUs: React.FC = () => {
  return (
    <motion.section
      id="why-us"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.8, ease: smoothEasing }}
      className="py-24 relative overflow-hidden bg-[#F2EDE5]/60 border-y border-[#E0D5C3]"
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
            The Practice Standard
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#183127] tracking-tight">
            A Better Dental Experience.
          </h2>
          <p className="mt-3 text-base sm:text-lg text-[#47544B]">
            Our clinical philosophy is grounded in evidence, transparency, and a genuine respect for patient comfort.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {WHY_CHOOSE_POINTS.map((point) => (
            <motion.div
              key={point.title}
              variants={childFadeUpVariants}
              whileHover={{ y: -5, transition: { duration: 0.25 } }}
              className="p-7 rounded-3xl glass-panel hover:bg-[#FAF7F2] transition-colors duration-300 border border-[#E3D9C9] shadow-sm hover:shadow-lg hover:border-[#C4B49F]"
            >
              <div className="w-8 h-8 rounded-full bg-[#EFE8DD] text-[#183127] flex items-center justify-center mb-4 border border-[#DDD0BC]">
                <Check className="w-4 h-4 text-[#203D32] stroke-[2.5]" />
              </div>
              <h3 className="text-base font-serif font-bold text-[#183127] mb-2">
                {point.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#4E5A51] leading-relaxed">
                {point.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

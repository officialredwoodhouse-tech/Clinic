import React from 'react';
import { Cpu, HeartPulse, Sparkles, Layers } from 'lucide-react';
import { motion } from 'framer-motion';
import { TRUST_PILLARS } from '../data/clinicData';
import { smoothEasing, staggerContainerVariants, childFadeUpVariants } from './SectionTransition';

const ICONS = [Cpu, HeartPulse, Sparkles, Layers];

export const TrustBar: React.FC = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: smoothEasing }}
      className="relative py-8 -mt-4 mb-8"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
        >
          {TRUST_PILLARS.map((pillar, idx) => {
            const Icon = ICONS[idx % ICONS.length];
            return (
              <motion.div
                key={pillar.title}
                variants={childFadeUpVariants}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="group p-6 rounded-3xl glass-panel transition-shadow duration-300 hover:shadow-lg hover:shadow-[#183127]/10 hover:border-[#CBBDA9]"
              >
                <div className="w-11 h-11 rounded-2xl bg-[#EFE8DD] text-[#183127] flex items-center justify-center mb-4 border border-[#DDD0BC] group-hover:scale-105 group-hover:bg-[#183127] group-hover:text-[#F7F3ED] transition-all duration-200">
                  <Icon className="w-5 h-5 transition-colors" />
                </div>
                <h3 className="text-base font-serif font-bold text-[#183127] tracking-tight mb-2">
                  {pillar.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#4E5B52] leading-relaxed">
                  {pillar.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </motion.section>
  );
};

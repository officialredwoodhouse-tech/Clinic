import React from 'react';
import { Cpu, HeartPulse, Sparkles, Layers } from 'lucide-react';
import { motion } from 'framer-motion';
import { TRUST_PILLARS } from '../data/clinicData';
import { staggerContainerVariants, childFadeUpVariants, scrollViewport } from './SectionTransition';

const ICONS = [Cpu, HeartPulse, Sparkles, Layers];
const NUMBERS = ['(01)', '(02)', '(03)', '(04)'];

export const TrustBar: React.FC = () => {
  return (
    <section className="relative border-b border-[#D5E7ED] bg-[#EAF4F7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={scrollViewport}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-[#D5E7ED]"
        >
          {TRUST_PILLARS.map((pillar, idx) => {
            const Icon = ICONS[idx % ICONS.length];
            const num = NUMBERS[idx % NUMBERS.length];
            return (
              <motion.div
                key={pillar.title}
                variants={childFadeUpVariants}
                className="py-7 px-5 lg:px-6 flex flex-col justify-between group hover:bg-[#FFFFFF]/70 transition-colors duration-200"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs font-bold text-[#2A9D8F] tracking-wider">
                      {num}
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-[#FFFFFF] text-[#16324F] flex items-center justify-center border border-[#D5E7ED] group-hover:bg-[#2A9D8F] group-hover:text-[#FFFFFF] transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>
                  <h3 className="text-sm font-mono font-bold tracking-wider text-[#16324F] uppercase mb-2">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-[#667085] leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

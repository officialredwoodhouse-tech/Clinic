import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { FAQ_ITEMS } from '../data/clinicData';
import { smoothEasing, staggerContainerVariants, childFadeUpVariants, scrollViewport } from './SectionTransition';

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <section id="faq" className="py-24 relative overflow-hidden bg-[#FFFFFF] border-b border-[#D5E7ED]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={scrollViewport}
          transition={{ duration: 0.55, ease: smoothEasing }}
          className="text-left mb-16 transform-gpu"
        >
          <span className="font-mono text-xs font-bold text-[#2A9D8F] tracking-widest uppercase block mb-2">
            [ FREQUENTLY ASKED QUESTIONS ]
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[#16324F] tracking-tight">
            Clear Answers
          </h2>
          <p className="mt-3 text-base sm:text-lg text-[#667085]">
            Everything you need to know about scheduling, procedures, and preparing for your visit.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={scrollViewport}
          className="space-y-4"
        >
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openIndex === idx;
            const numIndex = `(${String(idx + 1).padStart(2, '0')})`;

            return (
              <motion.div
                key={idx}
                variants={childFadeUpVariants}
                className="rounded-2xl bg-[#FFFFFF] border border-[#D5E7ED] overflow-hidden transition-all duration-200 shadow-xs"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left gap-4 hover:bg-[#EAF4F7]/40 transition-colors cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-bold text-[#2A9D8F]">
                      {numIndex}
                    </span>
                    <span className="font-serif font-bold text-[#16324F] text-base sm:text-lg">
                      {item.question}
                    </span>
                  </div>
                  <div
                    className={`p-1.5 rounded-lg transition-transform duration-200 shrink-0 ${
                      isOpen
                        ? 'rotate-180 bg-[#2A9D8F] text-white'
                        : 'bg-[#EAF4F7] text-[#16324F]'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.35, ease: smoothEasing }}
                      className="overflow-hidden border-t border-[#EAF4F7]"
                    >
                      <div className="px-6 pb-6 pt-4 text-sm text-[#667085] leading-relaxed">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

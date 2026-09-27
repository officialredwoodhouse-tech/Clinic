import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { FAQ_ITEMS } from '../data/clinicData';
import { smoothEasing, staggerContainerVariants, childFadeUpVariants } from './SectionTransition';

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <motion.section
      id="faq"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.8, ease: smoothEasing }}
      className="py-24 relative overflow-hidden bg-[#EFE9DF]/50 border-t border-[#E0D5C3]"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: smoothEasing }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="text-xs font-semibold uppercase tracking-widest text-[#8C6D3B] block mb-2">
            Clear Answers
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#183127] tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-base text-[#4C5950]">
            Everything you need to know about scheduling, treatments, and preparing for your visit.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="space-y-4"
        >
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <motion.div
                key={idx}
                variants={childFadeUpVariants}
                className="rounded-2xl glass-panel border border-[#E3D9C9] overflow-hidden transition-colors duration-200"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left gap-4 hover:bg-[#FAF7F2] transition-colors cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="font-serif font-semibold text-[#183127] text-base sm:text-lg">
                    {item.question}
                  </span>
                  <div
                    className={`p-1.5 rounded-full transition-transform duration-200 shrink-0 ${
                      isOpen
                        ? 'rotate-180 bg-[#183127] text-[#FAF7F2]'
                        : 'bg-[#EFE8DD] text-[#4C5950]'
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
                      className="overflow-hidden border-t border-[#EAE0D2]"
                    >
                      <div className="px-6 pb-6 pt-3 text-sm text-[#4E5A51] leading-relaxed">
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
    </motion.section>
  );
};

import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { TESTIMONIALS } from '../data/clinicData';
import { smoothEasing } from './SectionTransition';

export const TestimonialsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevReview = () => {
    setCurrentIndex((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };

  const nextReview = () => {
    setCurrentIndex((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
  };

  const current = TESTIMONIALS[currentIndex];

  return (
    <motion.section
      id="reviews"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.8, ease: smoothEasing }}
      className="py-24 relative overflow-hidden bg-[#FAF7F2]/80"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: smoothEasing }}
            className="max-w-2xl text-left"
          >
            <span className="text-xs font-semibold uppercase tracking-widest text-[#8C6D3B] block mb-2">
              Patient Experiences
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#183127] tracking-tight">
              Words From Our Patients
            </h2>
            <p className="mt-3 text-base text-[#4C5950]">
              Reflections on clinical precision, comfort, and attentive care at our Chandigarh practice.
            </p>
          </motion.div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-2 self-start md:self-auto">
            <button
              type="button"
              onClick={prevReview}
              className="p-3 rounded-full bg-[#EFE8DD] border border-[#DDD0BC] text-[#183127] hover:bg-[#183127] hover:text-[#FAF7F2] shadow-xs transition-colors cursor-pointer"
              aria-label="Previous review"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={nextReview}
              className="p-3 rounded-full bg-[#EFE8DD] border border-[#DDD0BC] text-[#183127] hover:bg-[#183127] hover:text-[#FAF7F2] shadow-xs transition-colors cursor-pointer"
              aria-label="Next review"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Highlighted Testimonial Glass Card with AnimatePresence */}
        <div className="relative p-8 sm:p-12 rounded-3xl glass-panel border border-[#E3D9C9] shadow-xl max-w-4xl mx-auto min-h-[300px] flex flex-col justify-between">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.4, ease: smoothEasing }}
            >
              <Quote className="w-10 h-10 text-[#CBBBA5] mb-6" />

              {/* Star Rating */}
              <div className="flex items-center gap-1 mb-6">
                {[...Array(current.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#D4AF37] text-[#D4AF37]" />
                ))}
                <span className="ml-2 text-xs font-semibold text-[#8C6D3B]">
                  5.0 Rating
                </span>
              </div>

              <p className="text-lg sm:text-xl font-serif text-[#183127] leading-relaxed mb-8 italic">
                "{current.reviewText}"
              </p>

              <div className="pt-6 border-t border-[#DFD4C2] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-[#183127] text-base">
                      {current.patientName}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[11px] font-medium text-[#183127] bg-[#EFE8DD] px-2.5 py-0.5 rounded-full border border-[#DDD0BC]">
                      <CheckCircle className="w-3 h-3 text-[#284D3F]" />
                      {current.source}
                    </span>
                  </div>
                  <div className="text-xs text-[#5D6B61] mt-0.5">
                    Treatment: {current.treatment} · {current.date}
                  </div>
                </div>

                <div className="text-xs text-[#8C988F]">
                  Review {currentIndex + 1} of {TESTIMONIALS.length}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </motion.section>
  );
};

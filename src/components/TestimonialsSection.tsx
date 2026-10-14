import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { TESTIMONIALS } from '../data/clinicData';
import { smoothEasing, scrollViewport } from './SectionTransition';

export const TestimonialsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevReview = () => {
    setCurrentIndex((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };

  const nextReview = () => {
    setCurrentIndex((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
  };

  const current = TESTIMONIALS[currentIndex];
  const numIndex = `[ ${String(currentIndex + 1).padStart(2, '0')} ]`;

  return (
    <section id="reviews" className="py-24 relative overflow-hidden bg-[#EAF4F7] border-b border-[#D5E7ED]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={scrollViewport}
            transition={{ duration: 0.55, ease: smoothEasing }}
            className="max-w-2xl text-left transform-gpu"
          >
            <span className="font-mono text-xs font-bold text-[#2A9D8F] tracking-widest uppercase block mb-2">
              [ Testimonials ]
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[#16324F] tracking-tight">
              What Our Patients Say
            </h2>
            <p className="mt-3 text-base sm:text-lg text-[#667085]">
              Reflections on clinical precision, comfort, and attentive care at our Chandigarh clinic.
            </p>
          </motion.div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-3 self-start md:self-auto">
            <span className="font-mono text-xs text-[#667085] mr-2">
              {currentIndex + 1} / {TESTIMONIALS.length}
            </span>
            <button
              type="button"
              onClick={prevReview}
              className="p-3 rounded-xl bg-[#FFFFFF] border border-[#D5E7ED] text-[#16324F] hover:bg-[#2A9D8F] hover:text-[#FFFFFF] shadow-xs transition-colors cursor-pointer"
              aria-label="Previous review"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={nextReview}
              className="p-3 rounded-xl bg-[#FFFFFF] border border-[#D5E7ED] text-[#16324F] hover:bg-[#2A9D8F] hover:text-[#FFFFFF] shadow-xs transition-colors cursor-pointer"
              aria-label="Next review"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Structured Testimonial Card */}
        <div className="relative p-8 sm:p-12 lg:p-14 rounded-2xl bg-[#FFFFFF] border border-[#D5E7ED] shadow-sm max-w-4xl mx-auto min-h-[320px] flex flex-col justify-between">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.35, ease: smoothEasing }}
            >
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#EAF4F7]">
                <span className="font-mono text-sm font-bold text-[#2A9D8F]">
                  {numIndex}
                </span>
                {/* 5-Star Rating */}
                <div className="flex items-center gap-1">
                  {[...Array(current.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-[#2A9D8F] text-[#2A9D8F]" />
                  ))}
                  <span className="ml-2 font-mono text-xs font-semibold text-[#2A9D8F]">
                    5.0 RATING
                  </span>
                </div>
              </div>

              <p className="text-xl sm:text-2xl font-serif text-[#16324F] leading-relaxed mb-8 italic">
                “{current.reviewText}”
              </p>

              <div className="pt-6 border-t border-[#EAF4F7] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-serif font-bold text-[#16324F] text-lg">
                      — {current.patientName}
                    </span>
                    <span className="inline-flex items-center gap-1 font-mono text-[10px] font-medium text-[#16324F] bg-[#EAF4F7] px-2.5 py-0.5 rounded-full border border-[#CEE3E9]">
                      <CheckCircle className="w-3 h-3 text-[#2A9D8F]" />
                      VERIFIED PATIENT
                    </span>
                  </div>
                  <div className="font-mono text-xs text-[#667085] mt-1">
                    Treatment: {current.treatment} · {current.date}
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  {TESTIMONIALS.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setCurrentIndex(i)}
                      className={`h-1.5 rounded-full transition-all cursor-pointer ${
                        currentIndex === i ? 'w-8 bg-[#2A9D8F]' : 'w-2 bg-[#D5E7ED]'
                      }`}
                      aria-label={`Jump to review ${i + 1}`}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

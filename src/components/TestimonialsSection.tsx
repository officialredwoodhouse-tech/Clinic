import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote, CheckCircle } from 'lucide-react';
import { TESTIMONIALS } from '../data/clinicData';

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
    <section id="reviews" className="py-24 relative overflow-hidden bg-slate-50/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl text-left">
            <span className="text-xs font-semibold uppercase tracking-widest text-teal-700 block mb-2">
              Patient Experiences
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-slate-900 tracking-tight">
              Words From Our Patients
            </h2>
            <p className="mt-3 text-base text-slate-600">
              Reflections on clinical precision, comfort, and attentive care at our Chandigarh practice.
            </p>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-2 self-start md:self-auto">
            <button
              type="button"
              onClick={prevReview}
              className="p-3 rounded-full bg-white border border-slate-200 text-slate-700 hover:text-teal-900 hover:border-teal-300 shadow-xs transition-colors cursor-pointer"
              aria-label="Previous review"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={nextReview}
              className="p-3 rounded-full bg-white border border-slate-200 text-slate-700 hover:text-teal-900 hover:border-teal-300 shadow-xs transition-colors cursor-pointer"
              aria-label="Next review"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Highlighted Testimonial Glass Card */}
        <div className="relative p-8 sm:p-12 rounded-3xl glass-panel border border-white/90 shadow-xl max-w-4xl mx-auto">
          <Quote className="w-10 h-10 text-teal-200 mb-6" />

          {/* Star Rating */}
          <div className="flex items-center gap-1 mb-6">
            {[...Array(current.rating)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
            ))}
            <span className="ml-2 text-xs font-semibold text-slate-500">
              5.0 Rating
            </span>
          </div>

          <p className="text-lg sm:text-xl font-serif text-slate-800 leading-relaxed mb-8 italic">
            "{current.reviewText}"
          </p>

          <div className="pt-6 border-t border-slate-200/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-slate-900 text-base">
                  {current.patientName}
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] font-medium text-teal-800 bg-teal-50 px-2 py-0.5 rounded-full border border-teal-100">
                  <CheckCircle className="w-3 h-3 text-teal-600" />
                  {current.source}
                </span>
              </div>
              <div className="text-xs text-slate-500 mt-0.5">
                Treatment: {current.treatment} · {current.date}
              </div>
            </div>

            <div className="text-xs text-slate-400">
              Review {currentIndex + 1} of {TESTIMONIALS.length}
            </div>
          </div>
        </div>

        {/* Transparency Note */}
        <div className="mt-8 text-center text-xs text-slate-400">
          Reviews are submitted by verified patients following completed appointments at Dr Aryan.
        </div>
      </div>
    </section>
  );
};

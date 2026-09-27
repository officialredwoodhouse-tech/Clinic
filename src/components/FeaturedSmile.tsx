import React from 'react';
import { Calendar, MessageSquare, Sparkles, ArrowRight } from 'lucide-react';
import { ClinicConfig } from '../types/clinic';

interface FeaturedSmileProps {
  config: ClinicConfig;
  onOpenBooking: () => void;
}

export const FeaturedSmile: React.FC<FeaturedSmileProps> = ({ config, onOpenBooking }) => {
  const whatsappUrl = `https://wa.me/${config.whatsappNumber}?text=${encodeURIComponent(
    'Hi Dr Aryan, I would like to consult about transforming my smile at your Chandigarh clinic.'
  )}`;

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden glass-panel border border-white/90 shadow-2xl p-6 sm:p-10 lg:p-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left: Large Image of a beautiful natural smile */}
            <div className="lg:col-span-6 relative">
              <div className="rounded-3xl overflow-hidden aspect-[4/3] shadow-lg border border-white/60 bg-slate-100">
                <img
                  src="/src/assets/images/smile_makeover_aesthetic_1790483883748.jpg"
                  alt="Transform Your Smile - Dr Aryan Dental Chandigarh"
                  className="w-full h-full object-cover transform hover:scale-102 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute bottom-4 left-4 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md text-xs font-semibold text-slate-800 shadow-sm border border-white">
                <Sparkles className="w-3.5 h-3.5 text-teal-600" />
                <span>Aesthetic Harmony</span>
              </div>
            </div>

            {/* Right: Glass Card Content */}
            <div className="lg:col-span-6 flex flex-col items-start text-left">
              <span className="text-xs font-semibold uppercase tracking-widest text-teal-700 mb-2">
                Aesthetic & Restorative Care
              </span>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-slate-900 tracking-tight mb-6">
                Transform Your Smile
              </h2>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-8">
                Whether you're looking to restore a damaged tooth, replace missing teeth or enhance your smile, we create treatment plans based on your individual needs.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={onOpenBooking}
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-xs font-semibold text-white bg-slate-900 hover:bg-teal-900 rounded-2xl shadow-sm transition-all duration-150 cursor-pointer active:scale-95"
                >
                  <Calendar className="w-4 h-4 text-teal-300" />
                  <span>Book Consultation</span>
                </button>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs font-semibold text-teal-900 bg-teal-50/80 hover:bg-teal-100/90 border border-teal-200 rounded-2xl transition-all duration-150 active:scale-95"
                >
                  <MessageSquare className="w-4 h-4 text-teal-600" />
                  <span>WhatsApp Us</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

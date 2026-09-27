import React from 'react';
import { Calendar, MessageSquare, ArrowRight, Sparkles } from 'lucide-react';
import { ClinicConfig } from '../types/clinic';

interface FinalCTAProps {
  config: ClinicConfig;
  onOpenBooking: () => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({ config, onOpenBooking }) => {
  const whatsappUrl = `https://wa.me/${config.whatsappNumber}?text=${encodeURIComponent(
    'Hi Dr Aryan, I would like to schedule a personal consultation for my smile.'
  )}`;

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden glass-panel-dark text-white p-8 sm:p-14 lg:p-16 text-center border border-white/10 shadow-2xl">
          {/* Subtle ambient interior glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-teal-500/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-medium text-teal-200 mb-6 border border-white/15">
              <Sparkles className="w-3.5 h-3.5 text-teal-400" />
              <span>Personalized Dental Excellence</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold tracking-tight mb-4">
              Your Smile Deserves Personal Attention.
            </h2>

            <p className="text-base sm:text-lg text-slate-300 mb-8 leading-relaxed">
              Have a concern, a question, or simply want to take better care of your smile?
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                type="button"
                onClick={onOpenBooking}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 text-xs font-semibold uppercase tracking-wider text-slate-900 bg-white hover:bg-teal-50 rounded-2xl shadow-lg transition-all duration-150 cursor-pointer active:scale-95"
              >
                <Calendar className="w-4 h-4 text-teal-700" />
                <span>Book an Appointment</span>
                <ArrowRight className="w-4 h-4 ml-1 opacity-70" />
              </button>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-4 text-xs font-semibold uppercase tracking-wider text-white bg-teal-800/80 hover:bg-teal-700 border border-teal-500/40 rounded-2xl transition-all duration-150 active:scale-95"
              >
                <MessageSquare className="w-4 h-4 text-teal-300" />
                <span>WhatsApp Dr Aryan</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

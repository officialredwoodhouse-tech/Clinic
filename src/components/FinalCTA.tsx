import React from 'react';
import { Calendar, MessageSquare, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { ClinicConfig } from '../types/clinic';
import { smoothEasing, scrollViewport } from './SectionTransition';

interface FinalCTAProps {
  config: ClinicConfig;
  onOpenBooking: () => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({ config, onOpenBooking }) => {
  const whatsappUrl = `https://wa.me/${config.whatsappNumber}?text=${encodeURIComponent(
    'Hi Dr XYZ, I would like to schedule a personal consultation for my smile.'
  )}`;

  return (
    <section className="py-24 relative overflow-hidden bg-[#16324F] text-white">
      {/* Zero-blur ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] rounded-full ambient-glow-teal opacity-60" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={scrollViewport}
          transition={{ duration: 0.6, ease: smoothEasing }}
          className="max-w-3xl mx-auto text-center"
        >
          <span className="font-mono text-xs font-bold text-[#2A9D8F] tracking-widest uppercase block mb-4">
            [ CONSULTATION DESK ]
          </span>

          <h2 className="text-4xl sm:text-6xl font-serif font-bold text-[#FFFFFF] tracking-tight mb-4">
            Ready for a healthier smile?
          </h2>

          <p className="text-base sm:text-lg text-[#EAF4F7]/90 mb-10 leading-relaxed font-sans max-w-xl mx-auto">
            Schedule your personalized consultation with Dr XYZ. Thoughtful diagnostics, clear options, and unhurried care in Chandigarh.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              type="button"
              onClick={onOpenBooking}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-9 py-4 text-xs font-bold uppercase tracking-wider text-[#16324F] bg-[#FFFFFF] hover:bg-[#EAF4F7] rounded-xl shadow-lg transition-all duration-150 cursor-pointer active:scale-95 font-mono"
            >
              <Calendar className="w-4 h-4 text-[#2A9D8F]" />
              <span>Schedule Your Consultation</span>
              <ArrowRight className="w-4 h-4 text-[#2A9D8F]" />
            </button>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 text-xs font-bold uppercase tracking-wider text-[#FFFFFF] bg-[#2A9D8F] hover:bg-[#238579] border border-[#238579] rounded-xl transition-all duration-150 active:scale-95 font-mono shadow-md"
            >
              <MessageSquare className="w-4 h-4 text-[#FFFFFF]" />
              <span>WhatsApp Direct</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

import React from 'react';
import { Calendar, MessageSquare, ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { ClinicConfig } from '../types/clinic';
import { smoothEasing } from './SectionTransition';

interface FinalCTAProps {
  config: ClinicConfig;
  onOpenBooking: () => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({ config, onOpenBooking }) => {
  const whatsappUrl = `https://wa.me/${config.whatsappNumber}?text=${encodeURIComponent(
    'Hi Dr Pallavi, I would like to schedule a personal consultation for my smile.'
  )}`;

  return (
    <motion.section
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: smoothEasing }}
      className="py-20 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1, ease: smoothEasing }}
          className="relative rounded-3xl overflow-hidden glass-panel-dark text-white p-8 sm:p-14 lg:p-16 text-center border border-[#CEB385]/30 shadow-2xl"
        >
          {/* Subtle ambient interior glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#D4AF37]/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF7F2]/10 backdrop-blur-md text-xs font-semibold text-[#E8DCC4] mb-6 border border-[#CEB385]/30">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Personalized Dental Excellence</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#FAF7F2] tracking-tight mb-4">
              Your Smile Deserves Personal Attention.
            </h2>

            <p className="text-base sm:text-lg text-[#DDD5C7] mb-8 leading-relaxed">
              Have a concern, a question, or simply want to take better care of your smile?
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                type="button"
                onClick={onOpenBooking}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 text-xs font-semibold uppercase tracking-wider text-[#183127] bg-[#FAF7F2] hover:bg-[#F2ECE0] rounded-2xl shadow-lg transition-all duration-150 cursor-pointer active:scale-95 border border-[#EDE4D5]"
              >
                <Calendar className="w-4 h-4 text-[#8C6D3B]" />
                <span>Book an Appointment</span>
                <ArrowRight className="w-4 h-4 ml-1 opacity-70 text-[#8C6D3B]" />
              </button>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-4 text-xs font-semibold uppercase tracking-wider text-[#FAF7F2] bg-[#244738] hover:bg-[#2C5644] border border-[#3E705A] rounded-2xl transition-all duration-150 active:scale-95"
              >
                <MessageSquare className="w-4 h-4 text-[#D4AF37]" />
                <span>WhatsApp Dr Pallavi</span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

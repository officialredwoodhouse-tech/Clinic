import React from 'react';
import { Calendar, MessageSquare, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { ClinicConfig } from '../types/clinic';
import { smoothEasing } from './SectionTransition';

interface FeaturedSmileProps {
  config: ClinicConfig;
  onOpenBooking: () => void;
}

export const FeaturedSmile: React.FC<FeaturedSmileProps> = ({ config, onOpenBooking }) => {
  const whatsappUrl = `https://wa.me/${config.whatsappNumber}?text=${encodeURIComponent(
    'Hi Dr Aryan, I would like to consult about transforming my smile at your Chandigarh clinic.'
  )}`;

  return (
    <motion.section
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.8, ease: smoothEasing }}
      className="py-20 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden glass-panel border border-[#E3D9C9] shadow-2xl shadow-[#183127]/10 p-6 sm:p-10 lg:p-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left: Large Image of a beautiful natural smile */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.75, delay: 0.1, ease: smoothEasing }}
              className="lg:col-span-6 relative"
            >
              <div className="rounded-3xl overflow-hidden aspect-[4/3] shadow-lg border border-[#E1D5C2] bg-[#EFE8DD]">
                <img
                  src="/src/assets/images/smile_makeover_aesthetic_1790483883748.jpg"
                  alt="Transform Your Smile - Dr Aryan Dental Chandigarh"
                  className="w-full h-full object-cover transform hover:scale-102 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute bottom-4 left-4 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF7F2]/90 backdrop-blur-md text-xs font-semibold text-[#183127] shadow-sm border border-[#E5DAC8]">
                <Sparkles className="w-3.5 h-3.5 text-[#8C6D3B]" />
                <span>Aesthetic Harmony</span>
              </div>
            </motion.div>

            {/* Right: Glass Card Content */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.75, delay: 0.2, ease: smoothEasing }}
              className="lg:col-span-6 flex flex-col items-start text-left"
            >
              <span className="text-xs font-semibold uppercase tracking-widest text-[#8C6D3B] mb-2">
                Aesthetic & Restorative Care
              </span>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#183127] tracking-tight mb-6">
                Transform Your Smile
              </h2>

              <p className="text-base sm:text-lg text-[#47544B] leading-relaxed mb-8">
                Whether you're looking to restore a damaged tooth, replace missing teeth or enhance your smile, we create treatment plans based on your individual needs.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={onOpenBooking}
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-xs font-semibold text-[#FAF7F2] bg-[#183127] hover:bg-[#203D32] rounded-2xl shadow-md shadow-[#183127]/20 transition-all duration-150 cursor-pointer active:scale-95 border border-[#2B5443]"
                >
                  <Calendar className="w-4 h-4 text-[#D4AF37]" />
                  <span>Book Consultation</span>
                </button>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs font-semibold text-[#183127] bg-[#EFE8DD] hover:bg-[#E5DCCF] border border-[#D5C9B5] rounded-2xl transition-all duration-150 active:scale-95"
                >
                  <MessageSquare className="w-4 h-4 text-[#203D32]" />
                  <span>WhatsApp Us</span>
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

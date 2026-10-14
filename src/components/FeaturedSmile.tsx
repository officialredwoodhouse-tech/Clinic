import React from 'react';
import { Calendar, MessageSquare, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { ClinicConfig } from '../types/clinic';
import { smoothEasing, scrollViewport } from './SectionTransition';
import { smileMakeoverImg } from '../assets/images';

interface FeaturedSmileProps {
  config: ClinicConfig;
  onOpenBooking: () => void;
}

export const FeaturedSmile: React.FC<FeaturedSmileProps> = ({ config, onOpenBooking }) => {
  const whatsappUrl = `https://wa.me/${config.whatsappNumber}?text=${encodeURIComponent(
    'Hi Dr XYZ, I would like to consult about transforming my smile at your Chandigarh clinic.'
  )}`;

  return (
    <section className="py-20 relative overflow-hidden border-b border-[#D5E7ED] bg-[#FFFFFF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-2xl overflow-hidden bg-[#EAF4F7] border border-[#D5E7ED] p-8 sm:p-12 lg:p-14 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left: Large Image with architectural frame */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={scrollViewport}
              transition={{ duration: 0.55, ease: smoothEasing }}
              className="lg:col-span-6 relative transform-gpu"
            >
              <div className="rounded-xl overflow-hidden aspect-[4/3] border border-[#D5E7ED] bg-[#FFFFFF] shadow-md">
                <img
                  src={smileMakeoverImg}
                  alt="Transform Your Smile - Dr XYZ Dental Chandigarh"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transform hover:scale-102 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute bottom-4 left-4 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFFFFF]/95 text-xs font-mono font-semibold text-[#16324F] shadow-xs border border-[#D5E7ED]">
                <Sparkles className="w-3.5 h-3.5 text-[#2A9D8F]" />
                <span>AESTHETIC REFINEMENT</span>
              </div>
            </motion.div>

            {/* Right: Content */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={scrollViewport}
              transition={{ duration: 0.55, delay: 0.1, ease: smoothEasing }}
              className="lg:col-span-6 flex flex-col items-start text-left transform-gpu"
            >
              <span className="font-mono text-xs font-bold text-[#2A9D8F] tracking-widest uppercase mb-2">
                [ AESTHETIC HARMONY ]
              </span>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#16324F] tracking-tight mb-6">
                Transform Your Smile
              </h2>

              <p className="text-base sm:text-lg text-[#667085] leading-relaxed mb-8">
                Whether you're looking to restore a damaged tooth, replace missing teeth or enhance your natural smile, we craft individualized treatment plans grounded in anatomical balance and natural tooth gradation.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={onOpenBooking}
                  className="inline-flex items-center justify-center gap-2 px-8 py-3.5 text-xs font-bold uppercase tracking-wider text-[#FFFFFF] bg-[#2A9D8F] hover:bg-[#238579] rounded-xl shadow-md shadow-[#2A9D8F]/25 transition-all cursor-pointer active:scale-98 border border-[#238579]"
                >
                  <Calendar className="w-4 h-4 text-[#FFFFFF]" />
                  <span>Book Consultation</span>
                </button>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-xs font-bold uppercase tracking-wider text-[#16324F] bg-[#FFFFFF] hover:bg-[#EAF4F7] border border-[#CEE3E9] rounded-xl transition-all active:scale-98 font-mono shadow-xs"
                >
                  <MessageSquare className="w-4 h-4 text-[#2A9D8F]" />
                  <span>WhatsApp Us</span>
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

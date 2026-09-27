import React from 'react';
import { MessageSquare, Calendar, Phone } from 'lucide-react';
import { motion } from 'framer-motion';
import { ClinicConfig } from '../types/clinic';
import { smoothEasing } from './SectionTransition';

interface FloatingActionsProps {
  config: ClinicConfig;
  onOpenBooking: () => void;
}

export const FloatingActions: React.FC<FloatingActionsProps> = ({ config, onOpenBooking }) => {
  const whatsappUrl = `https://wa.me/${config.whatsappNumber}?text=${encodeURIComponent(
    'Hi Dr Aryan, I would like to know more about your dental services and book an appointment.'
  )}`;

  return (
    <>
      {/* Desktop Floating Actions (Bottom-Right Glass Pills) */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.8, ease: smoothEasing }}
        className="hidden lg:flex fixed bottom-6 right-6 z-40 flex-col items-end gap-3 pointer-events-none"
      >
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="pointer-events-auto inline-flex items-center gap-2 px-4 py-3 rounded-full bg-[#FAF7F2]/95 backdrop-blur-xl border border-[#D5C9B7] text-[#183127] text-xs font-semibold shadow-lg hover:shadow-xl hover:bg-[#FAF7F2] hover:scale-102 transition-all duration-200"
        >
          <div className="w-6 h-6 rounded-full bg-[#183127] text-[#FAF7F2] flex items-center justify-center">
            <MessageSquare className="w-3.5 h-3.5 text-[#D4AF37]" />
          </div>
          <span>Chat on WhatsApp</span>
        </a>

        <button
          type="button"
          onClick={onOpenBooking}
          className="pointer-events-auto inline-flex items-center gap-2 px-5 py-3.5 rounded-full bg-[#183127] hover:bg-[#203D32] text-[#FAF7F2] text-xs font-semibold shadow-xl hover:shadow-2xl hover:scale-102 transition-all duration-200 cursor-pointer border border-[#2D5444]"
        >
          <Calendar className="w-4 h-4 text-[#D4AF37]" />
          <span>Book Appointment</span>
        </button>
      </motion.div>

      {/* Mobile Fixed Bottom Action Bar (<15% viewport height) */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6, ease: smoothEasing }}
        className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-xl border-t border-[#E3D9C9] px-4 py-2.5 shadow-2xl safe-bottom"
      >
        <div className="flex items-center justify-between gap-2 max-w-md mx-auto">
          {/* WhatsApp */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex flex-col items-center justify-center py-1 text-[11px] font-semibold text-[#183127] hover:text-[#284D3F] active:scale-95 transition-transform"
          >
            <MessageSquare className="w-4 h-4 text-[#203D32] mb-0.5" />
            <span>WhatsApp</span>
          </a>

          {/* Book Appointment (Prominent Center CTA) */}
          <button
            type="button"
            onClick={onOpenBooking}
            className="flex-[1.5] inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-[#183127] active:bg-[#203D32] text-[#FAF7F2] text-xs font-semibold shadow-md active:scale-95 transition-transform cursor-pointer border border-[#2D5444]"
          >
            <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Book Now</span>
          </button>

          {/* Call Clinic */}
          <a
            href={`tel:${config.clinicPhone.replace(/\s+/g, '')}`}
            className="flex-1 flex flex-col items-center justify-center py-1 text-[11px] font-semibold text-[#48554D] hover:text-[#183127] active:scale-95 transition-transform"
          >
            <Phone className="w-4 h-4 text-[#637267] mb-0.5" />
            <span>Call Clinic</span>
          </a>
        </div>
      </motion.div>
    </>
  );
};

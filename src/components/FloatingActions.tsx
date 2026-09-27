import React from 'react';
import { MessageSquare, Calendar, Phone } from 'lucide-react';
import { ClinicConfig } from '../types/clinic';

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
      <div className="hidden lg:flex fixed bottom-6 right-6 z-40 flex-col items-end gap-3 pointer-events-none">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="pointer-events-auto inline-flex items-center gap-2 px-4 py-3 rounded-full bg-white/90 backdrop-blur-xl border border-teal-200/80 text-teal-900 text-xs font-semibold shadow-lg hover:shadow-xl hover:bg-white hover:scale-102 transition-all duration-200"
        >
          <div className="w-6 h-6 rounded-full bg-teal-500 text-white flex items-center justify-center">
            <MessageSquare className="w-3.5 h-3.5" />
          </div>
          <span>Chat on WhatsApp</span>
        </a>

        <button
          type="button"
          onClick={onOpenBooking}
          className="pointer-events-auto inline-flex items-center gap-2 px-5 py-3.5 rounded-full bg-slate-900/95 hover:bg-teal-900 text-white text-xs font-semibold shadow-xl hover:shadow-2xl hover:scale-102 transition-all duration-200 cursor-pointer"
        >
          <Calendar className="w-4 h-4 text-teal-300" />
          <span>Book Appointment</span>
        </button>
      </div>

      {/* Mobile Fixed Bottom Action Bar (<15% viewport height) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-xl border-t border-slate-200/80 px-4 py-2.5 shadow-2xl safe-bottom">
        <div className="flex items-center justify-between gap-2 max-w-md mx-auto">
          {/* WhatsApp */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex flex-col items-center justify-center py-1 text-[11px] font-semibold text-teal-800 hover:text-teal-950 active:scale-95 transition-transform"
          >
            <MessageSquare className="w-4 h-4 text-teal-600 mb-0.5" />
            <span>WhatsApp</span>
          </a>

          {/* Book Appointment (Prominent Center CTA) */}
          <button
            type="button"
            onClick={onOpenBooking}
            className="flex-[1.5] inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-slate-900 active:bg-teal-900 text-white text-xs font-semibold shadow-md active:scale-95 transition-transform cursor-pointer"
          >
            <Calendar className="w-3.5 h-3.5 text-teal-300" />
            <span>Book Now</span>
          </button>

          {/* Call Clinic */}
          <a
            href={`tel:${config.clinicPhone.replace(/\s+/g, '')}`}
            className="flex-1 flex flex-col items-center justify-center py-1 text-[11px] font-semibold text-slate-700 hover:text-slate-900 active:scale-95 transition-transform"
          >
            <Phone className="w-4 h-4 text-slate-600 mb-0.5" />
            <span>Call</span>
          </a>
        </div>
      </div>
    </>
  );
};

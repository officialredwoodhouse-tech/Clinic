import React from 'react';
import { CheckCircle2, MessageSquare, Mail, Calendar, Clock, MapPin, X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { AppointmentRequest, ClinicConfig } from '../types/clinic';
import { smoothEasing } from './SectionTransition';

interface BookingSuccessModalProps {
  appointment: AppointmentRequest | null;
  whatsappUrl?: string;
  onClose: () => void;
  config: ClinicConfig;
}

export const BookingSuccessModal: React.FC<BookingSuccessModalProps> = ({
  appointment,
  whatsappUrl,
  onClose,
  config,
}) => {
  return (
    <AnimatePresence>
      {appointment && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#12231B]/70 backdrop-blur-md overflow-y-auto"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.35, ease: smoothEasing }}
            className="relative w-full max-w-xl bg-[#FAF7F2] rounded-3xl shadow-2xl border border-[#E3D9C9] p-6 sm:p-8 overflow-hidden my-auto max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute top-5 right-5 p-2 text-[#717E74] hover:text-[#183127] rounded-full hover:bg-[#EFE8DD] transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Success Icon & Heading */}
            <div className="text-center mb-6">
              <div className="w-14 h-14 rounded-full bg-[#EFE8DD] text-[#183127] flex items-center justify-center mx-auto mb-3 border border-[#DDD0BC]">
                <CheckCircle2 className="w-8 h-8 text-[#203D32]" />
              </div>
              <h3 className="text-2xl font-serif font-bold text-[#183127]">
                Appointment Request Received
              </h3>
              <p className="text-xs sm:text-sm text-[#4E5A51] mt-1 max-w-md mx-auto">
                Thank you, {appointment.fullName}. Our clinic team has received your request and will contact you shortly to confirm your scheduled slot.
              </p>
            </div>

            {/* Request Summary Card */}
            <div className="p-5 rounded-2xl bg-[#F4EFE6] border border-[#E2D6C4] text-xs sm:text-sm space-y-3 mb-6">
              <div className="flex items-center justify-between pb-2 border-b border-[#DFD3C0] font-semibold text-[#183127]">
                <span>Reference ID</span>
                <span className="font-mono text-[#8C6D3B]">{appointment.id}</span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-[#38453D]">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#8C6D3B] shrink-0" />
                  <span>{appointment.preferredDate}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#8C6D3B] shrink-0" />
                  <span>{appointment.preferredTime}</span>
                </div>
              </div>

              <div className="pt-1 flex items-start gap-2 text-[#38453D]">
                <span className="font-medium text-[#183127]">Treatment:</span>
                <span>{appointment.treatment}</span>
              </div>

              <div className="flex items-start gap-2 text-[#38453D]">
                <MapPin className="w-4 h-4 text-[#8C6D3B] shrink-0 mt-0.5" />
                <span className="text-xs">{config.clinicAddress}, {config.city}</span>
              </div>
            </div>

            {/* Instant WhatsApp Confirmation Button */}
            {whatsappUrl && (
              <div className="p-4 rounded-2xl bg-[#EFE8DD] border border-[#DDD0BC] mb-6 text-left">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-[#183127] text-[#FAF7F2] shrink-0 mt-0.5">
                    <MessageSquare className="w-4 h-4 text-[#D4AF37]" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xs font-bold text-[#183127] uppercase tracking-wider">
                      Faster Confirmation via WhatsApp
                    </h4>
                    <p className="text-xs text-[#4C5950] mt-0.5 mb-3 leading-relaxed">
                      Send your appointment summary directly to our front desk on WhatsApp for immediate priority scheduling.
                    </p>
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-[#FAF7F2] bg-[#183127] hover:bg-[#203D32] rounded-xl transition-all shadow-xs border border-[#2D5444]"
                    >
                      <span>Chat With Dr XYZ</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#D4AF37]" />
                    </a>
                  </div>
                </div>
              </div>
            )}

            {/* Automated Email Notice */}
            <div className="flex items-center gap-2 text-[11px] text-[#637267] mb-6">
              <Mail className="w-3.5 h-3.5 text-[#8C6D3B]" />
              <span>A confirmation summary has been drafted to <strong>{appointment.email}</strong>.</span>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="w-full py-3 text-xs font-semibold text-[#183127] bg-[#EFE8DD] hover:bg-[#E4DACB] border border-[#D5C9B5] rounded-xl transition-colors cursor-pointer"
            >
              Close Window
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

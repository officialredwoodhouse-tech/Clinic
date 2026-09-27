import React from 'react';
import { CheckCircle2, MessageSquare, Mail, Calendar, Clock, MapPin, X, ArrowRight } from 'lucide-react';
import { AppointmentRequest, ClinicConfig } from '../types/clinic';

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
  if (!appointment) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/60 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-white/80 p-6 sm:p-8 overflow-hidden my-auto max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Success Icon & Heading */}
        <div className="text-center mb-6">
          <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-3 border border-emerald-100">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h3 className="text-2xl font-serif font-bold text-slate-900">
            Appointment Request Received
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-md mx-auto">
            Thank you, {appointment.fullName}. Our clinic team has received your request and will contact you shortly to confirm your scheduled slot.
          </p>
        </div>

        {/* Request Summary Card */}
        <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs sm:text-sm space-y-3 mb-6">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200/60 font-semibold text-slate-900">
            <span>Reference ID</span>
            <span className="font-mono text-teal-800">{appointment.id}</span>
          </div>

          <div className="grid grid-cols-2 gap-3 text-slate-600">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-teal-600 shrink-0" />
              <span>{appointment.preferredDate}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-teal-600 shrink-0" />
              <span>{appointment.preferredTime}</span>
            </div>
          </div>

          <div className="pt-1 flex items-start gap-2 text-slate-600">
            <span className="font-medium text-slate-800">Treatment:</span>
            <span>{appointment.treatment}</span>
          </div>

          <div className="flex items-start gap-2 text-slate-600">
            <MapPin className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
            <span className="text-xs">{config.clinicAddress}, {config.city}</span>
          </div>
        </div>

        {/* Instant WhatsApp Confirmation Button */}
        {whatsappUrl && (
          <div className="p-4 rounded-2xl bg-teal-50/70 border border-teal-200/80 mb-6 text-left">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-xl bg-teal-600 text-white shrink-0 mt-0.5">
                <MessageSquare className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <h4 className="text-xs font-bold text-teal-950 uppercase tracking-wider">
                  Faster Confirmation via WhatsApp
                </h4>
                <p className="text-xs text-teal-900/80 mt-0.5 mb-3 leading-relaxed">
                  Send your appointment summary directly to our front desk on WhatsApp for immediate priority scheduling.
                </p>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-teal-800 hover:bg-teal-900 rounded-xl transition-all shadow-xs"
                >
                  <span>Chat With Dr Aryan</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Automated Email Notice */}
        <div className="flex items-center gap-2 text-[11px] text-slate-500 mb-6">
          <Mail className="w-3.5 h-3.5 text-slate-400" />
          <span>A confirmation summary has been drafted to <strong>{appointment.email}</strong>.</span>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="w-full py-3 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
        >
          Close Window
        </button>
      </div>
    </div>
  );
};

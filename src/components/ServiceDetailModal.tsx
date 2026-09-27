import React from 'react';
import { X, CheckCircle2, ArrowRight, MessageSquare, Calendar, Clock, Sparkles } from 'lucide-react';
import { ServiceDetail, ClinicConfig } from '../types/clinic';

interface ServiceDetailModalProps {
  service: ServiceDetail | null;
  onClose: () => void;
  onBookService: (serviceName: string) => void;
  config: ClinicConfig;
}

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({
  service,
  onClose,
  onBookService,
  config,
}) => {
  if (!service) return null;

  const whatsappMessage = `Hi Dr Aryan, I would like to inquire about ${service.title} at your Chandigarh clinic.`;
  const whatsappUrl = `https://wa.me/${config.whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-slate-950/60 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-white/80 overflow-hidden my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar with Service Title & Close button */}
        <div className="sticky top-0 z-20 px-6 sm:px-8 py-5 bg-white/90 backdrop-blur-xl border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-md bg-teal-50 text-teal-800 border border-teal-100">
              {service.number}
            </span>
            <div>
              <span className="text-[11px] uppercase tracking-wider text-teal-700 font-semibold block">
                {service.category}
              </span>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">
                {service.title}
              </h3>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-8">
          {/* Hero Banner with Medical Image */}
          <div className="relative rounded-2xl overflow-hidden aspect-[16/8] sm:aspect-[16/7] bg-slate-100 shadow-inner border border-slate-200/60">
            <img
              src={service.image}
              alt={service.title}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <p className="text-xs sm:text-sm font-medium text-teal-200">
                Clinical Excellence · Patient-Centered Dentistry
              </p>
              <p className="text-base sm:text-lg font-serif font-semibold">
                {service.shortDesc}
              </p>
            </div>
          </div>

          {/* Detailed Description */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-2">
              Clinical Overview
            </h4>
            <p className="text-base text-slate-700 leading-relaxed">
              {service.detailedDescription}
            </p>
          </div>

          {/* Key Clinical Benefits */}
          <div>
            <h4 className="text-base font-serif font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-teal-600" />
              <span>Key Patient Benefits</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {service.benefits.map((benefit, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-50/80 border border-slate-100 text-sm text-slate-700"
                >
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                  <span className="leading-snug">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Potential Treatment Options */}
          <div>
            <h4 className="text-base font-serif font-bold text-slate-900 mb-4">
              Treatment Options Available at Dr Aryan
            </h4>
            <div className="space-y-3">
              {service.treatmentOptions.map((opt, idx) => (
                <div
                  key={idx}
                  className="p-4 sm:p-5 rounded-2xl border border-slate-200/80 bg-white shadow-xs hover:border-teal-300 transition-colors"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1.5">
                    <h5 className="font-semibold text-slate-900 text-sm sm:text-base">
                      {opt.name}
                    </h5>
                    <span className="text-[11px] font-medium text-teal-800 bg-teal-50 px-2.5 py-0.5 rounded-full self-start sm:self-auto border border-teal-100">
                      Ideal for: {opt.idealFor}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {opt.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Procedure Timeline & Care Guidance */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="p-4.5 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
                <Clock className="w-3.5 h-3.5 text-teal-600" />
                <span>Procedure Workflow</span>
              </div>
              <ul className="space-y-1.5 text-xs sm:text-sm text-slate-700">
                {service.procedureSteps.map((step, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="font-mono text-teal-700 font-bold text-xs mt-0.5">
                      {idx + 1}.
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-3 pt-3 border-t border-slate-200/60 text-xs text-slate-500">
                <strong>Typical Duration:</strong> {service.durationExpectation}
              </div>
            </div>

            <div className="p-4.5 rounded-2xl bg-teal-50/40 border border-teal-100">
              <div className="text-xs font-semibold uppercase tracking-wider text-teal-800 mb-2">
                Post-Care Guidance
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-3">
                {service.careAdvice}
              </p>
              <p className="text-[11px] text-slate-500 italic">
                * Personalized instructions are provided based on clinical examination.
              </p>
            </div>
          </div>
        </div>

        {/* Modal Sticky Footer CTAs */}
        <div className="sticky bottom-0 z-20 px-6 sm:px-8 py-4 bg-white/95 backdrop-blur-xl border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-slate-500 hidden sm:block">
            Have questions about {service.title}? We're here to assist.
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-teal-800 bg-teal-50 hover:bg-teal-100 border border-teal-200 rounded-xl transition-colors whitespace-nowrap"
            >
              <MessageSquare className="w-3.5 h-3.5 text-teal-600" />
              <span>WhatsApp Inquiries</span>
            </a>

            <button
              type="button"
              onClick={() => {
                onClose();
                onBookService(service.title);
              }}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-slate-900 hover:bg-teal-900 rounded-xl shadow-sm transition-colors whitespace-nowrap cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5 text-teal-300" />
              <span>Book a Consultation for {service.title}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

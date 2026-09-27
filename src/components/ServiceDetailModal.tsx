import React from 'react';
import { X, CheckCircle2, ArrowRight, MessageSquare, Calendar, Clock, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ServiceDetail, ClinicConfig } from '../types/clinic';
import { smoothEasing } from './SectionTransition';

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
  const whatsappMessage = service
    ? `Hi Dr Aryan, I would like to inquire about ${service.title} at your Chandigarh clinic.`
    : '';
  const whatsappUrl = `https://wa.me/${config.whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <AnimatePresence>
      {service && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-[#12231B]/70 backdrop-blur-md overflow-y-auto"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.35, ease: smoothEasing }}
            className="relative w-full max-w-4xl bg-[#FAF7F2] rounded-3xl shadow-2xl border border-[#E3D9C9] overflow-hidden my-auto max-h-[92vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header Bar with Service Title & Close button */}
            <div className="sticky top-0 z-20 px-6 sm:px-8 py-5 bg-[#FAF7F2]/95 backdrop-blur-xl border-b border-[#E3D9C9] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-md bg-[#EFE8DD] text-[#183127] border border-[#DDD0BC]">
                  {service.number}
                </span>
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-[#8C6D3B] font-semibold block">
                    {service.category}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#183127]">
                    {service.title}
                  </h3>
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="p-2 text-[#6D7B70] hover:text-[#183127] hover:bg-[#EFE8DD] rounded-full transition-colors cursor-pointer"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <div className="overflow-y-auto p-6 sm:p-8 space-y-8">
              {/* Hero Banner with Medical Image */}
              <div className="relative rounded-2xl overflow-hidden aspect-[16/8] sm:aspect-[16/7] bg-[#EFE8DD] shadow-inner border border-[#E3D8C8]">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#14261E]/80 via-[#14261E]/25 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <p className="text-xs sm:text-sm font-medium text-[#E8DCC4]">
                    Clinical Excellence · Patient-Centered Dentistry
                  </p>
                  <p className="text-base sm:text-lg font-serif font-semibold">
                    {service.shortDesc}
                  </p>
                </div>
              </div>

              {/* Detailed Description */}
              <div>
                <h4 className="text-sm font-semibold uppercase tracking-wider text-[#8C6D3B] mb-2">
                  Clinical Overview
                </h4>
                <p className="text-base text-[#47544B] leading-relaxed">
                  {service.detailedDescription}
                </p>
              </div>

              {/* Key Clinical Benefits */}
              <div>
                <h4 className="text-base font-serif font-bold text-[#183127] mb-4 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#8C6D3B]" />
                  <span>Key Patient Benefits</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {service.benefits.map((benefit, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#F4EFE6] border border-[#E2D6C4] text-sm text-[#38453D]"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#203D32] shrink-0 mt-0.5" />
                      <span className="leading-snug">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Potential Treatment Options */}
              <div>
                <h4 className="text-base font-serif font-bold text-[#183127] mb-4">
                  Treatment Options Available at Dr Aryan
                </h4>
                <div className="space-y-3">
                  {service.treatmentOptions.map((opt, idx) => (
                    <div
                      key={idx}
                      className="p-4 sm:p-5 rounded-2xl border border-[#E0D4C2] bg-[#FAF7F2] shadow-xs hover:border-[#8C6D3B] transition-colors"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1.5">
                        <h5 className="font-serif font-bold text-[#183127] text-sm sm:text-base">
                          {opt.name}
                        </h5>
                        <span className="text-[11px] font-medium text-[#183127] bg-[#EFE8DD] px-2.5 py-0.5 rounded-full self-start sm:self-auto border border-[#DDD0BC]">
                          Ideal for: {opt.idealFor}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-[#4E5B52] leading-relaxed">
                        {opt.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Procedure Timeline & Care Guidance */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="p-4.5 rounded-2xl bg-[#F4EFE6] border border-[#E3D7C5]">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#637267] mb-2">
                    <Clock className="w-3.5 h-3.5 text-[#203D32]" />
                    <span>Procedure Workflow</span>
                  </div>
                  <ul className="space-y-1.5 text-xs sm:text-sm text-[#3A473E]">
                    {service.procedureSteps.map((step, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="font-mono text-[#8C6D3B] font-bold text-xs mt-0.5">
                          {idx + 1}.
                        </span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-3 pt-3 border-t border-[#DFD3C0] text-xs text-[#637267]">
                    <strong>Typical Duration:</strong> {service.durationExpectation}
                  </div>
                </div>

                <div className="p-4.5 rounded-2xl bg-[#EFE8DD]/70 border border-[#DED1BE]">
                  <div className="text-xs font-semibold uppercase tracking-wider text-[#8C6D3B] mb-2">
                    Post-Care Guidance
                  </div>
                  <p className="text-xs sm:text-sm text-[#465349] leading-relaxed mb-3">
                    {service.careAdvice}
                  </p>
                  <p className="text-[11px] text-[#717E75] italic">
                    * Personalized instructions are provided based on clinical examination.
                  </p>
                </div>
              </div>
            </div>

            {/* Modal Sticky Footer CTAs */}
            <div className="sticky bottom-0 z-20 px-6 sm:px-8 py-4 bg-[#FAF7F2]/95 backdrop-blur-xl border-t border-[#E3D9C9] flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="text-xs text-[#5D6B62] hidden sm:block">
                Have questions about {service.title}? We're here to assist.
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-[#183127] bg-[#EFE8DC] hover:bg-[#E5DACB] border border-[#D6CABA] rounded-xl transition-colors whitespace-nowrap"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-[#203D32]" />
                  <span>WhatsApp Inquiries</span>
                </a>

                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onBookService(service.title);
                  }}
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-semibold text-[#FAF7F2] bg-[#183127] hover:bg-[#203D32] rounded-xl shadow-md transition-colors whitespace-nowrap cursor-pointer border border-[#2B5443]"
                >
                  <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Book a Consultation for {service.title}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

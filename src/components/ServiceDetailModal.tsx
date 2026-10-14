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
    ? `Hi Dr XYZ, I would like to inquire about ${service.title} at your Chandigarh clinic.`
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
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-[#16324F]/70 backdrop-blur-md overflow-y-auto"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.35, ease: smoothEasing }}
            className="relative w-full max-w-4xl bg-[#FFFFFF] rounded-3xl shadow-2xl border border-[#D5E7ED] overflow-hidden my-auto max-h-[92vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header Bar with Service Title & Close button */}
            <div className="sticky top-0 z-20 px-6 sm:px-8 py-5 bg-[#FFFFFF]/95 backdrop-blur-xl border-b border-[#D5E7ED] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-md bg-[#EAF4F7] text-[#16324F] border border-[#D5E7ED]">
                  {service.number}
                </span>
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-[#2A9D8F] font-semibold block">
                    {service.category}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#16324F]">
                    {service.title}
                  </h3>
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="p-2 text-[#667085] hover:text-[#16324F] hover:bg-[#EAF4F7] rounded-full transition-colors cursor-pointer"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <div className="overflow-y-auto p-6 sm:p-8 space-y-8">
              {/* Hero Banner with Medical Image */}
              <div className="relative rounded-2xl overflow-hidden aspect-[16/8] sm:aspect-[16/7] bg-[#EAF4F7] shadow-inner border border-[#D5E7ED]">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#16324F]/80 via-[#16324F]/25 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <p className="text-xs sm:text-sm font-medium text-[#EAF4F7]">
                    Clinical Excellence · Patient-Centered Dentistry
                  </p>
                  <p className="text-base sm:text-lg font-serif font-semibold">
                    {service.shortDesc}
                  </p>
                </div>
              </div>

              {/* Detailed Description */}
              <div>
                <h4 className="text-sm font-semibold uppercase tracking-wider text-[#2A9D8F] mb-2">
                  Clinical Overview
                </h4>
                <p className="text-base text-[#667085] leading-relaxed">
                  {service.detailedDescription}
                </p>
              </div>

              {/* Key Clinical Benefits */}
              <div>
                <h4 className="text-base font-serif font-bold text-[#16324F] mb-4 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#2A9D8F]" />
                  <span>Key Patient Benefits</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {service.benefits.map((benefit, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#FFFFFF] border border-[#D5E7ED] text-sm text-[#16324F]"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#16324F] shrink-0 mt-0.5" />
                      <span className="leading-snug">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Potential Treatment Options */}
              <div>
                <h4 className="text-base font-serif font-bold text-[#16324F] mb-4">
                  Treatment Options Available at Dr XYZ Dental
                </h4>
                <div className="space-y-3">
                  {service.treatmentOptions.map((opt, idx) => (
                    <div
                      key={idx}
                      className="p-4 sm:p-5 rounded-2xl border border-[#D5E7ED] bg-[#FFFFFF] shadow-xs hover:border-[#2A9D8F] transition-colors"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1.5">
                        <h5 className="font-serif font-bold text-[#16324F] text-sm sm:text-base">
                          {opt.name}
                        </h5>
                        <span className="text-[11px] font-medium text-[#16324F] bg-[#EAF4F7] px-2.5 py-0.5 rounded-full self-start sm:self-auto border border-[#D5E7ED]">
                          Ideal for: {opt.idealFor}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-[#667085] leading-relaxed">
                        {opt.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Procedure Timeline & Care Guidance */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="p-4.5 rounded-2xl bg-[#FFFFFF] border border-[#D5E7ED]">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#667085] mb-2">
                    <Clock className="w-3.5 h-3.5 text-[#16324F]" />
                    <span>Procedure Workflow</span>
                  </div>
                  <ul className="space-y-1.5 text-xs sm:text-sm text-[#16324F]">
                    {service.procedureSteps.map((step, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="font-mono text-[#2A9D8F] font-bold text-xs mt-0.5">
                          {idx + 1}.
                        </span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-3 pt-3 border-t border-[#D5E7ED] text-xs text-[#667085]">
                    <strong>Typical Duration:</strong> {service.durationExpectation}
                  </div>
                </div>

                <div className="p-4.5 rounded-2xl bg-[#EAF4F7]/70 border border-[#D5E7ED]">
                  <div className="text-xs font-semibold uppercase tracking-wider text-[#2A9D8F] mb-2">
                    Post-Care Guidance
                  </div>
                  <p className="text-xs sm:text-sm text-[#667085] leading-relaxed mb-3">
                    {service.careAdvice}
                  </p>
                  <p className="text-[11px] text-[#667085] italic">
                    * Personalized instructions are provided based on clinical examination.
                  </p>
                </div>
              </div>
            </div>

            {/* Modal Sticky Footer CTAs */}
            <div className="sticky bottom-0 z-20 px-6 sm:px-8 py-4 bg-[#FFFFFF]/95 backdrop-blur-xl border-t border-[#D5E7ED] flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="text-xs text-[#667085] hidden sm:block">
                Have questions about {service.title}? We're here to assist.
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-[#16324F] bg-[#EAF4F7] hover:bg-[#D5E7ED] border border-[#D5E7ED] rounded-xl transition-colors whitespace-nowrap"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-[#16324F]" />
                  <span>WhatsApp Inquiries</span>
                </a>

                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onBookService(service.title);
                  }}
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-semibold text-[#FFFFFF] bg-[#16324F] hover:bg-[#16324F] rounded-xl shadow-md transition-colors whitespace-nowrap cursor-pointer border border-[#2A9D8F]"
                >
                  <Calendar className="w-3.5 h-3.5 text-[#2A9D8F]" />
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

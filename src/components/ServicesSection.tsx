import React, { useState } from 'react';
import {
  Shield,
  Zap,
  Activity,
  Sparkles,
  Smile,
  Sun,
  GitCommit,
  Layers,
  HeartPulse,
  Syringe,
  Baby,
  RefreshCw,
  ArrowRight
} from 'lucide-react';
import { motion } from 'framer-motion';
import { CLINIC_SERVICES } from '../data/clinicData';
import { ServiceDetail, ClinicConfig } from '../types/clinic';
import { ServiceDetailModal } from './ServiceDetailModal';
import { smoothEasing, staggerContainerVariants, childFadeUpVariants, scrollViewport } from './SectionTransition';

const SERVICE_ICONS: Record<string, React.ElementType> = {
  'general-dentistry': Shield,
  'root-canal-treatment': Zap,
  'dental-implants': Activity,
  'cosmetic-dentistry': Sparkles,
  'smile-makeovers': Smile,
  'teeth-whitening': Sun,
  'braces-and-orthodontics': GitCommit,
  'crowns-and-bridges': Layers,
  'gum-treatment': HeartPulse,
  'wisdom-tooth-removal': Syringe,
  'pediatric-dentistry': Baby,
  'dentures-and-tooth-replacement': RefreshCw,
};

// Structured category mappings matching the Aetheric Dental aesthetic
const SERVICE_CATEGORY_TAGS: Record<string, string> = {
  'general-dentistry': 'PREVENTIVE CARE',
  'cosmetic-dentistry': 'AESTHETIC REFINEMENT',
  'dental-implants': 'STRUCTURAL RESTORATION',
  'root-canal-treatment': 'ENDODONTIC THERAPY',
  'smile-makeovers': 'FULL ARCH AESTHETICS',
  'teeth-whitening': 'ENAMEL BRIGHTENING',
  'braces-and-orthodontics': 'ORTHODONTIC ALIGNMENT',
  'crowns-and-bridges': 'BIOMIMETIC PROSTHETICS',
  'gum-treatment': 'PERIODONTAL HEALTH',
  'wisdom-tooth-removal': 'SURGICAL PRECISION',
  'pediatric-dentistry': 'EARLY ORAL WELLNESS',
  'dentures-and-tooth-replacement': 'FUNCTIONAL REHABILITATION',
};

interface ServicesSectionProps {
  config: ClinicConfig;
  onSelectServiceForBooking: (serviceName: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ config, onSelectServiceForBooking }) => {
  const [selectedService, setSelectedService] = useState<ServiceDetail | null>(null);

  return (
    <section id="services" className="py-24 relative overflow-hidden bg-[#FFFFFF] border-b border-[#D5E7ED]">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] rounded-full ambient-glow-ice -z-10" />
      <div className="absolute bottom-10 left-10 w-[450px] h-[450px] rounded-full ambient-glow-teal -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={scrollViewport}
          transition={{ duration: 0.55, ease: smoothEasing }}
          className="max-w-3xl mb-16 text-left transform-gpu"
        >
          <span className="font-mono text-xs font-bold text-[#2A9D8F] tracking-widest uppercase block mb-2">
            [ CLINICAL SERVICES ]
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[#16324F] tracking-tight leading-tight">
            Our Expertise
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#667085] leading-relaxed">
            From routine preventive maintenance to advanced restorative solutions, each therapy is delivered with mastery of form, light, and clinical precision.
          </p>
        </motion.div>

        {/* 12 Services Structured Architectural Grid */}
        <motion.div
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={scrollViewport}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {CLINIC_SERVICES.map((service, idx) => {
            const Icon = SERVICE_ICONS[service.id] || Sparkles;
            const catTag = SERVICE_CATEGORY_TAGS[service.id] || 'CLINICAL CARE';
            const numIndex = `(${String(idx + 1).padStart(2, '0')})`;

            return (
              <motion.div
                key={service.id}
                variants={childFadeUpVariants}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="group relative flex flex-col justify-between p-8 rounded-2xl bg-[#FFFFFF] hover:bg-[#EAF4F7]/40 transition-all duration-200 border border-[#D5E7ED] hover:border-[#2A9D8F] shadow-xs hover:shadow-lg hover:shadow-[#16324F]/5"
              >
                <div>
                  {/* Top Bar with Number & Category Tag */}
                  <div className="flex items-center justify-between mb-5 pb-4 border-b border-[#EAF4F7]">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-[#2A9D8F]">
                        {numIndex}
                      </span>
                      <span className="font-mono text-[10px] font-bold text-[#667085] tracking-widest uppercase">
                        {catTag}
                      </span>
                    </div>
                    <div className="w-9 h-9 rounded-lg bg-[#EAF4F7] text-[#16324F] flex items-center justify-center border border-[#CEE3E9] group-hover:bg-[#2A9D8F] group-hover:text-[#FFFFFF] transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <h3 className="text-xl font-serif font-bold text-[#16324F] mb-2.5 group-hover:text-[#2A9D8F] transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#667085] leading-relaxed mb-6">
                    {service.shortDesc}
                  </p>
                </div>

                {/* Card Action Link */}
                <div className="pt-4 border-t border-[#EAF4F7] flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setSelectedService(service)}
                    className="inline-flex items-center gap-1.5 text-xs font-mono font-bold tracking-wider uppercase text-[#16324F] group-hover:text-[#2A9D8F] transition-colors cursor-pointer"
                  >
                    <span>Explore Service</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform text-[#2A9D8F]" />
                  </button>
                  <span className="font-mono text-[10px] text-[#667085]">
                    {service.durationExpectation}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Dynamic Service Detail Modal */}
      <ServiceDetailModal
        service={selectedService}
        onClose={() => setSelectedService(null)}
        onBookService={(name) => {
          setSelectedService(null);
          onSelectServiceForBooking(name);
        }}
        config={config}
      />
    </section>
  );
};

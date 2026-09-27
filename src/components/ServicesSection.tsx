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
import { smoothEasing, staggerContainerVariants, childFadeUpVariants } from './SectionTransition';

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

interface ServicesSectionProps {
  config: ClinicConfig;
  onSelectServiceForBooking: (serviceName: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ config, onSelectServiceForBooking }) => {
  const [selectedService, setSelectedService] = useState<ServiceDetail | null>(null);

  return (
    <motion.section
      id="services"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.8, ease: smoothEasing }}
      className="py-24 relative overflow-hidden bg-[#EFE9DF]/50"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-[#203D32]/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-10 w-[450px] h-[450px] bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: smoothEasing }}
          className="max-w-3xl mb-16 text-left"
        >
          <span className="text-xs font-semibold uppercase tracking-widest text-[#8C6D3B] block mb-3">
            Clinical Services
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#183127] tracking-tight leading-tight">
            Complete Dental Care. <br className="hidden sm:inline" />
            <span className="italic font-normal text-[#2A5243]">One Destination.</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#47544B] leading-relaxed">
            From routine preventive check-ups to comprehensive aesthetic and restorative therapies, every treatment is delivered with modern precision and genuine comfort.
          </p>
        </motion.div>

        {/* 12 Services Staggered Grid */}
        <motion.div
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.08 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {CLINIC_SERVICES.map((service) => {
            const Icon = SERVICE_ICONS[service.id] || Sparkles;
            return (
              <motion.div
                key={service.id}
                variants={childFadeUpVariants}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
                className="group relative flex flex-col justify-between p-7 rounded-3xl glass-panel hover:bg-[#FAF7F2] transition-colors duration-300 shadow-sm hover:shadow-xl hover:shadow-[#183127]/10 border border-[#E3D8C8] hover:border-[#C4B49F]"
              >
                <div>
                  {/* Top Bar with Number & Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-xs font-mono font-bold text-[#8C7E6A] group-hover:text-[#183127] transition-colors">
                      {service.number}
                    </span>
                    <div className="w-11 h-11 rounded-2xl bg-[#EFE8DC] text-[#183127] flex items-center justify-center border border-[#DDD0BC] group-hover:scale-105 group-hover:bg-[#183127] group-hover:text-[#F6F3EE] transition-all duration-200">
                      <Icon className="w-5 h-5 transition-colors" />
                    </div>
                  </div>

                  <h3 className="text-xl font-serif font-bold text-[#183127] mb-2.5 group-hover:text-[#284D3F] transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-sm text-[#4C5950] leading-relaxed mb-6">
                    {service.shortDesc}
                  </p>
                </div>

                {/* Card Action Button */}
                <div className="pt-4 border-t border-[#E3D9C9] flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setSelectedService(service)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#183127] group-hover:text-[#284D3F] transition-colors cursor-pointer"
                  >
                    <span>Explore {service.title}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform text-[#8C6D3B]" />
                  </button>
                  <span className="text-[11px] text-[#867B6B] font-medium">
                    {service.category.split('&')[0]}
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
    </motion.section>
  );
};

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
import { CLINIC_SERVICES } from '../data/clinicData';
import { ServiceDetail, ClinicConfig } from '../types/clinic';
import { ServiceDetailModal } from './ServiceDetailModal';

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
    <section id="services" className="py-24 relative overflow-hidden bg-slate-50/50">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-cyan-100/20 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 text-left">
          <span className="text-xs font-semibold uppercase tracking-widest text-teal-700 block mb-3">
            Clinical Services
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-slate-900 tracking-tight leading-tight">
            Complete Dental Care. <br className="hidden sm:inline" />
            <span className="italic font-normal text-teal-900">One Destination.</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            From routine preventive check-ups to comprehensive aesthetic and restorative therapies, every treatment is delivered with modern precision and genuine comfort.
          </p>
        </div>

        {/* 12 Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CLINIC_SERVICES.map((service) => {
            const Icon = SERVICE_ICONS[service.id] || Sparkles;
            return (
              <div
                key={service.id}
                className="group relative flex flex-col justify-between p-7 rounded-3xl glass-panel hover:bg-white/90 transition-all duration-300 hover:shadow-xl hover:shadow-teal-900/5 hover:-translate-y-1.5 border border-white/80 hover:border-teal-200"
              >
                <div>
                  {/* Top Bar with Number & Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-xs font-mono font-bold text-slate-400 group-hover:text-teal-700 transition-colors">
                      {service.number}
                    </span>
                    <div className="w-11 h-11 rounded-2xl bg-teal-50/80 text-teal-800 flex items-center justify-center border border-teal-100/80 group-hover:scale-105 group-hover:bg-teal-100 transition-all">
                      <Icon className="w-5 h-5 text-teal-700" />
                    </div>
                  </div>

                  <h3 className="text-xl font-serif font-bold text-slate-900 mb-2.5 group-hover:text-teal-950 transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-sm text-slate-600 leading-relaxed mb-6">
                    {service.shortDesc}
                  </p>
                </div>

                {/* Card Action Button */}
                <div className="pt-4 border-t border-slate-100/80 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setSelectedService(service)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-800 group-hover:text-teal-950 transition-colors cursor-pointer"
                  >
                    <span>Explore {service.title}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <span className="text-[11px] text-slate-400 font-medium">
                    {service.category.split('&')[0]}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
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

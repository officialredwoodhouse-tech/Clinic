import React, { useState } from 'react';
import { ShieldCheck, HeartHandshake, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ClinicConfig } from '../types/clinic';
import { smoothEasing, scrollViewport } from './SectionTransition';
import { doctorXyzImg } from '../assets/images';

interface AboutSectionProps {
  config: ClinicConfig;
  onOpenBooking: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ config, onOpenBooking }) => {
  const [showFullBio, setShowFullBio] = useState(false);

  return (
    <section id="about" className="py-24 relative overflow-hidden bg-[#EAF4F7] border-b border-[#D5E7ED]">
      {/* Background ambient accents */}
      <div className="absolute top-1/2 -left-48 w-96 h-96 rounded-full ambient-glow-navy -z-10" />
      <div className="absolute bottom-10 right-10 w-80 h-80 rounded-full ambient-glow-teal -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Structured Tag */}
        <div className="mb-12 text-left">
          <span className="font-mono text-xs font-bold text-[#2A9D8F] tracking-widest uppercase">
            [ CLINIC PHILOSOPHY ]
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[#16324F] tracking-tight mt-2">
            Welcome to {config.clinicName}
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Doctor Portrait & Structured Credentials */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={scrollViewport}
            transition={{ duration: 0.6, ease: smoothEasing }}
            className="lg:col-span-5 transform-gpu"
          >
            <div className="rounded-2xl overflow-hidden border border-[#D5E7ED] bg-[#FFFFFF] shadow-xl">
              <div className="relative aspect-[4/5] overflow-hidden">
                <img
                  src={doctorXyzImg}
                  alt={`${config.doctorName} - Dentist in Chandigarh`}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transform hover:scale-102 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#16324F]/70 via-transparent to-transparent pointer-events-none" />

                {/* Verified Practice Badge */}
                <div className="absolute top-4 right-4 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#FFFFFF]/95 border border-[#D5E7ED] text-xs font-semibold text-[#16324F] shadow-xs">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#2A9D8F]" />
                  <span>Verified Practitioner</span>
                </div>

                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h3 className="text-xl font-serif font-bold text-[#FFFFFF]">{config.doctorName}</h3>
                  <p className="text-xs text-[#EAF4F7] font-mono">Dentist & Dental Surgeon · Chandigarh</p>
                </div>
              </div>

              {/* Structured Metadata Row */}
              <div className="p-5 bg-[#FFFFFF] border-t border-[#D5E7ED] grid grid-cols-2 gap-4 text-xs font-mono">
                <div>
                  <span className="text-[#667085] block uppercase text-[10px]">Location</span>
                  <span className="font-semibold text-[#16324F]">{config.city}, {config.state}</span>
                </div>
                <div>
                  <span className="text-[#667085] block uppercase text-[10px]">Consultation</span>
                  <span className="font-semibold text-[#16324F]">Prior Appointment</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Editorial Philosophy & Practice Principles */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={scrollViewport}
            transition={{ duration: 0.6, delay: 0.1, ease: smoothEasing }}
            className="lg:col-span-7 flex flex-col items-start text-left transform-gpu"
          >
            {/* Primary Large Editorial Lead */}
            <p className="text-xl sm:text-2xl font-serif text-[#16324F] leading-relaxed mb-6">
              "We blend state-of-the-art technology with a human touch, creating a serene environment where your oral health is our priority."
            </p>

            <div className="space-y-4 text-base sm:text-lg text-[#667085] leading-relaxed mb-8">
              <p>
                At {config.clinicName}, we believe dental care should be more than a treatment. It should be an experience built around trust, clarity and uncompromising comfort.
              </p>
              <p>
                Our approach combines modern dental techniques with personalized attention, helping patients understand their options and make confident decisions about their oral health.
              </p>
              <p>
                From routine preventive check-ups to comprehensive aesthetic and restorative treatments, every visit is designed around one goal — helping you achieve a healthy, confident smile.
              </p>
            </div>

            {/* Expandable Philosophy Bio */}
            <AnimatePresence>
              {showFullBio && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.35, ease: smoothEasing }}
                  className="mb-8 p-6 rounded-2xl bg-[#FFFFFF] border border-[#D5E7ED] text-sm text-[#667085] space-y-3 overflow-hidden w-full shadow-xs"
                >
                  <div className="flex items-center gap-2 font-mono font-semibold text-[#16324F] uppercase text-xs">
                    <HeartHandshake className="w-4 h-4 text-[#2A9D8F]" />
                    <span>[ PRACTICE COMMITMENT ]</span>
                  </div>
                  <p className="leading-relaxed">
                    We prioritize gentle communication, thorough diagnostics, and an unhurried chairside experience. Every procedure is explained in plain terms with digital imagery so you always remain in full control of your oral healthcare journey.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={onOpenBooking}
                className="inline-flex items-center gap-2 px-7 py-3.5 text-xs font-bold uppercase tracking-wider text-[#FFFFFF] bg-[#2A9D8F] hover:bg-[#238579] rounded-xl shadow-md shadow-[#2A9D8F]/25 transition-colors cursor-pointer border border-[#238579]"
              >
                <span>Schedule Consultation</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#FFFFFF]" />
              </button>

              <button
                type="button"
                onClick={() => setShowFullBio(!showFullBio)}
                className="inline-flex items-center gap-2 px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-[#16324F] bg-[#FFFFFF] hover:bg-[#EAF4F7] border border-[#CEE3E9] rounded-xl transition-colors cursor-pointer font-mono"
              >
                <span>{showFullBio ? 'Close Details' : 'Meet Dr XYZ / Learn More'}</span>
                <ArrowRight className={`w-3.5 h-3.5 text-[#2A9D8F] transition-transform ${showFullBio ? 'rotate-90' : ''}`} />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

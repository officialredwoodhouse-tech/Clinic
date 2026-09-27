import React, { useState } from 'react';
import { UserCheck, MapPin, ArrowRight, ShieldCheck, HeartHandshake } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ClinicConfig } from '../types/clinic';
import { smoothEasing } from './SectionTransition';
import { doctorXyzImg } from '../assets/images';

interface AboutSectionProps {
  config: ClinicConfig;
  onOpenBooking: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ config, onOpenBooking }) => {
  const [showFullBio, setShowFullBio] = useState(false);

  return (
    <motion.section
      id="about"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.8, ease: smoothEasing }}
      className="py-20 relative overflow-hidden"
    >
      {/* Background ambient accents */}
      <div className="absolute top-1/2 -left-48 w-96 h-96 bg-[#203D32]/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Doctor Portrait & Glass Profile Card */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, delay: 0.15, ease: smoothEasing }}
            className="lg:col-span-5 relative order-2 lg:order-1"
          >
            <div className="relative mx-auto max-w-md rounded-3xl overflow-hidden shadow-2xl shadow-[#183127]/15 border border-[#E3D9C9] bg-[#EFE8DD] aspect-[3/4]">
              <img
                src={doctorXyzImg}
                alt="Dr XYZ - Dentist and Dental Surgeon in Chandigarh"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#14261E]/60 via-[#14261E]/10 to-transparent pointer-events-none" />

              {/* Verified badge */}
              <div className="absolute top-4 right-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF7F2]/90 backdrop-blur-md text-[11px] font-semibold text-[#183127] shadow-sm border border-[#E3D7C5]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#8C6D3B]" />
                <span>Verified Practice</span>
              </div>
            </div>

            {/* Glass Profile Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3, ease: smoothEasing }}
              className="relative -mt-14 sm:-mt-16 mx-4 sm:mx-6 p-6 rounded-3xl glass-panel shadow-xl shadow-[#183127]/10 border border-[#E3D9C9] z-10"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-serif font-bold text-[#183127] tracking-tight">
                    {config.doctorName}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#8C6D3B] font-semibold">
                    Dentist / Dental Surgeon
                  </p>
                  <div className="mt-1 flex items-center gap-1 text-xs text-[#5E6D62]">
                    <MapPin className="w-3.5 h-3.5 text-[#8C6D3B]" />
                    <span>{config.city}, {config.state}</span>
                  </div>
                </div>

                <div className="w-12 h-12 rounded-2xl bg-[#EFE8DC] flex items-center justify-center text-[#183127] border border-[#DDD1BE]">
                  <UserCheck className="w-6 h-6" />
                </div>
              </div>

              {/* Credential Slots */}
              <div className="mt-4 pt-4 border-t border-[#DFD5C4] text-xs space-y-2">
                <div className="flex items-start justify-between text-[#4D5A50]">
                  <span className="text-[#849187]">Clinical Focus</span>
                  <span className="font-medium text-[#183127] text-right">Aesthetic & Restorative Care</span>
                </div>
                <div className="flex items-start justify-between text-[#4D5A50]">
                  <span className="text-[#849187]">Consultation</span>
                  <span className="font-medium text-[#183127] text-right">By Prior Appointment</span>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* About Copy */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, delay: 0.2, ease: smoothEasing }}
            className="lg:col-span-7 flex flex-col items-start text-left order-1 lg:order-2"
          >
            <span className="text-xs font-semibold uppercase tracking-widest text-[#8C6D3B] mb-3">
              About Dr XYZ
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#183127] tracking-tight mb-6 text-balance">
              Dentistry That Puts You First.
            </h2>

            <div className="space-y-4 text-base sm:text-lg text-[#47544B] leading-relaxed">
              <p>
                At Dr XYZ Dental & Aesthetic Care, we believe dental care should be more than a treatment. It should be an experience built around trust, clarity and comfort.
              </p>
              <p>
                Our approach combines modern dental techniques with personalized attention, helping patients understand their options and make confident decisions about their oral health.
              </p>
              <p>
                From routine preventive care to advanced restorative and cosmetic treatments, every visit is designed around one goal — helping you achieve a healthy, confident smile.
              </p>
            </div>

            {/* Expandable Philosophy Bio with AnimatePresence */}
            <AnimatePresence>
              {showFullBio && (
                <motion.div
                  initial={{ opacity: 0, height: 0, y: -8 }}
                  animate={{ opacity: 1, height: 'auto', y: 0 }}
                  exit={{ opacity: 0, height: 0, y: -8 }}
                  transition={{ duration: 0.4, ease: smoothEasing }}
                  className="mt-6 p-6 rounded-3xl bg-[#EFE8DD]/80 border border-[#DCD0BC] text-sm text-[#2E3C33] space-y-3 overflow-hidden"
                >
                  <div className="flex items-center gap-2 font-semibold text-[#183127]">
                    <HeartHandshake className="w-4 h-4 text-[#8C6D3B]" />
                    <span>Our Practice Commitment</span>
                  </div>
                  <p className="leading-relaxed">
                    We prioritize gentle communication, thorough diagnostics, and an unhurried chairside experience. Every procedure is explained in plain terms with digital imagery so you always remain in full control of your oral healthcare journey.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => setShowFullBio(!showFullBio)}
                className="inline-flex items-center gap-2 px-6 py-3 text-xs font-semibold text-[#183127] bg-[#EFE8DC] hover:bg-[#E4DACB] border border-[#D5C9B5] rounded-2xl shadow-xs transition-colors cursor-pointer"
              >
                <span>{showFullBio ? 'Close Details' : 'Meet Dr XYZ'}</span>
                <ArrowRight className={`w-3.5 h-3.5 text-[#8C6D3B] transition-transform ${showFullBio ? 'rotate-90' : ''}`} />
              </button>

              <button
                type="button"
                onClick={onOpenBooking}
                className="inline-flex items-center gap-2 px-6 py-3 text-xs font-semibold text-[#FAF7F2] bg-[#183127] hover:bg-[#203D32] rounded-2xl shadow-md shadow-[#183127]/20 transition-colors cursor-pointer border border-[#2B5443]"
              >
                <span>Schedule Consultation</span>
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

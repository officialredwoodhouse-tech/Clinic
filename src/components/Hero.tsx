import React, { useRef } from 'react';
import { Calendar, MessageSquare, ArrowRight, Sparkles, MapPin, Bot } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ClinicConfig } from '../types/clinic';
import { heroClinicImg } from '../assets/images';

interface HeroProps {
  config: ClinicConfig;
  onOpenBooking: () => void;
  onOpenAiAgent?: () => void;
}

const smoothEasing: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const Hero: React.FC<HeroProps> = ({ config, onOpenBooking, onOpenAiAgent }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [0, 28]);

  const whatsappUrl = `https://wa.me/${config.whatsappNumber}?text=${encodeURIComponent(
    'Hi Dr XYZ, I would like to consult with you regarding dental care at your Chandigarh clinic.'
  )}`;

  return (
    <section ref={sectionRef} id="hero" className="relative pt-28 pb-16 lg:pt-36 lg:pb-20 overflow-hidden border-b border-[#D5E7ED] bg-[#FFFFFF]">
      {/* Zero-blur GPU radial ambient lighting */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 w-[850px] h-[480px] rounded-full ambient-glow-ice -z-10" />
      <div className="absolute top-44 right-6 w-[450px] h-[400px] rounded-full ambient-glow-teal -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Structured Hero Header Block */}
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-12 sm:mb-16">
          {/* Subtitle / Philosophy Tagline */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: smoothEasing }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#EAF4F7] border border-[#CEE3E9] text-xs font-mono tracking-wider text-[#16324F] uppercase mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-[#2A9D8F]" />
            <span>A modern approach to oral health, designed for your comfort</span>
          </motion.div>

          {/* Primary Editorial Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.1, ease: smoothEasing }}
            className="text-4xl sm:text-6xl lg:text-7xl font-serif font-bold text-[#16324F] tracking-tight leading-[1.08] mb-6 text-balance"
          >
            A Higher Standard <br className="hidden sm:inline" />
            <span className="italic font-normal text-[#2A9D8F]">of Dental Care.</span>
          </motion.h1>

          {/* Secondary Subtitle with Studio Details */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: smoothEasing }}
            className="text-base sm:text-lg text-[#667085] max-w-2xl leading-relaxed mb-8"
          >
            Welcome to <strong className="text-[#16324F] font-semibold">{config.clinicName}</strong> in Chandigarh. Led by{' '}
            <strong className="text-[#16324F] font-semibold">{config.doctorName}</strong>, combining clinical precision, modern radiography, and patient-first serenity.
          </motion.p>

          {/* Structured Call to Action Bar */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: smoothEasing }}
            className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto"
          >
            <button
              type="button"
              onClick={onOpenBooking}
              className="inline-flex items-center justify-center gap-2.5 px-8 py-4 text-xs font-bold uppercase tracking-wider text-[#FFFFFF] bg-[#2A9D8F] hover:bg-[#238579] rounded-xl shadow-md shadow-[#2A9D8F]/25 transition-all active:scale-98 cursor-pointer border border-[#238579] group"
            >
              <Calendar className="w-4 h-4 text-[#FFFFFF] group-hover:scale-110 transition-transform" />
              <span>Book an Appointment</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#FFFFFF] group-hover:translate-x-1 transition-transform" />
            </button>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 px-7 py-4 text-xs font-bold uppercase tracking-wider text-[#16324F] bg-[#EAF4F7] hover:bg-[#D9EDF2] border border-[#CEE3E9] rounded-xl transition-all active:scale-98"
            >
              <MessageSquare className="w-4 h-4 text-[#2A9D8F]" />
              <span>WhatsApp Direct</span>
            </a>

            {onOpenAiAgent && (
              <button
                type="button"
                onClick={onOpenAiAgent}
                className="inline-flex items-center justify-center gap-2 px-6 py-4 text-xs font-semibold text-[#2A9D8F] hover:text-[#16324F] bg-[#FFFFFF] hover:bg-[#EAF4F7] border border-[#CEE3E9] rounded-xl transition-colors cursor-pointer shadow-xs"
              >
                <Bot className="w-4 h-4 text-[#2A9D8F]" />
                <span>24/7 AI Agent</span>
              </button>
            )}
          </motion.div>
        </div>

        {/* Structured Architectural Showcase Frame */}
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.99 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.75, delay: 0.25, ease: smoothEasing }}
          className="relative rounded-3xl overflow-hidden border border-[#D5E7ED] bg-[#EAF4F7] shadow-xl shadow-[#16324F]/8"
        >
          {/* Top Frame Status Header */}
          <div className="flex flex-wrap items-center justify-between px-6 py-3.5 bg-[#FFFFFF] border-b border-[#D5E7ED] text-xs font-mono text-[#667085]">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#2A9D8F] animate-pulse" />
              <span className="font-semibold text-[#16324F] uppercase tracking-wider">
                [ CLINIC ACTIVE · SECTOR 9-C CHANDIGARH ]
              </span>
            </div>
            <div className="hidden sm:flex items-center gap-4 text-[11px] text-[#667085]">
              <span>HOURS: {config.openingHours.weekdays}</span>
              <span>·</span>
              <span className="text-[#16324F] font-semibold">TEL: {config.clinicPhone}</span>
            </div>
          </div>

          {/* Main Visual Image */}
          <div className="relative aspect-[16/9] sm:aspect-[21/9] lg:aspect-[24/10] overflow-hidden">
            <motion.div style={{ y: imageY }} className="w-full h-full transform-gpu">
              <img
                src={heroClinicImg}
                alt="Dr XYZ Dental Clinic Chandigarh Interior"
                decoding="async"
                fetchPriority="high"
                className="w-full h-full object-cover transform hover:scale-102 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#16324F]/40 via-transparent to-transparent pointer-events-none" />

            {/* Inset Badge */}
            <div className="absolute bottom-5 left-5 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#FFFFFF]/95 backdrop-blur-md border border-[#D5E7ED] text-xs font-semibold text-[#16324F] shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#2A9D8F]" />
              <span>Architectural Dental Suite · Sector 9-C, Madhya Marg</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

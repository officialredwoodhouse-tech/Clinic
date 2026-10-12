import React, { useRef } from 'react';
import { Calendar, MessageSquare, ArrowRight, Sparkles, MapPin } from 'lucide-react';
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

  const imageY = useTransform(scrollYProgress, [0, 1], [0, 32]);
  const cardY = useTransform(scrollYProgress, [0, 1], [0, -20]);

  const whatsappUrl = `https://wa.me/${config.whatsappNumber}?text=${encodeURIComponent(
    'Hi Dr XYZ, I would like to consult with you regarding dental care at your Chandigarh clinic.'
  )}`;

  return (
    <section ref={sectionRef} id="hero" className="relative pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden">
      {/* Zero-blur GPU radial ambient lighting */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 w-[780px] h-[460px] rounded-full ambient-glow-warm -z-10" />
      <div className="absolute top-40 right-6 w-[440px] h-[400px] rounded-full ambient-glow-pine -z-10" />
      <div className="absolute top-72 -left-20 w-[400px] h-[360px] rounded-full ambient-glow-gold -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Typography & CTAs with staggered fade-in */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: smoothEasing }}
            className="lg:col-span-7 flex flex-col items-start text-left"
          >
            {/* Trust Indicator / Location Badge */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: smoothEasing }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#EFE9DF]/80 backdrop-blur-md border border-[#DDD3C2] shadow-xs mb-6 text-xs font-medium text-[#2E3B33]"
            >
              <span className="w-2 h-2 rounded-full bg-[#203D32] animate-pulse" />
              <span>Personalized Care</span>
              <span className="text-[#BDB19C]">·</span>
              <span>Modern Precision</span>
              <span className="text-[#BDB19C]">·</span>
              <span className="flex items-center gap-1 text-[#183127] font-semibold">
                <MapPin className="w-3.5 h-3.5 text-[#8C6D3B]" />
                Chandigarh
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.2, ease: smoothEasing }}
              className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#192B22] tracking-tight leading-[1.12] mb-6 text-balance"
            >
              Your Smile.{' '}
              <span className="block italic font-normal text-[#203D32]">
                Designed With Precision.
              </span>
            </motion.h1>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: smoothEasing }}
              className="text-base sm:text-lg text-[#46534A] max-w-xl leading-relaxed mb-8"
            >
              Advanced dental care in Chandigarh, combining clinical expertise, modern technology and a comfortable patient-first experience.
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4, ease: smoothEasing }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto"
            >
              <button
                type="button"
                onClick={onOpenBooking}
                className="inline-flex items-center justify-center gap-2.5 px-7 py-4 text-sm font-semibold text-[#FAF7F2] bg-[#183127] hover:bg-[#203D32] rounded-2xl shadow-lg shadow-[#183127]/25 hover:shadow-[#183127]/35 transition-all duration-200 active:scale-98 cursor-pointer group border border-[#2B5443]"
              >
                <Calendar className="w-4 h-4 text-[#D4AF37] group-hover:scale-110 transition-transform" />
                <span>Book an Appointment</span>
                <ArrowRight className="w-4 h-4 ml-1 opacity-80 group-hover:translate-x-1 transition-transform" />
              </button>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-4 text-sm font-semibold text-[#183127] bg-[#EFE8DC] hover:bg-[#E5DCCF] border border-[#D5C9B6] rounded-2xl shadow-xs transition-all duration-200 active:scale-98"
              >
                <MessageSquare className="w-4 h-4 text-[#203D32]" />
                <span>Chat on WhatsApp</span>
              </a>
            </motion.div>

            {/* Doctor Note Preview */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5, ease: smoothEasing }}
              className="mt-10 pt-6 border-t border-[#DFD5C4] flex items-center gap-4 text-xs text-[#5E6D62]"
            >
              <div className="flex -space-x-1.5 overflow-hidden">
                <span className="inline-block h-8 w-8 rounded-full ring-2 ring-[#EDE4D5] bg-[#203D32] text-[#F3EFE7] font-serif font-bold flex items-center justify-center text-[10px]">
                  XYZ
                </span>
              </div>
              <p>
                Led by <strong className="text-[#192B22] font-semibold">{config.doctorName}</strong> · Sector 9-C, Madhya Marg
              </p>
            </motion.div>
          </motion.div>

          {/* Right Column: Visual Anchor & Floating Glass Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.25, ease: smoothEasing }}
            className="lg:col-span-5 relative"
          >
            {/* Visual Container */}
            <motion.div
              style={{ y: imageY }}
              className="relative mx-auto max-w-md lg:max-w-none rounded-3xl overflow-hidden shadow-2xl shadow-[#192B22]/15 border border-[#EDE4D5] aspect-[4/3] lg:aspect-[16/14] transform-gpu"
            >
              <img
                src={heroClinicImg}
                alt="Dr XYZ Modern Dental Clinic Suite Chandigarh"
                decoding="async"
                fetchPriority="high"
                className="w-full h-full object-cover transform hover:scale-102 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#12231B]/50 via-transparent to-transparent pointer-events-none" />

              {/* Status pill inside image */}
              <div className="absolute top-4 left-4 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF7F2]/95 border border-[#E5DAC8] text-xs font-semibold text-[#183127] shadow-xs">
                <span className="w-2 h-2 rounded-full bg-[#203D32]" />
                <span>Accepting Appointments</span>
              </div>
            </motion.div>

            {/* Large Floating Glass Card */}
            <motion.div
              style={{ y: cardY }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.35, ease: smoothEasing }}
              className="relative -mt-10 sm:-mt-12 lg:absolute lg:-bottom-8 lg:-left-12 lg:mt-0 z-20 max-w-sm sm:max-w-md p-6 rounded-3xl glass-panel shadow-xl shadow-[#192B22]/10 border border-[#EDE2D1] transform-gpu"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-2xl bg-[#EFE8DB] text-[#203D32] shrink-0 border border-[#DBCFB9]">
                  <Sparkles className="w-5 h-5 text-[#8C6D3B]" />
                </div>
                <div>
                  <h2 className="text-base font-semibold text-[#183127]">
                    Your First Step Starts Here
                  </h2>
                  <p className="mt-1 text-xs sm:text-sm text-[#4E5B52] leading-relaxed">
                    Tell us what you need. Our team will help you find the right treatment with transparent care.
                  </p>
                  <div className="mt-3.5 flex flex-wrap items-center gap-3">
                    <button
                      type="button"
                      onClick={onOpenBooking}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#183127] hover:text-[#284D3F] transition-colors cursor-pointer group"
                    >
                      <span>Book Appointment</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform text-[#8C6D3B]" />
                    </button>
                    <span className="text-[#C4B7A2]">·</span>
                    {onOpenAiAgent ? (
                      <button
                        type="button"
                        onClick={onOpenAiAgent}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-[#8C6D3B] hover:text-[#183127] transition-colors cursor-pointer"
                      >
                        <span>Ask 24/7 AI Agent</span>
                      </button>
                    ) : (
                      <span className="text-xs text-[#6B786E]">Prompt Response</span>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

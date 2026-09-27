import React from 'react';
import { Calendar, MessageSquare, ArrowRight, ShieldCheck, Sparkles, MapPin } from 'lucide-react';
import { ClinicConfig } from '../types/clinic';

interface HeroProps {
  config: ClinicConfig;
  onOpenBooking: () => void;
}

export const Hero: React.FC<HeroProps> = ({ config, onOpenBooking }) => {
  const whatsappUrl = `https://wa.me/${config.whatsappNumber}?text=${encodeURIComponent(
    'Hi Dr Aryan, I would like to consult with you regarding dental care at your Chandigarh clinic.'
  )}`;

  return (
    <section id="hero" className="relative pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden">
      {/* Ambient background light gradients */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-gradient-to-tr from-teal-200/35 via-cyan-100/30 to-sky-200/20 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-48 right-10 w-[400px] h-[350px] bg-emerald-100/25 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Typography & CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Trust Indicator / Location Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/70 backdrop-blur-md border border-slate-200/70 shadow-xs mb-6 text-xs font-medium text-slate-700">
              <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
              <span>Personalized Care</span>
              <span className="text-slate-300">·</span>
              <span>Modern Dentistry</span>
              <span className="text-slate-300">·</span>
              <span className="flex items-center gap-1 text-teal-800 font-semibold">
                <MapPin className="w-3 h-3 text-teal-600" />
                Chandigarh
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-slate-900 tracking-tight leading-[1.12] mb-6 text-balance">
              Your Smile.{' '}
              <span className="block italic font-normal text-teal-900">
                Designed With Precision.
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg text-slate-600 max-w-xl leading-relaxed mb-8">
              Advanced dental care in Chandigarh, combining clinical expertise, modern technology and a comfortable patient-first experience.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
              <button
                type="button"
                onClick={onOpenBooking}
                className="inline-flex items-center justify-center gap-2.5 px-7 py-4 text-sm font-semibold text-white bg-slate-900 hover:bg-teal-900 rounded-2xl shadow-lg shadow-slate-900/10 hover:shadow-teal-900/20 transition-all duration-200 active:scale-98 cursor-pointer group"
              >
                <Calendar className="w-4 h-4 text-teal-300 group-hover:scale-110 transition-transform" />
                <span>Book an Appointment</span>
                <ArrowRight className="w-4 h-4 ml-1 opacity-70 group-hover:translate-x-1 transition-transform" />
              </button>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-4 text-sm font-semibold text-teal-900 bg-white/80 hover:bg-white border border-teal-200/80 rounded-2xl shadow-xs transition-all duration-200 hover:border-teal-300 active:scale-98"
              >
                <MessageSquare className="w-4 h-4 text-teal-600" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>

            {/* Doctor Note Preview */}
            <div className="mt-10 pt-6 border-t border-slate-200/60 flex items-center gap-4 text-xs text-slate-500">
              <div className="flex -space-x-1.5 overflow-hidden">
                <span className="inline-block h-7 w-7 rounded-full ring-2 ring-white bg-teal-100 text-teal-800 font-bold flex items-center justify-center text-[10px]">
                  DA
                </span>
              </div>
              <p>
                Led by <strong className="text-slate-700 font-semibold">{config.doctorName}</strong> · Sector 9-C, Madhya Marg
              </p>
            </div>
          </div>

          {/* Right Column: Visual Anchor & Floating Glass Card */}
          <div className="lg:col-span-5 relative">
            {/* Visual Container */}
            <div className="relative mx-auto max-w-md lg:max-w-none rounded-3xl overflow-hidden shadow-2xl shadow-slate-900/10 border border-white/80 aspect-[4/3] lg:aspect-[16/14]">
              <img
                src="/src/assets/images/hero_luxury_dental_clinic_1790483856220.jpg"
                alt="Dr Aryan Modern Dental Clinic Suite Chandigarh"
                className="w-full h-full object-cover transform hover:scale-102 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent pointer-events-none" />

              {/* Status pill inside image */}
              <div className="absolute top-4 left-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/85 backdrop-blur-md border border-white/80 text-xs font-semibold text-slate-800 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>Accepting Appointments</span>
              </div>
            </div>

            {/* Large Floating Glass Card as requested */}
            <div className="relative -mt-10 sm:-mt-12 lg:absolute lg:-bottom-8 lg:-left-12 lg:mt-0 z-20 max-w-sm sm:max-w-md p-6 rounded-3xl glass-panel shadow-xl shadow-teal-900/5 border border-white/90">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-2xl bg-teal-50 text-teal-700 shrink-0 border border-teal-100">
                  <Sparkles className="w-5 h-5 text-teal-600" />
                </div>
                <div>
                  <h2 className="text-base font-semibold text-slate-900">
                    Your First Step Starts Here
                  </h2>
                  <p className="mt-1 text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Tell us what you need. Our team will help you find the right treatment with transparent care.
                  </p>
                  <div className="mt-3.5 flex items-center gap-3">
                    <button
                      type="button"
                      onClick={onOpenBooking}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-800 hover:text-teal-950 transition-colors cursor-pointer group"
                    >
                      <span>Book Appointment</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </button>
                    <span className="text-slate-300">·</span>
                    <span className="text-xs text-slate-500">Quick Response</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

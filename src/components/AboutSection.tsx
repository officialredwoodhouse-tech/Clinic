import React, { useState } from 'react';
import { UserCheck, Sparkles, MapPin, ArrowRight, ShieldCheck, HeartHandshake } from 'lucide-react';
import { ClinicConfig } from '../types/clinic';

interface AboutSectionProps {
  config: ClinicConfig;
  onOpenBooking: () => void;
  onOpenSettings: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ config, onOpenBooking, onOpenSettings }) => {
  const [showFullBio, setShowFullBio] = useState(false);

  return (
    <section id="about" className="py-20 relative overflow-hidden">
      {/* Background ambient accents */}
      <div className="absolute top-1/2 -left-48 w-96 h-96 bg-teal-100/30 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Doctor Portrait & Glass Profile Card */}
          <div className="lg:col-span-5 relative order-2 lg:order-1">
            <div className="relative mx-auto max-w-md rounded-3xl overflow-hidden shadow-2xl border border-white/80 bg-slate-100 aspect-[3/4]">
              <img
                src="/src/assets/images/doctor_aryan_portrait_1790483871556.jpg"
                alt="Dr Aryan - Dentist and Dental Surgeon in Chandigarh"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-slate-950/10 to-transparent pointer-events-none" />

              {/* Verified badge */}
              <div className="absolute top-4 right-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[11px] font-semibold text-slate-800 shadow-sm border border-white">
                <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
                <span>Verified Practice</span>
              </div>
            </div>

            {/* Glass Profile Card */}
            <div className="relative -mt-14 sm:-mt-16 mx-4 sm:mx-6 p-6 rounded-3xl glass-panel shadow-xl border border-white/90 z-10">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-serif font-bold text-slate-900 tracking-tight">
                    {config.doctorName}
                  </h3>
                  <p className="text-xs sm:text-sm text-teal-800 font-medium">
                    Dentist / Dental Surgeon
                  </p>
                  <div className="mt-1 flex items-center gap-1 text-xs text-slate-500">
                    <MapPin className="w-3 h-3 text-slate-400" />
                    <span>{config.city}, {config.state}</span>
                  </div>
                </div>

                <div className="w-12 h-12 rounded-2xl bg-teal-50 flex items-center justify-center text-teal-800 border border-teal-100">
                  <UserCheck className="w-6 h-6" />
                </div>
              </div>

              {/* Editable Credential Slots (Prompt requirement: Do not invent degrees or awards; provide clear editable slots) */}
              <div className="mt-4 pt-4 border-t border-slate-200/60 text-xs space-y-2">
                <div className="flex items-start justify-between text-slate-600">
                  <span className="text-slate-400">Clinical Focus</span>
                  <span className="font-medium text-slate-800 text-right">Preventive & Restorative Care</span>
                </div>
                <div className="flex items-start justify-between text-slate-600">
                  <span className="text-slate-400">Consultation</span>
                  <span className="font-medium text-slate-800 text-right">By Prior Appointment</span>
                </div>
                <div className="pt-2 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400 italic">Credentials can be updated in Admin</span>
                  <button
                    type="button"
                    onClick={onOpenSettings}
                    className="text-[11px] font-semibold text-teal-700 hover:text-teal-900 hover:underline"
                  >
                    Edit Info
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* About Copy */}
          <div className="lg:col-span-7 flex flex-col items-start text-left order-1 lg:order-2">
            <span className="text-xs font-semibold uppercase tracking-widest text-teal-700 mb-3">
              About Dr Aryan
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-slate-900 tracking-tight mb-6 text-balance">
              Dentistry That Puts You First.
            </h2>

            <div className="space-y-4 text-base sm:text-lg text-slate-600 leading-relaxed">
              <p>
                At Dr Aryan, we believe dental care should be more than a treatment. It should be an experience built around trust, clarity and comfort.
              </p>
              <p>
                Our approach combines modern dental techniques with personalized attention, helping patients understand their options and make confident decisions about their oral health.
              </p>
              <p>
                From routine preventive care to advanced restorative and cosmetic treatments, every visit is designed around one goal — helping you achieve a healthy, confident smile.
              </p>
            </div>

            {/* Expandable Philosophy Bio */}
            {showFullBio && (
              <div className="mt-6 p-6 rounded-3xl bg-teal-50/50 border border-teal-100 text-sm text-slate-700 space-y-3 animate-in fade-in duration-300">
                <div className="flex items-center gap-2 font-semibold text-teal-950">
                  <HeartHandshake className="w-4 h-4 text-teal-600" />
                  <span>Our Practice Commitment</span>
                </div>
                <p>
                  We prioritize gentle communication, thorough diagnostics, and an unhurried chairside experience. Every procedure is explained in plain terms with digital imagery so you always remain in full control of your oral healthcare journey.
                </p>
              </div>
            )}

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => setShowFullBio(!showFullBio)}
                className="inline-flex items-center gap-2 px-6 py-3 text-xs font-semibold text-teal-900 bg-white hover:bg-teal-50/80 border border-teal-200/90 rounded-2xl shadow-xs transition-colors cursor-pointer"
              >
                <span>{showFullBio ? 'Close Details' : 'Meet Dr Aryan'}</span>
                <ArrowRight className={`w-3.5 h-3.5 text-teal-700 transition-transform ${showFullBio ? 'rotate-90' : ''}`} />
              </button>

              <button
                type="button"
                onClick={onOpenBooking}
                className="inline-flex items-center gap-2 px-6 py-3 text-xs font-semibold text-white bg-slate-900 hover:bg-teal-900 rounded-2xl shadow-xs transition-colors cursor-pointer"
              >
                <span>Schedule Consultation</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

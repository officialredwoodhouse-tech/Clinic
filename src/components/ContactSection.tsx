import React from 'react';
import {
  MapPin,
  Phone,
  MessageSquare,
  Mail,
  Clock,
  Navigation,
  Calendar,
  ExternalLink
} from 'lucide-react';
import { ClinicConfig } from '../types/clinic';

interface ContactSectionProps {
  config: ClinicConfig;
  onOpenBooking: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ config, onOpenBooking }) => {
  const whatsappUrl = `https://wa.me/${config.whatsappNumber}?text=${encodeURIComponent(
    'Hi Dr Aryan, I would like to inquire about your clinic location and timings in Chandigarh.'
  )}`;

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 text-left">
          <span className="text-xs font-semibold uppercase tracking-widest text-teal-700 block mb-2">
            Location & Access
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-slate-900 tracking-tight">
            Let's Talk About Your Smile.
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600">
            Conveniently situated in Sector 9-C, Madhya Marg, Chandigarh with private parking and elevator access.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Contact Cards */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
            {/* Address Card */}
            <div className="p-6 rounded-3xl glass-panel border border-white/80">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-2xl bg-teal-50 text-teal-800 shrink-0 border border-teal-100">
                  <MapPin className="w-5 h-5 text-teal-700" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-1">
                    Clinic Location
                  </h3>
                  <p className="text-sm text-slate-700 font-medium leading-relaxed">
                    {config.clinicAddress}
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {config.city}, {config.state}
                  </p>
                </div>
              </div>
            </div>

            {/* Direct Connect: Phone, WhatsApp, Email */}
            <div className="p-6 rounded-3xl glass-panel border border-white/80 space-y-4">
              <div className="flex items-center gap-4">
                <div className="p-2.5 rounded-xl bg-teal-50 text-teal-800 shrink-0 border border-teal-100">
                  <Phone className="w-4 h-4 text-teal-700" />
                </div>
                <div className="flex-1">
                  <span className="text-xs text-slate-400 block">Phone Desk</span>
                  <a
                    href={`tel:${config.clinicPhone.replace(/\s+/g, '')}`}
                    className="text-sm font-semibold text-slate-800 hover:text-teal-700 transition-colors"
                  >
                    {config.clinicPhone}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="p-2.5 rounded-xl bg-teal-50 text-teal-800 shrink-0 border border-teal-100">
                  <MessageSquare className="w-4 h-4 text-teal-700" />
                </div>
                <div className="flex-1">
                  <span className="text-xs text-slate-400 block">WhatsApp Desk</span>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-semibold text-teal-800 hover:text-teal-950 transition-colors"
                  >
                    +{config.whatsappNumber}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="p-2.5 rounded-xl bg-teal-50 text-teal-800 shrink-0 border border-teal-100">
                  <Mail className="w-4 h-4 text-teal-700" />
                </div>
                <div className="flex-1">
                  <span className="text-xs text-slate-400 block">Email Inquiries</span>
                  <a
                    href={`mailto:${config.clinicEmail}`}
                    className="text-sm font-semibold text-slate-800 hover:text-teal-700 transition-colors"
                  >
                    {config.clinicEmail}
                  </a>
                </div>
              </div>
            </div>

            {/* Opening Hours */}
            <div className="p-6 rounded-3xl glass-panel border border-white/80">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-2xl bg-teal-50 text-teal-800 shrink-0 border border-teal-100">
                  <Clock className="w-5 h-5 text-teal-700" />
                </div>
                <div className="text-xs sm:text-sm text-slate-600 space-y-1 w-full">
                  <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-2">
                    Opening Hours
                  </h3>
                  <div className="flex justify-between pb-1 border-b border-slate-100">
                    <span>{config.openingHours.weekdays}</span>
                  </div>
                  <div className="flex justify-between pt-1">
                    <span className="text-teal-800 font-medium">{config.openingHours.sunday}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href={config.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 text-xs font-semibold text-slate-800 bg-white hover:bg-slate-100 border border-slate-200 rounded-xl transition-colors shadow-xs"
              >
                <Navigation className="w-4 h-4 text-teal-600" />
                <span>Get Directions</span>
              </a>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 text-xs font-semibold text-teal-900 bg-teal-50 hover:bg-teal-100 border border-teal-200 rounded-xl transition-colors shadow-xs"
              >
                <MessageSquare className="w-4 h-4 text-teal-600" />
                <span>WhatsApp Us</span>
              </a>

              <button
                type="button"
                onClick={onOpenBooking}
                className="inline-flex items-center gap-2 px-5 py-3 text-xs font-semibold text-white bg-slate-900 hover:bg-teal-900 rounded-xl transition-colors shadow-xs cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-teal-300" />
                <span>Book Appointment</span>
              </button>
            </div>
          </div>

          {/* Right Column: Google Maps Interactive Embed */}
          <div className="lg:col-span-7 rounded-3xl overflow-hidden glass-panel border border-white/90 shadow-xl min-h-[380px] lg:min-h-[500px] relative">
            <iframe
              src={config.googleMapsEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '400px' }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Dr Aryan Dental Clinic Chandigarh Map"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

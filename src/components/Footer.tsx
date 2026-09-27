import React from 'react';
import { Calendar, Phone, Mail, MessageSquare, MapPin } from 'lucide-react';
import { ClinicConfig } from '../types/clinic';

interface FooterProps {
  config: ClinicConfig;
  onOpenBooking: () => void;
  onOpenPrivacy: () => void;
  onOpenTerms: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  config,
  onOpenBooking,
  onOpenPrivacy,
  onOpenTerms,
}) => {
  const whatsappUrl = `https://wa.me/${config.whatsappNumber}?text=${encodeURIComponent(
    'Hi Dr Aryan, I would like to inquire about dental services.'
  )}`;

  return (
    <footer className="relative pt-16 pb-24 lg:pb-12 bg-white/70 backdrop-blur-xl border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-slate-200/60">
          {/* Brand Info */}
          <div className="lg:col-span-2 text-left">
            <span className="text-2xl font-serif font-bold tracking-tight text-slate-900 block">
              DR ARYAN
            </span>
            <span className="text-xs uppercase tracking-[0.2em] font-medium text-teal-800 block -mt-0.5 mb-4">
              Dental & Aesthetic Care
            </span>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-sm mb-6">
              Advanced dental care in Chandigarh, combining clinical expertise, modern technology and a comfortable patient-first experience.
            </p>

            <div className="text-xs text-slate-500 space-y-1.5">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                <span>{config.clinicAddress}, {config.city}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                <span>{config.clinicPhone}</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="text-left">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-900 mb-4">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-600">
              <li><a href="#hero" className="hover:text-teal-700 transition-colors">Home</a></li>
              <li><a href="#about" className="hover:text-teal-700 transition-colors">About Dr Aryan</a></li>
              <li><a href="#services" className="hover:text-teal-700 transition-colors">Services</a></li>
              <li><a href="#technology" className="hover:text-teal-700 transition-colors">Technology</a></li>
              <li><a href="#gallery" className="hover:text-teal-700 transition-colors">Smile Gallery</a></li>
              <li><a href="#faq" className="hover:text-teal-700 transition-colors">FAQ</a></li>
              <li><a href="#contact" className="hover:text-teal-700 transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Key Services */}
          <div className="text-left">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-900 mb-4">
              Key Services
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-600">
              <li><a href="#services" className="hover:text-teal-700 transition-colors">General Dentistry</a></li>
              <li><a href="#services" className="hover:text-teal-700 transition-colors">Dental Implants</a></li>
              <li><a href="#services" className="hover:text-teal-700 transition-colors">Root Canal Treatment</a></li>
              <li><a href="#services" className="hover:text-teal-700 transition-colors">Cosmetic Dentistry</a></li>
              <li><a href="#services" className="hover:text-teal-700 transition-colors">Orthodontics & Aligners</a></li>
              <li><a href="#services" className="hover:text-teal-700 transition-colors">Teeth Whitening</a></li>
              <li><a href="#services" className="hover:text-teal-700 transition-colors">Crowns & Bridges</a></li>
            </ul>
          </div>

          {/* Appointment Column */}
          <div className="text-left flex flex-col justify-between">
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-900 mb-3">
                Appointment Desk
              </h4>
              <p className="text-xs text-slate-600 mb-4">
                Ready to take the next step toward a healthy, confident smile?
              </p>
              <button
                type="button"
                onClick={onOpenBooking}
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 text-xs font-semibold text-white bg-slate-900 hover:bg-teal-900 rounded-xl transition-all shadow-sm cursor-pointer"
              >
                <Calendar className="w-3.5 h-3.5 text-teal-300" />
                <span>Book Appointment</span>
              </button>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl bg-teal-50 text-teal-800 hover:bg-teal-100 transition-colors"
                title="WhatsApp Us"
              >
                <MessageSquare className="w-4 h-4 text-teal-700" />
              </a>
              <a
                href={`mailto:${config.clinicEmail}`}
                className="p-2 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
                title="Email Us"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Legal */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © 2026 Dr Aryan Dental & Aesthetic Care. All Rights Reserved.
          </div>

          <div className="flex items-center gap-6">
            <button
              type="button"
              onClick={onOpenPrivacy}
              className="hover:text-teal-800 transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <span className="text-slate-300">·</span>
            <button
              type="button"
              onClick={onOpenTerms}
              className="hover:text-teal-800 transition-colors cursor-pointer"
            >
              Terms & Conditions
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

import React from 'react';
import { Calendar, Phone, MapPin, Mail, Clock } from 'lucide-react';
import { ClinicConfig } from '../types/clinic';
import { Logo } from './Logo';
import { smoothScrollTo } from './SectionTransition';
import { MarqueeBanner } from './MarqueeBanner';

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
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    smoothScrollTo(targetId, 76, 620);
  };

  return (
    <footer className="relative bg-[#16324F] text-[#EAF4F7] border-t border-[#16324F]">
      {/* Top Architectural Marquee Ticker */}
      <MarqueeBanner clinicName={config.clinicName.toUpperCase()} variant="dark" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-14 border-b border-[#2A9D8F]/20">
          {/* Brand Column (4 cols) */}
          <div className="lg:col-span-4 text-left">
            <div className="mb-5">
              <Logo size="lg" variant="dark" />
            </div>

            <p className="text-xs sm:text-sm text-[#EAF4F7]/80 leading-relaxed max-w-sm mb-6">
              A modern, architectural dental clinic combining clinical precision, digital radiography, and serene patient-first care in Chandigarh.
            </p>

            <button
              type="button"
              onClick={onOpenBooking}
              className="inline-flex items-center gap-2 px-6 py-3 text-xs font-bold uppercase tracking-wider text-[#FFFFFF] bg-[#2A9D8F] hover:bg-[#238579] rounded-xl transition-all shadow-md cursor-pointer border border-[#238579] font-mono"
            >
              <Calendar className="w-3.5 h-3.5 text-[#FFFFFF]" />
              <span>Book Appointment</span>
            </button>
          </div>

          {/* [ INFORMATION ] Column (3 cols) */}
          <div className="lg:col-span-3 text-left">
            <h4 className="font-mono text-xs font-bold text-[#2A9D8F] tracking-widest uppercase mb-4">
              [ INFORMATION ]
            </h4>
            <div className="space-y-3 text-xs text-[#EAF4F7]/80">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#2A9D8F] shrink-0 mt-0.5" />
                <span className="leading-snug">{config.clinicAddress}, {config.city}, {config.state}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#2A9D8F] shrink-0" />
                <a href={`tel:${config.clinicPhone.replace(/\s+/g, '')}`} className="font-semibold text-[#FFFFFF] hover:text-[#2A9D8F] transition-colors">
                  {config.clinicPhone}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#2A9D8F] shrink-0" />
                <a href={`mailto:${config.clinicEmail}`} className="text-[#FFFFFF] hover:text-[#2A9D8F] transition-colors">
                  {config.clinicEmail}
                </a>
              </div>
              <div className="flex items-start gap-2.5 pt-1">
                <Clock className="w-4 h-4 text-[#2A9D8F] shrink-0 mt-0.5" />
                <div>
                  <span className="block font-semibold text-[#FFFFFF]">{config.openingHours.weekdays}</span>
                  <span className="text-[#EAF4F7]/70">{config.openingHours.sunday}</span>
                </div>
              </div>
            </div>
          </div>

          {/* [ MENU ] Column (2 cols) */}
          <div className="lg:col-span-2 text-left">
            <h4 className="font-mono text-xs font-bold text-[#2A9D8F] tracking-widest uppercase mb-4">
              [ MENU ]
            </h4>
            <ul className="space-y-2 text-xs font-mono text-[#EAF4F7]/80">
              <li><a href="#hero" onClick={(e) => handleNavClick(e, '#hero')} className="hover:text-[#FFFFFF] transition-colors">Home</a></li>
              <li><a href="#about" onClick={(e) => handleNavClick(e, '#about')} className="hover:text-[#FFFFFF] transition-colors">About</a></li>
              <li><a href="#services" onClick={(e) => handleNavClick(e, '#services')} className="hover:text-[#FFFFFF] transition-colors">Services</a></li>
              <li><a href="#reviews" onClick={(e) => handleNavClick(e, '#reviews')} className="hover:text-[#FFFFFF] transition-colors">Reviews</a></li>
              <li><a href="#book" onClick={(e) => handleNavClick(e, '#book')} className="hover:text-[#FFFFFF] transition-colors">Book</a></li>
              <li><a href="#gallery" onClick={(e) => handleNavClick(e, '#gallery')} className="hover:text-[#FFFFFF] transition-colors">Gallery</a></li>
              <li><a href="#technology" onClick={(e) => handleNavClick(e, '#technology')} className="hover:text-[#FFFFFF] transition-colors">Technology</a></li>
              <li><a href="#contact" onClick={(e) => handleNavClick(e, '#contact')} className="hover:text-[#FFFFFF] transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* [ CLINICAL FOCUS & LEGAL ] Column (3 cols) */}
          <div className="lg:col-span-3 text-left">
            <h4 className="font-mono text-xs font-bold text-[#2A9D8F] tracking-widest uppercase mb-4">
              [ CLINICAL FOCUS ]
            </h4>
            <ul className="space-y-1.5 text-xs text-[#EAF4F7]/80 mb-6">
              <li>General Dentistry & Prevention</li>
              <li>Cosmetic Dental Enhancements</li>
              <li>Dental Implants & Restoration</li>
              <li>Root Canal Therapy</li>
              <li>Clear Aligners & Orthodontics</li>
              <li>Smile Makeover Aesthetics</li>
            </ul>

            <h4 className="font-mono text-xs font-bold text-[#2A9D8F] tracking-widest uppercase mb-2">
              [ LEGAL ]
            </h4>
            <div className="flex items-center gap-3 text-xs font-mono text-[#EAF4F7]/70">
              <button
                type="button"
                onClick={onOpenPrivacy}
                className="hover:text-[#FFFFFF] transition-colors cursor-pointer underline underline-offset-2"
              >
                Privacy Policy
              </button>
              <span>·</span>
              <button
                type="button"
                onClick={onOpenTerms}
                className="hover:text-[#FFFFFF] transition-colors cursor-pointer underline underline-offset-2"
              >
                Terms of Care
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Accreditation */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-[#EAF4F7]/70 gap-4">
          <p>
            © {new Date().getFullYear()} {config.clinicName.toUpperCase()}. ALL RIGHTS RESERVED.
          </p>
          <p className="text-[11px] text-[#EAF4F7]/60">
            PRACTICE OF {config.doctorName.toUpperCase()} · CHANDIGARH, INDIA
          </p>
        </div>
      </div>
    </footer>
  );
};

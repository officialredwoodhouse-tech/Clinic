import React from 'react';
import { Calendar, Phone, MapPin } from 'lucide-react';
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
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const targetEl = document.getElementById(targetId);
    if (targetEl) {
      const navHeight = 76;
      const elementPosition = targetEl.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navHeight;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <footer className="relative pt-16 pb-24 lg:pb-12 bg-[#EDE6DC] backdrop-blur-xl border-t border-[#DFD3C0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-[#DDD0BD]">
          {/* Brand Info */}
          <div className="lg:col-span-2 text-left">
            <span className="text-2xl font-serif font-bold tracking-tight text-[#183127] block">
              DR ARYAN
            </span>
            <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#8C6D3B] block -mt-0.5 mb-4">
              Dental & Aesthetic Care
            </span>

            <p className="text-xs sm:text-sm text-[#4E5A51] leading-relaxed max-w-sm mb-6">
              Advanced dental care in Chandigarh, combining clinical expertise, modern technology and a comfortable patient-first experience.
            </p>

            <div className="text-xs text-[#5D6B61] space-y-1.5">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#8C6D3B] shrink-0" />
                <span>{config.clinicAddress}, {config.city}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#8C6D3B] shrink-0" />
                <span>{config.clinicPhone}</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="text-left">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#183127] mb-4">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-[#4E5A51]">
              <li><a href="#hero" onClick={(e) => handleNavClick(e, '#hero')} className="hover:text-[#183127] transition-colors">Home</a></li>
              <li><a href="#about" onClick={(e) => handleNavClick(e, '#about')} className="hover:text-[#183127] transition-colors">About Dr Pallavi</a></li>
              <li><a href="#services" onClick={(e) => handleNavClick(e, '#services')} className="hover:text-[#183127] transition-colors">Services</a></li>
              <li><a href="#technology" onClick={(e) => handleNavClick(e, '#technology')} className="hover:text-[#183127] transition-colors">Technology</a></li>
              <li><a href="#gallery" onClick={(e) => handleNavClick(e, '#gallery')} className="hover:text-[#183127] transition-colors">Smile Gallery</a></li>
              <li><a href="#faq" onClick={(e) => handleNavClick(e, '#faq')} className="hover:text-[#183127] transition-colors">FAQ</a></li>
              <li><a href="#contact" onClick={(e) => handleNavClick(e, '#contact')} className="hover:text-[#183127] transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Key Services */}
          <div className="text-left">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#183127] mb-4">
              Key Services
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-[#4E5A51]">
              <li><a href="#services" onClick={(e) => handleNavClick(e, '#services')} className="hover:text-[#183127] transition-colors">General Dentistry</a></li>
              <li><a href="#services" onClick={(e) => handleNavClick(e, '#services')} className="hover:text-[#183127] transition-colors">Dental Implants</a></li>
              <li><a href="#services" onClick={(e) => handleNavClick(e, '#services')} className="hover:text-[#183127] transition-colors">Root Canal Treatment</a></li>
              <li><a href="#services" onClick={(e) => handleNavClick(e, '#services')} className="hover:text-[#183127] transition-colors">Cosmetic Dentistry</a></li>
              <li><a href="#services" onClick={(e) => handleNavClick(e, '#services')} className="hover:text-[#183127] transition-colors">Orthodontics & Aligners</a></li>
              <li><a href="#services" onClick={(e) => handleNavClick(e, '#services')} className="hover:text-[#183127] transition-colors">Teeth Whitening</a></li>
              <li><a href="#services" onClick={(e) => handleNavClick(e, '#services')} className="hover:text-[#183127] transition-colors">Crowns & Bridges</a></li>
            </ul>
          </div>

          {/* Appointment Column */}
          <div className="text-left flex flex-col justify-between">
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[#183127] mb-3">
                Appointment Desk
              </h4>
              <p className="text-xs text-[#4E5A51] mb-4">
                Ready to take the next step toward a healthy, confident smile?
              </p>
              <button
                type="button"
                onClick={onOpenBooking}
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 text-xs font-semibold text-[#FAF7F2] bg-[#183127] hover:bg-[#203D32] rounded-xl transition-all shadow-sm cursor-pointer border border-[#2D5444]"
              >
                <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Book Appointment</span>
              </button>
            </div>

            <div className="mt-6 pt-4 border-t border-[#DDD0BD]">
              <span className="text-[11px] text-[#718076] block">Direct Consultation Hours</span>
              <span className="text-xs font-medium text-[#183127]">{config.openingHours.weekdays}</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Compliance */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#627167] gap-4">
          <p>
            © {new Date().getFullYear()} {config.clinicName}. All rights reserved. Professional dental practice in Chandigarh.
          </p>

          <div className="flex items-center gap-6">
            <button
              type="button"
              onClick={onOpenPrivacy}
              className="hover:text-[#183127] transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <span className="text-[#C4B7A2]">·</span>
            <button
              type="button"
              onClick={onOpenTerms}
              className="hover:text-[#183127] transition-colors cursor-pointer"
            >
              Terms of Care
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

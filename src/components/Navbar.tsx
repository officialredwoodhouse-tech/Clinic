import React, { useState, useEffect } from 'react';
import { MessageSquare, Calendar, Phone, Menu, X, Settings } from 'lucide-react';
import { ClinicConfig } from '../types/clinic';

interface NavbarProps {
  config: ClinicConfig;
  onOpenBooking: (treatment?: string) => void;
  onOpenSettings: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ config, onOpenBooking, onOpenSettings }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#hero' },
    { label: 'About', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Technology', href: '#technology' },
    { label: 'Smile Gallery', href: '#gallery' },
    { label: 'Reviews', href: '#reviews' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Contact', href: '#contact' },
  ];

  const whatsappDirectUrl = `https://wa.me/${config.whatsappNumber}?text=${encodeURIComponent(
    'Hi Dr Aryan, I would like to know more about your dental services and book an appointment.'
  )}`;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/80 backdrop-blur-xl border-b border-slate-200/60 shadow-sm py-3'
            : 'bg-white/40 backdrop-blur-md border-b border-white/50 py-4.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Zone 1: Single text element wordmark */}
            <a
              href="#hero"
              className="group flex flex-col text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 rounded-sm"
            >
              <span className="text-xl sm:text-2xl font-serif font-bold tracking-tight text-slate-900 group-hover:text-teal-900 transition-colors">
                DR ARYAN
              </span>
              <span className="text-[10px] tracking-[0.2em] uppercase font-medium text-teal-800/80 -mt-0.5">
                Dental & Aesthetic Care
              </span>
            </a>

            {/* Zone 2: 4-8 clean text navigation links */}
            <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-600">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="hover:text-teal-700 transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-teal-600 hover:after:w-full after:transition-all after:duration-200"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Zone 3: 1-2 primary actions */}
            <div className="hidden sm:flex items-center gap-3">
              <a
                href={whatsappDirectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-teal-800 bg-teal-50/80 hover:bg-teal-100/90 border border-teal-200/70 rounded-full transition-all duration-150 shadow-xs whitespace-nowrap active:scale-95"
              >
                <MessageSquare className="w-3.5 h-3.5 text-teal-600" />
                <span>WhatsApp Us</span>
              </a>

              <button
                type="button"
                onClick={() => onOpenBooking()}
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-teal-900 rounded-full transition-all duration-150 shadow-sm whitespace-nowrap active:scale-95 cursor-pointer"
              >
                <Calendar className="w-3.5 h-3.5 text-teal-300" />
                <span>Book Appointment</span>
              </button>

              <button
                type="button"
                onClick={onOpenSettings}
                title="Clinic Desk & Settings"
                className="p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100/80 transition-colors"
              >
                <Settings className="w-4 h-4" />
              </button>
            </div>

            {/* Mobile Menu & Quick Settings Button */}
            <div className="flex sm:hidden items-center gap-2">
              <button
                type="button"
                onClick={() => onOpenBooking()}
                className="px-3 py-1.5 text-xs font-medium text-white bg-slate-900 rounded-full"
              >
                Book
              </button>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-slate-700 hover:text-teal-800 focus:outline-none"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden bg-slate-950/40 backdrop-blur-sm transition-opacity">
          <div className="fixed inset-y-0 right-0 w-full max-w-xs bg-white/95 backdrop-blur-2xl p-6 shadow-2xl flex flex-col justify-between border-l border-slate-100">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-slate-100">
                <span className="font-serif text-lg font-bold text-slate-900">DR ARYAN</span>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 text-slate-400 hover:text-slate-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="mt-6 flex flex-col gap-3">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-3 py-2 text-base font-medium text-slate-700 hover:text-teal-800 hover:bg-teal-50/50 rounded-lg transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100 flex flex-col gap-3">
              <a
                href={whatsappDirectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 text-sm font-semibold text-teal-800 bg-teal-50 rounded-xl border border-teal-200"
              >
                <MessageSquare className="w-4 h-4 text-teal-600" />
                Chat on WhatsApp
              </a>
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="w-full flex items-center justify-center gap-2 py-3 text-sm font-semibold text-white bg-slate-900 rounded-xl shadow-sm"
              >
                <Calendar className="w-4 h-4 text-teal-300" />
                Book an Appointment
              </button>
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenSettings();
                }}
                className="w-full flex items-center justify-center gap-2 py-2 text-xs font-medium text-slate-500 hover:text-slate-800"
              >
                <Settings className="w-3.5 h-3.5" />
                Clinic Admin & Configuration
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

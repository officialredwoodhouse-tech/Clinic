import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, Calendar, Menu, X } from 'lucide-react';
import { motion, AnimatePresence, useScroll } from 'framer-motion';
import { ClinicConfig } from '../types/clinic';
import { Logo } from './Logo';
import { smoothScrollTo } from './SectionTransition';

interface NavbarProps {
  config: ClinicConfig;
  onOpenBooking: (treatment?: string) => void;
}

const NAV_LINKS = [
  { label: 'Home', href: '#hero', id: 'hero' },
  { label: 'About', href: '#about', id: 'about' },
  { label: 'Services', href: '#services', id: 'services' },
  { label: 'Technology', href: '#technology', id: 'technology' },
  { label: 'Smile Gallery', href: '#gallery', id: 'gallery' },
  { label: 'Reviews', href: '#reviews', id: 'reviews' },
  { label: 'FAQ', href: '#faq', id: 'faq' },
  { label: 'Contact', href: '#contact', id: 'contact' },
];

export const Navbar: React.FC<NavbarProps> = ({ config, onOpenBooking }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('hero');
  const sectionOffsetsRef = useRef<Array<{ id: string; top: number }>>([]);

  const { scrollYProgress } = useScroll();

  useEffect(() => {
    let ticking = false;

    const measureOffsets = () => {
      const scrollY = window.scrollY;
      sectionOffsetsRef.current = NAV_LINKS.map((link) => {
        const el = document.getElementById(link.id);
        return {
          id: link.id,
          top: el ? el.getBoundingClientRect().top + scrollY : 0,
        };
      });
    };

    const updateOnScroll = () => {
      const y = window.scrollY;
      const nextScrolled = y > 20;
      setIsScrolled((prev) => (prev !== nextScrolled ? nextScrolled : prev));

      // Active section lookup using cached offsets (zero DOM layout reads during scroll)
      const scrollPosition = y + 140;
      const offsets = sectionOffsetsRef.current;
      let matchedId = 'hero';
      for (let i = offsets.length - 1; i >= 0; i--) {
        if (offsets[i].top > 0 && scrollPosition >= offsets[i].top) {
          matchedId = offsets[i].id;
          break;
        }
      }
      setActiveSection((prev) => (prev !== matchedId ? matchedId : prev));
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateOnScroll);
        ticking = true;
      }
    };

    measureOffsets();
    updateOnScroll();
    // Re-measure after images/fonts settle
    const timer = window.setTimeout(measureOffsets, 800);

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', measureOffsets, { passive: true });
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', measureOffsets);
    };
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    setActiveSection(targetId);
    smoothScrollTo(targetId, 76, 620);
  };

  const whatsappDirectUrl = `https://wa.me/${config.whatsappNumber}?text=${encodeURIComponent(
    'Hi Dr XYZ, I would like to know more about your dental services and book an appointment.'
  )}`;

  return (
    <>
      {/* Top subtle reading progress indicator bar */}
      <motion.div
        style={{ scaleX: scrollYProgress }}
        className="fixed top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-[#203D32] via-[#8C6D3B] to-[#D4AF37] origin-left z-50 pointer-events-none transform-gpu"
      />

      <header
        className={`fixed top-0 left-0 right-0 z-40 py-3.5 transition-[background-color,border-color,box-shadow] duration-200 transform-gpu ${
          isScrolled
            ? 'bg-[#F4EFEA]/96 backdrop-blur-md border-b border-[#E2D8C8] shadow-xs'
            : 'bg-[#F7F3ED]/90 border-b border-[#EDE4D6]/70'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Zone 1: Bespoke Emblem & Wordmark */}
            <a
              href="#hero"
              onClick={(e) => handleNavClick(e, '#hero')}
              className="group flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#203D32] rounded-md"
            >
              <Logo size="md" variant="light" />
            </a>

            {/* Zone 2: 4-8 clean text navigation links with smooth animated indicator */}
            <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-[#48534C]">
              {NAV_LINKS.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={`relative py-1.5 transition-colors ${
                      isActive ? 'text-[#183127] font-semibold' : 'text-[#48534C] hover:text-[#183127]'
                    }`}
                  >
                    <span>{link.label}</span>
                    {isActive && (
                      <motion.span
                        layoutId="activeNavIndicator"
                        className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#284D3F] rounded-full"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </a>
                );
              })}
            </nav>

            {/* Zone 3: 1-2 primary actions */}
            <div className="hidden sm:flex items-center gap-3">
              <a
                href={whatsappDirectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-[#183127] bg-[#E8E1D5]/70 hover:bg-[#DDD4C4] border border-[#D2C6B4] rounded-full transition-all duration-150 shadow-xs whitespace-nowrap active:scale-95"
              >
                <MessageSquare className="w-3.5 h-3.5 text-[#284D3F]" />
                <span>WhatsApp Us</span>
              </a>

              <button
                type="button"
                onClick={() => onOpenBooking()}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-[#FAF7F2] bg-[#183127] hover:bg-[#203D32] rounded-full transition-all duration-150 shadow-md shadow-[#183127]/20 whitespace-nowrap active:scale-95 cursor-pointer border border-[#2D5444]"
              >
                <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Book Appointment</span>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex sm:hidden items-center gap-2">
              <button
                type="button"
                onClick={() => onOpenBooking()}
                className="px-3.5 py-1.5 text-xs font-semibold text-[#FAF7F2] bg-[#183127] rounded-full"
              >
                Book
              </button>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-[#242922] hover:text-[#183127] focus:outline-none"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer with Framer Motion AnimatePresence */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 lg:hidden bg-[#12231C]/60 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              className="fixed inset-y-0 right-0 w-full max-w-xs bg-[#FBF9F5]/98 backdrop-blur-2xl p-6 shadow-2xl flex flex-col justify-between border-l border-[#E2D8C8]"
              onClick={(e) => e.stopPropagation()}
            >
              <div>
                <div className="flex items-center justify-between pb-6 border-b border-[#EADFCF]">
                  <Logo size="sm" variant="light" />
                  <button
                    type="button"
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 text-[#6D776F] hover:text-[#183127]"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="mt-6 flex flex-col gap-2">
                  {NAV_LINKS.map((link) => {
                    const isActive = activeSection === link.id;
                    return (
                      <a
                        key={link.label}
                        href={link.href}
                        onClick={(e) => {
                          setMobileMenuOpen(false);
                          handleNavClick(e, link.href);
                        }}
                        className={`px-3.5 py-2.5 text-base font-medium rounded-xl transition-colors ${
                          isActive
                            ? 'bg-[#E5DCCF] text-[#183127] font-semibold'
                            : 'text-[#38433C] hover:text-[#183127] hover:bg-[#EFE9DF]'
                        }`}
                      >
                        {link.label}
                      </a>
                    );
                  })}
                </div>
              </div>

              <div className="pt-6 border-t border-[#EADFCF] flex flex-col gap-3">
                <a
                  href={whatsappDirectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3 text-sm font-semibold text-[#183127] bg-[#EFE9DF] hover:bg-[#E4DCCE] rounded-xl border border-[#D5C9B7] transition-colors"
                >
                  <MessageSquare className="w-4 h-4 text-[#284D3F]" />
                  WhatsApp Us
                </a>
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenBooking();
                  }}
                  className="w-full flex items-center justify-center gap-2 py-3 text-sm font-semibold text-[#FAF7F2] bg-[#183127] hover:bg-[#203D32] rounded-xl shadow-md border border-[#2D5444] transition-colors cursor-pointer"
                >
                  <Calendar className="w-4 h-4 text-[#D4AF37]" />
                  Book an Appointment
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

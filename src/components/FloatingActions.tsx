import React, { useState, useEffect } from 'react';
import { Bot, Calendar, Phone, X, ArrowUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ClinicConfig } from '../types/clinic';
import { smoothEasing, smoothScrollTo } from './SectionTransition';
import { LiveChatWidget } from './LiveChatWidget';

interface FloatingActionsProps {
  config: ClinicConfig;
  onOpenBooking: (treatment?: string) => void;
  externalChatOpen?: boolean;
  onExternalChatChange?: (open: boolean) => void;
}

export const FloatingActions: React.FC<FloatingActionsProps> = ({
  config,
  onOpenBooking,
  externalChatOpen,
  onExternalChatChange,
}) => {
  const [internalChatOpen, setInternalChatOpen] = useState(false);
  const [hasOpenedChat, setHasOpenedChat] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const isChatOpen = externalChatOpen !== undefined ? externalChatOpen : internalChatOpen;

  const setChatOpen = (next: boolean) => {
    setInternalChatOpen(next);
    if (onExternalChatChange) {
      onExternalChatChange(next);
    }
  };

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const next = window.scrollY > 450;
          setShowScrollTop((prev) => (prev !== next ? next : prev));
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleToggleChat = () => {
    setChatOpen(!isChatOpen);
    setHasOpenedChat(true);
  };

  const scrollToTop = () => {
    smoothScrollTo(0, 0, 650);
  };

  return (
    <>
      {/* Collapsible 24/7 AI Agent & Live Chat Overlay Panel */}
      <LiveChatWidget
        config={config}
        isOpen={isChatOpen}
        onToggle={handleToggleChat}
        onClose={() => setChatOpen(false)}
        onBookTreatment={(treatment) => onOpenBooking(treatment)}
      />

      {/* Desktop Floating Actions (Bottom-Right) */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.5, ease: smoothEasing }}
        className="hidden lg:flex fixed bottom-6 right-6 z-40 items-center gap-3 pointer-events-none"
      >
        {/* Scroll to Top Button */}
        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              type="button"
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 10 }}
              transition={{ duration: 0.25, ease: smoothEasing }}
              onClick={scrollToTop}
              aria-label="Scroll to top"
              title="Back to top"
              className="pointer-events-auto w-11 h-11 rounded-full bg-[#FFFFFF]/95 backdrop-blur-xl border border-[#D5E7ED] text-[#16324F] flex items-center justify-center shadow-lg hover:bg-[#2A9D8F] hover:text-[#FFFFFF] transition-colors cursor-pointer"
            >
              <ArrowUp className="w-4 h-4" />
            </motion.button>
          )}
        </AnimatePresence>

        {/* Book Appointment Button */}
        <button
          type="button"
          onClick={() => onOpenBooking()}
          className="pointer-events-auto inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-[#FFFFFF] border border-[#D5E7ED] text-[#16324F] hover:bg-[#EAF4F7] text-xs font-mono font-bold tracking-wider uppercase shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer whitespace-nowrap"
        >
          <Calendar className="w-4 h-4 text-[#2A9D8F]" />
          <span>Book Appointment</span>
        </button>

        {/* Collapsible 24/7 AI Agent Trigger Button */}
        <button
          type="button"
          onClick={handleToggleChat}
          aria-expanded={isChatOpen}
          className="pointer-events-auto relative inline-flex items-center gap-2.5 px-5 py-3.5 rounded-xl bg-[#2A9D8F] hover:bg-[#238579] text-[#FFFFFF] text-xs font-mono font-bold tracking-wider uppercase shadow-xl hover:shadow-2xl transition-all duration-200 cursor-pointer border border-[#238579] whitespace-nowrap"
        >
          <div className="w-5 h-5 rounded-md bg-[#238579] text-[#FFFFFF] flex items-center justify-center">
            {isChatOpen ? (
              <X className="w-3.5 h-3.5 text-[#FFFFFF]" />
            ) : (
              <Bot className="w-3.5 h-3.5 text-[#FFFFFF]" />
            )}
          </div>
          <span>{isChatOpen ? 'Close AI' : '24/7 AI Agent'}</span>
          {!hasOpenedChat && !isChatOpen && (
            <span className="ml-0.5 px-1.5 py-0.2 rounded bg-[#FFFFFF] text-[#2A9D8F] text-[10px] font-bold">
              AI
            </span>
          )}
        </button>
      </motion.div>

      {/* Mobile Fixed Bottom Action Bar (<15% viewport height) */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4, ease: smoothEasing }}
        className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#FFFFFF]/95 backdrop-blur-xl border-t border-[#D5E7ED] px-4 py-2.5 shadow-2xl safe-bottom"
      >
        <div className="flex items-center justify-between gap-2 max-w-md mx-auto">
          {/* 24/7 AI Agent Toggle */}
          <button
            type="button"
            onClick={handleToggleChat}
            aria-expanded={isChatOpen}
            className="flex-1 flex flex-col items-center justify-center py-1 text-[11px] font-semibold text-[#16324F] hover:text-[#2A9D8F] active:scale-95 transition-transform cursor-pointer"
          >
            {isChatOpen ? (
              <X className="w-4 h-4 text-[#2A9D8F] mb-0.5" />
            ) : (
              <Bot className="w-4 h-4 text-[#2A9D8F] mb-0.5" />
            )}
            <span>{isChatOpen ? 'Close AI' : '24/7 AI Agent'}</span>
          </button>

          {/* Book Appointment (Prominent Center CTA) */}
          <button
            type="button"
            onClick={() => onOpenBooking()}
            className="flex-[1.5] inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-[#2A9D8F] active:bg-[#238579] text-[#FFFFFF] text-xs font-semibold shadow-md active:scale-95 transition-transform cursor-pointer border border-[#238579] whitespace-nowrap"
          >
            <Calendar className="w-3.5 h-3.5 text-[#FFFFFF]" />
            <span>Book Now</span>
          </button>

          {/* Call Clinic */}
          <a
            href={`tel:${config.clinicPhone.replace(/\s+/g, '')}`}
            className="flex-1 flex flex-col items-center justify-center py-1 text-[11px] font-semibold text-[#667085] hover:text-[#16324F] active:scale-95 transition-transform"
          >
            <Phone className="w-4 h-4 text-[#2A9D8F] mb-0.5" />
            <span>Call Clinic</span>
          </a>
        </div>
      </motion.div>
    </>
  );
};

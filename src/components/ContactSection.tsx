import React from 'react';
import {
  MapPin,
  Phone,
  MessageSquare,
  Mail,
  Clock,
  Navigation,
  Calendar,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { ClinicConfig } from '../types/clinic';
import { smoothEasing, staggerContainerVariants, childFadeUpVariants, scrollViewport } from './SectionTransition';

interface ContactSectionProps {
  config: ClinicConfig;
  onOpenBooking: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ config, onOpenBooking }) => {
  const whatsappUrl = `https://wa.me/${config.whatsappNumber}?text=${encodeURIComponent(
    'Hi Dr XYZ, I would like to inquire about your clinic location and timings in Chandigarh.'
  )}`;

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-[#EAF4F7] border-b border-[#D5E7ED]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={scrollViewport}
          transition={{ duration: 0.55, ease: smoothEasing }}
          className="max-w-3xl mb-16 text-left transform-gpu"
        >
          <span className="font-mono text-xs font-bold text-[#2A9D8F] tracking-widest uppercase block mb-2">
            [ LOCATION & ACCESS ]
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[#16324F] tracking-tight">
            Let's Talk About Your Smile.
          </h2>
          <p className="mt-3 text-base sm:text-lg text-[#667085]">
            Conveniently situated in Sector 9-C, Madhya Marg, Chandigarh with private parking and elevator access.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Contact Structured Cards */}
          <motion.div
            variants={staggerContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={scrollViewport}
            className="lg:col-span-5 flex flex-col justify-between space-y-4"
          >
            {/* Address Card */}
            <motion.div variants={childFadeUpVariants} className="p-7 rounded-2xl bg-[#FFFFFF] border border-[#D5E7ED] shadow-xs">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-[#EAF4F7] text-[#16324F] shrink-0 border border-[#CEE3E9]">
                  <MapPin className="w-5 h-5 text-[#2A9D8F]" />
                </div>
                <div>
                  <span className="font-mono text-[10px] text-[#2A9D8F] uppercase font-bold tracking-wider block mb-1">
                    [ PRACTICE ADDRESS ]
                  </span>
                  <p className="text-sm text-[#16324F] font-semibold leading-relaxed">
                    {config.clinicAddress}
                  </p>
                  <p className="text-xs text-[#667085] mt-0.5">
                    {config.city}, {config.state}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Direct Connect */}
            <motion.div variants={childFadeUpVariants} className="p-7 rounded-2xl bg-[#FFFFFF] border border-[#D5E7ED] shadow-xs space-y-4">
              <span className="font-mono text-[10px] text-[#2A9D8F] uppercase font-bold tracking-wider block">
                [ DIRECT DESK ]
              </span>
              <div className="flex items-center gap-4">
                <div className="p-2.5 rounded-lg bg-[#EAF4F7] text-[#16324F] shrink-0 border border-[#CEE3E9]">
                  <Phone className="w-4 h-4 text-[#2A9D8F]" />
                </div>
                <div className="flex-1">
                  <span className="text-[11px] font-mono text-[#667085] block">TELEPHONE</span>
                  <a
                    href={`tel:${config.clinicPhone.replace(/\s+/g, '')}`}
                    className="text-sm font-semibold text-[#16324F] hover:text-[#2A9D8F] transition-colors"
                  >
                    {config.clinicPhone}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="p-2.5 rounded-lg bg-[#EAF4F7] text-[#16324F] shrink-0 border border-[#CEE3E9]">
                  <MessageSquare className="w-4 h-4 text-[#2A9D8F]" />
                </div>
                <div className="flex-1">
                  <span className="text-[11px] font-mono text-[#667085] block">WHATSAPP</span>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-semibold text-[#16324F] hover:text-[#2A9D8F] transition-colors"
                  >
                    +{config.whatsappNumber}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="p-2.5 rounded-lg bg-[#EAF4F7] text-[#16324F] shrink-0 border border-[#CEE3E9]">
                  <Mail className="w-4 h-4 text-[#2A9D8F]" />
                </div>
                <div className="flex-1">
                  <span className="text-[11px] font-mono text-[#667085] block">EMAIL INQUIRIES</span>
                  <a
                    href={`mailto:${config.clinicEmail}`}
                    className="text-sm font-semibold text-[#16324F] hover:text-[#2A9D8F] transition-colors"
                  >
                    {config.clinicEmail}
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Opening Hours */}
            <motion.div variants={childFadeUpVariants} className="p-7 rounded-2xl bg-[#FFFFFF] border border-[#D5E7ED] shadow-xs">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-[#EAF4F7] text-[#16324F] shrink-0 border border-[#CEE3E9]">
                  <Clock className="w-5 h-5 text-[#2A9D8F]" />
                </div>
                <div className="text-xs sm:text-sm text-[#667085] space-y-1 w-full">
                  <span className="font-mono text-[10px] text-[#2A9D8F] uppercase font-bold tracking-wider block mb-2">
                    [ CLINICAL HOURS ]
                  </span>
                  <div className="flex justify-between pb-1.5 border-b border-[#EAF4F7]">
                    <span>{config.openingHours.weekdays}</span>
                  </div>
                  <div className="flex justify-between pt-1.5">
                    <span className="text-[#16324F] font-medium">{config.openingHours.sunday}</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div variants={childFadeUpVariants} className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href={config.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 text-xs font-bold uppercase tracking-wider text-[#16324F] bg-[#FFFFFF] hover:bg-[#EAF4F7] border border-[#CEE3E9] rounded-xl transition-colors shadow-xs font-mono"
              >
                <Navigation className="w-4 h-4 text-[#2A9D8F]" />
                <span>Get Directions</span>
              </a>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 text-xs font-bold uppercase tracking-wider text-[#16324F] bg-[#FFFFFF] hover:bg-[#EAF4F7] border border-[#CEE3E9] rounded-xl transition-colors shadow-xs font-mono"
              >
                <MessageSquare className="w-4 h-4 text-[#2A9D8F]" />
                <span>WhatsApp Us</span>
              </a>

              <button
                type="button"
                onClick={onOpenBooking}
                className="inline-flex items-center gap-2 px-5 py-3 text-xs font-bold uppercase tracking-wider text-[#FFFFFF] bg-[#2A9D8F] hover:bg-[#238579] rounded-xl transition-colors shadow-xs cursor-pointer border border-[#238579] font-mono shadow-md shadow-[#2A9D8F]/25"
              >
                <Calendar className="w-4 h-4 text-[#FFFFFF]" />
                <span>Book Now</span>
              </button>
            </motion.div>
          </motion.div>

          {/* Right Column: Google Maps Interactive Embed */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6, delay: 0.1, ease: smoothEasing }}
            className="lg:col-span-7 rounded-2xl overflow-hidden bg-[#FFFFFF] border border-[#D5E7ED] shadow-sm min-h-[420px] lg:min-h-[520px] relative"
          >
            <iframe
              src={config.googleMapsEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '420px' }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Dr XYZ Dental Clinic Chandigarh Map"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

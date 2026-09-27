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
import { smoothEasing, staggerContainerVariants, childFadeUpVariants } from './SectionTransition';

interface ContactSectionProps {
  config: ClinicConfig;
  onOpenBooking: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ config, onOpenBooking }) => {
  const whatsappUrl = `https://wa.me/${config.whatsappNumber}?text=${encodeURIComponent(
    'Hi Dr XYZ, I would like to inquire about your clinic location and timings in Chandigarh.'
  )}`;

  return (
    <motion.section
      id="contact"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.8, ease: smoothEasing }}
      className="py-24 relative overflow-hidden bg-[#FAF7F2]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: smoothEasing }}
          className="max-w-3xl mb-16 text-left"
        >
          <span className="text-xs font-semibold uppercase tracking-widest text-[#8C6D3B] block mb-2">
            Location & Access
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#183127] tracking-tight">
            Let's Talk About Your Smile.
          </h2>
          <p className="mt-3 text-base sm:text-lg text-[#4C5950]">
            Conveniently situated in Sector 9-C, Madhya Marg, Chandigarh with private parking and elevator access.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Contact Cards */}
          <motion.div
            variants={staggerContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="lg:col-span-5 flex flex-col justify-between space-y-4"
          >
            {/* Address Card */}
            <motion.div variants={childFadeUpVariants} className="p-6 rounded-3xl glass-panel border border-[#E3D9C9]">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-2xl bg-[#EFE8DD] text-[#183127] shrink-0 border border-[#DDD0BC]">
                  <MapPin className="w-5 h-5 text-[#8C6D3B]" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-[#183127] uppercase tracking-wider mb-1">
                    Clinic Location
                  </h3>
                  <p className="text-sm text-[#38453D] font-medium leading-relaxed">
                    {config.clinicAddress}
                  </p>
                  <p className="text-xs text-[#637267] mt-0.5">
                    {config.city}, {config.state}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Direct Connect: Phone, WhatsApp, Email */}
            <motion.div variants={childFadeUpVariants} className="p-6 rounded-3xl glass-panel border border-[#E3D9C9] space-y-4">
              <div className="flex items-center gap-4">
                <div className="p-2.5 rounded-xl bg-[#EFE8DD] text-[#183127] shrink-0 border border-[#DDD0BC]">
                  <Phone className="w-4 h-4 text-[#8C6D3B]" />
                </div>
                <div className="flex-1">
                  <span className="text-xs text-[#829086] block">Phone Desk</span>
                  <a
                    href={`tel:${config.clinicPhone.replace(/\s+/g, '')}`}
                    className="text-sm font-semibold text-[#183127] hover:text-[#284D3F] transition-colors"
                  >
                    {config.clinicPhone}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="p-2.5 rounded-xl bg-[#EFE8DD] text-[#183127] shrink-0 border border-[#DDD0BC]">
                  <MessageSquare className="w-4 h-4 text-[#203D32]" />
                </div>
                <div className="flex-1">
                  <span className="text-xs text-[#829086] block">WhatsApp Desk</span>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-semibold text-[#183127] hover:text-[#284D3F] transition-colors"
                  >
                    +{config.whatsappNumber}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="p-2.5 rounded-xl bg-[#EFE8DD] text-[#183127] shrink-0 border border-[#DDD0BC]">
                  <Mail className="w-4 h-4 text-[#8C6D3B]" />
                </div>
                <div className="flex-1">
                  <span className="text-xs text-[#829086] block">Email Inquiries</span>
                  <a
                    href={`mailto:${config.clinicEmail}`}
                    className="text-sm font-semibold text-[#183127] hover:text-[#284D3F] transition-colors"
                  >
                    {config.clinicEmail}
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Opening Hours */}
            <motion.div variants={childFadeUpVariants} className="p-6 rounded-3xl glass-panel border border-[#E3D9C9]">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-2xl bg-[#EFE8DD] text-[#183127] shrink-0 border border-[#DDD0BC]">
                  <Clock className="w-5 h-5 text-[#8C6D3B]" />
                </div>
                <div className="text-xs sm:text-sm text-[#4E5A51] space-y-1 w-full">
                  <h3 className="text-sm font-semibold text-[#183127] uppercase tracking-wider mb-2">
                    Opening Hours
                  </h3>
                  <div className="flex justify-between pb-1 border-b border-[#E3D9C9]">
                    <span>{config.openingHours.weekdays}</span>
                  </div>
                  <div className="flex justify-between pt-1">
                    <span className="text-[#183127] font-medium">{config.openingHours.sunday}</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Primary Action Buttons */}
            <motion.div variants={childFadeUpVariants} className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href={config.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 text-xs font-semibold text-[#183127] bg-[#EFE8DD] hover:bg-[#E4DACB] border border-[#D5C9B5] rounded-xl transition-colors shadow-xs"
              >
                <Navigation className="w-4 h-4 text-[#8C6D3B]" />
                <span>Get Directions</span>
              </a>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 text-xs font-semibold text-[#183127] bg-[#EFE9DF] hover:bg-[#E4DCCE] border border-[#D5C9B7] rounded-xl transition-colors shadow-xs"
              >
                <MessageSquare className="w-4 h-4 text-[#203D32]" />
                <span>WhatsApp Us</span>
              </a>

              <button
                type="button"
                onClick={onOpenBooking}
                className="inline-flex items-center gap-2 px-5 py-3 text-xs font-semibold text-[#FAF7F2] bg-[#183127] hover:bg-[#203D32] rounded-xl transition-colors shadow-xs cursor-pointer border border-[#2D5444]"
              >
                <Calendar className="w-4 h-4 text-[#D4AF37]" />
                <span>Book Appointment</span>
              </button>
            </motion.div>
          </motion.div>

          {/* Right Column: Google Maps Interactive Embed */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.8, delay: 0.2, ease: smoothEasing }}
            className="lg:col-span-7 rounded-3xl overflow-hidden glass-panel border border-[#E3D9C9] shadow-xl min-h-[380px] lg:min-h-[500px] relative"
          >
            <iframe
              src={config.googleMapsEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '400px' }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Dr XYZ Dental Clinic Chandigarh Map"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

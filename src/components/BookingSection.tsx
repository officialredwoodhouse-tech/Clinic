import React, { useState, useEffect } from 'react';
import {
  Calendar,
  Clock,
  User,
  Phone,
  Mail,
  FileText,
  Upload,
  CheckCircle,
  AlertCircle,
  Loader2,
  Lock,
  MessageSquare
} from 'lucide-react';
import { motion } from 'framer-motion';
import { ClinicConfig, AppointmentRequest } from '../types/clinic';
import { BookingSuccessModal } from './BookingSuccessModal';
import { smoothEasing } from './SectionTransition';

const TREATMENTS = [
  'General Check-up',
  'Teeth Cleaning',
  'Tooth Pain',
  'Root Canal',
  'Dental Implant',
  'Braces / Aligners',
  'Teeth Whitening',
  'Cosmetic Dentistry',
  'Smile Makeover',
  'Wisdom Tooth',
  'Gum Problem',
  'Pediatric Dentistry',
  'Other',
];

const TIME_SLOTS = [
  '10:00 AM',
  '11:00 AM',
  '12:00 PM',
  '02:30 PM',
  '03:30 PM',
  '04:30 PM',
  '05:30 PM',
  '06:30 PM',
  '07:30 PM',
];

interface BookingSectionProps {
  config: ClinicConfig;
  preselectedTreatment?: string;
  onClearPreselected?: () => void;
}

export const BookingSection: React.FC<BookingSectionProps> = ({
  config,
  preselectedTreatment,
  onClearPreselected,
}) => {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [email, setEmail] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredTime, setPreferredTime] = useState('');
  const [treatment, setTreatment] = useState('General Check-up');
  const [message, setMessage] = useState('');
  const [attachmentName, setAttachmentName] = useState('');
  const [agreementChecked, setAgreementChecked] = useState(false);

  // Anti-spam honeypot
  const [honeypot, setHoneypot] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [createdAppointment, setCreatedAppointment] = useState<AppointmentRequest | null>(null);
  const [whatsappConfirmUrl, setWhatsappConfirmUrl] = useState<string | undefined>(undefined);

  // Set min date to tomorrow
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDateStr = tomorrow.toISOString().split('T')[0];

  useEffect(() => {
    if (preselectedTreatment) {
      // Find matching treatment or default to closest
      const match = TREATMENTS.find(
        (t) => t.toLowerCase().includes(preselectedTreatment.toLowerCase()) ||
               preselectedTreatment.toLowerCase().includes(t.toLowerCase())
      );
      if (match) {
        setTreatment(match);
      } else {
        setTreatment('Other');
      }
    }
  }, [preselectedTreatment]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        setErrorMessage('File size exceeds 10MB limit. Please upload a smaller image.');
        return;
      }
      setAttachmentName(file.name);
      setErrorMessage('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    // Client-side validations
    if (!fullName.trim() || fullName.trim().length < 2) {
      setErrorMessage('Please enter your full name.');
      return;
    }
    if (!phone.trim() || phone.trim().length < 8) {
      setErrorMessage('Please enter a valid telephone number.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }
    if (!preferredDate) {
      setErrorMessage('Please select a preferred date for your visit.');
      return;
    }
    if (!preferredTime) {
      setErrorMessage('Please select a preferred time slot.');
      return;
    }
    if (!agreementChecked) {
      setErrorMessage('Please agree to be contacted by the clinic to confirm your appointment.');
      return;
    }

    setIsLoading(true);

    // Format clean WhatsApp text with all filled details
    const cleanWhatsApp = (whatsapp && whatsapp.trim()) || phone.trim();
    const formattedWhatsAppText = `🦷 *NEW APPOINTMENT REQUEST*

*Patient Name:* ${fullName.trim()}
*Phone:* ${phone.trim()}
*WhatsApp:* ${cleanWhatsApp}
*Email:* ${email.trim()}
*Preferred Date:* ${preferredDate}
*Preferred Time:* ${preferredTime}
*Treatment:* ${treatment}
*Message:* ${message ? message.trim() : 'None'}
${attachmentName ? `*Attachment:* ${attachmentName}` : ''}

_Hi Dr Pallavi, I have submitted my appointment details above. Please confirm my slot._`;

    const encodedText = encodeURIComponent(formattedWhatsAppText);
    const targetWhatsAppUrl = `https://wa.me/${config.whatsappNumber}?text=${encodedText}`;

    // Also attempt background recording to API if available (non-blocking)
    try {
      fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName,
          phone,
          whatsapp: cleanWhatsApp,
          email,
          preferredDate,
          preferredTime,
          treatment,
          message,
          attachmentName,
          honeypot,
        }),
      }).catch(() => {
        // Silently continue so WhatsApp redirect is never blocked even if deployed statically
      });
    } catch (e) {
      // Continue
    }

    setCreatedAppointment({
      id: `apt-${Date.now().toString(36)}`,
      fullName: fullName.trim(),
      phone: phone.trim(),
      whatsapp: cleanWhatsApp,
      email: email.trim(),
      preferredDate,
      preferredTime,
      treatment,
      message,
      attachmentName,
      createdAt: new Date().toISOString(),
      status: 'pending',
    });
    setWhatsappConfirmUrl(targetWhatsAppUrl);

    // Reset fields
    setFullName('');
    setPhone('');
    setWhatsapp('');
    setEmail('');
    setPreferredDate('');
    setPreferredTime('');
    setMessage('');
    setAttachmentName('');
    setAgreementChecked(false);
    if (onClearPreselected) onClearPreselected();
    setIsLoading(false);

    // Seamlessly redirect the client to WhatsApp with all filled details
    window.location.href = targetWhatsAppUrl;
  };

  return (
    <motion.section
      id="book"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.8, ease: smoothEasing }}
      className="py-24 relative overflow-hidden bg-[#FAF7F2]"
    >
      {/* Background ambient blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-gradient-to-tr from-[#E6DCBF]/40 via-[#D6C4A1]/20 to-[#2A5243]/15 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: smoothEasing }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <span className="text-xs font-semibold uppercase tracking-widest text-[#8C6D3B] block mb-2">
            Priority Scheduling
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#183127] tracking-tight">
            Book Your Appointment
          </h2>
          <p className="mt-3 text-base text-[#4C5950]">
            Submit your consultation request below. You'll be connected directly on WhatsApp with your appointment details prepared to send.
          </p>
        </motion.div>

        {/* Booking Card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.75, delay: 0.15, ease: smoothEasing }}
          className="p-8 sm:p-12 rounded-3xl glass-panel border border-[#E3D9C9] shadow-2xl"
        >
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Honeypot field (hidden from genuine users) */}
            <div className="hidden" aria-hidden="true">
              <input
                type="text"
                name="confirm_bot_check"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            {/* Error Banner */}
            {errorMessage && (
              <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-xs sm:text-sm text-rose-800 flex items-start gap-3">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Part 1: Personal Information */}
            <div>
              <h3 className="text-base font-serif font-bold text-[#183127] mb-4 pb-2 border-b border-[#E3D9C9] flex items-center gap-2">
                <User className="w-4 h-4 text-[#8C6D3B]" />
                <span>1. Personal Information</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-[#38453D] uppercase tracking-wider mb-2">
                    Full Name <span className="text-rose-600">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Navjot Singh"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-4 py-3 text-sm rounded-xl bg-[#FBF9F5] border border-[#DDD1BE] text-[#183127] placeholder-[#8A958D] focus:outline-none focus:ring-2 focus:ring-[#203D32]/30 focus:border-[#203D32] transition-colors shadow-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#38453D] uppercase tracking-wider mb-2">
                    Phone Number <span className="text-rose-600">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. +91 98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-3 text-sm rounded-xl bg-[#FBF9F5] border border-[#DDD1BE] text-[#183127] placeholder-[#8A958D] focus:outline-none focus:ring-2 focus:ring-[#203D32]/30 focus:border-[#203D32] transition-colors shadow-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#38453D] uppercase tracking-wider mb-2">
                    WhatsApp Number <span className="text-[#839187] font-normal">(Optional if same as phone)</span>
                  </label>
                  <input
                    type="tel"
                    placeholder="e.g. +91 98765 43210"
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    className="w-full px-4 py-3 text-sm rounded-xl bg-[#FBF9F5] border border-[#DDD1BE] text-[#183127] placeholder-[#8A958D] focus:outline-none focus:ring-2 focus:ring-[#203D32]/30 focus:border-[#203D32] transition-colors shadow-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#38453D] uppercase tracking-wider mb-2">
                    Email Address <span className="text-rose-600">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. navjot@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 text-sm rounded-xl bg-[#FBF9F5] border border-[#DDD1BE] text-[#183127] placeholder-[#8A958D] focus:outline-none focus:ring-2 focus:ring-[#203D32]/30 focus:border-[#203D32] transition-colors shadow-xs"
                  />
                </div>
              </div>
            </div>

            {/* Part 2: Appointment Details */}
            <div>
              <h3 className="text-base font-serif font-bold text-[#183127] mb-4 pb-2 border-b border-[#E3D9C9] flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#8C6D3B]" />
                <span>2. Appointment Details</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-[#38453D] uppercase tracking-wider mb-2">
                    Preferred Date <span className="text-rose-600">*</span>
                  </label>
                  <input
                    type="date"
                    required
                    min={minDateStr}
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    className="w-full px-4 py-3 text-sm rounded-xl bg-[#FBF9F5] border border-[#DDD1BE] text-[#183127] focus:outline-none focus:ring-2 focus:ring-[#203D32]/30 focus:border-[#203D32] transition-colors shadow-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#38453D] uppercase tracking-wider mb-2">
                    Preferred Time <span className="text-rose-600">*</span>
                  </label>
                  <select
                    required
                    value={preferredTime}
                    onChange={(e) => setPreferredTime(e.target.value)}
                    className="w-full px-4 py-3 text-sm rounded-xl bg-[#FBF9F5] border border-[#DDD1BE] text-[#183127] focus:outline-none focus:ring-2 focus:ring-[#203D32]/30 focus:border-[#203D32] transition-colors shadow-xs cursor-pointer"
                  >
                    <option value="">Select Time Slot</option>
                    {TIME_SLOTS.map((slot) => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#38453D] uppercase tracking-wider mb-2">
                    Treatment / Reason <span className="text-rose-600">*</span>
                  </label>
                  <select
                    required
                    value={treatment}
                    onChange={(e) => setTreatment(e.target.value)}
                    className="w-full px-4 py-3 text-sm rounded-xl bg-[#FBF9F5] border border-[#DDD1BE] text-[#183127] focus:outline-none focus:ring-2 focus:ring-[#203D32]/30 focus:border-[#203D32] transition-colors shadow-xs cursor-pointer"
                  >
                    {TREATMENTS.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Part 3: Additional Information & Attachment */}
            <div>
              <h3 className="text-base font-serif font-bold text-[#183127] mb-4 pb-2 border-b border-[#E3D9C9] flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#8C6D3B]" />
                <span>3. Additional Information</span>
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-[#38453D] uppercase tracking-wider mb-2">
                    Message / Describe Your Concern
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Tell us what you're experiencing or if you have any questions before visiting..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-4 py-3 text-sm rounded-xl bg-[#FBF9F5] border border-[#DDD1BE] text-[#183127] placeholder-[#8A958D] focus:outline-none focus:ring-2 focus:ring-[#203D32]/30 focus:border-[#203D32] transition-colors shadow-xs resize-none"
                  />
                </div>

                {/* Upload Image / X-Ray */}
                <div>
                  <label className="block text-xs font-semibold text-[#38453D] uppercase tracking-wider mb-2">
                    Upload Recent X-Ray or Photograph <span className="text-[#839187] font-normal">(Optional, max 10MB)</span>
                  </label>
                  <div className="flex items-center gap-3">
                    <label className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#EFE8DD] hover:bg-[#E4DACB] border border-[#D5C9B5] text-xs font-semibold text-[#183127] cursor-pointer transition-colors shadow-xs">
                      <Upload className="w-3.5 h-3.5 text-[#6B786E]" />
                      <span>Choose File</span>
                      <input
                        type="file"
                        accept="image/*,.pdf"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                    </label>
                    <span className="text-xs text-[#5E6D62] truncate max-w-xs">
                      {attachmentName ? attachmentName : 'No file chosen'}
                    </span>
                    {attachmentName && (
                      <button
                        type="button"
                        onClick={() => setAttachmentName('')}
                        className="text-xs text-rose-600 hover:underline"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                </div>

                {/* Agreement Checkbox */}
                <div className="pt-2 flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="clinic-agreement"
                    required
                    checked={agreementChecked}
                    onChange={(e) => setAgreementChecked(e.target.checked)}
                    className="mt-1 h-4 w-4 rounded border-[#C4B7A2] text-[#183127] focus:ring-[#203D32] cursor-pointer"
                  />
                  <label htmlFor="clinic-agreement" className="text-xs text-[#4E5A51] leading-relaxed cursor-pointer select-none">
                    I agree to be contacted by Dr Pallavi’s clinic team via phone, WhatsApp or email regarding this appointment request. I understand that this request is subject to clinic availability confirmation.
                  </label>
                </div>
              </div>
            </div>

            {/* Submit Button & Security Note */}
            <div className="pt-4 border-t border-[#E3D9C9] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs text-[#5E6D62]">
                <MessageSquare className="w-4 h-4 text-[#203D32] shrink-0" />
                <span>Redirects to WhatsApp with your details pre-filled. Just tap Send!</span>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-9 py-4 text-xs font-bold uppercase tracking-wider text-[#FAF7F2] bg-[#183127] hover:bg-[#203D32] rounded-2xl shadow-lg shadow-[#183127]/20 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer active:scale-98 border border-[#2D5444]"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-[#D4AF37]" />
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <Calendar className="w-4 h-4 text-[#D4AF37]" />
                    <span>Book Now</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </div>

      {/* Booking Success Confirmation Dialog */}
      <BookingSuccessModal
        appointment={createdAppointment}
        whatsappUrl={whatsappConfirmUrl}
        onClose={() => setCreatedAppointment(null)}
        config={config}
      />
    </motion.section>
  );
};

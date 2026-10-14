import React from 'react';
import { X, Shield, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ClinicConfig } from '../types/clinic';
import { smoothEasing } from './SectionTransition';

interface LegalModalProps {
  type: 'privacy' | 'terms' | null;
  onClose: () => void;
  config: ClinicConfig;
}

export const LegalModal: React.FC<LegalModalProps> = ({ type, onClose, config }) => {
  return (
    <AnimatePresence>
      {type && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#16324F]/70 backdrop-blur-md overflow-y-auto"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.35, ease: smoothEasing }}
            className="relative w-full max-w-2xl bg-[#FFFFFF] rounded-3xl shadow-2xl border border-[#D5E7ED] p-6 sm:p-8 overflow-hidden my-auto max-h-[85vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-[#D5E7ED]">
              <div className="flex items-center gap-2">
                {type === 'privacy' ? (
                  <Shield className="w-5 h-5 text-[#2A9D8F]" />
                ) : (
                  <FileText className="w-5 h-5 text-[#2A9D8F]" />
                )}
                <h3 className="text-xl font-serif font-bold text-[#16324F]">
                  {type === 'privacy' ? 'Privacy Policy & Patient Data' : 'Terms & Conditions of Care'}
                </h3>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="p-1.5 text-[#667085] hover:text-[#16324F] rounded-full hover:bg-[#EAF4F7] transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="overflow-y-auto py-4 text-xs sm:text-sm text-[#667085] space-y-4 leading-relaxed">
              {type === 'privacy' ? (
                <>
                  <p>
                    <strong>Last Updated:</strong> March 2026.
                  </p>
                  <p>
                    At <strong>{config.clinicName}</strong>, led by {config.doctorName} in Chandigarh, patient privacy, medical ethics, and personal confidentiality are fundamental tenets of our healthcare practice.
                  </p>
                  <h4 className="font-semibold text-[#16324F] text-sm">1. Information We Collect</h4>
                  <p>
                    When you submit an appointment request on our website, we collect your full name, telephone number, WhatsApp contact, email address, preferred appointment timings, and any optional radiographs, clinical notes, or photographs you provide.
                  </p>
                  <h4 className="font-semibold text-[#16324F] text-sm">2. Purpose of Collection</h4>
                  <p>
                    Your information is used strictly to coordinate appointment availability, discuss diagnostic concerns, confirm clinical visits, and deliver personalized dental care. We do not sell, rent, or trade your personal health data to third-party commercial brokers.
                  </p>
                  <h4 className="font-semibold text-[#16324F] text-sm">3. Security Standards</h4>
                  <p>
                    Transmission of your appointment requests is secured with modern encryption. Access to patient records is restricted to licensed clinical and administrative staff.
                  </p>
                  <h4 className="font-semibold text-[#16324F] text-sm">4. Contacting Us Regarding Your Data</h4>
                  <p>
                    For questions regarding patient records or privacy inquiries, contact us at <strong>{config.clinicEmail}</strong> or visit our clinic at {config.clinicAddress}, {config.city}.
                  </p>
                </>
              ) : (
                <>
                  <p>
                    <strong>Last Updated:</strong> March 2026.
                  </p>
                  <p>
                    Welcome to <strong>{config.clinicName}</strong>. By accessing our website or requesting an appointment, you acknowledge the following healthcare terms:
                  </p>
                  <h4 className="font-semibold text-[#16324F] text-sm">1. Appointment Requests</h4>
                  <p>
                    Submitting an online appointment form constitutes a scheduling request and does not represent an instantaneous clinical reservation until confirmed directly by our clinic reception team via phone or WhatsApp.
                  </p>
                  <h4 className="font-semibold text-[#16324F] text-sm">2. Clinical Evaluation & Treatment Plans</h4>
                  <p>
                    All medical or aesthetic estimations discussed online or over preliminary channels are tentative. Definitive treatment options, procedural risks, and finalized fee schedules require an in-person clinical and radiographic examination by Dr XYZ.
                  </p>
                  <h4 className="font-semibold text-[#16324F] text-sm">3. Emergency Situations</h4>
                  <p>
                    For acute dental trauma, uncontrolled hemorrhaging, or severe facial swelling, please call our clinic emergency line or visit the nearest hospital emergency department immediately rather than awaiting online correspondence.
                  </p>
                </>
              )}
            </div>

            <div className="pt-4 border-t border-[#D5E7ED] flex justify-end">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2 text-xs font-semibold text-[#16324F] bg-[#EAF4F7] hover:bg-[#D8ECF2] border border-[#D5E7ED] rounded-xl transition-colors cursor-pointer"
              >
                I Understand
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

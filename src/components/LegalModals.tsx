import React from 'react';
import { X, Shield, FileText } from 'lucide-react';
import { ClinicConfig } from '../types/clinic';

interface LegalModalProps {
  type: 'privacy' | 'terms' | null;
  onClose: () => void;
  config: ClinicConfig;
}

export const LegalModal: React.FC<LegalModalProps> = ({ type, onClose, config }) => {
  if (!type) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/60 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-white/80 p-6 sm:p-8 overflow-hidden my-auto max-h-[85vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            {type === 'privacy' ? (
              <Shield className="w-5 h-5 text-teal-600" />
            ) : (
              <FileText className="w-5 h-5 text-teal-600" />
            )}
            <h3 className="text-xl font-serif font-bold text-slate-900">
              {type === 'privacy' ? 'Privacy Policy & Patient Data' : 'Terms & Conditions of Care'}
            </h3>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="overflow-y-auto py-4 text-xs sm:text-sm text-slate-600 space-y-4 leading-relaxed">
          {type === 'privacy' ? (
            <>
              <p>
                <strong>Last Updated:</strong> March 2026.
              </p>
              <p>
                At <strong>{config.clinicName}</strong>, led by {config.doctorName} in Chandigarh, patient privacy, medical ethics, and personal confidentiality are fundamental tenets of our healthcare practice.
              </p>
              <h4 className="font-semibold text-slate-900 text-sm">1. Information We Collect</h4>
              <p>
                When you submit an appointment request on our website, we collect your full name, telephone number, WhatsApp contact, email address, preferred appointment timings, and any optional radiographs, clinical notes, or photographs you provide.
              </p>
              <h4 className="font-semibold text-slate-900 text-sm">2. Purpose of Collection</h4>
              <p>
                Your information is used strictly to coordinate appointment availability, discuss diagnostic concerns, confirm clinical visits, and deliver personalized dental care. We do not sell, rent, or trade your personal health data to third-party commercial brokers.
              </p>
              <h4 className="font-semibold text-slate-900 text-sm">3. Security Standards</h4>
              <p>
                Transmission of your appointment requests is secured with modern encryption. Access to patient records is restricted to licensed clinical and administrative staff.
              </p>
              <h4 className="font-semibold text-slate-900 text-sm">4. Contacting Us Regarding Your Data</h4>
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
              <h4 className="font-semibold text-slate-900 text-sm">1. Appointment Requests</h4>
              <p>
                Submitting an online appointment form constitutes a scheduling request and does not represent an instantaneous clinical reservation until confirmed directly by our clinic reception team via phone or WhatsApp.
              </p>
              <h4 className="font-semibold text-slate-900 text-sm">2. Clinical Evaluation & Treatment Plans</h4>
              <p>
                All medical or aesthetic estimations discussed online or over preliminary channels are tentative. Definitive treatment options, procedural risks, and finalized fee schedules require an in-person clinical and radiographic examination by Dr Aryan.
              </p>
              <h4 className="font-semibold text-slate-900 text-sm">3. Emergency Situations</h4>
              <p>
                For acute dental trauma, uncontrolled hemorrhaging, or severe facial swelling, please call our clinic emergency line or visit the nearest hospital emergency department immediately rather than awaiting online correspondence.
              </p>
            </>
          )}
        </div>

        <div className="pt-4 border-t border-slate-100 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl"
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { X, Save, RefreshCw, CheckCircle2, Clock, Phone, Mail, MapPin, Calendar, FileText, User } from 'lucide-react';
import { ClinicConfig, AppointmentRequest } from '../types/clinic';

interface ClinicSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: ClinicConfig;
  onUpdateConfig: (updated: ClinicConfig) => void;
}

export const ClinicSettingsModal: React.FC<ClinicSettingsModalProps> = ({
  isOpen,
  onClose,
  config,
  onUpdateConfig,
}) => {
  const [activeTab, setActiveTab] = useState<'appointments' | 'settings'>('appointments');
  const [formData, setFormData] = useState<ClinicConfig>(config);
  const [isSaving, setIsSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [appointmentsList, setAppointmentsList] = useState<AppointmentRequest[]>([]);
  const [isLoadingAppointments, setIsLoadingAppointments] = useState(false);

  useEffect(() => {
    setFormData(config);
  }, [config]);

  useEffect(() => {
    if (isOpen) {
      fetchAppointments();
    }
  }, [isOpen]);

  const fetchAppointments = async () => {
    setIsLoadingAppointments(true);
    try {
      const res = await fetch('/api/appointments');
      const data = await res.json();
      if (data.success && Array.isArray(data.appointments)) {
        setAppointmentsList(data.appointments);
      }
    } catch (e) {
      console.error('Failed to fetch appointments:', e);
    } finally {
      setIsLoadingAppointments(false);
    }
  };

  const handleStatusChange = async (id: string, newStatus: 'pending' | 'confirmed' | 'contacted') => {
    try {
      const res = await fetch(`/api/appointments/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setAppointmentsList((prev) =>
          prev.map((a) => (a.id === id ? { ...a, status: newStatus } : a))
        );
      }
    } catch (e) {
      console.error('Failed to update appointment status:', e);
    }
  };

  const handleSaveConfig = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSavedSuccess(false);

    try {
      const res = await fetch('/api/config', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
        onUpdateConfig(data.config);
        setSavedSuccess(true);
        setTimeout(() => setSavedSuccess(false), 3000);
      }
    } catch (e) {
      console.error('Failed to save config:', e);
    } finally {
      setIsSaving(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/60 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-white/80 overflow-hidden my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 sm:px-8 py-5 bg-white/95 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="text-xl font-serif font-bold text-slate-900">
              Dr Aryan — Front Desk & Configuration
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Review live appointment requests and update clinic contact details.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Controls */}
        <div className="px-6 sm:px-8 pt-4 pb-2 border-b border-slate-100 flex items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveTab('appointments')}
            className={`px-4 py-2 text-xs font-semibold rounded-xl transition-colors cursor-pointer ${
              activeTab === 'appointments'
                ? 'bg-slate-900 text-white'
                : 'bg-slate-100 text-slate-600 hover:text-slate-900'
            }`}
          >
            Appointment Requests ({appointmentsList.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('settings')}
            className={`px-4 py-2 text-xs font-semibold rounded-xl transition-colors cursor-pointer ${
              activeTab === 'settings'
                ? 'bg-slate-900 text-white'
                : 'bg-slate-100 text-slate-600 hover:text-slate-900'
            }`}
          >
            Clinic Details & Contacts
          </button>
        </div>

        {/* Tab Content */}
        <div className="overflow-y-auto p-6 sm:p-8 flex-1">
          {activeTab === 'appointments' ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-500">
                  Real-time list of inquiries from the booking form.
                </span>
                <button
                  type="button"
                  onClick={fetchAppointments}
                  className="inline-flex items-center gap-1.5 text-xs text-teal-800 hover:text-teal-950 font-semibold cursor-pointer"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isLoadingAppointments ? 'animate-spin' : ''}`} />
                  <span>Refresh List</span>
                </button>
              </div>

              {appointmentsList.length === 0 ? (
                <div className="p-12 text-center text-slate-400 text-sm">
                  No appointment requests yet. Submit one through the booking form to see it here!
                </div>
              ) : (
                <div className="space-y-3">
                  {appointmentsList.map((apt) => (
                    <div
                      key={apt.id}
                      className="p-5 rounded-2xl border border-slate-200/80 bg-slate-50/50 hover:bg-slate-50 transition-colors"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-semibold text-slate-900 text-sm sm:text-base">
                              {apt.fullName}
                            </h4>
                            <span
                              className={`text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full ${
                                apt.status === 'confirmed'
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : apt.status === 'contacted'
                                  ? 'bg-sky-100 text-sky-800'
                                  : 'bg-amber-100 text-amber-800'
                              }`}
                            >
                              {apt.status}
                            </span>
                          </div>
                          <span className="text-xs text-slate-400">
                            Requested for {apt.preferredDate} at {apt.preferredTime}
                          </span>
                        </div>

                        {/* Status Select */}
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-slate-500">Status:</span>
                          <select
                            value={apt.status}
                            onChange={(e) =>
                              handleStatusChange(
                                apt.id,
                                e.target.value as 'pending' | 'confirmed' | 'contacted'
                              )
                            }
                            className="text-xs px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white font-medium text-slate-700"
                          >
                            <option value="pending">Pending</option>
                            <option value="contacted">Contacted</option>
                            <option value="confirmed">Confirmed</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-slate-600 mb-2">
                        <div><strong>Phone:</strong> {apt.phone}</div>
                        <div><strong>WhatsApp:</strong> {apt.whatsapp || apt.phone}</div>
                        <div><strong>Email:</strong> {apt.email}</div>
                      </div>

                      <div className="text-xs text-slate-700 bg-white p-2.5 rounded-xl border border-slate-100 mb-2">
                        <strong>Reason / Treatment:</strong> {apt.treatment}
                        {apt.message && <p className="mt-1 text-slate-500 italic">"{apt.message}"</p>}
                        {apt.attachmentName && (
                          <p className="mt-1 text-teal-700">📎 Attachment: {apt.attachmentName}</p>
                        )}
                      </div>

                      {/* Direct WhatsApp Action for Reception */}
                      <div className="flex items-center justify-end gap-2 pt-2">
                        <a
                          href={`https://wa.me/${apt.whatsapp ? apt.whatsapp.replace(/[^0-9]/g, '') : apt.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                            `Hi ${apt.fullName}, this is Dr Aryan's clinic regarding your appointment request for ${apt.treatment} on ${apt.preferredDate} at ${apt.preferredTime}.`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-teal-50 hover:bg-teal-100 text-teal-800 text-xs font-semibold border border-teal-200"
                        >
                          <span>Chat on Patient WhatsApp</span>
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <form onSubmit={handleSaveConfig} className="space-y-6">
              {savedSuccess && (
                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Clinic configuration updated successfully!</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Clinic Name
                  </label>
                  <input
                    type="text"
                    value={formData.clinicName}
                    onChange={(e) => setFormData({ ...formData, clinicName: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Doctor Name
                  </label>
                  <input
                    type="text"
                    value={formData.doctorName}
                    onChange={(e) => setFormData({ ...formData, doctorName: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Clinic Phone
                  </label>
                  <input
                    type="text"
                    value={formData.clinicPhone}
                    onChange={(e) => setFormData({ ...formData, clinicPhone: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Clinic WhatsApp Number (No + sign, e.g. 919876543210)
                  </label>
                  <input
                    type="text"
                    value={formData.whatsappNumber}
                    onChange={(e) => setFormData({ ...formData, whatsappNumber: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Clinic Email
                  </label>
                  <input
                    type="email"
                    value={formData.clinicEmail}
                    onChange={(e) => setFormData({ ...formData, clinicEmail: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Clinic Address
                  </label>
                  <input
                    type="text"
                    value={formData.clinicAddress}
                    onChange={(e) => setFormData({ ...formData, clinicAddress: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200"
                  />
                </div>
              </div>

              <div className="pt-2">
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Weekdays Timings
                </label>
                <input
                  type="text"
                  value={formData.openingHours.weekdays}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      openingHours: { ...formData.openingHours, weekdays: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 mb-2"
                />

                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Sunday Timings
                </label>
                <input
                  type="text"
                  value={formData.openingHours.sunday}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      openingHours: { ...formData.openingHours, sunday: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200"
                />
              </div>

              <button
                type="submit"
                disabled={isSaving}
                className="inline-flex items-center gap-2 px-6 py-2.5 text-xs font-semibold text-white bg-slate-900 hover:bg-teal-900 rounded-xl transition-colors cursor-pointer"
              >
                <Save className="w-3.5 h-3.5" />
                <span>{isSaving ? 'Saving Updates...' : 'Save Configuration'}</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

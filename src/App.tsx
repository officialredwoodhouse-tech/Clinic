/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { DEFAULT_CLINIC_CONFIG } from './data/clinicData';
import { ClinicConfig } from './types/clinic';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TrustBar } from './components/TrustBar';
import { AboutSection } from './components/AboutSection';
import { ServicesSection } from './components/ServicesSection';
import { FeaturedSmile } from './components/FeaturedSmile';
import { TechnologySection } from './components/TechnologySection';
import { PatientJourney } from './components/PatientJourney';
import { SmileGallery } from './components/SmileGallery';
import { TestimonialsSection } from './components/TestimonialsSection';
import { WhyChooseUs } from './components/WhyChooseUs';
import { FAQSection } from './components/FAQSection';
import { BookingSection } from './components/BookingSection';
import { ContactSection } from './components/ContactSection';
import { FinalCTA } from './components/FinalCTA';
import { Footer } from './components/Footer';
import { FloatingActions } from './components/FloatingActions';
import { LegalModal } from './components/LegalModals';

export default function App() {
  const [config, setConfig] = useState<ClinicConfig>(DEFAULT_CLINIC_CONFIG);
  const [legalModalType, setLegalModalType] = useState<'privacy' | 'terms' | null>(null);
  const [preselectedTreatment, setPreselectedTreatment] = useState<string | undefined>(undefined);

  // Sync config from backend on mount
  useEffect(() => {
    fetch('/api/config')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.config) {
          setConfig(data.config);
        }
      })
      .catch((err) => {
        console.warn('Using local clinic config:', err);
      });
  }, []);

  const handleOpenBooking = (treatment?: string) => {
    if (treatment) {
      setPreselectedTreatment(treatment);
    }
    const bookEl = document.getElementById('book');
    if (bookEl) {
      bookEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#F6F3EE] text-[#242922] font-sans selection:bg-[#203D32]/25 selection:text-[#183127] relative">
      {/* Top Navbar */}
      <Navbar
        config={config}
        onOpenBooking={() => handleOpenBooking()}
      />

      {/* Main Page Flow */}
      <main>
        {/* 1. Hero */}
        <Hero
          config={config}
          onOpenBooking={() => handleOpenBooking()}
        />

        {/* 2. Trust Bar */}
        <TrustBar />

        {/* 3. About Dr XYZ */}
        <AboutSection
          config={config}
          onOpenBooking={() => handleOpenBooking()}
        />

        {/* 4. Complete Services (12 Services + Dynamic Detail Modal) */}
        <ServicesSection
          config={config}
          onSelectServiceForBooking={(treatmentName) => handleOpenBooking(treatmentName)}
        />

        {/* 5. Featured Smile Section */}
        <FeaturedSmile
          config={config}
          onOpenBooking={() => handleOpenBooking('Smile Makeover')}
        />

        {/* 6. Technology & Digital Workflow */}
        <TechnologySection />

        {/* 7. Patient Journey Timeline */}
        <PatientJourney />

        {/* 8. Before & After Smile Gallery */}
        <SmileGallery />

        {/* 9. Testimonials */}
        <TestimonialsSection />

        {/* 10. Why Choose Dr XYZ */}
        <WhyChooseUs />

        {/* 11. FAQ Accordion */}
        <FAQSection />

        {/* 12. Book an Appointment Dedicated Section */}
        <BookingSection
          config={config}
          preselectedTreatment={preselectedTreatment}
          onClearPreselected={() => setPreselectedTreatment(undefined)}
        />

        {/* 13. Contact Us with Map & Hours */}
        <ContactSection
          config={config}
          onOpenBooking={() => handleOpenBooking()}
        />

        {/* 14. Final Call to Action */}
        <FinalCTA
          config={config}
          onOpenBooking={() => handleOpenBooking()}
        />
      </main>

      {/* Footer */}
      <Footer
        config={config}
        onOpenBooking={() => handleOpenBooking()}
        onOpenPrivacy={() => setLegalModalType('privacy')}
        onOpenTerms={() => setLegalModalType('terms')}
      />

      {/* Persistent Floating Actions (Desktop & Mobile compliant) */}
      <FloatingActions
        config={config}
        onOpenBooking={() => handleOpenBooking()}
      />

      {/* Legal Modals (Privacy & Terms) */}
      <LegalModal
        type={legalModalType}
        onClose={() => setLegalModalType(null)}
        config={config}
      />
    </div>
  );
}

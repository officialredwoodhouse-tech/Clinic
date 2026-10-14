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
import { MarqueeBanner } from './components/MarqueeBanner';
import { smoothScrollTo } from './components/SectionTransition';

export default function App() {
  const [config, setConfig] = useState<ClinicConfig>(DEFAULT_CLINIC_CONFIG);
  const [legalModalType, setLegalModalType] = useState<'privacy' | 'terms' | null>(null);
  const [preselectedTreatment, setPreselectedTreatment] = useState<string | undefined>(undefined);
  const [isAiAgentOpen, setIsAiAgentOpen] = useState(false);

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
    smoothScrollTo('book', 76, 700);
  };

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-[#667085] font-sans selection:bg-[#2A9D8F]/25 selection:text-[#16324F] relative">
      {/* Top Navbar */}
      <Navbar
        config={config}
        onOpenBooking={() => handleOpenBooking()}
      />

      {/* Main Page Flow - Wix WH-1187 Layout Structure */}
      <main>
        {/* Section 1: Hero ("A Higher Standard of Dental Care") */}
        <Hero
          config={config}
          onOpenBooking={() => handleOpenBooking()}
          onOpenAiAgent={() => setIsAiAgentOpen(true)}
        />

        {/* Section 2: Studio Philosophy / About ([ STUDIO PHILOSOPHY ]) */}
        <AboutSection
          config={config}
          onOpenBooking={() => handleOpenBooking()}
        />

        {/* Section 3: Clinical Services / Expertise ([ CLINICAL SERVICES ]) */}
        <ServicesSection
          config={config}
          onSelectServiceForBooking={(treatmentName) => handleOpenBooking(treatmentName)}
        />

        {/* Section 4: Patient Reviews / Testimonials ([ TESTIMONIALS ]) */}
        <TestimonialsSection />

        {/* Section 5: Editorial Call to Action ("Ready for a healthier smile?") */}
        <FinalCTA
          config={config}
          onOpenBooking={() => handleOpenBooking()}
        />

        {/* Section 6: Editorial Marquee Ribbon */}
        <MarqueeBanner clinicName={config.clinicName.toUpperCase()} variant="light" />

        {/* Section 7: Dedicated Consultation & Booking Desk */}
        <BookingSection
          config={config}
          preselectedTreatment={preselectedTreatment}
          onClearPreselected={() => setPreselectedTreatment(undefined)}
        />

        {/* Section 8: Studio Standards & Trust Bar */}
        <TrustBar />

        {/* Section 9: Featured Smile & Before & After Aesthetic Gallery */}
        <FeaturedSmile
          config={config}
          onOpenBooking={() => handleOpenBooking('Smile Makeover')}
        />
        <SmileGallery />

        {/* Section 10: Advanced Clinical Technology & Diagnostic Workflow */}
        <TechnologySection />

        {/* Section 11: Patient Journey & Practice Advantages */}
        <PatientJourney />
        <WhyChooseUs />

        {/* Section 12: Frequently Asked Questions */}
        <FAQSection />

        {/* Section 13: Contact Information & Surgery Location */}
        <ContactSection
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
        onOpenBooking={(treatment) => handleOpenBooking(treatment)}
        externalChatOpen={isAiAgentOpen}
        onExternalChatChange={setIsAiAgentOpen}
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

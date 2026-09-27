export interface ClinicConfig {
  clinicName: string;
  doctorName: string;
  doctorTitle: string;
  doctorRole: string;
  clinicEmail: string;
  clinicPhone: string;
  whatsappNumber: string; // international format e.g. 919876543210
  clinicAddress: string;
  city: string;
  state: string;
  googleMapsUrl: string;
  googleMapsEmbedUrl: string;
  openingHours: {
    weekdays: string;
    saturday: string;
    sunday: string;
  };
  instagramUrl: string;
  facebookUrl: string;
}

export interface ServiceDetail {
  id: string;
  number: string;
  title: string;
  shortDesc: string;
  category: string;
  image: string;
  detailedDescription: string;
  benefits: string[];
  treatmentOptions: {
    name: string;
    description: string;
    idealFor: string;
  }[];
  procedureSteps: string[];
  durationExpectation: string;
  careAdvice: string;
}

export interface AppointmentRequest {
  id: string;
  fullName: string;
  phone: string;
  whatsapp?: string;
  email: string;
  preferredDate: string;
  preferredTime: string;
  treatment: string;
  message?: string;
  hasAttachment?: boolean;
  attachmentName?: string;
  createdAt: string;
  status: 'pending' | 'confirmed' | 'contacted';
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Smile Makeovers' | 'Cosmetic Dentistry' | 'Whitening' | 'Restorative Dentistry' | 'Orthodontics';
  beforeImage: string;
  afterImage: string;
  caseDescription: string;
  treatmentDuration: string;
}

export interface TestimonialItem {
  id: string;
  patientName: string;
  treatment: string;
  rating: number;
  reviewText: string;
  date: string;
  source: 'Google Review' | 'Verified Patient';
}

export interface FAQItem {
  question: string;
  answer: string;
}

import 'dotenv/config';
import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import { GoogleGenAI, Type } from '@google/genai';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

function getAiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// In-memory data storage with sample seeded requests
let clinicConfig = {
  clinicName: 'Dr XYZ Dental & Aesthetic Care',
  doctorName: 'Dr XYZ',
  doctorTitle: 'BDS, MDS - Aesthetic Dentist & Oral Rehabilitation Specialist',
  doctorRole: 'Dental Surgeon & Clinical Director',
  clinicEmail: process.env.CLINIC_EMAIL || 'care@drxyzdental.in',
  clinicPhone: process.env.CLINIC_PHONE || '+91 98152 74390',
  whatsappNumber: process.env.WHATSAPP_NUMBER || '919815274390',
  clinicAddress: process.env.CLINIC_ADDRESS || 'SCO 142-143, Madhya Marg, Sector 9-C',
  city: 'Chandigarh',
  state: 'India',
  googleMapsUrl: 'https://maps.google.com/?q=Sector+9-C+Madhya+Marg+Chandigarh',
  googleMapsEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13716.486259163273!2d76.7725912!3d30.7414821!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390fed0be678538b%3A0x6758e5e347432f7a!2sSector%209%2C%20Chandigarh!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin',
  openingHours: {
    weekdays: 'Monday – Saturday: 09:30 AM – 08:00 PM',
    saturday: 'Saturday: 09:30 AM – 08:00 PM',
    sunday: 'Sunday: 10:00 AM – 02:00 PM (By Appointment)',
  },
  instagramUrl: 'https://instagram.com/drxyz_dental',
  facebookUrl: 'https://facebook.com/drxyzdental',
};

interface AppointmentRecord {
  id: string;
  fullName: string;
  phone: string;
  whatsapp?: string;
  email: string;
  preferredDate: string;
  preferredTime: string;
  treatment: string;
  message?: string;
  attachmentName?: string;
  createdAt: string;
  status: 'pending' | 'confirmed' | 'contacted';
  notes?: string;
}

const appointments: AppointmentRecord[] = [
  {
    id: 'apt-001',
    fullName: 'Harpreet Singh',
    phone: '+91 98140 12345',
    whatsapp: '+91 98140 12345',
    email: 'harpreet.s@example.com',
    preferredDate: '2026-10-02',
    preferredTime: '11:00 AM',
    treatment: 'Dental Implant',
    message: 'Seeking consultation for missing molar replacement and 3D scan.',
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    status: 'confirmed',
    notes: 'Confirmed for 11:00 AM, CBCT scan scheduled.'
  },
  {
    id: 'apt-002',
    fullName: 'Simran Kaur',
    phone: '+91 98720 98765',
    whatsapp: '+91 98720 98765',
    email: 'simran.k@example.com',
    preferredDate: '2026-10-04',
    preferredTime: '04:30 PM',
    treatment: 'Smile Makeover',
    message: 'Interested in composite bonding or porcelain veneers for upper front teeth.',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    status: 'pending'
  }
];

interface ChatInquiryRecord {
  id: string;
  name: string;
  contact: string;
  channel: 'whatsapp' | 'email';
  topic: string;
  message: string;
  createdAt: string;
}

const chatInquiries: ChatInquiryRecord[] = [];

// Anti-spam rate limiting map
const ipRateLimit = new Map<string, number>();

// API Routes
app.get('/api/config', (req: Request, res: Response) => {
  res.json({ success: true, config: clinicConfig });
});

function buildClinicFallbackAiReply(userMessage: string): {
  reply: string;
  recommendedTreatment?: string;
  followUpQuestions: string[];
} {
  const q = userMessage.toLowerCase();
  if (q.includes('pain') || q.includes('ache') || q.includes('emergency') || q.includes('swelling') || q.includes('root canal')) {
    return {
      reply: `If you are experiencing tooth pain or sensitivity, ${clinicConfig.doctorName} provides gentle, microscopic Root Canal Treatment and same-day emergency pain relief at our Sector 9-C, Chandigarh clinic. Using modern local anesthesia and rotary endodontics, most root canals are completed comfortably in a single 45–60 minute visit.`,
      recommendedTreatment: 'Root Canal',
      followUpQuestions: [
        'Book an urgent tooth pain check-up',
        'Is root canal treatment painful?',
        'What are your clinic timings today?',
      ],
    };
  }
  if (q.includes('implant') || q.includes('missing')) {
    return {
      reply: `At ${clinicConfig.clinicName}, ${clinicConfig.doctorName} uses 3D Cone Beam CT (CBCT) guided planning for surgical-grade Titanium and Zirconia Dental Implants. Implants preserve jawbone health and function just like natural teeth without affecting adjacent healthy teeth.`,
      recommendedTreatment: 'Dental Implant',
      followUpQuestions: [
        'How long does a dental implant procedure take?',
        'Schedule a 3D implant consultation',
        'What is the difference between implants and bridges?',
      ],
    };
  }
  if (q.includes('veneer') || q.includes('smile') || q.includes('cosmetic') || q.includes('whiten') || q.includes('yellow') || q.includes('stain')) {
    return {
      reply: `${clinicConfig.doctorName} specializes in Digital Smile Design, ultra-thin E.max porcelain veneers, composite edge bonding, and medical-grade in-office Teeth Whitening (lifting 4–8 shades in one 60-minute session with minimal sensitivity). You can preview your smile outcome before treatment begins.`,
      recommendedTreatment: 'Smile Makeover',
      followUpQuestions: [
        'How does Digital Smile Design work?',
        'How many shades brighter does whitening get?',
        'Book a Smile Makeover consultation',
      ],
    };
  }
  if (q.includes('brace') || q.includes('aligner') || q.includes('ortho') || q.includes('crooked') || q.includes('gap')) {
    return {
      reply: `We offer transparent Clear Aligners as well as self-ligating ceramic and metal braces for children, teens, and adults. Digital 3D intraoral scanning replaces messy impression trays and maps your tooth movement step by step.`,
      recommendedTreatment: 'Braces / Aligners',
      followUpQuestions: [
        'Are clear aligners suitable for adults?',
        'How long does aligner treatment take?',
        'Book an orthodontic assessment',
      ],
    };
  }
  if (q.includes('time') || q.includes('hour') || q.includes('location') || q.includes('address') || q.includes('where') || q.includes('open')) {
    return {
      reply: `${clinicConfig.clinicName} is located at ${clinicConfig.clinicAddress}, ${clinicConfig.city}. Our clinic hours are ${clinicConfig.openingHours.weekdays}, and ${clinicConfig.openingHours.sunday}. You can call or WhatsApp us directly at ${clinicConfig.clinicPhone}.`,
      recommendedTreatment: 'General Check-up',
      followUpQuestions: [
        'Book an appointment for tomorrow',
        'Do you have parking at Sector 9-C?',
        'What should I bring to my first visit?',
      ],
    };
  }
  if (q.includes('cost') || q.includes('price') || q.includes('fee') || q.includes('charge')) {
    return {
      reply: `At ${clinicConfig.clinicName}, every treatment plan includes an upfront, itemized cost estimate following a clinical and digital diagnostic assessment by ${clinicConfig.doctorName}. We provide multiple restorative and aesthetic material options so you can choose what best fits your goals and budget.`,
      recommendedTreatment: 'General Check-up',
      followUpQuestions: [
        'Book a diagnostic check-up',
        'Do you offer zirconia crowns and veneers?',
        'How can I share my dental X-ray?',
      ],
    };
  }

  return {
    reply: `Hello! I am the 24/7 AI Dental Concierge for ${clinicConfig.clinicName} in Chandigarh. I can help you with information about our 12 clinical treatments (including Dental Implants, Painless Root Canals, Smile Makeovers, Clear Aligners, and Teeth Whitening), clinic timings at Sector 9-C, or booking a consultation with ${clinicConfig.doctorName}. How can I help your smile today?`,
    recommendedTreatment: 'General Check-up',
    followUpQuestions: [
      'I have tooth pain — what should I do?',
      'Tell me about Smile Makeovers & Veneers',
      'What are your clinic hours and address?',
    ],
  };
}

app.post('/api/ai-agent', async (req: Request, res: Response) => {
  try {
    const { message, history } = req.body;
    if (!message || typeof message !== 'string' || !message.trim()) {
      return res.status(400).json({ success: false, message: 'Please provide a question or message.' });
    }

    const userText = message.trim();
    const ai = getAiClient();

    if (!ai) {
      const fallback = buildClinicFallbackAiReply(userText);
      return res.json({
        success: true,
        ...fallback,
      });
    }

    const systemInstruction = `You are the 24/7 AI Dental Concierge for "${clinicConfig.clinicName}", a premier modern dental clinic in Chandigarh, India led by ${clinicConfig.doctorName} (${clinicConfig.doctorTitle}, ${clinicConfig.doctorRole}).

Clinic Details:
- Address: ${clinicConfig.clinicAddress}, ${clinicConfig.city}, ${clinicConfig.state} (160009)
- Phone & WhatsApp: ${clinicConfig.clinicPhone} (WhatsApp: +${clinicConfig.whatsappNumber})
- Support Email: ${clinicConfig.clinicEmail}
- Opening Hours: ${clinicConfig.openingHours.weekdays}; ${clinicConfig.openingHours.sunday}
- 12 Core Services Offered:
  1. General Dentistry (Routine check-ups, ultrasonic scaling & polishing, tooth-colored biomimetic composite fillings)
  2. Root Canal Treatment (Single-sitting rotary endodontics, microscopic precision, painless anesthesia protocols)
  3. Dental Implants (3D CBCT guided titanium & zirconia implants, full-arch rehabilitation)
  4. Cosmetic Dentistry (Aesthetic bonding, enameloplasty, laser gum contouring)
  5. Smile Makeovers (Digital Smile Design, E.max ceramic veneers, mock-up preview before treatment)
  6. Teeth Whitening (In-office LED photo-activated whitening lifting 4-8 shades in 60 mins, custom home kits)
  7. Braces & Orthodontics (Transparent Clear Aligners, ceramic brackets, metal braces, pediatric interceptive ortho)
  8. Crowns & Bridges (CAD/CAM monolithic Zirconia, E.max all-ceramic crowns)
  9. Gum Treatment (Deep scaling & root planing, laser pocket decontamination, bleeding gum care)
  10. Wisdom Tooth Removal (3D nerve-mapped atraumatic third molar extraction)
  11. Pediatric Dentistry (Zero-fear kids' dental care, pit & fissure sealants, fluoride therapy)
  12. Dentures & Tooth Replacement (Flexible Valplast partials, BPS complete dentures, cast partials)

Guidelines:
- Keep answers warm, reassuring, clinically clear, and concise (2 to 4 short sentences).
- Never diagnose definitively; always note that a personalized in-clinic examination with ${clinicConfig.doctorName} confirms the final treatment plan.
- Pick the closest matching recommendedTreatment from: "General Check-up", "Teeth Cleaning", "Tooth Pain", "Root Canal", "Dental Implant", "Braces / Aligners", "Teeth Whitening", "Cosmetic Dentistry", "Smile Makeover", "Wisdom Tooth", "Gum Problem", "Pediatric Dentistry", or "Other".
- Provide 2 or 3 short, helpful followUpQuestions the patient might want to ask next.`;

    const recentHistory = Array.isArray(history)
      ? history
          .slice(-6)
          .map((h: { sender?: string; text?: string }) =>
            `${h.sender === 'user' ? 'Patient' : 'AI Concierge'}: ${h.text || ''}`
          )
          .join('\n')
      : '';

    const fullPrompt = recentHistory
      ? `Conversation so far:\n${recentHistory}\n\nPatient's new message: ${userText}`
      : `Patient's message: ${userText}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: fullPrompt,
      config: {
        systemInstruction,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            reply: {
              type: Type.STRING,
              description: 'Warm, helpful, concise response from the 24/7 AI Dental Concierge.',
            },
            recommendedTreatment: {
              type: Type.STRING,
              description: 'Recommended booking treatment category if applicable.',
            },
            followUpQuestions: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: '2 to 3 short suggested follow-up questions.',
            },
          },
          required: ['reply', 'recommendedTreatment', 'followUpQuestions'],
        },
      },
    });

    const rawText = response.text;
    if (rawText) {
      const parsed = JSON.parse(rawText.trim());
      return res.json({
        success: true,
        reply: parsed.reply,
        recommendedTreatment: parsed.recommendedTreatment || 'General Check-up',
        followUpQuestions: Array.isArray(parsed.followUpQuestions)
          ? parsed.followUpQuestions.slice(0, 3)
          : [],
      });
    }

    const fallback = buildClinicFallbackAiReply(userText);
    return res.json({ success: true, ...fallback });
  } catch (error) {
    console.error('AI Agent error, using clinic knowledge fallback:', error);
    const fallback = buildClinicFallbackAiReply(String(req.body?.message || ''));
    return res.json({
      success: true,
      ...fallback,
    });
  }
});

app.post('/api/chat-inquiry', (req: Request, res: Response) => {
  try {
    const { name, contact, channel, topic, message } = req.body;
    if (!message || typeof message !== 'string' || !message.trim()) {
      return res.status(400).json({ success: false, message: 'Please enter a message.' });
    }

    const senderName = (name && typeof name === 'string' && name.trim()) ? name.trim() : 'Website Visitor';
    const senderContact = (contact && typeof contact === 'string' && contact.trim()) ? contact.trim() : 'Not provided';
    const selectedTopic = (topic && typeof topic === 'string' && topic.trim()) ? topic.trim() : 'General Inquiry';
    const selectedChannel: 'whatsapp' | 'email' = channel === 'email' ? 'email' : 'whatsapp';

    const record: ChatInquiryRecord = {
      id: `chat-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 5)}`,
      name: senderName,
      contact: senderContact,
      channel: selectedChannel,
      topic: selectedTopic,
      message: message.trim(),
      createdAt: new Date().toISOString(),
    };

    chatInquiries.unshift(record);

    const formattedWhatsApp = `Hi ${clinicConfig.doctorName},
*Topic:* ${record.topic}
*Name:* ${record.name}
${record.contact !== 'Not provided' ? `*Contact:* ${record.contact}\n` : ''}*Message:* ${record.message}`;

    const whatsappUrl = `https://wa.me/${clinicConfig.whatsappNumber}?text=${encodeURIComponent(formattedWhatsApp)}`;

    const emailSubject = `[Live Chat: ${record.topic}] Inquiry from ${record.name}`;
    const emailBody = `Hello ${clinicConfig.doctorName} Clinic Team,

You have received a direct message via the website Live Chat widget:

Name: ${record.name}
Contact: ${record.contact}
Topic: ${record.topic}

Message:
${record.message}

---
Sent from ${clinicConfig.clinicName} Website`;

    const mailtoUrl = `mailto:${clinicConfig.clinicEmail}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;

    return res.status(201).json({
      success: true,
      inquiry: record,
      whatsappUrl,
      mailtoUrl,
      reply: selectedChannel === 'whatsapp'
        ? `Thanks ${senderName}! Your message is ready for WhatsApp (+${clinicConfig.whatsappNumber}). Click below if WhatsApp did not open automatically.`
        : `Thanks ${senderName}! Your message has been logged for ${clinicConfig.clinicEmail}. You can also open it directly in your email client below.`,
    });
  } catch (error) {
    console.error('Error handling chat inquiry:', error);
    return res.status(500).json({ success: false, message: 'Failed to process message.' });
  }
});

app.put('/api/config', (req: Request, res: Response) => {
  try {
    const updates = req.body;
    clinicConfig = {
      ...clinicConfig,
      ...updates,
      openingHours: {
        ...clinicConfig.openingHours,
        ...(updates.openingHours || {})
      }
    };
    res.json({ success: true, config: clinicConfig, message: 'Clinic configuration updated successfully.' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update configuration.' });
  }
});

app.get('/api/appointments', (req: Request, res: Response) => {
  res.json({ success: true, count: appointments.length, appointments });
});

app.patch('/api/appointments/:id/status', (req: Request, res: Response) => {
  const { id } = req.params;
  const { status, notes } = req.body;
  const item = appointments.find((a) => a.id === id);
  if (!item) {
    return res.status(404).json({ success: false, message: 'Appointment not found' });
  }
  if (status) item.status = status;
  if (notes !== undefined) item.notes = notes;
  res.json({ success: true, appointment: item });
});

app.post('/api/appointments', (req: Request, res: Response) => {
  try {
    const {
      fullName,
      phone,
      whatsapp,
      email,
      preferredDate,
      preferredTime,
      treatment,
      message,
      attachmentName,
      honeypot // anti-spam field
    } = req.body;

    // 1. Spam protection
    if (honeypot) {
      // Silently discard bot submissions
      return res.status(200).json({ success: true, message: 'Appointment request received.' });
    }

    // 2. Rate limiting check
    const clientIp = req.ip || req.socket.remoteAddress || 'unknown';
    const lastRequest = ipRateLimit.get(clientIp);
    const now = Date.now();
    if (lastRequest && now - lastRequest < 3000) {
      return res.status(429).json({ success: false, message: 'Please wait a moment before submitting again.' });
    }
    ipRateLimit.set(clientIp, now);

    // 3. Validation
    if (!fullName || typeof fullName !== 'string' || fullName.trim().length < 2) {
      return res.status(400).json({ success: false, message: 'Please provide your full name.' });
    }
    if (!phone || typeof phone !== 'string' || phone.trim().length < 8) {
      return res.status(400).json({ success: false, message: 'Please provide a valid phone number.' });
    }
    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return res.status(400).json({ success: false, message: 'Please provide a valid email address.' });
    }
    if (!preferredDate) {
      return res.status(400).json({ success: false, message: 'Please choose your preferred appointment date.' });
    }
    if (!preferredTime) {
      return res.status(400).json({ success: false, message: 'Please choose your preferred time slot.' });
    }
    if (!treatment) {
      return res.status(400).json({ success: false, message: 'Please select a treatment or reason for visit.' });
    }

    // 4. Create record
    const newAppointment: AppointmentRecord = {
      id: `apt-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 6)}`,
      fullName: fullName.trim(),
      phone: phone.trim(),
      whatsapp: (whatsapp && whatsapp.trim()) || phone.trim(),
      email: email.trim(),
      preferredDate,
      preferredTime,
      treatment,
      message: message ? message.trim() : '',
      attachmentName: attachmentName || undefined,
      createdAt: new Date().toISOString(),
      status: 'pending'
    };

    appointments.unshift(newAppointment);

    // 5. Build WhatsApp Notification Text for Clinic
    const clinicWhatsAppText = `🦷 *NEW APPOINTMENT REQUEST*

*Name:* ${newAppointment.fullName}
*Phone:* ${newAppointment.phone}
*WhatsApp:* ${newAppointment.whatsapp}
*Email:* ${newAppointment.email}
*Preferred Date:* ${newAppointment.preferredDate}
*Preferred Time:* ${newAppointment.preferredTime}
*Treatment:* ${newAppointment.treatment}
*Message:* ${newAppointment.message || 'None provided'}
${newAppointment.attachmentName ? `*Attachment:* ${newAppointment.attachmentName}` : ''}

_Please contact the patient to confirm the appointment._`;

    // 6. Build Direct WhatsApp URL to Clinic
    const encodedClinicWhatsApp = encodeURIComponent(clinicWhatsAppText);
    const clinicWhatsAppUrl = `https://wa.me/${clinicConfig.whatsappNumber}?text=${encodedClinicWhatsApp}`;

    // 7. Build Automated Confirmation Email Payload (Patient)
    const patientEmailSubject = `Appointment Request Received — ${clinicConfig.clinicName}`;
    const patientEmailBody = `Hi ${newAppointment.fullName},

Thank you for contacting ${clinicConfig.doctorName} at ${clinicConfig.clinicName}.

We've received your appointment request for:
📅 Date: ${newAppointment.preferredDate}
⏰ Time: ${newAppointment.preferredTime}
🩺 Service: ${newAppointment.treatment}

Our clinic team in Chandigarh will contact you shortly via call or WhatsApp at ${newAppointment.phone} to confirm availability.

If you need immediate assistance or have acute pain, you can contact us directly on WhatsApp:
https://wa.me/${clinicConfig.whatsappNumber}

Warm regards,
${clinicConfig.doctorName}
${clinicConfig.clinicAddress}, ${clinicConfig.city}`;

    // 8. Build Clinic Notification Email Payload
    const clinicEmailSubject = `New Appointment Request: ${newAppointment.fullName} — ${newAppointment.treatment}`;
    const clinicEmailBody = `New patient appointment request received.

Patient: ${newAppointment.fullName}
Phone: ${newAppointment.phone}
WhatsApp: ${newAppointment.whatsapp}
Email: ${newAppointment.email}
Preferred Date: ${newAppointment.preferredDate}
Preferred Time: ${newAppointment.preferredTime}
Treatment: ${newAppointment.treatment}
Message: ${newAppointment.message || 'No additional message'}
${newAppointment.attachmentName ? `Attachment: ${newAppointment.attachmentName}` : ''}

Submitted at: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}`;

    res.status(201).json({
      success: true,
      message: 'Thank you. Your appointment request has been received. Our clinic team will contact you to confirm your appointment.',
      appointment: newAppointment,
      clinicWhatsAppUrl,
      clinicWhatsAppText,
      notifications: {
        patientEmail: {
          to: newAppointment.email,
          subject: patientEmailSubject,
          body: patientEmailBody
        },
        clinicEmail: {
          to: clinicConfig.clinicEmail,
          subject: clinicEmailSubject,
          body: clinicEmailBody
        }
      }
    });
  } catch (error: any) {
    console.error('Error handling appointment booking:', error);
    res.status(500).json({ success: false, message: 'An unexpected error occurred while processing your request.' });
  }
});

// Production or Dev Middleware
async function startServer() {
  // Explicit static file routes for public image assets (without intercepting Vite /src/* modules)
  const publicImagesDir = path.resolve(__dirname, 'public/assets/images');

  if (fs.existsSync(publicImagesDir)) {
    app.use('/assets/images', express.static(publicImagesDir));
    app.use('/images', express.static(publicImagesDir));
  }

  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    if (fs.existsSync(distPath)) {
      app.use(express.static(distPath));
      app.get('*', (_req: Request, res: Response) => {
        res.sendFile(path.resolve(distPath, 'index.html'));
      });
    }
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Dr XYZ Dental Clinic Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();

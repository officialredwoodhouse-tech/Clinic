import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// In-memory data storage with sample seeded requests
let clinicConfig = {
  clinicName: 'Dr Aryan Dental & Aesthetic Care',
  doctorName: 'Dr Aryan',
  doctorTitle: 'BDS, MDS - Oral & Maxillofacial Rehabilitation Specialist',
  doctorRole: 'Dental Surgeon & Clinical Director',
  clinicEmail: process.env.CLINIC_EMAIL || 'care@draryandental.in',
  clinicPhone: process.env.CLINIC_PHONE || '+91 62306 29383',
  whatsappNumber: process.env.WHATSAPP_NUMBER || '916230629383',
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
  instagramUrl: 'https://instagram.com/draryan_dental',
  facebookUrl: 'https://facebook.com/draryandental',
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

// Anti-spam rate limiting map
const ipRateLimit = new Map<string, number>();

// API Routes
app.get('/api/config', (req: Request, res: Response) => {
  res.json({ success: true, config: clinicConfig });
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
    console.log(`Dr Aryan Dental Clinic Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();

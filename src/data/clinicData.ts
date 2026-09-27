import { ClinicConfig, ServiceDetail, GalleryItem, TestimonialItem, FAQItem } from '../types/clinic';
import { heroClinicImg, doctorXyzImg, smileMakeoverImg, dentalTechImg } from '../assets/images';

export const DEFAULT_CLINIC_CONFIG: ClinicConfig = {
  clinicName: 'Dr XYZ Dental & Aesthetic Care',
  doctorName: 'Dr XYZ',
  doctorTitle: 'BDS, MDS - Aesthetic Dentist & Oral Rehabilitation Specialist',
  doctorRole: 'Dental Surgeon & Clinical Director',
  clinicEmail: 'care@drxyzdental.in',
  clinicPhone: '+91 98152 74390',
  whatsappNumber: '919815274390',
  clinicAddress: 'SCO 142-143, Madhya Marg, Sector 9-C',
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

export const CLINIC_SERVICES: ServiceDetail[] = [
  {
    id: 'general-dentistry',
    number: '01',
    title: 'General Dentistry',
    shortDesc: 'Routine dental examinations, preventive care, composite fillings, hygienic scaling, and long-term oral wellness.',
    category: 'Preventive & Essential',
    image: heroClinicImg,
    detailedDescription: 'General dentistry forms the foundational cornerstone of lifelong oral vitality. At Dr XYZ Dental, preventive check-ups utilize high-definition intraoral cameras and low-dose digital imaging to detect micro-cavities, structural enamel wear, and soft tissue changes long before they develop into painful conditions.',
    benefits: [
      'Early interception of asymptomatic decay and structural micro-cracks',
      'Gentle ultrasonic scaling to eliminate pathogenic tartar and stain accumulation',
      'Mercury-free biomimetic composite resin restorations color-matched to natural enamel',
      'Personalized oral wellness roadmap tailored to your saliva pH and bite forces'
    ],
    treatmentOptions: [
      {
        name: 'Comprehensive Diagnostic Check-up',
        description: 'Complete examination with digital x-rays, periodontal charting, and intraoral photographic review.',
        idealFor: 'Annual and bi-annual health reviews for all ages'
      },
      {
        name: 'Ultrasonic Biofilm & Tartar Scaling',
        description: 'Pain-managed deep prophylaxis removing subgingival plaque, accompanied by diamond-grit enamel polishing.',
        idealFor: 'Healthy gum maintenance and smoker/coffee stain removal'
      },
      {
        name: 'Biomimetic Tooth-Colored Fillings',
        description: 'Multi-layer composite bonding restoring natural tooth shape, biomechanics, and aesthetic translucency.',
        idealFor: 'Treating dental caries and replacing aged, dark amalgam fillings'
      }
    ],
    procedureSteps: [
      'Digital diagnostic imaging and intraoral camera tour',
      'Gentle ultrasonic plaque and calculus debridement',
      'Micro-abrasion preparation and composite placement if restoration is needed',
      'Bite check and preventative remineralization guidance'
    ],
    durationExpectation: '45 to 60 minutes per appointment',
    careAdvice: 'Brush twice daily with a soft-bristled brush, floss daily, and schedule regular reviews every 6 months.'
  },
  {
    id: 'root-canal-treatment',
    number: '02',
    title: 'Root Canal Treatment',
    shortDesc: 'Modern rotary endodontics designed to eliminate infection, relieve discomfort, and preserve your natural tooth.',
    category: 'Restorative & Endodontics',
    image: dentalTechImg,
    detailedDescription: 'Root canal therapy at Dr XYZ Dental is a precise, comfortable microsurgical procedure designed to rescue teeth with deep pulp inflammation or bacterial infection. Using advanced rotary nickel-titanium instruments, digital apex locators, and microscopic magnification, the canal is meticulously cleared, disinfected, and hermetically sealed.',
    benefits: [
      'Rapid relief from acute, throbbing tooth pain and sensitivity',
      'Preservation of your natural root architecture, maintaining bone density',
      'Comfort-focused protocol with profound computer-controlled local anesthesia',
      'Often completed in a single or dual comfortable sitting'
    ],
    treatmentOptions: [
      {
        name: 'Single-Sitting Rotary Endodontics',
        description: 'High-speed rotary treatment completed in one streamlined session for acute, non-abscessed pulpitis.',
        idealFor: 'Patients seeking prompt comfort with busy schedules'
      },
      {
        name: 'Multi-Sitting Regenerative Endodontics',
        description: 'Targeted intracanal antimicrobial medicament protocol for severe periapical infections or complex root anatomy.',
        idealFor: 'Large cysts, extensive abscesses, or curved canals'
      },
      {
        name: 'Post-Endodontic Fiber Core Rebuilding',
        description: 'Reinforcement of root treated tooth with quartz fiber posts prior to final crown placement.',
        idealFor: 'Severely broken-down crowns needing load-bearing strength'
      }
    ],
    procedureSteps: [
      'Painless local anesthesia and rubber dam isolation',
      'Micro-access and automated root canal cleaning with NiTi rotary files',
      'Deep antiseptic irrigation with ultrasonic activation',
      'Biocompatible gutta-percha 3D sealing and protective core buildup'
    ],
    durationExpectation: '60 to 75 minutes per session',
    careAdvice: 'Avoid chewing hard foods on the treated side until the definitive crown is cemented.'
  },
  {
    id: 'dental-implants',
    number: '03',
    title: 'Dental Implants',
    shortDesc: 'Permanent, medical-grade titanium and zirconia tooth replacements designed to look, feel, and function like natural teeth.',
    category: 'Surgical & Rehabilitation',
    image: dentalTechImg,
    detailedDescription: 'Dental implants represent the modern gold standard for restoring missing teeth. Dr XYZ utilizes 3D Cone Beam CT guided planning to digitally map bone density, sinus proximity, and nerve pathways before placing surgical-grade titanium fixtures that osseointegrate directly into your jaw.',
    benefits: [
      'Prevents irreversible jawbone resorption and facial contour sinking',
      'Independent restoration that spares adjacent healthy teeth from grinding',
      'Natural chewing power to comfortably enjoy all foods and nutrition',
      'Decades of clinical longevity with proper oral maintenance'
    ],
    treatmentOptions: [
      {
        name: 'Single Tooth Guided Implant',
        description: 'Digitally pre-planned implant placement topped with a custom screw-retained zirconia crown.',
        idealFor: 'Replacing an individual lost tooth seamlessly'
      },
      {
        name: 'Implant-Supported Multi-Unit Bridge',
        description: 'Anchoring 3 to 4 replacement teeth onto 2 solid dental implants.',
        idealFor: 'Spans of consecutive missing teeth'
      },
      {
        name: 'Full Arch Immediate Fixed Rehabilitation',
        description: 'Permanent hybrid bridges anchored on 4 to 6 precision implants.',
        idealFor: 'Completely edentulous patients or failing dentition'
      }
    ],
    procedureSteps: [
      '3D CBCT digital volumetric scan and virtual surgical planning',
      'Minimally invasive computer-guided implant fixture insertion',
      'Osseointegration healing interval with aesthetic temporary prosthesis',
      'Digital intraoral impression and final monolithic zirconia crown cementation'
    ],
    durationExpectation: 'Surgical phase: 45 min; Healing & final prosthetic: 2 to 4 months',
    careAdvice: 'Maintain impeccable hygiene with superfloss or water flosser and schedule biannual peri-implant evaluations.'
  },
  {
    id: 'cosmetic-dentistry',
    number: '04',
    title: 'Cosmetic Dentistry',
    shortDesc: 'Refine the symmetry, proportion, shade, and contour of your teeth with customized aesthetic dental enhancements.',
    category: 'Aesthetic Dentistry',
    image: smileMakeoverImg,
    detailedDescription: 'Cosmetic dentistry at Dr XYZ Dental is where clinical art meets dental science. Whether addressing minor gaps, intrinsic enamel discoloration, chipped edges, or asymmetrical gumlines, our treatments prioritize natural beauty, facial harmony, and minimal tooth reduction.',
    benefits: [
      'Harmonizes tooth proportions with your facial midline and lip contours',
      'Conservative approaches preserving the maximum amount of sound enamel',
      'Stain-resistant porcelain and composite materials for enduring radiance',
      'Predictable digital smile previews prior to initiating any irreversible treatment'
    ],
    treatmentOptions: [
      {
        name: 'Porcelain Laminate Veneers (E.max)',
        description: 'Ultra-thin, custom-sculpted ceramic shells bonded to front teeth for immaculate color and shape.',
        idealFor: 'Discolored, worn, uneven, or spaced anterior teeth'
      },
      {
        name: 'Direct Composite Edge Bonding',
        description: 'Chairside sculpting of premium nano-hybrid composite to repair chips and close diastemas in 1 visit.',
        idealFor: 'Minor imperfections, minor chips, and quick cosmetic enhancements'
      },
      {
        name: 'Aesthetic Laser Gingivoplasty',
        description: 'Gentle laser recontouring of irregular gum margins to balance a gummy or uneven smile.',
        idealFor: 'Patients with excessive gingival display or asymmetric gum levels'
      }
    ],
    procedureSteps: [
      'Facial aesthetic photography and smile analysis',
      'Digital diagnostic wax-up and chairside aesthetic mockup preview',
      'Micro-conservative enamel preparation and digital intraoral optical scan',
      'Precision laboratory fabrication and adhesive resin bonding'
    ],
    durationExpectation: '1 to 2 visits depending on chosen option',
    careAdvice: 'Wear a protective nightguard if you clench or grind, and avoid using teeth as opening tools.'
  },
  {
    id: 'smile-makeovers',
    number: '05',
    title: 'Smile Makeovers',
    shortDesc: 'A holistic, multidisciplinary transformation combining aesthetic and restorative treatments tailored to your smile vision.',
    category: 'Comprehensive Aesthetics',
    image: smileMakeoverImg,
    detailedDescription: 'A Smile Makeover is a comprehensive redesign of your visible smile. Dr XYZ evaluates facial symmetry, lip dynamics, gum architecture, bite kinematics, and skin undertones to craft a personalized harmony between health, function, and aesthetic perfection.',
    benefits: [
      'Full-spectrum correction of complex, multi-factorial dental concerns',
      'Bite-balanced longevity preventing jaw joint fatigue and tooth fracture',
      'Bespoke shade and texture customization mimicking natural tooth enamel gradation',
      'Confidence-transforming results that appear effortless, not artificial'
    ],
    treatmentOptions: [
      {
        name: 'Comprehensive Aesthetic Arch Reconstruction',
        description: 'Coordinated veneer, crown, and whitening suite restoring the upper aesthetic zone.',
        idealFor: 'Extensively worn, discolored, or mismatched dentition'
      },
      {
        name: 'Orthodontic + Restorative Dual Phase',
        description: 'Pre-alignment of teeth with clear aligners followed by conservative cosmetic edge bonding.',
        idealFor: 'Minimizing tooth trimming through smart alignment'
      },
      {
        name: 'Digital Smile Design (DSD) Protocol',
        description: 'Virtual 3D mock-up allowing you to see and test your final smile in real-time before treatment starts.',
        idealFor: 'Patients wanting complete visual certainty and trial verification'
      }
    ],
    procedureSteps: [
      'Comprehensive 3D photography, video kinematics, and digital intraoral scans',
      'Digital Smile Architecture design and physical 3D trial preview in mouth',
      'Harmonized phase treatments (whitening, periodontal balance, restorations)',
      'Delivery, occlusion balancing, and custom protective night-splint'
    ],
    durationExpectation: '2 to 4 visits over 2 to 3 weeks',
    careAdvice: 'Routine professional cleaning every 6 months to maintain high-luster ceramic polish.'
  },
  {
    id: 'teeth-whitening',
    number: '06',
    title: 'Teeth Whitening',
    shortDesc: 'Medical-grade in-office and take-home whitening protocols engineered to lift years of deep intrinsic and extrinsic stains.',
    category: 'Aesthetic Dentistry',
    image: smileMakeoverImg,
    detailedDescription: 'Professional teeth whitening under dental supervision is the safest and most effective method to brighten stained teeth. Dr XYZ utilizes pH-balanced formulations enriched with desensitizing agents that protect enamel crystals while breaking apart chromogen pigments from tea, coffee, wine, and aging.',
    benefits: [
      'Lifts teeth by 4 to 8 shades in a single monitored appointment',
      'Advanced potassium nitrate and fluoride technology minimizes sensitivity',
      'Even, consistent shade across the entire arch without patchy results',
      'Supervised clinical application protecting soft gums from chemical irritation'
    ],
    treatmentOptions: [
      {
        name: 'In-Office Clinical Power Whitening',
        description: 'Light-accelerated, high-concentration clinical bleaching delivering rapid brightness in 60 minutes.',
        idealFor: 'Upcoming weddings, speaking engagements, or instant visible results'
      },
      {
        name: 'Custom-Fitted Laboratory Take-Home Trays',
        description: 'Precision vacuum-formed trays with controlled-release carbamide peroxide for gradual home brightening.',
        idealFor: 'Gentle, self-paced whitening with long-term maintenance capability'
      },
      {
        name: 'Combination Brightening Suite',
        description: 'In-clinic jumpstart followed by custom maintenance trays for peak longevity.',
        idealFor: 'Patients with deep, stubborn tetracycline or fluorosis stains'
      }
    ],
    procedureSteps: [
      'Initial shade guide assessment and clinical photography',
      'Gingival barrier application to seal and safeguard delicate gum margins',
      'Three consecutive 15-minute cycles of professional whitening gel application',
      'Post-treatment remineralizing desensitizing treatment and shade re-measurement'
    ],
    durationExpectation: 'Single 60-minute in-office visit',
    careAdvice: 'Follow the "white diet" (no colored sauces, red wine, coffee, or smoking) for 48 hours following treatment.'
  },
  {
    id: 'braces-and-orthodontics',
    number: '07',
    title: 'Braces & Orthodontics',
    shortDesc: 'State-of-the-art alignment solutions including clear aligners, ceramic brackets, and interceptive orthodontic care.',
    category: 'Orthodontics & Alignment',
    image: dentalTechImg,
    detailedDescription: 'Orthodontic therapy corrects crowding, spacing, rotations, and malocclusions (overbites, crossbites, and underbites). Dr XYZ offers both invisible clear aligner therapy and aesthetic ceramic brackets, designing treatment for optimal facial aesthetics, airway health, and bite equilibrium.',
    benefits: [
      'Significantly easier cleaning, drastically reducing lifetime risk of decay and gum disease',
      'Relieves abnormal bite stress that causes enamel fracturing and TMJ discomfort',
      'Discrete options allowing adults and professionals to straighten teeth without self-consciousness',
      'Digital 3D simulation showing tooth movements from week 1 to finish'
    ],
    treatmentOptions: [
      {
        name: 'Clear Aligners System',
        description: 'Virtually undetectable, removable transparent medical polyurethane trays swapped every 1–2 weeks.',
        idealFor: 'Adults and teens seeking complete discretion, flexibility, and easy hygiene'
      },
      {
        name: 'Aesthetic Polycrystalline Ceramic Braces',
        description: 'Tooth-colored brackets that blend with natural enamel, paired with frosted aesthetic wires.',
        idealFor: 'Patients requiring complex torque and root control while maintaining subtle aesthetics'
      },
      {
        name: 'Low-Friction Self-Ligating Metal Braces',
        description: 'Smooth low-profile brackets with clip mechanisms for reduced friction and faster appointments.',
        idealFor: 'Comprehensive correction of severe crowding or jaw discrepancies'
      }
    ],
    procedureSteps: [
      '3D intraoral digital impression and cephalometric orthodontic analysis',
      'Virtual 3D treatment plan preview and biomechanical staging',
      'Placement of precision attachments or aesthetic brackets',
      'Regular progress monitoring and post-orthodontic custom retention'
    ],
    durationExpectation: '6 to 18 months depending on case severity',
    careAdvice: 'Wear clear aligners 20–22 hours daily; clean with lukewarm water and aligner foam.'
  },
  {
    id: 'crowns-and-bridges',
    number: '08',
    title: 'Crowns & Bridges',
    shortDesc: 'Precision-milled monolithic zirconia and ceramic restorations designed to rebuild fractured teeth and replace missing units.',
    category: 'Restorative Prosthetics',
    image: heroClinicImg,
    detailedDescription: 'When a tooth is severely broken down, heavily filled, or weakened by root canal therapy, a custom dental crown encapsulates the remaining tooth structure with high-strength ceramic. Fixed dental bridges span the gap created by one or more missing teeth, anchored securely to adjacent natural teeth.',
    benefits: [
      'Exceptional fracture resistance with high-translucency monolithic zirconia',
      'Digital CAD/CAM edge-seal precision preventing recurrent marginal decay',
      'Biocompatible and 100% metal-free, avoiding gray gumline shadows',
      'Restores authentic chewing functionality and anatomical tooth anatomy'
    ],
    treatmentOptions: [
      {
        name: 'Monolithic Multilayered Zirconia Crown',
        description: 'High-strength ceramic with natural translucency gradient matching natural tooth shades.',
        idealFor: 'Molars and premolars subject to heavy grinding forces'
      },
      {
        name: 'Lithium Disilicate (E.max) All-Ceramic Crown',
        description: 'Superior light reflection and lifelike opalescence closely matching front teeth.',
        idealFor: 'Incisors and canines in the prime aesthetic zone'
      },
      {
        name: 'CAD/CAM Fixed Ceramic Bridge',
        description: 'Connected multi-unit crown unit bridging spaces with natural pontic contours.',
        idealFor: 'Fixed tooth replacement when implant surgery is not preferred'
      }
    ],
    procedureSteps: [
      'Careful tooth preparation with rounded margins preserving maximum tooth structure',
      'Digital optical scanning eliminating messy traditional impression trays',
      'Immediate custom temporary crown placement for protection',
      'Final adhesive cementation and bite verification with articulating foil'
    ],
    durationExpectation: '2 appointments across 3 to 5 business days',
    careAdvice: 'Floss under bridge pontics with specialized threaders; avoid chewing ice or hard nuts.'
  },
  {
    id: 'gum-treatment',
    number: '09',
    title: 'Gum Treatment & Periodontics',
    shortDesc: 'Targeted therapies for bleeding gums, gingivitis, periodontal pockets, and bone preservation.',
    category: 'Periodontics & Gum Health',
    image: dentalTechImg,
    detailedDescription: 'Healthy gums are the biological anchor of every tooth. Gingival bleeding and chronic inflammation are early warning signs of periodontal disease, which can lead to bone loss and tooth mobility if left unmanaged. Dr XYZ utilizes targeted scaling, root planing, and antimicrobial irrigation to restore gum health.',
    benefits: [
      'Stops persistent gum bleeding, swelling, tenderness, and chronic bad breath (halitosis)',
      'Halts deep bacterial progression and preserves bone support around natural teeth',
      'Significantly lowers systemic inflammation associated with diabetes and cardiovascular risks',
      'Minimally invasive, comfort-managed treatments with rapid post-op recovery'
    ],
    treatmentOptions: [
      {
        name: 'Deep Scaling & Root Planing (SRP)',
        description: 'Subgingival debridement smoothing rough root surfaces to encourage gum re-attachment.',
        idealFor: 'Early to moderate periodontitis and pocket depths exceeding 4mm'
      },
      {
        name: 'Local Antimicrobial Subgingival Therapy',
        description: 'Placement of sustained-release antibiotic microspheres directly into active pockets.',
        idealFor: 'Isolated deep pockets that do not respond to mechanical scaling alone'
      },
      {
        name: 'Periodontal Splinting & Maintenance Therapy',
        description: 'Stabilization of slightly mobile teeth combined with tailored 3-month supportive recalls.',
        idealFor: 'Advanced periodontitis cases transitioning into long-term stability'
      }
    ],
    procedureSteps: [
      '6-point periodontal pocket depth measurement and bone level assessment',
      'Quadrant-based ultrasonic and hand instrument root smoothing',
      'Antiseptic pocket lavage and local medicament application',
      'Review at 4 to 6 weeks to re-chart pocket depth reduction'
    ],
    durationExpectation: '45 to 60 minutes per quadrant session',
    careAdvice: 'Adopt interdental brushes sized specifically for your interproximal gaps.'
  },
  {
    id: 'wisdom-tooth-removal',
    number: '10',
    title: 'Wisdom Tooth Removal',
    shortDesc: 'Gentle, surgical assessment and extraction of impacted or painful third molars with modern comfort protocols.',
    category: 'Oral Surgery',
    image: dentalTechImg,
    detailedDescription: 'Third molars frequently become partially or fully impacted due to lack of space in the jaw, leading to recurrent pericoronitis, cyst development, and damage to adjacent second molars. Dr XYZ performs gentle, planned extractions using 3D nerve mapping and atraumatic surgical techniques.',
    benefits: [
      'Resolves acute jaw stiffness, cheek swelling, and recurrent localized infections',
      'Protects adjacent second molars from hidden cervical resorption and caries',
      'Prevents orthodontic crowding and cysts within the posterior mandible',
      'Comprehensive post-operative recovery protocol minimizing swelling and downtime'
    ],
    treatmentOptions: [
      {
        name: 'Erupted Simple Wisdom Extraction',
        description: 'Atraumatic elevation and removal of fully erupted, accessible wisdom teeth.',
        idealFor: 'Wisdom teeth with cavities, hygiene difficulty, or opposing bite issues'
      },
      {
        name: 'Impacted Surgical Third Molar Removal',
        description: 'Precise sectioning of bone and tooth structure under local anesthesia to protect the inferior alveolar nerve.',
        idealFor: 'Horizontal, angular, or deeply bony impacted wisdom teeth'
      },
      {
        name: 'Coronectomy Protocol',
        description: 'Deliberate removal of the crown while leaving healthy root tips intact when touching the main nerve.',
        idealFor: 'Cases with extreme nerve intimacy verified on 3D CBCT'
      }
    ],
    procedureSteps: [
      'Digital diagnostic 3D imaging to verify exact relationship to mandibular nerve',
      'Profound local anesthesia ensuring total numbness of the surgical area',
      'Gentle tooth sectioning and conservative removal',
      'Dissolvable resorbable sutures and application of sterile hemostatic dressings'
    ],
    durationExpectation: '30 to 45 minutes per tooth',
    careAdvice: 'Apply ice packs intermittently for 24 hours, consume soft cold foods, and avoid spitting or using drinking straws.'
  },
  {
    id: 'pediatric-dentistry',
    number: '11',
    title: 'Pediatric Dentistry',
    shortDesc: 'Friendly, patient, and gentle dental care designed to nurture positive dental habits and healthy smiles in children.',
    category: 'Children’s Dentistry',
    image: heroClinicImg,
    detailedDescription: 'Early dental experiences shape a child’s attitude toward healthcare for the rest of their life. Our pediatric approach at Dr XYZ Dental is patient, warm, and zero-fear. We guide young smiles through preventive sealants, fluoridation, cavity restorations, and space management in a welcoming environment.',
    benefits: [
      'Builds trust, confidence, and positive associations with dental visits from an early age',
      'Protects deciduous milk teeth vital for nutrition, speech development, and adult tooth spacing',
      'Preventive pit and fissure sealants reduce chewing-surface decay by up to 80%',
      'Practical dietary and tooth-brushing coaching for parents'
    ],
    treatmentOptions: [
      {
        name: 'Preventive Pit & Fissure Sealants',
        description: 'Painless application of a protective resin barrier over deep molar grooves.',
        idealFor: 'Permanent molars as soon as they erupt around ages 6 and 12'
      },
      {
        name: 'Fluoride Varnish Enamel Strengthening',
        description: 'Concentrated topical remineralization therapy fortifying enamel against acid attacks.',
        idealFor: 'Children with high cavity risk or early demineralization white spots'
      },
      {
        name: 'Gentle Pediatric Restorations & Space Maintainers',
        description: 'Tooth-colored biocompatible fillings and space maintainers preserving premature tooth loss gaps.',
        idealFor: 'Treating milk tooth decay and maintaining proper dental arch spacing'
      }
    ],
    procedureSteps: [
      '"Tell-Show-Do" interactive introduction to dental instruments',
      'Gentle examination with count-the-teeth engagement',
      'Gentle cleaning, polishing, and preventive sealant or filling application',
      'Encouraging celebration and positive reinforcement'
    ],
    durationExpectation: '30 to 45 minutes',
    careAdvice: 'Assist children with nighttime brushing until approximately 7 to 8 years of age.'
  },
  {
    id: 'dentures-and-tooth-replacement',
    number: '12',
    title: 'Dentures & Tooth Replacement',
    shortDesc: 'Custom-crafted flexible, acrylic, and cast-partial prosthetics engineered for dependable stability, aesthetics, and comfort.',
    category: 'Prosthodontics',
    image: heroClinicImg,
    detailedDescription: 'For patients missing multiple teeth or full arches where implants are contraindicated or phased, custom prosthodontic dentures provide reliable restoration of chewing capability, lip fullness, and clear speech. Dr XYZ crafts lightweight, anatomically contoured appliances with lifelike gum tinting.',
    benefits: [
      'Restores masticatory chewing efficiency and speech articulation',
      'Provides structural support to cheeks and lips, rejuvenating lower facial height',
      'Lightweight modern materials ensuring comfortable mucosal fit and minimal friction',
      'Economical, non-surgical tooth replacement option accessible to seniors'
    ],
    treatmentOptions: [
      {
        name: 'High-Impact Aesthetic Complete Dentures',
        description: 'Upper and lower complete dentures crafted with cross-linked resin teeth and contoured gingival margins.',
        idealFor: 'Complete edentulous arches'
      },
      {
        name: 'Flexible Partial Dentures (Valplast / Flexible Nylon)',
        description: 'Metal-free, unbreakable flexible partials that snap gently around remaining teeth with invisible clasps.',
        idealFor: 'Patients desiring lightweight, discrete partial tooth replacement'
      },
      {
        name: 'Cast Partial Dentures (Cobalt-Chromium Framework)',
        description: 'Rigid, thin metal framework delivering exceptional bite stability and tissue-sparing load distribution.',
        idealFor: 'Long-term partial tooth replacement with sound remaining abutments'
      }
    ],
    procedureSteps: [
      'Preliminary anatomical impressions and diagnostic study models',
      'Border molding and master impression of mucosal contours',
      'Wax bite rim recording and aesthetic tooth try-in to verify appearance and speech',
      'Final denture delivery, pressure-point adjustment, and hygiene coaching'
    ],
    durationExpectation: '3 to 4 sequential visits for custom fabrication',
    careAdvice: 'Clean daily with non-abrasive denture cleanser and store in clean water overnight.'
  }
];

export const TRUST_PILLARS = [
  {
    title: 'Modern Technology',
    description: 'Advanced digital imaging, intraoral scanning, and precision workflows for predictable outcomes.'
  },
  {
    title: 'Personalized Care',
    description: 'Treatment plans meticulously tailored around your unique dental anatomy and individual goals.'
  },
  {
    title: 'Patient Comfort',
    description: 'A calm, hygienic and welcoming clinical environment designed to alleviate dental anxiety.'
  },
  {
    title: 'Comprehensive Dentistry',
    description: 'From routine preventive maintenance to complex full-mouth aesthetic and surgical rehabilitation.'
  }
];

export const TECHNOLOGY_ITEMS = [
  {
    title: 'Digital Dental Imaging',
    description: 'Ultra-low radiation digital radiovisiography providing instantaneous high-contrast visualization of internal tooth structures.'
  },
  {
    title: 'Digital X-Rays',
    description: 'Diagnostic sensor technology that minimizes radiation exposure by up to 80% compared to traditional dental films.'
  },
  {
    title: 'Intraoral Scanning',
    description: 'Eliminates messy, uncomfortable traditional impression trays with continuous 3D optical scanning in real-time.'
  },
  {
    title: 'Digital Smile Planning',
    description: 'Computer-aided aesthetic simulation mapping dental proportions against facial symmetry prior to any treatment.'
  },
  {
    title: 'Modern Sterilization Systems',
    description: 'Class-B medical autoclave autoclaving and multi-stage ultrasonic disinfection adhering to stringent international infection control protocols.'
  },
  {
    title: 'Advanced Rotary Endodontics',
    description: 'Precision electric micro-motors and NiTi rotary instruments delivering quiet, efficient, and comfortable root canal procedures.'
  }
];

export const PATIENT_JOURNEY_STEPS = [
  {
    step: '01',
    title: 'Tell Us Your Concern',
    description: 'Connect with our clinic team via our online booking form, phone call, or direct WhatsApp message.'
  },
  {
    step: '02',
    title: 'Consultation',
    description: 'Discuss your symptoms, past dental experiences, and personal aesthetic expectations in an unhurried consultation.'
  },
  {
    step: '03',
    title: 'Personalized Assessment',
    description: 'Comprehensive clinical examination supported by gentle digital imaging and intraoral camera diagnostics.'
  },
  {
    step: '04',
    title: 'Treatment Plan',
    description: 'Receive transparent clinical recommendations with multiple options, clear timelines, and itemized cost clarity.'
  },
  {
    step: '05',
    title: 'Treatment',
    description: 'Experience precise, comfort-first clinical care in a serene, modern clinical suite designed for relaxation.'
  },
  {
    step: '06',
    title: 'Follow-Up',
    description: 'Receive post-procedure guidance and scheduled check-ins to ensure lasting comfort and oral health stability.'
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'case-01',
    title: 'Comprehensive Smile Harmonization',
    category: 'Smile Makeovers',
    beforeImage: heroClinicImg,
    afterImage: smileMakeoverImg,
    caseDescription: 'Correction of midline asymmetry, worn incisal edges, and intrinsic fluorosis staining using conservative E.max ceramic veneers.',
    treatmentDuration: '2 visits over 10 days'
  },
  {
    id: 'case-02',
    title: 'Front Diastema Closure & Edge Bonding',
    category: 'Cosmetic Dentistry',
    beforeImage: dentalTechImg,
    afterImage: smileMakeoverImg,
    caseDescription: 'Single-sitting aesthetic composite resin bonding closing a 2.5mm central diastema with lifelike surface micro-texture.',
    treatmentDuration: 'Single 90-minute visit'
  },
  {
    id: 'case-03',
    title: 'Clinical In-Office Whitening',
    category: 'Whitening',
    beforeImage: heroClinicImg,
    afterImage: smileMakeoverImg,
    caseDescription: 'Removal of severe coffee and dietary chromogenic pigmentation, lifting tooth shade from A3.5 to B1.',
    treatmentDuration: '60 minutes clinical protocol'
  },
  {
    id: 'case-04',
    title: 'Single Anterior Implant & Zirconia Crown',
    category: 'Restorative Dentistry',
    beforeImage: dentalTechImg,
    afterImage: smileMakeoverImg,
    caseDescription: 'Replacement of a fractured upper central incisor with a 3D guided implant and natural screw-retained ceramic restoration.',
    treatmentDuration: 'Osseointegrated 3 months'
  },
  {
    id: 'case-05',
    title: 'Clear Aligner Arch Realignment',
    category: 'Orthodontics',
    beforeImage: heroClinicImg,
    afterImage: smileMakeoverImg,
    caseDescription: 'Correction of lower anterior crowding and deep overbite without extractions using transparent aligners.',
    treatmentDuration: '9 months active wear'
  }
];

export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: 't-1',
    patientName: 'R. Sharma',
    treatment: 'Root Canal & Zirconia Crown',
    rating: 5,
    reviewText: 'I had been postponing my root canal for months out of fear. Dr XYZ explained every step beforehand, and the procedure was completely smooth and comfortable. The clinic ambiance in Sector 9 is exceptional and feels like a boutique sanctuary.',
    date: 'Verified Patient · Chandigarh',
    source: 'Google Review'
  },
  {
    id: 't-2',
    patientName: 'P. Grewal',
    treatment: 'Smile Makeover & Veneers',
    rating: 5,
    reviewText: 'The level of precision and aesthetic eye Dr XYZ has is unmatched in the Tricity. My veneers look natural and balanced, not like fake Hollywood teeth. The digital preview let me see the outcome before starting.',
    date: 'Verified Patient · Panchkula',
    source: 'Verified Patient'
  },
  {
    id: 't-3',
    patientName: 'A. Kapoor',
    treatment: 'Dental Implant Rehabilitation',
    rating: 5,
    reviewText: 'After a sports injury, I lost a front tooth. Dr XYZ guided me through 3D scanning and implant placement. Highly professional, zero ambiguity about treatment timelines, and genuinely warm patient care.',
    date: 'Verified Patient · Mohali',
    source: 'Google Review'
  },
  {
    id: 't-4',
    patientName: 'K. Walia',
    treatment: 'Clear Aligners & Preventive Care',
    rating: 5,
    reviewText: 'Transparent pricing, hygienic sterilization standards you can visibly see, and modern technology. Booking an appointment and communicating over WhatsApp is effortless.',
    date: 'Verified Patient · Chandigarh',
    source: 'Verified Patient'
  }
];

export const WHY_CHOOSE_POINTS = [
  {
    title: 'Personalized Treatment Planning',
    desc: 'Every treatment roadmap is developed after listening to your concerns and conducting objective diagnostic evaluations.'
  },
  {
    title: 'Comfortable Clinical Environment',
    desc: 'Thoughtfully designed spaces, calm acoustic balance, and gentle bedside manner that ease clinical anxiety.'
  },
  {
    title: 'Modern Dental Techniques',
    desc: 'From rotary micro-endodontics to digital 3D optical scans, our practices prioritize precision and efficiency.'
  },
  {
    title: 'Transparent Communication',
    desc: 'No hidden procedures or confusing jargon. We explain every step, rationale, and cost breakdown before treatment.'
  },
  {
    title: 'Comprehensive Dental Care',
    desc: 'From routine preventative cleanings to complex surgical and smile rehabilitation under one roof.'
  },
  {
    title: 'Patient-First Approach',
    desc: 'Your comfort, schedule, and peace of mind guide our appointment pacing and clinical decisions.'
  },
  {
    title: 'Focus on Prevention & Long-Term Health',
    desc: 'We prioritize preserving your natural tooth structure and maintaining healthy biological foundations.'
  }
];

export const FAQ_ITEMS: FAQItem[] = [
  {
    question: 'How do I book an appointment?',
    answer: 'You can submit an appointment request right here on our website using the Book Appointment form, contact us directly on WhatsApp (+91 98152 74390), or call our clinic desk. Our front-desk coordinator will reach out promptly to confirm your preferred time slot.'
  },
  {
    question: 'What should I bring to my first appointment?',
    answer: 'Please bring any previous dental records, recent X-rays (if taken in the past 12 months), a list of current medications or medical conditions, and your identification. If you don’t have past records, our clinic will take fresh digital low-dose scans during your assessment.'
  },
  {
    question: 'Do you treat dental emergencies?',
    answer: 'Yes. If you are experiencing acute dental pain, trauma from an injury, a broken tooth, or sudden facial swelling, please call our clinic or message on WhatsApp immediately. We reserve emergency slots during clinic hours to provide timely relief.'
  },
  {
    question: 'How much does dental treatment cost?',
    answer: 'Dental treatment costs depend on the unique condition of your teeth and the materials or techniques required. Following an honest clinical assessment, Dr XYZ provides an itemized treatment estimate with transparent options so you can make an informed decision without surprises.'
  },
  {
    question: 'Do you treat children?',
    answer: 'Yes, we provide gentle, friendly pediatric dental care including preventive check-ups, pit and fissure sealants, fluoride treatments, and habit counseling in a warm, zero-fear environment.'
  },
  {
    question: 'Do you offer cosmetic dentistry and smile makeovers?',
    answer: 'Yes, we provide porcelain veneers, composite bonding, teeth whitening, clear aligners, and comprehensive smile design. We start with a digital aesthetic analysis to ensure results match your facial features naturally.'
  },
  {
    question: 'How can I contact the clinic?',
    answer: 'You can reach us by phone at +91 98152 74390, via WhatsApp for swift messaging, or by email at care@drxyzdental.in. Our clinic is centrally located in Sector 9-C, Madhya Marg, Chandigarh with convenient parking.'
  }
];

import React, { useState } from 'react';
import { GALLERY_ITEMS } from '../data/clinicData';
import { GalleryItem } from '../types/clinic';
import { SlidersHorizontal, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { smoothEasing } from './SectionTransition';

const CATEGORIES = [
  'All Cases',
  'Smile Makeovers',
  'Cosmetic Dentistry',
  'Whitening',
  'Restorative Dentistry',
  'Orthodontics',
] as const;

export const SmileGallery: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All Cases');
  const [activeCaseIndex, setActiveCaseIndex] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50); // percentage 0-100

  const filteredItems = activeCategory === 'All Cases'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((item) => item.category === activeCategory);

  const currentItem: GalleryItem = filteredItems[activeCaseIndex] || filteredItems[0] || GALLERY_ITEMS[0];

  return (
    <motion.section
      id="gallery"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.8, ease: smoothEasing }}
      className="py-24 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: smoothEasing }}
          className="max-w-3xl mb-12 text-left"
        >
          <span className="text-xs font-semibold uppercase tracking-widest text-[#8C6D3B] block mb-2">
            Clinical Case Studies
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#183127] tracking-tight">
            Smile Transformations
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#47544B]">
            Explore aesthetic and restorative outcomes designed with anatomical balance and natural tooth gradation.
          </p>
        </motion.div>

        {/* Category Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => {
                setActiveCategory(cat);
                setActiveCaseIndex(0);
              }}
              className={`px-4 py-2 text-xs font-semibold rounded-full whitespace-nowrap transition-all cursor-pointer ${
                activeCategory === cat
                  ? 'bg-[#183127] text-[#FAF7F2] shadow-sm'
                  : 'bg-[#EFE8DD] text-[#344138] hover:text-[#183127] hover:bg-[#E5DCCF] border border-[#D5C9B5]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Interactive Before & After Showcase */}
        {currentItem && (
          <AnimatePresence mode="wait">
            <motion.div
              key={currentItem.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.45, ease: smoothEasing }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 sm:p-8 rounded-3xl glass-panel border border-[#E3D9C9] shadow-xl shadow-[#183127]/5"
            >
              {/* Visual Slider Column */}
              <div className="lg:col-span-7">
                <div
                  className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-[#12231B] select-none shadow-md border border-[#DED0BC] cursor-ew-resize group"
                  onMouseMove={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
                    setSliderPosition(Math.round((x / rect.width) * 100));
                  }}
                  onTouchMove={(e) => {
                    const touch = e.touches[0];
                    const rect = e.currentTarget.getBoundingClientRect();
                    const x = Math.max(0, Math.min(touch.clientX - rect.left, rect.width));
                    setSliderPosition(Math.round((x / rect.width) * 100));
                  }}
                >
                  {/* After Image (Background) */}
                  <img
                    src={currentItem.afterImage}
                    alt={`${currentItem.title} After`}
                    className="absolute inset-0 w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />

                  {/* Before Image (Clipped Overlay) */}
                  <div
                    className="absolute inset-0 overflow-hidden"
                    style={{ width: `${sliderPosition}%` }}
                  >
                    <img
                      src={currentItem.beforeImage}
                      alt={`${currentItem.title} Initial State`}
                      className="absolute inset-0 w-full h-full object-cover max-w-none"
                      style={{ width: '100%', minWidth: '100%' }}
                      referrerPolicy="no-referrer"
                    />
                    {/* Subtle tint */}
                    <div className="absolute inset-0 bg-[#12231B]/15" />
                  </div>

                  {/* Vertical Divider Line */}
                  <div
                    className="absolute top-0 bottom-0 w-1 bg-[#FAF7F2] shadow-lg pointer-events-none"
                    style={{ left: `${sliderPosition}%` }}
                  >
                    <div className="absolute top-1/2 -translate-y-1/2 -left-3.5 w-8 h-8 rounded-full bg-[#FAF7F2] text-[#183127] shadow-md flex items-center justify-center text-[10px] font-bold border border-[#DDD0BC]">
                      <SlidersHorizontal className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  {/* Labels */}
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-[#12231B]/70 backdrop-blur-md text-[#FAF7F2] text-[11px] font-semibold tracking-wide">
                    Before
                  </div>
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-[#183127]/85 backdrop-blur-md text-[#E8DCC4] text-[11px] font-semibold tracking-wide border border-[#D4AF37]/30">
                    After
                  </div>

                  {/* Drag Hint */}
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-[#12231B]/60 backdrop-blur-md text-[10px] text-[#FAF7F2]/90 font-medium pointer-events-none opacity-80 group-hover:opacity-100 transition-opacity">
                    Drag slider horizontally to compare
                  </div>
                </div>
              </div>

              {/* Case Details Column */}
              <div className="lg:col-span-5 flex flex-col justify-between text-left space-y-4">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#8C6D3B]">
                    {currentItem.category}
                  </span>
                  <h3 className="text-2xl font-serif font-bold text-[#183127] mt-1 mb-3">
                    {currentItem.title}
                  </h3>
                  <p className="text-sm text-[#4A574E] leading-relaxed mb-6">
                    {currentItem.caseDescription}
                  </p>

                  <div className="p-4 rounded-2xl bg-[#EFE8DD] border border-[#DDD0BC] text-xs space-y-1.5 text-[#3E4C42]">
                    <div className="flex justify-between">
                      <span className="text-[#6D7D72]">Treatment Duration:</span>
                      <strong className="text-[#183127] font-semibold">{currentItem.treatmentDuration}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#6D7D72]">Aesthetic Material:</span>
                      <span className="text-[#183127]">Biomimetic Ceramic / Resin</span>
                    </div>
                  </div>
                </div>

                {/* Case Navigation Buttons */}
                <div className="pt-2 flex items-center gap-2 overflow-x-auto">
                  {filteredItems.map((item, idx) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setActiveCaseIndex(idx)}
                      className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                        activeCaseIndex === idx
                          ? 'bg-[#183127] text-[#FAF7F2] font-semibold'
                          : 'bg-[#FAF7F2] text-[#48564D] hover:text-[#183127] border border-[#DDD0BC]'
                      }`}
                    >
                      Case {idx + 1}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        )}

        {/* Mandatory Medical Disclaimer */}
        <div className="mt-8 p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 flex items-start gap-3 text-xs text-amber-900 max-w-3xl">
          <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong>Clinical Disclaimer:</strong> Results vary by patient and treatment. Images are shared with appropriate patient consent and illustrative clinical intent. Treatment plans are customized after clinical evaluation by Dr XYZ.
          </p>
        </div>
      </div>
    </motion.section>
  );
};

import React, { useState } from 'react';
import { GALLERY_ITEMS } from '../data/clinicData';
import { GalleryItem } from '../types/clinic';
import { SlidersHorizontal, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { smoothEasing, scrollViewport } from './SectionTransition';

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
    <section
      id="gallery"
      className="py-24 relative overflow-hidden bg-[#FFFFFF] border-b border-[#D5E7ED]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={scrollViewport}
          transition={{ duration: 0.55, ease: smoothEasing }}
          className="max-w-3xl mb-12 text-left transform-gpu"
        >
          <span className="font-mono text-xs font-bold text-[#2A9D8F] tracking-widest uppercase block mb-2">
            [ CLINICAL CASE STUDIES ]
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[#16324F] tracking-tight">
            Smile Transformations
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#667085]">
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
                  ? 'bg-[#2A9D8F] text-[#FFFFFF] shadow-sm'
                  : 'bg-[#EAF4F7] text-[#16324F] hover:text-[#2A9D8F] hover:bg-[#D9EDF2] border border-[#CEE3E9]'
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
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 sm:p-8 rounded-3xl bg-[#FFFFFF] border border-[#D5E7ED] shadow-xl shadow-[#16324F]/5"
            >
              {/* Visual Slider Column */}
              <div className="lg:col-span-7">
                <div
                  className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-[#16324F] select-none shadow-md border border-[#D5E7ED] cursor-ew-resize group"
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
                    loading="lazy"
                    decoding="async"
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
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 w-full h-full object-cover max-w-none"
                      style={{ width: '100%', minWidth: '100%' }}
                      referrerPolicy="no-referrer"
                    />
                    {/* Subtle tint */}
                    <div className="absolute inset-0 bg-[#16324F]/15" />
                  </div>

                  {/* Vertical Divider Line */}
                  <div
                    className="absolute top-0 bottom-0 w-1 bg-[#FFFFFF] shadow-lg pointer-events-none"
                    style={{ left: `${sliderPosition}%` }}
                  >
                    <div className="absolute top-1/2 -translate-y-1/2 -left-3.5 w-8 h-8 rounded-full bg-[#FFFFFF] text-[#16324F] shadow-md flex items-center justify-center text-[10px] font-bold border border-[#D5E7ED]">
                      <SlidersHorizontal className="w-3.5 h-3.5 text-[#2A9D8F]" />
                    </div>
                  </div>

                  {/* Labels */}
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-[#16324F]/75 backdrop-blur-md text-[#FFFFFF] text-[11px] font-semibold tracking-wide">
                    Before
                  </div>
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-[#2A9D8F]/90 backdrop-blur-md text-[#FFFFFF] text-[11px] font-semibold tracking-wide border border-[#238579]/40">
                    After
                  </div>

                  {/* Drag Hint */}
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-[#16324F]/65 backdrop-blur-md text-[10px] text-[#FFFFFF]/90 font-medium pointer-events-none opacity-80 group-hover:opacity-100 transition-opacity">
                    Drag slider horizontally to compare
                  </div>
                </div>
              </div>

              {/* Case Details Column */}
              <div className="lg:col-span-5 flex flex-col justify-between text-left space-y-4">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#2A9D8F]">
                    {currentItem.category}
                  </span>
                  <h3 className="text-2xl font-serif font-bold text-[#16324F] mt-1 mb-3">
                    {currentItem.title}
                  </h3>
                  <p className="text-sm text-[#667085] leading-relaxed mb-6">
                    {currentItem.caseDescription}
                  </p>

                  <div className="p-4 rounded-2xl bg-[#EAF4F7] border border-[#D5E7ED] text-xs space-y-1.5 text-[#16324F]">
                    <div className="flex justify-between">
                      <span className="text-[#667085]">Treatment Duration:</span>
                      <strong className="text-[#16324F] font-semibold">{currentItem.treatmentDuration}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#667085]">Aesthetic Material:</span>
                      <span className="text-[#16324F]">Biomimetic Ceramic / Resin</span>
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
                          ? 'bg-[#2A9D8F] text-[#FFFFFF] font-semibold'
                          : 'bg-[#FFFFFF] text-[#667085] hover:text-[#16324F] border border-[#D5E7ED]'
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
        <div className="mt-8 p-4 rounded-2xl bg-[#EAF4F7] border border-[#D5E7ED] flex items-start gap-3 text-xs text-[#16324F] max-w-3xl">
          <AlertCircle className="w-4 h-4 text-[#2A9D8F] shrink-0 mt-0.5" />
          <p className="leading-relaxed text-[#667085]">
            <strong className="text-[#16324F]">Clinical Disclaimer:</strong> Results vary by patient and treatment. Images are shared with appropriate patient consent and illustrative clinical intent. Treatment plans are customized after clinical evaluation by Dr XYZ.
          </p>
        </div>
      </div>
    </section>
  );
};

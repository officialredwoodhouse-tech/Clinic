import React, { useState } from 'react';
import { GALLERY_ITEMS } from '../data/clinicData';
import { GalleryItem } from '../types/clinic';
import { Sparkles, SlidersHorizontal, AlertCircle } from 'lucide-react';

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
    <section id="gallery" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-12 text-left">
          <span className="text-xs font-semibold uppercase tracking-widest text-teal-700 block mb-2">
            Clinical Case Studies
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-slate-900 tracking-tight">
            Smile Transformations
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600">
            Explore aesthetic and restorative outcomes designed with anatomical balance and natural tooth gradation.
          </p>
        </div>

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
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-white/80 text-slate-600 hover:text-slate-900 hover:bg-white border border-slate-200/80'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Interactive Before & After Showcase */}
        {currentItem && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 sm:p-8 rounded-3xl glass-panel border border-white/90 shadow-xl">
            {/* Visual Slider Column */}
            <div className="lg:col-span-7">
              <div
                className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-slate-900 select-none shadow-md border border-slate-200/50 cursor-ew-resize group"
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
                  {/* Subtle blur on placeholder/initial for medical clarity */}
                  <div className="absolute inset-0 bg-slate-900/10" />
                </div>

                {/* Vertical Divider Line */}
                <div
                  className="absolute top-0 bottom-0 w-1 bg-white shadow-lg pointer-events-none"
                  style={{ left: `${sliderPosition}%` }}
                >
                  <div className="absolute top-1/2 -translate-y-1/2 -left-3.5 w-8 h-8 rounded-full bg-white text-slate-800 shadow-md flex items-center justify-center text-[10px] font-bold border border-slate-200">
                    <SlidersHorizontal className="w-3.5 h-3.5" />
                  </div>
                </div>

                {/* Labels */}
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[11px] font-semibold tracking-wide">
                  Before
                </div>
                <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-teal-900/80 backdrop-blur-md text-teal-100 text-[11px] font-semibold tracking-wide">
                  After
                </div>

                {/* Drag Hint */}
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-black/50 backdrop-blur-md text-[10px] text-white/90 font-medium pointer-events-none opacity-80 group-hover:opacity-100 transition-opacity">
                  Drag slider horizontally to compare
                </div>
              </div>
            </div>

            {/* Case Details Column */}
            <div className="lg:col-span-5 flex flex-col justify-between text-left space-y-4">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-teal-700">
                  {currentItem.category}
                </span>
                <h3 className="text-2xl font-serif font-bold text-slate-900 mt-1 mb-3">
                  {currentItem.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-6">
                  {currentItem.caseDescription}
                </p>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-xs space-y-1.5 text-slate-600">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Treatment Duration:</span>
                    <strong className="text-slate-800 font-semibold">{currentItem.treatmentDuration}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Aesthetic Material:</span>
                    <span className="text-slate-800">Biomimetic Ceramic / Resin</span>
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
                        ? 'bg-teal-50 text-teal-900 font-semibold border border-teal-200'
                        : 'bg-white text-slate-500 hover:text-slate-800 border border-slate-200'
                    }`}
                  >
                    Case {idx + 1}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Mandatory Medical Disclaimer (Prompt 12) */}
        <div className="mt-8 p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 flex items-start gap-3 text-xs text-amber-900 max-w-3xl">
          <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong>Clinical Disclaimer:</strong> Results vary by patient and treatment. Images are shared with appropriate patient consent and illustrative clinical intent. Treatment plans are customized after clinical evaluation by Dr Aryan.
          </p>
        </div>
      </div>
    </section>
  );
};

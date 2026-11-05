import React, { useState } from 'react';
import { Sparkles, ShieldCheck, Heart, Droplets, X, CheckCircle2, Leaf, ArrowRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';

interface PopupDetail {
  id: string;
  title: string;
  subtitle: string;
  tagline: string;
  icon: string;
  content: string[];
  keyHighlights: string[];
  promise: string;
}

const WHY_CHOOSE_DETAILS: Record<string, PopupDetail> = {
  'HANDMADE': {
    id: 'HANDMADE',
    title: 'Artisanal Small-Batch Craftsmanship',
    subtitle: 'Handmade with love, attention, and pure botanical integrity.',
    tagline: 'Freshly Prepared in Guntur, Andhra Pradesh',
    icon: 'Sparkles',
    content: [
      'Unlike massive industrial factories where products sit in warehouses for years, our formulations are handcrafted in micro-batches every single month.',
      'This artisanal process guarantees peak botanical enzyme potency, retains active antioxidant vitamins, and ensures you receive the freshest possible beauty jar.',
      'Every jar is filled, inspected, sealed, and packaged with heartfelt care by skilled artisans.'
    ],
    keyHighlights: [
      'Crafted in small batches under 100 units at a time',
      'Zero heat degradation of delicate cold-pressed oils',
      'Fresh floral steam distillation in traditional copper vessels'
    ],
    promise: 'We promise unadulterated freshness that commercial assembly lines can never replicate.'
  },
  'SKIN SAFE': {
    id: 'SKIN SAFE',
    title: '100% Skin-Safe & Hypoallergenic',
    subtitle: 'Gentle, pH-balanced, non-toxic & suitable for even sensitive skin.',
    tagline: 'Dermatologically Thoughtful Formulations',
    icon: 'ShieldCheck',
    content: [
      'Your skin absorbs over 60% of what is placed upon it. That is why our products undergo meticulous skin-compatibility evaluations.',
      'We formulate at physiological pH levels (5.2 - 5.8) to safeguard your cutaneous acid mantle and reinforce natural skin barrier resilience.',
      'Safe for teenagers, expecting mothers, and delicate sensitive skin types.'
    ],
    keyHighlights: [
      'Zero synthetic fragrances or artificial colorants',
      'Lead-free kajal & cosmetic formulations',
      'Plant-derived squalane & botanical ceramides for barrier repair'
    ],
    promise: 'Safety without compromise. Every formula is thoroughly patch-tested and approved.'
  },
  'CRUELTY FREE': {
    id: 'CRUELTY FREE',
    title: '100% Cruelty-Free & Compassionate',
    subtitle: 'We deeply love animals and pledge never to test any product on them.',
    tagline: 'Compassionate Beauty For Kind Souls',
    icon: 'Heart',
    content: [
      'True beauty should never come at the cost of innocent living creatures. We refuse to conduct or commission any animal testing on raw materials or finished products.',
      'We only partner with ethical farmers and certified cruelty-free botanical suppliers who share our values.',
      'We test our products on human volunteers and team members who genuinely love testing natural recipes.'
    ],
    keyHighlights: [
      'Zero animal testing at any phase of development',
      '100% vegetarian / vegan-friendly botanical formulas',
      'Supporting animal welfare initiatives in India'
    ],
    promise: 'Guaranteed 100% cruelty-free from the soil to your vanity mirror.'
  },
  'SULPHATE FREE': {
    id: 'SULPHATE FREE',
    title: 'Zero Sulphates, Parabens or Toxins',
    subtitle: 'Only clean, bio-compatible green beauty that respects your body.',
    tagline: 'Radical Ingredient Transparency',
    icon: 'Droplets',
    content: [
      'Commercial cosmetics commonly use cheap SLS/SLES sulphates to create artificial bubbles that strip your hair of moisture and irritate your scalp.',
      'Pretty Palette replaces harsh detergents with gentle coconut-derived glucosides and Ayurvedic soapnuts (reetha) that clean effectively without disrupting your natural oils.',
      'Our blacklist bans over 1,500 toxic compounds including parabens, phthalates, mineral oils, silicones, and synthetic preservatives.'
    ],
    keyHighlights: [
      'No SLS, SLES, ALS, or harsh synthetic surfactants',
      'Zero formaldehyde-releasing preservatives or parabens',
      '100% biodegradable, earth-friendly formulations'
    ],
    promise: 'Only pure, nourishing botanicals. Read every word on our ingredient labels with confidence.'
  }
};

interface WhyCardData {
  id: string;
  title: string;
  subtitle: string;
  image: string;
}

const WHY_CARDS: WhyCardData[] = [
  {
    id: 'HANDMADE',
    title: 'HANDMADE',
    subtitle: 'Made in small batches with love and care.',
    image: '/assets/why-choose-handmade.png'
  },
  {
    id: 'SKIN SAFE',
    title: 'SKIN SAFE',
    subtitle: 'Gentle formulations and carefully selected ingredients.',
    image: '/assets/why-choose-skinsafe.png'
  },
  {
    id: 'CRUELTY FREE',
    title: 'CRUELTY FREE',
    subtitle: 'We do not test our products on animals.',
    image: '/assets/why-choose-crueltyfree.png'
  },
  {
    id: 'SULPHATE FREE',
    title: 'SULPHATE FREE',
    subtitle: 'Carefully selected formulations without sulphates.',
    image: '/assets/why-choose-sulphatefree.png'
  }
];

export const WhyChooseSection: React.FC = () => {
  const { cms } = useStore();
  const why = cms.whyChoose;

  const [activePopup, setActivePopup] = useState<PopupDetail | null>(null);

  const handleCardClick = (title: string) => {
    const key = title.toUpperCase().trim();
    const detail = WHY_CHOOSE_DETAILS[key] || WHY_CHOOSE_DETAILS['HANDMADE'];
    setActivePopup(detail);
  };

  return (
    <section className="w-full py-16 sm:py-24 bg-white border-b border-[#FCE8EF] relative overflow-hidden select-none">
      
      {/* Decorative background glows */}
      <div className="absolute top-0 right-1/4 w-80 h-80 bg-[#FCE8EF]/60 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-[#E88BAA]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        
        {/* Headings */}
        <div className="max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="flex items-center justify-center gap-3 mb-2">
            <div className="h-[1px] w-12 sm:w-20 bg-[#E88BAA]/60" />
            <span className="text-xs sm:text-sm uppercase tracking-widest text-[#292329] font-bold">
              WHY CHOOSE
            </span>
            <div className="h-[1px] w-12 sm:w-20 bg-[#E88BAA]/60" />
          </div>

          <h2 className="font-script text-4xl sm:text-5xl md:text-6xl text-[#A82F4D] font-bold mb-3 drop-shadow-xs">
            Pretty Palette? ♡
          </h2>

          <p className="text-sm sm:text-base text-[#777078] leading-relaxed max-w-2xl mx-auto font-normal">
            Pure botanical formulations, traditional artisanal craftsmanship, and cruelty-free care you can always trust.
          </p>
          <span className="text-xs text-[#A82F4D] font-semibold mt-2 inline-block">
            ✨ Click on any card below to explore our formulation standards & certifications
          </span>
        </div>

        {/* 4 Cards matching image copy 43.png */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-7">
          {WHY_CARDS.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => handleCardClick(item.title)}
              className="group cursor-pointer flex flex-col rounded-3xl bg-[#FFFDF9] hover:bg-white border border-[#F8C6CF] hover:border-[#E88BAA] shadow-xs hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 p-3 sm:p-4 text-left"
            >
              {/* Card Photo from reference image copy 43.png */}
              <div className="relative w-full h-44 sm:h-48 rounded-2xl overflow-hidden bg-[#FCE8EF] mb-4">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                
                {/* Floating pill badge */}
                <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs text-[#A82F4D] text-[10px] font-bold px-2.5 py-1 rounded-full shadow-2xs">
                  0{idx + 1} Benefit
                </span>
              </div>

              {/* Title & Description */}
              <div className="px-2 pb-2 flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-lg sm:text-xl font-bold uppercase tracking-wider text-[#292329] group-hover:text-[#A82F4D] transition-colors mb-1.5">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-[13px] text-[#777078] leading-relaxed mb-4">
                    {item.subtitle}
                  </p>
                </div>

                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#A82F4D] group-hover:underline">
                  <span>Explore Standard</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Interactive Modal Popup for Why Choose Cards (image copy 17.png) */}
      {activePopup && (
        <div className="fixed inset-0 z-50 overflow-y-auto p-4 flex items-center justify-center">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-fade-in"
            onClick={() => setActivePopup(null)}
          />

          {/* Modal Container */}
          <div className="relative max-w-lg w-full bg-[#FFFDF9] rounded-3xl shadow-2xl p-6 sm:p-8 border border-[#F8C6CF] z-10 animate-zoom-in text-left">
            
            <button
              type="button"
              onClick={() => setActivePopup(null)}
              className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-800 rounded-full hover:bg-stone-100 transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="mb-5">
              <span className="text-[11px] uppercase tracking-widest font-bold text-[#78844B] block mb-1">
                {activePopup.tagline}
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#40251D]">
                {activePopup.title}
              </h3>
              <p className="font-serif italic text-sm text-[#A82F4D] font-medium mt-1">
                "{activePopup.subtitle}"
              </p>
            </div>

            {/* Description Body */}
            <div className="space-y-3 text-xs sm:text-sm text-stone-700 leading-relaxed mb-6">
              {activePopup.content.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>

            {/* Key Highlights */}
            <div className="bg-[#FDF1F4] rounded-2xl p-4 border border-[#F8C6CF]/60 mb-6 space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#A82F4D]">
                Key Standards & Commitments:
              </h4>
              {activePopup.keyHighlights.map((hl, i) => (
                <div key={i} className="flex items-start gap-2 text-xs text-stone-700">
                  <CheckCircle2 className="w-4 h-4 text-[#78844B] shrink-0 mt-0.5" />
                  <span>{hl}</span>
                </div>
              ))}
            </div>

            {/* Brand Promise Footer */}
            <div className="p-3.5 rounded-xl bg-[#FFF9EF] border border-[#78844B]/20 text-xs text-stone-600 mb-6">
              <span className="font-bold text-[#40251D]">Pretty Palette Promise: </span>
              {activePopup.promise}
            </div>

            <button
              type="button"
              onClick={() => setActivePopup(null)}
              className="w-full bg-[#A82F4D] hover:bg-[#8D253F] text-white py-3 rounded-full text-xs sm:text-sm font-bold shadow-md transition-all cursor-pointer"
            >
              Understood & Close
            </button>

          </div>
        </div>
      )}

    </section>
  );
};

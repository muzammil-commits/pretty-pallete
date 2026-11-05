import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, X, CheckCircle2, ArrowRight } from 'lucide-react';

interface PopupDetail {
  id: string;
  title: string;
  subtitle: string;
  tagline: string;
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
    subtitle: 'Gentle, pH-balanced, non-toxic & suitable for all skin types.',
    tagline: 'Dermatologically Thoughtful Formulations',
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
    content: [
      'Commercial cosmetics commonly use cheap SLS/SLES sulphates to create artificial bubbles that strip your hair of moisture and irritate your scalp.',
      'Pretty Palette replaces harsh detergents with gentle coconut-derived glucosides and Ayurvedic soapnuts that clean effectively without disrupting your natural oils.',
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

interface BenefitItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  alt: string;
}

const BENEFIT_ITEMS: BenefitItem[] = [
  {
    id: 'HANDMADE',
    title: 'HANDMADE',
    description: 'Made in small batches with love and care.',
    icon: '/assets/why-art-handmade.png',
    alt: 'Handmade mixing bowl illustration'
  },
  {
    id: 'SKIN SAFE',
    title: 'SKIN SAFE',
    description: 'Gentle, non-toxic & suitable for all skin types.',
    icon: '/assets/why-art-skinsafe.png',
    alt: 'Botanical leaf illustration'
  },
  {
    id: 'CRUELTY FREE',
    title: 'CRUELTY FREE',
    description: 'We never test on animals.',
    icon: '/assets/why-art-crueltyfree.png',
    alt: 'Cruelty free rabbit illustration'
  },
  {
    id: 'SULPHATE FREE',
    title: 'SULPHATE FREE',
    description: 'No harmful chemicals, only clean beauty.',
    icon: '/assets/why-art-sulphatefree.png',
    alt: 'Laboratory flask illustration'
  }
];

export const WhyChooseSection: React.FC = () => {
  const [activePopup, setActivePopup] = useState<PopupDetail | null>(null);

  const handleCardClick = (title: string) => {
    const key = title.toUpperCase().trim();
    const detail = WHY_CHOOSE_DETAILS[key] || WHY_CHOOSE_DETAILS['HANDMADE'];
    setActivePopup(detail);
  };

  return (
    <section className="w-full py-4 sm:py-6 bg-transparent relative overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* DESKTOP & TABLET: Exact Banner from image copy 51.png with interactive hotspots (ZERO duplicate text) */}
        <div className="hidden sm:block relative w-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-sm border border-[#EADBCC] bg-[#F9F6EE]">
          <img
            src="/assets/why-choose-banner-clean.png"
            alt="Why Choose Pretty Palette"
            className="w-full h-auto object-contain block select-none pointer-events-none"
          />

          {/* Interactive Button Hotspot: "Read More About Us" (approx left 3%, top 66%, width 18%, height 25%) */}
          <Link
            to="/about-us"
            className="absolute left-[3%] top-[66%] w-[19%] h-[26%] rounded-lg transition-all duration-200 hover:ring-2 hover:ring-[#4C542C]/40 cursor-pointer"
            title="Read More About Us"
            aria-label="Read More About Us"
          />

          {/* Interactive Formulation Standard Modal Hotspots for 4 Benefit Columns */}
          <button
            type="button"
            onClick={() => handleCardClick('HANDMADE')}
            className="absolute left-[33%] top-[10%] w-[16%] h-[80%] rounded-xl transition-all duration-200 hover:bg-white/20 cursor-pointer"
            title="View Handmade Small Batch Standards"
            aria-label="View Handmade Small Batch Standards"
          />
          <button
            type="button"
            onClick={() => handleCardClick('SKIN SAFE')}
            className="absolute left-[50%] top-[10%] w-[16%] h-[80%] rounded-xl transition-all duration-200 hover:bg-white/20 cursor-pointer"
            title="View Skin Safe Standards"
            aria-label="View Skin Safe Standards"
          />
          <button
            type="button"
            onClick={() => handleCardClick('CRUELTY FREE')}
            className="absolute left-[67%] top-[10%] w-[16%] h-[80%] rounded-xl transition-all duration-200 hover:bg-white/20 cursor-pointer"
            title="View Cruelty Free Standards"
            aria-label="View Cruelty Free Standards"
          />
          <button
            type="button"
            onClick={() => handleCardClick('SULPHATE FREE')}
            className="absolute left-[84%] top-[10%] w-[15%] h-[80%] rounded-xl transition-all duration-200 hover:bg-white/20 cursor-pointer"
            title="View Sulphate Free Standards"
            aria-label="View Sulphate Free Standards"
          />
        </div>

        {/* MOBILE VIEW: Clean Responsive 2x2 Layout with Same Brown Botanical Art & Watercolor Background */}
        <div className="block sm:hidden rounded-2xl overflow-hidden shadow-sm border border-[#EADBCC] bg-[#F9F6EE] p-5 relative">
          
          {/* Header Area */}
          <div className="text-center mb-6">
            <h3 className="font-serif text-2xl font-bold text-[#2A2421] tracking-tight uppercase leading-tight">
              WHY CHOOSE
            </h3>
            <span className="font-script text-3xl font-bold text-[#C75C83] block leading-tight mt-0.5">
              Pretty Palette?
            </span>
            
            <div className="flex items-center justify-center gap-2 my-2.5 mx-auto max-w-[180px]">
              <div className="h-[1px] flex-1 bg-[#E88BAA]/60" />
              <Heart className="w-3.5 h-3.5 fill-[#C75C83] text-[#C75C83] shrink-0" />
              <div className="h-[1px] flex-1 bg-[#E88BAA]/60" />
            </div>

            <p className="text-xs text-[#554E4B] leading-relaxed font-normal mb-3">
              We believe in the power of nature and the goodness of safe ingredients. Each product is thoughtfully handmade to bring out the best in you because you deserve beauty that cares.
            </p>

            <Link
              to="/about-us"
              className="inline-block bg-[#5B6734] hover:bg-[#4A542A] text-white px-5 py-2 rounded-lg font-bold text-xs tracking-wide shadow-sm"
            >
              Read More About Us
            </Link>
          </div>

          {/* 4 Benefits in 2x2 Grid */}
          <div className="grid grid-cols-2 gap-3 text-center pt-2 border-t border-[#E8D1C7]">
            {BENEFIT_ITEMS.map((item) => (
              <div
                key={item.id}
                onClick={() => handleCardClick(item.title)}
                className="flex flex-col items-center p-2 rounded-xl bg-white/40 active:bg-white/80 transition-colors"
              >
                <div className="w-16 h-16 flex items-center justify-center mb-1">
                  <img
                    src={item.icon}
                    alt={item.alt}
                    className="w-full h-full object-contain"
                  />
                </div>
                <h4 className="font-sans text-xs font-bold uppercase tracking-wider text-[#2A2421] mb-1">
                  {item.title}
                </h4>
                <p className="text-[10px] text-[#554E4B] leading-tight">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

        </div>

      </div>

      {/* Interactive Formulation Detail Modal Popup */}
      {activePopup && (
        <div className="fixed inset-0 z-50 overflow-y-auto p-4 flex items-center justify-center animate-fade-in">
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            onClick={() => setActivePopup(null)}
          />

          <div className="relative max-w-lg w-full bg-[#FFFDF9] rounded-3xl shadow-2xl p-6 sm:p-8 border-2 border-[#F8C6CF] z-10 animate-zoom-in text-left">
            <button
              type="button"
              onClick={() => setActivePopup(null)}
              className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-800 rounded-full hover:bg-stone-100 transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-5">
              <span className="text-[11px] uppercase tracking-widest font-bold text-[#78844B] block mb-1">
                {activePopup.tagline}
              </span>
              <h3 className="font-serif text-2xl font-bold text-[#40251D] mb-1">
                {activePopup.title}
              </h3>
              <p className="font-serif italic text-sm text-[#A82F4D]">
                "{activePopup.subtitle}"
              </p>
            </div>

            <div className="space-y-3 mb-6">
              {activePopup.content.map((paragraph, idx) => (
                <p key={idx} className="text-xs sm:text-sm text-stone-600 leading-relaxed font-normal">
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="bg-[#FFF9EF] rounded-2xl p-4 border border-[#F8C6CF]/60 mb-6">
              <h4 className="text-xs uppercase font-bold text-[#40251D] tracking-wider mb-2.5">
                Our Guaranteed Standards
              </h4>
              <div className="space-y-2">
                {activePopup.keyHighlights.map((highlight, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-stone-700">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#78844B] shrink-0 mt-0.5" />
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-l-2 border-[#A82F4D] pl-3 py-1 mb-6">
              <p className="text-xs text-[#A82F4D] font-semibold italic">
                {activePopup.promise}
              </p>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-[#F8C6CF]/50">
              <Link
                to="/shop"
                onClick={() => setActivePopup(null)}
                className="text-xs font-bold text-[#A82F4D] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>Shop Safe Formulations</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <button
                type="button"
                onClick={() => setActivePopup(null)}
                className="bg-[#A82F4D] hover:bg-[#8D253F] text-white px-5 py-2 rounded-full text-xs font-bold shadow-xs transition-colors cursor-pointer"
              >
                Got It ♡
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { Heart, X, CheckCircle2, ArrowRight } from 'lucide-react';

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
    icon: '/assets/why-art-handmade.png',
    content: [
      'Unlike massive industrial factories where products sit in warehouses for years, our formulations are handcrafted in micro-batches every single month.',
      'This artisanal process guarantees peak botanical enzyme potency, retains active antioxidant vitamins, and ensures you receive the freshest possible beauty jar.',
      'Every jar is filled, inspected, sealed, and packaged with heartfelt care by skilled artisans in Andhra Pradesh.'
    ],
    keyHighlights: [
      'Crafted in small batches under 100 units at a time',
      'Zero heat degradation of delicate cold-pressed oils',
      'Fresh floral steam distillation in traditional copper vessels',
      'Hand-inspected for highest olfactory and microbial purity'
    ],
    promise: 'We promise unadulterated freshness that commercial assembly lines can never replicate.'
  },
  'SKIN SAFE': {
    id: 'SKIN SAFE',
    title: '100% Skin-Safe & Hypoallergenic',
    subtitle: 'Gentle, pH-balanced, non-toxic & suitable for all skin types.',
    tagline: 'Dermatologically Thoughtful Formulations',
    icon: '/assets/why-art-skinsafe.png',
    content: [
      'Your skin absorbs over 60% of what is placed upon it. That is why our products undergo meticulous skin-compatibility evaluations.',
      'We formulate at physiological pH levels (5.2 - 5.8) to safeguard your cutaneous acid mantle and reinforce natural skin barrier resilience.',
      'Safe for teenagers, expecting mothers, and delicate sensitive skin types.'
    ],
    keyHighlights: [
      'Zero synthetic fragrances or artificial colorants',
      'Lead-free kajal & cosmetic formulations',
      'Plant-derived squalane & botanical ceramides for barrier repair',
      'Hypoallergenic, non-comedogenic & soothing botanicals'
    ],
    promise: 'Safety without compromise. Every formula is thoroughly patch-tested and approved.'
  },
  'CRUELTY FREE': {
    id: 'CRUELTY FREE',
    title: '100% Cruelty-Free & Compassionate',
    subtitle: 'We deeply love animals and pledge never to test any product on them.',
    tagline: 'Compassionate Beauty For Kind Souls',
    icon: '/assets/why-art-crueltyfree.png',
    content: [
      'True beauty should never come at the cost of innocent living creatures. We refuse to conduct or commission any animal testing on raw materials or finished products.',
      'We only partner with ethical farmers and certified cruelty-free botanical suppliers who share our values.',
      'We test our products on human volunteers and team members who genuinely love testing natural recipes.'
    ],
    keyHighlights: [
      'Zero animal testing at any phase of formulation or development',
      '100% vegetarian & vegan-friendly botanical formulas',
      'Supporting ethical, humane animal welfare initiatives in India',
      'Ethically harvested beeswax and cruelty-free plant waxes only'
    ],
    promise: 'Guaranteed 100% cruelty-free from the soil to your vanity mirror.'
  },
  'SULPHATE FREE': {
    id: 'SULPHATE FREE',
    title: 'Zero Sulphates, Parabens or Toxins',
    subtitle: 'Only clean, bio-compatible green beauty that respects your body.',
    tagline: 'Radical Ingredient Transparency',
    icon: '/assets/why-art-sulphatefree.png',
    content: [
      'Commercial cosmetics commonly use cheap SLS/SLES sulphates to create artificial bubbles that strip your hair of moisture and irritate your scalp.',
      'Pretty Palette replaces harsh detergents with gentle coconut-derived glucosides and Ayurvedic soapnuts that clean effectively without disrupting your natural oils.',
      'Our blacklist bans over 1,500 toxic compounds including parabens, phthalates, mineral oils, silicones, and synthetic preservatives.'
    ],
    keyHighlights: [
      'No SLS, SLES, ALS, or harsh synthetic surfactants',
      'Zero formaldehyde-releasing preservatives or parabens',
      '100% biodegradable, earth-friendly formulations',
      'Clean plant preservatives from fermented radish root & vitamin E'
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

  const handleClose = () => {
    setActivePopup(null);
  };

  // Lock body scroll and notify floating buttons when popup is active
  useEffect(() => {
    if (activePopup) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      window.dispatchEvent(new CustomEvent('pp-modal-state', { detail: { isOpen: true } }));

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          handleClose();
        }
      };
      window.addEventListener('keydown', handleKeyDown);

      return () => {
        document.body.style.overflow = originalOverflow;
        window.removeEventListener('keydown', handleKeyDown);
        window.dispatchEvent(new CustomEvent('pp-modal-state', { detail: { isOpen: false } }));
      };
    }
  }, [activePopup]);

  return (
    <section 
      id="why-choose-us"
      className="w-full py-4 sm:py-6 bg-transparent relative select-none scroll-mt-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* DESKTOP & TABLET: Exact Banner from image copy 51.png with interactive hotspots */}
        <div className="hidden sm:block relative w-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-sm border border-[#EADBCC] bg-[#F9F6EE]">
          <img
            src="/assets/why-choose-banner-clean.png"
            alt="Why Choose Pretty Palette"
            className="w-full h-auto object-contain block select-none pointer-events-none"
          />

          {/* Interactive Button Hotspot: "Read More About Us" */}
          <Link
            to="/about-us"
            className="absolute left-[9.5%] top-[70%] w-[14%] h-[15%] rounded-xl transition-all duration-200 hover:ring-2 hover:ring-[#4C542C]/50 hover:bg-[#4C542C]/10 cursor-pointer"
            title="Read More About Us"
            aria-label="Read More About Us"
          />

          {/* 4 Interactive Feature Hotspots with subtle hover hints */}
          {/* 1. HANDMADE */}
          <button
            type="button"
            onClick={() => handleCardClick('HANDMADE')}
            className="group absolute left-[32.5%] top-[5%] w-[16.8%] h-[90%] rounded-2xl transition-all duration-200 hover:bg-white/20 active:bg-white/40 cursor-pointer flex flex-col items-center justify-end pb-3"
            title="Click to view Handmade Small Batch Standards"
            aria-label="View Handmade Small Batch Standards"
          >
            <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-white/95 text-[#A82F4D] text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-xs">
              View Standards ↗
            </span>
          </button>

          {/* 2. SKIN SAFE */}
          <button
            type="button"
            onClick={() => handleCardClick('SKIN SAFE')}
            className="group absolute left-[49.3%] top-[5%] w-[16.8%] h-[90%] rounded-2xl transition-all duration-200 hover:bg-white/20 active:bg-white/40 cursor-pointer flex flex-col items-center justify-end pb-3"
            title="Click to view Skin Safe Standards"
            aria-label="View Skin Safe Standards"
          >
            <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-white/95 text-[#A82F4D] text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-xs">
              View Standards ↗
            </span>
          </button>

          {/* 3. CRUELTY FREE */}
          <button
            type="button"
            onClick={() => handleCardClick('CRUELTY FREE')}
            className="group absolute left-[66.2%] top-[5%] w-[16.8%] h-[90%] rounded-2xl transition-all duration-200 hover:bg-white/20 active:bg-white/40 cursor-pointer flex flex-col items-center justify-end pb-3"
            title="Click to view Cruelty Free Standards"
            aria-label="View Cruelty Free Standards"
          >
            <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-white/95 text-[#A82F4D] text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-xs">
              View Standards ↗
            </span>
          </button>

          {/* 4. SULPHATE FREE */}
          <button
            type="button"
            onClick={() => handleCardClick('SULPHATE FREE')}
            className="group absolute left-[83.1%] top-[5%] w-[16.8%] h-[90%] rounded-2xl transition-all duration-200 hover:bg-white/20 active:bg-white/40 cursor-pointer flex flex-col items-center justify-end pb-3"
            title="Click to view Sulphate Free Standards"
            aria-label="View Sulphate Free Standards"
          >
            <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-white/95 text-[#A82F4D] text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-xs">
              View Standards ↗
            </span>
          </button>
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

          {/* 4 Benefits in 2x2 Grid - Fully Clickable */}
          <div className="grid grid-cols-2 gap-3 text-center pt-2 border-t border-[#E8D1C7]">
            {BENEFIT_ITEMS.map((item) => (
              <button
                type="button"
                key={item.id}
                onClick={() => handleCardClick(item.title)}
                className="flex flex-col items-center p-3 rounded-xl bg-white/50 active:bg-white/90 border border-[#F8C6CF]/40 active:border-[#A82F4D] shadow-2xs hover:shadow-sm transition-all text-center cursor-pointer"
                title={`Click to read ${item.title} standards`}
              >
                <div className="w-16 h-16 flex items-center justify-center mb-1.5">
                  <img
                    src={item.icon}
                    alt={item.alt}
                    className="w-full h-full object-contain"
                  />
                </div>
                <h4 className="font-sans text-xs font-bold uppercase tracking-wider text-[#2A2421] mb-1">
                  {item.title}
                </h4>
                <p className="text-[10px] text-[#554E4B] leading-tight mb-2">
                  {item.description}
                </p>
                <span className="text-[9px] font-bold text-[#A82F4D] bg-[#FFF0F3] px-2 py-0.5 rounded-full border border-[#F8C6CF]">
                  Tap for Details ↗
                </span>
              </button>
            ))}
          </div>

        </div>

      </div>

      {/* Interactive Formulation Detail Modal Popup - Rendered via Portal to avoid any clipping */}
      {activePopup && typeof document !== 'undefined' && createPortal(
        <div 
          className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-fade-in"
          role="dialog"
          aria-modal="true"
          aria-labelledby="why-choose-modal-title"
        >
          {/* Subtle dark backdrop overlay covering the full viewport */}
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-300"
            onClick={handleClose}
            aria-hidden="true"
          />

          {/* Modal Container: Centered, fits cleanly in viewport, internally scrollable */}
          <div 
            className="relative max-w-xl w-full max-h-[90vh] flex flex-col bg-[#FFFDF9] rounded-3xl shadow-2xl border-2 border-[#F8C6CF] z-10 animate-zoom-in text-left overflow-hidden my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Background Decorative Floral Glow */}
            <div className="absolute top-0 right-0 w-44 h-44 bg-[#F8C6CF]/20 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-44 h-44 bg-[#78844B]/10 rounded-full blur-2xl pointer-events-none" />

            {/* Close Button pinned at top-right */}
            <button
              type="button"
              onClick={handleClose}
              className="absolute top-4 right-4 z-20 p-2 text-stone-400 hover:text-stone-800 rounded-full hover:bg-[#FCE8EF] transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5 text-[#40251D]" />
            </button>

            {/* Internally Scrollable Content Area */}
            <div className="overflow-y-auto p-6 sm:p-8 space-y-5">
              {/* Header with Icon, Tagline, Title, Subtitle */}
              <div className="flex items-start gap-3.5 pr-8">
                <div className="w-12 h-12 rounded-2xl bg-[#FFF5F7] border border-[#F8C6CF] p-1.5 shrink-0 shadow-2xs flex items-center justify-center">
                  <img 
                    src={activePopup.icon} 
                    alt={activePopup.title} 
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <span className="text-[10px] sm:text-[11px] uppercase tracking-widest font-bold text-[#78844B] block mb-1">
                    {activePopup.tagline}
                  </span>
                  <h3 id="why-choose-modal-title" className="font-serif text-2xl sm:text-3xl font-bold text-[#40251D] leading-snug">
                    {activePopup.title}
                  </h3>
                  <p className="font-serif italic text-xs sm:text-sm text-[#A82F4D] mt-0.5">
                    "{activePopup.subtitle}"
                  </p>
                </div>
              </div>

              {/* Detailed Paragraphs */}
              <div className="space-y-3 pt-1">
                {activePopup.content.map((paragraph, idx) => (
                  <p key={idx} className="text-xs sm:text-sm text-stone-600 leading-relaxed font-normal">
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Our Guaranteed Standards Feature Box (matches screenshot) */}
              <div className="bg-[#FFF9EF] rounded-2xl p-4 sm:p-5 border border-[#F8C6CF]/60">
                <h4 className="font-serif text-xs uppercase font-bold text-[#40251D] tracking-wider mb-3">
                  OUR GUARANTEED STANDARDS
                </h4>
                <div className="space-y-2.5">
                  {activePopup.keyHighlights.map((highlight, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-stone-700">
                      <CheckCircle2 className="w-4 h-4 text-[#78844B] shrink-0 mt-0.5" />
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Promise Callout */}
              <div className="border-l-2 border-[#A82F4D] pl-3 py-1">
                <p className="text-xs sm:text-sm text-[#A82F4D] font-semibold italic">
                  {activePopup.promise}
                </p>
              </div>

              {/* Action Footer */}
              <div className="flex items-center justify-between pt-3 border-t border-[#F8C6CF]/50">
                <Link
                  to="/shop"
                  onClick={handleClose}
                  className="text-xs sm:text-sm font-bold text-[#A82F4D] hover:underline flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Shop Safe Formulations</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <button
                  type="button"
                  onClick={handleClose}
                  className="bg-[#A82F4D] hover:bg-[#8D253F] text-white px-6 py-2.5 rounded-full text-xs sm:text-sm font-bold shadow-md transition-colors cursor-pointer"
                >
                  Got It ♡
                </button>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}

    </section>
  );
};

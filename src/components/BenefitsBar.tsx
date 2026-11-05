import React from 'react';

interface FeatureItem {
  id: string;
  line1: string;
  line2: string;
  icon: string;
  alt: string;
}

const EXACT_FEATURES: FeatureItem[] = [
  {
    id: 'f-1',
    line1: 'NATURAL',
    line2: 'INGREDIENTS',
    icon: '/assets/exact-feature-natural-ingredients.png',
    alt: 'Natural Ingredients'
  },
  {
    id: 'f-2',
    line1: 'SKIN SAFE',
    line2: 'FORMULA',
    icon: '/assets/exact-feature-skin-safe.png',
    alt: 'Skin Safe Formula'
  },
  {
    id: 'f-3',
    line1: 'MADE WITH',
    line2: 'LOVE',
    icon: '/assets/exact-feature-made-with-love.png',
    alt: 'Made With Love'
  },
  {
    id: 'f-4',
    line1: 'PREMIUM',
    line2: 'QUALITY',
    icon: '/assets/exact-feature-premium-quality.png',
    alt: 'Premium Quality'
  }
];

export const BenefitsBar: React.FC = () => {
  return (
    <section className="w-full py-6 sm:py-8 bg-transparent relative overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Single Horizontal Rounded Banner matching image copy 45.png */}
        <div className="w-full bg-[#FCF1EB] rounded-[18px] sm:rounded-[20px] border border-[#F2DDD2] shadow-2xs py-4 sm:py-5 px-3 sm:px-6">
          
          {/* Desktop: 4 Columns with Thin Vertical Separators | Mobile: 2x2 Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 lg:divide-x divide-[#E8D1C7]/70">
            {EXACT_FEATURES.map((item, idx) => (
              <div
                key={item.id}
                className={`flex items-center justify-center gap-3 sm:gap-4 py-3 sm:py-2 px-2 sm:px-4 ${
                  idx === 0 ? 'border-t-0' : ''
                }`}
              >
                {/* Circular Outlined Icon matching reference (completely uncropped) */}
                <div className="w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 shrink-0 flex items-center justify-center p-0.5 overflow-visible">
                  <img
                    src={item.icon}
                    alt={item.alt}
                    className="w-full h-full object-contain object-center select-none pointer-events-none"
                  />
                </div>

                {/* Two-Line Heading in Dark Charcoal Uppercase */}
                <div className="text-left leading-tight">
                  <span className="block font-sans text-xs sm:text-sm md:text-[15px] font-bold uppercase tracking-wider text-[#2B2527]">
                    {item.line1}
                  </span>
                  <span className="block font-sans text-xs sm:text-sm md:text-[15px] font-bold uppercase tracking-wider text-[#2B2527]">
                    {item.line2}
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};

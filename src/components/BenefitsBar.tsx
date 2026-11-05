import React from 'react';

interface FeatureCard {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
}

const FEATURE_CARDS: FeatureCard[] = [
  {
    id: 'feat-1',
    title: 'NATURAL INGREDIENTS',
    subtitle: 'Thoughtfully selected ingredients for everyday beauty care.',
    icon: '/assets/feature-icon-natural-ingredients.png'
  },
  {
    id: 'feat-2',
    title: 'SKIN SAFE FORMULA',
    subtitle: 'Gentle formulations designed with skin care in mind.',
    icon: '/assets/feature-icon-skin-safe.png'
  },
  {
    id: 'feat-3',
    title: 'MADE WITH LOVE',
    subtitle: 'Every product selected and presented with care.',
    icon: '/assets/feature-icon-made-with-love.png'
  },
  {
    id: 'feat-4',
    title: 'PREMIUM QUALITY',
    subtitle: 'Quality-focused beauty essentials for your routine.',
    icon: '/assets/feature-icon-premium-quality.png'
  }
];

export const BenefitsBar: React.FC = () => {
  return (
    <section className="w-full bg-white border-b border-[#FCE8EF] py-8 sm:py-10 relative overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 4 Feature Cards Row - Exact Match to image copy 40.png */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {FEATURE_CARDS.map((card, idx) => (
            <div
              key={card.id}
              className="group flex items-center gap-4 p-4 sm:p-5 rounded-2xl bg-[#FFF5F7] hover:bg-[#FCE8EF] border border-[#F8C6CF]/80 shadow-2xs hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
            >
              {/* Feature Icon Image from reference image copy 40.png */}
              <div className="w-14 h-14 sm:w-16 sm:h-16 shrink-0 flex items-center justify-center p-1 rounded-xl bg-white/80 shadow-2xs group-hover:scale-105 transition-transform duration-300">
                <img
                  src={card.icon}
                  alt={card.title}
                  className="w-full h-full object-contain filter drop-shadow-xs"
                />
              </div>

              {/* Text Info */}
              <div className="min-w-0 flex-1">
                <h4 className="font-sans text-xs sm:text-sm font-bold uppercase tracking-wider text-[#292329] group-hover:text-[#A82F4D] transition-colors leading-tight mb-1">
                  {card.title}
                </h4>
                <p className="text-[11px] sm:text-xs text-[#777078] leading-snug line-clamp-2">
                  {card.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

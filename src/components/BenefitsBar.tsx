import React from 'react';
import { Leaf, Heart, Diamond, HeartHandshake, Sparkles } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const BenefitsBar: React.FC = () => {
  const { cms } = useStore();

  // Grand 4 Pillars (Dedicated Support removed as per image copy 16.png)
  const pillars = [
    {
      id: 'p-1',
      title: '100% Natural Ingredients',
      subtitle: 'Pure botanical extracts, unrefined oils & cold-pressed goodness with zero harmful synthetics.',
      icon: Leaf,
      color: 'text-[#78844B]',
      bg: 'bg-[#78844B]/10',
      badge: 'Earth Pure'
    },
    {
      id: 'p-2',
      title: 'Cruelty-Free Beauty',
      subtitle: 'We love animals and never test on them. 100% compassionate and ethically formulated.',
      icon: Heart,
      color: 'text-[#A82F4D]',
      bg: 'bg-[#A82F4D]/10',
      badge: 'Ethical'
    },
    {
      id: 'p-3',
      title: 'Premium Quality Products',
      subtitle: 'Artisanal gold-standard formulations that nourish deeply, feel luxurious and deliver visible radiance.',
      icon: Diamond,
      color: 'text-[#A82F4D]',
      bg: 'bg-[#E98B9B]/15',
      badge: 'Certified'
    },
    {
      id: 'p-4',
      title: 'Made With Love',
      subtitle: 'Handcrafted in fresh micro-batches to preserve optimal herbal potency and natural freshness.',
      icon: HeartHandshake,
      color: 'text-[#A82F4D]',
      bg: 'bg-[#FF647F]/10',
      badge: 'Small Batch'
    }
  ];

  return (
    <section className="w-full bg-gradient-to-b from-[#FFFDF9] via-[#FFF9EF] to-[#FFFDF9] border-b border-[#F8C6CF]/50 py-12 sm:py-16 relative overflow-hidden">
      
      {/* Background Soft Glows */}
      <div className="absolute -top-12 left-1/4 w-72 h-72 bg-[#F8C6CF]/25 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-12 right-1/4 w-72 h-72 bg-[#78844B]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Grand Intro */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FCE5E8] border border-[#F8C6CF] mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#A82F4D]" />
            <span className="text-[11px] uppercase tracking-widest font-bold text-[#A82F4D]">
              Our Promise to You
            </span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-[#40251D]">
            Crafted with Pure Conscience & Love
          </h2>
        </div>

        {/* 4 Grand Pillar Cards (image copy 4.png) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div 
                key={item.id}
                className="group relative p-6 sm:p-7 rounded-3xl bg-white/80 backdrop-blur-xs border border-[#F8C6CF]/60 shadow-xs hover:shadow-xl hover:bg-white transition-all duration-300 transform hover:-translate-y-2 flex flex-col justify-between"
              >
                <div>
                  {/* Badge & Icon Header */}
                  <div className="flex items-center justify-between mb-5">
                    <div className={`w-14 h-14 rounded-2xl ${item.bg} flex items-center justify-center transition-transform duration-300 group-hover:scale-110 shadow-xs`}>
                      <Icon className={`w-7 h-7 ${item.color}`} />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#FDF1F4] text-[#A82F4D] border border-[#F8C6CF]/40">
                      {item.badge}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-[#40251D] group-hover:text-[#A82F4D] transition-colors mb-2">
                    {item.title}
                  </h3>

                  {/* Detailed Description */}
                  <p className="text-xs sm:text-sm text-[#40251D]/75 leading-relaxed font-normal">
                    {item.subtitle}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-[#F8C6CF]/30 flex items-center gap-1.5 text-[11px] font-semibold text-[#78844B]">
                  <span>100% Genuine Care</span>
                  <span>•</span>
                  <span>Safe Always</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

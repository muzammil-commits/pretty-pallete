import React from 'react';
import { Sparkles, ShieldCheck, Heart, Droplets } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const WhyChooseSection: React.FC = () => {
  const { cms } = useStore();
  const why = cms.whyChoose;

  const getIllustration = (idx: number) => {
    switch (idx) {
      case 0:
        // Handmade - mortar & pestle / artisanal
        return (
          <div className="w-16 h-16 rounded-full bg-[#FFF9EF] border border-[#78844B]/30 flex items-center justify-center text-[#78844B] shadow-inner mb-4">
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 4l-4 5" />
              <path d="M3 11c0 5 4 9 9 9s9-4 9-9H3z" />
              <path d="M7 11c0-1.5 2-2.5 5-2.5s5 1 5 2.5" />
            </svg>
          </div>
        );
      case 1:
        // Skin Safe - botanical leaf
        return (
          <div className="w-16 h-16 rounded-full bg-[#FFF9EF] border border-[#78844B]/30 flex items-center justify-center text-[#78844B] shadow-inner mb-4">
            <ShieldCheck className="w-8 h-8" />
          </div>
        );
      case 2:
        // Cruelty Free - rabbit illustration
        return (
          <div className="w-16 h-16 rounded-full bg-[#FFF9EF] border border-[#78844B]/30 flex items-center justify-center text-[#A82F4D] shadow-inner mb-4">
            <Heart className="w-8 h-8" />
          </div>
        );
      case 3:
        // Sulphate Free - flask with clean leaf
        return (
          <div className="w-16 h-16 rounded-full bg-[#FFF9EF] border border-[#78844B]/30 flex items-center justify-center text-[#78844B] shadow-inner mb-4">
            <Droplets className="w-8 h-8" />
          </div>
        );
      default:
        return (
          <div className="w-16 h-16 rounded-full bg-[#FFF9EF] border border-[#78844B]/30 flex items-center justify-center text-[#78844B] shadow-inner mb-4">
            <Sparkles className="w-8 h-8" />
          </div>
        );
    }
  };

  return (
    <section className="w-full py-16 sm:py-20 bg-[#FDF8EE]/80 relative overflow-hidden">
      
      {/* Decorative leafy branches and borders */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        
        {/* Headings */}
        <div className="max-w-3xl mx-auto mb-12">
          <div className="flex items-center justify-center gap-3 mb-1">
            <div className="h-[1px] w-12 sm:w-20 bg-[#E98B9B]/60" />
            <span className="text-xs sm:text-sm uppercase tracking-widest text-[#40251D] font-bold">
              {why.heading || 'WHY CHOOSE'}
            </span>
            <div className="h-[1px] w-12 sm:w-20 bg-[#E98B9B]/60" />
          </div>

          <h2 className="font-script text-4xl sm:text-5xl md:text-6xl text-[#A82F4D] font-bold mb-4 drop-shadow-xs">
            {why.scriptHeading || 'Pretty Palette? ♡'}
          </h2>

          <p className="text-sm sm:text-base text-[#40251D]/80 leading-relaxed max-w-2xl mx-auto font-normal">
            {why.description}
          </p>
        </div>

        {/* 4 Feature Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {why.items.map((item, idx) => (
            <div
              key={item.id || idx}
              className="flex flex-col items-center text-center p-6 rounded-2xl bg-white/70 border border-[#F8C6CF]/50 shadow-sm hover:shadow-md hover:bg-white transition-all duration-300"
            >
              {getIllustration(idx)}
              <h3 className="font-serif text-lg font-bold uppercase tracking-wider text-[#40251D] mb-2">
                {item.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#40251D]/75 leading-relaxed font-normal">
                {item.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

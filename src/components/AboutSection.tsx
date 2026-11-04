import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Eye, Target, Sparkles, Heart, ShieldCheck } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const AboutSection: React.FC = () => {
  const { cms } = useStore();
  const about = cms.about;

  return (
    <section className="w-full py-16 sm:py-24 bg-white border-y border-[#F8C6CF]/50 relative overflow-hidden">
      
      {/* Decorative floral background glows */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#F8C6CF]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#78844B]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left: Brand Framed Photography using image copy 10.png (about-products.png) */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative group max-w-md w-full">
              <div className="relative rounded-3xl overflow-hidden p-3 bg-gradient-to-tr from-[#F8C6CF] via-[#FFF9EF] to-[#FCE5E8] shadow-xl transform -rotate-1 hover:rotate-0 transition-all duration-500">
                <img
                  src="/assets/about-products.png"
                  alt="Pretty Palette Pure Botanical Products"
                  className="w-full h-auto rounded-2xl object-cover shadow-sm group-hover:scale-103 transition-transform duration-500"
                />
              </div>

              {/* Floating Badge */}
              <div className="absolute bottom-2 right-2 sm:-bottom-4 sm:-right-4 bg-[#A82F4D] text-white px-4 py-2 rounded-full text-xs font-bold shadow-lg flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>100% Handcrafted</span>
              </div>
            </div>
          </div>

          {/* Right: Brand Story Description & Three Pillars */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <span className="font-script text-3xl sm:text-4xl text-[#A82F4D] block mb-1">
                Our Artisanal Heritage ♡
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#40251D] leading-tight">
                About Pretty Palette
              </h2>
            </div>

            <p className="text-base sm:text-lg text-[#40251D]/80 leading-relaxed font-normal">
              {about.text}
            </p>

            {/* Three Pillars: Vision, Mission, Values */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              {/* Vision */}
              <div className="p-4 rounded-2xl bg-[#FDF1F4] border border-[#F8C6CF]/50 space-y-1">
                <div className="w-8 h-8 rounded-full bg-[#E98B9B]/20 flex items-center justify-center text-[#A82F4D] mb-2">
                  <Eye className="w-4 h-4" />
                </div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#40251D]">Our Vision</h4>
                <p className="text-xs text-[#40251D]/75 leading-relaxed">
                  {about.vision}
                </p>
              </div>

              {/* Mission */}
              <div className="p-4 rounded-2xl bg-[#FDF1F4] border border-[#F8C6CF]/50 space-y-1">
                <div className="w-8 h-8 rounded-full bg-[#E98B9B]/20 flex items-center justify-center text-[#A82F4D] mb-2">
                  <Target className="w-4 h-4" />
                </div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#40251D]">Our Mission</h4>
                <p className="text-xs text-[#40251D]/75 leading-relaxed">
                  {about.mission}
                </p>
              </div>

              {/* Values */}
              <div className="p-4 rounded-2xl bg-[#FDF8EE] border border-[#78844B]/30 space-y-1">
                <div className="w-8 h-8 rounded-full bg-[#78844B]/20 flex items-center justify-center text-[#78844B] mb-2">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#40251D]">Our Values</h4>
                <p className="text-xs text-[#40251D]/75 leading-relaxed">
                  {about.values}
                </p>
              </div>
            </div>

            <div className="pt-2">
              <Link
                to="/about-us"
                className="inline-flex items-center gap-2.5 bg-[#4C542C] hover:bg-[#3B4222] text-[#FFF9EF] px-7 py-3.5 rounded-full text-sm font-semibold tracking-wide shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer"
              >
                <span>Read Our Full Story</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

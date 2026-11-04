import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Eye, Target, Sparkles } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const AboutSection: React.FC = () => {
  const { cms } = useStore();
  const about = cms.about;

  return (
    <section className="w-full py-14 sm:py-20 bg-white border-y border-[#F8C6CF]/40 relative overflow-hidden">
      
      {/* Decorative floral accents */}
      <div className="absolute top-0 right-0 w-36 h-36 bg-[#F8C6CF]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-44 h-44 bg-[#78844B]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* Left: Brand Framed Photography */}
          <div className="lg:col-span-4 flex justify-center">
            <div className="relative group max-w-sm w-full">
              <div className="relative rounded-2xl overflow-hidden p-2.5 bg-gradient-to-tr from-[#F8C6CF] to-[#FFF9EF] shadow-lg transform -rotate-1 hover:rotate-0 transition-transform duration-500">
                <img
                  src={about.image || '/assets/about-framed.png'}
                  alt="Pretty Palette Artisanal Beauty Products"
                  className="w-full h-auto rounded-xl object-cover shadow-xs"
                />
              </div>
              <div className="absolute -bottom-3 -right-3 bg-[#A82F4D] text-white px-3.5 py-1.5 rounded-full text-xs font-semibold shadow-md flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> 100% Handcrafted
              </div>
            </div>
          </div>

          {/* Center: Brand Story & Mission Description */}
          <div className="lg:col-span-5 text-center lg:text-left">
            <div className="inline-block mb-2">
              <span className="font-serif text-3xl sm:text-4xl font-bold text-[#A82F4D] tracking-tight">
                {about.heading}
              </span>
            </div>

            <p className="text-sm sm:text-base text-[#40251D]/80 leading-relaxed font-normal mb-6">
              {about.text}
            </p>

            <Link
              to="/about-us"
              className="inline-flex items-center gap-2 bg-[#4C542C] hover:bg-[#3B4222] text-[#FFF9EF] px-6 py-2.5 rounded-full text-sm font-semibold tracking-wide shadow-sm hover:shadow-md transition-all duration-200 transform hover:-translate-y-0.5"
            >
              <span>Our Story</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Right: Three Pillars (Vision, Mission, Values) */}
          <div className="lg:col-span-3 space-y-4">
            {/* Vision */}
            <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-[#FDF1F4]/70 border border-[#F8C6CF]/40">
              <div className="w-9 h-9 rounded-full bg-[#E98B9B]/20 flex items-center justify-center shrink-0 mt-0.5">
                <Eye className="w-4 h-4 text-[#A82F4D]" />
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#40251D]">Our Vision</h4>
                <p className="text-xs text-[#40251D]/75 leading-snug mt-0.5">
                  {about.vision}
                </p>
              </div>
            </div>

            {/* Mission */}
            <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-[#FDF1F4]/70 border border-[#F8C6CF]/40">
              <div className="w-9 h-9 rounded-full bg-[#E98B9B]/20 flex items-center justify-center shrink-0 mt-0.5">
                <Target className="w-4 h-4 text-[#A82F4D]" />
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#40251D]">Our Mission</h4>
                <p className="text-xs text-[#40251D]/75 leading-snug mt-0.5">
                  {about.mission}
                </p>
              </div>
            </div>

            {/* Values */}
            <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-[#FDF1F4]/70 border border-[#F8C6CF]/40">
              <div className="w-9 h-9 rounded-full bg-[#78844B]/20 flex items-center justify-center shrink-0 mt-0.5">
                <Sparkles className="w-4 h-4 text-[#78844B]" />
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#40251D]">Our Values</h4>
                <p className="text-xs text-[#40251D]/75 leading-snug mt-0.5">
                  {about.values}
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

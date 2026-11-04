import React from 'react';
import { Heart, Sparkles, Leaf, ShieldCheck, Eye, Target, MapPin, Phone, Mail } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const AboutPage: React.FC = () => {
  const { cms } = useStore();
  const settings = cms.settings;

  return (
    <div className="min-h-screen bg-[#FFFDF9] py-12 sm:py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-script text-3xl sm:text-4xl text-[#A82F4D] block mb-2">
            The Pretty Palette Journey ♡
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#40251D] mb-4">
            Natural Beauty. Naturally You.
          </h1>
          <p className="text-base sm:text-lg text-stone-700 leading-relaxed font-normal">
            "At Pretty Palette, we believe beauty is more than just appearance — it's about self-care, confidence and natural goodness."
          </p>
        </div>

        {/* Story Section */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center mb-16">
          <div className="md:col-span-5 flex justify-center">
            <div className="p-3 bg-gradient-to-tr from-[#F8C6CF] to-[#FFF9EF] rounded-3xl shadow-lg transform -rotate-1 hover:rotate-0 transition-transform">
              <img
                src="/assets/about-framed.png"
                alt="Pretty Palette Handcrafted Formulations"
                className="rounded-2xl w-full h-auto object-cover"
              />
            </div>
          </div>

          <div className="md:col-span-7 space-y-4 text-stone-700 text-sm sm:text-base leading-relaxed">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#A82F4D]">
              Our Artisanal Story
            </h2>
            <p>
              Pretty Palette was born out of a genuine desire to bring purity, safety, and artisanal care back into everyday personal beauty. In a world saturated with synthetic harsh chemicals, heavy sulphates, and mass-manufactured shortcuts, we set out on a different path.
            </p>
            <p>
              Every single product in our catalog — from our rich velvet Matte Lust Lipsticks and nourishing saffron creams to our traditional 18-herb Ayurvedic hair potions — is handcrafted in small, fresh batches. We source ethical, cold-pressed botanical oils, fresh botanical hydrosols, and skin-conscious pigments that respect your body.
            </p>
            <p className="font-serif italic text-[#78844B] font-semibold">
              "We never test on animals, never compromise on safety, and always craft with pure love."
            </p>
          </div>
        </div>

        {/* Vision, Mission, Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {/* Vision */}
          <div className="p-6 rounded-3xl bg-white border border-[#F8C6CF] shadow-xs text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-[#FCE5E8] text-[#A82F4D] flex items-center justify-center mx-auto">
              <Eye className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-bold text-[#40251D]">Our Vision</h3>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              To become a trusted beauty and personal-care brand that makes natural, safe and high-quality beauty products accessible to everyone.
            </p>
          </div>

          {/* Mission */}
          <div className="p-6 rounded-3xl bg-white border border-[#F8C6CF] shadow-xs text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-[#FCE5E8] text-[#A82F4D] flex items-center justify-center mx-auto">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-bold text-[#40251D]">Our Mission</h3>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              To provide carefully curated, handmade and premium-quality beauty products using nature-inspired ingredients, encouraging healthy skincare, haircare and everyday self-care.
            </p>
          </div>

          {/* Core Values */}
          <div className="p-6 rounded-3xl bg-white border border-[#F8C6CF] shadow-xs text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-[#FDF8EE] text-[#78844B] flex items-center justify-center mx-auto">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-bold text-[#40251D]">Core Values</h3>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              Handmade craftsmanship, cruelty-free beauty, non-toxic formulations, radical ingredient transparency, and customer satisfaction.
            </p>
          </div>
        </div>

        {/* Business Roots & Craftsmanship */}
        <div className="p-8 sm:p-10 rounded-3xl bg-[#FDF1F4] border border-[#F8C6CF] text-center space-y-4">
          <span className="font-script text-3xl text-[#A82F4D]">Rooted in Guntur, Andhra Pradesh</span>
          <h3 className="font-serif text-2xl font-bold text-[#40251D]">
            Crafted Locally, Cherished Everywhere
          </h3>
          <p className="text-sm text-stone-700 max-w-2xl mx-auto leading-relaxed">
            Our workshop and operational center operate out of Guntur, India. We take immense pride in fostering sustainable, fair-trade relationships with Indian farmers and botanical gatherers.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 pt-4 text-xs font-semibold text-stone-700">
            <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4 text-[#A82F4D]" /> Guntur, Andhra Pradesh</span>
            <span className="flex items-center gap-1.5"><Phone className="w-4 h-4 text-[#A82F4D]" /> +91 7569399887</span>
            <span className="flex items-center gap-1.5"><Mail className="w-4 h-4 text-[#A82F4D]" /> contact@prettypalette.shop</span>
          </div>
        </div>

      </div>
    </div>
  );
};

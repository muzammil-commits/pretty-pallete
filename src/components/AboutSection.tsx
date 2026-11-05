import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Eye, Target, Sparkles, Heart, ShieldCheck, X, CheckCircle2, Leaf, Award, Compass } from 'lucide-react';
import { useStore } from '../context/StoreContext';

interface PillarModalData {
  id: string;
  title: string;
  subtitle: string;
  tagline: string;
  badge: string;
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
  paragraphs: string[];
  keyPoints: string[];
  quote: string;
}

const PILLAR_DETAILS: Record<string, PillarModalData> = {
  vision: {
    id: 'vision',
    title: 'Our Vision for Modern Beauty',
    subtitle: 'Natural Beauty. Naturally You.',
    tagline: 'Accessible Botanical Luxury For Every Soul',
    badge: 'Pretty Palette Vision',
    icon: <Eye className="w-6 h-6" />,
    iconBg: 'bg-[#FCE5E8]',
    iconColor: 'text-[#A82F4D]',
    paragraphs: [
      'To become India’s most trusted and beloved personal-care sanctuary that makes natural, toxin-free, high-performance beauty accessible to everyone.',
      'We envision a world where nobody has to choose between healthy skin and high-performance glam. By harmonizing ancient Ayurvedic wisdom with clean botanical formulations, we empower everyday self-care that builds authentic confidence from within.',
      'Every product we formulate is a conscious step toward demystifying beauty and reconnecting our daily routines with the pure healing potency of Mother Earth.'
    ],
    keyPoints: [
      'Accessible Luxury: Premium organic botanical formulations without inflated price tags',
      'Skin-First Cosmetics: Makeup infused with skincare serums and cold-pressed botanical oils',
      'Everyday Glow Rituals: Transforming daily beauty routines into mindful moments of self-love',
      'Inclusivity: Gentle, hypoallergenic solutions for every skin tone, age, and type'
    ],
    quote: 'True beauty radiates when you feel safe, nourished, and deeply in love with your natural self.'
  },
  mission: {
    id: 'mission',
    title: 'Our Mission & Daily Promise',
    subtitle: 'Nourishing You From Soil To Vanity',
    tagline: 'Carefully Curated, Handcrafted Botanical Excellence',
    badge: 'Pretty Palette Mission',
    icon: <Target className="w-6 h-6" />,
    iconBg: 'bg-[#FCE5E8]',
    iconColor: 'text-[#A82F4D]',
    paragraphs: [
      'To provide carefully curated, handmade, and premium-quality beauty products formulated with nature-inspired ingredients that encourage healthy skincare, haircare, and everyday self-care.',
      'We reject mass-produced commercial shortcuts. Instead, we personally source fresh Kashmiri saffron, Kannauj rose water, cold-pressed virgin oils, and organic herbs directly from ethical farmers.',
      'Our team meticulously hand-blends every batch in micro-runs right in Guntur, Andhra Pradesh, ensuring peak botanical enzyme vitality, unrivaled freshness, and zero harsh chemical degradation.'
    ],
    keyPoints: [
      'Small-Batch Freshness: Prepared in micro-batches under 100 units to preserve active plant enzymes',
      'Zero Harsh Detergents: 100% free from sulphates (SLS/SLES), parabens, mineral oils, and synthetic fillers',
      'Lead-Free Pigments: 100% non-toxic mineral mica and natural soot for safe, non-irritating wear',
      'Holistic Wellness: Formulations that nourish long-term cellular health rather than temporary superficial fixes'
    ],
    quote: 'Crafted with devotion. Prepared with purity. Delivered with handmade love.'
  },
  values: {
    id: 'values',
    title: 'Our Core Values & Ethical Code',
    subtitle: 'Quality, Care, Transparency & Integrity',
    tagline: 'Guiding Every Recipe, Every Jar, Every Day',
    badge: 'Pretty Palette Values',
    icon: <ShieldCheck className="w-6 h-6" />,
    iconBg: 'bg-[#F2F5E8]',
    iconColor: 'text-[#78844B]',
    paragraphs: [
      'Our core values are the heartbeat of Pretty Palette. From day one, we committed to building a beauty brand rooted in unwavering transparency, cruelty-free kindness, and authentic customer care.',
      'We believe you have the absolute right to know every single ingredient that touches your skin. We maintain zero hidden formulas and zero undisclosed chemical fragrances.',
      'We honor compassionate beauty: we never test on animals, we support local agricultural communities, and we minimize our ecological footprint through earth-conscious packaging.'
    ],
    keyPoints: [
      'Radical Transparency: Clear, readable ingredient disclosures on every single label',
      '100% Cruelty-Free: Compassionate beauty that never tests on innocent animals',
      'Artisanal Craftsmanship: Hand-poured, hand-labeled, and hand-inspected with meticulous care',
      'Customer-Centric Care: Listening closely to our community to create products you truly adore'
    ],
    quote: 'Integrity is doing the right thing for your skin, even when no one is watching.'
  },
  handcrafted: {
    id: 'handcrafted',
    title: '100% Handcrafted Artisanal Process',
    subtitle: 'Artisanal Care from Guntur, Andhra Pradesh',
    tagline: 'Handmade in Micro-Batches with Zero Industrial Heat Degradation',
    badge: 'Artisanal Craftsmanship',
    icon: <Sparkles className="w-6 h-6" />,
    iconBg: 'bg-[#FFF2F5]',
    iconColor: 'text-[#A82F4D]',
    paragraphs: [
      'At Pretty Palette, “handcrafted” isn’t a marketing buzzword—it is our founding philosophy. Located in Guntur, Andhra Pradesh, our artisanal workshop operates with the patience and reverence of traditional apothecaries.',
      'Unlike massive factory conveyor belts where products sit on warehouse pallets for years, our formulations are freshly blended every month. We use slow cold-press techniques that protect heat-sensitive vitamins and delicate floral antioxidants.',
      'Each lip tint, face nectar, and Ayurvedic oil potion is hand-poured, hand-inspected, and sealed with heartfelt love.'
    ],
    keyPoints: [
      'Slow Cold-Press Extraction: Safeguards vital botanical nutrients and vitamins A, C, and E',
      'Hand-Poured With Love: Every individual jar is filled, measured, and sealed by skilled artisans',
      'Strict Quality Inspection: 3-stage visual, olfactory, and stability checks prior to shipping',
      'Local Artisan Empowerment: Fostering skilled women artisans in Andhra Pradesh'
    ],
    quote: 'Feel the difference of authentic human touch and unadulterated botanical freshness.'
  }
};

export const AboutSection: React.FC = () => {
  const { cms } = useStore();
  const about = cms.about;
  const [activeModal, setActiveModal] = useState<PillarModalData | null>(null);

  const openPillarModal = (key: string) => {
    if (PILLAR_DETAILS[key]) {
      setActiveModal(PILLAR_DETAILS[key]);
    }
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  return (
    <section className="w-full py-16 sm:py-24 bg-white border-y border-[#F8C6CF]/50 relative overflow-hidden">
      
      {/* Decorative floral background glows with breathing animation */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#F8C6CF]/25 rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#78844B]/15 rounded-full blur-3xl pointer-events-none animate-pulse" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left: Brand Framed Photography with Scroll Slide-in Animation */}
          <div className="lg:col-span-5 flex justify-center reveal-init reveal-left">
            <div 
              onClick={() => openPillarModal('handcrafted')}
              className="relative group max-w-md w-full cursor-pointer"
              title="Click to learn about our Handcrafted Process ♡"
            >
              <div className="relative rounded-3xl overflow-hidden p-3 bg-gradient-to-tr from-[#F8C6CF] via-[#FFF9EF] to-[#FCE5E8] shadow-xl transform -rotate-1 group-hover:rotate-0 group-hover:scale-102 transition-all duration-500 border border-[#F8C6CF]/60">
                <img
                  src="/assets/about-products.png"
                  alt="Pretty Palette Pure Botanical Products"
                  className="w-full h-auto rounded-2xl object-cover shadow-sm group-hover:scale-103 transition-transform duration-500"
                />
                
                {/* Subtle Click Hint Overlay on Hover */}
                <div className="absolute inset-3 rounded-2xl bg-[#A82F4D]/15 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="bg-white/95 text-[#A82F4D] px-4 py-1.5 rounded-full text-xs font-bold shadow-md flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-all">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>View Handcrafted Story</span>
                  </span>
                </div>
              </div>

              {/* Floating Badge with Soft Bounce */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  openPillarModal('handcrafted');
                }}
                className="absolute bottom-2 right-2 sm:-bottom-4 sm:-right-4 bg-[#A82F4D] hover:bg-[#8D253F] text-white px-4 py-2 rounded-full text-xs font-bold shadow-lg flex items-center gap-2 cursor-pointer transition-transform hover:scale-105"
              >
                <Sparkles className="w-4 h-4 text-amber-300 animate-spin-slow" />
                <span>100% Handcrafted</span>
              </button>
            </div>
          </div>

          {/* Right: Brand Story Description & Three Interactive Pillar Cards */}
          <div className="lg:col-span-7 space-y-6 reveal-init reveal-right">
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

            {/* Three Interactive Pillar Cards: Vision, Mission, Values with Staggered Scroll Reveal & Popups */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              
              {/* 1. Vision Card (Interactive Popup Trigger) */}
              <div 
                onClick={() => openPillarModal('vision')}
                className="group cursor-pointer p-4 rounded-2xl bg-[#FDF1F4] hover:bg-[#FCE5E8] border border-[#F8C6CF]/60 hover:border-[#E98B9B] shadow-xs hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 space-y-1 relative reveal-init delay-100"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="w-8 h-8 rounded-full bg-[#E98B9B]/20 group-hover:bg-[#E98B9B]/35 flex items-center justify-center text-[#A82F4D] transition-colors">
                    <Eye className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-bold text-[#A82F4D] bg-white/90 px-2 py-0.5 rounded-full shadow-2xs group-hover:bg-[#A82F4D] group-hover:text-white transition-all">
                    Explore ↗
                  </span>
                </div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#40251D] group-hover:text-[#A82F4D] transition-colors">
                  Our Vision
                </h4>
                <p className="text-xs text-[#40251D]/75 leading-relaxed">
                  {about.vision}
                </p>
                <span className="block text-[10px] font-semibold text-[#A82F4D] pt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  Click for full vision popup ♡
                </span>
              </div>

              {/* 2. Mission Card (Interactive Popup Trigger) */}
              <div 
                onClick={() => openPillarModal('mission')}
                className="group cursor-pointer p-4 rounded-2xl bg-[#FDF1F4] hover:bg-[#FCE5E8] border border-[#F8C6CF]/60 hover:border-[#E98B9B] shadow-xs hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 space-y-1 relative reveal-init delay-200"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="w-8 h-8 rounded-full bg-[#E98B9B]/20 group-hover:bg-[#E98B9B]/35 flex items-center justify-center text-[#A82F4D] transition-colors">
                    <Target className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-bold text-[#A82F4D] bg-white/90 px-2 py-0.5 rounded-full shadow-2xs group-hover:bg-[#A82F4D] group-hover:text-white transition-all">
                    Explore ↗
                  </span>
                </div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#40251D] group-hover:text-[#A82F4D] transition-colors">
                  Our Mission
                </h4>
                <p className="text-xs text-[#40251D]/75 leading-relaxed">
                  {about.mission}
                </p>
                <span className="block text-[10px] font-semibold text-[#A82F4D] pt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  Click for full mission popup ♡
                </span>
              </div>

              {/* 3. Values Card (Interactive Popup Trigger) */}
              <div 
                onClick={() => openPillarModal('values')}
                className="group cursor-pointer p-4 rounded-2xl bg-[#FDF8EE] hover:bg-[#F6F2E2] border border-[#78844B]/30 hover:border-[#78844B]/60 shadow-xs hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 space-y-1 relative reveal-init delay-300"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="w-8 h-8 rounded-full bg-[#78844B]/20 group-hover:bg-[#78844B]/35 flex items-center justify-center text-[#78844B] transition-colors">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-bold text-[#78844B] bg-white/90 px-2 py-0.5 rounded-full shadow-2xs group-hover:bg-[#78844B] group-hover:text-white transition-all">
                    Explore ↗
                  </span>
                </div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#40251D] group-hover:text-[#78844B] transition-colors">
                  Our Values
                </h4>
                <p className="text-xs text-[#40251D]/75 leading-relaxed">
                  {about.values}
                </p>
                <span className="block text-[10px] font-semibold text-[#78844B] pt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  Click for core values popup ♡
                </span>
              </div>

            </div>

            {/* Read Full Story Button */}
            <div className="pt-2 reveal-init delay-400">
              <Link
                to="/about-us"
                className="inline-flex items-center gap-2.5 bg-[#4C542C] hover:bg-[#3B4222] text-[#FFF9EF] px-7 py-3.5 rounded-full text-sm font-semibold tracking-wide shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer active:scale-98"
              >
                <span>Read Our Full Story</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

        </div>
      </div>

      {/* Interactive Detail Modal Popup */}
      {activeModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto p-4 flex items-center justify-center animate-fade-in">
          
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-300"
            onClick={closeModal}
          />

          {/* Modal Container */}
          <div className="relative max-w-xl w-full bg-[#FFFDF9] rounded-3xl shadow-2xl p-6 sm:p-8 border-2 border-[#F8C6CF] z-10 animate-zoom-in overflow-hidden">
            
            {/* Background Decorative Floral Glow */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#F8C6CF]/25 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#78844B]/15 rounded-full blur-2xl pointer-events-none" />

            {/* Close Button */}
            <button
              type="button"
              onClick={closeModal}
              className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-700 rounded-full hover:bg-stone-100 transition-colors z-20 cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="relative z-10 flex items-start gap-4 mb-5">
              <div className={`w-14 h-14 rounded-2xl ${activeModal.iconBg} ${activeModal.iconColor} flex items-center justify-center shrink-0 shadow-sm ring-4 ring-white`}>
                {activeModal.icon}
              </div>
              
              <div>
                <span className="inline-block px-3 py-0.5 rounded-full bg-[#FCE5E8] text-[#A82F4D] text-[10px] font-bold uppercase tracking-wider mb-1">
                  {activeModal.badge}
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#40251D] leading-tight">
                  {activeModal.title}
                </h3>
                <p className="font-script text-xl text-[#A82F4D]">
                  {activeModal.subtitle}
                </p>
              </div>
            </div>

            {/* Modal Content Paragraphs */}
            <div className="relative z-10 space-y-3 mb-6">
              {activeModal.paragraphs.map((p, idx) => (
                <p key={idx} className="text-xs sm:text-sm text-[#40251D]/80 leading-relaxed font-normal">
                  {p}
                </p>
              ))}
            </div>

            {/* Key Pillars Highlights Box */}
            <div className="relative z-10 bg-white/80 rounded-2xl p-4 sm:p-5 border border-[#F8C6CF]/70 shadow-xs mb-6">
              <h5 className="text-xs uppercase font-bold text-[#78844B] tracking-wider mb-3 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#78844B]" />
                <span>Core Commitments & Standards</span>
              </h5>
              <div className="space-y-2">
                {activeModal.keyPoints.map((point, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs sm:text-[13px] text-[#40251D]/85">
                    <span className="text-[#A82F4D] font-bold mt-0.5">•</span>
                    <span>{point}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quote Banner */}
            <div className="relative z-10 bg-[#FFF9EF] border-l-4 border-[#A82F4D] p-3 rounded-r-xl mb-6">
              <p className="font-serif italic text-xs sm:text-sm text-[#40251D] font-medium">
                "{activeModal.quote}"
              </p>
            </div>

            {/* Footer Action Buttons */}
            <div className="relative z-10 flex flex-col sm:flex-row gap-3">
              <Link
                to="/about-us"
                onClick={closeModal}
                className="flex-1 bg-gradient-to-r from-[#A82F4D] to-[#E98B9B] hover:opacity-95 text-white py-3 px-6 rounded-full text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Read Full Brand Heritage</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              
              <Link
                to="/shop"
                onClick={closeModal}
                className="px-6 py-3 rounded-full bg-[#FFF0F3] hover:bg-[#FCE5E8] text-xs sm:text-sm font-bold text-[#A82F4D] transition-colors text-center cursor-pointer"
              >
                Explore Handcrafted Products
              </Link>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};

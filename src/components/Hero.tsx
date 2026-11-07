import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ArrowRight, Sparkles } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const Hero: React.FC = () => {
  const { cms } = useStore();
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = cms.hero.slides.length > 0 ? cms.hero.slides : [
    {
      id: 'slide-1',
      badge: 'Pretty Palette ♡',
      title: 'Natural Beauty,\nNaturally You ♡',
      subtitle: 'Discover premium cosmetics, skincare and haircare products crafted with care.',
      ctaText: 'Shop Now',
      ctaLink: '/shop',
      taglineTopRight: 'Care\nGlow\nRepeat ♡',
      bgImage: '/assets/hero-bg.png',
      mobileBgImage: '/assets/hero-mobile-bg.png'
    }
  ];

  // Auto advance slide every 7 seconds
  useEffect(() => {
    if (slides.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const handlePrev = () => {
    setCurrentSlide(prev => (prev - 1 + slides.length) % slides.length);
  };

  const handleNext = () => {
    setCurrentSlide(prev => (prev + 1) % slides.length);
  };

  const activeSlide = slides[currentSlide] || slides[0];

  return (
    <section className="relative w-full overflow-hidden bg-[#FDF1F4] border-b border-[#F8C6CF]/50 select-none">
      
      {/* Hero Media Layer */}
      <div className="relative w-full min-h-[500px] sm:min-h-[560px] md:min-h-[600px] lg:min-h-[660px] flex items-center">
        
        {/* Animated Background Container */}
        <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
          {cms.hero.mode === 'video' && cms.hero.videoUrl ? (
            <video 
              autoPlay 
              muted 
              loop 
              playsInline 
              className="w-full h-full object-cover"
              poster="/assets/hero-bg.png"
            >
              <source src={cms.hero.videoUrl} type="video/mp4" />
            </video>
          ) : (
            <div className="relative w-full h-full">
              
              {/* DESKTOP BACKGROUND: uses active slide bgImage with fallback to /assets/hero-bg.png */}
              <img 
                src={activeSlide.bgImage || '/assets/hero-bg.png'} 
                alt="Pretty Palette Natural Beauty Banner" 
                className="hidden md:block w-full h-full object-cover object-right lg:object-center transform scale-100 hover:scale-102 transition-transform duration-1000 ease-out animate-pulse-soft"
                style={{
                  animation: 'subtlePulse 14s ease-in-out infinite alternate',
                }}
              />

              {/* MOBILE BACKGROUND: uses active slide mobileBgImage with fallback to /assets/hero-mobile-bg.png */}
              <img 
                src={activeSlide.mobileBgImage || '/assets/hero-mobile-bg.png'} 
                alt="Pretty Palette Natural Beauty Mobile Banner" 
                className="block md:hidden w-full h-full object-cover object-center transform scale-100 transition-transform duration-1000 ease-out"
                style={{
                  animation: 'mobileDrift 12s ease-in-out infinite alternate',
                }}
              />
              
              {/* Soft Gradient Readability Overlays */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#FDF1F4]/95 via-[#FDF1F4]/75 to-transparent md:w-3/5 lg:w-1/2 pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#FDF1F4]/80 via-transparent to-transparent md:hidden pointer-events-none" />
            </div>
          )}

          {/* Animated Floating Botanical Rose Petals & Sparkling Specks */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Drifting Petal 1 */}
            <div className="absolute top-10 left-[12%] w-5 h-7 bg-[#E98B9B]/60 rounded-full blur-[0.4px] transform rotate-45 animate-petal" />
            {/* Drifting Petal 2 */}
            <div className="absolute top-24 left-[40%] w-4 h-6 bg-[#F8C6CF]/80 rounded-full blur-[0.3px] transform -rotate-12 animate-float-delayed" />
            {/* Drifting Petal 3 */}
            <div className="absolute top-60 right-[20%] w-5 h-8 bg-[#E98B9B]/50 rounded-full blur-[0.4px] transform rotate-30 animate-petal" />
            {/* Drifting Petal 4 */}
            <div className="absolute bottom-20 left-[25%] w-4 h-6 bg-[#FF647F]/40 rounded-full blur-[0.5px] transform rotate-60 animate-float-slow" />
            {/* Drifting Petal 5 */}
            <div className="absolute top-8 right-[10%] w-6 h-9 bg-[#F8C6CF]/70 rounded-full blur-[0.5px] transform -rotate-45 animate-float-delayed" />
          </div>
        </div>

        {/* Top-Right Script Tagline ("Care Glow Repeat ♡") */}
        {activeSlide.taglineTopRight && (
          <div className="absolute top-6 right-6 sm:top-10 sm:right-12 z-20 text-right pointer-events-none hidden sm:block">
            <span className="font-script text-2xl sm:text-3xl md:text-4xl text-[#78844B] font-bold leading-tight drop-shadow-xs whitespace-pre-line block">
              {activeSlide.taglineTopRight}
            </span>
          </div>
        )}

        {/* Hero Slide Content */}
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-14 md:py-24">
          <div className="max-w-xl lg:max-w-2xl animate-slide-up">
            
            {/* Script Subtitle ("Pretty Palette ♡") */}
            <div className="mb-2">
              <span className="font-script text-3xl sm:text-4xl md:text-5xl text-[#A82F4D] font-bold tracking-wide drop-shadow-xs inline-block">
                {activeSlide.badge}
              </span>
            </div>

            {/* Main Heading ("Natural Beauty, Naturally You ♡") */}
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#40251D] leading-[1.15] mb-4 drop-shadow-xs whitespace-pre-line">
              {activeSlide.title}
            </h1>

            {/* Description Paragraph */}
            <p className="text-sm sm:text-base md:text-lg text-[#40251D]/85 font-normal mb-8 max-w-lg leading-relaxed">
              {activeSlide.subtitle}
            </p>

            {/* CTA Buttons: SHOP NOW & EXPLORE COLLECTION (master prompt) */}
            <div className="flex flex-wrap items-center gap-3.5 sm:gap-4">
              <Link
                to={activeSlide.ctaLink}
                className="inline-flex items-center gap-2.5 bg-gradient-to-r from-[#A82F4D] to-[#C75C83] hover:opacity-95 text-white px-7 sm:px-9 py-3.5 sm:py-4 rounded-full font-bold text-sm sm:text-base tracking-wider uppercase shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer active:scale-98"
              >
                <span>{activeSlide.ctaText || 'Shop Now'}</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </Link>

              <Link
                to="/shop"
                className="inline-flex items-center gap-2 bg-white/95 hover:bg-white text-[#292329] hover:text-[#A82F4D] border-2 border-[#E88BAA] px-6 sm:px-8 py-3.5 sm:py-4 rounded-full font-bold text-sm sm:text-base tracking-wider uppercase shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 cursor-pointer active:scale-98"
              >
                <span>Explore Collection</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Carousel Left / Right Arrows */}
        {slides.length > 1 && (
          <>
            <button
              type="button"
              onClick={handlePrev}
              className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-12 sm:h-12 bg-white/90 hover:bg-white text-[#40251D] hover:text-[#A82F4D] rounded-full shadow-lg flex items-center justify-center transition-all duration-200 cursor-pointer"
              title="Previous slide"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              type="button"
              onClick={handleNext}
              className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-12 sm:h-12 bg-white/90 hover:bg-white text-[#40251D] hover:text-[#A82F4D] rounded-full shadow-lg flex items-center justify-center transition-all duration-200 cursor-pointer"
              title="Next slide"
              aria-label="Next slide"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Pagination Indicators - Positioned Comfortably Above Bottom Wave */}
            <div className="absolute bottom-10 sm:bottom-14 left-1/2 -translate-x-1/2 z-30 flex items-center space-x-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    index === currentSlide 
                      ? 'w-8 bg-[#A82F4D]' 
                      : 'w-2.5 bg-[#F8C6CF] hover:bg-[#E98B9B]'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Decorative Patchwork Color-Mix Divider Below Hero Section */}
      <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-none z-20 pointer-events-none">
        <svg 
          className="relative block w-full h-8 sm:h-12 md:h-16 text-[#FCE4EC]" 
          viewBox="0 0 1440 120" 
          preserveAspectRatio="none"
        >
          {/* Layer 1: Soft Blush Pink Accent */}
          <path 
            d="M0,32L48,42.7C96,53,192,75,288,74.7C384,75,480,53,576,48C672,43,768,53,864,69.3C960,85,1056,107,1152,101.3C1248,96,1344,64,1392,48L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z" 
            fill="#FAD0DA" 
            opacity="0.5"
          />
          {/* Layer 2: Warm Rosy Tint */}
          <path 
            d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,58.7C672,64,768,96,864,101.3C960,107,1056,85,1152,74.7C1248,64,1344,64,1392,64L1440,64L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z" 
            fill="#FCE4EC" 
            opacity="0.8"
          />
          {/* Layer 3: Body Deep Pink Fill */}
          <path 
            d="M0,80L48,85.3C96,91,192,101,288,96C384,91,480,69,576,74.7C672,80,768,112,864,112C960,112,1056,80,1152,74.7C1248,69,1344,91,1392,101.3L1440,112L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z" 
            fill="#FCE4EC"
          />
        </svg>
      </div>

      <style>{`
        @keyframes subtlePulse {
          0% { transform: scale(1.0); }
          100% { transform: scale(1.04); }
        }
        @keyframes mobileDrift {
          0% { transform: scale(1.0) translateY(0); }
          100% { transform: scale(1.06) translateY(-8px); }
        }
      `}</style>
    </section>
  );
};

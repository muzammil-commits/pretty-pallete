import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
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
      bgImage: '/assets/hero-bg.png'
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
      
      {/* 1. Hero Background Layer (image copy 3.png) */}
      <div className="relative w-full min-h-[460px] sm:min-h-[520px] md:min-h-[580px] lg:min-h-[640px] flex items-center">
        
        {/* Animated background image container */}
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
              {/* As-it-is hero background with subtle animation */}
              <img 
                src="/assets/hero-bg.png" 
                alt="Pretty Palette Natural Beauty Banner" 
                className="w-full h-full object-cover object-right md:object-center transform scale-100 hover:scale-102 transition-transform duration-1000 ease-out"
                style={{
                  animation: 'subtlePulse 12s ease-in-out infinite alternate',
                }}
              />
              
              {/* Soft gradient overlay for text readability on mobile and desktop */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#FDF1F4]/90 via-[#FDF1F4]/70 to-transparent md:w-3/5 lg:w-1/2 pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#FDF1F4]/60 via-transparent to-transparent pointer-events-none" />
            </div>
          )}

          {/* Animated floating rose petals & sparkling specks drifting across the hero */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Drifting Petal 1 */}
            <div className="absolute top-12 left-[15%] w-4 h-6 bg-[#E98B9B]/60 rounded-full blur-[0.5px] transform rotate-45 animate-float-slow" />
            {/* Drifting Petal 2 */}
            <div className="absolute top-28 left-[45%] w-3 h-5 bg-[#F8C6CF]/80 rounded-full blur-[0.3px] transform -rotate-12 animate-float-delayed" />
            {/* Drifting Petal 3 */}
            <div className="absolute top-64 right-[25%] w-4 h-7 bg-[#E98B9B]/50 rounded-full blur-[0.4px] transform rotate-30 animate-float-slow" />
            {/* Drifting Petal 4 */}
            <div className="absolute bottom-16 left-[28%] w-3 h-5 bg-[#FF647F]/50 rounded-full blur-[0.5px] transform rotate-60 animate-float-delayed" />
            {/* Drifting Petal 5 */}
            <div className="absolute top-8 right-[10%] w-5 h-8 bg-[#F8C6CF]/70 rounded-full blur-[0.6px] transform -rotate-45 animate-float-slow" />
          </div>
        </div>

        {/* 2. Top-Right Script Tagline ("Care Glow Repeat ♡") from reference screenshot */}
        {activeSlide.taglineTopRight && (
          <div className="absolute top-6 right-6 sm:top-10 sm:right-12 z-20 text-right pointer-events-none hidden sm:block">
            <span className="font-script text-2xl sm:text-3xl md:text-4xl text-[#78844B] font-bold leading-tight drop-shadow-xs whitespace-pre-line block">
              {activeSlide.taglineTopRight}
            </span>
          </div>
        )}

        {/* 3. Hero Slide Content */}
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-12 md:py-20">
          <div className="max-w-xl lg:max-w-2xl">
            
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
            <p className="text-base sm:text-lg md:text-xl text-[#40251D]/80 font-normal mb-8 max-w-lg leading-relaxed">
              {activeSlide.subtitle}
            </p>

            {/* CTA Button ("Shop Now ➔") in olive green matching reference screenshot */}
            <div className="flex items-center gap-4">
              <Link
                to={activeSlide.ctaLink}
                className="inline-flex items-center gap-2.5 bg-[#4C542C] hover:bg-[#3B4222] text-[#FFF9EF] px-7 sm:px-8 py-3.5 sm:py-4 rounded-full font-medium text-base sm:text-lg tracking-wide shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer"
              >
                <span>{activeSlide.ctaText}</span>
                <ArrowRight className="w-5 h-5 text-[#FFF9EF]" />
              </Link>
            </div>
          </div>
        </div>

        {/* 4. Carousel Left / Right Arrows */}
        {slides.length > 1 && (
          <>
            <button
              type="button"
              onClick={handlePrev}
              className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-12 sm:h-12 bg-white/85 hover:bg-white text-[#40251D] hover:text-[#A82F4D] rounded-full shadow-md flex items-center justify-center transition-all duration-200 cursor-pointer"
              title="Previous slide"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              type="button"
              onClick={handleNext}
              className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-12 sm:h-12 bg-white/85 hover:bg-white text-[#40251D] hover:text-[#A82F4D] rounded-full shadow-md flex items-center justify-center transition-all duration-200 cursor-pointer"
              title="Next slide"
              aria-label="Next slide"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Pagination Indicators */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex items-center space-x-2">
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

      <style>{`
        @keyframes subtlePulse {
          0% { transform: scale(1.0); }
          100% { transform: scale(1.03); }
        }
      `}</style>
    </section>
  );
};

import React from 'react';

export const FloralBackground: React.FC = () => {
  return (
    <div 
      className="fixed inset-0 pointer-events-none select-none overflow-hidden -z-20"
      aria-hidden="true"
    >
      {/* 1. Main Floral Background Theme from image copy 59.png */}
      <picture className="absolute inset-0 w-full h-full block">
        <source srcSet="/assets/floral-master-bg.webp" type="image/webp" />
        <img
          src="/assets/floral-master-bg.png"
          alt=""
          className="w-full h-full object-cover object-center animate-floral-breathe will-change-transform"
          loading="eager"
        />
      </picture>

      {/* 2. Soft Center Luminance Mask ensuring 100% text and product readability */}
      <div 
        className="absolute inset-0 bg-gradient-to-b from-[#FFF5F8]/30 via-[#FFF9FA]/20 to-[#FFF2F5]/30 pointer-events-none" 
      />

      {/* 3. Subtle Animated Floating Petals (Pure CSS, GPU-accelerated, zero lag) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
        
        {/* Petal 1 - Left quadrant */}
        <div 
          className="absolute left-[12%] animate-petal-1"
          style={{ animationDelay: '0s' }}
        >
          <svg className="w-5 h-5 text-[#F8CCD7] drop-shadow-xs" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C9 7 4 12 4 16C4 19.3 6.7 22 10 22C14 22 19 16 19 11C19 6 15 2 12 2Z" opacity="0.85" />
          </svg>
        </div>

        {/* Petal 2 - Center-Left quadrant */}
        <div 
          className="absolute left-[28%] animate-petal-2"
          style={{ animationDelay: '4.5s' }}
        >
          <svg className="w-4 h-4 text-[#F3B8C7] drop-shadow-xs" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C8 6 3 11 3 15C3 18.9 6.1 22 10 22C15 22 20 15 20 10C20 5 15 2 12 2Z" opacity="0.75" />
          </svg>
        </div>

        {/* Petal 3 - Center-Right quadrant */}
        <div 
          className="absolute left-[68%] animate-petal-3"
          style={{ animationDelay: '2s' }}
        >
          <svg className="w-4.5 h-4.5 text-[#FAD0DA] drop-shadow-xs" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C9 7 4 12 4 16C4 19.3 6.7 22 10 22C14 22 19 16 19 11C19 6 15 2 12 2Z" opacity="0.8" />
          </svg>
        </div>

        {/* Petal 4 - Right quadrant */}
        <div 
          className="absolute left-[84%] animate-petal-1"
          style={{ animationDelay: '8s' }}
        >
          <svg className="w-5 h-5 text-[#F8CCD7] drop-shadow-xs" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C8 6 3 11 3 15C3 18.9 6.1 22 10 22C15 22 20 15 20 10C20 5 15 2 12 2Z" opacity="0.8" />
          </svg>
        </div>

        {/* Petal 5 - Far Left edge drift */}
        <div 
          className="hidden sm:block absolute left-[4%] animate-petal-2"
          style={{ animationDelay: '11s' }}
        >
          <svg className="w-4 h-4 text-[#F3B8C7] drop-shadow-xs" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C9 7 4 12 4 16C4 19.3 6.7 22 10 22C14 22 19 16 19 11C19 6 15 2 12 2Z" opacity="0.75" />
          </svg>
        </div>

        {/* Petal 6 - Far Right edge drift */}
        <div 
          className="hidden sm:block absolute left-[92%] animate-petal-3"
          style={{ animationDelay: '14s' }}
        >
          <svg className="w-4.5 h-4.5 text-[#FAD0DA] drop-shadow-xs" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C8 6 3 11 3 15C3 18.9 6.1 22 10 22C15 22 20 15 20 10C20 5 15 2 12 2Z" opacity="0.8" />
          </svg>
        </div>

      </div>
    </div>
  );
};

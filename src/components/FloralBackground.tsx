import React from 'react';

export const FloralBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden select-none" aria-hidden="true">
      {/* Top Left Delicate Rose & Botanical Leaves */}
      <svg 
        className="absolute -top-12 -left-12 w-64 h-64 sm:w-80 sm:h-80 opacity-40 mix-blend-multiply filter blur-[0.3px] transition-opacity" 
        viewBox="0 0 200 200" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M40 90C25 60 55 25 85 40C115 55 100 95 70 85C50 78 45 100 40 90Z" fill="#FCE8EF" />
        <path d="M70 40C90 20 120 40 110 70C100 100 65 90 75 60C82 40 60 45 70 40Z" fill="#F8C6CF" opacity="0.6" />
        <path d="M30 40C15 65 35 95 65 80C50 60 45 30 30 40Z" fill="#D8E2DC" opacity="0.7" />
        <circle cx="75" cy="65" r="18" fill="#E88BAA" opacity="0.4" />
      </svg>

      {/* Top Right Soft Blooming Floral Sprig */}
      <svg 
        className="absolute top-20 -right-16 w-72 h-72 sm:w-96 sm:h-96 opacity-35 mix-blend-multiply filter blur-[0.2px]" 
        viewBox="0 0 240 240" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M140 60C180 40 200 80 170 110C140 140 110 110 130 80C145 60 125 70 140 60Z" fill="#FCE8EF" />
        <path d="M170 100C210 90 220 130 190 150C160 170 140 130 160 110C175 95 155 105 170 100Z" fill="#FFF0F5" />
        <path d="M120 110C110 140 140 160 150 130C160 100 130 90 120 110Z" fill="#E2E7D7" opacity="0.7" />
        <circle cx="160" cy="115" r="22" fill="#E88BAA" opacity="0.35" />
      </svg>

      {/* Mid Page Right Warm Peach Ambient Glow */}
      <div className="absolute top-1/3 -right-24 w-80 h-80 rounded-full bg-[#FCE8EF]/40 blur-3xl" />

      {/* Mid Page Left Botanical Sage Accent Glow */}
      <div className="absolute top-2/3 -left-20 w-80 h-80 rounded-full bg-[#EBF0E6]/50 blur-3xl" />

      {/* Bottom Right Soft Petal Cluster */}
      <svg 
        className="absolute -bottom-16 -right-12 w-80 h-80 opacity-35 mix-blend-multiply filter blur-[0.3px]" 
        viewBox="0 0 220 220" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M110 110C80 80 120 40 150 70C180 100 140 140 110 110Z" fill="#FCE8EF" />
        <path d="M150 120C170 90 200 120 180 150C160 180 130 150 150 120Z" fill="#FCE5E8" opacity="0.6" />
        <path d="M90 140C70 160 100 190 120 170C140 150 110 120 90 140Z" fill="#DCE3D4" opacity="0.7" />
        <circle cx="140" cy="130" r="16" fill="#C75C83" opacity="0.3" />
      </svg>

      {/* Bottom Left Peach Blossom Silhouette */}
      <svg 
        className="absolute -bottom-10 -left-10 w-72 h-72 opacity-30 mix-blend-multiply filter blur-[0.4px]" 
        viewBox="0 0 200 200" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M80 120C50 100 70 60 100 80C130 100 110 140 80 120Z" fill="#FFF0F5" />
        <path d="M60 150C40 130 70 100 90 120C110 140 80 170 60 150Z" fill="#DDE4D6" opacity="0.6" />
      </svg>
    </div>
  );
};


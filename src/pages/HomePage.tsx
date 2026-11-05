import React from 'react';
import { Hero } from '../components/Hero';
import { BenefitsBar } from '../components/BenefitsBar';
import { CategoryCards } from '../components/CategoryCards';
import { AboutSection } from '../components/AboutSection';
import { WhyChooseSection } from '../components/WhyChooseSection';
import { BestSellers } from '../components/BestSellers';
import { DailyRitualSection } from '../components/DailyRitualSection';
import { TestimonialsSection } from '../components/TestimonialsSection';
import { CommunityGallery } from '../components/CommunityGallery';
import { HomeFaqSection } from '../components/HomeFaqSection';

export const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden">
      {/* 1. Hero Banner - Animated, Desktop & Mobile */}
      <Hero />

      {/* 2. Grand Brand Benefits Bar */}
      <div className="reveal-init">
        <BenefitsBar />
      </div>

      {/* 3. Main Shopping Categories (Cosmetics, Skin Care, Hair Care) */}
      <div className="reveal-init">
        <CategoryCards />
      </div>

      {/* 4. About Pretty Palette */}
      <div className="reveal-init">
        <AboutSection />
      </div>

      {/* 5. Why Choose Pretty Palette with Interactive Popups (image copy 43.png) */}
      <div className="reveal-init">
        <WhyChooseSection />
      </div>

      {/* 7. Our Best Sellers Carousel & Mobile Grid matching desktop screenshot */}
      <div className="reveal-init">
        <BestSellers />
      </div>

      {/* 8. The 4-Step Everyday Self-Care Glow Ritual */}
      <div className="reveal-init">
        <DailyRitualSection />
      </div>

      {/* 9. Verified Buyer Testimonials & Real Stories */}
      <div className="reveal-init">
        <TestimonialsSection />
      </div>

      {/* 10. #PrettyPaletteCommunity Instagram Gallery */}
      <div className="reveal-init">
        <CommunityGallery />
      </div>

      {/* 11. Homepage FAQ Accordion */}
      <div className="reveal-init">
        <HomeFaqSection />
      </div>
    </div>
  );
};

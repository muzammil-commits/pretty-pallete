import React from 'react';
import { Hero } from '../components/Hero';
import { BenefitsBar } from '../components/BenefitsBar';
import { CategoryCards } from '../components/CategoryCards';
import { AboutSection } from '../components/AboutSection';
import { BotanicalIngredients } from '../components/BotanicalIngredients';
import { WhyChooseSection } from '../components/WhyChooseSection';
import { BestSellers } from '../components/BestSellers';
import { DailyRitualSection } from '../components/DailyRitualSection';
import { TestimonialsSection } from '../components/TestimonialsSection';
import { CommunityGallery } from '../components/CommunityGallery';
import { HomeFaqSection } from '../components/HomeFaqSection';

export const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* 1. Hero Banner - Animated, Desktop (image copy 3) & Mobile (image copy 18) */}
      <Hero />

      {/* 2. Grand Brand Benefits Bar (4 Pillars, image copy 4 & 16) */}
      <BenefitsBar />

      {/* 3. Main Shopping Categories (Cosmetics, Skin Care, Hair Care - image copy 5, 6, 7, 8) */}
      <CategoryCards />

      {/* 4. About Pretty Palette (image copy 9 & 10) */}
      <AboutSection />

      {/* 5. Nature's Pure Botanical Alchemy & Ingredients Showcase */}
      <BotanicalIngredients />

      {/* 6. Why Choose Pretty Palette with Interactive Popups (image copy 17) */}
      <WhyChooseSection />

      {/* 7. Our Best Sellers Carousel with Full Uncropped Pictures (image copy 11) */}
      <BestSellers />

      {/* 8. The 4-Step Everyday Self-Care Glow Ritual */}
      <DailyRitualSection />

      {/* 9. Verified Buyer Testimonials & Real Stories */}
      <TestimonialsSection />

      {/* 10. #PrettyPaletteCommunity Instagram Gallery */}
      <CommunityGallery />

      {/* 11. Homepage FAQ Accordion */}
      <HomeFaqSection />

      {/* Note: Standalone Newsletter strip removed as requested in image copy 12.png */}
    </div>
  );
};

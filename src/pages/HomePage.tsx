import React from 'react';
import { Hero } from '../components/Hero';
import { BenefitsBar } from '../components/BenefitsBar';
import { CategoryCards } from '../components/CategoryCards';
import { AboutSection } from '../components/AboutSection';
import { WhyChooseSection } from '../components/WhyChooseSection';
import { BestSellers } from '../components/BestSellers';
import { Newsletter } from '../components/Newsletter';

export const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Section 1: Hero Banner */}
      <Hero />

      {/* Section 2: Brand Benefits Bar */}
      <BenefitsBar />

      {/* Section 3: Main Shopping Categories */}
      <CategoryCards />

      {/* Section 4: About Pretty Palette */}
      <AboutSection />

      {/* Section 5: Why Choose Pretty Palette? */}
      <WhyChooseSection />

      {/* Section 6: Our Best Sellers */}
      <BestSellers />

      {/* Section 7: Newsletter */}
      <Newsletter />
    </div>
  );
};

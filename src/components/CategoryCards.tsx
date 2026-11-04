import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';

export const CategoryCards: React.FC = () => {
  const categories = [
    {
      id: 'cosmetics',
      name: 'Cosmetics',
      tagline: 'Makeup essentials for every mood.',
      subtitle: 'Artisanal lipsticks, herbal kajal, mineral blush & botanical beauty.',
      image: '/assets/banner-cosmetics.png',
      link: '/cosmetics',
      badge: 'Bestselling Glamour',
      color: 'from-[#FDF1F4] to-[#FCE5E8]'
    },
    {
      id: 'skin-care',
      name: 'Skin Care',
      tagline: 'Nourish. Protect. Glow.',
      subtitle: 'Kashmiri saffron, rosehip oil, day creams & hydrating serums.',
      image: '/assets/banner-skincare.png',
      link: '/skin-care',
      badge: 'Natural Radiance',
      color: 'from-[#FDF8EE] to-[#FFF9EF]'
    },
    {
      id: 'hair-care',
      name: 'Hair Care',
      tagline: 'Stronger. Healthier. Happier Hair.',
      subtitle: '18-herb Ayurvedic oils, sulphate-free shampoos & silk masks.',
      image: '/assets/banner-haircare.png',
      link: '/hair-care',
      badge: 'Pure Scalp Therapy',
      color: 'from-[#FCE5E8] to-[#FDF1F4]'
    }
  ];

  return (
    <section className="w-full py-16 sm:py-24 bg-[#FFFDF9] relative overflow-hidden">
      
      {/* Decorative Background Accents */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="font-script text-3xl sm:text-4xl text-[#A82F4D] block mb-2">
            Curated For Your Rituals ♡
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#40251D] mb-4">
            Explore By Category
          </h2>
          <p className="text-sm sm:text-base text-stone-600">
            Handcrafted with 100% natural ingredients, ethically sourced botanicals, and zero synthetic shortcuts.
          </p>
        </div>

        {/* 3 Grand Category Cards (image copy 5.png with images 6, 7, 8) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              to={cat.link}
              className="group relative overflow-hidden rounded-3xl bg-white border border-[#F8C6CF]/70 shadow-sm hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2.5 flex flex-col justify-between"
            >
              {/* Category Image Container - Generous aspect ratio so full image is visible (image copy 6, 7, 8) */}
              <div className="relative w-full h-64 sm:h-72 overflow-hidden bg-stone-100">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
                />
                
                {/* Floating Tag */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 backdrop-blur-xs text-[#A82F4D] text-xs font-bold shadow-xs">
                    <Sparkles className="w-3 h-3" />
                    {cat.badge}
                  </span>
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Card Body */}
              <div className="p-6 sm:p-7 flex flex-col flex-grow justify-between bg-gradient-to-b from-white to-[#FDF1F4]/40">
                <div>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#40251D] group-hover:text-[#A82F4D] transition-colors mb-2">
                    {cat.name}
                  </h3>
                  <p className="font-serif italic text-sm text-[#78844B] font-semibold mb-2">
                    "{cat.tagline}"
                  </p>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-normal mb-5">
                    {cat.subtitle}
                  </p>
                </div>

                <div className="pt-2 border-t border-[#F8C6CF]/30 flex items-center justify-between">
                  <span className="text-xs font-bold text-[#A82F4D] group-hover:underline">
                    View Entire Collection
                  </span>
                  <span className="w-9 h-9 rounded-full bg-[#FCE5E8] group-hover:bg-[#A82F4D] text-[#A82F4D] group-hover:text-white transition-all flex items-center justify-center shadow-xs">
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
};

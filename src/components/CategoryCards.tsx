import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const CategoryCards: React.FC = () => {
  const { cms } = useStore();

  const categories = cms.categories && cms.categories.length > 0 ? cms.categories : [
    {
      id: 'cosmetics',
      name: 'Cosmetics',
      tagline: 'Makeup essentials for every mood.',
      image: '/assets/cat-cosmetics.png',
      link: '/cosmetics'
    },
    {
      id: 'skin-care',
      name: 'Skin Care',
      tagline: 'Nourish. Protect. Glow.',
      image: '/assets/cat-skincare.png',
      link: '/skin-care'
    },
    {
      id: 'hair-care',
      name: 'Hair Care',
      tagline: 'Stronger. Healthier. Happier Hair.',
      image: '/assets/cat-haircare.png',
      link: '/hair-care'
    }
  ];

  return (
    <section className="w-full py-10 sm:py-14 bg-[#FFF9EF]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              to={cat.link}
              className="group relative overflow-hidden rounded-2xl bg-white border border-[#F8C6CF]/50 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1.5 flex flex-col"
            >
              {/* Category Image */}
              <div className="relative w-full h-48 sm:h-52 overflow-hidden bg-[#FCE5E8]/40">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Card Content */}
              <div className="p-5 sm:p-6 flex flex-col flex-grow justify-between bg-gradient-to-b from-white to-[#FDF1F4]/30">
                <div>
                  <h3 className="font-serif text-2xl font-bold text-[#40251D] group-hover:text-[#A82F4D] transition-colors mb-1.5">
                    {cat.name}
                  </h3>
                  <p className="text-sm text-[#40251D]/75 font-normal leading-relaxed mb-4">
                    {cat.tagline}
                  </p>
                </div>

                <div className="pt-2">
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#A82F4D] bg-[#FCE5E8] hover:bg-[#F8C6CF] px-4 py-2 rounded-full transition-all group-hover:translate-x-1">
                    <span>Explore</span>
                    <ArrowRight className="w-3.5 h-3.5" />
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

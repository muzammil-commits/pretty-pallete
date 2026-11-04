import React from 'react';
import { Leaf, Heart, Diamond, HeartHandshake, Headphones } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const BenefitsBar: React.FC = () => {
  const { cms } = useStore();

  const getIcon = (name: string) => {
    switch (name.toLowerCase()) {
      case 'leaf': return <Leaf className="w-5 h-5 sm:w-6 sm:h-6 text-[#78844B]" />;
      case 'heart': return <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-[#A82F4D]" />;
      case 'diamond': return <Diamond className="w-5 h-5 sm:w-6 sm:h-6 text-[#A82F4D]" />;
      case 'hearthandshake': return <HeartHandshake className="w-5 h-5 sm:w-6 sm:h-6 text-[#A82F4D]" />;
      case 'headphones': return <Headphones className="w-5 h-5 sm:w-6 sm:h-6 text-[#40251D]" />;
      default: return <Leaf className="w-5 h-5 sm:w-6 sm:h-6 text-[#78844B]" />;
    }
  };

  const benefits = cms.benefits && cms.benefits.length > 0 ? cms.benefits : [
    { id: 'b-1', title: '100% Natural Ingredients', icon: 'Leaf' },
    { id: 'b-2', title: 'Cruelty-Free Beauty', icon: 'Heart' },
    { id: 'b-3', title: 'Premium Quality Products', icon: 'Diamond' },
    { id: 'b-4', title: 'Made With Love', icon: 'HeartHandshake' },
    { id: 'b-5', title: 'Dedicated Support', icon: 'Headphones' },
  ];

  return (
    <div className="w-full bg-[#FFFDF9] border-b border-[#F8C6CF]/40 py-5 sm:py-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-2 items-center justify-between">
          {benefits.map((item, idx) => (
            <div 
              key={item.id || idx}
              className={`flex items-center justify-center gap-2.5 sm:gap-3 px-2 ${
                idx < benefits.length - 1 ? 'md:border-r md:border-[#F8C6CF]/60' : ''
              } ${idx === 4 ? 'col-span-2 md:col-span-1' : ''}`}
            >
              <div className="shrink-0 transition-transform duration-300 hover:scale-110">
                {getIcon(item.icon)}
              </div>
              <span className="text-xs sm:text-sm font-medium text-[#40251D] text-center md:text-left tracking-tight">
                {item.title}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

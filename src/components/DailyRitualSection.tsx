import React, { useState } from 'react';
import { Sparkles, ArrowRight, ShoppingBag } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { Link } from 'react-router-dom';
import { INITIAL_DAILY_RITUAL } from '../data/mockData';
import { Product } from '../types';

export const DailyRitualSection: React.FC = () => {
  const { cms, addToCart, products } = useStore();
  const [activeStep, setActiveStep] = useState(0);

  const ritual = cms.dailyRitual || INITIAL_DAILY_RITUAL;
  const steps = ritual.steps && ritual.steps.length > 0 ? ritual.steps : INITIAL_DAILY_RITUAL.steps;
  const safeIndex = Math.min(activeStep, steps.length - 1);
  const current = steps[safeIndex] || steps[0];

  const handleAddRoutineProduct = () => {
    if (!current) return;
    const matched = products.find(p => p.name.toLowerCase().includes(current.productName.toLowerCase().split(' ')[0])) || products[0];
    const itemToAdd: Product = {
      ...(matched || {
        id: `ritual-${current.id || current.number}`,
        slug: current.productName.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        category: 'skin-care',
        originalPrice: Math.round(Number(current.price) * 1.3),
        discount: 25,
        rating: 4.9,
        reviewCount: 150,
        shortDescription: current.description,
        description: current.description,
        ingredients: ['Natural Botanical Extracts'],
        usageInstructions: [current.tips],
        inStock: true,
        stockQuantity: 50,
        tags: ['Ayurvedic', 'Daily Ritual']
      }),
      name: current.productName,
      price: Number(current.price) || 299,
      image: current.image || (matched ? matched.image : '/assets/ritual-step-1.png'),
    };
    addToCart(itemToAdd, 1);
  };

  return (
    <section className="w-full py-8 sm:py-12 bg-transparent relative overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-script text-3xl sm:text-4xl text-[#A82F4D] block mb-2">
            {ritual.scriptHeading || 'The Art of Self-Care ♡'}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#40251D] mb-4">
            {ritual.heading || 'The 4-Step Daily Glow Ritual'}
          </h2>
          <p className="text-sm sm:text-base text-stone-600 leading-relaxed font-normal">
            {ritual.description || 'Beauty is not a chore — it is your daily sanctuary. Follow our Ayurvedic nature-inspired routine to unlock your healthiest, lit-from-within complexion.'}
          </p>
        </div>

        {/* Step Selector Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          {steps.map((s, idx) => (
            <button
              key={s.id || s.number || idx}
              type="button"
              onClick={() => setActiveStep(idx)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                safeIndex === idx
                  ? 'bg-[#A82F4D] text-white shadow-md scale-105'
                  : 'bg-[#FDF1F4] text-[#40251D] hover:bg-[#FCE5E8]'
              }`}
            >
              <span>{s.number}.</span>
              <span>{s.action}</span>
            </button>
          ))}
        </div>

        {/* Interactive Ritual Showcase Card */}
        {current && (
          <div className="bg-gradient-to-r from-[#FDF1F4] via-[#FFF9EF] to-[#FDF8EE] rounded-3xl border border-[#F8C6CF] p-6 sm:p-10 lg:p-12 shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              
              {/* Left: Step Info (6 cols) */}
              <div className="lg:col-span-6 space-y-4">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs font-bold px-3.5 py-1 rounded-full bg-[#A82F4D] text-white shadow-xs">
                    Step {current.number}
                  </span>
                  <span className="text-xs font-bold text-[#78844B] uppercase tracking-wider">
                    {current.time}
                  </span>
                </div>

                <h3 className="font-serif text-2xl sm:text-4xl font-bold text-[#40251D]">
                  {current.title}
                </h3>

                <p className="text-sm sm:text-base text-stone-700 leading-relaxed font-normal">
                  {current.description}
                </p>

                {/* Ritual Pro Tip */}
                {current.tips && (
                  <div className="p-4 rounded-2xl bg-white/95 border border-[#F8C6CF]/60 flex items-start gap-3 shadow-xs">
                    <Sparkles className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                    <div>
                      <h5 className="font-bold text-xs uppercase tracking-wider text-[#40251D]">Beauty Tip:</h5>
                      <p className="text-xs text-stone-600 mt-0.5">{current.tips}</p>
                    </div>
                  </div>
                )}

                <div className="pt-2 flex flex-wrap items-center gap-4">
                  <button
                    type="button"
                    onClick={handleAddRoutineProduct}
                    className="bg-[#A82F4D] hover:bg-[#8D253F] text-white px-6 py-3 rounded-full text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer active:scale-95"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add {current.productName} (₹{current.price})</span>
                  </button>

                  <Link
                    to={current.categoryLink || '/skin-care'}
                    className="text-xs font-bold text-[#78844B] hover:text-[#4C542C] inline-flex items-center gap-1 hover:underline"
                  >
                    <span>Explore Routine Category</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              {/* Right: Grand Level Ritual Visual */}
              <div className="lg:col-span-6 flex justify-center">
                <div className="relative group w-full max-w-lg">
                  <div className="relative w-full h-72 sm:h-88 md:h-[380px] rounded-3xl overflow-hidden bg-white p-2 sm:p-2.5 border-2 border-[#F8C6CF]/80 shadow-xl transition-all duration-500 hover:shadow-2xl">
                    <div className="w-full h-full rounded-2xl overflow-hidden relative">
                      <img
                        key={current.number}
                        src={current.image || '/assets/ritual-step-1.png'}
                        alt={current.title}
                        className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-all duration-700 ease-out animate-fade-in"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none" />
                    </div>
                  </div>
                  <div className="absolute bottom-3 right-3 sm:-bottom-3 sm:right-4 bg-gradient-to-r from-[#A82F4D] to-[#E98B9B] text-white px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-bold shadow-xl flex items-center gap-1.5 border border-white/80">
                    <Sparkles className="w-4 h-4 text-amber-200" />
                    <span>Step {current.number} • {current.action}</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};


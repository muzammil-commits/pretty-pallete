import React, { useState } from 'react';
import { Sparkles, Leaf, MapPin, X, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Ingredient {
  id: string;
  name: string;
  scientificName: string;
  region: string;
  image: string;
  role: string;
  description: string;
  benefits: string[];
  featuredIn: string;
  category: string;
}

const INGREDIENTS: Ingredient[] = [
  {
    id: 'ing-1',
    name: 'Kashmiri Mogra Saffron',
    scientificName: 'Crocus Sativus',
    region: 'Pampore, Kashmir',
    image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=600&q=80',
    role: 'Cellular Illumination & Spot Fading',
    description: 'Harvested by hand in the misty valleys of Kashmir, these red-gold threads are rich in crocin and antioxidants that combat cellular oxidative stress and fade melanin pigmentation.',
    benefits: ['Evens skin discoloration', 'Imparts a warm dewy glow', 'Boosts cellular microcirculation'],
    featuredIn: 'Radiance Face Cream',
    category: 'Skin Care'
  },
  {
    id: 'ing-2',
    name: 'Kannauj Damask Rose',
    scientificName: 'Rosa Damascena',
    region: 'Kannauj, Uttar Pradesh',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80',
    role: 'Hydration & Dermal Soothing',
    description: 'Steam-distilled at dawn using centuries-old deg-bhapka copper stills to preserve pure essential rose hydrosol that calms irritation, tightens enlarged pores, and balances physiological pH.',
    benefits: ['Tightens and refines pores', 'Instant anti-inflammatory soothing', 'Locks cellular moisture'],
    featuredIn: 'Rose & Hibiscus Mist',
    category: 'Skin Care'
  },
  {
    id: 'ing-3',
    name: 'Pure Desi Cow Ghee',
    scientificName: 'Clarified A2 Butterfat',
    region: 'Artisanal Indian Gaushalas',
    image: 'https://images.unsplash.com/photo-1589927986089-35812388d1f4?auto=format&fit=crop&w=600&q=80',
    role: 'Ocular Cooling & Lash Nourishment',
    description: 'Hand-churned following the traditional Bilona method. Infused with natural camphor and cooling herbs to serve as the gentle, lead-free nourishing base for our herbal kajal.',
    benefits: ['Cools strained computer-tired eyes', 'Promotes eyelash density', 'Zero chemical stinging or redness'],
    featuredIn: 'Herbal Kajal',
    category: 'Cosmetics'
  },
  {
    id: 'ing-4',
    name: '18-Herb Ayurvedic Infusion',
    scientificName: 'Bhringraj & Amla Synergy',
    region: 'Western Ghats, Kerala',
    image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=600&q=80',
    role: 'Follicular Revival & Hair Fall Control',
    description: 'Bhringraj (the king of hair), amla, rosemary, and fenugreek seeds slowly simmered in cold-pressed coconut oil for 72 hours to extract rich bio-actives that stimulate dormant hair follicles.',
    benefits: ['Stops hair breakage and shedding', 'Nourishes dry flaky scalps', 'Restores mirror-like shine'],
    featuredIn: 'Nourishing Hair Oil',
    category: 'Hair Care'
  }
];

export const BotanicalIngredients: React.FC = () => {
  const [selectedIng, setSelectedIng] = useState<Ingredient | null>(null);

  return (
    <section className="w-full py-20 sm:py-28 bg-[#FFF9EF]/80 border-b border-[#F8C6CF]/50 relative overflow-hidden">
      
      {/* Decorative blurred botanical gradients */}
      <div className="absolute top-0 right-1/3 w-96 h-96 bg-[#78844B]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-[#F8C6CF]/25 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white border border-[#78844B]/30 mb-3 shadow-2xs">
            <Leaf className="w-3.5 h-3.5 text-[#78844B]" />
            <span className="text-xs uppercase tracking-widest font-bold text-[#78844B]">
              Ethical Botanical Sourcing
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#40251D] mb-4">
            Nature's Pure Alchemy ♡
          </h2>
          <p className="text-sm sm:text-base text-stone-600 leading-relaxed font-normal">
            We journey across India's most pristine botanical regions to hand-select cold-pressed oils, wild-harvested herbs, and pure plant actives that honor your skin.
          </p>
        </div>

        {/* 4 Interactive Ingredient Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {INGREDIENTS.map((ing) => (
            <div
              key={ing.id}
              onClick={() => setSelectedIng(ing)}
              className="group cursor-pointer rounded-3xl bg-white border border-[#F8C6CF]/70 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 flex flex-col justify-between"
            >
              {/* Photo */}
              <div className="relative w-full h-48 overflow-hidden bg-stone-100">
                <img
                  src={ing.image}
                  alt={ing.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                <span className="absolute top-3 right-3 bg-white/90 backdrop-blur-xs text-[#78844B] text-[10px] font-bold px-2.5 py-1 rounded-full shadow-2xs flex items-center gap-1">
                  <MapPin className="w-3 h-3" /> {ing.region}
                </span>
              </div>

              {/* Body */}
              <div className="p-5 sm:p-6 flex flex-col flex-grow justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-[#A82F4D] block mb-1">
                    {ing.role}
                  </span>
                  <h3 className="font-serif text-lg font-bold text-[#40251D] group-hover:text-[#A82F4D] transition-colors mb-1">
                    {ing.name}
                  </h3>
                  <p className="italic text-xs text-stone-400 mb-3">
                    {ing.scientificName}
                  </p>
                  <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                    {ing.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs font-bold text-[#78844B]">
                  <span>Featured in {ing.featuredIn}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Ingredient Detail Modal */}
      {selectedIng && (
        <div className="fixed inset-0 z-50 overflow-y-auto p-4 flex items-center justify-center">
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-fade-in"
            onClick={() => setSelectedIng(null)}
          />

          <div className="relative max-w-lg w-full bg-white rounded-3xl shadow-2xl overflow-hidden border border-[#F8C6CF] z-10 animate-zoom-in text-left">
            <button
              type="button"
              onClick={() => setSelectedIng(null)}
              className="absolute top-4 right-4 z-20 p-2 text-stone-500 hover:text-stone-900 bg-white/80 rounded-full shadow-xs cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative h-56 w-full">
              <img src={selectedIng.image} alt={selectedIng.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-6 text-white">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
                  Origin: {selectedIng.region}
                </span>
                <h3 className="font-serif text-2xl font-bold">{selectedIng.name}</h3>
                <p className="italic text-xs text-stone-200">{selectedIng.scientificName}</p>
              </div>
            </div>

            <div className="p-6 sm:p-8 space-y-4">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#A82F4D] mb-1">Artisanal Role:</h4>
                <p className="font-serif text-lg font-bold text-[#40251D]">{selectedIng.role}</p>
              </div>

              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                {selectedIng.description}
              </p>

              <div className="bg-[#FDF1F4] rounded-2xl p-4 border border-[#F8C6CF]/60 space-y-1.5">
                <span className="text-xs font-bold uppercase tracking-wider text-[#A82F4D] block mb-1">
                  Clinically Observed Benefits:
                </span>
                {selectedIng.benefits.map((b, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-stone-700">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#78844B] shrink-0" />
                    <span>{b}</span>
                  </div>
                ))}
              </div>

              <div className="pt-2 flex items-center justify-between">
                <span className="text-xs text-stone-500">
                  Key active in <strong>{selectedIng.featuredIn}</strong>
                </span>
                <Link
                  to="/shop"
                  onClick={() => setSelectedIng(null)}
                  className="bg-[#A82F4D] text-white px-5 py-2 rounded-full text-xs font-bold hover:bg-[#8D253F] transition-colors"
                >
                  Shop This Product
                </Link>
              </div>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};

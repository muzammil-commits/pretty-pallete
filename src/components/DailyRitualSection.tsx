import React, { useState } from 'react';
import { Sparkles, Check, ArrowRight, ShoppingBag } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { Link } from 'react-router-dom';

export const DailyRitualSection: React.FC = () => {
  const { addToCart, products } = useStore();
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      number: '01',
      title: 'Purify & Awaken',
      action: 'Cleanse',
      time: 'Morning & Evening',
      description: 'Remove environmental toxins, unclog micro-pores and purify skin with our sulphate-free botanical face cleanser infused with rose water and gotu kola.',
      productName: 'Botanical Clarifying Wash',
      price: 299,
      image: '/assets/full-daycream.png',
      tips: 'Massage in gentle upward circular motions for 60 seconds with lukewarm water.'
    },
    {
      number: '02',
      title: 'Replenish & Balance',
      action: 'Tone & Mist',
      time: 'Post-Cleanse / Anytime',
      description: 'Spritz pure steam-distilled Damask rose water across face and neck to re-establish the skin’s physiological acid mantle and prepare cells for serum absorption.',
      productName: 'Rose & Hibiscus Hydrating Mist',
      price: 349,
      image: '/assets/full-faceserum.png',
      tips: 'Pat gently onto damp skin. Do not let it fully dry before applying your serum.'
    },
    {
      number: '03',
      title: 'Illuminate & Repair',
      action: 'Treat',
      time: 'Daily Ritual',
      description: 'Infuse deep dermal layers with Kashmiri Mogra saffron, ethyl ascorbic acid and hyaluronic acid to erase dullness and reverse free radical damage.',
      productName: 'Kashmiri Saffron Glow Serum',
      price: 549,
      image: '/assets/full-faceserum.png',
      tips: 'Warm 3 to 4 drops between clean palms and press gently into face, neck, and decollete.'
    },
    {
      number: '04',
      title: 'Lock In Luminous Moisture',
      action: 'Protect & Glow',
      time: 'Final Seal',
      description: 'Seal in hydration with our signature Radiance Day Cream, fortified with cold-pressed rosehip seed oil and botanical squalane for 24-hour glow.',
      productName: 'Radiance Day Cream',
      price: 499,
      image: '/assets/full-daycream.png',
      tips: 'Follow with lead-free Matte Lust Lipstick or Lip & Cheek Tint for effortless natural radiance.'
    }
  ];

  const current = steps[activeStep];

  const handleAddRoutineProduct = () => {
    const matched = products.find(p => p.name.toLowerCase().includes(current.productName.toLowerCase().split(' ')[0])) || products[0];
    addToCart(matched, 1);
  };

  return (
    <section className="w-full py-20 sm:py-28 bg-white border-b border-[#F8C6CF]/50 relative overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-script text-3xl sm:text-4xl text-[#A82F4D] block mb-2">
            The Art of Self-Care ♡
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#40251D] mb-4">
            The 4-Step Daily Glow Ritual
          </h2>
          <p className="text-sm sm:text-base text-stone-600 leading-relaxed font-normal">
            Beauty is not a chore — it is your daily sanctuary. Follow our Ayurvedic nature-inspired routine to unlock your healthiest, lit-from-within complexion.
          </p>
        </div>

        {/* Step Selector Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          {steps.map((s, idx) => (
            <button
              key={s.number}
              type="button"
              onClick={() => setActiveStep(idx)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeStep === idx
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
        <div className="bg-gradient-to-r from-[#FDF1F4] via-[#FFF9EF] to-[#FDF8EE] rounded-3xl border border-[#F8C6CF] p-8 sm:p-12 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left: Step Info (7 cols) */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs font-bold px-3 py-1 rounded-full bg-[#A82F4D] text-white">
                  Step {current.number}
                </span>
                <span className="text-xs font-semibold text-[#78844B] uppercase tracking-wider">
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
              <div className="p-4 rounded-2xl bg-white/90 border border-[#F8C6CF]/60 flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <h5 className="font-bold text-xs uppercase tracking-wider text-[#40251D]">Beauty Tip:</h5>
                  <p className="text-xs text-stone-600 mt-0.5">{current.tips}</p>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={handleAddRoutineProduct}
                  className="bg-[#A82F4D] hover:bg-[#8D253F] text-white px-6 py-3 rounded-full text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add {current.productName} (₹{current.price})</span>
                </button>

                <Link
                  to="/skin-care"
                  className="text-xs font-bold text-[#78844B] hover:text-[#4C542C] inline-flex items-center gap-1 hover:underline"
                >
                  <span>Explore Routine Category</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Right: Product Showcase Visual (5 cols) */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative group max-w-sm w-full">
                <div className="w-full h-72 sm:h-80 rounded-3xl bg-white p-6 border-2 border-white shadow-xl flex items-center justify-center overflow-hidden">
                  <img
                    src={current.image}
                    alt={current.productName}
                    className="max-h-full max-w-full object-contain filter drop-shadow-lg group-hover:scale-108 transition-transform duration-500 ease-out"
                  />
                </div>
                <div className="absolute -bottom-3 -right-3 bg-[#78844B] text-white px-3.5 py-1.5 rounded-full text-xs font-bold shadow-md">
                  Step {current.number} Essential
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

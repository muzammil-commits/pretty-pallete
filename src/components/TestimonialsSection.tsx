import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, CheckCircle2, Heart, Quote } from 'lucide-react';

interface Testimonial {
  id: string;
  name: string;
  location: string;
  avatar: string;
  productBought: string;
  rating: number;
  quote: string;
  duration: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: 't-1',
    name: 'Ananya Reddy',
    location: 'Hyderabad, Telangana',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    productBought: 'Radiance Day Cream',
    rating: 5,
    quote: 'Within just two weeks of using the Kashmiri Saffron Day Cream, my post-acne blemishes faded dramatically! The fragrance smells like real blooming roses and Kashmiri saffron threads, not artificial perfume. My skin stays hydrated without any sticky oiliness.',
    duration: 'Verified Buyer • Using for 3 months'
  },
  {
    id: 't-2',
    name: 'Priya Sharma',
    location: 'Bengaluru, Karnataka',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
    productBought: 'Matte Lust Lipstick (Ruby Romance)',
    rating: 5,
    quote: 'I have searched forever for a lead-free lipstick that actually lasts through lunch and coffee. The Matte Lust Lipstick is velvety smooth, deeply pigmented, and feels like soft flower petals on my lips. Will definitely repurchase all shades!',
    duration: 'Verified Buyer • Using for 1 month'
  },
  {
    id: 't-3',
    name: 'Sneha Patel',
    location: 'Mumbai, Maharashtra',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
    productBought: 'Nourishing Hair Oil (18 Herbs)',
    rating: 5,
    quote: 'Post-monsoon hair shedding had made my ponytail so thin. This oil has stopped my hair fall within 3 weeks of twice-weekly warm champi sessions! The herbal infusion smells calming and authentic. My hair feels 10x softer.',
    duration: 'Verified Buyer • Using for 2 months'
  },
  {
    id: 't-4',
    name: 'Dr. Kavitha Menon',
    location: 'Vijayawada, Andhra Pradesh',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    productBought: 'Herbal Kajal (Pure Desi Cow Ghee)',
    rating: 5,
    quote: 'As an ophthalmologist who spends long hours looking at screens, most commercial kajals irritate and dry my eyes. Pretty Palette’s cow ghee kajal is wonderfully cooling, jet black, and never stings. Absolutely gentle and safe.',
    duration: 'Verified Buyer • Using for 4 months'
  }
];

export const TestimonialsSection: React.FC = () => {
  const [index, setIndex] = useState(0);

  const prev = () => setIndex(i => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  const next = () => setIndex(i => (i + 1) % TESTIMONIALS.length);

  const current = TESTIMONIALS[index];

  return (
    <section className="w-full py-8 sm:py-12 bg-transparent relative overflow-hidden">
      
      {/* Decorative blurred backgrounds */}
      <div className="absolute top-1/2 left-10 w-72 h-72 bg-[#F8C6CF]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-10 w-72 h-72 bg-[#78844B]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-14">
          <span className="font-script text-3xl sm:text-4xl text-[#A82F4D] block mb-2">
            Loved By Our Community ♡
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#40251D] mb-3">
            Real Stories, Real Radiance
          </h2>
          <p className="text-sm sm:text-base text-stone-600">
            Over 12,000+ Indian women have transformed their skincare and haircare routines with Pretty Palette.
          </p>
        </div>

        {/* Featured Testimonial Card */}
        <div className="relative bg-white rounded-3xl border border-[#F8C6CF] p-8 sm:p-12 shadow-sm">
          
          <Quote className="w-12 h-12 text-[#F8C6CF]/60 absolute top-6 right-8 pointer-events-none" />

          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-8">
            
            {/* Avatar */}
            <div className="relative shrink-0">
              <img
                src={current.avatar}
                alt={current.name}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-4 border-[#FDF1F4] shadow-md"
              />
              <span className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-[#78844B] text-white flex items-center justify-center shadow-xs">
                <CheckCircle2 className="w-4 h-4" />
              </span>
            </div>

            {/* Testimonial Content */}
            <div className="space-y-3 text-center sm:text-left flex-grow">
              {/* Stars */}
              <div className="flex items-center justify-center sm:justify-start gap-1 text-amber-400">
                {[...Array(current.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>

              {/* Quote */}
              <p className="font-serif text-base sm:text-lg text-stone-800 leading-relaxed italic">
                "{current.quote}"
              </p>

              {/* Author & Product */}
              <div className="pt-2">
                <h4 className="font-bold text-sm sm:text-base text-[#40251D]">
                  {current.name}
                </h4>
                <p className="text-xs text-[#78844B] font-semibold">{current.location}</p>
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-1 text-xs text-stone-500">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#FCE5E8] text-[#A82F4D] font-bold">
                    Purchased: {current.productBought}
                  </span>
                  <span>•</span>
                  <span>{current.duration}</span>
                </div>
              </div>
            </div>

          </div>

          {/* Controls */}
          <div className="flex items-center justify-between pt-8 mt-6 border-t border-stone-100">
            <div className="flex items-center space-x-1.5">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === index ? 'w-6 bg-[#A82F4D]' : 'w-2 bg-[#F8C6CF]'
                  }`}
                  aria-label={`Testimonial ${i + 1}`}
                />
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={prev}
                className="w-10 h-10 rounded-full border border-stone-200 hover:border-[#A82F4D] text-[#40251D] hover:text-[#A82F4D] flex items-center justify-center transition-colors cursor-pointer"
                title="Previous testimonial"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={next}
                className="w-10 h-10 rounded-full border border-stone-200 hover:border-[#A82F4D] text-[#40251D] hover:text-[#A82F4D] flex items-center justify-center transition-colors cursor-pointer"
                title="Next testimonial"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};


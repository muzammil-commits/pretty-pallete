import React from 'react';
import { Heart, Sparkles } from 'lucide-react';

interface GalleryItem {
  id: string;
  image: string;
  caption: string;
  user: string;
  likes: string;
}

const GALLERY: GalleryItem[] = [
  {
    id: 'g-1',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80',
    caption: 'My morning golden hour glow ritual with Pretty Palette saffron cream ✨',
    user: '@meera.glows',
    likes: '1.4k'
  },
  {
    id: 'g-2',
    image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=600&q=80',
    caption: 'Ruby Romance is my new signature lip shade! Buttery soft & zero lead ♡',
    user: '@divya_sharma',
    likes: '890'
  },
  {
    id: 'g-3',
    image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=600&q=80',
    caption: 'Self-care Sunday unboxing! The packaging feels so artisanal and luxurious 🌸',
    user: '@anushka.aesthetic',
    likes: '2.1k'
  },
  {
    id: 'g-4',
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80',
    caption: 'Pure Kannauj damask rose water spritz on the go! Refreshment in a bottle 🌿',
    user: '@ritika_wellness',
    likes: '1.1k'
  }
];

export const CommunityGallery: React.FC = () => {
  return (
    <section className="w-full py-20 sm:py-24 bg-transparent border-b border-[#F8C6CF]/50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="font-script text-3xl sm:text-4xl text-[#A82F4D] block mb-2">
            Share Your Glow ♡
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#40251D] mb-3">
            #PrettyPaletteCommunity
          </h2>
          <p className="text-sm sm:text-base text-stone-600">
            Tag @prettypalette on Instagram to be featured on our official aesthetic community wall!
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {GALLERY.map((item) => (
            <div
              key={item.id}
              className="group relative rounded-3xl overflow-hidden aspect-square bg-stone-100 shadow-xs hover:shadow-xl transition-all duration-500"
            >
              <img
                src={item.image}
                alt={item.caption}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
              />
              
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-5 flex flex-col justify-end text-white">
                <div className="flex items-center gap-1.5 text-xs text-amber-300 font-bold mb-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{item.user}</span>
                </div>
                <p className="text-xs text-stone-200 line-clamp-2 leading-relaxed mb-3">
                  "{item.caption}"
                </p>
                <div className="flex items-center justify-between text-xs font-semibold text-stone-300 pt-2 border-t border-white/20">
                  <span className="flex items-center gap-1">
                    <Heart className="w-3.5 h-3.5 fill-[#FF647F] text-[#FF647F]" /> {item.likes}
                  </span>
                  <span className="text-[10px] uppercase tracking-wider text-stone-300">Instagram</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

import React, { useState, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Star, Heart, ShoppingBag, Eye, ArrowUpDown, ChevronRight, Sparkles } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { Product, CategoryType } from '../types';

interface CategoryConfig {
  title: string;
  scriptTitle: string;
  description: string;
  bannerImage: string;
  category: CategoryType;
}

const CATEGORY_MAP: Record<string, CategoryConfig> = {
  'cosmetics': {
    title: 'Natural Cosmetics',
    scriptTitle: 'Pure Glamour, Pure Kindness ♡',
    description: 'Explore our range of artisanal lead-free lipsticks, traditional herbal kajal, compact setting powders, and pure botanical cheek tints crafted with organic plant pigments.',
    bannerImage: '/assets/banner-cosmetics.png',
    category: 'cosmetics'
  },
  'skin-care': {
    title: 'Skin Care Rituals',
    scriptTitle: 'Nourish. Protect. Glow ♡',
    description: 'Imbued with Kashmiri saffron, gotu kola, cold-pressed rosehip seed oil, and plant hyaluronic acid. Experience deep dermal replenishment and enduring luminosity.',
    bannerImage: '/assets/banner-skincare.png',
    category: 'skin-care'
  },
  'hair-care': {
    title: 'Hair Care Rituals',
    scriptTitle: 'Stronger. Healthier. Happier Hair ♡',
    description: 'Ancient Ayurvedic hair remedies blended with modern hair wellness. Infused with 18 rare botanicals, bhringraj, amla, rosemary, and sulphate-free clean cleansers.',
    bannerImage: '/assets/banner-haircare.png',
    category: 'hair-care'
  }
};

export const CategoryPage: React.FC = () => {
  const location = useLocation();
  const path = location.pathname.replace('/', '') || 'cosmetics';
  const config = CATEGORY_MAP[path] || CATEGORY_MAP['cosmetics'];

  const { products, addToCart, toggleWishlist, isInWishlist, setQuickViewProduct } = useStore();
  const [sortBy, setSortBy] = useState<string>('featured');

  const categoryProducts = useMemo(() => {
    return products
      .filter(p => p.category === config.category)
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        return 0;
      });
  }, [products, config.category, sortBy]);

  return (
    <div className="min-h-screen bg-transparent py-8 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-xs text-stone-500 mb-6">
          <Link to="/" className="hover:text-[#A82F4D]">Home</Link>
          <ChevronRight className="w-3 h-3 text-stone-400" />
          <Link to="/shop" className="hover:text-[#A82F4D]">Shop</Link>
          <ChevronRight className="w-3 h-3 text-stone-400" />
          <span className="font-semibold text-[#A82F4D] capitalize">{config.title}</span>
        </div>

        {/* Unique Category Banner with image copy 63.png floral watercolor background */}
        <div 
          className="relative rounded-3xl overflow-hidden p-8 sm:p-12 mb-12 border border-[#F8C6CF] shadow-sm bg-cover bg-center"
          style={{ backgroundImage: "url('/assets/category-banner-bg.webp')" }}
        >
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            <div className="md:col-span-7">
              <span className="font-script text-3xl sm:text-4xl text-[#A82F4D] block mb-2">
                {config.scriptTitle}
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#40251D] mb-4">
                {config.title}
              </h1>
              <p className="text-sm sm:text-base text-stone-700 leading-relaxed max-w-2xl">
                {config.description}
              </p>
            </div>

            <div className="md:col-span-5 flex justify-center">
              <div className="w-full max-w-md h-56 sm:h-64 rounded-2xl overflow-hidden shadow-xl border-4 border-white transform rotate-1 hover:rotate-0 transition-transform">
                <img
                  src={config.bannerImage}
                  alt={config.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

          </div>
        </div>

        {/* Controls Bar */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#F8C6CF]/50">
          <p className="text-sm font-semibold text-stone-600">
            Showing {categoryProducts.length} handcrafted products
          </p>

          <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-full border border-stone-200 shadow-2xs">
            <ArrowUpDown className="w-4 h-4 text-[#A82F4D]" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent text-xs font-medium text-[#40251D] focus:outline-none cursor-pointer"
            >
              <option value="featured">Featured First</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Customer Rating</option>
            </select>
          </div>
        </div>

        {/* Product Grid with Full Visible Images */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
          {categoryProducts.map((product: Product) => {
            const inWishlist = isInWishlist(product.id);

            return (
              <div
                key={product.id}
                className="group relative rounded-3xl bg-[#FFFDF9] border border-[#F8C6CF]/70 p-4 sm:p-5 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                {/* Full Image Container */}
                <div className="relative w-full h-64 sm:h-72 rounded-2xl overflow-hidden bg-gradient-to-b from-[#FDF1F4] to-white flex items-center justify-center mb-4 p-3 border border-[#F8C6CF]/30">
                  <Link to={`/product/${product.slug}`} className="w-full h-full flex items-center justify-center">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="max-h-full max-w-full object-contain p-2 group-hover:scale-108 transition-transform duration-500 filter drop-shadow-md"
                    />
                  </Link>

                  {product.discount > 0 && (
                    <span className="absolute top-3 left-3 bg-[#A82F4D] text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow-xs">
                      {product.discount}% OFF
                    </span>
                  )}

                  <button
                    type="button"
                    onClick={() => toggleWishlist(product.id)}
                    className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/95 hover:bg-white text-stone-600 hover:text-[#FF647F] shadow-xs flex items-center justify-center transition-colors cursor-pointer"
                  >
                    <Heart 
                      className={`w-4 h-4 ${inWishlist ? 'fill-[#FF647F] text-[#FF647F]' : ''}`} 
                    />
                  </button>

                  <button
                    type="button"
                    onClick={() => setQuickViewProduct(product)}
                    className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-white/95 hover:bg-white text-[#40251D] hover:text-[#A82F4D] text-xs font-bold px-4 py-2 rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center gap-1.5 cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Quick View</span>
                  </button>
                </div>

                {/* Details */}
                <div className="text-center flex-grow flex flex-col justify-between">
                  <div>
                    <Link 
                      to={`/product/${product.slug}`}
                      className="block font-serif text-lg font-bold text-[#40251D] hover:text-[#A82F4D] transition-colors leading-snug mb-1 line-clamp-1"
                    >
                      {product.name}
                    </Link>

                    <div className="flex items-center justify-center gap-1 mb-2">
                      <div className="flex items-center text-amber-400">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-3.5 h-3.5 ${i < Math.floor(product.rating) ? 'fill-amber-400' : 'text-stone-300'}`} 
                          />
                        ))}
                      </div>
                      <span className="text-xs text-stone-600 font-medium">
                        {product.rating} ({product.reviewCount})
                      </span>
                    </div>

                    <div className="flex items-center justify-center gap-2 mb-4">
                      <span className="font-sans text-lg font-bold text-[#40251D]">
                        ₹{product.price}
                      </span>
                      {product.originalPrice > product.price && (
                        <span className="font-sans text-xs sm:text-sm text-stone-400 line-through">
                          ₹{product.originalPrice}
                        </span>
                      )}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => addToCart(product, 1, product.variants?.[0])}
                    className="w-full bg-[#F8C6CF] hover:bg-[#FF647F] hover:text-white text-[#A82F4D] text-xs sm:text-sm font-bold py-3 px-4 rounded-full transition-all duration-200 shadow-xs flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Bag</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Star, ShoppingBag, Eye, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { Product } from '../types';

export const BestSellers: React.FC = () => {
  const { products, addToCart, toggleWishlist, isInWishlist, setQuickViewProduct } = useStore();
  
  // Filter best sellers
  const bestSellers = products.filter(p => p.isBestSeller);
  const displayList = bestSellers.length > 0 ? bestSellers : products.slice(0, 4);

  const [currentIndex, setCurrentIndex] = useState(0);

  const itemsPerView = 4;
  const maxIndex = Math.max(0, displayList.length - itemsPerView);

  const handlePrev = () => {
    setCurrentIndex(prev => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex(prev => Math.min(maxIndex, prev + 1));
  };

  const visibleProducts = displayList.slice(currentIndex, currentIndex + itemsPerView);

  return (
    <section className="w-full py-8 sm:py-12 bg-transparent relative overflow-hidden">
      
      {/* Decorative background gradients */}
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-[#F8C6CF]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-0 w-64 h-64 bg-[#78844B]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center gap-2 px-4 py-1 rounded-full bg-[#FCE5E8] border border-[#F8C6CF] mb-2.5">
            <Sparkles className="w-3.5 h-3.5 text-[#A82F4D]" />
            <span className="text-xs uppercase tracking-widest font-bold text-[#A82F4D]">
              Customer Favorites
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#A82F4D] tracking-tight mb-2">
            Our Best Sellers ♡
          </h2>
          <p className="font-serif italic text-base sm:text-lg text-[#78844B] font-semibold">
            Loved and cherished by thousands of happy customers ♡
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          
          {/* Left Arrow Button */}
          {displayList.length > 4 && (
            <button
              type="button"
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className={`absolute left-1 sm:-left-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white border border-[#F8C6CF] shadow-lg flex items-center justify-center transition-all cursor-pointer ${
                currentIndex === 0 ? 'opacity-40 cursor-not-allowed' : 'hover:bg-[#FDF1F4] hover:text-[#A82F4D] hover:scale-105'
              }`}
              aria-label="Previous products"
            >
              <ChevronLeft className="w-5 h-5 text-[#40251D]" />
            </button>
          )}

          {/* Product Grid - 2 Columns on Mobile, 4 Columns on Desktop */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {visibleProducts.map((product: Product) => {
              const inWishlist = isInWishlist(product.id);

              return (
                <div
                  key={product.id}
                  className="group relative rounded-2xl sm:rounded-3xl bg-white border border-[#FCE1E8] p-3 sm:p-5 shadow-[0_4px_20px_rgba(168,47,77,0.05)] hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1.5 flex flex-col justify-between"
                >
                  {/* Card Top: Full Picture Frame matching desktop screenshot clarity */}
                  <div className="relative w-full aspect-[5/6] rounded-xl sm:rounded-2xl overflow-hidden bg-[#FDF1F4] flex items-center justify-center mb-3 sm:mb-4 border border-[#F8C6CF]/30 shadow-xs">
                    <Link to={`/product/${product.slug}`} className="w-full h-full block">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                        loading="lazy"
                      />
                    </Link>

                    {/* Discount Badge */}
                    {product.discount > 0 && (
                      <span className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 bg-[#8C243E] text-white text-[10px] sm:text-xs font-bold px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full shadow-xs">
                        {product.discount}% OFF
                      </span>
                    )}

                    {/* Wishlist Button */}
                    <button
                      type="button"
                      onClick={() => toggleWishlist(product.id)}
                      className={`absolute top-2.5 right-2.5 sm:top-3 sm:right-3 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white text-stone-500 hover:text-[#8C243E] border border-pink-100 shadow-xs flex items-center justify-center transition-all cursor-pointer ${
                        inWishlist ? 'text-[#8C243E] scale-105' : ''
                      }`}
                      title={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
                      aria-label="Wishlist"
                    >
                      <Heart 
                        className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${inWishlist ? 'fill-[#8C243E] text-[#8C243E]' : ''}`} 
                      />
                    </button>

                    {/* Quick View Button on Desktop Hover */}
                    <button
                      type="button"
                      onClick={() => setQuickViewProduct(product)}
                      className="hidden sm:flex absolute bottom-3 left-1/2 -translate-x-1/2 bg-white/95 hover:bg-white text-[#40251D] hover:text-[#8C243E] text-xs font-bold px-4 py-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-all duration-300 items-center gap-1.5 cursor-pointer transform group-hover:translate-y-0 translate-y-2"
                      title="Quick View"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Quick View</span>
                    </button>
                  </div>

                  {/* Card Body: Info */}
                  <div className="text-center flex-grow flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] sm:text-xs uppercase font-bold tracking-widest text-[#78844B] block mb-1">
                        {product.category.replace('-', ' ')}
                      </span>
                      <Link 
                        to={`/product/${product.slug}`}
                        className="block font-serif text-sm sm:text-lg font-bold text-[#40251D] hover:text-[#8C243E] transition-colors leading-snug mb-1 line-clamp-1"
                      >
                        {product.name}
                      </Link>

                      {/* Rating Stars & Count */}
                      <div className="flex items-center justify-center gap-1 mb-1.5 sm:mb-2">
                        <div className="flex items-center text-amber-400">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`w-3 h-3 sm:w-3.5 sm:h-3.5 ${i < Math.floor(product.rating) ? 'fill-amber-400' : 'text-stone-300'}`} 
                            />
                          ))}
                        </div>
                        <span className="text-[11px] sm:text-xs text-stone-600 font-medium">
                          {product.rating} ({product.reviewCount > 1000 ? `${(product.reviewCount/1000).toFixed(1)}k` : product.reviewCount})
                        </span>
                      </div>

                      {/* Pricing */}
                      <div className="flex items-center justify-center gap-2 mb-3 sm:mb-4">
                        <span className="font-sans text-base sm:text-xl font-bold text-[#40251D]">
                          ₹{product.price}
                        </span>
                        {product.originalPrice > product.price && (
                          <span className="font-sans text-xs sm:text-sm text-stone-400 line-through">
                            ₹{product.originalPrice}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Add to Cart CTA */}
                    <button
                      type="button"
                      onClick={() => addToCart(product, 1, product.variants?.[0])}
                      className="w-full bg-[#F8CCD7] hover:bg-[#F3B8C7] text-[#781D33] text-xs sm:text-sm font-bold py-2.5 sm:py-3 px-3 sm:px-4 rounded-full transition-all duration-200 shadow-2xs flex items-center justify-center gap-1.5 sm:gap-2 cursor-pointer active:scale-95"
                    >
                      <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      <span>Add to Bag</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Arrow Button */}
          {displayList.length > 4 && (
            <button
              type="button"
              onClick={handleNext}
              disabled={currentIndex >= maxIndex}
              className={`absolute right-1 sm:-right-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white border border-[#F8C6CF] shadow-lg flex items-center justify-center transition-all cursor-pointer ${
                currentIndex >= maxIndex ? 'opacity-40 cursor-not-allowed' : 'hover:bg-[#FDF1F4] hover:text-[#A82F4D] hover:scale-105'
              }`}
              aria-label="Next products"
            >
              <ChevronRight className="w-5 h-5 text-[#40251D]" />
            </button>
          )}

        </div>

      </div>
    </section>
  );
};

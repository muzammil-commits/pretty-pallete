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
    <section className="w-full py-16 sm:py-24 bg-white relative overflow-hidden">
      
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

          {/* Product Grid - Full Pictures Filling Full Box (image copy 23.png) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
            {visibleProducts.map((product: Product) => {
              const inWishlist = isInWishlist(product.id);

              return (
                <div
                  key={product.id}
                  className="group relative rounded-3xl bg-[#FFFDF9] border border-[#F8C6CF]/70 p-4 sm:p-5 shadow-xs hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1.5 flex flex-col justify-between"
                >
                  {/* Card Top: Full Picture Frame filling box (image copy 23.png) */}
                  <div className="relative w-full h-64 sm:h-72 rounded-2xl overflow-hidden bg-[#FDF1F4] flex items-center justify-center mb-4 border border-[#F8C6CF]/40 shadow-inner">
                    <Link to={`/product/${product.slug}`} className="w-full h-full block">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                      />
                    </Link>

                    {/* Discount Badge */}
                    {product.discount > 0 && (
                      <span className="absolute top-3 left-3 bg-[#A82F4D] text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow-xs">
                        {product.discount}% OFF
                      </span>
                    )}

                    {/* Wishlist Button */}
                    <button
                      type="button"
                      onClick={() => toggleWishlist(product.id)}
                      className={`absolute top-3 right-3 w-9 h-9 rounded-full bg-white/95 hover:bg-white text-stone-600 hover:text-[#FF647F] shadow-sm flex items-center justify-center transition-all cursor-pointer ${
                        inWishlist ? 'text-[#FF647F] scale-110' : ''
                      }`}
                      title={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
                      aria-label="Wishlist"
                    >
                      <Heart 
                        className={`w-4 h-4 ${inWishlist ? 'fill-[#FF647F] text-[#FF647F]' : ''}`} 
                      />
                    </button>

                    {/* Quick View Button on Hover */}
                    <button
                      type="button"
                      onClick={() => setQuickViewProduct(product)}
                      className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-white/95 hover:bg-white text-[#40251D] hover:text-[#A82F4D] text-xs font-bold px-4 py-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center gap-1.5 cursor-pointer transform group-hover:translate-y-0 translate-y-2"
                      title="Quick View"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Quick View</span>
                    </button>
                  </div>

                  {/* Card Body: Info */}
                  <div className="text-center flex-grow flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-bold tracking-wider text-[#78844B] block mb-1">
                        {product.category.replace('-', ' ')}
                      </span>
                      <Link 
                        to={`/product/${product.slug}`}
                        className="block font-serif text-lg sm:text-xl font-bold text-[#40251D] hover:text-[#A82F4D] transition-colors leading-snug mb-1.5 line-clamp-1"
                      >
                        {product.name}
                      </Link>

                      {/* Rating Stars & Count */}
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
                          {product.rating} ({product.reviewCount > 1000 ? `${(product.reviewCount/1000).toFixed(1)}k` : product.reviewCount})
                        </span>
                      </div>

                      {/* Pricing */}
                      <div className="flex items-center justify-center gap-2 mb-4">
                        <span className="font-sans text-lg sm:text-xl font-bold text-[#40251D]">
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

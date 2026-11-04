import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Star, ShoppingBag, Eye, ChevronLeft, ChevronRight } from 'lucide-react';
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
    <section className="w-full py-16 sm:py-20 bg-white relative overflow-hidden">
      
      {/* Decorative floral side accents */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-3 mb-1">
            <span className="text-xs sm:text-sm text-[#78844B] font-bold">🌿</span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#A82F4D] tracking-tight">
              Our Best Sellers ♡
            </h2>
            <span className="text-xs sm:text-sm text-[#78844B] font-bold">🌿</span>
          </div>
          <p className="text-sm sm:text-base text-[#40251D]/75 font-normal">
            Loved by our customers ♡
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
              className={`absolute -left-3 sm:-left-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white border border-[#F8C6CF] shadow-md flex items-center justify-center transition-all cursor-pointer ${
                currentIndex === 0 ? 'opacity-40 cursor-not-allowed' : 'hover:bg-[#FDF1F4] hover:text-[#A82F4D]'
              }`}
              aria-label="Previous products"
            >
              <ChevronLeft className="w-5 h-5 text-[#40251D]" />
            </button>
          )}

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {visibleProducts.map((product: Product) => {
              const inWishlist = isInWishlist(product.id);

              return (
                <div
                  key={product.id}
                  className="group relative rounded-2xl bg-[#FFFDF9] border border-[#F8C6CF]/60 p-4 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
                >
                  {/* Card Top: Image + Badges + Action Buttons */}
                  <div className="relative w-full h-52 sm:h-56 rounded-xl overflow-hidden bg-[#FDF1F4] flex items-center justify-center mb-4">
                    <Link to={`/product/${product.slug}`} className="w-full h-full flex items-center justify-center">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="max-h-full max-w-full object-contain p-2 group-hover:scale-105 transition-transform duration-300"
                      />
                    </Link>

                    {/* Discount Badge */}
                    {product.discount > 0 && (
                      <span className="absolute top-2.5 left-2.5 bg-[#A82F4D] text-white text-[11px] font-bold px-2 py-0.5 rounded-full shadow-xs">
                        {product.discount}% OFF
                      </span>
                    )}

                    {/* Wishlist Button */}
                    <button
                      type="button"
                      onClick={() => toggleWishlist(product.id)}
                      className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-stone-600 hover:text-[#FF647F] shadow-xs flex items-center justify-center transition-colors cursor-pointer"
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
                      className="absolute bottom-2.5 left-1/2 -translate-x-1/2 bg-white/90 hover:bg-white text-[#40251D] hover:text-[#A82F4D] text-xs font-semibold px-3 py-1.5 rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center gap-1.5 cursor-pointer"
                      title="Quick View"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Quick View</span>
                    </button>
                  </div>

                  {/* Card Body: Info */}
                  <div className="text-center flex-grow flex flex-col justify-between">
                    <div>
                      <Link 
                        to={`/product/${product.slug}`}
                        className="block font-serif text-lg font-bold text-[#40251D] hover:text-[#A82F4D] transition-colors leading-snug mb-1 line-clamp-1"
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
                        <span className="font-sans text-base sm:text-lg font-bold text-[#40251D]">
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
                      className="w-full bg-[#F8C6CF] hover:bg-[#FF647F] hover:text-white text-[#A82F4D] text-sm font-semibold py-2.5 px-4 rounded-full transition-all duration-200 shadow-xs flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add to Cart</span>
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
              className={`absolute -right-3 sm:-right-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white border border-[#F8C6CF] shadow-md flex items-center justify-center transition-all cursor-pointer ${
                currentIndex >= maxIndex ? 'opacity-40 cursor-not-allowed' : 'hover:bg-[#FDF1F4] hover:text-[#A82F4D]'
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

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { X, Star, ShoppingBag, Heart, Check, ArrowRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ProductVariant } from '../types';

export const QuickViewModal: React.FC = () => {
  const { quickViewProduct, setQuickViewProduct, addToCart, toggleWishlist, isInWishlist } = useStore();
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | undefined>(
    quickViewProduct?.variants?.[0]
  );
  const [qty, setQty] = useState(1);

  // Sync state whenever a different product is clicked
  useEffect(() => {
    if (quickViewProduct) {
      setSelectedVariant(quickViewProduct.variants?.[0]);
      setQty(1);
    }
  }, [quickViewProduct]);

  if (!quickViewProduct) return null;

  const inWishlist = isInWishlist(quickViewProduct.id);

  const handleAdd = () => {
    addToCart(quickViewProduct, qty, selectedVariant || quickViewProduct.variants?.[0]);
    setQuickViewProduct(null);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 md:p-10 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={() => setQuickViewProduct(null)}
      />

      <div className="relative max-w-3xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden border border-[#F8C6CF] z-10 animate-in zoom-in-95 duration-200">
        
        <button
          type="button"
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-4 right-4 z-20 p-2 text-stone-500 hover:text-stone-900 bg-white/80 hover:bg-white rounded-full shadow-xs cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          
          {/* Product Image */}
          <div className="bg-[#FDF1F4] p-8 flex items-center justify-center relative">
            <img
              src={quickViewProduct.image}
              alt={quickViewProduct.name}
              className="max-h-72 object-contain filter drop-shadow-md"
            />
            {quickViewProduct.discount > 0 && (
              <span className="absolute top-4 left-4 bg-[#A82F4D] text-white text-xs font-bold px-2.5 py-1 rounded-full">
                {quickViewProduct.discount}% OFF
              </span>
            )}
          </div>

          {/* Product Details */}
          <div className="p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-[#78844B] uppercase tracking-wider mb-1">
                <span>{quickViewProduct.category}</span>
                <span>•</span>
                <span>In Stock</span>
              </div>

              <h3 className="font-serif text-2xl font-bold text-[#40251D] mb-2 leading-tight">
                {quickViewProduct.name}
              </h3>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-3">
                <div className="flex items-center text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < Math.floor(quickViewProduct.rating) ? 'fill-amber-400' : 'text-stone-300'}`}
                    />
                  ))}
                </div>
                <span className="text-xs text-stone-600 font-medium">
                  {quickViewProduct.rating} ({quickViewProduct.reviewCount} customer reviews)
                </span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-4">
                <span className="text-2xl font-bold text-[#40251D]">
                  ₹{quickViewProduct.price}
                </span>
                {quickViewProduct.originalPrice > quickViewProduct.price && (
                  <span className="text-sm text-stone-400 line-through">
                    ₹{quickViewProduct.originalPrice}
                  </span>
                )}
              </div>

              <p className="text-xs sm:text-sm text-[#40251D]/75 leading-relaxed mb-5">
                {quickViewProduct.shortDescription}
              </p>

              {/* Variants */}
              {quickViewProduct.variants && quickViewProduct.variants.length > 0 && (
                <div className="mb-5">
                  <label className="text-xs font-bold uppercase tracking-wider text-stone-600 block mb-2">
                    Select Option
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {quickViewProduct.variants.map((v) => (
                      <button
                        key={v.id}
                        type="button"
                        onClick={() => setSelectedVariant(v)}
                        className={`text-xs px-3 py-1.5 rounded-full border transition-all flex items-center gap-1.5 ${
                          (selectedVariant?.id || quickViewProduct.variants?.[0].id) === v.id
                            ? 'border-[#A82F4D] bg-[#FDF1F4] text-[#A82F4D] font-bold'
                            : 'border-stone-200 text-stone-600 hover:border-stone-400'
                        }`}
                      >
                        {v.colorHex && (
                          <span 
                            className="w-3 h-3 rounded-full border border-black/10 inline-block" 
                            style={{ backgroundColor: v.colorHex }} 
                          />
                        )}
                        <span>{v.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-stone-100 space-y-3">
              <div className="flex items-center gap-3">
                {/* Qty */}
                <div className="flex items-center border border-stone-200 rounded-full px-2 py-1 bg-stone-50">
                  <button
                    type="button"
                    onClick={() => setQty(q => Math.max(1, q - 1))}
                    className="px-2 text-stone-600 hover:text-[#A82F4D]"
                  >
                    -
                  </button>
                  <span className="px-2 text-sm font-semibold">{qty}</span>
                  <button
                    type="button"
                    onClick={() => setQty(q => q + 1)}
                    className="px-2 text-stone-600 hover:text-[#A82F4D]"
                  >
                    +
                  </button>
                </div>

                {/* Add to Cart */}
                <button
                  type="button"
                  onClick={handleAdd}
                  className="flex-grow bg-[#A82F4D] hover:bg-[#8D253F] text-white py-2.5 px-6 rounded-full text-xs sm:text-sm font-semibold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Bag</span>
                </button>

                {/* Wishlist */}
                <button
                  type="button"
                  onClick={() => toggleWishlist(quickViewProduct.id)}
                  className={`p-2.5 rounded-full border border-stone-200 hover:border-[#FF647F] text-stone-600 hover:text-[#FF647F] transition-colors ${
                    inWishlist ? 'text-[#FF647F] bg-[#FCE5E8]' : ''
                  }`}
                  title="Wishlist"
                >
                  <Heart className={`w-4 h-4 ${inWishlist ? 'fill-[#FF647F]' : ''}`} />
                </button>
              </div>

              <div className="text-center">
                <Link
                  to={`/product/${quickViewProduct.slug}`}
                  onClick={() => setQuickViewProduct(null)}
                  className="text-xs font-semibold text-[#78844B] hover:text-[#4C542C] inline-flex items-center gap-1 hover:underline"
                >
                  <span>View Full Product Details & Ingredients</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};


import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Star, Heart, ShoppingBag, Eye, SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { Product } from '../types';

export const ShopPage: React.FC = () => {
  const { products, addToCart, toggleWishlist, isInWishlist, setQuickViewProduct } = useStore();
  
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('featured');
  const [priceMax, setPriceMax] = useState<number>(1000);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        const matchesCat = selectedCategory === 'all' || p.category === selectedCategory;
        const matchesPrice = p.price <= priceMax;
        const matchesSearch = searchTerm === '' || 
          p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.shortDescription.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCat && matchesPrice && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'bestseller') return (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0);
        return 0; // featured default
      });
  }, [products, selectedCategory, priceMax, searchTerm, sortBy]);

  return (
    <div className="min-h-screen bg-[#FFFDF9] py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Banner Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="font-script text-3xl sm:text-4xl text-[#A82F4D] block mb-1">
            Artisanal Beauty & Wellness ♡
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#40251D] mb-3">
            All Natural Products
          </h1>
          <p className="text-sm sm:text-base text-stone-600">
            Handcrafted in small batches with nature-inspired ingredients for cosmetics, skincare & haircare.
          </p>
        </div>

        {/* Filter & Sorting Controls */}
        <div className="bg-[#FDF1F4] border border-[#F8C6CF] rounded-3xl p-4 sm:p-6 mb-10 shadow-xs">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            
            {/* Category Pills */}
            <div className="flex flex-wrap items-center gap-2">
              {[
                { id: 'all', label: 'All Products' },
                { id: 'cosmetics', label: '💄 Cosmetics' },
                { id: 'skin-care', label: '✨ Skin Care' },
                { id: 'hair-care', label: '🌿 Hair Care' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setSelectedCategory(tab.id)}
                  className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                    selectedCategory === tab.id
                      ? 'bg-[#A82F4D] text-white shadow-sm'
                      : 'bg-white text-[#40251D] hover:bg-[#F8C6CF]/50'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Sorting & Search */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-full border border-stone-200">
                <ArrowUpDown className="w-4 h-4 text-[#A82F4D]" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-transparent text-xs font-medium text-[#40251D] focus:outline-none cursor-pointer"
                >
                  <option value="featured">Featured First</option>
                  <option value="bestseller">Best Sellers</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Customer Rating</option>
                </select>
              </div>

              {/* Price Range Filter */}
              <div className="flex items-center gap-2 text-xs font-semibold text-stone-700 bg-white px-3 py-1.5 rounded-full border border-stone-200">
                <span>Under ₹{priceMax}</span>
                <input
                  type="range"
                  min="200"
                  max="1000"
                  step="50"
                  value={priceMax}
                  onChange={(e) => setPriceMax(Number(e.target.value))}
                  className="w-20 sm:w-24 accent-[#A82F4D] cursor-pointer"
                />
              </div>
            </div>

          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-stone-100">
            <p className="text-lg font-serif font-bold text-[#40251D] mb-2">No matching products found</p>
            <p className="text-sm text-stone-500 mb-4">Try clearing some filters or searching for something else.</p>
            <button
              type="button"
              onClick={() => { setSelectedCategory('all'); setPriceMax(1000); setSearchTerm(''); }}
              className="bg-[#A82F4D] text-white px-6 py-2 rounded-full text-xs font-semibold"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
            {filteredProducts.map((product: Product) => {
              const inWishlist = isInWishlist(product.id);

              return (
                <div
                  key={product.id}
                  className="group relative rounded-3xl bg-[#FFFDF9] border border-[#F8C6CF]/70 p-4 sm:p-5 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                >
                  {/* Full Picture Container (image copy 11.png) */}
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
                      title={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
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

                  {/* Card Body */}
                  <div className="text-center flex-grow flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-bold tracking-wider text-[#78844B] block mb-1">
                        {product.category}
                      </span>
                      <Link 
                        to={`/product/${product.slug}`}
                        className="block font-serif text-lg sm:text-xl font-bold text-[#40251D] hover:text-[#A82F4D] transition-colors leading-snug mb-1 line-clamp-1"
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
        )}

      </div>
    </div>
  );
};

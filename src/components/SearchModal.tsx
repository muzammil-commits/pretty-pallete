import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, Star, ArrowRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const SearchModal: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen, products } = useStore();
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  if (!isSearchOpen) return null;

  const filtered = query.trim() === '' ? [] : products.filter(p => 
    p.name.toLowerCase().includes(query.toLowerCase()) ||
    p.category.toLowerCase().includes(query.toLowerCase()) ||
    p.shortDescription.toLowerCase().includes(query.toLowerCase()) ||
    p.ingredients.some(i => i.toLowerCase().includes(query.toLowerCase()))
  );

  const handleSelectProduct = (slug: string) => {
    setIsSearchOpen(false);
    setQuery('');
    navigate(`/product/${slug}`);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 md:p-20">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={() => setIsSearchOpen(false)}
      />

      <div className="relative max-w-2xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden border border-[#F8C6CF] animate-in zoom-in-95 duration-200">
        
        {/* Search Input Bar */}
        <div className="flex items-center px-4 sm:px-6 py-4 border-b border-stone-200">
          <Search className="w-5 h-5 text-[#A82F4D] shrink-0 mr-3" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search natural lipstick, face cream, hair oil, saffron..."
            className="w-full bg-transparent text-sm sm:text-base text-[#40251D] placeholder:text-stone-400 focus:outline-none"
          />
          <button
            type="button"
            onClick={() => setIsSearchOpen(false)}
            className="p-1.5 text-stone-400 hover:text-stone-700 rounded-full hover:bg-stone-100 ml-2"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results Area */}
        <div className="max-h-[60vh] overflow-y-auto p-4 sm:p-6">
          {query.trim() === '' ? (
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-3">Popular Searches</p>
              <div className="flex flex-wrap gap-2">
                {['Matte Lust Lipstick', 'Radiance Face Cream', 'Nourishing Hair Oil', 'Herbal Kajal', 'Sulphate-Free', 'Rose Water'].map(tag => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => setQuery(tag)}
                    className="text-xs font-medium text-[#40251D] bg-[#FDF1F4] hover:bg-[#F8C6CF] px-3 py-1.5 rounded-full transition-colors cursor-pointer"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-sm font-semibold text-[#40251D]">No products found for "{query}"</p>
              <p className="text-xs text-stone-500 mt-1">Try searching for lipstick, cream, oil, or kajal</p>
            </div>
          ) : (
            <div className="space-y-3">
              <p className="text-xs font-bold text-stone-500">Found {filtered.length} products</p>
              {filtered.map(product => (
                <div
                  key={product.id}
                  onClick={() => handleSelectProduct(product.slug)}
                  className="flex items-center gap-4 p-2.5 rounded-xl hover:bg-[#FDF1F4] cursor-pointer transition-colors group"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-14 h-14 object-contain rounded-lg bg-stone-50 p-1"
                  />
                  <div className="flex-grow min-w-0">
                    <h4 className="font-serif text-sm font-bold text-[#40251D] group-hover:text-[#A82F4D] transition-colors truncate">
                      {product.name}
                    </h4>
                    <p className="text-xs text-stone-500 truncate">{product.shortDescription}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex items-center text-amber-400">
                        <Star className="w-3 h-3 fill-amber-400" />
                        <span className="text-[11px] text-stone-600 ml-1 font-medium">{product.rating}</span>
                      </div>
                      <span className="text-xs font-bold text-[#40251D]">₹{product.price}</span>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-stone-300 group-hover:text-[#A82F4D] transition-colors" />
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const WishlistPage: React.FC = () => {
  const { wishlist, products, addToCart, toggleWishlist } = useStore();

  const wishlistedProducts = products.filter(p => wishlist.includes(p.id));

  return (
    <div className="min-h-screen bg-[#FFFDF9] py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="font-script text-3xl sm:text-4xl text-[#A82F4D] block mb-1">
            Your Personal Favorites ♡
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#40251D] mb-3">
            My Wishlist ({wishlistedProducts.length})
          </h1>
          <p className="text-xs sm:text-sm text-stone-600">
            Handpicked natural beauty essentials saved for your self-care rituals.
          </p>
        </div>

        {wishlistedProducts.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-[#F8C6CF] p-8 max-w-md mx-auto">
            <Heart className="w-12 h-12 text-[#E98B9B] mx-auto mb-3" />
            <h3 className="font-serif text-xl font-bold text-[#40251D] mb-1">Your wishlist is empty</h3>
            <p className="text-xs text-stone-500 mb-6">Explore our handcrafted collection and click the heart icon to save products.</p>
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 bg-[#A82F4D] text-white px-6 py-2.5 rounded-full text-xs font-bold hover:bg-[#8D253F] transition-colors"
            >
              <span>Explore Products</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {wishlistedProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-2xl border border-[#F8C6CF] p-4 shadow-xs flex flex-col justify-between"
              >
                <div className="relative w-full h-48 rounded-xl bg-[#FDF1F4] flex items-center justify-center mb-3 overflow-hidden">
                  <Link to={`/product/${product.slug}`} className="w-full h-full flex items-center justify-center">
                    <img src={product.image} alt={product.name} className="max-h-full max-w-full object-contain p-2 hover:scale-105 transition-transform" />
                  </Link>
                  <button
                    type="button"
                    onClick={() => toggleWishlist(product.id)}
                    className="absolute top-2 right-2 p-1.5 rounded-full bg-white text-red-500 hover:text-red-700 shadow-xs"
                    title="Remove from wishlist"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="text-center">
                  <Link to={`/product/${product.slug}`} className="font-serif font-bold text-sm text-[#40251D] hover:text-[#A82F4D] block truncate mb-1">
                    {product.name}
                  </Link>
                  <p className="font-bold text-sm text-[#40251D] mb-3">₹{product.price}</p>
                  
                  <button
                    type="button"
                    onClick={() => addToCart(product, 1, product.variants?.[0])}
                    className="w-full bg-[#F8C6CF] hover:bg-[#FF647F] hover:text-white text-[#A82F4D] text-xs font-bold py-2.5 rounded-full transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Move to Bag</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};


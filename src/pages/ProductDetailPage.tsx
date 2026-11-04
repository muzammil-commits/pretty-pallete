import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Star, 
  Heart, 
  ShoppingBag, 
  Truck, 
  ShieldCheck, 
  Leaf, 
  RotateCcw, 
  ChevronRight, 
  Sparkles,
  CheckCircle2,
  MessageSquare
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ProductVariant } from '../types';

export const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { 
    products, 
    addToCart, 
    toggleWishlist, 
    isInWishlist, 
    reviews, 
    addReview,
    showToast 
  } = useStore();

  // Find product by slug or id
  const product = products.find(p => p.slug === id || p.id === id) || products[0];

  const [activeImage, setActiveImage] = useState<string>(product.image);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | undefined>(
    product.variants?.[0]
  );
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<'benefits' | 'ingredients' | 'usage'>('benefits');

  // Review form state
  const [reviewerName, setReviewerName] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewTitle, setReviewTitle] = useState('');
  const [reviewComment, setReviewComment] = useState('');
  const [isReviewFormOpen, setIsReviewFormOpen] = useState(false);

  // Update active image if product changes
  React.useEffect(() => {
    setActiveImage(product.image);
    setSelectedVariant(product.variants?.[0]);
    setQuantity(1);
    window.scrollTo(0, 0);
  }, [product]);

  const inWishlist = isInWishlist(product.id);
  const productReviews = reviews.filter(r => r.productId === product.id);

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedVariant);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, selectedVariant);
    navigate('/checkout');
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewerName || !reviewComment) {
      showToast('Please fill out all review fields.');
      return;
    }
    addReview({
      productId: product.id,
      authorName: reviewerName,
      rating: reviewRating,
      title: reviewTitle || 'Verified Review',
      comment: reviewComment,
      verifiedPurchase: true
    });
    setReviewerName('');
    setReviewTitle('');
    setReviewComment('');
    setIsReviewFormOpen(false);
  };

  const relatedProducts = products
    .filter(p => p.id !== product.id && p.category === product.category)
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-[#FFFDF9] py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-xs text-stone-500 mb-8">
          <Link to="/" className="hover:text-[#A82F4D]">Home</Link>
          <ChevronRight className="w-3 h-3 text-stone-400" />
          <Link to={`/${product.category}`} className="hover:text-[#A82F4D] capitalize">{product.category.replace('-', ' ')}</Link>
          <ChevronRight className="w-3 h-3 text-stone-400" />
          <span className="font-semibold text-[#A82F4D] truncate">{product.name}</span>
        </div>

        {/* Product Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 mb-16">
          
          {/* Gallery Column (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            {/* Main Stage Image */}
            <div className="relative w-full aspect-square rounded-3xl bg-[#FDF1F4] border border-[#F8C6CF] overflow-hidden flex items-center justify-center p-6 shadow-sm">
              <img
                src={activeImage}
                alt={product.name}
                className="max-h-full max-w-full object-contain filter drop-shadow-md transition-all duration-300"
              />
              {product.discount > 0 && (
                <span className="absolute top-4 left-4 bg-[#A82F4D] text-white text-xs font-bold px-3 py-1 rounded-full shadow-xs">
                  {product.discount}% OFF
                </span>
              )}
              {product.isBestSeller && (
                <span className="absolute top-4 right-4 bg-[#78844B] text-white text-xs font-bold px-3 py-1 rounded-full shadow-xs flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> Best Seller
                </span>
              )}
            </div>

            {/* Thumbnail Row */}
            {product.gallery && product.gallery.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-2">
                {product.gallery.map((img, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setActiveImage(img)}
                    className={`w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-white border-2 overflow-hidden p-1 shrink-0 transition-all ${
                      activeImage === img ? 'border-[#A82F4D] shadow-sm' : 'border-stone-200 hover:border-stone-400'
                    }`}
                  >
                    <img src={img} alt={`View ${i + 1}`} className="w-full h-full object-cover rounded-lg" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details Column (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs uppercase tracking-widest font-bold text-[#78844B]">
                  {product.category.replace('-', ' ')}
                </span>
                <span className="text-stone-300">•</span>
                <span className="text-xs text-[#78844B] font-semibold flex items-center gap-1">
                  <Leaf className="w-3.5 h-3.5" /> 100% Nature Inspired
                </span>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#40251D] mb-3 leading-tight">
                {product.name}
              </h1>

              {/* Rating & Review Count */}
              <div className="flex items-center gap-3 mb-5">
                <div className="flex items-center text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-amber-400' : 'text-stone-300'}`}
                    />
                  ))}
                </div>
                <span className="text-sm font-semibold text-[#40251D]">
                  {product.rating}
                </span>
                <span className="text-sm text-stone-500">
                  ({product.reviewCount} customer reviews)
                </span>
              </div>

              {/* Price Block */}
              <div className="flex items-baseline gap-4 mb-6 p-4 rounded-2xl bg-[#FDF1F4]/60 border border-[#F8C6CF]/40">
                <span className="font-sans text-3xl font-bold text-[#40251D]">
                  ₹{product.price}
                </span>
                {product.originalPrice > product.price && (
                  <span className="font-sans text-lg text-stone-400 line-through">
                    ₹{product.originalPrice}
                  </span>
                )}
                <span className="text-xs font-bold text-[#A82F4D] uppercase">
                  Inclusive of all taxes
                </span>
              </div>

              <p className="text-sm sm:text-base text-stone-700 leading-relaxed mb-6 font-normal">
                {product.description}
              </p>

              {/* Variants Selector */}
              {product.variants && product.variants.length > 0 && (
                <div className="mb-6">
                  <label className="text-xs font-bold uppercase tracking-wider text-stone-600 block mb-2.5">
                    Available Shades / Options:
                  </label>
                  <div className="flex flex-wrap gap-2.5">
                    {product.variants.map((variant) => (
                      <button
                        key={variant.id}
                        type="button"
                        onClick={() => setSelectedVariant(variant)}
                        className={`px-4 py-2 rounded-full border text-xs font-semibold flex items-center gap-2 transition-all ${
                          (selectedVariant?.id || product.variants?.[0].id) === variant.id
                            ? 'border-[#A82F4D] bg-[#FDF1F4] text-[#A82F4D] shadow-xs'
                            : 'border-stone-200 text-stone-700 hover:border-stone-400'
                        }`}
                      >
                        {variant.colorHex && (
                          <span
                            className="w-3.5 h-3.5 rounded-full border border-black/10 inline-block shrink-0"
                            style={{ backgroundColor: variant.colorHex }}
                          />
                        )}
                        <span>{variant.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Selector */}
              <div className="flex items-center gap-4 mb-8">
                <span className="text-xs font-bold uppercase tracking-wider text-stone-600">Quantity:</span>
                <div className="flex items-center border border-stone-200 rounded-full px-3 py-1.5 bg-white">
                  <button
                    type="button"
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    className="px-2 text-stone-600 hover:text-[#A82F4D] font-bold text-base"
                  >
                    -
                  </button>
                  <span className="px-3 text-sm font-semibold">{quantity}</span>
                  <button
                    type="button"
                    onClick={() => setQuantity(q => q + 1)}
                    className="px-2 text-stone-600 hover:text-[#A82F4D] font-bold text-base"
                  >
                    +
                  </button>
                </div>
                <span className="text-xs text-stone-500">
                  {product.inStock ? `${product.stockCount} units available` : 'Out of Stock'}
                </span>
              </div>
            </div>

            {/* CTAs */}
            <div className="space-y-3 pt-6 border-t border-stone-200">
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="sm:col-span-6 bg-[#F8C6CF] hover:bg-[#E98B9B] text-[#A82F4D] py-3.5 px-6 rounded-full font-bold text-sm shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Bag</span>
                </button>

                <button
                  type="button"
                  onClick={handleBuyNow}
                  className="sm:col-span-5 bg-[#A82F4D] hover:bg-[#8D253F] text-white py-3.5 px-6 rounded-full font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Buy It Now</span>
                </button>

                <button
                  type="button"
                  onClick={() => toggleWishlist(product.id)}
                  className={`sm:col-span-1 p-3.5 rounded-full border border-stone-200 hover:border-[#FF647F] text-stone-600 hover:text-[#FF647F] transition-colors flex items-center justify-center ${
                    inWishlist ? 'text-[#FF647F] bg-[#FCE5E8]' : 'bg-white'
                  }`}
                  title="Wishlist"
                >
                  <Heart className={`w-5 h-5 ${inWishlist ? 'fill-[#FF647F]' : ''}`} />
                </button>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-2 pt-4 text-center text-xs text-stone-600">
                <div className="p-2 rounded-xl bg-stone-50 flex flex-col items-center gap-1">
                  <Truck className="w-4 h-4 text-[#78844B]" />
                  <span>Free Ship &gt; ₹999</span>
                </div>
                <div className="p-2 rounded-xl bg-stone-50 flex flex-col items-center gap-1">
                  <ShieldCheck className="w-4 h-4 text-[#A82F4D]" />
                  <span>100% Skin Safe</span>
                </div>
                <div className="p-2 rounded-xl bg-stone-50 flex flex-col items-center gap-1">
                  <RotateCcw className="w-4 h-4 text-[#40251D]" />
                  <span>7-Day Easy Returns</span>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* Tabbed Info: Benefits, Ingredients, Usage */}
        <div className="bg-white rounded-3xl border border-[#F8C6CF]/60 p-6 sm:p-10 mb-16 shadow-xs">
          
          <div className="flex border-b border-stone-200 gap-6 mb-6">
            <button
              type="button"
              onClick={() => setActiveTab('benefits')}
              className={`pb-3 font-serif text-lg font-bold border-b-2 transition-all ${
                activeTab === 'benefits'
                  ? 'border-[#A82F4D] text-[#A82F4D]'
                  : 'border-transparent text-stone-500 hover:text-stone-800'
              }`}
            >
              Key Benefits
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('ingredients')}
              className={`pb-3 font-serif text-lg font-bold border-b-2 transition-all ${
                activeTab === 'ingredients'
                  ? 'border-[#A82F4D] text-[#A82F4D]'
                  : 'border-transparent text-stone-500 hover:text-stone-800'
              }`}
            >
              Ingredients
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('usage')}
              className={`pb-3 font-serif text-lg font-bold border-b-2 transition-all ${
                activeTab === 'usage'
                  ? 'border-[#A82F4D] text-[#A82F4D]'
                  : 'border-transparent text-stone-500 hover:text-stone-800'
              }`}
            >
              How to Use
            </button>
          </div>

          {activeTab === 'benefits' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {product.benefits.map((b, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-[#FDF1F4]/50">
                  <CheckCircle2 className="w-5 h-5 text-[#78844B] shrink-0 mt-0.5" />
                  <span className="text-sm font-medium text-stone-700">{b}</span>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'ingredients' && (
            <div>
              <p className="text-xs text-stone-500 mb-4">
                We believe in 100% ingredient transparency. No hidden parabens, no silicones, no sulphates.
              </p>
              <div className="flex flex-wrap gap-2">
                {product.ingredients.map((ing, i) => (
                  <span key={i} className="px-3.5 py-1.5 rounded-full bg-[#FCE5E8] text-[#A82F4D] text-xs font-semibold">
                    🌿 {ing}
                  </span>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'usage' && (
            <div className="space-y-3">
              {product.usageInstructions.map((step, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-[#A82F4D] text-white text-xs font-bold flex items-center justify-center shrink-0">
                    {i + 1}
                  </span>
                  <p className="text-sm text-stone-700 pt-0.5">{step}</p>
                </div>
              ))}
            </div>
          )}

        </div>

        {/* Customer Reviews Section */}
        <div className="bg-[#FFFDF9] rounded-3xl border border-[#F8C6CF] p-6 sm:p-10 mb-16">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-[#F8C6CF]/40">
            <div>
              <h3 className="font-serif text-2xl font-bold text-[#40251D]">
                Customer Reviews ♡
              </h3>
              <p className="text-xs sm:text-sm text-stone-600">
                Real feedback from verified Pretty Palette users
              </p>
            </div>
            <button
              type="button"
              onClick={() => setIsReviewFormOpen(!isReviewFormOpen)}
              className="bg-[#A82F4D] hover:bg-[#8D253F] text-white px-5 py-2.5 rounded-full text-xs font-bold transition-all shadow-xs"
            >
              {isReviewFormOpen ? 'Close Form' : 'Write a Review'}
            </button>
          </div>

          {/* Add Review Form */}
          {isReviewFormOpen && (
            <form onSubmit={handleReviewSubmit} className="bg-white p-6 rounded-2xl border border-stone-200 mb-8 space-y-4">
              <h4 className="font-serif text-lg font-bold text-[#40251D]">Write Your Review</h4>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-stone-600 block mb-1">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={reviewerName}
                    onChange={(e) => setReviewerName(e.target.value)}
                    placeholder="e.g. Radhika S."
                    className="w-full px-3 py-2 text-xs border border-stone-200 rounded-lg focus:outline-none focus:border-[#A82F4D]"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-stone-600 block mb-1">Rating *</label>
                  <select
                    value={reviewRating}
                    onChange={(e) => setReviewRating(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs border border-stone-200 rounded-lg focus:outline-none focus:border-[#A82F4D]"
                  >
                    <option value={5}>⭐⭐⭐⭐⭐ (5 Stars - Amazing)</option>
                    <option value={4}>⭐⭐⭐⭐ (4 Stars - Very Good)</option>
                    <option value={3}>⭐⭐⭐ (3 Stars - Average)</option>
                    <option value={2}>⭐⭐ (2 Stars - Below Average)</option>
                    <option value={1}>⭐ (1 Star - Disappointed)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-stone-600 block mb-1">Headline</label>
                <input
                  type="text"
                  value={reviewTitle}
                  onChange={(e) => setReviewTitle(e.target.value)}
                  placeholder="e.g. In love with the texture!"
                  className="w-full px-3 py-2 text-xs border border-stone-200 rounded-lg focus:outline-none focus:border-[#A82F4D]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-stone-600 block mb-1">Detailed Review *</label>
                <textarea
                  rows={3}
                  required
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  placeholder="Share how this product felt on your skin or hair..."
                  className="w-full px-3 py-2 text-xs border border-stone-200 rounded-lg focus:outline-none focus:border-[#A82F4D]"
                />
              </div>

              <button
                type="submit"
                className="bg-[#A82F4D] text-white px-6 py-2.5 rounded-full text-xs font-bold hover:bg-[#8D253F] transition-colors"
              >
                Submit Review
              </button>
            </form>
          )}

          {/* Review List */}
          <div className="space-y-4">
            {productReviews.length === 0 ? (
              <p className="text-sm text-stone-500 italic py-4">
                Be the first to leave a review for {product.name}!
              </p>
            ) : (
              productReviews.map((rev) => (
                <div key={rev.id} className="p-4 rounded-2xl bg-white border border-stone-100 shadow-2xs space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-[#40251D]">{rev.authorName}</span>
                      {rev.verifiedPurchase && (
                        <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-semibold">
                          Verified Buyer
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-stone-400">{rev.date}</span>
                  </div>

                  <div className="flex items-center text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-3.5 h-3.5 ${i < rev.rating ? 'fill-amber-400' : 'text-stone-200'}`} />
                    ))}
                  </div>

                  {rev.title && <h5 className="font-serif font-bold text-sm text-[#40251D]">{rev.title}</h5>}
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">{rev.comment}</p>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Related Products Carousel */}
        {relatedProducts.length > 0 && (
          <div>
            <h3 className="font-serif text-2xl font-bold text-[#40251D] mb-6 text-center">
              You May Also Adore ♡
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((rel) => (
                <div key={rel.id} className="p-4 rounded-2xl bg-white border border-[#F8C6CF] shadow-xs text-center flex flex-col justify-between">
                  <Link to={`/product/${rel.slug}`} className="block h-44 mb-3 flex items-center justify-center bg-[#FDF1F4] rounded-xl overflow-hidden p-2">
                    <img src={rel.image} alt={rel.name} className="max-h-full max-w-full object-contain hover:scale-105 transition-transform" />
                  </Link>
                  <Link to={`/product/${rel.slug}`} className="font-serif font-bold text-sm text-[#40251D] hover:text-[#A82F4D] truncate block mb-1">
                    {rel.name}
                  </Link>
                  <p className="text-sm font-bold text-[#40251D] mb-3">₹{rel.price}</p>
                  <button
                    type="button"
                    onClick={() => addToCart(rel, 1)}
                    className="w-full bg-[#FCE5E8] hover:bg-[#F8C6CF] text-[#A82F4D] text-xs font-bold py-2 rounded-full transition-colors"
                  >
                    Add to Bag
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

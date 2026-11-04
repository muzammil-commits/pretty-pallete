import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, Tag, Sparkles, ChevronRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const CartPage: React.FC = () => {
  const {
    cart,
    removeFromCart,
    updateCartQuantity,
    subtotal,
    discountAmount,
    shippingFee,
    freeShippingRemaining,
    total,
    appliedCoupon,
    applyCoupon,
    removeCoupon
  } = useStore();

  const [couponCode, setCouponCode] = useState('');
  const [couponError, setCouponError] = useState('');
  const navigate = useNavigate();

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    if (!couponCode) return;
    const res = applyCoupon(couponCode);
    if (!res.success) {
      setCouponError(res.message);
    } else {
      setCouponCode('');
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFDF9] py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-stone-500 mb-6">
          <Link to="/" className="hover:text-[#A82F4D]">Home</Link>
          <ChevronRight className="w-3 h-3 text-stone-400" />
          <span className="font-semibold text-[#A82F4D]">Shopping Cart</span>
        </div>

        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#40251D] mb-8">
          Your Shopping Cart ♡
        </h1>

        {cart.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-[#F8C6CF] p-8 max-w-xl mx-auto">
            <div className="w-20 h-20 rounded-full bg-[#FCE5E8] text-[#A82F4D] flex items-center justify-center mx-auto mb-4">
              <ShoppingBag className="w-10 h-10" />
            </div>
            <h2 className="font-serif text-2xl font-bold text-[#40251D] mb-2">Your Bag is Empty</h2>
            <p className="text-sm text-stone-600 mb-6">Looks like you haven't added any natural beauty treasures yet.</p>
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 bg-[#A82F4D] hover:bg-[#8D253F] text-white px-7 py-3 rounded-full text-sm font-semibold transition-all shadow-md"
            >
              <span>Explore All Products</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* Left Items Column (8 cols) */}
            <div className="lg:col-span-8 space-y-4">
              
              {/* Free Shipping Notice */}
              <div className="bg-[#FFF9EF] border border-[#78844B]/30 rounded-2xl p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Sparkles className="w-5 h-5 text-[#78844B] shrink-0" />
                  <p className="text-xs sm:text-sm text-[#40251D]">
                    {freeShippingRemaining > 0 ? (
                      <>Add items worth <strong>₹{freeShippingRemaining}</strong> more for <strong>FREE SHIPPING!</strong></>
                    ) : (
                      <>Congratulations! Your order qualifies for <strong>FREE EXPRESS SHIPPING!</strong> 🎉</>
                    )}
                  </p>
                </div>
              </div>

              {/* Items Card List */}
              <div className="bg-white rounded-3xl border border-[#F8C6CF]/60 overflow-hidden shadow-xs">
                <div className="divide-y divide-[#F8C6CF]/30">
                  {cart.map((item) => (
                    <div 
                      key={`${item.product.id}-${item.selectedVariant?.id || 'def'}`}
                      className="p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-4">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-20 h-20 object-contain rounded-xl bg-[#FDF1F4] p-1.5 shrink-0 border border-[#F8C6CF]/40"
                        />
                        <div>
                          <Link 
                            to={`/product/${item.product.slug}`}
                            className="font-serif font-bold text-base sm:text-lg text-[#40251D] hover:text-[#A82F4D] transition-colors"
                          >
                            {item.product.name}
                          </Link>
                          {item.selectedVariant && (
                            <p className="text-xs text-[#A82F4D] font-semibold mt-0.5">
                              Variant: {item.selectedVariant.name}
                            </p>
                          )}
                          <p className="text-xs text-stone-500 mt-0.5">
                            Category: {item.product.category.replace('-', ' ')}
                          </p>
                          <p className="text-sm font-bold text-[#40251D] mt-1 sm:hidden">
                            ₹{item.product.price}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between w-full sm:w-auto gap-6">
                        {/* Quantity Counter */}
                        <div className="flex items-center border border-stone-200 rounded-full px-3 py-1 bg-stone-50">
                          <button
                            type="button"
                            onClick={() => updateCartQuantity(item.product.id, item.quantity - 1, item.selectedVariant?.id)}
                            className="text-stone-600 hover:text-[#A82F4D] px-1 font-bold"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="px-3 text-xs sm:text-sm font-semibold">{item.quantity}</span>
                          <button
                            type="button"
                            onClick={() => updateCartQuantity(item.product.id, item.quantity + 1, item.selectedVariant?.id)}
                            className="text-stone-600 hover:text-[#A82F4D] px-1 font-bold"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Price */}
                        <div className="text-right">
                          <p className="text-base font-bold text-[#40251D]">
                            ₹{item.product.price * item.quantity}
                          </p>
                          <span className="text-[11px] text-stone-400">
                            (₹{item.product.price} each)
                          </span>
                        </div>

                        {/* Remove */}
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.product.id, item.selectedVariant?.id)}
                          className="text-stone-400 hover:text-red-500 p-2"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Right Summary Column (4 cols) */}
            <div className="lg:col-span-4 bg-white rounded-3xl border border-[#F8C6CF] p-6 sm:p-8 shadow-sm space-y-6">
              <h3 className="font-serif text-xl font-bold text-[#40251D]">
                Order Summary
              </h3>

              {/* Coupon Form */}
              {appliedCoupon ? (
                <div className="p-3 rounded-xl bg-[#FCE5E8] border border-[#E98B9B] flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#A82F4D]">
                    <Tag className="w-4 h-4" />
                    <span>{appliedCoupon.code} applied (-₹{discountAmount.toFixed(0)})</span>
                  </div>
                  <button
                    type="button"
                    onClick={removeCoupon}
                    className="text-stone-400 hover:text-red-600 font-bold text-sm"
                  >
                    ✕
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-stone-600 block">
                    Have a Promo Code?
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="e.g. WELCOME10"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                      className="flex-grow px-3 py-2 text-xs border border-stone-200 rounded-xl uppercase tracking-wider focus:outline-none focus:border-[#A82F4D]"
                    />
                    <button
                      type="submit"
                      className="bg-[#A82F4D] text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-[#8D253F] transition-colors"
                    >
                      Apply
                    </button>
                  </div>
                  {couponError && <p className="text-[11px] text-red-500">{couponError}</p>}
                </form>
              )}

              {/* Price Breakdown */}
              <div className="space-y-3 text-sm text-stone-600 pt-3 border-t border-stone-100">
                <div className="flex justify-between">
                  <span>Bag Subtotal</span>
                  <span className="font-semibold text-stone-800">₹{subtotal.toFixed(0)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-[#A82F4D] font-semibold">
                    <span>Discount Applied</span>
                    <span>-₹{discountAmount.toFixed(0)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Standard Shipping</span>
                  <span>{shippingFee === 0 ? <strong className="text-[#78844B]">FREE</strong> : `₹${shippingFee}`}</span>
                </div>
                <div className="flex justify-between text-lg font-bold text-[#40251D] pt-3 border-t border-stone-200">
                  <span>Grand Total</span>
                  <span>₹{total.toFixed(0)}</span>
                </div>
              </div>

              {/* Checkout CTA */}
              <button
                type="button"
                onClick={() => navigate('/checkout')}
                className="w-full bg-[#A82F4D] hover:bg-[#8D253F] text-white py-3.5 px-6 rounded-full font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="text-center">
                <Link
                  to="/shop"
                  className="text-xs text-[#78844B] hover:text-[#4C542C] font-semibold hover:underline"
                >
                  ← Continue Shopping
                </Link>
              </div>

            </div>

          </div>
        )}

      </div>
    </div>
  );
};


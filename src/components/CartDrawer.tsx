import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Sparkles, Tag } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
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

  if (!isCartOpen) return null;

  const handleApply = (e: React.FormEvent) => {
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

  const handleCheckout = () => {
    setIsCartOpen(false);
    navigate('/checkout');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-md w-full bg-[#FFFDF9] shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300">
        
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 border-b border-[#F8C6CF] flex items-center justify-between bg-[#FDF1F4]">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#A82F4D]" />
            <h3 className="font-serif text-lg font-bold text-[#40251D]">
              Shopping Bag ({cart.reduce((s, i) => s + i.quantity, 0)})
            </h3>
          </div>
          <button
            type="button"
            onClick={() => setIsCartOpen(false)}
            className="p-1.5 text-stone-500 hover:text-stone-800 rounded-full hover:bg-stone-200/50"
            aria-label="Close cart drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div className="px-5 py-3 bg-[#FFF9EF] border-b border-[#F8C6CF]/40">
          {freeShippingRemaining > 0 ? (
            <div>
              <p className="text-xs text-[#40251D] font-medium mb-1.5">
                Add products worth <strong className="text-[#A82F4D]">₹{freeShippingRemaining}</strong> more to unlock <span className="font-bold text-[#78844B]">FREE SHIPPING!</span> 🚚
              </p>
              <div className="w-full bg-stone-200 h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-[#78844B] h-full rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(100, ((999 - freeShippingRemaining) / 999) * 100)}%` }}
                />
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-xs font-semibold text-[#78844B]">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>You've unlocked <strong>FREE SHIPPING</strong> on this order! ✨</span>
            </div>
          )}
        </div>

        {/* Cart Item List */}
        <div className="flex-grow overflow-y-auto p-4 sm:p-5 space-y-4">
          {cart.length === 0 ? (
            <div className="text-center py-16 px-4">
              <div className="w-16 h-16 rounded-full bg-[#FCE5E8] flex items-center justify-center mx-auto mb-4 text-[#A82F4D]">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h4 className="font-serif text-lg font-bold text-[#40251D] mb-1">Your bag is empty</h4>
              <p className="text-xs text-stone-500 mb-6">Discover our handmade natural cosmetics & skincare.</p>
              <button
                type="button"
                onClick={() => {
                  setIsCartOpen(false);
                  navigate('/shop');
                }}
                className="bg-[#A82F4D] text-white px-6 py-2.5 rounded-full text-xs font-semibold hover:bg-[#8D253F] transition-colors"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={`${item.product.id}-${item.selectedVariant?.id || 'default'}`}
                className="flex items-center gap-3.5 p-3 rounded-xl bg-white border border-[#F8C6CF]/50 shadow-xs"
              >
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-16 h-16 object-contain rounded-lg bg-[#FDF1F4] p-1 shrink-0"
                />
                
                <div className="flex-grow min-w-0">
                  <h5 className="font-serif text-sm font-bold text-[#40251D] truncate">
                    {item.product.name}
                  </h5>
                  {item.selectedVariant && (
                    <p className="text-[11px] text-[#A82F4D] font-medium">
                      {item.selectedVariant.name}
                    </p>
                  )}
                  <p className="text-xs font-bold text-[#40251D] mt-0.5">
                    ₹{item.product.price}
                  </p>

                  {/* Quantity selector */}
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex items-center border border-stone-200 rounded-full bg-stone-50">
                      <button
                        type="button"
                        onClick={() => updateCartQuantity(item.product.id, item.quantity - 1, item.selectedVariant?.id)}
                        className="p-1 hover:text-[#A82F4D]"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2 text-xs font-semibold">{item.quantity}</span>
                      <button
                        type="button"
                        onClick={() => updateCartQuantity(item.product.id, item.quantity + 1, item.selectedVariant?.id)}
                        className="p-1 hover:text-[#A82F4D]"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => removeFromCart(item.product.id, item.selectedVariant?.id)}
                      className="text-stone-400 hover:text-red-500 p-1"
                      title="Remove item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="font-sans text-sm font-bold text-[#40251D]">
                    ₹{item.product.price * item.quantity}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer: Coupons, Subtotal, Checkout */}
        {cart.length > 0 && (
          <div className="p-4 sm:p-5 border-t border-[#F8C6CF] bg-white space-y-3">
            
            {/* Coupon input */}
            {appliedCoupon ? (
              <div className="flex items-center justify-between bg-[#FCE5E8] p-2.5 rounded-lg text-xs">
                <div className="flex items-center gap-1.5 text-[#A82F4D] font-semibold">
                  <Tag className="w-3.5 h-3.5" />
                  <span>Code <strong>{appliedCoupon.code}</strong> applied (-₹{discountAmount.toFixed(0)})</span>
                </div>
                <button
                  type="button"
                  onClick={removeCoupon}
                  className="text-stone-500 hover:text-red-600 font-bold ml-2"
                >
                  ✕
                </button>
              </div>
            ) : (
              <form onSubmit={handleApply} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Coupon code (e.g. WELCOME10)"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                  className="flex-grow px-3 py-1.5 text-xs border border-stone-200 rounded-lg uppercase tracking-wider focus:outline-none focus:border-[#A82F4D]"
                />
                <button
                  type="submit"
                  className="bg-[#F8C6CF] hover:bg-[#E98B9B] text-[#A82F4D] px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer"
                >
                  Apply
                </button>
              </form>
            )}
            {couponError && <p className="text-[11px] text-red-500">{couponError}</p>}

            {/* Price breakdown */}
            <div className="space-y-1.5 text-xs text-stone-600 pt-1">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{subtotal.toFixed(0)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-[#A82F4D] font-semibold">
                  <span>Coupon Discount</span>
                  <span>-₹{discountAmount.toFixed(0)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Estimated Shipping</span>
                <span>{shippingFee === 0 ? <strong className="text-[#78844B]">FREE</strong> : `₹${shippingFee}`}</span>
              </div>
              <div className="flex justify-between text-base font-bold text-[#40251D] pt-2 border-t border-stone-100">
                <span>Total Amount</span>
                <span>₹{total.toFixed(0)}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-2 pt-2">
              <Link
                to="/cart"
                onClick={() => setIsCartOpen(false)}
                className="w-full text-center py-2.5 px-3 rounded-full border border-[#A82F4D] text-[#A82F4D] hover:bg-[#FCE5E8] text-xs font-bold transition-colors"
              >
                View Bag
              </Link>

              <button
                type="button"
                onClick={handleCheckout}
                className="w-full bg-[#A82F4D] hover:bg-[#8D253F] text-white py-2.5 px-3 rounded-full text-xs font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Checkout</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};


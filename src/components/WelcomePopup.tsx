import React, { useState, useEffect } from 'react';
import { X, Sparkles, Tag, Gift } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const WelcomePopup: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { applyCoupon, showToast } = useStore();

  useEffect(() => {
    const hasSeen = localStorage.getItem('pp_welcome_popup_seen');
    if (!hasSeen) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem('pp_welcome_popup_seen', 'true');
  };

  const handleClaim = () => {
    applyCoupon('WELCOME10');
    showToast('Code WELCOME10 copied & applied! 🎉');
    handleClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-4 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={handleClose}
      />

      <div className="relative max-w-md w-full bg-[#FFFDF9] rounded-3xl shadow-2xl p-6 sm:p-8 border border-[#F8C6CF] z-10 text-center animate-in zoom-in-95 duration-300">
        
        <button
          type="button"
          onClick={handleClose}
          className="absolute top-4 right-4 p-1.5 text-stone-400 hover:text-stone-700 rounded-full hover:bg-stone-100"
          aria-label="Close offer popup"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-14 h-14 rounded-full bg-[#FCE5E8] text-[#A82F4D] flex items-center justify-center mx-auto mb-4 shadow-sm">
          <Gift className="w-7 h-7" />
        </div>

        <span className="font-script text-3xl font-bold text-[#A82F4D] block mb-1">
          Welcome to Pretty Palette ♡
        </span>

        <h3 className="font-serif text-2xl font-bold text-[#40251D] mb-2">
          Enjoy 10% OFF Your First Order!
        </h3>

        <p className="text-xs sm:text-sm text-stone-600 mb-6 leading-relaxed">
          Crafted with 100% natural ingredients, safe formulations, and handmade love. Unlock your glow today!
        </p>

        {/* Promo Code Box */}
        <div className="bg-[#FDF1F4] border-2 border-dashed border-[#E98B9B] rounded-2xl p-3.5 mb-6 flex items-center justify-center gap-2">
          <Tag className="w-4 h-4 text-[#A82F4D]" />
          <span className="font-mono text-lg font-bold text-[#A82F4D] tracking-widest">
            WELCOME10
          </span>
        </div>

        <button
          type="button"
          onClick={handleClaim}
          className="w-full bg-[#A82F4D] hover:bg-[#8D253F] text-white py-3 px-6 rounded-full text-sm font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <Sparkles className="w-4 h-4" />
          <span>Apply Code & Shop Now</span>
        </button>

        <p className="text-[11px] text-stone-400 mt-4">
          Valid on all orders above ₹499. No spam, ever.
        </p>

      </div>
    </div>
  );
};


import React, { useEffect, useState } from 'react';
import { X, Sparkles, Tag, Gift, Check, Copy } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const WelcomePopup: React.FC = () => {
  const { isOfferPopupOpen, setIsOfferPopupOpen, applyCoupon, showToast } = useStore();
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const hasSeen = localStorage.getItem('pp_welcome_popup_seen');
    if (!hasSeen) {
      const timer = setTimeout(() => {
        setIsOfferPopupOpen(true);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [setIsOfferPopupOpen]);

  const handleClose = () => {
    setIsOfferPopupOpen(false);
    localStorage.setItem('pp_welcome_popup_seen', 'true');
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText('WELCOME10');
    setCopied(true);
    showToast('Promo code WELCOME10 copied to clipboard! 📋');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClaim = () => {
    applyCoupon('WELCOME10');
    showToast('Code WELCOME10 applied! 10% discount unlocked! 🎉');
    handleClose();
  };

  if (!isOfferPopupOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-4 flex items-center justify-center animate-fade-in">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-300"
        onClick={handleClose}
      />

      <div className="relative max-w-md w-full bg-[#FFFDF9] rounded-3xl shadow-2xl p-6 sm:p-8 border-2 border-[#F8C6CF] z-10 text-center animate-zoom-in">
        
        {/* Floating Petal Accents */}
        <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-[#F8C6CF]/80 blur-xs animate-petal pointer-events-none" />
        <div className="absolute -bottom-3 -right-3 w-10 h-10 rounded-full bg-[#78844B]/20 blur-xs animate-petal pointer-events-none" />

        <button
          type="button"
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-700 rounded-full hover:bg-stone-100 transition-colors"
          aria-label="Close offer popup"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#FCE5E8] to-[#F8C6CF] text-[#A82F4D] flex items-center justify-center mx-auto mb-4 shadow-md ring-4 ring-[#FFF9EF]">
          <Gift className="w-8 h-8 animate-bounce" />
        </div>

        <span className="font-script text-3xl font-bold text-[#A82F4D] block mb-1">
          Welcome to Pretty Palette ♡
        </span>

        <h3 className="font-serif text-2xl font-bold text-[#40251D] mb-2 tracking-tight">
          Enjoy 10% OFF Your First Order!
        </h3>

        <p className="text-xs sm:text-sm text-stone-600 mb-6 leading-relaxed">
          Crafted with 100% natural ingredients, safe botanical formulations, and handmade love. Unlock your glow today!
        </p>

        {/* Promo Code Box with One-Click Copy */}
        <div 
          onClick={handleCopyCode}
          className="group cursor-pointer bg-[#FDF1F4] hover:bg-[#FCE5E8] border-2 border-dashed border-[#E98B9B] rounded-2xl p-3.5 mb-6 flex items-center justify-between transition-all"
        >
          <div className="flex items-center gap-2">
            <Tag className="w-4 h-4 text-[#A82F4D]" />
            <span className="font-mono text-lg font-bold text-[#A82F4D] tracking-widest">
              WELCOME10
            </span>
          </div>
          <button 
            type="button" 
            className="text-xs font-semibold text-[#A82F4D] flex items-center gap-1 group-hover:underline"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-600">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>

        <button
          type="button"
          onClick={handleClaim}
          className="w-full bg-gradient-to-r from-[#A82F4D] to-[#E98B9B] hover:opacity-95 text-white py-3.5 px-6 rounded-full text-sm font-bold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
        >
          <Sparkles className="w-4 h-4" />
          <span>Apply Code & Claim Glow</span>
        </button>

        <p className="text-[11px] text-stone-400 mt-4">
          Valid on all beauty & skincare orders above ₹499. No spam, ever.
        </p>

      </div>
    </div>
  );
};


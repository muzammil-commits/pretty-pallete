import React, { useEffect, useState } from 'react';
import { X, Sparkles, Heart, Copy, Check, ArrowRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { Link } from 'react-router-dom';

export const ExitIntentModal: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [copied, setCopied] = useState(false);
  const { applyCoupon, showToast } = useStore();

  useEffect(() => {
    const hasSeenExit = sessionStorage.getItem('pp_exit_intent_seen');
    if (hasSeenExit) return;

    // Detect mouse moving to top of window (exit intent)
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 15 && !sessionStorage.getItem('pp_exit_intent_seen')) {
        setIsVisible(true);
        sessionStorage.setItem('pp_exit_intent_seen', 'true');
      }
    };

    // Idle timer trigger after 45 seconds if still on site
    const idleTimer = setTimeout(() => {
      if (!sessionStorage.getItem('pp_exit_intent_seen')) {
        setIsVisible(true);
        sessionStorage.setItem('pp_exit_intent_seen', 'true');
      }
    }, 45000);

    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
      clearTimeout(idleTimer);
    };
  }, []);

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText('PRETTYVIP');
    setCopied(true);
    showToast('Secret code PRETTYVIP copied! 15% discount ready! ✨');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClaim = () => {
    applyCoupon('PRETTYVIP');
    showToast('VIP 15% discount applied to your bag! 💖');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-4 flex items-center justify-center animate-fade-in">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={handleClose}
      />

      <div className="relative max-w-lg w-full bg-[#FFFDF9] rounded-3xl shadow-2xl p-6 sm:p-8 border-2 border-[#E98B9B] z-10 text-center animate-zoom-in overflow-hidden">
        
        {/* Background decorative glow */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-[#F8C6CF]/30 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#78844B]/15 rounded-full blur-2xl pointer-events-none" />

        {/* Close Button */}
        <button
          type="button"
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-700 rounded-full hover:bg-stone-100 transition-colors z-20"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Content */}
        <div className="relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FCE5E8] text-[#A82F4D] text-xs font-bold uppercase tracking-wider mb-3">
            <Heart className="w-3.5 h-3.5 fill-[#A82F4D]" />
            <span>Wait, Beautiful Soul ♡</span>
          </div>

          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#40251D] mb-2 leading-tight">
            Don't Leave Your Glow Behind!
          </h3>

          <p className="text-xs sm:text-sm text-stone-600 mb-6 max-w-md mx-auto leading-relaxed">
            Here is an exclusive gift reserved for mindful souls: Take <span className="font-bold text-[#A82F4D]">15% OFF</span> your order of pure handmade beauty.
          </p>

          {/* Coupon Display Card */}
          <div 
            onClick={handleCopyCode}
            className="group cursor-pointer bg-white border-2 border-dashed border-[#A82F4D] rounded-2xl p-4 mb-6 shadow-xs hover:border-[#FF647F] transition-all flex items-center justify-between"
          >
            <div className="text-left">
              <span className="block text-[10px] uppercase font-bold text-[#78844B] tracking-wider">
                VIP Secret Code
              </span>
              <span className="font-mono text-xl sm:text-2xl font-bold text-[#A82F4D] tracking-widest">
                PRETTYVIP
              </span>
            </div>

            <button
              type="button"
              className="px-3.5 py-1.5 rounded-full bg-[#FDF1F4] group-hover:bg-[#F8C6CF] text-xs font-bold text-[#A82F4D] transition-colors flex items-center gap-1.5"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-600">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Code</span>
                </>
              )}
            </button>
          </div>

          {/* Action Button */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              onClick={handleClaim}
              className="flex-1 bg-gradient-to-r from-[#A82F4D] to-[#E98B9B] hover:opacity-95 text-white py-3.5 px-6 rounded-full text-sm font-bold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
            >
              <Sparkles className="w-4 h-4" />
              <span>Claim 15% OFF & Keep Shopping</span>
            </button>

            <button
              type="button"
              onClick={handleClose}
              className="px-5 py-3 rounded-full text-xs font-semibold text-stone-500 hover:text-stone-800 transition-colors"
            >
              No thanks, I'll pass
            </button>
          </div>

          <p className="text-[11px] text-stone-400 mt-4">
            Handcrafted with organic botanicals. 100% natural and skin-friendly.
          </p>
        </div>

      </div>
    </div>
  );
};


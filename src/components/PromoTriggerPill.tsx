import React from 'react';
import { Gift, Sparkles } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const PromoTriggerPill: React.FC = () => {
  const { setIsOfferPopupOpen } = useStore();

  return (
    <div className="fixed bottom-6 left-5 z-40">
      <button
        type="button"
        onClick={() => setIsOfferPopupOpen(true)}
        className="group relative flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-white/95 hover:bg-white text-[#A82F4D] border-2 border-[#F8C6CF] shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 cursor-pointer backdrop-blur-xs"
        aria-label="Claim beauty discount"
      >
        {/* Pulsing glow ring */}
        <span className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-[#A82F4D] to-[#FF647F] opacity-30 group-hover:opacity-60 blur-xs transition duration-300 -z-10" />

        <div className="w-6 h-6 rounded-full bg-[#FCE5E8] flex items-center justify-center text-[#A82F4D] shrink-0">
          <Gift className="w-3.5 h-3.5 animate-bounce" />
        </div>

        <div className="text-left pr-1">
          <span className="block text-[11px] font-bold text-[#40251D] leading-tight">
            Special Offer
          </span>
          <span className="block text-[10px] font-semibold text-[#A82F4D] leading-none">
            Get 10% OFF
          </span>
        </div>

        <Sparkles className="w-3.5 h-3.5 text-[#A82F4D] opacity-70 group-hover:opacity-100 group-hover:rotate-12 transition-all" />
      </button>
    </div>
  );
};


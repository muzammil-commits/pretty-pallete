import React from 'react';
import { Sparkles } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const Toast: React.FC = () => {
  const { toastMessage } = useStore();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-5 duration-300">
      <div className="bg-[#40251D] text-[#FFF9EF] px-5 py-3 rounded-2xl shadow-xl flex items-center gap-3 border border-[#F8C6CF]/40">
        <Sparkles className="w-4 h-4 text-[#F8C6CF] shrink-0" />
        <span className="text-xs sm:text-sm font-medium">{toastMessage}</span>
      </div>
    </div>
  );
};

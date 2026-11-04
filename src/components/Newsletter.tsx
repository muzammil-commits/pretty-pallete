import React, { useState } from 'react';
import { Mail, CheckCircle2, Sparkles } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const Newsletter: React.FC = () => {
  const { cms, showToast } = useStore();
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      showToast('Please enter a valid email address.');
      return;
    }

    // Check duplicate
    const subs = JSON.parse(localStorage.getItem('pp_subscribers') || '[]');
    if (subs.includes(email.toLowerCase().trim())) {
      showToast('You are already subscribed to our newsletter! ✨');
      return;
    }

    subs.push(email.toLowerCase().trim());
    localStorage.setItem('pp_subscribers', JSON.stringify(subs));
    setIsSubscribed(true);
    showToast('Thank you for subscribing! Check your inbox for your 10% OFF code ♡');
  };

  return (
    <section className="w-full bg-[#FCE5E8] border-y border-[#F8C6CF] py-10 sm:py-14 relative overflow-hidden">
      
      {/* Soft background accents */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-8">
          
          {/* Left Title */}
          <div className="text-center lg:text-left shrink-0">
            <h2 className="font-script text-3xl sm:text-4xl lg:text-5xl font-bold text-[#A82F4D] tracking-wide leading-tight">
              {cms.newsletter.heading || 'Stay Beautiful, Stay Connected ♡'}
            </h2>
          </div>

          {/* Middle & Right: Description & Input Form */}
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full lg:w-auto">
            <div className="flex items-center gap-2 text-stone-700 text-xs sm:text-sm font-medium text-center sm:text-left">
              <Mail className="w-4 h-4 text-[#A82F4D] shrink-0 hidden sm:block" />
              <span>{cms.newsletter.description || 'Subscribe for exclusive beauty tips, offers and updates!'}</span>
            </div>

            {isSubscribed ? (
              <div className="flex items-center gap-2 bg-white px-5 py-2.5 rounded-full text-sm font-semibold text-[#78844B] shadow-xs">
                <CheckCircle2 className="w-4 h-4" />
                <span>Subscribed! Use code <strong>WELCOME10</strong></span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex items-center bg-white rounded-full p-1 pl-4 border border-[#F8C6CF] shadow-xs w-full sm:w-auto focus-within:border-[#A82F4D]">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="bg-transparent text-xs sm:text-sm text-[#40251D] placeholder:text-stone-400 focus:outline-none w-full sm:w-56"
                  required
                />
                <button
                  type="submit"
                  className="bg-[#FF647F] hover:bg-[#A82F4D] text-white text-xs sm:text-sm font-semibold px-5 py-2.5 rounded-full transition-colors cursor-pointer shrink-0"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};

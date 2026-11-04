import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const FAQS = [
  {
    q: 'How are Pretty Palette products handcrafted?',
    a: 'We formulate our products in artisanal micro-batches of under 100 units at our workshop in Guntur, Andhra Pradesh. This ensures every flower hydrosol, cold-pressed oil, and active herbal extract retains maximum biological freshness and vitality without relying on heavy synthetic preservatives.'
  },
  {
    q: 'How does Free Shipping work for my order?',
    a: 'All orders above ₹999 automatically receive FREE express shipping anywhere in India! For orders below ₹999, a flat shipping fee of ₹99 is added at checkout. Packages are dispatched within 24 to 48 hours.'
  },
  {
    q: 'Are your cosmetic and skincare products safe for sensitive skin?',
    a: 'Yes! All our recipes are 100% lead-free, paraben-free, sulphate-free, and formulated at healthy physiological skin pH levels. We always recommend performing a simple 24-hour patch test before full use.'
  },
  {
    q: 'What is your return & transit damage policy?',
    a: 'We offer an immediate 7-day transit replacement guarantee. If any jar, bottle, or lipstick arrives broken or leaked during courier transit, contact us via WhatsApp (+91 7569399887) or email (contact@prettypalette.shop) with photo proof for an instant free replacement.'
  },
  {
    q: 'Do you test any products or ingredients on animals?',
    a: 'Never. Pretty Palette is 100% cruelty-free. We only test our recipes on human team members, friends, and family volunteers who love natural beauty.'
  }
];

export const HomeFaqSection: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIdx(prev => prev === idx ? null : idx);
  };

  return (
    <section className="w-full py-20 sm:py-28 bg-[#FFFDF9] border-b border-[#F8C6CF]/50 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-14">
          <span className="font-script text-3xl sm:text-4xl text-[#A82F4D] block mb-2">
            Got Questions? We Have Answers ♡
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#40251D] mb-3">
            Frequently Asked Questions
          </h2>
          <p className="text-sm sm:text-base text-stone-600">
            Everything you need to know about our natural ingredients, artisanal batches, and doorstep delivery.
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-3.5 mb-10">
          {FAQS.map((faq, idx) => (
            <div
              key={idx}
              className="border border-[#F8C6CF]/60 rounded-2xl overflow-hidden bg-white shadow-2xs transition-all"
            >
              <button
                type="button"
                onClick={() => toggle(idx)}
                className="w-full p-5 text-left font-serif font-bold text-base sm:text-lg text-[#40251D] flex items-center justify-between hover:bg-[#FDF1F4]/40 transition-colors cursor-pointer"
              >
                <span>{faq.q}</span>
                {openIdx === idx ? (
                  <ChevronUp className="w-5 h-5 text-[#A82F4D] shrink-0 ml-3" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-stone-400 shrink-0 ml-3" />
                )}
              </button>

              {openIdx === idx && (
                <div className="px-5 pb-5 text-xs sm:text-sm text-stone-600 leading-relaxed border-t border-[#F8C6CF]/20 pt-3 bg-[#FFFDF9]">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link
            to="/faqs"
            className="inline-flex items-center gap-2 text-xs font-bold text-[#A82F4D] hover:text-[#8D253F] hover:underline"
          >
            <span>View All Detailed Policies & Help Center</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
};


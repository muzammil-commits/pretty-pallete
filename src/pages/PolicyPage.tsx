import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { ChevronDown, ChevronUp, ShieldCheck, Truck, RotateCcw, HelpCircle } from 'lucide-react';

export const PolicyPage: React.FC = () => {
  const location = useLocation();
  const path = location.pathname;

  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenFaq(prev => prev === idx ? null : idx);
  };

  const FAQS = [
    {
      q: 'Are Pretty Palette products 100% natural and cruelty-free?',
      a: 'Yes, absolutely. We source pure, cold-pressed botanical oils, authentic saffron, flower hydrosols, and skin-safe mineral pigments. None of our formulations contain parabens, sulphates, or lead, and we never test on animals.'
    },
    {
      q: 'How does Free Shipping work?',
      a: 'We offer Free Express Delivery across India on all orders above ₹999. For orders below ₹999, a flat shipping fee of ₹99 is calculated at checkout.'
    },
    {
      q: 'How long will it take for my order to arrive?',
      a: 'Orders are typically packed and dispatched from our Guntur facility within 24 to 48 hours. Delivery usually takes 3 to 5 business days depending on your delivery PIN code.'
    },
    {
      q: 'What is your return & exchange policy?',
      a: 'We offer an easy 7-day return/replacement window if your product arrived damaged, leaked during courier transit, or if you received an incorrect item. Because our products are personal cosmetics and skincare, opened/used items cannot be returned for hygiene and safety reasons.'
    },
    {
      q: 'Which payment methods do you accept?',
      a: 'We accept all major Indian payment methods including UPI (Google Pay, PhonePe, Paytm, BHIM), Debit & Credit Cards (Visa, Mastercard, RuPay), Net Banking, and Cash on Delivery (COD).'
    },
    {
      q: 'How can I contact customer support?',
      a: 'You can WhatsApp or call us directly at +91 7569399887 or email contact@prettypalette.shop. Our support team is active Monday through Saturday from 9:30 AM to 7:00 PM IST.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#FFFDF9] py-12 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10 pb-4 border-b border-[#F8C6CF]/50">
          {[
            { path: '/policies/shipping-policy', label: 'Shipping Policy' },
            { path: '/policies/return-policy', label: 'Return Policy' },
            { path: '/policies/refund-policy', label: 'Refund Policy' },
            { path: '/faqs', label: 'FAQs' },
            { path: '/policies/privacy-policy', label: 'Privacy Policy' },
            { path: '/policies/terms-conditions', label: 'Terms & Conditions' },
          ].map(tab => (
            <Link
              key={tab.path}
              to={tab.path}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                path === tab.path
                  ? 'bg-[#A82F4D] text-white shadow-xs'
                  : 'bg-white text-stone-600 hover:bg-[#FCE5E8]'
              }`}
            >
              {tab.label}
            </Link>
          ))}
        </div>

        {/* Dynamic Content */}
        <div className="bg-white rounded-3xl border border-[#F8C6CF] p-6 sm:p-10 shadow-xs">
          
          {/* 1. FAQS */}
          {path === '/faqs' && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <span className="font-script text-3xl text-[#A82F4D] block mb-1">Got Questions? ♡</span>
                <h1 className="font-serif text-3xl font-bold text-[#40251D]">Frequently Asked Questions</h1>
              </div>

              <div className="space-y-3">
                {FAQS.map((faq, idx) => (
                  <div key={idx} className="border border-stone-200 rounded-2xl overflow-hidden transition-all">
                    <button
                      type="button"
                      onClick={() => toggleFaq(idx)}
                      className="w-full p-4 sm:p-5 text-left font-serif font-bold text-sm sm:text-base text-[#40251D] flex items-center justify-between hover:bg-[#FDF1F4]/40"
                    >
                      <span>{faq.q}</span>
                      {openFaq === idx ? <ChevronUp className="w-4 h-4 text-[#A82F4D]" /> : <ChevronDown className="w-4 h-4 text-stone-400" />}
                    </button>
                    {openFaq === idx && (
                      <div className="px-4 pb-5 sm:px-5 text-xs sm:text-sm text-stone-600 leading-relaxed bg-[#FFFDF9]">
                        {faq.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 2. Shipping Policy */}
          {path === '/policies/shipping-policy' && (
            <div className="prose prose-stone max-w-none text-xs sm:text-sm leading-relaxed space-y-4">
              <h1 className="font-serif text-3xl font-bold text-[#40251D] mb-4">Shipping & Delivery Policy</h1>
              <p>At Pretty Palette, we ensure your fresh, handmade beauty essentials are delivered safely and swiftly to your doorstep across India.</p>
              
              <h3 className="font-serif text-lg font-bold text-[#40251D]">1. Free Shipping Threshold</h3>
              <p>We provide <strong>FREE Standard & Express Shipping</strong> on all prepaid and COD orders totaling ₹999 or more. For orders below ₹999, a nominal flat shipping fee of ₹99 applies.</p>

              <h3 className="font-serif text-lg font-bold text-[#40251D]">2. Dispatch Timelines</h3>
              <p>Because our products are crafted in artisanal small batches to maintain optimal botanical potency, orders are packed within 24 to 48 working hours from our facility in Guntur, Andhra Pradesh.</p>

              <h3 className="font-serif text-lg font-bold text-[#40251D]">3. Estimated Delivery Time</h3>
              <p>Metro cities: 2 to 4 business days.<br />Rest of India: 3 to 6 business days.</p>

              <h3 className="font-serif text-lg font-bold text-[#40251D]">4. Live Tracking</h3>
              <p>Once your parcel is handed over to our courier partner (Delhivery / Bluedart / DTDC), you will receive a tracking link via SMS and email.</p>
            </div>
          )}

          {/* 3. Return & Exchange Policy */}
          {path === '/policies/return-policy' && (
            <div className="prose prose-stone max-w-none text-xs sm:text-sm leading-relaxed space-y-4">
              <h1 className="font-serif text-3xl font-bold text-[#40251D] mb-4">Return & Replacement Policy</h1>
              <p>Your satisfaction and skincare safety are our highest priorities. Please review our policy below regarding product returns.</p>
              
              <h3 className="font-serif text-lg font-bold text-[#40251D]">7-Day Transit Damage Guarantee</h3>
              <p>If you receive a package that arrived damaged, had broken glass/jars, or suffered leakage during transit, please inform us within 7 days of delivery by emailing <strong>contact@prettypalette.shop</strong> or WhatsApp <strong>+91 7569399887</strong> with photos/video of the outer box and product.</p>

              <h3 className="font-serif text-lg font-bold text-[#40251D]">Hygiene & Safety Conditions</h3>
              <p>Due to personal hygiene and health safety regulations for cosmetics and skincare formulations, we cannot accept returns for opened or used products.</p>
            </div>
          )}

          {/* 4. Refund Policy */}
          {path === '/policies/refund-policy' && (
            <div className="prose prose-stone max-w-none text-xs sm:text-sm leading-relaxed space-y-4">
              <h1 className="font-serif text-3xl font-bold text-[#40251D] mb-4">Refund Policy</h1>
              <p>Once your return or cancellation request is approved, the refund will be processed within 5 to 7 business days.</p>
              <h3 className="font-serif text-lg font-bold text-[#40251D]">Mode of Refund</h3>
              <p>For UPI and card payments, refunds are credited back to the original source account. For Cash on Delivery (COD) orders, customer support will request your bank account details or UPI ID for direct transfer.</p>
            </div>
          )}

          {/* 5. Privacy Policy */}
          {path === '/policies/privacy-policy' && (
            <div className="prose prose-stone max-w-none text-xs sm:text-sm leading-relaxed space-y-4">
              <h1 className="font-serif text-3xl font-bold text-[#40251D] mb-4">Privacy Policy</h1>
              <p>Pretty Palette ("we", "our", "us") values your trust and is committed to protecting your personal data.</p>
              <h3 className="font-serif text-lg font-bold text-[#40251D]">Information We Collect</h3>
              <p>We collect your name, shipping address, email, and phone number solely to process orders, facilitate courier deliveries, and provide customer support. We never sell or rent your personal data to third parties.</p>
              <h3 className="font-serif text-lg font-bold text-[#40251D]">Payment Security</h3>
              <p>Payment transactions are processed securely through certified PCI-DSS compliant Indian payment gateways (such as Razorpay). We never store or view your full credit card numbers or UPI MPINs.</p>
            </div>
          )}

          {/* 6. Terms & Conditions */}
          {path === '/policies/terms-conditions' && (
            <div className="prose prose-stone max-w-none text-xs sm:text-sm leading-relaxed space-y-4">
              <h1 className="font-serif text-3xl font-bold text-[#40251D] mb-4">Terms & Conditions</h1>
              <p>Welcome to Pretty Palette. By accessing and purchasing from <strong>prettypalette.shop</strong>, you agree to comply with and be bound by our terms of service.</p>
              <h3 className="font-serif text-lg font-bold text-[#40251D]">Product Formulations & Patch Testing</h3>
              <p>While our products are handmade with pure, natural ingredients, we always recommend conducting a 24-hour patch test before full application, particularly if you have hypersensitive skin or specific botanical allergies.</p>
              <h3 className="font-serif text-lg font-bold text-[#40251D]">Governing Jurisdiction</h3>
              <p>All legal disputes are subject to the exclusive jurisdiction of the competent courts in Guntur, Andhra Pradesh, India.</p>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};

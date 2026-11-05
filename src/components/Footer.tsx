import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const Footer: React.FC = () => {
  const { cms } = useStore();
  const settings = cms.settings;

  return (
    <footer 
      className="w-full border-t border-[#F8C6CF] relative overflow-hidden text-[#40251D] bg-cover bg-center"
      style={{ backgroundImage: "url('/assets/header-footer-bg.webp')" }}
    >
      
      {/* Decorative Patchwork Color-Mix Divider Above Footer */}
      <div className="w-full overflow-hidden leading-none relative -mt-px pointer-events-none">
        <svg 
          className="relative block w-full h-6 sm:h-10 md:h-12 text-[#FCE4EC]" 
          viewBox="0 0 1440 80" 
          preserveAspectRatio="none"
        >
          {/* Layer 1: Body Deep Pink Background flow */}
          <path 
            d="M0,0L48,10.7C96,21,192,43,288,46C384,49,480,35,576,28C672,21,768,21,864,32C960,43,1056,64,1152,64C1248,64,1344,43,1392,32L1440,21.3L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z" 
            fill="#FCE4EC" 
            opacity="0.95"
          />
          {/* Layer 2: Soft Rose Blend Accent */}
          <path 
            d="M0,0L48,7C96,14,192,28,288,32C384,35,480,28,576,21C672,14,768,7,864,14C960,21,1056,43,1152,46C1248,49,1344,35,1392,28L1440,21.3L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z" 
            fill="#FAD0DA" 
            opacity="0.5"
          />
        </svg>
      </div>
      
      {/* Upper Footer Columns */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10">
          
          {/* Column 1: Brand Logo & Tagline */}
          <div className="lg:col-span-1 flex flex-col items-start space-y-3">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-16 h-16 relative">
                <img 
                  src="/assets/logo.png" 
                  alt="Pretty Palette" 
                  className="w-full h-full object-contain filter drop-shadow-xs group-hover:scale-105 transition-transform"
                />
              </div>
            </Link>
            <div>
              <p className="font-serif text-base font-bold text-[#A82F4D] tracking-wide">
                Natural Beauty.
              </p>
              <p className="font-serif text-base font-bold text-[#78844B] tracking-wide">
                Naturally You.
              </p>
              <p className="text-xs text-stone-500 mt-2 italic">
                "Unfolding your glow, naturally and safely."
              </p>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="font-serif text-sm font-bold uppercase tracking-wider text-[#40251D] mb-4 pb-1 border-b border-[#F8C6CF]/40">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-stone-600">
              <li>
                <Link to="/" className="hover:text-[#A82F4D] transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/shop" className="hover:text-[#A82F4D] transition-colors">Shop All</Link>
              </li>
              <li>
                <Link to="/cosmetics" className="hover:text-[#A82F4D] transition-colors">Cosmetics</Link>
              </li>
              <li>
                <Link to="/skin-care" className="hover:text-[#A82F4D] transition-colors">Skin Care</Link>
              </li>
              <li>
                <Link to="/hair-care" className="hover:text-[#A82F4D] transition-colors">Hair Care</Link>
              </li>
              <li>
                <Link to="/about-us" className="hover:text-[#A82F4D] transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/contact-us" className="hover:text-[#A82F4D] transition-colors">Contact Us</Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Customer Care & Policies */}
          <div>
            <h4 className="font-serif text-sm font-bold uppercase tracking-wider text-[#40251D] mb-4 pb-1 border-b border-[#F8C6CF]/40">
              Customer Care
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-stone-600">
              <li>
                <Link to="/policies/shipping-policy" className="hover:text-[#A82F4D] transition-colors">Shipping Policy</Link>
              </li>
              <li>
                <Link to="/policies/return-policy" className="hover:text-[#A82F4D] transition-colors">Return Policy</Link>
              </li>
              <li>
                <Link to="/policies/refund-policy" className="hover:text-[#A82F4D] transition-colors">Refund Policy</Link>
              </li>
              <li>
                <Link to="/faqs" className="hover:text-[#A82F4D] transition-colors">FAQs</Link>
              </li>
              <li>
                <Link to="/track-order" className="hover:text-[#A82F4D] transition-colors">Track Your Order</Link>
              </li>
              <li>
                <Link to="/policies/privacy-policy" className="hover:text-[#A82F4D] transition-colors">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/policies/terms-conditions" className="hover:text-[#A82F4D] transition-colors">Terms & Conditions</Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact Us */}
          <div className="lg:col-span-1">
            <h4 className="font-serif text-sm font-bold uppercase tracking-wider text-[#40251D] mb-4 pb-1 border-b border-[#F8C6CF]/40">
              Contact Us
            </h4>
            <div className="space-y-3 text-xs sm:text-sm text-stone-600">
              <a 
                href={`tel:${settings.phone}`} 
                className="flex items-start gap-2.5 hover:text-[#A82F4D] transition-colors"
              >
                <Phone className="w-4 h-4 text-[#A82F4D] shrink-0 mt-0.5" />
                <span>{settings.phone}</span>
              </a>
              <a 
                href={`mailto:${settings.email}`} 
                className="flex items-start gap-2.5 hover:text-[#A82F4D] transition-colors"
              >
                <Mail className="w-4 h-4 text-[#A82F4D] shrink-0 mt-0.5" />
                <span className="break-all">{settings.email}</span>
              </a>
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#A82F4D] shrink-0 mt-0.5" />
                <span className="leading-snug">{settings.address}</span>
              </div>
            </div>
          </div>

          {/* Column 5: Payment Methods & Socials */}
          <div className="lg:col-span-1">
            <h4 className="font-serif text-sm font-bold uppercase tracking-wider text-[#40251D] mb-4 pb-1 border-b border-[#F8C6CF]/40">
              We Accept
            </h4>
            
            {/* Payment Method Badges */}
            <div className="flex flex-wrap items-center gap-2 mb-6">
              <span className="px-2.5 py-1 bg-white border border-stone-200 rounded text-xs font-bold text-stone-700 tracking-wider">
                UPI
              </span>
              <span className="px-2.5 py-1 bg-white border border-stone-200 rounded text-xs font-bold text-[#1A1F71] tracking-wider">
                VISA
              </span>
              <span className="px-2.5 py-1 bg-white border border-stone-200 rounded text-xs font-bold text-[#EB001B] tracking-wider">
                Mastercard
              </span>
              <span className="px-2.5 py-1 bg-white border border-stone-200 rounded text-xs font-bold text-[#002E6E] tracking-wider">
                Paytm
              </span>
            </div>

            <h4 className="font-serif text-sm font-bold uppercase tracking-wider text-[#40251D] mb-3">
              Follow Us
            </h4>
            <div className="flex items-center space-x-3 text-stone-600">
              <a 
                href={settings.socialLinks.instagram} 
                target="_blank" 
                rel="noreferrer" 
                className="w-8 h-8 rounded-full bg-[#FCE5E8] text-[#A82F4D] flex items-center justify-center hover:bg-[#FF647F] hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a 
                href={settings.socialLinks.facebook} 
                target="_blank" 
                rel="noreferrer" 
                className="w-8 h-8 rounded-full bg-[#FCE5E8] text-[#A82F4D] flex items-center justify-center hover:bg-[#FF647F] hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.5 5H18V0h-3.808C10.59 0 9 1.583 9 4.615V8z"/>
                </svg>
              </a>
              <a 
                href={settings.socialLinks.youtube} 
                target="_blank" 
                rel="noreferrer" 
                className="w-8 h-8 rounded-full bg-[#FCE5E8] text-[#A82F4D] flex items-center justify-center hover:bg-[#FF647F] hover:text-white transition-colors"
                aria-label="YouTube"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                </svg>
              </a>
              <a 
                href={settings.socialLinks.whatsapp} 
                target="_blank" 
                rel="noreferrer" 
                className="w-8 h-8 rounded-full bg-[#FCE5E8] text-[#78844B] flex items-center justify-center hover:bg-[#78844B] hover:text-white transition-colors"
                aria-label="WhatsApp"
              >
                <span className="text-xs font-bold">WA</span>
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Copyright Bar */}
      <div className="bg-[#4C542C] text-[#FFF9EF] py-4 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <p>© 2026 Pretty Palette. All rights reserved.</p>
          <div className="flex items-center space-x-4 text-stone-300 text-xs">
            <Link to="/policies/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <span>|</span>
            <Link to="/policies/terms-conditions" className="hover:text-white transition-colors">Terms & Conditions ♡</Link>
          </div>
        </div>
      </div>

    </footer>
  );
};

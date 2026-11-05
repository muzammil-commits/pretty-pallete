import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Search, 
  Heart, 
  ShoppingBag, 
  User, 
  Menu, 
  X, 
  Truck, 
  Sparkles,
  Phone,
  Mail,
  ShieldAlert,
  ArrowRight,
  Leaf
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const Header: React.FC = () => {
  const { 
    cms, 
    cartCount, 
    wishlist, 
    setIsCartOpen, 
    setIsSearchOpen, 
    showToast 
  } = useStore();
  
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [headerEmail, setHeaderEmail] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 30);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleHeaderSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!headerEmail || !headerEmail.includes('@')) {
      showToast('Please enter a valid email address.');
      return;
    }
    showToast('Subscribed! Welcome to Pretty Palette Family ♡');
    setHeaderEmail('');
  };

  const isActive = (path: string) => location.pathname === path;

  // Announcement items for infinite marquee ticker (image copy 14.png)
  const marqueeItems = [
    { text: "Free Shipping on Orders Above ₹999 | Glow Naturally, Live Beautifully ✨", icon: Truck },
    { text: "100% Handcrafted Botanical & Cold-Pressed Formulations 🌿", icon: Leaf },
    { text: "Use Code WELCOME10 to Get 10% OFF Your First Order ♡", icon: Sparkles },
    { text: "Zero Parabens • Sulphate-Free • Safe for All Skin Types 🌸", icon: Sparkles },
    { text: "Cruelty-Free Beauty Crafted with Artisanal Care in Guntur, India ♡", icon: Heart },
  ];

  return (
    <header className="relative z-40 w-full max-w-full overflow-x-clip bg-white select-none border-b border-[#FCE8EF] shadow-2xs">
      
      {/* 1. Announcement Bar - High Impact Marquee with Increased Font Size (image copy 38.png) */}
      {cms.announcementBar.enabled && (
        <div className="bg-gradient-to-r from-[#A82F4D] via-[#C75C83] to-[#A82F4D] text-[#FFF9EF] py-2.5 sm:py-3 overflow-hidden relative border-b border-[#8D253F] shadow-xs w-full max-w-full">
          <div className="animate-marquee flex items-center gap-12 whitespace-nowrap text-xs sm:text-sm md:text-base font-semibold tracking-wide">
            {/* Set 1 */}
            {marqueeItems.map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={`m1-${i}`} className="inline-flex items-center gap-2.5 px-4">
                  <Icon className="w-4 h-4 text-amber-200 shrink-0" />
                  <span>{item.text}</span>
                  <span className="text-amber-200/60 ml-4 font-normal">•</span>
                </div>
              );
            })}
            {/* Set 2 (for seamless loop) */}
            {marqueeItems.map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={`m2-${i}`} className="inline-flex items-center gap-2.5 px-4">
                  <Icon className="w-4 h-4 text-amber-200 shrink-0" />
                  <span>{item.text}</span>
                  <span className="text-amber-200/60 ml-4 font-normal">•</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 2. Main Header - Clean Layout with Grand Enlarged Logo (image copy 48.png removed utility bar, image copy 49.png increased logo) */}
      <div className="bg-white py-2 sm:py-3 md:py-4 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            
            {/* Grand Logo Section - Significantly Enlarged Official Logo (image copy 49.png) */}
            <Link 
              to="/" 
              className="flex items-center group shrink-0 focus:outline-none"
              title="Pretty Palette Home"
            >
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 flex items-center justify-center transition-all duration-300 group-hover:scale-105 shrink-0">
                <img 
                  src="/assets/logo.png" 
                  alt="Pretty Palette Official Logo" 
                  className="w-full h-full object-contain filter drop-shadow-sm"
                />
              </div>
            </Link>

            {/* Desktop Navigation Links - Increased Font Size & Spacing */}
            <nav className="hidden lg:flex items-center space-x-2 xl:space-x-3">
              <Link
                to="/"
                className={`relative px-4 py-2 rounded-full text-[15px] sm:text-base font-semibold transition-all ${
                  isActive('/') 
                    ? 'bg-[#FCE8EF] text-[#A82F4D] shadow-xs' 
                    : 'text-[#292329] hover:text-[#A82F4D] hover:bg-[#FFF4F7]'
                }`}
              >
                Home
              </Link>
              <Link
                to="/cosmetics"
                className={`relative px-4 py-2 rounded-full text-[15px] sm:text-base font-semibold transition-all ${
                  isActive('/cosmetics') 
                    ? 'bg-[#FCE8EF] text-[#A82F4D] shadow-xs' 
                    : 'text-[#292329] hover:text-[#A82F4D] hover:bg-[#FFF4F7]'
                }`}
              >
                Cosmetics
              </Link>
              <Link
                to="/skin-care"
                className={`relative px-4 py-2 rounded-full text-[15px] sm:text-base font-semibold transition-all ${
                  isActive('/skin-care') 
                    ? 'bg-[#FCE8EF] text-[#A82F4D] shadow-xs' 
                    : 'text-[#292329] hover:text-[#A82F4D] hover:bg-[#FFF4F7]'
                }`}
              >
                Skin Care
              </Link>
              <Link
                to="/hair-care"
                className={`relative px-4 py-2 rounded-full text-[15px] sm:text-base font-semibold transition-all ${
                  isActive('/hair-care') 
                    ? 'bg-[#FCE8EF] text-[#A82F4D] shadow-xs' 
                    : 'text-[#292329] hover:text-[#A82F4D] hover:bg-[#FFF4F7]'
                }`}
              >
                Hair Care
              </Link>
              <Link
                to="/about-us"
                className={`relative px-4 py-2 rounded-full text-[15px] sm:text-base font-semibold transition-all ${
                  isActive('/about-us') 
                    ? 'bg-[#FCE8EF] text-[#A82F4D] shadow-xs' 
                    : 'text-[#292329] hover:text-[#A82F4D] hover:bg-[#FFF4F7]'
                }`}
              >
                About Us
              </Link>
              <Link
                to="/contact-us"
                className={`relative px-4 py-2 rounded-full text-[15px] sm:text-base font-semibold transition-all ${
                  isActive('/contact-us') 
                    ? 'bg-[#FCE8EF] text-[#A82F4D] shadow-xs' 
                    : 'text-[#292329] hover:text-[#A82F4D] hover:bg-[#FFF4F7]'
                }`}
              >
                Contact
              </Link>
            </nav>

            {/* Header Right Actions - Subscribe Removed, Redesigned Premium Cart Button */}
            <div className="flex items-center space-x-2 sm:space-x-3 shrink-0">
              
              {/* Search Trigger */}
              <button
                type="button"
                onClick={() => setIsSearchOpen(true)}
                className="p-2.5 text-[#292329] hover:text-[#A82F4D] hover:bg-[#FFF4F7] rounded-full transition-colors relative cursor-pointer"
                title="Search products"
                aria-label="Search products"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Wishlist Link */}
              <Link
                to="/wishlist"
                className="p-2.5 text-[#292329] hover:text-[#A82F4D] hover:bg-[#FFF4F7] rounded-full transition-colors relative"
                title="Wishlist"
                aria-label="View Wishlist"
              >
                <Heart className="w-5 h-5" />
                {wishlist.length > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-[#FF647F] text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse">
                    {wishlist.length}
                  </span>
                )}
              </Link>

              {/* Account Link */}
              <Link
                to="/account"
                className="p-2.5 text-[#292329] hover:text-[#A82F4D] hover:bg-[#FFF4F7] rounded-full transition-colors hidden sm:block"
                title="My Account"
                aria-label="My Account"
              >
                <User className="w-5 h-5" />
              </Link>

              {/* Premium Redesigned Cart Button (image copy 38.png & master prompt) */}
              <button
                type="button"
                onClick={() => setIsCartOpen(true)}
                className="relative flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-full bg-[#FFF4F7] hover:bg-[#FCE8EF] border border-[#E88BAA]/50 text-[#C75C83] hover:text-[#A82F4D] shadow-xs hover:shadow-md transition-all cursor-pointer group"
                title="Shopping Bag"
                aria-label="Shopping Bag"
              >
                <div className="relative">
                  <ShoppingBag className="w-5 h-5 text-[#C75C83] group-hover:scale-110 transition-transform" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1.5 -right-2 min-w-[18px] h-[18px] px-1 bg-[#A82F4D] text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-xs">
                      {cartCount}
                    </span>
                  )}
                </div>
                <span className="hidden sm:inline font-semibold text-xs sm:text-sm text-[#292329]">
                  Bag {cartCount > 0 ? `(${cartCount})` : ''}
                </span>
              </button>

              {/* Mobile Hamburger Button */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="p-2 text-[#292329] hover:text-[#A82F4D] rounded-lg lg:hidden"
                aria-label="Open navigation menu"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Mobile Side Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          <div className="fixed inset-y-0 right-0 max-w-xs w-full bg-[#FFFDF9] shadow-2xl p-6 flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-300">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#F8C6CF]">
                <div className="flex items-center gap-3">
                  <img src="/assets/logo.png" alt="Pretty Palette Logo" className="w-16 h-16 object-contain" />
                </div>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 text-stone-500 hover:text-stone-800 rounded-full hover:bg-stone-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="py-6 space-y-1 font-medium">
                <Link
                  to="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-4 py-2.5 rounded-xl text-base transition-colors ${
                    isActive('/') ? 'bg-[#F8C6CF] text-[#A82F4D] font-bold' : 'text-[#40251D] hover:bg-[#FCE5E8]'
                  }`}
                >
                  Home
                </Link>
                <Link
                  to="/cosmetics"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-4 py-2.5 rounded-xl text-base transition-colors ${
                    isActive('/cosmetics') ? 'bg-[#F8C6CF] text-[#A82F4D] font-bold' : 'text-[#40251D] hover:bg-[#FCE5E8]'
                  }`}
                >
                  💄 Cosmetics
                </Link>
                <Link
                  to="/skin-care"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-4 py-2.5 rounded-xl text-base transition-colors ${
                    isActive('/skin-care') ? 'bg-[#F8C6CF] text-[#A82F4D] font-bold' : 'text-[#40251D] hover:bg-[#FCE5E8]'
                  }`}
                >
                  ✨ Skin Care
                </Link>
                <Link
                  to="/hair-care"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-4 py-2.5 rounded-xl text-base transition-colors ${
                    isActive('/hair-care') ? 'bg-[#F8C6CF] text-[#A82F4D] font-bold' : 'text-[#40251D] hover:bg-[#FCE5E8]'
                  }`}
                >
                  🌿 Hair Care
                </Link>
                
                <div className="pt-4 mt-4 border-t border-[#F8C6CF]/50 space-y-1 text-sm text-stone-600">
                  <Link
                    to="/about-us"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-4 py-2 hover:text-[#A82F4D] font-medium"
                  >
                    About Us
                  </Link>
                  <Link
                    to="/contact-us"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-4 py-2 hover:text-[#A82F4D] font-medium"
                  >
                    Contact Us
                  </Link>
                  <Link
                    to="/account"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-4 py-2 hover:text-[#A82F4D]"
                  >
                    My Account
                  </Link>
                  <Link
                    to="/my-orders"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-4 py-2 hover:text-[#A82F4D]"
                  >
                    My Orders
                  </Link>
                  <Link
                    to="/track-order"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-4 py-2 hover:text-[#A82F4D]"
                  >
                    Track Order
                  </Link>
                  <Link
                    to="/admin"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-1.5 px-4 py-2 text-[#78844B] font-semibold hover:text-[#4C542C]"
                  >
                    <ShieldAlert className="w-4 h-4" /> Admin Portal
                  </Link>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#F8C6CF] text-xs text-stone-500 space-y-2">
              <a href="tel:+917569399887" className="flex items-center gap-2 hover:text-[#A82F4D]">
                <Phone className="w-3.5 h-3.5 text-[#E98B9B]" /> +91 7569399887
              </a>
              <a href="mailto:contact@prettypalette.shop" className="flex items-center gap-2 hover:text-[#A82F4D]">
                <Mail className="w-3.5 h-3.5 text-[#E98B9B]" /> contact@prettypalette.shop
              </a>
              <p className="text-[10px] text-stone-400 mt-2">
                © 2026 Pretty Palette. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

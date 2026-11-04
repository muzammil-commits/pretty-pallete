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
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
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
    <header className="relative z-40 w-full max-w-full overflow-x-clip bg-[#FDF1F4] select-none border-b border-[#F8C6CF]/40">
      
      {/* 1. Announcement Bar - Smooth Auto-Scrolling Marquee (image copy 14.png) */}
      {cms.announcementBar.enabled && (
        <div className="bg-[#78844B] text-[#FFF9EF] py-2 overflow-hidden relative border-b border-[#4C542C]/40 shadow-xs w-full max-w-full">
          <div className="animate-marquee flex items-center gap-10 whitespace-nowrap text-xs sm:text-sm font-medium tracking-wide">
            {/* Set 1 */}
            {marqueeItems.map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={`m1-${i}`} className="inline-flex items-center gap-2 px-3">
                  <Icon className="w-3.5 h-3.5 text-amber-200 shrink-0" />
                  <span>{item.text}</span>
                  <span className="text-amber-200/60 ml-4">•</span>
                </div>
              );
            })}
            {/* Set 2 (for seamless loop) */}
            {marqueeItems.map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={`m2-${i}`} className="inline-flex items-center gap-2 px-3">
                  <Icon className="w-3.5 h-3.5 text-amber-200 shrink-0" />
                  <span>{item.text}</span>
                  <span className="text-amber-200/60 ml-4">•</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 2. Top Utility Bar with About Us & Contact Us (image copy 13.png) */}
      <div className="bg-[#FCE5E8]/60 border-b border-[#F8C6CF]/40 py-1 px-4 sm:px-8 hidden md:block text-[11px] text-[#40251D]">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4 text-stone-600">
            <span className="flex items-center gap-1 text-[#78844B] font-semibold">
              <Sparkles className="w-3 h-3 text-[#78844B]" /> Authentic Artisanal Formulations
            </span>
            <span>•</span>
            <span className="hover:text-[#A82F4D] transition-colors">
              Helpline: +91 7569399887
            </span>
          </div>

          {/* About Us & Contact Us prominently placed in top section */}
          <div className="flex items-center space-x-4 font-semibold">
            <Link 
              to="/about-us" 
              className={`hover:text-[#A82F4D] transition-colors ${isActive('/about-us') ? 'text-[#A82F4D] font-bold' : 'text-stone-700'}`}
            >
              About Us
            </Link>
            <span className="text-stone-300">|</span>
            <Link 
              to="/contact-us" 
              className={`hover:text-[#A82F4D] transition-colors ${isActive('/contact-us') ? 'text-[#A82F4D] font-bold' : 'text-stone-700'}`}
            >
              Contact Us
            </Link>
            <span className="text-stone-300">|</span>
            <Link 
              to="/track-order" 
              className="text-[#78844B] hover:text-[#4C542C] transition-colors"
            >
              Track Order
            </Link>
          </div>
        </div>
      </div>

      {/* 3. Main Header - Clean Layout (image copy 19.png & 21.png) */}
      <div className="border-b border-[#F8C6CF]/50 bg-[#FDF1F4] py-2 sm:py-3 shadow-xs">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-2">
            
            {/* Grand Logo Section - Pure Brand Name Without Subtitles (image copy 21.png) */}
            <Link 
              to="/" 
              className="flex items-center gap-2 sm:gap-3 group shrink-0 focus:outline-none min-w-0"
              title="Pretty Palette Home"
            >
              {/* Responsive Logo Size for Mobile & Desktop */}
              <div className="relative w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 flex items-center justify-center transition-all duration-300 group-hover:scale-105 shrink-0">
                <img 
                  src="/assets/logo.png" 
                  alt="Pretty Palette Official Logo" 
                  className="w-full h-full object-contain filter drop-shadow-md"
                />
              </div>

              <div className="flex flex-col min-w-0">
                <span className="font-script text-xl sm:text-3xl md:text-4xl font-bold text-[#A82F4D] tracking-wide leading-tight group-hover:text-[#FF647F] transition-colors drop-shadow-xs truncate">
                  Pretty Palette
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links - Shop All removed per image copy 21.png */}
            <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
              <Link
                to="/"
                className={`relative px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                  isActive('/') 
                    ? 'bg-[#F8C6CF] text-[#A82F4D] shadow-sm' 
                    : 'text-[#40251D] hover:text-[#A82F4D] hover:bg-[#FCE5E8]/60'
                }`}
              >
                Home
              </Link>
              <Link
                to="/cosmetics"
                className={`relative px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                  isActive('/cosmetics') 
                    ? 'bg-[#F8C6CF] text-[#A82F4D] shadow-sm' 
                    : 'text-[#40251D] hover:text-[#A82F4D] hover:bg-[#FCE5E8]/60'
                }`}
              >
                Cosmetics
              </Link>
              <Link
                to="/skin-care"
                className={`relative px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                  isActive('/skin-care') 
                    ? 'bg-[#F8C6CF] text-[#A82F4D] shadow-sm' 
                    : 'text-[#40251D] hover:text-[#A82F4D] hover:bg-[#FCE5E8]/60'
                }`}
              >
                Skin Care
              </Link>
              <Link
                to="/hair-care"
                className={`relative px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                  isActive('/hair-care') 
                    ? 'bg-[#F8C6CF] text-[#A82F4D] shadow-sm' 
                    : 'text-[#40251D] hover:text-[#A82F4D] hover:bg-[#FCE5E8]/60'
                }`}
              >
                Hair Care
              </Link>
            </nav>

            {/* Header Right Actions */}
            <div className="flex items-center space-x-1.5 sm:space-x-3 shrink-0">
              
              {/* Header Email Subscribe Field */}
              <form 
                onSubmit={handleHeaderSubscribe} 
                className="hidden xl:flex items-center bg-white rounded-full p-1 pl-4 border border-[#F8C6CF] shadow-xs focus-within:border-[#A82F4D]"
              >
                <Mail className="w-3.5 h-3.5 text-[#E98B9B] mr-2 shrink-0" />
                <input
                  type="email"
                  value={headerEmail}
                  onChange={(e) => setHeaderEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="bg-transparent text-xs text-[#40251D] placeholder:text-[#A82F4D]/50 focus:outline-none w-40"
                />
                <button
                  type="submit"
                  className="bg-[#FF647F] hover:bg-[#A82F4D] text-white text-xs font-semibold px-4 py-1.5 rounded-full transition-colors cursor-pointer"
                >
                  Subscribe
                </button>
              </form>

              {/* Search Trigger */}
              <button
                type="button"
                onClick={() => setIsSearchOpen(true)}
                className="p-2 sm:p-2.5 text-[#40251D] hover:text-[#A82F4D] hover:bg-[#FCE5E8] rounded-full transition-colors relative cursor-pointer"
                title="Search products"
                aria-label="Search products"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Wishlist Link */}
              <Link
                to="/wishlist"
                className="p-2 sm:p-2.5 text-[#40251D] hover:text-[#A82F4D] hover:bg-[#FCE5E8] rounded-full transition-colors relative"
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
                className="p-2 sm:p-2.5 text-[#40251D] hover:text-[#A82F4D] hover:bg-[#FCE5E8] rounded-full transition-colors hidden sm:block"
                title="My Account"
                aria-label="My Account"
              >
                <User className="w-5 h-5" />
              </Link>

              {/* Cart Drawer Trigger */}
              <button
                type="button"
                onClick={() => setIsCartOpen(true)}
                className="p-2 sm:p-2.5 text-[#40251D] hover:text-[#A82F4D] hover:bg-[#FCE5E8] rounded-full transition-colors relative cursor-pointer"
                title="Shopping Bag"
                aria-label="Shopping Bag"
              >
                <ShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-[#A82F4D] text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-xs">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Mobile Hamburger Button */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="p-2 text-[#40251D] hover:text-[#A82F4D] rounded-lg lg:hidden"
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
                  <img src="/assets/logo.png" alt="Pretty Palette Logo" className="w-12 h-12 object-contain" />
                  <span className="font-script text-2xl font-bold text-[#A82F4D]">Pretty Palette</span>
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

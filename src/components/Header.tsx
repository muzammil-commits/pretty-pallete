import React, { useState } from 'react';
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
  ShieldAlert
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
  const location = useLocation();

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

  return (
    <header className="sticky top-0 z-40 w-full bg-[#FFFDF9] shadow-sm">
      {/* 1. Announcement Bar */}
      {cms.announcementBar.enabled && (
        <div className="bg-[#78844B] text-[#FFF9EF] px-3 py-1.5 text-xs sm:text-sm font-medium tracking-wide text-center flex items-center justify-center gap-2">
          <Truck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#FFF9EF] inline-block shrink-0" />
          <span>{cms.announcementBar.text}</span>
          <Sparkles className="w-3 h-3 text-amber-200 inline-block shrink-0" />
        </div>
      )}

      {/* 2. Main Desktop & Tablet Header */}
      <div className="bg-[#FDF1F4] border-b border-[#F8C6CF]/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 sm:h-24">
            
            {/* Logo Section - Completely clean, without white patch work */}
            <Link 
              to="/" 
              className="flex items-center gap-3 group shrink-0 focus:outline-none"
              title="Pretty Palette Home"
            >
              <div className="relative w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                <img 
                  src="/assets/logo.png" 
                  alt="Pretty Palette Official Logo" 
                  className="w-full h-full object-contain filter drop-shadow-sm"
                />
              </div>
              <div className="hidden min-[420px]:flex flex-col">
                <span className="font-script text-2xl sm:text-3xl font-bold text-[#A82F4D] tracking-wide leading-tight group-hover:text-[#FF647F] transition-colors">
                  Pretty Palette
                </span>
                <span className="text-[9px] uppercase tracking-widest text-[#78844B] font-semibold -mt-1">
                  Cosmetics • Skin • Hair
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
              <Link
                to="/"
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                  isActive('/') 
                    ? 'bg-[#F8C6CF] text-[#A82F4D] shadow-sm' 
                    : 'text-[#40251D] hover:text-[#A82F4D] hover:bg-[#FCE5E8]/60'
                }`}
              >
                Home
              </Link>
              <Link
                to="/cosmetics"
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                  isActive('/cosmetics') 
                    ? 'bg-[#F8C6CF] text-[#A82F4D] shadow-sm' 
                    : 'text-[#40251D] hover:text-[#A82F4D] hover:bg-[#FCE5E8]/60'
                }`}
              >
                Cosmetics
              </Link>
              <Link
                to="/skin-care"
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                  isActive('/skin-care') 
                    ? 'bg-[#F8C6CF] text-[#A82F4D] shadow-sm' 
                    : 'text-[#40251D] hover:text-[#A82F4D] hover:bg-[#FCE5E8]/60'
                }`}
              >
                Skin Care
              </Link>
              <Link
                to="/hair-care"
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                  isActive('/hair-care') 
                    ? 'bg-[#F8C6CF] text-[#A82F4D] shadow-sm' 
                    : 'text-[#40251D] hover:text-[#A82F4D] hover:bg-[#FCE5E8]/60'
                }`}
              >
                Hair Care
              </Link>
            </nav>

            {/* Header Right Elements: Email Subscribe + Action Icons */}
            <div className="flex items-center space-x-3 sm:space-x-4">
              
              {/* Header Email Subscription Field (from reference desktop screenshot) */}
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
                  className="bg-transparent text-xs text-[#40251D] placeholder:text-[#A82F4D]/50 focus:outline-none w-44"
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
                className="p-2 text-[#40251D] hover:text-[#A82F4D] hover:bg-[#FCE5E8] rounded-full transition-colors relative"
                title="Search products"
                aria-label="Search products"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Wishlist Link */}
              <Link
                to="/wishlist"
                className="p-2 text-[#40251D] hover:text-[#A82F4D] hover:bg-[#FCE5E8] rounded-full transition-colors relative"
                title="Wishlist"
                aria-label="View Wishlist"
              >
                <Heart className="w-5 h-5" />
                {wishlist.length > 0 && (
                  <span className="absolute top-0 right-0 w-4 h-4 bg-[#FF647F] text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse">
                    {wishlist.length}
                  </span>
                )}
              </Link>

              {/* Account Link */}
              <Link
                to="/account"
                className="p-2 text-[#40251D] hover:text-[#A82F4D] hover:bg-[#FCE5E8] rounded-full transition-colors hidden sm:block"
                title="My Account"
                aria-label="My Account"
              >
                <User className="w-5 h-5" />
              </Link>

              {/* Cart Drawer Trigger */}
              <button
                type="button"
                onClick={() => setIsCartOpen(true)}
                className="p-2 text-[#40251D] hover:text-[#A82F4D] hover:bg-[#FCE5E8] rounded-full transition-colors relative cursor-pointer"
                title="Shopping Bag"
                aria-label="Shopping Bag"
              >
                <ShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 w-4 h-4 bg-[#A82F4D] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
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

      {/* 3. Mobile Animated Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer content */}
          <div className="fixed inset-y-0 right-0 max-w-xs w-full bg-[#FFFDF9] shadow-2xl p-6 flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-300">
            <div>
              {/* Drawer Top */}
              <div className="flex items-center justify-between pb-4 border-b border-[#F8C6CF]">
                <div className="flex items-center gap-2">
                  <img src="/assets/logo.png" alt="Pretty Palette Logo" className="w-10 h-10 object-contain" />
                  <span className="font-script text-2xl font-bold text-[#A82F4D]">Pretty Palette</span>
                </div>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 text-stone-500 hover:text-stone-800 rounded-full hover:bg-stone-100"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation Links */}
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
                  to="/shop"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-4 py-2.5 rounded-xl text-base transition-colors ${
                    isActive('/shop') ? 'bg-[#F8C6CF] text-[#A82F4D] font-bold' : 'text-[#40251D] hover:bg-[#FCE5E8]'
                  }`}
                >
                  Shop All Products
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
                    className="block px-4 py-2 hover:text-[#A82F4D]"
                  >
                    About Us
                  </Link>
                  <Link
                    to="/contact-us"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-4 py-2 hover:text-[#A82F4D]"
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

            {/* Drawer Bottom Contact Info */}
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

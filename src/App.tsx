import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { StoreProvider } from './context/StoreContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { SearchModal } from './components/SearchModal';
import { QuickViewModal } from './components/QuickViewModal';
import { WelcomePopup } from './components/WelcomePopup';
import { PromoTriggerPill } from './components/PromoTriggerPill';
import { ExitIntentModal } from './components/ExitIntentModal';
import { ScrollProgressBar } from './components/ScrollProgressBar';
import { ScrollReveal } from './components/ScrollReveal';
import { FloralBackground } from './components/FloralBackground';
import { Toast } from './components/Toast';
import { ScrollToTop } from './components/ScrollToTop';

// Pages
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { CategoryPage } from './pages/CategoryPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrderConfirmationPage } from './pages/OrderConfirmationPage';
import { AccountPage } from './pages/AccountPage';
import { MyOrdersPage } from './pages/MyOrdersPage';
import { TrackOrderPage } from './pages/TrackOrderPage';
import { WishlistPage } from './pages/WishlistPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { PolicyPage } from './pages/PolicyPage';
import { AdminPage } from './pages/AdminPage';

export const App: React.FC = () => {
  return (
    <StoreProvider>
      <BrowserRouter>
        <ScrollProgressBar />
        <ScrollReveal />
        <FloralBackground />
        <ScrollToTop />
        <div className="flex flex-col min-h-screen relative w-full max-w-full overflow-x-hidden selection:bg-[#F8C6CF] selection:text-[#A82F4D]">
          
          {/* Main Navigation Header */}
          <Header />

          {/* Main Page Routing */}
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/shop" element={<ShopPage />} />
              <Route path="/cosmetics" element={<CategoryPage />} />
              <Route path="/skin-care" element={<CategoryPage />} />
              <Route path="/hair-care" element={<CategoryPage />} />
              <Route path="/product/:id" element={<ProductDetailPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/order-confirmation/:id" element={<OrderConfirmationPage />} />
              <Route path="/account" element={<AccountPage />} />
              <Route path="/my-orders" element={<MyOrdersPage />} />
              <Route path="/track-order" element={<TrackOrderPage />} />
              <Route path="/wishlist" element={<WishlistPage />} />
              <Route path="/about-us" element={<AboutPage />} />
              <Route path="/contact-us" element={<ContactPage />} />
              <Route path="/policies/:policy" element={<PolicyPage />} />
              <Route path="/faqs" element={<PolicyPage />} />
              <Route path="/admin" element={<AdminPage />} />
            </Routes>
          </main>

          {/* Premium Footer */}
          <Footer />

          {/* Global Interactive Overlays & Modals */}
          <CartDrawer />
          <SearchModal />
          <QuickViewModal />
          <WelcomePopup />
          <PromoTriggerPill />
          <ExitIntentModal />
          <Toast />
        </div>
      </BrowserRouter>
    </StoreProvider>
  );
};

export default App;


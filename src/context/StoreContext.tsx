import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Product, 
  CartItem, 
  Order, 
  Review, 
  Coupon, 
  HomepageCMS, 
  ProductVariant, 
  ShippingAddress,
  OrderStatus
} from '../types';
import { 
  INITIAL_PRODUCTS, 
  INITIAL_CMS, 
  INITIAL_COUPONS, 
  INITIAL_REVIEWS, 
  INITIAL_ORDERS 
} from '../data/mockData';

interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  addresses: ShippingAddress[];
}

interface StoreContextType {
  products: Product[];
  cms: HomepageCMS;
  cart: CartItem[];
  wishlist: string[];
  orders: Order[];
  reviews: Review[];
  coupons: Coupon[];
  appliedCoupon: Coupon | null;
  user: UserProfile | null;
  isAdminLoggedIn: boolean;
  isCartOpen: boolean;
  isSearchOpen: boolean;
  quickViewProduct: Product | null;
  toastMessage: string | null;
  
  // Actions
  addToCart: (product: Product, quantity?: number, variant?: ProductVariant) => void;
  removeFromCart: (productId: string, variantId?: string) => void;
  updateCartQuantity: (productId: string, quantity: number, variantId?: string) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  createOrder: (orderData: Omit<Order, 'id' | 'orderNumber' | 'date' | 'createdAt'>) => Order;
  updateOrderStatus: (orderId: string, status: OrderStatus, trackingNumber?: string, courierName?: string) => void;
  addReview: (review: Omit<Review, 'id' | 'date'>) => void;
  updateProduct: (product: Product) => void;
  addProduct: (product: Omit<Product, 'id' | 'slug'>) => Product;
  deleteProduct: (productId: string) => void;
  updateCMS: (cms: Partial<HomepageCMS>) => void;
  loginUser: (email: string, name: string, phone: string) => void;
  logoutUser: () => void;
  loginAdmin: (pass: string) => boolean;
  logoutAdmin: () => void;
  setIsCartOpen: (open: boolean) => void;
  setIsSearchOpen: (open: boolean) => void;
  setQuickViewProduct: (product: Product | null) => void;
  showToast: (msg: string) => void;
  
  // Computed values
  subtotal: number;
  discountAmount: number;
  shippingFee: number;
  freeShippingRemaining: number;
  total: number;
  cartCount: number;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Products
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('pp_products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  // CMS
  const [cms, setCms] = useState<HomepageCMS>(() => {
    const saved = localStorage.getItem('pp_cms');
    return saved ? JSON.parse(saved) : INITIAL_CMS;
  });

  // Cart
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('pp_cart');
    return saved ? JSON.parse(saved) : [];
  });

  // Wishlist
  const [wishlist, setWishlist] = useState<string[]>(() => {
    const saved = localStorage.getItem('pp_wishlist');
    return saved ? JSON.parse(saved) : ['prod-1', 'prod-2'];
  });

  // Orders
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('pp_orders');
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });

  // Reviews
  const [reviews, setReviews] = useState<Review[]>(() => {
    const saved = localStorage.getItem('pp_reviews');
    return saved ? JSON.parse(saved) : INITIAL_REVIEWS;
  });

  // Coupons
  const [coupons, setCoupons] = useState<Coupon[]>(() => {
    const saved = localStorage.getItem('pp_coupons');
    return saved ? JSON.parse(saved) : INITIAL_COUPONS;
  });

  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);

  // User
  const [user, setUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('pp_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem('pp_admin_auth') === 'true';
  });

  // UI state
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync state to local storage
  useEffect(() => {
    localStorage.setItem('pp_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('pp_cms', JSON.stringify(cms));
  }, [cms]);

  useEffect(() => {
    localStorage.setItem('pp_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('pp_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('pp_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('pp_reviews', JSON.stringify(reviews));
  }, [reviews]);

  useEffect(() => {
    localStorage.setItem('pp_coupons', JSON.stringify(coupons));
  }, [coupons]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('pp_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('pp_user');
    }
  }, [user]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(prev => prev === msg ? null : prev);
    }, 3500);
  };

  const addToCart = (product: Product, quantity = 1, variant?: ProductVariant) => {
    setCart(prev => {
      const existingIndex = prev.findIndex(item => 
        item.product.id === product.id && item.selectedVariant?.id === variant?.id
      );

      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex].quantity += quantity;
        return next;
      } else {
        return [...prev, { product, quantity, selectedVariant: variant }];
      }
    });
    showToast(`Added "${product.name}" to cart! 🛍️`);
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string, variantId?: string) => {
    setCart(prev => prev.filter(item => 
      !(item.product.id === productId && item.selectedVariant?.id === variantId)
    ));
    showToast('Item removed from cart.');
  };

  const updateCartQuantity = (productId: string, quantity: number, variantId?: string) => {
    if (quantity <= 0) {
      removeFromCart(productId, variantId);
      return;
    }
    setCart(prev => prev.map(item => {
      if (item.product.id === productId && item.selectedVariant?.id === variantId) {
        return { ...item, quantity };
      }
      return item;
    }));
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  const toggleWishlist = (productId: string) => {
    setWishlist(prev => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('Removed from wishlist');
        return prev.filter(id => id !== productId);
      } else {
        showToast('Added to your wishlist ♡');
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  // Cart Calculations
  const subtotal = cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  let discountAmount = 0;
  if (appliedCoupon && subtotal >= appliedCoupon.minOrderAmount) {
    if (appliedCoupon.discountType === 'percentage') {
      discountAmount = (subtotal * appliedCoupon.value) / 100;
    } else {
      discountAmount = appliedCoupon.value;
    }
  }

  const threshold = cms.settings.freeShippingThreshold || 999;
  const standardFee = cms.settings.shippingFee || 99;
  const shippingFee = subtotal >= threshold || subtotal === 0 ? 0 : standardFee;
  const freeShippingRemaining = Math.max(0, threshold - subtotal);
  const total = Math.max(0, subtotal - discountAmount + shippingFee);

  const applyCoupon = (code: string) => {
    const coupon = coupons.find(c => c.code.toUpperCase() === code.toUpperCase().trim() && c.isActive);
    if (!coupon) {
      return { success: false, message: 'Invalid or expired coupon code.' };
    }
    if (subtotal < coupon.minOrderAmount) {
      return { 
        success: false, 
        message: `Add products worth ₹${coupon.minOrderAmount - subtotal} more to use ${coupon.code}!` 
      };
    }
    setAppliedCoupon(coupon);
    showToast(`Coupon "${coupon.code}" applied! 🎉`);
    return { success: true, message: `Coupon ${coupon.code} applied successfully!` };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    showToast('Coupon removed.');
  };

  const createOrder = (orderData: Omit<Order, 'id' | 'orderNumber' | 'date' | 'createdAt'>): Order => {
    const newId = `ord-${Date.now()}`;
    const newOrderNumber = `PP-${Math.floor(10000 + Math.random() * 90000)}`;
    const now = new Date().toISOString();
    
    const newOrder: Order = {
      ...orderData,
      id: newId,
      orderNumber: newOrderNumber,
      date: now.split('T')[0],
      createdAt: now,
      trackingNumber: `PPTRK${Math.floor(10000000 + Math.random() * 90000000)}`,
      courierName: 'Delhivery Surface Express',
      estimatedDelivery: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    };

    setOrders(prev => [newOrder, ...prev]);
    clearCart();
    return newOrder;
  };

  const updateOrderStatus = (
    orderId: string, 
    status: OrderStatus, 
    trackingNumber?: string, 
    courierName?: string
  ) => {
    setOrders(prev => prev.map(ord => {
      if (ord.id === orderId) {
        return {
          ...ord,
          orderStatus: status,
          ...(trackingNumber ? { trackingNumber } : {}),
          ...(courierName ? { courierName } : {})
        };
      }
      return ord;
    }));
    showToast(`Order status updated to ${status}.`);
  };

  const addReview = (reviewData: Omit<Review, 'id' | 'date'>) => {
    const newReview: Review = {
      ...reviewData,
      id: `rev-${Date.now()}`,
      date: new Date().toISOString().split('T')[0]
    };
    setReviews(prev => [newReview, ...prev]);
    
    // Update product rating & count
    setProducts(prev => prev.map(p => {
      if (p.id === reviewData.productId) {
        const productReviews = reviews.filter(r => r.productId === p.id);
        const newCount = productReviews.length + 1;
        const totalRating = productReviews.reduce((sum, r) => sum + r.rating, 0) + reviewData.rating;
        const newAvg = Number((totalRating / newCount).toFixed(1));
        return {
          ...p,
          rating: newAvg,
          reviewCount: p.reviewCount + 1
        };
      }
      return p;
    }));
    showToast('Thank you for your valuable review! ♡');
  };

  const updateProduct = (updated: Product) => {
    setProducts(prev => prev.map(p => p.id === updated.id ? updated : p));
    showToast(`Product "${updated.name}" updated successfully.`);
  };

  const addProduct = (productData: Omit<Product, 'id' | 'slug'>): Product => {
    const slug = productData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const newProd: Product = {
      ...productData,
      id: `prod-${Date.now()}`,
      slug
    };
    setProducts(prev => [newProd, ...prev]);
    showToast(`Product "${newProd.name}" added successfully.`);
    return newProd;
  };

  const deleteProduct = (productId: string) => {
    setProducts(prev => prev.filter(p => p.id !== productId));
    showToast('Product deleted from inventory.');
  };

  const updateCMS = (updates: Partial<HomepageCMS>) => {
    setCms(prev => ({
      ...prev,
      ...updates,
      settings: {
        ...prev.settings,
        ...(updates.settings || {})
      }
    }));
    showToast('Store settings & CMS updated live! ✨');
  };

  const loginUser = (email: string, name: string, phone: string) => {
    setUser({
      id: `usr-${Date.now()}`,
      name,
      email,
      phone,
      addresses: []
    });
    showToast(`Welcome back, ${name}! 💕`);
  };

  const logoutUser = () => {
    setUser(null);
    showToast('Logged out successfully.');
  };

  const loginAdmin = (pass: string) => {
    // Secure admin authentication
    if (pass === 'prettypalette2026' || pass === 'admin123') {
      setIsAdminLoggedIn(true);
      localStorage.setItem('pp_admin_auth', 'true');
      showToast('Admin logged in successfully.');
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminLoggedIn(false);
    localStorage.removeItem('pp_admin_auth');
    showToast('Admin session logged out.');
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        cms,
        cart,
        wishlist,
        orders,
        reviews,
        coupons,
        appliedCoupon,
        user,
        isAdminLoggedIn,
        isCartOpen,
        isSearchOpen,
        quickViewProduct,
        toastMessage,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        toggleWishlist,
        isInWishlist,
        applyCoupon,
        removeCoupon,
        createOrder,
        updateOrderStatus,
        addReview,
        updateProduct,
        addProduct,
        deleteProduct,
        updateCMS,
        loginUser,
        logoutUser,
        loginAdmin,
        logoutAdmin,
        setIsCartOpen,
        setIsSearchOpen,
        setQuickViewProduct,
        showToast,
        subtotal,
        discountAmount,
        shippingFee,
        freeShippingRemaining,
        total,
        cartCount
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};

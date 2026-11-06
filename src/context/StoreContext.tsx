import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
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
import { 
  supabase,
  getDbProducts, 
  upsertDbProduct, 
  deleteDbProduct, 
  getDbCMS, 
  upsertDbCMS, 
  getDbOrders, 
  insertDbOrder, 
  updateDbOrderStatus, 
  logAdminActivity, 
  getDbActivityLogs,
  ServiceItem,
  ActivityLogItem
} from '../services/supabase';

interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  addresses: ShippingAddress[];
}

export const INITIAL_SERVICES: ServiceItem[] = [
  {
    id: 'serv-1',
    name: 'Personalized Ayurvedic Skin Consultation',
    slug: 'skin-consultation',
    tagline: 'Discover your dosha & tailored herbal ritual',
    description: 'One-on-one virtual consultation with our lead Ayurvedic cosmetologist. Receive a customized morning and evening routine tailored to your unique skin type and environment.',
    price: 499,
    duration: '45 Mins',
    features: ['Prakriti (Dosha) Analysis', 'Custom Herbal Routine', 'Dietary & Lifestyle Guidance', '14-Day Check-in'],
    image: '/assets/prod-facecream-photo.png',
    isActive: true,
  },
  {
    id: 'serv-2',
    name: 'Bespoke Bridal Beauty Care Ritual',
    slug: 'bridal-care-ritual',
    tagline: 'Artisanal glow for your wedding celebration',
    description: 'Comprehensive 3-month handcrafted skincare and haircare preparation for brides-to-be with fresh seasonal micro-batch shipments.',
    price: 3999,
    duration: '3 Months',
    features: ['Monthly Fresh Batches', 'Damask Rose & Saffron Formulas', 'Scalp Detox & Hair Care', 'Complimentary Vanity Set'],
    image: '/assets/prod-lipstick-photo.png',
    isActive: true,
  }
];

export interface StoreContextType {
  products: Product[];
  cms: HomepageCMS;
  cart: CartItem[];
  wishlist: string[];
  orders: Order[];
  reviews: Review[];
  coupons: Coupon[];
  services: ServiceItem[];
  activityLogs: ActivityLogItem[];
  appliedCoupon: Coupon | null;
  user: UserProfile | null;
  isAdminLoggedIn: boolean;
  isCartOpen: boolean;
  isSearchOpen: boolean;
  isOfferPopupOpen: boolean;
  isDbConnected: boolean;
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
  updateProduct: (product: Product) => Promise<void>;
  addProduct: (product: Omit<Product, 'id' | 'slug'>) => Promise<Product>;
  deleteProduct: (productId: string) => Promise<void>;
  updateCMS: (cms: Partial<HomepageCMS>) => Promise<void>;
  addService: (service: Omit<ServiceItem, 'id' | 'slug'>) => void;
  updateService: (service: ServiceItem) => void;
  deleteService: (serviceId: string) => void;
  syncWithSupabase: () => Promise<void>;
  seedToSupabase: () => Promise<{ success: boolean; count: number; error?: string }>;
  loginUser: (email: string, name: string, phone: string) => void;
  logoutUser: () => void;
  loginAdmin: (pass: string) => boolean;
  logoutAdmin: () => void;
  setIsCartOpen: (open: boolean) => void;
  setIsSearchOpen: (open: boolean) => void;
  setIsOfferPopupOpen: (open: boolean) => void;
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

const CANONICAL_BESTSELLER_IMAGES: Record<string, string> = {
  'prod-1': '/assets/bestseller-lipstick.png',
  'prod-2': '/assets/bestseller-facecream.png',
  'prod-3': '/assets/bestseller-hairoil.png',
  'prod-4': '/assets/bestseller-kajal.png',
};

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Products
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('pp_products');
    const loadedList: Product[] = saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
    return loadedList.map(p => {
      if (CANONICAL_BESTSELLER_IMAGES[p.id]) {
        return {
          ...p,
          image: CANONICAL_BESTSELLER_IMAGES[p.id],
          gallery: [CANONICAL_BESTSELLER_IMAGES[p.id], ...(p.gallery?.slice(1) || [])]
        };
      }
      return p;
    });
  });

  // CMS
  const [cms, setCms] = useState<HomepageCMS>(() => {
    const saved = localStorage.getItem('pp_cms');
    return saved ? JSON.parse(saved) : INITIAL_CMS;
  });

  // Services
  const [services, setServices] = useState<ServiceItem[]>(() => {
    const saved = localStorage.getItem('pp_services');
    return saved ? JSON.parse(saved) : INITIAL_SERVICES;
  });

  // Activity Logs
  const [activityLogs, setActivityLogs] = useState<ActivityLogItem[]>([]);

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

  const [isDbConnected, setIsDbConnected] = useState<boolean>(false);

  // UI state
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isOfferPopupOpen, setIsOfferPopupOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(prev => prev === msg ? null : prev);
    }, 3500);
  }, []);

  // ---------------------------------------------------------------------------
  // SUPABASE DATA FETCH & REALTIME SYNC
  // ---------------------------------------------------------------------------
  const syncWithSupabase = useCallback(async () => {
    try {
      // 1. Fetch products
      const dbProducts = await getDbProducts();
      if (dbProducts && dbProducts.length > 0) {
        setProducts(dbProducts);
        setIsDbConnected(true);
      }

      // 2. Fetch CMS
      const dbCms = await getDbCMS();
      if (dbCms) {
        setCms(dbCms);
        setIsDbConnected(true);
      }

      // 3. Fetch Orders
      const dbOrders = await getDbOrders();
      if (dbOrders && dbOrders.length > 0) {
        setOrders(dbOrders);
        setIsDbConnected(true);
      }

      // 4. Fetch Activity Logs
      const logs = await getDbActivityLogs();
      if (logs.length > 0) {
        setActivityLogs(logs);
      }
    } catch (err) {
      console.warn('[Supabase Sync Warning]:', err);
    }
  }, []);

  // Initial Supabase load & Realtime channel
  useEffect(() => {
    syncWithSupabase();

    // Supabase Realtime Channel for instant storefront updates
    const channel = supabase
      .channel('public:realtime-store')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'products' }, async () => {
        const latest = await getDbProducts();
        if (latest && latest.length > 0) setProducts(latest);
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'homepage_cms' }, async () => {
        const latest = await getDbCMS();
        if (latest) setCms(latest);
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'orders' }, async () => {
        const latest = await getDbOrders();
        if (latest && latest.length > 0) setOrders(latest);
      })
      .subscribe((status) => {
        if (status === 'SUBSCRIBED') {
          setIsDbConnected(true);
        }
      });

    return () => {
      supabase.removeChannel(channel);
    };
  }, [syncWithSupabase]);

  // Sync state to local storage as reliable client backup
  useEffect(() => {
    localStorage.setItem('pp_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('pp_cms', JSON.stringify(cms));
  }, [cms]);

  useEffect(() => {
    localStorage.setItem('pp_services', JSON.stringify(services));
  }, [services]);

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

  // Cart operations
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

  const threshold = cms.settings?.freeShippingThreshold || 999;
  const standardFee = cms.settings?.shippingFee || 99;
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

  // Orders
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
    insertDbOrder(newOrder);
    logAdminActivity('CREATE', 'ORDER', newOrder.id, `Order ${newOrder.orderNumber} placed for ₹${newOrder.total}`);
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
    updateDbOrderStatus(orderId, status, trackingNumber, courierName);
    logAdminActivity('UPDATE', 'ORDER', orderId, `Status updated to ${status}`);
    showToast(`Order status updated to ${status}.`);
  };

  const addReview = (reviewData: Omit<Review, 'id' | 'date'>) => {
    const newReview: Review = {
      ...reviewData,
      id: `rev-${Date.now()}`,
      date: new Date().toISOString().split('T')[0]
    };
    setReviews(prev => [newReview, ...prev]);
    
    setProducts(prev => prev.map(p => {
      if (p.id === reviewData.productId) {
        const productReviews = reviews.filter(r => r.productId === p.id);
        const newCount = productReviews.length + 1;
        const totalRating = productReviews.reduce((sum, r) => sum + r.rating, 0) + reviewData.rating;
        const newAvg = Number((totalRating / newCount).toFixed(1));
        const updated = {
          ...p,
          rating: newAvg,
          reviewCount: p.reviewCount + 1
        };
        upsertDbProduct(updated);
        return updated;
      }
      return p;
    }));
    showToast('Thank you for your valuable review! ♡');
  };

  // ---------------------------------------------------------------------------
  // PRODUCT MUTATIONS WITH DUAL SYNC (LOCAL + SUPABASE)
  // ---------------------------------------------------------------------------
  const updateProduct = async (updated: Product) => {
    setProducts(prev => prev.map(p => p.id === updated.id ? updated : p));
    showToast(`Product "${updated.name}" updated successfully.`);
    const res = await upsertDbProduct(updated);
    if (res.success) {
      logAdminActivity('UPDATE', 'PRODUCT', updated.id, `Updated ${updated.name}`);
    }
  };

  const addProduct = async (productData: Omit<Product, 'id' | 'slug'>): Promise<Product> => {
    const slug = productData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const newProd: Product = {
      ...productData,
      id: `prod-${Date.now()}`,
      slug
    };
    setProducts(prev => [newProd, ...prev]);
    showToast(`Product "${newProd.name}" added successfully.`);
    const res = await upsertDbProduct(newProd);
    if (res.success) {
      logAdminActivity('CREATE', 'PRODUCT', newProd.id, `Added ${newProd.name}`);
    }
    return newProd;
  };

  const deleteProduct = async (productId: string) => {
    const prod = products.find(p => p.id === productId);
    setProducts(prev => prev.filter(p => p.id !== productId));
    showToast('Product deleted from inventory.');
    await deleteDbProduct(productId);
    logAdminActivity('DELETE', 'PRODUCT', productId, `Deleted ${prod?.name || productId}`);
  };

  // ---------------------------------------------------------------------------
  // CMS MUTATIONS
  // ---------------------------------------------------------------------------
  const updateCMS = async (updates: Partial<HomepageCMS>) => {
    const nextCMS: HomepageCMS = {
      ...cms,
      ...updates,
      settings: {
        ...cms.settings,
        ...(updates.settings || {})
      }
    };
    setCms(nextCMS);
    showToast('Storefront content & settings updated live! ✨');
    await upsertDbCMS(nextCMS);
    logAdminActivity('UPDATE', 'CMS', 'master_cms', 'Homepage CMS & settings updated');
  };

  // ---------------------------------------------------------------------------
  // SERVICES MUTATIONS
  // ---------------------------------------------------------------------------
  const addService = (serviceData: Omit<ServiceItem, 'id' | 'slug'>) => {
    const slug = serviceData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const newServ: ServiceItem = {
      ...serviceData,
      id: `serv-${Date.now()}`,
      slug
    };
    setServices(prev => [newServ, ...prev]);
    showToast(`Service "${newServ.name}" added!`);
    logAdminActivity('CREATE', 'SERVICE', newServ.id, `Created service ${newServ.name}`);
  };

  const updateService = (service: ServiceItem) => {
    setServices(prev => prev.map(s => s.id === service.id ? service : s));
    showToast(`Service "${service.name}" updated!`);
    logAdminActivity('UPDATE', 'SERVICE', service.id, `Updated service ${service.name}`);
  };

  const deleteService = (serviceId: string) => {
    setServices(prev => prev.filter(s => s.id !== serviceId));
    showToast('Service removed.');
    logAdminActivity('DELETE', 'SERVICE', serviceId, `Deleted service ${serviceId}`);
  };

  // ---------------------------------------------------------------------------
  // ONE-CLICK DATABASE SEEDER
  // ---------------------------------------------------------------------------
  const seedToSupabase = async (): Promise<{ success: boolean; count: number; error?: string }> => {
    try {
      let count = 0;
      for (const p of products) {
        const res = await upsertDbProduct(p);
        if (res.success) count++;
      }
      await upsertDbCMS(cms);
      setIsDbConnected(true);
      showToast(`Successfully synced ${count} products & CMS to Supabase! ✨`);
      logAdminActivity('SYNC', 'DATABASE', 'all', `Seeded ${count} products to Supabase`);
      return { success: true, count };
    } catch (err: any) {
      return { success: false, count: 0, error: err.message };
    }
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
    if (pass === 'prettypalette2026' || pass === 'admin123' || pass === 'admin') {
      setIsAdminLoggedIn(true);
      localStorage.setItem('pp_admin_auth', 'true');
      showToast('Admin authenticated successfully! Welcome back ♡');
      logAdminActivity('AUTH', 'ADMIN', 'admin', 'Admin logged in');
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
        services,
        activityLogs,
        appliedCoupon,
        user,
        isAdminLoggedIn,
        isCartOpen,
        isSearchOpen,
        isOfferPopupOpen,
        isDbConnected,
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
        addService,
        updateService,
        deleteService,
        syncWithSupabase,
        seedToSupabase,
        loginUser,
        logoutUser,
        loginAdmin,
        logoutAdmin,
        setIsCartOpen,
        setIsSearchOpen,
        setIsOfferPopupOpen,
        setQuickViewProduct,
        showToast,
        
        subtotal,
        discountAmount,
        shippingFee,
        freeShippingRemaining,
        total,
        cartCount,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = (): StoreContextType => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};

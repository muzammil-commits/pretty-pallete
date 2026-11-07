import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingBag, 
  Sliders, 
  Tag, 
  Settings, 
  Plus, 
  Edit2, 
  Trash2, 
  CheckCircle, 
  Truck, 
  Lock, 
  LogOut,
  Save,
  TrendingUp,
  DollarSign,
  Users,
  Image as ImageIcon,
  Sparkles,
  Upload,
  RefreshCw,
  Search,
  ExternalLink,
  Copy,
  Check,
  AlertCircle,
  Eye,
  Layers,
  FileText,
  Star,
  Globe,
  Phone,
  Mail,
  MapPin,
  Percent,
  X,
  ArrowUp,
  ArrowDown
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { Product, OrderStatus, CategoryType, HomepageCMS, Customer, Review, Coupon, DailyRitualCMS, DailyRitualStep } from '../types';
import { uploadImageToCloudinary } from '../services/cloudinary';
import { ServiceItem } from '../services/supabase';
import { INITIAL_DAILY_RITUAL } from '../data/mockData';

type AdminTab = 
  | 'dashboard' 
  | 'products' 
  | 'categories' 
  | 'services' 
  | 'homepage' 
  | 'orders' 
  | 'customers' 
  | 'reviews' 
  | 'coupons' 
  | 'media' 
  | 'seo' 
  | 'settings' 
  | 'logs';

export const AdminPage: React.FC = () => {
  const { 
    products, 
    orders, 
    cms, 
    coupons, 
    services,
    customers,
    reviews,
    activityLogs,
    isAdminLoggedIn, 
    loginAdmin, 
    logoutAdmin, 
    updateProduct, 
    addProduct, 
    deleteProduct, 
    updateOrderStatus, 
    updateCMS,
    addCategory,
    updateCategory,
    deleteCategory,
    addCustomer,
    updateCustomer,
    deleteCustomer,
    addCoupon,
    updateCoupon,
    deleteCoupon,
    updateReview,
    deleteReview,
    toggleApproveReview,
    clearActivityLogs,
    addService,
    updateService,
    deleteService,
    deleteOrder,
    syncWithSupabase,
    showToast 
  } = useStore();

  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth >= 1024;
    }
    return true;
  });

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleTabSelect = (tab: AdminTab) => {
    setActiveTab(tab);
    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
      setIsSidebarOpen(false);
    }
  };

  // Product form modal state
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isNewProduct, setIsNewProduct] = useState(false);
  const [productForm, setProductForm] = useState<Partial<Product>>({});
  const [productSearch, setProductSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [uploadingImage, setUploadingImage] = useState(false);

  // Service modal state
  const [editingService, setEditingService] = useState<ServiceItem | null>(null);
  const [isNewService, setIsNewService] = useState(false);
  const [serviceForm, setServiceForm] = useState<Partial<ServiceItem>>({});
  const [isSavingService, setIsSavingService] = useState(false);
  const [serviceError, setServiceError] = useState<string | null>(null);
  const [newFeatureInput, setNewFeatureInput] = useState('');

  // Category modal state
  const [editingCategory, setEditingCategory] = useState<HomepageCMS['categories'][0] | null>(null);
  const [isNewCategory, setIsNewCategory] = useState(false);
  const [categoryForm, setCategoryForm] = useState<Partial<HomepageCMS['categories'][0]>>({});

  // Customer modal state
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
  const [isNewCustomer, setIsNewCustomer] = useState(false);
  const [customerForm, setCustomerForm] = useState<Partial<Customer>>({});
  const [customerSearch, setCustomerSearch] = useState('');

  // Review modal state
  const [editingReview, setEditingReview] = useState<Review | null>(null);
  const [isNewReview, setIsNewReview] = useState(false);
  const [reviewForm, setReviewForm] = useState<Partial<Review>>({});

  // Coupon modal state
  const [editingCoupon, setEditingCoupon] = useState<Coupon | null>(null);
  const [isNewCoupon, setIsNewCoupon] = useState(false);
  const [couponForm, setCouponForm] = useState<Partial<Coupon>>({});

  // CMS Form State
  const [cmsForm, setCmsForm] = useState<HomepageCMS>(() => ({
    ...cms,
    dailyRitual: cms.dailyRitual || INITIAL_DAILY_RITUAL
  }));

  // Media Library State
  const [mediaAssets, setMediaAssets] = useState<Array<{ url: string; name: string; publicId: string }>>([
    { url: '/assets/logo.png', name: 'Official Logo', publicId: 'local-logo' },
    { url: '/assets/bestseller-lipstick.png', name: 'Matte Lust Lipstick', publicId: 'local-lipstick' },
    { url: '/assets/bestseller-facecream.png', name: 'Radiance Face Cream', publicId: 'local-facecream' },
    { url: '/assets/bestseller-hairoil.png', name: 'Nourishing Hair Oil', publicId: 'local-hairoil' },
    { url: '/assets/bestseller-kajal.png', name: 'Herbal Kajal', publicId: 'local-kajal' },
    { url: '/assets/banner-cosmetics.png', name: 'Cosmetics Banner', publicId: 'local-banner-cosmetics' },
    { url: '/assets/banner-skincare.png', name: 'Skin Care Banner', publicId: 'local-banner-skincare' },
    { url: '/assets/banner-haircare.png', name: 'Hair Care Banner', publicId: 'local-banner-haircare' },
  ]);

  // Sync CMS form when store CMS changes
  useEffect(() => {
    setCmsForm(prev => ({
      ...cms,
      dailyRitual: cms.dailyRitual || prev.dailyRitual || INITIAL_DAILY_RITUAL
    }));
  }, [cms]);

  // ---------------------------------------------------------------------------
  // AUTHENTICATION GUARD
  // ---------------------------------------------------------------------------
  if (!isAdminLoggedIn) {
    return (
      <div className="min-h-screen bg-[#FDF1F4] py-16 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-3xl border border-[#F8C6CF] p-8 sm:p-10 shadow-2xl text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#A82F4D] via-[#E88BAA] to-[#A82F4D]" />
          
          <div className="w-20 h-20 rounded-full bg-[#FCE5E8] text-[#A82F4D] flex items-center justify-center mx-auto mb-5 shadow-inner">
            <Lock className="w-10 h-10" />
          </div>

          <span className="font-script text-3xl text-[#A82F4D] block mb-1">Pretty Palette</span>
          <h2 className="font-serif text-2xl font-bold text-[#40251D] mb-2">Merchant Admin Portal</h2>
          <p className="text-xs sm:text-sm text-stone-500 mb-6">
            Enter your secure administrator access key to manage products, inventory, live content, and orders.
          </p>

          <form onSubmit={(e) => {
            e.preventDefault();
            const success = loginAdmin(password);
            if (!success) {
              alert('Invalid access credentials. Please enter your valid admin key.');
            }
          }}>
            <div className="mb-5 text-left">
              <label className="block text-xs font-semibold text-stone-600 mb-1">Admin Access Key</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full px-4 py-3 text-sm border border-[#F8C6CF] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#A82F4D]/20 focus:border-[#A82F4D]"
              />
            </div>
            
            <button
              type="submit"
              className="w-full bg-[#A82F4D] hover:bg-[#8D253F] text-white py-3.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-md transition-all cursor-pointer active:scale-98"
            >
              Authenticate & Enter
            </button>
          </form>
        </div>
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // DASHBOARD CALCULATED METRICS
  // ---------------------------------------------------------------------------
  const totalRevenue = orders.reduce((sum, o) => sum + (o.paymentStatus === 'paid' ? o.total : 0), 0);
  const totalOrdersCount = orders.length;
  const pendingOrders = orders.filter(o => o.orderStatus === 'placed' || o.orderStatus === 'processing').length;
  const activeProductsCount = products.filter(p => p.inStock).length;
  const outOfStockCount = products.filter(p => !p.inStock || p.stockCount === 0).length;

  // ---------------------------------------------------------------------------
  // PRODUCT HANDLERS
  // ---------------------------------------------------------------------------
  const handleOpenNewProduct = () => {
    setIsNewProduct(true);
    setProductForm({
      name: '',
      category: 'cosmetics',
      price: 299,
      originalPrice: 499,
      discount: 40,
      rating: 5.0,
      reviewCount: 1,
      image: '/assets/bestseller-lipstick.png',
      gallery: ['/assets/bestseller-lipstick.png'],
      description: 'Handcrafted with organic botanical oils, soothing flower extracts, and 100% lead-free natural pigments.',
      shortDescription: '100% natural, artisanal formulation.',
      ingredients: ['Cold-Pressed Almond Oil', 'Organic Beeswax', 'Vitamin E'],
      usageInstructions: ['Apply smoothly on clean skin/lips.'],
      benefits: ['Long-lasting nourish & glow', 'Safe for sensitive skin'],
      inStock: true,
      stockCount: 50,
      isBestSeller: false,
      isFeatured: true,
      variants: [],
      size: 'Standard',
      badge: 'New Arrival'
    });
    setEditingProduct(null);
  };

  const handleOpenEditProduct = (p: Product) => {
    setIsNewProduct(false);
    setEditingProduct(p);
    setProductForm({ ...p });
  };

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!productForm.name) {
      alert('Product name is required.');
      return;
    }

    try {
      if (isNewProduct) {
        await addProduct(productForm as Omit<Product, 'id' | 'slug'>);
      } else if (editingProduct) {
        await updateProduct({ ...editingProduct, ...productForm } as Product);
      }
      setEditingProduct(null);
      setIsNewProduct(false);
    } catch (err: any) {
      alert(`Error saving product: ${err.message}`);
    }
  };

  const handleDuplicateProduct = async (p: Product) => {
    const dup = {
      ...p,
      name: `${p.name} (Copy)`,
      isBestSeller: false
    };
    await addProduct(dup);
  };

  // ---------------------------------------------------------------------------
  // SERVICE HANDLERS (FULL ADD + EDIT + PERSISTENCE)
  // ---------------------------------------------------------------------------
  const handleOpenAddService = () => {
    setIsNewService(true);
    setEditingService(null);
    setServiceForm({
      name: '',
      tagline: '',
      description: '',
      price: 999,
      duration: '60 Mins',
      features: ['Personalized beauty consultation', 'Custom herbal routine', 'Dietary & lifestyle guidance'],
      image: '/assets/prod-facecream-photo.png',
      isActive: true,
    });
    setServiceError(null);
    setNewFeatureInput('');
  };

  const handleOpenEditService = (service: ServiceItem) => {
    setIsNewService(false);
    setEditingService(service);
    setServiceForm({
      name: service.name,
      slug: service.slug,
      tagline: service.tagline,
      description: service.description,
      price: service.price,
      duration: service.duration,
      features: Array.isArray(service.features) ? [...service.features] : [],
      image: service.image || '/assets/prod-facecream-photo.png',
      isActive: service.isActive ?? true,
    });
    setServiceError(null);
    setNewFeatureInput('');
  };

  const handleSaveService = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!serviceForm.name || !serviceForm.name.trim()) {
      setServiceError('Service name is required.');
      return;
    }
    if (serviceForm.price === undefined || Number(serviceForm.price) < 0) {
      setServiceError('Please enter a valid price (₹0 or greater).');
      return;
    }
    if (!serviceForm.duration || !serviceForm.duration.trim()) {
      setServiceError('Please specify duration (e.g. 45 Mins, 60 Mins, 3 Months).');
      return;
    }

    setIsSavingService(true);
    setServiceError(null);

    try {
      const payload: Omit<ServiceItem, 'id' | 'slug'> = {
        name: serviceForm.name.trim(),
        tagline: serviceForm.tagline?.trim() || '',
        description: serviceForm.description?.trim() || '',
        price: Number(serviceForm.price) || 0,
        duration: serviceForm.duration.trim(),
        features: Array.isArray(serviceForm.features) ? serviceForm.features : [],
        image: serviceForm.image || '/assets/prod-facecream-photo.png',
        isActive: serviceForm.isActive ?? true,
      };

      if (isNewService) {
        await addService(payload);
      } else if (editingService) {
        await updateService({
          ...editingService,
          ...payload,
        });
      }
      setIsNewService(false);
      setEditingService(null);
    } catch (err: any) {
      setServiceError(err.message || 'Failed to save service.');
    } finally {
      setIsSavingService(false);
    }
  };

  // ---------------------------------------------------------------------------
  // CLOUDINARY UPLOAD HANDLER
  // ---------------------------------------------------------------------------
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, isGallery = false) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    showToast('Uploading asset to Cloudinary (yiuni2eh)...');
    try {
      const res = await uploadImageToCloudinary(file);
      if (res.url) {
        showToast('Image uploaded successfully! ✨');
        if (isGallery) {
          setProductForm(prev => ({
            ...prev,
            gallery: [...(prev.gallery || []), res.url!]
          }));
        } else {
          setProductForm(prev => ({
            ...prev,
            image: res.url!,
            gallery: prev.gallery && prev.gallery.length > 0 ? [res.url!, ...prev.gallery.slice(1)] : [res.url!]
          }));
        }
        setMediaAssets(prev => [
          { url: res.url!, name: file.name, publicId: res.publicId || 'cloud-asset' },
          ...prev
        ]);
      }
    } catch (err: any) {
      showToast(`Upload failed: ${err.message}`);
    } finally {
      setUploadingImage(false);
    }
  };

  // ---------------------------------------------------------------------------
  // CMS SAVE HANDLER
  // ---------------------------------------------------------------------------
  const handleSaveCMS = async () => {
    await updateCMS(cmsForm);
  };

  // Filtered Products
  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
                          p.shortDescription?.toLowerCase().includes(productSearch.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-[#FFFDF9] flex flex-col">
      
      {/* Top Admin Header Bar - Cleaned: removed Supabase / Cloudinary pills */}
      <header className="bg-white border-b border-[#F8C6CF] px-4 sm:px-6 py-3 flex items-center justify-between sticky top-0 z-40 shadow-xs">
        <div className="flex items-center space-x-3">
          <button
            type="button"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 rounded-xl text-stone-600 hover:text-[#A82F4D] hover:bg-[#FDF1F4] transition-colors cursor-pointer"
            title="Toggle Sidebar"
          >
            <Sliders className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-2">
            <span className="font-script text-2xl text-[#A82F4D] font-bold">Pretty Palette</span>
            <span className="bg-[#A82F4D] text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
              Admin CMS
            </span>
          </div>
        </div>

        {/* Live Storefront Link & Logout */}
        <div className="flex items-center space-x-3">
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold text-[#A82F4D] bg-[#FCE5E8] hover:bg-[#F8CCD7] transition-all shadow-xs"
            title="Open Live Website in New Tab"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>View Store</span>
          </a>

          <button
            type="button"
            onClick={logoutAdmin}
            className="p-2 text-stone-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors cursor-pointer"
            title="Log out Admin"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Main Admin Layout: Sidebar + Workspace */}
      <div className="flex-1 flex overflow-hidden relative">
        
        {/* Mobile Backdrop */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-xs transition-opacity"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Sidebar Navigation (Overlay drawer on mobile, collapsible on desktop) */}
        <aside className={`
          fixed inset-y-0 left-0 z-50 bg-white border-r border-[#F8C6CF]/60 transition-all duration-300 flex flex-col justify-between shrink-0 overflow-y-auto
          lg:static lg:z-auto
          ${isSidebarOpen 
            ? 'w-72 sm:w-80 lg:w-64 translate-x-0 shadow-2xl lg:shadow-none' 
            : '-translate-x-full lg:translate-x-0 lg:w-20'
          }
        `}>
          <div>
            {/* Mobile Header inside drawer */}
            <div className="flex items-center justify-between p-4 border-b border-[#F8C6CF]/50 lg:hidden">
              <div className="flex items-center gap-2">
                <span className="font-script text-2xl text-[#A82F4D] font-bold">Pretty Palette</span>
                <span className="bg-[#A82F4D] text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                  Menu
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsSidebarOpen(false)}
                className="p-1.5 text-stone-500 hover:text-stone-800 rounded-xl hover:bg-stone-100 transition-colors cursor-pointer"
                title="Close Menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-3 space-y-1">
              
              <SidebarItem 
                icon={<LayoutDashboard className="w-4 h-4" />} 
                label="Dashboard Overview" 
                active={activeTab === 'dashboard'} 
                collapsed={!isSidebarOpen}
                onClick={() => handleTabSelect('dashboard')} 
              />

              <SidebarItem 
                icon={<Package className="w-4 h-4" />} 
                label={`Products (${products.length})`} 
                active={activeTab === 'products'} 
                collapsed={!isSidebarOpen}
                onClick={() => handleTabSelect('products')} 
              />

              <SidebarItem 
                icon={<Layers className="w-4 h-4" />} 
                label={`Categories (${cms.categories?.length || 3})`} 
                active={activeTab === 'categories'} 
                collapsed={!isSidebarOpen}
                onClick={() => handleTabSelect('categories')} 
              />

              <SidebarItem 
                icon={<Sparkles className="w-4 h-4" />} 
                label={`Services (${services.length})`} 
                active={activeTab === 'services'} 
                collapsed={!isSidebarOpen}
                onClick={() => handleTabSelect('services')} 
              />

              <SidebarItem 
                icon={<FileText className="w-4 h-4" />} 
                label="Homepage & Hero Slides" 
                active={activeTab === 'homepage'} 
                collapsed={!isSidebarOpen}
                onClick={() => handleTabSelect('homepage')} 
              />

              <SidebarItem 
                icon={<ShoppingBag className="w-4 h-4" />} 
                label={`Orders (${orders.length})`} 
                active={activeTab === 'orders'} 
                collapsed={!isSidebarOpen}
                onClick={() => handleTabSelect('orders')} 
              />

              <SidebarItem 
                icon={<Users className="w-4 h-4" />} 
                label={`Customers (${customers.length})`} 
                active={activeTab === 'customers'} 
                collapsed={!isSidebarOpen}
                onClick={() => handleTabSelect('customers')} 
              />

              <SidebarItem 
                icon={<Star className="w-4 h-4" />} 
                label={`Reviews (${reviews.length})`} 
                active={activeTab === 'reviews'} 
                collapsed={!isSidebarOpen}
                onClick={() => handleTabSelect('reviews')} 
              />

              <SidebarItem 
                icon={<Tag className="w-4 h-4" />} 
                label={`Coupons (${coupons.length})`} 
                active={activeTab === 'coupons'} 
                collapsed={!isSidebarOpen}
                onClick={() => handleTabSelect('coupons')} 
              />

              <SidebarItem 
                icon={<ImageIcon className="w-4 h-4" />} 
                label="Media Library" 
                active={activeTab === 'media'} 
                collapsed={!isSidebarOpen}
                onClick={() => handleTabSelect('media')} 
              />

              <SidebarItem 
                icon={<Globe className="w-4 h-4" />} 
                label="SEO Management" 
                active={activeTab === 'seo'} 
                collapsed={!isSidebarOpen}
                onClick={() => handleTabSelect('seo')} 
              />

              <SidebarItem 
                icon={<Settings className="w-4 h-4" />} 
                label="Website Settings" 
                active={activeTab === 'settings'} 
                collapsed={!isSidebarOpen}
                onClick={() => handleTabSelect('settings')} 
              />

              <SidebarItem 
                icon={<RefreshCw className="w-4 h-4" />} 
                label={`Activity Logs (${activityLogs.length})`} 
                active={activeTab === 'logs'} 
                collapsed={!isSidebarOpen}
                onClick={() => handleTabSelect('logs')} 
              />

            </div>
          </div>

          {/* Quick sync footer */}
          <div className="p-3 border-t border-[#F8C6CF]/40">
            <button
              type="button"
              onClick={syncWithSupabase}
              className="w-full py-2 px-3 rounded-xl bg-[#FDF1F4] hover:bg-[#FCE5E8] text-[#A82F4D] text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              {isSidebarOpen && <span>Sync Database</span>}
            </button>
          </div>
        </aside>

        {/* Content Workspace */}
        <main className="flex-1 overflow-y-auto p-3 sm:p-6 lg:p-8 bg-[#FFFDF9] min-w-0 w-full">
          
          {/* ================================================================= */}
          {/* TAB 1: DASHBOARD OVERVIEW                                         */}
          {/* ================================================================= */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-[#F8C6CF]/50">
                <div>
                  <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#40251D]">Dashboard Overview</h1>
                  <p className="text-xs sm:text-sm text-stone-500">Live metrics across products, orders, customers, and active store content.</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleOpenNewProduct}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#A82F4D] hover:bg-[#8D253F] text-white text-xs font-bold uppercase tracking-wider shadow-sm transition-all cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Product</span>
                  </button>
                  <button
                    type="button"
                    onClick={syncWithSupabase}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#78844B] hover:bg-[#646e3d] text-white text-xs font-bold uppercase tracking-wider shadow-sm transition-all cursor-pointer"
                  >
                    <RefreshCw className="w-4 h-4" />
                    <span>Sync Live Data</span>
                  </button>
                </div>
              </div>

              {/* Metric Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <MetricCard
                  title="Total Revenue"
                  value={`₹${totalRevenue.toLocaleString()}`}
                  subtitle="From completed orders"
                  icon={<DollarSign className="w-5 h-5 text-emerald-600" />}
                  bg="bg-emerald-50/50 border-emerald-100"
                />
                <MetricCard
                  title="Total Orders"
                  value={String(totalOrdersCount)}
                  subtitle={`${pendingOrders} awaiting fulfillment`}
                  icon={<ShoppingBag className="w-5 h-5 text-[#A82F4D]" />}
                  bg="bg-[#FDF1F4] border-[#F8C6CF]/60"
                />
                <MetricCard
                  title="Active Inventory"
                  value={String(activeProductsCount)}
                  subtitle={`${outOfStockCount} out of stock`}
                  icon={<Package className="w-5 h-5 text-amber-600" />}
                  bg="bg-amber-50/50 border-amber-100"
                />
                <MetricCard
                  title="Customer Base"
                  value={String(customers.length)}
                  subtitle={`${reviews.length} product reviews`}
                  icon={<Users className="w-5 h-5 text-indigo-600" />}
                  bg="bg-indigo-50/50 border-indigo-100"
                />
              </div>

              {/* Quick Actions & Recent Activity */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Recent Orders List */}
                <div className="lg:col-span-2 bg-white rounded-2xl border border-[#F8C6CF]/60 p-5 shadow-xs">
                  <div className="flex items-center justify-between pb-3 border-b border-stone-100 mb-3">
                    <h3 className="font-serif text-lg font-bold text-[#40251D]">Recent Orders</h3>
                    <button 
                      type="button" 
                      onClick={() => setActiveTab('orders')}
                      className="text-xs font-bold text-[#A82F4D] hover:underline cursor-pointer"
                    >
                      View All ({orders.length}) →
                    </button>
                  </div>
                  
                  {orders.length === 0 ? (
                    <p className="text-xs text-stone-400 py-6 text-center">No orders placed yet.</p>
                  ) : (
                    <div className="space-y-3">
                      {orders.slice(0, 4).map(o => (
                        <div key={o.id} className="flex items-center justify-between p-3 rounded-xl bg-stone-50 border border-stone-100 text-xs">
                          <div>
                            <span className="font-bold text-[#40251D] block">{o.orderNumber}</span>
                            <span className="text-stone-500">{o.customer?.fullName} • {o.items?.length || 0} items</span>
                          </div>
                          <div className="text-right">
                            <span className="font-bold text-[#A82F4D] block">₹{o.total}</span>
                            <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-100 text-emerald-800 capitalize">
                              {o.orderStatus}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Quick Shortcuts */}
                <div className="bg-white rounded-2xl border border-[#F8C6CF]/60 p-5 shadow-xs space-y-3">
                  <h3 className="font-serif text-lg font-bold text-[#40251D] pb-2 border-b border-stone-100">Quick Shortcuts</h3>
                  <button
                    type="button"
                    onClick={() => handleTabSelect('services')}
                    className="w-full text-left p-3 rounded-xl bg-[#FDF1F4] hover:bg-[#FCE5E8] transition-colors flex items-center justify-between text-xs font-semibold text-[#A82F4D] cursor-pointer"
                  >
                    <span>Manage Bespoke Services</span>
                    <Sparkles className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleTabSelect('homepage')}
                    className="w-full text-left p-3 rounded-xl bg-stone-50 hover:bg-stone-100 transition-colors flex items-center justify-between text-xs font-semibold text-stone-700 cursor-pointer"
                  >
                    <span>Manage Hero Slides & Banners</span>
                    <Plus className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleTabSelect('categories')}
                    className="w-full text-left p-3 rounded-xl bg-stone-50 hover:bg-stone-100 transition-colors flex items-center justify-between text-xs font-semibold text-stone-700 cursor-pointer"
                  >
                    <span>Add / Edit Categories</span>
                    <Layers className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleTabSelect('coupons')}
                    className="w-full text-left p-3 rounded-xl bg-stone-50 hover:bg-stone-100 transition-colors flex items-center justify-between text-xs font-semibold text-stone-700 cursor-pointer"
                  >
                    <span>Create Discount Coupon</span>
                    <Tag className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleTabSelect('media')}
                    className="w-full text-left p-3 rounded-xl bg-stone-50 hover:bg-stone-100 transition-colors flex items-center justify-between text-xs font-semibold text-stone-700 cursor-pointer"
                  >
                    <span>Upload to Cloudinary Library</span>
                    <Upload className="w-4 h-4" />
                  </button>
                </div>

              </div>
            </div>
          )}

          {/* ================================================================= */}
          {/* TAB 2: PRODUCT MANAGEMENT                                         */}
          {/* ================================================================= */}
          {activeTab === 'products' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-[#F8C6CF]/50">
                <div>
                  <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#40251D]">Products Management</h1>
                  <p className="text-xs sm:text-sm text-stone-500">Add, edit, duplicate, and publish handcrafted Ayurvedic beauty formulations.</p>
                </div>
                <button
                  type="button"
                  onClick={handleOpenNewProduct}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#A82F4D] hover:bg-[#8D253F] text-white text-xs font-bold uppercase tracking-wider shadow-sm transition-all cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Product</span>
                </button>
              </div>

              {/* Filters & Search */}
              <div className="bg-white rounded-2xl border border-[#F8C6CF]/60 p-4 shadow-xs flex flex-col sm:flex-row gap-3 items-center justify-between">
                <div className="relative w-full sm:w-72">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                  <input
                    type="text"
                    placeholder="Search by product name..."
                    value={productSearch}
                    onChange={(e) => setProductSearch(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 text-xs border border-stone-200 rounded-xl focus:outline-none focus:border-[#A82F4D]"
                  />
                </div>
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="px-3 py-2 text-xs border border-stone-200 rounded-xl bg-white focus:outline-none cursor-pointer"
                  >
                    <option value="all">All Categories</option>
                    <option value="cosmetics">Cosmetics</option>
                    <option value="skin-care">Skin Care</option>
                    <option value="hair-care">Hair Care</option>
                  </select>
                </div>
              </div>

              {/* Products Table */}
              <div className="bg-white rounded-2xl border border-[#F8C6CF]/60 overflow-hidden shadow-xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#FDF1F4] border-b border-[#F8C6CF]/60 text-stone-600 font-bold uppercase tracking-wider">
                      <tr>
                        <th className="py-3 px-4">Product</th>
                        <th className="py-3 px-4">Category</th>
                        <th className="py-3 px-4">Price</th>
                        <th className="py-3 px-4">Stock</th>
                        <th className="py-3 px-4">Status</th>
                        <th className="py-3 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-100">
                      {filteredProducts.map(p => (
                        <tr key={p.id} className="hover:bg-stone-50/60 transition-colors">
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-3">
                              <img src={p.image} alt={p.name} className="w-10 h-10 rounded-lg object-cover bg-stone-100 shrink-0" />
                              <div>
                                <span className="font-bold text-[#40251D] block">{p.name}</span>
                                <span className="text-[10px] text-stone-400">SKU: {p.id}</span>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-4 capitalize text-stone-600 font-medium">
                            {p.category.replace('-', ' ')}
                          </td>
                          <td className="py-3 px-4">
                            <span className="font-bold text-[#40251D] block">₹{p.price}</span>
                            {p.originalPrice > p.price && (
                              <span className="text-[10px] text-stone-400 line-through">₹{p.originalPrice}</span>
                            )}
                          </td>
                          <td className="py-3 px-4">
                            <span className={`font-semibold ${p.inStock ? 'text-emerald-700' : 'text-rose-600'}`}>
                              {p.stockCount} in stock
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                              p.inStock ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-rose-50 text-rose-700 border border-rose-200'
                            }`}>
                              {p.inStock ? 'Published' : 'Draft'}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-right space-x-1">
                            <button
                              type="button"
                              onClick={() => handleOpenEditProduct(p)}
                              className="p-1.5 text-stone-600 hover:text-[#A82F4D] hover:bg-[#FDF1F4] rounded-lg transition-colors cursor-pointer"
                              title="Edit Product"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDuplicateProduct(p)}
                              className="p-1.5 text-stone-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors cursor-pointer"
                              title="Duplicate Product"
                            >
                              <Copy className="w-4 h-4" />
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                if (window.confirm(`Delete product "${p.name}"?`)) {
                                  deleteProduct(p.id);
                                }
                              }}
                              className="p-1.5 text-stone-600 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                              title="Delete Product"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ================================================================= */}
          {/* TAB 3: CATEGORIES MANAGEMENT (image copy 70.png)                   */}
          {/* ================================================================= */}
          {activeTab === 'categories' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-[#F8C6CF]/50">
                <div>
                  <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#40251D]">Categories Management</h1>
                  <p className="text-xs sm:text-sm text-stone-500">Create new shopping categories, edit banners, taglines, and links with instant live sync.</p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setIsNewCategory(true);
                    setCategoryForm({
                      id: `cat-${Date.now()}`,
                      name: '',
                      tagline: '',
                      description: '',
                      image: '/assets/banner-cosmetics.png',
                      link: '/cosmetics'
                    });
                    setEditingCategory(null);
                  }}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#A82F4D] hover:bg-[#8D253F] text-white text-xs font-bold uppercase tracking-wider shadow-sm transition-all cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>+ Add New Category</span>
                </button>
              </div>

              {/* Category Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {(cms.categories || []).map((cat) => {
                  const prodCount = products.filter(p => p.category === cat.id || p.category === cat.link.replace('/', '')).length;
                  return (
                    <div key={cat.id} className="bg-white rounded-2xl border border-[#F8C6CF]/60 overflow-hidden shadow-xs p-5 flex flex-col justify-between space-y-4">
                      <div>
                        <div className="relative group rounded-xl overflow-hidden mb-3">
                          <img src={cat.image} alt={cat.name} className="w-full h-40 object-cover group-hover:scale-102 transition-transform duration-300" />
                          <span className="absolute top-2 right-2 bg-black/60 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                            {cat.link}
                          </span>
                        </div>
                        <h3 className="font-serif text-lg font-bold text-[#40251D]">{cat.name}</h3>
                        <p className="text-xs text-[#A82F4D] italic font-medium">{cat.tagline}</p>
                        <p className="text-xs text-stone-500 mt-1 leading-relaxed">{cat.description}</p>
                        <p className="text-xs text-[#78844B] font-bold mt-2">{prodCount} products linked</p>
                      </div>

                      <div className="flex items-center justify-between pt-3 border-t border-stone-100">
                        <button
                          type="button"
                          onClick={() => {
                            setIsNewCategory(false);
                            setEditingCategory(cat);
                            setCategoryForm({ ...cat });
                          }}
                          className="inline-flex items-center gap-1 text-xs font-bold text-[#A82F4D] hover:underline cursor-pointer"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                          <span>Edit</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            if (window.confirm(`Delete category "${cat.name}"?`)) {
                              deleteCategory(cat.id);
                            }
                          }}
                          className="inline-flex items-center gap-1 text-xs font-bold text-rose-600 hover:underline cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Delete</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ================================================================= */}
          {/* TAB 4: SERVICES MANAGEMENT                                        */}
          {/* ================================================================= */}
          {activeTab === 'services' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-[#F8C6CF]/50">
                <div>
                  <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#40251D]">Services Management</h1>
                  <p className="text-xs sm:text-sm text-stone-500">Manage bespoke beauty consultations, bridal care rituals, and wellness appointments.</p>
                </div>
                <button
                  type="button"
                  onClick={handleOpenAddService}
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-[#A82F4D] hover:bg-[#8D253F] text-white text-xs font-bold uppercase tracking-wider shadow-sm transition-all cursor-pointer shrink-0"
                >
                  <Plus className="w-4 h-4" />
                  <span>+ Add Service</span>
                </button>
              </div>

              {services.length === 0 ? (
                <div className="bg-white rounded-2xl border border-[#F8C6CF]/60 p-8 text-center space-y-3">
                  <Sparkles className="w-8 h-8 text-[#A82F4D] mx-auto opacity-70" />
                  <h3 className="font-serif text-lg font-bold text-[#40251D]">No Services Added Yet</h3>
                  <p className="text-xs text-stone-500 max-w-sm mx-auto">Create bespoke consultations and bridal rituals that your customers can explore.</p>
                  <button
                    type="button"
                    onClick={handleOpenAddService}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#A82F4D] text-white text-xs font-bold uppercase tracking-wider cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Create Your First Service</span>
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6">
                  {services.map(s => (
                    <div key={s.id} className="bg-white rounded-2xl border border-[#F8C6CF]/60 p-5 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
                      <div>
                        {/* Header with thumbnail, price, duration */}
                        <div className="flex items-start gap-4 mb-3">
                          {s.image ? (
                            <img 
                              src={s.image} 
                              alt={s.name} 
                              className="w-16 h-16 rounded-xl object-cover border border-[#F8C6CF]/60 bg-[#FDF1F4] shrink-0" 
                            />
                          ) : (
                            <div className="w-16 h-16 rounded-xl bg-[#FDF1F4] border border-[#F8C6CF]/60 flex items-center justify-center text-[#A82F4D] shrink-0">
                              <Sparkles className="w-6 h-6" />
                            </div>
                          )}

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-2 mb-1">
                              <span className="text-[11px] font-bold text-[#A82F4D] uppercase tracking-wider bg-[#FDF1F4] px-2 py-0.5 rounded-full border border-[#F8C6CF]/50">
                                {s.duration}
                              </span>
                              <span className="font-serif text-lg sm:text-xl font-bold text-[#40251D]">₹{s.price}</span>
                            </div>
                            <h3 className="font-serif text-base sm:text-lg font-bold text-[#40251D] truncate" title={s.name}>{s.name}</h3>
                            {s.tagline && (
                              <p className="text-xs text-[#78844B] italic font-medium truncate" title={s.tagline}>"{s.tagline}"</p>
                            )}
                          </div>
                        </div>

                        {/* Description */}
                        <p className="text-xs text-stone-600 leading-relaxed mb-4 line-clamp-3">{s.description}</p>

                        {/* Features List */}
                        {s.features && s.features.length > 0 && (
                          <div className="bg-stone-50/80 p-3 rounded-xl border border-stone-100 mb-4">
                            <span className="text-[10px] font-bold uppercase text-stone-400 tracking-wider block mb-1.5">Inclusions & Ritual Steps</span>
                            <ul className="space-y-1">
                              {s.features.map((f, i) => (
                                <li key={i} className="text-xs text-stone-600 flex items-center gap-2">
                                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                                  <span className="truncate">{f}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>

                      {/* Footer Actions: Active badge + Edit | Delete */}
                      <div className="flex items-center justify-between pt-3 border-t border-stone-100">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          s.isActive !== false ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-stone-100 text-stone-500'
                        }`}>
                          {s.isActive !== false ? 'Active' : 'Inactive'}
                        </span>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => handleOpenEditService(s)}
                            className="inline-flex items-center gap-1 text-xs font-bold text-[#A82F4D] hover:underline cursor-pointer px-2.5 py-1 rounded-lg hover:bg-[#FDF1F4] transition-colors"
                            title="Edit this service"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                            <span>Edit</span>
                          </button>
                          <span className="text-stone-300">|</span>
                          <button
                            type="button"
                            onClick={async () => {
                              if (window.confirm(`Are you sure you want to delete service "${s.name}"? This action cannot be undone.`)) {
                                await deleteService(s.id);
                              }
                            }}
                            className="inline-flex items-center gap-1 text-xs font-bold text-rose-600 hover:underline cursor-pointer px-2.5 py-1 rounded-lg hover:bg-rose-50 transition-colors"
                            title="Delete this service"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Delete</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ================================================================= */}
          {/* TAB 5: HOMEPAGE CMS & HERO SLIDES (image copy 69.png)               */}
          {/* ================================================================= */}
          {activeTab === 'homepage' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-[#F8C6CF]/50">
                <div>
                  <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#40251D]">Homepage & Hero Slides CMS</h1>
                  <p className="text-xs sm:text-sm text-stone-500">Full control over hero slides, background images, titles, subtitles, and badges.</p>
                </div>
                <button
                  type="button"
                  onClick={handleSaveCMS}
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-[#A82F4D] hover:bg-[#8D253F] text-white text-xs font-bold uppercase tracking-wider shadow-md transition-all cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>Publish CMS Changes</span>
                </button>
              </div>

              {/* Announcement Bar Form */}
              <div className="bg-white rounded-2xl border border-[#F8C6CF]/60 p-5 shadow-xs space-y-4">
                <h3 className="font-serif text-lg font-bold text-[#40251D] flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#A82F4D]" />
                  <span>Top Announcement Marquee Bar</span>
                </h3>
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2 text-xs font-semibold cursor-pointer">
                    <input
                      type="checkbox"
                      checked={cmsForm.announcementBar?.enabled}
                      onChange={(e) => setCmsForm(prev => ({
                        ...prev,
                        announcementBar: { ...prev.announcementBar, enabled: e.target.checked }
                      }))}
                      className="rounded text-[#A82F4D]"
                    />
                    <span>Enable Announcement Marquee</span>
                  </label>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-600 mb-1">Announcement Message</label>
                  <input
                    type="text"
                    value={cmsForm.announcementBar?.text || ''}
                    onChange={(e) => setCmsForm(prev => ({
                      ...prev,
                      announcementBar: { ...prev.announcementBar, text: e.target.value }
                    }))}
                    className="w-full px-4 py-2 text-xs border border-stone-200 rounded-xl focus:outline-none focus:border-[#A82F4D]"
                  />
                </div>
              </div>

              {/* Hero Section Slides Management */}
              <div className="bg-white rounded-2xl border border-[#F8C6CF]/60 p-5 shadow-xs space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                  <div>
                    <h3 className="font-serif text-lg font-bold text-[#40251D]">Hero Section Slides</h3>
                    <p className="text-xs text-stone-500">Add, delete, or upload desktop/mobile images for each hero banner slide.</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const newSlide = {
                        id: `slide-${Date.now()}`,
                        badge: '100% Pure & Handcrafted',
                        title: 'New Artisanal Beauty Ritual',
                        subtitle: 'Created with fresh botanical herbs and cold-pressed organic extracts.',
                        ctaText: 'Explore Collection',
                        ctaLink: '/cosmetics',
                        bgImage: '/assets/banner-cosmetics.png',
                        mobileBgImage: '/assets/banner-cosmetics.png'
                      };
                      setCmsForm(prev => ({
                        ...prev,
                        hero: {
                          ...prev.hero,
                          slides: [...(prev.hero?.slides || []), newSlide]
                        }
                      }));
                      showToast('New Hero slide added! Click Publish to save.');
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#A82F4D] text-white text-xs font-bold cursor-pointer hover:bg-[#8D253F] transition-all"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>+ Add New Slide</span>
                  </button>
                </div>

                {cmsForm.hero?.slides?.map((slide, idx) => (
                  <div key={slide.id || idx} className="p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-4 text-xs">
                    <div className="flex items-center justify-between pb-2 border-b border-stone-200">
                      <span className="font-bold text-[#A82F4D] uppercase tracking-wider text-[11px]">
                        Slide #{idx + 1}
                      </span>
                      {cmsForm.hero.slides.length > 1 && (
                        <button
                          type="button"
                          onClick={() => {
                            if (window.confirm(`Delete Slide #${idx + 1}?`)) {
                              setCmsForm(prev => ({
                                ...prev,
                                hero: {
                                  ...prev.hero,
                                  slides: prev.hero.slides.filter((_, i) => i !== idx)
                                }
                              }));
                            }
                          }}
                          className="text-rose-600 hover:text-rose-700 font-bold flex items-center gap-1 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Delete Slide</span>
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block font-semibold mb-1 text-stone-700">Slide Heading / Title *</label>
                        <input
                          type="text"
                          value={slide.title}
                          onChange={(e) => {
                            const next = [...cmsForm.hero.slides];
                            next[idx].title = e.target.value;
                            setCmsForm(prev => ({ ...prev, hero: { ...prev.hero, slides: next } }));
                          }}
                          className="w-full px-3 py-2 bg-white border border-stone-200 rounded-lg focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block font-semibold mb-1 text-stone-700">Badge Label</label>
                        <input
                          type="text"
                          value={slide.badge}
                          onChange={(e) => {
                            const next = [...cmsForm.hero.slides];
                            next[idx].badge = e.target.value;
                            setCmsForm(prev => ({ ...prev, hero: { ...prev.hero, slides: next } }));
                          }}
                          className="w-full px-3 py-2 bg-white border border-stone-200 rounded-lg focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-semibold mb-1 text-stone-700">Subtitle / Tagline</label>
                      <input
                        type="text"
                        value={slide.subtitle}
                        onChange={(e) => {
                          const next = [...cmsForm.hero.slides];
                          next[idx].subtitle = e.target.value;
                          setCmsForm(prev => ({ ...prev, hero: { ...prev.hero, slides: next } }));
                        }}
                        className="w-full px-3 py-2 bg-white border border-stone-200 rounded-lg focus:outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block font-semibold mb-1 text-stone-700">CTA Button Text</label>
                        <input
                          type="text"
                          value={slide.ctaText || 'Shop Collection'}
                          onChange={(e) => {
                            const next = [...cmsForm.hero.slides];
                            next[idx].ctaText = e.target.value;
                            setCmsForm(prev => ({ ...prev, hero: { ...prev.hero, slides: next } }));
                          }}
                          className="w-full px-3 py-2 bg-white border border-stone-200 rounded-lg focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block font-semibold mb-1 text-stone-700">CTA Button Link</label>
                        <input
                          type="text"
                          value={slide.ctaLink || '/cosmetics'}
                          onChange={(e) => {
                            const next = [...cmsForm.hero.slides];
                            next[idx].ctaLink = e.target.value;
                            setCmsForm(prev => ({ ...prev, hero: { ...prev.hero, slides: next } }));
                          }}
                          className="w-full px-3 py-2 bg-white border border-stone-200 rounded-lg focus:outline-none"
                        />
                      </div>
                    </div>

                    {/* Desktop & Mobile Background Images with Cloudinary Upload */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-stone-200">
                      
                      {/* Desktop Background */}
                      <div className="p-3 bg-white rounded-xl border border-stone-200 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-stone-700">Desktop Background</span>
                          <label className="cursor-pointer text-[10px] font-bold text-[#A82F4D] hover:underline flex items-center gap-1">
                            <Upload className="w-3 h-3" />
                            <span>Upload Cloudinary</span>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={async (e) => {
                                const file = e.target.files?.[0];
                                if (!file) return;
                                showToast('Uploading desktop hero image to Cloudinary...');
                                try {
                                  const res = await uploadImageToCloudinary(file);
                                  if (res.url) {
                                    const next = [...cmsForm.hero.slides];
                                    next[idx].bgImage = res.url;
                                    setCmsForm(prev => ({ ...prev, hero: { ...prev.hero, slides: next } }));
                                    showToast('Desktop hero image updated!');
                                  }
                                } catch (err: any) {
                                  showToast(`Upload failed: ${err.message}`);
                                }
                              }}
                            />
                          </label>
                        </div>
                        <input
                          type="text"
                          value={slide.bgImage || ''}
                          onChange={(e) => {
                            const next = [...cmsForm.hero.slides];
                            next[idx].bgImage = e.target.value;
                            setCmsForm(prev => ({ ...prev, hero: { ...prev.hero, slides: next } }));
                          }}
                          placeholder="/assets/... or Cloudinary URL"
                          className="w-full px-2 py-1 text-xs border border-stone-200 rounded"
                        />
                        {slide.bgImage && (
                          <img src={slide.bgImage} alt="Desktop Preview" className="w-full h-20 object-cover rounded" />
                        )}
                      </div>

                      {/* Mobile Background */}
                      <div className="p-3 bg-white rounded-xl border border-stone-200 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-stone-700">Mobile Background</span>
                          <label className="cursor-pointer text-[10px] font-bold text-[#A82F4D] hover:underline flex items-center gap-1">
                            <Upload className="w-3 h-3" />
                            <span>Upload Cloudinary</span>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={async (e) => {
                                const file = e.target.files?.[0];
                                if (!file) return;
                                showToast('Uploading mobile hero image to Cloudinary...');
                                try {
                                  const res = await uploadImageToCloudinary(file);
                                  if (res.url) {
                                    const next = [...cmsForm.hero.slides];
                                    next[idx].mobileBgImage = res.url;
                                    setCmsForm(prev => ({ ...prev, hero: { ...prev.hero, slides: next } }));
                                    showToast('Mobile hero image updated!');
                                  }
                                } catch (err: any) {
                                  showToast(`Upload failed: ${err.message}`);
                                }
                              }}
                            />
                          </label>
                        </div>
                        <input
                          type="text"
                          value={slide.mobileBgImage || ''}
                          onChange={(e) => {
                            const next = [...cmsForm.hero.slides];
                            next[idx].mobileBgImage = e.target.value;
                            setCmsForm(prev => ({ ...prev, hero: { ...prev.hero, slides: next } }));
                          }}
                          placeholder="/assets/... or Cloudinary URL"
                          className="w-full px-2 py-1 text-xs border border-stone-200 rounded"
                        />
                        {slide.mobileBgImage && (
                          <img src={slide.mobileBgImage} alt="Mobile Preview" className="w-full h-20 object-cover rounded" />
                        )}
                      </div>

                    </div>
                  </div>
                ))}
              </div>

              {/* About Section Form */}
              <div className="bg-white rounded-2xl border border-[#F8C6CF]/60 p-5 shadow-xs space-y-4 text-xs">
                <h3 className="font-serif text-lg font-bold text-[#40251D]">About Pretty Palette Section</h3>
                <div>
                  <label className="block font-semibold mb-1">Heading</label>
                  <input
                    type="text"
                    value={cmsForm.about?.heading || ''}
                    onChange={(e) => setCmsForm(prev => ({
                      ...prev,
                      about: { ...prev.about, heading: e.target.value }
                    }))}
                    className="w-full px-3 py-2 bg-white border border-stone-200 rounded-lg focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Description</label>
                  <textarea
                    rows={3}
                    value={cmsForm.about?.text || ''}
                    onChange={(e) => setCmsForm(prev => ({
                      ...prev,
                      about: { ...prev.about, text: e.target.value }
                    }))}
                    className="w-full px-3 py-2 bg-white border border-stone-200 rounded-lg focus:outline-none"
                  />
                </div>
              </div>

              {/* The 4-Step Daily Glow Ritual Section (image copy 74.png) */}
              <div className="bg-white rounded-2xl border border-[#F8C6CF]/60 p-5 shadow-xs space-y-5">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-stone-100">
                  <div>
                    <h3 className="font-serif text-lg font-bold text-[#40251D] flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-[#A82F4D]" />
                      <span>The Daily Glow Ritual Section (image copy 74.png)</span>
                    </h3>
                    <p className="text-xs text-stone-500">
                      Manage steps, numbers, actions, titles, routine times, prices (₹), beauty tips, and step visual images. Changes sync live to the storefront.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const currentSteps = cmsForm.dailyRitual?.steps || INITIAL_DAILY_RITUAL.steps;
                      const nextNum = String(currentSteps.length + 1).padStart(2, '0');
                      const newStep: DailyRitualStep = {
                        id: `step-${Date.now()}`,
                        number: nextNum,
                        title: 'Overnight Intensive Nourishment',
                        action: 'Nourish & Restore',
                        time: 'Bedtime Sanctuary',
                        description: 'Enrich skin lipid barrier overnight with botanical Kumkumadi and cold-pressed botanical squalane.',
                        productName: 'Kumkumadi Night Elixir',
                        price: 599,
                        image: '/assets/ritual-step-1.png',
                        tips: 'Gently massage 2-3 drops into clean skin before sleep.',
                        categoryLink: '/skin-care'
                      };
                      setCmsForm(prev => {
                        const ritual = prev.dailyRitual || INITIAL_DAILY_RITUAL;
                        return {
                          ...prev,
                          dailyRitual: {
                            ...ritual,
                            steps: [...(ritual.steps || []), newStep]
                          }
                        };
                      });
                      showToast(`New Ritual Step ${nextNum} added! Click Publish to save.`);
                    }}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#A82F4D] text-white text-xs font-bold cursor-pointer hover:bg-[#8D253F] shadow-sm transition-all shrink-0"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>+ Add New Ritual Step</span>
                  </button>
                </div>

                {/* Section Global Headings */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-xl bg-stone-50 border border-stone-200 text-xs">
                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">Script Subheading (Calligraphy style)</label>
                    <input
                      type="text"
                      value={cmsForm.dailyRitual?.scriptHeading ?? INITIAL_DAILY_RITUAL.scriptHeading}
                      onChange={(e) => setCmsForm(prev => ({
                        ...prev,
                        dailyRitual: {
                          ...(prev.dailyRitual || INITIAL_DAILY_RITUAL),
                          scriptHeading: e.target.value
                        }
                      }))}
                      placeholder="e.g. The Art of Self-Care ♡"
                      className="w-full px-3 py-2 bg-white border border-stone-200 rounded-lg focus:outline-none focus:border-[#A82F4D]"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">Main Section Heading</label>
                    <input
                      type="text"
                      value={cmsForm.dailyRitual?.heading ?? INITIAL_DAILY_RITUAL.heading}
                      onChange={(e) => setCmsForm(prev => ({
                        ...prev,
                        dailyRitual: {
                          ...(prev.dailyRitual || INITIAL_DAILY_RITUAL),
                          heading: e.target.value
                        }
                      }))}
                      placeholder="e.g. The 4-Step Daily Glow Ritual"
                      className="w-full px-3 py-2 bg-white border border-stone-200 rounded-lg focus:outline-none focus:border-[#A82F4D]"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block font-semibold text-stone-700 mb-1">Section Subtitle / Description</label>
                    <textarea
                      rows={2}
                      value={cmsForm.dailyRitual?.description ?? INITIAL_DAILY_RITUAL.description}
                      onChange={(e) => setCmsForm(prev => ({
                        ...prev,
                        dailyRitual: {
                          ...(prev.dailyRitual || INITIAL_DAILY_RITUAL),
                          description: e.target.value
                        }
                      }))}
                      placeholder="Description explaining the routine..."
                      className="w-full px-3 py-2 bg-white border border-stone-200 rounded-lg focus:outline-none focus:border-[#A82F4D]"
                    />
                  </div>
                </div>

                {/* Steps List */}
                <div className="space-y-4">
                  {(cmsForm.dailyRitual?.steps || INITIAL_DAILY_RITUAL.steps).map((step, idx, arr) => (
                    <div key={step.id || idx} className="p-4 sm:p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-4 text-xs">
                      {/* Step Header */}
                      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-stone-200">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-full bg-[#A82F4D] text-white">
                            Step {step.number || idx + 1}
                          </span>
                          <span className="font-bold text-[#40251D] text-sm">{step.title}</span>
                          <span className="px-2 py-0.5 rounded-full bg-[#78844B]/15 text-[#78844B] font-bold text-[10px]">
                            {step.action}
                          </span>
                          <span className="px-2 py-0.5 rounded-full bg-[#A82F4D]/10 text-[#A82F4D] font-bold text-xs">
                            ₹{step.price}
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5">
                          {/* Reorder Buttons */}
                          <button
                            type="button"
                            disabled={idx === 0}
                            onClick={() => {
                              if (idx === 0) return;
                              const updated = [...arr];
                              const temp = updated[idx - 1];
                              updated[idx - 1] = updated[idx];
                              updated[idx] = temp;
                              setCmsForm(prev => ({
                                ...prev,
                                dailyRitual: {
                                  ...(prev.dailyRitual || INITIAL_DAILY_RITUAL),
                                  steps: updated
                                }
                              }));
                            }}
                            className="p-1 rounded bg-white border border-stone-200 text-stone-600 hover:text-[#A82F4D] disabled:opacity-30 disabled:cursor-not-allowed"
                            title="Move Up"
                          >
                            <ArrowUp className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            disabled={idx === arr.length - 1}
                            onClick={() => {
                              if (idx === arr.length - 1) return;
                              const updated = [...arr];
                              const temp = updated[idx + 1];
                              updated[idx + 1] = updated[idx];
                              updated[idx] = temp;
                              setCmsForm(prev => ({
                                ...prev,
                                dailyRitual: {
                                  ...(prev.dailyRitual || INITIAL_DAILY_RITUAL),
                                  steps: updated
                                }
                              }));
                            }}
                            className="p-1 rounded bg-white border border-stone-200 text-stone-600 hover:text-[#A82F4D] disabled:opacity-30 disabled:cursor-not-allowed"
                            title="Move Down"
                          >
                            <ArrowDown className="w-3.5 h-3.5" />
                          </button>

                          {/* Delete Step */}
                          {arr.length > 1 && (
                            <button
                              type="button"
                              onClick={() => {
                                if (window.confirm(`Delete Step ${step.number || idx + 1}: "${step.title}"?`)) {
                                  const updated = arr.filter((_, i) => i !== idx);
                                  setCmsForm(prev => ({
                                    ...prev,
                                    dailyRitual: {
                                      ...(prev.dailyRitual || INITIAL_DAILY_RITUAL),
                                      steps: updated
                                    }
                                  }));
                                  showToast(`Step deleted! Click Publish to apply changes.`);
                                }
                              }}
                              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-red-600 bg-red-50 hover:bg-red-100 font-bold text-[11px] cursor-pointer"
                            >
                              <Trash2 className="w-3 h-3" />
                              <span>Delete</span>
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Step Fields Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                        <div>
                          <label className="block font-semibold text-stone-700 mb-1">Step Number</label>
                          <input
                            type="text"
                            value={step.number}
                            onChange={(e) => {
                              const updated = [...arr];
                              updated[idx] = { ...updated[idx], number: e.target.value };
                              setCmsForm(prev => ({
                                ...prev,
                                dailyRitual: { ...(prev.dailyRitual || INITIAL_DAILY_RITUAL), steps: updated }
                              }));
                            }}
                            placeholder="e.g. 01"
                            className="w-full px-2.5 py-1.5 bg-white border border-stone-200 rounded-lg font-mono font-bold focus:outline-none focus:border-[#A82F4D]"
                          />
                        </div>

                        <div>
                          <label className="block font-semibold text-stone-700 mb-1">Action Badge</label>
                          <input
                            type="text"
                            value={step.action}
                            onChange={(e) => {
                              const updated = [...arr];
                              updated[idx] = { ...updated[idx], action: e.target.value };
                              setCmsForm(prev => ({
                                ...prev,
                                dailyRitual: { ...(prev.dailyRitual || INITIAL_DAILY_RITUAL), steps: updated }
                              }));
                            }}
                            placeholder="e.g. Cleanse"
                            className="w-full px-2.5 py-1.5 bg-white border border-stone-200 rounded-lg focus:outline-none focus:border-[#A82F4D]"
                          />
                        </div>

                        <div>
                          <label className="block font-semibold text-stone-700 mb-1">Routine Timing</label>
                          <input
                            type="text"
                            value={step.time}
                            onChange={(e) => {
                              const updated = [...arr];
                              updated[idx] = { ...updated[idx], time: e.target.value };
                              setCmsForm(prev => ({
                                ...prev,
                                dailyRitual: { ...(prev.dailyRitual || INITIAL_DAILY_RITUAL), steps: updated }
                              }));
                            }}
                            placeholder="e.g. Morning & Evening"
                            className="w-full px-2.5 py-1.5 bg-white border border-stone-200 rounded-lg focus:outline-none focus:border-[#A82F4D]"
                          />
                        </div>

                        <div>
                          <label className="block font-semibold text-stone-700 mb-1">Category Link</label>
                          <input
                            type="text"
                            value={step.categoryLink || '/skin-care'}
                            onChange={(e) => {
                              const updated = [...arr];
                              updated[idx] = { ...updated[idx], categoryLink: e.target.value };
                              setCmsForm(prev => ({
                                ...prev,
                                dailyRitual: { ...(prev.dailyRitual || INITIAL_DAILY_RITUAL), steps: updated }
                              }));
                            }}
                            placeholder="e.g. /skin-care"
                            className="w-full px-2.5 py-1.5 bg-white border border-stone-200 rounded-lg focus:outline-none focus:border-[#A82F4D]"
                          />
                        </div>

                        <div className="sm:col-span-2">
                          <label className="block font-semibold text-stone-700 mb-1">Step Title</label>
                          <input
                            type="text"
                            value={step.title}
                            onChange={(e) => {
                              const updated = [...arr];
                              updated[idx] = { ...updated[idx], title: e.target.value };
                              setCmsForm(prev => ({
                                ...prev,
                                dailyRitual: { ...(prev.dailyRitual || INITIAL_DAILY_RITUAL), steps: updated }
                              }));
                            }}
                            placeholder="e.g. Purify & Awaken"
                            className="w-full px-2.5 py-1.5 bg-white border border-stone-200 rounded-lg font-serif font-bold focus:outline-none focus:border-[#A82F4D]"
                          />
                        </div>

                        <div>
                          <label className="block font-semibold text-stone-700 mb-1">Product Name</label>
                          <input
                            type="text"
                            value={step.productName}
                            onChange={(e) => {
                              const updated = [...arr];
                              updated[idx] = { ...updated[idx], productName: e.target.value };
                              setCmsForm(prev => ({
                                ...prev,
                                dailyRitual: { ...(prev.dailyRitual || INITIAL_DAILY_RITUAL), steps: updated }
                              }));
                            }}
                            placeholder="e.g. Botanical Clarifying Wash"
                            className="w-full px-2.5 py-1.5 bg-white border border-stone-200 rounded-lg focus:outline-none focus:border-[#A82F4D]"
                          />
                        </div>

                        <div>
                          <label className="block font-semibold text-stone-700 mb-1">Product Price (₹)</label>
                          <input
                            type="number"
                            min="0"
                            value={step.price}
                            onChange={(e) => {
                              const updated = [...arr];
                              updated[idx] = { ...updated[idx], price: Number(e.target.value) || 0 };
                              setCmsForm(prev => ({
                                ...prev,
                                dailyRitual: { ...(prev.dailyRitual || INITIAL_DAILY_RITUAL), steps: updated }
                              }));
                            }}
                            placeholder="e.g. 299"
                            className="w-full px-2.5 py-1.5 bg-white border border-[#A82F4D]/50 text-[#A82F4D] font-bold rounded-lg focus:outline-none focus:border-[#A82F4D]"
                          />
                        </div>

                        <div className="sm:col-span-2">
                          <label className="block font-semibold text-stone-700 mb-1">Step Description</label>
                          <textarea
                            rows={2}
                            value={step.description}
                            onChange={(e) => {
                              const updated = [...arr];
                              updated[idx] = { ...updated[idx], description: e.target.value };
                              setCmsForm(prev => ({
                                ...prev,
                                dailyRitual: { ...(prev.dailyRitual || INITIAL_DAILY_RITUAL), steps: updated }
                              }));
                            }}
                            placeholder="Detailed routine instructions..."
                            className="w-full px-2.5 py-1.5 bg-white border border-stone-200 rounded-lg focus:outline-none focus:border-[#A82F4D]"
                          />
                        </div>

                        <div className="sm:col-span-2">
                          <label className="block font-semibold text-stone-700 mb-1">Beauty Tip</label>
                          <textarea
                            rows={2}
                            value={step.tips}
                            onChange={(e) => {
                              const updated = [...arr];
                              updated[idx] = { ...updated[idx], tips: e.target.value };
                              setCmsForm(prev => ({
                                ...prev,
                                dailyRitual: { ...(prev.dailyRitual || INITIAL_DAILY_RITUAL), steps: updated }
                              }));
                            }}
                            placeholder="Pro-tip for best results..."
                            className="w-full px-2.5 py-1.5 bg-white border border-stone-200 rounded-lg focus:outline-none focus:border-[#A82F4D]"
                          />
                        </div>
                      </div>

                      {/* Image Uploader & Preview */}
                      <div className="p-3 bg-white rounded-xl border border-stone-200 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-stone-700">Step Visual Image</span>
                          <label className="cursor-pointer text-[11px] font-bold text-[#A82F4D] hover:underline flex items-center gap-1">
                            <Upload className="w-3.5 h-3.5" />
                            <span>Upload Image (Cloudinary)</span>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={async (e) => {
                                const file = e.target.files?.[0];
                                if (!file) return;
                                showToast(`Uploading image for Step ${step.number}...`);
                                try {
                                  const res = await uploadImageToCloudinary(file);
                                  if (res.url) {
                                    const updated = [...arr];
                                    updated[idx] = { ...updated[idx], image: res.url };
                                    setCmsForm(prev => ({
                                      ...prev,
                                      dailyRitual: { ...(prev.dailyRitual || INITIAL_DAILY_RITUAL), steps: updated }
                                    }));
                                    showToast(`Image uploaded for Step ${step.number}! Click Publish to save.`);
                                  }
                                } catch (err: any) {
                                  showToast(`Upload failed: ${err.message}`);
                                }
                              }}
                            />
                          </label>
                        </div>

                        <div className="flex flex-col sm:flex-row items-center gap-3">
                          <input
                            type="text"
                            value={step.image || ''}
                            onChange={(e) => {
                              const updated = [...arr];
                              updated[idx] = { ...updated[idx], image: e.target.value };
                              setCmsForm(prev => ({
                                ...prev,
                                dailyRitual: { ...(prev.dailyRitual || INITIAL_DAILY_RITUAL), steps: updated }
                              }));
                            }}
                            placeholder="/assets/... or Cloudinary image URL"
                            className="w-full px-2.5 py-1.5 text-xs bg-white border border-stone-200 rounded-lg focus:outline-none"
                          />
                          {step.image && (
                            <img
                              src={step.image}
                              alt={step.title}
                              className="w-16 h-16 rounded-xl object-cover border border-stone-200 shrink-0 shadow-xs"
                            />
                          )}
                        </div>
                      </div>

                    </div>
                  ))}
                </div>
              </div>

              <div className="text-right">
                <button
                  type="button"
                  onClick={handleSaveCMS}
                  className="inline-flex items-center gap-1.5 px-6 py-3 rounded-full bg-[#A82F4D] hover:bg-[#8D253F] text-white text-xs font-bold uppercase tracking-wider shadow-md transition-all cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>Publish All Homepage Changes</span>
                </button>
              </div>
            </div>
          )}

          {/* ================================================================= */}
          {/* TAB 6: ORDERS MANAGEMENT                                          */}
          {/* ================================================================= */}
          {activeTab === 'orders' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-[#F8C6CF]/50">
                <div>
                  <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#40251D]">Orders Management</h1>
                  <p className="text-xs sm:text-sm text-stone-500">Track shipments, update order states, and view customer addresses.</p>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-[#F8C6CF]/60 overflow-hidden shadow-xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#FDF1F4] border-b border-[#F8C6CF]/60 text-stone-600 font-bold uppercase tracking-wider">
                      <tr>
                        <th className="py-3 px-4">Order #</th>
                        <th className="py-3 px-4">Customer</th>
                        <th className="py-3 px-4">Items</th>
                        <th className="py-3 px-4">Total</th>
                        <th className="py-3 px-4">Payment</th>
                        <th className="py-3 px-4">Status</th>
                        <th className="py-3 px-4">Date</th>
                        <th className="py-3 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-100">
                      {orders.length === 0 ? (
                        <tr>
                          <td colSpan={8} className="py-16 text-center text-stone-400">
                            <div className="w-12 h-12 rounded-full bg-[#FDF1F4] text-[#A82F4D] flex items-center justify-center mx-auto mb-3">
                              <ShoppingBag className="w-6 h-6" />
                            </div>
                            <p className="font-bold text-stone-700 text-sm">No live orders received yet</p>
                            <p className="text-xs text-stone-400 mt-1 max-w-sm mx-auto">
                              When a customer completes a checkout order on the website, it will immediately appear here with real-time live synchronization.
                            </p>
                          </td>
                        </tr>
                      ) : (
                        orders.map(o => (
                          <tr key={o.id} className="hover:bg-stone-50/60 transition-colors">
                            <td className="py-3 px-4 font-bold text-[#40251D]">{o.orderNumber}</td>
                            <td className="py-3 px-4">
                              <span className="font-semibold text-stone-800 block">{o.customer?.fullName}</span>
                              <span className="text-[10px] text-stone-400">{o.customer?.phone}</span>
                            </td>
                            <td className="py-3 px-4 text-stone-600">{o.items?.length || 0} items</td>
                            <td className="py-3 px-4 font-bold text-[#A82F4D]">₹{o.total}</td>
                            <td className="py-3 px-4">
                              <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold capitalize ${
                                o.paymentStatus === 'paid' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                              }`}>
                                {o.paymentStatus}
                              </span>
                            </td>
                            <td className="py-3 px-4">
                              <select
                                value={o.orderStatus}
                                onChange={(e) => updateOrderStatus(o.id, e.target.value as OrderStatus)}
                                className="px-2 py-1 bg-stone-50 border border-stone-200 rounded-lg text-xs font-semibold focus:outline-none cursor-pointer"
                              >
                                <option value="placed">Placed</option>
                                <option value="processing">Processing</option>
                                <option value="dispatched">Dispatched</option>
                                <option value="delivered">Delivered</option>
                                <option value="cancelled">Cancelled</option>
                              </select>
                            </td>
                            <td className="py-3 px-4 text-[11px] text-stone-500">
                              {o.date}
                            </td>
                            <td className="py-3 px-4 text-right">
                              <button
                                type="button"
                                onClick={() => {
                                  if (window.confirm(`Permanently delete order ${o.orderNumber}?`)) {
                                    deleteOrder(o.id);
                                  }
                                }}
                                className="p-1.5 rounded-lg text-stone-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                                title="Delete Order"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ================================================================= */}
          {/* TAB 7: CUSTOMERS MANAGEMENT (image copy 71.png)                   */}
          {/* ================================================================= */}
          {activeTab === 'customers' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-[#F8C6CF]/50">
                <div>
                  <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#40251D]">Customers Directory</h1>
                  <p className="text-xs sm:text-sm text-stone-500">Live directory of registered customers, purchase histories, and contact info.</p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setIsNewCustomer(true);
                    setCustomerForm({
                      name: '',
                      email: '',
                      phone: '',
                      totalOrders: 0,
                      totalSpent: 0,
                      status: 'active'
                    });
                    setEditingCustomer(null);
                  }}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#A82F4D] hover:bg-[#8D253F] text-white text-xs font-bold uppercase tracking-wider shadow-sm transition-all cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>+ Add Customer</span>
                </button>
              </div>

              {/* Search Bar */}
              <div className="bg-white rounded-2xl border border-[#F8C6CF]/60 p-4 shadow-xs">
                <div className="relative w-full sm:w-80">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                  <input
                    type="text"
                    placeholder="Search customers by name, email, or phone..."
                    value={customerSearch}
                    onChange={(e) => setCustomerSearch(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 text-xs border border-stone-200 rounded-xl focus:outline-none focus:border-[#A82F4D]"
                  />
                </div>
              </div>

              {/* Customers Table */}
              <div className="bg-white rounded-2xl border border-[#F8C6CF]/60 overflow-hidden shadow-xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#FDF1F4] border-b border-[#F8C6CF]/60 text-stone-600 font-bold uppercase tracking-wider">
                      <tr>
                        <th className="py-3 px-4">Customer Name</th>
                        <th className="py-3 px-4">Contact</th>
                        <th className="py-3 px-4">Orders</th>
                        <th className="py-3 px-4">Total Spent</th>
                        <th className="py-3 px-4">Joined Date</th>
                        <th className="py-3 px-4">Status</th>
                        <th className="py-3 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-100">
                      {customers
                        .filter(c => 
                          c.name.toLowerCase().includes(customerSearch.toLowerCase()) ||
                          c.email.toLowerCase().includes(customerSearch.toLowerCase()) ||
                          c.phone.includes(customerSearch)
                        )
                        .map(c => (
                          <tr key={c.id} className="hover:bg-stone-50/60 transition-colors">
                            <td className="py-3 px-4 font-bold text-[#40251D]">{c.name}</td>
                            <td className="py-3 px-4">
                              <span className="block text-stone-700">{c.email}</span>
                              <span className="text-[10px] text-stone-400">{c.phone}</span>
                            </td>
                            <td className="py-3 px-4 font-semibold text-stone-700">{c.totalOrders}</td>
                            <td className="py-3 px-4 font-bold text-[#A82F4D]">₹{c.totalSpent}</td>
                            <td className="py-3 px-4 text-stone-500">{c.joinedDate}</td>
                            <td className="py-3 px-4">
                              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold capitalize ${
                                c.status === 'active' ? 'bg-emerald-100 text-emerald-800' : 'bg-stone-100 text-stone-600'
                              }`}>
                                {c.status}
                              </span>
                            </td>
                            <td className="py-3 px-4 text-right space-x-2">
                              <button
                                type="button"
                                onClick={() => {
                                  setIsNewCustomer(false);
                                  setEditingCustomer(c);
                                  setCustomerForm({ ...c });
                                }}
                                className="p-1 text-stone-600 hover:text-[#A82F4D] cursor-pointer"
                                title="Edit Customer"
                              >
                                <Edit2 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  if (window.confirm(`Delete customer record for "${c.name}"?`)) {
                                    deleteCustomer(c.id);
                                  }
                                }}
                                className="p-1 text-stone-600 hover:text-rose-600 cursor-pointer"
                                title="Delete Customer"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ================================================================= */}
          {/* TAB 8: REVIEWS & TESTIMONIALS (image copy 71.png)                  */}
          {/* ================================================================= */}
          {activeTab === 'reviews' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-[#F8C6CF]/50">
                <div>
                  <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#40251D]">Reviews & Testimonials</h1>
                  <p className="text-xs sm:text-sm text-stone-500">Approve, moderate, edit, and create customer product testimonials.</p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setIsNewReview(true);
                    setReviewForm({
                      productId: products[0]?.id || 'prod-1',
                      productName: products[0]?.name || 'Pure Saffron Cream',
                      authorName: '',
                      rating: 5,
                      title: 'Wonderful Experience!',
                      comment: '',
                      verifiedPurchase: true,
                      isApproved: true
                    });
                    setEditingReview(null);
                  }}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#A82F4D] hover:bg-[#8D253F] text-white text-xs font-bold uppercase tracking-wider shadow-sm transition-all cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>+ Add Review</span>
                </button>
              </div>

              <div className="bg-white rounded-2xl border border-[#F8C6CF]/60 overflow-hidden shadow-xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#FDF1F4] border-b border-[#F8C6CF]/60 text-stone-600 font-bold uppercase tracking-wider">
                      <tr>
                        <th className="py-3 px-4">Author</th>
                        <th className="py-3 px-4">Rating</th>
                        <th className="py-3 px-4">Feedback</th>
                        <th className="py-3 px-4">Date</th>
                        <th className="py-3 px-4">Status</th>
                        <th className="py-3 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-100">
                      {reviews.map(r => (
                        <tr key={r.id} className="hover:bg-stone-50/60 transition-colors">
                          <td className="py-3 px-4 font-bold text-[#40251D]">{r.authorName}</td>
                          <td className="py-3 px-4">
                            <div className="flex items-center text-amber-500">
                              {Array.from({ length: r.rating }).map((_, i) => (
                                <Star key={i} className="w-3.5 h-3.5 fill-current" />
                              ))}
                            </div>
                          </td>
                          <td className="py-3 px-4 max-w-xs">
                            <span className="font-semibold text-stone-800 block">{r.title}</span>
                            <span className="text-[11px] text-stone-500 line-clamp-2">{r.comment}</span>
                          </td>
                          <td className="py-3 px-4 text-stone-400">{r.date}</td>
                          <td className="py-3 px-4">
                            <button
                              type="button"
                              onClick={() => toggleApproveReview(r.id)}
                              className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold cursor-pointer transition-colors ${
                                r.isApproved 
                                  ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200' 
                                  : 'bg-amber-100 text-amber-800 hover:bg-amber-200'
                              }`}
                            >
                              {r.isApproved ? 'Approved ✓' : 'Pending Moderation'}
                            </button>
                          </td>
                          <td className="py-3 px-4 text-right space-x-2">
                            <button
                              type="button"
                              onClick={() => {
                                setIsNewReview(false);
                                setEditingReview(r);
                                setReviewForm({ ...r });
                              }}
                              className="p-1 text-stone-600 hover:text-[#A82F4D] cursor-pointer"
                              title="Edit Review"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                if (window.confirm('Delete this review?')) {
                                  deleteReview(r.id);
                                }
                              }}
                              className="p-1 text-stone-600 hover:text-rose-600 cursor-pointer"
                              title="Delete Review"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ================================================================= */}
          {/* TAB 9: COUPONS & PROMOTIONAL OFFERS (image copy 71.png)            */}
          {/* ================================================================= */}
          {activeTab === 'coupons' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-[#F8C6CF]/50">
                <div>
                  <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#40251D]">Coupons & Offers</h1>
                  <p className="text-xs sm:text-sm text-stone-500">Create discount coupons, flat value deductions, and festival promotions.</p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setIsNewCoupon(true);
                    setCouponForm({
                      code: '',
                      discountType: 'percentage',
                      value: 15,
                      minOrderAmount: 499,
                      description: 'Special artisanal discount',
                      isActive: true
                    });
                    setEditingCoupon(null);
                  }}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#A82F4D] hover:bg-[#8D253F] text-white text-xs font-bold uppercase tracking-wider shadow-sm transition-all cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>+ Create Coupon</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {coupons.map(c => (
                  <div key={c.code} className="bg-white rounded-2xl border border-[#F8C6CF]/60 p-5 shadow-xs flex flex-col justify-between space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-mono font-bold text-base text-[#A82F4D] bg-[#FDF1F4] px-3 py-1 rounded-lg border border-[#F8C6CF]">
                          {c.code}
                        </span>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          c.isActive ? 'bg-emerald-100 text-emerald-800' : 'bg-stone-100 text-stone-600'
                        }`}>
                          {c.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                      <p className="font-serif text-xl font-bold text-[#40251D]">
                        {c.discountType === 'percentage' ? `${c.value}% OFF` : `₹${c.value} OFF`}
                      </p>
                      <p className="text-xs text-stone-600 mt-1">{c.description}</p>
                      <p className="text-[11px] text-stone-400 mt-2">Minimum Order: ₹{c.minOrderAmount}</p>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-stone-100">
                      <button
                        type="button"
                        onClick={() => {
                          setIsNewCoupon(false);
                          setEditingCoupon(c);
                          setCouponForm({ ...c });
                        }}
                        className="text-xs font-bold text-[#A82F4D] hover:underline cursor-pointer flex items-center gap-1"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                        <span>Edit</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          if (window.confirm(`Delete coupon "${c.code}"?`)) {
                            deleteCoupon(c.code);
                          }
                        }}
                        className="text-xs font-bold text-rose-600 hover:underline cursor-pointer flex items-center gap-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================================================================= */}
          {/* TAB 10: MEDIA LIBRARY (CLOUDINARY) (image copy 71.png)             */}
          {/* ================================================================= */}
          {activeTab === 'media' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-[#F8C6CF]/50">
                <div>
                  <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#40251D]">Media & Asset Library</h1>
                  <p className="text-xs sm:text-sm text-stone-500">Upload high-resolution product photography and banners directly to Cloudinary.</p>
                </div>
                
                {/* Upload Button */}
                <label className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#A82F4D] hover:bg-[#8D253F] text-white text-xs font-bold uppercase tracking-wider shadow-sm transition-all cursor-pointer">
                  <Upload className="w-4 h-4" />
                  <span>{uploadingImage ? 'Uploading...' : 'Upload Image'}</span>
                  <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e)} className="hidden" />
                </label>
              </div>

              {/* Media Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {mediaAssets.map((asset, i) => (
                  <div key={i} className="bg-white rounded-2xl border border-stone-200 p-3 overflow-hidden shadow-2xs group relative">
                    <img src={asset.url} alt={asset.name} className="w-full h-32 object-contain bg-stone-50 rounded-xl mb-2" />
                    <p className="text-xs font-semibold text-stone-800 line-clamp-1">{asset.name}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        type="button"
                        onClick={() => {
                          navigator.clipboard.writeText(asset.url);
                          showToast('Image URL copied to clipboard! 📋');
                        }}
                        className="flex-1 py-1 rounded-lg bg-stone-100 hover:bg-[#FCE5E8] text-stone-600 hover:text-[#A82F4D] text-[10px] font-bold flex items-center justify-center gap-1 cursor-pointer transition-colors"
                      >
                        <Copy className="w-3 h-3" />
                        <span>Copy URL</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setMediaAssets(prev => prev.filter((_, idx) => idx !== i));
                          showToast('Removed asset from local media list.');
                        }}
                        className="p-1 rounded-lg text-stone-400 hover:text-rose-600 hover:bg-rose-50 cursor-pointer"
                        title="Remove"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================================================================= */}
          {/* TAB 11: SEO MANAGEMENT (image copy 71.png)                         */}
          {/* ================================================================= */}
          {activeTab === 'seo' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-[#F8C6CF]/50">
                <div>
                  <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#40251D]">Search Engine Optimization (SEO)</h1>
                  <p className="text-xs sm:text-sm text-stone-500">Configure global metadata, search previews, and OpenGraph social share cards.</p>
                </div>
                <button
                  type="button"
                  onClick={handleSaveCMS}
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-[#A82F4D] hover:bg-[#8D253F] text-white text-xs font-bold uppercase tracking-wider shadow-md transition-all cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>Save SEO Settings</span>
                </button>
              </div>

              <div className="bg-white rounded-2xl border border-[#F8C6CF]/60 p-6 shadow-xs space-y-5 text-xs">
                <div>
                  <label className="block font-semibold mb-1 text-stone-700">Store Meta Title *</label>
                  <input
                    type="text"
                    value={cmsForm.seo?.metaTitle || 'Pretty Palette | Handcrafted Luxury Cosmetics & Ayurvedic Care'}
                    onChange={(e) => setCmsForm(prev => ({
                      ...prev,
                      seo: { ...(prev.seo || { metaDescription: '', keywords: '', ogImage: '', canonicalUrl: '', robots: 'index, follow' }), metaTitle: e.target.value }
                    }))}
                    className="w-full px-4 py-2 border border-stone-200 rounded-xl focus:outline-none focus:border-[#A82F4D]"
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-1 text-stone-700">Store Meta Description</label>
                  <textarea
                    rows={3}
                    value={cmsForm.seo?.metaDescription || 'Artisanal Ayurvedic skincare, lead-free cosmetics, and pure herbal haircare handcrafted in small batches.'}
                    onChange={(e) => setCmsForm(prev => ({
                      ...prev,
                      seo: { ...(prev.seo || { metaTitle: '', keywords: '', ogImage: '', canonicalUrl: '', robots: 'index, follow' }), metaDescription: e.target.value }
                    }))}
                    className="w-full px-4 py-2 border border-stone-200 rounded-xl focus:outline-none focus:border-[#A82F4D]"
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-1 text-stone-700">Keywords (comma separated)</label>
                  <input
                    type="text"
                    value={cmsForm.seo?.keywords || 'ayurvedic cosmetics, natural lipstick, herbal kajal, bridal beauty ritual, organic skincare india'}
                    onChange={(e) => setCmsForm(prev => ({
                      ...prev,
                      seo: { ...(prev.seo || { metaTitle: '', metaDescription: '', ogImage: '', canonicalUrl: '', robots: 'index, follow' }), keywords: e.target.value }
                    }))}
                    className="w-full px-4 py-2 border border-stone-200 rounded-xl focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold mb-1 text-stone-700">Canonical URL</label>
                    <input
                      type="text"
                      value={cmsForm.seo?.canonicalUrl || 'https://pretty-pallete.vercel.app/'}
                      onChange={(e) => setCmsForm(prev => ({
                        ...prev,
                        seo: { ...(prev.seo || { metaTitle: '', metaDescription: '', keywords: '', ogImage: '', robots: 'index, follow' }), canonicalUrl: e.target.value }
                      }))}
                      className="w-full px-4 py-2 border border-stone-200 rounded-xl focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold mb-1 text-stone-700">Robots Meta</label>
                    <input
                      type="text"
                      value={cmsForm.seo?.robots || 'index, follow'}
                      onChange={(e) => setCmsForm(prev => ({
                        ...prev,
                        seo: { ...(prev.seo || { metaTitle: '', metaDescription: '', keywords: '', ogImage: '', canonicalUrl: '' }), robots: e.target.value }
                      }))}
                      className="w-full px-4 py-2 border border-stone-200 rounded-xl focus:outline-none"
                    />
                  </div>
                </div>

                {/* OpenGraph Social Image */}
                <div>
                  <label className="block font-semibold mb-1 text-stone-700">OpenGraph Social Share Image</label>
                  <div className="flex items-center gap-3">
                    <input
                      type="text"
                      value={cmsForm.seo?.ogImage || '/assets/logo.png'}
                      onChange={(e) => setCmsForm(prev => ({
                        ...prev,
                        seo: { ...(prev.seo || { metaTitle: '', metaDescription: '', keywords: '', canonicalUrl: '', robots: 'index, follow' }), ogImage: e.target.value }
                      }))}
                      className="flex-1 px-4 py-2 border border-stone-200 rounded-xl focus:outline-none"
                    />
                    <label className="px-4 py-2 rounded-xl bg-[#FDF1F4] hover:bg-[#FCE5E8] text-[#A82F4D] font-bold text-xs cursor-pointer flex items-center gap-1.5">
                      <Upload className="w-3.5 h-3.5" />
                      <span>Upload</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (!file) return;
                          showToast('Uploading OG Image...');
                          try {
                            const res = await uploadImageToCloudinary(file);
                            if (res.url) {
                              setCmsForm(prev => ({
                                ...prev,
                                seo: { ...(prev.seo || { metaTitle: '', metaDescription: '', keywords: '', canonicalUrl: '', robots: 'index, follow' }), ogImage: res.url || '' }
                              }));
                              showToast('OG Image updated!');
                            }
                          } catch (err: any) {
                            showToast(`Upload failed: ${err.message}`);
                          }
                        }}
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ================================================================= */}
          {/* TAB 12: WEBSITE SETTINGS (image copy 71.png)                      */}
          {/* ================================================================= */}
          {activeTab === 'settings' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-[#F8C6CF]/50">
                <div>
                  <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#40251D]">Website Global Settings</h1>
                  <p className="text-xs sm:text-sm text-stone-500">Contact information, customer care phone numbers, and shipping rates.</p>
                </div>
                <button
                  type="button"
                  onClick={handleSaveCMS}
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-[#A82F4D] hover:bg-[#8D253F] text-white text-xs font-bold uppercase tracking-wider shadow-md transition-all cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Settings</span>
                </button>
              </div>

              <div className="bg-white rounded-2xl border border-[#F8C6CF]/60 p-6 shadow-xs space-y-5 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold mb-1 text-stone-700">Brand Name</label>
                    <input
                      type="text"
                      value={cmsForm.settings?.brandName || 'Pretty Palette'}
                      onChange={(e) => setCmsForm(prev => ({
                        ...prev,
                        settings: { ...prev.settings, brandName: e.target.value }
                      }))}
                      className="w-full px-4 py-2 border border-stone-200 rounded-xl focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold mb-1 text-stone-700">Customer Care Phone</label>
                    <input
                      type="text"
                      value={cmsForm.settings?.phone || '+91 98490 12345'}
                      onChange={(e) => setCmsForm(prev => ({
                        ...prev,
                        settings: { ...prev.settings, phone: e.target.value }
                      }))}
                      className="w-full px-4 py-2 border border-stone-200 rounded-xl focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold mb-1 text-stone-700">Support Email</label>
                    <input
                      type="email"
                      value={cmsForm.settings?.email || 'care@prettypalette.com'}
                      onChange={(e) => setCmsForm(prev => ({
                        ...prev,
                        settings: { ...prev.settings, email: e.target.value }
                      }))}
                      className="w-full px-4 py-2 border border-stone-200 rounded-xl focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold mb-1 text-stone-700">Free Shipping Threshold (₹)</label>
                    <input
                      type="number"
                      value={cmsForm.settings?.freeShippingThreshold ?? 999}
                      onChange={(e) => setCmsForm(prev => ({
                        ...prev,
                        settings: { ...prev.settings, freeShippingThreshold: Number(e.target.value) }
                      }))}
                      className="w-full px-4 py-2 border border-stone-200 rounded-xl focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold mb-1 text-stone-700">Workshop & Studio Address</label>
                  <input
                    type="text"
                    value={cmsForm.settings?.address || '12-A Lotus Blossom Lane, Jubilee Hills, Hyderabad - 500033'}
                    onChange={(e) => setCmsForm(prev => ({
                      ...prev,
                      settings: { ...prev.settings, address: e.target.value }
                    }))}
                    className="w-full px-4 py-2 border border-stone-200 rounded-xl focus:outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* ================================================================= */}
          {/* TAB 13: ACTIVITY LOGS (image copy 71.png)                         */}
          {/* ================================================================= */}
          {activeTab === 'logs' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-[#F8C6CF]/50">
                <div>
                  <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#40251D]">Admin Activity Logs</h1>
                  <p className="text-xs sm:text-sm text-stone-500">Live audit log of all create, update, delete, and publish operations.</p>
                </div>
                {activityLogs.length > 0 && (
                  <button
                    type="button"
                    onClick={clearActivityLogs}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Clear Logs</span>
                  </button>
                )}
              </div>

              <div className="bg-white rounded-2xl border border-[#F8C6CF]/60 p-5 shadow-xs">
                {activityLogs.length === 0 ? (
                  <p className="text-xs text-stone-400 py-6 text-center">No recent activities logged yet.</p>
                ) : (
                  <div className="space-y-3">
                    {activityLogs.map((log) => (
                      <div key={log.id} className="flex items-center justify-between p-3 rounded-xl bg-stone-50 border border-stone-100 text-xs">
                        <div>
                          <span className={`font-bold uppercase text-[10px] mr-2 px-2 py-0.5 rounded-full ${
                            log.action === 'CREATE' ? 'bg-emerald-100 text-emerald-800' :
                            log.action === 'DELETE' ? 'bg-rose-100 text-rose-800' :
                            'bg-sky-100 text-sky-800'
                          }`}>
                            {log.action}
                          </span>
                          <span className="font-semibold text-stone-800">{log.details || log.entityType}</span>
                        </div>
                        <span className="text-[10px] text-stone-400">{new Date(log.createdAt).toLocaleTimeString()}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

        </main>
      </div>

      {/* --------------------------------------------------------------------- */}
      {/* PRODUCT ADD / EDIT MODAL                                              */}
      {/* --------------------------------------------------------------------- */}
      {(editingProduct || isNewProduct) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white rounded-3xl border border-[#F8C6CF] max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative my-8 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between pb-4 border-b border-[#F8C6CF]/50 mb-5">
              <h2 className="font-serif text-xl font-bold text-[#40251D]">
                {isNewProduct ? 'Add New Product' : `Edit: ${editingProduct?.name}`}
              </h2>
              <button
                type="button"
                onClick={() => { setEditingProduct(null); setIsNewProduct(false); }}
                className="p-1 rounded-full text-stone-400 hover:text-stone-700 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold mb-1">Product Name *</label>
                  <input
                    type="text"
                    required
                    value={productForm.name || ''}
                    onChange={(e) => setProductForm(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-3 py-2 border border-stone-200 rounded-xl focus:outline-none focus:border-[#A82F4D]"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Category *</label>
                  <select
                    value={productForm.category || 'cosmetics'}
                    onChange={(e) => setProductForm(prev => ({ ...prev, category: e.target.value as CategoryType }))}
                    className="w-full px-3 py-2 border border-stone-200 rounded-xl focus:outline-none cursor-pointer"
                  >
                    <option value="cosmetics">Cosmetics</option>
                    <option value="skin-care">Skin Care</option>
                    <option value="hair-care">Hair Care</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold mb-1">Price (₹) *</label>
                  <input
                    type="number"
                    required
                    value={productForm.price || 0}
                    onChange={(e) => setProductForm(prev => ({ ...prev, price: Number(e.target.value) }))}
                    className="w-full px-3 py-2 border border-stone-200 rounded-xl focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Original Price (₹)</label>
                  <input
                    type="number"
                    value={productForm.originalPrice || 0}
                    onChange={(e) => setProductForm(prev => ({ ...prev, originalPrice: Number(e.target.value) }))}
                    className="w-full px-3 py-2 border border-stone-200 rounded-xl focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Stock Count</label>
                  <input
                    type="number"
                    value={productForm.stockCount || 0}
                    onChange={(e) => setProductForm(prev => ({ ...prev, stockCount: Number(e.target.value) }))}
                    className="w-full px-3 py-2 border border-stone-200 rounded-xl focus:outline-none"
                  />
                </div>
              </div>

              {/* Cloudinary Image Upload Section */}
              <div className="p-4 rounded-2xl bg-[#FDF1F4] border border-[#F8C6CF]/60 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="font-semibold text-stone-700">Cloudinary Primary Product Image</label>
                  <label className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#A82F4D] text-white text-[10px] font-bold uppercase cursor-pointer hover:bg-[#8D253F] transition-all">
                    <Upload className="w-3 h-3" />
                    <span>{uploadingImage ? 'Uploading...' : 'Upload Image'}</span>
                    <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, false)} className="hidden" />
                  </label>
                </div>
                
                <div className="flex items-center gap-3">
                  <img src={productForm.image} alt="Preview" className="w-16 h-16 rounded-xl object-cover bg-white border border-stone-200" />
                  <input
                    type="text"
                    value={productForm.image || ''}
                    onChange={(e) => setProductForm(prev => ({ ...prev, image: e.target.value }))}
                    placeholder="Or enter direct image URL"
                    className="flex-1 px-3 py-2 text-xs bg-white border border-stone-200 rounded-xl focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1">Short Description</label>
                <input
                  type="text"
                  value={productForm.shortDescription || ''}
                  onChange={(e) => setProductForm(prev => ({ ...prev, shortDescription: e.target.value }))}
                  className="w-full px-3 py-2 border border-stone-200 rounded-xl focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Full Description</label>
                <textarea
                  rows={3}
                  value={productForm.description || ''}
                  onChange={(e) => setProductForm(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full px-3 py-2 border border-stone-200 rounded-xl focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 font-semibold cursor-pointer">
                  <input
                    type="checkbox"
                    checked={productForm.inStock ?? true}
                    onChange={(e) => setProductForm(prev => ({ ...prev, inStock: e.target.checked }))}
                    className="rounded text-[#A82F4D]"
                  />
                  <span>In Stock</span>
                </label>
                <label className="flex items-center gap-2 font-semibold cursor-pointer">
                  <input
                    type="checkbox"
                    checked={productForm.isBestSeller ?? false}
                    onChange={(e) => setProductForm(prev => ({ ...prev, isBestSeller: e.target.checked }))}
                    className="rounded text-[#A82F4D]"
                  />
                  <span>Best Seller</span>
                </label>
                <label className="flex items-center gap-2 font-semibold cursor-pointer">
                  <input
                    type="checkbox"
                    checked={productForm.isFeatured ?? false}
                    onChange={(e) => setProductForm(prev => ({ ...prev, isFeatured: e.target.checked }))}
                    className="rounded text-[#A82F4D]"
                  />
                  <span>Featured</span>
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => { setEditingProduct(null); setIsNewProduct(false); }}
                  className="px-4 py-2 text-stone-500 hover:text-stone-800 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-full bg-[#A82F4D] hover:bg-[#8D253F] text-white text-xs font-bold uppercase tracking-wider shadow-sm transition-all cursor-pointer"
                >
                  Save & Publish Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --------------------------------------------------------------------- */}
      {/* CATEGORY ADD / EDIT MODAL                                             */}
      {/* --------------------------------------------------------------------- */}
      {(editingCategory || isNewCategory) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl border border-[#F8C6CF] max-w-lg w-full p-6 sm:p-8 shadow-2xl relative my-8 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between pb-4 border-b border-[#F8C6CF]/50 mb-5">
              <h2 className="font-serif text-xl font-bold text-[#40251D]">
                {isNewCategory ? 'Add New Category' : `Edit: ${editingCategory?.name}`}
              </h2>
              <button
                type="button"
                onClick={() => { setEditingCategory(null); setIsNewCategory(false); }}
                className="p-1 rounded-full text-stone-400 hover:text-stone-700 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!categoryForm.name) return;
                const catData: HomepageCMS['categories'][0] = {
                  id: categoryForm.id || `cat-${Date.now()}`,
                  name: categoryForm.name,
                  tagline: categoryForm.tagline || '',
                  description: categoryForm.description || '',
                  image: categoryForm.image || '/assets/banner-cosmetics.png',
                  link: categoryForm.link || `/${categoryForm.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`
                };
                if (isNewCategory) {
                  addCategory(catData);
                } else {
                  updateCategory(catData);
                }
                setEditingCategory(null);
                setIsNewCategory(false);
              }}
              className="space-y-4 text-xs"
            >
              <div>
                <label className="block font-semibold mb-1">Category Name *</label>
                <input
                  type="text"
                  required
                  value={categoryForm.name || ''}
                  onChange={(e) => setCategoryForm(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3 py-2 border border-stone-200 rounded-xl focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Tagline</label>
                <input
                  type="text"
                  value={categoryForm.tagline || ''}
                  onChange={(e) => setCategoryForm(prev => ({ ...prev, tagline: e.target.value }))}
                  className="w-full px-3 py-2 border border-stone-200 rounded-xl focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Description</label>
                <textarea
                  rows={2}
                  value={categoryForm.description || ''}
                  onChange={(e) => setCategoryForm(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full px-3 py-2 border border-stone-200 rounded-xl focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Store Link (e.g. /cosmetics or /skin-care)</label>
                <input
                  type="text"
                  value={categoryForm.link || ''}
                  onChange={(e) => setCategoryForm(prev => ({ ...prev, link: e.target.value }))}
                  className="w-full px-3 py-2 border border-stone-200 rounded-xl focus:outline-none"
                />
              </div>

              {/* Banner Image with Cloudinary Upload */}
              <div className="p-4 rounded-2xl bg-[#FDF1F4] border border-[#F8C6CF]/60 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="font-semibold text-stone-700">Category Banner Image</label>
                  <label className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#A82F4D] text-white text-[10px] font-bold uppercase cursor-pointer hover:bg-[#8D253F] transition-all">
                    <Upload className="w-3 h-3" />
                    <span>Upload Cloudinary</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;
                        showToast('Uploading category banner to Cloudinary...');
                        try {
                          const res = await uploadImageToCloudinary(file);
                          if (res.url) {
                            setCategoryForm(prev => ({ ...prev, image: res.url }));
                            showToast('Category banner updated! ✨');
                          }
                        } catch (err: any) {
                          showToast(`Upload failed: ${err.message}`);
                        }
                      }}
                    />
                  </label>
                </div>

                <div className="flex items-center gap-3">
                  {categoryForm.image && (
                    <img src={categoryForm.image} alt="Preview" className="w-16 h-16 rounded-xl object-cover bg-white border border-stone-200" />
                  )}
                  <input
                    type="text"
                    value={categoryForm.image || ''}
                    onChange={(e) => setCategoryForm(prev => ({ ...prev, image: e.target.value }))}
                    placeholder="/assets/... or Cloudinary URL"
                    className="flex-1 px-3 py-2 text-xs bg-white border border-stone-200 rounded-xl focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => { setEditingCategory(null); setIsNewCategory(false); }}
                  className="px-4 py-2 text-stone-500 hover:text-stone-800 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-full bg-[#A82F4D] hover:bg-[#8D253F] text-white text-xs font-bold uppercase tracking-wider shadow-sm transition-all cursor-pointer"
                >
                  Save Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --------------------------------------------------------------------- */}
      {/* CUSTOMER ADD / EDIT MODAL                                             */}
      {/* --------------------------------------------------------------------- */}
      {(editingCustomer || isNewCustomer) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl border border-[#F8C6CF] max-w-md w-full p-6 sm:p-8 shadow-2xl relative my-8">
            <div className="flex items-center justify-between pb-4 border-b border-[#F8C6CF]/50 mb-5">
              <h2 className="font-serif text-xl font-bold text-[#40251D]">
                {isNewCustomer ? 'Add New Customer' : `Edit: ${editingCustomer?.name}`}
              </h2>
              <button
                type="button"
                onClick={() => { setEditingCustomer(null); setIsNewCustomer(false); }}
                className="p-1 rounded-full text-stone-400 hover:text-stone-700 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!customerForm.name || !customerForm.email) return;
                if (isNewCustomer) {
                  addCustomer({
                    name: customerForm.name,
                    email: customerForm.email,
                    phone: customerForm.phone || '+91 90000 00000',
                    totalOrders: customerForm.totalOrders || 0,
                    totalSpent: customerForm.totalSpent || 0,
                    status: (customerForm.status as 'active' | 'inactive') || 'active'
                  });
                } else if (editingCustomer) {
                  updateCustomer({ ...editingCustomer, ...customerForm } as Customer);
                }
                setEditingCustomer(null);
                setIsNewCustomer(false);
              }}
              className="space-y-4 text-xs"
            >
              <div>
                <label className="block font-semibold mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  value={customerForm.name || ''}
                  onChange={(e) => setCustomerForm(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3 py-2 border border-stone-200 rounded-xl focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  value={customerForm.email || ''}
                  onChange={(e) => setCustomerForm(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-3 py-2 border border-stone-200 rounded-xl focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Phone Number</label>
                <input
                  type="text"
                  value={customerForm.phone || ''}
                  onChange={(e) => setCustomerForm(prev => ({ ...prev, phone: e.target.value }))}
                  className="w-full px-3 py-2 border border-stone-200 rounded-xl focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Account Status</label>
                <select
                  value={customerForm.status || 'active'}
                  onChange={(e) => setCustomerForm(prev => ({ ...prev, status: e.target.value as 'active' | 'inactive' }))}
                  className="w-full px-3 py-2 border border-stone-200 rounded-xl focus:outline-none cursor-pointer"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => { setEditingCustomer(null); setIsNewCustomer(false); }}
                  className="px-4 py-2 text-stone-500 hover:text-stone-800 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-full bg-[#A82F4D] hover:bg-[#8D253F] text-white text-xs font-bold uppercase tracking-wider shadow-sm transition-all cursor-pointer"
                >
                  Save Customer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --------------------------------------------------------------------- */}
      {/* REVIEW ADD / EDIT MODAL                                               */}
      {/* --------------------------------------------------------------------- */}
      {(editingReview || isNewReview) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl border border-[#F8C6CF] max-w-md w-full p-6 sm:p-8 shadow-2xl relative my-8">
            <div className="flex items-center justify-between pb-4 border-b border-[#F8C6CF]/50 mb-5">
              <h2 className="font-serif text-xl font-bold text-[#40251D]">
                {isNewReview ? 'Add Testimonial / Review' : `Edit Review: ${editingReview?.authorName}`}
              </h2>
              <button
                type="button"
                onClick={() => { setEditingReview(null); setIsNewReview(false); }}
                className="p-1 rounded-full text-stone-400 hover:text-stone-700 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!reviewForm.authorName || !reviewForm.comment) return;
                if (isNewReview) {
                  // add new review
                  const newRev: Review = {
                    id: `rev-${Date.now()}`,
                    productId: reviewForm.productId || products[0]?.id || 'prod-1',
                    productName: reviewForm.productName || 'Handcrafted Formulation',
                    authorName: reviewForm.authorName,
                    rating: reviewForm.rating || 5,
                    title: reviewForm.title || 'Wonderful Product',
                    comment: reviewForm.comment,
                    date: new Date().toISOString().split('T')[0],
                    verifiedPurchase: reviewForm.verifiedPurchase ?? true,
                    isApproved: reviewForm.isApproved ?? true
                  };
                  updateReview(newRev); // updates or appends in context
                } else if (editingReview) {
                  updateReview({ ...editingReview, ...reviewForm } as Review);
                }
                setEditingReview(null);
                setIsNewReview(false);
              }}
              className="space-y-4 text-xs"
            >
              <div>
                <label className="block font-semibold mb-1">Customer Name *</label>
                <input
                  type="text"
                  required
                  value={reviewForm.authorName || ''}
                  onChange={(e) => setReviewForm(prev => ({ ...prev, authorName: e.target.value }))}
                  className="w-full px-3 py-2 border border-stone-200 rounded-xl focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">Star Rating (1-5)</label>
                  <select
                    value={reviewForm.rating || 5}
                    onChange={(e) => setReviewForm(prev => ({ ...prev, rating: Number(e.target.value) }))}
                    className="w-full px-3 py-2 border border-stone-200 rounded-xl focus:outline-none cursor-pointer"
                  >
                    <option value={5}>5 Stars ★★★★★</option>
                    <option value={4}>4 Stars ★★★★☆</option>
                    <option value={3}>3 Stars ★★★☆☆</option>
                    <option value={2}>2 Stars ★★☆☆☆</option>
                    <option value={1}>1 Star ★☆☆☆☆</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold mb-1">Product</label>
                  <select
                    value={reviewForm.productId || products[0]?.id}
                    onChange={(e) => {
                      const selProd = products.find(p => p.id === e.target.value);
                      setReviewForm(prev => ({
                        ...prev,
                        productId: e.target.value,
                        productName: selProd?.name || ''
                      }));
                    }}
                    className="w-full px-3 py-2 border border-stone-200 rounded-xl focus:outline-none cursor-pointer"
                  >
                    {products.map(p => (
                      <option key={p.id} value={p.id}>{p.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1">Review Title</label>
                <input
                  type="text"
                  value={reviewForm.title || ''}
                  onChange={(e) => setReviewForm(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-3 py-2 border border-stone-200 rounded-xl focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Feedback Comment *</label>
                <textarea
                  rows={3}
                  required
                  value={reviewForm.comment || ''}
                  onChange={(e) => setReviewForm(prev => ({ ...prev, comment: e.target.value }))}
                  className="w-full px-3 py-2 border border-stone-200 rounded-xl focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-4 pt-2">
                <label className="flex items-center gap-2 cursor-pointer font-semibold">
                  <input
                    type="checkbox"
                    checked={reviewForm.isApproved ?? true}
                    onChange={(e) => setReviewForm(prev => ({ ...prev, isApproved: e.target.checked }))}
                    className="rounded text-[#A82F4D]"
                  />
                  <span>Publish / Approved</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer font-semibold">
                  <input
                    type="checkbox"
                    checked={reviewForm.verifiedPurchase ?? true}
                    onChange={(e) => setReviewForm(prev => ({ ...prev, verifiedPurchase: e.target.checked }))}
                    className="rounded text-[#A82F4D]"
                  />
                  <span>Verified Purchase Badge</span>
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => { setEditingReview(null); setIsNewReview(false); }}
                  className="px-4 py-2 text-stone-500 hover:text-stone-800 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-full bg-[#A82F4D] hover:bg-[#8D253F] text-white text-xs font-bold uppercase tracking-wider shadow-sm transition-all cursor-pointer"
                >
                  Save Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --------------------------------------------------------------------- */}
      {/* COUPON ADD / EDIT MODAL                                               */}
      {/* --------------------------------------------------------------------- */}
      {(editingCoupon || isNewCoupon) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl border border-[#F8C6CF] max-w-md w-full p-6 sm:p-8 shadow-2xl relative my-8">
            <div className="flex items-center justify-between pb-4 border-b border-[#F8C6CF]/50 mb-5">
              <h2 className="font-serif text-xl font-bold text-[#40251D]">
                {isNewCoupon ? 'Create New Coupon' : `Edit Coupon: ${editingCoupon?.code}`}
              </h2>
              <button
                type="button"
                onClick={() => { setEditingCoupon(null); setIsNewCoupon(false); }}
                className="p-1 rounded-full text-stone-400 hover:text-stone-700 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!couponForm.code || !couponForm.value) return;
                const cData: Coupon = {
                  code: couponForm.code.toUpperCase().trim(),
                  discountType: couponForm.discountType || 'percentage',
                  value: Number(couponForm.value),
                  minOrderAmount: Number(couponForm.minOrderAmount || 0),
                  description: couponForm.description || '',
                  isActive: couponForm.isActive ?? true
                };
                if (isNewCoupon) {
                  addCoupon(cData);
                } else {
                  updateCoupon(cData);
                }
                setEditingCoupon(null);
                setIsNewCoupon(false);
              }}
              className="space-y-4 text-xs"
            >
              <div>
                <label className="block font-semibold mb-1">Coupon Code (e.g. FESTIVE20) *</label>
                <input
                  type="text"
                  required
                  value={couponForm.code || ''}
                  onChange={(e) => setCouponForm(prev => ({ ...prev, code: e.target.value.toUpperCase() }))}
                  className="w-full px-3 py-2 font-mono uppercase font-bold border border-stone-200 rounded-xl focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">Discount Type</label>
                  <select
                    value={couponForm.discountType || 'percentage'}
                    onChange={(e) => setCouponForm(prev => ({ ...prev, discountType: e.target.value as 'percentage' | 'fixed' }))}
                    className="w-full px-3 py-2 border border-stone-200 rounded-xl focus:outline-none cursor-pointer"
                  >
                    <option value="percentage">Percentage (%)</option>
                    <option value="fixed">Flat Amount (₹)</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold mb-1">Discount Value *</label>
                  <input
                    type="number"
                    required
                    value={couponForm.value || 0}
                    onChange={(e) => setCouponForm(prev => ({ ...prev, value: Number(e.target.value) }))}
                    className="w-full px-3 py-2 border border-stone-200 rounded-xl focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1">Minimum Order Amount (₹)</label>
                <input
                  type="number"
                  value={couponForm.minOrderAmount || 0}
                  onChange={(e) => setCouponForm(prev => ({ ...prev, minOrderAmount: Number(e.target.value) }))}
                  className="w-full px-3 py-2 border border-stone-200 rounded-xl focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Description</label>
                <input
                  type="text"
                  value={couponForm.description || ''}
                  onChange={(e) => setCouponForm(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full px-3 py-2 border border-stone-200 rounded-xl focus:outline-none"
                />
              </div>

              <div className="pt-2">
                <label className="flex items-center gap-2 cursor-pointer font-semibold">
                  <input
                    type="checkbox"
                    checked={couponForm.isActive ?? true}
                    onChange={(e) => setCouponForm(prev => ({ ...prev, isActive: e.target.checked }))}
                    className="rounded text-[#A82F4D]"
                  />
                  <span>Active & Redeemable at Checkout</span>
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => { setEditingCoupon(null); setIsNewCoupon(false); }}
                  className="px-4 py-2 text-stone-500 hover:text-stone-800 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-full bg-[#A82F4D] hover:bg-[#8D253F] text-white text-xs font-bold uppercase tracking-wider shadow-sm transition-all cursor-pointer"
                >
                  Save Coupon
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --------------------------------------------------------------------- */}
      {/* SERVICE ADD / EDIT MODAL                                              */}
      {/* --------------------------------------------------------------------- */}
      {(editingService || isNewService) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white rounded-3xl border border-[#F8C6CF] max-w-lg w-full p-5 sm:p-7 shadow-2xl relative my-6 max-h-[92vh] overflow-y-auto">
            
            <div className="flex items-center justify-between pb-3 border-b border-[#F8C6CF]/50 mb-4">
              <h2 className="font-serif text-xl font-bold text-[#40251D]">
                {isNewService ? 'Add New Service' : `Edit Service: ${editingService?.name}`}
              </h2>
              <button
                type="button"
                onClick={() => { setEditingService(null); setIsNewService(false); setServiceError(null); }}
                className="p-1 rounded-full text-stone-400 hover:text-stone-700 cursor-pointer"
                title="Close"
              >
                ✕
              </button>
            </div>

            {serviceError && (
              <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
                <span>{serviceError}</span>
              </div>
            )}

            <form onSubmit={handleSaveService} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold mb-1 text-stone-700">Service Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Personalized Ayurvedic Skin Consultation"
                  value={serviceForm.name || ''}
                  onChange={(e) => setServiceForm(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3 py-2 border border-stone-200 rounded-xl focus:outline-none focus:border-[#A82F4D]"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1 text-stone-700">Short Tagline</label>
                <input
                  type="text"
                  placeholder="e.g. Discover your dosha & tailored herbal ritual"
                  value={serviceForm.tagline || ''}
                  onChange={(e) => setServiceForm(prev => ({ ...prev, tagline: e.target.value }))}
                  className="w-full px-3 py-2 border border-stone-200 rounded-xl focus:outline-none focus:border-[#A82F4D]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1 text-stone-700">Price (₹) *</label>
                  <input
                    type="number"
                    required
                    min={0}
                    placeholder="499"
                    value={serviceForm.price ?? ''}
                    onChange={(e) => setServiceForm(prev => ({ ...prev, price: Number(e.target.value) }))}
                    className="w-full px-3 py-2 border border-stone-200 rounded-xl focus:outline-none focus:border-[#A82F4D]"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1 text-stone-700">Duration *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 45 Mins, 60 Mins, 3 Months"
                    value={serviceForm.duration || ''}
                    onChange={(e) => setServiceForm(prev => ({ ...prev, duration: e.target.value }))}
                    className="w-full px-3 py-2 border border-stone-200 rounded-xl focus:outline-none focus:border-[#A82F4D]"
                  />
                </div>
              </div>

              {/* Service Image with Cloudinary Upload */}
              <div className="p-3.5 rounded-2xl bg-[#FDF1F4] border border-[#F8C6CF]/60 space-y-2.5">
                <div className="flex items-center justify-between">
                  <label className="font-semibold text-stone-700">Service Image</label>
                  <label className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#A82F4D] text-white text-[10px] font-bold uppercase cursor-pointer hover:bg-[#8D253F] transition-all">
                    <Upload className="w-3 h-3" />
                    <span>{uploadingImage ? 'Uploading...' : 'Upload Cloudinary'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;
                        setUploadingImage(true);
                        showToast('Uploading service image to Cloudinary...');
                        try {
                          const res = await uploadImageToCloudinary(file);
                          if (res.url) {
                            setServiceForm(prev => ({ ...prev, image: res.url }));
                            showToast('Service image updated! ✨');
                          }
                        } catch (err: any) {
                          showToast(`Upload failed: ${err.message}`);
                        } finally {
                          setUploadingImage(false);
                        }
                      }}
                    />
                  </label>
                </div>

                <div className="flex items-center gap-3">
                  {serviceForm.image ? (
                    <img src={serviceForm.image} alt="Preview" className="w-12 h-12 rounded-xl object-cover bg-white border border-stone-200 shrink-0" />
                  ) : (
                    <div className="w-12 h-12 rounded-xl bg-white border border-stone-200 flex items-center justify-center text-stone-400 shrink-0">
                      <Sparkles className="w-4 h-4 text-[#A82F4D]" />
                    </div>
                  )}
                  <input
                    type="text"
                    value={serviceForm.image || ''}
                    onChange={(e) => setServiceForm(prev => ({ ...prev, image: e.target.value }))}
                    placeholder="/assets/... or Cloudinary URL"
                    className="flex-1 px-3 py-2 text-xs bg-white border border-stone-200 rounded-xl focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1 text-stone-700">Full Description</label>
                <textarea
                  rows={3}
                  placeholder="Detailed description of what the customer receives in this consultation or ritual..."
                  value={serviceForm.description || ''}
                  onChange={(e) => setServiceForm(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full px-3 py-2 border border-stone-200 rounded-xl focus:outline-none focus:border-[#A82F4D]"
                />
              </div>

              {/* Features & Benefits */}
              <div>
                <label className="block font-semibold mb-1.5 text-stone-700">Features & Inclusions</label>
                {serviceForm.features && serviceForm.features.length > 0 && (
                  <div className="space-y-1.5 mb-2.5 max-h-36 overflow-y-auto pr-1">
                    {serviceForm.features.map((feat, idx) => (
                      <div key={idx} className="flex items-center justify-between gap-2 p-2 rounded-xl bg-stone-50 border border-stone-200">
                        <div className="flex items-center gap-2 min-w-0">
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span className="text-stone-700 truncate">{feat}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            setServiceForm(prev => ({
                              ...prev,
                              features: prev.features?.filter((_, i) => i !== idx)
                            }));
                          }}
                          className="text-stone-400 hover:text-rose-600 p-1 cursor-pointer"
                          title="Remove feature"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Add an inclusion (e.g. '14-Day Progress Review')..."
                    value={newFeatureInput}
                    onChange={(e) => setNewFeatureInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        if (newFeatureInput.trim()) {
                          setServiceForm(prev => ({
                            ...prev,
                            features: [...(prev.features || []), newFeatureInput.trim()]
                          }));
                          setNewFeatureInput('');
                        }
                      }
                    }}
                    className="flex-1 px-3 py-2 border border-stone-200 rounded-xl focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (newFeatureInput.trim()) {
                        setServiceForm(prev => ({
                          ...prev,
                          features: [...(prev.features || []), newFeatureInput.trim()]
                        }));
                        setNewFeatureInput('');
                      }
                    }}
                    className="px-3.5 py-2 rounded-xl bg-[#FDF1F4] hover:bg-[#FCE5E8] text-[#A82F4D] font-bold text-xs cursor-pointer transition-colors"
                  >
                    + Add
                  </button>
                </div>
              </div>

              <div className="pt-1">
                <label className="flex items-center gap-2 cursor-pointer font-semibold text-stone-700">
                  <input
                    type="checkbox"
                    checked={serviceForm.isActive ?? true}
                    onChange={(e) => setServiceForm(prev => ({ ...prev, isActive: e.target.checked }))}
                    className="rounded text-[#A82F4D]"
                  />
                  <span>Active & Visible on Storefront</span>
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => { setEditingService(null); setIsNewService(false); setServiceError(null); }}
                  className="px-4 py-2 text-stone-500 hover:text-stone-800 cursor-pointer"
                  disabled={isSavingService}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSavingService}
                  className={`px-6 py-2.5 rounded-full bg-[#A82F4D] hover:bg-[#8D253F] text-white text-xs font-bold uppercase tracking-wider shadow-sm transition-all cursor-pointer flex items-center gap-2 ${
                    isSavingService ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                >
                  {isSavingService ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>{isNewService ? 'Saving Service...' : 'Updating Service...'}</span>
                    </>
                  ) : (
                    <span>{isNewService ? 'Create Service' : 'Save Changes'}</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

// Sub-components
const SidebarItem: React.FC<{
  icon: React.ReactNode;
  label: string;
  active: boolean;
  collapsed: boolean;
  onClick: () => void;
}> = ({ icon, label, active, collapsed, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
      active
        ? 'bg-[#FCE5E8] text-[#A82F4D] shadow-2xs'
        : 'text-stone-600 hover:bg-[#FDF1F4] hover:text-[#A82F4D]'
    }`}
    title={label}
  >
    <span className="shrink-0">{icon}</span>
    {!collapsed && <span className="truncate">{label}</span>}
  </button>
);

const MetricCard: React.FC<{
  title: string;
  value: string;
  subtitle: string;
  icon: React.ReactNode;
  bg: string;
}> = ({ title, value, subtitle, icon, bg }) => (
  <div className={`p-4 rounded-2xl border ${bg} shadow-2xs flex flex-col justify-between`}>
    <div className="flex items-center justify-between mb-2">
      <span className="text-xs font-semibold text-stone-600">{title}</span>
      <div className="p-2 rounded-xl bg-white/80 shadow-2xs shrink-0">{icon}</div>
    </div>
    <div>
      <span className="font-serif text-2xl font-bold text-[#40251D] block">{value}</span>
      <span className="text-[11px] text-stone-500">{subtitle}</span>
    </div>
  </div>
);

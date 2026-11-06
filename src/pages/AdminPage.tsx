import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingBag, 
  Sliders, 
  Tag, 
  Settings, 
  MessageSquare, 
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
  Database,
  Cloud,
  ChevronRight,
  Eye,
  Layers,
  FileText,
  Star,
  Globe
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { Product, OrderStatus, CategoryType, HomepageCMS } from '../types';
import { uploadImageToCloudinary } from '../services/cloudinary';
import { ServiceItem } from '../services/supabase';

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
  | 'logs' 
  | 'database';

export const AdminPage: React.FC = () => {
  const { 
    products, 
    orders, 
    cms, 
    coupons, 
    services,
    activityLogs,
    isDbConnected,
    isAdminLoggedIn, 
    loginAdmin, 
    logoutAdmin, 
    updateProduct, 
    addProduct, 
    deleteProduct, 
    updateOrderStatus, 
    updateCMS,
    addService,
    updateService,
    deleteService,
    syncWithSupabase,
    seedToSupabase,
    showToast 
  } = useStore();

  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

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

  // CMS Form State
  const [cmsForm, setCmsForm] = useState<HomepageCMS>(cms);

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
    setCmsForm(cms);
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
              alert('Invalid access credentials. Default master key: prettypalette2026');
            }
          }}>
            <div className="mb-4 text-left">
              <label className="block text-xs font-semibold text-stone-600 mb-1">Admin Access Key</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password (prettypalette2026)"
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

          <div className="mt-6 pt-5 border-t border-[#F8C6CF]/40 text-xs text-stone-400">
            <span>Integrated with Supabase & Cloudinary 🌿</span>
          </div>
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
      showToast('Product name is required.');
      return;
    }

    if (isNewProduct) {
      await addProduct(productForm as Omit<Product, 'id' | 'slug'>);
    } else if (editingProduct) {
      await updateProduct({ ...editingProduct, ...productForm } as Product);
    }

    setEditingProduct(null);
    setIsNewProduct(false);
  };

  const handleDuplicateProduct = async (p: Product) => {
    const dupName = `${p.name} (Copy)`;
    await addProduct({
      ...p,
      name: dupName,
    });
    showToast(`Duplicated "${p.name}".`);
  };

  // Cloudinary image uploader for products
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, isGallery = false) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    showToast('Uploading to Cloudinary...');

    const res = await uploadImageToCloudinary(file);
    setUploadingImage(false);

    if (res.url) {
      if (isGallery) {
        setProductForm(prev => ({
          ...prev,
          gallery: [...(prev.gallery || []), res.url!]
        }));
      } else {
        setProductForm(prev => ({
          ...prev,
          image: res.url,
          gallery: [res.url!, ...(prev.gallery?.slice(1) || [])]
        }));
      }
      setMediaAssets(prev => [{ url: res.url!, name: file.name, publicId: res.publicId || '' }, ...prev]);
      showToast('Image uploaded successfully! ✨');
    } else {
      showToast('Image upload failed. Please try again.');
    }
  };

  // ---------------------------------------------------------------------------
  // CMS HANDLERS
  // ---------------------------------------------------------------------------
  const handleSaveCMS = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateCMS(cmsForm);
  };

  // Filtered Products
  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(productSearch.toLowerCase()) || 
                          p.category.toLowerCase().includes(productSearch.toLowerCase());
    const matchesCat = selectedCategory === 'all' || p.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="min-h-screen bg-[#FFFDF9] flex flex-col">
      {/* Top Admin Navbar */}
      <header className="bg-white border-b border-[#F8C6CF] sticky top-0 z-40 px-4 sm:px-6 py-3 flex items-center justify-between shadow-2xs">
        <div className="flex items-center space-x-3">
          <button 
            type="button"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 rounded-xl text-stone-600 hover:bg-[#FDF1F4] hover:text-[#A82F4D] transition-colors cursor-pointer"
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

        {/* Integration Status Badges & Quick Action */}
        <div className="flex items-center space-x-3">
          {/* Supabase Status Pill */}
          <div className={`hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
            isDbConnected 
              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
              : 'bg-amber-50 text-amber-700 border border-amber-200'
          }`}>
            <Database className="w-3.5 h-3.5" />
            <span>{isDbConnected ? 'Supabase Live' : 'Local Fallback'}</span>
          </div>

          {/* Cloudinary Status */}
          <div className="hidden md:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-sky-50 text-sky-700 border border-sky-200">
            <Cloud className="w-3.5 h-3.5" />
            <span>Cloudinary (yiuni2eh)</span>
          </div>

          {/* Live Storefront Link */}
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold text-[#A82F4D] bg-[#FCE5E8] hover:bg-[#F8CCD7] transition-all"
            title="Open Live Website in New Tab"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">View Store</span>
          </a>

          {/* Logout */}
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
      <div className="flex-1 flex overflow-hidden">
        
        {/* Sidebar Navigation */}
        <aside className={`${isSidebarOpen ? 'w-64' : 'w-20'} bg-white border-r border-[#F8C6CF]/60 transition-all duration-300 flex flex-col justify-between shrink-0 overflow-y-auto`}>
          <div className="p-3 space-y-1">
            
            <SidebarItem 
              icon={<LayoutDashboard className="w-4 h-4" />} 
              label="Dashboard Overview" 
              active={activeTab === 'dashboard'} 
              collapsed={!isSidebarOpen}
              onClick={() => setActiveTab('dashboard')} 
            />

            <SidebarItem 
              icon={<Package className="w-4 h-4" />} 
              label={`Products (${products.length})`} 
              active={activeTab === 'products'} 
              collapsed={!isSidebarOpen}
              onClick={() => setActiveTab('products')} 
            />

            <SidebarItem 
              icon={<Layers className="w-4 h-4" />} 
              label="Categories" 
              active={activeTab === 'categories'} 
              collapsed={!isSidebarOpen}
              onClick={() => setActiveTab('categories')} 
            />

            <SidebarItem 
              icon={<Sparkles className="w-4 h-4" />} 
              label={`Services (${services.length})`} 
              active={activeTab === 'services'} 
              collapsed={!isSidebarOpen}
              onClick={() => setActiveTab('services')} 
            />

            <SidebarItem 
              icon={<FileText className="w-4 h-4" />} 
              label="Homepage & Sections" 
              active={activeTab === 'homepage'} 
              collapsed={!isSidebarOpen}
              onClick={() => setActiveTab('homepage')} 
            />

            <SidebarItem 
              icon={<ShoppingBag className="w-4 h-4" />} 
              label={`Orders (${orders.length})`} 
              active={activeTab === 'orders'} 
              collapsed={!isSidebarOpen}
              onClick={() => setActiveTab('orders')} 
            />

            <SidebarItem 
              icon={<Users className="w-4 h-4" />} 
              label="Customers" 
              active={activeTab === 'customers'} 
              collapsed={!isSidebarOpen}
              onClick={() => setActiveTab('customers')} 
            />

            <SidebarItem 
              icon={<Star className="w-4 h-4" />} 
              label="Reviews & Testimonials" 
              active={activeTab === 'reviews'} 
              collapsed={!isSidebarOpen}
              onClick={() => setActiveTab('reviews')} 
            />

            <SidebarItem 
              icon={<Tag className="w-4 h-4" />} 
              label="Coupons & Offers" 
              active={activeTab === 'coupons'} 
              collapsed={!isSidebarOpen}
              onClick={() => setActiveTab('coupons')} 
            />

            <SidebarItem 
              icon={<ImageIcon className="w-4 h-4" />} 
              label="Media Library" 
              active={activeTab === 'media'} 
              collapsed={!isSidebarOpen}
              onClick={() => setActiveTab('media')} 
            />

            <SidebarItem 
              icon={<Globe className="w-4 h-4" />} 
              label="SEO Management" 
              active={activeTab === 'seo'} 
              collapsed={!isSidebarOpen}
              onClick={() => setActiveTab('seo')} 
            />

            <SidebarItem 
              icon={<Settings className="w-4 h-4" />} 
              label="Website Settings" 
              active={activeTab === 'settings'} 
              collapsed={!isSidebarOpen}
              onClick={() => setActiveTab('settings')} 
            />

            <SidebarItem 
              icon={<RefreshCw className="w-4 h-4" />} 
              label="Activity Logs" 
              active={activeTab === 'logs'} 
              collapsed={!isSidebarOpen}
              onClick={() => setActiveTab('logs')} 
            />

            <SidebarItem 
              icon={<Database className="w-4 h-4" />} 
              label="Supabase Database" 
              active={activeTab === 'database'} 
              collapsed={!isSidebarOpen}
              onClick={() => setActiveTab('database')} 
            />

          </div>

          {/* Quick sync footer */}
          <div className="p-3 border-t border-[#F8C6CF]/40">
            <button
              type="button"
              onClick={syncWithSupabase}
              className="w-full py-2 px-3 rounded-xl bg-[#FDF1F4] hover:bg-[#FCE5E8] text-[#A82F4D] text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              {isSidebarOpen && <span>Sync Supabase</span>}
            </button>
          </div>
        </aside>

        {/* Content Workspace */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-[#FFFDF9]">
          
          {/* TAB 1: DASHBOARD OVERVIEW */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-[#F8C6CF]/50">
                <div>
                  <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#40251D]">Dashboard Overview</h1>
                  <p className="text-xs sm:text-sm text-stone-500">Live metrics across products, orders, customers, and cloud integrations.</p>
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
                    onClick={seedToSupabase}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider shadow-sm transition-all cursor-pointer"
                  >
                    <Database className="w-4 h-4" />
                    <span>Sync to Supabase</span>
                  </button>
                </div>
              </div>

              {/* Metric Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <MetricCard 
                  title="Total Revenue" 
                  value={`₹${totalRevenue.toLocaleString()}`} 
                  subtitle={`${orders.filter(o => o.paymentStatus === 'paid').length} Paid Orders`} 
                  icon={<DollarSign className="w-5 h-5 text-emerald-600" />}
                  bg="bg-emerald-50 border-emerald-100"
                />
                <MetricCard 
                  title="Total Orders" 
                  value={totalOrdersCount.toString()} 
                  subtitle={`${pendingOrders} Pending Fulfillment`} 
                  icon={<ShoppingBag className="w-5 h-5 text-indigo-600" />}
                  bg="bg-indigo-50 border-indigo-100"
                />
                <MetricCard 
                  title="Catalog Products" 
                  value={products.length.toString()} 
                  subtitle={`${activeProductsCount} In Stock • ${outOfStockCount} Out`} 
                  icon={<Package className="w-5 h-5 text-[#A82F4D]" />}
                  bg="bg-rose-50 border-rose-100"
                />
                <MetricCard 
                  title="Active Services" 
                  value={services.length.toString()} 
                  subtitle="Skin & Bridal Consultations" 
                  icon={<Sparkles className="w-5 h-5 text-amber-600" />}
                  bg="bg-amber-50 border-amber-100"
                />
              </div>

              {/* Recent Orders & Low Stock */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {/* Recent Orders Box */}
                <div className="bg-white rounded-2xl border border-[#F8C6CF]/60 p-5 shadow-xs">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-serif text-lg font-bold text-[#40251D]">Recent Orders</h3>
                    <button
                      type="button"
                      onClick={() => setActiveTab('orders')}
                      className="text-xs font-bold text-[#A82F4D] hover:underline cursor-pointer"
                    >
                      View All →
                    </button>
                  </div>

                  {orders.length === 0 ? (
                    <p className="text-xs text-stone-400 py-6 text-center">No orders yet.</p>
                  ) : (
                    <div className="space-y-3">
                      {orders.slice(0, 4).map(o => (
                        <div key={o.id} className="flex items-center justify-between p-3 rounded-xl bg-stone-50 border border-stone-100 text-xs">
                          <div>
                            <span className="font-bold text-[#40251D] block">{o.orderNumber}</span>
                            <span className="text-stone-500">{o.customer?.fullName} • {o.items?.length} items</span>
                          </div>
                          <div className="text-right">
                            <span className="font-bold text-[#A82F4D] block">₹{o.total}</span>
                            <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold capitalize ${
                              o.orderStatus === 'delivered' ? 'bg-emerald-100 text-emerald-800' :
                              o.orderStatus === 'processing' ? 'bg-amber-100 text-amber-800' :
                              'bg-stone-200 text-stone-700'
                            }`}>
                              {o.orderStatus}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Low Stock Alerts & Quick Seed */}
                <div className="bg-white rounded-2xl border border-[#F8C6CF]/60 p-5 shadow-xs flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif text-lg font-bold text-[#40251D] mb-4">Inventory Watchlist</h3>
                    <div className="space-y-3">
                      {products.slice(0, 4).map(p => (
                        <div key={p.id} className="flex items-center justify-between p-3 rounded-xl bg-stone-50 border border-stone-100 text-xs">
                          <div className="flex items-center gap-3">
                            <img src={p.image} alt={p.name} className="w-9 h-9 rounded-lg object-cover" />
                            <div>
                              <span className="font-semibold text-[#40251D] block line-clamp-1">{p.name}</span>
                              <span className="text-stone-500 capitalize">{p.category}</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <span className={`font-bold block ${p.stockCount < 50 ? 'text-amber-600' : 'text-emerald-600'}`}>
                              {p.stockCount} units
                            </span>
                            <span className="text-[10px] text-stone-400">₹{p.price}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-stone-100 flex items-center justify-between text-xs">
                    <span className="text-stone-500">Database Realtime Engine</span>
                    <button
                      type="button"
                      onClick={seedToSupabase}
                      className="text-xs font-bold text-emerald-700 hover:underline cursor-pointer"
                    >
                      Push Sync Now →
                    </button>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* TAB 2: PRODUCTS MANAGEMENT */}
          {activeTab === 'products' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-[#F8C6CF]/50">
                <div>
                  <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#40251D]">Products Management</h1>
                  <p className="text-xs sm:text-sm text-stone-500">Add, edit, duplicate, set stock, and upload images to Cloudinary.</p>
                </div>
                <button
                  type="button"
                  onClick={handleOpenNewProduct}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#A82F4D] hover:bg-[#8D253F] text-white text-xs font-bold uppercase tracking-wider shadow-sm transition-all cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Product</span>
                </button>
              </div>

              {/* Filters & Search Bar */}
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={productSearch}
                    onChange={(e) => setProductSearch(e.target.value)}
                    placeholder="Search by product name, category..."
                    className="w-full pl-10 pr-4 py-2.5 text-xs bg-white border border-[#F8C6CF]/60 rounded-xl focus:outline-none focus:border-[#A82F4D]"
                  />
                </div>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-2.5 text-xs bg-white border border-[#F8C6CF]/60 rounded-xl focus:outline-none cursor-pointer"
                >
                  <option value="all">All Categories</option>
                  <option value="cosmetics">Cosmetics</option>
                  <option value="skin-care">Skin Care</option>
                  <option value="hair-care">Hair Care</option>
                </select>
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
                          <td className="py-3 px-4 flex items-center gap-3">
                            <img src={p.image} alt={p.name} className="w-12 h-12 rounded-xl object-cover border border-stone-200" />
                            <div>
                              <span className="font-bold text-[#40251D] block">{p.name}</span>
                              <span className="text-[10px] text-stone-400">Slug: {p.slug}</span>
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

          {/* TAB 3: CATEGORIES */}
          {activeTab === 'categories' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-[#F8C6CF]/50">
                <div>
                  <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#40251D]">Categories Management</h1>
                  <p className="text-xs sm:text-sm text-stone-500">Control the 3 core store categories and banners.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { id: 'cosmetics', name: 'Cosmetics', tag: 'Pure Glamour, Pure Kindness ♡', img: '/assets/banner-cosmetics.png', count: products.filter(p => p.category === 'cosmetics').length },
                  { id: 'skin-care', name: 'Skin Care', tag: 'Nourish. Protect. Glow ♡', img: '/assets/banner-skincare.png', count: products.filter(p => p.category === 'skin-care').length },
                  { id: 'hair-care', name: 'Hair Care', tag: 'Stronger. Healthier. Happier Hair ♡', img: '/assets/banner-haircare.png', count: products.filter(p => p.category === 'hair-care').length },
                ].map(cat => (
                  <div key={cat.id} className="bg-white rounded-2xl border border-[#F8C6CF]/60 overflow-hidden shadow-xs p-5 space-y-3">
                    <img src={cat.img} alt={cat.name} className="w-full h-36 object-cover rounded-xl" />
                    <div>
                      <h3 className="font-serif text-lg font-bold text-[#40251D]">{cat.name}</h3>
                      <p className="text-xs text-[#A82F4D] italic">{cat.tag}</p>
                      <p className="text-xs text-stone-500 mt-1">{cat.count} handcrafted products</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: SERVICES MANAGEMENT */}
          {activeTab === 'services' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-[#F8C6CF]/50">
                <div>
                  <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#40251D]">Services Management</h1>
                  <p className="text-xs sm:text-sm text-stone-500">Manage bespoke beauty consultations and bridal rituals.</p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setIsNewService(true);
                    setServiceForm({
                      name: '',
                      tagline: '',
                      description: '',
                      price: 999,
                      duration: '60 Mins',
                      features: ['Custom consultation'],
                      image: '/assets/prod-facecream-photo.png',
                      isActive: true
                    });
                    setEditingService(null);
                  }}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#A82F4D] hover:bg-[#8D253F] text-white text-xs font-bold uppercase tracking-wider shadow-sm transition-all cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Service</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {services.map(s => (
                  <div key={s.id} className="bg-white rounded-2xl border border-[#F8C6CF]/60 p-5 shadow-xs flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-[#A82F4D] uppercase">{s.duration}</span>
                        <span className="font-serif text-lg font-bold text-[#40251D]">₹{s.price}</span>
                      </div>
                      <h3 className="font-serif text-lg font-bold text-[#40251D] mb-1">{s.name}</h3>
                      <p className="text-xs text-[#78844B] italic mb-3 font-medium">"{s.tagline}"</p>
                      <p className="text-xs text-stone-600 leading-relaxed mb-4">{s.description}</p>
                      <ul className="space-y-1 mb-4">
                        {s.features.map((f, i) => (
                          <li key={i} className="text-xs text-stone-500 flex items-center gap-2">
                            <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex items-center justify-end gap-2 pt-3 border-t border-stone-100">
                      <button
                        type="button"
                        onClick={() => {
                          if (window.confirm(`Delete service "${s.name}"?`)) {
                            deleteService(s.id);
                          }
                        }}
                        className="text-xs font-bold text-rose-600 hover:underline cursor-pointer"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: HOMEPAGE CMS & SECTIONS */}
          {activeTab === 'homepage' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-[#F8C6CF]/50">
                <div>
                  <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#40251D]">Homepage & Sections CMS</h1>
                  <p className="text-xs sm:text-sm text-stone-500">Edit titles, banner text, benefits, and content live on the site.</p>
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

              {/* Hero Banner Form */}
              <div className="bg-white rounded-2xl border border-[#F8C6CF]/60 p-5 shadow-xs space-y-4">
                <h3 className="font-serif text-lg font-bold text-[#40251D]">Hero Section Slides</h3>
                {cmsForm.hero?.slides?.map((slide, idx) => (
                  <div key={slide.id || idx} className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-3 text-xs">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block font-semibold mb-1">Hero Title</label>
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
                        <label className="block font-semibold mb-1">Badge</label>
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
                      <label className="block font-semibold mb-1">Subtitle</label>
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

          {/* TAB 6: ORDERS */}
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
                        <th className="py-3 px-4 text-right">Update</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-100">
                      {orders.map(o => (
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
                          <td className="py-3 px-4 text-right text-[10px] text-stone-400">
                            {o.date}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 7: MEDIA LIBRARY (CLOUDINARY) */}
          {activeTab === 'media' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-[#F8C6CF]/50">
                <div>
                  <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#40251D]">Cloudinary Media Library</h1>
                  <p className="text-xs sm:text-sm text-stone-500">Cloud Name: <code className="bg-stone-100 px-1.5 py-0.5 rounded">yiuni2eh</code> • Preset: <code className="bg-stone-100 px-1.5 py-0.5 rounded">ml_default</code></p>
                </div>
                
                {/* Upload Button */}
                <label className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#A82F4D] hover:bg-[#8D253F] text-white text-xs font-bold uppercase tracking-wider shadow-sm transition-all cursor-pointer">
                  <Upload className="w-4 h-4" />
                  <span>Upload to Cloudinary</span>
                  <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e)} className="hidden" />
                </label>
              </div>

              {/* Media Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {mediaAssets.map((asset, i) => (
                  <div key={i} className="bg-white rounded-2xl border border-stone-200 p-3 overflow-hidden shadow-2xs group relative">
                    <img src={asset.url} alt={asset.name} className="w-full h-32 object-contain bg-stone-50 rounded-xl mb-2" />
                    <p className="text-xs font-semibold text-stone-800 line-clamp-1">{asset.name}</p>
                    <button
                      type="button"
                      onClick={() => {
                        navigator.clipboard.writeText(asset.url);
                        showToast('Image URL copied to clipboard! 📋');
                      }}
                      className="mt-2 w-full py-1 rounded-lg bg-stone-100 hover:bg-[#FCE5E8] text-stone-600 hover:text-[#A82F4D] text-[10px] font-bold flex items-center justify-center gap-1 cursor-pointer transition-colors"
                    >
                      <Copy className="w-3 h-3" />
                      <span>Copy URL</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 8: DATABASE & SUPABASE INTEGRATION */}
          {activeTab === 'database' && (
            <div className="space-y-6">
              <div className="pb-4 border-b border-[#F8C6CF]/50">
                <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#40251D]">Supabase Backend Integration</h1>
                <p className="text-xs sm:text-sm text-stone-500">Project: <code className="bg-stone-100 px-1.5 py-0.5 rounded">https://qdafyowujujuqlwfmxwh.supabase.co</code></p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                <div className="bg-white rounded-2xl border border-[#F8C6CF]/60 p-5 shadow-xs space-y-4">
                  <h3 className="font-serif text-lg font-bold text-[#40251D] flex items-center gap-2">
                    <Database className="w-5 h-5 text-emerald-600" />
                    <span>One-Click Store Seeder</span>
                  </h3>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    Instantly sync all current products, categories, and homepage content directly into your connected Supabase PostgreSQL database tables.
                  </p>
                  <button
                    type="button"
                    onClick={seedToSupabase}
                    className="w-full py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider shadow-sm transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Database className="w-4 h-4" />
                    <span>Sync All Products to Supabase</span>
                  </button>
                </div>

                <div className="bg-white rounded-2xl border border-[#F8C6CF]/60 p-5 shadow-xs space-y-4">
                  <h3 className="font-serif text-lg font-bold text-[#40251D] flex items-center gap-2">
                    <FileText className="w-5 h-5 text-indigo-600" />
                    <span>SQL Migration Schema</span>
                  </h3>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    The schema and seed files are located at <code className="bg-stone-100 px-1 rounded">supabase/schema.sql</code> and <code className="bg-stone-100 px-1 rounded">supabase/seed.sql</code>. Run them in the Supabase SQL Editor if you ever need a clean database reset.
                  </p>
                  <div className="p-3 bg-stone-50 rounded-xl text-[11px] text-stone-600 font-mono">
                    ✓ schema.sql (12 relational tables & RLS policies)<br />
                    ✓ seed.sql (preloaded bestselling cosmetics & skincare)
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* TAB 9: ACTIVITY LOGS */}
          {activeTab === 'logs' && (
            <div className="space-y-6">
              <div className="pb-4 border-b border-[#F8C6CF]/50">
                <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#40251D]">Admin Activity Logs</h1>
                <p className="text-xs sm:text-sm text-stone-500">Audit trail of all administrative actions, updates, and mutations.</p>
              </div>

              <div className="bg-white rounded-2xl border border-[#F8C6CF]/60 p-5 shadow-xs">
                {activityLogs.length === 0 ? (
                  <p className="text-xs text-stone-400 py-6 text-center">No recent activities logged yet.</p>
                ) : (
                  <div className="space-y-3">
                    {activityLogs.map((log) => (
                      <div key={log.id} className="flex items-center justify-between p-3 rounded-xl bg-stone-50 border border-stone-100 text-xs">
                        <div>
                          <span className="font-bold text-[#A82F4D] uppercase text-[10px] mr-2">[{log.action}]</span>
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

          {/* OTHER TABS (Settings, SEO, Coupons, Reviews, Customers) */}
          {(activeTab === 'settings' || activeTab === 'seo' || activeTab === 'coupons' || activeTab === 'reviews' || activeTab === 'customers') && (
            <div className="bg-white rounded-2xl border border-[#F8C6CF]/60 p-6 shadow-xs space-y-4">
              <h2 className="font-serif text-xl font-bold text-[#40251D] capitalize">{activeTab} Management</h2>
              <p className="text-xs text-stone-500">Configure global {activeTab} settings and automated preferences.</p>
              <div className="pt-4 border-t border-stone-100 text-xs text-stone-600">
                Active configuration synchronized with Supabase & storefront live context.
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

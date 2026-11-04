import React, { useState } from 'react';
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
  Users
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { Product, OrderStatus, CategoryType } from '../types';

export const AdminPage: React.FC = () => {
  const { 
    products, 
    orders, 
    cms, 
    coupons, 
    isAdminLoggedIn, 
    loginAdmin, 
    logoutAdmin, 
    updateProduct, 
    addProduct, 
    deleteProduct, 
    updateOrderStatus, 
    updateCMS,
    showToast 
  } = useStore();

  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState<'dashboard' | 'products' | 'orders' | 'cms' | 'coupons' | 'settings'>('dashboard');

  // Product edit modal state
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isNewProduct, setIsNewProduct] = useState(false);

  // Form states for CMS & Settings
  const [cmsForm, setCmsForm] = useState(cms);

  if (!isAdminLoggedIn) {
    return (
      <div className="min-h-screen bg-[#FDF1F4] py-20 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-3xl border border-[#F8C6CF] p-8 shadow-xl text-center">
          <div className="w-16 h-16 rounded-full bg-[#FCE5E8] text-[#A82F4D] flex items-center justify-center mx-auto mb-4">
            <Lock className="w-8 h-8" />
          </div>
          <span className="font-script text-2xl text-[#A82F4D] block mb-1">Pretty Palette</span>
          <h2 className="font-serif text-2xl font-bold text-[#40251D] mb-2">Merchant Admin Portal</h2>
          <p className="text-xs text-stone-500 mb-6">Enter your administrator access key to manage products, orders, and CMS.</p>

          <form onSubmit={(e) => {
            e.preventDefault();
            const success = loginAdmin(password);
            if (!success) {
              alert('Invalid access credentials. Hint: prettypalette2026');
            }
          }}>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Admin password (prettypalette2026)"
              className="w-full px-4 py-3 text-sm border border-stone-200 rounded-xl mb-4 focus:outline-none focus:border-[#A82F4D]"
            />
            <button
              type="submit"
              className="w-full bg-[#A82F4D] hover:bg-[#8D253F] text-white py-3 rounded-full text-xs font-bold uppercase tracking-wider shadow-md transition-all cursor-pointer"
            >
              Authenticate & Enter
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Dashboard Stats
  const totalRevenue = orders.reduce((sum, o) => sum + (o.paymentStatus === 'paid' ? o.total : 0), 0);
  const totalOrdersCount = orders.length;
  const pendingOrders = orders.filter(o => o.orderStatus === 'placed' || o.orderStatus === 'processing').length;

  const handleSaveCMS = (e: React.FormEvent) => {
    e.preventDefault();
    updateCMS(cmsForm);
  };

  return (
    <div className="min-h-screen bg-stone-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Admin Header */}
        <div className="bg-white rounded-3xl border border-stone-200 p-6 mb-8 flex flex-wrap items-center justify-between gap-4 shadow-xs">
          <div className="flex items-center gap-3">
            <img src="/assets/logo.png" alt="Logo" className="w-12 h-12 object-contain" />
            <div>
              <h1 className="font-serif text-2xl font-bold text-[#40251D]">Pretty Palette Admin CMS</h1>
              <p className="text-xs text-stone-500">Live Management Dashboard & E-commerce Operations</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={logoutAdmin}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-red-600 bg-red-50 hover:bg-red-100 px-4 py-2 rounded-full transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" /> Logout
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap items-center gap-2 mb-8 bg-white p-2 rounded-2xl border border-stone-200">
          {[
            { id: 'dashboard', label: 'Overview Dashboard', icon: LayoutDashboard },
            { id: 'products', label: 'Products & Inventory', icon: Package },
            { id: 'orders', label: 'Orders & Tracking', icon: ShoppingBag },
            { id: 'cms', label: 'Homepage CMS', icon: Sliders },
            { id: 'coupons', label: 'Coupons & Promos', icon: Tag },
            { id: 'settings', label: 'Store Settings', icon: Settings },
          ].map(t => {
            const Icon = t.icon;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => setActiveTab(t.id as any)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === t.id
                    ? 'bg-[#A82F4D] text-white shadow-xs'
                    : 'text-stone-600 hover:bg-[#FDF1F4]'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{t.label}</span>
              </button>
            );
          })}
        </div>

        {/* 1. OVERVIEW DASHBOARD */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            {/* Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-2xs">
                <div className="flex items-center justify-between text-stone-500 mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider">Total Sales</span>
                  <DollarSign className="w-5 h-5 text-green-600" />
                </div>
                <p className="text-2xl font-bold text-[#40251D]">₹{totalRevenue.toLocaleString()}</p>
                <span className="text-[11px] text-green-600 font-semibold">Active live revenue</span>
              </div>

              <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-2xs">
                <div className="flex items-center justify-between text-stone-500 mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider">Total Orders</span>
                  <ShoppingBag className="w-5 h-5 text-[#A82F4D]" />
                </div>
                <p className="text-2xl font-bold text-[#40251D]">{totalOrdersCount}</p>
                <span className="text-[11px] text-stone-500 font-semibold">{pendingOrders} pending dispatch</span>
              </div>

              <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-2xs">
                <div className="flex items-center justify-between text-stone-500 mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider">Live Catalog</span>
                  <Package className="w-5 h-5 text-[#78844B]" />
                </div>
                <p className="text-2xl font-bold text-[#40251D]">{products.length} Products</p>
                <span className="text-[11px] text-stone-500 font-semibold">Cosmetics, Skin, Hair</span>
              </div>

              <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-2xs">
                <div className="flex items-center justify-between text-stone-500 mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider">Avg Order Value</span>
                  <TrendingUp className="w-5 h-5 text-blue-600" />
                </div>
                <p className="text-2xl font-bold text-[#40251D]">
                  ₹{totalOrdersCount > 0 ? (totalRevenue / totalOrdersCount).toFixed(0) : '0'}
                </p>
                <span className="text-[11px] text-blue-600 font-semibold">Healthy cart size</span>
              </div>
            </div>

            {/* Recent Orders Table */}
            <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-2xs">
              <h3 className="font-serif text-lg font-bold text-[#40251D] mb-4">Latest Orders</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-stone-50 text-stone-500 font-bold uppercase border-b border-stone-100">
                    <tr>
                      <th className="p-3">Order No</th>
                      <th className="p-3">Customer</th>
                      <th className="p-3">Items</th>
                      <th className="p-3">Total</th>
                      <th className="p-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100 font-medium">
                    {orders.slice(0, 5).map(ord => (
                      <tr key={ord.id} className="hover:bg-stone-50">
                        <td className="p-3 font-mono font-bold text-[#A82F4D]">{ord.orderNumber}</td>
                        <td className="p-3">{ord.customer.fullName}</td>
                        <td className="p-3">{ord.items.length} items</td>
                        <td className="p-3 font-bold">₹{ord.total}</td>
                        <td className="p-3">
                          <span className="capitalize px-2 py-0.5 rounded-full bg-stone-100 text-stone-700 text-[11px] font-bold">
                            {ord.orderStatus.replace('_', ' ')}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* 2. PRODUCTS & INVENTORY CMS */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-xl font-bold text-[#40251D]">Product Catalog ({products.length})</h3>
              <button
                type="button"
                onClick={() => {
                  setEditingProduct({
                    id: '',
                    slug: '',
                    name: '',
                    category: 'cosmetics',
                    price: 299,
                    originalPrice: 399,
                    discount: 25,
                    rating: 4.8,
                    reviewCount: 1,
                    image: '/assets/prod-lipstick-photo.png',
                    gallery: ['/assets/prod-lipstick-photo.png'],
                    shortDescription: '',
                    description: '',
                    ingredients: ['Cold-pressed botanical extract'],
                    usageInstructions: ['Apply as needed'],
                    benefits: ['100% natural formula'],
                    inStock: true,
                    stockCount: 50,
                    isBestSeller: false,
                    isFeatured: true
                  });
                  setIsNewProduct(true);
                }}
                className="inline-flex items-center gap-1.5 bg-[#A82F4D] text-white px-4 py-2 rounded-full text-xs font-bold hover:bg-[#8D253F] transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4" /> Add New Product
              </button>
            </div>

            {/* Product Table */}
            <div className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-2xs">
              <table className="w-full text-left text-xs">
                <thead className="bg-stone-50 text-stone-500 font-bold uppercase border-b border-stone-100">
                  <tr>
                    <th className="p-3.5">Product</th>
                    <th className="p-3.5">Category</th>
                    <th className="p-3.5">Price</th>
                    <th className="p-3.5">Stock</th>
                    <th className="p-3.5">Best Seller</th>
                    <th className="p-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 font-medium">
                  {products.map(prod => (
                    <tr key={prod.id} className="hover:bg-stone-50/70">
                      <td className="p-3.5 flex items-center gap-3">
                        <img src={prod.image} alt={prod.name} className="w-10 h-10 object-contain rounded-lg bg-[#FDF1F4] p-1" />
                        <div>
                          <p className="font-bold text-[#40251D] text-sm">{prod.name}</p>
                          <p className="text-[11px] text-stone-400">₹{prod.price} (MRP: ₹{prod.originalPrice})</p>
                        </div>
                      </td>
                      <td className="p-3.5 capitalize text-stone-600">{prod.category.replace('-', ' ')}</td>
                      <td className="p-3.5 font-bold text-[#40251D]">₹{prod.price}</td>
                      <td className="p-3.5">
                        <span className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${
                          prod.stockCount > 10 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                        }`}>
                          {prod.stockCount} in stock
                        </span>
                      </td>
                      <td className="p-3.5">
                        <button
                          type="button"
                          onClick={() => updateProduct({ ...prod, isBestSeller: !prod.isBestSeller })}
                          className={`px-2.5 py-1 rounded-full text-[11px] font-bold cursor-pointer transition-colors ${
                            prod.isBestSeller ? 'bg-[#78844B] text-white' : 'bg-stone-100 text-stone-500 hover:bg-stone-200'
                          }`}
                        >
                          {prod.isBestSeller ? '★ Best Seller' : 'Regular'}
                        </button>
                      </td>
                      <td className="p-3.5 text-right space-x-2">
                        <button
                          type="button"
                          onClick={() => { setEditingProduct(prod); setIsNewProduct(false); }}
                          className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            if (confirm(`Delete ${prod.name}?`)) deleteProduct(prod.id);
                          }}
                          className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Product Edit / Create Modal */}
            {editingProduct && (
              <div className="fixed inset-0 z-50 overflow-y-auto p-4 bg-black/50 backdrop-blur-xs flex items-center justify-center">
                <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-4 shadow-2xl">
                  <h4 className="font-serif text-xl font-bold text-[#40251D]">
                    {isNewProduct ? 'Add New Product' : `Edit: ${editingProduct.name}`}
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-stone-600 block mb-1">Product Title</label>
                      <input
                        type="text"
                        value={editingProduct.name}
                        onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                        className="w-full px-3 py-2 text-xs border rounded-lg"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-stone-600 block mb-1">Category</label>
                      <select
                        value={editingProduct.category}
                        onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value as CategoryType })}
                        className="w-full px-3 py-2 text-xs border rounded-lg"
                      >
                        <option value="cosmetics">Cosmetics</option>
                        <option value="skin-care">Skin Care</option>
                        <option value="hair-care">Hair Care</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-stone-600 block mb-1">Selling Price (₹)</label>
                      <input
                        type="number"
                        value={editingProduct.price}
                        onChange={(e) => setEditingProduct({ ...editingProduct, price: Number(e.target.value) })}
                        className="w-full px-3 py-2 text-xs border rounded-lg"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-stone-600 block mb-1">Original MRP (₹)</label>
                      <input
                        type="number"
                        value={editingProduct.originalPrice}
                        onChange={(e) => setEditingProduct({ ...editingProduct, originalPrice: Number(e.target.value) })}
                        className="w-full px-3 py-2 text-xs border rounded-lg"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-stone-600 block mb-1">Stock Count</label>
                      <input
                        type="number"
                        value={editingProduct.stockCount}
                        onChange={(e) => setEditingProduct({ ...editingProduct, stockCount: Number(e.target.value) })}
                        className="w-full px-3 py-2 text-xs border rounded-lg"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-stone-600 block mb-1">Image URL or Asset Path</label>
                      <input
                        type="text"
                        value={editingProduct.image}
                        onChange={(e) => setEditingProduct({ ...editingProduct, image: e.target.value })}
                        className="w-full px-3 py-2 text-xs border rounded-lg"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-stone-600 block mb-1">Short Description</label>
                    <input
                      type="text"
                      value={editingProduct.shortDescription}
                      onChange={(e) => setEditingProduct({ ...editingProduct, shortDescription: e.target.value })}
                      className="w-full px-3 py-2 text-xs border rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-stone-600 block mb-1">Full Description</label>
                    <textarea
                      rows={3}
                      value={editingProduct.description}
                      onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                      className="w-full px-3 py-2 text-xs border rounded-lg"
                    />
                  </div>

                  <div className="flex justify-end gap-3 pt-4 border-t">
                    <button
                      type="button"
                      onClick={() => setEditingProduct(null)}
                      className="px-4 py-2 text-xs font-bold text-stone-600 hover:bg-stone-100 rounded-lg"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (isNewProduct) {
                          addProduct(editingProduct);
                        } else {
                          updateProduct(editingProduct);
                        }
                        setEditingProduct(null);
                      }}
                      className="bg-[#A82F4D] text-white px-5 py-2 rounded-lg text-xs font-bold"
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* 3. ORDERS & TRACKING */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            <h3 className="font-serif text-xl font-bold text-[#40251D]">Manage Customer Orders ({orders.length})</h3>

            <div className="space-y-4">
              {orders.map(ord => (
                <div key={ord.id} className="bg-white rounded-3xl border border-stone-200 p-6 shadow-2xs space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-stone-100">
                    <div>
                      <p className="font-mono text-base font-bold text-[#A82F4D]">{ord.orderNumber}</p>
                      <p className="text-xs text-stone-500">Customer: <strong>{ord.customer.fullName}</strong> ({ord.customer.phone})</p>
                    </div>

                    <div className="flex items-center gap-3">
                      <select
                        value={ord.orderStatus}
                        onChange={(e) => updateOrderStatus(ord.id, e.target.value as OrderStatus)}
                        className="px-3 py-1.5 text-xs font-bold border border-stone-200 rounded-lg uppercase tracking-wider bg-stone-50"
                      >
                        <option value="placed">Placed</option>
                        <option value="processing">Processing</option>
                        <option value="dispatched">Dispatched</option>
                        <option value="in_transit">In Transit</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>

                      <span className="font-bold text-sm text-[#40251D]">₹{ord.total}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div>
                      <p className="font-bold text-stone-600">Shipping To:</p>
                      <p className="text-stone-500">{ord.shippingAddress.addressLine1}, {ord.shippingAddress.city}, {ord.shippingAddress.state} - {ord.shippingAddress.pincode}</p>
                    </div>
                    <div>
                      <p className="font-bold text-stone-600">Tracking Info:</p>
                      <p className="text-stone-500">Partner: {ord.courierName || 'Delhivery'} • ID: {ord.trackingNumber || 'Pending'}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 4. HOMEPAGE CMS */}
        {activeTab === 'cms' && (
          <form onSubmit={handleSaveCMS} className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 space-y-6 shadow-2xs">
            <h3 className="font-serif text-xl font-bold text-[#40251D]">Live Homepage CMS & Content Editor</h3>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-stone-600 block mb-1">Announcement Bar Text</label>
                <input
                  type="text"
                  value={cmsForm.announcementBar.text}
                  onChange={(e) => setCmsForm({
                    ...cmsForm,
                    announcementBar: { ...cmsForm.announcementBar, text: e.target.value }
                  })}
                  className="w-full px-3 py-2 text-xs border rounded-lg"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-stone-600 block mb-1">Hero Badge Script</label>
                  <input
                    type="text"
                    value={cmsForm.hero.slides[0]?.badge || ''}
                    onChange={(e) => {
                      const updatedSlides = [...cmsForm.hero.slides];
                      updatedSlides[0].badge = e.target.value;
                      setCmsForm({ ...cmsForm, hero: { ...cmsForm.hero, slides: updatedSlides } });
                    }}
                    className="w-full px-3 py-2 text-xs border rounded-lg"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-stone-600 block mb-1">Hero CTA Text</label>
                  <input
                    type="text"
                    value={cmsForm.hero.slides[0]?.ctaText || ''}
                    onChange={(e) => {
                      const updatedSlides = [...cmsForm.hero.slides];
                      updatedSlides[0].ctaText = e.target.value;
                      setCmsForm({ ...cmsForm, hero: { ...cmsForm.hero, slides: updatedSlides } });
                    }}
                    className="w-full px-3 py-2 text-xs border rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-stone-600 block mb-1">Hero Mode</label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 text-xs cursor-pointer">
                    <input
                      type="radio"
                      name="heroMode"
                      value="image"
                      checked={cmsForm.hero.mode === 'image'}
                      onChange={() => setCmsForm({ ...cmsForm, hero: { ...cmsForm.hero, mode: 'image' } })}
                    />
                    <span>Animated Image Mode (image copy 3.png)</span>
                  </label>
                  <label className="flex items-center gap-2 text-xs cursor-pointer">
                    <input
                      type="radio"
                      name="heroMode"
                      value="video"
                      checked={cmsForm.hero.mode === 'video'}
                      onChange={() => setCmsForm({ ...cmsForm, hero: { ...cmsForm.hero, mode: 'video' } })}
                    />
                    <span>Video Background Mode</span>
                  </label>
                </div>
              </div>

              {cmsForm.hero.mode === 'video' && (
                <div>
                  <label className="text-xs font-bold text-stone-600 block mb-1">Hero Video URL (MP4)</label>
                  <input
                    type="text"
                    placeholder="https://example.com/hero-video.mp4"
                    value={cmsForm.hero.videoUrl || ''}
                    onChange={(e) => setCmsForm({ ...cmsForm, hero: { ...cmsForm.hero, videoUrl: e.target.value } })}
                    className="w-full px-3 py-2 text-xs border rounded-lg"
                  />
                </div>
              )}

              <div>
                <label className="text-xs font-bold text-stone-600 block mb-1">About Section Story</label>
                <textarea
                  rows={3}
                  value={cmsForm.about.text}
                  onChange={(e) => setCmsForm({ ...cmsForm, about: { ...cmsForm.about, text: e.target.value } })}
                  className="w-full px-3 py-2 text-xs border rounded-lg"
                />
              </div>
            </div>

            <button
              type="submit"
              className="bg-[#A82F4D] text-white px-6 py-2.5 rounded-full text-xs font-bold hover:bg-[#8D253F] transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Save className="w-4 h-4" /> Save CMS Changes
            </button>
          </form>
        )}

        {/* 5. COUPONS & PROMOS */}
        {activeTab === 'coupons' && (
          <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 space-y-6 shadow-2xs">
            <h3 className="font-serif text-xl font-bold text-[#40251D]">Coupons & Promotional Codes</h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {coupons.map(cp => (
                <div key={cp.code} className="p-4 rounded-2xl border-2 border-dashed border-[#E98B9B] bg-[#FDF1F4] flex flex-col justify-between">
                  <div>
                    <span className="font-mono text-base font-bold text-[#A82F4D] tracking-wider block">{cp.code}</span>
                    <p className="text-xs text-stone-600 mt-1">{cp.description}</p>
                    <p className="text-[11px] text-stone-400 mt-2">Min order: ₹{cp.minOrderAmount}</p>
                  </div>
                  <span className="text-[10px] font-bold uppercase text-green-700 bg-green-100 px-2 py-0.5 rounded-full mt-3 inline-block self-start">Active</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 6. STORE SETTINGS */}
        {activeTab === 'settings' && (
          <form onSubmit={handleSaveCMS} className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 space-y-6 shadow-2xs">
            <h3 className="font-serif text-xl font-bold text-[#40251D]">Store Shipping & Contact Settings</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-stone-600 block mb-1">Free Shipping Threshold (₹)</label>
                <input
                  type="number"
                  value={cmsForm.settings.freeShippingThreshold}
                  onChange={(e) => setCmsForm({
                    ...cmsForm,
                    settings: { ...cmsForm.settings, freeShippingThreshold: Number(e.target.value) }
                  })}
                  className="w-full px-3 py-2 text-xs border rounded-lg"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-stone-600 block mb-1">Flat Shipping Fee (₹)</label>
                <input
                  type="number"
                  value={cmsForm.settings.shippingFee}
                  onChange={(e) => setCmsForm({
                    ...cmsForm,
                    settings: { ...cmsForm.settings, shippingFee: Number(e.target.value) }
                  })}
                  className="w-full px-3 py-2 text-xs border rounded-lg"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-stone-600 block mb-1">Contact Phone / WhatsApp</label>
                <input
                  type="text"
                  value={cmsForm.settings.phone}
                  onChange={(e) => setCmsForm({
                    ...cmsForm,
                    settings: { ...cmsForm.settings, phone: e.target.value }
                  })}
                  className="w-full px-3 py-2 text-xs border rounded-lg"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-stone-600 block mb-1">Official Email</label>
                <input
                  type="email"
                  value={cmsForm.settings.email}
                  onChange={(e) => setCmsForm({
                    ...cmsForm,
                    settings: { ...cmsForm.settings, email: e.target.value }
                  })}
                  className="w-full px-3 py-2 text-xs border rounded-lg"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-xs font-bold text-stone-600 block mb-1">Registered Address</label>
                <textarea
                  rows={2}
                  value={cmsForm.settings.address}
                  onChange={(e) => setCmsForm({
                    ...cmsForm,
                    settings: { ...cmsForm.settings, address: e.target.value }
                  })}
                  className="w-full px-3 py-2 text-xs border rounded-lg"
                />
              </div>
            </div>

            <button
              type="submit"
              className="bg-[#A82F4D] text-white px-6 py-2.5 rounded-full text-xs font-bold hover:bg-[#8D253F] transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Save className="w-4 h-4" /> Save Settings
            </button>
          </form>
        )}

      </div>
    </div>
  );
};


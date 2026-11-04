import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, Package, Heart, LogOut, MapPin, Sparkles, ShieldAlert } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const AccountPage: React.FC = () => {
  const { user, loginUser, logoutUser, orders, wishlist } = useStore();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone) return;
    loginUser(email, name, phone);
  };

  return (
    <div className="min-h-screen bg-[#FFFDF9] py-10 sm:py-14">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#40251D] mb-8 text-center sm:text-left">
          Customer Account ♡
        </h1>

        {!user ? (
          /* Sign In / Sign Up Card */
          <div className="max-w-md mx-auto bg-white rounded-3xl border border-[#F8C6CF] p-6 sm:p-8 shadow-sm">
            <div className="text-center mb-6">
              <div className="w-14 h-14 rounded-full bg-[#FCE5E8] text-[#A82F4D] flex items-center justify-center mx-auto mb-3">
                <User className="w-7 h-7" />
              </div>
              <span className="font-script text-2xl text-[#A82F4D] block mb-1">Welcome Beautiful ♡</span>
              <h2 className="font-serif text-xl font-bold text-[#40251D]">Access Your Account</h2>
              <p className="text-xs text-stone-500 mt-1">Sign in to track orders, save addresses & claim member gifts.</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-stone-600 block mb-1">Your Full Name *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Radhika Sharma"
                  className="w-full px-3.5 py-2 text-xs sm:text-sm border border-stone-200 rounded-xl focus:outline-none focus:border-[#A82F4D]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-stone-600 block mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. radhika@gmail.com"
                  className="w-full px-3.5 py-2 text-xs sm:text-sm border border-stone-200 rounded-xl focus:outline-none focus:border-[#A82F4D]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-stone-600 block mb-1">Mobile Number *</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="10-digit phone number"
                  className="w-full px-3.5 py-2 text-xs sm:text-sm border border-stone-200 rounded-xl focus:outline-none focus:border-[#A82F4D]"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#A82F4D] hover:bg-[#8D253F] text-white py-3 px-6 rounded-full font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer"
              >
                Sign In / Register
              </button>
            </form>
          </div>
        ) : (
          /* Logged In Dashboard */
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            
            {/* Sidebar Profile Card */}
            <div className="md:col-span-4 bg-white rounded-3xl border border-[#F8C6CF] p-6 shadow-xs text-center space-y-4">
              <div className="w-20 h-20 rounded-full bg-[#FCE5E8] text-[#A82F4D] font-bold text-2xl flex items-center justify-center mx-auto shadow-inner">
                {user.name.charAt(0)}
              </div>
              <div>
                <h3 className="font-serif text-xl font-bold text-[#40251D]">{user.name}</h3>
                <p className="text-xs text-stone-500">{user.email}</p>
                <p className="text-xs text-stone-500">{user.phone}</p>
              </div>

              <div className="pt-4 border-t border-stone-100 flex justify-center gap-2">
                <button
                  type="button"
                  onClick={logoutUser}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 px-4 py-2 rounded-full transition-colors cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" /> Sign Out
                </button>
              </div>
            </div>

            {/* Quick Actions & Recent Orders */}
            <div className="md:col-span-8 space-y-6">
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Link
                  to="/my-orders"
                  className="p-5 rounded-2xl bg-white border border-[#F8C6CF] hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <Package className="w-6 h-6 text-[#A82F4D] mb-2" />
                  <div>
                    <h4 className="font-bold text-sm text-[#40251D]">My Orders</h4>
                    <p className="text-xs text-stone-500">{orders.length} orders placed</p>
                  </div>
                </Link>

                <Link
                  to="/wishlist"
                  className="p-5 rounded-2xl bg-white border border-[#F8C6CF] hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <Heart className="w-6 h-6 text-[#FF647F] mb-2" />
                  <div>
                    <h4 className="font-bold text-sm text-[#40251D]">My Wishlist</h4>
                    <p className="text-xs text-stone-500">{wishlist.length} saved products</p>
                  </div>
                </Link>

                <Link
                  to="/track-order"
                  className="p-5 rounded-2xl bg-white border border-[#F8C6CF] hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <Sparkles className="w-6 h-6 text-[#78844B] mb-2" />
                  <div>
                    <h4 className="font-bold text-sm text-[#40251D]">Track Order</h4>
                    <p className="text-xs text-stone-500">Live courier tracker</p>
                  </div>
                </Link>
              </div>

              {/* Recent Orders Overview */}
              <div className="bg-white rounded-3xl border border-[#F8C6CF] p-6 shadow-xs">
                <h4 className="font-serif text-lg font-bold text-[#40251D] mb-4">Recent Orders</h4>
                {orders.length === 0 ? (
                  <p className="text-xs text-stone-500">No orders placed yet.</p>
                ) : (
                  <div className="space-y-3">
                    {orders.slice(0, 3).map((ord) => (
                      <div key={ord.id} className="p-3.5 rounded-xl bg-[#FDF1F4]/50 border border-stone-100 flex items-center justify-between text-xs">
                        <div>
                          <p className="font-bold text-[#40251D] font-mono">{ord.orderNumber}</p>
                          <p className="text-stone-500">{ord.date} • {ord.items.length} items</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-[#40251D]">₹{ord.total}</p>
                          <span className="capitalize text-[11px] font-semibold text-[#78844B]">{ord.orderStatus.replace('_', ' ')}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>

          </div>
        )}

      </div>
    </div>
  );
};


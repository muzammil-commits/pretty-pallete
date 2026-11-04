import React from 'react';
import { Link } from 'react-router-dom';
import { Package, Truck, ArrowRight, ChevronRight, ExternalLink } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const MyOrdersPage: React.FC = () => {
  const { orders } = useStore();

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'delivered':
        return <span className="px-2.5 py-1 rounded-full bg-green-100 text-green-700 text-xs font-bold">Delivered</span>;
      case 'in_transit':
        return <span className="px-2.5 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold">In Transit</span>;
      case 'dispatched':
        return <span className="px-2.5 py-1 rounded-full bg-purple-100 text-purple-700 text-xs font-bold">Dispatched</span>;
      case 'processing':
        return <span className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-700 text-xs font-bold">Processing</span>;
      default:
        return <span className="px-2.5 py-1 rounded-full bg-stone-100 text-stone-700 text-xs font-bold">Placed</span>;
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFDF9] py-10 sm:py-14">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-stone-500 mb-6">
          <Link to="/" className="hover:text-[#A82F4D]">Home</Link>
          <ChevronRight className="w-3 h-3 text-stone-400" />
          <Link to="/account" className="hover:text-[#A82F4D]">Account</Link>
          <ChevronRight className="w-3 h-3 text-stone-400" />
          <span className="font-semibold text-[#A82F4D]">My Orders</span>
        </div>

        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#40251D] mb-8">
          Order History ({orders.length})
        </h1>

        {orders.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-[#F8C6CF] p-8 max-w-md mx-auto">
            <Package className="w-12 h-12 text-[#A82F4D] mx-auto mb-3" />
            <h3 className="font-serif text-xl font-bold text-[#40251D] mb-1">No Orders Found</h3>
            <p className="text-xs text-stone-500 mb-6">You haven't placed any orders with Pretty Palette yet.</p>
            <Link to="/shop" className="bg-[#A82F4D] text-white px-6 py-2.5 rounded-full text-xs font-bold">
              Shop Now
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((ord) => (
              <div
                key={ord.id}
                className="bg-white rounded-3xl border border-[#F8C6CF] overflow-hidden shadow-xs hover:shadow-md transition-shadow"
              >
                {/* Order Top Bar */}
                <div className="bg-[#FDF1F4] p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4 border-b border-[#F8C6CF]/50">
                  <div className="flex items-center gap-3">
                    <Package className="w-5 h-5 text-[#A82F4D]" />
                    <div>
                      <p className="text-xs text-stone-500">Order Placed: <strong className="text-[#40251D]">{ord.date}</strong></p>
                      <p className="font-mono text-sm font-bold text-[#A82F4D]">{ord.orderNumber}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    {getStatusBadge(ord.orderStatus)}
                    <Link
                      to={`/order-confirmation/${ord.id}`}
                      className="text-xs font-semibold text-[#78844B] hover:text-[#4C542C] inline-flex items-center gap-1"
                    >
                      <span>Invoice</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* Items */}
                <div className="p-4 sm:p-6 divide-y divide-stone-100">
                  {ord.items.map((item, idx) => (
                    <div key={idx} className="py-3 first:pt-0 last:pb-0 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <img src={item.productImage} alt={item.productName} className="w-14 h-14 object-contain rounded-lg bg-[#FDF1F4] p-1" />
                        <div>
                          <p className="font-serif text-sm font-bold text-[#40251D]">{item.productName}</p>
                          {item.variantName && <p className="text-xs text-[#A82F4D]">{item.variantName}</p>}
                          <p className="text-xs text-stone-500">Qty: {item.quantity}</p>
                        </div>
                      </div>
                      <span className="font-bold text-sm text-[#40251D]">₹{item.price * item.quantity}</span>
                    </div>
                  ))}
                </div>

                {/* Tracking & Total Bar */}
                <div className="p-4 sm:p-5 bg-[#FFF9EF]/40 border-t border-stone-100 flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm">
                  <div className="flex items-center gap-2 text-stone-600">
                    <Truck className="w-4 h-4 text-[#78844B]" />
                    <span>Courier: <strong>{ord.courierName || 'Delhivery Express'}</strong> • Track ID: <strong>{ord.trackingNumber}</strong></span>
                  </div>
                  <div>
                    <span className="text-stone-500 mr-2">Total Paid:</span>
                    <span className="font-bold text-base text-[#40251D]">₹{ord.total}</span>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};


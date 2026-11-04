import React, { useState } from 'react';
import { Search, Truck, CheckCircle2, Package, MapPin, Clock } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const TrackOrderPage: React.FC = () => {
  const { orders } = useStore();
  const [query, setQuery] = useState('');
  const [searchedOrder, setSearchedOrder] = useState<any>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query) return;

    const trimmed = query.trim().toUpperCase();
    const found = orders.find(o => 
      o.orderNumber.toUpperCase() === trimmed || 
      (o.trackingNumber && o.trackingNumber.toUpperCase() === trimmed)
    );

    setSearchedOrder(found || null);
    setHasSearched(true);
  };

  const getStepProgress = (status: string) => {
    switch (status) {
      case 'placed': return 1;
      case 'processing': return 2;
      case 'dispatched': return 3;
      case 'in_transit': return 4;
      case 'delivered': return 5;
      default: return 1;
    }
  };

  const currentStep = searchedOrder ? getStepProgress(searchedOrder.orderStatus) : 0;

  return (
    <div className="min-h-screen bg-[#FFFDF9] py-10 sm:py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="font-script text-3xl sm:text-4xl text-[#A82F4D] block mb-1">
            Where is My Glow? ♡
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#40251D] mb-3">
            Track Your Order
          </h1>
          <p className="text-xs sm:text-sm text-stone-600">
            Enter your Pretty Palette Order Number (e.g. PP-98210) or Courier Tracking ID to get live delivery updates.
          </p>
        </div>

        {/* Search Box */}
        <form onSubmit={handleSearch} className="mb-10">
          <div className="flex items-center bg-white rounded-full p-2 pl-6 border-2 border-[#F8C6CF] shadow-sm focus-within:border-[#A82F4D]">
            <Search className="w-5 h-5 text-[#A82F4D] mr-2" />
            <input
              type="text"
              required
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g. PP-98210 or DELHIVERY..."
              className="w-full bg-transparent text-sm sm:text-base text-[#40251D] placeholder:text-stone-400 focus:outline-none uppercase font-mono"
            />
            <button
              type="submit"
              className="bg-[#A82F4D] hover:bg-[#8D253F] text-white px-6 sm:px-8 py-3 rounded-full text-xs sm:text-sm font-bold shadow-md transition-colors cursor-pointer shrink-0"
            >
              Track Order
            </button>
          </div>
        </form>

        {/* Results */}
        {hasSearched && (
          searchedOrder ? (
            <div className="bg-white rounded-3xl border border-[#F8C6CF] p-6 sm:p-8 shadow-sm space-y-8 animate-in zoom-in-95 duration-200">
              
              {/* Header Info */}
              <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-stone-100">
                <div>
                  <p className="text-xs text-stone-400 uppercase font-bold tracking-wider">Tracking Order</p>
                  <p className="font-mono text-xl font-bold text-[#A82F4D]">{searchedOrder.orderNumber}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-stone-400 uppercase font-bold tracking-wider">Courier Partner</p>
                  <p className="text-sm font-bold text-[#40251D]">{searchedOrder.courierName || 'Delhivery Express'}</p>
                </div>
              </div>

              {/* Progress Steps */}
              <div className="relative py-4">
                <div className="flex items-center justify-between relative z-10">
                  {[
                    { step: 1, label: 'Placed', icon: Package },
                    { step: 2, label: 'Handcrafted', icon: Clock },
                    { step: 3, label: 'Dispatched', icon: Truck },
                    { step: 4, label: 'In Transit', icon: MapPin },
                    { step: 5, label: 'Delivered', icon: CheckCircle2 },
                  ].map((s) => {
                    const Icon = s.icon;
                    const isDone = currentStep >= s.step;
                    return (
                      <div key={s.step} className="flex flex-col items-center">
                        <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center font-bold text-xs transition-colors shadow-xs ${
                          isDone 
                            ? 'bg-[#78844B] text-white ring-4 ring-[#78844B]/20' 
                            : 'bg-stone-100 text-stone-400'
                        }`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <span className={`text-[11px] sm:text-xs font-semibold mt-2 text-center ${
                          isDone ? 'text-[#40251D]' : 'text-stone-400'
                        }`}>
                          {s.label}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Connecting Track Line */}
                <div className="absolute top-9 sm:top-10 left-6 right-6 h-1 bg-stone-200 -z-0">
                  <div 
                    className="h-full bg-[#78844B] transition-all duration-500"
                    style={{ width: `${((currentStep - 1) / 4) * 100}%` }}
                  />
                </div>
              </div>

              {/* Destination Summary */}
              <div className="p-4 rounded-2xl bg-[#FFF9EF] border border-[#78844B]/20 text-xs sm:text-sm text-stone-700 flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#A82F4D] shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-[#40251D]">Delivering To:</p>
                  <p>{searchedOrder.shippingAddress.fullName}</p>
                  <p>{searchedOrder.shippingAddress.addressLine1}, {searchedOrder.shippingAddress.city}, {searchedOrder.shippingAddress.state} - {searchedOrder.shippingAddress.pincode}</p>
                  <p className="text-stone-500 mt-1">Est. Arrival: <strong>{searchedOrder.estimatedDelivery || 'Within 3 days'}</strong></p>
                </div>
              </div>

            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-3xl border border-stone-200 p-6">
              <p className="font-bold text-[#40251D] mb-1">No order found with "{query}"</p>
              <p className="text-xs text-stone-500">Please check your email order receipt for the correct order number (e.g. PP-98210).</p>
            </div>
          )
        )}

      </div>
    </div>
  );
};


import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle2, Truck, PackageCheck, Printer, ArrowRight, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useStore } from '../context/StoreContext';

export const OrderConfirmationPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { orders } = useStore();

  const order = orders.find(o => o.id === id) || orders[0];

  useEffect(() => {
    // Fire celebratory confetti on mount
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#F8C6CF', '#A82F4D', '#78844B', '#FF647F']
      });
    } catch (e) {
      // ignore
    }
  }, []);

  const handlePrint = () => {
    window.print();
  };

  if (!order) {
    return (
      <div className="min-h-screen py-20 text-center">
        <p>Order not found.</p>
        <Link to="/" className="text-[#A82F4D] underline">Return Home</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFFDF9] py-10 sm:py-14 print:py-0 print:bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Printable Invoice Container */}
        <div className="bg-white rounded-3xl border border-[#F8C6CF] p-6 sm:p-10 shadow-sm print:shadow-none print:border-none print:p-0">
          
          {/* Header Banner */}
          <div className="text-center pb-8 border-b border-stone-200">
            <div className="w-16 h-16 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto mb-3 shadow-xs">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            <span className="font-script text-3xl text-[#A82F4D] block mb-1">
              Thank You for Your Order ♡
            </span>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#40251D] mb-2">
              Order Confirmed & Placed!
            </h1>
            <p className="text-xs sm:text-sm text-stone-600">
              An order confirmation has been emailed to <strong>{order.customer.email}</strong>.
            </p>
          </div>

          {/* Quick Tracking Card */}
          <div className="my-6 p-4 rounded-2xl bg-[#FFF9EF] border border-[#78844B]/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <p className="text-xs text-stone-500 uppercase font-bold tracking-wider">Order Number</p>
              <p className="text-base font-bold text-[#A82F4D] font-mono">{order.orderNumber}</p>
            </div>
            <div>
              <p className="text-xs text-stone-500 uppercase font-bold tracking-wider">Tracking Number</p>
              <p className="text-sm font-semibold text-[#40251D]">{order.trackingNumber || 'PPTRK9821045'}</p>
            </div>
            <div>
              <p className="text-xs text-stone-500 uppercase font-bold tracking-wider">Est. Delivery</p>
              <p className="text-sm font-semibold text-[#78844B]">{order.estimatedDelivery || '3-5 Business Days'}</p>
            </div>
          </div>

          {/* Customer & Shipping Summary */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 py-6 border-b border-stone-100 text-xs sm:text-sm">
            <div>
              <h4 className="font-bold text-[#40251D] mb-1">Customer Information</h4>
              <p className="text-stone-600">{order.customer.fullName}</p>
              <p className="text-stone-600">{order.customer.phone}</p>
              <p className="text-stone-600">{order.customer.email}</p>
            </div>
            <div>
              <h4 className="font-bold text-[#40251D] mb-1">Shipping Destination</h4>
              <p className="text-stone-600">{order.shippingAddress.addressLine1}</p>
              {order.shippingAddress.addressLine2 && <p className="text-stone-600">{order.shippingAddress.addressLine2}</p>}
              <p className="text-stone-600">{order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pincode}</p>
            </div>
          </div>

          {/* Order Items Table */}
          <div className="py-6 border-b border-stone-200">
            <h4 className="font-serif font-bold text-base text-[#40251D] mb-4">
              Items Purchased
            </h4>
            <div className="space-y-3">
              {order.items.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <img src={item.productImage} alt={item.productName} className="w-12 h-12 object-contain rounded-lg bg-stone-50 p-1" />
                    <div>
                      <p className="text-xs sm:text-sm font-bold text-[#40251D]">{item.productName}</p>
                      {item.variantName && <p className="text-[11px] text-[#A82F4D]">{item.variantName}</p>}
                      <p className="text-[11px] text-stone-500">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <span className="text-xs sm:text-sm font-bold text-[#40251D]">
                    ₹{item.price * item.quantity}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Financial Breakdown */}
          <div className="py-4 space-y-2 text-xs sm:text-sm text-stone-600">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{order.subtotal}</span>
            </div>
            {order.discountAmount > 0 && (
              <div className="flex justify-between text-[#A82F4D] font-semibold">
                <span>Discount Applied ({order.couponCode})</span>
                <span>-₹{order.discountAmount.toFixed(0)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Shipping Fee</span>
              <span>{order.shippingFee === 0 ? 'FREE' : `₹${order.shippingFee}`}</span>
            </div>
            <div className="flex justify-between text-base font-bold text-[#40251D] pt-2 border-t border-stone-200">
              <span>Total Paid</span>
              <span>₹{order.total.toFixed(0)}</span>
            </div>
          </div>

          {/* Printable Invoice Footer */}
          <div className="mt-8 pt-6 border-t border-stone-200 flex flex-wrap items-center justify-between gap-4 print:hidden">
            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-2 border border-stone-300 hover:bg-stone-50 text-stone-700 px-5 py-2.5 rounded-full text-xs font-bold transition-colors cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Download / Print Invoice</span>
            </button>

            <div className="flex items-center gap-3">
              <Link
                to="/track-order"
                className="inline-flex items-center gap-1.5 bg-[#FCE5E8] hover:bg-[#F8C6CF] text-[#A82F4D] px-5 py-2.5 rounded-full text-xs font-bold transition-colors"
              >
                <Truck className="w-4 h-4" />
                <span>Track Package</span>
              </Link>
              <Link
                to="/shop"
                className="inline-flex items-center gap-1.5 bg-[#A82F4D] hover:bg-[#8D253F] text-white px-5 py-2.5 rounded-full text-xs font-bold transition-colors shadow-xs"
              >
                <span>Continue Shopping</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

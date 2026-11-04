import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  CreditCard, 
  Lock, 
  Truck, 
  ArrowLeft, 
  CheckCircle, 
  AlertCircle,
  QrCode,
  Sparkles
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { PaymentMethod, ShippingAddress } from '../types';

declare global {
  interface Window {
    Razorpay: any;
  }
}

export const CheckoutPage: React.FC = () => {
  const { cart, subtotal, discountAmount, shippingFee, total, appliedCoupon, createOrder, showToast } = useStore();
  const navigate = useNavigate();

  // Form states
  const [formData, setFormData] = useState<ShippingAddress>({
    fullName: '',
    phone: '',
    email: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: 'Andhra Pradesh',
    pincode: '',
    orderNotes: ''
  });

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('upi');
  const [upiId, setUpiId] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-[#FFFDF9] py-20 text-center px-4">
        <h2 className="font-serif text-2xl font-bold text-[#40251D] mb-4">Your bag is empty</h2>
        <Link to="/shop" className="bg-[#A82F4D] text-white px-6 py-2.5 rounded-full text-xs font-semibold">
          Return to Shop
        </Link>
      </div>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    // Validation
    if (!formData.fullName || !formData.phone || !formData.email || !formData.addressLine1 || !formData.city || !formData.pincode) {
      setErrorMessage('Please fill in all required shipping address fields.');
      return;
    }

    if (formData.phone.length < 10) {
      setErrorMessage('Please enter a valid 10-digit mobile number.');
      return;
    }

    if (formData.pincode.length !== 6) {
      setErrorMessage('Please enter a valid 6-digit Indian PIN code.');
      return;
    }

    setIsProcessing(true);

    try {
      if (paymentMethod === 'razorpay') {
        // Razorpay Gateway Flow
        if (typeof window.Razorpay !== 'undefined') {
          const options = {
            key: 'rzp_test_pretty_palette',
            amount: Math.round(total * 100), // in paise
            currency: 'INR',
            name: 'Pretty Palette',
            description: 'Order Payment - Natural Beauty & Personal Care',
            image: '/assets/logo.png',
            prefill: {
              name: formData.fullName,
              email: formData.email,
              contact: formData.phone
            },
            theme: {
              color: '#A82F4D'
            },
            handler: function (response: any) {
              completeOrder('paid', 'razorpay');
            },
            modal: {
              ondismiss: function () {
                setIsProcessing(false);
                setErrorMessage('Payment was cancelled. You can retry or choose another payment method.');
              }
            }
          };
          const rzp = new window.Razorpay(options);
          rzp.open();
          return;
        } else {
          // Fallback simulation for dev/sandbox
          setTimeout(() => {
            completeOrder('paid', 'razorpay');
          }, 1500);
        }
      } else if (paymentMethod === 'upi') {
        // UPI Instant payment simulation
        setTimeout(() => {
          completeOrder('paid', 'upi');
        }, 1200);
      } else if (paymentMethod === 'card') {
        // Card Payment verification
        setTimeout(() => {
          completeOrder('paid', 'card');
        }, 1400);
      } else {
        // COD
        setTimeout(() => {
          completeOrder('pending', 'cod');
        }, 1000);
      }
    } catch (err: any) {
      setIsProcessing(false);
      setErrorMessage('Payment failed. Please verify your details and try again.');
    }
  };

  const completeOrder = (paymentStatus: 'paid' | 'pending', method: PaymentMethod) => {
    const orderItems = cart.map(i => ({
      productId: i.product.id,
      productName: i.product.name,
      productImage: i.product.image,
      price: i.product.price,
      quantity: i.quantity,
      variantName: i.selectedVariant?.name
    }));

    const newOrder = createOrder({
      customer: {
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone
      },
      shippingAddress: formData,
      items: orderItems,
      subtotal,
      shippingFee,
      discountAmount,
      couponCode: appliedCoupon?.code,
      total,
      paymentMethod: method,
      paymentStatus,
      orderStatus: 'placed'
    });

    setIsProcessing(false);
    navigate(`/order-confirmation/${newOrder.id}`);
  };

  return (
    <div className="min-h-screen bg-[#FFFDF9] py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            type="button"
            onClick={() => navigate('/cart')}
            className="flex items-center gap-1.5 text-xs font-semibold text-stone-500 hover:text-[#A82F4D]"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Bag
          </button>
          <div className="h-4 w-[1px] bg-stone-300" />
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#40251D]">
            Secure Checkout
          </h1>
          <div className="ml-auto flex items-center gap-1.5 text-xs text-[#78844B] font-semibold">
            <Lock className="w-3.5 h-3.5" /> 256-Bit SSL Encrypted
          </div>
        </div>

        {errorMessage && (
          <div className="mb-6 p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm flex items-center gap-3">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handlePlaceOrder}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* Form Fields Column (7 cols) */}
            <div className="lg:col-span-7 space-y-8">
              
              {/* 1. Contact Information */}
              <div className="bg-white rounded-3xl border border-[#F8C6CF] p-6 sm:p-8 shadow-xs">
                <h3 className="font-serif text-xl font-bold text-[#40251D] mb-4 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#A82F4D] text-white text-xs font-bold flex items-center justify-center">1</span>
                  Contact Information
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="text-xs font-bold text-stone-600 block mb-1">Full Name *</label>
                    <input
                      type="text"
                      name="fullName"
                      required
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="e.g. Ananya Rao"
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-stone-200 rounded-xl focus:outline-none focus:border-[#A82F4D]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-stone-600 block mb-1">Email Address * (For Order Confirmation)</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. ananya@gmail.com"
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-stone-200 rounded-xl focus:outline-none focus:border-[#A82F4D]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-stone-600 block mb-1">Mobile Number * (For Delivery Updates)</label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="10-digit phone number"
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-stone-200 rounded-xl focus:outline-none focus:border-[#A82F4D]"
                    />
                  </div>
                </div>
              </div>

              {/* 2. Shipping Address */}
              <div className="bg-white rounded-3xl border border-[#F8C6CF] p-6 sm:p-8 shadow-xs">
                <h3 className="font-serif text-xl font-bold text-[#40251D] mb-4 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#A82F4D] text-white text-xs font-bold flex items-center justify-center">2</span>
                  Shipping Address
                </h3>

                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-bold text-stone-600 block mb-1">Flat / House No. / Building / Street *</label>
                    <input
                      type="text"
                      name="addressLine1"
                      required
                      value={formData.addressLine1}
                      onChange={handleChange}
                      placeholder="e.g. House 4-B, Rose Villa, 2nd Cross"
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-stone-200 rounded-xl focus:outline-none focus:border-[#A82F4D]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-stone-600 block mb-1">Landmark / Locality (Optional)</label>
                    <input
                      type="text"
                      name="addressLine2"
                      value={formData.addressLine2}
                      onChange={handleChange}
                      placeholder="e.g. Near City Center Park"
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-stone-200 rounded-xl focus:outline-none focus:border-[#A82F4D]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="text-xs font-bold text-stone-600 block mb-1">City *</label>
                      <input
                        type="text"
                        name="city"
                        required
                        value={formData.city}
                        onChange={handleChange}
                        placeholder="e.g. Guntur / Hyderabad"
                        className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-stone-200 rounded-xl focus:outline-none focus:border-[#A82F4D]"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-stone-600 block mb-1">State *</label>
                      <select
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-stone-200 rounded-xl focus:outline-none focus:border-[#A82F4D]"
                      >
                        <option value="Andhra Pradesh">Andhra Pradesh</option>
                        <option value="Telangana">Telangana</option>
                        <option value="Karnataka">Karnataka</option>
                        <option value="Tamil Nadu">Tamil Nadu</option>
                        <option value="Maharashtra">Maharashtra</option>
                        <option value="Delhi">Delhi</option>
                        <option value="Other">Other States</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-stone-600 block mb-1">PIN Code *</label>
                      <input
                        type="text"
                        name="pincode"
                        required
                        maxLength={6}
                        value={formData.pincode}
                        onChange={handleChange}
                        placeholder="6-digit PIN"
                        className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-stone-200 rounded-xl focus:outline-none focus:border-[#A82F4D]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-stone-600 block mb-1">Special Order / Packaging Instructions (Optional)</label>
                    <textarea
                      name="orderNotes"
                      rows={2}
                      value={formData.orderNotes}
                      onChange={handleChange}
                      placeholder="e.g. Please ring bell twice or gift wrap with personal note"
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-stone-200 rounded-xl focus:outline-none focus:border-[#A82F4D]"
                    />
                  </div>
                </div>
              </div>

              {/* 3. Payment Method */}
              <div className="bg-white rounded-3xl border border-[#F8C6CF] p-6 sm:p-8 shadow-xs">
                <h3 className="font-serif text-xl font-bold text-[#40251D] mb-4 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#A82F4D] text-white text-xs font-bold flex items-center justify-center">3</span>
                  Select Payment Method
                </h3>

                <div className="space-y-3">
                  {/* UPI */}
                  <label className={`flex items-start gap-3.5 p-4 rounded-2xl border cursor-pointer transition-all ${
                    paymentMethod === 'upi' ? 'border-[#A82F4D] bg-[#FDF1F4]' : 'border-stone-200 hover:border-stone-300'
                  }`}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="upi"
                      checked={paymentMethod === 'upi'}
                      onChange={() => setPaymentMethod('upi')}
                      className="mt-1 accent-[#A82F4D]"
                    />
                    <div className="flex-grow">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-sm text-[#40251D]">UPI (Google Pay, PhonePe, Paytm, BHIM)</span>
                        <QrCode className="w-5 h-5 text-[#A82F4D]" />
                      </div>
                      <p className="text-xs text-stone-500 mt-0.5">Pay instantly via any UPI app or scan QR code.</p>
                      
                      {paymentMethod === 'upi' && (
                        <div className="mt-3">
                          <input
                            type="text"
                            placeholder="Enter your UPI ID (e.g. yourname@okhdfcbank)"
                            value={upiId}
                            onChange={(e) => setUpiId(e.target.value)}
                            className="w-full px-3 py-2 text-xs border border-stone-200 rounded-lg bg-white"
                          />
                        </div>
                      )}
                    </div>
                  </label>

                  {/* Razorpay */}
                  <label className={`flex items-start gap-3.5 p-4 rounded-2xl border cursor-pointer transition-all ${
                    paymentMethod === 'razorpay' ? 'border-[#A82F4D] bg-[#FDF1F4]' : 'border-stone-200 hover:border-stone-300'
                  }`}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="razorpay"
                      checked={paymentMethod === 'razorpay'}
                      onChange={() => setPaymentMethod('razorpay')}
                      className="mt-1 accent-[#A82F4D]"
                    />
                    <div className="flex-grow">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-sm text-[#40251D]">Razorpay (Cards, Net Banking & Wallets)</span>
                        <CreditCard className="w-5 h-5 text-[#A82F4D]" />
                      </div>
                      <p className="text-xs text-stone-500 mt-0.5">Supports all major Indian banks, debit & credit cards.</p>
                    </div>
                  </label>

                  {/* Cash on Delivery */}
                  <label className={`flex items-start gap-3.5 p-4 rounded-2xl border cursor-pointer transition-all ${
                    paymentMethod === 'cod' ? 'border-[#A82F4D] bg-[#FDF1F4]' : 'border-stone-200 hover:border-stone-300'
                  }`}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={paymentMethod === 'cod'}
                      onChange={() => setPaymentMethod('cod')}
                      className="mt-1 accent-[#A82F4D]"
                    />
                    <div className="flex-grow">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-sm text-[#40251D]">Cash on Delivery (COD)</span>
                        <Truck className="w-5 h-5 text-[#78844B]" />
                      </div>
                      <p className="text-xs text-stone-500 mt-0.5">Pay via cash or UPI when your package arrives at your doorstep.</p>
                    </div>
                  </label>
                </div>
              </div>

            </div>

            {/* Order Summary Column (5 cols) */}
            <div className="lg:col-span-5 bg-white rounded-3xl border border-[#F8C6CF] p-6 sm:p-8 shadow-sm space-y-6 sticky top-28">
              <h3 className="font-serif text-xl font-bold text-[#40251D] pb-3 border-b border-[#F8C6CF]/40">
                Order Review ({cart.reduce((s, i) => s + i.quantity, 0)} Items)
              </h3>

              {/* Items List */}
              <div className="max-h-60 overflow-y-auto space-y-3 pr-2">
                {cart.map((item) => (
                  <div key={`${item.product.id}-${item.selectedVariant?.id || 'd'}`} className="flex items-center gap-3">
                    <img src={item.product.image} alt={item.product.name} className="w-12 h-12 object-contain rounded-lg bg-[#FDF1F4] p-1 shrink-0" />
                    <div className="flex-grow min-w-0">
                      <p className="text-xs font-bold text-[#40251D] truncate">{item.product.name}</p>
                      <p className="text-[11px] text-stone-500">Qty: {item.quantity} {item.selectedVariant ? `• ${item.selectedVariant.name}` : ''}</p>
                    </div>
                    <span className="text-xs font-bold text-[#40251D]">₹{item.product.price * item.quantity}</span>
                  </div>
                ))}
              </div>

              {/* Price Details */}
              <div className="space-y-2 text-xs sm:text-sm text-stone-600 pt-3 border-t border-stone-100">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toFixed(0)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-[#A82F4D] font-semibold">
                    <span>Coupon Discount</span>
                    <span>-₹{discountAmount.toFixed(0)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Shipping Fee</span>
                  <span>{shippingFee === 0 ? <strong className="text-[#78844B]">FREE</strong> : `₹${shippingFee}`}</span>
                </div>
                <div className="flex justify-between text-base sm:text-lg font-bold text-[#40251D] pt-3 border-t border-stone-200">
                  <span>Amount to Pay</span>
                  <span>₹{total.toFixed(0)}</span>
                </div>
              </div>

              {/* Place Order CTA */}
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full bg-[#A82F4D] hover:bg-[#8D253F] disabled:opacity-50 text-white py-4 px-6 rounded-full font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {isProcessing ? (
                  <span>Processing Payment...</span>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Pay ₹{total.toFixed(0)} & Place Order</span>
                  </>
                )}
              </button>

              <div className="text-center text-[11px] text-stone-500 space-y-1">
                <p>🔒 Guaranteed 100% safe & verified transaction</p>
                <p>Delivery in 3-5 business days across India</p>
              </div>

            </div>

          </div>
        </form>

      </div>
    </div>
  );
};


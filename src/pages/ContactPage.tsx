import React, { useState } from 'react';
import { Phone, Mail, MapPin, Send, CheckCircle2, MessageCircle } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const ContactPage: React.FC = () => {
  const { cms, showToast } = useStore();
  const settings = cms.settings;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('Product Inquiry');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      showToast('Please fill out all required fields.');
      return;
    }

    const enquiries = JSON.parse(localStorage.getItem('pp_enquiries') || '[]');
    enquiries.push({
      id: `enq-${Date.now()}`,
      name,
      email,
      phone,
      subject,
      message,
      date: new Date().toISOString().split('T')[0],
      status: 'new'
    });
    localStorage.setItem('pp_enquiries', JSON.stringify(enquiries));

    setSubmitted(true);
    showToast('Your message has been received! Our beauty concierge will reply shortly ♡');
  };

  return (
    <div className="min-h-screen bg-[#FFFDF9] py-12 sm:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="font-script text-3xl sm:text-4xl text-[#A82F4D] block mb-2">
            We Would Love to Hear From You ♡
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#40251D] mb-3">
            Contact Pretty Palette
          </h1>
          <p className="text-sm sm:text-base text-stone-600">
            Have questions about your skincare routine, order delivery, or ingredients? Our friendly team is here to assist.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Contact Information Column (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Contact Card */}
            <div className="bg-white rounded-3xl border border-[#F8C6CF] p-6 sm:p-8 shadow-xs space-y-6">
              <h3 className="font-serif text-xl font-bold text-[#40251D]">
                Get in Touch
              </h3>

              <div className="space-y-4 text-xs sm:text-sm text-stone-700">
                <a 
                  href={`tel:${settings.phone}`}
                  className="flex items-start gap-3.5 p-3 rounded-2xl hover:bg-[#FDF1F4] transition-colors"
                >
                  <div className="w-10 h-10 rounded-full bg-[#FCE5E8] text-[#A82F4D] flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="font-bold text-[#40251D]">Phone / WhatsApp</h5>
                    <p className="text-stone-600">{settings.phone}</p>
                    <span className="text-[11px] text-stone-400">Mon - Sat: 9:30 AM – 7:00 PM IST</span>
                  </div>
                </a>

                <a 
                  href={`mailto:${settings.email}`}
                  className="flex items-start gap-3.5 p-3 rounded-2xl hover:bg-[#FDF1F4] transition-colors"
                >
                  <div className="w-10 h-10 rounded-full bg-[#FCE5E8] text-[#A82F4D] flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="font-bold text-[#40251D]">Official Support Email</h5>
                    <p className="text-stone-600 break-all">{settings.email}</p>
                    <p className="text-stone-500 break-all text-[11px]">{settings.supportEmail}</p>
                  </div>
                </a>

                <div className="flex items-start gap-3.5 p-3 rounded-2xl bg-stone-50/70">
                  <div className="w-10 h-10 rounded-full bg-[#FDF8EE] text-[#78844B] flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="font-bold text-[#40251D]">Registered Office & Studio</h5>
                    <p className="text-stone-600 leading-relaxed mt-0.5">
                      {settings.address}
                    </p>
                  </div>
                </div>
              </div>

              {/* Direct WhatsApp Chat Action */}
              <div className="pt-2">
                <a
                  href={`https://wa.me/917569399887?text=Hi%20Pretty%20Palette,%20I%20have%20an%20inquiry%20regarding%20your%20products`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full bg-[#78844B] hover:bg-[#5B6533] text-white py-3 px-5 rounded-full text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Chat on WhatsApp Directly</span>
                </a>
              </div>
            </div>

          </div>

          {/* Right Working Form Column (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-[#F8C6CF] p-6 sm:p-10 shadow-sm">
            <h3 className="font-serif text-2xl font-bold text-[#40251D] mb-2">
              Send Us a Message
            </h3>
            <p className="text-xs sm:text-sm text-stone-500 mb-6">
              Fill out the form below and our beauty experts will respond within 24 hours.
            </p>

            {submitted ? (
              <div className="py-12 text-center space-y-3">
                <div className="w-16 h-16 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="font-serif text-xl font-bold text-[#40251D]">Enquiry Received!</h4>
                <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto">
                  Thank you for reaching out to Pretty Palette. We have sent a confirmation copy to your email address.
                </p>
                <button
                  type="button"
                  onClick={() => { setSubmitted(false); setMessage(''); }}
                  className="mt-4 text-xs font-bold text-[#A82F4D] hover:underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-stone-600 block mb-1">Your Name *</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Meera Venkat"
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-stone-200 rounded-xl focus:outline-none focus:border-[#A82F4D]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-stone-600 block mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. meera@gmail.com"
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-stone-200 rounded-xl focus:outline-none focus:border-[#A82F4D]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-stone-600 block mb-1">Phone Number (Optional)</label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-stone-200 rounded-xl focus:outline-none focus:border-[#A82F4D]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-stone-600 block mb-1">Inquiry Subject</label>
                    <select
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-stone-200 rounded-xl focus:outline-none focus:border-[#A82F4D]"
                    >
                      <option value="Product Inquiry">Product Inquiry & Routine Guidance</option>
                      <option value="Order Tracking">Order Tracking & Shipping</option>
                      <option value="Return / Exchange">Return or Exchange Request</option>
                      <option value="Bulk / Wholesale">Artisanal Bulk / Wedding Gifting</option>
                      <option value="Other">General Feedback</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-stone-600 block mb-1">Your Message *</label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us what you'd like help with..."
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-stone-200 rounded-xl focus:outline-none focus:border-[#A82F4D]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#A82F4D] hover:bg-[#8D253F] text-white py-3.5 px-6 rounded-full font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message</span>
                </button>
              </form>
            )}

          </div>

        </div>

      </div>
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { MessageCircle } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const WhatsAppFloatingButton: React.FC = () => {
  const { cms } = useStore();
  const [isVisible, setIsVisible] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOverWhyChoose, setIsOverWhyChoose] = useState(false);

  // 1. Observe Why Choose Us section to hide WhatsApp button when in this section
  useEffect(() => {
    const whyChooseElement = document.getElementById('why-choose-us');
    if (!whyChooseElement) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        // If Why Choose section is visible on screen, hide WhatsApp button
        setIsOverWhyChoose(entry.isIntersecting);
      },
      {
        root: null,
        // Trigger as soon as Why Choose approaches viewport top or bottom
        rootMargin: '120px 0px 120px 0px',
        threshold: 0
      }
    );

    observer.observe(whyChooseElement);
    return () => observer.disconnect();
  }, []);

  // 2. Listen to global modal state events to hide WhatsApp button when any popup is open
  useEffect(() => {
    const handleModalState = (e: Event) => {
      const customEvent = e as CustomEvent<{ isOpen: boolean }>;
      setIsModalOpen(!!customEvent.detail?.isOpen);
    };

    window.addEventListener('pp-modal-state', handleModalState);
    return () => window.removeEventListener('pp-modal-state', handleModalState);
  }, []);

  // Compute final visibility: Must NOT be visible over Why Choose section OR during any active popup
  const shouldShow = isVisible && !isOverWhyChoose && !isModalOpen;

  const whatsappUrl = cms.settings?.socialLinks?.whatsapp || `https://wa.me/917569399887?text=${encodeURIComponent(
    'Hi Pretty Palette, I would like to inquire about your handcrafted botanical beauty products.'
  )}`;

  return (
    <div
      className={`fixed bottom-6 right-6 z-30 transition-all duration-300 transform ${
        shouldShow
          ? 'opacity-100 pointer-events-auto scale-100 translate-y-0'
          : 'opacity-0 pointer-events-none scale-75 translate-y-4'
      }`}
      aria-hidden={!shouldShow}
    >
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center justify-center w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#25D366] hover:bg-[#20BD5A] text-white shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-108 active:scale-95 cursor-pointer"
        aria-label="Chat with Pretty Palette on WhatsApp"
        title="Chat on WhatsApp (+91 7569399887)"
      >
        {/* Soft pulse ring effect */}
        <span className="absolute -inset-1 rounded-full bg-[#25D366] opacity-35 animate-ping -z-10 group-hover:opacity-0" />

        {/* WhatsApp Icon */}
        <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7 fill-white text-[#25D366]" />

        {/* Desktop Tooltip */}
        <span className="hidden sm:block absolute right-16 top-1/2 -translate-y-1/2 bg-stone-900/90 text-white text-xs font-semibold px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap shadow-md">
          Chat with us ♡
        </span>
      </a>
    </div>
  );
};

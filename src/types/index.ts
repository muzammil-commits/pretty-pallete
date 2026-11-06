export type CategoryType = 'cosmetics' | 'skin-care' | 'hair-care';

export interface ProductVariant {
  id: string;
  name: string;
  inStock: boolean;
  colorHex?: string;
  sku?: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: CategoryType;
  price: number;
  originalPrice: number;
  discount: number;
  rating: number;
  reviewCount: number;
  image: string;
  gallery: string[];
  description: string;
  shortDescription: string;
  ingredients: string[];
  usageInstructions: string[];
  benefits: string[];
  inStock: boolean;
  stockCount: number;
  isBestSeller: boolean;
  isFeatured: boolean;
  variants?: ProductVariant[];
  size?: string;
  badge?: string;
  sku?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedVariant?: ProductVariant;
}

export interface ShippingAddress {
  fullName: string;
  phone: string;
  email: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  pincode: string;
  orderNotes?: string;
}

export type OrderStatus = 'placed' | 'processing' | 'dispatched' | 'in_transit' | 'delivered' | 'cancelled';
export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded';
export type PaymentMethod = 'razorpay' | 'upi' | 'card' | 'netbanking' | 'cod';

export interface OrderItem {
  productId: string;
  productName: string;
  productImage: string;
  price: number;
  quantity: number;
  variantName?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  customer: {
    fullName: string;
    email: string;
    phone: string;
  };
  shippingAddress: ShippingAddress;
  items: OrderItem[];
  subtotal: number;
  shippingFee: number;
  discountAmount: number;
  couponCode?: string;
  total: number;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  orderStatus: OrderStatus;
  trackingNumber?: string;
  courierName?: string;
  estimatedDelivery?: string;
  createdAt: string;
}

export interface Review {
  id: string;
  productId: string;
  authorName: string;
  rating: number;
  title: string;
  comment: string;
  date: string;
  verifiedPurchase: boolean;
}

export interface Coupon {
  code: string;
  discountType: 'percentage' | 'fixed';
  value: number;
  minOrderAmount: number;
  description: string;
  isActive: boolean;
  expiryDate?: string;
}

export interface ContactEnquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  date: string;
  status: 'new' | 'read' | 'replied';
}

export interface HomepageCMS {
  announcementBar: {
    text: string;
    enabled: boolean;
    link?: string;
  };
  hero: {
    mode: 'image' | 'video';
    videoUrl?: string;
    slides: Array<{
      id: string;
      badge: string;
      title: string;
      subtitle: string;
      ctaText: string;
      ctaLink: string;
      taglineTopRight?: string;
      bgImage: string;
    }>;
  };
  benefits: Array<{
    id: string;
    title: string;
    icon: string;
  }>;
  categories: Array<{
    id: string;
    name: string;
    tagline: string;
    image: string;
    link: string;
  }>;
  about: {
    heading: string;
    text: string;
    image: string;
    storyLink: string;
    vision: string;
    mission: string;
    values: string;
  };
  whyChoose: {
    heading: string;
    scriptHeading: string;
    description: string;
    items: Array<{
      id: string;
      title: string;
      description: string;
      icon: string;
    }>;
  };
  newsletter: {
    heading: string;
    description: string;
  };
  settings: {
    freeShippingThreshold: number;
    shippingFee: number;
    phone: string;
    email: string;
    supportEmail: string;
    address: string;
    whatsapp: string;
    socialLinks: {
      instagram: string;
      facebook: string;
      youtube: string;
      pinterest: string;
      whatsapp: string;
    };
  };
}


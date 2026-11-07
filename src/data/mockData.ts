import { Product, HomepageCMS, Coupon, Order, Review, DailyRitualCMS, DailyRitualStep } from '../types';

export const INITIAL_DAILY_RITUAL: DailyRitualCMS = {
  scriptHeading: 'The Art of Self-Care ♡',
  heading: 'The 4-Step Daily Glow Ritual',
  description: 'Beauty is not a chore — it is your daily sanctuary. Follow our Ayurvedic nature-inspired routine to unlock your healthiest, lit-from-within complexion.',
  steps: [
    {
      id: 'step-1',
      number: '01',
      title: 'Purify & Awaken',
      action: 'Cleanse',
      time: 'Morning & Evening',
      description: 'Remove environmental toxins, unclog micro-pores and purify skin with our sulphate-free botanical face cleanser infused with rose water and gotu kola.',
      productName: 'Botanical Clarifying Wash',
      price: 299,
      image: '/assets/ritual-step-1.png',
      tips: 'Massage in gentle upward circular motions for 60 seconds with lukewarm water.',
      categoryLink: '/skin-care'
    },
    {
      id: 'step-2',
      number: '02',
      title: 'Replenish & Balance',
      action: 'Tone & Mist',
      time: 'Post-Cleanse / Anytime',
      description: 'Spritz pure steam-distilled Damask rose water across face and neck to re-establish the skin’s physiological acid mantle and prepare cells for serum absorption.',
      productName: 'Rose & Hibiscus Hydrating Mist',
      price: 349,
      image: '/assets/ritual-step-2.png',
      tips: 'Pat gently onto damp skin. Do not let it fully dry before applying your serum.',
      categoryLink: '/skin-care'
    },
    {
      id: 'step-3',
      number: '03',
      title: 'Illuminate & Repair',
      action: 'Treat',
      time: 'Daily Ritual',
      description: 'Infuse deep dermal layers with Kashmiri Mogra saffron, ethyl ascorbic acid and hyaluronic acid to erase dullness and reverse free radical damage.',
      productName: 'Kashmiri Saffron Glow Serum',
      price: 549,
      image: '/assets/ritual-step-3.png',
      tips: 'Warm 3 to 4 drops between clean palms and press gently into face, neck, and decollete.',
      categoryLink: '/skin-care'
    },
    {
      id: 'step-4',
      number: '04',
      title: 'Lock In Luminous Moisture',
      action: 'Protect & Glow',
      time: 'Final Seal',
      description: 'Seal in hydration with our signature Radiance Day Cream, fortified with cold-pressed rosehip seed oil and botanical squalane for 24-hour glow.',
      productName: 'Radiance Day Cream',
      price: 499,
      image: '/assets/ritual-step-4.png',
      tips: 'Follow with lead-free Matte Lust Lipstick or Lip & Cheek Tint for effortless natural radiance.',
      categoryLink: '/skin-care'
    }
  ]
};

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'Matte Lust Lipstick',
    slug: 'matte-lust-lipstick',
    category: 'cosmetics',
    price: 299,
    originalPrice: 499,
    discount: 40,
    rating: 4.8,
    reviewCount: 1200,
    image: '/assets/bestseller-lipstick.png',
    gallery: [
      '/assets/bestseller-lipstick.png',
      'https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1599732487401-49b49b392a83?auto=format&fit=crop&w=800&q=80',
    ],
    shortDescription: 'Velvety smooth, long-stay matte lipstick infused with hydrating botanical oils.',
    description: 'Experience pure pigment and weightless comfort with Matte Lust Lipstick. Hand-crafted with organic jojoba oil, shea butter, and natural mineral pigments, this lipstick delivers a rich velvet-matte finish that hydrates your lips for up to 12 hours without flaking or bleeding.',
    ingredients: [
      'Organic Jojoba Oil',
      'Cold-Pressed Almond Oil',
      'Shea Butter',
      'Candelilla Wax',
      'Vitamin E Acetate',
      'Natural Mineral Mica'
    ],
    usageInstructions: [
      'Exfoliate lips gently for a smooth canvas.',
      'Apply directly from the bullet starting from center outward.',
      'Blot with tissue and reapply for extended wear.'
    ],
    benefits: [
      '12-Hour Non-Drying Matte Finish',
      '100% Lead-Free & Toxin-Free',
      'Nourishing Botanical Formulation',
      'Cruelty-Free & Vegan'
    ],
    inStock: true,
    stockCount: 85,
    isBestSeller: true,
    isFeatured: true,
    variants: [
      { id: 'v-1', name: 'Ruby Romance (#A82F4D)', colorHex: '#A82F4D', inStock: true },
      { id: 'v-2', name: 'Petal Rose (#E98B9B)', colorHex: '#E98B9B', inStock: true },
      { id: 'v-3', name: 'Nude Blush (#D9988D)', colorHex: '#D9988D', inStock: true },
      { id: 'v-4', name: 'Berry Velvet (#721C34)', colorHex: '#721C34', inStock: true },
    ],
    size: '4.2g'
  },
  {
    id: 'prod-2',
    name: 'Radiance Face Cream',
    slug: 'radiance-face-cream',
    category: 'skin-care',
    price: 499,
    originalPrice: 699,
    discount: 28,
    rating: 4.8,
    reviewCount: 966,
    image: '/assets/bestseller-facecream.png',
    gallery: [
      '/assets/bestseller-facecream.png',
      'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1608248597359-0091fb72d42d?auto=format&fit=crop&w=800&q=80',
    ],
    shortDescription: 'Ultra-nourishing daylight moisturizer with saffron, rosehip & gotu kola for lit-from-within glow.',
    description: 'Awaken luminous, healthy skin with our best-selling Radiance Face Cream. Packed with pure Kashmiri saffron extract, cold-pressed rosehip seed oil, and soothing aloe vera, this lightweight formula repairs the moisture barrier while imparting a natural dewy radiance without any greasy residue.',
    ingredients: [
      'Kashmiri Saffron (Crocus Sativus)',
      'Cold-Pressed Rosehip Seed Oil',
      'Gotu Kola (Centella Asiatica)',
      'Hyaluronic Acid (Plant-Derived)',
      'Aloe Barbadensis Leaf Juice',
      'Niacinamide (Vitamin B3)'
    ],
    usageInstructions: [
      'Cleanse face and pat dry.',
      'Take a dime-sized amount on fingertips.',
      'Gently massage in upward circular motions across face & neck.',
      'Use every morning and night.'
    ],
    benefits: [
      'Deep 24-Hour Hydration',
      'Reduces Pigmentation & Dark Spots',
      'Improves Skin Elasticity & Firmness',
      'Suitable for Sensitive Skin'
    ],
    inStock: true,
    stockCount: 120,
    isBestSeller: true,
    isFeatured: true,
    variants: [
      { id: 'v-5', name: '50g Glass Jar', inStock: true },
      { id: 'v-6', name: '100g Value Pack', inStock: true },
    ],
    size: '50g'
  },
  {
    id: 'prod-3',
    name: 'Nourishing Hair Oil',
    slug: 'nourishing-hair-oil',
    category: 'hair-care',
    price: 399,
    originalPrice: 499,
    discount: 20,
    rating: 4.8,
    reviewCount: 744,
    image: '/assets/bestseller-hairoil.png',
    gallery: [
      '/assets/bestseller-hairoil.png',
      'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80',
    ],
    shortDescription: 'Ayurvedic 18-herb infusion to strengthen hair roots, stop hair fall and stimulate growth.',
    description: 'Infused with cold-pressed virgin coconut oil, bhringraj, amla, and rosemary essential oil, this traditional Ayurvedic potion penetrates deep into hair follicles. It combats dandruff, stops premature greying, and restores luscious gloss and resilience to stressed tresses.',
    ingredients: [
      'Bhringraj Extract',
      'Amla (Indian Gooseberry)',
      'Rosemary Essential Oil',
      'Virgin Coconut Oil',
      'Cold-Pressed Sesame Seed Oil',
      'Fenugreek Seeds (Methi)'
    ],
    usageInstructions: [
      'Warm a few drops in your palms.',
      'Massage gently into roots and scalp for 10 minutes.',
      'Leave on for at least 1 hour or overnight.',
      'Wash off with mild sulphate-free shampoo.'
    ],
    benefits: [
      'Clinically Proven to Reduce Hair Fall',
      'Stimulates Active Hair Follicles',
      'Controls Scalp Flakes & Itchiness',
      'Mineral Oil & Silicon Free'
    ],
    inStock: true,
    stockCount: 64,
    isBestSeller: true,
    isFeatured: true,
    variants: [
      { id: 'v-7', name: '100ml Dropper Bottle', inStock: true },
      { id: 'v-8', name: '200ml Family Pack', inStock: true },
    ],
    size: '100ml'
  },
  {
    id: 'prod-4',
    name: 'Herbal Kajal',
    slug: 'herbal-kajal',
    category: 'cosmetics',
    price: 199,
    originalPrice: 249,
    discount: 20,
    rating: 4.8,
    reviewCount: 620,
    image: '/assets/bestseller-kajal.png',
    gallery: [
      '/assets/bestseller-kajal.png',
      'https://images.unsplash.com/photo-1597225244660-1cd128c64284?auto=format&fit=crop&w=800&q=80',
    ],
    shortDescription: 'Traditional soot kajal infused with pure cow ghee and camphor to cool and define eyes.',
    description: 'Handmade following centuries-old artisanal traditions. Prepared with pure organic cow ghee, castor oil, and cooling natural camphor soot. This smudge-resistant kajal defines your eyes with intense jet-black pigment while soothing tired eyes and promoting eyelash growth.',
    ingredients: [
      'Pure Desi Cow Ghee',
      'Organic Castor Oil',
      'Natural Camphor (Kapoor)',
      'Triphala Soot',
      'Almond Oil Extract'
    ],
    usageInstructions: [
      'Glide gently across waterline or lash line.',
      'Smudge with brush tip for smoky eye effect if desired.',
      'Safe for sensitive eyes and contact lens wearers.'
    ],
    benefits: [
      'Zero Synthetic Dyes or Preservatives',
      'Soothes & Cools Fatigued Eyes',
      'Deep Jet Black Pigmentation',
      'Gentle & 100% Natural'
    ],
    inStock: true,
    stockCount: 95,
    isBestSeller: true,
    isFeatured: true,
    size: '3g'
  },
  {
    id: 'prod-5',
    name: 'Glow Boosting Vitamin C Serum',
    slug: 'glow-boosting-vitamin-c-serum',
    category: 'skin-care',
    price: 549,
    originalPrice: 799,
    discount: 31,
    rating: 4.9,
    reviewCount: 420,
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1608248597359-0091fb72d42d?auto=format&fit=crop&w=800&q=80',
    ],
    shortDescription: '15% Ethyl Ascorbic Acid serum with ferulic acid & hyaluronic acid for spotless glow.',
    description: 'A potent, non-irritating antioxidant elixir that fades sunspots, refines skin texture, and defends against environmental pollutants.',
    ingredients: ['15% Ethyl Ascorbic Acid', 'Ferulic Acid', 'Kakadu Plum', 'Hyaluronic Acid'],
    usageInstructions: ['Apply 3-4 drops after cleansing.', 'Follow with moisturizer and sunscreen.'],
    benefits: ['Evens Skin Tone', 'Fades Dark Spots', 'Boosts Collagen Synthesis'],
    inStock: true,
    stockCount: 48,
    isBestSeller: false,
    isFeatured: true,
    size: '30ml'
  },
  {
    id: 'prod-6',
    name: 'Rose & Hibiscus Hydrating Mist',
    slug: 'rose-hibiscus-hydrating-mist',
    category: 'skin-care',
    price: 349,
    originalPrice: 449,
    discount: 22,
    rating: 4.7,
    reviewCount: 310,
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80',
    ],
    shortDescription: 'Steam-distilled pure Kannauj rose water with hibiscus extract to hydrate & tone skin.',
    description: 'Refreshing facial toner and makeup setting mist distilled from fresh Indian Damask roses.',
    ingredients: ['Kannauj Damask Rose Hydrosol', 'Hibiscus Sabdariffa Extract', 'Vegetable Glycerin'],
    usageInstructions: ['Spritz generously over face anytime for an instant surge of hydration.'],
    benefits: ['Balances Skin pH', 'Tightens Pores', 'Instantly Refreshes'],
    inStock: true,
    stockCount: 80,
    isBestSeller: false,
    isFeatured: true,
    size: '100ml'
  },
  {
    id: 'prod-7',
    name: 'Sulphate-Free Onion & Rosemary Shampoo',
    slug: 'sulphate-free-onion-rosemary-shampoo',
    category: 'hair-care',
    price: 449,
    originalPrice: 599,
    discount: 25,
    rating: 4.8,
    reviewCount: 512,
    image: '/assets/full-shampoo.png',
    gallery: [
      '/assets/full-shampoo.png',
    ],
    shortDescription: 'Gentle clarifying shampoo that cleanses without stripping natural scalp moisture.',
    description: 'Formulated with organic red onion seed oil, plant keratin, and soothing rosemary to strengthen fragile roots.',
    ingredients: ['Red Onion Seed Oil', 'Plant Keratin', 'Rosemary Oil', 'Aloe Leaf Juice'],
    usageInstructions: ['Apply to wet scalp, massage gently to create lather, rinse thoroughly.'],
    benefits: ['Zero Sulphates & Parabens', 'Reduces Breakage', 'Color Safe'],
    inStock: true,
    stockCount: 75,
    isBestSeller: false,
    isFeatured: true,
    size: '250ml'
  },
  {
    id: 'prod-8',
    name: 'Silky Keratin Hair Conditioner',
    slug: 'silky-keratin-hair-conditioner',
    category: 'hair-care',
    price: 429,
    originalPrice: 549,
    discount: 21,
    rating: 4.7,
    reviewCount: 290,
    image: 'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=800&q=80',
    ],
    shortDescription: 'Intense moisture rinse-off conditioner with argan butter and silk amino acids.',
    description: 'Eliminate frizz and seal in sleek shine with this indulgent botanical conditioner.',
    ingredients: ['Moroccan Argan Butter', 'Silk Amino Acids', 'Shea Butter', 'Panthenol'],
    usageInstructions: ['Apply along hair lengths after shampooing, leave for 3 minutes, rinse.'],
    benefits: ['Tames Unruly Frizz', 'Detangles Effortlessly', 'Adds Mirror-Like Shine'],
    inStock: true,
    stockCount: 55,
    isBestSeller: false,
    isFeatured: false,
    size: '200ml'
  },
  {
    id: 'prod-9',
    name: 'Petal Soft Lip & Cheek Tint',
    slug: 'petal-soft-lip-cheek-tint',
    category: 'cosmetics',
    price: 349,
    originalPrice: 499,
    discount: 30,
    rating: 4.9,
    reviewCount: 380,
    image: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=800&q=80',
    ],
    shortDescription: 'Dual-use beetroot & pomegranate cheek & lip stain for effortless everyday flush.',
    description: 'Lightweight, blendable tint infused with pomegranate extract and organic beetroot for that naturally flushed beauty look.',
    ingredients: ['Beetroot Extract', 'Pomegranate Juice', 'Almond Oil', 'Vitamin E'],
    usageInstructions: ['Dab a drop onto cheekbones and lips, blend with fingertips.'],
    benefits: ['Multi-Use 2-in-1', 'Long Lasting Stain', 'No Artificial Dyes'],
    inStock: true,
    stockCount: 90,
    isBestSeller: false,
    isFeatured: true,
    variants: [
      { id: 'v-9', name: 'Cherry Blossom', colorHex: '#E98B9B', inStock: true },
      { id: 'v-10', name: 'Coral Sunshine', colorHex: '#FF7F50', inStock: true },
    ],
    size: '8ml'
  },
  {
    id: 'prod-10',
    name: 'Botanical Compact Powder',
    slug: 'botanical-compact-powder',
    category: 'cosmetics',
    price: 399,
    originalPrice: 599,
    discount: 33,
    rating: 4.8,
    reviewCount: 215,
    image: 'https://images.unsplash.com/photo-1590156221185-c421524b0736?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1590156221185-c421524b0736?auto=format&fit=crop&w=800&q=80',
    ],
    shortDescription: 'Finely milled translucent setting powder with rice starch and green tea.',
    description: 'Controls oil and sets makeup for an airbrushed, shine-free finish that breathes.',
    ingredients: ['Rice Starch', 'Green Tea Extract', 'Zinc Oxide', 'Mica'],
    usageInstructions: ['Press gently onto T-zone and oily areas with the included velvet puff.'],
    benefits: ['Non-Comedogenic', 'Blurring Filter Effect', 'Talc-Free Formula'],
    inStock: true,
    stockCount: 40,
    isBestSeller: false,
    isFeatured: false,
    size: '9g'
  }
];

export const INITIAL_CMS: HomepageCMS = {
  announcementBar: {
    text: 'Free Shipping on Orders Above ₹999 | Glow Naturally, Live Beautifully ✨',
    enabled: true,
    link: '/shop'
  },
  hero: {
    mode: 'image',
    videoUrl: '',
    slides: [
      {
        id: 'slide-1',
        badge: 'Pretty Palette ♡',
        title: 'Natural Beauty,\nNaturally You ♡',
        subtitle: 'Discover premium cosmetics, skincare and haircare products crafted with care.',
        ctaText: 'Shop Now',
        ctaLink: '/shop',
        taglineTopRight: 'Care\nGlow\nRepeat ♡',
        bgImage: '/assets/hero-bg.png'
      },
      {
        id: 'slide-2',
        badge: 'Pure Botanical Care ♡',
        title: 'Skin That Glows,\nNaturally Reborn ♡',
        subtitle: 'Hand-blended with saffron, rosehip and cold-pressed botanical botanicals.',
        ctaText: 'Explore Skincare',
        ctaLink: '/skin-care',
        taglineTopRight: 'Nourish\nProtect\nGlow ♡',
        bgImage: '/assets/hero-bg.png'
      },
      {
        id: 'slide-3',
        badge: 'Hair Wellness Rituals ♡',
        title: 'Stronger, Healthier,\nHappier Hair ♡',
        subtitle: 'Traditional 18-herb Ayurvedic oils and sulphate-free cleansing elixirs.',
        ctaText: 'Explore Haircare',
        ctaLink: '/hair-care',
        taglineTopRight: 'Pure\nGentle\nSafe ♡',
        bgImage: '/assets/hero-bg.png'
      }
    ]
  },
  benefits: [
    { id: 'b-1', title: '100% Natural Ingredients', icon: 'Leaf' },
    { id: 'b-2', title: 'Cruelty-Free Beauty', icon: 'Heart' },
    { id: 'b-3', title: 'Premium Quality Products', icon: 'Diamond' },
    { id: 'b-4', title: 'Made With Love', icon: 'HeartHandshake' },
    { id: 'b-5', title: 'Dedicated Support', icon: 'Headphones' }
  ],
  categories: [
    {
      id: 'cosmetics',
      name: 'Cosmetics',
      tagline: 'Makeup essentials for every mood.',
      image: '/assets/cat-cosmetics.png',
      link: '/cosmetics'
    },
    {
      id: 'skin-care',
      name: 'Skin Care',
      tagline: 'Nourish. Protect. Glow.',
      image: '/assets/cat-skincare.png',
      link: '/skin-care'
    },
    {
      id: 'hair-care',
      name: 'Hair Care',
      tagline: 'Stronger. Healthier. Happier Hair.',
      image: '/assets/cat-haircare.png',
      link: '/hair-care'
    }
  ],
  about: {
    heading: 'About Pretty Palette ♡',
    text: "At Pretty Palette, we believe beauty is more than just appearance — it's about self-care, confidence and natural goodness. Our handmade and premium-quality products are crafted with nature-inspired ingredients to bring out your natural glow.",
    image: '/assets/about-framed.png',
    storyLink: '/about-us',
    vision: 'To be a trusted beauty brand for everyone.',
    mission: 'To provide natural, safe & high-quality beauty products.',
    values: 'Quality, Care, Transparency.'
  },
  whyChoose: {
    heading: 'WHY CHOOSE',
    scriptHeading: 'Pretty Palette? ♡',
    description: 'We believe in the power of nature and the goodness of safe ingredients. Each product is thoughtfully handmade to bring out the best in you because you deserve beauty that cares.',
    items: [
      {
        id: 'wc-1',
        title: 'HANDMADE',
        description: 'Made in small batches with love and care.',
        icon: 'Sparkles'
      },
      {
        id: 'wc-2',
        title: 'SKIN SAFE',
        description: 'Gentle, non-toxic & suitable for all skin types.',
        icon: 'ShieldCheck'
      },
      {
        id: 'wc-3',
        title: 'CRUELTY FREE',
        description: 'We never test on animals.',
        icon: 'Heart'
      },
      {
        id: 'wc-4',
        title: 'SULPHATE FREE',
        description: 'No harmful chemicals, only clean beauty.',
        icon: 'Droplets'
      }
    ]
  },
  newsletter: {
    heading: 'Stay Beautiful, Stay Connected ♡',
    description: 'Subscribe for exclusive beauty tips, offers and updates!'
  },
  dailyRitual: INITIAL_DAILY_RITUAL,
  settings: {
    freeShippingThreshold: 999,
    shippingFee: 99,
    phone: '+91 7569399887',
    email: 'contact@prettypalette.shop',
    supportEmail: 'support@prettypalette.shop',
    address: 'Sri Sai Raghavendra Nilayam, Vysya Bank Employees Colony, 2nd Lane, Guntur – 522034, Andhra Pradesh, India.',
    whatsapp: '+917569399887',
    socialLinks: {
      instagram: 'https://instagram.com/prettypalette',
      facebook: 'https://facebook.com/prettypalette',
      youtube: 'https://youtube.com',
      pinterest: 'https://pinterest.com',
      whatsapp: 'https://wa.me/917569399887'
    }
  }
};

export const INITIAL_COUPONS: Coupon[] = [
  {
    code: 'PRETTYVIP',
    discountType: 'percentage',
    value: 15,
    minOrderAmount: 399,
    description: '15% VIP discount for mindful beauty lovers',
    isActive: true
  },
  {
    code: 'WELCOME10',
    discountType: 'percentage',
    value: 10,
    minOrderAmount: 499,
    description: '10% OFF on your first purchase above ₹499',
    isActive: true
  },
  {
    code: 'GLOW20',
    discountType: 'percentage',
    value: 20,
    minOrderAmount: 1499,
    description: '20% OFF on premium beauty orders above ₹1499',
    isActive: true
  },
  {
    code: 'PRETTY50',
    discountType: 'fixed',
    value: 50,
    minOrderAmount: 599,
    description: 'Flat ₹50 OFF on orders above ₹599',
    isActive: true
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    productId: 'prod-1',
    authorName: 'Priya Sharma',
    rating: 5,
    title: 'The best natural matte lipstick!',
    comment: 'I am in love with the Ruby Romance shade! It stays on for hours and does not dry my lips at all. Packaging is so luxurious and feels handmade with immense care.',
    date: '2026-10-24',
    verifiedPurchase: true
  },
  {
    id: 'rev-2',
    productId: 'prod-2',
    authorName: 'Ananya Reddy',
    rating: 5,
    title: 'Holy grail for dull skin',
    comment: 'Within two weeks my skin tone is visibly more radiant and hydrated. Smells heavenly like pure saffron and roses.',
    date: '2026-10-18',
    verifiedPurchase: true
  },
  {
    id: 'rev-3',
    productId: 'prod-3',
    authorName: 'Sneha Patel',
    rating: 5,
    title: 'Hair fall stopped in 3 weeks',
    comment: 'Authentic Ayurvedic oil. The herbal smell gives such a relaxing champi experience. Highly recommend to everyone struggling with post-monsoon hair fall.',
    date: '2026-10-10',
    verifiedPurchase: true
  },
  {
    id: 'rev-4',
    productId: 'prod-4',
    authorName: 'Kavitha M.',
    rating: 5,
    title: 'Gentle on sensitive eyes',
    comment: 'Finally a kajal that does not sting my eyes! The cow ghee and camphor give a cooling sensation that feels so refreshing.',
    date: '2026-10-02',
    verifiedPurchase: true
  }
];

export const INITIAL_ORDERS: Order[] = [];


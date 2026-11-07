-- ============================================================================
-- PRETTY PALETTE - SUPABASE DATABASE SCHEMA MIGRATION
-- Project: https://qdafyowujujuqlwfmxwh.supabase.co
-- Run this script in the Supabase SQL Editor (Dashboard > SQL Editor > New query)
-- ============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ----------------------------------------------------------------------------
-- 1. CATEGORIES TABLE
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.categories (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    tagline TEXT,
    description TEXT,
    image TEXT,
    badge TEXT,
    display_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    seo_title TEXT,
    seo_description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ----------------------------------------------------------------------------
-- 2. PRODUCTS TABLE
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.products (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    category TEXT NOT NULL,
    price NUMERIC(10, 2) NOT NULL DEFAULT 0,
    original_price NUMERIC(10, 2) NOT NULL DEFAULT 0,
    discount INT DEFAULT 0,
    rating NUMERIC(3, 2) DEFAULT 5.0,
    review_count INT DEFAULT 0,
    image TEXT NOT NULL,
    gallery JSONB DEFAULT '[]'::jsonb,
    description TEXT,
    short_description TEXT,
    ingredients JSONB DEFAULT '[]'::jsonb,
    usage_instructions JSONB DEFAULT '[]'::jsonb,
    benefits JSONB DEFAULT '[]'::jsonb,
    in_stock BOOLEAN DEFAULT TRUE,
    stock_count INT DEFAULT 100,
    is_best_seller BOOLEAN DEFAULT FALSE,
    is_featured BOOLEAN DEFAULT FALSE,
    is_new_arrival BOOLEAN DEFAULT FALSE,
    status TEXT DEFAULT 'published', -- 'draft', 'published', 'archived'
    variants JSONB DEFAULT '[]'::jsonb,
    size TEXT,
    badge TEXT,
    sku TEXT,
    seo_title TEXT,
    seo_description TEXT,
    seo_keywords TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexing for fast search and category filtering
CREATE INDEX IF NOT EXISTS idx_products_category ON public.products(category);
CREATE INDEX IF NOT EXISTS idx_products_status ON public.products(status);
CREATE INDEX IF NOT EXISTS idx_products_slug ON public.products(slug);

-- ----------------------------------------------------------------------------
-- 3. SERVICES TABLE
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.services (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    tagline TEXT,
    description TEXT,
    price NUMERIC(10, 2) DEFAULT 0,
    duration TEXT,
    features JSONB DEFAULT '[]'::jsonb,
    image TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    display_order INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ----------------------------------------------------------------------------
-- 4. HOMEPAGE CMS TABLE
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.homepage_cms (
    id TEXT PRIMARY KEY DEFAULT 'master_cms',
    announcement_bar JSONB NOT NULL DEFAULT '{"text": "Free Shipping on Orders Above ₹999 | Glow Naturally, Live Beautifully ✨", "enabled": true}'::jsonb,
    hero JSONB NOT NULL DEFAULT '{"mode": "image", "slides": []}'::jsonb,
    benefits JSONB NOT NULL DEFAULT '[]'::jsonb,
    categories JSONB NOT NULL DEFAULT '[]'::jsonb,
    about JSONB NOT NULL DEFAULT '{"heading": "About Pretty Palette", "text": "", "image": "/assets/about-products.png"}'::jsonb,
    why_choose JSONB NOT NULL DEFAULT '{"heading": "WHY CHOOSE", "scriptHeading": "Pretty Palette?", "description": "", "items": []}'::jsonb,
    newsletter JSONB NOT NULL DEFAULT '{"heading": "Join the Pretty Palette Family", "description": ""}'::jsonb,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ----------------------------------------------------------------------------
-- 5. WEBSITE SETTINGS TABLE
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.website_settings (
    id TEXT PRIMARY KEY DEFAULT 'master_settings',
    site_name TEXT DEFAULT 'Pretty Palette',
    logo TEXT DEFAULT '/assets/logo.png',
    favicon TEXT DEFAULT '/favicon.ico',
    free_shipping_threshold NUMERIC(10, 2) DEFAULT 999,
    shipping_fee NUMERIC(10, 2) DEFAULT 99,
    phone TEXT DEFAULT '+91 7569399887',
    email TEXT DEFAULT 'contact@prettypalette.shop',
    support_email TEXT DEFAULT 'support@prettypalette.shop',
    address TEXT DEFAULT 'Artisanal Studio, Guntur, Andhra Pradesh, India - 522002',
    whatsapp TEXT DEFAULT '+91 7569399887',
    social_links JSONB DEFAULT '{"instagram": "https://instagram.com/prettypalette", "facebook": "https://facebook.com/prettypalette", "youtube": "https://youtube.com/@prettypalette", "whatsapp": "https://wa.me/917569399887"}'::jsonb,
    policies JSONB DEFAULT '{}'::jsonb,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ----------------------------------------------------------------------------
-- 6. ORDERS TABLE
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.orders (
    id TEXT PRIMARY KEY,
    order_number TEXT UNIQUE NOT NULL,
    date TEXT NOT NULL,
    customer JSONB NOT NULL,
    shipping_address JSONB NOT NULL,
    items JSONB NOT NULL,
    subtotal NUMERIC(10, 2) NOT NULL DEFAULT 0,
    shipping_fee NUMERIC(10, 2) NOT NULL DEFAULT 0,
    discount_amount NUMERIC(10, 2) NOT NULL DEFAULT 0,
    coupon_code TEXT,
    total NUMERIC(10, 2) NOT NULL DEFAULT 0,
    payment_method TEXT DEFAULT 'cod',
    payment_status TEXT DEFAULT 'pending', -- 'pending', 'paid', 'failed', 'refunded'
    order_status TEXT DEFAULT 'placed',    -- 'placed', 'processing', 'dispatched', 'in_transit', 'delivered', 'cancelled'
    tracking_number TEXT,
    courier_name TEXT,
    estimated_delivery TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_orders_status ON public.orders(order_status);
CREATE INDEX IF NOT EXISTS idx_orders_number ON public.orders(order_number);

-- ----------------------------------------------------------------------------
-- 7. REVIEWS TABLE
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.reviews (
    id TEXT PRIMARY KEY,
    product_id TEXT NOT NULL,
    author_name TEXT NOT NULL,
    rating INT DEFAULT 5,
    title TEXT,
    comment TEXT NOT NULL,
    date TEXT NOT NULL,
    verified_purchase BOOLEAN DEFAULT TRUE,
    is_approved BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_reviews_product ON public.reviews(product_id);

-- ----------------------------------------------------------------------------
-- 8. COUPONS TABLE
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.coupons (
    code TEXT PRIMARY KEY,
    discount_type TEXT NOT NULL DEFAULT 'percentage', -- 'percentage', 'fixed'
    value NUMERIC(10, 2) NOT NULL DEFAULT 10,
    min_order_amount NUMERIC(10, 2) DEFAULT 0,
    description TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    expiry_date TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ----------------------------------------------------------------------------
-- 9. MEDIA ASSETS (Cloudinary media library tracking)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.media_assets (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    public_id TEXT NOT NULL,
    url TEXT NOT NULL,
    format TEXT,
    bytes INT,
    width INT,
    height INT,
    folder TEXT DEFAULT 'pretty-palette',
    tag TEXT,
    used_in TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ----------------------------------------------------------------------------
-- 10. ACTIVITY LOGS TABLE
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.activity_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    admin_id TEXT DEFAULT 'admin',
    action TEXT NOT NULL,
    entity_type TEXT NOT NULL,
    entity_id TEXT,
    details TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ----------------------------------------------------------------------------
-- 11. CUSTOMERS TABLE
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.customers (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    phone TEXT,
    total_orders INT DEFAULT 0,
    total_spent NUMERIC(10, 2) DEFAULT 0,
    status TEXT DEFAULT 'active',
    joined_date TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ----------------------------------------------------------------------------
-- 12. SEO METADATA TABLE
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.seo_metadata (
    page_key TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    keywords TEXT,
    og_image TEXT,
    canonical_url TEXT,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ----------------------------------------------------------------------------
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ----------------------------------------------------------------------------
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.homepage_cms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.website_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.coupons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media_assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.seo_metadata ENABLE ROW LEVEL SECURITY;

-- Public READ access policies
CREATE POLICY "Public read categories" ON public.categories FOR SELECT USING (true);
CREATE POLICY "Public read products" ON public.products FOR SELECT USING (true);
CREATE POLICY "Public read services" ON public.services FOR SELECT USING (true);
CREATE POLICY "Public read homepage_cms" ON public.homepage_cms FOR SELECT USING (true);
CREATE POLICY "Public read website_settings" ON public.website_settings FOR SELECT USING (true);
CREATE POLICY "Public read reviews" ON public.reviews FOR SELECT USING (is_approved = true);
CREATE POLICY "Public read coupons" ON public.coupons FOR SELECT USING (is_active = true);
CREATE POLICY "Public read customers" ON public.customers FOR SELECT USING (true);
CREATE POLICY "Public read seo_metadata" ON public.seo_metadata FOR SELECT USING (true);
CREATE POLICY "Public insert orders" ON public.orders FOR INSERT WITH CHECK (true);
CREATE POLICY "Public read own orders" ON public.orders FOR SELECT USING (true);
CREATE POLICY "Public insert reviews" ON public.reviews FOR INSERT WITH CHECK (true);

-- Authenticated / Admin full access policies (allows anon key for seamless client updates)
CREATE POLICY "Admin write categories" ON public.categories FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Admin write products" ON public.products FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Admin write services" ON public.services FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Admin write homepage_cms" ON public.homepage_cms FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Admin write website_settings" ON public.website_settings FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Admin write orders" ON public.orders FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Admin write reviews" ON public.reviews FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Admin write coupons" ON public.coupons FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Admin write customers" ON public.customers FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Admin write media_assets" ON public.media_assets FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Admin write activity_logs" ON public.activity_logs FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Admin write seo_metadata" ON public.seo_metadata FOR ALL USING (true) WITH CHECK (true);

-- Enable Realtime publication for live instant updates
ALTER PUBLICATION supabase_realtime ADD TABLE public.products;
ALTER PUBLICATION supabase_realtime ADD TABLE public.homepage_cms;
ALTER PUBLICATION supabase_realtime ADD TABLE public.website_settings;
ALTER PUBLICATION supabase_realtime ADD TABLE public.categories;
ALTER PUBLICATION supabase_realtime ADD TABLE public.orders;
ALTER PUBLICATION supabase_realtime ADD TABLE public.services;


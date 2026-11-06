-- ============================================================================
-- PRETTY PALETTE - SUPABASE SEED DATA SCRIPT
-- Imports all existing products, categories, CMS, and configurations
-- ============================================================================

-- 1. SEED CATEGORIES
INSERT INTO public.categories (id, name, slug, tagline, description, image, badge, display_order)
VALUES 
('cat-cosmetics', 'Cosmetics', 'cosmetics', 'Makeup essentials for every mood.', 'Artisanal lipsticks, herbal kajal, mineral blush & botanical beauty.', '/assets/banner-cosmetics.png', 'Bestselling Glamour', 1),
('cat-skincare', 'Skin Care', 'skin-care', 'Nourish. Protect. Glow.', 'Kashmiri saffron, rosehip oil, day creams & hydrating serums.', '/assets/banner-skincare.png', 'Natural Radiance', 2),
('cat-haircare', 'Hair Care', 'hair-care', 'Stronger. Healthier. Happier Hair.', '18-herb Ayurvedic oils, sulphate-free shampoos & silk masks.', '/assets/banner-haircare.png', 'Pure Scalp Therapy', 3)
ON CONFLICT (id) DO UPDATE SET 
    name = EXCLUDED.name,
    tagline = EXCLUDED.tagline,
    description = EXCLUDED.description,
    image = EXCLUDED.image;

-- 2. SEED INITIAL PRODUCTS
INSERT INTO public.products (
    id, name, slug, category, price, original_price, discount, rating, review_count, 
    image, gallery, description, short_description, ingredients, usage_instructions, 
    benefits, in_stock, stock_count, is_best_seller, is_featured, variants, size, badge
)
VALUES
(
    'prod-1',
    'Matte Lust Lipstick',
    'matte-lust-lipstick',
    'cosmetics',
    299,
    499,
    40,
    4.8,
    1240,
    '/assets/bestseller-lipstick.png',
    '["/assets/bestseller-lipstick.png", "/assets/full-lipstick.png"]'::jsonb,
    'Indulge in velvety long-wear glamour that nourishes as it beautifies. Enriched with cold-pressed almond oil, organic beeswax, and shea butter, our Matte Lust Lipstick glides effortlessly without parching delicate lips. 100% lead-free with zero parabens.',
    'Creamy matte lipstick with organic almond oil & pure floral pigments.',
    '["Cold-Pressed Almond Oil", "Organic Shea Butter", "Candelilla Wax", "Botanical Mica", "Vitamin E", "Kannauj Rose Flower Extract"]'::jsonb,
    '["Exfoliate lips gently with warm water", "Apply from the center of lips and smooth outward", "Layer for more dramatic intensity"]'::jsonb,
    '["10-hour non-drying matte finish", "100% lead-free & food-grade safe pigments", "Intense hydration with botanical waxes"]'::jsonb,
    true,
    85,
    true,
    true,
    '[{"id": "v-1", "name": "Ruby Romance", "inStock": true, "colorHex": "#8C243E"}, {"id": "v-2", "name": "Berry Bloom", "inStock": true, "colorHex": "#A82F4D"}, {"id": "v-3", "name": "Nude Petal", "inStock": true, "colorHex": "#D48B97"}]'::jsonb,
    '4.2g',
    '40% OFF'
),
(
    'prod-2',
    'Radiance Face Cream',
    'radiance-face-cream',
    'skin-care',
    499,
    699,
    28,
    4.8,
    966,
    '/assets/bestseller-facecream.png',
    '["/assets/bestseller-facecream.png", "/assets/full-daycream.png"]'::jsonb,
    'Unlock your skin''s natural golden aura with our deeply hydrating day nectar. Infused with hand-harvested Kashmiri saffron threads, pure kumkumadi oil, and virgin rosehip seed oil, this lightweight formulation melts into skin to fade blemishes, blur fine lines, and preserve dermal moisture throughout the day.',
    'Hydrate • Nourish • Glow with Kashmiri Saffron and Damask Rose.',
    '["Kashmiri Saffron (Crocus Sativus)", "Damask Rose Hydrosol", "Cold-Pressed Rosehip Seed Oil", "Kumkumadi Herbal Extract", "Hyaluronic Acid (Plant-Derived)", "Aloe Vera Leaf Juice"]'::jsonb,
    '["Cleanse face with Pretty Palette Gentle Face Wash", "Take a dime-sized amount onto clean fingertips", "Dot evenly across face and neck and massage upward with gentle circular strokes", "Use daily morning and evening for optimum luminosity"]'::jsonb,
    '["Visibly brightens and evens complexion", "Strengthens moisture lipid barrier", "Non-comedogenic, featherweight texture", "Safe for sensitive & acne-prone skin"]'::jsonb,
    true,
    60,
    true,
    true,
    '[{"id": "v-c1", "name": "50g Standard Jar", "inStock": true}, {"id": "v-c2", "name": "100g Value Pack", "inStock": true}]'::jsonb,
    '50g',
    '28% OFF'
),
(
    'prod-3',
    'Nourishing Hair Oil',
    'nourishing-hair-oil',
    'hair-care',
    399,
    499,
    20,
    4.8,
    744,
    '/assets/bestseller-hairoil.png',
    '["/assets/bestseller-hairoil.png", "/assets/full-hairoil.png"]'::jsonb,
    'Traditional scalp elixir slow-cooked over wood fire for 72 hours with 18 sacred Ayurvedic herbs. Combats stubborn dandruff, revitalizes dormant follicles, and restores lustrous shine to stressed, color-treated locks.',
    '18-Herb Ayurvedic Hair Elixir for Deep Scalp Therapy.',
    '["Bhringraj Extract", "Amla (Indian Gooseberry)", "Rosemary Essential Oil", "Cold-Pressed Virgin Coconut Oil", "Sweet Almond Oil", "Brahmi", "Fenugreek Seeds"]'::jsonb,
    '["Warm a small amount between your palms", "Section hair and apply directly onto scalp with fingertips", "Massage gently in circular motions for 10-15 minutes", "Leave overnight or at least 1 hour before shampooing"]'::jsonb,
    '["Stops excessive hair fall in 21 days", "Soothes dry, flaky & itchy scalp", "Promotes thick, dense new hair growth", "Non-sticky, quick-absorbing texture"]'::jsonb,
    true,
    110,
    true,
    true,
    '[{"id": "v-o1", "name": "100ml Bottle", "inStock": true}, {"id": "v-o2", "name": "200ml Family Bottle", "inStock": true}]'::jsonb,
    '100ml',
    '20% OFF'
),
(
    'prod-4',
    'Herbal Kajal',
    'herbal-kajal',
    'cosmetics',
    199,
    249,
    20,
    4.8,
    620,
    '/assets/bestseller-kajal.png',
    '["/assets/bestseller-kajal.png", "/assets/full-kajal.png"]'::jsonb,
    'Formulated according to time-tested Ayurvedic texts with cow''s pure A2 ghee, organic castor oil, and authentic camphor soot. Provides deep jet-black intensity that cools, cleanses, and protects delicate eyes throughout long working hours.',
    'Pure • Safe • Natural with Desi Cow Ghee & Camphor.',
    '["Pure Desi Cow Ghee", "Castor Seed Oil", "Purified Camphor Soot", "Triphala Extract", "Sweet Almond Oil", "Organic Carnauba Wax"]'::jsonb,
    '["Gently twist the pencil or use clean finger/brush", "Apply smoothly along the lower waterline", "Glide along upper lashline for a smoky Kohl look"]'::jsonb,
    '["100% smudge-resistant for 12 hours", "Cooling effect relieves eye fatigue", "Safe for contact lens wearers and sensitive eyes", "Zero chemical preservatives or synthetic dyes"]'::jsonb,
    true,
    140,
    true,
    true,
    '[]'::jsonb,
    '3.5g',
    '20% OFF'
)
ON CONFLICT (id) DO UPDATE SET 
    name = EXCLUDED.name,
    price = EXCLUDED.price,
    original_price = EXCLUDED.original_price,
    discount = EXCLUDED.discount,
    image = EXCLUDED.image,
    gallery = EXCLUDED.gallery,
    description = EXCLUDED.description;

-- 3. SEED HOMEPAGE CMS
INSERT INTO public.homepage_cms (id, announcement_bar, hero, benefits, categories, about, why_choose, newsletter)
VALUES (
    'master_cms',
    '{"text": "Free Shipping on Orders Above ₹999 | Glow Naturally, Live Beautifully ✨", "enabled": true}'::jsonb,
    '{"mode": "image", "slides": [{"id": "slide-1", "badge": "Pretty Palette ♡", "title": "Natural Beauty,\\nNaturally You ♡", "subtitle": "Discover premium cosmetics, skincare and haircare products crafted with care.", "ctaText": "Shop Now", "ctaLink": "/shop", "taglineTopRight": "Care\\nGlow\\nRepeat ♡", "bgImage": "/assets/hero-bg.png"}]}'::jsonb,
    '[{"id": "b-1", "title": "100% Handcrafted & Cold-Pressed", "icon": "Sparkles"}, {"id": "b-2", "title": "Cruelty-Free & Ethical", "icon": "Heart"}, {"id": "b-3", "title": "Free Shipping Above ₹999", "icon": "Truck"}, {"id": "b-4", "title": "Safe for Sensitive Skin", "icon": "ShieldCheck"}]'::jsonb,
    '[{"id": "cosmetics", "name": "Cosmetics", "tagline": "Makeup essentials for every mood.", "image": "/assets/banner-cosmetics.png", "link": "/cosmetics"}, {"id": "skin-care", "name": "Skin Care", "tagline": "Nourish. Protect. Glow.", "image": "/assets/banner-skincare.png", "link": "/skin-care"}, {"id": "hair-care", "name": "Hair Care", "tagline": "Stronger. Healthier. Happier Hair.", "image": "/assets/banner-haircare.png", "link": "/hair-care"}]'::jsonb,
    '{"heading": "About Pretty Palette", "text": "At Pretty Palette, we believe beauty is more than just appearance — it''s about self-care, confidence and natural goodness. Our handmade and premium-quality products are crafted with nature-inspired ingredients to bring out your natural glow.", "image": "/assets/about-products.png", "storyLink": "/about-us", "vision": "To be a trusted beauty brand for everyone.", "mission": "To provide natural, safe & high-quality beauty products.", "values": "Quality, Care, Transparency."}'::jsonb,
    '{"heading": "WHY CHOOSE", "scriptHeading": "Pretty Palette?", "description": "We believe in the power of nature and the goodness of safe ingredients. Each product is thoughtfully handmade to bring out the best in you because you deserve beauty that cares.", "items": [{"id": "art-1", "title": "HANDMADE", "description": "Made in small batches with love and care.", "icon": "/assets/why-art-handmade.png"}, {"id": "art-2", "title": "SKIN SAFE", "description": "Gentle, non-toxic & suitable for all skin types.", "icon": "/assets/why-art-skinsafe.png"}, {"id": "art-3", "title": "CRUELTY FREE", "description": "We never test on animals.", "icon": "/assets/why-art-crueltyfree.png"}, {"id": "art-4", "title": "SULPHATE FREE", "description": "No harmful chemicals, only clean beauty.", "icon": "/assets/why-art-sulphatefree.png"}]}'::jsonb,
    '{"heading": "Join the Pretty Palette Family", "description": "Subscribe for secret botanical recipes, seasonal launches, and an instant 10% discount on your first order."}'::jsonb
)
ON CONFLICT (id) DO NOTHING;

-- 4. SEED WEBSITE SETTINGS
INSERT INTO public.website_settings (id, site_name, logo, free_shipping_threshold, shipping_fee, phone, email, support_email, address, whatsapp, social_links)
VALUES (
    'master_settings',
    'Pretty Palette',
    '/assets/logo.png',
    999,
    99,
    '+91 7569399887',
    'contact@prettypalette.shop',
    'support@prettypalette.shop',
    'Artisanal Studio, Guntur, Andhra Pradesh, India - 522002',
    '+91 7569399887',
    '{"instagram": "https://instagram.com/prettypalette", "facebook": "https://facebook.com/prettypalette", "youtube": "https://youtube.com/@prettypalette", "whatsapp": "https://wa.me/917569399887"}'::jsonb
)
ON CONFLICT (id) DO NOTHING;

-- 5. SEED COUPONS
INSERT INTO public.coupons (code, discount_type, value, min_order_amount, description, is_active)
VALUES
('WELCOME10', 'percentage', 10, 499, '10% off for first time buyers', true),
('GLOW20', 'percentage', 20, 1499, '20% off on premium beauty rituals', true),
('FESTIVE50', 'fixed', 50, 999, 'Flat ₹50 off on festival orders', true)
ON CONFLICT (code) DO NOTHING;

-- 6. SEED INITIAL SERVICES
INSERT INTO public.services (id, name, slug, tagline, description, price, duration, features, image, is_active)
VALUES
('serv-1', 'Personalized Ayurvedic Skin Consultation', 'skin-consultation', 'Discover your dosha & tailored herbal ritual', 'One-on-one virtual consultation with our lead Ayurvedic cosmetologist. Receive a customized morning and evening routine tailored to your unique skin type and environment.', 499, '45 Mins', '["Prakriti (Dosha) Analysis", "Custom Herbal Product Routine", "Dietary & Lifestyle Guidance", "Follow-up check-in after 14 days"]'::jsonb, '/assets/prod-facecream-photo.png', true),
('serv-2', 'Bespoke Bridal Beauty Care Ritual', 'bridal-care-ritual', 'Artisanal glow for your wedding celebration', 'Comprehensive 3-month handcrafted skincare and haircare preparation for brides-to-be. Includes fresh seasonal micro-batch shipments prepared especially for you.', 3999, '3 Months', '["Monthly custom fresh batches", "Damask rose & saffron formulations", "Scalp detox & hair revitalization", "Complimentary travel vanity set"]'::jsonb, '/assets/prod-lipstick-photo.png', true)
ON CONFLICT (id) DO NOTHING;


import { createClient } from '@supabase/supabase-js';
import { Product, HomepageCMS, Order, Review, CategoryType, DailyRitualCMS } from '../types';
import { INITIAL_DAILY_RITUAL } from '../data/mockData';

// Supabase credentials provided by the user
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://qdafyowujujuqlwfmxwh.supabase.co';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFkYWZ5b3d1anVqdXFsd2ZteHdoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTM5MzQ1MjIsImV4cCI6MjEwOTUxMDUyMn0.N105UsP5hbM8AY3jb0u8QVXFjW89Hq702TngmII2Tlc';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
  realtime: {
    params: {
      eventsPerSecond: 10,
    },
  },
});

export interface ServiceItem {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  price: number;
  duration: string;
  features: string[];
  image: string;
  isActive: boolean;
}

export interface ActivityLogItem {
  id: string;
  adminId: string;
  action: string;
  entityType: string;
  entityId?: string;
  details?: string;
  createdAt: string;
}

// ---------------------------------------------------------------------------
// 1. PRODUCTS DB HELPERS
// ---------------------------------------------------------------------------
export async function getDbProducts(): Promise<Product[] | null> {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });

    if (error || !data || data.length === 0) {
      return null;
    }

    return data.map((row: any) => ({
      id: row.id,
      name: row.name,
      slug: row.slug,
      category: row.category as CategoryType,
      price: Number(row.price),
      originalPrice: Number(row.original_price),
      discount: Number(row.discount),
      rating: Number(row.rating),
      reviewCount: Number(row.review_count),
      image: row.image,
      gallery: Array.isArray(row.gallery) ? row.gallery : [],
      description: row.description || '',
      shortDescription: row.short_description || '',
      ingredients: Array.isArray(row.ingredients) ? row.ingredients : [],
      usageInstructions: Array.isArray(row.usage_instructions) ? row.usage_instructions : [],
      benefits: Array.isArray(row.benefits) ? row.benefits : [],
      inStock: Boolean(row.in_stock),
      stockCount: Number(row.stock_count || 0),
      isBestSeller: Boolean(row.is_best_seller),
      isFeatured: Boolean(row.is_featured),
      variants: Array.isArray(row.variants) ? row.variants : [],
      size: row.size || '',
      badge: row.badge || '',
      sku: row.sku || ''
    }));
  } catch (err) {
    console.warn('[Supabase] Failed to fetch products:', err);
    return null;
  }
}

export async function upsertDbProduct(p: Product): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await supabase.from('products').upsert({
      id: p.id,
      name: p.name,
      slug: p.slug,
      category: p.category,
      price: p.price,
      original_price: p.originalPrice,
      discount: p.discount,
      rating: p.rating,
      review_count: p.reviewCount,
      image: p.image,
      gallery: p.gallery || [],
      description: p.description,
      short_description: p.shortDescription,
      ingredients: p.ingredients || [],
      usage_instructions: p.usageInstructions || [],
      benefits: p.benefits || [],
      in_stock: p.inStock,
      stock_count: p.stockCount,
      is_best_seller: p.isBestSeller,
      is_featured: p.isFeatured,
      variants: p.variants || [],
      size: p.size,
      badge: p.badge,
      sku: p.sku,
      updated_at: new Date().toISOString()
    });

    if (error) {
      return { success: false, error: error.message };
    }
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

export async function deleteDbProduct(productId: string): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await supabase.from('products').delete().eq('id', productId);
    if (error) return { success: false, error: error.message };
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

// ---------------------------------------------------------------------------
// 2. HOMEPAGE CMS DB HELPERS
// ---------------------------------------------------------------------------
export async function getDbCMS(): Promise<HomepageCMS | null> {
  try {
    const { data, error } = await supabase
      .from('homepage_cms')
      .select('*')
      .eq('id', 'master_cms')
      .single();

    if (error || !data) return null;

    const dailyRitual = (data as any).daily_ritual || (data.about as any)?.dailyRitual || INITIAL_DAILY_RITUAL;
    const hero = data.hero ? {
      ...data.hero,
      slides: (data.hero.slides || []).map((s: any) => ({
        ...s,
        mobileBgImage: s.mobileBgImage || '/assets/hero-mobile-bg.png'
      }))
    } : data.hero;

    return {
      announcementBar: data.announcement_bar,
      hero,
      benefits: data.benefits,
      categories: data.categories,
      about: data.about,
      whyChoose: data.why_choose,
      newsletter: data.newsletter,
      dailyRitual,
      settings: {
        freeShippingThreshold: 999,
        shippingFee: 99,
        phone: '+91 7569399887',
        email: 'contact@prettypalette.shop',
        supportEmail: 'support@prettypalette.shop',
        address: 'Artisanal Studio, Guntur, Andhra Pradesh',
        whatsapp: '+91 7569399887',
        socialLinks: {
          instagram: 'https://instagram.com/prettypalette',
          facebook: 'https://facebook.com/prettypalette',
          youtube: 'https://youtube.com/@prettypalette',
          pinterest: 'https://pinterest.com/prettypalette',
          whatsapp: 'https://wa.me/917569399887'
        }
      }
    };
  } catch (err) {
    console.warn('[Supabase] Failed to fetch CMS:', err);
    return null;
  }
}

export async function upsertDbCMS(cms: HomepageCMS): Promise<{ success: boolean; error?: string }> {
  try {
    const payload: any = {
      id: 'master_cms',
      announcement_bar: cms.announcementBar,
      hero: cms.hero,
      benefits: cms.benefits,
      categories: cms.categories,
      about: {
        ...(cms.about || {}),
        dailyRitual: cms.dailyRitual
      },
      why_choose: cms.whyChoose,
      newsletter: cms.newsletter,
      updated_at: new Date().toISOString()
    };

    const { error } = await supabase.from('homepage_cms').upsert(payload);

    if (error) return { success: false, error: error.message };
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

// ---------------------------------------------------------------------------
// 3. ORDERS DB HELPERS
// ---------------------------------------------------------------------------
export async function getDbOrders(): Promise<Order[] | null> {
  try {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.warn('[Supabase Orders Error]:', error.message);
      return null;
    }
    if (!data) return [];

    return data.map((o: any) => ({
      id: o.id,
      orderNumber: o.order_number,
      date: o.date,
      customer: typeof o.customer === 'string' ? JSON.parse(o.customer) : o.customer,
      shippingAddress: typeof o.shipping_address === 'string' ? JSON.parse(o.shipping_address) : o.shipping_address,
      items: typeof o.items === 'string' ? JSON.parse(o.items) : (o.items || []),
      subtotal: Number(o.subtotal || 0),
      shippingFee: Number(o.shipping_fee || 0),
      discountAmount: Number(o.discount_amount || 0),
      couponCode: o.coupon_code || undefined,
      total: Number(o.total || 0),
      paymentMethod: o.payment_method,
      paymentStatus: o.payment_status,
      orderStatus: o.order_status,
      trackingNumber: o.tracking_number || undefined,
      courierName: o.courier_name || undefined,
      estimatedDelivery: o.estimated_delivery || undefined,
      createdAt: o.created_at
    }));
  } catch (err) {
    return null;
  }
}

export async function deleteDbOrder(orderId: string): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await supabase.from('orders').delete().eq('id', orderId);
    if (error) return { success: false, error: error.message };
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

export async function insertDbOrder(order: Order): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await supabase.from('orders').insert({
      id: order.id,
      order_number: order.orderNumber,
      date: order.date,
      customer: order.customer,
      shipping_address: order.shippingAddress,
      items: order.items,
      subtotal: order.subtotal,
      shipping_fee: order.shippingFee,
      discount_amount: order.discountAmount,
      coupon_code: order.couponCode,
      total: order.total,
      payment_method: order.paymentMethod,
      payment_status: order.paymentStatus,
      order_status: order.orderStatus,
      tracking_number: order.trackingNumber,
      courier_name: order.courierName,
      estimated_delivery: order.estimatedDelivery,
      created_at: order.createdAt
    });
    if (error) return { success: false, error: error.message };
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

export async function updateDbOrderStatus(
  orderId: string, 
  status: string, 
  trackingNumber?: string, 
  courierName?: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const payload: any = { order_status: status, updated_at: new Date().toISOString() };
    if (trackingNumber) payload.tracking_number = trackingNumber;
    if (courierName) payload.courier_name = courierName;

    const { error } = await supabase.from('orders').update(payload).eq('id', orderId);
    if (error) return { success: false, error: error.message };
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

// ---------------------------------------------------------------------------
// 4. ACTIVITY LOGS
// ---------------------------------------------------------------------------
export async function logAdminActivity(action: string, entityType: string, entityId?: string, details?: string) {
  try {
    await supabase.from('activity_logs').insert({
      admin_id: 'admin',
      action,
      entity_type: entityType,
      entity_id: entityId,
      details,
      created_at: new Date().toISOString()
    });
  } catch {
    // Non-blocking
  }
}

export async function getDbActivityLogs(): Promise<ActivityLogItem[]> {
  try {
    const { data, error } = await supabase
      .from('activity_logs')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(50);

    if (error || !data) return [];
    return data.map((d: any) => ({
      id: d.id,
      adminId: d.admin_id,
      action: d.action,
      entityType: d.entity_type,
      entityId: d.entity_id,
      details: d.details,
      createdAt: d.created_at
    }));
  } catch {
    return [];
  }
}

// ---------------------------------------------------------------------------
// 5. SERVICES DB HELPERS
// ---------------------------------------------------------------------------
export async function getDbServices(): Promise<ServiceItem[] | null> {
  try {
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .order('created_at', { ascending: true });

    if (error || !data || data.length === 0) return null;

    return data.map((s: any) => ({
      id: s.id,
      name: s.name,
      slug: s.slug,
      tagline: s.tagline || '',
      description: s.description || '',
      price: Number(s.price || 0),
      duration: s.duration || '',
      features: Array.isArray(s.features) ? s.features : (typeof s.features === 'string' ? JSON.parse(s.features) : []),
      image: s.image || '',
      isActive: s.is_active ?? true
    }));
  } catch (err) {
    console.warn('[Supabase getDbServices error]:', err);
    return null;
  }
}

export async function upsertDbService(service: ServiceItem): Promise<{ success: boolean; error?: string }> {
  try {
    const payload = {
      id: service.id,
      name: service.name,
      slug: service.slug || service.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      tagline: service.tagline,
      description: service.description,
      price: service.price,
      duration: service.duration,
      features: service.features,
      image: service.image,
      is_active: service.isActive,
      updated_at: new Date().toISOString()
    };

    const { error } = await supabase
      .from('services')
      .upsert(payload, { onConflict: 'id' });

    if (error) {
      console.error('[Supabase upsertDbService error]:', error);
      return { success: false, error: error.message };
    }
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

export async function deleteDbService(serviceId: string): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await supabase
      .from('services')
      .delete()
      .eq('id', serviceId);

    if (error) {
      console.error('[Supabase deleteDbService error]:', error);
      return { success: false, error: error.message };
    }
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}


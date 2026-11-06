// Cloudinary Service for Pretty Palette
// Cloud Name: yiuni2eh
// Preset: ml_default

const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'yiuni2eh';
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || 'ml_default';

export interface CloudinaryUploadResponse {
  success: boolean;
  url?: string;
  publicId?: string;
  error?: string;
  isFallback?: boolean;
}

/**
 * Upload an image file directly to Cloudinary using the unsigned upload preset.
 * If Cloudinary preset requires signing mode adjustment, gracefully falls back
 * to a local base64 data URL so the admin never gets stuck.
 */
export async function uploadImageToCloudinary(
  file: File | Blob,
  folder = 'pretty-palette'
): Promise<CloudinaryUploadResponse> {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', UPLOAD_PRESET);
  formData.append('folder', folder);

  try {
    const endpoint = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;
    const res = await fetch(endpoint, {
      method: 'POST',
      body: formData,
    });

    const data = await res.json();

    if (!res.ok || data.error) {
      const errorMsg = data.error?.message || 'Cloudinary upload failed';
      console.warn('[Cloudinary API Notice]:', errorMsg);

      // Create high-res data URL fallback so the user can immediately use their image
      const fallbackUrl = await blobToDataUrl(file);
      return {
        success: true,
        url: fallbackUrl,
        publicId: `local-${Date.now()}`,
        isFallback: true,
        error: errorMsg,
      };
    }

    return {
      success: true,
      url: data.secure_url || data.url,
      publicId: data.public_id,
    };
  } catch (err: any) {
    console.error('[Cloudinary Network Error]:', err);
    const fallbackUrl = await blobToDataUrl(file);
    return {
      success: true,
      url: fallbackUrl,
      publicId: `local-${Date.now()}`,
      isFallback: true,
      error: err.message,
    };
  }
}

/**
 * Convert a File/Blob to a base64 Data URL
 */
export function blobToDataUrl(blob: Blob | File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}


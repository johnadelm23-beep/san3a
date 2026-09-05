/**
 * Safe Supabase Environment Variable Helper
 * Validates required environment variables without exposing secret key values.
 */

export function getSupabaseUrl(): string {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!url || url.trim() === '' || url.includes('placeholder')) {
    return '';
  }
  return url.trim();
}

export function getSupabasePublishableKey(): string {
  const key =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!key || key.trim() === '' || key.includes('placeholder')) {
    return '';
  }
  return key.trim();
}

export function isSupabaseConfigured(): boolean {
  const url = getSupabaseUrl();
  const key = getSupabasePublishableKey();
  return Boolean(url && key);
}

export function validateSupabaseEnv(): { url: string; key: string } {
  const url = getSupabaseUrl();
  const key = getSupabasePublishableKey();

  if (!url) {
    throw new Error(
      'Supabase Configuration Error: NEXT_PUBLIC_SUPABASE_URL environment variable is missing.'
    );
  }

  if (!key) {
    throw new Error(
      'Supabase Configuration Error: NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY environment variable is missing.'
    );
  }

  return { url, key };
}

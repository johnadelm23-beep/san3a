import { createBrowserClient } from '@supabase/ssr';
import type { Database } from '../types/database.types';
import { getSupabaseUrl, getSupabasePublishableKey, validateSupabaseEnv, isSupabaseConfigured } from './env';

/**
 * Creates a reusable client-side (browser) Supabase client using @supabase/ssr.
 */
export function createClient() {
  const url = getSupabaseUrl();
  const key = getSupabasePublishableKey();

  if (!url || !key) {
    validateSupabaseEnv();
  }

  return createBrowserClient<Database>(url, key);
}

let cachedBrowserClient: ReturnType<typeof createBrowserClient<Database>> | null = null;

export function getBrowserSupabase() {
  if (!cachedBrowserClient) {
    cachedBrowserClient = createClient();
  }
  return cachedBrowserClient;
}

/**
 * Singleton export for existing component imports
 */
export const supabase = isSupabaseConfigured()
  ? createBrowserClient<Database>(getSupabaseUrl(), getSupabasePublishableKey())
  : (null as unknown as ReturnType<typeof createBrowserClient<Database>>);

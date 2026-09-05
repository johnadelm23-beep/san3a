import { isSupabaseConfigured, getSupabaseUrl, getSupabasePublishableKey } from './env';

export interface HealthCheckResult {
  configured: boolean;
  connected: boolean;
  message: string;
  timestamp: string;
}

/**
 * Validates Supabase environment variables and performs a lightweight API ping test
 * without requiring any existing database tables or schema.
 */
export async function checkSupabaseHealth(): Promise<HealthCheckResult> {
  const timestamp = new Date().toISOString();

  if (!isSupabaseConfigured()) {
    return {
      configured: false,
      connected: false,
      message: 'Supabase environment variables are not configured.',
      timestamp,
    };
  }

  try {
    const url = getSupabaseUrl();
    const key = getSupabasePublishableKey();

    const response = await fetch(`${url}/rest/v1/`, {
      method: 'GET',
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
      },
      cache: 'no-store',
    });

    if (response.ok || response.status < 500) {
      return {
        configured: true,
        connected: true,
        message: 'Supabase client initialized and connected successfully.',
        timestamp,
      };
    }

    return {
      configured: true,
      connected: false,
      message: `Supabase server returned status ${response.status}.`,
      timestamp,
    };
  } catch (error) {
    const errMessage = error instanceof Error ? error.message : 'Network error';
    return {
      configured: true,
      connected: false,
      message: `Connection error: ${errMessage}`,
      timestamp,
    };
  }
}

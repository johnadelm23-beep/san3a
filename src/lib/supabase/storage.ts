import { supabase } from './client';
import { isSupabaseConfigured } from './env';

export interface UploadResult {
  url: string;
  path: string;
  error?: string;
}

/**
 * Uploads a file to a Supabase Storage bucket and returns the public URL and storage path.
 */
export async function uploadStorageFile(
  bucket: 'projects' | 'services' | 'offers' | 'team',
  folderPath: string,
  file: File
): Promise<UploadResult> {
  if (!isSupabaseConfigured() || !supabase) {
    return { url: '', path: '', error: 'Supabase is not configured.' };
  }

  try {
    const fileExt = file.name.split('.').pop() || 'jpg';
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
    const fullPath = folderPath ? `${folderPath}/${fileName}` : fileName;

    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(fullPath, file, {
        cacheControl: '3600',
        upsert: true,
      });

    if (error) {
      return { url: '', path: '', error: error.message };
    }

    const { data: publicUrlData } = supabase.storage.from(bucket).getPublicUrl(data.path);

    return {
      url: publicUrlData.publicUrl,
      path: data.path,
    };
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Storage upload failed';
    return { url: '', path: '', error: message };
  }
}

/**
 * Deletes a file from a Supabase Storage bucket.
 */
export async function deleteStorageFile(
  bucket: 'projects' | 'services' | 'offers' | 'team',
  path: string
): Promise<{ success: boolean; error?: string }> {
  if (!isSupabaseConfigured() || !supabase || !path) {
    return { success: false };
  }

  try {
    const { error } = await supabase.storage.from(bucket).remove([path]);
    if (error) return { success: false, error: error.message };
    return { success: true };
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Storage delete failed';
    return { success: false, error: message };
  }
}

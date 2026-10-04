/**
 * Supabase is optional during early development: without these variables
 * the site runs on the typed local content in src/data, and features that
 * need the database (enquiry storage, admin) explain that they are not
 * configured instead of failing.
 */
export function getSupabaseConfig() {
  const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const key =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY?.trim() ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim();
  if (!rawUrl || !key) return null;

  // Sanitize URL: strip trailing /rest/v1 or trailing slashes if accidentally included
  const url = rawUrl.replace(/\/rest\/v1\/?$/, "").replace(/\/+$/, "");
  return { url, key };
}

export const supabaseConfig = getSupabaseConfig();

export const isSupabaseConfigured = supabaseConfig !== null;


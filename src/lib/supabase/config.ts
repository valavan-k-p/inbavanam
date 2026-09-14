/**
 * Supabase is optional during early development: without these variables
 * the site runs on the typed local content in src/data, and features that
 * need the database (enquiry storage, admin) explain that they are not
 * configured instead of failing.
 */
export const supabaseConfig = (() => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  return url && key ? { url, key } : null;
})();

export const isSupabaseConfigured = supabaseConfig !== null;

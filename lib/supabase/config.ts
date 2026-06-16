// Single source of truth for Supabase env + a graceful "is it configured?" flag.
// Khi chưa cấu hình Supabase, app tự fallback sang dữ liệu mẫu để vẫn xem được.

export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
export const SUPABASE_ANON_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

export const MEDIA_BUCKET =
  process.env.NEXT_PUBLIC_SUPABASE_MEDIA_BUCKET ?? "apartment-media";

export const isSupabaseConfigured = Boolean(
  SUPABASE_URL && SUPABASE_ANON_KEY,
);

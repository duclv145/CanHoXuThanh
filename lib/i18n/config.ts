// Cấu hình đa ngôn ngữ — Tiếng Việt (mặc định) + Tiếng Hàn.
export const locales = ["vi", "ko"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "vi";

export const LOCALE_LABEL: Record<Locale, string> = {
  vi: "Tiếng Việt",
  ko: "한국어",
};

export const LOCALE_SHORT: Record<Locale, string> = {
  vi: "VI",
  ko: "KO",
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

// Tiền tố locale vào đường dẫn nội bộ: localePath("ko", "/can-ho") => "/ko/can-ho"
// Đặt ở module thường (không "use client") để Server Component cũng gọi được.
export function localePath(locale: Locale, path: string): string {
  if (
    path.startsWith("http") ||
    path.startsWith("tel:") ||
    path.startsWith("mailto:")
  )
    return path;
  if (path === "/") return `/${locale}`;
  return `/${locale}${path}`;
}

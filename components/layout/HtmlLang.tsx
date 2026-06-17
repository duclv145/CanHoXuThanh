"use client";

import { useEffect } from "react";
import type { Locale } from "@/lib/i18n/config";

// Đồng bộ <html lang> theo locale hiện tại (root layout không biết locale).
export function HtmlLang({ locale }: { locale: Locale }) {
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);
  return null;
}

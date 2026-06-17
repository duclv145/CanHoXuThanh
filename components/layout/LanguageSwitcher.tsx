"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Globe } from "lucide-react";
import { locales, LOCALE_SHORT } from "@/lib/i18n/config";
import { useI18n } from "@/lib/i18n/provider";
import { cn } from "@/lib/utils";

// Đổi locale nhưng giữ nguyên phần đường dẫn còn lại.
export function LanguageSwitcher() {
  const { locale } = useI18n();
  const pathname = usePathname() || `/${locale}`;

  const swap = (target: string) => {
    const segs = pathname.split("/");
    // segs[0]="" , segs[1]=locale hiện tại
    segs[1] = target;
    return segs.join("/") || `/${target}`;
  };

  return (
    <div className="flex items-center gap-1 rounded-full border border-ink/15 px-1 py-1">
      <Globe className="ml-1.5 h-3.5 w-3.5 text-ink-400" />
      {locales.map((l) => (
        <Link
          key={l}
          href={swap(l)}
          className={cn(
            "rounded-full px-2.5 py-1 text-[12px] font-semibold transition-colors",
            l === locale
              ? "bg-ink text-ivory-50"
              : "text-ink-500 hover:text-ink",
          )}
        >
          {LOCALE_SHORT[l]}
        </Link>
      ))}
    </div>
  );
}

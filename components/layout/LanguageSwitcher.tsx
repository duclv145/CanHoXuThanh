"use client";

import { useRouter, usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, Check } from "lucide-react";
import { locales, LOCALE_LABEL, type Locale } from "@/lib/i18n/config";
import { useI18n } from "@/lib/i18n/provider";
import { cn } from "@/lib/utils";

// Mã cờ theo flagcdn (ảnh SVG nhẹ, không cần cấu hình next/image).
const FLAG: Record<Locale, string> = { vi: "vn", ko: "kr" };

function Flag({ locale }: { locale: Locale }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`https://flagcdn.com/${FLAG[locale]}.svg`}
      alt=""
      width={22}
      height={16}
      className="h-4 w-[22px] shrink-0 rounded-[3px] object-cover"
    />
  );
}

export function LanguageSwitcher() {
  const { locale } = useI18n();
  const router = useRouter();
  const pathname = usePathname() || `/${locale}`;
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const swap = (target: string) => {
    const segs = pathname.split("/");
    segs[1] = target; // segs[1] = locale hiện tại
    return segs.join("/") || `/${target}`;
  };

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex items-center gap-2 rounded-full border border-ink/15 py-1.5 pl-2 pr-2.5 text-[13px] font-semibold text-ink transition-colors hover:border-ink/40"
      >
        <Flag locale={locale} />
        <span>{LOCALE_LABEL[locale]}</span>
        <ChevronDown
          className={cn(
            "h-4 w-4 text-ink-400 transition-transform duration-300",
            open && "rotate-180",
          )}
        />
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute right-0 z-50 mt-2 w-44 overflow-hidden rounded-xl border border-ivory-200 bg-ivory-50 py-1.5 shadow-float"
        >
          {locales.map((l) => (
            <li key={l}>
              <button
                type="button"
                role="option"
                aria-selected={l === locale}
                onClick={() => {
                  setOpen(false);
                  if (l !== locale) router.push(swap(l));
                }}
                className={cn(
                  "flex w-full items-center gap-2.5 px-3.5 py-2.5 text-[13px] transition-colors hover:bg-ivory-100",
                  l === locale ? "font-semibold text-ink" : "text-ink-600",
                )}
              >
                <Flag locale={l} />
                <span className="flex-1 text-left">{LOCALE_LABEL[l]}</span>
                {l === locale && <Check className="h-4 w-4 text-ink" />}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

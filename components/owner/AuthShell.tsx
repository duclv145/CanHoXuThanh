import Link from "next/link";
import { ArrowLeft, Check, Sparkles } from "lucide-react";
import { Logo } from "@/components/layout/Logo";
import { localePath } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/lib/i18n/config";

export function AuthShell({
  locale,
  title,
  subtitle,
  children,
}: {
  locale: Locale;
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  const t = getDictionary(locale).ownerArea;

  return (
    <main className="pt-[72px]">
      <div className="container-x py-10 lg:py-16">
        <div className="grid overflow-hidden rounded-[28px] border border-ivory-200 bg-ivory-50 shadow-float lg:grid-cols-2">
          {/* Brand panel — nền đen thuần */}
          <div className="relative hidden flex-col justify-center overflow-hidden bg-ink p-10 text-white lg:flex">
            <div className="relative">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide backdrop-blur">
                <Sparkles className="h-3.5 w-3.5" />
                {t.panelEyebrow}
              </span>
              <h2 className="mt-5 font-serif text-[32px] font-extrabold leading-[1.12]">
                {t.panelTitle}
              </h2>
              <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-white/80">
                {t.panelDesc}
              </p>
              <ul className="mt-8 space-y-3.5">
                {t.panelPoints.map((p) => (
                  <li key={p} className="flex items-center gap-3 text-[14px]">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white text-gold-600">
                      <Check className="h-3.5 w-3.5" strokeWidth={3} />
                    </span>
                    {p}
                  </li>
                ))}
              </ul>
            </div>

            <Link
              href={localePath(locale, "/")}
              className="absolute bottom-10 left-10 inline-flex items-center gap-2 text-[13px] text-white/75 transition-colors hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              {t.backHome}
            </Link>
          </div>

          {/* Form area */}
          <div className="bg-ivory-50 p-8 sm:p-12 lg:p-14">
            <div className="mx-auto max-w-sm">
              {/* logo nhỏ cho mobile (panel ẩn) */}
              <Logo className="mb-8 h-9 lg:hidden" />
              <h1 className="font-serif text-2xl font-bold text-ink sm:text-3xl">
                {title}
              </h1>
              <p className="mt-2 text-[14px] text-ink-500">{subtitle}</p>
              <div className="mt-8">{children}</div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

import Link from "next/link";
import { ArrowLeft, Check } from "lucide-react";
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
        <div className="grid overflow-hidden rounded-[28px] border border-ivory-200 shadow-card lg:grid-cols-2">
          {/* Brand panel */}
          <div className="relative hidden flex-col justify-between bg-ink p-10 text-ivory-50 lg:flex">
            <Logo tone="ivory" className="h-10" />
            <div>
              <span className="text-[11px] font-medium uppercase tracking-eyebrow text-ivory-200/60">
                {t.panelEyebrow}
              </span>
              <h2 className="mt-4 font-serif text-3xl font-bold leading-[1.15]">
                {t.panelTitle}
              </h2>
              <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-ivory-200/75">
                {t.panelDesc}
              </p>
              <ul className="mt-8 space-y-3">
                {t.panelPoints.map((p) => (
                  <li key={p} className="flex items-center gap-3 text-[14px] text-ivory-100">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-ivory-50/10">
                      <Check className="h-3.5 w-3.5" />
                    </span>
                    {p}
                  </li>
                ))}
              </ul>
            </div>
            <Link
              href={localePath(locale, "/")}
              className="inline-flex items-center gap-2 text-[13px] text-ivory-200/70 transition-colors hover:text-ivory-50"
            >
              <ArrowLeft className="h-4 w-4" />
              {t.backHome}
            </Link>
          </div>

          {/* Form area */}
          <div className="bg-ivory-50 p-8 sm:p-12 lg:p-14">
            <div className="mx-auto max-w-sm">
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

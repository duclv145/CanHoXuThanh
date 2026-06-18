import Link from "next/link";
import {
  Clapperboard,
  Building2,
  Wand2,
  Scale,
  ArrowRight,
  ArrowUpRight,
  CalendarClock,
} from "lucide-react";
import { localePath } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/lib/i18n/config";

const ICONS = [Clapperboard, Building2, Wand2, Scale];

export function generateMetadata({ params }: { params: { locale: Locale } }) {
  const t = getDictionary(params.locale).servicesPage;
  return { title: t.title, description: t.desc };
}

export default function Page({ params }: { params: { locale: Locale } }) {
  const { locale } = params;
  const dict = getDictionary(locale);
  const t = dict.servicesPage;
  const items = dict.services.items;

  return (
    <main className="bg-ivory pt-[72px]">
      {/* ── Hero (khối tối bo góc trên nền ivory) ───────────────────── */}
      <section className="container-x pt-6 lg:pt-10">
        <div className="overflow-hidden rounded-[28px] bg-ink px-8 py-14 text-ivory-50 sm:px-12 lg:px-16 lg:py-20">
          <span className="text-[11px] font-medium uppercase tracking-eyebrow text-ivory-200/55">
            {t.eyebrow}
          </span>
          <div className="mt-5 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <h1 className="font-serif text-4xl font-extrabold leading-[1.04] tracking-tight sm:text-5xl lg:text-[60px]">
              {t.title}
            </h1>
            <p className="text-[16px] leading-relaxed text-ivory-200/75 lg:pb-2">
              {t.desc}
            </p>
          </div>

          {/* Stat row */}
          <div className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-ivory-50/10 bg-ivory-50/10 lg:grid-cols-4">
            {t.stats.map((s) => (
              <div key={s.label} className="bg-ink px-6 py-7">
                <p className="font-serif text-3xl font-bold sm:text-4xl">
                  {s.value}
                </p>
                <p className="mt-1.5 text-[13px] text-ivory-200/60">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Danh sách dịch vụ (editorial) ───────────────────────────── */}
      <section className="bg-ivory">
        <div className="container-x py-16 lg:py-24">
          <div className="grid gap-10 lg:grid-cols-[0.32fr_0.68fr] lg:gap-16">
            {/* Sticky label */}
            <div className="lg:sticky lg:top-28 lg:self-start">
              <span className="text-[11px] font-medium uppercase tracking-eyebrow text-gold-600">
                {t.listLabel}
              </span>
              <p className="mt-4 max-w-[260px] font-serif text-2xl font-bold leading-snug text-ink">
                {t.title}
              </p>
            </div>

            {/* Service rows */}
            <div>
              {items.map((svc, i) => {
                const Icon = ICONS[i];
                return (
                  <article
                    key={svc.title}
                    className="group grid gap-6 border-t border-ivory-300 py-9 sm:grid-cols-[auto_1fr] sm:gap-8"
                  >
                    <div className="flex items-start gap-4 sm:flex-col sm:gap-5">
                      <span className="font-serif text-[15px] font-bold text-ink-400">
                        0{i + 1}
                      </span>
                      <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-ink text-ivory-50 transition-transform duration-500 group-hover:-rotate-6">
                        <Icon className="h-6 w-6" strokeWidth={1.5} />
                      </span>
                    </div>

                    <div>
                      <div className="flex items-start justify-between gap-4">
                        <h2 className="font-serif text-2xl font-bold text-ink sm:text-[28px]">
                          {svc.title}
                        </h2>
                        <ArrowUpRight className="mt-1 h-6 w-6 shrink-0 text-ink-300 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink" />
                      </div>
                      <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-ink-500">
                        {svc.desc}
                      </p>
                      <ul className="mt-5 flex flex-wrap gap-2">
                        {t.features[i].map((f) => (
                          <li
                            key={f}
                            className="rounded-full border border-ivory-300 px-3.5 py-1.5 text-[13px] text-ink-600"
                          >
                            {f}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </article>
                );
              })}
              <div className="border-t border-ivory-300" />
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────────────── */}
      <section className="bg-ivory">
        <div className="container-x pb-20 lg:pb-28">
          <div className="grid items-center gap-8 rounded-[28px] border border-ivory-200 bg-ivory-50 p-10 shadow-card lg:grid-cols-[1fr_auto] lg:p-14">
            <div>
              <h2 className="max-w-xl font-serif text-3xl font-bold leading-[1.12] text-ink sm:text-4xl">
                {t.ctaTitle}
              </h2>
              <p className="mt-3 max-w-md text-[15px] text-ink-500">
                {t.ctaDesc}
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
              <Link
                href={localePath(locale, "/chu-nha/dang-ky")}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-ink px-7 text-[15px] font-semibold text-ivory-50 transition-colors hover:bg-ink-800"
              >
                {t.ctaOwner}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href={localePath(locale, "/dat-lich-xem")}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-ink/20 px-7 text-[15px] font-medium text-ink transition-colors hover:border-ink hover:bg-ink hover:text-ivory-50"
              >
                <CalendarClock className="h-4 w-4" />
                {t.ctaBook}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

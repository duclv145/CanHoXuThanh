import Link from "next/link";
import {
  Clapperboard,
  Building2,
  Wand2,
  Scale,
  Check,
  ArrowRight,
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
      {/* Header */}
      <section className="border-b border-ivory-200">
        <div className="container-x py-16 lg:py-24">
          <div className="max-w-2xl">
            <span className="eyebrow">{t.eyebrow}</span>
            <h1 className="mt-4 font-serif text-4xl font-bold leading-[1.08] tracking-tight text-ink sm:text-5xl lg:text-[56px]">
              {t.title}
            </h1>
            <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-ink-500">
              {t.desc}
            </p>
          </div>
        </div>
      </section>

      {/* Service blocks */}
      <section className="container-x py-16 lg:py-24">
        <div className="space-y-6">
          {items.map((svc, i) => {
            const Icon = ICONS[i];
            return (
              <article
                key={svc.title}
                className="grid items-center gap-8 rounded-[28px] border border-ivory-200 bg-ivory-50 p-8 shadow-card lg:grid-cols-[0.9fr_1.1fr] lg:p-12"
              >
                {/* Icon panel */}
                <div
                  className={`relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-2xl bg-ink ${
                    i % 2 === 1 ? "lg:order-2" : ""
                  }`}
                >
                  <span className="absolute right-6 top-6 font-serif text-[64px] font-bold leading-none text-ivory-50/10">
                    0{i + 1}
                  </span>
                  <span className="flex h-20 w-20 items-center justify-center rounded-full bg-ivory-50/10 text-ivory-50">
                    <Icon className="h-9 w-9" strokeWidth={1.4} />
                  </span>
                </div>

                {/* Content */}
                <div>
                  <h2 className="font-serif text-2xl font-bold text-ink sm:text-3xl">
                    {svc.title}
                  </h2>
                  <p className="mt-3 text-[15px] leading-relaxed text-ink-500">
                    {svc.desc}
                  </p>
                  <p className="mt-6 text-[12px] font-semibold uppercase tracking-wide text-ink-400">
                    {t.featureLabel}
                  </p>
                  <ul className="mt-3 space-y-2.5">
                    {t.features[i].map((f) => (
                      <li
                        key={f}
                        className="flex items-start gap-3 text-[14px] text-ink-700"
                      >
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-ink text-ivory-50">
                          <Check className="h-3 w-3" strokeWidth={3} />
                        </span>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="container-x pb-20 lg:pb-28">
        <div className="overflow-hidden rounded-[28px] bg-ink px-8 py-14 text-center text-ivory-50 lg:px-12">
          <h2 className="mx-auto max-w-2xl font-serif text-3xl font-bold leading-[1.15] sm:text-4xl">
            {t.ctaTitle}
          </h2>
          <p className="mx-auto mt-4 max-w-md text-[15px] text-ivory-200/75">
            {t.ctaDesc}
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href={localePath(locale, "/chu-nha/dang-ky")}
              className="inline-flex h-12 items-center gap-2 rounded-full bg-ivory-50 px-7 text-[15px] font-semibold text-ink transition-colors hover:bg-ivory-200"
            >
              {t.ctaOwner}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href={localePath(locale, "/dat-lich-xem")}
              className="inline-flex h-12 items-center gap-2 rounded-full border border-ivory-50/30 px-7 text-[15px] font-medium text-ivory-50 transition-colors hover:bg-ivory-50/10"
            >
              <CalendarClock className="h-4 w-4" />
              {t.ctaBook}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

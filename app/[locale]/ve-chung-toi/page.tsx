import Image from "next/image";
import Link from "next/link";
import {
  ShieldCheck,
  HeartHandshake,
  Sparkles,
  BadgeCheck,
  Check,
  ArrowRight,
  ArrowUpRight,
  CalendarClock,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { localePath } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/lib/i18n/config";

const VALUE_ICONS = [ShieldCheck, HeartHandshake, Sparkles, BadgeCheck];

export function generateMetadata({ params }: { params: { locale: Locale } }) {
  const t = getDictionary(params.locale).aboutPage;
  return { title: t.title, description: t.desc };
}

export default function Page({ params }: { params: { locale: Locale } }) {
  const { locale } = params;
  const t = getDictionary(locale).aboutPage;

  return (
    <main className="bg-ivory pt-[72px]">
      {/* ── Hero — editorial sáng, chỉ chữ, bất đối xứng ────────────── */}
      <section className="relative">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(120%_85%_at_70%_-10%,#ffe3ec_0%,transparent_55%)]"
        />
        <div className="container-x py-16 lg:py-24">
          <div className="grid animate-fade-up gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-end lg:gap-16">
            <div>
              <div className="flex items-center gap-4">
                <span className="eyebrow">{t.eyebrow}</span>
                <span className="h-px w-12 bg-gold-400" />
              </div>
              <h1 className="mt-6 font-serif text-[40px] font-extrabold leading-[1.03] tracking-tight text-ink sm:text-5xl lg:text-[64px]">
                {t.title}
              </h1>
            </div>

            <div className="lg:pb-2">
              <p className="max-w-md text-[16px] leading-relaxed text-ink-500">
                {t.desc}
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Button
                  as="link"
                  href={localePath(locale, "/can-ho")}
                  variant="primary"
                  size="lg"
                >
                  {t.ctaPrimary}
                  <ArrowRight className="h-4 w-4" />
                </Button>
                <Button
                  as="link"
                  href={localePath(locale, "/dat-lich-xem")}
                  variant="outline"
                  size="lg"
                >
                  <CalendarClock className="h-4 w-4" />
                  {t.ctaSecondary}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Dải số liệu nền tối ─────────────────────────────────────── */}
      <section className="bg-ink text-ivory-50">
        <div className="container-x py-14 lg:py-16">
          <div className="grid grid-cols-2 gap-y-10 sm:grid-cols-4 sm:divide-x sm:divide-ivory-50/10">
            {t.stats.map((s) => (
              <div key={s.label} className="px-2 text-center sm:px-6">
                <p className="font-serif text-4xl font-bold sm:text-5xl">
                  {s.value}
                </p>
                <p className="mt-2.5 text-[11px] uppercase tracking-eyebrow text-ivory-200/55">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Câu chuyện — drop cap + pull quote ──────────────────────── */}
      <section className="bg-ivory">
        <div className="container-x py-16 lg:py-24">
          <div className="grid gap-10 lg:grid-cols-[0.32fr_0.68fr] lg:gap-16">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <span className="eyebrow">{t.storyLabel}</span>
              <p className="mt-4 max-w-[280px] font-serif text-2xl font-bold leading-snug text-ink">
                {t.storyTitle}
              </p>
            </div>

            <div>
              <p className="text-[18px] leading-[1.7] text-ink-700 first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:font-serif first-letter:text-[68px] first-letter:font-extrabold first-letter:leading-[0.72] first-letter:text-gold-500">
                {t.storyParas[0]}
              </p>

              <blockquote className="my-10 border-l-2 border-gold-400 pl-6">
                <p className="font-serif text-2xl font-bold leading-snug text-ink sm:text-[28px]">
                  “{t.quote}”
                </p>
                <footer className="mt-4 text-[12px] uppercase tracking-eyebrow text-ink-400">
                  {t.quoteAuthor}
                </footer>
              </blockquote>

              <p className="text-[15px] leading-relaxed text-ink-500">
                {t.storyParas[1]}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Sứ mệnh — tuyên ngôn căn giữa trên nền hồng nhạt ────────── */}
      <section className="container-x">
        <div className="rounded-[28px] border border-ivory-200 bg-[radial-gradient(120%_130%_at_50%_0%,#ffe3ec_0%,#fff5f8_62%)] px-8 py-16 text-center lg:px-16 lg:py-24">
          <span className="eyebrow">{t.missionLabel}</span>
          <h2 className="mx-auto mt-5 max-w-3xl font-serif text-3xl font-bold leading-[1.15] tracking-tight text-ink sm:text-4xl lg:text-[46px]">
            {t.missionTitle}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-[15px] leading-relaxed text-ink-500">
            {t.missionDesc}
          </p>
        </div>
      </section>

      {/* ── Giá trị cốt lõi — manifesto tối + hàng giá trị ──────────── */}
      <section className="bg-ivory">
        <div className="container-x pb-16 lg:pb-24">
          <div className="grid gap-6 lg:grid-cols-[0.4fr_0.6fr] lg:gap-8">
            {/* Manifesto panel */}
            <div className="rounded-[28px] bg-ink px-8 py-10 text-ivory-50 lg:sticky lg:top-28 lg:self-start lg:px-10 lg:py-12">
              <span className="text-[11px] font-medium uppercase tracking-eyebrow text-gold-300">
                {t.valuesLabel}
              </span>
              <h2 className="mt-4 font-serif text-3xl font-bold leading-[1.12] sm:text-4xl">
                {t.valuesTitle}
              </h2>
              <p className="mt-5 max-w-xs text-[15px] leading-relaxed text-ivory-200/70">
                {t.missionDesc}
              </p>
            </div>

            {/* Value rows */}
            <div className="space-y-4">
              {t.values.map((v, i) => {
                const Icon = VALUE_ICONS[i];
                return (
                  <article
                    key={v.title}
                    className="group flex items-start gap-5 rounded-xl2 border border-ivory-200 bg-ivory-50 p-6 shadow-card transition-colors hover:border-gold-300 sm:p-7"
                  >
                    <span className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-2xl bg-ink text-ivory-50 transition-transform duration-500 group-hover:-rotate-6">
                      <Icon className="h-6 w-6" strokeWidth={1.5} />
                    </span>
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="font-serif text-xl font-bold text-ink sm:text-2xl">
                          {v.title}
                        </h3>
                        <span className="font-serif text-sm font-bold text-ivory-300 transition-colors group-hover:text-gold-400">
                          0{i + 1}
                        </span>
                      </div>
                      <p className="mt-2 text-[14px] leading-relaxed text-ink-500">
                        {v.desc}
                      </p>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── Cam kết — card sáng, checklist 2 cột ────────────────────── */}
      <section className="bg-ivory">
        <div className="container-x pb-16 lg:pb-24">
          <div className="rounded-[28px] border border-ivory-200 bg-ivory-50 p-8 shadow-card lg:p-12">
            <div className="grid gap-8 lg:grid-cols-[0.34fr_0.66fr] lg:gap-12">
              <div>
                <span className="eyebrow">{t.whyLabel}</span>
                <h2 className="mt-4 font-serif text-2xl font-bold leading-[1.15] text-ink sm:text-3xl">
                  {t.whyTitle}
                </h2>
              </div>
              <ul className="grid gap-x-8 gap-y-5 sm:grid-cols-2">
                {t.why.map((w) => (
                  <li key={w} className="flex items-start gap-3.5">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold-500 text-white">
                      <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
                    </span>
                    <span className="text-[15px] leading-relaxed text-ink-600">
                      {w}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA — ảnh full-bleed phủ tối ────────────────────────────── */}
      <section className="container-x pb-16 lg:pb-24">
        <div className="relative overflow-hidden rounded-[28px]">
          <Image
            src="/K5-Bancong.jpg"
            alt={t.ctaTitle}
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[rgba(20,14,17,0.92)] via-[rgba(20,14,17,0.74)] to-[rgba(20,14,17,0.58)]" />
          <div className="relative px-8 py-16 text-center text-ivory-50 lg:px-16 lg:py-24">
            <h2 className="mx-auto max-w-2xl font-serif text-3xl font-bold leading-[1.12] sm:text-4xl lg:text-[44px]">
              {t.ctaTitle}
            </h2>
            <p className="mx-auto mt-4 max-w-md text-[15px] leading-relaxed text-ivory-200/80">
              {t.ctaDesc}
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <Link
                href={localePath(locale, "/can-ho")}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-gold-500 px-7 text-[15px] font-semibold text-white transition-colors hover:bg-gold-600"
              >
                {t.ctaPrimary}
                <ArrowUpRight className="h-4 w-4" />
              </Link>
              <Link
                href={localePath(locale, "/dat-lich-xem")}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-ivory-50/30 px-7 text-[15px] font-medium text-ivory-50 transition-colors hover:bg-ivory-50 hover:text-ink"
              >
                <CalendarClock className="h-4 w-4" />
                {t.ctaSecondary}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, MapPin, Phone, Clock, CalendarClock } from "lucide-react";
import { SOCIAL_CONTACTS } from "@/lib/contacts";
import { localePath } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/lib/i18n/config";

export function generateMetadata({ params }: { params: { locale: Locale } }) {
  const t = getDictionary(params.locale).contactPage;
  return { title: t.title, description: t.desc };
}

export default function Page({ params }: { params: { locale: Locale } }) {
  const { locale } = params;
  const t = getDictionary(locale).contactPage;

  return (
    <main className="bg-ivory pt-[72px]">
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="relative">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(120%_85%_at_70%_-10%,#ffe3ec_0%,transparent_55%)]"
        />
        <div className="container-x py-16 lg:py-24">
          <div className="max-w-2xl animate-fade-up">
            <div className="flex items-center gap-4">
              <span className="eyebrow">{t.eyebrow}</span>
              <span className="h-px w-12 bg-gold-400" />
            </div>
            <h1 className="mt-6 font-serif text-[40px] font-extrabold leading-[1.03] tracking-tight text-ink sm:text-5xl lg:text-[64px]">
              {t.title}
            </h1>
            <p className="mt-6 max-w-xl text-[16px] leading-relaxed text-ink-500">
              {t.desc}
            </p>
          </div>
        </div>
      </section>

      {/* ── Kênh nhắn tin + Thông tin liên hệ ────────────────────────── */}
      <section className="bg-ivory">
        <div className="container-x pb-16 lg:pb-24">
          <div className="grid gap-10 lg:grid-cols-[0.62fr_0.38fr] lg:gap-12">
            {/* Kênh nhắn tin */}
            <div>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <span className="eyebrow">{t.channelsLabel}</span>
                  <h2 className="mt-3 font-serif text-2xl font-bold leading-tight text-ink sm:text-3xl">
                    {t.channelsTitle}
                  </h2>
                </div>
                <div className="inline-flex shrink-0 items-center gap-2 rounded-full border border-ivory-300 bg-ivory-50 px-4 py-2 text-[13px] font-medium text-ink-600 shadow-card">
                  <Clock className="h-4 w-4 text-gold-600" strokeWidth={1.8} />
                  {t.hours}
                </div>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:gap-5">
                {SOCIAL_CONTACTS.map((c, i) => (
                  <a
                    key={c.name}
                    href={c.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${t.action} ${c.name}`}
                    className={`group relative flex flex-col gap-5 overflow-hidden rounded-xl2 border border-ivory-200 bg-ivory-50 p-6 shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:shadow-float ${
                      i === SOCIAL_CONTACTS.length - 1 ? "max-sm:col-span-2" : ""
                    }`}
                  >
                    <span
                      className="absolute inset-x-0 top-0 h-1"
                      style={{ backgroundColor: c.accent }}
                    />
                    <Image
                      src={c.logo}
                      alt={c.name}
                      width={64}
                      height={64}
                      className="h-16 w-16 object-contain transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="min-w-0">
                      <p className="font-serif text-lg font-bold text-ink">{c.name}</p>
                      <p className="mt-1 truncate text-[13px] text-ink-500">{c.handle}</p>
                    </div>
                    <span
                      className="mt-auto inline-flex items-center gap-1.5 text-[13px] font-semibold"
                      style={{ color: c.accent }}
                    >
                      {t.action}
                      <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </span>
                  </a>
                ))}
              </div>
            </div>

            {/* Thông tin liên hệ trực tiếp */}
            <aside className="rounded-[28px] bg-ink px-8 py-10 text-ivory-50 lg:px-9 lg:py-11">
              <span className="text-[11px] font-medium uppercase tracking-eyebrow text-gold-300">
                {t.infoLabel}
              </span>
              <h2 className="mt-4 font-serif text-2xl font-bold leading-[1.15] sm:text-[28px]">
                {t.infoTitle}
              </h2>

              <ul className="mt-8 space-y-7">
                <li className="flex items-start gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-ivory-50/10 text-gold-300">
                    <MapPin className="h-5 w-5" strokeWidth={1.6} />
                  </span>
                  <div>
                    <p className="text-[11px] uppercase tracking-eyebrow text-ivory-200/55">
                      {t.addressLabel}
                    </p>
                    <p className="mt-1.5 text-[15px] leading-relaxed text-ivory-50/90">
                      {t.address}
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-ivory-50/10 text-gold-300">
                    <Phone className="h-5 w-5" strokeWidth={1.6} />
                  </span>
                  <div>
                    <p className="text-[11px] uppercase tracking-eyebrow text-ivory-200/55">
                      {t.phoneLabel}
                    </p>
                    <a
                      href={`tel:${t.phoneTel}`}
                      className="mt-1.5 block font-serif text-xl font-bold text-ivory-50 transition-colors hover:text-gold-300"
                    >
                      {t.phone}
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-ivory-50/10 text-gold-300">
                    <Clock className="h-5 w-5" strokeWidth={1.6} />
                  </span>
                  <div>
                    <p className="text-[11px] uppercase tracking-eyebrow text-ivory-200/55">
                      {t.hoursLabel}
                    </p>
                    <p className="mt-1.5 text-[15px] leading-relaxed text-ivory-50/90">
                      {t.hours}
                    </p>
                  </div>
                </li>
              </ul>
            </aside>
          </div>
        </div>
      </section>

      {/* ── CTA — đặt lịch xem ───────────────────────────────────────── */}
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
            <div className="mt-9 flex justify-center">
              <Link
                href={localePath(locale, "/dat-lich-xem")}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-gold-500 px-7 text-[15px] font-semibold text-white transition-colors hover:bg-gold-600"
              >
                <CalendarClock className="h-4 w-4" />
                {t.ctaButton}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

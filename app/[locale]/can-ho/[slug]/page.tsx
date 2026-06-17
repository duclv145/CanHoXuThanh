import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ChevronRight,
  MapPin,
  Maximize,
  BedDouble,
  Bath,
  Building2,
  Compass,
  Star,
  Sparkles,
  CalendarClock,
  Eye,
  Waves,
  Dumbbell,
  Sun,
  Car,
  ShieldCheck,
  Sofa,
  Smartphone,
  AirVent,
  Utensils,
  WashingMachine,
  Check,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ApartmentGallery } from "@/components/listing/ApartmentGallery";
import { ListingCard } from "@/components/listing/ListingCard";
import { getApartmentBySlug, getSimilarApartments } from "@/lib/data";
import { formatVnd, formatVndFull } from "@/lib/utils";
import { APARTMENT_STATUS_TONE, SUBZONE_THEME } from "@/lib/types";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { localePath } from "@/lib/i18n/config";
import type { Locale } from "@/lib/i18n/config";
import {
  translateDescription,
  translateAmenity,
  statusLabel,
} from "@/lib/i18n/content";

const AMENITY_ICON: Record<string, typeof Eye> = {
  eye: Eye,
  waves: Waves,
  dumbbell: Dumbbell,
  sun: Sun,
  car: Car,
  shield: ShieldCheck,
  sofa: Sofa,
  smartphone: Smartphone,
  air: AirVent,
  utensils: Utensils,
  washing: WashingMachine,
};

export async function generateMetadata({
  params,
}: {
  params: { slug: string; locale: Locale };
}) {
  const apt = await getApartmentBySlug(params.slug);
  const dict = getDictionary(params.locale);
  if (!apt) return { title: `${dict.detail.notFound} - CanHoXuThanh` };
  return {
    title: `${apt.name} - ${apt.subzone} · CanHoXuThanh`,
    description: translateDescription(apt, params.locale),
  };
}

export default async function Page({
  params,
}: {
  params: { slug: string; locale: Locale };
}) {
  const { locale } = params;
  const dict = getDictionary(locale);
  const t = dict.detail;
  const apt = await getApartmentBySlug(params.slug);
  if (!apt) notFound();

  const similar = await getSimilarApartments(apt, 3);
  const theme = SUBZONE_THEME[apt.subzone];
  const images = (apt.media ?? [])
    .filter((m) => m.type === "anh")
    .sort((a, b) => a.sort_order - b.sort_order)
    .map((m) => ({ url: m.url, alt: m.alt ?? apt.name }));
  if (!images.length && apt.cover_url)
    images.push({ url: apt.cover_url, alt: apt.name });

  const floorVal =
    apt.floor != null
      ? locale === "ko"
        ? `${apt.floor}${t.floor}`
        : `${t.floorPrefix} ${apt.floor}`
      : "-";

  const specs = [
    { icon: Maximize, label: t.area, value: `${apt.area} m²` },
    { icon: BedDouble, label: t.layout, value: dict.bedroomLabels[apt.layout] },
    { icon: Bath, label: t.bathrooms, value: `${apt.bathrooms} WC` },
    { icon: Building2, label: t.floor, value: floorVal },
    { icon: Compass, label: t.orientation, value: apt.orientation ?? "-" },
    {
      icon: CalendarClock,
      label: t.term,
      value: dict.termLabels[apt.lease_term],
    },
  ];

  return (
    <>
      <main className="bg-ivory pt-[72px]">
        {/* ── Header band (themed theo phân khu) ─────────────────────── */}
        <header
          className="border-b border-ivory-200"
          style={
            theme
              ? { backgroundColor: theme.bg, borderColor: theme.border }
              : undefined
          }
        >
          <div className="container-x py-8 lg:py-10">
            {/* Breadcrumb */}
            <nav
              className="flex items-center gap-1.5 text-[13px] text-ink-400"
              style={theme ? { color: theme.textMuted } : undefined}
            >
              <Link href={localePath(locale, "/")} className="hover:underline">
                {t.home}
              </Link>
              <ChevronRight className="h-3.5 w-3.5 opacity-60" />
              <Link href={localePath(locale, "/can-ho")} className="hover:underline">
                {t.apartments}
              </Link>
              <ChevronRight className="h-3.5 w-3.5 opacity-60" />
              <span className="line-clamp-1">{apt.name}</span>
            </nav>

            <div className="mt-5 flex flex-wrap items-end justify-between gap-4">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <Badge tone="gold">{apt.subzone}</Badge>
                  <Badge tone={APARTMENT_STATUS_TONE[apt.status]}>
                    {statusLabel(apt.status, locale)}
                  </Badge>
                  {apt.has_ai_tour && (
                    <Badge tone="gold">
                      <Sparkles className="h-3 w-3" /> AI Tour
                    </Badge>
                  )}
                </div>
                <h1
                  className="mt-3 font-serif text-3xl font-bold leading-[1.1] text-ink sm:text-4xl lg:text-[44px]"
                  style={theme ? { color: theme.text } : undefined}
                >
                  {apt.name}
                </h1>
                <p
                  className="mt-3 flex items-center gap-2 text-[15px] text-ink-500"
                  style={theme ? { color: theme.textMuted } : undefined}
                >
                  <MapPin
                    className="h-4 w-4 shrink-0 text-gold-500"
                    style={theme ? { color: theme.textMuted } : undefined}
                  />
                  {apt.address}
                </p>
              </div>

              {apt.rating != null && (
                <div
                  className="flex items-center gap-2 text-ink"
                  style={theme ? { color: theme.text } : undefined}
                >
                  <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
                  <span className="text-2xl font-bold">
                    {apt.rating.toFixed(1)}
                  </span>
                  <span
                    className="text-[13px] text-ink-400"
                    style={theme ? { color: theme.textMuted } : undefined}
                  >
                    /5
                  </span>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* ── Nội dung chính ─────────────────────────────────────────── */}
        <div className="container-x py-10 lg:py-14">
          <div className="grid gap-10 lg:grid-cols-[1.6fr_1fr] lg:gap-14">
            {/* Cột trái */}
            <div className="min-w-0 space-y-12">
              <ApartmentGallery images={images} alt={apt.name} />

              {/* Thông số */}
              <section>
                <h2 className="font-serif text-2xl font-bold text-ink">
                  {t.info}
                </h2>
                <div className="mt-5 grid grid-cols-2 gap-px overflow-hidden rounded-xl2 border border-ivory-200 bg-ivory-200 sm:grid-cols-3">
                  {specs.map(({ icon: Icon, label, value }) => (
                    <div key={label} className="bg-ivory-50 p-5">
                      <Icon className="h-5 w-5 text-gold-600" strokeWidth={1.5} />
                      <p className="mt-3 text-[12px] uppercase tracking-wide text-ink-400">
                        {label}
                      </p>
                      <p className="mt-0.5 font-semibold text-ink">{value}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Mô tả */}
              <section>
                <h2 className="font-serif text-2xl font-bold text-ink">
                  {t.description}
                </h2>
                <p className="mt-4 text-[15px] leading-relaxed text-ink-600">
                  {translateDescription(apt, locale)}
                </p>
              </section>

              {/* Tiện ích */}
              {apt.amenities?.length ? (
                <section>
                  <h2 className="font-serif text-2xl font-bold text-ink">
                    {t.amenities}
                  </h2>
                  <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
                    {apt.amenities.map((am) => {
                      const Icon = AMENITY_ICON[am.icon ?? ""] ?? Check;
                      return (
                        <div
                          key={am.id}
                          className="flex items-center gap-3 rounded-xl border border-ivory-200 bg-ivory-50 px-4 py-3"
                        >
                          <Icon
                            className="h-4 w-4 shrink-0 text-gold-600"
                            strokeWidth={1.5}
                          />
                          <span className="text-[13px] text-ink-700">
                            {translateAmenity(am.name, locale)}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </section>
              ) : null}

              {/* AI Video Tour */}
              {apt.has_ai_tour && (
                <section>
                  <h2 className="font-serif text-2xl font-bold text-ink">
                    {t.aiTour}
                  </h2>
                  <div className="mt-5 flex aspect-video items-center justify-center rounded-xl2 bg-forest text-center">
                    <div className="max-w-xs px-6">
                      <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gold-500 text-ivory-50">
                        <Sparkles className="h-6 w-6" />
                      </span>
                      <p className="mt-4 text-[15px] font-medium text-ivory-50">
                        {t.aiTourTitle}
                      </p>
                      <p className="mt-1 text-[13px] text-ivory-100/70">
                        {t.aiTourDesc}
                      </p>
                    </div>
                  </div>
                </section>
              )}
            </div>

            {/* Cột phải: card giá + đặt lịch (sticky) */}
            <aside className="lg:sticky lg:top-28 lg:self-start">
              <div className="rounded-xl2 border border-ivory-200 bg-ivory-50 p-6 shadow-card">
                <p className="text-[12px] uppercase tracking-wide text-ink-400">
                  {t.price}
                </p>
                <p className="mt-1 text-3xl font-bold text-ink">
                  {formatVnd(apt.price)}
                  <span className="text-base font-medium text-ink-400">
                    {" "}
                    {t.perMonth}
                  </span>
                </p>
                <p className="mt-1 text-[13px] text-ink-500">
                  {formatVndFull(apt.price)} {t.priceFull}
                </p>

                <div className="mt-6 flex flex-col gap-2.5">
                  <Button
                    as="link"
                    href={localePath(locale, `/dat-lich-xem?can_ho=${apt.id}`)}
                    variant="primary"
                    size="lg"
                  >
                    <CalendarClock className="h-4 w-4" />
                    {t.book}
                  </Button>
                  <Button
                    as="link"
                    href="tel:0961893268"
                    variant="outline"
                    size="lg"
                  >
                    {t.call}
                  </Button>
                </div>

                <ul className="mt-6 space-y-2.5 border-t border-ivory-200 pt-5 text-[13px] text-ink-600">
                  {t.benefits.map((b) => (
                    <li key={b} className="flex items-start gap-2.5">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold-600" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </div>

        {/* ── Căn hộ tương tự ────────────────────────────────────────── */}
        {similar.length > 0 && (
          <section className="border-t border-ivory-200 bg-ivory-100">
            <div className="container-x py-12 lg:py-16">
              <h2 className="font-serif text-2xl font-bold text-ink sm:text-3xl">
                {t.similar}
              </h2>
              <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {similar.map((s) => (
                  <ListingCard key={s.id} apartment={s} dict={dict} locale={locale} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </>
  );
}

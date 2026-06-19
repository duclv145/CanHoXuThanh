import Image from "next/image";
import Link from "next/link";
import { BedDouble, Bath, Maximize, MapPin, Sparkles, Star } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { formatVnd } from "@/lib/utils";
import {
  APARTMENT_STATUS_LABEL,
  APARTMENT_STATUS_TONE,
  BEDROOM_SHORT,
  SUBZONE_THEME,
  type Apartment,
} from "@/lib/types";
import { localePath } from "@/lib/i18n/config";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";

export function ListingCard({
  apartment,
  priority = false,
  dict,
  locale,
}: {
  apartment: Apartment;
  priority?: boolean;
  dict: Dictionary;
  locale: Locale;
}) {
  const {
    slug,
    name,
    subzone,
    address,
    area,
    layout,
    bathrooms,
    price,
    rating,
    has_ai_tour,
    status,
    cover_url,
    created_at,
  } = apartment;

  // "Mới" nếu đăng trong vòng 14 ngày.
  const isNew =
    (Date.now() - new Date(created_at).getTime()) / 86_400_000 <= 14;

  // Màu nhận diện phân khu — dùng cho viền card + các dấu ngăn cách.
  // Card vẫn nền trắng, chữ tông ink như thường.
  const accent = SUBZONE_THEME[subzone]?.bg;

  return (
    <Link
      href={localePath(locale, `/can-ho/${slug}`)}
      className="group flex flex-col overflow-hidden rounded-xl2 bg-ivory-50 shadow-card transition-all duration-500 hover:-translate-y-1 hover:shadow-float focus-visible:-translate-y-1"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        {cover_url ? (
          <Image
            src={cover_url}
            alt={`${name} - ${subzone}`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1240px) 50vw, 400px"
            className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
            priority={priority}
          />
        ) : (
          <div className="h-full w-full bg-ivory-300" />
        )}

        <div className="absolute inset-x-0 top-0 flex items-start justify-between gap-2 p-4">
          <div className="flex flex-wrap items-center gap-2">
            {accent ? (
              <span
                className="inline-flex items-center rounded-full px-3 py-1 text-[11px] font-medium tracking-wide text-white shadow-sm"
                style={{ backgroundColor: accent }}
              >
                {subzone}
              </span>
            ) : (
              <Badge tone="ivory">{subzone}</Badge>
            )}
            {isNew && <Badge tone="blush">{dict.card.new}</Badge>}
          </div>
          {has_ai_tour && (
            <Badge tone="gold">
              <Sparkles className="h-3 w-3" /> AI Tour
            </Badge>
          )}
        </div>

        <div className="absolute inset-x-0 bottom-0 p-4">
          <Badge tone={APARTMENT_STATUS_TONE[status]}>
            {APARTMENT_STATUS_LABEL[status]}
          </Badge>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-serif text-[17px] font-bold leading-snug text-ink transition-colors group-hover:text-gold-600">
            {name}
          </h3>
          {rating != null && (
            <span className="mt-1 flex shrink-0 items-center gap-1 text-[13px] font-medium text-ink-600">
              <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
              {rating.toFixed(1)}
            </span>
          )}
        </div>

        <p className="mt-2 flex items-center gap-1.5 text-[13px] text-ink-500">
          <MapPin
            className="h-3.5 w-3.5 shrink-0 text-gold-500"
            style={accent ? { color: accent } : undefined}
          />
          <span className="line-clamp-1">{address}</span>
        </p>

        <div className="my-4 flex items-center gap-4 text-[13px] text-ink-600">
          <span className="flex items-center gap-1.5">
            <Maximize className="h-4 w-4 text-ink-400" strokeWidth={1.5} />
            {area} m²
          </span>
          <span
            className="h-3 w-px bg-ivory-300"
            style={accent ? { backgroundColor: accent } : undefined}
          />
          <span className="flex items-center gap-1.5">
            <BedDouble className="h-4 w-4 text-ink-400" strokeWidth={1.5} />
            {locale === "ko" ? dict.bedroomLabels[layout] : BEDROOM_SHORT[layout]}
          </span>
          <span
            className="h-3 w-px bg-ivory-300"
            style={accent ? { backgroundColor: accent } : undefined}
          />
          <span className="flex items-center gap-1.5">
            <Bath className="h-4 w-4 text-ink-400" strokeWidth={1.5} />
            {bathrooms} WC
          </span>
        </div>

        <div
          className="mt-auto border-t border-ivory-200 pt-4"
          style={accent ? { borderTopColor: accent } : undefined}
        >
          <p className="text-xl font-bold text-ink">{formatVnd(price)}</p>
          <div className="-mt-1 flex items-baseline justify-between">
            <p className="text-[11px] uppercase tracking-wide text-ink-400">
              {dict.card.perMonth}
            </p>
            <span className="text-[13px] font-medium text-gold-600 link-underline">
              {dict.card.detail}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

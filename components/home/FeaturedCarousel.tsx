"use client";

import { useState, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  MapPin,
  Star,
  Maximize,
  BedDouble,
  Bath,
} from "lucide-react";
import { formatVnd } from "@/lib/utils";
import { localePath } from "@/lib/i18n/config";
import {
  BEDROOM_SHORT,
  SUBZONE_THEME,
  APARTMENT_STATUS_LABEL,
  APARTMENT_STATUS_TONE,
  type Apartment,
} from "@/lib/types";
import { Badge } from "@/components/ui/Badge";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";

/** Một banner của 1 căn hộ. */
function Slide({
  apt,
  dict,
  locale,
  priority,
}: {
  apt: Apartment;
  dict: Dictionary;
  locale: Locale;
  priority: boolean;
}) {
  const accent = SUBZONE_THEME[apt.subzone]?.bg;
  const layoutLabel = locale === "ko" ? dict.bedroomLabels[apt.layout] : BEDROOM_SHORT[apt.layout];

  return (
    <div className="relative h-[78vh] min-h-[560px] max-h-[860px] w-full shrink-0">
      {apt.cover_url ? (
        <Image
          src={apt.cover_url}
          alt={`${apt.name} - ${apt.subzone}`}
          fill
          sizes="(max-width: 1280px) 100vw, 1200px"
          className="object-cover"
          priority={priority}
        />
      ) : (
        <div className="h-full w-full bg-ivory-300" />
      )}

      {/* Phủ tối nhẹ phía trái cho badge dễ đọc */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/45 via-black/15 to-transparent" />

      {/* Badge địa chỉ — top-left */}
      <div className="absolute left-5 top-5 z-10 flex items-center gap-2 rounded-full bg-ivory-50/95 px-4 py-2.5 shadow-card backdrop-blur lg:left-8 lg:top-8">
        <MapPin className="h-4 w-4 shrink-0 text-gold-600" />
        <span className="max-w-[200px] truncate text-[13px] font-medium text-ink">
          {apt.address.split(",")[0].trim()}
        </span>
      </div>

      {/* Badge rating */}
      {apt.rating != null && (
        <div className="absolute left-5 top-[72px] z-10 flex items-center gap-1.5 rounded-full bg-ink px-3.5 py-2 shadow-card lg:left-8 lg:top-[92px]">
          <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
          <span className="text-[13px] font-semibold text-white">{apt.rating.toFixed(1)}/5</span>
        </div>
      )}

      {/* Thẻ thông tin — phải (desktop) / dưới (mobile) */}
      <div className="absolute bottom-5 left-1/2 z-10 w-[calc(100%-2.5rem)] max-w-[440px] -translate-x-1/2 rounded-xl2 bg-ivory-50/95 p-4 shadow-float backdrop-blur lg:bottom-auto lg:left-auto lg:right-9 lg:top-1/2 lg:-translate-x-0 lg:-translate-y-1/2 lg:p-7">
        <div className="mb-2 flex items-center gap-2 lg:mb-3">
          {accent ? (
            <span
              className="inline-flex items-center rounded-full px-3 py-1 text-[11px] font-medium tracking-wide text-white"
              style={{ backgroundColor: accent }}
            >
              {apt.subzone}
            </span>
          ) : (
            <Badge tone="ivory">{apt.subzone}</Badge>
          )}
          <Badge tone={APARTMENT_STATUS_TONE[apt.status]}>
            {APARTMENT_STATUS_LABEL[apt.status]}
          </Badge>
        </div>

        {/* Tên */}
        <h3 className="font-serif text-[18px] font-bold leading-snug text-ink lg:text-[22px]">
          {apt.name}
        </h3>

        <p className="mt-1.5 flex items-center gap-1.5 text-[13px] text-ink-500 lg:mt-2">
          <MapPin className="h-3.5 w-3.5 shrink-0 text-gold-500" />
          <span className="line-clamp-1">{apt.address}</span>
        </p>

        {/* Thông số */}
        <div className="mt-3 flex items-center gap-5 border-y border-ivory-200 py-2.5 text-[14px] text-ink-700 lg:mt-5 lg:py-4">
          <span className="flex items-center gap-2">
            <Maximize className="h-4 w-4 text-ink-400" strokeWidth={1.5} />
            {apt.area} m²
          </span>
          <span className="h-4 w-px bg-ivory-300" />
          <span className="flex items-center gap-2">
            <BedDouble className="h-4 w-4 text-ink-400" strokeWidth={1.5} />
            {layoutLabel}
          </span>
          <span className="h-4 w-px bg-ivory-300" />
          <span className="flex items-center gap-2">
            <Bath className="h-4 w-4 text-ink-400" strokeWidth={1.5} />
            {apt.bathrooms} WC
          </span>
        </div>

        {/* Giá + CTA */}
        <div className="mt-3.5 flex items-center justify-between gap-3 lg:mt-5">
          <div className="flex items-baseline gap-1">
            <span className="text-[24px] font-bold leading-none tracking-tight text-ink lg:text-[30px]">
              {formatVnd(apt.price)}
            </span>
            <span className="text-[12px] text-ink-400 lg:text-[13px]">{dict.card.perMonth}</span>
          </div>
          <Link
            href={localePath(locale, `/can-ho/${apt.slug}`)}
            className="shrink-0 rounded-full bg-ink px-6 py-2.5 text-center text-[14px] font-semibold text-white transition-colors hover:bg-gold-600 active:scale-[0.98] lg:px-7 lg:py-3 lg:text-[15px]"
          >
            {dict.card.detail}
          </Link>
        </div>
      </div>
    </div>
  );
}

export function FeaturedCarousel({
  apartments,
  dict,
  locale,
}: {
  apartments: Apartment[];
  dict: Dictionary;
  locale: Locale;
}) {
  const n = apartments.length;
  // Clone 2 đầu để cuộn vòng lặp liền mạch: [last, ...slides, first]
  const ext =
    n > 1 ? [apartments[n - 1], ...apartments, apartments[0]] : apartments;

  // pos: vị trí trong mảng mở rộng (1..n là slide thật; 0 và n+1 là bản clone).
  const [pos, setPos] = useState(n > 1 ? 1 : 0);
  const [animate, setAnimate] = useState(true);
  const lock = useRef(false);
  const touchX = useRef<number | null>(null);

  const go = useCallback(
    (dir: 1 | -1) => {
      if (n < 2 || lock.current) return;
      lock.current = true;
      setAnimate(true);
      setPos((p) => p + dir);
    },
    [n],
  );

  const goTo = useCallback(
    (realIdx: number) => {
      if (lock.current) return;
      lock.current = true;
      setAnimate(true);
      setPos(realIdx + 1);
    },
    [],
  );

  // Sau khi trượt tới bản clone → nhảy tức thì về slide thật tương ứng.
  const handleTransitionEnd = useCallback(() => {
    lock.current = false;
    if (pos === n + 1) {
      setAnimate(false);
      setPos(1);
    } else if (pos === 0) {
      setAnimate(false);
      setPos(n);
    }
  }, [pos, n]);

  const onTouchStart = (e: React.TouchEvent) => {
    touchX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchX.current == null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    if (dx > 50) go(-1);
    else if (dx < -50) go(1);
    touchX.current = null;
  };

  if (!n) return null;

  const activeIdx = ((pos - 1) % n + n) % n;

  return (
    <div className="relative overflow-hidden rounded-[28px]">
      {/* Track trượt */}
      <div
        className="flex ease-[cubic-bezier(0.22,1,0.36,1)]"
        style={{
          transform: `translateX(-${pos * 100}%)`,
          transition: "transform",
          transitionDuration: animate ? "700ms" : "0ms",
        }}
        onTransitionEnd={handleTransitionEnd}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {ext.map((apt, i) => (
          <Slide
            key={`${apt.id}-${i}`}
            apt={apt}
            dict={dict}
            locale={locale}
            priority={i <= 1}
          />
        ))}
      </div>

      {n > 1 && (
        <>
          {/* Nút trái */}
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Trước"
            className="absolute left-4 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-ivory-50/90 text-ink shadow-card backdrop-blur transition hover:bg-ivory-50 hover:text-gold-600 lg:left-6 lg:h-14 lg:w-14"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          {/* Nút phải */}
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Tiếp"
            className="absolute right-4 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-ivory-50/90 text-ink shadow-card backdrop-blur transition hover:bg-ivory-50 hover:text-gold-600 lg:right-6 lg:h-14 lg:w-14"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          {/* Dots */}
          <div className="absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 items-center gap-1.5 lg:left-8 lg:translate-x-0">
            {apartments.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Slide ${i + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === activeIdx ? "w-7 bg-white" : "w-1.5 bg-white/50 hover:bg-white/80"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Search, ChevronDown } from "lucide-react";
import {
  SUBZONES,
  BEDROOM_TYPES,
  LEASE_TERM_LABEL,
  type LeaseTerm,
} from "@/lib/types";
import { useI18n, localePath } from "@/lib/i18n/provider";

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wide text-ink-500">
        {label}
      </span>
      <div className="relative">
        {children}
        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
      </div>
    </label>
  );
}

const selectClass =
  "h-11 w-full appearance-none rounded-lg border border-ivory-300 bg-ivory-50 px-3.5 pr-9 text-sm text-ink outline-none transition-colors focus:border-gold-400";

export function SearchCard({
  stats,
}: {
  stats: { available: number; avgRating: number; responseTime: string };
}) {
  const router = useRouter();
  const { locale, dict } = useI18n();
  const t = dict.search;
  const [subzone, setSubzone] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [price, setPrice] = useState("");
  const [term, setTerm] = useState("");

  const PRICE_OPTIONS = [
    { label: t.allPrices, value: "" },
    { label: t.priceOptions.under15, value: "-15" },
    { label: t.priceOptions.p15_25, value: "15-25" },
    { label: t.priceOptions.p25_35, value: "25-35" },
    { label: t.priceOptions.over35, value: "35-" },
  ];
  const BEDROOM_OPTIONS = [
    { label: t.allTypes, value: "" },
    ...BEDROOM_TYPES.map((b) => ({ label: dict.bedroomLabels[b.value], value: b.value })),
  ];

  function handleSearch() {
    const params = new URLSearchParams();
    if (subzone) params.set("phan_khu", subzone);
    if (bedrooms) params.set("phong_ngu", bedrooms);
    if (price) {
      const [min, max] = price.split("-");
      if (min) params.set("gia_min", min);
      if (max) params.set("gia_max", max);
    }
    if (term) params.set("thoi_han", term);
    const qs = params.toString();
    router.push(localePath(locale, `/can-ho${qs ? `?${qs}` : ""}`));
  }

  return (
    <div className="rounded-xl2 border border-ivory-200 bg-ivory-50/95 p-6 shadow-float backdrop-blur-md sm:p-7">
      <p className="mb-5 text-lg font-bold text-ink">{t.title}</p>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label={t.subzone}>
          <select
            className={selectClass}
            value={subzone}
            onChange={(e) => setSubzone(e.target.value)}
          >
            <option value="">{t.allSubzones}</option>
            {SUBZONES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </Field>

        <Field label={t.bedrooms}>
          <select
            className={selectClass}
            value={bedrooms}
            onChange={(e) => setBedrooms(e.target.value)}
          >
            {BEDROOM_OPTIONS.map((o) => (
              <option key={o.label} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </Field>

        <Field label={t.price}>
          <select
            className={selectClass}
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          >
            {PRICE_OPTIONS.map((o) => (
              <option key={o.label} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </Field>

        <Field label={t.term}>
          <select
            className={selectClass}
            value={term}
            onChange={(e) => setTerm(e.target.value)}
          >
            <option value="">{t.flexible}</option>
            {(Object.keys(LEASE_TERM_LABEL) as LeaseTerm[]).map((lt) => (
              <option key={lt} value={lt}>
                {dict.termLabels[lt]}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <button
        type="button"
        onClick={handleSearch}
        className="mt-5 flex h-12 w-full items-center justify-center gap-2 rounded-full border border-ink/20 text-sm font-medium text-ink transition-all duration-300 hover:border-ink hover:bg-ink hover:text-ivory-50"
      >
        <Search className="h-4 w-4" />
        {t.submit}
      </button>

      {/* 3 chỉ số nhanh */}
      <div className="mt-6 grid grid-cols-3 gap-2 border-t border-ivory-200 pt-5 text-center">
        <Stat value={`${stats.available}`} label={t.statAvailable} />
        <Stat value={`${stats.avgRating}★`} label={t.statRating} />
        <Stat
          value={locale === "ko" ? stats.responseTime.replace("phút", "분") : stats.responseTime}
          label={t.statResponse}
        />
      </div>
    </div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <p className="text-xl font-bold text-ink">{value}</p>
      <p className="mt-0.5 text-[11px] leading-tight text-ink-500">{label}</p>
    </div>
  );
}

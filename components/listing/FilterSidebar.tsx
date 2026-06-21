"use client";

import { useCallback, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { SlidersHorizontal, X } from "lucide-react";
import {
  SUBZONES,
  BEDROOM_TYPES,
  LEASE_TERM_LABEL,
  type Subzone,
} from "@/lib/types";
import { useI18n, localePath } from "@/lib/i18n/provider";
import { cn } from "@/lib/utils";

interface LocalFilters {
  subzones: Subzone[];
  bedrooms: string;
  minPrice: string; // in triệu
  maxPrice: string; // in triệu
  minArea: string;
  leaseTerm: string;
}

function readFromParams(params: URLSearchParams): LocalFilters {
  return {
    subzones: params.get("phan_khu")
      ? (params.get("phan_khu")!.split(",") as Subzone[])
      : [],
    bedrooms: params.get("phong_ngu") ?? "",
    minPrice: params.get("gia_min") ?? "",
    maxPrice: params.get("gia_max") ?? "",
    minArea: params.get("dien_tich") ?? "",
    leaseTerm: params.get("thoi_han") ?? "",
  };
}

function buildQs(params: URLSearchParams, f: LocalFilters): string {
  const next = new URLSearchParams();
  if (f.subzones.length) next.set("phan_khu", f.subzones.join(","));
  if (f.bedrooms) next.set("phong_ngu", f.bedrooms);
  if (f.minPrice) next.set("gia_min", f.minPrice);
  if (f.maxPrice) next.set("gia_max", f.maxPrice);
  if (f.minArea) next.set("dien_tich", f.minArea);
  if (f.leaseTerm) next.set("thoi_han", f.leaseTerm);
  const sort = params.get("sap_xep");
  if (sort) next.set("sap_xep", sort);
  return next.toString();
}

export function FilterSidebar({ onApply }: { onApply?: () => void } = {}) {
  const router = useRouter();
  const params = useSearchParams();
  const { locale, dict } = useI18n();
  const tf = dict.filters;
  const [local, setLocal] = useState<LocalFilters>(() => readFromParams(params));

  const hasFilter =
    local.subzones.length > 0 ||
    local.bedrooms !== "" ||
    local.minPrice !== "" ||
    local.maxPrice !== "" ||
    local.minArea !== "" ||
    local.leaseTerm !== "";

  const toggleSubzone = (z: Subzone) =>
    setLocal((f) => ({
      ...f,
      subzones: f.subzones.includes(z)
        ? f.subzones.filter((s) => s !== z)
        : [...f.subzones, z],
    }));

  const apply = useCallback(() => {
    const qs = buildQs(params, local);
    router.push(localePath(locale, `/can-ho${qs ? `?${qs}` : ""}`));
    onApply?.();
  }, [router, params, local, onApply, locale]);

  const clear = useCallback(() => {
    const cleared: LocalFilters = {
      subzones: [],
      bedrooms: "",
      minPrice: "",
      maxPrice: "",
      minArea: "",
      leaseTerm: "",
    };
    setLocal(cleared);
    const sort = params.get("sap_xep");
    router.push(localePath(locale, sort ? `/can-ho?sap_xep=${sort}` : "/can-ho"));
    onApply?.();
  }, [router, params, onApply, locale]);

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="h-4 w-4 text-gold-500" />
          <span className="text-sm font-semibold text-ink">{tf.title}</span>
        </div>
        {hasFilter && (
          <button
            onClick={clear}
            className="flex items-center gap-1 text-xs text-ink-500 transition-colors hover:text-gold-600"
          >
            <X className="h-3.5 w-3.5" />
            {tf.clear}
          </button>
        )}
      </div>

      {/* Phân khu */}
      <FilterSection label={tf.subzone}>
        <div className="space-y-2.5">
          {SUBZONES.map((z) => (
            <label key={z} className="flex cursor-pointer items-center gap-2.5">
              <input
                type="checkbox"
                checked={local.subzones.includes(z)}
                onChange={() => toggleSubzone(z)}
                className="h-4 w-4 rounded border-ivory-300 accent-gold-500"
              />
              <span className="text-[13px] text-ink-600">{z}</span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Số phòng ngủ */}
      <FilterSection label={tf.bedrooms}>
        <div className="flex flex-wrap gap-2">
          {[
            { v: "", l: tf.all },
            ...BEDROOM_TYPES.map((b) => ({ v: b.value, l: dict.bedroomLabels[b.value] })),
          ].map(({ v, l }) => (
            <button
              key={v}
              type="button"
              onClick={() => setLocal((f) => ({ ...f, bedrooms: v }))}
              className={cn(
                "rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors",
                local.bedrooms === v
                  ? "border-gold-500 bg-gold-50 text-gold-600"
                  : "border-ivory-300 text-ink-500 hover:border-gold-300 hover:text-ink",
              )}
            >
              {l}
            </button>
          ))}
        </div>
      </FilterSection>

      {/* Khoảng giá */}
      <FilterSection label={tf.priceRange}>
        <div className="flex items-center gap-2">
          <input
            type="number"
            placeholder={tf.from}
            value={local.minPrice}
            onChange={(e) => setLocal((f) => ({ ...f, minPrice: e.target.value }))}
            min={0}
            className="w-full rounded-lg border border-ivory-300 bg-ivory-50 px-3 py-2 text-[13px] text-ink placeholder:text-ink-400 focus:border-gold-400 focus:outline-none"
          />
          <span className="shrink-0 text-xs text-ink-400">-</span>
          <input
            type="number"
            placeholder={tf.to}
            value={local.maxPrice}
            onChange={(e) => setLocal((f) => ({ ...f, maxPrice: e.target.value }))}
            min={0}
            className="w-full rounded-lg border border-ivory-300 bg-ivory-50 px-3 py-2 text-[13px] text-ink placeholder:text-ink-400 focus:border-gold-400 focus:outline-none"
          />
        </div>
      </FilterSection>

      {/* Diện tích */}
      <FilterSection label={tf.minArea}>
        <div className="flex flex-wrap gap-2">
          {[
            { v: "", l: tf.all },
            { v: "40", l: "40 m²" },
            { v: "60", l: "60 m²" },
            { v: "80", l: "80 m²" },
            { v: "100", l: "100+ m²" },
          ].map(({ v, l }) => (
            <button
              key={v}
              type="button"
              onClick={() => setLocal((f) => ({ ...f, minArea: v }))}
              className={cn(
                "rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors",
                local.minArea === v
                  ? "border-gold-500 bg-gold-50 text-gold-600"
                  : "border-ivory-300 text-ink-500 hover:border-gold-300 hover:text-ink",
              )}
            >
              {l}
            </button>
          ))}
        </div>
      </FilterSection>

      {/* Thời hạn thuê */}
      <FilterSection label={tf.term}>
        <div className="space-y-2.5">
          {[
            { v: "", l: tf.all },
            ...Object.keys(LEASE_TERM_LABEL).map((v) => ({
              v,
              l: dict.termLabels[v as keyof typeof dict.termLabels],
            })),
          ].map(({ v, l }) => (
            <label key={v} className="flex cursor-pointer items-center gap-2.5">
              <input
                type="radio"
                name="lease_term_filter"
                checked={local.leaseTerm === v}
                onChange={() => setLocal((f) => ({ ...f, leaseTerm: v }))}
                className="h-4 w-4 accent-gold-500"
              />
              <span className="text-[13px] text-ink-600">{l}</span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Apply */}
      <button
        type="button"
        onClick={apply}
        className="w-full rounded-xl bg-gold-500 py-3 text-sm font-semibold text-white transition-colors hover:bg-gold-600 active:scale-[0.98]"
      >
        {tf.apply}
      </button>
    </div>
  );
}

function FilterSection({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="mb-3 flex items-center gap-2.5">
        <p className="shrink-0 text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-400">
          {label}
        </p>
        <span className="h-px flex-1 bg-ivory-200" />
      </div>
      {children}
    </div>
  );
}

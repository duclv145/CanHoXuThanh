"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { SlidersHorizontal } from "lucide-react";
import { useI18n, localePath } from "@/lib/i18n/provider";

export function SortBar({
  count,
  onFilterClick,
}: {
  count: number;
  onFilterClick: () => void;
}) {
  const router = useRouter();
  const params = useSearchParams();
  const { locale, dict } = useI18n();
  const current = params.get("sap_xep") ?? "moi_nhat";

  const SORT_OPTIONS = [
    { value: "moi_nhat", label: dict.listing.sort.newest },
    { value: "gia_tang", label: dict.listing.sort.priceAsc },
    { value: "gia_giam", label: dict.listing.sort.priceDesc },
    { value: "danh_gia", label: dict.listing.sort.rating },
  ];

  const setSort = (value: string) => {
    const next = new URLSearchParams(params.toString());
    if (value === "moi_nhat") next.delete("sap_xep");
    else next.set("sap_xep", value);
    const qs = next.toString();
    router.push(localePath(locale, `/can-ho${qs ? `?${qs}` : ""}`));
  };

  return (
    <div className="mb-6 flex items-center justify-between border-b border-ivory-200 pb-5">
      <p className="text-[14px] text-ink-500">
        {dict.listing.showing_a}{" "}
        <span className="font-semibold text-ink">{count}</span> {dict.listing.showing_b}
      </p>

      <div className="flex items-center gap-2.5">
        {/* Mobile filter toggle */}
        <button
          type="button"
          onClick={onFilterClick}
          className="flex items-center gap-1.5 rounded-lg border border-ivory-300 px-3 py-2 text-xs font-medium text-ink-600 transition-colors hover:border-gold-400 hover:text-ink lg:hidden"
        >
          <SlidersHorizontal className="h-3.5 w-3.5 text-gold-500" />
          {dict.listing.filter}
        </button>

        {/* Sort */}
        <div className="flex items-center gap-2">
          <span className="hidden text-xs text-ink-400 sm:inline">{dict.listing.sortLabel}</span>
          <select
            value={current}
            onChange={(e) => setSort(e.target.value)}
            className="cursor-pointer rounded-lg border border-ivory-300 bg-white px-3 py-2 text-[13px] text-ink focus:border-gold-400 focus:outline-none"
          >
            {SORT_OPTIONS.map(({ value, label }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

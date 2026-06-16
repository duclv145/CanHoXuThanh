"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { SlidersHorizontal } from "lucide-react";

const SORT_OPTIONS = [
  { value: "moi_nhat", label: "Mới nhất" },
  { value: "gia_tang", label: "Giá tăng dần" },
  { value: "gia_giam", label: "Giá giảm dần" },
  { value: "danh_gia", label: "Đánh giá cao" },
];

export function SortBar({
  count,
  onFilterClick,
}: {
  count: number;
  onFilterClick: () => void;
}) {
  const router = useRouter();
  const params = useSearchParams();
  const current = params.get("sap_xep") ?? "moi_nhat";

  const setSort = (value: string) => {
    const next = new URLSearchParams(params.toString());
    if (value === "moi_nhat") next.delete("sap_xep");
    else next.set("sap_xep", value);
    const qs = next.toString();
    router.push(`/can-ho${qs ? `?${qs}` : ""}`);
  };

  return (
    <div className="mb-6 flex items-center justify-between border-b border-ivory-200 pb-5">
      <p className="text-[14px] text-ink-500">
        Hiển thị{" "}
        <span className="font-semibold text-ink">{count}</span> căn hộ
      </p>

      <div className="flex items-center gap-2.5">
        {/* Mobile filter toggle */}
        <button
          type="button"
          onClick={onFilterClick}
          className="flex items-center gap-1.5 rounded-lg border border-ivory-300 px-3 py-2 text-xs font-medium text-ink-600 transition-colors hover:border-gold-400 hover:text-ink lg:hidden"
        >
          <SlidersHorizontal className="h-3.5 w-3.5 text-gold-500" />
          Bộ lọc
        </button>

        {/* Sort */}
        <div className="flex items-center gap-2">
          <span className="hidden text-xs text-ink-400 sm:inline">Sắp xếp:</span>
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

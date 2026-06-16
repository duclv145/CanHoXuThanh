"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Search, ChevronDown } from "lucide-react";
import { SUBZONES, LEASE_TERM_LABEL, type LeaseTerm } from "@/lib/types";

const PRICE_OPTIONS = [
  { label: "Mọi mức giá", value: "" },
  { label: "Dưới 15 triệu", value: "0-15000000" },
  { label: "15 – 25 triệu", value: "15000000-25000000" },
  { label: "25 – 35 triệu", value: "25000000-35000000" },
  { label: "Trên 35 triệu", value: "35000000-" },
];

const BEDROOM_OPTIONS = [
  { label: "Mọi loại", value: "" },
  { label: "1 phòng ngủ", value: "1" },
  { label: "2 phòng ngủ", value: "2" },
  { label: "3+ phòng ngủ", value: "3" },
];

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
  const [subzone, setSubzone] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [price, setPrice] = useState("");
  const [term, setTerm] = useState("");

  function handleSearch() {
    const params = new URLSearchParams();
    if (subzone) params.set("subzone", subzone);
    if (bedrooms) params.set("bedrooms", bedrooms);
    if (price) {
      const [min, max] = price.split("-");
      if (min) params.set("minPrice", min);
      if (max) params.set("maxPrice", max);
    }
    if (term) params.set("leaseTerm", term);
    router.push(`/can-ho${params.toString() ? `?${params}` : ""}`);
  }

  return (
    <div className="rounded-xl2 border border-ivory-200 bg-ivory-50/95 p-6 shadow-float backdrop-blur-md sm:p-7">
      <p className="mb-5 text-lg font-bold text-ink">
        Tìm căn hộ phù hợp với bạn
      </p>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Phân khu">
          <select
            className={selectClass}
            value={subzone}
            onChange={(e) => setSubzone(e.target.value)}
          >
            <option value="">Tất cả phân khu</option>
            {SUBZONES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Số phòng ngủ">
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

        <Field label="Mức giá">
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

        <Field label="Thời hạn thuê">
          <select
            className={selectClass}
            value={term}
            onChange={(e) => setTerm(e.target.value)}
          >
            <option value="">Linh hoạt</option>
            {(Object.keys(LEASE_TERM_LABEL) as LeaseTerm[]).map((t) => (
              <option key={t} value={t}>
                {LEASE_TERM_LABEL[t]}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <button
        type="button"
        onClick={handleSearch}
        className="mt-5 flex h-12 w-full items-center justify-center gap-2 rounded-full bg-ink text-sm font-medium text-ivory-50 transition-colors hover:bg-ink-800"
      >
        <Search className="h-4 w-4" />
        Tìm kiếm căn hộ
      </button>

      {/* 3 chỉ số nhanh */}
      <div className="mt-6 grid grid-cols-3 gap-2 border-t border-ivory-200 pt-5 text-center">
        <Stat value={`${stats.available}`} label="Căn đang trống" />
        <Stat value={`${stats.avgRating}★`} label="Đánh giá TB" />
        <Stat value={stats.responseTime} label="Phản hồi" />
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

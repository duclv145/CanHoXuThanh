import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** 25.000.000 → "25 triệu/tháng" | 1.200.000.000 → "1,2 tỷ" */
export function formatVnd(value: number, opts?: { perMonth?: boolean }): string {
  let core: string;
  if (value >= 1_000_000_000) {
    core = `${trimZero(value / 1_000_000_000)} tỷ`;
  } else if (value >= 1_000_000) {
    core = `${trimZero(value / 1_000_000)} triệu`;
  } else {
    core = `${value.toLocaleString("vi-VN")}đ`;
  }
  return opts?.perMonth ? `${core}/tháng` : core;
}

/** Số đầy đủ kèm ký hiệu đồng: 25000000 → "25.000.000 ₫" */
export function formatVndFull(value: number): string {
  return `${value.toLocaleString("vi-VN")} ₫`;
}

function trimZero(n: number): string {
  return n.toFixed(1).replace(/\.0$/, "").replace(".", ",");
}

export function formatDateVi(input: string | Date): string {
  const d = typeof input === "string" ? new Date(input) : input;
  return d.toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

export function slugify(input: string): string {
  return input
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

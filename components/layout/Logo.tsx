import { cn } from "@/lib/utils";

// Wordmark "CanHoXuThanh" — "CanHo" (amber) + "XuThanh" (ink/ivory).
// CamelCase giữ ranh giới từ giữa "Hộ" và "Xứ" cho người đọc tiếng Việt.
// tone="ivory" dùng trên nền tối.
export function Logo({
  className,
  tone = "ink",
}: {
  className?: string;
  tone?: "ink" | "ivory";
}) {
  return (
    <span
      aria-label="CanHoXuThanh"
      className={cn(
        "select-none font-serif text-[22px] font-extrabold leading-none tracking-tight",
        tone === "ivory" ? "text-ivory-50" : "text-ink",
        className,
      )}
    >
      <span className="text-gold-500">CanHo</span>XuThanh
    </span>
  );
}

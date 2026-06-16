import { cn } from "@/lib/utils";

// Wordmark "xuthanhhomes" — "xuthanh" (amber) + "homes" (ink/ivory).
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
      aria-label="XuThanhHomes"
      className={cn(
        "select-none font-serif text-[22px] font-extrabold lowercase leading-none tracking-tight",
        tone === "ivory" ? "text-ivory-50" : "text-ink",
        className,
      )}
    >
      <span className="text-gold-500">xuthanh</span>homes
    </span>
  );
}

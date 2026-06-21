import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type Tone =
  | "ivory"
  | "gold"
  | "ink"
  | "outline"
  | "green"
  | "teal"
  | "rose"
  | "blush"
  | "mist";

const tones: Record<Tone, string> = {
  ivory: "bg-ivory-50/90 text-ink backdrop-blur",
  gold: "bg-gold-500 text-ivory-50",
  ink: "bg-ink text-ivory-50",
  outline: "border border-ink/15 text-ink-600",
  green: "bg-ink text-ivory-50",
  teal: "bg-teal-600 text-ivory-50",
  rose: "bg-rose-600 text-ivory-50",
  blush: "bg-rose-300 text-rose-700",
  mist: "bg-mist text-ink-700",
};

export function Badge({
  children,
  tone = "ivory",
  className,
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-medium tracking-wide",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

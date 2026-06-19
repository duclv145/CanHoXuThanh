import Link from "next/link";
import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";

type Variant = "primary" | "outline" | "ghost" | "gold" | "ivory";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 font-medium transition-all duration-300 disabled:opacity-50 disabled:pointer-events-none whitespace-nowrap";

const variants: Record<Variant, string> = {
  primary: "bg-gold-500 text-white hover:bg-gold-600 hover:shadow-card",
  gold: "bg-gold-500 text-white hover:bg-gold-600 hover:shadow-card",
  ivory: "bg-ivory-50 text-ink hover:bg-ivory-200 hover:shadow-card",
  outline:
    "border border-ink/20 text-ink hover:border-ink hover:bg-ink hover:text-ivory-50",
  ghost: "text-ink hover:bg-ink/5",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-[13px] rounded-full",
  md: "h-11 px-6 text-sm rounded-full",
  lg: "h-13 px-8 text-[15px] rounded-full h-[52px]",
};

type ButtonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
} & (
  | ({ as?: "button" } & ComponentProps<"button">)
  | ({ as: "link"; href: string } & ComponentProps<typeof Link>)
);

export function Button(props: ButtonProps) {
  const { variant = "primary", size = "md", className, ...rest } = props;
  const classes = cn(base, variants[variant], sizes[size], className);

  if (rest.as === "link") {
    const { as: _as, ...linkProps } = rest;
    return <Link className={classes} {...linkProps} />;
  }
  const { as: _as, ...buttonProps } = rest as ComponentProps<"button"> & {
    as?: "button";
  };
  return <button className={classes} {...buttonProps} />;
}

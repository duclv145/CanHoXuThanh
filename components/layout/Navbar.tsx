"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/layout/Logo";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Căn hộ", href: "/can-ho" },
  { label: "Chủ nhà", href: "/chu-nha/dang-nhap" },
  { label: "Dịch vụ", href: "/#dich-vu" },
  { label: "Về chúng tôi", href: "/#ve-chung-toi" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled
          ? "border-b border-ivory-200 bg-ivory-100/85 backdrop-blur-md"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <nav className="container-x flex h-[72px] items-center justify-between">
        <Link href="/" aria-label="VinTH StarLiving — trang chủ">
          <Logo />
        </Link>

        <div className="hidden items-center gap-9 lg:flex">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="link-underline text-sm font-medium text-ink-700 transition-colors hover:text-ink"
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <Button as="link" href="/dat-lich-xem" variant="primary" size="md">
            Đặt lịch xem
          </Button>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex h-11 w-11 items-center justify-center rounded-full text-ink lg:hidden"
          aria-label={open ? "Đóng menu" : "Mở menu"}
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={cn(
          "overflow-hidden border-t border-ivory-200 bg-ivory-100 lg:hidden",
          open ? "max-h-96" : "max-h-0",
          "transition-all duration-500",
        )}
      >
        <div className="container-x flex flex-col gap-1 py-4">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-3 text-[15px] font-medium text-ink-700 hover:bg-ink/5"
            >
              {l.label}
            </Link>
          ))}
          <Button
            as="link"
            href="/dat-lich-xem"
            variant="primary"
            size="md"
            className="mt-2"
            onClick={() => setOpen(false)}
          >
            Đặt lịch xem
          </Button>
        </div>
      </div>
    </header>
  );
}

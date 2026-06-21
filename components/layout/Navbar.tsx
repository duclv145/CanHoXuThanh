"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { LogoLockup } from "@/components/layout/LogoLockup";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { useI18n, localePath } from "@/lib/i18n/provider";
import { cn } from "@/lib/utils";

export function Navbar() {
  const { locale, dict } = useI18n();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const NAV_LINKS = [
    { label: dict.nav.apartments, href: "/can-ho" },
    { label: dict.nav.owner, href: "/chu-nha/dang-nhap" },
    { label: dict.nav.services, href: "/dich-vu" },
    { label: dict.nav.about, href: "/ve-chung-toi" },
    { label: dict.nav.contact, href: "/lien-he" },
  ];

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
      <nav className="container-x relative flex h-[72px] items-center justify-between gap-3">
        <Link
          href={localePath(locale, "/")}
          aria-label={dict.nav.home}
          className="shrink-0"
        >
          <span className="logo-lockup block">
            <LogoLockup className="h-9 !w-auto max-w-none sm:h-11" />
          </span>
        </Link>

        {/* Menu cố định ở giữa, không xê dịch khi logo co lại */}
        <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-9 lg:flex">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={localePath(locale, l.href)}
              className="link-underline text-sm font-medium text-ink-700 transition-colors hover:text-ink"
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <Button
            as="link"
            href={localePath(locale, "/dat-lich-xem")}
            variant="primary"
            size="md"
          >
            {dict.nav.book}
          </Button>
          <LanguageSwitcher />
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <LanguageSwitcher />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="flex h-11 w-11 items-center justify-center rounded-full text-ink"
            aria-label={open ? dict.nav.closeMenu : dict.nav.openMenu}
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
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
              href={localePath(locale, l.href)}
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-3 text-[15px] font-medium text-ink-700 hover:bg-ink/5"
            >
              {l.label}
            </Link>
          ))}
          <Button
            as="link"
            href={localePath(locale, "/dat-lich-xem")}
            variant="primary"
            size="md"
            className="mt-2"
            onClick={() => setOpen(false)}
          >
            {dict.nav.book}
          </Button>
        </div>
      </div>
    </header>
  );
}

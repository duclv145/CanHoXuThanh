"use client";

import Link from "next/link";
import Image from "next/image";
import { MessageCircle, Phone, MapPin } from "lucide-react";
import { Logo } from "@/components/layout/Logo";
import { SOCIAL_CONTACTS } from "@/lib/contacts";
import { useI18n, localePath } from "@/lib/i18n/provider";

export function Footer() {
  const { locale, dict } = useI18n();
  const t = dict.footer;

  const COLS = [
    {
      title: t.colExplore,
      links: [
        { label: t.allApartments, href: "/can-ho" },
        { label: "The Kyoto", href: "/can-ho?subzone=The+Kyoto" },
        { label: "The K-Park Avenue", href: "/can-ho?subzone=The+K-Park+Avenue" },
        { label: "The Sentosa", href: "/can-ho?subzone=The+Sentosa" },
        { label: "The Victoria", href: "/can-ho?subzone=The+Victoria" },
      ],
    },
    {
      title: t.colServices,
      links: [
        { label: t.svcAiTour, href: "/dich-vu" },
        { label: t.svcManage, href: "/dich-vu" },
        { label: t.svcStaging, href: "/dich-vu" },
        { label: t.svcLegal, href: "/dich-vu" },
      ],
    },
    {
      title: t.colOwner,
      links: [
        { label: t.ownerRegister, href: "/chu-nha/dang-ky" },
        { label: t.ownerLogin, href: "/chu-nha/dang-nhap" },
        { label: t.ownerDashboard, href: "/chu-nha/dashboard" },
      ],
    },
  ];

  return (
    <footer className="bg-ink text-[#F5F3ED]">
      <div className="container-x py-16">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <Logo tone="ivory" />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-[#F5F3ED]/70">
              {t.tagline}
            </p>
            <div className="mt-6 space-y-2.5 text-sm text-[#F5F3ED]/70">
              <p className="flex items-center gap-2.5">
                <MapPin className="h-4 w-4 text-[#F5F3ED]/55" />
                Toà K1 - The Kyoto, P. Đông Hải, TP. Thanh Hoá
              </p>
              <p className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 text-[#F5F3ED]/55" />
                <a href="tel:+84961893268" className="hover:text-[#F5F3ED]">
                  0961 893 268
                </a>
              </p>
            </div>
            <a
              href="https://zalo.me/0961893268"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-ivory-50/25 px-5 py-2.5 text-sm font-medium text-[#F5F3ED] transition-colors hover:bg-ivory-50 hover:text-ink"
            >
              <MessageCircle className="h-4 w-4" />
              {t.zalo}
            </a>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:col-span-8">
            {COLS.map((col) => (
              <div key={col.title}>
                <h4 className="text-[12px] font-semibold uppercase tracking-eyebrow text-[#F5F3ED]/55">
                  {col.title}
                </h4>
                <ul className="mt-5 space-y-3">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <Link
                        href={localePath(locale, l.href)}
                        className="text-sm text-[#F5F3ED]/70 transition-colors hover:text-[#F5F3ED]"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 border-t border-ink-700 pt-8">
          {/* Kết nối — các kênh nhắn tin */}
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <span className="text-[12px] font-semibold uppercase tracking-eyebrow text-[#F5F3ED]/55">
              {t.connect}
            </span>
            <div className="flex flex-wrap items-center gap-2.5">
              {SOCIAL_CONTACTS.map((c) => (
                <a
                  key={c.name}
                  href={c.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={c.name}
                  title={c.name}
                  className="transition-transform duration-200 hover:-translate-y-0.5"
                >
                  <Image
                    src={c.logo}
                    alt={c.name}
                    width={36}
                    height={36}
                    className="h-9 w-9 object-contain"
                  />
                </a>
              ))}
            </div>
          </div>

          {/* Bản quyền + pháp lý */}
          <div className="mt-8 flex flex-col items-start justify-between gap-4 text-[13px] text-[#F5F3ED]/70 sm:flex-row sm:items-center">
            <p>© {new Date().getFullYear()} CanHoXuThanh.com {t.rights}</p>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
              <Link href={localePath(locale, "/dieu-khoan")} className="hover:text-[#F5F3ED]">
                {t.terms}
              </Link>
              <Link href={localePath(locale, "/bao-mat")} className="hover:text-[#F5F3ED]">
                {t.privacy}
              </Link>
              <Link href={localePath(locale, "/phap-ly")} className="hover:text-[#F5F3ED]">
                {t.legal}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

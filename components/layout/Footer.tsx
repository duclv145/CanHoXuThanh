import Link from "next/link";
import { MessageCircle, Phone, MapPin } from "lucide-react";
import { Logo } from "@/components/layout/Logo";

const COLS = [
  {
    title: "Khám phá",
    links: [
      { label: "Tất cả căn hộ", href: "/can-ho" },
      { label: "The Kyoto", href: "/can-ho?subzone=The+Kyoto" },
      { label: "The Victoria", href: "/can-ho?subzone=The+Victoria" },
      { label: "The Sentosa", href: "/can-ho?subzone=The+Sentosa" },
      { label: "The K-Park Avenue", href: "/can-ho?subzone=The+K-Park+Avenue" },
    ],
  },
  {
    title: "Dịch vụ",
    links: [
      { label: "AI Video Tour", href: "/#dich-vu" },
      { label: "Quản lý cho thuê", href: "/#dich-vu" },
      { label: "Virtual Staging", href: "/#dich-vu" },
      { label: "Hỗ trợ pháp lý", href: "/#dich-vu" },
    ],
  },
  {
    title: "Chủ nhà",
    links: [
      { label: "Đăng ký cho thuê", href: "/chu-nha/dang-ky" },
      { label: "Đăng nhập", href: "/chu-nha/dang-nhap" },
      { label: "Bảng điều khiển", href: "/chu-nha/dashboard" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-ink text-ivory-200">
      <div className="container-x py-16">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <Logo tone="ivory" />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-ink-400">
              Nền tảng tìm kiếm và quản lý cho thuê căn hộ cao cấp tại Vinhomes
              Star City Thanh Hoá. Minh bạch, tận tâm, xứng tầm.
            </p>
            <div className="mt-6 space-y-2.5 text-sm text-ink-400">
              <p className="flex items-center gap-2.5">
                <MapPin className="h-4 w-4 text-gold-400" />
                Vinhomes Star City, P. Đông Hải, TP. Thanh Hoá
              </p>
              <p className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 text-gold-400" />
                <a href="tel:+84900000000" className="hover:text-ivory-50">
                  0900 000 000
                </a>
              </p>
            </div>
            <a
              href="https://zalo.me/0900000000"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-gold-500 px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-gold-400"
            >
              <MessageCircle className="h-4 w-4" />
              Liên hệ qua Zalo
            </a>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:col-span-8">
            {COLS.map((col) => (
              <div key={col.title}>
                <h4 className="text-[12px] font-semibold uppercase tracking-eyebrow text-gold-400">
                  {col.title}
                </h4>
                <ul className="mt-5 space-y-3">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <Link
                        href={l.href}
                        className="text-sm text-ink-400 transition-colors hover:text-ivory-50"
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

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-ink-700 pt-8 text-[13px] text-ink-400 sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} VinTH · StarLiving. Bảo lưu mọi quyền.</p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <Link href="/dieu-khoan" className="hover:text-ivory-50">
              Điều khoản sử dụng
            </Link>
            <Link href="/bao-mat" className="hover:text-ivory-50">
              Chính sách bảo mật
            </Link>
            <Link href="/phap-ly" className="hover:text-ivory-50">
              Pháp lý
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

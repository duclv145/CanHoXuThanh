import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { locales, isLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { I18nProvider } from "@/lib/i18n/provider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HtmlLang } from "@/components/layout/HtmlLang";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const isKo = params.locale === "ko";
  return {
    title: {
      default: isKo
        ? "CanHoXuThanh - 빈홈스 스타시티 프리미엄 아파트 임대"
        : "CanHoXuThanh - Cho thuê căn hộ cao cấp Vinhomes Star City",
      template: "%s · CanHoXuThanh",
    },
    description: isKo
      ? "타인호아 빈홈스 스타시티 프리미엄 아파트 검색 및 임대 관리 플랫폼."
      : "Nền tảng tìm kiếm & quản lý cho thuê căn hộ cao cấp tại Vinhomes Star City Thanh Hoá.",
    openGraph: { locale: isKo ? "ko_KR" : "vi_VN", type: "website" },
  };
}

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale as Locale;
  const dict = getDictionary(locale);

  return (
    <I18nProvider locale={locale} dict={dict}>
      <HtmlLang locale={locale} />
      <Navbar />
      {children}
      <Footer />
    </I18nProvider>
  );
}

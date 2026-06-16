import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Be_Vietnam_Pro } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
  display: "swap",
});

const beVietnam = Be_Vietnam_Pro({
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-be-vietnam",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://vinth.vercel.app"),
  title: {
    default: "VinTH · StarLiving — Cho thuê căn hộ cao cấp Vinhomes Star City",
    template: "%s · VinTH StarLiving",
  },
  description:
    "Nền tảng tìm kiếm & quản lý cho thuê căn hộ cao cấp tại Vinhomes Star City Thanh Hoá. AI Video Tour, pháp lý minh bạch, quản lý trọn gói.",
  keywords: [
    "Vinhomes Star City",
    "cho thuê căn hộ Thanh Hoá",
    "The Kyoto",
    "The Victoria",
    "The Sentosa",
    "The K-Park Avenue",
  ],
  openGraph: {
    title: "VinTH · StarLiving",
    description:
      "Cho thuê căn hộ cao cấp Vinhomes Star City Thanh Hoá — minh bạch, tận tâm, xứng tầm.",
    type: "website",
    locale: "vi_VN",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" className={`${jakarta.variable} ${beVietnam.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}

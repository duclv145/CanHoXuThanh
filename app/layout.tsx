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
    default: "CanHoXuThanh - Cho thuê căn hộ cao cấp Vinhomes Star City",
    template: "%s · CanHoXuThanh",
  },
  description:
    "Nền tảng tìm kiếm & quản lý cho thuê căn hộ cao cấp tại Vinhomes Star City Thanh Hoá. AI Video Tour, pháp lý minh bạch, quản lý trọn gói.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className={`${jakarta.variable} ${beVietnam.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}

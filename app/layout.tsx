import type { Metadata } from "next";
import { Maven_Pro } from "next/font/google";
import "./globals.css";

const maven = Maven_Pro({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-maven",
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
    <html className={maven.variable}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

// Placeholder cho các trang sẽ xây ở bước tiếp theo.
export function ComingSoon({
  title,
  note,
}: {
  title: string;
  note?: string;
}) {
  return (
    <>
      <Navbar />
      <main className="flex min-h-[70vh] items-center justify-center pt-[72px]">
        <div className="container-x text-center">
          <span className="eyebrow">VinTH · StarLiving</span>
          <h1 className="mt-4 font-serif text-4xl font-bold text-ink sm:text-5xl">
            {title}
          </h1>
          <p className="mx-auto mt-4 max-w-md text-[15px] text-ink-500">
            {note ?? "Trang này đang được hoàn thiện ở bước tiếp theo."}
          </p>
          <Link
            href="/"
            className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-gold-600 link-underline"
          >
            <ArrowLeft className="h-4 w-4" />
            Về trang chủ
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}

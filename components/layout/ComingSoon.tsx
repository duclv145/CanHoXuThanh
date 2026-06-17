"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useI18n, localePath } from "@/lib/i18n/provider";

// Placeholder cho các trang sẽ xây ở bước tiếp theo.
export function ComingSoon({
  title,
  note,
}: {
  title: string;
  note?: string;
}) {
  const { locale, dict } = useI18n();
  return (
    <main className="flex min-h-[70vh] items-center justify-center pt-[72px]">
      <div className="container-x text-center">
        <span className="eyebrow">CanHoXuThanh</span>
        <h1 className="mt-4 font-serif text-4xl font-bold text-ink sm:text-5xl">
          {title}
        </h1>
        <p className="mx-auto mt-4 max-w-md text-[15px] text-ink-500">
          {note ?? dict.comingSoon.defaultNote}
        </p>
        <Link
          href={localePath(locale, "/")}
          className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-gold-600 link-underline"
        >
          <ArrowLeft className="h-4 w-4" />
          {dict.comingSoon.back}
        </Link>
      </div>
    </main>
  );
}

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { AddApartmentForm } from "@/components/owner/AddApartmentForm";
import { localePath } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/lib/i18n/config";

export default function Page({ params }: { params: { locale: Locale } }) {
  const { locale } = params;
  const t = getDictionary(locale).ownerArea.addForm;

  return (
    <main className="min-h-screen bg-ivory pt-[72px]">
      <div className="container-x py-10 lg:py-12">
        <div className="mx-auto max-w-3xl">
          <Link
            href={localePath(locale, "/chu-nha/dashboard")}
            className="inline-flex items-center gap-2 text-[13px] font-medium text-ink-500 transition-colors hover:text-ink"
          >
            <ArrowLeft className="h-4 w-4" />
            {t.back}
          </Link>
          <h1 className="mt-4 font-serif text-3xl font-bold text-ink sm:text-4xl">
            {t.title}
          </h1>
          <p className="mt-2 text-[15px] text-ink-500">{t.subtitle}</p>

          <div className="mt-8">
            <AddApartmentForm />
          </div>
        </div>
      </div>
    </main>
  );
}

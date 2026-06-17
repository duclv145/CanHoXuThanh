import Link from "next/link";
import { SearchX } from "lucide-react";
import { localePath } from "@/lib/i18n/config";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";

export function EmptyState({
  dict,
  locale,
}: {
  dict: Dictionary;
  locale: Locale;
}) {
  return (
    <div className="flex min-h-[44vh] flex-col items-center justify-center py-20 text-center">
      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-ivory-200">
        <SearchX className="h-7 w-7 text-ink-400" />
      </div>
      <h3 className="font-serif text-xl font-bold text-ink">{dict.empty.title}</h3>
      <p className="mx-auto mt-3 max-w-sm text-[14px] leading-relaxed text-ink-500">
        {dict.empty.desc}
      </p>
      <Link
        href={localePath(locale, "/can-ho")}
        className="mt-6 inline-flex items-center rounded-xl bg-ink px-6 py-3 text-sm font-semibold text-ivory transition-colors hover:bg-ink-700"
      >
        {dict.empty.cta}
      </Link>
    </div>
  );
}

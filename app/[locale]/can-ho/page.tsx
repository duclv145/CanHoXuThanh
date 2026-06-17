import { ListingPageShell } from "@/components/listing/ListingPageShell";
import { getApartments } from "@/lib/data";
import { getDictionary } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/lib/i18n/config";
import type {
  ApartmentFilters,
  Subzone,
  LeaseTerm,
  BedroomType,
} from "@/lib/types";

type SP = { [key: string]: string | string[] | undefined };

function parseFilters(sp: SP): ApartmentFilters {
  const str = (k: string) =>
    typeof sp[k] === "string" ? (sp[k] as string) : "";
  const numMil = (k: string) => {
    const v = Number(str(k));
    return isNaN(v) || v === 0 ? null : v * 1_000_000;
  };
  const numRaw = (k: string) => {
    const v = Number(str(k));
    return isNaN(v) || v === 0 ? null : v;
  };

  return {
    subzones: str("phan_khu")
      ? (str("phan_khu").split(",") as Subzone[])
      : undefined,
    layout: (str("phong_ngu") as BedroomType) || null,
    minPrice: numMil("gia_min"),
    maxPrice: numMil("gia_max"),
    minArea: numRaw("dien_tich"),
    leaseTerm: (str("thoi_han") as LeaseTerm) || null,
    sort: (str("sap_xep") as ApartmentFilters["sort"]) || "moi_nhat",
  };
}

export default async function Page({
  params,
  searchParams,
}: {
  params: { locale: Locale };
  searchParams: SP;
}) {
  const dict = getDictionary(params.locale);
  const t = dict.listing;
  const filters = parseFilters(searchParams);
  const apartments = await getApartments(filters);

  return (
    <>
      {/* Page header */}
      <div className="border-b border-ivory-200 bg-ivory pt-[72px]">
        <div className="container-x py-10 lg:py-14">
          <span className="eyebrow">{t.eyebrow}</span>
          <h1 className="mt-3 font-serif text-3xl font-bold leading-[1.1] text-ink sm:text-4xl lg:text-[48px]">
            {t.title_a}
            <br />
            <span className="text-gold-600">{t.title_accent}</span>
          </h1>
          <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-ink-500">
            {t.desc}
          </p>
        </div>
      </div>

      <main className="min-h-screen bg-ivory">
        <ListingPageShell
          apartments={apartments}
          dict={dict}
          locale={params.locale}
        />
      </main>
    </>
  );
}

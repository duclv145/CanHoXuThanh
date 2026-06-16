import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ListingPageShell } from "@/components/listing/ListingPageShell";
import { getApartments } from "@/lib/data";
import type { ApartmentFilters, Subzone, LeaseTerm } from "@/lib/types";

export const metadata = {
  title: "Căn hộ cho thuê — StarLiving · Vinhomes Star City Thanh Hoá",
  description:
    "Khám phá căn hộ cao cấp đang cho thuê tại Vinhomes Star City. Lọc theo phân khu, giá, diện tích và thời hạn thuê.",
};

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
    bedrooms: numRaw("phong_ngu"),
    minPrice: numMil("gia_min"),
    maxPrice: numMil("gia_max"),
    minArea: numRaw("dien_tich"),
    leaseTerm: (str("thoi_han") as LeaseTerm) || null,
    sort: (str("sap_xep") as ApartmentFilters["sort"]) || "moi_nhat",
  };
}

export default async function Page({
  searchParams,
}: {
  searchParams: SP;
}) {
  const filters = parseFilters(searchParams);
  const apartments = await getApartments(filters);

  return (
    <>
      <Navbar />

      {/* Page header */}
      <div className="border-b border-ivory-200 bg-ivory pt-[72px]">
        <div className="container-x py-10 lg:py-14">
          <span className="eyebrow">Danh sách căn hộ</span>
          <h1 className="mt-3 font-serif text-3xl font-bold leading-[1.1] text-ink sm:text-4xl lg:text-[48px]">
            Căn hộ cho thuê tại<br />
            <span className="text-gold-600">Vinhomes Star City</span>
          </h1>
          <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-ink-500">
            Tuyển chọn căn hộ cao cấp — pháp lý minh bạch, dọn vào ở ngay,
            hỗ trợ 24/7.
          </p>
        </div>
      </div>

      <main className="min-h-screen bg-ivory">
        <ListingPageShell apartments={apartments} />
      </main>

      <Footer />
    </>
  );
}

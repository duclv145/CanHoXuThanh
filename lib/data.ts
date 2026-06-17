import { isSupabaseConfigured } from "./supabase/config";
import { createClient } from "./supabase/server";
import { MOCK_APARTMENTS, MOCK_TESTIMONIALS } from "./mock-data";
import type { Apartment, ApartmentFilters } from "./types";

// ── Lọc + sắp xếp (dùng chung cho mock & hậu xử lý) ─────────────────────
export function applyFilters(
  list: Apartment[],
  f: ApartmentFilters,
): Apartment[] {
  let out = [...list];

  if (f.subzones?.length) {
    out = out.filter((a) => f.subzones!.includes(a.subzone));
  }
  if (f.layout) {
    out = out.filter((a) => a.layout === f.layout);
  }
  if (f.minPrice != null) out = out.filter((a) => a.price >= f.minPrice!);
  if (f.maxPrice != null) out = out.filter((a) => a.price <= f.maxPrice!);
  if (f.minArea != null) out = out.filter((a) => a.area >= f.minArea!);
  if (f.leaseTerm) out = out.filter((a) => a.lease_term === f.leaseTerm);
  if (f.amenities?.length) {
    out = out.filter((a) =>
      f.amenities!.every((name) =>
        (a.amenities ?? []).some((am) => am.name.includes(name)),
      ),
    );
  }

  switch (f.sort) {
    case "gia_tang":
      out.sort((a, b) => a.price - b.price);
      break;
    case "gia_giam":
      out.sort((a, b) => b.price - a.price);
      break;
    case "danh_gia":
      out.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
      break;
    case "moi_nhat":
    default:
      out.sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
      );
  }
  return out;
}

// ── Public reads ────────────────────────────────────────────────────────

export async function getFeaturedApartments(limit = 3): Promise<Apartment[]> {
  if (!isSupabaseConfigured) {
    return applyFilters(MOCK_APARTMENTS, { sort: "danh_gia" }).slice(0, limit);
  }
  const supabase = createClient();
  const { data, error } = await supabase
    .from("apartments")
    .select("*, media:apartment_media(*), amenities:apartment_amenities(*)")
    .order("rating", { ascending: false })
    .limit(limit);
  if (error || !data) return MOCK_APARTMENTS.slice(0, limit);
  return data.map(normalizeCover) as Apartment[];
}

export async function getApartments(
  filters: ApartmentFilters = {},
): Promise<Apartment[]> {
  if (!isSupabaseConfigured) {
    return applyFilters(MOCK_APARTMENTS, filters);
  }
  const supabase = createClient();
  const { data, error } = await supabase
    .from("apartments")
    .select("*, media:apartment_media(*), amenities:apartment_amenities(*)");
  if (error || !data) return applyFilters(MOCK_APARTMENTS, filters);
  return applyFilters(data.map(normalizeCover) as Apartment[], filters);
}

export async function getApartmentBySlug(
  slug: string,
): Promise<Apartment | null> {
  if (!isSupabaseConfigured) {
    return MOCK_APARTMENTS.find((a) => a.slug === slug) ?? null;
  }
  const supabase = createClient();
  const { data, error } = await supabase
    .from("apartments")
    .select("*, media:apartment_media(*), amenities:apartment_amenities(*)")
    .eq("slug", slug)
    .single();
  if (error || !data) return MOCK_APARTMENTS.find((a) => a.slug === slug) ?? null;
  return normalizeCover(data) as Apartment;
}

export async function getSimilarApartments(
  apartment: Apartment,
  limit = 3,
): Promise<Apartment[]> {
  const all = await getApartments({});
  return all
    .filter((a) => a.id !== apartment.id)
    .sort((a, b) => {
      const score = (x: Apartment) =>
        (x.subzone === apartment.subzone ? 2 : 0) +
        (x.bedrooms === apartment.bedrooms ? 1 : 0);
      return score(b) - score(a);
    })
    .slice(0, limit);
}

export function getTestimonials() {
  return MOCK_TESTIMONIALS;
}

export async function getSiteStats() {
  const all = await getApartments({});
  const available = all.filter((a) => a.status === "trong").length;
  const ratings = all.map((a) => a.rating ?? 0).filter(Boolean);
  const avg = ratings.length
    ? ratings.reduce((s, r) => s + r, 0) / ratings.length
    : 4.9;
  return {
    available,
    avgRating: Math.round(avg * 10) / 10,
    responseTime: "~15 phút",
  };
}

// Đảm bảo có cover_url (ảnh đầu tiên) khi đọc từ Supabase.
function normalizeCover(row: Apartment): Apartment {
  if (row.cover_url) return row;
  const firstPhoto = (row.media ?? []).find((m) => m.type === "anh");
  return { ...row, cover_url: firstPhoto?.url ?? "" };
}

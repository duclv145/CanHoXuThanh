// ── Domain types cho VinTH ──────────────────────────────────────────────

export type Subzone =
  | "The Kyoto"
  | "The Victoria"
  | "The Sentosa"
  | "The K-Park Avenue";

export const SUBZONES: Subzone[] = [
  "The Kyoto",
  "The Victoria",
  "The Sentosa",
  "The K-Park Avenue",
];

export type ApartmentStatus = "trong" | "dang_thue" | "dang_xu_ly";

export const APARTMENT_STATUS_LABEL: Record<ApartmentStatus, string> = {
  trong: "Đang trống",
  dang_thue: "Đang cho thuê",
  dang_xu_ly: "Đang xử lý",
};

// Badge tone (xem components/ui/Badge) cho mỗi trạng thái.
export const APARTMENT_STATUS_TONE: Record<
  ApartmentStatus,
  "teal" | "mist" | "rose"
> = {
  trong: "teal", // còn trống — xanh teal
  dang_thue: "mist", // đã thuê — xám trung tính
  dang_xu_ly: "rose", // đang giữ chỗ — hồng đậm
};

export type LeaseTerm = "6_thang" | "12_thang" | "24_thang" | "ngan_han";

export const LEASE_TERM_LABEL: Record<LeaseTerm, string> = {
  ngan_han: "Ngắn hạn (theo tháng)",
  "6_thang": "6 tháng",
  "12_thang": "12 tháng",
  "24_thang": "24 tháng",
};

export type MediaType = "anh" | "video" | "ai_tour_video";

export interface ApartmentMedia {
  id: string;
  apartment_id: string;
  url: string;
  type: MediaType;
  sort_order: number;
  alt?: string | null;
}

export interface Amenity {
  id: string;
  apartment_id: string;
  name: string;
  icon: string; // lucide icon key
}

export interface Apartment {
  id: string;
  slug: string;
  owner_id: string | null;
  name: string;
  code: string | null;
  subzone: Subzone;
  address: string;
  area: number; // m2
  bedrooms: number;
  bathrooms: number;
  floor: number | null;
  orientation: string | null; // hướng nhà
  price: number; // VND / tháng
  status: ApartmentStatus;
  lease_term: LeaseTerm;
  rating: number | null;
  description: string;
  has_ai_tour: boolean;
  created_at: string;
  // joined
  media?: ApartmentMedia[];
  amenities?: Amenity[];
  cover_url?: string;
}

export interface Lead {
  id?: string;
  apartment_id: string;
  name: string;
  phone: string;
  preferred_date: string;
  note?: string;
  status?: "moi" | "da_lien_he" | "da_xem" | "huy";
  created_at?: string;
}

export interface Lease {
  id: string;
  apartment_id: string;
  tenant_name: string;
  start_date: string;
  end_date: string;
  price: number;
  status: "hoat_dong" | "ket_thuc" | "sap_het_han";
}

export interface Payment {
  id: string;
  lease_id: string;
  amount: number;
  paid_at: string;
  type: "tien_thue" | "phi_quan_ly";
}

export interface ApartmentFilters {
  subzones?: Subzone[];
  bedrooms?: number | null;
  minPrice?: number | null;
  maxPrice?: number | null;
  minArea?: number | null;
  amenities?: string[];
  leaseTerm?: LeaseTerm | null;
  sort?: "moi_nhat" | "gia_tang" | "gia_giam" | "danh_gia";
}

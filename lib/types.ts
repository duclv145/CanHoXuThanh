// ── Domain types cho CanHoXuThanh ──────────────────────────────────────────────

export type Subzone =
  | "The Kyoto"
  | "The K-Park Avenue"
  | "The Sentosa"
  | "The Victoria";

export const SUBZONES: Subzone[] = [
  "The Kyoto",
  "The K-Park Avenue",
  "The Sentosa",
  "The Victoria",
];

// ── Theme màu riêng cho từng phân khu ──────────────────────────────────
// Áp cho thẻ card listing + trang chi tiết. null = dùng theme mặc định (ivory/ink).
export interface SubzoneTheme {
  bg: string; // nền tối đặc trưng
  text: string; // text chính (tiêu đề, giá)
  textMuted: string; // text phụ (địa chỉ, thông số)
  border: string; // đường kẻ / viền mảnh (rgba)
}

export const SUBZONE_THEME: Record<Subzone, SubzoneTheme | null> = {
  "The Kyoto": {
    bg: "#3F1015",
    text: "#E4BA9D", // chữ to = beige
    textMuted: "#FFFFFF", // chữ nhỏ = trắng
    border: "rgba(228,186,157,0.3)",
  },
  "The K-Park Avenue": {
    bg: "#1B2661",
    text: "#EC047B", // chữ to = magenta
    textMuted: "#6FB7F0", // chữ nhỏ = xanh sáng (dễ nhìn trên nền navy)
    border: "rgba(111,183,240,0.35)",
  },
  "The Sentosa": {
    bg: "#114C37",
    text: "#FBDCCE", // chữ to = peach
    textMuted: "#FFFFFF", // chữ nhỏ = trắng
    border: "rgba(251,220,206,0.3)",
  },
  "The Victoria": null,
};

// ── Loại căn hộ theo số phòng ngủ ──────────────────────────────────────
export type BedroomType =
  | "studio"
  | "1pn"
  | "1pn+1"
  | "2pn"
  | "2pn+1"
  | "3pn";

export const BEDROOM_TYPES: { value: BedroomType; label: string }[] = [
  { value: "studio", label: "Studio" },
  { value: "1pn", label: "1 phòng ngủ" },
  { value: "1pn+1", label: "1 phòng ngủ +1" },
  { value: "2pn", label: "2 phòng ngủ" },
  { value: "2pn+1", label: "2 phòng ngủ +1" },
  { value: "3pn", label: "3 phòng ngủ" },
];

export const BEDROOM_LABEL: Record<BedroomType, string> = Object.fromEntries(
  BEDROOM_TYPES.map((t) => [t.value, t.label]),
) as Record<BedroomType, string>;

// Nhãn ngắn hiển thị trên card (Studio / 1PN / 1PN+1 ...)
export const BEDROOM_SHORT: Record<BedroomType, string> = {
  studio: "Studio",
  "1pn": "1 PN",
  "1pn+1": "1 PN+1",
  "2pn": "2 PN",
  "2pn+1": "2 PN+1",
  "3pn": "3 PN",
};

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
  trong: "teal", // còn trống - xanh teal
  dang_thue: "mist", // đã thuê - xám trung tính
  dang_xu_ly: "rose", // đang giữ chỗ - hồng đậm
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
  layout: BedroomType; // loại căn hộ (studio / 1pn / 1pn+1 / 2pn / 2pn+1 / 3pn)
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
  layout?: BedroomType | null;
  minPrice?: number | null;
  maxPrice?: number | null;
  minArea?: number | null;
  amenities?: string[];
  leaseTerm?: LeaseTerm | null;
  sort?: "moi_nhat" | "gia_tang" | "gia_giam" | "danh_gia";
}

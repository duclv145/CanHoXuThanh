"use server";

import { isSupabaseConfigured } from "./supabase/config";
import { createClient } from "./supabase/server";

export interface BookingInput {
  apartment_id: string; // "" nếu là tư vấn chung
  name: string;
  phone: string;
  preferred_date: string; // YYYY-MM-DD, "" nếu chưa chọn
  note: string;
}

export type BookingResult =
  | { ok: true; mock: boolean }
  | { ok: false; error: string };

// Chuẩn hoá & kiểm tra số điện thoại Việt Nam.
function isValidVnPhone(raw: string): boolean {
  const p = raw.replace(/[\s.]/g, "");
  return /^(0\d{9}|\+84\d{9})$/.test(p);
}

export async function createBooking(
  input: BookingInput,
): Promise<BookingResult> {
  const name = input.name?.trim() ?? "";
  const phone = input.phone?.trim() ?? "";

  if (name.length < 2) {
    return { ok: false, error: "Vui lòng nhập họ tên hợp lệ." };
  }
  if (!isValidVnPhone(phone)) {
    return { ok: false, error: "Số điện thoại không hợp lệ (VD: 0901 234 567)." };
  }

  // Chưa cấu hình Supabase → giả lập gửi thành công để xem được luồng UI.
  if (!isSupabaseConfigured) {
    await new Promise((r) => setTimeout(r, 700));
    console.log("[booking · mock]", { ...input, name, phone });
    return { ok: true, mock: true };
  }

  const supabase = createClient();
  const { error } = await supabase.from("leads").insert({
    apartment_id: input.apartment_id || null,
    name,
    phone,
    preferred_date: input.preferred_date || null,
    note: input.note || null,
    status: "moi",
  });

  if (error) {
    console.error("[booking · error]", error.message);
    return { ok: false, error: "Có lỗi khi gửi yêu cầu. Vui lòng thử lại." };
  }
  return { ok: true, mock: false };
}

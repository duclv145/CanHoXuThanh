# VinTH · StarLiving

Nền tảng tìm kiếm & quản lý cho thuê căn hộ cao cấp tại **Vinhomes Star City Thanh Hoá**.
Phục vụ 2 nhóm: khách thuê (tìm & xem căn hộ) và chủ nhà (đăng ký, quản lý cho thuê).

## Công nghệ

- **Next.js 14** (App Router) + **TypeScript**
- **Tailwind CSS** — design system sang trọng (ivory / ink / champagne gold)
- **Supabase** — Postgres + Auth + Storage (ảnh/video căn hộ)
- **Recharts** — biểu đồ doanh thu trong dashboard
- Sẵn sàng deploy lên **Vercel**

> 💡 App chạy được ngay với **dữ liệu mẫu** kể cả khi chưa cấu hình Supabase.
> Khi thêm biến môi trường Supabase, app tự động chuyển sang dùng dữ liệu thật.

## Bắt đầu nhanh

```bash
npm install
cp .env.example .env.local   # điền giá trị Supabase (xem bên dưới)
npm run dev                  # http://localhost:5005
```

## Thiết lập Supabase

### 1. Tạo project

1. Vào [supabase.com](https://supabase.com) → **New project**.
2. Đặt tên, chọn region gần (Singapore), đặt mật khẩu database.

### 2. Chạy migration SQL

Mở **SQL Editor → New query**, dán & chạy theo thứ tự:

1. `supabase/migrations/0001_init.sql` — tạo bảng, enum, RLS, trigger, storage bucket.
2. `supabase/migrations/0002_seed.sql` — (tuỳ chọn) dữ liệu căn hộ mẫu.

> File `0001_init.sql` tự tạo bucket Storage `apartment-media` (public) và các
> policy đọc công khai / ghi cho người đã đăng nhập. Không cần thao tác thủ công thêm.

### 3. Lấy khoá API

**Project Settings → API**, sao chép vào `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOi...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOi...   # chỉ dùng phía server
NEXT_PUBLIC_SUPABASE_MEDIA_BUCKET=apartment-media
```

### 4. (Tuỳ chọn) Kiểm tra Storage

**Storage** trong dashboard sẽ thấy bucket `apartment-media`. Ảnh/video chủ nhà
upload từ dashboard sẽ nằm tại đây và hiển thị công khai trên listing.

## Cấu trúc thư mục

```
app/                  # App Router
  page.tsx            # Trang chủ
  can-ho/             # Danh sách + chi tiết căn hộ
  chu-nha/            # Đăng ký / đăng nhập / dashboard chủ nhà
components/
  ui/                 # Button, Badge, SectionHeading, AmenityIcon...
  layout/             # Navbar, Footer, Logo
  home/               # Các section trang chủ
  listing/            # ListingCard, FilterSidebar...
lib/
  supabase/           # client (browser) + server + config
  data.ts             # data-access (Supabase ↔ fallback mock)
  mock-data.ts        # dữ liệu mẫu
  types.ts            # kiểu dữ liệu domain
  utils.ts            # cn(), format VND, slugify...
supabase/migrations/  # SQL: 0001_init, 0002_seed
```

## Database (tóm tắt)

| Bảng | Vai trò |
|------|---------|
| `owners` | Chủ nhà (gắn Supabase Auth user) |
| `apartments` | Căn hộ |
| `apartment_media` | Ảnh / video / AI tour |
| `apartment_amenities` | Tiện ích từng căn |
| `leads` | Yêu cầu đặt lịch xem (khách thuê) |
| `leases` | Hợp đồng thuê |
| `payments` | Lịch sử thanh toán / doanh thu |

RLS: listing công khai cho mọi người đọc; chủ nhà chỉ ghi/đọc dữ liệu của mình;
khách (anon) được tạo `leads`.

## Deploy lên Vercel

1. Push code lên GitHub, **Import** vào Vercel.
2. Thêm các biến môi trường ở mục **Settings → Environment Variables** (như `.env.local`).
3. Deploy. Build command & output mặc định của Next.js.

---

© VinTH · StarLiving

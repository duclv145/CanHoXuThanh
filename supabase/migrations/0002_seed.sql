-- ════════════════════════════════════════════════════════════════════════
-- VinTH — Dữ liệu mẫu (tuỳ chọn)
-- Chạy SAU 0001_init.sql. Tạo các căn hộ công khai (owner_id = NULL) để
-- trang Danh sách & Chi tiết hiển thị ngay. Lease/payment cần owner thật
-- (đăng ký tài khoản chủ nhà rồi tạo qua dashboard).
-- ════════════════════════════════════════════════════════════════════════

with seed(slug, name, code, subzone, address, area, bedrooms, bathrooms, floor,
          orientation, price, status, lease_term, rating, description, has_ai_tour,
          cover) as (
  values
  ('the-kyoto-k1-2208-view-ho','Kyoto Skyline Residence','K1-2208','The Kyoto',
   'Toà K1, The Kyoto, Vinhomes Star City, TP. Thanh Hoá',78,2,2,22,'Đông Nam',
   18000000,'trong','12_thang',4.9,
   'Căn hộ 2 phòng ngủ tầng cao tại The Kyoto, tầm nhìn trọn vẹn hồ điều hoà trung tâm. Nội thất nhập khẩu phong cách Nhật Bản tối giản.',true,
   'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1400&q=80'),
  ('the-victoria-v3-1505-3pn','Victoria Garden Suite','V3-1505','The Victoria',
   'Toà V3, The Victoria, Vinhomes Star City, TP. Thanh Hoá',102,3,2,15,'Tây Nam',
   26000000,'trong','12_thang',4.8,
   'Căn góc 3 phòng ngủ thoáng hai mặt, ngập tràn ánh sáng tự nhiên. Thiết kế tân cổ điển sang trọng.',true,
   'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1400&q=80'),
  ('the-sentosa-s2-0810-studio','Sentosa Lakeview Studio','S2-0810','The Sentosa',
   'Toà S2, The Sentosa, Vinhomes Star City, TP. Thanh Hoá',45,1,1,8,'Đông',
   11500000,'trong','ngan_han',4.7,
   'Studio hiện đại đầy đủ nội thất, lý tưởng cho chuyên gia và người độc thân.',true,
   'https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=1400&q=80'),
  ('the-k-park-avenue-kp1-1802-3pn','K-Park Avenue Premier','KP1-1802','The K-Park Avenue',
   'Toà KP1, The K-Park Avenue, Vinhomes Star City, TP. Thanh Hoá',115,3,3,18,'Nam',
   32000000,'dang_thue','24_thang',5.0,
   'Căn hộ cao cấp nhất phân khu K-Park Avenue, 3 phòng ngủ master en-suite, smart home toàn bộ.',true,
   'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1400&q=80'),
  ('the-kyoto-k2-1102-2pn-noi-that','Kyoto Zen Apartment','K2-1102','The Kyoto',
   'Toà K2, The Kyoto, Vinhomes Star City, TP. Thanh Hoá',72,2,2,11,'Đông Bắc',
   16500000,'trong','12_thang',4.6,
   'Căn 2 phòng ngủ phong cách Zen Nhật Bản, gỗ sồi tự nhiên, bàn giao full nội thất.',false,
   'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1400&q=80'),
  ('the-victoria-v1-2010-2pn-cao-cap','Victoria Sky Residence','V1-2010','The Victoria',
   'Toà V1, The Victoria, Vinhomes Star City, TP. Thanh Hoá',85,2,2,20,'Tây',
   21000000,'trong','12_thang',4.8,
   'Căn hộ tầng cao đón hoàng hôn rực rỡ trên hồ. Phong cách Indochine hiện đại, ban công rộng.',true,
   'https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&w=1400&q=80')
)
insert into public.apartments
  (slug, name, code, subzone, address, area, bedrooms, bathrooms, floor,
   orientation, price, status, lease_term, rating, description, has_ai_tour)
select slug, name, code, subzone, address, area, bedrooms, bathrooms, floor,
   orientation, price, status::apartment_status, lease_term::lease_term, rating,
   description, has_ai_tour
from seed
on conflict (slug) do nothing;

-- Ảnh bìa cho mỗi căn vừa seed
insert into public.apartment_media (apartment_id, url, type, sort_order, alt)
select a.id, s.cover, 'anh', 1, a.name
from public.apartments a
join (
  select slug, cover from (values
    ('the-kyoto-k1-2208-view-ho','https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1400&q=80'),
    ('the-victoria-v3-1505-3pn','https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1400&q=80'),
    ('the-sentosa-s2-0810-studio','https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=1400&q=80'),
    ('the-k-park-avenue-kp1-1802-3pn','https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1400&q=80'),
    ('the-kyoto-k2-1102-2pn-noi-that','https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1400&q=80'),
    ('the-victoria-v1-2010-2pn-cao-cap','https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&w=1400&q=80')
  ) as t(slug, cover)
) s on s.slug = a.slug
where not exists (
  select 1 from public.apartment_media m where m.apartment_id = a.id
);

-- Một vài tiện ích tiêu biểu cho mỗi căn
insert into public.apartment_amenities (apartment_id, name, icon)
select a.id, x.name, x.icon
from public.apartments a
cross join (values
  ('Hồ bơi','waves'),
  ('Phòng gym','dumbbell'),
  ('An ninh 24/7','shield'),
  ('Bãi đỗ xe','car'),
  ('Nội thất cao cấp','sofa')
) as x(name, icon)
where not exists (
  select 1 from public.apartment_amenities am where am.apartment_id = a.id
);

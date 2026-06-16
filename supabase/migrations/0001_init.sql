-- ════════════════════════════════════════════════════════════════════════
-- VinTH — Schema khởi tạo (Supabase / Postgres)
-- Nền tảng cho thuê căn hộ cao cấp Vinhomes Star City Thanh Hoá
--
-- Chạy file này trong: Supabase Dashboard → SQL Editor → New query
-- (hoặc qua Supabase CLI: `supabase db push`)
-- ════════════════════════════════════════════════════════════════════════

create extension if not exists "pgcrypto";

-- ── ENUM types ──────────────────────────────────────────────────────────
do $$ begin
  create type apartment_status as enum ('trong', 'dang_thue', 'dang_xu_ly');
exception when duplicate_object then null; end $$;

do $$ begin
  create type lease_term as enum ('ngan_han', '6_thang', '12_thang', '24_thang');
exception when duplicate_object then null; end $$;

do $$ begin
  create type media_type as enum ('anh', 'video', 'ai_tour_video');
exception when duplicate_object then null; end $$;

do $$ begin
  create type lead_status as enum ('moi', 'da_lien_he', 'da_xem', 'huy');
exception when duplicate_object then null; end $$;

do $$ begin
  create type lease_status as enum ('hoat_dong', 'ket_thuc', 'sap_het_han');
exception when duplicate_object then null; end $$;

do $$ begin
  create type payment_type as enum ('tien_thue', 'phi_quan_ly');
exception when duplicate_object then null; end $$;

-- ── owners — chủ nhà (gắn với Supabase Auth user) ───────────────────────
create table if not exists public.owners (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null unique references auth.users (id) on delete cascade,
  name        text not null,
  phone       text,
  email       text,
  created_at  timestamptz not null default now()
);

-- ── apartments — căn hộ ─────────────────────────────────────────────────
create table if not exists public.apartments (
  id           uuid primary key default gen_random_uuid(),
  owner_id     uuid references public.owners (id) on delete set null,
  slug         text not null unique,
  name         text not null,
  code         text,
  subzone      text not null,            -- The Kyoto / The Victoria / ...
  address      text not null,
  area         numeric(7,2) not null,    -- m2
  bedrooms     int not null default 1,
  bathrooms    int not null default 1,
  floor        int,
  orientation  text,                     -- hướng nhà
  price        bigint not null,          -- VND / tháng
  status       apartment_status not null default 'trong',
  lease_term   lease_term not null default '12_thang',
  rating       numeric(2,1),
  description  text default '',
  has_ai_tour  boolean not null default false,
  created_at   timestamptz not null default now()
);

create index if not exists apartments_owner_idx   on public.apartments (owner_id);
create index if not exists apartments_subzone_idx on public.apartments (subzone);
create index if not exists apartments_status_idx  on public.apartments (status);
create index if not exists apartments_price_idx   on public.apartments (price);

-- ── apartment_media — ảnh & video ───────────────────────────────────────
create table if not exists public.apartment_media (
  id            uuid primary key default gen_random_uuid(),
  apartment_id  uuid not null references public.apartments (id) on delete cascade,
  url           text not null,
  type          media_type not null default 'anh',
  sort_order    int not null default 0,
  alt           text,
  created_at    timestamptz not null default now()
);
create index if not exists media_apartment_idx on public.apartment_media (apartment_id);

-- ── apartment_amenities — tiện ích ──────────────────────────────────────
create table if not exists public.apartment_amenities (
  id            uuid primary key default gen_random_uuid(),
  apartment_id  uuid not null references public.apartments (id) on delete cascade,
  name          text not null,
  icon          text not null default 'check'
);
create index if not exists amenities_apartment_idx on public.apartment_amenities (apartment_id);

-- ── leads — yêu cầu đặt lịch xem từ khách thuê ──────────────────────────
create table if not exists public.leads (
  id              uuid primary key default gen_random_uuid(),
  apartment_id    uuid references public.apartments (id) on delete cascade,
  name            text not null,
  phone           text not null,
  preferred_date  date,
  note            text,
  status          lead_status not null default 'moi',
  created_at      timestamptz not null default now()
);
create index if not exists leads_apartment_idx on public.leads (apartment_id);

-- ── leases — hợp đồng thuê ──────────────────────────────────────────────
create table if not exists public.leases (
  id            uuid primary key default gen_random_uuid(),
  apartment_id  uuid not null references public.apartments (id) on delete cascade,
  tenant_name   text not null,
  start_date    date not null,
  end_date      date not null,
  price         bigint not null,
  status        lease_status not null default 'hoat_dong',
  created_at    timestamptz not null default now()
);
create index if not exists leases_apartment_idx on public.leases (apartment_id);

-- ── payments — lịch sử thanh toán / doanh thu ───────────────────────────
create table if not exists public.payments (
  id        uuid primary key default gen_random_uuid(),
  lease_id  uuid not null references public.leases (id) on delete cascade,
  amount    bigint not null,
  paid_at   date not null default current_date,
  type      payment_type not null default 'tien_thue'
);
create index if not exists payments_lease_idx on public.payments (lease_id);

-- ════════════════════════════════════════════════════════════════════════
-- Trigger: tự tạo hồ sơ owner khi có user đăng ký mới
-- (form đăng ký gửi full_name, phone qua options.data)
-- ════════════════════════════════════════════════════════════════════════
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.owners (user_id, name, phone, email)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'full_name', split_part(new.email, '@', 1)),
    new.raw_user_meta_data ->> 'phone',
    new.email
  )
  on conflict (user_id) do nothing;
  return new;
end $$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ════════════════════════════════════════════════════════════════════════
-- Helper: kiểm tra user hiện tại có sở hữu apartment không
-- ════════════════════════════════════════════════════════════════════════
create or replace function public.owns_apartment(aid uuid)
returns boolean
language sql
stable
security definer set search_path = public
as $$
  select exists (
    select 1
    from public.apartments a
    join public.owners o on o.id = a.owner_id
    where a.id = aid and o.user_id = auth.uid()
  );
$$;

-- ════════════════════════════════════════════════════════════════════════
-- ROW LEVEL SECURITY
-- ════════════════════════════════════════════════════════════════════════
alter table public.owners              enable row level security;
alter table public.apartments          enable row level security;
alter table public.apartment_media     enable row level security;
alter table public.apartment_amenities enable row level security;
alter table public.leads               enable row level security;
alter table public.leases              enable row level security;
alter table public.payments            enable row level security;

-- owners: mỗi user chỉ thấy/sửa hồ sơ của mình
create policy "owners_select_self" on public.owners
  for select using (user_id = auth.uid());
create policy "owners_insert_self" on public.owners
  for insert with check (user_id = auth.uid());
create policy "owners_update_self" on public.owners
  for update using (user_id = auth.uid());

-- apartments: ai cũng xem được (public listing); chỉ chủ sở hữu được ghi
create policy "apartments_public_read" on public.apartments
  for select using (true);
create policy "apartments_owner_insert" on public.apartments
  for insert with check (
    owner_id in (select id from public.owners where user_id = auth.uid())
  );
create policy "apartments_owner_update" on public.apartments
  for update using (
    owner_id in (select id from public.owners where user_id = auth.uid())
  );
create policy "apartments_owner_delete" on public.apartments
  for delete using (
    owner_id in (select id from public.owners where user_id = auth.uid())
  );

-- apartment_media: public read, chủ sở hữu quản lý
create policy "media_public_read" on public.apartment_media
  for select using (true);
create policy "media_owner_write" on public.apartment_media
  for all using (public.owns_apartment(apartment_id))
  with check (public.owns_apartment(apartment_id));

-- apartment_amenities: public read, chủ sở hữu quản lý
create policy "amenities_public_read" on public.apartment_amenities
  for select using (true);
create policy "amenities_owner_write" on public.apartment_amenities
  for all using (public.owns_apartment(apartment_id))
  with check (public.owns_apartment(apartment_id));

-- leads: khách (anon) được tạo; chủ sở hữu xem/cập nhật lead của căn mình
create policy "leads_public_insert" on public.leads
  for insert with check (true);
create policy "leads_owner_select" on public.leads
  for select using (public.owns_apartment(apartment_id));
create policy "leads_owner_update" on public.leads
  for update using (public.owns_apartment(apartment_id));

-- leases: chỉ chủ sở hữu (không public)
create policy "leases_owner_all" on public.leases
  for all using (public.owns_apartment(apartment_id))
  with check (public.owns_apartment(apartment_id));

-- payments: chỉ chủ sở hữu của lease tương ứng
create policy "payments_owner_all" on public.payments
  for all using (
    exists (
      select 1 from public.leases l
      where l.id = payments.lease_id and public.owns_apartment(l.apartment_id)
    )
  )
  with check (
    exists (
      select 1 from public.leases l
      where l.id = payments.lease_id and public.owns_apartment(l.apartment_id)
    )
  );

-- ════════════════════════════════════════════════════════════════════════
-- STORAGE — bucket cho ảnh/video căn hộ
-- ════════════════════════════════════════════════════════════════════════
insert into storage.buckets (id, name, public)
values ('apartment-media', 'apartment-media', true)
on conflict (id) do nothing;

-- Ai cũng đọc được ảnh (bucket public)
create policy "media_bucket_public_read" on storage.objects
  for select using (bucket_id = 'apartment-media');

-- Người dùng đã đăng nhập được upload/sửa/xoá trong bucket này
create policy "media_bucket_auth_insert" on storage.objects
  for insert to authenticated
  with check (bucket_id = 'apartment-media');
create policy "media_bucket_auth_update" on storage.objects
  for update to authenticated
  using (bucket_id = 'apartment-media');
create policy "media_bucket_auth_delete" on storage.objects
  for delete to authenticated
  using (bucket_id = 'apartment-media');

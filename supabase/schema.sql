-- ============================================================
-- E.K.PACK — Supabase schema
-- הרצה: Supabase Dashboard → SQL Editor → הדבק והרץ
-- ============================================================

-- ---------- Services ----------
create table if not exists services (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  short_description text,
  full_description text,
  benefits text[],
  price_data jsonb,
  cover_image text,
  local_video text,
  youtube_links text[],
  gallery text[],
  display_order int default 0,
  is_published boolean default true,
  created_at timestamptz default now()
);

-- ---------- Gallery ----------
create table if not exists gallery_items (
  id uuid primary key default gen_random_uuid(),
  type text check (type in ('image','video','youtube')),
  title text,
  category text,
  file_url text,
  youtube_url text,
  thumbnail text,
  display_order int default 0,
  is_published boolean default true
);

-- ---------- Contact leads ----------
create table if not exists contact_leads (
  id uuid primary key default gen_random_uuid(),
  owner_name text not null,
  phone text not null,
  city text,
  dog_breed text,
  dog_age text,
  neutered boolean,
  friendly boolean,
  service_id uuid references services(id) on delete set null,
  message text,
  status text default 'new' check (status in ('new','in_progress','done')),
  created_at timestamptz default now()
);

-- ---------- Site settings (single row, id = 1) ----------
create table if not exists site_settings (
  id int primary key default 1,
  logo text,
  hero_video text,
  hero_poster text,
  phone text,
  whatsapp text,
  address text,
  opening_hours jsonb,
  social_links jsonb,
  seo_defaults jsonb
);

-- ---------- Knowledge base for the AI agent (no embeddings — loaded into prompt) ----------
create table if not exists knowledge_items (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  content text not null,
  category text,
  source_url text,
  is_published boolean default true,
  updated_at timestamptz default now()
);

-- ---------- AI conversations ----------
create table if not exists ai_conversations (
  id uuid primary key default gen_random_uuid(),
  session_id text,
  messages jsonb,
  resolved boolean default false,
  created_at timestamptz default now()
);

-- ---------- Unanswered questions ----------
create table if not exists unanswered_questions (
  id uuid primary key default gen_random_uuid(),
  question text,
  conversation_id uuid references ai_conversations(id) on delete cascade,
  status text default 'open' check (status in ('open','resolved')),
  created_at timestamptz default now()
);

-- ============================================================
-- Row Level Security
-- ציבור: קריאה בלבד של תוכן מפורסם. כתיבה/ניהול: דרך service role בלבד.
-- ============================================================
alter table services enable row level security;
alter table gallery_items enable row level security;
alter table site_settings enable row level security;
alter table knowledge_items enable row level security;
alter table contact_leads enable row level security;

-- Public read of published content
create policy "public read published services"
  on services for select using (is_published = true);
create policy "public read published gallery"
  on gallery_items for select using (is_published = true);
create policy "public read site settings"
  on site_settings for select using (true);

-- Public insert of leads (טופס יצירת קשר). קריאה רק דרך admin (service role עוקף RLS).
create policy "public insert leads"
  on contact_leads for insert with check (true);

-- knowledge_items: אין policy ציבורי → ניגש רק דרך service role בשרת (api/chat).

-- ============================================================
-- Seed: 7 השירותים מהאפיון
-- ============================================================
insert into services (title, slug, short_description, display_order) values
  ('פנסיון ארוך טווח ותיקון התנהגותי', 'long-term-boarding', 'שהייה ארוכה בשילוב אילוף ותיקון התנהגות.', 1),
  ('פנסיון קצר טווח', 'short-term-boarding', 'אירוח לכלב שלכם לתקופות קצרות.', 2),
  ('מעון יום', 'daycare', 'מעון יום פעיל משעה 08:00 עד 18:00.', 3),
  ('פעילות להקתית', 'pack-activity', 'פעילות חברתית ובריאה בקבוצת כלבים.', 4),
  ('שירותי הסעה לווטרינריה', 'vet-transport', 'הסעת הכלב לטיפול וטרינרי וחזרה.', 5),
  ('פינת תספורת', 'grooming', 'טיפוח ותספורת לכלב שלכם.', 6),
  ('מכירת מזון ומוצרים', 'shop', 'מזון ומוצרים נבחרים לכלבים.', 7)
on conflict (slug) do nothing;

-- Seed site settings row
insert into site_settings (id) values (1) on conflict (id) do nothing;

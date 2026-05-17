create extension if not exists "pgcrypto";

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text unique not null,
  display_name text not null,
  bio text,
  avatar_url text,
  is_admin boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name_ko text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.tools (
  id uuid primary key default gen_random_uuid(),
  creator_id uuid not null references public.profiles(id) on delete cascade,
  category_id uuid not null references public.categories(id),
  slug text unique not null,
  name text not null,
  tagline text not null,
  description text not null,
  website_url text not null,
  demo_url text,
  thumbnail_url text,
  tags text[] not null default '{}',
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
  launch_date date,
  views integer not null default 0,
  created_at timestamptz not null default now()
);

create index if not exists tools_status_created_at_idx on public.tools(status, created_at desc);
create index if not exists tools_category_id_idx on public.tools(category_id);

create table if not exists public.likes (
  id uuid primary key default gen_random_uuid(),
  tool_id uuid not null references public.tools(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  created_at timestamptz not null default now(),
  unique(tool_id, user_id)
);

create table if not exists public.comments (
  id uuid primary key default gen_random_uuid(),
  tool_id uuid not null references public.tools(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  body text not null,
  created_at timestamptz not null default now()
);

create or replace function public.increment_tool_views(tool_slug text)
returns void
language sql
security definer
as $$
  update public.tools
  set views = views + 1
  where slug = tool_slug and status = 'approved';
$$;

alter table public.profiles enable row level security;
alter table public.categories enable row level security;
alter table public.tools enable row level security;
alter table public.likes enable row level security;
alter table public.comments enable row level security;

create policy "Public can read categories" on public.categories
for select using (true);

create policy "Public can read approved tools" on public.tools
for select using (status = 'approved');

create policy "Users can submit tools" on public.tools
for insert to authenticated
with check (creator_id = auth.uid() and status = 'pending');

create policy "Users can update own pending tools" on public.tools
for update to authenticated
using (creator_id = auth.uid() and status = 'pending')
with check (creator_id = auth.uid() and status = 'pending');

create policy "Users can like once" on public.likes
for insert to authenticated
with check (user_id = auth.uid());

create policy "Public can read likes" on public.likes
for select using (true);

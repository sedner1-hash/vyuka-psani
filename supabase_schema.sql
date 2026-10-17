-- ==============================================================================
-- PÍŠ VŠEMI DESETI - SCHÉMA DATABÁZE (SUPABASE / POSTGRESQL)
-- ==============================================================================

-- 1. Tabulka uživatelských profilů napojená na auth.users v Supabase
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text not null,
  display_name text,
  avatar_url text,
  total_xp integer default 0,
  level integer default 1,
  current_streak integer default 0,
  best_streak integer default 0,
  last_trained_at timestamptz,
  preferred_layout text default 'qwertz' check (preferred_layout in ('qwertz', 'qwerty')),
  sound_enabled boolean default true,
  blind_mode_enabled boolean default false,
  created_at timestamptz default timezone('utc'::text, now()) not null,
  updated_at timestamptz default timezone('utc'::text, now()) not null
);

-- 2. Katalog lekcí (Kurikulum)
create table public.lessons (
  id text primary key, -- např. 'lesson-1', 'lesson-2'
  stage integer not null, -- 1 = Domovská řada, 2 = Horní řada, 3 = Spodní řada, 4 = Diakritika...
  stage_title text not null,
  order_index integer not null,
  title text not null,
  description text not null,
  target_keys text[] not null, -- např. ['j', 'f', ' ']
  practice_text text not null,
  min_accuracy numeric(5,2) default 95.0,
  min_cpm integer default 100, -- úhozy za minutu
  created_at timestamptz default timezone('utc'::text, now()) not null
);

-- 3. Záznamy o splněných lekcích uživatele
create table public.user_lesson_progress (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  lesson_id text references public.lessons(id) on delete cascade not null,
  completed boolean default false,
  best_accuracy numeric(5,2) default 0.0,
  best_cpm integer default 0,
  best_wpm integer default 0,
  attempts_count integer default 1,
  completed_at timestamptz,
  updated_at timestamptz default timezone('utc'::text, now()) not null,
  unique (user_id, lesson_id)
);

-- 4. Detailní historie jednotlivých tréninkových relací (pro grafy vývoje v čase)
create table public.typing_sessions (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  lesson_id text references public.lessons(id) on delete set null,
  mode text default 'lesson' check (mode in ('lesson', 'drill', 'real_text', 'speed_test')),
  accuracy numeric(5,2) not null,
  cpm integer not null,
  wpm integer not null,
  duration_seconds integer not null,
  mistakes_count integer not null,
  total_characters integer not null,
  created_at timestamptz default timezone('utc'::text, now()) not null
);

-- 5. Statistika po jednotlivých klávesách a prstech (pro Heatmapu a Prstovou analýzu)
create table public.user_key_stats (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  key_char text not null, -- např. 'f', 'j', 'á'
  finger_name text not null, -- 'left_index', 'right_pinky' atd.
  total_pressed integer default 0,
  error_count integer default 0,
  average_reaction_ms integer default 0,
  updated_at timestamptz default timezone('utc'::text, now()) not null,
  unique (user_id, key_char)
);

-- 6. Katalog odznaků (Achievements)
create table public.badges (
  id text primary key, -- např. 'first_hundred_cpm', 'streak_7_days'
  title text not null,
  description text not null,
  icon text not null,
  criteria_type text not null,
  criteria_value integer not null
);

-- 7. Získané odznaky uživatelů
create table public.user_badges (
  user_id uuid references public.profiles(id) on delete cascade not null,
  badge_id text references public.badges(id) on delete cascade not null,
  earned_at timestamptz default timezone('utc'::text, now()) not null,
  primary key (user_id, badge_id)
);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

alter table public.profiles enable row level security;
alter table public.lessons enable row level security;
alter table public.user_lesson_progress enable row level security;
alter table public.typing_sessions enable row level security;
alter table public.user_key_stats enable row level security;
alter table public.badges enable row level security;
alter table public.user_badges enable row level security;

-- Veřejné čtení lekcí a odznaků
create policy "Lessons are readable by all users" on public.lessons for select using (true);
create policy "Badges are readable by all users" on public.badges for select using (true);

-- Profily: každý může číst profily (pro žebříček), ale upravovat jen svůj
create policy "Profiles are viewable by everyone" on public.profiles for select using (true);
create policy "Users can update their own profile" on public.profiles for update using (auth.uid() = id);

-- Progres a data relace: uživatel má plný přístup jen ke svým datům
create policy "Users can view own progress" on public.user_lesson_progress for select using (auth.uid() = user_id);
create policy "Users can insert/update own progress" on public.user_lesson_progress for all using (auth.uid() = user_id);

create policy "Users can view own sessions" on public.typing_sessions for select using (auth.uid() = user_id);
create policy "Users can insert own sessions" on public.typing_sessions for insert with check (auth.uid() = user_id);

create policy "Users can view own key stats" on public.user_key_stats for select using (auth.uid() = user_id);
create policy "Users can manage own key stats" on public.user_key_stats for all using (auth.uid() = user_id);

create policy "Users can view own user badges" on public.user_badges for select using (auth.uid() = user_id);

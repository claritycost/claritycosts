import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  console.warn('Supabase env vars missing — check VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY')
}

export const supabase = createClient(supabaseUrl, supabaseKey)

/*
  ── RUN THIS SQL IN YOUR SUPABASE SQL EDITOR ──────────────────────────────

  create table results (
    id          uuid primary key default gen_random_uuid(),
    created_at  timestamptz default now(),
    email       text not null,
    answers     jsonb not null,
    rate        jsonb not null,
    positioning text,
    script      text,
    paid        boolean default false,
    session_id  text
  );

  create index results_email_idx on results(email);

  alter table results enable row level security;
  create policy "allow_insert" on results for insert with check (true);
  create policy "allow_select" on results for select using (true);

  ──────────────────────────────────────────────────────────────────────────
*/

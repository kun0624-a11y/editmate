# VibeArena MVP

한국 AI 서비스 디스커버리 플랫폼 MVP.

## 1) Project Structure

- `app/` App Router pages (home, submit, detail, creator, category, admin)
- `components/` UI components (tool card, filters, shell)
- `lib/` env/supabase/types
- `supabase/schema.sql` DB schema + constraints
- `supabase/seed.sql` basic seed data
- `.env.example` environment variables

## 2) Supabase Schema

Run:

```bash
supabase db reset
# or paste supabase/schema.sql in SQL editor
```

Business rules covered:
- pending default status
- approved-only public query (apply in app query layer)
- one-like-per-user via unique `(tool_id, user_id)`
- unique slug
- views column increments on detail visit via RPC/update
- admin approval via `status` update

## 3) Local Setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

## 4) Seed Data

```bash
psql "$SUPABASE_DB_URL" -f supabase/seed.sql
```

## 5) Deployment (Vercel)

1. Push repo to GitHub.
2. Import project in Vercel.
3. Add all `.env.example` keys to Vercel Environment Variables.
4. Set build command: `npm run build`, output: default Next.js.
5. Deploy.

## 6) PostHog

- Add `NEXT_PUBLIC_POSTHOG_KEY`, `NEXT_PUBLIC_POSTHOG_HOST`.
- Initialize PostHog in a client provider (next step for production hardening).

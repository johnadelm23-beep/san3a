# SAN3A — Supabase Architecture & Database Setup Guide

This document provides a comprehensive technical overview of the production Supabase database schema, storage bucket configuration, Row Level Security (RLS) policies, and admin authorization strategy for SAN3A.

---

## 1. Environment Variables

Ensure `.env.local` contains the following public keys (obtained from your Supabase Project Settings -> API):

```bash
NEXT_PUBLIC_SUPABASE_URL=https://<your-project-ref>.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sbp_<your-publishable-anon-key>
```

> **Security Rule**: Never expose `service_role` keys, database passwords, or secret API credentials in client-side code, git repositories, or `.env.example`.

---

## 2. Database Schema Architecture

The database consists of 7 core tables:

### 1. `public.profiles`
- **`id`** (`UUID`, PK, references `auth.users(id)` ON DELETE CASCADE)
- **`role`** (`TEXT`, NOT NULL, default `'user'`, check `IN ('admin', 'user')`)
- **`full_name`** (`TEXT`, nullable)
- **`created_at`** / **`updated_at`** (`TIMESTAMPTZ`)

### 2. `public.projects`
- **`id`** (`UUID`, PK, default `gen_random_uuid()`)
- **`title`** (`TEXT`, NOT NULL)
- **`slug`** (`TEXT`, UNIQUE, NOT NULL)
- **`description`** (`TEXT`, NOT NULL)
- **`short_description`** (`TEXT`, nullable)
- **`full_description`** (`TEXT`, nullable)
- **`category`** (`TEXT`, NOT NULL)
- **`client_name`** (`TEXT`, nullable)
- **`year`** (`TEXT`, nullable)
- **`featured`** (`BOOLEAN`, default `false`)
- **`published`** (`BOOLEAN`, default `false`)
- **`status`** (`TEXT`, NOT NULL, default `'draft'`)
- **`cover_image`** (`TEXT`, nullable)
- **`project_url`** (`TEXT`, nullable)
- **`technologies`** (`TEXT[]`, default `'{}'`)
- **`created_at`** / **`updated_at`** (`TIMESTAMPTZ`)

### 3. `public.project_images`
- **`id`** (`UUID`, PK, default `gen_random_uuid()`)
- **`project_id`** (`UUID`, FK -> `public.projects(id)` ON DELETE CASCADE)
- **`image_url`** (`TEXT`, NOT NULL)
- **`storage_path`** (`TEXT`, nullable)
- **`alt_text`** (`TEXT`, nullable)
- **`sort_order`** (`INTEGER`, default `0`)
- **`created_at`** (`TIMESTAMPTZ`)

### 4. `public.services`
- **`id`** (`UUID`, PK, default `gen_random_uuid()`)
- **`title`** (`TEXT`, NOT NULL)
- **`slug`** (`TEXT`, UNIQUE, NOT NULL)
- **`description`** (`TEXT`, NOT NULL)
- **`short_description`** (`TEXT`, nullable)
- **`full_description`** (`TEXT`, nullable)
- **`deliverables`** (`TEXT[]`, default `'{}'`)
- **`icon`** (`TEXT`, nullable)
- **`featured`** (`BOOLEAN`, default `false`)
- **`active`** (`BOOLEAN`, default `true`)
- **`display_order`** / **`sort_order`** (`INTEGER`, default `0`)
- **`created_at`** / **`updated_at`** (`TIMESTAMPTZ`)

### 5. `public.offers`
- **`id`** (`UUID`, PK, default `gen_random_uuid()`)
- **`title`** (`TEXT`, NOT NULL)
- **`slug`** (`TEXT`, UNIQUE, NOT NULL)
- **`description`** (`TEXT`, NOT NULL)
- **`price`** (`TEXT`, nullable)
- **`new_price`** (`TEXT`, nullable)
- **`price_label`** (`TEXT`, nullable)
- **`old_price`** (`TEXT`, nullable)
- **`features`** (`TEXT[]`, default `'{}'`)
- **`image`** / **`cover_image`** (`TEXT`, nullable)
- **`featured`** (`BOOLEAN`, default `false`)
- **`active`** (`BOOLEAN`, default `true`)
- **`sort_order`** (`INTEGER`, default `0`)
- **`start_date`** / **`end_date`** (`TIMESTAMPTZ`, nullable)
- **`created_at`** / **`updated_at`** (`TIMESTAMPTZ`)

### 6. `public.leads`
- **`id`** (`UUID`, PK, default `gen_random_uuid()`)
- **`name`** (`TEXT`, NOT NULL)
- **`email`** (`TEXT`, nullable)
- **`phone`** (`TEXT`, nullable)
- **`service`** (`TEXT`, nullable)
- **`budget`** (`TEXT`, nullable)
- **`description`** / **`message`** (`TEXT`, nullable)
- **`status`** (`TEXT`, NOT NULL, default `'new'`)
- **`source`** (`TEXT`, nullable)
- **`created_at`** / **`updated_at`** (`TIMESTAMPTZ`)

### 7. `public.team_members`
- **`id`** (`UUID`, PK, default `gen_random_uuid()`)
- **`name`** (`TEXT`, NOT NULL)
- **`role`** (`TEXT`, NOT NULL)
- **`bio`** (`TEXT`, nullable)
- **`phone`** (`TEXT`, nullable)
- **`email`** (`TEXT`, nullable)
- **`whatsapp`** (`TEXT`, nullable)
- **`photo`** / **`image_url`** (`TEXT`, nullable)
- **`image_storage_path`** (`TEXT`, nullable)
- **`social_links`** (`JSONB`, default `'[]'`)
- **`active`** (`BOOLEAN`, default `true`)
- **`display_order`** / **`sort_order`** (`INTEGER`, default `0`)
- **`created_at`** / **`updated_at`** (`TIMESTAMPTZ`)

---

## 3. Server-Side Admin Authorization Strategy

Admin access is enforced on the database engine level using Row Level Security (RLS) combined with a `SECURITY DEFINER` function:

```sql
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
$$;
```

### How Admin Roles Work:
1. When a user registers through Supabase Auth, the trigger `on_auth_user_created` creates a record in `public.profiles` with `role = 'user'`.
2. To designate a user as an admin (e.g. John or George), update their `role` column in `public.profiles` to `'admin'`:
   ```sql
   UPDATE public.profiles SET role = 'admin' WHERE id = '<user-uuid>';
   ```

---

## 4. Row Level Security (RLS) Rules

RLS is enabled on **all** tables:

- **Public (Anonymous & Authenticated)**:
  - `projects`: `SELECT` allowed where `status = 'published'` or `published = true`.
  - `services`: `SELECT` allowed where `active = true`.
  - `offers`: `SELECT` allowed where `active = true`.
  - `team_members`: `SELECT` allowed where `active = true`.
  - `leads`: `INSERT` allowed for everyone (lead submissions from website). `SELECT`, `UPDATE`, `DELETE` are strictly **DENIED** to public users.
- **Admin Users (`is_admin() = true`)**:
  - Full `ALL` (`SELECT`, `INSERT`, `UPDATE`, `DELETE`) permissions across all application tables.

---

## 5. Storage Buckets & Policies

The following public storage buckets are configured:
- `projects`
- `services`
- `offers`
- `team`

### Storage Folder Layout:
- Projects: `project-images/{project_id}/{filename}`
- Team: `team/{team_member_id}/{filename}`

### Storage RLS Policies:
- **Public Read**: Anyone can `SELECT` images from the 4 buckets.
- **Admin Writes**: Only `is_admin() = true` can `INSERT`, `UPDATE`, or `DELETE` storage objects.

---

## 6. How to Apply Migrations

### Option A: Supabase Dashboard SQL Editor (Quickest)
1. Copy the contents of [`supabase/migrations/20260905000000_san3a_schema.sql`](file:///g:/John/workSite/supabase/migrations/20260905000000_san3a_schema.sql).
2. Open your Supabase Dashboard -> **SQL Editor**.
3. Paste and click **Run**.

### Option B: Supabase CLI
```bash
npx supabase db push
```

---

## 7. Generating Updated TypeScript Database Types

To update `src/lib/types/database.types.ts` from your remote project schema using the Supabase CLI:

```bash
npx supabase gen types typescript --project-id <your-project-ref> > src/lib/types/database.types.ts
```

---

## 8. Vercel Deployment Checklist

When deploying SAN3A to Vercel:

1. **Environment Variables**: Add the following Environment Variables in Vercel Project Settings:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
2. **Supabase Auth Redirect URLs**: In your Supabase Dashboard under **Authentication -> URL Configuration**, add your production Vercel domain URL (e.g. `https://san3a.co` or `https://<your-project>.vercel.app/admin/login`).

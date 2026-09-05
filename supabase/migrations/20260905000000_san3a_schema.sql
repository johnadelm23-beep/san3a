-- SAN3A Database Migration
-- Phase 2: Schema, Triggers, RLS, Admin Authorization, and Storage Buckets

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

--------------------------------------------------------------------------------
-- 1. UPDATED_AT TRIGGER FUNCTION
--------------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

--------------------------------------------------------------------------------
-- 2. TABLES CREATION
--------------------------------------------------------------------------------

-- PROFILES TABLE
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('admin', 'user')),
  full_name TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- PROJECTS TABLE
CREATE TABLE IF NOT EXISTS public.projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT NOT NULL,
  short_description TEXT,
  full_description TEXT,
  category TEXT NOT NULL,
  client_name TEXT,
  year TEXT,
  featured BOOLEAN NOT NULL DEFAULT FALSE,
  published BOOLEAN NOT NULL DEFAULT FALSE,
  status TEXT NOT NULL DEFAULT 'draft',
  cover_image TEXT,
  project_url TEXT,
  technologies TEXT[] NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- PROJECT IMAGES TABLE
CREATE TABLE IF NOT EXISTS public.project_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  storage_path TEXT,
  alt_text TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- SERVICES TABLE
CREATE TABLE IF NOT EXISTS public.services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT NOT NULL,
  short_description TEXT,
  full_description TEXT,
  deliverables TEXT[] NOT NULL DEFAULT '{}',
  icon TEXT,
  featured BOOLEAN NOT NULL DEFAULT FALSE,
  active BOOLEAN NOT NULL DEFAULT TRUE,
  display_order INTEGER NOT NULL DEFAULT 0,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- OFFERS TABLE
CREATE TABLE IF NOT EXISTS public.offers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT NOT NULL,
  price TEXT,
  new_price TEXT,
  price_label TEXT,
  old_price TEXT,
  features TEXT[] NOT NULL DEFAULT '{}',
  image TEXT,
  cover_image TEXT,
  featured BOOLEAN NOT NULL DEFAULT FALSE,
  active BOOLEAN NOT NULL DEFAULT TRUE,
  sort_order INTEGER NOT NULL DEFAULT 0,
  start_date TIMESTAMPTZ,
  end_date TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- LEADS TABLE
CREATE TABLE IF NOT EXISTS public.leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  phone TEXT,
  email TEXT,
  service TEXT,
  budget TEXT,
  description TEXT,
  message TEXT,
  status TEXT NOT NULL DEFAULT 'new',
  source TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- TEAM MEMBERS TABLE
CREATE TABLE IF NOT EXISTS public.team_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  bio TEXT,
  phone TEXT,
  email TEXT,
  whatsapp TEXT,
  photo TEXT,
  image_url TEXT,
  image_storage_path TEXT,
  social_links JSONB NOT NULL DEFAULT '[]'::jsonb,
  active BOOLEAN NOT NULL DEFAULT TRUE,
  display_order INTEGER NOT NULL DEFAULT 0,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

--------------------------------------------------------------------------------
-- 3. INDEXES
--------------------------------------------------------------------------------
CREATE INDEX IF NOT EXISTS idx_projects_slug ON public.projects(slug);
CREATE INDEX IF NOT EXISTS idx_projects_status ON public.projects(status);
CREATE INDEX IF NOT EXISTS idx_project_images_project_id ON public.project_images(project_id);
CREATE INDEX IF NOT EXISTS idx_services_slug ON public.services(slug);
CREATE INDEX IF NOT EXISTS idx_services_active ON public.services(active);
CREATE INDEX IF NOT EXISTS idx_offers_slug ON public.offers(slug);
CREATE INDEX IF NOT EXISTS idx_offers_active ON public.offers(active);
CREATE INDEX IF NOT EXISTS idx_leads_status ON public.leads(status);
CREATE INDEX IF NOT EXISTS idx_team_members_active ON public.team_members(active);

--------------------------------------------------------------------------------
-- 4. AUTOMATIC UPDATED_AT TRIGGERS
--------------------------------------------------------------------------------
CREATE OR REPLACE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE OR REPLACE TRIGGER update_projects_updated_at BEFORE UPDATE ON public.projects FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE OR REPLACE TRIGGER update_services_updated_at BEFORE UPDATE ON public.services FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE OR REPLACE TRIGGER update_offers_updated_at BEFORE UPDATE ON public.offers FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE OR REPLACE TRIGGER update_leads_updated_at BEFORE UPDATE ON public.leads FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE OR REPLACE TRIGGER update_team_members_updated_at BEFORE UPDATE ON public.team_members FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

--------------------------------------------------------------------------------
-- 5. ADMIN AUTHORIZATION & NEW USER TRIGGER
--------------------------------------------------------------------------------
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

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, role)
  VALUES (new.id, new.raw_user_meta_data->>'full_name', 'user')
  ON CONFLICT (id) DO NOTHING;
  RETURN new;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

--------------------------------------------------------------------------------
-- 6. ROW LEVEL SECURITY (RLS) POLICIES
--------------------------------------------------------------------------------

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.offers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;

-- PROFILES POLICIES
DROP POLICY IF EXISTS "Users read own profile or admin" ON public.profiles;
CREATE POLICY "Users read own profile or admin" ON public.profiles FOR SELECT USING (auth.uid() = id OR public.is_admin());

DROP POLICY IF EXISTS "Admins manage profiles" ON public.profiles;
CREATE POLICY "Admins manage profiles" ON public.profiles FOR ALL USING (public.is_admin());

-- PROJECTS POLICIES
DROP POLICY IF EXISTS "Public read published projects" ON public.projects;
CREATE POLICY "Public read published projects" ON public.projects FOR SELECT USING (status = 'published' OR published = TRUE OR public.is_admin());

DROP POLICY IF EXISTS "Admins manage projects" ON public.projects;
CREATE POLICY "Admins manage projects" ON public.projects FOR ALL USING (public.is_admin());

-- PROJECT IMAGES POLICIES
DROP POLICY IF EXISTS "Public read project images" ON public.project_images;
CREATE POLICY "Public read project images" ON public.project_images FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.projects
    WHERE public.projects.id = public.project_images.project_id
    AND (public.projects.status = 'published' OR public.projects.published = TRUE OR public.is_admin())
  )
);

DROP POLICY IF EXISTS "Admins manage project images" ON public.project_images;
CREATE POLICY "Admins manage project images" ON public.project_images FOR ALL USING (public.is_admin());

-- SERVICES POLICIES
DROP POLICY IF EXISTS "Public read active services" ON public.services;
CREATE POLICY "Public read active services" ON public.services FOR SELECT USING (active = TRUE OR public.is_admin());

DROP POLICY IF EXISTS "Admins manage services" ON public.services;
CREATE POLICY "Admins manage services" ON public.services FOR ALL USING (public.is_admin());

-- OFFERS POLICIES
DROP POLICY IF EXISTS "Public read active offers" ON public.offers;
CREATE POLICY "Public read active offers" ON public.offers FOR SELECT USING (active = TRUE OR public.is_admin());

DROP POLICY IF EXISTS "Admins manage offers" ON public.offers;
CREATE POLICY "Admins manage offers" ON public.offers FOR ALL USING (public.is_admin());

-- TEAM MEMBERS POLICIES
DROP POLICY IF EXISTS "Public read active team members" ON public.team_members;
CREATE POLICY "Public read active team members" ON public.team_members FOR SELECT USING (active = TRUE OR public.is_admin());

DROP POLICY IF EXISTS "Admins manage team members" ON public.team_members;
CREATE POLICY "Admins manage team members" ON public.team_members FOR ALL USING (public.is_admin());

-- LEADS POLICIES (Public can INSERT only. SELECT/UPDATE/DELETE requires is_admin())
DROP POLICY IF EXISTS "Anyone submit leads" ON public.leads;
CREATE POLICY "Anyone submit leads" ON public.leads FOR INSERT WITH CHECK (TRUE);

DROP POLICY IF EXISTS "Admins manage leads" ON public.leads;
CREATE POLICY "Admins manage leads" ON public.leads FOR ALL USING (public.is_admin());

--------------------------------------------------------------------------------
-- 7. STORAGE BUCKETS & STORAGE POLICIES
--------------------------------------------------------------------------------

INSERT INTO storage.buckets (id, name, public)
VALUES 
  ('projects', 'projects', TRUE),
  ('services', 'services', TRUE),
  ('offers', 'offers', TRUE),
  ('team', 'team', TRUE)
ON CONFLICT (id) DO UPDATE SET public = TRUE;

-- STORAGE POLICIES FOR PUBLIC READ & ADMIN WRITE
DROP POLICY IF EXISTS "Public read storage objects" ON storage.objects;
CREATE POLICY "Public read storage objects" ON storage.objects
  FOR SELECT USING (bucket_id IN ('projects', 'services', 'offers', 'team'));

DROP POLICY IF EXISTS "Admins insert storage objects" ON storage.objects;
CREATE POLICY "Admins insert storage objects" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id IN ('projects', 'services', 'offers', 'team') AND public.is_admin());

DROP POLICY IF EXISTS "Admins update storage objects" ON storage.objects;
CREATE POLICY "Admins update storage objects" ON storage.objects
  FOR UPDATE USING (bucket_id IN ('projects', 'services', 'offers', 'team') AND public.is_admin());

DROP POLICY IF EXISTS "Admins delete storage objects" ON storage.objects;
CREATE POLICY "Admins delete storage objects" ON storage.objects
  FOR DELETE USING (bucket_id IN ('projects', 'services', 'offers', 'team') AND public.is_admin());

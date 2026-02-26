
-- 1. Role enum
CREATE TYPE public.app_role AS ENUM ('super_admin', 'editor', 'assistant', 'analytics_viewer');

-- 2. Profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- 3. User roles table (separate from profiles per security best practices)
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role app_role NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- 4. Security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- 5. Helper: is any admin role
CREATE OR REPLACE FUNCTION public.is_admin(_user_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role IN ('super_admin', 'editor', 'assistant')
  )
$$;

-- 6. Profiles RLS
CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Admins can view all profiles"
  ON public.profiles FOR SELECT
  USING (public.is_admin(auth.uid()));

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- 7. User roles RLS
CREATE POLICY "Admins can view roles"
  ON public.user_roles FOR SELECT
  USING (public.has_role(auth.uid(), 'super_admin'));

CREATE POLICY "Super admin can manage roles"
  ON public.user_roles FOR INSERT
  WITH CHECK (public.has_role(auth.uid(), 'super_admin'));

CREATE POLICY "Super admin can delete roles"
  ON public.user_roles FOR DELETE
  USING (public.has_role(auth.uid(), 'super_admin'));

-- 8. Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'full_name', ''));
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 9. Updated_at trigger
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- 10. Insights table (for blog/essays)
CREATE TABLE public.insights (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  subtitle TEXT,
  slug TEXT UNIQUE NOT NULL,
  content TEXT,
  cover_image TEXT,
  tags TEXT[],
  category TEXT,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'scheduled')),
  publish_date TIMESTAMPTZ,
  created_by UUID REFERENCES auth.users(id),
  updated_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.insights ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read published insights"
  ON public.insights FOR SELECT
  USING (status = 'published' OR public.is_admin(auth.uid()));

CREATE POLICY "Admins can insert insights"
  ON public.insights FOR INSERT
  WITH CHECK (public.is_admin(auth.uid()));

CREATE POLICY "Admins can update insights"
  ON public.insights FOR UPDATE
  USING (public.is_admin(auth.uid()));

CREATE POLICY "Super admin can delete insights"
  ON public.insights FOR DELETE
  USING (public.has_role(auth.uid(), 'super_admin'));

CREATE TRIGGER update_insights_updated_at
  BEFORE UPDATE ON public.insights
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- 11. Books table
CREATE TABLE public.books (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  cover_image TEXT,
  format_type TEXT DEFAULT 'print' CHECK (format_type IN ('print', 'digital', 'both')),
  amazon_url TEXT,
  stripe_price_id TEXT,
  external_url TEXT,
  published BOOLEAN NOT NULL DEFAULT false,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.books ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read published books"
  ON public.books FOR SELECT
  USING (published OR public.is_admin(auth.uid()));

CREATE POLICY "Admins can insert books"
  ON public.books FOR INSERT
  WITH CHECK (public.is_admin(auth.uid()));

CREATE POLICY "Admins can update books"
  ON public.books FOR UPDATE
  USING (public.is_admin(auth.uid()));

CREATE POLICY "Super admin can delete books"
  ON public.books FOR DELETE
  USING (public.has_role(auth.uid(), 'super_admin'));

CREATE TRIGGER update_books_updated_at
  BEFORE UPDATE ON public.books
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- 12. Audience contacts
CREATE TABLE public.contacts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  institution TEXT,
  role TEXT,
  interest_type TEXT,
  segment TEXT DEFAULT 'unknown' CHECK (segment IN ('teacher', 'instructional_leader', 'district', 'unknown')),
  source TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view contacts"
  ON public.contacts FOR SELECT
  USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can insert contacts"
  ON public.contacts FOR INSERT
  WITH CHECK (public.is_admin(auth.uid()) OR true);

CREATE POLICY "Admins can update contacts"
  ON public.contacts FOR UPDATE
  USING (public.is_admin(auth.uid()));

-- 13. PD Requests pipeline
CREATE TABLE public.pd_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_name TEXT NOT NULL,
  contact_person TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT,
  notes TEXT,
  status TEXT NOT NULL DEFAULT 'new_inquiry' CHECK (status IN ('new_inquiry', 'contacted', 'proposal_sent', 'confirmed', 'completed')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.pd_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view pd_requests"
  ON public.pd_requests FOR SELECT
  USING (public.is_admin(auth.uid()));

CREATE POLICY "Anyone can submit pd_requests"
  ON public.pd_requests FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admins can update pd_requests"
  ON public.pd_requests FOR UPDATE
  USING (public.is_admin(auth.uid()));

CREATE TRIGGER update_pd_requests_updated_at
  BEFORE UPDATE ON public.pd_requests
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- 14. Testimonials
CREATE TABLE public.testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  quote TEXT NOT NULL,
  author_name TEXT NOT NULL,
  author_role TEXT,
  institution TEXT,
  photo_url TEXT,
  approved BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read approved testimonials"
  ON public.testimonials FOR SELECT
  USING (approved OR public.is_admin(auth.uid()));

CREATE POLICY "Anyone can submit testimonials"
  ON public.testimonials FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admins can update testimonials"
  ON public.testimonials FOR UPDATE
  USING (public.is_admin(auth.uid()));

CREATE POLICY "Super admin can delete testimonials"
  ON public.testimonials FOR DELETE
  USING (public.has_role(auth.uid(), 'super_admin'));

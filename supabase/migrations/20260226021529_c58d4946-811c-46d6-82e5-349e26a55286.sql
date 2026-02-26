
-- Fix contacts INSERT policy: public can only insert with required fields, admins can do anything
DROP POLICY "Admins can insert contacts" ON public.contacts;

CREATE POLICY "Public can submit contact info"
  ON public.contacts FOR INSERT
  WITH CHECK (
    name IS NOT NULL AND email IS NOT NULL
  );

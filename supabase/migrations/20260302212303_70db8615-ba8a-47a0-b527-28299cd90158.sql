
-- Table for free chapter interest signups
CREATE TABLE public.free_chapter_interest (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.free_chapter_interest ENABLE ROW LEVEL SECURITY;

-- Anyone can submit
CREATE POLICY "Anyone can submit free chapter interest"
ON public.free_chapter_interest
FOR INSERT
WITH CHECK (name IS NOT NULL AND email IS NOT NULL AND char_length(name) > 0 AND char_length(email) > 0);

-- Admins can view
CREATE POLICY "Admins can view free chapter interest"
ON public.free_chapter_interest
FOR SELECT
USING (is_admin(auth.uid()));

-- Admins can delete
CREATE POLICY "Admins can delete free chapter interest"
ON public.free_chapter_interest
FOR DELETE
USING (is_admin(auth.uid()));

-- Insert default chapter_status setting
INSERT INTO public.site_settings (key, value)
VALUES ('chapter_status', '"draft"'::jsonb)
ON CONFLICT DO NOTHING;

-- Insert default chapter config settings
INSERT INTO public.site_settings (key, value)
VALUES 
  ('chapter_pdf_url', '""'::jsonb),
  ('chapter_email_subject', '"Your Free Chapter One"'::jsonb),
  ('chapter_email_body', '"Thank you for your interest. Here is your free Chapter One."'::jsonb)
ON CONFLICT DO NOTHING;

-- Tighten testimonials INSERT policy with validation instead of always-true
DROP POLICY IF EXISTS "Anyone can submit testimonials" ON public.testimonials;
CREATE POLICY "Anyone can submit testimonials"
ON public.testimonials
FOR INSERT
WITH CHECK (
  author_name IS NOT NULL AND
  quote IS NOT NULL AND
  char_length(author_name) > 0 AND
  char_length(quote) > 0 AND
  approved = false
);

-- Tighten pd_requests INSERT policy with validation instead of always-true
DROP POLICY IF EXISTS "Anyone can submit pd_requests" ON public.pd_requests;
CREATE POLICY "Anyone can submit pd_requests"
ON public.pd_requests
FOR INSERT
WITH CHECK (
  organization_name IS NOT NULL AND
  contact_person IS NOT NULL AND
  email IS NOT NULL AND
  char_length(organization_name) > 0 AND
  char_length(contact_person) > 0 AND
  char_length(email) > 0 AND
  status = 'new_inquiry'
);
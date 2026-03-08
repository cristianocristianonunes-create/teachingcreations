-- Tighten public INSERT policies with length limits to reduce spam risk

-- contacts
DROP POLICY IF EXISTS "Public can submit contact info" ON public.contacts;
CREATE POLICY "Public can submit contact info"
ON public.contacts FOR INSERT
WITH CHECK (
  name IS NOT NULL AND
  email IS NOT NULL AND
  char_length(name) > 0 AND
  char_length(name) <= 100 AND
  char_length(email) > 0 AND
  char_length(email) <= 200 AND
  email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
);

-- free_chapter_interest
DROP POLICY IF EXISTS "Anyone can submit free chapter interest" ON public.free_chapter_interest;
CREATE POLICY "Anyone can submit free chapter interest"
ON public.free_chapter_interest FOR INSERT
WITH CHECK (
  name IS NOT NULL AND
  email IS NOT NULL AND
  char_length(name) > 0 AND
  char_length(name) <= 100 AND
  char_length(email) > 0 AND
  char_length(email) <= 200 AND
  email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
);

-- pd_feedback: add length caps
DROP POLICY IF EXISTS "Anyone can submit pd_feedback" ON public.pd_feedback;
CREATE POLICY "Anyone can submit pd_feedback"
ON public.pd_feedback FOR INSERT
WITH CHECK (
  grade_level IS NOT NULL AND
  educator_role IS NOT NULL AND
  aha_moment IS NOT NULL AND
  strategy_implemented IS NOT NULL AND
  instructional_shift IS NOT NULL AND
  student_impact IS NOT NULL AND
  would_recommend IS NOT NULL AND
  consent_level IS NOT NULL AND
  char_length(grade_level) > 0 AND char_length(grade_level) <= 100 AND
  char_length(educator_role) > 0 AND char_length(educator_role) <= 100 AND
  char_length(aha_moment) <= 2000 AND
  char_length(strategy_implemented) <= 2000 AND
  char_length(instructional_shift) <= 2000 AND
  char_length(student_impact) <= 2000
);

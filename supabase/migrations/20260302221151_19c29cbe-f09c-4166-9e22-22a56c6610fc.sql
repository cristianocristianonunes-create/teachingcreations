
CREATE TABLE public.pd_feedback (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  grade_level text NOT NULL,
  educator_role text NOT NULL,
  school_district text,
  aha_moment text NOT NULL,
  strategy_implemented text NOT NULL,
  instructional_shift text NOT NULL,
  student_impact text NOT NULL,
  would_recommend text NOT NULL,
  testimonial text,
  consent_level text NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.pd_feedback ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit pd_feedback"
ON public.pd_feedback
FOR INSERT
WITH CHECK (
  grade_level IS NOT NULL AND
  educator_role IS NOT NULL AND
  aha_moment IS NOT NULL AND
  strategy_implemented IS NOT NULL AND
  instructional_shift IS NOT NULL AND
  student_impact IS NOT NULL AND
  would_recommend IS NOT NULL AND
  consent_level IS NOT NULL AND
  char_length(grade_level) > 0 AND
  char_length(educator_role) > 0
);

CREATE POLICY "Admins can view pd_feedback"
ON public.pd_feedback
FOR SELECT
USING (is_admin(auth.uid()));

CREATE POLICY "Admins can delete pd_feedback"
ON public.pd_feedback
FOR DELETE
USING (is_admin(auth.uid()));


-- Create trigger function to copy testimonial from pd_feedback to testimonials
CREATE OR REPLACE FUNCTION public.copy_pd_testimonial()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NEW.testimonial IS NOT NULL AND char_length(trim(NEW.testimonial)) > 0 THEN
    INSERT INTO public.testimonials (quote, author_name, author_role, approved)
    VALUES (
      NEW.testimonial,
      COALESCE(NEW.school_district, 'PD Participant'),
      NEW.educator_role || ' · ' || NEW.grade_level,
      false
    );
  END IF;
  RETURN NEW;
END;
$$;

-- Create trigger on pd_feedback table
CREATE TRIGGER on_pd_feedback_copy_testimonial
AFTER INSERT ON public.pd_feedback
FOR EACH ROW
EXECUTE FUNCTION public.copy_pd_testimonial();

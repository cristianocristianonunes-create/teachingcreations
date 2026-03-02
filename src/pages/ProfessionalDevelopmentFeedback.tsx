import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { supabase } from "@/integrations/supabase/client";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";

const feedbackSchema = z.object({
  gradeLevel: z.string().min(1, "Please select a grade level"),
  currentRole: z.string().min(1, "Please select your role"),
  schoolDistrict: z.string().optional(),
  ahaMoment: z.string().trim().min(1, "This field is required").max(2000),
  strategyImplemented: z.string().trim().min(1, "This field is required").max(2000),
  instructionalShift: z.string().trim().min(1, "This field is required").max(2000),
  studentImpact: z.string().trim().min(1, "This field is required").max(2000),
  wouldRecommend: z.string().min(1, "Please select an option"),
  testimonial: z.string().trim().max(2000).optional(),
  consentLevel: z.string().min(1, "Please select a consent option"),
});

type FeedbackFormData = z.infer<typeof feedbackSchema>;

const ProfessionalDevelopmentFeedback = () => {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const form = useForm<FeedbackFormData>({
    resolver: zodResolver(feedbackSchema),
    defaultValues: {
      gradeLevel: "",
      currentRole: "",
      schoolDistrict: "",
      ahaMoment: "",
      strategyImplemented: "",
      instructionalShift: "",
      studentImpact: "",
      wouldRecommend: "",
      testimonial: "",
      consentLevel: "",
    },
  });

  const onSubmit = async (data: FeedbackFormData) => {
    setSubmitting(true);
    try {
      const { error } = await supabase.functions.invoke("send-pd-feedback", {
        body: data,
      });
      if (error) throw error;
      setSubmitted(true);
    } catch {
      toast({
        title: "Something went wrong",
        description: "Please try again or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <h1 className="font-serif text-2xl text-foreground mb-4">Thank you.</h1>
          <p className="text-sm text-muted-foreground font-sans leading-relaxed">
            Your reflection has been received.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto px-6 py-20 md:py-28">
        {/* Header */}
        <header className="text-center mb-16">
          <h1 className="font-serif text-3xl md:text-4xl text-foreground leading-snug mb-4">
            Professional Development Reflection
          </h1>
          <div className="w-16 h-px bg-border mx-auto mb-6" />
          <p className="text-sm text-muted-foreground font-sans leading-relaxed max-w-lg mx-auto">
            Thank you for participating in this professional development experience.
            Your reflection contributes to instructional clarity and long-term impact
            across multilingual classrooms.
          </p>
        </header>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-16">
            {/* SECTION 1 */}
            <section>
              <h2 className="text-xs tracking-widest uppercase text-muted-foreground font-sans font-medium mb-8">
                Professional Profile
              </h2>
              <div className="space-y-6">
                <FormField
                  control={form.control}
                  name="gradeLevel"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-sans text-foreground">Grade Level</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select grade level" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {["Elementary", "Middle", "High School", "Early College", "Administrator", "Other"].map((g) => (
                            <SelectItem key={g} value={g}>{g}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="currentRole"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-sans text-foreground">Current Role</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your role" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {["ELD Teacher", "Classroom/Content Teacher", "Administrator", "Instructional Coach", "Other"].map((r) => (
                            <SelectItem key={r} value={r}>{r}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="schoolDistrict"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-sans text-foreground">
                        School / District <span className="text-muted-foreground font-normal">(optional)</span>
                      </FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="e.g. Los Angeles Unified" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </section>

            {/* SECTION 2 */}
            <section>
              <h2 className="text-xs tracking-widest uppercase text-muted-foreground font-sans font-medium mb-8">
                Instructional Experience
              </h2>
              <div className="space-y-8">
                {[
                  { name: "ahaMoment" as const, label: 'What was one "A-ha" moment during this training?' },
                  { name: "strategyImplemented" as const, label: "What strategy did you implement immediately?" },
                  { name: "instructionalShift" as const, label: "What instructional shift occurred in your planning?" },
                  { name: "studentImpact" as const, label: "What impact did this training have on your students?" },
                ].map(({ name, label }) => (
                  <FormField
                    key={name}
                    control={form.control}
                    name={name}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-sans text-foreground">{label}</FormLabel>
                        <FormControl>
                          <Textarea {...field} rows={4} className="resize-y" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ))}
              </div>
            </section>

            {/* SECTION 3 */}
            <section>
              <h2 className="text-xs tracking-widest uppercase text-muted-foreground font-sans font-medium mb-8">
                Public Testimonial
              </h2>
              <div className="space-y-8">
                <FormField
                  control={form.control}
                  name="wouldRecommend"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-sans text-foreground">
                        Would you recommend this training?
                      </FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col gap-3 mt-2"
                        >
                          {["Yes", "With reservations", "No"].map((opt) => (
                            <div key={opt} className="flex items-center gap-2">
                              <RadioGroupItem value={opt} id={`recommend-${opt}`} />
                              <Label htmlFor={`recommend-${opt}`} className="text-sm font-sans text-foreground cursor-pointer">
                                {opt}
                              </Label>
                            </div>
                          ))}
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="testimonial"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-sans text-foreground">
                        Please share a short testimonial that may be used publicly.
                      </FormLabel>
                      <FormControl>
                        <Textarea {...field} rows={4} className="resize-y" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="consentLevel"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-sans text-foreground">Consent for publication</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select consent level" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Full name and role">Full name and role</SelectItem>
                          <SelectItem value="First name and role only">First name and role only</SelectItem>
                          <SelectItem value="Anonymous">Anonymous</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </section>

            {/* Legal note */}
            <p className="text-xs text-muted-foreground/70 font-sans leading-relaxed">
              By submitting this reflection, you agree that your responses may be used for
              professional documentation and program evaluation. Testimonials will only be
              published according to your consent selection.
            </p>

            <div className="text-center pt-4">
              <Button
                type="submit"
                disabled={submitting}
                className="px-10 py-3 text-xs tracking-widest uppercase font-medium"
              >
                {submitting ? "Submitting…" : "Submit Reflection"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ProfessionalDevelopmentFeedback;

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const data = await req.json();

    const RECIPIENT_EMAIL = Deno.env.get("PD_FEEDBACK_EMAIL");
    if (!RECIPIENT_EMAIL) {
      throw new Error("PD_FEEDBACK_EMAIL is not configured");
    }

    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    if (!RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY is not configured");
    }

    const htmlBody = `
      <h2>New Professional Development Reflection</h2>
      <hr/>
      <h3>Professional Profile</h3>
      <p><strong>Grade Level:</strong> ${data.gradeLevel}</p>
      <p><strong>Current Role:</strong> ${data.currentRole}</p>
      <p><strong>School / District:</strong> ${data.schoolDistrict || "Not provided"}</p>
      <hr/>
      <h3>Instructional Experience</h3>
      <p><strong>"A-ha" moment:</strong><br/>${data.ahaMoment}</p>
      <p><strong>Strategy implemented:</strong><br/>${data.strategyImplemented}</p>
      <p><strong>Instructional shift:</strong><br/>${data.instructionalShift}</p>
      <p><strong>Student impact:</strong><br/>${data.studentImpact}</p>
      <hr/>
      <h3>Public Testimonial</h3>
      <p><strong>Would recommend:</strong> ${data.wouldRecommend}</p>
      <p><strong>Testimonial:</strong><br/>${data.testimonial || "Not provided"}</p>
      <p><strong>Consent level:</strong> ${data.consentLevel}</p>
    `;

    const emailRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "PD Feedback <onboarding@resend.dev>",
        to: [RECIPIENT_EMAIL],
        subject: `PD Reflection — ${data.currentRole} (${data.gradeLevel})`,
        html: htmlBody,
      }),
    });

    if (!emailRes.ok) {
      const errText = await emailRes.text();
      throw new Error(`Resend API error [${emailRes.status}]: ${errText}`);
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error sending PD feedback:", error);
    const msg = error instanceof Error ? error.message : "Unknown error";
    return new Response(JSON.stringify({ error: msg }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

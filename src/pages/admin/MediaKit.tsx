import { useState } from "react";
import { Copy, Download, Check } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const shortBio = `Erika Sun is an educator, author, and instructional strategist dedicated to transforming how schools approach teaching and learning. As the creator of The Cycle of Thinking™ framework, she empowers educators to cultivate critical thinking, intellectual engagement, and student-centered instruction across all grade levels and content areas.`;

const longBio = `Erika Sun is an educator, author, and thought leader whose work sits at the intersection of curriculum design, critical thinking, and instructional leadership. With years of experience partnering with schools and districts across the country, Erika has developed a reputation for translating complex educational research into practical, actionable strategies that transform classrooms.

Her signature framework, The Cycle of Thinking™, provides educators with a structured yet flexible approach to embedding higher-order thinking into daily instruction. The framework has been adopted by schools seeking to move beyond surface-level engagement toward deep, sustained intellectual work.

Erika is the author of multiple books on instructional practice and regularly delivers professional development sessions, keynote addresses, and strategic consulting engagements. Her work has been praised for its clarity, intellectual rigor, and immediate applicability.

Through Teaching Creations, Erika continues to publish insights, develop resources, and build a community of educators committed to raising the bar for student thinking.`;

const frameworkDesc = `The Cycle of Thinking™ is a research-informed instructional framework designed to help educators systematically develop critical thinking in students. The framework provides a structured cycle that guides lesson planning, classroom discourse, and assessment — ensuring that thinking is not an add-on, but the foundation of every learning experience.`;

const speakerIntro = `Erika Sun is a nationally recognized educator and the creator of The Cycle of Thinking™ framework. She is available for keynote addresses, professional development workshops, and strategic consulting engagements focused on instructional excellence, critical thinking, and curriculum design.`;

const sections = [
  { key: "short_bio", label: "Short Bio", content: shortBio },
  { key: "long_bio", label: "Long Bio", content: longBio },
  { key: "framework", label: "Framework Description", content: frameworkDesc },
  { key: "speaker", label: "Speaker Introduction", content: speakerIntro },
];

const MediaKit = () => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copyToClipboard = (key: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    toast({ title: "Copied to clipboard" });
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const downloadTxt = () => {
    const content = sections
      .map((s) => `=== ${s.label.toUpperCase()} ===\n\n${s.content}`)
      .join("\n\n\n");
    const fullContent = `TEACHING CREATIONS — MEDIA KIT\nErika Sun\n${"=".repeat(40)}\n\n${content}\n\n${"=".repeat(40)}\nWebsite: teachingcreations.com\nContact: erika@erikasun.com`;
    const blob = new Blob([fullContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "teaching-creations-media-kit.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-serif text-foreground">Media Kit</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Bio, framework descriptions, and press materials
          </p>
        </div>
        <button
          onClick={downloadTxt}
          className="flex items-center gap-2 px-4 py-2 border border-border text-sm text-foreground rounded hover:bg-muted transition-colors"
        >
          <Download size={14} />
          Download All
        </button>
      </div>

      <div className="space-y-4">
        {sections.map((section) => (
          <div key={section.key} className="bg-card border border-border rounded-lg p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                {section.label}
              </h3>
              <button
                onClick={() => copyToClipboard(section.key, section.content)}
                className="flex items-center gap-1 px-2 py-1 text-xs text-muted-foreground hover:text-foreground transition-colors rounded hover:bg-muted"
              >
                {copiedKey === section.key ? (
                  <>
                    <Check size={12} className="text-primary" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy size={12} />
                    Copy
                  </>
                )}
              </button>
            </div>
            <p className="text-sm text-foreground leading-relaxed whitespace-pre-line">{section.content}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 bg-card border border-border rounded-lg p-5">
        <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
          Official Links
        </h3>
        <div className="space-y-2 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Website</span>
            <span className="text-foreground">teachingcreations.com</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Contact</span>
            <span className="text-foreground">erika@erikasun.com</span>
          </div>
        </div>
      </div>

      <div className="mt-4 bg-muted/30 border border-border rounded-lg p-4 text-center">
        <p className="text-xs text-muted-foreground">
          PDF generation with official photos will be available in a future update
        </p>
      </div>
    </div>
  );
};

export default MediaKit;

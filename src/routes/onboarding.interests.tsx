import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import { useMemo, useState } from "react";
import { INTERESTS, journey, type InterestPick, type InterestKey } from "@/lib/journey-store";
import { toast } from "sonner";
import { Sparkles, Star, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/onboarding/interests")({
  head: () => ({
    meta: [
      { title: "Choose your interests — AI Career Guide" },
      { name: "description", content: "Tell us what excites you. We'll tailor the assessment and roadmap to your interests." },
      { property: "og:title", content: "Choose your interests" },
      { property: "og:description", content: "Personalized career guidance starts here." },
    ],
  }),
  component: InterestsPage,
});

function InterestsPage() {
  const navigate = useNavigate();
  const initial = journey.getInterests();
  const [picks, setPicks] = useState<Record<InterestKey, number>>(() => {
    const m = {} as Record<InterestKey, number>;
    initial.forEach(p => { m[p.key] = p.rating; });
    return m;
  });

  const chosen = useMemo(() => Object.entries(picks).filter(([, r]) => r > 0) as [InterestKey, number][], [picks]);

  const toggle = (k: InterestKey) => {
    setPicks(p => ({ ...p, [k]: p[k] ? 0 : 3 }));
  };
  const setRating = (k: InterestKey, r: number) => setPicks(p => ({ ...p, [k]: r }));

  const submit = () => {
    if (chosen.length < 2) { toast.error("Please select at least 2 interests"); return; }
    const list: InterestPick[] = chosen.map(([key, rating]) => ({ key, rating }));
    journey.setInterests(list);
    journey.setAnswers([]); // reset previous answers
    toast.success("Interests saved");
    navigate({ to: "/assessment" });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <Link to="/" className="inline-flex items-center gap-2 mb-6">
          <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-primary shadow-glow">
            <Sparkles className="h-4 w-4 text-white" />
          </div>
          <span className="font-display font-bold">AI Career Guide</span>
        </Link>

        <div className="text-center max-w-2xl mx-auto">
          <p className="text-xs uppercase tracking-wider text-primary font-semibold">Step 1 of 2</p>
          <h1 className="mt-2 font-display text-3xl sm:text-4xl font-bold">What excites you?</h1>
          <p className="mt-2 text-muted-foreground">
            Pick the areas you're curious about and rate your current comfort. We'll only ask technical questions from these areas.
          </p>
        </div>

        <div className="mt-10 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {INTERESTS.map((it, i) => {
            const Icon = (Icons as any)[it.icon] ?? Icons.Sparkles;
            const active = (picks[it.key] ?? 0) > 0;
            return (
              <motion.button
                key={it.key}
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.02 }}
                onClick={() => toggle(it.key)}
                className={`relative rounded-2xl p-4 border text-left transition-all ${
                  active
                    ? "border-primary bg-primary/5 shadow-glow -translate-y-0.5"
                    : "border-border bg-card hover:-translate-y-0.5 hover:shadow-card"
                }`}
              >
                <div
                  className="h-10 w-10 rounded-xl grid place-items-center text-white shadow-soft"
                  style={{ background: `linear-gradient(135deg, ${it.color}, ${it.color}cc)` }}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <p className="mt-3 font-semibold text-sm">{it.label}</p>
                <div className="mt-3 flex items-center gap-1" onClick={e => e.stopPropagation()}>
                  {[1, 2, 3, 4, 5].map(n => (
                    <button
                      key={n}
                      type="button"
                      disabled={!active}
                      onClick={() => setRating(it.key, n)}
                      className="disabled:opacity-40"
                      aria-label={`Rate ${n}`}
                    >
                      <Star className={`h-4 w-4 ${n <= (picks[it.key] ?? 0) ? "fill-current text-warning" : "text-muted-foreground"}`} />
                    </button>
                  ))}
                </div>
              </motion.button>
            );
          })}
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-muted-foreground">
            {chosen.length} selected {chosen.length > 0 && `• avg rating ${(chosen.reduce((a, [, r]) => a + r, 0) / chosen.length).toFixed(1)}★`}
          </p>
          <div className="flex gap-2">
            <Link to="/dashboard" className="px-5 h-11 rounded-xl border border-border hover:bg-muted inline-flex items-center">Skip</Link>
            <button
              onClick={submit}
              className="inline-flex items-center gap-2 px-6 h-11 rounded-xl bg-gradient-primary text-primary-foreground font-semibold shadow-soft hover:shadow-glow transition"
            >
              Continue to Assessment <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

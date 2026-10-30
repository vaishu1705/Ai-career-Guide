import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Brain, CheckCircle2 } from "lucide-react";
import { useEffect, useState } from "react";
import { journey, INTERESTS, type Prediction } from "@/lib/journey-store";
import { INTEREST_TO_CAREER } from "@/lib/question-bank";

export const Route = createFileRoute("/predicting")({
  component: Predicting,
});

const stages = [
  "Analyzing Interests…",
  "Evaluating Skills…",
  "Finding Best Career…",
  "Comparing Career Paths…",
  "Generating Personalized Roadmap…",
  "Preparing AI Report…",
];

function Predicting() {
  const navigate = useNavigate();
  const [stage, setStage] = useState(0);

  useEffect(() => {
    // Compute prediction from stored answers + interests
    const picks = journey.getInterests();
    const answers = journey.getAnswers();

    // Interest score = avg rating * 20 (0–100)
    const interestScore = picks.length
      ? Math.round((picks.reduce((a, p) => a + p.rating, 0) / picks.length) * 20)
      : 60;

    // Skill score = % correct answers
    const skillScore = answers.length
      ? Math.round((answers.filter(a => a.correct).length / answers.length) * 100)
      : 70;

    // Career = interest with highest (rating * accuracy)
    const scoresByInterest = picks.map(p => {
      const related = answers.filter(a => a.interest === p.key);
      const acc = related.length ? related.filter(a => a.correct).length / related.length : 0.6;
      return { key: p.key, score: p.rating * 20 * 0.5 + acc * 100 * 0.5 };
    }).sort((a, b) => b.score - a.score);

    const topKey = scoresByInterest[0]?.key ?? picks[0]?.key ?? "programming";
    const career = INTEREST_TO_CAREER[topKey];

    // Strengths / weaknesses from topic accuracy
    const byTopic: Record<string, { c: number; t: number }> = {};
    answers.forEach(a => {
      byTopic[a.topic] ??= { c: 0, t: 0 };
      byTopic[a.topic].t += 1;
      if (a.correct) byTopic[a.topic].c += 1;
    });
    const topics = Object.entries(byTopic).map(([t, v]) => ({ t, pct: v.c / v.t }));
    const strengths = topics.filter(x => x.pct >= 0.6).slice(0, 4).map(x => x.t);
    const weaknesses = topics.filter(x => x.pct < 0.6).slice(0, 4).map(x => x.t);

    const match = Math.round(interestScore * 0.4 + skillScore * 0.6);
    const confidence = Math.min(98, Math.max(60, match + (picks.length > 3 ? 4 : 0)));

    const prediction: Prediction = {
      careerSlug: career.slug,
      careerTitle: career.title,
      match,
      confidence,
      interestScore,
      skillScore,
      strengths: strengths.length ? strengths : ["Curiosity", "Learning Agility"],
      weaknesses: weaknesses.length ? weaknesses : ["Advanced Topics"],
      createdAt: new Date().toISOString(),
    };
    journey.setPrediction(prediction);

    const iv = setInterval(() => setStage(s => (s < stages.length - 1 ? s + 1 : s)), 700);
    const done = setTimeout(() => navigate({ to: "/result" }), 5200);
    return () => { clearInterval(iv); clearTimeout(done); };
  }, [navigate]);

  return (
    <div className="min-h-screen grid place-items-center bg-background px-4">
      <div className="text-center max-w-md w-full">
        <motion.div
          animate={{ scale: [1, 1.08, 1], rotate: [0, 5, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="mx-auto h-28 w-28 rounded-3xl bg-gradient-hero shadow-glow grid place-items-center"
        >
          <Brain className="h-12 w-12 text-white" />
        </motion.div>
        <div className="mt-6 mx-auto h-10 w-10 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
        <h2 className="mt-6 font-display text-2xl font-bold text-gradient">AI is thinking…</h2>
        <p className="mt-2 text-muted-foreground">Analyzing your interests and skills.</p>

        <div className="mt-8 space-y-2 text-left">
          {stages.map((s, i) => (
            <motion.div
              key={s}
              initial={false}
              animate={{ opacity: i <= stage ? 1 : 0.35 }}
              className="flex items-center gap-3 p-3 rounded-xl border border-border bg-card/60"
            >
              {i < stage ? (
                <CheckCircle2 className="h-4 w-4 text-success shrink-0" />
              ) : i === stage ? (
                <span className="h-4 w-4 rounded-full border-2 border-primary/30 border-t-primary animate-spin shrink-0" />
              ) : (
                <span className="h-4 w-4 rounded-full border border-border shrink-0" />
              )}
              <span className="text-sm">{s}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Timer, Sparkles } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { journey, INTERESTS, type AssessmentAnswer } from "@/lib/journey-store";
import { questionsFor } from "@/lib/question-bank";

export const Route = createFileRoute("/_app/assessment")({
  component: Assessment,
});

function Assessment() {
  const navigate = useNavigate();
  const picks = journey.getInterests();
  const interestKeys = picks.map(p => p.key);
  const questions = useMemo(() => questionsFor(interestKeys), [interestKeys.join(",")]);

  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [seconds, setSeconds] = useState(0);

  useEffect(() => { const t = setInterval(() => setSeconds(s => s + 1), 1000); return () => clearInterval(t); }, []);

  if (picks.length === 0) {
    return (
      <div className="max-w-lg mx-auto text-center py-16">
        <div className="mx-auto h-14 w-14 rounded-2xl bg-gradient-primary grid place-items-center text-white shadow-glow">
          <Sparkles className="h-6 w-6" />
        </div>
        <h1 className="mt-4 font-display text-2xl font-bold">Pick your interests first</h1>
        <p className="text-muted-foreground mt-2">The assessment adapts to what you're curious about. Choose a few interests to begin.</p>
        <Link to="/onboarding/interests" className="mt-6 inline-flex px-5 h-11 items-center rounded-xl bg-gradient-primary text-primary-foreground font-semibold shadow-soft">
          Choose interests
        </Link>
      </div>
    );
  }

  const q = questions[idx];
  const progress = ((idx + 1) / questions.length) * 100;
  const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");
  const interestLabel = INTERESTS.find(i => i.key === q?.interest)?.label ?? q?.interest;

  const submit = () => {
    if (Object.keys(answers).length < questions.length) {
      toast.error("Please answer all questions"); return;
    }
    const persisted: AssessmentAnswer[] = questions.map(qq => ({
      questionId: qq.id, selected: answers[qq.id], correct: answers[qq.id] === qq.correct,
      topic: qq.topic, interest: qq.interest,
    }));
    journey.setAnswers(persisted);
    navigate({ to: "/predicting" });
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold">Adaptive Skill Assessment</h1>
          <p className="text-muted-foreground text-sm">Questions are tailored to your {picks.length} interest area{picks.length === 1 ? "" : "s"}.</p>
        </div>
        <div className="glass px-3 py-2 rounded-xl inline-flex items-center gap-2 text-sm font-medium">
          <Timer className="h-4 w-4 text-primary" /> {mm}:{ss}
        </div>
      </header>

      <div className="rounded-2xl bg-card border border-border shadow-card p-6">
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="text-muted-foreground">Question {idx + 1} of {questions.length}</span>
          <span className="font-semibold">{Math.round(progress)}%</span>
        </div>
        <div className="h-2 rounded-full bg-muted overflow-hidden">
          <motion.div className="h-full bg-gradient-primary" initial={false} animate={{ width: `${progress}%` }} transition={{ duration: 0.4 }} />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={q.id}
            initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.3 }}
            className="mt-6"
          >
            <div className="flex flex-wrap gap-2 mb-3">
              <span className="inline-flex text-xs font-medium px-2.5 py-1 rounded-full bg-primary/10 text-primary">{interestLabel}</span>
              <span className="inline-flex text-xs font-medium px-2.5 py-1 rounded-full bg-secondary/10 text-secondary">{q.topic}</span>
              <span className="inline-flex text-xs font-medium px-2.5 py-1 rounded-full bg-muted">{q.difficulty}</span>
            </div>
            <h2 className="font-display text-xl font-semibold">{q.question}</h2>

            <div className="mt-5 space-y-2">
              {q.options.map((opt, i) => {
                const selected = answers[q.id] === i;
                return (
                  <button
                    key={i}
                    onClick={() => setAnswers(a => ({ ...a, [q.id]: i }))}
                    className={`w-full text-left px-4 py-3 rounded-xl border transition ${
                      selected
                        ? "border-primary bg-primary/10 shadow-soft"
                        : "border-border hover:bg-muted"
                    }`}
                  >
                    <span className={`inline-grid place-items-center h-6 w-6 rounded-full text-xs font-semibold mr-3 ${selected ? "bg-gradient-primary text-white" : "bg-muted text-foreground"}`}>
                      {String.fromCharCode(65 + i)}
                    </span>
                    {opt}
                  </button>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="mt-8 flex items-center justify-between">
          <button
            onClick={() => setIdx(i => Math.max(0, i - 1))}
            disabled={idx === 0}
            className="inline-flex items-center gap-2 px-4 h-11 rounded-xl border border-border disabled:opacity-40 hover:bg-muted"
          >
            <ChevronLeft className="h-4 w-4" /> Previous
          </button>
          {idx < questions.length - 1 ? (
            <button
              onClick={() => setIdx(i => Math.min(questions.length - 1, i + 1))}
              className="inline-flex items-center gap-2 px-5 h-11 rounded-xl bg-gradient-primary text-primary-foreground font-semibold shadow-soft"
            >
              Next <ChevronRight className="h-4 w-4" />
            </button>
          ) : (
            <button
              onClick={submit}
              className="px-6 h-11 rounded-xl bg-gradient-primary text-primary-foreground font-semibold shadow-glow"
            >
              Submit Assessment
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

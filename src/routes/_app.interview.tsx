import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Mic, MessageSquare, Brain, Users, CheckCircle2, ChevronRight } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/_app/interview")({
  component: MockInterview,
});

type Category = "technical" | "hr" | "coding" | "behavioral";

const questions: Record<Category, string[]> = {
  technical: [
    "Explain the difference between an array and a linked list.",
    "What is Big-O notation and why does it matter?",
    "Describe how HTTPS works at a high level.",
    "What is the difference between SQL and NoSQL databases?",
  ],
  hr: [
    "Tell me about yourself.",
    "Why do you want to work here?",
    "Where do you see yourself in 5 years?",
    "What are your greatest strengths and weaknesses?",
  ],
  coding: [
    "Given an array of integers, return indices of the two numbers such that they add up to a target.",
    "Reverse a linked list iteratively.",
    "Find the longest substring without repeating characters.",
  ],
  behavioral: [
    "Tell me about a time you handled a conflict in a team.",
    "Describe a project you're most proud of.",
    "How do you prioritize when you have many tasks?",
  ],
};

const categories: { key: Category; label: string; icon: any; color: string }[] = [
  { key: "technical",  label: "Technical",  icon: Brain,         color: "#4F46E5" },
  { key: "hr",         label: "HR",         icon: Users,         color: "#7C3AED" },
  { key: "coding",     label: "Coding",     icon: MessageSquare, color: "#06B6D4" },
  { key: "behavioral", label: "Behavioral", icon: Mic,           color: "#10B981" },
];

function MockInterview() {
  const [cat, setCat] = useState<Category>("technical");
  const [idx, setIdx] = useState(0);
  const [answer, setAnswer] = useState("");
  const [rating, setRating] = useState<number | null>(null);
  const [scores, setScores] = useState<number[]>([]);

  const list = questions[cat];
  const submit = () => {
    if (!rating) { toast.error("Rate your answer"); return; }
    setScores(s => [...s, rating]);
    toast.success("Answer saved");
    setAnswer(""); setRating(null);
    if (idx < list.length - 1) setIdx(idx + 1);
    else toast.success(`Round complete! Average: ${Math.round([...scores, rating].reduce((a, b) => a + b, 0) / (scores.length + 1))}%`);
  };

  const startCat = (k: Category) => { setCat(k); setIdx(0); setAnswer(""); setRating(null); setScores([]); };

  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-display text-2xl font-bold">Mock Interview</h1>
        <p className="text-muted-foreground">Practice with technical, HR, coding, and behavioral questions.</p>
      </header>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {categories.map(c => (
          <button key={c.key} onClick={() => startCat(c.key)}
            className={`rounded-2xl p-4 border text-left transition hover:-translate-y-0.5 ${cat === c.key ? "border-primary bg-primary/5 shadow-glow" : "border-border bg-card"}`}>
            <div className="h-10 w-10 rounded-xl grid place-items-center text-white shadow-soft" style={{ background: `linear-gradient(135deg, ${c.color}, ${c.color}cc)` }}>
              <c.icon className="h-5 w-5" />
            </div>
            <p className="mt-3 font-semibold text-sm">{c.label}</p>
            <p className="text-xs text-muted-foreground">{questions[c.key].length} questions</p>
          </button>
        ))}
      </div>

      <motion.div key={`${cat}-${idx}`} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl p-6 bg-card border border-border shadow-card">
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="text-muted-foreground">Question {idx + 1} of {list.length} · {cat}</span>
          <span className="font-semibold">Round progress: {Math.round(((idx) / list.length) * 100)}%</span>
        </div>
        <div className="h-2 rounded-full bg-muted overflow-hidden mb-5">
          <div className="h-full bg-gradient-primary" style={{ width: `${(idx / list.length) * 100}%` }} />
        </div>
        <h3 className="font-display text-lg font-semibold">{list[idx]}</h3>
        <textarea value={answer} onChange={e => setAnswer(e.target.value)} rows={5} placeholder="Type your answer, or speak it out loud and self-rate below."
          className="mt-4 w-full px-3 py-3 rounded-xl border border-input bg-background outline-none focus:ring-2 focus:ring-primary/40" />
        <div className="mt-4">
          <p className="text-sm font-medium mb-2">Self-rate your answer</p>
          <div className="flex flex-wrap gap-2">
            {[20, 40, 60, 80, 100].map(v => (
              <button key={v} onClick={() => setRating(v)}
                className={`px-3 py-1.5 rounded-xl text-sm border ${rating === v ? "border-primary bg-primary/10 text-primary" : "border-border hover:bg-muted"}`}>
                {v}%
              </button>
            ))}
          </div>
        </div>
        <div className="mt-6 flex justify-between items-center">
          <div className="text-sm text-muted-foreground">Scores this round: {scores.map(s => `${s}%`).join(", ") || "—"}</div>
          <button onClick={submit} className="inline-flex items-center gap-1.5 px-5 h-10 rounded-xl bg-gradient-primary text-primary-foreground font-semibold shadow-soft">
            Save & Next <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </motion.div>

      {scores.length > 0 && (
        <div className="rounded-2xl p-6 bg-card border border-border shadow-card">
          <h3 className="font-semibold flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-success" /> Performance summary</h3>
          <p className="text-sm text-muted-foreground mt-1">Average: <strong className="text-foreground">{Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)}%</strong> across {scores.length} answer(s).</p>
        </div>
      )}
    </div>
  );
}

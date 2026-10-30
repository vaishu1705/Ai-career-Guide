import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { CheckCircle2, Circle, Lock, Play } from "lucide-react";
import { useEffect, useState } from "react";
import { journey } from "@/lib/journey-store";
import { LEVEL_ORDER, moduleCompleted, roadmapFor, type Level, type Module } from "@/lib/roadmaps";

export const Route = createFileRoute("/_app/roadmap")({
  component: Roadmap,
});

function Roadmap() {
  const [slug, setSlug] = useState("software-engineer");
  const [progress, setProgress] = useState<Record<string, any>>({});
  useEffect(() => {
    const p = journey.getPrediction();
    if (p?.careerSlug) setSlug(p.careerSlug);
    setProgress(journey.getProgress());
  }, []);

  const modules = roadmapFor(slug);
  const byLevel: Record<Level, Module[]> = { Beginner: [], Intermediate: [], Advanced: [], Expert: [] };
  modules.forEach(m => byLevel[m.level].push(m));

  const isLevelUnlocked = (level: Level) => {
    const idx = LEVEL_ORDER.indexOf(level);
    if (idx === 0) return true;
    const prev = LEVEL_ORDER[idx - 1];
    return byLevel[prev].every(m => moduleCompleted(progress[m.id]));
  };

  const levelPct = (level: Level) => {
    const list = byLevel[level];
    if (!list.length) return 0;
    const done = list.filter(m => moduleCompleted(progress[m.id])).length;
    return Math.round((done / list.length) * 100);
  };

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-bold">Your Learning Roadmap</h1>
          <p className="text-muted-foreground">Career track: <span className="font-medium text-foreground">{modules[0]?.title ? slug.replace(/-/g, " ") : "Software Engineer"}</span></p>
        </div>
        <div className="flex gap-2">
          {LEVEL_ORDER.map(l => (
            <div key={l} className="glass px-3 py-1.5 rounded-xl text-xs">
              <span className="font-semibold">{l}</span> · {levelPct(l)}%
            </div>
          ))}
        </div>
      </header>

      <div className="space-y-8">
        {LEVEL_ORDER.map((level, li) => {
          const unlocked = isLevelUnlocked(level);
          const list = byLevel[level];
          return (
            <section key={level} className={`rounded-3xl p-6 border ${unlocked ? "border-border bg-card" : "border-dashed border-border bg-muted/30"} shadow-card`}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`h-10 w-10 rounded-xl grid place-items-center text-white ${unlocked ? "bg-gradient-primary shadow-glow" : "bg-muted-foreground/50"}`}>
                    {unlocked ? <span className="font-bold">{li + 1}</span> : <Lock className="h-4 w-4" />}
                  </div>
                  <div>
                    <h2 className="font-display text-xl font-bold">{level} Level</h2>
                    <p className="text-xs text-muted-foreground">{unlocked ? `${list.length} modules` : "Complete previous level to unlock"}</p>
                  </div>
                </div>
                <div className="w-40">
                  <div className="h-2 rounded-full bg-muted overflow-hidden">
                    <div className="h-full bg-gradient-primary" style={{ width: `${levelPct(level)}%` }} />
                  </div>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {list.map((m, mi) => {
                  const done = moduleCompleted(progress[m.id]);
                  return (
                    <motion.div
                      key={m.id}
                      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: mi * 0.04 }}
                      className={`rounded-2xl p-4 border ${done ? "border-success/50 bg-success/5" : "border-border bg-background"}`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2">
                          {done ? <CheckCircle2 className="h-4 w-4 text-success" /> : unlocked ? <Circle className="h-4 w-4 text-muted-foreground" /> : <Lock className="h-4 w-4 text-muted-foreground" />}
                          <span className="text-xs text-muted-foreground">{m.duration}</span>
                        </div>
                      </div>
                      <h3 className="mt-2 font-semibold text-sm leading-snug">{m.title}</h3>
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{m.summary}</p>
                      {unlocked ? (
                        <Link
                          to="/learn/$moduleId" params={{ moduleId: m.id }}
                          className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline"
                        >
                          <Play className="h-3 w-3" /> {done ? "Review module" : "Start module"}
                        </Link>
                      ) : (
                        <p className="mt-3 text-xs text-muted-foreground inline-flex items-center gap-1.5"><Lock className="h-3 w-3" /> Locked</p>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}

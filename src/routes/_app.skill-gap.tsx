import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, XCircle, ArrowDown, Target, Lightbulb } from "lucide-react";
import { careerReadiness } from "@/lib/gamification";
import { journey } from "@/lib/journey-store";

export const Route = createFileRoute("/_app/skill-gap")({
  component: SkillGap,
});

function SkillGap() {
  const { pct, skills, missing, order } = careerReadiness();
  const pred = journey.getPrediction();

  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-display text-2xl font-bold flex items-center gap-2"><Target className="h-6 w-6 text-primary" /> Skill Gap Analysis</h1>
        <p className="text-muted-foreground">Target career: <strong>{pred?.careerTitle ?? "Software Engineer"}</strong></p>
      </header>

      <div className="grid lg:grid-cols-[1fr_320px] gap-6">
        <div className="rounded-2xl p-6 bg-card border border-border shadow-card">
          <h3 className="font-semibold">Current skills vs required</h3>
          <ul className="mt-4 divide-y divide-border">
            {skills.map(s => (
              <li key={s.name} className="py-3 flex items-center justify-between">
                <span className="font-medium">{s.name}</span>
                {s.have
                  ? <span className="inline-flex items-center gap-1 text-success text-sm font-semibold"><CheckCircle2 className="h-4 w-4" /> Ready</span>
                  : <span className="inline-flex items-center gap-1 text-destructive text-sm font-semibold"><XCircle className="h-4 w-4" /> Missing</span>}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl p-6 bg-gradient-hero text-white shadow-glow text-center">
          <p className="text-sm uppercase tracking-wider opacity-80">Overall Readiness</p>
          <div className="mt-4 relative w-40 h-40 mx-auto">
            <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
              <circle cx="50" cy="50" r="42" stroke="rgba(255,255,255,0.2)" strokeWidth="10" fill="none" />
              <circle cx="50" cy="50" r="42" stroke="white" strokeWidth="10" fill="none"
                strokeDasharray={`${(pct / 100) * 264} 264`} strokeLinecap="round" />
            </svg>
            <div className="absolute inset-0 grid place-items-center font-display text-4xl font-bold">{pct}%</div>
          </div>
          <p className="mt-3 text-sm opacity-90">{pct >= 80 ? "Excellent — you're job-ready." : pct >= 50 ? "Solid base — close a few gaps." : "Focus on core fundamentals next."}</p>
        </div>
      </div>

      <div className="rounded-2xl p-6 bg-card border border-border shadow-card">
        <h3 className="font-semibold flex items-center gap-2"><Lightbulb className="h-4 w-4 text-warning" /> Recommended learning order</h3>
        {order.length === 0 ? (
          <p className="mt-4 text-sm text-muted-foreground">You're covered on the essentials — head to advanced modules on your roadmap.</p>
        ) : (
          <div className="mt-5 flex flex-col items-center gap-2">
            {order.map((s, i) => (
              <div key={s} className="w-full max-w-md">
                <div className="rounded-xl px-4 py-3 bg-gradient-primary text-primary-foreground shadow-soft text-center font-semibold">{s}</div>
                {i < order.length - 1 && <ArrowDown className="h-5 w-5 mx-auto my-1 text-muted-foreground" />}
              </div>
            ))}
          </div>
        )}
        <div className="mt-6 flex justify-center gap-2">
          <Link to="/roadmap" className="px-5 h-10 rounded-xl bg-gradient-primary text-primary-foreground font-semibold shadow-soft inline-flex items-center">Open roadmap</Link>
          <Link to="/courses" className="px-5 h-10 rounded-xl border border-border hover:bg-muted inline-flex items-center">Browse courses</Link>
        </div>
      </div>

      {missing.length > 0 && (
        <div className="rounded-2xl p-6 bg-warning/10 border border-warning/30">
          <p className="font-semibold text-warning-foreground">Smart recommendation</p>
          <p className="text-sm text-muted-foreground mt-1">
            You are missing <strong>{missing[0]}</strong>. We suggest taking a focused class on {missing[0]} before advancing to the next module in your roadmap.
          </p>
        </div>
      )}
    </div>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { BarChart3, GitCompare } from "lucide-react";
import { careers, getCareer } from "@/lib/career-catalog";

export const Route = createFileRoute("/_app/compare")({
  component: Compare,
});

function Compare() {
  const [a, setA] = useState("software-engineer");
  const [b, setB] = useState("data-scientist");
  const A = useMemo(() => getCareer(a)!, [a]);
  const B = useMemo(() => getCareer(b)!, [b]);

  const rows: { label: string; a: string | number; b: string | number; }[] = [
    { label: "Average Salary (India)", a: A.salaryIN, b: B.salaryIN },
    { label: "Job Demand",             a: A.demandIN, b: B.demandIN },
    { label: "Career Growth",          a: A.growth,   b: B.growth },
    { label: "Required Degree",        a: A.requiredDegree, b: B.requiredDegree },
    { label: "Learning Duration",      a: `${A.roadmap.reduce((s,r)=>s+r.weeks,0)} weeks`, b: `${B.roadmap.reduce((s,r)=>s+r.weeks,0)} weeks` },
  ];

  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-display text-2xl font-bold flex items-center gap-2"><GitCompare className="h-6 w-6 text-primary" /> AI Career Comparison</h1>
        <p className="text-muted-foreground">Compare two career paths side-by-side to make a confident choice.</p>
      </header>

      <div className="grid sm:grid-cols-2 gap-3">
        <Picker label="Career A" value={a} onChange={setA} />
        <Picker label="Career B" value={b} onChange={setB} />
      </div>

      <div className="rounded-2xl overflow-hidden border border-border shadow-card bg-card">
        <div className="grid grid-cols-3 bg-gradient-hero text-white">
          <div className="p-4 font-semibold">Metric</div>
          <div className="p-4 font-semibold border-l border-white/20">{A.title}</div>
          <div className="p-4 font-semibold border-l border-white/20">{B.title}</div>
        </div>
        {rows.map((r, i) => (
          <div key={r.label} className={`grid grid-cols-3 text-sm ${i % 2 ? "bg-muted/30" : ""}`}>
            <div className="p-4 font-medium text-muted-foreground">{r.label}</div>
            <div className="p-4 border-l border-border">{r.a}</div>
            <div className="p-4 border-l border-border">{r.b}</div>
          </div>
        ))}
        <div className="grid grid-cols-3 text-sm border-t border-border">
          <div className="p-4 font-medium text-muted-foreground">Required Skills</div>
          <SkillCell skills={A.skills} />
          <SkillCell skills={B.skills} />
        </div>
        <div className="grid grid-cols-3 text-sm border-t border-border">
          <div className="p-4 font-medium text-muted-foreground">Top Companies</div>
          <ChipCell items={A.companies} />
          <ChipCell items={B.companies} />
        </div>
      </div>

      <div className="rounded-2xl p-5 bg-card border border-border shadow-card">
        <h3 className="font-semibold flex items-center gap-2"><BarChart3 className="h-4 w-4 text-primary" /> Skill demand snapshot</h3>
        <div className="mt-4 space-y-3">
          {A.skills.slice(0, 5).map((sA, i) => {
            const sB = B.skills[i] ?? { name: "-", level: 0 };
            return (
              <div key={i} className="grid grid-cols-[minmax(140px,1fr)_1fr_1fr] gap-3 items-center text-sm">
                <div className="text-muted-foreground truncate">{sA.name} · {sB.name}</div>
                <Bar value={sA.level} tint="bg-gradient-primary" />
                <Bar value={sB.level} tint="bg-accent" />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function Picker({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <label className="rounded-2xl p-4 bg-card border border-border shadow-card block">
      <span className="text-xs uppercase tracking-wider text-muted-foreground">{label}</span>
      <select value={value} onChange={(e) => onChange(e.target.value)} className="mt-1 w-full h-11 px-3 rounded-xl border border-input bg-background outline-none focus:ring-2 focus:ring-primary/40 font-semibold">
        {careers.map(c => <option key={c.slug} value={c.slug}>{c.title}</option>)}
      </select>
    </label>
  );
}

function SkillCell({ skills }: { skills: { name: string; level: number }[] }) {
  return (
    <div className="p-4 border-l border-border space-y-1">
      {skills.map(s => <div key={s.name} className="flex justify-between gap-2"><span>{s.name}</span><span className="text-muted-foreground">{s.level}%</span></div>)}
    </div>
  );
}
function ChipCell({ items }: { items: string[] }) {
  return (
    <div className="p-4 border-l border-border flex flex-wrap gap-1.5">
      {items.map(i => <span key={i} className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary">{i}</span>)}
    </div>
  );
}
function Bar({ value, tint }: { value: number; tint: string }) {
  return (
    <div className="h-2 rounded-full bg-muted overflow-hidden">
      <div className={`h-full ${tint}`} style={{ width: `${value}%` }} />
    </div>
  );
}

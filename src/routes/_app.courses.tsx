import { createFileRoute } from "@tanstack/react-router";
import { Search, Star, Clock, User } from "lucide-react";
import { useMemo, useState } from "react";
import { courses } from "@/lib/mock-data";
import { toast } from "sonner";
import { BookmarkButton } from "@/components/BookmarkButton";

export const Route = createFileRoute("/_app/courses")({
  component: Courses,
});

const CATEGORIES = ["All", ...Array.from(new Set(courses.map(c => c.category)))];

function Courses() {
  const [q, setQ] = useState("");
  const [level, setLevel] = useState("All");
  const [cat, setCat] = useState("All");
  const [minRating, setMinRating] = useState(0);

  const filtered = useMemo(() => courses.filter(c =>
    c.name.toLowerCase().includes(q.toLowerCase())
    && (level === "All" || c.level === level)
    && (cat === "All" || c.category === cat)
    && c.rating >= minRating
  ), [q, level, cat, minRating]);

  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-display text-2xl font-bold">Recommended Courses</h1>
        <p className="text-muted-foreground">Handpicked by our AI based on your career match.</p>
      </header>

      <div className="rounded-2xl p-4 bg-card border border-border shadow-card grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto_auto_auto]">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search courses…" className="w-full h-10 pl-9 pr-3 rounded-xl bg-muted/60 border border-border outline-none focus:ring-2 focus:ring-primary/40" />
        </div>
        <select value={level} onChange={(e) => setLevel(e.target.value)} className="h-10 px-3 rounded-xl bg-muted/60 border border-border text-sm">
          {["All", "Beginner", "Intermediate", "Advanced"].map(x => <option key={x}>{x}</option>)}
        </select>
        <select value={cat} onChange={(e) => setCat(e.target.value)} className="h-10 px-3 rounded-xl bg-muted/60 border border-border text-sm">
          {CATEGORIES.map(x => <option key={x}>{x}</option>)}
        </select>
        <div className="flex items-center gap-2 text-sm">
          <label className="text-muted-foreground whitespace-nowrap">≥ {minRating}★</label>
          <input type="range" min={0} max={5} step={0.5} value={minRating} onChange={(e) => setMinRating(+e.target.value)} className="w-24" />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(c => (
          <div key={c.id} className="rounded-2xl p-5 bg-card border border-border shadow-card hover:-translate-y-1 hover:shadow-glow transition relative">
            <div className="absolute top-3 right-3 z-10">
              <BookmarkButton id={`course-${c.id}`} kind="course" label="course" />
            </div>
            <div className="h-32 rounded-xl bg-gradient-hero mb-4 grid place-items-center text-white font-display text-lg font-bold">
              {c.category}
            </div>
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">{c.level}</span>
              <span className="inline-flex items-center gap-1 text-warning font-medium"><Star className="h-3.5 w-3.5 fill-current" />{c.rating}</span>
            </div>
            <h3 className="font-semibold">{c.name}</h3>
            <div className="mt-2 text-sm text-muted-foreground space-y-1">
              <p className="inline-flex items-center gap-2"><User className="h-3.5 w-3.5" />{c.instructor}</p>
              <p className="inline-flex items-center gap-2"><Clock className="h-3.5 w-3.5" />{c.duration}</p>
            </div>
            <button onClick={() => toast.success("Enrolled!")} className="mt-4 w-full h-10 rounded-xl bg-gradient-primary text-primary-foreground font-semibold shadow-soft hover:shadow-glow transition">
              Enroll now
            </button>
          </div>
        ))}
        {filtered.length === 0 && (
          <p className="col-span-full text-center text-muted-foreground py-12">No courses match your filters.</p>
        )}
      </div>
    </div>
  );
}

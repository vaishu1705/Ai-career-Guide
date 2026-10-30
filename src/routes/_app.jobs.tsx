import { createFileRoute, Link } from "@tanstack/react-router";
import { Search, MapPin, Briefcase, Building2, IndianRupee } from "lucide-react";
import { useState, useMemo } from "react";
import { jobs } from "@/lib/mock-data";
import { toast } from "sonner";
import { BookmarkButton } from "@/components/BookmarkButton";

export const Route = createFileRoute("/_app/jobs")({
  component: Jobs,
});

const LOCATIONS = ["All", "Bengaluru, IN", "Hyderabad, IN", "Gurgaon, IN", "Remote"];
const TYPES = ["All", "Full-time", "Part-time"];

function Jobs() {
  const [q, setQ] = useState("");
  const [loc, setLoc] = useState("All");
  const [type, setType] = useState("All");
  const [minSalary, setMinSalary] = useState(0);

  const filtered = useMemo(() => jobs.filter(j => {
    const min = parseInt(j.salary.replace(/[^0-9]/g, "").slice(0, 2) || "0", 10);
    return (j.role + j.company).toLowerCase().includes(q.toLowerCase())
      && (loc === "All" || j.location === loc)
      && (type === "All" || j.type === type)
      && min >= minSalary;
  }), [q, loc, type, minSalary]);

  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-display text-2xl font-bold">Jobs matched for you</h1>
        <p className="text-muted-foreground">Curated roles based on your predicted career.</p>
      </header>

      <div className="rounded-2xl p-4 bg-card border border-border shadow-card grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto_auto_auto]">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search jobs…" className="w-full h-10 pl-9 pr-3 rounded-xl bg-muted/60 border border-border outline-none focus:ring-2 focus:ring-primary/40" />
        </div>
        <select value={loc} onChange={(e) => setLoc(e.target.value)} className="h-10 px-3 rounded-xl bg-muted/60 border border-border text-sm">
          {LOCATIONS.map(x => <option key={x}>{x}</option>)}
        </select>
        <select value={type} onChange={(e) => setType(e.target.value)} className="h-10 px-3 rounded-xl bg-muted/60 border border-border text-sm">
          {TYPES.map(x => <option key={x}>{x}</option>)}
        </select>
        <div className="flex items-center gap-2 text-sm">
          <label className="text-muted-foreground whitespace-nowrap">Min ₹{minSalary}L</label>
          <input type="range" min={0} max={20} step={2} value={minSalary} onChange={(e) => setMinSalary(+e.target.value)} className="w-24" />
        </div>
      </div>

      <p className="text-sm text-muted-foreground">{filtered.length} jobs found</p>

      <div className="grid md:grid-cols-2 gap-4">
        {filtered.map(j => (
          <div key={j.id} className="rounded-2xl p-5 bg-card border border-border shadow-card hover:-translate-y-1 hover:shadow-glow transition">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <div className="h-12 w-12 rounded-xl bg-gradient-primary grid place-items-center text-white font-bold shrink-0">
                  {j.company[0]}
                </div>
                <div className="min-w-0">
                  <h3 className="font-semibold truncate">{j.role}</h3>
                  <p className="text-sm text-muted-foreground inline-flex items-center gap-1"><Building2 className="h-3.5 w-3.5" />{j.company}</p>
                </div>
              </div>
              <BookmarkButton id={`job-${j.id}`} kind="job" label="job" />
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
              <Info icon={MapPin} value={j.location} />
              <Info icon={IndianRupee} value={j.salary} />
              <Info icon={Briefcase} value={j.experience} />
              <span className="inline-flex items-center gap-1 text-muted-foreground">
                <span className="h-2 w-2 rounded-full bg-success" />{j.type}
              </span>
            </div>
            <button onClick={() => toast.success("Application started")} className="mt-4 w-full h-10 rounded-xl bg-gradient-primary text-primary-foreground font-semibold shadow-soft hover:shadow-glow transition">
              Apply now
            </button>
          </div>
        ))}
        {filtered.length === 0 && (
          <p className="col-span-full text-center text-muted-foreground py-12">No jobs match your filters.</p>
        )}
      </div>
    </div>
  );
}

function Info({ icon: Icon, value }: any) {
  return <span className="inline-flex items-center gap-1 text-muted-foreground"><Icon className="h-3.5 w-3.5" />{value}</span>;
}

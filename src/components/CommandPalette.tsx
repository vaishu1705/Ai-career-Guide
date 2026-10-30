import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "@tanstack/react-router";
import { Search, ArrowRight, Briefcase, GraduationCap, Rocket, Compass, LayoutDashboard, Map, User, ClipboardList } from "lucide-react";
import { jobs, courses, internships } from "@/lib/mock-data";
import { careers } from "@/lib/career-catalog";

interface Item { id: string; title: string; hint: string; to: string; params?: any; icon: any; }

export function CommandPalette({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [q, setQ] = useState("");
  const navigate = useNavigate();

  useEffect(() => { if (!open) setQ(""); }, [open]);

  const items = useMemo<Item[]>(() => {
    const pages: Item[] = [
      { id: "p-dash", title: "Dashboard", hint: "Overview", to: "/dashboard", icon: LayoutDashboard },
      { id: "p-assess", title: "Take Assessment", hint: "MCQ", to: "/assessment", icon: ClipboardList },
      { id: "p-roadmap", title: "Learning Roadmap", hint: "Study plan", to: "/roadmap", icon: Map },
      { id: "p-profile", title: "Profile", hint: "Your info", to: "/profile", icon: User },
    ];
    const careerItems: Item[] = careers.map(c => ({
      id: `c-${c.slug}`, title: c.title, hint: "Career", to: "/careers/$slug", params: { slug: c.slug }, icon: Compass,
    }));
    const jobItems: Item[] = jobs.map(j => ({ id: `j-${j.id}`, title: `${j.role} — ${j.company}`, hint: "Job", to: "/jobs", icon: Briefcase }));
    const courseItems: Item[] = courses.map(c => ({ id: `co-${c.id}`, title: c.name, hint: "Course", to: "/courses", icon: GraduationCap }));
    const intItems: Item[] = internships.map(i => ({ id: `i-${i.id}`, title: `${i.role} — ${i.company}`, hint: "Internship", to: "/internships", icon: Rocket }));
    return [...pages, ...careerItems, ...jobItems, ...courseItems, ...intItems];
  }, []);

  const filtered = q
    ? items.filter(i => (i.title + i.hint).toLowerCase().includes(q.toLowerCase())).slice(0, 12)
    : items.slice(0, 8);

  const go = (i: Item) => {
    onClose();
    navigate({ to: i.to as any, params: i.params });
  };

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm grid place-items-start pt-24 px-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -10, opacity: 0 }}
            className="w-full max-w-xl rounded-2xl bg-card border border-border shadow-glow overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 px-4 border-b border-border">
              <Search className="h-4 w-4 text-muted-foreground" />
              <input
                autoFocus value={q} onChange={(e) => setQ(e.target.value)}
                placeholder="Search careers, jobs, courses, pages…"
                className="flex-1 h-14 bg-transparent outline-none text-sm"
              />
              <kbd className="text-xs px-1.5 py-0.5 rounded bg-muted text-muted-foreground">Esc</kbd>
            </div>
            <div className="max-h-[420px] overflow-y-auto p-2">
              {filtered.length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-10">No matches for "{q}"</p>
              )}
              {filtered.map(i => (
                <button
                  key={i.id} onClick={() => go(i)}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-muted transition text-left"
                >
                  <div className="h-9 w-9 rounded-xl bg-gradient-primary grid place-items-center text-white shrink-0">
                    <i.icon className="h-4 w-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium truncate">{i.title}</p>
                    <p className="text-xs text-muted-foreground">{i.hint}</p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground shrink-0" />
                </button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

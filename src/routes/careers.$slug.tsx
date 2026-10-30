import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowLeft, Award, Building2, GraduationCap, Map as MapIcon, Sparkles, TrendingUp, IndianRupee, ChevronRight } from "lucide-react";
import { getCareer, careers, type CareerDetail } from "@/lib/career-catalog";

export const Route = createFileRoute("/careers/$slug")({
  loader: ({ params }): { career: CareerDetail } => {
    const career = getCareer(params.slug);
    if (!career) throw notFound();
    return { career };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Career not found" }, { name: "robots", content: "noindex" }] };
    const c = loaderData.career;
    return {
      meta: [
        { title: `${c.title} — Career Guide` },
        { name: "description", content: c.tagline },
        { property: "og:title", content: `${c.title} — Career Guide` },
        { property: "og:description", content: c.tagline },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="min-h-screen grid place-items-center p-6 text-center">
      <div>
        <h1 className="font-display text-3xl font-bold">Career not found</h1>
        <Link to="/dashboard" className="mt-4 inline-block text-primary hover:underline">← Back to dashboard</Link>
      </div>
    </div>
  ),
  component: CareerDetail,
});

function CareerDetail() {
  const { career: c } = Route.useLoaderData();
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        <Link to="/dashboard" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> Back
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl p-8 sm:p-10 bg-gradient-hero text-white shadow-glow relative overflow-hidden"
        >
          <div className="absolute inset-0 opacity-20 [background:radial-gradient(circle_at_20%_20%,white,transparent_40%),radial-gradient(circle_at_80%_60%,white,transparent_40%)]" />
          <div className="relative">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur text-xs font-medium mb-4">
              <Sparkles className="h-3 w-3" /> Career profile
            </div>
            <h1 className="font-display text-4xl sm:text-5xl font-bold">{c.title}</h1>
            <p className="mt-3 text-white/85 max-w-2xl">{c.tagline}</p>
            <div className="mt-6 grid sm:grid-cols-3 gap-3 max-w-2xl">
              <Metric icon={IndianRupee} label="Salary (IN)" value={c.salaryIN} />
              <Metric icon={TrendingUp} label="Demand" value={c.demandIN} />
              <Metric icon={GraduationCap} label="Growth" value={c.growth} />
            </div>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-4">
          <Panel title="Overview" icon={Sparkles}>
            <p className="text-muted-foreground">{c.overview}</p>
            <div className="mt-4 rounded-xl p-3 bg-muted/60">
              <p className="text-xs text-muted-foreground">Required degree</p>
              <p className="font-semibold mt-0.5">{c.requiredDegree}</p>
            </div>
          </Panel>

          <Panel title="Skills & proficiency" icon={Award}>
            <div className="space-y-3">
              {c.skills.map((s: CareerDetail["skills"][number]) => (
                <div key={s.name}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium">{s.name}</span>
                    <span className="text-muted-foreground">{s.level}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-muted overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }} animate={{ width: `${s.level}%` }} transition={{ duration: 0.8 }}
                      className="h-full bg-gradient-primary rounded-full"
                    />
                  </div>
                </div>
              ))}
            </div>
          </Panel>

          <Panel title="Top hiring companies" icon={Building2}>
            <div className="flex flex-wrap gap-2">
              {c.companies.map((co: string) => (
                <span key={co} className="px-3 py-1.5 rounded-full text-sm bg-primary/10 text-primary font-medium">{co}</span>
              ))}
            </div>
          </Panel>

          <Panel title="Recommended certifications" icon={GraduationCap}>
            <ul className="space-y-2">
              {c.certifications.map((x: string) => (
                <li key={x} className="flex items-center gap-2 text-sm">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />{x}
                </li>
              ))}
            </ul>
          </Panel>
        </div>

        <Panel title="Learning roadmap" icon={MapIcon}>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {c.roadmap.map((r: CareerDetail["roadmap"][number], i: number) => (
              <div key={i} className="rounded-xl p-4 border border-border">
                <p className="text-xs uppercase tracking-wide text-primary font-semibold">{r.phase}</p>
                <p className="font-semibold mt-1">{r.title}</p>
                <p className="text-xs text-muted-foreground mt-2">{r.weeks} weeks</p>
              </div>
            ))}
          </div>
          <Link to="/roadmap" className="mt-4 inline-flex items-center gap-1 text-sm text-primary hover:underline">
            View full roadmap <ChevronRight className="h-3.5 w-3.5" />
          </Link>
        </Panel>

        {c.related.length > 0 && (
          <Panel title="Related careers" icon={Sparkles}>
            <div className="grid sm:grid-cols-3 gap-3">
              {c.related.map((slug: string) => {
                const rc = careers.find(x => x.slug === slug);
                if (!rc) return null;
                return (
                  <Link key={slug} to="/careers/$slug" params={{ slug }} className="rounded-xl p-4 border border-border hover:-translate-y-1 hover:shadow-glow transition">
                    <p className="font-semibold">{rc.title}</p>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{rc.tagline}</p>
                  </Link>
                );
              })}
            </div>
          </Panel>
        )}
      </div>
    </div>
  );
}

function Metric({ icon: Icon, label, value }: any) {
  return (
    <div className="rounded-2xl bg-white/15 backdrop-blur px-4 py-3">
      <div className="flex items-center gap-1.5 text-xs text-white/80"><Icon className="h-3 w-3" />{label}</div>
      <p className="font-semibold mt-1 text-sm">{value}</p>
    </div>
  );
}
function Panel({ title, icon: Icon, children }: any) {
  return (
    <div className="rounded-2xl p-6 bg-card border border-border shadow-card">
      <div className="flex items-center gap-2 mb-4">
        <div className="h-8 w-8 rounded-xl bg-gradient-primary grid place-items-center text-white"><Icon className="h-4 w-4" /></div>
        <h3 className="font-semibold">{title}</h3>
      </div>
      {children}
    </div>
  );
}

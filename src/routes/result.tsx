import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Award, Briefcase, Download, GraduationCap, History as HistoryIcon, Map, RotateCw, Rocket, Share2, Sparkles, TrendingUp, ChevronRight, Building2 } from "lucide-react";
import { useEffect, useState } from "react";
import { downloadCareerReport } from "@/lib/pdf-report";
import { toast } from "sonner";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { journey, type Prediction } from "@/lib/journey-store";
import { mockResult } from "@/lib/mock-data";

export const Route = createFileRoute("/result")({
  head: () => ({
    meta: [
      { title: "Your AI Career Result — AI Career Guide" },
      { name: "description", content: "Your personalized career prediction with match score, strengths and roadmap." },
      { property: "og:title", content: "Your AI Career Result" },
      { property: "og:description", content: "Your personalized career prediction." },
    ],
  }),
  component: Result,
});

const COLORS = ["#4F46E5", "#7C3AED", "#06B6D4", "#10B981", "#F59E0B", "#EF4444"];

function Result() {
  const [prediction, setPrediction] = useState<Prediction | null>(null);
  useEffect(() => { setPrediction(journey.getPrediction()); }, []);

  const p = prediction;
  const title = p?.careerTitle ?? mockResult.title;
  const slug = p?.careerSlug ?? "software-engineer";
  const match = p?.match ?? mockResult.match;
  const confidence = p?.confidence ?? mockResult.confidence;
  const strengths = p?.strengths ?? mockResult.strengths;
  const weaknesses = p?.weaknesses ?? mockResult.weakAreas;

  const skillData = [
    { name: "Interest Score", value: p?.interestScore ?? 80 },
    { name: "Skill Score", value: p?.skillScore ?? 78 },
    { name: "Career Fit", value: match },
  ];

  const share = async (platform: "whatsapp" | "linkedin" | "email" | "copy") => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    const text = `I just discovered my ideal career: ${title} (${match}% match) via AI Career Guide!`;
    if (platform === "whatsapp") window.open(`https://wa.me/?text=${encodeURIComponent(text + " " + url)}`, "_blank");
    else if (platform === "linkedin") window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, "_blank");
    else if (platform === "email") window.open(`mailto:?subject=${encodeURIComponent("My AI Career Result")}&body=${encodeURIComponent(text + " " + url)}`);
    else { await navigator.clipboard.writeText(url); toast.success("Link copied"); }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl p-8 sm:p-10 bg-gradient-hero text-white shadow-glow relative overflow-hidden"
        >
          <div className="absolute inset-0 opacity-20 [background:radial-gradient(circle_at_20%_20%,white,transparent_40%),radial-gradient(circle_at_80%_60%,white,transparent_40%)]" />
          <div className="relative text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur text-xs font-medium mb-4">
              <Sparkles className="h-3 w-3" /> Your AI Prediction
            </div>
            <p className="text-white/85">Your best-fit career is</p>
            <h1 className="font-display text-4xl sm:text-6xl font-bold mt-2">{title}</h1>
            <div className="mt-6 grid sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
              <Metric label="Career Match" value={`${match}%`} />
              <Metric label="AI Confidence" value={`${confidence}%`} />
              <Metric label="Industry Demand" value="Very High" />
            </div>

            <div className="mt-6 flex flex-wrap justify-center gap-2">
              <button onClick={() => downloadCareerReport({ ...mockResult, title, match, confidence, strengths, weakAreas: weaknesses })} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white text-primary font-semibold text-sm hover:scale-105 transition">
                <Download className="h-4 w-4" /> Download PDF Report
              </button>
              <button onClick={() => share("whatsapp")} className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-white/20 hover:bg-white/30 text-sm font-medium"><Share2 className="h-4 w-4" />WhatsApp</button>
              <button onClick={() => share("linkedin")} className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-white/20 hover:bg-white/30 text-sm font-medium">LinkedIn</button>
              <button onClick={() => share("email")} className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-white/20 hover:bg-white/30 text-sm font-medium">Email</button>
              <button onClick={() => share("copy")} className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-white/20 hover:bg-white/30 text-sm font-medium">Copy Link</button>
            </div>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-4">
          <Panel title="Score breakdown" icon={Award}>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={skillData} dataKey="value" nameKey="name" innerRadius={50} outerRadius={80} paddingAngle={2}>
                    {skillData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                  </Pie>
                  <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12 }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-wrap gap-3 mt-2 text-xs">
              {skillData.map((s, i) => (
                <span key={s.name} className="inline-flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ background: COLORS[i] }} />{s.name}: <strong>{s.value}%</strong>
                </span>
              ))}
            </div>
          </Panel>

          <Panel title="Top companies hiring" icon={Building2}>
            <div className="grid grid-cols-2 gap-2 text-sm">
              {["Google", "Microsoft", "Amazon", "Meta", "Flipkart", "Razorpay"].map(c => (
                <div key={c} className="rounded-xl p-3 bg-muted/60 font-medium">{c}</div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-3">Estimated salary range: <strong>₹6 – 28 LPA</strong> across product & startup roles.</p>
          </Panel>

          <Panel title="Your Strengths" icon={TrendingUp}>
            <div className="space-y-3">
              {strengths.map((s, i) => (
                <div key={s}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium">{s}</span>
                    <span className="text-success">{Math.max(65, 92 - i * 5)}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-muted overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }} animate={{ width: `${Math.max(65, 92 - i * 5)}%` }} transition={{ duration: 0.8, delay: i * 0.1 }}
                      className="h-full rounded-full bg-success"
                    />
                  </div>
                </div>
              ))}
            </div>
          </Panel>

          <Panel title="Areas to Improve" icon={RotateCw}>
            <div className="space-y-3">
              {weaknesses.map((s, i) => (
                <div key={s}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium">{s}</span>
                    <span className="text-warning">{Math.max(30, 55 - i * 6)}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-muted overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }} animate={{ width: `${Math.max(30, 55 - i * 6)}%` }} transition={{ duration: 0.8, delay: i * 0.1 }}
                      className="h-full rounded-full bg-warning"
                    />
                  </div>
                </div>
              ))}
            </div>
          </Panel>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          <Action to="/roadmap" icon={Map} label="Start Learning Roadmap" />
          <Link to="/careers/$slug" params={{ slug }} className="rounded-2xl p-5 border border-border bg-card shadow-card hover:-translate-y-1 hover:shadow-glow transition flex items-center gap-3">
            <div className="h-11 w-11 rounded-xl bg-gradient-primary grid place-items-center text-white"><ChevronRight className="h-5 w-5" /></div>
            <span className="font-semibold">Full Career Profile</span>
          </Link>
          <Action to="/courses" icon={GraduationCap} label="Recommended Courses" />
          <Action to="/jobs" icon={Briefcase} label="Job Openings" />
          <Action to="/internships" icon={Rocket} label="Internships" />
          <Action to="/history" icon={HistoryIcon} label="Prediction History" />
        </div>

        <div className="text-center pt-2">
          <Link to="/dashboard" className="text-sm text-primary hover:underline">← Back to dashboard</Link>
        </div>
      </div>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-white/15 backdrop-blur px-4 py-4">
      <p className="text-xs text-white/80">{label}</p>
      <p className="font-display text-2xl font-bold mt-1">{value}</p>
    </div>
  );
}
function Panel({ title, icon: Icon, children }: any) {
  return (
    <div className="rounded-2xl p-6 bg-card border border-border shadow-card">
      <div className="flex items-center gap-2 mb-3">
        <div className="h-8 w-8 rounded-xl bg-gradient-primary grid place-items-center text-white"><Icon className="h-4 w-4" /></div>
        <h3 className="font-semibold">{title}</h3>
      </div>
      {children}
    </div>
  );
}
function Action({ to, icon: Icon, label }: any) {
  return (
    <Link to={to} className="rounded-2xl p-5 border border-border bg-card shadow-card hover:-translate-y-1 hover:shadow-glow transition flex items-center gap-3">
      <div className="h-11 w-11 rounded-xl bg-gradient-primary grid place-items-center text-white"><Icon className="h-5 w-5" /></div>
      <span className="font-semibold">{label}</span>
    </Link>
  );
}

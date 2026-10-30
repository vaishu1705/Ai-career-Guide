import jsPDF from "jspdf";
import type { mockResult } from "./mock-data";
import { journey } from "./journey-store";
import { careerReadiness, getStreak, computeBadges } from "./gamification";
import { roadmapFor } from "./roadmaps";
import { jobs } from "./mock-data";

type Result = typeof mockResult;

export function downloadCareerReport(r: Result, user = "Student") {
  const pdf = new jsPDF({ unit: "pt", format: "a4" });
  const w = pdf.internal.pageSize.getWidth();
  const h = pdf.internal.pageSize.getHeight();
  let y = 60;

  const profile = journey.getProfile();
  const prediction = journey.getPrediction();
  const readiness = careerReadiness();
  const streak = getStreak();
  const progress = journey.getProgress();
  const badges = computeBadges().filter(b => b.earned);
  const roadmap = roadmapFor(prediction?.careerSlug ?? "software-engineer");
  const certs = Object.values(progress).filter(p => p.certificateId);

  const ensure = (need = 60) => {
    if (y + need > h - 40) { pdf.addPage(); y = 60; }
  };
  const section = (t: string) => {
    ensure(40); y += 6; pdf.setFont("helvetica", "bold"); pdf.setFontSize(14); pdf.setTextColor(79, 70, 229);
    pdf.text(t, 40, y); y += 6; pdf.setDrawColor(79, 70, 229); pdf.setLineWidth(1); pdf.line(40, y, w - 40, y);
    y += 16; pdf.setTextColor(20); pdf.setFont("helvetica", "normal"); pdf.setFontSize(11);
  };
  const line = (label: string, value: string) => {
    ensure(18);
    pdf.setFont("helvetica", "bold"); pdf.text(`${label}:`, 40, y);
    pdf.setFont("helvetica", "normal");
    const wrapped = pdf.splitTextToSize(value, w - 180);
    pdf.text(wrapped, 160, y);
    y += Math.max(16, wrapped.length * 14);
  };
  const bullets = (items: string[]) => {
    items.forEach(s => { ensure(16); const wrap = pdf.splitTextToSize(`•  ${s}`, w - 80); pdf.text(wrap, 50, y); y += wrap.length * 14; });
    y += 4;
  };

  // Header
  pdf.setFillColor(79, 70, 229); pdf.rect(0, 0, w, 90, "F");
  pdf.setTextColor(255); pdf.setFont("helvetica", "bold"); pdf.setFontSize(22);
  pdf.text("AI Career Guide — Complete Report", 40, 55);
  pdf.setFontSize(11); pdf.setFont("helvetica", "normal");
  pdf.text(`Generated ${new Date().toLocaleDateString()}`, 40, 75);

  pdf.setTextColor(20); y = 120;

  section("Student Details");
  line("Name", profile.name || user);
  line("Email", profile.email || "—");
  line("College", profile.college || "—");
  line("Branch / Year", `${profile.branch || "—"} · ${profile.year || "—"}`);
  line("CGPA", profile.cgpa || "—");
  line("Career Goal", profile.goal || r.title);

  section("Interest Analysis");
  const interests = journey.getInterests();
  if (interests.length === 0) pdf.text("No interests recorded yet.", 40, y), y += 16;
  else bullets(interests.map(i => `${i.key} — ${i.rating}/5 comfort`));

  section("Skill Scores");
  line("Assessment score", `${prediction?.skillScore ?? r.confidence}%`);
  line("Interest score", `${prediction?.interestScore ?? 80}%`);
  line("AI confidence", `${prediction?.confidence ?? r.confidence}%`);
  bullets((prediction?.strengths ?? r.strengths).map(s => `Strength: ${s}`));
  bullets((prediction?.weaknesses ?? r.weakAreas).map(s => `Improve: ${s}`));

  section("Career Prediction");
  line("Best-fit career", prediction?.careerTitle ?? r.title);
  line("Match", `${prediction?.match ?? r.match}%`);
  line("Salary range", r.salary);
  line("Demand", r.demand);
  line("Future scope", r.scope);

  section("Learning Progress");
  line("Modules touched", `${Object.keys(progress).length} / ${roadmap.length}`);
  line("Daily streak", `${streak.current} days (longest ${streak.longest})`);
  const modulesLine = roadmap.map(m => {
    const p = progress[m.id];
    const status = p?.certificateId ? "✓ certified" : p?.quizScore != null ? `quiz ${p.quizScore}%` : p?.classDone ? "in progress" : "not started";
    return `${m.title} — ${status}`;
  });
  bullets(modulesLine);

  section("Certificates Earned");
  if (certs.length === 0) pdf.text("None yet — complete a quiz with 70%+ to earn one.", 40, y), y += 16;
  else bullets(certs.map(c => {
    const mod = roadmap.find(m => m.id === c.moduleId);
    return `${mod?.title ?? c.moduleId} — ID ${c.certificateId}`;
  }));

  section("Career Readiness");
  line("Overall readiness", `${readiness.pct}%`);
  bullets(readiness.skills.map(s => `${s.have ? "✓" : "✗"} ${s.name}`));
  if (readiness.missing.length) {
    y += 4; pdf.setFont("helvetica", "bold"); pdf.text("Recommended learning order:", 40, y); y += 16;
    pdf.setFont("helvetica", "normal");
    bullets(readiness.missing.map((s, i) => `${i + 1}. ${s}`));
  }

  section("Achievement Badges");
  if (badges.length === 0) pdf.text("Complete milestones to earn your first badge.", 40, y), y += 16;
  else bullets(badges.map(b => `${b.label} — ${b.description}`));

  section("Recommended Jobs");
  bullets(jobs.slice(0, 5).map(j => `${j.role} at ${j.company} — ${j.location} · ${j.salary}`));

  // Footer on every page
  const pages = pdf.getNumberOfPages();
  for (let i = 1; i <= pages; i++) {
    pdf.setPage(i);
    pdf.setFontSize(9); pdf.setTextColor(120);
    pdf.text(`Generated by AI Career Guide · Page ${i} of ${pages}`, 40, h - 24);
  }

  pdf.save(`career-report-${(profile.name || user).toLowerCase().replace(/\s+/g, "-")}.pdf`);
}

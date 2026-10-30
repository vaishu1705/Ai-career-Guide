// Gamification, weekly goals, streaks, badges, module feedback — localStorage backed.
import { journey } from "./journey-store";

const K = {
  streak: "acg.streak",
  weekly: "acg.weekly",
  feedback: "acg.feedback",
  badges: "acg.badges",
};

function read<T>(k: string, f: T): T {
  if (typeof window === "undefined") return f;
  try { const v = localStorage.getItem(k); return v ? JSON.parse(v) as T : f; } catch { return f; }
}
function write<T>(k: string, v: T) {
  if (typeof window === "undefined") return;
  try { localStorage.setItem(k, JSON.stringify(v)); } catch {}
}

export interface StreakData { current: number; longest: number; lastDay: string | null; }
export function getStreak(): StreakData {
  return read<StreakData>(K.streak, { current: 12, longest: 18, lastDay: null });
}
export function pingStreak() {
  const s = getStreak();
  const today = new Date().toISOString().slice(0, 10);
  if (s.lastDay === today) return s;
  const y = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
  const next: StreakData = {
    current: s.lastDay === y ? s.current + 1 : (s.lastDay == null ? s.current : 1),
    longest: 0, lastDay: today,
  };
  next.longest = Math.max(next.current, s.longest);
  write(K.streak, next);
  return next;
}

export interface WeeklyGoals {
  weekStart: string;
  classes: { done: number; target: number };
  quizzes: { done: number; target: number };
  projects: { done: number; target: number };
}
function weekStart() {
  const d = new Date(); const day = d.getDay(); const diff = d.getDate() - day + (day === 0 ? -6 : 1);
  return new Date(d.setDate(diff)).toISOString().slice(0, 10);
}
export function getWeeklyGoals(): WeeklyGoals {
  const cur = read<WeeklyGoals | null>(K.weekly, null);
  const ws = weekStart();
  if (!cur || cur.weekStart !== ws) {
    const fresh: WeeklyGoals = {
      weekStart: ws,
      classes: { done: 2, target: 3 },
      quizzes: { done: 0, target: 1 },
      projects: { done: 0, target: 1 },
    };
    write(K.weekly, fresh);
    return fresh;
  }
  return cur;
}
export function bumpWeekly(k: "classes" | "quizzes" | "projects") {
  const g = getWeeklyGoals();
  g[k].done = Math.min(g[k].target, g[k].done + 1);
  write(K.weekly, g);
  return g;
}
export function weeklyProgressPct(g = getWeeklyGoals()) {
  const total = g.classes.target + g.quizzes.target + g.projects.target;
  const done = g.classes.done + g.quizzes.done + g.projects.done;
  return total === 0 ? 0 : Math.round((done / total) * 100);
}

export interface ModuleFeedback { moduleId: string; rating: number; useful: boolean; at: string; }
export function saveFeedback(f: ModuleFeedback) {
  const all = read<ModuleFeedback[]>(K.feedback, []);
  const next = [f, ...all.filter(x => x.moduleId !== f.moduleId)];
  write(K.feedback, next);
}
export function getFeedback(id: string) {
  return read<ModuleFeedback[]>(K.feedback, []).find(f => f.moduleId === id);
}

export interface Badge { id: string; label: string; description: string; icon: string; earned: boolean; }
export function computeBadges(): Badge[] {
  const progress = journey.getProgress();
  const values = Object.values(progress);
  const prediction = journey.getPrediction();
  const certs = values.filter(v => v.certificateId).length;
  const quizzes90 = values.filter(v => (v.quizScore ?? 0) >= 90).length;
  const projects = values.filter(v => v.projectDone).length;
  const streak = getStreak();

  return [
    { id: "first-assess", label: "First Assessment", description: "Complete your first career assessment", icon: "ClipboardCheck", earned: !!prediction },
    { id: "first-cert",   label: "First Certificate",  description: "Earn your first module certificate",       icon: "Award",          earned: certs >= 1 },
    { id: "quiz-master",  label: "Quiz Master",        description: "Score 90%+ on 3 quizzes",                  icon: "GraduationCap",  earned: quizzes90 >= 3 },
    { id: "project-x",    label: "Project Expert",     description: "Complete 3 mini projects",                 icon: "Rocket",         earned: projects >= 3 },
    { id: "streak-30",    label: "30-Day Learner",     description: "Maintain a 30 day learning streak",        icon: "Flame",          earned: streak.longest >= 30 },
    { id: "roadmap-star", label: "Roadmap Rockstar",   description: "Complete 5 modules end to end",            icon: "Star",           earned: values.filter(v => v.classDone && v.notesDone && v.taskDone && v.projectDone && (v.quizScore ?? 0) >= 70).length >= 5 },
  ];
}

export function careerReadiness(): { pct: number; skills: { name: string; have: boolean }[]; missing: string[]; order: string[] } {
  const pred = journey.getPrediction();
  const answers = journey.getAnswers();
  const topics = new Map<string, { total: number; correct: number }>();
  answers.forEach(a => {
    const t = topics.get(a.topic) ?? { total: 0, correct: 0 };
    t.total++; if (a.correct) t.correct++;
    topics.set(a.topic, t);
  });
  // Required skills per career (small map)
  const map: Record<string, string[]> = {
    "software-engineer": ["Programming", "Data Structures", "Git", "Databases", "System Design"],
    "data-scientist":    ["Python", "SQL", "Statistics", "Machine Learning", "Data Visualization"],
    "ml-engineer":       ["Python", "Machine Learning", "Deep Learning", "MLOps", "Cloud"],
    "web-developer":     ["HTML/CSS", "JavaScript", "React", "APIs", "Testing"],
    "data-analyst":      ["SQL", "Excel", "Python", "Tableau", "Storytelling"],
    "designer":          ["Figma", "Interaction Design", "User Research", "Design Systems", "Prototyping"],
  };
  const req = map[pred?.careerSlug ?? "software-engineer"] ?? map["software-engineer"];
  const skills = req.map(name => {
    // Very simple heuristic: mark "have" if user answered any topic containing the keyword correctly.
    const key = name.toLowerCase().split(/\s|\//)[0];
    const found = Array.from(topics.entries()).find(([t]) => t.toLowerCase().includes(key));
    const have = !!found && found[1].correct / Math.max(1, found[1].total) >= 0.5;
    return { name, have };
  });
  const missing = skills.filter(s => !s.have).map(s => s.name);
  const pct = Math.round((skills.filter(s => s.have).length / skills.length) * 100);
  return { pct, skills, missing, order: missing };
}

// Leaderboard demo data blended with the current user's real numbers.
export interface LeaderRow { rank: number; name: string; you?: boolean; xp: number; certs: number; avgQuiz: number; }
export function getLeaderboard(): LeaderRow[] {
  const progress = journey.getProgress();
  const values = Object.values(progress);
  const yourCerts = values.filter(v => v.certificateId).length;
  const scores = values.map(v => v.quizScore ?? 0).filter(Boolean);
  const yourAvg = scores.length ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0;
  const yourXp = yourCerts * 500 + yourAvg * 4 + values.length * 40;

  const others: LeaderRow[] = [
    { rank: 0, name: "Aditi Sharma",   xp: 4820, certs: 8, avgQuiz: 92 },
    { rank: 0, name: "Rahul Verma",    xp: 4310, certs: 7, avgQuiz: 88 },
    { rank: 0, name: "Priya Nair",     xp: 3980, certs: 6, avgQuiz: 90 },
    { rank: 0, name: "Karthik Iyer",   xp: 3520, certs: 6, avgQuiz: 82 },
    { rank: 0, name: "Neha Kapoor",    xp: 3110, certs: 5, avgQuiz: 84 },
    { rank: 0, name: "Arjun Mehta",    xp: 2870, certs: 4, avgQuiz: 79 },
    { rank: 0, name: "Sana Ali",       xp: 2540, certs: 4, avgQuiz: 81 },
    { rank: 0, name: "Ishaan Rao",     xp: 2140, certs: 3, avgQuiz: 75 },
    { rank: 0, name: "You",            you: true, xp: yourXp, certs: yourCerts, avgQuiz: yourAvg },
  ];
  return others.sort((a, b) => b.xp - a.xp).map((r, i) => ({ ...r, rank: i + 1 }));
}

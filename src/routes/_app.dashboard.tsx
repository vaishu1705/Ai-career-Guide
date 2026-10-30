import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ClipboardList,
  TrendingUp,
  Target,
  Award,
  Sparkles,
  ArrowRight,
  Flame,
  Rocket,
  GraduationCap,
  Star,
  ClipboardCheck,
  BookOpen,
  PlayCircle,
} from "lucide-react";
import {
  RadarChart,
  Radar,
  PolarAngleAxis,
  PolarGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { useEffect, useState } from "react";

import { skillGraph, careerStats, history } from "@/lib/mock-data";

import {
  getStreak,
  pingStreak,
  getWeeklyGoals,
  weeklyProgressPct,
  computeBadges,
  careerReadiness,
} from "@/lib/gamification";

import { journey } from "@/lib/journey-store";
import { roadmapFor } from "@/lib/roadmaps";
import { request } from "@/lib/api";

export const Route = createFileRoute("/_app/dashboard")({
  component: Dashboard,
});

const COLORS = [
  "#6D28D9",
  "#8B5CF6",
  "#C026D3",
  "#A855F7",
  "#4C1D95",
];

const ICONS: Record<string, any> = {
  ClipboardCheck,
  Award,
  GraduationCap,
  Rocket,
  Flame,
  Star,
};

function Stat({ icon: Icon, label, value, tint }: any) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="rounded-2xl p-5 glass shadow-card hover:shadow-glow transition"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">{label}</p>
          <p className="mt-1 font-display text-2xl font-bold">
            {value}
          </p>
        </div>

        <div
          className={`grid h-11 w-11 place-items-center rounded-xl ${tint} shadow-soft`}
        >
          <Icon className="h-5 w-5 text-white" />
        </div>
      </div>
    </motion.div>
  );
}

function Dashboard() {
  const [userName, setUserName] = useState("User");

  const [streak, setStreak] = useState(getStreak());
  const [goals, setGoals] = useState(getWeeklyGoals());

  const badges = computeBadges();
  const readiness = careerReadiness();

  const prediction = journey.getPrediction();
  const progress = journey.getProgress();

  const roadmap = roadmapFor(
    prediction?.careerSlug ?? "software-engineer"
  );

  const upcomingModule = roadmap.find((m) => {
    const p = progress[m.id];
    return !p || (p.quizScore ?? 0) < 70;
  });

  const recentDone = Object.values(progress)
    .filter((p) => p.classDone)
    .slice(0, 3);

  useEffect(() => {
    setStreak(pingStreak());
    setGoals(getWeeklyGoals());

    const loadUser = async () => {
      try {
        const data = await request<any>("get", "/auth/me");

        /*
         * Depending on the backend response, the user may be
         * returned as data.user or directly as data.
         */
        const user = data?.user ?? data;

        if (user?.name) {
          setUserName(user.name);

          // Keep local profile synchronized
          localStorage.setItem(
            "acg.profile",
            JSON.stringify({
              name: user.name,
              email: user.email,
            })
          );

          return;
        }

        // If backend did not return a name, use local profile
        const profile = journey.getProfile();

        if (profile?.name) {
          setUserName(profile.name);
        }
      } catch (error) {
        console.error("Failed to load current user:", error);

        // Fallback to locally stored profile
        try {
          const savedProfile = localStorage.getItem("acg.profile");

          if (savedProfile) {
            const profile = JSON.parse(savedProfile);

            if (profile?.name) {
              setUserName(profile.name);
              return;
            }
          }
        } catch (profileError) {
          console.error(
            "Failed to read saved profile:",
            profileError
          );
        }

        // Final fallback to journey profile
        const profile = journey.getProfile();

        if (profile?.name) {
          setUserName(profile.name);
        }
      }
    };

    loadUser();
  }, []);

  const weeklyPct = weeklyProgressPct(goals);
  const earnedBadges = badges.filter((b) => b.earned);

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div className="rounded-3xl p-6 sm:p-8 bg-gradient-hero text-white shadow-glow relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 [background:radial-gradient(circle_at_20%_20%,white,transparent_40%),radial-gradient(circle_at_80%_60%,white,transparent_40%)]" />

        <div className="relative grid md:grid-cols-[1fr_auto] gap-4 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur text-xs font-medium mb-3">
              <Sparkles className="h-3 w-3" />
              AI Insights ready
            </div>

            <h1 className="font-display text-2xl sm:text-3xl font-bold">
              Welcome back, {userName} 👋
            </h1>

            <p className="mt-1 text-white/85">
              Your career recommendation is{" "}
              <strong>
                {prediction?.careerTitle ?? "Software Engineer"}
              </strong>{" "}
              with {prediction?.match ?? 92}% match.
            </p>
          </div>

          <Link
            to="/assessment"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white text-primary font-semibold shadow-lg hover:scale-105 transition"
          >
            New Assessment
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Stat
          icon={ClipboardList}
          label="Assessment Score"
          value={`${prediction?.skillScore ?? 88}%`}
          tint="bg-primary"
        />

        <Stat
          icon={Target}
          label="Career Readiness"
          value={`${readiness.pct}%`}
          tint="bg-secondary"
        />

        <Stat
          icon={TrendingUp}
          label="Learning Progress"
          value={`${weeklyPct}%`}
          tint="bg-accent"
        />

        <Stat
          icon={Award}
          label="Certificates"
          value={
            Object.values(progress).filter(
              (p) => p.certificateId
            ).length
          }
          tint="bg-gradient-primary"
        />
      </div>

      {/* Streak + Weekly goals + Upcoming */}
      <div className="grid lg:grid-cols-3 gap-4">
        {/* Daily Streak */}
        <div className="rounded-2xl p-5 bg-gradient-to-br from-orange-500 to-rose-500 text-white shadow-glow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">
                Daily Streak
              </p>

              <p className="font-display text-4xl font-bold">
                {streak.current} days
              </p>

              <p className="text-xs opacity-80 mt-1">
                Longest: {streak.longest} days
              </p>
            </div>

            <Flame className="h-12 w-12 opacity-90" />
          </div>

          <p className="mt-3 text-sm">
            🔥 Keep learning to protect your streak
          </p>
        </div>

        {/* Weekly Goals */}
        <div className="rounded-2xl p-5 glass shadow-card">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">
              Weekly Learning Goals
            </h3>

            <span className="text-2xl font-display font-bold text-primary">
              {weeklyPct}%
            </span>
          </div>

          <div className="mt-3 h-2 rounded-full bg-muted overflow-hidden">
            <div
              className="h-full bg-gradient-primary transition-all"
              style={{ width: `${weeklyPct}%` }}
            />
          </div>

          <ul className="mt-4 space-y-2 text-sm">
            <GoalRow
              icon={PlayCircle}
              label="Complete 3 classes"
              done={goals.classes.done}
              target={goals.classes.target}
            />

            <GoalRow
              icon={GraduationCap}
              label="Finish 1 quiz"
              done={goals.quizzes.done}
              target={goals.quizzes.target}
            />

            <GoalRow
              icon={Rocket}
              label="Submit 1 project"
              done={goals.projects.done}
              target={goals.projects.target}
            />
          </ul>
        </div>

        {/* Upcoming Quiz */}
        <div className="rounded-2xl p-5 glass shadow-card">
          <h3 className="font-semibold flex items-center gap-2">
            <ClipboardCheck className="h-4 w-4 text-primary" />
            Upcoming Quiz
          </h3>

          {upcomingModule ? (
            <div className="mt-3">
              <p className="font-medium">
                {upcomingModule.title}
              </p>

              <p className="text-xs text-muted-foreground">
                {upcomingModule.level} ·{" "}
                {upcomingModule.duration}
              </p>

              <Link
                to="/learn/$moduleId"
                params={{ moduleId: upcomingModule.id }}
                className="mt-4 inline-flex px-4 h-10 items-center rounded-xl bg-gradient-primary text-primary-foreground font-semibold shadow-soft"
              >
                Continue module
                <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
          ) : (
            <p className="mt-3 text-sm text-muted-foreground">
              All modules complete — great work!
            </p>
          )}
        </div>
      </div>

      {/* Badges */}
      <div className="rounded-2xl p-5 glass shadow-card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold flex items-center gap-2">
            <Award className="h-4 w-4 text-warning" />
            Achievement Badges
          </h3>

          <span className="text-xs text-muted-foreground">
            {earnedBadges.length} / {badges.length} earned
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {badges.map((b) => {
            const Icon = ICONS[b.icon] ?? Award;

            return (
              <div
                key={b.id}
                title={b.description}
                className={`rounded-xl p-3 text-center border transition ${
                  b.earned
                    ? "bg-gradient-primary text-primary-foreground border-transparent shadow-soft"
                    : "bg-muted/40 border-border opacity-60"
                }`}
              >
                <Icon className="h-6 w-6 mx-auto" />

                <p className="mt-1.5 text-xs font-semibold leading-tight">
                  {b.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-3 gap-4">
        {/* Skill Graph */}
        <div className="lg:col-span-2 rounded-2xl p-5 glass shadow-card">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold">
              Skill Graph
            </h3>

            <span className="text-xs text-muted-foreground">
              Latest assessment
            </span>
          </div>

          <div className="h-72">
            <ResponsiveContainer
              width="100%"
              height="100%"
            >
              <RadarChart data={skillGraph}>
                <PolarGrid
                  stroke="var(--color-border)"
                />

                <PolarAngleAxis
                  dataKey="skill"
                  tick={{
                    fill: "var(--color-muted-foreground)",
                    fontSize: 12,
                  }}
                />

                <Radar
                  dataKey="value"
                  stroke="#6D28D9"
                  fill="#8B5CF6"
                  fillOpacity={0.35}
                />

                <Tooltip
                  contentStyle={{
                    background: "var(--color-card)",
                    border:
                      "1px solid var(--color-border)",
                    borderRadius: 12,
                  }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Career Statistics */}
        <div className="rounded-2xl p-5 glass shadow-card">
          <h3 className="font-semibold mb-2">
            Career Statistics
          </h3>

          <div className="h-72">
            <ResponsiveContainer
              width="100%"
              height="100%"
            >
              <PieChart>
                <Pie
                  data={careerStats}
                  dataKey="value"
                  innerRadius={50}
                  outerRadius={90}
                  paddingAngle={4}
                >
                  {careerStats.map((_, i) => (
                    <Cell
                      key={i}
                      fill={
                        COLORS[i % COLORS.length]
                      }
                    />
                  ))}
                </Pie>

                <Tooltip
                  contentStyle={{
                    background: "var(--color-card)",
                    border:
                      "1px solid var(--color-border)",
                    borderRadius: 12,
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-2 grid grid-cols-2 gap-1 text-xs">
            {careerStats.map((c, i) => (
              <div
                key={c.name}
                className="flex items-center gap-2"
              >
                <span
                  className="h-2 w-2 rounded-full"
                  style={{
                    background:
                      COLORS[i % COLORS.length],
                  }}
                />

                <span className="text-muted-foreground">
                  {c.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom section */}
      <div className="grid lg:grid-cols-2 gap-4">
        {/* Prediction Accuracy */}
        <div className="rounded-2xl p-5 glass shadow-card">
          <h3 className="font-semibold mb-2">
            Prediction Accuracy over Time
          </h3>

          <div className="h-64">
            <ResponsiveContainer
              width="100%"
              height="100%"
            >
              <BarChart data={history}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="var(--color-border)"
                />

                <XAxis
                  dataKey="date"
                  tick={{
                    fill:
                      "var(--color-muted-foreground)",
                    fontSize: 11,
                  }}
                />

                <YAxis
                  tick={{
                    fill:
                      "var(--color-muted-foreground)",
                    fontSize: 11,
                  }}
                />

                <Tooltip
                  contentStyle={{
                    background: "var(--color-card)",
                    border:
                      "1px solid var(--color-border)",
                    borderRadius: 12,
                  }}
                />

                <Bar
                  dataKey="confidence"
                  fill="#7C3AED"
                  radius={[8, 8, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recently Completed Classes */}
        <div className="rounded-2xl p-5 glass shadow-card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-primary" />
              Recently Completed Classes
            </h3>

            <Link
              to="/roadmap"
              className="text-sm text-primary hover:underline"
            >
              Roadmap
            </Link>
          </div>

          {recentDone.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No classes completed yet — jump into your
              first module.
            </p>
          ) : (
            <ul className="space-y-3">
              {recentDone.map((p) => {
                const mod = roadmap.find(
                  (m) => m.id === p.moduleId
                );

                return (
                  <li
                    key={p.moduleId}
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted/60 transition"
                  >
                    <div className="h-10 w-10 rounded-xl bg-gradient-primary grid place-items-center text-white">
                      <PlayCircle className="h-4 w-4" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="font-medium truncate">
                        {mod?.title ?? p.moduleId}
                      </p>

                      <p className="text-xs text-muted-foreground">
                        {p.certificateId
                          ? "Certified"
                          : p.quizScore != null
                          ? `Quiz ${p.quizScore}%`
                          : "In progress"}
                      </p>
                    </div>

                    <Link
                      to="/learn/$moduleId"
                      params={{
                        moduleId: p.moduleId,
                      }}
                      className="text-sm text-primary"
                    >
                      Open
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

function GoalRow({
  icon: Icon,
  label,
  done,
  target,
}: {
  icon: any;
  label: string;
  done: number;
  target: number;
}) {
  const complete = done >= target;

  return (
    <li
      className={`flex items-center gap-3 ${
        complete ? "text-success" : ""
      }`}
    >
      <Icon className="h-4 w-4" />

      <span className="flex-1">
        {label}
      </span>

      <span className="text-xs font-semibold">
        {done}/{target}
      </span>
    </li>
  );
}
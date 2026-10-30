import { createFileRoute } from "@tanstack/react-router";
import { Trophy, Award, Zap } from "lucide-react";
import { getLeaderboard } from "@/lib/gamification";

export const Route = createFileRoute("/_app/leaderboard")({
  component: Leaderboard,
});

function Leaderboard() {
  const rows = getLeaderboard();
  const top = rows.slice(0, 3);
  const rest = rows.slice(3);
  const medal = ["from-yellow-400 to-yellow-600", "from-slate-300 to-slate-500", "from-orange-400 to-orange-600"];

  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-display text-2xl font-bold flex items-center gap-2"><Trophy className="h-6 w-6 text-warning" /> Leaderboard</h1>
        <p className="text-muted-foreground">Compare your progress, quiz scores and certificates with peers.</p>
      </header>

      <div className="grid sm:grid-cols-3 gap-4">
        {top.map((r, i) => (
          <div key={r.name} className={`rounded-2xl p-5 text-white shadow-glow bg-gradient-to-br ${medal[i]} ${r.you ? "ring-4 ring-primary" : ""}`}>
            <div className="flex items-center justify-between">
              <span className="font-display text-3xl font-bold">#{r.rank}</span>
              <Trophy className="h-6 w-6 opacity-80" />
            </div>
            <p className="mt-3 font-semibold text-lg">{r.name}{r.you && " (you)"}</p>
            <div className="mt-2 text-sm opacity-90 flex flex-wrap gap-x-3 gap-y-1">
              <span className="inline-flex items-center gap-1"><Zap className="h-3.5 w-3.5" /> {r.xp} XP</span>
              <span className="inline-flex items-center gap-1"><Award className="h-3.5 w-3.5" /> {r.certs}</span>
              <span>Quiz {r.avgQuiz}%</span>
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-2xl overflow-hidden bg-card border border-border shadow-card">
        <div className="grid grid-cols-[60px_1fr_100px_100px_100px] px-4 py-3 text-xs uppercase tracking-wider text-muted-foreground bg-muted/40">
          <span>Rank</span><span>Student</span><span className="text-right">XP</span><span className="text-right">Certs</span><span className="text-right">Avg Quiz</span>
        </div>
        {rest.map(r => (
          <div key={r.name} className={`grid grid-cols-[60px_1fr_100px_100px_100px] px-4 py-3 items-center text-sm border-t border-border ${r.you ? "bg-primary/10 font-semibold" : ""}`}>
            <span>#{r.rank}</span>
            <span>{r.name}{r.you && " (you)"}</span>
            <span className="text-right">{r.xp}</span>
            <span className="text-right">{r.certs}</span>
            <span className="text-right">{r.avgQuiz}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

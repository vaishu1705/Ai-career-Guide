import { createFileRoute } from "@tanstack/react-router";
import { Search, Trash2, Eye } from "lucide-react";
import { useState } from "react";
import { history as seed } from "@/lib/mock-data";
import { toast } from "sonner";

export const Route = createFileRoute("/_app/history")({
  component: History,
});

function History() {
  const [rows, setRows] = useState(seed);
  const [q, setQ] = useState("");
  const filtered = rows.filter(r => r.career.toLowerCase().includes(q.toLowerCase()));

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-bold">Prediction History</h1>
          <p className="text-muted-foreground">All your AI predictions in one place.</p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            value={q} onChange={(e) => setQ(e.target.value)}
            placeholder="Search career…"
            className="h-10 pl-9 pr-3 rounded-xl bg-card border border-border outline-none focus:ring-2 focus:ring-primary/40"
          />
        </div>
      </header>

      <div className="rounded-2xl overflow-hidden bg-card border border-border shadow-card">
        <table className="w-full text-sm">
          <thead className="bg-muted/60">
            <tr className="text-left">
              {["Date", "Career", "Confidence", "Score", ""].map(h => (
                <th key={h} className="px-4 py-3 font-semibold text-muted-foreground">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map(r => (
              <tr key={r.id} className="border-t border-border hover:bg-muted/40 transition">
                <td className="px-4 py-3">{r.date}</td>
                <td className="px-4 py-3 font-medium">{r.career}</td>
                <td className="px-4 py-3">
                  <span className="inline-flex items-center gap-2">
                    <span className="h-1.5 w-16 rounded-full bg-muted overflow-hidden">
                      <span className="block h-full bg-gradient-primary" style={{ width: `${r.confidence}%` }} />
                    </span>
                    <span className="font-semibold text-primary">{r.confidence}%</span>
                  </span>
                </td>
                <td className="px-4 py-3">{r.score}%</td>
                <td className="px-4 py-3 text-right">
                  <button className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg hover:bg-primary/10 text-primary text-xs font-medium">
                    <Eye className="h-3.5 w-3.5" /> View
                  </button>
                  <button
                    onClick={() => { setRows(rs => rs.filter(x => x.id !== r.id)); toast.success("Deleted"); }}
                    className="ml-2 inline-flex items-center gap-1 px-3 py-1.5 rounded-lg hover:bg-destructive/10 text-destructive text-xs font-medium"
                  >
                    <Trash2 className="h-3.5 w-3.5" /> Delete
                  </button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan={5} className="text-center text-muted-foreground py-10">No predictions found.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>Showing {filtered.length} of {rows.length}</span>
        <div className="flex items-center gap-1">
          {["‹", "1", "2", "3", "›"].map(p => (
            <button key={p} className="h-9 w-9 rounded-lg border border-border hover:bg-muted">{p}</button>
          ))}
        </div>
      </div>
    </div>
  );
}

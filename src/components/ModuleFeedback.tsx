import { Star, ThumbsUp, ThumbsDown } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { getFeedback, saveFeedback } from "@/lib/gamification";

export function ModuleFeedback({ moduleId }: { moduleId: string }) {
  const [rating, setRating] = useState(0);
  const [useful, setUseful] = useState<boolean | null>(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const f = getFeedback(moduleId);
    if (f) { setRating(f.rating); setUseful(f.useful); setSubmitted(true); }
  }, [moduleId]);

  const submit = (r: number, u: boolean) => {
    saveFeedback({ moduleId, rating: r, useful: u, at: new Date().toISOString() });
    setSubmitted(true);
    toast.success("Thanks for the feedback!");
  };

  return (
    <div className="mt-6 rounded-2xl p-5 bg-card border border-border shadow-card">
      <p className="font-semibold">Was this module useful?</p>
      <p className="text-xs text-muted-foreground mt-0.5">Your feedback tunes future recommendations.</p>
      <div className="mt-3 flex items-center gap-1">
        {[1, 2, 3, 4, 5].map(n => (
          <button key={n} onClick={() => { setRating(n); if (useful != null) submit(n, useful); }} aria-label={`${n} stars`}>
            <Star className={`h-6 w-6 transition ${n <= rating ? "fill-warning text-warning" : "text-muted-foreground"}`} />
          </button>
        ))}
      </div>
      <div className="mt-3 flex gap-2">
        <button
          onClick={() => { setUseful(true); submit(rating || 5, true); }}
          className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border text-sm ${useful === true ? "border-success bg-success/10 text-success" : "border-border hover:bg-muted"}`}
        ><ThumbsUp className="h-4 w-4" /> Yes</button>
        <button
          onClick={() => { setUseful(false); submit(rating || 2, false); }}
          className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border text-sm ${useful === false ? "border-destructive bg-destructive/10 text-destructive" : "border-border hover:bg-muted"}`}
        ><ThumbsDown className="h-4 w-4" /> No</button>
      </div>
      {submitted && <p className="mt-2 text-xs text-muted-foreground">Saved — you can update this any time.</p>}
    </div>
  );
}

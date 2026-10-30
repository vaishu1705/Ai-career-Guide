import { createFileRoute } from "@tanstack/react-router";
import { MapPin, Clock, IndianRupee } from "lucide-react";
import { internships } from "@/lib/mock-data";
import { toast } from "sonner";
import { BookmarkButton } from "@/components/BookmarkButton";

export const Route = createFileRoute("/_app/internships")({
  component: Internships,
});

function Internships() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-display text-2xl font-bold">Internships</h1>
        <p className="text-muted-foreground">Kickstart your career with hands-on experience.</p>
      </header>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {internships.map(i => (
          <div key={i.id} className="rounded-2xl p-5 bg-card border border-border shadow-card hover:-translate-y-1 hover:shadow-glow transition">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <div className="h-12 w-12 rounded-xl bg-gradient-primary grid place-items-center text-white font-bold shrink-0">{i.company[0]}</div>
                <div className="min-w-0">
                  <p className="font-semibold truncate">{i.company}</p>
                  <p className="text-sm text-muted-foreground truncate">{i.role}</p>
                </div>
              </div>
              <BookmarkButton id={`int-${i.id}`} kind="internship" label="internship" />
            </div>
            <div className="mt-4 space-y-1.5 text-sm text-muted-foreground">
              <p className="inline-flex items-center gap-2"><Clock className="h-3.5 w-3.5" />{i.duration}</p>
              <p className="inline-flex items-center gap-2"><MapPin className="h-3.5 w-3.5" />{i.location}</p>
              <p className="inline-flex items-center gap-2 text-success font-semibold"><IndianRupee className="h-3.5 w-3.5" />{i.stipend}</p>
            </div>
            <button onClick={() => toast.success("Application started")} className="mt-4 w-full h-10 rounded-xl bg-gradient-primary text-primary-foreground font-semibold shadow-soft hover:shadow-glow transition">
              Apply now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

import { Bookmark } from "lucide-react";
import { useBookmarks, type BookmarkKind } from "@/lib/bookmarks";
import { toast } from "sonner";

export function BookmarkButton({ id, kind, label = "item" }: { id: string; kind: BookmarkKind; label?: string }) {
  const { has, toggle } = useBookmarks(kind);
  const active = has(id);
  return (
    <button
      onClick={(e) => {
        e.preventDefault(); e.stopPropagation();
        toggle(id);
        toast.success(active ? `Removed ${label}` : `Saved ${label}`);
      }}
      aria-label={active ? "Remove bookmark" : "Add bookmark"}
      className={`h-9 w-9 grid place-items-center rounded-lg transition ${
        active ? "bg-primary/10 text-primary" : "hover:bg-muted text-muted-foreground"
      }`}
    >
      <Bookmark className={`h-4 w-4 ${active ? "fill-current" : ""}`} />
    </button>
  );
}

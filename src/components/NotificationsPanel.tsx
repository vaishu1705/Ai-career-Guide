import { AnimatePresence, motion } from "framer-motion";
import { Bell, Check, Trash2, ClipboardList, Map, Briefcase, Rocket, Info } from "lucide-react";
import { useNotifications, type Notification } from "@/lib/notifications-store";

const ICONS: Record<Notification["kind"], any> = {
  assessment: ClipboardList,
  roadmap: Map,
  job: Briefcase,
  internship: Rocket,
  system: Info,
};

export function NotificationsPanel({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { list, markAllRead, markRead, clear } = useNotifications();

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/30" onClick={onClose}
          />
          <motion.aside
            initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 260, damping: 30 }}
            className="fixed top-0 right-0 h-full w-[min(400px,100vw)] z-50 bg-card border-l border-border shadow-glow flex flex-col"
          >
            <div className="p-4 border-b border-border flex items-center gap-2">
              <Bell className="h-5 w-5 text-primary" />
              <h3 className="font-semibold">Notifications</h3>
              <div className="ml-auto flex items-center gap-1">
                <button onClick={markAllRead} className="text-xs px-2 py-1 rounded-lg hover:bg-muted inline-flex items-center gap-1"><Check className="h-3 w-3" />Mark all read</button>
                <button onClick={clear} className="text-xs px-2 py-1 rounded-lg hover:bg-muted inline-flex items-center gap-1 text-destructive"><Trash2 className="h-3 w-3" />Clear</button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-3 space-y-2">
              {list.length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-10">You're all caught up ✨</p>
              )}
              {list.map(n => {
                const Icon = ICONS[n.kind];
                return (
                  <button
                    key={n.id} onClick={() => markRead(n.id)}
                    className={`w-full text-left flex gap-3 p-3 rounded-xl border transition ${
                      n.read ? "border-border bg-transparent" : "border-primary/30 bg-primary/5"
                    }`}
                  >
                    <div className="h-9 w-9 rounded-xl bg-gradient-primary grid place-items-center text-white shrink-0">
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium truncate">{n.title}</p>
                        {!n.read && <span className="h-1.5 w-1.5 rounded-full bg-primary shrink-0" />}
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5">{n.body}</p>
                      <p className="text-[10px] text-muted-foreground mt-1">{n.time}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

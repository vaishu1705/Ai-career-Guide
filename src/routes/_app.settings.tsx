import { createFileRoute } from "@tanstack/react-router";
import { Moon, Sun, Bell, Lock, Trash2, Globe } from "lucide-react";
import { useTheme } from "@/lib/theme";
import { toast } from "sonner";

export const Route = createFileRoute("/_app/settings")({
  component: Settings,
});

function Row({ icon: Icon, title, desc, children }: any) {
  return (
    <div className="flex items-center justify-between gap-4 p-4 rounded-xl bg-card border border-border">
      <div className="flex items-center gap-3 min-w-0">
        <div className="h-10 w-10 rounded-xl bg-gradient-primary grid place-items-center text-white shrink-0"><Icon className="h-4 w-4" /></div>
        <div className="min-w-0">
          <p className="font-semibold truncate">{title}</p>
          <p className="text-xs text-muted-foreground truncate">{desc}</p>
        </div>
      </div>
      <div className="shrink-0">{children}</div>
    </div>
  );
}

function Settings() {
  const { theme, toggle } = useTheme();
  return (
    <div className="space-y-6 max-w-2xl">
      <header>
        <h1 className="font-display text-2xl font-bold">Settings</h1>
        <p className="text-muted-foreground">Personalize your experience.</p>
      </header>

      <div className="space-y-3">
        <Row icon={theme === "dark" ? Sun : Moon} title="Theme" desc="Toggle between light and dark mode">
          <button onClick={toggle} className="px-4 h-9 rounded-lg border border-border hover:bg-muted text-sm font-medium">
            {theme === "dark" ? "Switch to Light" : "Switch to Dark"}
          </button>
        </Row>
        <Row icon={Bell} title="Notifications" desc="Get updates about jobs and courses">
          <input type="checkbox" defaultChecked className="h-5 w-5 accent-[oklch(0.56_0.22_264)]" />
        </Row>
        <Row icon={Globe} title="Language" desc="Interface language">
          <select className="h-9 px-3 rounded-lg bg-background border border-border text-sm">
            <option>English</option><option>हिंदी</option><option>Español</option>
          </select>
        </Row>
        <Row icon={Lock} title="Change Password" desc="Keep your account secure">
          <button onClick={() => toast.success("Password link sent")} className="px-4 h-9 rounded-lg border border-border hover:bg-muted text-sm font-medium">Change</button>
        </Row>
        <Row icon={Trash2} title="Delete Account" desc="Permanently remove your account and data">
          <button onClick={() => toast.error("Contact support to delete")} className="px-4 h-9 rounded-lg text-destructive border border-destructive/40 hover:bg-destructive/10 text-sm font-medium">Delete</button>
        </Row>
      </div>
    </div>
  );
}

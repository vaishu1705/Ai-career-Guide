import { Link, Outlet, useRouterState, useNavigate } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  User,
  ClipboardList,
  History as HistoryIcon,
  GraduationCap,
  Briefcase,
  Rocket,
  Map,
  Settings,
  LogOut,
  Search,
  Bell,
  Moon,
  Sun,
  Menu,
  X,
  Sparkles,
  FileText,
  Mic,
  GitCompare,
  Target,
  Trophy,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useTheme } from "@/lib/theme";
import { toast } from "sonner";
import { AIAssistant } from "@/components/AIAssistant";
import { CommandPalette } from "@/components/CommandPalette";
import { NotificationsPanel } from "@/components/NotificationsPanel";
import { useNotifications } from "@/lib/notifications-store";
import { pingStreak } from "@/lib/gamification";
import { request, auth } from "@/lib/api";

const nav = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/profile", label: "Profile", icon: User },
  { to: "/assessment", label: "Assessment", icon: ClipboardList },
  { to: "/skill-gap", label: "Skill Gap", icon: Target },
  { to: "/compare", label: "Compare Careers", icon: GitCompare },
  { to: "/roadmap", label: "Learning Roadmap", icon: Map },
  { to: "/resume", label: "Resume Builder", icon: FileText },
  { to: "/interview", label: "Mock Interview", icon: Mic },
  { to: "/leaderboard", label: "Leaderboard", icon: Trophy },
  { to: "/history", label: "Prediction History", icon: HistoryIcon },
  { to: "/courses", label: "Courses", icon: GraduationCap },
  { to: "/jobs", label: "Jobs", icon: Briefcase },
  { to: "/internships", label: "Internships", icon: Rocket },
  { to: "/settings", label: "Settings", icon: Settings },
] as const;

type CurrentUser = {
  _id?: string;
  name: string;
  email: string;
};

function getInitials(name: string) {
  const cleanName = name.trim();

  if (!cleanName) {
    return "U";
  }

  const parts = cleanName.split(/\s+/);

  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase();
  }

  return (
    parts[0].charAt(0) +
    parts[parts.length - 1].charAt(0)
  ).toUpperCase();
}

export function AppShell() {
  const pathname = useRouterState({
    select: (s) => s.location.pathname,
  });

  const [open, setOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);

  const [user, setUser] = useState<CurrentUser | null>(null);
  const [loadingUser, setLoadingUser] = useState(true);

  const { theme, toggle } = useTheme();
  const navigate = useNavigate();
  const { unread } = useNotifications();

  /*
   * Load the currently logged-in user from Flask.
   *
   * The API client automatically sends:
   *
   * Authorization: Bearer <JWT>
   *
   * to /api/auth/me.
   */
  useEffect(() => {
    const loadCurrentUser = async () => {
      try {
        const token = auth.token;

        if (!token) {
          setUser(null);
          setLoadingUser(false);
          return;
        }

        const data = await request<{
          user: CurrentUser;
        }>("get", "/auth/me");

        setUser(data.user);
      } catch (error) {
        console.error("Failed to load current user:", error);
        setUser(null);
      } finally {
        setLoadingUser(false);
      }
    };

    loadCurrentUser();
  }, []);

  /*
   * Keyboard shortcut for search.
   */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (
        (e.metaKey || e.ctrlKey) &&
        e.key.toLowerCase() === "k"
      ) {
        e.preventDefault();
        setPaletteOpen((o) => !o);
      }
    };

    window.addEventListener("keydown", onKey);

    pingStreak();

    return () => {
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  /*
   * Logout
   */
  const logout = async () => {
    try {
      const token = auth.token;

      if (token) {
        try {
          await request("post", "/auth/logout");
        } catch (error) {
          console.error("Logout API error:", error);
        }
      }
    } finally {
      auth.clear();

      localStorage.removeItem("acg:user");

      setUser(null);

      toast.success("Logged out");

      navigate({
        to: "/login",
      });
    }
  };

  const displayName = user?.name || "User";
  const initials = getInitials(displayName);

  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* =========================
          SIDEBAR
      ========================== */}

      <aside
        className={`fixed inset-y-0 left-0 z-40 w-72 border-r border-sidebar-border bg-sidebar transform transition-transform lg:translate-x-0 ${
          open
            ? "translate-x-0"
            : "-translate-x-full"
        }`}
      >
        {/* Logo */}
        <div className="flex items-center gap-2 px-6 py-5 border-b border-sidebar-border">

          <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-primary shadow-glow">
            <Sparkles className="h-5 w-5 text-white" />
          </div>

          <div className="min-w-0">
            <p className="font-display font-bold text-lg leading-tight">
              AI Career Guide
            </p>

            <p className="text-xs text-muted-foreground">
              Smart guidance
            </p>
          </div>

          {/* Mobile close */}
          <button
            className="ml-auto lg:hidden"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-3 space-y-1">

          {nav.map(({ to, label, icon: Icon }) => {
            const active = pathname === to;

            return (
              <Link
                key={to}
                to={to}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  active
                    ? "bg-gradient-primary text-primary-foreground shadow-soft"
                    : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                }`}
              >
                <Icon className="h-4 w-4 shrink-0" />

                <span className="truncate">
                  {label}
                </span>
              </Link>
            );
          })}

          {/* Logout */}
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-destructive hover:bg-destructive/10 transition-all"
          >
            <LogOut className="h-4 w-4" />

            Logout
          </button>

        </nav>
      </aside>

      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 z-30 bg-black/40 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* =========================
          MAIN AREA
      ========================== */}

      <div className="lg:pl-72">

        {/* =========================
            HEADER
        ========================== */}

        <header className="sticky top-0 z-20 glass border-b border-border">

          <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 px-4 sm:px-6 h-16">

            {/* Mobile menu button */}
            <button
              className="lg:hidden shrink-0"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>

            {/* Search */}
            <button
              onClick={() => setPaletteOpen(true)}
              className="relative min-w-0 max-w-xl w-full text-left"
            >
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />

              <div className="w-full h-10 pl-9 pr-14 rounded-xl bg-muted/60 border border-border text-sm text-muted-foreground flex items-center">
                Search careers, courses, jobs…
              </div>

              <kbd className="hidden sm:inline-flex absolute right-2 top-1/2 -translate-y-1/2 text-[10px] px-1.5 py-0.5 rounded bg-background border border-border text-muted-foreground">
                ⌘K
              </kbd>
            </button>

            {/* Right side */}
            <div className="flex items-center gap-2 shrink-0">

              {/* Theme */}
              <button
                onClick={toggle}
                className="grid h-10 w-10 place-items-center rounded-xl hover:bg-muted transition"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? (
                  <Sun className="h-4 w-4" />
                ) : (
                  <Moon className="h-4 w-4" />
                )}
              </button>

              {/* Notifications */}
              <button
                onClick={() => setNotifOpen(true)}
                className="grid h-10 w-10 place-items-center rounded-xl hover:bg-muted transition relative"
                aria-label="Notifications"
              >
                <Bell className="h-4 w-4" />

                {unread > 0 && (
                  <span className="absolute top-1.5 right-1.5 min-w-4 h-4 px-1 rounded-full bg-destructive text-[10px] font-bold text-destructive-foreground grid place-items-center">
                    {unread}
                  </span>
                )}
              </button>

              {/* =========================
                  PROFILE AVATAR
              ========================== */}

              <Link
                to="/profile"
                className="relative h-10 w-10 rounded-xl bg-gradient-primary grid place-items-center font-semibold text-primary-foreground hover:scale-105 hover:shadow-glow transition-all"
                aria-label={`Open profile for ${displayName}`}
                title={`Profile: ${displayName}`}
              >
                {loadingUser ? (
                  <span className="text-xs">
                    ...
                  </span>
                ) : (
                  initials
                )}
              </Link>

            </div>
          </div>
        </header>

        {/* =========================
            PAGE CONTENT
        ========================== */}

        <AnimatePresence mode="wait">

          <motion.main
            key={pathname}
            initial={{
              opacity: 0,
              y: 10,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: -10,
            }}
            transition={{
              duration: 0.25,
            }}
            className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto"
          >
            <Outlet />
          </motion.main>

        </AnimatePresence>
      </div>

      {/* =========================
          COMMAND PALETTE
      ========================== */}

      <CommandPalette
        open={paletteOpen}
        onClose={() => setPaletteOpen(false)}
      />

      {/* =========================
          NOTIFICATIONS
      ========================== */}

      <NotificationsPanel
        open={notifOpen}
        onClose={() => setNotifOpen(false)}
      />

      {/* =========================
          AI ASSISTANT
      ========================== */}

      <AIAssistant />

    </div>
  );
}
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Sparkles, Mail } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/forgot-password")({
  head: () => ({
    meta: [
      { title: "Reset your password — AI Career Guide" },
      { name: "description", content: "Reset your AI Career Guide password via email." },
      { property: "og:title", content: "Reset your password" },
      { property: "og:description", content: "We'll email you a reset link." },
    ],
  }),
  component: ForgotPassword,
});

function ForgotPassword() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen grid place-items-center bg-background px-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        <Link to="/" className="inline-flex items-center gap-2 mb-8">
          <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-primary shadow-glow">
            <Sparkles className="h-4 w-4 text-white" />
          </div>
          <span className="font-display font-bold">AI Career Guide</span>
        </Link>
        <h1 className="font-display text-3xl font-bold">Forgot your password?</h1>
        <p className="text-muted-foreground mt-1">Enter your email and we'll send a reset link.</p>
        <form onSubmit={(e) => { e.preventDefault(); toast.success("Reset link sent (demo)"); navigate({ to: "/login" }); }} className="mt-8 space-y-4">
          <div>
            <label className="text-sm font-medium">Email</label>
            <div className="relative mt-1.5">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input required type="email" placeholder="you@example.com" className="w-full h-11 pl-9 pr-3 rounded-xl bg-background border border-input focus:ring-2 focus:ring-primary/40 outline-none" />
            </div>
          </div>
          <button className="w-full h-11 rounded-xl bg-gradient-primary text-primary-foreground font-semibold shadow-soft hover:shadow-glow transition">
            Send reset link
          </button>
        </form>
        <p className="mt-6 text-sm text-center text-muted-foreground">
          Remembered it? <Link to="/login" className="text-primary font-medium hover:underline">Back to login</Link>
        </p>
      </motion.div>
    </div>
  );
}

import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Sparkles,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Brain,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { request, auth } from "@/lib/api";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Login — AI Career Guide" },
      {
        name: "description",
        content:
          "Sign in to your AI Career Guide account to continue your career journey.",
      },
      {
        property: "og:title",
        content: "Login — AI Career Guide",
      },
      {
        property: "og:description",
        content: "Sign in to your AI Career Guide account.",
      },
    ],
  }),
  component: LoginPage,
});

interface LoginResponse {
  token: string;
  user: {
    _id: string;
    name: string;
    email: string;
  };
}

function LoginPage() {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim() || !password) {
      toast.error("Please enter your email and password.");
      return;
    }

    setLoading(true);

    try {
      const data = await request<LoginResponse>(
        "post",
        "/auth/login",
        {
          email: email.trim(),
          password,
        }
      );

      auth.setToken(data.token);

      // Store the actual user's profile locally
      localStorage.setItem(
        "acg.profile",
        JSON.stringify({
          name: data.user.name,
          email: data.user.email,
        })
      );

      toast.success(`Welcome back, ${data.user.name}!`);

      navigate({ to: "/dashboard" });
    } catch (error) {
      console.error("Login error:", error);

      toast.error(
        error instanceof Error
          ? error.message
          : "Invalid email or password."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-background">
      {/* Illustration */}
      <div className="hidden lg:flex relative bg-gradient-hero items-center justify-center p-12 overflow-hidden">
        <div className="absolute inset-0 opacity-30 [background:radial-gradient(circle_at_20%_20%,rgba(255,255,255,.3),transparent_40%),radial-gradient(circle_at_80%_60%,rgba(255,255,255,.25),transparent_40%)]" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative text-white max-w-md"
        >
          <div className="grid h-16 w-16 place-items-center rounded-2xl bg-white/20 backdrop-blur-md mb-6">
            <Brain className="h-8 w-8" />
          </div>

          <h2 className="font-display text-4xl font-bold leading-tight">
            Welcome back to your career journey
          </h2>

          <p className="mt-4 text-white/80">
            Continue where you left off — check predictions, explore your
            roadmap, and unlock new opportunities.
          </p>

          <div className="mt-10 grid grid-cols-3 gap-4">
            {["10k+ students", "94% accuracy", "500+ careers"].map((s) => (
              <div
                key={s}
                className="rounded-xl bg-white/10 backdrop-blur-md px-3 py-4 text-sm font-medium text-center"
              >
                {s}
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Form */}
      <div className="flex items-center justify-center p-6 sm:p-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <Link to="/" className="inline-flex items-center gap-2 mb-8">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-primary shadow-glow">
              <Sparkles className="h-4 w-4 text-white" />
            </div>

            <span className="font-display font-bold">
              AI Career Guide
            </span>
          </Link>

          <h1 className="font-display text-3xl font-bold">
            Sign in
          </h1>

          <p className="text-muted-foreground mt-1">
            Welcome back! Please enter your details.
          </p>

          <form onSubmit={onSubmit} className="mt-8 space-y-4">
            <Field
              icon={Mail}
              label="Email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />

            <div>
              <label className="text-sm font-medium">
                Password
              </label>

              <div className="relative mt-1.5">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />

                <input
                  type={show ? "text" : "password"}
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  className="w-full h-11 pl-9 pr-10 rounded-xl bg-background border border-input focus:ring-2 focus:ring-primary/40 outline-none"
                />

                <button
                  type="button"
                  onClick={() => setShow((s) => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                  aria-label="Toggle password"
                >
                  {show ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="inline-flex items-center gap-2">
                <input type="checkbox" className="rounded" />
                Remember me
              </label>

              <Link
                to="/forgot-password"
                className="text-primary hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full h-11 rounded-xl bg-gradient-primary text-primary-foreground font-semibold shadow-soft hover:shadow-glow transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>

          <p className="mt-6 text-sm text-center text-muted-foreground">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-primary font-medium hover:underline"
            >
              Register
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}

function Field({
  icon: Icon,
  label,
  ...props
}: {
  icon: any;
  label: string;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label className="text-sm font-medium">
        {label}
      </label>

      <div className="relative mt-1.5">
        <Icon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />

        <input
          {...props}
          required
          className="w-full h-11 pl-9 pr-3 rounded-xl bg-background border border-input focus:ring-2 focus:ring-primary/40 outline-none"
        />
      </div>
    </div>
  );
}
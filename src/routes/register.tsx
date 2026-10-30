import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Sparkles,
  Mail,
  Lock,
  User,
  Rocket,
  Eye,
  EyeOff,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { request, auth } from "@/lib/api";

export const Route = createFileRoute("/register")({
  head: () => ({
    meta: [
      { title: "Create Account — AI Career Guide" },
      {
        name: "description",
        content:
          "Create your free AI Career Guide account and start discovering your ideal career.",
      },
      {
        property: "og:title",
        content: "Create Account — AI Career Guide",
      },
      {
        property: "og:description",
        content: "Create your free AI Career Guide account.",
      },
    ],
  }),
  component: RegisterPage,
});

interface RegisterResponse {
  token: string;
  user: {
    _id: string;
    name: string;
    email: string;
  };
}

function RegisterPage() {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const name = fullName.trim();
    const userEmail = email.trim();

    if (!name) {
      toast.error("Please enter your full name.");
      return;
    }

    if (!userEmail) {
      toast.error("Please enter your email.");
      return;
    }

    if (password.length < 8) {
      toast.error("Password must be at least 8 characters.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const data = await request<RegisterResponse>(
        "post",
        "/auth/register",
        {
          name,
          email: userEmail,
          password,
        }
      );

      // Save JWT returned by Flask
      auth.setToken(data.token);

      // Save the real user's profile locally
      localStorage.setItem(
        "acg.profile",
        JSON.stringify({
          name: data.user.name,
          email: data.user.email,
        })
      );

      toast.success(`Account created! Welcome, ${data.user.name}!`);

      // Continue to onboarding
      navigate({
        to: "/onboarding/interests",
      });
    } catch (error) {
      console.error("Registration error:", error);

      toast.error(
        error instanceof Error
          ? error.message
          : "Unable to create account."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-background">
      {/* Illustration */}
      <div className="hidden lg:flex relative bg-gradient-hero items-center justify-center p-12 overflow-hidden">
        <div className="absolute inset-0 opacity-30 [background:radial-gradient(circle_at_30%_30%,rgba(255,255,255,.3),transparent_40%),radial-gradient(circle_at_70%_70%,rgba(255,255,255,.25),transparent_40%)]" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative text-white max-w-md"
        >
          <div className="grid h-16 w-16 place-items-center rounded-2xl bg-white/20 backdrop-blur-md mb-6">
            <Rocket className="h-8 w-8" />
          </div>

          <h2 className="font-display text-4xl font-bold leading-tight">
            Start your AI-powered career journey
          </h2>

          <p className="mt-4 text-white/80">
            Take our smart assessment. Get matched to the right career. Learn
            what matters.
          </p>
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
            Create your account
          </h1>

          <p className="text-muted-foreground mt-1">
            Free forever. No credit card required.
          </p>

          <form onSubmit={onSubmit} className="mt-8 space-y-4">
            {/* Full Name */}
            <Field
              icon={User}
              label="Full name"
              placeholder="Your full name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              autoComplete="name"
            />

            {/* Email */}
            <Field
              icon={Mail}
              label="Email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />

            {/* Password */}
            <div>
              <label className="text-sm font-medium">
                Password
              </label>

              <div className="relative mt-1.5">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />

                <input
                  type={showPassword ? "text" : "password"}
                  required
                  minLength={8}
                  placeholder="At least 8 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="new-password"
                  className="w-full h-11 pl-9 pr-10 rounded-xl bg-background border border-input focus:ring-2 focus:ring-primary/40 outline-none"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((value) => !value)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="text-sm font-medium">
                Confirm password
              </label>

              <div className="relative mt-1.5">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />

                <input
                  type={showConfirmPassword ? "text" : "password"}
                  required
                  minLength={8}
                  placeholder="Repeat password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  autoComplete="new-password"
                  className="w-full h-11 pl-9 pr-10 rounded-xl bg-background border border-input focus:ring-2 focus:ring-primary/40 outline-none"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword((value) => !value)
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                  aria-label="Toggle confirm password visibility"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Create Account */}
            <button
              type="submit"
              disabled={loading}
              className="w-full h-11 rounded-xl bg-gradient-primary text-primary-foreground font-semibold shadow-soft hover:shadow-glow transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading
                ? "Creating account..."
                : "Create account"}
            </button>
          </form>

          <p className="mt-6 text-sm text-center text-muted-foreground">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-primary font-medium hover:underline"
            >
              Login
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
import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Sparkles, Brain, TrendingUp, Rocket, ArrowRight, CheckCircle2,
  ClipboardList, Cpu, Map as MapIcon, Mail, Phone, MapPin, Twitter, Github, Linkedin,
  ChevronDown, Quote, Star,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AI Career Guide — Discover Your Ideal Career" },
      { name: "description", content: "AI-powered career guidance for students. Take a smart assessment and unlock a personalized roadmap, courses, and jobs." },
      { property: "og:title", content: "AI Career Guide — Discover Your Ideal Career" },
      { property: "og:description", content: "Take an AI-powered assessment and discover your ideal career path with a personalized roadmap." },
    ],
  }),
  component: Landing,
});

const FEATURES = [
  { icon: Brain, title: "Smart Assessment", desc: "MCQs across programming, aptitude & personality graded by our AI." },
  { icon: TrendingUp, title: "AI Prediction", desc: "Best-fit career with confidence score and market demand." },
  { icon: MapIcon, title: "Personalized Roadmap", desc: "A phased learning plan tailored to your goal and skills." },
  { icon: Rocket, title: "Jobs & Internships", desc: "Real openings matched to your career path across India." },
  { icon: Cpu, title: "AI Assistant", desc: "Chat 24/7 with an AI coach for resumes, interviews and roadmaps." },
  { icon: CheckCircle2, title: "Progress Tracking", desc: "See your growth, badges and completion in one dashboard." },
];

const STEPS = [
  { icon: ClipboardList, title: "Take the Assessment", desc: "Answer ~10 MCQs about your skills and interests." },
  { icon: Brain, title: "AI analyzes you", desc: "Our model matches your profile against 20+ career paths." },
  { icon: Rocket, title: "Get your roadmap", desc: "Unlock a plan with courses, jobs and internships." },
];

const TESTIMONIALS = [
  { name: "Riya Sharma", role: "CS Student, IIT Delhi", body: "I was stuck between Data Science and SDE. The AI report was scarily accurate — now I have a clear roadmap.", stars: 5 },
  { name: "Arjun Verma", role: "Fresher, VIT", body: "Loved the personalized courses and job matches. Landed an internship at Zomato in 3 weeks!", stars: 5 },
  { name: "Nisha Rao", role: "3rd year, BITS", body: "The AI assistant answered every doubt I had about interview prep. Highly recommend.", stars: 5 },
];

const FAQS = [
  { q: "Is AI Career Guide really free?", a: "Yes — the assessment, prediction, roadmap and job/internship matching are all free." },
  { q: "How accurate are the predictions?", a: "Our AI model has been trained on career data across the Indian tech industry and typically achieves 85–92% match confidence." },
  { q: "Can I retake the assessment?", a: "Absolutely. Skills and interests change — retake anytime and history is saved." },
  { q: "Which careers are covered?", a: "Software Engineer, Data Scientist, ML Engineer, Web Developer, Data Analyst, Designer and more — with new ones added monthly." },
];

function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      <header className="glass border-b border-border sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-primary shadow-glow">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            <span className="font-display font-bold text-lg">AI Career Guide</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a href="#features" className="hover:text-primary">Features</a>
            <a href="#how" className="hover:text-primary">How it works</a>
            <a href="#testimonials" className="hover:text-primary">Testimonials</a>
            <a href="#faq" className="hover:text-primary">FAQ</a>
            <a href="#contact" className="hover:text-primary">Contact</a>
          </nav>
          <div className="flex items-center gap-2">
            <Link to="/login" className="px-4 py-2 rounded-xl text-sm font-medium hover:bg-muted">Login</Link>
            <Link to="/register" className="px-4 py-2 rounded-xl text-sm font-medium bg-gradient-primary text-primary-foreground shadow-soft">Get Started</Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative">
        <div className="absolute inset-0 -z-10 bg-gradient-hero opacity-10 blur-3xl" />
        {/* animated blobs — blue / purple / cyan */}
        <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-primary/25 blur-3xl animate-pulse -z-10" />
        <div className="absolute top-40 right-10 w-96 h-96 rounded-full bg-secondary/25 blur-3xl animate-pulse -z-10" style={{ animationDelay: "1s" }} />
        <div className="absolute bottom-0 left-1/3 w-80 h-80 rounded-full bg-accent/25 blur-3xl animate-pulse -z-10" style={{ animationDelay: "2s" }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 lg:py-28 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-xs font-medium mb-6">
              <Sparkles className="h-3 w-3 text-primary" /> Powered by AI
            </div>
            <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight max-w-4xl mx-auto">
              Discover the career <span className="text-gradient">you were built for</span>
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-lg text-muted-foreground">
              An AI-powered platform that assesses your technical and soft skills to recommend the perfect career path, learning roadmap, and real opportunities.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link to="/register" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-primary text-primary-foreground font-semibold shadow-glow hover:scale-105 transition">
                Start Free Assessment <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/login" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-border font-semibold hover:bg-muted transition">
                Sign In
              </Link>
            </div>
          </motion.div>

          <div className="mt-12 flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
            {["Free forever", "No credit card", "10,000+ students"].map(t => (
              <span key={t} className="inline-flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-success" />{t}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionHead eyebrow="Features" title="Everything you need to launch your career" desc="From smart assessment to job matching, everything is powered by AI and built for students in India." />
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {FEATURES.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="rounded-2xl p-6 glass shadow-card hover:shadow-glow hover:-translate-y-1 transition"
              >
                <div className="h-11 w-11 rounded-xl bg-gradient-primary grid place-items-center mb-4">
                  <f.icon className="h-5 w-5 text-white" />
                </div>
                <h3 className="font-semibold">{f.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="py-20 border-t border-border bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionHead eyebrow="How it works" title="Three steps to your dream career" desc="Simple, fast, and personalized." />
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            {STEPS.map((s, i) => (
              <div key={s.title} className="relative rounded-2xl p-6 bg-card border border-border shadow-card">
                <div className="absolute -top-3 -left-3 h-8 w-8 rounded-full bg-gradient-hero text-white grid place-items-center font-bold text-sm">{i + 1}</div>
                <div className="h-11 w-11 rounded-xl bg-gradient-primary grid place-items-center mb-3">
                  <s.icon className="h-5 w-5 text-white" />
                </div>
                <h3 className="font-semibold">{s.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionHead eyebrow="Testimonials" title="Loved by students across India" desc="Real stories from students who found their path." />
          <div className="mt-12 grid md:grid-cols-3 gap-4">
            {TESTIMONIALS.map(t => (
              <div key={t.name} className="rounded-2xl p-6 bg-card border border-border shadow-card">
                <Quote className="h-6 w-6 text-primary/40" />
                <p className="mt-3 text-sm text-muted-foreground">{t.body}</p>
                <div className="flex items-center gap-0.5 mt-4 text-warning">
                  {Array.from({ length: t.stars }).map((_, i) => <Star key={i} className="h-3.5 w-3.5 fill-current" />)}
                </div>
                <div className="mt-3 flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-gradient-primary grid place-items-center text-white font-semibold text-sm">{t.name[0]}</div>
                  <div>
                    <p className="font-semibold text-sm">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 border-t border-border bg-muted/30">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <SectionHead eyebrow="FAQ" title="Frequently asked questions" desc="Everything you might want to know." />
          <div className="mt-10 space-y-2">
            {FAQS.map((f, i) => <FaqItem key={i} q={f.q} a={f.a} />)}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-20 border-t border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 grid md:grid-cols-2 gap-8">
          <div>
            <SectionHead eyebrow="Contact" title="Get in touch" desc="Questions, feedback or partnerships — we'd love to hear from you." align="left" />
            <div className="mt-8 space-y-3 text-sm">
              <p className="inline-flex items-center gap-3"><Mail className="h-4 w-4 text-primary" /> hello@aicareerguide.in</p>
              <p className="inline-flex items-center gap-3"><Phone className="h-4 w-4 text-primary" /> +91 98765 43210</p>
              <p className="inline-flex items-center gap-3"><MapPin className="h-4 w-4 text-primary" /> Bengaluru, India</p>
            </div>
          </div>
          <form
            onSubmit={(e) => { e.preventDefault(); toast.success("Thanks — we'll get back to you soon!"); (e.target as HTMLFormElement).reset(); }}
            className="rounded-2xl p-6 bg-card border border-border shadow-card space-y-3"
          >
            <input required placeholder="Your name" className="w-full h-11 px-3 rounded-xl bg-muted/60 border border-border outline-none focus:ring-2 focus:ring-primary/40" />
            <input required type="email" placeholder="Email" className="w-full h-11 px-3 rounded-xl bg-muted/60 border border-border outline-none focus:ring-2 focus:ring-primary/40" />
            <textarea required rows={4} placeholder="Message" className="w-full px-3 py-2.5 rounded-xl bg-muted/60 border border-border outline-none focus:ring-2 focus:ring-primary/40" />
            <button className="w-full h-11 rounded-xl bg-gradient-primary text-primary-foreground font-semibold shadow-soft hover:shadow-glow transition">
              Send message
            </button>
          </form>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="rounded-3xl p-10 sm:p-14 bg-gradient-hero text-white text-center shadow-glow relative overflow-hidden">
            <div className="absolute inset-0 opacity-20 [background:radial-gradient(circle_at_20%_20%,white,transparent_40%),radial-gradient(circle_at_80%_60%,white,transparent_40%)]" />
            <div className="relative">
              <h2 className="font-display text-3xl sm:text-4xl font-bold">Ready to discover your career?</h2>
              <p className="mt-3 text-white/85">Take the free 5-minute assessment. No credit card required.</p>
              <Link to="/register" className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-primary font-semibold hover:scale-105 transition">
                Start Free Assessment <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2">
              <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-primary"><Sparkles className="h-4 w-4 text-white" /></div>
              <span className="font-display font-bold text-lg">AI Career Guide</span>
            </div>
            <p className="mt-3 text-sm text-muted-foreground max-w-sm">AI-powered career guidance for the next generation of Indian students.</p>
            <div className="flex items-center gap-2 mt-4">
              {[Twitter, Github, Linkedin].map((I, i) => (
                <a key={i} href="#" className="h-9 w-9 grid place-items-center rounded-xl border border-border hover:bg-muted transition"><I className="h-4 w-4" /></a>
              ))}
            </div>
          </div>
          <div>
            <p className="font-semibold text-sm mb-3">Product</p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#features" className="hover:text-foreground">Features</a></li>
              <li><a href="#how" className="hover:text-foreground">How it works</a></li>
              <li><Link to="/register" className="hover:text-foreground">Get started</Link></li>
            </ul>
          </div>
          <div>
            <p className="font-semibold text-sm mb-3">Company</p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#testimonials" className="hover:text-foreground">Testimonials</a></li>
              <li><a href="#faq" className="hover:text-foreground">FAQ</a></li>
              <li><a href="#contact" className="hover:text-foreground">Contact</a></li>
            </ul>
          </div>
        </div>
        <p className="mt-10 text-center text-sm text-muted-foreground">© {new Date().getFullYear()} AI Career Guide. Built for the future of learning.</p>
      </footer>
    </div>
  );
}

function SectionHead({ eyebrow, title, desc, align = "center" }: { eyebrow: string; title: string; desc: string; align?: "center" | "left" }) {
  return (
    <div className={align === "center" ? "text-center max-w-2xl mx-auto" : ""}>
      <p className="text-xs uppercase tracking-wider text-primary font-semibold">{eyebrow}</p>
      <h2 className="mt-2 font-display text-3xl sm:text-4xl font-bold">{title}</h2>
      <p className="mt-3 text-muted-foreground">{desc}</p>
    </div>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-2xl border border-border bg-card overflow-hidden">
      <button onClick={() => setOpen(o => !o)} className="w-full flex items-center justify-between px-5 py-4 text-left">
        <span className="font-medium">{q}</span>
        <ChevronDown className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && <div className="px-5 pb-4 text-sm text-muted-foreground">{a}</div>}
    </div>
  );
}

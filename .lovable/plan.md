## AI Career Development Platform — Build Plan

The current app already has: landing page, login/register, dashboard, MCQ assessment, prediction loading, result, roadmap, courses/jobs/internships, history, settings, AI assistant, notifications, bookmarks, career details, PDF report. Backend is Lovable Cloud (Supabase) — **not Flask/MongoDB**, since Lovable projects run on this stack. I'll flag that and proceed with Cloud (same capabilities: auth, DB, storage, AI).

### Scope for this iteration (Phase A — frontend + data model)

Because the full spec is ~30 feature areas, I'll ship it in phases. **Phase A** (this turn) focuses on the missing student journey pieces and premium polish. **Phase B** (next) adds heavier flows (mock interview recording, admin, final assessment engine).

**Phase A deliverables**

1. **Refined design system & color palette** — Indigo `#4F46E5` + Violet `#7C3AED` + Cyan `#06B6D4` accents, refined OKLCH tokens, glassmorphism, gradient rings, dark mode audit.
2. **Profile completion flow** — new `/onboarding/profile` (photo, name, phone, college, branch, year, CGPA, skills chips, career goal) → stored in `profiles` table.
3. **Interest Assessment** — new `/onboarding/interests` with 16 icon cards + 5-star rating per selected interest.
4. **Adaptive Skill Assessment** — rewrite `/assessment` to generate question sets from selected interests (question bank keyed by interest → topics).
5. **AI Analysis screen** — upgrade `/predicting` with staged messages (Analyzing Interests → Evaluating Skills → …).
6. **Career Result** — extend `/result` with confidence, interest vs skill breakdown, strengths/weaknesses, future scope, top companies, required skills.
7. **Learning Roadmap with locked levels** — Beginner → Intermediate → Advanced → Expert; module cards with lock icons; progress persistence in localStorage + Cloud.
8. **Module detail page** — `/learn/$moduleId` with tabs: Classes (video), Notes, Practice Task, Mini Project, Quiz, Certificate. Unlock gating.
9. **Quiz engine** — MCQ + True/False + Fill-in-blank, timer, explanations, ≥70% unlocks certificate.
10. **Certificate generator** — PDF with student name, course, date, ID, QR code.
11. **Resume Builder** — `/resume` auto-fills from profile + progress; PDF export.
12. **Mock Interview** — `/interview` with question categories, self-rating feedback (recording deferred to Phase B).
13. **Analytics upgrade** — Radar/Pie/Bar in dashboard tied to real assessment data.
14. **Notifications & Settings** — wire real events (quiz due, cert earned); add language + security tabs.

### Technical notes (for reviewers)

- **Backend**: Lovable Cloud (Supabase Postgres + Auth + Storage) — Flask/Mongo not supported on this stack; API surface equivalent via `createServerFn` + RLS-protected tables.
- **New tables**: `profiles` (extend), `interests`, `assessment_results`, `learning_progress`, `quiz_results`, `certificates`, `resume_data`, `mock_interview_scores`. Bookmarks already local; migrate to Cloud table.
- **Question bank**: `src/lib/question-bank.ts` keyed by interest slug → topics → questions.
- **Roadmap data**: `src/lib/roadmaps.ts` keyed by predicted career slug.
- **Routes added**: `/onboarding/profile`, `/onboarding/interests`, `/learn/$moduleId`, `/resume`, `/interview`, `/forgot-password`.
- **Deferred to Phase B**: video recording for mock interview, admin dashboard, real embedded video hosting, coding-question runner, multi-language i18n.

### Question before I start

Given the size, want me to:
- **(A)** Ship Phase A end-to-end now (large single turn, ~20+ files), or
- **(B)** Start with items 1–6 (design system + onboarding + adaptive assessment + result) and continue after you review?

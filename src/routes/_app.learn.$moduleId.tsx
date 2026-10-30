import {
  createFileRoute,
  Link,
  useParams,
} from "@tanstack/react-router";

import { motion } from "framer-motion";

import {
  BookOpen,
  ClipboardCheck,
  FileText,
  GraduationCap,
  Play,
  Rocket,
  CheckCircle2,
  Award,
  Lock,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
} from "lucide-react";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import { toast } from "sonner";

import { journey } from "@/lib/journey-store";

import {
  moduleCompleted,
  roadmapFor,
  type Module,
} from "@/lib/roadmaps";

import { downloadCertificate } from "@/lib/certificate-pdf";

import { ModuleFeedback } from "@/components/ModuleFeedback";


export const Route = createFileRoute(
  "/_app/learn/$moduleId"
)({
  component: LearnModule,
});


type Tab =
  | "class"
  | "notes"
  | "task"
  | "project"
  | "quiz"
  | "certificate";


function LearnModule() {

  const { moduleId } =
    useParams({
      from: "/_app/learn/$moduleId",
    });


  const [progress, setProgress] =
    useState<any>(null);


  const [tab, setTab] =
    useState<Tab>("class");


  const [lessonIndex, setLessonIndex] =
    useState(0);


  const [completedLessons, setCompletedLessons] =
    useState<string[]>([]);


  const [practiceLink, setPracticeLink] =
    useState("");


  const [projectLink, setProjectLink] =
    useState("");


  // =========================================
  // FIND MODULE
  // =========================================

  const mod: Module | undefined =
    useMemo(() => {

      const prediction =
        journey.getPrediction();

      const roadmap =
        roadmapFor(
          prediction?.careerSlug ??
          "software-engineer"
        );

      return roadmap.find(
        (m) => m.id === moduleId
      );

    }, [moduleId]);


  // =========================================
  // LOAD SAVED PROGRESS
  // =========================================

  useEffect(() => {

    const saved =
      journey.getProgress()[moduleId];

    setProgress(saved);

    setPracticeLink(
      saved?.practiceSubmission ?? ""
    );

    setProjectLink(
      saved?.projectSubmission ?? ""
    );


    const storedLessons =
      localStorage.getItem(
        `acg:lessons:${moduleId}`
      );

    if (storedLessons) {

      try {

        setCompletedLessons(
          JSON.parse(storedLessons)
        );

      } catch {

        setCompletedLessons([]);

      }

    } else {

      setCompletedLessons([]);

    }

  }, [moduleId]);


  // =========================================
  // MODULE NOT FOUND
  // =========================================

  if (!mod) {

    return (

      <div className="text-center py-16">

        <p className="text-muted-foreground">
          Module not found.
        </p>

        <Link
          to="/roadmap"
          className="mt-4 inline-flex text-primary hover:underline"
        >
          ← Back to roadmap
        </Link>

      </div>

    );
  }


  // =========================================
  // LESSONS
  // =========================================

  const lessons =
    mod.lessons ?? [];


  const lessonCount =
    lessons.length;


  const currentLesson =
    lessons[lessonIndex];


  const completedCount =
    completedLessons.length;


  const lessonPercent =
    lessonCount === 0
      ? 0
      : Math.round(
          (completedCount /
            lessonCount) *
            100
        );


  // =========================================
  // SAVE PROGRESS
  // =========================================

  const mark = (
    patch: any
  ) => {

    journey.setModuleProgress(
      moduleId,
      patch
    );

    setProgress(
      journey.getProgress()[moduleId]
    );

    toast.success(
      "Progress saved"
    );
  };


  // =========================================
  // COMPLETE VIDEO LESSON
  // =========================================

  const completeLesson = () => {

    if (!currentLesson) {
      return;
    }


    const updated =
      Array.from(
        new Set([
          ...completedLessons,
          currentLesson.id,
        ])
      );


    setCompletedLessons(
      updated
    );


    localStorage.setItem(
      `acg:lessons:${moduleId}`,
      JSON.stringify(updated)
    );


    if (
      lessonCount > 0 &&
      updated.length >= lessonCount
    ) {

      journey.setModuleProgress(
        moduleId,
        {
          classDone: true,
        }
      );


      setProgress(
        journey.getProgress()[moduleId]
      );


      toast.success(
        "All classes completed! 🎉"
      );

    } else {

      toast.success(
        "Lesson completed ✓"
      );

    }

  };


  // =========================================
  // PREVIOUS LESSON
  // =========================================

  const previousLesson = () => {

    setLessonIndex(
      (current) =>
        Math.max(
          0,
          current - 1
        )
    );

  };


  // =========================================
  // NEXT LESSON
  // =========================================

  const nextLesson = () => {

    setLessonIndex(
      (current) =>
        Math.min(
          lessonCount - 1,
          current + 1
        )
    );

  };


  // =========================================
  // QUIZ ACCESS
  // =========================================

  const quizUnlocked =
    !!progress?.classDone &&
    !!progress?.notesDone &&
    !!progress?.taskDone &&
    !!progress?.projectDone;


  const certificateUnlocked =
    (progress?.quizScore ?? 0) >= 70;


  // =========================================
  // TABS
  // =========================================

  const tabs: {
    key: Tab;
    label: string;
    icon: any;
    ok?: boolean;
  }[] = [

    {
      key: "class",
      label: "Class",
      icon: Play,
      ok: progress?.classDone,
    },

    {
      key: "notes",
      label: "Notes",
      icon: FileText,
      ok: progress?.notesDone,
    },

    {
      key: "task",
      label: "Practice",
      icon: ClipboardCheck,
      ok: progress?.taskDone,
    },

    {
      key: "project",
      label: "Mini Project",
      icon: Rocket,
      ok: progress?.projectDone,
    },

    {
      key: "quiz",
      label: "Quiz",
      icon: GraduationCap,
      ok: certificateUnlocked,
    },

    {
      key: "certificate",
      label: "Certificate",
      icon: Award,
      ok: !!progress?.certificateId,
    },

  ];


  // =========================================
  // PAGE
  // =========================================

  return (

    <div className="max-w-4xl mx-auto space-y-6">

      {/* HEADER */}

      <header>

        <Link
          to="/roadmap"
          className="text-sm text-muted-foreground hover:text-foreground"
        >
          ← Back to roadmap
        </Link>


        <div className="mt-3 flex items-start justify-between gap-3">

          <div>

            <div className="flex gap-2 items-center flex-wrap">

              <span className="text-xs px-2.5 py-0.5 rounded-full bg-primary/10 text-primary font-medium">
                {mod.level}
              </span>

              <span className="text-xs text-muted-foreground">
                {mod.duration}
              </span>

            </div>


            <h1 className="mt-2 font-display text-2xl font-bold">
              {mod.title}
            </h1>


            <p className="text-muted-foreground text-sm">
              {mod.summary}
            </p>

          </div>


          {moduleCompleted(progress) && (

            <span className="inline-flex items-center gap-1.5 text-sm text-success font-semibold">

              <CheckCircle2 className="h-4 w-4" />

              Completed

            </span>

          )}

        </div>

      </header>


      {/* TABS */}

      <div className="flex flex-wrap gap-1 border-b border-border">

        {tabs.map((item) => (

          <button
            key={item.key}
            onClick={() =>
              setTab(item.key)
            }
            className={`inline-flex items-center gap-1.5 px-3 py-2 text-sm font-medium border-b-2 -mb-px transition ${
              tab === item.key
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >

            <item.icon className="h-4 w-4" />

            {item.label}

            {item.ok && (

              <CheckCircle2
                className="h-3.5 w-3.5 text-success"
              />

            )}

          </button>

        ))}

      </div>


      {/* =====================================================
          CLASS
      ===================================================== */}

      {tab === "class" && (

        <motion.div
          initial={{
            opacity: 0,
            y: 8,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="rounded-2xl p-6 bg-card border border-border shadow-card space-y-6"
        >

          {/* CLASS HEADER */}

          <div>

            <div className="flex items-center justify-between gap-3">

              <div>

                <p className="text-sm text-muted-foreground">
                  Video Class
                </p>

                <h2 className="font-display text-xl font-bold">
                  {currentLesson?.title ??
                    mod.title}
                </h2>

              </div>


              {lessonCount > 0 && (

                <span className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary font-semibold whitespace-nowrap">
                  Lesson {lessonIndex + 1} / {lessonCount}
                </span>

              )}

            </div>


            {/* PROGRESS */}

            {lessonCount > 0 && (

              <div className="mt-4">

                <div className="flex justify-between text-xs text-muted-foreground mb-1">

                  <span>
                    Class progress
                  </span>

                  <span>
                    {lessonPercent}%
                  </span>

                </div>


                <div className="h-2 rounded-full bg-muted overflow-hidden">

                  <div
                    className="h-full bg-gradient-primary transition-all"
                    style={{
                      width: `${lessonPercent}%`,
                    }}
                  />

                </div>

              </div>

            )}

          </div>


          {/* VIDEO */}

          {currentLesson?.videoId ? (

            <div className="overflow-hidden rounded-2xl bg-black shadow-card">

              <div className="aspect-video">

                <iframe
                  className="w-full h-full"
                  src={`https://www.youtube.com/embed/${currentLesson.videoId}?rel=0`}
                  title={currentLesson.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />

              </div>

            </div>

          ) : currentLesson?.searchQuery ? (

            <div className="rounded-2xl border border-border bg-muted/40 p-8 text-center">

              <Play className="h-12 w-12 mx-auto text-primary" />

              <h3 className="mt-3 font-semibold">
                {currentLesson.title}
              </h3>

              <p className="mt-1 text-sm text-muted-foreground">
                {currentLesson.description}
              </p>


              <a
                href={`https://www.youtube.com/results?search_query=${encodeURIComponent(
                  currentLesson.searchQuery
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 px-5 h-10 rounded-xl bg-gradient-primary text-primary-foreground font-semibold"
              >

                Find class on YouTube

                <ExternalLink className="h-4 w-4" />

              </a>

            </div>

          ) : (

            <div className="rounded-2xl border border-border bg-muted/40 p-8 text-center">

              <Play className="h-12 w-12 mx-auto text-primary" />

              <h3 className="mt-3 font-semibold">
                {mod.title}
              </h3>

              <p className="mt-1 text-sm text-muted-foreground">
                Video lessons are being prepared for this module.
              </p>

            </div>

          )}


          {/* DESCRIPTION */}

          {currentLesson && (

            <div>

              <h3 className="font-semibold">
                About this lesson
              </h3>

              <p className="mt-1 text-sm text-muted-foreground">
                {currentLesson.description}
              </p>

              <p className="mt-2 text-xs text-muted-foreground">
                Duration: {currentLesson.duration}
              </p>

            </div>

          )}


          {/* LESSON NAVIGATION */}

          {lessonCount > 0 && (

            <div className="flex items-center justify-between gap-3">

              <button
                onClick={previousLesson}
                disabled={lessonIndex === 0}
                className="inline-flex items-center gap-2 px-4 h-10 rounded-xl border border-border hover:bg-muted disabled:opacity-40"
              >

                <ChevronLeft className="h-4 w-4" />

                Previous

              </button>


              <button
                onClick={completeLesson}
                disabled={
                  !!currentLesson &&
                  completedLessons.includes(
                    currentLesson.id
                  )
                }
                className="px-5 h-10 rounded-xl bg-gradient-primary text-primary-foreground font-semibold disabled:opacity-60"
              >

                {currentLesson &&
                completedLessons.includes(
                  currentLesson.id
                )
                  ? "Lesson completed ✓"
                  : "Mark lesson complete"}

              </button>


              <button
                onClick={nextLesson}
                disabled={
                  lessonIndex >=
                  lessonCount - 1
                }
                className="inline-flex items-center gap-2 px-4 h-10 rounded-xl border border-border hover:bg-muted disabled:opacity-40"
              >

                Next

                <ChevronRight className="h-4 w-4" />

              </button>

            </div>

          )}


          {/* LESSON LIST */}

          {lessonCount > 0 && (

            <div>

              <h3 className="font-semibold mb-3">
                Lessons in this class
              </h3>


              <div className="space-y-2">

                {lessons.map(
                  (lesson, index) => {

                    const done =
                      completedLessons.includes(
                        lesson.id
                      );

                    const active =
                      index === lessonIndex;


                    return (

                      <button
                        key={lesson.id}
                        onClick={() =>
                          setLessonIndex(index)
                        }
                        className={`w-full flex items-center gap-3 p-3 rounded-xl border text-left transition ${
                          active
                            ? "border-primary bg-primary/5"
                            : "border-border hover:bg-muted"
                        }`}
                      >

                        {done ? (

                          <CheckCircle2 className="h-5 w-5 text-success shrink-0" />

                        ) : (

                          <div className="h-5 w-5 rounded-full border border-muted-foreground/40 grid place-items-center text-[10px] shrink-0">
                            {index + 1}
                          </div>

                        )}


                        <div className="min-w-0">

                          <p className="font-medium text-sm truncate">
                            {lesson.title}
                          </p>

                          <p className="text-xs text-muted-foreground">
                            {lesson.duration}
                          </p>

                        </div>

                      </button>

                    );

                  }
                )}

              </div>

            </div>

          )}


          {/* OBJECTIVES */}

          <div>

            <h3 className="font-semibold flex items-center gap-2">

              <BookOpen className="h-4 w-4 text-primary" />

              Learning objectives

            </h3>


            <ul className="mt-2 space-y-1 text-sm list-disc pl-5 text-muted-foreground">

              {mod.objectives.map(
                (objective) => (

                  <li key={objective}>
                    {objective}
                  </li>

                )
              )}

            </ul>

          </div>


          {/* COMPLETE CLASS */}

          {!progress?.classDone && (

            <button
              onClick={() =>
                mark({
                  classDone: true,
                })
              }
              className="px-5 h-10 rounded-xl border border-primary text-primary hover:bg-primary/10 font-semibold"
            >
              Mark entire class complete
            </button>

          )}

        </motion.div>

      )}


      {/* =====================================================
          NOTES
      ===================================================== */}

      {tab === "notes" && (

        <motion.div
          initial={{
            opacity: 0,
            y: 8,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="rounded-2xl p-6 bg-card border border-border shadow-card space-y-4"
        >

          <div>

            <h2 className="font-display text-xl font-bold">
              Notes
            </h2>

            <p className="text-sm text-muted-foreground mt-1">
              Important concepts from this module.
            </p>

          </div>


          <div className="text-sm space-y-3">

            <p>
              <strong>Summary:</strong>{" "}
              {mod.summary}
            </p>

            <p>
              <strong>Key concepts:</strong>{" "}
              foundational vocabulary, common
              pitfalls, real-world examples,
              and step-by-step walkthroughs
              related to {mod.title}.
            </p>

          </div>


          <div className="rounded-xl bg-muted/60 p-4 font-mono text-xs whitespace-pre-wrap">
{`// Quick reference

// Topic: ${mod.title}

function learn(topic) {
  return practice(topic) + build(topic);
}`}
          </div>


          <button
            onClick={() =>
              mark({
                notesDone: true,
              })
            }
            className="px-5 h-10 rounded-xl bg-gradient-primary text-primary-foreground font-semibold"
          >

            {progress?.notesDone
              ? "Notes read ✓"
              : "Mark notes as read"}

          </button>

        </motion.div>

      )}


      {/* =====================================================
          PRACTICE
      ===================================================== */}

      {tab === "task" && (

        <motion.div
          initial={{
            opacity: 0,
            y: 8,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="rounded-2xl p-6 bg-card border border-border shadow-card space-y-5"
        >

          <div>

            <p className="text-sm text-muted-foreground">
              Practical Exercise
            </p>

            <h2 className="font-display text-xl font-bold">
              Practice Task
            </h2>

            <p className="mt-2 text-sm text-muted-foreground">
              Complete the following practical task:
            </p>

          </div>


          <div className="rounded-xl bg-muted/50 border border-border p-4">

            <p className="text-sm leading-relaxed">
              {mod.practiceTask}
            </p>

          </div>


          <div>

            <label
              htmlFor="practice-url"
              className="text-sm font-medium"
            >
              GitHub / Project URL
            </label>

            <input
              id="practice-url"
              type="url"
              value={practiceLink}
              onChange={(e) =>
                setPracticeLink(
                  e.target.value
                )
              }
              placeholder="https://github.com/username/project"
              className="mt-1.5 w-full h-11 px-3 rounded-xl border border-input bg-background outline-none focus:ring-2 focus:ring-primary/40"
            />

            <p className="mt-1.5 text-xs text-muted-foreground">
              Add the link to your completed practice work.
            </p>

          </div>


          <div className="flex flex-wrap items-center gap-3">

            <button
              onClick={() => {

                const link =
                  practiceLink.trim();


                if (!link) {

                  toast.error(
                    "Please enter your GitHub or project URL."
                  );

                  return;
                }


                try {

                  const parsed =
                    new URL(link);

                  if (
                    parsed.protocol !==
                      "http:" &&
                    parsed.protocol !==
                      "https:"
                  ) {
                    throw new Error();
                  }

                } catch {

                  toast.error(
                    "Please enter a valid URL."
                  );

                  return;
                }


                journey.setPracticeSubmission(
                  moduleId,
                  link
                );


                setProgress(
                  journey.getProgress()[moduleId]
                );


                toast.success(
                  "Practice submitted successfully ✓"
                );

              }}
              className="px-5 h-10 rounded-xl bg-gradient-primary text-primary-foreground font-semibold"
            >

              {progress?.taskDone
                ? "Update submission"
                : "Submit practice"}

            </button>


            {progress?.taskDone && (

              <span className="inline-flex items-center gap-1.5 text-sm text-success font-semibold">

                <CheckCircle2 className="h-4 w-4" />

                Submitted

              </span>

            )}

          </div>


          {progress?.practiceSubmission && (

            <div className="rounded-xl border border-success/30 bg-success/5 p-4">

              <p className="text-xs text-muted-foreground">
                Submitted project
              </p>


              <a
                href={
                  progress.practiceSubmission
                }
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline break-all"
              >

                {progress.practiceSubmission}

                <ExternalLink className="h-4 w-4 shrink-0" />

              </a>

            </div>

          )}

        </motion.div>

      )}


      {/* =====================================================
          MINI PROJECT
      ===================================================== */}

      {tab === "project" && (

        <motion.div
          initial={{
            opacity: 0,
            y: 8,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="rounded-2xl p-6 bg-card border border-border shadow-card space-y-5"
        >

          <div>

            <p className="text-sm text-muted-foreground">
              Build something real
            </p>

            <h2 className="font-display text-xl font-bold">
              Mini Project
            </h2>

          </div>


          <div className="rounded-xl bg-muted/50 border border-border p-4">

            <p className="text-sm leading-relaxed">
              {mod.miniProject}
            </p>

          </div>


          <div>

            <label
              htmlFor="project-url"
              className="text-sm font-medium"
            >
              GitHub / Project URL
            </label>

            <input
              id="project-url"
              type="url"
              value={projectLink}
              onChange={(e) =>
                setProjectLink(
                  e.target.value
                )
              }
              placeholder="https://github.com/username/project"
              className="mt-1.5 w-full h-11 px-3 rounded-xl border border-input bg-background outline-none focus:ring-2 focus:ring-primary/40"
            />

          </div>


          <div className="flex flex-wrap items-center gap-3">

            <button
              onClick={() => {

                const link =
                  projectLink.trim();


                if (!link) {

                  toast.error(
                    "Please enter your project URL."
                  );

                  return;
                }


                try {

                  const parsed =
                    new URL(link);

                  if (
                    parsed.protocol !==
                      "http:" &&
                    parsed.protocol !==
                      "https:"
                  ) {
                    throw new Error();
                  }

                } catch {

                  toast.error(
                    "Please enter a valid URL."
                  );

                  return;
                }


                journey.setProjectSubmission(
                  moduleId,
                  link
                );


                setProgress(
                  journey.getProgress()[moduleId]
                );


                toast.success(
                  "Project submitted successfully ✓"
                );

              }}
              className="px-5 h-10 rounded-xl bg-gradient-primary text-primary-foreground font-semibold"
            >

              {progress?.projectDone
                ? "Update project"
                : "Submit project"}

            </button>


            {progress?.projectDone && (

              <span className="inline-flex items-center gap-1.5 text-sm text-success font-semibold">

                <CheckCircle2 className="h-4 w-4" />

                Submitted

              </span>

            )}

          </div>


          {progress?.projectSubmission && (

            <div className="rounded-xl border border-success/30 bg-success/5 p-4">

              <p className="text-xs text-muted-foreground">
                Submitted project
              </p>


              <a
                href={
                  progress.projectSubmission
                }
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline break-all"
              >

                {progress.projectSubmission}

                <ExternalLink className="h-4 w-4 shrink-0" />

              </a>

            </div>

          )}

        </motion.div>

      )}


      {/* =====================================================
          QUIZ
      ===================================================== */}

      {tab === "quiz" && (

        <motion.div
          initial={{
            opacity: 0,
            y: 8,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="rounded-2xl p-6 bg-card border border-border shadow-card"
        >

          {quizUnlocked ? (

            <Quiz
              mod={mod}
              onDone={(score) => {

                journey.setModuleProgress(
                  moduleId,
                  {
                    quizScore: score,
                  }
                );


                setProgress(
                  journey.getProgress()[moduleId]
                );

              }}
              previousScore={
                progress?.quizScore
              }
            />

          ) : (

            <div className="text-center py-10">

              <Lock className="h-10 w-10 mx-auto text-muted-foreground" />

              <p className="mt-3 font-medium">
                Quiz locked
              </p>

              <p className="mt-1 text-sm text-muted-foreground max-w-md mx-auto">
                Complete the class, notes,
                practice task and mini project
                to unlock the quiz.
              </p>

            </div>

          )}

        </motion.div>

      )}


      {/* =====================================================
          CERTIFICATE
      ===================================================== */}

      {tab === "certificate" && (

        <motion.div
          initial={{
            opacity: 0,
            y: 8,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="rounded-2xl p-6 bg-card border border-border shadow-card"
        >

          {certificateUnlocked ? (

            <Certificate
              mod={mod}
              progress={progress}
              onIssue={(id) => {

                journey.setModuleProgress(
                  moduleId,
                  {
                    certificateId: id,
                  }
                );


                setProgress(
                  journey.getProgress()[moduleId]
                );

              }}
            />

          ) : (

            <div className="text-center py-10">

              <Lock className="h-10 w-10 mx-auto text-muted-foreground" />

              <p className="mt-3 font-medium">
                Certificate locked
              </p>

              <p className="mt-1 text-sm text-muted-foreground">
                Score at least 70% on the quiz
                to unlock your certificate.
              </p>

            </div>

          )}

        </motion.div>

      )}


      <ModuleFeedback
        moduleId={moduleId}
      />

    </div>

  );
}


/* =========================================================
   QUIZ COMPONENT
========================================================= */

function Quiz({
  mod,
  onDone,
  previousScore,
}: {
  mod: Module;
  onDone: (score: number) => void;
  previousScore?: number;
}) {

  const [idx, setIdx] =
    useState(0);


  const [answers, setAnswers] =
    useState<
      Record<number, number>
    >({});


  const [done, setDone] =
    useState(false);


  const q =
    mod.quiz[idx];


  const calculateScore = () => {

    const correct =
      mod.quiz.filter(
        (item, index) =>
          answers[index] ===
          item.correct
      ).length;


    return Math.round(
      (correct /
        mod.quiz.length) *
        100
    );

  };


  const submit = () => {

    const score =
      calculateScore();


    onDone(score);

    setDone(true);

  };


  if (done) {

    const score =
      calculateScore();


    return (

      <div className="text-center space-y-3 py-6">

        <div className="mx-auto h-16 w-16 rounded-2xl bg-gradient-primary grid place-items-center text-white shadow-glow">

          <GraduationCap className="h-7 w-7" />

        </div>


        <h3 className="font-display text-2xl font-bold">
          You scored {score}%
        </h3>


        <p className="text-muted-foreground text-sm">

          {score >= 70
            ? "Great job! Certificate unlocked."
            : "You need 70% to unlock the certificate. Try again."}

        </p>


        <button
          onClick={() => {

            setDone(false);
            setAnswers({});
            setIdx(0);

          }}
          className="mt-3 px-5 h-10 rounded-xl border border-border hover:bg-muted"
        >
          Retake quiz
        </button>

      </div>

    );

  }


  if (!q) {

    return (
      <p className="text-muted-foreground">
        No quiz questions available.
      </p>
    );

  }


  return (

    <div>

      {previousScore != null && (

        <p className="text-xs text-muted-foreground mb-3">
          Last score: {previousScore}%
        </p>

      )}


      <div className="flex items-center justify-between text-sm mb-2">

        <span className="text-muted-foreground">
          Question {idx + 1} of {mod.quiz.length}
        </span>

        <span className="font-semibold">
          {Math.round(
            ((idx + 1) /
              mod.quiz.length) *
              100
          )}%
        </span>

      </div>


      <div className="h-2 rounded-full bg-muted overflow-hidden mb-5">

        <div
          className="h-full bg-gradient-primary"
          style={{
            width: `${
              ((idx + 1) /
                mod.quiz.length) *
              100
            }%`,
          }}
        />

      </div>


      <h4 className="font-semibold">
        {q.q}
      </h4>


      <div className="mt-4 space-y-2">

        {q.options.map(
          (option, optionIndex) => {

            const selected =
              answers[idx] ===
              optionIndex;


            return (

              <button
                key={optionIndex}
                onClick={() =>
                  setAnswers(
                    (current) => ({
                      ...current,
                      [idx]:
                        optionIndex,
                    })
                  )
                }
                className={`w-full text-left px-4 py-3 rounded-xl border transition ${
                  selected
                    ? "border-primary bg-primary/10"
                    : "border-border hover:bg-muted"
                }`}
              >

                {option}

              </button>

            );

          }
        )}

      </div>


      <div className="mt-6 flex justify-between gap-3">

        <button
          onClick={() =>
            setIdx(
              (current) =>
                Math.max(
                  0,
                  current - 1
                )
            )
          }
          disabled={idx === 0}
          className="px-4 h-10 rounded-xl border border-border disabled:opacity-40"
        >
          Previous
        </button>


        {idx <
        mod.quiz.length - 1 ? (

          <button
            onClick={() =>
              setIdx(
                (current) =>
                  current + 1
              )
            }
            disabled={
              answers[idx] == null
            }
            className="px-5 h-10 rounded-xl bg-gradient-primary text-primary-foreground font-semibold disabled:opacity-40"
          >
            Next
          </button>

        ) : (

          <button
            onClick={submit}
            disabled={
              Object.keys(
                answers
              ).length <
              mod.quiz.length
            }
            className="px-5 h-10 rounded-xl bg-gradient-primary text-primary-foreground font-semibold disabled:opacity-40"
          >
            Submit quiz
          </button>

        )}

      </div>

    </div>

  );

}


/* =========================================================
   CERTIFICATE COMPONENT
========================================================= */

function Certificate({
  mod,
  progress,
  onIssue,
}: {
  mod: Module;
  progress: any;
  onIssue: (id: string) => void;
}) {

  const profile =
    journey.getProfile();


  const name =
    profile.name ||
    "Student";


  const [certId] =
    useState(
      () =>
        progress?.certificateId ??
        `AICG-${mod.id
          .toUpperCase()}-${Math.random()
          .toString(36)
          .slice(2, 7)
          .toUpperCase()}`
    );


  const handleDownload = () => {

    if (!progress?.certificateId) {

      onIssue(certId);

    }


    downloadCertificate({
      name,
      course: mod.title,
      certId,
    });

  };


  return (

    <div className="space-y-5">

      <div className="rounded-2xl p-8 bg-gradient-hero text-white text-center shadow-glow">

        <Award className="h-10 w-10 mx-auto" />


        <p className="mt-2 text-sm uppercase tracking-wider">
          Certificate of Completion
        </p>


        <h3 className="mt-2 font-display text-3xl font-bold">
          {name}
        </h3>


        <p className="mt-2">
          has successfully completed{" "}
          <strong>
            {mod.title}
          </strong>{" "}
          with a quiz score of{" "}
          <strong>
            {progress?.quizScore}%
          </strong>.
        </p>


        <p className="mt-4 text-xs opacity-80">
          Certificate ID: {certId}
        </p>

      </div>


      <div className="flex justify-center">

        <button
          onClick={handleDownload}
          className="px-6 h-11 rounded-xl bg-gradient-primary text-primary-foreground font-semibold shadow-soft"
        >
          Download PDF Certificate
        </button>

      </div>

    </div>

  );
}
// Lightweight localStorage-backed store for the student journey.
// Kept intentionally simple — pure frontend state for the demo experience.

export type InterestKey =
  | "programming"
  | "web"
  | "mobile"
  | "ai"
  | "ml"
  | "data"
  | "cyber"
  | "cloud"
  | "devops"
  | "uiux"
  | "networking"
  | "testing"
  | "database"
  | "blockchain"
  | "iot"
  | "gamedev";

export interface InterestPick {
  key: InterestKey;
  rating: number;
}

export interface AssessmentAnswer {
  questionId: string;
  selected: number;
  correct: boolean;
  topic: string;
  interest: InterestKey;
}

export interface Prediction {
  careerSlug: string;
  careerTitle: string;
  match: number;
  confidence: number;
  interestScore: number;
  skillScore: number;
  strengths: string[];
  weaknesses: string[];
  createdAt: string;
}

export interface ModuleProgress {
  moduleId: string;

  classDone: boolean;
  notesDone: boolean;
  taskDone: boolean;
  projectDone: boolean;

  quizScore?: number;
  certificateId?: string;

  // Practice submission
  practiceSubmission?: string;

  // Mini project submission
  projectSubmission?: string;
}

interface StoredProfile {
  name?: string;
  email?: string;
  phone?: string;
  college?: string;
  branch?: string;
  year?: string;
  cgpa?: string;
  skills?: string[];
  interests?: string[];
  goal?: string;
  avatar?: string;
}

const K = {
  interests: "acg.interests",
  answers: "acg.answers",
  prediction: "acg.prediction",
  progress: "acg.progress",
  profile: "acg.profile",
};

function read<T>(
  key: string,
  fallback: T
): T {
  if (typeof window === "undefined") {
    return fallback;
  }

  try {
    const value =
      localStorage.getItem(key);

    return value
      ? (JSON.parse(value) as T)
      : fallback;
  } catch {
    return fallback;
  }
}

function write<T>(
  key: string,
  value: T
) {
  if (typeof window === "undefined") {
    return;
  }

  try {
    localStorage.setItem(
      key,
      JSON.stringify(value)
    );
  } catch {
    // Ignore localStorage errors.
  }
}

export const journey = {

  // =========================================
  // INTERESTS
  // =========================================

  getInterests: () =>
    read<InterestPick[]>(
      K.interests,
      []
    ),

  setInterests: (
    value: InterestPick[]
  ) =>
    write(
      K.interests,
      value
    ),


  // =========================================
  // ASSESSMENT ANSWERS
  // =========================================

  getAnswers: () =>
    read<AssessmentAnswer[]>(
      K.answers,
      []
    ),

  setAnswers: (
    value: AssessmentAnswer[]
  ) =>
    write(
      K.answers,
      value
    ),


  // =========================================
  // CAREER PREDICTION
  // =========================================

  getPrediction: () =>
    read<Prediction | null>(
      K.prediction,
      null
    ),

  setPrediction: (
    value: Prediction
  ) =>
    write(
      K.prediction,
      value
    ),


  // =========================================
  // MODULE PROGRESS
  // =========================================

  getProgress: () =>
    read<
      Record<string, ModuleProgress>
    >(
      K.progress,
      {}
    ),

  setModuleProgress: (
    id: string,
    patch: Partial<ModuleProgress>
  ) => {

    const all =
      read<
        Record<string, ModuleProgress>
      >(
        K.progress,
        {}
      );

    const existing =
      all[id] ?? {
        moduleId: id,
        classDone: false,
        notesDone: false,
        taskDone: false,
        projectDone: false,
      };

    all[id] = {
      ...existing,
      ...patch,
      moduleId: id,
    };

    write(
      K.progress,
      all
    );
  },


  // =========================================
  // PRACTICE SUBMISSION
  // =========================================

  setPracticeSubmission: (
    moduleId: string,
    url: string
  ) => {

    const all =
      read<
        Record<string, ModuleProgress>
      >(
        K.progress,
        {}
      );

    const existing =
      all[moduleId] ?? {
        moduleId,
        classDone: false,
        notesDone: false,
        taskDone: false,
        projectDone: false,
      };

    all[moduleId] = {
      ...existing,
      moduleId,
      practiceSubmission: url,
      taskDone: true,
    };

    write(
      K.progress,
      all
    );
  },


  getPracticeSubmission: (
    moduleId: string
  ) => {

    const all =
      read<
        Record<string, ModuleProgress>
      >(
        K.progress,
        {}
      );

    return (
      all[moduleId]
        ?.practiceSubmission ?? ""
    );
  },


  // =========================================
  // PROJECT SUBMISSION
  // =========================================

  setProjectSubmission: (
    moduleId: string,
    url: string
  ) => {

    const all =
      read<
        Record<string, ModuleProgress>
      >(
        K.progress,
        {}
      );

    const existing =
      all[moduleId] ?? {
        moduleId,
        classDone: false,
        notesDone: false,
        taskDone: false,
        projectDone: false,
      };

    all[moduleId] = {
      ...existing,
      moduleId,
      projectSubmission: url,
      projectDone: true,
    };

    write(
      K.progress,
      all
    );
  },


  getProjectSubmission: (
    moduleId: string
  ) => {

    const all =
      read<
        Record<string, ModuleProgress>
      >(
        K.progress,
        {}
      );

    return (
      all[moduleId]
        ?.projectSubmission ?? ""
    );
  },


  // =========================================
  // PROFILE
  // =========================================

  getProfile: () =>
    read<StoredProfile>(
      K.profile,
      {}
    ),

  setProfile: (
    value: Record<string, unknown>
  ) =>
    write(
      K.profile,
      {
        ...journey.getProfile(),
        ...value,
      }
    ),
};


// =============================================
// INTERESTS LIST
// =============================================

export const INTERESTS: {
  key: InterestKey;
  label: string;
  icon: string;
  color: string;
}[] = [

  {
    key: "programming",
    label: "Programming",
    icon: "Code2",
    color: "#4F46E5",
  },

  {
    key: "web",
    label: "Web Development",
    icon: "Globe",
    color: "#0EA5E9",
  },

  {
    key: "mobile",
    label: "Mobile Development",
    icon: "Smartphone",
    color: "#8B5CF6",
  },

  {
    key: "ai",
    label: "Artificial Intelligence",
    icon: "Brain",
    color: "#EC4899",
  },

  {
    key: "ml",
    label: "Machine Learning",
    icon: "Bot",
    color: "#F59E0B",
  },

  {
    key: "data",
    label: "Data Science",
    icon: "BarChart3",
    color: "#10B981",
  },

  {
    key: "cyber",
    label: "Cyber Security",
    icon: "Shield",
    color: "#EF4444",
  },

  {
    key: "cloud",
    label: "Cloud Computing",
    icon: "Cloud",
    color: "#06B6D4",
  },

  {
    key: "devops",
    label: "DevOps",
    icon: "Settings2",
    color: "#84CC16",
  },

  {
    key: "uiux",
    label: "UI / UX Design",
    icon: "Palette",
    color: "#F472B6",
  },

  {
    key: "networking",
    label: "Networking",
    icon: "Network",
    color: "#22D3EE",
  },

  {
    key: "testing",
    label: "Software Testing",
    icon: "Bug",
    color: "#A855F7",
  },

  {
    key: "database",
    label: "Database Management",
    icon: "Database",
    color: "#0EA5E9",
  },

  {
    key: "blockchain",
    label: "Blockchain",
    icon: "Boxes",
    color: "#F97316",
  },

  {
    key: "iot",
    label: "IoT",
    icon: "Cpu",
    color: "#14B8A6",
  },

  {
    key: "gamedev",
    label: "Game Development",
    icon: "Gamepad2",
    color: "#DC2626",
  },
];
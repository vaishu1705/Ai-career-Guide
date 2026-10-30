import type { InterestKey } from "./journey-store";

export interface BankQuestion {
  id: string;
  interest: InterestKey;
  topic: string;
  difficulty: "Easy" | "Medium" | "Hard";
  question: string;
  options: string[];
  correct: number; // index
  explanation?: string;
}

// Compact adaptive bank — 3–5 items per interest keyed by topic.
export const BANK: BankQuestion[] = [
  // Programming
  { id: "p1", interest: "programming", topic: "Java", difficulty: "Easy", question: "Which keyword defines a constant in Java?", options: ["static", "final", "const", "immutable"], correct: 1 },
  { id: "p2", interest: "programming", topic: "Python", difficulty: "Easy", question: "What does len([1,2,3]) return?", options: ["2", "3", "None", "Error"], correct: 1 },
  { id: "p3", interest: "programming", topic: "OOP", difficulty: "Medium", question: "Inheritance allows a class to:", options: ["Hide members", "Reuse parent members", "Delete state", "Prevent extension"], correct: 1 },
  { id: "p4", interest: "programming", topic: "Data Structures", difficulty: "Medium", question: "Best average-case for hash lookup?", options: ["O(n)", "O(log n)", "O(1)", "O(n log n)"], correct: 2 },

  // Web
  { id: "w1", interest: "web", topic: "HTML", difficulty: "Easy", question: "Which tag defines the largest heading?", options: ["<h6>", "<h1>", "<head>", "<title>"], correct: 1 },
  { id: "w2", interest: "web", topic: "CSS", difficulty: "Easy", question: "CSS property to change text color?", options: ["font-color", "text-color", "color", "fg"], correct: 2 },
  { id: "w3", interest: "web", topic: "JavaScript", difficulty: "Medium", question: "typeof null returns?", options: ["'null'", "'object'", "'undefined'", "'boolean'"], correct: 1 },
  { id: "w4", interest: "web", topic: "React", difficulty: "Medium", question: "React hook for side effects?", options: ["useState", "useMemo", "useEffect", "useRef"], correct: 2 },
  { id: "w5", interest: "web", topic: "REST", difficulty: "Medium", question: "Which HTTP method is idempotent?", options: ["POST", "PATCH", "PUT", "CONNECT"], correct: 2 },

  // Mobile
  { id: "m1", interest: "mobile", topic: "Android", difficulty: "Easy", question: "Kotlin runs on which VM?", options: ["Node", "JVM", "CLR", "V8"], correct: 1 },
  { id: "m2", interest: "mobile", topic: "iOS", difficulty: "Medium", question: "SwiftUI is:", options: ["Imperative", "Declarative", "Assembly", "Server-only"], correct: 1 },
  { id: "m3", interest: "mobile", topic: "React Native", difficulty: "Medium", question: "RN renders to:", options: ["DOM", "Native widgets", "Canvas only", "WebGL"], correct: 1 },

  // AI
  { id: "a1", interest: "ai", topic: "Python", difficulty: "Easy", question: "NumPy is used for:", options: ["Web", "Numeric arrays", "Auth", "3D games"], correct: 1 },
  { id: "a2", interest: "ai", topic: "ML Basics", difficulty: "Medium", question: "Supervised learning requires:", options: ["No data", "Labeled data", "Only images", "Users"], correct: 1 },
  { id: "a3", interest: "ai", topic: "Deep Learning", difficulty: "Hard", question: "Activation used to introduce non-linearity?", options: ["Linear", "ReLU", "Identity", "None"], correct: 1 },

  // ML
  { id: "ml1", interest: "ml", topic: "Scikit-learn", difficulty: "Easy", question: "train_test_split lives in:", options: ["numpy", "pandas", "sklearn.model_selection", "torch"], correct: 2 },
  { id: "ml2", interest: "ml", topic: "Metrics", difficulty: "Medium", question: "Which metric handles imbalance best?", options: ["Accuracy", "F1", "MSE", "R²"], correct: 1 },
  { id: "ml3", interest: "ml", topic: "Overfitting", difficulty: "Medium", question: "Regularization primarily reduces:", options: ["Bias", "Variance", "Data", "Loss=0"], correct: 1 },

  // Data Science
  { id: "d1", interest: "data", topic: "Pandas", difficulty: "Easy", question: "df.head() shows:", options: ["Last rows", "First rows", "Columns only", "Nulls"], correct: 1 },
  { id: "d2", interest: "data", topic: "Stats", difficulty: "Medium", question: "Mean is sensitive to:", options: ["Nothing", "Outliers", "Ordering", "Column names"], correct: 1 },
  { id: "d3", interest: "data", topic: "SQL", difficulty: "Medium", question: "Which SQL clause filters aggregated rows?", options: ["WHERE", "HAVING", "GROUP", "ORDER"], correct: 1 },

  // Cyber
  { id: "c1", interest: "cyber", topic: "Networking", difficulty: "Easy", question: "HTTPS uses port:", options: ["21", "80", "443", "22"], correct: 2 },
  { id: "c2", interest: "cyber", topic: "Crypto", difficulty: "Medium", question: "SHA-256 is:", options: ["Symmetric cipher", "Hash", "Cert format", "Key exchange"], correct: 1 },
  { id: "c3", interest: "cyber", topic: "Web Sec", difficulty: "Medium", question: "SQL injection is mitigated by:", options: ["Regex only", "Prepared statements", "MD5", "GETs"], correct: 1 },

  // Cloud
  { id: "cl1", interest: "cloud", topic: "AWS", difficulty: "Easy", question: "S3 is used for:", options: ["Compute", "Object storage", "SQL DB", "DNS"], correct: 1 },
  { id: "cl2", interest: "cloud", topic: "Docker", difficulty: "Medium", question: "Dockerfile defines:", options: ["A VM", "An image build", "A DB", "A firewall"], correct: 1 },
  { id: "cl3", interest: "cloud", topic: "Kubernetes", difficulty: "Hard", question: "Smallest deployable unit in K8s?", options: ["Node", "Pod", "Cluster", "Service"], correct: 1 },

  // DevOps
  { id: "do1", interest: "devops", topic: "CI/CD", difficulty: "Easy", question: "CI stands for:", options: ["Cloud Infra", "Continuous Integration", "Container Init", "Code Insight"], correct: 1 },
  { id: "do2", interest: "devops", topic: "Git", difficulty: "Easy", question: "git merge combines:", options: ["Branches", "Files only", "Users", "Servers"], correct: 0 },

  // UI/UX
  { id: "u1", interest: "uiux", topic: "Design", difficulty: "Easy", question: "Fitts' law relates to:", options: ["Color", "Target size/distance", "Fonts", "Cost"], correct: 1 },
  { id: "u2", interest: "uiux", topic: "Contrast", difficulty: "Medium", question: "WCAG AA text contrast minimum?", options: ["2:1", "3:1", "4.5:1", "10:1"], correct: 2 },

  // Networking
  { id: "n1", interest: "networking", topic: "OSI", difficulty: "Easy", question: "Which layer handles IP?", options: ["Transport", "Network", "Data-Link", "Session"], correct: 1 },
  { id: "n2", interest: "networking", topic: "TCP", difficulty: "Medium", question: "TCP is:", options: ["Connectionless", "Connection-oriented", "Broadcast", "Half-duplex"], correct: 1 },

  // Testing
  { id: "t1", interest: "testing", topic: "Unit", difficulty: "Easy", question: "A unit test targets:", options: ["Whole app", "One function/unit", "UI only", "Servers"], correct: 1 },
  { id: "t2", interest: "testing", topic: "TDD", difficulty: "Medium", question: "TDD order?", options: ["Code→Test", "Test→Code→Refactor", "Refactor→Test", "Never test"], correct: 1 },

  // Database
  { id: "db1", interest: "database", topic: "SQL", difficulty: "Easy", question: "PRIMARY KEY implies:", options: ["Nullable", "Unique + not null", "Duplicate allowed", "Foreign"], correct: 1 },
  { id: "db2", interest: "database", topic: "NoSQL", difficulty: "Medium", question: "MongoDB stores data as:", options: ["Rows", "BSON docs", "XML", "Blobs only"], correct: 1 },

  // Blockchain
  { id: "b1", interest: "blockchain", topic: "Basics", difficulty: "Easy", question: "A blockchain is:", options: ["Central DB", "Distributed ledger", "Cache", "Compiler"], correct: 1 },
  { id: "b2", interest: "blockchain", topic: "Smart Contracts", difficulty: "Medium", question: "Ethereum's contract language?", options: ["Rust", "Solidity", "Python", "Go"], correct: 1 },

  // IoT
  { id: "i1", interest: "iot", topic: "Protocol", difficulty: "Medium", question: "Lightweight pub/sub protocol for IoT?", options: ["MQTT", "SMTP", "FTP", "IMAP"], correct: 0 },
  { id: "i2", interest: "iot", topic: "Hardware", difficulty: "Easy", question: "Common IoT dev board?", options: ["GPU", "ESP32", "SSD", "TPU"], correct: 1 },

  // Game Dev
  { id: "g1", interest: "gamedev", topic: "Engine", difficulty: "Easy", question: "Unity uses which language?", options: ["Java", "C#", "Python", "Swift"], correct: 1 },
  { id: "g2", interest: "gamedev", topic: "Graphics", difficulty: "Medium", question: "Rendering pipeline stage that shades pixels?", options: ["Vertex", "Fragment/Pixel", "Tessellation", "Assembly"], correct: 1 },
];

// Interest -> best-fit career slug for prediction
export const INTEREST_TO_CAREER: Record<InterestKey, { slug: string; title: string }> = {
  programming: { slug: "software-engineer", title: "Software Engineer" },
  web:         { slug: "full-stack-developer", title: "Full-Stack Developer" },
  mobile:      { slug: "mobile-developer", title: "Mobile App Developer" },
  ai:          { slug: "ai-engineer", title: "AI Engineer" },
  ml:          { slug: "ml-engineer", title: "Machine Learning Engineer" },
  data:        { slug: "data-scientist", title: "Data Scientist" },
  cyber:       { slug: "cybersecurity-analyst", title: "Cybersecurity Analyst" },
  cloud:       { slug: "cloud-engineer", title: "Cloud Engineer" },
  devops:      { slug: "devops-engineer", title: "DevOps Engineer" },
  uiux:        { slug: "ui-ux-designer", title: "UI/UX Designer" },
  networking:  { slug: "network-engineer", title: "Network Engineer" },
  testing:     { slug: "qa-engineer", title: "QA / SDET" },
  database:    { slug: "database-administrator", title: "Database Administrator" },
  blockchain:  { slug: "blockchain-developer", title: "Blockchain Developer" },
  iot:         { slug: "iot-engineer", title: "IoT Engineer" },
  gamedev:     { slug: "game-developer", title: "Game Developer" },
};

export function questionsFor(interests: InterestKey[]): BankQuestion[] {
  return BANK.filter(q => interests.includes(q.interest));
}

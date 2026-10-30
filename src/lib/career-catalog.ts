export interface CareerDetail {
  slug: string;
  title: string;
  tagline: string;
  overview: string;
  salaryIN: string;
  demandIN: string;
  growth: string;
  requiredDegree: string;
  skills: { name: string; level: number }[];
  companies: string[];
  roadmap: { phase: string; title: string; weeks: number }[];
  certifications: string[];
  related: string[]; // other slugs
}

export const careers: CareerDetail[] = [
  {
    slug: "software-engineer",
    title: "Software Engineer",
    tagline: "Design, build and ship software that runs the world.",
    overview:
      "Software Engineers design, develop, test and maintain software systems across web, mobile, cloud and enterprise products. The role blends algorithmic thinking, product sense and continuous learning.",
    salaryIN: "₹6 – 24 LPA (freshers to 3 yrs)",
    demandIN: "Very High — 200,000+ open roles in India",
    growth: "Projected 22% growth over the next 5 years",
    requiredDegree: "B.E./B.Tech in CSE/IT or equivalent",
    skills: [
      { name: "Data Structures & Algorithms", level: 90 },
      { name: "System Design", level: 70 },
      { name: "Version Control (Git)", level: 85 },
      { name: "One backend language (Python/Java/Go)", level: 88 },
      { name: "Databases (SQL & NoSQL)", level: 75 },
    ],
    companies: ["Google", "Microsoft", "Amazon", "Flipkart", "Razorpay", "Zerodha", "Swiggy"],
    roadmap: [
      { phase: "Foundations", title: "Programming basics + Git", weeks: 4 },
      { phase: "Core CS", title: "Data Structures & Algorithms", weeks: 8 },
      { phase: "Build", title: "Full-stack project + APIs", weeks: 10 },
      { phase: "Scale", title: "System Design & Cloud", weeks: 6 },
    ],
    certifications: ["AWS Certified Developer", "Google Associate Cloud Engineer", "Meta Front-End Developer"],
    related: ["data-scientist", "ml-engineer", "web-developer"],
  },
  {
    slug: "data-scientist",
    title: "Data Scientist",
    tagline: "Turn data into decisions with statistics and ML.",
    overview:
      "Data Scientists extract insights from data using statistics, machine learning and communication. They translate business questions into models, dashboards and experiments.",
    salaryIN: "₹8 – 28 LPA",
    demandIN: "Very High — 90,000+ open roles",
    growth: "36% growth expected over the next 5 years",
    requiredDegree: "B.E./B.Tech, B.Sc Stats/Math, or M.Tech in Data Science",
    skills: [
      { name: "Python + Pandas", level: 90 },
      { name: "Statistics & Probability", level: 85 },
      { name: "Machine Learning", level: 82 },
      { name: "SQL", level: 88 },
      { name: "Data Visualization", level: 75 },
    ],
    companies: ["Google", "Meta", "Amazon", "Swiggy", "Zomato", "Uber", "Netflix"],
    roadmap: [
      { phase: "Foundations", title: "Python + Statistics", weeks: 6 },
      { phase: "Core", title: "ML with scikit-learn", weeks: 8 },
      { phase: "Build", title: "End-to-end ML project", weeks: 8 },
      { phase: "Advanced", title: "Deep Learning + MLOps", weeks: 8 },
    ],
    certifications: ["Google Data Analytics", "TensorFlow Developer", "AWS ML Specialty"],
    related: ["ml-engineer", "software-engineer", "data-analyst"],
  },
  {
    slug: "ml-engineer",
    title: "ML Engineer",
    tagline: "Ship machine learning models to production.",
    overview:
      "ML Engineers bridge data science and software engineering — building scalable pipelines, training infrastructure and deploying models to real users.",
    salaryIN: "₹10 – 32 LPA",
    demandIN: "High — 40,000+ open roles",
    growth: "40% growth expected",
    requiredDegree: "B.E./B.Tech in CS or M.Tech in AI/ML",
    skills: [
      { name: "Python + PyTorch/TF", level: 88 },
      { name: "MLOps & Docker", level: 78 },
      { name: "Cloud (AWS/GCP)", level: 80 },
      { name: "Distributed Systems", level: 70 },
      { name: "Model Evaluation", level: 82 },
    ],
    companies: ["OpenAI", "Google", "Nvidia", "Meta", "Adobe", "Fractal"],
    roadmap: [
      { phase: "Foundations", title: "Python + ML basics", weeks: 6 },
      { phase: "Deep Learning", title: "PyTorch/TensorFlow", weeks: 8 },
      { phase: "MLOps", title: "Docker, Kubernetes, MLflow", weeks: 6 },
      { phase: "Deploy", title: "Serve models at scale", weeks: 6 },
    ],
    certifications: ["AWS ML Specialty", "GCP Professional ML Engineer", "DeepLearning.AI Specialization"],
    related: ["data-scientist", "software-engineer"],
  },
  {
    slug: "web-developer",
    title: "Web Developer",
    tagline: "Craft the interfaces the world touches every day.",
    overview:
      "Web Developers build responsive, accessible and performant applications on the web platform. Front-end, back-end, or full-stack — this is where product meets user.",
    salaryIN: "₹4 – 20 LPA",
    demandIN: "Very High — evergreen demand",
    growth: "18% growth expected",
    requiredDegree: "Any Bachelor's + strong portfolio",
    skills: [
      { name: "HTML/CSS/JS", level: 92 },
      { name: "React or Vue", level: 88 },
      { name: "TypeScript", level: 78 },
      { name: "REST/GraphQL APIs", level: 75 },
      { name: "Testing", level: 60 },
    ],
    companies: ["Vercel", "Shopify", "Zerodha", "Razorpay", "Flipkart"],
    roadmap: [
      { phase: "Foundations", title: "HTML, CSS, JavaScript", weeks: 6 },
      { phase: "Framework", title: "React + TypeScript", weeks: 8 },
      { phase: "Backend", title: "Node.js + Databases", weeks: 6 },
      { phase: "Ship", title: "Deploy & monitor a real app", weeks: 4 },
    ],
    certifications: ["Meta Front-End Developer", "freeCodeCamp Responsive Web"],
    related: ["software-engineer", "designer"],
  },
  {
    slug: "data-analyst",
    title: "Data Analyst",
    tagline: "Answer business questions with data.",
    overview:
      "Data Analysts collect, clean and visualize data to help teams make better decisions. Strong SQL, spreadsheets and storytelling are the core toolkit.",
    salaryIN: "₹4 – 14 LPA",
    demandIN: "High",
    growth: "20% growth expected",
    requiredDegree: "Any Bachelor's (Stats/CS preferred)",
    skills: [
      { name: "SQL", level: 92 },
      { name: "Excel / Sheets", level: 85 },
      { name: "Python (pandas)", level: 75 },
      { name: "BI tools (Tableau/PowerBI)", level: 80 },
      { name: "Storytelling", level: 70 },
    ],
    companies: ["Swiggy", "Zomato", "Meesho", "Deloitte", "EY", "Accenture"],
    roadmap: [
      { phase: "Foundations", title: "SQL + Spreadsheets", weeks: 4 },
      { phase: "Analysis", title: "Python & pandas", weeks: 6 },
      { phase: "Visualize", title: "Tableau / PowerBI", weeks: 4 },
      { phase: "Portfolio", title: "3 case studies", weeks: 4 },
    ],
    certifications: ["Google Data Analytics", "Microsoft PL-300 (Power BI)"],
    related: ["data-scientist", "software-engineer"],
  },
  {
    slug: "designer",
    title: "UI/UX Designer",
    tagline: "Design products people love to use.",
    overview:
      "Designers combine research, visual craft and interaction design to shape delightful experiences.",
    salaryIN: "₹5 – 22 LPA",
    demandIN: "High",
    growth: "15% growth expected",
    requiredDegree: "Any Bachelor's + strong portfolio",
    skills: [
      { name: "Figma", level: 92 },
      { name: "Interaction Design", level: 82 },
      { name: "User Research", level: 75 },
      { name: "Design Systems", level: 78 },
      { name: "Prototyping", level: 80 },
    ],
    companies: ["Airbnb", "Razorpay", "Cred", "Zomato", "Google"],
    roadmap: [
      { phase: "Foundations", title: "Design principles + Figma", weeks: 4 },
      { phase: "Craft", title: "Design systems", weeks: 6 },
      { phase: "Research", title: "User interviews & usability", weeks: 4 },
      { phase: "Portfolio", title: "3 real case studies", weeks: 6 },
    ],
    certifications: ["Google UX Design", "Interaction Design Foundation"],
    related: ["web-developer"],
  },
];

export function getCareer(slug: string) {
  return careers.find(c => c.slug === slug);
}

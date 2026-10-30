export interface AssessmentQuestion {
  id: number;
  category: string;
  question: string;
  options: string[];
}

export const questions: AssessmentQuestion[] = [
  { id: 1, category: "Programming", question: "Which language is best known for statistical computing and data analysis?", options: ["Java", "R", "C++", "HTML"] },
  { id: 2, category: "Python", question: "What does the `len()` function return for a list?", options: ["Sum of elements", "Number of elements", "Largest element", "None"] },
  { id: 3, category: "Java", question: "Java is a ___ language.", options: ["Compiled only", "Interpreted only", "Compiled and interpreted", "Assembly"] },
  { id: 4, category: "SQL", question: "Which SQL clause is used to filter rows?", options: ["ORDER BY", "GROUP BY", "WHERE", "HAVING"] },
  { id: 5, category: "HTML/CSS", question: "Which CSS property controls text size?", options: ["font-style", "text-size", "font-size", "text-style"] },
  { id: 6, category: "JavaScript", question: "Which is NOT a JS data type?", options: ["Number", "Boolean", "Float", "String"] },
  { id: 7, category: "Logical Reasoning", question: "If A > B and B > C, then:", options: ["A < C", "A = C", "A > C", "Cannot say"] },
  { id: 8, category: "Aptitude", question: "The next number in 2, 6, 12, 20, __ is?", options: ["28", "30", "32", "34"] },
  { id: 9, category: "Communication", question: "The best way to handle team disagreement is?", options: ["Avoid it", "Argue louder", "Discuss respectfully", "Ignore team"] },
  { id: 10, category: "Personality", question: "You prefer working:", options: ["Alone", "In small teams", "In large groups", "Depends on task"] },
];

export interface Career {
  title: string;
  match: number;
  confidence: number;
  description: string;
  salary: string;
  demand: string;
  scope: string;
  skills: string[];
  strengths: string[];
  weakAreas: string[];
}

export const mockResult: Career = {
  title: "Software Engineer",
  match: 92,
  confidence: 88,
  description: "Software Engineers design, develop, and maintain software systems that power modern products. This career blends problem solving, algorithmic thinking, and continuous learning.",
  salary: "₹6 – 24 LPA",
  demand: "Very High",
  scope: "Excellent — expected 22% growth over the next 5 years across product companies, startups, and enterprises.",
  skills: ["Python", "JavaScript", "Data Structures", "System Design", "Git", "Problem Solving"],
  strengths: ["Logical Reasoning", "Programming Fundamentals", "Learning Agility"],
  weakAreas: ["System Design", "Advanced SQL"],
};

export interface Course { id: number; name: string; level: string; duration: string; instructor: string; rating: number; category: string; }
export const courses: Course[] = [
  { id: 1, name: "Python for Everybody", level: "Beginner", duration: "8 weeks", instructor: "Dr. Charles Severance", rating: 4.8, category: "Programming" },
  { id: 2, name: "Data Structures & Algorithms", level: "Intermediate", duration: "12 weeks", instructor: "Prof. Tim Roughgarden", rating: 4.9, category: "CS Core" },
  { id: 3, name: "Full-Stack Web Development", level: "Intermediate", duration: "16 weeks", instructor: "Angela Yu", rating: 4.7, category: "Web" },
  { id: 4, name: "Machine Learning Specialization", level: "Advanced", duration: "10 weeks", instructor: "Andrew Ng", rating: 4.9, category: "AI/ML" },
  { id: 5, name: "System Design Fundamentals", level: "Advanced", duration: "6 weeks", instructor: "Alex Xu", rating: 4.8, category: "System Design" },
  { id: 6, name: "SQL Mastery", level: "Beginner", duration: "5 weeks", instructor: "Jose Portilla", rating: 4.6, category: "Database" },
];

export interface Job { id: number; company: string; role: string; location: string; salary: string; experience: string; type: string; }
export const jobs: Job[] = [
  { id: 1, company: "Google", role: "Software Engineer", location: "Bengaluru, IN", salary: "₹18-28 LPA", experience: "0-2 yrs", type: "Full-time" },
  { id: 2, company: "Microsoft", role: "Frontend Developer", location: "Hyderabad, IN", salary: "₹14-22 LPA", experience: "1-3 yrs", type: "Full-time" },
  { id: 3, company: "Amazon", role: "SDE-1", location: "Remote", salary: "₹16-24 LPA", experience: "0-1 yrs", type: "Full-time" },
  { id: 4, company: "Razorpay", role: "Backend Engineer", location: "Bengaluru, IN", salary: "₹12-20 LPA", experience: "1-3 yrs", type: "Full-time" },
  { id: 5, company: "Swiggy", role: "Data Analyst", location: "Bengaluru, IN", salary: "₹8-14 LPA", experience: "0-2 yrs", type: "Full-time" },
  { id: 6, company: "Zomato", role: "ML Engineer", location: "Gurgaon, IN", salary: "₹15-25 LPA", experience: "1-3 yrs", type: "Full-time" },
];

export interface Internship { id: number; company: string; role: string; duration: string; location: string; stipend: string; }
export const internships: Internship[] = [
  { id: 1, company: "Flipkart", role: "SDE Intern", duration: "6 months", location: "Bengaluru, IN", stipend: "₹75,000/mo" },
  { id: 2, company: "Adobe", role: "Product Intern", duration: "3 months", location: "Noida, IN", stipend: "₹60,000/mo" },
  { id: 3, company: "Uber", role: "Data Science Intern", duration: "6 months", location: "Remote", stipend: "₹80,000/mo" },
  { id: 4, company: "Zerodha", role: "Frontend Intern", duration: "4 months", location: "Bengaluru, IN", stipend: "₹50,000/mo" },
];

export interface RoadmapItem { phase: string; title: string; duration: string; difficulty: string; resources: string[]; progress: number; }
export const roadmap: RoadmapItem[] = [
  { phase: "Beginner", title: "Programming Foundations", duration: "4 weeks", difficulty: "Easy", resources: ["Python Basics", "Git & GitHub"], progress: 100 },
  { phase: "Intermediate", title: "Data Structures & Algorithms", duration: "8 weeks", difficulty: "Medium", resources: ["DSA in Python", "Leetcode Top 150"], progress: 65 },
  { phase: "Advanced", title: "Web Development", duration: "10 weeks", difficulty: "Medium", resources: ["React & TypeScript", "Node.js API"], progress: 30 },
  { phase: "Expert", title: "System Design & Cloud", duration: "6 weeks", difficulty: "Hard", resources: ["System Design Primer", "AWS Fundamentals"], progress: 5 },
];

export interface History { id: number; date: string; career: string; confidence: number; score: number; }
export const history: History[] = [
  { id: 1, date: "2026-07-20", career: "Software Engineer", confidence: 92, score: 88 },
  { id: 2, date: "2026-06-15", career: "Data Analyst", confidence: 78, score: 74 },
  { id: 3, date: "2026-05-02", career: "Web Developer", confidence: 84, score: 80 },
  { id: 4, date: "2026-04-11", career: "ML Engineer", confidence: 70, score: 68 },
];

export const skillGraph = [
  { skill: "Programming", value: 88 },
  { skill: "Logic", value: 92 },
  { skill: "Aptitude", value: 78 },
  { skill: "Communication", value: 70 },
  { skill: "Databases", value: 65 },
  { skill: "Web", value: 82 },
];

export const careerStats = [
  { name: "Software Engg.", value: 42 },
  { name: "Data Science", value: 24 },
  { name: "ML/AI", value: 18 },
  { name: "Design", value: 8 },
  { name: "Other", value: 8 },
];

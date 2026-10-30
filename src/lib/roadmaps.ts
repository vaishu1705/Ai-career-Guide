export type Level =
  | "Beginner"
  | "Intermediate"
  | "Advanced"
  | "Expert";

export interface QuizItem {
  q: string;
  options: string[];
  correct: number;
  explain?: string;
}

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  description: string;
  videoId?: string;
  searchQuery?: string;
}

export interface Module {
  id: string;
  level: Level;
  title: string;
  duration: string;
  summary: string;

  objectives: string[];
  practiceTask: string;
  miniProject: string;

  lessons: Lesson[];

  notes: {
    overview: string;
    keyPoints: string[];
    examples: string[];
    revision: string[];
  };

  quiz: QuizItem[];
}


// ============================================================
// HELPERS
// ============================================================

const lesson = (
  id: string,
  title: string,
  duration: string,
  description: string,
  searchQuery: string,
  videoId?: string,
): Lesson => ({
  id,
  title,
  duration,
  description,
  videoId,
  searchQuery,
});


const createNotes = (
  overview: string,
  keyPoints: string[],
  examples: string[],
  revision: string[],
) => ({
  overview,
  keyPoints,
  examples,
  revision,
});


const createModule = (
  level: Level,
  id: string,
  title: string,
  duration: string,
  summary: string,
  objectives: string[],
  practiceTask: string,
  miniProject: string,
  lessons: Lesson[],
  notes: Module["notes"],
  quiz: QuizItem[],
): Module => ({
  id,
  level,
  title,
  duration,
  summary,
  objectives,
  practiceTask,
  miniProject,
  lessons,
  notes,
  quiz,
});


// ============================================================
// SOFTWARE ENGINEER
// ============================================================

const SOFTWARE_ENGINEER: Module[] = [

  // ----------------------------------------------------------
  // BEGINNER
  // ----------------------------------------------------------

  createModule(
    "Beginner",
    "se-b1",
    "Programming Fundamentals",
    "2 weeks",
    "Learn the foundations of programming including variables, conditions, loops and functions.",

    [
      "Understand variables and data types",
      "Use conditional statements",
      "Use loops for repetition",
      "Create reusable functions",
      "Solve basic programming problems",
    ],

    "Create a console program that accepts student marks and calculates the grade using conditions and functions.",

    "Build a Student Grade Calculator that accepts multiple students and displays their grades.",

    [
      lesson(
        "se-b1-l1",
        "Variables and Data Types",
        "20 min",
        "Learn how variables store data and understand common programming data types.",
        "programming variables data types beginners",
      ),

      lesson(
        "se-b1-l2",
        "Conditional Statements",
        "25 min",
        "Learn if, else-if and else statements for decision making.",
        "programming conditional statements if else",
      ),

      lesson(
        "se-b1-l3",
        "Loops",
        "30 min",
        "Understand for loops, while loops and repeated execution.",
        "programming loops for while beginners",
      ),

      lesson(
        "se-b1-l4",
        "Functions",
        "30 min",
        "Learn how functions organize code and make programs reusable.",
        "programming functions beginners",
      ),

      lesson(
        "se-b1-l5",
        "Problem Solving",
        "35 min",
        "Combine programming fundamentals to solve simple problems.",
        "programming problem solving beginners",
      ),
    ],

    createNotes(
      "Programming fundamentals are the basic building blocks used to create software. Programs use variables to store information, conditions to make decisions, loops to repeat operations and functions to organize reusable logic.",

      [
        "Variables store values used by a program.",
        "Data types describe the kind of value being stored.",
        "if/else statements allow programs to make decisions.",
        "Loops repeat a block of code.",
        "Functions group reusable logic.",
        "Good programs break large problems into smaller steps.",
      ],

      [
        "if marks >= 90, assign grade A.",
        "A loop can process every student in a list.",
        "A function can calculate the average of marks.",
      ],

      [
        "Remember: input → process → output.",
        "Use conditions for decisions.",
        "Use loops for repetition.",
        "Use functions for reusable operations.",
      ],
    ),

    [
      {
        q: "Which programming construct is mainly used to make a decision?",
        options: [
          "Loop",
          "Condition",
          "Variable",
          "Comment",
        ],
        correct: 1,
        explain:
          "Conditional statements such as if and else are used to make decisions.",
      },

      {
        q: "Which construct is best suited for repeating an operation?",
        options: [
          "Loop",
          "Variable",
          "Function parameter",
          "Comment",
        ],
        correct: 0,
        explain:
          "Loops repeat a block of code while a condition or sequence requires it.",
      },

      {
        q: "What is the main purpose of a function?",
        options: [
          "Store only numbers",
          "Repeat reusable logic",
          "Delete variables",
          "Stop a program",
        ],
        correct: 1,
        explain:
          "Functions package logic into reusable blocks.",
      },

      {
        q: "What does a variable normally store?",
        options: [
          "A value",
          "Only source code",
          "Only functions",
          "Only comments",
        ],
        correct: 0,
        explain:
          "Variables are names associated with values used by a program.",
      },

      {
        q: "What is a good first step when solving a programming problem?",
        options: [
          "Write random code",
          "Understand and break down the problem",
          "Delete the requirements",
          "Skip testing",
        ],
        correct: 1,
        explain:
          "Understanding and breaking the problem into smaller steps makes implementation easier.",
      },
    ],
  ),


  createModule(
    "Beginner",
    "se-b2",
    "Version Control with Git",
    "2 weeks",
    "Learn Git fundamentals including repositories, commits, branches and collaboration.",

    [
      "Understand Git repositories",
      "Create commits",
      "Work with branches",
      "Understand merge operations",
      "Use GitHub for collaboration",
    ],

    "Create a Git repository, make at least five meaningful commits, create a feature branch and merge it back.",

    "Create a GitHub project with README documentation and demonstrate a feature branch workflow.",

    [
      lesson(
        "se-b2-l1",
        "Git Basics",
        "20 min",
        "Understand Git repositories and why version control is useful.",
        "Git version control tutorial beginners",
      ),

      lesson(
        "se-b2-l2",
        "Commits",
        "25 min",
        "Learn how to stage and commit changes.",
        "Git commits add commit tutorial",
      ),

      lesson(
        "se-b2-l3",
        "Branches",
        "25 min",
        "Learn how branches allow developers to work independently.",
        "Git branches tutorial beginners",
      ),

      lesson(
        "se-b2-l4",
        "Merge and Pull Requests",
        "30 min",
        "Understand merging and GitHub pull requests.",
        "Git merge pull request GitHub tutorial",
      ),
    ],

    createNotes(
      "Git is a distributed version control system used to track changes in source code and collaborate with other developers.",

      [
        "A repository contains project history.",
        "A commit records a set of changes.",
        "A branch provides an independent line of development.",
        "Merge combines changes from branches.",
        "GitHub hosts Git repositories online.",
        "Pull requests support code review and collaboration.",
      ],

      [
        "git status shows changed files.",
        "git add stages changes.",
        "git commit records staged changes.",
        "git switch -c feature creates a new branch.",
      ],

      [
        "Remember the basic flow: edit → add → commit.",
        "Use branches for features.",
        "Write meaningful commit messages.",
        "Review changes before merging.",
      ],
    ),

    [
      {
        q: "What does a Git commit represent?",
        options: [
          "A saved set of project changes",
          "A database table",
          "A programming language",
          "A server",
        ],
        correct: 0,
        explain:
          "A commit records a snapshot of changes in the repository.",
      },

      {
        q: "Why are branches useful?",
        options: [
          "They delete project history",
          "They allow separate lines of development",
          "They replace GitHub",
          "They prevent commits",
        ],
        correct: 1,
        explain:
          "Branches allow developers to work on features or fixes separately.",
      },

      {
        q: "Which command stages changes?",
        options: [
          "git add",
          "git delete",
          "git server",
          "git branch-remove",
        ],
        correct: 0,
        explain:
          "git add stages changes for the next commit.",
      },

      {
        q: "What is a pull request commonly used for?",
        options: [
          "Code review and merging changes",
          "Formatting a hard drive",
          "Installing Python",
          "Creating a database",
        ],
        correct: 0,
        explain:
          "Pull requests are commonly used to review and merge changes.",
      },

      {
        q: "GitHub is primarily used for:",
        options: [
          "Hosting and collaborating on repositories",
          "Replacing programming languages",
          "Creating CPUs",
          "Running operating systems",
        ],
        correct: 0,
        explain:
          "GitHub provides hosting and collaboration features around Git repositories.",
      },
    ],
  ),


  // ----------------------------------------------------------
  // INTERMEDIATE
  // ----------------------------------------------------------

  createModule(
    "Intermediate",
    "se-i1",
    "Data Structures & Algorithms",
    "6 weeks",
    "Learn arrays, linked lists, stacks, queues, trees, graphs and algorithmic complexity.",

    [
      "Understand common data structures",
      "Analyze time complexity",
      "Implement searching and sorting",
      "Understand trees and graphs",
      "Solve coding interview problems",
    ],

    "Implement binary search, merge sort, stack and queue operations and explain their time complexities.",

    "Build a DSA problem-solving repository containing implementations and explanations of major data structures and algorithms.",

    [
      lesson(
        "se-i1-l1",
        "Big O Complexity",
        "30 min",
        "Understand time and space complexity.",
        "Big O time complexity tutorial",
      ),

      lesson(
        "se-i1-l2",
        "Arrays and Linked Lists",
        "35 min",
        "Compare arrays and linked lists.",
        "arrays linked lists data structures",
      ),

      lesson(
        "se-i1-l3",
        "Stacks and Queues",
        "30 min",
        "Understand LIFO and FIFO data structures.",
        "stack queue data structures",
      ),

      lesson(
        "se-i1-l4",
        "Trees",
        "40 min",
        "Learn tree structures and traversal.",
        "binary trees traversal data structures",
      ),

      lesson(
        "se-i1-l5",
        "Graphs",
        "40 min",
        "Understand graph representations and traversal.",
        "graphs BFS DFS data structures",
      ),

      lesson(
        "se-i1-l6",
        "Searching and Sorting",
        "45 min",
        "Learn important searching and sorting algorithms.",
        "sorting searching algorithms tutorial",
      ),
    ],

    createNotes(
      "Data structures organize data while algorithms define procedures for processing it efficiently.",

      [
        "Arrays provide indexed access.",
        "Linked lists connect nodes through references.",
        "Stacks follow LIFO.",
        "Queues follow FIFO.",
        "Trees represent hierarchical relationships.",
        "Graphs represent relationships between nodes.",
        "Big O describes algorithm growth as input increases.",
      ],

      [
        "Binary search works on sorted data.",
        "A stack can implement undo functionality.",
        "A queue can represent a task-processing system.",
        "BFS is useful for level-based graph traversal.",
      ],

      [
        "Always analyze time and space complexity.",
        "Choose a data structure based on required operations.",
        "Practice patterns rather than memorizing solutions.",
      ],
    ),

    [
      {
        q: "What does O(log n) commonly describe?",
        options: [
          "Constant growth",
          "Logarithmic growth",
          "Quadratic growth",
          "Exponential growth",
        ],
        correct: 1,
        explain:
          "Binary search is a common example of an O(log n) algorithm.",
      },

      {
        q: "Which principle does a stack follow?",
        options: [
          "FIFO",
          "LIFO",
          "Random only",
          "Sorted order",
        ],
        correct: 1,
        explain:
          "A stack follows Last In, First Out.",
      },

      {
        q: "Which data structure normally follows FIFO?",
        options: [
          "Stack",
          "Queue",
          "Tree",
          "Heap",
        ],
        correct: 1,
        explain:
          "A queue processes elements in First In, First Out order.",
      },

      {
        q: "Binary search requires the data to be:",
        options: [
          "Random",
          "Sorted",
          "Encrypted",
          "Duplicated",
        ],
        correct: 1,
        explain:
          "Binary search relies on sorted ordering to eliminate half the search space.",
      },

      {
        q: "Which traversal explores neighbors level by level?",
        options: [
          "DFS",
          "BFS",
          "Binary search",
          "Merge sort",
        ],
        correct: 1,
        explain:
          "Breadth-first search explores a graph level by level.",
      },
    ],
  ),


  createModule(
    "Intermediate",
    "se-i2",
    "SQL & Databases",
    "4 weeks",
    "Learn relational databases, SQL queries, joins, indexes and transactions.",

    [
      "Understand relational databases",
      "Write SELECT queries",
      "Use joins",
      "Understand indexes",
      "Understand transactions",
    ],

    "Create a student database with tables for students, courses and enrollments and write at least ten SQL queries.",

    "Build a Course Management Database with relational tables, constraints, joins and reports.",

    [
      lesson(
        "se-i2-l1",
        "Database Fundamentals",
        "25 min",
        "Understand tables, rows, columns and relationships.",
        "SQL database fundamentals tutorial",
      ),

      lesson(
        "se-i2-l2",
        "SELECT Queries",
        "30 min",
        "Learn filtering, sorting and aggregations.",
        "SQL SELECT WHERE GROUP BY tutorial",
      ),

      lesson(
        "se-i2-l3",
        "SQL Joins",
        "35 min",
        "Understand inner, left and other joins.",
        "SQL joins tutorial beginners",
      ),

      lesson(
        "se-i2-l4",
        "Indexes",
        "25 min",
        "Learn why indexes improve query performance.",
        "SQL database indexes explained",
      ),

      lesson(
        "se-i2-l5",
        "Transactions",
        "25 min",
        "Understand transaction consistency and atomicity.",
        "SQL transactions ACID explained",
      ),
    ],

    createNotes(
      "Relational databases organize structured information into tables. SQL is used to query and manipulate relational data.",

      [
        "Tables contain rows and columns.",
        "Primary keys uniquely identify records.",
        "Foreign keys represent relationships.",
        "WHERE filters records.",
        "GROUP BY creates groups for aggregation.",
        "JOIN combines related tables.",
        "Indexes can improve read performance.",
        "Transactions help maintain data consistency.",
      ],

      [
        "SELECT students WHERE marks > 80.",
        "JOIN students with enrollments using student_id.",
        "COUNT can calculate the number of students.",
      ],

      [
        "Use primary keys for unique records.",
        "Use foreign keys for relationships.",
        "Index columns frequently used for searching.",
        "Use transactions when multiple operations must remain consistent.",
      ],
    ),

    [
      {
        q: "What is a primary key used for?",
        options: [
          "Uniquely identifying records",
          "Formatting text",
          "Creating passwords",
          "Starting a server",
        ],
        correct: 0,
        explain:
          "A primary key uniquely identifies each record in a table.",
      },

      {
        q: "Which SQL clause filters rows?",
        options: [
          "WHERE",
          "GROUP",
          "ORDER ONLY",
          "TABLE",
        ],
        correct: 0,
        explain:
          "WHERE filters rows based on a condition.",
      },

      {
        q: "What does a JOIN do?",
        options: [
          "Combines related data from tables",
          "Deletes every table",
          "Creates an operating system",
          "Encrypts the database",
        ],
        correct: 0,
        explain:
          "JOIN operations combine rows from related tables.",
      },

      {
        q: "What is an index mainly used for?",
        options: [
          "Improving query lookup performance",
          "Deleting records",
          "Replacing SQL",
          "Creating users only",
        ],
        correct: 0,
        explain:
          "Indexes can speed up searches and queries on indexed columns.",
      },

      {
        q: "Which property means a transaction happens completely or not at all?",
        options: [
          "Atomicity",
          "Visibility",
          "Sorting",
          "Indexing",
        ],
        correct: 0,
        explain:
          "Atomicity means a transaction is treated as an all-or-nothing operation.",
      },
    ],
  ),


  // ----------------------------------------------------------
  // ADVANCED
  // ----------------------------------------------------------

  createModule(
    "Advanced",
    "se-a1",
    "System Design Basics",
    "4 weeks",
    "Learn scalability, caching, load balancing, queues and distributed application concepts.",

    [
      "Understand scalable architecture",
      "Understand load balancing",
      "Use caching concepts",
      "Understand asynchronous queues",
      "Design basic distributed systems",
    ],

    "Design a scalable URL-shortening service and explain its components and data flow.",

    "Create a system design document for a scalable social application including APIs, database, cache and queues.",

    [
      lesson(
        "se-a1-l1",
        "Scalability Fundamentals",
        "30 min",
        "Understand vertical and horizontal scaling.",
        "system design scalability tutorial",
      ),

      lesson(
        "se-a1-l2",
        "Load Balancing",
        "25 min",
        "Understand how traffic is distributed between servers.",
        "load balancing system design",
      ),

      lesson(
        "se-a1-l3",
        "Caching",
        "30 min",
        "Learn caching strategies and use cases.",
        "caching system design Redis",
      ),

      lesson(
        "se-a1-l4",
        "Message Queues",
        "30 min",
        "Understand asynchronous processing.",
        "message queues system design",
      ),

      lesson(
        "se-a1-l5",
        "Design a Real System",
        "45 min",
        "Combine components into a complete architecture.",
        "system design interview architecture",
      ),
    ],

    createNotes(
      "System design focuses on designing software systems that meet functional and non-functional requirements such as scalability, availability and performance.",

      [
        "Vertical scaling increases resources on one machine.",
        "Horizontal scaling adds more machines.",
        "Load balancers distribute traffic.",
        "Caches reduce repeated database work.",
        "Queues support asynchronous processing.",
        "Database design strongly affects scalability.",
      ],

      [
        "A cache can store frequently requested profiles.",
        "A queue can process email notifications asynchronously.",
        "Multiple application servers can sit behind a load balancer.",
      ],

      [
        "Start with requirements.",
        "Estimate traffic and storage.",
        "Choose components based on bottlenecks.",
        "Think about failure scenarios.",
      ],
    ),

    [
      {
        q: "What does horizontal scaling mean?",
        options: [
          "Adding more servers",
          "Increasing one CPU only",
          "Deleting servers",
          "Reducing memory",
        ],
        correct: 0,
        explain:
          "Horizontal scaling increases capacity by adding additional instances or machines.",
      },

      {
        q: "What is a common purpose of a cache?",
        options: [
          "Reduce repeated expensive operations",
          "Delete databases",
          "Replace networking",
          "Compile Java",
        ],
        correct: 0,
        explain:
          "Caching stores frequently needed data so it can be retrieved faster.",
      },

      {
        q: "What does a load balancer commonly do?",
        options: [
          "Distributes traffic",
          "Writes application code",
          "Creates SQL tables",
          "Compresses every file",
        ],
        correct: 0,
        explain:
          "Load balancers distribute incoming requests among available servers.",
      },

      {
        q: "Why use a message queue?",
        options: [
          "For asynchronous processing",
          "For replacing all databases",
          "For writing CSS",
          "For storing passwords only",
        ],
        correct: 0,
        explain:
          "Queues allow work to be processed asynchronously and can smooth traffic spikes.",
      },

      {
        q: "What should be considered before selecting an architecture?",
        options: [
          "Requirements and constraints",
          "Only UI colors",
          "Only programming language",
          "Only file names",
        ],
        correct: 0,
        explain:
          "Architecture should be driven by requirements, constraints and expected workload.",
      },
    ],
  ),


  createModule(
    "Advanced",
    "se-a2",
    "Backend with Node.js",
    "4 weeks",
    "Build REST APIs with Node.js, Express, authentication and testing.",

    [
      "Understand Node.js",
      "Create Express APIs",
      "Use middleware",
      "Implement authentication",
      "Test REST endpoints",
    ],

    "Create a REST API with CRUD endpoints, validation and authentication.",

    "Build a complete backend API for a task-management application.",

    [
      lesson(
        "se-a2-l1",
        "Node.js Fundamentals",
        "30 min",
        "Understand the Node.js runtime and modules.",
        "Node.js tutorial beginners",
      ),

      lesson(
        "se-a2-l2",
        "Express",
        "30 min",
        "Build REST endpoints with Express.",
        "Express.js REST API tutorial",
      ),

      lesson(
        "se-a2-l3",
        "Middleware",
        "25 min",
        "Understand middleware and request processing.",
        "Express middleware tutorial",
      ),

      lesson(
        "se-a2-l4",
        "Authentication",
        "35 min",
        "Understand authentication and tokens.",
        "Node.js JWT authentication tutorial",
      ),

      lesson(
        "se-a2-l5",
        "API Testing",
        "25 min",
        "Test REST endpoints and error handling.",
        "REST API testing tutorial",
      ),
    ],

    createNotes(
      "Node.js allows JavaScript to run outside the browser. Express is commonly used to create HTTP APIs.",

      [
        "Node.js provides a JavaScript runtime.",
        "Express simplifies HTTP server development.",
        "Routes map HTTP requests to application logic.",
        "Middleware can process requests before handlers.",
        "Authentication verifies user identity.",
        "Validation protects APIs from invalid input.",
      ],

      [
        "GET can retrieve resources.",
        "POST can create resources.",
        "PUT/PATCH can update resources.",
        "DELETE can remove resources.",
      ],

      [
        "Validate incoming data.",
        "Return meaningful HTTP status codes.",
        "Never expose passwords.",
        "Protect authenticated endpoints.",
      ],
    ),

    [
      {
        q: "What is Node.js?",
        options: [
          "A JavaScript runtime",
          "A database",
          "A CSS framework",
          "A browser",
        ],
        correct: 0,
        explain:
          "Node.js is a runtime that allows JavaScript to execute outside the browser.",
      },

      {
        q: "Which HTTP method is commonly used to create a resource?",
        options: [
          "GET",
          "POST",
          "DELETE",
          "HEAD",
        ],
        correct: 1,
        explain:
          "POST is commonly used to create resources.",
      },

      {
        q: "What is middleware in Express?",
        options: [
          "A function involved in request processing",
          "A database table",
          "A CSS selector",
          "A compiler",
        ],
        correct: 0,
        explain:
          "Express middleware functions can inspect or modify requests and responses or control flow.",
      },

      {
        q: "Why should APIs validate input?",
        options: [
          "To reject invalid or unsafe data",
          "To make CSS faster",
          "To remove routes",
          "To disable authentication",
        ],
        correct: 0,
        explain:
          "Input validation helps maintain correctness and security.",
      },

      {
        q: "Authentication primarily answers which question?",
        options: [
          "Who are you?",
          "Which CSS color should be used?",
          "How many tables exist?",
          "Which font is installed?",
        ],
        correct: 0,
        explain:
          "Authentication verifies the identity of a user or client.",
      },
    ],
  ),


  // ----------------------------------------------------------
  // EXPERT
  // ----------------------------------------------------------

  createModule(
    "Expert",
    "se-e1",
    "Distributed Systems",
    "5 weeks",
    "Understand consistency, replication, fault tolerance and distributed system concepts.",

    [
      "Understand distributed architecture",
      "Understand replication",
      "Understand consistency models",
      "Understand fault tolerance",
      "Understand consensus concepts",
    ],

    "Design a distributed notification system that remains available when individual services fail.",

    "Design and document a distributed event-processing platform with replication, queues and failure recovery.",

    [
      lesson(
        "se-e1-l1",
        "Distributed System Fundamentals",
        "35 min",
        "Understand why distributed systems are used.",
        "distributed systems introduction",
      ),

      lesson(
        "se-e1-l2",
        "Replication",
        "35 min",
        "Learn how data is replicated between nodes.",
        "database replication distributed systems",
      ),

      lesson(
        "se-e1-l3",
        "Consistency",
        "40 min",
        "Understand consistency models and trade-offs.",
        "distributed systems consistency explained",
      ),

      lesson(
        "se-e1-l4",
        "Fault Tolerance",
        "35 min",
        "Learn techniques for handling failures.",
        "distributed systems fault tolerance",
      ),

      lesson(
        "se-e1-l5",
        "Consensus",
        "40 min",
        "Understand the purpose of consensus algorithms.",
        "distributed systems consensus Raft",
      ),
    ],

    createNotes(
      "Distributed systems consist of multiple computers cooperating to provide a service.",

      [
        "Replication improves availability and scalability.",
        "Distributed systems must handle failures.",
        "Consistency describes how replicas observe data.",
        "Network failures are an important design concern.",
        "Consensus helps nodes agree on shared decisions.",
      ],

      [
        "Multiple database replicas can improve availability.",
        "A leader-based system may route writes to one node.",
        "Retries can help recover from temporary failures.",
      ],

      [
        "Assume failures can happen.",
        "Think about consistency versus availability.",
        "Design for retries and duplicate messages.",
        "Monitor distributed components.",
      ],
    ),

    [
      {
        q: "Why is replication used?",
        options: [
          "To improve availability or scale reads",
          "To remove all data",
          "To replace APIs",
          "To format servers",
        ],
        correct: 0,
        explain:
          "Replication can improve availability and distribute workloads.",
      },

      {
        q: "What is an important challenge in distributed systems?",
        options: [
          "Network and node failures",
          "Choosing variable names",
          "Writing comments",
          "Changing fonts",
        ],
        correct: 0,
        explain:
          "Distributed systems must account for unreliable networks and component failures.",
      },

      {
        q: "What does consistency concern?",
        options: [
          "How replicas observe data",
          "CSS layout",
          "CPU temperature only",
          "File names",
        ],
        correct: 0,
        explain:
          "Consistency models define how and when updates become visible across replicas.",
      },

      {
        q: "What is consensus used for?",
        options: [
          "Helping distributed nodes agree",
          "Creating HTML",
          "Formatting JSON",
          "Compressing images",
        ],
        correct: 0,
        explain:
          "Consensus algorithms help distributed nodes agree on decisions.",
      },

      {
        q: "A distributed system should be designed with what assumption?",
        options: [
          "Components can fail",
          "Networks never fail",
          "Servers never restart",
          "Requests never duplicate",
        ],
        correct: 0,
        explain:
          "Failure is expected in distributed environments, so systems should tolerate it.",
      },
    ],
  ),


  createModule(
    "Expert",
    "se-e2",
    "Interview Prep & Projects",
    "5 weeks",
    "Prepare for software engineering interviews through DSA, system design and project discussions.",

    [
      "Practice coding problems",
      "Explain project architecture",
      "Practice system design",
      "Improve communication",
      "Prepare behavioral answers",
    ],

    "Complete five timed coding problems and one system design interview simulation.",

    "Build a polished portfolio project and prepare a complete technical explanation for interviews.",

    [
      lesson(
        "se-e2-l1",
        "Coding Interview Patterns",
        "35 min",
        "Learn common problem-solving patterns.",
        "coding interview patterns DSA",
      ),

      lesson(
        "se-e2-l2",
        "System Design Interview",
        "40 min",
        "Practice explaining scalable architectures.",
        "system design interview tutorial",
      ),

      lesson(
        "se-e2-l3",
        "Project Explanation",
        "30 min",
        "Learn how to explain your project clearly.",
        "how to explain projects technical interview",
      ),

      lesson(
        "se-e2-l4",
        "Behavioral Interview",
        "30 min",
        "Prepare structured answers for behavioral questions.",
        "behavioral interview STAR method",
      ),
    ],

    createNotes(
      "Interview preparation combines technical problem solving, system design, project communication and behavioral preparation.",

      [
        "Understand the problem before coding.",
        "Explain your approach before implementation.",
        "Discuss complexity.",
        "Know the architecture of your projects.",
        "Use structured behavioral answers.",
      ],

      [
        "Explain a project using problem → solution → architecture → result.",
        "For coding questions, discuss brute force before optimization.",
        "Use STAR for behavioral questions.",
      ],

      [
        "Practice under time limits.",
        "Communicate while solving.",
        "Review mistakes after every mock interview.",
      ],
    ),

    [
      {
        q: "What should you do before coding an interview problem?",
        options: [
          "Understand the requirements",
          "Immediately write code",
          "Skip examples",
          "Guess the answer",
        ],
        correct: 0,
        explain:
          "Understanding the requirements and examples helps avoid solving the wrong problem.",
      },

      {
        q: "Why discuss complexity in a coding interview?",
        options: [
          "To show efficiency considerations",
          "To avoid testing",
          "To replace the solution",
          "To discuss UI colors",
        ],
        correct: 0,
        explain:
          "Complexity analysis demonstrates awareness of time and space efficiency.",
      },

      {
        q: "What should a project explanation include?",
        options: [
          "Problem, solution and architecture",
          "Only the project name",
          "Only the programming language",
          "Only screenshots",
        ],
        correct: 0,
        explain:
          "A strong explanation covers the problem, solution, technical design and outcomes.",
      },

      {
        q: "What does STAR stand for?",
        options: [
          "Situation, Task, Action, Result",
          "System, Test, API, Route",
          "Search, Token, Array, Runtime",
          "Start, Track, Apply, Repeat",
        ],
        correct: 0,
        explain:
          "STAR stands for Situation, Task, Action and Result.",
      },

      {
        q: "What is one effective way to improve interview performance?",
        options: [
          "Practice and review mistakes",
          "Avoid mock interviews",
          "Memorize every answer",
          "Never explain your reasoning",
        ],
        correct: 0,
        explain:
          "Regular practice combined with reviewing mistakes improves interview performance.",
      },
    ],
  ),
];


// ============================================================
// FULL STACK DEVELOPER
// ============================================================

const FULL_STACK: Module[] = [

  createModule(
    "Beginner",
    "fs-b1",
    "HTML & CSS",
    "2 weeks",
    "Learn semantic HTML, CSS fundamentals, responsive layouts and modern web design.",

    [
      "Write semantic HTML",
      "Understand CSS selectors",
      "Use Flexbox and Grid",
      "Create responsive pages",
      "Build accessible interfaces",
    ],

    "Create a responsive personal portfolio page using semantic HTML and CSS.",

    "Build a responsive portfolio website with Home, About, Skills, Projects and Contact sections.",

    [
      lesson(
        "fs-b1-l1",
        "HTML Fundamentals",
        "25 min",
        "Learn HTML structure and semantic elements.",
        "HTML tutorial beginners",
      ),

      lesson(
        "fs-b1-l2",
        "CSS Fundamentals",
        "30 min",
        "Learn selectors, properties and the box model.",
        "CSS tutorial beginners",
      ),

      lesson(
        "fs-b1-l3",
        "Flexbox",
        "30 min",
        "Create flexible layouts with Flexbox.",
        "CSS Flexbox tutorial",
      ),

      lesson(
        "fs-b1-l4",
        "CSS Grid",
        "30 min",
        "Build two-dimensional layouts with CSS Grid.",
        "CSS Grid tutorial",
      ),

      lesson(
        "fs-b1-l5",
        "Responsive Design",
        "30 min",
        "Make websites work across screen sizes.",
        "responsive web design tutorial",
      ),
    ],

    createNotes(
      "HTML provides structure while CSS controls presentation and layout.",

      [
        "Use semantic HTML elements.",
        "CSS selectors target elements.",
        "The box model includes content, padding, border and margin.",
        "Flexbox is useful for one-dimensional layouts.",
        "Grid is useful for two-dimensional layouts.",
        "Media queries support responsive design.",
      ],

      [
        "Use header, nav, main and footer for page structure.",
        "Use Flexbox to align navigation items.",
        "Use Grid for card layouts.",
      ],

      [
        "Separate structure from styling.",
        "Prefer semantic HTML.",
        "Test responsive layouts on different widths.",
      ],
    ),

    [
      {
        q: "What is HTML mainly responsible for?",
        options: [
          "Page structure",
          "Database storage",
          "Server hosting",
          "Password hashing",
        ],
        correct: 0,
        explain:
          "HTML defines the structure and content of a web page.",
      },

      {
        q: "Which CSS layout system is especially useful for two-dimensional layouts?",
        options: [
          "Grid",
          "Variables",
          "Comments",
          "Selectors only",
        ],
        correct: 0,
        explain:
          "CSS Grid is designed for two-dimensional row and column layouts.",
      },

      {
        q: "What does responsive design mean?",
        options: [
          "Adapting the interface to different screen sizes",
          "Using only desktop screens",
          "Removing CSS",
          "Using only images",
        ],
        correct: 0,
        explain:
          "Responsive design adapts a website to different viewport sizes.",
      },

      {
        q: "Which is a semantic HTML element?",
        options: [
          "<article>",
          "<color>",
          "<stylebox>",
          "<screen>",
        ],
        correct: 0,
        explain:
          "<article> communicates the meaning or role of its content.",
      },

      {
        q: "What is the CSS box model related to?",
        options: [
          "Content, padding, border and margin",
          "Only fonts",
          "Only JavaScript",
          "Database rows",
        ],
        correct: 0,
        explain:
          "The CSS box model describes content, padding, border and margin.",
      },
    ],
  ),


  createModule(
    "Beginner",
    "fs-b2",
    "JavaScript Essentials",
    "3 weeks",
    "Learn modern JavaScript including variables, functions, arrays, objects, DOM and asynchronous programming.",

    [
      "Understand modern JavaScript syntax",
      "Work with arrays and objects",
      "Use functions",
      "Manipulate the DOM",
      "Understand asynchronous code",
    ],

    "Build a JavaScript to-do list with add, edit, delete and complete functionality.",

    "Create a browser-based expense tracker using JavaScript and localStorage.",

    [
      lesson(
        "fs-b2-l1",
        "JavaScript Basics",
        "30 min",
        "Variables, data types and operators.",
        "JavaScript basics tutorial",
      ),

      lesson(
        "fs-b2-l2",
        "Functions and Arrays",
        "35 min",
        "Work with functions, arrays and common methods.",
        "JavaScript functions arrays tutorial",
      ),

      lesson(
        "fs-b2-l3",
        "Objects",
        "30 min",
        "Understand JavaScript objects and destructuring.",
        "JavaScript objects destructuring",
      ),

      lesson(
        "fs-b2-l4",
        "DOM Manipulation",
        "35 min",
        "Update web pages using JavaScript.",
        "JavaScript DOM manipulation tutorial",
      ),

      lesson(
        "fs-b2-l5",
        "Async JavaScript",
        "40 min",
        "Understand promises, async and await.",
        "JavaScript async await promises",
      ),
    ],

    createNotes(
      "JavaScript adds behavior and interactivity to web pages.",

      [
        "const and let are preferred for variable declarations.",
        "Arrays store ordered collections.",
        "Objects store key-value data.",
        "Functions encapsulate reusable logic.",
        "The DOM represents the web page.",
        "Promises represent asynchronous operations.",
        "async/await provides readable asynchronous syntax.",
      ],

      [
        "map transforms array elements.",
        "filter selects elements.",
        "fetch can request data from an API.",
        "addEventListener responds to user actions.",
      ],

      [
        "Prefer const when reassignment is unnecessary.",
        "Use meaningful function names.",
        "Handle asynchronous errors.",
        "Avoid unnecessary DOM operations.",
      ],
    ),

    [
      {
        q: "Which keyword is commonly preferred when a variable will not be reassigned?",
        options: [
          "const",
          "delete",
          "static-only",
          "fixed",
        ],
        correct: 0,
        explain:
          "const communicates that the variable binding should not be reassigned.",
      },

      {
        q: "Which array method creates a new array by transforming elements?",
        options: [
          "map",
          "remove",
          "destroy",
          "compile",
        ],
        correct: 0,
        explain:
          "map transforms each element and returns a new array.",
      },

      {
        q: "What does the DOM represent?",
        options: [
          "The document structure",
          "A database server",
          "A CSS compiler",
          "A Git repository",
        ],
        correct: 0,
        explain:
          "The DOM represents the document structure as objects that JavaScript can manipulate.",
      },

      {
        q: "What does async/await help with?",
        options: [
          "Writing asynchronous code",
          "Creating CSS selectors",
          "Creating databases",
          "Compiling HTML",
        ],
        correct: 0,
        explain:
          "async/await provides a convenient syntax for working with promises.",
      },

      {
        q: "What does filter() generally do?",
        options: [
          "Selects elements matching a condition",
          "Sorts a database",
          "Deletes JavaScript",
          "Creates a server",
        ],
        correct: 0,
        explain:
          "filter returns elements that satisfy the supplied condition.",
      },
    ],
  ),


  createModule(
    "Intermediate",
    "fs-i1",
    "React",
    "4 weeks",
    "Learn React components, props, state, hooks and application structure.",

    [
      "Build React components",
      "Pass props",
      "Manage state",
      "Use hooks",
      "Build reusable interfaces",
    ],

    "Build a React task manager using components, state and event handlers.",

    "Build a React dashboard with reusable cards, navigation and API-driven data.",

    [
      lesson(
        "fs-i1-l1",
        "React Components",
        "30 min",
        "Understand component-based UI development.",
        "React components tutorial",
      ),

      lesson(
        "fs-i1-l2",
        "Props",
        "25 min",
        "Pass data between components.",
        "React props tutorial",
      ),

      lesson(
        "fs-i1-l3",
        "State",
        "30 min",
        "Manage changing component data.",
        "React useState tutorial",
      ),

      lesson(
        "fs-i1-l4",
        "Hooks",
        "35 min",
        "Understand common React hooks.",
        "React hooks useEffect useState",
      ),

      lesson(
        "fs-i1-l5",
        "Project Structure",
        "30 min",
        "Organize a maintainable React application.",
        "React project architecture",
      ),
    ],

    createNotes(
      "React is a component-based library for building user interfaces.",

      [
        "Components represent reusable UI pieces.",
        "Props pass data into components.",
        "State represents changing component data.",
        "useState manages state.",
        "useEffect handles side effects.",
        "Components should have clear responsibilities.",
      ],

      [
        "A Button component can receive a label through props.",
        "useState can store a form value.",
        "useEffect can load data from an API.",
      ],

      [
        "Keep components focused.",
        "Do not mutate state directly.",
        "Use keys when rendering lists.",
        "Separate reusable UI from business logic.",
      ],
    ),

    [
      {
        q: "What are React components?",
        options: [
          "Reusable UI building blocks",
          "Database tables",
          "HTTP servers",
          "CSS files only",
        ],
        correct: 0,
        explain:
          "Components are reusable building blocks of React interfaces.",
      },

      {
        q: "What are props used for?",
        options: [
          "Passing data into components",
          "Deleting state",
          "Creating databases",
          "Starting servers",
        ],
        correct: 0,
        explain:
          "Props allow data to be passed from a parent component to a child.",
      },

      {
        q: "Which hook is commonly used for component state?",
        options: [
          "useState",
          "useDatabase",
          "useCSSOnly",
          "useServer",
        ],
        correct: 0,
        explain:
          "useState is the standard React hook for local component state.",
      },

      {
        q: "Which hook is commonly used for side effects?",
        options: [
          "useEffect",
          "useStyle",
          "useDatabaseOnly",
          "useHTML",
        ],
        correct: 0,
        explain:
          "useEffect is commonly used for side effects such as data fetching.",
      },

      {
        q: "How should React state normally be updated?",
        options: [
          "Using the state setter",
          "Direct mutation",
          "Editing the DOM manually",
          "Restarting the browser",
        ],
        correct: 0,
        explain:
          "React state should be updated through its provided setter or appropriate state management mechanism.",
      },
    ],
  ),


  createModule(
    "Intermediate",
    "fs-i2",
    "Node.js & Express",
    "4 weeks",
    "Build REST APIs using Node.js and Express with validation and authentication.",

    [
      "Create REST endpoints",
      "Use Express middleware",
      "Handle errors",
      "Validate requests",
      "Implement authentication",
    ],

    "Create a CRUD REST API for managing tasks.",

    "Build an authenticated backend for a task management application.",

    [
      lesson(
        "fs-i2-l1",
        "Node.js",
        "30 min",
        "Understand the Node.js runtime.",
        "Node.js tutorial",
      ),

      lesson(
        "fs-i2-l2",
        "Express Routes",
        "30 min",
        "Create REST endpoints.",
        "Express REST API tutorial",
      ),

      lesson(
        "fs-i2-l3",
        "Middleware",
        "25 min",
        "Process requests with middleware.",
        "Express middleware tutorial",
      ),

      lesson(
        "fs-i2-l4",
        "Authentication",
        "35 min",
        "Protect API routes.",
        "Express JWT authentication",
      ),
    ],

    createNotes(
      "Node.js and Express are commonly used to create backend APIs.",

      [
        "REST APIs expose resources through HTTP.",
        "Express provides routing and middleware.",
        "Middleware can validate and authenticate requests.",
        "API errors should be handled consistently.",
        "Authentication protects private resources.",
      ],

      [
        "GET /tasks retrieves tasks.",
        "POST /tasks creates a task.",
        "PUT /tasks/:id updates a task.",
        "DELETE /tasks/:id removes a task.",
      ],

      [
        "Use meaningful HTTP status codes.",
        "Validate request bodies.",
        "Keep authentication middleware reusable.",
      ],
    ),

    [
      {
        q: "Which HTTP method is commonly used to retrieve data?",
        options: [
          "GET",
          "POST",
          "DELETE",
          "PATCH-ONLY",
        ],
        correct: 0,
        explain:
          "GET is commonly used to retrieve resources.",
      },

      {
        q: "What is Express middleware?",
        options: [
          "A function that participates in request processing",
          "A database engine",
          "A browser",
          "A CSS library",
        ],
        correct: 0,
        explain:
          "Middleware functions can process requests and control the request pipeline.",
      },

      {
        q: "Why validate API input?",
        options: [
          "To reject invalid data",
          "To remove all endpoints",
          "To disable security",
          "To replace HTTP",
        ],
        correct: 0,
        explain:
          "Validation helps ensure incoming data meets expected rules.",
      },

      {
        q: "Which endpoint style represents one specific task?",
        options: [
          "/tasks/42",
          "/alltasksforever",
          "/database-table",
          "/server",
        ],
        correct: 0,
        explain:
          "A resource identifier such as /tasks/42 represents one specific task.",
      },

      {
        q: "Authentication protects:",
        options: [
          "Restricted resources",
          "Only CSS",
          "Only HTML comments",
          "Only images",
        ],
        correct: 0,
        explain:
          "Authentication is used to verify users before allowing access to protected resources.",
      },
    ],
  ),


  createModule(
    "Advanced",
    "fs-a1",
    "Databases (SQL + NoSQL)",
    "4 weeks",
    "Understand relational and document databases and choose appropriate data models.",

    [
      "Understand SQL databases",
      "Understand NoSQL databases",
      "Design schemas",
      "Write efficient queries",
      "Choose appropriate storage models",
    ],

    "Design the same application data model using both PostgreSQL-style tables and MongoDB-style documents.",

    "Build a product catalog using a relational database or MongoDB with search and filtering.",

    [
      lesson(
        "fs-a1-l1",
        "SQL Databases",
        "30 min",
        "Understand relational data modeling.",
        "SQL database design tutorial",
      ),

      lesson(
        "fs-a1-l2",
        "NoSQL Databases",
        "30 min",
        "Understand document databases.",
        "MongoDB NoSQL tutorial",
      ),

      lesson(
        "fs-a1-l3",
        "Schema Design",
        "35 min",
        "Learn how data modeling decisions affect applications.",
        "database schema design tutorial",
      ),

      lesson(
        "fs-a1-l4",
        "Performance",
        "30 min",
        "Understand indexing and query performance.",
        "database indexing performance",
      ),
    ],

    createNotes(
      "SQL databases organize structured data into related tables, while NoSQL databases provide alternative models such as documents.",

      [
        "SQL databases commonly use tables and relationships.",
        "NoSQL document databases store JSON-like documents.",
        "Schema design should match application requirements.",
        "Indexes can improve query performance.",
        "Data consistency and scalability influence database choice.",
      ],

      [
        "Orders and customers can be related through keys in SQL.",
        "A MongoDB order can contain embedded item information.",
      ],

      [
        "Choose a database based on requirements.",
        "Consider query patterns before designing indexes.",
        "Avoid unnecessary duplication unless it serves a clear purpose.",
      ],
    ),

    [
      {
        q: "What is a common SQL database structure?",
        options: [
          "Tables and relationships",
          "Only images",
          "Only HTML pages",
          "Git branches",
        ],
        correct: 0,
        explain:
          "Relational SQL databases organize data into tables and relationships.",
      },

      {
        q: "MongoDB primarily stores data as:",
        options: [
          "Documents",
          "CSS rules",
          "Git commits",
          "CPU instructions",
        ],
        correct: 0,
        explain:
          "MongoDB is a document-oriented database.",
      },

      {
        q: "Why are indexes used?",
        options: [
          "To improve query performance",
          "To delete all records",
          "To replace schemas",
          "To create UI components",
        ],
        correct: 0,
        explain:
          "Indexes can make certain queries faster.",
      },

      {
        q: "What should influence database selection?",
        options: [
          "Application requirements and access patterns",
          "Only developer preference",
          "Only screen size",
          "Only CSS",
        ],
        correct: 0,
        explain:
          "Database selection should consider requirements, workload, consistency and access patterns.",
      },

      {
        q: "What is schema design concerned with?",
        options: [
          "How data is organized",
          "How colors are selected",
          "How buttons animate",
          "How Git branches merge",
        ],
        correct: 0,
        explain:
          "Schema design determines how application data is structured and related.",
      },
    ],
  ),


  createModule(
    "Advanced",
    "fs-a2",
    "Deployment & DevOps",
    "4 weeks",
    "Learn Docker, CI/CD, deployment and cloud application basics.",

    [
      "Understand containers",
      "Create Docker images",
      "Understand CI/CD",
      "Deploy applications",
      "Understand basic cloud concepts",
    ],

    "Dockerize a web application and create a basic CI workflow.",

    "Deploy a full-stack application with a frontend, backend and database.",

    [
      lesson(
        "fs-a2-l1",
        "Docker Fundamentals",
        "30 min",
        "Understand containers and images.",
        "Docker tutorial beginners",
      ),

      lesson(
        "fs-a2-l2",
        "Dockerfile",
        "30 min",
        "Create Docker images.",
        "Dockerfile tutorial",
      ),

      lesson(
        "fs-a2-l3",
        "CI/CD",
        "35 min",
        "Understand automated build and deployment pipelines.",
        "CI CD GitHub Actions tutorial",
      ),

      lesson(
        "fs-a2-l4",
        "Cloud Deployment",
        "35 min",
        "Understand basic cloud deployment architecture.",
        "cloud deployment full stack tutorial",
      ),
    ],

    createNotes(
      "DevOps combines development and operations practices to automate building, testing and deployment.",

      [
        "Containers package applications and dependencies.",
        "Docker images define container environments.",
        "CI automates build and testing.",
        "CD automates delivery or deployment.",
        "Environment variables store configuration.",
      ],

      [
        "A Dockerfile defines application image instructions.",
        "A CI pipeline can run tests on every push.",
      ],

      [
        "Keep secrets out of source code.",
        "Build reproducible deployments.",
        "Automate repetitive tasks.",
        "Monitor deployed applications.",
      ],
    ),

    [
      {
        q: "What is Docker commonly used for?",
        options: [
          "Packaging applications into containers",
          "Writing SQL queries",
          "Designing logos",
          "Creating Git commits",
        ],
        correct: 0,
        explain:
          "Docker packages applications and their dependencies into containers.",
      },

      {
        q: "What does CI commonly automate?",
        options: [
          "Builds and tests",
          "Only CSS",
          "Database deletion",
          "Manual deployment only",
        ],
        correct: 0,
        explain:
          "Continuous Integration commonly automates building and testing changes.",
      },

      {
        q: "Where should production secrets normally be stored?",
        options: [
          "Secure configuration or secret management",
          "Public source code",
          "README screenshots",
          "HTML comments",
        ],
        correct: 0,
        explain:
          "Secrets should be stored using secure configuration or secret-management mechanisms.",
      },

      {
        q: "What is a Docker image?",
        options: [
          "A template used to create containers",
          "A CSS file",
          "A Git branch",
          "A SQL query",
        ],
        correct: 0,
        explain:
          "A Docker image contains the filesystem and configuration used to create containers.",
      },

      {
        q: "What is the purpose of deployment automation?",
        options: [
          "Make releases repeatable and less manual",
          "Remove testing",
          "Delete infrastructure",
          "Disable monitoring",
        ],
        correct: 0,
        explain:
          "Automation makes builds and deployments more repeatable and reliable.",
      },
    ],
  ),


  createModule(
    "Expert",
    "fs-e1",
    "Full-Stack Capstone",
    "6 weeks",
    "Build and ship a production-style full-stack application.",

    [
      "Design a complete application",
      "Build frontend and backend",
      "Connect a database",
      "Implement authentication",
      "Deploy the application",
    ],

    "Create a complete full-stack application specification and implement the core user flow.",

    "Ship a production-style full-stack application with authentication, database, API, frontend and deployment.",

    [
      lesson(
        "fs-e1-l1",
        "Application Architecture",
        "35 min",
        "Plan frontend, backend and database components.",
        "full stack application architecture",
      ),

      lesson(
        "fs-e1-l2",
        "API Integration",
        "35 min",
        "Connect frontend and backend.",
        "React REST API integration",
      ),

      lesson(
        "fs-e1-l3",
        "Authentication",
        "35 min",
        "Implement secure authentication flows.",
        "full stack authentication tutorial",
      ),

      lesson(
        "fs-e1-l4",
        "Deployment",
        "40 min",
        "Deploy a complete application.",
        "full stack deployment tutorial",
      ),

      lesson(
        "fs-e1-l5",
        "Production Readiness",
        "35 min",
        "Review security, performance and reliability.",
        "production readiness web application",
      ),
    ],

    createNotes(
      "A full-stack application combines frontend, backend, database and infrastructure into one working system.",

      [
        "Define requirements before implementation.",
        "Keep frontend and backend responsibilities clear.",
        "Use APIs to exchange data.",
        "Protect authenticated routes.",
        "Validate user input.",
        "Deploy using reproducible processes.",
      ],

      [
        "React can consume REST endpoints.",
        "The backend can validate requests before database operations.",
        "Authentication can restrict private routes.",
      ],

      [
        "Test the complete user journey.",
        "Protect secrets.",
        "Handle errors gracefully.",
        "Monitor production systems.",
      ],
    ),

    [
      {
        q: "What does full-stack development include?",
        options: [
          "Frontend and backend development",
          "Only CSS",
          "Only database administration",
          "Only testing",
        ],
        correct: 0,
        explain:
          "Full-stack development typically covers both client-side and server-side parts of an application.",
      },

      {
        q: "Why are APIs useful in full-stack applications?",
        options: [
          "They allow systems to exchange data",
          "They replace databases",
          "They remove authentication",
          "They only style pages",
        ],
        correct: 0,
        explain:
          "APIs provide a structured way for frontend and backend systems to communicate.",
      },

      {
        q: "What should be protected in a production application?",
        options: [
          "Secrets and sensitive credentials",
          "Public CSS",
          "Public images",
          "Page titles",
        ],
        correct: 0,
        explain:
          "Secrets and credentials must be protected from unauthorized access.",
      },

      {
        q: "What should happen before deployment?",
        options: [
          "Test important application flows",
          "Remove error handling",
          "Delete backups",
          "Disable security",
        ],
        correct: 0,
        explain:
          "Testing important flows reduces the chance of deploying broken functionality.",
      },

      {
        q: "A production-ready application should consider:",
        options: [
          "Security, reliability and performance",
          "Only colors",
          "Only fonts",
          "Only animations",
        ],
        correct: 0,
        explain:
          "Production readiness includes security, reliability, performance and maintainability.",
      },
    ],
  ),


  createModule(
    "Expert",
    "fs-e2",
    "Interview Prep",
    "4 weeks",
    "Prepare for frontend, backend, full-stack and system design interviews.",

    [
      "Practice coding",
      "Explain React concepts",
      "Explain backend architecture",
      "Practice system design",
      "Prepare behavioral answers",
    ],

    "Complete a mock full-stack interview covering coding, React, APIs, databases and system design.",

    "Create a portfolio-ready full-stack project and prepare a technical presentation for it.",

    [
      lesson(
        "fs-e2-l1",
        "Frontend Interview",
        "35 min",
        "Review JavaScript and React interview topics.",
        "frontend React interview preparation",
      ),

      lesson(
        "fs-e2-l2",
        "Backend Interview",
        "35 min",
        "Review APIs, databases and authentication.",
        "backend interview preparation",
      ),

      lesson(
        "fs-e2-l3",
        "System Design",
        "40 min",
        "Practice full-stack architecture questions.",
        "full stack system design interview",
      ),

      lesson(
        "fs-e2-l4",
        "Behavioral Interview",
        "30 min",
        "Prepare structured behavioral responses.",
        "STAR behavioral interview",
      ),
    ],

    createNotes(
      "Full-stack interviews evaluate programming fundamentals, frontend frameworks, backend APIs, databases, architecture and communication.",

      [
        "Know JavaScript fundamentals.",
        "Understand React rendering and state.",
        "Know HTTP and REST.",
        "Understand database design.",
        "Practice system design.",
        "Explain projects clearly.",
      ],

      [
        "Explain why a specific database was selected.",
        "Explain how authentication works.",
        "Explain how frontend state interacts with APIs.",
      ],

      [
        "Practice speaking while solving.",
        "Understand concepts instead of memorizing definitions.",
        "Prepare examples from your own projects.",
      ],
    ),

    [
      {
        q: "What should a full-stack candidate understand?",
        options: [
          "Frontend, backend and data concepts",
          "Only CSS",
          "Only Git",
          "Only HTML",
        ],
        correct: 0,
        explain:
          "Full-stack roles generally require understanding across frontend, backend and data layers.",
      },

      {
        q: "Why should you understand your project architecture?",
        options: [
          "Interviewers may ask why design decisions were made",
          "It changes CSS automatically",
          "It removes testing",
          "It replaces coding",
        ],
        correct: 0,
        explain:
          "Interviewers often ask candidates to explain architecture and technical decisions.",
      },

      {
        q: "What is an important backend interview topic?",
        options: [
          "HTTP and APIs",
          "Only fonts",
          "Only animations",
          "Only HTML tags",
        ],
        correct: 0,
        explain:
          "HTTP and API design are important backend topics.",
      },

      {
        q: "What is useful during a coding interview?",
        options: [
          "Explain your reasoning",
          "Stay silent",
          "Skip edge cases",
          "Avoid testing",
        ],
        correct: 0,
        explain:
          "Communicating your reasoning helps the interviewer understand your approach.",
      },

      {
        q: "What should you do after a mock interview?",
        options: [
          "Review mistakes and improve",
          "Ignore feedback",
          "Delete the solution",
          "Stop practicing",
        ],
        correct: 0,
        explain:
          "Reviewing mistakes turns practice into measurable improvement.",
      },
    ],
  ),
];


// ============================================================
// DATA SCIENTIST
// ============================================================

const DATA_SCIENTIST: Module[] = [

  createModule(
    "Beginner",
    "ds-b1",
    "Python for Data",
    "3 weeks",
    "Learn Python, NumPy and pandas for data analysis.",

    [
      "Use Python syntax",
      "Work with NumPy arrays",
      "Use pandas DataFrames",
      "Clean basic datasets",
      "Perform exploratory analysis",
    ],

    "Load a CSV dataset, clean missing values and calculate summary statistics using pandas.",

    "Build an exploratory data analysis notebook for a real-world dataset.",

    [
      lesson(
        "ds-b1-l1",
        "Python Basics",
        "30 min",
        "Learn Python syntax and data structures.",
        "Python data science beginners",
      ),

      lesson(
        "ds-b1-l2",
        "NumPy",
        "30 min",
        "Learn numerical arrays and vectorized operations.",
        "NumPy tutorial beginners",
      ),

      lesson(
        "ds-b1-l3",
        "pandas",
        "35 min",
        "Work with DataFrames and Series.",
        "pandas DataFrame tutorial",
      ),

      lesson(
        "ds-b1-l4",
        "Data Cleaning",
        "35 min",
        "Handle missing and inconsistent data.",
        "pandas data cleaning tutorial",
      ),
    ],

    createNotes(
      "Python with NumPy and pandas is widely used for data analysis.",

      [
        "NumPy provides efficient numerical arrays.",
        "pandas provides Series and DataFrame structures.",
        "Data cleaning handles missing and inconsistent values.",
        "Descriptive statistics summarize datasets.",
        "Exploratory analysis helps identify patterns.",
      ],

      [
        "df.head() previews data.",
        "df.isna() helps identify missing values.",
        "df.describe() provides descriptive statistics.",
      ],

      [
        "Inspect data before analysis.",
        "Check data types.",
        "Handle missing values intentionally.",
        "Document transformations.",
      ],
    ),

    [
      {
        q: "Which library provides the DataFrame structure?",
        options: [
          "pandas",
          "React",
          "Express",
          "Git",
        ],
        correct: 0,
        explain:
          "pandas provides the DataFrame data structure.",
      },

      {
        q: "What is NumPy mainly used for?",
        options: [
          "Numerical computing",
          "Web routing",
          "Git hosting",
          "CSS styling",
        ],
        correct: 0,
        explain:
          "NumPy provides numerical arrays and operations.",
      },

      {
        q: "What does df.head() commonly do?",
        options: [
          "Shows the first rows",
          "Deletes the DataFrame",
          "Trains a model",
          "Creates a server",
        ],
        correct: 0,
        explain:
          "head() returns the first rows of a DataFrame by default.",
      },

      {
        q: "Why clean data before analysis?",
        options: [
          "To reduce errors and inconsistencies",
          "To make charts colorful",
          "To replace Python",
          "To remove all rows",
        ],
        correct: 0,
        explain:
          "Cleaning improves the quality and reliability of analysis.",
      },

      {
        q: "What does descriptive statistics provide?",
        options: [
          "Summary information about data",
          "Only HTML",
          "Only source code",
          "Only images",
        ],
        correct: 0,
        explain:
          "Descriptive statistics summarize important properties of a dataset.",
      },
    ],
  ),


  createModule(
    "Beginner",
    "ds-b2",
    "Statistics Foundations",
    "3 weeks",
    "Learn distributions, probability, sampling, hypothesis testing and descriptive statistics.",

    [
      "Understand mean and median",
      "Understand probability",
      "Understand distributions",
      "Understand sampling",
      "Understand hypothesis testing",
    ],

    "Analyze a dataset using mean, median, standard deviation and a simple hypothesis test.",

    "Create a statistical analysis report explaining patterns in a dataset.",

    [
      lesson(
        "ds-b2-l1",
        "Descriptive Statistics",
        "30 min",
        "Learn mean, median, variance and standard deviation.",
        "statistics mean median standard deviation",
      ),

      lesson(
        "ds-b2-l2",
        "Probability",
        "30 min",
        "Understand probability fundamentals.",
        "probability statistics beginners",
      ),

      lesson(
        "ds-b2-l3",
        "Distributions",
        "35 min",
        "Learn common statistical distributions.",
        "probability distributions statistics",
      ),

      lesson(
        "ds-b2-l4",
        "Hypothesis Testing",
        "40 min",
        "Understand hypotheses, p-values and tests.",
        "hypothesis testing p value statistics",
      ),
    ],

    createNotes(
      "Statistics provides mathematical tools for understanding data and uncertainty.",

      [
        "Mean is the arithmetic average.",
        "Median is the middle value after ordering.",
        "Standard deviation measures spread.",
        "Probability describes uncertainty.",
        "A hypothesis test evaluates evidence against a null hypothesis.",
        "A p-value is interpreted in the context of a statistical test.",
      ],

      [
        "The mean can be strongly affected by extreme values.",
        "The median is often more robust to outliers.",
      ],

      [
        "Choose statistics appropriate to the data.",
        "Do not interpret p-values without context.",
        "Distinguish correlation from causation.",
      ],
    ),

    [
      {
        q: "Which measure is often less affected by extreme values?",
        options: [
          "Median",
          "Mean",
          "Maximum",
          "Sum",
        ],
        correct: 0,
        explain:
          "The median is generally more robust to extreme values than the mean.",
      },

      {
        q: "What does standard deviation describe?",
        options: [
          "Spread of values",
          "Number of columns",
          "Database size",
          "HTML structure",
        ],
        correct: 0,
        explain:
          "Standard deviation measures how spread out values are around the mean.",
      },

      {
        q: "What does probability describe?",
        options: [
          "Uncertainty of events",
          "CSS layout",
          "Database indexing",
          "Git history",
        ],
        correct: 0,
        explain:
          "Probability quantifies uncertainty about events.",
      },

      {
        q: "A hypothesis test is used to:",
        options: [
          "Evaluate evidence about a hypothesis",
          "Create HTML",
          "Sort Git commits",
          "Build a UI",
        ],
        correct: 0,
        explain:
          "Hypothesis testing provides a framework for evaluating evidence.",
      },

      {
        q: "Correlation does not necessarily imply:",
        options: [
          "Causation",
          "Association",
          "A relationship",
          "Measurement",
        ],
        correct: 0,
        explain:
          "Correlation alone does not establish a causal relationship.",
      },
    ],
  ),


  createModule(
    "Intermediate",
    "ds-i1",
    "SQL for Analytics",
    "3 weeks",
    "Use SQL aggregations, joins and window functions for analytics.",

    [
      "Write analytical SQL queries",
      "Use GROUP BY",
      "Use aggregate functions",
      "Use joins",
      "Use window functions",
    ],

    "Analyze a sales dataset using SQL to calculate revenue, customer counts and monthly trends.",

    "Build an analytics database and create SQL reports for management metrics.",

    [
      lesson(
        "ds-i1-l1",
        "SQL Aggregations",
        "30 min",
        "Learn COUNT, SUM, AVG, MIN and MAX.",
        "SQL aggregate functions tutorial",
      ),

      lesson(
        "ds-i1-l2",
        "GROUP BY",
        "25 min",
        "Create grouped analytical reports.",
        "SQL GROUP BY tutorial",
      ),

      lesson(
        "ds-i1-l3",
        "Joins",
        "30 min",
        "Combine multiple tables.",
        "SQL joins analytics",
      ),

      lesson(
        "ds-i1-l4",
        "Window Functions",
        "40 min",
        "Calculate rankings and running metrics.",
        "SQL window functions tutorial",
      ),
    ],

    createNotes(
      "SQL is an important tool for extracting and analyzing structured data.",

      [
        "Aggregate functions summarize values.",
        "GROUP BY creates groups.",
        "JOIN combines related datasets.",
        "Window functions calculate values across related rows without collapsing them.",
        "Analytical SQL should be readable and testable.",
      ],

      [
        "SUM(revenue) calculates total revenue.",
        "ROW_NUMBER() can rank records within groups.",
      ],

      [
        "Understand the grain of your data.",
        "Check joins for accidental duplication.",
        "Validate analytical results.",
      ],
    ),

    [
      {
        q: "Which function calculates the total of numeric values?",
        options: [
          "SUM",
          "COUNT_TEXT_ONLY",
          "JOIN",
          "GROUP",
        ],
        correct: 0,
        explain:
          "SUM adds numeric values.",
      },

      {
        q: "What does GROUP BY do?",
        options: [
          "Creates groups for aggregation",
          "Deletes groups",
          "Creates APIs",
          "Formats HTML",
        ],
        correct: 0,
        explain:
          "GROUP BY groups rows so aggregate functions can be applied to each group.",
      },

      {
        q: "What is a window function useful for?",
        options: [
          "Calculations across related rows",
          "CSS styling",
          "Creating Git branches",
          "Starting servers",
        ],
        correct: 0,
        explain:
          "Window functions calculate values across a set of related rows while retaining row-level detail.",
      },

      {
        q: "Why inspect joins carefully?",
        options: [
          "Incorrect joins can duplicate data",
          "Joins always delete data",
          "Joins replace databases",
          "Joins only affect CSS",
        ],
        correct: 0,
        explain:
          "A join can multiply rows if relationships are not understood correctly.",
      },

      {
        q: "Which is an aggregate function?",
        options: [
          "AVG",
          "JOIN",
          "WHERE",
          "FROM",
        ],
        correct: 0,
        explain:
          "AVG calculates an average and is an aggregate function.",
      },
    ],
  ),


  createModule(
    "Intermediate",
    "ds-i2",
    "Data Visualization",
    "3 weeks",
    "Create effective visualizations and communicate data insights.",

    [
      "Choose appropriate charts",
      "Create visualizations",
      "Label charts correctly",
      "Avoid misleading graphics",
      "Tell data-driven stories",
    ],

    "Create five visualizations from a dataset and explain the insight shown by each.",

    "Build an interactive analytics dashboard showing important business metrics.",

    [
      lesson(
        "ds-i2-l1",
        "Visualization Basics",
        "30 min",
        "Learn why visualization helps data analysis.",
        "data visualization fundamentals",
      ),

      lesson(
        "ds-i2-l2",
        "Matplotlib",
        "35 min",
        "Create charts using Python.",
        "Matplotlib tutorial beginners",
      ),

      lesson(
        "ds-i2-l3",
        "Chart Selection",
        "30 min",
        "Choose charts based on the question.",
        "choose right chart data visualization",
      ),

      lesson(
        "ds-i2-l4",
        "Data Storytelling",
        "35 min",
        "Communicate insights clearly.",
        "data storytelling visualization",
      ),
    ],

    createNotes(
      "Data visualization transforms data into graphical representations that make patterns easier to understand.",

      [
        "Bar charts compare categories.",
        "Line charts show trends over time.",
        "Scatter plots show relationships.",
        "Labels and units provide context.",
        "Visualization should support a specific question.",
      ],

      [
        "Use a line chart for monthly sales.",
        "Use a bar chart to compare departments.",
        "Use a scatter plot to explore two numerical variables.",
      ],

      [
        "Avoid unnecessary visual decoration.",
        "Label axes clearly.",
        "Choose charts based on the analytical question.",
      ],
    ),

    [
      {
        q: "Which chart is commonly useful for trends over time?",
        options: [
          "Line chart",
          "Pie of code",
          "Git chart",
          "HTML table only",
        ],
        correct: 0,
        explain:
          "Line charts are commonly used to display changes over time.",
      },

      {
        q: "Which chart is useful for comparing categories?",
        options: [
          "Bar chart",
          "Only scatter plot",
          "Network packet",
          "Database schema",
        ],
        correct: 0,
        explain:
          "Bar charts are effective for comparing categorical values.",
      },

      {
        q: "Why label axes?",
        options: [
          "To provide context and meaning",
          "To increase database size",
          "To compile Python",
          "To create APIs",
        ],
        correct: 0,
        explain:
          "Axis labels help viewers understand what the measurements represent.",
      },

      {
        q: "A scatter plot is useful for:",
        options: [
          "Exploring relationships between variables",
          "Writing SQL",
          "Creating passwords",
          "Managing Git",
        ],
        correct: 0,
        explain:
          "Scatter plots show pairs of numerical values and can reveal relationships.",
      },

      {
        q: "Good data storytelling should:",
        options: [
          "Clearly communicate an insight",
          "Hide important information",
          "Use as many charts as possible",
          "Avoid labels",
        ],
        correct: 0,
        explain:
          "The goal is to communicate useful insights clearly and accurately.",
      },
    ],
  ),


  createModule(
    "Advanced",
    "ds-a1",
    "Machine Learning",
    "5 weeks",
    "Learn regression, classification, evaluation and machine learning workflows.",

    [
      "Understand supervised learning",
      "Build regression models",
      "Build classification models",
      "Evaluate models",
      "Avoid common modeling mistakes",
    ],

    "Train a classification model on a dataset and evaluate it using suitable metrics.",

    "Build an end-to-end machine learning project from data preparation through evaluation.",

    [
      lesson(
        "ds-a1-l1",
        "Machine Learning Fundamentals",
        "35 min",
        "Understand supervised and unsupervised learning.",
        "machine learning fundamentals",
      ),

      lesson(
        "ds-a1-l2",
        "Regression",
        "35 min",
        "Predict continuous values.",
        "linear regression machine learning",
      ),

      lesson(
        "ds-a1-l3",
        "Classification",
        "35 min",
        "Predict categories.",
        "classification machine learning tutorial",
      ),

      lesson(
        "ds-a1-l4",
        "Model Evaluation",
        "40 min",
        "Understand accuracy, precision, recall and other metrics.",
        "machine learning model evaluation metrics",
      ),

      lesson(
        "ds-a1-l5",
        "Model Workflow",
        "40 min",
        "Build a complete ML workflow.",
        "machine learning project workflow",
      ),
    ],

    createNotes(
      "Machine learning algorithms learn patterns from data to make predictions or decisions.",

      [
        "Supervised learning uses labeled examples.",
        "Regression predicts continuous values.",
        "Classification predicts categories.",
        "Training and test data should be separated.",
        "Evaluation metrics depend on the problem.",
        "Overfitting occurs when a model learns training data too closely.",
      ],

      [
        "Predicting house price is regression.",
        "Predicting spam/not-spam is classification.",
        "Accuracy can be misleading for imbalanced datasets.",
      ],

      [
        "Separate training and evaluation data.",
        "Choose metrics based on the business problem.",
        "Watch for data leakage.",
        "Compare baseline models.",
      ],
    ),

    [
      {
        q: "What does supervised learning require?",
        options: [
          "Labeled training data",
          "Only images",
          "Only SQL",
          "No data",
        ],
        correct: 0,
        explain:
          "Supervised learning learns from examples that include target labels.",
      },

      {
        q: "Predicting a house price is an example of:",
        options: [
          "Regression",
          "Classification",
          "Clustering only",
          "Sorting",
        ],
        correct: 0,
        explain:
          "House price is a continuous numerical target, making it a regression problem.",
      },

      {
        q: "Predicting spam or not spam is:",
        options: [
          "Classification",
          "Regression",
          "Database indexing",
          "Sorting",
        ],
        correct: 0,
        explain:
          "Spam/not-spam represents categorical classes.",
      },

      {
        q: "Why use a test set?",
        options: [
          "To evaluate generalization",
          "To train forever",
          "To delete data",
          "To create HTML",
        ],
        correct: 0,
        explain:
          "A test set provides an independent estimate of model performance on unseen data.",
      },

      {
        q: "What is overfitting?",
        options: [
          "Learning training data too closely",
          "Using too little code",
          "Deleting labels",
          "Sorting data",
        ],
        correct: 0,
        explain:
          "Overfitting occurs when a model captures training-specific patterns that do not generalize well.",
      },
    ],
  ),


  createModule(
    "Advanced",
    "ds-a2",
    "Feature Engineering",
    "4 weeks",
    "Learn encoding, scaling, feature selection and transformations for machine learning.",

    [
      "Understand feature types",
      "Encode categorical variables",
      "Scale numerical features",
      "Handle missing values",
      "Select useful features",
    ],

    "Prepare a raw dataset for machine learning using encoding, scaling and missing-value handling.",

    "Build a reusable feature-engineering pipeline for a machine learning project.",

    [
      lesson(
        "ds-a2-l1",
        "Feature Types",
        "25 min",
        "Understand numerical and categorical features.",
        "feature engineering machine learning",
      ),

      lesson(
        "ds-a2-l2",
        "Encoding",
        "30 min",
        "Convert categorical variables into numerical representations.",
        "one hot encoding machine learning",
      ),

      lesson(
        "ds-a2-l3",
        "Scaling",
        "30 min",
        "Understand feature scaling.",
        "feature scaling standardization normalization",
      ),

      lesson(
        "ds-a2-l4",
        "Feature Selection",
        "35 min",
        "Choose useful features.",
        "feature selection machine learning",
      ),
    ],

    createNotes(
      "Feature engineering transforms raw data into useful representations for machine learning models.",

      [
        "Categorical variables may require encoding.",
        "Scaling changes numerical feature ranges.",
        "Missing values need appropriate handling.",
        "Feature selection can reduce unnecessary variables.",
        "Transformations should be learned from training data when appropriate.",
      ],

      [
        "One-hot encoding represents categories as binary columns.",
        "Standardization often centers features around zero.",
      ],

      [
        "Avoid data leakage during preprocessing.",
        "Use pipelines where possible.",
        "Understand the meaning of each feature.",
      ],
    ),

    [
      {
        q: "Why encode categorical variables?",
        options: [
          "Many ML algorithms require numerical inputs",
          "To delete categories",
          "To create HTML",
          "To replace the model",
        ],
        correct: 0,
        explain:
          "Many machine learning algorithms require or work best with numerical representations.",
      },

      {
        q: "What does scaling affect?",
        options: [
          "Numerical feature ranges",
          "Database tables only",
          "Git history",
          "HTML structure",
        ],
        correct: 0,
        explain:
          "Scaling transforms numerical feature values into a chosen range or distribution.",
      },

      {
        q: "What is feature selection?",
        options: [
          "Choosing useful input variables",
          "Choosing CSS colors",
          "Choosing Git branches",
          "Deleting all data",
        ],
        correct: 0,
        explain:
          "Feature selection chooses a useful subset of input variables.",
      },

      {
        q: "What is data leakage?",
        options: [
          "Using information that should not be available during training",
          "Deleting a CSV",
          "Compressing data",
          "Sorting rows",
        ],
        correct: 0,
        explain:
          "Data leakage occurs when information unavailable at prediction time influences model training or evaluation.",
      },

      {
        q: "Why use preprocessing pipelines?",
        options: [
          "To make transformations consistent and reproducible",
          "To remove models",
          "To create websites",
          "To replace databases",
        ],
        correct: 0,
        explain:
          "Pipelines help apply preprocessing consistently during training and inference.",
      },
    ],
  ),


  createModule(
    "Expert",
    "ds-e1",
    "MLOps Basics",
    "4 weeks",
    "Learn machine learning pipelines, deployment, monitoring and model lifecycle management.",

    [
      "Understand ML pipelines",
      "Deploy models",
      "Track experiments",
      "Monitor model performance",
      "Understand model lifecycle",
    ],

    "Create a pipeline that trains a model, saves it and exposes a prediction endpoint.",

    "Build an end-to-end ML service with training, deployment and monitoring.",

    [
      lesson(
        "ds-e1-l1",
        "ML Pipelines",
        "35 min",
        "Understand repeatable machine learning workflows.",
        "MLOps machine learning pipelines",
      ),

      lesson(
        "ds-e1-l2",
        "Model Deployment",
        "35 min",
        "Serve a trained model.",
        "machine learning model deployment",
      ),

      lesson(
        "ds-e1-l3",
        "Experiment Tracking",
        "30 min",
        "Track parameters and model results.",
        "ML experiment tracking tutorial",
      ),

      lesson(
        "ds-e1-l4",
        "Monitoring",
        "35 min",
        "Monitor model and service behavior.",
        "machine learning model monitoring",
      ),
    ],

    createNotes(
      "MLOps applies software engineering and operations practices to machine learning systems.",

      [
        "Pipelines automate repeatable workflows.",
        "Models need versioning.",
        "Deployment exposes models to applications.",
        "Monitoring detects changes and failures.",
        "Data drift can affect model performance.",
      ],

      [
        "A pipeline can automate preprocessing and training.",
        "An API can expose predictions to applications.",
      ],

      [
        "Track model versions.",
        "Track training data and parameters.",
        "Monitor both service health and model quality.",
      ],
    ),

    [
      {
        q: "What is MLOps concerned with?",
        options: [
          "Operating machine learning systems reliably",
          "Only designing charts",
          "Only writing HTML",
          "Only Git commits",
        ],
        correct: 0,
        explain:
          "MLOps applies engineering and operations practices to ML systems.",
      },

      {
        q: "Why version models?",
        options: [
          "To reproduce and manage model changes",
          "To remove datasets",
          "To change CSS",
          "To replace Python",
        ],
        correct: 0,
        explain:
          "Model versioning helps track and reproduce changes.",
      },

      {
        q: "What can monitoring detect?",
        options: [
          "Service and model problems",
          "Only colors",
          "Only source formatting",
          "Only file names",
        ],
        correct: 0,
        explain:
          "Monitoring can detect service failures, latency changes and model/data issues.",
      },

      {
        q: "What is data drift?",
        options: [
          "Changes in the distribution of input data",
          "A Git merge",
          "A CSS change",
          "A database password",
        ],
        correct: 0,
        explain:
          "Data drift refers to changes in the distribution of input data over time.",
      },

      {
        q: "Why automate ML pipelines?",
        options: [
          "For repeatability and consistency",
          "To remove testing",
          "To delete models",
          "To avoid monitoring",
        ],
        correct: 0,
        explain:
          "Automation makes ML workflows more repeatable and consistent.",
      },
    ],
  ),


  createModule(
    "Expert",
    "ds-e2",
    "Capstone & Kaggle",
    "6 weeks",
    "Complete an end-to-end data science project and communicate the results.",

    [
      "Define a data problem",
      "Explore and clean data",
      "Build models",
      "Evaluate results",
      "Communicate findings",
    ],

    "Complete a Kaggle-style notebook from data exploration through model evaluation.",

    "Build a complete portfolio data science project with a clear README and reproducible notebook.",

    [
      lesson(
        "ds-e2-l1",
        "Problem Definition",
        "30 min",
        "Define a useful analytical question.",
        "data science problem definition",
      ),

      lesson(
        "ds-e2-l2",
        "EDA",
        "40 min",
        "Explore a dataset systematically.",
        "exploratory data analysis tutorial",
      ),

      lesson(
        "ds-e2-l3",
        "Modeling",
        "40 min",
        "Train and compare models.",
        "data science model comparison",
      ),

      lesson(
        "ds-e2-l4",
        "Communication",
        "35 min",
        "Present results clearly.",
        "data science storytelling presentation",
      ),
    ],

    createNotes(
      "A strong data science project connects a real problem to data, analysis, modeling and actionable conclusions.",

      [
        "Start with a clear question.",
        "Understand the data before modeling.",
        "Build a baseline.",
        "Use appropriate evaluation metrics.",
        "Document assumptions.",
        "Communicate limitations.",
      ],

      [
        "A project can predict customer churn.",
        "An analysis can identify factors related to sales.",
      ],

      [
        "Do not hide negative results.",
        "Explain why metrics were selected.",
        "Make the project reproducible.",
      ],
    ),

    [
      {
        q: "What should a data science project begin with?",
        options: [
          "A clear problem or question",
          "A random model",
          "A chart color",
          "A database password",
        ],
        correct: 0,
        explain:
          "A clear problem or question guides the analysis.",
      },

      {
        q: "Why perform EDA?",
        options: [
          "To understand the dataset",
          "To skip cleaning",
          "To remove all features",
          "To deploy immediately",
        ],
        correct: 0,
        explain:
          "Exploratory data analysis helps understand distributions, relationships and data quality.",
      },

      {
        q: "Why create a baseline model?",
        options: [
          "To provide a reference for improvement",
          "To replace all models",
          "To delete data",
          "To avoid evaluation",
        ],
        correct: 0,
        explain:
          "A baseline gives a simple reference against which more complex approaches can be compared.",
      },

      {
        q: "What should be communicated with results?",
        options: [
          "Insights and limitations",
          "Only the highest score",
          "Only code",
          "Only screenshots",
        ],
        correct: 0,
        explain:
          "Good communication includes findings, context, assumptions and limitations.",
      },

      {
        q: "What makes a portfolio data project stronger?",
        options: [
          "Clear documentation and reproducibility",
          "Only a large dataset",
          "Only many charts",
          "No explanation",
        ],
        correct: 0,
        explain:
          "Clear documentation and reproducibility make the project easier to evaluate and trust.",
      },
    ],
  ),
];


// ============================================================
// AI ENGINEER
// ============================================================

const AI_ENGINEER: Module[] = [

  createModule(
    "Beginner",
    "ae-b1",
    "Python & NumPy",
    "3 weeks",
    "Build a strong Python and numerical-computing foundation for AI.",

    [
      "Use Python effectively",
      "Understand arrays",
      "Use vectorized operations",
      "Manipulate numerical data",
      "Write reusable functions",
    ],

    "Implement vector operations and matrix calculations using NumPy.",

    "Build a small numerical-computing project using Python and NumPy.",

    [
      lesson(
        "ae-b1-l1",
        "Python Fundamentals",
        "30 min",
        "Review Python syntax and data structures.",
        "Python programming tutorial",
      ),

      lesson(
        "ae-b1-l2",
        "NumPy Arrays",
        "30 min",
        "Understand numerical arrays.",
        "NumPy arrays tutorial",
      ),

      lesson(
        "ae-b1-l3",
        "Vectorization",
        "30 min",
        "Learn efficient numerical operations.",
        "NumPy vectorization tutorial",
      ),

      lesson(
        "ae-b1-l4",
        "Matrix Operations",
        "35 min",
        "Work with matrices for AI applications.",
        "NumPy matrix operations",
      ),
    ],

    createNotes(
      "Python and NumPy provide core tools for implementing and understanding AI algorithms.",

      [
        "NumPy arrays support efficient numerical operations.",
        "Vectorization avoids unnecessary Python loops.",
        "Matrices are fundamental to many AI algorithms.",
        "Functions improve code reuse.",
      ],

      [
        "Matrix multiplication is used extensively in neural networks.",
        "Vectorized operations can process arrays efficiently.",
      ],

      [
        "Understand array shapes.",
        "Check dimensions before matrix operations.",
        "Prefer vectorized operations when appropriate.",
      ],
    ),

    [
      {
        q: "What is NumPy primarily used for?",
        options: [
          "Numerical computing",
          "Web routing",
          "Git hosting",
          "CSS styling",
        ],
        correct: 0,
        explain:
          "NumPy provides efficient numerical arrays and operations.",
      },

      {
        q: "Why is vectorization useful?",
        options: [
          "It can make numerical operations more efficient",
          "It removes all data",
          "It creates HTML",
          "It replaces Python",
        ],
        correct: 0,
        explain:
          "Vectorized operations can perform computations efficiently over arrays.",
      },

      {
        q: "What is important when multiplying matrices?",
        options: [
          "Compatible dimensions",
          "CSS selectors",
          "Git branches",
          "HTML tags",
        ],
        correct: 0,
        explain:
          "Matrix multiplication requires compatible dimensions.",
      },

      {
        q: "What does an array shape describe?",
        options: [
          "Its dimensions",
          "Its Git history",
          "Its CSS style",
          "Its database password",
        ],
        correct: 0,
        explain:
          "Shape describes the dimensions of an array.",
      },

      {
        q: "Why use functions?",
        options: [
          "To organize reusable logic",
          "To remove variables",
          "To create databases",
          "To replace arrays",
        ],
        correct: 0,
        explain:
          "Functions help organize and reuse logic.",
      },
    ],
  ),


  createModule(
    "Beginner",
    "ae-b2",
    "Math for AI",
    "4 weeks",
    "Learn linear algebra, probability and mathematical foundations used in AI.",

    [
      "Understand vectors",
      "Understand matrices",
      "Understand probability",
      "Understand derivatives",
      "Connect math to AI",
    ],

    "Implement vector dot products, matrix multiplication and basic probability calculations.",

    "Create a notebook demonstrating mathematical operations used by machine learning algorithms.",

    [
      lesson(
        "ae-b2-l1",
        "Vectors",
        "30 min",
        "Understand vectors and vector operations.",
        "linear algebra vectors AI",
      ),

      lesson(
        "ae-b2-l2",
        "Matrices",
        "35 min",
        "Understand matrix operations.",
        "linear algebra matrices machine learning",
      ),

      lesson(
        "ae-b2-l3",
        "Probability",
        "35 min",
        "Understand probability for AI.",
        "probability machine learning basics",
      ),

      lesson(
        "ae-b2-l4",
        "Derivatives",
        "35 min",
        "Understand derivatives and optimization.",
        "derivatives gradient descent machine learning",
      ),
    ],

    createNotes(
      "Mathematics provides the foundation for understanding optimization, models and neural networks.",

      [
        "Vectors represent quantities with multiple components.",
        "Matrices represent structured numerical relationships.",
        "Probability represents uncertainty.",
        "Derivatives measure rates of change.",
        "Gradients guide optimization.",
      ],

      [
        "Dot products are common in linear models.",
        "Gradients are used by gradient descent.",
      ],

      [
        "Understand shapes and dimensions.",
        "Connect mathematical operations to model behavior.",
        "Practice calculations rather than memorizing formulas only.",
      ],
    ),

    [
      {
        q: "What is a vector?",
        options: [
          "An ordered collection of values",
          "A database",
          "A Git branch",
          "A CSS selector",
        ],
        correct: 0,
        explain:
          "A vector is commonly represented as an ordered collection of values.",
      },

      {
        q: "What does a derivative describe?",
        options: [
          "Rate of change",
          "Database size",
          "File format",
          "HTML structure",
        ],
        correct: 0,
        explain:
          "A derivative describes how a quantity changes with respect to another.",
      },

      {
        q: "What is probability used to represent?",
        options: [
          "Uncertainty",
          "CSS layout",
          "Git history",
          "Source code size",
        ],
        correct: 0,
        explain:
          "Probability provides a mathematical representation of uncertainty.",
      },

      {
        q: "What is a gradient?",
        options: [
          "A vector of partial derivatives",
          "A database table",
          "A CSS color",
          "A Git commit",
        ],
        correct: 0,
        explain:
          "A gradient contains partial derivatives with respect to model parameters.",
      },

      {
        q: "Why is linear algebra important in AI?",
        options: [
          "Many models operate on vectors and matrices",
          "It replaces programming",
          "It creates web pages",
          "It manages Git",
        ],
        correct: 0,
        explain:
          "Vectors and matrices are fundamental representations in many AI models.",
      },
    ],
  ),


  createModule(
    "Intermediate",
    "ae-i1",
    "Classical ML",
    "4 weeks",
    "Learn practical machine learning using common algorithms and evaluation techniques.",

    [
      "Understand supervised learning",
      "Use scikit-learn",
      "Train regression models",
      "Train classification models",
      "Evaluate models",
    ],

    "Train and compare at least two machine learning models on a dataset.",

    "Build a complete classical machine learning prediction application.",

    [
      lesson(
        "ae-i1-l1",
        "ML Workflow",
        "30 min",
        "Understand the complete ML workflow.",
        "scikit learn machine learning workflow",
      ),

      lesson(
        "ae-i1-l2",
        "Regression",
        "35 min",
        "Build regression models.",
        "scikit learn regression tutorial",
      ),

      lesson(
        "ae-i1-l3",
        "Classification",
        "35 min",
        "Build classification models.",
        "scikit learn classification tutorial",
      ),

      lesson(
        "ae-i1-l4",
        "Evaluation",
        "35 min",
        "Evaluate models using suitable metrics.",
        "scikit learn model evaluation",
      ),
    ],

    createNotes(
      "Classical machine learning provides practical algorithms for prediction and classification.",

      [
        "Split data into training and evaluation sets.",
        "Regression predicts continuous values.",
        "Classification predicts classes.",
        "Cross-validation helps estimate generalization.",
        "Metrics should match the task.",
      ],

      [
        "Linear regression predicts numerical values.",
        "Logistic regression can be used for classification.",
      ],

      [
        "Always create a baseline.",
        "Avoid leakage.",
        "Compare models using consistent evaluation data.",
      ],
    ),

    [
      {
        q: "Which library is commonly used for classical ML in Python?",
        options: [
          "scikit-learn",
          "Express",
          "React",
          "Git",
        ],
        correct: 0,
        explain:
          "scikit-learn provides many classical machine learning algorithms and tools.",
      },

      {
        q: "What does regression commonly predict?",
        options: [
          "Continuous values",
          "Only categories",
          "HTML tags",
          "Git branches",
        ],
        correct: 0,
        explain:
          "Regression commonly predicts continuous numerical targets.",
      },

      {
        q: "What does classification predict?",
        options: [
          "Categories",
          "Only continuous values",
          "CSS rules",
          "Database indexes",
        ],
        correct: 0,
        explain:
          "Classification predicts one or more categories/classes.",
      },

      {
        q: "Why split data?",
        options: [
          "To evaluate generalization on unseen data",
          "To delete data",
          "To make charts",
          "To create APIs",
        ],
        correct: 0,
        explain:
          "A separate evaluation set helps estimate performance on unseen data.",
      },

      {
        q: "Why use a baseline?",
        options: [
          "To establish a reference performance",
          "To avoid testing",
          "To remove features",
          "To replace the dataset",
        ],
        correct: 0,
        explain:
          "A baseline provides a simple reference for comparing more complex models.",
      },
    ],
  ),


  createModule(
    "Intermediate",
    "ae-i2",
    "Neural Networks",
    "5 weeks",
    "Understand neurons, activation functions, loss functions, backpropagation and optimization.",

    [
      "Understand neural network structure",
      "Understand activation functions",
      "Understand loss functions",
      "Understand backpropagation",
      "Train simple neural networks",
    ],

    "Build a simple neural network classifier and explain its forward and backward passes.",

    "Build an image or tabular classification neural network and evaluate its performance.",

    [
      lesson(
        "ae-i2-l1",
        "Neurons",
        "30 min",
        "Understand artificial neurons.",
        "neural networks neurons explained",
      ),

      lesson(
        "ae-i2-l2",
        "Activation Functions",
        "30 min",
        "Understand ReLU, sigmoid and other activations.",
        "neural network activation functions",
      ),

      lesson(
        "ae-i2-l3",
        "Loss Functions",
        "30 min",
        "Understand how prediction error is measured.",
        "neural network loss functions",
      ),

      lesson(
        "ae-i2-l4",
        "Backpropagation",
        "40 min",
        "Understand how neural networks learn.",
        "backpropagation neural networks explained",
      ),

      lesson(
        "ae-i2-l5",
        "Optimizers",
        "35 min",
        "Understand gradient-based optimization.",
        "neural network optimizers Adam gradient descent",
      ),
    ],

    createNotes(
      "Neural networks learn parameterized transformations of input data using layers of interconnected units.",

      [
        "A neuron combines inputs using weights and a bias.",
        "Activation functions introduce nonlinear behavior.",
        "Loss functions measure prediction error.",
        "Backpropagation computes gradients.",
        "Optimizers update model parameters.",
      ],

      [
        "ReLU is commonly used in hidden layers.",
        "Cross-entropy is commonly used for classification.",
        "Adam is a popular optimizer.",
      ],

      [
        "Monitor training and validation performance.",
        "Understand what the loss function measures.",
        "Tune learning rate carefully.",
      ],
    ),

    [
      {
        q: "What does a neural network neuron typically use?",
        options: [
          "Weights, inputs and bias",
          "Only HTML",
          "Only database rows",
          "Only CSS",
        ],
        correct: 0,
        explain:
          "A neuron typically computes a weighted combination of inputs plus a bias.",
      },

      {
        q: "Why are activation functions used?",
        options: [
          "To introduce nonlinear behavior",
          "To store databases",
          "To create Git branches",
          "To remove training",
        ],
        correct: 0,
        explain:
          "Activation functions allow neural networks to model nonlinear relationships.",
      },

      {
        q: "What does a loss function measure?",
        options: [
          "Prediction error",
          "CPU brand",
          "HTML size",
          "Git history",
        ],
        correct: 0,
        explain:
          "A loss function quantifies how far predictions are from desired outputs.",
      },

      {
        q: "What does backpropagation compute?",
        options: [
          "Gradients",
          "HTML pages",
          "Database tables",
          "Git commits",
        ],
        correct: 0,
        explain:
          "Backpropagation computes gradients of the loss with respect to model parameters.",
      },

      {
        q: "What is an optimizer responsible for?",
        options: [
          "Updating model parameters",
          "Creating HTML",
          "Hosting Git",
          "Deleting data",
        ],
        correct: 0,
        explain:
          "Optimizers use gradients to update model parameters.",
      },
    ],
  ),


  createModule(
    "Advanced",
    "ae-a1",
    "Deep Learning",
    "5 weeks",
    "Learn CNNs, sequence models and transformer architectures.",

    [
      "Understand deep neural networks",
      "Understand CNNs",
      "Understand sequence models",
      "Understand attention",
      "Understand transformers",
    ],

    "Build a deep learning model for an image or text classification task.",

    "Build and evaluate a deep learning application using a modern framework.",

    [
      lesson(
        "ae-a1-l1",
        "Deep Networks",
        "35 min",
        "Understand deeper neural architectures.",
        "deep learning tutorial",
      ),

      lesson(
        "ae-a1-l2",
        "CNNs",
        "40 min",
        "Understand convolutional neural networks.",
        "CNN convolutional neural network tutorial",
      ),

      lesson(
        "ae-a1-l3",
        "Sequence Models",
        "40 min",
        "Understand models for sequential data.",
        "RNN LSTM sequence models tutorial",
      ),

      lesson(
        "ae-a1-l4",
        "Attention",
        "40 min",
        "Understand attention mechanisms.",
        "attention mechanism deep learning",
      ),

      lesson(
        "ae-a1-l5",
        "Transformers",
        "45 min",
        "Understand the transformer architecture.",
        "transformers deep learning explained",
      ),
    ],

    createNotes(
      "Deep learning uses multilayer neural networks to learn increasingly complex representations.",

      [
        "CNNs are useful for spatial data such as images.",
        "Sequence models handle ordered information.",
        "Attention lets models focus on relevant information.",
        "Transformers rely heavily on attention mechanisms.",
      ],

      [
        "CNNs can recognize image features.",
        "Transformers are widely used for language tasks.",
      ],

      [
        "Understand the architecture before tuning it.",
        "Monitor validation performance.",
        "Consider compute and data requirements.",
      ],
    ),

    [
      {
        q: "CNNs are particularly useful for:",
        options: [
          "Spatial data such as images",
          "Only Git repositories",
          "Only SQL tables",
          "Only HTML",
        ],
        correct: 0,
        explain:
          "Convolutional neural networks are widely used for image and spatial data.",
      },

      {
        q: "What does attention help a model do?",
        options: [
          "Focus on relevant information",
          "Delete training data",
          "Create CSS",
          "Manage Git branches",
        ],
        correct: 0,
        explain:
          "Attention lets models assign different importance to different parts of an input.",
      },

      {
        q: "Transformers rely heavily on:",
        options: [
          "Attention mechanisms",
          "SQL joins",
          "Git commits",
          "CSS Grid",
        ],
        correct: 0,
        explain:
          "Modern transformer architectures are built around attention mechanisms.",
      },

      {
        q: "Why use validation data?",
        options: [
          "To monitor generalization during development",
          "To delete models",
          "To replace training",
          "To create APIs",
        ],
        correct: 0,
        explain:
          "Validation data helps assess model behavior during development and tuning.",
      },

      {
        q: "Deep learning generally requires:",
        options: [
          "Data, computation and suitable model architecture",
          "Only CSS",
          "Only Git",
          "No data",
        ],
        correct: 0,
        explain:
          "Deep learning performance depends on data, computation and an appropriate architecture.",
      },
    ],
  ),


  createModule(
    "Advanced",
    "ae-a2",
    "LLMs & Prompting",
    "5 weeks",
    "Understand large language models, prompting, embeddings, RAG and fine-tuning concepts.",

    [
      "Understand LLM fundamentals",
      "Write effective prompts",
      "Understand tokens and embeddings",
      "Understand RAG",
      "Understand fine-tuning concepts",
    ],

    "Create a prompt-based application that answers questions from a structured knowledge source.",

    "Build a small RAG application that retrieves relevant documents before generating an answer.",

    [
      lesson(
        "ae-a2-l1",
        "LLM Fundamentals",
        "35 min",
        "Understand language models and token prediction.",
        "large language models explained",
      ),

      lesson(
        "ae-a2-l2",
        "Prompt Engineering",
        "35 min",
        "Learn how prompt structure affects results.",
        "prompt engineering tutorial",
      ),

      lesson(
        "ae-a2-l3",
        "Embeddings",
        "35 min",
        "Understand vector representations.",
        "embeddings vector databases explained",
      ),

      lesson(
        "ae-a2-l4",
        "RAG",
        "40 min",
        "Understand retrieval augmented generation.",
        "RAG retrieval augmented generation tutorial",
      ),

      lesson(
        "ae-a2-l5",
        "Fine-Tuning",
        "40 min",
        "Understand fine-tuning concepts.",
        "LLM fine tuning explained",
      ),
    ],

    createNotes(
      "Large language models generate text based on learned patterns. Prompting, retrieval and model adaptation can improve application behavior.",

      [
        "Tokens are units processed by language models.",
        "Embeddings represent information as vectors.",
        "RAG retrieves external information before generation.",
        "Prompt structure influences model output.",
        "Fine-tuning adapts model behavior using additional training.",
      ],

      [
        "A RAG system can retrieve company policy documents before answering.",
        "Embeddings can be compared using vector similarity.",
      ],

      [
        "Ground answers in reliable information.",
        "Evaluate prompts systematically.",
        "Consider hallucination and retrieval quality.",
      ],
    ),

    [
      {
        q: "What does RAG stand for?",
        options: [
          "Retrieval-Augmented Generation",
          "Random AI Generation",
          "Rapid Application Graph",
          "Remote API Gateway",
        ],
        correct: 0,
        explain:
          "RAG stands for Retrieval-Augmented Generation.",
      },

      {
        q: "What are embeddings?",
        options: [
          "Vector representations",
          "HTML pages",
          "Git branches",
          "SQL tables",
        ],
        correct: 0,
        explain:
          "Embeddings represent information as vectors in a numerical space.",
      },

      {
        q: "Why use RAG?",
        options: [
          "To provide retrieved external context to generation",
          "To remove all context",
          "To replace programming",
          "To create CSS",
        ],
        correct: 0,
        explain:
          "RAG retrieves relevant information and provides it as context to the generation model.",
      },

      {
        q: "What is prompt engineering?",
        options: [
          "Designing instructions to guide model behavior",
          "Database indexing",
          "Git branching",
          "CSS optimization",
        ],
        correct: 0,
        explain:
          "Prompt engineering involves designing effective instructions and context for models.",
      },

      {
        q: "What is one important LLM application concern?",
        options: [
          "Hallucinations and factual reliability",
          "Only CSS layout",
          "Git commit count",
          "HTML indentation",
        ],
        correct: 0,
        explain:
          "LLM applications need evaluation and safeguards for inaccurate generated information.",
      },
    ],
  ),


  createModule(
    "Expert",
    "ae-e1",
    "MLOps & Deployment",
    "5 weeks",
    "Deploy, monitor and maintain production AI systems.",

    [
      "Deploy AI models",
      "Create inference APIs",
      "Monitor models",
      "Track versions",
      "Understand production AI systems",
    ],

    "Deploy a trained model behind an API and add basic health and prediction monitoring.",

    "Build a production-style AI service with model versioning, API deployment and monitoring.",

    [
      lesson(
        "ae-e1-l1",
        "Model Serving",
        "35 min",
        "Expose trained models through services.",
        "machine learning model serving API",
      ),

      lesson(
        "ae-e1-l2",
        "Containers",
        "30 min",
        "Package AI services.",
        "Docker machine learning deployment",
      ),

      lesson(
        "ae-e1-l3",
        "Monitoring",
        "35 min",
        "Monitor inference services.",
        "ML model monitoring production",
      ),

      lesson(
        "ae-e1-l4",
        "Model Versioning",
        "30 min",
        "Track model changes.",
        "machine learning model versioning",
      ),
    ],

    createNotes(
      "Production AI systems require reliable deployment, monitoring, versioning and maintenance.",

      [
        "Models can be exposed through APIs.",
        "Containers make deployments reproducible.",
        "Monitoring tracks system and model behavior.",
        "Model versions should be traceable.",
        "Production systems need logging and error handling.",
      ],

      [
        "A FastAPI service can expose a prediction endpoint.",
        "A container can package model dependencies.",
      ],

      [
        "Track model artifacts.",
        "Monitor latency and errors.",
        "Monitor input data changes.",
        "Have a rollback strategy.",
      ],
    ),

    [
      {
        q: "How can a model commonly be exposed to an application?",
        options: [
          "Through an API",
          "Through CSS",
          "Through Git commits",
          "Through HTML comments",
        ],
        correct: 0,
        explain:
          "A model can be served behind an API that accepts input and returns predictions.",
      },

      {
        q: "Why monitor a production model?",
        options: [
          "To detect failures and changes in behavior",
          "To change CSS",
          "To delete training data",
          "To create Git branches",
        ],
        correct: 0,
        explain:
          "Monitoring helps detect service failures, performance changes and model/data issues.",
      },

      {
        q: "Why version models?",
        options: [
          "To track and reproduce model changes",
          "To remove APIs",
          "To replace databases",
          "To style dashboards",
        ],
        correct: 0,
        explain:
          "Versioning makes model changes traceable and reproducible.",
      },

      {
        q: "Why use containers?",
        options: [
          "To package applications and dependencies consistently",
          "To replace monitoring",
          "To delete models",
          "To create SQL joins",
        ],
        correct: 0,
        explain:
          "Containers package software and dependencies into reproducible environments.",
      },

      {
        q: "What should a production AI system have?",
        options: [
          "Logging, monitoring and error handling",
          "Only a model file",
          "Only a UI",
          "No testing",
        ],
        correct: 0,
        explain:
          "Production systems require operational safeguards such as logging, monitoring and error handling.",
      },
    ],
  ),


  createModule(
    "Expert",
    "ae-e2",
    "AI Capstone",
    "6 weeks",
    "Build and deploy an AI-powered application from problem definition to production.",

    [
      "Define an AI problem",
      "Prepare data",
      "Build or integrate a model",
      "Evaluate results",
      "Deploy the application",
    ],

    "Create an AI application prototype with a clear input, model workflow and output.",

    "Ship a complete AI product with a frontend, backend, model or LLM integration and documentation.",

    [
      lesson(
        "ae-e2-l1",
        "AI Product Design",
        "35 min",
        "Define a useful AI product problem.",
        "AI product development tutorial",
      ),

      lesson(
        "ae-e2-l2",
        "Data and Evaluation",
        "40 min",
        "Prepare data and define evaluation.",
        "AI evaluation machine learning project",
      ),

      lesson(
        "ae-e2-l3",
        "AI Integration",
        "40 min",
        "Connect an AI model to an application.",
        "AI application integration tutorial",
      ),

      lesson(
        "ae-e2-l4",
        "Deployment",
        "40 min",
        "Deploy the AI application.",
        "AI application deployment",
      ),

      lesson(
        "ae-e2-l5",
        "Responsible AI",
        "35 min",
        "Consider reliability, privacy and safety.",
        "responsible AI fundamentals",
      ),
    ],

    createNotes(
      "An AI product combines a user problem, data or model capability, application logic and evaluation.",

      [
        "Start with a clear user problem.",
        "Define success metrics.",
        "Evaluate model behavior.",
        "Consider privacy and security.",
        "Monitor deployed AI systems.",
      ],

      [
        "A career assistant can use retrieval to answer questions from a knowledge base.",
        "An image classifier can expose predictions through an API.",
      ],

      [
        "Measure quality before deployment.",
        "Document limitations.",
        "Provide useful error handling.",
        "Monitor real-world behavior.",
      ],
    ),

    [
      {
        q: "What should an AI product begin with?",
        options: [
          "A clear user problem",
          "A random model",
          "A UI color",
          "A database index",
        ],
        correct: 0,
        explain:
          "AI should be applied to a clearly defined user or business problem.",
      },

      {
        q: "Why define evaluation metrics?",
        options: [
          "To measure whether the system works",
          "To replace testing",
          "To remove users",
          "To create CSS",
        ],
        correct: 0,
        explain:
          "Evaluation metrics provide measurable evidence of system quality.",
      },

      {
        q: "What should AI applications document?",
        options: [
          "Limitations and expected behavior",
          "Only colors",
          "Only filenames",
          "Only Git branches",
        ],
        correct: 0,
        explain:
          "Documenting limitations helps users understand appropriate use of the system.",
      },

      {
        q: "Why monitor AI after deployment?",
        options: [
          "Real-world data and behavior can change",
          "Models never change",
          "Monitoring is only for CSS",
          "It replaces evaluation",
        ],
        correct: 0,
        explain:
          "Production conditions can differ from development conditions, so monitoring is important.",
      },

      {
        q: "What is an important responsible-AI concern?",
        options: [
          "Privacy and reliability",
          "Only animations",
          "Only Git history",
          "Only font size",
        ],
        correct: 0,
        explain:
          "AI systems should consider privacy, reliability, security and other responsible-use concerns.",
      },
    ],
  ),
];


// ============================================================
// ROADMAP EXPORT
// ============================================================

export const ROADMAPS: Record<
  string,
  Module[]
> = {

  "software-engineer":
    SOFTWARE_ENGINEER,

  "full-stack-developer":
    FULL_STACK,

  "data-scientist":
    DATA_SCIENTIST,

  "ai-engineer":
    AI_ENGINEER,
};


// ============================================================
// FALLBACK
// ============================================================

export function roadmapFor(
  slug: string
): Module[] {

  return (
    ROADMAPS[slug] ??
    ROADMAPS["software-engineer"]
  );

}


// ============================================================
// LEVEL ORDER
// ============================================================

export const LEVEL_ORDER: Level[] = [
  "Beginner",
  "Intermediate",
  "Advanced",
  "Expert",
];


// ============================================================
// MODULE COMPLETION
// ============================================================

export function moduleCompleted(
  p?: {
    classDone: boolean;
    notesDone: boolean;
    taskDone: boolean;
    projectDone: boolean;
    quizScore?: number;
  }
) {

  if (!p) {
    return false;
  }

  return (
    p.classDone &&
    p.notesDone &&
    p.taskDone &&
    p.projectDone &&
    (p.quizScore ?? 0) >= 70
  );

}
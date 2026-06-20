export interface Project {
  id: string;
  title: string;
  category: "AI/ML" | "Web Dev" | "Systems & Security" | "Data Science" | "Mobile Dev";
  description: string;
  details: string;
  tags: string[];
  status: "Completed" | "In Progress" | "Alpha Release" | "Concept";
  demoUrl?: string;
  githubUrl?: string;
  architectureDetails?: string;
}

export interface Skill {
  id: string;
  name: string;
  category: "Languages" | "Development" | "Tools / Cloud" | "CS Core";
  level: number; // 0 to 100
  icon: string; // Lucide icon name
}

export interface Experience {
  id: string;
  role: string;
  organization: string;
  period: string;
  type: "Experience" | "Education" | "Milestone";
  location?: string;
  achievements: string[];
  skillsAssociated?: string[];
}

export interface PortfolioData {
  name: string;
  headline: string;
  bio: string;
  aboutText: string;
  email: string;
  location: string;
  github: string;
  linkedin: string;
  twitter?: string;
  phone?: string;
  terminalWelcomeMsg: string;
  themeColor: "cyan" | "violet" | "emerald" | "amber" | "rose" | "orange";
}

export const INITIAL_PORTFOLIO_DATA: PortfolioData = {
  name: "Hemal Farouqe",
  headline: "Computer Science & Engineering Student",
  bio: "Pursuing a B.Sc. in Computer Science & Engineering at the University of Asia Pacific (UAP). Dedicated to clean backends, automated QA testing, and technical data communications research.",
  aboutText: "Hello! I am Hemal Farouqe, a 3rd-year 2nd-semester B.Sc. student in Computer Science and Engineering at the University of Asia Pacific (UAP), Dhaka. I specialize in backend development with Python and Django, automated quality assurance testing with Selenium, and database deployment with Supabase. Insh'Allah, I will graduate by June/July 2027. I am eager to apply my skills to real-world deployment pipelines, web frameworks, and telecom analysis.",
  email: "hemalfarouqe0651@gmail.com",
  location: "Dhaka, Bangladesh",
  github: "https://github.com/Hemal0651",
  linkedin: "https://www.linkedin.com/in/hemal-farouqe-204301199",
  twitter: "https://x.com/Hemal82501552",
  phone: "+8801627947807",
  terminalWelcomeMsg: "Initializing CSE terminal session for Hemal Farouqe...\nType 'help' to render commands.\nStatus: Ready to build and automate.",
  themeColor: "orange"
};

export const INITIAL_SKILLS: Skill[] = [
  // Languages & Frameworks
  { id: "s1", name: "Python", category: "Languages", level: 92, icon: "Braces" },
  { id: "s2", name: "Django", category: "Development", level: 88, icon: "Server" },
  { id: "s3", name: "C++ / STL", category: "Languages", level: 84, icon: "Cpu" },
  { id: "s4", name: "TypeScript / JS", category: "Languages", level: 80, icon: "FileCode2" },
  
  // Testing & QA
  { id: "s5", name: "Selenium Automation", category: "Development", level: 90, icon: "Shield" },
  { id: "s6", name: "WebDriver Assertions", category: "Development", level: 86, icon: "CheckSquare" },
  { id: "s7", name: "Virtual Environments", category: "Development", level: 85, icon: "Package" },

  // Tools & DB
  { id: "s8", name: "Supabase & SQL", category: "Tools / Cloud", level: 85, icon: "Database" },
  { id: "s9", name: "GitHub Actions & Git", category: "Tools / Cloud", level: 88, icon: "GitBranch" },
  { id: "s10", name: "Jira / Agile DevOps", category: "Tools / Cloud", level: 82, icon: "Layers" },

  // CS Core
  { id: "s11", name: "Data Structures & Algos", category: "CS Core", level: 92, icon: "Network" },
  { id: "s12", name: "Database Design (DBMS)", category: "CS Core", level: 86, icon: "DatabaseBackup" },
  { id: "s13", name: "Data Communications (WDM)", category: "CS Core", level: 84, icon: "Laptop" }
];

export const INITIAL_PROJECTS: Project[] = [
  {
    id: "p1",
    title: "Gearshare Backend & QA Suite",
    category: "Web Dev",
    description: "Robust Python and Django backend infrastructure for the Gearshare platform, designed with structured Django migrations, modular virtual setups, and comprehensive Selenium automated UI testing.",
    details: "Served in the core development team as the QA Lead. Managed Django backend environments, troubleshooted complex database transitions and dependency trees, and integrated virtual sandboxes. Developed end-to-end automated regression test scripts via Selenium to verify frontend layouts, form collections, and authenticated pathways.",
    tags: ["QA Lead", "Python", "Django", "Selenium", "Supabase", "Jira", "GitHub"],
    status: "Completed",
    demoUrl: "#",
    githubUrl: "https://github.com/iamsakib32/Gearshare",
    architectureDetails: "Django WSGI -> Supabase Postgres Live Sync. End-to-end regression validation with Selenium test runners."
  },
  {
    id: "p4",
    title: "Project Grihaloy",
    category: "Web Dev",
    description: "A specialized localized housing and residential discovery portal designed to streamline tenancy, housing queries, and local property searches seamlessly.",
    details: "Served as the Project Leader to direct development lifecycles, git repository branching, and collaborative structures. Structured clean frontend component code, optimized visual render pathways, and implemented modular responsive layouts with Tailwind CSS.",
    tags: ["Project Leader", "React", "Node.js", "Express", "Tailwind CSS", "GitHub"],
    status: "Completed",
    demoUrl: "#",
    githubUrl: "https://github.com/AniK-75/project_Grihaloy",
    architectureDetails: "React SPA Routing -> Express API Middleware controllers -> Fully response layout grids."
  },
  {
    id: "p2",
    title: "Sovereign Web3 & Blockchain Audit",
    category: "Systems & Security",
    description: "Comprehensive technical research and articles mapping the evolution of cryptocurrency systems, peer-to-peer consensus channels, and institutional Bitcoin implementation models.",
    details: "Analytically evaluated decentralized network designs, security bottlenecks associated with validation mechanics, and the systematic frameworks needed to integrate public blockchain ledgers into legacy corporate financial streams.",
    tags: ["Blockchain", "Bitcoin", "Web3", "Decentralized Networks", "Technical Reporting"],
    status: "Completed",
    demoUrl: "#",
    githubUrl: "https://github.com/hemalfarouqe",
    architectureDetails: "State Validation Auditing -> Multi-layered Ledger Consensus Models -> Blockchain Scalability Graphs."
  },
  {
    id: "p3",
    title: "6G Backhaul Telecommunications",
    category: "Data Science",
    description: "High-capacity network research and telecommunications analysis exploring 6G backhaul infrastructure leveraging high-performance Wavelength Division Multiplexing (WDM).",
    details: "Conducted scientific reporting on optical fiber transmission and bandwidth capacity enhancements. Modeled signal-to-noise ratios, channel cross-talk, and multiplexing efficiency across sub-millimeter bands to solve long-range mobile haul bottlenecks.",
    tags: ["Data Communications", "WDM", "6G Backhaul", "Optics Simulation", "Signal Analysis"],
    status: "Completed",
    demoUrl: "#",
    githubUrl: "https://github.com/hemalfarouqe",
    architectureDetails: "Wavelength Multiplexing Simulators -> Fiber Spectral Loss Equations -> Throughput Stress Tests."
  }
];

export const INITIAL_EXPERIENCES: Experience[] = [
  {
    id: "e1",
    role: "B.Sc. in Computer Science & Engineering",
    organization: "University of Asia Pacific (UAP), Dhaka",
    period: "Jul 2023 - Jul 2027",
    type: "Education",
    location: "Dhaka, Bangladesh",
    achievements: [
      "Currently pursuing studies in the 3rd Year, 2nd Semester.",
      "Expected Graduation Passing Time: June/July 2027 (Insh'Allah).",
      "Focused on advanced algorithms, automated testing frameworks, databases (Supabase/MySQL), and computer communications.",
      "Key languages studied: C++, Java, and Python script architectures."
    ],
    skillsAssociated: ["C++", "Java", "Python", "Data Structures & Algos", "Database Design (DBMS)", "Data Communications (WDM)"]
  },
  {
    id: "e1.2",
    role: "HSC, Non-Professional General Legal Studies",
    organization: "Dhanmondi Ideal College",
    period: "2019 - 2021",
    type: "Education",
    location: "Dhaka, Bangladesh",
    achievements: [
      "Completed Higher Secondary Certificate.",
      "Focused on analytical curriculum, logic parameters, and basic computing technologies."
    ],
    skillsAssociated: ["Logical Reasoning", "Computer Fundamentals"]
  },
  {
    id: "e1.5",
    role: "Development Lead",
    organization: "IGSE",
    period: "Oct 2025 - Jan 2026",
    type: "Experience",
    location: "Dhaka, Bangladesh (Remote)",
    achievements: [
      "Served as Development Lead for the IGSE crypto token development loop.",
      "Led creation and programming of custom automated AI-based messaging and notification bots.",
      "Implemented secure blockchain structures to establish optimized decentralization mechanisms."
    ],
    skillsAssociated: ["Social Media", "Community Building", "AI Automation", "Blockchain & Web3", "Python"]
  },
  {
    id: "e1.8",
    role: "Gearshare Backend & QA Specialist",
    organization: "Gearshare Development Team",
    period: "2024 - Present",
    type: "Experience",
    location: "Collaborative Project",
    achievements: [
      "Designed backend logic and administered secure virtual python configurations with virtualenv.",
      "Formulated and debugged complex Django database schema migrations to keep storage tiers highly synchronized.",
      "Scripted state-based browser flow checks with Selenium, streamlining QA test routines."
    ],
    skillsAssociated: ["Python", "Django", "Selenium Automation", "Supabase & SQL", "Jira / Agile DevOps"]
  },
  {
    id: "e2",
    role: "Community Manager",
    organization: "Omega",
    period: "Nov 2021 - Aug 2022",
    type: "Experience",
    location: "Dhaka, Bangladesh (Remote)",
    achievements: [
      "Worked as a Telegram Community Manager for the Omega Crypto ecosystem.",
      "Managed general subscriber engagement, form collections, and community scalability pipelines."
    ],
    skillsAssociated: ["Social Media", "Community Marketing", "Growth Operations"]
  },
  {
    id: "e3",
    role: "Ambassador",
    organization: "IBT",
    period: "Sep 2020 - Jan 2021",
    type: "Experience",
    location: "Dhaka, Bangladesh (Remote)",
    achievements: [
      "Acted as Community Ambassador in Bangladesh leading official communications and outreach pathways.",
      "Collaborated with project engineers to deliver key technical briefs and organize developer seminars."
    ],
    skillsAssociated: ["Brand Ambassadorship", "Diplomacy", "Community Organization"]
  }
];

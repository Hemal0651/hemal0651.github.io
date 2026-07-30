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
  bio: "Pursuing a B.Sc. in Computer Science & Engineering (4th Year, 1st Semester) at the University of Asia Pacific (UAP). Passionate about full-stack web engineering with TypeScript, React, Tailwind CSS, Node.js, Python/Django backends, and UI design concepts.",
  aboutText: "Hello! I am Hemal Farouqe, a 4th-year 1st-semester B.Sc. student in Computer Science and Engineering at the University of Asia Pacific (UAP), Dhaka. I specialize in full-stack web development using TypeScript, React, Tailwind CSS, Node.js, Python and Django backends, automated quality assurance testing with Selenium, and modern UI web design concepts. Insh'Allah, I will graduate by June/July 2027. I am eager to apply my skills to real-world software engineering, web frameworks, and telecom analysis.",
  email: "hemalfarouqe0651@gmail.com",
  location: "Dhaka, Bangladesh",
  github: "https://github.com/Hemal0651",
  linkedin: "https://www.linkedin.com/in/hemal-farouqe-204301199",
  twitter: "https://x.com/hemal0651",
  phone: "+8801627947807",
  terminalWelcomeMsg: "Initializing CSE terminal session for Hemal Farouqe (4th Year, 1st Sem)...\nType 'help' to render commands.\nStatus: Ready to build, design, and automate.",
  themeColor: "orange"
};

export const INITIAL_SKILLS: Skill[] = [
  // Languages & Core Stack
  { id: "s0", name: "TypeScript / JS", category: "Languages", level: 92, icon: "FileCode2" },
  { id: "s1", name: "React 19", category: "Development", level: 90, icon: "Code" },
  { id: "s2", name: "Tailwind CSS", category: "Development", level: 94, icon: "Palette" },
  { id: "s3", name: "Node.js & Express", category: "Development", level: 88, icon: "Server" },
  { id: "s4", name: "Python", category: "Languages", level: 92, icon: "Braces" },
  { id: "s5", name: "Django", category: "Development", level: 88, icon: "Layers" },
  { id: "s6", name: "C++ / STL", category: "Languages", level: 85, icon: "Cpu" },
  
  // Testing & QA
  { id: "s7", name: "Selenium Automation", category: "Development", level: 90, icon: "Shield" },
  { id: "s8", name: "WebDriver Assertions", category: "Development", level: 86, icon: "CheckSquare" },

  // Tools & DB
  { id: "s9", name: "Supabase & SQL", category: "Tools / Cloud", level: 86, icon: "Database" },
  { id: "s10", name: "Git & GitHub Actions", category: "Tools / Cloud", level: 90, icon: "GitBranch" },
  { id: "s11", name: "Jira / Agile DevOps", category: "Tools / Cloud", level: 82, icon: "Layers" },

  // CS Core
  { id: "s12", name: "Data Structures & Algos", category: "CS Core", level: 92, icon: "Network" },
  { id: "s13", name: "Database Design (DBMS)", category: "CS Core", level: 88, icon: "DatabaseBackup" },
  { id: "s14", name: "Data Communications (WDM)", category: "CS Core", level: 84, icon: "Laptop" }
];

export const INITIAL_PROJECTS: Project[] = [
  {
    id: "p-porsche",
    title: "Porsche Cayman Concept",
    category: "Web Dev",
    description: "Luxury automotive concept showcasing a 409-frame cinematic experience, smooth scrollytelling, and interactive motion UI.",
    details: "Designed and engineered a luxury automotive web experience showcasing a 409-frame cinematic canvas sequence, smooth scrollytelling dynamics, interactive vehicle specs, and motion UI.",
    tags: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    status: "Completed",
    demoUrl: "https://porsche-cayman-concept.vercel.app/",
    githubUrl: "https://github.com/Hemal0651/porsche-cayman-concept",
    architectureDetails: "Next.js / React -> Tailwind CSS -> 409-Frame Canvas Motion Engine."
  },
  {
    id: "p-keraunos",
    title: "Keraunos Reveals",
    category: "Web Dev",
    description: "Interactive storytelling web design concept featuring a hover-revealing hero section, fluid animations, and modern 3D UI components.",
    details: "Crafted an interactive storytelling web presentation featuring a hover-revealing canvas hero section, fluid animations, layered depth, and modern 3D UI components.",
    tags: ["React", "TypeScript", "Vite", "Tailwind CSS", "Canvas API"],
    status: "Completed",
    demoUrl: "https://keraunos.ai.studio/",
    githubUrl: "https://github.com/Hemal0651/keraunos-reveals",
    architectureDetails: "React / Vite SPA -> Canvas API Hover Masking -> Tailwind CSS Styling."
  },
  {
    id: "p-adidas",
    title: "Adidas Concept (Adidas Elevate)",
    category: "Web Dev",
    description: "Performance footwear landing page pushing biomechanical innovation themes, built entirely with pure vanilla web standards and CSS parallax motion.",
    details: "Engineered a high-energy performance footwear landing page pushing biomechanical innovation themes, built entirely from scratch with pure vanilla ES6 JavaScript, HTML5, custom CSS3, and CSS parallax dynamics without external frameworks.",
    tags: ["Vanilla JS", "HTML5", "CSS3", "Parallax CSS"],
    status: "Completed",
    demoUrl: "https://adidas-concept-beryl.vercel.app/",
    githubUrl: "https://github.com/Hemal0651/adidas-concept",
    architectureDetails: "Zero Frameworks -> Pure ES6 JavaScript -> HTML5 & Parallax CSS3."
  },
  {
    id: "p-amifahim",
    title: "Ami Fahim Portfolio",
    category: "Web Dev",
    description: "Web3 developer portfolio featuring a live Solidity terminal, real-time crypto price feed, AI chatbot, sticker playground, and dark/light modes.",
    details: "Designed and built a complete Web3 developer portfolio website for Ami Fahim featuring an interactive live Solidity terminal, real-time crypto price ticker feeds, AI chatbot assistant, interactive sticker playground, and theme switcher.",
    tags: ["React 19", "TypeScript", "Vite", "Framer Motion", "Solidity"],
    status: "Completed",
    demoUrl: "https://www.amifahim.tech/",
    githubUrl: "https://github.com/amifahim404/amifahim404.github.io",
    architectureDetails: "React 19 SPA -> Live Solidity Terminal & Crypto Price Feed API -> Framer Motion."
  },
  {
    id: "p-swirls",
    title: "Swirls Icecream Concept",
    category: "Web Dev",
    description: "Luxury ice cream brand concept page featuring dynamic theme color shifts, organic SVG design aesthetics, micro-interactions, and an interactive 'Flavor Finder' quiz.",
    details: "Created a luxury artisan ice cream brand concept page with dynamic theme color shifting per flavor, custom organic SVG vector graphics, micro-interactions, and an interactive 'Flavor Finder' quiz built with zero external framework overhead.",
    tags: ["Vanilla JS", "HTML5", "Custom CSS3", "SVG Graphics"],
    status: "Completed",
    demoUrl: "https://swirls-icecream.vercel.app/",
    githubUrl: "https://github.com/Hemal0651/swirls-icecream-concept",
    architectureDetails: "Zero Frameworks -> Vanilla JavaScript DOM Engine -> Dynamic CSS3 & SVG Assets."
  },
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
      "Currently pursuing studies in the 4th Year, 1st Semester.",
      "Expected Graduation Passing Time: June/July 2027 (Insh'Allah).",
      "Focused on TypeScript, React, Tailwind CSS, Node.js, Python/Django, advanced algorithms, automated testing frameworks, databases (Supabase/MySQL), and computer communications.",
      "Key languages & stack: TypeScript, React, Node.js, Python, C++, Java."
    ],
    skillsAssociated: ["TypeScript", "React", "Tailwind CSS", "Node.js", "Python", "C++", "Data Structures & Algos", "Database Design (DBMS)", "Data Communications (WDM)"]
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

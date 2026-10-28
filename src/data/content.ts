export const profile = {
  name: "Joshua Mendoza",
  role: "Software QA Engineer",
  location: "Rizal, Philippines",
  status: "Available for opportunities",
  email: "joshua.mendoza0824@gmail.com",
  phone: "+63 969 469 1687",
  phoneHref: "tel:+639694691687",
  linkedin: "https://www.linkedin.com/in/joshua-mendoza-softwareqaengineer",
  resume: "/Joshua-Mendoza-QA-CV.pdf",
  resumeName: "Joshua Mendoza QA CV.pdf",
  tagline: "I don't just find bugs.",
  headline: "I help prevent defects from ever reaching your users.",
  summary:
    "Software QA Engineer with over 4 years of experience ensuring release quality across fintech, enterprise, and mobile platforms.",
};

export const nav = [
  { id: "intro", label: "Intro" },
  { id: "toolkit", label: "Toolkit" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "philosophy", label: "Philosophy" },
  { id: "contact", label: "Contact" },
];

export const stats = [
  { value: "4+", label: "Years in QA" },
  { value: "10+", label: "Projects tested" },
  { value: "2", label: "Companies" },
  { value: "2", label: "Awards" },
];

export const skillGroups = [
  {
    title: "Automation",
    index: "01",
    items: ["Robot Framework", "Selenium WebDriver", "Java", "JavaScript", "TypeScript", "Playwright", "Regression testing"],
  },
  {
    title: "Manual testing",
    index: "02",
    items: ["Test planning", "Defect reporting", "SIT & UAT", "Mobile & web testing", "API testing", "Cross-platform testing", "Agile / Scrum"],
  },
  {
    title: "Tools & platforms",
    index: "03",
    items: ["Postman", "ClickUp", "SQL", "Git", "VS Code / Eclipse", "Agile / Scrum"],
  },
];

export const experience = [
  {
    company: "TraxionTech",
    role: "Software QA Engineer",
    period: "Mar 2024 — Present",
    points: [
      "Designed and executed 100+ test cases per release for web and mobile applications.",
      "Built and maintained Robot Framework automation scripts.",
      "Performed regression and end-to-end testing.",
      "Worked with developers and stakeholders in Agile sprints.",
      "Mentored junior testers and helped improve QA processes.",
    ],
    badges: ["Rising Star · 2025", "Innovation Award · 2026"],
  },
  {
    company: "Stratpoint Technologies",
    role: "Apple UAT Tester",
    period: "Jun 2022 — Oct 2023",
    points: [
      "Executed functional and user acceptance testing.",
      "Wrote and maintained test cases from requirements.",
      "Logged and tracked defects with clear documentation.",
      "Performed regression testing to protect system stability.",
    ],
    badges: [] as string[],
  },
];

export const categories = ["All", "Fintech", "Mobile", "Web", "Automation", "UAT", "Enterprise"] as const;
export type Category = (typeof categories)[number];

export type Project = {
  slug: string;
  name: string;
  index: string;
  summary: string;
  outcome: string;
  categories: Exclude<Category, "All">[];
  tags: string[];
  focus: string[];
  featuredCase?: boolean;
};

export const projects: Project[] = [
  {
    slug: "traxionpay",
    name: "TraxionPay",
    index: "01",
    summary: "End-to-end automation for payment gateway flows.",
    outcome: "Cut regression cycle time by 40% and caught critical transaction bugs before production.",
    categories: ["Fintech", "Web", "Automation"],
    tags: ["Fintech", "Automation", "Web"],
    focus: ["Payment gateway flows", "End-to-end automation", "Regression cycle time"],
    featuredCase: true,
  },
  {
    slug: "digicoop",
    name: "DigiCOOP",
    index: "02",
    summary: "Full regression and functional coverage for a cooperative digital banking platform.",
    outcome: "Reported zero critical defects at launch.",
    categories: ["Fintech", "Web", "Mobile"],
    tags: ["Fintech", "Web", "Mobile"],
    focus: ["Regression testing", "Functional testing", "Digital banking"],
    featuredCase: true,
  },
  {
    slug: "micropay",
    name: "MicroPay",
    index: "03",
    summary: "Validated micro-transaction flows and API integrations.",
    outcome: "Found and resolved edge-case failures in high-volume scenarios.",
    categories: ["Fintech"],
    tags: ["Fintech", "API Testing", "Postman"],
    focus: ["Micro-transaction flows", "API integrations", "High-volume edge cases"],
    featuredCase: true,
  },
  {
    slug: "bibo-super-app",
    name: "BIBO Super App",
    index: "04",
    summary: "Cross-platform mobile testing for a multi-service app.",
    outcome: "Set up a structured UAT process that significantly reduced post-release defects.",
    categories: ["Mobile", "UAT"],
    tags: ["Mobile", "UAT", "Regression"],
    focus: ["Cross-platform mobile testing", "Structured UAT process", "Regression"],
    featuredCase: true,
  },
  {
    slug: "talent-point",
    name: "Talent Point",
    index: "05",
    summary: "UAT for an internal talent management platform.",
    outcome: "Verified recruitment workflows and data accuracy.",
    categories: ["Web", "UAT", "Enterprise"],
    tags: ["Web", "UAT", "Enterprise"],
    focus: ["User acceptance testing", "Recruitment workflows", "Data accuracy"],
  },
  {
    slug: "rbpay",
    name: "RBPay",
    index: "06",
    summary: "Test plans for rural banking payments.",
    outcome: "Focused on reliability under weak network conditions.",
    categories: ["Fintech", "Mobile"],
    tags: ["Fintech", "Mobile", "Manual"],
    focus: ["Test planning", "Rural banking payments", "Weak network reliability"],
  },
  {
    slug: "psslai-mobile-app",
    name: "PSSLAI Mobile App",
    index: "07",
    summary: "Mobile app for a savings and loan association.",
    outcome: "Checked authentication, financial data accuracy, and privacy compliance.",
    categories: ["Mobile", "Fintech", "UAT"],
    tags: ["Mobile", "Fintech", "UAT"],
    focus: ["Authentication", "Financial data accuracy", "Privacy compliance"],
  },
  {
    slug: "mannypay",
    name: "MannyPay",
    index: "08",
    summary: "Mobile app validated across user roles.",
    outcome: "A detailed defect report improved stability before launch.",
    categories: ["Mobile", "Fintech"],
    tags: ["Mobile", "Fintech", "Manual"],
    focus: ["Authentication", "Financial data across user roles", "Defect reporting"],
  },
  {
    slug: "jobsite",
    name: "Jobsite",
    index: "09",
    summary: "Functional testing of recruitment and application tracking.",
    outcome: "Identified UX inconsistencies and data validation gaps before go-live.",
    categories: ["Web", "UAT", "Enterprise"],
    tags: ["Web", "UAT", "Enterprise"],
    focus: ["Functional testing", "Application tracking", "Data validation"],
  },
];

export const philosophy = [
  {
    title: "Prevent, don't just detect",
    body: "The goal is to stop defects from reaching users, not only to find them after the fact.",
  },
  {
    title: "Document with clarity",
    body: "Defects are logged and tracked with clear documentation so developers can act on them quickly.",
  },
  {
    title: "Protect stability",
    body: "Regression testing keeps every release from breaking what already works.",
  },
  {
    title: "Quality is a team sport",
    body: "Working with developers and stakeholders in Agile sprints, and mentoring junior testers, raises the bar for everyone.",
  },
];

export const awards = [
  { year: "2026", title: "Innovation Award", org: "TraxionTech" },
  { year: "2025", title: "Rising Star", org: "TraxionTech" },
];

export const aboutParagraphs = [
  "I'm Joshua Mendoza, a Software QA Engineer based in Rizal, Philippines, with over 4 years of experience ensuring release quality across fintech, enterprise, and mobile platforms.",
  "I started in UAT at Stratpoint Technologies, writing test cases from requirements and tracking defects. At TraxionTech I've grown into automation with Robot Framework, regression and end-to-end testing, and mentoring junior testers.",
];

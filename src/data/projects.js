/**
 * THE DEV WORKSPACE — project archive.
 *
 * Each project is a full case study. Nothing here invents metrics, users,
 * revenue, publications, or production status. Screenshots and external links
 * are marked placeholders until genuine assets are supplied.
 *
 * Feature status vocabulary:
 *   "Worked on"  — area Adarsh has actively worked on (per project notes)
 *   "Built"      — described as a built component in the project brief
 *   "Planned"    — intended functionality, not confirmed implemented
 *   "Exploring"  — research/experimentation area
 */

export const projectCategories = [
  "All",
  "AI / ML",
  "AI Agents",
  "Software Development",
  "Web Applications",
  "Entrepreneurship",
  "Research / Experiments",
];

export const projects = [
  {
    slug: "notekart",
    title: "NoteKart",
    tagline: "A student-to-student marketplace for study materials.",
    categories: ["Entrepreneurship", "Web Applications", "Software Development"],
    accent: "amber",
    icon: "ShoppingBag",
    status: "Product in development",
    role: "Product building & development",
    year: null,
    description:
      "NoteKart is a student-to-student marketplace focused on buying, selling, and exchanging study materials. The idea is simple: the notes and resources one student no longer need can become exactly what another student is looking for.",
    problem:
      "Study materials are scattered across seniors, groups, and chats, while students repeatedly pay for resources that already exist on campus. There is no trusted, student-first place to exchange them.",
    contribution:
      "Product-building work across the marketplace concept and its surrounding community: registration and authentication flows, chat, the student community, an ideas-and-collaboration campaign, and email marketing with campaign tracking.",
    stack: ["PHP", "Django", "MySQL", "HTML/CSS", "JavaScript"],
    features: [
      { name: "Marketplace concept & product direction", status: "Worked on" },
      { name: "User registration & authentication", status: "Worked on" },
      { name: "Chat between students", status: "Worked on" },
      { name: "Student community", status: "Worked on" },
      { name: "Ideas & collaboration campaign", status: "Worked on" },
      { name: "Email marketing & campaign tracking", status: "Worked on" },
    ],
    challenges:
      "A marketplace only works when both sides show up: listings need trust, and buyers need a reason to return. Balancing product features with community-building and outreach was the core challenge.",
    approach:
      "Treat NoteKart as a product, not just a website — pair the marketplace mechanics with community campaigns and tracked email outreach, and iterate on what students actually respond to.",
    results:
      "No public performance metrics are claimed here. User counts, sales, and revenue figures will be added only once verified.",
    learnings:
      "Building for students taught me that distribution and community matter as much as code — and that campaign tracking is how you learn what actually works.",
    screenshots: [
      { id: "nk-1", caption: "Marketplace browsing experience" },
      { id: "nk-2", caption: "Student chat & community" },
      { id: "nk-3", caption: "Campaign tracking dashboard" },
    ],
    github: null,
    demo: null,
  },
  {
    slug: "paper-format-translator",
    title: "Paper Format Translator",
    tagline: "Translating research papers between publication formats — and checking what survives.",
    categories: ["Research / Experiments", "Software Development"],
    accent: "sage",
    icon: "FileSearch",
    status: "Research-oriented engineering",
    role: "Engineering & evaluation",
    year: null,
    description:
      "A project focused on transforming academic research papers between different publication formats and, crucially, evaluating the quality of that conversion rather than assuming it worked.",
    problem:
      "Converting a paper between formats can silently break it: sections disappear, citations drift, figures and tables lose integrity. A conversion is only useful if you can measure what was preserved and what was lost.",
    contribution:
      "Exploration of the conversion pipeline and its evaluation: structural preservation, missing-content detection, citation and reference defect analysis, figure/table integrity checks, and side-by-side comparison of original versus converted papers.",
    stack: ["Python", "Document processing", "Evaluation scripts"],
    features: [
      { name: "Document conversion between formats", status: "Exploring" },
      { name: "Structural preservation checks", status: "Exploring" },
      { name: "Missing content detection", status: "Exploring" },
      { name: "Citation & reference defect analysis", status: "Exploring" },
      { name: "Figure & table integrity checks", status: "Exploring" },
      { name: "Formatting quality evaluation", status: "Exploring" },
      { name: "Original vs converted comparison", status: "Exploring" },
    ],
    challenges:
      "Format conversion is easy to demo and hard to trust. The real difficulty is defining and automating checks that catch subtle structural and reference defects a human would miss.",
    approach:
      "Pair every conversion with an evaluation pass: compare structure, references, and visual elements between source and output, and surface defects as explicit findings instead of a silent success.",
    results:
      "This is unpublished engineering work. No formal publication, journal, or DOI is claimed.",
    learnings:
      "Evaluation is the product. Building the checker taught me more about document structure than the converter itself.",
    screenshots: [
      { id: "pft-1", caption: "Original vs converted comparison" },
      { id: "pft-2", caption: "Defect detection report" },
    ],
    github: null,
    demo: null,
  },
  {
    slug: "ai-diet-recommendation",
    title: "AI Diet Recommendation App",
    tagline: "A Streamlit app that turns your numbers into a meal plan starting point.",
    categories: ["AI / ML", "Web Applications"],
    accent: "blue",
    icon: "Salad",
    status: "Working prototype",
    role: "Design & development",
    year: null,
    description:
      "A Streamlit-based diet recommendation application that combines classic energy calculations with nutrition data and a machine-learning model integration to suggest meals.",
    problem:
      "Generic diet advice ignores the individual. Energy needs depend on body metrics and activity — the app makes those calculations transparent and uses them to ground meal suggestions.",
    contribution:
      "Built the application flow: BMI, BMR, and TDEE calculations, nutrition data handling, meal recommendation logic, and integration of a machine-learning model.",
    stack: ["Python", "Streamlit", "Machine learning", "Nutrition data"],
    features: [
      { name: "BMI calculation", status: "Built" },
      { name: "BMR calculation", status: "Built" },
      { name: "TDEE calculation", status: "Built" },
      { name: "Nutrition data handling", status: "Built" },
      { name: "Meal recommendations", status: "Built" },
      { name: "ML model integration", status: "Built" },
    ],
    challenges:
      "Keeping the science honest: energy formulas are deterministic, but recommendations must not be presented as medical advice or as more accurate than the model actually is.",
    approach:
      "Separate the deterministic calculations from the model-driven suggestions, and be explicit about what each part does. No accuracy or medical-effectiveness claims are made.",
    results:
      "A functional prototype. No model-accuracy or medical-effectiveness figures are claimed.",
    learnings:
      "Wrapping a model in a usable interface is where ML meets product thinking — and where honesty about limitations matters most.",
    screenshots: [
      { id: "diet-1", caption: "Input form & energy results" },
      { id: "diet-2", caption: "Meal recommendation view" },
    ],
    github: null,
    demo: null,
    disclaimer:
      "This project is an educational prototype. It is not medical advice and does not claim medical effectiveness.",
  },
  {
    slug: "online-college-election-system",
    title: "Online College Election System",
    tagline: "Managing college elections with Java and MySQL.",
    categories: ["Software Development"],
    accent: "blue",
    icon: "Vote",
    status: "Academic software project",
    role: "Development",
    year: null,
    description:
      "An online college election management system built with Java and MySQL, designed to organize candidates, elections, and voting in one place.",
    problem:
      "Manual college elections are slow and error-prone: candidate lists, voter eligibility, and vote counting all need structure and a reliable record.",
    contribution:
      "Development of the system's core management modules and database integration. Feature statuses below distinguish intended functionality from confirmed implementation.",
    stack: ["Java", "MySQL"],
    features: [
      { name: "Candidate management", status: "Planned" },
      { name: "Election workflows", status: "Planned" },
      { name: "Voting management", status: "Planned" },
      { name: "Database integration", status: "Planned" },
    ],
    challenges:
      "Election software must be trustworthy: eligibility, one-person-one-vote, and accurate counting are correctness requirements, not nice-to-haves.",
    approach:
      "Model the election domain explicitly in the database schema first, then build management workflows on top of it. Implementation status of each module will be updated as it is confirmed.",
    results:
      "Implementation details are being documented; no deployment or adoption claims are made.",
    learnings:
      "Database-first thinking: getting the schema right made the election workflows far easier to reason about.",
    screenshots: [
      { id: "elec-1", caption: "Candidate management screen" },
      { id: "elec-2", caption: "Election & voting workflow" },
    ],
    github: null,
    demo: null,
  },
  {
    slug: "ai-agent-reliability-lab",
    title: "AI Agent Reliability Lab",
    tagline: "Testing whether AI agents actually finish what they start.",
    categories: ["AI Agents", "Research / Experiments"],
    accent: "amber",
    icon: "Bot",
    status: "Personal experimentation",
    role: "Experimentation & evaluation",
    year: null,
    description:
      "My experimentation and evaluation work around AI agent task execution and reliability: running tasks, tracking runs, reviewing logs, and validating agent-generated results.",
    problem:
      "An agent that produces output is not the same as an agent that produces correct output. Without run history and validation, reliability is just a guess.",
    contribution:
      "Building and using a terminal-based workflow for agent task execution, task tracking, run history, reviewer logs, and validation of results.",
    stack: ["Python", "Terminal workflows", "AI agents", "Evaluation logs"],
    features: [
      { name: "Agent task execution", status: "Worked on" },
      { name: "Task tracking", status: "Worked on" },
      { name: "Run history", status: "Worked on" },
      { name: "Reviewer logs", status: "Worked on" },
      { name: "Reliability evaluation", status: "Exploring" },
      { name: "Validation of agent results", status: "Exploring" },
      { name: "Terminal-based agent workflows", status: "Worked on" },
    ],
    challenges:
      "Agent failures are often quiet — a plausible-looking result that is subtly wrong. Surfacing those failures required structured logs and explicit validation steps.",
    approach:
      "Treat every run as evidence: record what the agent was asked, what it did, and what a reviewer concluded, then evaluate reliability across runs instead of trusting a single demo.",
    results:
      "This is personal experimentation and evaluation work — not a commercial AI product or a production deployment.",
    learnings:
      "Validation is the difference between an impressive demo and a dependable system. Run history is what makes reliability measurable.",
    screenshots: [
      { id: "lab-1", caption: "Terminal agent run" },
      { id: "lab-2", caption: "Run history & reviewer logs" },
    ],
    github: null,
    demo: null,
  },
];

export const getProject = (slug) => projects.find((p) => p.slug === slug);
export const getRelated = (slug) => {
  const current = getProject(slug);
  if (!current) return [];
  return projects
    .filter((p) => p.slug !== slug && p.categories.some((c) => current.categories.includes(c)))
    .slice(0, 2);
};
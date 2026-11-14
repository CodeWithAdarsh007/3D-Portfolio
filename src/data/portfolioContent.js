/**
 * THE DEV WORKSPACE — central editable content.
 *
 * Everything the site displays about Adarsh lives here so it can be updated
 * without touching UI code. Items that are not yet genuine are flagged with
 * `placeholder: true` and rendered with the visible label
 * "DEMO PLACEHOLDER — NOT GENUINE".
 *
 * See CONTENT_REPLACEMENT_GUIDE.md for the full replacement checklist.
 */

export const PLACEHOLDER_LABEL = "DEMO PLACEHOLDER — NOT GENUINE";

export const identity = {
  name: "Adarsh",
  siteName: "The Dev Workspace",
  tagline: "Building intelligent systems. Turning ideas into meaningful products.",
  greeting: "Hello, I'm Adarsh.",
  roles: ["AI/ML Student", "Aspiring AI Engineer", "Product Builder"],
  positioning:
    "I am a Computer Science Engineering student specializing in AI and ML. I enjoy building software, experimenting with intelligent systems, exploring AI agents, and transforming ideas into practical products.",
  education: {
    degree: "B.E. Computer Science Engineering (AI & ML)",
    year: "Third-year undergraduate",
    institution: null, // TODO: add real institution name
    institutionPlaceholder: true,
  },
  careerInterests: ["AI/ML Engineer", "AI Agent Developer", "Entrepreneur / Startup Founder"],
  technicalInterests: [
    "Artificial Intelligence",
    "Machine Learning",
    "Intelligent agents",
    "Software development",
    "Product building",
    "Research & experimentation",
    "Solving practical problems",
    "Building useful technology products",
  ],
  currentlyExploring: [
    "Evaluating how reliably AI agents complete real tasks",
    "Turning student problems into usable products (NoteKart)",
    "Preserving structure when converting research papers between formats",
    "Learning how intelligent systems are validated, not just built",
  ],
};

export const bio = [
  "Hey! I'm Adarsh, a third-year Computer Science Engineering student specializing in Artificial Intelligence and Machine Learning.",
  "I'm passionate about building software, exploring intelligent systems, experimenting with AI agents, and transforming ideas into practical products.",
  "From developing student-focused platforms to experimenting with machine learning and evaluating intelligent systems, I enjoy learning by building and solving real-world problems.",
  "My goal is to build technology that is not just interesting, but genuinely useful.",
];

export const links = {
  github: "https://github.com/CodeWithAdarsh007",
  linkedin: null, // TODO: add real LinkedIn URL
  linkedinPlaceholder: true,
  email: null, // TODO: add real contact email
  emailPlaceholder: true,
  resume: "/resume-adarsh-placeholder.pdf",
  resumePlaceholder: true,
  deployed: "https://3-d-portfolio-xi-tan.vercel.app",
  repo: "https://github.com/CodeWithAdarsh007/3D-Portfolio",
};

export const currentFocus = [
  {
    icon: "Rocket",
    title: "Building NoteKart",
    body: "A student-to-student marketplace for study materials — shaping the product, the community, and the campaigns around it.",
    to: "/projects/notekart",
    accent: "amber",
  },
  {
    icon: "Bot",
    title: "AI agent reliability",
    body: "Running and reviewing agent task executions to understand where intelligent workflows succeed, fail, and need validation.",
    to: "/projects/ai-agent-reliability-lab",
    accent: "blue",
  },
  {
    icon: "FileSearch",
    title: "Research paper conversion",
    body: "Investigating how academic papers survive format translation — structure, citations, figures, and tables.",
    to: "/projects/paper-format-translator",
    accent: "sage",
  },
];

export const skills = [
  {
    category: "Programming",
    icon: "Code2",
    accent: "blue",
    items: [
      { name: "Python", projects: ["ai-diet-recommendation", "paper-format-translator", "ai-agent-reliability-lab"] },
      { name: "Java", projects: ["online-college-election-system"] },
      { name: "PHP", projects: ["notekart"] },
    ],
  },
  {
    category: "Development",
    icon: "Layers",
    accent: "sage",
    items: [
      { name: "Django", projects: ["notekart"] },
      { name: "Streamlit", projects: ["ai-diet-recommendation"] },
    ],
  },
  {
    category: "Databases",
    icon: "Database",
    accent: "amber",
    items: [{ name: "MySQL", projects: ["online-college-election-system", "notekart"] }],
  },
];

export const exploringSkills = [
  "AI agent workflows & tool use",
  "Model evaluation & validation",
  "Machine learning experimentation",
  "Product analytics & campaign tracking",
];

/** Chronological journey. Dates marked null are intentionally left editable. */
export const journey = [
  {
    id: "education",
    kind: "Education",
    accent: "blue",
    icon: "GraduationCap",
    title: "B.E. Computer Science Engineering (AI & ML)",
    org: null,
    orgPlaceholder: true,
    period: "Third year · ongoing",
    body: "Specializing in Artificial Intelligence and Machine Learning. Building a foundation in intelligent systems while learning by shipping real projects.",
  },
  {
    id: "notekart",
    kind: "Product / Entrepreneurship",
    accent: "amber",
    icon: "Rocket",
    title: "NoteKart — student marketplace",
    org: "NoteKart",
    period: null,
    periodPlaceholder: true,
    body: "Product-building work on a student-to-student marketplace for study materials: marketplace concept, authentication, chat, community, and email campaigns.",
    to: "/projects/notekart",
  },
  {
    id: "nss",
    kind: "Community engagement",
    accent: "sage",
    icon: "HeartHandshake",
    title: "NSS — voter registration camp",
    org: "Thakur Shyamnarayan Engineering College",
    period: null,
    periodPlaceholder: true,
    body: "National Service Scheme involvement. Helped conduct a voter-registration camp with the 152 Borivali Electoral Registration Office, with 120 student registrations reported. Community engagement, not employment.",
  },
];

/** Achievements are placeholders until genuine credentials are supplied. */
export const achievements = [
  {
    id: "cert-1",
    icon: "Award",
    title: "Certification title",
    issuer: "Issuing organization",
    date: "Date",
    placeholder: true,
  },
  {
    id: "award-1",
    icon: "Trophy",
    title: "Achievement or milestone",
    issuer: "Context / organization",
    date: "Date",
    placeholder: true,
  },
  {
    id: "cert-2",
    icon: "BadgeCheck",
    title: "Course or credential",
    issuer: "Issuing organization",
    date: "Date",
    placeholder: true,
  },
];

export const research = [
  {
    id: "paper-conversion",
    type: "Engineering study",
    status: "Unpublished · ongoing",
    accent: "sage",
    title: "Quality evaluation of research-paper format conversion",
    body: "Investigating how academic papers change when translated between publication formats: structural preservation, missing-content detection, citation and reference defects, and figure/table integrity.",
    tags: ["Document conversion", "Evaluation", "Integrity checks"],
    to: "/projects/paper-format-translator",
  },
  {
    id: "agent-reliability",
    type: "Experiment",
    status: "Ongoing",
    accent: "blue",
    title: "AI agent task-execution reliability",
    body: "Running agent tasks, tracking runs, and reviewing logs to evaluate how reliably agent-generated results can be validated. Personal experimentation, not a commercial product.",
    tags: ["AI agents", "Validation", "Run history"],
    to: "/projects/ai-agent-reliability-lab",
  },
  {
    id: "diet-ml",
    type: "Applied ML",
    status: "Prototype",
    accent: "amber",
    title: "ML-assisted diet recommendation",
    body: "A Streamlit application combining deterministic energy calculations (BMI/BMR/TDEE) with nutrition data and a machine-learning model integration for meal recommendations.",
    tags: ["Streamlit", "Nutrition data", "Model integration"],
    to: "/projects/ai-diet-recommendation",
  },
];

export const learningNotes = [
  "How agent planners decompose tasks and choose tools",
  "Why validation matters more than raw model output",
  "Preserving document structure across format boundaries",
  "Designing student products people actually return to",
];

export const futureResearch = [
  "Agentic workflows with explicit validation steps",
  "Automated quality scoring for converted documents",
  "Lightweight ML for everyday student problems",
];

/** AI & Agent Lab categories. Demo content is clearly labelled. */
export const labCategories = [
  {
    id: "machine-learning",
    label: "Machine Learning",
    icon: "BrainCircuit",
    accent: "blue",
    blurb: "Hands-on experiments with models, features, and evaluation.",
  },
  {
    id: "deep-learning",
    label: "Deep Learning",
    icon: "Network",
    accent: "sage",
    blurb: "Explorations of neural architectures and representation learning.",
  },
  {
    id: "ai-agents",
    label: "AI Agents",
    icon: "Bot",
    accent: "amber",
    blurb: "Task execution, tool use, planning, and reliability validation.",
  },
  {
    id: "data-science",
    label: "Data Science",
    icon: "ChartScatter",
    accent: "blue",
    blurb: "Cleaning, exploring, and reasoning about real data.",
  },
];

export const labExperiments = [
  {
    id: "diet-demo",
    category: "machine-learning",
    title: "Energy & meal recommendation demo",
    status: "Interactive demo",
    body: "Compute BMI, BMR, and TDEE from your inputs and preview a sample meal suggestion. The calculations are real; the meal suggestion is illustrative sample data, not a trained model's medical output.",
    demo: "diet",
  },
  {
    id: "model-eval",
    category: "machine-learning",
    title: "Model evaluation notes",
    status: "Notes",
    body: "Why accuracy alone is misleading, and how I think about validating model behaviour before trusting it in a product.",
  },
  {
    id: "nn-playground",
    category: "deep-learning",
    title: "Neural network visualizer",
    status: "Planned",
    body: "A future interactive playground to inspect layers and activations. Slot reserved for a real demo once an endpoint or model file is available.",
    placeholder: true,
  },
  {
    id: "agent-workflow",
    category: "ai-agents",
    title: "Agent workflow visualization",
    status: "Illustrative",
    body: "User Task → Agent → Planning → Tool Execution → Validation → Final Result. An illustrative walkthrough of the loop, not a live execution engine.",
    demo: "agent",
  },
  {
    id: "tool-use",
    category: "ai-agents",
    title: "Tool-use & reviewer logs",
    status: "Experiment",
    body: "Tracking how agents call tools, where runs fail, and how reviewer logs surface unreliable results.",
    to: "/projects/ai-agent-reliability-lab",
  },
  {
    id: "data-explorer",
    category: "data-science",
    title: "Nutrition data explorer",
    status: "Sample data",
    body: "A small sample nutrition table used by the diet demo. Clearly labelled sample values, not a verified dataset.",
    demo: "diet",
  },
];

export const contact = {
  heading: "Let's build something useful.",
  body: "Whether it's an AI idea, a product collaboration, or just a conversation about intelligent systems — my inbox is open.",
  formDemo: true, // no backend configured yet
};

export const nav = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/projects", label: "Projects" },
  { to: "/ai-lab", label: "AI Lab" },
  { to: "/research", label: "Research" },
  { to: "/skills", label: "Skills" },
  { to: "/journey", label: "Journey" },
  { to: "/achievements", label: "Achievements" },
  { to: "/contact", label: "Contact" },
];

export const deskObjects = [
  { id: "monitor", label: "Monitor", desc: "Home & introduction", to: "/", icon: "Monitor" },
  { id: "laptop", label: "Laptop", desc: "My projects", to: "/projects", icon: "Laptop" },
  { id: "chip", label: "AI Chip", desc: "AI & Agent Lab", to: "/ai-lab", icon: "Cpu" },
  { id: "notebook", label: "Notebook", desc: "Research & learning", to: "/research", icon: "BookOpen" },
  { id: "folder", label: "Project Folder", desc: "Complete archive", to: "/projects/archive", icon: "FolderArchive" },
  { id: "idcard", label: "ID Card", desc: "About me / resume", to: "/about", icon: "IdCard" },
  { id: "trophy", label: "Trophy", desc: "Achievements", to: "/achievements", icon: "Trophy" },
  { id: "envelope", label: "Envelope", desc: "Contact me", to: "/contact", icon: "Mail" },
];
import {
  FaEnvelope,
  FaInstagram,
  FaLinkedin,
  FaWhatsapp,
} from "react-icons/fa";

// AI/ML skills without icons - will render as text pills
export const AI_ML_SKILLS = [
  { skill_name: "Python", image: "python.png" }, // won't exist - will render as text
  { skill_name: "PyTorch", image: "pytorch.png" },
  { skill_name: "TensorFlow", image: "tensorflow.png" },
  { skill_name: "Scikit-learn", image: "sklearn.png" },
  { skill_name: "NumPy", image: "numpy.png" },
  { skill_name: "Pandas", image: "pandas.png" },
  { skill_name: "OpenCV", image: "opencv.png" },
  { skill_name: "Hugging Face", image: "hf.png" },
  { skill_name: "LangChain", image: "langchain.png" },
  { skill_name: "Jupyter", image: "jupyter.png" },
  { skill_name: "Computer Vision", image: "cv.png" },
  { skill_name: "NLP", image: "nlp.png" },
] as const;

// Web/Full-Stack skills with icons
export const WEB_SKILLS = [
  {
    skill_name: "React",
    image: "react.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "Next.js",
    image: "next.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "TypeScript",
    image: "ts.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "Node.js",
    image: "node.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "MongoDB",
    image: "mongodb.png",
    width: 40,
    height: 40,
  },
  {
    skill_name: "MySQL",
    image: "mysql.png",
    width: 70,
    height: 70,
  },
  {
    skill_name: "Firebase",
    image: "firebase.png",
    width: 55,
    height: 55,
  },
  {
    skill_name: "Tailwind",
    image: "tailwind.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "Git",
    image: "ts.png", // using TypeScript icon as fallback
    width: 80,
    height: 80,
  },
  {
    skill_name: "Docker",
    image: "docker.png",
    width: 70,
    height: 70,
  },
  {
    skill_name: "Figma",
    image: "figma.png",
    width: 50,
    height: 50,
  },
] as const;

export const SOCIALS = [
  {
    name: "Email",
    icon: FaEnvelope,
    link: "mailto:engineer.adarshpandey@gmail.com",
  },
  {
    name: "LinkedIn",
    icon: FaLinkedin,
    link: "https://in.linkedin.com/in/adarshpandey9653",
  },
  {
    name: "Instagram",
    icon: FaInstagram,
    link: "https://instagram.com/adarsh_.07",
  },
  {
    name: "WhatsApp",
    icon: FaWhatsapp,
    link: "https://wa.me/919653191940",
  },
] as const;

export const PROJECTS = [
  {
    title: "NoteKart",
    description:
      "A student marketplace for buying and selling books, notes, and study materials.",
    image: "/projects/project-1.png",
    link: "https://www.notekart.co.in/",
    role: "Co-Founder & CTO",
    category: "Marketplace · Full-Stack",
    year: "2024",
    longDescription:
      "NoteKart is a student-first marketplace where students can list, browse, and purchase study materials. I co-founded it and lead engineering — frontend, backend, database, and the admin panel that powers operations.",
    features: [
      "User authentication with buyer/seller workflows",
      "Product listings with search and category filters",
      "Student-focused marketplace UI",
      "MongoDB database with Node/Express backend",
      "Admin panel for listings, users, and analytics",
    ],
    stack: ["Next.js", "Node.js", "MongoDB", "Tailwind"],
  },
  {
    title: "E4A Solution",
    description:
      "Professional business website for a Noida-based IoT solutions company.",
    image: "/projects/project-2.png",
    link: "https://www.e4asolution.com/",
    role: "Full-Stack Developer",
    category: "Business Website · IoT",
    year: "2024",
    longDescription:
      "A complete marketing site for an IoT company — showcasing products, technologies, and services, with an admin panel that lets the team manage content without touching code.",
    features: [
      "Responsive professional UI",
      "Dedicated product and solutions pages",
      "Service and technology sections",
      "Success stories with enquiry forms",
      "Admin panel for content management",
    ],
    stack: ["Next.js", "Node.js", "Tailwind", "MySQL"],
  },
  {
    title: "ANAV Lifespaces",
    description:
      "Real estate website showcasing residential projects and driving customer enquiries.",
    image: "/projects/project-3.png",
    link: "https://www.anavlifespaces.com/",
    role: "Full-Stack Developer",
    category: "Real Estate · Marketing Site",
    year: "2024",
    longDescription:
      "A property-focused website for a real estate developer — project showcases, floor plans, testimonials, and enquiry flows designed to turn visitors into leads.",
    features: [
      "Modern responsive design",
      "Project showcases and property information",
      "Floor plans and project details",
      "Testimonials and enquiry sections",
      "Lead-generation focused presentation",
    ],
    stack: ["Next.js", "Tailwind", "SEO"],
  },
] as const;

export const SERVICES = [
  {
    name: "AI / ML Engineering",
    description:
      "Custom machine learning models, computer vision pipelines, and LLM integrations built for production.",
    deliverables: ["Model development", "Training pipelines", "API integration", "Deployment & monitoring"],
    timeline: "4–12 weeks",
  },
  {
    name: "Full-Stack Web Development",
    description:
      "Fast, modern websites and web apps built with React, Next.js, and Node.js — frontend to backend to deployment.",
    deliverables: ["UI design", "Frontend build", "Backend API", "Deployment"],
    timeline: "2–6 weeks",
  },
  {
    name: "Admin Panels & Dashboards",
    description:
      "Manage your business from one clean, powerful interface. Built with role-based access and real-time analytics.",
    deliverables: ["Auth & roles", "CRUD operations", "Analytics", "Reports"],
    timeline: "3–6 weeks",
  },
  {
    name: "Marketplace & E-commerce",
    description:
      "Buyer/seller platforms with authentication, listings, search, payments, and admin tools.",
    deliverables: ["Auth", "Listings", "Search", "Payments", "Admin"],
    timeline: "6–12 weeks",
  },
  {
    name: "Business Websites",
    description:
      "Professional marketing sites that turn visitors into customers — fast, responsive, SEO-optimized.",
    deliverables: ["Design", "Build", "SEO setup", "Deploy"],
    timeline: "2–4 weeks",
  },
  {
    name: "Maintenance & Support",
    description:
      "Ongoing updates, bug fixes, and performance improvements on a monthly retainer.",
    deliverables: ["Monitoring", "Updates", "Bug fixes", "Perf audits"],
    timeline: "Monthly",
  },
] as const;

export const FOOTER_DATA = [
  {
    title: "Adarsh Pandey",
    data: [
      {
        name: "AI/ML Engineer · Full-Stack Developer",
        icon: null,
        link: "https://3-d-portfolio-xi-tan.vercel.app",
      },
      {
        name: "Co-Founder & CTO @ NoteKart",
        icon: null,
        link: "https://www.notekart.co.in/",
      },
    ],
  },
  {
    title: "Connect",
    data: [
      {
        name: "Email",
        icon: FaEnvelope,
        link: "mailto:engineer.adarshpandey@gmail.com",
      },
      {
        name: "LinkedIn",
        icon: FaLinkedin,
        link: "https://in.linkedin.com/in/adarshpandey9653",
      },
      {
        name: "Instagram",
        icon: FaInstagram,
        link: "https://instagram.com/adarsh_.07",
      },
      {
        name: "WhatsApp",
        icon: FaWhatsapp,
        link: "https://wa.me/919653191940",
      },
    ],
  },
] as const;

export const NAV_LINKS = [
  {
    title: "Home",
    link: "#home",
  },
  {
    title: "Skills",
    link: "#skills",
  },
  {
    title: "Projects",
    link: "#projects",
  },
  {
    title: "Contact",
    link: "#contact",
  },
] as const;

export const LINKS = {
  sourceCode: "https://github.com/CodeWithAdarsh007/3D-Portfolio",
};

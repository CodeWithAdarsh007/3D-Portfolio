import type { Metadata } from "next";

export const siteConfig: Metadata = {
  title: "Adarsh Pandey | AI/ML Engineer & Full-Stack Developer",
  description:
    "AI/ML Engineer and Full-Stack Developer. Co-Founder & CTO of NoteKart. Building intelligent systems for the modern web.",
  keywords: [
    "AI",
    "Machine Learning",
    "Full-Stack Developer",
    "Next.js",
    "React",
    "Python",
    "PyTorch",
    "TensorFlow",
    "portfolio",
  ] as Array<string>,
  authors: {
    name: "Adarsh Pandey",
    url: "https://adarshpandey.dev",
  },
} as const;

export const personalInfo = {
  name: "Adarsh Pandey",
  role: "AI/ML Engineer · Full-Stack Developer",
  tagline: "Co-Founder & CTO of NoteKart",
  email: "engineer.adarshpandey@gmail.com",
  siteUrl: "https://3-d-portfolio-xi-tan.vercel.app",
  location: "India · Works globally",
  responseTime: "Replies within 24 hours",
} as const;

export const heroContent = {
  headline1: "Building intelligent systems",
  headline2: "for the modern web.",
  subheadline:
    "I'm Adarsh — an AI/ML engineer and full-stack developer. I build machine learning-powered applications, business websites, and admin dashboards. Co-Founder & CTO of NoteKart.",
  primaryCTA: { label: "View selected work →", href: "/work" },
  secondaryCTA: { label: "Let's talk", href: "/contact" },
  availabilityBadge: "● Available for Q1 2026",
} as const;

export const bioText =
  "Adarsh Pandey is an AI/ML engineer and full-stack developer based in India. He's the Co-Founder & CTO of NoteKart, a student marketplace used by students across the country. His work spans machine learning pipelines, deep learning models, and production-grade web applications — from React frontends to Node backends to admin dashboards that clients actually enjoy using.";

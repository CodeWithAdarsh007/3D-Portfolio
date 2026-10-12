import type { Metadata } from "next";

export const siteConfig: Metadata = {
  title: "Adarsh Pandey | Portfolio",
  description:
    "Personal portfolio of Adarsh Pandey — AI/ML engineer and full-stack developer. Co-Founder & CTO of NoteKart.",
  keywords: [
    "Portfolio",
    "Full-Stack Developer",
    "Next.js",
    "React",
    "AI",
    "Machine Learning",
  ] as Array<string>,
  authors: {
    name: "Adarsh Pandey",
    url: "https://3-d-portfolio-xi-tan.vercel.app",
  },
} as const;

export const personalInfo = {
  name: "Adarsh Pandey",
  role: "AI/ML Engineer · Full-Stack Developer",
  tagline: "Co-Founder & CTO of NoteKart",
  email: "engineer.adarshpandey@gmail.com",
  siteUrl: "https://3-d-portfolio-xi-tan.vercel.app",
} as const;

export const heroContent = {
  headline1: "Adarsh Pandey",
  headline2: "Portfolio",
  subheadline:
    "AI/ML engineer and full-stack developer. Co-Founder & CTO of NoteKart.",
  primaryCTA: { label: "View Selected Work", href: "#projects" },
  secondaryCTA: { label: "Contact", href: "#contact" },
} as const;

export const bioText =
  "Adarsh Pandey is an AI/ML engineer and full-stack developer. Co-Founder & CTO of NoteKart.";

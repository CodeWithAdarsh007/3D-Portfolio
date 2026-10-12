import { FaYoutube, FaFacebook } from "react-icons/fa";
import {
  RxDiscordLogo,
  RxGithubLogo,
  RxInstagramLogo,
  RxTwitterLogo,
  RxLinkedinLogo,
} from "react-icons/rx";

export const SKILL_DATA = [
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
    skill_name: "JavaScript",
    image: "js.png",
    width: 65,
    height: 65,
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
    skill_name: "Express",
    image: "express.png",
    width: 80,
    height: 80,
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
  {
    skill_name: "Git",
    image: "ts.png",
    width: 80,
    height: 80,
  },
] as const;

export const SOCIALS = [
  {
    name: "Email",
    icon: RxLinkedinLogo,
    link: "mailto:hello@adarshpandey.dev",
  },
  {
    name: "LinkedIn",
    icon: RxLinkedinLogo,
    link: "https://linkedin.com/in/adarshpandey",
  },
  {
    name: "Instagram",
    icon: RxInstagramLogo,
    link: "https://instagram.com/adarshpandey",
  },
  {
    name: "WhatsApp",
    icon: RxLinkedinLogo,
    link: "https://wa.me/919999999999",
  },
] as const;

export const FRONTEND_SKILL = [
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
] as const;

export const BACKEND_SKILL = [
  {
    skill_name: "Node.js",
    image: "node.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "Express",
    image: "express.png",
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
] as const;

export const FULLSTACK_SKILL = [
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

export const OTHER_SKILL = [
  {
    skill_name: "Tailwind",
    image: "tailwind.png",
    width: 80,
    height: 80,
  },
] as const;

export const PROJECTS = [
  {
    title: "NoteKart",
    description:
      "A student marketplace for buying and selling books, notes, and study materials.",
    image: "/projects/notekart.png",
    link: "https://www.notekart.co.in/",
  },
  {
    title: "E4A Solution",
    description:
      "Professional business website for a Noida-based IoT solutions company.",
    image: "/projects/e4a.png",
    link: "https://www.e4asolution.com/",
  },
  {
    title: "ANAV Lifespaces",
    description:
      "Real estate website showcasing residential projects and driving customer enquiries.",
    image: "/projects/anav.png",
    link: "https://www.anavlifespaces.com/",
  },
] as const;

export const FOOTER_DATA = [
  {
    title: "Adarsh Pandey",
    data: [
      {
        name: "Freelance Web Developer",
        icon: null,
        link: "https://adarshpandey.dev",
      },
      {
        name: "Co-Founder & CTO @ NoteKart",
        icon: null,
        link: "https://www.notekart.co.in/",
      },
    ],
  },
  {
    title: "Socials",
    data: [
      {
        name: "Email",
        icon: RxLinkedinLogo,
        link: "mailto:hello@adarshpandey.dev",
      },
      {
        name: "LinkedIn",
        icon: RxLinkedinLogo,
        link: "https://linkedin.com/in/adarshpandey",
      },
      {
        name: "Instagram",
        icon: RxInstagramLogo,
        link: "https://instagram.com/adarshpandey",
      },
    ],
  },
] as const;

export const NAV_LINKS = [
  {
    title: "About",
    link: "#about",
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
  sourceCode: "https://github.com/adarshpandey/space-portfolio",
};

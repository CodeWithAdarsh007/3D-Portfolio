"use client";

import { SparklesIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";
import Image from "next/image";

import {
  slideInFromLeft,
  slideInFromRight,
  slideInFromTop,
} from "@/lib/motion";

export const HeroContent = () => {
  const scrollToProjects = (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById('projects')?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      className="flex flex-row items-center justify-center px-5 md:px-20 w-full z-[20] max-w-[1400px] mx-auto"
    >
      <div className="h-full w-full flex flex-col justify-center m-auto text-start">
        <motion.div
          variants={slideInFromLeft(0.5)}
          className="flex flex-col gap-4 md:gap-6 mt-4 md:mt-8 text-4xl md:text-5xl font-bold text-white max-w-[600px]"
        >
          <span>
            I&apos;m{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7042f8] to-[#a855f7]">
              Adarsh Pandey
            </span>
          </span>
        </motion.div>

        <motion.p
          variants={slideInFromLeft(0.8)}
          className="text-sm md:text-lg text-gray-400 my-4 md:my-5 max-w-[600px]"
        >
          AI/ML engineer and full-stack developer. I build machine learning-powered applications, fast business websites, and admin dashboards. Co-Founder & CTO of NoteKart.
        </motion.p>

        <motion.a
          variants={slideInFromLeft(1)}
          href="#projects"
          onClick={scrollToProjects}
          className="py-2 button-primary text-center text-white cursor-pointer rounded-lg max-w-[200px] inline-block"
        >
          View selected work →
        </motion.a>
      </div>

      <motion.div
        variants={slideInFromRight(0.8)}
        className="hidden md:flex w-full h-full justify-center items-center"
      >
        <Image
          src="/hero-bg.svg"
          alt="work icons"
          height={650}
          width={650}
          draggable={false}
          className="select-none"
        />
      </motion.div>
    </motion.div>
  );
};

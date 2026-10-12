"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

import { LINKS, NAV_LINKS, SOCIALS } from "@/constants";

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`w-full h-[65px] fixed top-0 z-50 px-10 transition-all duration-300 ${
        scrolled
          ? "shadow-lg shadow-[#7042f8]/10 bg-bg-base/90 backdrop-blur-md border-b border-border"
          : "bg-transparent"
      }`}
    >
      {/* Navbar Container */}
      <div className="w-full h-full flex items-center justify-between m-auto px-[10px]">
        {/* Logo + Name */}
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.png"
            alt="Logo"
            width={70}
            height={70}
            draggable={false}
            className="cursor-pointer"
          />
          <div className="hidden md:flex md:self-center font-bold ml-[10px] text-text-secondary">Adarsh Pandey</div>
        </Link>

        {/* Web Navbar */}
        <div className="hidden md:flex w-[500px] h-full flex-row items-center justify-between md:mr-20">
          <div className="flex items-center justify-between w-full h-auto border-border bg-bg-surface mr-[15px] px-[20px] py-[10px] rounded-full text-text-secondary">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.title}
                href={link.link}
                className="cursor-pointer transition text-sm py-1 border-b-2 border-transparent hover:text-text-primary hover:border-accent-primary"
              >
                {link.title}
              </Link>
            ))}

            {/* Source Code */}
            <Link
              href={LINKS.sourceCode}
              target="_blank"
              rel="noreferrer noopener"
              className="cursor-pointer hover:text-accent-primary transition ml-4"
            >
              Source Code
            </Link>
          </div>
        </div>

        {/* Social Icons (Web) */}
        <div className="hidden md:flex flex-row gap-5">
          {SOCIALS.map(({ link, name, icon: Icon }) => (
            <Link
              key={name}
              href={link}
              target={link.startsWith("mailto") ? undefined : "_blank"}
              rel={link.startsWith("mailto") ? undefined : "noreferrer noopener"}
              aria-label={name}
              className="text-text-secondary hover:text-accent-primary transition hover:scale-110"
            >
              <Icon className="h-6 w-6" />
            </Link>
          ))}
        </div>

        {/* Hamburger Menu */}
        <button
          className="md:hidden text-text-secondary focus:outline-none text-4xl"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-[65px] left-0 w-full bg-bg-surface p-5 flex flex-col items-center text-text-secondary md:hidden border-b border-border">
          {/* Links */}
          <div className="flex flex-col items-center gap-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.title}
                href={link.link}
                className="cursor-pointer transition text-center text-sm hover:text-accent-primary"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.title}
              </Link>
            ))}
            <Link
              href={LINKS.sourceCode}
              target="_blank"
              rel="noreferrer noopener"
              className="cursor-pointer hover:text-accent-primary transition text-center text-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Source Code
            </Link>
          </div>

          {/* Social Icons */}
          <div className="flex justify-center gap-6 mt-6">
            {SOCIALS.map(({ link, name, icon: Icon }) => (
              <Link
                key={name}
                href={link}
                target={link.startsWith("mailto") ? undefined : "_blank"}
                rel={link.startsWith("mailto") ? undefined : "noreferrer noopener"}
                aria-label={name}
                className="text-text-secondary hover:text-accent-primary transition hover:scale-110"
              >
                <Icon className="h-6 w-6" />
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

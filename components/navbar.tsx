"use client";

import { useState, useEffect } from "react";
import { motion, useScroll } from "framer-motion";
import { cn } from "@/lib/utils";
import { FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";
import Image from "next/image";

const navItems = [
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Skills", href: "#skills" },
  { name: "Resume", href: "#resume" },
  { name: "Contact", href: "#contact" },
];

export function Navbar() {
  const [active, setActive] = useState("");
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);


  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section");
      const scrollPosition = window.scrollY + 100;

      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (
          scrollPosition >= sectionTop &&
          scrollPosition < sectionTop + sectionHeight
        ) {
          setActive("#" + section.id);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      className={cn(
        "fixed left-0 right-0 top-0 z-50 flex h-16 items-center justify-between px-8 backdrop-blur-sm",
        "border-b border-white/10 bg-black/50"
      )}
      animate={{ y: hidden ? "-100%" : "0%" }}
      transition={{ duration: 0.2 }}
    >
      <ul className="flex items-center gap-8">
        {navItems.map((item) => (
          <li key={item.name}>
            <a
              href={item.href}
              className={cn(
                "relative text-sm font-medium transition-colors hover:text-white/60",
                active === item.href ? "text-white" : "text-white/80"
              )}
              onClick={(e) => {
                e.preventDefault();
                document
                  .querySelector(item.href)
                  ?.scrollIntoView({ behavior: "smooth" });
                setActive(item.href);
              }}
            >
              {item.name}
              {active === item.href && (
                <motion.div
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-white"
                  layoutId="navbar-indicator"
                />
              )}
            </a>
          </li>
        ))}
      </ul>

      <div className="flex items-center gap-4">
        <a
          href="https://www.linkedin.com/in/adeelakhani/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaLinkedin className="text-white text-xl hover:text-blue-400 transition" />
        </a>
        <a
          href="https://github.com/adeelakhani"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaGithub className="text-white text-xl hover:text-gray-400 transition" />
        </a>
        <a href="mailto:aakhani@uwaterloo.ca">
          <FaEnvelope className="text-white text-xl hover:text-red-400 transition" />
        </a>
        <a href="https://se-webring.xyz/"
        target="_blank"
        rel="noopener noreferrer">
          <Image
            src="/logo_bg_b.png"
            alt="se-webring"
            className="rounded-lg object-cover hover:text-red-400"
            width={30}
            height={30}
          />
        </a>
      </div>
    </motion.nav>
  );
}

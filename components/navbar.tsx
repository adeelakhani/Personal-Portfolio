"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  // FaLinkedin,
  // FaGithub,
  FaEnvelope,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import Image from "next/image";

const navItems = [
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Resume", href: "#resume" },
  { name: "Contact", href: "#contact" },
  { name: "Career Agent", href: "https://huggingface.co/spaces/adeel712/career_agent" },
]

export function Navbar() {
  const [active, setActive] = useState("")
  const [menuOpen, setMenuOpen] = useState(false)
  const [showNavbar, setShowNavbar] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section")
      const scrollPosition = window.scrollY + 100

      sections.forEach((section) => {
        const sectionTop = section.offsetTop
        const sectionHeight = section.clientHeight
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          setActive("#" + section.id)
        }
      })
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const isExternalLink = (href: string) => href.startsWith("http")

  return (
    <motion.nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 w-full flex items-center justify-between px-4 md:px-8",
        "border-b border-white/10 bg-black/50 backdrop-blur-sm",
        "h-16 transform transition-transform duration-300",
        !showNavbar && !menuOpen ? "-translate-y-full" : "translate-y-0",
      )}
    >
      <div className="md:hidden">
        <button
          onClick={() => {
            setMenuOpen(!menuOpen)
            setShowNavbar(true)
          }}
          className="text-white text-2xl"
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      <ul className="md:flex hidden items-center gap-6">
        {navItems.map((item) => (
          <li key={item.name}>
            <a
              href={item.href}
              target={isExternalLink(item.href) ? "_blank" : undefined}
              rel={isExternalLink(item.href) ? "noopener noreferrer" : undefined}
              className={cn(
                "relative text-sm font-medium transition-colors hover:text-white/60",
                active === item.href ? "text-white" : "text-white/80",
              )}
              onClick={(e) => {
                if (!isExternalLink(item.href)) {
                  e.preventDefault()
                  document.querySelector(item.href)?.scrollIntoView({ behavior: "smooth" })
                  setActive(item.href)
                }
              }}
            >
              {item.name}
              {active === item.href && (
                <motion.div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-white" layoutId="navbar-indicator" />
              )}
            </a>
          </li>
        ))}
      </ul>

      {menuOpen && (
        <div className="fixed top-16 left-0 right-0 z-40 md:hidden">
          <ul className="w-full bg-black/90 backdrop-blur-sm flex flex-col items-center gap-4 p-4 border-b border-white/10">
            {navItems.map((item) => (
              <li key={item.name}>
                <a
                  href={item.href}
                  target={isExternalLink(item.href) ? "_blank" : undefined}
                  rel={isExternalLink(item.href) ? "noopener noreferrer" : undefined}
                  className="text-white text-lg"
                  onClick={(e) => {
                    if (!isExternalLink(item.href)) {
                      e.preventDefault()
                      document.querySelector(item.href)?.scrollIntoView({ behavior: "smooth" })
                      setActive(item.href)
                    }
                    setMenuOpen(false)
                  }}
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="flex items-center gap-3">
        {/* <a href="https://www.linkedin.com/in/adeelakhani/" target="_blank" rel="noopener noreferrer">
          <FaLinkedin className="text-white text-xl hover:text-blue-400 transition" />
        </a>
        <a href="https://github.com/adeelakhani" target="_blank" rel="noopener noreferrer">
          <FaGithub className="text-white text-xl hover:text-gray-400 transition" />
        </a> */}
        <a href="mailto:aakhani@uwaterloo.ca">
          <FaEnvelope className="text-white text-xl hover:text-red-400 transition" />
        </a>
        <a href="https://se-webring.xyz/" target="_blank" rel="noopener noreferrer">
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
  )
}

"use client"

import { useState, useEffect } from "react"
import { motion, useScroll } from "framer-motion"
import { cn } from "@/lib/utils"

const navItems = [
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Skills", href: "#skills" },
  { name: "Resume", href: "#resume" },
  { name: "Contact", href: "#contact" },
]

export function Navbar() {
  const [active, setActive] = useState("")
  const { scrollY } = useScroll()
  const [hidden, setHidden] = useState(false)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    return scrollY.onChange((latest) => {
      if (latest > lastScrollY && latest > 150) {
        setHidden(true)
      } else {
        setHidden(false)
      }
      setLastScrollY(latest)
    })
  }, [lastScrollY, scrollY])

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

  return (
    <motion.nav
      className={cn(
        "fixed left-0 right-0 top-0 z-50 flex h-16 items-center justify-center backdrop-blur-sm",
        "border-b border-white/10 bg-black/50",
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
                active === item.href ? "text-white" : "text-white/80",
              )}
              onClick={(e) => {
                e.preventDefault()
                document.querySelector(item.href)?.scrollIntoView({ behavior: "smooth" })
                setActive(item.href)
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
    </motion.nav>
  )
}


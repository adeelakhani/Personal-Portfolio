"use client"

import { motion } from "framer-motion"
import { HoverEffect } from "../ui/card-hover-effect"

const skills = [
  {
    title: "Frontend",
    description: "React, Next.js, Vue.js",
    link: "#",
  },
  {
    title: "Backend",
    description: "Node.js, Python, Java",
    link: "#",
  },
  {
    title: "Database",
    description: "MongoDB, PostgreSQL, Redis",
    link: "#",
  },
  {
    title: "Cloud",
    description: "AWS, Google Cloud, Vercel",
    link: "#",
  },
  {
    title: "Tools",
    description: "Git, Docker, Kubernetes",
    link: "#",
  },
  {
    title: "Design",
    description: "Figma, Adobe XD, Photoshop",
    link: "#",
  },
]

export function SkillsSection() {
  return (
    <section id="skills" className="min-h-screen p-8 pt-16">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-12 text-center text-3xl font-bold"
      >
        Skills & Technologies
      </motion.h2>
      <div className="mx-auto max-w-5xl px-8">
        <HoverEffect items={skills} />
      </div>
    </section>
  )
}


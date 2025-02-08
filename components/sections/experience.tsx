"use client"

import { motion } from "framer-motion"

const experiences = [
  {
    company: "Company A",
    position: "Senior Developer",
    period: "2022 - Present",
    description: "Led development of key features and mentored junior developers.",
  },
  {
    company: "Company B",
    position: "Full Stack Developer",
    period: "2020 - 2022",
    description: "Developed and maintained multiple web applications using modern technologies.",
  },
  {
    company: "Company C",
    position: "Frontend Developer",
    period: "2018 - 2020",
    description: "Created responsive and interactive user interfaces for various clients.",
  },
]

export function ExperienceSection() {
  return (
    <section id="experience" className="min-h-screen p-8 pt-16">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-12 text-center text-3xl font-bold"
      >
        Work Experience
      </motion.h2>
      <div className="relative mx-auto max-w-3xl">
        <div className="absolute left-1/2 h-full w-0.5 -translate-x-1/2 bg-white/10" />
        {experiences.map((exp, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className={`relative mb-8 ${index % 2 === 0 ? "pr-8 text-right md:ml-auto" : "pl-8 md:mr-auto"} md:w-1/2`}
          >
            <div
              className={`rounded-lg border border-white/10 bg-black/50 p-6 backdrop-blur-sm ${
                index % 2 === 0 ? "ml-auto" : "mr-auto"
              }`}
            >
              <div className="absolute top-6 h-3 w-3 rounded-full bg-white">
                <div className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500" />
              </div>
              <h3 className="text-xl font-bold">{exp.company}</h3>
              <p className="text-sm text-white/60">{exp.position}</p>
              <p className="mt-1 text-sm text-white/40">{exp.period}</p>
              <p className="mt-2 text-sm text-white/80">{exp.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}


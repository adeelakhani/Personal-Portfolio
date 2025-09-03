"use client"

import Image from "next/image"
import { motion } from "framer-motion"

const experiences = [
  {
    company: "Script Runner",
    logo: "/script-runner.jpeg", // Place your logo in public/
    position: "Software Engineering Intern",
    period: "May 2025 – August 2025",
    description: "Working on AI-powered prescription delivery and last-mile solutions for pharmacies across Canada. Building modern logistics and workflow software for healthcare.",
  },
  {
    company: "SoftSages Technology",
    logo: "/softsages.png",
    position: "Software Engineering Intern",
    period: "July 2022 - August 2022",
    description: "Worked on various AI/ML regression projects using Pandas, NumPy, Matplotlib, and Scikit-learn, including an email spam classifier that utilized NLP-based preprocessing (TF-IDF) for a web app.",
  },
  {
    company: "Pine Ridge Secondary School",
    logo: "/prss-logo.png",
    position: "Computer Science Teaching Assistant",
    period: "February 2023 – June 2023",
    description: "Worked as a teaching assistant in a secondary school Java programming classroom, explaining various programming concepts ranging from basic printing to arrays and object-oriented programming.",
  },
  {
    company: "Youth in Policing",
    logo: "/durham-regional-police-logo.png",
    position: "Summer Student",
    period: "July 2023 - August 2023",
    description: "Worked with a team to bring positivity and change to the community, including organizing the C.A.N. Conference, which provided youth with volunteering and job opportunities with 35+ organizations for 200+ individuals.",
  },
]

export function ExperienceSection() {
  return (
    <section id="experience" className="p-8 pt-8">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-12 text-center text-3xl font-bold"
      >
        Work Experience
      </motion.h2>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {experiences.map((exp, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <div className="relative flex h-[300px] w-full flex-col rounded-xl border border-white/10 bg-black overflow-hidden p-6">
              {/* Logo at top right */}
              {exp.logo && (
                <div className="absolute top-4 right-4 w-12 h-12">
                  <Image src={exp.logo} alt={exp.company + ' logo'} fill className="object-contain rounded-lg" />
                </div>
              )}
              <h3 className="text-xl font-bold mt-2 mb-1">{exp.company}</h3>
              <p className="text-sm text-white/60 mb-1">{exp.position}</p>
              <p className="text-xs text-white/40 mb-2">{exp.period}</p>
              <p className="text-sm text-white/80 mt-auto">{exp.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}


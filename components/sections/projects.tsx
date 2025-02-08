"use client"

import { motion } from "framer-motion"
import { CardBody, CardContainer, CardItem } from "../ui/3d-card"

const projects = [
  {
    title: "Project 1",
    description: "A brief description of project 1",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["React", "TypeScript", "Tailwind"],
  },
  {
    title: "Project 2",
    description: "A brief description of project 2",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["Next.js", "Node.js", "MongoDB"],
  },
  {
    title: "Project 3",
    description: "A brief description of project 3",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["React Native", "Firebase", "Redux"],
  },
]

export function ProjectsSection() {
  return (
    <section id="projects" className="min-h-screen p-8 pt-16">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-12 text-center text-3xl font-bold"
      >
        Projects
      </motion.h2>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <CardContainer className="inter-var">
              <CardBody className="relative flex h-96 w-full flex-col items-center justify-center rounded-xl border border-white/10 bg-black p-4">
                <CardItem translateZ="100" className="w-full">
                  <img
                    src={project.image || "/placeholder.svg"}
                    className="h-48 w-full rounded-xl object-cover"
                    alt={project.title}
                  />
                </CardItem>
                <CardItem translateZ="50" className="mt-4 text-xl font-bold text-white">
                  {project.title}
                </CardItem>
                <CardItem as="p" translateZ="60" className="mt-2 text-sm text-neutral-300">
                  {project.description}
                </CardItem>
                <CardItem translateZ="40" className="mt-4">
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span key={tag} className="rounded-full bg-white/10 px-2 py-1 text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                </CardItem>
              </CardBody>
            </CardContainer>
          </motion.div>
        ))}
      </div>
    </section>
  )
}


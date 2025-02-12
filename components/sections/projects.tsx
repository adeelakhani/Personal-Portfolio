"use client"

import { motion } from "framer-motion"
import { CardBody, CardContainer, CardItem } from "../ui/3d-card"
import { Github } from "lucide-react"

const projects = [
  {
    title: "LetsCook",
    description: "COMING SOON",
    image: "/LetsCook.png",
    tags: [
      "TypeScript",
      "JavaScript",
      "Next.JS",
      "ShadCN",
      "Tailwind CSS",
      "Node.js",
      "Express.js",
      "PostgreSQL",
      "Supabase",
    ],
    github: "https://github.com/adeelakhani/LetsCook"
  },
  {
    title: "LooLines",
    description:
      "Web application allowing students to see the number of people in line at U of Waterloo's busiest Tim Hortons",
    image: "/loolines.png",
    tags: ["Next.js", "Tailwind CSS", "Supabase", "PostgreSQL", "TypeScript", "Bleak", "MappedIn SDK"],
    github: "https://github.com/Leonardomontesqui/iwantcoffee",
  },
  {
    title: "MakeSomething",
    description: "Developed a full-stack web application for generating recipes based on available ingredients",
    image: "/makesomething.png",
    tags: ["React", "Node.js", "Express", "Claude AI API", "Axios"],
    github: "https://github.com/adeelakhani/MakeSomething-",
  },
  {
    title: "RememberGranny",
    description:
      "Web application for elderly users that provides password protection tools and story-based memory assistance",
    image: "/remembergranny.jpg",
    tags: ["HTML", "CSS", "Groq API", "LSTM"],
    github: "https://github.com/hhyxn/newhack_FINALFINAL",
  },
  {
    title: "Monopoly",
    description: "Made a full Monopoly Express clone which includes ALL of the features of the original game",
    image: "/monopoly.png",
    tags: ["Java OOP", "Java Swing", "Java AWT"],
    github: "https://github.com/adeelakhani/Monopoly-With-Java-UI",
  },
  {
    title: "Grendel, The Game",
    description: "Created narrative-driven game based on Grendel by John Gardner, implementing key plot elements",
    image: "/grendel.png",
    tags: ["Unity", "C#"],
    github: null,
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
              <CardBody className="relative flex h-[500px] w-full flex-col items-center justify-center rounded-xl border border-white/10 bg-black p-4">
                <CardItem translateZ="100" className="w-full">
                  <img
                    src={project.image || "/placeholder.svg"}
                    className="h-64 w-full rounded-xl object-cover"
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
                {project.github && (
                  <CardItem
                    translateZ="30"
                    className="absolute bottom-4 right-4 cursor-pointer text-white transition-colors hover:text-gray-200"
                  >
                    <a href={project.github} target="_blank" rel="noopener noreferrer">
                      <Github size={24} />
                    </a>
                  </CardItem>
                )}
              </CardBody>
            </CardContainer>
          </motion.div>
        ))}
      </div>
    </section>
  )
}


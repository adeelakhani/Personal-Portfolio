"use client"
import { motion } from "framer-motion"
import { CardBody, CardContainer, CardItem } from "../ui/3d-card"
import { Github, ExternalLink } from "lucide-react"

const projects = [
  {
    title: "LoopyAI",
    description: "An AI Agent that analyzes and filters your PostHog Session Replays and provides insights and recommendations for issues",
    image: "/LoopyAI.png",
    tags: [
      "FastAPI",
      "PostHog API",
      "OpenAI Agents SDK(via Gemini)",
      "Next.js",
      "Supabase(PostgreSQL)",
    ],
    github: ["https://github.com/adeelakhani/LoopyAI-Backend", "https://github.com/adeelakhani/LoopyAI"],
    deployment: null,
  },
  {
    title: "LetsCook",
    description: "LetsCook turns cooking into a game, where people can post and try cooking challenges and interact with a community",
    image: "/LetsCook.png",
    tags: [
      "TypeScript",
      "Express.js",
      "Next.JS",
      "Docker",
      "Google Cloud Platform",
      "Supabase(PostgreSQL, Google Auth)",
      "ShadCN",
      "Tailwind CSS", 
    ],
    github: ["https://github.com/adeelakhani/LetsCook"],
    deployment: "https://letscook-silk.vercel.app/",
  },
  {
    title: "LooLines",
    description:
      "Using the Received Signal Strength of bluetooth devices (RSSI) and a logarithmic path loss model to estimate the number of people in line at U of Waterloo's busiest Tim Hortons",
    image: "/loolines.png",
    tags: ["Next.js", "Tailwind CSS", "Supabase", "PostgreSQL", "TypeScript", "Bleak", "MappedIn SDK"],
    github: ["https://github.com/Leonardomontesqui/BluetoothDetection"],
    deployment: "https://loolines.vercel.app/",
  },
  {
    title: "MakeSomething",
    description: "Web application for generating recipes based on available ingredients",
    image: "/makesomething.png",
    tags: ["React", "Node.js", "Express", "Claude AI API", "Axios"],
    github: ["https://github.com/adeelakhani/MakeSomething-"],
    deployment: "https://makesomething.vercel.app/",
  },
  {
    title: "RememberGranny",
    description:
      "Platform that provides password protection tools and story-based memory assistance for the elderly",
    image: "/remembergranny.jpg",
    tags: ["HTML", "CSS", "Groq API", "LSTM"],
    github: ["https://github.com/hhyxn/newhack_FINALFINAL"],
    deployment: null,
  },
  {
    title: "Monopoly",
    description: "Full Monopoly Express clone with all features of the original game and persistant memory of game stats",
    image: "/monopoly.png",
    tags: ["Java OOP", "Java Swing", "Java AWT"],
    github: ["https://github.com/adeelakhani/Monopoly-With-Java-UI"],
    deployment: null,
  },
  {
    title: "Grendel, The Game",
    description: "Video Game that examines Grendel’s significant love for the Shaper and Wealtheow, the two essential characters which bring him meaning",
    image: "/grendel.png",
    tags: ["Unity", "C#"],
    github: null,
    deployment: null,
  },
]

export function ProjectsSection() {
  return (
    <section id="projects" className="min-h-screen p-8 pt-2">
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
              <CardBody className="relative flex h-[600px] w-full flex-col rounded-xl border border-white/10 bg-black overflow-hidden">
                {/* Image takes up more space to fit better */}
                <CardItem translateZ="100" className="w-full h-[350px] relative">
                  <img
                    src={project.image || "/placeholder.svg"}
                    className="h-full w-full object-cover rounded-t-xl"
                    alt={project.title}
                  />
                  {/* Gradient overlay for better text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-t-xl" />
                </CardItem>

                {/* Content section with more space */}
                <div className="flex flex-col justify-between p-4 h-[220px]">
                  <div className="flex-1">
                    <CardItem translateZ="50" className="text-xl font-bold text-white mb-2">
                      {project.title}
                    </CardItem>
                    <CardItem as="p" translateZ="60" className="text-sm text-neutral-300 line-clamp-3">
                      {project.description}
                    </CardItem>
                  </div>

                  <div className="mt-1">
                    <CardItem translateZ="40" className="mb-3">
                      <div className="flex flex-wrap gap-1">
                        {project.tags.map((tag) => (
                          <span key={tag} className="rounded-full bg-white/10 px-2 py-1 text-xs">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </CardItem>

                    <CardItem translateZ="30" className="flex gap-2 justify-end">
                      {project.github && project.github.map((githubUrl, index) => (
                        <a
                          key={index}
                          href={githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="cursor-pointer text-white transition-colors hover:text-gray-200"
                          title={`GitHub Repository ${index + 1}`}
                        >
                          <Github size={20} />
                        </a>
                      ))}
                      {project.deployment && (
                        <a
                          href={project.deployment}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="cursor-pointer text-white transition-colors hover:text-gray-200"
                        >
                          <ExternalLink size={20} />
                        </a>
                      )}
                    </CardItem>
                  </div>
                </div>
              </CardBody>
            </CardContainer>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

"use client"
import { motion } from "framer-motion"
import { Github, ExternalLink } from "lucide-react"
import { useState } from "react"
import { ProjectModal } from "../ui/project-modal"

const projects = [
  {
    title: "Around Me",
    description: "AroundMe Agent is a sophisticated AI-powered location discovery platform that leverages LangGraph/LangChain stateful workflows to orchestrate AI agents for intelligent data extraction from Reddit community discussions, municipal 311 services, and local news sources. The system employs advanced browser automation with Playwright for dynamic content extraction, implements a comprehensive 5-stage geocoding pipeline utilizing Serper KnowledgeGraph, Google Places API, and OpenStreetMap with LLM-assisted address ranking, and features intelligent municipal API discovery through pattern matching and government domain validation. The platform demonstrates advanced AI orchestration, multi-source data integration, and modern full-stack development capabilities combining AI/ML, web scraping, and geospatial analysis, with a custom Mapbox GL frontend featuring 3D building renderings and real-time POI visualization.",
    image: "/AroundMe.png",
    tags: [
      "FastAPI",
      "LangGraph",
      "LangChain",
      "OpenAI GPT-4",
      "Playwright",
      "Next.js",
      "Mapbox GL",
      "Serper API",
      "Google Places API",
      "OpenStreetMap",
      "Pydantic",
      "Python",
      "TypeScript",
      "Tailwind CSS",
      "BeautifulSoup4",
      "NewsAPI.ai",
      "Ticketmaster API",
    ],
    github: ["https://github.com/adeelakhani/around-me-agent"],
    deployment: null,
  },
  {
    title: "LoopyAI",
    description: "An AI Agent that analyzes and filters your PostHog Session Replays to provide insights and recommendations for issues",
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
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = (project: typeof projects[0]) => {
    setSelectedProject(project)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedProject(null)
  }

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
            className="cursor-pointer"
            onClick={() => openModal(project)}
          >
            <div className="relative flex h-[650px] w-full flex-col rounded-xl border border-white/10 bg-black overflow-hidden hover:scale-105 transition-transform duration-200">
              {/* Image takes up more space to fit better */}
              <div className="w-full h-[350px] relative">
                <img
                  src={project.image || "/placeholder.svg"}
                  className="h-full w-full object-cover rounded-t-xl"
                  alt={project.title}
                />
                {/* Gradient overlay for better text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-t-xl" />
              </div>

              {/* Content section with more space */}
              <div className="flex flex-col justify-between p-4 h-[300px]">
                <div className="flex-1">
                  <div className="text-xl font-bold text-white mb-2">
                    {project.title}
                  </div>
                  <p className="text-sm text-neutral-300 line-clamp-3">
                    {project.description}
                  </p>
                </div>

                <div className="mt-1">
                  <div className="mb-3">
                    <div className="flex flex-wrap gap-1">
                      {project.tags.slice(0, 6).map((tag) => (
                        <span key={tag} className="rounded-full bg-white/10 px-2 py-1 text-xs">
                          {tag}
                        </span>
                      ))}
                      {project.tags.length > 6 && (
                        <span className="rounded-full bg-white/10 px-2 py-1 text-xs">
                          +{project.tags.length - 6}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-2 justify-end">
                    {project.github && project.github.map((githubUrl, index) => (
                      <a
                        key={index}
                        href={githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="cursor-pointer text-white transition-colors hover:text-gray-200"
                        title={`GitHub Repository ${index + 1}`}
                        onClick={(e) => e.stopPropagation()}
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
                        onClick={(e) => e.stopPropagation()}
                      >
                        <ExternalLink size={20} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </section>
  )
}

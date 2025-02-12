"use client"
const EjsIcon = () => (
  <span style={{ fontSize: "0.6rem", fontWeight: "bold" }}>
    {"<%="}
  </span>
)
const REST_Icon = () => (
  <span style={{ fontSize: "0.6rem", fontWeight: "bold" }}>
    {"REST"}
  </span>
)

import { motion } from "framer-motion"
import {
  FaGitAlt,
  FaGithub,
  FaGitlab,
  FaHtml5,
  FaCss3Alt,
  FaUnity,
  FaAws,
  FaJava,
  FaNode,
  FaReact,
  FaPython,
  FaChartArea, // Alternative for Matplotlib
} from "react-icons/fa"
import { TbBrandTypescript, TbBrandCSharp, TbBrandCpp, TbBrandNextjs, TbBrandTailwind } from "react-icons/tb"
import {
  SiJavascript,
  SiExpress,
  SiPostman,
  SiGnubash,
  SiNumpy,
  SiPandas,
  SiScikitlearn,
  SiMongoose,
  SiPostgresql,
  SiMongodb,
  SiVercel,
  SiC,
} from "react-icons/si"

const skillCategories = [
  {
    title: "Languages",
    skills: [
      { name: "TypeScript", icon: TbBrandTypescript },
      { name: "JavaScript", icon: SiJavascript },
      { name: "HTML", icon: FaHtml5 },
      { name: "CSS", icon: FaCss3Alt },
      { name: "Python", icon: FaPython },
      { name: "Java", icon: FaJava },
      { name: "C++", icon: TbBrandCpp },
      { name: "C", icon: SiC },
      { name: "C#", icon: TbBrandCSharp },
    ],
  },
  {
    title: "Technologies",
    skills: [
      { name: "REST APIs", icon: REST_Icon },
      { name: "Vercel", icon: SiVercel },
      { name: "AWS", icon: FaAws },
      { name: "MongoDB", icon: SiMongodb },
      { name: "PostgreSQL", icon: SiPostgresql },
      { name: "Unity", icon: FaUnity },
    ],
  },
  {
    title: "Libraries & Frameworks",
    skills: [
      { name: "Next.js", icon: TbBrandNextjs },
      { name: "React", icon: FaReact },
      { name: "Tailwind CSS", icon: TbBrandTailwind },
      { name: "Node.js", icon: FaNode },
      { name: "Express.js", icon: SiExpress },
      { name: "Mongoose", icon: SiMongoose },
      { name: "EJS", icon: EjsIcon },
    ],
  },
  {
    title: "Data Science Libraries",
    skills: [
      { name: "Scikit-learn", icon: SiScikitlearn },
      { name: "Pandas", icon: SiPandas },
      { name: "NumPy", icon: SiNumpy },
      { name: "Matplotlib", icon: FaChartArea },
    ],
  },
  {
    title: "Tools",
    skills: [
      { name: "Git", icon: FaGitAlt },
      { name: "Github", icon: FaGithub },
      { name: "GitLab", icon: FaGitlab },
      { name: "Postman", icon: SiPostman },
      { name: "Unix", icon: SiGnubash },
    ],
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
}

export function SkillsSection() {
  return (
    <section id="skills" className="min-h-screen space-y-8 bg-gray-50 py-16 dark:bg-gray-900/30 content-center">
      <div className="container px-4 md:px-6 content-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center text-3xl font-bold tracking-tight"
        >
          Skills & Technologies
        </motion.h2>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {skillCategories.map((category) => (
            <motion.div
              key={category.title}
              variants={itemVariants}
              className="rounded-lg border bg-card p-6 shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground dark:border-gray-800"
            >
              <h3 className="mb-4 text-xl font-semibold">{category.title}</h3>
              <div className="grid grid-cols-2 gap-4">
                {category.skills.map((skill) => (
                  <div key={skill.name} className="flex items-center gap-2 text-sm">
                    <skill.icon className="h-5 w-5" />
                    <span>{skill.name}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}


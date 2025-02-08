"use client"

import { motion } from "framer-motion"
import { TypewriterEffect } from "../ui/typewriter-effect"
import { SparklesCore } from "../ui/sparkles"

export function HeroSection() {
  const words = [
    {
      text: "Build",
    },
    {
      text: "awesome",
    },
    {
      text: "things",
    },
    {
      text: "with",
    },
    {
      text: "passion.",
      className: "text-blue-500 dark:text-blue-500",
    },
  ]

  return (
    <section className="flex h-screen items-center justify-center">
      <div className="relative flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative"
        >
          <SparklesCore
            background="transparent"
            minSize={0.4}
            maxSize={1}
            particleDensity={100}
            className="absolute h-full w-full"
            particleColor="#FFFFFF"
          />
          <div className="relative z-20">
            <TypewriterEffect words={words} />
          </div>
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="mt-4 text-center text-lg text-white/60"
        >
          Full Stack Developer & Creative Technologist
        </motion.p>
      </div>
    </section>
  )
}


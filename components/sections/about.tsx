"use client";

import { motion } from "framer-motion";
import { TextGenerateEffect } from "../ui/text-generate-effect";
import Image from "next/image";

export function AboutSection() {
  const words =
    "I'm Adeel Akhani, a Software Engineering Student at the University of Waterloo. Having been coding from a young age, I enjoy using my skills to build things I am passionate about. I am experienced in fullstack development, and AI/ML, looking learn more and push myself in these areas. Aside from programming, I enjoy drumming, sports, designing games, and overall being creative!";

  return (
    <section
      id="about"
      className="flex min-h-screen items-center justify-center p-8 max-sm:pt-60"
    >
      <div className="max-w-6xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 text-center text-3xl font-bold"
        >
          About Me
        </motion.h2>
        <div className="grid gap-12 md:grid-cols-2 md:gap-8 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.5,
              type: "spring",
              stiffness: 100,
              damping: 20,
            }}
            className="flex justify-center"
          >
            <div className="relative aspect-square w-64 md:w-80">
              <div className="absolute inset-0 animate-spin-slow rounded-full bg-gradient-to-tr from-blue-500 to-purple-500" />
              <div className="absolute inset-2 rounded-full bg-black" />
              <div className="absolute inset-2 overflow-hidden rounded-full">
                <Image
                  src="/Untitled copy.jpg"
                  alt="Profile picture"
                  className="rounded-lg object-cover"
                  width={600}
                  height={600}
                />
              </div>
            </div>
          </motion.div>

          <div className="relative flex items-center">
            <TextGenerateEffect words={words} />
            <motion.div
              className="absolute -left-4 top-0 h-full w-1 bg-blue-500"
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              transition={{ duration: 1 }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

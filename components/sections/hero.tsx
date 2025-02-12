"use client";

import { motion } from "framer-motion";
import { TypewriterEffect } from "../ui/typewriter-effect";
import { SparklesCore } from "../ui/sparkles";

export function HeroSection() {
  const words = [
    {
      text: "Building",
    },
    {
      text: "for",
    },
    {
      text: "People,",
      className: "text-blue-500 dark:text-blue-500",
    },
    {
      text: "Not",
    },
    {
      text: "Just",
    },
    {
      text: "For",
    },
    {
      text: "Screens.",
      className: "text-blue-500 dark:text-blue-500",
    },
  ];

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

        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2 }}
          className="mt-8 text-center text-6xl text-white/60 font-bold bg-gradient-to-l from-gray-500 via-blue-500 to-indigo-500 text-transparent bg-clip-text"
        >
          Adeel Akhani
        </motion.h1>
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.8 }}
          className="mt-4 text-center font-bold text-2xl text-white/60"
        >
          software engineer 
        </motion.h1>
        
        <motion.img
        
          src="/2cad7d03-f623-42d1-87cf-1054c8a1f979.JPG"
          alt="Adeel Akhani"
          className="mt-8 rounded-full w-80 max-h-80 object-cover object-bottom shadow-lg border-4 border-white"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 3.7 }}
        />
        
      </div>
    </section>
  );
}

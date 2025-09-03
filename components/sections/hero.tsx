"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { FaLinkedin, FaGithub } from "react-icons/fa";

export function HeroSection() {
  const [xClicked, setXClicked] = useState(false);

  return (
    <section className="p-8 pt-28 pb-2 md:flex md:items-center md:justify-center">
      <div className="max-w-6xl w-full">
        <div className="grid gap-12 md:grid-cols-2 md:gap-8 lg:gap-16 items-center">
          {/* Photo - First on mobile, right side on desktop */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex justify-center order-1 md:order-2 md:justify-end"
          >
            <div className="relative">
              {/* Animated border */}
              <div className="absolute inset-0 animate-spin-slow rounded-full bg-gradient-to-tr from-blue-500 via-purple-500 to-indigo-500" />
              <div className="relative bg-black rounded-full p-1">
                <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden">
                  <Image
                    src="/ProfessionalPhoto.png"
                    alt="Adeel Akhani"
                    fill
                    className="object-cover"
                    priority
                  />
                  {/* Subtle gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Text content - Second on mobile, left side on desktop */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6 order-2 md:order-1"
          >
            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white"
            >
              Adeel Akhani
            </motion.h1>

            {/* About content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-4 text-white/80 text-lg leading-relaxed"
            >
              <p>
                I'm Adeel Akhani, a Software Engineering Student at the University of Waterloo. Having been coding from a young age, I enjoy using my skills to build things I am passionate about. I am currently interested in fullstack development + AI/ML.
              </p>
              <p>
                This summer I interned at <a href="https://scriptrunner.ai/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Script Runner</a>, where I worked on software solutions for pharmacies around Canada.
              </p>
            </motion.div>

            {/* Social links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex items-center gap-4 text-white/60"
            >
              <a 
                href="https://github.com/adeelakhani" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                <FaGithub className="text-xl" />
              </a>
              <motion.svg 
                viewBox="0 0 24 24" 
                className={`w-5 h-5 cursor-pointer transition-colors ${xClicked ? 'text-white' : 'text-white/40'}`}
                fill="currentColor"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => {
                  window.open('https://x.com/adeel_712', '_blank');
                  setXClicked(true);
                }}
              >
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </motion.svg>
              <a 
                href="https://www.linkedin.com/in/adeelakhani/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                <FaLinkedin className="text-xl" />
              </a>
            </motion.div>
          </motion.div>


        </div>
      </div>
    </section>
  );
}

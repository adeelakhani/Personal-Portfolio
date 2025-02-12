"use client";

import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { Download } from "lucide-react";

export function ResumeSection() {
  return (
    <section id="resume" className="min-h-screen p-8 pt-16">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-12 text-center text-3xl font-bold"
      >
        Resume
      </motion.h2>
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative aspect-[8.5/11] w-full rounded-lg border border-white/10 bg-black/50 backdrop-blur-sm"
        >
          <img
            src="/resume_ss.png"
            type="image/png"
            className="h-full w-full rounded-lg object-cover"
          />

          <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity hover:opacity-100">
            <a href="/Resume_Website.pdf" download>
              <Button className="gap-2">
                <Download className="h-4 w-4" />
                Download PDF
              </Button>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

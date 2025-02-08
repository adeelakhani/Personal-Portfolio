"use client"

import { motion } from "framer-motion"
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"
import { Button } from "../ui/button"
import { BackgroundGradient } from "../ui/background-gradient"

export function ContactSection() {
  return (
    <section id="contact" className="min-h-screen p-8 pt-16">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-12 text-center text-3xl font-bold"
      >
        Get in Touch
      </motion.h2>
      <div className="mx-auto max-w-md">
        <BackgroundGradient className="rounded-[22px] p-4 sm:p-10">
          <form className="space-y-6">
            <div>
              <Input placeholder="Name" className="border-white/10 bg-black/50 backdrop-blur-sm" />
            </div>
            <div>
              <Input type="email" placeholder="Email" className="border-white/10 bg-black/50 backdrop-blur-sm" />
            </div>
            <div>
              <Textarea placeholder="Message" className="min-h-[150px] border-white/10 bg-black/50 backdrop-blur-sm" />
            </div>
            <Button className="w-full">Send Message</Button>
          </form>
        </BackgroundGradient>
      </div>
    </section>
  )
}


import { HeroSection } from "@/components/sections/hero"
import { ProjectsSection } from "@/components/sections/projects"
import { ExperienceSection } from "@/components/sections/experience"
import { ResumeSection } from "@/components/sections/resume"
import { ContactSection } from "@/components/sections/contact"
import { BackgroundParticles } from "@/components/background-particles"
import Footer from "@/components/sections/footer"

export default function Home() {
  return (
    <main className="relative min-h-screen w-full max-sm:pt-60">
      <BackgroundParticles />
      <HeroSection />
      <ProjectsSection />
      <ExperienceSection />
      <ResumeSection />
      <ContactSection />
      <Footer />
    </main>
  )
}


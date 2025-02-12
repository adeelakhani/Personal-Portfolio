import { HeroSection } from "@/components/sections/hero"
import { AboutSection } from "@/components/sections/about"
import { ProjectsSection } from "@/components/sections/projects"
import { ExperienceSection } from "@/components/sections/experience"
import { SkillsSection } from "@/components/sections/skills"
import { ResumeSection } from "@/components/sections/resume"
import { ContactSection } from "@/components/sections/contact"
import { BackgroundParticles } from "@/components/background-particles"
import Footer from "@/components/sections/footer"
export default function Home() {
  return (
    <main className="relative min-h-screen w-full">
      <BackgroundParticles />
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <ExperienceSection />
      <SkillsSection />
      <ResumeSection />
      <ContactSection />
      <Footer />
    </main>
  )
}


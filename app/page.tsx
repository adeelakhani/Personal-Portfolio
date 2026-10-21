import { IntroSection } from "@/components/sections/intro"
import { WorkSection } from "@/components/sections/work"
import { ProjectsListSection } from "@/components/sections/projects-list"
import { BackgroundOrbit } from "@/components/background-orbit"
import { BackgroundPlanets } from "@/components/background-planets"
import Footer from "@/components/sections/footer"

export default function Home() {
  return (
    <main className="relative w-full">
      <BackgroundOrbit />
      <BackgroundPlanets />
      <IntroSection />
      <WorkSection />
      <ProjectsListSection />
      <Footer />
    </main>
  )
}

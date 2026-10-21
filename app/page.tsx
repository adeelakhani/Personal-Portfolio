import { IntroSection } from "@/components/sections/intro"
import { WorkSection } from "@/components/sections/work"
import { ProjectsListSection } from "@/components/sections/projects-list"
import { BackgroundOrbit } from "@/components/background-orbit"
import Footer from "@/components/sections/footer"

export default function Home() {
  return (
    <main className="relative w-full">
      <BackgroundOrbit />
      <IntroSection />
      <WorkSection />
      <ProjectsListSection />
      <Footer />
    </main>
  )
}

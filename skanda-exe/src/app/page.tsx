"use client"

import CVTitleSection from "@/components/animation/CVIntro"
import SkillMapSection from "@/components/animation/SkillMapSection"
import CinematicTransition from "@/components/portfolio/CinematicTransition"
import Navigation from "@/components/portfolio/Navigation"
import {
  IdentitySection,
  ProjectsSection,
  SkillsSection,
  EducationSection,
  TechEcosystemSection,
  AchievementsSection,
  ContactSection,
  FinalSection,
} from "@/components/portfolio/PortfolioSections"

export default function Home() {
  return (
    <div style={{ background: "#0a0a0f", minHeight: "100vh", position: "relative" }}>
      <CVTitleSection />

      <SkillMapSection />

      <CinematicTransition />

      <Navigation />

      <IdentitySection />

      <ProjectsSection />

      <SkillsSection />

      <EducationSection />

      <TechEcosystemSection />

      <AchievementsSection />

      <ContactSection />

      <FinalSection />

      <div
        style={{
          height: 80,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "var(--font-geist-mono), 'Geist Mono', monospace",
          fontSize: "clamp(7px, 0.7vw, 9px)",
          color: "#222",
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          position: "relative",
          zIndex: 10,
        }}
      >
        SKANDA.EXE v1.0
      </div>
    </div>
  )
}

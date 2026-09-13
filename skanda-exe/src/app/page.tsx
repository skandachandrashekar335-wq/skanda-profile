"use client"

import CVTitleSection from "@/components/animation/CVIntro"
import SkillMapSection from "@/components/animation/SkillMapSection"
import Navigation from "@/components/portfolio/Navigation"
import {
  AboutSection,
  ProjectsSection,
  SkillsSection,
  QASection,
  HowIWorkSection,
  EducationSection,
  BuildingExperienceSection,
  ContactSection,
  FinalSection,
} from "@/components/portfolio/PortfolioSections"

export default function Home() {
  return (
    <div style={{ background: "#07070b", minHeight: "100vh", position: "relative" }}>
      <CVTitleSection />

      <SkillMapSection />

      <Navigation />

      <AboutSection />

      <ProjectsSection />

      <SkillsSection />

      <QASection />

      <HowIWorkSection />

      <EducationSection />

      <BuildingExperienceSection />

      <ContactSection />

      <FinalSection />
    </div>
  )
}

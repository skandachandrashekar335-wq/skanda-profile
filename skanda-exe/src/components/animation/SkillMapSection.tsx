"use client"

import { useEffect, useRef, useState } from "react"
import ScrollFrameSequence from "@/components/animation/ScrollFrameSequence"

const SKILL_CATEGORIES = [
  { label: "PROGRAMMING", items: "JavaScript · TypeScript · Python · Java · SQL", scrollAt: 0.15 },
  { label: "WEB DEVELOPMENT", items: "React · Next.js · HTML · CSS · Tailwind", scrollAt: 0.3 },
  { label: "AI / MACHINE LEARNING", items: "AI · ML · LLM Concepts · Automation · Prompt Engineering", scrollAt: 0.45 },
  { label: "SOFTWARE TESTING / QA", items: "Manual Testing · Functional · Regression · Bug Reporting", scrollAt: 0.6 },
  { label: "TOOLS / DEVELOPMENT", items: "Git · GitHub · VS Code · Firebase · Linux", scrollAt: 0.75 },
  { label: "3D / CREATIVE", items: "Three.js · WebGL · GSAP · Interactive Experiences", scrollAt: 0.88 },
]

export default function SkillMapSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const [activeSkill, setActiveSkill] = useState(-1)

  useEffect(() => {
    const section = sectionRef.current
    const heading = headingRef.current
    if (!section || !heading) return

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches

    if (prefersReduced) {
      heading.style.opacity = "1"
      return
    }

    const handleScroll = () => {
      const rect = section.getBoundingClientRect()
      const sectionHeight = section.offsetHeight
      const vh = window.innerHeight
      const scrollable = sectionHeight - vh
      if (scrollable <= 0) return

      const progress = Math.max(0, Math.min(1, -rect.top / scrollable))

      // Heading fades in during first 10% of scroll, stays visible
      const headingOpacity = Math.min(1, progress * 10)
      heading.style.opacity = String(headingOpacity)

      // Determine which skill category to highlight
      let active = -1
      for (let i = SKILL_CATEGORIES.length - 1; i >= 0; i--) {
        if (progress >= SKILL_CATEGORIES[i].scrollAt) {
          active = i
          break
        }
      }
      setActiveSkill(active)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div
      ref={sectionRef}
      id="skills"
      style={{
        position: "relative",
        zIndex: 1,
      }}
    >
      {/* SKILL MAP heading — overlaid on the cinematic */}
      <div
        ref={headingRef}
        style={{
          position: "sticky",
          top: 0,
          width: "100vw",
          height: 0,
          zIndex: 15,
          pointerEvents: "none",
          opacity: 0,
          transition: "opacity 0.2s linear",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "clamp(20px, 4vw, 48px)",
            left: "clamp(20px, 4vw, 48px)",
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-geist-mono), 'Geist Mono', monospace",
              fontSize: "clamp(8px, 0.85vw, 10px)",
              color: "#4ecdc4",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              marginBottom: 8,
            }}
          >
            SYSTEM.CAPABILITIES
          </div>
          <div
            style={{
              fontFamily: "var(--font-geist-mono), 'Geist Mono', monospace",
              fontSize: "clamp(20px, 3vw, 40px)",
              color: "#fff",
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              fontWeight: 300,
              lineHeight: 1.1,
            }}
          >
            SKILL MAP
          </div>
        </div>
      </div>

      {/* Scroll-controlled skill category labels — right side */}
      <div
        style={{
          position: "sticky",
          top: 0,
          width: 0,
          height: 0,
          zIndex: 15,
          pointerEvents: "none",
        }}
      >
        {SKILL_CATEGORIES.map((cat, i) => (
          <div
            key={cat.label}
            style={{
              position: "absolute",
              right: "clamp(60px, 8vw, 120px)",
              top: `calc(clamp(60px, 10vh, 120px) + ${i * 36}px)`,
              opacity: activeSkill === i ? 1 : 0,
              transform: activeSkill === i ? "translateX(0)" : "translateX(8px)",
              transition: "opacity 0.4s ease, transform 0.4s ease",
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-geist-mono), 'Geist Mono', monospace",
                fontSize: "clamp(7px, 0.7vw, 9px)",
                color: "#4ecdc4",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
              }}
            >
              {cat.label}
            </div>
            <div
              style={{
                fontFamily: "var(--font-geist-mono), 'Geist Mono', monospace",
                fontSize: "clamp(8px, 0.8vw, 10px)",
                color: "#666",
                letterSpacing: "0.05em",
                marginTop: 4,
                maxWidth: 240,
              }}
            >
              {cat.items}
            </div>
          </div>
        ))}
      </div>

      {/* The actual cinematic canvas */}
      <ScrollFrameSequence onReady={() => {}} />
    </div>
  )
}

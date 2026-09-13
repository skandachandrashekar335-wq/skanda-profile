"use client"

import { useEffect, useRef, useState } from "react"
import ScrollFrameSequence from "@/components/animation/ScrollFrameSequence"

const COMPONENTS = [
  { hw: "MONITOR", portfolio: "IDENTITY", section: "ABOUT", scrollAt: 0.08 },
  { hw: "CPU", portfolio: "FOUNDATION", section: "EDUCATION", scrollAt: 0.2 },
  { hw: "GPU", portfolio: "PROJECT ENGINE", section: "PROJECTS", scrollAt: 0.34 },
  { hw: "RAM", portfolio: "CAPABILITY MEMORY", section: "SKILLS", scrollAt: 0.48 },
  { hw: "NVMe", portfolio: "BUILD EXPERIENCE", section: "EXPERIENCE", scrollAt: 0.62 },
  { hw: "MOTHERBOARD", portfolio: "TECH ECOSYSTEM", section: "SYSTEMS", scrollAt: 0.76 },
  { hw: "PSU", portfolio: "PROGRESS", section: "STATUS", scrollAt: 0.88 },
  { hw: "KEYBOARD", portfolio: "COMMUNICATION", section: "CONTACT", scrollAt: 0.95 },
]

const MONO = "var(--font-geist-mono), 'Geist Mono', monospace"

export default function SkillMapSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [activeIdx, setActiveIdx] = useState(-1)
  const [thresholdHeight, setThresholdHeight] = useState(0)

  useEffect(() => {
    const update = () => {
      setThresholdHeight(window.innerWidth < 768 ? 120 : 240)
    }
    update()
    window.addEventListener("resize", update)
    return () => window.removeEventListener("resize", update)
  }, [])

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const handleScroll = () => {
      const rect = section.getBoundingClientRect()
      const sectionHeight = section.offsetHeight
      const vh = window.innerHeight
      const scrollable = sectionHeight - vh
      if (scrollable <= 0) return

      const p = Math.max(0, Math.min(1, -rect.top / scrollable))

      let active = -1
      for (let i = COMPONENTS.length - 1; i >= 0; i--) {
        if (p >= COMPONENTS[i].scrollAt) {
          active = i
          break
        }
      }
      setActiveIdx(active)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const active = activeIdx >= 0 ? COMPONENTS[activeIdx] : null

  return (
    <div
      ref={sectionRef}
      id="skills"
      style={{ position: "relative", zIndex: 1 }}
    >
      {/* Minimal HUD — only shows active component context */}
      <div
        style={{
          position: "sticky",
          top: 0,
          width: "100vw",
          height: 0,
          zIndex: 15,
          pointerEvents: "none",
        }}
      >
        {/* Top-right: single active component indicator */}
        {active && (
          <div
            style={{
              position: "absolute",
              top: "clamp(16px, 3vw, 40px)",
              right: "clamp(16px, 3vw, 40px)",
              textAlign: "right",
            }}
          >
            <div
              style={{
                fontFamily: MONO,
                fontSize: "clamp(6px, 0.6vw, 7px)",
                color: "#444",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                marginBottom: 4,
              }}
            >
              CURRENT MODULE
            </div>
            <div
              style={{
                fontFamily: MONO,
                fontSize: "clamp(12px, 1.6vw, 20px)",
                color: "#4ecdc4",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                fontWeight: 300,
                textShadow: "0 0 20px rgba(78,205,196,0.15)",
              }}
            >
              {active.hw}
            </div>
            <div
              style={{
                width: 40,
                height: 1,
                background: "rgba(78,205,196,0.3)",
                marginLeft: "auto",
                marginTop: 8,
                marginBottom: 8,
              }}
            />
            <div
              style={{
                fontFamily: MONO,
                fontSize: "clamp(8px, 0.85vw, 10px)",
                color: "#888",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              {active.portfolio}
            </div>
          </div>
        )}
      </div>

      {/* Cinematic canvas */}
      <ScrollFrameSequence onReady={() => {}} thresholdHeight={thresholdHeight} />
    </div>
  )
}

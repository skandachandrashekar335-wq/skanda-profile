"use client"

import { useEffect, useRef } from "react"

export default function CVTitleSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const content = contentRef.current
    if (!section || !content) return

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches

    if (prefersReduced) {
      content.style.opacity = "1"
      content.style.transform = "translateY(0)"
      return
    }

    const handleScroll = () => {
      const rect = section.getBoundingClientRect()
      const sectionHeight = section.offsetHeight
      const scrollable = sectionHeight - window.innerHeight
      if (scrollable <= 0) return

      const progress = Math.max(0, Math.min(1, -rect.top / scrollable))

      content.style.opacity = String(1 - progress * 1.5)
      content.style.transform = `translateY(${-progress * 40}px)`
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const MONO = "var(--font-geist-mono), 'Geist Mono', monospace"
  const SANS = "var(--font-geist-sans), 'Geist', sans-serif"

  return (
    <div
      ref={sectionRef}
      style={{
        height: "100vh",
        position: "relative",
        background: "#07070b",
      }}
    >
      <div
        style={{
          position: "sticky",
          top: 0,
          width: "100vw",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#07070b",
          zIndex: 2,
        }}
      >
        <div
          ref={contentRef}
          style={{
            textAlign: "center",
            opacity: 1,
            transform: "translateY(0)",
            transition: "opacity 0.1s linear, transform 0.1s linear",
            padding: "0 clamp(24px, 6vw, 80px)",
          }}
        >
          {/* Name */}
          <div
            style={{
              fontFamily: SANS,
              fontSize: "clamp(32px, 6vw, 72px)",
              color: "#e8e8e8",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              fontWeight: 300,
              lineHeight: 1.05,
            }}
          >
            SKANDA
          </div>
          <div
            style={{
              fontFamily: SANS,
              fontSize: "clamp(32px, 6vw, 72px)",
              color: "#e8e8e8",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              fontWeight: 300,
              lineHeight: 1.05,
            }}
          >
            CHANDRASHEKHAR
          </div>

          {/* Positioning */}
          <div
            style={{
              fontFamily: MONO,
              fontSize: "clamp(8px, 0.9vw, 11px)",
              color: "#4ecdc4",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              marginTop: 24,
            }}
          >
            BCA STUDENT · SOFTWARE DEVELOPER · QA / AI AUTOMATION
          </div>

          {/* Statement */}
          <div
            style={{
              fontFamily: MONO,
              fontSize: "clamp(9px, 1vw, 12px)",
              color: "#9a9aac",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              marginTop: 20,
              lineHeight: 2,
            }}
          >
            <div>BUILDING SOFTWARE.</div>
            <div>TESTING SYSTEMS.</div>
            <div>EXPLORING AI.</div>
          </div>

          {/* Location */}
          <div
            style={{
              fontFamily: MONO,
              fontSize: "clamp(7px, 0.7vw, 9px)",
              color: "#6b6b80",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              marginTop: 24,
            }}
          >
            BANGALORE, INDIA
          </div>

          {/* Open to */}
          <div
            style={{
              fontFamily: MONO,
              fontSize: "clamp(7px, 0.7vw, 9px)",
              color: "#4ecdc4",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              marginTop: 12,
            }}
          >
            OPEN TO INTERNSHIPS
          </div>

          {/* Scroll prompt */}
          <div
            style={{
              fontFamily: MONO,
              fontSize: "clamp(7px, 0.7vw, 9px)",
              color: "#444",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              marginTop: 48,
            }}
          >
            SCROLL TO EXPLORE ↓
          </div>
        </div>
      </div>
    </div>
  )
}

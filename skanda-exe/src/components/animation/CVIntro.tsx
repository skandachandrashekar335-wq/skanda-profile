"use client"

import { useEffect, useRef } from "react"

export default function CVTitleSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const title = titleRef.current
    if (!section || !title) return

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches

    if (prefersReduced) {
      title.style.opacity = "1"
      title.style.transform = "translateY(0)"
      return
    }

    const handleScroll = () => {
      const rect = section.getBoundingClientRect()
      const sectionHeight = section.offsetHeight
      const scrollable = sectionHeight - window.innerHeight
      if (scrollable <= 0) return

      const progress = Math.max(0, Math.min(1, -rect.top / scrollable))

      title.style.opacity = String(1 - progress * 1.5)
      title.style.transform = `translateY(${-progress * 40}px)`
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div
      ref={sectionRef}
      style={{
        height: "100vh",
        position: "relative",
        background: "#000",
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
          background: "#000",
          zIndex: 2,
        }}
      >
        <div
          ref={titleRef}
          style={{
            fontFamily: "var(--font-geist-mono), 'Geist Mono', monospace",
            fontSize: "clamp(28px, 5vw, 64px)",
            color: "#e8e8e8",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            fontWeight: 300,
            textAlign: "center",
            opacity: 1,
            transform: "translateY(0)",
            transition: "opacity 0.1s linear, transform 0.1s linear",
          }}
        >
          SKANDA C.V.
        </div>
      </div>
    </div>
  )
}

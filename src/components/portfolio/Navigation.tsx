"use client"

import { useState, useEffect } from "react"

const sections = [
  { id: "skills", label: "01 ABOUT" },
  { id: "projects", label: "02 PROJECTS" },
  { id: "skills-detail", label: "03 SKILLS" },
  { id: "qa", label: "04 QA" },
  { id: "education", label: "05 EDUCATION" },
  { id: "contact", label: "06 CONTACT" },
]

const MONO = "var(--font-geist-mono), 'Geist Mono', monospace"

export default function Navigation() {
  const [activeSection, setActiveSection] = useState("")
  const [visible, setVisible] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener("resize", checkMobile)

    const handleScroll = () => {
      const scrollY = window.scrollY
      const vh = window.innerHeight

      setVisible(scrollY > vh * 1.2)

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i].id)
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= vh * 0.5 && rect.bottom >= 0) {
            setActiveSection(sections[i].id)
            return
          }
        }
      }
      setActiveSection("")
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", checkMobile)
    }
  }, [])

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: "smooth" })
  }

  if (isMobile) {
    return (
      <nav
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          display: "flex",
          justifyContent: "center",
          gap: 2,
          padding: "8px 8px",
          background: "rgba(7, 7, 11, 0.92)",
          backdropFilter: "blur(12px)",
          borderTop: "1px solid rgba(78,205,196,0.08)",
          opacity: visible ? 1 : 0,
          pointerEvents: visible ? "auto" : "none",
          transition: "opacity 0.4s ease",
        }}
      >
        {sections.map((s) => {
          const isActive = activeSection === s.id
          return (
            <button
              key={s.id}
              onClick={() => scrollTo(s.id)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "6px 6px",
                fontFamily: MONO,
                fontSize: 6,
                color: isActive ? "#4ecdc4" : "#444",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                transition: "color 0.3s ease",
                whiteSpace: "nowrap",
                position: "relative",
              }}
            >
              {s.label}
              {isActive && (
                <div
                  style={{
                    position: "absolute",
                    bottom: 2,
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: 12,
                    height: 1,
                    background: "#4ecdc4",
                  }}
                />
              )}
            </button>
          )
        })}
      </nav>
    )
  }

  return (
    <nav
      style={{
        position: "fixed",
        right: "clamp(12px, 2vw, 24px)",
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: 50,
        display: "flex",
        flexDirection: "column",
        gap: 8,
        alignItems: "flex-end",
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? "auto" : "none",
        transition: "opacity 0.4s ease",
      }}
    >
      {sections.map((s) => {
        const isActive = activeSection === s.id
        return (
          <button
            key={s.id}
            onClick={() => scrollTo(s.id)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "4px 0",
            }}
          >
            <span
              style={{
                fontFamily: MONO,
                fontSize: 8,
                color: isActive ? "#4ecdc4" : "#333",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                transition: "color 0.3s ease",
                opacity: isActive ? 1 : 0.5,
              }}
            >
              {s.label}
            </span>
            <div
              style={{
                width: isActive ? 20 : 6,
                height: 1,
                background: isActive ? "#4ecdc4" : "#333",
                transition: "all 0.3s ease",
                boxShadow: isActive ? "0 0 8px rgba(78,205,196,0.4)" : "none",
              }}
            />
          </button>
        )
      })}
    </nav>
  )
}

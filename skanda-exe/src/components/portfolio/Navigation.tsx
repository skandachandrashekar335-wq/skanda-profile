"use client"

import { useState, useEffect } from "react"

const sections = [
  { id: "skills", label: "SKILL MAP" },
  { id: "identity", label: "IDENTITY" },
  { id: "projects", label: "PROJECTS" },
  { id: "skills-detail", label: "SKILLS" },
  { id: "education", label: "EDUCATION" },
  { id: "ecosystem", label: "ECOSYSTEM" },
  { id: "achievements", label: "RECORDS" },
  { id: "contact", label: "CONTACT" },
]

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
          gap: 4,
          padding: "8px 12px",
          background: "rgba(10, 10, 15, 0.9)",
          backdropFilter: "blur(8px)",
          borderTop: "1px solid #111",
          opacity: visible ? 1 : 0,
          pointerEvents: visible ? "auto" : "none",
          transition: "opacity 0.4s ease",
        }}
      >
        {sections.map((s) => (
          <button
            key={s.id}
            onClick={() => scrollTo(s.id)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "6px 8px",
              fontFamily: "var(--font-geist-mono), 'Geist Mono', monospace",
              fontSize: 7,
              color: activeSection === s.id ? "#4ecdc4" : "#444",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              transition: "color 0.3s ease",
              whiteSpace: "nowrap",
            }}
          >
            {s.label}
          </button>
        ))}
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
        gap: 12,
        alignItems: "flex-end",
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? "auto" : "none",
        transition: "opacity 0.4s ease",
      }}
    >
      {sections.map((s) => (
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
              fontFamily: "var(--font-geist-mono), 'Geist Mono', monospace",
              fontSize: 8,
              color: activeSection === s.id ? "#4ecdc4" : "#333",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              transition: "color 0.3s ease",
              opacity: activeSection === s.id ? 1 : 0.5,
            }}
          >
            {s.label}
          </span>
          <div
            style={{
              width: activeSection === s.id ? 16 : 6,
              height: 1,
              background: activeSection === s.id ? "#4ecdc4" : "#333",
              transition: "all 0.3s ease",
            }}
          />
        </button>
      ))}
    </nav>
  )
}

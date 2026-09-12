"use client"

import { useRef, useEffect } from "react"

export default function CinematicTransition() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches
    if (prefersReduced) {
      el.style.opacity = "1"
      return
    }

    el.style.opacity = "0"
    el.style.transition = "opacity 1.2s ease"

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = "1"
          observer.unobserve(el)
        }
      },
      { threshold: 0.3 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#000",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <div
          style={{
            width: 1,
            height: 60,
            background: "linear-gradient(to bottom, transparent, #4ecdc4, transparent)",
            margin: "0 auto 40px",
          }}
        />
        <div
          style={{
            fontFamily: "'Geist Mono', monospace",
            fontSize: "clamp(12px, 1.6vw, 18px)",
            color: "#fff",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
          }}
        >
          SKANDA.EXE
        </div>
        <div
          style={{
            fontFamily: "'Geist Mono', monospace",
            fontSize: "clamp(8px, 0.9vw, 10px)",
            color: "#4ecdc4",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            marginTop: 12,
          }}
        >
          SYSTEM ONLINE
        </div>
        <div
          style={{
            width: 1,
            height: 60,
            background: "linear-gradient(to bottom, transparent, #4ecdc4, transparent)",
            margin: "40px auto 0",
          }}
        />
      </div>
    </div>
  )
}

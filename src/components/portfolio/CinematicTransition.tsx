"use client"
/* eslint-disable react-hooks/set-state-in-effect */

import { useRef, useEffect, useState } from "react"

const MONO = "var(--font-geist-mono), 'Geist Mono', monospace"

const MODULES = [
  { id: "01", name: "IDENTITY CORE", label: "MONITOR" },
  { id: "02", name: "FOUNDATION", label: "CPU" },
  { id: "03", name: "PROJECT ENGINE", label: "GPU" },
  { id: "04", name: "CAPABILITY MEMORY", label: "RAM" },
  { id: "05", name: "BUILD STACK", label: "NVMe" },
  { id: "06", name: "COMMUNICATION", label: "KEYBOARD" },
]

export default function CinematicTransition() {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const [loadedModules, setLoadedModules] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches
    if (prefersReduced) {
      el.style.opacity = "1"
      setVisible(true)
      setLoadedModules(MODULES.length)
      return
    }

    el.style.opacity = "0"
    el.style.transition = "opacity 1.2s ease"

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = "1"
          setVisible(true)
          observer.unobserve(el)
        }
      },
      { threshold: 0.3 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!visible) return
    if (loadedModules >= MODULES.length) return

    const timer = setTimeout(() => {
      setLoadedModules((prev) => prev + 1)
    }, 180)

    return () => clearTimeout(timer)
  }, [visible, loadedModules])

  return (
    <div
      ref={ref}
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#07070b",
        padding: "clamp(40px, 6vw, 80px)",
      }}
    >
      <div style={{ textAlign: "center", maxWidth: 600, width: "100%" }}>
        {/* Top accent line */}
        <div
          style={{
            width: 1,
            height: 48,
            background: "linear-gradient(to bottom, transparent, #4ecdc4, transparent)",
            margin: "0 auto 32px",
          }}
        />

        {/* Title */}
        <div
          style={{
            fontFamily: MONO,
            fontSize: "clamp(14px, 2vw, 22px)",
            color: "#fff",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
          }}
        >
          SKANDA.EXE
        </div>
        <div
          style={{
            fontFamily: MONO,
            fontSize: "clamp(8px, 0.9vw, 10px)",
            color: "#4ecdc4",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            marginTop: 10,
          }}
        >
          SYSTEM ONLINE
        </div>

        {/* Module status list */}
        <div
          style={{
            marginTop: 40,
            display: "flex",
            flexDirection: "column",
            gap: 8,
            alignItems: "center",
          }}
        >
          {MODULES.map((mod, i) => {
            const isLoaded = i < loadedModules
            const isLoading = i === loadedModules

            return (
              <div
                key={mod.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  fontFamily: MONO,
                  fontSize: "clamp(7px, 0.7vw, 9px)",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  opacity: isLoaded ? 1 : isLoading ? 0.5 : 0.15,
                  transition: "opacity 0.3s ease",
                }}
              >
                <span style={{ color: "#333", width: 24, textAlign: "right" }}>
                  {mod.id}
                </span>
                <span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: isLoaded ? "#4ecdc4" : "#222",
                    transition: "background 0.3s ease",
                    boxShadow: isLoaded ? "0 0 8px rgba(78,205,196,0.4)" : "none",
                  }}
                />
                <span style={{ color: isLoaded ? "#888" : "#333", minWidth: 120, textAlign: "left" }}>
                  {mod.label}
                </span>
                <span style={{ color: isLoaded ? "#4ecdc4" : "#222", minWidth: 160, textAlign: "left" }}>
                  {mod.name}
                </span>
                <span style={{ color: isLoaded ? "#4ecdc4" : "#222" }}>
                  {isLoaded ? "LOADED" : isLoading ? "..." : ""}
                </span>
              </div>
            )
          })}
        </div>

        {/* Bottom accent line */}
        <div
          style={{
            width: 1,
            height: 48,
            background: "linear-gradient(to bottom, transparent, #4ecdc4, transparent)",
            margin: "32px auto 0",
          }}
        />
      </div>
    </div>
  )
}

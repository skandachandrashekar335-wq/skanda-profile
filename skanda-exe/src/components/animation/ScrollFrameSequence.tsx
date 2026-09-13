"use client"

import { useEffect, useRef, useState, useCallback } from "react"

const TOTAL_FRAMES = 120
const FRAME_PATH = (i: number) =>
  `/frames/frame_${String(i).padStart(4, "0")}.webp`

export default function ScrollFrameSequence({
  onReady,
  thresholdHeight = 0,
}: {
  onReady?: () => void
  thresholdHeight?: number
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const framesRef = useRef<HTMLImageElement[]>([])
  const currentFrameRef = useRef(0)
  const targetFrameRef = useRef(0)
  const rafRef = useRef<number>(0)
  const lastDrawnRef = useRef(-1)
  const [loading, setLoading] = useState(true)
  const [loadProgress, setLoadProgress] = useState(0)
  const prefersReducedMotion = useRef(false)
  const thresholdRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    prefersReducedMotion.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches
  }, [])

  const drawFrame = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current
    const img = framesRef.current[frameIndex]
    if (!canvas || !img || !img.complete) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const cw = canvas.clientWidth
    const ch = canvas.clientHeight

    if (canvas.width !== cw * dpr || canvas.height !== ch * dpr) {
      canvas.width = cw * dpr
      canvas.height = ch * dpr
    }

    const bw = canvas.width
    const bh = canvas.height

    const imgAspect = img.naturalWidth / img.naturalHeight
    const canvasAspect = bw / bh

    let dw: number, dh: number, dx: number, dy: number

    if (canvasAspect > imgAspect) {
      dh = bh
      dw = bh * imgAspect
      dx = (bw - dw) / 2
      dy = 0
    } else {
      dw = bw
      dh = bw / imgAspect
      dx = 0
      dy = (bh - dh) / 2
    }

    ctx.setTransform(1, 0, 0, 1, 0, 0)
    ctx.clearRect(0, 0, bw, bh)
    ctx.fillStyle = "#050609"
    ctx.fillRect(0, 0, bw, bh)
    ctx.drawImage(img, dx, dy, dw, dh)
    lastDrawnRef.current = frameIndex
  }, [])

  const renderLoop = useCallback(() => {
    if (prefersReducedMotion.current) {
      drawFrame(0)
      return
    }

    const target = Math.round(targetFrameRef.current)
    const current = currentFrameRef.current

    if (current !== target) {
      const diff = target - current
      const step = Math.sign(diff)
      currentFrameRef.current = current + step
    }

    if (currentFrameRef.current !== lastDrawnRef.current) {
      drawFrame(currentFrameRef.current)
    }

    rafRef.current = requestAnimationFrame(renderLoop)
  }, [drawFrame])

  useEffect(() => {
    const images: HTMLImageElement[] = []
    let cancelled = false

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image()
      img.src = FRAME_PATH(i)
      images.push(img)
    }

    framesRef.current = images

    let loaded = 0
    const total = images.length

    const checkReady = () => {
      if (cancelled) return
      loaded++
      setLoadProgress(Math.round((loaded / total) * 100))
      if (loaded >= 1) {
        setLoading(false)
        onReady?.()
      }
    }

    images.forEach((img) => {
      if (img.complete) {
        checkReady()
      } else {
        img.onload = checkReady
        img.onerror = checkReady
      }
    })

    return () => {
      cancelled = true
      images.forEach((img) => {
        img.onload = null
        img.onerror = null
      })
    }
  }, [onReady])

  useEffect(() => {
    rafRef.current = requestAnimationFrame(renderLoop)
    return () => cancelAnimationFrame(rafRef.current)
  }, [renderLoop])

  useEffect(() => {
    const handleScroll = () => {
      const el = containerRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const scrollHeight = el.offsetHeight - window.innerHeight
      if (scrollHeight <= 0) return
      const progress = Math.max(0, Math.min(1, -rect.top / scrollHeight))
      const frameZone = scrollHeight - thresholdHeight
      if (frameZone > 0) {
        targetFrameRef.current = Math.min(1, progress * scrollHeight / frameZone) * (TOTAL_FRAMES - 1)
      } else {
        targetFrameRef.current = progress * (TOTAL_FRAMES - 1)
      }
      if (thresholdRef.current && thresholdHeight > 0 && frameZone > 0) {
        const thresholdProgress = Math.max(0, Math.min(1, (progress * scrollHeight - frameZone) / thresholdHeight))
        thresholdRef.current.style.opacity = prefersReducedMotion.current ? "1" : String(thresholdProgress)
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [thresholdHeight])

  const totalHeight = `calc(500vh + ${thresholdHeight}px)`

  return (
    <div ref={containerRef} style={{ height: totalHeight, position: "relative", zIndex: 1 }}>
      <div
        style={{
          position: "sticky",
          top: 0,
          width: "100vw",
          height: "100vh",
          overflow: "hidden",
          background: "#050609",
          zIndex: 1,
        }}
      >
        <canvas
          ref={canvasRef}
          style={{
            width: "100%",
            height: "100%",
            display: "block",
          }}
        />

        {/* Cinematic threshold overlay */}
        {thresholdHeight > 0 && (
          <div
            ref={thresholdRef}
            style={{
              position: "absolute",
              inset: 0,
              background: "#07070b",
              opacity: 0,
              pointerEvents: "none",
              zIndex: 5,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 16,
            }}
          >
            <div
              style={{
                width: 1,
                height: 40,
                background: "linear-gradient(to bottom, transparent, rgba(78,205,196,0.4), transparent)",
              }}
            />
            <div
              style={{
                fontFamily: "'Geist Mono', monospace",
                fontSize: "clamp(8px, 0.85vw, 10px)",
                color: "#4ecdc4",
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                opacity: 0.6,
              }}
            >
              ACCESSING PROFILE
            </div>
          </div>
        )}

        {loading && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              background: "#050609",
              zIndex: 10,
              transition: "opacity 0.6s ease",
              opacity: loading ? 1 : 0,
              pointerEvents: loading ? "auto" : "none",
            }}
          >
            <div
              style={{
                fontFamily: "'Geist Mono', monospace",
                fontSize: "clamp(10px, 1.4vw, 13px)",
                color: "#555",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
              }}
            >
              INITIALIZING... {loadProgress}%
            </div>
            <div
              style={{
                marginTop: 16,
                width: 120,
                height: 1,
                background: "#222",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  top: 0,
                  height: "100%",
                  width: `${loadProgress}%`,
                  background: "#4ecdc4",
                  transition: "width 0.3s ease",
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

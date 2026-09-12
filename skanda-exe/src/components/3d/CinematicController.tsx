"use client"

import { useRef } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import * as THREE from "three"

let scrollProgress = 0

if (typeof window !== "undefined") {
  const updateScrollProgress = () => {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
    if (scrollHeight > 0) {
      scrollProgress = window.scrollY / scrollHeight
    }
  }

  window.addEventListener("scroll", updateScrollProgress, { passive: true })
  window.addEventListener("resize", updateScrollProgress, { passive: true })
  updateScrollProgress()
}

// Camera keyframes: position, lookAt target, FOV
// Model is centered at origin, ~3 units in max dimension
const phases = [
  { position: new THREE.Vector3(0, 1, 5), target: new THREE.Vector3(0, 0, 0), fov: 45 },
  { position: new THREE.Vector3(0, 0.8, 4), target: new THREE.Vector3(0, 0, 0), fov: 42 },
  { position: new THREE.Vector3(0.5, 1.2, 3), target: new THREE.Vector3(0, 0, 0), fov: 40 },
  { position: new THREE.Vector3(1.5, 0.5, 2.5), target: new THREE.Vector3(0, 0, 0), fov: 38 },
  { position: new THREE.Vector3(0.8, 0.3, 2), target: new THREE.Vector3(0, 0.2, 0), fov: 35 },
  { position: new THREE.Vector3(1.2, 0.6, 1.8), target: new THREE.Vector3(0, 0.2, 0), fov: 35 },
  { position: new THREE.Vector3(0.5, 1.5, 2.2), target: new THREE.Vector3(0, 0.2, 0), fov: 38 },
  { position: new THREE.Vector3(-0.8, 0.3, 2), target: new THREE.Vector3(0, 0.3, 0), fov: 36 },
  { position: new THREE.Vector3(-1.2, 0.6, 2.5), target: new THREE.Vector3(0, 0.2, 0), fov: 38 },
  { position: new THREE.Vector3(0, 0.8, 4.5), target: new THREE.Vector3(0, 0, 0), fov: 45 },
]

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t
}

function lerpVec(a: THREE.Vector3, b: THREE.Vector3, t: number): THREE.Vector3 {
  return new THREE.Vector3(lerp(a.x, b.x, t), lerp(a.y, b.y, t), lerp(a.z, b.z, t))
}

export default function CinematicController() {
  const { camera } = useThree()
  const currentPos = useRef(new THREE.Vector3(0, 1, 5))
  const currentTarget = useRef(new THREE.Vector3(0, 0, 0))

  useFrame(() => {
    const totalPhases = phases.length - 1
    const scaledProgress = scrollProgress * totalPhases
    const phaseIndex = Math.min(Math.floor(scaledProgress), totalPhases - 1)
    const phaseT = scaledProgress - phaseIndex

    const from = phases[phaseIndex]
    const to = phases[Math.min(phaseIndex + 1, totalPhases)]

    const desiredPos = lerpVec(from.position, to.position, phaseT)
    const desiredTarget = lerpVec(from.target, to.target, phaseT)

    currentPos.current.lerp(desiredPos, 0.08)
    currentTarget.current.lerp(desiredTarget, 0.08)

    camera.position.copy(currentPos.current)
    camera.lookAt(currentTarget.current)

    const desiredFov = lerp(from.fov, to.fov, phaseT)
    const cam = camera as THREE.PerspectiveCamera
    if (cam.fov !== undefined) {
      cam.fov = desiredFov
      cam.updateProjectionMatrix()
    }
  })

  return null
}
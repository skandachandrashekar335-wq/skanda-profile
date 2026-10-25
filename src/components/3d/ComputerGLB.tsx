"use client"

import { useEffect, useRef } from "react"
import { useGLTF } from "@react-three/drei"
import * as THREE from "three"

const VERTEX_THRESHOLD = 10000

export default function ComputerGLB() {
  const { scene } = useGLTF("/assets/computer/computer.glb")
  const groupRef = useRef<THREE.Group>(null)

  useEffect(() => {
    if (!groupRef.current) return

    let hiddenCount = 0
    let hiddenVerts = 0
    let keptMeshes = 0

    groupRef.current.traverse((child) => {
      const mesh = child as THREE.Mesh
      if (mesh.isMesh && mesh.geometry) {
        const vertCount = mesh.geometry.attributes.position
          ? mesh.geometry.attributes.position.count
          : 0
        if (vertCount > VERTEX_THRESHOLD) {
          mesh.visible = false
          hiddenCount++
          hiddenVerts += vertCount
          console.log(
            "[SKANDA.EXE] Hidden:",
            mesh.parent?.name || "unnamed",
            "verts:",
            vertCount
          )
        } else {
          keptMeshes++
        }
      }
    })

    console.log("[SKANDA.EXE] Hidden", hiddenCount, "environment meshes (", hiddenVerts, "verts )")
    console.log("[SKANDA.EXE] Kept", keptMeshes, "PC meshes")

    const box = new THREE.Box3().setFromObject(groupRef.current)
    const center = new THREE.Vector3()
    const size = new THREE.Vector3()
    box.getCenter(center)
    box.getSize(size)

    console.log("[SKANDA.EXE] PC bounds min:", box.min.toArray().map(v => +v.toFixed(2)))
    console.log("[SKANDA.EXE] PC bounds max:", box.max.toArray().map(v => +v.toFixed(2)))
    console.log("[SKANDA.EXE] PC size:", size.toArray().map(v => +v.toFixed(2)))
    console.log("[SKANDA.EXE] PC center:", center.toArray().map(v => +v.toFixed(2)))

    const maxDim = Math.max(size.x, size.y, size.z)
    const targetSize = 3.0
    const scaleFactor = targetSize / maxDim

    groupRef.current.position.set(
      -center.x * scaleFactor,
      -center.y * scaleFactor,
      -center.z * scaleFactor
    )
    groupRef.current.scale.setScalar(scaleFactor)

    const finalBox = new THREE.Box3().setFromObject(groupRef.current)
    const finalCenter = new THREE.Vector3()
    const finalSize = new THREE.Vector3()
    finalBox.getCenter(finalCenter)
    finalBox.getSize(finalSize)

    console.log("[SKANDA.EXE] After centering — size:", finalSize.toArray().map(v => +v.toFixed(2)))
    console.log("[SKANDA.EXE] After centering — center:", finalCenter.toArray().map(v => +v.toFixed(2)))
    console.log("[SKANDA.EXE] Scale factor:", scaleFactor.toFixed(4))
  }, [scene])

  return (
    <group ref={groupRef}>
      <primitive object={scene} />
    </group>
  )
}

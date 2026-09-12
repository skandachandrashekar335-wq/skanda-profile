"use client"

import { useRef, useEffect, type ReactNode } from "react"
import { sampleProjects } from "@/data/projects/sample-projects"
import { educationData } from "@/data/education/education-data"
import { profileData } from "@/data/profile/profile-data"

function useReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches

    if (prefersReduced) {
      el.style.opacity = "1"
      el.style.transform = "translateY(0)"
      return
    }

    el.style.opacity = "0"
    el.style.transform = "translateY(24px)"
    el.style.transition = "opacity 0.7s ease, transform 0.7s ease"

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = "1"
          el.style.transform = "translateY(0)"
          observer.unobserve(el)
        }
      },
      { threshold }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  return ref
}

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        fontFamily: "var(--font-geist-mono), 'Geist Mono', monospace",
        fontSize: "clamp(8px, 0.85vw, 10px)",
        color: "#4ecdc4",
        letterSpacing: "0.25em",
        textTransform: "uppercase",
        marginBottom: 8,
      }}
    >
      {children}
    </div>
  )
}

function SectionTitle({
  children,
  style,
}: {
  children: ReactNode
  style?: React.CSSProperties
}) {
  return (
    <h2
      style={{
        fontFamily: "var(--font-geist-mono), 'Geist Mono', monospace",
        fontSize: "clamp(24px, 3.5vw, 48px)",
        color: "#fff",
        letterSpacing: "0.05em",
        textTransform: "uppercase",
        fontWeight: 300,
        lineHeight: 1.1,
        margin: 0,
        ...style,
      }}
    >
      {children}
    </h2>
  )
}

function Divider() {
  return (
    <div
      style={{
        width: 48,
        height: 1,
        background: "#222",
        margin: "0 auto",
      }}
    />
  )
}

function ThinLine() {
  return (
    <div
      style={{
        width: "100%",
        height: 1,
        background: "#111",
        marginTop: 48,
        marginBottom: 48,
      }}
    />
  )
}

const SECTION_STYLE: React.CSSProperties = {
  minHeight: "80vh",
  padding: "clamp(60px, 10vw, 140px) clamp(24px, 6vw, 160px)",
  position: "relative",
  zIndex: 10,
}

const INNER_STYLE: React.CSSProperties = {
  maxWidth: 960,
  margin: "0 auto",
}

/* ─── IDENTITY ──────────────────────────────────────────────── */

export function IdentitySection() {
  const ref = useReveal()
  return (
    <section ref={ref} id="identity" style={SECTION_STYLE}>
      <div style={INNER_STYLE}>
        <SectionLabel>SYSTEM.IDENTITY</SectionLabel>
        <SectionTitle>SKANDA.EXE</SectionTitle>

        <div
          style={{
            marginTop: 32,
            fontFamily: "var(--font-geist-mono), 'Geist Mono', monospace",
            fontSize: "clamp(11px, 1.3vw, 15px)",
            color: "#fff",
            letterSpacing: "0.04em",
            lineHeight: 1.6,
            textTransform: "uppercase",
            fontWeight: 300,
          }}
        >
          {profileData.name}
        </div>

        <div
          style={{
            marginTop: 16,
            fontFamily: "var(--font-geist-mono), 'Geist Mono', monospace",
            fontSize: "clamp(9px, 0.95vw, 12px)",
            color: "#4ecdc4",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
          }}
        >
          BCA STUDENT
        </div>

        <div
          style={{
            marginTop: 8,
            fontFamily: "var(--font-geist-mono), 'Geist Mono', monospace",
            fontSize: "clamp(9px, 0.95vw, 12px)",
            color: "#4ecdc4",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
          }}
        >
          SOFTWARE DEVELOPER
        </div>

        <div
          style={{
            marginTop: 8,
            fontFamily: "var(--font-geist-mono), 'Geist Mono', monospace",
            fontSize: "clamp(9px, 0.95vw, 12px)",
            color: "#4ecdc4",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
          }}
        >
          AI / AUTOMATION / QA
        </div>

        <Divider />

        <div
          style={{
            marginTop: 32,
            fontFamily: "var(--font-geist-mono), 'Geist Mono', monospace",
            fontSize: "clamp(10px, 1vw, 13px)",
            color: "#999",
            lineHeight: 1.8,
            letterSpacing: "0.02em",
          }}
        >
          Software developer and BCA student exploring the intersection of
          software development, AI, automation and software testing. I enjoy
          turning ideas into practical systems and experimenting with new
          technologies, interfaces and workflows.
        </div>

        <Divider />

        <div
          style={{
            marginTop: 32,
            fontFamily: "var(--font-geist-mono), 'Geist Mono', monospace",
            fontSize: "clamp(10px, 1vw, 13px)",
            color: "#999",
            lineHeight: 1.8,
            letterSpacing: "0.02em",
          }}
        >
          Currently completing Bachelor of Computer Applications at{" "}
          {profileData.college}, {profileData.location}.
        </div>

        <div
          style={{
            marginTop: 16,
            fontFamily: "var(--font-geist-mono), 'Geist Mono', monospace",
            fontSize: "clamp(10px, 1vw, 13px)",
            color: "#999",
            lineHeight: 1.8,
            letterSpacing: "0.02em",
          }}
        >
          Interests span real-time web systems, voice interfaces, computer
          vision, agentic AI, and the intersection of design and engineering.
        </div>

        <Divider />

        <div
          style={{
            marginTop: 40,
            display: "flex",
            gap: 24,
            justifyContent: "center",
            flexWrap: "wrap",
            fontFamily: "var(--font-geist-mono), 'Geist Mono', monospace",
            fontSize: "clamp(8px, 0.8vw, 10px)",
            color: "#444",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
          }}
        >
          <span>{profileData.name.toUpperCase()}</span>
          <span style={{ color: "#222" }}>|</span>
          <span>{profileData.degree}</span>
          <span style={{ color: "#222" }}>|</span>
          <span>{profileData.location.toUpperCase()}</span>
        </div>
      </div>
    </section>
  )
}

/* ─── PROJECTS ──────────────────────────────────────────────── */

function ProjectModule({
  project,
  index,
}: {
  project: (typeof sampleProjects)[0]
  index: number
}) {
  const ref = useReveal(0.1)
  const statusColor =
    project.status === "deployed"
      ? "#4ecdc4"
      : project.status === "completed"
        ? "#4ecdc4"
        : project.status === "in-progress"
          ? "#c4a74e"
          : project.status === "testing"
            ? "#c47a4e"
            : "#666"

  return (
    <div
      ref={ref}
      style={{
        border: "1px solid #111",
        padding: "clamp(24px, 3vw, 40px)",
        marginBottom: 24,
        background: "#08080c",
      }}
    >
      <div
        style={{
          fontFamily: "var(--font-geist-mono), 'Geist Mono', monospace",
          fontSize: "clamp(7px, 0.7vw, 9px)",
          color: "#333",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          marginBottom: 12,
        }}
      >
        PROJECT_{String(index + 1).padStart(2, "0")}
      </div>

      <div
        style={{
          fontFamily: "var(--font-geist-mono), 'Geist Mono', monospace",
          fontSize: "clamp(16px, 2vw, 28px)",
          color: "#fff",
          letterSpacing: "0.05em",
          textTransform: "uppercase",
          fontWeight: 300,
        }}
      >
        {project.name}
      </div>

      <div
        style={{
          fontFamily: "var(--font-geist-mono), 'Geist Mono', monospace",
          fontSize: "clamp(9px, 0.9vw, 11px)",
          color: "#666",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          marginTop: 8,
          marginBottom: 20,
        }}
      >
        {project.shortDescription}
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: 20,
          marginTop: 16,
        }}
      >
        <div>
          <div
            style={{
              fontFamily: "var(--font-geist-mono), 'Geist Mono', monospace",
              fontSize: "clamp(7px, 0.7vw, 9px)",
              color: "#4ecdc4",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              marginBottom: 8,
            }}
          >
            STATUS
          </div>
          <div
            style={{
              fontFamily: "var(--font-geist-mono), 'Geist Mono', monospace",
              fontSize: "clamp(9px, 0.9vw, 11px)",
              color: statusColor,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              padding: "4px 8px",
              background:
                project.status === "deployed"
                  ? "#0a1a1a"
                  : "#1a1a0a",
              display: "inline-block",
            }}
          >
            {project.status.toUpperCase()}
          </div>
        </div>

        <div>
          <div
            style={{
              fontFamily: "var(--font-geist-mono), 'Geist Mono', monospace",
              fontSize: "clamp(7px, 0.7vw, 9px)",
              color: "#4ecdc4",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              marginBottom: 8,
            }}
          >
            CATEGORY
          </div>
          <div
            style={{
              fontFamily: "var(--font-geist-mono), 'Geist Mono', monospace",
              fontSize: "clamp(9px, 0.9vw, 11px)",
              color: "#888",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            {project.category}
          </div>
        </div>

        <div>
          <div
            style={{
              fontFamily: "var(--font-geist-mono), 'Geist Mono', monospace",
              fontSize: "clamp(7px, 0.7vw, 9px)",
              color: "#4ecdc4",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              marginBottom: 8,
            }}
          >
            PROGRESS
          </div>
          <div
            style={{
              width: "100%",
              height: 2,
              background: "#111",
              marginTop: 6,
              position: "relative",
            }}
          >
            <div
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                height: "100%",
                width: `${project.progress}%`,
                background: "#4ecdc4",
              }}
            />
          </div>
          <div
            style={{
              fontFamily: "var(--font-geist-mono), 'Geist Mono', monospace",
              fontSize: "clamp(8px, 0.8vw, 10px)",
              color: "#555",
              letterSpacing: "0.1em",
              marginTop: 4,
            }}
          >
            {project.progress}%
          </div>
        </div>
      </div>

      <div style={{ marginTop: 20 }}>
        <div
          style={{
            fontFamily: "var(--font-geist-mono), 'Geist Mono', monospace",
            fontSize: "clamp(7px, 0.7vw, 9px)",
            color: "#4ecdc4",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            marginBottom: 8,
          }}
        >
          TECHNOLOGIES
        </div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {project.technologies.map((t) => (
            <span
              key={t}
              style={{
                fontFamily: "var(--font-geist-mono), 'Geist Mono', monospace",
                fontSize: "clamp(8px, 0.8vw, 10px)",
                color: "#888",
                padding: "4px 10px",
                border: "1px solid #1a1a1a",
                letterSpacing: "0.05em",
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      {project.features.length > 0 && (
        <div style={{ marginTop: 16 }}>
          <div
            style={{
              fontFamily: "var(--font-geist-mono), 'Geist Mono', monospace",
              fontSize: "clamp(7px, 0.7vw, 9px)",
              color: "#4ecdc4",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              marginBottom: 8,
            }}
          >
            FEATURES
          </div>
          {project.features.map((f) => (
            <div
              key={f}
              style={{
                fontFamily: "var(--font-geist-mono), 'Geist Mono', monospace",
                fontSize: "clamp(9px, 0.9vw, 11px)",
                color: "#666",
                padding: "4px 0",
                letterSpacing: "0.03em",
              }}
            >
              {f}
            </div>
          ))}
        </div>
      )}

      {(project.github || project.demo) && (
        <div
          style={{
            marginTop: 20,
            display: "flex",
            gap: 16,
          }}
        >
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: "var(--font-geist-mono), 'Geist Mono', monospace",
                fontSize: "clamp(8px, 0.8vw, 10px)",
                color: "#4ecdc4",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                border: "1px solid #1a3a3a",
                padding: "6px 16px",
                transition: "border-color 0.3s ease",
              }}
            >
              VIEW SOURCE
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: "var(--font-geist-mono), 'Geist Mono', monospace",
                fontSize: "clamp(8px, 0.8vw, 10px)",
                color: "#888",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                border: "1px solid #1a1a1a",
                padding: "6px 16px",
                transition: "border-color 0.3s ease",
              }}
            >
              VIEW PROJECT
            </a>
          )}
        </div>
      )}
    </div>
  )
}

export function ProjectsSection() {
  const ref = useReveal()
  const displayProjects = sampleProjects

  return (
    <section ref={ref} id="projects" style={SECTION_STYLE}>
      <div style={INNER_STYLE}>
        <SectionLabel>SYSTEM.BUILD_LOG</SectionLabel>
        <SectionTitle>PROJECTS</SectionTitle>

        <div
          style={{
            marginTop: 12,
            fontFamily: "var(--font-geist-mono), 'Geist Mono', monospace",
            fontSize: "clamp(9px, 0.9vw, 11px)",
            color: "#555",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}
        >
          {displayProjects.length} VERIFIED PROJECTS
        </div>

        <div style={{ marginTop: 48 }}>
          {displayProjects.map((project, i) => (
            <ProjectModule key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── SKILLS + LEARNING LOG ─────────────────────────────────── */

function SkillCategory({
  label,
  items,
  status,
}: {
  label: string
  items: string[]
  status?: "ACTIVE" | "LEARNING" | "EXPLORING"
}) {
  const statusBg =
    status === "ACTIVE"
      ? "#0a1a1a"
      : status === "LEARNING"
        ? "#0a1520"
        : status === "EXPLORING"
          ? "#141420"
          : "transparent"

  return (
    <div style={{ marginBottom: 32 }}>
      <div
        style={{
          fontFamily: "var(--font-geist-mono), 'Geist Mono', monospace",
          fontSize: "clamp(8px, 0.85vw, 10px)",
          color: "#4ecdc4",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          marginBottom: 8,
        }}
      >
        {label}
      </div>
      {status && (
        <div
          style={{
            fontFamily: "var(--font-geist-mono), 'Geist Mono', monospace",
            fontSize: "clamp(7px, 0.7vw, 8px)",
            color: "#4ecdc4",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            marginBottom: 12,
            padding: "3px 8px",
            background: statusBg,
            display: "inline-block",
          }}
        >
          {status}
        </div>
      )}
      {items.map((item) => (
        <div
          key={item}
          style={{
            fontFamily: "var(--font-geist-mono), 'Geist Mono', monospace",
            fontSize: "clamp(10px, 1vw, 13px)",
            color: "#777",
            padding: "5px 0",
            borderBottom: "1px solid #0d0d0d",
            letterSpacing: "0.04em",
          }}
        >
          {item}
        </div>
      ))}
    </div>
  )
}

export function SkillsSection() {
  const ref = useReveal()
  const groups = [
    {
      label: "PROGRAMMING",
      items: ["JavaScript", "TypeScript", "Python", "Java", "SQL"],
      status: "ACTIVE" as const,
    },
    {
      label: "WEB DEVELOPMENT",
      items: ["React", "Next.js", "HTML", "CSS", "Tailwind CSS"],
      status: "ACTIVE" as const,
    },
    {
      label: "AI / MACHINE LEARNING",
      items: ["AI", "Machine Learning", "LLM Concepts", "AI Automation", "Prompt Engineering"],
      status: "EXPLORING" as const,
    },
    {
      label: "SOFTWARE TESTING / QA",
      items: [
        "Manual Testing",
        "Test Case Design",
        "Functional Testing",
        "Regression Testing",
        "UI Testing",
        "API Testing",
        "Bug Reporting",
        "Quality Assurance",
      ],
      status: "LEARNING" as const,
    },
    {
      label: "TOOLS / DEVELOPMENT",
      items: ["Git", "GitHub", "VS Code", "Firebase", "Supabase", "Linux / Terminal"],
    },
    {
      label: "3D / CREATIVE",
      items: ["Three.js", "WebGL", "GSAP", "Interactive Web Experiences"],
    },
  ]

  return (
    <section ref={ref} id="skills-detail" style={SECTION_STYLE}>
      <div style={INNER_STYLE}>
        <SectionLabel>SYSTEM.CAPABILITIES</SectionLabel>
        <SectionTitle>SKILLS</SectionTitle>

        <div
          style={{
            marginTop: 48,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "clamp(24px, 3vw, 48px)",
          }}
        >
          {groups.map((group) => (
            <SkillCategory key={group.label} {...group} />
          ))}
        </div>

        <ThinLine />

        <SectionLabel>CURRENTLY EXPLORING</SectionLabel>
        <SectionTitle style={{ fontSize: "clamp(16px, 2vw, 28px)" }}>
          LEARNING.LOG
        </SectionTitle>

        <div
          style={{
            marginTop: 32,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: 16,
          }}
        >
          {[
            { area: "Software Testing / QA", status: "LEARNING" },
            { area: "Agentic AI", status: "EXPLORING" },
            { area: "AI / Automation", status: "EXPLORING" },
            { area: "Linux / Networking", status: "PRACTICING" },
            { area: "Web Development", status: "BUILDING" },
            { area: "3D / Creative Tech", status: "EXPLORING" },
          ].map((item) => (
            <div
              key={item.area}
              style={{
                border: "1px solid #111",
                padding: "12px 16px",
                background: "#08080c",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-geist-mono), 'Geist Mono', monospace",
                  fontSize: "clamp(9px, 0.9vw, 11px)",
                  color: "#ccc",
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                }}
              >
                {item.area}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-geist-mono), 'Geist Mono', monospace",
                  fontSize: "clamp(7px, 0.7vw, 8px)",
                  color: "#4ecdc4",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  marginTop: 6,
                }}
              >
                {item.status}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── EDUCATION ─────────────────────────────────────────────── */

export function EducationSection() {
  const ref = useReveal()
  return (
    <section ref={ref} id="education" style={SECTION_STYLE}>
      <div style={INNER_STYLE}>
        <SectionLabel>SYSTEM.EDUCATION</SectionLabel>
        <SectionTitle>EDUCATION</SectionTitle>

        <div
          style={{
            marginTop: 48,
            border: "1px solid #111",
            padding: "clamp(24px, 3vw, 40px)",
            background: "#08080c",
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-geist-mono), 'Geist Mono', monospace",
              fontSize: "clamp(7px, 0.7vw, 9px)",
              color: "#333",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              marginBottom: 16,
            }}
          >
            {educationData.startYear} — {educationData.endYear}
          </div>

          <div
            style={{
              fontFamily: "var(--font-geist-mono), 'Geist Mono', monospace",
              fontSize: "clamp(14px, 1.8vw, 24px)",
              color: "#fff",
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              fontWeight: 300,
            }}
          >
            {educationData.degree}
          </div>

          <div
            style={{
              fontFamily: "var(--font-geist-mono), 'Geist Mono', monospace",
              fontSize: "clamp(10px, 1vw, 13px)",
              color: "#4ecdc4",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              marginTop: 8,
            }}
          >
            {educationData.institution}
          </div>

          <div
            style={{
              fontFamily: "var(--font-geist-mono), 'Geist Mono', monospace",
              fontSize: "clamp(9px, 0.9vw, 11px)",
              color: "#666",
              lineHeight: 1.8,
              marginTop: 16,
              letterSpacing: "0.02em",
            }}
          >
            {educationData.description}
          </div>

          {educationData.coursework.length > 0 && (
            <div style={{ marginTop: 24 }}>
              <div
                style={{
                  fontFamily: "var(--font-geist-mono), 'Geist Mono', monospace",
                  fontSize: "clamp(7px, 0.7vw, 9px)",
                  color: "#4ecdc4",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  marginBottom: 12,
                }}
              >
                COURSEWORK
              </div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {educationData.coursework.map((c) => (
                  <span
                    key={c}
                    style={{
                      fontFamily:
                        "var(--font-geist-mono), 'Geist Mono', monospace",
                      fontSize: "clamp(8px, 0.8vw, 10px)",
                      color: "#666",
                      padding: "4px 10px",
                      border: "1px solid #1a1a1a",
                      letterSpacing: "0.05em",
                    }}
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

/* ─── TECH ECOSYSTEM ────────────────────────────────────────── */

export function TechEcosystemSection() {
  const ref = useReveal()

  const tree = [
    {
      label: "SOFTWARE",
      children: [
        {
          label: "WEB",
          items: ["React", "Next.js", "TypeScript", "HTML", "CSS", "Tailwind"],
        },
        {
          label: "AI",
          items: ["Python", "AI / ML", "Agentic AI", "Automation"],
        },
        { label: "QA", items: ["Software Testing", "Manual Testing", "Bug Reporting"] },
        { label: "3D", items: ["Three.js", "React Three Fiber", "GLTF"] },
        { label: "SYSTEMS", items: ["Linux", "Git", "SQL", "Firebase", "Networking"] },
      ],
    },
  ]

  return (
    <section ref={ref} id="ecosystem" style={SECTION_STYLE}>
      <div style={INNER_STYLE}>
        <SectionLabel>SYSTEM.ARCHITECTURE</SectionLabel>
        <SectionTitle>TECH ECOSYSTEM</SectionTitle>

        <div style={{ marginTop: 48 }}>
          {tree.map((root) => (
            <div key={root.label}>
              <div
                style={{
                  fontFamily: "var(--font-geist-mono), 'Geist Mono', monospace",
                  fontSize: "clamp(10px, 1vw, 13px)",
                  color: "#fff",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  padding: "8px 0",
                  borderBottom: "1px solid #111",
                }}
              >
                {root.label}
              </div>
              {root.children.map((branch, bi) => (
                <div
                  key={branch.label}
                  style={{
                    marginLeft: "clamp(16px, 2vw, 32px)",
                    marginTop: 16,
                  }}
                >
                  <div
                    style={{
                      fontFamily:
                        "var(--font-geist-mono), 'Geist Mono', monospace",
                      fontSize: "clamp(8px, 0.85vw, 10px)",
                      color: "#4ecdc4",
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      marginBottom: 8,
                    }}
                  >
                    ├── {branch.label}
                  </div>
                  <div
                    style={{
                      marginLeft: "clamp(16px, 2vw, 32px)",
                    }}
                  >
                    {branch.items.map((item, ii) => (
                      <div
                        key={item}
                        style={{
                          fontFamily:
                            "var(--font-geist-mono), 'Geist Mono', monospace",
                          fontSize: "clamp(9px, 0.9vw, 11px)",
                          color: "#666",
                          padding: "3px 0",
                          letterSpacing: "0.04em",
                        }}
                      >
                        {ii === branch.items.length - 1 ? "└── " : "├── "}
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── ACHIEVEMENTS ──────────────────────────────────────────── */

export function AchievementsSection() {
  const ref = useReveal()
  return (
    <section ref={ref} id="achievements" style={SECTION_STYLE}>
      <div style={INNER_STYLE}>
        <SectionLabel>SYSTEM.RECORDS</SectionLabel>
        <SectionTitle>ACHIEVEMENTS</SectionTitle>

        <div
          style={{
            marginTop: 48,
            fontFamily: "var(--font-geist-mono), 'Geist Mono', monospace",
            fontSize: "clamp(10px, 1vw, 13px)",
            color: "#666",
            lineHeight: 1.8,
            letterSpacing: "0.03em",
            marginBottom: 32,
          }}
        >
          Verified project completions and learning milestones.
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: 16,
          }}
        >
          {sampleProjects
            .filter(
              (p) =>
                p.status === "deployed" ||
                p.status === "completed" ||
                p.progress >= 80
            )
            .map((project) => (
              <div
                key={project.id}
                style={{
                  border: "1px solid #111",
                  padding: "16px 20px",
                  background: "#08080c",
                }}
              >
                <div
                  style={{
                    fontFamily:
                      "var(--font-geist-mono), 'Geist Mono', monospace",
                    fontSize: "clamp(9px, 0.9vw, 11px)",
                    color: "#fff",
                    letterSpacing: "0.05em",
                    textTransform: "uppercase",
                  }}
                >
                  {project.name}
                </div>
                <div
                  style={{
                    fontFamily:
                      "var(--font-geist-mono), 'Geist Mono', monospace",
                    fontSize: "clamp(8px, 0.8vw, 10px)",
                    color: "#4ecdc4",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    marginTop: 4,
                  }}
                >
                  {project.status.toUpperCase()} — {project.progress}%
                </div>
                <div
                  style={{
                    fontFamily:
                      "var(--font-geist-mono), 'Geist Mono', monospace",
                    fontSize: "clamp(8px, 0.8vw, 10px)",
                    color: "#555",
                    marginTop: 8,
                    lineHeight: 1.6,
                  }}
                >
                  {project.category}
                </div>
              </div>
            ))}

          <div
            style={{
              border: "1px solid #111",
              padding: "16px 20px",
              background: "#08080c",
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-geist-mono), 'Geist Mono', monospace",
                fontSize: "clamp(9px, 0.9vw, 11px)",
                color: "#fff",
                letterSpacing: "0.05em",
                textTransform: "uppercase",
              }}
            >
              BCA DEGREE
            </div>
            <div
              style={{
                fontFamily: "var(--font-geist-mono), 'Geist Mono', monospace",
                fontSize: "clamp(8px, 0.8vw, 10px)",
                color: "#4ecdc4",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                marginTop: 4,
              }}
            >
              COMPLETED
            </div>
            <div
              style={{
                fontFamily: "var(--font-geist-mono), 'Geist Mono', monospace",
                fontSize: "clamp(8px, 0.8vw, 10px)",
                color: "#555",
                marginTop: 8,
                lineHeight: 1.6,
              }}
            >
              {educationData.institution}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── CONTACT ───────────────────────────────────────────────── */

export function ContactSection() {
  const ref = useReveal()
  return (
    <section ref={ref} id="contact" style={SECTION_STYLE}>
      <div style={INNER_STYLE}>
        <SectionLabel>OPEN_CHANNEL</SectionLabel>
        <SectionTitle>CONTACT</SectionTitle>

        <div
          style={{
            marginTop: 48,
            fontFamily: "var(--font-geist-mono), 'Geist Mono', monospace",
            fontSize: "clamp(10px, 1vw, 13px)",
            color: "#666",
            lineHeight: 1.8,
            letterSpacing: "0.03em",
            marginBottom: 32,
          }}
        >
          Open to internships, collaboration, and interesting conversations.
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 16,
          }}
        >
          {profileData.social.github && (
            <a
              href={profileData.social.github}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: "var(--font-geist-mono), 'Geist Mono', monospace",
                fontSize: "clamp(10px, 1vw, 13px)",
                color: "#4ecdc4",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                padding: "12px 0",
                borderBottom: "1px solid #111",
                display: "block",
                transition: "color 0.3s ease",
              }}
            >
              GITHUB →
            </a>
          )}
          {profileData.social.linkedin && (
            <a
              href={profileData.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: "var(--font-geist-mono), 'Geist Mono', monospace",
                fontSize: "clamp(10px, 1vw, 13px)",
                color: "#4ecdc4",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                padding: "12px 0",
                borderBottom: "1px solid #111",
                display: "block",
                transition: "color 0.3s ease",
              }}
            >
              LINKEDIN →
            </a>
          )}
          {profileData.social.instagram && (
            <a
              href={profileData.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: "var(--font-geist-mono), 'Geist Mono', monospace",
                fontSize: "clamp(10px, 1vw, 13px)",
                color: "#4ecdc4",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                padding: "12px 0",
                borderBottom: "1px solid #111",
                display: "block",
                transition: "color 0.3s ease",
              }}
            >
              INSTAGRAM →
            </a>
          )}
          <a
            href={`mailto:${profileData.social.email}`}
            style={{
              fontFamily: "var(--font-geist-mono), 'Geist Mono', monospace",
              fontSize: "clamp(10px, 1vw, 13px)",
              color: "#4ecdc4",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              padding: "12px 0",
              borderBottom: "1px solid #111",
              display: "block",
              transition: "color 0.3s ease",
            }}
          >
            EMAIL →
          </a>
          <a
            href={`tel:+91${profileData.social.phone}`}
            style={{
              fontFamily: "var(--font-geist-mono), 'Geist Mono', monospace",
              fontSize: "clamp(10px, 1vw, 13px)",
              color: "#4ecdc4",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              padding: "12px 0",
              borderBottom: "1px solid #111",
              display: "block",
              transition: "color 0.3s ease",
            }}
          >
            PHONE →
          </a>
        </div>
      </div>
    </section>
  )
}

/* ─── FINAL ─────────────────────────────────────────────────── */

export function FinalSection() {
  const ref = useReveal()
  return (
    <section
      ref={ref}
      style={{
        minHeight: "60vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "clamp(60px, 10vw, 140px) clamp(24px, 6vw, 160px)",
        position: "relative",
        zIndex: 10,
      }}
    >
      <div style={{ textAlign: "center" }}>
        <div
          style={{
            width: 1,
            height: 60,
            background:
              "linear-gradient(to bottom, transparent, #4ecdc4, transparent)",
            margin: "0 auto 40px",
          }}
        />
        <div
          style={{
            fontFamily: "var(--font-geist-mono), 'Geist Mono', monospace",
            fontSize: "clamp(14px, 2vw, 24px)",
            color: "#fff",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
          }}
        >
          SKANDA.EXE
        </div>
        <div
          style={{
            fontFamily: "var(--font-geist-mono), 'Geist Mono', monospace",
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
            marginTop: 48,
            fontFamily: "var(--font-geist-mono), 'Geist Mono', monospace",
            fontSize: "clamp(9px, 1vw, 12px)",
            color: "#444",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            lineHeight: 2.2,
          }}
        >
          <div>BUILD.</div>
          <div>EXPLORE.</div>
          <div>EXPERIMENT.</div>
        </div>
        <div
          style={{
            width: 1,
            height: 60,
            background:
              "linear-gradient(to bottom, transparent, #4ecdc4, transparent)",
            margin: "40px auto 0",
          }}
        />
      </div>
    </section>
  )
}

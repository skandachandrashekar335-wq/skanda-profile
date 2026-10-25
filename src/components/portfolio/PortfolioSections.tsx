"use client"

import { useRef, useEffect, useState, type ReactNode } from "react"
import { sampleProjects } from "@/data/projects/sample-projects"
import { educationData } from "@/data/education/education-data"
import { profileData } from "@/data/profile/profile-data"

const MONO = "var(--font-geist-mono), 'Geist Mono', monospace"
const SANS = "var(--font-geist-sans), 'Geist', sans-serif"

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
    el.style.transform = "translateY(20px)"
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease"

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

function ModuleLabel({ number }: { number: string; title?: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
      <span
        style={{
          fontFamily: MONO,
          fontSize: "clamp(7px, 0.7vw, 8px)",
          color: "#4ecdc4",
          letterSpacing: "0.15em",
          opacity: 0.6,
        }}
      >
        MODULE {number}
      </span>
      <div style={{ flex: 1, height: 1, background: "rgba(78,205,196,0.1)" }} />
    </div>
  )
}

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        fontFamily: MONO,
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
        fontFamily: MONO,
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

function StatusBadge({ label, variant = "default" }: { label: string; variant?: "default" | "active" | "learning" }) {
  const bg = variant === "active" ? "rgba(78,205,196,0.1)" : variant === "learning" ? "rgba(78,205,196,0.06)" : "rgba(255,255,255,0.03)"
  const color = variant === "active" ? "#4ecdc4" : variant === "learning" ? "#4ecdc4" : "#666"

  return (
    <span
      style={{
        fontFamily: MONO,
        fontSize: "clamp(7px, 0.7vw, 8px)",
        color,
        letterSpacing: "0.15em",
        textTransform: "uppercase",
        padding: "3px 8px",
        background: bg,
        display: "inline-block",
      }}
    >
      {label}
    </span>
  )
}

const SECTION_STYLE: React.CSSProperties = {
  minHeight: "60vh",
  padding: "clamp(60px, 8vw, 120px) clamp(24px, 6vw, 160px)",
  position: "relative",
  zIndex: 10,
}

const INNER_STYLE: React.CSSProperties = {
  maxWidth: 960,
  margin: "0 auto",
}

/* ─── ABOUT ──────────────────────────────────────────────── */

export function AboutSection() {
  const ref = useReveal()
  return (
    <section ref={ref} id="skills" style={SECTION_STYLE}>
      <div style={INNER_STYLE}>
        <ModuleLabel number="01" title="IDENTITY CORE" />
        <SectionLabel>01 — ABOUT</SectionLabel>
        <SectionTitle>SKANDA CHANDRASHEKHAR</SectionTitle>

        <div
          style={{
            marginTop: 20,
            display: "flex",
            gap: 16,
            flexWrap: "wrap",
            fontFamily: MONO,
            fontSize: "clamp(9px, 0.9vw, 11px)",
            color: "#4ecdc4",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
          }}
        >
          <span>BCA Student</span>
          <span style={{ color: "#333" }}>·</span>
          <span>Software Developer</span>
          <span style={{ color: "#333" }}>·</span>
          <span>QA / AI Automation</span>
        </div>

        <div
          style={{
            marginTop: 32,
            fontFamily: SANS,
            fontSize: "clamp(11px, 1.2vw, 15px)",
            color: "#999",
            lineHeight: 1.8,
            maxWidth: 700,
          }}
        >
          BCA student building practical software systems across web development,
          AI, automation and software testing. I learn by turning ideas into working
          systems, testing them, debugging failures and iterating.
        </div>

        <div
          style={{
            marginTop: 16,
            fontFamily: SANS,
            fontSize: "clamp(10px, 1.1vw, 14px)",
            color: "#666",
            lineHeight: 1.8,
            maxWidth: 700,
          }}
        >
          Currently pursuing BCA at Dayananda Sagar College of Arts, Science &
          Commerce, Bangalore. Interested in software development, AI/automation,
          voice interfaces, computer vision, agentic AI and software quality.
        </div>

        {/* WHAT I'M LOOKING FOR */}
        <div
          style={{
            marginTop: 48,
            padding: "clamp(20px, 2.5vw, 32px)",
            background: "#12121b",
            border: "1px solid rgba(78,205,196,0.1)",
          }}
        >
          <div
            style={{
              fontFamily: MONO,
              fontSize: "clamp(7px, 0.7vw, 9px)",
              color: "#4ecdc4",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              marginBottom: 16,
            }}
          >
            WHAT I&apos;M LOOKING FOR
          </div>
          <div
            style={{
              fontFamily: MONO,
              fontSize: "clamp(7px, 0.7vw, 9px)",
              color: "#4ecdc4",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              marginBottom: 12,
            }}
          >
            OPEN TO
          </div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            {[
              "Software Development Internships",
              "QA / Software Testing Internships",
              "AI / Automation Internships",
            ].map((item) => (
              <span
                key={item}
                style={{
                  fontFamily: MONO,
                  fontSize: "clamp(8px, 0.8vw, 10px)",
                  color: "#888",
                  padding: "5px 12px",
                  border: "1px solid rgba(255,255,255,0.06)",
                  letterSpacing: "0.05em",
                }}
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        <div
          style={{
            marginTop: 40,
            display: "flex",
            gap: 16,
            flexWrap: "wrap",
          }}
        >
          <a
            href="#projects"
            onClick={(e) => {
              e.preventDefault()
              document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })
            }}
            style={{
              fontFamily: MONO,
              fontSize: "clamp(9px, 0.9vw, 11px)",
              color: "#0a0a0f",
              background: "#4ecdc4",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              padding: "10px 24px",
              border: "none",
              cursor: "pointer",
              textDecoration: "none",
              display: "inline-block",
              transition: "opacity 0.3s ease",
            }}
          >
            VIEW PROJECTS →
          </a>
          <a
            href={profileData.social.github}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: MONO,
              fontSize: "clamp(9px, 0.9vw, 11px)",
              color: "#4ecdc4",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              padding: "10px 24px",
              border: "1px solid rgba(78,205,196,0.2)",
              textDecoration: "none",
              display: "inline-block",
              transition: "border-color 0.3s ease",
            }}
          >
            GITHUB →
          </a>
          <a
            href={profileData.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: MONO,
              fontSize: "clamp(9px, 0.9vw, 11px)",
              color: "#4ecdc4",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              padding: "10px 24px",
              border: "1px solid rgba(78,205,196,0.2)",
              textDecoration: "none",
              display: "inline-block",
              transition: "border-color 0.3s ease",
            }}
          >
            LINKEDIN →
          </a>
        </div>
      </div>
    </section>
  )
}

/* ─── PROJECTS ──────────────────────────────────────────── */

function ProjectModule({
  project,
  index,
}: {
  project: (typeof sampleProjects)[0]
  index: number
}) {
  const ref = useReveal(0.1)
  const [hovered, setHovered] = useState(false)

  const statusLabel =
    project.statusLabel ??
    (project.status === "in-progress" ? "CURRENT BUILD" :
    project.status === "deployed" ? "DEPLOYED" :
    project.status === "completed" ? "COMPLETED" :
    project.status === "academic-project" ? "ACADEMIC PROJECT" :
    project.status === "personal-project" ? "PERSONAL PROJECT" :
    project.status === "experiment" ? "EXPERIMENT" :
    project.status === "project" ? "PROJECT" :
    project.status.toUpperCase())

  const projectLinks = [
    project.github
      ? {
          label: "SOURCE",
          href: project.github,
          ariaLabel: `View ${project.name} source on GitHub`,
          primary: true,
        }
      : null,
    project.demo
      ? {
          label: "LIVE DEMO",
          href: project.demo,
          ariaLabel: `Open the ${project.name} live demo`,
          primary: false,
        }
      : null,
    project.release
      ? {
          label: "RELEASES",
          href: project.release,
          ariaLabel: `View ${project.name} releases`,
          primary: false,
        }
      : null,
  ].filter(
    (
      link,
    ): link is {
      label: string
      href: string
      ariaLabel: string
      primary: boolean
    } => Boolean(link),
  )

  return (
    <article
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`project-card${index === 0 ? " project-card-featured" : ""}${hovered ? " is-hovered" : ""}`}
      aria-labelledby={`project-${project.id}-title`}
    >
      <div className="project-card-header">
        <div className="project-card-identity">
          <div className="project-card-kicker">
            <span>PROJECT_{String(index + 1).padStart(2, "0")}</span>
            <span className="project-card-category">{project.category}</span>
          </div>
          <h3 id={`project-${project.id}-title`} className="project-card-title">
            {project.name}
          </h3>
        </div>
        <StatusBadge
          label={statusLabel}
          variant={project.status === "deployed" || project.status === "completed" ? "active" : "default"}
        />
      </div>

      <div className="project-card-body">
        <div className="project-card-problem">
          <span className="project-card-label">THE PROBLEM</span>
          <p>{project.shortDescription}</p>
        </div>

        <p className="project-card-description">{project.description}</p>

        <div className="project-card-details">
          <div className="project-card-capabilities">
            <div className="project-card-label">KEY CAPABILITIES</div>
            <ul>
              {project.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          </div>

          <div className="project-card-stack">
            <div className="project-card-label">STACK</div>
            <div className="project-stack-list">
              {project.technologies.map((technology) => (
                <span key={technology}>{technology}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="project-card-footer">
        <div className="project-card-proof">
          <span className="project-proof-dot" aria-hidden="true" />
          <span>REPOSITORY VERIFIED</span>
        </div>
        <div className="project-actions" role="group" aria-label={`${project.name} project links`}>
          {projectLinks.map((link) => (
            <a
              key={link.label}
              className={`project-action${link.primary ? " project-action-primary" : ""}`}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.ariaLabel}
            >
              {link.label} <span aria-hidden="true">↗</span>
            </a>
          ))}
        </div>
      </div>
    </article>
  )
}

export function ProjectsSection() {
  const ref = useReveal()

  return (
    <section ref={ref} id="projects" style={SECTION_STYLE}>
      <div style={{ ...INNER_STYLE, maxWidth: 1180 }}>
        <ModuleLabel number="02" title="PROJECT ENGINE" />
        <div className="projects-heading-row">
          <div>
            <SectionLabel>02 — PROJECTS</SectionLabel>
            <SectionTitle>PROJECT ENGINE</SectionTitle>
            <p className="projects-intro">
              Five focused builds across secure examination operations, offline systems, browser privacy, peer-to-peer communication, and explainable NLP.
            </p>
          </div>
          <div className="projects-summary" aria-label="Project collection summary">
            <div>
              <strong>05</strong>
              <span>BUILDS IN VIEW</span>
            </div>
            <div>
              <strong>04</strong>
              <span>DOMAINS</span>
            </div>
          </div>
        </div>

        <div className="projects-grid">
          {sampleProjects.map((project, i) => (
            <ProjectModule key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── SKILLS ─────────────────────────────────────────────── */

function SkillCategory({
  label,
  items,
  status,
}: {
  label: string
  items: string[]
  status?: "BUILDING" | "PRACTICING" | "LEARNING" | "EXPLORING"
}) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        marginBottom: 32,
        padding: "16px 20px",
        background: hovered ? "#12121b" : "transparent",
        border: `1px solid ${hovered ? "rgba(78,205,196,0.1)" : "transparent"}`,
        transition: "all 0.3s ease",
      }}
    >
      <div
        style={{
          fontFamily: MONO,
          fontSize: "clamp(8px, 0.85vw, 10px)",
          color: "#4ecdc4",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          marginBottom: 8,
        }}
      >
        {label}
      </div>
      {status && <StatusBadge label={status} variant={status === "BUILDING" ? "active" : "learning"} />}
      {items.map((item) => (
        <div
          key={item}
          style={{
            fontFamily: MONO,
            fontSize: "clamp(10px, 1vw, 13px)",
            color: "#777",
            padding: "5px 0",
            borderBottom: "1px solid rgba(255,255,255,0.03)",
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
      label: "SOFTWARE DEVELOPMENT",
      items: ["Python", "Java", "JavaScript", "TypeScript", "SQL"],
      status: "BUILDING" as const,
    },
    {
      label: "WEB DEVELOPMENT",
      items: ["React", "Next.js", "HTML", "CSS", "Tailwind CSS"],
      status: "BUILDING" as const,
    },
    {
      label: "AI / AUTOMATION",
      items: ["AI", "ML Concepts", "LLM Concepts", "Prompt Engineering", "Agentic AI", "Automation"],
      status: "EXPLORING" as const,
    },
    {
      label: "SOFTWARE TESTING / QA",
      items: ["Manual Testing", "Test Case Design", "Functional Testing", "Regression Testing", "UI Testing", "API Testing", "Bug Reporting"],
      status: "LEARNING" as const,
    },
    {
      label: "TOOLS / SYSTEMS",
      items: ["Git", "GitHub", "VS Code", "Linux", "Terminal", "Firebase", "Supabase", "Networking"],
      status: "PRACTICING" as const,
    },
    {
      label: "CREATIVE / INTERACTIVE",
      items: ["Three.js", "WebGL", "GSAP", "React Three Fiber", "GLTF"],
      status: "EXPLORING" as const,
    },
  ]

  return (
    <section ref={ref} id="skills-detail" style={SECTION_STYLE}>
      <div style={INNER_STYLE}>
        <ModuleLabel number="03" title="CAPABILITY MEMORY" />
        <SectionLabel>03 — SKILLS</SectionLabel>
        <SectionTitle>CAPABILITIES</SectionTitle>

        <div
          style={{
            marginTop: 48,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "clamp(16px, 2vw, 32px)",
          }}
        >
          {groups.map((group) => (
            <SkillCategory key={group.label} {...group} />
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── QA ─────────────────────────────────────────────────── */

export function QASection() {
  const ref = useReveal()
  return (
    <section ref={ref} id="qa" style={SECTION_STYLE}>
      <div style={INNER_STYLE}>
        <ModuleLabel number="04" title="QUALITY ASSURANCE" />
        <SectionLabel>04 — SOFTWARE TESTING / QA</SectionLabel>
        <SectionTitle>QA CAPABILITY</SectionTitle>

        <div
          style={{
            marginTop: 16,
            fontFamily: MONO,
            fontSize: "clamp(9px, 0.9vw, 11px)",
            color: "#4ecdc4",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
          }}
        >
          BUILD → TEST → BREAK → FIX → VERIFY
        </div>

        <StatusBadge label="CURRENTLY LEARNING" variant="learning" />

        <div
          style={{
            marginTop: 32,
            fontFamily: SANS,
            fontSize: "clamp(11px, 1.2vw, 15px)",
            color: "#999",
            lineHeight: 1.8,
            maxWidth: 700,
          }}
        >
          Actively learning software testing methodologies and practices. Building
          an understanding of how to design effective test cases, identify bugs
          systematically, and ensure software quality across web applications and
          AI-powered systems.
        </div>

        {/* Testing workflow visualization */}
        <div style={{ marginTop: 48 }}>
          <div
            style={{
              fontFamily: MONO,
              fontSize: "clamp(7px, 0.7vw, 9px)",
              color: "#4ecdc4",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              marginBottom: 20,
            }}
          >
            TEST WORKFLOW
          </div>
          <div
            style={{
              display: "flex",
              gap: 0,
              flexWrap: "wrap",
              alignItems: "stretch",
            }}
          >
            {[
              { step: "TEST CASE", desc: "Define expected behavior" },
              { step: "EXECUTE", desc: "Run against the system" },
              { step: "COMPARE", desc: "Expected vs actual output" },
              { step: "REPORT", desc: "Document the bug" },
              { step: "FIX", desc: "Resolve the issue" },
              { step: "VERIFY", desc: "Confirm the fix works" },
            ].map((item, i, arr) => (
              <div
                key={item.step}
                style={{
                  flex: "1 1 120px",
                  padding: "16px 12px",
                  borderRight: i < arr.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    fontFamily: MONO,
                    fontSize: "clamp(7px, 0.7vw, 8px)",
                    color: "#4ecdc4",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    marginBottom: 6,
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div
                  style={{
                    fontFamily: MONO,
                    fontSize: "clamp(8px, 0.85vw, 10px)",
                    color: "#ccc",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    marginBottom: 4,
                  }}
                >
                  {item.step}
                </div>
                <div
                  style={{
                    fontFamily: SANS,
                    fontSize: "clamp(8px, 0.8vw, 10px)",
                    color: "#555",
                    lineHeight: 1.4,
                  }}
                >
                  {item.desc}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Testing concepts */}
        <div style={{ marginTop: 48 }}>
          <div
            style={{
              fontFamily: MONO,
              fontSize: "clamp(7px, 0.7vw, 9px)",
              color: "#4ecdc4",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              marginBottom: 16,
            }}
          >
            TESTING CONCEPTS
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
              gap: 10,
            }}
          >
            {[
              "Test Case Design",
              "Positive / Negative Testing",
              "Functional Testing",
              "Regression Testing",
              "UI Testing",
              "API Testing",
              "Bug Reporting",
              "Boundary-Value Testing",
              "Exploratory Testing",
              "Requirement-Based Testing",
            ].map((item) => (
              <div
                key={item}
                style={{
                  fontFamily: MONO,
                  fontSize: "clamp(9px, 0.9vw, 11px)",
                  color: "#777",
                  padding: "8px 12px",
                  border: "1px solid rgba(255,255,255,0.04)",
                  background: "#0c0c14",
                  letterSpacing: "0.03em",
                }}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── HOW I WORK ─────────────────────────────────────────── */

export function HowIWorkSection() {
  const ref = useReveal()
  return (
    <section ref={ref} style={SECTION_STYLE}>
      <div style={INNER_STYLE}>
        <SectionLabel>PROCESS</SectionLabel>
        <SectionTitle style={{ fontSize: "clamp(18px, 2.5vw, 32px)" }}>
          HOW I WORK
        </SectionTitle>

        <div
          style={{
            marginTop: 40,
            display: "flex",
            gap: 0,
            flexWrap: "wrap",
            alignItems: "stretch",
          }}
        >
          {[
            { num: "01", label: "IDEATE", desc: "Define the problem and plan the approach" },
            { num: "02", label: "BUILD", desc: "Write code and create the system" },
            { num: "03", label: "TEST", desc: "Verify functionality and catch bugs" },
            { num: "04", label: "DEBUG", desc: "Identify root causes and fix issues" },
            { num: "05", label: "ITERATE", desc: "Refine based on testing and feedback" },
            { num: "06", label: "SHIP", desc: "Package, deploy or present the working result" },
          ].map((step, i, arr) => (
            <div
              key={step.label}
              style={{
                flex: "1 1 130px",
                padding: "20px 16px",
                borderRight: i < arr.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none",
                textAlign: "center",
                position: "relative",
              }}
            >
              <div
                style={{
                  fontFamily: MONO,
                  fontSize: "clamp(14px, 1.8vw, 22px)",
                  color: "#4ecdc4",
                  letterSpacing: "0.05em",
                  fontWeight: 300,
                  marginBottom: 8,
                }}
              >
                {step.num}
              </div>
              <div
                style={{
                  fontFamily: MONO,
                  fontSize: "clamp(9px, 0.9vw, 11px)",
                  color: "#ccc",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  marginBottom: 6,
                }}
              >
                {step.label}
              </div>
              <div
                style={{
                  fontFamily: SANS,
                  fontSize: "clamp(8px, 0.8vw, 10px)",
                  color: "#555",
                  lineHeight: 1.5,
                }}
              >
                {step.desc}
              </div>
              {i < arr.length - 1 && (
                <div
                  style={{
                    position: "absolute",
                    right: -6,
                    top: "50%",
                    transform: "translateY(-50%)",
                    fontFamily: MONO,
                    fontSize: "clamp(8px, 0.8vw, 10px)",
                    color: "#333",
                    zIndex: 1,
                  }}
                >
                  →
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── EDUCATION ──────────────────────────────────────────── */

export function EducationSection() {
  const ref = useReveal()
  return (
    <section ref={ref} id="education" style={SECTION_STYLE}>
      <div style={INNER_STYLE}>
        <ModuleLabel number="05" title="FOUNDATION" />
        <SectionLabel>05 — EDUCATION</SectionLabel>
        <SectionTitle>EDUCATION</SectionTitle>

        <div style={{ marginTop: 48 }}>
          {educationData.map((edu) => {
            const isPursuing = edu.status === "Currently Pursuing"
            return (
              <div
                key={edu.id}
                style={{
                  border: "1px solid rgba(255,255,255,0.04)",
                  padding: "clamp(24px, 3vw, 40px)",
                  background: "#0c0c14",
                  marginBottom: 24,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    flexWrap: "wrap",
                    gap: 12,
                    marginBottom: 16,
                  }}
                >
                  <div
                    style={{
                      fontFamily: MONO,
                      fontSize: "clamp(7px, 0.7vw, 9px)",
                      color: "#444",
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                    }}
                  >
                    {edu.startDate} — {edu.endDate}
                  </div>
                  <StatusBadge
                    label={isPursuing ? "CURRENTLY PURSUING" : "COMPLETED"}
                    variant={isPursuing ? "active" : "default"}
                  />
                </div>

                <div
                  style={{
                    fontFamily: MONO,
                    fontSize: "clamp(14px, 1.8vw, 24px)",
                    color: "#fff",
                    letterSpacing: "0.05em",
                    textTransform: "uppercase",
                    fontWeight: 300,
                  }}
                >
                  {edu.degree}
                </div>

                <div
                  style={{
                    fontFamily: MONO,
                    fontSize: "clamp(10px, 1vw, 13px)",
                    color: "#4ecdc4",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    marginTop: 8,
                  }}
                >
                  {edu.institution}
                </div>

                {edu.location && (
                  <div
                    style={{
                      fontFamily: MONO,
                      fontSize: "clamp(8px, 0.8vw, 10px)",
                      color: "#555",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      marginTop: 6,
                    }}
                  >
                    {edu.location}
                  </div>
                )}

                <div
                  style={{
                    fontFamily: SANS,
                    fontSize: "clamp(10px, 1vw, 13px)",
                    color: "#666",
                    lineHeight: 1.8,
                    marginTop: 16,
                  }}
                >
                  {edu.description}
                </div>

                {edu.coursework.length > 0 && (
                  <div style={{ marginTop: 24 }}>
                    <div
                      style={{
                        fontFamily: MONO,
                        fontSize: "clamp(7px, 0.7vw, 9px)",
                        color: "#4ecdc4",
                        letterSpacing: "0.2em",
                        textTransform: "uppercase",
                        marginBottom: 12,
                      }}
                    >
                      RELEVANT AREAS
                    </div>
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                      {edu.coursework.map((c) => (
                        <span
                          key={c}
                          style={{
                            fontFamily: MONO,
                            fontSize: "clamp(8px, 0.8vw, 10px)",
                            color: "#666",
                            padding: "4px 10px",
                            border: "1px solid rgba(255,255,255,0.06)",
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
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ─── BUILDING EXPERIENCE ────────────────────────────────── */

export function BuildingExperienceSection() {
  const ref = useReveal()
  return (
    <section ref={ref} style={SECTION_STYLE}>
      <div style={INNER_STYLE}>
        <SectionLabel>BUILDING EXPERIENCE</SectionLabel>
        <SectionTitle style={{ fontSize: "clamp(18px, 2.5vw, 32px)" }}>
          BUILDING EXPERIENCE
        </SectionTitle>

        <div
          style={{
            marginTop: 20,
            fontFamily: SANS,
            fontSize: "clamp(10px, 1.1vw, 14px)",
            color: "#666",
            lineHeight: 1.8,
            maxWidth: 700,
          }}
        >
          Currently building practical experience through hands-on projects, technical exploration, and self-directed learning across software development, QA/testing, and AI/automation.
        </div>

        <div
          style={{
            marginTop: 32,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: 12,
          }}
        >
          {[
            { area: "PROJECT DEVELOPMENT", desc: "Hands-on software projects" },
            { area: "AI / AUTOMATION", desc: "Exploring AI tools, workflows and agentic systems" },
            { area: "SOFTWARE TESTING PRACTICE", desc: "Learning test design and QA methods" },
            { area: "TECHNICAL EXPLORATION", desc: "Experimenting with new technologies and development patterns" },
            { area: "SYSTEM DESIGN THINKING", desc: "Learning architecture, debugging and engineering tradeoffs" },
          ].map((item) => (
            <div
              key={item.area}
              style={{
                border: "1px solid rgba(255,255,255,0.04)",
                padding: "16px 20px",
                background: "#0c0c14",
              }}
            >
              <div
                style={{
                  fontFamily: MONO,
                  fontSize: "clamp(8px, 0.85vw, 10px)",
                  color: "#4ecdc4",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  marginBottom: 6,
                }}
              >
                {item.area}
              </div>
              <div
                style={{
                  fontFamily: SANS,
                  fontSize: "clamp(9px, 0.9vw, 11px)",
                  color: "#555",
                  lineHeight: 1.5,
                }}
              >
                {item.desc}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── CONTACT ────────────────────────────────────────────── */

export function ContactSection() {
  const ref = useReveal()
  return (
    <section ref={ref} id="contact" style={SECTION_STYLE}>
      <div style={INNER_STYLE}>
        <ModuleLabel number="06" title="COMMUNICATION" />
        <SectionLabel>06 — CONTACT</SectionLabel>
        <SectionTitle>GET IN TOUCH</SectionTitle>

        <div
          style={{
            marginTop: 20,
            fontFamily: SANS,
            fontSize: "clamp(11px, 1.2vw, 15px)",
            color: "#999",
            lineHeight: 1.8,
            marginBottom: 40,
            maxWidth: 700,
          }}
        >
          Open to internships, software development opportunities, QA/testing
          roles, AI/automation projects and technical collaborations.
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 0,
          }}
        >
          {[
            { label: "GITHUB", href: profileData.social.github, external: true },
            { label: "LINKEDIN", href: profileData.social.linkedin, external: true },
            { label: "INSTAGRAM", href: profileData.social.instagram, external: true },
            { label: "EMAIL", href: `mailto:${profileData.social.email}`, external: false },
            { label: "PHONE", href: `tel:+91${profileData.social.phone}`, external: false },
          ].filter((l) => l.href).map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noopener noreferrer" : undefined}
              style={{
                fontFamily: MONO,
                fontSize: "clamp(10px, 1vw, 13px)",
                color: "#4ecdc4",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                padding: "14px 0",
                borderBottom: "1px solid rgba(255,255,255,0.04)",
                display: "block",
                textDecoration: "none",
                transition: "color 0.3s ease, padding-left 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.paddingLeft = "8px"
                e.currentTarget.style.color = "#6ff5ec"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.paddingLeft = "0"
                e.currentTarget.style.color = "#4ecdc4"
              }}
            >
              {link.label} →
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── FINAL ──────────────────────────────────────────────── */

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
            fontFamily: MONO,
            fontSize: "clamp(14px, 2vw, 24px)",
            color: "#fff",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
          }}
        >
          LET&apos;S BUILD SOMETHING USEFUL.
        </div>

        {/* OPEN TO tags */}
        <div
          style={{
            marginTop: 24,
            display: "flex",
            gap: 10,
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          {[
            "Software Development Internships",
            "QA / Testing Internships",
            "AI / Automation Opportunities",
          ].map((item) => (
            <span
              key={item}
              style={{
                fontFamily: MONO,
                fontSize: "clamp(7px, 0.7vw, 9px)",
                color: "#666",
                padding: "4px 12px",
                border: "1px solid rgba(255,255,255,0.06)",
                letterSpacing: "0.05em",
              }}
            >
              {item}
            </span>
          ))}
        </div>

        <div
          style={{
            marginTop: 40,
            display: "flex",
            gap: 16,
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <a
            href={profileData.social.github}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: MONO,
              fontSize: "clamp(8px, 0.8vw, 10px)",
              color: "#4ecdc4",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              border: "1px solid rgba(78,205,196,0.2)",
              padding: "8px 20px",
              textDecoration: "none",
              transition: "border-color 0.3s ease",
            }}
          >
            GITHUB
          </a>
          <a
            href={profileData.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: MONO,
              fontSize: "clamp(8px, 0.8vw, 10px)",
              color: "#4ecdc4",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              border: "1px solid rgba(78,205,196,0.2)",
              padding: "8px 20px",
              textDecoration: "none",
              transition: "border-color 0.3s ease",
            }}
          >
            LINKEDIN
          </a>
          <a
            href={profileData.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: MONO,
              fontSize: "clamp(8px, 0.8vw, 10px)",
              color: "#4ecdc4",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              border: "1px solid rgba(78,205,196,0.2)",
              padding: "8px 20px",
              textDecoration: "none",
              transition: "border-color 0.3s ease",
            }}
          >
            INSTAGRAM
          </a>
          <a
            href={`mailto:${profileData.social.email}`}
            style={{
              fontFamily: MONO,
              fontSize: "clamp(8px, 0.8vw, 10px)",
              color: "#4ecdc4",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              border: "1px solid rgba(78,205,196,0.2)",
              padding: "8px 20px",
              textDecoration: "none",
              transition: "border-color 0.3s ease",
            }}
          >
            EMAIL
          </a>
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

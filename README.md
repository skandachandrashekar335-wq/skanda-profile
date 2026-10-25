# SKANDA.EXE — Cinematic Developer Portfolio

> An interactive developer CV and engineering portfolio presented through a cinematic, scroll-driven computer system interface.

[![Production Deployment](https://img.shields.io/badge/Production-Live-success?style=flat-square&logo=vercel)](https://skandachandrashekar.vercel.app/)
[![Next.js](https://img.shields.io/badge/Next.js-16.3.4-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.8-blue?style=flat-square&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.x-38bdf8?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)

**Production Website:** [https://skandachandrashekar.vercel.app/](https://skandachandrashekar.vercel.app/)  


---

## Table of Contents

- [Overview](#overview)
- [Experience Flow](#experience-flow)
- [Features](#features)
- [Projects](#projects)
- [Technology Stack](#technology-stack)
- [Repository Structure](#repository-structure)
- [Getting Started](#getting-started)
- [Assets and Licensing](#assets-and-licensing)
- [Deployment](#deployment)
- [Accessibility, Performance & Limitations](#accessibility-performance--limitations)
- [Contributing & License](#contributing--license)

---

## Overview

**SKANDA.EXE** transforms the conventional static portfolio into an interactive, system-inspection experience. Using a computer workstation as the core visual metaphor, hardware components correspond directly to technical capabilities:
- **Monitor:** Identity & Overview
- **CPU:** Academic Foundation & CS Fundamentals
- **GPU:** Project Showcase & Execution Engine
- **RAM:** Capability Memory & Skills
- **NVMe:** Engineering Experience & System Builds
- **Motherboard:** Technical Ecosystem & Architecture
- **PSU:** Current Progress & Status
- **Keyboard:** Communication & Contact Channels

The interface combines high-performance scroll interpolation, monospace system typography, and responsive layouts designed for both desktop workstations and mobile devices.

---

## Experience Flow

The visitor navigates the portfolio through an interconnected sequence:

1. **Title Sequence (`CVIntro`):** Minimalist headline screen displaying developer identity, credentials, and location with scroll initiation indicator.
2. **Disassembly Cinematic (`SkillMapSection`):** A 120-frame scroll-driven canvas sequence disassembling a workstation in direct sync with scroll progress, accompanied by phased skill telemetry overlays.
3. **Identity Core (`AboutSection`):** High-level summary of background, focus areas, and technical objectives.
4. **Project Showcase (`ProjectsSection`):** Five production-tested and working projects rendered with technical architecture tags, capabilities, and direct links.
5. **Technical Capabilities (`SkillsSection`):** Detailed breakdown across Programming, Web Development, AI / Automation, Software Testing / QA, Developer Tools, and Creative Tech.
6. **Quality Assurance (`QASection`):** Structured overview of testing methodologies, defect lifecycles, and verification standards.
7. **Execution Philosophy (`HowIWorkSection`):** Engineering principles governing planning, testing, and continuous delivery.
8. **Academic Foundation (`EducationSection`):** BCA curriculum, coursework focus, and foundational CS studies.
9. **Build Experience (`BuildingExperienceSection`):** Real-world engineering journey, timeline milestones, and production releases.
10. **Open Channel (`ContactSection`):** Direct communication links (GitHub, LinkedIn, Instagram, Email, Phone).
11. **System Online (`FinalSection`):** Terminal-inspired footer concluding the session.

---

## Features

- **Scroll-Synchronized Cinematic Engine:** Single `<canvas>` renderer mapping scroll position to 120 pre-rendered WebP frames with sub-frame interpolation.
- **Dynamic Project Modules:** Featured layout structure highlighting primary projects, problem statements, capabilities, tech stacks, and live access links.
- **Adaptive Navigation:** Fixed vertical sidebar navigation on desktop viewports and persistent bottom navigation bar on mobile screens.
- **Accessibility & Motion Preference:** Native support for `prefers-reduced-motion`, automatically bypassing intensive canvas scrub animations for an instant, accessible static render.
- **Zero-Hydration Mismatch Architecture:** Tailored Next.js SSR layout configuration with `suppressHydrationWarning` and safe client mounting.

---

## Projects

The portfolio showcases five curated software builds in exact order:

### 1. ExamGuard
- **Category:** `AI / SECURITY`
- **Status:** MVP IN PROGRESS
- **Description:** Examination management and identity verification system designed for secure examination hall entry. Integrates candidate registrations, hall tickets, dynamic seating layouts, invigilator workflows, and webcam-based face verification with liveness checking into a unified audit trail.
- **Key Capabilities:**
  - Role-based operational access for administrators, coordinators, and invigilators
  - Hall ticket generation, seating allocation, and attendance tracking workflows
  - Browser-based webcam identity verification with liveness and face-match evidence
  - Persisted audit records, structured decision histories, and typed failure state handling
- **Technology Stack:** Next.js, TypeScript, Python, FastAPI, PostgreSQL, Firebase, Cloudinary
- **Links:**
  - Source: [GitHub Repository](https://github.com/skandachandrashekar335-wq/ExamGuard)
  - Live Demo: [exam-guardian-management.vercel.app](https://exam-guardian-management.vercel.app)

---

### 2. SubstiFlow
- **Category:** `DESKTOP / SYSTEMS`
- **Status:** DESKTOP BUILD
- **Description:** Offline desktop application for college timetable coordination and faculty substitution management. Eliminates spreadsheet conflicts by calculating deterministic substitute recommendations against hard constraints without altering master schedule records.
- **Key Capabilities:**
  - Bounded timetable generation with conflict diagnosis and constraint validation
  - Deterministic faculty substitution engine with explainable constraint scoring
  - Coordinator review, locking, approval workflows, and immutable substitution audit logs
  - Local-first SQLite database architecture with portable data backups and exports
- **Technology Stack:** Electron, React, TypeScript, SQLite, Vite, Vitest
- **Links:**
  - Source: [GitHub Repository](https://github.com/skandachandrashekar335-wq/SUBSTIFLOW)

---

### 3. Anomoly Chat
- **Category:** `WEBRTC / PRIVACY`
- **Status:** LIVE DEMO
- **Description:** Accountless peer-to-peer browser chat and document transfer application operating over direct WebRTC data channels. Operates in-memory with cryptographic integrity checks and strict session expiry.
- **Key Capabilities:**
  - Ephemeral chat rooms created on-demand with QR codes and invitation links
  - Peer-to-peer messaging bypassing central storage via `RTCDataChannel`
  - Chunked binary document transfer (up to 10 MiB in 16 KiB chunks)
  - SHA-256 binary integrity verification and scheduled session disposal
- **Technology Stack:** HTML5, CSS3, JavaScript, WebRTC, PeerJS, Web Crypto API
- **Links:**
  - Source: [GitHub Repository](https://github.com/skandachandrashekar335-wq/anomoly-chat)
  - Live Demo: [anomoly-chat.vercel.app](https://anomoly-chat.vercel.app)

---

### 4. What's Not Up
- **Category:** `BROWSER SECURITY`
- **Status:** RELEASED EXTENSION
- **Description:** Manifest V3 browser extension providing local visual privacy controls for WhatsApp Web and Instagram. Hides sensitive information rendered in the DOM to protect against shoulder surfing in public and shared environments.
- **Key Capabilities:**
  - Independent blur and obfuscation toggles for messages, contact names, media, and avatars
  - Dynamic `MutationObserver` system adapting instantly to real-time chat updates
  - Hover peek, temporary click reveals, and instant global Panic Lock shortcut
  - Zero external network requests with local browser storage persistence
- **Technology Stack:** TypeScript, React, Manifest V3, Webpack, Chromium Extension APIs, Vitest
- **Links:**
  - Source: [GitHub Repository](https://github.com/skandachandrashekar335-wq/What-s-Not-Up)
  - Release Package: [GitHub Releases](https://github.com/skandachandrashekar335-wq/What-s-Not-Up/releases)

---

### 5. DSCASC AI
- **Category:** `EXPLAINABLE NLP`
- **Status:** ACADEMIC MVP
- **Description:** Academic student guidance assistant built around an explainable NLP pipeline. Handles college admissions, academic schedules, campus services, and placement FAQs with deterministic scoring and confidence thresholds.
- **Key Capabilities:**
  - 40+ curated domain intents covering college admissions and academic procedures
  - Rule-based query normalization handling common typos and student shorthands
  - Transparent TF-IDF vectorization and cosine similarity score inspection
  - Fallback triggers routing low-confidence queries away from ungrounded hallucinations
- **Technology Stack:** Next.js, React, TypeScript, TF-IDF, Cosine Similarity, Vitest
- **Links:**
  - Source: [GitHub Repository](https://github.com/skandachandrashekar335-wq/dscasc-ai)

---

## Technology Stack

### Active Core Runtime

| Component | Specification | Function |
|---|---|---|
| **Framework** | Next.js 16.3.4 (App Router) | Server-side rendering, static generation, routing |
| **UI Library** | React 19.2.8 | Declarative component hierarchy and hooks |
| **Language** | TypeScript 5.9.3 | Type checking across all components, configs, and models |
| **Build System** | Next.js Webpack (`--webpack`) | Production asset bundling and chunk optimization |
| **Styling** | Tailwind CSS 4.x + PostCSS | Utility layout classes and custom responsive CSS |
| **Typography** | Geist & Geist Mono (`next/font`) | Variable monospace and sans-serif fonts |

### Preserved 3D & Animation Modules

The repository retains several modular 3D utilities in `src/components/3d/` and animation hooks for future Three.js enhancements:
- `Three.js` & `@react-three/fiber` / `@react-three/drei`: Preserved 3D rendering pipeline.
- `GSAP`: Advanced tweening library installed for upcoming component interactions.
- `Lenis`: Smooth scroll provider preserved in `src/components/LenisScroll.tsx`.

*Note: The primary cinematic intro currently utilizes the deterministic 2D canvas WebP sequence (`ScrollFrameSequence.tsx`) for guaranteed cross-device performance and minimal initial load time.*

---

## Repository Structure

```
skanda-profile/
├── public/                              # Static public assets
│   ├── assets/                          # Retained 3D CAD assets
│   │   └── computer/
│   │       ├── computer.glb             # Preserved 3D model (~71 MB, excluded from deployment)
│   │       ├── license.txt              # CC-BY-4.0 attribution notice
│   │       ├── scene.bin                # Model binary buffer
│   │       ├── scene.gltf               # Model scene descriptor
│   │       └── textures/                # Model PBR textures
│   ├── frames/                          # 120 cinematic animation frames
│   │   ├── frame_0000.webp              # Initial assembled workstation state
│   │   ├── ...
│   │   └── frame_0119.webp              # Fully exploded workstation state
│   ├── file.svg
│   ├── globe.svg
│   ├── next.svg
│   ├── vercel.svg
│   └── window.svg
├── scripts/                             # Utility scripts
│   └── inspect-glb.js                   # Node.js tool to inspect GLTF/GLB structures
├── src/
│   ├── app/
│   │   ├── favicon.ico                  # Site favicon
│   │   ├── globals.css                  # Global styles, projects grid, animations
│   │   ├── layout.tsx                   # HTML shell, metadata, and font definitions
│   │   └── page.tsx                     # Top-level page assembly
│   ├── components/
│   │   ├── 3d/                          # Preserved Three.js controllers and loaders
│   │   │   ├── CinematicController.tsx
│   │   │   └── ComputerGLB.tsx
│   │   ├── animation/                   # Active cinematic canvas & intro components
│   │   │   ├── CVIntro.tsx
│   │   │   ├── ScrollFrameSequence.tsx
│   │   │   └── SkillMapSection.tsx
│   │   ├── portfolio/                   # Core portfolio sections and navigation
│   │   │   ├── CinematicTransition.tsx
│   │   │   ├── Navigation.tsx
│   │   │   └── PortfolioSections.tsx
│   │   └── LenisScroll.tsx              # Preserved smooth-scroll component
│   ├── config/
│   │   └── computer-mapping.ts          # Hardware-to-portfolio section mappings
│   ├── data/                            # Curated data sources
│   │   ├── education/                   # Degree and coursework details
│   │   ├── profile/                     # Developer identity and bio
│   │   └── projects/                    # Five approved project records
│   ├── lib/
│   │   └── lenis-hook.ts                # Scroll integration utilities
│   └── types/
│       └── portfolio-types.ts           # Portfolio TypeScript interface definitions
├── .gitignore                           # Git ignore rules
├── .vercelignore                        # Vercel deployment exclusions
├── AGENTS.md                            # Next.js agent instruction guidelines
├── CLAUDE.md                            # Agent workspace reference
├── eslint.config.mjs                    # ESLint 9 configuration with Next.js core vitals
├── next.config.ts                       # Next.js runtime configuration
├── package-lock.json                    # Deterministic dependency lockfile
├── package.json                         # Project scripts and dependencies
├── postcss.config.mjs                   # PostCSS configuration for Tailwind 4
├── README.md                            # Comprehensive project documentation
└── tsconfig.json                        # TypeScript compiler options and path aliases
```

---

## Getting Started

### Prerequisites

- **Node.js:** Node.js 20.x or 24.x recommended
- **npm:** npm 10.x or higher

### Installation

Clone the repository and install dependencies using the deterministic lockfile:

```bash
git clone https://github.com/skandachandrashekar335-wq/skanda-profile.git
cd skanda-profile
npm ci
```

### Development Server

Start the local development server with Webpack:

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the application.

### Verification Commands

Execute the exact test and validation pipeline:

```bash
# 1. Typecheck TypeScript sources without emitting files
npx tsc --noEmit

# 2. Lint codebase with ESLint
npm run lint

# 3. Create optimized production build
npm run build

# 4. Preview production build locally
npm run start
```

---

## Assets and Licensing

### Cinematic WebP Frames
The 120 animation frames located in `public/frames/` (`frame_0000.webp` through `frame_0119.webp`) are pre-rendered at 1280x720. They are optimized for rapid asynchronous caching and smooth canvas scrubbing.

### 3D Workstation Model
The file `public/assets/computer/computer.glb` (~71 MB) represents an OMEN Gaming PC 3D model:
- **Source:** [OMEN Gaming PC (low-poly)](https://sketchfab.com/3d-models/omen-gaming-pc-low-poly-85990cd63b63444381cb7ef62a360789) by **LagzDesign**
- **License:** [Creative Commons Attribution 4.0 International (CC-BY 4.0)](http://creativecommons.org/licenses/by/4.0/)
- **Attribution Notice:** Maintained in `public/assets/computer/license.txt`.
- **Deployment Behavior:** The GLB asset is retained in Git for future 3D modeling and development, but explicitly excluded from production Vercel builds via `.vercelignore` to optimize build upload speed and adhere to serverless function size limits.

---

## Deployment

The project is continuously deployed to **Vercel** connected directly to the GitHub repository.

- **Production Domain:** [https://skandachandrashekar.vercel.app/](https://skandachandrashekar.vercel.app/)
- **Vercel Project Name:** `skandachandrashekar`
- **Vercel Project ID:** `prj_M5RR7YsJn2Bv5qrLf0hBc9VTQ3fg`
- **Root Directory:** Set to repository root (`.`)
- **Build Command:** `next build --webpack` (configured via `package.json`)
- **Output Directory:** Default Next.js (`.next`)

### Continuous Deployment Flow
Pushes to the `main` branch automatically trigger Vercel production deployments. The Vercel build environment clones the repository root, installs locked packages via `npm install`, runs `npm run build`, and aliases the resulting build to `skandachandrashekar.vercel.app`.

---

## Accessibility, Performance & Limitations

### Accessibility (a11y)
- **Reduced Motion Support:** Components check `window.matchMedia("(prefers-reduced-motion: reduce)")`. When active, canvas scrubbing is replaced with a static initial frame render, and smooth scroll transitions are suppressed.
- **Semantic Structure:** Sections leverage native HTML `<section>`, `<article>`, `<header>`, and `<nav>` semantics. All external actions provide explicit `aria-label` tags and visible focus rings.
- **Contrast & Hierarchy:** Dark palette (`#07070b` and `#0d0e14`) paired with high-contrast text (`#f3f5f4`) and teal focus accents (`#4ecdc4`).

### Performance Optimizations
- **Canvas DPR Capping:** Canvas backing store dimensions scale with device pixel ratio capped at `2.0` to preserve GPU bandwidth on ultra-high-DPI screens.
- **Scroll Isolation:** Scroll handlers employ passive event listeners (`{ passive: true }`), storing coordinates in mutable React refs rather than component state to prevent unnecessary rerender cycles.
- **Intersection Observers:** Off-screen portfolio sections mount their visual animations only when intersecting the active viewport.

### Current Limitations
- The cinematic sequence requires modern browser WebP and HTML5 Canvas support.
- 3D Three.js components exist in a preserved, dormant state and are not loaded into the main rendering tree.

---

## Contributing & License

### Reporting Issues
Feedback, corrections, and issue reports can be opened directly on the [GitHub Issues tracker](https://github.com/skandachandrashekar335-wq/skanda-profile/issues).

### License
The source code of the portfolio application is personal intellectual property with all rights reserved unless explicitly stated. The 3D model asset in `public/assets/computer/` is licensed under [CC-BY 4.0](http://creativecommons.org/licenses/by/4.0/) by LagzDesign.

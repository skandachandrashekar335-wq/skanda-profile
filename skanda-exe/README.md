# SKANDA.EXE

**Interactive developer CV presented through a cinematic, scroll-driven computer-system interface.**

[![Deployed on Vercel](https://img.shields.io/badge/Deployed-Vercel-black?style=flat-square&logo=vercel)](https://skandachandrashekar.vercel.app)
[![Next.js](https://img.shields.io/badge/Next.js-16.3-black?style=flat-square&logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-black?style=flat-square&logo=typescript)](https://www.typescriptlang.org)
[![React](https://img.shields.io/badge/React-19-black?style=flat-square&logo=react)](https://react.dev)

> **Live:** [skandachandrashekar.vercel.app](https://skandachandrashekar.vercel.app)

---

## Overview

SKANDA.EXE is not a conventional static portfolio. It is an experimental, cinematic developer CV where the portfolio experience is presented through a computer-system-inspired interface. The site treats a computer as the visual metaphor for a developer's skills and technical ecosystem — hardware components represent capabilities, and a scroll-driven cinematic sequence makes the portfolio feel like an interactive system being inspected and initialized.

The project is built with Next.js 16, React 19, TypeScript, and Tailwind CSS 4. It uses a canvas-based WebP frame sequence for its cinematic animation and inline styles for the portfolio sections.

---

## Experience

The user journey through the site follows this sequence:

| Step | Section | Description |
|------|---------|-------------|
| 1 | **SKANDA C.V.** | Opening title screen — full viewport, static display. The user sees "SKANDA C.V." centered on a black background. |
| 2 | **Scroll** | User scrolls down. The title fades and translates upward. |
| 3 | **SKILL MAP** | The cinematic begins. "SYSTEM.CAPABILITIES / SKILL MAP" heading fades in. |
| 4 | **Cinematic Sequence** | A 120-frame computer disassembly animation plays, controlled entirely by scroll position. Scrolling down progresses forward. Scrolling up reverses the sequence. |
| 5 | **Skill Overlays** | As the cinematic progresses, six skill category labels appear on the right side of the screen at defined scroll thresholds. |
| 6 | **SYSTEM ONLINE** | The cinematic reaches its fully exploded state. The system is "online." |
| 7 | **IDENTITY** | Portfolio sections begin. Name, role, bio, and education summary. |
| 8 | **PROJECTS** | Seven verified project modules with status, technologies, progress, and features. |
| 9 | **SKILLS** | Detailed skill grid across six categories plus a "Learning.Log" showing current exploration areas. |
| 10 | **EDUCATION** | BCA degree details and coursework. |
| 11 | **TECH ECOSYSTEM** | A tree-style visualization of the full technology stack. |
| 12 | **ACHIEVEMENTS** | Project completions and learning milestones. |
| 13 | **CONTACT** | GitHub, LinkedIn, Instagram, email, and phone links. |
| 14 | **FINAL** | Closing screen — "SKANDA.EXE / SYSTEM ONLINE / BUILD. EXPLORE. EXPERIMENT." |

---

## Cinematic Scroll System

The cinematic animation is the core visual feature. It uses a pre-rendered WebP image sequence displayed on a single HTML canvas, with the scroll position mapped to frame indices.

### How It Works

- **120 frames** stored as individual WebP files in `public/frames/`
- Frames are named `frame_0000.webp` through `frame_0119.webp`
- Each frame is 1280x720 WebP, extracted from a 10-second 24 FPS source video
- The animation container uses `500vh` of scroll height with a `sticky` canvas viewport
- Scroll progress (0 to 1) maps linearly to frame index (0 to 119)
- Scrolling down advances the animation; scrolling up reverses it

### Implementation Details

The frame sequence renderer (`src/components/animation/ScrollFrameSequence.tsx`) uses:

- **Single HTML canvas** — one `<canvas>` element, no DOM manipulation per frame
- **WebP image sequence** — 120 individual images, not HTML video
- **Asynchronous preloading** — all 120 images are loaded via `new Image()` on mount, with progress tracking
- **`requestAnimationFrame` render loop** — smooth rendering without blocking the main thread
- **Scroll-to-frame mapping** — `passive` scroll listener maps scroll position to target frame index
- **Frame interpolation** — the render loop steps one frame at a time toward the target, preventing jumps
- **Device pixel ratio handling** — canvas backing store scales with DPR (capped at 2) for sharp rendering on Retina displays
- **Contain algorithm** — draws the full source frame without cropping, with letterboxing/pillarboxing as needed
- **Responsive canvas sizing** — canvas dimensions recalculate on window resize
- **`prefers-reduced-motion` support** — users with reduced motion preference see only the first frame
- **Cleanup** — event listeners and animation frames are properly cleaned up on unmount

### What It Does NOT Use

- HTML `<video>` element
- 120 visible `<img>` elements in the DOM
- Three.js or WebGL for the frame animation
- Any autoplay or timer-based transitions

---

## Features

- **Scroll-controlled cinematic** — the 120-frame computer disassembly sequence is driven entirely by scroll position
- **Interactive skill overlay** — six skill categories appear progressively during the cinematic
- **Responsive navigation** — fixed sidebar on desktop, fixed bottom bar on mobile
- **Scroll-reveal animations** — portfolio sections fade in on scroll via IntersectionObserver
- **System-themed UI** — all sections use system/terminal-inspired labels (SYSTEM.IDENTITY, SYSTEM.BUILD_LOG, OPEN_CHANNEL, etc.)
- **Dark cinematic interface** — deep dark backgrounds with teal (`#4ecdc4`) accent color
- **Monospace typography** — Geist Mono font throughout for a technical aesthetic
- **Reduced motion support** — all animations respect `prefers-reduced-motion`

---

## Skills

The project documents six skill areas:

| Category | Skills | Status |
|----------|--------|--------|
| **Programming** | JavaScript, TypeScript, Python, Java, SQL | Active |
| **Web Development** | React, Next.js, HTML, CSS, Tailwind CSS | Active |
| **AI / Machine Learning** | AI, Machine Learning, LLM Concepts, AI Automation, Prompt Engineering | Exploring |
| **Software Testing / QA** | Manual Testing, Test Case Design, Functional Testing, Regression Testing, UI Testing, API Testing, Bug Reporting, Quality Assurance | Learning |
| **Tools / Development** | Git, GitHub, VS Code, Firebase, Supabase, Linux / Terminal | — |
| **3D / Creative** | Three.js, WebGL, GSAP, Interactive Web Experiences | — |

**Learning.Log** — areas currently being explored:

- Software Testing / QA (Learning)
- Agentic AI (Exploring)
- AI / Automation (Exploring)
- Linux / Networking (Practicing)
- Web Development (Building)
- 3D / Creative Tech (Exploring)

---

## Projects

Seven projects are documented in the repository:

| # | Project | Category | Status | Progress | Technologies |
|---|---------|----------|--------|----------|--------------|
| 01 | **Mediscribe** | Healthcare | Deployed | 85% | Python, React, Firebase |
| 02 | **WhatsApp Voice Assistant** | AI/ML | In Progress | 60% | Node.js, React, WhAPI, OpenAI |
| 03 | **Virtual Phone Controller** | IoT | In Progress | 40% | TensorFlow, React Native, OpenCV, SpeechRecognition |
| 04 | **Face Attendance System** | Security | Deployed | 90% | React, TensorFlow.js, WebRTC, Node.js |
| 05 | **Event Management Website** | Full Stack | Deployed | 70% | Next.js, React, Stripe, PostgreSQL |
| 06 | **Anonymous Chat App** | Communication | Testing | 50% | Socket.io, React, Node.js, MongoDB |
| 07 | **ExamGuard** | AI/Security | In Progress | 35% | Python, TensorFlow, React, Node.js |

Each project module displays: name, short description, status badge, category, progress bar, technology tags, feature list, and links to GitHub/demo (where available).

---

## Technology Stack

### Currently Used

| Technology | Version | Purpose |
|------------|---------|---------|
| [Next.js](https://nextjs.org) | 16.3.4 | React framework, App Router, build system |
| [React](https://react.dev) | 19.2.8 | UI library |
| [TypeScript](https://www.typescriptlang.org) | 5.x | Type safety |
| [Tailwind CSS](https://tailwindcss.com) | 4.x | Utility-first CSS (via `@tailwindcss/postcss`) |
| [Geist Mono](https://vercel.com/font) | — | Monospace font (via `next/font/google`) |

### Installed (Preserved for Future Use)

These packages are in `package.json` and have corresponding source files, but are **not currently used** by the live site:

| Technology | Purpose |
|------------|---------|
| [Three.js](https://threejs.org) | 3D graphics — GLTF model loader exists in `src/components/3d/ComputerGLB.tsx` |
| [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber/) | React Three.js renderer — `CinematicController.tsx` exists |
| [@react-three/drei](https://drei.docs.pmnd.rs/) | Three.js helpers — used in `ComputerGLB.tsx` |
| [GSAP](https://greensock.com/gsap/) | Animation library — installed but not imported in active components |
| [Lenis](https://lenis.darkroom.engineering/) | Smooth scroll — `LenisScroll.tsx` and `lenis-hook.ts` exist but are not imported in `page.tsx` |

> **Note:** The current cinematic intro uses the WebP frame sequence on a 2D canvas, not the Three.js/GLTF implementation. The 3D components are preserved for potential future interactive use.

---

## Project Architecture

```
skanda-exe/
├── public/
│   ├── frames/                          # 120 WebP cinematic frames
│   │   ├── frame_0000.webp              # First frame (computer assembled)
│   │   ├── frame_0001.webp
│   │   ├── ...
│   │   ├── frame_0119.webp              # Last frame (fully disassembled)
│   │   └── README.txt                   # Frame sequence documentation
│   ├── assets/
│   │   └── computer/                    # GLTF/Three.js model (preserved)
│   │       ├── computer.glb             # Binary GLTF (~74MB)
│   │       ├── scene.gltf               # JSON GLTF
│   │       ├── scene.bin                 # Binary buffer
│   │       ├── license.txt              # CC-BY-4.0 by LagzDesign
│   │       └── textures/                # Model textures
│   ├── file.svg
│   ├── globe.svg
│   ├── next.svg
│   ├── vercel.svg
│   └── window.svg
├── scripts/
│   └── inspect-glb.js                   # GLB model inspection utility
├── src/
│   ├── app/
│   │   ├── layout.tsx                   # Root layout — Geist fonts, metadata
│   │   ├── page.tsx                     # Main page — assembles all sections
│   │   ├── globals.css                  # Tailwind + global styles
│   │   └── favicon.ico
│   ├── components/
│   │   ├── animation/
│   │   │   ├── CVIntro.tsx              # SKANDA C.V. title section
│   │   │   ├── ScrollFrameSequence.tsx  # Canvas-based 120-frame renderer
│   │   │   └── SkillMapSection.tsx      # Wraps cinematic + skill overlays
│   │   ├── portfolio/
│   │   │   ├── PortfolioSections.tsx    # All 8 portfolio sections
│   │   │   ├── Navigation.tsx           # Fixed sidebar/bottom navigation
│   │   │   └── CinematicTransition.tsx  # SYSTEM ONLINE transition
│   │   ├── 3d/
│   │   │   ├── ComputerGLB.tsx          # GLTF model loader (preserved)
│   │   │   └── CinematicController.tsx  # Scroll-driven camera (preserved)
│   │   └── LenisScroll.tsx              # Lenis smooth scroll (preserved)
│   ├── config/
│   │   └── computer-mapping.ts          # Hardware → portfolio section mapping
│   ├── data/
│   │   ├── profile/profile-data.ts      # Name, social links, bio
│   │   ├── projects/sample-projects.ts  # 7 project definitions
│   │   ├── skills/skills-data.ts        # Skill definitions
│   │   ├── education/education-data.ts  # BCA degree info
│   │   ├── achievements/achievements-data.ts
│   │   └── experience/experience-data.ts
│   ├── lib/
│   │   ├── repository.ts               # Data access layer (prepared for DB)
│   │   └── lenis-hook.ts               # Lenis hook (preserved)
│   └── types/
│       └── portfolio-types.ts          # TypeScript interfaces
├── package.json
├── tsconfig.json
├── next.config.ts
├── postcss.config.mjs
└── eslint.config.mjs
```

---

## Design Philosophy

SKANDA.EXE treats a computer system as the visual metaphor for a developer's skill and technical ecosystem.

- **The hardware is not merely decoration.** The cinematic computer disassembly sequence represents the systematic exploration of capabilities — each component becoming visible as the system is inspected.
- **Scroll as interaction.** There are no buttons to click or menus to navigate for the core experience. Scrolling down progresses through the system; scrolling up reverses it.
- **System aesthetic.** Every section label uses terminal/system language: `SYSTEM.IDENTITY`, `SYSTEM.BUILD_LOG`, `SYSTEM.CAPABILITIES`, `OPEN_CHANNEL`.
- **Minimal, technical typography.** Geist Mono throughout. No decorative fonts. Letter-spacing and uppercase text create a technical readout feel.
- **Dark cinematic palette.** Background `#0a0a0f`, accent `#4ecdc4` (teal), muted text `#555`–`#777`. The canvas uses `#050609` as its fill.

---

## Performance & Accessibility

### Performance Considerations

- **Canvas rendering** — a single `<canvas>` element is used for the cinematic, not 120 DOM nodes
- **DPR cap** — device pixel ratio is capped at 2 to prevent excessive canvas resolution on high-DPI displays
- **Frame preloading** — all 120 images are loaded asynchronously before the cinematic becomes interactive
- **`requestAnimationFrame`** — the render loop uses `rAF` for smooth, jank-free rendering
- **Passive scroll listeners** — all scroll event listeners use `{ passive: true }` to avoid blocking scroll
- **No React state updates on every scroll** — scroll progress is stored in refs, not state, to avoid re-renders
- **Event listener cleanup** — all `useEffect` hooks properly return cleanup functions
- **IntersectionObserver** — portfolio sections use `IntersectionObserver` for scroll-reveal instead of scroll-position polling

### Accessibility

- **`prefers-reduced-motion`** — all components check `window.matchMedia("(prefers-reduced-motion: reduce)")` and skip animations when enabled
- **Semantic HTML** — sections use `<section>`, navigation uses `<nav>`, headings use `<h2>`
- **Keyboard accessible** — navigation buttons are standard `<button>` elements
- **Custom scrollbar** — narrow 4px scrollbar styled to match the dark theme

---

## Development

### Prerequisites

- Node.js (tested with Node 24)
- npm

### Setup

```bash
# Clone the repository
git clone https://github.com/skandachandrashekar335-wq/skanda-profile.git
cd skanda-profile/skanda-exe

# Install dependencies
npm install
```

### Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server at `http://localhost:3000` |
| `npm run build` | Create optimized production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

### Local Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Deployment

The project is deployed on [Vercel](https://vercel.com):

- **Production URL:** [skandachandrashekar.vercel.app](https://skandachandrashekar.vercel.app)
- **Repository:** [github.com/skandachandrashekar335-wq/skanda-profile](https://github.com/skandachandrashekar335-wq/skanda-profile)

Vercel auto-deploys from the `main` branch. The Next.js project uses the App Router with static generation.

---

## 3D Model

A GLTF/GLB 3D model of an OMEN Gaming PC (low-poly) is included in `public/assets/computer/`:

- **Source:** [OMEN Gaming PC (low-poly)](https://sketchfab.com/3d-models/omen-gaming-pc-low-poly-85990cd63b63444381cb7ef62a360789) by [LagzDesign](https://sketchfab.com/LagzDesign)
- **License:** CC-BY-4.0 — author credit required, commercial use allowed

This model is **not used by the current cinematic intro**, which relies on the 120-frame WebP sequence. The GLTF model and associated Three.js components (`ComputerGLB.tsx`, `CinematicController.tsx`) are preserved for potential future interactive/real-time 3D use.

---

## Contact

| Platform | Link |
|----------|------|
| **GitHub** | [skandachandrashekar335-wq](https://github.com/skandachandrashekar335-wq) |
| **LinkedIn** | [Skanda Chandrashekhar](https://www.linkedin.com/in/skanda-chandrashekhar-72b35a32a) |
| **Instagram** | [skandachandrashekar](https://www.instagram.com/skandachandrashekar/) |
| **Email** | [skandachandrashekar335@gmail.com](mailto:skandachandrashekar335@gmail.com) |
| **Phone** | [+91 91135 88819](tel:+919113588819) |

---

## License

No license is currently specified for this repository. The 3D model included in `public/assets/computer/` is licensed under [CC-BY-4.0](http://creativecommons.org/licenses/by/4.0/) by [LagzDesign](https://sketchfab.com/LagzDesign).

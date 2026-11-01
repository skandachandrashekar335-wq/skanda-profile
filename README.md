# Skanda Chandrashekhar — Developer Portfolio

> Modern editorial engineering portfolio and project catalog for Skanda Chandrashekhar — BCA student, software developer, and QA/AI automation specialist based in Bangalore, India.

[![Production Deployment](https://img.shields.io/badge/Production-Live-success?style=flat-square&logo=vercel)](https://skandachandrashekar.vercel.app/)
[![Next.js](https://img.shields.io/badge/Next.js-16.3.4-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.8-blue?style=flat-square&logo=react)](https://react.dev/)
[![GitHub Sync](https://img.shields.io/badge/GitHub%20Data-Automated-informational?style=flat-square&logo=github)](.github/workflows/refresh.yml)

**Live Production Website:** [https://skandachandrashekar.vercel.app/](https://skandachandrashekar.vercel.app/)  
**GitHub Profile:** [https://github.com/skandachandrashekar335-wq](https://github.com/skandachandrashekar335-wq)

---

## Overview

This portfolio presents the work, engineering principles, and technical capabilities of Skanda Chandrashekhar. Built with a typographic editorial design system, it features pure semantic CSS, high readability, deep technical case studies, live screenshot previews, interactive iframe testing, and automated GitHub data synchronization.

### Visual Design System

- **Design Tokens:** Warm ivory paper canvas (`#F6F4EF`), secondary surface (`#EFEBE3`), near-black ink (`#141414`), subtle hairlines (`#D9D5CC`), and rust accent (`#B5502B`).
- **Typography:** `Instrument Serif` for headlines and project titles, paired with `Inter` for body reading and metadata.
- **Interactions & Motion:**
  - Reading progress indicator along the top edge.
  - Sticky translucent header with blur backdrop.
  - Animated hero word masks and staggered reveals.
  - Scroll-triggered reveals for sections and horizontal divider rules.
  - Numbered project index with hover indentation, italic title transformation, and dimming of non-hovered rows.
  - Smooth cursor-following live preview card with radial gradient cover fallback or site screenshots.
  - Interactive skill pills with expandable project evidence accordions.
  - In-browser interactive preview for projects supporting embeddable framing.

---

## Selected Work

The portfolio showcases verified engineering projects with deep-dive case studies at `/work/[slug]`:

| # | Project | Category | Key Technologies | Status |
|---|---------|----------|------------------|--------|
| **01** | **[SubstiFlow](/work/substiflow)** | Systems | Electron, React, TypeScript, SQLite, Vite, Vitest | Local-First Build |
| **02** | **[DSCASC AI](/work/dscasc-ai)** | Explainable NLP | Next.js, React, TypeScript, TF-IDF, Cosine Similarity | Academic MVP |
| **03** | **[Noctra](/work/noctra)** | Tools | Next.js, TypeScript, Tailwind CSS, PDF.js, Canvas API | Live Utility |
| **04** | **[WAVEIL](/work/waveil)** | Browser Security | TypeScript, React, Manifest V3, Webpack, Vitest | Released Extension |
| **05** | **[SUTRA](/work/sutra)** | AI & Education | Next.js, TypeScript, Python, FastAPI, Vector Clustering | Classroom Q&A |
| **06** | **[ReleaseLens](/work/releaselens)** | QA & Testing | TypeScript, Jest, Playwright, Lighthouse, Node.js | Quality Platform |
| **07** | **[ExamGuard](/work/examguard)** | AI & Security | Next.js, Python, FastAPI, UniFace, OpenCV, PostgreSQL | MVP in Progress |
| **08** | **[Anomoly Chat](/work/anomoly-chat)** | WebRTC & Privacy | JavaScript, WebRTC, PeerJS, Web Crypto API | Live Demo |

Each case study details:
- **The Core Problem:** Real-world domain context and challenges.
- **How It Works:** Numbered architectural and engineering steps.
- **Engineering Notes & QA Evidence:** Unit test assertions, mock suites, and edge-case verifications.

---

## Discovered Public Repositories

Public repositories outside the top 5 are automatically discovered via GitHub REST API and displayed in the project index:
- `Noctra-pdfconverter` — Browser-first document conversion and study platform.
- `ReleaseLens` — Continuous quality engineering and product release auditing platform.

---

## Technical Architecture

```
skanda-profile/
├── .github/
│   └── workflows/
│       └── refresh.yml          # Daily cron + manual dispatch GitHub sync
├── app/
│   ├── components/
│   │   ├── Cover.js             # Typographic project cover card
│   │   ├── LivePreview.js       # Browser mockup with screenshot / iframe toggle
│   │   ├── ProjectIndex.js      # Interactive index with cursor-following preview
│   │   ├── Reveal.js            # IntersectionObserver for scroll-triggered reveals
│   │   └── SkillIndex.js        # Skill pills linked to project evidence
│   ├── work/
│   │   └── [slug]/
│   │       └── page.js          # Statically generated (SSG) project case study
│   ├── format.js                # Date, year, and numeral formatting helpers
│   ├── globals.css              # Pure editorial CSS design tokens & animations
│   ├── layout.js                # Root layout with Instrument Serif & Inter fonts
│   ├── lib.js                   # Type-safe accessors for content/portfolio.json
│   ├── page.js                  # Main landing page
│   └── template.js              # Page remount wrapper for fade animations
├── content/
│   └── portfolio.json           # Self-contained portfolio data snapshot
├── public/
│   └── shots/                   # Real browser-captured screenshots of live demos
├── scripts/
│   ├── generate.mjs             # GitHub discovery and portfolio generator
│   └── generate.test.mjs        # Unit test suite for sync and filtering logic
├── package.json                 # Scripts and dependencies
└── jsconfig.json                # Path aliases (@/* -> ./*)
```

---

## GitHub Data Pipeline

Portfolio content is backed by `content/portfolio.json`, providing zero-latency static page generation:

1. **Curated Protection:** The 5 featured projects, order, rich problem descriptions, howItWorks steps, and QA evidence are strictly protected in `scripts/generate.mjs`.
2. **Automated Discovery:** Public repositories are queried from `GET /users/skandachandrashekar335-wq/repos?per_page=100&sort=pushed&type=owner`.
3. **Public-Only Filtering:**
   - `private === false`
   - `fork === false`
   - `archived === false`
   - Excludes portfolio repo (`skanda-profile`) and user profile repo.
   - Only repos owned by `skandachandrashekar335-wq`.
4. **Scheduled Sync:** `.github/workflows/refresh.yml` triggers daily at 00:00 UTC and on-demand via `workflow_dispatch`.

To run sync locally:
```bash
npm run generate
```

To run unit tests:
```bash
npm test
```

---

## Getting Started

### Prerequisites

- Node.js >= 20.x
- npm >= 10.x

### Installation

```bash
git clone https://github.com/skandachandrashekar335-wq/skanda-profile.git
cd skanda-profile
npm ci
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site locally.

### Production Build

```bash
npm run build
```

This generates fully static HTML pages (`SSG`) for all routes.

---

## Deployment

The portfolio is deployed to Vercel and connected directly to the `main` branch:

- **Vercel Project:** `skandachandrashekar`
- **Project ID:** `prj_M5RR7YsJn2Bv5qrLf0hBc9VTQ3fg`
- **Production URL:** [https://skandachandrashekar.vercel.app/](https://skandachandrashekar.vercel.app/)

---

## Contact

- **Email:** skandachandrashekar335@gmail.com
- **LinkedIn:** [linkedin.com/in/skanda-chandrashekhar-72b35a32a](https://www.linkedin.com/in/skanda-chandrashekhar-72b35a32a)
- **GitHub:** [github.com/skandachandrashekar335-wq](https://github.com/skandachandrashekar335-wq)
- **Location:** Bangalore, India

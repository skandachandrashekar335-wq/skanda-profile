# Skanda Chandrashekhar — Developer Portfolio

> Modern editorial engineering portfolio and project catalog for Skanda Chandrashekhar — BCA student, software developer, and QA/AI automation specialist based in Bangalore, India.

[![Production Deployment](https://img.shields.io/badge/Production-Live-success?style=flat-square&logo=vercel)](https://skandachandrashekar.vercel.app/)
[![Next.js](https://img.shields.io/badge/Next.js-16.3.4-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.8-blue?style=flat-square&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.x-38bdf8?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![GitHub Sync](https://img.shields.io/badge/GitHub%20Data-Automated-informational?style=flat-square&logo=github)](.github/workflows/refresh.yml)

**Live Production Website:** [https://skandachandrashekar.vercel.app/](https://skandachandrashekar.vercel.app/)  
**GitHub Profile:** [https://github.com/skandachandrashekar335-wq](https://github.com/skandachandrashekar335-wq)

---

## Overview

This portfolio presents the work, engineering principles, and technical capabilities of Skanda Chandrashekhar. Built with an editorial design sensibility inspired by typographic publications, it replaces heavy 3D gimmicks with structured clarity, high readability, deep technical case studies, and automated GitHub data synchronization.

### Design Direction

- **Warm Editorial Palette:** Warm ivory canvas (`#F6F4EF`), secondary surface (`#EFEBE3`), near-black ink (`#141414`), subtle hairlines (`#D9D5CC`), and rust accent (`#B5502B`).
- **Typography:** `Newsreader` (editorial serif) for headlines, paired with `Geist` for body reading and `Geist Mono` for technical metadata and tabular numerals.
- **Micro-interactions:** 2px scroll progress bar, keyboard-accessible navigation drawer, one-click email copy with toast confirmation, and skill-to-project evidence linking.

---

## Selected Work

The portfolio highlights five featured projects with deep-dive case studies at `/work/[slug]`:

| # | Project | Category | Key Technologies | Status |
|---|---------|----------|------------------|--------|
| **01** | **[ExamGuard](/work/examguard)** | AI / Security | Next.js, Python, FastAPI, UniFace, OpenCV, Cloudinary, PostgreSQL | MVP in Progress |
| **02** | **[SubstiFlow](/work/substiflow)** | Full-Stack / Automation | Next.js, TypeScript, PostgreSQL, Prisma, Tailwind CSS, Jest | Deployed & Running |
| **03** | **[Anomoly Chat](/work/anomoly-chat)** | Realtime / Security | Next.js, WebSockets, End-to-End Encryption, Node.js | Active Dev |
| **04** | **[What's Not Up](/work/whats-not-up)** | Data Engineering / Scraping | Python, Playwright, BeautifulSoup4, Pandas, SQLite | Released |
| **05** | **[DSCASC AI](/work/dscasc-ai)** | AI / RAG / Assistant | Python, LangChain, FAISS, Next.js, FastAPI, Vector Search | Completed |

Each case study details:
- **The Core Problem:** Real-world domain context and requirements.
- **Architecture & Technical Decisions:** Modular design, state management, and trade-offs.
- **Verification & QA Rigor:** Test suites (e.g. 2,500+ backend tests), edge-case handling, mock pipelines, and automated checks.

---

## Other Discovered Repositories

Public repositories outside the top 5 are automatically discovered and displayed with live metadata from GitHub:
- `Noctra-pdfconverter` — Fast, secure document conversion utility.
- `ReleaseLens` — Release-note analysis and version tracking utility.
- `uniface-for-face-reco` — Facial recognition and identity verification foundation.

---

## Technical Architecture

```
skanda-profile/
├── .github/
│   └── workflows/
│       └── refresh.yml          # Daily cron + manual dispatch GitHub sync
├── content/
│   └── github-data.json         # Static snapshot of profile, repos, and curated projects
├── scripts/
│   └── generate-github-data.mjs # GitHub REST API scraper and content generator
├── src/
│   ├── app/
│   │   ├── globals.css          # Editorial CSS tokens and component styles
│   │   ├── layout.tsx           # Font loading (Newsreader, Geist) and global metadata
│   │   ├── page.tsx             # Main editorial landing page
│   │   └── work/
│   │       └── [slug]/
│   │           └── page.tsx     # Statically generated (SSG) case study route
│   ├── components/
│   │   ├── EmailCopyButton.tsx  # Interactive email copy button with toast
│   │   ├── Footer.tsx           # Editorial footer with sync timestamp
│   │   ├── Navigation.tsx       # Sticky bar with desktop links and mobile drawer
│   │   ├── ProjectIndex.tsx     # Editorial table of featured projects
│   │   ├── ScrollProgress.tsx   # Top 2px rust reading indicator
│   │   └── SkillIndex.tsx       # Matrix linking skills to actual project evidence
│   └── lib/
│       └── portfolio-data.ts    # Type-safe getters, utilities, and date formatters
├── public/                      # Static assets and favicons
├── next.config.ts               # Next.js configuration
├── package.json                 # Scripts and dependencies
└── tsconfig.json                # TypeScript configuration
```

---

## GitHub Data Pipeline

Project metadata is backed by `content/github-data.json`, ensuring fast zero-latency static rendering with no client-side API rate limits:

1. **Curated Protection:** The 5 featured projects, order, rich problem descriptions, and QA evidence are strictly protected in `scripts/generate-github-data.mjs`.
2. **Automated Metrics:** Stars, fork counts, commit dates, and language percentage breakdowns are queried dynamically from the GitHub REST API.
3. **Scheduled Synchronization:** `.github/workflows/refresh.yml` triggers daily at 00:00 UTC and on-demand via `workflow_dispatch`. When changes occur, it commits the refreshed data back to the repository.

To refresh locally:
```bash
npm run sync-github
# or with token:
GITHUB_TOKEN=ghp_xxx npm run sync-github
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

This generates fully static HTML pages (`SSG`) for the home route, 404, and all `/work/[slug]` routes.

---

## Deployment

The portfolio is deployed to Vercel and connected directly to the `main` branch of this repository.

- **Vercel Project:** `skandachandrashekar`
- **Project ID:** `prj_M5RR7YsJn2Bv5qrLf0hBc9VTQ3fg`
- **Production URL:** [https://skandachandrashekar.vercel.app/](https://skandachandrashekar.vercel.app/)

---

## Contact

- **Email:** skandachandrashekar335@gmail.com
- **LinkedIn:** [linkedin.com/in/skanda-chandrashekhar-518384260](https://www.linkedin.com/in/skanda-chandrashekhar-518384260)
- **GitHub:** [github.com/skandachandrashekar335-wq](https://github.com/skandachandrashekar335-wq)
- **Location:** Bangalore, India

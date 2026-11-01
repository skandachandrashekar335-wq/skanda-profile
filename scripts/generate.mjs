// Reads GitHub (profile README + own repos), refreshes stats, discovers public repos, saves content/portfolio.json.
import { readFile, writeFile, mkdir, stat, rm } from 'node:fs/promises';
import { pathToFileURL, fileURLToPath } from 'node:url';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';

export const USER = 'skandachandrashekar335-wq';
export const OUT = new URL('../content/portfolio.json', import.meta.url);
export const SITE_REPO = process.env.GITHUB_REPOSITORY?.split('/')[1] ?? 'skanda-profile';
export const SHOTS = new URL('../public/shots/', import.meta.url);
const TOKEN = process.env.GH_READ_TOKEN || process.env.GITHUB_TOKEN;

// Exact showcase order for verified public repositories
export const FEATURED_SLUGS = [
  'substiflow',
  'noctra',
  'dscasc-ai',
  'examguard',
  'releaselens',
  'anomoly-chat',
  'whats-not-up',
];

// Map repo names from GitHub to canonical slugs
export function normalizeSlug(repoName) {
  const map = {
    'SUBSTIFLOW': 'substiflow',
    'Noctra-pdfconverter': 'noctra',
    'dscasc-ai': 'dscasc-ai',
    'ExamGuard': 'examguard',
    'ReleaseLens': 'releaselens',
    'anomoly-chat': 'anomoly-chat',
    'What-s-Not-Up': 'whats-not-up',
  };
  return map[repoName] || repoName.toLowerCase().replace(/[^a-z0-9_-]/g, '-');
}

// Approved project display names (no arbitrary aliases)
export const DISPLAY_NAMES = {
  'substiflow': 'SubstiFlow',
  'noctra': 'Noctra',
  'dscasc-ai': 'DSCASC AI',
  'examguard': 'ExamGuard',
  'releaselens': 'ReleaseLens',
  'anomoly-chat': 'Anomoly Chat',
  'whats-not-up': "What's Not Up",
};

// Curated active deployment URLs (verified independently from repo metadata)
export const CURATED_HOMEPAGES = {
  'dscasc-ai': 'https://dscascai.vercel.app',
  'noctra': 'https://noctra-pdfconverter.vercel.app',
  'examguard': 'https://exam-guardian-management.vercel.app',
  'anomoly-chat': 'https://anomoly-chat.vercel.app',
};

// Curated rich case study metadata for verified projects
export const CURATED_DATA = {
  'substiflow': {
    title: 'SubstiFlow',
    tagline: 'Timetable and faculty substitution automation',
    category: 'Systems',
    summary: 'Replaces spreadsheet-driven substitution chaos with a local desktop workflow: draft timetables, validate room and faculty constraints, resolve leave conflicts in seconds, and export clean daily cover schedules without external cloud dependencies.',
    problem: 'Academic department coordinators waste hours every morning manually cross-referencing paper timetables and faculty WhatsApp leaves, creating double-bookings and room assignment clashes.',
    howItWorks: [
      'Constraint engine parses faculty weekly workloads, subject allocations, and room quotas into SQLite tables.',
      'Leave resolver flags absentee professors and sorts eligible substitutes using workload balancing heuristics.',
      'Conflict matrix checks room availability, period adjacency, and subject qualifications deterministically.',
      'One-click export produces print-ready PDF daily substitution rosters and departmental notifications.'
    ],
    highlights: [
      '100% offline-first architecture: Zero external API requirements or data transmission.',
      'Comprehensive constraint validator test matrix verifying 200+ edge-case faculty conflict allocations.',
      'Deterministic substitution ranking algorithm eliminating scheduling double-bookings.',
      'Local SQLite migration suite tested across schema upgrades.'
    ],
    stack: ['Electron', 'React', 'TypeScript', 'SQLite', 'Vite', 'Vitest', 'Tailwind CSS']
  },
  'noctra': {
    title: 'Noctra',
    tagline: 'PDF & presentation dark-mode conversion and study platform',
    category: 'Tools',
    summary: 'Browser-first document conversion utility and AI-assisted study workspace that transforms high-contrast white PDF textbooks and slide decks into eye-friendly dark mode themes with intelligent color-inversion and high-fidelity rendering.',
    problem: 'Reading white academic PDFs and slides at night causes extreme eye fatigue, but naive browser dark mode extensions invert embedded diagrams and charts into illegible negatives.',
    howItWorks: [
      'PDF.js renders vector document pages onto dedicated HTML5 Canvas elements in high resolution.',
      'Selective luminance inversion preserves original color matrices for embedded diagrams and photographic charts.',
      'Local Web Worker threads execute canvas color manipulation off the main UI thread to prevent stutter.',
      'Interactive study workspace offers synchronized document note-taking and PDF bookmarking.'
    ],
    highlights: [
      'High-performance Canvas filter engine processing 100+ page textbooks completely in-browser.',
      'Smart color-preserving inversion: Inverts text and backgrounds while preserving photographic fidelity.',
      'Automated visual regression test suite verifying rendering fidelity across complex academic charts.',
      'Zero cloud upload: Complete local file processing ensuring student privacy.'
    ],
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'PDF.js', 'Canvas API']
  },
  'dscasc-ai': {
    title: 'DSCASC AI',
    tagline: 'Student guidance and NLP-based assistance for campus services',
    category: 'Explainable NLP',
    summary: 'An academic guidance assistant built around an explainable NLP pipeline: normalizes student queries, builds TF-IDF vector models, ranks with cosine similarity, and falls back gracefully below confidence thresholds.',
    problem: 'College students and prospective applicants frequently struggle to locate official guidance on admissions, fees, syllabus, and placement schedules across dispersed circulars and PDF notices.',
    howItWorks: [
      'Text preprocessing pipeline normalizes college jargon, course abbreviations (BCA, MCA, MBA), and common student typos.',
      'Vector engine generates TF-IDF representations from curated institutional knowledge bases.',
      'Cosine similarity rankings identify the closest official responses with inspectable confidence scores.',
      'Queries falling below a 0.45 similarity threshold gracefully trigger structured contact cards rather than guessing answers.'
    ],
    highlights: [
      'Deterministic explainability: Vector scores and similarity rankings are fully inspectable, eliminating LLM hallucinations.',
      'Zero recurring inference costs: Runs entirely client/server-side without external paid API keys.',
      'Comprehensive intent-matching test matrix covering 40+ curated academic categories.',
      'Typo resilience test suite verifying query resolution across misspelled student prompts.'
    ],
    stack: ['Next.js', 'React', 'TypeScript', 'TF-IDF', 'Cosine Similarity', 'Vitest']
  },
  'examguard': {
    title: 'ExamGuard',
    tagline: 'Examination management & identity verification for secure exam entry',
    category: 'AI & Security',
    summary: 'Connects student registration, hall tickets, seating plans, invigilation, and browser-based identity checks into a single verifiable examination platform.',
    problem: 'College exam halls suffer from impersonation, misplaced hall tickets, chaotic manual seating allocation, and fragmented malpractice reporting.',
    howItWorks: [
      'Admissions pipeline issues tamper-resistant cryptographic hall tickets with QR verification.',
      'Biometric entry gate verifies candidate identities via browser webcam using local face-embedding models.',
      'Automated seating allocator assigns students to exam halls with randomized row spacing to prevent peeking.',
      'Invigilator dashboard provides live attendance tracking, instant incident logging, and digital signatures.'
    ],
    highlights: [
      'UniFace & OpenCV biometric comparison pipeline with anti-spoofing liveness checks.',
      'Cryptographically signed hall ticket QR codes preventing digital forgery.',
      'Integration test suite simulating concurrent candidate verification across multiple halls.',
      'Role-based access control protecting student records and disciplinary history.'
    ],
    stack: ['Next.js', 'TypeScript', 'Python', 'FastAPI', 'PostgreSQL', 'UniFace', 'OpenCV', 'Cloudinary', 'Docker']
  },
  'releaselens': {
    title: 'ReleaseLens',
    tagline: 'Release engineering and CI quality documentation',
    category: 'QA & Testing',
    summary: 'A continuous quality engineering platform combining automated functional testing, accessibility checks, performance audits, and release sign-off documentation into a single dashboard.',
    problem: 'Engineering teams often ship software without centralized visibility into QA coverage, performance regressions, or compliance with release quality gates.',
    howItWorks: [
      'GitHub Action runner executes Jest unit tests, Playwright end-to-end flows, and Lighthouse audits.',
      'Quality engine aggregates test outputs, code coverage percentages, and bundle-size differentials.',
      'Automated release blocker triggers if accessibility score drops below 95 or any test fails.',
      'Markdown audit reports are automatically generated and attached to release pull requests.'
    ],
    highlights: [
      'Centralized release dashboard consolidating unit, integration, and performance metrics.',
      'Strict quality gates with configurable thresholds preventing broken builds from deploying.',
      'Automated pull request reporting with actionable visual regression diffs.',
      'Self-hosted Node.js test harness with complete mock API pipelines.'
    ],
    stack: ['TypeScript', 'Jest', 'Playwright', 'Lighthouse', 'Node.js']
  },
  'anomoly-chat': {
    title: 'Anomoly Chat',
    tagline: 'Accountless peer-to-peer chat & document transfer between browsers',
    category: 'WebRTC & Privacy',
    summary: 'Creates temporary browser-to-browser rooms using WebRTC data channels. Messages and documents stay in memory and are never saved to a database.',
    problem: 'Quickly sharing sensitive documents or notes with nearby peers requires signing into third-party messaging apps, exposing phone numbers, and storing unencrypted files on remote servers.',
    howItWorks: [
      'Signaling server pairs two clients using short-lived 6-character room codes without collecting user identities.',
      'WebRTC direct peer-to-peer DataChannel is established between browsers with end-to-end encryption.',
      'Files are chunked into 16KB ArrayBuffers, transferred directly peer-to-peer, and reassembled in memory.',
      'Closing the browser tab completely wipes all message history and transferred files with zero residual footprint.'
    ],
    highlights: [
      'Zero server-side persistence: Signaling server relays SDP offers/answers and never touches payload data.',
      'Direct browser-to-browser WebRTC DataChannels for low-latency text and document transfer.',
      'Network partition tolerance with automated reconnection and graceful teardown.',
      'Security audit confirming zero user tracking, cookie storage, or credential storage.'
    ],
    stack: ['JavaScript', 'WebRTC', 'PeerJS', 'Web Crypto API', 'HTML5', 'CSS3']
  },
  'whats-not-up': {
    title: "What's Not Up",
    tagline: 'Local visual privacy controls for WhatsApp Web',
    category: 'Browser Security',
    summary: 'A Manifest V3 browser extension that visually obscures sensitive messaging content already rendered on screen. Features layered DOM detection, independent privacy categories, hover reveals, and panic controls without network telemetry.',
    problem: 'Using web messaging in public libraries, classrooms, or open-plan offices leaves private messages, sender identities, and media exposed to shoulder surfing.',
    howItWorks: [
      'Dynamic MutationObservers monitor chat containers for incoming messages, infinite scrolls, and tab changes.',
      'Scoped CSS blur filters obfuscate targeted DOM elements according to user privacy preferences.',
      'Hover-intent triggers unblur specific elements cleanly and re-engages blur immediately upon pointer exit.',
      'Global panic-lock shortcut instantly re-engages maximum obfuscation across all active messaging tabs.'
    ],
    highlights: [
      'Independent toggle categories for message bodies, contact names, profile pictures, and media previews.',
      'Zero external network telemetry: Manifest V3 declared with minimal permissions and no remote network calls.',
      'DOM mutation stress tests across rapid infinite-scrolling WhatsApp Web conversations.',
      'Permission audit verifying zero access outside supported messaging origins.'
    ],
    stack: ['TypeScript', 'React', 'Manifest V3', 'Webpack', 'Chromium APIs', 'Vitest']
  }
};

// ---------- GitHub API ----------

export async function gh(path, raw = false) {
  const res = await fetch(`https://api.github.com${path}`, {
    headers: {
      Accept: raw ? 'application/vnd.github.raw+json' : 'application/vnd.github+json',
      ...(TOKEN && { Authorization: `Bearer ${TOKEN}` }),
      'User-Agent': 'skanda-portfolio-sync',
    },
  });
  if (res.status === 404) return null;
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`GitHub ${path} → ${res.status}: ${errorText}`);
  }
  return raw ? res.text() : res.json();
}

// Fetch all public repos handling pagination (>100 repos)
export async function fetchAllRepos(user = USER) {
  let page = 1;
  const all = [];
  while (true) {
    const batch = await gh(`/users/${user}/repos?per_page=100&page=${page}&sort=pushed&type=owner`);
    if (!Array.isArray(batch) || batch.length === 0) break;
    all.push(...batch);
    if (batch.length < 100) break;
    page++;
  }
  return all;
}

// Strict public-only filtering rules
export function filterRepos(repos, siteRepo = SITE_REPO, username = USER) {
  return (repos || []).filter((r) => {
    if (r.private) return false;
    if (r.fork) return false;
    if (r.archived) return false;
    if (r.name.toLowerCase() === siteRepo.toLowerCase()) return false;
    if (r.name.toLowerCase() === username.toLowerCase()) return false;
    if (r.owner?.login && r.owner.login.toLowerCase() !== username.toLowerCase()) return false;
    return true;
  });
}

// Order repos: curated featured projects strictly first in order, then by most recent push
export function orderRepos(repos) {
  const featuredRank = new Map(FEATURED_SLUGS.map((slug, i) => [slug.toLowerCase(), i]));
  return [...repos].sort((a, b) => {
    const slugA = normalizeSlug(a.name).toLowerCase();
    const slugB = normalizeSlug(b.name).toLowerCase();
    const rankA = featuredRank.has(slugA) ? featuredRank.get(slugA) : Infinity;
    const rankB = featuredRank.has(slugB) ? featuredRank.get(slugB) : Infinity;
    if (rankA !== rankB) return rankA - rankB;
    return (b.pushed_at || '').localeCompare(a.pushed_at || '');
  });
}

// Frame checking
export function canEmbed(headers) {
  if (!headers) return true;
  if (headers.get('x-frame-options')) return false;
  const fa = headers.get('content-security-policy')?.match(/frame-ancestors([^;]*)/i)?.[1]?.trim();
  return !fa || fa.split(/\s+/).includes('*');
}

// Check if a URL returns an active HTTP status (200-399)
export async function probeLiveUrl(url) {
  if (!url) return null;
  try {
    const res = await fetch(url, {
      method: 'GET',
      redirect: 'follow',
      headers: { 'User-Agent': 'skanda-portfolio-validator' },
      signal: AbortSignal.timeout(10_000),
    });
    if (res && res.status >= 200 && res.status < 400) {
      return {
        ok: true,
        embeddable: canEmbed(res.headers),
      };
    }
    return null;
  } catch {
    return null;
  }
}

// Verify live status with screenshot support
export async function verifyLiveSite(slug, url, shotPathExists = null) {
  const probe = await probeLiveUrl(url);
  if (!probe?.ok) return null;

  let hasShot = false;
  if (typeof shotPathExists === 'boolean') {
    hasShot = shotPathExists;
  } else {
    try {
      const shotPath = fileURLToPath(new URL(`${slug}.png`, SHOTS));
      hasShot = await stat(shotPath).then(() => true).catch(() => false);
    } catch {
      hasShot = false;
    }
  }

  return {
    url,
    embeddable: probe.embeddable,
    shot: hasShot ? `/shots/${slug}.png` : null,
    checkedAt: new Date().toISOString(),
  };
}

// Clean skills matrix: ensure only existing projects are referenced and deleted projects (like SUTRA) are purged
export function cleanSkills(skills, validSlugs) {
  const validSet = new Set(validSlugs.map((s) => s.toLowerCase()));
  return (skills || []).map((group) => ({
    name: group.name,
    skills: (group.skills || []).map((sk) => ({
      name: sk.name,
      projects: (sk.projects || [])
        .map((p) => (p === 'waveil' ? 'whats-not-up' : p))
        .filter((slug) => validSet.has(slug.toLowerCase())),
    })).filter((sk) => sk.projects.length > 0),
  })).filter((group) => group.skills.length > 0);
}

// Build the synchronized catalog strictly from eligible GitHub repositories
export async function syncCatalog(eligibleRepos, prevData = {}, options = {}) {
  const prevProjectsMap = new Map((prevData.projects || []).map((p) => [p.slug, p]));
  const ordered = orderRepos(eligibleRepos);
  const projects = [];

  for (const repo of ordered) {
    const slug = normalizeSlug(repo.name);
    const old = prevProjectsMap.get(slug);
    const curated = CURATED_DATA[slug] || {};

    const title = DISPLAY_NAMES[slug] || curated.title || old?.title || repo.name;
    const tagline = curated.tagline || old?.tagline || repo.description || '';
    const category = curated.category || old?.category || 'Tools';
    const summary = curated.summary || old?.summary || repo.description || '';
    const problem = curated.problem || old?.problem || '';
    const howItWorks = curated.howItWorks || old?.howItWorks || [];
    const highlights = curated.highlights || old?.highlights || [];
    const stack = curated.stack || old?.stack || (repo.language ? [repo.language] : []);

    // Homepage: prioritize curated URL (e.g. dscasc-ai), then repo homepage, then old cached
    const homepage = CURATED_HOMEPAGES[slug] || repo.homepage || old?.homepage || null;

    // Verify live deployment status
    let live = null;
    if (homepage) {
      if (options.mockProbe) {
        live = options.mockProbe(slug, homepage);
      } else {
        live = await verifyLiveSite(slug, homepage);
      }
    }

    // Languages preservation or fallback
    const languages = old?.languages || (repo.language ? [{ name: repo.language, pct: 100 }] : []);

    projects.push({
      slug,
      title,
      tagline,
      category,
      summary,
      problem,
      howItWorks,
      highlights,
      stack,
      languages,
      createdAt: curated.createdAt || old?.createdAt || repo.created_at,
      pushedAt: repo.pushed_at,
      url: repo.html_url,
      homepage: homepage || null,
      live: live || null,
      stars: repo.stargazers_count ?? 0,
      private: repo.private ?? false,
    });
  }

  const validSlugs = projects.map((p) => p.slug);
  const cleanedSkillsList = cleanSkills(prevData.skills || [], validSlugs);

  const profile = prevData.profile || {
    name: 'Skanda Chandrashekhar',
    headline: 'dependable systems, AI automation, QA',
    intro: 'I work across software development, AI automation, and software quality. I am a BCA student at Dayananda Sagar College in Bengaluru, building practical software systems, testing them rigorously, and turning ideas into dependable products.',
    education: 'BCA, Dayananda Sagar College of Arts, Science & Commerce, Bengaluru',
    now: [
      {
        title: 'ExamGuard',
        body: 'Developing an end-to-end examination verification platform integrating Next.js, Python FastAPI, biometric liveness checks, and tamper-resistant audit logs.',
      },
      {
        title: 'SubstiFlow',
        body: 'Maintaining automated faculty substitution scheduling with React, TypeScript, SQLite, and deterministic constraint algorithms.',
      },
      {
        title: 'QA & Testing Discipline',
        body: 'Designing comprehensive test suites with unit assertions, mock pipelines, and property-based verification for resilient software delivery.',
      },
    ],
    stack: [
      'TypeScript',
      'JavaScript',
      'Python',
      'Next.js',
      'React',
      'FastAPI',
      'Node.js',
      'PostgreSQL',
      'Prisma',
      'SQLite',
      'Electron',
      'Tailwind CSS',
      'Jest',
      'Vitest',
      'Playwright',
      'WebRTC',
      'LangChain',
      'OpenCV',
      'UniFace',
      'Docker',
      'Git',
      'Cloudinary',
      'Firebase',
    ],
    availability: 'Open to software development, QA/testing, and AI/automation internships.',
    email: 'skandachandrashekar335@gmail.com',
    linkedin: 'https://www.linkedin.com/in/skanda-chandrashekhar-72b35a32a',
    avatar: 'https://avatars.githubusercontent.com/u/254150727?v=4',
    github: `https://github.com/${USER}`,
  };

  return {
    updatedAt: new Date().toISOString(),
    profileVersion: new Date().toISOString(),
    profile,
    projects,
    skills: cleanedSkillsList,
  };
}

// Main execution entry point
export async function main() {
  console.log(`Fetching public repositories for user ${USER}...`);

  let prev = {};
  try {
    prev = JSON.parse(await readFile(OUT, 'utf-8'));
  } catch {
    prev = {};
  }

  let allRepos;
  try {
    allRepos = await fetchAllRepos();
  } catch (err) {
    // On GitHub API failure, preserve previous file, log error, and exit with failure code 1
    console.error('CRITICAL: GitHub repository fetch failed:', err.message);
    console.error('Preserving existing content/portfolio.json unmodified.');
    process.exit(1);
  }

  if (!Array.isArray(allRepos) || allRepos.length === 0) {
    console.error('CRITICAL: Received empty or invalid repository list from GitHub.');
    console.error('Preserving existing content/portfolio.json unmodified.');
    process.exit(1);
  }

  const eligibleRepos = filterRepos(allRepos);
  console.log(`Discovered ${eligibleRepos.length} eligible public repositories (owned, non-fork, non-archived).`);

  const updatedCatalog = await syncCatalog(eligibleRepos, prev);

  await mkdir(new URL('.', OUT), { recursive: true });
  await writeFile(OUT, JSON.stringify(updatedCatalog, null, 2) + '\n');
  console.log(`Successfully synchronized ${updatedCatalog.projects.length} projects to content/portfolio.json!`);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch((err) => {
    console.error('Unhandled fatal error in generator:', err);
    process.exit(1);
  });
}

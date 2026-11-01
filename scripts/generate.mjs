// Reads GitHub (profile README + own repos), refreshes stats, discovers public repos, saves content/portfolio.json.
import { readFile, writeFile, mkdir, stat, rm } from 'node:fs/promises';
import { pathToFileURL, fileURLToPath } from 'node:url';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';

export const USER = 'skandachandrashekar335-wq';
const OUT = new URL('../content/portfolio.json', import.meta.url);
const SITE_REPO = process.env.GITHUB_REPOSITORY?.split('/')[1] ?? 'skanda-profile';
const SHOTS = new URL('../public/shots/', import.meta.url);
const TOKEN = process.env.GH_READ_TOKEN || process.env.GITHUB_TOKEN;

// Approved curated project order
export const FEATURED_SLUGS = [
  'substiflow',
  'dscasc-ai',
  'noctra',
  'waveil',
  'sutra',
  'releaselens',
  'examguard',
  'anomoly-chat',
];

// Map repo names from GitHub to canonical slugs
export function normalizeSlug(repoName) {
  const map = {
    'SUBSTIFLOW': 'substiflow',
    'dscasc-ai': 'dscasc-ai',
    'Noctra-pdfconverter': 'noctra',
    'What-s-Not-Up': 'waveil',
    'ExamGuard': 'examguard',
    'ReleaseLens': 'releaselens',
    'anomoly-chat': 'anomoly-chat',
  };
  return map[repoName] || repoName;
}

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
  if (!res.ok) throw new Error(`GitHub ${path} → ${res.status} ${await res.text()}`);
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

// Group and validate skills
export function buildSkills(groups, allSkills, projects) {
  const raw = new Map(allSkills.map((s) => [s.toLowerCase(), s]));
  const seen = new Set();
  const out = (Array.isArray(groups) ? groups : []).map((g) => ({
    name: g?.name?.trim() || '',
    skills: (Array.isArray(g?.skills) ? g.skills : []).map((sk) => {
      const name = sk?.name?.trim() || '';
      const aliases = new Set([name, ...(sk?.aliases || [])].map((a) => a.toLowerCase()).filter((a) => raw.has(a)));
      if (!name || !aliases.size || seen.has(name.toLowerCase())) return null;
      seen.add(name.toLowerCase());
      return {
        name,
        projects: projects
          .filter((p) => (p.stack || []).some((t) => aliases.has(t.toLowerCase())))
          .map((p) => p.slug),
      };
    }).filter(Boolean),
  })).filter((g) => g.name && g.skills.length);

  return out.length ? out : [{
    name: 'Stack',
    skills: allSkills.map((s) => ({
      name: s,
      projects: projects.filter((p) => (p.stack || []).some((t) => t.toLowerCase() === s.toLowerCase())).map((p) => p.slug),
    })),
  }];
}

export function uniqueSkills(lists) {
  const seen = new Map();
  for (const s of lists.flat()) {
    if (typeof s === 'string' && !seen.has(s.toLowerCase())) {
      seen.set(s.toLowerCase(), s);
    }
  }
  return [...seen.values()];
}

// Frame checking
export function canEmbed(headers) {
  if (!headers) return true;
  if (headers.get('x-frame-options')) return false;
  const fa = headers.get('content-security-policy')?.match(/frame-ancestors([^;]*)/i)?.[1]?.trim();
  return !fa || fa.split(/\s+/).includes('*');
}

const CHROMES = [
  process.env.CHROME_PATH,
  '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  'google-chrome',
  'google-chrome-stable',
  'chromium',
].filter(Boolean);

async function screenshot(url, file) {
  for (const bin of CHROMES) {
    try {
      await promisify(execFile)(
        bin,
        ['--headless=new', '--user-data-dir=/tmp/edge-sync-profile', '--no-sandbox', '--hide-scrollbars', '--window-size=1440,900', '--timeout=15000', `--screenshot=${file}`, url],
        { timeout: 30_000 },
      );
      if ((await stat(file)).size > 15_000) return true;
      await rm(file);
      return false;
    } catch {
      // try next
    }
  }
  return false;
}

async function liveSite(slug, url) {
  const res = await fetch(url, { redirect: 'follow', signal: AbortSignal.timeout(15_000) }).catch(() => null);
  if (!res?.ok) return { live: null };
  await mkdir(SHOTS, { recursive: true });
  const shotPath = fileURLToPath(new URL(`${slug}.png`, SHOTS));
  const hasShot = await stat(shotPath).then(() => true).catch(() => false);
  const ok = hasShot || (await screenshot(url, shotPath));
  return {
    live: {
      url,
      embeddable: canEmbed(res.headers),
      shot: ok ? `/shots/${slug}.png` : null,
      checkedAt: new Date().toISOString(),
    },
  };
}

// ---------- Main Sync Routine ----------

export async function main() {
  const prev = JSON.parse(await readFile(OUT, 'utf8').catch(() => '{}'));
  const prevProjects = new Map((prev.projects ?? []).map((p) => [p.slug, p]));

  console.log(`Discovering public repositories for ${USER}...`);
  let allRepos;
  let user;
  try {
    [user, allRepos] = await Promise.all([
      gh(`/users/${USER}`),
      fetchAllRepos(USER),
    ]);
  } catch (err) {
    console.warn(`GitHub API unavailable (${err.message}). Preserving existing portfolio data.`);
    return;
  }

  const publicRepos = filterRepos(allRepos);
  const ordered = orderRepos(publicRepos);

  let changed = false;
  const projects = [];

  for (const repo of ordered) {
    const slug = normalizeSlug(repo.name);
    const old = prevProjects.get(slug);

    const facts = {
      slug,
      title: old?.title || repo.name,
      tagline: old?.tagline || repo.description || '',
      category: old?.category || 'Tools',
      summary: old?.summary || repo.description || '',
      problem: old?.problem || '',
      howItWorks: old?.howItWorks || [],
      highlights: old?.highlights || [],
      stack: old?.stack || (repo.language ? [repo.language] : []),
      url: repo.html_url,
      homepage: repo.homepage || null,
      stars: repo.stargazers_count,
      createdAt: old?.createdAt || repo.created_at,
      pushedAt: repo.pushed_at,
      private: repo.private,
    };

    // Fetch languages if not cached or repo pushed
    let languages = old?.languages;
    if (!languages || old?.pushedAt !== repo.pushed_at) {
      try {
        const langMap = await gh(`/repos/${USER}/${repo.name}/languages`);
        if (langMap && Object.keys(langMap).length > 0) {
          const total = Object.values(langMap).reduce((a, b) => a + b, 0) || 1;
          languages = Object.entries(langMap).map(([name, bytes]) => ({
            name,
            pct: Math.round((bytes / total) * 1000) / 10,
          }));
        }
      } catch {
        // preserve old languages
      }
    }
    facts.languages = languages || old?.languages || (repo.language ? [{ name: repo.language, pct: 100 }] : []);

    // Check live site if homepage exists
    let live = old?.live;
    if (facts.homepage && (!live || old?.pushedAt !== repo.pushed_at)) {
      const site = await liveSite(slug, facts.homepage);
      live = site.live;
    }
    facts.live = live || null;

    if (!old || old.pushedAt !== repo.pushed_at || old.stars !== repo.stargazers_count) {
      changed = true;
    }

    projects.push(facts);
  }

  if (projects.length !== prevProjects.size) {
    changed = true;
  }

  const profile = prev.profile || {
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
    avatar: user?.avatar_url || 'https://avatars.githubusercontent.com/u/254150727?v=4',
    github: user?.html_url || `https://github.com/${USER}`,
  };

  const skills = prev.skills || [];

  if (!changed && prev.projects?.length > 0) {
    console.log('No repository changes detected.');
    return;
  }

  const data = {
    updatedAt: new Date().toISOString(),
    profileVersion: new Date().toISOString(),
    profile: {
      ...profile,
      avatar: user?.avatar_url || profile.avatar,
      github: user?.html_url || profile.github,
    },
    projects,
    skills,
  };

  await mkdir(new URL('.', OUT), { recursive: true });
  await writeFile(OUT, JSON.stringify(data, null, 2) + '\n');
  console.log(`Successfully synced ${projects.length} projects to content/portfolio.json!`);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch((e) => {
    console.error(e);
    process.exit(1);
  });
}

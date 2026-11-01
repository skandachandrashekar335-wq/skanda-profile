import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  filterRepos,
  orderRepos,
  normalizeSlug,
  canEmbed,
  syncCatalog,
  cleanSkills,
  DISPLAY_NAMES,
  CURATED_HOMEPAGES,
  FEATURED_SLUGS,
  USER,
} from './generate.mjs';

test('filterRepos: excludes private repositories', () => {
  const repos = [
    { name: 'public-tool', private: false, fork: false, archived: false, owner: { login: USER } },
    { name: 'secret-project', private: true, fork: false, archived: false, owner: { login: USER } },
  ];
  const out = filterRepos(repos);
  assert.equal(out.length, 1);
  assert.equal(out[0].name, 'public-tool');
});

test('filterRepos: excludes forks', () => {
  const repos = [
    { name: 'own-repo', private: false, fork: false, archived: false, owner: { login: USER } },
    { name: 'forked-library', private: false, fork: true, archived: false, owner: { login: USER } },
  ];
  const out = filterRepos(repos);
  assert.equal(out.length, 1);
  assert.equal(out[0].name, 'own-repo');
});

test('filterRepos: excludes archived repositories', () => {
  const repos = [
    { name: 'active-app', private: false, fork: false, archived: false, owner: { login: USER } },
    { name: 'old-deprecated', private: false, fork: false, archived: true, owner: { login: USER } },
  ];
  const out = filterRepos(repos);
  assert.equal(out.length, 1);
  assert.equal(out[0].name, 'active-app');
});

test('filterRepos: excludes portfolio repository itself and username repo', () => {
  const repos = [
    { name: 'skanda-profile', private: false, fork: false, archived: false, owner: { login: USER } },
    { name: USER, private: false, fork: false, archived: false, owner: { login: USER } },
    { name: 'ExamGuard', private: false, fork: false, archived: false, owner: { login: USER } },
  ];
  const out = filterRepos(repos);
  assert.equal(out.length, 1);
  assert.equal(out[0].name, 'ExamGuard');
});

test('filterRepos: excludes repositories not owned by account', () => {
  const repos = [
    { name: 'own-repo', private: false, fork: false, archived: false, owner: { login: USER } },
    { name: 'someone-elses-repo', private: false, fork: false, archived: false, owner: { login: 'other-user' } },
  ];
  const out = filterRepos(repos);
  assert.equal(out.length, 1);
  assert.equal(out[0].name, 'own-repo');
});

test('orderRepos: preserves exact curated featured project order first, then sorts by pushed_at', () => {
  const repos = [
    { name: 'ReleaseLens', pushed_at: '2026-10-30T10:00:00Z' },
    { name: 'ExamGuard', pushed_at: '2026-10-03T02:00:00Z' },
    { name: 'Noctra-pdfconverter', pushed_at: '2026-11-01T14:00:00Z' },
    { name: 'SUBSTIFLOW', pushed_at: '2026-10-24T12:00:00Z' },
    { name: 'anomoly-chat', pushed_at: '2026-10-24T13:00:00Z' },
    { name: 'dscasc-ai', pushed_at: '2026-10-06T19:00:00Z' },
    { name: 'What-s-Not-Up', pushed_at: '2026-10-17T04:00:00Z' },
    { name: 'unfeatured-recent', pushed_at: '2026-11-01T20:00:00Z' },
  ];

  const ordered = orderRepos(repos);
  const slugs = ordered.map((r) => normalizeSlug(r.name));

  assert.deepEqual(slugs, [
    'substiflow',
    'noctra',
    'dscasc-ai',
    'examguard',
    'releaselens',
    'anomoly-chat',
    'whats-not-up',
    'unfeatured-recent',
  ]);
});

test('normalizeSlug handles canonical mapping for all approved projects', () => {
  assert.equal(normalizeSlug('SUBSTIFLOW'), 'substiflow');
  assert.equal(normalizeSlug('Noctra-pdfconverter'), 'noctra');
  assert.equal(normalizeSlug('dscasc-ai'), 'dscasc-ai');
  assert.equal(normalizeSlug('ExamGuard'), 'examguard');
  assert.equal(normalizeSlug('ReleaseLens'), 'releaselens');
  assert.equal(normalizeSlug('anomoly-chat'), 'anomoly-chat');
  assert.equal(normalizeSlug('What-s-Not-Up'), 'whats-not-up');
});

test('display names: assigns authentic project names without arbitrary aliases', () => {
  assert.equal(DISPLAY_NAMES['substiflow'], 'SubstiFlow');
  assert.equal(DISPLAY_NAMES['noctra'], 'Noctra');
  assert.equal(DISPLAY_NAMES['dscasc-ai'], 'DSCASC AI');
  assert.equal(DISPLAY_NAMES['examguard'], 'ExamGuard');
  assert.equal(DISPLAY_NAMES['releaselens'], 'ReleaseLens');
  assert.equal(DISPLAY_NAMES['anomoly-chat'], 'Anomoly Chat');
  assert.equal(DISPLAY_NAMES['whats-not-up'], "What's Not Up");
  assert.notEqual(DISPLAY_NAMES['whats-not-up'], 'WAVEIL');
});

test('syncCatalog: permanently removes deleted repositories (SUTRA absence)', async () => {
  // Simulate active repos returned from GitHub API: SUTRA is NOT present
  const eligibleRepos = [
    { name: 'SUBSTIFLOW', html_url: 'https://github.com/test/SUBSTIFLOW', pushed_at: '2026-10-24T12:00:00Z' },
    { name: 'dscasc-ai', html_url: 'https://github.com/test/dscasc-ai', pushed_at: '2026-10-06T19:00:00Z' },
    { name: 'Noctra-pdfconverter', html_url: 'https://github.com/test/Noctra-pdfconverter', pushed_at: '2026-11-01T14:00:00Z' },
  ];

  // Old cached portfolio data which previously contained SUTRA
  const prevData = {
    projects: [
      { slug: 'substiflow', title: 'SubstiFlow' },
      { slug: 'sutra', title: 'SUTRA' }, // Deleted repo
    ],
    skills: [
      { name: 'Languages', skills: [{ name: 'Python', projects: ['sutra', 'substiflow'] }] },
      { name: 'AI', skills: [{ name: 'Vector Embeddings', projects: ['sutra'] }] },
    ],
  };

  const catalog = await syncCatalog(eligibleRepos, prevData, {
    mockProbe: () => null,
  });

  // Verify SUTRA is not in projects
  const sutraProject = catalog.projects.find((p) => p.slug === 'sutra');
  assert.equal(sutraProject, undefined, 'SUTRA must be absent from projects');

  // Verify SUTRA is purged from skills
  const pythonSkill = catalog.skills[0].skills.find((s) => s.name === 'Python');
  assert.deepEqual(pythonSkill.projects, ['substiflow']);

  // Verify skills with only deleted projects are removed
  const aiGroup = catalog.skills.find((g) => g.name === 'AI');
  assert.equal(aiGroup, undefined, 'Skill group containing only deleted projects should be removed');
});

test('syncCatalog: preserves DSCASC AI live URL and verifies live status', async () => {
  const eligibleRepos = [
    { name: 'dscasc-ai', html_url: 'https://github.com/test/dscasc-ai', homepage: null, pushed_at: '2026-10-06T19:00:00Z' },
  ];

  const catalog = await syncCatalog(eligibleRepos, {}, {
    mockProbe: (slug, url) => {
      if (url === 'https://dscascai.vercel.app') {
        return { url, embeddable: true, shot: '/shots/dscasc-ai.png' };
      }
      return null;
    },
  });

  const dscasc = catalog.projects.find((p) => p.slug === 'dscasc-ai');
  assert.ok(dscasc);
  assert.equal(dscasc.homepage, 'https://dscascai.vercel.app');
  assert.ok(dscasc.live);
  assert.equal(dscasc.live.url, 'https://dscascai.vercel.app');
  assert.equal(dscasc.live.shot, '/shots/dscasc-ai.png');
});

test('syncCatalog: discovers new eligible public repositories automatically', async () => {
  const eligibleRepos = [
    {
      name: 'new-community-tool',
      description: 'An open-source utility discovered from GitHub',
      language: 'Go',
      html_url: 'https://github.com/test/new-community-tool',
      pushed_at: '2026-11-01T21:00:00Z',
      stargazers_count: 5,
    },
  ];

  const catalog = await syncCatalog(eligibleRepos, {}, { mockProbe: () => null });

  assert.equal(catalog.projects.length, 1);
  assert.equal(catalog.projects[0].slug, 'new-community-tool');
  assert.equal(catalog.projects[0].title, 'new-community-tool');
  assert.equal(catalog.projects[0].tagline, 'An open-source utility discovered from GitHub');
  assert.deepEqual(catalog.projects[0].stack, ['Go']);
});

test('syncCatalog: preserves curated project descriptions and case studies surviving refresh', async () => {
  const eligibleRepos = [
    { name: 'SUBSTIFLOW', html_url: 'https://github.com/test/SUBSTIFLOW', pushed_at: '2026-10-24T12:00:00Z' },
  ];

  const catalog = await syncCatalog(eligibleRepos, {}, { mockProbe: () => null });
  const substiflow = catalog.projects[0];

  assert.equal(substiflow.title, 'SubstiFlow');
  assert.ok(substiflow.summary.includes('Replaces spreadsheet-driven substitution chaos'));
  assert.ok(substiflow.problem.includes('Academic department coordinators waste hours'));
  assert.ok(substiflow.howItWorks.length >= 4);
  assert.ok(substiflow.highlights.length >= 4);
});

test('canEmbed checks framing permissions in headers', () => {
  assert.equal(canEmbed(new Headers()), true);
  assert.equal(canEmbed(new Headers({ 'x-frame-options': 'DENY' })), false);
  assert.equal(canEmbed(new Headers({ 'x-frame-options': 'SAMEORIGIN' })), false);
  assert.equal(canEmbed(new Headers({ 'content-security-policy': "frame-ancestors 'none'" })), false);
  assert.equal(canEmbed(new Headers({ 'content-security-policy': 'frame-ancestors *' })), true);
});

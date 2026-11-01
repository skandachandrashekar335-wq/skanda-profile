import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  filterRepos,
  orderRepos,
  normalizeSlug,
  buildSkills,
  uniqueSkills,
  canEmbed,
  FEATURED_SLUGS,
} from './generate.mjs';

test('filterRepos: excludes private repositories', () => {
  const repos = [
    { name: 'public-tool', private: false, fork: false, archived: false, owner: { login: 'skandachandrashekar335-wq' } },
    { name: 'secret-project', private: true, fork: false, archived: false, owner: { login: 'skandachandrashekar335-wq' } },
  ];
  const out = filterRepos(repos);
  assert.equal(out.length, 1);
  assert.equal(out[0].name, 'public-tool');
});

test('filterRepos: excludes forks', () => {
  const repos = [
    { name: 'own-repo', private: false, fork: false, archived: false, owner: { login: 'skandachandrashekar335-wq' } },
    { name: 'forked-library', private: false, fork: true, archived: false, owner: { login: 'skandachandrashekar335-wq' } },
  ];
  const out = filterRepos(repos);
  assert.equal(out.length, 1);
  assert.equal(out[0].name, 'own-repo');
});

test('filterRepos: excludes archived repositories', () => {
  const repos = [
    { name: 'active-app', private: false, fork: false, archived: false, owner: { login: 'skandachandrashekar335-wq' } },
    { name: 'old-deprecated', private: false, fork: false, archived: true, owner: { login: 'skandachandrashekar335-wq' } },
  ];
  const out = filterRepos(repos);
  assert.equal(out.length, 1);
  assert.equal(out[0].name, 'active-app');
});

test('filterRepos: excludes the portfolio repository itself and username repo', () => {
  const repos = [
    { name: 'skanda-profile', private: false, fork: false, archived: false, owner: { login: 'skandachandrashekar335-wq' } },
    { name: 'skandachandrashekar335-wq', private: false, fork: false, archived: false, owner: { login: 'skandachandrashekar335-wq' } },
    { name: 'ExamGuard', private: false, fork: false, archived: false, owner: { login: 'skandachandrashekar335-wq' } },
  ];
  const out = filterRepos(repos);
  assert.equal(out.length, 1);
  assert.equal(out[0].name, 'ExamGuard');
});

test('filterRepos: excludes repositories not owned by account', () => {
  const repos = [
    { name: 'own-repo', private: false, fork: false, archived: false, owner: { login: 'skandachandrashekar335-wq' } },
    { name: 'someone-elses-repo', private: false, fork: false, archived: false, owner: { login: 'other-user' } },
  ];
  const out = filterRepos(repos);
  assert.equal(out.length, 1);
  assert.equal(out[0].name, 'own-repo');
});

test('orderRepos: preserves curated featured project order first, then sorts by pushed_at', () => {
  const repos = [
    { name: 'ReleaseLens', pushed_at: '2026-10-30T10:00:00Z' },
    { name: 'ExamGuard', pushed_at: '2026-10-03T02:00:00Z' },
    { name: 'Noctra-pdfconverter', pushed_at: '2026-11-01T14:00:00Z' },
    { name: 'SUBSTIFLOW', pushed_at: '2026-10-24T12:00:00Z' },
    { name: 'anomoly-chat', pushed_at: '2026-10-24T13:00:00Z' },
    { name: 'dscasc-ai', pushed_at: '2026-10-06T19:00:00Z' },
    { name: 'What-s-Not-Up', pushed_at: '2026-10-17T04:00:00Z' },
  ];

  const ordered = orderRepos(repos);
  const slugs = ordered.map((r) => normalizeSlug(r.name));

  assert.deepEqual(slugs, [
    'substiflow',
    'dscasc-ai',
    'noctra',
    'waveil',
    'releaselens',
    'examguard',
    'anomoly-chat',
  ]);
});

test('normalizeSlug handles canonical mapping', () => {
  assert.equal(normalizeSlug('SUBSTIFLOW'), 'substiflow');
  assert.equal(normalizeSlug('dscasc-ai'), 'dscasc-ai');
  assert.equal(normalizeSlug('Noctra-pdfconverter'), 'noctra');
  assert.equal(normalizeSlug('What-s-Not-Up'), 'waveil');
  assert.equal(normalizeSlug('ExamGuard'), 'examguard');
  assert.equal(normalizeSlug('ReleaseLens'), 'releaselens');
  assert.equal(normalizeSlug('anomoly-chat'), 'anomoly-chat');
});

test('canEmbed checks framing permissions in headers', () => {
  assert.equal(canEmbed(new Headers()), true);
  assert.equal(canEmbed(new Headers({ 'x-frame-options': 'DENY' })), false);
  assert.equal(canEmbed(new Headers({ 'x-frame-options': 'SAMEORIGIN' })), false);
  assert.equal(canEmbed(new Headers({ 'content-security-policy': "frame-ancestors 'none'" })), false);
  assert.equal(canEmbed(new Headers({ 'content-security-policy': 'frame-ancestors *' })), true);
});

test('buildSkills maps aliases and project connections properly', () => {
  const all = uniqueSkills([['TypeScript', 'FastAPI'], ['fastapi', 'PostgreSQL']]);
  assert.deepEqual(all, ['TypeScript', 'FastAPI', 'PostgreSQL']);

  const projects = [
    { slug: 'examguard', stack: ['TypeScript', 'FastAPI', 'PostgreSQL'] },
    { slug: 'substiflow', stack: ['TypeScript'] },
  ];

  const groups = [
    { name: 'Langs', skills: [{ name: 'TypeScript' }] },
    { name: 'Backend', skills: [{ name: 'FastAPI', aliases: ['fastapi'] }] },
  ];

  const result = buildSkills(groups, all, projects);
  assert.deepEqual(result, [
    { name: 'Langs', skills: [{ name: 'TypeScript', projects: ['examguard', 'substiflow'] }] },
    { name: 'Backend', skills: [{ name: 'FastAPI', projects: ['examguard'] }] },
  ]);
});

// src/lib/portfolio-data.ts
import githubData from '@/../content/github-data.json';

export interface ProfileData {
  name: string;
  headline: string;
  title: string;
  bio: string;
  location: string;
  education: {
    degree: string;
    institution: string;
    location: string;
    period: string;
    status: string;
    coursework: string[];
  };
  avatarUrl: string;
  githubUrl: string;
  linkedinUrl: string;
  instagramUrl?: string;
  email: string;
  phone: string;
  availability: string;
}

export interface FeaturedProject {
  id: string;
  name: string;
  slug: string;
  repoName: string;
  category: string;
  status: string;
  statusLabel: string;
  shortDescription: string;
  description: string;
  problem: string;
  architecture: string;
  keyDecisions: string[];
  qaEvidence: string[];
  technologies: string[];
  github: string;
  demo?: string;
  release?: string;
  pushedAt: string;
  createdAt?: string;
  stars: number;
  forks: number;
  languages?: Array<{ name: string; pct: number }>;
}

export interface DiscoveredRepository {
  name: string;
  description: string;
  url: string;
  homepage?: string | null;
  language: string;
  stars: number;
  forks: number;
  pushedAt: string;
  isFork: boolean;
}

export interface SkillCategory {
  category: string;
  items: Array<{
    name: string;
    level?: string;
    projects: string[];
  }>;
}

export function getPortfolioData() {
  return githubData as {
    updatedAt: string;
    profile: ProfileData;
    featuredProjects: FeaturedProject[];
    discoveredRepositories: DiscoveredRepository[];
    skills: SkillCategory[];
  };
}

export function getProfile(): ProfileData {
  return getPortfolioData().profile;
}

export function getFeaturedProjects(): FeaturedProject[] {
  return getPortfolioData().featuredProjects;
}

export function getFeaturedProjectBySlug(slug: string): FeaturedProject | undefined {
  return getFeaturedProjects().find((p) => p.slug === slug || p.id === slug);
}

export function getDiscoveredRepositories(): DiscoveredRepository[] {
  return getPortfolioData().discoveredRepositories;
}

export function getSkills(): SkillCategory[] {
  return getPortfolioData().skills;
}

export function formatDate(isoString?: string): string {
  if (!isoString) return '';
  try {
    const d = new Date(isoString);
    return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  } catch {
    return isoString;
  }
}

export function formatYear(isoString?: string): string {
  if (!isoString) return '';
  try {
    return new Date(isoString).getFullYear().toString();
  } catch {
    return '';
  }
}

export function padZero(num: number): string {
  return num < 10 ? `0${num}` : `${num}`;
}

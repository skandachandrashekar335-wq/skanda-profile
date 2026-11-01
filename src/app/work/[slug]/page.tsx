import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  getFeaturedProjects,
  getFeaturedProjectBySlug,
  formatDate,
  padZero,
} from '@/lib/portfolio-data';
import Navigation from '@/components/Navigation';
import ScrollProgress from '@/components/ScrollProgress';
import Footer from '@/components/Footer';

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  const projects = getFeaturedProjects();
  return projects.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getFeaturedProjectBySlug(slug);

  if (!project) {
    return {
      title: 'Project Not Found — Skanda Chandrashekhar',
    };
  }

  return {
    title: `${project.name} — Skanda Chandrashekhar`,
    description: project.shortDescription || project.description,
    openGraph: {
      title: `${project.name} | Portfolio of Skanda Chandrashekhar`,
      description: project.shortDescription || project.description,
      type: 'article',
    },
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = getFeaturedProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const allProjects = getFeaturedProjects();
  const currentIndex = allProjects.findIndex((p) => p.slug === project.slug);
  const nextProject = allProjects[(currentIndex + 1) % allProjects.length];
  const projectIndexStr = padZero(currentIndex + 1);
  const totalProjectsStr = padZero(allProjects.length);

  return (
    <div className="min-h-screen bg-warm-bg text-warm-ink flex flex-col font-sans selection:bg-warm-rust/15 selection:text-warm-ink">
      <ScrollProgress />
      <Navigation />

      <main className="flex-1 max-w-6xl mx-auto px-6 sm:px-8 py-12 md:py-16 w-full">
        {/* Breadcrumb & Navigation Back */}
        <div className="flex items-center justify-between pb-8 border-b border-warm-line/60 text-xs text-warm-muted">
          <Link
            href="/#work"
            className="group inline-flex items-center gap-1.5 text-warm-secondary hover:text-warm-rust transition-colors font-medium"
          >
            <span className="transition-transform group-hover:-translate-x-0.5">←</span>
            <span>Back to Selected Work</span>
          </Link>
          <div className="font-mono text-warm-muted text-[11px] tracking-widest uppercase">
            Project {projectIndexStr} / {totalProjectsStr}
          </div>
        </div>

        {/* Header Block */}
        <div className="pt-10 pb-12 border-b border-warm-line/60">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="font-mono text-xs uppercase tracking-wider text-warm-rust font-semibold">
              {project.category}
            </span>
            <span className="text-warm-line text-sm">•</span>
            <span className="inline-flex items-center px-2 py-0.5 text-[10px] font-mono tracking-wider uppercase rounded-full bg-warm-surface border border-warm-line text-warm-secondary">
              {project.statusLabel}
            </span>
            {project.pushedAt && (
              <>
                <span className="text-warm-line text-sm">•</span>
                <span className="text-xs text-warm-muted font-mono">
                  Updated {formatDate(project.pushedAt)}
                </span>
              </>
            )}
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-light text-warm-ink tracking-tight mb-6">
            {project.name}
          </h1>

          <p className="text-lg sm:text-xl text-warm-secondary max-w-3xl leading-relaxed">
            {project.shortDescription}
          </p>
        </div>

        {/* Content Layout: 2 Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-12">
          {/* Main Content Column */}
          <div className="lg:col-span-8 space-y-12">
            {/* Overview */}
            <section>
              <h2 className="font-mono text-xs uppercase tracking-widest text-warm-muted mb-4 font-semibold">
                Overview
              </h2>
              <div className="text-base sm:text-lg text-warm-ink leading-relaxed font-light">
                <p>{project.description}</p>
              </div>
            </section>

            {/* The Problem */}
            <section className="bg-warm-surface border border-warm-line rounded-lg p-6 sm:p-8">
              <h2 className="font-mono text-xs uppercase tracking-widest text-warm-rust mb-3 font-semibold">
                The Problem
              </h2>
              <p className="text-warm-secondary leading-relaxed text-sm sm:text-base">
                {project.problem}
              </p>
            </section>

            {/* Architecture & Technical Decisions */}
            <section>
              <h2 className="font-mono text-xs uppercase tracking-widest text-warm-muted mb-4 font-semibold">
                Architecture & Key Decisions
              </h2>
              <p className="text-warm-secondary text-sm sm:text-base leading-relaxed mb-6">
                {project.architecture}
              </p>

              {project.keyDecisions && project.keyDecisions.length > 0 && (
                <div className="space-y-4">
                  {project.keyDecisions.map((decision, idx) => (
                    <div
                      key={idx}
                      className="flex gap-4 p-4 rounded-md border border-warm-line/60 bg-warm-surface/40 hover:bg-warm-surface transition-colors"
                    >
                      <span className="font-mono text-xs text-warm-rust font-semibold pt-0.5">
                        {padZero(idx + 1)}.
                      </span>
                      <p className="text-sm text-warm-ink leading-relaxed">{decision}</p>
                    </div>
                  ))}
                </div>
              )}
            </section>

            {/* Verification & QA Evidence */}
            <section className="border-t border-warm-line/60 pt-10">
              <div className="flex items-center gap-3 mb-4">
                <h2 className="font-mono text-xs uppercase tracking-widest text-warm-muted font-semibold">
                  Verification & QA Evidence
                </h2>
                <span className="px-2 py-0.5 text-[10px] font-mono tracking-wider uppercase rounded bg-warm-surface border border-warm-line text-warm-rust">
                  Testing Rigor
                </span>
              </div>

              <div className="space-y-3">
                {project.qaEvidence && project.qaEvidence.length > 0 ? (
                  project.qaEvidence.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex gap-3 items-start p-4 bg-warm-surface/30 border border-warm-line/60 rounded-md"
                    >
                      <svg
                        className="w-4 h-4 text-warm-rust shrink-0 mt-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-sm text-warm-secondary leading-relaxed">
                        {item}
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-warm-muted">
                    Automated integration test suites and manual validation logs recorded in repository.
                  </p>
                )}
              </div>
            </section>
          </div>

          {/* Aside Column (Metadata & Links) */}
          <div className="lg:col-span-4">
            <div className="sticky top-24 space-y-8 bg-warm-surface/50 border border-warm-line p-6 rounded-lg">
              {/* Project Actions */}
              <div>
                <h3 className="font-mono text-[11px] uppercase tracking-wider text-warm-muted font-semibold mb-3">
                  Repository & Artifacts
                </h3>
                <div className="space-y-2.5">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between w-full px-4 py-2.5 bg-warm-ink text-warm-bg rounded text-xs font-medium hover:bg-warm-secondary transition-colors"
                    >
                      <span className="flex items-center gap-2">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                        </svg>
                        <span>View Source Code</span>
                      </span>
                      <span className="font-mono text-[11px] text-warm-bg/70">↗</span>
                    </a>
                  )}

                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between w-full px-4 py-2.5 bg-warm-surface border border-warm-line rounded text-xs font-medium text-warm-ink hover:border-warm-secondary transition-colors"
                    >
                      <span className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                        <span>Open Live Demo</span>
                      </span>
                      <span className="font-mono text-[11px] text-warm-muted">↗</span>
                    </a>
                  )}

                  {project.release && (
                    <a
                      href={project.release}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between w-full px-4 py-2.5 bg-warm-surface border border-warm-line rounded text-xs font-medium text-warm-ink hover:border-warm-secondary transition-colors"
                    >
                      <span>Download Latest Release</span>
                      <span className="font-mono text-[11px] text-warm-muted">↗</span>
                    </a>
                  )}
                </div>
              </div>

              {/* Technologies */}
              <div>
                <h3 className="font-mono text-[11px] uppercase tracking-wider text-warm-muted font-semibold mb-3">
                  Technologies
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 text-xs rounded bg-warm-bg border border-warm-line/80 text-warm-secondary font-mono"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Language Breakdown */}
              {project.languages && project.languages.length > 0 && (
                <div>
                  <h3 className="font-mono text-[11px] uppercase tracking-wider text-warm-muted font-semibold mb-3">
                    Codebase Breakdown
                  </h3>
                  <div className="space-y-2">
                    {project.languages.map((lang) => (
                      <div key={lang.name}>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-warm-ink font-medium">{lang.name}</span>
                          <span className="font-mono text-warm-muted">{lang.pct}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-warm-line/60 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-warm-rust rounded-full"
                            style={{ width: `${lang.pct}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Project Metadata */}
              <div className="border-t border-warm-line/60 pt-4 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-warm-muted">Category</span>
                  <span className="text-warm-ink font-mono">{project.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-warm-muted">Status</span>
                  <span className="text-warm-ink font-mono">{project.statusLabel}</span>
                </div>
                {project.stars !== undefined && project.stars > 0 && (
                  <div className="flex justify-between">
                    <span className="text-warm-muted">GitHub Stars</span>
                    <span className="text-warm-ink font-mono">{project.stars}</span>
                  </div>
                )}
                {project.forks !== undefined && project.forks > 0 && (
                  <div className="flex justify-between">
                    <span className="text-warm-muted">Forks</span>
                    <span className="text-warm-ink font-mono">{project.forks}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Pagination: Next Project */}
        <div className="mt-20 pt-10 border-t border-warm-line/60">
          <Link
            href={`/work/${nextProject.slug}`}
            className="group block p-8 rounded-lg bg-warm-surface/60 border border-warm-line hover:border-warm-rust hover:bg-warm-surface transition-all"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-xs uppercase tracking-widest text-warm-muted group-hover:text-warm-rust transition-colors font-semibold">
                Next Project →
              </span>
              <span className="font-mono text-xs text-warm-muted">
                {nextProject.category}
              </span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl text-warm-ink group-hover:text-warm-rust transition-colors mb-2">
              {nextProject.name}
            </h3>
            <p className="text-sm text-warm-secondary max-w-2xl line-clamp-2">
              {nextProject.shortDescription}
            </p>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}

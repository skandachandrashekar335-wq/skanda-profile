"use client";

import Link from "next/link";
import { FeaturedProject, padZero } from "@/lib/portfolio-data";

interface ProjectIndexProps {
  projects: FeaturedProject[];
}

export default function ProjectIndex({ projects }: ProjectIndexProps) {
  return (
    <div className="project-list" role="list">
      {projects.map((project, index) => {
        return (
          <article
            key={project.id}
            className="project-row group"
            role="listitem"
            aria-labelledby={`project-title-${project.id}`}
          >
            <div className="project-row-num">
              <span>{padZero(index + 1)}</span>
            </div>

            <div className="project-row-title-block">
              <div className="flex items-center gap-2 mb-1">
                <span className="project-row-cat">{project.category}</span>
                <span className={`status-badge ${project.status === 'deployed' || project.status === 'completed' ? 'active' : ''}`}>
                  {project.statusLabel}
                </span>
              </div>
              <h3 id={`project-title-${project.id}`}>
                <Link
                  href={`/work/${project.slug}`}
                  className="hover:text-[var(--accent)] transition-colors focus-visible:outline-none focus-visible:underline"
                >
                  {project.name}
                </Link>
              </h3>
            </div>

            <div className="project-row-desc">
              <p>{project.shortDescription}</p>
            </div>

            <div className="project-row-stack">
              {project.technologies.slice(0, 4).map((tech) => (
                <span key={tech} className="tech-chip">
                  {tech}
                </span>
              ))}
              {project.technologies.length > 4 && (
                <span className="tech-chip text-[var(--ink-3)]">
                  +{project.technologies.length - 4}
                </span>
              )}
            </div>

            <div className="project-row-action">
              <div className="flex items-center gap-3">
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-[var(--accent)] hover:underline flex items-center gap-1 font-mono uppercase"
                    aria-label={`Open ${project.name} live demo`}
                  >
                    Demo ↗
                  </a>
                )}
                <Link
                  href={`/work/${project.slug}`}
                  className="text-xs text-[var(--ink)] hover:text-[var(--accent)] transition-colors flex items-center gap-1 font-mono uppercase font-medium"
                >
                  View Details →
                </Link>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}

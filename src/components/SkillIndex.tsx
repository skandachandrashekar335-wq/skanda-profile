"use client";

import { useState } from "react";
import Link from "next/link";
import { SkillCategory, FeaturedProject } from "@/lib/portfolio-data";

interface SkillIndexProps {
  skills: SkillCategory[];
  projects: FeaturedProject[];
}

export default function SkillIndex({ skills, projects }: SkillIndexProps) {
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);

  // Find which projects match the selected skill
  const matchingProjectSlugs = new Set<string>();
  if (selectedSkill) {
    for (const cat of skills) {
      for (const item of cat.items) {
        if (item.name.toLowerCase() === selectedSkill.toLowerCase()) {
          item.projects.forEach((slug) => matchingProjectSlugs.add(slug));
        }
      }
    }
  }

  return (
    <div className="flex flex-col gap-8">
      {/* Evidence Banner if skill is selected */}
      {selectedSkill && (
        <div className="p-4 bg-[var(--paper-2)] border border-[var(--accent)] rounded-sm flex items-center justify-between flex-wrap gap-4 transition-all">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs uppercase text-[var(--accent)]">Skill Evidence:</span>
            <span className="font-serif text-lg text-[var(--ink)] font-medium">{selectedSkill}</span>
            <span className="text-xs text-[var(--ink-2)]">
              used in {matchingProjectSlugs.size} project{matchingProjectSlugs.size === 1 ? "" : "s"}:
            </span>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            {Array.from(matchingProjectSlugs).map((slug) => {
              const proj = projects.find((p) => p.slug === slug);
              if (!proj) return null;
              return (
                <Link
                  key={slug}
                  href={`/work/${slug}`}
                  className="px-2.5 py-1 text-xs font-mono uppercase bg-[var(--paper)] border border-[var(--line-strong)] text-[var(--accent)] hover:border-[var(--accent)] hover:bg-[var(--accent-soft)] transition-colors"
                >
                  {proj.name} →
                </Link>
              );
            })}
            <button
              type="button"
              onClick={() => setSelectedSkill(null)}
              className="text-xs font-mono text-[var(--ink-3)] hover:text-[var(--ink)] ml-2 underline"
            >
              Clear
            </button>
          </div>
        </div>
      )}

      {/* Skills Grid */}
      <div className="skills-grid">
        {skills.map((category) => (
          <div key={category.category} className="skill-category-card">
            <h3 className="skill-cat-title">{category.category}</h3>
            <ul className="skill-item-list">
              {category.items.map((item) => {
                const isSelected = selectedSkill?.toLowerCase() === item.name.toLowerCase();
                const hasProjects = item.projects.length > 0;

                return (
                  <li key={item.name}>
                    <button
                      type="button"
                      className={`skill-item-row w-full text-left p-1.5 rounded-sm transition-colors ${
                        isSelected
                          ? "bg-[var(--accent-soft)] text-[var(--accent)]"
                          : "hover:bg-[var(--paper-3)]"
                      }`}
                      onClick={() => setSelectedSkill(isSelected ? null : item.name)}
                      aria-pressed={isSelected}
                    >
                      <span className="font-medium text-[var(--ink)]">{item.name}</span>
                      <div className="flex items-center gap-2">
                        {item.level && (
                          <span className="text-[10px] font-mono text-[var(--ink-3)] uppercase tracking-wider">
                            {item.level}
                          </span>
                        )}
                        {hasProjects && (
                          <span className="skill-evidence-tag">
                            {item.projects.length} {item.projects.length === 1 ? "build" : "builds"}
                          </span>
                        )}
                      </div>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

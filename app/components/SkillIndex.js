'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function SkillIndex({ skills, projects }) {
  const [picked, setPicked] = useState(null);
  const title = new Map(projects.map((p) => [p.slug, p.title]));

  return (
    <div className="skills">
      {skills.map((g, gi) => {
        const open = g.skills.find((s) => s.name === picked);
        return (
          <div key={g.name} className="skill-group" data-reveal style={{ '--d': gi }}>
            <h3>{g.name}</h3>
            <ul>
              {g.skills.map((s) => (
                <li key={s.name}>
                  <button type="button" aria-pressed={picked === s.name} onClick={() => setPicked(picked === s.name ? null : s.name)}>
                    {s.name}
                    {s.projects.length > 0 && <sup>{s.projects.length}</sup>}
                  </button>
                </li>
              ))}
            </ul>
            <div className={`skill-used${open ? ' on' : ''}`} aria-live="polite">
              <div>
                {open && (open.projects.length
                  ? <p>Used in {open.projects.map((slug, i) => (
                      <span key={slug}>{i > 0 && ', '}<Link href={`/work/${slug}`}>{title.get(slug)}</Link></span>
                    ))}.</p>
                  : <p>Part of my working stack, not yet in a public repo.</p>)}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

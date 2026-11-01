import Link from 'next/link';
import { notFound } from 'next/navigation';
import { projects, fmtDate, year, pad } from '../../lib';
import Cover from '../../components/Cover';
import LivePreview from '../../components/LivePreview';

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  return p ? { title: p.title, description: p.tagline } : {};
}

export default async function Project({ params }) {
  const { slug } = await params;
  const i = projects.findIndex((x) => x.slug === slug);
  if (i < 0) notFound();
  const p = projects[i];
  const next = projects[(i + 1) % projects.length];

  return (
    <article className="wrap project">
      <Link href="/#work" className="back hero-in" style={{ '--d': 0 }}>← All work</Link>
      <p className="label hero-in" style={{ '--d': 1 }}>{pad(i + 1)} · {p.category} · {year(p.createdAt)}</p>
      <h1 className="project-title hero-in" style={{ '--d': 2 }}>{p.title}</h1>
      <p className="project-tag hero-in" style={{ '--d': 3 }}>{p.tagline}</p>

      <div className="project-grid">
        <aside className="meta hero-in" style={{ '--d': 4 }}>
          {p.languages && p.languages.length > 0 && (
            <div>
              <h2>Languages</h2>
              <div className="langbar" role="img" aria-label={p.languages.map((l) => `${l.name} ${l.pct}%`).join(', ')}>
                {p.languages.map((l) => <span key={l.name} style={{ flexGrow: l.pct }} />)}
              </div>
              <ul className="langs">
                {p.languages.slice(0, 5).map((l) => <li key={l.name}><span className="dot" />{l.name}<span>{l.pct}%</span></li>)}
              </ul>
            </div>
          )}
          {p.stack && p.stack.length > 0 && (
            <div>
              <h2>Stack</h2>
              <ul className="chips">{p.stack.map((s) => <li key={s}>{s}</li>)}</ul>
            </div>
          )}
          <div>
            <h2>Timeline</h2>
            <p>Started {fmtDate(p.createdAt)}<br />Last commit {fmtDate(p.pushedAt)}</p>
          </div>
          <div className="links">
            {p.live && <a href={p.live.url} target="_blank" rel="noreferrer">Visit live site ↗</a>}
            {p.private ? <span className="muted">Private repository</span> : <a href={p.url} target="_blank" rel="noreferrer">Source on GitHub ↗</a>}
          </div>
        </aside>

        <div className="body">
          <div className="hero-in" style={{ '--d': 4 }}>
            {p.live && (p.live.shot || p.live.embeddable) ? <LivePreview live={p.live} title={p.title} /> : <Cover p={p} n={i + 1} className="cover-lg" />}
          </div>
          {p.summary && (<section data-reveal><h2>Overview</h2><p className="big">{p.summary}</p></section>)}
          {p.problem && (<section data-reveal><h2>The problem</h2><p>{p.problem}</p></section>)}
          {p.howItWorks && p.howItWorks.length > 0 && (
            <section data-reveal>
              <h2>How it works</h2>
              <ol className="steps">{p.howItWorks.map((s, k) => <li key={k}><span className="num">{pad(k + 1)}</span><p>{s}</p></li>)}</ol>
            </section>
          )}
          {p.highlights && p.highlights.length > 0 && (
            <section data-reveal>
              <h2>Engineering notes</h2>
              <ul className="notes">{p.highlights.map((h, k) => <li key={k}>{h}</li>)}</ul>
            </section>
          )}
        </div>
      </div>

      <Link href={`/work/${next.slug}`} className="next" data-reveal>
        <span className="label">Next project</span>
        <span className="next-title">{next.title} <span aria-hidden>→</span></span>
      </Link>
    </article>
  );
}

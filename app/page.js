import { profile, projects, skills, pad } from './lib';
import ProjectIndex from './components/ProjectIndex';
import SkillIndex from './components/SkillIndex';

export default function Home() {
  const words = profile.name.split(' ');
  // Each word is masked separately so the line can wrap on small screens.
  const tagline = `builds ${profile.headline}.`.split(' ');
  return (
    <>
      <section className="hero wrap">
        <p className="label hero-in" style={{ '--d': 0 }}>Portfolio · {projects.length} projects, synced from GitHub</p>
        <h1 className="hero-title">
          {words.map((w, i) => (
            <span key={i} className="word"><span style={{ '--d': i + 1 }}>{w}</span></span>
          ))}
          <br />
          <em>
            {tagline.map((w, i) => (
              <span key={i} className="word"><span style={{ '--d': words.length + 1 + i * 0.4 }}>{w}</span></span>
            ))}
          </em>
        </h1>
        <div className="hero-foot">
          <p className="lede hero-in" style={{ '--d': words.length + 3 }}>{profile.intro}</p>
          <dl className="facts hero-in" style={{ '--d': words.length + 4 }}>
            {profile.education && (<div><dt>Studying</dt><dd>{profile.education}</dd></div>)}
            {profile.availability && (<div><dt>Open to</dt><dd>{profile.availability}</dd></div>)}
          </dl>
        </div>
      </section>

      {profile.now.length > 0 && (
        <section className="wrap section" aria-labelledby="now">
          <div className="section-head" data-reveal>
            <h2 id="now">Currently</h2>
            <span className="rule" />
          </div>
          <ol className="now">
            {profile.now.map((n, i) => (
              <li key={n.title} data-reveal style={{ '--d': i }}>
                <span className="num">{pad(i + 1)}</span>
                <h3>{n.title}</h3>
                <p>{n.body}</p>
              </li>
            ))}
          </ol>
        </section>
      )}

      <section id="work" className="wrap section" aria-labelledby="work-h">
        <div className="section-head" data-reveal>
          <h2 id="work-h">Selected work</h2>
          <span className="rule" />
          <span className="count">{pad(projects.length)}</span>
        </div>
        <ProjectIndex projects={projects.map(({ slug, title, tagline, category, pushedAt, live }) => ({ slug, title, tagline, category, pushedAt, live: !!live, shot: live?.shot ?? null }))} />
      </section>

      <section id="skills" className="wrap section" aria-labelledby="skills-h">
        <div className="section-head" data-reveal>
          <h2 id="skills-h">Skills, with evidence</h2>
          <span className="rule" />
        </div>
        <p className="aside" data-reveal>Every skill below comes from code I&apos;ve shipped. Pick one to see the projects that use it.</p>
        <SkillIndex skills={skills} projects={projects.map(({ slug, title }) => ({ slug, title }))} />
      </section>

      <section id="contact" className="wrap section contact" aria-labelledby="contact-h">
        <p className="label" data-reveal>Contact</p>
        <h2 id="contact-h" className="contact-title" data-reveal>Let&apos;s build <em>dependable software.</em></h2>
        {profile.email && (<a className="contact-mail" href={`mailto:${profile.email}`} data-reveal>{profile.email}</a>)}
        <ul className="contact-links" data-reveal>
          {profile.linkedin && <li><a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a></li>}
          <li><a href={profile.github} target="_blank" rel="noreferrer">GitHub ↗</a></li>
        </ul>
      </section>
    </>
  );
}

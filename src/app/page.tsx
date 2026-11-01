import Navigation from "@/components/Navigation";
import ScrollProgress from "@/components/ScrollProgress";
import ProjectIndex from "@/components/ProjectIndex";
import SkillIndex from "@/components/SkillIndex";
import EmailCopyButton from "@/components/EmailCopyButton";
import Footer from "@/components/Footer";
import {
  getProfile,
  getFeaturedProjects,
  getDiscoveredRepositories,
  getSkills,
  getPortfolioData,
  formatDate,
} from "@/lib/portfolio-data";

export default function Home() {
  const data = getPortfolioData();
  const profile = getProfile();
  const featuredProjects = getFeaturedProjects();
  const discoveredRepos = getDiscoveredRepositories();
  const skills = getSkills();

  return (
    <>
      <ScrollProgress />
      <Navigation />

      <main id="main-content">
        {/* HERO */}
        <section className="hero wrap" aria-labelledby="hero-title">
          <div className="hero-eyebrow">
            <span className="label">PORTFOLIO</span>
            <span className="text-xs text-[var(--ink-3)] font-mono">/</span>
            <span className="label">BANGALORE, INDIA</span>
            <span className="text-xs text-[var(--ink-3)] font-mono">/</span>
            <span className="label text-[var(--accent)]">5 FEATURED BUILDS</span>
          </div>

          <h1 id="hero-title" className="hero-title">
            SKANDA CHANDRASHEKHAR
            <br />
            <span className="text-[clamp(32px,5.5vw,76px)] font-normal text-[var(--ink)] block mt-3">
              Software developer building <em className="italic-accent">useful systems.</em>
            </span>
          </h1>

          <div className="hero-grid">
            <div>
              <p className="hero-lede">
                I work across software development, AI automation, and software quality. I turn ideas into working software, test systems rigorously, debug problems, and iterate on dependable results.
              </p>
              <div className="hero-actions">
                <a href="#work" className="btn-primary">
                  View Selected Work ↓
                </a>
                <a
                  href={profile.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary"
                >
                  GitHub ↗
                </a>
                <a
                  href={profile.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary"
                >
                  LinkedIn ↗
                </a>
              </div>
            </div>

            <dl className="hero-facts">
              <div className="hero-fact-group">
                <dt>Current Status</dt>
                <dd className="font-medium text-[var(--ink)] flex items-center gap-2">
                  <span className="pulse-dot" />
                  <span>Open to Internships (Dev, QA, AI)</span>
                </dd>
              </div>

              <div className="hero-fact-group">
                <dt>Education</dt>
                <dd>
                  BCA Student · Dayananda Sagar College of Arts, Science &amp; Commerce, Bangalore
                </dd>
              </div>

              <div className="hero-fact-group">
                <dt>Core Technical Focus</dt>
                <dd>Full-Stack Systems, Test Automation, Deterministic NLP, Computer Vision</dd>
              </div>
            </dl>
          </div>
        </section>

        {/* ABOUT */}
        <section id="about" className="section-block wrap" aria-labelledby="about-heading">
          <div className="section-header">
            <div className="flex items-center gap-3">
              <span className="num">01</span>
              <h2 id="about-heading" className="section-title">
                About &amp; Engineering Philosophy
              </h2>
            </div>
            <span className="section-count">[PERSPECTIVE]</span>
          </div>

          <div className="about-grid">
            <div className="about-narrative">
              <p>
                I am a <strong>Bachelor of Computer Applications (BCA)</strong> student based in Bangalore, building practical software systems across web development, computer vision, and quality assurance.
              </p>
              <p>
                Rather than chasing speculative hype or building superficial prototypes, I focus on software that solves concrete workflow problems: examination identity verification, college timetable conflict resolution, visual browser privacy, and explainable student guidance bots.
              </p>
              <p>
                My approach to software engineering is grounded in <strong>verification</strong>. Writing code is only half the battle; ensuring it behaves correctly across failure boundaries, writing reproducible automated tests, and diagnosing edge cases is what separates an experiment from dependable software.
              </p>
            </div>

            <div className="about-principles">
              <div className="principle-card">
                <h3 className="principle-title">1. Working Systems over Prototypes</h3>
                <p className="principle-desc">
                  I prioritize deployable, working software with typed domain models, server-side authorization, and robust persistence over cosmetic mockups.
                </p>
              </div>

              <div className="principle-card">
                <h3 className="principle-title">2. Verification as a Habit</h3>
                <p className="principle-desc">
                  Testing isn&apos;t an afterthought. From backend test suites with thousands of assertions to DOM mutation stress-tests, I verify behavior systematically.
                </p>
              </div>

              <div className="principle-card">
                <h3 className="principle-title">3. Determinism &amp; Explainability</h3>
                <p className="principle-desc">
                  Where algorithms or models are used, I favor deterministic scoring, inspectable vector pipelines, and clear human-in-the-loop audit trails over ungrounded black boxes.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SELECTED WORK */}
        <section id="work" className="section-block wrap" aria-labelledby="work-heading">
          <div className="section-header">
            <div className="flex items-center gap-3">
              <span className="num">02</span>
              <h2 id="work-heading" className="section-title">
                Selected Work
              </h2>
            </div>
            <span className="section-count">[05 APPROVED BUILDS]</span>
          </div>

          <p className="text-[var(--ink-2)] text-base max-w-[65ch] mb-8">
            Five production-grade applications built to address real-world workflows. Each project represents full end-to-end implementation with verified architecture and test evidence.
          </p>

          <ProjectIndex projects={featuredProjects} />
        </section>

        {/* DISCOVERED REPOSITORIES */}
        {discoveredRepos.length > 0 && (
          <section className="section-block wrap" aria-labelledby="other-repos-heading">
            <div className="section-header">
              <div className="flex items-center gap-3">
                <span className="num">03</span>
                <h2 id="other-repos-heading" className="section-title">
                  Other Public Repositories &amp; Experiments
                </h2>
              </div>
              <span className="section-count">[{discoveredRepos.length} REPOSITORIES]</span>
            </div>

            <p className="text-[var(--ink-2)] text-sm max-w-[65ch] mb-8">
              Additional public repositories synced automatically from my GitHub account, covering computer vision libraries, utility tools, and open-source experiments.
            </p>

            <div className="repos-grid">
              {discoveredRepos.map((repo) => (
                <div key={repo.name} className="repo-card">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] font-mono uppercase text-[var(--accent)] tracking-wider">
                        {repo.language}
                      </span>
                      {repo.stars > 0 && (
                        <span className="text-xs font-mono text-[var(--ink-3)]">
                          ★ {repo.stars}
                        </span>
                      )}
                    </div>
                    <h3>
                      <a
                        href={repo.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-[var(--accent)] transition-colors"
                      >
                        {repo.name} ↗
                      </a>
                    </h3>
                    <p>{repo.description}</p>
                  </div>

                  <div className="repo-card-meta">
                    <span>Updated {formatDate(repo.pushedAt)}</span>
                    <a
                      href={repo.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[var(--accent)] hover:underline"
                    >
                      View on GitHub →
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* SKILLS */}
        <section id="skills" className="section-block wrap" aria-labelledby="skills-heading">
          <div className="section-header">
            <div className="flex items-center gap-3">
              <span className="num">04</span>
              <h2 id="skills-heading" className="section-title">
                Technical Capabilities, with Evidence
              </h2>
            </div>
            <span className="section-count">[VERIFIED STACK]</span>
          </div>

          <p className="text-[var(--ink-2)] text-base max-w-[68ch] mb-8">
            Every technical skill listed below is backed by shipped source code. Click any capability below to view the verified projects that implement it.
          </p>

          <SkillIndex skills={skills} projects={featuredProjects} />
        </section>

        {/* QA / SOFTWARE TESTING */}
        <section id="qa" className="section-block wrap" aria-labelledby="qa-heading">
          <div className="section-header">
            <div className="flex items-center gap-3">
              <span className="num">05</span>
              <h2 id="qa-heading" className="section-title">
                Quality Assurance &amp; Testing Discipline
              </h2>
            </div>
            <span className="section-count">[METHODOLOGY]</span>
          </div>

          <div className="mb-12">
            <p className="text-[var(--ink-2)] text-base max-w-[70ch] mb-8">
              A commitment to software quality is central to how I build. I treat testing not as a final chore before shipping, but as the governing framework that guides architecture and validates reliability.
            </p>

            {/* QA Workflow */}
            <div className="qa-workflow">
              <div className="qa-step-card">
                <div className="qa-step-num">STEP 01</div>
                <div className="qa-step-title">REQUIREMENTS &amp; BOUNDARIES</div>
                <p className="text-xs text-[var(--ink-3)] mt-2">
                  Deconstruct domain workflows into typed boundaries, input validation rules, and failure states.
                </p>
              </div>

              <div className="qa-step-card">
                <div className="qa-step-num">STEP 02</div>
                <div className="qa-step-title">TEST CASE DESIGN</div>
                <p className="text-xs text-[var(--ink-3)] mt-2">
                  Formulate positive, negative, and edge-case test matrices prior to implementation.
                </p>
              </div>

              <div className="qa-step-card">
                <div className="qa-step-num">STEP 03</div>
                <div className="qa-step-title">AUTOMATED EXECUTION</div>
                <p className="text-xs text-[var(--ink-3)] mt-2">
                  Execute unit, property, and integration suites (pytest, Vitest) against critical business logic.
                </p>
              </div>

              <div className="qa-step-card">
                <div className="qa-step-num">STEP 04</div>
                <div className="qa-step-title">BUG REPORTING &amp; ISOLATION</div>
                <p className="text-xs text-[var(--ink-3)] mt-2">
                  Reproduce defects with minimal test cases, log clear triage reports, and apply clean fixes.
                </p>
              </div>

              <div className="qa-step-card">
                <div className="qa-step-num">STEP 05</div>
                <div className="qa-step-title">REGRESSION VERIFICATION</div>
                <p className="text-xs text-[var(--ink-3)] mt-2">
                  Run full regression sweeps to confirm bug fixes do not introduce side-effect regressions.
                </p>
              </div>
            </div>

            {/* Practical Pillars */}
            <div className="qa-pillars-grid">
              <div className="qa-pillar-card">
                <h3>Test Case Design &amp; Functional Testing</h3>
                <p>
                  Every feature begins with identifying boundary conditions, invalid payloads, and race hazards. In <strong>ExamGuard</strong>, this resulted in 2,554 backend tests covering role escalation, seating assignment conflicts, and ticket tampering prevention.
                </p>
                <ul>
                  <li>Equivalence partitioning &amp; boundary value analysis</li>
                  <li>Role-based access matrix validation (Admin vs Invigilator vs Candidate)</li>
                  <li>State machine transitions for ticket and session states</li>
                </ul>
              </div>

              <div className="qa-pillar-card">
                <h3>Resilience &amp; Edge-Case Verification</h3>
                <p>
                  In <strong>SubstiFlow</strong>, the substitution engine is validated against circular conflicts, zero-teacher availability scenarios, and transaction rollbacks in SQLite to guarantee zero master timetable corruption.
                </p>
                <ul>
                  <li>Mutation-aware DOM testing in <em>What&apos;s Not Up</em> for dynamic SPA chat feeds</li>
                  <li>Cryptographic SHA-256 binary validation in <em>Anomoly Chat</em> across chunked WebRTC packets</li>
                  <li>Structured fallback verification in <em>DSCASC AI</em> for low-confidence queries</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* EDUCATION */}
        <section id="education" className="section-block wrap" aria-labelledby="edu-heading">
          <div className="section-header">
            <div className="flex items-center gap-3">
              <span className="num">06</span>
              <h2 id="edu-heading" className="section-title">
                Academic Foundation
              </h2>
            </div>
            <span className="section-count">[EDUCATION]</span>
          </div>

          <div className="edu-card">
            <div className="edu-header">
              <h3 className="edu-institution">
                {profile.education.institution}
              </h3>
              <span className="edu-period">{profile.education.period} · {profile.education.status}</span>
            </div>

            <p className="edu-degree">
              {profile.education.degree} · Bangalore, India
            </p>

            <p className="text-sm text-[var(--ink-2)] max-w-[70ch] leading-relaxed mb-4">
              Rigorous computer applications curriculum focused on fundamental computer science principles, database modeling, software engineering methodologies, and applied full-stack systems development.
            </p>

            <div>
              <span className="label block mb-2">Relevant Core Coursework:</span>
              <div className="edu-coursework">
                {profile.education.coursework.map((course) => (
                  <span key={course} className="tech-chip font-medium">
                    {course}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="contact-section wrap" aria-labelledby="contact-heading">
          <div className="label mb-2">OPEN CHANNEL</div>
          <h2 id="contact-heading" className="contact-title">
            Let&apos;s build <em className="italic-accent">dependable software.</em>
          </h2>

          <div className="contact-email-row">
            <a href={`mailto:${profile.email}`} className="contact-email-link">
              {profile.email}
            </a>
            <EmailCopyButton email={profile.email} />
          </div>

          <p className="text-sm text-[var(--ink-2)] max-w-[55ch] mb-8 leading-relaxed">
            I am currently open to <strong>software development, QA/testing, and AI/automation internships</strong> in Bangalore or remote. Feel free to reach out via email or connect on professional channels.
          </p>

          <div className="contact-links-grid">
            <a
              href={profile.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-link-item font-mono text-sm uppercase"
            >
              GitHub ↗
            </a>
            <a
              href={profile.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-link-item font-mono text-sm uppercase"
            >
              LinkedIn ↗
            </a>
            {profile.instagramUrl && (
              <a
                href={profile.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-link-item font-mono text-sm uppercase"
              >
                Instagram ↗
              </a>
            )}
            <span className="font-mono text-sm text-[var(--ink-3)] uppercase">
              Location: Bangalore, India
            </span>
          </div>
        </section>
      </main>

      <Footer updatedAt={data.updatedAt} />
    </>
  );
}

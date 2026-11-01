"use client";

import { useState } from "react";
import Link from "next/link";

export default function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:bg-neutral-900 focus:text-neutral-100 focus:px-4 focus:py-2 focus:rounded-sm">
        Skip to content
      </a>

      <header className="site-header">
        <div className="site-nav">
          <Link href="/" className="brand-link" aria-label="Skanda Chandrashekhar Home">
            <span className="brand-name">SKANDA</span>
            <span className="brand-tag">EXE</span>
          </Link>

          <nav className="nav-links" aria-label="Main Navigation">
            <Link href="/#about" className="nav-link">About</Link>
            <Link href="/#work" className="nav-link">Work</Link>
            <Link href="/#skills" className="nav-link">Skills</Link>
            <Link href="/#qa" className="nav-link">QA & Testing</Link>
            <Link href="/#education" className="nav-link">Education</Link>
            <Link href="/#contact" className="nav-link">Contact</Link>
          </nav>

          <div className="flex items-center gap-4">
            <div className="nav-status-pill">
              <span className="pulse-dot" aria-hidden="true" />
              <span>Open to Internships</span>
            </div>

            <button
              type="button"
              className="mobile-toggle"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-expanded={mobileOpen}
              aria-label="Toggle Navigation Menu"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                {mobileOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="md:hidden border-t border-[var(--line)] bg-[var(--paper)] px-6 py-6 transition-all">
            <nav className="flex flex-col gap-4 text-base font-normal text-[var(--ink)]">
              <Link
                href="/#about"
                className="py-1 hover:text-[var(--accent)] transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                About
              </Link>
              <Link
                href="/#work"
                className="py-1 hover:text-[var(--accent)] transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                Work
              </Link>
              <Link
                href="/#skills"
                className="py-1 hover:text-[var(--accent)] transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                Skills
              </Link>
              <Link
                href="/#qa"
                className="py-1 hover:text-[var(--accent)] transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                QA & Testing
              </Link>
              <Link
                href="/#education"
                className="py-1 hover:text-[var(--accent)] transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                Education
              </Link>
              <Link
                href="/#contact"
                className="py-1 hover:text-[var(--accent)] transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                Contact
              </Link>
            </nav>
            <div className="mt-6 pt-4 border-t border-[var(--line)] flex items-center justify-between text-xs text-[var(--ink-3)] font-mono">
              <span>Bangalore, India</span>
              <span className="text-[var(--accent)]">Available for 2025/2026</span>
            </div>
          </div>
        )}
      </header>
    </>
  );
}

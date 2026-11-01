import { Instrument_Serif, Inter } from 'next/font/google';
import Link from 'next/link';
import { profile, updatedAt } from './lib';
import Reveal from './components/Reveal';
import './globals.css';

const serif = Instrument_Serif({ subsets: ['latin'], weight: '400', style: ['normal', 'italic'], variable: '--font-serif' });
const sans = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const metadata = {
  title: { default: `${profile.name} — ${profile.headline}`, template: `%s — ${profile.name}` },
  description: profile.intro,
  openGraph: { title: profile.name, description: profile.intro, images: [profile.avatar] },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable}`}>
      <head>
        {/* Reveal animations only hide content once we know JS is running. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        <div className="progress" aria-hidden />
        <a className="skip" href="#main">Skip to content</a>
        <header className="nav">
          <Link href="/" className="nav-name">{profile.name}</Link>
          <nav aria-label="Sections">
            <Link href="/#work">Work</Link>
            <Link href="/#skills">Skills</Link>
            <Link href="/#contact">Contact</Link>
          </nav>
        </header>
        <main id="main">{children}</main>
        <footer className="footer wrap">
          <p>
            This site rewrites itself from GitHub. Last synced{' '}
            <time dateTime={updatedAt}>{new Date(updatedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</time>.
          </p>
          <p>© {new Date(updatedAt).getFullYear()} {profile.name}</p>
        </footer>
        <Reveal />
      </body>
    </html>
  );
}

'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { pad, year } from '../format';
import Cover from './Cover';

// Numbered project list; on mouse devices a preview card trails the cursor.
export default function ProjectIndex({ projects }) {
  const [active, setActive] = useState(null);
  const card = useRef(null);
  const target = useRef({ x: 0, y: 0 });

  useEffect(() => {
    let raf, x = 0, y = 0;
    const tick = () => {
      x += (target.current.x - x) * 0.14;
      y += (target.current.y - y) * 0.14;
      if (card.current) card.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="index" onMouseMove={(e) => (target.current = { x: e.clientX + 24, y: e.clientY - 110 })} onMouseLeave={() => setActive(null)}>
      <ol>
        {projects.map((p, i) => (
          <li key={p.slug} data-reveal style={{ '--d': i % 6 }}>
            <Link href={`/work/${p.slug}`} className="row" onMouseEnter={() => setActive(i)} onFocus={() => setActive(null)}>
              <span className="num">{pad(i + 1)}</span>
              <span className="row-title">{p.title}{p.live && <span className="live-tag">Live</span>}</span>
              <span className="row-tag">{p.tagline}</span>
              <span className="row-meta row-cat">{p.category}</span>
              <span className="row-meta">{year(p.pushedAt)}</span>
              <span className="row-arrow" aria-hidden>→</span>
            </Link>
          </li>
        ))}
      </ol>
      <div className={`preview${active !== null ? ' on' : ''}`} ref={card} aria-hidden>
        {projects.map((p, i) => p.shot
          ? <Image key={p.slug} src={p.shot} alt="" fill sizes="340px" className={`shot${i === active ? ' show' : ''}`} />
          : <Cover key={p.slug} p={p} n={i + 1} className={i === active ? 'show' : ''} />)}
      </div>
    </div>
  );
}

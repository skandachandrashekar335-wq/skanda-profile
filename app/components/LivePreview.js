'use client';
import { useState } from 'react';
import Image from 'next/image';

// Browser-framed screenshot of the live site; sites that allow framing can be used right here.
export default function LivePreview({ live, title }) {
  const [interactive, setInteractive] = useState(!live.shot);
  return (
    <figure className="browser">
      <div className="browser-bar">
        <span className="browser-dots" aria-hidden><i /><i /><i /></span>
        <a className="browser-url" href={live.url} target="_blank" rel="noreferrer">{new URL(live.url).host} ↗</a>
        {live.embeddable && live.shot && (
          <button type="button" className="browser-toggle" aria-pressed={interactive} onClick={() => setInteractive(!interactive)}>
            {interactive ? 'Screenshot' : 'Interact'}
          </button>
        )}
      </div>
      <div className="browser-view">
        {interactive
          ? <iframe src={live.url} title={`${title}, live site`} loading="lazy" sandbox="allow-scripts allow-same-origin allow-forms allow-popups" />
          : <Image src={live.shot} alt={`Screenshot of the ${title} live site`} fill sizes="(max-width: 900px) 100vw, 860px" />}
      </div>
    </figure>
  );
}

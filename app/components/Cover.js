import { pad } from '../format';

// Typographic project card, used as the hover preview and the project page cover.
export default function Cover({ p, n, className = '' }) {
  return (
    <div className={`cover ${className}`} aria-hidden>
      <span className="cover-top"><span>{pad(n)}</span><span>{p.category}</span></span>
      <span className="cover-title">{p.title}</span>
      <span className="cover-tag">{p.tagline}</span>
    </div>
  );
}

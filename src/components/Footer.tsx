import { formatDate } from "@/lib/portfolio-data";

export default function Footer({ updatedAt }: { updatedAt?: string }) {
  return (
    <footer className="border-t border-[var(--line)] bg-[var(--paper-2)]">
      <div className="site-footer">
        <div>
          <span className="font-serif text-base text-[var(--ink)] font-normal">
            Skanda Chandrashekhar
          </span>
          <p className="text-xs text-[var(--ink-3)] font-mono mt-1">
            Software Developer · Bangalore, India · Dayananda Sagar College
          </p>
        </div>

        <div className="flex flex-col md:items-end gap-1 text-xs text-[var(--ink-3)] font-mono">
          <span>Synced from GitHub {updatedAt ? `(${formatDate(updatedAt)})` : ""}</span>
          <span className="text-[var(--ink-2)]">Built with Next.js, TypeScript & Tailwind CSS</span>
        </div>
      </div>
    </footer>
  );
}

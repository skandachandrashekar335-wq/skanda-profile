// No data imports here: client components use this, and the content JSON shouldn't ship in their bundle.
export const year = (iso) => new Date(iso).getFullYear();

export const fmtDate = (iso) => new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });

export const pad = (n) => String(n).padStart(2, '0');

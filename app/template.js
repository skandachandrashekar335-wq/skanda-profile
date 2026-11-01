// Remounts on every navigation, which gives each page its fade-in.
export default function Template({ children }) {
  return <div className="page">{children}</div>;
}

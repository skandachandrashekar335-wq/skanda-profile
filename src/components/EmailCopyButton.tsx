"use client";

import { useState } from "react";

export default function EmailCopyButton({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="copy-btn"
      aria-label="Copy email address to clipboard"
    >
      {copied ? "✓ Copied to clipboard" : "Copy Email"}
    </button>
  );
}

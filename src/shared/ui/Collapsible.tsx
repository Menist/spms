"use client";

import {useState, type ReactNode} from "react";

interface CollapsibleProps {
  summary: ReactNode;
  children: ReactNode;
  defaultOpen?: boolean;
}

export function Collapsible({summary, children, defaultOpen = false}: CollapsibleProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="collapsible">
      <button
        type="button"
        className="collapsible__trigger"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span className="collapsible__arrow">{isOpen ? "▾" : "▸"}</span>
        <span>{summary}</span>
      </button>

      {isOpen && <div className="collapsible__content">{children}</div>}
    </div>
  );
}
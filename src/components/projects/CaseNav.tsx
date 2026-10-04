"use client";

import { useActiveSection } from "@/components/layout/useActiveSection";
import { cn } from "@/lib/utils";

type Props = {
  label: string;
  items: { id: string; title: string }[];
};

/** Sticky in-page navigation for case-study sections, with active-section highlight. */
export function CaseNav({ label, items }: Props) {
  const active = useActiveSection(items.map((i) => i.id));

  return (
    <nav aria-label={label} className="sticky top-[calc(var(--header-h)+40px)]">
      <ol className="relative border-s border-line">
        {items.map((item, i) => {
          const isActive = active === item.id;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                aria-current={isActive ? "location" : undefined}
                className={cn(
                  "-ms-px flex items-center gap-3 border-s py-2.5 ps-5 text-sm transition-colors duration-300",
                  isActive ? "border-accent text-fg" : "border-transparent text-muted hover:text-fg",
                )}
              >
                <span className="font-mono text-xs text-subtle">0{i + 1}</span>
                {item.title}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

"use client";

import { useEffect, useRef, type ReactNode } from "react";

/** Vertical rail that fills with an accent gradient as the timeline scrolls by. */
export function TimelineRail({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    const bar = barRef.current;
    if (!el || !bar) return;
    let frame = 0;

    const update = () => {
      frame = 0;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        bar.style.transform = "scaleY(1)";
        return;
      }
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // Starts when the top reaches 75% of the viewport, completes when the bottom reaches 55%.
      const start = vh * 0.75;
      const distance = rect.height + vh * 0.2;
      const progress = Math.min(1, Math.max(0, (start - rect.top) / distance));
      bar.style.transform = `scaleY(${progress})`;
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  // Rail sits on the centre of the dot column: 1.25rem on mobile, 12rem + 1.75rem from md.
  const position = "start-[calc(1.25rem-0.5px)] md:start-[calc(13.75rem-0.5px)]";

  return (
    <div ref={ref} className="relative">
      <div aria-hidden="true" className={`absolute inset-y-0 w-px bg-line ${position}`} />
      <div
        ref={barRef}
        aria-hidden="true"
        style={{ transform: "scaleY(0)" }}
        className={`absolute inset-y-0 w-px origin-top bg-[linear-gradient(to_bottom,var(--accent),var(--accent-2),transparent)] shadow-[0_0_12px_var(--glow)] transition-transform duration-200 ease-out ${position}`}
      />
      {children}
    </div>
  );
}

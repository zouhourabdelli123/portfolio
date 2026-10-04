"use client";

import { m, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState, useSyncExternalStore } from "react";
import { cn } from "@/lib/utils";

const INTERACTIVE = "a, button, [role='button'], input, textarea, select, label, summary, [data-cursor]";
const FINE_POINTER = "(hover: hover) and (pointer: fine)";
const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

function subscribe(onChange: () => void) {
  const queries = [window.matchMedia(FINE_POINTER), window.matchMedia(REDUCED_MOTION)];
  queries.forEach((q) => q.addEventListener("change", onChange));
  return () => queries.forEach((q) => q.removeEventListener("change", onChange));
}

const getSnapshot = () =>
  window.matchMedia(FINE_POINTER).matches && !window.matchMedia(REDUCED_MOTION).matches;
const getServerSnapshot = () => false;

/**
 * Desktop-only cursor halo: a dot plus a trailing ring that grows over
 * interactive elements. The native cursor stays visible for accessibility.
 * Disabled for touch devices and prefers-reduced-motion.
 */
export function CustomCursor() {
  const enabled = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 380, damping: 32, mass: 0.6 });
  const ringY = useSpring(y, { stiffness: 380, damping: 32, mass: 0.6 });

  useEffect(() => {
    if (!enabled) return;

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
    };
    const onOver = (e: PointerEvent) => {
      setHovering(!!(e.target as Element | null)?.closest?.(INTERACTIVE));
    };
    const onLeave = () => setVisible(false);

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerover", onOver, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  // Physical `left/top` on purpose: pointer coordinates are physical, not logical.
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[90]" style={{ opacity: visible ? 1 : 0 }}>
      <m.div
        className={cn(
          "absolute left-0 top-0 -ml-5 -mt-5 size-10 rounded-full border transition-colors duration-300",
          hovering ? "border-accent bg-accent/10" : "border-accent/50 bg-transparent",
        )}
        style={{ x: ringX, y: ringY }}
        animate={{ scale: hovering ? 1.6 : 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 24 }}
      />
      <m.div
        className="absolute left-0 top-0 -ml-[3px] -mt-[3px] size-1.5 rounded-full bg-accent shadow-[0_0_12px_var(--accent)]"
        style={{ x, y }}
      />
    </div>
  );
}

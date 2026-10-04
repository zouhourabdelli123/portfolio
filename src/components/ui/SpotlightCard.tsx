"use client";

import type { PointerEvent, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  className?: string;
};

/** Card with a soft radial highlight that follows the pointer. */
export function SpotlightCard({ children, className }: Props) {
  function onPointerMove(event: PointerEvent<HTMLDivElement>) {
    const el = event.currentTarget;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--spot-x", `${event.clientX - rect.left}px`);
    el.style.setProperty("--spot-y", `${event.clientY - rect.top}px`);
  }

  return (
    <div onPointerMove={onPointerMove} className={cn("card spotlight", className)}>
      {children}
    </div>
  );
}

"use client";

import dynamic from "next/dynamic";

// Client-only and lazy: keeps Framer Motion out of the initial JavaScript.
const MotionIslands = dynamic(() => import("./MotionIslands"), { ssr: false });

export function DeferredIslands() {
  return <MotionIslands />;
}

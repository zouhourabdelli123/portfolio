"use client";

import { LazyMotion, MotionConfig, domAnimation } from "framer-motion";
import { CustomCursor } from "./CustomCursor";
import { ScrollToTop } from "./ScrollToTop";

/** Framer Motion islands that are never needed for first paint. Loaded after hydration. */
export default function MotionIslands() {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
        <ScrollToTop />
        <CustomCursor />
      </MotionConfig>
    </LazyMotion>
  );
}

"use client";

import { AnimatePresence, m, useScroll } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

export function ScrollToTop() {
  const t = useTranslations("a11y");
  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 720);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function scrollTop() {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
    document.getElementById("main")?.focus({ preventScroll: true });
  }

  return (
    <AnimatePresence>
      {visible ? (
        <m.button
          key="to-top"
          type="button"
          onClick={scrollTop}
          aria-label={t("scrollToTop")}
          initial={{ opacity: 0, scale: 0.8, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 12 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="glass fixed bottom-6 end-6 z-40 inline-flex size-12 items-center justify-center rounded-full text-fg shadow-card transition-colors hover:text-accent-ink"
        >
          <svg viewBox="0 0 48 48" className="absolute inset-0 size-full -rotate-90" aria-hidden="true">
            <circle cx="24" cy="24" r="22" fill="none" stroke="var(--line)" strokeWidth="2" />
            <m.circle
              cx="24"
              cy="24"
              r="22"
              fill="none"
              stroke="var(--accent)"
              strokeWidth="2"
              strokeLinecap="round"
              style={{ pathLength: scrollYProgress }}
            />
          </svg>
          <ArrowUp className="relative size-4" aria-hidden="true" />
        </m.button>
      ) : null}
    </AnimatePresence>
  );
}

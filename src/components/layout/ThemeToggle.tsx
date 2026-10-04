"use client";

import { Moon, Sun } from "lucide-react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  const t = useTranslations("a11y");

  function toggle() {
    const root = document.documentElement;
    const next = root.classList.contains("dark") ? "light" : "dark";
    const apply = () => {
      root.classList.toggle("dark", next === "dark");
      root.style.colorScheme = next;
      document
        .querySelector('meta[name="theme-color"]')
        ?.setAttribute("content", next === "dark" ? "#0a1628" : "#f6f9fc");
    };
    try {
      localStorage.setItem("theme", next);
    } catch {}

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduce && "startViewTransition" in document) {
      document.startViewTransition(apply);
    } else {
      apply();
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={t("toggleTheme")}
      title={t("toggleTheme")}
      className={cn(
        "relative inline-flex size-9 items-center justify-center rounded-full border border-line bg-surface/50 text-muted backdrop-blur transition-colors duration-300 hover:border-accent/50 hover:text-fg",
        className,
      )}
    >
      <Sun className="size-4 transition-transform duration-500 dark:hidden" aria-hidden="true" />
      <Moon className="hidden size-4 transition-transform duration-500 dark:block" aria-hidden="true" />
    </button>
  );
}

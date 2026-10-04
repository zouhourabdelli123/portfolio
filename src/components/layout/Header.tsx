"use client";

import { Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useRef, useState } from "react";
import { buttonClasses } from "@/components/ui/button";
import { LogoMark } from "@/components/ui/icons";
import { Link, usePathname } from "@/i18n/navigation";
import { navSections, type NavSection } from "@/lib/sections";
import { cn } from "@/lib/utils";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { ThemeToggle } from "./ThemeToggle";
import { useActiveSection } from "./useActiveSection";

const NO_SECTIONS: readonly string[] = [];

/** On the home page, plain hash anchors give native smooth scrolling; elsewhere, route back home. */
function SectionLink({
  id,
  isHome,
  className,
  children,
  onClick,
  ariaCurrent,
}: {
  id: NavSection;
  isHome: boolean;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
  ariaCurrent?: boolean;
}) {
  const common = {
    className,
    onClick,
    "aria-current": ariaCurrent ? ("location" as const) : undefined,
  };
  if (isHome) {
    return (
      <a href={`#${id}`} {...common}>
        {children}
      </a>
    );
  }
  return (
    <Link href={{ pathname: "/", hash: id }} {...common}>
      {children}
    </Link>
  );
}

export function Header() {
  const t = useTranslations("nav");
  const ta = useTranslations("a11y");
  const pathname = usePathname();
  const isHome = pathname === "/";
  const active = useActiveSection(isHome ? navSections : NO_SECTIONS);

  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const close = useCallback((restoreFocus = true) => {
    setOpen(false);
    if (restoreFocus) menuButtonRef.current?.focus();
  }, []);

  // Mobile menu: lock scroll, close on Escape, focus first link.
  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    root.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    const raf = requestAnimationFrame(() => {
      panelRef.current?.querySelector<HTMLElement>("a")?.focus();
    });
    return () => {
      root.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      cancelAnimationFrame(raf);
    };
  }, [open, close]);

  // Close the menu if the viewport grows past the mobile breakpoint.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 64rem)");
    const onChange = () => mq.matches && setOpen(false);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const solid = scrolled || open;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,backdrop-filter] duration-500",
        solid
          ? "border-line bg-bg/75 backdrop-blur-xl backdrop-saturate-150"
          : "border-transparent bg-transparent",
      )}
    >
      <div className="container-page flex h-[var(--header-h)] items-center justify-between gap-4">
        <Link
          href="/"
          aria-label={ta("home")}
          className="group flex items-center gap-3 rounded-xl"
          onClick={() => open && close(false)}
        >
          <LogoMark className="size-9 transition-transform duration-500 group-hover:rotate-[-6deg] group-hover:scale-105" />
          <span className="hidden font-display text-[0.95rem] font-semibold tracking-tight text-fg sm:block">
            {t("brand")}
          </span>
        </Link>

        <nav aria-label={ta("mainNav")} className="hidden lg:block">
          <ul className="flex items-center gap-0.5 rounded-full border border-line bg-surface/40 p-1 backdrop-blur">
            {navSections.map((id) => {
              const isActive = active === id;
              return (
                <li key={id}>
                  <SectionLink
                    id={id}
                    isHome={isHome}
                    ariaCurrent={isActive}
                    className={cn(
                      "relative block rounded-full px-3.5 py-1.5 text-sm transition-colors duration-300",
                      isActive ? "bg-surface-2 text-fg" : "text-muted hover:text-fg",
                    )}
                  >
                    {t(id)}
                    {isActive ? (
                      <span
                        aria-hidden="true"
                        className="absolute inset-x-3 -bottom-px h-px bg-[linear-gradient(90deg,transparent,var(--accent),transparent)]"
                      />
                    ) : null}
                  </SectionLink>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <ThemeToggle />
          <SectionLink
            id="contact"
            isHome={isHome}
            className={buttonClasses("primary", "sm", "hidden xl:inline-flex")}
          >
            {t("hireMe")}
          </SectionLink>
          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => (open ? close() : setOpen(true))}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? ta("closeMenu") : ta("openMenu")}
            className="inline-flex size-9 items-center justify-center rounded-full border border-line bg-surface/50 text-fg backdrop-blur lg:hidden"
          >
            {open ? <X className="size-4" aria-hidden="true" /> : <Menu className="size-4" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {open ? (
        <div
          id="mobile-menu"
          ref={panelRef}
          className="animate-fade-in fixed inset-x-0 bottom-0 top-[var(--header-h)] h-[calc(100dvh-var(--header-h))] overflow-y-auto bg-bg lg:hidden"
        >
          <nav aria-label={ta("mainNav")} className="container-page flex min-h-full flex-col pb-10 pt-8">
            <ul className="flex flex-col">
              {navSections.map((id, i) => (
                <li
                  key={id}
                  style={{ animationDelay: `${40 * i + 50}ms` }}
                  className="animate-fade-up border-b border-line"
                >
                  <SectionLink
                    id={id}
                    isHome={isHome}
                    ariaCurrent={active === id}
                    onClick={() => close(false)}
                    className={cn(
                      "flex items-baseline gap-4 py-5 font-display text-3xl font-semibold tracking-tight transition-colors",
                      active === id ? "text-accent-ink" : "text-fg hover:text-accent-ink",
                    )}
                  >
                    <span className="font-mono text-xs font-normal text-subtle">0{i + 1}</span>
                    {t(id)}
                  </SectionLink>
                </li>
              ))}
            </ul>
            <div style={{ animationDelay: "320ms" }} className="animate-fade-up mt-auto pt-10">
              <SectionLink
                id="contact"
                isHome={isHome}
                onClick={() => close(false)}
                className={buttonClasses("primary", "lg", "w-full")}
              >
                {t("hireMe")}
              </SectionLink>
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}

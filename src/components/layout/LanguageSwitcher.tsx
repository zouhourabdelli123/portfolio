"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/utils";

export function LanguageSwitcher({ className }: { className?: string }) {
  const locale = useLocale();
  const pathname = usePathname();
  const t = useTranslations("languages");
  const ta = useTranslations("a11y");

  return (
    <div
      role="group"
      aria-label={ta("languageSwitcher")}
      className={cn(
        "flex items-center rounded-full border border-line bg-surface/50 p-1 backdrop-blur",
        className,
      )}
    >
      {routing.locales.map((l) => {
        const active = l === locale;
        return (
          <Link
            key={l}
            href={pathname}
            locale={l}
            hrefLang={l}
            lang={l}
            aria-current={active ? "true" : undefined}
            className={cn(
              "relative inline-flex h-7 min-w-9 items-center justify-center rounded-full px-2.5 text-xs font-semibold transition-colors duration-300",
              active
                ? "bg-fg text-bg shadow-sm"
                : "text-muted hover:text-fg",
            )}
          >
            <span aria-hidden="true">{t(`short.${l}`)}</span>
            <span className="sr-only">{t(l)}</span>
          </Link>
        );
      })}
    </div>
  );
}

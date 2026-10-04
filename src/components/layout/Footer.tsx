import { getTranslations } from "next-intl/server";
import { GitHubIcon, LinkedInIcon, LogoMark } from "@/components/ui/icons";
import { Link } from "@/i18n/navigation";
import { navSections } from "@/lib/sections";
import { siteConfig } from "@/lib/site";

export async function Footer() {
  const t = await getTranslations("footer");
  const tn = await getTranslations("nav");
  const ta = await getTranslations("a11y");
  const tc = await getTranslations("contact.channels");
  const year = new Date().getFullYear();

  const socials = [
    { href: siteConfig.linkedin, label: tc("linkedin"), Icon: LinkedInIcon, external: true },
    { href: siteConfig.github, label: tc("github"), Icon: GitHubIcon, external: true },
  ];

  return (
    <footer className="relative border-t border-line bg-bg-soft">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,var(--accent),transparent)] opacity-40"
      />
      <div className="container-page grid gap-10 py-14 md:grid-cols-[1.4fr_1fr] md:items-start">
        <div className="max-w-sm">
          <Link href="/" aria-label={ta("home")} className="inline-flex items-center gap-3 rounded-xl">
            <LogoMark className="size-10" />
            <span className="font-display text-lg font-semibold tracking-tight text-fg">{tn("brand")}</span>
          </Link>
          <p className="mt-4 text-sm leading-relaxed text-muted">{t("tagline")}</p>
          <ul aria-label={ta("socialLinks")} className="mt-6 flex gap-2">
            {socials.map(({ href, label, Icon, external }) => (
              <li key={label}>
                <a
                  href={href}
                  {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="inline-flex size-10 items-center justify-center rounded-full border border-line bg-surface/50 text-muted transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/50 hover:text-fg"
                >
                  <Icon className="size-4" aria-hidden="true" />
                  <span className="sr-only">
                    {label} {external ? ta("newTab") : null}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <nav aria-label={ta("mainNav")} className="md:justify-self-end">
          <ul className="grid grid-cols-2 gap-x-10 gap-y-3 text-sm">
            {navSections.map((id) => (
              <li key={id}>
                <Link
                  href={{ pathname: "/", hash: id }}
                  className="text-muted transition-colors hover:text-fg"
                >
                  {tn(id)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="border-t border-line">
        <div className="container-page flex flex-col gap-2 py-6 text-xs text-subtle sm:flex-row sm:items-center sm:justify-between">
          <p>{t("rights", { year })}</p>
          <p>{t("built")}</p>
        </div>
      </div>
    </footer>
  );
}

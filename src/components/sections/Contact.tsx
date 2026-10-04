import { ArrowUpRight } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/Reveal";
import { siteConfig } from "@/lib/site";
import { ContactForm } from "./contact/ContactForm";

const displayUrl = (url: string) => url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");

export async function Contact() {
  const t = await getTranslations("contact");
  const ta = await getTranslations("a11y");

  const channels = [
    { key: "linkedin", href: siteConfig.linkedin, value: displayUrl(siteConfig.linkedin), Icon: LinkedInIcon, external: true },
    { key: "github", href: siteConfig.github, value: displayUrl(siteConfig.github), Icon: GitHubIcon, external: true },
  ] as const;

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="relative isolate overflow-hidden border-t border-line bg-bg-soft py-24 md:py-32"
    >
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div className="bg-grid mask-radial absolute inset-0 opacity-60" />
        <div className="animate-drift absolute -bottom-64 start-[-10%] size-[720px] rounded-full bg-[radial-gradient(circle,rgb(34_211_238/0.14),transparent_65%)]" />
        <div
          className="animate-drift absolute -top-40 end-[-10%] size-[640px] rounded-full bg-[radial-gradient(circle,rgb(59_130_246/0.14),transparent_65%)]"
          style={{ animationDelay: "-11s" }}
        />
      </div>

      <div className="container-page grid gap-14 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
        <div>
          <Reveal>
            <p className="flex items-center gap-3 text-sm font-medium tracking-wide text-accent-ink">
              <span className="font-mono text-xs text-subtle">06</span>
              <span aria-hidden="true" className="h-px w-8 bg-accent/60" />
              {t("eyebrow")}
            </p>
          </Reveal>
          <Reveal delay={0.06}>
            <h2
              id="contact-title"
              className="mt-5 font-display text-4xl font-semibold leading-[1.05] tracking-tight text-fg sm:text-5xl lg:text-6xl"
            >
              {t("title")}
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted">{t("intro")}</p>
          </Reveal>

          <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            {channels.map(({ key, href, value, Icon, external }, i) => (
              <Reveal as="li" key={key} delay={0.05 * i}>
                <a
                  href={href}
                  {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="card group flex items-center gap-4 rounded-2xl p-4 transition-[transform,border-color] duration-300 hover:-translate-y-0.5 hover:border-accent/40"
                >
                  <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent-ink ring-1 ring-accent/25 transition-colors duration-300 group-hover:bg-accent group-hover:text-on-accent">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-xs font-medium text-subtle">{t(`channels.${key}`)}</span>
                    <span className="block truncate text-sm font-medium text-fg rtl:text-end" dir="ltr">
                      {value}
                    </span>
                  </span>
                  <ArrowUpRight
                    className="size-4 shrink-0 text-subtle transition-all duration-300 group-hover:-translate-y-0.5 group-hover:text-accent-ink rtl:-scale-x-100"
                    aria-hidden="true"
                  />
                  {external ? <span className="sr-only">{ta("newTab")}</span> : null}
                </a>
              </Reveal>
            ))}
          </ul>
        </div>

        <Reveal delay={0.1}>
          <ContactForm />
        </Reveal>
      </div>
    </section>
  );
}

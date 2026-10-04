import { ArrowDown, ArrowRight, Code, Download, MapPin, Smartphone, Sparkles } from "lucide-react";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import type { CSSProperties } from "react";
import { buttonClasses } from "@/components/ui/button";
import { Magnetic } from "@/components/ui/Magnetic";
import profilePhoto from "@/assets/profile.jpg";
import { asset, siteConfig } from "@/lib/site";
import { NetworkBackground } from "./hero/NetworkBackground";

/*
 * Value proposition — options considered:
 *  1. "I build complete products — web, mobile and APIs — from the first database schema to production."
 *  2. "Full-stack engineering, end to end: from the data model to the app in your users' hands."
 *  3. "One engineer, every layer: thoughtful interfaces, solid APIs, shipped to production."
 * Chosen: #1 — concrete about scope (web, mobile, APIs), signals ownership of the
 * whole lifecycle, and stays factual. Copy lives in messages (hero.tagline).
 */

const specialties = ["Laravel", "React", "React Native", "FastAPI", "REST APIs", "Agile/Scrum"];

const floatingTags = [
  { Icon: Code, label: "Laravel · React", className: "top-[8%] -start-2 sm:-start-10", delay: "0s" },
  { Icon: Smartphone, label: "React Native", className: "bottom-[22%] -end-3 sm:-end-12", delay: "-2.5s" },
  { Icon: Sparkles, label: "FastAPI", className: "-bottom-1 start-[12%]", delay: "-5s" },
];

const fade = (ms: number): CSSProperties => ({ animationDelay: `${ms}ms` });

export async function Hero() {
  const t = await getTranslations("hero");
  const stats = t.raw("stats") as { value: string; label: string }[];

  return (
    <section
      id="home"
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden pb-24 pt-[calc(var(--header-h)+40px)]"
    >
      {/* Background: grid, drifting gradient mesh, animated network */}
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div className="bg-grid mask-radial absolute inset-0 opacity-80" />
        <div className="animate-drift absolute -top-48 start-[-12%] size-[640px] rounded-full bg-[radial-gradient(circle,rgb(34_211_238/0.16),transparent_65%)]" />
        <div
          className="animate-drift absolute end-[-18%] top-1/4 size-[720px] rounded-full bg-[radial-gradient(circle,rgb(59_130_246/0.16),transparent_65%)]"
          style={{ animationDelay: "-9s" }}
        />
        <div className="mask-radial absolute inset-0">
          <NetworkBackground />
        </div>
        <div className="absolute inset-x-0 bottom-0 h-48 bg-[linear-gradient(to_bottom,transparent,var(--bg))]" />
      </div>

      <div className="container-page">
        <div className="grid items-center gap-10 lg:grid-cols-[1.25fr_0.75fr] lg:gap-12">
          {/* Copy */}
          <div className="text-center lg:text-start">
            <p
              className="animate-fade-up inline-flex items-center gap-2.5 rounded-full border border-accent/25 bg-accent/10 py-1.5 pe-4 ps-3 text-sm font-medium text-accent-ink"
              style={fade(0)}
            >
              <span className="relative flex size-2">
                <span className="animate-ping-slow absolute inline-flex size-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
              </span>
              {t("badge")}
            </p>

            <h1 id="hero-title" className="mt-8">
              <span
                className="animate-fade-up block text-lg font-medium text-muted sm:text-xl"
                style={fade(60)}
              >
                {t("greeting")}
              </span>
              <span
                className="animate-rise mt-2 block font-display text-[clamp(2.75rem,9vw,5.5rem)] font-semibold leading-[0.98] tracking-[-0.035em] text-fg"
                style={fade(120)}
              >
                {t("name")}
              </span>
            </h1>

            <p
              className="animate-rise text-gradient mt-5 font-display text-lg font-medium sm:text-2xl"
              style={fade(200)}
            >
              {t("title")}
            </p>

            <p
              className="animate-rise mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted sm:text-xl lg:mx-0"
              style={fade(280)}
            >
              {t("tagline")}
            </p>

            <ul
              className="animate-fade-up mt-8 flex flex-wrap justify-center gap-2 lg:justify-start"
              style={fade(360)}
            >
              {specialties.map((s) => (
                <li
                  key={s}
                  dir="ltr"
                  className="rounded-full border border-line bg-surface/60 px-3 py-1 font-mono text-xs text-muted"
                >
                  {s}
                </li>
              ))}
            </ul>

            <div
              className="animate-fade-up mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start"
              style={fade(440)}
            >
              <Magnetic>
                <a href="#projects" className={buttonClasses("primary", "lg")}>
                  {t("ctaWork")}
                  <ArrowRight
                    className="size-4 transition-transform duration-300 group-hover:translate-x-1 rtl:-scale-x-100 rtl:group-hover:-translate-x-1"
                    aria-hidden="true"
                  />
                </a>
              </Magnetic>
              <Magnetic>
                <a href="#contact" className={buttonClasses("secondary", "lg")}>
                  {t("ctaContact")}
                </a>
              </Magnetic>
              <a href={asset(siteConfig.cvPath)} download className={buttonClasses("ghost", "lg", "px-4")}>
                <Download className="size-4 transition-transform duration-300 group-hover:translate-y-0.5" aria-hidden="true" />
                {t("ctaCv")}
              </a>
            </div>

            <p
              className="animate-fade-up mt-8 inline-flex items-center gap-2 text-sm text-subtle"
              style={fade(520)}
            >
              <MapPin className="size-4" aria-hidden="true" />
              {t("location")}
            </p>
          </div>

          {/* Portrait */}
          <div className="animate-fade-up order-first lg:order-last" style={fade(160)}>
            <div className="relative mx-auto w-[min(52vw,208px)] sm:w-[280px] lg:w-full lg:max-w-[360px]">
              <div
                aria-hidden="true"
                className="absolute -inset-10 rounded-full bg-[radial-gradient(circle,var(--glow),transparent_68%)] opacity-80 blur-2xl"
              />
              <div
                aria-hidden="true"
                className="absolute -inset-5 rounded-full border border-dashed border-line-strong opacity-70"
              />
              <div className="relative aspect-square rounded-full p-[3px]">
                <div aria-hidden="true" className="absolute inset-0 rounded-full border border-line-strong" />
                <div aria-hidden="true" className="ring-animated animate-ring absolute inset-0 rounded-full" />
                <div className="relative size-full overflow-hidden rounded-full bg-surface">
                  <Image
                    src={profilePhoto}
                    placeholder="blur"
                    alt={t("photoAlt")}
                    fill
                    priority
                    quality={90}
                    sizes="(min-width: 1024px) 360px, (min-width: 640px) 280px, 52vw"
                    className="object-cover"
                  />
                </div>
              </div>

              {floatingTags.map(({ Icon, label, className, delay }) => (
                <div
                  key={label}
                  aria-hidden="true"
                  dir="ltr"
                  className={`animate-float absolute hidden border border-line-strong bg-surface/90 items-center gap-2 rounded-2xl px-3 py-2 text-xs font-medium text-fg shadow-card sm:flex ${className}`}
                  style={{ animationDelay: delay }}
                >
                  <span className="inline-flex size-6 items-center justify-center rounded-lg bg-accent/15 text-accent-ink">
                    <Icon className="size-3.5" />
                  </span>
                  {label}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats */}
        <dl className="mt-16 grid gap-3 sm:grid-cols-3 lg:mt-20">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className="animate-fade-up flex flex-col-reverse border border-line bg-surface/70 gap-1 rounded-2xl px-6 py-5 text-center sm:text-start"
              style={fade(600 + i * 90)}
            >
              <dt className="text-sm text-muted">{s.label}</dt>
              <dd className="font-display text-2xl font-semibold tracking-tight text-fg">
                <bdi>{s.value}</bdi>
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <a
        href="#about"
        className="group absolute bottom-6 start-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-xs text-subtle transition-colors hover:text-fg rtl:translate-x-1/2 md:flex [@media(max-height:760px)]:hidden"
      >
        <span>{t("scroll")}</span>
        <ArrowDown className="size-4 animate-bounce" aria-hidden="true" />
      </a>
    </section>
  );
}

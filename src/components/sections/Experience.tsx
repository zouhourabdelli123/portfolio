import { MapPin, Smartphone } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { experienceItems } from "@/lib/experience";
import { cn } from "@/lib/utils";
import { TimelineRail } from "./experience/TimelineRail";

export async function Experience() {
  const t = await getTranslations("experience");

  return (
    <section id="experience" aria-labelledby="experience-title" className="relative py-24 md:py-32">
      <div className="container-page">
        <SectionHeading
          index="03"
          eyebrow={t("eyebrow")}
          title={t("title")}
          intro={t("intro")}
          id="experience-title"
        />

        <div className="mt-16 md:mt-20">
          <TimelineRail>
            <ol>
              {experienceItems.map(({ key, type, monogram, current }) => {
                const base = `items.${key}`;
                const bullets = t.raw(`${base}.bullets`) as string[];
                const location = t(`${base}.location`);
                const note = t(`${base}.note`);
                const period = t(`${base}.period`);
                const typeLabel = t(`types.${type}`);

                return (
                  <li key={key} className="relative grid grid-cols-[2.5rem_1fr] md:grid-cols-[12rem_3.5rem_1fr]">
                    {/* Date column (md+) */}
                    <div className="hidden pe-2 pt-7 text-end md:block">
                      <p className="font-mono text-sm font-medium text-fg">
                        <bdi>{period}</bdi>
                      </p>
                      <p className="mt-1 text-xs text-subtle">{typeLabel}</p>
                    </div>

                    {/* Dot */}
                    <div className="relative flex justify-center pt-8">
                      <span className="relative flex size-3.5">
                        {current ? (
                          <span className="animate-ping-slow absolute inline-flex size-full rounded-full bg-accent/60" />
                        ) : null}
                        <span
                          className={cn(
                            "relative inline-flex size-3.5 rounded-full border-2 bg-bg",
                            current ? "border-accent shadow-[0_0_0_4px_var(--glow)]" : "border-line-strong",
                          )}
                        />
                      </span>
                    </div>

                    {/* Card */}
                    <div className="min-w-0 pb-8 md:pb-10">
                      <Reveal>
                        <SpotlightCard className="p-6 transition-transform duration-500 hover:-translate-y-1 md:p-8">
                          <article>
                            <header className="flex flex-wrap items-start justify-between gap-4">
                              <div className="flex min-w-0 items-center gap-4">
                                <span
                                  aria-hidden="true"
                                  className="inline-flex size-12 shrink-0 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,rgb(34_211_238/0.22),rgb(59_130_246/0.22))] font-display text-lg font-semibold text-accent-ink ring-1 ring-accent/25"
                                >
                                  {monogram}
                                </span>
                                <div className="min-w-0">
                                  <h3 className="font-display text-lg font-semibold leading-snug tracking-tight text-fg md:text-xl">
                                    {t(`${base}.role`)}
                                  </h3>
                                  <p className="mt-0.5 flex flex-wrap items-center gap-x-2 text-sm text-muted">
                                    <span className="font-medium text-fg/85">{t(`${base}.company`)}</span>
                                    {location ? (
                                      <>
                                        <span aria-hidden="true" className="text-subtle">
                                          ·
                                        </span>
                                        <span className="inline-flex items-center gap-1">
                                          <MapPin className="size-3.5" aria-hidden="true" />
                                          {location}
                                        </span>
                                      </>
                                    ) : null}
                                  </p>
                                </div>
                              </div>
                              {current ? (
                                <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-700 dark:text-emerald-300">
                                  <span className="size-1.5 rounded-full bg-emerald-500" />
                                  {t("current")}
                                </span>
                              ) : null}
                            </header>

                            <p className="mt-4 font-mono text-xs text-muted md:hidden">
                              <bdi>{period}</bdi> · {typeLabel}
                            </p>

                            <ul className="mt-5 space-y-3">
                              {bullets.map((b, i) => (
                                <li key={i} className="flex gap-3 text-[0.95rem] leading-relaxed text-muted">
                                  <span
                                    aria-hidden="true"
                                    className="mt-[0.6em] size-1.5 shrink-0 rounded-full bg-accent/70"
                                  />
                                  <span>{b}</span>
                                </li>
                              ))}
                            </ul>

                            {note ? (
                              <p className="mt-6 flex items-start gap-3 rounded-xl border border-accent/20 bg-accent/5 px-4 py-3 text-sm text-fg/90">
                                <Smartphone className="mt-0.5 size-4 shrink-0 text-accent-ink" aria-hidden="true" />
                                {note}
                              </p>
                            ) : null}
                          </article>
                        </SpotlightCard>
                      </Reveal>
                    </div>
                  </li>
                );
              })}
            </ol>
          </TimelineRail>
        </div>
      </div>
    </section>
  );
}

import { Briefcase, GraduationCap, Layers, MapPin, Rocket, Users, Workflow } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SpotlightCard } from "@/components/ui/SpotlightCard";

const highlights = [
  { key: "role", Icon: Briefcase },
  { key: "degree", Icon: GraduationCap },
  { key: "community", Icon: Users },
  { key: "location", Icon: MapPin },
] as const;

const principleIcons = [Rocket, Layers, Workflow];

export async function About() {
  const t = await getTranslations("about");
  const paragraphs = t.raw("paragraphs") as string[];
  const principles = t.raw("principles") as { title: string; text: string }[];

  return (
    <section id="about" aria-labelledby="about-title" className="relative py-24 md:py-32">
      <div className="container-page">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <SectionHeading index="01" eyebrow={t("eyebrow")} title={t("title")} id="about-title" />
            <div className="mt-10 space-y-6 text-lg leading-relaxed text-muted">
              {paragraphs.map((p, i) => (
                <Reveal key={i} delay={0.06 * i}>
                  <p className={i === 0 ? "text-xl leading-relaxed text-fg/90" : undefined}>{p}</p>
                </Reveal>
              ))}
            </div>
          </div>

          <ul className="grid content-start gap-3 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-1 lg:pt-32">
            {highlights.map(({ key, Icon }, i) => (
              <Reveal as="li" key={key} delay={0.07 * i}>
                <SpotlightCard className="flex h-full items-start gap-4 rounded-2xl p-5 transition-transform duration-500 hover:-translate-y-1">
                  <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-xl border border-accent/20 bg-accent/10 text-accent-ink">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs font-medium uppercase tracking-[0.14em] text-subtle">
                      {t(`highlights.${key}.label`)}
                    </p>
                    <p className="mt-1 font-display text-lg font-semibold tracking-tight text-fg">
                      {t(`highlights.${key}.value`)}
                    </p>
                    <p className="mt-0.5 text-sm text-muted">{t(`highlights.${key}.detail`)}</p>
                  </div>
                </SpotlightCard>
              </Reveal>
            ))}
          </ul>
        </div>

        <div className="mt-20 md:mt-28">
          <Reveal>
            <h3 className="text-sm font-medium uppercase tracking-[0.18em] text-subtle">
              {t("principlesTitle")}
            </h3>
          </Reveal>
          <ul className="mt-6 grid gap-px overflow-hidden rounded-3xl border border-line bg-line md:grid-cols-3">
            {principles.map((p, i) => {
              const Icon = principleIcons[i] ?? Rocket;
              return (
                <Reveal as="li" key={p.title} delay={0.08 * i} className="group relative bg-bg p-8 md:p-10">
                  <div className="flex items-center justify-between">
                    <Icon
                      className="size-6 text-accent-ink transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:scale-110"
                      aria-hidden="true"
                    />
                    <span className="font-mono text-xs text-subtle">0{i + 1}</span>
                  </div>
                  <h4 className="mt-8 font-display text-xl font-semibold tracking-tight text-fg">{p.title}</h4>
                  <p className="mt-3 leading-relaxed text-muted">{p.text}</p>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}

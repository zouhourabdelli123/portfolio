import { BookOpen, GraduationCap, School } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { cn } from "@/lib/utils";

const degrees = [
  { key: "engineering", Icon: GraduationCap, featured: true },
  { key: "bachelor", Icon: BookOpen, featured: false },
  { key: "bac", Icon: School, featured: false },
] as const;

export async function Education() {
  const t = await getTranslations("education");

  return (
    <section id="education" aria-labelledby="education-title" className="relative py-24 md:py-32">
      <div className="container-page">
        <SectionHeading
          index="05"
          eyebrow={t("eyebrow")}
          title={t("title")}
          intro={t("intro")}
          id="education-title"
        />

        <ul className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {degrees.map(({ key, Icon, featured }, i) => (
            <Reveal as="li" key={key} delay={0.07 * i} className={cn(featured && "md:col-span-2 lg:col-span-1")}>
              <SpotlightCard
                className={cn(
                  "group flex h-full flex-col overflow-hidden p-7 transition-transform duration-500 hover:-translate-y-1 md:p-8",
                  featured && "border-accent/35",
                )}
              >
                {featured ? (
                  <>
                    <div
                      aria-hidden="true"
                      className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,var(--accent),var(--accent-2),transparent)]"
                    />
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute -end-24 -top-24 size-64 rounded-full bg-[radial-gradient(circle,var(--glow),transparent_70%)] opacity-70"
                    />
                  </>
                ) : null}

                <div className="relative flex items-start justify-between gap-4">
                  <span
                    className={cn(
                      "inline-flex size-12 items-center justify-center rounded-2xl",
                      featured
                        ? "bg-[linear-gradient(135deg,#22d3ee,#3b82f6)] text-[#03121f]"
                        : "bg-accent/10 text-accent-ink ring-1 ring-accent/25",
                    )}
                  >
                    <Icon className="size-6" aria-hidden="true" />
                  </span>
                  <span className="font-mono text-sm text-muted">
                    <bdi>{t(`items.${key}.period`)}</bdi>
                  </span>
                </div>

                <p className="relative mt-8">
                  <span className="inline-flex rounded-full border border-line-strong px-2.5 py-0.5 text-xs font-medium text-muted">
                    {t(`items.${key}.badge`)}
                  </span>
                </p>
                <h3 className="relative mt-4 font-display text-2xl font-semibold tracking-tight text-fg">
                  {t(`items.${key}.degree`)}
                </h3>
                <p className="relative mt-2 font-medium text-accent-ink">{t(`items.${key}.field`)}</p>
                <p className="relative mt-1 text-sm text-muted">{t(`items.${key}.school`)}</p>
                <p className="relative mt-6 border-t border-line pt-6 text-[0.95rem] leading-relaxed text-muted">
                  {t(`items.${key}.description`)}
                </p>
              </SpotlightCard>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

import { BrainCircuit, CodeXml, Database, GitBranch, Monitor, Server, Smartphone } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { coreStack, skillGroups, type SkillIcon } from "@/lib/skills";
import { cn } from "@/lib/utils";

const icons: Record<SkillIcon, typeof Monitor> = {
  monitor: Monitor,
  server: Server,
  smartphone: Smartphone,
  database: Database,
  sparkles: BrainCircuit,
  code: CodeXml,
  git: GitBranch,
};

function MarqueeRow({ items, reverse }: { items: string[]; reverse?: boolean }) {
  // Duplicated once so the -50% translation loops seamlessly.
  const loop = [...items, ...items];
  return (
    <div className="mask-fade-x flex overflow-hidden" dir="ltr">
      <ul className={cn("flex shrink-0 gap-3 pe-3", reverse ? "animate-marquee-reverse" : "animate-marquee")}>
        {loop.map((item, i) => (
          <li
            key={`${item}-${i}`}
            className="flex items-center gap-2 whitespace-nowrap rounded-full border border-line bg-surface/60 px-4 py-2 font-mono text-sm text-muted"
          >
            <span className="size-1.5 rounded-full bg-accent/70" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export async function Skills() {
  const t = await getTranslations("skills");
  const half = Math.ceil(coreStack.length / 2);

  return (
    <section
      id="skills"
      aria-labelledby="skills-title"
      className="relative overflow-hidden border-y border-line bg-bg-soft py-24 md:py-32"
    >
      <div aria-hidden="true" className="bg-grid mask-fade-y pointer-events-none absolute inset-0 opacity-50" />
      <div className="container-page relative">
        <SectionHeading
          index="02"
          eyebrow={t("eyebrow")}
          title={t("title")}
          intro={t("intro")}
          id="skills-title"
        />
      </div>

      <div aria-hidden="true" className="relative mt-14 space-y-3">
        <MarqueeRow items={coreStack.slice(0, half)} />
        <MarqueeRow items={coreStack.slice(half)} reverse />
      </div>

      <div className="container-page relative mt-14">
        <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
          {skillGroups.map(({ key, icon, span }, i) => {
            const Icon = icons[icon];
            const items = t.raw(`groups.${key}.items`) as string[];
            const featured = key === "ai";
            return (
              <Reveal
                as="li"
                key={key}
                delay={0.05 * (i % 3)}
                className={cn(span, key === "tools" && "md:col-span-2 lg:col-span-3")}
              >
                <SpotlightCard
                  className={cn(
                    "group h-full overflow-hidden p-6 transition-transform duration-500 hover:-translate-y-1 md:p-7",
                    featured && "border-accent/30",
                  )}
                >
                  {featured ? (
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute -end-16 -top-16 size-48 rounded-full bg-[radial-gradient(circle,var(--glow),transparent_70%)]"
                    />
                  ) : null}
                  <Icon
                    aria-hidden="true"
                    className="pointer-events-none absolute -bottom-6 -end-6 size-32 text-fg opacity-[0.04] transition-transform duration-700 group-hover:-rotate-6 group-hover:scale-110"
                  />
                  <div className="relative flex items-center gap-3">
                    <span className="inline-flex size-11 items-center justify-center rounded-xl bg-[linear-gradient(135deg,rgb(34_211_238/0.2),rgb(59_130_246/0.2))] text-accent-ink ring-1 ring-accent/25">
                      <Icon className="size-5" aria-hidden="true" />
                    </span>
                    <h3 className="font-display text-lg font-semibold tracking-tight text-fg">
                      {t(`groups.${key}.title`)}
                    </h3>
                  </div>
                  <p className="relative mt-4 text-sm leading-relaxed text-muted">
                    {t(`groups.${key}.description`)}
                  </p>
                  <ul className="relative mt-5 flex flex-wrap gap-2">
                    {items.map((item) => (
                      <li
                        key={item}
                        className="rounded-lg border border-line bg-bg/60 px-2.5 py-1 text-[0.8125rem] font-medium text-fg/90 transition-colors duration-300 group-hover:border-line-strong"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </SpotlightCard>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

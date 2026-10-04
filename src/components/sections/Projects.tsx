import { ArrowUpRight, Star } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { ProjectVisual } from "@/components/projects/ProjectVisual";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Link } from "@/i18n/navigation";
import { projects, type Project } from "@/lib/projects";
import { cn } from "@/lib/utils";

const layout: Record<Project["key"], { li: string; card: string; visual: string }> = {
  omnichannel: {
    li: "lg:col-span-2 lg:row-span-2",
    card: "flex flex-col",
    visual: "aspect-[16/11] lg:aspect-auto lg:min-h-[360px] lg:flex-1",
  },
  inventory: { li: "", card: "flex flex-col", visual: "aspect-[16/10]" },
  mobile: { li: "", card: "flex flex-col", visual: "aspect-[16/10]" },
  webapps: {
    li: "md:col-span-2 lg:col-span-3",
    card: "flex flex-col lg:grid lg:grid-cols-[1.1fr_0.9fr]",
    visual: "aspect-[16/10] lg:aspect-auto lg:min-h-[300px] lg:order-last",
  },
};

export async function Projects() {
  const t = await getTranslations("projects");

  return (
    <section
      id="projects"
      aria-labelledby="projects-title"
      className="relative overflow-hidden border-y border-line bg-bg-soft py-24 md:py-32"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 start-1/2 size-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgb(34_211_238/0.08),transparent_60%)] rtl:translate-x-1/2"
      />
      <div className="container-page relative">
        <SectionHeading
          index="04"
          eyebrow={t("eyebrow")}
          title={t("title")}
          intro={t("intro")}
          id="projects-title"
        />

        <ul className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => {
            const base = `items.${project.key}`;
            const l = layout[project.key];
            const flagship = project.flagship;
            const highlights = t.raw(`${base}.highlights`) as string[];

            return (
              <Reveal as="li" key={project.slug} delay={0.06 * i} className={cn("min-w-0", l.li, flagship && "md:col-span-2")}>
                <Link
                  href={`/projects/${project.slug}`}
                  className={cn(
                    "card group relative h-full overflow-hidden transition-[transform,border-color,box-shadow] duration-500 hover:-translate-y-1.5 hover:border-accent/40 hover:shadow-[0_30px_60px_-30px_var(--glow)]",
                    l.card,
                    flagship && "border-accent/25",
                  )}
                >
                  {flagship ? (
                    <div
                      aria-hidden="true"
                      className="absolute inset-x-0 top-0 z-10 h-px bg-[linear-gradient(90deg,transparent,var(--accent),var(--accent-2),transparent)]"
                    />
                  ) : null}

                  <div className={cn("relative overflow-hidden border-b border-line lg:border-b-0", l.visual, project.key === "webapps" && "lg:border-s")}>
                    <ProjectVisual
                      kind={project.visual}
                      cover={project.cover}
                      className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                      sizes={flagship ? "(min-width: 1024px) 760px, 100vw" : "(min-width: 1024px) 380px, 100vw"}
                    />
                    {flagship ? (
                      <span className="glass absolute start-4 top-4 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold text-fg">
                        <Star className="size-3.5 fill-accent text-accent" aria-hidden="true" />
                        {t("flagship")}
                      </span>
                    ) : null}
                  </div>

                  <div className={cn("relative flex flex-col p-6 md:p-8", flagship ? "lg:p-10" : "flex-1")}>
                    <p className="text-xs font-medium text-subtle">
                      <span className="text-accent-ink">{t(`${base}.org`)}</span>
                      <span aria-hidden="true"> · </span>
                      <bdi>{t(`${base}.period`)}</bdi>
                    </p>
                    <h3
                      className={cn(
                        "mt-3 font-display font-semibold leading-tight tracking-tight text-fg",
                        flagship ? "text-2xl md:text-3xl" : "text-xl",
                      )}
                    >
                      {t(`${base}.title`)}
                    </h3>
                    <p className={cn("mt-3 leading-relaxed text-muted", flagship ? "text-base md:text-lg" : "text-[0.95rem]")}>
                      {t(`${base}.summary`)}
                    </p>

                    {flagship || project.key === "webapps" ? (
                      <ul className="mt-5 grid gap-2 sm:grid-cols-3">
                        {highlights.map((h) => (
                          <li
                            key={h}
                            className="rounded-xl border border-line bg-bg/50 px-3 py-2.5 text-xs font-medium leading-snug text-fg/90"
                          >
                            {h}
                          </li>
                        ))}
                      </ul>
                    ) : null}

                    <ul className="mt-5 flex flex-wrap gap-1.5">
                      {project.stack.slice(0, flagship ? 7 : 4).map((tech) => (
                        <li key={tech} className="rounded-md bg-fg/[0.05] px-2 py-1 font-mono text-[0.7rem] text-muted">
                          {tech}
                        </li>
                      ))}
                    </ul>

                    <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-medium text-accent-ink">
                      {t("viewCase")}
                      <ArrowUpRight
                        className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 rtl:-scale-x-100 rtl:group-hover:-translate-x-0.5"
                        aria-hidden="true"
                      />
                    </span>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

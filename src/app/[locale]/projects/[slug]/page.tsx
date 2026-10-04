import {
  ArrowLeft,
  ArrowRight,
  Bot,
  CalendarClock,
  ChartColumn,
  Database,
  Layers,
  Lock,
  Monitor,
  Network,
  Package,
  Quote,
  Rocket,
  ShieldCheck,
  ShoppingCart,
  Star,
  TabletSmartphone,
  TrendingUp,
  Users,
  Workflow,
} from "lucide-react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { ReactNode } from "react";
import { ArchitectureDiagram } from "@/components/projects/ArchitectureDiagram";
import { CaseNav } from "@/components/projects/CaseNav";
import { ProjectVisual } from "@/components/projects/ProjectVisual";
import { buttonClasses } from "@/components/ui/button";
import { Reveal } from "@/components/ui/Reveal";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { getAdjacentProject, getProject, projectSlugs, type FeatureIcon } from "@/lib/projects";
import { ogLocales, siteConfig } from "@/lib/site";

type Props = { params: Promise<{ locale: string; slug: string }> };

const featureIcons: Record<FeatureIcon, typeof Layers> = {
  layers: Layers,
  bot: Bot,
  trending: TrendingUp,
  calendar: CalendarClock,
  network: Network,
  workflow: Workflow,
  package: Package,
  cart: ShoppingCart,
  chart: ChartColumn,
  devices: TabletSmartphone,
  rocket: Rocket,
  lock: Lock,
  shield: ShieldCheck,
  database: Database,
  monitor: Monitor,
  users: Users,
};

export const dynamicParams = false;

export function generateStaticParams() {
  return projectSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  const t = await getTranslations({ locale, namespace: "projects" });
  const title = t(`items.${project.key}.title`);
  const description = t(`items.${project.key}.summary`);
  const path = `/projects/${slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}${path}`,
      languages: {
        ...Object.fromEntries(routing.locales.map((l) => [l, `/${l}${path}`])),
        "x-default": `/${routing.defaultLocale}${path}`,
      },
    },
    openGraph: {
      type: "article",
      siteName: siteConfig.name,
      title,
      description,
      url: `/${locale}${path}`,
      locale: ogLocales[locale],
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

function CaseSection({
  id,
  index,
  title,
  children,
}: {
  id: string;
  index: number;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`}>
      <Reveal>
        <p className="flex items-center gap-3 text-sm text-accent-ink">
          <span className="font-mono text-xs text-subtle">0{index}</span>
          <span aria-hidden="true" className="h-px w-8 bg-accent/60" />
        </p>
        <h2 id={`${id}-title`} className="mt-3 font-display text-2xl font-semibold tracking-tight text-fg md:text-3xl">
          {title}
        </h2>
      </Reveal>
      <div className="mt-6">{children}</div>
    </section>
  );
}

export default async function CaseStudyPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const project = getProject(slug);
  if (!project) notFound();

  const t = await getTranslations("projects");
  const tc = await getTranslations("caseStudy");
  const base = `items.${project.key}`;
  const title = t(`${base}.title`);
  const features = t.raw(`${base}.features`) as { title: string; text: string }[];
  const next = getAdjacentProject(slug);

  const sectionIds = [
    "challenge",
    "solution",
    ...(project.flagship ? ["architecture"] : []),
    "features",
    "stack",
    "outcome",
  ] as const;
  const navItems = sectionIds.map((id) => ({ id, title: tc(`sections.${id}`) }));
  const indexOf = (id: (typeof sectionIds)[number]) => sectionIds.indexOf(id) + 1;

  const meta = [
    { label: tc("meta.role"), value: t(`${base}.role`) },
    { label: tc("meta.period"), value: t(`${base}.period`), isolate: true },
    { label: tc("meta.context"), value: t(`${base}.org`) },
    { label: tc("meta.stack"), value: project.stack.slice(0, 3).join(" · "), isolate: true },
  ];

  return (
    <article>
      {/* Hero */}
      <header className="relative isolate overflow-hidden pb-12 pt-[calc(var(--header-h)+40px)] md:pb-16">
        <div aria-hidden="true" className="absolute inset-0 -z-10">
          <div className="bg-grid mask-radial absolute inset-0 opacity-70" />
          <div className="absolute -top-56 start-[-10%] size-[640px] rounded-full bg-[radial-gradient(circle,rgb(34_211_238/0.14),transparent_65%)]" />
          <div className="absolute -top-24 end-[-15%] size-[600px] rounded-full bg-[radial-gradient(circle,rgb(59_130_246/0.14),transparent_65%)]" />
        </div>
        <div className="container-page">
          <Link
            href={{ pathname: "/", hash: "projects" }}
            className="group inline-flex items-center gap-2 rounded-full border border-line bg-surface/50 px-4 py-2 text-sm text-muted backdrop-blur transition-colors hover:text-fg"
          >
            <ArrowLeft
              className="size-4 transition-transform duration-300 group-hover:-translate-x-0.5 rtl:-scale-x-100 rtl:group-hover:translate-x-0.5"
              aria-hidden="true"
            />
            {tc("back")}
          </Link>

          <p className="animate-fade-up mt-10 flex flex-wrap items-center gap-3 text-sm font-medium text-accent-ink">
            {project.flagship ? (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-semibold">
                <Star className="size-3.5 fill-accent text-accent" aria-hidden="true" />
                {t("flagship")}
              </span>
            ) : null}
            {t(`${base}.org`)}
          </p>
          <h1
            className="animate-fade-up mt-5 max-w-4xl font-display text-4xl font-semibold leading-[1.05] tracking-tight text-fg sm:text-5xl lg:text-6xl"
            style={{ animationDelay: "80ms" }}
          >
            {title}
          </h1>
          <p
            className="animate-fade-up mt-6 max-w-3xl text-lg leading-relaxed text-muted sm:text-xl"
            style={{ animationDelay: "160ms" }}
          >
            {t(`${base}.summary`)}
          </p>

          <dl
            className="animate-fade-up mt-10 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4"
            style={{ animationDelay: "240ms" }}
          >
            {meta.map((item) => (
              <div key={item.label} className="flex flex-col-reverse gap-1 bg-bg px-5 py-4">
                <dd className="text-sm font-medium text-fg">
                  {item.isolate ? <bdi>{item.value}</bdi> : item.value}
                </dd>
                <dt className="text-xs font-medium uppercase tracking-[0.14em] text-subtle">{item.label}</dt>
              </div>
            ))}
          </dl>
        </div>
      </header>

      {/* Visual */}
      <div className="container-page">
        <div className="animate-fade-up card overflow-hidden p-2" style={{ animationDelay: "320ms" }}>
          <ProjectVisual
            kind={project.visual}
            cover={project.cover}
            alt={title}
            priority
            sizes="(min-width: 1216px) 1152px, 100vw"
            className="aspect-[4/3] rounded-[1.1rem] sm:aspect-[16/9]"
          />
        </div>
      </div>

      {/* Body */}
      <div className="container-page grid gap-12 py-20 md:py-28 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-20">
        <aside className="hidden lg:block">
          <CaseNav label={tc("navLabel")} items={navItems} />
        </aside>

        <div className="min-w-0 max-w-3xl space-y-20 md:space-y-28">
          <CaseSection id="challenge" index={indexOf("challenge")} title={tc("sections.challenge")}>
            <Reveal>
              <p className="text-xl leading-relaxed text-fg/90">{t(`${base}.challenge`)}</p>
            </Reveal>
          </CaseSection>

          <CaseSection id="solution" index={indexOf("solution")} title={tc("sections.solution")}>
            <Reveal>
              <p className="text-lg leading-relaxed text-muted">{t(`${base}.solution`)}</p>
            </Reveal>
          </CaseSection>

          {project.flagship ? (
            <CaseSection id="architecture" index={indexOf("architecture")} title={tc("sections.architecture")}>
              <Reveal>
                <p className="text-lg leading-relaxed text-muted">{tc("architectureIntro")}</p>
              </Reveal>
              <Reveal className="mt-8 lg:-me-24 xl:-me-40">
                <ArchitectureDiagram />
              </Reveal>
            </CaseSection>
          ) : null}

          <CaseSection id="features" index={indexOf("features")} title={tc("sections.features")}>
            <ul className="grid gap-4 sm:grid-cols-2">
              {features.map((feature, i) => {
                const Icon = featureIcons[project.featureIcons[i] ?? "layers"];
                return (
                  <Reveal as="li" key={feature.title} delay={0.05 * (i % 2)}>
                    <SpotlightCard className="h-full p-6 transition-transform duration-500 hover:-translate-y-1">
                      <span className="inline-flex size-11 items-center justify-center rounded-xl bg-[linear-gradient(135deg,rgb(34_211_238/0.2),rgb(59_130_246/0.2))] text-accent-ink ring-1 ring-accent/25">
                        <Icon className="size-5" aria-hidden="true" />
                      </span>
                      <h3 className="mt-5 font-display text-lg font-semibold tracking-tight text-fg">{feature.title}</h3>
                      <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">{feature.text}</p>
                    </SpotlightCard>
                  </Reveal>
                );
              })}
            </ul>
          </CaseSection>

          <CaseSection id="stack" index={indexOf("stack")} title={tc("sections.stack")}>
            <Reveal>
              <ul className="flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <li
                    key={tech}
                    className="rounded-xl border border-line bg-surface/60 px-4 py-2 font-mono text-sm text-fg/90 transition-colors hover:border-accent/50"
                  >
                    {tech}
                  </li>
                ))}
              </ul>
            </Reveal>
          </CaseSection>

          <CaseSection id="outcome" index={indexOf("outcome")} title={tc("sections.outcome")}>
            <Reveal>
              <div className="relative overflow-hidden rounded-3xl border border-accent/30 bg-[linear-gradient(135deg,rgb(34_211_238/0.1),rgb(59_130_246/0.08))] p-8 md:p-12">
                <div
                  aria-hidden="true"
                  className="absolute -end-20 -top-20 size-64 rounded-full bg-[radial-gradient(circle,var(--glow),transparent_70%)]"
                />
                <Quote className="relative size-8 text-accent-ink rtl:-scale-x-100" aria-hidden="true" />
                <p className="relative mt-6 font-display text-xl font-medium leading-snug text-fg md:text-2xl">
                  {t(`${base}.outcome`)}
                </p>
              </div>
            </Reveal>
          </CaseSection>
        </div>
      </div>

      {/* Next project + CTA */}
      <section aria-label={tc("next")} className="border-t border-line bg-bg-soft">
        <div className="container-page grid gap-5 py-20 md:grid-cols-2 md:py-24">
          <Link
            href={`/projects/${next.slug}`}
            className="card group relative flex min-h-[220px] flex-col justify-between overflow-hidden p-8 transition-[transform,border-color] duration-500 hover:-translate-y-1 hover:border-accent/40"
          >
            <div aria-hidden="true" className="absolute inset-0 opacity-30 transition-opacity duration-500 group-hover:opacity-50">
              <ProjectVisual kind={next.visual} className="absolute inset-0" />
            </div>
            <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(to_top,var(--surface)_30%,transparent)]" />
            <p className="relative text-sm font-medium text-subtle">{tc("next")}</p>
            <div className="relative flex items-end justify-between gap-6">
              <p className="font-display text-2xl font-semibold leading-tight tracking-tight text-fg">
                {t(`items.${next.key}.title`)}
              </p>
              <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-full border border-line-strong text-fg transition-all duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-on-accent">
                <ArrowRight className="size-5 rtl:-scale-x-100" aria-hidden="true" />
              </span>
            </div>
          </Link>

          <div className="card flex min-h-[220px] flex-col justify-between p-8">
            <div>
              <h2 className="font-display text-2xl font-semibold tracking-tight text-fg">{tc("ctaTitle")}</h2>
              <p className="mt-2 text-muted">{tc("ctaText")}</p>
            </div>
            <Link href={{ pathname: "/", hash: "contact" }} className={buttonClasses("primary", "md", "mt-6 self-start")}>
              {tc("ctaButton")}
              <ArrowRight className="size-4 rtl:-scale-x-100" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}

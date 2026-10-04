import { routing } from "@/i18n/routing";
import { ogTextMessages } from "@/lib/og/messages";
import { ogSize, renderOgImage } from "@/lib/og/render";
import { getProject, projectSlugs } from "@/lib/projects";

type Params = { locale: string; slug: string };

export const dynamic = "force-static";
export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => projectSlugs.map((slug) => ({ locale, slug })));
}

export default async function OpenGraphImage({ params }: { params: Promise<Params> }) {
  const { locale, slug } = await params;
  const project = getProject(slug);
  const { hero, projects } = ogTextMessages(locale);
  return renderOgImage({
    eyebrow: hero.name,
    title: project ? projects.items[project.key].title : hero.name,
    subtitle: project ? projects.items[project.key].org : hero.title,
    chips: project ? project.stack.slice(0, 4) : [],
  });
}

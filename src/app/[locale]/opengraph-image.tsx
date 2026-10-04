import { routing } from "@/i18n/routing";
import { ogTextMessages } from "@/lib/og/messages";
import { ogSize, renderOgImage } from "@/lib/og/render";

export const dynamic = "force-static";
export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function OpenGraphImage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const { hero } = ogTextMessages(locale);
  return renderOgImage({
    eyebrow: hero.badge,
    title: hero.name,
    subtitle: hero.title,
    chips: ["Laravel", "React", "React Native", "FastAPI", "REST APIs"],
  });
}

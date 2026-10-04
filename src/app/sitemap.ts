export const dynamic = "force-static";

import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { projectSlugs } from "@/lib/projects";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", ...projectSlugs.map((slug) => `/projects/${slug}`)];
  const lastModified = new Date();

  return paths.flatMap((path) =>
    routing.locales.map((locale) => ({
      url: `${siteConfig.url}/${locale}${path}/`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : 0.8,
      alternates: {
        languages: {
          ...Object.fromEntries(routing.locales.map((l) => [l, `${siteConfig.url}/${l}${path}/`])),
          "x-default": `${siteConfig.url}/${routing.defaultLocale}${path}/`,
        },
      },
    })),
  );
}

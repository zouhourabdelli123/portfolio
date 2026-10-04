export const dynamic = "force-static";

import type { MetadataRoute } from "next";
import { asset, siteConfig } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: siteConfig.initials,
    start_url: asset("/"),
    display: "standalone",
    background_color: "#0a1628",
    theme_color: "#0a1628",
    icons: [
      { src: asset("/icon.svg"), sizes: "any", type: "image/svg+xml" },
      { src: asset("/apple-icon.png"), sizes: "180x180", type: "image/png" },
    ],
  };
}

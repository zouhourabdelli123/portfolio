import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

/**
 * Static export for GitHub Pages.
 * NEXT_PUBLIC_BASE_PATH is "" for a <user>.github.io repository, or "/<repo>"
 * for a project repository (set automatically by .github/workflows/deploy.yml).
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath,
  reactStrictMode: true,
  images: {
    // GitHub Pages has no image optimisation server.
    unoptimized: true,
  },
};

export default withNextIntl(nextConfig);

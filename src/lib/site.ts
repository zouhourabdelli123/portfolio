/**
 * Central site configuration.
 *
 * Privacy: no email address or phone number is published anywhere on the site.
 * Visitors reach Zouhour only through the contact form, delivered by Web3Forms:
 * the access key below identifies the inbox without revealing it, so it is
 * safe to keep in public code.
 */

/** "" on <user>.github.io, "/<repo>" on a project page. Set at build time. */
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** Prefix a path from /public with the deployment base path. */
export const asset = (path: string) => `${basePath}${path}`;

function resolveSiteUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  return `http://localhost:3000${basePath}`;
}

export const siteConfig = {
  url: resolveSiteUrl().replace(/\/$/, ""),
  name: "Zouhour Abdelli",
  initials: "ZA",
  linkedin: "https://www.linkedin.com/in/abdelli-zouhour",
  github: "https://github.com/zouhourabdelli123",
  cvPath: "/cv.pdf", // TODO(cv): add public/cv.pdf
  /**
   * Web3Forms access key (https://web3forms.com → enter the inbox address →
   * the key arrives by email). Paste it here, or set the
   * NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY repository variable.
   */
  web3formsAccessKey: process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || "e6473ae4-5174-4964-87ff-31c0143c00cf",
} as const;

export const ogLocales: Record<string, string> = {
  en: "en_US",
  fr: "fr_FR",
  ar: "ar_TN",
};

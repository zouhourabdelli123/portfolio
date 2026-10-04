import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "fr", "ar"],
  defaultLocale: "en",
  localePrefix: "always",
  // Remember the visitor's language choice for a year.
  localeCookie: {
    maxAge: 60 * 60 * 24 * 365,
  },
});

export type Locale = (typeof routing.locales)[number];

export const rtlLocales: readonly Locale[] = ["ar"];

export function getDirection(locale: string): "rtl" | "ltr" {
  return rtlLocales.includes(locale as Locale) ? "rtl" : "ltr";
}

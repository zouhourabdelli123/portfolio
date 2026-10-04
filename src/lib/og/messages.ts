import ar from "../../../messages/ar.json";
import en from "../../../messages/en.json";
import fr from "../../../messages/fr.json";

const all = { en, fr, ar };

/**
 * Direct message access for OG image routes, which run in build-time
 * contexts where next-intl's request-scoped APIs aren't available.
 */
export function ogMessages(locale: string) {
  return all[locale as keyof typeof all] ?? en;
}

/** Satori cannot shape Arabic script, so image text for Arabic uses English. */
export function ogTextMessages(locale: string) {
  return locale === "ar" ? en : ogMessages(locale);
}

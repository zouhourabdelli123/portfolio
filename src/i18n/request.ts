import { hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

export default getRequestConfig(async ({ locale: explicitLocale, requestLocale }) => {
  // An explicit locale (getTranslations({ locale })) avoids reading request
  // headers, which matters in build-time contexts like OG image metadata.
  const requested = explicitLocale ?? (await requestLocale);
  const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale;

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});

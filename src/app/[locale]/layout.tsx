import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import Script from "next/script";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import type { ReactNode } from "react";
import { DeferredIslands } from "@/components/layout/DeferredIslands";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { getDirection, routing } from "@/i18n/routing";
import { inter, plexArabic, spaceGrotesk } from "@/lib/fonts";
import { ogLocales, siteConfig } from "@/lib/site";

type Props = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

// Namespaces needed by Client Components. Everything else stays on the server.
const CLIENT_NAMESPACES = ["a11y", "nav", "languages", "contact"] as const;

// Runs before paint: dark by default, light only if the visitor chose it.
// Also remembers the current language for the "/" redirect page.
const themeScript = `(function(){try{var d=document.documentElement;localStorage.setItem('locale',d.lang);var t=localStorage.getItem('theme');if(t==='light'){d.classList.remove('dark');d.style.colorScheme='light';var m=document.querySelector('meta[name="theme-color"]');if(m)m.setAttribute('content','#f6f9fc');}else{d.classList.add('dark');d.style.colorScheme='dark';}}catch(e){}})();`;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  themeColor: "#0a1628",
  colorScheme: "dark light",
  width: "device-width",
  initialScale: 1,
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });

  const languages = Object.fromEntries(routing.locales.map((l) => [l, `/${l}`]));

  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: t("title"),
      template: `%s — ${t("shortTitle")}`,
    },
    description: t("description"),
    keywords: t.raw("keywords") as string[],
    applicationName: siteConfig.name,
    authors: [{ name: siteConfig.name, url: siteConfig.url }],
    creator: siteConfig.name,
    alternates: {
      canonical: `/${locale}`,
      languages: { ...languages, "x-default": `/${routing.defaultLocale}` },
    },
    openGraph: {
      type: "website",
      siteName: siteConfig.name,
      title: t("title"),
      description: t("description"),
      url: `/${locale}`,
      locale: ogLocales[locale],
      alternateLocale: routing.locales.filter((l) => l !== locale).map((l) => ogLocales[l]),
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
    },
    robots: { index: true, follow: true },
    formatDetection: { telephone: false },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const messages = await getMessages();
  const clientMessages = Object.fromEntries(
    CLIENT_NAMESPACES.map((ns) => [ns, messages[ns]]),
  );
  const t = await getTranslations("a11y");

  return (
    <html
      lang={locale}
      dir={getDirection(locale)}
      className={`dark ${inter.variable} ${spaceGrotesk.variable} ${plexArabic.variable}`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <head>
        <noscript>
          <style>{"[data-reveal]{opacity:1!important;transform:none!important}"}</style>
        </noscript>
      </head>
      <body className="font-sans" suppressHydrationWarning>
        {/* Injected into <head> by Next before hydration: no theme flash, no client re-render. */}
        <Script id="theme-init" strategy="beforeInteractive">
          {themeScript}
        </Script>
        <NextIntlClientProvider locale={locale} messages={clientMessages}>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-on-accent"
          >
            {t("skipToContent")}
          </a>
          <Header />
          <main id="main" tabIndex={-1} className="outline-none">
            {children}
          </main>
          <Footer />
          <DeferredIslands />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

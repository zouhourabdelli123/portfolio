import en from "../../messages/en.json";
import { routing } from "@/i18n/routing";
import { basePath } from "@/lib/site";
import "./globals.css";

/*
 * Static hosting has no server-side locale detection, so "/" picks the
 * language in the browser: last language visited (saved by the locale
 * layout), else the browser language, else English.
 */
const redirectScript = `(function(){var l=${JSON.stringify(routing.locales)},b=${JSON.stringify(basePath)},s=null;try{s=localStorage.getItem('locale')}catch(e){}if(l.indexOf(s)<0){var n=(navigator.languages||[navigator.language||'']);for(var i=0;i<n.length&&l.indexOf(s)<0;i++){s=String(n[i]).slice(0,2).toLowerCase()}}if(l.indexOf(s)<0)s=${JSON.stringify(routing.defaultLocale)};location.replace(b+'/'+s+'/'+location.hash)})();`;

export default function RootRedirect() {
  return (
    <html lang="en" className="dark">
      <head>
        <title>{en.meta.title}</title>
        <meta name="robots" content="noindex" />
        <link rel="canonical" href={`${basePath}/${routing.defaultLocale}/`} />
        <noscript>
          <meta httpEquiv="refresh" content={`0; url=${basePath}/${routing.defaultLocale}/`} />
        </noscript>
        <script dangerouslySetInnerHTML={{ __html: redirectScript }} />
      </head>
      <body className="bg-bg font-sans text-fg">
        <nav className="flex min-h-dvh items-center justify-center gap-6 text-sm">
          {routing.locales.map((locale) => (
            <a key={locale} href={`${basePath}/${locale}/`} hrefLang={locale} lang={locale} className="text-muted hover:text-fg">
              {en.languages[locale]}
            </a>
          ))}
        </nav>
      </body>
    </html>
  );
}

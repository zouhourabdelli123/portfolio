import ar from "../../messages/ar.json";
import en from "../../messages/en.json";
import fr from "../../messages/fr.json";
import { basePath } from "@/lib/site";
import "./globals.css";

// Served by GitHub Pages as /404.html for any unknown URL (outside a locale).
const locales = [
  { code: "en", m: en },
  { code: "fr", m: fr },
  { code: "ar", m: ar },
] as const;

export default function GlobalNotFound() {
  return (
    <html lang="en" className="dark">
      <head>
        <title>{`${en.notFound.code} — ${en.meta.shortTitle}`}</title>
        <meta name="robots" content="noindex" />
      </head>
      <body className="bg-bg font-sans text-fg">
        <main className="container-page flex min-h-dvh flex-col items-center justify-center text-center">
          <p className="text-gradient font-display text-[clamp(5rem,18vw,10rem)] font-semibold leading-none tracking-tighter">
            {en.notFound.code}
          </p>
          <ul className="mt-10 grid gap-6 sm:grid-cols-3">
            {locales.map(({ code, m }) => (
              <li key={code} lang={code} dir={code === "ar" ? "rtl" : "ltr"}>
                <p className="font-display text-lg font-semibold">{m.notFound.title}</p>
                <a href={`${basePath}/${code}/`} className="mt-2 inline-block text-sm text-accent-ink underline underline-offset-4">
                  {m.notFound.cta}
                </a>
              </li>
            ))}
          </ul>
        </main>
      </body>
    </html>
  );
}

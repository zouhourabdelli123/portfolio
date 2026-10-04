# Zouhour Abdelli — Portfolio

Premium personal portfolio. Next.js App Router + TypeScript + Tailwind CSS v4 + Framer Motion + next-intl. **Static export (`output: "export"`) hosted free on GitHub Pages** via `.github/workflows/deploy.yml` — no server: no proxy/middleware, route handlers, server actions, cookies or image optimisation.

## Non-negotiable rules

1. **No hardcoded user-facing strings.** Every visible string, alt text and aria-label lives in `messages/en.json`, `messages/fr.json`, `messages/ar.json`. All three files must always have the same keys.
2. **Facts only.** Use only the facts in the content brief (experience, projects, education, skills). Never invent clients, numbers, metrics or achievements. No specific number of years in the hero; stats use "4+ years building software" / "Since 2022".
3. **Translations are natural and professional**, never literal. French and Arabic use feminine forms for Zouhour (Ingénieure, Développeuse, مهندسة, مطوّرة).
4. **RTL is first-class.** Arabic sets `dir="rtl"` on `<html>`. Use logical utilities only (`ms-`, `me-`, `ps-`, `pe-`, `start-`, `end-`, `text-start`, `border-s`…), never `ml-`/`mr-`/`left-`/`right-` for layout. Directional icons get `rtl:-scale-x-100`. Never use negative letter-spacing on Arabic (handled globally in `globals.css`).
5. **Images** always via `next/image` with translated alt text. Profile photo: `public/images/profile.jpg`. Project screenshots go in `public/images/projects/[slug]/` (see TODOs in `src/lib/projects.ts`).
6. **Accessibility:** WCAG AA contrast in both themes, semantic HTML, visible focus rings (`focus-visible`), keyboard navigable, aria labels, respect `prefers-reduced-motion`.
7. **Performance:** Lighthouse 95+. Sections are Server Components; only small interactive islands are Client Components. Framer Motion is kept **out of the initial bundle**: it powers only the deferred islands in `components/layout/MotionIslands.tsx` (cursor, scroll-progress button), loaded after hydration via `DeferredIslands` (`LazyMotion` + `m.*`). Scroll reveals, magnetic buttons, the timeline rail and menus use CSS + IntersectionObserver/rAF. Hero LCP text uses `animate-rise` (transform only, never opacity 0). No heavy libraries.
8. **Privacy:** never publish an email address or phone number (page, JSON-LD, client bundle, repo). Contact happens only through the form → Web3Forms (browser-side; the access key is public-safe and hides the inbox). Location is Sfax, Tunisia.
9. **Design tokens** are CSS variables in `src/app/globals.css` (dark default, light via toggle). Use token classes (`bg-bg`, `text-fg`, `text-muted`, `border-line`, `text-accent`…), not raw hex, in components. 8px spacing rhythm (even Tailwind steps).

## Structure

```
messages/                 en.json, fr.json, ar.json (all copy)
public/images/            profile.jpg, projects/[slug]/
src/app/[locale]/         layout, home page, projects/[slug] case studies, OG image
src/app/                  page.tsx ("/" → language redirect), not-found.tsx (404.html), sitemap.ts, robots.ts, icon.svg, apple-icon.png, globals.css
src/components/layout/    Header, Footer, LanguageSwitcher, ThemeToggle, DeferredIslands → MotionIslands (ScrollToTop, CustomCursor)
src/components/sections/  Hero, About, Skills, Experience, Projects, Education, Contact
src/components/projects/  ProjectVisual (SVG placeholder mockups), ArchitectureDiagram, CaseNav
src/components/ui/        Reveal, Magnetic, SpotlightCard, SectionHeading, button, icons
src/i18n/                 routing, navigation, request
src/lib/                  site.ts (contact links + URL), projects.ts, skills.ts, experience.ts, sections.ts, fonts.ts, og/ (OG image renderer)
scripts/                  check-messages.mjs (prebuild), postexport.mjs (postbuild: .png extension for OG images)
.github/workflows/        deploy.yml (GitHub Pages)
```

## Commands

- `npm run dev` — dev server
- `npm run build` — production build (must pass with zero errors)
- `npm run lint` — ESLint
- `npm run check:messages` — verify en/fr/ar keys match (also runs automatically before `build`)

## Config

- `NEXT_PUBLIC_BASE_PATH` / `NEXT_PUBLIC_SITE_URL` — set by the Pages workflow (base path "" or "/<repo>")
- `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` — or paste the key in `src/lib/site.ts`
- Public links (LinkedIn, GitHub): `src/lib/site.ts`
- CV: drop `public/cv.pdf`

## Gotchas

- OG image routes (`opengraph-image.tsx`) read messages through `src/lib/og/messages.ts`, not next-intl (request APIs are unavailable at build time there). Satori can't shape Arabic, so Arabic cards reuse English copy.
- Navigating between locales is a full page load (each locale is its own root layout) — expected.
- Base path: never hardcode `/…` URLs to files in `public/` — use `asset()` from `src/lib/site.ts` (or a static import for images). Next prefixes `<Link>`, `_next` assets and metadata files itself.
- Language memory: the locale layout stores `localStorage.locale`; `app/page.tsx` redirects `/` with it (no server-side detection on static hosting).
- Building locally in Git Bash with a base path: prefix with `MSYS_NO_PATHCONV=1`.
- Fonts: Arabic font is not preloaded (keeps Latin pages lean); Space Grotesk ships 500/600, Plex Arabic 400/600.

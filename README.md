# Zouhour Abdelli — Portfolio

Personal portfolio of Zouhour Abdelli, Software Engineer · Full-Stack Developer.
Next.js 16 (static export) · TypeScript · Tailwind CSS v4 · Framer Motion · next-intl (EN / FR / AR with full RTL).
Hosted for free on **GitHub Pages**.

## Quick start

```bash
npm install
npm run dev        # http://localhost:3000 → redirects to /en/ (or the last / browser language)
npm run build      # static site in ./out (checks translation keys first)
```

## Contact form (one-time setup, ~1 minute)

The site never shows an email address or phone number. Messages are delivered by
[Web3Forms](https://web3forms.com) (free, 250 messages/month):

1. Open https://web3forms.com, type the inbox that should receive messages, click **Create Access Key**.
2. The access key arrives by email (check spam). It is safe to publish: it does not reveal the address.
3. Paste it in `src/lib/site.ts` → `web3formsAccessKey: process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || "PASTE-KEY-HERE"`,
   **or** add it on GitHub: *Settings → Secrets and variables → Actions → Variables → New variable* named `WEB3FORMS_ACCESS_KEY`.
4. Push — the next deployment has a working form.

## Publish on GitHub Pages (free)

1. Create a repository on GitHub. Tip: name it **`zouhourabdelli123.github.io`** to get the short URL
   `https://zouhourabdelli123.github.io/`; any other name works too (`https://zouhourabdelli123.github.io/<repo>/`).
2. Push this folder to the `main` branch:
   ```bash
   git add -A
   git commit -m "Portfolio"
   git branch -M main
   git remote add origin https://github.com/zouhourabdelli123/<repo>.git
   git push -u origin main
   ```
3. On GitHub: *Settings → Pages → Build and deployment → Source* = **GitHub Actions**.
4. The workflow `.github/workflows/deploy.yml` builds and deploys on every push to `main`
   (progress in the **Actions** tab). The base path and canonical URL are configured automatically.
5. Submit `https://<your-site>/sitemap.xml` in Google Search Console.

## Content

| What | Where |
| --- | --- |
| All text (EN / FR / AR) | `messages/en.json`, `messages/fr.json`, `messages/ar.json` |
| LinkedIn & GitHub URLs, form key | `src/lib/site.ts` |
| CV | add `public/cv.pdf` |
| Project screenshots | `public/images/projects/<slug>/cover.jpg`, then set `cover` in `src/lib/projects.ts` |

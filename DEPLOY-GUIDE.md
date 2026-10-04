# How to put this portfolio online (free, GitHub Pages)

Time needed: about 10 minutes. You only need a browser and a GitHub account.
Final address: **https://zouhourabdelli123.github.io/**

---

## Step 1 — Get the contact-form key (2 min)

The form sends visitors' messages to your inbox without ever showing your email on the site.

1. Go to **https://web3forms.com**
2. In "Create your Access Key", type **zouhourabdelli.dev@gmail.com** and click **Create Access Key**.
3. Open your Gmail (check **Spam** too): you receive a key that looks like
   `a1b2c3d4-1234-5678-9abc-def012345678`. Keep it for Step 5.

## Step 2 — Create the repository (1 min)

1. Log in to **https://github.com** (account `zouhourabdelli123`).
2. Top right **+** → **New repository**.
3. Repository name: **`zouhourabdelli123.github.io`** (exactly this, so the site gets the short address).
4. Visibility: **Public** (required for free GitHub Pages).
5. Do **not** tick "Add a README", ".gitignore" or "license".
6. Click **Create repository**.

## Step 3 — Turn on GitHub Pages (30 s)

1. In the new repository: **Settings** → left menu **Pages**.
2. Under **Build and deployment → Source**, choose **GitHub Actions**.
   (Nothing else to fill in.)

## Step 4 — Upload the files (2 min)

1. Unzip `portfolio-zouhour.zip` on your computer.
2. Open the unzipped folder. You must see `src`, `public`, `messages`, `package.json`, **and** the folder `.github`
   - On **Mac**, files starting with a dot are hidden: press **Cmd + Shift + .** in Finder to show them.
3. Back on GitHub, in the empty repository, click the link **"uploading an existing file"**.
4. **Select everything inside the folder** (all files and folders, including `.github`, `.gitignore`, `.env.example`)
   and **drag them** onto the page. Do not drag the outer folder itself.
5. Wait until all files are listed, then click **Commit changes**.

Check: the repository's file list must show a `.github` folder. If it is missing, upload it again (Add file → Upload files).

## Step 5 — Add the form key (1 min)

1. In the repository, open `src` → `lib` → `site.ts`, click the **pencil ✏️** (Edit).
2. Find this line:
   ```ts
   web3formsAccessKey: process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || "",
   ```
3. Paste your key between the last two quotes:
   ```ts
   web3formsAccessKey: process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || "a1b2c3d4-1234-5678-9abc-def012345678",
   ```
4. Click **Commit changes…** → **Commit changes**.

(The key is safe to be public: it does not reveal your email.)

## Step 6 — Wait for the site (2–3 min)

1. Open the **Actions** tab: a run called **"Deploy to GitHub Pages"** is working (yellow dot).
2. When it turns into a **green check ✅**, your site is online at **https://zouhourabdelli123.github.io/**
3. Test the form: send yourself a message → it arrives in Gmail (first one may land in Spam: mark it "Not spam").

If a run shows a **red ✗**: open it → click **Re-run all jobs** (this happens if Pages was enabled after the upload).

---

## Later changes

Every change committed to the repository redeploys the site automatically (2–3 min).

| To change… | Edit this file on GitHub |
| --- | --- |
| Any text (English / French / Arabic) | `messages/en.json`, `messages/fr.json`, `messages/ar.json` |
| LinkedIn / GitHub links, form key | `src/lib/site.ts` |
| Add your CV (for the "Download CV" button) | upload a file named **`cv.pdf`** into the `public` folder |
| Add project screenshots | upload `cover.jpg` into `public/images/projects/<project-name>/`, then set `cover` in `src/lib/projects.ts` |

Optional — Google: after the site is online, add it to https://search.google.com/search-console and submit
`https://zouhourabdelli123.github.io/sitemap.xml`.

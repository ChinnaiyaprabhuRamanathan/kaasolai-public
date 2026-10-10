# kaasolai

The public website — **https://kaasolai.in** — hosted free on GitHub Pages.
It is a static Jekyll site built from Markdown files, with no server, no
database, no trackers, no ads and no cookies.

Every page is an exact word-for-word copy of the original
[financechinny.wordpress.com](https://financechinny.wordpress.com/) content.

---

## 1. First-time publish (from a fresh machine)

```sh
git clone https://github.com/chinnaiyaprabhuramanathan/kaasolai-public.git
cd kaasolai-public
```

## 2. Build locally (optional, only if you have Ruby)

```sh
gem install jekyll bundler
bundle install
bundle exec jekyll serve
```

Open http://localhost:4000. You do **not** need this step for GitHub hosting —
GitHub Pages builds automatically.

## 3. Upload to GitHub Pages

1. Go to **github.com → kaasolai-public → Settings → Pages**.
2. Under **Build and deployment**: Source = **Deploy from a branch**, Branch =
   **main**, folder = `/(root)`, click **Save**.
3. After the first build finishes, the site is live (on the custom domain once
   DNS is set, below).

## 4. Custom domain — DNS records

Add these records at your domain registrar (where kaasolai.in is managed):

| Type  | Name            | Value                                |
|-------|-----------------|--------------------------------------|
| A     | @               | 185.199.108.153                      |
| A     | @               | 185.199.109.153                      |
| A     | @               | 185.199.110.153                      |
| A     | @               | 185.199.111.153                      |
| CNAME | www             | chinnaiyaprabhuramanathan.github.io  |

The `CNAME` file in this repo already says `kaasolai.in`.

5. Back in **Settings → Pages**, add the custom domain `kaasolai.in` and let
   GitHub verify it, then tick **Enforce HTTPS** (GitHub issues the
   certificate. HTTPS becomes mandatory as soon as it is active).

## 5. Editing content & the menu

- **Content**: each page is a Markdown file with YAML front matter, e.g.
  `economics.md`. Edit directly and push — GitHub redeploys in a minute or
  two.
- **Menu / order / labels**: single source of truth in
  `_data/navigation.yml`. Add or rename a nav item there and the sidebar and
  mobile menu update everywhere automatically.
- **New page**: copy an existing `.md`, change `title`, `description`,
  `permalink` (trailing slash) and `last_modified`, add it to
  `_data/navigation.yml`, done.
- **Page URL / slug**: whatever is written in `permalink` (e.g.
  `/economics/`). Do not change a slug after publishing without updating the
  legacy map in `assets/js/redirects.js`.

### Pages CMS (optional visual editor)

`.pages.yml` is included. Connect at https://app.pagescms.org with GitHub,
install the GitHub App for this repo, open the repository, and you get a
visual editor for the Markdown pages plus a media picker for images. Same
files, same pushes, same build.

## 6. Security headers note

GitHub Pages serves content from a shared CDN and **cannot set custom HTTP
headers**. For that reason the security settings live in `<meta>` tags inside
`_includes/head.html`:

- Content Security Policy (`meta http-equiv`) — scripts, styles, fonts,
  images all `'self'` only, no inline scripts, no CDNs, no trackers.
- Referrer policy `strict-origin-when-cross-origin`.
- `.well-known/security.txt` + `SECURITY.md` with a **placeholder** contact
  (`security@kaasolai.in`). Replace it with a real mailbox before going live,
  and roll the `Expires` date forward (both files).

## 7. Theme

Two themes, dark (default) and light, chosen via
`localStorage`/`prefers-color-scheme` by `assets/js/theme-init.js` (external,
runs in `<head>`). Colors are variables at the top of `assets/css/style.css`.
All fonts are self-hosted in `assets/fonts/`.

- Dark: `--bg #000000 · --text #F3EEE3 · --accent #00F5FF · --muted #8E877A · --panel #1A1917 · --border #2A2824`
- Light: `--bg #FAF8F3 · --text #111111 · --accent #007C85 · --muted #5E584D · --panel #EFEBE1 · --border #D9D3C5`

## 8. File & URL checklist

| Original page (financechinny.wordpress.com) | New URL on kaasolai.in | Content | Images |
|---|---|---|---|
| Home | `/` | ✅ | ✅ |
| `/economics/` | `/economics/` | ✅ | ✅ image-1 |
| `/personal-finance-roadmap/` | `/personal-finance-roadmap/` | ✅ | ✅ image-5, file_roadmap_1 |
| `/market/` | `/market/` | ✅ | ✅ image-3 |
| `/fundamental-analysis/` | `/fundamental-analysis/` | ✅ | ✅ image-6 |
| `/technical-analysis/` | `/technical-analysis/` | ✅ | ✅ image-1-edited |
| `/equity-funds/` | `/equity-funds/` | ✅ | ✅ image-4, image, debtfund_riskanalysis |
| `/?page_id=219` Corporate Action | `/corporate-action/` | ✅ | – |
| `/?page_id=246` Retirement Planning | `/retirement-planning/` | ✅ | – |
| `/?page_id=259` Derivatives | `/derivates/` | ✅ | – |
| `/?page_id=264` Community | `/references/` | ✅ | ✅ 9 profile images |

Legacy WordPress URLs (`?page_id=…` and `/2026/09/slug/` date-based paths)
are mapped by `assets/js/redirects.js`, loaded on the Home page and the 404
page.

## 9. Assumptions & known differences

- **Alt text**: kept exactly as the original site — empty (`alt=""`) on every
  image (WCAG note: decorative images don't need alt text; if any image is
  informative, add a short description to its `alt` in the Markdown).
- **Home page**: currently only the banner image, matching the original.
  Add an intro paragraph later by editing `index.md`.
- **Greek letters** (α β σ), **±** and **apostrophes** (’) on the Fundamental
  Analysis page were verified byte-for-byte against the source API and are
  real Unicode characters.
- **Typos preserved**: e.g. “Health Insurence”, “More buyers = Rise in
  price”, “an good start”, and the `derivates` slug are kept intentionally
  identical to the original.
- **Colors**: the red accent used for negative years/corrections in the
  Market landmarks table is reproduced with a `.neg` class approximated to the
  source (#cf2e2e → theme-aware `--danger`); WordPress's exact purple
  (text highlights) is not reproduced — bold/italic is kept instead.
- **YouTube links** open in a new tab with `rel="noopener noreferrer"` (they
  stayed as links, not embeds, matching the source's plain links).
- **Structured data**: WebSite + Organization on every page, plus
  WebPage + BreadcrumbList with `dateModified` on content pages. No FAQPage,
  because none of the pages are Q&A. `llms.txt` covers the key pages.

## 10. Repository layout

```
kaasolai-public/
├── *.md                → the 11 pages (index + 10 content pages)
├── 404.html            → not-found page (with sidebar + legacy redirections)
├── _config.yml         → site config, plugins, defaults
├── Gemfile             → local build only (GitHub Pages ignores it)
├── _data/navigation.yml→ menu (single source of truth)
├── _includes/          → head, sidebar, theme toggle, footer
├── _layouts/default.html → the shared layout
├── assets/
│   ├── css/style.css   → all styling, dark & light themes
│   ├── js/             → theme-init.js, site.js, redirects.js
│   ├── fonts/          → Playfair Display, Archivo Black (self-hosted)
│   └── images/         → all content images + icons
├── .well-known/        → security.txt
├── CNAME               → kaasolai.in
├── robots.txt          → allows all crawlers (incl. AI)
├── llms.txt            → LLM-readable index
├── sitemap.xml         → generated by jekyll-sitemap
└── site.webmanifest    → PWA basics
```
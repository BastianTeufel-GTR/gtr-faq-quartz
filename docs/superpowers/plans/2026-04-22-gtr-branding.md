# GTR Branding Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Apply GTR corporate identity (colours, typography, favicon, header logo) to the public Quartz FAQ site.

**Architecture:** Three independent changes to the Quartz site: (1) edit `quartz.config.ts` theme tokens; (2) overwrite favicon PNG files from `~/gtr-brand-assets`; (3) copy GTR Bildmarke SVGs into `quartz/static/` and edit `quartz/components/PageTitle.tsx` to render them next to the page title text, with a light/dark variant toggled by CSS on `[saved-theme="dark"]`.

**Tech Stack:** Quartz v4 (TypeScript, Preact SSR), Noto Sans via Google Fonts, GTR brand assets at `~/gtr-brand-assets/`.

**Reference spec:** `docs/superpowers/specs/2026-04-22-gtr-branding-design.md`

**Note on testing:** This is a visual/config change to a static site generator. No unit tests apply. Verification is `npm run check` (types + format) plus a manual browser spot-check at the end.

---

## File Structure

**Modified:**
- `quartz.config.ts` — theme colours, typography, pageTitle
- `quartz/components/PageTitle.tsx` — render logo images alongside title
- `quartz/static/icon.png` — overwritten (favicon source)
- `public/favicon.ico` — overwritten
- `public/favicon.png` — overwritten
- `content/favicon.png` — overwritten

**Created:**
- `quartz/static/gtr-logo.svg` — positive Bildmarke (light-mode header)
- `quartz/static/gtr-logo-negativ.svg` — negative Bildmarke (dark-mode header)

---

## Task 1: Apply GTR colour scheme and typography

**Files:**
- Modify: `quartz.config.ts` (the `configuration.theme` block)

- [ ] **Step 1: Edit `quartz.config.ts` — replace the `theme` block**

Replace the entire `theme: { ... }` object inside `configuration` with:

```ts
theme: {
  fontOrigin: "googleFonts",
  cdnCaching: true,
  typography: {
    header: "Noto Sans",
    body: "Noto Sans",
    code: "IBM Plex Mono",
  },
  colors: {
    lightMode: {
      light: "#FFFFFF",
      lightgray: "#D8DDE3",
      gray: "#B9C1CB",
      darkgray: "#2F3842",
      dark: "#002944",
      secondary: "#0099D0",
      tertiary: "#007FAC",
      highlight: "rgba(0, 153, 208, 0.15)",
      textHighlight: "#FFCC0088",
    },
    darkMode: {
      light: "#0B1A24",
      lightgray: "#2A3F52",
      gray: "#3C5470",
      darkgray: "#E6EDF3",
      dark: "#E6EDF3",
      secondary: "#0099D0",
      tertiary: "#66C2E6",
      highlight: "rgba(0, 153, 208, 0.25)",
      textHighlight: "#FFCC0066",
    },
  },
},
```

- [ ] **Step 2: Run type + format check**

Run: `npm run check`
Expected: exits 0, no errors.

- [ ] **Step 3: Commit**

```bash
git add quartz.config.ts
git commit -m "feat(branding): apply GTR colour palette and Noto Sans typography"
```

---

## Task 2: Replace favicons with GTR Bildmarke

**Files:**
- Modify: `quartz/static/icon.png`
- Modify: `public/favicon.ico`
- Modify: `public/favicon.png`
- Modify: `content/favicon.png`

- [ ] **Step 1: Verify the source favicon exists**

Run: `ls -l ~/gtr-brand-assets/favicons/gtr-favicon-bildmarke.png`
Expected: file exists, non-zero size.

- [ ] **Step 2: Overwrite the four favicon files**

Run:
```bash
cp ~/gtr-brand-assets/favicons/gtr-favicon-bildmarke.png quartz/static/icon.png
cp ~/gtr-brand-assets/favicons/gtr-favicon-bildmarke.png public/favicon.png
cp ~/gtr-brand-assets/favicons/gtr-favicon-bildmarke.png public/favicon.ico
cp ~/gtr-brand-assets/favicons/gtr-favicon-bildmarke.png content/favicon.png
```

- [ ] **Step 3: Verify the files are updated**

Run: `md5sum ~/gtr-brand-assets/favicons/gtr-favicon-bildmarke.png quartz/static/icon.png public/favicon.png public/favicon.ico content/favicon.png`
Expected: all five hashes identical.

- [ ] **Step 4: Commit**

```bash
git add quartz/static/icon.png public/favicon.ico public/favicon.png content/favicon.png
git commit -m "feat(branding): replace favicons with GTR Bildmarke"
```

---

## Task 3: Copy GTR logo SVGs into the site

**Files:**
- Create: `quartz/static/gtr-logo.svg`
- Create: `quartz/static/gtr-logo-negativ.svg`

- [ ] **Step 1: Verify source SVGs exist**

Run:
```bash
ls -l ~/gtr-brand-assets/logo/Positiv/Bildmarke/Web/gtr-bildmarke-web-rgb.svg \
      ~/gtr-brand-assets/logo/Negativ/Bildmarke/Web/gtr-bildmarke-negativ-web-rgb.svg
```
Expected: both files exist.

- [ ] **Step 2: Copy into `quartz/static/`**

Run:
```bash
cp ~/gtr-brand-assets/logo/Positiv/Bildmarke/Web/gtr-bildmarke-web-rgb.svg quartz/static/gtr-logo.svg
cp ~/gtr-brand-assets/logo/Negativ/Bildmarke/Web/gtr-bildmarke-negativ-web-rgb.svg quartz/static/gtr-logo-negativ.svg
```

- [ ] **Step 3: Verify copies**

Run: `ls -l quartz/static/gtr-logo.svg quartz/static/gtr-logo-negativ.svg`
Expected: both files exist, non-zero size.

- [ ] **Step 4: Commit**

```bash
git add quartz/static/gtr-logo.svg quartz/static/gtr-logo-negativ.svg
git commit -m "feat(branding): add GTR Bildmarke SVG assets to static"
```

---

## Task 4: Render the GTR logo in the page header

**Files:**
- Modify: `quartz.config.ts` (`pageTitle` field)
- Modify: `quartz/components/PageTitle.tsx` (full file rewrite)

- [ ] **Step 1: Update `pageTitle` in `quartz.config.ts`**

Change the line:

```ts
pageTitle: "💁 GTR FAQ",
```

to:

```ts
pageTitle: "GTR FAQ",
```

- [ ] **Step 2: Rewrite `quartz/components/PageTitle.tsx`**

Replace the entire contents of the file with:

```tsx
import { joinSegments, pathToRoot } from "../util/path"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"
import { i18n } from "../i18n"

const PageTitle: QuartzComponent = ({ fileData, cfg, displayClass }: QuartzComponentProps) => {
  const title = cfg?.pageTitle ?? i18n(cfg.locale).propertyDefaults.title
  const baseDir = pathToRoot(fileData.slug!)
  const logoLight = joinSegments(baseDir, "static/gtr-logo.svg")
  const logoDark = joinSegments(baseDir, "static/gtr-logo-negativ.svg")
  return (
    <h2 class={classNames(displayClass, "page-title")}>
      <a href={baseDir}>
        <img src={logoLight} alt="" class="page-title-logo page-title-logo-light" />
        <img src={logoDark} alt="" class="page-title-logo page-title-logo-dark" />
        <span>{title}</span>
      </a>
    </h2>
  )
}

PageTitle.css = `
.page-title {
  font-size: 1.75rem;
  margin: 0;
  font-family: var(--titleFont);
}
.page-title a {
  display: inline-flex;
  align-items: center;
  gap: 0.5em;
  text-decoration: none;
}
.page-title-logo {
  height: 1.6em;
  width: auto;
  flex-shrink: 0;
}
.page-title-logo-dark { display: none; }
:root[saved-theme="dark"] .page-title-logo-light { display: none; }
:root[saved-theme="dark"] .page-title-logo-dark  { display: inline; }
`

export default (() => PageTitle) satisfies QuartzComponentConstructor
```

- [ ] **Step 3: Run type + format check**

Run: `npm run check`
Expected: exits 0, no errors. If Prettier reports formatting issues on `PageTitle.tsx`, run `npm run format` and re-run `npm run check`.

- [ ] **Step 4: Commit**

```bash
git add quartz.config.ts quartz/components/PageTitle.tsx
git commit -m "feat(branding): replace header emoji with GTR Bildmarke logo"
```

---

## Task 5: Build and verify in a browser

- [ ] **Step 1: Build the site and serve locally**

Run: `npm run quartz build --serve`
Expected: build completes without errors, local server URL printed (typically `http://localhost:8080`).

- [ ] **Step 2: Manual browser spot-check**

Open the served URL in a browser and confirm:

1. Browser tab favicon is the GTR Bildmarke (dark blue "gtr" mark).
2. Site header shows the GTR Bildmarke SVG to the left of the text "GTR FAQ" — no 💁 emoji.
3. Body text renders in Noto Sans (not Schibsted Grotesk / Source Sans Pro).
4. Link colour is GTR secondary blue `#0099D0`.
5. Toggle dark mode (theme toggle in top-right). Header logo swaps to the white/negative variant; background becomes `#0B1A24`; links become the lighter `#66C2E6`.
6. Mobile viewport (devtools responsive mode, ~375 px wide): logo + title do not overflow the header.

- [ ] **Step 3: Stop the dev server**

Ctrl-C the `npm run quartz build --serve` process.

- [ ] **Step 4: Final check — repository state clean**

Run: `git status`
Expected: `nothing to commit, working tree clean` (all changes from Tasks 1–4 already committed).

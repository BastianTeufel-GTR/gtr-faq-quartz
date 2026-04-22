# GTR Branding for the FAQ Site — Design

**Date:** 2026-04-22
**Scope:** Apply GTR corporate identity to the public Quartz site (colours, typography, favicon, header logo). Obsidian editor theme and PDF-export template are out of scope.

## Goal

Visitors to the GTR FAQ site should see a branded experience consistent with the GTR Design Manual (2026-03-31): primary blue `#002944`, secondary blue `#0099D0`, Noto Sans typography, GTR Bildmarke as favicon and in the site header.

## Changes

### 1. Colour scheme — `quartz.config.ts`

Replace `configuration.theme.colors.lightMode` and `darkMode` with GTR-derived tokens, and typography with Noto Sans.

**Light mode**

| Token | Value | Role |
|---|---|---|
| `light` | `#FFFFFF` | Page background |
| `lightgray` | `#D8DDE3` | Borders |
| `gray` | `#B9C1CB` | Muted UI |
| `darkgray` | `#2F3842` | Body text |
| `dark` | `#002944` | Headings (GTR primary) |
| `secondary` | `#0099D0` | Links, heading accent (GTR secondary) |
| `tertiary` | `#007FAC` | Hover states |
| `highlight` | `rgba(0, 153, 208, 0.15)` | Internal-link background |
| `textHighlight` | `#FFCC0088` | `==mark==` (GTR accent yellow, alpha) |

**Dark mode** (secondary used as primary-interactive since `#002944` lacks contrast on dark page)

| Token | Value |
|---|---|
| `light` | `#0B1A24` |
| `lightgray` | `#2A3F52` |
| `gray` | `#3C5470` |
| `darkgray` | `#E6EDF3` |
| `dark` | `#E6EDF3` |
| `secondary` | `#0099D0` |
| `tertiary` | `#66C2E6` |
| `highlight` | `rgba(0, 153, 208, 0.25)` |
| `textHighlight` | `#FFCC0066` |

**Typography**

```ts
typography: {
  header: "Noto Sans",
  body: "Noto Sans",
  code: "IBM Plex Mono",
}
```

`fontOrigin: "googleFonts"` stays — Noto Sans is on Google Fonts. Fallback to Arial is provided by the browser via the generic `sans-serif` chain Quartz emits.

### 2. Favicon

Source: `~/gtr-brand-assets/favicons/gtr-favicon-bildmarke.png`

Copy (overwrite) to:

- `quartz/static/icon.png` — emitted by `Head.tsx` as the site favicon
- `public/favicon.ico` — overwritten with PNG bytes (browsers accept)
- `public/favicon.png`
- `content/favicon.png` — used by Obsidian locally

Single light-mode variant only. No dark-mode favicon swap (not worth the `Head.tsx` edit for marginal gain).

### 3. Header logo

Replace the `💁` emoji in the site header with the GTR Bildmarke, rendered as an SVG `<img>` next to the title text.

**Assets**

- `~/gtr-brand-assets/logo/Positiv/Bildmarke/Web/gtr-bildmarke-web-rgb.svg` → `quartz/static/gtr-logo.svg`
- `~/gtr-brand-assets/logo/Negativ/Bildmarke/Web/gtr-bildmarke-negativ-web-rgb.svg` → `quartz/static/gtr-logo-negativ.svg`

**Config change** — `quartz.config.ts`

```ts
pageTitle: "GTR FAQ",   // was: "💁 GTR FAQ"
```

**Component change** — `quartz/components/PageTitle.tsx`

Render logo + title in the anchor:

```tsx
<h2 class={classNames(displayClass, "page-title")}>
  <a href={baseDir}>
    <img
      src={joinSegments(baseDir, "static/gtr-logo.svg")}
      alt=""
      class="page-title-logo page-title-logo-light"
    />
    <img
      src={joinSegments(baseDir, "static/gtr-logo-negativ.svg")}
      alt=""
      class="page-title-logo page-title-logo-dark"
    />
    <span>{title}</span>
  </a>
</h2>
```

(`joinSegments` imported from `../util/path` — same helper `Head.tsx` uses.)

**CSS** — extend `PageTitle.css`:

```css
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
/* Show the right variant per theme.
   Quartz toggles dark mode via `[saved-theme="dark"]` on <html>. */
.page-title-logo-dark { display: none; }
:root[saved-theme="dark"] .page-title-logo-light { display: none; }
:root[saved-theme="dark"] .page-title-logo-dark  { display: inline; }
```

**Clearance:** 0.5em gap between logo and title satisfies the manual's "height of lowercase g" clearance rule at this size. Minimum logo size at 1.6em ≈ 26 px — comfortably above the 5.5 mm / ~20 px Bildmarke minimum.

**Alt text:** empty because the adjacent `<span>` already carries the "GTR FAQ" label — avoids duplication for screen readers.

## Verification

After implementation:

1. `npm run quartz build --serve` and confirm in a browser:
   - Header shows GTR Bildmarke + "GTR FAQ" text, no emoji
   - Favicon in the browser tab is the GTR Bildmarke
   - Links are `#0099D0`; headings are `#002944`; body text in Noto Sans
   - Dark mode: Bildmarke swaps to the negative (white) variant; link colour shifts to `#66C2E6`
2. `npm run check` passes (TypeScript + Prettier)
3. Visual spot-check: mobile viewport, logo does not overflow the header row

## Out of scope

- Obsidian editor theme / CSS snippet for the local `content/.obsidian/` workspace
- `obsidian-to-pdf` template installation
- Custom OG image using the GTR logo
- Broader typography scale, footer branding, or Header component changes beyond the logo swap

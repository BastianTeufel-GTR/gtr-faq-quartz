# HideTitle Plugin — Maintenance After Quartz Updates

## What This Plugin Does

Pages with `cssclasses: [hide-title]` in frontmatter get a short navigation title while displaying a longer heading in the page body. The plugin injects date, reading time, and tags directly after the first `<h1>` in the rendered HTML. CSS hides the duplicate meta from the page header.

## Files Involved

| File | Risk on Update | Action Needed |
|------|---------------|---------------|
| `quartz/plugins/transformers/hideTitle.ts` | None — custom file, not in upstream | Nothing |
| `quartz/styles/custom.scss` | None — designated customization file | Nothing |
| `quartz.config.ts` | Low — you control this file | Re-add `Plugin.HideTitle()` if overwritten |
| `quartz/plugins/transformers/index.ts` | **Merge conflict likely** | Re-add export line (see below) |
| `content/Roadmaps/GDX-Server.md` | None — content file | Nothing |

## After Updating Quartz

### 1. Check `quartz/plugins/transformers/index.ts`

If the update overwrites this file, add the following line at the end:

```typescript
export { HideTitle } from "./hideTitle"
```

### 2. Check `quartz.config.ts`

Verify `Plugin.HideTitle()` is still in the `transformers` array:

```typescript
transformers: [
  // ... other plugins ...
  Plugin.HideTitle(),
],
```

### 3. Check `quartz/styles/custom.scss`

Verify these rules are still present:

```scss
.center:has(article.hide-title) .article-title,
.center:has(article.hide-title) .page-header .content-meta,
.center:has(article.hide-title) .page-header .tags {
  display: none;
}
```

### 4. Verify

Build the site and check the GDX Server roadmap page. The heading should read "GDX Server Development Roadmap" with date and tags beneath it, while the sidebar navigation shows "GDX Server".

## How It Works

The plugin is a rehype transformer (operates on the HTML AST after markdown parsing). It checks each page's frontmatter for `hide-title` in `cssclasses`. When found, it builds HAST nodes for content-meta and tags, then splices them into the tree after the first `<h1>` element. The CSS rules hide the original meta/tags rendered by the `ArticleTitle`, `ContentMeta`, and `TagList` components in the page header so they don't appear twice.

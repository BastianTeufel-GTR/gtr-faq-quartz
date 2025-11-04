# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is **Quartz v4**, a static site generator for publishing digital gardens and markdown-based notes as a website. The repository contains the Quartz framework itself (in the `quartz/` directory) plus a specific FAQ implementation for GTR (located in `content/`).

## Common Commands

### Development & Building
- **Build site**: `npm run quartz build`
- **Build and serve locally**: `npm run quartz build --serve` (or use `npm run docs` for the docs folder)
- **Type checking**: `npm run check` (TypeScript type check and Prettier format check)
- **Format code**: `npm run format` (runs Prettier)
- **Run tests**: `npm run test` (runs `path.test.ts` and `depgraph.test.ts`)
- **Profile build performance**: `npm run profile` (uses 0x profiler)

### Viewing Results
After building, output is in the `docs/` directory (as configured in package.json).

## Architecture Overview

Quartz uses a **plugin-based pipeline architecture** with three main processing stages:

### 1. **Configuration** (`quartz.config.ts` & `quartz.layout.ts`)
- Central config file defines site metadata, theming, plugins, and content layout
- `quartz.layout.ts` defines page component layouts (shared, content pages, list pages)
- All configuration is exported as a `QuartzConfig` object

### 2. **Build Pipeline** (`quartz/build.ts`)
The build process follows this flow:
- **Parse** → **Filter** → **Emit**

Each stage uses specialized processors in `quartz/processors/`:
- `parse.ts`: Uses unified/remark/rehype to parse markdown to AST and transform to HTML
- `filter.ts`: Applies filter plugins to determine which content gets published
- `emit.ts`: Generates output files using emitter plugins

### 3. **Plugin System** (`quartz/plugins/`)
Three types of plugins define the behavior:

#### **Transformers** (`quartz/plugins/transformers/`)
- Transform content during parse phase
- Can modify markdown AST via `markdownPlugins` (remark plugins)
- Can modify HTML AST via `htmlPlugins` (rehype plugins)
- Can apply text transformations before parsing via `textTransform`
- Examples: `frontmatter.ts`, `gfm.ts` (GitHub Flavored Markdown), `latex.ts`, `syntax.ts` (code highlighting)

#### **Filters** (`quartz/plugins/filters/`)
- Control which content gets published (e.g., filter out drafts)
- Implement `shouldPublish()` to determine if content should be included
- Example: `draft.ts`

#### **Emitters** (`quartz/plugins/emitters/`)
- Generate output files (HTML pages, RSS, sitemaps, etc.)
- Main emitters: `contentIndex.ts` (RSS/sitemap), `componentResources.ts` (CSS/JS), `assets.ts` (images/files)
- Can define dependency graphs for incremental builds

### 4. **Component System** (`quartz/components/`)
Preact components rendered server-side to generate HTML. Examples:
- UI components: `TableOfContents.tsx`, `Search.tsx`, `Breadcrumbs.tsx`, `Graph.tsx`
- Layout components: `Head.tsx`, `Footer.tsx`
- Inline scripts in `quartz/components/scripts/` that run client-side (e.g., `darkmode.inline.ts`, `search.inline.ts`)

### 5. **Utilities** (`quartz/util/`)
- `path.ts`: Path manipulation and slug generation
- `ctx.ts`: Build context object passed throughout pipeline
- `log.ts`: Logging utilities
- `perf.ts`: Performance timing
- `resources.ts`: Static resource management

### 6. **Dependency Graph** (`quartz/depgraph.ts`)
Tracks content dependencies for incremental/watch mode rebuilds. Used by emitters to understand which files affect which outputs.

## Content Structure

- **Source content**: `content/` directory contains markdown files organized by topic (e.g., `ProfDia Toolbox/`, `Database/`)
- **Images**: Embedded in topic subdirectories (`content/*/images/`)
- **Public assets**: `public/` directory for static files
- **Templates**: `templates/` directory (excluded from site generation)

## Key Concepts

### Processing Flow
1. Markdown files are discovered via globbing
2. Each file is parsed and converted to an AST
3. Transformer plugins modify the AST
4. Filter plugins determine what gets published
5. Emitter plugins generate output files

### Slug System
Content URLs are based on file paths converted to "slugs" (URL-safe identifiers). The `CrawlLinks` transformer uses `markdownLinkResolution: "shortest"` to resolve links using the shortest unique path.

### Watch Mode
When run with `--serve`, the build system watches for file changes and rebuilds only affected content using the dependency graph.

## TypeScript & Tooling

- **Node version**: Requires Node 20 or >=22
- **NPM version**: Requires >=9.3.1
- **TypeScript config**: `tsconfig.json` uses strict mode with ESNext target, JSX configured for Preact
- **Type definitions**: `globals.d.ts` and `index.d.ts` define global types

## Testing

- Tests are in `quartz/util/path.test.ts` and `quartz/depgraph.test.ts`
- Run with `npm run test` (uses tsx runner)
- Tests use simple assertions

## File Organization Reference

```
quartz/
├── build.ts                 # Main build orchestration
├── cfg.ts                   # Config type definitions
├── bootstrap-cli.mjs        # CLI entry point
├── components/              # Preact components for rendering
├── plugins/
│   ├── transformers/        # Markdown/HTML transformation plugins
│   ├── filters/             # Content filtering plugins
│   ├── emitters/            # Output generation plugins
│   └── types.ts             # Plugin interface definitions
├── processors/              # Parse, filter, emit stages
├── i18n/                    # Internationalization
└── util/                    # Utilities (path, logging, perf, etc.)
```

## Common Development Tasks

**Adding a new transformer plugin**: Create a file in `quartz/plugins/transformers/`, implement `QuartzTransformerPlugin` interface with markdown/html/text transform methods, export it from `quartz/plugins/transformers/index.ts`, add to `quartz.config.ts`.

**Customizing site layout**: Modify `quartz.layout.ts` to add/remove components in page sections (beforeBody, left, right, etc.).

**Updating theme colors**: Edit theme colors in `quartz.config.ts` under `configuration.theme.colors`.

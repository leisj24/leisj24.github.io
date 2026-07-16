# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Personal homepage + technical blog for `leisj24`, a USTC undergraduate. Built with **Astro 6** (no UI framework — pure `.astro` components), Chinese-language (`lang="zh-CN"`), deployed as a static site to GitHub Pages at `https://leisj24.github.io`.

## Commands

Requires Node >= 22.12.

| Command           | Action                                            |
| :---------------- | :------------------------------------------------ |
| `npm run dev`     | Dev server at `localhost:4321`                    |
| `npm run build`   | Production build to `./dist/` (runs `astro check` type-checking via Astro's build) |
| `npm run preview` | Preview the built site locally                    |
| `npm run astro check` | Type-check `.astro` files and content schemas without building |

There is **no test suite and no separate lint step** — the type checker (strict, via `astro/tsconfigs/strict` + `strictNullChecks`) is the main correctness gate. Run `npm run build` to catch type/content errors before committing.

Deployment is automatic: pushing to `main` triggers `.github/workflows/deploy.yml`, which builds and publishes to GitHub Pages. Do not commit `dist/`.

## Architecture

### Design system (the backbone)

All theming flows through CSS custom properties defined in [src/styles/global.css](src/styles/global.css), imported once via `BaseHead.astro` so every page gets it. Two token sets: `:root` (light) and `:root[data-theme='dark']`. **Always use these tokens** (`--color-accent`, `--color-surface`, `--color-text-muted`, `--radius-card`, `--shadow-card`, etc.) rather than hardcoded colors/radii — the warm coral/peach theme and dark mode both depend on it. `color-mix(in srgb, var(--token) N%, transparent)` is the established pattern for translucent variants.

Dark mode is applied by a **blocking inline script in `BaseHead.astro`** that reads `localStorage.theme` (falling back to `prefers-color-scheme`) and sets `document.documentElement.dataset.theme` before first paint to avoid FOUC. `ThemeToggle.astro` writes back to `localStorage`.

### View Transitions

`BaseHead.astro` renders `<ClientRouter />`, so navigation uses Astro's client-side View Transitions. Consequences to keep in mind:
- The Banner shares a `transition:name="page-banner"` across pages to morph between them.
- **Client-side scripts must re-run on navigation.** Use `document.addEventListener('astro:page-load', ...)` (not a bare top-level script), and guard against double-binding with a `dataset` flag — see the email handler in `ProfileCard.astro`.

### Content collections

Blog posts live in [src/content/blog/](src/content/blog/) as `.md`/`.mdx`, loaded via the glob loader in [src/content.config.ts](src/content.config.ts). Frontmatter is Zod-validated: `title`, `description`, `pubDate` required; `updatedDate`, `heroImage` (image asset), `tags` optional. Retrieve with `getCollection('blog')`; posts are sorted newest-first by `pubDate` at each call site.

`src/utils/reading-time.ts` computes bilingual reading stats (300 CN chars/min, 200 EN words/min) after stripping markdown syntax — used on post cards and post pages.

### Page composition

Standard page shell: `<BaseHead>` (in `<head>`) → `<Header>` → `<Banner>` → `<main>` → `<Footer>`. `Header.astro` and `Footer.astro` are shared; `Banner.astro` takes `title`/`subtitle`/`height` and an optional background `image` (defaults to `/banner.jpg` in `public/`).

The home ([src/pages/index.astro](src/pages/index.astro)) and resources ([src/pages/resources.astro](src/pages/resources.astro)) pages use a **sidebar layout** (`.page-with-sidebar` grid: `280px` `ProfileCard` + content, collapsing to a single column at `≤1023px`). Note: this grid CSS and `main { width: 1120px }` are currently **duplicated inline in both pages' `<style>` blocks** rather than shared in a layout — when touching one, check whether the other needs the same change. Blog posts use [src/layouts/BlogPost.astro](src/layouts/BlogPost.astro) instead.

### Conventions

- **Email is obfuscated against scrapers**: never write a plain `mailto:`. The address is split into `data-u`/`data-d` attributes and assembled by JS on click (`ProfileCard.astro`, `about.astro`). Reuse the `.js-mail` pattern.
- Responsive breakpoints are consistently `≤1023px` (tablet/sidebar collapse) and `≤720px` (mobile).
- Indentation in `.astro`/CSS is **tabs**.
- Site title/description are centralized in [src/consts.ts](src/consts.ts).

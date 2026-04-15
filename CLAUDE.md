# CLAUDE.md — apentryjp Shopify Theme

## Project Overview

This is a **Shopify Theme** built on the **Savor** theme (v3.5.1). It is a production-ready, enterprise-grade e-commerce theme for a Japanese market Shopify store (`apentryjp`).

- **Theme Engine**: Shopify Liquid
- **Frontend**: Vanilla JavaScript (ES2020), CSS3
- **Deployment Tool**: Shopify CLI
- **No build step** — no npm, webpack, or bundler. Assets are served directly.

---

## Directory Structure

```
apentryjp/
├── assets/          # JS, CSS, TypeScript definitions (115 files)
├── blocks/          # 94 reusable block components (.liquid)
├── sections/        # 47 page sections (.liquid, .json)
├── snippets/        # 103 reusable snippet components (.liquid)
├── templates/       # 13 page templates (.json, .liquid)
├── layout/          # theme.liquid (main HTML wrapper), password.liquid
├── config/          # settings_schema.json, settings_data.json
├── locales/         # 27 language files
└── .shopify/        # metafields.json
```

### Key Files

| File | Purpose |
|------|---------|
| `layout/theme.liquid` | Main HTML document wrapper — entry point for all pages |
| `config/settings_schema.json` | Theme customizer schema (50+ settings) |
| `config/settings_data.json` | Active theme settings (auto-generated, do not hand-edit) |
| `assets/base.css` | Primary stylesheet (~100KB) |
| `assets/jsconfig.json` | JS path aliases (`@theme/*` → `assets/`) |
| `assets/global.d.ts` | TypeScript type definitions for Shopify globals |
| `.shopify/metafields.json` | Custom product metafield definitions |

---

## Tech Stack

### Templating
- **Shopify Liquid** — all `.liquid` files use Liquid tags and filters
- Global `Shopify` object provides shop info, locale, currency
- Global `Theme` object provides translations, routes, utilities

### JavaScript
- Vanilla ES2020 modules — no framework (no React, Vue, etc.)
- Custom Web Components extending `HTMLElement`
- Path alias: `@theme/` maps to `assets/` directory
- Key patterns: Component base class, event-driven architecture, `requestIdleCallback` for performance

### CSS
- CSS custom properties for theming
- CSS Grid and Flexbox layouts
- Mobile-first responsive design
- Color schemes with primary accent: `#a42325` (burgundy red)

---

## Shopify CLI Commands

```bash
# Start development server (hot-reload)
shopify theme dev

# Push theme to Shopify store
shopify theme push

# Pull latest settings from store
shopify theme pull

# Check theme for errors
shopify theme check
```

> There is no `npm install`, `npm run dev`, or build step. This is a pure Shopify theme.

---

## Component Architecture

### Blocks (`/blocks/`)
Reusable building blocks composable inside sections. 94 total.

### Sections (`/sections/`)
Full-width page modules that appear in the Shopify customizer. 47 total, including header, footer, hero, product, collection, etc.

### Snippets (`/snippets/`)
Reusable Liquid partials rendered via `{% render 'snippet-name' %}`. 103 total.

### Templates (`/templates/`)
Page-type definitions in JSON format. 13 templates including homepage, product, collection, cart, blog, search, 404, and password.

---

## Localization

27 languages supported. Base language is **English** (`locales/en.default.json`).
Notable: **Japanese** (`locales/ja.json`) — this is a Japanese market store.

Translation strings are accessed via `{{ 'key' | t }}` in Liquid templates.

---

## Custom Metafields

Defined in `.shopify/metafields.json`:
- `reviews.rating` — product star rating
- `reviews.rating_count` — number of reviews
- Growave integration for ratings app

---

## Design Tokens (from `config/settings_data.json`)

| Token | Value |
|-------|-------|
| Primary accent | `#a42325` (burgundy red) |
| Font family | Inter |
| Cart type | Drawer |
| Card hover | Subtle zoom |

---

## JavaScript Conventions

- Components extend a base `Component` class with lifecycle hooks
- Custom events used for cross-component communication (`CartAddEvent`, `DialogOpenEvent`, etc.)
- Use `debounce()` utility for input handlers
- Use `requestIdleCallback()` for non-critical work
- Fetch requests use shared helper utilities in `assets/`

---

## Liquid Conventions

- Use `{% render %}` (not `{% include %}`) for snippets — scoped rendering
- Section settings accessed via `section.settings.*`
- Block settings accessed via `block.settings.*`
- Always use `{{ variable | escape }}` for user-generated content

---

## Custom Sections Built for apentryjp

These sections were built from scratch and do not exist in the base Savor theme. Each has a separate CSS asset file.

| Section file | CSS asset | Description |
|---|---|---|
| `sections/footer.liquid` | *(inline vars)* | Custom Annie's Pantry footer — teal bg, food list, nav cols, social icons, decoration image |
| `sections/home-food.liquid` | *(inline styles)* | Two-column full-width food feature: left text + corner decorations, right cover image |
| `sections/home-news.liquid` | `assets/section-home-news.css` | News section — cream bg, label col left, white card list right, thumbnail + date + arrow |

### home-news section specifics
- BEM prefix: `.hn-*`
- Desktop thumbnail: 192×192px square (configurable via range + select schema)
- Image aspect ratio passed to CSS via `--hn-thumb-ratio` CSS variable in inline `style`
- Date format: `Date : YYYY.MM.DD` (matches apantry.jp convention)
- Eyebrow uses `✦` character (gold `#C4A96D`) as decorative icon

---

## Design Reference

For building new sections, always consult the skill file at `.claude/commands/new-section.md`. It contains:
- The full brand design token system (colors, type, spacing)
- Confirmed UI patterns from apantry.jp (pill buttons, white cards on cream, two-column layouts)
- The complete file checklist before marking a section done

---

## Font Override

The theme uses **GT Ultra Standard Regular** (custom woff) globally, loaded via `snippets/fonts.liquid`:
- CDN: `https://cdn.shopify.com/oxygen-v2/44916/40711/85707/3160196/fonts/GT-Ultra-Standard-Regular.woff`
- Applied in `snippets/theme-styles-variables.liquid` via CSS variable overrides on `--font-body--family`, `--font-heading--family`, etc.

---

## Known Liquid Gotchas

- **`{%- doc -%}` is NOT valid in section files** — only in snippets and blocks. Use `{%- comment -%}` instead. Using `doc` in a section causes a theme check error.
- **`config/settings_data.json`** is auto-generated. Avoid hand-editing; use the Shopify customizer or `shopify theme pull`.
- No `.env` files — environment is managed through Shopify admin and CLI authentication.
- The `assets/jsconfig.json` enables IDE autocomplete for `@theme/` imports but is not used by any build tool.
- The theme supports Shopify's **View Transitions API** for smooth page navigation.

# new-section.md — Design Guidelines for apantry.jp Shopify Theme

> Use this file as the authoritative reference whenever Claude Code builds or edits a Shopify section for apantry.jp.
> Every new section MUST conform to these rules before being considered complete.

---

## 1. Global Design System

### Brand Aesthetic
apantry.jp is a premium Japanese food & pantry brand. The visual language is:
- **Minimal Japanese**: generous whitespace, restrained color, purposeful typography
- **Organic warmth**: off-white backgrounds, natural earth tones, no cold blues or harsh contrasts
- **Editorial confidence**: large imagery, clear hierarchy, no clutter

---

### 1.1 Color Palette

```css
/* === PRIMARY PALETTE === */
--color-background:        #FAFAF7;   /* warm off-white — default page bg */
--color-background-alt:    #F4F1EC;   /* warm cream — alternating section bg */
--color-background-dark:   #1C1C1A;   /* near-black — dark sections, footer */

--color-text-primary:      #1C1C1A;   /* main body text */
--color-text-secondary:    #6B6860;   /* muted labels, captions, metadata */
--color-text-inverse:      #FAFAF7;   /* text on dark bg */

--color-accent:            #3D6B4F;   /* forest green — CTAs, highlights, icons */
--color-accent-hover:      #2F5440;   /* darker green on hover */
--color-accent-light:      #E8F0EB;   /* light green tint — badges, tags */

--color-border:            #E2DDD6;   /* default dividers and borders */
--color-border-strong:     #C8C2B8;   /* emphasized borders */

/* === SEMANTIC === */
--color-error:             #C0392B;
--color-success:           #3D6B4F;   /* same as accent */
```

**Rules:**
- Never use pure black (`#000`) or pure white (`#FFF`) — always use the warm variants above
- The green accent (`--color-accent`) is used sparingly: primary buttons, active states, price highlights, and key icons only
- Dark sections (`--color-background-dark`) are used for the footer and occasional full-bleed feature banners

---

### 1.2 Typography

```css
/* === FONT FAMILIES === */
--font-display:   'Shippori Mincho', 'Hiragino Mincho ProN', serif;  /* Japanese serif — headings */
--font-body:      'Zen Kaku Gothic New', 'Hiragino Sans', sans-serif; /* Japanese sans — body */
--font-latin:     'DM Sans', sans-serif;                              /* Latin numerals, prices, EN labels */

/* === SCALE (use only these sizes) === */
--text-xs:    11px;   /* legal, footnotes */
--text-sm:    13px;   /* metadata, tags, captions */
--text-base:  15px;   /* body copy */
--text-md:    17px;   /* large body, intro paragraphs */
--text-lg:    22px;   /* small headings, subheadings */
--text-xl:    30px;   /* section headings (desktop) */
--text-2xl:   42px;   /* hero subheadings */
--text-3xl:   60px;   /* hero display (desktop) */

/* === WEIGHTS === */
--font-normal:  400;
--font-medium:  500;
--font-bold:    700;  /* use only for display headings, never body */

/* === LINE HEIGHT === */
--leading-tight:   1.2;   /* display headings */
--leading-snug:    1.4;   /* subheadings */
--leading-normal:  1.7;   /* body copy — crucial for readability in Japanese */
--leading-loose:   2.0;   /* product descriptions, long-form prose */

/* === LETTER SPACING === */
--tracking-tight:  -0.02em;   /* large display text */
--tracking-normal:  0;
--tracking-wide:    0.08em;   /* labels, tags, navigation links */
--tracking-wider:   0.15em;   /* ALL-CAPS category labels */
```

**Typography rules:**
- Section headings: `--font-display`, `--text-xl`, `--font-bold`, `--leading-tight`
- Body paragraphs: `--font-body`, `--text-base`, `--font-normal`, `--leading-loose`
- Prices / numbers: `--font-latin`, always — Japanese fonts render numerals poorly
- Category labels: uppercase, `--tracking-wider`, `--text-sm`, `--font-body`
- Max line length (prose): 66 characters / `max-width: 640px`

---

### 1.3 Spacing Scale

```css
/* === SPACING TOKENS === */
--space-1:    4px;
--space-2:    8px;
--space-3:   12px;
--space-4:   16px;
--space-5:   24px;
--space-6:   32px;
--space-7:   48px;
--space-8:   64px;
--space-9:   96px;
--space-10: 128px;
--space-11: 160px;

/* === SECTION PADDING === */
--section-padding-y:         96px;   /* desktop vertical padding per section */
--section-padding-y-mobile:  56px;   /* mobile vertical padding */
--section-padding-x:         40px;   /* desktop horizontal padding */
--section-padding-x-mobile:  20px;   /* mobile horizontal padding */
```

**Spacing rules:**
- Between heading and body copy: `--space-5` (24px)
- Between body copy and CTA button: `--space-6` (32px)
- Between cards in a grid: `--space-5` (24px) desktop, `--space-4` (16px) mobile
- Between sections: never collapse — always the full `--section-padding-y`

---

### 1.4 Border Radius

```css
--radius-sm:   4px;    /* tags, badges, small pills */
--radius-md:   8px;    /* cards, inputs, buttons */
--radius-lg:  16px;    /* image containers, large cards */
--radius-full: 9999px; /* circular elements, round pills */
```

---

### 1.5 Shadows

apantry.jp uses **no decorative box-shadows**. Depth is created through color contrast and whitespace only. The one exception is a subtle hover lift on product cards:

```css
/* Product card hover only — nowhere else */
--shadow-card-hover: 0 8px 24px rgba(28, 28, 26, 0.08);
```

---

## 2. Layout Rules

### 2.1 Container System

```css
.container {
  width: 100%;
  max-width: 1280px;
  margin-inline: auto;
  padding-inline: var(--section-padding-x);
}

.container--narrow {
  max-width: 800px;   /* editorial content, blog posts */
}

.container--wide {
  max-width: 1440px;  /* full-bleed backgrounds with contained inner content */
}

/* Full-bleed: no container — background spans 100vw, content inside uses .container */
```

**Rules:**
- Every section has a full-width wrapper (for background color) and an inner `.container` (for content width)
- Do NOT apply padding directly to the section background wrapper — only to `.container` or content blocks inside it
- Images may break out of the container on one side (bleed to edge) for hero and feature sections

---

### 2.2 Grid System

```css
/* Base grid — use for product grids and multi-column layouts */
.grid {
  display: grid;
  gap: var(--space-5);
}

/* Common column patterns */
.grid--2col { grid-template-columns: repeat(2, 1fr); }
.grid--3col { grid-template-columns: repeat(3, 1fr); }
.grid--4col { grid-template-columns: repeat(4, 1fr); }

/* Image-text split (50/50) */
.grid--split { grid-template-columns: 1fr 1fr; align-items: center; }

/* Feature asymmetric (image larger) */
.grid--feature { grid-template-columns: 3fr 2fr; align-items: center; }

/* Responsive: all grids collapse to single column on mobile */
@media (max-width: 768px) {
  .grid--2col,
  .grid--3col,
  .grid--4col,
  .grid--split,
  .grid--feature { grid-template-columns: 1fr; }
}

@media (min-width: 769px) and (max-width: 1024px) {
  .grid--3col { grid-template-columns: repeat(2, 1fr); }
  .grid--4col { grid-template-columns: repeat(2, 1fr); }
}
```

---

### 2.3 Alignment

- Text alignment is **always left** — never centered except for single-line section eyebrow labels
- CTA buttons are **left-aligned** inline with the text, not centered
- Images are always `object-fit: cover` with explicit aspect ratios — never auto height
- Vertical rhythm: headings sit at the **top** of text blocks; no bottom-heavy compositions

---

## 3. Section Patterns

> For each section below: copy the schema template exactly, then adjust settings to match the section's needs.

---

### 3.1 Hero Section

**File:** `sections/hero.liquid`

**Layout:** Full viewport-height (or 80vh minimum), image on right 60%, text on left 40%, vertically centered

```liquid
<section class="hero" style="background-color: {{ section.settings.bg_color }}">
  <div class="hero__inner">
    <div class="hero__text">
      {% if section.settings.eyebrow != blank %}
        <p class="eyebrow">{{ section.settings.eyebrow }}</p>
      {% endif %}
      <h1 class="hero__heading">{{ section.settings.heading }}</h1>
      {% if section.settings.subheading != blank %}
        <p class="hero__subheading">{{ section.settings.subheading }}</p>
      {% endif %}
      {% if section.settings.cta_label != blank %}
        <a href="{{ section.settings.cta_url }}" class="btn btn--primary">
          {{ section.settings.cta_label }}
        </a>
      {% endif %}
    </div>
    <div class="hero__image">
      {% if section.settings.image != blank %}
        {{ section.settings.image | image_url: width: 1200 | image_tag:
          loading: 'eager',
          fetchpriority: 'high',
          class: 'hero__img',
          widths: '600, 900, 1200',
          sizes: '(max-width: 768px) 100vw, 60vw'
        }}
      {% endif %}
    </div>
  </div>
</section>

{% schema %}
{
  "name": "Hero",
  "settings": [
    { "type": "text",       "id": "eyebrow",     "label": "Eyebrow label" },
    { "type": "text",       "id": "heading",     "label": "Heading",       "default": "日本の食卓へ、丁寧な一品を" },
    { "type": "textarea",   "id": "subheading",  "label": "Subheading" },
    { "type": "text",       "id": "cta_label",   "label": "Button label",  "default": "商品を見る" },
    { "type": "url",        "id": "cta_url",     "label": "Button link" },
    { "type": "image_picker", "id": "image",     "label": "Hero image" },
    { "type": "color",      "id": "bg_color",    "label": "Background color", "default": "#FAFAF7" }
  ],
  "presets": [{ "name": "Hero" }]
}
{% endschema %}
```

---

### 3.2 Feature Banner (Image + Text)

**File:** `sections/feature-banner.liquid`

**Layout:** 50/50 grid split, image and text side by side. Image side can be left or right (setting).

```liquid
<section class="feature-banner" style="background: {{ section.settings.bg_color }}">
  <div class="container">
    <div class="feature-banner__grid feature-banner__grid--{{ section.settings.image_position }}">
      <div class="feature-banner__image">
        {% if section.settings.image != blank %}
          {{ section.settings.image | image_url: width: 900 | image_tag:
            loading: 'lazy',
            widths: '450, 700, 900',
            sizes: '(max-width: 768px) 100vw, 50vw',
            style: 'border-radius: var(--radius-lg); aspect-ratio: 4/5; object-fit: cover; width: 100%;'
          }}
        {% endif %}
      </div>
      <div class="feature-banner__text">
        {% if section.settings.eyebrow != blank %}
          <p class="eyebrow">{{ section.settings.eyebrow }}</p>
        {% endif %}
        <h2>{{ section.settings.heading }}</h2>
        {% if section.settings.body != blank %}
          <div class="rte">{{ section.settings.body }}</div>
        {% endif %}
        {% if section.settings.cta_label != blank %}
          <a href="{{ section.settings.cta_url }}" class="btn btn--{{ section.settings.btn_style }}">
            {{ section.settings.cta_label }}
          </a>
        {% endif %}
      </div>
    </div>
  </div>
</section>

{% schema %}
{
  "name": "Feature banner",
  "settings": [
    { "type": "image_picker", "id": "image",          "label": "Image" },
    { "type": "select",       "id": "image_position",  "label": "Image position",
      "options": [
        { "value": "left",  "label": "Left" },
        { "value": "right", "label": "Right" }
      ],
      "default": "left" },
    { "type": "text",     "id": "eyebrow",    "label": "Eyebrow label" },
    { "type": "text",     "id": "heading",    "label": "Heading" },
    { "type": "richtext", "id": "body",       "label": "Body text" },
    { "type": "text",     "id": "cta_label",  "label": "Button label" },
    { "type": "url",      "id": "cta_url",    "label": "Button link" },
    { "type": "select",   "id": "btn_style",  "label": "Button style",
      "options": [
        { "value": "primary",   "label": "Primary (filled)" },
        { "value": "secondary", "label": "Secondary (outline)" }
      ],
      "default": "primary" },
    { "type": "color",    "id": "bg_color",   "label": "Background color", "default": "#FAFAF7" }
  ],
  "presets": [{ "name": "Feature banner" }]
}
{% endschema %}
```

---

### 3.3 Product Grid / Collection

**File:** `sections/product-grid.liquid`

**Layout:** 4-column desktop, 2-column tablet, 1-column mobile

```liquid
<section class="product-grid" style="background: {{ section.settings.bg_color }}">
  <div class="container">
    {% if section.settings.heading != blank %}
      <div class="section-header">
        {% if section.settings.eyebrow != blank %}
          <p class="eyebrow">{{ section.settings.eyebrow }}</p>
        {% endif %}
        <h2>{{ section.settings.heading }}</h2>
      </div>
    {% endif %}

    {% assign collection = collections[section.settings.collection] %}
    {% if collection != blank %}
      <ul class="grid grid--4col product-grid__list" role="list">
        {% for product in collection.products limit: section.settings.products_to_show %}
          <li class="product-card">
            <a href="{{ product.url }}" class="product-card__link">
              <div class="product-card__image-wrap">
                {% if product.featured_image %}
                  {{ product.featured_image | image_url: width: 600 | image_tag:
                    loading: 'lazy',
                    widths: '300, 450, 600',
                    sizes: '(max-width: 768px) 50vw, 25vw',
                    class: 'product-card__img'
                  }}
                {% endif %}
                {% unless product.available %}
                  <span class="product-card__badge product-card__badge--sold-out">売り切れ</span>
                {% endunless %}
              </div>
              <div class="product-card__info">
                <p class="product-card__vendor">{{ product.vendor }}</p>
                <h3 class="product-card__title">{{ product.title }}</h3>
                <p class="product-card__price">
                  {% if product.compare_at_price > product.price %}
                    <s class="product-card__compare">{{ product.compare_at_price | money }}</s>
                  {% endif %}
                  <span>{{ product.price | money }}</span>
                </p>
              </div>
            </a>
          </li>
        {% endfor %}
      </ul>
    {% endif %}

    {% if section.settings.cta_label != blank %}
      <div class="section-footer">
        <a href="{{ section.settings.cta_url }}" class="btn btn--secondary">
          {{ section.settings.cta_label }}
        </a>
      </div>
    {% endif %}
  </div>
</section>

{% schema %}
{
  "name": "Product grid",
  "settings": [
    { "type": "text",       "id": "eyebrow",          "label": "Eyebrow label" },
    { "type": "text",       "id": "heading",           "label": "Section heading" },
    { "type": "collection", "id": "collection",        "label": "Collection" },
    { "type": "range",      "id": "products_to_show",  "label": "Products to show",
      "min": 2, "max": 12, "step": 1, "default": 4 },
    { "type": "text",       "id": "cta_label",         "label": "View all label" },
    { "type": "url",        "id": "cta_url",           "label": "View all link" },
    { "type": "color",      "id": "bg_color",          "label": "Background color", "default": "#FAFAF7" }
  ],
  "presets": [{ "name": "Product grid" }]
}
{% endschema %}
```

---

### 3.4 Rich Text / Editorial Block

**File:** `sections/rich-text.liquid`

**Layout:** Narrow centered column, max 640px, for brand story and editorial prose

```liquid
<section class="rich-text" style="background: {{ section.settings.bg_color }}">
  <div class="container container--narrow">
    {% if section.settings.eyebrow != blank %}
      <p class="eyebrow eyebrow--center">{{ section.settings.eyebrow }}</p>
    {% endif %}
    {% if section.settings.heading != blank %}
      <h2 class="rich-text__heading">{{ section.settings.heading }}</h2>
    {% endif %}
    {% if section.settings.body != blank %}
      <div class="rte rich-text__body">{{ section.settings.body }}</div>
    {% endif %}
    {% if section.settings.cta_label != blank %}
      <a href="{{ section.settings.cta_url }}" class="btn btn--primary">
        {{ section.settings.cta_label }}
      </a>
    {% endif %}
  </div>
</section>

{% schema %}
{
  "name": "Rich text",
  "settings": [
    { "type": "text",     "id": "eyebrow",   "label": "Eyebrow label" },
    { "type": "text",     "id": "heading",   "label": "Heading" },
    { "type": "richtext", "id": "body",      "label": "Body" },
    { "type": "text",     "id": "cta_label", "label": "Button label" },
    { "type": "url",      "id": "cta_url",   "label": "Button link" },
    { "type": "color",    "id": "bg_color",  "label": "Background color", "default": "#F4F1EC" }
  ],
  "presets": [{ "name": "Rich text" }]
}
{% endschema %}
```

---

### 3.5 Image Gallery / Lookbook

**File:** `sections/image-gallery.liquid`

**Layout:** Masonry-style 3-column grid with varying aspect ratios

```liquid
<section class="image-gallery" style="background: {{ section.settings.bg_color }}">
  <div class="container">
    {% if section.settings.heading != blank %}
      <h2 class="section-heading">{{ section.settings.heading }}</h2>
    {% endif %}
    <div class="image-gallery__grid">
      {% for block in section.blocks %}
        <div class="image-gallery__item image-gallery__item--{{ block.settings.size }}" {{ block.shopify_attributes }}>
          {% if block.settings.image != blank %}
            {{ block.settings.image | image_url: width: 900 | image_tag:
              loading: 'lazy',
              widths: '400, 600, 900',
              class: 'image-gallery__img'
            }}
          {% endif %}
          {% if block.settings.caption != blank %}
            <p class="image-gallery__caption">{{ block.settings.caption }}</p>
          {% endif %}
        </div>
      {% endfor %}
    </div>
  </div>
</section>

{% schema %}
{
  "name": "Image gallery",
  "settings": [
    { "type": "text",  "id": "heading",  "label": "Heading" },
    { "type": "color", "id": "bg_color", "label": "Background color", "default": "#FAFAF7" }
  ],
  "blocks": [
    {
      "type": "image",
      "name": "Image",
      "settings": [
        { "type": "image_picker", "id": "image",   "label": "Image" },
        { "type": "text",         "id": "caption",  "label": "Caption" },
        { "type": "select",       "id": "size",     "label": "Size",
          "options": [
            { "value": "normal", "label": "Normal" },
            { "value": "tall",   "label": "Tall (2x height)" },
            { "value": "wide",   "label": "Wide (2x width)" }
          ],
          "default": "normal"
        }
      ]
    }
  ],
  "presets": [{ "name": "Image gallery" }]
}
{% endschema %}
```

---

### 3.6 News / Blog List Section ✅ BUILT & CONFIRMED

**Files:** `sections/home-news.liquid` + `assets/section-home-news.css`

**Layout:** Two-column split — label column left (fixed ~200px), white card list right. Confirmed against actual apantry.jp screenshot.

**Visual anatomy:**
- Section background: warm cream `#F0EBD8` (not the default `--color-background`)
- Left column: `✦` star glyph + "News" eyebrow · large display heading · pill "View more" button · optional decoration image (dog illustration)
- Right column: vertical stack of **white rounded cards** (bg `#FFFFFF`, `border-radius: 16px`)
- Each card: `[thumbnail 192×192] [title + "Date : YYYY.MM.DD"] [› circle arrow]`
- Thumbnail defaults to **square 1:1 at 192px** — user-controllable via range + select schema settings

**Key patterns confirmed by this build:**

```liquid
{%- comment -%}
  Use {%- comment -%} NOT {%- doc -%} in section files.
  {%- doc -%} is only valid inside snippets and blocks — it throws an error in sections.
{%- endcomment -%}

{%- liquid
  {# Convert schema select value → CSS aspect-ratio fraction string #}
  case section.settings.image_ratio
    when 'square'    | assign thumb_ratio = '1 / 1'
    when 'landscape' | assign thumb_ratio = '4 / 3'
    when 'portrait'  | assign thumb_ratio = '3 / 4'
    when 'wide'      | assign thumb_ratio = '16 / 9'
  endcase
-%}

{# Pass CSS variables via inline style — the cleanest way to pass schema values to CSS #}
<section
  class="section-home-news"
  style="
    background-color: {{ section.settings.bg_color }};
    --hn-thumb-w: {{ section.settings.image_size }}px;
    --hn-thumb-ratio: {{ thumb_ratio }};
  "
>
```

**Image size control pattern (reuse for any thumbnail-sized image):**
```json
{
  "type": "range",
  "id": "image_size",
  "label": "Thumbnail width (px)",
  "min": 80, "max": 280, "step": 8, "default": 192
},
{
  "type": "select",
  "id": "image_ratio",
  "label": "Aspect ratio",
  "options": [
    { "value": "square",    "label": "Square (1:1)" },
    { "value": "landscape", "label": "Landscape (4:3)" },
    { "value": "portrait",  "label": "Portrait (3:4)" },
    { "value": "wide",      "label": "Wide (16:9)" }
  ],
  "default": "square"
}
```

**Responsive thumbnail override in CSS (the variable only applies to desktop):**
```css
/* Tablet */
@media (min-width: 768px) and (max-width: 1023px) {
  .hn-card { --hn-thumb-w: 88px; }
}
/* Mobile */
@media (max-width: 767px) {
  .hn-card { --hn-thumb-w: 80px; }
}
```

**Pill "View more" button (confirmed apantry.jp style):**
```css
.btn-pill {
  border: 1.5px solid currentColor;
  border-radius: 9999px;
  padding: 7px 16px;
  font-size: 12px;
  transition: background-color 0.15s ease, color 0.15s ease;
}
.btn-pill:hover {
  background-color: var(--color-text-primary);
  color: #FAFAF7;
}
```

**Circle arrow indicator (confirmed apantry.jp style):**
```html
<div class="card__arrow">
  <svg><!-- chevron-right --></svg>
</div>
```
```css
.card__arrow {
  width: 28px; height: 28px;
  border-radius: 9999px;
  background-color: var(--color-background-alt);
  display: flex; align-items: center; justify-content: center;
}
```

**Eyebrow with decorative icon:**
```html
<p class="hn-eyebrow">
  <span aria-hidden="true">✦</span>  <!-- warm gold: #C4A96D -->
  News
</p>
```

---

### 3.7 Announcement Bar

**File:** `sections/announcement-bar.liquid`

```liquid
{% if section.settings.show_announcement %}
  <div class="announcement-bar" style="background: {{ section.settings.bg_color }}; color: {{ section.settings.text_color }};">
    <p class="announcement-bar__text">{{ section.settings.text }}</p>
  </div>
{% endif %}

{% schema %}
{
  "name": "Announcement bar",
  "settings": [
    { "type": "checkbox", "id": "show_announcement", "label": "Show announcement", "default": true },
    { "type": "text",     "id": "text",               "label": "Announcement text", "default": "送料無料：¥8,000以上のご注文" },
    { "type": "color",    "id": "bg_color",            "label": "Background color",  "default": "#3D6B4F" },
    { "type": "color",    "id": "text_color",          "label": "Text color",        "default": "#FAFAF7" }
  ],
  "presets": [{ "name": "Announcement bar" }]
}
{% endschema %}
```

---

## 4. Component Styles

### 4.1 Buttons

```css
/* === BASE BUTTON === */
.btn {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: 14px 28px;
  font-family: var(--font-body);
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  letter-spacing: var(--tracking-wide);
  line-height: 1;
  border-radius: var(--radius-md);
  text-decoration: none;
  cursor: pointer;
  transition: background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease;
  white-space: nowrap;
}

/* Primary: filled green */
.btn--primary {
  background-color: var(--color-accent);
  color: var(--color-text-inverse);
  border: 1.5px solid var(--color-accent);
}
.btn--primary:hover {
  background-color: var(--color-accent-hover);
  border-color: var(--color-accent-hover);
}

/* Secondary: outline */
.btn--secondary {
  background-color: transparent;
  color: var(--color-text-primary);
  border: 1.5px solid var(--color-border-strong);
}
.btn--secondary:hover {
  border-color: var(--color-text-primary);
}

/* Ghost: text link style */
.btn--ghost {
  background-color: transparent;
  color: var(--color-accent);
  border: none;
  padding-left: 0;
  padding-right: 0;
  text-decoration: underline;
  text-underline-offset: 3px;
}
```

**Button rules:**
- Never use `border-radius` larger than `--radius-md` on buttons
- Never center a button unless it's the only element in a centered narrow column
- Add arrow `→` (text, not icon) after CTA labels that navigate away
- Minimum tap target: 44px height on mobile

---

### 4.2 Links

```css
a {
  color: inherit;
  text-decoration: none;
}

/* Inline text links */
.link {
  color: var(--color-accent);
  text-decoration: underline;
  text-underline-offset: 3px;
  transition: opacity 0.15s ease;
}
.link:hover { opacity: 0.7; }

/* Navigation links */
.nav-link {
  font-size: var(--text-sm);
  letter-spacing: var(--tracking-wide);
  color: var(--color-text-primary);
  transition: opacity 0.15s ease;
}
.nav-link:hover { opacity: 0.6; }
```

---

### 4.3 Eyebrow Labels

```css
.eyebrow {
  font-family: var(--font-body);
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  letter-spacing: var(--tracking-wider);
  text-transform: uppercase;
  color: var(--color-text-secondary);
  margin-bottom: var(--space-3);
}
.eyebrow--center { text-align: center; }
.eyebrow--accent { color: var(--color-accent); }
```

---

### 4.4 Product Card

```css
.product-card { }

.product-card__link {
  display: block;
  text-decoration: none;
  color: inherit;
}

.product-card__image-wrap {
  position: relative;
  aspect-ratio: 3 / 4;        /* portrait — standard for food products */
  overflow: hidden;
  border-radius: var(--radius-lg);
  background: var(--color-background-alt);
  margin-bottom: var(--space-4);
}

.product-card__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}
.product-card__link:hover .product-card__img {
  transform: scale(1.03);
}

.product-card__vendor {
  font-size: var(--text-xs);
  letter-spacing: var(--tracking-wide);
  color: var(--color-text-secondary);
  margin-bottom: var(--space-1);
  text-transform: uppercase;
}

.product-card__title {
  font-family: var(--font-body);
  font-size: var(--text-base);
  font-weight: var(--font-normal);
  line-height: var(--leading-snug);
  margin-bottom: var(--space-2);
}

.product-card__price {
  font-family: var(--font-latin);
  font-size: var(--text-base);
  font-weight: var(--font-medium);
  color: var(--color-text-primary);
}
.product-card__compare {
  color: var(--color-text-secondary);
  font-weight: var(--font-normal);
  margin-right: var(--space-2);
}

.product-card__badge {
  position: absolute;
  top: var(--space-3);
  left: var(--space-3);
  padding: 4px 10px;
  font-size: var(--text-xs);
  font-weight: var(--font-medium);
  letter-spacing: var(--tracking-wide);
  border-radius: var(--radius-sm);
  text-transform: uppercase;
}
.product-card__badge--sold-out {
  background: var(--color-background-dark);
  color: var(--color-text-inverse);
}
.product-card__badge--sale {
  background: var(--color-accent-light);
  color: var(--color-accent);
}
```

---

### 4.5 Section Header / Footer

```css
.section-header {
  margin-bottom: var(--space-8);
}

.section-header h2 {
  font-family: var(--font-display);
  font-size: var(--text-xl);
  font-weight: var(--font-bold);
  letter-spacing: var(--tracking-tight);
  line-height: var(--leading-tight);
  max-width: 560px;
}

.section-footer {
  margin-top: var(--space-7);
  display: flex;
  justify-content: flex-start; /* always left-aligned */
}
```

---

### 4.6 Dividers

```css
/* Horizontal rule between sections */
.section-divider {
  border: none;
  border-top: 1px solid var(--color-border);
  margin: 0;
}
```

---

## 5. Responsive Rules & Breakpoints

```css
/* === BREAKPOINTS === */
/* Mobile first — base styles target mobile */

/* sm: Small tablets and large phones */
@media (min-width: 576px) { }

/* md: Tablets */
@media (min-width: 768px) { }

/* lg: Desktop */
@media (min-width: 1024px) { }

/* xl: Wide desktop */
@media (min-width: 1280px) { }
```

### Per-breakpoint rules

| Element | Mobile (< 768px) | Tablet (768–1023px) | Desktop (≥ 1024px) |
|---|---|---|---|
| Container padding | 20px | 32px | 40px |
| Section padding-y | 56px | 72px | 96px |
| Hero heading | 36px | 48px | 60px |
| Section heading | 26px | 30px | 42px (--text-2xl) |
| Product grid | 2 col | 2–3 col | 4 col |
| Feature banner | stacked (image top) | stacked | 50/50 split |
| Navigation | hamburger menu | hamburger menu | full horizontal |

### Mobile-specific rules

- Images in hero stacked sections go **above** text, not below
- Product cards show 2 per row at all times on mobile — never 1 column product grid
- All font sizes reduce by one scale step on mobile (e.g., `--text-xl` → `--text-lg`)
- Buttons span full width on mobile: `width: 100%`
- Min tap target for all interactive elements: `44px`
- Horizontal scroll: never — test on 375px viewport

---

## 6. Best Practices for Consistency

### 6.1 Before writing any section

1. Run `shopify theme check` — fix all errors before proceeding
2. Check if a similar pattern already exists in another section — reuse snippets before creating new ones
3. Confirm the section has a `presets` block so it appears in the theme editor
4. Check translation keys exist in `locales/en.default.json` and `locales/ja.default.json`

### 6.2 Liquid rules

```liquid
{# Always use liquid comments, not HTML comments #}
{%- comment -%} This is correct {%- endcomment -%}

{# Strip whitespace with dash tags for clean output #}
{%- if section.settings.heading != blank -%}

{# Always check for blank before rendering settings #}
{% unless section.settings.image == blank %}

{# Use image_url filter with explicit width — never output raw image URLs #}
{{ image | image_url: width: 800 | image_tag: loading: 'lazy' }}

{# Money formatting — always use the money filter, never raw numbers #}
{{ product.price | money }}
```

### 6.3 Schema rules

- Every schema MUST have a `"presets"` array with at least one preset
- Setting IDs: `snake_case`, descriptive, no abbreviations
- Always provide `"default"` values for text and color settings
- Group related settings with `"type": "header"` dividers
- Never use `"type": "html"` settings — use `richtext` instead
- Image picker settings: always named `image`, `image_2`, etc. — never `img`, `photo`, `pic`

### 6.4 CSS conventions

```css
/* Section CSS lives in assets/section-[name].css */
/* Load it in the section file: */
{{ 'section-hero.css' | asset_url | stylesheet_tag }}

/* Class naming: BEM — .block__element--modifier */
.product-card { }
.product-card__image { }
.product-card__image--landscape { }

/* Always use CSS custom properties for colors and spacing — never hardcode */
/* CORRECT: */
color: var(--color-text-primary);
/* WRONG: */
color: #1C1C1A;
```

### 6.5 Image handling

- Always specify `width` in `image_url` filter — use the narrowest size that still looks sharp
- Always include `loading: 'lazy'` except for above-the-fold images (use `loading: 'eager'` + `fetchpriority: 'high'`)
- Always include `widths` and `sizes` for responsive images
- Aspect ratios to use: `1/1` (square), `3/4` (portrait product), `4/3` (landscape), `16/9` (banner)
- Never let images auto-size — always set explicit `aspect-ratio` in CSS

### 6.6 Performance rules

- No section should load more than one external font — fonts are loaded globally in `layout/theme.liquid`
- No inline `<style>` tags in section Liquid files — all CSS goes in `assets/`
- No `!important` declarations
- JavaScript in sections: defer loading with `{{ 'section-name.js' | asset_url | script_tag }}` at section bottom

### 6.7 Accessibility

- All images need descriptive `alt` text — use `product.featured_image.alt | default: product.title`
- All interactive elements need `:focus-visible` styles
- Color contrast: text must meet WCAG AA (4.5:1 for normal text, 3:1 for large text)
- Use semantic HTML: `<nav>`, `<main>`, `<section>`, `<article>`, `<h1>`–`<h6>` in correct order
- Sections with lists of products: use `<ul role="list">` and `<li>`

---

## 7. File Checklist for New Sections

When Claude Code creates a new section, verify all of the following before finishing:

- [ ] Section file created at `sections/[name].liquid`
- [ ] CSS file created at `assets/section-[name].css` and referenced in Liquid
- [ ] Schema includes name, all settings, and a `presets` block
- [ ] All settings have `default` values
- [ ] Japanese default text used for `text` settings (matching site language)
- [ ] All images use `image_url` + `image_tag` with `widths` and `sizes`
- [ ] Above-fold images use `loading: 'eager'`, all others use `loading: 'lazy'`
- [ ] CSS uses only variables from this file's design tokens — no hardcoded hex values
- [ ] CSS variables driven from schema are passed via inline `style` on the section element
- [ ] Responsive styles included for tablet (768–1023px) AND mobile (< 768px)
- [ ] All interactive elements have `:focus-visible` styles
- [ ] **NOT using `{%- doc -%}` in section files** — use `{%- comment -%}` instead
- [ ] Placeholder content shown in editor when no data source is connected

---

## 8. Confirmed apantry.jp UI Patterns

These patterns were confirmed by iterating against actual screenshots. Use them exactly.

### 8.1 Two-column label + content layout

Used for: News, collections, any section where a heading "anchors" a content list.

```
[200px label col] [1fr content col]
  ✦ Eyebrow          [content rows]
  大見出し
  [View more >]
  [decoration img]
```

- Label column: `position: sticky; top: 64px` on desktop so it stays visible while scrolling long lists
- On mobile: stack — label row spans full width, content below

### 8.2 White card on cream background

The standard content card in apantry.jp:
- Section bg: `#F0EBD8` (warm cream — warmer than `--color-background-alt`)
- Card bg: `#FFFFFF`
- Card radius: `16px`
- No box-shadow — white on cream provides sufficient contrast
- Internal padding: `20px`

### 8.3 Date format

Always use `Date : YYYY.MM.DD` format for article/news dates — including the "Date : " prefix with a space on each side of the colon.

```liquid
Date : {{ article.published_at | date: '%Y.%m.%d' }}
```

### 8.4 Passing schema values as CSS variables

The correct way to make schema settings (range sliders, selects) control CSS layout:

```liquid
{%- liquid
  case section.settings.image_ratio
    when 'square'    | assign ratio_str = '1 / 1'
    when 'landscape' | assign ratio_str = '4 / 3'
  endcase
-%}

<section style="--thumb-w: {{ section.settings.image_size }}px; --thumb-ratio: {{ ratio_str }};">
```

Then in CSS use `var(--thumb-w)` and `var(--thumb-ratio)` — never compute layout values in Liquid.

### 8.5 Responsive CSS variable override

When a CSS variable controls desktop sizing but should be smaller on mobile, override the variable on the component (not the root):

```css
/* Desktop: uses schema-driven variable */
.card { --thumb-w: 192px; }   /* set via inline style */

/* Tablet: fixed smaller size — ignore schema value */
@media (max-width: 1023px) { .card { --thumb-w: 88px; } }

/* Mobile: fixed smallest size */
@media (max-width: 767px)  { .card { --thumb-w: 80px; } }
```

---

*Last updated: April 2026 — based on apantry.jp design audit + home-news section build*
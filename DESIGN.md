# Real Estate OS — Design Principles

**Source brands:** BMW (bmwusa.com), Mercedes-Benz (mbusa.com, mercedes-benz.com), Apple (apple.com)
**Research date:** 2026-06-09
**Purpose:** Visual language reference for the Next.js admin dashboard, contract UI, and payments flows. Extract principles, do not copy specific screens.

> One sentence: **Editorial restraint. Image-led, text-spare, generous whitespace, one accent color used sparingly.** A property manager looking at this should feel the same calm as a buyer on apple.com configuring an iPhone — not the same calm as a buyer on a generic SaaS admin.

---

## 1. Color palette (12 hex codes)

Three brands converge on the same posture: a near-monochrome neutral system, one restrained accent, no decorative color. Real Estate OS palette below is derived from that synthesis.

### Neutrals (the 80% of every screen)
| Token            | Hex       | Use                                                    |
|------------------|-----------|--------------------------------------------------------|
| `--bg-canvas`    | `#f5f5f7` | App background. Lifted from Apple's signature off-white. Softer than pure white — reduces eye fatigue in a tool used 8h/day. |
| `--bg-surface`   | `#ffffff` | Cards, tables, modals. Always lifts above canvas.       |
| `--bg-elevated`  | `#fafafa` | Sub-surfaces inside cards (e.g. line-item rows).        |
| `--ink-primary`  | `#1d1d1f` | Body + headline text. Apple's near-black, not `#000`.   |
| `--ink-secondary`| `#6e6e73` | Labels, metadata, captions.                             |
| `--ink-muted`    | `#86868b` | Disabled, helper text.                                  |
| `--border-hair`  | `#d2d2d7` | 1px dividers (tables, card edges). Mercedes hairline.   |

### Accent (the 20%)
| Token            | Hex       | Use                                                    |
|------------------|-----------|--------------------------------------------------------|
| `--accent`       | `#1c69d4` | Primary CTA, active nav, selected row. **BMW corporate blue.** Used exactly once per viewport — never decorate with it. |
| `--accent-hover` | `#0a5cc4` | CTA hover.                                              |
| `--accent-tint`  | `#e8f0fb` | 8% tint for selected-row backgrounds, focus rings.      |

### Status (semantic — use only when conveying state)
| Token            | Hex       | Use                                                    |
|------------------|-----------|--------------------------------------------------------|
| `--success`      | `#1d8348` | Contract signed, payment received. Quiet green.        |
| `--warning`      | `#b07a00` | Pending review, expiring. Editorial amber, not yellow.  |

**Hard rule:** No gradients. No drop shadows beyond `0 1px 2px rgba(0,0,0,0.04)`. No colored backgrounds for grouping — use whitespace and hairlines instead. Mercedes ref: *"design favors monochromatic restraint with photography-driven visual hierarchy."*

---

## 2. Typography — two families, one scale

### Families
- **Display + UI:** `Inter` (variable, weights 400/500/600). Stand-in for BMW Type Next / MB Corpo / SF Pro Display. Tight tracking on display sizes.
- **Numeric / tabular:** `JetBrains Mono` (weight 400/500) for monetary amounts, contract IDs, dates in tables. Tabular numerals required (`font-variant-numeric: tabular-nums`).

### Scale (Apple-derived, modular ~1.2 ratio, generous leading)
| Token        | Size | Line-height | Weight | Tracking | Use                              |
|--------------|------|-------------|--------|----------|-----------------------------------|
| `display-xl` | 56px | 60px        | 600    | -0.022em | Marketing/landing only            |
| `display-lg` | 40px | 48px        | 600    | -0.020em | Page hero in dashboard            |
| `h1`         | 28px | 36px        | 600    | -0.015em | Section header                    |
| `h2`         | 22px | 28px        | 600    | -0.010em | Card header                       |
| `h3`         | 17px | 24px        | 600    | -0.005em | Sub-section                       |
| `body-lg`    | 17px | 26px        | 400    | 0        | Long-form (contract preview)      |
| `body`       | 15px | 22px        | 400    | 0        | Default body                      |
| `body-sm`    | 13px | 20px        | 400    | 0        | Table cells, metadata             |
| `caption`    | 12px | 16px        | 500    | +0.02em  | Labels, all-caps eyebrows         |

**Apple ref (verbatim):** *"Large, confident headlines"* + *"body text: lighter weight, generous leading."* Real Estate OS follows the same posture: heavy hierarchy contrast, weight as primary differentiator (not size alone).

**All-caps eyebrows** — borrowed directly from BMW's *"FIND YOUR DRIVE."* and *"THE MOST POWERFUL LETTER IN THE WORLD"*. Use sparingly above a section header: `caption` style, `letter-spacing: 0.08em`.

---

## 3. Motion principles (5 timings)

All three brands move with restraint. Nothing bounces, nothing oscillates, nothing demands attention.

| Token            | Duration | Easing                          | Use                                                                 |
|------------------|----------|----------------------------------|----------------------------------------------------------------------|
| `motion-instant` | `120ms`  | `cubic-bezier(0.4, 0, 0.2, 1)`   | Hover state on buttons, links, table rows. Apple-tier responsiveness. |
| `motion-quick`   | `200ms`  | `cubic-bezier(0.4, 0, 0.2, 1)`   | Tooltip, dropdown open, focus ring appear.                            |
| `motion-base`    | `320ms`  | `cubic-bezier(0.32, 0.72, 0, 1)` | Modal/drawer open, page fade. Apple's "spring without the bounce."     |
| `motion-slow`    | `480ms`  | `cubic-bezier(0.32, 0.72, 0, 1)` | Full-screen overlays (contract signing flow).                          |
| `motion-carousel`| `600ms`  | `cubic-bezier(0.65, 0, 0.35, 1)` | Hero/featured-property carousel auto-advance interval: `7000ms`.       |

**Principles**
1. **Decelerate, never accelerate-in.** Every transition uses an ease-out (`0.4, 0, 0.2, 1` or Apple's `0.32, 0.72, 0, 1`). Things arrive, never approach.
2. **Hover is opacity + color, not transform.** No scale, no translate, no shadow change. Mercedes/BMW row hovers shift only background tint and underline.
3. **Scroll is the navigation.** Full-bleed image sections (property hero on a listing page) anchor scrolling. No parallax. No scroll-jacking. Lifted from Apple: *"full-bleed imagery: product photos extend edge-to-edge."*
4. **Reduced-motion mandatory.** All animations gated behind `@media (prefers-reduced-motion: no-preference)`. Default state = instant.
5. **Loading is suppression, not spinning.** Skeleton screens (`--bg-elevated` blocks) replace spinners. Spinners only for >2s waits.

---

## 4. Grid + spacing

### Container
- **Max content width:** `1280px` (8-col + sidebar). Apple-class: *"Max-width ~1200px+ for full-bleed hero sections."*
- **Marketing/landing hero:** full-bleed, image edge-to-edge, content constrained to `1080px` centered.
- **Dashboard main:** `240px` sidebar + fluid main area. Main area inner max `1040px`.

### 12-column grid
- **Gutter:** `24px` desktop, `16px` tablet, `12px` mobile.
- **Margin:** `32px` desktop, `24px` tablet, `16px` mobile.
- **Breakpoints:** `sm 640`, `md 768`, `lg 1024`, `xl 1280`, `2xl 1536`.

### Spacing scale (8px base, multiples of 4)
`4, 8, 12, 16, 24, 32, 48, 64, 96, 128` — tokens `space-1` through `space-10`.

**Heuristic:** between two unrelated blocks, use `space-8` (64px) minimum. Between two related blocks, `space-6` (32px). Between rows in a list, `space-3` (12px). Mercedes ref: *"Generous margins and padding reinforce premium feel."*

---

## 5. Navigation pattern

Hybrid of Apple's minimal sticky top + BMW/Mercedes mega-menu for content depth.

### Top bar (`56px` height, sticky)
- Left: logo + workspace switcher (`ChevronDown` icon, opens dropdown).
- Center: nothing. **The center is sacred whitespace.** (Apple posture.)
- Right: search trigger (`⌘K`), notifications bell, account avatar.
- Border-bottom: `1px solid --border-hair`. No shadow.

### Sidebar (`240px` width, fixed, dashboard only)
- Sections separated by `space-6` and a single hairline.
- Active item: `--accent-tint` background + `--accent` left-border (`3px`).
- Hover item: `--bg-elevated` background only. No icon color change.
- Icon set: 20px line icons (Lucide), single weight throughout.

### Mega-menu (for marketing/agent-facing site)
BMW pattern: *"Mega-menu structure with sticky header navigation. Primary categories expand into multi-column dropdowns showing... sub-categories and contextual imagery."* For Real Estate OS marketing: Properties / Agents / Owners / Pricing → multi-column dropdown with thumbnail-led featured properties on right.

### Mobile
Drawer slides in from left, `motion-base` timing. Backdrop fades to `rgba(29,29,31,0.4)`.

---

## 6. Card + list patterns

### Card (property tile, contract summary, payment receipt)
- **Surface:** `--bg-surface`, `border: 1px solid --border-hair`, `border-radius: 12px`. No shadow at rest.
- **Hover (interactive cards only):** `border-color: --ink-muted`, `motion-instant`. No lift, no shadow.
- **Image:** when present, full-bleed top, aspect `3/2`, `border-radius: 12px 12px 0 0`. Mercedes pattern: *"Tall vertical cards with product photography. Text overlay bottom-aligned with subtle gradient fade."*
- **Body padding:** `20px` (`space-5`).
- **Title:** `h3` style. **Metadata row:** `body-sm` + `--ink-secondary`. **Price/amount:** mono, `h2` weight 600.

### List (the workhorse of admin)
- **Table:** `border-collapse: collapse`, hairline `--border-hair` between rows only (no vertical lines).
- **Row height:** `52px` minimum (touch-friendly), `body-sm` text.
- **Header row:** `caption` style (all-caps, `--ink-secondary`), `--bg-elevated` background, sticky on scroll.
- **Row hover:** `--bg-elevated` background, `motion-instant`.
- **Row selected:** `--accent-tint` background, no border change.
- **Zebra striping:** NONE. Hairlines do the work. (Mercedes posture.)
- **Numeric columns:** right-aligned, mono font.

### Empty state
Centered, `space-12` padding, single line of `body-lg` text, single tertiary CTA below. No illustrations. No animations. Mercedes restraint.

---

## 7. CTA pattern

Three button tiers. Use one primary per viewport — Apple's discipline.

### Primary (filled)
- `background: --accent` (`#1c69d4`), `color: #fff`.
- Hover: `background: --accent-hover` (`#0a5cc4`), `motion-instant`.
- Padding: `12px 20px`. Border-radius: `8px`.
- Font: `body` weight 500. **No icon unless the action is destructive or external.**

### Secondary (outline)
- `background: transparent`, `color: --ink-primary`, `border: 1px solid --border-hair`.
- Hover: `border-color: --ink-primary`. No fill change. (BMW + Mercedes pattern.)

### Tertiary (text link)
- `color: --accent`, inline, no underline at rest, **underline on hover**, `motion-instant`. Apple's *"Learn more >"* pattern. Use right-arrow `→` (not `>`) after label when linking to detail page.

### Microcopy (verbatim adoption from source brands, adapted to RE OS domain)

| Source                              | RE OS adaptation             |
|-------------------------------------|------------------------------|
| BMW: *"Build yours"*                | *"Create listing"*           |
| BMW: *"Explore inventory"*          | *"Browse properties"*        |
| BMW: *"Reserve now"*                | *"Reserve viewing"*          |
| Mercedes: *"View Offers"*           | *"View offers"*              |
| Mercedes: *"I'm Interested"*        | *"I'm interested"* (lead capture) |
| Mercedes: *"Request a Quote"*       | *"Request a quote"*          |
| Apple: *"Learn more →"*             | *"Learn more →"*             |
| Apple: *"Buy"*                      | *"Pay now"* (contract close) |

**Verb-first, sentence case, no exclamation marks ever.** Mercedes ref: *"Declarative, benefit-forward; avoids hard-sell language. Restraint reflects luxury positioning."*

---

## 8. Microcopy tone (the voice of the OS)

Three sources, three slightly different tones — Real Estate OS synthesizes:

- **From Apple** (consumer-facing screens — marketing, owner portal): *"declarative and confident — headlines prioritize product benefits over features."* Example: not *"Tools to help you manage tenants"* → instead *"Every tenant, one screen."*
- **From Mercedes** (agent-facing premium framing): *"Editorial voice — poetic rather than promotional."* Verbatim: *"Transforming every drive into a homecoming."* RE OS equivalent eyebrow: *"Every key change, recorded."*
- **From BMW** (functional CTAs, dashboard interior): *"Minimalist, precision-focused microcopy emphasizing performance."* Short verbs, never sentences. *"Build yours."* / *"Reserve now."*

### Rules
1. **Headlines: subject + verb, one clause, ≤7 words.** No subtitles unless absolutely required.
2. **Body: 1–2 sentences max per block.** If you need 3, you need a new block.
3. **Numbers > adjectives.** *"347 active contracts"* beats *"Many active contracts."*
4. **No emoji. No exclamation. No "we" or "our".** Voice is the system, not the company.
5. **Error states stay declarative.** *"This contract is missing a signature."* not *"Oops, something went wrong!"*

---

## 9. What NOT to do (anti-patterns to forbid in code review)

- ❌ Gradients of any kind (except subtle bottom-overlay on hero images).
- ❌ Drop shadows beyond `0 1px 2px rgba(0,0,0,0.04)`.
- ❌ Decorative colored backgrounds for grouping (use whitespace + hairlines).
- ❌ Animation on hover that changes element size or position.
- ❌ Spinners for loads under 2s (use skeleton blocks).
- ❌ More than one primary CTA per viewport.
- ❌ Sentence-case all-caps. ALL-CAPS only for `caption` eyebrows.
- ❌ Icons inside primary CTAs (except destructive/external).
- ❌ "Click here" / "Read more". Use the action verb.
- ❌ Emoji in product copy.

---

## 10. Source quotes (evidence appendix)

**BMW (bmwusa.com)**
- Mega-menu: *"Primary categories (Models, Build Your Own, Shopping, BMW Electric, Owners) expand into multi-column dropdowns showing vehicle series, sub-categories, and contextual imagery."*
- Hero: *"Full-width image backgrounds with overlay text. Featured vehicle showcase with large, centered headlines: 'FIND YOUR DRIVE.'"*
- CTAs verbatim: *"Build yours" | "Offer details" | "Explore inventory" | "Reserve now" | "Learn more"*
- Tone: *"Minimalist, precision-focused microcopy emphasizing performance ('Ultimate Driving Machine,' 'THE MOST POWERFUL LETTER IN THE WORLD')."*

**Mercedes-Benz (mbusa.com)**
- Palette: *"Monochromatic restraint with photography-driven visual hierarchy. No vibrant hex colors visible; luxury aesthetic relies on negative space and high-contrast imagery."*
- Typography: *"Large, breathing headlines (140–180px range for hero sections); compact body copy (14–16px)."*
- Cards: *"Image-led: Tall vertical cards with product photography. Text overlay bottom-aligned with subtle gradient fade."*
- Hero verbatim: *"Transforming every drive into a homecoming."*
- CTAs verbatim: *"View Offers" | "Learn More" | "Explore the Lineup" | "I'm Interested" | "Find Your Dream Mercedes-Benz"*
- Tone: *"Editorial voice — poetic rather than promotional. Legendary performance enters a new era."*

**Apple (apple.com, apple.com/shop/buy-iphone)**
- Palette: *"White backgrounds (#f5f5f7 implied), black text. Blue call-to-action buttons (likely #0071e3)."*
- Typography: *"SF Pro. Large, confident headlines. Body text: lighter weight, generous leading."*
- Layout: *"Max-width appears to be ~1200px+ for full-bleed hero sections. Single-column vertical flow with full-width image blocks. Generous padding, breathing room around elements."*
- Cards: *"Full-bleed imagery: product photos extend edge-to-edge. Image-dominant with overlay text."*
- CTAs verbatim: *"Learn more" | "Buy" | "Shop iPhone" | "Stream now"*
- Tone: *"Declarative and confident — 'Meet the latest iPhone lineup', 'Now supercharged by M5', 'The ultimate way to watch your health' — headlines prioritize product benefits over features."*

---

## 11. Quick handoff checklist for the coder

When implementing any new screen:

1. Pull tokens from `tailwind.config.ts` — do not introduce ad-hoc colors or spacing.
2. Default surface: `--bg-canvas`. Lift to `--bg-surface` only inside cards/tables.
3. One `--accent` element per viewport. Audit before you push.
4. Every transition uses a `motion-*` token. No raw `duration-300` Tailwind.
5. Every CTA uses one of the 3 button tiers. No new variants.
6. Every headline ≤ 7 words. Every body block ≤ 2 sentences.
7. Test with `prefers-reduced-motion: reduce` — everything still readable, no animation required.
8. Print the page (literally `Cmd+P`). If it looks like a luxury catalog spread, you're done. If it looks like a SaaS dashboard, restart.

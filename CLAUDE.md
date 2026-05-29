# Wedding Website — Design System Rules

> This file is the single source of truth for styling decisions.
> All components must follow these rules unless explicitly overridden with a comment explaining why.

---

## Colours

| Name | Tailwind / Hex | Usage |
|---|---|---|
| Burgundy | `#260303` | Landing page background, About Us card |
| Dark Brown | `#6D544A` | Card backgrounds (default for most cards) |
| White | `#ffffff` | Dresscode card, light surfaces |
| Highlight | `yellow-800` / `#92400e` | Active/selected menu item |

**Text colours: white or black only by default.** No greys, no muted tones unless manually overridden with justification.

---

## Fonts

- **Default font for everything:** `font-sans` (`--font-sans`) — no exceptions unless overridden
- **Allowed overrides (manual only, when explicitly required):**
  - `--font-betris-daniel` — decorative/script use (e.g. landing page arc text)
  - `--font-nima` — display/headline use when needed
- **No other fonts may be used.**

---

## Typography Scale

All headings use `font-sans` unless overridden.

| Tag | Desktop | Mobile |
|-----|---------|--------|
| h1 | `text-8xl` | `text-7xl` |
| h2 | `text-6xl` | `text-5xl` |
| h3 | `text-5xl` | `text-4xl` |
| h4 | `text-4xl` | `text-3xl` |
| h5 | `text-3xl` | `text-2xl` |
| h6 | `text-2xl` | `text-xl` |
| body / all other text | `text-lg` | `text-lg` |

Mobile breakpoint = `sm:` in Tailwind (≥640px is desktop, below is mobile).

---

## Still To Define

The following have not been specified yet — do not assume defaults:

- [ ] Border radius conventions
- [ ] Spacing / padding standards
- [ ] Button styles (shadcn base is installed)
- [ ] Shadow usage
- [ ] Dark / light mode strategy

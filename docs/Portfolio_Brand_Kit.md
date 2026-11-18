# Subhasis Jena · Personal portfolio brand kit
Revision 2 · Atlas of Invisible Things

## Personal identity

The principal identity is Subhasis Jena, designer and creative technologist in Bengaluru. The atlas is the editorial theme. Use the upper symbol that Subhasis created and chose as his personal mark. Pair it with his full name in the masthead. Present the name in Instrument Serif in the opening composition. Compact navigation may use Manrope. The supplied symbol has two ringed nodes, a curved bridge, a left hook and a right terminal dot. Preserve the geometry. Use the mark alone only where identity is already clear.

Set the opening copy from Portfolio_Design_Proposal.md. Voice is first person, curious and specific. Describe what Subhasis observed, built or designed. Credit the team for shared work. Use meaningful action labels such as “Read the ClassAnalyzer study” and “Say hello”.

## The work plate

Compose the ClassAnalyzer overlay, MuLM Studio graph and Programmable Magnetic Assembly diagram in one horizontal field. Use difference in subject, scale and crop to invite comparison. Give each fragment a visible title and independent link, and label magnetic assembly as research. An optional selected crop can expand on wide screens. On phones each figure has its own caption and ordinary link. Keep the personal mark visually separate from this artwork.

## Personal mark

Use ink on warm canvas and canvas on ink. Treat blue as a selective accent. When space is tight keep the full name legible and scale or omit the decorative mark locally. Preserve separate project credits and identities in the work chapters.

### Geometry, sizing and clear space

Retain the source coordinates below for the master. The proposed cropped canvas is `viewBox="98 80 136 174"`; it includes breathing room around the geometry. Do not stretch it into a square.

- Master stroke: 2.5 source units; minimum intended display height 72 CSS px. At that height the stroke is approximately 1 px.
- Compact candidate: same geometry, stroke 5 source units, intended for 40–56 px display height. This is an optical adjustment requiring small-size inspection, not a separately approved new symbol.
- Below 40 px: do not blindly shrink either version. Prepare and inspect a dedicated micro version, or retain a simple typographic favicon until that is ready.
- Clear space: at least one source ring radius, **14 source units**, beyond the visible silhouette on every side. For a lockup, use a gap of at least `max(12px, 0.18 × mark height)` between mark and name.
- The home-link hit area is at least 44 × 44 px and may include the full name. Visual mark dimensions and target dimensions are different.

Do not rotate, mirror, change the node count, move the terminal dot, add gradients, outline the filled dot, add shadows/glows, place it in an arbitrary badge, or animate the individual parts as a loader. Keep the mark static; the hero provides movement.

### Background adaptation

| Background | Logo color | Rule |
|---|---|---|
| Canvas `#F3F1EB` | Ink `#18211F` | Default |
| Surface `#E8EADF` | Ink `#18211F` | Default on project mounts |
| Ink `#18211F` | Canvas `#F3F1EB` | Reversed variant |
| Field blue `#2348D8` | Canvas `#F3F1EB` | Only when an intentional blue field already exists |
| Photography / mixed imagery | Ink on an opaque canvas backing, or canvas on an opaque ink backing | Avoid automatic blend modes or guessing contrast |

Do not recolor the whole site to match the source logo. Do not use blue on the ink background: that combination has insufficient contrast for small meaningful graphics and text.

### Canonical implementation reference

This is developer markup documenting the selected geometry, not a new raster logo export. Remove the original source's style attributes; they otherwise override replacement presentation attributes. Use inline SVG so `currentColor` inherits from its wrapper.

```html
<!-- Decorative when paired with the visible name in the same home link. -->
<svg class="brand-mark" viewBox="98 80 136 174"
     xmlns="http://www.w3.org/2000/svg"
     aria-hidden="true" focusable="false">
  <g fill="none" stroke="currentColor" stroke-width="2.5"
     class="brand-mark__lines">
    <circle cx="130" cy="120" r="14" />
    <circle cx="210" cy="120" r="14" />
    <path d="M130 106 Q170 72 210 106" stroke-linecap="round" />
    <path d="M130 134 L130 200 Q130 220 108 220"
          stroke-linecap="round" />
    <path d="M210 134 L210 220" stroke-linecap="round" />
  </g>
  <g fill="currentColor">
    <circle cx="210" cy="230" r="14" />
    <circle cx="130" cy="120" r="5" />
    <circle cx="210" cy="120" r="5" />
  </g>
</svg>
```

```css
.brand-home {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  min-block-size: 44px;
  color: var(--logo);
  text-decoration: none;
}
.brand-mark { display: block; block-size: 72px; inline-size: auto; flex: none; }
.brand-mark--compact { block-size: 48px; }
.brand-mark--compact .brand-mark__lines { stroke-width: 5; }
.brand-name { font: 600 1.125rem/1.2 var(--font-body); letter-spacing: -0.02em; }
```

For a standalone home icon, give the enclosing link the accessible name “Subhasis Jena — home” and keep the SVG decorative. For a standalone meaningful illustration, use `role="img"` with a unique title ID. Avoid duplicate IDs across instances. An external SVG loaded through `<img>` does not inherit the surrounding text's `currentColor`; export explicit ink/reversed variants if using that route.

Keep the supplied concept sheet privately as provenance. Record that the symbol was supplied by the owner; do not claim the new site designer invented it or that trademark exclusivity has been established.

## 5. Color system

The site is primarily warm neutral and dark ink. Blue and clay are punctuation. Aim approximately 85–95% neutral surface area in the site's own chrome, with accents sharing the remainder. This is a composition heuristic, not a quota; project artwork may use its authentic colors.

| Token | Value | Purpose |
|---|---|---|
| Canvas | `#F3F1EB` | Main background |
| Ink | `#18211F` | Text, logo, intentional dark fields |
| Muted | `#57605B` | Supporting text on light surfaces |
| Surface | `#E8EADF` | Figure mounts and quiet grouping |
| Rule | `#CDD0C6` | Decorative separators only |
| Field blue | `#2348D8` | Selected diagram emphasis or an intentional accent |
| Clay | `#A3442D` | Sparse observation/annotation emphasis |

Use underlined ink links by default. Color alone must not identify links or selected states. Prefer one accent within a composition, instead of blue and clay competing in the same small component. The viewfinder may use blue in one layer; it must remain recognizable when all layers are ink/surface.

### Calculated contrast pairs

Ratios below were calculated from the specified opaque sRGB hex values. They do not cover transparency, imagery, antialiasing or future token changes; check the rendered interface separately.

| Foreground / background | Ratio, approximately | Use |
|---|---:|---|
| Ink / canvas | 14.57:1 | Primary copy and mark |
| Muted / canvas | 5.76:1 | Supporting copy |
| Blue / canvas | 6.22:1 | Optional accent text |
| Clay / canvas | 5.43:1 | Optional accent text |
| Canvas / ink | 14.57:1 | Reversed copy and mark |
| Muted / surface | 5.35:1 | Supporting copy on mounts |
| Blue / ink | 2.34:1 | Do not use for meaningful text or small controls |
| Rule / canvas | 1.38:1 | Decoration only; not a control boundary |

Dark sections use canvas-colored text and rules/buttons with adequate contrast. Do not reuse the light-theme muted token there. A global dark-mode toggle is not required; theme individual sections explicitly.

## 6. Typography and editorial rhythm

- **Instrument Serif:** display headlines, chapter titles, occasional expressive closing line. Regular by default. Italic is optional and must earn its font payload.
- **Manrope:** body, navigation, metadata, controls and the name lockup. Limit loaded weights to those actually used.
- **System monospace:** tiny doses for chapter numbers only; no third downloaded family.

| Role | Starting size | Rules |
|---|---|---|
| Hero | `clamp(3.25rem, 8.2vw, 8.5rem)` | Line-height 1.02; tune wrapping on phones |
| Chapter | `clamp(2.25rem, 5vw, 5.5rem)` | Line-height 1.06 |
| Body | `clamp(1rem, .95rem + .25vw, 1.1875rem)` | Line-height 1.65; 55–70 characters per line |
| Navigation | 16 px minimum | Clear labels; no excessive tracking |
| Caption | 14–16 px | Line-height 1.5; never faint or cramped |
| Name | 18–20 px | Manrope 600; sentence/title case |

Do not force a dramatic line break that breaks at intermediate widths. Do not use uppercase tracking for paragraphs. Match font fallback metrics where practical and reserve stable layout space. Keep font licenses with source assets; self-host limited WOFF2 files. Total initially loaded fonts target ≤120 KB.

## Layout and motion

Use 12 columns above 1023 px and six at intermediate widths. Switch to a single reading order below 768 px. Keep outer gutters between 20 and 72 px. Allow an image to cross a decorative rule only when captions and focus rings remain unobstructed. Original screenshots retain their colors. For project artwork awaiting clearance use an explicitly labeled draft.

Use one 250–350 ms crop transition on deliberate selection. State changes are immediate in reduced motion. The personal mark stays static. On a phone prioritize static figures and natural scroll. Use visible focus rings, underlined text links and readable captions.

## 11. Developer token contract

Create one source of truth in `src/styles/tokens.css`. Components consume semantic tokens. Do not scatter copied hex values across files. The following is the starter contract, not a complete stylesheet:

```css
:root {
  --palette-canvas: #f3f1eb;
  --palette-ink: #18211f;
  --palette-muted: #57605b;
  --palette-surface: #e8eadf;
  --palette-rule: #cdd0c6;
  --palette-blue: #2348d8;
  --palette-clay: #a3442d;

  --bg: var(--palette-canvas);
  --text: var(--palette-ink);
  --text-muted: var(--palette-muted);
  --surface: var(--palette-surface);
  --rule: var(--palette-rule);
  --logo: var(--text);
  --link: var(--text);
  --control-border: var(--text-muted);
  --focus: var(--text);
  --accent: var(--palette-blue);
  --annotation: var(--palette-clay);

  --font-display: 'Instrument Serif', Georgia, serif;
  --font-body: 'Manrope', system-ui, sans-serif;
  --font-meta: ui-monospace, monospace;
  --content-max: 90rem;
  --gutter: clamp(1.25rem, 4vw, 4.5rem);
  --radius: 4px;
  --ease-settle: cubic-bezier(.22, 1, .36, 1);
  --duration-fast: 180ms;
  --duration-medium: 350ms;
  --duration-feature: 500ms;
}
[data-surface='dark'] {
  --bg: var(--palette-ink);
  --text: var(--palette-canvas);
  --text-muted: var(--palette-rule);
  --surface: #26312d;
  --rule: #65736b;
  --logo: var(--text);
  --link: var(--text);
  --control-border: var(--text-muted);
  --focus: var(--text);
  --accent: var(--text);
  --annotation: var(--text-muted);
}
:focus-visible { outline: 2px solid var(--focus); outline-offset: 4px; }
```

Set background and color on the surface wrapper using `var(--bg)` and `var(--text)`. An explicit `[data-surface='light']` override is needed if nesting a light panel inside a dark section. Do not infer surface identity from DOM position or background images.

Runtime components should accept purposeful variants, such as `tone`, `layout`, `showMark` and `motionPreference`, not arbitrary per-instance hex values. Avoid independent page themes that silently fork the palette.

Maintain `docs/brand-decisions.md` for intentional changes: date, decision, reason, affected tokens/components, screenshots reviewed and checks run. Typography, palette or mark-geometry changes require an explicit design decision, not an incidental AI refactor.

## Context for future sessions

Read the current Markdown briefs. Build a personal portfolio for Subhasis Jena with his personal signature in the masthead. Follow the two-project and one-research opening specified in the proposal and the current prompt pack. Keep the brand recognizable in monochrome. Render desktop and phone compositions before judging them. Record any intentional change to the mark, palette or typography alongside its reason.

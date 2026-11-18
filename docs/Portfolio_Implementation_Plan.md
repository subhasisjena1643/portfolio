# Subhasis Jena · Portfolio implementation plan
Revision 2 · Build from the current design proposal, brand kit and five-stage prompt pack.

## Experience and content

Home introduces Subhasis as a designer and creative technologist in Bengaluru. The name and personal mark form the masthead. Use the first-person introduction in the proposal. The introduction and all work links are available in the first HTML response.

| Route | Composition and action |
|---|---|
| / | Name and mark, three linked fragments, two featured projects, CrowdVision, a Currently building entry for MuScope, research notes, About and contact. |
| /work/ | Featured projects in order, followed by CrowdVision and MuScope. |
| /work/classanalyzer/ | Follow a tracking ID through the missing-track alert and recovery using a labeled synthetic example. |
| /work/mulm-studio/ | Follow the demo from PyTorch code through tracing to the inspectable graph. Link the source and bundled graph. |
| /research/programmable-magnetic-assembly/ | State the assembly question and staged-versus-fixed simulation comparison. This is the third hero destination. |
| /research/tissue-based-language-models/ | State the ensemble hypothesis and proposed comparison with single-model baselines. |
| /about/ | A short first-person portrait, selected experience, personal artifact if available, GitHub and email. |
| 404 | Return visitors to Home or Selected work with ordinary links. |

Use typed content records to generate routes for published work. Keep unpublished records in local preview. Maintain ClassAnalyzer and MuLM Studio as the featured pair. Research uses its own URLs and ordering.

## Art direction and implementation order

1. Gather one figure and one substantiated observation per project. Record role, collaborators, source, permission, date, version and publication status. For employer work, use approved public material. Label original illustrations and synthetic examples clearly.
2. Build the static opening and one study. Use Instrument Serif for the name and display type, Manrope for text, warm canvas and dark ink. Pair the original upper mark with the name using the canonical geometry in the brand kit. Make the plate from three separately cropped figures whose apertures align. Allow project imagery to carry its own color.
3. On wide screens use a 12-column grid with an asymmetric split between text and plate. At intermediate widths stack the plate when the name or captions feel squeezed. Below 768 px use stacked figures. At 320 px the name, title and ordinary text links must fit without horizontal scrolling.
4. Add focus controls only after the static version works. Use one optional button per fragment, an explicit selected state and a separate ordinary link. Keep the same three links available through every state. Transition crops locally over 250–350 ms. Use instant changes for reduced motion. Avoid automatic cycling, scroll capture and continuous pointer tracking.
5. Build the two featured studies, research notes, About and contact. Show a ClassAnalyzer tracking sequence and the MuLM Studio demo flow with a graph diagnostic. Retain sitewide type and captions. Show the owner’s contribution near the project title. State hypotheses and planned comparisons on research pages.
6. Complete the production checks below. Review the two questions at the end of the proposal with a fresh reader. If assets are provisional, report the prototype and public-release status separately.

**Tools.** Use Codex for the repo and Gemini for an independent critique of the rendered desktop and phone pages. The numbered prompts in Portfolio_Prompt_Pack.md define the execution order.

## 2. Research: what to learn, and what to leave behind

### Scope and evidence

This is a selective study of Awwwards' portfolio archive, verified award entries, published element descriptions and accessible portfolio pages, with homepage screenshot retrieval. It is **not an exhaustive crawl of all Awwwards submissions**, a global ranking of portfolios, or a measured performance audit of the reference sites. Some animation behavior is described by its authors or award listing; do not mistake that for frame-by-frame interaction testing. Live sites can also differ from the version originally awarded.

The following research notes are concise paraphrases. Sources are linked so the builder can inspect references without copying them.

Screenshot inspection was useful for Miranda's editorial composition and Jorge Riera's portrait/type arrangement. Bruno Simon's captured viewport was dark and Preymaker's capture remained on its loading screen; neither capture establishes the complete live visual experience. Their research notes rely on retrieved award descriptions and accessible page content. These capture limitations are not evidence that those sites are generally broken or slow.

| Reference | Evidence and useful principle | Translation for this portfolio | Do not copy |
|---|---|---|---|
| [Miranda — Paper Portfolio](https://www.awwwards.com/sites/miranda-paper-portfolio), [live site](https://www.niccolomiranda.com/) | Awwwards SOTD, 18 Nov 2021. Its editorial identity connects type, imagery and navigation; the desktop screenshot has an exceptionally large masthead and disciplined column structure. | Make one coherent visual language carry all pages; use scale changes deliberately. | Newspaper metaphor, paper texture, blackletter identity, masthead composition, illustrated portraits, sideways navigation or copy. |
| [Bruno Simon Portfolio](https://www.awwwards.com/sites/bruno-simon-portfolio), [live site](https://bruno-simon.com/) | Awwwards SOTD, 11 Nov 2019. The award description presents a playable 3D world as the portfolio interface. The current live page is substantially canvas-driven. | One memorable interaction can express the author's identity. | Driving game, miniature world, assets, sounds, loading sequence or making exploration a prerequisite for accessing work. |
| [Dennis Snellenberg](https://dennissnellenberg.com/) | The accessible site presents a clear personal identity and a focused list of projects with roles. Award status of this exact version was not independently established in this study. | Let work be easy to find; give every project a specific role and succinct introduction. | Portrait layout, moving-name treatment, magnetic buttons, greeting loader or freelance sales language. |
| [Preymaker](https://www.awwwards.com/sites/preymaker), [live site](https://preymaker.com/) | Verified SOTD, 14 Nov 2026, and Developer Award. Its entry highlights work pages, case studies, menu and mask transitions. It is a studio reference, not an individual portfolio. | Treat project presentation and the continuity between pages as part of the design. | Studio scale claims, cinematic media load, its exact masks or preloader. |
| [Jorge Riera Portfolio](https://www.awwwards.com/sites/jorge-riera-portfolio), [live site](https://jorgerieraflores.com/) | **Nominee**, 16 Nov 2026, not a verified winner. Its listing and live copy connect personal humor, branding work and playful interactions. | Allow a small amount of real personality; use real artifacts to communicate more than generic statements. | Eyes following the pointer, photo desk, bento presentation, personal jokes or client list. |
| [Awwwards portfolio directory](https://www.awwwards.com/websites/portfolio/) | Useful discovery source; listings include nominees as well as winners. | Review different approaches instead of treating the latest fashionable treatment as a requirement. | Assuming every listed site won an award or copying a reference wholesale. |

### The synthesis

The strongest common principle is **coherence**: a memorable identity, legible work and a few unusually well-executed details. Awwwards' Preymaker entry also exposes usability, content, accessibility and responsive-design considerations. “Award-level” therefore cannot mean merely adding shaders or scroll effects.

Our original transformation is: **make unseen structure visible through a designed instrument**. This grows from Subhasis' work with visual workspaces, machine-learning systems, diagnostics and scientific imagery. None of the chosen references supplies this exact narrative or layout.

### Originality rules

1. Make a local reference ledger with three columns: observed principle, original transformation, prohibited imitation.
2. Do not bring reference-site source code, logos, illustrations, photographs, screenshots or copy into production assets.
3. Do not ask the AI to “clone X with my name.” References describe a standard of craft, not a target screenshot.
4. Create the viewfinder geometry from scratch and connect its states to this portfolio's own content.
5. Review desktop and mobile screenshots side by side with references. If the silhouette, palette, type hierarchy and signature interaction together strongly recall one site, revise at least the composition and interaction concept. Changing colors alone is insufficient.
6. Record asset origins and licenses. Self-made diagrams are welcome; reconstructed interfaces must be labeled honestly.
7. This review reduces imitation risk; it cannot establish worldwide novelty or legal clearance.

## 8. Implementation architecture

### Chosen stack

Use **Astro + TypeScript + custom CSS**, statically generated. Use small framework-free scripts for the viewfinder and preferences. React is not required for a few buttons; add an island only if a genuinely complex interaction justifies its cost. No database, authentication, CMS, full-screen WebGL engine or SPA router in version one.

Astro's islands approach supports rendering most content as HTML and limiting client-side JavaScript to interactive parts. The chosen project is mostly editorial content, which makes this a good fit. Check current official setup instructions and supported Node/package versions at build time; commit the lockfile rather than guessing versions from this document.

Use CSS and the Web Animations API first. Do not install GSAP, Motion and a smooth-scroll library together. If an isolated effect cannot be achieved cleanly without a library, document the reason and measure its route-level payload before accepting it.

### Suggested organization

```text
src/
  pages/index.astro
  pages/about.astro
  pages/404.astro
  pages/work/[slug].astro
  layouts/BaseLayout.astro
  layouts/CaseStudyLayout.astro
  components/SiteHeader.astro
  components/SiteFooter.astro
  components/WorkPlate.astro
  components/ProjectChapter.astro
  components/CaseFigure.astro
  components/MotionPreference.astro
  content/work/                # typed content, draft flags
  data/profile.ts
  styles/tokens.css
  styles/global.css
  scripts/work-plate.ts
  scripts/motion-preference.ts
  assets/                      # processed source images
public/
  fonts/                       # licensed, limited WOFF2 files
  favicon.svg
docs/
  Portfolio_Implementation_Plan.md
  Portfolio_Prompt_Pack.md
  Portfolio_Design_Proposal.md
  Portfolio_Brand_Kit.md
  build-status.md
  content-provenance.md
  asset-manifest.md
  reference-ledger.md
  qa-report.md
```

Use the current Astro content-collection API, validated against official docs. Define project fields for slug, title, summary, role, status, date label, collaborators, cover, alt text, accent, body and `draft`. Each asset record needs source, permission/license, real-versus-conceptual status and caption. Each factual outcome needs a source note in the internal provenance document.

Filter drafts out of production routes, sitemap and navigation. A development-only draft preview can be used while gathering assets. Never render `TODO`, fake metrics or broken placeholders to public visitors. Keep private evidence outside `public/` and outside generated HTML.

## 9. Asset strategy

Compose the opening plate from two project crops and one research crop in semantic HTML. Treat the personal signature as its own static element beside the name. Keep the headline as text and use simple CSS for the registration mark and diagram framing.

Use real interface captures for case studies. Export tightly cropped images with enough context to be understandable. Prepare responsive AVIF/WebP with fallback where appropriate; preserve readable UI text and provide a click-to-open full-resolution image if necessary. A screenshot's explanation must also be in HTML.

Reserve image dimensions to prevent layout shifts. Load only the actual above-fold visual eagerly; lazy-load lower figures. Do not fetch videos until requested. Use poster images and native controls, captions/transcript when needed. A demonstration video is optional, never a homepage background requirement.

Keep a consistent photographic treatment without applying filters that misrepresent the work. Never hotlink reference portfolios' assets. Save font licenses and list credits.

## 10. Performance and accessibility acceptance criteria

These are **build targets**, not measured results or guarantees on every device.

| Measure | Target / gate |
|---|---|
| Initial JavaScript | Aim ≤60 KB compressed; hard review threshold 100 KB per initial route |
| CSS | Aim ≤35 KB compressed per route |
| Fonts | Combined initially loaded WOFF2 ≤120 KB; fewer files preferred |
| Homepage first-load transfer | Aim ≤750 KB mobile; review anything over 1 MB, excluding user-requested video |
| Hero artwork | Responsive crops with a lightweight HTML frame, ideally ≤40 KB compressed framing SVG; no autoplay media |
| Initial image | Normally ≤180 KB mobile; adjust only for demonstrated quality need |
| Lab performance | Lighthouse mobile median ≥95 across three production-preview runs; document environment |
| Core Web Vitals | Field targets: LCP ≤2.5 s, INP ≤200 ms, CLS ≤0.1 at the 75th percentile |
| Accessibility | Aim WCAG 2.2 AA; automated scans plus manual keyboard, zoom and assistive-technology checks |

Do not claim field INP or a field pass from a Lighthouse run. Lab checks are useful proxies; real-user evidence is available only after deployment and sufficient traffic. Scores alone do not establish usability or accessibility.

Required checks:

- Widths 320, 360, 390, 768, 1024, 1440 and 1920 px; portrait and landscape; long titles and email addresses.
- Current Chrome, Firefox and Safari where available; real Android/iPhone spot-check if available. Clearly record untested platforms.
- 200% zoom, reflow at 320 CSS px, enlarged text and visible keyboard focus without clipped controls.
- Keyboard-only navigation, skip link, logical headings, descriptive links, no focus trap and no hover-only information.
- Normal text contrast at least 4.5:1; large text at least 3:1; essential control boundaries/focus indicators checked separately.
- No-JavaScript access to all published work, biography and contact links.
- Reduced-motion setting, OS preference, coarse pointer, blocked localStorage and image-load failure.
- Slow network / CPU throttling; no long-running idle animation; no scroll-blocking handlers.
- All internal links, page refreshes, back navigation and 404 behavior on the actual hosting configuration.

Use Playwright for critical flows and screenshots, an accessibility scanner for basic issues, and browser inspection for visual judgment. Do not write tests that merely assert implementation details. Any unavailable tool must be reported as unrun, never passed.


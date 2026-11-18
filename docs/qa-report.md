# Portfolio release QA

18 November 2026 · Local production preview on Windows using Node 22.14.0, npm 11.2.0, Astro 6.4.8 and Chrome 157.0.8103.79.

**Implementation is ready for local review.** The production build generated eight HTML pages with zero type errors, warnings or hints. The known content and hosting gaps are listed separately below.

## Production checks

| Check | Result |
| --- | --- |
| Build and type checks | `npm run check` and `npm run build` passed. The output contains the expected eight pages, the favicon, CSS, self-hosted fonts and font licenses. |
| Internal links | 74 links and anchors resolved across eight pages. Exercised navigation from the hero, the Work index and its section shortcuts, each study’s return and previous/next links, the research note’s next/previous links, MuLM Studio’s design-decision link, and browser Back. |
| Hero | Linked in order to ClassAnalyzer (`/work/classanalyzer/`), MuLM Studio (`/work/mulm-studio/`) and Programmable Magnetic Assembly (`/research/programmable-magnetic-assembly/`). The 1440 px opening has equal-width unselected crops. Selecting a crop enlarges it while all three ordinary links remain available. |
| Keyboard | Tab reached the skip link, Enter moved focus to main content, and subsequent Tabs reached the first hero link and crop button in order. Visible focus was confirmed. Enter and Space changed the pressed state. Tab continued to the next hero link and Enter opened its study. |
| Touch and reduced motion | Chrome touch emulation activated a wide crop control and followed ordinary links. At 390 px it followed the stacked hero links and the index and study shortcuts. With reduced motion enabled, crop transition duration was `0s`. |
| Blocked storage | A fresh Chrome profile blocked site data. Probe writes to `localStorage` and `sessionStorage` threw `SecurityError`, and a cookie write did not persist. Keyboard navigation and crop selection still worked. |
| JavaScript disabled | All three hero links remained visible in order and were usable with the keyboard. The work index, featured studies, both research notes, About, and the 404 remained readable with contact links present. |
| Draft exclusion | An isolated production build marked both featured records as drafts. Their routes, hero and index entries, and names in body copy and metadata were absent. A mixed draft/public build also kept the draft route out and generated the public route. The active content records were untouched by these fixture builds. |
| 404 | Unknown URLs and the archived ScarletLink and microscopy URLs returned HTTP 404 with the custom page. Home and Work links worked. The build emits `noindex` on the error page, including when a host serves the literal `/404.html` file directly. |
| External links | Checked nine unique destinations using the public GitHub profile, repository metadata, the referenced files and commit, and the hosted demo. The only `Open demo` destination is the verified MuLM Studio URL. A fresh Firecrawl render returned HTTP 200 and showed the notebook, graph nodes and tensor shapes. In an anonymous browser session, Zoom In increased the graph scale from 0.397045 to 0.476454. [GitHub contact](https://github.com/subhasisjena1643) · [MuLM Studio demo](https://demo-eta-rose-13.vercel.app/) |

The release checks caught and corrected two defects. Draft project names had remained in the Work metadata and MuScope copy after routes were filtered. Chrome also requested a missing favicon on the initial load. The build now emits a small signature favicon and all five cold-load responses returned HTTP 200.

## Layout and accessibility

| Setting | Result |
| --- | --- |
| 320 and 390 CSS px | Phone layout stacked all three crops with each caption and link directly below its illustration. The signature and name fit. The name wraps at 320 px and stays on one line at 390 px. MuLM Studio’s diagram reads top to bottom. |
| 768 CSS px | The opening text sits above the three aligned fragments. Ordinary links remain visible and crop controls are hidden. Featured project descriptions wrap within their columns. |
| 1440 CSS px | Opening text and the three-fragment plate sit side by side. Crop buttons appear and focus remains visible. |
| 200% browser zoom | Chrome page zoom changed the effective viewport from 1262 to 631 CSS px at the same window size. The device pixel ratio changed from 1 to 2. The opening reflowed to stacked crops with ordinary links. All eight routes fit without horizontal overflow. |

Chrome checked all eight routes at each of the four widths, including headings, captions and visible controls. No horizontal overflow was detected. The visual review includes grayscale comparisons and native-size captures of the signature. Key contrast ratios from the CSS colors were 14.57:1 for body text and focus on canvas, 5.76:1 for muted text and the crop-control border on canvas, and 10.53:1 for muted footer text. These checks cover the sampled states. [Visual review and captures](portfolio-visual-review.md)

## Performance budgets

| Measure | Measured | Target | Result |
| --- | ---: | ---: | --- |
| Maximum initial JavaScript per route | 189 bytes gzip | 60,000 bytes | Pass |
| Cold 390 px homepage transfer | 55,367 bytes across five responses | 750,000 bytes | Pass |
| Homepage stylesheet response body | 2,911 bytes gzip | 35,000 bytes | Pass |
| Two initially loaded WOFF2 font bodies | 45,868 bytes total | 120,000 bytes | Pass |

The homepage contains one 245-byte inline crop-selection script. Its standalone gzip size is 189 bytes. That script travels inside the compressed HTML, and the other seven pages ship no JavaScript. For the cold transfer measurement, a fresh Chrome profile emulated a 390 px viewport with its cache disabled and service workers bypassed. Chrome DevTools Protocol summed `Network.loadingFinished.encodedDataLength` for the loaded HTML, stylesheet, two fonts and favicon. The response bodies alone totaled 53,867 bytes using Resource Timing. The run measured the local preview response encoding and excluded user-initiated navigation, including the external demo.

## Images, credits and sharing

- **Figures.** ClassAnalyzer’s synthetic overlay, MuLM Studio’s graph and diagnostic, and the magnetic assembly diagram have textual alternatives and visible editorial illustration captions. The research diagram describes a proposed experiment. The homepage requested no third-party assets or raster images. Archived records, original research PDFs and QA captures are outside `dist/`.
- **Fonts.** The Manrope Variable and Instrument Serif SIL Open Font License 1.1 notices in `public/fonts/` match the installed Fontsource package licenses byte for byte and are included in `dist/fonts/`.
- **Credits.** ClassAnalyzer credits Subhasis for cross-platform CI and labels the tracking overlay as documented application behavior. MuLM Studio credits the Checks work with a public commit and identifies Santhosh S’s diagnostic and deployment contributions. CrowdVision separates the ML experiments and evaluation from the teammates’ frontend and backend work. MuScope’s public copy states that planning and documentation are complete. [ClassAnalyzer source](https://github.com/subhasisjena1643/classanalyzer) · [MuLM Studio contribution](https://github.com/MuLMStudio/demo/commit/e44f7fff6a1c0a1a90a9994409f71ffd810b6e37) · [CrowdVision experiments](https://github.com/subhasisjena1643/crowdvision) · [CrowdVision team source](https://github.com/Zoroh26/Major-Project)
- **Metadata and social.** All eight pages have unique titles and descriptions, matching Open Graph title and description tags, the site name, language, viewport metadata, and the favicon. The text metadata was verified in the built HTML. The public domain and preview images are pending, so an image card, canonical URL, and platform-rendered preview could not be checked.

## Content and unavailable checks

- The owner chose the existing labeled illustrations for this edition. Additional owner-supplied illustrations, the portfolio domain and sharing images are pending. GitHub is the current contact method. A direct contact address and résumé-backed details can be added when supplied.
- The repo supports Subhasis’s ClassAnalyzer CI and MuLM Studio Checks credits. Full team credits and finer attribution for the historical demo versions remain open. MuScope’s internal documentation is private.
- This pass used desktop Chrome with emulated touch and viewports. Firefox, Safari, physical phones, a screen-reader session, an accessibility scanner, Lighthouse, and first-time reader feedback were outside the verified results. Field performance, deployed routing and platform-rendered social cards require a public deployment. The demo check covers the public workspace and canvas interaction. Backend tracing was outside the check.

## Local development and review

Use Node 22.12 or newer from the workspace root.

```sh
npm ci
npm run dev
```

The dev server prints its loopback URL and can show draft entries. For the release preview, use the static build and open the URL printed by Astro. The default port is 4321 when available. Stop either server with Ctrl+C.

```sh
npm run check
npm run build
npm run preview
```

The deployable files are in `dist/`. Review them over HTTP so root-relative assets, links, and the error page can resolve.

### Replace an illustration

1. Add the approved image to `src/assets/work/`. Export a readable crop with enough context for the featured figure and keep private originals outside public assets.
2. For a project, update `figure`, `caseStudy.scene` or `caseStudy.detail` in `src/content/work/<slug>.json`. Set `kind` to `project`, replace `motif` with `image` such as `../../assets/work/example.png`, and supply the figure’s alt text, caption, source and publication permission. That relative path produced an optimized WebP in an isolated build.
3. For a research figure, import the image file in `src/data/research.ts` and use the imported asset as `image` in the `project` figure. Preserve captions and any disclosure needed for an illustrative or AI-generated figure. The shared `WorkFigure` component renders the optimized asset and its caption.
4. Rebuild and check the hero crop and study figure at 320 and 1440 px, including keyboard focus and the resulting transfer. Set `draft: true` for a study awaiting publication clearance.

### Static hosting

Set the install command to `npm ci`, the build command to `npm run build`, and the publish directory to `dist`. Use a static host with directory indexes so paths such as `/work/mulm-studio/` resolve directly and on refresh. Configure unknown requests to serve `dist/404.html` with HTTP status 404. Keep the response status and avoid an SPA rewrite to the homepage. Enable normal text compression and retain hashed `/_astro/` assets. Once the public domain and preview images are available, set the canonical and Open Graph URLs, then retest direct links, 404 status, mobile transfer and a rendered social card on the actual host.

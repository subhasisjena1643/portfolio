# Portfolio build status

## Prompt 5 · Release QA

The eight-page production build passed the type check and local release checks. The homepage transferred 55,367 bytes on a cold mobile load, and the initial script measured 189 bytes gzip. The release report records browser coverage, the draft exclusion fix, content gaps and static hosting instructions. [Release QA report](qa-report.md)

## Prompt 4 · Visual review

Captured Home, Work, ClassAnalyzer, MuLM Studio and Programmable Magnetic Assembly before and after at 1440 and 390 CSS pixels. The review brought the research label ahead of the third hero title, made CrowdVision’s credits and MuScope’s purpose easier to scan, and linked MuLM Studio’s contribution to the design decision. The report records the Chrome checks separately from reader recall, which has yet to be measured. [Visual review and screenshot index](portfolio-visual-review.md)

## Current lineup · Prompt 3.5

The production homepage and work index feature ClassAnalyzer and MuLM Studio, in that order. The hero links to both studies and to the Programmable Magnetic Assembly research note. The compact CrowdVision entry credits Subhasis’s experiments and evaluation and links the two repositories. MuScope has a separate Currently building entry. Planning and documentation are complete. Tissue-Based Language Models is the second research note. The records and art from the older lineup are historical. Archived records under `docs/archive/work/` are outside route generation.

- **ClassAnalyzer** describes the implemented missing-track countdown and match recovery using a synthetic example. The public overlay source supports the behavior, and the record credits Subhasis’s cross-platform CI work. [Tracking overlay source](https://github.com/subhasisjena1643/classanalyzer/blob/main/utils/enhanced_tracking_overlay.py).
- **MuLM Studio** traces the demo from editing PyTorch code to inspecting operations and tensor shapes. The hero uses the shape from the bundled Input to MultiheadAttention edge. The hosted demo loaded its graph canvas in Chrome, and its Zoom In control could be activated. [Open demo](https://demo-eta-rose-13.vercel.app/) · [Demo source](https://github.com/MuLMStudio/demo) · [Bundled graph](https://github.com/MuLMStudio/demo/blob/main/static_demo_graph.json).
- **CrowdVision** uses the owner’s attribution. The research notebooks and team application are accessible separately. [ML experiments](https://github.com/subhasisjena1643/crowdvision) · [Team application](https://github.com/Zoroh26/Major-Project).
- **Research** uses the supplied PDFs for questions and proposed tests. The PDF originals stay in `docs/`. [Assembly proposal](Programmable_Matter_Simulation_Research.pdf) · [Language model comparison](Comparing%20Micro%20Language%20Model%20Architectures.pdf).

Prompts 4 and 5 should use the eight pages in the current production build as their starting point. Keep the labeled illustrations and use the owner’s additional illustrations once supplied. A public portfolio domain and preview images are pending. The pages provide title and description metadata for sharing.

`npm run check` and `npm run build` passed. Chrome verified the homepage at 390 and 1440 CSS pixels, all three hero destinations, project and research navigation, browser Back, visible keyboard focus, touch, reduced motion and no-JavaScript links. The retired study URLs returned the custom HTTP 404. The production output excludes the retired studies.

The entries below record earlier build stages and their screenshots.

## Stage 01 · Repository and source inventory

The workspace started with the four Revision 2 Markdown briefs and the earlier brand-kit PDF. It had no application files or Git metadata. The supplied documents were preserved. The Markdown briefs govern this preview.

| Material | Available | Gap |
| --- | --- | --- |
| Résumé | The proposal summarizes interface engineering, scientific imaging and systems diagnostics. | No résumé file was present. Confirm employment, education, dates and any biographical copy against the résumé before release. |
| ScarletLink description | The proposal and public README describe donor coordination. The public blueprint outlines patient and donor roles and emergency request tracking. | Confirm Subhasis’s specific decision and role, team credits, date and version. Supply an approved two-state capture using synthetic demo records. |
| REVA microscopy description | The proposal describes a research study comparing a microscope image with a corresponding detail. | Confirm role, collaborators, date and methods. Supply a matched image and annotation, permission for both, and a documented ambiguity the pair can illustrate. |
| MuLM Studio description | The proposal describes a model workspace and calls for separate hackathon and later-work credits. | Confirm the demo and later versions, dates, team and individual contribution. Supply an approved workspace crop and an explanation of the highlighted connection. |
| Personal mark | Owner-supplied geometry in the current brand-kit Markdown. | The site uses the supplied coordinates and master stroke. The older PDF remains with the source documents. |
| Publishable project figures | None supplied or cleared for the three studies. | The preview uses three original CSS illustrations, visibly labeled in their captions. They represent a fictional handoff, a synthetic field, and an example node connection. |
| Fonts | Instrument Serif and Manrope from Fontsource. | Both are self-hosted Latin subsets under OFL 1.1. License texts are in `public/fonts/`. |

Project sources: [ScarletLink README](https://github.com/subhasisjena1643/ScarletLink/blob/main/README.md), [ScarletLink blueprint](https://github.com/subhasisjena1643/ScarletLink/blob/main/docs/blueprint.md), [ClassAnalyzer README](https://github.com/subhasisjena1643/classanalyzer/blob/main/README.md), [NeuroForge README](https://github.com/subhasisjena1643/neuroforge/blob/main/README.md), [HireAI README](https://github.com/subhasisjena1643/HireAI/blob/main/README.md). Treat the descriptions as statements of project intent. No public outcome or attribution was inferred from them.

## Selection and publication

The initial three projects remain in the draft plate. ClassAnalyzer and NeuroForge have public descriptions, but the materials reviewed did not establish an approved figure and a stronger, attributable design decision for either alternative. NeuroForge’s README also refers to MuLM in its setup text. Confirm the relationship and intended version with the owner before using that repository as evidence for MuLM Studio. If a substitution is approved later, update the selected record, plate, chapter route and links together.

Astro validates the records in `src/content/work/` against `src/content.config.ts`. Unknown role, collaborators, date and version are stored as null. An editorial figure carries its own source, preview permission, alt text and caption. The production collection filter excludes all three records from navigation and route generation. Before clearing a draft, finish the attribution and use an approved figure derivative under `src/assets/`. Keep originals in private storage outside the site, or in the ignored `private/` directory during local work. Neither the briefs nor the PDF are copied into the static output.

## Run and verification

- `npm ci` installs the lockfile. Tested with Node 22.14.0, npm 11.2.0 and Astro 6.4.8. The Astro-scoped Unifont 0.7.4 pin stays within Astro’s declared range and avoids the higher Node minimum introduced by its next patch’s dependency.
- `npm run dev` opens the loopback-only draft preview at `http://127.0.0.1:4321/` by default. HTTP checks returned 200 for home and all three draft routes. Chrome confirmed the three links, their figure labels and both self-hosted fonts.
- `npm run check` passed with zero errors, warnings or hints.
- `npm run build` produced one static page in `dist/`. The output inspection confirmed no draft names, study links or study pages, and no source PDF. `npm run preview` serves this production output locally.
- Full case-study writing, responsive screenshots and release QA belong to later stages of the prompt pack.

Setup references: [Astro installation](https://docs.astro.build/en/install-and-setup/) and [Astro content collections](https://docs.astro.build/en/guides/content-collections/).

## Stage 02 · Static homepage and ScarletLink spread

The homepage uses the proposal’s first-person opening, Instrument Serif name, and unchanged upper-mark SVG. Work and Selected work lead to the chapter list. About and Say hello lead to sections on the homepage. The contact section uses the public GitHub profile while a direct contact address is pending.

ScarletLink is the first developed spread. It shows one fictional request in patient and donor views, then isolates the proposed next-action line. The figures are labeled editorial illustrations. The contribution beside the title is specific to the public repository. Subhasis updated the Firebase configuration on 16 September 2025, and Shivanesh G is credited for the application commits. Full team credit, project date and version, handoff authorship, and approved captures remain open. [Subhasis’s configuration commit](https://github.com/subhasisjena1643/ScarletLink/commit/74e3e01855b52c5bd3289a708b28edcfdaa95376), [Shivanesh’s application commit](https://github.com/subhasisjena1643/ScarletLink/commit/262cb7dfa280e24c9bfbf0ab6db817d2e9a3d38e).

### JavaScript-disabled visual review

Chrome rendered both pages at 390 and 1440 CSS pixels with JavaScript execution disabled before navigation. Inspected full-page captures and checked the viewport widths, heading and figure or link counts. Both pages fit without horizontal overflow at either width.

| Page | Width | Observation |
| --- | ---: | --- |
| [Home](previews/home-1440.png) | 1440 px | The two-line name and mark form a distinct masthead. The three apertures share a height and two narrow seams. The microscopy crop is widest, with each title and caption directly below its own frame. |
| [Home](previews/home-390.png) | 390 px | The name and mark fit on one line. Three 128 px figures stack in chapter order. After review, the microscopy fragment crops the field at the same proportions so the oval forms keep their shape on the phone. |
| [ScarletLink](previews/scarletlink-1440.png) | 1440 px | The contribution and collaborator credit sit beside the introduction. The patient and donor views read left to right, and the enlarged status detail has its own caption. |
| [ScarletLink](previews/scarletlink-390.png) | 390 px | Credits appear before the scene. The patient and donor views stack with a downward arrow. The next-action detail remains readable without zoom. |

The type check passed with zero errors, warnings or hints. The production build generated one homepage, with draft projects and study routes excluded. The local server returned 200 for the homepage and three draft study routes. The screenshots are review artifacts under `docs/previews/` and are outside the static output. Interactive crop selection and full release QA remain later stages.

## Revised project selection

The local homepage now features ClassAnalyzer and MuLM Studio, each with a study link and its public repository. The earlier ScarletLink and REVA records are preserved in `docs/archive/work/` and are excluded from route generation. The MuLM Studio spread uses a graph scene and Checks panel detail, grounded in the public demo and Subhasis’s diagnostics contribution. Both projects use labeled editorial illustrations pending approved captures. [ClassAnalyzer repository](https://github.com/subhasisjena1643/classanalyzer), [MuLM Studio demo](https://github.com/MuLMStudio/demo), [Checks panel commit](https://github.com/MuLMStudio/demo/commit/e44f7fff6a1c0a1a90a9994409f71ffd810b6e37).

The next two entries appear under Upcoming research in the local preview. Programmable Matter Simulation is a proposal for a simulation workbench. The language model document is an architecture comparison. The site uses short summaries and keeps the PDFs in `docs/`. [Programmable matter proposal](Programmable_Matter_Simulation_Research.pdf), [Architecture comparison](Comparing%20Micro%20Language%20Model%20Architectures.pdf).

Chrome rendered the revised home and MuLM Studio study with JavaScript disabled at both reference widths. At 1440 px the opening fragments share one seam and the study keeps the graph scene and checks detail separate. At 390 px the figures stack with captions, both research titles wrap, and the diagnostic stays readable. Neither page overflowed. Type checking and the production build passed. The production output excludes the drafts and source PDFs.

| Page | 390 px | 1440 px |
| --- | --- | --- |
| Home | [Capture](previews/revised-selection/home-390.png) | [Capture](previews/revised-selection/home-1440.png) |
| MuLM Studio | [Capture](previews/revised-selection/mulm-studio-390.png) | [Capture](previews/revised-selection/mulm-studio-1440.png) |

## Stage 03 · Crop controls and remaining pages

The local preview now shows ClassAnalyzer, Microscopy at REVA and MuLM Studio. Microscopy was restored from the archive for the requested comparison. ClassAnalyzer has an illustrated scene and detail. Microscopy uses one synthetic field for both views, with a marked overview and a matching enlarged area. The figures stack at phone widths. The About page, GitHub contact and custom 404 are available in the production build.

Chrome checks covered the equal-width opening, Tab, Enter, Space, emulated touch, reduced motion, independent project links, Back navigation, and reading all three studies with JavaScript disabled. The microscopy comparison fit 320 and 390 CSS pixels. In local production preview, Home and About returned 200, and unknown URLs and all draft study URLs returned the custom 404 with HTTP 404. Neither draft research titles nor source PDFs appeared in the production output.

### Authorship and asset gaps

- **ClassAnalyzer:** The record attributes cross-platform CI to Subhasis’s public account. Confirm dashboard decision ownership and team credit, and supply an approved demo-data figure.
- **Microscopy at REVA:** Confirm role, collaborators, dates and methods. Supply a matched source image and annotation with publication permission, and identify an ambiguity visible in that material.
- **MuLM Studio:** The Checks contribution has a public commit. Confirm demo and later-version credits and supply an approved, versioned workspace capture.
- **About and contact:** Résumé-backed experience details, a personal artifact and a direct contact address are pending. The footer uses the supplied GitHub profile.

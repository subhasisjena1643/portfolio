# Portfolio visual review · Prompt 4

The review covers the local production build of *Atlas of Invisible Things*. These are full-page Chrome captures at 1440 and 390 CSS pixels, at 1× device scale with the site fonts loaded. The homepage captures show the initial crop state. The before and after sets use the same routes and widths.

## Before and after

| Page | Desktop before | Desktop after | Phone before | Phone after |
| --- | --- | --- | --- | --- |
| Home | [1440](previews/prompt-04/before/home-1440.png) | [1440](previews/prompt-04/after/home-1440.png) | [390](previews/prompt-04/before/home-390.png) | [390](previews/prompt-04/after/home-390.png) |
| Work index | [1440](previews/prompt-04/before/work-1440.png) | [1440](previews/prompt-04/after/work-1440.png) | [390](previews/prompt-04/before/work-390.png) | [390](previews/prompt-04/after/work-390.png) |
| ClassAnalyzer | [1440](previews/prompt-04/before/classanalyzer-1440.png) | [1440](previews/prompt-04/after/classanalyzer-1440.png) | [390](previews/prompt-04/before/classanalyzer-390.png) | [390](previews/prompt-04/after/classanalyzer-390.png) |
| MuLM Studio | [1440](previews/prompt-04/before/mulm-studio-1440.png) | [1440](previews/prompt-04/after/mulm-studio-1440.png) | [390](previews/prompt-04/before/mulm-studio-390.png) | [390](previews/prompt-04/after/mulm-studio-390.png) |
| Programmable Magnetic Assembly | [1440](previews/prompt-04/before/magnetic-assembly-1440.png) | [1440](previews/prompt-04/after/magnetic-assembly-1440.png) | [390](previews/prompt-04/before/magnetic-assembly-390.png) | [390](previews/prompt-04/after/magnetic-assembly-390.png) |

## Visual inspection

This is an assistant review of the actual renders against the design proposal. It covers visible hierarchy and legibility. Gemini and independent readers did not participate. [Design proposal](Portfolio_Design_Proposal.md)

| Review question | What the renders show |
| --- | --- |
| Can a first-time visitor identify Subhasis? | The name is the largest text in the opening, with the signature immediately beside it and the role immediately below. At both widths the mark renders at about 56 × 72 px. At native size the two rings, bridge, hook and solid terminal remain distinct. [Desktop mark](previews/prompt-04/after/mark-1440.png) · [Phone mark](previews/prompt-04/after/mark-390.png) |
| Can a visitor distinguish two kinds of work and recognize the third fragment as research? | The revised captions name classroom analysis, a PyTorch demo, and a research note before the linked titles. Equal desktop crops preserve their shared frame. On the phone, each 128 px crop is followed by its label, title, and caption before the next crop. At an 844 px viewport height, the visitor still needs to scroll to read the second and third fragments. |
| Can a visitor find the CrowdVision credits and tell the two Mu projects apart? | The Work index now links straight to CrowdVision and MuScope. CrowdVision names Subhasis’s ML work and his teammates’ development work on separate lines on the phone and side by side on desktop. MuScope leads with runtime evidence for coding assistants. MuLM Studio is labeled as a PyTorch workspace with a public demo. |
| Can a visitor point to a choice Subhasis made? | MuLM Studio now links directly from the Contribution block to the design decision. The example explains why the Checks tab puts the plain-language diagnosis beside the traced widths of 128 and 64. ClassAnalyzer’s study labels the overlay as interface behavior and credits Subhasis separately for cross-platform CI. |

The illustrations retain readable text cues in Chrome’s grayscale simulation. ClassAnalyzer spells out detection states and the countdown. MuLM Studio’s flow uses arrows, and its Checks example pairs labels with values. On the magnetic assembly diagram, the grid and the dashed line initially had similar visual weight. The thicker dashed line and revised caption clarify the relationship between the strip and the loose unit. The note calls the simulation a proposal. [Desktop grayscale home](previews/prompt-04/grayscale/home-1440.png) · [Phone grayscale home](previews/prompt-04/grayscale/home-390.png) · [Phone grayscale MuLM Studio](previews/prompt-04/grayscale/mulm-studio-390.png) · [Phone grayscale assembly](previews/prompt-04/grayscale/magnetic-assembly-390.png)

## Automated checks

`npm run check` and `npm run build` passed. Chrome reported no horizontal overflow on the five captured routes at either width. Browser checks exercised the hero destinations, keyboard focus and crop selection, touch, reduced motion, Back, and ordinary links with JavaScript disabled. The Work index jumps and MuLM Studio’s design-decision jump landed on their targets at both widths. The production link check covered 74 internal links and anchors across eight pages.

## Actual reader feedback

No first-time reader responses were collected, so name recall, work recall and decision discovery remain unmeasured. These questions are for a reader who has seen the site without a walkthrough:

1. Whose site is this, and what does he do?
2. What two kinds of work do you remember? What did the third image lead to?
3. Can you find what Subhasis did on CrowdVision and explain how MuScope differs from MuLM Studio?
4. Pick a study and show one choice Subhasis made. What was it meant to help someone do?

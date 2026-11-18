import type { CollectionEntry } from 'astro:content';

interface ResearchNote {
  slug: string;
  title: string;
  category: string;
  question: string;
  summary: string;
  test: string;
  figure?: CollectionEntry<'work'>['data']['figure'];
}

export const magneticAssembly = {
    slug: 'programmable-magnetic-assembly',
    title: 'Programmable Magnetic Assembly',
    category: 'Research proposal',
    question: 'Can small magnetic units form a planar structure by following local rules?',
    summary: 'My hypothesis is that switching magnetic interfaces on in stages can help units complete a target structure more often or in less simulated time.',
    test: 'In a proposed 2D simulation, I would compare staged switching with fixed interfaces under the same starting conditions and energy budget. I would measure completion rate and assembly time on held-out starting configurations, including failures and timeouts.',
    figure: {
      kind: 'editorial',
      motif: 'magnetic-assembly',
      alt: 'Three square units form a short strip. A dashed line connects the strip to a fourth square that sits apart.',
      caption: 'Three joined units and a loose fourth illustrate the assembly task for the proposed simulation.',
      source: 'Original diagram based on the planar strip task in the research proposal.',
      permission: 'Original portfolio illustration',
    },
} satisfies ResearchNote;

export const researchNotes: ResearchNote[] = [
  magneticAssembly,
  {
    slug: 'tissue-based-language-models',
    title: 'Tissue-Based Language Models',
    category: 'Architecture hypothesis',
    question: 'Can a group of compressed language models recover accuracy that each model loses on its own?',
    summary: 'I’m exploring whether small models organized into groups and combined by confidence can make better task decisions when their errors differ.',
    test: 'I would begin with one group on a narrow task. On the same held-out examples, I would compare the group with a single compressed model and the original checkpoint. Task accuracy, memory use and response latency would show what the group gains and what it costs.',
  },
];

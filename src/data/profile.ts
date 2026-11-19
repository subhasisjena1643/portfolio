export const identity = 'Software engineer building AI systems and ML tools in Bengaluru.';
export const experience = [
  { employer: 'MuLM Studio', role: 'Founder & engineering lead', dates: 'Dec 2024 – present', detail: 'I’m building a self-funded, local-first PyTorch workspace. It traces a model into an interactive graph so a researcher can inspect the operations and tensor shapes behind each connection.' },
  { employer: 'Tech Mahindra', role: 'Full-stack engineering intern · AWS & AI', dates: 'Apr – Oct 2026', detail: 'I worked on a communications diagnostics workflow with FastAPI and React, including evidence views, redaction, and memory-bounded file ingestion.' },
  { employer: 'Bharat Electronics Limited', role: 'Summer intern', dates: 'Jul – Aug 2025', detail: 'I supported quality assurance, testing and technical documentation across engineering teams.' },
  { employer: 'REVA University · Physics', role: 'Machine learning intern', dates: 'Mar – Jul 2025', detail: 'I built machine learning pipelines for microscopy images.' }
];
export const education = 'BE in Electronics and Communication Engineering, REVA University · Oct 2022 – Jun 2026';
export const profileText = [identity, ...experience.map(e => [e.employer, e.role, e.dates, e.detail].join(' · ')), education].join('\n\n');

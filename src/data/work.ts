import { getCollection } from 'astro:content';

export async function getVisibleWork() {
  const entries = await getCollection('work', ({ data }) => import.meta.env.DEV || !data.draft);
  return entries.map(({ data }) => data).sort((a, b) => a.order - b.order);
}

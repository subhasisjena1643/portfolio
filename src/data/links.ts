import defaults from './link-defaults.json';

export function publicLink(key: keyof typeof defaults) {
  const value = process.env[key]?.trim() || defaults[key];
  const url = new URL(value);
  if (url.protocol !== 'https:' || url.username || url.password) throw new Error('Expected a public HTTPS URL for '+key);
  return value;
}

export function resolveContentLink(value: string) {
  return Object.hasOwn(defaults, value) ? publicLink(value as keyof typeof defaults) : value;
}
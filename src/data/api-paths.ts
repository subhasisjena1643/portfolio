// Vite exposes only these public, same-origin routing settings to the browser.
export const gatePath = import.meta.env.PUBLIC_ATLAS_GATE_PATH || '/api/gate';
export const piperPath = import.meta.env.PUBLIC_ATLAS_PIPER_PATH || '/api/piper';
// Ease discrete mouse-wheel notches. Touch, precision scrolling and other native
// input paths stay with the browser; the document is always the scroll container.
const motion = matchMedia('(prefers-reduced-motion: no-preference) and (pointer: fine)');
let frame = 0, target = 0, position = 0, velocity = 0, previous = 0;
function stop() {
  cancelAnimationFrame(frame);
  frame = 0; previous = 0; velocity = 0;
}
function tick(time: number) {
  const dt = Math.min((time - previous) / 1000, .055);
  previous = time;
  const delta = position - target;
  const c = velocity + 26 * delta;
  const decay = Math.exp(-26 * dt);
  position = target + (delta + c * dt) * decay;
  velocity = (velocity - 26 * c * dt) * decay;
  if (Math.abs(target - position) < .5 && Math.abs(velocity) < 12) {
    window.scrollTo({top:target,behavior:'instant'}); stop(); return;
  }
  window.scrollTo({top:position,behavior:'instant'});
  frame = requestAnimationFrame(tick);
}
if (!document.querySelector('.opening-plate')) window.addEventListener('wheel', e => {
  const coarseStep = e.deltaMode === WheelEvent.DOM_DELTA_LINE ||
    (e.deltaMode === WheelEvent.DOM_DELTA_PIXEL && Math.abs(e.deltaY) >= 80 && Number.isInteger(e.deltaY) && Math.abs(e.deltaY) % 10 === 0);
  if (!motion.matches || !coarseStep || !e.cancelable || e.defaultPrevented || e.ctrlKey || e.shiftKey || e.altKey || e.metaKey ||
      e.deltaX || (e.target as Element).closest('dialog,textarea,select,input,[contenteditable=true]') || document.querySelector('dialog[open]')) { stop(); return; }
  for (let el = e.target as HTMLElement|null; el && el !== document.body; el = el.parentElement) {
    if (el.scrollHeight > el.clientHeight + 1 && /auto|scroll/.test(getComputedStyle(el).overflowY)) { stop(); return; }
  }
  if (!frame) { position = target = scrollY; previous = performance.now(); }
  const max = Math.max(0, document.documentElement.scrollHeight - innerHeight);
  const next = Math.max(0, Math.min(max, target + e.deltaY * (e.deltaMode === WheelEvent.DOM_DELTA_LINE ? 18 : 1)));
  if (next === target && !frame) return;
  e.preventDefault(); target = next;
  if (!frame) frame = requestAnimationFrame(tick);
}, { passive:false });
for (const event of ['pointerdown','touchstart','keydown','pagehide','hashchange','resize']) window.addEventListener(event, stop, {passive:true});
motion.addEventListener('change', stop);

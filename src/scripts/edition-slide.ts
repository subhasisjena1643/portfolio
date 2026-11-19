const link = document.querySelector<HTMLAnchorElement>('[data-edition]');

if (link) {
  const terminal = link.dataset.edition === 'cli';
  const direction = terminal ? 1 : -1;
  function rememberPage() {
    if (terminal) return;
    const source = location.pathname + location.hash;
    link!.href = '/terminal/?from=' + encodeURIComponent(source);
    try { sessionStorage.setItem('atlas-reading-position', JSON.stringify({source, y:scrollY})); } catch {}
  }
  link.addEventListener('click', rememberPage);
  if (!terminal && document.referrer && new URL(document.referrer).pathname === '/terminal/') {
    try {
      const saved = JSON.parse(sessionStorage.getItem('atlas-reading-position') || 'null');
      sessionStorage.removeItem('atlas-reading-position');
      if (saved?.source === location.pathname + location.hash && Number.isFinite(saved.y)) {
        const restore = () => requestAnimationFrame(() => window.scrollTo({top:saved.y,behavior:'instant'}));
        if (document.readyState === 'complete') restore();
        else window.addEventListener('load', restore, {once:true});
      }
    } catch {}
  }
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const curtain = document.createElement('div');
  const mark = document.createElement('span');
  curtain.className = 'edition-curtain';
  curtain.setAttribute('aria-hidden', 'true');
  curtain.hidden = true;
  if (terminal) curtain.dataset.paper = '';
  mark.textContent = terminal ? 'Subhasis Jena.' : 'visitor@atlas:~$ ▌';
  curtain.append(mark);
  document.body.append(curtain);

  let touch: { x: number; y: number; id: number; locked: boolean } | undefined;
  let shown = 0, target = 0, frame = 0, last = 0, committing = false;
  let suppressPlateClickUntil = 0;
  function reset() {
    cancelAnimationFrame(frame);
    frame = 0; last = 0; shown = 0; target = 0;
    touch = undefined; committing = false;
    curtain.hidden = true;
    document.body.classList.remove('edition-dragging');
  }
  function paint(time: number) {
    const dt = last ? Math.min(60, time - last) : 16;
    last = time;
    shown += (target - shown) * (1 - Math.exp(-dt / (touch ? 38 : 54)));
    if (Math.abs(shown - target) < .002) shown = target;
    curtain.style.setProperty('--cut', (100 * (1 - shown)) + '%');
    if (shown !== target) frame = requestAnimationFrame(paint);
    else {
      frame = 0; last = 0;
      if (committing) location.assign(link!.href);
      else if (!touch) reset();
    }
  }
  function animate(value: number) {
    target = value;
    if (reduced.matches) return;
    curtain.hidden = false;
    if (!frame) frame = requestAnimationFrame(paint);
  }
  window.addEventListener('pointerdown', e => {
    const element = e.target as Element;
    const touchOnPlate = e.pointerType !== 'mouse' && element.closest('a.studio-plate');
    if (!e.isPrimary || e.button !== 0 || committing || document.querySelector('dialog[open]') ||
        window.getSelection()?.toString() ||
        (!touchOnPlate && element.closest('a,button,summary,input,textarea,select,canvas,pre,[contenteditable=true]'))) return;
    reset();
    suppressPlateClickUntil = 0;
    touch = { x:e.clientX, y:e.clientY, id:e.pointerId, locked:false };
  });
  window.addEventListener('pointermove', e => {
    if (!touch || touch.id !== e.pointerId) return;
    const dx = (e.clientX - touch.x) * direction, dy = Math.abs(e.clientY - touch.y);
    if (!touch.locked) {
      if (dy > 9 && dy > dx || dx < -12) { reset(); return; }
      if (dx < 14 || dx < dy * 1.6 || window.getSelection()?.toString()) return;
      touch.locked = true;
      document.body.classList.add('edition-dragging');
    }
    animate(Math.max(0, Math.min(1, dx / innerWidth)));
  });
  window.addEventListener('pointerup', e => {
    if (!touch || touch.id !== e.pointerId) return;
    const commit = touch.locked && (e.clientX - touch.x) * direction >= innerWidth * .32;
    if (touch.locked) suppressPlateClickUntil = performance.now() + 500;
    touch = undefined;
    if (commit) rememberPage();
    if (!commit && !shown) { reset(); return; }
    if (reduced.matches) { if (commit) location.assign(link.href); else reset(); return; }
    committing = commit;
    animate(commit ? 1 : 0);
  });
  document.addEventListener('click', e => {
    if (performance.now() < suppressPlateClickUntil && (e.target as Element).closest('a.studio-plate')) {
      e.preventDefault();
    }
  }, true);
  for (const event of ['pointercancel','blur','pageshow','pagehide']) window.addEventListener(event, reset);
  document.addEventListener('keydown', e => { if(e.key === 'Escape') reset(); });
}

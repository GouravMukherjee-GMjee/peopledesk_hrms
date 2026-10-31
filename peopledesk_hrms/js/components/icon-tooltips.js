/* icon-only controls (no visible text) show a small tooltip with their name on hover and keyboard focus */
(function () {
  const SEL = 'button, a, [role="button"], [role="link"], .icon-btn, .pf-avbtn';
  let tip, cur, timer;

  function label(el) {
    if (el.matches('[aria-expanded]') && el.closest('.dd')) return '';
    if (el.textContent.trim()) return '';
    return el.dataset.tip || el.getAttribute('aria-label') || el.getAttribute('title') || '';
  }
  function ensure() {
    if (tip) return tip;
    tip = document.createElement('div');
    tip.className = 'ic-tip';
    tip.setAttribute('role', 'tooltip');
    document.body.appendChild(tip);
    return tip;
  }
  function show(el) {
    const t = label(el);
    if (!t) return;
    /* swap the native title for ours so the browser doesn't show two tooltips */
    if (el.hasAttribute('title')) {
      el.dataset.tip = el.getAttribute('title');
      el.removeAttribute('title');
    }
    cur = el;
    const n = ensure();
    n.textContent = t;
    n.classList.add('on');
    const r = el.getBoundingClientRect(),
      w = n.offsetWidth,
      h = n.offsetHeight;
    let left = Math.min(Math.max(8, r.left + r.width / 2 - w / 2), innerWidth - w - 8);
    let top = r.bottom + 8;
    if (top + h > innerHeight - 8) top = r.top - h - 8;
    n.style.left = left + 'px';
    n.style.top = top + 'px';
  }
  function hide() {
    clearTimeout(timer);
    cur = null;
    if (tip) tip.classList.remove('on');
  }
  document.addEventListener('mouseover', e => {
    const el = e.target.closest && e.target.closest(SEL);
    if (!el || el === cur) return;
    clearTimeout(timer);
    timer = setTimeout(() => show(el), 250);
  });
  document.addEventListener('mouseout', e => {
    const el = e.target.closest && e.target.closest(SEL);
    if (el && !el.contains(e.relatedTarget)) hide();
  });
  document.addEventListener('focusin', e => {
    const el = e.target.closest && e.target.closest(SEL);
    if (el && el.matches(':focus-visible')) show(el);
  });
  document.addEventListener('focusout', hide);
  document.addEventListener('click', hide, true);
  document.addEventListener('scroll', hide, true);
  document.addEventListener('keydown', e => e.key === 'Escape' && hide());
})();

/* =============== themed dropdowns, scroll hints, swipe =============== */
const isMobileUI = () => innerWidth <= 900 || matchMedia('(pointer:coarse)').matches;
function ddLabel(sel) {
  let t = sel.getAttribute('aria-label');
  if (!t && sel.id) {
    const l = document.querySelector(`label[for="${sel.id}"]`);
    if (l) t = l.textContent.trim();
  }
  if (!t) {
    const l = sel.closest('.field');
    const lb = l && l.querySelector('label');
    if (lb) t = lb.textContent.trim();
  }
  return t || 'Choose an option';
}
function enhanceSelect(sel) {
  if (sel.dataset.enh) return;
  sel.dataset.enh = '1';
  const wrap = document.createElement('div');
  wrap.className = 'dd' + (sel.classList.contains('sel') ? ' dd-s' : '');
  sel.parentNode.insertBefore(wrap, sel);
  wrap.appendChild(sel);
  sel.classList.add('dd-native');
  sel.tabIndex = -1;
  sel.setAttribute('aria-hidden', 'true');
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'dd-btn';
  btn.setAttribute('aria-haspopup', 'listbox');
  btn.setAttribute('aria-expanded', 'false');
  btn.innerHTML = '<span class="dd-t"></span>' + ic('chev', 16);
  if (sel.id) {
    btn.id = sel.id + '-dd';
    const l = document.querySelector(`label[for="${sel.id}"]`);
    if (l)
      l.addEventListener('click', e => {
        e.preventDefault();
        btn.focus();
      });
  }
  wrap.appendChild(btn);
  const sync = () => {
    const o = sel.options[sel.selectedIndex];
    btn.firstChild.textContent = o ? o.textContent : '';
    btn.disabled = sel.disabled;
    btn.setAttribute('aria-label', ddLabel(sel) + ': ' + (o ? o.textContent : ''));
  };
  sync();
  const d = Object.getOwnPropertyDescriptor(HTMLSelectElement.prototype, 'value');
  Object.defineProperty(sel, 'value', {
    get() {
      return d.get.call(this);
    },
    set(v) {
      d.set.call(this, v);
      sync();
    },
    configurable: true
  });
  sel.addEventListener('change', sync);
  btn.onclick = () => ddToggle(sel, btn, sync);
  btn.onkeydown = e => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      ddToggle(sel, btn, sync);
    }
  };
}
function ddClose(focusBtn) {
  if (!ddOpen) return;
  const o = ddOpen;
  ddOpen = null;
  o.pop.remove();
  document.removeEventListener('keydown', ddKeys, true);
  document.removeEventListener('mousedown', o.out, true);
  removeEventListener('resize', o.rs);
  removeEventListener('scroll', o.sc, true);
  o.btn.setAttribute('aria-expanded', 'false');
  if (focusBtn && document.contains(o.btn)) o.btn.focus();
}
function ddAct(i) {
  const o = ddOpen;
  if (!o) return;
  o.act = i;
  o.list.querySelectorAll('.dd-o').forEach((el, k) => el.classList.toggle('act', k === i));
  o.list.setAttribute('aria-activedescendant', 'ddo' + i);
  const el = o.list.children[i];
  if (el && el.scrollIntoView) el.scrollIntoView({ block: 'nearest' });
}
function ddKeys(e) {
  const o = ddOpen;
  if (!o) return;
  const n = o.opts.length;
  const move = d => {
    let i = o.act,
      g = 0;
    do {
      i = (i + d + n) % n;
      g++;
    } while (o.opts[i].disabled && g < n);
    ddAct(i);
  };
  const eat = () => {
    e.preventDefault();
    e.stopPropagation();
  };
  if (e.key === 'ArrowDown') {
    eat();
    move(1);
  } else if (e.key === 'ArrowUp') {
    eat();
    move(-1);
  } else if (e.key === 'Home') {
    eat();
    ddAct(0);
  } else if (e.key === 'End') {
    eat();
    ddAct(n - 1);
  } else if (e.key === 'Enter' || e.key === ' ') {
    eat();
    o.pick(o.act);
  } else if (e.key === 'Escape') {
    eat();
    ddClose(true);
  } else if (e.key === 'Tab') {
    ddClose();
  } else if (e.key.length === 1 && !e.ctrlKey && !e.metaKey) {
    o.buf = (o.buf || '') + e.key.toLowerCase();
    clearTimeout(o.bt);
    o.bt = setTimeout(() => (o.buf = ''), 600);
    const i = o.opts.findIndex(x => x.textContent.trim().toLowerCase().startsWith(o.buf));
    if (i >= 0) ddAct(i);
  }
}
function ddToggle(sel, btn, sync) {
  if (ddOpen) {
    const same = ddOpen.btn === btn;
    ddClose();
    if (same) return;
  }
  const mob = isMobileUI(),
    opts = [...sel.options],
    cur = Math.max(0, sel.selectedIndex);
  const item = (o, i) =>
    `<div class="dd-o${i === cur ? ' sel' : ''}${o.disabled ? ' dis' : ''}" role="option" id="ddo${i}" data-i="${i}" aria-selected="${i === cur}">${esc(o.textContent)}<span class="dd-ck">${ic('check', 16)}</span></div>`;
  const pop = document.createElement('div'),
    lab = ddLabel(sel);
  pop.innerHTML = mob
    ? `<div class="dd-sheet" role="dialog" aria-modal="true" aria-label="${esc(lab)}"><span class="grab"></span><div class="dd-sh">${esc(lab)}</div><div class="dd-list" role="listbox" tabindex="0">${opts.map(item).join('')}</div></div>`
    : `<div class="dd-list" role="listbox" tabindex="0" aria-label="${esc(lab)}">${opts.map(item).join('')}</div>`;
  pop.className = mob ? 'dd-sheet-ov' : 'dd-pop';
  document.body.appendChild(pop);
  const list = pop.querySelector('.dd-list');
  const pick = i => {
    if (opts[i].disabled) return;
    sel.selectedIndex = i;
    sync();
    ddClose(true);
    sel.dispatchEvent(new Event('change', { bubbles: true }));
  };
  const out = e => {
    if (!pop.contains(e.target) && !btn.contains(e.target)) ddClose();
  };
  const rs = () => ddClose(),
    sc = e => {
      if (!pop.contains(e.target)) ddClose();
    };
  ddOpen = { pop, btn, list, opts, act: cur, pick, out, rs, sc };
  btn.setAttribute('aria-expanded', 'true');
  list.onclick = e => {
    const el = e.target.closest('.dd-o');
    if (el) pick(+el.dataset.i);
  };
  list.onmousemove = e => {
    const el = e.target.closest('.dd-o');
    if (el && +el.dataset.i !== ddOpen.act) ddAct(+el.dataset.i);
  };
  document.addEventListener('keydown', ddKeys, true);
  if (mob) {
    pop.onclick = e => {
      if (e.target === pop) ddClose(true);
    };
    attachSwipe(pop.querySelector('.dd-sheet'), pop.querySelector('.dd-sh'), () => ddClose(true));
  } else {
    document.addEventListener('mousedown', out, true);
    addEventListener('resize', rs);
    addEventListener('scroll', sc, true);
    const r = btn.getBoundingClientRect();
    pop.style.minWidth = Math.max(r.width, 180) + 'px';
    const h = pop.offsetHeight,
      w = pop.offsetWidth,
      below = innerHeight - r.bottom - 10,
      above = r.top - 10;
    const up = h > below && above > below;
    list.style.maxHeight = Math.max(140, Math.min(300, (up ? above : below) - 14)) + 'px';
    pop.style.left = Math.max(8, Math.min(r.left, innerWidth - w - 8)) + 'px';
    pop.style[up ? 'bottom' : 'top'] = (up ? innerHeight - r.top + 6 : r.bottom + 6) + 'px';
  }
  list.focus();
  ddAct(cur);
}
/* swipe-down to close a bottom sheet */
const swipeMath = {
  rub: d => (d < 0 ? -Math.pow(-d, 0.6) * 1.2 : d),
  dismiss: (dy, v, h) => dy > h * 0.3 || v > 0.6
}; // elastic when dragged up; closes on distance (30%) or on a quick flick
function attachSwipe(panel, handle, close) {
  let y0 = null,
    dy = 0,
    last = 0,
    lastT = 0,
    v = 0;
  handle.addEventListener(
    'touchstart',
    e => {
      y0 = e.touches[0].clientY;
      dy = 0;
      last = y0;
      lastT = performance.now();
      v = 0;
      panel.style.transition = 'none';
    },
    { passive: true }
  );
  handle.addEventListener(
    'touchmove',
    e => {
      if (y0 == null) return;
      const y = e.touches[0].clientY,
        now = performance.now();
      dy = y - y0;
      v = (y - last) / Math.max(1, now - lastT);
      last = y;
      lastT = now;
      panel.style.transform = `translateY(${swipeMath.rub(dy)}px)`;
    },
    { passive: true }
  );
  handle.addEventListener('touchend', () => {
    if (y0 == null) return;
    y0 = null;
    const out = swipeMath.dismiss(dy, v, panel.getBoundingClientRect().height);
    panel.style.transition = out
      ? 'transform .22s cubic-bezier(.4,0,1,1)'
      : 'transform .3s cubic-bezier(.2,1.2,.4,1)';
    if (out) {
      panel.style.transform = 'translateY(100%)';
      setTimeout(close, 200);
    } else panel.style.transform = '';
  });
}
/* edge-fade hints for horizontal scrollers (styled on touch devices only) */
const HS = '.tabs,.ut,.kan,.attn,.statrow,.tw',
  hsSet = new Set();
function hsUpdate(el) {
  const l = el.scrollLeft > 2,
    r = el.scrollLeft + el.clientWidth < el.scrollWidth - 2;
  el.classList.toggle('sh-l', l);
  el.classList.toggle('sh-r', r);
  if (el.classList.contains('kan')) kdots(el);
  if (el.classList.contains('tw')) {
    const sc =
      el.scrollWidth > el.clientWidth + 1 ||
      el.scrollHeight > el.clientHeight + 1 ||
      el.classList.contains('vs');
    if (sc) {
      el.tabIndex = 0;
      el.setAttribute('role', 'region');
      el.setAttribute('aria-label', 'Scrollable table');
    } else if (el.getAttribute('role') === 'region') {
      el.removeAttribute('tabindex');
      el.removeAttribute('role');
      el.removeAttribute('aria-label');
    }
  }
}
function hsInit(el) {
  if (el.dataset.hs) return;
  el.dataset.hs = '1';
  hsSet.add(el);
  el.addEventListener('scroll', () => hsUpdate(el), { passive: true });
  if (window.ResizeObserver) new ResizeObserver(() => hsUpdate(el)).observe(el);
}
function kdots(el) {
  const d = document.querySelector('#kdots');
  if (!d) return;
  const w = (el.children[0] ? el.children[0].offsetWidth : 1) + 12,
    i = Math.min(4, Math.round(el.scrollLeft / w));
  d.querySelectorAll('button').forEach((b, k) => {
    b.classList.toggle('on', k === i);
    b.setAttribute('aria-current', k === i ? 'true' : 'false');
  });
}
function kanGo(i) {
  const k = document.querySelector('.kan');
  if (k)
    k.scrollTo({
      left: i * ((k.children[0] ? k.children[0].offsetWidth : 0) + 12),
      behavior: 'smooth'
    });
}
let enhQ = false;
function enhanceAll() {
  document.querySelectorAll('table:not([aria-label])').forEach(t => {
    const card = t.closest('.card'),
      h = card && card.querySelector('h2'),
      mh = t.closest('.modal') && t.closest('.modal').querySelector('h2,.mh b'),
      v = document.querySelector('#view h1');
    t.setAttribute(
      'aria-label',
      (
        ((h && h.textContent) || (mh && mh.textContent) || (v && v.textContent) || 'Table') + ''
      ).trim()
    );
  });
  document.querySelectorAll('select:not([data-enh])').forEach(enhanceSelect);
  document.querySelectorAll(HS).forEach(hsInit);
  hsSet.forEach(el => {
    if (!el.isConnected) hsSet.delete(el);
    else hsUpdate(el);
  });
}
function initEnhance() {
  new MutationObserver(() => {
    if (enhQ) return;
    enhQ = true;
    queueMicrotask(() => {
      enhQ = false;
      enhanceAll();
    });
  }).observe(document.body, { childList: true, subtree: true });
  enhanceAll();
}

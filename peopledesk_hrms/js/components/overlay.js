/* =============== overlay system =============== */
let lastFocus = null,
  ddOpen = null,
  crumbOpen = null;
function overlay(title, body, foot, o = {}) {
  if (!$('#layer .ov')) lastFocus = document.activeElement;
  const re = !!$('#layer .ov'); // swapping content inside an open overlay: no re-animation
  const hdr = o.bare
    ? ''
    : `<div class="mh"><span class="grab"></span><h2>${esc(title)}</h2>${o.lock ? '' : `<button class="icon-btn mx" onclick="dismissModal()" aria-label="Close">${ic('x', 18)}</button>`}</div>`;
  $('#layer').innerHTML =
    `<div class="ov ${re ? 're' : ''} ${o.side ? 'drawer' : ''} ${o.cmd ? 'pal' : ''}" ${o.lock ? 'data-lock="1"' : 'onmousedown="if(event.target===this)dismissModal()"'}><div class="modal${o.wide ? ' wide' : ''}" role="dialog" aria-modal="true" aria-label="${esc(title)}">${hdr}<div class="mb" ${o.bare ? 'style="padding:0"' : ''}>${body}</div>${foot ? `<div class="mf">${foot}</div>` : ''}</div></div>`;
  lockPage();
  {
    const m = $('#layer .modal'),
      sc = m && m.querySelector('.mb');
    if (m && sc) {
      const upd = () => {
        m.classList.toggle('st', sc.scrollTop > 2);
        m.classList.toggle('sb', sc.scrollTop + sc.clientHeight < sc.scrollHeight - 2);
        if (sc.scrollHeight > sc.clientHeight + 1) {
          sc.tabIndex = 0;
          sc.setAttribute('role', 'region');
          sc.setAttribute('aria-label', title + ' content');
        } else {
          sc.removeAttribute('tabindex');
          sc.removeAttribute('role');
          sc.removeAttribute('aria-label');
        }
      };
      sc.addEventListener('scroll', upd, { passive: true });
      upd();
      setTimeout(upd, 80);
      setTimeout(upd, 300);
    }
  }
  if (!o.bare && !o.lock && isMobileUI()) {
    const m = $('#layer .modal'),
      h = $('#layer .mh');
    if (m && h) attachSwipe(m, h, dismissModal);
  }
  if (!o.keepFocus) {
    const f =
      $('#layer [autofocus]') ||
      $('#layer input:not([type=checkbox]), #layer select, #layer textarea') ||
      $('#layer .mh button');
    if (f) f.focus();
  }
}
function lockPage() {
  if (document.body.style.overflow === 'hidden') return;
  const w = innerWidth - document.documentElement.clientWidth; // width of the page scrollbar about to disappear
  document.body.style.overflow = 'hidden';
  if (w > 0) document.documentElement.style.paddingRight = w + 'px';
}
function unlockPage() {
  document.body.style.overflow = '';
  document.documentElement.style.paddingRight = '';
}
function closeModal() {
  S.dayOpen = null;
  $('#layer').innerHTML = '';
  unlockPage();
  if (lastFocus && document.contains(lastFocus) && lastFocus.focus) lastFocus.focus();
  lastFocus = null;
}
document.addEventListener('keydown', e => {
  if (ddOpen) return;
  if (
    e.key === '?' &&
    S.authed &&
    !$('#layer .ov') &&
    !/^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName || '') &&
    !e.target.isContentEditable
  ) {
    e.preventDefault();
    showKeys();
    return;
  }
  if (e.altKey && e.key === 'ArrowLeft' && S.authed && S.hist.length && !$('#layer .ov')) {
    e.preventDefault();
    back();
    return;
  }
  if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
    e.preventDefault();
    openCmd();
    return;
  }
  const ovs = document.querySelectorAll('#layer .ov'),
    ov = ovs[ovs.length - 1];
  if (!ov) return;
  if (e.key === 'Escape') {
    if (ov.id === 'discard') {
      keepEditing();
      return;
    }
    if (!ov.dataset.lock) dismissModal();
    return;
  }
  if (e.key === 'Tab') {
    const f = [
      ...ov.querySelectorAll(
        'button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea,[tabindex="0"]'
      )
    ].filter(x => x.offsetParent !== null);
    if (!f.length) return;
    const a = f[0],
      z = f[f.length - 1];
    if (e.shiftKey && document.activeElement === a) {
      e.preventDefault();
      z.focus();
    } else if (!e.shiftKey && document.activeElement === z) {
      e.preventDefault();
      a.focus();
    }
  }
});
function toast(m, undo, kind) {
  buzz();
  const t = document.createElement('div'),
    act = kind && kind.label ? kind : null,
    err = kind === 'err';
  t.className = 'toast' + (err ? ' err' : '');
  t.innerHTML = `${ic(err ? 'alert' : 'check', 16)}<span>${esc(m)}</span>${undo ? '<button class="tbtn">Undo</button>' : ''}${act ? `<button class="tbtn">${esc(act.label)}</button>` : ''}`;
  if (undo)
    t.querySelector('button').onclick = () => {
      undo();
      t.remove();
    };
  if (act)
    t.querySelector('button').onclick = () => {
      act.fn();
      t.remove();
    };
  $('#toasts').appendChild(t);
  setTimeout(() => t.remove(), undo ? 5500 : act || err ? 6500 : 3000);
}
let FIRST_BAD = null;
function chk(id, ok, msg) {
  const el = $('#' + id),
    er = $('#' + id + '-e');
  if (el) {
    el.setAttribute('aria-invalid', ok ? 'false' : 'true');
    if (er) el.setAttribute('aria-describedby', er.id);
  }
  if (er) er.textContent = ok ? '' : msg;
  if (!ok && el && !FIRST_BAD) {
    FIRST_BAD = el;
    setTimeout(() => {
      FIRST_BAD = null;
    }, 0);
    const t = (el.parentElement && el.parentElement.querySelector('.dd-btn')) || el;
    try {
      t.focus({ preventScroll: false });
    } catch (e) {}
  } // the first invalid field takes focus so screen readers land on the error
  return ok;
}
const fld = (id, label, inner, cls = '') =>
  `<div class="field ${cls}"><label for="${id}">${label}</label>${inner}<div class="err" id="${id}-e" role="alert"></div></div>`;

/* =====================================================================
   v38 · forms that protect your work, keyboard-complete tabs and buttons, search that reaches further, saved list views
   ===================================================================== */
/* ---------- unsaved changes ---------- */
function markDirty() {
  const m = document.querySelector('#layer .modal');
  if (m) m.dataset.dirty = '1';
}
{
  const _ov = overlay;
  overlay = function (title, body, foot, o = {}) {
    if (foot) foot = foot.replace(/onclick="closeModal\(\)"/g, 'onclick="dismissModal()"');
    _ov.call(this, title, body, foot, o);
    if (S.authed && !o.cmd && !o.bare) {
      const mb = document.querySelector('#layer .modal .mb');
      if (mb && mb.querySelector('input:not([type=checkbox]):not([type=file]),textarea,select')) {
        mb.addEventListener('input', markDirty);
        mb.addEventListener('change', markDirty);
      }
    }
  };
}
function dismissModal() {
  const m = document.querySelector('#layer .modal');
  if (!m || m.dataset.dirty !== '1' || document.getElementById('discard')) {
    if (!document.getElementById('discard')) closeModal();
    return;
  }
  const d = document.createElement('div');
  d.className = 'ov nest';
  d.id = 'discard';
  d.innerHTML = `<div class="modal sm" role="alertdialog" aria-modal="true" aria-labelledby="dc-t" aria-describedby="dc-d"><div class="mh"><h2 id="dc-t">Discard unsaved changes?</h2></div><div class="mb"><p id="dc-d">What you typed here has not been saved. If you leave now it will be lost.</p></div><div class="mf"><button class="btn" id="dc-keep" onclick="keepEditing()">Keep editing</button><button class="btn bad" onclick="discardGo()">Discard changes</button></div></div>`;
  document.getElementById('layer').appendChild(d);
  document.getElementById('dc-keep').focus();
}
function keepEditing() {
  const d = document.getElementById('discard');
  if (d) d.remove();
  const f = document.querySelector(
    '#layer .modal input:not([type=checkbox]),#layer .modal textarea,#layer .modal select'
  );
  if (f) f.focus();
}
function discardGo() {
  const d = document.getElementById('discard');
  if (d) d.remove();
  closeModal();
}
/* ---------- error summary for forms with several problems ---------- */
function errSum(L) {
  const mb = document.querySelector('#layer .modal .mb');
  if (!mb) return;
  let box = mb.querySelector('.errsum');
  if (L.length < 2) {
    if (box) box.remove();
    return;
  }
  if (!box) {
    box = document.createElement('div');
    box.className = 'errsum';
    box.setAttribute('role', 'alert');
    mb.prepend(box);
  }
  box.innerHTML = `<b>Fix ${L.length} things to continue</b><ul>${L.map(x => {
    const lab = (
      (document.querySelector('label[for="' + x.id + '"]') || {}).textContent || x.id
    ).replace(/\s*\(.*\)/, '');
    return `<li><a href="#${x.id}" onclick="event.preventDefault();document.getElementById('${x.id}').focus()">${esc(lab)}: ${esc(x.msg)}</a></li>`;
  }).join('')}</ul>`;
}
{
  const _c = chk;
  let list = [],
    t = null;
  chk = function (id, ok, msg) {
    const r = _c.apply(this, arguments);
    if (!ok) list.push({ id, msg });
    if (!t)
      t = setTimeout(() => {
        t = null;
        const L = list;
        list = [];
        errSum(L);
      }, 0);
    return r;
  };
}
/* ---------- keyboard: tabs are one tab stop with arrow keys; role=button works with Space and Enter ---------- */
function enhanceTabs(root) {
  (root || document).querySelectorAll('[role=tablist]').forEach((tl, ti) => {
    const tabs = [...tl.querySelectorAll('[role=tab]')];
    if (!tabs.length) return;
    tabs.forEach((b, i) => {
      if (!b.id) b.id = 'tb-' + ti + '-' + i;
      b.tabIndex = b.getAttribute('aria-selected') === 'true' ? 0 : -1;
    });
    if (!tabs.some(b => b.tabIndex === 0)) tabs[0].tabIndex = 0;
    const host = tl.closest('.head') || tl.parentElement,
      panel = host && host.nextElementSibling;
    if (panel && panel.tagName === 'DIV' && !panel.matches('[role=tabpanel]')) {
      panel.setAttribute('role', 'tabpanel');
      if (!panel.id) panel.id = 'tp-' + ti;
      panel.setAttribute(
        'aria-labelledby',
        (tabs.find(b => b.getAttribute('aria-selected') === 'true') || tabs[0]).id
      );
    }
    if (panel && panel.id && panel.getAttribute('role') === 'tabpanel')
      tabs.forEach(b => b.setAttribute('aria-controls', panel.id));
  });
}
document.addEventListener(
  'keydown',
  e => {
    const t = e.target;
    if (t && t.getAttribute && t.getAttribute('role') === 'tab') {
      const tl = t.closest('[role=tablist]'),
        tabs = [...tl.querySelectorAll('[role=tab]')],
        i = tabs.indexOf(t),
        d = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key];
      if (d || e.key === 'Home' || e.key === 'End') {
        e.preventDefault();
        const j =
          e.key === 'Home'
            ? 0
            : e.key === 'End'
              ? tabs.length - 1
              : (i + d + tabs.length) % tabs.length;
        tabs[j].click();
        setTimeout(() => {
          const n =
            document.getElementById(tabs[j].id) ||
            [...document.querySelectorAll('[role=tab][aria-selected=true]')].find(
              x => x.textContent === tabs[j].textContent
            );
          if (n) n.focus();
        }, 60);
      }
      return;
    }
    if (
      t &&
      t.getAttribute &&
      t.getAttribute('role') === 'button' &&
      t.tagName !== 'BUTTON' &&
      (e.key === ' ' || (e.key === 'Enter' && !t.hasAttribute('onkeydown')))
    ) {
      e.preventDefault();
      t.click();
    }
  },
  true
);
{
  const _rn = render;
  render = function () {
    _rn();
    enhanceTabs(document.getElementById('view'));
  };
}
{
  const _ov2 = overlay;
  overlay = function () {
    _ov2.apply(this, arguments);
    enhanceTabs(document.getElementById('layer'));
  };
}

/* ---------- employees: active filters, saved views, result count ---------- */
const BUILTIN_VIEWS = [
  { id: 'plant', n: 'My plant', f: { locF: 'Manesar Plant' } },
  { id: 'prob', n: 'Probation ending', f: { statF: 'Probation' } },
  { id: 'ver', n: 'Pending verification', f: { docF: 1 } }
];
const allViews = () => [...BUILTIN_VIEWS, ...S.views.filter(v => v.res === 'employees')];
{
  const _f = filteredEmps;
  filteredEmps = function () {
    let l = _f();
    if (S.locF) l = l.filter(e => e.loc === S.locF);
    if (S.docF) l = l.filter(e => vdocsOf(e).some(d => d.st === 'Pending'));
    return l;
  };
}
const hasF = () => !!(S.q || S.deptF !== 'All' || S.statF !== 'All' || S.locF || S.docF);
function clearF(k) {
  if (!k || k === 'q') S.q = '';
  if (!k || k === 'dept') S.deptF = 'All';
  if (!k || k === 'stat') S.statF = 'All';
  if (!k || k === 'loc') S.locF = '';
  if (!k || k === 'doc') S.docF = 0;
  render();
}
function viewsSel() {
  return `<label class="dd vsel"><span class="sr">Saved views</span><select class="sel" onchange="applyView(this.value)" aria-label="Saved views"><option value="">Views</option>${allViews()
    .map(v => `<option value="${v.id}">${esc(v.n)}</option>`)
    .join('')}</select></label>`;
}
function fchips() {
  const c = [];
  if (S.q) c.push(['q', 'Search: ' + S.q]);
  if (S.deptF !== 'All') c.push(['dept', S.deptF]);
  if (S.statF !== 'All') c.push(['stat', S.statF]);
  if (S.locF) c.push(['loc', S.locF]);
  if (S.docF) c.push(['doc', 'Documents pending verification']);
  return `<div class="fchips" id="fchips" ${c.length ? '' : 'hidden'}>${c.map(([k, t]) => `<span class="chip info fc">${esc(t)}<button onclick="clearF('${k}')" aria-label="Remove filter ${esc(t)}">${ic('x', 12)}</button></span>`).join('')}${c.length ? `<button class="link" onclick="clearF()">Clear all</button><button class="link" onclick="saveView()">Save this view</button>` : ''}</div>`;
}
function applyView(id) {
  const v = allViews().find(x => x.id === id);
  if (!v) return;
  S.q = v.f.q || '';
  S.deptF = v.f.deptF || 'All';
  S.statF = v.f.statF || 'All';
  S.locF = v.f.locF || '';
  S.docF = v.f.docF || 0;
  render();
  toast('View: ' + v.n);
}
function saveView() {
  overlay(
    'Save this view',
    `<div class="fg">${fld('sv-n', 'Name', `<input id="sv-n" placeholder="For example: Finance, on probation">`, 'full')}</div>`,
    `<button class="btn" onclick="dismissModal()">Cancel</button><button class="btn primary" onclick="saveViewGo()">Save</button>`
  );
}
function saveViewGo() {
  const n = $('#sv-n').value.trim();
  if (!chk('sv-n', !!n, 'Give the view a name')) return;
  S.views.push({
    id: 'v' + Date.now(),
    res: 'employees',
    n,
    f: { q: S.q, deptF: S.deptF, statF: S.statF, locF: S.locF, docF: S.docF }
  });
  saveGov();
  closeModal();
  render();
  toast('View saved');
}
{
  const _ep = employeesPage;
  employeesPage = function () {
    let h = _ep();
    return h.replace('<div class="grow"></div>', fchips() + '<div class="grow"></div>');
  };
}
{
  const _rl = renderList;
  renderList = function () {
    _rl();
    const f = document.getElementById('fchips');
    if (f) f.outerHTML = fchips();
  };
}

/* a table that scrolls must be reachable by keyboard even when it has no buttons inside */
function enhanceScrollers(root) {
  (root || document).querySelectorAll('.tw').forEach(t => {
    const sc =
      t.classList.contains('vs') ||
      t.scrollWidth > t.clientWidth + 1 ||
      t.scrollHeight > t.clientHeight + 1;
    if (sc) {
      t.tabIndex = 0;
      t.setAttribute('role', 'region');
      t.setAttribute(
        'aria-label',
        (t.querySelector('table') && t.querySelector('table').getAttribute('aria-label')) ||
          'Scrollable table'
      );
    } else if (!sc && t.getAttribute('role') === 'region' && t.hasAttribute('tabindex')) {
      t.removeAttribute('tabindex');
      t.removeAttribute('role');
    }
  });
}
{
  const _rn3 = render;
  render = function () {
    _rn3();
    enhanceScrollers(document.getElementById('view'));
    requestAnimationFrame(() => enhanceScrollers(document.getElementById('view')));
    clearTimeout(enhanceScrollers.t);
    enhanceScrollers.t = setTimeout(() => enhanceScrollers(document.getElementById('view')), 350);
  };
}
addEventListener('resize', () =>
  setTimeout(() => enhanceScrollers(document.getElementById('view')), 200)
);

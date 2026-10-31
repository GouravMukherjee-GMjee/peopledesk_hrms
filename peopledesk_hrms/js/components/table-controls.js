/* =============== bulk selection, density and column controls =============== */
const SEL_NOUN = { leave: 'leave request', reg: 'correction', claim: 'claim', ap: 'request' };
function pruneSel() {
  const s = S.sel;
  if (!s || !s.scope) return;
  const live = id =>
    s.scope === 'ap'
      ? (() => {
          const k = ['', 'leave', 'claim', 'reg'][Math.floor(id / 1e13)],
            x = KIND[k] && KIND[k].list().find(r => r.id === id % 1e13);
          return !!x && stOf(k, x) === 'Pending';
        })()
      : s.scope === 'leave'
        ? (S.leaves.find(x => x.id === id) || {}).status === 'Pending'
        : s.scope === 'claim'
          ? (S.claims.find(x => x.id === id) || {}).st === 'Pending'
          : (S.regs.find(x => x.id === id) || {}).status === 'Pending';
  s.ids = s.ids.filter(live);
  if (!s.ids.length) S.sel = { scope: '', ids: [] };
}
function selBar() {
  const s = S.sel;
  if (!s || !s.ids.length) return '';
  return `<div class="selbar" id="selbar" role="region" aria-label="Bulk actions"><b aria-live="polite">${s.ids.length} selected</b><button class="btn ok sm" onclick="bulkDecide('${s.scope}','Approved')">${ic('check', 14)}Approve</button><button class="btn bad sm" onclick="bulkDecide('${s.scope}','Rejected')">${ic('x', 14)}Reject</button><button class="btn sm" onclick="selClear()">Clear</button></div>`;
}
function renderSel() {
  // update in place so keyboard focus stays on the checkbox
  const bar = document.getElementById('selbar'),
    html = selBar();
  if (bar) {
    if (html) bar.outerHTML = html;
    else bar.remove();
  } else if (html) $('#view').insertAdjacentHTML('beforeend', html);
  const ids = new Set(S.sel.ids),
    boxes = [...document.querySelectorAll('#view input.selc[data-sid]')];
  boxes.forEach(b => {
    b.checked = ids.has(+b.dataset.sid);
  });
  syncSel();
}
function syncSel() {
  const boxes = [...document.querySelectorAll('#view tbody input.selc[data-sid]')],
    n = boxes.filter(b => b.checked).length,
    all = document.getElementById('selall');
  if (all) {
    all.checked = boxes.length > 0 && n === boxes.length;
    all.indeterminate = n > 0 && n < boxes.length;
  }
}
function selToggle(scope, id, on) {
  if (!S.sel || S.sel.scope !== scope) S.sel = { scope, ids: [] };
  const s = new Set(S.sel.ids);
  if (on) s.add(id);
  else s.delete(id);
  S.sel.ids = [...s];
  renderSel();
}
function selAll(scope, ids, on) {
  S.sel = { scope, ids: on ? [...ids] : [] };
  renderSel();
}
function selClear() {
  S.sel = { scope: '', ids: [] };
  renderSel();
}
function setDensity(v) {
  document.documentElement.dataset.density = v;
  try {
    localStorage.setItem('pd-density', v);
  } catch (e) {}
  render();
}
const ECOLS = [
  ['id', 'ID'],
  ['dept', 'Department'],
  ['loc', 'Location'],
  ['status', 'Status']
];
S.cols = S.cols || { id: 1, dept: 1, loc: 1, status: 1 };
const colOn = k => S.cols[k] !== 0;
function saveCols() {
  try {
    localStorage.setItem('pd-cols', JSON.stringify(S.cols));
  } catch (e) {}
}
function toggleCol(k) {
  S.cols[k] = colOn(k) ? 0 : 1;
  saveCols();
  render();
}
function resetCols() {
  S.cols = { id: 1, dept: 1, loc: 1, status: 1 };
  saveCols();
  render();
}
const colsCtl = () => {
  const d = document.documentElement.dataset.density || 'normal';
  return `<span class="colw desk"><button class="btn sm" aria-haspopup="true" aria-label="Display options" title="Display options" aria-expanded="${!!S.colMenu}" onclick="S.colMenu=!S.colMenu;render()">${ic('sliders', 14)}<span class="lbl">Display</span></button>${
    S.colMenu
      ? `<div class="colpop" role="group" aria-label="Display options">${
          S.page === 'employees'
            ? `<div class="colsec">Sort by</div><div class="sortl" role="radiogroup" aria-label="Sort by">${Object.entries(
                SORTS
              )
                .map(
                  ([v, l]) =>
                    `<button role="radio" aria-checked="${(S.sort || 'name') === v}" class="${(S.sort || 'name') === v ? 'on' : ''}" onclick="S.sort='${v}';render()">${l}</button>`
                )
                .join('')}</div>`
            : ''
        }<div class="colsec">Row density</div><div class="denseg" role="radiogroup" aria-label="Row density">${[
          ['compact', 'Compact'],
          ['normal', 'Normal'],
          ['comfortable', 'Roomy']
        ]
          .map(
            ([v, l]) =>
              `<button role="radio" aria-checked="${d === v}" class="${d === v ? 'on' : ''}" onclick="setDensity('${v}')">${l}</button>`
          )
          .join(
            ''
          )}</div><div class="colsec">Columns</div>${ECOLS.map(([k, l]) => `<label class="colrow"><input type="checkbox" ${colOn(k) ? 'checked' : ''} onchange="toggleCol('${k}')"> ${l}</label>`).join('')}<button class="btn sm" onclick="resetCols()">Reset columns</button></div>`
      : ''
  }</span>`;
};
addEventListener('click', e => {
  if (S.colMenu && !e.target.closest('.colw')) {
    S.colMenu = false;
    render();
  }
});
addEventListener('keydown', e => {
  if (e.key === 'Escape' && S.colMenu) {
    S.colMenu = false;
    render();
  }
});
try {
  const d = localStorage.getItem('pd-density');
  if (d) document.documentElement.dataset.density = d;
  const cc = localStorage.getItem('pd-cols');
  if (cc) S.cols = JSON.parse(cc);
} catch (e) {}

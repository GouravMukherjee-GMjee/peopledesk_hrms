/* =====================================================================
   v38 · joiners and leavers: owned, dated tasks; clearance blocks the last day
   ===================================================================== */
const ONB_T = [
  ['docs', 'Collect and verify joining documents', 'hr', 2],
  ['bank', 'Add bank and PAN details', 'emp', 3],
  ['it', 'Create email account and issue a laptop', 'it', 1],
  ['id', 'Issue ID and access card', 'hr', 1],
  ['forms', 'Complete PF and ESI forms', 'emp', 5],
  ['safety', 'Safety induction', 'mgr', 7],
  ['buddy', 'Assign a buddy', 'mgr', 3],
  ['goals', 'Set probation goals', 'mgr', 14]
];
const OFF_T = [
  ['appr', 'Resignation approved by manager and HR', 'mgr', null],
  ['kt', 'Knowledge transfer plan agreed', 'mgr', -14],
  ['assets', 'Return all company assets', 'emp', -2],
  ['access', 'Remove system access (email, VPN, ERP)', 'it', 0],
  ['claims', 'Clear pending claims and advances', 'fin', -3],
  ['exit', 'Exit interview', 'hr', -5],
  ['fnf', 'Full and final settlement handed to payroll', 'fin', 0],
  ['letters', 'Experience and relieving letters', 'hr', 2]
];
const OWNER = { hr: () => emp('E-1001'), it: () => emp('E-1009'), fin: () => emp('E-1014') };
const ownerOf = (t, e) => (t === 'emp' ? e : t === 'mgr' ? mgrOf(e) || emp('E-1001') : OWNER[t]());
function autoDone(kind, e, key) {
  if (kind === 'onb') {
    if (key === 'bank') return !!e.bank && !e.panMissing;
    if (key === 'it')
      return S.assets.some(
        a => a.holder === e.id && a.type === 'Laptop' && a.status === 'Assigned'
      );
    if (key === 'id')
      return S.assets.some(
        a => a.holder === e.id && a.type === 'ID card' && a.status === 'Assigned'
      );
  } else {
    if (key === 'assets') return !S.assets.some(a => a.holder === e.id && a.status === 'Assigned');
    if (key === 'claims') return !S.claims.some(c => c.emp === e.id && c.st === 'Pending');
  }
  return false;
}
const AUTO = { onb: ['bank', 'it', 'id'], off: ['assets', 'claims'] };
const taskState = (kind, id, key) => ((S.life[kind][id] || {}).t || {})[key];
const isDone = (kind, e, key) =>
  AUTO[kind].includes(key) ? autoDone(kind, e, key) : !!taskState(kind, e.id, key);
const canTick = o => can('lifecycle', 'edit') || o.id === me().id;
function lifeTick(kind, id, key, on) {
  const e = emp(id),
    T = (kind === 'onb' ? ONB_T : OFF_T).find(x => x[0] === key),
    o = ownerOf(T[2], e);
  if (!canTick(o)) {
    toast('Only ' + o.name + ' or HR can complete this task', null, 'err');
    render();
    return;
  }
  const r = (S.life[kind][id] = S.life[kind][id] || { t: {} });
  r.t = r.t || {};
  if (on) r.t[key] = { by: me().name, at: new Date().toISOString() };
  else delete r.t[key];
  audit(
    (kind === 'onb' ? 'Onboarding' : 'Offboarding') + ' task ' + (on ? 'completed' : 'reopened'),
    `${e.name} · ${T[1]}`,
    { res: 'lifecycle' }
  );
  persist();
  render();
}
function dueOf(kind, e, T) {
  if (kind === 'onb') return iso(addDays(new Date(e.join + 'T00:00:00'), T[3]));
  const r = S.life.off[e.id];
  if (T[0] === 'appr') return addWork(r.resigned, 2);
  return iso(addDays(new Date(r.lwd + 'T00:00:00'), T[3]));
}
function taskRow(kind, e, T) {
  const key = T[0],
    o = ownerOf(T[2], e),
    done = isDone(kind, e, key),
    st = taskState(kind, e.id, key),
    due = dueOf(kind, e, T),
    od = !done && due < iso(TODAY),
    auto = AUTO[kind].includes(key);
  let extra = '';
  if (kind === 'off' && key === 'assets') {
    const a = S.assets.filter(x => x.holder === e.id && x.status === 'Assigned');
    extra = a.length
      ? `<div class="small" style="margin-top:4px">${a.map(x => `<button class="link" onclick="returnAsset('${x.id}','${e.id}')">${esc(aname(x))}: return</button>`).join(' · ')}</div>`
      : `<div class="muted small">Nothing left to return</div>`;
  }
  if (kind === 'off' && key === 'fnf') {
    const s = slip(e.ctc),
      el = balances(e.id).EL.left,
      enc = (el * s.m) / 30,
      r = S.life.off[e.id],
      req = e.type === 'Plant' ? 30 : 60,
      act = Math.round((new Date(r.lwd) - new Date(r.resigned)) / 864e5),
      sh = Math.max(0, req - act),
      rec = (sh * s.m) / 30;
    extra = canField('salary', e.id)
      ? `<div class="muted small" style="margin-top:4px">Estimate: leave encashment ${inr(enc)} (${el} earned days)${sh ? `, notice shortfall recovery −${inr(rec)} (${sh} days)` : ''}. Payroll confirms the final figure.</div>`
      : '';
  }
  if (kind === 'off' && key === 'claims' && !done)
    extra = `<div class="muted small" style="margin-top:4px">${S.claims.filter(c => c.emp === e.id && c.st === 'Pending').length} claim(s) still pending approval</div>`;
  return `<div class="li" style="align-items:flex-start"><label class="grow" style="display:flex;gap:10px;align-items:flex-start"><input type="checkbox" ${done ? 'checked' : ''} ${auto || !canTick(o) ? 'disabled' : ''} onchange="lifeTick('${kind}','${e.id}','${key}',this.checked)" aria-label="${esc(T[1])}"><span><b style="${done ? 'text-decoration:line-through;color:var(--muted)' : ''}">${esc(T[1])}</b><div class="muted small">${esc(o.name)}${o.id === e.id ? ' (employee)' : ''} · due ${fshort(due)}${auto ? ' · updates itself from ' + (key === 'bank' ? 'profile' : key === 'it' || key === 'id' ? 'assets' : key === 'assets' ? 'assets' : 'claims') : ''}${done && st ? ' · done by ' + esc(st.by) : ''}</div>${extra}</span></label>${od ? chip('Overdue', 'bad', 1) : done ? chip('Done', 'ok', 1) : ''}</div>`;
}
const progress = (kind, e, tasks) => {
  const n = tasks.filter(T => isDone(kind, e, T[0])).length;
  return { n, t: tasks.length, pct: (n / tasks.length) * 100 };
};
function onbCard(e) {
  const pr = progress('onb', e, ONB_T),
    pe = new Date(e.join + 'T00:00:00');
  pe.setMonth(pe.getMonth() + W().probation);
  return `<div class="card"><div class="head"><div class="person">${av(e.name, 40)}<div><b>${esc(e.name)}</b><span>${esc(e.title)} · joined ${fdate(e.join)} · reports to ${esc(reportsTo(e))}</span></div></div>${pr.n === pr.t ? chip('Complete', 'ok', 1) : chip(pr.n + ' of ' + pr.t + ' done', 'info', 1)}</div>
   <div class="kb" style="margin:2px 0 8px" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${Math.round(pr.pct)}" aria-label="Onboarding progress"><i style="width:${pr.pct}%"></i></div><p class="muted small" style="margin-bottom:8px">Probation ends ${fdate(iso(pe))} (${W().probation} months, from Settings)</p><div class="list">${ONB_T.map(T => taskRow('onb', e, T)).join('')}</div></div>`;
}
function offCard(e) {
  const r = S.life.off[e.id],
    tasks = OFF_T,
    pr = progress('off', e, tasks),
    all = pr.n === pr.t,
    left = tasks.filter(T => !isDone('off', e, T[0]));
  return `<div class="card"><div class="head"><div class="person">${av(e.name, 40)}<div><b>${esc(e.name)}</b><span>${esc(e.title)} · ${esc(r.reason)} · last working day ${fdate(r.lwd)}</span></div></div>${all ? chip('Cleared', 'ok', 1) : chip(pr.n + ' of ' + pr.t + ' cleared', 'warn', 1)}</div>
   <div class="kb" style="margin:2px 0 8px" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${Math.round(pr.pct)}" aria-label="Clearance progress"><i style="width:${pr.pct}%"></i></div><p class="muted small" style="margin-bottom:8px">Resigned ${fdate(r.resigned)}. ${r.note ? esc(r.note) : ''}</p><div class="list">${tasks.map(T => taskRow('off', e, T)).join('')}</div>
   <div class="acts" style="margin-top:12px">${can('lifecycle', 'edit') ? `<button class="btn primary" ${all ? '' : 'disabled'} onclick="offComplete('${e.id}')">Complete exit</button>` : ''}${all ? '' : `<span class="muted small" style="align-self:center">Still open: ${left.map(T => T[1].split(' ').slice(0, 3).join(' ')).join(', ')}. The last day cannot be completed until clearance is done.</span>`}</div></div>`;
}
function startOff() {
  if (!need('lifecycle', 'create', 'start offboarding')) return;
  const opts = live().filter(
    e => e.id !== me().id && !S.life.off[e.id] && inScope('lifecycle', e.id) && e.id !== 'E-1001'
  );
  overlay(
    'Start offboarding',
    `<div class="fg">${fld('of-e', 'Employee', `<select id="of-e" onchange="offDef()">${opts.map(e => `<option value="${e.id}">${esc(e.name)} · ${esc(e.title)}</option>`).join('')}</select>`, 'full')}${fld('of-r', 'Reason', `<select id="of-r"><option>Resignation</option><option>End of contract</option><option>Retirement</option><option>Termination</option></select>`)}${fld('of-d', 'Resignation date', `<input id="of-d" type="date" value="${iso(TODAY)}" oninput="offDef()">`)}${fld('of-l', 'Last working day', `<input id="of-l" type="date">`)}${fld('of-n', 'Note', `<textarea id="of-n" rows="2"></textarea>`, 'full')}</div><p class="muted small" id="of-h"></p>`,
    `<button class="btn" onclick="dismissModal()">Cancel</button><button class="btn primary" onclick="offSave()">Start offboarding</button>`
  );
  offDef(true);
}
function offDef(first) {
  const e = emp($('#of-e').value),
    req = e.type === 'Plant' ? 30 : 60,
    d = $('#of-d').value || iso(TODAY);
  if (first || !$('#of-l').dataset.u)
    $('#of-l').value = iso(addDays(new Date(d + 'T00:00:00'), req));
  $('#of-l').oninput = () => {
    $('#of-l').dataset.u = 1;
    offDef();
  };
  const act = Math.round((new Date($('#of-l').value) - new Date(d)) / 864e5);
  $('#of-h').textContent =
    `Notice period for ${e.type === 'Plant' ? 'plant' : 'office'} staff is ${req} days.${act < req ? ` This is ${req - act} days short; the shortfall is recovered in the settlement.` : ''}`;
}
function offSave() {
  const id = $('#of-e').value,
    d = $('#of-d').value,
    l = $('#of-l').value;
  if (
    ![
      chk('of-d', !!d, 'Choose a date'),
      chk('of-l', !!l && l >= d, 'Last working day must be on or after the resignation date')
    ].every(Boolean)
  )
    return;
  const e = emp(id);
  S.life.off[id] = {
    reason: $('#of-r').value,
    resigned: d,
    lwd: l,
    note: $('#of-n').value.trim(),
    by: me().name,
    at: new Date().toISOString(),
    t: {}
  };
  audit('Offboarding started', e.name, {
    res: 'lifecycle',
    to: `last working day ${fdate(l)}`,
    reason: $('#of-r').value
  });
  persist();
  closeModal();
  S.tab.lc = 'off';
  render();
  toast('Offboarding started for ' + e.name + '. Tasks now have owners and due dates');
}
function offComplete(id) {
  if (!need('lifecycle', 'edit', 'complete exits')) return;
  const e = emp(id),
    r = S.life.off[id];
  if (OFF_T.some(T => !isDone('off', e, T[0]))) {
    toast('Clearance is not complete yet', null, 'err');
    return;
  }
  confirmBox(
    'Complete this exit?',
    `${e.name} will be marked as exited from ${fdate(r.lwd)} and removed from active lists, payroll and approvals.`,
    'Complete exit',
    () => {
      e.status = 'Exited';
      e.exit = r.lwd;
      r.done = true;
      S.life.exits.push({ emp: id, name: e.name, lwd: r.lwd, reason: r.reason });
      audit('Exit completed', e.name, { res: 'lifecycle', to: 'Exited on ' + fdate(r.lwd) });
      persist();
      render();
      toast(e.name + ' has exited');
    },
    true
  );
}
function lifecyclePage() {
  const t = curTab('lc', 'onb'),
    sc = live().filter(e => inScope('lifecycle', e.id)),
    joiners = sc
      .filter(e => e.join >= iso(addDays(TODAY, -60)))
      .sort((a, b) => (a.join < b.join ? 1 : -1)),
    offs = Object.keys(S.life.off)
      .map(emp)
      .filter(e => e && !S.life.off[e.id].done && inScope('lifecycle', e.id)),
    gone = (S.life.exits || []).slice().reverse();
  return (
    ph(
      'Joiners and leavers',
      'Onboarding and offboarding tasks with an owner and a due date',
      t === 'off' && can('lifecycle', 'create')
        ? `<button class="btn primary" onclick="startOff()">${ic('plus', 16)}Start offboarding</button>`
        : ''
    ) +
    `<div class="card" style="padding-bottom:0"><div class="head">${tabs(
      'lc',
      [
        ['onb', `Onboarding (${joiners.length})`],
        ['off', `Offboarding (${offs.length})`]
      ],
      'onb'
    )}</div></div>` +
    (t === 'onb'
      ? joiners.length
        ? joiners.map(onbCard).join('')
        : `<div class="card"><div class="empty"><span class="ei">${ic('users', 22)}</span><b>No recent joiners</b>People who joined in the last 60 days appear here with their tasks.</div></div>`
      : (offs.length
          ? offs.map(offCard).join('')
          : `<div class="card"><div class="empty"><span class="ei">${ic('check', 22)}</span><b>Nobody is leaving</b>Start offboarding to assign clearance, asset return and access removal.</div></div>`) +
        (gone.length
          ? `<div class="card"><div class="head"><h2>Recent exits</h2></div><div class="list">${gone
              .slice(0, 6)
              .map(
                x =>
                  `<div class="li"><span class="grow"><b>${esc(x.name)}</b><div class="muted small">${esc(x.reason)}</div></span><span class="muted small">${fdate(x.lwd)}</span></div>`
              )
              .join('')}</div></div>`
          : ''))
  );
}

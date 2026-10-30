/* ---------- audit log ---------- */
function auditF(k, v) {
  S.au = S.au || { q: '', act: 'All', by: 'All' };
  S.au[k] = v;
  render();
}
function auditRows() {
  const f = S.au || { q: '', act: 'All', by: 'All' },
    q = f.q.toLowerCase(),
    sysOnly = persona().role === 'sysadmin';
  return S.audit.filter(
    a =>
      (!sysOnly || a.cat === 'system') &&
      (f.act === 'All' || a.act === f.act) &&
      (f.by === 'All' || a.by === f.by) &&
      (!q ||
        (a.act + ' ' + a.rec + ' ' + a.by + ' ' + a.from + ' ' + a.to + ' ' + a.reason)
          .toLowerCase()
          .includes(q))
  );
}
function auditCSV() {
  if (!need('audit', 'export')) return;
  audit('Export', 'Audit log', { res: 'audit', to: 'CSV' });
  saveFile(
    'Audit-log-' + iso(TODAY) + '.csv',
    toCSV(
      ['ID', 'Time', 'Who', 'Acting as', 'Action', 'Record', 'From', 'To', 'Reason'],
      auditRows().map(a => [a.id, a.at, a.by, a.as, a.act, a.rec, a.from, a.to, a.reason])
    )
  );
}
function auditPage() {
  const f = S.au || (S.au = { q: '', act: 'All', by: 'All' }),
    base = persona().role === 'sysadmin' ? S.audit.filter(a => a.cat === 'system') : S.audit,
    acts = ['All', ...new Set(base.map(a => a.act))],
    bys = ['All', ...new Set(base.map(a => a.by))],
    rows = auditRows();
  return (
    ph(
      'Audit log',
      'Who changed what, and when',
      can('audit', 'export')
        ? `<button class="btn" onclick="auditCSV()">${ic('download', 16)}Export CSV</button>`
        : ''
    ) +
    `<div class="card"><div class="tools"><label class="sbox"><span class="sr">Search the audit log</span>${ic('search', 16)}<input id="au-q" placeholder="Search action, record or person" value="${esc(f.q)}" oninput="auditF('q',this.value)"></label>
   <label class="dd"><span class="sr">Action</span><select class="sel" onchange="auditF('act',this.value)">${acts.map(a => `<option ${a === f.act ? 'selected' : ''}>${esc(a)}</option>`).join('')}</select></label>
   <label class="dd"><span class="sr">Person</span><select class="sel" onchange="auditF('by',this.value)">${bys.map(a => `<option ${a === f.by ? 'selected' : ''}>${esc(a)}</option>`).join('')}</select></label></div>
   <div class="muted small" style="margin:6px 0 8px" aria-live="polite">${rows.length} of ${base.length} entries</div>
   ${rtable(
     [
       { h: 'When', keep: 1 },
       { h: 'Who' },
       { h: 'Role', xm: 1 },
       { h: 'Action' },
       { h: 'Record', xm: 1 },
       { h: 'Change' },
       { h: 'Reason', xm: 1 }
     ],
     rows.map(a => ({
       cells: [
         `<span class="nw">${ftime(a.at)}</span>`,
         esc(a.by),
         esc(a.as),
         `<b>${esc(a.act)}</b>`,
         esc(a.rec),
         a.from || a.to ? `${esc(a.from)}${a.from && a.to ? ' → ' : ''}${esc(a.to)}` : '–',
         esc(a.reason) || '–'
       ]
     })),
     {
       et: 'Nothing recorded yet',
       em: 'Changes to permissions, policies, approvals, payroll and people appear here.'
     }
   )}</div>`
  );
}

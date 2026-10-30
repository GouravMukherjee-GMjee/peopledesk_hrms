/* =============== employees =============== */
const SORTS = {
  name: 'Name A–Z',
  '-name': 'Name Z–A',
  dept: 'Department A–Z',
  '-dept': 'Department Z–A',
  '-join': 'Newest joined',
  join: 'Longest serving'
};
function sortEmps(list) {
  const k = S.sort || 'name',
    d = k[0] === '-' ? -1 : 1,
    f = k.replace('-', '');
  const key = e => (f === 'name' ? e.name : f === 'dept' ? e.dept + ' ' + e.name : e.join);
  return [...list].sort((a, b) => (key(a) < key(b) ? -d : key(a) > key(b) ? d : 0));
}
function sortEmp(k) {
  const cur = S.sort || 'name';
  S.sort = cur === k ? '-' + k : k;
  render();
}
function filteredEmps() {
  return sortEmps(
    scoped().filter(
      e =>
        (S.deptF === 'All' || e.dept === S.deptF) &&
        (S.statF === 'All' || e.status === S.statF) &&
        (!S.q || (e.name + e.title + e.id + e.dept).toLowerCase().includes(S.q.toLowerCase()))
    )
  );
}
function empList(f) {
  if (S.view === 'cards')
    return f.length
      ? `<div class="pgrid">${f.map(e => `<div class="pcard" role="button" tabindex="0" onclick="empProfile('${e.id}')" onkeydown="if(event.key==='Enter')this.click()">${av(e.name, 56)}<div><b>${esc(e.name)}</b><span class="t">${esc(e.title)}</span></div><span class="muted small">${e.dept}</span>${stChip(e.status)}</div>`).join('')}</div>`
      : `<div class="empty"><b>No employees match</b>Try a different search or filter.</div>`;
  return rtable(
    [
      { h: 'Employee', sk: 'name', keep: 1 },
      { h: 'ID', xm: 1, hid: !colOn('id') },
      { h: 'Department', sk: 'dept', xm: 1, hid: !colOn('dept') },
      { h: 'Location', xm: 1, hid: !colOn('loc') },
      { h: 'Status', hid: !colOn('status') }
    ],
    f.map(e => ({
      click: `empProfile('${e.id}')`,
      cells: [person(e), e.id, e.dept, e.loc, stChip(e.status)]
    })),
    {
      et: 'No employees match',
      em: 'Try a different search or filter.',
      sort: S.sort || 'name',
      sortFn: 'sortEmp'
    }
  );
}
function employeesPage() {
  const base = scoped();
  return (
    ph(
      S.role === 'admin' ? 'Employees' : 'My team',
      `${base.length} people across ${new Set(base.map(e => e.dept)).size} departments`,
      `<button class="btn" onclick="exportEmps()">${ic('download', 16)}Export CSV</button>` +
        (S.role === 'admin'
          ? `<button class="btn primary" onclick="addEmp()">${ic('plus', 16)}Add employee</button>`
          : '')
    ) +
    `<div class="row c4 statrow">${(() => {
      const N = base.length || 1,
        o = base.filter(e => e.type === 'Office').length,
        pl = base.filter(e => e.type === 'Plant').length,
        pr = base.filter(e => e.status === 'Probation').length,
        sh = x => Math.round((x / N) * 100) + '% of people';
      return [
        kpi({
          l: 'Total people',
          v: base.length,
          icon: 'users',
          tone: 't-brand',
          spark: [10, 10, 11, 11, 12, 12, 13, 13, 14, 14, 15, 16].map(x =>
            Math.round((x * base.length) / 16)
          ),
          p: delta('+2', true, 'up'),
          d: 'new this quarter'
        }),
        kpi({
          l: 'Office',
          v: o,
          icon: 'brief',
          tone: 't-teal',
          bar: (o / N) * 100,
          bl: sh(o),
          d: 'Gurugram HQ'
        }),
        kpi({
          l: 'Plant and shop floor',
          v: pl,
          icon: 'box',
          tone: 't-amber',
          bar: (pl / N) * 100,
          bl: sh(pl),
          d: 'Manesar Plant'
        }),
        kpi({
          l: 'On probation',
          v: pr,
          icon: 'userplus',
          tone: 't-violet',
          bar: (pr / N) * 100,
          bl: sh(pr),
          d: 'confirmation pending'
        })
      ].join('');
    })()}</div>
  <div class="card"><div class="tools"><label class="sbox">${ic('search', 16)}<input id="q" placeholder="Search name, role or ID" value="${esc(S.q)}" oninput="S.q=this.value;renderList()" aria-label="Search employees"></label>
   <select class="sel" onchange="S.deptF=this.value;render()" aria-label="Department">${['All', ...DEPTS].map(d => `<option value="${d}" ${S.deptF === d ? 'selected' : ''}>${d === 'All' ? 'All departments' : d}</option>`).join('')}</select>
   <div class="tabs" role="group" aria-label="Status">${['All', 'Active', 'Probation', 'On leave'].map(s => `<button class="tab ${S.statF === s ? 'on' : ''}" onclick="S.statF='${s}';render()">${s}</button>`).join('')}</div>
   <div class="grow"></div>
   ${viewsSel()}<span class="muted small nw" id="ecount" aria-label="${filteredEmps().length} of ${base.length} employees" title="Employees shown">${filteredEmps().length} of ${base.length}</span>${S.view === 'cards' ? '' : colsCtl()}
   <div class="tabs desk" role="group" aria-label="View"><button class="tab ${S.view === 'list' ? 'on' : ''}" onclick="S.view='list';render()" aria-label="List view">${ic('list', 16)}</button><button class="tab ${S.view === 'cards' ? 'on' : ''}" onclick="S.view='cards';render()" aria-label="Card view">${ic('grid', 16)}</button></div></div>
   <div id="elist">${empList(filteredEmps())}</div></div>`
  );
}
function renderList() {
  $('#elist').innerHTML = empList(filteredEmps());
  {
    const e = $('#ecount'),
      n = filteredEmps().length,
      N = scoped().length;
    e.textContent = `${n} of ${N}`;
    e.setAttribute('aria-label', `${n} of ${N} employees`);
  }
}
function tenure(j) {
  const m = Math.max(0, Math.round((TODAY - new Date(j + 'T00:00:00')) / 2629800000)),
    y = Math.floor(m / 12);
  return (y ? y + ' yr ' : '') + (m % 12) + ' mo';
}
function empProfile(id, t = 'overview') {
  const e = employees.find(x => x.id === id),
    row = (a, b) =>
      `<div class="li"><span class="muted grow">${a}</span><b style="text-align:right">${b}</b></div>`;
  let body = '';
  if (t === 'overview')
    body = `<div class="list">${row('Employee ID', e.id)}${row('Work type', e.type === 'Plant' ? 'Plant / shop floor' : 'Office')}${row('Location', e.loc)}${row('Reports to', reportsTo(e))}${row('Email', esc(e.email))}${row('Phone', e.phone)}</div>`;
  else if (t === 'job') {
    const b = balances(e.id);
    body = `<div class="list">${row('Department', e.dept)}${row('Designation', esc(e.title))}${row('Date of joining', fdate(e.join))}${row('Tenure', tenure(e.join))}${row('Annual CTC', canField('salary', e.id) ? inr(e.ctc) : restricted())}${row('Work calendar', calLabel(e))}${e.type === 'Plant' ? row('Current shift', SHIFTS[(S.roster[e.id] || [])[dow()]] || '—') : ''}${
      e.id === USER.employee
        ? Object.entries(b)
            .map(([k, v]) => row(POLICY[k].n, `${v.left} of ${v.t} left`))
            .join('')
        : ''
    }</div>`;
  } else if (t === 'assets') {
    const x = assetParts(e, { admin: S.role === 'admin', after: id });
    body = `${S.role === 'admin' ? `<div class="acts" style="margin-bottom:12px"><button class="btn primary sm" onclick="issueAsset(null,'${id}','${id}')">${ic('plus', 14)}Issue asset</button></div>` : ''}${x.curH}<h3 class="dsub">Issue and return history</h3>${x.pastH}`;
  } else if (!canField('ids', e.id))
    body = `<div class="empty"><span class="ei">${ic('lock', 22)}</span><b>Identity documents are restricted</b>You do not have access to identity documents. Ask your HR Admin if you need them.</div>`;
  else
    body = `<div class="list"><div class="li"><span class="ai t-brand" style="width:32px;height:32px">${ic('file', 16)}</span><div class="grow"><b>Offer letter</b></div>${stChip('Verified')}</div>${vdocRows(e, {})}</div>${S.role === 'admin' ? '<p class="muted small" style="margin-top:10px">Select a document to preview it, approve it, or ask for a new upload.</p>' : ''}`;
  overlay(
    'Employee profile',
    `<div class="person" style="margin-bottom:16px">${av(e.name, 56)}<div><b style="font-size:16px">${esc(e.name)}</b><span>${esc(e.title)} · ${e.dept}</span><div style="margin-top:6px;display:flex;gap:6px">${stChip(e.status)}${chip(e.id, 'mute', 1)}</div></div></div>
   <div class="ut" role="tablist">${[
     ['overview', 'Overview'],
     ['job', 'Employment'],
     ['assets', 'Assets'],
     ['docs', 'Documents']
   ]
     .map(
       ([v, l]) =>
         `<button class="${t === v ? 'on' : ''}" role="tab" aria-selected="${t === v}" onclick="empProfile('${id}','${v}')">${l}</button>`
     )
     .join('')}</div>${body}`,
    `${isMgr() ? `<button class="btn" onclick="S.attEmp='${id}';S.calOff=0;closeModal();go('attendance')">${ic('cal', 15)}View attendance</button>` : ''}${S.role === 'admin' ? `<button class="btn" onclick="editEmp('${id}')">Edit details</button>` : ''}<button class="btn" onclick="closeModal()">Close</button>`,
    { side: true, keepFocus: !!$('#layer .ov') }
  );
}
function editEmp(id) {
  const e = employees.find(x => x.id === id),
    opt = (arr, v) => arr.map(s => `<option ${s === v ? 'selected' : ''}>${s}</option>`).join('');
  overlay(
    'Edit employee',
    `<div class="fg">${fld('et', 'Job title', `<input id="et" value="${esc(e.title)}">`)}${fld('ed', 'Department', `<select id="ed">${opt(DEPTS, e.dept)}</select>`)}${fld('es', 'Status', `<select id="es">${opt(['Active', 'Probation', 'On leave'], e.status)}</select>`)}${fld('el', 'Location', `<select id="el">${opt(['Gurugram HQ', 'Manesar Plant'], e.loc)}</select>`)}${fld('ec', 'Annual CTC (₹)', `<input id="ec" type="number" min="0" value="${e.ctc}">`, 'full')}${fld('edob', 'Date of birth', `<input id="edob" type="date" value="${dobOf(e)}">`, 'full')}</div>`,
    `<button class="btn" onclick="empProfile('${id}')">Cancel</button><button class="btn primary" onclick="saveEditEmp('${id}')">Save changes</button>`,
    { side: true, keepFocus: true }
  );
}
function saveEditEmp(id) {
  const e = employees.find(x => x.id === id),
    t = $('#et').value.trim(),
    c = +$('#ec').value;
  if (
    ![
      chk('et', !!t, 'Enter a job title'),
      chk('ec', c > 0, 'Enter the annual CTC in rupees')
    ].every(Boolean)
  )
    return;
  e.title = t;
  e.dept = $('#ed').value;
  e.status = $('#es').value;
  e.loc = $('#el').value;
  e.ctc = c;
  {
    const nd = $('#edob').value;
    if (nd) e.dob = nd;
  }
  e.type = e.loc === 'Manesar Plant' ? 'Plant' : 'Office';
  if (e.type === 'Plant' && !S.roster[e.id]) S.roster[e.id] = ['G', 'G', 'G', 'G', 'G', 'G', 'O'];
  render();
  empProfile(id);
  toast('Changes saved');
}
function addEmp() {
  overlay(
    'Add employee',
    `<div class="fg">${fld('n', 'Full name', '<input id="n" placeholder="e.g. Anita Rao" autocomplete="off">')}${fld('t', 'Job title', '<input id="t" placeholder="e.g. Welder">')}
   ${fld('d', 'Department', `<select id="d">${DEPTS.map(d => `<option>${d}</option>`).join('')}</select>`)}${fld('ty', 'Work type', '<select id="ty"><option>Office</option><option>Plant</option></select>')}
   ${fld('j', 'Date of joining', `<input id="j" type="date" value="${iso(NOW)}">`)}${fld('c', 'Annual CTC (₹)', '<input id="c" type="number" min="0" inputmode="numeric" placeholder="480000">')}${fld('dob', 'Date of birth (optional)', '<input id="dob" type="date">', 'full')}</div>`,
    `<button class="btn" onclick="closeModal()">Cancel</button><button class="btn primary" onclick="saveEmp()">Save employee</button>`
  );
}
function saveEmp() {
  const n = $('#n').value.trim(),
    t = $('#t').value.trim(),
    c = +$('#c').value;
  const ok = [
    chk('n', !!n, "Enter the employee's full name"),
    chk('t', !!t, 'Enter a job title'),
    chk('c', c > 0, 'Enter the annual CTC in rupees')
  ].every(Boolean);
  if (!ok) return;
  const id = 'E-' + (1001 + employees.length),
    ty = $('#ty').value;
  employees.push(
    E(
      id,
      n,
      $('#d').value,
      t,
      ty,
      $('#j').value,
      c,
      'Probation',
      ty === 'Plant' ? 'Manesar Plant' : 'Gurugram HQ'
    )
  );
  if ($('#dob').value) employees[employees.length - 1].dob = $('#dob').value;
  if (ty === 'Plant') S.roster[id] = ['G', 'G', 'G', 'G', 'G', 'G', 'O'];
  closeModal();
  render();
  toast(n + ' added to employees');
}

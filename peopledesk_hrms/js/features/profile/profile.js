/* =============== my profile =============== */
const hsh2 = s => [...String(s)].reduce((a, ch) => (Math.imul(a, 31) + ch.charCodeAt(0)) >>> 0, 7);
function profOf(e) {
  const h = hsh2(e.id),
    p = e.prof || {},
    last = e.name.split(' ').slice(-1)[0];
  const AREAS = [
    'Sector 56, Gurugram, Haryana',
    'DLF Phase 3, Gurugram, Haryana',
    'Sushant Lok 1, Gurugram, Haryana',
    'Palam Vihar, Gurugram, Haryana',
    'Sector 14, Faridabad, Haryana',
    'Sector 62, Noida, Uttar Pradesh',
    'Sector 5, Manesar, Haryana'
  ];
  const REL = ['Spouse', 'Parent', 'Sibling'],
    FN = ['Anil', 'Sunita', 'Rakesh', 'Meena', 'Vijay', 'Seema', 'Mohan', 'Anita'];
  return {
    phone: e.phone,
    addr: p.addr || `${10 + (h % 180)}, ${AREAS[h % AREAS.length]}`,
    blood: p.blood || ['O+', 'A+', 'B+', 'AB+', 'O-', 'B-'][h % 6],
    ecName: p.ecName || `${FN[(h >>> 3) % FN.length]} ${last}`,
    ecRel: p.ecRel || REL[(h >>> 5) % 3],
    ecPhone: p.ecPhone || '+91 9' + String(100000000 + ((Math.imul(h, 48271) >>> 0) % 899999999))
  };
}
function profRows(e) {
  const pf = profOf(e),
    dob = dobOf(e),
    sh = SHT[baseShift(e)],
    st = sh.s[0] * 60 + sh.s[1],
    en = sh.e[0] * 60 + sh.e[1];
  let prob = '';
  if (e.status === 'Probation') {
    const d = new Date(e.join + 'T00:00:00');
    d.setMonth(d.getMonth() + 6);
    prob = fdate(iso(d));
  }
  return {
    personal: [
      ['Full name', e.name],
      ['Employee ID', e.id],
      ['Date of birth', dob ? fdate(dob) : 'Not added'],
      ['Blood group', pf.blood],
      ['Work email', e.email],
      ['Phone', pf.phone],
      ['Current address', pf.addr]
    ],
    emergency: [
      ['Name', pf.ecName],
      ['Relationship', pf.ecRel],
      ['Phone', pf.ecPhone]
    ],
    job: [
      ['Designation', e.title],
      ['Department', e.dept],
      ['Work type', e.type === 'Plant' ? 'Plant / shop floor' : 'Office'],
      ['Location', e.loc],
      ['Reports to', reportsTo(e)],
      ['Status', e.status],
      ['Date of joining', fdate(e.join)],
      ['Tenure', tenure(e.join)],
      ...(prob ? [['Probation ends', prob]] : []),
      ['Notice period', e.type === 'Plant' ? '30 days' : '60 days'],
      ['Shift', `${sh.n} · ${tm(st)}–${tm(en)}`]
    ]
  };
}
const pRow = (a, b) =>
  `<div class="li"><span class="muted grow">${a}</span><b style="text-align:right">${a === 'Status' ? stChip(b) : esc(String(b))}</b></div>`;
function reqCourses(e) {
  return S.courses
    .map((c, i) => ({ c, i }))
    .filter(
      ({ c }) =>
        ['All staff', e.type === 'Plant' ? 'Plant' : 'Office'].includes(c.req) ||
        (c.req === 'Maintenance' && e.dept === 'Maintenance') ||
        (c.req === 'Stores' && e.dept === 'Stores & Logistics')
    );
}
const trainPct = (e, c, i) => {
  if (e.id === 'E-1003') return S.mine[c.n] || 0;
  const v = Math.max(0, Math.min(100, c.done + ((hsh(e.id, 0, 0, i + 7) % 61) - 30)));
  return v >= 94 ? 100 : v;
};
function profilePage() {
  const e = me(),
    r = profRows(e),
    t = S.tab.prof || 'personal',
    s = slip(e.ctc);
  const hero = `<div class="card prof-hero"><div class="pf-top"><button class="pf-avbtn" onclick="photoDialog()" aria-label="Change profile photo" title="Change profile photo">${av(e.name, 84)}<span class="pf-cam">${ic('camera', 15)}</span></button><div class="ph-main"><h2>${esc(e.name)}</h2><p class="muted">${esc(e.title)} · ${esc(e.dept)}</p><div class="chips2" style="margin-top:8px">${stChip(e.status)}${chip(e.id, 'mute', 1)}${chip(roleName(S.role), 'info', 1)}</div></div>
    <div class="ph-facts">${[
      ['Location', e.loc],
      ['Reports to', reportsTo(e)],
      ['Joined', fdate(e.join)],
      ['Tenure', tenure(e.join)]
    ]
      .map(([a, v]) => `<div class="pfact"><span>${a}</span><b>${esc(v)}</b></div>`)
      .join('')}</div>
<div class="ph-acts"><button class="btn primary ibtn" onclick="editMyProfile()" title="Edit my details" aria-label="Edit my details">${ic('sliders', 16)}</button><button class="btn ibtn" onclick="S.attEmp='';go('attendance')" title="My attendance" aria-label="My attendance">${ic('clock', 16)}</button><button class="btn ibtn" onclick="downloadProfile()" title="Download PDF" aria-label="Download PDF">${ic('download', 16)}</button></div></div></div>`;
  let body = '';
  if (t === 'personal')
    body = `<div class="row c2"><div class="card"><div class="head"><div><h2>Personal details</h2><p class="sub">How we know and reach you</p></div><button class="link" onclick="editMyProfile()">Edit</button></div><div class="list">${r.personal.map(x => pRow(...x)).join('')}</div></div>
    <div class="card"><div class="head"><div><h2>Emergency contact</h2><p class="sub">Called only in an emergency</p></div><button class="link" onclick="editMyProfile()">Edit</button></div><div class="list">${r.emergency.map(x => pRow(...x)).join('')}</div></div></div>`;
  else if (t === 'job') {
    const y = TODAY.getFullYear(),
      m = TODAY.getMonth(),
      n = new Date(y, m + 1, 0).getDate(),
      mc = { P: 0, A: 0, L: 0, late: 0 };
    for (let d = 1; d <= n; d++) {
      const o = dayInfo(e.id, y, m, d);
      if (o.st === 'P' || o.st === 'D') mc.P++;
      else if (o.st === 'A') mc.A++;
      else if (o.st === 'L' && !o.pend) mc.L++;
      if (o.late) mc.late++;
    }
    const b = balances(e.id),
      req = reqCourses(e);
    body =
      journeyCard(e) +
      `<div class="row c2"><div class="card"><div class="head"><div><h2>Employment</h2><p class="sub">Managed by HR</p></div></div><div class="list">${r.job.map(x => pRow(...x)).join('')}</div></div>
    <div class="card"><div class="head"><div><h2>At a glance</h2><p class="sub">${MON[m]} ${y}</p></div></div>
     <div class="mstat">${[
       ['Present', mc.P, 'green'],
       ['Absent', mc.A, 'red'],
       ['Leave', mc.L, 'brand'],
       ['Late', mc.late, 'amber']
     ]
       .map(
         ([l, v, tn]) =>
           `<div class="ms"><b>${v}</b><span><i style="background:var(--${tn})"></i>${l}</span></div>`
       )
       .join('')}</div>
     <div class="csec">Leave balance</div><div class="list">${Object.entries(b)
       .map(([k, v]) => pRow(POLICY[k].n, `${v.left} of ${v.t} days left`))
       .join('')}</div>
     <div class="csec">Required training</div><div class="list">${
       req.length
         ? req
             .map(({ c, i }) => {
               const p = trainPct(e, c, i);
               return `<div class="li"><div class="grow"><b>${esc(c.n)}</b><div class="bar ${p < 50 ? 'a' : ''}" style="margin-top:6px"><i style="width:${p}%"></i></div></div>${p >= 100 ? chip('Done', 'ok', 1) : `<b class="small" style="width:40px;text-align:right">${p}%</b>`}</div>`;
             })
             .join('')
         : '<div class="muted small">No required courses.</div>'
     }</div></div></div>`;
  } else if (t === 'assets') {
    const x = assetParts(e, { self: true });
    body = `<div class="row c21"><div class="card"><div class="head"><div><h2>Assigned to me</h2><p class="sub">${x.cur.length} item${x.cur.length === 1 ? '' : 's'} · serial numbers and issue dates</p></div></div>${x.curH}</div>
    <div class="card"><div class="head"><div><h2>Issue and return history</h2><p class="sub">Earlier assets</p></div></div>${x.pastH}</div></div>`;
  } else if (t === 'prefs') body = extPrefsPage();
  else if (t === 'pay')
    body = `<div class="row c2"><div class="card"><div class="head"><div><h2>Salary</h2><p class="sub">Visible only to you and HR</p></div><button class="link" onclick="go('payroll')">Payslips</button></div><div class="list">${[
      ['Annual CTC', inr(e.ctc)],
      ['Monthly gross', inr(s.m)],
      ['Deductions', inr(s.ded)],
      ['Net pay per month', inr(s.net)]
    ]
      .map(x => pRow(...x))
      .join('')}</div>
    <h3 class="dsub">Where your gross pay goes</h3>${salaryBar(s)}<div class="acts" style="margin-top:14px"><button class="btn" onclick="downloadPayslip('${e.id}','September 2026')">${ic('download', 16)}Latest payslip (PDF)</button></div></div>
    <div class="card"><div class="head"><div><h2>Bank and statutory</h2><p class="sub">Sensitive numbers are masked</p></div></div><div class="list">${[
      ['Bank', 'HDFC Bank'],
      ['Account number', 'XXXX XXXX 4821'],
      ['PAN', 'ABCPV****K'],
      ['UAN', '1008 **** 4521'],
      ['Provident fund', `${inr(s.pf)} per month`]
    ]
      .map(x => pRow(...x))
      .join('')}</div>
    <p class="muted small" style="margin-top:12px">To change bank or tax details, raise a request and HR will verify it.</p><div class="acts" style="margin-top:10px"><button class="btn" onclick="S.tab={rq:'help'};go('requests')">Raise a request</button></div></div></div>`;
  else
    body = `<div class="row c2"><div class="card"><div class="head"><div><h2>My documents</h2><p class="sub">Issued by HR</p></div></div><div class="list">${[
      ['offer', 'Offer letter'],
      ['appoint', 'Appointment letter'],
      ['form16', 'Form 16 · FY 2025-26'],
      ['idcard', 'ID card copy']
    ]
      .map(
        ([k, n]) =>
          `<div class="li"><span class="ai t-brand" style="width:32px;height:32px">${ic('file', 16)}</span><div class="grow"><b>${n}</b></div><button class="btn sm" onclick="docView('${k}')">View</button> <button class="btn sm ico" onclick="downloadDoc('${k}')" aria-label="Download ${n}" title="Download PDF">${ic('download', 14)}</button></div>`
      )
      .join('')}</div></div>
    <div class="card"><div class="head"><div><h2>Verification</h2><p class="sub">Documents HR has checked</p></div></div><div class="list">${vdocRows(e, { self: true })}</div></div></div>`;
  return (
    ph('My profile', 'Your personal, employment and pay information') +
    hero +
    tabs(
      'prof',
      [
        ['personal', 'Personal'],
        ['job', 'Employment'],
        ['assets', 'Assets'],
        ['pay', 'Pay and bank'],
        ['docs', 'Documents'],
        ['prefs', 'Preferences']
      ],
      'personal'
    ) +
    body
  );
}
function downloadProfile() {
  const e = me(),
    r = profRows(e),
    secs = [],
    add = (t, rows) => {
      secs.push([t, '']);
      rows.forEach(([a, b]) => secs.push(['', `${a}: ${b}`]));
    };
  add('Personal details', r.personal);
  add('Emergency contact', r.emergency);
  add('Employment', r.job);
  saveFile(
    `Profile-${slug(e.name)}.pdf`,
    docPDF('Employee profile', `${e.id} · ${fdate(iso(TODAY))}`, secs)
  );
}
function editMyProfile() {
  const e = me(),
    pf = profOf(e),
    opt = (arr, v) => arr.map(s => `<option ${s === v ? 'selected' : ''}>${s}</option>`).join('');
  overlay(
    'Edit my details',
    `<p class="muted" style="margin-bottom:14px">Name, job and pay details are managed by HR. Update how we can reach you.</p><div class="fg">${fld('mp', 'Phone', `<input id="mp" type="tel" value="${esc(pf.phone)}" inputmode="tel" autocomplete="tel">`)}${fld('mb', 'Blood group', `<select id="mb">${opt(['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'], pf.blood)}</select>`)}${fld('ma', 'Current address', `<textarea id="ma" rows="2">${esc(pf.addr)}</textarea>`, 'full')}${fld('mn', 'Emergency contact name', `<input id="mn" value="${esc(pf.ecName)}">`)}${fld('mr', 'Relationship', `<select id="mr">${opt(['Spouse', 'Parent', 'Sibling', 'Friend', 'Other'], pf.ecRel)}</select>`)}${fld('mq', 'Emergency contact phone', `<input id="mq" type="tel" value="${esc(pf.ecPhone)}">`, 'full')}</div>`,
    `<button class="btn" onclick="closeModal()">Cancel</button><button class="btn primary" onclick="saveMyProfile()">Save changes</button>`,
    { keepFocus: !!$('#layer .ov') }
  );
}
function saveMyProfile() {
  const e = me(),
    ph0 = $('#mp').value.trim(),
    ec = $('#mq').value.trim(),
    dg = s => s.replace(/\D/g, '').length;
  if (
    ![
      chk('mp', dg(ph0) >= 10 && dg(ph0) <= 13, 'Enter a valid phone number'),
      chk('ma', !!$('#ma').value.trim(), 'Enter your address'),
      chk('mn', !!$('#mn').value.trim(), 'Enter a contact name'),
      chk('mq', dg(ec) >= 10 && dg(ec) <= 13, 'Enter a valid phone number')
    ].every(Boolean)
  )
    return;
  e.phone = ph0;
  e.prof = {
    addr: $('#ma').value.trim(),
    blood: $('#mb').value,
    ecName: $('#mn').value.trim(),
    ecRel: $('#mr').value,
    ecPhone: ec
  };
  closeModal();
  render();
  toast('Your details were updated');
}

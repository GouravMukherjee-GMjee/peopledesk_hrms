/* =============== career journey and document verification =============== */
const VDOCS = [
  ['aadhaar', 'Government ID (Aadhaar)'],
  ['pan', 'PAN card'],
  ['bank', 'Bank account proof'],
  ['nda', 'Signed NDA']
];
const DOCURL = {}; // previews of files uploaded in this session (kept in memory only)
const dayAdd = (d, n) => {
  const x = new Date(d + 'T00:00:00');
  x.setDate(x.getDate() + n);
  return iso(x);
};
const fmtSize = n =>
  n >= 1048576 ? (n / 1048576).toFixed(1) + ' MB' : Math.max(1, Math.round(n / 1024)) + ' KB';
function vdocsOf(e) {
  const v = e.vdocs || {};
  return VDOCS.map(([k, n]) => {
    const s = v[k] || {},
      h = hsh2(e.id + k),
      init = !s.st && k !== 'bank';
    return {
      k,
      n,
      st: s.st || (k === 'bank' ? 'Pending' : 'Verified'),
      file: s.file || {
        name: `${k}-${e.id.toLowerCase()}.${k === 'bank' || k === 'nda' ? 'pdf' : 'jpg'}`,
        size: `${120 + (h % 380)} KB`,
        up: dayAdd(e.join, 2)
      },
      by: s.by || (init ? 'HR, at onboarding' : ''),
      on: s.on || (init ? dayAdd(e.join, 3) : ''),
      note: s.note || ''
    };
  });
}
function setDoc(empId, k, patch) {
  const e = aEmp(empId),
    cur = vdocsOf(e).find(d => d.k === k);
  e.vdocs = e.vdocs || {};
  e.vdocs[k] = { st: cur.st, file: cur.file, by: cur.by, on: cur.on, note: cur.note, ...patch };
}
function vdocRows(e, o = {}) {
  return vdocsOf(e)
    .map(
      d =>
        `<div class="li" style="flex-wrap:wrap"><span class="ai t-${d.st === 'Verified' ? 'teal' : d.st === 'Pending' ? 'brand' : 'red'}" style="width:32px;height:32px">${ic(d.st === 'Verified' ? 'check' : 'file', 16)}</span><div class="grow" style="min-width:150px"><button class="cname" style="width:auto" onclick="docPreview('${e.id}','${d.k}')"><span class="cn"><b>${d.n}</b><span>${esc(d.file.name)} · ${d.file.size}</span></span></button>${d.note && d.st !== 'Verified' ? `<div class="muted small">${esc(d.note)}</div>` : ''}</div>${stChip(d.st)}${o.self && d.st !== 'Verified' ? `<button class="btn sm ${d.st === 'Re-upload requested' ? 'primary' : ''}" onclick="uploadDoc('${e.id}','${d.k}')">${d.st === 'Re-upload requested' ? 'Upload again' : 'Replace'}</button>` : ''}</div>`
    )
    .join('');
}
function docMock(k, e) {
  const hd = { aadhaar: '#E4572E', pan: '#2B5FB4', bank: '#1F7A5C', nda: '#6B4FBB' }[k],
    title = {
      aadhaar: 'Government of India',
      pan: 'Income Tax Department',
      bank: 'Bank statement',
      nda: 'Non-disclosure agreement'
    }[k];
  const photo =
    k === 'aadhaar' || k === 'pan'
      ? `<rect x="22" y="70" width="58" height="72" rx="6" fill="#D7DEEA"/><circle cx="51" cy="94" r="14" fill="#B4BFD2"/><rect x="31" y="114" width="40" height="22" rx="10" fill="#B4BFD2"/>`
      : '';
  const x0 = photo ? 96 : 24,
    lines = [0, 1, 2, 3, 4]
      .map(
        i =>
          `<rect x="${x0}" y="${72 + i * 18}" width="${(i % 2 ? 150 : 190) - (photo ? 0 : 0)}" height="8" rx="4" fill="#E2E7F0"/>`
      )
      .join('');
  return `<svg class="dmock" viewBox="0 0 320 210" role="img" aria-label="Sample preview of ${esc(VDOCS.find(d => d[0] === k)[1])} for ${esc(e.name)}"><rect x="1" y="1" width="318" height="208" rx="12" fill="#fff" stroke="#D5DBE6"/><path d="M1 13a12 12 0 0 1 12-12h294a12 12 0 0 1 12 12v30H1z" fill="${hd}"/><text x="22" y="30" font-size="14" font-weight="700" fill="#fff" font-family="Public Sans,system-ui,sans-serif">${title}</text>${photo}${lines}${k === 'nda' ? `<path d="M180 176c10-14 18 8 28-6s16 6 26-4" stroke="#6B4FBB" stroke-width="2" fill="none"/>` : ''}<text x="160" y="140" font-size="34" font-weight="800" fill="#0B1B3F" opacity=".07" text-anchor="middle" transform="rotate(-18 160 120)" font-family="Public Sans,system-ui,sans-serif">SAMPLE</text></svg>`;
}
function docPreview(empId, k) {
  const e = aEmp(empId),
    d = vdocsOf(e).find(x => x.k === k),
    adm = S.role === 'admin',
    self = empId === me().id,
    url = DOCURL[empId + '|' + k];
  const act = adm
    ? d.st === 'Verified'
      ? `<button class="btn" onclick="docReview('${empId}','${k}','Pending')">Mark as pending</button>`
      : `<button class="btn bad" onclick="docAskReupload('${empId}','${k}')">Request re-upload</button><button class="btn primary" onclick="docReview('${empId}','${k}','Verified')">Approve document</button>`
    : self && d.st !== 'Verified'
      ? `<button class="btn primary" onclick="uploadDoc('${empId}','${k}')">${d.st === 'Re-upload requested' ? 'Upload a new file' : 'Replace file'}</button>`
      : `<button class="btn" onclick="closeModal()">Close</button>`;
  const row = (a, b) =>
    `<div class="li"><span class="muted grow">${a}</span><b style="text-align:right">${b}</b></div>`;
  overlay(
    d.n,
    `<div class="dsplit"><div class="dprev">${url ? `<img class="dimg" src="${url}" alt="Uploaded ${esc(d.n)}">` : docMock(k, e)}<p class="muted small" style="margin-top:8px;text-align:center">${url ? 'File uploaded in this session' : 'Sample preview. Files are not stored in this demo.'}</p></div>
   <div class="dmeta"><div class="person" style="margin-bottom:10px">${av(e.name, 34)}<div><b>${esc(e.name)}</b><span>${esc(e.title)}</span></div></div><div style="margin-bottom:6px">${stChip(d.st)}</div>
   <div class="list">${row('File', esc(d.file.name))}${row('Size', d.file.size)}${row('Uploaded', fdate(d.file.up))}${row('Reviewed by', d.by ? esc(d.by) : 'Not reviewed yet')}${row('Reviewed on', d.on ? fdate(d.on) : '—')}</div>${d.note ? `<div class="chip ${d.st === 'Verified' ? 'info' : 'warn'} nb" style="margin-top:10px;padding:7px 12px;white-space:normal;border-radius:12px;line-height:1.4;align-items:flex-start">${esc(d.note)}</div>` : ''}</div></div>`,
    act,
    { wide: true }
  );
}
function docAfter(empId) {
  closeModal();
  render();
  if (S.page === 'employees' && S.role === 'admin') empProfile(empId, 'docs');
}
function docReview(empId, k, st) {
  const e = aEmp(empId),
    d = vdocsOf(e).find(x => x.k === k),
    prev = e.vdocs ? JSON.stringify(e.vdocs[k] || null) : null;
  setDoc(empId, k, {
    st,
    by: st === 'Pending' ? '' : me().name,
    on: st === 'Pending' ? '' : iso(TODAY),
    note: ''
  });
  docAfter(empId);
  toast(`${d.n} ${st === 'Verified' ? 'approved' : 'marked as pending'}`, () => {
    if (prev) e.vdocs[k] = JSON.parse(prev);
    else delete e.vdocs[k];
    render();
    if (S.page === 'employees' && S.role === 'admin') empProfile(empId, 'docs');
  });
}
function docAskReupload(empId, k) {
  const e = aEmp(empId),
    d = vdocsOf(e).find(x => x.k === k);
  overlay(
    'Request re-upload',
    `<p class="muted" style="margin-bottom:14px">${esc(e.name.split(' ')[0])} will see this on their home screen and can upload a new file.</p><div class="fg">${fld('ru-r', 'Reason', `<select id="ru-r"><option value="">Choose a reason</option><option>The image is blurry</option><option>Wrong document</option><option>Document has expired</option><option>Name does not match our records</option><option>Pages are missing</option></select>`, 'full')}${fld('ru-n', 'Note (optional)', '<input id="ru-n" placeholder="Anything that will help them fix it" autocomplete="off">', 'full')}</div>`,
    `<button class="btn" onclick="docPreview('${empId}','${k}')">Back</button><button class="btn primary" onclick="docSendReupload('${empId}','${k}')">Send request</button>`
  );
}
function docSendReupload(empId, k) {
  const e = aEmp(empId),
    d = vdocsOf(e).find(x => x.k === k),
    r = $('#ru-r').value;
  if (!chk('ru-r', !!r, 'Choose a reason so they know what to fix')) return;
  const n = $('#ru-n').value.trim(),
    prev = e.vdocs && e.vdocs[k] ? JSON.stringify(e.vdocs[k]) : null;
  setDoc(empId, k, {
    st: 'Re-upload requested',
    by: me().name,
    on: iso(TODAY),
    note: r + (n ? '. ' + n : '')
  });
  docAfter(empId);
  toast(`Re-upload requested for ${d.n}`, () => {
    if (prev) e.vdocs[k] = JSON.parse(prev);
    else delete e.vdocs[k];
    render();
    if (S.page === 'employees' && S.role === 'admin') empProfile(empId, 'docs');
  });
}
function uploadDoc(empId, k) {
  const inp = document.createElement('input');
  inp.type = 'file';
  inp.accept = 'image/*,application/pdf';
  inp.id = 'docfile';
  inp.hidden = true;
  document.body.appendChild(inp);
  inp.onchange = () => {
    const f = inp.files[0];
    inp.remove();
    if (!f) return;
    if (/^image\//.test(f.type) && f.size <= 3 * 1048576)
      DOCURL[empId + '|' + k] = URL.createObjectURL(f);
    else delete DOCURL[empId + '|' + k];
    setDoc(empId, k, {
      st: 'Pending',
      file: { name: f.name, size: fmtSize(f.size), up: iso(TODAY) },
      by: '',
      on: '',
      note: ''
    });
    closeModal();
    render();
    toast('Uploaded. HR will review it soon');
  };
  inp.click();
}
function journey(e) {
  const j = e.join,
    t0 = iso(TODAY),
    y = TODAY.getFullYear(),
    conf = new Date(j + 'T00:00:00');
  conf.setMonth(conf.getMonth() + 6);
  const confD = iso(conf),
    docs = vdocsOf(e),
    vc = docs.filter(d => d.st === 'Verified').length,
    apr = `${y}-04-01`,
    nxt = `${y}-10-15`,
    elig = j < apr;
  const steps = [
    {
      t: 'Offer accepted',
      d: dayAdd(j, -14),
      done: dayAdd(j, -14) <= t0,
      s: 'Offer letter signed'
    },
    { t: 'Joined GMux', d: j, done: j <= t0, s: `${e.title} · ${e.dept}` },
    {
      t: 'Documents verified',
      d: dayAdd(j, 3),
      done: vc === docs.length && dayAdd(j, 3) <= t0,
      s: vc === docs.length ? 'All documents verified' : `${vc} of ${docs.length} verified`
    },
    {
      t: e.status === 'Probation' || confD > t0 ? 'Confirmation' : 'Confirmed',
      d: confD,
      done: e.status !== 'Probation' && confD <= t0,
      s: e.status === 'Probation' ? 'Probation ends and HR confirms' : 'Probation completed'
    },
    {
      t: 'Annual appraisal',
      d: apr,
      done: elig && apr <= t0,
      skip: !elig,
      s: elig ? `Completed for ${y}` : 'Not eligible until next year'
    },
    { t: 'Next review cycle', d: nxt, done: nxt <= t0, s: 'Q3 appraisal cycle opens' }
  ];
  let now = false;
  steps.forEach(s => {
    s.state = s.skip ? 'skip' : s.done ? 'done' : !now ? ((now = true), 'now') : 'next';
  });
  return steps;
}
function journeyCard(e) {
  const st = journey(e);
  return `<div class="card" id="journey"><div class="head"><div><h2>Career journey</h2><p class="sub">Key milestones from offer to review</p></div></div><ol class="jr">${st.map(s => `<li class="${s.state}"${s.state === 'now' ? ' aria-current="step"' : ''}><span class="jd" aria-hidden="true">${s.state === 'done' ? ic('check', 12) : ''}</span><div><b>${s.t}</b><span>${fdate(s.d)}</span><small>${esc(s.s)}</small></div></li>`).join('')}</ol></div>`;
}

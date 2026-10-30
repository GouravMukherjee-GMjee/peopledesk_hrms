/* ---------- leave on the real calendar ---------- */
function balances(id) {
  const o = {};
  for (const k in POLICY) {
    const used = leaveUsed(id, k);
    o[k] = { t: POLICY[k].t, left: Math.max(0, +(POLICY[k].t - used).toFixed(1)), used };
  }
  return o;
}
function lvDraft() {
  S.drafts.leave = {
    t: $('#lt').value,
    f: $('#lf').value,
    to: $('#lto').value,
    r: $('#lr').value,
    h: $('#lh').value
  };
  saveGov();
}
function lvCheck() {
  const e = me(),
    k = $('#lt').value,
    f = $('#lf').value,
    t = $('#lto').value,
    h = $('#lh').value,
    half = f && f === t && h !== 'full' ? h : '';
  if (!f || !t || t < f)
    return { err: ['End date must be on or after the start date'], warn: [], c: null };
  const c = leaveCalc(e, f, t, !!half),
    b = balances(e.id)[k],
    err = [],
    warn = [],
    w = W();
  if (!c.chargeable) err.push('Those dates are all non-working days on your calendar');
  if (c.chargeable > b.left)
    err.push(
      `Not enough balance: you have ${b.left} days of ${POLICY[k].n.toLowerCase()} and this needs ${c.chargeable}`
    );
  if (
    S.leaves.some(
      l => l.emp === e.id && ['Pending', 'Approved'].includes(l.status) && l.from <= t && f <= l.to
    )
  )
    err.push('You already have leave on some of these dates');
  const need = k === 'SL' && c.chargeable > w.certDays;
  if (need && !S.lvAtt)
    err.push(`A medical certificate is required for sick leave over ${w.certDays} days`);
  if (k === 'EL' && c.chargeable && f < addWork(iso(TODAY), w.noticeEL))
    warn.push(
      `Earned leave needs ${w.noticeEL} working days' notice. HR may ask you to change the dates.`
    );
  if (f < iso(daysAgo(7))) warn.push('Requests more than 7 days old also need HR approval.');
  const ov = teamOverlap(e.id, f, t, 0);
  if (ov.length)
    warn.push(
      `${ov.length} teammate${ov.length > 1 ? 's are' : ' is'} also off: ${overlapText(ov)}`
    );
  return {
    err,
    warn,
    c,
    b,
    need,
    route: routeFor('leave', { emp: e.id, days: c.chargeable, from: f }),
    k,
    half
  };
}
function applyLeave(f0) {
  if (typeof f0 !== 'string') f0 = '';
  S.lvAtt = null;
  const d = S.drafts.leave,
    use = d && !f0;
  overlay(
    'Apply for leave',
    `<div class="note" style="margin-bottom:12px">${ic('cal', 14)} Your calendar: <b>${calLabel(me())}</b>. Weekly offs and company holidays are not charged.</div>${use ? `<p class="muted small" style="margin:-2px 0 10px">Resuming your saved draft.</p>` : ''}
   <div class="fg">${fld(
     'lt',
     'Leave type',
     `<select id="lt" onchange="lvPreview()">${Object.entries(POLICY)
       .map(
         ([k, v]) => `<option value="${k}" ${use && d.t === k ? 'selected' : ''}>${v.n}</option>`
       )
       .join('')}</select>`,
     'full'
   )}
   ${fld('lf', 'From', `<input id="lf" type="date" value="${use ? d.f : f0 || iso(NOW)}" oninput="lvPreview()">`)}${fld('lto', 'To', `<input id="lto" type="date" value="${use ? d.to : f0 || iso(NOW)}" oninput="lvPreview()">`)}
   ${fld('lh', 'Day type', `<select id="lh" onchange="lvPreview()"><option value="full">Full day</option><option value="first" ${use && d.h === 'first' ? 'selected' : ''}>First half only</option><option value="second" ${use && d.h === 'second' ? 'selected' : ''}>Second half only</option></select>`, 'full')}
   <div class="full" id="lvp" style="margin:-4px 0 12px"></div>
   ${fld('lr', 'Reason', `<textarea id="lr" rows="3" placeholder="A short note for your approver" oninput="lvDraft()">${use ? esc(d.r) : ''}</textarea>`, 'full')}
   <div class="field full" id="lv-attw"></div></div>`,
    `<button class="btn" onclick="dismissModal()">Cancel</button><button class="btn primary" onclick="saveLeave()">Submit request</button>`
  );
  lvPreview();
}
function lvPreview() {
  const r = lvCheck();
  if (!r.c) {
    $('#lvp').innerHTML =
      r.err.length && $('#lf').value && $('#lto').value
        ? `<div class="chip bad nb" style="padding:6px 12px">${r.err[0]}</div>`
        : '';
    $('#lv-attw').innerHTML = '';
    return;
  }
  const c = r.c,
    after = +(r.b.left - c.chargeable).toFixed(1),
    ex = c.excluded;
  $('#lvp').innerHTML =
    `<div class="calc"><div class="cr"><span>Chargeable</span><b>${fdays(c.chargeable)}</b></div>${ex.length ? `<div class="cr"><span>Not charged</span><span>${ex.map(x => `${fshort(x.date)} ${x.name}`).join(', ')}</span></div>` : ''}<div class="cr"><span>Balance</span><span>${r.b.left} → <b>${after}</b> days of ${POLICY[r.k].n.toLowerCase()}</span></div><div class="cr"><span>Goes to</span><span>${r.route.map(x => esc(x.n) + ' (' + x.role + ')').join(' then ')}</span></div></div>
   ${r.err.map(m => `<div class="chip bad nb msg">${ic('alert', 14)}&nbsp;${esc(m)}</div>`).join('')}${r.warn.map(m => `<div class="chip warn nb msg" ${/also off/.test(m) ? 'id="lv-overlap"' : ''}>${ic('alert', 14)}&nbsp;${esc(m)}</div>`).join('')}`;
  $('#lv-attw').innerHTML =
    `<label for="lv-file">Attachment${r.need ? ' (required)' : ' (optional)'}</label>${S.lvAtt ? `<div class="attach"><b>${esc(S.lvAtt.name)}</b><span class="muted small">${Math.max(1, Math.round(S.lvAtt.size / 1024))} KB</span><button type="button" class="btn sm" onclick="S.lvAtt=null;lvPreview()">Remove</button></div>` : `<input id="lv-file" type="file" accept=".pdf,.jpg,.jpeg,.png" onchange="lvFile(this)"><div class="muted small" id="lv-prog" role="status"></div>`}<div class="err" id="lv-file-e" role="alert"></div>`;
}
function lvFile(inp) {
  const f = inp.files[0];
  if (!f) return;
  if (f.size > 5 * 1024 * 1024) {
    $('#lv-file-e').textContent = 'Keep the file under 5 MB';
    inp.value = '';
    return;
  }
  const rd = new FileReader(),
    p = $('#lv-prog');
  rd.onprogress = e => {
    if (e.lengthComputable)
      p.textContent = 'Uploading ' + Math.round((e.loaded / e.total) * 100) + '%';
  };
  rd.onload = () => {
    S.lvAtt = { name: f.name, size: f.size };
    lvPreview();
  };
  rd.onerror = () => {
    p.textContent = 'Upload failed. Try again.';
  };
  rd.readAsArrayBuffer(f);
}
function saveLeave() {
  const r = lvCheck(),
    t = $('#lr').value.trim();
  const ok = [
    chk('lr', !!t, 'Add a short reason'),
    chk('lto', !r.err.length, r.err[0] || '')
  ].every(Boolean);
  if (!ok || !r.c) return;
  const u = me(),
    k = r.k,
    f = $('#lf').value,
    to = $('#lto').value,
    l = {
      id: Date.now(),
      ref: nextRef('leave'),
      emp: u.id,
      type: k,
      from: f,
      to,
      days: r.c.chargeable,
      half: r.half || undefined,
      reason: t,
      status: 'Pending',
      att: S.lvAtt || null,
      calc: 1
    };
  l.route = r.route;
  l.stage = 0;
  l.sub = iso(TODAY);
  l.due = addWork(l.sub, 2);
  l.hist = [
    { at: new Date().toISOString(), by: u.name, as: 'Requester', act: 'Submitted', note: t }
  ];
  S.leaves.unshift(l);
  S.drafts.leave = null;
  S.lvAtt = null;
  audit('Leave submitted', `${u.name} · ${l.ref}`, {
    res: 'leave',
    to: `${fdays(l.days)}, ${fdate(f)}${f !== to ? ' to ' + fdate(to) : ''}`
  });
  S.tab.lv = 'mine';
  persist();
  closeModal();
  render();
  toast(
    `Leave request ${l.ref} submitted. Waiting for ${nextOwner('leave', l)}, due ${fshort(l.due)}`,
    null,
    { label: 'View request', fn: () => reqDetail('leave', l.id) }
  );
}
guardFns([
  ['decide', 'leave', 'approve', 'decide leave requests'],
  ['decideClaim', 'requests', 'approve', 'decide claims'],
  ['decideReg', 'attendance', 'approve', 'decide corrections']
]);
function decide(id, s) {
  decideReq('leave', id, s);
}
function decideClaim(id, s) {
  decideReq('claim', id, s);
}
function decideReg(id, s) {
  decideReq('reg', id, s);
}
seedReq();
{
  const _rn = render;
  render = function () {
    _rn();
    applyPerms(document.getElementById('view'));
  };
}
{
  const _ov = overlay;
  overlay = function () {
    _ov.apply(this, arguments);
    applyPerms(document.getElementById('layer'));
  };
}

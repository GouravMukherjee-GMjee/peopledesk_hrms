/* =====================================================================
   Settings · Overtime and comp-off: the rules behind Hours and overtime
   Every default is shown as an editable assumption. Changes are held as a draft until Save,
   and each saved change is written to the audit log. Rules can be overridden per role or department.
   ===================================================================== */
const otpCore = o => {
  const c = JSON.parse(JSON.stringify(o));
  delete c.meta;
  return c;
};
const otpDraft = () => S.otpDraft || (S.otpDraft = otpCore(S.otp));
const otpDirty = () =>
  !!S.otpDraft && JSON.stringify(S.otpDraft) !== JSON.stringify(otpCore(S.otp));
function otpGet(o, path) {
  return path.split('.').reduce((a, k) => (a == null ? a : a[k]), o);
}
function otpSet(path, v) {
  const d = otpDraft(),
    ks = path.split('.'),
    last = ks.pop(),
    t = ks.reduce((a, k) => a[k], d);
  t[last] =
    typeof t[last] === 'number' || /^-?\d*\.?\d+$/.test(String(v)) ? (v === '' ? '' : +v) : v;
  otpPaintBar();
}
function otpPaintBar() {
  const s = document.getElementById('opx-save'),
    c = document.getElementById('opx-cancel'),
    st = document.getElementById('opx-st');
  if (!s) return;
  const dirty = otpDirty();
  s.disabled = c.disabled = !dirty;
  st.innerHTML = dirty
    ? chip('Unsaved changes', 'warn', 1)
    : `<span class="muted small">${lastBy(S.otp.meta)}</span>`;
}
function otpRepaint() {
  const b = document.getElementById('opx');
  if (b) b.innerHTML = otpInner();
  else render();
}
function otpCancel() {
  S.otpDraft = null;
  otpRepaint();
  toast('Changes discarded');
}
function otpMode(m) {
  otpDraft().mode = m;
  otpPaintBar();
  document
    .querySelectorAll('.opx-mode .xa-rc')
    .forEach(l => l.classList.toggle('on', l.querySelector('input').value === m));
}
function otpApprove(k, on) {
  otpDraft().approve[k] = on ? 1 : 0;
  otpPaintBar();
}
function otpAddOv() {
  const t = $('#ov-t').value,
    k = $('#ov-k').value,
    d = otpDraft();
  if (!k) return;
  const x = {
    type: t,
    key: k,
    mode: $('#ov-m').value,
    weekday: $('#ov-w').value,
    holiday: $('#ov-h').value,
    off: $('#ov-o').value
  };
  d.over = (d.over || []).filter(o => !(o.type === x.type && o.key === x.key)).concat(x);
  otpRepaint();
}
function otpDelOv(i) {
  otpDraft().over.splice(i, 1);
  otpRepaint();
}
function otpOvKeys() {
  const t = $('#ov-t').value;
  $('#ov-k').innerHTML = (
    t === 'role'
      ? ROLE_DEF.map(r => [r.k, r.n])
      : [...new Set(employees.map(e => e.dept))].sort().map(x => [x, x])
  )
    .map(([v, n]) => `<option value="${esc(v)}">${esc(n)}</option>`)
    .join('');
}
const OTP_L = {
  breakMin: 'Daily break (minutes)',
  minMin: 'Minimum overtime (minutes)',
  round: 'Rounding step (minutes)',
  dailyCap: 'Daily overtime cap (hours)',
  weeklyCap: 'Weekly overtime cap (hours)',
  'rate.weekday': 'Weekday rate',
  'rate.holiday': 'Holiday rate',
  'rate.off': 'Weekly-off rate',
  'approve.weekday': 'Weekday approval',
  'approve.holiday': 'Holiday approval',
  'approve.off': 'Weekly-off approval',
  'comp.half': 'Half day (hours)',
  'comp.full': 'Full day (hours)',
  'comp.expiry': 'Comp-off expiry (days)',
  mode: 'Comp-off or pay',
  cutoff: 'Payroll cutoff day',
  payDays: 'Pay base: days per month',
  payHours: 'Pay base: hours per day'
};
function otpChanges(a, b) {
  const out = [];
  Object.keys(OTP_L).forEach(k => {
    const x = otpGet(a, k),
      y = otpGet(b, k);
    if (x !== y)
      out.push([
        OTP_L[k],
        k.startsWith('approve') ? (x ? 'Required' : 'Not required') : x,
        k.startsWith('approve') ? (y ? 'Required' : 'Not required') : y
      ]);
  });
  if (JSON.stringify(a.over || []) !== JSON.stringify(b.over || []))
    out.push([
      'Role and department rules',
      (a.over || []).length + ' rules',
      (b.over || []).length + ' rules'
    ]);
  return out;
}
function otpSave() {
  if (!need('policy', 'edit', 'change overtime settings')) return;
  const d = otpDraft(),
    n = (id, ok, m) => chk(id, ok, m),
    rng = (id, v, lo, hi, m) =>
      n(id, v !== '' && !isNaN(v) && v >= lo && v <= hi, m || `Enter a number from ${lo} to ${hi}`);
  const ok = [
    rng('op-bm', d.breakMin, 0, 120),
    rng('op-mm', d.minMin, 0, 120),
    rng('op-dc', d.dailyCap, 0.5, 12),
    rng('op-wc', d.weeklyCap, d.dailyCap || 0.5, 60, 'Must be at least the daily cap, up to 60'),
    rng('op-rw', d['rate'].weekday, 1, 5),
    rng('op-rh', d['rate'].holiday, 1, 5),
    rng('op-ro', d['rate'].off, 1, 5),
    rng('op-ch', d.comp.half, 1, 12),
    n(
      'op-cf',
      d.comp.full > d.comp.half && d.comp.full <= 12,
      'Full day must be more than a half day, up to 12'
    ),
    rng('op-ce', d.comp.expiry, 7, 365),
    rng('op-co', d.cutoff, 1, 28),
    rng('op-pd', d.payDays, 20, 31),
    rng('op-ph', d.payHours, 6, 12)
  ];
  if (!ok.every(Boolean)) {
    toast('Check the highlighted fields', null, 'err');
    return;
  }
  if (!otpDirty()) return;
  const ch = otpChanges(otpCore(S.otp), d);
  S.otp = Object.assign(JSON.parse(JSON.stringify(d)), {
    meta: { by: me().name, at: new Date().toISOString() }
  });
  S.otpDraft = null;
  audit('Policy changed', 'Overtime and comp-off', {
    res: 'settings',
    from: ch.map(c => `${c[0]}: ${c[1]}`).join('; '),
    to: ch.map(c => `${c[0]}: ${c[2]}`).join('; ')
  });
  commit();
  extPublish();
  render();
  toast(`Saved. ${ch.length} change${ch.length === 1 ? '' : 's'} applied`);
}

function otpInner() {
  const d = otpDraft(),
    can_ = can('policy', 'edit'),
    dis = can_ ? '' : 'disabled',
    num = (id, path, label, hint, step) =>
      fld(
        id,
        label,
        `<input id="${id}" type="number" inputmode="decimal" step="${step || 1}" value="${otpGet(d, path)}" ${dis} oninput="otpSet('${path}',this.value)">${hint ? `<div class="muted small">${hint}</div>` : ''}`
      );
  const rateRow = (k, name, idr) =>
    `<div class="opx-rr"><div class="grow"><b>${name}</b></div>${fld(idr, 'Rate', `<input id="${idr}" type="number" step="0.25" value="${d.rate[k]}" ${dis} oninput="otpSet('rate.${k}',this.value)">`, 'sm')}<label class="opx-ap"><span class="sw"><input type="checkbox" ${d.approve[k] ? 'checked' : ''} ${dis} aria-label="Approval required for ${name.toLowerCase()}" onchange="otpApprove('${k}',this.checked)"><span></span></span>Manager approval</label></div>`;
  const modes = [
    ['choose', 'Employee chooses', 'Each person picks comp-off or pay for every approved entry.'],
    ['comp', 'Comp-off only', 'Extra time can only be taken as time off.'],
    ['pay', 'Pay only', 'Extra time can only be paid.']
  ];
  const ov = (d.over || [])
    .map(
      (o, i) =>
        `<tr><td data-label="Applies to">${o.type === 'dept' ? 'Department' : 'Role'}: <b>${esc(o.type === 'dept' ? o.key : roleName(o.key))}</b></td><td data-label="Comp-off or pay">${o.mode ? { choose: 'Employee chooses', comp: 'Comp-off only', pay: 'Pay only' }[o.mode] : '<span class="muted">Default</span>'}</td><td data-label="Rates" class="num">${['weekday', 'holiday', 'off'].map(k => (o[k] !== '' && o[k] != null ? o[k] + '×' : '<span class="muted">default</span>')).join(' · ')}</td><td data-act data-label=""><button class="btn sm" ${dis} onclick="otpDelOv(${i})">Remove</button></td></tr>`
    )
    .join('');
  return `<div class="svh"><span class="muted small">${can_ ? 'These rules decide how overtime and comp-off are worked out for everyone. Defaults are shown as editable assumptions.' : 'You can view these rules. Ask HR or an Admin to change them.'}</span>${svBadge()}</div>
  <div class="opx">
   <section class="opx-s"><h3>Overtime rules</h3><div class="opx-note">${ic('help', 16)}<span><b>Overtime starts after the shift ends.</b> The shift is the person’s own (for example 9h for the general shift). Hours before that, and breaks, never count.</span></div>
    <div class="fg">${num('op-bm', 'breakMin', 'Daily break (minutes)', 'Taken out of every working day')}${num('op-mm', 'minMin', 'Minimum overtime (minutes)', 'Less than this is not recorded')}
    ${fld('op-rd', 'Rounding step (minutes)', `<select id="op-rd" ${dis} onchange="otpSet('round',this.value)">${[1, 5, 10, 15, 30].map(v => `<option ${d.round === v ? 'selected' : ''}>${v}</option>`).join('')}</select><div class="muted small">Rounded down, for example 47 minutes becomes 45</div>`)}
    ${num('op-dc', 'dailyCap', 'Daily overtime cap (hours)', 'Weekday overtime counted per day', 0.5)}${num('op-wc', 'weeklyCap', 'Weekly overtime cap (hours)', 'Weekday overtime counted per week', 0.5)}</div></section>
   <section class="opx-s"><h3>Rates and approval</h3><p class="muted small">Holiday and weekly-off work is recorded apart from weekday overtime.</p>${rateRow('weekday', 'Weekday overtime', 'op-rw')}${rateRow('holiday', 'Holiday work', 'op-rh')}${rateRow('off', 'Weekly-off work', 'op-ro')}</section>
   <section class="opx-s"><h3>Comp-off</h3><div class="fg">${num('op-ch', 'comp.half', 'Half day (hours)', 'Hours that earn a half day')}${num('op-cf', 'comp.full', 'Full day (hours)', 'Hours that earn a full day')}${num('op-ce', 'comp.expiry', 'Expires after (days)', 'Counted from the day it was earned')}</div>
    <fieldset class="xa-fs opx-mode" ${dis}><legend>Comp-off or pay</legend><div class="xa-radios" role="radiogroup" aria-label="Comp-off or pay">${modes.map(([k, n, t]) => `<label class="xa-rc ${d.mode === k ? 'on' : ''}"><input type="radio" name="otp-m" value="${k}" ${d.mode === k ? 'checked' : ''} onchange="otpMode('${k}')"><span class="xa-rt"><b>${n}</b><span>${t}</span></span></label>`).join('')}</div></fieldset></section>
   <section class="opx-s"><h3>Payroll</h3><div class="fg">${num('op-co', 'cutoff', 'Payroll cutoff (day of month)', 'Entries after this day move to next month')}${num('op-pd', 'payDays', 'Pay base: days per month', 'Hourly pay = basic ÷ days ÷ hours')}${num('op-ph', 'payHours', 'Pay base: hours per day')}</div></section>
   <section class="opx-s"><h3>By role or department</h3><p class="muted small">Give a role or department its own comp-off or pay mode and rates. Anything left as default follows the rules above.</p>
    ${ov ? `<div class="tw"><table class="rt keep"><thead><tr><th>Applies to</th><th>Comp-off or pay</th><th class="num">Weekday · holiday · off</th><th><span class="sr">Actions</span></th></tr></thead><tbody>${ov}</tbody></table></div>` : '<p class="muted small">No overrides. Everyone follows the rules above.</p>'}
    <div class="opx-ov"><div class="field"><label for="ov-t">Applies to</label><select id="ov-t" ${dis} onchange="otpOvKeys()"><option value="role">Role</option><option value="dept">Department</option></select></div><div class="field"><label for="ov-k">Which</label><select id="ov-k" ${dis}>${ROLE_DEF.map(r => `<option value="${r.k}">${r.n}</option>`).join('')}</select></div>
    <div class="field"><label for="ov-m">Comp-off or pay</label><select id="ov-m" ${dis}><option value="">Default</option><option value="choose">Employee chooses</option><option value="comp">Comp-off only</option><option value="pay">Pay only</option></select></div>
    <div class="field"><label for="ov-w">Weekday</label><input id="ov-w" type="number" step="0.25" placeholder="Default" ${dis}></div><div class="field"><label for="ov-h">Holiday</label><input id="ov-h" type="number" step="0.25" placeholder="Default" ${dis}></div><div class="field"><label for="ov-o">Weekly off</label><input id="ov-o" type="number" step="0.25" placeholder="Default" ${dis}></div>
    <button class="btn" ${dis} onclick="otpAddOv()">Add rule</button></div></section>
  </div>
  <div class="xa-bar" role="region" aria-label="Save changes"><span class="xa-bs" id="opx-st" role="status" aria-live="polite">${otpDirty() ? chip('Unsaved changes', 'warn', 1) : `<span class="muted small">${lastBy(S.otp.meta)}</span>`}</span><span class="grow"></span><button class="btn" id="opx-cancel" ${otpDirty() ? '' : 'disabled'} onclick="otpCancel()">Cancel</button><button class="btn primary" id="opx-save" ${otpDirty() && can_ ? '' : 'disabled'} onclick="otpSave()">Save changes</button></div>`;
}
function otPolTab() {
  return `<div id="opx">${otpInner()}</div>`;
}

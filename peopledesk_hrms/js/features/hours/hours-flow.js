/* =====================================================================
   Hours and overtime: asking for approval, the 3-step "use my extra time" flow, and manager decisions
   Step 1 pick entries · Step 2 comp-off or extra pay · Step 3 review and submit · then a success screen
   Errors shown in context: not enough hours, past the payroll cutoff, policy locked.
   ===================================================================== */

/* ---------- ask for overtime approval ---------- */
function otAsk(keys) {
  const d = hxMe(),
    list = d.ents.filter(x => keys.includes(x.key) && x.st === 'auto');
  if (!list.length) {
    toast('Those entries are already requested', null, 'err');
    return;
  }
  S.oa = { keys: list.map(x => x.key) };
  const tot = list.reduce((a, x) => a + x.min, 0),
    rows = list
      .map(
        x =>
          `<li><div><b>${fddy(x.dt)}</b><span>${OT_CAT[x.cat]} · ${x.rate}×</span></div><div class="r"><b>${fhm(x.min)}</b><span>${inr(otPay(x))} estimate · ${payMonth(x.iso, x.P).label} payroll</span></div></li>`
      )
      .join('');
  overlay(
    'Request overtime approval',
    `<ul class="hx-ls">${rows}</ul><div class="hx-sum"><span>Total</span><b>${fhm(tot)}</b></div>
     <div class="field" style="margin-top:14px"><label for="oa-r">What was the work? (optional)</label><textarea id="oa-r" rows="3" placeholder="For example, month-end closing or a machine breakdown"></textarea></div>
     <p class="muted small">${esc(reportsTo(d.e))} reviews this. It is added to your extra time balance once approved. Estimates are confirmed by payroll.</p>`,
    `<button class="btn" onclick="closeModal()">Cancel</button><button class="btn primary" onclick="otAskSend()">Send request</button>`
  );
}
function otAskSend() {
  const keys = (S.oa && S.oa.keys) || [],
    why = ($('#oa-r') && $('#oa-r').value.trim()) || '',
    d = hxMe(),
    list = d.ents.filter(x => keys.includes(x.key) && x.st === 'auto');
  list.forEach(en => {
    const q = mkReq('OT', d.e.id, [en.key], {
      min: en.min,
      cat: en.cat,
      reason: why || 'Work completed after shift'
    });
    entMark(en.key, { st: 'pending', req: q.id });
  });
  closeModal();
  persist();
  S.tab.hr = 'req';
  render();
  toast(`${list.length} request${list.length === 1 ? '' : 's'} sent to ${reportsTo(d.e)}`);
}
function otCancelAsk(id) {
  confirmBox(
    'Cancel this request?',
    'Your manager will no longer see it. The hours go back to your list and you can ask again.',
    'Cancel request',
    () => {
      if (otCancel(id)) {
        persist();
        render();
        toast('Request cancelled');
      }
    },
    true
  );
}

/* ---------- use my extra time ---------- */
const OU_STEPS = ['Choose hours', 'Comp-off or pay', 'Review'];
function otUse(keys, mode) {
  const d = hxMe(),
    avail = d.ents.filter(x => entStatus(x) === 'available');
  S.ou = {
    step: keys && mode ? 2 : 1,
    keys: keys ? keys.filter(k => avail.some(x => x.key === k)) : [],
    mode: mode || '',
    dates: [],
    ack: false,
    cal: 0,
    err: '',
    done: null
  };
  if (!avail.length) {
    toast('You have no approved extra time to use yet', null, 'err');
    return;
  }
  if (keys && mode && !S.ou.keys.length) S.ou.step = 1;
  otUsePaint();
}
const ouSel = () =>
  hxMe().ents.filter(x => S.ou.keys.includes(x.key) && entStatus(x) === 'available');
function ouStepper(cur) {
  return `<ol class="xs-steps" aria-label="Progress">${OU_STEPS.map((n, i) => {
    const k = i + 1,
      st = k < cur ? 'done' : k === cur ? 'now' : '';
    return `<li class="${st}" ${k === cur ? 'aria-current="step"' : ''}><span class="xs-n">${k < cur ? ic('check', 16) : k}</span><span class="xs-l">${n}<span class="sr"> (step ${k} of 3${k < cur ? ', done' : ''})</span></span></li>`;
  }).join('')}</ol>`;
}
function ouCalendar(e, need) {
  const u = S.ou,
    b = new Date(TODAY.getFullYear(), TODAY.getMonth() + u.cal, 1),
    first = (b.getDay() + 6) % 7,
    n = new Date(b.getFullYear(), b.getMonth() + 1, 0).getDate(),
    cells = [];
  for (let i = 0; i < first; i++) cells.push('<i></i>');
  for (let d = 1; d <= n; d++) {
    const dt = new Date(b.getFullYear(), b.getMonth(), d),
      k = iso(dt),
      sel = u.dates.includes(k),
      kind = dayKind(e, dt),
      ok = dt > TODAY && kind.work && !leaveOn(e.id, dt) && dt <= addD(TODAY, 90),
      full = !sel && u.dates.length >= need;
    cells.push(
      `<button type="button" class="${sel ? 'sel' : ''}" aria-pressed="${sel}" ${!ok || full ? 'disabled' : ''} aria-label="${esc(fddy(dt))}${ok ? '' : ', not available: ' + (dt <= TODAY ? 'past' : kind.work ? 'on leave or too far ahead' : kind.why)}" onclick="ouDate('${k}')">${d}</button>`
    );
  }
  return `<div class="hx-cal"><div class="hx-calh"><button type="button" class="icon-btn" aria-label="Previous month" ${u.cal <= 0 ? 'disabled' : ''} onclick="S.ou.cal--;otUsePaint()">${ic('arrow', 16).replace('<svg', '<svg style="transform:rotate(180deg)"')}</button><b aria-live="polite">${monLbl(b)}</b><button type="button" class="icon-btn" aria-label="Next month" ${u.cal >= 3 ? 'disabled' : ''} onclick="S.ou.cal++;otUsePaint()">${ic('arrow', 16)}</button></div><div class="hx-calw" aria-hidden="true">${['M', 'T', 'W', 'T', 'F', 'S', 'S'].map(x => `<span>${x}</span>`).join('')}</div><div class="hx-calg">${cells.join('')}</div></div>`;
}
function ouDate(k) {
  const u = S.ou;
  u.dates = u.dates.includes(k) ? u.dates.filter(x => x !== k) : [...u.dates, k].sort();
  otUsePaint();
}
function ouPick(k, on) {
  const u = S.ou;
  u.keys = u.keys.filter(x => x !== k);
  if (on) u.keys.push(k);
  u.dates = [];
  otUsePaint();
}
function ouAll(on) {
  S.ou.keys = on
    ? hxMe()
        .ents.filter(x => entStatus(x) === 'available')
        .map(x => x.key)
    : [];
  S.ou.dates = [];
  otUsePaint();
}
/* open the calendar on the first month that still has a day to pick (late in a month, that is next month) */
function ouFirstMonth() {
  const e = me();
  for (let i = 1; i <= 90; i++) {
    const dt = addD(TODAY, i);
    if (dayKind(e, dt).work && !leaveOn(e.id, dt))
      return (dt.getFullYear() - TODAY.getFullYear()) * 12 + dt.getMonth() - TODAY.getMonth();
  }
  return 0;
}
function ouMode(m) {
  if (m === 'comp') S.ou.cal = ouFirstMonth();
  S.ou.mode = m;
  S.ou.dates = [];
  S.ou.ack = false;
  otUsePaint();
}
function ouStep(n) {
  S.ou.step = n;
  S.ou.err = '';
  otUsePaint();
}
function otUsePaint() {
  const u = S.ou;
  if (!u) return;
  const d = hxMe(),
    P = otPolFor(d.e),
    avail = d.ents.filter(x => entStatus(x) === 'available').reverse(),
    sel = ouSel(),
    tot = sel.reduce((a, x) => a + x.min, 0),
    cd = compDays(tot, P),
    need = Math.ceil(cd.days),
    appr = reportsTo(d.e);
  let title = 'Use my extra time',
    body = '',
    foot = '';
  if (u.done) {
    const r = u.done;
    title = 'Request sent';
    body = `<div class="xs-done"><span class="xs-ok">${ic('check', 30)}</span><h3>Request submitted</h3><p>Your request <b>${r.id}</b> is with ${esc(appr)}.</p>
      <dl class="hx-kv c"><div><dt>Hours</dt><dd><b>${fhm(r.min)}</b></dd></div><div><dt>${r.type === 'CO' ? 'Comp-off' : 'Extra pay'}</dt><dd>${r.type === 'CO' ? fdy(r.days) + (r.dates.length ? ' on ' + r.dates.map(x => fdd(isoD(x))).join(', ') : '') : inr(r.amount)}</dd></div><div><dt>Status</dt><dd>${chip('Pending', 'warn')}</dd></div>${r.type === 'PY' ? `<div><dt>Payroll month</dt><dd>${esc(r.month)}</dd></div>` : ''}</dl></div>`;
    foot = `<button class="btn" onclick="closeModal();S.ou=null">Done</button><button class="btn primary" onclick="closeModal();S.ou=null;S.tab.hr='req';go('hours')">Track request</button>`;
  } else if (u.step === 1) {
    title = 'Choose hours';
    body = `${ouStepper(1)}<div class="hx-sec"><h3>Approved extra time</h3><label class="hx-ck"><input type="checkbox" ${sel.length === avail.length && avail.length ? 'checked' : ''} onchange="ouAll(this.checked)">Select all</label></div>
      <ul class="hx-pk">${avail
        .map(en => {
          const left = Math.round((isoD(en.expiry) - TODAY) / 864e5);
          return `<li><label class="hx-pick ${u.keys.includes(en.key) ? 'on' : ''}"><input type="checkbox" ${u.keys.includes(en.key) ? 'checked' : ''} onchange="ouPick('${en.key}',this.checked)"><span class="g"><b>${fddy(en.dt)}</b><span>${OT_CAT[en.cat]} · ${en.rate}× · expires in ${left} day${left === 1 ? '' : 's'}</span></span><b class="h">${fhm(en.min)}</b></label></li>`;
        })
        .join('')}</ul>
      <div class="hx-run" role="status" aria-live="polite"><span>Selected</span><b>${fhm(tot)}</b><span class="muted">${tot ? (cd.days ? '≈ ' + fdy(cd.days) + ' of comp-off' : 'Under a half day of comp-off') : 'Pick at least one entry'}</span></div>`;
    foot = `<button class="btn" onclick="closeModal();S.ou=null">Cancel</button><button class="btn primary" ${sel.length ? '' : 'disabled'} onclick="ouStep(2)">Continue</button>`;
  } else if (u.step === 2) {
    title = 'Comp-off or extra pay';
    const lockC = P.mode === 'pay',
      lockP = P.mode === 'comp',
      short = tot < P.comp.half * 60,
      noC = lockC || short,
      pay = sel.reduce((a, x) => a + otPay(x), 0),
      months = [...new Set(sel.map(x => payMonth(x.iso, x.P).label))],
      cut = pastCutoff(P),
      nm = payMonth(iso(TODAY), P).label;
    const cardC = `<label class="hx-opt ${u.mode === 'comp' ? 'on' : ''} ${noC ? 'dis' : ''}"><input type="radio" name="ou-m" ${u.mode === 'comp' ? 'checked' : ''} ${noC ? 'disabled' : ''} onchange="ouMode('comp')"><span class="oh"><b>Comp-off</b><span>Take time off instead</span></span>
      <span class="hv">${noC ? ic('lock', 18) : fdy(cd.days)}</span>
      ${lockC ? `<span class="ob err" role="alert">${ic('lock', 16)}Your policy allows extra pay only.</span>` : short ? `<span class="ob err" role="alert">${ic('alert', 16)}Not enough hours. Comp-off needs at least ${P.comp.half}h and you chose ${fhm(tot)}.</span>` : `<span class="ob">${P.comp.half}h is a half day, ${P.comp.full}h a full day.${cd.left ? ` ${fhm(cd.left)} is left over and not converted.` : ''} After this, ${fhm(Math.max(0, d.bal.avail - tot))} of extra time is left.</span>`}</label>`;
    const cardP = `<label class="hx-opt ${u.mode === 'pay' ? 'on' : ''} ${lockP ? 'dis' : ''}"><input type="radio" name="ou-m" ${u.mode === 'pay' ? 'checked' : ''} ${lockP ? 'disabled' : ''} onchange="ouMode('pay')"><span class="oh"><b>Extra pay</b><span>Paid with your salary</span></span>
      <span class="hv">${lockP ? ic('lock', 18) : inr(pay)}</span>
      ${lockP ? `<span class="ob err" role="alert">${ic('lock', 16)}Your policy allows comp-off only.</span>` : `<span class="ob">Estimate, confirmed by payroll. Paid in the <b>${months.join(' and ')}</b> payroll.</span>`}</label>`;
    body = `${ouStepper(2)}<p class="muted small" style="margin:0 0 10px">${fhm(tot)} selected from ${sel.length} entr${sel.length === 1 ? 'y' : 'ies'}.${P.mode !== 'choose' ? ' Your organisation has set this to ' + (P.mode === 'comp' ? 'comp-off only' : 'extra pay only') + '.' : ''}</p>
      <div class="hx-opts" role="radiogroup" aria-label="How to use this time">${cardC}${cardP}</div>
      ${u.mode === 'comp' && !noC ? `<div class="hx-sec"><h3>Pick ${need === 1 && cd.days === 0.5 ? 'the day for your half day' : need + ' day' + (need === 1 ? '' : 's')}</h3><span class="muted small" aria-live="polite">${u.dates.length} of ${need} chosen</span></div>${ouCalendar(d.e, need)}` : ''}
      ${u.mode === 'pay' && !lockP && cut ? `<div class="hx-ban err" role="alert">${ic('alert', 18)}<div class="grow"><b>The payroll cutoff has passed</b><div class="small">The cutoff for ${MON[TODAY.getMonth()]} was the ${P.cutoff}th. This will be paid in the ${nm} payroll instead.</div><label class="hx-ck" style="margin-top:8px"><input type="checkbox" ${u.ack ? 'checked' : ''} onchange="S.ou.ack=this.checked;otUsePaint()">I understand it will be paid in ${nm}</label></div></div>` : ''}`;
    const ready =
      (u.mode === 'comp' && !noC && u.dates.length === need) ||
      (u.mode === 'pay' && !lockP && (!cut || u.ack));
    foot = `<button class="btn" onclick="ouStep(1)">Back</button><button class="btn primary" ${ready ? '' : 'disabled'} onclick="ouStep(3)">Continue</button>`;
  } else {
    title = 'Review and submit';
    const comp = u.mode === 'comp',
      pay = sel.reduce((a, x) => a + otPay(x), 0),
      months = [...new Set(sel.map(x => payMonth(x.iso, x.P).label))];
    body = `${ouStepper(3)}${u.err ? `<div class="hx-ban err" role="alert">${ic('alert', 18)}<div class="grow">${esc(u.err)}</div></div>` : ''}
      <dl class="hx-kv c"><div><dt>Hours</dt><dd><b>${fhm(tot)}</b> <small>${sel.length} entr${sel.length === 1 ? 'y' : 'ies'}</small></dd></div>
      <div><dt>You chose</dt><dd>${comp ? 'Comp-off' : 'Extra pay'}</dd></div>
      ${comp ? `<div><dt>Comp-off</dt><dd><b>${fdy(cd.days)}</b> on ${u.dates.map(x => fdd(isoD(x))).join(', ')}</dd></div><div><dt>Extra time left</dt><dd>${fhm(Math.max(0, d.bal.avail - tot))}</dd></div>` : `<div><dt>Estimated pay</dt><dd><b>${inr(pay)}</b> <small>Estimate, confirmed by payroll</small></dd></div><div><dt>Payroll month</dt><dd>${months.join(' and ')}</dd></div>`}
      <div><dt>Approver</dt><dd>${esc(appr)}</dd></div><div><dt>Status after submit</dt><dd>${chip('Pending', 'warn')}</dd></div></dl>
      <div class="hx-note">${ic('help', 16)}<span>${comp ? `Comp-off dates are held for you once ${esc(appr)} approves. Unused comp-off expires ${P.comp.expiry} days after the day it was earned.` : `Pay is added to the payroll month shown. Requests made after day ${P.cutoff} of the month go to the next month.`} You can cancel while it is pending.</span></div>`;
    foot = `<button class="btn" onclick="ouStep(2)">Back</button><button class="btn primary" onclick="ouSubmit()">Submit request</button>`;
  }
  overlay(title, `<div id="ou">${body}</div>`, foot, { keepFocus: true, wide: true });
  const f = $('#ou .xs-steps') || $('#ou');
  if (f) {
    f.setAttribute('tabindex', '-1');
    f.focus({ preventScroll: true });
  }
}
function ouSubmit() {
  const u = S.ou,
    d = hxMe(),
    sel = ouSel(),
    P = otPolFor(d.e);
  if (!sel.length || sel.length !== u.keys.length) {
    u.err = 'Some of these hours are no longer available. Go back and choose again.';
    otUsePaint();
    return;
  }
  const tot = sel.reduce((a, x) => a + x.min, 0),
    comp = u.mode === 'comp',
    cd = compDays(tot, P),
    months = [...new Set(sel.map(x => payMonth(x.iso, x.P).label))];
  if (comp && (tot < P.comp.half * 60 || u.dates.length !== Math.ceil(cd.days))) {
    u.err = 'Not enough hours for the days you picked. Go back and check.';
    otUsePaint();
    return;
  }
  const r = mkReq(comp ? 'CO' : 'PY', d.e.id, u.keys, {
    min: tot,
    cat: [...new Set(sel.map(x => x.cat))].length === 1 ? sel[0].cat : 'mixed',
    days: comp ? cd.days : 0,
    dates: comp ? u.dates.slice() : [],
    amount: comp ? 0 : Math.round(sel.reduce((a, x) => a + otPay(x), 0)),
    month: comp ? '' : months.join(' and '),
    reason: ''
  });
  sel.forEach(en => entMark(en.key, { use: comp ? 'comp' : 'pay', useSt: 'pending', ureq: r.id }));
  u.done = r;
  persist();
  otUsePaint();
  if (S.page === 'hours') {
    const q = $('#view');
    if (q) render();
  }
}

/* ---------- manager decisions ---------- */
function otApprove(id) {
  if (!need('hours', 'approve', 'approve overtime')) return;
  const r = otReq(id);
  if (!r || !otDecide(id, true, '')) return;
  audit('Overtime approved', `${emp(r.emp).name} · ${r.id}`, { res: 'hours', to: 'Approved' });
  persist();
  render();
  toast(`${r.id} approved`);
}
function otRejectAsk(id) {
  S.orj = id;
  const r = otReq(id),
    e = emp(r.emp);
  overlay(
    'Reject request',
    `<p class="muted">${esc(e.name)} · ${OT_PREFIX[r.type]} · ${fhm(r.min)}</p><div class="field">${''}<label for="rj-c">Why? ${esc(e.name.split(' ')[0])} will see this</label><textarea id="rj-c" rows="3" placeholder="For example, please add the task reference"></textarea><div class="err" id="rj-c-e" role="alert"></div></div>`,
    `<button class="btn" onclick="closeModal()">Cancel</button><button class="btn bad" onclick="otRejectDo()">Reject</button>`
  );
}
function otRejectDo() {
  const c = ($('#rj-c').value || '').trim();
  if (!chk('rj-c', c.length >= 3, 'Add a short reason')) return;
  const r = otReq(S.orj);
  if (!r || !need('hours', 'approve', 'reject overtime')) return;
  otDecide(r.id, false, c);
  audit('Overtime rejected', `${emp(r.emp).name} · ${r.id}`, {
    res: 'hours',
    to: 'Rejected',
    reason: c
  });
  closeModal();
  persist();
  render();
  toast(`${r.id} rejected`);
}
function otBulkApprove() {
  if (!need('hours', 'approve', 'approve overtime')) return;
  const ids = S.hx.sel.slice();
  let n = 0;
  ids.forEach(id => {
    if (otDecide(id, true, '')) {
      n++;
      audit('Overtime approved', id, { res: 'hours', to: 'Approved' });
    }
  });
  S.hx.sel = [];
  persist();
  render();
  toast(`${n} request${n === 1 ? '' : 's'} approved`);
}

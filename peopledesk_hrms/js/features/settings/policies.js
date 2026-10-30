/* ---------- work policies and statutory settings: versioned, effective-dated, used by the calculations ---------- */
const WL = {
  wOff: 'Office workweek',
  wPl: 'Plant workweek',
  hours: 'Standard hours per day',
  grace: 'Late-mark grace',
  ot: 'Overtime rate',
  fy: 'Financial year starts',
  probation: 'Probation period',
  noticeEL: 'Earned-leave notice',
  certDays: 'Medical certificate after',
  carryEL: 'Earned-leave carry forward',
  varPct: 'Payroll variance alert'
};
function workFlat(w) {
  return {
    wOff: w.week.Office,
    wPl: w.week.Plant,
    hours: w.hours,
    grace: w.grace,
    ot: w.ot,
    fy: w.fy,
    probation: w.probation,
    noticeEL: w.noticeEL,
    certDays: w.certDays,
    carryEL: w.carryEL,
    varPct: w.varPct
  };
}
function workVals() {
  const g = id => {
      const e = document.getElementById(id);
      return e ? e.value : '';
    },
    n = id => +g(id);
  return {
    week: { Office: n('w-off'), Plant: n('w-pl') },
    hours: n('w-h'),
    grace: n('w-g'),
    ot: g('w-ot'),
    fy: g('w-fy'),
    probation: n('w-pr'),
    noticeEL: n('w-ne'),
    certDays: n('w-cd'),
    carryEL: n('w-ce'),
    varPct: n('w-vp')
  };
}
function polDirty(k) {
  const b = document.getElementById('polsave');
  if (!b) return;
  const cur = k === 'work' ? W() : ST(),
    now = k === 'work' ? workVals() : statVals();
  b.disabled =
    JSON.stringify(cur) === JSON.stringify(now) &&
    !(document.getElementById('pol-eff') && document.getElementById('pol-eff').value > iso(TODAY));
}
const diffTxt = (a, b, L) =>
  Object.keys(b)
    .filter(k => a[k] !== b[k])
    .map(k => `${L[k] || k}: ${a[k]} → ${b[k]}`);
function histHTML(k, L, flatFn) {
  const h = S.polHist[k].slice(),
    t = iso(TODAY);
  return `<h2 style="margin:24px 0 4px">Version history</h2><div class="list">${h
    .map((v, i) => ({ v, i }))
    .reverse()
    .map(({ v, i }) => {
      const prev = i ? flatFn(h[i - 1].val) : null,
        d = prev ? diffTxt(prev, flatFn(v.val), L) : ['Starting values'],
        cur = v.val === getPol(k);
      return `<div class="li" style="align-items:flex-start"><div class="grow"><b>${v.eff === '2000-01-01' ? 'Original defaults' : 'From ' + fdate(v.eff)}</b> ${cur ? chip('In force', 'ok', 1) : v.eff > t ? chip('Scheduled', 'info', 1) : ''}<div class="muted small">${v.at ? esc(v.by) + ' · ' + ftime(v.at) + (v.why ? ' · ' + esc(v.why) : '') : 'System'}</div><div class="small" style="margin-top:2px">${d.length ? d.map(esc).join('<br>') : 'No value changed'}</div></div></div>`;
    })
    .join('')}</div>`;
}
function flatStat(s) {
  return {
    pfOn: s.pf.on,
    pfRate: s.pf.rate,
    pfCeil: s.pf.ceil,
    esiOn: s.esi.on,
    esiEmp: s.esi.emp,
    esiEr: s.esi.er,
    esiCeil: s.esi.ceil,
    ptOn: s.pt.on,
    ptAmt: s.pt.amt,
    tdsOn: s.tds.on,
    tdsThresh: s.tds.thresh,
    tdsRate: s.tds.rate,
    gratuity: s.gratuity,
    bonus: s.bonus
  };
}
const SL = {
  pfOn: 'PF on',
  pfRate: 'PF rate %',
  pfCeil: 'PF wage ceiling',
  esiOn: 'ESI on',
  esiEmp: 'ESI employee %',
  esiEr: 'ESI employer %',
  esiCeil: 'ESI wage ceiling',
  ptOn: 'Professional tax on',
  ptAmt: 'Professional tax per month',
  tdsOn: 'TDS on',
  tdsThresh: 'TDS exemption',
  tdsRate: 'TDS rate %',
  gratuity: 'Gratuity years',
  bonus: 'Bonus on'
};
function workTab() {
  const w = W(),
    m = polMeta('work'),
    sel = (id, opts, v) =>
      `<select id="${id}" onchange="polDirty('work')">${opts.map(([k, n]) => `<option value="${k}" ${String(v) === String(k) ? 'selected' : ''}>${n}</option>`).join('')}</select>`,
    num = (id, v, mn, mx) =>
      `<input id="${id}" type="number" min="${mn}" max="${mx}" value="${v}" oninput="polDirty('work')">`,
    dm = ' ' + demoChip();
  return `<div class="svh"><span class="muted small">${lastBy(m)}</span>${svBadge()}</div><p class="muted small" style="margin:6px 0 12px">Workweek, grace time, notice, certificate rules, probation and the variance alert are read by Leave, Attendance, Payroll and Joiners. Items marked Demo only are stored but not used yet.</p>
  <div class="fg" id="polf">${fld(
    'w-off',
    'Office workweek',
    sel(
      'w-off',
      [
        [5, 'Mon to Fri (5 days)'],
        [6, 'Mon to Sat (6 days)']
      ],
      w.week.Office
    )
  )}${fld(
    'w-pl',
    'Plant workweek',
    sel(
      'w-pl',
      [
        [5, 'Mon to Fri (5 days)'],
        [6, 'Mon to Sat (6 days)']
      ],
      w.week.Plant
    )
  )}
  ${fld('w-h', 'Standard hours per day' + dm, num('w-h', w.hours, 4, 12))}${fld('w-g', 'Late-mark grace (minutes)', num('w-g', w.grace, 0, 60))}
  ${fld(
    'w-ot',
    'Overtime rate' + dm,
    sel(
      'w-ot',
      [
        ['2x', '2x ordinary rate (Factories Act)'],
        ['1.5x', '1.5x ordinary rate']
      ],
      w.ot
    )
  )}${fld(
    'w-fy',
    'Financial year starts' + dm,
    sel(
      'w-fy',
      [
        ['April', 'April'],
        ['January', 'January']
      ],
      w.fy
    )
  )}
  ${fld('w-pr', 'Probation period (months)', num('w-pr', w.probation, 1, 12))}${fld('w-ne', 'Earned-leave notice (working days)', num('w-ne', w.noticeEL, 0, 30))}
  ${fld('w-cd', 'Sick leave needs a medical certificate after (days)', num('w-cd', w.certDays, 1, 7))}${fld('w-ce', 'Earned-leave carry forward cap (days)', num('w-ce', w.carryEL, 0, 90))}
  ${fld('w-vp', 'Payroll variance alert (% change from last month)', num('w-vp', w.varPct, 1, 50))}${fld('pol-eff', 'Effective from', `<input id="pol-eff" type="date" value="${iso(TODAY)}" oninput="polDirty('work')">`)}</div>
  <div class="acts" style="margin-top:6px"><button class="btn primary" id="polsave" disabled onclick="workSave()">Save changes</button></div>${histHTML('work', WL, workFlat)}`;
}
function workSave() {
  if (!need('policy', 'edit', 'change policies')) return;
  const v = workVals(),
    eff = document.getElementById('pol-eff').value || iso(TODAY);
  const ok = [
    chk('w-g', v.grace >= 0 && v.grace <= 60, 'Between 0 and 60 minutes'),
    chk('w-h', v.hours >= 4 && v.hours <= 12, 'Between 4 and 12 hours'),
    chk('w-pr', v.probation >= 1 && v.probation <= 12, 'Between 1 and 12 months'),
    chk('w-ne', v.noticeEL >= 0 && v.noticeEL <= 30, 'Between 0 and 30 days'),
    chk('w-cd', v.certDays >= 1 && v.certDays <= 7, 'Between 1 and 7 days'),
    chk('w-ce', v.carryEL >= 0 && v.carryEL <= 90, 'Between 0 and 90 days'),
    chk('w-vp', v.varPct >= 1 && v.varPct <= 50, 'Between 1 and 50 percent'),
    chk('pol-eff', !!eff, 'Choose an effective date')
  ].every(Boolean);
  if (!ok) return;
  S.save = { st: 'saving', at: '' };
  const okS = polSave('work', v, eff, '');
  commit();
  render();
  toast(eff > iso(TODAY) ? 'Scheduled from ' + fdate(eff) : 'Policies saved and in force');
}
function statVals() {
  const g = id => {
      const e = document.getElementById(id);
      return e ? e.value : '';
    },
    n = id => +g(id),
    c = id => (document.getElementById(id) && document.getElementById(id).checked ? 1 : 0);
  return {
    pf: { on: c('s-pf'), rate: n('s-pfr'), ceil: n('s-pfc') },
    esi: { on: c('s-esi'), emp: n('s-ese'), er: n('s-esr'), ceil: n('s-esc') },
    pt: { on: c('s-pt'), amt: n('s-pta') },
    tds: { on: c('s-tds'), thresh: n('s-tdt'), rate: n('s-tdr') },
    gratuity: n('s-gr'),
    bonus: c('s-bo')
  };
}
function statPrev() {
  const t = statVals(),
    cur = slip(1408920),
    mk = slipWith(1408920, t);
  const d = mk.net - cur.net;
  return `<div class="note" id="stprev"><b>Effect on a sample payslip (Riya Verma, ₹14,08,920 a year):</b> net pay ${inr(cur.net)} → <b>${inr(mk.net)}</b>${Math.abs(d) >= 1 ? ` (${d > 0 ? '+' : '−'}${inr(Math.abs(d))} a month)` : ' (no change)'}</div>`;
}
function statChange() {
  const p = document.getElementById('stprev');
  if (p) p.outerHTML = statPrev();
  polDirty('stat');
}
function statTab() {
  const s = ST(),
    m = polMeta('stat'),
    row = (on, id, title, sub, body) =>
      `<div class="stc"><div class="stc-h"><div class="grow"><b>${title}</b><div class="muted small">${sub}</div></div>${on !== null ? `<label class="sw"><input type="checkbox" id="${id}" ${on ? 'checked' : ''} onchange="statChange()" aria-label="${title} on"><span></span></label>` : ''}</div><div class="fg stc-b">${body}</div></div>`,
    num = (id, v, l, step) =>
      fld(
        id,
        l,
        `<input id="${id}" type="number" step="${step || 1}" min="0" value="${v}" oninput="statChange()">`
      );
  return `<div class="svh"><span class="muted small">${lastBy(m)}</span>${svBadge()}</div><p class="muted small" style="margin:6px 0 12px">Payslips and the payroll run use these values. Rates shown are examples; confirm current slabs with your compliance advisor.</p>
  ${row(s.pf.on, 's-pf', 'Provident fund (EPF)', 'Employee contribution on basic pay, up to the wage ceiling', num('s-pfr', s.pf.rate, 'Employee rate (%)') + num('s-pfc', s.pf.ceil, 'Monthly wage ceiling (₹)'))}
  ${row(s.esi.on, 's-esi', 'ESI', 'Applies when monthly gross pay is within the ceiling', num('s-ese', s.esi.emp, 'Employee rate (%)', 0.01) + num('s-esr', s.esi.er, 'Employer rate (%)', 0.01) + num('s-esc', s.esi.ceil, 'Monthly wage ceiling (₹)'))}
  ${row(s.pt.on, 's-pt', 'Professional tax', 'A flat monthly amount in this demo; real slabs differ by state', num('s-pta', s.pt.amt, 'Amount per month (₹)'))}
  ${row(s.tds.on, 's-tds', 'TDS on salary', 'Simplified: a flat rate on annual pay above the exemption', num('s-tdt', s.tds.thresh, 'Annual exemption (₹)') + num('s-tdr', s.tds.rate, 'Effective rate (%)'))}
  ${row(null, 's-g', 'Gratuity', 'Payable after the qualifying service period', num('s-gr', s.gratuity, 'Years of service'))}
  ${row(s.bonus, 's-bo', 'Bonus', 'Payment of Bonus Act, where applicable', '')}
  ${statPrev()}<div class="fg" style="margin-top:10px">${fld('pol-eff', 'Effective from', `<input id="pol-eff" type="date" value="${iso(TODAY)}" oninput="polDirty('stat')">`)}</div>
  <div class="acts"><button class="btn primary" id="polsave" disabled onclick="statSave()">Save changes</button></div>${histHTML('stat', SL, x => flatStat(x))}`;
}
function statSave() {
  if (!need('statutory', 'edit', 'change statutory settings')) return;
  const v = statVals(),
    eff = document.getElementById('pol-eff').value || iso(TODAY);
  const ok = [
    chk('s-pfr', v.pf.rate >= 0 && v.pf.rate <= 30, 'Between 0 and 30'),
    chk('s-pfc', v.pf.ceil > 0, 'Enter an amount'),
    chk('s-esc', v.esi.ceil > 0, 'Enter an amount'),
    chk('s-tdr', v.tds.rate >= 0 && v.tds.rate <= 40, 'Between 0 and 40'),
    chk('s-pta', v.pt.amt >= 0 && v.pt.amt <= 2500, 'Up to ₹2,500 a month'),
    chk('pol-eff', !!eff, 'Choose an effective date')
  ].every(Boolean);
  if (!ok) return;
  polSave('stat', v, eff, '');
  commit();
  render();
  toast(
    eff > iso(TODAY)
      ? 'Scheduled from ' + fdate(eff)
      : 'Statutory settings saved. Payslips now use them'
  );
}
function secSet(k, v, label) {
  if (!need('security', 'edit', 'change security settings')) return;
  const old = k.includes('.') ? S.sec.twoFA[k.split('.')[1]] : S.sec[k];
  if (k.startsWith('twoFA.')) S.sec.twoFA[k.split('.')[1]] = v ? 1 : 0;
  else S.sec[k] = v;
  audit('Security setting changed', label, { res: 'settings', from: old, to: v });
  commit();
  toast(label + ' updated');
}
function securityTab() {
  return `<div class="svh"><span class="muted small">Saved in this browser</span>${svBadge()}</div>
  <h2 style="margin:8px 0 4px">Two-step verification</h2><p class="muted small" style="margin-bottom:10px">Ask for a 6-digit code after the password. It is always on for HR, Admin and System Admin accounts. ${demoChip()} The code is a fixed demo value.</p>
  <div class="list">${ROLE_DEF.map(r => `<div class="li"><div class="grow"><b>${r.n}</b><div class="muted small">${r.d}</div></div><label class="sw"><input type="checkbox" ${S.sec.twoFA[r.k] ? 'checked' : ''} ${['hr', 'admin', 'sysadmin'].includes(r.k) ? 'disabled' : ''} onchange="secSet('twoFA.${r.k}',this.checked,'Two-step verification for ${r.n}')" aria-label="Require two-step verification for ${r.n}"><span></span></label></div>`).join('')}</div>
  <h2 style="margin:26px 0 12px">Passwords and sessions</h2>
  <div class="fg">${fld('sc1', 'Minimum password length', `<select id="sc1" onchange="secSet('minLen',+this.value,'Minimum password length')">${[8, 10, 12].map(n => `<option value="${n}" ${S.sec.minLen === n ? 'selected' : ''}>${n} characters</option>`).join('')}</select>`)}
  ${fld('sc2', 'Sign out after inactivity', `<select id="sc2" onchange="secSet('timeout',+this.value,'Session timeout');idleReset()">${[15, 30, 60, 120].map(n => `<option value="${n}" ${S.sec.timeout === n ? 'selected' : ''}>${n} minutes</option>`).join('')}</select>`)}</div>
  <div class="tools"><button class="btn" onclick="forcePwReset()">Require password reset for all staff</button></div>
  <h2 style="margin:22px 0 4px">Active sessions ${demoChip()}</h2><div class="list">
   <div class="li"><span class="ai t-green">${ic('shield', 18)}</span><div class="grow"><b>This browser</b><div class="muted small">Gurugram · current session</div></div>${chip('Current', 'ok')}</div>
   <div class="li"><span class="ai t-brand">${ic('clock', 18)}</span><div class="grow"><b>PeopleDesk app on Android</b><div class="muted small">Sample entry · no real device</div></div><button class="btn sm" onclick="signOutOthers()">Sign out</button></div></div>`;
}
function integrationsTab() {
  const it = [
    ['Bank payments', 'Host-to-host file transfer for salary payouts', 'wallet'],
    ['Identity provider (SSO)', 'SAML or OpenID sign-in for staff', 'key'],
    ['Attendance devices', 'Biometric and gate readers at the plant', 'clock'],
    ['Email and SMS delivery', 'Delivery status for notifications and payslips', 'mail']
  ];
  return `<div class="svh"><span class="muted small">No live connections in this demo</span></div><p class="muted small" style="margin:6px 0 12px">These need a backend and credentials, so they are shown as placeholders. Delivery and sync status would appear here.</p>
  <div class="list">${it.map(([a, b, i]) => `<div class="li"><span class="ai t-brand">${ic(i, 18)}</span><div class="grow"><b>${a}</b><div class="muted small">${b}</div></div>${demoChip()}<button class="btn sm" disabled>Connect</button></div>`).join('')}</div>`;
}
function prefSet(k, v, label) {
  S.prefs[k] = v ? 1 : 0;
  commit();
  toast(label + (v ? ' on' : ' off'));
}
function prefsTab() {
  return `<div class="svh"><span class="muted small">Saved in this browser</span>${svBadge()}</div><div class="list">${[
    [
      'Dark mode',
      'Easier on the eyes on night shifts',
      `<input type="checkbox" ${isDark() ? 'checked' : ''} onchange="setTheme(this.checked?'dark':'light')" aria-label="Dark mode">`
    ],
    [
      'Email notifications',
      `Leave decisions, payslips and approvals ${demoChip()}`,
      `<input type="checkbox" ${S.prefs.email ? 'checked' : ''} onchange="prefSet('email',this.checked,'Email notifications')" aria-label="Email notifications">`
    ],
    [
      'Push notifications on mobile',
      `Reminders to clock in and out ${demoChip()}`,
      `<input type="checkbox" ${S.prefs.push ? 'checked' : ''} onchange="prefSet('push',this.checked,'Push notifications')" aria-label="Push notifications">`
    ]
  ]
    .map(
      ([a, b, i]) =>
        `<div class="li"><div class="grow"><b>${a}</b><div class="muted small">${b}</div></div><label class="sw">${i}<span></span></label></div>`
    )
    .join(
      ''
    )}${S.role === 'admin' ? `<div class="li"><div class="grow"><b>Demo data</b><div class="muted small">Your changes are saved in this browser</div></div><button class="btn sm" onclick="resetDemo()">Reset</button></div>` : ''}</div>`;
}

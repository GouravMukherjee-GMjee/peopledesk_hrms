/* =====================================================================
   Hours and overtime: the page and its tabs
   Hours · Overtime · Extra time (ledger) · Holiday work · My requests · Team approvals
   Answer in three seconds: the four cards under the period switcher say how much was worked,
   what was expected, the difference and the overtime.
   ===================================================================== */
S.hx = {
  per: 'week',
  off: 0,
  f: { mon: '', st: 'all', cat: 'all' },
  tf: { who: 'all', wk: 'all' },
  sel: []
};
const hxChip = code => chip(OT_ST[code][0], OT_ST[code][1]);
const hxApChip = en => {
  const a = entApproval(en);
  return chip(a[0], a[1]);
};
const hxTag = r =>
  ({
    work: ['Working day', 'ok'],
    holwork: ['Holiday work', 'info'],
    offwork: ['Weekly-off work', 'info'],
    leave: ['Leave', 'warn'],
    absent: ['Absent', 'bad'],
    holiday: ['Holiday', 'mute'],
    weekoff: ['Weekly off', 'mute'],
    notin: ['Not clocked in', 'mute'],
    none: ['Not joined', 'mute'],
    future: ['Upcoming', 'mute']
  })[r.tag] || ['', 'mute'];
const hxTagChip = r => {
  const t = hxTag(r);
  return t[0] ? chip(r.miss ? 'Punch-out missing' : t[0], r.miss ? 'warn' : t[1]) : '';
};
const hxSrc = s => (s ? `<span class="hx-src">${esc(s)}</span>` : '');
const hxEmpty = (icon, title, text, act) =>
  `<div class="hx-state"><span class="hx-si">${ic(icon, 26)}</span><h3>${title}</h3><p>${text}</p>${act || ''}</div>`;
const hxError = () =>
  `<div class="hx-state err" role="alert"><span class="hx-si">${ic('alert', 26)}</span><h3>We couldn’t load your hours</h3><p>This is on our side. Your attendance is safe and nothing has changed.</p><button class="btn primary" onclick="S.hrsForce='';render()">Try again</button></div>`;
const hxSkeleton = () =>
  `<div class="hx-sk" role="status" aria-busy="true" aria-label="Loading your hours"><div class="hx-cards">${'<i class="c"></i>'.repeat(4)}</div><i class="b"></i><i class="b s"></i></div>`;
const hxMe = () => {
  const e = me(),
    ents = otEntries(e.id);
  return { e, ents, bal: otBalance(ents) };
};
const hxPlain = (en, k) => (en[k] != null ? en[k] : '');

function hoursPage() {
  otInit();
  const mgr = isMgr() && can('hours', 'approve'),
    pend = mgr ? teamPending().length : 0,
    tl = [
      ['hours', 'Hours'],
      ['ot', 'Overtime'],
      ['bal', 'Extra time'],
      ['off', 'Holiday work'],
      ['req', 'My requests']
    ];
  if (mgr) tl.push(['team', 'Team approvals' + (pend ? ` (${pend})` : '')]);
  const cur = tl.some(x => x[0] === S.tab.hr) ? S.tab.hr : 'hours';
  S.tab.hr = cur;
  let body,
    avail = 0;
  try {
    if (S.hrsForce === 'error') throw new Error('forced');
    if (S.hrsForce === 'loading') body = hxSkeleton();
    else {
      const d = hxMe();
      avail = d.bal.avail;
      body = { hours: hxHours, ot: hxOt, bal: hxBal, off: hxOff, req: hxReq, team: hxTeam }[cur](d);
    }
  } catch (err) {
    body = hxError();
  }
  const act = `<button class="btn primary" ${avail ? '' : 'disabled title="You have no approved extra time to use yet"'} onclick="otUse()">${ic('swap', 16)}Use my extra time</button>`;
  return (
    ph('Hours and overtime', 'Your worked hours, extra time and what you can do with it', act) +
    `<div class="card hx"><div class="head">${tabs('hr', tl, 'hours')}</div>${body}</div>`
  );
}

/* ---------- Hours: period switcher, four cards, then today, week or month ---------- */
function hxPer(k) {
  S.hx.per = k;
  S.hx.off = 0;
  render();
}
function hxNav(n) {
  const lim = S.hx.per === 'week' ? -26 : -11;
  S.hx.off = Math.max(lim, Math.min(0, S.hx.off + n));
  render();
}
function hxCards(sm, per) {
  const d = sm.diff,
    card = (cls, l, v, sub, icon) =>
      `<div class="hx-cd ${cls}"><div class="hx-cl">${icon ? ic(icon, 16) : ''}${l}</div><div class="hx-cv">${v}</div><div class="hx-cs">${sub}</div></div>`;
  return `<div class="hx-cards" role="group" aria-label="Summary">
    ${card('', 'Worked hours', fhm(sm.worked), sm.live ? 'Including today so far' : sm.offMin ? `Plus ${fhm(sm.offMin)} on holidays and weekly offs` : 'On working days', 'clock')}
    ${card('', 'Expected hours', fhm(sm.exp), per === 'month' ? 'To date, after the daily break' : 'After the daily break', 'cal')}
    ${card(d >= 0 ? 'up' : 'dn', 'Difference', fsg(d), d >= 0 ? 'Ahead of what was expected' : 'Behind what was expected', d >= 0 ? 'up' : 'dn')}
    ${card('ot', 'Overtime', fhm(sm.ot), `Weekday ${fhm(sm.otWk)} · Holiday and off ${fhm(sm.otOff)}`, 'chart')}
  </div>`;
}
function hxHours(d) {
  const per = S.hx.per,
    pd = hrsPeriod(per, S.hx.off),
    sm = hrsSummary(d.e.id, pd.days, d.ents);
  const seg = [
    ['today', 'Today'],
    ['week', 'This week'],
    ['month', 'This month']
  ];
  const bar = `<div class="hx-top"><div class="hx-seg" role="group" aria-label="Period">${seg.map(([k, n]) => `<button type="button" aria-pressed="${k === per}" onclick="hxPer('${k}')">${n}</button>`).join('')}</div>
    ${per === 'today' ? `<span class="hx-pl">${esc(pd.label)}</span>` : `<div class="hx-pn"><button class="icon-btn" aria-label="Previous ${per}" onclick="hxNav(-1)">${ic('arrow', 16).replace('<svg', '<svg style="transform:rotate(180deg)"')}</button><span class="hx-pl" aria-live="polite">${esc(pd.label)}</span><button class="icon-btn" aria-label="Next ${per}" ${S.hx.off >= 0 ? 'disabled' : ''} onclick="hxNav(1)">${ic('arrow', 16)}</button></div>`}</div>`;
  return `<div class="hx-body">${bar}${hxCards(sm, per)}${per === 'today' ? hxToday(sm) : per === 'week' ? hxWeek(sm) : hxMonth(sm, pd)}</div>`;
}
function hxToday(sm) {
  const r = sm.rows[0],
    P = otPolFor(r.o.e);
  if (r.tag === 'notin' || (r.tag === 'work' && r.in == null))
    return `<div class="hx-panel">${hxEmpty('clock', 'You haven’t clocked in yet', 'Your hours start counting when you clock in from the app, a biometric device or the web.', `<button class="btn primary" onclick="toggleClock()">Clock in</button>`)}</div>`;
  if (r.off && !r.cat)
    return `<div class="hx-panel">${hxEmpty('cal', r.label, 'Today is not a working day, so nothing is expected.', '')}</div>`;
  if (r.tag === 'leave' || r.tag === 'absent')
    return `<div class="hx-panel">${hxEmpty('cal', r.tag === 'leave' ? 'On leave today' : 'No punch recorded', r.tag === 'leave' ? r.label : 'If this is wrong, raise a query from Attendance.', '')}</div>`;
  const span = r.o.end - r.o.start,
    pct = r.exp ? Math.min(100, Math.round((r.worked / r.exp) * 100)) : 0,
    left = Math.max(0, r.exp - r.worked);
  const f = (l, v, x = '') => `<div class="hx-f"><dt>${l}</dt><dd>${v}${x}</dd></div>`;
  return `<div class="hx-panel hx-today">
   <dl class="hx-facts">
    ${f('Clock in', tm(r.in), hxSrc(r.src))}
    ${f('Clock out', r.live ? '<span class="hx-live">In progress</span>' : tm(r.out))}
    ${f('Break', fhm(r.brk || P.breakMin), '<small>Deducted automatically</small>')}
    ${f('Worked so far', fhm(r.worked))}
    ${f('Expected logout', tm(r.in + span))}
    ${f('Overtime so far', fhm(r.ot))}
   </dl>
   <div class="hx-pg"><div class="hx-track" role="progressbar" aria-label="Worked today against expected" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${pct}" aria-valuetext="${fhm(r.worked)} of ${fhm(r.exp)}"><i style="width:${pct}%"></i></div>
    <div class="hx-pgl"><span>${fhm(r.worked)} worked of ${fhm(r.exp)}</span><span>${r.ot ? 'Overtime ' + fhm(r.ot) : left ? fhm(left) + ' to go' : 'Expected hours done'}</span></div></div>
   <div class="hx-acts"><button class="btn" onclick="hrsOpen('${r.iso}')">Today’s details</button></div>
  </div>`;
}
/* the bar chart is plain HTML, so it prints, scales and reads out; the same numbers are in the table below */
function hxWeek(sm) {
  const max = Math.max(720, ...sm.rows.map(r => r.worked)),
    top = Math.ceil(max / 180) * 180,
    pc = v => ((v / top) * 100).toFixed(1) + '%';
  const cols = sm.rows
    .map(r => {
      const fut = r.dt > TODAY,
        ot = r.cat === 'weekday' ? (r.en ? r.en.min : r.live ? r.ot : 0) : 0,
        regular = r.off ? 0 : Math.max(0, r.worked - ot),
        offw = r.off && r.cat ? r.worked : 0,
        tg = hxTag(r),
        sr = `${fddy(r.dt)}, ${tg[0]}${fut ? '' : ', ' + fhm(r.worked) + ' worked' + (r.exp ? ', ' + fhm(r.exp) + ' expected' : '') + (r.ot ? ', ' + fhm(r.ot) + ' overtime' : '')}. Open details`;
      return `<button class="hx-col${r.dt.getTime() === TODAY.getTime() ? ' today' : ''}${fut ? ' fut' : ''}" onclick="hrsOpen('${r.iso}')" aria-label="${esc(sr)}">
       <span class="hx-val">${fut || !r.worked ? '–' : fhm(r.worked)}</span>
       <span class="hx-plot">${r.exp && !fut ? `<i class="hx-exp" style="bottom:${pc(r.exp)}" title="Expected ${fhm(r.exp)}"></i>` : ''}<span class="hx-stack">${ot ? `<i class="hx-ot" style="height:${pc(ot)}"></i>` : ''}${regular ? `<i class="hx-reg" style="height:${pc(regular)}"></i>` : ''}${offw ? `<i class="hx-offw" style="height:${pc(offw)}"></i>` : ''}</span></span>
       <span class="hx-dn"><b>${DOWN[r.dt.getDay()].slice(0, 3)}</b>${r.dt.getDate()}</span>
       <span class="hx-tg">${esc(tg[0] === 'Working day' ? (r.ot ? '+' + fhm(r.ot) : '') : tg[0])}</span></button>`;
    })
    .join('');
  const grid = [0, 1, 2, 3]
    .map(
      i => `<i style="bottom:${(i * 25).toFixed(0)}%"><b>${Math.round((top * i) / 4 / 60)}h</b></i>`
    )
    .join('');
  return `<div class="hx-panel"><div class="hx-ch"><h3>Hours per day</h3><div class="hx-leg" aria-hidden="true"><span><i class="k reg"></i>Worked</span><span><i class="k ot"></i>Overtime</span><span><i class="k offw"></i>Holiday or off work</span><span><i class="k exp"></i>Expected</span></div></div>
    <div class="hx-chart" role="group" aria-label="Bar chart of hours worked each day. The same numbers are in the table below."><div class="hx-grid" aria-hidden="true">${grid}</div><div class="hx-cols">${cols}</div></div>
    <p class="hx-tot"><b>Week total</b> ${fhm(sm.worked)} worked · ${fhm(sm.ot)} overtime${sm.short ? ` · ${sm.short} day${sm.short > 1 ? 's' : ''} short on hours` : ''}</p>
    ${hxAlt(sm)}</div>`;
}
function hxAlt(sm) {
  const rows = sm.rows
    .filter(r => r.dt <= TODAY)
    .map(r => ({
      cells: [
        fdd(r.dt),
        hxTagChip(r),
        r.worked ? fhm(r.worked) : '–',
        r.exp ? fhm(r.exp) : '–',
        r.ot ? fhm(r.ot) : '–',
        `<button class="btn sm" onclick="hrsOpen('${r.iso}')">Details</button>`
      ]
    }));
  return `<details class="hx-alt"><summary>View as a table</summary>${rtable([{ h: 'Day', keep: 1 }, { h: 'Type' }, { h: 'Worked', c: 'num' }, { h: 'Expected', c: 'num', xm: 1 }, { h: 'Overtime', c: 'num' }, { h: '', act: 1 }], rows, { et: 'No days yet' })}</details>`;
}
function hxMonth(sm, pd) {
  const first = (pd.a.getDay() + 6) % 7,
    cells = [];
  for (let i = 0; i < first; i++) cells.push('<i></i>');
  sm.rows.forEach(r => {
    const fut = r.dt > TODAY,
      ot = r.cat === 'weekday' ? (r.en ? r.en.min : r.ot) : 0,
      tg = hxTag(r);
    let lv = 'f',
      txt = '',
      mark = '';
    if (!fut)
      if (r.tag === 'work') {
        lv = r.live ? 'm' : ot ? 'o' : r.worked - r.exp <= -15 ? 's' : 'm';
        txt = fhm(r.worked);
        mark = ot ? '+' + fhm(ot) : lv === 's' ? '▼ ' + fhm(r.worked - r.exp) : '';
      } else if (r.cat) {
        lv = 'w';
        txt = fhm(r.worked);
        mark = r.tag === 'holwork' ? 'Holiday work' : 'Off-day work';
      } else {
        lv =
          { leave: 'l', absent: 'a', holiday: 'x', weekoff: 'x', none: 'n', notin: 'f' }[r.tag] ||
          'f';
        mark =
          r.tag === 'holiday'
            ? 'Holiday'
            : r.tag === 'weekoff'
              ? 'Off'
              : r.tag === 'leave'
                ? 'Leave'
                : r.tag === 'absent'
                  ? 'Absent'
                  : '';
      }
    const sr = `${fddy(r.dt)}, ${tg[0]}${txt ? ', ' + txt + ' worked' : ''}${ot ? ', ' + fhm(ot) + ' overtime' : ''}. Open details`;
    cells.push(
      fut || r.tag === 'none'
        ? `<div class="hx-hc ${lv}" aria-hidden="true"><b>${r.dt.getDate()}</b></div>`
        : `<button class="hx-hc ${lv}${r.dt.getTime() === TODAY.getTime() ? ' today' : ''}" onclick="hrsOpen('${r.iso}')" aria-label="${esc(sr)}"><b>${r.dt.getDate()}</b><span class="v">${txt}</span><span class="m">${esc(mark)}</span></button>`
    );
  });
  const shorts = sm.rows.filter(
    r => !r.off && r.tag === 'work' && !r.live && r.worked - r.exp <= -15 && r.dt <= TODAY
  );
  return `<div class="hx-panel"><div class="hx-ch"><h3>${monLbl(pd.a)}</h3><div class="hx-leg" aria-hidden="true"><span><i class="k m"></i>Met expected</span><span><i class="k s"></i>▼ Short</span><span><i class="k o"></i>+ Overtime</span><span><i class="k w"></i>Holiday or off work</span><span><i class="k l"></i>Leave</span><span><i class="k a"></i>Absent</span></div></div>
   <div class="hx-heat" role="group" aria-label="Calendar of hours worked each day. The same numbers are in the table below."><div class="hx-hd" aria-hidden="true">${['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(x => `<span>${x}</span>`).join('')}</div><div class="hx-hg">${cells.join('')}</div></div>
   <p class="hx-tot"><b>Month total</b> ${fhm(sm.worked)} worked · ${fhm(sm.ot)} overtime · ${sm.short} day${sm.short === 1 ? '' : 's'} short on hours</p>
   ${
     shorts.length
       ? `<div class="hx-shorts"><span class="muted small">Short on hours:</span>${shorts
           .slice(0, 8)
           .map(
             r =>
               `<button class="hx-sh" onclick="hrsOpen('${r.iso}')">${fdd(r.dt)} <b>${fsg(r.worked - r.exp)}</b></button>`
           )
           .join('')}</div>`
       : ''
   }
   ${hxAlt(sm)}</div>`;
}

/* ---------- day detail ---------- */
function hrsOpen(isoStr, empId) {
  empId = empId || me().id;
  const dt = isoD(isoStr),
    r = hrsDay(empId, dt),
    e = r.o.e,
    ent = otEntries(empId).find(x => x.iso === isoStr),
    P = otPolFor(e),
    self = empId === me().id,
    tg = hxTag(r);
  let body = `<div class="hx-dh">${hxTagChip(r)}${ent ? hxApChip(ent) : ''}</div>`;
  if (r.in != null) {
    const out = r.live ? 'In progress' : r.out != null ? tm(r.out) : 'Missing';
    body += `<h3 class="hx-h3">Punches</h3><ol class="hx-tl">
      <li><span class="d"></span><div><b>Clock in · ${tm(r.in)}</b>${hxSrc(r.src)}</div></li>
      ${r.brk ? `<li><span class="d"></span><div><b>Break · ${fhm(r.brk)}</b><small>Deducted automatically</small></div></li>` : ''}
      <li><span class="d${r.live ? ' live' : ''}"></span><div><b>Clock out · ${out}</b>${r.miss ? '<small>No punch-out was recorded</small>' : ''}</div></li></ol>`;
    if (!r.miss)
      body += `<h3 class="hx-h3">Worked and expected</h3><div class="hx-cmp"><div><span>Worked</span><b>${fhm(r.worked)}</b></div><div><span>Expected</span><b>${fhm(r.exp)}</b></div><div class="${r.worked - r.exp >= 0 ? 'up' : 'dn'}"><span>Difference</span><b>${fsg(r.worked - r.exp)}</b></div></div>`;
  } else
    body += `<p class="muted">${esc(r.label || tg[0])}. ${r.tag === 'absent' ? 'No punches were recorded for this day.' : r.off ? 'Not a working day, so no hours are expected.' : ''}</p>`;
  if (ent) {
    const st = entStatus(ent),
      pm = payMonth(ent.iso, ent.P);
    body += `<h3 class="hx-h3">Overtime</h3><dl class="hx-kv">
      <div><dt>Hours</dt><dd><b>${fhm(ent.min)}</b>${ent.capped ? '<small>Capped by the weekly limit</small>' : ''}</dd></div>
      <div><dt>Category</dt><dd>${OT_CAT[ent.cat]}</dd></div>
      <div><dt>Rate</dt><dd>${ent.rate}×</dd></div>
      <div><dt>Status</dt><dd>${hxChip(st)}</dd></div>
      ${st === 'comp' || st === 'expired' ? '' : `<div><dt>Estimated pay</dt><dd>${inr(otPay(ent))} <small>Estimate, confirmed by payroll</small></dd></div><div><dt>Payroll month</dt><dd>${pm.label}</dd></div>`}
      ${st === 'available' ? `<div><dt>Expires</dt><dd>${fddy(isoD(ent.expiry))}</dd></div>` : ''}</dl>`;
  } else if (r.ot === 0 && r.otRaw && r.tag === 'work')
    body += `<p class="muted small">${fhm(r.otRaw)} past shift end is under the ${P.minMin} minute minimum, so no overtime is recorded.</p>`;
  const askBtn =
    ent && self && ent.st === 'auto'
      ? `<button class="btn primary" onclick="closeModal();otAsk(['${ent.key}'])">Request overtime approval</button>`
      : ent && self && entStatus(ent) === 'available'
        ? `<button class="btn primary" onclick="closeModal();otUse(['${ent.key}'])">Use this extra time</button>`
        : '';
  overlay(
    fddy(dt),
    body,
    `<button class="btn" onclick="closeModal();attReg('${empId}',${dt.getFullYear()},${dt.getMonth()},${dt.getDate()})">Raise a query / regularize</button>${askBtn}`,
    { side: true }
  );
}

/* ---------- Overtime ---------- */
const hxMonths = () =>
  [0, 1, 2, 3, 4, 5].map(i => {
    const d = new Date(TODAY.getFullYear(), TODAY.getMonth() - i, 1);
    return [d.getFullYear() + '-' + pad(d.getMonth() + 1), monLbl(d)];
  });
function hxF(k, v) {
  S.hx.f[k] = v;
  render();
}
const hxSum = (ents, f) => ents.filter(f).reduce((a, x) => a + x.min, 0);
function hxOt(d) {
  const f = S.hx.f,
    mon = f.mon || hxMonths()[0][0],
    ws = iso(wkStart(TODAY)),
    all = d.ents,
    mine = all
      .filter(
        x =>
          x.iso.slice(0, 7) === mon &&
          (f.cat === 'all' || x.cat === f.cat) &&
          (f.st === 'all' || entApproval(x)[0].toLowerCase().startsWith(f.st))
      )
      .reverse();
  const live = hrsDay(d.e.id, TODAY),
    todayOt = live.live ? live.ot : 0,
    wk = hxSum(all, x => x.iso >= ws) + todayOt,
    mo = hxSum(all, x => x.iso.slice(0, 7) === iso(TODAY).slice(0, 7)) + todayOt,
    split = c =>
      hxSum(
        all,
        x =>
          x.iso.slice(0, 7) === mon && (c === 'weekday' ? x.cat === 'weekday' : x.cat !== 'weekday')
      ),
    pay = c =>
      all
        .filter(
          x =>
            x.iso.slice(0, 7) === mon &&
            (c === 'weekday' ? x.cat === 'weekday' : x.cat !== 'weekday') &&
            ['auto', 'pending', 'approved'].includes(x.st)
        )
        .reduce((a, x) => a + otPay(x), 0);
  const stat = (l, v, s) =>
    `<div class="hx-cd ot"><div class="hx-cl">${l}</div><div class="hx-cv">${v}</div><div class="hx-cs">${s}</div></div>`;
  const rows = mine.map(en => {
    const st = entStatus(en),
      pm = payMonth(en.iso, en.P),
      act =
        en.st === 'auto'
          ? `<button class="btn sm primary" onclick="event.stopPropagation();otAsk(['${en.key}'])">Request approval</button>`
          : st === 'available'
            ? `<button class="btn sm" onclick="event.stopPropagation();otUse(['${en.key}'])">Use</button>`
            : `<button class="btn sm" onclick="hrsOpen('${en.iso}')">Details</button>`;
    return {
      click: `hrsOpen('${en.iso}')`,
      cells: [
        `<b>${fddy(en.dt)}</b>`,
        `<b>${fhm(en.min)}</b>`,
        OT_CAT[en.cat],
        en.rate + '×',
        hxApChip(en) +
          (en.use && st !== 'available' ? ` <span class="muted small">${OT_ST[st][0]}</span>` : ''),
        ['comp', 'expired', 'rejected'].includes(st)
          ? '<span class="muted">–</span>'
          : `<b>${inr(otPay(en))}</b> <span class="muted small">· ${pm.label} payroll</span>`,
        act
      ]
    };
  });
  const autos = mine.filter(x => x.st === 'auto').length;
  return `<div class="hx-body"><div class="hx-cards c3">${stat('This week', fhm(wk), 'Weekday, holiday and off-day work')}${stat('This month', fhm(mo), monLbl(TODAY))}${stat('Selected month', fhm(split('weekday') + split('x')), `Weekday ${fhm(split('weekday'))} · Holiday and off ${fhm(split('x'))}`)}</div>
   <div class="hx-est"><div><span>Weekday overtime</span><b>${fhm(split('weekday'))}</b><em>${inr(pay('weekday'))}</em></div><div><span>Holiday and weekly-off work</span><b>${fhm(split('x'))}</b><em>${inr(pay('x'))}</em></div><p class="muted small">Estimate, confirmed by payroll. Based on your basic pay and the rate for each category.</p></div>
   <div class="hx-filters"><div class="field"><label for="hf-m">Month</label><select id="hf-m" onchange="hxF('mon',this.value)">${hxMonths()
     .map(([v, n]) => `<option value="${v}" ${v === mon ? 'selected' : ''}>${n}</option>`)
     .join('')}</select></div>
    <div class="field"><label for="hf-s">Status</label><select id="hf-s" onchange="hxF('st',this.value)">${[
      ['all', 'All'],
      ['auto', 'Auto-calculated'],
      ['pending', 'Pending'],
      ['approved', 'Approved'],
      ['rejected', 'Rejected']
    ]
      .map(([v, n]) => `<option value="${v}" ${f.st === v ? 'selected' : ''}>${n}</option>`)
      .join('')}</select></div>
    <div class="field"><label for="hf-c">Category</label><select id="hf-c" onchange="hxF('cat',this.value)">${[
      ['all', 'All'],
      ['weekday', 'Weekday overtime'],
      ['holiday', 'Holiday work'],
      ['off', 'Weekly-off work']
    ]
      .map(([v, n]) => `<option value="${v}" ${f.cat === v ? 'selected' : ''}>${n}</option>`)
      .join('')}</select></div>
    ${autos ? `<button class="btn" onclick="otAsk(${JSON.stringify(mine.filter(x => x.st === 'auto').map(x => x.key)).replace(/"/g, "'")})">Request approval for ${autos} auto-calculated</button>` : ''}</div>
   ${rows.length ? rtable([{ h: 'Date', keep: 1 }, { h: 'Hours', c: 'num' }, { h: 'Category', xm: 1 }, { h: 'Rate', c: 'num', xm: 1 }, { h: 'Status' }, { h: 'Estimate and payroll month' }, { h: '', act: 1 }], rows, {}) : hxEmpty('inbox', all.length ? 'Nothing matches these filters' : 'No overtime yet', all.length ? 'Try another month or clear a filter.' : 'When you work past your shift end, the extra time shows up here by itself.', '')}</div>`;
}

/* ---------- Extra time: balance cards and ledger ---------- */
function hxBal(d) {
  const b = d.bal,
    cd = (l, v, s, cls) =>
      `<div class="hx-cd ${cls || ''}"><div class="hx-cl">${l}</div><div class="hx-cv">${fhm(v)}</div><div class="hx-cs">${s}</div></div>`,
    P = otPolFor(d.e),
    dys = m => {
      const c = compDays(m, P);
      return c.days ? '≈ ' + fdy(c.days) + ' of comp-off' : 'Under a half day';
    };
  const soon = b.soonList[0],
    daysTo = soon ? Math.round((isoD(soon.expiry) - TODAY) / 864e5) : 0;
  const rows = d.ents
    .slice()
    .reverse()
    .filter(x => x.st === 'approved')
    .map(en => {
      const st = entStatus(en),
        left = Math.round((isoD(en.expiry) - TODAY) / 864e5);
      return {
        click: `hrsOpen('${en.iso}')`,
        cells: [
          `<b>${fddy(en.dt)}</b>`,
          `<b>${fhm(en.min)}</b>`,
          OT_CAT[en.cat],
          fddy(isoD(en.expiry)) +
            (st === 'available'
              ? `<div class="muted small">${left < 0 ? 'Expired' : left === 0 ? 'Today' : 'in ' + left + ' day' + (left === 1 ? '' : 's')}</div>`
              : ''),
          hxChip(st),
          st === 'available'
            ? `<button class="btn sm primary" onclick="event.stopPropagation();otUse(['${en.key}'])">Use</button>`
            : ''
        ]
      };
    });
  return `<div class="hx-body"><div class="hx-cards">${cd('Available to use', b.avail, dys(b.avail), 'ok')}${cd('Pending approval', b.pend, 'Waiting for your manager')}${cd('Used', b.used, 'As comp-off or paid')}${cd('Expiring soon', b.soon, 'Within 14 days', b.soon ? 'warnc' : '')}</div>
   ${b.soon ? `<div class="hx-ban warn" role="alert">${ic('alert', 18)}<div class="grow"><b>${fhm(b.soon)} will expire soon</b><div class="small">The earliest, ${fhm(soon.min)} earned on ${fdd(soon.dt)}, expires on ${fddy(isoD(soon.expiry))} (${daysTo <= 0 ? 'today' : 'in ' + daysTo + ' day' + (daysTo === 1 ? '' : 's')}). Use it as comp-off or extra pay before then.</div></div><button class="btn sm primary" onclick="otUse(${JSON.stringify(b.soonList.map(x => x.key)).replace(/"/g, "'")})">Use now</button></div>` : ''}
   <div class="hx-sec"><h3>Ledger</h3><span class="muted small">Comp-off expires ${P.comp.expiry} days after the day it was earned.</span></div>
   ${rows.length ? rtable([{ h: 'Date earned', keep: 1 }, { h: 'Hours', c: 'num' }, { h: 'Source', xm: 1 }, { h: 'Expires' }, { h: 'Status' }, { h: '', act: 1 }], rows, {}) : hxEmpty('inbox', 'No extra time yet', 'Approved overtime and holiday work are added here, with the date they expire.', `<button class="btn" onclick="S.tab.hr='ot';render()">See overtime</button>`)}</div>`;
}

/* ---------- Holiday and weekly-off work ---------- */
function hxOff(d) {
  const ents = d.ents.filter(x => x.cat !== 'weekday').reverse(),
    P = otPolFor(d.e);
  const rows = ents.map(en => {
    const st = entStatus(en),
      c = compDays(en.min, P),
      act =
        en.st === 'auto'
          ? `<button class="btn sm primary" onclick="event.stopPropagation();otAsk(['${en.key}'])">Request approval</button>`
          : st === 'available'
            ? `<div class="hx-btns"><button class="btn sm" onclick="event.stopPropagation();otUse(['${en.key}'],'comp')">Comp-off</button><button class="btn sm" onclick="event.stopPropagation();otUse(['${en.key}'],'pay')">Extra pay</button></div>`
            : '';
    return {
      click: `hrsOpen('${en.iso}')`,
      cells: [
        `<b>${fddy(en.dt)}</b>`,
        esc(en.label),
        `<b>${fhm(en.min)}</b>`,
        c.days ? fdy(c.days) : 'Under a half day',
        en.rate + '×',
        hxChip(st) +
          (st === 'available' || st === 'auto' || st === 'pending'
            ? `<div class="muted small">${payMonth(en.iso, en.P).label} payroll if paid</div>`
            : ''),
        act
      ]
    };
  });
  return `<div class="hx-body"><div class="hx-ban info">${ic('help', 18)}<div class="grow">Work on a holiday or a weekly off is recorded separately, at <b>${P.rate.holiday}×</b> for holidays and <b>${P.rate.off}×</b> for weekly offs. ${P.approve.holiday ? 'Your manager approves it first, then ' : 'Then '}you can take it as comp-off (${P.comp.half}h is a half day, ${P.comp.full}h a full day) or as extra pay.</div></div>
   ${rows.length ? rtable([{ h: 'Date', keep: 1 }, { h: 'Holiday or day' }, { h: 'Hours worked', c: 'num' }, { h: 'Equals', xm: 1 }, { h: 'Rate', c: 'num', xm: 1 }, { h: 'Status' }, { h: '', act: 1 }], rows, {}) : hxEmpty('cal', 'No holiday or weekly-off work', 'If you work on a holiday or a weekly off, it is listed here with the days it earns.', '')}</div>`;
}

/* ---------- My requests ---------- */
function hxTimeline(r) {
  const done = r.status === 'Approved',
    rej = r.status === 'Rejected',
    can_ = r.status === 'Cancelled',
    last =
      r.type === 'CO'
        ? 'Comp-off credited'
        : r.type === 'PY'
          ? `Paid in ${r.month || 'payroll'}`
          : 'Added to your balance',
    steps = [
      ['Submitted', 'done', fdd(isoD(r.at.slice(0, 10)))],
      [
        'Manager review',
        r.status === 'Pending' ? 'now' : 'done',
        r.status === 'Pending'
          ? 'Waiting for ' + (emp(r.by) ? emp(r.by).name : 'your manager')
          : r.decAt
            ? fdd(isoD(r.decAt.slice(0, 10)))
            : ''
      ],
      rej
        ? ['Rejected', 'bad', r.comment || '']
        : can_
          ? ['Cancelled', 'bad', '']
          : ['Approved', done ? 'done' : '', ''],
      rej || can_
        ? null
        : [last, done && r.type !== 'PY' ? 'done' : '', r.type === 'PY' && done ? 'Scheduled' : '']
    ].filter(Boolean);
  return `<ol class="hx-steps" aria-label="Request progress">${steps.map(([n, s, x]) => `<li class="${s}"><span class="n">${s === 'done' ? ic('check', 14) : s === 'bad' ? ic('x', 14) : ''}</span><div><b>${esc(n)}</b>${x ? `<small>${esc(x)}</small>` : ''}</div></li>`).join('')}</ol>`;
}
function hxReq(d) {
  const list = S.ot.reqs.filter(r => r.emp === d.e.id);
  if (!list.length)
    return `<div class="hx-body">${hxEmpty('receipt', 'No requests yet', 'When you ask for overtime approval or use extra time, you can follow it here.', `<button class="btn" onclick="S.tab.hr='ot';render()">See overtime</button>`)}</div>`;
  const tone = { Pending: 'warn', Approved: 'ok', Rejected: 'bad', Cancelled: 'mute' };
  return `<div class="hx-body"><div class="hx-reqs">${list
    .map(r => {
      const ents = r.keys.map(k => k.split('|')[1]).sort(),
        what =
          r.type === 'OT'
            ? 'Approval for ' + (OT_CAT[r.cat] || 'overtime').toLowerCase()
            : r.type === 'CO'
              ? `Comp-off, ${fdy(r.days)}${r.dates.length ? ' on ' + r.dates.map(x => fdd(isoD(x))).join(', ') : ''}`
              : `Extra pay, ${inr(r.amount)} in ${r.month} payroll`;
      return `<article class="hx-rq"><header><div><b>${OT_PREFIX[r.type]}</b> <span class="muted">${r.id}</span></div>${chip(r.status, tone[r.status])}</header>
      <p class="hx-rl"><b>${fhm(r.min)}</b> · ${ents.length > 1 ? ents.length + ' days' : fdd(isoD(ents[0]))} · ${esc(what)}</p>${hxTimeline(r)}
      ${r.status === 'Pending' ? `<div class="hx-acts"><button class="btn sm" onclick="otCancelAsk('${r.id}')">Cancel request</button></div>` : ''}</article>`;
    })
    .join('')}</div></div>`;
}

/* ---------- Manager: approvals queue ---------- */
const teamPending = () => {
  const ids = scoped('hours').map(e => e.id);
  return S.ot.reqs.filter(r => r.status === 'Pending' && r.emp !== me().id && ids.includes(r.emp));
};
function hxT(k, v) {
  S.hx.tf[k] = v;
  S.hx.sel = [];
  render();
}
function hxPick(id, on) {
  S.hx.sel = S.hx.sel.filter(x => x !== id);
  if (on) S.hx.sel.push(id);
  render();
}
function hxTeam() {
  const tf = S.hx.tf,
    all = teamPending(),
    ws = iso(wkStart(TODAY)),
    pw = iso(addD(wkStart(TODAY), -7)),
    inWk = r => {
      const d = r.keys[0].split('|')[1];
      return tf.wk === 'all' || (tf.wk === 'this' ? d >= ws : d >= pw && d < ws);
    },
    list = all.filter(r => (tf.who === 'all' || r.emp === tf.who) && inWk(r));
  S.hx.sel = S.hx.sel.filter(id => list.some(r => r.id === id));
  const people = [...new Set(all.map(r => r.emp))].map(id => emp(id));
  const rows = list.map(r => {
    const e = emp(r.emp),
      dts = r.keys.map(k => k.split('|')[1]).sort(),
      en = r.type === 'OT' ? otEntries(r.emp).find(x => x.key === r.keys[0]) : null,
      det =
        r.type === 'OT' && en
          ? `${tm(en.in)} to ${tm(en.out)} ${hxSrc(en.src)}`
          : r.type === 'CO'
            ? `${fdy(r.days)}${r.dates.length ? ' on ' + r.dates.map(x => fdd(isoD(x))).join(', ') : ''}`
            : `${inr(r.amount)} in ${esc(r.month)} payroll`;
    return {
      cells: [
        `<label class="hx-ck"><input type="checkbox" ${S.hx.sel.includes(r.id) ? 'checked' : ''} aria-label="Select ${esc(e.name)}, ${r.id}" onchange="hxPick('${r.id}',this.checked)"><span class="person">${av(e.name, 30)}<span><b>${esc(e.name)}</b><span>${esc(e.title)}</span></span></span></label>`,
        `${OT_PREFIX[r.type]} <span class="muted small">${r.id}</span>`,
        dts.length > 1 ? dts.length + ' days' : fdd(isoD(dts[0])),
        `<b>${fhm(r.min)}</b>`,
        r.cat === 'mixed' ? 'Mixed' : OT_CAT[r.cat] || '–',
        esc(r.reason || '–'),
        det,
        `<div class="hx-btns"><button class="btn sm primary" onclick="otApprove('${r.id}')">Approve</button><button class="btn sm" onclick="otRejectAsk('${r.id}')">Reject</button></div>`
      ]
    };
  });
  const n = S.hx.sel.length;
  return `<div class="hx-body"><div class="hx-filters"><div class="field"><label for="tf-w">Team member</label><select id="tf-w" onchange="hxT('who',this.value)"><option value="all">Everyone</option>${people.map(p => `<option value="${p.id}" ${tf.who === p.id ? 'selected' : ''}>${esc(p.name)}</option>`).join('')}</select></div>
    <div class="field"><label for="tf-k">Week</label><select id="tf-k" onchange="hxT('wk',this.value)">${[
      ['all', 'Any week'],
      ['this', 'This week'],
      ['last', 'Last week']
    ]
      .map(([v, l]) => `<option value="${v}" ${tf.wk === v ? 'selected' : ''}>${l}</option>`)
      .join('')}</select></div>
    <div class="hx-bulk" role="group" aria-label="Bulk actions"><span class="muted small" aria-live="polite">${n ? n + ' selected' : list.length + ' pending'}</span><button class="btn" ${list.length ? '' : 'disabled'} onclick="hxPickAll(${list.length && n < list.length})">${n < list.length ? 'Select all' : 'Clear selection'}</button><button class="btn primary" ${n ? '' : 'disabled'} onclick="otBulkApprove()">Approve ${n || ''} selected</button></div></div>
   ${rows.length ? rtable([{ h: 'Employee', keep: 1 }, { h: 'Request' }, { h: 'Date' }, { h: 'Hours', c: 'num' }, { h: 'Category', xm: 1 }, { h: 'Reason', xm: 1 }, { h: 'Punch details', xm: 1 }, { h: '', act: 1 }], rows, {}) : hxEmpty('check', 'You’re all caught up', 'There are no overtime, comp-off or pay requests waiting for you.', '')}</div>`;
}
function hxPickAll(on) {
  S.hx.sel = on
    ? teamPending()
        .filter(r => S.hx.tf.who === 'all' || r.emp === S.hx.tf.who)
        .map(r => r.id)
    : [];
  render();
}

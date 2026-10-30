/* =====================================================================
   v38 · an honest, prioritised home screen: KPIs with a period, a definition and a source
   ===================================================================== */
const OPENINGS = [
  { role: 'CNC Programmer', dept: 'Production', n: 2 },
  { role: 'Safety Officer', dept: 'Quality', n: 1 },
  { role: 'Sales Executive', dept: 'Sales', n: 1 }
];
const addDays = (d, n) => {
  const x = new Date(d);
  x.setDate(x.getDate() + n);
  return x;
};
const monthEnd = back => new Date(TODAY.getFullYear(), TODAY.getMonth() - back + 1, 0);
const headcountSeries = sc => {
  const s = [];
  for (let i = 11; i >= 0; i--) {
    const e = i === 0 ? iso(TODAY) : iso(monthEnd(i));
    s.push(sc.filter(x => x.join <= e).length);
  }
  return s;
};
function dayStats(sc, d) {
  let p = 0,
    a = 0,
    l = 0;
  sc.forEach(e => {
    const o = dayInfo(e.id, d.getFullYear(), d.getMonth(), d.getDate());
    if (o.st === 'P' || o.st === 'T') p++;
    else if (o.st === 'A') a++;
    else if (o.st === 'L') l++;
  });
  return { p, a, l };
}
function attSeries(sc) {
  const out = [];
  for (let i = 20; i >= 0 && out.length < 14; i--) {
    const d = addDays(TODAY, -i),
      s = dayStats(sc, d),
      t = s.p + s.a + s.l;
    if (t && s.p + s.a)
      out.push({ d, pct: Math.round((s.p / Math.max(s.p + s.a + s.l, 1)) * 100), on: s.l });
  }
  return out;
}
const leaveSeries = sc => {
  const out = [];
  for (let i = 13; i >= 0; i--) {
    const d = addDays(TODAY, -i),
      s = iso(d);
    out.push(
      sc.filter(e =>
        S.leaves.some(l => l.emp === e.id && l.status === 'Approved' && l.from <= s && s <= l.to)
      ).length
    );
  }
  return out;
};
const incByMonth = n => {
  const o = [];
  for (let i = n - 1; i >= 0; i--) {
    const d = new Date(TODAY.getFullYear(), TODAY.getMonth() - i, 1),
      k = d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0');
    o.push(S.incidents.filter(x => x.date.startsWith(k)).length);
  }
  return o;
};
const daysSinceLostTime = () => {
  const l = S.incidents
    .filter(i => i.type === 'Lost time')
    .map(i => i.date)
    .sort()
    .pop();
  return l ? Math.round((TODAY - new Date(l + 'T00:00:00')) / 864e5) : null;
};
const openReqs = sc => {
  const deps = new Set(sc.map(e => e.dept));
  return S.role === 'admin' || scopeOf('recruit') === 'all'
    ? OPENINGS
    : OPENINGS.filter(o => deps.has(o.dept));
};
const wgOn = k => S.widgets['h:' + k] !== 0;
function kpiInfo(b) {
  const d = b.dataset;
  overlay(
    d.t,
    `<div class="list"><div class="li" style="align-items:flex-start"><span class="muted" style="width:90px">Meaning</span><span class="grow">${esc(d.d)}</span></div><div class="li" style="align-items:flex-start"><span class="muted" style="width:90px">Period</span><span class="grow">${esc(d.p)}</span></div><div class="li" style="align-items:flex-start"><span class="muted" style="width:90px">Source</span><span class="grow">${esc(d.s)}</span></div></div>${d.m ? `<div class="note" style="margin-top:12px"><b>Sample data.</b> This figure is illustrative in the demo. It is not calculated from records yet.</div>` : ''}`,
    `${d.g ? `<button class="btn" onclick="closeModal();go('${d.g}')">Open ${esc(label(d.g))}</button>` : ''}<button class="btn primary" onclick="closeModal()">Close</button>`
  );
}
const kinfoBtn = o =>
  `<button type="button" class="kinfo" aria-label="How is ${esc(String(o.l).replace(/<[^>]*>/g, ''))} calculated?" data-t="${esc(String(o.l).replace(/<[^>]*>/g, ''))}" data-d="${esc(o.def)}" data-p="${esc(o.per || 'Today')}" data-s="${esc(o.src || 'PeopleDesk records')}" data-m="${o.sample ? 1 : ''}" data-g="${o.go || ''}" onclick="event.stopPropagation();kpiInfo(this)" onkeydown="event.stopPropagation()">${ic('help', 14)}</button>`;
function wCustom() {
  const R =
    S.role === 'employee'
      ? [
          ['people', 'Birthdays, anniversaries and new joiners'],
          ['ann', 'Announcements and holidays']
        ]
      : [
          ['week', 'Attendance this week and who is out'],
          ['people', 'Birthdays, anniversaries and new joiners'],
          ['work', 'Workforce by department'],
          ['shifts', "Today's shifts"],
          ['ann', 'Announcements']
        ];
  overlay(
    'Customize home',
    `<p class="muted small" style="margin-bottom:10px">Urgent items always stay at the top. Hide or reorder what comes after.</p><div class="list">${R.map(([k, n], i) => `<div class="li"><label class="grow" style="display:flex;gap:10px;align-items:center"><input type="checkbox" ${wgOn(k) ? 'checked' : ''} onchange="S.widgets['h:${k}']=this.checked?1:0;saveGov();render();wCustom()"> ${n}</label><button class="btn sm ico" aria-label="Move ${esc(n)} up" ${i === 0 ? 'disabled' : ''} onclick="wMove('${k}',-1)">${ic('up', 14)}</button><button class="btn sm ico" aria-label="Move ${esc(n)} down" ${i === R.length - 1 ? 'disabled' : ''} onclick="wMove('${k}',1)">${ic('dn', 14)}</button></div>`).join('')}</div>`,
    `<button class="btn" onclick="S.widgets={};saveGov();closeModal();render()">Reset</button><button class="btn primary" onclick="closeModal()">Done</button>`
  );
}
function wMove(k, d) {
  const key = 'o:' + S.role,
    all = S.role === 'employee' ? ['people', 'ann'] : ['week', 'people', 'work', 'shifts', 'ann'],
    o = (S.widgets[key] || all).filter(x => all.includes(x));
  const i = o.indexOf(k),
    j = i + d;
  if (j < 0 || j >= o.length) return;
  [o[i], o[j]] = [o[j], o[i]];
  S.widgets[key] = o;
  saveGov();
  render();
  wCustom();
}
const wOrder = () => {
  const all =
      S.role === 'employee' ? ['people', 'ann'] : ['week', 'people', 'work', 'shifts', 'ann'],
    o = S.widgets['o:' + S.role];
  return o ? [...o.filter(x => all.includes(x)), ...all.filter(x => !o.includes(x))] : all;
};
function dashboardMgr(u, g, dateStr) {
  const sc = scoped(),
    p = presentToday(sc),
    ap = approvalItems().length,
    open = S.incidents.filter(i => i.st !== 'Closed').length,
    adm = S.role === 'admin';
  const hs = headcountSeries(sc),
    nq = sc.filter(e => e.join >= iso(addDays(TODAY, -90))).length,
    as = attSeries(sc),
    ls = leaveSeries(sc),
    rq = openReqs(sc),
    vac = rq.reduce((a, x) => a + x.n, 0);
  const pc =
      (can('payroll', 'edit') || can('payroll', 'approve')) && S.payStep <= 2 ? payCheck() : null,
    exp = S.courses
      .filter(c => c.exp <= iso(addDays(TODAY, 30)))
      .sort((a, b) => (a.exp < b.exp ? -1 : 1));
  const attn = [
    ap && {
      t: 't-amber',
      i: 'cal',
      b: `${ap} approval${ap > 1 ? 's' : ''}`,
      s: `${queue('overdue').length ? queue('overdue').length + ' overdue · ' : ''}Waiting for you`,
      p: 'approvals'
    },
    pc && {
      t: pc.err.length ? 't-red' : 't-brand',
      i: 'wallet',
      b: pc.err.length
        ? `Payroll: ${pc.err.length} blocking issue${pc.err.length > 1 ? 's' : ''}`
        : 'Payroll in review',
      s: pc.err.length
        ? 'Fix before approval'
        : `${pc.warn.length} warning${pc.warn.length === 1 ? '' : 's'} to acknowledge`,
      p: 'payroll'
    },
    open &&
      can('safety', 'view') && {
        crit: 1,
        t: 't-red',
        i: 'shield',
        b: `${open} open incident${open > 1 ? 's' : ''}`,
        s: 'Investigation due',
        p: 'safety'
      },
    exp.length &&
      can('training', 'view') && {
        t: 't-teal',
        i: 'book',
        b: `${exp.length} certificate${exp.length > 1 ? 's' : ''} expiring`,
        s: `${exp[0].n} · ${fshort(exp[0].exp)}`,
        p: 'training'
      }
  ].filter(Boolean);
  const dep = DEPTS.map((d, i) => ({
      l: d,
      v: sc.filter(e => e.dept === d).length,
      c: DC[i]
    })).filter(x => x.v),
    ti = dow(),
    sh = ['A', 'B', 'C', 'G'].map(k => [
      k,
      sc.filter(e => (S.roster[e.id] || [])[ti] === k).length
    ]),
    shm = Math.max(...sh.map(x => x[1]), 1);
  const W_ = {
    week: `<div class="row c2"><div class="card"><div class="head"><div><h2>Attendance this week</h2><p class="sub">Percent of staff present each day</p></div>${chip('Today ' + p.pct + '%', 'info', 1)}</div>${barChart(weekAtt(sc), ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], { share: 1 / 2, stackAt: 900, today: ti, target: 95, unit: '%', low: 80, label: 'Attendance this week' })}</div><div class="card"><div class="head"><div><h2>Who's out</h2><p class="sub">Next two weeks</p></div><button class="link" onclick="go('leave')">Leave</button></div>${whoOut()}</div></div>`,
    people: `<div class="row c2 ppl">${celebrationsCard()}${newJoinersCard()}</div>`,
    work: `<div class="card"><div class="head"><div><h2>Workforce</h2><p class="sub">Headcount by department</p></div></div>${donut(dep, 'people', 'deptJump')}</div>`,
    shifts: `<div class="card"><div class="head"><div><h2>Today's shifts</h2><p class="sub">People assigned across the plant</p></div><button class="link" onclick="go('roster')">Roster</button></div><div class="list">${sh.map(([k, n]) => `<div class="li"><span class="shift ${k}" style="cursor:default;width:30px;height:28px">${k}</span><div class="grow"><div class="bar"><i style="width:${(n / shm) * 100}%"></i></div></div><b>${n}</b></div>`).join('')}</div></div>`,
    ann: `<div class="card"><div class="head"><h2>Announcements</h2></div>${annList()}</div>`
  };
  const order = wOrder().filter(wgOn),
    sec = order.filter(k => k !== 'week' && k !== 'people'),
    cards = sec.map(k => W_[k]).join('');
  return (
    `<div class="acts hometop"><button class="btn" onclick="wCustom()">${ic('sliders', 16)}Customize home</button>${can('payroll', 'view') && adm ? `<button class="btn" onclick="go('payroll')">${ic('wallet', 16)}Run payroll</button>` : ''}${can('employees', 'create') ? `<button class="btn primary" onclick="addEmp()">${ic('plus', 16)}Add employee</button>` : ''}${can('roster', 'view') && !can('employees', 'create') ? `<button class="btn primary" onclick="go('roster')">${ic('grid', 16)}Open roster</button>` : ''}</div>
  <div class="hero">${clockCard(true, `${g}, ${u.name.split(' ')[0]}`, `${dateStr} · ${adm || scopeOf('employees') === 'all' ? 'Company overview' : `Your reporting line, ${sc.length} people`} · ${esc(dayInfo(u.id, ...TD()).shiftTxt)}`)}</div>` +
    `<div class="attn">${attn.map(a => `<button class="att${a.crit ? ' crit' : ''}" onclick="go('${a.p}')"><span class="ai ${a.t}">${ic(a.i, 18)}</span><span><b>${a.b}</b><small>${a.s}</small></span></button>`).join('')}</div>
  <div class="row c4">
   ${kpi({ go: 'employees', l: 'Headcount', v: sc.length, icon: 'users', tone: 't-brand', spark: hs, p: delta('+' + nq, true, 'up'), d: 'joined in the last 90 days', def: 'People in your scope who have joined on or before the date, excluding people who have left.', per: 'Today; trend is month-end for 12 months', src: 'Employee records and joining dates' })}
   ${kpi({ go: 'attendance', l: 'Present today', v: p.pr + `<small> / ${sc.length}</small>`, icon: 'check', tone: 't-green', spark: as.length > 2 ? [...as.slice(0, -1).map(x => x.pct), p.pct] : undefined, p: delta(p.pct + '%', p.pct >= 90 ? true : null), d: 'present, last 14 working days', def: 'People marked present divided by people expected to work. People on leave and weekly offs are not counted as absent.', per: 'Today; trend is the last 14 working days', src: 'Attendance records on each person\u2019s own work calendar' })}
   ${kpi({ go: 'leave', l: 'On leave', v: p.on, icon: 'cal', tone: 't-amber', spark: ls.some(x => x) ? ls : undefined, p: delta(queue('mine').filter(x => x.k === 'leave').length + ' pending', null), d: 'approved leave, last 14 days', def: 'People with approved leave covering the day. Pending requests are shown separately.', per: 'Today; trend is the last 14 days', src: 'Leave requests' })}
   ${kpi({ go: 'recruit', l: 'Open positions', v: vac, icon: 'brief', tone: 't-violet', bar: Math.min(100, (S.cands.length / Math.max(vac * 3, 1)) * 100), bl: `${S.cands.length} candidates for ${vac} openings`, d: `${rq.length} open requisition${rq.length === 1 ? '' : 's'}`, def: 'Vacancies on open requisitions in your scope. The bar compares candidates in the pipeline with three per opening.', per: 'Today', src: 'Recruitment requisitions and candidates' })}
  </div>
  <div class="row c2 ops">${approvalsCard()}${teamTodayCard()}</div>
  ${W_.week}${cards ? `<div class="dashboard-widgets">${cards}</div>` : ''}${order.includes('people') ? W_.people : ''}`
  );
}
{
  const _d = dashboard;
  dashboard = function () {
    const u = me(),
      h = NOW.getHours(),
      g = h < 12 ? 'Good morning' : h < 17 ? 'Good afternoon' : 'Good evening',
      ds = NOW.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' });
    if (persona().role === 'sysadmin') return dashboardSys(u, g, ds);
    if (S.role === 'employee') {
      let html = _d();
      const head = `<div class="acts hometop"><button class="btn" onclick="wCustom()">${ic('sliders', 16)}Customize home</button></div>`;
      if (!wgOn('people'))
        html = html.replace(
          /<div class="row c2 ppl">[\s\S]*?<\/div><\/div><\/div>\s*(?=<div class="row c2">)/,
          ''
        );
      return head + html;
    }
    return dashboardMgr(u, g, ds);
  };
}
/* safety and reports KPIs: computed where records exist, marked Sample where they do not */
{
  const _s = safety;
  safety = function () {
    let h = _s();
    const sl = daysSinceLostTime(),
      open = S.incidents.filter(i => i.st !== 'Closed').length,
      done = Math.round(S.courses.reduce((a, c) => a + c.done, 0) / S.courses.length),
      low = S.courses.slice().sort((a, b) => a.done - b.done)[0];
    const row = `<div class="row c4">${kpi({ l: 'Incident-free days', v: sl == null ? '–' : sl, icon: 'shield', tone: 't-green', d: 'Target 90 days', bar: sl == null ? 0 : Math.min(100, (sl / 90) * 100), bl: sl == null ? 'No lost-time incident recorded' : `${sl} of 90-day target`, def: 'Days since the most recent lost-time incident (an injury that caused time away from work).', per: 'Today', src: 'Incident log', go: 'safety' })}${kpi({ l: 'Open incidents', v: open, icon: 'alert', tone: 't-amber', spark: incByMonth(6).some(x => x) ? incByMonth(6) : undefined, d: 'Incidents logged per month, last 6 months', def: 'Incidents not yet closed. The trend is incidents logged each month.', per: 'Today; trend is 6 months', src: 'Incident log' })}${kpi({ l: 'PPE compliance', v: '96%', icon: 'check', tone: 't-teal', sample: 1, d: 'No audit data connected', def: 'Share of audited people wearing required PPE.', per: 'Last audit', src: 'Not connected yet' })}${kpi({ l: 'Safety training', v: done + '%', icon: 'book', tone: 't-violet', p: low && low.done < 75 ? delta(low.n.split(' ')[0] + ' ' + low.n.split(' ')[1] + ' behind', false, 'dn') : '', d: 'average completion across required courses', bar: done, bl: `${done}% of required courses done`, def: 'Average completion across all required safety courses.', per: 'Today', src: 'Training records', go: 'training' })}</div>`;
    return h.replace(/<div class="row c4">[\s\S]*?<\/div>(?=\s*<div class="card">)/, row);
  };
}
{
  const _r = reports;
  reports = function () {
    let h = _r();
    const ex = (S.life.exits || []).filter(x => x.lwd >= iso(addDays(TODAY, -365))).length,
      hc = Math.max(live().length, 1),
      rate = ((ex / hc) * 100).toFixed(1);
    const row = `<div class="row c4">${kpi({ icon: 'users', tone: 't-teal', l: 'Attrition, 12 months', v: rate + '%', d: ex ? `${ex} exit${ex > 1 ? 's' : ''} on ${hc} people` : 'No exits recorded in 12 months', def: 'People who left in the last 12 months divided by current headcount. No outside benchmark is shown because there is no comparable source.', per: 'Last 12 months', src: 'Completed offboarding records', go: 'lifecycle' })}${kpi({ icon: 'clock', tone: 't-brand', l: 'Average time to hire', v: '26 days', sample: 1, d: 'Requisition dates not connected', def: 'Days from requisition opening to offer acceptance.', per: 'Last quarter', src: 'Not connected yet' })}${kpi({ icon: 'chart', tone: 't-amber', l: 'Overtime this month', v: '312 h', sample: 1, d: 'Overtime hours not connected', def: 'Overtime hours approved in the month.', per: 'This month', src: 'Not connected yet' })}${kpi({ icon: 'wallet', tone: 't-violet', l: 'Cost per hire', v: inr(38500), sample: 1, d: 'Hiring costs not connected', def: 'Recruitment spend divided by hires.', per: 'Last 12 hires', src: 'Not connected yet' })}</div>`;
    return h.replace(
      /<div class="row c4">[\s\S]*?<\/div>(?=\s*<div class="card">|\s*<div class="row)/,
      row
    );
  };
}

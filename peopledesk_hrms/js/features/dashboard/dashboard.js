/* =============== dashboard =============== */
function deptJump(n) {
  S.deptF = n;
  S.statF = 'All';
  S.q = '';
  go('employees');
}
function dashboard() {
  const u = me(),
    h = NOW.getHours(),
    g = h < 12 ? 'Good morning' : h < 17 ? 'Good afternoon' : 'Good evening',
    dateStr = NOW.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' });
  if (S.role === 'employee') {
    const bal = balances(u.id),
      sl = slip(u.ctc);
    return `<div class="hero">${clockCard(true, g + ', ' + u.name.split(' ')[0], dateStr + ' · General shift 09:00–18:00')}</div>
    <div class="qa">${[
      ['Apply for leave', 'cal', 'applyLeave()'],
      ['View payslip', 'wallet', "go('payroll')"],
      ['Raise a request', 'receipt', "go('requests')"],
      ['Update my goals', 'target', "go('performance')"]
    ]
      .map(
        ([l, i, a]) =>
          `<button onclick="${a}"><span class="ai t-brand">${ic(i, 18)}</span>${l}</button>`
      )
      .join('')}</div>
    ${needsAttentionCard(u.id)}
    <div class="row c21">${myWeekCard(u.id)}${myMonthCard(u.id)}</div>
    <div class="row c21"><div class="card"><div class="head"><div><h2>Leave balance</h2><p class="sub">Days remaining this year</p></div><button class="link" onclick="go('leave')">Details ${ic('arrow', 14)}</button></div>
      <div class="rings">${Object.entries(bal)
        .map(([k, v]) => ring((v.left / v.t) * 100, v.left, POLICY[k].n, POLICY[k].c))
        .join('')}</div></div>
     <div class="card"><div class="head"><div><h2>Latest payslip</h2><p class="sub">September 2026</p></div>${chip('Paid', 'ok')}</div><div class="kpi"><span class="n">${inr(sl.net)}</span></div><p class="muted small" style="margin:4px 0 14px">Credited on 30 Sep</p><button class="btn" onclick="go('payroll')">Open payslip</button></div></div>
    <div class="row c2 ppl">${celebrationsCard()}${newJoinersCard()}</div>
    <div class="row c2"><div class="card"><div class="head"><h2>Announcements</h2></div>${annList()}</div><div class="card"><div class="head"><h2>Upcoming holidays</h2></div>${holList()}</div></div>`;
  }
  const sc = scoped(),
    p = presentToday(sc),
    pl = pendingLv().length,
    ap = approvalItems().length,
    open = S.incidents.filter(i => i.st !== 'Closed').length;
  const attn = [
    ap && {
      t: 't-amber',
      i: 'cal',
      b: `${ap} approval${ap > 1 ? 's' : ''}`,
      s: 'Waiting for you',
      a: "jumpTo('approvals')"
    },
    S.role === 'admin' && {
      t: 't-brand',
      i: 'wallet',
      b: 'Payroll in review',
      s: 'Cut-off in 3 days',
      p: 'payroll'
    },
    open && {
      crit: 1,
      t: 't-red',
      i: 'shield',
      b: `${open} open incident${open > 1 ? 's' : ''}`,
      s: 'Investigation due',
      p: 'safety'
    },
    { t: 't-teal', i: 'book', b: '14 renewals due', s: 'First aid · by Oct 28', p: 'training' }
  ].filter(Boolean);
  const dep = DEPTS.map((d, i) => ({
    l: d,
    v: sc.filter(e => e.dept === d).length,
    c: DC[i]
  })).filter(x => x.v);
  const ti = dow(),
    sh = ['A', 'B', 'C', 'G'].map(k => [
      k,
      sc.filter(e => (S.roster[e.id] || [])[ti] === k).length
    ]),
    shm = Math.max(...sh.map(x => x[1]), 1);
  return (
    ph(
      `${g}, ${u.name.split(' ')[0]}`,
      `${dateStr} · ${S.role === 'admin' ? 'Company overview' : 'Production, Quality and Maintenance'}`,
      S.role === 'admin'
        ? `<button class="btn" onclick="go('payroll')">${ic('wallet', 16)}Run payroll</button><button class="btn primary" onclick="addEmp()">${ic('plus', 16)}Add employee</button>`
        : `<button class="btn primary" onclick="go('roster')">${ic('grid', 16)}Open roster</button>`
    ) +
    `<div class="attn">${attn.map(a => `<button class="att${a.crit ? ' crit' : ''}" onclick="${a.a || `go('${a.p}')`}"><span class="ai ${a.t}">${ic(a.i, 18)}</span><span><b>${a.b}</b><small>${a.s}</small></span></button>`).join('')}</div>
  <div class="row c4">
   ${kpi({ go: 'employees', l: 'Headcount', v: sc.length, icon: 'users', tone: 't-brand', spark: [10, 10, 11, 11, 12, 12, 13, 13, 14, 14, 15, 16].map(x => Math.round((x * sc.length) / 16)), p: delta('+2', true, 'up'), d: 'new this quarter' })}
   ${kpi({ go: 'attendance', l: 'Present today', v: p.pr + `<small> / ${sc.length}</small>`, icon: 'check', tone: 't-green', spark: [93, 95, 92, 96, 94, 91, 94, 95, 93, 96, 92, 95, 94, p.pct], p: delta(p.pct + '%', p.pct >= 90 ? true : null), d: 'attendance, last 14 days' })}
   ${kpi({ go: 'leave', l: 'On leave', v: p.on, icon: 'cal', tone: 't-amber', spark: [2, 1, 1, 2, 2, 1, 0, 1, 1, 2, 1, 1, 0, p.on], p: delta(pl + ' pending', null), d: 'waiting for approval' })}
   ${kpi({ go: 'recruit', l: 'Open positions', v: S.role === 'admin' ? 3 : 1, icon: 'brief', tone: 't-violet', spark: [4, 6, 5, 8, 7, 9, 8, Math.max(S.cands.length, 1)], d: S.cands.length + ' candidates in the pipeline' })}
  </div>
  <div class="row c3">${myDayCard()}${teamTodayCard()}<div class="card"><div class="head"><div><h2>Who's out</h2><p class="sub">Next two weeks</p></div><button class="link" onclick="go('leave')">Leave</button></div>${whoOut()}</div></div>
  <div class="row c2">
   <div class="card"><div class="head"><div><h2>Attendance this week</h2><p class="sub">Percent of staff present each day</p></div>${chip('Today ' + p.pct + '%', 'info', 1)}</div>${barChart(weekAtt(sc), ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], { share: 1 / 2, stackAt: 900, today: ti, target: 95, unit: '%', low: 80, label: 'Attendance this week' })}</div>
   ${approvalsCard()}
  </div>
  <div class="row c2 ppl">${celebrationsCard()}${newJoinersCard()}</div>
  <div class="row c3">
   <div class="card"><div class="head"><div><h2>Workforce</h2><p class="sub">Headcount by department</p></div></div>${donut(dep, 'people', 'deptJump')}</div>
   <div class="card"><div class="head"><div><h2>Today's shifts</h2><p class="sub">People assigned across the plant</p></div><button class="link" onclick="go('roster')">Roster</button></div><div class="list">${sh.map(([k, n]) => `<div class="li"><span class="shift ${k}" style="cursor:default;width:30px;height:28px">${k}</span><div class="grow"><div class="small">${SHIFTS[k]}</div><div class="bar ${k === 'C' ? '' : k === 'B' ? 'a' : 't'}" style="margin-top:5px"><i style="width:${(n / shm) * 100}%"></i></div></div><b>${n}</b></div>`).join('')}</div></div>
   <div class="card"><div class="head"><h2>Announcements</h2></div>${annList()}</div>
  </div>`
  );
}

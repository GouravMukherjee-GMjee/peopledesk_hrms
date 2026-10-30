/* =============== leave =============== */
function leave() {
  const u = me(),
    bal = balances(u.id),
    t = curTab('lv', isMgr() ? 'approve' : 'mine'),
    mine = S.leaves.filter(l => l.emp === u.id);
  const appr = S.leaves.filter(l => inScope('leave', l.emp) && l.emp !== u.id);
  const hd =
    t === 'approve' && isMgr()
      ? [
          { h: 'Employee', sel: 'leave' },
          { h: 'Department', xm: 1 },
          { h: 'Type' },
          { h: 'Dates' },
          { h: 'Days', c: 'num', xm: 1 },
          { h: 'Reason' },
          { h: 'Status' },
          { h: '', act: 1 }
        ]
      : [
          { h: 'Type' },
          { h: 'Dates' },
          { h: 'Days', c: 'num', xm: 1 },
          { h: 'Reason' },
          { h: 'Status' },
          { h: '', act: 1 }
        ];
  const rows = (t === 'approve' && isMgr() ? appr : mine).map(l => {
    const e = employees.find(x => x.id === l.emp),
      d =
        fdate(l.from).replace(/ 20\d\d/, '') +
        (l.days > 1 ? ' – ' + fdate(l.to).replace(/ 20\d\d/, '') : '');
    return t === 'approve' && isMgr()
      ? {
          sid: l.status === 'Pending' ? l.id : null,
          click: `leaveDetail(${l.id})`,
          cells: [
            person(e),
            esc(e.dept),
            POLICY[l.type].n,
            d,
            l.days,
            esc(l.reason),
            stChip(l.status),
            l.status === 'Pending'
              ? `<button class="btn ok sm" onclick="event.stopPropagation();decide(${l.id},'Approved')">Approve</button><button class="btn bad sm" onclick="event.stopPropagation();decide(${l.id},'Rejected')">Reject</button>`
              : ''
          ]
        }
      : {
          click: `leaveDetail(${l.id})`,
          cells: [
            POLICY[l.type].n,
            d,
            l.days,
            esc(l.reason),
            stChip(l.status),
            l.status === 'Pending'
              ? `<button class="btn sm" onclick="event.stopPropagation();cancelLeave(${l.id})">Cancel request</button>`
              : ''
          ]
        };
  });
  return (
    ph(
      'Leave',
      isMgr() ? 'Balances, requests and approvals' : 'Balances, requests and holidays',
      `<button class="btn primary" onclick="applyLeave()">${ic('plus', 16)}Apply for leave</button>`
    ) +
    `<div class="row c3 lvrow">${Object.entries(bal)
      .map(
        ([k, v]) =>
          `<div class="card lvc ${{ CL: 'k-brand', SL: 'k-teal', EL: 'k-amber' }[k]}" style="display:flex;align-items:center;gap:18px">${ring((v.left / v.t) * 100, v.left, 'days left', POLICY[k].c)}<div><h2>${POLICY[k].n}</h2><p class="sub">${v.t - v.left} of ${v.t} days used</p></div></div>`
      )
      .join('')}</div>
  <div class="card"><div class="head">${
    isMgr()
      ? tabs(
          'lv',
          [
            ['approve', `Team requests${pendingLv().length ? ` (${pendingLv().length})` : ''}`],
            ['mine', 'My requests']
          ],
          'approve'
        )
      : '<h2>My requests</h2>'
  }</div>${rtable(hd, rows, { et: 'No leave requests yet', em: 'Use Apply for leave to send one to your manager.' })}</div>
  <div class="row c3"><div class="card"><div class="head"><h2>Company holidays</h2></div>${holList()}</div>
  <div class="card"><div class="head"><div><h2>Who's out</h2><p class="sub">Next two weeks</p></div></div>${whoOut()}</div>
  <div class="card"><div class="head"><h2>Leave policy</h2></div><div class="list"><div class="li"><span class="grow">Carry forward</span><b>Earned leave, up to 30 days</b></div><div class="li"><span class="grow">Sick leave over 2 days</span><b>Medical certificate</b></div><div class="li"><span class="grow">Notice for earned leave</span><b>3 working days</b></div></div></div></div>`
  );
}
function whoOut() {
  const end = new Date(TODAY);
  end.setDate(end.getDate() + 14);
  const a = iso(TODAY),
    b = iso(end),
    u = me();
  const vis = l => {
    const e = employees.find(x => x.id === l.emp);
    return (
      S.role === 'admin' ||
      (S.role === 'manager' && scoped().some(x => x.id === l.emp)) ||
      l.emp === u.id ||
      (S.role === 'employee' && e.dept === u.dept)
    );
  };
  const list = S.leaves
    .filter(l => ['Approved', 'Pending'].includes(l.status) && l.to >= a && l.from <= b && vis(l))
    .sort((x, y) => (x.from < y.from ? -1 : 1))
    .slice(0, 5);
  if (!list.length)
    return `<div class="empty"><b>Everyone is in</b>No approved leave in the next two weeks.</div>`;
  return `<div class="list">${list
    .map(l => {
      const e = employees.find(x => x.id === l.emp),
        sh = x => fdate(x).replace(/ 20\d\d/, '');
      return `<div class="li"><div class="grow">${person(e, sh(l.from) + (l.to !== l.from ? ' – ' + sh(l.to) : ''))}</div>${l.status === 'Pending' ? chip('Pending', 'warn') : chip(POLICY[l.type].n, 'info', 1)}</div>`;
    })
    .join('')}</div>`;
}
{
  const _l = leave;
  leave = function () {
    return _l() + projCard();
  };
}

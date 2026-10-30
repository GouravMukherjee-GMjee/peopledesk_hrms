/* =============== shared logic =============== */
function presentToday(sc) {
  const on = sc.filter(e => e.status === 'On leave').length,
    ab = sc.some(e => e.id === 'E-1011') ? 1 : 0,
    pr = sc.length - on - ab;
  return { on, ab, pr, pct: Math.round((pr / Math.max(sc.length, 1)) * 100) };
}
function weekAtt(sc) {
  const base = [94, 96, 92, 95, 93, 71, 0],
    ti = dow();
  return base.map((v, i) => (i < ti ? v : i === ti ? presentToday(sc).pct : null));
}
const holList = () => {
  const list = HOLIDAYS.map(h => ({ ...h, date: new Date(NOW.getFullYear(), h.m, h.d) }))
    .filter(h => h.date >= TODAY)
    .slice(0, 4);
  return `<div class="list">${
    list
      .map(h => {
        const dd = Math.round((h.date - TODAY) / 864e5);
        return `<div class="li"><div class="grow"><b>${h.n}</b></div><span class="muted small">${h.date.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' })}</span>${chip(dd === 0 ? 'Today' : 'in ' + dd + ' d', 'mute', 1)}</div>`;
      })
      .join('') || '<div class="empty">No upcoming holidays.</div>'
  }</div>`;
};
const ANN = [
  [
    'Diwali shutdown schedule',
    'Plant lines stop Nov 7 at 14:00 and resume Nov 11. Office closed Nov 8–10.',
    '2 days ago'
  ],
  [
    'Q3 appraisal cycle opens Oct 15',
    'Managers: finish goal check-ins before the window opens.',
    '4 days ago'
  ],
  [
    'Safety week Oct 19–23',
    'Mock fire drill on Wednesday at 11:00. Attendance is mandatory.',
    '1 week ago'
  ]
];
const annList = () =>
  `<div class="list">${ANN.map((a, i) => [a, i])
    .slice(0, innerWidth <= 520 ? 2 : ANN.length)
    .map(
      ([a, i]) =>
        `<button class="annb" onclick="annView(${i})"><div class="grow"><b>${a[0]}</b><div class="muted small">${a[1]}</div></div><span class="muted small" style="white-space:nowrap">${a[2]}</span></button>`
    )
    .join('')}</div>`;
function pendingList(n) {
  const p = pendingLv().slice(0, n);
  if (!p.length)
    return `<div class="empty"><b>All caught up</b>No leave requests are waiting.</div>`;
  return `<div class="list">${p
    .map(l => {
      const e = employees.find(x => x.id === l.emp);
      return `<div class="li" style="flex-wrap:wrap"><div class="grow" style="min-width:180px">${person(e, `${POLICY[l.type].n} · ${l.days} day${l.days > 1 ? 's' : ''} · ${fdate(l.from).replace(/ 20\d\d/, '')}`)}</div><div class="acts" style="gap:6px"><button class="btn ok sm" onclick="event.stopPropagation();decide(${l.id},'Approved')" aria-label="Approve ${esc(e.name)}">${ic('check', 14)}<span class="bt">Approve</span></button><button class="btn bad sm ico" onclick="event.stopPropagation();decide(${l.id},'Rejected')" aria-label="Reject ${esc(e.name)}">${ic('x', 14)}</button></div></div>`;
    })
    .join('')}</div>`;
}

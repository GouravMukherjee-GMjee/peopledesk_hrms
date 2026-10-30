/* =============== performance =============== */
function performancePage() {
  if (S.role === 'employee' || S.tab.pf === 'me') {
    return (
      ph(
        S.role === 'employee' ? 'Goals' : 'My goals',
        'Q4 2026 · update progress before your check-in',
        ''
      ) +
      `<div class="row c21"><div class="card"><div class="head"><h2>Objectives</h2></div><div class="list">${S.goals.map(g => `<div class="li" style="display:block"><div class="tools" style="justify-content:space-between;margin-bottom:8px"><b>${esc(g.t)}</b>${chip(g.p + '%', g.p >= 80 ? 'ok' : g.p >= 50 ? 'info' : 'warn', 1)}</div><div class="bar ${g.p >= 80 ? 'g' : ''}"><i style="width:${g.p}%"></i></div><div class="tools" style="justify-content:space-between;margin:10px 0 0"><span class="muted small">Due ${fdate(g.due)}</span><input type="range" min="0" max="100" step="5" value="${g.p}" aria-label="Progress for ${esc(g.t)}" onchange="setGoal(${g.id},this.value)" style="width:170px;accent-color:var(--brand)"></div></div>`).join('')}</div></div>
    <div class="card"><div class="head"><h2>Review cycle</h2></div><div class="list"><div class="li"><span class="grow">Self review</span>${chip('Opens Oct 15', 'mute', 1)}</div><div class="li"><span class="grow">Manager review</span>${chip('Oct 25', 'mute', 1)}</div><div class="li"><span class="grow">Calibration</span>${chip('Nov 5', 'mute', 1)}</div></div><p class="muted small" style="margin-top:14px">Last rating: <b style="color:var(--text)">Exceeds expectations</b> (H1 2026)</p></div></div>`
    );
  }
  const dist = [
      ['Outstanding', 8],
      ['Exceeds', 31],
      ['Meets', 46],
      ['Needs improvement', 12],
      ['Unsatisfactory', 3]
    ],
    cyc = DEPTS.slice(0, 6).map((d, i) => [d, [88, 64, 72, 41, 95, 57][i]]);
  return (
    ph(
      'Performance',
      'H2 2026 review cycle',
      S.role === 'manager'
        ? `<button class="btn" onclick="openSub('pf','me')">My goals</button>`
        : ''
    ) +
    `<div class="row c2"><div class="card"><div class="head"><div><h2>Self reviews submitted</h2><p class="sub">By department</p></div></div><div class="list">${cyc.map(([d, p]) => `<div class="li bl"><span class="small">${d}</span><div class="bar ${p < 50 ? 'a' : ''}"><i style="width:${p}%"></i></div><b class="num">${p}%</b></div>`).join('')}</div></div>
  <div class="card"><div class="head"><div><h2>Rating distribution</h2><p class="sub">Last completed cycle, % of staff</p></div></div><div class="list">${dist.map(([l, p]) => `<div class="li bl"><span class="small">${l}</span><div class="bar t"><i style="width:${p * 2}%"></i></div><b class="num">${p}%</b></div>`).join('')}</div></div></div>
  <div class="card"><div class="head"><h2>Reviews waiting on you</h2></div>${rtable(
    [{ h: 'Employee' }, { h: 'Department' }, { h: 'Status' }, { h: '', act: 1 }],
    scoped()
      .filter(e => e.id !== me().id)
      .slice(0, 4)
      .map((e, i) => ({
        click: `reviewForm('${e.id}')`,
        cells: [
          person(e),
          e.dept,
          stChip(S.reviews[e.id] ? 'Submitted' : i % 2 ? 'Pending' : 'In progress'),
          `<button class="btn sm" onclick="event.stopPropagation();reviewForm('${e.id}')">${S.reviews[e.id] ? 'View' : 'Start review'}</button>`
        ]
      }))
  )}</div>`
  );
}
function setGoal(id, v) {
  S.goals.find(g => g.id === id).p = +v;
  render();
  toast('Progress saved');
}

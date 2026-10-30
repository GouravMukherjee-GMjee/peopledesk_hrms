/* =============== punch verification, rest gaps, leave projection, team overlap, salary bar =============== */
function punchChecks(mode) {
  const sync = (NOW.getMinutes() % 6) + 1;
  if (mode === 'Plant gate (biometric)')
    return [
      ['ok', 'Biometric device ok', 'Gate 2 · synced ' + sync + ' min ago', 'Device'],
      ['ok', 'Inside plant geofence', 'Manesar Plant · 35 m from the gate', 'Geofence']
    ];
  if (mode === 'Work from home')
    return [
      ['ok', 'Home location captured', 'Inside your approved WFH area', 'Location'],
      ['warn', 'Remote network', 'Not on the office network · your manager is notified', 'Network']
    ];
  if (mode === 'On-site visit')
    return [
      ['ok', 'GPS captured', 'Accuracy about 12 m', 'GPS'],
      ['warn', 'Outside the office geofence', 'Logged as an on-site visit', 'Geofence']
    ];
  return [
    ['ok', 'Inside the office geofence', 'Gurugram HQ · 40 m from the entrance', 'Geofence'],
    ['ok', 'Office network', 'Corporate Wi-Fi verified', 'Network']
  ];
}
const vstrip = mode =>
  `<div class="vstrip" id="vstrip" role="group" aria-label="Punch verification">${punchChecks(mode)
    .map(
      ([k, t, s, sh]) =>
        `<span class="vchip ${k}" title="${esc(t + ': ' + s)}">${ic(k === 'ok' ? 'check' : 'alert', 12)}<b><span class="lg">${t}</span><span class="sh">${sh}</span></b><small>${esc(s)}</small></span>`
    )
    .join('')}</div>`;
function vstripUpdate() {
  const e = document.getElementById('vstrip');
  if (e) e.outerHTML = vstrip(S.clock.mode);
}
/* roster: how long is the gap between two shifts? */
const restGap = (prev, next) => {
  const a = SHT[prev],
    b = SHT[next];
  if (!a || !b) return 99;
  const s = a.s[0] + a.s[1] / 60,
    e0 = a.e[0] + a.e[1] / 60,
    end = e0 <= s ? e0 + 24 : e0;
  return Math.round((24 + b.s[0] + b.s[1] / 60 - end) * 10) / 10;
};
function restCard() {
  const plant = scoped().filter(e => e.type === 'Plant'),
    start = new Date(TODAY);
  start.setDate(start.getDate() - dow());
  const days = [...Array(7)].map((_, i) => {
    const d = new Date(start);
    d.setDate(d.getDate() + i);
    return d;
  });
  const out = [];
  plant.forEach(e => {
    const r = S.roster[e.id] || [];
    for (let i = 1; i < 7; i++)
      if (
        (r[i - 1] === 'C' && ['A', 'B', 'G'].includes(r[i])) ||
        (r[i - 1] === 'B' && r[i] === 'A')
      )
        out.push({ e, i, gap: restGap(r[i - 1], r[i]), from: r[i - 1], to: r[i] });
  });
  if (!out.length) return '';
  const dn = i => days[i].toLocaleDateString('en-IN', { weekday: 'short' });
  return `<div class="card" id="restcard"><div class="head"><div><h2>Rest between shifts</h2><p class="sub">The statutory minimum is 11 hours</p></div>${chip(out.length + ' short', 'warn', 1)}</div><div class="list">${out
    .map(x => {
      const pct = Math.max(2, Math.round((Math.min(x.gap, 11) / 11) * 100)),
        short = Math.round((11 - x.gap) * 10) / 10;
      return `<div class="li" style="flex-wrap:wrap"><div class="grow" style="min-width:180px">${person(x.e, `${dn(x.i - 1)} ${x.from} → ${dn(x.i)} ${x.to}`)}</div><div style="flex:1 1 220px"><div class="rbar" role="img" aria-label="${x.gap} hours of rest, ${short} hours short of 11"><i style="width:${pct}%"></i></div><small class="muted">${x.gap} h rest · ${short} h short of 11 h</small></div>${isMgr() ? `<button class="btn sm" onclick="cycleShift('${x.e.id}',${x.i})">Change shift</button>` : ''}</div>`;
    })
    .join('')}</div></div>`;
}
/* leave: what will my balance be on a later date? */
function projRows(id, toIso) {
  const bal = balances(id),
    to = new Date(toIso + 'T00:00:00'),
    months = Math.max(
      0,
      (to.getFullYear() - TODAY.getFullYear()) * 12 + to.getMonth() - TODAY.getMonth()
    );
  return Object.keys(POLICY).map(k => {
    const acc = k === 'EL' ? months * 1.5 : 0,
      planned = S.leaves
        .filter(
          l =>
            l.emp === id &&
            l.type === k &&
            ['Approved', 'Pending'].includes(l.status) &&
            l.from > iso(TODAY) &&
            l.from <= toIso
        )
        .reduce((a, l) => a + l.days, 0),
      cap = k === 'EL' ? 30 : POLICY[k].t;
    return {
      k,
      today: bal[k].left,
      acc,
      planned,
      proj: Math.max(0, Math.min(cap, bal[k].left + acc - planned))
    };
  });
}
function projCard() {
  const id = me().id,
    end = iso(new Date(TODAY.getFullYear(), 11, 31)),
    d = S.projTo && S.projTo <= end && S.projTo > iso(TODAY) ? S.projTo : end,
    rows = projRows(id, d),
    f = x => (Math.round(x * 10) / 10).toString();
  const el = rows.find(r => r.k === 'EL');
  return `<div class="card" id="projcard"><div class="head"><div><h2>Projected leave balance</h2><p class="sub">Earned leave adds 1.5 days a month. Planned leave is subtracted.</p></div><div class="field" style="margin:0"><label class="sr" for="pj-d">Project to</label><input id="pj-d" type="date" min="${iso(new Date(TODAY.getTime() + 864e5))}" max="${end}" value="${d}" onchange="S.projTo=this.value;render()"></div></div>
   <p style="margin-bottom:10px">By <b>${fdate(d)}</b> you will have <b>${f(el.proj)} days</b> of earned leave.</p>
   ${rtable(
     [
       { h: 'Leave type' },
       { h: 'Today', c: 'num' },
       { h: 'Added', c: 'num' },
       { h: 'Planned', c: 'num' },
       { h: 'Projected', c: 'num' }
     ],
     rows.map(r => ({
       cells: [
         POLICY[r.k].n,
         f(r.today),
         r.acc ? '+' + f(r.acc) : '—',
         r.planned ? '−' + f(r.planned) : '—',
         `<b>${f(r.proj)}</b>`
       ]
     })),
     { et: 'Nothing to project' }
   )}</div>`;
}
/* leave: who else in the team is already off? */
function teamOverlap(empId, from, to, excludeId) {
  const e = employees.find(x => x.id === empId);
  return S.leaves.filter(
    l =>
      l.id !== excludeId &&
      l.emp !== empId &&
      employees.find(x => x.id === l.emp).dept === e.dept &&
      ['Approved', 'Pending'].includes(l.status) &&
      l.from <= to &&
      l.to >= from
  );
}
const overlapText = list =>
  list
    .map(l => {
      const p = employees.find(x => x.id === l.emp),
        r = l.from === l.to ? fshort(l.from) : fshort(l.from) + ' – ' + fshort(l.to);
      return `${p.name} (${r}${l.status === 'Pending' ? ', pending' : ''})`;
    })
    .join(', ');
/* pay: where does the gross go? */
function salaryBar(s) {
  const parts = [
      ['Take-home', s.net, 'var(--brand)'],
      ['Provident fund', s.pf, 'var(--teal)'],
      ['Professional tax', s.pt, 'var(--amber)'],
      ['Income tax (TDS)', s.tds, 'var(--red)']
    ].filter(p => p[1] > 0.5),
    pc = v => Math.round((v / s.m) * 1000) / 10;
  return `<div class="sbar-w"><div class="sbar" role="img" aria-label="${esc(`Of ${inr(s.m)} gross: ` + parts.map(p => `${p[0]} ${inr(p[1])} (${pc(p[1])}%)`).join(', '))}">${parts.map(p => `<i style="flex:${p[1]} 0 0;background:${p[2]}" title="${esc(p[0])} ${inr(p[1])}"></i>`).join('')}</div>
   <ul class="sleg">${parts.map(p => `<li><i style="background:${p[2]}"></i>${p[0]} <b>${inr(p[1])}</b> <span class="muted">${pc(p[1])}%</span></li>`).join('')}</ul></div>`;
}

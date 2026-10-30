/* =============== roster =============== */
function roster() {
  const plant = employees.filter(
    e => e.type === 'Plant' && (S.role === 'admin' || scoped().some(x => x.id === e.id))
  );
  const start = new Date(TODAY);
  start.setDate(start.getDate() - dow());
  const days = [...Array(7)].map((_, i) => {
      const d = new Date(start);
      d.setDate(d.getDate() + i);
      return d;
    }),
    ti = dow();
  const cover = days.map((_, i) =>
    ['A', 'B', 'C'].map(s => plant.filter(e => (S.roster[e.id] || [])[i] === s).length)
  );
  const conflict = (r, i) =>
    i > 0 &&
    ((r[i - 1] === 'C' && ['A', 'B', 'G'].includes(r[i])) || (r[i - 1] === 'B' && r[i] === 'A'));
  let nConf = 0;
  const rows = plant
    .map(e => {
      const r = S.roster[e.id] || [],
        w = r.filter(x => x !== 'O').length,
        hrs = w * 8,
        ot = Math.max(0, hrs - 48);
      return `<tr><td>${person(e, e.title)}</td>${r
        .map((s, i) => {
          const cf = conflict(r, i);
          if (cf) nConf++;
          return `<td class="${i === ti ? 'today' : ''}"><button class="shift ${s} ${cf ? 'cf' : ''}" ${isMgr() ? '' : 'disabled'} onclick="cycleShift('${e.id}',${i})" title="${cf ? 'Less than 11 hours rest before this shift' : SHIFTS[s]}" aria-label="${esc(e.name)}, ${days[i].toDateString()}, ${SHIFTS[s]}${cf ? ', rest warning' : ''}">${s}</button></td>`;
        })
        .join(
          ''
        )}<td class="num">${hrs}</td><td class="num">${ot ? chip(ot + ' h', 'warn', 1) : '—'}</td></tr>`;
    })
    .join('');
  return (
    ph(
      'Shift roster',
      `${days[0].toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })} – ${days[6].toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })} · select a shift to change it`
    ) +
    `<div class="card"><div class="head desk"><div class="legend">${Object.entries(SHIFTS)
      .map(
        ([k, v]) =>
          `<span><span class="shift ${k}" style="cursor:default;width:24px;height:22px;font-size:11px;border-radius:6px">${k}</span>&nbsp;${v}</span>`
      )
      .join('')}</div></div>
   ${nConf ? `<div class="chip warn nb" style="padding:7px 12px;margin-bottom:14px;white-space:normal;border-radius:12px;line-height:1.4;align-items:flex-start">${ic('alert', 14)}&nbsp;${nConf} shift${nConf > 1 ? 's have' : ' has'} less than 11 hours of rest. Check the outlined shifts.</div>` : ''}
   <div class="mob-only">${rosterMobile(plant, days, ti, conflict)}</div>
   <div class="tw desk"><table class="rost"><thead><tr><th>Employee</th>${days.map((d, i) => `<th class="${i === ti ? 'today' : ''}">${d.toLocaleDateString('en-IN', { weekday: 'short' })}<br><span style="font-weight:400">${d.getDate()}</span></th>`).join('')}<th class="num">Hours</th><th class="num">OT</th></tr></thead><tbody>${rows}
   <tr class="tot"><td>Headcount per shift (A / B / C)</td>${cover.map((c, i) => `<td class="small ${i === ti ? 'today' : ''}">${c.join(' / ')}</td>`).join('')}<td></td><td></td></tr></tbody></table></div>
   <p class="muted small" style="margin-top:12px">Overtime counts hours above 48 a week.</p></div>`
  );
}
function rosterMobile(plant, days, ti, conflict) {
  const di = S.rday == null ? ti : S.rday;
  const dl = days
    .map(
      (d, i) =>
        `<button class="rd ${i === di ? 'on' : ''} ${i === ti ? 'td' : ''}" onclick="S.rday=${i};render()" aria-pressed="${i === di}" aria-label="${d.toDateString()}${i === ti ? ' (today)' : ''}"><span>${d.toLocaleDateString('en-IN', { weekday: 'short' })}</span><b>${d.getDate()}</b></button>`
    )
    .join('');
  const rows = plant
    .map(e => {
      const r = S.roster[e.id] || [],
        s = r[di] || 'O',
        cf = conflict(r, di),
        w = r.filter(x => x !== 'O').length,
        ot = Math.max(0, w * 8 - 48);
      return `<div class="li"><div class="grow">${person(e, SHIFTS[s] + (cf ? ' · short rest' : ''))}</div>${ot ? chip(ot + ' h OT', 'warn', 1) : ''}<button class="shift ${s} ${cf ? 'cf' : ''}" style="width:46px;height:40px" ${isMgr() ? '' : 'disabled'} onclick="cycleShift('${e.id}',${di})" aria-label="${esc(e.name)}, ${SHIFTS[s]}${cf ? ', rest warning' : ''}">${s}</button></div>`;
    })
    .join('');
  const cov = ['A', 'B', 'C']
    .map(
      k =>
        `<span><span class="shift ${k}">${k}</span>${plant.filter(e => (S.roster[e.id] || [])[di] === k).length}</span>`
    )
    .join('');
  return `<div class="rdays" role="group" aria-label="Choose a day">${dl}</div><div class="rcov">${cov}<span>${isMgr() ? 'Tap a shift to change it' : ''}</span></div><div class="list">${rows}</div>`;
}
function cycleShift(id, i) {
  const o = ['G', 'A', 'B', 'C', 'O'],
    r = S.roster[id];
  r[i] = o[(o.indexOf(r[i]) + 1) % o.length];
  render();
}

{
  const _r = roster;
  roster = function () {
    return _r() + restCard();
  };
}

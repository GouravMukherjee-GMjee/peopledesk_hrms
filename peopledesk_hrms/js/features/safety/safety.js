/* =============== safety =============== */
function safety() {
  const open = S.incidents.filter(i => i.st !== 'Closed').length;
  return (
    ph(
      'Safety',
      'Incidents, near misses and compliance',
      `<button class="btn primary" onclick="addInc()">${ic('plus', 16)}Report incident</button>`
    ) +
    `<div class="row c4">${kpi({ l: 'Days without incident', v: '47', icon: 'shield', tone: 't-green', d: 'Lost-time incidents', bar: (47 / 90) * 100, bl: '47 of 90-day target' })}${kpi({ l: 'Open incidents', v: open, icon: 'alert', tone: 't-amber', spark: [3, 3, 3, 2, 3, 2, 2, 2, 1, 2, 1, Math.max(open, 0)], d: 'Need investigation' })}${kpi({ icon: 'check', tone: 't-teal', l: 'PPE compliance', v: '96%', spark: [90, 91, 91, 92, 92, 93, 94, 94, 95, 95, 94, 96], p: delta('+2%', true, 'up'), d: 'vs last audit' })}${kpi({ icon: 'book', tone: 't-violet', l: 'Safety training', v: '84%', p: delta('First aid behind', false, 'dn'), d: 'completion this quarter', bar: 84, bl: '84% of required courses done' })}</div>
  <div class="card"><div class="head"><div><h2>Incident log</h2><p class="sub">Report near misses too. They prevent the next injury.</p></div></div>${rtable(
    [
      { h: 'Ref' },
      { h: 'Type' },
      { h: 'Location' },
      { h: 'Severity' },
      { h: 'Status' },
      { h: 'Date' }
    ],
    S.incidents.map(i => ({
      click: `incView('${i.id}')`,
      cells: [
        `<b>${i.id}</b>`,
        i.type,
        i.loc,
        chip(i.sev, i.sev === 'High' ? 'bad' : i.sev === 'Medium' ? 'warn' : 'mute'),
        stChip(i.st),
        fdate(i.date)
      ]
    }))
  )}</div>`
  );
}
function incView(id) {
  const i = S.incidents.find(x => x.id === id),
    r = (a, b) => `<div class="li"><span class="grow muted">${a}</span><b>${b}</b></div>`;
  overlay(
    i.id + ' · ' + i.type,
    `<div class="list">${r('Location', i.loc)}${r('Reported by', esc(i.by))}${r('Date', fdate(i.date))}${r('Severity', i.sev)}${r('Status', stChip(i.st))}</div><p style="margin-top:16px">${esc(i.d)}</p>`,
    `<button class="btn" onclick="closeModal()">Close</button>${isMgr() && i.st !== 'Closed' ? `<button class="btn primary" onclick="closeInc('${id}')">Mark as closed</button>` : ''}`,
    { side: true }
  );
}
function closeInc(id) {
  S.incidents.find(x => x.id === id).st = 'Closed';
  closeModal();
  render();
  toast('Incident closed');
}
function addInc() {
  overlay(
    'Report an incident',
    `<div class="fg">${fld('it', 'Type', '<select id="it"><option>Near miss</option><option>First aid</option><option>Lost time</option><option>Property damage</option></select>')}${fld('is', 'Severity', '<select id="is"><option>Low</option><option>Medium</option><option>High</option></select>')}
   ${fld('il', 'Where did it happen?', '<input id="il" placeholder="e.g. Press Shop, Line 3">', 'full')}${fld('id', 'What happened?', '<textarea id="id" rows="4"></textarea>', 'full')}</div>`,
    `<button class="btn" onclick="closeModal()">Cancel</button><button class="btn primary" onclick="saveInc()">Submit report</button>`
  );
}
function saveInc() {
  const l = $('#il').value.trim(),
    d = $('#id').value.trim();
  if (
    ![chk('il', !!l, 'Enter the location'), chk('id', !!d, 'Describe what happened')].every(Boolean)
  )
    return;
  S.incidents.unshift({
    id: 'INC-0' + (32 + S.incidents.length - 4),
    type: $('#it').value,
    loc: l,
    sev: $('#is').value,
    date: iso(NOW),
    by: me().name,
    st: 'Open',
    d
  });
  closeModal();
  render();
  toast('Incident reported. The EHS team has been notified.');
}

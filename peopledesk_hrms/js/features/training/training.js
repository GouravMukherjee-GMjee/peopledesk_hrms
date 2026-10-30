/* =============== training =============== */
function training() {
  const soon = c => (new Date(c.exp) - NOW) / 864e5 < 60;
  if (S.role === 'employee') {
    return (
      ph('Training', 'Required courses and certificates') +
      `<div class="card"><div class="list">${S.courses
        .filter(c => ['All staff', 'Office'].includes(c.req) || c.n.startsWith('Fire'))
        .map(c => {
          const p = S.mine[c.n] || 0;
          return `<div class="li"><div class="grow"><b>${c.n}</b><div class="bar ${p === 100 ? 'g' : ''}" style="margin-top:7px;max-width:320px"><i style="width:${p}%"></i></div></div>${p === 100 ? chip('Complete', 'ok') : `<button class="btn primary sm" onclick="startCourse('${c.n}')">${p ? 'Continue' : 'Start'}</button>`}</div>`;
        })
        .join('')}</div></div>`
    );
  }
  return (
    ph(
      'Training',
      'Compliance by course. Certificates expiring within 60 days are flagged.',
      `<button class="btn" onclick="toast('Reminders sent to staff with pending courses')">Send reminders</button>`
    ) +
    `<div class="card">${rtable(
      [
        { h: 'Course', keep: 1 },
        { h: 'Applies to', xm: 1 },
        { h: 'Completion' },
        { h: 'Next expiry', xm: 1 }
      ],
      S.courses.map((c, ci) => ({
        click: `courseDetail(${ci})`,
        cells: [
          `<b>${c.n}</b>`,
          c.req,
          `<div style="display:flex;gap:10px;align-items:center;min-width:150px"><div class="bar ${c.done < 70 ? 'r' : c.done < 85 ? 'a' : 't'}" style="flex:1"><i style="width:${c.done}%"></i></div><b>${c.done}%</b></div>`,
          soon(c) ? chip(fdate(c.exp), 'warn') : fdate(c.exp)
        ]
      }))
    )}</div>`
  );
}
function startCourse(n) {
  S.mine[n] = Math.min(100, (S.mine[n] || 0) + 40);
  render();
  toast(S.mine[n] === 100 ? 'Course completed. Certificate issued.' : 'Progress saved');
}

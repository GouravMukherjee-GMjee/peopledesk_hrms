/* =============== people highlights: birthdays, work anniversaries, new joiners =============== */
function nextOcc(ds) {
  const [, m, d] = ds.split('-').map(Number);
  let dt = new Date(TODAY.getFullYear(), m - 1, d);
  if (dt < TODAY) dt = new Date(TODAY.getFullYear() + 1, m - 1, d);
  return dt;
}
function celebrations(horizon) {
  const out = [];
  employees.forEach(e => {
    const b = dobOf(e);
    if (b) {
      const dt = nextOcc(b),
        days = Math.round((dt - TODAY) / 864e5);
      if (days <= horizon) out.push({ e, kind: 'bday', days, dt });
    }
    if (e.join) {
      const jd = new Date(e.join + 'T00:00:00'),
        dt = nextOcc(e.join),
        days = Math.round((dt - TODAY) / 864e5),
        yrs = dt.getFullYear() - jd.getFullYear();
      if (yrs >= 1 && days <= horizon) out.push({ e, kind: 'anniv', days, dt, yrs });
    }
  });
  return out.sort((a, b) => a.days - b.days || a.e.name.localeCompare(b.e.name));
}
const newJoiners = () =>
  employees
    .filter(e => {
      const j = new Date(e.join + 'T00:00:00');
      return j.getFullYear() === TODAY.getFullYear() && j.getMonth() === TODAY.getMonth();
    })
    .sort((a, b) => (a.join < b.join ? -1 : 1));
function wish(key, first, kind) {
  S.wished[key] = 1;
  render();
  setTimeout(() => ping(document.querySelector('#celebrations button[disabled]')), 0);
  toast(`${kind === 'bday' ? 'Birthday' : 'Work anniversary'} wishes sent to ${first}`);
}
function celebrationsCard() {
  const all = celebrations(7),
    today = all.filter(x => x.days === 0),
    soon = all.filter(x => x.days > 0),
    mine = me().id;
  const row = x => {
    const e = x.e,
      first = e.name.split(' ')[0],
      key = e.id + x.kind + x.dt.getFullYear(),
      sent = S.wished[key],
      when =
        x.days === 1
          ? 'Tomorrow'
          : DOWN[x.dt.getDay()].slice(0, 3) +
            ' ' +
            x.dt.getDate() +
            ' ' +
            MON[x.dt.getMonth()].slice(0, 3),
      lbl = x.kind === 'bday' ? 'Birthday' : `${x.yrs} year${x.yrs > 1 ? 's' : ''} at GMux`;
    const right =
      x.days > 0
        ? chip(when, 'mute', 1)
        : e.id === mine
          ? chip("That's you", 'mute', 1)
          : `<button class="btn sm" ${sent ? 'disabled' : ''} onclick="wish('${key}','${esc(first)}','${x.kind}')">${sent ? 'Sent' : 'Wish'}</button>`;
    return `<div class="li"><span class="ai ${x.kind === 'bday' ? 't-amber' : 't-violet'}">${ic(x.kind === 'bday' ? 'gift' : 'award', 18)}</span><div class="grow"><b>${esc(e.name)}</b><div class="muted small">${lbl} · ${esc(e.dept)}</div></div>${right}</div>`;
  };
  const body = all.length
    ? `${today.length ? `<div class="csec">Today</div><div class="list">${today.map(row).join('')}</div>` : ''}${
        soon.length
          ? `<div class="csec">Next 7 days</div><div class="list">${soon
              .slice(0, 6 - Math.min(today.length, 3))
              .map(row)
              .join('')}</div>`
          : ''
      }`
    : `<div class="empty"><span class="ei">${ic('gift', 22)}</span><b>No celebrations this week</b>No birthdays or work anniversaries in the next 7 days.</div>`;
  return `<div class="card" id="celebrations"><div class="head"><div><h2>Celebrations</h2><p class="sub">Birthdays and work anniversaries</p></div>${today.length ? chip(today.length + ' today', 'warn', 1) : ''}</div>${body}</div>`;
}
function newJoinersCard() {
  const list = newJoiners(),
    mgr = S.role !== 'employee';
  const body = list.length
    ? `<div class="list">${list
        .map(e => {
          const j = new Date(e.join + 'T00:00:00'),
            fut = j > TODAY,
            can = S.role === 'admin' || (mgr && scoped().some(x => x.id === e.id));
          const inner = `${av(e.name, 34)}<span class="cn"><b>${esc(e.name)}</b><span>${esc(e.title)} · ${esc(e.dept)}</span></span>`;
          return `<div class="li">${can ? `<button class="cname" onclick="empProfile('${e.id}')">${inner}</button>` : `<div class="cname" style="cursor:default">${inner}</div>`}${chip((fut ? 'Joins ' : 'Joined ') + fshort(e.join), 'mute', 1)}</div>`;
        })
        .join('')}</div>`
    : `<div class="empty"><span class="ei">${ic('userplus', 22)}</span><b>No new joiners this month</b>New hires will show up here.</div>`;
  return `<div class="card" id="newjoiners"><div class="head"><div><h2>New joiners</h2><p class="sub">${MON[TODAY.getMonth()]} ${TODAY.getFullYear()}</p></div>${list.length ? chip(list.length + (list.length > 1 ? ' people' : ' person'), 'mute', 1) : ''}</div>${body}</div>`;
}

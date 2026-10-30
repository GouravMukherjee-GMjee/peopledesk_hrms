/* =============== home screens: building blocks =============== */
const TD = () => [TODAY.getFullYear(), TODAY.getMonth(), TODAY.getDate()];
const fshort = s => fdate(s).replace(/ 20\d\d/, '');
function jumpTo(id) {
  const e = document.getElementById(id);
  if (!e) return;
  e.scrollIntoView({
    behavior: matchMedia('(prefers-reduced-motion:reduce)').matches ? 'auto' : 'smooth',
    block: 'center'
  });
  e.classList.add('flash');
  setTimeout(() => e.classList.remove('flash'), 1500);
}
/* employee: this week's punches and hours */
function myWeekCard(id) {
  const mon = new Date(TODAY);
  mon.setDate(TODAY.getDate() - ((TODAY.getDay() + 6) % 7));
  let got = 0,
    want = 0;
  const rows = [...Array(7)].map((_, i) => {
    const dt = new Date(mon);
    dt.setDate(mon.getDate() + i);
    const o = dayInfo(id, dt.getFullYear(), dt.getMonth(), dt.getDate()),
      isT = dt.getTime() === TODAY.getTime();
    if (dt <= TODAY && ['P', 'D', 'A'].includes(o.st) && !o.live) want += o.end - o.start;
    if (o.mins != null && !o.live) got += o.mins;
    const label =
      o.st === 'L' && o.pend
        ? 'Leave pending'
        : o.hol
          ? o.hol
          : o.st === 'L' && o.leave && POLICY[o.leave.type]
            ? POLICY[o.leave.type].n
            : STN[o.st];
    let chips = chip(
      o.st === 'L' && o.pend ? 'Leave pending' : o.hol ? 'Holiday' : STN[o.st],
      STK2[o.st]
    );
    if (o.late) chips += chip('Late', 'warn', 1);
    if (o.miss) chips += chip('No clock-out', 'bad', 1);
    if (o.reg && o.reg.status === 'Pending') chips += chip('Correction pending', 'info', 1);
    const dash = '<span class="muted">—</span>';
    return {
      click: `attDay('${id}',${dt.getFullYear()},${dt.getMonth()},${dt.getDate()})`,
      cls: isT ? 'today' : '',
      cells: [
        `<span class="dcell"><span class="sd s-${o.st || 'F'}" aria-hidden="true"></span><span class="dtx"><b>${DOWN[dt.getDay()].slice(0, 3)} ${dt.getDate()}</b><small class="dlbl">${esc(label)}${o.late ? ' · late' : ''}</small></span></span>`,
        o.in != null ? tm(o.in) : dash,
        o.out != null ? tm(o.out) : o.live ? '<span class="muted">Working</span>' : dash,
        o.mins != null ? `<b>${dur(o.mins)}</b>` : dash,
        chips
      ]
    };
  });
  const pct = want ? Math.min(100, Math.round((got / want) * 100)) : 0,
    end = new Date(mon);
  end.setDate(mon.getDate() + 6);
  return `<div class="card"><div class="head"><div><h2>My attendance this week</h2><p class="sub">${fday(mon)} – ${fday(end)} · select a day for details</p></div><button class="link" onclick="go('attendance')">Full calendar</button></div>
   ${rtable([{ h: 'Day', keep: 1 }, { h: 'Clock in' }, { h: 'Clock out' }, { h: 'Hours', c: 'num' }, { h: 'Status', xm: 1 }], rows)}
   <div class="wkfoot"><div class="tools"><span class="muted">Hours worked so far</span><b>${dur(got)} <span class="muted" style="font-weight:400">of ${dur(want)}</span></b></div><div class="bar ${pct < 85 ? 'a' : ''}"><i style="width:${pct}%"></i></div></div></div>`;
}
const fday = dt => dt.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
/* employee: compact month calendar, every day opens the same day details */
function myMonthCard(id) {
  const y = TODAY.getFullYear(),
    m = TODAY.getMonth(),
    dim = new Date(y, m + 1, 0).getDate(),
    first = new Date(y, m, 1).getDay(),
    cnt = { P: 0, A: 0, L: 0, late: 0 };
  let cells = '';
  for (let i = 0; i < (first + 6) % 7; i++) cells += '<span></span>';
  for (let d = 1; d <= dim; d++) {
    const o = dayInfo(id, y, m, d),
      isT = o.dt.getTime() === TODAY.getTime();
    if (o.st === 'P' || o.st === 'D') cnt.P++;
    else if (o.st === 'A') cnt.A++;
    else if (o.st === 'L' && !o.pend) cnt.L++;
    if (o.late) cnt.late++;
    cells += `<button class="md ${o.st || 'F'}${isT ? ' today' : ''}${o.late ? ' late' : ''}" onclick="attDay('${id}',${y},${m},${d})">${d}<span class="sr">, ${esc(o.hol || STN[o.st])}${o.late ? ', late' : ''}. Open details</span></button>`;
  }
  const nh = HOLIDAYS.map(h => ({ ...h, date: new Date(TODAY.getFullYear(), h.m, h.d) })).filter(
      h => h.date >= TODAY
    )[0],
    nd = nh ? Math.round((nh.date - TODAY) / 864e5) : 0;
  const nextH = nh
    ? `<div class="mnext">${ic('cal', 16)}<span>Next holiday: <b>${esc(nh.n)}</b>, ${nh.date.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' })} · ${nd === 0 ? 'today' : 'in ' + nd + ' d'}</span></div>`
    : '';
  return `<div class="card mcard"><div class="head"><div><h2>${MON[m]} ${y}</h2><p class="sub">Your attendance this month</p></div><button class="link" onclick="go('attendance')">Calendar</button></div>
   <div class="mstat">${[
     ['Present', cnt.P, 'green'],
     ['Absent', cnt.A, 'red'],
     ['Leave', cnt.L, 'brand'],
     ['Late', cnt.late, 'amber']
   ]
     .map(
       ([l, n, t]) =>
         `<div class="ms"><b>${n}</b><span><i style="background:var(--${t})"></i>${l}</span></div>`
     )
     .join('')}</div>
   <div class="mcal" role="group" aria-label="${MON[m]} ${y} attendance">${['M', 'T', 'W', 'T', 'F', 'S', 'S'].map(x => `<span class="dh" aria-hidden="true">${x}</span>`).join('')}${cells}</div>${nextH}</div>`;
}
/* employee: everything that is waiting on them or on their manager */
function attentionItems(id) {
  const it = [],
    e = employees.find(x => x.id === id);
  for (let k = 1; k <= 7; k++) {
    const dt = new Date(TODAY);
    dt.setDate(TODAY.getDate() - k);
    const y = dt.getFullYear(),
      m = dt.getMonth(),
      d = dt.getDate(),
      o = dayInfo(id, y, m, d),
      ds = DOWN[dt.getDay()].slice(0, 3) + ' ' + d + ' ' + MON[m].slice(0, 3);
    if (o.reg && o.reg.status === 'Pending') continue;
    if (o.st === 'A')
      it.push({
        pri: 1,
        tone: 'red',
        icon: 'alert',
        t: `Absent on ${ds}`,
        s: 'No punches recorded. Request a correction if this is wrong.',
        cta: 'Fix',
        act: `attReg('${id}',${y},${m},${d})`
      });
    else if (o.miss)
      it.push({
        pri: 1,
        tone: 'red',
        icon: 'clock',
        t: `Missing clock-out on ${ds}`,
        s: 'Add the time so your hours and pay are correct.',
        cta: 'Fix',
        act: `attReg('${id}',${y},${m},${d})`
      });
  }
  S.regs
    .filter(r => r.emp === id && r.status === 'Pending')
    .forEach(r => {
      const dt = new Date(r.date + 'T00:00:00');
      it.push({
        pri: 3,
        tone: 'amber',
        icon: 'clock',
        t: `Correction for ${fshort(r.date)} is pending`,
        s: `${r.type} · waiting for your manager`,
        cta: 'View',
        act: `attDay('${id}',${dt.getFullYear()},${dt.getMonth()},${dt.getDate()})`
      });
    });
  S.leaves
    .filter(l => l.emp === id && l.status === 'Pending')
    .forEach(l =>
      it.push({
        pri: 3,
        tone: 'amber',
        icon: 'cal',
        t: `Leave ${fshort(l.from)}${l.to !== l.from ? ' – ' + fshort(l.to) : ''} is waiting for approval`,
        s: `${POLICY[l.type].n} · ${l.days} day${l.days > 1 ? 's' : ''}`,
        cta: 'View',
        act: `leaveDetail(${l.id})`
      })
    );
  S.claims
    .filter(c => c.emp === id && c.st === 'Pending')
    .forEach(c =>
      it.push({
        pri: 3,
        tone: 'teal',
        icon: 'receipt',
        t: `Expense claim of ${inr(c.amt)} is pending`,
        s: `${c.cat} · ${c.note}`,
        cta: 'View',
        act: `claimDetail(${c.id})`
      })
    );
  S.courses
    .filter(c => ['All staff', e.type === 'Plant' ? 'Plant' : 'Office'].includes(c.req))
    .forEach(c => {
      const p = S.mine[c.n] || 0;
      if (p < 100)
        it.push({
          pri: 2,
          tone: 'brand',
          icon: 'book',
          t: `Finish “${c.n}”`,
          s: `${p}% done · renew by ${fshort(c.exp)}`,
          cta: 'Continue',
          act: "go('training')"
        });
    });
  vdocsOf(e)
    .filter(d => d.st === 'Re-upload requested')
    .forEach(d =>
      it.push({
        pri: 1,
        tone: 'red',
        icon: 'file',
        t: `HR needs a new ${d.n}`,
        s: d.note || 'The file could not be verified',
        cta: 'Upload',
        act: `uploadDoc('${id}','${d.k}')`
      })
    );
  assetsOf(id)
    .cur.filter(a => !a.ack)
    .forEach(a => {
      const i = [...a.hist].reverse().find(h => h.t === 'Issued' && h.emp === id);
      it.push({
        pri: 2,
        tone: 'brand',
        icon: 'laptop',
        t: `Confirm you received your ${aname(a)}`,
        s: `${a.type} · issued ${i ? fshort(i.date) : ''} · serial ${a.serial}`,
        cta: 'Confirm',
        act: `ackAsset('${a.id}')`
      });
    });
  return it.sort((a, b) => a.pri - b.pri);
}
function needsAttentionCard(id) {
  const all = attentionItems(id),
    items = all.slice(0, 5);
  if (!items.length)
    return `<div class="card"><div class="head"><div><h2>Needs your attention</h2><p class="sub">Things waiting on you</p></div></div><div class="empty"><span class="ei">${ic('check', 22)}</span><b>You're all caught up</b>Nothing needs your action right now.</div></div>`;
  return `<div class="card"><div class="head"><div><h2>Needs your attention</h2><p class="sub">Open items for you and your manager</p></div>${chip(all.length + (all.length > 1 ? ' items' : ' item'), 'warn', 1)}</div>
   <div class="list">${items.map(x => `<div class="li${x.pri === 1 ? ' crit' : ''}" style="flex-wrap:wrap"><span class="ai t-${x.tone}">${ic(x.icon, 18)}</span><div class="grow" style="min-width:150px"><b>${x.t}</b><div class="muted small">${esc(x.s)}</div></div><button class="btn sm" onclick="${x.act}">${x.cta}</button></div>`).join('')}</div>${all.length > 5 ? `<p class="muted small" style="margin-top:10px">+ ${all.length - 5} more</p>` : ''}</div>`;
}
/* manager and admin: their own clock-in, without leaving home */
function myDayCard() {
  const c = S.clock,
    u = me(),
    o = dayInfo(u.id, ...TD()),
    state = c.out
      ? chip('Day complete', 'ok')
      : c.in
        ? chip('Clocked in', 'ok')
        : chip('Not clocked in', 'mute');
  return `<div class="card myday"><div class="head"><div><h2>My day</h2><p class="sub">${esc(o.shiftTxt)}</p></div><button class="link" onclick="go('attendance')">My attendance</button></div>
   <div class="mdt">${state}${c.in ? `<span class="muted small">${esc(c.mode)}</span>` : ''}</div><div class="timer sm" id="timer">00:00:00</div><div class="ck-sub" id="tsub"></div>${vstrip(c.mode)}
   <div class="field" style="margin-bottom:14px"><label for="mode">Work mode</label><select id="mode" onchange="S.clock.mode=this.value;vstripUpdate()" ${c.in ? 'disabled' : ''}>${['Office', 'Plant gate (biometric)', 'Work from home', 'On-site visit'].map(m => `<option ${c.mode === m ? 'selected' : ''}>${m}</option>`).join('')}</select></div>
   <button class="btn big primary full" onclick="toggleClock()" ${c.out ? 'disabled' : ''}>${c.out ? 'Done for today' : c.in ? 'Clock out' : 'Clock in'}</button></div>`;
}
/* manager and admin: who is absent, late or on leave right now */
function teamTodayCard() {
  const team = scoped().filter(e => e.id !== me().id),
    td = TD(),
    rows = team.map(e => dayInfo(e.id, ...td)),
    n = { P: 0, late: 0, L: 0, A: 0 };
  rows.forEach(o => {
    if (o.st === 'P' || o.st === 'D') n.P++;
    if (o.late) n.late++;
    if (o.st === 'L') n.L++;
    if (o.st === 'A') n.A++;
  });
  const key = o => (o.st === 'A' ? 0 : o.late ? 1 : 2),
    ex = rows
      .filter(o => o.st === 'A' || o.st === 'L' || o.late)
      .sort((a, b) => key(a) - key(b))
      .slice(0, 5);
  const row = o => {
    const e = o.e,
      chipx =
        o.st === 'A'
          ? chip('Absent', 'bad')
          : o.st === 'L'
            ? chip('On leave', 'info')
            : chip('Late ' + o.late + ' min', 'warn'),
      sub =
        o.st === 'A'
          ? 'No punch recorded'
          : o.st === 'L'
            ? o.leave && POLICY[o.leave.type]
              ? POLICY[o.leave.type].n
              : 'Leave'
            : `In at ${tm(o.in)}`;
    return `<button class="cname ex" onclick="attDay('${e.id}',${td.join(',')})">${av(e.name, 34)}<span class="cn"><b>${esc(e.name)}</b><span>${esc(e.dept)} · ${sub}</span></span>${chipx}</button>`;
  };
  return `<div class="card"><div class="head"><div><h2>Team today</h2><p class="sub">${team.length} people · select a person for details</p></div><button class="link" onclick="go('attendance')">Details</button></div>
   <div class="mstat">${[
     ['Present', n.P, 'green'],
     ['Late', n.late, 'amber'],
     ['On leave', n.L, 'brand'],
     ['Absent', n.A, 'red']
   ]
     .map(
       ([l, v, t]) =>
         `<div class="ms"><b>${v}</b><span><i style="background:var(--${t})"></i>${l}</span></div>`
     )
     .join('')}</div>
   ${ex.length ? `<div class="list">${ex.map(row).join('')}</div>` : `<div class="empty"><span class="ei">${ic('check', 22)}</span><b>Everyone is in</b>No absences or late arrivals today.</div>`}</div>`;
}
/* manager and admin: leave, attendance corrections and expense claims in one list */

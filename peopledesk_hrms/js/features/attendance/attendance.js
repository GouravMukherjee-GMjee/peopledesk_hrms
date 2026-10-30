/* =============== attendance =============== */
function clockCard(dark, title, sub) {
  const c = S.clock,
    state = c.out
      ? chip('Day complete', dark ? 'glass' : 'ok')
      : c.in
        ? chip('Clocked in', dark ? 'glass' : 'ok')
        : chip('Not clocked in', dark ? 'glass' : 'mute');
  return `<div class="clockc ${dark ? 'dark' : ''}"><div>${title ? `<h1>${title}</h1><p>${sub}</p><div style="height:14px"></div>` : ''}<div style="display:flex;gap:10px;align-items:center;margin-bottom:4px">${state}${c.in ? `<span class="small" style="opacity:.8">${esc(c.mode)}</span>` : ''}</div><div class="timer" id="timer">00:00:00</div><div class="ck-sub" id="tsub"></div>${vstrip(c.mode)}</div>
   <div class="ck-r"><div class="field" style="margin:0;min-width:180px"><label for="mode" style="${dark ? 'color:#C1CBE2;' : ''}font-weight:500;font-size:13px">Work mode</label><select id="mode" onchange="S.clock.mode=this.value;vstripUpdate()" ${c.in ? 'disabled' : ''}>${['Office', 'Plant gate (biometric)', 'Work from home', 'On-site visit'].map(m => `<option ${c.mode === m ? 'selected' : ''}>${m}</option>`).join('')}</select></div>
   <button class="btn big ${dark ? 'light' : 'primary'}" onclick="toggleClock()" ${c.out ? 'disabled' : ''}>${c.out ? 'Done for today' : c.in ? 'Clock out' : 'Clock in'}</button></div></div>`;
}
function toggleClock() {
  const c = S.clock;
  if (!c.in) {
    c.in = new Date();
    toast(
      'Clocked in at ' +
        hm(c.in) +
        (c.in.getHours() * 60 + c.in.getMinutes() > 555 ? '. Marked late (after 09:15).' : '')
    );
  } else if (!c.out) {
    c.out = new Date();
    toast('Clocked out at ' + hm(c.out));
  }
  render();
}
function tick() {
  const t = $('#timer');
  if (!t) return;
  const c = S.clock,
    sub = $('#tsub');
  if (!c.in) {
    t.textContent = '00:00:00';
    if (sub) sub.textContent = 'Tap Clock in when you start your shift';
    return;
  }
  const end = c.out || new Date(),
    s = Math.max(0, Math.floor((end - c.in) / 1000));
  t.textContent =
    pad(Math.floor(s / 3600)) + ':' + pad(Math.floor((s % 3600) / 60)) + ':' + pad(s % 60);
  if (sub)
    sub.textContent = c.out
      ? `Worked ${Math.floor(s / 3600)}h ${Math.floor((s % 3600) / 60)}m today`
      : 'Clocked in at ' + hm(c.in) + ' · location verified (simulated)';
}
setInterval(tick, 1000);
/* ---- attendance: one model for every day, used by the calendar, the day view and the team table ---- */
const MON = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];
const DOWN = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const SHT = {
  G: { s: [9, 0], e: [18, 0], n: 'General' },
  A: { s: [6, 0], e: [14, 0], n: 'Morning' },
  B: { s: [14, 0], e: [22, 0], n: 'Afternoon' },
  C: { s: [22, 0], e: [6, 0], n: 'Night' }
};
const STN = {
  N: 'Not joined',
  P: 'Present',
  A: 'Absent',
  L: 'On leave',
  H: 'Holiday',
  W: 'Weekly off',
  D: 'Half day',
  T: 'Not clocked in',
  '': 'Upcoming'
};
const STK2 = {
  N: 'mute',
  P: 'ok',
  A: 'bad',
  L: 'info',
  H: 'warn',
  W: 'mute',
  D: 'warn',
  T: 'mute',
  '': 'mute'
};
const tm = min => {
  const x = ((Math.round(min) % 1440) + 1440) % 1440;
  return pad(Math.floor(x / 60)) + ':' + pad(x % 60);
};
const dur = min => {
  const h = Math.floor(min / 60),
    m = Math.round(min % 60);
  return h ? `${h}h ${pad(m)}m` : `${m}m`;
};
const toMin = s => {
  const [h, m] = s.split(':').map(Number);
  return h * 60 + m;
};
const hsh = (id, y, m, d) => {
  let h = 7;
  for (const ch of id) h = (h * 31 + ch.charCodeAt(0)) % 100003;
  return (h + d * 131 + m * 37 + y * 3) % 9973;
};
const baseShift = e => {
  if (e.type !== 'Plant') return 'G';
  const r = S.roster[e.id] || [];
  return r.find(x => x && x !== 'O') || 'G';
};
const leaveOn = (id, dt) => {
  const s = iso(dt);
  return S.leaves.find(
    l =>
      l.emp === id &&
      l.status !== 'Rejected' &&
      l.status !== 'Cancelled' &&
      l.from <= s &&
      s <= l.to
  );
};
function dayInfo(empId, y, m, d) {
  const e = employees.find(x => x.id === empId),
    dt = new Date(y, m, d),
    s = iso(dt),
    plant = e.type === 'Plant';
  const sh = SHT[baseShift(e)],
    start = sh.s[0] * 60 + sh.s[1],
    end = sh.e[0] * 60 + sh.e[1] + (sh.e[0] <= sh.s[0] ? 1440 : 0);
  const o = {
    empId,
    e,
    y,
    m,
    d,
    dt,
    iso: s,
    st: '',
    in: null,
    out: null,
    mins: null,
    late: 0,
    early: 0,
    ot: 0,
    mode: '',
    loc: '',
    note: '',
    start,
    end,
    shiftName: sh.n,
    shiftTxt: `${sh.n} · ${tm(start)}–${tm(end)}`,
    leave: null,
    pend: false,
    hol: null,
    live: false,
    miss: false,
    reg: null,
    ov: false
  };
  if (e.join && dt < new Date(e.join + 'T00:00:00')) {
    o.st = 'N';
    o.note = 'Not joined yet';
    return o;
  } // nothing before the joining date
  const hol = HOLIDAYS.find(h => h.m === m && h.d === d);
  if (hol) {
    o.st = 'H';
    o.hol = hol.n;
    o.offWork = offWorkOf(o);
    return o;
  }
  if (!worksDay(e, dt)) {
    o.st = 'W';
    o.offWork = offWorkOf(o);
    return o;
  }
  const lv = leaveOn(empId, dt);
  if (lv) {
    o.st = 'L';
    o.leave = lv;
    o.pend = lv.status === 'Pending';
    return o;
  }
  o.reg = S.regs.filter(r => r.emp === empId && r.date === s).slice(-1)[0] || null;
  if (dt > TODAY) return o;
  const hh = hsh(empId, y, m, d),
    place = mode => {
      o.mode = mode;
      o.loc =
        mode === 'Work from home'
          ? 'Home · IP verified'
          : plant
            ? 'Manesar Plant · Gate 2'
            : 'Gurugram HQ · geofence verified';
    };
  if (dt.getTime() === TODAY.getTime()) {
    const nowM = NOW.getHours() * 60 + NOW.getMinutes();
    if (empId === me().id) {
      const c = S.clock;
      if (!c.in) {
        o.st = 'T';
        return o;
      }
      o.st = 'P';
      o.in = c.in.getHours() * 60 + c.in.getMinutes();
      place(c.mode);
      const t = c.out || new Date(),
        outM = t.getHours() * 60 + t.getMinutes();
      if (c.out) o.out = outM;
      else o.live = true;
      o.mins = Math.max(0, outM - o.in);
    } else {
      if (e.status === 'On leave') {
        o.st = 'L';
        o.leave = { type: 'SL', status: 'Approved', reason: 'Medical leave', from: s, to: s };
        return o;
      }
      if (empId === 'E-1011') {
        o.st = 'A';
        return o;
      }
      o.st = 'P';
      o.in = start - 10 + (hh % 22);
      o.live = true;
      place(plant ? 'Plant gate (biometric)' : 'Office');
      o.mins = Math.max(0, nowM - o.in);
    }
    dayFlags(o);
    return o;
  }
  const ov = S.dayOv[empId + '|' + s],
    reg = o.reg;
  const forceP = !!reg && ['Missed punch-out', 'Late mark waiver'].includes(reg.type);
  const r = hh % 13;
  let kind = 'P';
  if (!ov && !forceP) {
    if (r === 0) kind = 'A';
    else if (r === 4 || (r === 9 && d % 2)) {
      o.st = 'L';
      o.leave = {
        type: 'CL',
        status: 'Approved',
        reason: 'Casual leave',
        from: s,
        to: s,
        synthetic: true
      };
      return o;
    } else if (hh % 17 === 5) kind = 'D';
  }
  if (kind === 'A') {
    o.st = 'A';
    return o;
  }
  o.st = kind;
  const late =
    !ov && (hh % 7 === 2 || (reg && reg.type === 'Late mark waiver' && reg.status !== 'Approved'));
  const early = !ov && hh % 11 === 3;
  place(plant ? 'Plant gate (biometric)' : hh % 9 === 1 ? 'Work from home' : 'Office');
  o.in = start + (late ? 18 + (hh % 22) : -12 + (hh % 19));
  if (ov) {
    o.in = toMin(ov.in);
    o.out = toMin(ov.out);
    if (o.out <= o.in) o.out += 1440;
    o.ov = true;
    o.note = ov.note || 'Regularized';
  } else if (kind === 'D') {
    o.out = o.in + 240 + (hh % 25);
    o.note = 'Half day';
  } else if (reg && reg.type === 'Missed punch-out' && reg.status !== 'Approved') {
    o.out = null;
    o.miss = true;
  } else o.out = end + (early ? -(55 + (hh % 35)) : hh % 4 === 1 ? 45 + (hh % 9) * 15 : hh % 44);
  if (o.out != null) o.mins = o.out - o.in;
  dayFlags(o, ov && ov.waiveLate);
  if (ov && ov.waiveLate) o.note = 'Late mark waived';
  return o;
}
function dayCell(o) {
  const lab =
    {
      P: 'Present',
      A: 'Absent',
      L: o.pend ? 'Pending' : 'Leave',
      H: 'Holiday',
      D: 'Half day',
      T: 'Not in yet'
    }[o.st] || '';
  const sh = { P: 'P', A: 'A', L: 'L', H: 'H', D: '½', T: '·' }[o.st] || '';
  const pend = o.reg && o.reg.status === 'Pending';
  const sr = `, ${DOWN[o.dt.getDay()]} ${o.d} ${MON[o.m]}${o.hol ? ', ' + o.hol : ''}${o.in != null ? `, in ${tm(o.in)}` : ''}${o.out != null ? `, out ${tm(o.out)}` : ''}${o.late ? ', late' : ''}${pend ? ', correction pending' : ''}. Open details`;
  const mk =
    (o.late ? '<i class="mk" title="Late"></i>' : '') +
    (pend ? '<i class="mk q" title="Correction pending"></i>' : '');
  return `<button class="d ${o.st || 'F'}${o.pend ? ' pend' : ''}${o.dt.getTime() === TODAY.getTime() ? ' today' : ''}" onclick="attDay('${o.empId}',${o.y},${o.m},${o.d})"><b>${o.d}</b><span data-s="${sh}">${lab}</span><span class="sr">${esc(sr)}</span>${mk ? `<em class="mks">${mk}</em>` : ''}</button>`;
}
function calMove(n) {
  S.calOff = n === 0 ? 0 : Math.max(-12, Math.min(6, S.calOff + n));
  render();
}
function attendance() {
  const u = me(),
    team = scoped(),
    canPick = isMgr();
  const eid = canPick && S.attEmp && team.some(x => x.id === S.attEmp) ? S.attEmp : u.id,
    pe = employees.find(x => x.id === eid),
    other = eid !== u.id;
  const b = new Date(NOW.getFullYear(), NOW.getMonth() + S.calOff, 1),
    y = b.getFullYear(),
    m = b.getMonth(),
    dim = new Date(y, m + 1, 0).getDate(),
    first = new Date(y, m, 1).getDay();
  const cells = [],
    cnt = { P: 0, A: 0, L: 0, late: 0 };
  for (let i = 0; i < (first + 6) % 7; i++) cells.push('<div></div>');
  for (let d = 1; d <= dim; d++) {
    const o = dayInfo(eid, y, m, d);
    if (o.st === 'P' || o.st === 'D') cnt.P++;
    else if (o.st === 'A') cnt.A++;
    else if (o.st === 'L' && !o.pend) cnt.L++;
    if (o.late) cnt.late++;
    cells.push(dayCell(o));
  }
  const c = S.clock,
    td = TD();
  const sd =
      S.attDate && /^\d{4}-\d{2}-\d{2}$/.test(S.attDate)
        ? new Date(S.attDate + 'T00:00:00')
        : TODAY,
    sdv = [sd.getFullYear(), sd.getMonth(), sd.getDate()],
    isT = sd.getTime() === TODAY.getTime();
  let acts;
  if (!other)
    acts = [
      c.in && { t: 'Clock in', w: hm(c.in), s: c.mode },
      c.out && { t: 'Clock out', w: hm(c.out), s: 'Shift ended' }
    ].filter(Boolean);
  else {
    const o = dayInfo(eid, ...td);
    acts = [
      o.in != null && { t: 'Clock in', w: tm(o.in), s: o.mode },
      o.out != null && { t: 'Clock out', w: tm(o.out), s: 'Shift ended' }
    ].filter(Boolean);
  }
  const me0 = dayInfo(eid, ...td);
  const picker = canPick
    ? `<div class="card pickbar"><div class="field" style="margin:0"><label for="atte">Show attendance for</label><select id="atte" onchange="S.attEmp=this.value;S.calOff=0;render()"><option value="">Me (${esc(u.name)})</option>${team
        .filter(e => e.id !== u.id)
        .map(
          e =>
            `<option value="${e.id}" ${e.id === eid ? 'selected' : ''}>${esc(e.name)} · ${esc(e.dept)}</option>`
        )
        .join(
          ''
        )}</select></div>${other ? `<button class="btn" onclick="S.attEmp='';render()">Back to my attendance</button>` : ''}</div>`
    : '';
  const rows = team.map(e => dayInfo(e.id, ...sdv)),
    n = { P: 0, late: 0, L: 0, A: 0 };
  rows.forEach(o => {
    if (o.st === 'P' || o.st === 'D') n.P++;
    if (o.late) n.late++;
    if (o.st === 'L') n.L++;
    if (o.st === 'A') n.A++;
  });
  return (
    ph(
      'Attendance',
      other
        ? `${pe.name} · ${pe.title} · ${MON[NOW.getMonth()]} ${NOW.getFullYear()}`
        : `${MON[NOW.getMonth()]} ${NOW.getFullYear()} · ${me0.shiftTxt}`
    ) +
    `${other ? '' : `<div class="card">${clockCard(false)}</div>`}${picker}
  <div class="row c4 statrow">${(() => {
    const D = cnt.P + cnt.A + cnt.L || 1,
      sh = x => Math.round((x / D) * 100) + '% of days';
    return [
      kpi({
        l: 'Days present',
        v: cnt.P,
        icon: 'check',
        tone: 't-green',
        bar: (cnt.P / D) * 100,
        bl: sh(cnt.P),
        d: 'this month'
      }),
      kpi({
        l: 'Absent',
        v: cnt.A,
        icon: 'x',
        tone: 't-red',
        bar: (cnt.A / D) * 100,
        bl: sh(cnt.A),
        d: 'without leave'
      }),
      kpi({
        l: 'On leave',
        v: cnt.L,
        icon: 'cal',
        tone: 't-brand',
        bar: (cnt.L / D) * 100,
        bl: sh(cnt.L),
        d: 'approved leave'
      }),
      kpi({
        l: 'Late marks',
        v: cnt.late,
        icon: 'clock',
        tone: 't-amber',
        bar: (cnt.late / D) * 100,
        bl: sh(cnt.late),
        d: 'arrived after grace time'
      })
    ].join('');
  })()}</div>
  <div class="row c21">
   <div class="card"><div class="head"><div><h2>${other ? esc(pe.name.split(' ')[0]) + "'s calendar" : 'Monthly calendar'}</h2><p class="sub">${other ? 'Read only · ' : ''}Select a day to see punch times and details</p></div>
     <div class="mnv"><button class="icon-btn" onclick="calMove(-1)" aria-label="Previous month">${ic('chev', 16)}</button><b>${MON[m]} ${y}</b><button class="icon-btn" onclick="calMove(1)" aria-label="Next month">${ic('chev', 16)}</button>${S.calOff ? `<button class="btn sm" onclick="calMove(0)">This month</button>` : ''}</div><button class="icon-btn" onclick="attCSV('${eid}')" aria-label="Download ${MON[m]} ${y} as CSV" title="Download as CSV">${ic('download', 16)}</button></div>
    <div class="legend lgd"><span><i style="background:var(--green-soft)"></i>Present</span><span><i style="background:var(--red-soft)"></i>Absent</span><span><i style="background:var(--brand-soft)"></i>Leave</span><span><i style="background:var(--amber-soft)"></i>Half day or holiday</span><span><span class="mk"></span>Late</span><span><span class="mk q"></span>Correction pending</span></div>
    <div class="cal" role="group" aria-label="${MON[m]} ${y} attendance">${['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(x => `<div class="dh">${x}</div>`).join('')}${cells.join('')}</div></div>
   <div class="card"><div class="head"><div><h2>Today's punches</h2><p class="sub">${other ? esc(pe.name) + ' · ' : ''}${NOW.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</p></div><button class="link" onclick="attDay('${eid}',${td.join(',')})">Details</button></div>${acts.length ? `<div class="tl">${acts.map(a => `<div class="ev"><span class="pt"></span><div><b>${a.t} · ${a.w}</b><div class="muted small">${esc(a.s)}</div></div></div>`).join('')}</div>` : `<div class="empty"><b>No punches yet</b>${other ? 'Nothing recorded for ' + esc(pe.name.split(' ')[0]) + ' today.' : 'Clock in to start your day.'}</div>`}</div>
  </div>
  ${regCard()}
  ${
    canPick
      ? `<div class="card"><div class="head"><div><h2>${isT ? 'Team today' : 'Team attendance'}</h2><p class="sub">${team.length} people · ${isT ? 'today' : fdate(iso(sd))} · select a person for their day details</p></div>
    <div class="tools" style="margin:0;gap:8px;flex-wrap:nowrap"><div class="field" style="margin:0"><label class="sr" for="tdate">Date</label><input id="tdate" type="date" value="${iso(sd)}" onchange="S.attDate=this.value===iso(TODAY)?'':this.value;render()"></div>${isT ? '' : `<button class="btn sm" onclick="S.attDate='';render()">Today</button>`}<button class="btn sm" onclick="teamCSV()">${ic('download', 14)}Download CSV</button></div></div>
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
   ${rtable(
     [
       { h: 'Employee', keep: 1 },
       { h: 'Department', xm: 1 },
       { h: 'First punch', c: 'num' },
       { h: 'Hours', c: 'num', xm: 1 },
       { h: 'Status' }
     ],
     team.map((e, i) => {
       const o = rows[i];
       return {
         click: `attDay('${e.id}',${sdv.join(',')})`,
         cells: [
           person(e),
           e.dept,
           o.in != null ? tm(o.in) : '—',
           o.mins != null ? dur(o.mins) : '—',
           chip(STN[o.st], STK2[o.st])
         ]
       };
     }),
     { et: 'No team members' }
   )}</div>`
      : ''
  }`
  );
}
/* ---- day details ---- */
function attDay(empId, y, m, d) {
  const nd = new Date(y, m, d);
  y = nd.getFullYear();
  m = nd.getMonth();
  d = nd.getDate();
  S.dayOpen = [empId, y, m, d];
  const o = dayInfo(empId, y, m, d),
    e = o.e,
    self = empId === me().id,
    pending = o.reg && o.reg.status === 'Pending';
  let chips = chip(o.st === 'L' && o.pend ? 'Leave pending' : STN[o.st], STK2[o.st]);
  if (o.late) chips += ' ' + chip('Late by ' + o.late + ' min', 'warn', 1);
  if (o.early) chips += ' ' + chip('Left ' + o.early + ' min early', 'warn', 1);
  if (o.ot) chips += ' ' + chip('Overtime ' + dur(o.ot), 'info', 1);
  if (o.miss) chips += ' ' + chip('Missing clock-out', 'bad');
  if (o.reg)
    chips += ' ' + chip('Correction ' + o.reg.status.toLowerCase(), STK[o.reg.status] || 'mute');
  const tile = (l, v, s, cls) =>
    `<div class="dtile"><span>${l}</span><b>${v}</b><small class="${cls || ''}">${s || '&nbsp;'}</small></div>`;
  const row = (a, b) =>
    `<div class="li"><span class="muted grow">${a}</span><b style="text-align:right">${b}</b></div>`;
  let tiles = '',
    rows = [];
  if (['P', 'D', 'A', 'T', ''].includes(o.st)) {
    const inV = o.in != null ? tm(o.in) : '—',
      outV = o.out != null ? tm(o.out) + (o.out >= 1440 ? ' +1' : '') : o.live ? 'Working' : '—';
    const inS =
      o.in != null
        ? o.late
          ? 'Late by ' + o.late + ' min'
          : 'On time'
        : o.st === 'A'
          ? 'No punch recorded'
          : o.st === 'T'
            ? 'Shift starts ' + tm(o.start)
            : 'Scheduled ' + tm(o.start);
    const outS =
      o.out != null
        ? o.early
          ? 'Early by ' + o.early + ' min'
          : o.ot
            ? 'Overtime ' + dur(o.ot)
            : 'Shift ends ' + tm(o.end)
        : o.live
          ? 'Still on shift'
          : o.miss
            ? 'Not recorded'
            : o.st === '' || o.st === 'T'
              ? 'Scheduled ' + tm(o.end)
              : '';
    const len = o.end - o.start,
      hS = o.live
        ? 'So far today'
        : o.mins != null
          ? o.st === 'D'
            ? 'Half day'
            : o.mins >= len - 15
              ? 'Full shift'
              : 'Short by ' + dur(len - o.mins)
          : '';
    tiles = `<div class="dtiles">${tile('Clock in', inV, inS, o.late ? 'bad' : '')}${tile('Clock out', outV, outS, o.early || o.miss ? 'bad' : '')}${tile('Hours worked', o.mins != null ? dur(o.mins) : '—', hS)}${tile('Shift', o.shiftName, `${tm(o.start)}–${tm(o.end)}`)}</div>`;
    if (o.mode) rows.push(row('Work mode', esc(o.mode)), row('Location', esc(o.loc)));
    if (o.note) rows.push(row('Note', esc(o.note)));
  }
  if (o.st === 'L' && o.leave) {
    const L = o.leave;
    rows.push(
      row('Leave type', POLICY[L.type] ? POLICY[L.type].n : 'Leave'),
      row('Request', stChip(L.status)),
      row('Reason', esc(L.reason || '—'))
    );
    if (L.from)
      rows.push(row('Dates', fdate(L.from) + (L.to && L.to !== L.from ? ' – ' + fdate(L.to) : '')));
  }
  if (o.st === 'H') rows.push(row('Holiday', esc(o.hol)), row('Pay', 'Paid company holiday'));
  if (o.st === 'W') rows.push(row('Schedule', 'Weekly off. No shift planned.'));
  if (o.st === 'N') rows.push(row('Status', 'Not joined yet'), row('Joining date', fdate(e.join)));
  const ev = [];
  if (o.in != null) ev.push([`Clock in · ${tm(o.in)}`, `${o.mode} · ${o.loc}`]);
  if (o.out != null)
    ev.push([
      `Clock out · ${tm(o.out)}${o.out >= 1440 ? ' (next day)' : ''}`,
      o.ov
        ? 'Corrected after approval'
        : 'Recorded at ' + (e.type === 'Plant' ? 'the plant gate' : 'the office')
    ]);
  else if (o.miss) ev.push(['No clock-out recorded', 'Needs a correction so pay is not affected']);
  else if (o.live)
    ev.push([`Still working · ${dur(o.mins)} so far`, 'Updates when the shift ends']);
  const log = ev.length
    ? `<h3 class="dsub">Punch log</h3><div class="tl">${ev.map(([a, b]) => `<div class="ev"><span class="pt"></span><div><b>${a}</b><div class="muted small">${esc(b)}</div></div></div>`).join('')}</div>`
    : o.st === 'A'
      ? `<div class="empty"><b>No punches recorded</b>This day counts as absent unless a correction is approved.</div>`
      : '';
  let regB = '';
  if (o.reg) {
    const r = o.reg,
      canDecide = isMgr() && r.status === 'Pending' && !self;
    regB = `<div class="rbox"><div class="tools" style="justify-content:space-between;margin:0 0 6px"><b>Correction request</b>${stChip(r.status)}</div><div class="muted small">${esc(r.type)} · requested ${r.in}–${r.out}</div><p style="margin-top:6px">${esc(r.reason)}</p>${canDecide ? `<div class="acts" style="margin-top:12px"><button class="btn ok sm" onclick="decideReg(${r.id},'Approved')">Approve</button><button class="btn bad sm" onclick="decideReg(${r.id},'Rejected')">Reject</button></div>` : ''}</div>`;
  }
  const canReq = self && ['A', 'P', 'D'].includes(o.st) && !pending;
  const actions =
    (canReq
      ? `<button class="btn ${o.st === 'A' || o.late || o.miss ? 'primary' : ''}" onclick="attReg('${empId}',${y},${m},${d})">Request correction</button>`
      : '') +
    (self && o.st === ''
      ? `<button class="btn primary" onclick="applyLeave('${o.iso}')">Apply for leave</button>`
      : '') +
    (self && o.st === 'T'
      ? `<button class="btn primary" onclick="toggleClock();attDay('${empId}',${y},${m},${d})">Clock in now</button>`
      : '');
  overlay(
    'Attendance details',
    `<div class="dnav"><button class="icon-btn" onclick="attDay('${empId}',${y},${m},${d - 1})" aria-label="Previous day">${ic('chev', 16)}</button><div style="text-align:center"><b style="font-size:18px">${DOWN[o.dt.getDay()]}</b><div class="muted">${d} ${MON[m]} ${y}</div></div><button class="icon-btn" onclick="attDay('${empId}',${y},${m},${d + 1})" aria-label="Next day">${ic('chev', 16)}</button></div>
   ${self ? '' : `<div class="person" style="margin-bottom:12px">${av(e.name, 38)}<div><b>${esc(e.name)}</b><span>${esc(e.title)} · ${e.dept}</span></div></div>`}
   <div style="display:flex;gap:6px;flex-wrap:wrap">${chips}</div>${tiles}${rows.length ? `<div class="list" style="margin-top:10px">${rows.join('')}</div>` : ''}${log}${regB}`,
    `<button class="btn" onclick="closeModal()">Close</button>${actions}`,
    { side: true, keepFocus: !!$('#layer .ov') }
  );
}
function attReg(empId, y, m, d) {
  const o = dayInfo(empId, y, m, d),
    types = ['Absent / no punch', 'Missed punch-out', 'Late mark waiver', 'Wrong punch time'];
  const type = o.st === 'A' ? types[0] : o.miss ? types[1] : o.late ? types[2] : types[3];
  overlay(
    'Request a correction',
    `<p class="muted" style="margin-bottom:14px">${DOWN[o.dt.getDay()]}, ${d} ${MON[m]} ${y} · ${o.shiftTxt}</p><div class="fg">${fld('rt', 'What needs correcting?', `<select id="rt">${types.map(t => `<option ${t === type ? 'selected' : ''}>${t}</option>`).join('')}</select>`, 'full')}${fld('ri', 'Clock in', `<input id="ri" type="time" value="${tm(o.in != null ? o.in : o.start)}">`)}${fld('ro', 'Clock out', `<input id="ro" type="time" value="${tm(o.out != null ? o.out : o.end)}">`)}${fld('rr', 'Reason', '<textarea id="rr" rows="3" placeholder="Tell your manager what happened"></textarea>', 'full')}</div>`,
    `<button class="btn" onclick="attDay('${empId}',${y},${m},${d})">Back</button><button class="btn primary" onclick="saveReg('${empId}',${y},${m},${d})">Send request</button>`,
    { side: true, keepFocus: true }
  );
}
function saveReg(empId, y, m, d) {
  const i = $('#ri').value,
    o2 = $('#ro').value,
    r = $('#rr').value.trim();
  if (
    ![
      chk('ri', !!i, 'Enter the clock-in time'),
      chk(
        'ro',
        !!o2 && o2 !== i,
        o2 === i && o2 ? 'Clock-out must be different from clock-in' : 'Enter the clock-out time'
      ),
      chk('rr', !!r, 'Add a reason for your manager')
    ].every(Boolean)
  )
    return;
  S.regs.push({
    id: Date.now(),
    emp: empId,
    date: iso(new Date(y, m, d)),
    type: $('#rt').value,
    in: i,
    out: o2,
    reason: r,
    status: 'Pending'
  });
  render();
  attDay(empId, y, m, d);
  toast('Correction sent to your manager');
}
function regCard() {
  const mine = me().id,
    list = S.regs
      .filter(
        r =>
          S.role === 'admin' ||
          r.emp === mine ||
          (S.role === 'manager' && scoped().some(e => e.id === r.emp))
      )
      .slice()
      .reverse();
  const rows = list.map(r => {
    const e = employees.find(x => x.id === r.emp),
      dt = new Date(r.date + 'T00:00:00'),
      act = isMgr() && r.status === 'Pending' && r.emp !== mine;
    return {
      sid: act ? r.id : null,
      click: `attDay('${r.emp}',${dt.getFullYear()},${dt.getMonth()},${dt.getDate()})`,
      cells: [
        person(e),
        esc(r.type),
        fdate(r.date),
        `${r.in} – ${r.out}`,
        esc(r.reason),
        stChip(r.status),
        act
          ? `<button class="btn ok sm" onclick="event.stopPropagation();decideReg(${r.id},'Approved')">Approve</button><button class="btn bad sm" onclick="event.stopPropagation();decideReg(${r.id},'Rejected')">Reject</button>`
          : ''
      ]
    };
  });
  return `<div class="card"><div class="head"><div><h2>Corrections</h2><p class="sub">${isMgr() ? 'Missed punches and late marks waiting for review' : 'Corrections you have asked for. Open a calendar day to request one.'}</p></div></div>${rtable([{ h: 'Employee', sel: isMgr() && 'reg' }, { h: 'Type' }, { h: 'Date' }, { h: 'Requested' }, { h: 'Reason', xm: 1 }, { h: 'Status' }, { h: '', act: 1 }], rows, { et: 'No correction requests', em: 'Open a day in the calendar and choose Request correction.' })}</div>`;
}
